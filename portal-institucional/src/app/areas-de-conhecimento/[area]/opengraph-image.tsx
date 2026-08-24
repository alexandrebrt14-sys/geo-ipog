import {
  OG_TAMANHO,
  OG_TIPO,
  imagemDeCompartilhamento,
  resumirParaOg,
} from "@/lib/og";
import { areasDeConhecimento, estatisticasDaArea } from "@/data/areas";

/**
 * Imagem de compartilhamento das doze áreas de conhecimento.
 *
 * Cada área ganha a sua, com o nome da área no título e o total real de cursos
 * na linha de apoio, lido do mesmo catálogo que alimenta a página. Um link para
 * Psicologia e um link para Engenharia deixam de compartilhar a mesma prévia.
 */

/** Exportação estática: as doze imagens são geradas no build. */
export const dynamic = "force-static";

export const size = OG_TAMANHO;
export const contentType = OG_TIPO;

/**
 * O texto alternativo é fixo porque `alt` de rota de imagem é uma constante do
 * módulo, avaliada uma vez. A alternativa seria `generateImageMetadata`, que
 * permite `alt` por área mas insere um segmento extra na URL da imagem. Uma
 * URL mais previsível vale mais do que a variação nesse `alt`, que só é lido
 * por quem inspeciona a metadata: o texto que a pessoa vê ao compartilhar é o
 * título desenhado dentro da própria imagem, e esse varia por área.
 */
export const alt = "Área de conhecimento do IPOG, com o total de cursos do catálogo";

/** Sem isto, o export estático não sabe para quais áreas gerar a imagem. */
export function generateStaticParams() {
  return areasDeConhecimento.map((area) => ({ area: area.slug }));
}

type Props = { params: Promise<{ area: string }> };

export default async function Imagem({ params }: Props) {
  const { area: slug } = await params;
  const area = areasDeConhecimento.find((item) => item.slug === slug);

  if (!area) {
    return imagemDeCompartilhamento({
      titulo: "Áreas de conhecimento e cursos do IPOG",
      etiqueta: "Cursos",
    });
  }

  const stats = estatisticasDaArea(area.slug);

  return imagemDeCompartilhamento({
    titulo: `${area.nome}: cursos do IPOG na área`,
    etiqueta: "Área de conhecimento",
    descricao: resumirParaOg(
      `${stats.total} ${stats.total === 1 ? "curso" : "cursos"} no catálogo. ${area.resumo}`,
    ),
  });
}
