#!/usr/bin/env node
// Schema.org audit para posgraduacaopsicologia.com
//
// Lê todas as páginas .astro em site/src/pages/ e detecta quais tipos
// Schema.org estão declarados em scripts JSON-LD (set:html ou inline).
// Saída CSV com colunas: rota | schema_types | tem_FAQPage | tem_BreadcrumbList | tem_Article
//
// Uso: node scripts/schema_audit.mjs
// Output: data/audits/schema-audit-YYYY-MM-DD.csv

import fs from 'node:fs';
import path from 'node:path';

const PAGES_DIR = path.resolve('site/src/pages');
const OUT_DIR = path.resolve('data/audits');
const TODAY = new Date().toISOString().slice(0, 10);

const SCHEMA_TYPES_TRACKED = [
  'Article', 'FAQPage', 'BreadcrumbList', 'WebSite',
  'EducationalOccupationalProgram', 'HowTo', 'HowToStep',
  'DefinedTermSet', 'DefinedTerm', 'CollectionPage',
  'Place', 'Organization', 'EducationalOrganization',
  'Course', 'Question', 'Answer'
];

function walkAstroFiles(dir, base = '') {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = path.join(base, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkAstroFiles(full, rel));
    } else if (entry.name.endsWith('.astro')) {
      results.push({ full, rel: rel.replace(/\\/g, '/') });
    }
  }
  return results;
}

function inferRoute(rel) {
  // site/src/pages/areas/psicologia-organizacional.astro -> /areas/psicologia-organizacional
  // site/src/pages/index.astro -> /
  // site/src/pages/areas/index.astro -> /areas
  let route = '/' + rel.replace(/\.astro$/, '');
  if (route.endsWith('/index')) route = route.replace(/\/index$/, '') || '/';
  return route;
}

function extractSchemaTypes(content) {
  const found = new Set();
  // Captura @type: 'X', "@type": "X", '@type':'X' etc.
  const regex = /@type['"\s:]+['"]([A-Z][a-zA-Z0-9]+)['"]/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    if (SCHEMA_TYPES_TRACKED.includes(m[1])) {
      found.add(m[1]);
    } else {
      found.add(`?${m[1]}`); // unknown — keep with prefix for visibility
    }
  }
  return [...found];
}

function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const files = walkAstroFiles(PAGES_DIR);
  const rows = [];

  for (const { full, rel } of files) {
    const content = fs.readFileSync(full, 'utf8');
    const types = extractSchemaTypes(content);
    const route = inferRoute(rel);
    rows.push({
      route,
      file: rel,
      types: types.join('|'),
      has_Article: types.includes('Article') ? '1' : '0',
      has_FAQPage: types.includes('FAQPage') ? '1' : '0',
      has_BreadcrumbList: types.includes('BreadcrumbList') ? '1' : '0',
      has_HowTo: types.includes('HowTo') ? '1' : '0',
      has_EducationalOccupationalProgram: types.includes('EducationalOccupationalProgram') ? '1' : '0',
      has_DefinedTermSet: types.includes('DefinedTermSet') ? '1' : '0'
    });
  }

  // Sort by route
  rows.sort((a, b) => a.route.localeCompare(b.route));

  const header = 'route,file,types,has_Article,has_FAQPage,has_BreadcrumbList,has_HowTo,has_EducationalOccupationalProgram,has_DefinedTermSet';
  const csv = [header, ...rows.map(r => `"${r.route}","${r.file}","${r.types}",${r.has_Article},${r.has_FAQPage},${r.has_BreadcrumbList},${r.has_HowTo},${r.has_EducationalOccupationalProgram},${r.has_DefinedTermSet}`)].join('\n');

  const outFile = path.join(OUT_DIR, `schema-audit-${TODAY}.csv`);
  fs.writeFileSync(outFile, csv, 'utf8');

  // Summary
  const total = rows.length;
  const withArticle = rows.filter(r => r.has_Article === '1').length;
  const withFaq = rows.filter(r => r.has_FAQPage === '1').length;
  const withBreadcrumb = rows.filter(r => r.has_BreadcrumbList === '1').length;
  const withHowTo = rows.filter(r => r.has_HowTo === '1').length;
  const withEdProg = rows.filter(r => r.has_EducationalOccupationalProgram === '1').length;
  const withDefTerm = rows.filter(r => r.has_DefinedTermSet === '1').length;
  const noSchema = rows.filter(r => !r.types).length;

  console.log(`\nSchema audit completo: ${outFile}`);
  console.log(`Total páginas .astro: ${total}`);
  console.log(`Article:                       ${withArticle} (${(withArticle / total * 100).toFixed(1)}%)`);
  console.log(`FAQPage:                       ${withFaq} (${(withFaq / total * 100).toFixed(1)}%)`);
  console.log(`BreadcrumbList:                ${withBreadcrumb} (${(withBreadcrumb / total * 100).toFixed(1)}%)`);
  console.log(`HowTo:                         ${withHowTo} (${(withHowTo / total * 100).toFixed(1)}%)`);
  console.log(`EducationalOccupationalProgram: ${withEdProg} (${(withEdProg / total * 100).toFixed(1)}%)`);
  console.log(`DefinedTermSet:                ${withDefTerm} (${(withDefTerm / total * 100).toFixed(1)}%)`);
  console.log(`Sem schema detectado:          ${noSchema}`);

  if (noSchema > 0) {
    console.log('\nPáginas sem schema detectado:');
    for (const r of rows.filter(r => !r.types)) {
      console.log(`  - ${r.route} (${r.file})`);
    }
  }
}

main();
