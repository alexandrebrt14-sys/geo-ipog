/**
 * Primitivas de layout e tipografia reutilizadas por todas as rotas.
 *
 * Foram isoladas aqui para que a integração com o site novo do IPOG possa
 * substituir a casca visual sem tocar no conteúdo das páginas.
 */

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import { tonsDeTextoPorTema } from "@/lib/cor";

/** Contêiner com largura máxima e respiro lateral responsivo. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    /* `respiro-lateral` substitui `px-4 sm:px-6 lg:px-8`: mesmo respiro, mas
       crescendo onde o entalhe do aparelho invade a lateral. Ver globals.css. */
    <div className={`respiro-lateral mx-auto w-full max-w-7xl ${className}`}>
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
    claro: "bg-[var(--surface)]",
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
           cabeçalho de rota, que é mais baixo. O valor vive em token porque o
           tema escuro usa uma versão menos luminosa, para a faixa não brigar
           com o texto branco por cima. */
        style={{ background: "var(--gradiente-heroi)" }}
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
                  {/* Separador decorativo sobre a faixa escura, que é escura
                      nos dois temas: por isso branco com opacidade, e não um
                      degrau da rampa neutra, que se inverte no tema escuro.

                      55% e não 40%: a faixa clareia no tema escuro, e a 40% o
                      separador caía para 3,15:1 ali. Ele é aria-hidden, então
                      a regra de contraste não o alcança, mas quem enxerga
                      pouco também lê a trilha, e subir a opacidade não custa
                      nada. */}
                  <span aria-hidden="true" className="text-white/55">
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
      className={`rounded-card border border-[var(--line)] bg-[var(--surface)] p-6 shadow-card sm:p-7 ${
        comHover
          ? "transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-conexao-200 hover:shadow-card-hover"
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
    atencao: "border-[var(--acento-tenue-borda)] bg-[var(--acento-tenue)]",
  } as const;

  const cores = {
    informativo: "text-conexao-700",
    atencao: "text-[var(--acento-tenue-texto)]",
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
    <div className="overflow-hidden rounded-card border border-[var(--line)] bg-[var(--surface)] shadow-card">
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

/**
 * Etiqueta compacta para modalidades, níveis e categorias.
 *
 * A cor recebida é a cor da marca ou da área, e ela continua governando o
 * aspecto da etiqueta: entra na borda a 20% e no preenchimento a 8%. O que
 * mudou é o texto, que passou a usar um tom derivado dessa mesma cor, com
 * contraste suficiente para os 4,5:1 da WCAG 2.2 AA sobre o preenchimento real.
 *
 * Antes, o texto usava a cor da marca crua, e as cores claras da paleta ficavam
 * ilegíveis: Amarelo Estratégico marcava 1,83:1 e Verde Vital 2,88:1. A conta
 * fica em `@/lib/cor`, num ponto só, então uma área nova nasce legível sem que
 * ninguém precise lembrar de conferir.
 *
 * São **dois** tons, entregues como propriedades no elemento. O portal é HTML
 * estático: a cor é decidida no build e não sabe em que tema a página vai ser
 * lida. Quem escolhe é o navegador, pelo `light-dark()` da classe `.etiqueta`
 * em `globals.css`. Um tom só ficaria certo em um tema e errado no outro,
 * porque cor que passa sobre branco reprova sobre preto.
 */
export function Tag({
  children,
  cor,
}: {
  children: ReactNode;
  cor?: string;
}) {
  if (!cor) {
    return (
      <span className="inline-flex items-center rounded-pill border px-2.5 py-1 text-xs font-medium">
        {children}
      </span>
    );
  }

  const tons = tonsDeTextoPorTema(cor, 0.08);

  return (
    <span
      className="etiqueta inline-flex items-center rounded-pill border px-2.5 py-1 text-xs font-medium"
      style={
        {
          "--etiqueta-borda": `${cor}33`,
          "--etiqueta-fundo": `${cor}14`,
          "--etiqueta-texto-claro": tons.claro,
          "--etiqueta-texto-escuro": tons.escuro,
        } as CSSProperties
      }
    >
      {children}
    </span>
  );
}
