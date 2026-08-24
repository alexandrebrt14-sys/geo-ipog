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
    <footer className="mt-auto border-t border-white/15 bg-[var(--surface-inverse)] text-white/80">
      {/* O rodapé é o único bloco que encosta no fim da tela, então é onde a
          barra de gestos do celular cobriria conteúdo. */}
      <div className="respiro-lateral respiro-inferior mx-auto max-w-7xl py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            {/* Fundo Vinho Determinação, então usa-se a aplicação negativa. */}
            <Logo className="h-8 w-auto" variante="negativa" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              {instituicao.nomeCompleto}. Portal de conhecimento estruturado para
              consulta humana e para motores de busca generativos.
            </p>
            <p className="mt-4 font-apoio text-base uppercase tracking-wide text-protagonismo-400">
              {instituicao.tagline}
            </p>
          </div>

          <nav aria-labelledby="rodape-navegacao">
            <h2
              id="rodape-navegacao"
              className="font-apoio text-sm font-light uppercase tracking-[0.16em] text-white"
            >
              Navegação
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/70 transition-colors hover:text-white"
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
              className="font-apoio text-sm font-light uppercase tracking-[0.16em] text-white"
            >
              Atendimento
            </h2>
            <ul className="mt-4 space-y-4 text-sm">
              {canaisAtendimento.map((canal) => (
                <li key={canal.area}>
                  <p className="font-semibold text-white">{canal.area}</p>
                  <p className="text-white/70">
                    {canal.telefones.join(" · ")}
                  </p>
                  <a
                    href={`mailto:${canal.email}`}
                    className="text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {canal.email}
                  </a>
                  <p className="mt-1 text-xs text-white/60">{canal.horario}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="rodape-portais">
            <h2
              id="rodape-portais"
              className="font-apoio text-sm font-light uppercase tracking-[0.16em] text-white"
            >
              Portais
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {portais.map((portal) => (
                <li key={portal.nome}>
                  <p className="font-semibold text-white">{portal.nome}</p>
                  <p className="text-white/70">{portal.endereco}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-12 border-t border-white/15 pt-8">
          <p className="text-xs leading-relaxed text-white/60">
            O catálogo de cursos deste portal foi extraído de ipog.edu.br, e as
            regras acadêmicas vêm dos documentos institucionais do IPOG. Números
            e regras podem ser atualizados pela instituição. Antes de usar
            qualquer indicador em peça pública, confirme com a área responsável.
          </p>
          <p className="mt-4 text-xs text-white/60">
            © {ano} {instituicao.nomeCompleto}. Fundado em {instituicao.fundacao}{" "}
            em {instituicao.cidadeOrigem}, {instituicao.estadoOrigem}.
          </p>
        </div>
      </div>
    </footer>
  );
}
