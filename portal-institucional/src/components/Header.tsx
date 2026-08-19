"use client";

/**
 * Cabeçalho institucional com navegação agrupada.
 *
 * A barra tinha dez itens soltos e exigia 1247px de largura, o que a fazia
 * desaparecer inteira abaixo de 1280px. Agora são quatro grupos, que cabem com
 * folga em notebook e deixam espaço para o portal crescer.
 *
 * Duas decisões que valem registro:
 *
 * 1. **Os links do submenu ficam sempre no HTML**, escondidos pelo atributo
 *    `hidden` em vez de removidos do React quando fechados. Se só existissem
 *    depois do clique, um rastreador não encontraria as rotas internas, e a
 *    ligação entre as páginas do portal se perderia.
 * 2. **Abre por clique, não por passagem do mouse.** Menu que abre ao passar o
 *    cursor dispara sozinho quando a pessoa só está atravessando a tela, e não
 *    tem equivalente no teclado nem no toque.
 *
 * No celular, a navegação vira um painel com os mesmos grupos, acionado por
 * botão, com `aria-expanded` e devolução de foco ao fechar.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, menuPrincipal, itensDoGrupo } from "@/lib/site";
import { Logo } from "@/components/Logo";

export function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [grupoAberto, setGrupoAberto] = useState<string | null>(null);
  const pathname = usePathname();
  const botaoRef = useRef<HTMLButtonElement>(null);
  const barraRef = useRef<HTMLElement>(null);

  // Fecha painel e submenus a cada troca de rota, para não deixar o menu aberto
  // sobre a página nova. O ajuste é feito durante a renderização, e não em um
  // efeito, porque é a rota que deriva o estado: fechar no clique do link
  // deixaria o menu aberto ao navegar pelo histórico do navegador.
  const [rotaAnterior, setRotaAnterior] = useState(pathname);
  if (rotaAnterior !== pathname) {
    setRotaAnterior(pathname);
    setMenuAberto(false);
    setGrupoAberto(null);
  }

  // Trava a rolagem do corpo enquanto o painel mobile estiver aberto.
  useEffect(() => {
    document.body.style.overflow = menuAberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAberto]);

  // Escape fecha o que estiver aberto e devolve o foco a quem abriu.
  useEffect(() => {
    if (!menuAberto && !grupoAberto) return;
    const aoPressionar = (evento: KeyboardEvent) => {
      if (evento.key !== "Escape") return;
      if (grupoAberto) {
        const gatilho = document.getElementById(`gatilho-${slug(grupoAberto)}`);
        setGrupoAberto(null);
        gatilho?.focus();
        return;
      }
      setMenuAberto(false);
      botaoRef.current?.focus();
    };
    window.addEventListener("keydown", aoPressionar);
    return () => window.removeEventListener("keydown", aoPressionar);
  }, [menuAberto, grupoAberto]);

  // Clique fora da barra fecha o submenu aberto.
  useEffect(() => {
    if (!grupoAberto) return;
    const aoClicar = (evento: MouseEvent) => {
      if (!barraRef.current?.contains(evento.target as Node)) setGrupoAberto(null);
    };
    document.addEventListener("mousedown", aoClicar);
    return () => document.removeEventListener("mousedown", aoClicar);
  }, [grupoAberto]);

  const rotaAtiva = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const grupoAtivo = (rotas: string[]) => rotas.some(rotaAtiva);

  return (
    <header
      ref={barraRef}
      className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 rounded-md transition-opacity hover:opacity-80"
          aria-label="Portal GEO IPOG, página inicial"
        >
          {/* Fundo claro, então a aplicação preferencial do guia é a positiva. */}
          <Logo className="h-7 w-auto sm:h-8" decorativo />
          <span className="hidden border-l border-[var(--line)] pl-3 font-apoio text-xs font-semibold uppercase tracking-[0.18em] text-conexao-700 sm:block">
            Portal GEO
          </span>
        </Link>

        {/* Navegação desktop, agrupada. */}
        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {menuPrincipal.map((grupo) => {
              const itens = itensDoGrupo(grupo);
              const ativo = grupoAtivo(grupo.rotas);

              // Grupo de uma rota só vira link direto: submenu com um item
              // apenas cobra um clique a mais sem oferecer nada em troca.
              if (itens.length === 1) {
                return (
                  <li key={grupo.label}>
                    <Link
                      href={itens[0].href}
                      aria-current={ativo ? "page" : undefined}
                      className={classesDoGatilho(ativo)}
                    >
                      {grupo.label}
                    </Link>
                  </li>
                );
              }

              const aberto = grupoAberto === grupo.label;
              const idSubmenu = `submenu-${slug(grupo.label)}`;

              return (
                <li key={grupo.label} className="relative">
                  <button
                    type="button"
                    id={`gatilho-${slug(grupo.label)}`}
                    aria-expanded={aberto}
                    aria-controls={idSubmenu}
                    aria-haspopup="true"
                    onClick={() => setGrupoAberto(aberto ? null : grupo.label)}
                    className={`${classesDoGatilho(ativo)} inline-flex items-center gap-1.5`}
                  >
                    {grupo.label}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 12 12"
                      className={`h-2.5 w-2.5 transition-transform ${aberto ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 4.5 6 8.5 10 4.5" />
                    </svg>
                  </button>

                  {/* `hidden` em vez de desmontar: mantém os links no HTML. */}
                  <ul
                    id={idSubmenu}
                    hidden={!aberto}
                    className="absolute left-0 top-full z-50 mt-1 w-72 overflow-hidden rounded-card border border-[var(--line)] bg-white py-1.5 shadow-card-hover"
                  >
                    {itens.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={rotaAtiva(item.href) ? "page" : undefined}
                          className={`block px-4 py-2.5 transition-colors ${
                            rotaAtiva(item.href)
                              ? "bg-protagonismo-50 text-protagonismo-800"
                              : "text-conexao-800 hover:bg-conexao-50"
                          }`}
                        >
                          <span className="block font-apoio text-sm font-semibold uppercase tracking-wide">
                            {item.label}
                          </span>
                          <span className="mt-0.5 block text-fluid-sm leading-snug text-conexao-600">
                            {item.description}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>

        <a
          href="https://www.ipog.edu.br"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden shrink-0 whitespace-nowrap rounded-pill bg-protagonismo-600 px-5 py-2.5 font-apoio text-sm font-bold uppercase text-white shadow-sm transition-colors hover:bg-protagonismo-700 lg:inline-flex"
        >
          Site do IPOG
        </a>

        {/* Botão do painel mobile */}
        <button
          ref={botaoRef}
          type="button"
          onClick={() => setMenuAberto((aberto) => !aberto)}
          aria-expanded={menuAberto}
          aria-controls="menu-mobile"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-conexao-800 transition-colors hover:bg-protagonismo-50 lg:hidden"
        >
          <span className="sr-only">
            {menuAberto ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-6 w-6"
          >
            {menuAberto ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Painel de navegação mobile, com os mesmos grupos. */}
      <div
        id="menu-mobile"
        hidden={!menuAberto}
        className="border-t border-[var(--line)] bg-white lg:hidden"
      >
        <nav
          aria-label="Navegação principal, versão compacta"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto px-4 py-4 sm:px-6"
        >
          {menuPrincipal.map((grupo) => (
            <section key={grupo.label} className="mb-4 last:mb-0">
              <h2 className="px-4 font-apoio text-xs font-semibold uppercase tracking-[0.14em] text-conexao-600">
                {grupo.label}
              </h2>
              <ul className="mt-1.5 flex flex-col gap-1">
                {itensDoGrupo(grupo).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={rotaAtiva(item.href) ? "page" : undefined}
                      className={`block rounded-xl px-4 py-3 transition-colors ${
                        rotaAtiva(item.href)
                          ? "bg-protagonismo-600 text-white"
                          : "text-conexao-800 hover:bg-protagonismo-50"
                      }`}
                    >
                      <span className="block font-apoio text-base font-bold uppercase tracking-wide">
                        {item.label}
                      </span>
                      <span
                        className={`mt-0.5 block text-sm ${
                          rotaAtiva(item.href)
                            ? "text-protagonismo-100"
                            : "text-conexao-600"
                        }`}
                      >
                        {item.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {/* A home não entra em nenhum grupo, porque no desktop o logotipo já
              cumpre esse papel. No painel do celular ela precisa aparecer. */}
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className="mt-2 block rounded-xl px-4 py-3 font-apoio text-base font-bold uppercase tracking-wide text-conexao-800 transition-colors hover:bg-protagonismo-50"
          >
            {navigation.find((item) => item.href === "/")?.label ?? "Início"}
          </Link>

          <a
            href="https://www.ipog.edu.br"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center rounded-pill bg-protagonismo-600 px-5 py-3.5 font-apoio text-base font-bold uppercase tracking-wide text-white"
          >
            Acessar o site do IPOG
          </a>
        </nav>
      </div>
    </header>
  );
}

/** Classes do item de primeiro nível, com e sem rota ativa. */
function classesDoGatilho(ativo: boolean): string {
  return `whitespace-nowrap rounded-lg px-3 py-2 font-apoio text-sm font-semibold uppercase transition-colors ${
    ativo
      ? "bg-protagonismo-600 text-white"
      : "text-conexao-700 hover:bg-protagonismo-50 hover:text-protagonismo-800"
  }`;
}

/** Identificador estável a partir do rótulo do grupo. */
function slug(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
