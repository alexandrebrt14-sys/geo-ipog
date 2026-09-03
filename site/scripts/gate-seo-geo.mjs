#!/usr/bin/env node
// Gate bloqueante de SEO/GEO (Onda 6, 03/09/2026).
//
// Roda sobre dist/ DEPOIS de `npm run build` (astro build + gen-sitemap.mjs) e sai com
// código 1 quando encontra qualquer defeito nas cinco categorias abaixo. Sem dependências
// além do Node. Uso:
//
//   node scripts/gate-seo-geo.mjs           relatório em pt-BR
//   node scripts/gate-seo-geo.mjs --json    relatório em JSON (stdout), mesmo código de saída
//
// Categorias:
//   a. órfão disco×sitemap (nos dois sentidos) e URL noindex dentro do sitemap;
//   b. canonical ausente, duplicado ou diferente da URL própria (barra final normalizada);
//   c. JSON-LD não parseável ou sem os campos mínimos por tipo;
//   d. staleness: dateModified do nó de página diferente do lastmod do sitemap;
//   e. paridade FAQ: cada Question.name do FAQPage aparece literalmente no texto visível.
//
// Exceções documentadas vivem em src/data/gate-seo-geo-allowlist.json (mínimas, com motivo).
// Regra da casa: defeito real se corrige na FONTE (src/), nunca em dist/ nem por allowlist.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const t0 = Date.now();
const SITE = 'https://posgraduacaopsicologia.com';
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(scriptDir, '..');
const distDir = path.join(siteRoot, 'dist');
const allowlistFile = path.join(siteRoot, 'src', 'data', 'gate-seo-geo-allowlist.json');
const asJson = process.argv.includes('--json');

// ---------------------------------------------------------------------------
// Tipos e campos mínimos
// ---------------------------------------------------------------------------
const PAGE_TYPES = new Set([
  'WebPage', 'AboutPage', 'CollectionPage', 'ContactPage', 'FAQPage', 'ItemPage', 'ProfilePage', 'QAPage',
  'MedicalWebPage', 'Article', 'NewsArticle', 'TechArticle', 'ScholarlyArticle', 'BlogPosting', 'Report',
  'Course', 'HowTo', 'DefinedTermSet'
]);
const ARTICLE_TYPES = new Set(['Article', 'NewsArticle', 'TechArticle', 'ScholarlyArticle', 'BlogPosting', 'Report', 'HowTo']);
const ENTITY_TYPES = new Set(['Organization', 'Person', 'EducationalOrganization', 'CollegeOrUniversity', 'Corporation', 'NGO']);
const ENTITY_ROLES = ['author', 'publisher', 'provider'];

// ---------------------------------------------------------------------------
// Allowlist
// ---------------------------------------------------------------------------
let allowlist = { sitemapExclusoes: [], excecoes: [] };
if (fs.existsSync(allowlistFile)) {
  try {
    allowlist = { ...allowlist, ...JSON.parse(fs.readFileSync(allowlistFile, 'utf-8')) };
  } catch (e) {
    console.error(`[gate-seo-geo] allowlist inválida (${path.relative(siteRoot, allowlistFile)}): ${e.message}`);
    process.exit(1);
  }
}
for (const item of [...allowlist.sitemapExclusoes, ...allowlist.excecoes]) {
  if (!item.rota || !item.motivo) {
    console.error('[gate-seo-geo] toda entrada da allowlist exige "rota" e "motivo".');
    process.exit(1);
  }
}
const sitemapExclusoes = new Map(allowlist.sitemapExclusoes.map(e => [e.rota, e.motivo]));
// excecoes: { rota, regra: 'canonical'|'jsonld'|'staleness'|'faq', motivo }
const excecoes = allowlist.excecoes;
function allowed(route, regra) {
  return excecoes.some(e => e.rota === route && e.regra === regra);
}

