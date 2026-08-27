#!/usr/bin/env node
/**
 * check-external-ids.mjs — gate de identificadores externos (Wikidata).
 *
 * Varre site/src, site/public e llms*.txt atrás de QIDs do Wikidata
 * (https://www.wikidata.org/wiki/Qnnn, Special:EntityData/Qnnn ou "Wikidata Qnnn")
 * e consulta Special:EntityData/<QID>.json. HTTP 404 ou 410 (item apagado ou
 * inexistente) FALHA o gate: um sameAs morto convida o resolvedor de entidade a
 * concluir que a entidade não existe.
 *
 * Cache: .cache/external-ids.json (7 dias por QID) para não bater na API a cada
 * build. Erros de rede (timeout, 5xx) não falham: são relatados como aviso e o
 * QID é reavaliado na próxima execução (sem cache).
 *
 * Uso: node scripts/check-external-ids.mjs [--no-cache]
 * Saída != 0 se houver QID morto.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CACHE_FILE = join(ROOT, '.cache', 'external-ids.json');
const TTL_MS = 7 * 24 * 60 * 60 * 1000;
const NO_CACHE = process.argv.includes('--no-cache');
const SCAN_DIRS = ['site/src', 'site/public'];
const SCAN_GLOBS_ROOT = /^llms.*\.txt$/;
const EXT = new Set(['.astro', '.ts', '.tsx', '.js', '.mjs', '.json', '.md', '.txt', '.xml', '.html']);
const QID_RE = /(?:wikidata\.org\/(?:wiki|entity)\/|Special:EntityData\/|\bWikidata[:\s]+`?)(Q\d{1,12})\b/g;

function walk(dir, out) {
  for (const e of readdirSync(dir)) {
    if (e === 'node_modules' || e === 'dist' || e === '.astro') continue;
    const p = join(dir, e);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (EXT.has(extname(e))) out.push(p);
  }
}

const files = [];
for (const d of SCAN_DIRS) if (existsSync(join(ROOT, d))) walk(join(ROOT, d), files);
for (const e of readdirSync(ROOT)) if (SCAN_GLOBS_ROOT.test(e)) files.push(join(ROOT, e));

/** @type {Map<string, Set<string>>} QID -> arquivos */
const found = new Map();
for (const f of files) {
  const text = readFileSync(f, 'utf8');
  for (const m of text.matchAll(QID_RE)) {
    if (!found.has(m[1])) found.set(m[1], new Set());
    found.get(m[1]).add(f.slice(ROOT.length + 1).replaceAll('\\', '/'));
  }
}

let cache = {};
if (!NO_CACHE && existsSync(CACHE_FILE)) {
  try { cache = JSON.parse(readFileSync(CACHE_FILE, 'utf8')); } catch { cache = {}; }
}

async function probe(qid) {
  const hit = cache[qid];
  if (!NO_CACHE && hit && Date.now() - hit.checkedAt < TTL_MS) return { ...hit, cached: true };
  const url = `https://www.wikidata.org/wiki/Special:EntityData/${qid}.json`;
  try {
    const r = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15000), headers: { 'user-agent': 'geo-ipog-check-external-ids/1.0' } });
    const status = r.status;
    let label = null;
    if (r.ok) {
      try {
        const j = await r.json();
        const ent = j.entities && (j.entities[qid] || Object.values(j.entities)[0]);
        label = ent && ent.labels && (ent.labels['pt-br'] || ent.labels.pt || ent.labels.en || {}).value || null;
        if (ent && ent.id && ent.id !== qid) label = `${label} (redireciona para ${ent.id})`;
      } catch {}
    }
    const rec = { status, label, checkedAt: Date.now() };
    if (status < 500) cache[qid] = rec;
    return rec;
  } catch (err) {
    return { status: 0, label: null, error: String(err && err.message || err), checkedAt: Date.now() };
  }
}

const qids = [...found.keys()].sort();
console.log(`check-external-ids: ${qids.length} QID(s) em ${files.length} arquivo(s) varrido(s)`);
let dead = 0, warn = 0;
for (const qid of qids) {
  const r = await probe(qid);
  const where = [...found.get(qid)].slice(0, 4).join(', ') + (found.get(qid).size > 4 ? ` (+${found.get(qid).size - 4})` : '');
  if (r.status === 404 || r.status === 410) {
    dead++;
    console.error(`  MORTO  ${qid} HTTP ${r.status}${r.cached ? ' (cache)' : ''} -> ${where}`);
  } else if (r.status >= 200 && r.status < 300) {
    console.log(`  ok     ${qid} HTTP ${r.status}${r.cached ? ' (cache)' : ''} ${r.label ? `"${r.label}"` : ''}`);
  } else {
    warn++;
    console.warn(`  AVISO  ${qid} HTTP ${r.status}${r.error ? ` (${r.error})` : ''} -> ${where}`);
  }
}
mkdirSync(dirname(CACHE_FILE), { recursive: true });
writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2) + '\n');
if (dead) {
  console.error(`\ncheck-external-ids: ${dead} QID(s) morto(s). Remova o identificador do site (sameAs/identifier/llms) antes de publicar.`);
  process.exit(1);
}
console.log(`check-external-ids: OK (${warn} aviso(s) de rede)`);
