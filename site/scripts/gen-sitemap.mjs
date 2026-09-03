import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const SITE = 'https://posgraduacaopsicologia.com';
const today = new Date().toISOString().slice(0, 10);

const distDir = path.resolve('dist');
const srcPagesDir = path.resolve('src/pages');
const out = [];

// Data do ultimo commit que tocou o arquivo (YYYY-MM-DD). Estavel no CI: o clone
// do GitHub Actions carimba todos os arquivos com a data do checkout, entao o mtime
// colapsaria todos os lastmod na mesma data. O git log preserva a data editorial real.
// Retorna null quando o git nao resolve (arquivo novo nao commitado, ou git ausente).
function gitLastmod(file) {
  try {
    // execFileSync (sem shell) evita injecao e lida com paths com metacaracteres.
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], {
      cwd: srcPagesDir,
      stdio: ['ignore', 'pipe', 'ignore'],
      encoding: 'utf-8',
    }).trim();
    if (out) return out.slice(0, 10);
  } catch {
    // git ausente, fora de repositorio, ou arquivo sem historico de commit
  }
  return null;
}

// Heuristica de prioridade canonica (mais alto = mais critico).
// Tunada para sinalizar a Google e LLMs a hierarquia editorial.
function priorityForRoute(route) {
  if (route === '') return 1.0;
  if (route === 'autismo' || route === 'autismo/') return 0.95;
  if (route === 'mbas' || route === 'mbas/') return 0.9;
  if (route === 'areas' || route === 'areas/') return 0.9;
  if (route === 'glossario' || route === 'glossario/') return 0.9;
  if (route === 'faq' || route === 'faq/') return 0.9;
  if (route.startsWith('autismo/')) return 0.85;
  if (route.startsWith('areas/')) return 0.8;
  if (route.startsWith('mbas/')) return 0.8;
  if (route.startsWith('glossario/')) return 0.8;
  if (route.startsWith('faq/')) return 0.8;
  if (route.startsWith('casos/')) return 0.75;
  if (route.startsWith('metodos/')) return 0.75;
  if (route.startsWith('intervencoes/')) return 0.75;
  if (route.startsWith('comparativos/')) return 0.75;
  if (route.startsWith('guias/')) return 0.75;
  if (route.startsWith('evidencias/')) return 0.7;
  if (route.startsWith('temas/')) return 0.7;
  if (route.startsWith('por-estado/')) return 0.65;
  if (route.startsWith('conteudo-social/')) return 0.6;
  if (route.startsWith('para-quem/')) return 0.65;
  if (route.startsWith('carreira/')) return 0.65;
  if (route.startsWith('benchmarks/') || route.startsWith('pos-graduacao-psicologia/')) return 0.65;
  return 0.5;
}

// Onda 3 SEO/GEO (03/09/2026): FONTE UNICA de datas. Primeiro o mapa rota -> dateModified
// final escrito pela integracao scripts/seo-postbuild.mjs no build (lastmod == dateModified
// do JSON-LD por construcao); depois o manifesto do git (scripts/gen-lastmod-manifest.mjs);
// so entao o `git log -1` por arquivo, mantido como fallback.
function loadRouteDates(file, pick) {
  try {
    const j = JSON.parse(fs.readFileSync(path.resolve('src', 'generated', file), 'utf-8'));
    const out = new Map();
    for (const [route, v] of Object.entries(j.routes || {})) out.set(route, pick(v));
    return out;
  } catch {
    return new Map();
  }
}
const resolvedDates = loadRouteDates('lastmod-resolved.json', v => v);
const manifestDates = loadRouteDates('lastmod.json', v => v.modified);
if (resolvedDates.size === 0 && manifestDates.size === 0) {
  console.warn('[gen-sitemap] sem src/generated/lastmod*.json: caindo para git log por arquivo (rode npm run lastmod:manifest).');
}

