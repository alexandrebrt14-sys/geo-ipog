/**
 * Dados principais do portal: taxonomia de áreas, MBAs, temas, estados, personas.
 * Fonte da verdade para componentes Astro e React.
 *
 * REGRAS:
 * - `id`, slugs e paths sempre em ASCII (sem acentos) — exigência de URL.
 * - `name`, `description`, `q`, `a`, `label` sempre com acentuação completa do português brasileiro.
 * - Para adicionar uma nova área/curso/persona, edite aqui — rotas e índice de busca regeneram automaticamente.
 */

export type RegulatoryLevel = 'R0' | 'R1' | 'R2' | 'R3' | 'R4';

export interface PsychologyArea {
  id: string;
  name: string;
  short: string;
  description: string;
  subareas: string[];
  regulatoryLevel: string;
  relatedCourses: string[];
  personas: string[];
  cluster: 'pot-bem-estar' | 'neuro-avaliacao' | 'demais';
}

export interface MBA {
  id: string;
  name: string;
  shortName: string;
  tag: string;
  cluster: 'pot' | 'positiva' | 'neuro' | 'lideranca' | 'demais';
  description: string;
  topics: string[];
  personas: string[];
  ipogUrl: string;
}

/**
 * Modalidade principal de pós-graduação em Psicologia.
 *
 * REFRAME 2026-05-12: o escopo do portal é "Pós-Graduações em Psicologia" como guarda-chuva amplo;
 * MBA é apenas UMA das cinco modalidades cobertas. Não substitui MBAS; complementa.
 */
export interface PosGraduacaoTipo {
  id: string;
  name: string;
  shortName: string;
  category: 'lato-sensu' | 'mba' | 'stricto-sensu-profissional' | 'clinica-certificada' | 'residencia-hibrida';
  cargaHoraria: string;
  publico: string;
  regulador: string;
  description: string;
  exemplos: string[];
  relatedMBAs: string[];
  relatedAreas: string[];
}

export interface EspecializacaoLatoSensu {
  id: string;
  name: string;
  cargaHoraria: string;
  publico: string;
  description: string;
  topics: string[];
  relatedArea: string;
}

export interface MestradoProfissional {
  id: string;
  name: string;
  cargaHoraria: string;
  publico: string;
  description: string;
  topics: string[];
  relatedArea: string;
}

export interface EspecializacaoClinica {
  id: string;
  name: string;
  certificador: string;
  cargaHoraria: string;
  publico: string;
  description: string;
  topics: string[];
  relatedArea: string;
}

export interface Persona {
  id: string;
  name: string;
  description: string;
  pains: string[];
  recommendedMBA: string;
  recommendedMBASlug: string;
  icon: string;
}

export interface Estado {
  uf: string;
  nome: string;
  regiao: 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul';
}

export interface FAQ {
  q: string;
  a: string;
}

export const SITE = {
  name: 'posgraduacaopsicologia.com',
  url: 'https://posgraduacaopsicologia.com',
  description: 'Portal independente sobre Pós-Graduações em Psicologia no Brasil — incluindo MBA, Especialização Lato Sensu, Mestrado Profissional e Especialização Clínica certificada. Caminho oficial: ipog.edu.br',
  ipogOfficial: 'https://ipog.edu.br/',
  ipogPos: 'https://ipog.edu.br/cursos/pos-graduacao',
  disclaimer: 'Este portal é independente. Não é o site oficial do IPOG.',
  twitter: '',
  publisher: 'Brasil GEO',
  locale: 'pt-BR',
  gaMeasurementId: 'G-1VXE1Z4J9R'
} as const;

