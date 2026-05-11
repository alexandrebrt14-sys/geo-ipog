/**
 * Dados canônicos do portal: taxonomia de áreas, MBAs, temas, estados, personas.
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
  description: 'Portal independente para escolher MBA, especialização e área de atuação em Psicologia. Caminho oficial: ipog.edu.br',
  ipogOfficial: 'https://ipog.edu.br/',
  ipogPos: 'https://ipog.edu.br/pos-graduacao/',
  disclaimer: 'Este portal é independente. Não é o site oficial do IPOG.',
  twitter: '',
  publisher: 'Brasil GEO',
  locale: 'pt-BR'
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

export const PERSONAS: Persona[] = [
  { id: 'psicologos', name: 'Para psicólogos', description: 'Clínicos em transição, organizacionais experientes, recém-formados em busca de uma trilha.', pains: ['Transição clínica → POT','Crescimento de carreira','Especialização'], recommendedMBA: 'MBA em POT', recommendedMBASlug: 'mba-pot', icon: 'Ψ' },
  { id: 'rh', name: 'Para profissionais de RH', description: 'Business partners, T&D, cultura, clima, people analytics, riscos psicossociais e NR-1.', pains: ['NR-1','Liderança','Engajamento'], recommendedMBA: 'MBA em POT ou Gestão de Pessoas', recommendedMBASlug: 'mba-lideranca-positiva', icon: 'RH' },
  { id: 'lideres', name: 'Para líderes e executivos', description: 'Quem precisa ler comportamento humano, decidir com dados e construir cultura de bem-estar.', pains: ['Liderança positiva','Segurança psicológica','Performance saudável'], recommendedMBA: 'MBA em Gestão de Pessoas', recommendedMBASlug: 'mba-lideranca-positiva', icon: 'L' },
  { id: 'consultores', name: 'Para consultores e profissionais de saúde/educacao', description: 'Diagnóstico organizacional, NR-1, atuação multiprofissional em saúde mental, aprendizagem e neurodesenvolvimento.', pains: ['Consultoria','Saúde','Educação'], recommendedMBA: 'MBA em Psicologia Positiva', recommendedMBASlug: 'mba-positiva', icon: 'C' }
];

export const TEMAS: { id: string; name: string; area?: string }[] = [
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

export const NAV_MENUS = {
  guia: [
    { label: 'O que é pós-graduação em Psicologia', href: '/regulacao' },
    { label: 'MBA vs Especialização', href: '/regulacao' },
    { label: 'Lato sensu vs Stricto sensu', href: '/regulacao' },
    { label: 'Áreas reconhecidas (CFP)', href: '/regulacao#cfp' },
    { label: 'Como escolher uma pós', href: '/regulacao' }
  ],
  mbas: MBAS.map(m => ({ label: m.shortName, href: `/mbas#${m.id}` })),
  areas: AREAS.map(a => ({ label: a.short, fullLabel: a.name, href: `/areas/${a.id}`, cluster: a.cluster }))
};