// Lastmod real por rota: manifesto do git; fallback git log -1; fallback mtime.
function lastmodForRoute(route, htmlPath) {
  const routeKey = route ? '/' + route.replace(/\/$/, '') + '/' : '/';
  const fromResolved = resolvedDates.get(routeKey);
  if (fromResolved) return fromResolved;
  const fromManifest = manifestDates.get(routeKey);
  if (fromManifest) return fromManifest;
  const candidates = [];
  const base = route ? route.replace(/\/$/, '') : '';
  if (base) {
    candidates.push(path.join(srcPagesDir, base + '.astro'));
    candidates.push(path.join(srcPagesDir, base, 'index.astro'));
  } else {
    candidates.push(path.join(srcPagesDir, 'index.astro'));
  }
  for (const p of candidates) {
    try {
      fs.statSync(p); // garante que o candidato existe antes de consultar o git
    } catch {
      continue;
    }
    // Preferencia: data do ultimo commit (estavel no CI).
    const g = gitLastmod(p);
    if (g) return g;
    // Fallback: arquivo novo ainda nao commitado -> mtime local.
    try {
      const st = fs.statSync(p);
      return st.mtime.toISOString().slice(0, 10);
    } catch {
      // continue
    }
  }
  try {
    const st = fs.statSync(htmlPath);
    return st.mtime.toISOString().slice(0, 10);
  } catch {
    return today;
  }
}

function walk(dir, base = '') {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    // Exclui internos, assets e as paginas noindex (busca e offline) — fora do sitemap.
    // Onda 35: 'offline' (fallback PWA da Onda 34) e noindex e nao deve poluir o sitemap.
    if (entry.name.startsWith('_') || entry.name === 'assets' || entry.name === 'busca' || entry.name === 'offline') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, path.join(base, entry.name));
    } else if (entry.name === 'index.html') {
      const route = base.replace(/\\/g, '/');
      // canonical/og:url do Astro saem COM barra final (build directory-format).
      // Mantemos o sitemap coerente: toda <loc> de pagina termina com barra.
      const stripped = (SITE + '/' + route).replace(/\/+$/, '');
      const cleanLoc = stripped === SITE ? SITE + '/' : stripped + '/';
      out.push({
        loc: cleanLoc,
        priority: priorityForRoute(route),
        route,
        lastmod: lastmodForRoute(route, full)
      });
    }
  }
}

walk(distDir);

function changefreqFor(route) {
  if (route === '') return 'weekly';
  if (route.startsWith('autismo/') || route === 'autismo' || route === 'autismo/') return 'weekly';
  if (route.startsWith('faq/')) return 'monthly';
  if (route.startsWith('glossario/')) return 'monthly';
  if (route.startsWith('casos/')) return 'monthly';
  if (route.startsWith('metodos/')) return 'monthly';
  if (route.startsWith('intervencoes/')) return 'monthly';
  if (route.startsWith('comparativos/')) return 'monthly';
  if (route.startsWith('guias/')) return 'monthly';
  if (route.startsWith('areas/') || route.startsWith('mbas/')) return 'monthly';
  return 'monthly';
}

function buildUrlset(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><changefreq>${changefreqFor(u.route)}</changefreq><priority>${u.priority.toFixed(2)}</priority></url>`).join('\n')}
</urlset>
`;
}

// Sub-sitemap rules: prefixes mapped to filenames. Cobertura canonica 2026-05-20.
const sections = [
  { id: 'autismo', prefix: 'autismo/', file: 'sitemap-autismo.xml' },
  { id: 'areas', prefix: 'areas/', file: 'sitemap-areas.xml' },
  { id: 'mbas', prefix: 'mbas/', file: 'sitemap-mbas.xml' },
  { id: 'glossario', prefix: 'glossario/', file: 'sitemap-glossario.xml' },
  { id: 'faq', prefix: 'faq/', file: 'sitemap-faq.xml' },
  { id: 'guias', prefix: 'guias/', file: 'sitemap-guias.xml' },
  { id: 'casos', prefix: 'casos/', file: 'sitemap-casos.xml' },
  { id: 'metodos', prefix: 'metodos/', file: 'sitemap-metodos.xml' },
  { id: 'intervencoes', prefix: 'intervencoes/', file: 'sitemap-intervencoes.xml' },
  { id: 'comparativos', prefix: 'comparativos/', file: 'sitemap-comparativos.xml' },
  { id: 'evidencias', prefix: 'evidencias/', file: 'sitemap-evidencias.xml' },
  { id: 'temas', prefix: 'temas/', file: 'sitemap-temas.xml' },
  { id: 'por-estado', prefix: 'por-estado/', file: 'sitemap-por-estado.xml' },
  { id: 'conteudo-social', prefix: 'conteudo-social/', file: 'sitemap-conteudo-social.xml' },
  { id: 'para-quem', prefix: 'para-quem/', file: 'sitemap-para-quem.xml' },
  { id: 'carreira', prefix: 'carreira/', file: 'sitemap-carreira.xml' },
  { id: 'recursos', prefix: 'recursos/', file: 'sitemap-recursos.xml' }
];

