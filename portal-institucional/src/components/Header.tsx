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
    <header className="sticky top-0 z-50 border-b border-digital-800/60 bg-digital-950/95 backdrop-blur supports-[backdrop-filter]:bg-digital-950/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 rounded-md text-white transition-opacity hover:opacity-80"
          aria-label="Portal GEO IPOG, página inicial"
        >
          <Logo className="h-8 w-auto sm:h-9" />
          <span className="hidden font-display text-sm font-semibold uppercase tracking-[0.18em] text-digital-200 sm:block">
            Portal GEO
          </span>
        </Link>

        {/* Navegação desktop */}
        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-1 lg:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={rotaAtiva(item.href) ? "page" : undefined}
              className={`rounded-lg px-3 py-2 font-display text-sm font-medium uppercase tracking-wide transition-colors ${
                rotaAtiva(item.href)
                  ? "bg-protagonismo-600 text-white"
                  : "text-digital-200 hover:bg-white/10 hover:text-white"
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
          className="hidden shrink-0 rounded-pill bg-protagonismo-600 px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-protagonismo-700 lg:inline-flex"
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 lg:hidden"
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
        className="border-t border-digital-800 bg-digital-950 lg:hidden"
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
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <span className="block font-display text-base font-semibold uppercase tracking-wide">
                    {item.label}
                  </span>
                  <span
                    className={`mt-0.5 block text-sm ${
                      rotaAtiva(item.href)
                        ? "text-protagonismo-100"
                        : "text-digital-300"
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
            className="mt-4 flex items-center justify-center rounded-pill bg-protagonismo-600 px-5 py-3.5 font-display text-base font-semibold uppercase tracking-wide text-white"
          >
            Acessar o site do IPOG
          </a>
        </nav>
      </div>
    </header>
  );
}
