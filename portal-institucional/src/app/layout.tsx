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
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: "Portal GEO IPOG — base de conhecimento estruturada",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [site.ogImage],
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
    >
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
