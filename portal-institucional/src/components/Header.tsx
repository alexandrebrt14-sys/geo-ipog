"use client";

/**
 * Cabeçalho institucional com navegação responsiva.
 *
 * No mobile, a navegação vira um painel acionado por botão. O painel usa
 * `aria-expanded` e `aria-controls` e devolve o foco ao botão ao fechar, de modo
 * que a navegação por teclado continue coerente.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/lib/site";
import { Logo } from "@/components/Logo";

export function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const pathname = usePathname();
  const botaoRef = useRef<HTMLButtonElement>(null);

  // Fecha o painel a cada troca de rota, para não deixar o menu aberto sobre a
  // página nova depois da navegação. O ajuste é feito durante a renderização, e
  // não em um efeito, porque é a rota que deriva o estado: fechar no clique do
  // link deixaria o menu aberto ao navegar pelo histórico do navegador.
  const [rotaAnterior, setRotaAnterior] = useState(pathname);
  if (rotaAnterior !== pathname) {
    setRotaAnterior(pathname);
    setMenuAberto(false);
  }

  // Trava a rolagem do corpo enquanto o painel mobile estiver aberto.
  useEffect(() => {
    document.body.style.overflow = menuAberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAberto]);

  useEffect(() => {
    if (!menuAberto) return;
    const aoPressionar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") {
        setMenuAberto(false);
        botaoRef.current?.focus();
      }
    };
    window.addEventListener("keydown", aoPressionar);
    return () => window.removeEventListener("keydown", aoPressionar);
  }, [menuAberto]);

  const rotaAtiva = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 rounded-md transition-opacity hover:opacity-80"
          aria-label="Portal GEO IPOG, página inicial"
        >
          {/* Fundo claro, então a aplicação preferencial do guia é a positiva. */}
          <Logo className="h-7 w-auto sm:h-8" decorativo />
          {/* O rótulo some entre 1280px e 1536px: nessa faixa a barra precisa
              do espaço para os dez itens de navegação sem transbordar. */}
          <span className="hidden border-l border-[var(--line)] pl-3 font-apoio text-xs font-semibold uppercase tracking-[0.18em] text-conexao-700 sm:block xl:hidden 2xl:block">
            Portal GEO
          </span>
        </Link>

        {/* Navegação desktop */}
        {/* O item "Início" não entra na barra desktop: o logotipo já leva à
            home e tem rótulo acessível próprio. Ele continua no painel mobile
            e no rodapé, onde não há esse atalho visual. */}
        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-0.5 xl:flex"
        >
          {navigation
            .filter((item) => item.href !== "/")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={rotaAtiva(item.href) ? "page" : undefined}
                className={`whitespace-nowrap rounded-lg px-2.5 py-2 font-apoio text-xs font-semibold uppercase transition-colors xl:text-sm ${
                  rotaAtiva(item.href)
                    ? "bg-protagonismo-600 text-white"
                    : "text-conexao-700 hover:bg-protagonismo-50 hover:text-protagonismo-800"
                }`}
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <a
          href="https://www.ipog.edu.br"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden shrink-0 whitespace-nowrap rounded-pill bg-protagonismo-600 px-5 py-2.5 font-apoio text-sm font-bold uppercase text-white shadow-sm transition-colors hover:bg-protagonismo-700 xl:inline-flex"
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-conexao-800 transition-colors hover:bg-protagonismo-50 xl:hidden"
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

      {/* Painel de navegação mobile */}
      <div
        id="menu-mobile"
        hidden={!menuAberto}
        className="border-t border-[var(--line)] bg-white xl:hidden"
      >
        <nav
          aria-label="Navegação principal, versão compacta"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto px-4 py-4 sm:px-6"
        >
          <ul className="flex flex-col gap-1">
            {navigation.map((item) => (
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