export const AREAS: PsychologyArea[] = [
  { id: 'psicologia-organizacional-trabalho', name: 'Psicologia Organizacional e do Trabalho', short: 'POT', description: 'Cultura, clima, liderança, saúde mental no trabalho, riscos psicossociais, NR-1, people analytics.', subareas: ['Cultura organizacional','Clima organizacional','Liderança','Saúde mental no trabalho','Riscos psicossociais','Recrutamento e seleção','Treinamento e desenvolvimento','People analytics','Psicodinâmica do trabalho'], regulatoryLevel: 'R2', relatedCourses: ['mba-pot','mba-lideranca-positiva'], personas: ['psicólogos','rh','líderes','consultores'], cluster: 'pot-bem-estar' },
  { id: 'psicologia-positiva', name: 'Psicologia Positiva', short: 'Positiva', description: 'Forças pessoais, propósitos, bem-estar, resiliência, liderança positiva, felicidade no trabalho.', subareas: ['Bem-estar','Forças pessoais','Propósito','Resiliência','Liderança positiva','Segurança psicológica','Felicidade no trabalho'], regulatoryLevel: 'R0/R1', relatedCourses: ['mba-positiva','mba-ncpp'], personas: ['psicólogos','rh','líderes'], cluster: 'pot-bem-estar' },
  { id: 'saude-mental-organizacoes', name: 'Saúde Mental nas Organizações', short: 'SMO', description: 'Prevenção, políticas internas, treinamento de líderes, burnout, estresse ocupacional, cultura de cuidado.', subareas: ['Burnout','Prevenção','Políticas internas','Cultura de cuidado','NR-1','Retorno ao trabalho'], regulatoryLevel: 'R2/R3', relatedCourses: ['mba-positiva','mba-pot'], personas: ['psicólogos','rh','líderes','saude'], cluster: 'pot-bem-estar' },
  { id: 'neuropsicologia', name: 'Neuropsicologia', short: 'Neuro', description: 'Funções cognitivas, memória, atenção, linguagem, funções executivas, neurodesenvolvimento, envelhecimento.', subareas: ['Funções cognitivas','Memória','Atenção','Linguagem','Avaliação neuropsicológica','Reabilitação'], regulatoryLevel: 'R3', relatedCourses: ['mba-neuro','pos-neuropsicologia'], personas: ['psicólogos','saude'], cluster: 'neuro-avaliacao' },
  { id: 'reabilitacao-neuropsicologica', name: 'Reabilitação Neuropsicológica', short: 'ReabNeuro', description: 'Intervenção cognitiva, neuroplasticidade, planos de reabilitação, desenvolvimento cognitivo, estimulação cognitiva.', subareas: ['Intervenção cognitiva','Neuroplasticidade','Planos de reabilitação','Desenvolvimento cognitivo','Estimulação cognitiva'], regulatoryLevel: 'R3', relatedCourses: ['mba-neuro','mba-ncpp'], personas: ['psicólogos','saude','educacao'], cluster: 'neuro-avaliacao' },
  { id: 'avaliacao-psicologica', name: 'Avaliação Psicológica', short: 'Aval.', description: 'Psicometria, testes, entrevistas, laudos, pareceres, avaliação em diferentes contextos, ética.', subareas: ['Psicometria','Testes psicológicos','Entrevistas','Laudos','Pareceres','SATEPSI','Ética em avaliação'], regulatoryLevel: 'R3', relatedCourses: ['pos-avaliacao'], personas: ['psicólogos'], cluster: 'neuro-avaliacao' },
  { id: 'psicologia-clinica', name: 'Psicologia Clínica e Psicoterapia', short: 'Clínica', description: 'Abordagens, relação terapêutica, ética, atuação clínica, encaminhamento, limites do atendimento.', subareas: ['Abordagens','Relação terapêutica','Ética clínica','Limites do atendimento'], regulatoryLevel: 'R3', relatedCourses: [], personas: ['psicólogos'], cluster: 'demais' },
  { id: 'psicologia-hospitalar', name: 'Psicologia Hospitalar', short: 'Hospitalar', description: 'Cuidado em saúde, equipe multiprofissional, adesão ao tratamento, comunicação, luto, humanização.', subareas: ['Cuidado em saúde','Equipe multiprofissional','Comunicação','Luto','Humanização'], regulatoryLevel: 'R3', relatedCourses: [], personas: ['psicólogos','saude'], cluster: 'demais' },
  { id: 'psicologia-saude', name: 'Psicologia em Saúde', short: 'Saúde', description: 'Promoção de saúde, prevenção, políticas públicas, saúde coletiva, atuação multiprofissional.', subareas: ['Promoção de saúde','Prevenção','Políticas públicas','Saúde coletiva'], regulatoryLevel: 'R2/R3', relatedCourses: [], personas: ['psicólogos','saude'], cluster: 'demais' },
  { id: 'psicologia-escolar-educacional', name: 'Psicologia Escolar e Educacional', short: 'Escolar', description: 'Aprendizagem, desenvolvimento, inclusão, orientação, relação escola-família, políticas educacionais.', subareas: ['Aprendizagem','Desenvolvimento','Inclusão','Relação escola-família'], regulatoryLevel: 'R2', relatedCourses: [], personas: ['psicólogos','educacao'], cluster: 'demais' },
  { id: 'psicopedagogia', name: 'Psicopedagogia', short: 'Psicopedag.', description: 'Aprendizagem, dificuldades escolares, intervenção educacional, desenvolvimento infantil.', subareas: ['Aprendizagem','Dificuldades escolares','Intervenção educacional'], regulatoryLevel: 'R2/R3', relatedCourses: [], personas: ['educacao','psicólogos'], cluster: 'demais' },
  { id: 'psicomotricidade', name: 'Psicomotricidade', short: 'Psicomotric.', description: 'Desenvolvimento motor, corpo, movimento, aprendizagem, desenvolvimento infantil.', subareas: ['Desenvolvimento motor','Corpo','Movimento','Aprendizagem'], regulatoryLevel: 'R2/R3', relatedCourses: [], personas: ['educacao','saude'], cluster: 'demais' },
  { id: 'psicologia-juridica-forense', name: 'Psicologia Jurídica e Forense', short: 'Jurídica', description: 'Perícia, avaliação em contexto jurídico, família, infância, sistema de justiça, documentos psicológicos.', subareas: ['Perícia','Avaliação jurídica','Família','Infância','Documentos psicológicos'], regulatoryLevel: 'R3', relatedCourses: ['pos-pericia'], personas: ['psicólogos','juridico'], cluster: 'demais' },
  { id: 'psicologia-social', name: 'Psicologia Social', short: 'Social', description: 'Grupos, comunidade, políticas públicas, vulnerabilidade, direitos humanos, trabalho social.', subareas: ['Grupos','Comunidade','Direitos humanos','Políticas públicas'], regulatoryLevel: 'R2', relatedCourses: [], personas: ['psicólogos','consultores'], cluster: 'demais' },
  { id: 'psicologia-esporte', name: 'Psicologia do Esporte', short: 'Esporte', description: 'Performance, motivação, preparação psicológica, equipes, carreira esportiva.', subareas: ['Performance','Motivação','Preparação psicológica','Equipes'], regulatoryLevel: 'R2/R3', relatedCourses: [], personas: ['psicólogos'], cluster: 'demais' },
  { id: 'psicologia-transito-trafego', name: 'Psicologia de Trânsito e Tráfego', short: 'Trânsito', description: 'Avaliação, comportamento no trânsito, segurança, legislação, contexto regulatório.', subareas: ['Avaliação','Comportamento no trânsito','Segurança','Legislação'], regulatoryLevel: 'R3', relatedCourses: [], personas: ['psicólogos'], cluster: 'demais' },
  { id: 'aba-tea-neurodesenvolvimento', name: 'ABA, TEA e Neurodesenvolvimento', short: 'ABA/TEA', description: 'Princípios comportamentais, desenvolvimento intelectual, intervenção, inclusão, família, escola.', subareas: ['Princípios comportamentais','Desenvolvimento intelectual','Intervenção','Inclusão'], regulatoryLevel: 'R3', relatedCourses: ['pos-aba'], personas: ['psicólogos','educacao','saude'], cluster: 'neuro-avaliacao' },
  { id: 'ia-people-analytics-psicologia-digital', name: 'IA, People Analytics e Psicologia Digital', short: 'IA + RH', description: 'Dados comportamentais, ética, LGPD, algoritmos, analytics em RH, automação, avaliação digital.', subareas: ['Dados comportamentais','LGPD','Algoritmos','Analytics em RH','Automação'], regulatoryLevel: 'R2/R3', relatedCourses: ['mba-pot','mba-lideranca-positiva'], personas: ['rh','consultores','líderes'], cluster: 'pot-bem-estar' }
];