// ---------------------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------------------
function walkHtml(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'ipog' || e.name.startsWith('_') || e.name === 'assets') continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkHtml(full, acc);
    else if (e.name === 'index.html') acc.push(full);
  }
  return acc;
}
function routeOf(file) {
  const rel = path.relative(distDir, path.dirname(file)).replace(/\\/g, '/');
  return rel ? `/${rel}/` : '/';
}
function normUrl(u) {
  if (typeof u !== 'string') return '';
  const s = u.trim();
  if (s === SITE || s === SITE + '/') return SITE + '/';
  return s.replace(/\/+$/, '') + '/';
}
const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', ndash: '–', mdash: '—', laquo: '«', raquo: '»', ldquo: '“', rdquo: '”', lsquo: '‘', rsquo: '’' };
function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => (n in ENTITIES ? ENTITIES[n] : m));
}
function normText(s) {
  return decodeEntities(String(s))
    .replace(/[ \s]+/g, ' ')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .trim()
    .toLowerCase();
}
function visibleText(html) {
  return normText(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<template\b[\s\S]*?<\/template>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  );
}
function typesOf(n) {
  const t = n && n['@type'];
  return Array.isArray(t) ? t : t ? [t] : [];
}
function hasId(v) {
  if (!v) return false;
  if (Array.isArray(v)) return v.length > 0 && v.every(hasId);
  return typeof v === 'object' && typeof v['@id'] === 'string' && v['@id'].length > 0;
}
function nonEmpty(v) {
  return typeof v === 'string' && v.trim().length > 0;
}
// Achata @graph e arrays; devolve os nós de primeiro nível da página.
function flattenNodes(data) {
  const out = [];
  const push = d => {
    if (!d || typeof d !== 'object') return;
    if (Array.isArray(d)) return d.forEach(push);
    if (Array.isArray(d['@graph'])) { d['@graph'].forEach(push); return; }
    out.push(d);
  };
  push(data);
  return out;
}

// ---------------------------------------------------------------------------
// Sitemap
// ---------------------------------------------------------------------------
const sitemapFile = path.join(distDir, 'sitemap.xml');
if (!fs.existsSync(distDir) || !fs.existsSync(sitemapFile)) {
  console.error('[gate-seo-geo] dist/sitemap.xml ausente: rode `npm run build` antes do gate.');
  process.exit(1);
}
const sitemapXml = fs.readFileSync(sitemapFile, 'utf-8');
const sitemap = new Map(); // loc normalizado -> lastmod
for (const m of sitemapXml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const loc = (m[1].match(/<loc>([^<]+)<\/loc>/) || [])[1];
  const lastmod = (m[1].match(/<lastmod>([^<]+)<\/lastmod>/) || [])[1] || null;
  if (loc) sitemap.set(normUrl(decodeEntities(loc)), lastmod ? lastmod.slice(0, 10) : null);
}

// ---------------------------------------------------------------------------
// Varredura das páginas
// ---------------------------------------------------------------------------
const files = walkHtml(distDir);
const routesOnDisk = new Set(files.map(routeOf));
const findings = { a: [], b: [], c: [], d: [], e: [] };
const stats = { paginas: files.length, sitemapUrls: sitemap.size, jsonldBlocos: 0, faqPages: 0, faqPerguntas: 0, noindex: 0 };
const fail = (cat, route, msg) => findings[cat].push({ rota: route, mensagem: msg });

