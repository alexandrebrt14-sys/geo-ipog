import {
  OG_TAMANHO,
  OG_TIPO,
  imagemDeCompartilhamento,
} from "@/lib/og";

/** Exportação estática: a imagem é gerada no build, não sob demanda. */
export const dynamic = "force-static";

export const size = OG_TAMANHO;
export const contentType = OG_TIPO;
export const alt = "Hub de autoridade do IPOG";

export default function Imagem() {
  return imagemDeCompartilhamento({
    titulo: "Hub de autoridade do IPOG",
    etiqueta: "Sobre o IPOG",
  });
}
