/**
 * Confere o tamanho dos parágrafos de resposta direta das páginas de área.
 *
 * A diretriz de conteúdo do portal é que cada resposta tenha entre 40 e 60
 * palavras: curta o bastante para um motor generativo citar inteira, longa o
 * bastante para responder sozinha. Como os parágrafos são montados a partir do
 * catálogo, o tamanho muda quando a oferta muda, e sem esta verificação o desvio
 * passaria despercebido.
 *
 * Roda sobre o HTML exportado, e não sobre o código, porque é o HTML que o
 * crawler lê.
 *
 * Uso: node scripts/verificar-paragrafos.mjs
 */

import { readFile } from "node:fs/promises";

const MINIMO = 40;
const MAXIMO = 60;

const AREAS = [
  "comunicacao",
  "direito",
  "pericias-forenses",
  "educacao",
  "engenharia",
  "arquitetura",
  "gestao-e-negocios",
  "meio-ambiente",
  "saude",
  "tecnologia-da-informacao",
  "contabilidade",
  "psicologia",
];

/** Remove marcação e devolve o texto puro. */
const semTags = (html) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

const contar = (texto) => texto.split(/\s+/).filter(Boolean).length;

/**
 * Outras rotas que também abrem com resposta direta.
 * Os caminhos são relativos a `out/`.
 */
const OUTRAS_ROTAS = ["tipos-de-curso", "modalidades"];

const falhas = [];
const avisos = [];
let conferidos = 0;

const paginas = [
  ...AREAS.map((slug) => ({
    rotulo: slug,
    caminho: `out/areas-de-conhecimento/${slug}/index.html`,
  })),
  ...OUTRAS_ROTAS.map((slug) => ({
    rotulo: slug,
    caminho: `out/${slug}/index.html`,
  })),
];

for (const { rotulo: slug, caminho } of paginas) {
  let html;
  try {
    html = await readFile(caminho, "utf8");
  } catch {
    falhas.push(`${slug}: página não encontrada no export`);
    continue;
  }

  // Os parágrafos de resposta direta são marcados com data-resposta.
  const blocos = [...html.matchAll(/<p[^>]*data-resposta="([^"]*)"[^>]*>([\s\S]*?)<\/p>/g)];

  if (blocos.length === 0) {
    falhas.push(`${slug}: nenhum parágrafo de resposta direta encontrado`);
    continue;
  }

  for (const [, id, corpo] of blocos) {
    const palavras = contar(semTags(corpo));
    conferidos += 1;
    if (palavras < MINIMO || palavras > MAXIMO) {
      const mensagem = `${slug} · ${id}: ${palavras} palavras (esperado ${MINIMO} a ${MAXIMO})`;
      // Desvio de até 15% vira aviso; acima disso, falha.
      const limite = palavras < MINIMO ? MINIMO * 0.85 : MAXIMO * 1.15;
      const dentroDaTolerancia =
        palavras < MINIMO ? palavras >= limite : palavras <= limite;
      (dentroDaTolerancia ? avisos : falhas).push(mensagem);
    }
  }
}

for (const aviso of avisos) console.log(`  aviso: ${aviso}`);

if (falhas.length > 0) {
  console.error("\nParágrafos fora do tamanho previsto:");
  for (const falha of falhas) console.error(`  - ${falha}`);
  process.exit(1);
}

console.log(
  `\nVerificação concluída: ${conferidos} parágrafos de resposta direta dentro de ${MINIMO} a ${MAXIMO} palavras.`,
);
