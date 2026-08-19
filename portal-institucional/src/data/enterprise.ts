/**
 * IPOG Enterprise: educação corporativa.
 *
 * Fontes:
 *  - ipog.edu.br/enterprise, consultada em 19 de agosto de 2026
 *  - Playbook de Vendas B2B v1.0 (2026), páginas de Produtos
 *
 * O playbook é documento interno de vendas e traz também estratégia de preços,
 * análise de concorrência, dimensionamento de mercado e metas de comissão.
 * Nada disso entra aqui: este arquivo reúne apenas o que descreve a oferta ao
 * público, que é o que faz sentido publicar em um portal aberto.
 */

export const enterprise = {
  nome: "IPOG Enterprise",
  /** Resposta direta à pergunta "o que é o IPOG Enterprise?". */
  definicao:
    "O IPOG Enterprise é a frente de educação corporativa do IPOG. Ela leva a metodologia aplicada da instituição para dentro das empresas, com conteúdo customizado e horários ajustados à rotina de trabalho de cada organização.",
  promessa:
    "Mais que uma solução de educação corporativa, um parceiro estratégico de negócio.",
  /**
   * Regra de flexibilidade declarada pelo site: não existe catálogo fechado
   * de Enterprise, qualquer curso do IPOG pode virar um programa corporativo.
   */
  flexibilidade:
    "Qualquer curso do portfólio do IPOG pode ser convertido em programa Enterprise, com conteúdo customizado e carga horária ajustada.",
} as const;

export type FormatoEnterprise = {
  nome: string;
  descricao: string;
  quandoUsar: string;
};

/** Formatos de entrega da educação corporativa, do mais curto ao mais longo. */
export const formatosEnterprise: FormatoEnterprise[] = [
  {
    nome: "Palestras",
    descricao:
      "Encontros pontuais sobre um tema específico, conduzidos por um especialista da área.",
    quandoUsar:
      "Indicado para sensibilizar uma equipe grande, abrir um ciclo de treinamento ou marcar uma data institucional.",
  },
  {
    nome: "CAP — Curso de Aperfeiçoamento Profissional",
    descricao:
      "Formação curta e prática, focada em uma competência definida, com aplicação imediata no trabalho.",
    quandoUsar:
      "Indicado quando a empresa precisa fechar uma lacuna técnica pontual em prazo curto.",
  },
  {
    nome: "Programas de Desenvolvimento",
    descricao:
      "Trilhas de capacitação modulares, desenhadas para desenvolver um perfil profissional ao longo de vários módulos.",
    quandoUsar:
      "Indicado para formar lideranças, times comerciais ou áreas inteiras de forma estruturada.",
  },
  {
    nome: "MBA e Pós-Graduação",
    descricao:
      "Pós-graduação lato sensu ofertada para um grupo fechado de colaboradores da mesma empresa.",
    quandoUsar:
      "Indicado quando a organização quer titulação formal reconhecida pelo MEC para o time.",
  },
];

/** Modalidades em que os programas corporativos são entregues. */
export const modalidadesEnterprise = [
  "Presencial",
  "Online síncrono",
  "EaD",
] as const;

export type Trilha = {
  numero: number;
  nome: string;
  /** Frase objetiva sobre o resultado que a trilha busca, escrita para citação. */
  foco: string;
  modulos: string[];
};

/**
 * Trilhas de capacitação do Enterprise.
 *
 * São 12 trilhas de 6 módulos cada, organizadas em torno de alta performance.
 * Os nomes e módulos vêm do Playbook de Vendas B2B v1.0.
 */
