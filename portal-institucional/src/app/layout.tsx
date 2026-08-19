import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/**
 * Tipografia da marca.
 *
 * O Guia de Expressão da Marca define Degular e Barlow. Degular é uma fonte
 * licenciada da Oh No Type, não distribuída pelo Google Fonts, então o portal usa
 * Barlow e Barlow Condensed, que são as outras famílias oficiais do guia e
 * atendem à combinação da vertical Pós-Graduação: Barlow Condensed em caixa alta
 * para títulos e Barlow para corpo de texto. Ao integrar ao site novo do IPOG,
 * basta adicionar Degular aqui via `next/font/local`.
 */
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow-condensed",
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
      className={`${barlow.variable} ${barlowCondensed.variable}`}
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
