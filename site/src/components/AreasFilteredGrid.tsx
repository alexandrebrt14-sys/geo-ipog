import { useEffect, useId, useMemo, useRef, useState } from 'react';
import FilterChips from './FilterChips';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { AREAS, type PsychologyArea } from '../lib/data';

const CLUSTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'pot-bem-estar', label: 'POT + Bem-estar' },
  { id: 'neuro-avaliacao', label: 'Neuro + Avaliação' },
  { id: 'demais', label: 'Demais áreas' }
];

const REGULATORY = [
  { id: 'all', label: 'Qualquer nível' },
  { id: 'R0', label: 'R0/R1 público' },
  { id: 'R2', label: 'R2 técnico' },
  { id: 'R3', label: 'R3 sensível' }
];

function regulatoryMatch(area: PsychologyArea, filter: string) {
  if (filter === 'all') return true;
  const levels = area.regulatoryLevel.split('/');
  return filter === 'R0' ? levels.some(level => level === 'R0' || level === 'R1') : levels.includes(filter);
}

export default function AreasFilteredGrid({ initial = AREAS }: { initial?: PsychologyArea[] }) {
  const [cluster, setCluster] = useState('all');
  const [reg, setReg] = useState('all');
  const [q, setQ] = useState('');
  const reduce = useReducedMotion();
  const searchId = useId();
  const resultsId = useId();
  const searchRef = useRef<HTMLInputElement>(null);
  const pagePath = useRef('');
  const [urlReady, setUrlReady] = useState(false);

  useEffect(() => {
    pagePath.current = window.location.pathname;
    const restore = () => {
      if (window.location.pathname !== pagePath.current) return;
      const params = new URL(window.location.href).searchParams;
      const nextCluster = params.get('cluster') || 'all';
      const nextReg = params.get('reg') || 'all';
      setCluster(CLUSTERS.some(item => item.id === nextCluster) ? nextCluster : 'all');
      setReg(REGULATORY.some(item => item.id === nextReg) ? nextReg : 'all');
      setQ(params.get('q') || '');
      setUrlReady(true);
    };
    restore();
    window.addEventListener('popstate', restore);
    document.addEventListener('astro:page-load', restore);
    return () => {
      window.removeEventListener('popstate', restore);
      document.removeEventListener('astro:page-load', restore);
    };
  }, []);

  useEffect(() => {
    if (!urlReady || window.location.pathname !== pagePath.current) return;
    const url = new URL(window.location.href);
    for (const [name, value] of [['cluster', cluster], ['reg', reg], ['q', q]]) {
      if (!value || (name !== 'q' && value === 'all')) url.searchParams.delete(name);
      else url.searchParams.set(name, value);
    }
    if (url.href !== window.location.href) {
      // Conserva parâmetros alheios, fragmento e estado de navegação do Astro.
      window.history.replaceState(window.history.state, '', url);
    }
  }, [cluster, reg, q, urlReady]);

  const hasActiveFilters = cluster !== 'all' || reg !== 'all' || q.trim() !== '';

  const clearFilters = () => {
    setCluster('all');
    setReg('all');
    setQ('');
    searchRef.current?.focus();
  };

  const results = useMemo(() => {
    const normalize = (value: string) => value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
    const term = normalize(q.trim());
    return initial
      .filter(a => cluster === 'all' || a.cluster === cluster)
      .filter(a => regulatoryMatch(a, reg))
      .filter(a => !term || (normalize(a.name).includes(term) || normalize(a.subareas.join(' ')).includes(term)));
  }, [cluster, reg, q, initial]);

  return (
    <div>
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-0">
            <label htmlFor={searchId} className="sr-only">Filtrar áreas por nome ou subárea</label>
            <svg aria-hidden="true" focusable="false" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
            <input
              id={searchId}
              ref={searchRef}
              aria-controls={resultsId}
              type="search"
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Filtrar por nome ou subárea..."
              className="w-full pl-10 pr-4 py-2.5 border border-surface-200 rounded-xl text-sm focus:border-brand-400 outline-none bg-white"
              aria-label="Filtrar áreas por nome ou subárea"
            />
          </div>
        </div>
        <div className="flex min-w-0 flex-col sm:flex-row gap-3">
          <FilterChips options={CLUSTERS} value={cluster} onChange={setCluster} label="Cluster" controls={resultsId} />
          <FilterChips options={REGULATORY} value={reg} onChange={setReg} label="Regulação" controls={resultsId} />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs text-ink-500" aria-live="polite" role="status">{results.length} de {initial.length} áreas</p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-semibold text-brand-700 hover:text-brand-800 underline underline-offset-2"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      <motion.div id={resultsId} layout={!reduce} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout" initial={false}>
        {results.map(a => {
          const regMatch = /R\s*(\d)/.exec(a.regulatoryLevel || '');
          const regValue = regMatch ? Math.min(4, Math.max(0, Number(regMatch[1]))) : 0;
          return (
          <motion.a
            key={a.id}
            layout={!reduce}
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: reduce ? 0 : 0.22 }}
            whileHover={reduce ? undefined : { y: -4 }}
            whileTap={reduce ? undefined : { scale: 0.99 }}
            href={`/areas/${a.id}`}
            className="card-lift card-shine block p-5 group">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="inline-flex items-center gap-2">
                <span className="tag tag-light"><span className="text-brand-700">●</span> Área</span>
                <span className="text-ink-300">·</span>
                <span className="text-ink-500">Regulação {a.regulatoryLevel}</span>
              </span>
              <span className="reg-meter shrink-0" role="img" aria-label={`Nível regulatório ${a.regulatoryLevel}`} title={`Nível regulatório ${a.regulatoryLevel}`}>
                {[0, 1, 2, 3].map(i => (
                  <span key={i} className={i < regValue ? 'reg-on' : ''}></span>
                ))}
              </span>
            </div>
            <h3 className="font-display font-semibold text-lg mt-3 text-ink-900 group-hover:text-brand-800 transition">{a.name}</h3>
            <p className="mt-2 text-sm text-ink-500 line-clamp-2">{a.subareas.slice(0, 5).join(' · ')}</p>
            <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
              Explorar
              <svg aria-hidden="true" focusable="false" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" viewBox="0 0 20 20" fill="currentColor"><path d="M11 4l6 6-6 6-1.4-1.4L13.2 11H3V9h10.2L9.6 5.4 11 4z" /></svg>
            </div>
          </motion.a>
          );
        })}
        </AnimatePresence>
        {results.length === 0 && (
          <div className="col-span-full flex flex-col items-center gap-3 text-center py-12">
            <p className="text-ink-700 text-sm font-medium">Nenhuma área encontrada para estes filtros.</p>
            <p className="text-ink-500 text-xs">Tente outro termo de busca ou redefina os filtros de cluster e regulação.</p>
            <button
              type="button"
              onClick={clearFilters}
              className="btn btn-secondary btn-sm"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
