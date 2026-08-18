/**
 * Rodapé institucional com navegação secundária, canais de atendimento e
 * declaração de proveniência dos dados.
 */

import Link from "next/link";
import { navigation } from "@/lib/site";
import { instituicao, canaisAtendimento, portais } from "@/data/institucional";
import { Logo } from "@/components/Logo";

export function Footer() {
  const ano = 2026;

  return (
    <footer className="mt-auto border-t border-digital-800 bg-digital-950 text-digital-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo className="h-9 w-auto text-white" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-digital-300">
              {instituicao.nomeCompleto}. Portal de conhecimento estruturado para
              consulta humana e para motores de busca generativos.
            </p>
            <p className="mt-4 font-display text-base uppercase tracking-wide text-protagonismo-400">
              {instituicao.tagline}
            </p>
          </div>

          <nav aria-labelledby="rodape-navegacao">
            <h2
              id="rodape-navegacao"
              className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-white"
            >
              Navegação
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-digital-300 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-labelledby="rodape-atendimento">
            <h2
              id="rodape-atendimento"
              className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-white"
            >
              Atendimento
            </h2>
            <ul className="mt-4 space-y-4 text-sm">
              {canaisAtendimento.map((canal) => (
                <li key={canal.area}>
                  <p className="font-semibold text-white">{canal.area}</p>
                  <p className="text-digital-300">
                    {canal.telefones.join(" · ")}
                  </p>
                  <a
                    href={`mailto:${canal.email}`}
                    className="text-digital-300 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {canal.email}
                  </a>
                  <p className="mt-1 text-xs text-digital-400">{canal.horario}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="rodape-portais">
            <h2
              id="rodape-portais"
              className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-white"
            >
              Portais
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {portais.map((portal) => (
                <li key={portal.nome}>
                  <p className="font-semibold text-white">{portal.nome}</p>
                  <p className="text-digital-300">{portal.endereco}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-12 border-t border-digital-800 pt-8">
          <p className="text-xs leading-relaxed text-digital-400">
            Os dados deste portal são derivados do repositório institucional de
            conhecimento do IPOG. Números e regras acadêmicas podem ser
            atualizados pela instituição. Antes de usar qualquer indicador em
            peça pública, confirme com a área responsável.
          </p>
          <p className="mt-4 text-xs text-digital-400">
            © {ano} {instituicao.nomeCompleto}. Fundado em {instituicao.fundacao}{" "}
            em {instituicao.cidadeOrigem}, {instituicao.estadoOrigem}.
          </p>
        </div>
      </div>
    </footer>
  );
}
