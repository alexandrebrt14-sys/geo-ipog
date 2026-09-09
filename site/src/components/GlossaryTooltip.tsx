import { useEffect, useId, useRef, useState } from 'react';
import type { FocusEvent, ReactNode } from 'react';
import { TERMOS as glossaryTerms } from '../lib/glossario-links';

interface Props {
  term: string;
  children?: ReactNode;
  cluster?: string;
}

interface TermDef {
  cluster: string;
  slug: string;
  label: string;
  definition: string;
  aliases?: string[];
}

// Lista inicial de 22 termos canônicos (acentuação completa).
// O cluster e slug seguem GLOSSARIO_CLUSTERS de data.ts.
const TERMS: TermDef[] = [
  {
    cluster: 'regulacao',
    slug: 'nr-1',
    label: 'NR-1',
    definition: 'Norma Regulamentadora número 1, atualizada em 2024, que obriga empresas brasileiras a incluir riscos psicossociais no Programa de Gerenciamento de Riscos (PGR). Aplicável a partir de maio de 2026.',
    aliases: ['NR1', 'NR 1']
  },
  {
    cluster: 'regulacao',
    slug: 'cfp',
    label: 'CFP',
    definition: 'Conselho Federal de Psicologia. Autarquia que regula o exercício profissional do psicólogo no Brasil, define especialidades reconhecidas e emite resoluções éticas.',
    aliases: ['Conselho Federal de Psicologia']
  },
  {
    cluster: 'regulacao',
    slug: 'crp',
    label: 'CRP',
    definition: 'Conselho Regional de Psicologia. Braço estadual do CFP responsável por fiscalização, registro profissional e processos éticos.',
    aliases: ['Conselho Regional de Psicologia']
  },
  {
    cluster: 'regulacao',
    slug: 'lgpd',
    label: 'LGPD',
    definition: 'Lei Geral de Proteção de Dados Pessoais (Lei 13.709/2018). Regula tratamento de dados pessoais e sensíveis, com impacto direto em avaliação psicológica, people analytics e prontuários.',
    aliases: ['Lei Geral de Proteção de Dados']
  },
  {
    cluster: 'regulacao',
    slug: 'mec',
    label: 'MEC',
    definition: 'Ministério da Educação. Regula cursos de pós-graduação lato sensu e stricto sensu via CNE e CAPES.'
  },
  {
    cluster: 'instrumentos',
    slug: 'satepsi',
    label: 'SATEPSI',
    definition: 'Sistema de Avaliação de Testes Psicológicos do CFP. Catálogo oficial de instrumentos com parecer favorável para uso profissional no Brasil.'
  },
  {
    cluster: 'instrumentos',
    slug: 'wais',
    label: 'WAIS',
    definition: 'Wechsler Adult Intelligence Scale. Bateria de avaliação de inteligência adulta, hoje em sua quarta edição brasileira (WAIS-IV).',
    aliases: ['WAIS-IV', 'WAIS IV']
  },
  {
    cluster: 'instrumentos',
    slug: 'mmpi',
    label: 'MMPI',
    definition: 'Minnesota Multiphasic Personality Inventory. Inventário de personalidade amplamente usado em contexto clínico, jurídico e organizacional.',
    aliases: ['MMPI-2', 'MMPI-2-RF']
  },
  {
    cluster: 'instrumentos',
    slug: 'epds',
    label: 'EPDS',
    definition: 'Edinburgh Postnatal Depression Scale. Escala de rastreio para depressão perinatal, com 10 itens, validada em português.'
  },
  {
    cluster: 'instrumentos',
    slug: 'ados-2',
    label: 'ADOS-2',
    definition: 'Autism Diagnostic Observation Schedule, segunda edição. Protocolo padrão-ouro para avaliação observacional de TEA.',
    aliases: ['ADOS', 'ADOS 2']
  },
  {
    cluster: 'metodos-terapeuticos',
    slug: 'tcc',
    label: 'TCC',
    definition: 'Terapia Cognitivo-Comportamental. Família de abordagens baseadas em evidência (Beck, Ellis) com forte recomendação para depressão, ansiedade, TOC e insônia.',
    aliases: ['Terapia Cognitivo-Comportamental']
  },
  {
    cluster: 'metodos-terapeuticos',
    slug: 'act',
    label: 'ACT',
    definition: 'Terapia de Aceitação e Compromisso (Hayes, Strosahl, Wilson). Terapia de terceira onda, com evidência crescente em dor crônica, ansiedade e estresse.',
    aliases: ['Terapia de Aceitação e Compromisso']
  },
  {
    cluster: 'metodos-terapeuticos',
    slug: 'dbt',
    label: 'DBT',
    definition: 'Terapia Comportamental Dialética (Marsha Linehan). Padrão-ouro para Transtorno de Personalidade Borderline e desregulação emocional.',
    aliases: ['Terapia Comportamental Dialética']
  },
  {
    cluster: 'metodos-terapeuticos',
    slug: 'emdr',
    label: 'EMDR',
    definition: 'Eye Movement Desensitization and Reprocessing (Francine Shapiro). Recomendado por OMS, APA e NICE para TEPT e trauma complexo.'
  },
  {
    cluster: 'metodos-terapeuticos',
    slug: 'mindfulness',
    label: 'Mindfulness',
    definition: 'Atenção plena. Em clínica, refere-se a protocolos como MBSR (Kabat-Zinn) e MBCT (Segal, Williams, Teasdale), com evidência em depressão recorrente e estresse.',
    aliases: ['MBSR', 'MBCT']
  },
  {
    cluster: 'conceitos-pot',
    slug: 'pot',
    label: 'POT',
    definition: 'Psicologia Organizacional e do Trabalho. Área que estuda comportamento humano em organizações: cultura, clima, liderança, saúde mental ocupacional, NR-1 e people analytics.',
    aliases: ['Psicologia Organizacional e do Trabalho']
  },
  {
    cluster: 'conceitos-pot',
    slug: 'jd-r',
    label: 'JD-R',
    definition: 'Job Demands-Resources Model (Bakker, Demerouti). Modelo que explica burnout e engajamento pelo balanço entre demandas e recursos do trabalho.',
    aliases: ['Job Demands-Resources']
  },
  {
    cluster: 'conceitos-pot',
    slug: 'seguranca-psicologica',
    label: 'Segurança psicológica',
    definition: 'Conceito de Amy Edmondson: crença compartilhada de que o time é seguro para tomar riscos interpessoais. Preditor robusto de aprendizagem e performance.'
  },
  {
    cluster: 'conceitos-neuro',
    slug: 'iapt',
    label: 'IAPT',
    definition: 'Improving Access to Psychological Therapies. Programa do NHS britânico, hoje chamado NHS Talking Therapies, modelo de acesso escalonado a terapias baseadas em evidência.',
    aliases: ['NHS Talking Therapies']
  },
  {
    cluster: 'conceitos-neuro',
    slug: 'mhgap',
    label: 'mhGAP',
    definition: 'Mental Health Gap Action Programme da OMS. Pacote de intervenções essenciais para saúde mental, neurológicas e por uso de substâncias em cenários de baixos e médios recursos.'
  },
  {
    cluster: 'conceitos-neuro',
    slug: 'nice',
    label: 'NICE',
    definition: 'National Institute for Health and Care Excellence (Reino Unido). Referência internacional para guidelines clínicos baseados em evidência.'
  },
  {
    cluster: 'conceitos-neuro',
    slug: 'plasticidade-cerebral',
    label: 'Plasticidade cerebral',
    definition: 'Capacidade do sistema nervoso de se reorganizar — base neurobiológica de aprendizagem, recuperação pós-lesão e reabilitação cognitiva.',
    aliases: ['neuroplasticidade']
  }
];

