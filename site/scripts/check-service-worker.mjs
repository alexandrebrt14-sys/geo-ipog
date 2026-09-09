/** Testa o SW real em VM, com Fetch API nativa e Cache API controlada, sem rede. */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('../public/sw.js', import.meta.url), 'utf8');
const ORIGIN = 'https://posgraduacaopsicologia.com';
const PAGES = 'pp-portal-v2-pages';
const ASSETS = 'pp-portal-v2-assets';
const STATIC = 'pp-portal-v2-static';
const HASHED = '/assets/checkout.Abc12345.js';
const cases = [];
const test = (name, run) => cases.push({ name, run });
const tick = () => new Promise((resolve) => setImmediate(resolve));
const html = (body, status = 200, headers = {}) => new Response(body, {
  status, headers: { 'content-type': 'text/html; charset=utf-8', ...headers }
});
const asset = (body, headers = {}, status = 200) => new Response(body, {
  status, headers: { 'content-type': 'application/javascript', ...headers }
});
function request(path, options = {}) {
  return {
    url: new URL(path, ORIGIN).href,
    method: 'GET', mode: 'cors', cache: 'default',
    ...options,
    headers: new Headers(options.headers)
  };
}
const navigate = (path, options = {}) => request(path, { mode: 'navigate', ...options });
function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
function keyOf(value, ignoreSearch = false) {
  const url = new URL(typeof value === 'string' ? value : value.url, ORIGIN);
  url.hash = '';
  if (ignoreSearch) url.search = '';
  return url.href;
}

class CacheStorageMock {
  caches = new Map();
  calls = [];
  failures = {};
  check(method, name) {
    this.calls.push({ method, name });
    const failure = this.failures[method];
    if (failure === true || (typeof failure === 'function' && failure(name))) {
      throw new Error(`Falha simulada: ${method}`);
    }
  }
  bucket(name) {
    if (!this.caches.has(name)) this.caches.set(name, new Map());
    return this.caches.get(name);
  }
  seed(name, url, response) { this.bucket(name).set(keyOf(url), response.clone()); }
  async open(name) {
    this.check('open', name);
    const entries = this.bucket(name);
    return {
      match: async (value, { ignoreSearch = false } = {}) => {
        this.check('match', name);
        for (const [url, response] of entries) {
          if (keyOf(url, ignoreSearch) === keyOf(value, ignoreSearch)) return response.clone();
        }
        return undefined;
      },
      put: async (value, response) => {
        this.check('put', name);
        const stored = response.clone();
        // Cache.put consome o corpo recebido. O chamador mantém sua própria cópia.
        await response.arrayBuffer();
        entries.set(keyOf(value), stored);
      },
      keys: async () => {
        this.check('cacheKeys', name);
        return [...entries.keys()].map((url) => new Request(url));
      },
      delete: async (value) => {
        this.check('cacheDelete', name);
        return entries.delete(keyOf(value));
      }
    };
  }
  async keys() { this.check('storageKeys'); return [...this.caches.keys()]; }
  async delete(name) { this.check('storageDelete', name); return this.caches.delete(name); }
  async body(name, url) { return this.bucket(name).get(keyOf(url))?.clone().text(); }
}

function worker({ fetch: performFetch = async () => { throw new Error('Sem rede'); }, storage = new CacheStorageMock() } = {}) {
  const listeners = new Map();
  const network = [];
  const timers = new Map();
  let timerId = 0;
  const state = { claimed: 0, skipped: 0, cleared: 0 };
  const context = vm.createContext({
    URL, Request, Response, Headers, AbortController,
    caches: storage,
    fetch: (input, options) => {
      network.push({ input, options });
      return performFetch(input, options);
    },
    setTimeout: (fn, ms) => { const id = ++timerId; timers.set(id, { fn, ms }); return id; },
    clearTimeout: (id) => { state.cleared++; timers.delete(id); },
    self: {
      location: { origin: ORIGIN },
      clients: { claim: async () => { state.claimed++; } },
      skipWaiting: async () => { state.skipped++; },
      addEventListener: (name, listener) => listeners.set(name, listener)
    }
  });
  vm.runInContext(source, context, { filename: 'site/public/sw.js' });
  function dispatch(name, payload = {}) {
    const lifetimes = [];
    let active = true;
    let response;
    listeners.get(name)({
      ...payload,
      respondWith: (promise) => {
        assert.equal(active, true, 'respondWith deve ser registrado durante o evento');
        assert.equal(response, undefined, 'respondWith deve ser único');
        response = Promise.resolve(promise);
      },
      waitUntil: (promise) => {
        assert.equal(active, true, 'waitUntil deve ser registrado durante o evento');
        lifetimes.push(Promise.resolve(promise));
      }
    });
    active = false;
    return { response, lifetimes, done: () => Promise.all(lifetimes) };
  }
  return {
    storage, network, timers, state,
    fetch: (req) => dispatch('fetch', { request: req }),
    install: () => dispatch('install'),
    activate: () => dispatch('activate'),
    message: (data) => dispatch('message', { data }),
    timeout: () => { for (const timer of [...timers.values()]) timer.fn(); }
  };
}
async function finish(event) {
  const response = await event.response;
  await event.done();
  return response;
}

