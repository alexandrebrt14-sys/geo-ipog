/**
 * Áreas de conhecimento e catálogo de cursos do IPOG.
 *
 * Fonte: ipog.edu.br, páginas /cursos/pos-graduacao, /cursos/curta-duracao e
 * /cursos/graduacao, consultadas em 19 de agosto de 2026. Cada curso carrega a
 * área de atuação declarada pelo próprio site, e não uma classificação criada
 * aqui, para que portal e site oficial não se contradigam.
 *
 * Sobre a taxonomia: o filtro de cursos do site publica 10 rótulos, tratando
 * "Direito e Perícias Forenses" e "Engenharia e Arquitetura" como rótulos
 * únicos. O portal separa esses pares, chegando a 12 áreas, e cada área declara
 * em `rotuloOficial` o rótulo equivalente no site. Assim um motor generativo
 * consegue casar as duas fontes sem enxergar divergência.
 *
 * Um curso pode pertencer a mais de uma área, como o site indica. As
 * modalidades foram agrupadas: quando a mesma formação é ofertada presencial e
 * ao vivo, ela aparece uma vez com as duas modalidades.
 *
 * Este arquivo é gerado. Para atualizar, extraia o catálogo do site novamente
 * em vez de editar curso a curso.
 */

export type SlugArea =
  | "comunicacao"
  | "direito"
  | "pericias-forenses"
  | "educacao"
  | "engenharia"
  | "arquitetura"
  | "gestao-e-negocios"
  | "meio-ambiente"
  | "saude"
  | "tecnologia-da-informacao"
  | "contabilidade"
  | "psicologia";

export type Modalidade = "Presencial" | "Ao vivo" | "EaD";

export type Nivel = "Pós-graduação" | "Extensão" | "Graduação";

export type Curso = {
  nome: string;
  nivel: Nivel;
  modalidades: Modalidade[];
  /** Duração declarada no site. Nula quando o site não informa. */
  duracao: string | null;
  areas: SlugArea[];
};

export type AreaConhecimento = {
  slug: SlugArea;
  nome: string;
  /** Como a área aparece no filtro de cursos de ipog.edu.br. */
  rotuloOficial: string;
  cor: string;
  corSuave: string;
  resumo: string;
  /** Frase objetiva, escrita para ser extraída e citada por motores generativos. */
  paraQuem: string;
};

