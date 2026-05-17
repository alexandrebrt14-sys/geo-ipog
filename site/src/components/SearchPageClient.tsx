import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import {
  searchAdvanced,
  expandQuery,
  didYouMean,
  fold,
} from '../lib/search-index';
import type {
  SearchDoc,
  DocKind,
  AdvancedSearchResult,
} from '../lib/search-index';
import { getNextSteps } from '../lib/taxonomy';
import { ESTADOS } from '../lib/data';
import {
  track,
  trackDebounced,
  attachResultClickTracking,
} from '../lib/search-analytics';
import SearchSuggestions from './SearchSuggestions';
import PersonaQuickPicker from './PersonaQuickPicker';

// ---------------------------------------------------------------------------
// Imports defensivos para SE-2 (intent, entities, concepts).
// Em ambiente onde os módulos ainda não foram entregues ou exportam shapes
// diferentes, caímos em fallbacks silenciosos.
// ---------------------------------------------------------------------------

import * as intentModule from '../lib/search-intent';

type IntentName = 'find' | 'compare' | 'learn' | 'locate' | 'enroll' | 'unknown';
interface IntentResult {
  intent: IntentName;
  confidence: number;
  signals: string[];
}

function safeDetectIntent(qFolded: string): IntentResult {
  try {
    const fn = (intentModule as { detectIntent?: (s: string) => IntentResult })
      .detectIntent;
    if (typeof fn === 'function') return fn(qFolded);
  } catch {
    /* fallback */
  }
  return { intent: 'find', confidence: 0.4, signals: [] };
}

interface ConceptSuggestion {
  label: string;
  query: string;
}