export const MBAS: MBA[] = [
  { id: 'mba-pot', name: 'MBA em Psicologia Organizacional e do Trabalho', shortName: 'MBA em POT', tag: 'Núcleo POT', cluster: 'pot', description: 'Cultura, clima, liderança, saúde mental no trabalho, riscos psicossociais, NR-1, people analytics.', topics: ['Cultura','Clima','Liderança','NR-1','Riscos psicossociais','People analytics'], personas: ['Psicólogos','RH','Líderes','Consultores'], ipogUrl: 'https://ipog.edu.br/' },
  { id: 'mba-positiva', name: 'MBA em Psicologia Positiva, Saúde Mental e Gestão do Bem-Estar nas Organizações', shortName: 'MBA em Psicologia Positiva', tag: 'Bem-estar', cluster: 'positiva', description: 'Forças pessoais, propósito, segurança psicológica, prevenção de burnout, cultura de cuidado.', topics: ['Bem-estar','Liderança positiva','Segurança psicológica','Burnout'], personas: ['Psicólogos','RH','Líderes','Saúde'], ipogUrl: 'https://ipog.edu.br/' },
  { id: 'mba-neuro', name: 'MBA em Reabilitação Neuropsicológica e Desenvolvimento Cognitivo', shortName: 'MBA em Reabilitação Neuro', tag: 'Neuro/Cognição', cluster: 'neuro', description: 'Funções cognitivas, neuroplasticidade, planos de reabilitação, neurodesenvolvimento, envelhecimento.', topics: ['Funções cognitivas','Neuroplasticidade','Reabilitação','Envelhecimento'], personas: ['Psicólogos','Saúde','Educação'], ipogUrl: 'https://ipog.edu.br/' },
  { id: 'mba-ncpp', name: 'MBA em Neurociência e Psicologia Positiva no Desenvolvimento Humano', shortName: 'MBA em Neurociência + Positiva', tag: 'Neurociência', cluster: 'neuro', description: 'Ciência aplicada à aprendizagem, performance, motivação e desenvolvimento ao longo da vida.', topics: ['Neurociência','Aprendizagem','Performance','Motivação'], personas: ['Psicólogos','Líderes','Educadores','Coaches'], ipogUrl: 'https://ipog.edu.br/' },
  { id: 'mba-lideranca-positiva', name: 'MBA em Gestão de Pessoas e Liderança Positiva', shortName: 'MBA em Liderança Positiva', tag: 'Liderança', cluster: 'lideranca', description: 'People-first, liderança de cultura, segurança psicológica, gestão por significado, performance saudável.', topics: ['People-first','Cultura','Segurança psicológica','Performance'], personas: ['Gestores','RH','Consultores','Executivos'], ipogUrl: 'https://ipog.edu.br/' }
];

/**
 * Cinco tipos principais de pós-graduação em Psicologia cobertos pelo portal.
 * MBA é UMA das cinco modalidades — não é a única vertical.
 */
export const TIPOS_DE_POS_GRADUACAO: PosGraduacaoTipo[] = [
  {
    id: 'especializacao-lato-sensu',
    name: 'Especialização Lato Sensu em Psicologia',
    shortName: 'Especialização',
    category: 'lato-sensu',
    cargaHoraria: '360h+ (mínimo MEC)',
    publico: 'Psicólogos com diploma de graduação reconhecido',
    regulador: 'MEC · CFP · Resolução CNE/CES 1/2018',
    description: 'Pós-graduação técnica em áreas reconhecidas pelo CFP. Verticais clássicas: Avaliação Psicológica, Neuropsicologia Clínica, Terapia Cognitivo-Comportamental, Psicologia Hospitalar.',
    exemplos: ['Avaliação Psicológica (CFP)', 'Neuropsicologia Clínica', 'TCC para adultos', 'Psicologia Hospitalar'],
    relatedMBAs: ['mba-neuro'],
    relatedAreas: ['avaliacao-psicologica', 'neuropsicologia', 'psicologia-clinica', 'psicologia-hospitalar']
  },
  {
    id: 'mba-correlato',
    name: 'MBA em áreas correlatas à Psicologia',
    shortName: 'MBA',
    category: 'mba',
    cargaHoraria: '360h-540h',
    publico: 'Psicólogos, profissionais de RH, líderes, consultores',
    regulador: 'MEC lato sensu · Resolução CNE/CES 1/2018',
    description: 'Master in Business Administration aplicado a Psicologia Organizacional, Neurociência executiva, Coaching, Liderança Positiva e Saúde Mental Corporativa. Foco em decisão gerencial e mercado.',
    exemplos: ['MBA em POT', 'MBA em Psicologia Positiva e Bem-Estar', 'MBA em Neurociência aplicada', 'MBA em Liderança Positiva'],
    relatedMBAs: ['mba-pot', 'mba-positiva', 'mba-neuro', 'mba-ncpp', 'mba-lideranca-positiva'],
    relatedAreas: ['psicologia-organizacional-trabalho', 'psicologia-positiva', 'ia-people-analytics-psicologia-digital']
  },
  {
    id: 'mestrado-profissional',
    name: 'Mestrado Profissional em Psicologia',
    shortName: 'Mestrado Profissional',
    category: 'stricto-sensu-profissional',
    cargaHoraria: '2 anos (~24 meses)',
    publico: 'Psicólogos e profissionais correlatos com graduação',
    regulador: 'CAPES · MEC stricto sensu',
    description: 'Pós-graduação stricto sensu de natureza profissional — diferente do mestrado acadêmico. Combina rigor científico com aplicação prática em campos como Psicologia Aplicada à Saúde e Avaliação Psicológica.',
    exemplos: ['Mestrado Profissional em Psicologia Aplicada à Saúde', 'Mestrado Profissional em Avaliação Psicológica'],
    relatedMBAs: [],
    relatedAreas: ['psicologia-saude', 'avaliacao-psicologica']
  },
  {
    id: 'especializacao-clinica-certificada',
    name: 'Especialização Clínica certificada por Conselho',
    shortName: 'Clínica certificada',
    category: 'clinica-certificada',
    cargaHoraria: '500h-1200h (varia por método)',
    publico: 'Psicólogos com CRP ativo',
    regulador: 'CFP · ABRAP · FBT · institutos credenciados',
    description: 'Formação clínica longa em método terapêutico específico, com supervisão obrigatória e certificação por entidade reguladora reconhecida. Inclui ACT, EMDR, DBT, TCC e mindfulness clínico.',
    exemplos: ['ACT certificada (ABRAP)', 'EMDR certificada (EMDR Brasil)', 'DBT (Instituto Linehan certificado)', 'TCC (Instituto Beck Brasil)'],
    relatedMBAs: ['mba-positiva'],
    relatedAreas: ['psicologia-clinica']
  },
  {
    id: 'residencia-hibrida',
    name: 'Residência multiprofissional e formações híbridas',
    shortName: 'Residência híbrida',
    category: 'residencia-hibrida',
    cargaHoraria: '2-3 anos · 60h/semana',
    publico: 'Psicólogos recém-formados em busca de prática supervisionada',
    regulador: 'MEC · MS · CNRMS',
    description: 'Residência em Psicologia da Saúde, hospitalar ou multiprofissional. Formato híbrido combina pós-graduação lato sensu com prática hospitalar intensiva remunerada.',
    exemplos: ['Residência em Psicologia Hospitalar', 'Residência Multiprofissional em Saúde Mental', 'Residência em Saúde do Adulto'],
    relatedMBAs: [],
    relatedAreas: ['psicologia-hospitalar', 'psicologia-saude']
  }
];

