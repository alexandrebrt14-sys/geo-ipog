import type { Metadata } from "next";
import Link from "next/link";

import {
  modalidades,
  horarioDasAulas,
  formatoDosModulos,
  ressalvaDeFuncionamento,
  reposicaoAoVivo,
} from "@/data/modalidades";
import { cursos } from "@/data/areas";
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
  Callout,
  Tag,
} from "@/components/Layout";

/**
 * Modalidades de ensino do IPOG.
 *
 * "O IPOG tem pós EaD?" e "a aula ao vivo é gravada?" são perguntas que definem
 * a matrícula, e cuja resposta estava espalhada entre a tabela do Método e as
 * páginas de área. Esta rota concentra o assunto e responde também o que os
 * outros lugares não diziam: onde a aula acontece, qual o horário, o que muda na
 * avaliação e o que fazer ao perder parte de um módulo.
 */

/** Quantos cursos do catálogo são ofertados em cada modalidade. */
const cursosPorModalidade = Object.fromEntries(
  modalidades.map((modalidade) => [
    modalidade.nome,
    cursos.filter((curso) => curso.modalidades.includes(modalidade.nome)).length,
  ]),
) as Record<string, number>;

const descricao = `O IPOG oferece aulas em três modalidades: presencial, ao vivo e EaD. Presencial e ao vivo seguem o mesmo calendário, com módulos mensais de sexta a domingo e frequência mínima de 75%. O EaD é assíncrono, sem horário fixo, com avaliação por quiz.`;

export const metadata: Metadata = criarMetadata({
  titulo: "Modalidades de ensino do IPOG: presencial, ao vivo e EaD",
  descricao,
  path: "/modalidades",
});

const trilha = [
  { nome: "Início", href: "/" },
  { nome: "Modalidades", href: "/modalidades" },
] as const;

const perguntas: PerguntaFrequente[] = [
  {
    id: "quais-modalidades",
    pergunta: "Quais são as modalidades de ensino do IPOG?",
    resposta:
      "O IPOG oferece três modalidades: presencial, com a turma reunida em sala de aula na cidade de matrícula; ao vivo, com aula síncrona em tempo real por plataforma online; e EaD, com videoaulas gravadas cursadas no ritmo do aluno. A modalidade ao vivo também aparece como online síncrona no material do IPOG.",
    categoria: "Cursos e modalidades",
  },
  {
    id: "diferenca-ao-vivo-ead",
    pergunta: "Qual a diferença entre ao vivo e EaD no IPOG?",
    resposta:
      "A aula ao vivo do IPOG acontece em tempo real, com hora marcada e interação direta com o professor, e exige 75% de frequência. O EaD é assíncrono: o aluno assiste às videoaulas gravadas quando quiser, sem controle de frequência, e a avaliação é feita por quiz de múltipla escolha com nota mínima 7,0.",
    categoria: "Cursos e modalidades",
  },
  {
    id: "horario-das-aulas",
    pergunta: "Qual o horário das aulas do IPOG?",
    resposta:
      "Nas turmas presenciais e ao vivo do IPOG, as aulas acontecem uma vez por mês, em três dias consecutivos: sexta-feira das 18h às 23h, sábado das 8h às 19h e domingo das 8h às 13h. Cada encontro corresponde a um módulo completo. No EaD não há horário fixo.",
    categoria: "Cursos e modalidades",
  },
  {
    id: "onde-acontece",
    pergunta: "Onde acontecem as aulas presenciais do IPOG?",
    resposta:
      "As aulas presenciais do IPOG acontecem em unidades próprias e em espaços terceirizados, como salas de hotel, sempre na cidade em que o aluno se matriculou. Na semana da aula, o aluno recebe por e-mail o local e o endereço do encontro.",
    categoria: "Cursos e modalidades",
  },
  {
    id: "perdi-aula-ao-vivo",
    pergunta: "Perdi parte de uma aula ao vivo. O que acontece?",
    resposta: reposicaoAoVivo,
    categoria: "Avaliação e aprovação",
  },
  {
    id: "como-e-avaliado",
    pergunta: "Como é a avaliação em cada modalidade do IPOG?",
    resposta:
      "No presencial e no ao vivo, a nota do módulo soma uma atividade prática online prévia, que vale 3,0 pontos, e as atividades feitas durante a aula, que valem 7,0 pontos, com frequência mínima de 75%. No EaD, a avaliação é um quiz de múltipla escolha, com nota mínima 7,0 e sem controle de frequência.",
    categoria: "Avaliação e aprovação",
  },
  {
    id: "quantos-cursos-ead",
    pergunta: "Quantos cursos do IPOG são a distância?",
    resposta: `No catálogo deste portal, ${cursosPorModalidade["EaD"]} dos ${cursos.length} cursos do IPOG são ofertados em EaD, ${cursosPorModalidade["Ao vivo"]} em aulas ao vivo e ${cursosPorModalidade["Presencial"]} na modalidade presencial. Um mesmo curso pode ser ofertado em mais de uma modalidade, então a soma passa do total de cursos.`,
    categoria: "Cursos e modalidades",
  },
];

