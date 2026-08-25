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
  /**
   * `negativa` para fundo escuro e `positiva` para fundo claro, que é o padrão
   * e a aplicação preferencial do guia. `automatica` entrega as duas e deixa o
   * CSS escolher, para superfície que muda de cor conforme o tema.
   */
  variante?: "positiva" | "negativa" | "automatica";
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
  const alt = decorativo
    ? ""
    : "IPOG — Instituto de Pós-Graduação e Graduação";

  /**
   * Superfície que muda de cor conforme o tema, como o cabeçalho.
   *
   * Os arquivos oficiais são dois SVGs de cor fixa, e o guia proíbe recolorir a
   * marca por CSS, então não há como derivar um do outro. A saída é entregar os
   * dois no HTML e deixar o CSS mostrar o que corresponde ao tema, o que
   * funciona antes da hidratação e continua funcionando sem JavaScript.
   *
   * O custo é baixar 23 KB a mais, o dos dois arquivos em vez de um. É o preço
   * de trocar a aplicação da marca sem depender de script, e os dois ficam em
   * cache por um ano.
   */
  if (variante === "automatica") {
    return (
      <>
        <Image
          src={assetPath("/marca/logo-ipog.svg")}
          alt={alt}
          aria-hidden={decorativo || undefined}
          width={LARGURA_ORIGINAL}
          height={ALTURA_ORIGINAL}
          className={`logo-no-claro ${className ?? ""}`}
        />
        <Image
          src={assetPath("/marca/logo-ipog-branca.svg")}
          /* O texto alternativo fica só no primeiro: os dois representam a
             mesma marca, e anunciar duas vezes seria ruído no leitor de tela. */
          alt=""
          aria-hidden
          width={LARGURA_ORIGINAL}
          height={ALTURA_ORIGINAL}
          className={`logo-no-escuro ${className ?? ""}`}
        />
      </>
    );
  }

  const arquivo = assetPath(
    variante === "negativa"
      ? "/marca/logo-ipog-branca.svg"
      : "/marca/logo-ipog.svg",
  );

  return (
    <Image
      src={arquivo}
      alt={alt}
      aria-hidden={decorativo || undefined}
      width={LARGURA_ORIGINAL}
      height={ALTURA_ORIGINAL}
      className={className}
      priority
    />
  );
}