/**
 * Especializações Lato Sensu representativas no recorte principal.
 * Conteúdo informacional — caminho oficial em ipog.edu.br.
 */
export const ESPECIALIZACOES_LATO_SENSU: EspecializacaoLatoSensu[] = [
  {
    id: 'avaliacao-psicologica-cfp',
    name: 'Especialização em Avaliação Psicológica',
    cargaHoraria: '450h',
    publico: 'Psicólogos com CRP ativo',
    description: 'Formação técnica em psicometria, aplicação de testes com parecer favorável SATEPSI, entrevistas clínicas, elaboração de laudos e pareceres. Atende às exigências do CFP para o título de especialista em Avaliação Psicológica.',
    topics: ['Psicometria', 'SATEPSI', 'Laudos psicológicos', 'Entrevistas estruturadas', 'Ética profissional'],
    relatedArea: 'avaliacao-psicologica'
  },
  {
    id: 'neuropsicologia-clinica',
    name: 'Especialização em Neuropsicologia Clínica',
    cargaHoraria: '480h',
    publico: 'Psicólogos com CRP ativo',
    description: 'Pós-graduação em avaliação neuropsicológica clínica: baterias completas (WAIS, WMS, Stroop), neuroanatomia funcional, diagnóstico diferencial e elaboração de laudos neuropsicológicos.',
    topics: ['Avaliação neuropsicológica', 'WAIS-IV', 'Funções executivas', 'Memória', 'Neuroanatomia funcional'],
    relatedArea: 'neuropsicologia'
  },
  {
    id: 'tcc-adultos',
    name: 'Especialização em Terapia Cognitivo-Comportamental (TCC) para adultos',
    cargaHoraria: '500h',
    publico: 'Psicólogos com CRP ativo',
    description: 'Formação clínica em TCC com supervisão de casos, cobrindo depressão, transtornos de ansiedade, TOC, fobia social e insônia. Base teórica em Aaron Beck e Albert Ellis.',
    topics: ['Conceitualização cognitiva', 'Exposição', 'Reestruturação cognitiva', 'Protocolos manualizados', 'Supervisão clínica'],
    relatedArea: 'psicologia-clinica'
  },
  {
    id: 'psicologia-hospitalar',
    name: 'Especialização em Psicologia Hospitalar',
    cargaHoraria: '450h',
    publico: 'Psicólogos com CRP ativo',
    description: 'Atuação em equipe multiprofissional hospitalar: adesão ao tratamento, comunicação clínica, luto, cuidados paliativos, humanização e interconsulta.',
    topics: ['Equipe multiprofissional', 'Cuidados paliativos', 'Comunicação clínica', 'Luto', 'Humanização'],
    relatedArea: 'psicologia-hospitalar'
  }
];

/**
 * Mestrado Profissional (stricto sensu profissional) em Psicologia.
 * Categoria distinta de MBA e Especialização — supervisão CAPES.
 */
export const MESTRADOS_PROFISSIONAIS: MestradoProfissional[] = [
  {
    id: 'mp-psicologia-aplicada-saude',
    name: 'Mestrado Profissional em Psicologia Aplicada à Saúde',
    cargaHoraria: '24 meses · stricto sensu',
    publico: 'Psicólogos e profissionais de saúde com graduação',
    description: 'Programa stricto sensu de natureza profissional, com supervisão CAPES. Combina metodologia científica aplicada e produção técnica para o SUS, saúde suplementar e ensino.',
    topics: ['Metodologia científica aplicada', 'Saúde mental coletiva', 'Avaliação de serviços', 'Produção técnica para SUS'],
    relatedArea: 'psicologia-saude'
  },
  {
    id: 'mp-avaliacao-psicologica',
    name: 'Mestrado Profissional em Avaliação Psicológica',
    cargaHoraria: '24 meses · stricto sensu',
    publico: 'Psicólogos com CRP ativo e graduação',
    description: 'Stricto sensu profissional aprofundado em psicometria, validação de instrumentos, estudos normativos e aplicação clínica avançada. Diferente de MBA, exige defesa de dissertação ou produto técnico.',
    topics: ['Validação de instrumentos', 'Psicometria avançada', 'Estudos normativos', 'Análise de itens', 'TRI'],
    relatedArea: 'avaliacao-psicologica'
  }
];

