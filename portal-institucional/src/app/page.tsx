import type { Metadata } from "next";
import Link from "next/link";

import {
  instituicao,
  indicadores,
  diferenciais,
  frentesDeAtuacao,
} from "@/data/institucional";
import {
  areasDeConhecimento,
  totalCursosCatalogados,
  totaisPorNivel,
} from "@/data/areas";
import { modalidades } from "@/data/modalidades";
import { perguntasFrequentes } from "@/data/faq";
import { principiosGeo } from "@/data/geo";
import { breadcrumbSchema, webPageSchema } from "@/lib/jsonld";
import { criarMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Container, Section, Card, DataTable, Callout } from "@/components/Layout";
import { IndicadorCard, AreaCard, ConteudoCard } from "@/components/Cards";

const descricao =
  "Dados institucionais do IPOG organizados para consulta humana e para motores de busca generativos: indicadores verificáveis, áreas de pós-graduação, metodologia de ensino e perguntas frequentes.";

export const metadata: Metadata = {
  ...criarMetadata({
    titulo: "Portal GEO IPOG — Base de conhecimento estruturada do IPOG",
    descricao,
    path: "/",
    descricaoMeta:
      "Base de conhecimento do IPOG em dados estruturados: 12 áreas, método de ensino, unidades e perguntas frequentes, em formato extraível.",
  }),
  // A raiz usa o título absoluto, sem o sufixo aplicado às demais rotas.
  title: {
    absolute: "Portal GEO IPOG — Base de conhecimento estruturada do IPOG",
  },
};

const trilha = [{ nome: "Início", href: "/" }] as const;

