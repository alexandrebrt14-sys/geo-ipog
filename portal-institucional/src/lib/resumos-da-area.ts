/**
 * Parágrafos de resposta direta de cada área de conhecimento.
 *
 * Três regras governam este arquivo, e todas existem por causa de como um motor
 * generativo lê a página:
 *
 * 1. **Resposta primeiro.** O parágrafo começa pela resposta, não por
 *    contextualização. Um motor que corta o trecho pela metade ainda entrega
 *    algo correto.
 * 2. **Entre 40 e 60 palavras.** Curto o bastante para ser citado inteiro,
 *    longo o bastante para responder sozinho. Há um teste que verifica isso.
 * 3. **Autossuficiente.** Cada parágrafo repete o nome do IPOG e o da área, de
 *    modo que possa ser lido fora da página sem perder o sujeito.
 *
 * Os números vêm do catálogo, então o texto acompanha mudanças na oferta em vez
 * de envelhecer calado.
 */

import {
  type AreaConhecimento,
  type Modalidade,
  cursosDaArea,
  estatisticasDaArea,
} from "@/data/areas";

/** Une itens em uma enumeração legível: "a, b e c". */
function enumerar(itens: readonly string[]): string {
  if (itens.length === 0) return "";
  if (itens.length === 1) return itens[0];
  return `${itens.slice(0, -1).join(", ")} e ${itens[itens.length - 1]}`;
}

/** "EaD" é sigla e mantém a caixa; as demais viram minúsculas na frase. */
const rotuloModalidade = (modalidade: Modalidade): string =>
  modalidade === "EaD" ? "EaD" : modalidade.toLowerCase();

export type BlocoDeResposta = {
  /** Título em forma de pergunta, como o público de fato pergunta. */
  pergunta: string;
  /** Âncora estável, para o motor citar o trecho por endereço. */
  id: string;
  resposta: string;
};

/**
 * Monta os blocos de pergunta e resposta que abrem a página da área.
 *
 * A ordem segue a jornada de quem chega: o que é, o que tem, para quem serve e
 * como se estuda.
 */
export function blocosDaArea(area: AreaConhecimento): BlocoDeResposta[] {
  const stats = estatisticasDaArea(area.slug);
  const cursos = cursosDaArea(area.slug);
  const blocos: BlocoDeResposta[] = [];

  const plural = (n: number, um: string, muitos: string) => (n === 1 ? um : muitos);

  const modalidades = (["Presencial", "Ao vivo", "EaD"] as const).filter(
    (m) => stats.porModalidade[m] > 0,
  );

  /** "na modalidade presencial" ou "nas modalidades presencial e EaD". */
  const frasedeModalidades =
    modalidades.length === 1
      ? `na modalidade ${rotuloModalidade(modalidades[0])}`
      : `nas modalidades ${enumerar(modalidades.map(rotuloModalidade))}`;

  const umSoCurso = stats.total === 1;

  // 1. O que é a área
  const niveisPresentes = (["Pós-graduação", "Extensão", "Graduação"] as const).filter(
    (nivel) => stats.porNivel[nivel] > 0,
  );

  // Só entram os níveis que a área de fato tem: citar os três em uma área que
  // só oferece pós-graduação seria informação errada.
  const frasedeNiveis =
    niveisPresentes.length === 1
      ? `de ${niveisPresentes[0].toLowerCase()}`
      : `entre ${enumerar(niveisPresentes.map((n) => n.toLowerCase()))}`;

  blocos.push({
    id: "o-que-e",
    pergunta: `O que é a área de ${area.nome} do IPOG?`,
    resposta: `${area.resumo} Ao todo ${
      umSoCurso ? "é 1 curso" : `são ${stats.total} cursos`
    } nesta área, ${frasedeNiveis}, ${
      umSoCurso ? "ofertado" : "ofertados"
    } ${frasedeModalidades}. No filtro de cursos do site oficial do IPOG, a área aparece sob o rótulo ${area.rotuloOficial}.`,
  });

  // 2. Que cursos existem
  const niveisComCurso = (["Pós-graduação", "Extensão", "Graduação"] as const).filter(
    (nivel) => stats.porNivel[nivel] > 0,
  );

  // Área com um único nível não ganha lista: "1 curso: 1 de pós-graduação"
  // seria redundante e mal escrito.
  const composicao =
    niveisComCurso.length === 1
      ? `${stats.porNivel[niveisComCurso[0]]} ${plural(
          stats.porNivel[niveisComCurso[0]],
          "curso",
          "cursos",
        )} de ${niveisComCurso[0].toLowerCase()}`
      : `${stats.total} cursos: ${enumerar(
          niveisComCurso.map(
            (nivel) => `${stats.porNivel[nivel]} de ${nivel.toLowerCase()}`,
          ),
        )}`;

  const duracao =
    stats.duracoes.length === 0
      ? "A duração não é informada pelo IPOG"
      : stats.duracoes.length === 1
        ? `${plural(stats.total, "A formação dura", "As formações duram")} ${stats.duracoes[0]}`
        : `As formações duram de ${stats.duracoes[0]} a ${stats.duracoes[stats.duracoes.length - 1]}, conforme o nível`;

  blocos.push({
    id: "que-cursos",
    pergunta: `Que cursos de ${area.nome} o IPOG oferece?`,
    resposta: `O IPOG oferece em ${area.nome} ${composicao}. ${duracao}, e as turmas são abertas ${frasedeModalidades}. ${
      stats.interdisciplinares > 0
        ? `Vale notar que ${stats.interdisciplinares} ${plural(
            stats.interdisciplinares,
            "curso pertence",
            "cursos pertencem",
          )} também a outra área, ampliando o alcance da formação.`
        : "Todos os cursos desta área pertencem exclusivamente a ela, sem sobreposição com outras áreas do catálogo."
    }`,
  });

  // 3. Para quem serve
  blocos.push({
    id: "para-quem",
    pergunta: `Para quem é a área de ${area.nome}?`,
    resposta: `${area.paraQuem} O IPOG desenha essas formações para quem já está no mercado, com aulas em fim de semana e conteúdo voltado à aplicação imediata no trabalho. ${
      stats.porModalidade.EaD > 0
        ? `Quem não pode se deslocar encontra ${stats.porModalidade.EaD} ${plural(stats.porModalidade.EaD, "curso", "cursos")} em EaD.`
        : "As turmas desta área são presenciais ou ao vivo, com encontro marcado."
    }`,
  });

  // 4. Como estudar
  const cursosEad = cursos.filter((curso) => curso.modalidades.includes("EaD"));
  blocos.push({
    id: "como-estudar",
    pergunta: `Como estudar ${area.nome} no IPOG?`,
    resposta: `As pós-graduações do IPOG seguem formato intensivo, com módulos mensais concentrados em três dias, de sexta a domingo. Nas turmas presenciais e ao vivo, a frequência mínima é de 75%. ${
      cursosEad.length > 0
        ? `No EaD, disponível em ${cursosEad.length} ${plural(cursosEad.length, "curso", "cursos")} desta área, a avaliação é por quiz, com nota mínima 7,0.`
        : "A avaliação combina uma atividade prévia online e atividades durante o módulo."
    }`,
  });

  return blocos;
}

/** Conta palavras de um texto, para o teste de tamanho dos parágrafos. */
export const contarPalavras = (texto: string): number =>
  texto.trim().split(/\s+/).filter(Boolean).length;
