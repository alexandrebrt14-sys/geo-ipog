/**
 * Verificação dos endereços externos publicados pelo portal.
 *
 * Percorre o HTML exportado, junta todo `href` que aponta para fora do portal e
 * confere se cada um responde. Endereço que não resolve, ou que devolve erro,
 * reprova o build.
 *
 * **Por que isto existe.** O portal publicou por meses
 * `www.ipogmais.ipog.edu.br` como endereço do Portal Financeiro. Esse host não
 * existe: o que responde é `ipogmais.ipog.edu.br`, sem o `www.`. O erro veio do
 * Manual do Aluno de Pós-Graduação 2026, foi copiado para a base de
 * conhecimento interna e de lá para cá, e ninguém percebeu porque o endereço
 * era texto solto na tela, e não um link em que se clica.
 *
 * Um portal que existe para ser citado por motor generativo não pode publicar
 * endereço morto: a IA repete o endereço, a pessoa não chega a lugar nenhum, e
 * quem perde reputação é a instituição.
 *
 * O que este script NÃO faz: dizer se o endereço é o **certo**. Ele diz se
 * responde. Endereço que responde mas leva ao lugar errado continua sendo
 * trabalho de conferência humana contra a fonte.
 *
 * Uso: node scripts/verificar-enderecos.mjs
 *      node scripts/verificar-enderecos.mjs --offline   (só lista, não acessa)
 */

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const RAIZ_EXPORT = "out";
const OFFLINE = process.argv.includes("--offline");

/** Quanto esperar por host, antes de considerar sem resposta. */
const TEMPO_LIMITE_MS = 15000;

/** Quantas tentativas por endereço, para não reprovar por instabilidade de rede. */
const TENTATIVAS = 3;

/**
 * Domínios que não devem ser testados por requisição.
 *
 * `schema.org` aparece como identificador de vocabulário dentro do JSON-LD, e
 * não como link para uma pessoa clicar. `api.whatsapp.com` responde de forma
 * diferente conforme origem e agente, então testá-lo gera falso negativo.
 */
const NAO_TESTAR = ["schema.org", "api.whatsapp.com", "www.w3.org"];

async function htmlsDoExport(diretorio, acumulador = []) {
  for (const entrada of await readdir(diretorio, { withFileTypes: true })) {
    const caminho = join(diretorio, entrada.name);
    if (entrada.isDirectory()) await htmlsDoExport(caminho, acumulador);
    else if (entrada.name.endsWith(".html")) acumulador.push(caminho);
  }
  return acumulador;
}

const arquivos = await htmlsDoExport(RAIZ_EXPORT);

/** endereço -> páginas em que aparece */
const enderecos = new Map();

for (const arquivo of arquivos) {
  const html = await readFile(arquivo, "utf8");
  for (const achado of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
    const bruto = achado[1].replace(/&amp;/g, "&");

    let url;
    try {
      url = new URL(bruto);
    } catch {
      continue;
    }

    // O próprio portal e o site anfitrião são conferidos pelo smoke test do
    // workflow, sobre o endereço publicado de verdade. Aqui interessa o que é
    // de terceiro, que ninguém controla e que quebra sem avisar.
    if (url.hostname === "posgraduacaopsicologia.com") continue;
    if (NAO_TESTAR.some((dominio) => url.hostname.endsWith(dominio))) continue;

    const chave = url.toString();
    if (!enderecos.has(chave)) enderecos.set(chave, new Set());
    enderecos.get(chave).add(arquivo.replace(/\\/g, "/"));
  }
}

const lista = [...enderecos.keys()].sort();

console.log("");
console.log(
  `Endereços externos publicados: ${lista.length} distintos, em ${arquivos.length} páginas.`,
);

if (OFFLINE) {
  for (const endereco of lista) {
    console.log(`  ${endereco}  (${enderecos.get(endereco).size} páginas)`);
  }
  console.log("");
  console.log("Modo offline: nada foi acessado.");
}

/**
 * Testa um endereço.
 *
 * Tenta HEAD primeiro, que é mais barato, e cai para GET porque parte dos
 * servidores institucionais não implementa HEAD e responde 405. Um host que não
 * resolve não devolve status nenhum, e é esse o caso que interessa pegar.
 */
async function testar(endereco) {
  for (let tentativa = 1; tentativa <= TENTATIVAS; tentativa += 1) {
    for (const metodo of ["HEAD", "GET"]) {
      try {
        const resposta = await fetch(endereco, {
          method: metodo,
          redirect: "follow",
          signal: AbortSignal.timeout(TEMPO_LIMITE_MS),
          headers: {
            // Sem um agente reconhecível, parte dos servidores devolve 403.
            "User-Agent":
              "Mozilla/5.0 (compatible; verificador-portal-geo-ipog/1.0)",
            // Fecha a conexão em vez de reaproveitá-la. Sem isto o Node segura
            // sockets em keep-alive, o processo não termina sozinho, e no
            // Windows a saída forçada quebra com uma asserção do libuv que
            // engole o código de erro: o script reprovava e o CI passava.
            Connection: "close",
          },
        });
        if (resposta.status !== 405) {
          return { status: resposta.status, url: resposta.url };
        }
      } catch (erro) {
        if (tentativa === TENTATIVAS && metodo === "GET") {
          return { status: 0, erro: String(erro.cause?.code ?? erro.message) };
        }
      }
    }
  }
  return { status: 0, erro: "sem resposta" };
}

const falhas = [];

for (const endereco of OFFLINE ? [] : lista) {
  const resultado = await testar(endereco);
  const ok = resultado.status >= 200 && resultado.status < 400;
  console.log(
    `  ${String(resultado.status || "---").padStart(3)}  ${endereco}${
      resultado.erro ? `  (${resultado.erro})` : ""
    }`,
  );
  if (!ok) {
    falhas.push({ endereco, ...resultado, paginas: enderecos.get(endereco) });
  }
}

if (falhas.length > 0) {
  console.log("");
  console.log(`Endereços que não respondem (${falhas.length}):`);
  for (const falha of falhas) {
    console.log(
      `  - ${falha.endereco}  ${falha.erro ? `(${falha.erro})` : `HTTP ${falha.status}`}`,
    );
    console.log(`      publicado em: ${[...falha.paginas].slice(0, 3).join(", ")}`);
  }
  console.log("");
  console.log(
    "Endereço publicado precisa levar a algum lugar. Conferir contra a fonte " +
      "antes de corrigir no chute: o endereço certo pode não ser o parecido.",
  );
  // `exitCode` em vez de `exit()`: deixa o processo terminar sozinho, com o
  // código certo, em vez de derrubá-lo com requisição ainda em curso.
  process.exitCode = 1;
} else if (!OFFLINE) {
  console.log("");
  console.log("Todos os endereços externos respondem.");
}