export const trilhasDeCapacitacao: Trilha[] = [
  {
    numero: 1,
    nome: "Liderança Essencial: formação de supervisores e coordenadores",
    foco: "Preparar quem acabou de assumir liderança para deixar de executar e passar a conduzir equipe.",
    modulos: [
      "Transição para o papel de liderança, do fazer ao liderar",
      "Gestão de pessoas e resultados: delegação, feedback e acompanhamento",
      "Confiança, comunicação, escuta e influência",
      "Autogestão, prioridades, tempo e energia",
      "Fundamentos das virtudes humanas na liderança operacional, parte 1",
      "Aplicação das virtudes humanas na liderança operacional, parte 2",
    ],
  },
  {
    numero: 2,
    nome: "Liderança Estratégica: gestão de gerentes de alta performance",
    foco: "Desenvolver quem lidera outros líderes, ampliando o impacto da gestão sobre várias equipes.",
    modulos: [
      "A transição para a liderança de líderes, multiplicando o impacto",
      "Desafios e impactos da liderança nas equipes",
      "Liderança transformadora: gestão de mudanças e aprendizagem organizacional",
      "Comunicação interpessoal efetiva com inteligência emocional",
      "Fundamentos das virtudes humanas na liderança de equipes",
      "Aplicação das virtudes humanas na liderança de equipes",
    ],
  },
  {
    numero: 3,
    nome: "A Nova Liderança Comunicadora: influência, conexão e resultado",
    foco: "Usar a comunicação do líder como ferramenta de mudança de comportamento e de desempenho do time.",
    modulos: [
      "Comunicação e autoconhecimento: princípios do líder estratégico",
      "Comunicação estratégica: da informação à mudança de comportamento",
      "Comunicação honesta: da confiança à segurança psicológica",
      "Melhorando o desempenho: do feedback ao feedforward",
      "Liderança situacional e delegação efetiva",
      "Comunicação e oratória influente para líderes",
    ],
  },
  {
    numero: 4,
    nome: "Power Skills: competências humanas para alta performance",
    foco: "Desenvolver as competências comportamentais que sustentam produtividade e convivência no trabalho.",
    modulos: [
      "Cultura organizacional: valores, propósito e comportamento empresarial",
      "Inteligência emocional, autoconhecimento e protagonismo",
      "Comunicação estratégica, feedback e gestão de conflitos",
      "Gestão do tempo e ferramentas de produtividade",
      "Fundamentos de gestão de projetos",
      "Mentalidade de inovação e adaptabilidade",
    ],
  },
  {
    numero: 5,
    nome: "Inteligência Financeira para profissionais e líderes",
    foco: "Conectar saúde financeira pessoal a desempenho no trabalho, reduzindo o estresse financeiro do time.",
    modulos: [
      "Organização financeira e orçamento inteligente",
      "Caminhos do investimento consciente",
      "Educação financeira e planejamento de vida",
      "Consumo consciente e controle de dívidas",
      "Finanças comportamentais na prática",
      "Finanças pessoais e performance no trabalho",
    ],
  },
  {
    numero: 6,
    nome: "Alta Performance Organizacional com Inteligência Artificial",
    foco: "Levar inteligência artificial aplicada a cada departamento, do jurídico ao comercial.",
    modulos: [
      "Inteligência artificial para o departamento jurídico",
      "Inteligência artificial para as demandas administrativas",
      "Inteligência artificial para o departamento financeiro",
      "Inteligência artificial para a equipe comercial",
      "Inteligência artificial para a equipe de marketing",
      "Inteligência artificial para a equipe de recursos humanos",
    ],
  },
  {
    numero: 7,
    nome: "Data Skills: Excel, Power BI e tomada de decisão com dados",
    foco: "Formar profissionais capazes de analisar dados e construir os próprios painéis gerenciais.",
    modulos: [
      "Fundamentos da análise de dados",
      "Excel aplicado, nível básico",
      "Excel intermediário",
      "Excel avançado",
      "Power BI, back end",
      "Power BI, front end",
    ],
  },
  {
    numero: 8,
    nome: "Venda com Influência: técnicas avançadas de conversão e persuasão",
    foco: "Elevar a taxa de conversão do time comercial com método de abordagem, persuasão e fechamento.",
    modulos: [
      "Fundamentos da venda moderna: atitude, comunicação e perfil de alta performance",
      "Conexão com o cliente: rapport, escuta ativa e leitura de perfil",
      "Técnicas de persuasão e neurovendas",
      "Apresentação de soluções e storytelling",
      "Contorno de objeções e negociação com inteligência emocional",
      "Fechamento, pós-venda e mentalidade campeã",
    ],
  },
  {
    numero: 9,
    nome: "Gestão Comercial de Alta Performance: estratégia, time e resultado",
    foco: "Preparar o gestor comercial para conduzir funil, indicadores e desenvolvimento do time de vendas.",
    modulos: [
      "O novo papel do gestor comercial: liderança, propósito e performance",
      "Funil de vendas gerencial: visão estratégica e controle de indicadores",
      "Neurovendas para líderes: influência sobre equipe e cliente",
      "Técnicas de reunião comercial e feedback de alta performance",
      "Formação e desenvolvimento de equipes comerciais",
      "Liderança comercial de alta performance: cultura, rituais e mentalidade de resultado",
    ],
  },
  {
    numero: 10,
    nome: "CX Estratégico: do atendimento à experiência memorável",
    foco: "Transformar atendimento em experiência que gera recompra e indicação.",
    modulos: [
      "Fundamentos de CX na era digital",
      "Comunicação aplicada à experiência do cliente",
      "Princípios de neurociência do encantamento do cliente",
      "Cases de sucesso em CX e modelagem da jornada",
      "Inteligência emocional para atender clientes desafiadores",
      "Encantar para vender: a experiência que gera resultados",
    ],
  },
  {
    numero: 11,
    nome: "Finanças para Líderes: decisão, valor e resultado",
    foco: "Dar ao gestor não financeiro a linguagem e os indicadores para decidir com base em número.",
    modulos: [
      "Fundamentos da linguagem financeira",
      "Indicadores financeiros e análise de performance",
      "Gestão de custos e precificação estratégica",
      "Orçamento empresarial e controle gerencial",
      "Fluxo de caixa e capital de giro",
      "Finanças estratégicas: avaliação de projetos e tomada de decisão",
    ],
  },
  {
    numero: 12,
    nome: "IA Estratégica: governança de dados, valor e maturidade empresarial",
    foco: "Estruturar a adoção de inteligência artificial na organização, da maturidade à governança e ao retorno.",
    modulos: [
      "Fundamentos de IA e transformação estratégica",
      "Maturidade digital e diagnóstico organizacional",
      "Aplicações práticas, prompt engineering e agentes de IA",
      "Arquitetura e implementação de agentes inteligentes",
      "Governança, ética e riscos de IA",
      "ROI, sustentabilidade sistêmica e escalabilidade",
    ],
  },
];

/** Total de módulos do catálogo de trilhas, calculado a partir dos dados. */
export const totalDeModulos = trilhasDeCapacitacao.reduce(
  (total, trilha) => total + trilha.modulos.length,
  0,
);

/**
 * Perfil de empresa atendida.
 *
 * O playbook detalha porte e setor conforme as classificações do IBGE e do
 * SEBRAE. Aqui a descrição fica no nível que interessa a quem consulta de fora:
 * o Enterprise não é restrito a um porte ou setor.
 */
export const publicoEnterprise = {
  porte:
    "Empresas de todos os portes, do microempreendedor individual à grande empresa, conforme a classificação de receita do SEBRAE.",
  setores:
    "Organizações dos setores primário, secundário e terciário, incluindo indústria, construção civil, comércio, saúde, serviços financeiros, tecnologia, administração pública e cooperativas.",
  decisores:
    "A conversa costuma envolver quem responde por recursos humanos, treinamento e desenvolvimento, ou a diretoria que patrocina a capacitação da equipe.",
} as const;
