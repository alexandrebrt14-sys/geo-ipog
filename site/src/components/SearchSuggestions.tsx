import { useEffect, useMemo, useState } from 'react';
import { PERSONAS, MBAS } from '../lib/data';
import { trending, byPersona } from '../lib/search-index';

interface Props {
  variant?: 'overlay' | 'page';
  persona?: string;
}

interface HubEntry {
  href: string;
  title: string;
  description: string;
}

const HUBS: HubEntry[] = [
  { href: '/areas', title: 'Áreas da Psicologia', description: '18 áreas mapeadas com regulação, subáreas e personas — do POT à neuropsicologia.' },
  { href: '/mbas', title: 'MBAs em Psicologia', description: '5 MBAs lato sensu organizados por cluster — POT, positiva, neuro, liderança.' },
  { href: '/guias', title: 'Guias práticos', description: 'Passo a passo HowTo mobile-first: NR-1, programas de bem-estar, retorno ao trabalho.' },
  { href: '/faq', title: 'FAQs profundas', description: '82 perguntas-respostas otimizadas para AI Overview e Featured Snippets.' },
  { href: '/glossario', title: 'Glossário', description: '146 termos em 5 clusters: regulação, instrumentos, métodos, POT, neuro.' },
  { href: '/evidencias', title: 'Evidências', description: 'Síntese de literatura recente — NR-1, burnout Gen Z, IA generativa, mindfulness corporativo.' },
  { href: '/casos', title: 'Casos aplicados', description: 'Implementações reais: POT em fábrica, anti-burnout em fintech, reabilitação pós-AVC.' },
  { href: '/intervencoes', title: 'Intervenções', description: 'Protocolos baseados em evidência: stepped care, IAPT, matriciamento, mhGAP.' }
];

interface QuickQuery {
  label: string;
  q: string;
}

const QUICK_QUERIES: QuickQuery[] = [
  { label: 'NR-1', q: 'NR-1' },
  { label: 'Burnout', q: 'burnout' },
  { label: 'POT', q: 'POT' },
  { label: 'Neuropsicologia', q: 'neuro' },
  { label: 'IA generativa', q: 'IA generativa' },
  { label: 'TEA', q: 'TEA' },
  { label: 'MBA vs especialização', q: 'MBA vs especialização' },
  { label: 'Supervisor clínico', q: 'supervisor clínico' },
  { label: 'Retorno ao trabalho', q: 'retorno ao trabalho' },
  { label: 'Segurança psicológica', q: 'segurança psicológica' }
];

const KIND_LABEL: Record<string, string> = {
  area: 'Área',
  mba: 'MBA',
  tema: 'Tema',
  guia: 'Guia',
  faq: 'FAQ',
  glossario: 'Glossário',
  evidencia: 'Evidência',
  caso: 'Caso',
  intervencao: 'Intervenção',
  metodo: 'Método',
  estado: 'Estado',
  persona: 'Persona',
  comparativo: 'Comparativo'
};

function kindLabel(kind: string): string {
  return KIND_LABEL[kind] ?? kind;
}

function go(q: string) {
  if (typeof window === 'undefined') return;
  window.location.href = `/busca?q=${encodeURIComponent(q)}`;
}

