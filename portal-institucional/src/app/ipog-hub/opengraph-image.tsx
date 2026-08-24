import {
  OG_TAMANHO,
  OG_TIPO,
  imagemDeCompartilhamento,
} from "@/lib/og";

/** Exportação estática: a imagem é gerada no build, não sob demanda. */
export const dynamic = "force-static";

export const size = OG_TAMANHO;
export const contentType = OG_TIPO;
export const alt = "IPOG HUB: locação de espaços para eventos e treinamentos";

export default function Imagem() {
  return imagemDeCompartilhamento({
    titulo: "IPOG HUB: locação de espaços para eventos e treinamentos",
    etiqueta: "Para empresas",
  });
}
