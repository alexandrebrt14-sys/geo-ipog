import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  areasDeConhecimento,
  cursosDaArea,
  cursosDaAreaPorNivel,
  cursosInterdisciplinares,
  estatisticasDaArea,
  type AreaConhecimento,
} from "@/data/areas";
import { perguntasDaArea } from "@/lib/perguntas-da-area";
import { blocosDaArea } from "@/lib/resumos-da-area";
import { artigosDaArea, enderecoDoBlog } from "@/data/blog";
import {
  breadcrumbSchema,
  catalogoDeCursosSchema,
  faqSchema,
  webPageSchema,
} from "@/lib/jsonld";
import { criarMetadata } from "@/lib/seo";
import { corDeTextoAcessivel } from "@/lib/cor";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/FaqList";
import { IndiceDaPagina } from "@/components/IndiceDaPagina";
import {
  Container,
  Section,
  PageHeader,
  DataTable,
  Tag,
  Card,
} from "@/components/Layout";

/**
 * Página dedicada a uma área de conhecimento.
 *
 * Existe por uma razão de GEO: uma pergunta como "quais pós de engenharia o
 * IPOG oferece?" pede uma resposta sobre engenharia, não sobre o portfólio
 * inteiro. Concentrar as doze áreas em uma única rota obrigava o motor a
 * recortar o trecho certo de uma página longa, e o recorte costuma trazer curso
 * de outra área junto.
 *
 * A rota entrega quatro camadas, da mais extraível para a mais detalhada:
 *
 * 1. um retrato numérico da área, calculado do catálogo
 * 2. os temas que a área cobre, para responder "o que se aprende aqui"
 * 3. um FAQ próprio, com `FAQPage`, respondendo as perguntas mais prováveis
 * 4. o catálogo completo, separado por nível de formação
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
  const stats = estatisticasDaArea(area.slug);
  return `O IPOG oferece ${stats.total} ${
    stats.total === 1 ? "curso" : "cursos"
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
  const stats = estatisticasDaArea(area.slug);
  const interdisciplinares = cursosInterdisciplinares(area.slug);
  const perguntas = perguntasDaArea(area);
  const blocos = blocosDaArea(area);
  const artigos = artigosDaArea(area.slug);
  const descricao = descreverArea(area);
  const rota = `/areas-de-conhecimento/${area.slug}`;

  const trilha = [
    { nome: "Início", href: "/" },
    { nome: "Áreas de conhecimento", href: "/areas-de-conhecimento" },
    { nome: area.nome, href: rota },
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

  const modalidadesDisponiveis = (["Presencial", "Ao vivo", "EaD"] as const).filter(
    (modalidade) => stats.porModalidade[modalidade] > 0,
  );

  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            path: rota,
            name: `${area.nome}: cursos do IPOG na área`,
            description: descricao,
            relacionados: artigos.map((artigo) => artigo.url),
          }),
          breadcrumbSchema(trilha),
          faqSchema(perguntas, rota),
          catalogoDeCursosSchema(cursos, { path: rota }),
        ]}
      />

      <PageHeader
        trilha={trilha}
        destaque={`${cursos.length} ${cursos.length === 1 ? "curso" : "cursos"}`}
        titulo={area.nome}
        resumo={descricao}
      />

      <IndiceDaPagina
        itens={[
          { href: "#o-que-e", rotulo: "O que é" },
          { href: "#que-cursos", rotulo: "Que cursos" },
          { href: "#para-quem", rotulo: "Para quem" },
          { href: "#como-estudar", rotulo: "Como estudar" },
          { href: "#perguntas", rotulo: "Perguntas" },
          { href: "#catalogo", rotulo: "Catálogo" },
          ...(interdisciplinares.length > 0
            ? [{ href: "#interdisciplinares", rotulo: "Outras áreas" }]
            : []),
          ...(artigos.length > 0
            ? [{ href: "#no-blog", rotulo: "No blog" }]
            : []),
        ]}
      />

      {/* Retrato numérico: o bloco mais fácil de extrair da rota inteira. */}
      <div className="border-b border-[var(--line)] bg-[var(--surface-muted)]">
        <Container className="py-8">
          <h2 className="sr-only">{`Resumo numérico da área de ${area.nome}`}</h2>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            <div>
              <dd className="font-apoio text-fluid-2xl font-bold leading-none text-protagonismo-600">
                {stats.total}
              </dd>
              <dt className="mt-2 text-fluid-sm text-conexao-700">
                cursos na área
              </dt>
            </div>
            <div>
              <dd className="font-apoio text-fluid-2xl font-bold leading-none text-protagonismo-600">
                {stats.porNivel["Pós-graduação"]}
              </dd>
              <dt className="mt-2 text-fluid-sm text-conexao-700">
                de pós-graduação
              </dt>
            </div>
            <div>
              <dd className="font-apoio text-fluid-2xl font-bold leading-none text-protagonismo-600">
                {modalidadesDisponiveis.length}
              </dd>
              <dt className="mt-2 text-fluid-sm text-conexao-700">
                {modalidadesDisponiveis.length === 1
                  ? "modalidade disponível"
                  : "modalidades disponíveis"}
              </dt>
            </div>
            <div>
              <dd className="font-apoio text-fluid-2xl font-bold leading-none text-protagonismo-600">
                {stats.interdisciplinares}
              </dd>
              <dt className="mt-2 text-fluid-sm text-conexao-700">
                também em outra área
              </dt>
            </div>
          </dl>
        </Container>
      </div>

      {/* Respostas diretas.

          Cada título é a pergunta como o público a formula, e a resposta vem
          imediatamente abaixo, começando pela informação e não por rodeio. Os
          parágrafos têm entre 40 e 60 palavras, tamanho conferido no build por
          `scripts/verificar-paragrafos.mjs`, para que um motor generativo possa
          citar o trecho inteiro sem cortar a resposta pela metade. */}
      <section aria-labelledby={`${blocos[0].id}`} className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-9">
              {blocos.map((bloco) => (
                <article key={bloco.id} id={bloco.id} className="scroll-mt-24">
                  <h2 className="text-fluid-xl font-light uppercase">
                    {bloco.pergunta}
                  </h2>
                  <p
                    data-resposta={bloco.id}
                    className="mt-3 max-w-3xl text-fluid-base leading-relaxed text-conexao-700"
                  >
                    {bloco.resposta}
                  </p>
                </article>
              ))}
            </div>

            <div className="space-y-6">
              <Card>
                <h2 className="text-fluid-lg">Em números</h2>
                <dl className="mt-4 space-y-3 text-fluid-sm">
                  <div className="flex justify-between gap-4 border-b border-[var(--line)] pb-3">
                    <dt className="text-conexao-600">Modalidades</dt>
                    <dd className="text-right font-medium text-conexao-900">
                      {modalidadesDisponiveis.length > 0
                        ? modalidadesDisponiveis.join(", ")
                        : "Não informadas"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-[var(--line)] pb-3">
                    <dt className="text-conexao-600">Durações praticadas</dt>
                    <dd className="text-right font-medium text-conexao-900">
                      {stats.duracoes.length > 0
                        ? stats.duracoes.join(", ")
                        : "Não informadas"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-conexao-600">Rótulo no site oficial</dt>
                    <dd className="text-right font-medium text-conexao-900">
                      {area.rotuloOficial}
                    </dd>
                  </div>
                </dl>
              </Card>

              {area.temas.length > 0 && (
                <Card>
                  <h2 className="text-fluid-lg">
                    Quais temas a área cobre?
                  </h2>
                  <p className="mt-2 text-fluid-sm leading-relaxed text-conexao-600">
                    Assuntos recorrentes no catálogo de {area.nome} do IPOG.
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {area.temas.map((tema) => (
                      <li key={tema}>
                        <Tag cor={area.cor}>{tema}</Tag>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ da área: responde direto as perguntas mais prováveis sobre ela. */}
      <Section
        id="perguntas"
        tom="suave"
        titulo={`Perguntas frequentes sobre ${area.nome}`}
        descricao="As respostas abaixo são calculadas a partir do catálogo, então acompanham qualquer mudança na oferta de cursos."
      >
        <FaqList perguntas={perguntas} />
      </Section>

      {/* Catálogo da área, separado por nível de formação. */}
      <section
        id="catalogo"
        aria-labelledby="cursos-titulo"
        className="scroll-mt-32 border-t border-[var(--line)] py-14 sm:py-20"
      >
        <Container>
          <header className="max-w-3xl">
            <h2 id="cursos-titulo" className="text-fluid-2xl font-light uppercase">
              {`Cursos de ${area.nome}`}
            </h2>
            <p className="mt-4 text-fluid-lg leading-relaxed text-conexao-700">
              {porNivel
                .map(
                  (grupo) =>
                    `${grupo.cursos.length} de ${grupo.nivel.toLowerCase()}`,
                )
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
                  <h3 className="text-fluid-xl">{grupo.nivel}</h3>
                  <Tag cor={area.cor}>
                    {grupo.cursos.length}{" "}
                    {grupo.cursos.length === 1 ? "curso" : "cursos"}
                  </Tag>
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

      {interdisciplinares.length > 0 && (
        <Section
          id="interdisciplinares"
          tom="suave"
          titulo="Cursos que cruzam com outras áreas"
          descricao={`${interdisciplinares.length} dos ${stats.total} cursos de ${area.nome} também são classificados pelo IPOG em outra área. A tabela mostra quais, e onde mais eles aparecem.`}
        >
          <DataTable
            legenda={`Cursos de ${area.nome} que também pertencem a outras áreas de conhecimento do IPOG.`}
            cabecalhos={["Curso", "Também em"]}
            linhas={interdisciplinares.map(({ curso, outrasAreas }) => [
              curso.nome,
              <span key={curso.nome} className="flex flex-wrap gap-1.5">
                {outrasAreas.map((outra) => (
                  <Link
                    key={outra.slug}
                    href={`/areas-de-conhecimento/${outra.slug}`}
                    className="underline underline-offset-4"
                    /* A cor da área identifica o destino, mas as cores claras
                       da paleta não alcançam 4,5:1 sobre a linha branca da
                       tabela. O tom é derivado para o texto e a identidade da
                       área se mantém. */
                    style={{ color: corDeTextoAcessivel(outra.cor, "#ffffff") }}
                  >
                    {outra.nome}
                  </Link>
                ))}
              </span>,
            ])}
          />
        </Section>
      )}

      {/* Ligação com o blog.

          O blog é onde o IPOG publica conteúdo com profundidade editorial, e
          este portal é onde publica dado estruturado. Ligar os dois faz um
          motor generativo enxergar uma fonte só, com autoridade em duas
          camadas, em vez de dois sites soltos tratando do mesmo assunto. */}
      {artigos.length > 0 && (
        <Section
          id="no-blog"
          titulo={`O que ler sobre ${area.nome} no blog do IPOG`}
          descricao={`Artigos publicados pelo IPOG na categoria ${artigos[0].categoria} do blog, selecionados pela relação com esta área.`}
        >
          <ul className="grid gap-4 md:grid-cols-2">
            {artigos.map((artigo) => (
              <li key={artigo.url}>
                <a
                  href={artigo.url}
                  target="_blank"
                  rel="noopener"
                  className="flex h-full flex-col rounded-card border border-[var(--line)] bg-white p-5 shadow-card transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-conexao-200 hover:shadow-card-hover sm:p-6"
                >
                  <span
                    className="font-apoio text-xs font-semibold uppercase tracking-[0.14em]"
                    /* Rótulo pequeno em caixa alta sobre o cartão branco: é o
                       pior caso de legibilidade da página, então o tom vem
                       derivado em vez da cor crua da área. */
                    style={{ color: corDeTextoAcessivel(area.cor, "#ffffff") }}
                  >
                    {artigo.categoria}
                  </span>
                  <span className="mt-2 text-fluid-base font-semibold leading-snug text-conexao-900">
                    {artigo.titulo}
                  </span>
                  {artigo.publicado && (
                    <time
                      dateTime={artigo.publicado}
                      className="mt-3 text-fluid-sm text-conexao-600"
                    >
                      {new Date(`${artigo.publicado}T12:00:00`).toLocaleDateString(
                        "pt-BR",
                        { day: "2-digit", month: "long", year: "numeric" },
                      )}
                    </time>
                  )}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-fluid-base leading-relaxed text-conexao-700">
            O blog do IPOG reúne mais de mil artigos em doze categorias.{" "}
            <a
              href={enderecoDoBlog}
              target="_blank"
              rel="noopener"
              className="font-semibold text-protagonismo-600 underline underline-offset-4"
            >
              Ver o blog completo
            </a>
            .
          </p>
        </Section>
      )}

      {areasRelacionadas.length > 0 && (
        <Section
          id="areas-relacionadas"
          titulo="Áreas relacionadas"
          descricao={`Estas são as áreas que mais compartilham cursos com ${area.nome}.`}
        >
          <ul className="flex flex-wrap gap-3">
            {areasRelacionadas.map(({ area: outra, emComum }) => (
              <li key={outra.slug}>
                <Link
                  href={`/areas-de-conhecimento/${outra.slug}`}
                  className="inline-flex items-center gap-2 rounded-pill border border-conexao-200 bg-white px-4 py-2 text-fluid-sm font-medium text-conexao-800 transition-colors hover:border-conexao-300 hover:bg-conexao-50"
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

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/areas-de-conhecimento"
              className="font-semibold text-protagonismo-600 underline underline-offset-4"
            >
              Ver as {areasDeConhecimento.length} áreas de conhecimento
            </Link>
            <Link
              href="/metodo"
              className="font-semibold text-protagonismo-600 underline underline-offset-4"
            >
              Como funciona o Método IPOG
            </Link>
            <Link
              href="/unidades"
              className="font-semibold text-protagonismo-600 underline underline-offset-4"
            >
              Onde o IPOG tem unidade
            </Link>
          </div>
        </Section>
      )}
    </>
  );
}