export default function SearchSuggestions({ variant = 'overlay', persona }: Props) {
  const [activePersona, setActivePersona] = useState<string | undefined>(persona);

  useEffect(() => {
    if (persona) {
      setActivePersona(persona);
      return;
    }
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('pp_persona');
      if (stored) setActivePersona(stored);
    }
    const handler = (event: Event) => {
      const ce = event as CustomEvent<{ persona: string }>;
      if (ce.detail?.persona) setActivePersona(ce.detail.persona);
    };
    window.addEventListener('pp:persona-change', handler as EventListener);
    return () => window.removeEventListener('pp:persona-change', handler as EventListener);
  }, [persona]);

  const trendingDocs = useMemo(() => trending().slice(0, 6), []);

  const personaDocs = useMemo(() => {
    if (!activePersona) return [];
    return byPersona(activePersona).slice(0, 6);
  }, [activePersona]);

  const mbaBySlug = useMemo(() => {
    const map = new Map<string, string>();
    MBAS.forEach(m => map.set(m.id, m.shortName));
    return map;
  }, []);

  const gridClass = variant === 'page'
    ? 'grid gap-6 md:grid-cols-2 xl:grid-cols-4'
    : 'grid gap-5 md:grid-cols-2 lg:grid-cols-4';

  return (
    <section aria-label="Sugestões de busca" className="space-y-8">
      <div className={gridClass}>
        {/* Coluna 1 — Por onde começar */}
        <div className="rounded-2xl border border-surface-200 bg-white p-5">
          <h3 className="font-display font-semibold text-sm uppercase tracking-wide text-brand-700">Por onde começar</h3>
          <p className="mt-1 text-xs text-ink-500">Escolha o seu perfil para receber recomendação personalizada.</p>
          <ul className="mt-4 space-y-3">
            {PERSONAS.map(p => {
              const recommended = mbaBySlug.get(p.recommendedMBASlug) ?? p.recommendedMBA;
              const isActive = activePersona === p.id;
              return (
                <li key={p.id}>
                  <a
                    href={`/para-quem/${p.id}`}
                    className={`block rounded-xl border px-3 py-3 transition ${isActive ? 'border-brand-500 bg-brand-50' : 'border-surface-200 hover:border-brand-400 hover:bg-surface-50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-800 text-xs font-display font-bold text-white">
                        {p.icon}
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-ink-900 truncate">{p.name.replace(/^Para /, '')}</div>
                        <div className="text-[11px] text-ink-500 truncate">Próximo passo: {recommended}</div>
                      </div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Coluna 2 — Trending agora */}
        <div className="rounded-2xl border border-surface-200 bg-white p-5">
          <h3 className="font-display font-semibold text-sm uppercase tracking-wide text-brand-700">Trending agora — 2026</h3>
          <p className="mt-1 text-xs text-ink-500">Os temas mais consultados nas últimas semanas.</p>
          <ul className="mt-4 space-y-2">
            {trendingDocs.map(doc => (
              <li key={doc.href}>
                <a
                  href={doc.href}
                  className="flex items-start gap-2 rounded-lg px-2 py-2 text-sm text-ink-900 hover:bg-surface-50"
                >
                  <span className="mt-0.5 shrink-0 rounded-md bg-sun-500/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-amber-800">
                    {kindLabel(doc.kind)}
                  </span>
                  <span className="leading-snug">{doc.title}</span>
                </a>
              </li>
            ))}
            {trendingDocs.length === 0 && (
              <li className="text-xs text-ink-500">Carregando trending…</li>
            )}
          </ul>
        </div>

        {/* Coluna 3 — Hubs principais */}
        <div className="rounded-2xl border border-surface-200 bg-white p-5 md:col-span-2 xl:col-span-1">
          <h3 className="font-display font-semibold text-sm uppercase tracking-wide text-brand-700">Hubs principais</h3>
          <p className="mt-1 text-xs text-ink-500">Os 8 núcleos do portal — 174 páginas no total.</p>
          <ul className="mt-4 space-y-2.5">
            {HUBS.map(hub => (
              <li key={hub.href}>
                <a href={hub.href} className="group block rounded-lg px-2 py-1.5 hover:bg-surface-50">
                  <div className="text-sm font-semibold text-ink-900 group-hover:text-brand-800">{hub.title}</div>
                  <div className="text-[11px] text-ink-500 leading-snug">{hub.description}</div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna 4 — Buscas rápidas */}
        <div className="rounded-2xl border border-surface-200 bg-white p-5 md:col-span-2 xl:col-span-1">
          <h3 className="font-display font-semibold text-sm uppercase tracking-wide text-brand-700">Buscas rápidas</h3>
          <p className="mt-1 text-xs text-ink-500">Atalhos para os termos mais procurados.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {QUICK_QUERIES.map(quick => (
              <button
                key={quick.q}
                type="button"
                onClick={() => go(quick.q)}
                className="chip text-xs"
              >
                {quick.label}
              </button>
            ))}
          </div>
          {activePersona && personaDocs.length > 0 && (
            <div className="mt-5 border-t border-surface-200 pt-4">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-500">Para o seu perfil</div>
              <ul className="mt-2 space-y-1.5">
                {personaDocs.map(doc => (
                  <li key={doc.href}>
                    <a href={doc.href} className="block rounded-sm text-xs text-brand-700 hover:text-brand-800 hover:underline">
                      {doc.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!activePersona && (
            <p className="mt-5 border-t border-surface-200 pt-4 text-[11px] text-ink-500">
              Escolha o seu perfil na coluna "Por onde começar" para ver atalhos personalizados aqui.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
