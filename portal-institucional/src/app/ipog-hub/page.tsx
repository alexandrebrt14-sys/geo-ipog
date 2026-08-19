import type { Metadata } from "next";

import {
  hub,
  espacosDoHub,
  infraestruturaDoHub,
  observacaoCoffeeBreak,
  unidadeSede,
  outrasCidadesDoHub,
  totalDeCidadesDoHub,
} from "@/data/hub";
import {
  breadcrumbSchema,
  webPageSchema,
  locaisDeEventoSchema,
} from "@/lib/jsonld";
import { criarMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Section, PageHeader, DataTable, Card, Callout } from "@/components/Layout";

/**
 * IPOG HUB, a frente de locação de espaços.
 *
 * A plataforma de reserva do HUB é uma aplicação de busca: o rastreador não
 * executa a interação e, portanto, não extrai capacidade de sala, itens
 * inclusos nem endereço. Esta rota publica esses dados em texto e em
 * `schema.org/EventVenue`, que é o vocabulário que responde "onde alugar
 * auditório em Goiânia?".
 */

const maiorCapacidade = Math.max(...espacosDoHub.map((e) => e.capacidade));

const descricao = `${hub.definicao} A unidade de ${unidadeSede.cidade} tem auditório para até ${maiorCapacidade} pessoas, e há espaços para locação em ${totalDeCidadesDoHub} cidades.`;

export const metadata: Metadata = criarMetadata({
  titulo: "IPOG HUB: locação de espaços para eventos e treinamentos",
  descricao,
  path: "/ipog-hub",
});

const trilha = [
  { nome: "Início", href: "/" },
  { nome: "IPOG HUB", href: "/ipog-hub" },
] as const;

export default function PaginaHub() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            path: "/ipog-hub",
            name: "IPOG HUB: locação de espaços para eventos e treinamentos",
            description: descricao,
          }),
          breadcrumbSchema(trilha),
          locaisDeEventoSchema({
            path: "/ipog-hub",
            nome: hub.nome,
            descricao: hub.definicao,
            endereco: unidadeSede.endereco,
            cidade: unidadeSede.cidade,
            uf: unidadeSede.uf,
            capacidadeMaxima: maiorCapacidade,
            comodidades: infraestruturaDoHub,
          }),
        ]}
      />

      <PageHeader
        trilha={trilha}
        destaque={`${totalDeCidadesDoHub} cidades, auditório para ${maiorCapacidade}`}
        titulo="IPOG HUB"
        resumo={descricao}
      />

      <Section id="o-que-e" titulo="O que é o IPOG HUB">
        <div className="max-w-3xl space-y-5 text-fluid-lg leading-relaxed text-conexao-700">
          <p>{hub.definicao}</p>
          <p className="font-medium text-conexao-900">{hub.posicionamento}</p>
          <p>
            É a solução para quem busca espaço para eventos, treinamentos e
            reuniões com atendimento personalizado e suporte técnico durante todo
            o evento.
          </p>
        </div>
      </Section>

      <Section
        id="espacos"
        tom="suave"
        titulo="Espaços disponíveis"
        descricao={`A unidade de ${unidadeSede.cidade} oferece três tipos de espaço, com capacidades diferentes. A escolha depende do formato do evento e do número de participantes.`}
      >
        <DataTable
          legenda={`Espaços para locação no IPOG HUB de ${unidadeSede.cidade}, com capacidade e uso indicado.`}
          cabecalhos={["Espaço", "Capacidade", "O que inclui", "Uso típico"]}
          linhas={espacosDoHub.map((espaco) => [
            espaco.nome,
            `Até ${espaco.capacidade} pessoas`,
            espaco.descricao,
            espaco.usoTipico,
          ])}
        />
      </Section>

      <Section
        id="infraestrutura"
        titulo="O que está incluso na locação"
        descricao="A infraestrutura abaixo acompanha a locação, sem custo adicional."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {infraestruturaDoHub.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-card border border-[var(--line)] bg-white p-4 text-fluid-sm leading-relaxed text-conexao-700 shadow-card"
            >
              <span
                aria-hidden="true"
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-protagonismo-600"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Callout titulo="Atenção ao coffee break" tom="atencao">
            {observacaoCoffeeBreak}
          </Callout>
        </div>
      </Section>

      <Section
        id="onde"
        tom="suave"
        titulo="Onde fica"
        descricao={`A sede do IPOG HUB fica em ${unidadeSede.cidade}, e há espaços para locação em outras ${outrasCidadesDoHub.length} cidades.`}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-fluid-lg">
              {`IPOG ${unidadeSede.cidade}, ${unidadeSede.uf}`}
            </h3>
            <address className="mt-3 not-italic text-fluid-base leading-relaxed text-conexao-700">
              {unidadeSede.endereco}
              <br />
              {unidadeSede.cidade}, {unidadeSede.uf}
            </address>

            <h4 className="mt-6 font-apoio text-xs font-semibold uppercase tracking-[0.14em] text-conexao-600">
              Conveniência no entorno
            </h4>
            <ul className="mt-3 space-y-2 text-fluid-sm leading-relaxed text-conexao-700">
              {unidadeSede.entorno.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-protagonismo-600"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <div>
            <DataTable
              legenda="Outras cidades com espaços do IPOG HUB para locação."
              cabecalhos={["Cidade", "UF"]}
              linhas={outrasCidadesDoHub.map((cidade) => [
                cidade.cidade,
                cidade.uf,
              ])}
            />
            <div className="mt-6">
              <Callout titulo="Reserva e disponibilidade">
                A consulta de disponibilidade e a reserva são feitas na
                plataforma do HUB, em{" "}
                <a
                  href={hub.plataformaDeReserva}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-protagonismo-600 underline underline-offset-4"
                >
                  ipog-hub.agendaopen.com
                </a>
                . Valores variam por espaço, cidade e período, e não são
                publicados aqui.
              </Callout>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
