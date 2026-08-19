import type { Metadata } from "next";

import {
  unidades,
  unidadesDaRegiao,
  ufsAtendidas,
  totalDeCidades,
  totalDeUnidadesDeclarado,
  cidadeSede,
  REGIOES,
} from "@/data/unidades";
import { observacaoSobreOferta } from "@/data/graduacao";
import { breadcrumbSchema, webPageSchema } from "@/lib/jsonld";
import { criarMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { IndiceDaPagina } from "@/components/IndiceDaPagina";
import { Section, PageHeader, DataTable, Callout } from "@/components/Layout";

/**
 * Cobertura geográfica do IPOG.
 *
 * "O IPOG tem unidade em Recife?" é o tipo de pergunta que um motor generativo
 * recebe o tempo todo sobre instituição de ensino, e que ele só responde bem se
 * a lista de cidades estiver em texto extraível. Mapa interativo e busca por
 * CEP não servem: o rastreador não executa a interação.
 */

const descricao = `O IPOG mantém ${totalDeUnidadesDeclarado} unidades no Brasil, distribuídas por ${totalDeCidades} cidades e presentes em todas as ${ufsAtendidas.length} unidades federativas do país, ou seja, nos 26 estados e no Distrito Federal.`;

export const metadata: Metadata = criarMetadata({
  titulo: "Unidades do IPOG: cidades e estados atendidos",
  descricao,
  path: "/unidades",
});

const trilha = [
  { nome: "Início", href: "/" },
  { nome: "Unidades", href: "/unidades" },
] as const;

export default function PaginaUnidades() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            path: "/unidades",
            name: "Unidades do IPOG: cidades e estados atendidos",
            description: descricao,
          }),
          breadcrumbSchema(trilha),
        ]}
      />

      <PageHeader
        trilha={trilha}
        destaque={`${totalDeCidades} cidades, ${ufsAtendidas.length} UFs`}
        titulo="Unidades e cobertura nacional"
        resumo={descricao}
      />

      <IndiceDaPagina
        itens={[
          { href: "#cidades", rotulo: "Cidades" },
          { href: "#cobertura", rotulo: "Cobertura por UF" },
        ]}
      />

      <Section
        id="cidades"
        titulo="Cidades com unidade do IPOG"
        descricao="Lista completa das cidades com unidade e página própria no site do IPOG, agrupadas por região."
      >
        <div className="space-y-10">
          {REGIOES.map((regiao) => {
            const daRegiao = unidadesDaRegiao(regiao);
            return (
              <article key={regiao} id={`regiao-${regiao.toLowerCase()}`}>
                <h3 className="text-fluid-xl font-semibold normal-case text-conexao-900">
                  {regiao}
                </h3>
                <p className="mt-2 text-fluid-sm text-conexao-600">
                  {daRegiao.length} {daRegiao.length === 1 ? "cidade" : "cidades"}
                </p>
                <DataTable
                  legenda={`Cidades da região ${regiao} com unidade do IPOG.`}
                  cabecalhos={["Cidade", "UF"]}
                  linhas={daRegiao.map((unidade) => [unidade.cidade, unidade.uf])}
                />
              </article>
            );
          })}
        </div>
      </Section>

      <Section
        id="cobertura"
        tom="suave"
        titulo="Cobertura por unidade federativa"
        descricao={`O IPOG atende as ${ufsAtendidas.length} unidades federativas do Brasil. A tabela indica quantas cidades com unidade existem em cada uma.`}
      >
        <DataTable
          legenda="Unidades federativas atendidas pelo IPOG, com o número de cidades em cada uma."
          cabecalhos={["UF", "Cidades com unidade"]}
          linhas={ufsAtendidas.map((uf) => [
            uf,
            String(unidades.filter((unidade) => unidade.uf === uf).length),
          ])}
        />

        <div className="mt-8 space-y-4">
          <Callout titulo="Sobre a contagem">
            O site institucional do IPOG declara {totalDeUnidadesDeclarado}{" "}
            unidades, e este portal lista {totalDeCidades} cidades. Os dois
            números não se contradizem: São Paulo tem duas unidades com página
            própria, e a contagem de unidades é maior que a de cidades. A sede
            fica em {cidadeSede}.
          </Callout>

          <Callout titulo="Graduação tem oferta diferente" tom="atencao">
            {observacaoSobreOferta}
          </Callout>
        </div>
      </Section>
    </>
  );
}
