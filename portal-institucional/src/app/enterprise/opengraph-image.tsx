import {
  OG_TAMANHO,
  OG_TIPO,
  imagemDeCompartilhamento,
} from "@/lib/og";

/** Exportação estática: a imagem é gerada no build, não sob demanda. */
export const dynamic = "force-static";

export const size = OG_TAMANHO;
export const contentType = OG_TIPO;
export const alt = "IPOG Enterprise: educação corporativa para empresas";

export default function Imagem() {
  return imagemDeCompartilhamento({
    titulo: "IPOG Enterprise: educação corporativa para empresas",
    etiqueta: "Para empresas",
  });
}
