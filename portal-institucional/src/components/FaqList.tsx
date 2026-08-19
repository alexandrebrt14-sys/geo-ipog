/**
 * Lista de perguntas frequentes.
 *
 * Usa `details`/`summary` nativos de propósito: o texto da resposta permanece no
 * HTML entregue ao crawler mesmo quando o item está fechado, ao contrário de um
 * acordeão controlado por estado, que só monta o conteúdo depois do clique.
 * Isso mantém a página inteira extraível sem executar JavaScript.
 */

import type { PerguntaFrequente } from "@/data/faq";

export function FaqList({
  perguntas,
}: {
  perguntas: ReadonlyArray<PerguntaFrequente>;
}) {
  return (
    <div className="divide-y divide-digital-100 overflow-hidden rounded-card border border-digital-100 bg-white shadow-card">
      {perguntas.map((item) => (
        <details
          key={item.id}
          id={item.id}
          className="group scroll-mt-28 open:bg-digital-50/40"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 transition-colors hover:bg-digital-50 sm:p-6 [&::-webkit-details-marker]:hidden">
            {/* A pergunta é texto corrido, não chamada: usa a família de corpo
                (Barlow) em vez da condensada reservada a títulos. */}
            <h3 className="font-sans text-fluid-lg font-semibold normal-case tracking-normal text-digital-800">
              {item.pergunta}
            </h3>
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-digital-200 text-digital-600 transition-transform duration-200 group-open:rotate-45 group-open:border-protagonismo-300 group-open:bg-protagonismo-50 group-open:text-protagonismo-600"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="h-3.5 w-3.5"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <div className="px-5 pb-6 sm:px-6">
            <p className="max-w-3xl text-fluid-base leading-relaxed text-conexao-700">
              {item.resposta}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
