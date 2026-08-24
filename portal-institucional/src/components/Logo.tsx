/**
 * Assinatura visual do IPOG.
 *
 * Usa os arquivos oficiais publicados pelo próprio IPOG em ipog.edu.br, e não
 * uma reprodução. O Guia de Expressão da Marca 2025 é explícito na p. 82: não
 * alterar cor, tipografia, espaçamento entre letras nem a posição do descritivo
 * em relação ao logotipo. Por isso os SVGs em `public/marca/` são reproduzidos
 * como estão, sem recolorir por CSS.
 *
 * O guia define duas aplicações sobre a cor de fundo:
 *
 * - **positiva**: preferencial, para fundo claro.
 * - **negativa**: para fundo escuro ou sobre imagem, quando a positiva perde
 *   contraste.
 *
 * A assinatura reúne o logotipo e o descritivo "Instituto de Pós-Graduação &
 * Graduação". É a versão mais completa da marca, indicada quando há espaço.
 */

import Image from "next/image";

import { assetPath } from "@/lib/site";

/** Proporção do arquivo oficial, usada para reservar espaço e evitar salto de layout. */
const LARGURA_ORIGINAL = 200;
const ALTURA_ORIGINAL = 28;

type LogoProps = {
  className?: string;
  /** `negativa` para fundo escuro. Padrão `positiva`, a aplicação preferencial. */
  variante?: "positiva" | "negativa";
  /**
   * Marca o logo como decorativo. Use quando o link ou o contêiner que envolve
   * o logo já tiver um rótulo acessível, para o leitor de tela não anunciar
   * duas vezes a mesma coisa.
   */
  decorativo?: boolean;
};

export function Logo({
  className,
  variante = "positiva",
  decorativo = false,
}: LogoProps) {
  const arquivo = assetPath(
    variante === "negativa"
      ? "/marca/logo-ipog-branca.svg"
      : "/marca/logo-ipog.svg",
  );

  return (
    <Image
      src={arquivo}
      alt={decorativo ? "" : "IPOG — Instituto de Pós-Graduação e Graduação"}
      aria-hidden={decorativo || undefined}
      width={LARGURA_ORIGINAL}
      height={ALTURA_ORIGINAL}
      className={className}
      priority
    />
  );
}
