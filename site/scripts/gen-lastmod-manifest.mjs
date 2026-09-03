#!/usr/bin/env node
// Gera src/generated/lastmod.json — manifesto rota -> datas reais de git por página.
//
// MOTIVO (Onda 3 SEO/GEO, 03/09/2026): o sitemap chamava `git log -1` por arquivo
// dentro do CI, e o checkout raso (actions/checkout sem fetch-depth) colapsava
// 100% dos lastmod na data do merge. O JSON-LD, por sua vez, não tinha
// dateModified em 179 das 320 páginas Article e, quando tinha, era literal fixo.
//
// Este script é a FONTE ÚNICA de datas por rota: o sitemap (scripts/gen-sitemap.mjs)
// e o JSON-LD (src/integrations/seo-postbuild.mjs + src/lib/lastmod.ts) leem o
// mesmo manifesto, logo dateModified == lastmod por construção.
//
// Estratégia: UMA passada em `git log --name-status --format=%cI -- src/pages`
// (do commit mais novo ao mais velho). A primeira vez que um arquivo aparece é o
// último commit que o tocou (modified); a última vez que aparece com status A é o
// commit que o adicionou (published). Renomes (R) herdam a linhagem do nome antigo.
// Arquivo sem histórico (novo, ainda não commitado) cai para o mtime local.
//
// Uso: node scripts/gen-lastmod-manifest.mjs   (roda no prebuild/predev)

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const siteRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const pagesDir = path.join(siteRoot, 'src', 'pages');
const outFile = path.join(siteRoot, 'src', 'generated', 'lastmod.json');

function git(args) {
  try {
    return execFileSync('git', args, { cwd: siteRoot, encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024 });
  } catch {
    return null;
  }
}

// Rota pública (com barra final, igual ao canonical do Astro com trailingSlash 'always').
function routeFor(relFile) {
  const noExt = relFile.replace(/\\/g, '/').replace(/\.astro$/, '');
  if (noExt === 'index') return '/';
  if (noExt.endsWith('/index')) return '/' + noExt.slice(0, -'/index'.length) + '/';
  return '/' + noExt + '/';
}

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, acc);
    else if (e.name.endsWith('.astro') && !e.name.startsWith('_')) acc.push(full);
  }
  return acc;
}

const files = walk(pagesDir);
const shallow = (git(['rev-parse', '--is-shallow-repository']) || '').trim() === 'true';
if (shallow) {
  console.warn('[lastmod-manifest] AVISO: repositório raso (shallow). As datas colapsariam na data do checkout; use fetch-depth: 0 no CI.');
}

// Uma passada no histórico. --name-status para distinguir A (adicionado) de M/R.
const log = git(['log', '--name-status', '--format=@@%cI', '--no-renames', '--', 'src/pages']);
const modified = new Map(); // rel -> ISO do último commit
const published = new Map(); // rel -> ISO do commit de adição (mais antigo com A)
if (log) {
  let current = null;
  for (const raw of log.split('\n')) {
    const line = raw.trimEnd();
    if (!line) continue;
    if (line.startsWith('@@')) { current = line.slice(2); continue; }
    if (!current) continue;
    const m = /^([AMDTRC]\d*)\t(.+?)(?:\t(.+))?$/.exec(line);
    if (!m) continue;
    const status = m[1][0];
    const file = (m[3] || m[2]).replace(/^site\//, '');
    if (!file.startsWith('src/pages/')) continue;
    if (!modified.has(file) && status !== 'D') modified.set(file, current);
    if (status === 'A') published.set(file, current); // sobrescreve: o último A visto é o mais antigo
  }
}

const routes = {};
let fromGit = 0, fromMtime = 0;
for (const full of files) {
  const rel = path.relative(siteRoot, full).replace(/\\/g, '/');
  const route = routeFor(path.relative(pagesDir, full));
  let mod = modified.get(rel) || null;
  let pub = published.get(rel) || null;
  if (mod) fromGit++;
  else {
    // Arquivo sem commit ainda: mtime local, honesto para o preview; o CI sempre tem git.
    mod = fs.statSync(full).mtime.toISOString();
    fromMtime++;
  }
  if (!pub) pub = mod;
  routes[route] = {
    modified: mod.slice(0, 10),
    published: pub.slice(0, 10),
    source: rel
  };
}

const sorted = Object.fromEntries(Object.entries(routes).sort(([a], [b]) => a.localeCompare(b)));
const manifest = {
  comment: 'AUTO-GERADO por scripts/gen-lastmod-manifest.mjs (datas reais do git por página). Não editar à mão; regenerar com: npm run lastmod:manifest',
  shallow,
  routes: sorted
};
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');
const distinct = new Set(Object.values(sorted).map(r => r.modified)).size;
console.log(`[lastmod-manifest] ${Object.keys(sorted).length} rotas (${fromGit} via git, ${fromMtime} via mtime), ${distinct} datas distintas -> ${path.relative(siteRoot, outFile)}`);
