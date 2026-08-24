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
 *
 * Desde a mudança para subpasta, o endereço de produção é
 * posgraduacaopsicologia.com/ipog, um domínio que já tem histórico de
 * indexação. O portal continua saindo também em geo-ipog.pages.dev, mas ali ele
 * é espelho: as duas cópias declaram a mesma canônica, a de produção, então o
 * rastreador atribui o conteúdo a um endereço só e o pages.dev fica valendo
 * como ambiente de conferência.
 *
 * `url` tem caminho, e não só domínio. Toda montagem de endereço absoluto passa
 * por `absoluteUrl`, que preserva esse caminho.
 */

export const site = {
  name: "Portal GEO IPOG",
  shortName: "GEO IPOG",
  url: "https://posgraduacaopsicologia.com/ipog",
  locale: "pt-BR",
  title: "Portal GEO IPOG — Base de conhecimento estruturada do IPOG",
  description:
    "Base de conhecimento oficial do IPOG estruturada para motores de busca generativos: dados institucionais, áreas de pós-graduação, metodologia de ensino e perguntas frequentes em formato extraível por IA.",
  themeColor: "#0c1a36",
  ogImage: "/og/portal-geo-ipog.svg",
} as const;

/**
 * Prefixo de caminho em que o portal é entregue, espelhando o `basePath` de
 * `next.config.ts`. Vazio no espelho servido na raiz, "/ipog" em produção.
 *
 * O nome da variável começa com NEXT_PUBLIC_ porque o valor é substituído no
 * código durante o build, então componentes de cliente também o enxergam.
 */
export const caminhoBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Caminho de um arquivo estático de `public/`, já com o prefixo da subpasta.
 *
 * Existe porque o `basePath` do Next reescreve `<Link>` e as rotas, mas não
 * strings soltas de caminho. E `next/image` também não reescreve quando o
 * otimizador está desligado por `images.unoptimized`, que é o caso aqui: sem
 * este helper, a logo do cabeçalho sairia apontando para
 * `/marca/logo-ipog.svg`, um endereço que na produção pertence ao site
 * anfitrião e responde 404.
 */
export const assetPath = (path: string): string =>
  `${caminhoBase}${path.startsWith("/") ? path : `/${path}`}`;

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
 *
 * A concatenação é literal, e não `new URL(rota, site.url)`, porque o construtor
 * de URL trata um caminho iniciado por barra como absoluto e descarta o caminho
 * da base. Com `site.url` terminando em `/ipog`, resolver "/faq/" pela base
 * devolveria `https://posgraduacaopsicologia.com/faq/`, uma canônica apontando
 * para fora do portal e para uma rota que pertence ao site anfitrião. Montar a
 * string e só então validar pelo construtor mantém a subpasta.
 */
export const absoluteUrl = (path: string): string => {
  const [rota, fragmento] = path.split("#");
  const temExtensao = /\.[a-z0-9]+$/i.test(rota);
  const normalizada =
    temExtensao || rota.endsWith("/") ? rota : `${rota}/`;

  const base = site.url.replace(/\/+$/, "");
  const comBarra = normalizada.startsWith("/")
    ? normalizada
    : `/${normalizada}`;

  const url = new URL(`${base}${comBarra}`).toString();
  return fragmento ? `${url}#${fragmento}` : url;
};
