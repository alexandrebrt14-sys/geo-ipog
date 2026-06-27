/**
 * SearchOverlay v3 — busca semântica global com BM25, highlight inline, intent,
 * entidades, did-you-mean, operadores, prefetch e ARIA live region.
 *
 * Pipeline:
 *  1. Tenta carregar dinamicamente `searchAdvanced`, `didYouMean`, `parseQuery`,
 *     `detectIntent`, `extractEntities`, `relatedConcepts` e `track`. Se algum
 *     módulo ainda não existir (SE-1/SE-2/SE-4 podem estar em andamento),
 *     cai elegantemente para a API estável `search()` do search-index.
 *  2. Aplica filtros parseados (kind:, persona:, frase exata, exclusões).
 *  3. Renderiza com highlight inline, chips de operadores e entidades,
 *     badge de intent, did-you-mean banner e seção de buscas relacionadas.
 *  4. Telemetria, prefetch on hover (>300ms, máx 6) e live region ARIA.
 *
 * REGRA #0: todo texto visível em português brasileiro com acentuação completa.
 * IDs, URLs e slugs permanecem ASCII.
 *
 * Triggers: cliques em [data-open-search] + atalhos ⌘K / Ctrl+K / `/` / `?`.
 * Mantém API pública: `<SearchOverlay client:idle />` em Base.astro.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  buildIndex,
  fold,
  getIndexStats,
  search,
  trending,
  byPersona,
  type DocKind,
  type SearchDoc,
} from '../lib/search-index';
import { getNextSteps, getPersonaFor } from '../lib/taxonomy';

// ---------------------------------------------------------------------------
// Tipos espelhados das APIs SE-1/SE-2/SE-4 (carregadas dinamicamente)
// ---------------------------------------------------------------------------

type FieldName = 'title' | 'subtitle' | 'keywords' | 'tags';

interface AdvancedSearchResult {
  doc: SearchDoc;
  score: number;
  matchedTerms: string[];
  highlights: { field: FieldName; term: string; positions: number[] }[];
}

interface ParsedQuery {
  must: string[];
  phrases: string[];
  not: string[];
  filters: Record<string, string>;
  raw: string;
}

type SearchIntent = 'find' | 'compare' | 'learn' | 'locate' | 'enroll' | 'unknown';

interface IntentResult {
  intent: SearchIntent;
  confidence: number;
  signals: string[];
}

interface EntityResult {
  entities: { type: string; value: string; label: string }[];
  remainder: string;
}

interface RelatedConcept {
  label: string;
  query: string;
}

interface DynamicApi {
  searchAdvanced?: (q: string, opts?: Record<string, unknown>) => AdvancedSearchResult[];
  didYouMean?: (q: string) => string | null;
  parseQuery?: (q: string) => ParsedQuery;
  detectIntent?: (qFolded: string) => IntentResult;
  extractEntities?: (qFolded: string) => EntityResult;
  relatedConcepts?: (qFolded: string, limit?: number) => RelatedConcept[];
  track?: (event: string, payload?: Record<string, unknown>) => void;
}

// ---------------------------------------------------------------------------
// Constantes visuais
// ---------------------------------------------------------------------------

const KIND_COLOR: Record<DocKind, string> = {
  'Área': 'bg-brand-50 text-brand-700',
  MBA: 'bg-sun-500/15 text-amber-800',
  Tema: 'bg-accent-500/10 text-accent-600',
  Estado: 'bg-surface-100 text-ink-700',
  Persona: 'bg-emerald-50 text-emerald-700',
  Guia: 'bg-rose-50 text-rose-700',
  FAQ: 'bg-indigo-50 text-indigo-700',
  'Glossário': 'bg-violet-50 text-violet-700',
  'Método': 'bg-teal-50 text-teal-700',
  'Evidência': 'bg-cyan-50 text-cyan-700',
  Caso: 'bg-amber-50 text-amber-800',
  'Intervenção': 'bg-fuchsia-50 text-fuchsia-700',
  Comparativo: 'bg-orange-50 text-orange-700',
  Carreira: 'bg-lime-50 text-lime-800',
  Recurso: 'bg-surface-100 text-ink-700',
};

const INTENT_LABELS: Record<SearchIntent, { label: string; classes: string }> = {
  find: { label: 'Buscando', classes: 'bg-surface-100 text-ink-700' },
  compare: { label: 'Comparando', classes: 'bg-orange-50 text-orange-700' },
  learn: { label: 'Aprendendo', classes: 'bg-indigo-50 text-indigo-700' },
  locate: { label: 'Localizando', classes: 'bg-cyan-50 text-cyan-700' },
  enroll: { label: 'Sobre matrícula', classes: 'bg-sun-500/15 text-amber-800' },
  unknown: { label: '', classes: '' },
};

interface FilterChip {
  id: 'all' | DocKind;
  label: string;
}

const FILTERS: FilterChip[] = [
  { id: 'all', label: 'Tudo' },
  { id: 'Área', label: 'Áreas' },
  { id: 'MBA', label: 'MBAs' },
  { id: 'Guia', label: 'Guias' },
  { id: 'FAQ', label: 'FAQs' },
  { id: 'Comparativo', label: 'Comparativos' },
  { id: 'Tema', label: 'Temas' },
  { id: 'Evidência', label: 'Evidências' },
  { id: 'Método', label: 'Métodos' },
  { id: 'Caso', label: 'Casos' },
  { id: 'Intervenção', label: 'Intervenções' },
  { id: 'Glossário', label: 'Glossário' },
  { id: 'Carreira', label: 'Carreira' },
];

const QUICK_QUERIES = ['NR-1', 'Burnout', 'POT', 'Neuro', 'IA', 'TEA', 'MBA', 'Supervisor'];

const HUBS: { label: string; href: string; sub: string }[] = [
  { label: 'Todas as áreas', href: '/areas', sub: '18 áreas' },
  { label: 'MBAs', href: '/mbas', sub: '5 cursos' },
  { label: 'Guias práticos', href: '/guias', sub: 'Passo a passo' },
  { label: 'Glossário', href: '/glossario', sub: '115 termos' },
  { label: 'Evidências', href: '/evidencias', sub: 'Revisões' },
  { label: 'Regulação', href: '/regulacao', sub: 'CFP, MEC, lato/stricto' },
];

const PERSONA_LABELS: Record<string, { label: string; href: string }> = {
  psicologos: { label: 'Para psicólogos', href: '/para-quem/psicologos' },
  rh: { label: 'Para RH', href: '/para-quem/rh' },
  lideres: { label: 'Para líderes e executivos', href: '/para-quem/lideres' },
  consultores: { label: 'Para consultores e saúde/educação', href: '/para-quem/consultores' },
};

const RECENT_STORAGE_KEY = 'pp_recent_q';
const RECENT_MAX = 12;
const PREFETCH_MAX = 6;
const PREFETCH_HOVER_MS = 300;
const PREFETCH_TTL_MS = 5000;
const DEBOUNCE_MS = 60;
const SKELETON_MS = 80;

// ---------------------------------------------------------------------------
// Tipos internos
// ---------------------------------------------------------------------------

interface RecentEntry {
  q: string;
  ts: number;
}

// ---------------------------------------------------------------------------
// Helpers inline
// ---------------------------------------------------------------------------

/** Debounce simples para queries; retorna o valor estabilizado. */
function useDebounce<T>(value: T, ms: number): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

