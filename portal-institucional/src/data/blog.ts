/**
 * Artigos do blog do IPOG associados a cada área de conhecimento.
 *
 * Fonte: feeds RSS de categoria de blog.ipog.edu.br, em /categoria/<slug>/feed/,
 * consultados em 19 de agosto de 2026. O sitemap do blog traz as URLs mas não os
 * títulos, e as páginas de post renderizam por JavaScript com og:title genérico,
 * então o feed é a única fonte que devolve título e data reais.
 *
 * Por que ligar o portal ao blog: o blog é onde o IPOG publica conteúdo com
 * profundidade editorial, e o portal é onde publica dado estruturado. Ligar os
 * dois faz um motor generativo enxergar uma fonte só, com autoridade em duas
 * camadas, em vez de dois sites soltos que falam do mesmo assunto.
 *
 * Sobre a correspondência: o blog usa 12 categorias que não coincidem com as 12
 * áreas do portal. "Engenharia e Arquitetura" cobre duas áreas e foi separada
 * pelo assunto de cada post; "Desenvolvimento do Potencial Humano" complementa
 * Psicologia; e Perícias Forenses, que não tem categoria própria, recebe apenas
 * os posts de Direito que tratam de perícia.
 *
 * Sem artigo correspondente no blog: meio-ambiente.
 *
 * Este arquivo é gerado. Para atualizar, releia os feeds em vez de editar item
 * a item.
 */

export type ArtigoDoBlog = {
  titulo: string;
  url: string;
  /** Categoria do blog de onde o artigo veio, como o blog a nomeia. */
  categoria: string;
  publicado: string | null;
};