// Onda 1: escopo, migração e isolamento entre aplicações da mesma origem.
test('ativação preserva caches alheios e remove somente versões próprias antigas', async () => {
  const sw = worker();
  for (const name of ['pp-v1', 'pp-portal-v1-pages', PAGES, ASSETS, STATIC, 'workbox-next', 'pp-other-app']) {
    sw.storage.seed(name, '/', html(name));
  }
  await sw.activate().done();
  assert.deepEqual([...sw.storage.caches.keys()].sort(), [PAGES, ASSETS, STATIC, 'workbox-next', 'pp-other-app'].sort());
  assert.equal(sw.state.claimed, 1);
});

test('falhas na listagem ou remoção de caches não impedem clients.claim', async () => {
  for (const method of ['storageKeys', 'storageDelete']) {
    const sw = worker();
    sw.storage.seed('pp-v1', '/', html('legado'));
    sw.storage.failures[method] = true;
    await sw.activate().done();
    assert.equal(sw.state.claimed, 1, method);
  }
});

test('POST, terceiros, Range, Authorization e no-store passam pelo fetch nativo', async () => {
  const sw = worker();
  for (const req of [
    request('/formulario/', { method: 'POST' }),
    navigate('https://terceiro.example/pagina/'),
    request(HASHED, { headers: { range: 'bytes=0-5' } }),
    request(HASHED, { headers: { authorization: 'Bearer teste' } }),
    navigate('/', { cache: 'no-store' })
  ]) assert.equal(sw.fetch(req).response, undefined, req.url);
  assert.equal(sw.network.length, 0);
  assert.equal(sw.storage.calls.length, 0);
});

test('payloads RSC e dados mutáveis não entram no SWR', async () => {
  const sw = worker();
  for (const req of [
    request('/ipog/?_rsc=abc'),
    request('/ipog/', { headers: { rsc: '1', accept: 'text/html' } }),
    request('/ipog/', { headers: { 'next-router-prefetch': '1' } }),
    request('/ipog/', { headers: { 'next-router-state-tree': '[]' } }),
    request('/ipog/', { headers: { accept: 'text/x-component' } }),
    request('/ipog/faq/__next.faq.__PAGE__.txt'),
    request('/ipog/areas-de-conhecimento/educacao/__next.areas-de-conhecimento.$d$area.__PAGE__.txt'),
    request('/ipog/faq/index.txt'),
    request('/mcp/courses.json'), request('/api/courses'), request('/llms.txt'),
    request('/sitemap.xml'), request('/sw.js'), request('/scripts/current.js')
  ]) assert.equal(sw.fetch(req).response, undefined, req.url);
  assert.equal(sw.network.length, 0);
  assert.equal(sw.storage.calls.length, 0);
});

test('o worker não lê HTML de caches de outra aplicação', async () => {
  const sw = worker();
  sw.storage.seed('next-runtime', '/ipog/', html('HTML alheio'));
  const response = await finish(sw.fetch(navigate('/ipog/')));
  assert.equal(response.status, 503);
  assert.ok(!(await response.text()).includes('HTML alheio'));
  assert.ok(sw.storage.calls.every((call) => !call.name || call.name.startsWith('pp-portal-')));
});

// Onda 2: HTML sempre tenta a rede antes do fallback offline.
test('HTML online começa na rede e funciona com Cache API indisponível', async () => {
  const sw = worker({ fetch: async () => html('HTML novo') });
  sw.storage.failures.open = true;
  const event = sw.fetch(navigate('/'));
  assert.equal(sw.network.length, 1);
  assert.equal(sw.storage.calls.length, 0, 'nenhum acesso ao cache antes da rede');
  assert.equal(await (await finish(event)).text(), 'HTML novo');
  assert.equal(sw.timers.size, 0);
});