/**
 * Formata um timestamp em tempo relativo curto: "agora", "há 5 min",
 * "há 1 dia". Sempre em português acentuado.
 */
function formatRelativeTime(ts: number, now: number = Date.now()): string {
  const diff = Math.max(0, now - ts);
  const s = Math.floor(diff / 1000);
  if (s < 30) return 'agora';
  if (s < 60) return `há ${s} s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `há ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `há ${h} h`;
  const d = Math.floor(h / 24);
  if (d < 7) return `há ${d} ${d === 1 ? 'dia' : 'dias'}`;
  const w = Math.floor(d / 7);
  if (w < 5) return `há ${w} sem`;
  const mo = Math.floor(d / 30);
  return `há ${mo} ${mo === 1 ? 'mês' : 'meses'}`;
}

/** Escapa string para uso seguro em RegExp. */
function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Envolve em `<mark>` todas as ocorrências de `terms` em `text`, case- e
 * accent-insensitive. Trabalha sobre o texto original preservando acentos.
 * Retorna React.ReactNode para renderização segura.
 */
function highlight(text: string, terms: string[]): React.ReactNode {
  if (!text) return text;
  const cleanTerms = Array.from(
    new Set(
      terms
        .map(t => (t || '').trim())
        .filter(t => t.length >= 2),
    ),
  );
  if (cleanTerms.length === 0) return text;

  // Constrói regex accent-insensitive mapeando cada char base p/ classe com acentos.
  const ACCENT_MAP: Record<string, string> = {
    a: '[aáàâãäåAÁÀÂÃÄÅ]',
    e: '[eéèêëEÉÈÊË]',
    i: '[iíìîïIÍÌÎÏ]',
    o: '[oóòôõöOÓÒÔÕÖ]',
    u: '[uúùûüUÚÙÛÜ]',
    c: '[cçCÇ]',
    n: '[nñNÑ]',
  };
  function patternFor(term: string): string {
    const folded = fold(term);
    let out = '';
    for (const ch of folded) {
      const lower = ch.toLowerCase();
      out += ACCENT_MAP[lower] || escapeRegExp(ch);
    }
    return out;
  }

  const combined = cleanTerms
    .sort((a, b) => b.length - a.length) // termos longos primeiro
    .map(patternFor)
    .join('|');
  let regex: RegExp;
  try {
    regex = new RegExp(`(${combined})`, 'giu');
  } catch {
    return text;
  }

  const parts: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  regex.lastIndex = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <mark key={`m-${m.index}-${parts.length}`} className="bg-sun-500/30 rounded px-0.5 text-ink-900">
        {m[0]}
      </mark>,
    );
    last = m.index + m[0].length;
    if (m[0].length === 0) regex.lastIndex++;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length > 0 ? parts : text;
}

function loadRecent(): RecentEntry[] {
  try {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem(RECENT_STORAGE_KEY) : null;
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    // Aceita formatos antigos (string[]) e novos ({q,ts}[])
    const normalized: RecentEntry[] = arr
      .map((x: unknown): RecentEntry | null => {
        if (typeof x === 'string') return { q: x, ts: 0 };
        if (
          x &&
          typeof x === 'object' &&
          typeof (x as RecentEntry).q === 'string' &&
          typeof (x as RecentEntry).ts === 'number'
        ) {
          return { q: (x as RecentEntry).q, ts: (x as RecentEntry).ts };
        }
        return null;
      })
      .filter((x): x is RecentEntry => x !== null)
      .slice(0, RECENT_MAX);
    return normalized;
  } catch {
    return [];
  }
}

function saveRecent(qRaw: string): void {
  const trimmed = qRaw.trim();
  if (!trimmed || trimmed.length < 2) return;
  try {
    const cur = loadRecent().filter(x => fold(x.q) !== fold(trimmed));
    const next: RecentEntry[] = [{ q: trimmed, ts: Date.now() }, ...cur].slice(0, RECENT_MAX);
    window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignora */
  }
}

function clearRecent(): void {
  try {
    window.localStorage.removeItem(RECENT_STORAGE_KEY);
  } catch {
    /* ignora */
  }
}

function readUrlQuery(): string {
  if (typeof window === 'undefined') return '';
  try {
    return new URL(window.location.href).searchParams.get('q') || '';
  } catch {
    return '';
  }
}

function writeUrlQuery(q: string): void {
  if (typeof window === 'undefined') return;
  try {
    const u = new URL(window.location.href);
    if (q) u.searchParams.set('q', q);
    else u.searchParams.delete('q');
    window.history.replaceState({}, '', u.toString());
  } catch {
    /* ignora */
  }
}

