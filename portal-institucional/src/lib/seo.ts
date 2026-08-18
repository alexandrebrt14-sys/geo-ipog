import type { Metadata } from "next";
import { site, absoluteUrl } from "@/lib/site";

/**
 * Monta o objeto Metadata de uma rota.
 *
 * Existe porque, no Next, declarar `openGraph` em uma página substitui o objeto
 * herdado do layout em vez de mesclá-lo campo a campo. Uma rota que só queira
 * trocar o título acabaria, sem perceber, publicando sem `og:image`. Centralizar
 * a construção aqui garante que toda rota saia com o conjunto completo de
 * metadados sociais e com a URL canônica na mesma forma servida pelo export.
 */
export function criarMetadata(params: {
  titulo: string;
  descricao: string;
  path: string;
}): Metadata {
  const canonica = absoluteUrl(params.path);

  return {
    title: params.titulo,
    description: params.descricao,
    alternates: { canonical: canonica },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: site.name,
      title: params.titulo,
      description: params.descricao,
      url: canonica,
      images: [
        {
          url: site.ogImage,
          width: 1200,
          height: 630,
          alt: `${params.titulo} — ${site.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: params.titulo,
      description: params.descricao,
      images: [site.ogImage],
    },
  };
}