test('404 e 500 da rede preservam corpo e status mesmo com fallback disponível', async () => {
  for (const status of [404, 500]) {
    const sw = worker({ fetch: async () => html(`HTTP ${status}`, status) });
    sw.storage.seed(PAGES, '/', html('home antiga'));
    sw.storage.seed(PAGES, '/offline/', html('offline'));
    const response = await finish(sw.fetch(navigate('/')));
    assert.equal(response.status, status);
    assert.equal(await response.text(), `HTTP ${status}`);
    assert.equal(await sw.storage.body(PAGES, '/'), 'home antiga');
  }
});

test('a home atualiza sua cópia e outras páginas HTML permanecem fora do cache', async () => {
  const sw = worker({ fetch: async () => html('HTML atual') });
  await finish(sw.fetch(navigate('/')));
  await finish(sw.fetch(navigate('/autismo/')));
  await finish(sw.fetch(navigate('/?preview=1')));
  assert.deepEqual([...sw.storage.bucket(PAGES).keys()], [`${ORIGIN}/`]);
  assert.equal(await sw.storage.body(PAGES, '/'), 'HTML atual');
});

test('navegação offline usa home própria, depois página offline e por fim 503', async () => {
  const sw = worker();
  sw.storage.seed(PAGES, '/', html('home salva'));
  sw.storage.seed(PAGES, '/offline/', html('orientação offline'));
  assert.equal(await (await finish(sw.fetch(navigate('/?utm_source=teste')))).text(), 'home salva');
  assert.equal(await (await finish(sw.fetch(navigate('/autismo/')))).text(), 'orientação offline');
  const empty = worker();
  const response = await finish(empty.fetch(navigate('/autismo/')));
  assert.equal(response.status, 503);
  assert.match(response.headers.get('content-type'), /text\/html/);
  assert.equal(response.headers.get('cache-control'), 'no-store');
});

test('falhas de leitura do cache também produzem fallback 503 utilizável', async () => {
  for (const method of ['open', 'match']) {
    const sw = worker();
    sw.storage.failures[method] = true;
    const response = await finish(sw.fetch(navigate('/autismo/')));
    assert.equal(response.status, 503, method);
    assert.match(await response.text(), /Você está offline/);
  }
});

test('prazo de seis segundos encerra navegação mesmo se fetch ignorar abort', async () => {
  const pending = deferred();
  const sw = worker({ fetch: () => pending.promise });
  sw.storage.seed(PAGES, '/offline/', html('offline por prazo'));
  const event = sw.fetch(navigate('/demorada/'));
  assert.deepEqual([...sw.timers.values()].map((timer) => timer.ms), [6000]);
  sw.timeout();
  const response = await finish(event);
  assert.equal(await response.text(), 'offline por prazo');
  assert.equal(sw.network[0].options.signal.aborted, true);
  assert.equal(sw.timers.size, 0);
  pending.reject(new Error('Falha tardia após timeout'));
  await tick();
});

test('rede concluída ou rejeitada limpa o timer de navegação', async () => {
  for (const performFetch of [async () => html('ok'), async () => { throw new Error('offline'); }]) {
    const sw = worker({ fetch: performFetch });
    await finish(sw.fetch(navigate('/')));
    assert.equal(sw.timers.size, 0);
    assert.equal(sw.state.cleared, 1);
  }
});

// Onda 3: recursos imutáveis e revalidação sem consultas duplicadas.
test('recurso com hash usa cache-first e mantém o corpo da resposta consumível', async () => {
  const sw = worker({ fetch: async () => asset('código novo') });
  assert.equal(await (await finish(sw.fetch(request(HASHED)))).text(), 'código novo');
  assert.equal(await (await finish(sw.fetch(request(HASHED)))).text(), 'código novo');
  assert.equal(sw.network.length, 1);
});

test('chunks estáticos Next têm cache separado de seus payloads RSC', async () => {
  const path = '/ipog/_next/static/chunks/123abc.js';
  const sw = worker({ fetch: async () => asset('chunk Next') });
  await finish(sw.fetch(request(path)));
  assert.equal(await (await finish(sw.fetch(request(path)))).text(), 'chunk Next');
  assert.equal(sw.network.length, 1);
  assert.equal(sw.storage.bucket(ASSETS).size, 1);
});

