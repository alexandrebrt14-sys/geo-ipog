import { site } from "@/lib/site";
import {
  OG_TAMANHO,
  OG_TIPO,
  imagemDeCompartilhamento,
  resumirParaOg,
} from "@/lib/og";

/** Exportação estática: a imagem é gerada no build, não sob demanda. */
export const dynamic = "force-static";

export const size = OG_TAMANHO;
export const contentType = OG_TIPO;
export const alt = site.title;

export default function Imagem() {
  return imagemDeCompartilhamento({
    titulo: "Base de conhecimento estruturada do IPOG",
    descricao: resumirParaOg(site.description),
  });
}
