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
    label: "Áreas de conhecimento",
    description: "Portfólio de pós-graduação e extensão por área",
  },
  {
    href: "/unidades",
    label: "Unidades",
    description: "Cidades e estados atendidos pelo IPOG",
  },
  {
    href: "/metodo",
    label: "Método IPOG",
    description: "Metodologia de ensino, formato e critérios acadêmicos",
  },
  {
    href: "/autoridade",
    label: "Hub de autoridade",
    description: "Credenciais, indicadores e fontes verificáveis",
  },
  {
    href: "/faq",
    label: "Perguntas frequentes",
    description: "Respostas diretas às dúvidas mais comuns",
  },
  {
    href: "/sobre",
    label: "Sobre o IPOG",
    description: "História, propósito, valores e contatos",
  },
];

/** Todas as rotas estáticas do portal, usadas pelo sitemap. */
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
