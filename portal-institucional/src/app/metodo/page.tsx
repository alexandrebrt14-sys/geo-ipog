import type { Metadata } from "next";

import {
  metodoResumo,
  dimensoesDoMetodo,
  cicloDeAprendizagem,
  horariosDeAula,
  regrasAcademicas,
  planoIpogmais,
  condicoesIpogmais,
} from "@/data/metodo";
import { modalidades } from "@/data/modalidades";
import { breadcrumbSchema, webPageSchema } from "@/lib/jsonld";
import { criarMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import {
  Section,
  PageHeader,
  Card,
  DataTable,
  Callout,
} from "@/components/Layout";

const descricao =
  "O Método IPOG é a metodologia própria da instituição, baseada nas recomendações da UNESCO para a Educação do Século XXI. Conheça as dimensões do método, o ciclo de aprendizagem experiencial, o formato das aulas e as regras acadêmicas de avaliação, TCC e certificação.";

export const metadata: Metadata = criarMetadata({
  titulo: "Método IPOG e regras acadêmicas",
  descricao,
  path: "/metodo",
  descricaoMeta:
    "O Método IPOG e as regras acadêmicas: formato das aulas, frequência mínima, critério de aprovação, TCC e emissão do certificado.",
});

const trilha = [
  { nome: "Início", href: "/" },
  { nome: "Método IPOG", href: "/metodo" },
] as const;

export default function PaginaMetodo() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            path: "/metodo",
            name: "Método IPOG e regras acadêmicas",
            description: descricao,
          }),
          breadcrumbSchema(trilha),
        ]}
      />

      <PageHeader
        trilha={trilha}
        destaque="Metodologia própria"
        titulo="Método IPOG"
        resumo={metodoResumo}
      />

      <Section
        id="dimensoes"
        titulo="As dimensões do método"
        descricao="O Método IPOG organiza a experiência de aprendizagem em dimensões complementares, que atuam sobre a formação do professor e sobre a integração entre a sala de aula e o ambiente virtual."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {dimensoesDoMetodo.map((dimensao) => (
            <Card key={dimensao.numero} comHover className="flex flex-col">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--acento-tenue)] font-apoio text-lg font-bold text-[var(--acento)]">
                {dimensao.numero}
              </span>
              <h3 className="mt-4 text-fluid-xl font-semibold normal-case text-conexao-900">
                {dimensao.titulo}
              </h3>
              <p className="mt-3 text-fluid-base leading-relaxed text-conexao-700">
                {dimensao.descricao}
              </p>
              <ul className="mt-5 space-y-2.5 border-t border-[var(--line)] pt-5">
                {dimensao.praticas.map((pratica) => (
                  <li
                    key={pratica}
                    className="flex items-start gap-3 text-fluid-sm text-conexao-700"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-protagonismo-600"
                    />
                    {pratica}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Callout titulo="Nota de proveniência">
            O Manual do Aluno descreve o Método IPOG como estruturado em três
            dimensões, mas nomeia apenas duas no texto extraível: a terceira
            aparece somente no infográfico do documento original. Este portal
            publica as dimensões efetivamente documentadas e será atualizado
            quando a área Acadêmica confirmar a terceira.
          </Callout>
        </div>
      </Section>

      <Section
        id="ciclo"
        tom="suave"
        titulo="Ciclo de Aprendizagem Experiencial"
        descricao="O ciclo que orienta a experiência de aprendizagem tem quatro etapas, cada uma respondendo a uma pergunta específica."
      >
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cicloDeAprendizagem.map((etapa, indice) => (
            <li
              key={etapa.etapa}
              className="relative rounded-card border border-[var(--line)] bg-[var(--surface)] p-6 shadow-card"
            >
              <span className="font-apoio text-sm font-semibold uppercase tracking-[0.14em] text-conexao-600">
                Etapa {indice + 1}
              </span>
              <h3 className="mt-2 text-fluid-xl font-semibold normal-case text-[var(--acento)]">
                {etapa.etapa}
              </h3>
              <p className="mt-3 text-fluid-sm text-conexao-600">
                Foco em {etapa.foco.toLowerCase()}
              </p>
              <p className="mt-3 border-t border-[var(--line)] pt-3 text-fluid-base font-medium text-conexao-800">
                {etapa.pergunta}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="formato"
        titulo="Formato das aulas"
        descricao="As aulas acontecem preferencialmente uma vez por mês, em três dias consecutivos, de sexta a domingo, formando um módulo completo. O formato intensivo foi desenhado para quem já está no mercado de trabalho."
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <DataTable
            legenda="Horários de aula por dia da semana, em um módulo do IPOG."
            cabecalhos={["Dia", "Horário", "Carga horária"]}
            linhas={horariosDeAula.map((item) => [
              item.dia,
              item.horario,
              item.carga,
            ])}
          />
          <DataTable
            legenda="Modalidades de ensino, com frequência mínima e composição da nota."
            cabecalhos={["Modalidade", "Frequência mínima", "Composição da nota"]}
            linhas={modalidades.map((modalidade) => [
              modalidade.nome,
              modalidade.frequenciaMinima,
              modalidade.composicaoNota,
            ])}
          />
        </div>
      </Section>

      <Section
        id="regras"
        tom="suave"
        titulo="Regras acadêmicas e prazos"
        descricao="Critérios de aprovação, prazos de TCC e de certificação, na forma em que constam no Manual do Aluno de Pós-Graduação."
      >
        <DataTable
          legenda="Regras acadêmicas do IPOG, com o parâmetro de cada tema e o detalhamento aplicável."
          cabecalhos={["Tema", "Regra", "Detalhamento"]}
          linhas={regrasAcademicas.map((regra) => [
            regra.tema,
            <strong key={regra.tema} className="text-[var(--acento-forte)]">
              {regra.regra}
            </strong>,
            regra.detalhe,
          ])}
        />

        <div className="mt-8">
          <Callout titulo="Aprovação exige os dois critérios" tom="atencao">
            Nos módulos presenciais e ao vivo, a aprovação depende do atendimento
            simultâneo de frequência mínima de 75% e nota mínima 7,0. Atender a
            apenas um dos dois não aprova o aluno no módulo.
          </Callout>
        </div>
      </Section>

      <Section
        id="ipogmais"
        titulo="Plano IPOGMAIS"
        descricao="A cada especialização concluída, o aluno acumula créditos curriculares para usar em pós-graduações futuras, com desconto progressivo."
      >
        <DataTable
          legenda="Descontos progressivos do Plano IPOGMAIS, por número de pós-graduações cursadas."
          cabecalhos={["Pós-graduação", "Módulos aproveitados", "Desconto"]}
          linhas={planoIpogmais.map((beneficio) => [
            beneficio.posGraduacao,
            String(beneficio.modulosAproveitados),
            <strong key={beneficio.posGraduacao} className="text-[var(--acento-forte)]">
              {beneficio.desconto}
            </strong>,
          ])}
        />

        <div className="mt-8">
          <h3 className="font-apoio text-fluid-lg font-semibold normal-case text-conexao-900">
            Condições do benefício
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {condicoesIpogmais.map((condicao) => (
              <li
                key={condicao}
                className="flex items-start gap-3 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4 text-fluid-sm leading-relaxed text-conexao-700"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-protagonismo-600"
                />
                {condicao}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
