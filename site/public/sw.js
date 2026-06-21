/*
 * Service worker do posgraduacaopsicologia.com — Onda 34 (PWA).
 *
 * Filosofia: CONSERVADORA. Um service worker mal feito "prende" visitantes
 * recorrentes numa versao antiga do site. Por isso:
 *  - Navegacoes (HTML) sao NETWORK-FIRST: sempre tentamos a rede primeiro e so
 *    caimos no cache (pagina offline) quando a rede falha. Nunca servimos HTML
 *    velho de forma agressiva.
 *  - O cache e versionado. No activate apagamos TODOS os caches que nao sejam a
 *    versao atual, garantindo limpeza a cada release.
 *  - skipWaiting + clients.claim para o novo SW assumir rapido e sem loop.
 *  - So interceptamos GET de MESMA ORIGEM. Terceiros (Google Fonts, Analytics,
 *    Tag Manager) passam direto pelo fetch normal e nunca sao cacheados.
 *
 * trailingSlash: 'always' => a pagina offline e servida em "/offline/".
 */

const CACHE = 'pp-v1';

// Precache minimo: a pagina offline (fallback de navegacao) e a home.
// Nao tentamos precachear as 332 paginas — isso seria fragil e pesado.
const PRECACHE_URLS = ['/offline/', '/'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE);
        // addAll falha por inteiro se um item falhar; usamos best-effort por item
        // para que a falha de um recurso nao impeca a instalacao do SW.
        await Promise.all(
          PRECACHE_URLS.map(async (url) => {
            try {
              const res = await fetch(url, { cache: 'no-cache' });
              if (res && res.ok) await cache.put(url, res.clone());
            } catch (e) { /* ignora item indisponivel */ }
          })
        );
      } catch (e) { /* ignora falha de precache; SW continua valido */ }
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Limpeza: remove qualquer cache que nao seja a versao corrente.
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

// Permite que a pagina peca ativacao imediata de uma nova versao, se desejar.
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

function isHtmlRequest(request) {
  if (request.mode === 'navigate') return true;
  const accept = request.headers.get('accept') || '';
  return accept.includes('text/html');
}

// Navegacao: network-first com timeout. Em falha, serve a pagina offline.
async function handleNavigate(request) {
  const cache = await caches.open(CACHE);
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    let res;
    try {
      res = await fetch(request, { signal: controller.signal });
    } finally {
      clearTimeout(timer);
    }
    // Atualiza o cache da home para servir como fallback amigavel quando util.
    if (res && res.ok && request.method === 'GET') {
      try {
        const url = new URL(request.url);
        if (url.pathname === '/') cache.put('/', res.clone());
      } catch (e) { /* ignora */ }
    }
    return res;
  } catch (e) {
    // Sem rede: tenta a propria pagina em cache, depois a pagina offline.
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    const offline = await cache.match('/offline/');
    if (offline) return offline;
    return new Response(
      '<!doctype html><meta charset="utf-8"><title>Offline</title><p>Você está offline.</p>',
      { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }
}

// Assets com hash (/assets/...): imutaveis pelo hash => cache-first.
async function handleHashedAsset(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const res = await fetch(request);
  if (res && res.ok) cache.put(request, res.clone());
  return res;
}

// Demais GET estaticos de mesma origem (favicons, manifest, imagens):
// stale-while-revalidate.
async function handleStaticSwr(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((res) => {
      if (res && res.ok) cache.put(request, res.clone());
      return res;
    })
    .catch(() => null);
  return cached || (await network) || fetch(request);
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // So GET.
  if (request.method !== 'GET') return;

  let url;
  try {
    url = new URL(request.url);
  } catch (e) {
    return;
  }

  // So mesma origem. Terceiros (fonts, GA, GTM) passam direto.
  if (url.origin !== self.location.origin) return;

  if (isHtmlRequest(request)) {
    event.respondWith(handleNavigate(request));
    return;
  }

  if (url.pathname.includes('/assets/')) {
    event.respondWith(handleHashedAsset(request));
    return;
  }

  event.respondWith(handleStaticSwr(request));
});
