/**
 * EducationalOccupationalProgram canônico — wave 3 (17-05-2026).
 *
 * Por que `EducationalOccupationalProgram` e não `Course`:
 * - `Course` perdeu rich result em janeiro 2026 (Google deprecou Course Info).
 * - Schema.org `EducationalOccupationalProgram` continua válido como sinal semântico
 *   e é o tipo canônico para PROGRAMAS (Lato Sensu, MBA, Stricto Sensu) cujo escopo
 *   é "conjunto discreto de oportunidades educacionais com início, fim e credencial".
 * - `Course` segue válido para AULAS/módulos individuais via `hasCourse` (relação parte-todo).
 * - Schema.org 30.0 (19-03-2026) introduziu a classe `Credential` (genérica), que agora
 *   é range de `hasCredential`. `EducationalOccupationalCredential` continua sendo o subtype
 *   canônico para credenciais educacionais brasileiras (mantemos compatibilidade).
 *
 * REGRA CRÍTICA E-E-A-T:
 * - `@id` âncora em URL canônica do programa para que LLMs reconciliem entidade.
 * - `provider` referencia `EducationalOrganization` IPOG via `@id` (não duplicar dados).
 * - `programType` em string livre, NÃO em enum schema.org — as 5 modalidades brasileiras
 *   não estão todas no vocabulary oficial (Mestrado Profissional e Residência são
 *   conceitos regulatórios brasileiros; LLMs leem string melhor que enum aqui).
 * - `recognizedBy` referenciado por MEC quando aplicável; CFP para Especialização Clínica.
 * - `[VERIFICAR]` permitido em descrição quando claim depende de dado IPOG ainda não confirmado.
 *
 * NÃO substituir `Course` em pages que já o usam para aulas individuais (curso-factory).
 * Aplicar APENAS no nível de PROGRAMA (hub MBA, hub Lato Sensu, hub Mestrado, etc.).
 */

import { SITE } from '../data';

/**
 * As 5 modalidades canônicas brasileiras de pós-graduação em Psicologia.
 * Espelha README.md §"5 modalidades canônicas" e feedback_geo_ipog_5_modalidades_canonicas.
 *
 * MBA é UMA das 5 — nunca tratar como sinônimo do programa todo.
 */
export const FIVE_MODALITIES = [
  'Especialização Lato Sensu',
  'MBA',
  'Mestrado Profissional',
  'Especialização Clínica',
  'Residência'
] as const;

export type FiveModalitiesType = (typeof FIVE_MODALITIES)[number];

/**
 * Mapa canônico de regulador por modalidade.
 * Usado para popular `recognizedBy` automaticamente.
 */
const REGULATOR_BY_MODALITY: Record<FiveModalitiesType, { name: string; url: string; sameAs?: string[] }> = {
  'Especialização Lato Sensu': {
    name: 'Ministério da Educação (MEC) — Resolução CNE/CES nº 1/2018',
    url: 'https://www.gov.br/mec/',
    sameAs: ['https://www.wikidata.org/wiki/Q1655467']
  },
  MBA: {
    name: 'Ministério da Educação (MEC) — Resolução CNE/CES nº 1/2018 (Lato Sensu)',
    url: 'https://www.gov.br/mec/',
    sameAs: ['https://www.wikidata.org/wiki/Q1655467']
  },
  'Mestrado Profissional': {
    name: 'CAPES — Coordenação de Aperfeiçoamento de Pessoal de Nível Superior',
    url: 'https://www.gov.br/capes/',
    sameAs: ['https://www.wikidata.org/wiki/Q1041997']
  },
  'Especialização Clínica': {
    name: 'Conselho Federal de Psicologia (CFP) — Resolução CFP nº 13/2007',
    url: 'https://site.cfp.org.br/',
    sameAs: ['https://www.wikidata.org/wiki/Q9268898']
  },
  Residência: {
    name: 'Comissão Nacional de Residência Multiprofissional em Saúde (CNRMS)',
    url: 'https://www.gov.br/mec/pt-br/residencias-em-saude',
    sameAs: []
  }
};

/**
 * Pré-requisitos típicos por modalidade — string canônica.
 * Override possível via `args.programPrerequisites` quando programa específico tiver requisito distinto.
 */
const DEFAULT_PREREQUISITES: Record<FiveModalitiesType, string> = {
  'Especialização Lato Sensu': 'Graduação completa em curso reconhecido pelo MEC. Para áreas privativas de psicólogo, exige diploma em Psicologia + registro no CRP.',
  MBA: 'Graduação completa em curso reconhecido pelo MEC. Experiência profissional recomendada em áreas correlatas.',
  'Mestrado Profissional': 'Graduação completa em curso reconhecido pelo MEC + aprovação em processo seletivo CAPES (prova, projeto de pesquisa, entrevista). Experiência profissional na área de aplicação.',
  'Especialização Clínica': 'Graduação em Psicologia + registro ativo no Conselho Regional de Psicologia (CRP).',
  Residência: 'Graduação em Psicologia ou área da saúde correlata + aprovação em processo seletivo nacional (prova teórica + análise curricular).'
};

