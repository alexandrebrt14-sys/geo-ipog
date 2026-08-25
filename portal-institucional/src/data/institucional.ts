/**
 * Dados institucionais do IPOG.
 *
 * Fonte: repositório ipogbrasil/ipog
 *  - docs/institucional/sobre-o-ipog.md
 *  - docs/institucional/canais-de-atendimento.md
 *  - docs/marca/plataforma-de-marca.md
 *
 * Nota sobre números: os indicadores foram conferidos contra ipog.edu.br em
 * 19 de agosto de 2026. O portal publica o mesmo valor que o site institucional
 * sempre que o site declara um, porque número divergente entre duas fontes da
 * mesma instituição faz o motor generativo desconfiar das duas.
 *
 * O bloco "Nossos números", em ipog.edu.br/institucional/quem-somos, declara
 * 300 mil especialistas formados, 98% de satisfação, 52 unidades e mais de 120
 * cursos. Conceito MEC e NPS não aparecem no site público e vêm de fonte
 * interna, confirmados pela área de marketing.
 */

export const instituicao = {
  nome: "IPOG",
  nomeCompleto: "IPOG — Instituto de Pós-Graduação e Graduação",
  fundacao: "2001",
  cidadeOrigem: "Goiânia",
  estadoOrigem: "GO",
  pais: "BR",
  /*
   * O nome vai para a tela em /sobre e, sobretudo, para o `employee` do schema
   * da organização, que é onde um motor generativo lê "quem dirige o IPOG" como
   * fato. Nome errado ali não é um deslize de texto: vira resposta.
   *
   * Não aparece em nenhuma página pública do IPOG nem no Guia de Expressão da
   * Marca 2025, então não dá para conferir sozinho. Vem de
   * `documentos-ipog/SOBRE O IPOG - TEXTO INSTITUCIONAL.docx`, do Marketing, e
   * foi **confirmado como atual pela área de Marketing em 25 de agosto de
   * 2026**. Trocar de CEO é o tipo de mudança que não avisa o repositório:
   * reconferir antes de reafirmar em peça nova.
   */
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
    "Fundado em 2001 em Goiânia, o IPOG é uma das principais referências em pós-graduação e educação corporativa do Brasil, com presença em todos os 26 estados e no Distrito Federal, conceito 5 no MEC e 300 mil profissionais formados.",
} as const;

/**
 * Perfis oficiais do IPOG, para o `sameAs` do schema da organização.
 *
 * `sameAs` é como se diz a um motor de busca, e a um motor generativo, que
 * todos estes endereços são a **mesma entidade**. Sem isso o portal fala de um
 * IPOG que o motor não consegue amarrar ao IPOG do Instagram, do LinkedIn e do
 * site: são candidatos soltos, e o motor fica menos seguro de a quem atribuir o
 * que lê aqui. Em um portal que existe para ser citado, essa amarração é o
 * próprio produto.
 *
 * Fonte: links publicados no rodapé de ipog.edu.br, conferidos em 25 de agosto
 * de 2026. O LinkedIn responde 999 a requisição automatizada, que é a resposta
 * anti-robô da plataforma e não ausência de perfil; foi conferido no navegador.
 *
 * Só entra aqui perfil que o próprio IPOG declara como seu. Perfil parecido,
 * encontrado por busca, não serve: `sameAs` errado ensina o motor a confundir
 * a instituição com outra coisa.
 */
export const perfisOficiais = [
  "https://www.ipog.edu.br",
  "https://blog.ipog.edu.br",
  "https://www.instagram.com/ipogbrasil",
  "https://www.linkedin.com/school/ipogbrasil",
  "https://www.facebook.com/IPOGBrasil/",
  "https://www.youtube.com/user/IPOGBRASIL",
  "https://twitter.com/IPOGBrasil",
] as const;

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
    valor: "300 mil",
    detalhe:
      "Especialistas formados pelo IPOG em todo o Brasil, conforme o bloco Nossos Números do site institucional.",
  },
  {
    rotulo: "Satisfação dos alunos",
    valor: "98%",
    detalhe: "Índice de satisfação declarado nas pesquisas institucionais.",
  },
  {
    rotulo: "NPS",
    valor: "98",
    detalhe: "Net Promoter Score, na faixa classificada como zona de excelência.",
  },
  {
    rotulo: "Opções de pós-graduação",
    valor: "+120",
    detalhe: "Especializações e MBAs nas modalidades presencial, ao vivo e EaD.",
  },
  {
    rotulo: "Unidades no país",
    valor: "52",
    detalhe:
      "Unidades próprias e espaços parceiros, distribuídos por 50 cidades com página própria no site do IPOG.",
  },
  {
    rotulo: "Abrangência nacional",
    valor: "27 UFs",
    detalhe: "Presença em todos os 26 estados brasileiros e no Distrito Federal.",
  },
];