test('SWR devolve cache imediatamente e mantém atualização ligada ao evento', async () => {
  const pending = deferred();
  const sw = worker({ fetch: () => pending.promise });
  sw.storage.seed(STATIC, '/favicon.svg', asset('imagem antiga'));
  const event = sw.fetch(request('/favicon.svg'));
  assert.equal(await (await event.response).text(), 'imagem antiga');
  let settled = false;
  const completed = event.done().then(() => { settled = true; });
  await tick();
  assert.equal(settled, false, 'waitUntil deve aguardar a revalidação');
  pending.resolve(asset('imagem nova'));
  await completed;
  assert.equal(await sw.storage.body(STATIC, '/favicon.svg'), 'imagem nova');
  assert.equal(sw.network.length, 1);
});

test('SWR offline consulta a rede uma vez, com cache e sem cache', async () => {
  const cached = worker();
  cached.storage.seed(STATIC, '/favicon.svg', asset('salvo'));
  assert.equal(await (await finish(cached.fetch(request('/favicon.svg')))).text(), 'salvo');
  assert.equal(cached.network.length, 1);
  const empty = worker();
  const event = empty.fetch(request('/favicon.svg'));
  await assert.rejects(event.response, /Sem rede/);
  await event.done();
  assert.equal(empty.network.length, 1, 'sem fetch de repetição após falha');
});

test('cache indisponível não bloqueia recursos imutáveis ou SWR', async () => {
  for (const path of [HASHED, '/favicon.svg']) {
    const sw = worker({ fetch: async () => asset('resposta disponível') });
    sw.storage.failures.open = true;
    assert.equal(await (await finish(sw.fetch(request(path)))).text(), 'resposta disponível');
    assert.equal(sw.network.length, 1);
  }
});

test('recarga explícita de recursos passa direto, mas HTML continua network-first', async () => {
  const sw = worker({ fetch: async () => html('recarregado') });
  for (const cache of ['reload', 'no-cache']) {
    assert.equal(sw.fetch(request(HASHED, { cache })).response, undefined);
    assert.equal(sw.fetch(request('/favicon.svg', { cache })).response, undefined);
    assert.equal(await (await finish(sw.fetch(navigate('/', { cache })))).text(), 'recarregado');
  }
  assert.equal(sw.network.length, 2);
});

// Onda 4: quota, políticas HTTP e poda com gravações simultâneas.
test('falha de quota não rejeita navegação, recurso com hash ou revalidação', async () => {
  for (const [req, response] of [
    [navigate('/'), html('home')], [request(HASHED), asset('script')], [request('/favicon.svg'), asset('ícone')]
  ]) {
    const sw = worker({ fetch: async () => response });
    sw.storage.failures.put = true;
    assert.equal((await finish(sw.fetch(req))).status, 200);
    assert.equal(sw.storage.calls.filter((call) => call.method === 'put').length, 1);
  }
});

test('no-store, private, no-cache, Vary * e 206 não são persistidos', async () => {
  for (const response of [
    asset('a', { 'cache-control': 'no-store' }),
    asset('a', { 'cache-control': 'private, max-age=60' }),
    asset('a', { 'cache-control': 'no-cache' }),
    asset('a', { vary: 'Accept, *' }),
    asset('a', {}, 206)
  ]) {
    const sw = worker({ fetch: async () => response });
    assert.equal((await finish(sw.fetch(request(HASHED)))).status, response.status);
    assert.equal(sw.storage.calls.filter((call) => call.method === 'put').length, 0);
  }
});

test('HTML de erro, RSC e redirect externo não contaminam o cache de recursos', async () => {
  const external = asset('destino externo');
  Object.defineProperty(external, 'url', { value: 'https://terceiro.example/script.js' });
  for (const response of [html('soft 404'), asset('RSC', { 'content-type': 'text/x-component' }), external]) {
    const sw = worker({ fetch: async () => response });
    await finish(sw.fetch(request(HASHED)));
    assert.equal(sw.storage.calls.filter((call) => call.method === 'put').length, 0);
  }
});

