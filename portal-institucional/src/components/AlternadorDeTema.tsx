"use client";

/**
 * Alternador entre tema claro e escuro.
 *
 * **A escolha é compartilhada com o site anfitrião.** O portal é servido em
 * posgraduacaopsicologia.com/ipog, e o site guarda o tema em `localStorage` sob
 * a chave `pp-theme`, marcando `data-theme` no elemento raiz. Mesma origem,
 * mesma chave: quem escolheu escuro navegando pelo site chega ao portal já no
 * escuro, e quem escolhe aqui volta ao site com a escolha preservada. Trocar
 * essa chave por outra quebraria essa continuidade sem nenhum aviso.
 *
 * Quem nunca escolheu nada segue a preferência do sistema, resolvida no CSS por
 * `prefers-color-scheme` e no atributo pelo script de abertura do layout.
 *
 * A fonte da verdade do tema é o atributo `data-theme` no documento, e não um
 * estado do React: quem o escreve primeiro é aquele script, antes de o React
 * existir na página. Por isso o botão **lê** o documento com
 * `useSyncExternalStore`, em vez de manter uma cópia própria que nasceria
 * dessincronizada.
 */

import { useCallback, useEffect, useSyncExternalStore } from "react";

const CHAVE = "pp-theme";

type Tema = "light" | "dark";

/** Lê a escolha guardada, tolerando armazenamento bloqueado. */
function escolhaGuardada(): Tema | null {
  try {
    const valor = window.localStorage.getItem(CHAVE);
    return valor === "light" || valor === "dark" ? valor : null;
  } catch {
    // Navegação privativa ou site sem permissão de armazenamento.
    return null;
  }
}

/** Avisa o React sempre que `data-theme` mudar, venha a mudança de onde vier. */
function observarTema(aoMudar: () => void) {
  const observador = new MutationObserver(aoMudar);
  observador.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observador.disconnect();
}

const lerTema = (): Tema =>
  document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";

/**
 * No build não há documento, e o tema real só se conhece no navegador.
 * Devolver `null` faz o botão sair do HTML sem afirmar um estado, e assumir o
 * estado certo assim que hidratar.
 */
const lerTemaNoBuild = (): Tema | null => null;

export function AlternadorDeTema({ className = "" }: { className?: string }) {
  const tema = useSyncExternalStore(observarTema, lerTema, lerTemaNoBuild);

  /**
   * Acompanha a preferência do sistema enquanto ninguém tiver escolhido.
   *
   * Sem isto, alguém que muda o sistema para escuro com a página aberta veria o
   * CSS trocar de tema pela media query e o atributo continuar no valor antigo,
   * deixando o botão anunciando o contrário do que a tela mostra.
   *
   * O efeito escreve no atributo, e é o observador acima que avisa o React.
   */
  useEffect(() => {
    const consulta = window.matchMedia("(prefers-color-scheme: dark)");
    const aoMudar = () => {
      if (escolhaGuardada()) return;
      document.documentElement.setAttribute(
        "data-theme",
        consulta.matches ? "dark" : "light",
      );
    };
    consulta.addEventListener("change", aoMudar);
    return () => consulta.removeEventListener("change", aoMudar);
  }, []);

  const alternar = useCallback(() => {
    const novo: Tema = lerTema() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", novo);
    try {
      window.localStorage.setItem(CHAVE, novo);
    } catch {
      // Sem armazenamento a escolha vale só nesta página, o que é melhor do
      // que deixar o clique sem efeito nenhum.
    }
  }, []);

  const escuro = tema === "dark";
  const rotulo = escuro ? "Mudar para o tema claro" : "Mudar para o tema escuro";

  return (
    <button
      type="button"
      onClick={alternar}
      /* `aria-pressed` em vez de `aria-label` sozinho: o leitor de tela anuncia
         o estado atual, e não só o que o clique vai fazer. Enquanto o tema não
         é conhecido, o botão não afirma um estado falso. */
      aria-pressed={tema === null ? undefined : escuro}
      aria-label={tema === null ? "Alternar tema" : rotulo}
      title={tema === null ? undefined : rotulo}
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-conexao-700 transition-colors hover:bg-[var(--acento-tenue)] hover:text-[var(--acento-tenue-texto)] ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        {escuro ? (
          /* Sol: o clique leva ao claro. */
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          /* Lua: o clique leva ao escuro. */
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        )}
      </svg>
    </button>
  );
}