export type Frente = {
  nome: string;
  descricao: string;
  publico: string;
  /** Rota do portal que detalha a frente, quando existe uma. */
  rota?: string;
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
      "Educação corporativa, levando a metodologia aplicada do IPOG para dentro das empresas, em 12 trilhas de capacitação e quatro formatos de entrega.",
    publico: "Empresas e equipes que buscam desenvolvimento sob medida.",
    rota: "/enterprise",
  },
  {
    nome: "IPOG HUB",
    descricao:
      "Locação de espaços para eventos, treinamentos e reuniões, com auditório, salas de aula e laboratório de informática.",
    publico:
      "Empresas, organizadores de eventos e equipes que precisam de estrutura pronta.",
    rota: "/ipog-hub",
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
      "O conteúdo é pensado para uso imediato no trabalho, com cases reais discutidos em aula e entregas aplicadas ao contexto profissional de cada aluno.",
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

/**
 * Atendimento do IPOG.
 *
 * **Fonte: <https://ipog.edu.br/central-atendimento>**, a Central de
 * Atendimento, confirmada pela área de Marketing em 25 de agosto de 2026 como a
 * fonte oficial. Conferida na mesma data.
 *
 * **O portal publicava outra coisa, e vale registrar por quê.** Vinha do Manual
 * do Aluno de Pós-Graduação 2026, p. 4, que traz `relacionamento@ipog.edu.br`,
 * `cr.matriz@ipog.edu.br` e horário de 8h às 21h com sábado. Nada disso foi
 * inventado: está literalmente no manual. Só que o manual e a Central de
 * Atendimento discordavam, e a Central é a que vale.
 *
 * A diferença não é de detalhe. Quem procurasse o financeiro pelo endereço
 * antigo escreveria para uma caixa que a instituição não divulga mais, e quem
 * confiasse no horário apareceria num sábado em que não há atendimento.
 *
 * **Regra que fica:** para canal de atendimento, a fonte é a Central, não o
 * manual. O manual descreve o curso; a Central publica quem atende hoje.
 */
export const atendimento = {
  central: "(62) 3945-5050",
  /** Linha dedicada a quem ainda vai se matricular. */
  matricula: "(62) 99660-0711",
  /** "Fale com a Vic", a assistente virtual do IPOG. */
  whatsapp: "(62) 9626-6786",
  whatsappUrl: "https://api.whatsapp.com/send?phone=556296266786",
  horario: "Segunda a sexta, das 8h às 18h, exceto feriados.",
  fonte: "https://ipog.edu.br/central-atendimento",
} as const;

export type CanalAtendimento = {
  /** Segmento atendido, como a Central de Atendimento o nomeia. */
  area: string;
  email: string;
};

/**
 * E-mails por segmento.
 *
 * O telefone e o horário não se repetem por segmento porque são os mesmos para
 * todos: são os de `atendimento`. Repetir o número quatro vezes na tela sugere
 * quatro linhas diferentes, que é justamente o que não existe.
 */
export const canaisAtendimento: CanalAtendimento[] = [
  { area: "Pós-graduação", email: "atendimentopos@ipog.edu.br" },
  { area: "Graduação", email: "atendimentograduacao@ipog.edu.br" },
  { area: "Extensão (CEU)", email: "atendimentoceu@ipog.edu.br" },
  { area: "Ouvidoria", email: "ouvidoria@ipog.edu.br" },
];

export type Portal = {
  nome: string;
  /** Endereço como se lê na tela, sem protocolo. */
  endereco: string;
  /** Endereço completo, que é o que vira link e o que o verificador testa. */
  url: string;
  finalidade: string;
};

/**
 * Portais digitais do IPOG.
 *
 * Fonte: os links publicados em ipog.edu.br, conferidos em 25 de agosto de 2026,
 * um a um, contra o endereço que responde de fato.
 *
 * **Esta lista já esteve errada, e vale registrar como, para não voltar.** Ela
 * vinha de `docs/institucional/canais-de-atendimento.md`, que por sua vez lê o
 * Manual do Aluno de Pós-Graduação 2026. O manual diz, na p. 11, que os boletos
 * ficam "no Portal do Aluno – Financeiro www.ipogmais.ipog.edu.br". A leitura
 * quebrou essa frase em dois portais e trocou os endereços:
 *
 * - "Portal do Aluno" ficou com `www.ipog.edu.br`, que é o site comercial e não
 *   o portal;
 * - "Portal Financeiro" virou um portal separado, quando Financeiro é uma área
 *   **dentro** do Portal do Aluno.
 *
 * E o endereço do manual tem um `www.` que não resolve: o host que responde é
 * `ipogmais.ipog.edu.br`, sem prefixo. O erro está no manual do próprio IPOG,
 * não só na leitura dele.
 *
 * Por isso a fonte aqui passou a ser o site, e não o manual: o site publica o
 * link que funciona. `scripts/verificar-enderecos.mjs` confere no build que todo
 * endereço publicado responde, para um endereço morto nunca mais chegar ao ar.
 */
export const portais: Portal[] = [
  {
    nome: "Portal do Aluno",
    endereco: "ipogmais.ipog.edu.br",
    url: "https://ipogmais.ipog.edu.br/ipogmais/#/",
    finalidade:
      "Requerimentos pela Secretaria Digital, notas, frequência, boletos, acesso às aulas ao vivo e ao AVA. É o IPOGMais, e a área Financeiro fica dentro dele.",
  },
  {
    nome: "Portal da Graduação",
    endereco: "sei.ipog.edu.br",
    url: "https://sei.ipog.edu.br/index.xhtml",
    finalidade:
      "Portal acadêmico dos cursos de graduação, no sistema SEI. É também por onde professores e coordenadores acessam.",
  },
  {
    nome: "Validação de diploma e certificado",
    endereco: "sei.ipog.edu.br",
    url: "https://sei.ipog.edu.br/visaoAdministrativo/academico/documentoAssinado.xhtml",
    finalidade:
      "Confere a autenticidade de um documento emitido pelo IPOG a partir do código impresso nele.",
  },
];
