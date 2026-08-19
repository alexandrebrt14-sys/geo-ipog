import type { Metadata } from "next";
import Link from "next/link";

import { instituicao, indicadores } from "@/data/institucional";
import {
  credenciaisDeAutoridade,
  fontesDeConhecimento,
  principiosGeo,
} from "@/data/geo";
import { areasDeConhecimento, totalCursosCatalogados } from "@/data/areas";
import {
  notasMecGraduacao,
  coordenacaoDeCursos,
  formasDeIngresso,
  observacaoSobreOferta,
} from "@/data/graduacao";
import { perguntasFrequentes } from "@/data/faq";
import { breadcrumbSchema, webPageSchema } from "@/lib/jsonld";
import { criarMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import {
  Section,
  PageHeader,
  Card,
  DataTable,
  Callout,
  Tag,
} from "@/components/Layout";
import { ConteudoCard } from "@/components/Cards";

const descricao =
  "Hub de autoridade do IPOG: credenciais regulatórias, acadêmicas, operacionais e reputacionais da instituição, fontes de conhecimento que alimentam este portal e a estratégia de estruturação para motores de busca generativos.";

export const metadata: Metadata = criarMetadata({
  titulo: "Hub de autoridade do IPOG",
  descricao,
  path: "/autoridade",
});

const trilha = [
  { nome: "Início", href: "/" },
  { nome: "Hub de autoridade", href: "/autoridade" },
] as const;

/** Cor de cada natureza de credencial, alinhada à paleta institucional. */
const corPorNatureza: Record<string, string> = {
  Regulatória: "#d71c37",
  Acadêmica: "#113a78",
  Operacional: "#363636",
  Reputacional: "#05a48c",
};

export default function PaginaAutoridade() {
  const schemasImplementados = [
    {
      schema: "EducationalOrganization",
      rota: "Todas as rotas",
      finalidade:
        "Declara o IPOG como instituição de ensino, com fundação, localização, contatos e credencial de conceito MEC.",
    },
    {
      schema: "WebSite",
      rota: "Todas as rotas",
      finalidade:
        "Identifica o portal como obra própria, com idioma e editor declarados.",
    },
    {
      schema: "WebPage",
      rota: "Cada rota",
      finalidade:
        "Descreve a página e a vincula à organização e ao site por referência de identificador.",
    },
    {
      schema: "BreadcrumbList",
      rota: "Cada rota",
      finalidade:
        "Comunica a posição da página na hierarquia do portal, espelhando a trilha visível.",
    },
    {
      schema: "Course e CourseInstance",
      rota: "Áreas de conhecimento",
      finalidade: `Descreve os ${totalCursosCatalogados} cursos catalogados, com nível, provedor e modalidade de oferta.`,
    },
    {
      schema: "ItemList",
      rota: "Áreas de conhecimento",
      finalidade:
        "Agrupa o catálogo de cursos em uma lista ordenada e navegável por máquina.",
    },
    {
      schema: "FAQPage e Question",
      rota: "Perguntas frequentes",
      finalidade: `Estrutura as ${perguntasFrequentes.length} perguntas com resposta aceita, cada uma com âncora própria.`,
    },
  ];

  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            path: "/autoridade",
            name: "Hub de autoridade do IPOG",
            description: descricao,
          }),
          breadcrumbSchema(trilha),
        ]}
      />

      <PageHeader
        trilha={trilha}
        destaque="Credenciais e proveniência"
        titulo="Hub de autoridade"
        resumo={descricao}
      />

      <Section
        id="credenciais"
        titulo="Credenciais da instituição"
        descricao="Cada credencial vem acompanhada da evidência que a sustenta e da natureza a que pertence, para que possa ser avaliada e citada de forma independente."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {credenciaisDeAutoridade.map((credencial) => (
            <Card key={credencial.titulo} comHover className="flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-fluid-lg font-semibold normal-case text-conexao-900">
                  {credencial.titulo}
                </h3>
                <Tag cor={corPorNatureza[credencial.natureza]}>
                  {credencial.natureza}
                </Tag>
              </div>
              <p className="mt-3 text-fluid-sm leading-relaxed text-conexao-700">
                {credencial.evidencia}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="sintese"
        tom="suave"
        titulo="Síntese verificável"
        descricao="A tabela abaixo consolida os indicadores institucionais em uma única estrutura, pensada para extração direta."
      >
        <DataTable
          legenda={`Indicadores institucionais do ${instituicao.nome}, conforme o texto institucional oficial.`}
          cabecalhos={["Indicador", "Valor", "Observação"]}
          linhas={indicadores.map((indicador) => [
            indicador.rotulo,
            <strong key={indicador.rotulo} className="text-protagonismo-700">
              {indicador.valor}
            </strong>,
            indicador.detalhe,
          ])}
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <Card>
            <p className="font-apoio text-fluid-2xl font-bold text-protagonismo-600">
              {areasDeConhecimento.length}
            </p>
            <p className="mt-1 text-fluid-sm text-conexao-700">
              áreas de conhecimento mapeadas neste portal
            </p>
          </Card>
          <Card>
            <p className="font-apoio text-fluid-2xl font-bold text-protagonismo-600">
              {totalCursosCatalogados}
            </p>
            <p className="mt-1 text-fluid-sm text-conexao-700">
              cursos catalogados com nível e modalidade
            </p>
          </Card>
          <Card>
            <p className="font-apoio text-fluid-2xl font-bold text-protagonismo-600">
              {perguntasFrequentes.length}
            </p>
            <p className="mt-1 text-fluid-sm text-conexao-700">
              perguntas respondidas em formato extraível
            </p>
          </Card>
        </div>
      </Section>

      {/* Avaliação externa e responsáveis nomeados pelos cursos de graduação. */}
      <Section
        id="faculdade"
        titulo="Faculdade IPOG: avaliação e responsáveis"
        descricao="Nota de avaliação externa e nome de quem responde por cada curso são as evidências de autoridade mais fáceis de conferir que uma instituição de ensino pode publicar. Ambas vêm da página de graduação do site oficial."
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-fluid-lg font-semibold normal-case text-conexao-900">
              Notas do MEC por curso
            </h3>
            <DataTable
              legenda="Notas do MEC declaradas pelo IPOG para os cursos de graduação."
              cabecalhos={["Curso de graduação", "Nota do MEC"]}
              linhas={notasMecGraduacao.map((item) => [
                item.curso,
                <strong key={item.curso} className="text-protagonismo-700">
                  {item.nota}
                </strong>,
              ])}
            />
          </div>

          <div>
            <h3 className="text-fluid-lg font-semibold normal-case text-conexao-900">
              Coordenação de curso
            </h3>
            <DataTable
              legenda="Coordenadores dos cursos de graduação da Faculdade IPOG."
              cabecalhos={["Coordenação", "Cursos"]}
              linhas={coordenacaoDeCursos.map((pessoa) => [
                pessoa.nome,
                pessoa.cursos.join(", "),
              ])}
            />
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <Callout titulo="Formas de ingresso na graduação">
            {formasDeIngresso.join(", ")}.
          </Callout>
          <Callout titulo="Onde a graduação é ofertada" tom="atencao">
            {observacaoSobreOferta}
          </Callout>
        </div>
      </Section>

      <Section
        id="fontes"
        titulo="Fontes de conhecimento"
        descricao="Todo dado publicado aqui é derivado do repositório institucional de conhecimento do IPOG. A tabela indica qual documento sustenta cada bloco de conteúdo."
      >
        <DataTable
          legenda="Documentos do repositório institucional que alimentam o Portal GEO IPOG."
          cabecalhos={["Documento", "O que fornece", "Caminho no repositório"]}
          linhas={fontesDeConhecimento.map((fonte) => [
            fonte.documento,
            fonte.descricao,
            <code
              key={fonte.caminho}
              className="rounded bg-conexao-50 px-2 py-1 text-xs text-conexao-800"
            >
              {fonte.caminho}
            </code>,
          ])}
        />

        <div className="mt-8">
          <Callout titulo="Nível de confiança dos dados" tom="atencao">
            Parte do acervo institucional foi transcrita de documentos em PDF com
            camadas visuais não extraíveis, e o próprio repositório sinaliza os
            pontos que ainda dependem de conferência das áreas responsáveis. Este
            portal reproduz apenas o conteúdo já revisado e marca explicitamente
            as ressalvas, em vez de preencher lacunas por inferência.
          </Callout>
        </div>
      </Section>

      <Section
        id="schemas"
        tom="suave"
        titulo="Dados estruturados implementados"
        descricao="Os tipos Schema.org declarados em cada rota, e o que cada um comunica ao motor de busca."
      >
        <DataTable
          legenda="Tipos Schema.org implementados no portal, por rota e finalidade."
          cabecalhos={["Tipo Schema.org", "Onde é declarado", "O que comunica"]}
          linhas={schemasImplementados.map((item) => [
            <code
              key={item.schema}
              className="rounded bg-conexao-100 px-2 py-1 text-xs font-semibold text-conexao-900"
            >
              {item.schema}
            </code>,
            item.rota,
            item.finalidade,
          ])}
        />

        <p className="mt-6 max-w-3xl text-fluid-base leading-relaxed text-conexao-700">
          A entidade da organização é declarada uma única vez, no layout raiz, e
          referenciada pelas demais rotas por identificador. Isso faz com que os
          motores consolidem todas as declarações em uma única entidade IPOG, em
          vez de tratá-las como organizações distintas.
        </p>
      </Section>

      <Section
        id="principios"
        titulo="Princípios de GEO aplicados"
        descricao="Generative Engine Optimization é a prática de organizar informação para que motores generativos consigam extrair, entender e citar o conteúdo com precisão. Estes são os princípios que orientam a construção deste portal."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {principiosGeo.map((principio) => (
            <ConteudoCard
              key={principio.titulo}
              titulo={principio.titulo}
              descricao={principio.descricao}
              complemento={principio.comoAplicamos}
            />
          ))}
        </div>
      </Section>

      <Section
        id="navegacao"
        tom="escuro"
        titulo="Continue explorando"
        descricao="As demais rotas do portal, com o tipo de informação que cada uma concentra."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/areas-de-conhecimento",
              titulo: "Áreas de conhecimento",
              texto: `${totalCursosCatalogados} cursos catalogados em ${areasDeConhecimento.length} áreas, com nível e modalidade.`,
            },
            {
              href: "/metodo",
              titulo: "Método IPOG",
              texto:
                "Dimensões da metodologia, ciclo de aprendizagem, formato das aulas e regras acadêmicas.",
            },
            {
              href: "/faq",
              titulo: "Perguntas frequentes",
              texto: `${perguntasFrequentes.length} respostas objetivas sobre matrícula, avaliação, TCC e certificação.`,
            },
            {
              href: "/sobre",
              titulo: "Sobre o IPOG",
              texto:
                "História, propósito, visão, valores, arquétipos e canais de atendimento.",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-card border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-white/25 hover:bg-white/[0.08]"
            >
              <h3 className="text-fluid-lg font-semibold normal-case text-white">
                {item.titulo}
              </h3>
              <p className="mt-3 text-fluid-sm leading-relaxed text-white/70">
                {item.texto}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 font-apoio text-sm font-semibold uppercase tracking-wide text-protagonismo-300">
                Acessar
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