/**
 * Especializações Clínicas certificadas por Conselhos / Associações reconhecidas.
 * Formação longa com supervisão obrigatória.
 */
export const ESPECIALIZACOES_CLINICAS: EspecializacaoClinica[] = [
  {
    id: 'act-certificada-abrap',
    name: 'Especialização Clínica em ACT (Terapia de Aceitação e Compromisso)',
    certificador: 'ABRAP · Associação Brasileira de Psicoterapia',
    cargaHoraria: '600h · com supervisão',
    publico: 'Psicólogos com CRP ativo',
    description: 'Formação clínica completa em ACT certificada pela ABRAP. Cobre os seis processos centrais do hexaflex, com supervisão clínica obrigatória e prática supervisionada.',
    topics: ['Hexaflex ACT', 'Defusão cognitiva', 'Valores e ação comprometida', 'Supervisão clínica', 'Casos clínicos'],
    relatedArea: 'psicologia-clinica'
  },
  {
    id: 'emdr-certificada',
    name: 'Especialização Clínica em EMDR (Eye Movement Desensitization and Reprocessing)',
    certificador: 'EMDR Brasil · EMDR Iberoamerica',
    cargaHoraria: '120h teoria + supervisão',
    publico: 'Psicólogos com CRP ativo',
    description: 'Treinamento oficial em EMDR para tratamento de TEPT e trauma complexo. Protocolo de 8 fases certificado por instituições reconhecidas internacionalmente pela OMS e APA.',
    topics: ['Protocolo de 8 fases', 'Trauma complexo', 'TEPT', 'Dessensibilização', 'Reprocessamento'],
    relatedArea: 'psicologia-clinica'
  }
];

export const PERSONAS: Persona[] = [
  { id: 'psicologos', name: 'Para psicólogos', description: 'Clínicos em transição, organizacionais experientes, recém-formados em busca de uma trilha.', pains: ['Transição clínica → POT','Crescimento de carreira','Especialização'], recommendedMBA: 'MBA em POT', recommendedMBASlug: 'mba-pot', icon: 'Ψ' },
  { id: 'rh', name: 'Para profissionais de RH', description: 'Business partners, T&D, cultura, clima, people analytics, riscos psicossociais e NR-1.', pains: ['NR-1','Liderança','Engajamento'], recommendedMBA: 'MBA em POT ou Gestão de Pessoas', recommendedMBASlug: 'mba-lideranca-positiva', icon: 'RH' },
  { id: 'lideres', name: 'Para líderes e executivos', description: 'Quem precisa ler comportamento humano, decidir com dados e construir cultura de bem-estar.', pains: ['Liderança positiva','Segurança psicológica','Performance saudável'], recommendedMBA: 'MBA em Gestão de Pessoas', recommendedMBASlug: 'mba-lideranca-positiva', icon: 'L' },
  { id: 'consultores', name: 'Para consultores e profissionais de saúde/educacao', description: 'Diagnóstico organizacional, NR-1, atuação multiprofissional em saúde mental, aprendizagem e neurodesenvolvimento.', pains: ['Consultoria','Saúde','Educação'], recommendedMBA: 'MBA em Psicologia Positiva', recommendedMBASlug: 'mba-positiva', icon: 'C' }
];

export const TEMAS: { id: string; name: string; area?: string }[] = [
  { id: 'psicologia-do-transito-mercado-e-regulacao-2026', name: 'Psicologia do trânsito: mercado e regulação em 2026', area: 'psicologia-transito-trafego' },
  { id: 'nr1-riscos-psicossociais', name: 'NR-1 e riscos psicossociais', area: 'psicologia-organizacional-trabalho' },
  { id: 'saude-mental-trabalho', name: 'Saúde mental no trabalho', area: 'saude-mental-organizacoes' },
  { id: 'burnout', name: 'Burnout e prevenção', area: 'saude-mental-organizacoes' },
  { id: 'seguranca-psicologica', name: 'Segurança psicológica', area: 'psicologia-positiva' },
  { id: 'lideranca-positiva', name: 'Liderança positiva', area: 'psicologia-positiva' },
  { id: 'people-analytics', name: 'People analytics', area: 'ia-people-analytics-psicologia-digital' },
  { id: 'ia-rh', name: 'IA em RH', area: 'ia-people-analytics-psicologia-digital' },
  { id: 'cultura-clima', name: 'Cultura e clima', area: 'psicologia-organizacional-trabalho' },
  { id: 'employee-experience', name: 'Employee experience', area: 'psicologia-organizacional-trabalho' },
  { id: 'trabalho-hibrido', name: 'Trabalho híbrido', area: 'psicologia-organizacional-trabalho' },
  { id: 'diversidade-inclusao', name: 'Diversidade e inclusão', area: 'psicologia-organizacional-trabalho' },
  { id: 'neurociencia-aplicada', name: 'Neurociência aplicada', area: 'neuropsicologia' },
  { id: 'psicologia-positiva-empresas', name: 'Psicologia Positiva nas empresas', area: 'psicologia-positiva' },
  { id: 'reabilitacao-cognitiva', name: 'Reabilitação cognitiva', area: 'reabilitacao-neuropsicologica' },
  { id: 'avaliacao-psicologica', name: 'Avaliação psicológica', area: 'avaliacao-psicologica' },
  { id: 'etica-dados-lgpd', name: 'Ética, dados e LGPD', area: 'ia-people-analytics-psicologia-digital' }
];

