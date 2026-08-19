import type { Metadata } from "next";
import Link from "next/link";

import { tiposDeFormacao, regrasDaPos } from "@/data/formacoes";
import { totaisPorNivel, totalCursosCatalogados } from "@/data/areas";
import type { PerguntaFrequente } from "@/data/faq";
import { breadcrumbSchema, webPageSchema, faqSchema } from "@/lib/jsonld";
import { criarMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { IndiceDaPagina } from "@/components/IndiceDaPagina";
import { FaqList } from "@/components/FaqList";
import {
  Container,
  Section,
  PageHeader,
  DataTable,
  Card,
  Callout,
  Tag,
} from "@/components/Layout";

/**
 * Tipos de formação do IPOG.
 *
 * "Qual a diferença entre pós-graduação e curso de extensão?" e "preciso de
 * diploma para fazer uma pós no IPOG?" são perguntas de decisão, feitas antes
 * de escolher o curso. Elas não tinham resposta em nenhuma rota: o portal
 * listava os cursos, mas nunca explicava o que distingue um tipo do outro.
 *
 * A estrutura repete a das páginas de área: título em forma de pergunta,
 * resposta logo abaixo, parágrafos entre 40 e 60 palavras.
 */

const descricao = `O IPOG oferece quatro tipos de formação: pós-graduação lato sensu, graduação pela Faculdade IPOG, cursos de extensão universitária e educação corporativa. Esta página explica a duração, a carga horária, o pré-requisito e a certificação de cada um, para você escolher com base no que muda entre eles.`;

export const metadata: Metadata = criarMetadata({
  titulo: "Tipos de curso do IPOG: pós-graduação, graduação e extensão",
  descricao,
  path: "/tipos-de-curso",
});

const trilha = [
  { nome: "Início", href: "/" },
  { nome: "Tipos de curso", href: "/tipos-de-curso" },
] as const;

/** Perguntas de decisão, respondidas com o dado das formações. */
const perguntas: PerguntaFrequente[] = [
  {
    id: "diferenca-pos-extensao",
    pergunta:
      "Qual a diferença entre pós-graduação e curso de extensão no IPOG?",
    resposta:
      "A pós-graduação lato sensu do IPOG tem 360 horas ou mais, exige diploma de curso superior, inclui TCC obrigatório e dá certificado de especialista. O curso de extensão universitária tem de 40 a 120 horas, não tem TCC e certifica a carga horária cursada. A pós forma especialista; a extensão resolve uma lacuna técnica pontual.",
    categoria: "Cursos e modalidades",
  },
  {
    id: "precisa-diploma",
    pergunta: "Preciso ter diploma de graduação para fazer uma pós no IPOG?",
    resposta:
      "Sim. A pós-graduação lato sensu do IPOG é destinada a portadores de diploma de curso superior reconhecido e registrado, emitido por instituição credenciada pelo MEC. Diploma de curso sequencial, de extensão ou de formação específica não é aceito para essa finalidade.",
    categoria: "Matrícula e financeiro",
  },
  {
    id: "mba-ou-especializacao",
    pergunta: "MBA e especialização são a mesma coisa no IPOG?",
    resposta:
      "No IPOG, tanto o MBA quanto a especialização são cursos de pós-graduação lato sensu e seguem as mesmas regras de carga horária, TCC e certificação. A diferença está na ênfase: o MBA costuma tratar de gestão e negócios, e a especialização aprofunda um recorte técnico da área.",
    categoria: "Cursos e modalidades",
  },
  {
    id: "carga-horaria-pos",
    pergunta: "Qual a carga horária da pós-graduação do IPOG?",
    resposta:
      "Os projetos pedagógicos do IPOG declaram 360 horas na maior parte das pós-graduações, e há cursos com 432 horas. A Resolução CNE/CES nº 1/2018 fixa 360 horas como carga horária mínima da pós lato sensu no Brasil.",
    categoria: "Cursos e modalidades",
  },
  {
    id: "tcc-obrigatorio",
    pergunta: "O TCC é obrigatório na pós-graduação do IPOG?",
    resposta:
      "Sim. No IPOG o TCC é obrigatório e individual na pós-graduação. O prazo de entrega é de 90 dias corridos a contar da segunda-feira seguinte ao término do último módulo, e a devolutiva com nota chega em até 60 dias úteis. Há um módulo de apoio, em EaD, opcional e gratuito.",
    categoria: "Avaliação e aprovação",
  },
  {
    id: "nao-cumpri-carga",
    pergunta: "O que acontece se eu não cumprir a carga horária mínima?",
    resposta:
      "Quem não cumpre a carga horária mínima da pós-graduação pode requerer ao IPOG a certificação das horas efetivamente cursadas, na modalidade de extensão. O aluno também pode deixar de cursar até três módulos, regra que não vale para Engenharia e Segurança do Trabalho nem para os cursos 100% EaD de 360 horas.",
    categoria: "Avaliação e aprovação",
  },
  {
    id: "onde-graduacao",
    pergunta: "Onde o IPOG oferece graduação?",
    resposta:
      "Os cursos de graduação presenciais do IPOG são ofertados somente na unidade de Goiânia, em Goiás. Os cursos de graduação a distância atendem todo o país. Administração, Engenharia Civil, Psicologia e Direito têm nota 4 na avaliação do MEC.",
    categoria: "Cursos e modalidades",
  },
];

export default function PaginaTiposDeCurso() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            path: "/tipos-de-curso",
            name: "Tipos de curso do IPOG: pós-graduação, graduação e extensão",
            description: descricao,
          }),
          breadcrumbSchema(trilha),
          faqSchema(perguntas, "/tipos-de-curso"),
        ]}
      />

      <PageHeader
        trilha={trilha}
        destaque={`${tiposDeFormacao.length} tipos de formação`}
        titulo="Tipos de curso"
        resumo={descricao}
      />

      <IndiceDaPagina
        itens={[
          { href: "#comparacao", rotulo: "Comparação" },
          { href: "#cada-tipo", rotulo: "Cada tipo" },
          { href: "#regras-da-pos", rotulo: "Regras da pós" },
          { href: "#perguntas", rotulo: "Perguntas" },
        ]}
      />

      {/* Comparação lado a lado: é o bloco que responde a pergunta de decisão. */}
      <Section
        id="comparacao"
        titulo="Qual a diferença entre os tipos de curso?"
        descricao="A tabela compara o que muda de um tipo para outro. É a diferença de pré-requisito, carga horária e certificação que define qual formação serve para cada situação."
      >
        <DataTable
          legenda="Comparação entre os tipos de formação oferecidos pelo IPOG."
          cabecalhos={[
            "Tipo de formação",
            "Duração",
            "Carga horária",
            "Pré-requisito",
            "Certificação",
          ]}
          linhas={tiposDeFormacao.map((tipo) => [
            tipo.nome,
            tipo.duracao,
            tipo.cargaHoraria,
            tipo.preRequisito,
            tipo.certificacao,
          ])}
        />

        <div className="mt-8">
          <Callout titulo="Quantos cursos existem de cada tipo">
            O catálogo do portal reúne {totalCursosCatalogados} cursos:{" "}
            {totaisPorNivel["Pós-graduação"]} de pós-graduação,{" "}
            {totaisPorNivel["Extensão"]} de extensão e{" "}
            {totaisPorNivel["Graduação"]} de graduação.{" "}
            <Link
              href="/areas-de-conhecimento"
              className="font-semibold text-protagonismo-600 underline underline-offset-4"
            >
              Ver o catálogo por área de conhecimento
            </Link>
            .
          </Callout>
        </div>
      </Section>

      {/* Uma seção por tipo, com a pergunta como título. */}
      <section
        aria-labelledby="cada-tipo"
        className="bg-[var(--surface-muted)] py-14 sm:py-20"
      >
        <Container>
          <h2 id="cada-tipo" className="sr-only">
            Detalhe de cada tipo de formação
          </h2>

          <div className="space-y-10">
            {tiposDeFormacao.map((tipo) => (
              <article
                key={tipo.slug}
                id={tipo.slug}
                className="scroll-mt-24 rounded-card border border-[var(--line)] bg-white p-6 shadow-card sm:p-8"
              >
                {/* O título é montado como uma string só. Interpolar no meio
                    do JSX faria o React separar os trechos com comentários
                    HTML, o que suja o texto entregue ao rastreador. */}
                <h2 className="text-fluid-xl font-light uppercase">
                  {`O que é ${tipo.nome.toLowerCase()} no IPOG?`}
                </h2>

                <p
                  data-resposta={tipo.slug}
                  className="mt-3 max-w-3xl text-fluid-base leading-relaxed text-conexao-700"
                >
                  {tipo.definicao} {tipo.paraQuem}
                </p>

                {tipo.tambemChamado.length > 0 && (
                  <p className="mt-4 flex flex-wrap items-center gap-2 text-fluid-sm text-conexao-600">
                    <span>Também aparece como:</span>
                    {tipo.tambemChamado.map((nome) => (
                      <Tag key={nome} cor="#7f7f7f">
                        {nome}
                      </Tag>
                    ))}
                  </p>
                )}

                <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {[
                    ["Onde é ofertado", tipo.ondeEOfertado],
                    ["Duração", tipo.duracao],
                    ["Carga horária", tipo.cargaHoraria],
                    ["Pré-requisito", tipo.preRequisito],
                    ["Avaliação", tipo.avaliacao],
                    ["Certificação", tipo.certificacao],
                  ].map(([rotulo, valor]) => (
                    <div key={rotulo}>
                      <dt className="font-apoio text-xs font-semibold uppercase tracking-[0.14em] text-conexao-600">
                        {rotulo}
                      </dt>
                      <dd className="mt-1 text-fluid-sm leading-relaxed text-conexao-800">
                        {valor}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Section
        id="regras-da-pos"
        titulo="Que regras valem na pós-graduação?"
        descricao="Regras do Manual do Aluno que costumam gerar dúvida antes e durante o curso."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {regrasDaPos.map((regra) => (
            <Card key={regra.titulo}>
              <h3 className="text-fluid-lg">{regra.titulo}</h3>
              <p className="mt-2 text-fluid-sm leading-relaxed text-conexao-700">
                {regra.detalhe}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Callout titulo="Sobre a carga horária da pós" tom="atencao">
            Os projetos pedagógicos consultados declaram 360 horas na maior parte
            dos cursos, e há cursos com 432 horas. A Resolução CNE/CES nº 1/2018
            fixa 360 horas como mínimo legal da pós lato sensu. O portal publica a
            carga real de cada projeto em vez de generalizar.
          </Callout>
        </div>
      </Section>

      <Section
        id="perguntas"
        tom="suave"
        titulo="Perguntas frequentes sobre os tipos de curso"
        descricao="As dúvidas que aparecem antes da escolha do curso, respondidas com a regra do Manual do Aluno e o dado do catálogo."
      >
        <FaqList perguntas={perguntas} />

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          <Link
            href="/modalidades"
            className="font-semibold text-protagonismo-600 underline underline-offset-4"
          >
            Ver as modalidades de ensino
          </Link>
          <Link
            href="/metodo"
            className="font-semibold text-protagonismo-600 underline underline-offset-4"
          >
            Como funciona o Método IPOG
          </Link>
          <Link
            href="/faq"
            className="font-semibold text-protagonismo-600 underline underline-offset-4"
          >
            Todas as perguntas frequentes
          </Link>
        </div>
      </Section>
    </>
  );
}
