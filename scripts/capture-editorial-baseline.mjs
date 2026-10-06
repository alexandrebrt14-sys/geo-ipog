import fs from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const dir = 'audits/revisao-50-20261006';
const waves = JSON.parse(await fs.readFile(`${dir}/selecionadas.json`, 'utf8'));
const dates = JSON.parse(await fs.readFile('site/src/generated/lastmod.json', 'utf8')).routes;
const baseCommit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const items = waves.flatMap(w => w.routes.map(route => ({ wave: w.wave, route, ...dates[route] })));
await fs.mkdir('tmp/editorial-before', { recursive: true });
let cursor = 0;
await Promise.all(Array.from({length: 4}, async () => {
  while (cursor < items.length) {
    const row = items[cursor++];
    const response = await fetch(`https://posgraduacaopsicologia.com${row.route}`, {signal: AbortSignal.timeout(30000)});
    row.httpBefore = response.status;
    const html = await response.text();
    row.beforeFile = `tmp/editorial-before/${row.route.slice(1,-1).replaceAll('/', '--')}.html`;
    await fs.writeFile(row.beforeFile, html);
  }
}));
await fs.writeFile(`${dir}/baseline.json`, JSON.stringify({date:'2026-10-06',baseCommit,criterion:'Páginas publicadas no núcleo antigo do portal, priorizadas por erro factual e lacuna prática; as datas de modificação incluem mudanças técnicas.',pages:items}, null, 2)+'\n');
console.log(JSON.stringify({pages:items.length,statuses:[...new Set(items.map(i=>i.httpBefore))],published:[...new Set(items.map(i=>i.published))],modified:[...new Set(items.map(i=>i.modified))]}));
