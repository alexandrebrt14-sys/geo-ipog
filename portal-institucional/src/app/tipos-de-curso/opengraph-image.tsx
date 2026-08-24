import {
  OG_TAMANHO,
  OG_TIPO,
  imagemDeCompartilhamento,
} from "@/lib/og";

/** Exportação estática: a imagem é gerada no build, não sob demanda. */
export const dynamic = "force-static";

export const size = OG_TAMANHO;
export const contentType = OG_TIPO;
export const alt = "Tipos de curso do IPOG: pós-graduação, graduação e extensão";

export default function Imagem() {
  return imagemDeCompartilhamento({
    titulo: "Tipos de curso do IPOG: pós-graduação, graduação e extensão",
    etiqueta: "Cursos",
  });
}