export default function PaginaModalidades() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            path: "/modalidades",
            name: "Modalidades de ensino do IPOG: presencial, ao vivo e EaD",
            description: descricao,
          }),
          breadcrumbSchema(trilha),
          faqSchema(perguntas, "/modalidades"),
        ]}
      />

      <PageHeader
        trilha={trilha}
        destaque={`${modalidades.length} modalidades`}
        titulo="Modalidades de ensino"
        resumo={descricao}
      />

      <IndiceDaPagina
        itens={[
          { href: "#cada-modalidade", rotulo: "Cada modalidade" },
          { href: "#comparacao", rotulo: "Comparação" },
          { href: "#horario", rotulo: "Horário" },
          { href: "#perguntas", rotulo: "Perguntas" },
        ]}
      />

      {/* Retrato numérico: quantos cursos existem em cada modalidade. */}
      <div className="border-b border-[var(--line)] bg-[var(--surface-muted)]">
        <Container className="py-8">
          <h2 className="sr-only">Cursos por modalidade</h2>
          <dl className="grid grid-cols-3 gap-6">
            {modalidades.map((modalidade) => (
              <div key={modalidade.nome}>
                <dd className="font-apoio text-fluid-2xl font-bold leading-none text-[var(--acento)]">
                  {cursosPorModalidade[modalidade.nome]}
                </dd>
                <dt className="mt-2 text-fluid-sm text-conexao-700">
                  cursos em {modalidade.nome}
                </dt>
              </div>
            ))}
          </dl>
          <p className="mt-5 max-w-3xl text-fluid-sm leading-relaxed text-conexao-600">
            Um mesmo curso pode ser ofertado em mais de uma modalidade, então a
            soma passa do total de {cursos.length} cursos do catálogo.
          </p>
        </Container>
      </div>

      {/* Uma seção por modalidade, com a pergunta como título. */}
      <section aria-labelledby="cada-modalidade" className="py-14 sm:py-20">
        <Container>
          <h2 id="cada-modalidade" className="sr-only">
            Detalhe de cada modalidade
          </h2>

          <div className="space-y-10">
            {modalidades.map((modalidade) => (
              <article
                key={modalidade.nome}
                id={modalidade.nome.toLowerCase().replace(/\s+/g, "-")}
                className="scroll-mt-24 rounded-card border border-[var(--line)] bg-[var(--surface)] p-6 shadow-card sm:p-8"
              >
                {/* "EaD" é sigla e mantém a caixa. O título é montado como uma
                    string só, porque interpolar no meio do JSX faria o React
                    separar os trechos com comentários HTML. */}
                <h2 className="text-fluid-xl font-light uppercase">
                  {`O que é a modalidade ${
                    modalidade.nome === "EaD"
                      ? "EaD"
                      : modalidade.nome.toLowerCase()
                  } do IPOG?`}
                </h2>

                <p
                  data-resposta={modalidade.nome}
                  className="mt-3 max-w-3xl text-fluid-base leading-relaxed text-conexao-700"
                >
                  {modalidade.definicao} {modalidade.onde}
                </p>

                {modalidade.tambemChamada.length > 0 && (
                  <p className="mt-4 flex flex-wrap items-center gap-2 text-fluid-sm text-conexao-600">
                    <span>Também chamada de:</span>
                    {modalidade.tambemChamada.map((nome) => (
                      <Tag key={nome} cor="#7f7f7f">
                        {nome}
                      </Tag>
                    ))}
                  </p>
                )}

                <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {[
                    ["Frequência mínima", modalidade.frequenciaMinima],
                    ["Composição da nota", modalidade.composicaoNota],
                    ["Indicada para", modalidade.indicadaPara],
                    ["Ponto de atenção", modalidade.limite],
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
        id="comparacao"
        tom="suave"
        titulo="Como as modalidades se comparam?"
        descricao="O que muda de uma modalidade para outra na prática: onde a aula acontece, se há hora marcada e como a nota é composta."
      >
        <DataTable
          legenda="Comparação entre as modalidades de ensino do IPOG."
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
      </Section>

      <Section
        id="horario"
        titulo="Quando acontecem as aulas?"
        descricao={formatoDosModulos}
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <DataTable
            legenda="Horário das aulas de pós-graduação do IPOG, nas modalidades presencial e ao vivo."
            cabecalhos={["Dia", "Horário"]}
            linhas={horarioDasAulas.map((item) => [item.dia, item.horario])}
          />

          <div className="space-y-4">
            <Callout titulo="No EaD não há horário fixo">
              A modalidade EaD é assíncrona: as videoaulas ficam disponíveis na
              plataforma e o aluno avança no próprio ritmo, sem dia nem hora
              marcada e sem controle de frequência.
            </Callout>
            <Callout titulo="Se perder parte de uma aula ao vivo">
              {reposicaoAoVivo}
            </Callout>
            <Callout titulo="Ressalva do próprio IPOG" tom="atencao">
              {ressalvaDeFuncionamento}
            </Callout>
          </div>
        </div>
      </Section>

      <Section
        id="perguntas"
        tom="suave"
        titulo="Perguntas frequentes sobre as modalidades"
        descricao="As dúvidas que definem a escolha da modalidade, respondidas com a regra do Manual do Aluno e o dado do catálogo."
      >
        <FaqList perguntas={perguntas} />

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          <Link
            href="/tipos-de-curso"
            className="font-semibold text-[var(--acento)] underline underline-offset-4"
          >
            Ver os tipos de curso
          </Link>
          <Link
            href="/areas-de-conhecimento"
            className="font-semibold text-[var(--acento)] underline underline-offset-4"
          >
            Ver o catálogo por área
          </Link>
          <Link
            href="/unidades"
            className="font-semibold text-[var(--acento)] underline underline-offset-4"
          >
            Onde o IPOG tem unidade
          </Link>
        </div>
      </Section>
    </>
  );
}
