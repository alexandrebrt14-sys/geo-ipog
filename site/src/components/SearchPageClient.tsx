import { useEffect, useMemo, useRef, useState } from 'react';
import { search, expandQuery } from '../lib/search-index';
import type { SearchDoc, DocKind } from '../lib/search-index';
import { getNextSteps } from '../lib/taxonomy';
import SearchSuggestions from './SearchSuggestions';
import PersonaQuickPicker from './PersonaQuickPicker';

interface Props {
  initialQ?: string;
  initialKind?: string;
  initialPersona?: string;
}

const KIND_LABEL: Record<string, string> = {
  area: 'Áreas',
  mba: 'MBAs',
  tema: 'Temas',
  guia: 'Guias',
  faq: 'FAQs',
  glossario: 'Glossário',
  evidencia: 'Evidências',
  caso: 'Casos',
  intervencao: 'Intervenções',
  metodo: 'Métodos',
  estado: 'Estados',
  persona: 'Personas',
  comparativo: 'Comparativos'
};

const KIND_BADGE: Record<string, string> = {
  area: 'bg-brand-50 text-brand-700',
  mba: 'bg-sun-500/15 text-amber-800',
  tema: 'bg-accent-500/10 text-accent-600',
  guia: 'bg-emerald-50 text-emerald-700',
  faq: 'bg-rose-50 text-rose-700',
  glossario: 'bg-violet-50 text-violet-700',
  evidencia: 'bg-cyan-50 text-cyan-700',
  caso: 'bg-orange-50 text-orange-700',
  intervencao: 'bg-teal-50 text-teal-700',
  metodo: 'bg-indigo-50 text-indigo-700',
  estado: 'bg-surface-100 text-ink-700',
  persona: 'bg-amber-50 text-amber-800',
  comparativo: 'bg-fuchsia-50 text-fuchsia-700'
};

function kindLabel(kind: string): string {
  return KIND_LABEL[kind] ?? kind;
}

function badgeClass(kind: string): string {
  return KIND_BADGE[kind] ?? 'bg-surface-100 text-ink-700';
}

const PERSONA_OPTIONS: { id: string; label: string }[] = [
  { id: '', label: 'Todos os perfis' },
  { id: 'psicologos', label: 'Psicólogo' },
  { id: 'rh', label: 'RH' },
  { id: 'lideres', label: 'Líder ou executivo' },
  { id: 'consultores', label: 'Consultor · saúde · educação' }
];

