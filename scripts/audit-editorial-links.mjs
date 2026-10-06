
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const auditDir = process.argv[2] || 'audits/revisao-50-20261006';
if (!/^audits\/[a-z0-9-]+$/.test(auditDir)) throw new Error('Diretório de auditoria inválido.');
const dir = path.join(root, auditDir);
const baseline = JSON.parse(fs.readFileSync(path.join(dir, 'baseline.json'), 'utf8'));
const sourceByRoute = new Map(baseline.pages.map(row => [row.route, row.source]));
const reportFile = path.join(dir, 'links-externos.json');
const urls = new Map();
const waves = [];
let pages = 0;
function add(url, wave, route, origin) {
  if (typeof url !== 'string' || !/^https?:\/\//.test(url)) return;
  url = url.replace(/&amp;/g, '&');
  const key = url.split('#')[0];
  if (!urls.has(key)) urls.set(key, {url:key, waves:new Set(), routes:new Set(), origins:new Set()});
  const item = urls.get(key); item.waves.add(wave); item.routes.add(route); item.origins.add(origin);
}
for (let wave = 1; wave <= 5; wave++) {
  const file = path.join(dir, 'onda-' + wave + '.json');
  if (!fs.existsSync(file)) continue;
  let entries;
  try { entries = JSON.parse(fs.readFileSync(file,'utf8').replace(/^\uFEFF/,'')); }
  catch { console.log(JSON.stringify({onda:wave, aviso:'Relato ainda incompleto; verificar na próxima passagem.'})); continue; }
  waves.push(wave); pages += entries.length;
  for (const row of entries) {
    for (const source of row.sources || []) add(typeof source === 'string' ? source : source.url, wave, row.route, 'relato');
    const source = sourceByRoute.get(row.route);
    if (!source) throw new Error('Página sem captura anterior: ' + row.route);
    const sourceFile = path.join(root, 'site', source);
    if (fs.existsSync(sourceFile)) {
      const text = fs.readFileSync(sourceFile,'utf8');
      for (const match of text.matchAll(/href="(https?:\/\/[^"]+)"/g)) add(match[1], wave, row.route, 'link-estatico-da-pagina');
      // Inclui URLs de arrays/frontmatter utilizadas em href dinâmico.
      for (const match of text.matchAll(/https?:\/\/[^"'\x60\s<>]+/g)) {
        const candidate=match[0];
        if (/^https?:\/\/(?:schema\.org\/?$|brasilgeo\.ai\/#organization$|posgraduacaopsicologia\.com(?:\/|$))/.test(candidate)) continue;
        add(candidate, wave, row.route, 'url-literal-da-pagina');
      }
    }
  }
}
let old = new Map();
if (fs.existsSync(reportFile)) {
  try { old = new Map(JSON.parse(fs.readFileSync(reportFile,'utf8')).results.map(r=>[r.url,r])); } catch {}
}
function priority(item) { return /alexandrecaramaschi\.com|larissacaramaschi\.com/.test(item.url) ? 0 : 1; }
const items = [...urls.values()].sort((a,b)=>priority(a)-priority(b)||a.url.localeCompare(b.url));
const results = [];
let next=0, fetched=0;
function clean(t) { return t?.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim().slice(0,240) || null; }
async function inspect(item) {
  const meta = {url:item.url,waves:[...item.waves],routes:[...item.routes],origins:[...item.origins]};
  if(old.has(item.url)) return {...old.get(item.url),...meta};
  fetched++;
  const started = Date.now();
  try {
    const response = await fetch(item.url, {method:'GET',redirect:'follow',signal:AbortSignal.timeout(15000),headers:{'User-Agent':'Editorial-Link-Audit/1.0','Accept':'text/html,application/pdf,application/json;q=0.9,*/*;q=0.8'}});
    const type = response.headers.get('content-type') || '';
    let text = '';
    if (/text\/html|text\/plain|application\/json/i.test(type)) {
      const reader = response.body?.getReader();
      if(reader) {
        const decoder = new TextDecoder(); let size=0;
        try {
          while (size < 262144) { const chunk=await reader.read(); if(chunk.done) break; size+=chunk.value.byteLength; text+=decoder.decode(chunk.value,{stream:true}); }
        } finally { await reader.cancel().catch(()=>{}); }
      }
    } else { await response.body?.cancel().catch(()=>{}); }
    const status=response.status;
    let classification = status >= 200 && status < 300 ? 'acessivel' : [403,429].includes(status) ? 'restricao-de-acesso' : [404,410].includes(status) ? 'possivelmente-quebrado' : 'pendente-de-confirmacao';
    const title=clean(text.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]);
    const h1=clean(text.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]);
    if (classification === 'acessivel' && /just a moment|access denied|checking your browser|verifique se voc[eê] [eé] humano|captcha|attention required/i.test(title || '')) classification='restricao-de-acesso';
    if (classification === 'acessivel' && /^(404|p[aá]gina n[aã]o encontrada|page not found|not found)/i.test(h1||'')) classification='possivelmente-quebrado';
    return {...meta,checkedAt:new Date().toISOString(),method:'GET',status,finalUrl:response.url,redirected:response.redirected,contentType:type,title,h1,classification,elapsedMs:Date.now()-started};
  } catch(e) {
    return {...meta,checkedAt:new Date().toISOString(),method:'GET',status:null,finalUrl:null,classification:'erro-de-transporte',error:e.name+': '+e.message,cause:e.cause?.code||null,elapsedMs:Date.now()-started};
  }
}
async function worker() {
  while (next < items.length) {
    const item=items[next++]; const result=await inspect(item); results.push(result);
    console.log(JSON.stringify({url:result.url,status:result.status,classification:result.classification,title:result.title,reused:old.has(item.url)}));
  }
}
await Promise.all(Array.from({length:4},worker));
results.sort((a,b)=>priority(a)-priority(b)||a.url.localeCompare(b.url));
const counts = {};
for (const row of results) counts[row.classification]=(counts[row.classification]||0)+1;
const report = {checkedAt:new Date().toISOString(),scopeWaves:waves,pageCount:pages,uniqueUrls:results.length,method:{http:'GET',maximumConcurrency:4,timeoutMs:15000,tls:'Node --use-system-ca',reusedPreviouslyChecked:results.length-fetched, auditDir},summary:counts,results};
report.verificationSummary = {directlyAccessible:results.filter(r=>r.classification==='acessivel').length,documentIdentifiedDespiteAccessLimits:results.filter(r=>r.classification!=='acessivel'&&r.verification).length,confirmedBroken:results.filter(r=>r.classification==='link-quebrado-confirmado').length,unresolved:results.filter(r=>r.classification!=='acessivel'&&!r.verification).length};
report.priorityCrosslinks = results.filter(r=>/alexandrecaramaschi\.com|larissacaramaschi\.com/.test(r.url)).map(r=>({url:r.url,status:r.status,title:r.title,h1:r.h1,classification:r.classification}));
report.pendingWaves = [1,2,3,4,5].filter(w=>!waves.includes(w));
report.pendingLinks = results.filter(r=>r.classification!=='acessivel'&&!r.verification).map(r=>r.url);
fs.writeFileSync(reportFile, JSON.stringify(report,null,2)+'\n','utf8');
console.log(JSON.stringify({relatorio:reportFile,ondas:waves,paginas:pages,urls:results.length,novosGets:fetched,resumo:counts}));

