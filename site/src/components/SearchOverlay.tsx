import { useEffect, useMemo, useRef, useState } from 'react';
import { AREAS, MBAS, TEMAS, ESTADOS, PERSONAS } from '../lib/data';

interface SearchItem {
  title: string;
  href: string;
  kind: 'Área' | 'MBA' | 'Tema' | 'Estado' | 'Persona' | 'Guia';
  keys: string;
}

function buildIndex(): SearchItem[] {
  const docs: SearchItem[] = [];
  AREAS.forEach(a => docs.push({ title: a.name, href: `/areas/${a.id}`, kind: 'Área', keys: `${a.name} ${a.short} ${a.subareas.join(' ')} ${a.regulatoryLevel}`.toLowerCase() }));
  MBAS.forEach(m => docs.push({ title: m.shortName, href: `/mbas#${m.id}`, kind: 'MBA', keys: `${m.shortName} ${m.name} ${m.topics.join(' ')} ${m.personas.join(' ')}`.toLowerCase() }));
  TEMAS.forEach(t => docs.push({ title: t.name, href: `/areas/${t.area || ''}`, kind: 'Tema', keys: t.name.toLowerCase() }));
  ESTADOS.forEach(e => docs.push({ title: `${e.nome} (${e.uf})`, href: `/por-estado/${e.uf.toLowerCase()}`, kind: 'Estado', keys: `${e.uf} ${e.nome} ${e.regiao}`.toLowerCase() }));
  PERSONAS.forEach(p => docs.push({ title: p.name, href: `/#${p.id}`, kind: 'Persona', keys: `${p.name} ${p.pains.join(' ')}`.toLowerCase() }));
  [
    ['MBA vs Especialização', '/regulacao#mba-vs-especialização'],
    ['Lato sensu vs Stricto sensu', '/regulacao#lato-stricto'],
    ['Como escolher uma pós', '/regulacao'],
    ['Modalidades online ao vivo presencial', '/regulacao#modalidades'],
    ['Especialidades CFP', '/regulacao#cfp'],
    ['SATEPSI', '/regulacao#satepsi'],
    ['Perguntas frequentes', '/#faq']
  ].forEach(([t, h]) => docs.push({ title: t, href: h, kind: 'Guia', keys: t.toLowerCase() }));
  return docs;
}

const KIND_COLOR: Record<SearchItem['kind'], string> = {
  Área: 'bg-brand-50 text-brand-700',
  MBA: 'bg-sun-500/15 text-amber-800',
  Tema: 'bg-accent-500/10 text-accent-600',
  Estado: 'bg-surface-100 text-ink-700',
  Persona: 'bg-emerald-50 text-emerald-700',
  Guia: 'bg-rose-50 text-rose-700'
};

export default function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(() => buildIndex(), []);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return index.slice(0, 12);
    const tokens = term.split(/\s+/);
    return index
      .map(d => ({ d, score: tokens.reduce((acc, t) => acc + (d.keys.includes(t) ? 1 : 0), 0) }))
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 24)
      .map(x => x.d);
  }, [q, index]);

  useEffect(() => { setActiveIdx(0); }, [q]);

  useEffect(() => {
    const onTrigger = () => setOpen(true);
    document.querySelectorAll('[data-open-search]').forEach(el => el.addEventListener('click', onTrigger));
    const onKey = (e: KeyboardEvent) => {
      const isMac = navigator.userAgent.includes('Mac');
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(true); }
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((document.activeElement as HTMLElement)?.tagName)) { e.preventDefault(); setOpen(true); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.querySelectorAll('[data-open-search]').forEach(el => el.removeEventListener('click', onTrigger));
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 30);
    } else {
      document.body.style.overflow = '';
      setQ('');
    }
  }, [open]);

  if (!open) return null;

  const close = () => setOpen(false);
  const go = (href: string) => { window.location.href = href; close(); };

  return (
    <div className="fixed inset-0 z-50 animate-fade-in" role="dialog" aria-modal="true" aria-label="Busca">
      <div className="absolute inset-0 bg-brand-900/60 backdrop-blur-sm" onClick={close} />
      <div className="relative mx-auto mt-20 max-w-2xl px-4 animate-slide-up">
        <div className="rounded-2xl bg-white shadow-lift border border-surface-200 overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-surface-200">
            <svg className="w-5 h-5 text-ink-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
            <input
              ref={inputRef}
              type="text"
              value={q}
              onChange={e => setQ(e.target.value)}
              className="w-full outline-none text-base bg-transparent"
              placeholder="Buscar áreas, MBAs, temas, estados, perguntas..."
              aria-label="Busca"
              onKeyDown={e => {
                if (e.key === 'Escape') close();
                if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, results.length - 1)); }
                if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
                if (e.key === 'Enter') { e.preventDefault(); if (results[activeIdx]) go(results[activeIdx].href); }
              }}
            />
            <button onClick={close} className="kbd hover:bg-surface-50">Esc</button>
          </div>
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {results.length === 0 && (
              <div className="px-4 py-10 text-center text-ink-500 text-sm">
                Nada encontrado para "<strong>{q}</strong>". Tente "NR-1", "POT", "neuro" ou "RH".
              </div>
            )}
            {results.map((d, i) => (
              <a
                key={d.href + d.title}
                href={d.href}
                onClick={(e) => { e.preventDefault(); go(d.href); }}
                onMouseEnter={() => setActiveIdx(i)}
                className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg ${i === activeIdx ? 'bg-surface-50' : ''} hover:bg-surface-50 transition`}>
                <span className="flex items-center gap-3 min-w-0">
                  <span className={`shrink-0 text-xs px-2 py-1 rounded-md font-semibold ${KIND_COLOR[d.kind]}`}>{d.kind}</span>
                  <span className="truncate text-sm text-ink-900">{d.title}</span>
                </span>
                <span className="text-ink-300 text-sm">↵</span>
              </a>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-surface-200 bg-surface-50 text-xs text-ink-500 flex justify-between">
            <span>Tente "NR-1", "neuropsicologia", "RH", "MBA em São Paulo"</span>
            <span><span className="kbd">↑</span> <span className="kbd">↓</span> navegar · <span className="kbd">↵</span> abrir</span>
          </div>
        </div>
      </div>
    </div>
  );
}