const ARTIGOS: Record<string, ArtigoDoBlog[]> = {
  "comunicacao": [
    {
      titulo: "IPOG lança pré-MBA em Marketing e IA para quem quer liderar o crescimento",
      url: "https://blog.ipog.edu.br/comunicacao-e-marketing/pre-mba-marketing-ia-ipog/",
      categoria: "Comunicação e Marketing",
      publicado: "2026-08-03",
    },
    {
      titulo: "IPOGCast – Como desenvolver a oratória e a comunicação para crescer na carreira?",
      url: "https://blog.ipog.edu.br/comunicacao-e-marketing/comunicacao-e-oratoria-para-a-carreira/",
      categoria: "Comunicação e Marketing",
      publicado: "2026-07-14",
    },
    {
      titulo: "Evento de oratória em Goiânia: o IPOG reúne 3 especialistas em fala, presença e posicionamento",
      url: "https://blog.ipog.edu.br/comunicacao-e-marketing/evento-de-oratoria-em-goiania/",
      categoria: "Comunicação e Marketing",
      publicado: "2026-06-15",
    },
    {
      titulo: "IPOG Cast – Marketing Estratégico: a chave para transformar o jogo dos negócios",
      url: "https://blog.ipog.edu.br/comunicacao-e-marketing/ipog-cast-marketing-estrategico-a-chave-para-transformar-o-jogo-dos-negocios/",
      categoria: "Comunicação e Marketing",
      publicado: "2026-02-11",
    },
  ],
  "direito": [
    {
      titulo: "Durante aula, alunos de Direito do IPOG vivenciam sustentação oral real no TJGO",
      url: "https://blog.ipog.edu.br/direito/durante-aula-alunos-de-direito-do-ipog-vivenciam-sustentacao-oral-real-no-tjgo/",
      categoria: "Direito",
      publicado: "2025-09-05",
    },
    {
      titulo: "Primeira turma do MBA em Direito Digital do IPOG é inaugurada",
      url: "https://blog.ipog.edu.br/direito/primeira-turma-do-mba-em-direito-digital-do-ipog-e-inaugurada/",
      categoria: "Direito",
      publicado: "2025-04-30",
    },
    {
      titulo: "Banimento e retorno do TikTok nos EUA: entenda os motivos",
      url: "https://blog.ipog.edu.br/direito/banimento-tiktok-eua/",
      categoria: "Direito",
      publicado: "2025-01-22",
    },
    {
      titulo: "Direito Digital: veja lista com 20 oportunidades de atuação na área",
      url: "https://blog.ipog.edu.br/direito/direito-digital-veja-lista-com-20-oportunidades-de-atuacao-na-area/",
      categoria: "Direito",
      publicado: "2024-10-31",
    },
  ],
  "pericias-forenses": [
    {
      titulo: "Curso de investigação forense e perícia criminal: como se tornar um perito renomado",
      url: "https://blog.ipog.edu.br/direito/curso-de-investigacao-forense-e-pericia-criminal/",
      categoria: "Direito",
      publicado: "2023-03-28",
    },
    {
      titulo: "Perícia documentoscópica: o que é e como atuar em laboratórios forenses",
      url: "https://blog.ipog.edu.br/direito/pericia-documentoscopica/",
      categoria: "Direito",
      publicado: "2023-03-21",
    },
  ],
  "educacao": [
    {
      titulo: "Fit cultural: o alinhamento de valores que faz diferença no trabalho",
      url: "https://blog.ipog.edu.br/educacao/fit-cultural-o-alinhamento-de-valores-que-faz-diferenca-no-trabalho/",
      categoria: "Educação",
      publicado: "2025-11-11",
    },
    {
      titulo: "Pós-graduação In Company: 8 razões para investir na capacitação de seus colaboradores",
      url: "https://blog.ipog.edu.br/educacao/pos-graduacao-in-company/",
      categoria: "Educação",
      publicado: "2023-08-28",
    },
    {
      titulo: "Educação 5.0: como se atualizar para as novas práticas docentes",
      url: "https://blog.ipog.edu.br/educacao/educacao-5-0/",
      categoria: "Educação",
      publicado: "2023-07-31",
    },
    {
      titulo: "Capacite seus colaboradores: saiba como contratar o IPOG In Company",
      url: "https://blog.ipog.edu.br/educacao/capacite-seus-colaboradores/",
      categoria: "Educação",
      publicado: "2023-07-21",
    },
  ],
  "engenharia": [
    {
      titulo: "5 erros de impermeabilização que geram patologia (e como evitar)",
      url: "https://blog.ipog.edu.br/engenharia-e-arquitetura/erros-de-impermeabilizacao/",
      categoria: "Engenharia e Arquitetura",
      publicado: "2026-08-13",
    },
    {
      titulo: "Taludes e muros de contenção: 8 sinais de risco de ruptura",
      url: "https://blog.ipog.edu.br/engenharia-e-arquitetura/taludes-e-muros-de-contencao-chuvas/",
      categoria: "Engenharia e Arquitetura",
      publicado: "2026-08-13",
    },
    {
      titulo: "Conteúdo ministrado em MBA do IPOG é tema de questão discursiva no concurso da Caixa para Engenheiro Civil",
      url: "https://blog.ipog.edu.br/engenharia-e-arquitetura/conteudo-ministrado-em-mba-do-ipog-e-tema-de-questao-discursiva-no-concurso-da-caixa-para-engenheiro-civil/",
      categoria: "Engenharia e Arquitetura",
      publicado: "2026-03-06",
    },
    {
      titulo: "Inovações tecnológicas que estão revolucionando o concreto",
      url: "https://blog.ipog.edu.br/engenharia-e-arquitetura/inovacoes-tecnologicas-que-estao-revolucionando-o-concreto/",
      categoria: "Engenharia e Arquitetura",
      publicado: "2026-02-13",
    },
  ],
  "arquitetura": [
    {
      titulo: "Descubra o poder do neurodesign na criação de espaços emocionalmente ricos",
      url: "https://blog.ipog.edu.br/engenharia-e-arquitetura/descubra-o-poder-do-neurodesign-na-criacao-de-espacos-emocionalmente-ricos/",
      categoria: "Engenharia e Arquitetura",
      publicado: "2025-10-28",
    },
    {
      titulo: "Integração entre BIM e GIS impulsiona cidades inteligentes e sustentáveis",
      url: "https://blog.ipog.edu.br/engenharia-e-arquitetura/integracao-entre-bim-e-gis-impulsiona-cidades-inteligentes-e-sustentaveis/",
      categoria: "Engenharia e Arquitetura",
      publicado: "2024-11-08",
    },
    {
      titulo: "Pós-graduação em Design de Interiores — Confira a Carreira Inspiradora de Rodrigo Borges",
      url: "https://blog.ipog.edu.br/engenharia-e-arquitetura/pos-graduacao-em-design-de-interiores-carreira-de-rodrigo-borges/",
      categoria: "Engenharia e Arquitetura",
      publicado: "2024-06-20",
    },
    {
      titulo: "Arquitetura hoteleira: como fazer projetos comerciais para hotéis",
      url: "https://blog.ipog.edu.br/engenharia-e-arquitetura/arquitetura-hoteleira/",
      categoria: "Engenharia e Arquitetura",
      publicado: "2023-09-05",
    },
  ],
  "gestao-e-negocios": [
    {
      titulo: "Educação corporativa e treinamento: qual gera mais resultado?",
      url: "https://blog.ipog.edu.br/gestao-e-negocios/educacao-corporativa-e-treinamento/",
      categoria: "Gestão e Negócios",
      publicado: "2026-08-07",
    },
    {
      titulo: "Como escolher uma pós em gestão executiva em 2026",
      url: "https://blog.ipog.edu.br/gestao-e-negocios/como-escolher-uma-pos-em-gestao-executiva-em-2026/",
      categoria: "Gestão e Negócios",
      publicado: "2026-08-04",
    },
    {
      titulo: "IPOGCast – Governança Corporativa para empresas familiares",
      url: "https://blog.ipog.edu.br/gestao-e-negocios/ipogcast-governanca-corporativa-para-empresas-familiares/",
      categoria: "Gestão e Negócios",
      publicado: "2026-05-13",
    },
    {
      titulo: "A entrevista em Avaliação Psicológica",
      url: "https://blog.ipog.edu.br/gestao-e-negocios/a-entrevista-em-avaliacao-psicologica/",
      categoria: "Gestão e Negócios",
      publicado: "2026-05-12",
    },
  ],
  "saude": [
    {
      titulo: "IPOGCast – Riscos Psicossociais na NR-1: como identificar e agir na prática",
      url: "https://blog.ipog.edu.br/saude/riscos-psicossociais-nr-1-como-identificar-agir-na-pratica/",
      categoria: "Saúde",
      publicado: "2026-04-23",
    },
    {
      titulo: "Aplicativos de prevenção ao suicídio disponíveis no Brasil não têm validação científica, aponta pesquisa de professora do IPOG",
      url: "https://blog.ipog.edu.br/saude/aplicativos-de-prevencao-ao-suicidio/",
      categoria: "Saúde",
      publicado: "2026-04-10",
    },
    {
      titulo: "Como médicos podem usar a Inteligência Artificial para reduzir o risco de burnout",
      url: "https://blog.ipog.edu.br/saude/como-medicos-podem-usar-a-inteligencia-artificial-para-reduzir-o-risco-de-burnout/",
      categoria: "Saúde",
      publicado: "2026-01-21",
    },
    {
      titulo: "IA na medicina: 3 aplicações poderosas que já estão mudando a rotina clínica",
      url: "https://blog.ipog.edu.br/saude/ia-na-medicina-3-aplicacoes-poderosas-que-ja-estao-mudando-a-rotina-clinica/",
      categoria: "Saúde",
      publicado: "2026-01-09",
    },
  ],
  "tecnologia-da-informacao": [
    {
      titulo: "Claude na Prática: o evento do IPOG sobre Claude IA da estratégia ao design",
      url: "https://blog.ipog.edu.br/tecnologia/claude-na-pratica-o-evento-do-ipog-sobre-claude-ia-da-estrategia-ao-design/",
      categoria: "Tecnologia",
      publicado: "2026-07-09",
    },
    {
      titulo: "Computação Forense: entenda como a perícia digital ajuda a solucionar casos, com Murilo Borges",
      url: "https://blog.ipog.edu.br/tecnologia/computacao-forense-entenda-como-a-pericia-digital-ajuda-a-solucionar-casos-com-murilo-borges/",
      categoria: "Tecnologia",
      publicado: "2025-09-11",
    },
    {
      titulo: "Ex-aluna do IPOG conquista prêmio de melhor análise em cena de crime simulada na InterForensics",
      url: "https://blog.ipog.edu.br/tecnologia/ex-aluna-ipog-conquista-premio-de-melhor-analise-em-cena-de-crime-simulada-na-interforensics/",
      categoria: "Tecnologia",
      publicado: "2025-09-10",
    },
    {
      titulo: "Por que investir em um MBA em Gestão de TI? Conheça os benefícios",
      url: "https://blog.ipog.edu.br/tecnologia/por-que-investir-em-um-mba-em-gestao-de-ti-conheca-os-beneficios/",
      categoria: "Tecnologia",
      publicado: "2025-07-23",
    },
  ],
  "contabilidade": [
    {
      titulo: "Como a controladoria transforma negócios: o segredo das empresas lucrativas",
      url: "https://blog.ipog.edu.br/contabilidade/como-a-controladoria-transforma-negocios/",
      categoria: "Contabilidade",
      publicado: "2026-04-14",
    },
    {
      titulo: "Reforma Tributária 2026: impactos em holdings, imóveis e empresas (evento com especialistas)",
      url: "https://blog.ipog.edu.br/contabilidade/reforma-tributaria-2026-impacto-em-holdings-imoveis-e-empresas-evento-com-especialistas/",
      categoria: "Contabilidade",
      publicado: "2026-03-23",
    },
    {
      titulo: "Fellipe Guerra, professor do IPOG, toma posse na principal entidade científica da Contabilidade no Brasil",
      url: "https://blog.ipog.edu.br/contabilidade/fellipe-guerra-professor-do-ipog-toma-posse-na-principal-entidade-cientifica-da-contabilidade-no-brasil/",
      categoria: "Contabilidade",
      publicado: "2026-03-17",
    },
    {
      titulo: "Reforma Tributária: por onde começar? Conheça a trilha do conhecimento gratuita do IPOG",
      url: "https://blog.ipog.edu.br/contabilidade/reforma-tributaria-por-onde-comecar-conheca-a-trilha-do-conhecimento-gratuita-do-ipog/",
      categoria: "Contabilidade",
      publicado: "2026-02-09",
    },
  ],
  "psicologia": [
    {
      titulo: "Mês do Psicólogo IPOG: benefícios exclusivos em agosto",
      url: "https://blog.ipog.edu.br/psicologia/mes-do-psicologo-ipog/",
      categoria: "Psicologia",
      publicado: "2026-08-07",
    },
    {
      titulo: "Ética e técnica na Avaliação Psicológica: o que todo psicólogo precisa saber",
      url: "https://blog.ipog.edu.br/psicologia/etica-na-avaliacao-psicologica/",
      categoria: "Psicologia",
      publicado: "2026-05-06",
    },
    {
      titulo: "Transtornos da personalidade e a avaliação psicológica",
      url: "https://blog.ipog.edu.br/psicologia/transtornos-da-personalidade-e-a-avaliacao-psicologica/",
      categoria: "Psicologia",
      publicado: "2026-04-24",
    },
    {
      titulo: "A contribuição da avaliação psicológica no diagnóstico do TEA em adultos",
      url: "https://blog.ipog.edu.br/psicologia/avaliacao-psicologica-diagnostico-tea-adultos/",
      categoria: "Psicologia",
      publicado: "2026-04-24",
    },
  ],
};

/** Artigos do blog associados a uma área. Vazio quando não há correspondência. */
export const artigosDaArea = (slug: string): ArtigoDoBlog[] => ARTIGOS[slug] ?? [];

/** Endereço do blog, usado nas chamadas para ver mais conteúdo. */
export const enderecoDoBlog = "https://blog.ipog.edu.br";
