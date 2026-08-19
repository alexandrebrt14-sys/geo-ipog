/**
 * Configuração central do Portal GEO IPOG.
 *
 * Ponto único de verdade para domínio, rotas e identidade da instituição.
 * Ao plugar o portal no site novo do IPOG, basta ajustar `url`.
 *
 * `url` precisa apontar para o endereço onde o portal está publicado de fato.
 * Ele alimenta a URL canônica, o sitemap, o robots e os identificadores JSON-LD.
 * Enquanto apontava para geo.ipog.edu.br, um subdomínio que ainda não existe,
 * cada página declarava como canônico um endereço que não resolvia, o que leva
 * o rastreador a descartar o conteúdo ou a não saber a quem atribuí-lo.
 */

export const site = {
  name: "Portal GEO IPOG",
  shortName: "GEO IPOG",
  url: "https://geo-ipog.pages.dev",
  locale: "pt-BR",
  title: "Portal GEO IPOG — Base de conhecimento estruturada do IPOG",
  description:
    "Base de conhecimento oficial do IPOG estruturada para motores de busca generativos: dados institucionais, áreas de pós-graduação, metodologia de ensino e perguntas frequentes em formato extraível por IA.",
  themeColor: "#0c1a36",
  ogImage: "/og/portal-geo-ipog.svg",
} as const;

export type NavItem = {
  href: string;
  label: string;
  description: string;
};

/** Navegação principal — espelha a arquitetura de rotas do portal. */
export const navigation: NavItem[] = [
  {
    href: "/",
    label: "Início",
    description: "Visão geral do IPOG em dados estruturados",
  },
  {
    href: "/areas-de-conhecimento",
    label: "Áreas",
    description: "Portfólio de pós-graduação e extensão por área",
  },
  {
    href: "/tipos-de-curso",
    label: "Formações",
    description:
      "Pós-graduação, graduação, extensão e educação corporativa, lado a lado",
  },
  {
    href: "/modalidades",
    label: "Modalidades",
    description: "Presencial, ao vivo e EaD: como cada uma funciona",
  },
  {
    href: "/enterprise",
    label: "Enterprise",
    description: "Educação corporativa e trilhas de capacitação para empresas",
  },
  {
    href: "/ipog-hub",
    label: "HUB",
    description: "Locação de espaços para eventos, treinamentos e reuniões",
  },
  {
    href: "/unidades",
    label: "Unidades",
    description: "Cidades e estados atendidos pelo IPOG",
  },
  {
    href: "/metodo",
    label: "Método",
    description: "Metodologia de ensino, formato e critérios acadêmicos",
  },
  {
    href: "/autoridade",
    label: "Autoridade",
    description: "Credenciais, indicadores e fontes verificáveis",
  },
  {
    href: "/faq",
    label: "Perguntas",
    description: "Respostas diretas às dúvidas mais comuns",
  },
  {
    href: "/sobre",
    label: "Sobre",
    description: "História, propósito, valores e contatos",
  },
];

/** Todas as rotas estáticas do portal, usadas pelo sitemap. */
export type GrupoDeMenu = {
  /** Rótulo do grupo na barra. */
  label: string;
  /** Rotas do grupo, na ordem em que aparecem. */
  rotas: string[];
};

/**
 * Agrupamento do menu principal.
 *
 * A barra chegou a dez itens soltos e passou a exigir 1247px de largura, o que
 * a fazia sumir por completo em qualquer tela menor que 1280px: quem estava num
 * notebook, ou com a escala do Windows em 125%, só via o menu recolhido. Quatro
 * grupos resolvem isso e ainda deixam espaço para o portal crescer.
 *
 * Os grupos referenciam rotas em vez de repetir rótulo e descrição, então
 * `navigation` continua sendo a fonte única para rodapé, painel do celular e
 * llms.txt.
 */
export const menuPrincipal: GrupoDeMenu[] = [
  {
    label: "Cursos",
    rotas: ["/areas-de-conhecimento", "/tipos-de-curso", "/modalidades"],
  },
  { label: "Para empresas", rotas: ["/enterprise", "/ipog-hub"] },
  { label: "Sobre o IPOG", rotas: ["/metodo", "/autoridade", "/unidades", "/sobre"] },
  { label: "Perguntas", rotas: ["/faq"] },
];

/** Itens de navegação de um grupo, resolvidos a partir de `navigation`. */
export const itensDoGrupo = (grupo: GrupoDeMenu): NavItem[] =>
  grupo.rotas
    .map((rota) => navigation.find((item) => item.href === rota))
    .filter((item): item is NavItem => item !== undefined);

/**
 * Rotas estáticas do portal, usadas pelo sitemap e pelo llms.txt.
 *
 * As páginas de cada área de conhecimento não entram aqui: elas são derivadas
 * de `areasDeConhecimento` e acrescentadas no sitemap, para que uma área nova
 * apareça sem precisar de edição manual em dois lugares.
 */
export const routes = [
  "/",
  "/areas-de-conhecimento",
  "/tipos-de-curso",
  "/modalidades",
  "/enterprise",
  "/ipog-hub",
  "/unidades",
  "/metodo",
  "/autoridade",
  "/faq",
  "/sobre",
] as const;

/**
 * Resolve um caminho interno para URL absoluta.
 *
 * O build usa `trailingSlash: true`, então cada rota é servida com barra final.
 * A normalização aqui mantém sitemap, URL canônica e identificadores JSON-LD na
 * mesma forma que o servidor entrega, evitando que um motor trate
 * `/faq` e `/faq/` como dois endereços distintos.
 *
 * Arquivos com extensão, como `sitemap.xml`, e fragmentos são preservados.
 */
export const absoluteUrl = (path: string): string => {
  const [rota, fragmento] = path.split("#");
  const temExtensao = /\.[a-z0-9]+$/i.test(rota);
  const normalizada =
    temExtensao || rota.endsWith("/") ? rota : `${rota}/`;

  const url = new URL(normalizada, site.url).toString();
  return fragmento ? `${url}#${fragmento}` : url;
};
