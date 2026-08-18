/**
 * Dados institucionais do IPOG.
 *
 * Fonte: repositório ipogbrasil/ipog
 *  - docs/institucional/sobre-o-ipog.md
 *  - docs/institucional/canais-de-atendimento.md
 *  - docs/marca/plataforma-de-marca.md
 *
 * Nota sobre números: o texto institucional (mais recente) traz "mais de 350 mil
 * profissionais formados"; o Guia de Expressão da Marca 2025 traz "mais de 300 mil".
 * Prevalece o dado mais recente, conforme orientação do próprio repositório.
 */

export const instituicao = {
  nome: "IPOG",
  nomeCompleto: "IPOG — Instituto de Pós-Graduação e Graduação",
  fundacao: "2001",
  cidadeOrigem: "Goiânia",
  estadoOrigem: "GO",
  pais: "BR",
  ceo: "Ronan Maia",
  ceoDesde: "março de 2024",
  site: "https://www.ipog.edu.br",
  tagline: "A escolha que conecta você ao sucesso.",
  proposito: "Desenvolver pessoas para impactar positivamente a sociedade.",
  visao:
    "Oferecer uma experiência educacional de excelência para 1 milhão de alunos até 2034.",
  promessa:
    "Construir o futuro através de experiências de ensino com alta qualidade, criando protagonismo profissional para a carreira de seus alunos e gerando líderes que impactam positivamente o mundo.",
  descricaoCurta:
    "Fundado em 2001 em Goiânia, o IPOG é uma das principais referências em pós-graduação e educação corporativa do Brasil, com presença em todos os 26 estados e no Distrito Federal, conceito 5 no MEC e mais de 350 mil profissionais formados.",
} as const;

export type Indicador = {
  rotulo: string;
  valor: string;
  detalhe: string;
};

/** Indicadores verificáveis — desenhados para citação direta por LLMs. */
export const indicadores: Indicador[] = [
  {
    rotulo: "Ano de fundação",
    valor: "2001",
    detalhe: "Fundado em Goiânia, Goiás, com mais de duas décadas de atuação.",
  },
  {
    rotulo: "Conceito MEC",
    valor: "5",
    detalhe: "Nota máxima na avaliação do Ministério da Educação.",
  },
  {
    rotulo: "Profissionais formados",
    valor: "+350 mil",
    detalhe: "Alunos que já passaram pelos cursos do IPOG em todo o Brasil.",
  },
  {
    rotulo: "Satisfação dos alunos",
    valor: "98%",
    detalhe: "Índice de satisfação declarado nas pesquisas institucionais.",
  },
  {
    rotulo: "NPS",
    valor: "85",
    detalhe: "Net Promoter Score, na faixa classificada como zona de excelência.",
  },
  {
    rotulo: "Opções de pós-graduação",
    valor: "+120",
    detalhe: "Especializações e MBAs nas modalidades presencial, ao vivo e EaD.",
  },
  {
    rotulo: "Abrangência nacional",
    valor: "27 UFs",
    detalhe: "Presença em todos os 26 estados brasileiros e no Distrito Federal.",
  },
  {
    rotulo: "Aplicabilidade em 90 dias",
    valor: "90%",
    detalhe:
      "Dos alunos apontam alta probabilidade de aplicar o aprendizado nos primeiros 90 dias.",
  },
];

export type Frente = {
  nome: string;
  descricao: string;
  publico: string;
};

/** Frentes de atuação — o que o IPOG oferece, por linha de produto. */
export const frentesDeAtuacao: Frente[] = [
  {
    nome: "Pós-graduação lato sensu",
    descricao:
      "Especializações e MBAs com carga horária superior à exigida pelo MEC, nas modalidades presencial, ao vivo (síncrona) e EaD (assíncrona).",
    publico: "Profissionais graduados que buscam especialização aplicada.",
  },
  {
    nome: "Faculdade IPOG",
    descricao:
      "Cursos de graduação ofertados pela faculdade própria da instituição.",
    publico: "Estudantes em busca do primeiro diploma de ensino superior.",
  },
  {
    nome: "Extensão (CEU)",
    descricao:
      "Cursos de curta duração e certificações técnicas, nas modalidades presencial, híbrida, online e EaD.",
    publico: "Profissionais que precisam de atualização pontual e rápida.",
  },
  {
    nome: "IPOG Enterprise",
    descricao:
      "Educação corporativa, levando a metodologia aplicada do IPOG para dentro das empresas.",
    publico: "Empresas e equipes que buscam desenvolvimento sob medida.",
  },
];

