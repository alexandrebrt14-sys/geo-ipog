// Integração Astro de pós-build (Onda 3 / Onda 5 / E-E-A-T SEO-GEO, 03/09/2026).
//
// Roda no hook `astro:build:done`, sobre o HTML já gerado em dist/, como o ponto
// CENTRAL de schema do portal: as 394 páginas escrevem o próprio JSON-LD no .astro
// e nenhum layout intercepta esses <script>. Em vez de tocar 394 arquivos à mão,
// esta etapa lê cada página uma vez e aplica, de forma determinística:
//
//  1. dateModified/datePublished (Onda 3) — nos nós de página (WebPage, Article,
//     Course, HowTo, FAQPage...) a partir de src/generated/lastmod.json, o mesmo
//     manifesto que o sitemap usa. dateModified é SEMPRE a data do git (fonte
//     única); datePublished só é preenchido quando a página não declara um.
//     Escreve src/generated/lastmod-resolved.json (rota -> data final) para o
//     gen-sitemap.mjs carimbar lastmod idêntico.
//  2. citation (E-E-A-T) — quando a página tem seção de fontes/referências com
//     links externos, o nó principal ganha `citation: CreativeWork[]` com os
//     mesmos links do HTML visível (paridade texto <-> schema).
//  3. Links termo -> verbete do glossário (Onda 5) — primeira ocorrência de cada
//     termo no corpo de guias/áreas/MBAs vira link para a âncora do verbete.
//     Nunca dentro de heading, link, botão, código ou script; 1 link por termo
//     por página. Ver src/lib/glossario-links.ts.
//
// O portal /ipog é copiado para dist DEPOIS do build (workflow), logo nunca é tocado aqui.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { linkarTermos } from '../src/lib/glossario-links.ts';

const SITE = 'https://posgraduacaopsicologia.com';
const PAGE_TYPES = new Set([
  'WebPage', 'AboutPage', 'CollectionPage', 'ContactPage', 'FAQPage', 'ItemPage', 'ProfilePage', 'QAPage',
  'MedicalWebPage', 'Article', 'NewsArticle', 'TechArticle', 'ScholarlyArticle', 'BlogPosting', 'Report',
  'Course', 'HowTo', 'DefinedTermSet'
]);
// Nós que recebem `citation` (o principal da página; FAQPage e WebPage também são CreativeWork).
const CITATION_TYPES = new Set(['Article', 'NewsArticle', 'TechArticle', 'ScholarlyArticle', 'BlogPosting', 'HowTo', 'Report', 'MedicalWebPage', 'WebPage', 'FAQPage', 'Course']);
const FONTES_RE = /\b(fontes?|refer[êe]ncias?|bibliografia)\b/i;

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(scriptDir, '..');

function typesOf(n) {
  const t = n && n['@type'];
  return new Set(Array.isArray(t) ? t : t ? [t] : []);
}

function walkHtml(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'ipog' || e.name.startsWith('_') || e.name === 'assets') continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkHtml(full, acc);
    else if (e.name === 'index.html') acc.push(full);
  }
  return acc;
}

function routeOf(distDir, file) {
  const rel = path.relative(distDir, path.dirname(file)).replace(/\\/g, '/');
  return rel ? `/${rel}/` : '/';
}

