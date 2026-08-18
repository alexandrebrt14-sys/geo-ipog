/**
 * Marca do portal em SVG.
 *
 * Reprodução tipográfica do logotipo, feita para o portal. Não substitui o
 * arquivo oficial de logotipo do Guia de Expressão da Marca: ao integrar ao site
 * novo do IPOG, troque este componente pelo SVG oficial fornecido pelo Marketing.
 */

type LogoProps = {
  className?: string;
  /** Cor do lettering. Use `currentColor` para herdar do contexto. */
  cor?: string;
};

export function Logo({ className, cor = "currentColor" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 132 36"
      role="img"
      aria-label="IPOG"
      className={className}
      fill="none"
    >
      <rect width="8" height="36" rx="1.5" fill="#d71c37" />
      <text
        x="18"
        y="27"
        fill={cor}
        fontFamily="Barlow Condensed, Arial Narrow, sans-serif"
        fontSize="30"
        fontWeight="700"
        letterSpacing="1.5"
      >
        IPOG
      </text>
    </svg>
  );
}
