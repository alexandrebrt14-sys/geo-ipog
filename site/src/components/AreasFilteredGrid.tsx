import { useId, useMemo, useState } from 'react';
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
  return area.regulatoryLevel.startsWith(filter);
}

export default function AreasFilteredGrid({ initial = AREAS }: { initial?: PsychologyArea[] }) {
  const [cluster, setCluster] = useState('all');
  const [reg, setReg] = useState('all');
  const [q, setQ] = useState('');
  const reduce = useReducedMotion();
  const searchId = useId();
  const clusterLabelId = useId();
  const regLabelId = useId();

  const hasActiveFilters = cluster !== 'all' || reg !== 'all' || q.trim() !== '';

  const clearFilters = () => {
    setCluster('all');
    setReg('all');
    setQ('');
  };

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return initial
      .filter(a => cluster === 'all' || a.cluster === cluster)
      .filter(a => regulatoryMatch(a, reg))
      .filter(a => !term || (a.name.toLowerCase().includes(term) || a.subareas.join(' ').toLowerCase().includes(term)));
  }, [cluster, reg, q, initial]);

  return (
    <div>
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[240px]">
            <label htmlFor={searchId} className="sr-only">Filtrar áreas por nome ou subárea</label>
            <svg aria-hidden="true" focusable="false" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
            <input
              id={searchId}
              type="search"
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Filtrar por nome ou subárea..."
              className="w-full pl-10 pr-4 py-2.5 border border-surface-200 rounded-xl text-sm focus:border-brand-400 outline-none bg-white"
              aria-label="Filtrar áreas por nome ou subárea"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div role="group" aria-labelledby={clusterLabelId} className="flex items-center gap-2 overflow-x-auto scroll-fade pb-1">
            <span id={clusterLabelId} className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold shrink-0">Cluster:</span>
            {CLUSTERS.map(c => (
              <button key={c.id} type="button" onClick={() => setCluster(c.id)} className={`chip ${cluster === c.id ? 'chip-active' : ''}`} aria-pressed={cluster === c.id}>{c.label}</button>
            ))}
          </div>
          <div role="group" aria-labelledby={regLabelId} className="flex items-center gap-2 overflow-x-auto scroll-fade pb-1">
            <span id={regLabelId} className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold shrink-0">Regulação:</span>
            {REGULATORY.map(r => (
              <button key={r.id} type="button" onClick={() => setReg(r.id)} className={`chip ${reg === r.id ? 'chip-active' : ''}`} aria-pressed={reg === r.id}>{r.label}</button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs text-ink-500" aria-live="polite" role="status">{results.length} de {AREAS.length} áreas</p>
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

      <motion.div layout={!reduce} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
