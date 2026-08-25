import type { Metadata } from "next";

import {
  instituicao,
  indicadores,
  frentesDeAtuacao,
  valores,
  arquetipos,
  canaisAtendimento,
  portais,
} from "@/data/institucional";
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
  "O IPOG, Instituto de Pós-Graduação e Graduação, foi fundado em 2001 em Goiânia e atua em todos os 26 estados brasileiros e no Distrito Federal. Conheça a história, o propósito, a visão, os valores, as frentes de atuação e os canais de atendimento da instituição.";

export const metadata: Metadata = criarMetadata({
  titulo: "Sobre o IPOG: história e propósito",
  descricao,
  path: "/sobre",
  descricaoMeta:
    "História, propósito, visão e valores do IPOG, os canais de atendimento por área e os portais digitais usados por aluno e professor.",
});

const trilha = [
  { nome: "Início", href: "/" },
  { nome: "Sobre o IPOG", href: "/sobre" },
] as const;

export default function PaginaSobre() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            path: "/sobre",
            name: "Sobre o IPOG",
            description: descricao,
          }),
          breadcrumbSchema(trilha),
        ]}
      />

      <PageHeader
        trilha={trilha}
        destaque={`Desde ${instituicao.fundacao}`}
        titulo="Sobre o IPOG"
        resumo={descricao}
      />

      <Section
        id="historia"
        titulo="Quem é o IPOG"
        descricao="Texto institucional oficial da instituição."
      >
        <article className="max-w-3xl space-y-5 text-fluid-base leading-relaxed text-conexao-700">
          <p>
            Fundado em 2001, em Goiânia, o IPOG nasceu para aproximar o ensino
            superior de quem já está no mercado. Em mais de duas décadas de
            atuação, tornou-se uma das principais referências em pós-graduação e
            educação corporativa do país.
          </p>
          <p>
            Hoje, a instituição opera 52 unidades e está presente em todos os 26
            estados brasileiros e no Distrito Federal, e já colocou a sua chancela
            no currículo de 300 mil profissionais. A satisfação dos alunos chega a
            98%, com NPS 98, e a instituição detém a nota máxima do MEC, conceito
            5.
          </p>
          <p>
            O portfólio reúne mais de 120 opções de pós-graduação, além de cursos
            de extensão e graduação pela Faculdade IPOG. O diferencial está na
            metodologia aplicada: o conteúdo é pensado para uso imediato, com
            cases reais discutidos em aula. As especializações seguem formato
            intensivo, com módulos mensais concentrados em três dias
            consecutivos, o que permite conciliar estudo e rotina profissional.
          </p>
          <p>
            O corpo docente reúne doutores, mestres e especialistas com sólida
            formação acadêmica e atuação ativa no mercado. A instituição também
            oferece soluções de educação corporativa pelo IPOG Enterprise,
            levando às empresas a mesma metodologia prática que marca a sua
            atuação.
          </p>
          <p>
            Sob a liderança de {instituicao.ceo}, CEO desde {instituicao.ceoDesde}
            , o IPOG vive um movimento de aceleração digital e expansão
            estratégica, consolidando-se como um ecossistema de transformação de
            carreiras e de negócios em todo o Brasil.
          </p>
        </article>
      </Section>

      <Section
        id="numeros"
        tom="suave"
        titulo="Números-chave"
        descricao="Indicadores institucionais consolidados, em formato de tabela para consulta rápida."
      >
        <DataTable
          legenda="Indicadores institucionais do IPOG, com valor e detalhamento."
          cabecalhos={["Indicador", "Valor", "Detalhamento"]}
          linhas={indicadores.map((indicador) => [
            indicador.rotulo,
            <strong key={indicador.rotulo} className="text-[var(--acento-forte)]">
              {indicador.valor}
            </strong>,
            indicador.detalhe,
          ])}
        />
      </Section>

      <Section
        id="proposito"
        titulo="Propósito, visão e promessa"
        descricao="A plataforma de marca do IPOG define o que a instituição existe para fazer e onde quer chegar."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <Card comHover className="flex flex-col border-l-4 border-l-protagonismo-600">
            <h3 className="font-apoio text-sm font-semibold normal-case tracking-[0.16em] text-conexao-600">
              Propósito
            </h3>
            <p className="mt-3 text-fluid-lg font-medium leading-relaxed text-conexao-900">
              {instituicao.proposito}
            </p>
          </Card>
          <Card comHover className="flex flex-col border-l-4 border-l-protagonismo-600">
            <h3 className="font-apoio text-sm font-semibold normal-case tracking-[0.16em] text-conexao-600">
              Visão
            </h3>
            <p className="mt-3 text-fluid-lg font-medium leading-relaxed text-conexao-900">
              {instituicao.visao}
            </p>
          </Card>
          <Card comHover className="flex flex-col border-l-4 border-l-protagonismo-950">
            <h3 className="font-apoio text-sm font-semibold normal-case tracking-[0.16em] text-conexao-600">
              Promessa
            </h3>
            <p className="mt-3 text-fluid-base leading-relaxed text-conexao-900">
              {instituicao.promessa}
            </p>
          </Card>
        </div>

        <div className="mt-8 rounded-card bg-[var(--surface-inverse)] p-8 text-center sm:p-12">
          <p className="font-apoio text-sm font-semibold uppercase tracking-[0.16em] text-white/60">
            Tagline
          </p>
          <p className="mt-4 font-apoio text-fluid-2xl font-bold uppercase text-white">
            {instituicao.tagline}
          </p>
        </div>
      </Section>

      <Section
        id="valores"
        tom="suave"
        titulo="Valores"
        descricao="Os seis valores do IPOG Way, que orientam o comportamento de quem trabalha na instituição."
      >
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {valores.map((valor) => (
            <li
              key={valor.numero}
              className="flex items-start gap-4 rounded-card border border-[var(--line)] bg-[var(--surface)] p-6 shadow-card"
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--acento-tenue)] font-apoio text-base font-bold text-[var(--acento)]">
                {String(valor.numero).padStart(2, "0")}
              </span>
              <p className="text-fluid-base font-medium leading-snug text-conexao-900">
                {valor.titulo}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="arquetipos"
        titulo="Arquétipos de marca"
        descricao="O IPOG opera com dois arquétipos, que definem a personalidade da marca e a forma como ela se comunica."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {arquetipos.map((arquetipo) => (
            <Card key={arquetipo.nome} comHover>
              <h3 className="text-fluid-xl font-semibold normal-case text-[var(--acento)]">
                {arquetipo.nome}
              </h3>
              <p className="mt-3 text-fluid-base leading-relaxed text-conexao-700">
                {arquetipo.descricao}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="frentes-de-atuacao"
        tom="suave"
        titulo="Frentes de atuação"
        descricao="As quatro linhas de produto da instituição, com público e formato próprios."
      >
        <DataTable
          legenda="Frentes de atuação do IPOG, com descrição e público-alvo."
          cabecalhos={["Frente", "O que é", "Para quem"]}
          linhas={frentesDeAtuacao.map((frente) => [
            frente.nome,
            frente.descricao,
            frente.publico,
          ])}
        />
      </Section>

      <Section
        id="contato"
        titulo="Canais de atendimento"
        descricao="Telefones, e-mails e horários por área, além dos portais digitais da instituição."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {canaisAtendimento.map((canal) => (
            <Card key={canal.area} comHover>
              <h3 className="text-fluid-lg font-semibold normal-case text-conexao-900">
                {canal.area}
              </h3>
              <dl className="mt-4 space-y-3 text-fluid-sm">
                <div>
                  <dt className="font-semibold text-conexao-600">Telefone</dt>
                  <dd className="mt-0.5">
                    {canal.telefones.map((telefone) => (
                      <a
                        key={telefone}
                        href={`tel:+55${telefone.replace(/\D/g, "")}`}
                        className="mr-3 inline-block text-conexao-800 underline-offset-4 hover:underline"
                      >
                        {telefone}
                      </a>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-conexao-600">E-mail</dt>
                  <dd className="mt-0.5">
                    <a
                      href={`mailto:${canal.email}`}
                      className="text-conexao-800 underline-offset-4 hover:underline"
                    >
                      {canal.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-conexao-600">Horário</dt>
                  <dd className="mt-0.5 text-conexao-700">{canal.horario}</dd>
                </div>
              </dl>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <DataTable
            legenda="Portais digitais do IPOG, com endereço e finalidade de cada um."
            cabecalhos={["Portal", "Endereço", "Para quê"]}
            linhas={portais.map((portal) => [
              portal.nome,
              <a
                key={portal.url}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--acento)] underline underline-offset-4"
              >
                {portal.endereco}
              </a>,
              portal.finalidade,
            ])}
          />
        </div>

        <div className="mt-8">
          <Callout titulo="Solicitações acadêmicas">
            A maior parte das solicitações acadêmicas é feita pelo caminho Portal
            do Aluno, Secretaria Digital, Novo Requerimento. A tabela de taxas
            acadêmicas vigente fica em ipog.edu.br, seção Institucional,
            Acadêmico.
          </Callout>
        </div>
      </Section>
    </>
  );
}
