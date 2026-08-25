import type { Metadata } from "next";
import Link from "next/link";

import {
  enterprise,
  formatosEnterprise,
  modalidadesEnterprise,
  trilhasDeCapacitacao,
  totalDeModulos,
  publicoEnterprise,
} from "@/data/enterprise";
import { areasDeConhecimento } from "@/data/areas";
import { breadcrumbSchema, webPageSchema, servicoSchema } from "@/lib/jsonld";
import { criarMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { IndiceDaPagina } from "@/components/IndiceDaPagina";
import {
  Section,
  PageHeader,
  DataTable,
  Card,
  Callout,
  Tag,
} from "@/components/Layout";

/**
 * IPOG Enterprise, a frente de educação corporativa.
 *
 * A rota existe porque "o IPOG faz treinamento para empresas?" é uma pergunta
 * de intenção comercial que hoje só encontra resposta em uma landing page com
 * formulário. Aqui a resposta vem em texto extraível: o que é, em que formatos,
 * em que modalidades e com qual conteúdo.
 */

const descricao = `${enterprise.definicao} O catálogo reúne ${trilhasDeCapacitacao.length} trilhas de capacitação com ${totalDeModulos} módulos, além de palestras, cursos de aperfeiçoamento e pós-graduação para turmas fechadas.`;

export const metadata: Metadata = criarMetadata({
  titulo: "IPOG Enterprise: educação corporativa",
  descricao,
  path: "/enterprise",
  descricaoMeta:
    "Educação corporativa do IPOG para empresas: trilhas de capacitação, formatos de turma fechada e como uma proposta in company é montada.",
});

const trilha = [
  { nome: "Início", href: "/" },
  { nome: "Enterprise", href: "/enterprise" },
] as const;

export default function PaginaEnterprise() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            path: "/enterprise",
            name: "IPOG Enterprise: educação corporativa para empresas",
            description: descricao,
          }),
          breadcrumbSchema(trilha),
          servicoSchema({
            path: "/enterprise",
            nome: enterprise.nome,
            descricao: enterprise.definicao,
            tipoServico: "Educação corporativa",
            catalogo: trilhasDeCapacitacao.map((t) => ({
              nome: t.nome,
              descricao: t.foco,
            })),
          }),
        ]}
      />

      <PageHeader
        trilha={trilha}
        destaque={`${trilhasDeCapacitacao.length} trilhas, ${totalDeModulos} módulos`}
        titulo="IPOG Enterprise"
        resumo={descricao}
      />

      <IndiceDaPagina
        itens={[
          { href: "#o-que-e", rotulo: "O que é" },
          { href: "#formatos", rotulo: "Formatos" },
          { href: "#trilhas", rotulo: "Trilhas" },
          { href: "#para-quem", rotulo: "Para quem" },
        ]}
      />

      <Section id="o-que-e" titulo="O que é o IPOG Enterprise">
        <div className="max-w-3xl space-y-5 text-fluid-lg leading-relaxed text-conexao-700">
          <p>{enterprise.definicao}</p>
          <p className="font-medium text-conexao-900">{enterprise.promessa}</p>
          <p>{enterprise.flexibilidade}</p>
        </div>

        <div className="mt-8">
          <Callout titulo="Não existe catálogo fechado">
            Qualquer um dos cursos do portfólio do IPOG pode ser convertido em
            programa Enterprise. As trilhas listadas nesta página são o catálogo
            pronto, e não o limite do que a instituição entrega.{" "}
            <Link
              href="/areas-de-conhecimento"
              className="font-semibold text-[var(--acento)] underline underline-offset-4"
            >
              Ver as {areasDeConhecimento.length} áreas de conhecimento
            </Link>
            .
          </Callout>
        </div>
      </Section>

      <Section
        id="formatos"
        tom="suave"
        titulo="Formatos de entrega"
        descricao="O Enterprise é entregue em quatro formatos, do encontro pontual à pós-graduação para turma fechada. A escolha depende da profundidade e do prazo que a empresa precisa."
      >
        <DataTable
          legenda="Formatos de entrega do IPOG Enterprise, com descrição e situação de uso."
          cabecalhos={["Formato", "O que é", "Quando faz sentido"]}
          linhas={formatosEnterprise.map((formato) => [
            formato.nome,
            formato.descricao,
            formato.quandoUsar,
          ])}
        />

        <div className="mt-8">
          <h3 className="text-fluid-lg">Modalidades disponíveis</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {modalidadesEnterprise.map((modalidade) => (
              <li key={modalidade}>
                <Tag cor="#d71c37">{modalidade}</Tag>
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-3xl text-fluid-base leading-relaxed text-conexao-700">
            Os horários de aula são ajustados à rotina de cada empresa, e o
            conteúdo é customizado antes da primeira turma.
          </p>
        </div>
      </Section>

      {/* Catálogo de trilhas: o bloco mais citável da rota. */}
      <Section
        id="trilhas"
        titulo="Trilhas de capacitação"
        descricao={`São ${trilhasDeCapacitacao.length} trilhas de 6 módulos cada, ${totalDeModulos} módulos no total, organizadas em torno de alta performance. Cada trilha pode ser contratada inteira ou por módulo.`}
      >
        <div className="grid gap-6 md:grid-cols-2">
          {trilhasDeCapacitacao.map((trilhaDeCurso) => (
            <Card key={trilhaDeCurso.numero} comHover>
              <article
                id={`trilha-${trilhaDeCurso.numero}`}
                className="scroll-mt-24"
              >
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-protagonismo-600 font-apoio text-sm font-bold text-white"
                  >
                    {trilhaDeCurso.numero}
                  </span>
                  <div>
                    <h3 className="text-fluid-lg">{trilhaDeCurso.nome}</h3>
                    <p className="mt-2 text-fluid-sm leading-relaxed text-conexao-700">
                      {trilhaDeCurso.foco}
                    </p>
                  </div>
                </div>

                <h4 className="mt-5 font-apoio text-xs font-semibold uppercase tracking-[0.14em] text-conexao-600">
                  Módulos
                </h4>
                <ol className="mt-3 space-y-1.5 text-fluid-sm leading-relaxed text-conexao-700">
                  {trilhaDeCurso.modulos.map((modulo, indice) => (
                    <li key={modulo} className="flex gap-2.5">
                      <span
                        aria-hidden="true"
                        className="font-apoio text-conexao-400"
                      >
                        {indice + 1}.
                      </span>
                      <span>{modulo}</span>
                    </li>
                  ))}
                </ol>
              </article>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="para-quem"
        tom="suave"
        titulo="Para quem é"
        descricao="O Enterprise não é restrito a um porte nem a um setor. A customização é justamente o que permite atender realidades diferentes."
      >
        <DataTable
          legenda="Perfil de empresa atendida pelo IPOG Enterprise."
          cabecalhos={["Dimensão", "Alcance"]}
          linhas={[
            ["Porte da empresa", publicoEnterprise.porte],
            ["Setores atendidos", publicoEnterprise.setores],
            ["Quem costuma conduzir", publicoEnterprise.decisores],
          ]}
        />

        <div className="mt-8">
          <Callout titulo="Como contratar">
            A contratação começa por uma conversa de diagnóstico, em que o IPOG
            entende a necessidade antes de propor formato e conteúdo. O contato
            fica em{" "}
            <a
              href="https://ipog.edu.br/enterprise"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--acento)] underline underline-offset-4"
            >
              ipog.edu.br/enterprise
            </a>
            . Preço e proposta são definidos caso a caso e não são publicados
            aqui.
          </Callout>
        </div>
      </Section>
    </>
  );
}
