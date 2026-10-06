import fs from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const dir = process.argv[2] || 'audits/revisao-50-20261006';
if (!/^audits\/[a-z0-9-]+$/.test(dir)) throw new Error('Diretório de auditoria inválido.');
try { await fs.access(`${dir}/baseline.json`); throw new Error('Captura anterior já existe; não sobrescrever a evidência original.'); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
const beforeDir = `tmp/${dir.split('/').at(-1)}-before`;
const waves = JSON.parse(await fs.readFile(`${dir}/selecionadas.json`, 'utf8'));
const dates = JSON.parse(await fs.readFile('site/src/generated/lastmod.json', 'utf8')).routes;
const baseCommit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const items = waves.flatMap(w => w.routes.map(route => ({ wave: w.wave, route, ...dates[route] })));
if (items.length !== 50 || new Set(items.map(item => item.route)).size !== 50) throw new Error('A seleção precisa ter 50 rotas distintas.');
await fs.mkdir(beforeDir, { recursive: true });
let cursor = 0;
await Promise.all(Array.from({length: 4}, async () => {
  while (cursor < items.length) {
    const row = items[cursor++];
    const response = await fetch(`https://posgraduacaopsicologia.com${row.route}`, {signal: AbortSignal.timeout(30000)});
    row.httpBefore = response.status;
    const html = await response.text();
    const publishedMeta = [...html.matchAll(/<meta\b[^>]*>/gi)].map(match => match[0]).find(tag => /(?:property|name)=["']article:published_time["']/i.test(tag));
    const publishedValue = publishedMeta?.match(/content=["']([^"']+)/i)?.[1];
    const structuredDates = [];
    for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
      try {
        const parsed = JSON.parse(match[1]);
        const nodes = Array.isArray(parsed) ? parsed : parsed['@graph'] || [parsed];
        for (const node of nodes) {
          const types = [].concat(node['@type'] || []);
          if (types.some(type => ['Article', 'BlogPosting', 'MedicalWebPage', 'ScholarlyArticle'].includes(type)) && typeof node.datePublished === 'string') structuredDates.push(node.datePublished.slice(0, 10));
        }
      } catch { /* A captura anterior pode conter JSON-LD inválido; preservar HTML para auditoria. */ }
    }
    row.publishedGit = row.published;
    if (publishedValue || structuredDates.length) row.published = (publishedValue || structuredDates[0]).slice(0, 10);
    row.publicationEvidence = publishedValue ? 'meta article:published_time' : structuredDates.length ? 'JSON-LD de artigo' : 'histórico Git';
    row.beforeFile = `${beforeDir}/${row.route.slice(1,-1).replaceAll('/', '--')}.html`;
    await fs.writeFile(row.beforeFile, html);
  }
}));
await fs.writeFile(`${dir}/baseline.json`, JSON.stringify({date:'2026-10-06',baseCommit,criterion:'Páginas publicadas no núcleo antigo do portal, priorizadas por erro factual e lacuna prática; as datas de modificação incluem mudanças técnicas.',pages:items}, null, 2)+'\n');
console.log(JSON.stringify({pages:items.length,statuses:[...new Set(items.map(i=>i.httpBefore))],published:[...new Set(items.map(i=>i.published))],modified:[...new Set(items.map(i=>i.modified))]}));
