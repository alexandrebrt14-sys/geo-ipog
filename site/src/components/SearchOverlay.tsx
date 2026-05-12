/**
 * SearchOverlay — busca semântica global do portal.
 *
 * Recursos:
 *  - acento-fold + expansão por sinônimos (lib/search-index.ts)
 *  - autocomplete inline quando há 1 candidato top
 *  - filtros por tipo (chips no topo)
 *  - zero-state com 4 seções: começar, trending, hubs, buscas rápidas
 *  - histórico em localStorage (`pp_recent_q`)
 *  - sincroniza com URL via pushState (?q=)
 *  - keyboard: cmd+K / ctrl+K / `/`, ↑↓, Enter, Esc, Tab
 *  - sugestões alternativas quando 0 resultados
 *  - link "ver todos em /busca?q=..." no footer
 *  - badge de kind + crumb do path + linha de próximo passo
 *  - acessibilidade: combobox, aria-activedescendant, aria-expanded
 *
 * Triggers: cliques em elementos com `data-open-search` + atalhos teclado.
 * Mantém API pública: `<SearchOverlay client:idle />` em Base.astro.
 *
 * REGRA #0: todo texto visível em português brasileiro com acentuação completa.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  buildIndex,
  fold,
  search,
  trending,
  byPersona,
  type DocKind,
  type SearchDoc,
} from '../lib/search-index';
import { getNextSteps, getPersonaFor } from '../lib/taxonomy';

// ---------------------------------------------------------------------------
// Constantes visuais
// ---------------------------------------------------------------------------

const KIND_COLOR: Record<DocKind, string> = {
  Área: 'bg-brand-50 text-brand-700',
  MBA: 'bg-sun-500/15 text-amber-800',
  Tema: 'bg-accent-500/10 text-accent-600',
  Estado: 'bg-surface-100 text-ink-700',
  Persona: 'bg-emerald-50 text-emerald-700',
  Guia: 'bg-rose-50 text-rose-700',
  FAQ: 'bg-indigo-50 text-indigo-700',
  Glossário: 'bg-violet-50 text-violet-700',
  Método: 'bg-teal-50 text-teal-700',
  Evidência: 'bg-cyan-50 text-cyan-700',
  Caso: 'bg-amber-50 text-amber-800',
  Intervenção: 'bg-fuchsia-50 text-fuchsia-700',
  Comparativo: 'bg-orange-50 text-orange-700',
  Carreira: 'bg-lime-50 text-lime-800',
  Recurso: 'bg-surface-100 text-ink-700',
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
  { id: 'Glossário', label: 'Glossário' },
  { id: 'Evidência', label: 'Evidências' },
  { id: 'Caso', label: 'Casos' },
  { id: 'Intervenção', label: 'Intervenções' },
  { id: 'Método', label: 'Métodos' },
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
const RECENT_MAX = 4;

// ---------------------------------------------------------------------------
// Utilitários internos
// ---------------------------------------------------------------------------

function loadRecent(): string[] {
  try {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem(RECENT_STORAGE_KEY) : null;
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) return arr.filter((x: unknown): x is string => typeof x === 'string').slice(0, RECENT_MAX);
  } catch {
    /* localStorage indisponível */
  }
  return [];
}

function saveRecent(q: string): void {
  const trimmed = q.trim();
  if (!trimmed || trimmed.length < 2) return;
  try {
    const cur = loadRecent().filter(x => fold(x) !== fold(trimmed));
    const next = [trimmed, ...cur].slice(0, RECENT_MAX);
    window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(next));
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
      // devolve a continuação do título original (com acentos)
      // procura o ponto de corte no original equivalente.
      const cut = r.title.length - (t.length - folded.length);
      return r.title.slice(cut);
    }
  }
  return '';
}

/** Gera 3 sugestões alternativas quando não há resultado. */
function alternativeSuggestions(q: string): string[] {
  const fallback = ['NR-1 e riscos psicossociais', 'MBA em POT', 'Neuropsicologia', 'Burnout', 'Avaliação psicológica', 'IA em RH'];
  const folded = fold(q);
  const idx = buildIndex();
  const matches = idx
    .filter(d => fold(d.title).includes(folded.slice(0, 3)))
    .slice(0, 3)
    .map(d => d.title);
  return [...matches, ...fallback].filter((v, i, arr) => arr.indexOf(v) === i).slice(0, 3);
}