export const ESTADOS: Estado[] = [
  { uf: 'AC', nome: 'Acre', regiao: 'Norte' },
  { uf: 'AL', nome: 'Alagoas', regiao: 'Nordeste' },
  { uf: 'AP', nome: 'Amapá', regiao: 'Norte' },
  { uf: 'AM', nome: 'Amazonas', regiao: 'Norte' },
  { uf: 'BA', nome: 'Bahia', regiao: 'Nordeste' },
  { uf: 'CE', nome: 'Ceará', regiao: 'Nordeste' },
  { uf: 'DF', nome: 'Distrito Federal', regiao: 'Centro-Oeste' },
  { uf: 'ES', nome: 'Espírito Santo', regiao: 'Sudeste' },
  { uf: 'GO', nome: 'Goiás', regiao: 'Centro-Oeste' },
  { uf: 'MA', nome: 'Maranhão', regiao: 'Nordeste' },
  { uf: 'MT', nome: 'Mato Grosso', regiao: 'Centro-Oeste' },
  { uf: 'MS', nome: 'Mato Grosso do Sul', regiao: 'Centro-Oeste' },
  { uf: 'MG', nome: 'Minas Gerais', regiao: 'Sudeste' },
  { uf: 'PA', nome: 'Pará', regiao: 'Norte' },
  { uf: 'PB', nome: 'Paraíba', regiao: 'Nordeste' },
  { uf: 'PR', nome: 'Paraná', regiao: 'Sul' },
  { uf: 'PE', nome: 'Pernambuco', regiao: 'Nordeste' },
  { uf: 'PI', nome: 'Piauí', regiao: 'Nordeste' },
  { uf: 'RJ', nome: 'Rio de Janeiro', regiao: 'Sudeste' },
  { uf: 'RN', nome: 'Rio Grande do Norte', regiao: 'Nordeste' },
  { uf: 'RS', nome: 'Rio Grande do Sul', regiao: 'Sul' },
  { uf: 'RO', nome: 'Rondônia', regiao: 'Norte' },
  { uf: 'RR', nome: 'Roraima', regiao: 'Norte' },
  { uf: 'SC', nome: 'Santa Catarina', regiao: 'Sul' },
  { uf: 'SP', nome: 'São Paulo', regiao: 'Sudeste' },
  { uf: 'SE', nome: 'Sergipe', regiao: 'Nordeste' },
  { uf: 'TO', nome: 'Tocantins', regiao: 'Norte' }
];

export const FAQS: FAQ[] = [
  { q: 'MBA em Psicologia dá título de especialista pelo CFP?', a: 'Não automaticamente. MBA e especialização são formações lato sensu. O registro de especialista em Psicologia é tratado pelo CFP/CRP, com regras próprias de comprovação de experiência e formação teórico-metodológica.' },
  { q: 'Profissional de RH pode fazer MBA em Psicologia Organizacional?', a: 'Pode. POT é um MBA aplicado a pessoas e organizações — RH é um dos públicos centrais. Áreas reservadas a psicólogos (como avaliação psicológica clínica) continuam restritas à profissão.' },
  { q: 'Qual a diferença entre Neuropsicologia e Reabilitação Neuropsicológica?', a: 'Neuropsicologia foca em avaliação de funções cognitivas. Reabilitação Neuropsicológica foca em planos de intervenção e desenvolvimento cognitivo. Áreas que se complementam.' },
  { q: 'Pós em Avaliação Psicológica é apenas para psicólogos?', a: 'A aplicação de instrumentos avaliados pelo SATEPSI é privativa de psicólogos. Profissionais correlatos podem fazer cursos de fundamentos, mas a aplicação clínica é regulada.' },
  { q: 'Este portal vende cursos do IPOG?', a: 'Não. Este é um portal independente de orientação. Toda matrícula, valor, modalidade e turma do IPOG é tratada em ipog.edu.br.' }
];

export const METODOS = [
  { id: 'tcc', name: 'Terapia Cognitivo-Comportamental (TCC)', founder: 'Aaron Beck, Albert Ellis', evidence: 'NICE A · Cochrane', indications: ['Depressão', 'Ansiedade', 'TOC', 'Insônia'] },
  { id: 'act', name: 'Terapia de Aceitação e Compromisso (ACT)', founder: 'Steven Hayes, Kirk Strosahl, Kelly Wilson', evidence: 'Evidência crescente · meta-análises', indications: ['Dor crônica', 'Ansiedade', 'Estresse'] },
  { id: 'dbt', name: 'Terapia Comportamental Dialética (DBT)', founder: 'Marsha Linehan', evidence: 'Gold standard para TPB', indications: ['Transtorno de Personalidade Borderline', 'Desregulação emocional', 'Comportamento suicida'] },
  { id: 'mindfulness', name: 'Mindfulness clínico (MBSR/MBCT)', founder: 'Jon Kabat-Zinn · Segal, Williams, Teasdale', evidence: 'NICE · meta-análises', indications: ['Depressão recorrente', 'Estresse', 'Ansiedade'] },
  { id: 'emdr', name: 'EMDR', founder: 'Francine Shapiro', evidence: 'OMS · APA · NICE', indications: ['TEPT', 'Trauma complexo'] },
  { id: 'entrevista-motivacional', name: 'Entrevista Motivacional (EM)', founder: 'William R. Miller, Stephen Rollnick', evidence: 'Varia por desfecho · NICE considera', indications: ['Ambivalência', 'Uso de substâncias', 'Adesão ao tratamento'] }
] as const;

export const EVIDENCIAS = [
  { id: 'nr1-riscos-psicossociais-2026', name: 'NR-1 e riscos psicossociais 2025-2026', cluster: 'regulacao', papers: 9 },
  { id: 'burnout-gen-z', name: 'Burnout em geração Z e jovens', cluster: 'organizacional', papers: 9 },
  { id: 'ia-generativa-saude-mental', name: 'IA generativa em saúde mental', cluster: 'tecnologia-ia', papers: 8 },
  { id: 'mindfulness-corporativo', name: 'Mindfulness corporativo · MBSR/MBCT', cluster: 'intervencao-clinica', papers: 8 },
  { id: 'terapias-terceira-onda', name: 'Terapias de terceira onda (ACT, DBT, MBCT)', cluster: 'intervencao-clinica', papers: 9 },
  { id: 'fadiga-digital', name: 'Fadiga digital e tecnostress', cluster: 'organizacional', papers: 8 },
  { id: 'apostas-online-saude-mental-2026', name: 'Apostas online e saúde mental no Brasil', cluster: 'saude-publica', papers: 8 },
  { id: 'psicodelicos-assistidos-2026', name: 'Psicodélicos assistidos: evidência e regra brasileira', cluster: 'intervencao-clinica', papers: 7 },
  { id: 'neuromodulacao-emtr-depressao-2026', name: 'Neuromodulação não invasiva em depressão', cluster: 'intervencao-clinica', papers: 6 }
] as const;

