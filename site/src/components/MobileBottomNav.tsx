import { useEffect, useRef, useState } from 'react';
import { PERSONAS, SITE } from '../lib/data';

interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon: React.ReactNode;
  action?: () => void;
}

const IconHome = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-label="Início"><path d="M3 9.5 12 3l9 6.5V21H3z" /><path d="M9 21V12h6v9" /></svg>
);
const IconAreas = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
);
const IconMba = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 11 12 6l9 5-9 5-9-5Z"/><path d="M5 12.5V17c0 1 3 2.5 7 2.5s7-1.5 7-2.5v-4.5"/><path d="M21 11v5"/></svg>
);
const IconSearch = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
);
const IconMore = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
);

const AUTISMO_PORTAS: { label: string; href: string; desc: string }[] = [
  { label: 'Para pacientes e famílias', href: '/autismo/para-pacientes/', desc: 'Diagnóstico tardio, dia a dia, relações' },
  { label: 'Para profissionais', href: '/autismo/para-profissionais/', desc: 'Avaliação, manejo clínico, supervisão' },
  { label: 'Para pesquisadores', href: '/autismo/para-pesquisadores/', desc: 'Fronteira da ciência, instrumentos, dados' },
  { label: 'Glossário do autismo', href: '/autismo/glossario', desc: 'Termos definidos para adultos' }
];

const AUTISMO_ARTIGOS: { label: string; href: string }[] = [
  { label: 'Diagnóstico tardio em adultos', href: '/autismo/artigos/diagnostico-tardio-adulto-2026/' },
  { label: 'Casais NT-autista', href: '/autismo/artigos/relacionamentos-amorosos-nt-autista-2026/' },
  { label: 'Camuflagem (masking)', href: '/autismo/artigos/camuflagem-masking-cat-q-adulto-2026/' },
  { label: 'Trabalho e vida cotidiana', href: '/autismo/artigos/vida-cotidiana-trabalho-autista-adulto-2026/' },
  { label: 'Clínica do TEA adulto', href: '/autismo/artigos/clinica-tea-adulto-evidencia-2026/' },
  { label: 'Fronteira de pesquisa 2026', href: '/autismo/artigos/fronteira-pesquisa-tea-adulto-2026/' }
];

