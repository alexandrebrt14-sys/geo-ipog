/**
 * Perguntas frequentes de uma área de conhecimento, derivadas do catálogo.
 *
 * Por que gerar em vez de escrever à mão: as perguntas que uma pessoa faz a um
 * motor generativo sobre uma área são quase sempre as mesmas seis ou sete
 * ("quantos cursos tem?", "tem a distância?", "quanto tempo dura?"), e a
 * resposta correta muda toda vez que o catálogo muda. Texto escrito à mão
 * envelhece calado; resposta derivada do dado não.
 *
 * Cada resposta é autossuficiente: repete o nome da área e do IPOG, para poder
 * ser citada isolada, sem o resto da página.
 */

import type { PerguntaFrequente } from "@/data/faq";
import {
  type AreaConhecimento,
  type Curso,
  type Modalidade,
  cursosDaArea,
  estatisticasDaArea,
  areasDeConhecimento,
} from "@/data/areas";

/** Une itens em uma enumeração legível: "a, b e c". */
function enumerar(itens: readonly string[]): string {
  if (itens.length === 0) return "";
  if (itens.length === 1) return itens[0];
  return `${itens.slice(0, -1).join(", ")} e ${itens[itens.length - 1]}`;
}

/**
 * Nome da modalidade dentro de uma frase.
 *
 * "Presencial" e "Ao vivo" viram minúsculas por serem palavras comuns, mas
 * "EaD" preserva a caixa: é sigla, e escrevê-la como "ead" no meio da frase
 * atrapalha tanto a leitura quanto o reconhecimento do termo pelo motor.
 */
function rotuloModalidade(modalidade: Modalidade): string {
  return modalidade === "EaD" ? "EaD" : modalidade.toLowerCase();
}

/** Lista até `limite` nomes de curso, com indicação do que ficou de fora. */
function amostraDeCursos(cursos: readonly Curso[], limite = 5): string {
  const nomes = cursos.slice(0, limite).map((curso) => curso.nome);
  const restantes = cursos.length - nomes.length;
  const lista = enumerar(nomes);
  return restantes > 0 ? `${lista}, entre outros` : lista;
}

/**
 * Monta as perguntas frequentes da área.
 *
 * A ordem segue a probabilidade da pergunta: primeiro o que a área é, depois
 * volume, modalidade, duração e nível.
 */