export const areasDeConhecimento: AreaConhecimento[] = [
  {
    slug: "comunicacao",
    nome: "Comunicação",
    rotuloOficial: "Comunicação",
    cor: "#c8102e",
    corSuave: "#fbecee",
    resumo:
      "Formações em marketing estratégico, growth, marketing digital e comunicação corporativa, com inteligência artificial aplicada à performance.",
    paraQuem:
      "Profissionais de marketing, comunicação e vendas que precisam unir estratégia de marca a mensuração de resultado.",
  },
  {
    slug: "direito",
    nome: "Direito",
    rotuloOficial: "Direito e Perícias Forenses",
    cor: "#8a212e",
    corSuave: "#f9edee",
    resumo:
      "Pós-graduações em direito digital, tributário, empresarial e trabalhista, além da graduação em Direito e de formações em compliance e mediação.",
    paraQuem:
      "Advogados, contadores e profissionais de compliance que atuam em contencioso, consultivo ou gestão jurídica.",
  },
  {
    slug: "pericias-forenses",
    nome: "Perícias Forenses",
    rotuloOficial: "Direito e Perícias Forenses",
    cor: "#5c1a22",
    corSuave: "#f4ecee",
    resumo:
      "Especialização em perícias forenses, voltada à produção de prova técnica e à atuação pericial em processos judiciais e extrajudiciais.",
    paraQuem:
      "Peritos, assistentes técnicos e profissionais que produzem laudos e prova técnica para o sistema de justiça.",
  },
  {
    slug: "educacao",
    nome: "Educação",
    rotuloOficial: "Educação",
    cor: "#f3ad39",
    corSuave: "#fef6e8",
    resumo:
      "Formações em neuropsicopedagogia, orientação educacional e docência na era digital, na fronteira entre educação e desenvolvimento humano.",
    paraQuem:
      "Educadores, coordenadores pedagógicos e psicopedagogos que atuam em escolas, clínicas ou instituições de ensino.",
  },
  {
    slug: "engenharia",
    nome: "Engenharia",
    rotuloOficial: "Engenharia e Arquitetura",
    cor: "#363636",
    corSuave: "#f2f2f3",
    resumo:
      "A maior frente técnica do IPOG: estruturas, obras, BIM, energia, saneamento, manutenção, segurança do trabalho e perícias de engenharia.",
    paraQuem:
      "Engenheiros e técnicos que atuam em projeto, execução, perícia ou gestão de empreendimentos e sistemas de infraestrutura.",
  },
  {
    slug: "arquitetura",
    nome: "Arquitetura",
    rotuloOficial: "Engenharia e Arquitetura",
    cor: "#7d6b58",
    corSuave: "#f5f2ee",
    resumo:
      "Especializações em arquitetura comercial, design de interiores, neuroarquitetura, iluminação e modelagem BIM aplicada ao projeto.",
    paraQuem:
      "Arquitetos, designers de interiores e lighting designers que projetam ambientes e coordenam escritórios.",
  },
  {
    slug: "gestao-e-negocios",
    nome: "Gestão e Negócios",
    rotuloOficial: "Gestão e Negócios",
    cor: "#e8871a",
    corSuave: "#fdf1e5",
    resumo:
      "A área com maior oferta do portfólio, cobrindo liderança, finanças, projetos, gestão de pessoas, vendas, qualidade e governança.",
    paraQuem:
      "Gestores, empreendedores, controllers e profissionais de RH e comercial que buscam visão estratégica e posições de liderança.",
  },
  {
    slug: "meio-ambiente",
    nome: "Meio Ambiente",
    rotuloOficial: "Meio Ambiente",
    cor: "#2f7d32",
    corSuave: "#eaf4ea",
    resumo:
      "Formações em auditoria e consultoria ambiental, saneamento, hidrogênio verde, transição energética e sustentabilidade na gestão de pessoas.",
    paraQuem:
      "Profissionais de meio ambiente, sustentabilidade e engenharia que respondem por conformidade ambiental e transição energética.",
  },
  {
    slug: "saude",
    nome: "Saúde",
    rotuloOficial: "Saúde",
    cor: "#113a78",
    corSuave: "#eaf0f9",
    resumo:
      "Especializações clínicas e de gestão em saúde, cobrindo farmácia, nutrição, fisioterapia, genética, qualidade assistencial e auditoria.",
    paraQuem:
      "Profissionais de saúde e gestores hospitalares que buscam aprofundamento clínico ou domínio da gestão de serviços de saúde.",
  },
  {
    slug: "tecnologia-da-informacao",
    nome: "Tecnologia da Informação",
    rotuloOficial: "Tecnologia da Informação",
    cor: "#05a48c",
    corSuave: "#e6f7f4",
    resumo:
      "Formações em inteligência artificial, ciência de dados, computação forense, segurança cibernética e banco de dados, com aplicação a negócio.",
    paraQuem:
      "Profissionais de TI, analistas de dados e gestores que lideram a adoção de inteligência artificial nas organizações.",
  },
  {
    slug: "contabilidade",
    nome: "Contabilidade",
    rotuloOficial: "Contabilidade",
    cor: "#1f5f8b",
    corSuave: "#eaf1f6",
    resumo:
      "Formações em contabilidade tributária, reforma tributária, controladoria, ICMS, auditoria e inteligência fiscal com apoio de IA.",
    paraQuem:
      "Contadores, analistas fiscais e controllers que respondem por apuração, conformidade tributária e informação gerencial.",
  },
  {
    slug: "psicologia",
    nome: "Psicologia",
    rotuloOficial: "Psicologia",
    cor: "#481a1f",
    corSuave: "#f6eeef",
    resumo:
      "Especializações em avaliação psicológica, neuropsicologia, ABA, terapias cognitivas, psicologia jurídica e saúde mental no trabalho.",
    paraQuem:
      "Psicólogos e terapeutas que atuam em clínica, avaliação, perícia psicológica ou saúde mental organizacional.",
  },
];

