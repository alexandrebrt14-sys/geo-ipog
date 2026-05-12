import { useEffect, useMemo, useState } from 'react';
import { PERSONAS, MBAS } from '../lib/data';
import { getNextSteps } from '../lib/taxonomy';

interface Props {
  variant?: 'home' | 'page' | 'compact';
}

interface PersonaCardData {
  id: string;
  icon: string;
  shortName: string;
  fullName: string;
  pains: string[];
  recommendedMBA: string;
  href: string;
}

function buildCards(): PersonaCardData[] {
  const mbaName = new Map<string, string>();
  MBAS.forEach(m => mbaName.set(m.id, m.shortName));
  const shortNames: Record<string, string> = {
    psicologos: 'Psicólogo',
    rh: 'RH',
    lideres: 'Líder ou executivo',
    consultores: 'Consultor · saúde · educação'
  };
  return PERSONAS.map(p => ({
    id: p.id,
    icon: p.icon,
    shortName: shortNames[p.id] ?? p.name,
    fullName: p.name,
    pains: p.pains.slice(0, 3),
    recommendedMBA: mbaName.get(p.recommendedMBASlug) ?? p.recommendedMBA,
    href: `/para-quem/${p.id}`
  }));
}

interface QuickLink { label: string; href: string; hint?: string; }

const FALLBACK_LINKS: Record<string, QuickLink[]> = {
  psicologos: [
    { label: 'MBA em POT', href: '/mbas#mba-pot', hint: 'Núcleo recomendado' },
    { label: 'Guia: retorno ao trabalho pós-burnout', href: '/guias/retorno-ao-trabalho-pos-burnout', hint: 'Guia prático' },
    { label: 'FAQ: carreira em psicologia organizacional', href: '/faq/carreira-psicologo-organizacional-faq', hint: 'Dúvidas frequentes' }
  ],
  rh: [
    { label: 'MBA em Gestão de Pessoas e Liderança Positiva', href: '/mbas#mba-lideranca-positiva', hint: 'Núcleo recomendado' },
    { label: 'Guia: implementar NR-1 em empresa', href: '/guias/implementar-nr1-em-empresa', hint: 'Guia prático' },
    { label: 'Tema: NR-1 e riscos psicossociais', href: '/temas/nr1-riscos-psicossociais', hint: 'Tema central' }
  ],
  lideres: [
    { label: 'MBA em Gestão de Pessoas e Liderança Positiva', href: '/mbas#mba-lideranca-positiva', hint: 'Núcleo recomendado' },
    { label: 'Tema: segurança psicológica', href: '/temas/seguranca-psicologica', hint: 'Tema central' },
    { label: 'Caso: liderança positiva em scale-up SaaS', href: '/casos/lideranca-positiva-startup-escalando', hint: 'Caso aplicado' }
  ],
  consultores: [
    { label: 'MBA em Psicologia Positiva', href: '/mbas#mba-positiva', hint: 'Núcleo recomendado' },
    { label: 'Intervenção: stepped care', href: '/intervencoes/stepped-care', hint: 'Protocolo' },
    { label: 'Guia: construir programa de bem-estar', href: '/guias/construir-programa-bem-estar', hint: 'Guia prático' }
  ]
};

function dispatchChange(personaId: string) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('pp_persona', personaId);
  window.dispatchEvent(new CustomEvent('pp:persona-change', { detail: { persona: personaId } }));
}

function useTaxonomySafe(personaId: string | null, href: string): QuickLink[] {
  return useMemo(() => {
    if (!personaId) return [];
    try {
      const groups = getNextSteps(href, personaId);
      const flat: QuickLink[] = [];
      for (const g of groups) {
        for (const item of g.items) {
          flat.push({ label: item.label, href: item.href, hint: item.hint });
          if (flat.length >= 3) break;
        }
        if (flat.length >= 3) break;
      }
      if (flat.length === 0) return FALLBACK_LINKS[personaId] ?? [];
      return flat;
    } catch {
      return FALLBACK_LINKS[personaId] ?? [];
    }
  }, [personaId, href]);
}

interface PersonaPanelProps {
  card: PersonaCardData;
  isActive: boolean;
  onSelect: () => void;
}