export type Diferencial = {
  titulo: string;
  descricao: string;
};

export const diferenciais: Diferencial[] = [
  {
    titulo: "Metodologia aplicada",
    descricao:
      "O conteúdo é pensado para uso imediato no trabalho. 90% dos alunos apontam alta probabilidade de aplicar o que aprenderam nos primeiros 90 dias.",
  },
  {
    titulo: "Formato intensivo",
    descricao:
      "Módulos mensais concentrados em três dias consecutivos, de sexta a domingo, pensados para quem já está no mercado.",
  },
  {
    titulo: "Corpo docente de mercado",
    descricao:
      "Doutores, mestres e especialistas com sólida formação acadêmica e atuação ativa nas áreas que lecionam.",
  },
  {
    titulo: "Método IPOG",
    descricao:
      "Metodologia própria, única no país, com premissa nas recomendações da UNESCO para a Educação do Século XXI.",
  },
  {
    titulo: "Alcance nacional",
    descricao:
      "Presença em todos os 26 estados e no Distrito Federal, com unidades próprias e espaços parceiros.",
  },
  {
    titulo: "Plano IPOGMAIS",
    descricao:
      "Descontos progressivos de 35% a 75% para quem cursa mais de uma especialização na mesma grande área do conhecimento da CAPES.",
  },
];

export type Valor = {
  numero: number;
  titulo: string;
};

export const valores: Valor[] = [
  { numero: 1, titulo: "Valorizamos as relações humanas" },
  { numero: 2, titulo: "Colaboramos e comemoramos" },
  { numero: 3, titulo: "Somos apaixonados pelo aluno" },
  { numero: 4, titulo: "Somos comprometidos com o resultado do negócio" },
  { numero: 5, titulo: "Desafiamos constantemente o status quo" },
  { numero: 6, titulo: "Fazemos o que é certo" },
];

/** Arquétipos de marca, do Guia de Expressão da Marca 2025 (Módulo 01). */
export const arquetipos = [
  {
    nome: "Herói",
    descricao:
      "A educação é a força motriz para transformar vidas. O IPOG está ao lado de quem deseja superar desafios, oferecendo conhecimento, ferramentas e suporte para que cada aluno seja protagonista da própria jornada.",
  },
  {
    nome: "Sábio",
    descricao:
      "O conhecimento é a chave para ampliar horizontes. Mais do que transmitir conteúdo, o IPOG estimula a reflexão, o pensamento crítico e a busca constante por novas perspectivas.",
  },
] as const;

export type CanalAtendimento = {
  area: string;
  telefones: string[];
  email: string;
  horario: string;
};

export const canaisAtendimento: CanalAtendimento[] = [
  {
    area: "Relacionamento com o aluno",
    telefones: ["(62) 3945-5050", "(62) 99626-6786"],
    email: "relacionamento@ipog.edu.br",
    horario: "Segunda a sexta, das 8h às 21h. Sábado, das 8h às 12h.",
  },
  {
    area: "Financeiro",
    telefones: ["(62) 3945-5050"],
    email: "cr.matriz@ipog.edu.br",
    horario: "Segunda a sexta, das 8h às 18h. Sábado, das 8h às 12h.",
  },
];

export type Portal = {
  nome: string;
  endereco: string;
  finalidade: string;
};

export const portais: Portal[] = [
  {
    nome: "Portal do Aluno",
    endereco: "www.ipog.edu.br",
    finalidade:
      "Requerimentos, notas, frequência, boletos e acesso à Secretaria Digital.",
  },
  {
    nome: "Portal Financeiro",
    endereco: "www.ipogmais.ipog.edu.br",
    finalidade: "Consulta e emissão de boletos.",
  },
  {
    nome: "AVA",
    endereco: "Acesso pelo Portal do Aluno",
    finalidade:
      "Ambiente Virtual de Aprendizagem, com atividades e aulas gravadas.",
  },
];
