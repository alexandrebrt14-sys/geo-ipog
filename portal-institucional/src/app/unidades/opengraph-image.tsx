import {
  OG_TAMANHO,
  OG_TIPO,
  imagemDeCompartilhamento,
} from "@/lib/og";

/** Exportação estática: a imagem é gerada no build, não sob demanda. */
export const dynamic = "force-static";

export const size = OG_TAMANHO;
export const contentType = OG_TIPO;
export const alt = "Unidades do IPOG: cidades e estados atendidos";

export default function Imagem() {
  return imagemDeCompartilhamento({
    titulo: "Unidades do IPOG: cidades e estados atendidos",
    etiqueta: "Sobre o IPOG",
  });
}
