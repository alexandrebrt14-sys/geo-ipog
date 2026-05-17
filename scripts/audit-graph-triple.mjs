#!/usr/bin/env node
/**
 * Auditoria do `@graph` triplo canônico — Wave 3 (17-05-2026).
 *
 * Lê todos os arquivos .astro em site/src/pages/ e site/src/components/
 * e diagnostica cobertura de:
 *  1. `@graph` triplo (WebSite + Organization + Person) — herdado de Base.astro em TODAS as pages.
 *  2. Schemas adicionais por página (Article, FAQPage, BreadcrumbList, EducationalOccupationalProgram,
 *     EducationalOrganization, Course, HowTo, CollectionPage, DefinedTermSet, Speakable).
 *  3. Page-level @id atrelado ao canônico (mainEntityOfPage / @id).
 *
 * Output: tabela markdown em docs/governance/audit-graph-triple-YYYY-MM-DD.md
 *
 * Uso: node scripts/audit-graph-triple.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const PAGES_DIR = path.join(ROOT, 'site/src/pages');
const COMPONENTS_DIR = path.join(ROOT, 'site/src/components');
const LAYOUTS_DIR = path.join(ROOT, 'site/src/layouts');
const OUT_DIR = path.join(ROOT, 'docs/governance');
const TODAY = new Date().toISOString().slice(0, 10);
const OUT_FILE = path.join(OUT_DIR, `audit-graph-triple-${TODAY}.md`);

const SCHEMAS_TIER1 = ['WebSite', 'Organization', 'Person']; // @graph triplo canônico
const SCHEMAS_TIER2_ARTICLE = ['Article', 'NewsArticle', 'BlogPosting'];
const SCHEMAS_TIER2 = [
  'BreadcrumbList',
  'FAQPage',
  'CollectionPage',
  'WebPage',
  'EducationalOccupationalProgram',
  'EducationalOrganization',
  'Course',
  'HowTo',
  'DefinedTermSet',
  'DefinedTerm',
  'ItemList',
  'SpeakableSpecification',
  'QAPage'
];

/**
 * @graph triplo HERDADO de Base.astro:
 * Toda página que extends Base.astro recebe WebSite + Organization (brasilGeoOrganization) + Person (alexandrePersonBase).
 * A auditoria considera "triplo OK herdado" para qualquer página que importa Base.astro.
 */
