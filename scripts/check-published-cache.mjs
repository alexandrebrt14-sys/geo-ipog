#!/usr/bin/env node
/** Contrato pós-deploy: GET normal, sem cache-buster, cookies ou dependências externas.
 * Node 22+. Uso: node scripts/check-published-cache.mjs [--base URL] [--json]
 * Fixtures sem rede: node scripts/check-published-cache.mjs --self-test
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { setTimeout as sleep } from 'node:timers/promises';

const DEFAULT_BASE = 'https://posgraduacaopsicologia.com/';
const ONE_YEAR = 31536000;
const repoRoot = fileURLToPath(new URL('../', import.meta.url));
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const normalizedWorker = bytes => new TextDecoder('utf-8', { fatal: true }).decode(bytes).replace(/\r\n/g, '\n');

export function loadExpected(root = repoRoot) {
  const fontsRoot = path.join(root, 'site/public/fonts');
  const manifest = JSON.parse(fs.readFileSync(path.join(fontsRoot, 'manifest.json'), 'utf8'));
  const font = manifest.find(item => item.subset === 'latin');
  assert(font && /^[a-z0-9-]+\.woff2$/i.test(font.file), 'Manifesto sem uma fonte latin local válida.');
  const bytes = fs.readFileSync(path.join(fontsRoot, font.file));
  assert.equal(sha256(bytes), font.sha256, 'Hash da fonte local diverge do manifesto.');
  return {
    worker: fs.readFileSync(path.join(root, 'site/public/sw.js')),
    font: { pathname: '/fonts/' + font.file, bytes, sha256: font.sha256 },
  };
}

function directives(header) {
  return (header || '').split(',').map(part => {
    const separator = part.indexOf('=');
    return {
      name: (separator < 0 ? part : part.slice(0, separator)).trim().toLowerCase(),
      value: separator < 0 ? null : part.slice(separator + 1).trim().replace(/^"(.*)"$/, '$1'),
    };
  }).filter(item => item.name);
}

export function validateWorker(response, bytes, expected) {
  const type = (response.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
  assert(['application/javascript', 'text/javascript', 'application/ecmascript', 'text/ecmascript', 'application/x-javascript'].includes(type), `Content-Type do SW não é JavaScript: ${type || '(ausente)'}.`);
  const header = response.headers.get('cache-control') || '';
  const policy = directives(header);
  assert(policy.some(item => item.name === 'no-store' && item.value === null), `Cache-Control do SW precisa conter no-store: ${header || '(ausente)'}.`);
  assert(!policy.some(item => item.name === 'public'), `Cache-Control do SW não pode conter public: ${header}.`);
  for (const item of policy.filter(item => ['max-age', 's-maxage'].includes(item.name))) {
    assert(item.value !== null && /^\d+$/.test(item.value) && Number(item.value) === 0, `Cache-Control do SW não pode armazenar por ${item.name}=${item.value}: ${header}.`);
  }
  assert.equal(normalizedWorker(bytes), normalizedWorker(expected), 'Corpo do SW publicado diverge de site/public/sw.js (normalização limitada a CRLF).');
  return { cacheControl: header, contentType: type, bytes: bytes.length, normalizedSha256: sha256(Buffer.from(normalizedWorker(bytes))) };
}

export function validateFont(response, bytes, expected) {
  const header = response.headers.get('cache-control') || '';
  const policy = directives(header);
  assert(policy.some(item => item.name === 'immutable' && item.value === null), `Cache-Control da fonte precisa conter immutable: ${header || '(ausente)'}.`);
  const ages = policy.filter(item => item.name === 'max-age');
  assert(ages.length > 0 && ages.every(item => /^\d+$/.test(item.value || '') && Number(item.value) >= ONE_YEAR), `Cache-Control da fonte precisa ter max-age de pelo menos ${ONE_YEAR}, sem valor conflitante: ${header}.`);
  assert(!policy.some(item => ['no-store', 'no-cache', 'private'].includes(item.name)), `Cache-Control da fonte contradiz o armazenamento imutável: ${header}.`);
  const hash = sha256(bytes);
  assert.equal(hash, expected.sha256, 'SHA-256 da fonte publicada diverge do manifesto local.');
  assert(bytes.equals(expected.bytes), 'Bytes da fonte publicada divergem do arquivo local.');
  return { cacheControl: header, bytes: bytes.length, sha256: hash };
}

async function withDeadline(run, timeoutMs) {
  const controller = new AbortController();
  let timer;
  try {
    return await Promise.race([
      Promise.resolve().then(() => run(controller.signal)),
      new Promise((_, reject) => {
        timer = setTimeout(() => {
          controller.abort();
          reject(new Error(`Timeout de ${timeoutMs} ms no GET ou na leitura do corpo.`));
        }, timeoutMs);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

export async function checkPublishedCache({
  baseUrl = DEFAULT_BASE, expected = loadExpected(), fetchImpl = globalThis.fetch,
  timeoutMs = 10000, attempts = 3, retryDelayMs = 2000, delay = sleep,
  log = message => console.error(message),
} = {}) {
  assert(Number.isInteger(attempts) && attempts >= 1 && attempts <= 3, 'O gate admite de uma a três tentativas.');
  assert(timeoutMs > 0 && timeoutMs <= 10000, 'O timeout máximo é de 10.000 ms.');
  const base = new URL(baseUrl);
  assert(['http:', 'https:'].includes(base.protocol) && !base.username && !base.password, 'A base precisa ser uma URL HTTP(S) sem credenciais.');
  const contracts = [
    { pathname: '/sw.js', validate: (response, bytes) => validateWorker(response, bytes, expected.worker) },
    { pathname: expected.font.pathname, validate: (response, bytes) => validateFont(response, bytes, expected.font) },
  ];
  const inspect = async contract => {
    const url = new URL(contract.pathname, base.origin).href;
    let lastError;
    for (let attempt = 1; attempt <= attempts; attempt++) {
      try {
        const details = await withDeadline(async signal => {
          const response = await fetchImpl(url, { method: 'GET', redirect: 'error', signal });
          if (response.status !== 200) {
            await response.body?.cancel();
            throw new Error(`HTTP ${response.status}; esperado 200.`);
          }
          const bytes = Buffer.from(await response.arrayBuffer());
          return contract.validate(response, bytes);
        }, timeoutMs);
        return { url, attempts: attempt, status: 200, ...details };
      } catch (error) {
        lastError = error instanceof Error
          ? error.message + (error.cause?.code ? ` [${error.cause.code}]` : '')
          : String(error);
        log(`Tentativa ${attempt}/${attempts} ${url}: ${lastError}`);
        if (attempt < attempts) await delay(retryDelayMs);
      }
    }
    throw new Error(`${url}: contrato reprovado após ${attempts} tentativa(s). ${lastError}`);
  };
  // Recursos independentes; ambos precisam cumprir o contrato para liberar o gate.
  const results = await Promise.allSettled(contracts.map(inspect));
  const failures = results.filter(result => result.status === 'rejected').map(result => result.reason.message);
  if (failures.length) throw new Error(failures.join('\n'));
  return { baseUrl: base.origin, passed: results.length, resources: results.map(result => result.value) };
}

async function selfTest() {
  const worker = Buffer.from('const VERSION = "fixture";\n');
  const bytes = Buffer.from('wOF2-fixture-binaria\0\xff', 'latin1');
  const expected = { worker, font: { pathname: '/fonts/fixture-latin.woff2', bytes, sha256: sha256(bytes) } };
  const checks = [];
  const workerHeaders = { 'content-type': 'text/javascript; charset=utf-8', 'cache-control': 'no-store, max-age=0' };
  const fontHeaders = { 'cache-control': `public, max-age=${ONE_YEAR}, immutable` };
  function adapter({ workerBody = worker, swHeaders = workerHeaders, fontBody = bytes, headers = fontHeaders, status = 200 } = {}) {
    return async (url, options) => {
      assert.equal(options.method, 'GET');
      assert.equal(new URL(url).search, '', 'O contrato deve requisitar a URL normal, sem cache-buster.');
      assert.equal(options.headers, undefined, 'Não contornar a política publicada com headers especiais.');
      const sw = new URL(url).pathname === '/sw.js';
      return new Response(sw ? workerBody : fontBody, { status: sw ? status : 200, headers: sw ? swHeaders : headers });
    };
  }
  const run = options => checkPublishedCache({ expected, attempts: 1, log: () => {}, ...options });
  const badWorker = async (headers, pattern) => assert.rejects(run({ fetchImpl: adapter({ swHeaders: { ...workerHeaders, ...headers } }) }), pattern);
  await run({ fetchImpl: adapter({ workerBody: 'const VERSION = "fixture";\r\n' }) });
  checks.push('GET normal aprova bytes equivalentes, normalizando somente CRLF no SW.');
  await badWorker({ 'cache-control': 'public, max-age=14400' }, /no-store/);
  await badWorker({ 'cache-control': 'no-store, public, max-age=0' }, /public/);
  checks.push('Política atual regressiva e public com no-store são rejeitados.');
  for (const directive of ['max-age=300', 's-maxage=3600', 'max-age=0, max-age=300', 'max-age=invalido']) {
    await badWorker({ 'cache-control': 'no-store, ' + directive }, /não pode armazenar/);
  }
  await run({ fetchImpl: adapter({ swHeaders: { ...workerHeaders, 'cache-control': 'NO-STORE, max-age="0", s-maxage=0' } }) });
  checks.push('Max-age e s-maxage positivos, duplicados ou inválidos falham; zero é aceito.');
  await badWorker({ 'content-type': 'text/html' }, /não é JavaScript/);
  await assert.rejects(run({ fetchImpl: adapter({ status: 404 }) }), /HTTP 404/);
  checks.push('Status e tipo de conteúdo do SW são verificados.');
  await assert.rejects(run({ fetchImpl: adapter({ workerBody: worker.toString() + ' ' }) }), /Corpo do SW/);
  checks.push('Mudança de conteúdo ou espaço extra do SW não é normalizada.');
  for (const header of ['public, max-age=31536000', 'public, max-age=300, immutable', 'max-age=300, max-age=31536000, immutable', 'no-store, max-age=31536000, immutable']) {
    await assert.rejects(run({ fetchImpl: adapter({ headers: { 'cache-control': header } }) }), /fonte/);
  }
  checks.push('Fonte exige immutable, prazo mínimo e ausência de políticas conflitantes.');
  await assert.rejects(run({ fetchImpl: adapter({ fontBody: Buffer.from('alterado') }) }), /SHA-256/);
  checks.push('Fonte publicada precisa preservar hash e bytes locais.');
  let swCalls = 0;
  const baseline = adapter();
  const report = await checkPublishedCache({ expected, attempts: 3, delay: async () => {}, log: () => {}, fetchImpl: async (url, options) => {
    if (new URL(url).pathname === '/sw.js' && ++swCalls < 3) return new Response(worker, { headers: { ...workerHeaders, 'cache-control': 'public, max-age=300' } });
    return baseline(url, options);
  } });
  assert.equal(report.resources[0].attempts, 3);
  checks.push('Propagação eventual aprova somente quando o contrato passa, até três tentativas.');
  let retries = 0;
  await assert.rejects(checkPublishedCache({ expected, delay: async () => {}, log: () => {}, fetchImpl: async (url, options) => {
    if (new URL(url).pathname === '/sw.js') retries++;
    return adapter({ swHeaders: { ...workerHeaders, 'cache-control': 'public, max-age=300' } })(url, options);
  } }), /após 3 tentativa/);
  assert.equal(retries, 3);
  checks.push('Falha persistente encerra após três tentativas.');
  await assert.rejects(run({ timeoutMs: 5, fetchImpl: () => new Promise(() => {}) }), /Timeout/);
  await assert.rejects(run({ timeoutMs: 5, fetchImpl: async () => ({ status: 200, arrayBuffer: () => new Promise(() => {}) }) }), /Timeout/);
  checks.push('O prazo cobre conexão e corpo mesmo se o adapter ignorar abort.');
  return { passed: checks.length, checks };
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  try {
    const args = process.argv.slice(2);
    let baseUrl = DEFAULT_BASE;
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '--base') {
        assert(args[i + 1] && !args[i + 1].startsWith('--'), '--base exige uma URL.');
        baseUrl = args[++i];
      } else assert(['--json', '--self-test'].includes(args[i]), `Argumento desconhecido: ${args[i]}`);
    }
    const report = args.includes('--self-test') ? await selfTest() : await checkPublishedCache({ baseUrl });
    if (args.includes('--json')) console.log(JSON.stringify(report, null, 2));
    else if (report.checks) console.log(`${report.passed} fixtures do contrato HTTP aprovadas.\n` + report.checks.join('\n'));
    else {
      for (const resource of report.resources) console.log(`OK: ${resource.url} | ${resource.cacheControl} | ${resource.bytes} bytes`);
      console.log('Contrato HTTP publicado aprovado: service worker e fonte crítica.');
    }
  } catch (error) {
    console.error(`Falha no gate de cache publicado: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}
