import {
  OG_TAMANHO,
  OG_TIPO,
  imagemDeCompartilhamento,
} from "@/lib/og";

/** Exportação estática: a imagem é gerada no build, não sob demanda. */
export const dynamic = "force-static";

export const size = OG_TAMANHO;
export const contentType = OG_TIPO;
export const alt = "Modalidades de ensino do IPOG: presencial, ao vivo e EaD";

export default function Imagem() {
  return imagemDeCompartilhamento({
    titulo: "Modalidades de ensino do IPOG: presencial, ao vivo e EaD",
    etiqueta: "Cursos",
  });
}