const HUBS_PRINCIPAIS: { label: string; href: string }[] = [
  { label: 'Áreas de psicologia', href: '/areas' },
  { label: 'Pós-Graduações', href: '/tipos-de-pos-graduacao' },
  { label: 'MBAs', href: '/mbas' },
  { label: 'Métodos', href: '/metodos' },
  { label: 'Evidências', href: '/evidencias' },
  { label: 'Casos', href: '/casos' },
  { label: 'Intervenções', href: '/intervencoes' },
  { label: 'Conteúdo e social', href: '/conteudo-social' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Glossário', href: '/glossario' },
  { label: 'Comparativos', href: '/comparativos' },
  { label: 'Para quem', href: '/para-quem' },
  { label: 'Por estado', href: '/por-estado' },
  { label: 'Regulação', href: '/regulacao' }
];

const RECURSOS: { label: string; href: string }[] = [
  { label: 'Sobre o portal', href: '/sobre' },
  { label: 'Recursos', href: '/recursos' },
  { label: 'Mapa do site', href: '/mapa-do-site' },
  { label: 'Carreira', href: '/carreira' }
];

export default function MobileBottomNav() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [path, setPath] = useState('/');
  const [hidden, setHidden] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dragStartY = useRef<number | null>(null);

  useEffect(() => {
    setPath(window.location.pathname || '/');
    const onChange = () => setPath(window.location.pathname || '/');
    document.addEventListener('astro:after-swap', onChange);
    return () => document.removeEventListener('astro:after-swap', onChange);
  }, []);

  // Esconde a barra ao rolar para baixo e revela ao rolar para cima (padrão mobile moderno).
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > lastY + 8 && y > 120) setHidden(true);
        else if (y < lastY - 8) setHidden(false);
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!moreOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMoreOpen(false);
      }
      if (event.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused?.focus?.();
    };
  }, [moreOpen]);

  const items: NavItem[] = [
    { id: 'home', label: 'Início', href: '/', icon: <IconHome /> },
    { id: 'mbas', label: 'MBAs IPOG', href: '/mbas', icon: <IconMba /> },
    {
      id: 'busca',
      label: 'Buscar',
      icon: <IconSearch />,
      action: () => document.querySelector<HTMLButtonElement>('[data-open-search]')?.click()
    },
    { id: 'areas', label: 'Áreas', href: '/areas', icon: <IconAreas /> },
    { id: 'mais', label: 'Mais', icon: <IconMore />, action: () => setMoreOpen(true) }
  ];

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === '/') return path === '/';
    return path.startsWith(href);
  };

  const onDragStart = (event: React.TouchEvent) => {
    dragStartY.current = event.touches[0]?.clientY ?? null;
  };
  const onDragEnd = (event: React.TouchEvent) => {
    if (dragStartY.current == null) return;
    const endY = event.changedTouches[0]?.clientY ?? dragStartY.current;
    if (endY - dragStartY.current > 80) setMoreOpen(false);
    dragStartY.current = null;
  };

  return (
    <>
      <nav
        aria-label="Navegação mobile"
        className={`fixed bottom-0 inset-x-0 z-30 lg:hidden bg-white border-t border-surface-200 pb-[max(8px,env(safe-area-inset-bottom))] shadow-[0_-1px_8px_rgba(15,37,67,.06)] transition-transform duration-300 ${hidden && !moreOpen ? 'translate-y-full' : 'translate-y-0'}`}>
        <ul className="grid grid-cols-5">
          {items.map(it => {
            const active = isActive(it.href);
            const inner = (
              <span className={`flex flex-col items-center gap-0.5 py-2 ${active ? 'text-brand-800' : 'text-ink-500'}`}>
                <span className={`p-1.5 rounded-lg ${active ? 'bg-brand-50' : ''}`}>{it.icon}</span>
                <span className="text-[10px] font-medium">{it.label}</span>
              </span>
            );
            return (
              <li key={it.id} className="text-center">
                {it.href ? (
                  <a href={it.href} className="block" aria-current={active ? 'page' : undefined}>
                    {inner}
                  </a>
                ) : (
                  <button onClick={it.action} className="w-full" aria-label={it.label}>
                    {inner}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {moreOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="more-drawer-title"
          ref={dialogRef}>
          <div
            className="absolute inset-0 bg-brand-900/60 backdrop-blur-sm"
            onClick={() => setMoreOpen(false)}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 inset-x-0 bg-white rounded-t-3xl pb-[max(16px,env(safe-area-inset-bottom))] max-h-[85vh] overflow-y-auto animate-slide-up"
            onTouchStart={onDragStart}
            onTouchEnd={onDragEnd}>
            <div className="sticky top-0 bg-white pt-3 pb-2 border-b border-surface-200">
              <div className="mx-auto w-12 h-1.5 rounded-full bg-surface-200" aria-hidden="true" />
              <div className="px-5 pt-3 flex items-center justify-between">
                <h2 id="more-drawer-title" className="font-display font-bold text-lg text-brand-800">Mais</h2>
                <button
                  ref={closeBtnRef}
                  onClick={() => setMoreOpen(false)}
                  className="w-10 h-10 rounded-lg border border-surface-200 text-ink-700"
                  aria-label="Fechar menu">×</button>
              </div>
            </div>

            <div className="p-5 space-y-6">
              <section>
                <h3 className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2">Hubs principais</h3>
                <div className="grid grid-cols-2 gap-2">
                  {HUBS_PRINCIPAIS.map(h => (
                    <a
                      key={h.href}
                      href={h.href}
                      onClick={() => setMoreOpen(false)}
                      className="card-lift p-3 text-sm font-semibold text-ink-900">
                      {h.label}
                    </a>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2">Tema clínico transversal · TEA adulto</h3>
                <p className="text-[11px] text-ink-500 mb-3">Tema que atravessa as áreas Clínica, Avaliação Psicológica, Neuropsicologia, ABA-TEA-Neurodesenvolvimento e POT (acomodações razoáveis, NR-1).</p>
                <div className="grid grid-cols-1 gap-2">
                  {AUTISMO_PORTAS.map(p => (
                    <a
                      key={p.href}
                      href={p.href}
                      onClick={() => setMoreOpen(false)}
                      className="card-lift p-3">
                      <div className="text-sm font-semibold text-ink-900">{p.label}</div>
                      <div className="text-[11px] text-ink-500 mt-1">{p.desc}</div>
                    </a>
                  ))}
                </div>
                <h4 className="text-[11px] font-semibold text-ink-500 uppercase tracking-wider mt-4 mb-2">Artigos do tema</h4>
                <ul className="divide-y divide-surface-200 rounded-xl border border-surface-200 overflow-hidden">
                  {AUTISMO_ARTIGOS.map(a => (
                    <li key={a.href}>
                      <a
                        href={a.href}
                        onClick={() => setMoreOpen(false)}
                        className="block px-4 py-3 hover:bg-surface-50 text-sm text-ink-900">
                        {a.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2">Para quem você é</h3>
                <div className="grid grid-cols-2 gap-2">
                  {PERSONAS.map(p => (
                    <a
                      key={p.id}
                      href={`/para-quem/${p.id}`}
                      onClick={() => setMoreOpen(false)}
                      className="card-lift p-3">
                      <div className="text-sm font-semibold text-ink-900">{p.name}</div>
                      <div className="text-[11px] text-ink-500 mt-1">→ {p.recommendedMBA}</div>
                    </a>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2">Recursos</h3>
                <ul className="divide-y divide-surface-200 rounded-xl border border-surface-200 overflow-hidden">
                  {RECURSOS.map(r => (
                    <li key={r.href}>
                      <a
                        href={r.href}
                        onClick={() => setMoreOpen(false)}
                        className="block px-4 py-3 hover:bg-surface-50 text-sm">
                        {r.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <a
                  href={SITE.ipogOfficial}
                  target="_blank"
                  rel="noopener external"
                  className="btn btn-primary btn-lg w-full">
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