// Onda 1 SEO/GEO (27/08/2026): tudo que nao casa com nenhum prefixo acima (home,
// paginas de raiz como /sobre/, /regulacao/, /roadmap/ e o grupo
// pos-graduacao-psicologia/) vai para sitemap-institucional.xml, de modo que a
// soma dos shards seja exatamente igual ao sitemap.xml.
const INSTITUCIONAL_FILE = 'sitemap-institucional.xml';

// Main sitemap = todas as URLs.
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), buildUrlset(out), 'utf-8');

// Generate sub-sitemaps.
const subSitemapsWritten = [];
for (const sec of sections) {
  const urls = out.filter(u => u.route.startsWith(sec.prefix));
  if (urls.length === 0) {
    console.warn(`[gen-sitemap] secao "${sec.id}" sem URLs (prefix=${sec.prefix})`);
    continue;
  }
  fs.writeFileSync(path.join(distDir, sec.file), buildUrlset(urls), 'utf-8');
  // lastmod do sub-sitemap = maior lastmod entre suas URLs
  const subLastmod = urls.map(u => u.lastmod).sort().pop() || today;
  subSitemapsWritten.push({ file: sec.file, count: urls.length, lastmod: subLastmod });
}

// Shard institucional: URLs que nao entraram em nenhuma secao.
{
  const covered = new Set();
  for (const sec of sections) for (const u of out) if (u.route.startsWith(sec.prefix)) covered.add(u.loc);
  const rest = out.filter(u => !covered.has(u.loc));
  if (rest.length > 0) {
    fs.writeFileSync(path.join(distDir, INSTITUCIONAL_FILE), buildUrlset(rest), 'utf-8');
    subSitemapsWritten.push({ file: INSTITUCIONAL_FILE, count: rest.length, lastmod: rest.map(u => u.lastmod).sort().pop() || today });
  }
  const shardTotal = subSitemapsWritten.reduce((n, s) => n + s.count, 0);
  if (shardTotal !== out.length) {
    throw new Error(`[gen-sitemap] soma dos shards (${shardTotal}) difere do sitemap.xml (${out.length})`);
  }
}

// sitemap_agentic_discovery.xml (public/, estatico): recursos para agentes
// (agents.md, llms.txt, mcp.json...). Entra no indice com lastmod = data do
// ultimo commit do arquivo; fora do sitemap.xml porque nao sao paginas HTML.
const agenticFile = 'sitemap_agentic_discovery.xml';
const agenticSrc = path.resolve('public', agenticFile);
let agenticEntry = null;
if (fs.existsSync(agenticSrc)) {
  let lastmod = null;
  try {
    lastmod = execFileSync('git', ['log', '-1', '--format=%cI', '--', agenticSrc], {
      cwd: path.resolve('.'), stdio: ['ignore', 'pipe', 'ignore'], encoding: 'utf-8'
    }).trim().slice(0, 10) || null;
  } catch { /* sem git */ }
  if (!lastmod) lastmod = fs.statSync(agenticSrc).mtime.toISOString().slice(0, 10);
  agenticEntry = { loc: `${SITE}/${agenticFile}`, lastmod };
}

// sitemap-index.xml aponta para o principal + todos os sub-sitemaps.
// lastmod do indice = maior lastmod entre todos os sitemaps.
const allMaps = [
  { loc: `${SITE}/sitemap.xml`, lastmod: out.map(u => u.lastmod).sort().pop() || today },
  ...subSitemapsWritten.map(s => ({ loc: `${SITE}/${s.file}`, lastmod: s.lastmod })),
  ...(agenticEntry ? [agenticEntry] : []),
];

const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allMaps.map(m => `  <sitemap><loc>${m.loc}</loc><lastmod>${m.lastmod}</lastmod></sitemap>`).join('\n')}
</sitemapindex>
`;

fs.writeFileSync(path.join(distDir, 'sitemap-index.xml'), indexXml, 'utf-8');

console.log(`Sitemap principal: ${out.length} URLs em sitemap.xml`);
for (const s of subSitemapsWritten) {
  console.log(`  - ${s.file}: ${s.count} URLs (lastmod ${s.lastmod})`);
}
console.log(`Sitemap-index: ${allMaps.length} sitemaps referenciados`);
