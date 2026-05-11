import { useEffect, useState } from 'react';
import { AREAS, MBAS, PERSONAS } from '../lib/data';

interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon: React.ReactNode;
  action?: () => void;
}

const IconHome = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9.5 12 3l9 6.5V21H3z" /><path d="M9 21V12h6v9" /></svg>
);
const IconAreas = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
);
const IconMBA = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
);
const IconSearch = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
);
const IconMore = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
);

export default function MobileBottomNav() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [path, setPath] = useState('/');

  useEffect(() => {
    setPath(window.location.pathname || '/');
    const onChange = () => setPath(window.location.pathname || '/');
    document.addEventListener('astro:after-swap', onChange);
    return () => document.removeEventListener('astro:after-swap', onChange);
  }, []);

  const items: NavItem[] = [
    { id: 'home', label: 'Inicio', href: '/', icon: <IconHome /> },
    { id: 'areas', label: 'Áreas', href: '/areas', icon: <IconAreas /> },
    { id: 'mbas', label: 'MBAs', href: '/mbas', icon: <IconMBA /> },
    { id: 'busca', label: 'Buscar', icon: <IconSearch />, action: () => document.querySelector<HTMLButtonElement>('[data-open-search]')?.click() },
    { id: 'mais', label: 'Mais', icon: <IconMore />, action: () => setMoreOpen(true) }
  ];

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === '/') return path === '/';
    return path.startsWith(href);
  };

  return (
    <>
      <nav aria-label="Navegacao mobile" className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-white border-t border-surface-200 pb-[max(8px,env(safe-área-inset-bottom))] shadow-[0_-1px_8px_rgba(15,37,67,.06)]">
        <ul className="grid grid-cols-5">
          {items.map(it => {
            const inner = (
              <span className={`flex flex-col items-center gap-0.5 py-2 ${isActive(it.href) ? 'text-brand-800' : 'text-ink-500'}`}>
                <span className={`p-1.5 rounded-lg ${isActive(it.href) ? 'bg-brand-50' : ''}`}>{it.icon}</span>
                <span className="text-[10px] font-medium">{it.label}</span>
              </span>
            );
            return (
              <li key={it.id} className="text-center">
                {it.href ? (
                  <a href={it.href} className="block">{inner}</a>
                ) : (
                  <button onClick={it.action} className="w-full">{inner}</button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {moreOpen && (
        <div className="fixed inset-0 z-40 lg:hidden animate-fade-in" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-brand-900/60 backdrop-blur-sm" onClick={() => setMoreOpen(false)} />
          <div className="absolute bottom-0 inset-x-0 bg-white rounded-t-3xl pb-[max(16px,env(safe-área-inset-bottom))] max-h-[85vh] overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-white pt-3 pb-2 border-b border-surface-200">
              <div className="mx-auto w-12 h-1.5 rounded-full bg-surface-200" />
              <div className="px-5 pt-3 flex items-center justify-between">
                <h2 className="font-display font-bold text-lg text-brand-800">Mais</h2>
                <button onClick={() => setMoreOpen(false)} className="w-10 h-10 rounded-lg border border-surface-200 text-ink-700" aria-label="Fechar">×</button>
              </div>
            </div>
            <div className="p-5 space-y-5">
              <section>
                <h3 className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2">Pará quem</h3>
                <div className="grid grid-cols-2 gap-2">
                  {PERSONAS.map(p => (
                    <a key={p.id} href={`/#${p.id}`} onClick={() => setMoreOpen(false)} className="card-lift p-3">
                      <div className="text-sm font-semibold text-ink-900">{p.name.replace('Pará ', '')}</div>
                      <div className="text-[11px] text-ink-500 mt-1">→ {p.recommendedMBA}</div>
                    </a>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2">Recursos</h3>
                <ul className="divide-y divide-surface-200 rounded-xl border border-surface-200 overflow-hidden">
                  <li><a href="/por-estado" onClick={() => setMoreOpen(false)} className="block px-4 py-3 hover:bg-surface-50 text-sm">Pós por estado</a></li>
                  <li><a href="/regulacao" onClick={() => setMoreOpen(false)} className="block px-4 py-3 hover:bg-surface-50 text-sm">Regulação e ética</a></li>
                  <li><a href="/#faq" onClick={() => setMoreOpen(false)} className="block px-4 py-3 hover:bg-surface-50 text-sm">Perguntas frequentes</a></li>
                </ul>
              </section>
              <section>
                <a href="https://ipog.edu.br/" target="_blank" rel="noopener external" className="btn btn-primary btn-lg w-full">
                  Acessar portal oficial IPOG →
                </a>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