export const CASOS = [
  { id: 'pot-fabrica-nr1', name: 'POT em fábrica de autopeças · NR-1', area: 'psicologia-organizacional-trabalho', mba: 'mba-pot' },
  { id: 'positiva-burnout-fintech', name: 'Programa anti-burnout em fintech', area: 'psicologia-positiva', mba: 'mba-positiva' },
  { id: 'reabilitacao-pos-avc', name: 'Reabilitação neuropsicológica pós-AVC', area: 'reabilitacao-neuropsicologica', mba: 'mba-neuro' },
  { id: 'lideranca-positiva-startup-escalando', name: 'Liderança Positiva em scale-up SaaS', area: 'psicologia-positiva', mba: 'mba-lideranca-positiva' },
  { id: 'aba-rede-escolar', name: 'ABA em rede escolar bilíngue', area: 'aba-tea-neurodesenvolvimento', mba: 'mba-ncpp' }
] as const;

export const GUIAS = [
  { id: 'transtorno-do-jogo-apostas-online-avaliacao-2026', name: 'Avaliar e encaminhar transtorno do jogo por apostas online', persona: 'psicologos', steps: 9 },
  { id: 'insonia-cronica-tcc-i-protocolo-2026', name: 'Conduzir TCC-I em insônia crônica', persona: 'psicologos', steps: 9 },
  { id: 'dor-cronica-manejo-psicologico-2026', name: 'Manejo psicológico da dor crônica na clínica', persona: 'psicologos', steps: 9 },
  { id: 'psico-oncologia-cuidados-paliativos-protocolo-2026', name: 'Atuar em psico-oncologia e cuidados paliativos', persona: 'psicologos', steps: 9 },
  { id: 'avaliacao-psicologica-transito-contran-2026', name: 'Atuar como perito examinador em avaliação psicológica no trânsito', persona: 'psicologos', steps: 9 },
  { id: 'implementar-nr1-em-empresa', name: 'Implementar NR-1 em empresa', persona: 'rh', steps: 9 },
  { id: 'construir-programa-bem-estar', name: 'Construir programa de bem-estar evidence-based', persona: 'rh', steps: 9 },
  { id: 'retorno-ao-trabalho-pos-burnout', name: 'Retorno ao trabalho pós-burnout', persona: 'psicologos', steps: 9 },
  { id: 'avaliacao-tea-adulto', name: 'Conduzir avaliação de TEA em adulto', persona: 'psicologos', steps: 9 },
  { id: 'escolher-supervisor-clinico', name: 'Escolher supervisor clínico', persona: 'psicologos', steps: 8 },
  { id: 'uso-etico-ia-clinica', name: 'Uso ético de IA generativa na clínica', persona: 'psicologos', steps: 9 },
  { id: 'avaliacao-tdah-adulto', name: 'Conduzir avaliação de TDAH em adulto', persona: 'psicologos', steps: 9 },
  { id: 'conduzir-supervisao-stepped-care', name: 'Conduzir supervisão clínica em stepped-care', persona: 'psicologos', steps: 9 },
  { id: 'protocolo-act-burnout-saude', name: 'Aplicar protocolo ACT de 8 sessões para burnout', persona: 'psicologos', steps: 9 },
  { id: 'integracao-ia-psicodiagnostico-clinica', name: 'Integrar IA generativa no psicodiagnóstico clínico', persona: 'psicologos', steps: 9 },
  { id: 'atendimento-primeiro-episodio-psicose', name: 'Conduzir primeiro atendimento em primeiro episódio psicótico', persona: 'psicologos', steps: 9 },
  { id: 'avaliacao-saude-mental-perinatal', name: 'Avaliar saúde mental perinatal com método', persona: 'psicologos', steps: 9 },
  { id: 'avaliacao-tdah-mulheres-adultas', name: 'Conduzir avaliação de TDAH em mulher adulta', persona: 'psicologos', steps: 9 },
  { id: 'manejo-trauma-complexo-cptsd', name: 'Manejar trauma complexo (CPTSD/TEPT-C) em adulto', persona: 'psicologos', steps: 9 },
  { id: 'intervencao-crise-suicida-zero-suicide', name: 'Conduzir intervenção em crise suicida (Zero Suicide)', persona: 'psicologos', steps: 9 },
  { id: 'neuropsi-long-covid-brain-fog', name: 'Avaliar neuropsicologia em long COVID e brain fog', persona: 'psicologos', steps: 9 }
] as const;