export const cursos: Curso[] = [
  { nome: "ABA e Neurodivergências: Estratégias Avançadas de Intervenção", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["psicologia"] },
  { nome: "ABA e Neurodivergências: Práticas de Intervenção e Supervisão Clínica", nivel: "Pós-graduação", modalidades: ["Presencial"], duracao: "12 meses", areas: ["psicologia"] },
  { nome: "Administração", nivel: "Graduação", modalidades: ["Presencial"], duracao: "4 anos", areas: ["gestao-e-negocios"] },
  { nome: "Administração EAD", nivel: "Graduação", modalidades: ["EaD"], duracao: "4 anos", areas: ["gestao-e-negocios"] },
  { nome: "Alta Performance Comercial: Persuasão, Negociação e Gestão de Vendas", nivel: "Extensão", modalidades: ["EaD"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Análise das Demonstrações Contábeis", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["contabilidade", "gestao-e-negocios"] },
  { nome: "Análise e Desenvolvimento de Sistemas", nivel: "Graduação", modalidades: ["EaD"], duracao: "2,5 anos", areas: ["tecnologia-da-informacao"] },
  { nome: "Analista de Treinamento e Desenvolvimento", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Analista Financeiro e Performance Empresarial", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Aplicação da Gestão e Modelagem de Projetos e Processos", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Aplicação Prática dos Métodos Ágeis em Projetos", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["engenharia", "gestao-e-negocios"] },
  { nome: "Arquitetura de Estruturas Metálicas", nivel: "Extensão", modalidades: ["Presencial"], duracao: null, areas: ["arquitetura", "engenharia"] },
  { nome: "Assuntos Regulatórios - Regularização de empresas e produtos", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["saude"] },
  { nome: "Auditoria, Avaliações e Perícias de Engenharia", nivel: "Pós-graduação", modalidades: ["Presencial"], duracao: "12 meses", areas: ["engenharia"] },
  { nome: "Avaliação de Desempenho na Prática", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["gestao-e-negocios", "psicologia"] },
  { nome: "Avaliação Psicológica", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "18 meses", areas: ["psicologia"] },
  { nome: "Avaliação Psicológica para Manuseio de Arma de Fogo", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["psicologia"] },
  { nome: "Avaliação Psicológica para Procedimentos Cirúrgicos- Nível Avançado", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["psicologia"] },
  { nome: "Avaliação Psicológica para procedimentos cirúrgicos: Bariátrica, Processo Transexualizador, Vasectomia e Laqueadura", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["psicologia", "saude"] },
  { nome: "Avaliação Psicológica: Práticas Imersivas Avançadas", nivel: "Pós-graduação", modalidades: ["Presencial"], duracao: "18 meses", areas: ["psicologia", "saude"] },
  { nome: "Avaliações e Perícias de Engenharia", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["engenharia"] },
  { nome: "Avaliações Imobiliárias Utilizando Estatística Descritiva E Inferência Com Aplicação De Software", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["engenharia", "gestao-e-negocios"] },
  { nome: "Banco de Dados", nivel: "Graduação", modalidades: ["EaD"], duracao: "2,5 anos", areas: ["tecnologia-da-informacao"] },
  { nome: "BIM e Processo de Produção do Projeto de Arquitetura e Engenharia", nivel: "Extensão", modalidades: ["Presencial"], duracao: null, areas: ["arquitetura", "engenharia"] },
  { nome: "Biomedicina", nivel: "Graduação", modalidades: ["Presencial"], duracao: "4 anos", areas: ["saude"] },
  { nome: "Bloco K - Controle da Produção e do Estoque / SPED Final", nivel: "Extensão", modalidades: ["Presencial"], duracao: null, areas: ["contabilidade", "gestao-e-negocios"] },
  { nome: "Business Partner em Finanças", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Capacitação para Aplicadores ABA", nivel: "Extensão", modalidades: ["EaD"], duracao: null, areas: ["psicologia", "saude"] },
  { nome: "Cargos e Salários", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["contabilidade", "gestao-e-negocios"] },
  { nome: "Ciência de Dados", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["tecnologia-da-informacao"] },
  { nome: "Comércio Exterior e Internacionalização de Empresas", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["contabilidade", "gestao-e-negocios"] },
  { nome: "Compliance com Ênfase nos Riscos Administrativos e Fiscais", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["contabilidade", "gestao-e-negocios"] },
  { nome: "Comportamento Alimentar e Psiconutrição", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["psicologia", "saude"] },
  { nome: "Computação Forense e Segurança da Informação", nivel: "Pós-graduação", modalidades: ["Presencial", "Ao vivo"], duracao: "12 meses", areas: ["tecnologia-da-informacao"] },
  { nome: "Contabilidade para não Contadores", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["contabilidade", "gestao-e-negocios"] },
  { nome: "Direito", nivel: "Graduação", modalidades: ["Presencial"], duracao: "5 anos", areas: ["direito"] },
  { nome: "Direito Empresarial, Gestão e Negócios", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["direito", "gestao-e-negocios"] },
  { nome: "Docência na Era Digital", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["educacao"] },
  { nome: "Engenharia Civil", nivel: "Graduação", modalidades: ["Presencial"], duracao: "5 anos", areas: ["engenharia"] },
  { nome: "Engenharia de Estruturas e Fundações com Tecnologias Digitais e Inteligentes", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["engenharia"] },
  { nome: "Engenharia de Segurança do Trabalho", nivel: "Pós-graduação", modalidades: ["Presencial", "Ao vivo"], duracao: "21 meses", areas: ["engenharia"] },
  { nome: "Engenharia Estrutural e Fundações: Projeto e Modelagem", nivel: "Pós-graduação", modalidades: ["Presencial"], duracao: "12 meses", areas: ["engenharia"] },
  { nome: "Estruturação e Gestão de Clínicas e Consultórios", nivel: "Pós-graduação", modalidades: ["EaD"], duracao: "6 meses", areas: ["gestao-e-negocios", "saude"] },
  { nome: "Excel Avançado - Planilhas Inteligentes", nivel: "Extensão", modalidades: ["Presencial"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Excel Completo do Básico ao Avançado", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Excel Master: Do Zero à IA", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["contabilidade", "tecnologia-da-informacao"] },
  { nome: "Farmácia Oncológica e Hospitalar", nivel: "Pós-graduação", modalidades: ["Presencial", "Ao vivo"], duracao: "12 meses", areas: ["saude"] },
  { nome: "Feedback Assertivo: Implementação na Cultura Organizacional e Desenvolvimento de Equipes", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Ferramentas e Técnicas para Recrutamento e Seleção por Competências", nivel: "Extensão", modalidades: ["Presencial"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Formação de Análise Comportamental", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["gestao-e-negocios", "psicologia"] },
  { nome: "Formação de Consultores e Gestores de Suprimentos e Contratos na Construção", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["engenharia", "gestao-e-negocios"] },
  { nome: "Formação em ICMS", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["contabilidade", "gestao-e-negocios"] },
  { nome: "Formação em Liderança e Gestão de Equipes", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["comunicacao", "gestao-e-negocios"] },
  { nome: "Formação em Marketing Digital", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["comunicacao", "gestao-e-negocios"] },
  { nome: "Formação em Marketing Digital com Inteligência Artificial", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["comunicacao", "tecnologia-da-informacao"] },
  { nome: "Formação em Mediação e Conciliação Extrajudicial", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["direito"] },
  { nome: "Formação em Vendas: Comportamento, Técnicas e Negociação para Alta Performance", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Formação para Atendimento de Alta Performance", nivel: "Extensão", modalidades: ["Presencial"], duracao: null, areas: ["comunicacao"] },
  { nome: "Formação para Propagandista da Indústria Farmacêutica", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["saude"] },
  { nome: "Genética Médica, Genômica e Diagnóstico Molecular", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["saude"] },
  { nome: "Gerenciamento e Auditoria de SGI – Sistemas de Gestão Integrados", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Gestalt-Terapia", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["psicologia", "saude"] },
  { nome: "Gestão Comercial", nivel: "Graduação", modalidades: ["EaD"], duracao: "2 anos", areas: ["gestao-e-negocios"] },
  { nome: "Gestão da Qualidade, Segurança do Paciente e Acreditação em Saúde", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["saude"] },
  { nome: "Gestão de Cargos e Salários Avançado e Estratégias de Remuneração Variável", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Gestão de Departamento Pessoal", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Gestão de Recursos Humanos", nivel: "Graduação", modalidades: ["EaD"], duracao: "2 anos", areas: ["gestao-e-negocios"] },
  { nome: "Gestão do Canteiro de Obras: Planejamento do Canteiro, Qualidade, Ambiental e Engenharia de Segurança", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["engenharia"] },
  { nome: "Gestão Estratégica de Cidades Inteligentes", nivel: "Pós-graduação", modalidades: ["EaD"], duracao: "12 meses", areas: ["engenharia"] },
  { nome: "Gestão Estratégica de Logística", nivel: "Pós-graduação", modalidades: ["EaD"], duracao: "12 meses", areas: ["engenharia", "gestao-e-negocios"] },
  { nome: "Gestão Financeira", nivel: "Graduação", modalidades: ["EaD"], duracao: "2 anos", areas: ["gestao-e-negocios", "contabilidade"] },
  { nome: "Gestão na Construção Civil: Canteiro de Obras, Ambiental, Qualidade e Engenharia de Segurança", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["engenharia"] },
  { nome: "Gestão por Resultados e Liderança para Produtividade e Qualidade na Construção Civil", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["engenharia", "gestao-e-negocios"] },
  { nome: "Governança Corporativa, Conselhos e Desempenho do Negócio", nivel: "Extensão", modalidades: ["Presencial"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Green Belt Lean Six Sigma", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "IA na Prática: Aplicação, Estratégia e Futuro", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["tecnologia-da-informacao"] },
  { nome: "IA para Arquitetura e Design: do Briefing ao Render", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["tecnologia-da-informacao"] },
  { nome: "Imersão em Inteligência Artificial: Agentes e Multiagentes para Negócios", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["gestao-e-negocios", "tecnologia-da-informacao"] },
  { nome: "Imersão Internacional em Arquitetura e Design", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["arquitetura"] },
  { nome: "Indicadores de Gestão de RH: Gente e Resultados", nivel: "Extensão", modalidades: ["Presencial"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Indicadores de Gestão do RH", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Inovações e Atualizações na 7ª Edição do PMBOK (PMI) e os Efeitos na Análise de Viabilidade de Projetos", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Inteligência Artificial Aplicada à Gestão Contábil e Tributária", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["contabilidade"] },
  { nome: "Intervenções em Psicologia em Tempos de Pandemia", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["psicologia", "saude"] },
  { nome: "LGPD e Compliance: Privacidade e Proteção de Dados na Prática", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["comunicacao", "direito", "gestao-e-negocios", "tecnologia-da-informacao"] },
  { nome: "Liderança Estratégica e Inteligência Emocional: Alinhando o seu Perfil de Gestor aos Desafios Atuais", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Liderança, Cultura e Saúde Organizacional", nivel: "Extensão", modalidades: ["EaD"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Líderes Comunicativos: Alcançando Resultados Organizacionais", nivel: "Extensão", modalidades: ["Presencial"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Light Design - Iluminação Residencial e Paisagística", nivel: "Extensão", modalidades: ["Presencial"], duracao: null, areas: ["arquitetura"] },
  { nome: "Light Design e Práticas de Gestão em Escritório", nivel: "Extensão", modalidades: ["Presencial"], duracao: null, areas: ["arquitetura", "gestao-e-negocios"] },
  { nome: "Light Design e Práticas em Gestão de Escritório", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["arquitetura", "gestao-e-negocios"] },
  { nome: "Light Design: Iluminação Comercial e Corporativa", nivel: "Extensão", modalidades: ["Presencial"], duracao: null, areas: ["arquitetura"] },
  { nome: "Manifestações Patológicas das Construções: Diagnósticos e Tratamentos", nivel: "Pós-graduação", modalidades: ["Presencial"], duracao: "12 meses", areas: ["engenharia"] },
  { nome: "MASP: Método para Análise e Solução de Problemas", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["engenharia"] },
  { nome: "Master BIM Expert: Processos de Modelagem e Projeto", nivel: "Pós-graduação", modalidades: ["Presencial", "Ao vivo"], duracao: "12 meses", areas: ["arquitetura", "engenharia"] },
  { nome: "Master BIM: Coordenação e Gestão", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["arquitetura", "engenharia"] },
  { nome: "Master BIM: Infraestrutura e Geoprocessamento", nivel: "Pós-graduação", modalidades: ["EaD"], duracao: "12 meses", areas: ["arquitetura", "engenharia", "gestao-e-negocios"] },
  { nome: "Master em Arquitetura Comercial", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["arquitetura"] },
  { nome: "Master em Arquitetura: Práticas e Dinâmicas Projetuais", nivel: "Pós-graduação", modalidades: ["EaD"], duracao: "12 meses", areas: ["arquitetura"] },
  { nome: "Master em Design de Interiores & Experiência do Ambiente", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["arquitetura", "gestao-e-negocios"] },
  { nome: "Master em Design de Interiores & Neurodesign", nivel: "Pós-graduação", modalidades: ["Presencial"], duracao: "12 meses", areas: ["arquitetura"] },
  { nome: "Master em Engenharia de Obras de Solo e Geotecnia Aplicada", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["engenharia"] },
  { nome: "Master em Fisioterapia no Manejo da Dor", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["saude"] },
  { nome: "Master em Iluminação", nivel: "Pós-graduação", modalidades: ["Presencial", "Ao vivo"], duracao: "12 meses", areas: ["arquitetura"] },
  { nome: "Master em Neuroarquitetura", nivel: "Pós-graduação", modalidades: ["Presencial", "Ao vivo"], duracao: "12 meses", areas: ["arquitetura", "psicologia"] },
  { nome: "MBA Auditoria de Sistemas de Saúde", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["saude"] },
  { nome: "MBA Avançado em Vendas e Gestão de Equipes Comerciais", nivel: "Pós-graduação", modalidades: ["EaD"], duracao: "12 meses", areas: ["gestao-e-negocios"] },
  { nome: "MBA em Compliance, Processos e Legislação Trabalhista e Previdenciária", nivel: "Pós-graduação", modalidades: ["Presencial", "Ao vivo"], duracao: "12 meses", areas: ["contabilidade", "direito", "gestao-e-negocios"] },
  { nome: "MBA em Contabilidade Tributária e Inteligência Fiscal", nivel: "Pós-graduação", modalidades: ["Presencial"], duracao: "12 meses", areas: ["contabilidade", "gestao-e-negocios"] },
  { nome: "MBA em Controladoria, Auditoria e Perícia Contábil", nivel: "Pós-graduação", modalidades: ["Presencial", "Ao vivo"], duracao: "12 meses", areas: ["contabilidade", "gestao-e-negocios"] },
  { nome: "MBA em Desenvolvimento Humano, Psicologia Positiva e Bem-Estar nas Organizações", nivel: "Pós-graduação", modalidades: ["Presencial"], duracao: "12 meses", areas: ["psicologia"] },
  { nome: "MBA em Direito Digital, Práticas em Proteção de Dados e Inteligência Artificial", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["direito"] },
  { nome: "MBA em Direito Tributário, Compliance e Auditoria Digital", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["contabilidade", "direito"] },
  { nome: "MBA em Engenharia Ferroviária", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["engenharia"] },
  { nome: "MBA em Engenharia Rodoviária", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["engenharia"] },
  { nome: "MBA em Facilities Management", nivel: "Pós-graduação", modalidades: ["EaD"], duracao: "12 meses", areas: ["gestao-e-negocios"] },
  { nome: "MBA em Gerenciamento de Obras e Produtividade nas Construções com Inteligência Artificial", nivel: "Pós-graduação", modalidades: ["Presencial"], duracao: "12 meses", areas: ["engenharia"] },
  { nome: "MBA em Gerenciamento de Obras: Estratégia e Desempenho da Construção", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["engenharia"] },
  { nome: "MBA em Gestão comercial, Estratégia em vendas e Inteligência de Mercado", nivel: "Pós-graduação", modalidades: ["Presencial"], duracao: "12 meses", areas: ["gestao-e-negocios"] },
  { nome: "MBA em Gestão da Manutenção", nivel: "Pós-graduação", modalidades: ["Presencial", "Ao vivo"], duracao: "12 meses", areas: ["engenharia"] },
  { nome: "MBA em Gestão da Qualidade e Engenharia de Produção", nivel: "Pós-graduação", modalidades: ["Presencial", "Ao vivo"], duracao: "12 meses", areas: ["gestao-e-negocios"] },
  { nome: "MBA em Gestão de Escritórios de Arquitetura e Design de Interiores", nivel: "Pós-graduação", modalidades: ["EaD"], duracao: "12 meses", areas: ["arquitetura", "gestao-e-negocios"] },
  { nome: "MBA em Gestão de Excelência em Saúde", nivel: "Pós-graduação", modalidades: ["EaD"], duracao: "12 meses", areas: ["gestao-e-negocios", "saude"] },
  { nome: "MBA em Gestão de Negócios, Controladoria, Finanças Corporativas e Inteligência Artificial", nivel: "Pós-graduação", modalidades: ["Presencial"], duracao: "12 meses", areas: ["contabilidade", "gestao-e-negocios", "tecnologia-da-informacao"] },
  { nome: "MBA em Gestão de Negócios, Finanças e Controladoria", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["contabilidade", "gestao-e-negocios"] },
  { nome: "MBA em Gestão de Pessoas e Liderança Positiva", nivel: "Pós-graduação", modalidades: ["EaD"], duracao: "12 meses", areas: ["gestao-e-negocios"] },
  { nome: "MBA em Gestão de Pessoas: Transformação Digital e Sustentabilidade", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["gestao-e-negocios", "meio-ambiente"] },
  { nome: "MBA em Gestão de Projetos Ágeis e Inovadores", nivel: "Pós-graduação", modalidades: ["EaD"], duracao: "6 meses", areas: ["gestao-e-negocios"] },
  { nome: "MBA em Gestão de Projetos com Modelagem para Engenharias e Arquiteturas", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["arquitetura", "engenharia"] },
  { nome: "MBA em Gestão de Projetos e Processos", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["gestao-e-negocios"] },
  { nome: "MBA em Gestão de Projetos e Processos com Métodos Ágeis e Inteligência Artificial", nivel: "Pós-graduação", modalidades: ["Presencial"], duracao: "12 meses", areas: ["gestao-e-negocios", "tecnologia-da-informacao"] },
  { nome: "MBA em Gestão e Engenharia de Sistemas Elétricos", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["engenharia"] },
  { nome: "MBA em Gestão Estratégica de Pessoas: Desenvolvimento, Cultura e Negócios", nivel: "Pós-graduação", modalidades: ["Presencial"], duracao: "12 meses", areas: ["gestao-e-negocios"] },
  { nome: "MBA em Gestão Estratégica de TI", nivel: "Pós-graduação", modalidades: ["EaD"], duracao: "12 meses", areas: ["gestao-e-negocios", "tecnologia-da-informacao"] },
  { nome: "MBA em Gestão na Advocacia", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["direito"] },
  { nome: "MBA em Gestão, Auditoria e Consultoria Ambiental", nivel: "Pós-graduação", modalidades: ["EaD"], duracao: "12 meses", areas: ["gestao-e-negocios", "meio-ambiente"] },
  { nome: "MBA em Growth Marketing, Performance e IA Aplicada", nivel: "Pós-graduação", modalidades: ["EaD"], duracao: "6 meses", areas: ["comunicacao"] },
  { nome: "MBA em Hidrogênio Verde e Transição Energética", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["engenharia", "meio-ambiente"] },
  { nome: "MBA em Inteligência Empresarial Orientada a Dados", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["gestao-e-negocios", "tecnologia-da-informacao"] },
  { nome: "MBA em Liderança Estratégica e Gestão Financeira", nivel: "Pós-graduação", modalidades: ["EaD"], duracao: "12 meses", areas: ["gestao-e-negocios"] },
  { nome: "MBA em Marketing: Estratégia, Digital e Inteligência Artificial", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["comunicacao", "gestao-e-negocios"] },
  { nome: "MBA em Psicologia Organizacional e do Trabalho", nivel: "Pós-graduação", modalidades: ["Presencial", "Ao vivo"], duracao: "12 meses", areas: ["gestao-e-negocios", "psicologia", "saude"] },
  { nome: "MBA em Psicologia Positiva, Saúde Mental e Gestão do Bem-Estar nas Organizações", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["gestao-e-negocios"] },
  { nome: "MBA em Reabilitação Neuropsicológica e Desenvolvimento Cognitivo", nivel: "Pós-graduação", modalidades: ["Presencial", "Ao vivo"], duracao: "12 meses", areas: ["psicologia", "saude"] },
  { nome: "MBA em Sistemas de Energia Elétrica: Geração, Transporte e Comercialização", nivel: "Pós-graduação", modalidades: ["Presencial"], duracao: "12 meses", areas: ["engenharia"] },
  { nome: "MBA Energia Elétrica: Geração, Transmissão e Distribuição", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["engenharia"] },
  { nome: "MBA Engenharia Diagnóstica e Tratamento de Manifestações Patológicas em Obras", nivel: "Pós-graduação", modalidades: ["EaD"], duracao: "12 meses", areas: ["engenharia"] },
  { nome: "MBA Executivo em Liderança, Gestão de Negócios e Desenvolvimento Empresarial com Inteligência Artificial", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["gestao-e-negocios"] },
  { nome: "MBA Executivo em Liderança, Gestão Empresarial e Inteligência Estratégica com IA", nivel: "Pós-graduação", modalidades: ["Presencial"], duracao: "12 meses", areas: ["gestao-e-negocios", "tecnologia-da-informacao"] },
  { nome: "MBA Executivo Gestão em Saúde", nivel: "Pós-graduação", modalidades: ["Presencial", "Ao vivo"], duracao: "12 meses", areas: ["gestao-e-negocios"] },
  { nome: "MBA Gestão Comercial e Alta Performance em Vendas", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["comunicacao", "gestao-e-negocios"] },
  { nome: "MBA Gestão da Qualidade e Segurança do Paciente", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["saude"] },
  { nome: "MBA Gestão de Obras e Práticas Inteligentes na Construção", nivel: "Pós-graduação", modalidades: ["EaD"], duracao: "12 meses", areas: ["engenharia"] },
  { nome: "MBA Gestão de Sistemas de Abastecimento de Água (SAA) e Sistemas de Esgotos Sanitários (SES)", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["engenharia", "meio-ambiente"] },
  { nome: "MBA Gestão dos Fatores de Riscos Psicossociais da NR-1", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["saude"] },
  { nome: "MBA Gestão Empresarial, Inovação e Estratégia Competitiva", nivel: "Pós-graduação", modalidades: ["EaD"], duracao: "12 meses", areas: ["gestao-e-negocios"] },
  { nome: "MBA Gestão Estratégica de Pessoas e Comportamento Organizacional", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["gestao-e-negocios"] },
  { nome: "MBA Gestão Industrial", nivel: "Pós-graduação", modalidades: ["EaD"], duracao: null, areas: ["engenharia", "gestao-e-negocios", "saude"] },
  { nome: "MBA Incorporações e Negócios Imobiliários", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["engenharia", "gestao-e-negocios"] },
  { nome: "MBA Inovação Contábil e Tributária com Inteligência Artificial", nivel: "Pós-graduação", modalidades: ["EaD"], duracao: "6 meses", areas: ["contabilidade"] },
  { nome: "MBA Inteligência Artificial e Inovação Estratégica", nivel: "Pós-graduação", modalidades: ["Presencial", "Ao vivo"], duracao: "12 meses", areas: ["tecnologia-da-informacao"] },
  { nome: "MBA Licitações e Contratos: Governança e Gestão em Contratações e Aquisições Públicas", nivel: "Pós-graduação", modalidades: ["Presencial", "Ao vivo"], duracao: "12 meses", areas: ["direito"] },
  { nome: "MBA Sistemas de Gestão da Segurança de Alimentos", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["engenharia"] },
  { nome: "Métodos Ágeis para Profissionais de Recursos Humanos", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["gestao-e-negocios", "psicologia"] },
  { nome: "Microsoft Power BI: Análise de Dados Corporativos e Criação de Dashboards Gerenciais", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Mind Skills: Estratégias Inovadoras da Neurociência e Desenvolvimento Humano para Produtividade e Resultados", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Neurociência Aplicada ao Desenvolvimento de Pessoas e Organizações", nivel: "Pós-graduação", modalidades: ["EaD"], duracao: "12 meses", areas: ["gestao-e-negocios"] },
  { nome: "Neurociência Aplicada ao Desenvolvimento de Pessoas e Organizações", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["saude"] },
  { nome: "Neurociência Aplicada ao Foco e à Inteligência Emocional", nivel: "Extensão", modalidades: ["EaD"], duracao: null, areas: ["psicologia"] },
  { nome: "Neurociência, Comportamento e Desempenho", nivel: "Pós-graduação", modalidades: ["Presencial", "Ao vivo"], duracao: "12 meses", areas: ["gestao-e-negocios"] },
  { nome: "Neuropsicologia", nivel: "Pós-graduação", modalidades: ["Presencial", "Ao vivo"], duracao: "18 meses", areas: ["psicologia", "saude"] },
  { nome: "Neuropsicopedagogia Clínica e Institucional", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["educacao", "saude"] },
  { nome: "Noções de Incorporações Imobiliárias", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["engenharia", "gestao-e-negocios"] },
  { nome: "Nova Era Fiscal: Aplicações Reais da Reforma Tributária", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["contabilidade"] },
  { nome: "Nutrição Clínica Hospitalar e Home Care", nivel: "Pós-graduação", modalidades: ["EaD"], duracao: "12 meses", areas: ["saude"] },
  { nome: "Nutrição Clínica, Estética, Esportiva e Prescrição de Fitoterápicos", nivel: "Pós-graduação", modalidades: ["Presencial", "Ao vivo"], duracao: "12 meses", areas: ["saude"] },
  { nome: "O Gerenciamento de Risco de Medicamentos e as RDCS Nº 301/2019 e 73/2016", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["saude"] },
  { nome: "Oratória de Alto Impacto: Inteligência Comunicacional e Apresentações Inspiradoras", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Orçamento e Planejamento de Obras e Custos da Construção", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["engenharia", "gestao-e-negocios"] },
  { nome: "Orientação Educacional", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["educacao"] },
  { nome: "Patologia das Construções: Diagnósticos e Tratamentos", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["engenharia"] },
  { nome: "Perícias Forenses", nivel: "Pós-graduação", modalidades: ["Presencial", "Ao vivo"], duracao: "12 meses", areas: ["pericias-forenses"] },
  { nome: "Planejamento e Controle da Produção", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["engenharia"] },
  { nome: "Planejamento e Gestão de Obras", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["engenharia"] },
  { nome: "Planejamento Financeiro e Consultoria de Investimentos", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Planejamento Financeiro Empresarial", nivel: "Extensão", modalidades: ["Presencial"], duracao: null, areas: ["contabilidade", "gestao-e-negocios"] },
  { nome: "Planejamento, Programação e Controle da Produção", nivel: "Extensão", modalidades: ["Presencial"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Pós-Graduação em Farmácia Clínica e Prática Integrada", nivel: "Pós-graduação", modalidades: ["EaD"], duracao: "12 meses", areas: ["saude"] },
  { nome: "Practitioner PNL - Programação Neurolinguística", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Preparação para Certificações PMI-PMP, Agile SCRUM ASF e Master, CBPP-Processos e PMI Agile-ACP", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Preparação para Certificações Pmi-Pmp, Agile Scrum Foundation, Scrum Master, Prince2", nivel: "Extensão", modalidades: ["Presencial"], duracao: null, areas: ["engenharia"] },
  { nome: "Prevenção de Stress e Burnout e Promoção de Bem-Estar no Trabalho", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Projeto e Execução de Instalações Prediais: Hidráulica, Elétrica, Sanitárias, Águas Pluviais e Gás", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["engenharia"] },
  { nome: "Psicanálise e Clínica Contemporânea: Sujeito, Sofrimento e Intervenções", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["psicologia", "saude"] },
  { nome: "Psicologia", nivel: "Graduação", modalidades: ["Presencial"], duracao: "5 anos", areas: ["psicologia"] },
  { nome: "Psicologia do Neurodesenvolvimento e Aprendizagem", nivel: "Pós-graduação", modalidades: ["EaD"], duracao: "12 meses", areas: ["psicologia"] },
  { nome: "Psicologia Hospitalar", nivel: "Pós-graduação", modalidades: ["Ao vivo"], duracao: "12 meses", areas: ["saude"] },
  { nome: "Psicologia Jurídica com Ênfase em Perícia Psicológica", nivel: "Pós-graduação", modalidades: ["Presencial", "Ao vivo"], duracao: "18 meses", areas: ["psicologia"] },
  { nome: "Psicoterapia Positiva: Da Depressão ao Bem-Estar", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["psicologia"] },
  { nome: "Recrutamento e Seleção por Competências On-line e Off-line", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Recrutamento e Treinamento de Times Comerciais", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "RH Business Partner", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "RH na Prática e Gestão Organizacional de Recursos Humanos", nivel: "Extensão", modalidades: ["Presencial"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "RH Performance : Pessoas, Desempenho e Resultados", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "RH Performance, Indicadores e Business Partner", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "SAP Business One", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["contabilidade", "gestao-e-negocios"] },
  { nome: "Saúde Estética e Cosmetologia Avançada", nivel: "Pós-graduação", modalidades: ["Presencial"], duracao: "12 meses", areas: ["saude"] },
  { nome: "Saúde Mental no Trabalho e NR-1: da Legislação à Prática Transformadora", nivel: "Extensão", modalidades: ["Presencial", "Ao vivo"], duracao: null, areas: ["psicologia", "saude"] },
  { nome: "Segurança Cibernética", nivel: "Graduação", modalidades: ["EaD"], duracao: "2,5 anos", areas: ["tecnologia-da-informacao"] },
  { nome: "Segurança do Paciente: Da Teoria à Prática", nivel: "Extensão", modalidades: ["Presencial"], duracao: null, areas: ["saude"] },
  { nome: "Técnicas Avançadas de Negociação Comercial", nivel: "Extensão", modalidades: ["Ao vivo"], duracao: null, areas: ["gestao-e-negocios"] },
  { nome: "Terapia Cognitivo-Comportamental (TCC)", nivel: "Pós-graduação", modalidades: ["Presencial", "Ao vivo"], duracao: "12 meses", areas: ["psicologia", "saude"] },
  { nome: "Terapia do Esquema Cognitivo: Habilidades Técnicas Inovadoras para Dinamização da Prática Clínica", nivel: "Pós-graduação", modalidades: ["Presencial", "Ao vivo"], duracao: "12 meses", areas: ["psicologia", "saude"] },
];

/** Cursos de uma área, na ordem em que aparecem no catálogo. */
export const cursosDaArea = (slug: SlugArea): Curso[] =>
  cursos.filter((curso) => curso.areas.includes(slug));

/** Cursos de uma área agrupados por nível de formação. */
export const cursosDaAreaPorNivel = (
  slug: SlugArea,
): { nivel: Nivel; cursos: Curso[] }[] => {
  const niveis: Nivel[] = ["Pós-graduação", "Extensão", "Graduação"];
  return niveis
    .map((nivel) => ({
      nivel,
      cursos: cursosDaArea(slug).filter((curso) => curso.nivel === nivel),
    }))
    .filter((grupo) => grupo.cursos.length > 0);
};

/** Total de cursos distintos no catálogo. */
export const totalCursosCatalogados = cursos.length;

/** Quantidade de cursos por nível, para uso em tabelas e dados estruturados. */
export const totaisPorNivel = {
  "Pós-graduação": cursos.filter((c) => c.nivel === "Pós-graduação").length,
  Extensão: cursos.filter((c) => c.nivel === "Extensão").length,
  Graduação: cursos.filter((c) => c.nivel === "Graduação").length,
} as const;

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