function normalize(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]+/g, '');
}

function findTerm(term: string): TermDef | undefined {
  const key = normalize(term);
  return TERMS.find(t => {
    if (normalize(t.label) === key) return true;
    if (normalize(t.slug) === key) return true;
    return (t.aliases ?? []).some(a => normalize(a) === key);
  });
}

export default function GlossaryTooltip({ term, children, cluster }: Props) {
  const [open, setOpen] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  const [placement, setPlacement] = useState<{ left: number; above: boolean; availableHeight?: number }>({ left: 0, above: false });
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const popupRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const previewOpen = useRef(false);
  const id = useId();
  const def = findTerm(term);

  useEffect(() => { setEnhanced(true); }, []);

  useEffect(() => {
    if (!open) return;
    const position = () => {
      if (!wrapperRef.current || !popupRef.current) return;
      const anchor = wrapperRef.current.getBoundingClientRect();
      const width = popupRef.current.offsetWidth;
      const content = popupRef.current.firstElementChild as HTMLElement | null;
      const height = (content?.scrollHeight ?? popupRef.current.offsetHeight) + 8;
      const left = Math.max(16 - anchor.left, Math.min(0, document.documentElement.clientWidth - anchor.left - width - 16));
      const below = Math.max(0, window.innerHeight - anchor.bottom - 16);
      const aboveSpace = Math.max(0, anchor.top - 16);
      const above = below < height && aboveSpace > below;
      setPlacement({ left, above, availableHeight: Math.max(0, (above ? aboveSpace : below) - 8) });
    };
    const outside = (event: PointerEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onEsc = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return;
      if (popupRef.current?.contains(document.activeElement)) triggerRef.current?.focus();
      previewOpen.current = false;
      setOpen(false);
      event.preventDefault();
    };
    position();
    window.addEventListener('resize', position);
    window.addEventListener('scroll', position, true);
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', onEsc);
    return () => {
      window.removeEventListener('resize', position);
      window.removeEventListener('scroll', position, true);
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  if (!def) return <span>{children ?? term}</span>;

  const keys = new Set([term, def.label, def.slug, ...(def.aliases ?? [])].map(normalize));
  const matches = glossaryTerms.filter(entry => entry.grupo === 'geral' &&
    [entry.id, entry.termo, ...entry.variantes].some(value => keys.has(normalize(value))));
  const canonical = matches.find(entry => entry.url.startsWith(`/glossario/${cluster ?? def.cluster}/`)) ?? matches[0];
  const href = canonical?.url ?? `/busca?q=${encodeURIComponent(def.label)}`;

  const preview = () => {
    if (!open) {
      previewOpen.current = true;
      setOpen(true);
    }
  };
  const handleBlur = (event: FocusEvent<HTMLSpanElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
  };

  return (
    <span
      className="relative inline-block"
      ref={wrapperRef}
      onMouseEnter={preview}
      onMouseLeave={() => {
        if (!wrapperRef.current?.contains(document.activeElement)) setOpen(false);
      }}
      onBlur={handleBlur}
    >
      <a
        ref={triggerRef}
        href={href}
        role={enhanced ? 'button' : undefined}
        aria-describedby={open ? `${id}-definition` : undefined}
        aria-controls={enhanced ? id : undefined}
        aria-expanded={enhanced ? open : undefined}
        onFocus={preview}
        onKeyDown={event => {
          if (enhanced && event.key === ' ') {
            event.preventDefault();
            event.currentTarget.click();
          }
        }}
        onClick={event => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          if (previewOpen.current) setOpen(true);
          else setOpen(value => !value);
          previewOpen.current = false;
        }}
        className="cursor-help rounded-sm border-b border-dotted border-brand-500 bg-transparent p-0 font-semibold text-brand-700 hover:text-brand-800"
      >
        {children ?? def.label}
      </a>
      {open && (
        <span
          ref={popupRef}
          id={id}
          role="group"
          aria-label={def.label}
          className="absolute z-40 text-left"
          style={{
            width: 'min(18rem, calc(100vw - 2rem))',
            left: placement.left,
            top: placement.above ? 'auto' : '100%',
            bottom: placement.above ? '100%' : 'auto',
            paddingTop: placement.above ? 0 : 8,
            paddingBottom: placement.above ? 8 : 0,
          }}
        >
          <span style={{ maxHeight: placement.availableHeight }} className="block max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain rounded-xl border border-surface-200 bg-white p-3 text-xs leading-relaxed text-ink-700 shadow-lift">
            <span className="block font-display text-sm font-semibold text-ink-900">{def.label}</span>
            <span id={`${id}-definition`} role="tooltip" className="mt-1 block">{def.definition}</span>
            <a href={href} className="mt-2 inline-block text-[11px] font-semibold text-brand-700 hover:text-brand-800">
              {canonical ? 'Ver no glossário' : 'Buscar termo no portal'} <span aria-hidden="true">→</span>
            </a>
          </span>
        </span>
      )}
    </span>
  );
}

export { TERMS as GLOSSARY_TOOLTIP_TERMS };