for (const file of files) {
  const route = routeOf(file);
  const url = SITE + route;
  const html = fs.readFileSync(file, 'utf-8');
  const noindex = /<meta\s+name="robots"\s+content="[^"]*noindex[^"]*"/i.test(html);
  if (noindex) stats.noindex++;
  const inSitemap = sitemap.has(url);

  // (a) órfão disco -> sitemap e noindex no sitemap
  if (!inSitemap) {
    if (sitemapExclusoes.has(route)) {
      // exclusão documentada; ainda assim exige noindex para não ser página indexável invisível ao sitemap
      if (!noindex) fail('a', route, `fora do sitemap por exclusão documentada, mas sem meta robots noindex (motivo registrado: ${sitemapExclusoes.get(route)})`);
    } else {
      fail('a', route, noindex
        ? 'página noindex fora do sitemap sem exclusão documentada em src/data/gate-seo-geo-allowlist.json'
        : 'página indexável em dist/ ausente do sitemap.xml (órfã)');
    }
  } else if (noindex) {
    fail('a', route, 'URL noindex presente no sitemap.xml');
  }

  // (b) canonical
  const canonicals = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]*)"\s*\/?>/gi)].map(m => decodeEntities(m[1]));
  if (!allowed(route, 'canonical')) {
    if (canonicals.length === 0) fail('b', route, 'canonical ausente');
    else if (canonicals.length > 1) fail('b', route, `canonical duplicado (${canonicals.length} tags)`);
    else if (normUrl(canonicals[0]) !== url) fail('b', route, `canonical "${canonicals[0]}" difere da URL própria "${url}"`);
  }

  // (c) JSON-LD
  const blocks = [...html.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  const nodes = [];
  let breadcrumbs = 0;
  for (const b of blocks) {
    stats.jsonldBlocos++;
    let data;
    try {
      data = JSON.parse(decodeEntities(b[1]) === b[1] ? b[1] : b[1]);
    } catch (e) {
      fail('c', route, `JSON-LD não parseável: ${e.message.slice(0, 80)}`);
      continue;
    }
    nodes.push(...flattenNodes(data));
  }
  const jsonldOk = !allowed(route, 'jsonld');
  const pageDates = [];
  let faqQuestions = [];
  for (const n of nodes) {
    const types = typesOf(n);
    const label = types.join('+') || 'sem @type';
    if (types.includes('BreadcrumbList')) breadcrumbs++;

    if (types.some(t => PAGE_TYPES.has(t)) && typeof n.dateModified === 'string') pageDates.push({ label, date: n.dateModified.slice(0, 10) });

    if (!jsonldOk) continue;

    // Organization/Person como author/publisher/provider exige @id
    for (const role of ENTITY_ROLES) {
      const v = n[role];
      if (!v) continue;
      const list = Array.isArray(v) ? v : [v];
      for (const ent of list) {
        if (ent && typeof ent === 'object' && typesOf(ent).some(t => ENTITY_TYPES.has(t)) && !hasId(ent)) {
          fail('c', route, `${label}.${role} (${typesOf(ent).join('+')}) sem @id`);
        }
      }
    }

    if (types.some(t => ARTICLE_TYPES.has(t))) {
      if (!nonEmpty(n.headline) && !nonEmpty(n.name)) fail('c', route, `${label} sem headline/name`);
      if (!hasId(n.author)) fail('c', route, `${label} sem author com @id`);
      if (!nonEmpty(n.datePublished)) fail('c', route, `${label} sem datePublished`);
      if (!nonEmpty(n.dateModified)) fail('c', route, `${label} sem dateModified`);
    }
    if (types.includes('Course')) {
      if (!nonEmpty(n.name)) fail('c', route, 'Course sem name');
      if (!hasId(n.provider)) fail('c', route, 'Course sem provider com @id');
    }
    if (types.includes('FAQPage')) {
      const qs = (Array.isArray(n.mainEntity) ? n.mainEntity : n.mainEntity ? [n.mainEntity] : []).filter(q => typesOf(q).includes('Question'));
      if (qs.length === 0) fail('c', route, 'FAQPage sem Question em mainEntity');
      qs.forEach((q, i) => {
        const ans = Array.isArray(q.acceptedAnswer) ? q.acceptedAnswer[0] : q.acceptedAnswer;
        if (!nonEmpty(q.name)) fail('c', route, `FAQPage.mainEntity[${i}] Question sem name`);
        if (!ans || !nonEmpty(ans.text)) fail('c', route, `FAQPage.mainEntity[${i}] "${String(q.name || '').slice(0, 60)}" sem acceptedAnswer.text`);
      });
      faqQuestions.push(...qs);
    }
    if (types.includes('DefinedTermSet')) {
      const terms = Array.isArray(n.hasDefinedTerm) ? n.hasDefinedTerm : n.hasDefinedTerm ? [n.hasDefinedTerm] : [];
      if (terms.length === 0) fail('c', route, 'DefinedTermSet sem DefinedTerm em hasDefinedTerm');
      terms.forEach((t, i) => {
        if (!nonEmpty(t.name)) fail('c', route, `DefinedTermSet.hasDefinedTerm[${i}] sem name`);
        if (!nonEmpty(t.url)) fail('c', route, `DefinedTerm "${String(t.name || '').slice(0, 60)}" sem url`);
        if (!nonEmpty(t['@id'])) fail('c', route, `DefinedTerm "${String(t.name || '').slice(0, 60)}" sem @id`);
      });
    }
  }
  if (jsonldOk && breadcrumbs > 1) fail('c', route, `BreadcrumbList duplicado (${breadcrumbs} na página)`);

  // (d) staleness
  if (inSitemap && !allowed(route, 'staleness')) {
    const lastmod = sitemap.get(url);
    for (const pd of pageDates) {
      if (pd.date !== lastmod) fail('d', route, `${pd.label}.dateModified=${pd.date} difere do lastmod do sitemap=${lastmod}`);
    }
  }

  // (e) paridade FAQ
  if (faqQuestions.length && !allowed(route, 'faq')) {
    stats.faqPages++;
    const text = visibleText(html);
    for (const q of faqQuestions) {
      stats.faqPerguntas++;
      if (!nonEmpty(q.name)) continue;
      if (!text.includes(normText(q.name))) fail('e', route, `pergunta do FAQPage ausente do texto visível: "${q.name.slice(0, 90)}"`);
    }
  }
}