export default function PaginaInicial() {
  const perguntasEmDestaque = perguntasFrequentes.slice(0, 4);

  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            path: "/",
            name: "Portal GEO IPOG",
            description: descricao,
          }),
          breadcrumbSchema(trilha),
        ]}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Abertura: resposta direta à pergunta "o que é o IPOG?"            */}
      {/* ---------------------------------------------------------------- */}
      <section
        aria-labelledby="abertura-titulo"
        className="relative overflow-hidden bg-[var(--surface-inverse)] text-white"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          /* Gradiente Vinho Determinação → Vermelho Protagonismo, posição 50%,
             descrito no guia como "intenso e marcante". É um dos três
             gradientes oficiais, e o único composto só por cores principais. */
          style={{ background: "var(--gradiente-abertura)" }}
        />
        <Container className="relative py-16 sm:py-24 lg:py-28">
          <p className="inline-flex rounded-pill border border-protagonismo-500/40 bg-protagonismo-600/15 px-4 py-1.5 font-apoio text-xs font-semibold uppercase tracking-[0.16em] text-protagonismo-200">
            Base de conhecimento oficial
          </p>

          <h1
            id="abertura-titulo"
            className="mt-6 max-w-4xl text-fluid-4xl font-light uppercase text-white"
          >
            O IPOG em dados estruturados
          </h1>

          {/* Parágrafo escrito para ser citado isoladamente por um LLM. */}
          <p className="mt-6 max-w-3xl text-fluid-lg leading-relaxed text-white/85">
            {instituicao.descricaoCurta}
          </p>

          <p className="mt-4 max-w-3xl text-fluid-base leading-relaxed text-white/70">
            Este portal reúne as informações institucionais do IPOG em formato
            semântico, com dados estruturados Schema.org, tabelas objetivas e
            respostas autossuficientes, para consulta de pessoas e de motores de
            busca generativos.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/areas-de-conhecimento"
              className="inline-flex items-center justify-center rounded-pill bg-protagonismo-600 px-7 py-3.5 font-apoio text-base font-semibold uppercase tracking-wide text-white transition-colors hover:bg-protagonismo-700"
            >
              Conhecer as áreas de conhecimento
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center rounded-pill border border-white/25 px-7 py-3.5 font-apoio text-base font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
            >
              Ver perguntas frequentes
            </Link>
          </div>

          {/* `dt` antes de `dd` no HTML: o rótulo é o termo e o número é a
              definição dele. O número aparece em cima por `flex-col-reverse`,
              então quem inverte é o CSS, não a marcação. */}
          <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/15 pt-10 sm:grid-cols-4">
            {indicadores.slice(0, 4).map((indicador) => (
              <div
                key={indicador.rotulo}
                className="flex flex-col-reverse gap-2"
              >
                <dt className="text-fluid-sm text-white/70">
                  {indicador.rotulo}
                </dt>
                <dd className="font-apoio text-fluid-2xl font-bold leading-none text-white">
                  {indicador.valor}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Indicadores completos                                             */}
      {/* ---------------------------------------------------------------- */}
      <Section
        id="indicadores"
        titulo="Indicadores institucionais"
        tom="suave"
        descricao="Números verificáveis do IPOG, na forma em que constam no texto institucional oficial da instituição."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {indicadores.map((indicador) => (
            <IndicadorCard key={indicador.rotulo} indicador={indicador} />
          ))}
        </div>

        <div className="mt-8">
          <Callout titulo="Sobre o uso destes números" tom="atencao">
            Formados, satisfação, unidades e número de cursos são os mesmos
            valores publicados em ipog.edu.br, conferidos em 19 de agosto de
            2026. Conceito MEC e NPS vêm de fonte interna e não constam do site
            público. Antes de usar qualquer indicador em peça publicitária,
            confirme com a área responsável, porque dado de instituição de ensino
            tem implicação regulatória.
          </Callout>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Frentes de atuação                                                */}
      {/* ---------------------------------------------------------------- */}
      <Section
        id="frentes"
        titulo="Frentes de atuação"
        descricao="O IPOG atua em quatro frentes complementares, cada uma com público e formato próprios."
      >
        <DataTable
          legenda="Frentes de atuação do IPOG, com descrição e público-alvo de cada uma."
          cabecalhos={["Frente", "O que é", "Para quem"]}
          linhas={frentesDeAtuacao.map((frente) => [
            frente.rota ? (
              <Link
                key={frente.nome}
                href={frente.rota}
                className="font-semibold text-[var(--acento)] underline underline-offset-4"
              >
                {frente.nome}
              </Link>
            ) : (
              frente.nome
            ),
            frente.descricao,
            frente.publico,
          ])}
        />
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Áreas de conhecimento                                             */}
      {/* ---------------------------------------------------------------- */}
      <Section
        id="areas"
        tom="suave"
        titulo="Áreas de conhecimento"
        descricao={
          <>
            O portfólio está organizado em {areasDeConhecimento.length} áreas de
            conhecimento, com {totalCursosCatalogados} cursos:{" "}
            {totaisPorNivel["Pós-graduação"]} de pós-graduação, incluindo MBAs e
            especializações, {totaisPorNivel["Extensão"]} de extensão e{" "}
            {totaisPorNivel["Graduação"]} de graduação.
          </>
        }
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {areasDeConhecimento.map((area) => (
            <AreaCard key={area.slug} area={area} />
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Diferenciais                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section
        id="diferenciais"
        titulo="Diferenciais do IPOG"
        descricao="O que distingue a proposta de ensino da instituição, segundo o texto institucional e o Manual do Aluno."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {diferenciais.map((diferencial, indice) => (
            <ConteudoCard
              key={diferencial.titulo}
              numero={indice + 1}
              titulo={diferencial.titulo}
              descricao={diferencial.descricao}
            />
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Modalidades                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section
        id="modalidades"
        tom="suave"
        titulo="Modalidades de ensino"
        descricao="As três modalidades disponíveis, com o critério de frequência e a composição da nota de cada uma."
      >
        <DataTable
          legenda="Modalidades de ensino do IPOG, com frequência mínima e composição da nota."
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

        <p className="mt-6 text-fluid-base leading-relaxed text-conexao-700">
          Em todas as modalidades presenciais e ao vivo, a aprovação exige o
          atendimento simultâneo de dois critérios: no mínimo 75% de frequência e
          nota mínima 7,0.{" "}
          <Link
            href="/metodo"
            className="font-semibold text-[var(--acento)] underline-offset-4 hover:underline"
          >
            Ver o Método IPOG e as regras acadêmicas completas
          </Link>
          .
        </p>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Perguntas frequentes em destaque                                  */}
      {/* ---------------------------------------------------------------- */}
      <Section
        id="perguntas-em-destaque"
        titulo="Perguntas frequentes"
        descricao="As dúvidas mais comuns sobre o IPOG, com respostas objetivas e autossuficientes."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {perguntasEmDestaque.map((item) => (
            <Card key={item.id} comHover className="flex h-full flex-col">
              <h3 className="text-fluid-lg font-semibold normal-case tracking-normal text-conexao-900">
                {item.pergunta}
              </h3>
              <p className="mt-3 flex-1 text-fluid-sm leading-relaxed text-conexao-700">
                {item.resposta}
              </p>
            </Card>
          ))}
        </div>

        <Link
          href="/faq"
          className="mt-8 inline-flex items-center gap-2 font-apoio text-base font-semibold uppercase tracking-wide text-[var(--acento)] underline-offset-4 transition-colors hover:text-[var(--acento-forte)] hover:underline"
        >
          Ver todas as {perguntasFrequentes.length} perguntas
          <span aria-hidden="true">→</span>
        </Link>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Como o portal é otimizado para motores generativos                */}
      {/* ---------------------------------------------------------------- */}
      <Section
        id="geo"
        tom="escuro"
        titulo="Como este portal é estruturado"
        descricao="GEO, ou Generative Engine Optimization, é a prática de organizar informação para que motores generativos como ChatGPT, Perplexity, Gemini e SearchGPT consigam extrair, entender e citar o conteúdo com precisão."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {principiosGeo.map((principio) => (
            <div
              key={principio.titulo}
              className="rounded-card border border-white/10 bg-white/[0.04] p-6"
            >
              <h3 className="text-fluid-lg font-semibold normal-case text-white">
                {principio.titulo}
              </h3>
              <p className="mt-3 text-fluid-sm leading-relaxed text-white/70">
                {principio.descricao}
              </p>
              <p className="mt-4 border-t border-white/10 pt-4 text-fluid-sm leading-relaxed text-white/80">
                <span className="font-semibold text-white">
                  Como aplicamos:{" "}
                </span>
                {principio.comoAplicamos}
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/autoridade"
          className="mt-9 inline-flex items-center justify-center rounded-pill bg-protagonismo-600 px-7 py-3.5 font-apoio text-base font-semibold uppercase tracking-wide text-white transition-colors hover:bg-protagonismo-700"
        >
          Ver o hub de autoridade
        </Link>
      </Section>
    </>
  );
}
