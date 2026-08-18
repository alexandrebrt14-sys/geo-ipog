import type { Metadata } from "next";
import Link from "next/link";

import {
  areasDeConhecimento,
  totalCursosCatalogados,
  modalidades,
} from "@/data/areas";
import {
  breadcrumbSchema,
  catalogoDeCursosSchema,
  webPageSchema,
} from "@/lib/jsonld";
import { criarMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import {
  Container,
  Section,
  PageHeader,
  DataTable,
  Tag,
  Callout,
} from "@/components/Layout";
import { AreaCard } from "@/components/Cards";

const descricao =
  "Portfólio de pós-graduação, MBA e extensão do IPOG organizado em seis áreas de conhecimento, com modalidades presencial, ao vivo e EaD disponíveis em cada curso.";

export const metadata: Metadata = criarMetadata({
  titulo: "Áreas de conhecimento e cursos do IPOG",
  descricao,
  path: "/areas-de-conhecimento",
});

const trilha = [
  { nome: "Início", href: "/" },
  { nome: "Áreas de conhecimento", href: "/areas-de-conhecimento" },
] as const;

export default function PaginaAreasDeConhecimento() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            path: "/areas-de-conhecimento",
            name: "Áreas de conhecimento e cursos do IPOG",
            description: descricao,
          }),
          breadcrumbSchema(trilha),
          catalogoDeCursosSchema(areasDeConhecimento),
        ]}
      />

      <PageHeader
        trilha={trilha}
        destaque={`${totalCursosCatalogados} cursos catalogados`}
        titulo="Áreas de conhecimento"
        resumo={descricao}
      />

      {/* Índice das áreas, com âncoras estáveis para citação direta. */}
      <div className="border-b border-digital-100 bg-[var(--surface-muted)]">
        <Container className="py-6">
          <h2 className="sr-only">Índice das áreas de conhecimento</h2>
          <ul className="flex flex-wrap gap-2">
            {areasDeConhecimento.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`#${area.slug}-cursos`}
                  className="inline-flex items-center gap-2 rounded-pill border border-digital-200 bg-white px-4 py-2 text-fluid-sm font-medium text-digital-800 transition-colors hover:border-digital-300 hover:bg-digital-50"
                >
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: area.cor }}
                  />
                  {area.nome}
                  <span className="text-conexao-600">{area.cursos.length}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      <Section
        id="panorama"
        titulo="Panorama das áreas"
        descricao={`As ${areasDeConhecimento.length} áreas do portfólio, com resumo, público indicado e cursos em destaque. Cada área usa a cor que o Guia de Expressão da Marca 2025 atribui a ela.`}
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {areasDeConhecimento.map((area) => (
            <AreaCard key={area.slug} area={area} />
          ))}
        </div>
      </Section>

      {/* Catálogo completo, uma tabela por área. */}
      <section
        aria-labelledby="catalogo-titulo"
        className="bg-[var(--surface-muted)] py-14 sm:py-20"
      >
        <Container>
          <header className="max-w-3xl">
            <h2
              id="catalogo-titulo"
              className="text-fluid-2xl font-bold uppercase"
            >
              Catálogo completo por área
            </h2>
            <p className="mt-4 text-fluid-lg leading-relaxed text-conexao-700">
              Todos os {totalCursosCatalogados} cursos catalogados, com nível e
              modalidades disponíveis. As modalidades indicam em quais formatos o
              curso é ofertado.
            </p>
          </header>

          <div className="mt-10 space-y-12">
            {areasDeConhecimento.map((area) => (
              <article
                key={area.slug}
                id={`${area.slug}-cursos`}
                aria-labelledby={`${area.slug}-cursos-titulo`}
                className="scroll-mt-24"
              >
                <header className="mb-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-8 w-1.5 rounded-full"
                      style={{ backgroundColor: area.cor }}
                    />
                    <h3
                      id={`${area.slug}-cursos-titulo`}
                      className="text-fluid-xl font-bold uppercase text-digital-900"
                    >
                      {area.nome}
                    </h3>
                    <Tag cor={area.cor}>{area.cursos.length} cursos</Tag>
                  </div>
                  <p className="mt-3 max-w-3xl text-fluid-base leading-relaxed text-conexao-700">
                    {area.paraQuem}
                  </p>
                </header>

                <DataTable
                  legenda={`Cursos do IPOG na área de ${area.nome}, com nível e modalidades disponíveis.`}
                  cabecalhos={["Curso", "Nível", "Modalidades"]}
                  linhas={area.cursos.map((curso) => [
                    curso.nome,
                    curso.nivel,
                    <span key={curso.nome} className="flex flex-wrap gap-1.5">
                      {curso.modalidades.map((modalidade) => (
                        <Tag key={modalidade} cor={area.cor}>
                          {modalidade}
                        </Tag>
                      ))}
                    </span>,
                  ])}
                />
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Section
        id="modalidades-detalhe"
        titulo="Como funciona cada modalidade"
        descricao="A modalidade define onde e quando a aula acontece, e também como a nota do módulo é composta."
      >
        <DataTable
          legenda="Modalidades de ensino do IPOG, com funcionamento, frequência mínima e composição da nota."
          cabecalhos={[
            "Modalidade",
            "Como funciona",
            "Frequência mínima",
            "Composição da nota",
          ]}
          linhas={modalidades.map((modalidade) => [
            modalidade.nome,
            modalidade.comoFunciona,
            modalidade.frequenciaMinima,
            modalidade.composicaoNota,
          ])}
        />

        <div className="mt-8">
          <Callout titulo="Sobre este catálogo">
            A relação de cursos deste portal é derivada dos projetos pedagógicos
            arquivados no repositório institucional do IPOG e representa uma
            fotografia daquele acervo. O portfólio completo e as turmas com
            matrícula aberta ficam em{" "}
            <a
              href="https://www.ipog.edu.br"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-protagonismo-600 underline underline-offset-4"
            >
              ipog.edu.br
            </a>
            .
          </Callout>
        </div>
      </Section>
    </>
  );
}
