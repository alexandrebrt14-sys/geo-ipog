import type { Metadata } from "next";
import Link from "next/link";

import {
  areasDeConhecimento,
  cursos,
  cursosDaArea,
  totalCursosCatalogados,
  totaisPorNivel,
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

const descricao = `Catálogo de ${totalCursosCatalogados} cursos do IPOG organizado nas ${areasDeConhecimento.length} áreas de conhecimento da instituição, com nível, duração e modalidades presencial, ao vivo e EaD declaradas em cada curso.`;

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
          catalogoDeCursosSchema(cursos),
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
                  href={`/areas-de-conhecimento/${area.slug}`}
                  className="inline-flex items-center gap-2 rounded-pill border border-digital-200 bg-white px-4 py-2 text-fluid-sm font-medium text-digital-800 transition-colors hover:border-digital-300 hover:bg-digital-50"
                >
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: area.cor }}
                  />
                  {area.nome}
                  <span className="text-conexao-600">
                    {cursosDaArea(area.slug).length}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      <Section
        id="panorama"
        titulo="Panorama das áreas"
        descricao={`As ${areasDeConhecimento.length} áreas do portfólio, com resumo, público indicado e cursos em destaque. Um mesmo curso pode aparecer em mais de uma área, como o próprio site do IPOG classifica.`}
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
              Todos os {totalCursosCatalogados} cursos do catálogo, sendo{" "}
              {totaisPorNivel["Pós-graduação"]} de pós-graduação,{" "}
              {totaisPorNivel["Extensão"]} de extensão e{" "}
              {totaisPorNivel["Graduação"]} de graduação. Cada linha traz o
              nível, a duração e as modalidades em que o curso é ofertado.
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
                    <Tag cor={area.cor}>
                      {cursosDaArea(area.slug).length} cursos
                    </Tag>
                  </div>
                  <p className="mt-3 max-w-3xl text-fluid-base leading-relaxed text-conexao-700">
                    {area.paraQuem}
                  </p>
                  {area.rotuloOficial !== area.nome && (
                    <p className="mt-2 text-fluid-sm text-conexao-600">
                      No filtro de cursos de ipog.edu.br, esta área aparece sob o
                      rótulo <strong>{area.rotuloOficial}</strong>.
                    </p>
                  )}
                </header>

                <DataTable
                  legenda={`Cursos do IPOG na área de ${area.nome}, com nível, duração e modalidades disponíveis.`}
                  cabecalhos={["Curso", "Nível", "Duração", "Modalidades"]}
                  linhas={cursosDaArea(area.slug).map((curso) => [
                    curso.nome,
                    curso.nivel,
                    curso.duracao ?? "Não informada",
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
            Este catálogo foi extraído das páginas de cursos de ipog.edu.br em
            19 de agosto de 2026, e a área de atuação de cada curso é a que o
            próprio site declara. Quando um curso é ofertado em mais de uma
            modalidade, ele aparece aqui uma única vez, com todas as modalidades
            reunidas. Preços, calendário e turmas com matrícula aberta ficam em{" "}
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