function crumbFromHref(href: string): string {
  if (!href) return '';
  const clean = href.split('#')[0].split('?')[0];
  if (clean === '/' || clean === '') return 'home';
  const parts = clean.split('/').filter(Boolean);
  return parts.slice(0, 2).join(' › ');
}

/** Detecta o melhor "completar inline" se houver 1 candidato dominante. */
function pickAutocomplete(q: string, results: SearchDoc[]): string {
  if (!q) return '';
  const folded = fold(q);
  if (!folded) return '';
  for (const r of results) {
    const t = fold(r.title);
    if (t.startsWith(folded) && t.length > folded.length) {
      const cut = r.title.length - (t.length - folded.length);
      return r.title.slice(cut);
    }
  }
  return '';
}

/** 3 sugestões alternativas para zero-result quando didYouMean não responde. */
function alternativeSuggestions(q: string): string[] {
  const fallback = [
    'NR-1 e riscos psicossociais',
    'MBA em POT',
    'Neuropsicologia',
    'Burnout',
    'Avaliação psicológica',
    'IA em RH',
  ];
  const folded = fold(q);
  const idx = buildIndex();
  const matches = idx
    .filter(d => fold(d.title).includes(folded.slice(0, 3)))
    .slice(0, 3)
    .map(d => d.title);
  return [...matches, ...fallback].filter((v, i, arr) => arr.indexOf(v) === i).slice(0, 3);
}

/** Carrega APIs avançadas sob demanda, com fallback silencioso. */
async function loadDynamicApi(): Promise<DynamicApi> {
  const api: DynamicApi = {};
  // search-index estendido
  try {
    const mod: Record<string, unknown> = await import('../lib/search-index');
    if (typeof mod.searchAdvanced === 'function') api.searchAdvanced = mod.searchAdvanced as DynamicApi['searchAdvanced'];
    if (typeof mod.didYouMean === 'function') api.didYouMean = mod.didYouMean as DynamicApi['didYouMean'];
  } catch {
    /* ignora */
  }
  try {
    const mod: Record<string, unknown> = await import('../lib/search-engine');
    if (typeof mod.parseQuery === 'function') api.parseQuery = mod.parseQuery as DynamicApi['parseQuery'];
  } catch {
    /* ignora */
  }
  try {
    const mod: Record<string, unknown> = await import('../lib/search-intent');
    if (typeof mod.detectIntent === 'function') api.detectIntent = mod.detectIntent as DynamicApi['detectIntent'];
  } catch {
    /* ignora */
  }
  try {
    const mod: Record<string, unknown> = await import('../lib/search-entities');
    if (typeof mod.extractEntities === 'function') api.extractEntities = mod.extractEntities as DynamicApi['extractEntities'];
  } catch {
    /* ignora */
  }
  try {
    const mod: Record<string, unknown> = await import('../lib/concepts');
    if (typeof mod.relatedConcepts === 'function') api.relatedConcepts = mod.relatedConcepts as DynamicApi['relatedConcepts'];
  } catch {
    /* ignora */
  }
  try {
    const mod: Record<string, unknown> = await import('../lib/search-analytics');
    if (typeof mod.track === 'function') api.track = mod.track as DynamicApi['track'];
  } catch {
    /* ignora */
  }
  return api;
}