export const FAQS_DEEP = [
  { id: 'transtorno-do-jogo-apostas-faq', name: 'Transtorno do jogo e apostas online', qas: 14 },
  { id: 'insonia-tcc-i-faq', name: 'Insônia crônica e TCC-I', qas: 14 },
  { id: 'dor-cronica-psicologia-faq', name: 'Dor crônica e psicologia', qas: 14 },
  { id: 'avaliacao-psicologica-transito-faq', name: 'Avaliação psicológica no trânsito', qas: 14 },
  { id: 'nr1-faq', name: 'NR-1 e riscos psicossociais', qas: 14 },
  { id: 'mba-vs-especializacao-faq', name: 'MBA vs especialização', qas: 14 },
  { id: 'carreira-psicologo-organizacional-faq', name: 'Carreira em Psicologia Organizacional', qas: 13 },
  { id: 'avaliacao-psicologica-laudos-faq', name: 'Avaliação psicológica e laudos', qas: 14 },
  { id: 'regulacao-cfp-faq', name: 'Regulação CFP/CRP', qas: 13 },
  { id: 'ia-em-psicologia-faq', name: 'IA em Psicologia', qas: 14 },
  { id: 'tea-adulto-faq', name: 'TEA em adulto — diagnóstico tardio e apresentação feminina', qas: 17 },
  { id: 'tdah-adulto-faq', name: 'TDAH em adulto — rastreio, diferenciais e laudo', qas: 17 },
  { id: 'burnout-cid11-faq', name: 'Burnout como CID-11 (QD85) e NR-1 2024', qas: 17 },
  { id: 'primeiro-episodio-psicose-faq', name: 'Primeiro episódio psicótico — DUP, CAPS e EIP', qas: 17 },
  { id: 'saude-mental-perinatal-faq', name: 'Saúde mental perinatal — depressão e ansiedade pós-parto', qas: 17 },
  { id: 'neurodiversidade-trabalho-faq', name: 'Neurodiversidade no trabalho — LBI e adaptações razoáveis', qas: 17 },
  { id: 'tdah-mulheres-adultas-faq', name: 'TDAH em mulher adulta — apresentação feminina e hormonal', qas: 17 },
  { id: 'trauma-complexo-cptsd-faq', name: 'Trauma complexo (CPTSD/TEPT-C) — CID-11 6B41 e fases STAIR', qas: 17 },
  { id: 'adolescencia-digital-saude-mental-faq', name: 'Adolescência digital — smartphones, redes sociais e Anxious Generation', qas: 17 },
  { id: 'long-covid-saude-mental-faq', name: 'Long COVID e saúde mental — brain fog e reabilitação cognitiva', qas: 17 },
  { id: 'prevencao-suicidio-faq', name: 'Prevenção de suicídio — Zero Suicide, C-SSRS e Safety Planning', qas: 17 }
] as const;

export const GLOSSARIO_CLUSTERS = [
  { id: 'regulacao', name: 'Regulação · CFP, MEC, NR-1, LGPD' },
  { id: 'instrumentos', name: 'Instrumentos · WAIS, MMPI, EPDS, ADOS-2' },
  { id: 'metodos-terapeuticos', name: 'Métodos terapêuticos · TCC, ACT, DBT, EMDR' },
  { id: 'conceitos-pot', name: 'Conceitos POT · Schein, Edmondson, JD-R' },
  { id: 'conceitos-neuro', name: 'Conceitos Neuro · Lezak, Damásio, plasticidade' }
] as const;

export const INTERVENCOES = [
  { id: 'stepped-care', name: 'Stepped Care · cuidado escalonado', evidence: 'NICE A', context: 'Depressão/ansiedade leve-moderada' },
  { id: 'iapt-nhs', name: 'IAPT · NHS Talking Therapies', evidence: 'NHS validado em larga escala', context: 'Inglaterra, modelo de acesso' },
  { id: 'atencao-primaria-matriciamento', name: 'Atenção primária · matriciamento', evidence: 'PNAB 2017 · RAPS', context: 'Brasil, SUS, eMulti, CAPS' },
  { id: 'intervencao-crise', name: 'Intervenção em crise e suicidalidade', evidence: 'OMS mhGAP · SAMU/CAPS', context: 'Emergência psicossocial' },
  { id: 'retorno-ao-trabalho', name: 'Retorno ao trabalho pós-afastamento', evidence: 'OMS 2022 · Cochrane', context: 'Pós-licença saúde mental, NR-1' },
  { id: 'reducao-de-danos', name: 'Redução de danos', evidence: 'Guia do Ministério da Saúde 2026', context: 'RAPS, CAPS AD, atenção primária' },
  { id: 'prevencao-de-recaida', name: 'Prevenção de recaída', evidence: 'Grant e colegas 2017', context: 'Manutenção após tratamento' },
  { id: 'cuidados-paliativos-e-fim-de-vida', name: 'Cuidados paliativos e fim de vida', evidence: 'Portaria GM/MS 3.681/2024', context: 'Oncologia e doença ameaçadora da vida' }
] as const;

export const TEMAS_EMERGENTES_2025_2026 = [
  { id: 'fadiga-digital', name: 'Fadiga digital e tecnostress', area: 'psicologia-organizacional-trabalho' },
  { id: 'climate-anxiety', name: 'Ansiedade climática e eco-luto', area: 'saude-mental-organizacoes' },
  { id: 'ia-generativa-rh', name: 'IA generativa em RH', area: 'ia-people-analytics-psicologia-digital' },
  { id: 'gen-z-burnout', name: 'Burnout Gen Z', area: 'saude-mental-organizacoes' },
  { id: 'longevidade-no-trabalho', name: 'Longevidade no trabalho · carreira 60 anos', area: 'psicologia-organizacional-trabalho' },
  { id: 'neurodiversidade-corporativa', name: 'Neurodiversidade corporativa', area: 'psicologia-organizacional-trabalho' },
  { id: 'lideranca-toxica', name: 'Liderança tóxica · abusive supervision', area: 'psicologia-organizacional-trabalho' },
  { id: 'saude-mental-trabalho-remoto', name: 'Saúde mental no trabalho remoto', area: 'psicologia-organizacional-trabalho' }
] as const;

export const NAV_MENUS = {
  guia: [
    { label: 'O que é pós-graduação em Psicologia', href: '/regulacao' },
    { label: 'MBA vs Especialização', href: '/regulacao' },
    { label: 'Lato sensu vs Stricto sensu', href: '/regulacao' },
    { label: 'Áreas reconhecidas (CFP)', href: '/regulacao#cfp' },
    { label: 'Como escolher uma pós', href: '/regulacao' }
  ],
  mbas: MBAS.map(m => ({ label: m.shortName, href: `/mbas#${m.id}` })),
  areas: AREAS.map(a => ({ label: a.short, fullLabel: a.name, href: `/areas/${a.id}`, cluster: a.cluster })),
  metodos: METODOS.map(m => ({ label: m.name, href: `/metodos/${m.id}` })),
  evidencias: EVIDENCIAS.map(e => ({ label: e.name, href: `/evidencias/${e.id}` })),
  casos: CASOS.map(c => ({ label: c.name, href: `/casos/${c.id}` })),
  intervencoes: INTERVENCOES.map(i => ({ label: i.name, href: `/intervencoes/${i.id}` }))
};
