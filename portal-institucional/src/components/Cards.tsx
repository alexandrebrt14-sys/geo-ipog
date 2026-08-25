/**
 * Cartões de conteúdo do portal: indicadores, áreas de conhecimento e itens
 * genéricos com título e descrição.
 */

import Link from "next/link";
import type { Indicador } from "@/data/institucional";
import type { AreaConhecimento } from "@/data/areas";
import { cursosDaArea } from "@/data/areas";
import { Card, Tag } from "@/components/Layout";

/**
 * Cartão de indicador institucional.
 *
 * O par valor + rótulo é marcado com `dl`/`dt`/`dd`, que é a estrutura que
 * comunica "este número é o valor deste conceito" de forma não ambígua.
 */
export function IndicadorCard({ indicador }: { indicador: Indicador }) {
  return (
    <div className="rounded-card border border-[var(--line)] bg-[var(--surface)] p-6 shadow-card transition-shadow hover:shadow-card-hover">
      <dl>
        <dd className="font-apoio text-fluid-2xl font-bold leading-none text-[var(--acento)]">
          {indicador.valor}
        </dd>
        <dt className="mt-2 font-apoio text-sm font-semibold uppercase tracking-[0.12em] text-conexao-800">
          {indicador.rotulo}
        </dt>
      </dl>
      <p className="mt-3 text-fluid-sm leading-relaxed text-conexao-600">
        {indicador.detalhe}
      </p>
    </div>
  );
}

/** Cartão de área de conhecimento, com prévia dos cursos e cor da área. */
export function AreaCard({ area }: { area: AreaConhecimento }) {
  const cursosDestaArea = cursosDaArea(area.slug);
  const cursosEmDestaque = cursosDestaArea.slice(0, 4);
  const restantes = cursosDestaArea.length - cursosEmDestaque.length;

  return (
    <article
      id={area.slug}
      className="group flex scroll-mt-24 flex-col overflow-hidden rounded-card border border-[var(--line)] bg-[var(--surface)] shadow-card transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      <div
        aria-hidden="true"
        className="h-1.5 w-full"
        style={{ backgroundColor: area.cor }}
      />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-fluid-xl font-semibold normal-case text-conexao-900">
            {area.nome}
          </h3>
          <Tag cor={area.cor}>
            {cursosDestaArea.length}{" "}
            {cursosDestaArea.length === 1 ? "curso" : "cursos"}
          </Tag>
        </div>

        <p className="mt-3 text-fluid-sm leading-relaxed text-conexao-700">
          {area.resumo}
        </p>

        <p className="mt-4 rounded-lg bg-[var(--surface-muted)] p-3 text-fluid-sm leading-relaxed text-conexao-700">
          <span className="font-semibold text-conexao-800">Para quem é: </span>
          {area.paraQuem}
        </p>

        <div className="mt-5 flex-1">
          <h4 className="font-apoio text-xs font-semibold normal-case tracking-[0.14em] text-conexao-600">
            Cursos em destaque
          </h4>
          <ul className="mt-3 space-y-2">
            {cursosEmDestaque.map((curso) => (
              <li
                key={curso.nome}
                className="flex items-start gap-2.5 text-fluid-sm text-conexao-700"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: area.cor }}
                />
                <span>{curso.nome}</span>
              </li>
            ))}
          </ul>
          {restantes > 0 ? (
            <p className="mt-3 text-fluid-sm text-conexao-600">
              e mais {restantes} {restantes === 1 ? "curso" : "cursos"} nesta
              área.
            </p>
          ) : null}
        </div>

        <Link
          href={`/areas-de-conhecimento/${area.slug}`}
          className="mt-6 inline-flex items-center gap-2 font-apoio text-sm font-semibold uppercase tracking-wide text-[var(--acento)] underline-offset-4 transition-colors hover:text-[var(--acento-forte)] hover:underline"
        >
          Ver todos os cursos
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

/** Cartão simples de título e descrição, usado em diferenciais e princípios. */
export function ConteudoCard({
  titulo,
  descricao,
  complemento,
  numero,
}: {
  titulo: string;
  descricao: string;
  complemento?: string;
  numero?: number;
}) {
  return (
    <Card comHover className="flex h-full flex-col">
      {numero !== undefined ? (
        <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--acento-tenue)] font-apoio text-base font-bold text-[var(--acento)]">
          {String(numero).padStart(2, "0")}
        </span>
      ) : null}
      <h3 className="text-fluid-lg font-semibold normal-case text-conexao-900">
        {titulo}
      </h3>
      <p className="mt-3 flex-1 text-fluid-sm leading-relaxed text-conexao-700">
        {descricao}
      </p>
      {complemento ? (
        <p className="mt-4 border-t border-[var(--line)] pt-4 text-fluid-sm leading-relaxed text-conexao-700">
          <span className="font-semibold">Como aplicamos: </span>
          {complemento}
        </p>
      ) : null}
    </Card>
  );
}
