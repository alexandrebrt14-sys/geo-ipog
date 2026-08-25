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
  /**
   * Texto da `meta description`, quando ele precisa ser diferente do resumo
   * exibido na página.
   *
   * Os dois nasceram iguais e isso ficou apertado. O resumo visível é o
   * parágrafo de resposta direta, que existe para ser extraído por motor
   * generativo e por isso é denso de propósito. A `meta description` é uma
   * linha de vitrine no resultado de busca, cortada por volta de 160
   * caracteres. Servir o mesmo texto aos dois papéis publicava descrição
   * cortada no meio da frase em todas as 23 rotas, uma delas com 364
   * caracteres, mais do que o dobro do que aparece.
   *
   * Quando ausente, cai no resumo, que continua sendo o comportamento certo
   * para rota cujo resumo já cabe.
   */
  descricaoMeta?: string;
}): Metadata {
  const canonica = absoluteUrl(params.path);
  const descricaoParaBusca = params.descricaoMeta ?? params.descricao;

  return {
    title: params.titulo,
    description: descricaoParaBusca,
    alternates: { canonical: canonica },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: site.name,
      title: params.titulo,
      description: descricaoParaBusca,
      url: canonica,
    },
    twitter: {
      card: "summary_large_image",
      title: params.titulo,
      description: descricaoParaBusca,
    },
  };
}
