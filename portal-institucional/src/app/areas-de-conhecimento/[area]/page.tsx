import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  areasDeConhecimento,
  cursosDaArea,
  cursosDaAreaPorNivel,
  type AreaConhecimento,
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

/**
 * Página dedicada a uma área de conhecimento.
 *
 * Existe por uma razão de GEO: uma pergunta como "quais pós de engenharia o
 * IPOG oferece?" pede uma resposta sobre engenharia, não sobre o portfólio
 * inteiro. Concentrar as doze áreas em uma única rota obrigava o motor a
 * recortar o trecho certo de uma página longa, e o recorte costuma trazer curso
 * de outra área junto. Com uma rota por área, cada resposta tem um endereço
 * próprio, um h1 próprio e um catálogo que contém apenas aquela área.
 */

type Props = { params: Promise<{ area: string }> };

/** Gera as doze rotas no build, já que o portal é exportado como HTML estático. */
export function generateStaticParams() {
  return areasDeConhecimento.map((area) => ({ area: area.slug }));
}

function acharArea(slug: string): AreaConhecimento | undefined {
  return areasDeConhecimento.find((area) => area.slug === slug);
}

/** Frase de resumo reaproveitada na metadata e no topo da página. */
function descreverArea(area: AreaConhecimento): string {
  const total = cursosDaArea(area.slug).length;
  return `O IPOG oferece ${total} ${
    total === 1 ? "curso" : "cursos"
  } na área de ${area.nome}. ${area.resumo}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area: slug } = await params;
  const area = acharArea(slug);
  if (!area) return {};

  return criarMetadata({
    titulo: `${area.nome}: cursos do IPOG na área`,
    descricao: descreverArea(area),
    path: `/areas-de-conhecimento/${area.slug}`,
  });
}

export default async function PaginaDaArea({ params }: Props) {
  const { area: slug } = await params;
  const area = acharArea(slug);
  if (!area) notFound();

  const cursos = cursosDaArea(area.slug);
  const porNivel = cursosDaAreaPorNivel(area.slug);
  const descricao = descreverArea(area);

  const trilha = [
    { nome: "Início", href: "/" },
    { nome: "Áreas de conhecimento", href: "/areas-de-conhecimento" },
    { nome: area.nome, href: `/areas-de-conhecimento/${area.slug}` },
  ] as const;

  /** Áreas que mais compartilham cursos com esta, para navegação entre temas. */
  const areasRelacionadas = areasDeConhecimento
    .filter((outra) => outra.slug !== area.slug)
    .map((outra) => ({
      area: outra,
      emComum: cursos.filter((curso) => curso.areas.includes(outra.slug)).length,
    }))
    .filter((item) => item.emComum > 0)
    .sort((a, b) => b.emComum - a.emComum)
    .slice(0, 4);

  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            path: `/areas-de-conhecimento/${area.slug}`,
            name: `${area.nome}: cursos do IPOG na área`,
            description: descricao,
          }),
          breadcrumbSchema(trilha),
          catalogoDeCursosSchema(cursos),
        ]}
      />

      <PageHeader
        trilha={trilha}
        destaque={`${cursos.length} ${cursos.length === 1 ? "curso" : "cursos"}`}
        titulo={area.nome}
        resumo={descricao}
      />

      <Section id="para-quem" titulo={`Para quem é a área de ${area.nome}`}>
        <p className="max-w-3xl text-fluid-lg leading-relaxed text-conexao-700">
          {area.paraQuem}
        </p>

        {area.rotuloOficial !== area.nome && (
          <div className="mt-6">
            <Callout titulo="Como esta área aparece no site do IPOG">
              No filtro de cursos de ipog.edu.br, {area.nome} aparece sob o
              rótulo <strong>{area.rotuloOficial}</strong>, que reúne mais de uma
              área em um único item de filtro. São a mesma oferta, com nomes
              diferentes em cada lugar.
            </Callout>
          </div>
        )}
      </Section>

      {/* Catálogo da área, separado por nível de formação. */}
      <section
        aria-labelledby="cursos-titulo"
        className="bg-[var(--surface-muted)] py-14 sm:py-20"
      >
        <Container>
          <header className="max-w-3xl">
            <h2 id="cursos-titulo" className="text-fluid-2xl font-bold uppercase">
              Cursos de {area.nome}
            </h2>
            <p className="mt-4 text-fluid-lg leading-relaxed text-conexao-700">
              {porNivel
                .map((grupo) => `${grupo.cursos.length} de ${grupo.nivel.toLowerCase()}`)
                .join(", ")}
              . Cada linha traz a duração e as modalidades em que o curso é
              ofertado.
            </p>
          </header>

          <div className="mt-10 space-y-12">
            {porNivel.map((grupo) => (
              <article key={grupo.nivel}>
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-8 w-1.5 rounded-full"
                    style={{ backgroundColor: area.cor }}
                  />
                  <h3 className="text-fluid-xl font-bold uppercase text-digital-900">
                    {grupo.nivel}
                  </h3>
                  <Tag cor={area.cor}>{grupo.cursos.length} cursos</Tag>
                </div>

                <DataTable
                  legenda={`Cursos de ${grupo.nivel.toLowerCase()} do IPOG na área de ${area.nome}, com duração e modalidades.`}
                  cabecalhos={["Curso", "Duração", "Modalidades"]}
                  linhas={grupo.cursos.map((curso) => [
                    curso.nome,
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

      {areasRelacionadas.length > 0 && (
        <Section
          id="areas-relacionadas"
          titulo="Áreas relacionadas"
          descricao={`Um mesmo curso pode pertencer a mais de uma área. Estas são as áreas que mais compartilham cursos com ${area.nome}.`}
        >
          <ul className="flex flex-wrap gap-3">
            {areasRelacionadas.map(({ area: outra, emComum }) => (
              <li key={outra.slug}>
                <Link
                  href={`/areas-de-conhecimento/${outra.slug}`}
                  className="inline-flex items-center gap-2 rounded-pill border border-digital-200 bg-white px-4 py-2 text-fluid-sm font-medium text-digital-800 transition-colors hover:border-digital-300 hover:bg-digital-50"
                >
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: outra.cor }}
                  />
                  {outra.nome}
                  <span className="text-conexao-600">
                    {emComum} {emComum === 1 ? "curso" : "cursos"} em comum
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Link
              href="/areas-de-conhecimento"
              className="font-semibold text-protagonismo-600 underline underline-offset-4"
            >
              Ver as {areasDeConhecimento.length} áreas de conhecimento
            </Link>
          </div>
        </Section>
      )}
    </>
  );
}
