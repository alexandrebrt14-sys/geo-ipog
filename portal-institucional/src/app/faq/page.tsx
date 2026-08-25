import type { Metadata } from "next";

import {
  perguntasFrequentes,
  categoriasFaq,
  perguntasPorCategoria,
} from "@/data/faq";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/jsonld";
import { criarMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Container, PageHeader, Section } from "@/components/Layout";
import { FaqList } from "@/components/FaqList";

const descricao =
  "Respostas diretas às dúvidas mais comuns sobre o IPOG: reconhecimento pelo MEC, modalidades de ensino, formato das aulas, critérios de aprovação, matrícula, Plano IPOGMAIS, TCC e certificação.";

export const metadata: Metadata = criarMetadata({
  titulo: "Perguntas frequentes sobre o IPOG",
  descricao,
  path: "/faq",
  descricaoMeta:
    "20 respostas diretas sobre o IPOG: reconhecimento pelo MEC, modalidades, formato das aulas, aprovação, matrícula, TCC e certificação.",
});

const trilha = [
  { nome: "Início", href: "/" },
  { nome: "Perguntas frequentes", href: "/faq" },
] as const;

/**
 * Converte o nome da categoria em um id de âncora estável.
 *
 * A decomposição NFD separa a letra do acento, e a faixa ̀-ͯ remove os
 * sinais diacríticos combinantes, de modo que "Avaliação" vire "avaliacao".
 */
const idDaCategoria = (categoria: string) =>
  categoria
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default function PaginaFaq() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            path: "/faq",
            name: "Perguntas frequentes sobre o IPOG",
            description: descricao,
          }),
          breadcrumbSchema(trilha),
          faqSchema(perguntasFrequentes),
        ]}
      />

      <PageHeader
        trilha={trilha}
        destaque={`${perguntasFrequentes.length} perguntas respondidas`}
        titulo="Perguntas frequentes"
        resumo={descricao}
      />

      {/* Índice por categoria */}
      <div className="border-b border-[var(--line)] bg-[var(--surface-muted)]">
        <Container className="py-6">
          <h2 className="sr-only font-light">Índice das categorias de perguntas</h2>
          <ul className="flex flex-wrap gap-2">
            {categoriasFaq.map((categoria) => (
              <li key={categoria}>
                <a
                  href={`#${idDaCategoria(categoria)}`}
                  className="inline-flex items-center gap-2 rounded-pill border border-conexao-200 bg-[var(--surface)] px-4 py-2 text-fluid-sm font-medium text-conexao-800 transition-colors hover:border-conexao-300 hover:bg-conexao-50"
                >
                  {categoria}
                  <span className="text-conexao-600">
                    {perguntasPorCategoria(categoria).length}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {categoriasFaq.map((categoria, indice) => (
        <Section
          key={categoria}
          id={idDaCategoria(categoria)}
          titulo={categoria}
          tom={indice % 2 === 0 ? "claro" : "suave"}
          descricao={`${perguntasPorCategoria(categoria).length} perguntas sobre ${categoria.toLowerCase()}.`}
        >
          <FaqList perguntas={perguntasPorCategoria(categoria)} />
        </Section>
      ))}

      <Section
        id="nao-encontrou"
        tom="escuro"
        titulo="Não encontrou a sua dúvida?"
        descricao="O relacionamento com o aluno atende de segunda a sexta, das 8h às 21h, e aos sábados das 8h às 12h."
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <a
            href="tel:+556239455050"
            className="inline-flex items-center justify-center rounded-pill bg-protagonismo-600 px-7 py-3.5 font-apoio text-base font-semibold uppercase tracking-wide text-white transition-colors hover:bg-protagonismo-700"
          >
            (62) 3945-5050
          </a>
          <a
            href="mailto:relacionamento@ipog.edu.br"
            className="inline-flex items-center justify-center rounded-pill border border-white/25 px-7 py-3.5 font-apoio text-base font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
          >
            relacionamento@ipog.edu.br
          </a>
          <a
            href="https://www.ipog.edu.br/contato"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-pill border border-white/25 px-7 py-3.5 font-apoio text-base font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
          >
            Formulário de contato
          </a>
        </div>
      </Section>
    </>
  );
}