async function loadRelatedConcepts(
  qFolded: string,
  limit: number
): Promise<ConceptSuggestion[]> {
  try {
    const mod = (await import('../lib/concepts').catch(() => null)) as
      | { relatedConcepts?: (q: string, n?: number) => ConceptSuggestion[] }
      | null;
    if (!mod || typeof mod.relatedConcepts !== 'function') return [];
    return mod.relatedConcepts(qFolded, limit) || [];
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface Props {
  initialQ?: string;
  initialKinds?: string[];
  initialPersona?: string;
  initialCluster?: string;
  initialRegulatoryLevels?: string[];
  initialRegioes?: string[];
  initialPage?: number;
}

// ---------------------------------------------------------------------------
// Mapas estáticos (kind label + badge color)
// ---------------------------------------------------------------------------

const ALL_KINDS: DocKind[] = [
  'Área',
  'MBA',
  'Tema',
  'Estado',
  'Persona',
  'Guia',
  'FAQ',
  'Glossário',
  'Método',
  'Evidência',
  'Caso',
  'Intervenção',
  'Comparativo',
  'Carreira',
  'Recurso',
];

const KIND_BADGE: Record<DocKind, string> = {
  'Área': 'bg-brand-50 text-brand-700',
  MBA: 'bg-sun-500/15 text-amber-800',
  Tema: 'bg-accent-500/10 text-accent-600',
  Estado: 'bg-surface-100 text-ink-700',
  Persona: 'bg-amber-50 text-amber-800',
  Guia: 'bg-emerald-50 text-emerald-700',
  FAQ: 'bg-rose-50 text-rose-700',
  'Glossário': 'bg-violet-50 text-violet-700',
  'Método': 'bg-indigo-50 text-indigo-700',
  'Evidência': 'bg-cyan-50 text-cyan-700',
  Caso: 'bg-orange-50 text-orange-700',
  'Intervenção': 'bg-teal-50 text-teal-700',
  Comparativo: 'bg-fuchsia-50 text-fuchsia-700',
  Carreira: 'bg-lime-50 text-lime-800',
  Recurso: 'bg-surface-100 text-ink-700',
};

function badgeClass(kind: DocKind): string {
  return KIND_BADGE[kind] ?? 'bg-surface-100 text-ink-700';
}

const PERSONA_OPTIONS: { id: string; label: string }[] = [
  { id: '', label: 'Todos os perfis' },
  { id: 'psicologos', label: 'Psicólogo' },
  { id: 'rh', label: 'RH' },
  { id: 'lideres', label: 'Líder ou executivo' },
  { id: 'consultores', label: 'Consultor · saúde · educação' },
];

const CLUSTER_OPTIONS: { id: string; label: string }[] = [
  { id: '', label: 'Todos os clusters' },
  { id: 'pot-bem-estar', label: 'POT · Bem-estar' },
  { id: 'neuro-avaliacao', label: 'Neuro · Avaliação' },
  { id: 'demais', label: 'Demais' },
];

const REGULATORY_LEVELS = ['R0', 'R1', 'R2', 'R3', 'R4'] as const;
const REGIOES = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'] as const;

const PAGE_SIZE = 20;
const MAX_RESULTS = 200;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function safeNextStep(
  doc: SearchDoc,
  persona?: string
): { label: string; href: string } | null {
  try {
    const groups = getNextSteps(doc.href, persona);
    for (const g of groups) {
      if (g.items.length > 0) {
        return { label: g.items[0].label, href: g.items[0].href };
      }
    }
  } catch {
    return null;
  }
  return null;
}

function parseCsvParam(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

/**
 * Destaca termos no texto, preservando acentuação original. Compara via
 * `fold()` em janelas correspondentes aos comprimentos dos termos.
 */
function HighlightText({ text, terms }: { text: string; terms: string[] }) {
  if (!text) return null;
  const foldedText = fold(text);
  const cleanTerms = Array.from(
    new Set(
      terms
        .map(t => fold(t).trim())
        .filter(t => t.length >= 2)
    )
  ).sort((a, b) => b.length - a.length);
  if (cleanTerms.length === 0) return <>{text}</>;

  const parts: Array<{ s: string; hit: boolean }> = [];
  let i = 0;
  while (i < text.length) {
    let matched = false;
    for (const term of cleanTerms) {
      const window = foldedText.slice(i, i + term.length);
      if (window === term) {
        parts.push({ s: text.slice(i, i + term.length), hit: true });
        i += term.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      const last = parts[parts.length - 1];
      if (last && !last.hit) last.s += text[i];
      else parts.push({ s: text[i] ?? '', hit: false });
      i++;
    }
  }
  return (
    <>
      {parts.map((p, idx) =>
        p.hit ? (
          <mark
            key={idx}
            className="rounded-sm bg-sun-500/30 px-0.5 text-ink-900"
          >
            {p.s}
          </mark>
        ) : (
          <span key={idx}>{p.s}</span>
        )
      )}
    </>
  );
}

/** Mapeia UF para Região para o facet "regiao". */
const UF_TO_REGIAO: Record<string, string> = (() => {
  const m: Record<string, string> = {};
  for (const e of ESTADOS) m[e.uf.toLowerCase()] = e.regiao;
  return m;
})();

function docRegiao(doc: SearchDoc): string | null {
  if (doc.kind !== 'Estado') return null;
  const m = doc.id.match(/^estado:([A-Z]{2})$/);
  if (!m) return null;
  return UF_TO_REGIAO[m[1].toLowerCase()] ?? null;
}

function docRegulatoryLevels(doc: SearchDoc): string[] {
  // keywords já é folded; busca por r0..r4 cercado de não-letras
  const kw = ` ${doc.keywords} `;
  const out: string[] = [];
  for (const lvl of REGULATORY_LEVELS) {
    const pat = lvl.toLowerCase();
    const idx = kw.indexOf(pat);
    if (idx === -1) continue;
    const before = kw[idx - 1];
    const after = kw[idx + pat.length];
    const ok =
      (!before || /[^a-z0-9]/.test(before)) &&
      (!after || /[^a-z0-9]/.test(after));
    if (ok) out.push(lvl);
  }
  return out;
}

function docCluster(doc: SearchDoc): string | null {
  const kw = doc.keywords;
  if (kw.includes('pot-bem-estar') || kw.includes('pot bem-estar')) return 'pot-bem-estar';
  if (kw.includes('neuro-avaliacao') || kw.includes('neuro avaliacao')) return 'neuro-avaliacao';
  return null;
}

// ---------------------------------------------------------------------------
// ResultCard (module-level para evitar remount em cada render do parent)
// ---------------------------------------------------------------------------

interface ResultCardProps {
  result: AdvancedSearchResult;
  position: number;
  trimmedQ: string;
  qFolded: string;
  persona: string;
  showDevScore: boolean;
}

function ResultCard({
  result,
  position,
  trimmedQ,
  qFolded,
  persona,
  showDevScore,
}: ResultCardProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const doc = result.doc;
  const terms = useMemo(
    () => Array.from(new Set(result.matchedTerms || [])),
    [result.matchedTerms]
  );

  useEffect(() => {
    if (!linkRef.current) return undefined;
    const cleanup = attachResultClickTracking(linkRef.current, {
      query: trimmedQ,
      query_folded: qFolded,
      position,
      doc_id: doc.id,
      doc_kind: doc.kind,
      doc_href: doc.href,
      source: 'page',
    });
    return cleanup;
  }, [position, doc.id, doc.kind, doc.href, trimmedQ, qFolded]);

  const next = safeNextStep(doc, persona || undefined);

  return (
    <li>
      <a
        ref={linkRef}
        href={doc.href}
        className="card-lift block h-full p-5"
      >
        <div className="flex items-center gap-2">
          <span
            className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase ${badgeClass(
              doc.kind
            )}`}
          >
            {doc.kind}
          </span>
          {doc.tags.slice(0, 2).map(tag => (
            <span
              key={tag}
              className="rounded-full bg-surface-100 px-2 py-0.5 text-[10px] font-medium text-ink-700"
            >
              {tag}
            </span>
          ))}
          {showDevScore && (
            <span className="ml-auto text-[10px] text-ink-500">
              score {result.score.toFixed(2)}
            </span>
          )}
        </div>
        <h3 className="mt-2 font-display text-base font-semibold text-ink-900">
          <HighlightText text={doc.title} terms={terms} />
        </h3>
        {doc.subtitle && (
          <p className="mt-1 text-sm leading-snug text-ink-700">
            <HighlightText text={doc.subtitle} terms={terms} />
          </p>
        )}
        {next && (
          <div className="mt-3 border-t border-surface-200 pt-3 text-[11px] text-ink-500">
            Próximo passo:{' '}
            <span className="font-semibold text-brand-700">{next.label}</span>
          </div>
        )}
      </a>
    </li>
  );
}

function intentBanner(intent: IntentName): { label: string; href?: string } | null {
  switch (intent) {
    case 'compare':
      return {
        label: 'Talvez você queira comparar — veja a página de Comparativos.',
        href: '/comparativos',
      };
    case 'locate':
      return { label: 'Detectamos uma busca por região ou estado.' };
    case 'enroll':
      return {
        label: 'Veja informações de matrícula no IPOG oficial.',
        href: 'https://ipog.edu.br/cursos/pos-graduacao',
      };
    case 'learn':
      return {
        label: 'Sugestão: comece pelos guias e FAQs profundas.',
        href: '/guias',
      };
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

export default function SearchPageClient({
  initialQ = '',
  initialKinds = [],
  initialPersona = '',
  initialCluster = '',
  initialRegulatoryLevels = [],
  initialRegioes = [],
  initialPage = 1,
}: Props) {
  const [q, setQ] = useState(initialQ);
  const [kinds, setKinds] = useState<string[]>(initialKinds);
  const [persona, setPersona] = useState(initialPersona);
  const [cluster, setCluster] = useState(initialCluster);
  const [regulatoryLevels, setRegulatoryLevels] = useState<string[]>(
    initialRegulatoryLevels
  );
  const [regioes, setRegioes] = useState<string[]>(initialRegioes);
  const [page, setPage] = useState(initialPage);
  const [showAll, setShowAll] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [concepts, setConcepts] = useState<ConceptSuggestion[]>([]);
  const [, startTransition] = useTransition();

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsHeadingRef = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);
  const lastTrackedQ = useRef<string>('');
  const lastDymTracked = useRef<string>('');

  // Detecta querystring ?dev=1 para mostrar score
  const showDevScore = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('dev') === '1';
  }, []);

  // -------------------------------------------------------------------------
  // Persistência localStorage de persona
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!initialPersona) {
      const stored = window.localStorage.getItem('pp_persona');
      if (stored) setPersona(stored);
    }
    const handler = (event: Event) => {
      const ce = event as CustomEvent<{ persona: string }>;
      if (ce.detail) setPersona(ce.detail.persona || '');
    };
    window.addEventListener('pp:persona-change', handler as EventListener);
    return () =>
      window.removeEventListener('pp:persona-change', handler as EventListener);
  }, [initialPersona]);

  // -------------------------------------------------------------------------
  // popstate (back/forward) + hidratacao inicial via URL (deep linking).
  // Em build estatico, /busca/?q=foo entrega initialQ='' do SSR (page foi gerada
  // sem query). Lemos window.location.search no mount para hidratar o estado e
  // suportar deep linking + compartilhamento de URL.
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hydrate = () => {
      const params = new URLSearchParams(window.location.search);
      const qParam = params.get('q') ?? '';
      const kindsParam = parseCsvParam(params.get('kind'));
      const personaParam = params.get('persona') ?? '';
      const clusterParam = params.get('cluster') ?? '';
      const regLevelsParam = parseCsvParam(params.get('regulatoryLevel'));
      const regioesParam = parseCsvParam(params.get('regiao'));
      const pageParam = Math.max(1, parseInt(params.get('page') ?? '1', 10) || 1);
      // Aplica apenas se diferente do estado atual para evitar loops com syncUrl.
      setQ(prev => (prev === qParam ? prev : qParam));
      setKinds(prev => (prev.join(',') === kindsParam.join(',') ? prev : kindsParam));
      setPersona(prev => (prev === personaParam ? prev : personaParam));
      setCluster(prev => (prev === clusterParam ? prev : clusterParam));
      setRegulatoryLevels(prev => (prev.join(',') === regLevelsParam.join(',') ? prev : regLevelsParam));
      setRegioes(prev => (prev.join(',') === regioesParam.join(',') ? prev : regioesParam));
      setPage(prev => (prev === pageParam ? prev : pageParam));
      if (qParam && inputRef.current && inputRef.current.value !== qParam) {
        inputRef.current.value = qParam;
      }
    };
    hydrate();
    window.addEventListener('popstate', hydrate);
    return () => window.removeEventListener('popstate', hydrate);
  }, []);

  // -------------------------------------------------------------------------
  // Sincronia de URL
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    if (kinds.length) params.set('kind', kinds.join(','));
    if (persona) params.set('persona', persona);
    if (cluster) params.set('cluster', cluster);
    if (regulatoryLevels.length)
      params.set('regulatoryLevel', regulatoryLevels.join(','));
    if (regioes.length) params.set('regiao', regioes.join(','));
    if (page > 1) params.set('page', String(page));
    const qs = params.toString();
    const next = qs ? `/busca?${qs}` : '/busca';
    window.history.replaceState({}, '', next);
  }, [q, kinds, persona, cluster, regulatoryLevels, regioes, page]);

  // -------------------------------------------------------------------------
  // Busca BM25 (cache por chave composta)
  // -------------------------------------------------------------------------
  const trimmedQ = q.trim();
  const qFolded = useMemo(() => fold(trimmedQ), [trimmedQ]);

  const advancedResults: AdvancedSearchResult[] = useMemo(() => {
    if (!trimmedQ) return [];
    try {
      return searchAdvanced(trimmedQ, {
        persona: persona || undefined,
        limit: MAX_RESULTS,
      });
    } catch {
      return [];
    }
  }, [trimmedQ, persona]);

  // -------------------------------------------------------------------------
  // Aplica facets (kind, cluster, regulatoryLevel, regiao) pós-search
  // -------------------------------------------------------------------------
  const filtered: AdvancedSearchResult[] = useMemo(() => {
    return advancedResults.filter(r => {
      const doc = r.doc;
      if (kinds.length && !kinds.includes(doc.kind)) return false;
      if (cluster) {
        const c = docCluster(doc);
        if (c !== cluster) return false;
      }
      if (regulatoryLevels.length) {
        const lvls = docRegulatoryLevels(doc);
        if (!lvls.some(l => regulatoryLevels.includes(l))) return false;
      }
      if (regioes.length) {
        const reg = docRegiao(doc);
        if (!reg || !regioes.includes(reg)) return false;
      }
      return true;
    });
  }, [advancedResults, kinds, cluster, regulatoryLevels, regioes]);

  // -------------------------------------------------------------------------
  // Contagens facet-by-facet calculadas sobre resultados ATUAIS
  // (heurística: contagem do que sobraria ao TROCAR cada facet).
  // -------------------------------------------------------------------------
  const countsByKind = useMemo(() => {
    const m = new Map<DocKind, number>();
    for (const r of advancedResults) {
      // Aplica filtros exceto kind
      const doc = r.doc;
      if (cluster && docCluster(doc) !== cluster) continue;
      if (
        regulatoryLevels.length &&
        !docRegulatoryLevels(doc).some(l => regulatoryLevels.includes(l))
      )
        continue;
      if (
        regioes.length &&
        (!docRegiao(doc) || !regioes.includes(docRegiao(doc) || ''))
      )
        continue;
      m.set(doc.kind, (m.get(doc.kind) ?? 0) + 1);
    }
    return m;
  }, [advancedResults, cluster, regulatoryLevels, regioes]);

  const countsByCluster = useMemo(() => {
    const m = new Map<string, number>();
    for (const r of advancedResults) {
      const doc = r.doc;
      if (kinds.length && !kinds.includes(doc.kind)) continue;
      const c = docCluster(doc);
      if (!c) continue;
      m.set(c, (m.get(c) ?? 0) + 1);
    }
    return m;
  }, [advancedResults, kinds]);

  const countsByRegLevel = useMemo(() => {
    const m = new Map<string, number>();
    for (const r of advancedResults) {
      const doc = r.doc;
      if (kinds.length && !kinds.includes(doc.kind)) continue;
      if (cluster && docCluster(doc) !== cluster) continue;
      for (const l of docRegulatoryLevels(doc)) {
        m.set(l, (m.get(l) ?? 0) + 1);
      }
    }
    return m;
  }, [advancedResults, kinds, cluster]);

  const countsByRegiao = useMemo(() => {
    const m = new Map<string, number>();
    for (const r of advancedResults) {
      const doc = r.doc;
      if (doc.kind !== 'Estado') continue;
      const reg = docRegiao(doc);
      if (!reg) continue;
      m.set(reg, (m.get(reg) ?? 0) + 1);
    }
    return m;
  }, [advancedResults]);

  const hasEstadoResults = useMemo(() => {
    return advancedResults.some(r => r.doc.kind === 'Estado');
  }, [advancedResults]);

  // -------------------------------------------------------------------------
  // Paginação
  // -------------------------------------------------------------------------
  const totalFiltered = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / PAGE_SIZE));
  const effectivePage = Math.min(page, totalPages);

  const visibleResults = useMemo(() => {
    if (showAll) return filtered;
    return filtered.slice(0, effectivePage * PAGE_SIZE);
  }, [filtered, effectivePage, showAll]);

  // -------------------------------------------------------------------------
  // Did you mean + expansões
  // -------------------------------------------------------------------------
  const dym = useMemo(() => {
    if (!trimmedQ || advancedResults.length >= 3) return null;
    try {
      return didYouMean(trimmedQ);
    } catch {
      return null;
    }
  }, [trimmedQ, advancedResults.length]);

  const expansions = useMemo(() => {
    if (!trimmedQ) return [] as string[];
    if (advancedResults.length > 0) return [] as string[];
    try {
      const exp = expandQuery(trimmedQ);
      return exp
        .filter(e => e.toLowerCase() !== trimmedQ.toLowerCase())
        .filter(e => e.length >= 3)
        .slice(0, 6);
    } catch {
      return [];
    }
  }, [trimmedQ, advancedResults.length]);

  // -------------------------------------------------------------------------
  // Intent
  // -------------------------------------------------------------------------
  const intent = useMemo(
    () => safeDetectIntent(qFolded),
    [qFolded]
  );

  // -------------------------------------------------------------------------
  // Buscas relacionadas (concepts) — carga assíncrona defensiva
  // -------------------------------------------------------------------------
  useEffect(() => {
    let cancelled = false;
    if (!qFolded) {
      setConcepts([]);
      return;
    }
    loadRelatedConcepts(qFolded, 6).then(list => {
      if (!cancelled) setConcepts(list);
    });
    return () => {
      cancelled = true;
    };
  }, [qFolded]);

  // -------------------------------------------------------------------------
  // Telemetria
  // -------------------------------------------------------------------------
  // search_query (debounce 400ms ao estabilizar digitação)
  useEffect(() => {
    if (!trimmedQ) return;
    if (lastTrackedQ.current === trimmedQ) return;
    lastTrackedQ.current = trimmedQ;
    trackDebounced(
      'search_query',
      {
        query: trimmedQ,
        query_folded: qFolded,
        query_length: trimmedQ.length,
        result_count: filtered.length,
        intent: intent.intent,
        source: 'page',
      },
      400
    );
  }, [trimmedQ, qFolded, filtered.length, intent.intent]);

  // search_zero_result
  useEffect(() => {
    if (!trimmedQ) return;
    if (filtered.length > 0) return;
    track('search_zero_result', {
      query: trimmedQ,
      query_folded: qFolded,
      query_length: trimmedQ.length,
      intent: intent.intent,
      source: 'page',
    });
  }, [trimmedQ, qFolded, filtered.length, intent.intent]);

  // search_did_you_mean_shown
  useEffect(() => {
    if (!dym) return;
    if (lastDymTracked.current === dym) return;
    lastDymTracked.current = dym;
    track('search_did_you_mean_shown', {
      query: trimmedQ,
      suggestion: dym,
      source: 'page',
    });
  }, [dym, trimmedQ]);

  // Focus no heading quando muda página (a11y)
  useEffect(() => {
    if (!resultsHeadingRef.current) return;
    if (effectivePage === 1 && !showAll) return;
    resultsHeadingRef.current.focus({ preventScroll: true });
  }, [effectivePage, showAll]);

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      startTransition(() => {
        setQ(inputRef.current!.value);
        setPage(1);
        setShowAll(false);
      });
    }
  };

  const handleInputChange = (value: string) => {
    startTransition(() => {
      setQ(value);
      setPage(1);
      setShowAll(false);
    });
  };

  const toggleKind = (k: string) => {
    setKinds(prev => {
      const isOn = prev.includes(k);
      const next = isOn ? prev.filter(x => x !== k) : [...prev, k];
      if (isOn) {
        track('search_facet_cleared', { filter_kind: k, source: 'page' });
      } else {
        track('search_filter_applied', { filter_kind: k, source: 'page' });
      }
      return next;
    });
    setPage(1);
  };

  const toggleRegLevel = (lvl: string) => {
    setRegulatoryLevels(prev => {
      const isOn = prev.includes(lvl);
      const next = isOn ? prev.filter(x => x !== lvl) : [...prev, lvl];
      if (isOn) {
        track('search_facet_cleared', { filter_kind: `reg:${lvl}`, source: 'page' });
      } else {
        track('search_filter_applied', { filter_kind: `reg:${lvl}`, source: 'page' });
      }
      return next;
    });
    setPage(1);
  };

  const toggleRegiao = (r: string) => {
    setRegioes(prev => {
      const isOn = prev.includes(r);
      const next = isOn ? prev.filter(x => x !== r) : [...prev, r];
      if (isOn) {
        track('search_facet_cleared', { filter_kind: `regiao:${r}`, source: 'page' });
      } else {
        track('search_filter_applied', { filter_kind: `regiao:${r}`, source: 'page' });
      }
      return next;
    });
    setPage(1);
  };

  const changePersona = (p: string) => {
    setPersona(p);
    setPage(1);
    track('search_persona_changed', { filter_persona: p, source: 'page' });
  };

  const changeCluster = (c: string) => {
    setCluster(c);
    setPage(1);
    if (c) track('search_filter_applied', { filter_cluster: c, source: 'page' });
    else track('search_facet_cleared', { filter_cluster: '', source: 'page' });
  };

  const clearAll = () => {
    setKinds([]);
    setPersona('');
    setCluster('');
    setRegulatoryLevels([]);
    setRegioes([]);
    setPage(1);
    track('search_facet_cleared', { source: 'page' });
  };

  const useDymSuggestion = () => {
    if (!dym) return;
    track('search_did_you_mean_used', {
      query: trimmedQ,
      suggestion: dym,
      source: 'page',
    });
    setQ(dym);
    if (inputRef.current) inputRef.current.value = dym;
    setPage(1);
  };

  const useExpansion = (exp: string) => {
    track('search_concept_clicked', { suggestion: exp, source: 'page' });
    setQ(exp);
    if (inputRef.current) inputRef.current.value = exp;
    setPage(1);
  };

  const useConcept = (c: ConceptSuggestion) => {
    track('search_concept_clicked', {
      suggestion: c.label,
      query: c.query,
      source: 'page',
    });
    setQ(c.query);
    if (inputRef.current) inputRef.current.value = c.query;
    setPage(1);
  };

  const hasActiveFilters =
    kinds.length > 0 ||
    Boolean(persona) ||
    Boolean(cluster) ||
    regulatoryLevels.length > 0 ||
    regioes.length > 0;

  // -------------------------------------------------------------------------
  // Render: sidebar facets
  // -------------------------------------------------------------------------
  const renderFacets = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-sm font-semibold text-ink-900">
          Filtros
        </h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="text-[11px] font-semibold text-brand-700 hover:text-brand-800"
          >
            Limpar tudo
          </button>
        )}
      </div>

      {/* Perfil */}
      <fieldset>
        <legend className="text-[11px] font-semibold uppercase tracking-wide text-ink-500">
          Perfil
        </legend>
        <select
          value={persona}
          onChange={e => changePersona(e.target.value)}
          className="mt-2 w-full rounded-md border border-surface-200 bg-white px-3 py-2 text-xs font-medium text-ink-900 hover:border-brand-400"
        >
          {PERSONA_OPTIONS.map(opt => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </fieldset>

      {/* Tipo (kind) */}
      <fieldset>
        <legend className="text-[11px] font-semibold uppercase tracking-wide text-ink-500">
          Tipo de conteúdo
        </legend>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {ALL_KINDS.map(k => {
            const c = countsByKind.get(k) ?? 0;
            const active = kinds.includes(k);
            if (!active && c === 0) return null;
            return (
              <button
                key={k}
                type="button"
                onClick={() => toggleKind(k)}
                className={`chip text-[11px] ${active ? 'chip-active' : ''}`}
                aria-pressed={active}
              >
                {k} ({c})
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Cluster */}
      <fieldset>
        <legend className="text-[11px] font-semibold uppercase tracking-wide text-ink-500">
          Cluster de área
        </legend>
        <div className="mt-2 space-y-1.5">
          {CLUSTER_OPTIONS.map(opt => {
            const count =
              opt.id === ''
                ? advancedResults.length
                : countsByCluster.get(opt.id) ?? 0;
            return (
              <label
                key={opt.id || 'all'}
                className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-xs text-ink-900 hover:bg-surface-50"
              >
                <input
                  type="radio"
                  name="cluster"
                  checked={cluster === opt.id}
                  onChange={() => changeCluster(opt.id)}
                  className="h-3.5 w-3.5"
                />
                <span className="flex-1">{opt.label}</span>
                <span className="text-[10px] text-ink-500">{count}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Nível regulatório */}
      {countsByRegLevel.size > 0 && (
        <fieldset>
          <legend className="text-[11px] font-semibold uppercase tracking-wide text-ink-500">
            Nível regulatório
          </legend>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {REGULATORY_LEVELS.map(lvl => {
              const c = countsByRegLevel.get(lvl) ?? 0;
              if (c === 0 && !regulatoryLevels.includes(lvl)) return null;
              const active = regulatoryLevels.includes(lvl);
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => toggleRegLevel(lvl)}
                  className={`chip text-[11px] ${active ? 'chip-active' : ''}`}
                  aria-pressed={active}
                >
                  {lvl} ({c})
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Região */}
      {hasEstadoResults && countsByRegiao.size > 0 && (
        <fieldset>
          <legend className="text-[11px] font-semibold uppercase tracking-wide text-ink-500">
            Região
          </legend>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {REGIOES.map(r => {
              const c = countsByRegiao.get(r) ?? 0;
              if (c === 0 && !regioes.includes(r)) return null;
              const active = regioes.includes(r);
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => toggleRegiao(r)}
                  className={`chip text-[11px] ${active ? 'chip-active' : ''}`}
                  aria-pressed={active}
                >
                  {r} ({c})
                </button>
              );
            })}
          </div>
        </fieldset>
      )}
    </div>
  );

  // -------------------------------------------------------------------------
  // Render: empty state com expansões/sinônimos + did you mean
  // -------------------------------------------------------------------------
  const renderNoResults = () => (
    <section
      className="rounded-2xl border border-dashed border-surface-200 bg-white p-8"
      aria-labelledby="no-results-heading"
    >
      <h2
        id="no-results-heading"
        className="font-display text-lg font-semibold text-ink-900"
      >
        Nenhum resultado para "{trimmedQ}".
      </h2>
      <p className="mt-2 text-sm text-ink-500">
        Revise a grafia, troque por um sinônimo ou remova filtros para ampliar o
        resultado.
      </p>

      {dym && (
        <div className="mt-5 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-ink-900">
          Você quis dizer{' '}
          <button
            type="button"
            onClick={useDymSuggestion}
            className="font-semibold text-brand-700 underline-offset-2 hover:underline"
          >
            {dym}
          </button>
          ?
        </div>
      )}

      {expansions.length > 0 && (
        <div className="mt-5">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-brand-700">
            Tente também:
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {expansions.map(exp => (
              <button
                key={exp}
                type="button"
                onClick={() => useExpansion(exp)}
                className="chip text-xs"
              >
                {exp}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-500">
          Atalhos populares:
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {['NR-1', 'burnout', 'POT'].map(label => (
            <button
              key={label}
              type="button"
              onClick={() => useExpansion(label)}
              className="chip text-xs"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearAll}
          className="mt-6 text-xs font-semibold text-brand-700 hover:text-brand-800"
        >
          Remover filtros e tentar novamente
        </button>
      )}
    </section>
  );

  const intentMsg = intentBanner(intent.intent);

  // -------------------------------------------------------------------------
  // Render principal
  // -------------------------------------------------------------------------
  return (
    <div className="space-y-6">
      {/* Form de busca */}
      <form
        role="search"
        onSubmit={handleSubmit}
        className="rounded-2xl border border-surface-200 bg-white p-4 shadow-soft sm:p-5"
      >
        <label
          htmlFor="busca-q"
          className="text-[11px] font-semibold uppercase tracking-wide text-brand-700"
        >
          Sua busca
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-surface-200 bg-surface-50 px-4">
            <svg
              className="h-5 w-5 shrink-0 text-ink-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              ref={inputRef}
              id="busca-q"
              type="search"
              defaultValue={q}
              onChange={e => handleInputChange(e.target.value)}
              placeholder="Digite: NR-1, burnout, POT, neuropsicologia, supervisor clínico…"
              className="h-12 w-full bg-transparent text-base outline-none"
              aria-label="Campo de busca"
              autoComplete="off"
            />
            {q && (
              <button
                type="button"
                onClick={() => {
                  handleInputChange('');
                  inputRef.current?.focus();
                }}
                className="text-xs font-semibold text-ink-500 hover:text-brand-800"
                aria-label="Limpar busca"
              >
                Limpar
              </button>
            )}
          </div>
          <button type="submit" className="btn-primary px-6">
            Buscar
          </button>
        </div>

        {/* Toggle drawer mobile */}
        {trimmedQ && (
          <div className="mt-3 flex items-center justify-between lg:hidden">
            <button
              type="button"
              onClick={() => setDrawerOpen(o => !o)}
              className="chip text-xs"
              aria-expanded={drawerOpen}
            >
              {drawerOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
              {hasActiveFilters && (
                <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-800 text-[10px] text-white">
                  •
                </span>
              )}
            </button>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="text-[11px] font-semibold text-brand-700"
              >
                Limpar
              </button>
            )}
          </div>
        )}
      </form>

      {/* Zero state */}
      {!trimmedQ && (
        <div className="space-y-10">
          <SearchSuggestions variant="page" persona={persona || undefined} />
          <PersonaQuickPicker variant="page" />
        </div>
      )}

      {/* Layout com sidebar + main */}
      {trimmedQ && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Sidebar facets (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-surface-200 bg-white p-5">
              {renderFacets()}
            </div>
          </aside>

          {/* Drawer mobile */}
          {drawerOpen && (
            <aside className="rounded-2xl border border-surface-200 bg-white p-5 lg:hidden">
              {renderFacets()}
            </aside>
          )}

          {/* Coluna principal */}
          <main className="space-y-5">
            {/* Header + status */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <h2
                ref={resultsHeadingRef}
                tabIndex={-1}
                className="font-display text-lg font-semibold text-ink-900 outline-none"
              >
                {totalFiltered} resultado{totalFiltered === 1 ? '' : 's'}{' '}
                para "{trimmedQ}"
              </h2>
              <output role="status" aria-live="polite" className="text-xs text-ink-500">
                {advancedResults.length} no índice ·{' '}
                {(intent.signals || []).length} sinais detectados
              </output>
            </div>

            {/* Banner did you mean */}
            {dym && totalFiltered > 0 && (
              <div className="rounded-xl border border-brand-200 bg-brand-50 p-3 text-sm text-ink-900">
                Você quis dizer{' '}
                <button
                  type="button"
                  onClick={useDymSuggestion}
                  className="font-semibold text-brand-700 underline-offset-2 hover:underline"
                >
                  {dym}
                </button>
                ?
              </div>
            )}

            {/* Banner intent */}
            {intentMsg && (
              <div className="rounded-xl border border-surface-200 bg-surface-50 p-3 text-sm text-ink-700">
                {intentMsg.label}{' '}
                {intentMsg.href && (
                  <a
                    href={intentMsg.href}
                    className="font-semibold text-brand-700 underline-offset-2 hover:underline"
                  >
                    Abrir →
                  </a>
                )}
              </div>
            )}

            {/* Lista de resultados ou empty */}
            {visibleResults.length > 0 ? (
              <>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {visibleResults.map((r, idx) => (
                    <ResultCard
                      key={r.doc.id}
                      result={r}
                      position={idx + 1}
                      trimmedQ={trimmedQ}
                      qFolded={qFolded}
                      persona={persona}
                      showDevScore={showDevScore}
                    />
                  ))}
                </ul>

                {/* Paginação */}
                {!showAll && totalFiltered > visibleResults.length && (
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setPage(p => p + 1)}
                      className="btn-primary px-5 py-2 text-sm"
                    >
                      Mostrar mais {Math.min(
                        PAGE_SIZE,
                        totalFiltered - visibleResults.length
                      )} →
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAll(true)}
                      className="chip text-xs"
                    >
                      Mostrar todos ({totalFiltered})
                    </button>
                  </div>
                )}

                {/* Buscas relacionadas */}
                {concepts.length > 0 && (
                  <section
                    className="rounded-2xl border border-surface-200 bg-surface-50 p-5"
                    aria-labelledby="buscas-relacionadas"
                  >
                    <h3
                      id="buscas-relacionadas"
                      className="text-[11px] font-semibold uppercase tracking-wide text-brand-700"
                    >
                      Buscas relacionadas
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {concepts.map(c => (
                        <button
                          key={`${c.label}-${c.query}`}
                          type="button"
                          onClick={() => useConcept(c)}
                          className="chip text-xs"
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </section>
                )}
              </>
            ) : (
              renderNoResults()
            )}
          </main>
        </div>
      )}
    </div>
  );
}