export function perguntasDaArea(area: AreaConhecimento): PerguntaFrequente[] {
  const cursos = cursosDaArea(area.slug);
  const stats = estatisticasDaArea(area.slug);
  const perguntas: PerguntaFrequente[] = [];

  const plural = (n: number, singular: string, pluralForma: string) =>
    n === 1 ? singular : pluralForma;

  // 1. O que a área abrange
  perguntas.push({
    id: `o-que-e-${area.slug}`,
    pergunta: `O que a área de ${area.nome} do IPOG abrange?`,
    resposta: `A área de ${area.nome} do IPOG reúne ${stats.total} ${plural(
      stats.total,
      "curso",
      "cursos",
    )}. ${area.resumo}${
      area.temas.length > 0
        ? ` Os temas recorrentes são: ${enumerar(area.temas)}.`
        : ""
    }`,
    categoria: "Cursos e modalidades",
  });

  // 2. Quantos cursos, abertos por nível
  const niveisComCurso = (["Pós-graduação", "Extensão", "Graduação"] as const)
    .filter((nivel) => stats.porNivel[nivel] > 0)
    .map(
      (nivel) =>
        `${stats.porNivel[nivel]} de ${nivel.toLowerCase()}`,
    );

  perguntas.push({
    id: `quantos-cursos-${area.slug}`,
    pergunta: `Quantos cursos de ${area.nome} o IPOG oferece?`,
    resposta: `O IPOG oferece ${stats.total} ${plural(
      stats.total,
      "curso",
      "cursos",
    )} na área de ${area.nome}: ${enumerar(niveisComCurso)}.`,
    categoria: "Cursos e modalidades",
  });

  // 3. Modalidades disponíveis
  const modalidadesDisponiveis = (["Presencial", "Ao vivo", "EaD"] as const).filter(
    (modalidade) => stats.porModalidade[modalidade] > 0,
  );

  perguntas.push({
    id: `modalidades-${area.slug}`,
    pergunta: `Os cursos de ${area.nome} do IPOG são presenciais ou a distância?`,
    resposta:
      modalidadesDisponiveis.length === 0
        ? `O IPOG não informa modalidade para os cursos da área de ${area.nome}.`
        : `Na área de ${area.nome}, o IPOG oferece cursos em ${enumerar(
            modalidadesDisponiveis.map(
              (modalidade) =>
                `${rotuloModalidade(modalidade)} (${stats.porModalidade[modalidade]} ${plural(
                  stats.porModalidade[modalidade],
                  "curso",
                  "cursos",
                )})`,
            ),
          )}. Um mesmo curso pode ser ofertado em mais de uma modalidade.`,
    categoria: "Cursos e modalidades",
  });

  // 4. Duração
  if (stats.duracoes.length > 0) {
    perguntas.push({
      id: `duracao-${area.slug}`,
      pergunta: `Quanto tempo duram os cursos de ${area.nome} do IPOG?`,
      resposta:
        stats.duracoes.length === 1
          ? `Os cursos de ${area.nome} do IPOG têm duração de ${stats.duracoes[0]}.`
          : `Os cursos de ${area.nome} do IPOG têm duração de ${enumerar(
              stats.duracoes,
            )}, conforme o curso e o nível de formação.`,
      categoria: "Cursos e modalidades",
    });
  }

  // 5. EaD, quando existe: pergunta de intenção muito comum
  const cursosEad = cursos.filter((curso) => curso.modalidades.includes("EaD"));
  if (cursosEad.length > 0) {
    perguntas.push({
      id: `ead-${area.slug}`,
      pergunta: `O IPOG tem curso de ${area.nome} a distância?`,
      resposta: `Sim. O IPOG oferece ${cursosEad.length} ${plural(
        cursosEad.length,
        "curso",
        "cursos",
      )} de ${area.nome} na modalidade EaD, com videoaulas gravadas cursadas no ritmo do aluno: ${amostraDeCursos(
        cursosEad,
      )}.`,
      categoria: "Cursos e modalidades",
    });
  }

  // 6. Pós-graduação da área, listando os cursos
  const pos = cursos.filter((curso) => curso.nivel === "Pós-graduação");
  if (pos.length > 0) {
    perguntas.push({
      id: `pos-graduacao-${area.slug}`,
      pergunta: `Quais pós-graduações em ${area.nome} o IPOG oferece?`,
      resposta: `O IPOG oferece ${pos.length} ${plural(
        pos.length,
        "pós-graduação",
        "pós-graduações",
      )} na área de ${area.nome}, entre MBAs e especializações: ${amostraDeCursos(
        pos,
        6,
      )}.`,
      categoria: "Cursos e modalidades",
    });
  }

  // 7. Áreas vizinhas, quando há sobreposição relevante
  if (stats.interdisciplinares > 0) {
    const vizinhas = areasDeConhecimento
      .filter((outra) => outra.slug !== area.slug)
      .map((outra) => ({
        outra,
        emComum: cursos.filter((curso) => curso.areas.includes(outra.slug)).length,
      }))
      .filter((item) => item.emComum > 0)
      .sort((a, b) => b.emComum - a.emComum)
      .slice(0, 4);

    perguntas.push({
      id: `interdisciplinar-${area.slug}`,
      pergunta: `Os cursos de ${area.nome} do IPOG se cruzam com outras áreas?`,
      resposta: `Sim. ${stats.interdisciplinares} dos ${stats.total} cursos de ${
        area.nome
      } também são classificados pelo IPOG em outra área. As sobreposições mais frequentes são com ${enumerar(
        vizinhas.map(
          (item) =>
            `${item.outra.nome} (${item.emComum} ${plural(item.emComum, "curso", "cursos")})`,
        ),
      )}.`,
      categoria: "Cursos e modalidades",
    });
  }

  // 8. Correspondência com o rótulo do site oficial, quando diferem
  if (area.rotuloOficial !== area.nome) {
    perguntas.push({
      id: `rotulo-${area.slug}`,
      pergunta: `Por que ${area.nome} aparece como "${area.rotuloOficial}" no site do IPOG?`,
      resposta: `O filtro de cursos de ipog.edu.br agrupa ${area.nome} sob o rótulo "${area.rotuloOficial}", que reúne mais de uma área em um único item. É a mesma oferta de cursos, com nomes diferentes em cada lugar.`,
      categoria: "Cursos e modalidades",
    });
  }

  return perguntas;
}