// (a) sitemap -> disco
for (const loc of sitemap.keys()) {
  if (!loc.startsWith(SITE + '/')) { fail('a', loc, 'URL do sitemap fora do domínio'); continue; }
  const route = loc.slice(SITE.length);
  if (!routesOnDisk.has(route)) fail('a', route, 'URL do sitemap.xml sem index.html correspondente em dist/');
}

// ---------------------------------------------------------------------------
// Relatório
// ---------------------------------------------------------------------------
const NOMES = {
  a: 'Órfãos disco×sitemap e noindex no sitemap',
  b: 'Canonical (ausente, duplicado ou divergente)',
  c: 'JSON-LD (parse e campos mínimos)',
  d: 'Staleness (dateModified × lastmod)',
  e: 'Paridade FAQ (Question.name no texto visível)'
};
const total = Object.values(findings).reduce((n, l) => n + l.length, 0);
const ms = Date.now() - t0;

if (asJson) {
  console.log(JSON.stringify({ ok: total === 0, total, duracaoMs: ms, stats, categorias: Object.fromEntries(Object.entries(findings).map(([k, v]) => [k, { nome: NOMES[k], total: v.length, itens: v }])) }, null, 2));
} else {
  console.log(`[gate-seo-geo] ${stats.paginas} páginas em dist/, ${stats.sitemapUrls} URLs no sitemap, ${stats.jsonldBlocos} blocos JSON-LD, ${stats.noindex} noindex, ${stats.faqPages} FAQPage com ${stats.faqPerguntas} perguntas.`);
  for (const [k, list] of Object.entries(findings)) {
    console.log(`  (${k}) ${NOMES[k]}: ${list.length === 0 ? 'OK' : list.length + ' bloqueio(s)'}`);
    const porRota = new Map();
    for (const f of list) {
      if (!porRota.has(f.rota)) porRota.set(f.rota, []);
      porRota.get(f.rota).push(f.mensagem);
    }
    let shown = 0;
    for (const [rota, msgs] of porRota) {
      if (shown++ >= 60) { console.log(`      ... e mais ${porRota.size - 60} rota(s)`); break; }
      console.log(`      ${rota}`);
      for (const m of msgs.slice(0, 8)) console.log(`        - ${m}`);
      if (msgs.length > 8) console.log(`        - ... e mais ${msgs.length - 8} item(ns)`);
    }
  }
  console.log(total === 0
    ? `[gate-seo-geo] APROVADO em ${ms} ms.`
    : `[gate-seo-geo] REPROVADO: ${total} bloqueio(s) em ${ms} ms. Corrija na fonte (src/); exceções só em src/data/gate-seo-geo-allowlist.json com motivo.`);
}
process.exit(total === 0 ? 0 : 1);
