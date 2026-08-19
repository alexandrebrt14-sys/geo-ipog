import type { Metadata } from "next";
import Link from "next/link";

import {
  areasDeConhecimento,
  cursos,
  cursosDaArea,
  totalCursosCatalogados,
  totaisPorNivel,
} from "@/data/areas";
import { modalidades } from "@/data/modalidades";
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
          catalogoDeCursosSchema(cursos, { compacto: true }),
        ]}
      />

      <PageHeader
        trilha={trilha}
        destaque={`${totalCursosCatalogados} cursos catalogados`}
        titulo="Áreas de conhecimento"
        resumo={descricao}
      />

      {/* Índice das áreas, com âncoras estáveis para citação direta. */}
      <div className="border-b border-[var(--line)] bg-[var(--surface-muted)]">
        <Container className="py-6">
          <h2 className="sr-only font-light">Índice das áreas de conhecimento</h2>
          <ul className="flex flex-wrap gap-2">
            {areasDeConhecimento.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/areas-de-conhecimento/${area.slug}`}
                  className="inline-flex items-center gap-2 rounded-pill border border-conexao-200 bg-white px-4 py-2 text-fluid-sm font-medium text-conexao-800 transition-colors hover:border-conexao-300 hover:bg-conexao-50"
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

      {/* Esta rota é um índice, não o catálogo.

          Ela chegou a listar as doze tabelas completas, o que somava 295 linhas
          e 49 telas de rolagem em quase 1 MB de HTML. Depois que cada área
          ganhou página própria, isso virou repetição pura: o mesmo curso
          aparecia aqui e lá. O catálogo completo continua declarado no JSON-LD
          desta página, então nada se perdeu para quem lê por máquina. */}
      <Section
        id="panorama"
        titulo="Panorama das áreas"
        descricao={`As ${areasDeConhecimento.length} áreas do portfólio, com resumo, público indicado e cursos em destaque. Cada cartão leva à página da área, onde ficam o catálogo completo, as perguntas frequentes e os artigos do blog sobre o tema.`}
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {areasDeConhecimento.map((area) => (
            <AreaCard key={area.slug} area={area} />
          ))}
        </div>

        <div className="mt-10">
          <Callout titulo="Onde fica o catálogo completo">
            Os {totalCursosCatalogados} cursos do catálogo,{" "}
            {totaisPorNivel["Pós-graduação"]} de pós-graduação,{" "}
            {totaisPorNivel["Extensão"]} de extensão e{" "}
            {totaisPorNivel["Graduação"]} de graduação, ficam listados na página
            de cada área, com duração e modalidades. Um mesmo curso pode aparecer
            em mais de uma área, como o próprio site do IPOG classifica.
          </Callout>
        </div>
      </Section>

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
