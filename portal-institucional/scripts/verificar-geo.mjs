/**
 * Verificação de GEO e SEO sobre o HTML já exportado.
 *
 * Roda depois do build e confere, no arquivo entregue ao crawler, o que a
 * estratégia do portal promete: JSON-LD válido, hierarquia de cabeçalhos sem
 * salto, metadados sociais completos e presença do conteúdo sem JavaScript.
 *
 * Uso: node scripts/verificar-geo.mjs
 */

import { readFile, access } from "node:fs/promises";
import { join } from "node:path";

const RAIZ_EXPORT = "out";

/** Áreas de conhecimento, na mesma ordem em que o portal as declara. */
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

const ROTAS = [
  { arquivo: "index.html", nome: "/" },
  { arquivo: "areas-de-conhecimento/index.html", nome: "/areas-de-conhecimento" },
  { arquivo: "tipos-de-curso/index.html", nome: "/tipos-de-curso" },
  { arquivo: "modalidades/index.html", nome: "/modalidades" },
  { arquivo: "enterprise/index.html", nome: "/enterprise" },
  { arquivo: "ipog-hub/index.html", nome: "/ipog-hub" },
  { arquivo: "unidades/index.html", nome: "/unidades" },
  { arquivo: "metodo/index.html", nome: "/metodo" },
  { arquivo: "autoridade/index.html", nome: "/autoridade" },
  { arquivo: "faq/index.html", nome: "/faq" },
  { arquivo: "sobre/index.html", nome: "/sobre" },
  ...AREAS.map((slug) => ({
    arquivo: `areas-de-conhecimento/${slug}/index.html`,
    nome: `/areas-de-conhecimento/${slug}`,
  })),
];

const falhas = [];
const avisos = [];

const registrar = (rota, mensagem, critico = true) => {
  (critico ? falhas : avisos).push(`${rota}: ${mensagem}`);
};

/** Extrai e valida todos os blocos JSON-LD de um documento. */
function extrairJsonLd(html) {
  const blocos = [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ];
  return blocos.map((bloco) => JSON.parse(bloco[1].replace(/\\u003c/g, "<")));
}

/** Achata schemas aninhados em uma lista plana de @type encontrados. */
function coletarTipos(valor, acumulador = new Set()) {
  if (Array.isArray(valor)) {
    valor.forEach((item) => coletarTipos(item, acumulador));
  } else if (valor && typeof valor === "object") {
    if (typeof valor["@type"] === "string") acumulador.add(valor["@type"]);
    Object.values(valor).forEach((item) => coletarTipos(item, acumulador));
  }
  return acumulador;
}

for (const rota of ROTAS) {
  const caminho = join(RAIZ_EXPORT, rota.arquivo);

  try {
    await access(caminho);
  } catch {
    registrar(rota.nome, "arquivo não encontrado no export");
    continue;
  }

  const html = await readFile(caminho, "utf8");

  // --- JSON-LD ---------------------------------------------------------
  let schemas = [];
  try {
    schemas = extrairJsonLd(html);
  } catch (erro) {
    registrar(rota.nome, `JSON-LD inválido: ${erro.message}`);
  }

  if (schemas.length === 0) {
    registrar(rota.nome, "nenhum bloco JSON-LD encontrado");
  }

  const tipos = coletarTipos(schemas);
  for (const obrigatorio of [
    "EducationalOrganization",
    "WebSite",
    "WebPage",
    "BreadcrumbList",
  ]) {
    if (!tipos.has(obrigatorio)) {
      registrar(rota.nome, `schema ausente: ${obrigatorio}`);
    }
  }

  // --- Cabeçalhos ------------------------------------------------------
  const h1 = [...html.matchAll(/<h1[\s>]/g)].length;
  if (h1 !== 1) {
    registrar(rota.nome, `esperado exatamente 1 <h1>, encontrado ${h1}`);
  }

  const niveis = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  for (let i = 1; i < niveis.length; i += 1) {
    if (niveis[i] - niveis[i - 1] > 1) {
      registrar(
        rota.nome,
        `salto de hierarquia: h${niveis[i - 1]} seguido de h${niveis[i]}`,
        false,
      );
      break;
    }
  }

  // --- Landmarks semânticos --------------------------------------------
  for (const tag of ["<header", "<main", "<footer", "<nav"]) {
    if (!html.includes(tag)) {
      registrar(rota.nome, `elemento semântico ausente: ${tag}>`);
    }
  }

  // --- Metadados -------------------------------------------------------
  const exigidos = [
    ['<html lang="pt-BR"', "atributo lang"],
    ['name="description"', "meta description"],
    ['property="og:title"', "OpenGraph title"],
    ['property="og:description"', "OpenGraph description"],
    ['property="og:image"', "OpenGraph image"],
    ['name="twitter:card"', "Twitter Card"],
    ['rel="canonical"', "URL canônica"],
    ['name="viewport"', "meta viewport"],
  ];
  for (const [agulha, rotulo] of exigidos) {
    if (!html.includes(agulha)) registrar(rota.nome, `${rotulo} ausente`);
  }

  // --- Conteúdo sem JavaScript -----------------------------------------
  const textoVisivel = html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (textoVisivel.length < 1500) {
    registrar(
      rota.nome,
      `conteúdo textual estático muito curto (${textoVisivel.length} caracteres)`,
    );
  }
}

// --- Conferências específicas de rota ------------------------------------
const faqHtml = await readFile(join(RAIZ_EXPORT, "faq/index.html"), "utf8");
const faqSchemas = extrairJsonLd(faqHtml);
const faqPage = faqSchemas
  .flat()
  .find((schema) => schema["@type"] === "FAQPage");

if (!faqPage) {
  registrar("/faq", "schema FAQPage ausente");
} else {
  const perguntas = faqPage.mainEntity ?? [];
  console.log(`  FAQPage declara ${perguntas.length} perguntas.`);
  const semResposta = perguntas.filter(
    (pergunta) => !pergunta.acceptedAnswer?.text,
  );
  if (semResposta.length > 0) {
    registrar("/faq", `${semResposta.length} perguntas sem acceptedAnswer`);
  }
  // A resposta precisa estar no HTML, e não apenas no bloco de dados.
  for (const pergunta of perguntas) {
    if (!faqHtml.includes(pergunta.name)) {
      registrar("/faq", `pergunta ausente do HTML visível: ${pergunta.name}`);
    }
  }
}

const areasHtml = await readFile(
  join(RAIZ_EXPORT, "areas-de-conhecimento/index.html"),
  "utf8",
);
const cursos = coletarTipos(extrairJsonLd(areasHtml));
if (!cursos.has("Course")) {
  registrar("/areas-de-conhecimento", "schema Course ausente");
}

for (const arquivo of ["robots.txt", "sitemap.xml"]) {
  try {
    await access(join(RAIZ_EXPORT, arquivo));
  } catch {
    registrar("export", `${arquivo} não foi gerado`);
  }
}

// --- Relatório -----------------------------------------------------------
console.log("");
if (avisos.length > 0) {
  console.log("Avisos:");
  avisos.forEach((aviso) => console.log(`  - ${aviso}`));
  console.log("");
}

if (falhas.length > 0) {
  console.log(`Falhas encontradas (${falhas.length}):`);
  falhas.forEach((falha) => console.log(`  - ${falha}`));
  process.exit(1);
}

console.log(`Verificação concluída: ${ROTAS.length} rotas aprovadas.`);
