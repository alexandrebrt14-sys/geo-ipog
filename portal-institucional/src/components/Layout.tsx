/**
 * Primitivas de layout e tipografia reutilizadas por todas as rotas.
 *
 * Foram isoladas aqui para que a integração com o site novo do IPOG possa
 * substituir a casca visual sem tocar no conteúdo das páginas.
 */

import Link from "next/link";
import type { ReactNode } from "react";

/** Contêiner com largura máxima e respiro lateral responsivo. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Seção semântica com título acessível.
 *
 * Recebe sempre um `id`, usado tanto como âncora de navegação quanto como alvo
 * do `aria-labelledby`, o que dá ao motor generativo um endereço estável para
 * citar cada bloco de conteúdo.
 */
export function Section({
  id,
  titulo,
  descricao,
  children,
  tom = "claro",
  nivel = 2,
}: {
  id: string;
  titulo: string;
  descricao?: ReactNode;
  children: ReactNode;
  tom?: "claro" | "suave" | "escuro";
  nivel?: 2 | 3;
}) {
  const fundos = {
    claro: "bg-white",
    suave: "bg-[var(--surface-muted)]",
    escuro: "bg-[var(--surface-inverse)] text-white",
  } as const;

  const Titulo = nivel === 2 ? "h2" : "h3";

  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className={`scroll-mt-24 py-14 sm:py-20 ${fundos[tom]}`}
    >
      <Container>
        <header className="max-w-3xl">
          {/* Nível 2 é "título e chamada" no guia: caixa alta, peso Light.
              Nível 3 é "subtítulo": caixa alta e baixa, peso SemiBold. */}
          <Titulo
            id={`${id}-titulo`}
            className={`text-fluid-2xl ${
              nivel === 2 ? "font-light uppercase" : "font-semibold normal-case"
            } ${tom === "escuro" ? "text-white" : ""}`}
          >
            {titulo}
          </Titulo>
          {descricao ? (
            <div
              className={`mt-4 text-fluid-lg leading-relaxed ${
                tom === "escuro" ? "text-white/80" : "text-conexao-700"
              }`}
            >
              {descricao}
            </div>
          ) : null}
        </header>
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}

/** Cabeçalho de rota: trilha, título h1 e resumo. */
export function PageHeader({
  trilha,
  titulo,
  resumo,
  destaque,
}: {
  trilha: ReadonlyArray<{ nome: string; href: string }>;
  titulo: string;
  resumo: string;
  destaque?: string;
}) {
  return (
    <div className="relative overflow-hidden bg-[var(--surface-inverse)] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        /* Mesmo gradiente oficial do herói da home, em ângulo mais raso para o
           cabeçalho de rota, que é mais baixo. */
        style={{
          background:
            "linear-gradient(120deg, #481a1f 0%, #481a1f 55%, #b41630 100%)",
        }}
      />
      <Container className="relative py-12 sm:py-16 lg:py-20">
        <Breadcrumbs trilha={trilha} />
        {destaque ? (
          <p className="mt-6 inline-flex rounded-pill border border-protagonismo-500/40 bg-protagonismo-600/15 px-4 py-1.5 font-apoio text-xs font-semibold uppercase tracking-[0.16em] text-protagonismo-200">
            {destaque}
          </p>
        ) : null}
        <h1 className="mt-5 max-w-4xl text-fluid-3xl font-light uppercase text-white">
          {titulo}
        </h1>
        <p className="mt-5 max-w-3xl text-fluid-lg leading-relaxed text-white/80">
          {resumo}
        </p>
      </Container>
    </div>
  );
}

/** Trilha de navegação, espelhada no schema BreadcrumbList da rota. */
export function Breadcrumbs({
  trilha,
}: {
  trilha: ReadonlyArray<{ nome: string; href: string }>;
}) {
  return (
    <nav aria-label="Trilha de navegação">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/70">
        {trilha.map((item, indice) => {
          const ultimo = indice === trilha.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {ultimo ? (
                <span aria-current="page" className="text-white">
                  {item.nome}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {item.nome}
                  </Link>
                  <span aria-hidden="true" className="text-conexao-400">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Cartão de conteúdo com sombra sutil e estados de interação claros. */
export function Card({
  children,
  className = "",
  comHover = false,
}: {
  children: ReactNode;
  className?: string;
  comHover?: boolean;
}) {
  return (
    <div
      className={`rounded-card border border-[var(--line)] bg-white p-6 shadow-card sm:p-7 ${
        comHover
          ? "transition-all duration-200 hover:-translate-y-0.5 hover:border-conexao-200 hover:shadow-card-hover"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** Bloco de destaque para observações e ressalvas de uso dos dados. */
export function Callout({
  titulo,
  children,
  tom = "informativo",
}: {
  titulo: string;
  children: ReactNode;
  tom?: "informativo" | "atencao";
}) {
  const estilos = {
    informativo: "border-conexao-200 bg-conexao-50",
    atencao: "border-protagonismo-200 bg-protagonismo-50",
  } as const;

  const cores = {
    informativo: "text-conexao-700",
    atencao: "text-protagonismo-800",
  } as const;

  return (
    <aside
      className={`rounded-card border-l-4 p-5 sm:p-6 ${estilos[tom]}`}
      role="note"
    >
      <p
        className={`font-apoio text-base font-semibold uppercase tracking-wide ${cores[tom]}`}
      >
        {titulo}
      </p>
      <div className="mt-2 text-fluid-sm leading-relaxed text-conexao-700">
        {children}
      </div>
    </aside>
  );
}

/**
 * Tabela explicativa com rolagem horizontal no mobile.
 *
 * A tabela real é preservada (em vez de virar cartões no mobile) porque a
 * estrutura `thead`/`tbody` é justamente o que torna o dado extraível por
 * motores generativos.
 */
export function DataTable({
  legenda,
  cabecalhos,
  linhas,
}: {
  legenda: string;
  cabecalhos: readonly string[];
  linhas: ReadonlyArray<ReadonlyArray<ReactNode>>;
}) {
  return (
    <div className="overflow-hidden rounded-card border border-[var(--line)] bg-white shadow-card">
      <div className="table-scroll">
        <table className="geo-table">
          <caption className="px-4 pt-5 sm:px-6">{legenda}</caption>
          <thead>
            <tr>
              {cabecalhos.map((cabecalho) => (
                <th key={cabecalho} scope="col">
                  {cabecalho}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {linhas.map((linha, indiceLinha) => (
              <tr key={indiceLinha}>
                {linha.map((celula, indiceCelula) =>
                  indiceCelula === 0 ? (
                    <th key={indiceCelula} scope="row" className="font-semibold">
                      {celula}
                    </th>
                  ) : (
                    <td key={indiceCelula}>{celula}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** Etiqueta compacta para modalidades, níveis e categorias. */
export function Tag({
  children,
  cor,
}: {
  children: ReactNode;
  cor?: string;
}) {
  return (
    <span
      className="inline-flex items-center rounded-pill border px-2.5 py-1 text-xs font-medium"
      style={
        cor
          ? { borderColor: `${cor}33`, backgroundColor: `${cor}14`, color: cor }
          : undefined
      }
    >
      {children}
    </span>
  );
}
