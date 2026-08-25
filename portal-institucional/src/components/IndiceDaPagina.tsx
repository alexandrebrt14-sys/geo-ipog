/**
 * Índice fixo das seções de uma página longa.
 *
 * A página de uma área de conhecimento chega a quinze telas de rolagem, com oito
 * seções e treze âncoras, e não havia nenhuma forma de pular. Quem queria só a
 * lista de cursos passava por quatro blocos de pergunta e resposta e pelo FAQ
 * inteiro antes de chegar lá.
 *
 * A barra gruda logo abaixo do cabeçalho principal e rola na horizontal quando
 * não cabe, o que resolve o mesmo problema em tela pequena sem precisar de menu
 * separado. Não usa JavaScript: são âncoras comuns, então funciona igual para
 * quem chega pelo teclado, pelo leitor de tela ou por um rastreador.
 *
 * O deslocamento de rolagem das seções vive em `globals.css`, na propriedade
 * `scroll-padding-top` do html, e precisa acomodar a altura das duas barras
 * somadas, senão o título da seção fica escondido atrás delas ao pular.
 */

import Link from "next/link";
import { Container } from "@/components/Layout";

export type ItemDoIndice = {
  /** Âncora da seção, com o `#`. */
  href: string;
  rotulo: string;
};

export function IndiceDaPagina({ itens }: { itens: readonly ItemDoIndice[] }) {
  if (itens.length === 0) return null;

  return (
    <nav
      aria-label="Índice desta página"
      className="sticky top-16 z-40 border-b border-[var(--line)] bg-[var(--barra)] backdrop-blur supports-[backdrop-filter]:bg-[var(--barra-translucida)] sm:top-20"
    >
      <Container className="py-2.5">
        {/* A rolagem horizontal usa `-mx-4 px-4` para que o primeiro e o último
            item encostem na margem do contêiner, e não em uma borda cortada. */}
        <ul className="-mx-4 flex snap-x gap-1.5 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {itens.map((item) => (
            <li key={item.href} className="snap-start">
              <Link
                href={item.href}
                /* `min-h-11` garante os 44px de alvo de toque no celular, onde
                   a barra é a principal forma de navegar pela página. No
                   desktop, com cursor, a altura pode encolher. */
                className="inline-flex min-h-11 items-center whitespace-nowrap rounded-pill px-3.5 py-1.5 font-apoio text-xs font-semibold uppercase tracking-wide text-conexao-700 transition-colors hover:bg-[var(--acento-tenue)] hover:text-[var(--acento-tenue-texto)] sm:min-h-9"
              >
                {item.rotulo}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
