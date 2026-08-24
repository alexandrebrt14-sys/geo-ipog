import type { Metadata } from "next";
import { site, absoluteUrl } from "@/lib/site";

/**
 * Monta o objeto Metadata de uma rota.
 *
 * Existe porque, no Next, declarar `openGraph` em uma página substitui o objeto
 * herdado do layout em vez de mesclá-lo campo a campo. Uma rota que só queira
 * trocar o título acabaria, sem perceber, publicando sem parte dos metadados
 * sociais. Centralizar a construção aqui garante que toda rota saia com o
 * conjunto completo e com a URL canônica na mesma forma servida pelo export.
 *
 * **A imagem não é declarada aqui.** Cada rota tem um `opengraph-image.tsx` ao
 * lado do seu `page.tsx`, e o Next mescla essa imagem na metadata da rota
 * sozinho, com largura, altura, tipo e texto alternativo. Declarar `images`
 * neste objeto sobrescreveria a imagem da rota e devolveria o portal ao estado
 * anterior, em que as 23 páginas compartilhavam a mesma figura.
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
    },
    twitter: {
      card: "summary_large_image",
      title: params.titulo,
      description: params.descricao,
    },
  };
}