function PersonaPanel({ card, isActive, onSelect }: PersonaPanelProps) {
  const links = useTaxonomySafe(card.id, card.href);
  return (
    <article
      className={`group relative flex h-full flex-col rounded-2xl border bg-white p-5 transition ${isActive ? 'border-brand-500 shadow-soft' : 'border-surface-200 hover:border-brand-400 hover:shadow-soft'}`}
    >
      <header className="flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-800 font-display text-base font-bold text-white">
          {card.icon}
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-base font-semibold text-ink-900">{card.shortName}</h3>
          <p className="mt-0.5 text-[11px] uppercase tracking-wide text-ink-500">{card.fullName}</p>
        </div>
      </header>

      {card.pains.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Dores típicas">
          {card.pains.map(pain => (
            <li key={pain} className="rounded-full bg-surface-100 px-2.5 py-1 text-[11px] font-medium text-ink-700">
              {pain}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-brand-700">Você provavelmente quer:</div>
        <ul className="mt-2 space-y-1.5">
          {links.length === 0 && (
            <li className="text-xs text-ink-500">Carregando recomendações…</li>
          )}
          {links.map(link => (
            <li key={link.href + link.label}>
              <a href={link.href} className="flex items-start gap-2 rounded-lg px-2 py-1.5 text-sm text-ink-900 hover:bg-surface-50 hover:text-brand-800">
                <span aria-hidden="true" className="mt-0.5 text-brand-700">→</span>
                <span className="leading-snug">
                  {link.label}
                  {link.hint && (
                    <span className="block text-[11px] text-ink-500">{link.hint}</span>
                  )}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="mt-auto pt-5">
        <div className="text-[11px] text-ink-500">Recomendado: <span className="font-semibold text-ink-700">{card.recommendedMBA}</span></div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <a href={card.href} className="text-xs font-semibold text-brand-700 hover:text-brand-800">
            Ver trilha completa <span aria-hidden="true">→</span>
          </a>
          <button
            type="button"
            onClick={onSelect}
            className={`rounded-full border px-3 py-1 text-[11px] font-semibold transition ${isActive ? 'border-brand-700 bg-brand-700 text-white' : 'border-surface-200 text-ink-700 hover:border-brand-400 hover:text-brand-800'}`}
          >
            {isActive ? 'Selecionado' : 'Esse sou eu'}
          </button>
        </div>
      </footer>
    </article>
  );
}

export default function PersonaQuickPicker({ variant = 'home' }: Props) {
  const cards = useMemo(() => buildCards(), []);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('pp_persona');
    if (stored) setActive(stored);
    const handler = (event: Event) => {
      const ce = event as CustomEvent<{ persona: string }>;
      if (ce.detail?.persona) setActive(ce.detail.persona);
    };
    window.addEventListener('pp:persona-change', handler as EventListener);
    return () => window.removeEventListener('pp:persona-change', handler as EventListener);
  }, []);

  const handleSelect = (personaId: string) => {
    setActive(personaId);
    dispatchChange(personaId);
  };

  const gridClass = variant === 'compact'
    ? 'grid gap-3 sm:grid-cols-2 lg:grid-cols-4'
    : 'grid gap-4 sm:grid-cols-2 xl:grid-cols-4';

  return (
    <section aria-label="Escolha o seu perfil" className="space-y-4">
      <header className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink-900 sm:text-2xl">Qual desses perfis é o seu?</h2>
          <p className="text-sm text-ink-500">Escolha um para receber recomendação personalizada em todo o portal.</p>
        </div>
        {active && (
          <button
            type="button"
            onClick={() => { setActive(null); if (typeof window !== 'undefined') { window.localStorage.removeItem('pp_persona'); window.dispatchEvent(new CustomEvent('pp:persona-change', { detail: { persona: '' } })); } }}
            className="text-xs font-semibold text-ink-500 hover:text-brand-800"
          >
            Limpar seleção
          </button>
        )}
      </header>

      <div className={gridClass}>
        {cards.map(card => (
          <PersonaPanel
            key={card.id}
            card={card}
            isActive={active === card.id}
            onSelect={() => handleSelect(card.id)}
          />
        ))}
      </div>
    </section>
  );
}