test('limites de 128 e 64 entradas resistem a gravações simultâneas sem tocar páginas', async () => {
  for (const [name, limit, path] of [[ASSETS, 128, HASHED], [STATIC, 64, '/favicon.svg']]) {
    const sw = worker({ fetch: async () => asset('novo') });
    for (let index = 0; index < limit; index++) sw.storage.seed(name, `/antigo-${index}.svg`, asset('antigo'));
    sw.storage.seed(PAGES, '/offline/', html('offline protegido'));
    sw.storage.seed('next-runtime', '/', html('outro cache'));
    const events = [sw.fetch(request(`${path}?a=1`)), sw.fetch(request(`${path}?a=2`))];
    await Promise.all(events.map(finish));
    const entries = sw.storage.bucket(name);
    assert.equal(entries.size, limit);
    assert.ok(!entries.has(`${ORIGIN}/antigo-0.svg`));
    assert.ok(!entries.has(`${ORIGIN}/antigo-1.svg`));
    assert.ok(entries.has(`${ORIGIN}${path}?a=1`));
    assert.ok(entries.has(`${ORIGIN}${path}?a=2`));
    assert.equal(await sw.storage.body(PAGES, '/offline/'), 'offline protegido');
    assert.equal(await sw.storage.body('next-runtime', '/'), 'outro cache');
  }
});

test('falhas de poda são toleradas e a fila volta a gravar após a falha', async () => {
  for (const method of ['put', 'cacheKeys', 'cacheDelete']) {
    const sw = worker({ fetch: async () => asset('novo') });
    for (let index = 0; index < 128; index++) sw.storage.seed(ASSETS, `/antigo-${index}.js`, asset('antigo'));
    sw.storage.failures[method] = true;
    await finish(sw.fetch(request(`${HASHED}?falha`)));
    sw.storage.failures[method] = false;
    await finish(sw.fetch(request(`${HASHED}?recuperado`)));
    assert.equal(await sw.storage.body(ASSETS, `${HASHED}?recuperado`), 'novo');
    assert.ok(sw.storage.bucket(ASSETS).size <= 128);
  }
});

// Onda 5: instalação parcial, prazo de instalação e ativação solicitada pela página.
test('precache grava somente home e offline, e falha por item não cancela instalação', async () => {
  const sw = worker({ fetch: async (path) => {
    if (path === '/') throw new Error('Home temporariamente indisponível');
    return html('offline salvo');
  } });
  await sw.install().done();
  assert.equal(sw.state.skipped, 1);
  assert.deepEqual([...sw.storage.bucket(PAGES).keys()], [`${ORIGIN}/offline/`]);
  assert.deepEqual(sw.network.map((call) => call.input).sort(), ['/', '/offline/']);
  assert.ok(sw.network.every((call) => call.options.cache === 'no-cache'));
});

test('instalação segue com quota indisponível e não aguarda fetch indefinidamente', async () => {
  const quota = worker({ fetch: async () => html('ok') });
  quota.storage.failures.put = true;
  await quota.install().done();
  assert.equal(quota.state.skipped, 1);
  const hanging = worker({ fetch: () => new Promise(() => {}) });
  const event = hanging.install();
  assert.equal(hanging.timers.size, 2);
  hanging.timeout();
  await event.done();
  assert.equal(hanging.state.skipped, 1);
  assert.equal(hanging.timers.size, 0);
});

test('mensagem SKIP_WAITING acompanha a promessa de ativação', async () => {
  const sw = worker();
  const ignored = sw.message('OUTRA_MENSAGEM');
  assert.equal(ignored.lifetimes.length, 0);
  const event = sw.message('SKIP_WAITING');
  assert.equal(event.lifetimes.length, 1);
  await event.done();
  assert.equal(sw.state.skipped, 1);
});

const unhandled = [];
const onUnhandled = (error) => unhandled.push(error);
process.on('unhandledRejection', onUnhandled);
let failed = 0;
for (const { name, run } of cases) {
  try {
    await run();
    await tick();
    assert.deepEqual(unhandled, [], 'nenhuma rejeição assíncrona pode escapar do worker');
    console.log(`OK: ${name}`);
  } catch (error) {
    failed++;
    console.error(`FALHOU: ${name}\n${error.stack}`);
  }
}
process.off('unhandledRejection', onUnhandled);
console.log(`\nService worker: ${cases.length} cenários, ${cases.length - failed} aprovados, ${failed} falhas.`);
console.log('Escopo: execução do sw.js real em VM, sem navegador e sem chamadas externas.');
if (failed) process.exitCode = 1;
