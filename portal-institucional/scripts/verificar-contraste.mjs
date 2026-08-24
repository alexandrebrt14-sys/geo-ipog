/**
 * Verificação de contraste sobre o HTML já exportado.
 *
 * Confere a regra 1.4.3 da WCAG 2.2 no nível AA: texto normal precisa de 4,5:1
 * contra o próprio fundo. O alvo são as cores escritas em atributo `style`, que
 * é por onde a cor da área entra na página e é justamente o caminho que escapa
 * de qualquer revisão de folha de estilo.
 *
 * O portal já publicou com cinco combinações reprovadas, sendo a pior delas
 * 1,83:1 no Amarelo Estratégico. A correção vive em `src/lib/cor.ts`; este
 * script existe para que ela não se perca em uma área nova acrescentada meses
 * depois.
 *
 * Uso: node scripts/verificar-contraste.mjs
 */

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const RAIZ_EXPORT = "out";

/** Mínimo da WCAG 2.2 AA para texto normal. */
const MINIMO = 4.5;

/**
 * Superfície contra a qual o texto é medido quando o elemento não declara fundo
 * próprio. Todas as ocorrências de `color:` sem fundo no portal ficam sobre
 * cartão branco. Se algum dia aparecer uma sobre superfície escura, ela será
 * acusada aqui, e é melhor o script reclamar do que deixar passar calado.
 */
const SUPERFICIE_PADRAO = "#ffffff";

const canalLinear = (valor) => {
  const c = valor / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};

/** Lê `#rgb`, `#rrggbb` ou `#rrggbbaa`. Devolve `null` para o resto. */
function lerHex(hex) {
  const limpo = hex.trim().replace(/^#/, "");
  const expandido =
    limpo.length === 3 || limpo.length === 4
      ? limpo.split("").map((c) => c + c).join("")
      : limpo;

  if (!/^[0-9a-f]{6}([0-9a-f]{2})?$/i.test(expandido)) return null;

  return {
    r: parseInt(expandido.slice(0, 2), 16),
    g: parseInt(expandido.slice(2, 4), 16),
    b: parseInt(expandido.slice(4, 6), 16),
    a: expandido.length === 8 ? parseInt(expandido.slice(6, 8), 16) / 255 : 1,
  };
}

const luminancia = ({ r, g, b }) =>
  0.2126 * canalLinear(r) + 0.7152 * canalLinear(g) + 0.0722 * canalLinear(b);

function contraste(frente, fundo) {
  const a = luminancia(frente);
  const b = luminancia(fundo);
  const [maior, menor] = a > b ? [a, b] : [b, a];
  return (maior + 0.05) / (menor + 0.05);
}

/** Compõe uma cor com canal alfa sobre um fundo opaco. */
const sobrepor = (frente, atras) => ({
  r: frente.r * frente.a + atras.r * (1 - frente.a),
  g: frente.g * frente.a + atras.g * (1 - frente.a),
  b: frente.b * frente.a + atras.b * (1 - frente.a),
  a: 1,
});

const paraTexto = ({ r, g, b }) =>
  "#" +
  [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

/** Percorre o export e devolve todos os arquivos `.html`. */
async function htmlsDoExport(diretorio, acumulador = []) {
  for (const entrada of await readdir(diretorio, { withFileTypes: true })) {
    const caminho = join(diretorio, entrada.name);
    if (entrada.isDirectory()) await htmlsDoExport(caminho, acumulador);
    else if (entrada.name.endsWith(".html")) acumulador.push(caminho);
  }
  return acumulador;
}

const arquivos = await htmlsDoExport(RAIZ_EXPORT);

const falhas = [];
/** Cada combinação distinta é medida uma vez, não uma vez por ocorrência. */
const jaMedidas = new Set();
let ocorrencias = 0;

for (const arquivo of arquivos) {
  const html = await readFile(arquivo, "utf8");

  for (const atributo of html.matchAll(/style="([^"]*)"/g)) {
    const estilo = atributo[1];

    const corDoTexto = estilo.match(/(?:^|;)\s*color:\s*(#[0-9a-f]{3,8})/i);
    if (!corDoTexto) continue;

    const corDoFundo = estilo.match(/background-color:\s*(#[0-9a-f]{3,8})/i);

    const frente = lerHex(corDoTexto[1]);
    if (!frente) continue;

    const superficie = lerHex(SUPERFICIE_PADRAO);
    const fundo = corDoFundo
      ? sobrepor(lerHex(corDoFundo[1]) ?? superficie, superficie)
      : superficie;

    ocorrencias += 1;

    const chave = `${paraTexto(frente)} sobre ${paraTexto(fundo)}`;
    if (jaMedidas.has(chave)) continue;
    jaMedidas.add(chave);

    const razao = contraste(sobrepor(frente, fundo), fundo);
    if (razao < MINIMO) {
      falhas.push({
        razao,
        chave,
        arquivo: arquivo.replace(/\\/g, "/"),
      });
    }
  }
}

console.log("");
console.log(
  `Contraste: ${ocorrencias} usos de cor em atributo style, ` +
    `${jaMedidas.size} combinações distintas, em ${arquivos.length} páginas.`,
);

if (falhas.length > 0) {
  console.log("");
  console.log(`Combinações abaixo de ${MINIMO}:1 (WCAG 2.2 AA):`);
  for (const falha of falhas) {
    console.log(`  - ${falha.razao.toFixed(2)}:1  ${falha.chave}`);
    console.log(`      primeira ocorrência: ${falha.arquivo}`);
  }
  console.log("");
  console.log(
    "Cor de marca aplicada como texto passa por `corDeTextoAcessivel`, " +
      "em src/lib/cor.ts, que escurece o tom sem trocar o matiz.",
  );
  process.exit(1);
}

console.log(`Todas as combinações alcançam ${MINIMO}:1 ou mais.`);