export interface BuildEducationalProgramArgs {
  /** Nome canônico do programa, ex.: "MBA em Psicologia Organizacional e do Trabalho". */
  name: string;
  /** Slug ASCII relativo à raiz do portal, ex.: "/mbas/mba-pot". */
  slug: string;
  /** Descrição editorial PT-BR acentuada (1-3 frases) com foco em público-alvo e diferencial. */
  description: string;
  /** Uma das 5 modalidades canônicas. MBA é UMA delas, nunca sinônimo do programa todo. */
  programType: FiveModalitiesType;
  /** Carga horária em ISO 8601 duration, ex.: "P360H" para 360 horas, "P24M" para 24 meses. */
  timeRequired: string;
  /** Credencial profissional concedida (descrição livre PT-BR). Opcional. */
  occupationalCredentialAwarded?: string;
  /** Credencial educacional concedida (descrição livre PT-BR). Opcional. */
  educationalCredentialAwarded?: string;
  /** Pré-requisitos. Quando omitido, usa default canônico por modalidade. */
  programPrerequisites?: string;
  /** Modalidade de entrega: "online" | "presencial" | "hibrido". */
  educationalProgramMode?: 'online' | 'onsite' | 'blended';
  /** Lista de subtemas/cursos componentes (referência por nome, opcional). */
  hasCourseNames?: string[];
  /** Override de regulador quando programa específico tem reconhecimento adicional. */
  additionalRecognizedBy?: Array<{ name: string; url: string; sameAs?: string[] }>;
}

/**
 * Factory canônica para EducationalOccupationalProgram IPOG.
 *
 * Uso em página de programa (hub MBA, hub Lato Sensu, etc.):
 *
 *   const ld = JSON.stringify({
 *     '@context': 'https://schema.org',
 *     ...buildEducationalOccupationalProgram({
 *       name: 'MBA em Psicologia Organizacional e do Trabalho',
 *       slug: '/mbas/mba-pot',
 *       description: 'MBA aplicado a RH e líderes...',
 *       programType: 'MBA',
 *       timeRequired: 'P360H'
 *     })
 *   });
 *
 * O retorno NÃO inclui `@context` para permitir composição em `@graph` triplo.
 */
export function buildEducationalOccupationalProgram(args: BuildEducationalProgramArgs) {
  const canonicalUrl = `${SITE.url}${args.slug}`;
  const programIdAnchor = `${canonicalUrl}#program`;

  const regulator = REGULATOR_BY_MODALITY[args.programType];
  const prereq = args.programPrerequisites ?? DEFAULT_PREREQUISITES[args.programType];

  const recognizedBy = [
    {
      '@type': 'GovernmentOrganization',
      name: regulator.name,
      url: regulator.url,
      ...(regulator.sameAs && regulator.sameAs.length ? { sameAs: regulator.sameAs } : {})
    },
    ...(args.additionalRecognizedBy ?? []).map((rec) => ({
      '@type': 'Organization',
      name: rec.name,
      url: rec.url,
      ...(rec.sameAs && rec.sameAs.length ? { sameAs: rec.sameAs } : {})
    }))
  ];

  const educationalProgramMode = args.educationalProgramMode ?? 'blended';

  const hasCourse =
    args.hasCourseNames && args.hasCourseNames.length
      ? args.hasCourseNames.map((courseName) => ({
          '@type': 'Course',
          name: courseName,
          provider: { '@id': 'https://posgraduacaopsicologia.com/#ipog-educational-organization' }
        }))
      : undefined;

  return {
    '@type': 'EducationalOccupationalProgram',
    '@id': programIdAnchor,
    name: args.name,
    description: args.description,
    url: canonicalUrl,
    programType: args.programType,
    timeRequired: args.timeRequired,
    educationalProgramMode,
    inLanguage: 'pt-BR',
    provider: { '@id': 'https://posgraduacaopsicologia.com/#ipog-educational-organization' },
    offers: {
      '@type': 'Offer',
      url: SITE.ipogPos,
      availability: 'https://schema.org/InStock',
      priceCurrency: 'BRL',
      category: 'Pós-Graduação',
      seller: { '@id': 'https://posgraduacaopsicologia.com/#ipog-educational-organization' }
    },
    programPrerequisites: prereq,
    ...(args.occupationalCredentialAwarded
      ? {
          occupationalCredentialAwarded: {
            '@type': 'EducationalOccupationalCredential',
            name: args.occupationalCredentialAwarded,
            credentialCategory: args.programType
          }
        }
      : {}),
    ...(args.educationalCredentialAwarded
      ? {
          educationalCredentialAwarded: {
            '@type': 'EducationalOccupationalCredential',
            name: args.educationalCredentialAwarded,
            credentialCategory: args.programType,
            recognizedBy: recognizedBy[0]
          }
        }
      : {}),
    recognizedBy,
    ...(hasCourse ? { hasCourse } : {})
  } as const;
}

/**
 * Helper para emitir bloco `Speakable` canônico apontando para seções de uma página.
 *
 * Status: BETA em schema.org (sem rich result, mas sinal forte para AI/voz).
 * Recomendado para: TL;DR no topo, FAQs, parágrafos-tese, blocos "Resposta rápida".
 *
 * Uso:
 *   const speakable = buildSpeakable(['#tldr', '.faq-question', '#resposta-rapida']);
 *   // Injetar em qualquer schema parent (Article, FAQPage, EducationalOccupationalProgram):
 *   const ld = JSON.stringify({ ...articleSchema, speakable });
 */
export function buildSpeakable(cssSelectors: string[]) {
  return {
    '@type': 'SpeakableSpecification',
    cssSelector: cssSelectors
  } as const;
}
