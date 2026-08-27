#!/usr/bin/env node
// Remove o BreadcrumbList manual do frontmatter das paginas que ja renderizam
// <Breadcrumbs items={...} /> (o componente emite o JSON-LD sozinho).
//
// Idempotente: roda quantas vezes quiser; so toca arquivo que ainda tem o bloco.
// Uso: node scripts/remove-breadcrumb-manual.mjs [--dry-run]
//
// Padrao reconhecido (uniforme em 215 paginas em 27/08/2026):
//   const ldBreadcrumb = { ... };            ou   const ldBreadcrumb = JSON.stringify({ ... });
//   <script type="application/ld+json" set:html={JSON.stringify(ldBreadcrumb)} />
//   <script type="application/ld+json" set:html={ldBreadcrumb} />
// Pagina sem <Breadcrumbs (ex.: index.astro) e pulada com aviso, para nao perder o no.

import fs from 'node:fs';
import path from 'node:path';

const dryRun = process.argv.includes('--dry-run');
const pagesDir = path.resolve('src/pages');

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, acc);
    else if (e.name.endsWith('.astro')) acc.push(full);
  }
  return acc;
}

// Remove a declaracao `const ldBreadcrumb = ...;` fazendo balanceamento de chaves
// a partir do primeiro `{` apos o `=`. Devolve o texto novo ou null se nao achou.
function stripDeclaration(src) {
  const declRe = /^[ \t]*const ldBreadcrumb\s*=\s*/m;
  const m = declRe.exec(src);
  if (!m) return null;
  const start = m.index;
  let i = m.index + m[0].length;
  // Avanca ate o primeiro '{'
  while (i < src.length && src[i] !== '{') i++;
  if (i >= src.length) throw new Error('bloco ldBreadcrumb sem "{"');
  let depth = 0;
  let inStr = null;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (inStr) {
      if (ch === '\\') { i++; continue; }
      if (ch === inStr) inStr = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') { inStr = ch; continue; }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) { i++; break; }
    }
  }
  // Consome `)` opcional (JSON.stringify(...)), `;` e a quebra de linha (+ 1 linha em branco).
  while (i < src.length && /[ \t)]/.test(src[i])) i++;
  if (src[i] === ';') i++;
  if (src[i] === '\r') i++;
  if (src[i] === '\n') i++;
  if (src.slice(i, i + 2) === '\r\n') i += 2;
  else if (src[i] === '\n') i++;
  return src.slice(0, start) + src.slice(i);
}

function stripScriptTag(src) {
  const re = /^[ \t]*<script type="application\/ld\+json" set:html=\{(?:JSON\.stringify\(ldBreadcrumb\)|ldBreadcrumb)\}(?: is:inline)? \/>\r?\n?/m;
  if (!re.test(src)) return null;
  return src.replace(re, '');
}

let touched = 0, skipped = 0, untouched = 0;
for (const file of walk(pagesDir)) {
  const src = fs.readFileSync(file, 'utf-8');
  if (!/const ldBreadcrumb\s*=/.test(src)) { untouched++; continue; }
  const rel = path.relative(pagesDir, file).replace(/\\/g, '/');
  if (!/<Breadcrumbs\b/.test(src)) {
    console.warn(`[skip] ${rel}: define ldBreadcrumb mas nao renderiza <Breadcrumbs>; manter manual.`);
    skipped++;
    continue;
  }
  let out = stripDeclaration(src);
  if (out === null) throw new Error(`${rel}: falha ao remover declaracao`);
  const out2 = stripScriptTag(out);
  if (out2 === null) throw new Error(`${rel}: declaracao removida mas <script> de ldBreadcrumb nao encontrado`);
  out = out2;
  if (/ldBreadcrumb/.test(out)) throw new Error(`${rel}: ainda ha referencia a ldBreadcrumb apos a remocao`);
  if (/'BreadcrumbList'|"BreadcrumbList"/.test(out)) {
    console.warn(`[aviso] ${rel}: ainda contem BreadcrumbList em outro bloco (ex.: @graph). Conferir a mao.`);
  }
  if (!dryRun) fs.writeFileSync(file, out, 'utf-8');
  touched++;
}
console.log(`${dryRun ? '[dry-run] ' : ''}removidos: ${touched}, pulados: ${skipped}, sem bloco: ${untouched}`);