function safeNextStep(doc: SearchDoc, persona?: string): { label: string; href: string } | null {
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

export default function SearchPageClient({ initialQ = '', initialKind = '', initialPersona = '' }: Props) {
  const [q, setQ] = useState(initialQ);
  const [kind, setKind] = useState<string>(initialKind);
  const [persona, setPersona] = useState<string>(initialPersona);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);

  // Sincroniza persona com localStorage e eventos globais
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
    return () => window.removeEventListener('pp:persona-change', handler as EventListener);
  }, [initialPersona]);

  // Reage a navegação back/forward
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = () => {
      const params = new URLSearchParams(window.location.search);
      setQ(params.get('q') ?? '');
      setKind(params.get('kind') ?? '');
      setPersona(params.get('persona') ?? '');
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  // Atualiza URL quando estado muda
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    if (kind) params.set('kind', kind);
    if (persona) params.set('persona', persona);
    const qs = params.toString();
    const next = qs ? `/busca?${qs}` : '/busca';
    window.history.replaceState({}, '', next);
  }, [q, kind, persona]);

  // Busca completa
  const fullResults = useMemo(() => {
    if (!q.trim()) return [] as SearchDoc[];
    return search(q, { persona: persona || undefined, limit: 100 });
  }, [q, persona]);

  // Contagem por kind (antes do filtro de kind)
  const countsByKind = useMemo(() => {
    const counts: Record<string, number> = {};
    fullResults.forEach(doc => {
      counts[doc.kind] = (counts[doc.kind] ?? 0) + 1;
    });
    return counts;
  }, [fullResults]);

  // Resultados filtrados por kind
  const results = useMemo(() => {
    if (!kind) return fullResults;
    return fullResults.filter(doc => doc.kind === kind);
  }, [fullResults, kind]);

  const expansions = useMemo(() => {
    if (!q.trim() || results.length > 0) return [] as string[];
    try {
      const exp = expandQuery(q);
      return exp.filter(e => e.toLowerCase() !== q.trim().toLowerCase()).slice(0, 6);
    } catch {
      return [];
    }
  }, [q, results.length]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) setQ(inputRef.current.value);
  };

  const clearFilters = () => {
    setKind('');
    setPersona('');
  };

  const totalCount = fullResults.length;
  const hasActiveFilters = Boolean(kind || persona);
  const trimmedQ = q.trim();

  return (
    <div className="space-y-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="rounded-2xl border border-surface-200 bg-white p-4 shadow-soft sm:p-5">
        <label htmlFor="busca-q" className="text-[11px] font-semibold uppercase tracking-wide text-brand-700">
          Sua busca
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-surface-200 bg-surface-50 px-4">
            <svg className="h-5 w-5 shrink-0 text-ink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              ref={inputRef}
              id="busca-q"
              type="search"
              defaultValue={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Digite: NR-1, burnout, POT, neuropsicologia, supervisor clínico…"
              className="h-12 w-full bg-transparent text-base outline-none"
              aria-label="Campo de busca"
              autoComplete="off"
            />
            {q && (
              <button
                type="button"
                onClick={() => { setQ(''); inputRef.current?.focus(); }}
                className="text-xs font-semibold text-ink-500 hover:text-brand-800"
                aria-label="Limpar busca"
              >
                Limpar
              </button>
            )}
          </div>
          <button type="submit" className="btn-primary px-6">Buscar</button>
        </div>

        {/* Filtros */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-surface-200 pt-4">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-500">Filtros:</span>
          <label className="sr-only" htmlFor="busca-persona">Perfil</label>
          <select
            id="busca-persona"
            value={persona}
            onChange={e => setPersona(e.target.value)}
            className="rounded-full border border-surface-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink-700 hover:border-brand-400"
          >
            {PERSONA_OPTIONS.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
          {trimmedQ && Object.keys(countsByKind).length > 0 && (
            <>
              <button
                type="button"
                onClick={() => setKind('')}
                className={`chip text-xs ${!kind ? 'chip-active' : ''}`}
              >
                Tudo ({totalCount})
              </button>
              {Object.entries(countsByKind)
                .sort((a, b) => b[1] - a[1])
                .map(([k, c]) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setKind(k === kind ? '' : k)}
                    className={`chip text-xs ${kind === k ? 'chip-active' : ''}`}
                  >
                    {kindLabel(k)} ({c})
                  </button>
                ))}
            </>
          )}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="ml-auto text-xs font-semibold text-ink-500 hover:text-brand-800"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </form>

      {/* Quando q vazio — zero state */}
      {!trimmedQ && (
        <div className="space-y-10">
          <SearchSuggestions variant="page" persona={persona || undefined} />
          <PersonaQuickPicker variant="page" />
        </div>
      )}

      {/* Quando q com resultados */}
      {trimmedQ && results.length > 0 && (
        <section aria-live="polite" aria-busy="false" className="space-y-4">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-display text-lg font-semibold text-ink-900">
              {results.length} resultado{results.length === 1 ? '' : 's'} para "{trimmedQ}"
            </h2>
            {persona && (
              <span className="text-xs text-ink-500">
                Filtro de perfil ativo: <span className="font-semibold text-ink-700">{PERSONA_OPTIONS.find(p => p.id === persona)?.label}</span>
              </span>
            )}
          </div>

          <ul className="grid gap-4 lg:grid-cols-2">
            {results.map(doc => {
              const next = safeNextStep(doc, persona || undefined);
              return (
                <li key={doc.href}>
                  <a
                    href={doc.href}
                    className="card-lift block h-full p-5"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase ${badgeClass(doc.kind)}`}>
                        {kindLabel(doc.kind)}
                      </span>
                      {doc.tags && doc.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="rounded-full bg-surface-100 px-2 py-0.5 text-[10px] font-medium text-ink-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-2 font-display text-base font-semibold text-ink-900">{doc.title}</h3>
                    {doc.subtitle && (
                      <p className="mt-1 text-sm text-ink-700 leading-snug">{doc.subtitle}</p>
                    )}
                    {next && (
                      <div className="mt-3 border-t border-surface-200 pt-3 text-[11px] text-ink-500">
                        Próximo passo: <span className="font-semibold text-brand-700">{next.label}</span>
                      </div>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Quando q sem resultado */}
      {trimmedQ && results.length === 0 && (
        <section className="rounded-2xl border border-dashed border-surface-200 bg-white p-8 text-center">
          <div className="font-display text-lg font-semibold text-ink-900">
            Nenhum resultado para "{trimmedQ}"{kind ? ` em ${kindLabel(kind)}` : ''}.
          </div>
          <p className="mt-2 text-sm text-ink-500">
            Revise a grafia ou tente um sinônimo.
          </p>
          {expansions.length > 0 && (
            <div className="mt-5">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-brand-700">Tente:</div>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {expansions.map(exp => (
                  <button
                    key={exp}
                    type="button"
                    onClick={() => { setQ(exp); if (inputRef.current) inputRef.current.value = exp; }}
                    className="chip text-xs"
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>
          )}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 text-xs font-semibold text-brand-700 hover:text-brand-800"
            >
              Remover filtros e tentar novamente
            </button>
          )}
        </section>
      )}
    </div>
  );
}
