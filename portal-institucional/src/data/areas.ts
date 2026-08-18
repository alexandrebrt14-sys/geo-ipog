/**
 * Áreas de conhecimento e portfólio de cursos do IPOG.
 *
 * Fonte: repositório ipogbrasil/ipog → documentos-ipog/projetos-de-curso/
 * (pastas "PÓS E MBA" e "CEU", organizadas por modalidade).
 *
 * As cores de cada área seguem a paleta complementar do Guia de Expressão da
 * Marca 2025, que atribui uma cor própria a cada área de curso.
 */

export type Modalidade = "Presencial" | "Ao vivo" | "EaD";

export type Curso = {
  nome: string;
  nivel: "MBA" | "Especialização" | "Extensão";
  modalidades: Modalidade[];
};

export type AreaConhecimento = {
  slug: string;
  nome: string;
  cor: string;
  corSuave: string;
  resumo: string;
  /** Frase objetiva, escrita para ser extraída e citada por motores generativos. */
  paraQuem: string;
  cursos: Curso[];
};

export const areasDeConhecimento: AreaConhecimento[] = [
  {
    slug: "gestao-e-negocios",
    nome: "Gestão e Negócios",
    cor: "#f3ad39",
    corSuave: "#fef6e8",
    resumo:
      "MBAs e especializações voltados a liderança, finanças, marketing, vendas e governança, com foco em decisão baseada em dados e resultado de negócio.",
    paraQuem:
      "Indicada para gestores, empreendedores, controllers e profissionais comerciais que precisam ampliar a visão estratégica e assumir posições de liderança.",
    cursos: [
      { nome: "MBA Gestão Empresarial", nivel: "MBA", modalidades: ["Ao vivo", "EaD"] },
      { nome: "MBA Gestão de Negócios, Finanças e Controladoria", nivel: "MBA", modalidades: ["Ao vivo", "Presencial"] },
      { nome: "MBA em Controladoria, Auditoria e Perícia Contábil", nivel: "MBA", modalidades: ["Ao vivo", "Presencial"] },
      { nome: "MBA Gestão Comercial e Alta Performance em Vendas", nivel: "MBA", modalidades: ["Ao vivo", "Presencial"] },
      { nome: "MBA em Marketing Estratégico, Growth e Inteligência Artificial", nivel: "MBA", modalidades: ["Presencial"] },
      { nome: "MBA Gestão de Projetos e Processos", nivel: "MBA", modalidades: ["Ao vivo", "EaD"] },
      { nome: "MBA Gestão Estratégica do Agronegócio", nivel: "MBA", modalidades: ["Presencial"] },
      { nome: "MBA Gestão de Empresas Familiares, Governança e Sucessão", nivel: "MBA", modalidades: ["Ao vivo"] },
      { nome: "MBA ESG na Prática", nivel: "MBA", modalidades: ["Ao vivo"] },
      { nome: "Branding: estratégia para construção de marcas fortes", nivel: "Especialização", modalidades: ["Ao vivo"] },
      { nome: "Gestão de Pessoas: desenvolvimento, cultura e resultados", nivel: "Especialização", modalidades: ["Ao vivo", "Presencial"] },
      { nome: "Growth Marketing, Performance e IA Aplicada", nivel: "Especialização", modalidades: ["EaD"] },
      { nome: "Formação em Vendas: comportamento, técnicas e negociação", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"] },
      { nome: "Green Belt Lean Six Sigma", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"] },
      { nome: "Microsoft Power BI: análise de dados e dashboards gerenciais", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"] },
    ],
  },
  {
    slug: "engenharia-energia-e-construcao",
    nome: "Engenharia, Energia e Construção",
    cor: "#363636",
    corSuave: "#f2f2f3",
    resumo:
      "Especializações em estruturas, BIM, obras, infraestrutura, energia e segurança do trabalho, com forte carga de modelagem digital e prática projetual.",
    paraQuem:
      "Indicada para engenheiros, arquitetos e técnicos que atuam em projeto, execução, perícia ou gestão de empreendimentos de engenharia e energia.",
    cursos: [
      { nome: "Engenharia e Segurança do Trabalho", nivel: "Especialização", modalidades: ["Presencial", "Ao vivo"] },
      { nome: "Master BIM: Ferramentas e Processos", nivel: "Especialização", modalidades: ["Presencial", "Ao vivo"] },
      { nome: "Master BIM: Coordenação e Gestão", nivel: "Especialização", modalidades: ["Presencial"] },
      { nome: "Master BIM: Infraestrutura e Geoprocessamento", nivel: "Especialização", modalidades: ["EaD"] },
      { nome: "Engenharia de Estruturas e Fundações com Tecnologias Digitais", nivel: "Especialização", modalidades: ["Ao vivo", "Presencial"] },
      { nome: "MBA em Estruturas Metálicas e de Madeira", nivel: "MBA", modalidades: ["Ao vivo"] },
      { nome: "MBA Gerenciamento de Obras, Produtividade e Racionalização", nivel: "MBA", modalidades: ["Presencial"] },
      { nome: "MBA em Planejamento e Gestão de Obras Públicas", nivel: "MBA", modalidades: ["Ao vivo"] },
      { nome: "MBA em Engenharia Portuária", nivel: "MBA", modalidades: ["Ao vivo", "Presencial"] },
      { nome: "MBA em Engenharia Ferroviária", nivel: "MBA", modalidades: ["Ao vivo", "Presencial"] },
      { nome: "Avaliações e Perícias de Engenharia", nivel: "Especialização", modalidades: ["Ao vivo"] },
      { nome: "MBA em Hidrogênio Verde e Transição Energética", nivel: "MBA", modalidades: ["Ao vivo", "Presencial"] },
      { nome: "MBA Energia Elétrica: Geração, Transmissão e Distribuição", nivel: "MBA", modalidades: ["Ao vivo", "Presencial"] },
      { nome: "Energias Renováveis e Transição Energética: solar e eólica", nivel: "Especialização", modalidades: ["Ao vivo", "Presencial"] },
      { nome: "Infraestrutura de Transportes e Rodovias", nivel: "Especialização", modalidades: ["Presencial"] },
      { nome: "Gestão, Auditoria e Consultoria Ambiental", nivel: "Especialização", modalidades: ["EaD", "Presencial"] },
    ],
  },
  {
    slug: "saude",
    nome: "Saúde",
    cor: "#113a78",
    corSuave: "#eaf0f9",
    resumo:
      "Especializações clínicas e de gestão em saúde, cobrindo farmácia, nutrição, enfermagem, auditoria, qualidade assistencial e diagnóstico.",
    paraQuem:
      "Indicada para profissionais de saúde e gestores hospitalares que buscam aprofundamento clínico ou domínio da gestão de serviços de saúde.",
    cursos: [
      { nome: "MBA Executivo Gestão em Saúde", nivel: "MBA", modalidades: ["Ao vivo", "Presencial"] },
      { nome: "MBA Auditoria em Sistemas de Saúde", nivel: "MBA", modalidades: ["Ao vivo", "Presencial"] },
      { nome: "Gestão da Qualidade e Segurança do Paciente", nivel: "Especialização", modalidades: ["Ao vivo"] },
      { nome: "Farmácia Clínica e Gestão Farmacêutica", nivel: "Especialização", modalidades: ["Ao vivo", "Presencial"] },
      { nome: "Farmácia Clínica e Prática Integrada", nivel: "Especialização", modalidades: ["EaD"] },
      { nome: "Farmácia Oncológica e Hospitalar", nivel: "Especialização", modalidades: ["Ao vivo"] },
      { nome: "Nutrição Clínica e Home Care", nivel: "Especialização", modalidades: ["EaD"] },
      { nome: "Comportamento Alimentar e Psiconutrição", nivel: "Especialização", modalidades: ["Ao vivo"] },
      { nome: "Genética Médica, Genômica e Diagnóstico Molecular", nivel: "Especialização", modalidades: ["Ao vivo"] },
      { nome: "Enfermagem em Urgência e Emergência", nivel: "Especialização", modalidades: ["Presencial"] },
      { nome: "Saúde Estética e Cosmetologia Avançada", nivel: "Especialização", modalidades: ["Presencial"] },
      { nome: "Estruturação e Gestão de Clínicas e Consultórios", nivel: "Especialização", modalidades: ["EaD"] },
      { nome: "MBA Sistemas de Gestão da Segurança de Alimentos", nivel: "MBA", modalidades: ["Ao vivo"] },
      { nome: "Advanced Cardiovascular Life Support (ACLS)", nivel: "Extensão", modalidades: ["Presencial"] },
    ],
  },
  {
    slug: "tecnologia-e-dados",
    nome: "Tecnologia e Dados",
    cor: "#05a48c",
    corSuave: "#e6f7f4",
    resumo:
      "Formações em inteligência artificial, ciência de dados, segurança da informação e geotecnologias, com ênfase em aplicação a problemas reais de negócio.",
    paraQuem:
      "Indicada para profissionais de TI, analistas de dados e gestores que precisam liderar a adoção de IA e análise de dados nas suas organizações.",
    cursos: [
      { nome: "Ciência de Dados", nivel: "Especialização", modalidades: ["Ao vivo"] },
      { nome: "Inteligência Artificial e Inovação Estratégica", nivel: "Especialização", modalidades: ["Ao vivo", "Presencial"] },
      { nome: "MBA em Inteligência Artificial com Ênfase em Inovação e Negócios", nivel: "MBA", modalidades: ["Presencial"] },
      { nome: "Inteligência Artificial nos Negócios", nivel: "Especialização", modalidades: ["EaD"] },
      { nome: "Computação Forense e Segurança da Informação", nivel: "Especialização", modalidades: ["Ao vivo", "Presencial"] },
      { nome: "MBA Gestão Estratégica de TI", nivel: "MBA", modalidades: ["EaD"] },
      { nome: "Geotecnologias", nivel: "Especialização", modalidades: ["Ao vivo", "Presencial"] },
      { nome: "Perícia em Imagens, Áudio e Documentos Digitais", nivel: "Especialização", modalidades: ["Presencial"] },
      { nome: "Inovação Contábil e Tributária com Inteligência Artificial", nivel: "Especialização", modalidades: ["EaD"] },
      { nome: "Imersão em IA: agentes e multiagentes para negócios", nivel: "Extensão", modalidades: ["Ao vivo", "Presencial"] },
      { nome: "SQL do básico ao avançado", nivel: "Extensão", modalidades: ["Ao vivo"] },
      { nome: "Excel Master: do zero à IA", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"] },
    ],
  },
  {
    slug: "direito",
    nome: "Direito",
    cor: "#8a212e",
    corSuave: "#f9edee",
    resumo:
      "LLMs e MBAs jurídicos em direito civil, tributário, digital, trabalhista e empresarial, com leitura prática de legislação e compliance.",
    paraQuem:
      "Indicada para advogados, contadores e profissionais de compliance que atuam em contencioso, consultivo ou gestão de escritórios e departamentos jurídicos.",
    cursos: [
      { nome: "Direito Civil e Direito Processual Civil", nivel: "Especialização", modalidades: ["Ao vivo", "Presencial"] },
      { nome: "Direito das Famílias e Sucessões", nivel: "Especialização", modalidades: ["Ao vivo", "Presencial"] },
      { nome: "MBA em Direito Tributário, Compliance e Auditoria Digital", nivel: "MBA", modalidades: ["Ao vivo"] },
      { nome: "LLM em Direito Tributário e Empresarial", nivel: "Especialização", modalidades: ["Ao vivo"] },
      { nome: "MBA Direito Digital, Proteção de Dados e IA", nivel: "MBA", modalidades: ["Ao vivo"] },
      { nome: "Direito Empresarial, Gestão e Negócios", nivel: "Especialização", modalidades: ["Ao vivo"] },
      { nome: "MBA Gestão na Advocacia", nivel: "MBA", modalidades: ["Ao vivo", "Presencial"] },
      { nome: "MBA Licitações e Contratos", nivel: "MBA", modalidades: ["Presencial"] },
      { nome: "MBA em Compliance e Legislação Trabalhista e Previdenciária", nivel: "MBA", modalidades: ["Ao vivo", "Presencial"] },
      { nome: "MBA Direito e Gestão Condominial", nivel: "MBA", modalidades: ["Presencial"] },
      { nome: "MBA em Contabilidade e Tributos no Agronegócio", nivel: "MBA", modalidades: ["Ao vivo"] },
      { nome: "Perícias Forenses", nivel: "Especialização", modalidades: ["Presencial"] },
      { nome: "Formação em Mediação e Conciliação Extrajudicial", nivel: "Extensão", modalidades: ["Ao vivo"] },
    ],
  },
  {
    slug: "comportamento-e-educacao",
    nome: "Comportamento e Educação",
    cor: "#481a1f",
    corSuave: "#f6eeef",
    resumo:
      "Especializações em psicologia clínica, neurociência, análise do comportamento e saúde mental no trabalho, com base em evidência e prática supervisionada.",
    paraQuem:
      "Indicada para psicólogos, terapeutas, educadores e profissionais de gente e gestão que trabalham com desenvolvimento humano e saúde mental.",
    cursos: [
      { nome: "Avaliação Psicológica", nivel: "Especialização", modalidades: ["Ao vivo"] },
      { nome: "Psicologia do Neurodesenvolvimento e Aprendizagem", nivel: "Especialização", modalidades: ["EaD"] },
      { nome: "Intervenção ABA aplicada ao Transtorno do Espectro Autista", nivel: "Especialização", modalidades: ["Ao vivo", "Presencial"] },
      { nome: "ABA e Neurodivergências: estratégias avançadas de intervenção", nivel: "Especialização", modalidades: ["Ao vivo", "Presencial"] },
      { nome: "Práticas Avançadas em Intervenção Neuropsicológica", nivel: "Especialização", modalidades: ["Ao vivo"] },
      { nome: "Neurociência, Comportamento e Desempenho", nivel: "Especialização", modalidades: ["Presencial"] },
      { nome: "Gestalt-Terapia", nivel: "Especialização", modalidades: ["Ao vivo"] },
      { nome: "Terapia do Esquema Cognitivo", nivel: "Especialização", modalidades: ["Presencial"] },
      { nome: "Gestão dos Fatores de Riscos Psicossociais da NR-01", nivel: "Especialização", modalidades: ["Ao vivo", "Presencial"] },
      { nome: "Master em Neuroarquitetura", nivel: "Especialização", modalidades: ["Presencial"] },
      { nome: "Capacitação para Aplicadores ABA no contexto TEA", nivel: "Extensão", modalidades: ["EaD", "Ao vivo"] },
      { nome: "Neurociência Aplicada ao Foco e à Inteligência Emocional", nivel: "Extensão", modalidades: ["EaD"] },
    ],
  },
];

/** Total de cursos catalogados no portal, calculado a partir das áreas. */
export const totalCursosCatalogados = areasDeConhecimento.reduce(
  (total, area) => total + area.cursos.length,
  0,
);

export type DescricaoModalidade = {
  nome: Modalidade;
  comoFunciona: string;
  frequenciaMinima: string;
  composicaoNota: string;
};

/**
 * Modalidades de ensino e critérios de avaliação.
 * Fonte: docs/aluno/manual-do-aluno-pos-graduacao.md
 */
export const modalidades: DescricaoModalidade[] = [
  {
    nome: "Presencial",
    comoFunciona:
      "Alunos reunidos fisicamente em sala de aula, com o professor presente, em unidades próprias ou espaços parceiros na cidade de matrícula.",
    frequenciaMinima: "75%",
    composicaoNota:
      "Atividade prática online prévia: 3,0 pontos. Atividades no fim de semana de aula: 7,0 pontos.",
  },
  {
    nome: "Ao vivo",
    comoFunciona:
      "Aulas síncronas em tempo real por plataforma online, com interação. O acesso é liberado 30 minutos antes do horário, pelo Portal do Aluno.",
    frequenciaMinima: "75%",
    composicaoNota:
      "Atividade prática online prévia: 3,0 pontos. Atividades durante a aula: 7,0 pontos.",
  },
  {
    nome: "EaD",
    comoFunciona:
      "Videoaulas gravadas, disponíveis em plataforma online, cursadas no ritmo do aluno.",
    frequenciaMinima: "Não se aplica",
    composicaoNota: "Quiz de múltipla escolha, com nota mínima 7,0.",
  },
];