/** Telemetria defensiva. */
function safeTrack(api: DynamicApi, event: string, payload?: Record<string, unknown>): void {
  try {
    if (api.track) api.track(event, payload);
  } catch {
    /* ignora */
  }
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

export default function SearchOverlay() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const [kindFilter, setKindFilter] = useState<'all' | DocKind>('all');
  const [recent, setRecent] = useState<RecentEntry[]>([]);
  const [api, setApi] = useState<DynamicApi>({});
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [removedEntities, setRemovedEntities] = useState<string[]>([]);
  const [didYouMeanDismissed, setDidYouMeanDismissed] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const prefetchRef = useRef<Map<string, { el: HTMLLinkElement; expires: number }>>(new Map());
  const hoverTimerRef = useRef<number | null>(null);
  const lastQueryTracked = useRef<string>('');

  const debouncedQ = useDebounce(q, DEBOUNCE_MS);
  const trendingDocs = useMemo(() => trending().slice(0, 6), []);
  const indexStats = useMemo(() => getIndexStats(), []);
  const isDev = useMemo(() => {
    if (typeof window === 'undefined') return false;
    try {
      return new URL(window.location.href).searchParams.get('dev') === '1';
    } catch {
      return false;
    }
  }, []);

  // ---------- carregamento das APIs dinâmicas ----------
  useEffect(() => {
    if (!open) return;
    let alive = true;
    loadDynamicApi().then(loaded => {
      if (alive) setApi(loaded);
    });
    return () => {
      alive = false;
    };
  }, [open]);

  // ---------- parse de operadores ----------
  const parsed: ParsedQuery | null = useMemo(() => {
    if (!debouncedQ.trim()) return null;
    if (api.parseQuery) {
      try {
        return api.parseQuery(debouncedQ);
      } catch {
        return null;
      }
    }
    return null;
  }, [debouncedQ, api.parseQuery]);

  // Aplica filtros parseados (kind:, persona:) ao filtro UI.
  const effectiveKindFilter: 'all' | DocKind = useMemo(() => {
    if (parsed?.filters.kind) {
      const want = parsed.filters.kind;
      const match = FILTERS.find(f => fold(String(f.id)) === want);
      if (match && match.id !== 'all') return match.id as DocKind;
    }
    return kindFilter;
  }, [parsed, kindFilter]);

  const effectivePersona: string | undefined = useMemo(() => {
    if (parsed?.filters.persona) return fold(parsed.filters.persona);
    return undefined;
  }, [parsed]);

  // Termos visíveis para o usuário (após remover operadores)
  const cleanQuery: string = useMemo(() => {
    if (!parsed) return debouncedQ.trim();
    const parts: string[] = [];
    for (const m of parsed.must) parts.push(m);
    for (const p of parsed.phrases) parts.push(`"${p}"`);
    return parts.join(' ').trim() || debouncedQ.trim();
  }, [parsed, debouncedQ]);

  // ---------- resultados (advanced ou fallback) ----------
  const advancedResults: AdvancedSearchResult[] = useMemo(() => {
    if (!debouncedQ.trim()) return [];
    if (api.searchAdvanced) {
      try {
        const opts: Record<string, unknown> = { limit: 24 };
        if (effectiveKindFilter !== 'all') opts.kind = effectiveKindFilter;
        if (effectivePersona) opts.persona = effectivePersona;
        if (parsed) opts.parsed = parsed;
        return api.searchAdvanced(debouncedQ, opts) || [];
      } catch {
        /* cai no fallback */
      }
    }
    // Fallback: API antiga + envelope manual
    const opts: { kind?: DocKind; persona?: string; limit?: number } = { limit: 24 };
    if (effectiveKindFilter !== 'all') opts.kind = effectiveKindFilter;
    if (effectivePersona) opts.persona = effectivePersona;
    const docs = search(debouncedQ, opts);
    const terms = (parsed?.must ?? [fold(debouncedQ)]).filter(Boolean);
    return docs.map((doc): AdvancedSearchResult => ({
      doc,
      score: 0,
      matchedTerms: terms,
      highlights: [],
    }));
  }, [debouncedQ, effectiveKindFilter, effectivePersona, parsed, api.searchAdvanced]);

  // Aplica filtros de entidades removidas (cliente)
  const results: AdvancedSearchResult[] = useMemo(() => {
    if (removedEntities.length === 0) return advancedResults;
    const out: AdvancedSearchResult[] = [];
    for (const r of advancedResults) {
      const haystack = `${fold(r.doc.title)} ${fold(r.doc.subtitle || '')} ${r.doc.keywords}`;
      let ok = true;
      for (const rem of removedEntities) {
        if (haystack.includes(rem)) {
          ok = false;
          break;
        }
      }
      if (ok) out.push(r);
    }
    return out;
  }, [advancedResults, removedEntities]);

  const docResults: SearchDoc[] = useMemo(() => results.map(r => r.doc), [results]);

  const autocomplete = useMemo(() => pickAutocomplete(debouncedQ, docResults), [debouncedQ, docResults]);

  // ---------- did-you-mean ----------
  const didYouMeanSuggestion: string | null = useMemo(() => {
    if (!debouncedQ.trim() || results.length >= 3) return null;
    if (didYouMeanDismissed === debouncedQ.trim()) return null;
    if (api.didYouMean) {
      try {
        const s = api.didYouMean(debouncedQ);
        if (s && fold(s) !== fold(debouncedQ)) return s;
      } catch {
        /* ignora */
      }
    }
    return null;
  }, [debouncedQ, results.length, api.didYouMean, didYouMeanDismissed]);

  // ---------- intent ----------
  const intent: IntentResult | null = useMemo(() => {
    if (!debouncedQ.trim() || !api.detectIntent) return null;
    try {
      const r = api.detectIntent(fold(debouncedQ));
      if (r && r.intent !== 'unknown' && r.intent !== 'find' && r.confidence >= 0.5) return r;
    } catch {
      /* ignora */
    }
    return null;
  }, [debouncedQ, api.detectIntent]);

  // ---------- entidades ----------
  const entities = useMemo(() => {
    if (!debouncedQ.trim() || !api.extractEntities) return null;
    try {
      return api.extractEntities(fold(debouncedQ));
    } catch {
      return null;
    }
  }, [debouncedQ, api.extractEntities]);

  // ---------- buscas relacionadas ----------
  const related: RelatedConcept[] = useMemo(() => {
    if (!debouncedQ.trim() || !api.relatedConcepts) return [];
    try {
      return api.relatedConcepts(fold(debouncedQ), 6) || [];
    } catch {
      return [];
    }
  }, [debouncedQ, api.relatedConcepts]);

  // ---------- skeleton transitório ----------
  useEffect(() => {
    if (!q.trim() || q.trim().length < 2) {
      setShowSkeleton(false);
      return;
    }
    setShowSkeleton(true);
    const t = setTimeout(() => setShowSkeleton(false), SKELETON_MS);
    return () => clearTimeout(t);
  }, [q]);

  // ---------- abertura, atalhos, triggers ----------
  useEffect(() => {
    const triggers = Array.from(document.querySelectorAll<HTMLElement>('[data-open-search]'));
    const onTrigger = () => setOpen(true);
    triggers.forEach(el => el.addEventListener('click', onTrigger));

    const onKey = (e: KeyboardEvent) => {
      const isMac = navigator.userAgent.includes('Mac');
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
        return;
      }
      const tag = (document.activeElement as HTMLElement | null)?.tagName;
      const inField = tag === 'INPUT' || tag === 'TEXTAREA';
      if (!inField && (e.key === '/' || e.key === '?')) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      triggers.forEach(el => el.removeEventListener('click', onTrigger));
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  // ---------- ao abrir: lê URL, foca, trava scroll ----------
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      const urlQ = readUrlQuery();
      if (urlQ) setQ(urlQ);
      setRecent(loadRecent());
      setTimeout(() => inputRef.current?.focus(), 30);
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  // ---------- reseta cursor ----------
  useEffect(() => {
    setActiveIdx(0);
  }, [q, kindFilter]);

  // ---------- atualiza URL ----------
  useEffect(() => {
    if (open) writeUrlQuery(q);
  }, [q, open]);

  // ---------- telemetria de query estabilizada ----------
  useEffect(() => {
    if (!open || !debouncedQ.trim()) return;
    if (lastQueryTracked.current === debouncedQ) return;
    lastQueryTracked.current = debouncedQ;
    safeTrack(api, 'search_query', {
      q: debouncedQ,
      n: results.length,
      kind: effectiveKindFilter,
      intent: intent?.intent || 'find',
    });
    if (results.length === 0) {
      safeTrack(api, 'search_zero_result', { q: debouncedQ });
    }
    if (didYouMeanSuggestion) {
      safeTrack(api, 'search_did_you_mean_shown', { q: debouncedQ, suggestion: didYouMeanSuggestion });
    }
  }, [debouncedQ, results.length, open, api, effectiveKindFilter, intent, didYouMeanSuggestion]);

  // ---------- limpeza de prefetch expirado ----------
  useEffect(() => {
    if (!open) return;
    const interval = window.setInterval(() => {
      const now = Date.now();
      const map = prefetchRef.current;
      for (const [href, entry] of Array.from(map.entries())) {
        if (entry.expires <= now) {
          try {
            entry.el.parentNode?.removeChild(entry.el);
          } catch {
            /* ignora */
          }
          map.delete(href);
        }
      }
    }, 1000);
    return () => window.clearInterval(interval);
  }, [open]);

  // Limpa prefetches quando o overlay fecha
  useEffect(() => {
    if (open) return;
    const map = prefetchRef.current;
    for (const [, entry] of Array.from(map.entries())) {
      try {
        entry.el.parentNode?.removeChild(entry.el);
      } catch {
        /* ignora */
      }
    }
    map.clear();
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    writeUrlQuery('');
    setQ('');
    setKindFilter('all');
    setRemovedEntities([]);
    setDidYouMeanDismissed('');
  }, []);

  const go = useCallback((href: string, query?: string, newTab: boolean = false) => {
    if (query) saveRecent(query);
    if (newTab) {
      try {
        window.open(href, '_blank', 'noopener,noreferrer');
        return;
      } catch {
        /* cai para mesma aba */
      }
    }
    window.location.href = href;
    setOpen(false);
  }, []);

  // ---------- prefetch on hover ----------
  const beginHoverPrefetch = useCallback((href: string) => {
    if (!href || href.startsWith('http')) return;
    if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = window.setTimeout(() => {
      const map = prefetchRef.current;
      if (map.has(href)) return;
      if (map.size >= PREFETCH_MAX) {
        // remove o mais antigo (FIFO simples)
        const firstKey = map.keys().next().value;
        if (firstKey) {
          const e = map.get(firstKey);
          if (e) {
            try {
              e.el.parentNode?.removeChild(e.el);
            } catch {
              /* ignora */
            }
            map.delete(firstKey);
          }
        }
      }
      try {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        link.setAttribute('data-pp-prefetch', '1');
        document.head.appendChild(link);
        map.set(href, { el: link, expires: Date.now() + PREFETCH_TTL_MS });
      } catch {
        /* ignora */
      }
    }, PREFETCH_HOVER_MS);
  }, []);

  const endHoverPrefetch = useCallback(() => {
    if (hoverTimerRef.current) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, []);

  // ---------- keyboard no input ----------
  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, Math.max(docResults.length - 1, 0)));
      scrollActiveIntoView(activeIdx + 1);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, 0));
      scrollActiveIntoView(Math.max(activeIdx - 1, 0));
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const target = docResults[activeIdx];
      if (target) {
        safeTrack(api, 'search_result_click', { q: debouncedQ, href: target.href, kind: target.kind, idx: activeIdx, newTab: e.shiftKey });
        go(target.href, q, e.shiftKey);
      } else if (q.trim()) {
        go(`/busca?q=${encodeURIComponent(q.trim())}`, q, e.shiftKey);
      }
      return;
    }
    if (e.key === 'Tab' && autocomplete) {
      e.preventDefault();
      setQ(q + autocomplete);
    }
  };

  const scrollActiveIntoView = (idx: number) => {
    requestAnimationFrame(() => {
      const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${idx}"]`);
      el?.scrollIntoView({ block: 'nearest' });
    });
  };

  const showZero = q.trim().length === 0;
  const noResults = !showZero && results.length === 0 && !showSkeleton;
  const visibleId = 'pp-search-listbox';

  // ---------- terms agregados p/ highlight ----------
  const allMatchedTerms = Array.from(
    new Set(
      results
        .flatMap(r => r.matchedTerms)
        .concat(parsed?.must || [])
        .concat(parsed?.phrases || [])
        .concat(debouncedQ ? [debouncedQ] : []),
    ),
  );

  // ---------- contagem para live region ----------
  const liveMessage = showZero
    ? 'Mostrando buscas recentes e sugestões.'
    : showSkeleton
      ? 'Buscando...'
      : results.length === 0
        ? `Nenhum resultado para ${debouncedQ}.${didYouMeanSuggestion ? ` Sugestão: ${didYouMeanSuggestion}.` : ''}`
        : `${results.length} ${results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'} · ${allMatchedTerms.length} ${allMatchedTerms.length === 1 ? 'termo casado' : 'termos casados'}.`;

  // ---------- montagem do link "ver todos" preservando filtros ----------
  const seeAllHref = (() => {
    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    if (effectiveKindFilter !== 'all') params.set('kind', String(effectiveKindFilter));
    if (effectivePersona) params.set('persona', effectivePersona);
    const qs = params.toString();
    return qs ? `/busca?${qs}` : '/busca';
  })();

  return (
    <AnimatePresence>
    {open && (
    <motion.div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Busca do portal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.18 }}
    >
      <div className="absolute inset-0 bg-brand-900/60 backdrop-blur-sm" onClick={close} />

      {/* Live region ARIA — invisível visualmente mas anunciado por leitores de tela */}
      <div role="status" aria-live="polite" className="sr-only">
        {liveMessage}
      </div>

      <motion.div
        className="relative mx-auto mt-4 sm:mt-16 max-w-2xl px-3 sm:px-4"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: reduce ? 0 : 0.22, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="rounded-2xl bg-white shadow-lift border border-surface-200 overflow-hidden">
          {/* Input + autocomplete */}
          <div className="flex items-center gap-3 px-4 sm:px-5 py-4 border-b border-surface-200">
            <svg
              className="w-5 h-5 text-ink-500 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <div className="relative w-full">
              <input
                ref={inputRef}
                data-search-input
                type="text"
                value={q}
                onChange={e => setQ(e.target.value)}
                className="relative z-10 w-full outline-none text-base bg-transparent"
                placeholder='Buscar áreas, MBAs, guias, FAQs, glossário... (tente "saúde mental" -burnout)'
                role="combobox"
                aria-controls={visibleId}
                aria-expanded={true}
                aria-activedescendant={docResults[activeIdx] ? `pp-opt-${activeIdx}` : undefined}
                aria-autocomplete="list"
                autoComplete="off"
                spellCheck={false}
                onKeyDown={onInputKey}
              />
              {autocomplete && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 z-0 flex items-center text-ink-300 text-base whitespace-pre"
                >
                  <span className="invisible">{q}</span>
                  <span>{autocomplete}</span>
                </span>
              )}
            </div>
            {intent && INTENT_LABELS[intent.intent].label && (
              <span
                className={`hidden sm:inline-flex shrink-0 text-[10px] font-semibold px-2 py-1 rounded-full ${INTENT_LABELS[intent.intent].classes}`}
                title={`Intenção detectada · confiança ${(intent.confidence * 100).toFixed(0)}%`}
              >
                {INTENT_LABELS[intent.intent].label}
              </span>
            )}
            <HelpTooltip />
            <button
              onClick={close}
              className="kbd hover:bg-surface-50"
              aria-label="Fechar busca"
            >
              Esc
            </button>
          </div>

          {/* Chips de operadores ativos + entidades */}
          {(parsed && (parsed.phrases.length > 0 || parsed.not.length > 0 || Object.keys(parsed.filters).length > 0)) ||
          (entities && entities.entities.length > 0) ? (
            <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap px-4 py-2 border-b border-surface-200 bg-surface-50/40 scrollbar-thin">
              {parsed?.phrases.map(p => (
                <Chip key={`ph-${p}`} label={`"${p}"`} onRemove={() => setQ(q.replace(new RegExp(`"${escapeRegExp(p)}"`, 'i'), '').trim())} tone="indigo" />
              ))}
              {parsed?.not.map(n => (
                <Chip key={`not-${n}`} label={`excluir ${n}`} onRemove={() => setQ(q.replace(new RegExp(`(^|\\s)-${escapeRegExp(n)}(?=\\s|$)`, 'i'), ' ').trim())} tone="rose" />
              ))}
              {parsed && Object.entries(parsed.filters).map(([k, v]) => (
                <Chip
                  key={`f-${k}`}
                  label={`${k}: ${v}`}
                  onRemove={() => setQ(q.replace(new RegExp(`(^|\\s)${escapeRegExp(k)}:${escapeRegExp(v)}(?=\\s|$)`, 'i'), ' ').trim())}
                  tone="brand"
                />
              ))}
              {entities?.entities.map(ent => {
                const valFolded = fold(ent.value);
                const removed = removedEntities.includes(valFolded);
                return (
                  <Chip
                    key={`ent-${ent.type}-${ent.value}`}
                    label={`${ent.label}: ${ent.value}`}
                    tone={removed ? 'muted' : 'cyan'}
                    onRemove={() => {
                      if (removed) {
                        setRemovedEntities(arr => arr.filter(x => x !== valFolded));
                      } else {
                        setRemovedEntities(arr => Array.from(new Set([...arr, valFolded])));
                      }
                    }}
                  />
                );
              })}
            </div>
          ) : null}

          {/* Filter chips (sticky, horizontal scroll no mobile pra nao quebrar linhas) */}
          <div className="sticky top-0 z-10 border-b border-surface-200 bg-surface-50/60 px-4 py-2 flex items-center gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap flex-1 -mx-1 px-1 scrollbar-thin">
              {FILTERS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setKindFilter(f.id)}
                  className={`shrink-0 text-xs px-2.5 py-1 rounded-full border transition ${
                    effectiveKindFilter === f.id
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-white text-ink-700 border-surface-200 hover:border-brand-300 hover:text-brand-700'
                  }`}
                  aria-pressed={effectiveKindFilter === f.id}
                >
                  {f.label}
                </button>
              ))}
            </div>
            {!showZero && results.length > 0 && (
              <span className="shrink-0 text-[11px] text-ink-500 hidden sm:inline">
                {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
              </span>
            )}
          </div>

          {/* Did-you-mean */}
          {didYouMeanSuggestion && (
            <div className="px-4 py-2 bg-sun-500/10 border-b border-sun-500/30 text-sm text-ink-800 flex items-center justify-between gap-3">
              <span>
                Você quis dizer{' '}
                <button
                  onClick={() => {
                    safeTrack(api, 'search_did_you_mean_used', { q: debouncedQ, suggestion: didYouMeanSuggestion });
                    setQ(didYouMeanSuggestion);
                  }}
                  className="font-semibold underline hover:text-brand-700"
                >
                  {didYouMeanSuggestion}
                </button>
                ?
              </span>
              <button
                onClick={() => setDidYouMeanDismissed(debouncedQ.trim())}
                className="text-xs text-ink-500 hover:text-ink-700"
                aria-label="Descartar sugestão"
              >
                ignorar
              </button>
            </div>
          )}

          {/* Resultados ou zero-state */}
          <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-2" id={visibleId} role="listbox">
            {showZero && (
              <ZeroState
                recent={recent}
                trendingDocs={trendingDocs}
                indexStats={indexStats}
                onGo={go}
                onSelectQuery={setQ}
                onClearRecent={() => {
                  clearRecent();
                  setRecent([]);
                }}
              />
            )}

            {!showZero && showSkeleton && results.length === 0 && <SkeletonRows />}

            {noResults && (
              <NoResults q={cleanQuery || q} onTry={s => setQ(s)} />
            )}

            {!showZero && results.length > 0 && (
              <ResultsList
                results={results}
                activeIdx={activeIdx}
                terms={allMatchedTerms}
                onActive={setActiveIdx}
                onGo={(href, kind) => {
                  safeTrack(api, 'search_result_click', { q: debouncedQ, href, kind });
                  go(href, q);
                }}
                onHover={beginHoverPrefetch}
                onHoverEnd={endHoverPrefetch}
                isDev={isDev}
              />
            )}

            {!showZero && results.length > 0 && related.length > 0 && (
              <div className="mt-4 mx-1 px-3 py-3 rounded-lg bg-surface-50 border border-surface-200">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-500 mb-1.5">
                  Pessoas também buscaram
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {related.map(r => (
                    <button
                      key={r.query}
                      onClick={() => setQ(r.query)}
                      className="text-xs px-2.5 py-1 rounded-full bg-white border border-surface-200 text-ink-700 hover:border-brand-300 hover:text-brand-700 transition"
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 sm:px-5 py-3 border-t border-surface-200 bg-surface-50 text-xs text-ink-500 flex flex-wrap items-center justify-between gap-2">
            <span>
              {q.trim() ? (
                <a
                  href={seeAllHref}
                  className="font-medium text-brand-700 hover:underline"
                  onClick={e => {
                    e.preventDefault();
                    go(seeAllHref, q);
                  }}
                >
                  Ver todos em {seeAllHref} →
                </a>
              ) : (
                <span>
                  Atalho global: <span className="kbd">⌘K</span>, <span className="kbd">/</span> ou <span className="kbd">?</span>
                </span>
              )}
            </span>
            <span className="hidden sm:inline">
              <span className="kbd">↑</span> <span className="kbd">↓</span> navegar · <span className="kbd">↵</span> abrir · <span className="kbd">⇧↵</span> nova aba · <span className="kbd">Tab</span> completar
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
    )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Subcomponentes
// ---------------------------------------------------------------------------

function HelpTooltip() {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        className="kbd hover:bg-surface-50"
        aria-label="Ajuda sobre operadores de busca"
      >
        ?
      </button>
      {show && (
        <div
          role="tooltip"
          className="absolute right-0 top-full mt-1 z-20 w-72 p-3 bg-white border border-surface-200 rounded-lg shadow-lift text-xs text-ink-700"
        >
          <div className="font-semibold text-ink-900 mb-1.5">Operadores de busca</div>
          <ul className="space-y-1">
            <li><code className="bg-surface-100 px-1 rounded">kind:guia</code> filtra por tipo</li>
            <li><code className="bg-surface-100 px-1 rounded">persona:rh</code> filtra por perfil</li>
            <li><code className="bg-surface-100 px-1 rounded">"frase exata"</code> exige frase</li>
            <li><code className="bg-surface-100 px-1 rounded">-excluir</code> remove termo</li>
          </ul>
          <div className="mt-2 text-ink-500">Exemplo: <code className="bg-surface-100 px-1 rounded">kind:mba pot -clinica</code></div>
        </div>
      )}
    </div>
  );
}

type ChipTone = 'brand' | 'indigo' | 'rose' | 'cyan' | 'muted';

function Chip({ label, onRemove, tone = 'brand' }: { label: string; onRemove?: () => void; tone?: ChipTone }) {
  const toneClass: Record<ChipTone, string> = {
    brand: 'bg-brand-50 text-brand-700 border-brand-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    muted: 'bg-surface-100 text-ink-500 border-surface-200 line-through',
  };
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${toneClass[tone]}`}>
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-0.5 inline-flex items-center justify-center hover:opacity-70"
          aria-label={`Remover filtro ${label}`}
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
    </span>
  );
}

function SkeletonRows() {
  return (
    <div className="space-y-1 px-1.5 py-2 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-50">
          <div className="w-12 h-3.5 rounded bg-surface-200" />
          <div className="flex-1 h-3.5 rounded bg-surface-200" />
          <div className="w-20 h-3 rounded bg-surface-200 hidden sm:block" />
        </div>
      ))}
    </div>
  );
}

function ZeroState({
  recent,
  trendingDocs,
  indexStats,
  onGo,
  onSelectQuery,
  onClearRecent,
}: {
  recent: RecentEntry[];
  trendingDocs: SearchDoc[];
  indexStats: { docs: number; terms: number; avgDocLen: number; kinds: Record<DocKind, number> };
  onGo: (href: string, query?: string) => void;
  onSelectQuery: (q: string) => void;
  onClearRecent: () => void;
}) {
  const personaSections = ['psicologos', 'rh', 'lideres', 'consultores'] as const;
  const trendingPills: string[] = [
    'NR-1 riscos psicossociais',
    'MBA POT 2026',
    'TCC ou ACT',
    'Burnout',
    'IA em RH',
    'Neuropsicologia',
    'TEA adulto',
    'Avaliação psicológica',
  ];
  const now = Date.now();
  const coverageLine = (() => {
    const k = indexStats.kinds;
    const parts: string[] = [];
    if (k['Área']) parts.push(`${k['Área']} áreas`);
    if (k['MBA']) parts.push(`${k['MBA']} MBAs`);
    if (k['Guia']) parts.push(`${k['Guia']} guias`);
    if (k['Comparativo']) parts.push(`${k['Comparativo']} comparativos`);
    if (k['FAQ']) parts.push(`${k['FAQ']} FAQs`);
    if (k['Tema']) parts.push(`${k['Tema']} temas`);
    return parts.slice(0, 5).join(' · ');
  })();
  return (
    <div className="space-y-5 px-1.5 py-2">
      <div className="rounded-lg bg-brand-50/60 border border-brand-100 px-3 py-2 text-[11px] text-brand-800">
        <span className="font-semibold">{indexStats.docs}</span> entradas indexadas no portal
        {coverageLine && <span className="text-ink-500"> · {coverageLine}</span>}
      </div>
      {recent.length > 0 && (
        <Section
          title="Buscas recentes"
          action={
            <button
              onClick={onClearRecent}
              className="text-[10px] text-ink-500 hover:text-rose-700"
            >
              Limpar histórico
            </button>
          }
        >
          <div className="flex flex-wrap gap-1.5">
            {recent.map(r => (
              <button
                key={`${r.q}-${r.ts}`}
                onClick={() => onSelectQuery(r.q)}
                className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-surface-100 text-ink-700 hover:bg-brand-50 hover:text-brand-700 transition"
              >
                <span>{r.q}</span>
                {r.ts > 0 && <span className="text-[10px] text-ink-400">{formatRelativeTime(r.ts, now)}</span>}
              </button>
            ))}
          </div>
        </Section>
      )}

      <Section title="Por onde começar">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {personaSections.map(pid => {
            const meta = PERSONA_LABELS[pid];
            const sample = byPersona(pid)[0];
            return (
              <button
                key={pid}
                onClick={() => onGo(meta.href)}
                className="flex flex-col items-start gap-0.5 text-left px-3 py-2.5 rounded-lg border border-surface-200 hover:border-brand-300 hover:bg-brand-50/40 transition"
              >
                <span className="text-sm font-medium text-ink-900">{meta.label}</span>
                {sample && <span className="text-xs text-ink-500 truncate w-full">Sugestão: {sample.title}</span>}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Buscas em alta">
        <div className="flex flex-wrap gap-1.5">
          {trendingPills.map(p => (
            <button
              key={p}
              onClick={() => onSelectQuery(p)}
              className="text-xs px-2.5 py-1 rounded-full bg-sun-500/15 text-amber-800 hover:bg-sun-500/25 transition"
            >
              {p}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Trending agora">
        <div className="grid grid-cols-1 gap-0.5">
          {trendingDocs.map((d, i) => (
            <button
              key={d.id}
              onClick={() => onGo(d.href)}
              className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg hover:bg-surface-50 transition text-left"
              data-idx={i}
            >
              <span className="flex items-center gap-2 min-w-0">
                <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded font-semibold ${KIND_COLOR[d.kind]}`}>{d.kind}</span>
                <span className="truncate text-sm text-ink-900">{d.title}</span>
              </span>
              <span className="text-ink-500 text-xs shrink-0">{crumbFromHref(d.href)}</span>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Hubs principais">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {HUBS.map(h => (
            <button
              key={h.href}
              onClick={() => onGo(h.href)}
              className="flex flex-col items-start text-left px-3 py-2 rounded-lg border border-surface-200 hover:border-brand-300 hover:bg-brand-50/40 transition"
            >
              <span className="text-sm font-medium text-ink-900">{h.label}</span>
              <span className="text-xs text-ink-500">{h.sub}</span>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Buscas rápidas">
        <div className="flex flex-wrap gap-1.5">
          {QUICK_QUERIES.map(qq => (
            <button
              key={qq}
              onClick={() => onSelectQuery(qq)}
              className="text-xs px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 hover:bg-brand-100 transition"
            >
              {qq}
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
}

function NoResults({ q, onTry }: { q: string; onTry: (s: string) => void }) {
  const suggestions = alternativeSuggestions(q);
  return (
    <div className="px-4 py-8 text-center">
      <p className="text-ink-700 text-sm">
        Nada encontrado para "<strong>{q}</strong>". Tente buscar de outro jeito:
      </p>
      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {suggestions.map(s => (
          <button
            key={s}
            onClick={() => onTry(s)}
            className="text-xs px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 hover:bg-brand-100 transition"
          >
            {s}
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs text-ink-500">
        Ou veja a busca completa em <span className="underline">/busca?q={encodeURIComponent(q)}</span>
      </p>
    </div>
  );
}

function ResultsList({
  results,
  activeIdx,
  terms,
  onActive,
  onGo,
  onHover,
  onHoverEnd,
  isDev,
}: {
  results: AdvancedSearchResult[];
  activeIdx: number;
  terms: string[];
  onActive: (i: number) => void;
  onGo: (href: string, kind: DocKind) => void;
  onHover: (href: string) => void;
  onHoverEnd: () => void;
  isDev: boolean;
}) {
  // Next step só faz sentido quando há um item bem dominante
  const showNextStep = results.length > 0 && results.length <= 3;
  const top = results[0]?.doc;
  const topPersona = top ? getPersonaFor(top.href) : null;
  const nextSteps = showNextStep && top ? getNextSteps(top.href, topPersona || undefined) : [];
  const firstNext = nextSteps[0]?.items[0];

  return (
    <>
      {results.map((r, i) => {
        const d = r.doc;
        return (
          <a
            key={d.id}
            id={`pp-opt-${i}`}
            data-idx={i}
            href={d.href}
            role="option"
            aria-selected={i === activeIdx}
            onClick={e => {
              e.preventDefault();
              onGo(d.href, d.kind);
            }}
            onMouseEnter={() => {
              onActive(i);
              onHover(d.href);
            }}
            onMouseLeave={onHoverEnd}
            className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition ${
              i === activeIdx ? 'bg-brand-50/60 ring-1 ring-brand-200' : 'hover:bg-surface-50'
            }`}
          >
            <span className="flex items-center gap-3 min-w-0">
              <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded font-semibold ${KIND_COLOR[d.kind]}`}>{d.kind}</span>
              <span className="flex flex-col min-w-0">
                <span className="truncate text-sm text-ink-900">{highlight(d.title, terms)}</span>
                {d.subtitle && (
                  <span className="truncate text-xs text-ink-500">{highlight(d.subtitle, terms)}</span>
                )}
              </span>
            </span>
            <span className="flex items-center gap-2 shrink-0">
              {isDev && r.score > 0 && (
                <span
                  className="text-[10px] text-ink-400 font-mono"
                  title={`BM25 score · termos: ${r.matchedTerms.join(', ')}`}
                >
                  {r.score.toFixed(2)}
                </span>
              )}
              <span className="text-ink-400 text-[11px] hidden sm:inline">{crumbFromHref(d.href)}</span>
            </span>
          </a>
        );
      })}

      {firstNext && (
        <div className="mt-3 mx-1 px-3 py-2 rounded-lg border border-dashed border-brand-200 bg-brand-50/40 text-xs text-ink-700">
          <span className="font-medium text-brand-700">→ Próximo passo:</span>{' '}
          <a
            href={firstNext.href}
            className="underline hover:text-brand-700"
            onClick={e => {
              e.preventDefault();
              onGo(firstNext.href, top?.kind || 'Recurso');
            }}
          >
            {firstNext.label}
          </a>{' '}
          <span className="text-ink-500">· {firstNext.hint}</span>
        </div>
      )}
    </>
  );
}

function Section({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between px-2 mb-1.5">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">{title}</div>
        {action}
      </div>
      {children}
    </div>
  );
}