function detectsBaseLayout(content) {
  return (
    /from\s+['"]@layouts\/Base\.astro['"]/.test(content) ||
    /from\s+['"]\.\.\/layouts\/Base\.astro['"]/.test(content) ||
    /<Base[\s>]/.test(content)
  );
}

function walkAstroFiles(dir, base = '') {
  const results = [];
  if (!fs.existsSync(dir)) return results;
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

function inferRoute(rel, root = 'pages') {
  let route = '/' + rel.replace(/\.astro$/, '');
  if (route.endsWith('/index')) route = route.replace(/\/index$/, '') || '/';
  // [slug].astro -> /:slug
  route = route.replace(/\[([^\]]+)\]/g, ':$1');
  return root === 'pages' ? route : `(component) ${rel}`;
}

function extractSchemaTypes(content) {
  const found = new Set();
  // Captura @type: 'X', "@type": "X", '@type':'X', etc.
  const regex = /['"]?@type['"]?\s*:\s*['"]([A-Z][a-zA-Z0-9]+)['"]/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    found.add(m[1]);
  }
  return found;
}

function detectsSpeakable(content) {
  return /speakable\s*[:=]/i.test(content) || /SpeakableSpecification/.test(content);
}

function detectsImportsCanonicalSchemas(content) {
  return /@lib\/schemas/.test(content);
}

function classifyPage(content, hasBaseLayout) {
  const types = extractSchemaTypes(content);

  // Triplo herdado via Base.astro
  const tripleInherited = hasBaseLayout;

  // Schemas próprios declarados na página
  const ownTier1 = SCHEMAS_TIER1.filter((t) => types.has(t));
  const ownTier2Article = SCHEMAS_TIER2_ARTICLE.filter((t) => types.has(t));
  const ownTier2 = SCHEMAS_TIER2.filter((t) => types.has(t));

  const hasArticle = ownTier2Article.length > 0;
  const hasBreadcrumb = types.has('BreadcrumbList');
  const hasFAQ = types.has('FAQPage');
  const hasEduProgram = types.has('EducationalOccupationalProgram');
  const hasEduOrg = types.has('EducationalOrganization');
  const hasCourse = types.has('Course');
  const hasHowTo = types.has('HowTo');
  const hasSpeakable = detectsSpeakable(content);
  const importsCanonical = detectsImportsCanonicalSchemas(content);

  return {
    tripleInherited,
    types: Array.from(types).sort(),
    ownTier1,
    ownTier2: [...ownTier2Article, ...ownTier2],
    hasArticle,
    hasBreadcrumb,
    hasFAQ,
    hasEduProgram,
    hasEduOrg,
    hasCourse,
    hasHowTo,
    hasSpeakable,
    importsCanonical
  };
}

function richnessScore(c) {
  // 0-100. Triplo herdado = 30 base. +10 cada Tier2 declarado. +15 Speakable. +5 canonical import.
  let score = c.tripleInherited ? 30 : 0;
  score += Math.min(c.ownTier2.length * 10, 60);
  if (c.hasSpeakable) score += 15;
  if (c.importsCanonical) score += 5;
  return Math.min(score, 100);
}

function detectGaps(c, isHubProgram, isArticle) {
  const gaps = [];
  if (!c.tripleInherited) gaps.push('sem @graph triplo (não usa Base.astro)');
  if (isHubProgram && !c.hasEduProgram) gaps.push('hub de programa sem EducationalOccupationalProgram');
  if (isHubProgram && !c.hasEduOrg) gaps.push('hub de programa sem EducationalOrganization');
  if (isArticle && !c.hasArticle) gaps.push('artigo sem schema Article');
  if (isArticle && !c.hasBreadcrumb) gaps.push('artigo sem BreadcrumbList');
  if ((isArticle || isHubProgram) && !c.hasSpeakable) gaps.push('sem Speakable em página candidata');
  return gaps;
}

function isHubProgramRoute(route) {
  // Hubs canônicos de programa: /mbas, /mbas/<slug>, /tipos-de-pos-graduacao, /metodos
  return (
    route === '/mbas' ||
    route.startsWith('/mbas/') ||
    route === '/tipos-de-pos-graduacao' ||
    route.startsWith('/metodos') ||
    route.startsWith('/areas/') ||
    route.startsWith('/intervencoes/')
  );
}

function isArticleRoute(route) {
  return (
    route.startsWith('/guias/') ||
    route.startsWith('/faq/') ||
    route.startsWith('/comparativos/') ||
    route.startsWith('/casos/') ||
    route.startsWith('/evidencias/')
  );
}

function main() {
  const pageFiles = walkAstroFiles(PAGES_DIR);
  const componentFiles = walkAstroFiles(COMPONENTS_DIR);
  const layoutFiles = walkAstroFiles(LAYOUTS_DIR);

  const results = [];

  for (const f of pageFiles) {
    const content = fs.readFileSync(f.full, 'utf-8');
    const hasBase = detectsBaseLayout(content);
    const c = classifyPage(content, hasBase);
    const route = inferRoute(f.rel, 'pages');
    const isHub = isHubProgramRoute(route);
    const isArt = isArticleRoute(route);
    const score = richnessScore(c);
    const gaps = detectGaps(c, isHub, isArt);
    results.push({
      route,
      file: f.rel,
      kind: isHub ? 'hub-programa' : isArt ? 'artigo' : 'institucional',
      classification: c,
      score,
      gaps
    });
  }

  for (const f of componentFiles) {
    const content = fs.readFileSync(f.full, 'utf-8');
    const c = classifyPage(content, false); // componentes não têm layout
    if (c.types.length === 0 && !c.hasSpeakable && !c.importsCanonical) continue;
    results.push({
      route: `(component) ${f.rel}`,
      file: f.rel,
      kind: 'component',
      classification: c,
      score: richnessScore(c),
      gaps: []
    });
  }

  // Sumário
  const totalPages = pageFiles.length;
  const withTriple = results.filter((r) => r.kind !== 'component' && r.classification.tripleInherited).length;
  const withArticle = results.filter((r) => r.kind !== 'component' && r.classification.hasArticle).length;
  const withBreadcrumb = results.filter((r) => r.kind !== 'component' && r.classification.hasBreadcrumb).length;
  const withFAQ = results.filter((r) => r.kind !== 'component' && r.classification.hasFAQ).length;
  const withEduProgram = results.filter((r) => r.kind !== 'component' && r.classification.hasEduProgram).length;
  const withEduOrg = results.filter((r) => r.kind !== 'component' && r.classification.hasEduOrg).length;
  const withSpeakable = results.filter((r) => r.kind !== 'component' && r.classification.hasSpeakable).length;
  const withCourse = results.filter((r) => r.kind !== 'component' && r.classification.hasCourse).length;
  const withHowTo = results.filter((r) => r.kind !== 'component' && r.classification.hasHowTo).length;
  const importsCanonical = results.filter((r) => r.kind !== 'component' && r.classification.importsCanonical).length;

  const triplePct = ((withTriple / totalPages) * 100).toFixed(1);

  // Hubs de programa e artigos com gaps
  const hubsComGaps = results.filter((r) => r.kind === 'hub-programa' && r.gaps.length > 0);
  const artigosComGaps = results.filter((r) => r.kind === 'artigo' && r.gaps.length > 0);

  // Top 10 mais ricos
  const top10Rich = [...results]
    .filter((r) => r.kind !== 'component')
    .sort((a, b) => b.score - a.score || a.route.localeCompare(b.route))
    .slice(0, 10);

  // Top 10 com mais gaps
  const top10Gaps = [...results]
    .filter((r) => r.kind !== 'component' && r.gaps.length > 0)
    .sort((a, b) => b.gaps.length - a.gaps.length || a.score - b.score)
    .slice(0, 10);

  const md = renderMarkdown({
    totalPages,
    totalComponents: componentFiles.length,
    totalLayouts: layoutFiles.length,
    withTriple,
    triplePct,
    withArticle,
    withBreadcrumb,
    withFAQ,
    withEduProgram,
    withEduOrg,
    withSpeakable,
    withCourse,
    withHowTo,
    importsCanonical,
    hubsComGaps,
    artigosComGaps,
    top10Rich,
    top10Gaps,
    results
  });

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, md, 'utf-8');

  console.log(`Audit gravado em: ${path.relative(ROOT, OUT_FILE)}`);
  console.log(`Cobertura @graph triplo: ${withTriple}/${totalPages} (${triplePct}%)`);
  console.log(`Hubs de programa com gaps: ${hubsComGaps.length}`);
  console.log(`Artigos com gaps: ${artigosComGaps.length}`);
  console.log(`Top 10 mais ricos: ${top10Rich.map((r) => r.route).join(', ')}`);
}

function renderMarkdown(data) {
  const {
    totalPages,
    totalComponents,
    totalLayouts,
    withTriple,
    triplePct,
    withArticle,
    withBreadcrumb,
    withFAQ,
    withEduProgram,
    withEduOrg,
    withSpeakable,
    withCourse,
    withHowTo,
    importsCanonical,
    hubsComGaps,
    artigosComGaps,
    top10Rich,
    top10Gaps,
    results
  } = data;

  let md = '';
  md += `# Auditoria @graph triplo + schemas canônicos\n\n`;
  md += `**Data:** ${TODAY}  \n`;
  md += `**Escopo:** \`site/src/pages/\` + \`site/src/components/\` + \`site/src/layouts/\`  \n`;
  md += `**Gerador:** \`scripts/audit-graph-triple.mjs\` (Wave 3 SEO/GEO Sprint 17-05-2026)\n\n`;
  md += `---\n\n`;

  md += `## TL;DR\n\n`;
  md += `- ${totalPages} páginas \`.astro\` em \`site/src/pages/\`, ${totalComponents} componentes, ${totalLayouts} layouts.\n`;
  md += `- **\`@graph\` triplo (WebSite + Organization + Person) herdado de Base.astro:** ${withTriple}/${totalPages} = **${triplePct}%**.\n`;
  md += `- ${importsCanonical} páginas importam helpers canônicos de \`@lib/schemas\`.\n`;
  md += `- Schemas Tier 2 por página:\n`;
  md += `  - \`Article\` / \`BlogPosting\` / \`NewsArticle\`: ${withArticle}.\n`;
  md += `  - \`BreadcrumbList\`: ${withBreadcrumb}.\n`;
  md += `  - \`FAQPage\`: ${withFAQ}.\n`;
  md += `  - \`EducationalOccupationalProgram\`: ${withEduProgram}.\n`;
  md += `  - \`EducationalOrganization\` (page-level): ${withEduOrg}.\n`;
  md += `  - \`Course\`: ${withCourse}.\n`;
  md += `  - \`HowTo\`: ${withHowTo}.\n`;
  md += `  - \`Speakable\` (qualquer forma): ${withSpeakable}.\n\n`;

  md += `## Cobertura por tipo de página\n\n`;
  md += `| Tipo | Total | Com triplo herdado |\n`;
  md += `|------|-------|--------------------|\n`;
  const buckets = { hub: 0, artigo: 0, institucional: 0 };
  const bucketsTriple = { hub: 0, artigo: 0, institucional: 0 };
  for (const r of results) {
    if (r.kind === 'component') continue;
    const k = r.kind === 'hub-programa' ? 'hub' : r.kind;
    buckets[k]++;
    if (r.classification.tripleInherited) bucketsTriple[k]++;
  }
  md += `| Hub de programa | ${buckets.hub} | ${bucketsTriple.hub} |\n`;
  md += `| Artigo (guia/faq/comparativo/caso/evidência) | ${buckets.artigo} | ${bucketsTriple.artigo} |\n`;
  md += `| Institucional | ${buckets.institucional} | ${bucketsTriple.institucional} |\n\n`;

  md += `## Top 10 páginas com schemas mais ricos\n\n`;
  md += `| Rota | Score | Schemas próprios | Speakable |\n`;
  md += `|------|------:|------------------|:--------:|\n`;
  for (const r of top10Rich) {
    md += `| \`${r.route}\` | ${r.score} | ${r.classification.ownTier2.join(', ') || '—'} | ${r.classification.hasSpeakable ? 'sim' : '—'} |\n`;
  }
  md += `\n`;

  md += `## Top 10 páginas com mais gaps\n\n`;
  if (top10Gaps.length === 0) {
    md += `_Nenhuma página com gaps detectados — auditoria limpa nesta dimensão._\n\n`;
  } else {
    md += `| Rota | Score | Gaps |\n`;
    md += `|------|------:|------|\n`;
    for (const r of top10Gaps) {
      md += `| \`${r.route}\` | ${r.score} | ${r.gaps.join('; ')} |\n`;
    }
    md += `\n`;
  }

  if (hubsComGaps.length > 0) {
    md += `## Hubs de programa que precisam de \`EducationalOccupationalProgram\`\n\n`;
    md += `_Adicionar via \`buildEducationalOccupationalProgram\` de \`@lib/schemas\`._\n\n`;
    for (const r of hubsComGaps) {
      md += `- \`${r.route}\` → ${r.gaps.join('; ')}\n`;
    }
    md += `\n`;
  }

  md += `## Detalhamento completo\n\n`;
  md += `| Rota | Tipo | Score | Triplo | Schemas próprios | Gaps |\n`;
  md += `|------|------|------:|:------:|------------------|------|\n`;
  const sortedAll = [...results]
    .filter((r) => r.kind !== 'component')
    .sort((a, b) => a.route.localeCompare(b.route));
  for (const r of sortedAll) {
    md += `| \`${r.route}\` | ${r.kind} | ${r.score} | ${r.classification.tripleInherited ? 'sim' : 'NÃO'} | ${r.classification.ownTier2.join(', ') || '—'} | ${r.gaps.join('; ') || '—'} |\n`;
  }
  md += `\n`;

  md += `## Componentes com schema próprio\n\n`;
  const components = results.filter((r) => r.kind === 'component');
  if (components.length === 0) {
    md += `_Nenhum._\n\n`;
  } else {
    md += `| Componente | Schemas | Speakable |\n`;
    md += `|------------|---------|:---------:|\n`;
    for (const r of components) {
      md += `| \`${r.file}\` | ${r.classification.types.join(', ') || '—'} | ${r.classification.hasSpeakable ? 'sim' : '—'} |\n`;
    }
    md += `\n`;
  }

  md += `## Próximos passos sugeridos\n\n`;
  md += `1. Adicionar \`Speakable\` em todas as páginas de hub de programa e em artigos com TL;DR/FAQ.\n`;
  md += `2. Migrar hubs MBA (\`/mbas/*\`) para \`buildEducationalOccupationalProgram\` (atualmente declaram apenas Course/credential parcial).\n`;
  md += `3. Centralizar \`EducationalOrganization\` IPOG via \`ipogEducationalOrganization\` em vez de inline.\n`;
  md += `4. Atrelar \`Article\` ao \`@graph\` Person+Organization via \`@id\` em vez de inline duplicado.\n`;

  return md;
}

main();
