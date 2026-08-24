import { ImageResponse } from "next/og";

import { instituicao } from "@/data/institucional";

/**
 * Geração da imagem de compartilhamento de cada rota.
 *
 * O portal servia a mesma imagem em todas as páginas, e ela era um **SVG**.
 * Nenhuma das redes que consomem Open Graph renderiza SVG: Facebook, LinkedIn,
 * WhatsApp e X descartam o arquivo e mostram o link sem prévia. Na prática o
 * portal inteiro compartilhava sem imagem.
 *
 * Aqui a imagem passa a ser PNG, gerada no build, uma por rota e com o título
 * daquela rota. Como o portal é exportado estaticamente, a geração acontece uma
 * vez, na integração, e o que vai para a CDN é um arquivo pronto.
 *
 * O desenho segue o Guia de Expressão da Marca 2025: fundo em Vinho
 * Determinação abrindo para Vermelho Protagonismo, que são cores da paleta
 * principal, e o branco sempre presente. O texto é o elemento dominante, porque
 * a imagem é lida em miniatura na maioria das vezes.
 */

export const OG_TAMANHO = { width: 1200, height: 630 };
export const OG_TIPO = "image/png";

/** Cores literais: o CSS de tokens não alcança o renderizador da imagem. */
const VINHO = "#481a1f";
const VERMELHO = "#b41630";
const PROTAGONISMO = "#e64465";

export function imagemDeCompartilhamento({
  titulo,
  descricao,
  etiqueta,
}: {
  titulo: string;
  /** Linha de apoio. Opcional: em título longo, ela atrapalha mais que ajuda. */
  descricao?: string;
  /** Rótulo curto acima do título, como a seção a que a rota pertence. */
  etiqueta?: string;
}) {
  // Título longo em corpo grande estoura a caixa. A escala reage ao tamanho do
  // texto em vez de truncar, que cortaria justamente a parte informativa.
  const corpoDoTitulo =
    titulo.length > 78 ? 54 : titulo.length > 48 ? 66 : 82;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `linear-gradient(120deg, ${VINHO} 0%, ${VINHO} 52%, ${VERMELHO} 100%)`,
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 14,
                height: 44,
                background: PROTAGONISMO,
                borderRadius: 999,
                display: "flex",
              }}
            />
            <div
              style={{
                fontSize: 27,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: "uppercase",
                display: "flex",
              }}
            >
              Portal GEO IPOG
            </div>
          </div>

          {etiqueta ? (
            <div
              style={{
                fontSize: 24,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#f7a5b3",
                display: "flex",
              }}
            >
              {etiqueta}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: corpoDoTitulo,
              fontWeight: 700,
              lineHeight: 1.12,
              display: "flex",
              maxWidth: 1000,
            }}
          >
            {titulo}
          </div>

          {descricao ? (
            <div
              style={{
                fontSize: 29,
                lineHeight: 1.4,
                color: "rgba(255,255,255,0.82)",
                display: "flex",
                maxWidth: 940,
              }}
            >
              {descricao}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.22)",
            paddingTop: 26,
            fontSize: 24,
            color: "rgba(255,255,255,0.75)",
          }}
        >
          <div style={{ display: "flex" }}>{instituicao.nomeCompleto}</div>
          <div style={{ display: "flex" }}>posgraduacaopsicologia.com/ipog</div>
        </div>
      </div>
    ),
    OG_TAMANHO,
  );
}

/**
 * Corta a descrição no limite de palavras que cabe sob o título.
 *
 * Corta em espaço, e não no meio da palavra, e só acrescenta reticências quando
 * de fato sobrou texto.
 */
export function resumirParaOg(texto: string, limite = 128): string {
  if (texto.length <= limite) return texto;
  const cortado = texto.slice(0, limite);
  const ultimoEspaco = cortado.lastIndexOf(" ");
  return `${cortado.slice(0, ultimoEspaco > 0 ? ultimoEspaco : limite).trimEnd()}…`;
}
