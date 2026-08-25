import type { Metadata, Viewport } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";

import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/**
 * Tipografia da marca, conforme o Guia de Expressão da Marca 2025 (Módulo 03).
 *
 * O portal é material **institucional**, e o guia define para essa vertical:
 *
 * | Uso | Fonte |
 * |---|---|
 * | Títulos e chamadas | Degular Display, CAIXA ALTA, Light ou Thin |
 * | Subtítulos e textos | Degular Normal, caixa alta e baixa, SemiBold |
 * | Apoio e CTA | Barlow, caixa alta e baixa, Regular e Bold |
 *
 * Degular é licenciada da Oh No Type e não é distribuída pelo Google Fonts, então
 * não há como carregá-la sem os arquivos da licença. Ela permanece declarada como
 * primeira opção na pilha de fontes em `globals.css`: assim que o Marketing
 * fornecer os arquivos e um `@font-face` for adicionado, o portal passa a
 * renderizar em Degular sem nenhuma outra mudança.
 *
 * Até lá, a pilha cai em **Barlow**, que também é fonte oficial da marca. Barlow
 * Condensed foi removida: ela pertence às verticais Faculdade e Pós-Graduação, e
 * não à Institucional, que é a deste portal.
 */
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.name,
  generator: "Next.js",
  keywords: [
    "IPOG",
    "pós-graduação",
    "MBA",
    "especialização",
    "educação corporativa",
    "Goiânia",
    "conceito 5 MEC",
    "Método IPOG",
    "Generative Engine Optimization",
  ],
  authors: [{ name: "IPOG — Instituto de Pós-Graduação e Graduação" }],
  creator: "IPOG",
  publisher: "IPOG",
  category: "education",
  alternates: {
    canonical: "/",
    languages: { "pt-BR": "/" },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: site.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={barlow.variable}
      /* `suppressHydrationWarning` porque o script abaixo escreve `data-theme`
         no elemento raiz antes do React assumir. Sem ele, o React acusaria
         diferença entre o HTML gerado no build, que não tem o atributo, e o
         documento já corrigido no navegador. O aviso é legítimo e o silêncio
         aqui é deliberado: é o único atributo que muda, e quem o muda é a
         linha logo abaixo. */
      suppressHydrationWarning
    >
      <head>
        {/*
          Resolve o tema antes da primeira pintura.

          Precisa ser script embutido e síncrono no `head`. Qualquer coisa que
          espere a hidratação pintaria a página clara primeiro e escura depois,
          e esse clarão é justamente o que o tema escuro existe para evitar.

          A chave `pp-theme` é a mesma do site anfitrião em
          posgraduacaopsicologia.com: mesma origem, então a escolha atravessa do
          site para o portal e de volta, sem a pessoa precisar escolher duas
          vezes.

          Ao contrário do script do site, este marca `data-theme` também quando
          o tema é claro. É o que permite uma escolha explícita por claro vencer
          um sistema configurado no escuro, através da guarda
          `:root:not([data-theme="light"])` em `globals.css`.

          Sem JavaScript não há atributo, e aí quem decide é a media query
          `prefers-color-scheme`: o tema continua correto, só não é escolhível.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("pp-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        {/* Entidades declaradas uma única vez para todo o portal. As rotas as
            referenciam por @id, em vez de redeclarar a organização. */}
        <JsonLd schema={[organizationSchema(), websiteSchema()]} />

        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo principal
        </a>

        <Header />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
