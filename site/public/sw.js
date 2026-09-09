/*
 * Service worker do posgraduacaopsicologia.com.
 * HTML usa a rede primeiro, com fallback offline após falha ou seis segundos.
 * Somente recursos estáticos entram no cache; dados e payloads Next passam direto.
 * Os caches são exclusivos deste worker e têm limite de entradas por categoria.
 */

const CACHE_PREFIX = 'pp-portal-';
const CACHE_VERSION = 'v2';
const PAGE_CACHE = `${CACHE_PREFIX}${CACHE_VERSION}-pages`;
const ASSET_CACHE = `${CACHE_PREFIX}${CACHE_VERSION}-assets`;
const STATIC_CACHE = `${CACHE_PREFIX}${CACHE_VERSION}-static`;
const CURRENT_CACHES = new Set([PAGE_CACHE, ASSET_CACHE, STATIC_CACHE]);
const PRECACHE_URLS = ['/offline/', '/'];
const CACHE_LIMITS = { [PAGE_CACHE]: 2, [ASSET_CACHE]: 128, [STATIC_CACHE]: 64 };
const NAVIGATION_TIMEOUT_MS = 6000;
const writes = new Map();

async function readCache(name, request, options) {
  try {
    return await (await caches.open(name)).match(request, options);
  } catch {
    return undefined;
  }
}

function canStore(request, response, html = false) {
  if (!response || response.status !== 200 || response.type === 'opaque') return false;
  if (typeof request !== 'string' && request.cache === 'no-store') return false;
  if (/\b(no-store|no-cache|private)\b/i.test(response.headers.get('cache-control') || '')) return false;
  if ((response.headers.get('vary') || '').split(',').some((value) => value.trim() === '*')) return false;
  if (!html && /text\/html|text\/x-component/i.test(response.headers.get('content-type') || '')) return false;
  if (response.url && new URL(response.url).origin !== self.location.origin) return false;
  return true;
}

// Escritas em sequência tornam a poda previsível mesmo com downloads simultâneos.
// Erros de quota ou indisponibilidade do Cache API não impedem a resposta da rede.
async function writeCache(name, request, response, html = false) {
  try {
    if (!canStore(request, response, html)) return;
    const copy = response.clone();
    const pending = (writes.get(name) || Promise.resolve()).then(async () => {
      const cache = await caches.open(name);
      await cache.put(request, copy);
      const keys = await cache.keys();
      for (const key of keys.slice(0, Math.max(0, keys.length - CACHE_LIMITS[name]))) {
        await cache.delete(key);
      }
    }).catch(() => {});
    writes.set(name, pending);
    await pending;
  } catch { /* O cache é opcional. */ }
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    await Promise.all(PRECACHE_URLS.map(async (url) => {
      try {
        const response = await fetchWithTimeout(url, { cache: 'no-cache' });
        await writeCache(PAGE_CACHE, url, response, true);
      } catch { /* Cada item indisponível é independente. */ }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.filter((name) =>
        name === 'pp-v1' || (name.startsWith(CACHE_PREFIX) && !CURRENT_CACHES.has(name))
      ).map(async (name) => {
        try { await caches.delete(name); } catch { /* Tenta os demais caches próprios. */ }
      }));
    } catch { /* A ativação continua quando o armazenamento está indisponível. */ }
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') event.waitUntil(self.skipWaiting());
});

function isHtmlRequest(request) {
  return request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html');
}

function isNextData(request, url) {
  return request.headers.has('rsc') || request.headers.has('next-router-prefetch') ||
    request.headers.has('next-router-state-tree') || url.searchParams.has('_rsc') ||
    (request.headers.get('accept') || '').includes('text/x-component') ||
    /(?:^|\/)__next[./]/.test(url.pathname);
}

async function fetchWithTimeout(request, options = {}) {
  const controller = new AbortController();
  let timer;
  const deadline = new Promise((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error('Tempo de navegação esgotado.'));
      controller.abort();
    }, NAVIGATION_TIMEOUT_MS);
  });
  try {
    // A corrida também limita implementações de fetch que demoram a abortar.
    return await Promise.race([fetch(request, { ...options, signal: controller.signal }), deadline]);
  } finally {
    clearTimeout(timer);
  }
}

async function handleNavigate(request, background) {
  try {
    const response = await fetchWithTimeout(request);
    const url = new URL(request.url);
    if (url.pathname === '/' && !url.search) {
      background.push(writeCache(PAGE_CACHE, '/', response, true));
    }
    // Respostas HTTP, inclusive 404 e 500, mantêm seu status e conteúdo.
    return response;
  } catch {
    const cached = await readCache(PAGE_CACHE, request, { ignoreSearch: true });
    if (cached) return cached;
    const offline = await readCache(PAGE_CACHE, '/offline/');
    if (offline) return offline;
    return new Response(
      '<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Offline</title><main><h1>Você está offline.</h1><p>Verifique sua conexão e tente novamente.</p></main></html>',
      { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } }
    );
  }
}

async function handleHashedAsset(request, background) {
  const cached = await readCache(ASSET_CACHE, request);
  if (cached) return cached;
  const response = await fetch(request);
  background.push(writeCache(ASSET_CACHE, request, response));
  return response;
}

async function handleStaticSwr(request, background) {
  const cached = await readCache(STATIC_CACHE, request);
  const network = fetch(request);
  // Uma única consulta à rede, mantida viva pelo waitUntil, inclusive com cache hit.
  background.push(network.then(
    (response) => writeCache(STATIC_CACHE, request, response),
    () => undefined
  ));
  return cached || network;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  let url;
  try { url = new URL(request.url); } catch { return; }
  if (url.origin !== self.location.origin || request.headers.has('range') ||
      request.headers.has('authorization') || request.cache === 'no-store' || isNextData(request, url)) return;

  let handler;
  if (isHtmlRequest(request)) {
    handler = handleNavigate;
  } else {
    // A recarga explícita também deve renovar recursos de URL estável.
    if (request.cache === 'reload' || request.cache === 'no-cache') return;
    const immutable = /^\/assets\/.+\.[\w-]{8,}\.(?:js|css|woff2?|png|jpe?g|webp|avif|svg)$/i.test(url.pathname) ||
      /^\/ipog\/_next\/static\//.test(url.pathname);
    const staticFile = /\.(?:png|jpe?g|gif|webp|avif|svg|ico|woff2?|webmanifest)$/i.test(url.pathname);
    if (immutable) handler = handleHashedAsset;
    else if (staticFile) handler = handleStaticSwr;
    else return;
  }

  const background = [];
  const response = handler(request, background);
  event.respondWith(response);
  // Registrar durante o evento evita que o worker encerre a revalidação cedo.
  const finish = () => Promise.all(background);
  event.waitUntil(response.then(finish, finish));
});