// Extrai citações da seção de fontes: heading (h2/h3/h4) cujo texto casa FONTES_RE,
// depois todo <a href="http(s)://..."> até o próximo heading do mesmo nível ou superior.
function extractCitations(html) {
  const headings = [...html.matchAll(/<h([234])\b[^>]*>([\s\S]*?)<\/h\1>/gi)];
  const seen = new Set();
  const out = [];
  for (let i = 0; i < headings.length; i++) {
    const h = headings[i];
    const text = h[2].replace(/<[^>]+>/g, '').trim();
    if (!FONTES_RE.test(text)) continue;
    const level = Number(h[1]);
    const start = h.index + h[0].length;
    let end = html.length;
    for (let j = i + 1; j < headings.length; j++) {
      if (Number(headings[j][1]) <= level) { end = headings[j].index; break; }
    }
    const block = html.slice(start, end);
    for (const a of block.matchAll(/<a\b[^>]*href="(https?:\/\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)) {
      const url = a[1].replace(/&amp;/g, '&');
      if (url.startsWith(SITE)) continue; // fonte é externa; link interno não é citação
      if (seen.has(url)) continue;
      seen.add(url);
      const name = a[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      out.push({ '@type': 'CreativeWork', name: name || url, url });
    }
  }
  return out;
}

function processPage({ html, route, dates, resolved, stats, linker, withCitation }) {
  let changed = false;
  const citations = withCitation ? extractCitations(html) : [];
  let citationApplied = false;

  html = html.replace(/<script type="application\/ld\+json"([^>]*)>([\s\S]*?)<\/script>/g, (whole, attrs, body) => {
    let data;
    try { data = JSON.parse(body); } catch { return whole; }
    const nodes = Array.isArray(data) ? data : Array.isArray(data['@graph']) ? data['@graph'] : [data];
    let touched = false;
    for (const n of nodes) {
      if (!n || typeof n !== 'object') continue;
      const types = typesOf(n);
      const isPage = [...types].some(t => PAGE_TYPES.has(t));
      if (isPage && dates) {
        const published = typeof n.datePublished === 'string' ? n.datePublished.slice(0, 10) : null;
        if (!published && types.has('DefinedTermSet') === false) {
          n.datePublished = dates.published;
          stats.publishedFilled++;
        }
        const finalPublished = (typeof n.datePublished === 'string' && n.datePublished.slice(0, 10)) || null;
        const finalModified = finalPublished && finalPublished > dates.modified ? finalPublished : dates.modified;
        if (n.dateModified !== finalModified) { n.dateModified = finalModified; stats.modifiedSet++; }
        resolved[route] = resolved[route] && resolved[route] > finalModified ? resolved[route] : finalModified;
        touched = true;
      }
      if (!citationApplied && citations.length && !n.citation && [...types].some(t => CITATION_TYPES.has(t)) && !types.has('BreadcrumbList')) {
        n.citation = citations;
        citationApplied = true;
        stats.citationPages++;
        touched = true;
      }
    }
    if (!touched) return whole;
    changed = true;
    return `<script type="application/ld+json"${attrs}>${JSON.stringify(data)}</script>`;
  });

  if (linker) {
    const r = linker(html, route);
    if (r.count > 0) { html = r.html; changed = true; stats.glossaryLinks += r.count; stats.glossaryPages++; }
  }
  return { html, changed };
}

// opts.citation: liga a etapa 2 (E-E-A-T). opts.glossario: liga a etapa 3 (Onda 5).
export default function seoPostbuild(opts = {}) {
  const withCitation = opts.citation === true;
  const linker = opts.glossario === true ? linkarTermos : null;
  return {
    name: 'seo-postbuild',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        let manifest = null;
        try {
          manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, 'src', 'generated', 'lastmod.json'), 'utf-8'));
        } catch {
          logger.warn('src/generated/lastmod.json ausente: rode `npm run lastmod:manifest`. dateModified não será injetado.');
        }
        const resolved = {};
        const stats = { pages: 0, changed: 0, modifiedSet: 0, publishedFilled: 0, citationPages: 0, glossaryLinks: 0, glossaryPages: 0 };
        for (const file of walkHtml(distDir)) {
          const route = routeOf(distDir, file);
          const dates = manifest?.routes?.[route] ?? null;
          const src = fs.readFileSync(file, 'utf-8');
          const { html, changed } = processPage({ html: src, route, dates, resolved, stats, linker, withCitation });
          stats.pages++;
          if (changed) { fs.writeFileSync(file, html, 'utf-8'); stats.changed++; }
          if (!resolved[route] && dates) resolved[route] = dates.modified;
        }
        fs.mkdirSync(path.join(siteRoot, 'src', 'generated'), { recursive: true });
        fs.writeFileSync(
          path.join(siteRoot, 'src', 'generated', 'lastmod-resolved.json'),
          JSON.stringify({ comment: 'AUTO-GERADO por scripts/seo-postbuild.mjs a cada build: rota -> dateModified final do JSON-LD; o gen-sitemap.mjs usa este arquivo para lastmod == dateModified.', routes: resolved }, null, 2) + '\n',
          'utf-8'
        );
        logger.info(`${stats.pages} páginas, ${stats.changed} reescritas; dateModified em ${stats.modifiedSet} nós, datePublished preenchido em ${stats.publishedFilled}; citation em ${stats.citationPages} páginas; ${stats.glossaryLinks} links termo->verbete em ${stats.glossaryPages} páginas.`);
      }
    }
  };
}