// ---------------------------------------------------------------------------
// Componente
// ---------------------------------------------------------------------------

export default function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const [kindFilter, setKindFilter] = useState<'all' | DocKind>('all');
  const [recent, setRecent] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const trendingDocs = useMemo(() => trending().slice(0, 6), []);

  const results = useMemo(() => {
    const opts = kindFilter === 'all' ? {} : { kind: kindFilter };
    if (!q.trim()) return [];
    return search(q, { ...opts, limit: 24 });
  }, [q, kindFilter]);

  const autocomplete = useMemo(() => pickAutocomplete(q, results), [q, results]);

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
      }
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA'].includes((document.activeElement as HTMLElement)?.tagName)
      ) {
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

  // ---------- reseta cursor ao mudar query/filtro ----------
  useEffect(() => {
    setActiveIdx(0);
  }, [q, kindFilter]);

  // ---------- atualiza URL ----------
  useEffect(() => {
    if (open) writeUrlQuery(q);
  }, [q, open]);

  const close = useCallback(() => {
    setOpen(false);
    writeUrlQuery('');
    setQ('');
    setKindFilter('all');
  }, []);

  const go = useCallback(
    (href: string, query?: string) => {
      if (query) saveRecent(query);
      window.location.href = href;
      setOpen(false);
    },
    []
  );

  // ---------- keyboard no input ----------
  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, Math.max(results.length - 1, 0)));
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
      if (results[activeIdx]) {
        go(results[activeIdx].href, q);
      } else if (q.trim()) {
        // "ver todos os resultados em /busca?q=…"
        go(`/busca?q=${encodeURIComponent(q.trim())}`, q);
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

  if (!open) return null;

  const showZero = q.trim().length === 0;
  const noResults = !showZero && results.length === 0;
  const visibleId = `pp-search-listbox`;

  return (
    <div
      className="fixed inset-0 z-50 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Busca do portal"
    >
      <div className="absolute inset-0 bg-brand-900/60 backdrop-blur-sm" onClick={close} />
      <div className="relative mx-auto mt-16 max-w-2xl px-4 animate-slide-up">
        <div className="rounded-2xl bg-white shadow-lift border border-surface-200 overflow-hidden">
          {/* Input + autocomplete */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-surface-200">
            <svg className="w-5 h-5 text-ink-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
            <div className="relative w-full">
              <input
                ref={inputRef}
                type="text"
                value={q}
                onChange={e => setQ(e.target.value)}
                className="relative z-10 w-full outline-none text-base bg-transparent"
                placeholder="Buscar áreas, MBAs, guias, FAQs, glossário..."
                role="combobox"
                aria-controls={visibleId}
                aria-expanded={true}
                aria-activedescendant={results[activeIdx] ? `pp-opt-${activeIdx}` : undefined}
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
            <button onClick={close} className="kbd hover:bg-surface-50" aria-label="Fechar busca">Esc</button>
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap items-center gap-1.5 px-4 py-2 border-b border-surface-200 bg-surface-50/60">
            {FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => setKindFilter(f.id)}
                className={`text-xs px-2.5 py-1 rounded-full border transition ${
                  kindFilter === f.id
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-ink-700 border-surface-200 hover:border-brand-300 hover:text-brand-700'
                }`}
                aria-pressed={kindFilter === f.id}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Resultados ou zero-state */}
          <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-2" id={visibleId} role="listbox">
            {showZero && <ZeroState recent={recent} trendingDocs={trendingDocs} onGo={go} onSelectQuery={setQ} />}

            {noResults && (
              <NoResults
                q={q}
                onTry={(suggestion: string) => setQ(suggestion)}
              />
            )}

            {!showZero && results.length > 0 && (
              <ResultsList results={results} activeIdx={activeIdx} q={q} onActive={setActiveIdx} onGo={(href) => go(href, q)} />
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-surface-200 bg-surface-50 text-xs text-ink-500 flex flex-wrap items-center justify-between gap-2">
            <span>
              {q.trim() ? (
                <a
                  href={`/busca?q=${encodeURIComponent(q.trim())}`}
                  className="font-medium text-brand-700 hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    go(`/busca?q=${encodeURIComponent(q.trim())}`, q);
                  }}
                >
                  Ver todos os resultados para "{q.trim()}" →
                </a>
              ) : (
                <span>Atalho global: <span className="kbd">⌘K</span> ou <span className="kbd">/</span></span>
              )}
            </span>
            <span><span className="kbd">↑</span> <span className="kbd">↓</span> navegar · <span className="kbd">↵</span> abrir · <span className="kbd">Tab</span> completar</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Subcomponentes
// ---------------------------------------------------------------------------

function ZeroState({
  recent,
  trendingDocs,
  onGo,
  onSelectQuery,
}: {
  recent: string[];
  trendingDocs: SearchDoc[];
  onGo: (href: string, query?: string) => void;
  onSelectQuery: (q: string) => void;
}) {
  // Recomendados por persona (4 personas)
  const personaSections = ['psicologos', 'rh', 'lideres', 'consultores'] as const;
  return (
    <div className="space-y-5 px-1.5 py-2">
      {recent.length > 0 && (
        <Section title="Buscas recentes">
          <div className="flex flex-wrap gap-1.5">
            {recent.map(r => (
              <button
                key={r}
                onClick={() => onSelectQuery(r)}
                className="text-xs px-2.5 py-1 rounded-full bg-surface-100 text-ink-700 hover:bg-brand-50 hover:text-brand-700 transition"
              >
                {r}
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
              <span className="text-ink-300 text-xs shrink-0">{crumbFromHref(d.href)}</span>
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
        Nada encontrado para "<strong>{q}</strong>". Não encontrou? Tente buscar de outro jeito:
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
  q,
  onActive,
  onGo,
}: {
  results: SearchDoc[];
  activeIdx: number;
  q: string;
  onActive: (i: number) => void;
  onGo: (href: string) => void;
}) {
  // Next step só faz sentido quando há um item bem dominante
  const showNextStep = results.length > 0 && results.length <= 3;
  const top = results[0];
  const topPersona = top ? getPersonaFor(top.href) : null;
  const nextSteps = showNextStep && top ? getNextSteps(top.href, topPersona || undefined) : [];
  const firstNext = nextSteps[0]?.items[0];

  return (
    <>
      {results.map((d, i) => (
        <a
          key={d.id}
          id={`pp-opt-${i}`}
          data-idx={i}
          href={d.href}
          role="option"
          aria-selected={i === activeIdx}
          onClick={(e) => {
            e.preventDefault();
            onGo(d.href);
          }}
          onMouseEnter={() => onActive(i)}
          className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition ${
            i === activeIdx ? 'bg-brand-50/60 ring-1 ring-brand-200' : 'hover:bg-surface-50'
          }`}
        >
          <span className="flex items-center gap-3 min-w-0">
            <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded font-semibold ${KIND_COLOR[d.kind]}`}>{d.kind}</span>
            <span className="flex flex-col min-w-0">
              <span className="truncate text-sm text-ink-900">{d.title}</span>
              {d.subtitle && <span className="truncate text-xs text-ink-500">{d.subtitle}</span>}
            </span>
          </span>
          <span className="text-ink-400 text-[11px] shrink-0 hidden sm:inline">{crumbFromHref(d.href)}</span>
        </a>
      ))}

      {firstNext && (
        <div className="mt-3 mx-1 px-3 py-2 rounded-lg border border-dashed border-brand-200 bg-brand-50/40 text-xs text-ink-700">
          <span className="font-medium text-brand-700">→ Próximo passo:</span>{' '}
          <a
            href={firstNext.href}
            className="underline hover:text-brand-700"
            onClick={(e) => {
              e.preventDefault();
              onGo(firstNext.href);
            }}
          >
            {firstNext.label}
          </a>{' '}
          <span className="text-ink-500">· {firstNext.hint}</span>
        </div>
      )}

      <input type="hidden" value={q} aria-hidden="true" />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-500 px-2 mb-1.5">{title}</div>
      {children}
    </div>
  );
}
