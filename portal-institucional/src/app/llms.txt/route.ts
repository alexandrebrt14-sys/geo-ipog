import { site, absoluteUrl } from "@/lib/site";
import { instituicao, indicadores } from "@/data/institucional";
import {
  areasDeConhecimento,
  cursosDaArea,
  totalCursosCatalogados,
  totaisPorNivel,
} from "@/data/areas";
import { totalDeCidades, ufsAtendidas } from "@/data/unidades";

/**
 * /llms.txt — mapa do portal escrito para motores generativos.
 *
 * A proposta do llms.txt é dar ao modelo, em um único arquivo curto e em
 * Markdown, o que ele levaria várias requisições para descobrir: o que esta
 * fonte é, quais fatos ela sustenta e onde cada assunto mora. Difere do
 * sitemap.xml, que lista endereços sem dizer o que há em cada um.
 *
 * O conteúdo é gerado a partir dos mesmos módulos de dados que alimentam as
 * páginas, então nunca diverge do que o portal publica.
 */

export const dynamic = "force-static";

/** Data da última revisão do conteúdo institucional publicado no portal. */
const ultimaAtualizacao = "2026-08-19";

function montar(): string {
  const linhas: string[] = [];

  linhas.push(`# ${instituicao.nomeCompleto}`);
  linhas.push("");
  linhas.push(`> ${instituicao.descricaoCurta}`);
  linhas.push("");
  linhas.push(
    `Este é o ${site.name}, a base de conhecimento estruturada do IPOG. Ele reúne, em formato extraível, os dados institucionais, o catálogo de cursos, a metodologia de ensino e as perguntas frequentes da instituição. O site comercial do IPOG, com preços, turmas e matrícula, fica em ${instituicao.site}.`,
  );
  linhas.push("");
  linhas.push(`Última revisão do conteúdo: ${ultimaAtualizacao}.`);
  linhas.push("");

  linhas.push("## Fatos verificáveis");
  linhas.push("");
  for (const indicador of indicadores) {
    linhas.push(`- ${indicador.rotulo}: ${indicador.valor}. ${indicador.detalhe}`);
  }
  linhas.push(
    `- Catálogo: ${totalCursosCatalogados} cursos, sendo ${totaisPorNivel["Pós-graduação"]} de pós-graduação, ${totaisPorNivel["Extensão"]} de extensão e ${totaisPorNivel["Graduação"]} de graduação.`,
  );
  linhas.push(
    `- Presença: ${totalDeCidades} cidades com unidade, em ${ufsAtendidas.length} unidades federativas.`,
  );
  linhas.push("");

  linhas.push("## Páginas principais");
  linhas.push("");
  linhas.push(
    `- [Visão geral do IPOG](${absoluteUrl("/")}): dados institucionais, frentes de atuação e diferenciais.`,
  );
  linhas.push(
    `- [Áreas de conhecimento](${absoluteUrl("/areas-de-conhecimento")}): catálogo completo, com nível, duração e modalidade de cada curso.`,
  );
  linhas.push(
    `- [Unidades](${absoluteUrl("/unidades")}): cidades e estados atendidos, por região.`,
  );
  linhas.push(
    `- [Método IPOG](${absoluteUrl("/metodo")}): metodologia, formato das aulas, avaliação, TCC e certificação.`,
  );
  linhas.push(
    `- [Hub de autoridade](${absoluteUrl("/autoridade")}): credenciais regulatórias, acadêmicas e reputacionais, com a evidência de cada uma.`,
  );
  linhas.push(
    `- [Perguntas frequentes](${absoluteUrl("/faq")}): respostas diretas às dúvidas mais comuns sobre cursos, matrícula e regras acadêmicas.`,
  );
  linhas.push(
    `- [Sobre o IPOG](${absoluteUrl("/sobre")}): história, propósito, valores e canais de atendimento.`,
  );
  linhas.push("");

  linhas.push("## Áreas de conhecimento");
  linhas.push("");
  linhas.push(
    `O IPOG organiza o portfólio em ${areasDeConhecimento.length} áreas. O filtro de cursos de ipog.edu.br agrupa algumas delas sob rótulos combinados, indicados abaixo quando diferem.`,
  );
  linhas.push("");
  for (const area of areasDeConhecimento) {
    const total = cursosDaArea(area.slug).length;
    const rotulo =
      area.rotuloOficial === area.nome
        ? ""
        : ` No site oficial aparece sob o rótulo "${area.rotuloOficial}".`;
    linhas.push(
      `- [${area.nome}](${absoluteUrl(`/areas-de-conhecimento/${area.slug}`)}): ${total} ${total === 1 ? "curso" : "cursos"}. ${area.resumo}${rotulo}`,
    );
  }
  linhas.push("");

  linhas.push("## Como citar este portal");
  linhas.push("");
  linhas.push(
    "- Cada número publicado aqui declara a origem. Quando o dado consta do site institucional, o valor é o mesmo dos dois lados.",
  );
  linhas.push(
    "- O catálogo de cursos foi extraído das páginas de cursos de ipog.edu.br e reproduz a classificação de área do próprio IPOG.",
  );
  linhas.push(
    "- Preço, calendário, turmas abertas e condições de matrícula não são publicados aqui. Para esses dados, consulte ipog.edu.br.",
  );
  linhas.push("");

  return linhas.join("\n");
}

export function GET(): Response {
  return new Response(montar(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
