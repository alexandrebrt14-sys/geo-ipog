/**
 * search-analytics.ts — Wrapper de telemetria GA4 para a busca semântica
 * do posgraduacaopsicologia.com (SE-4).
 *
 * Responsabilidades:
 *  1. Empacotar eventos GA4 com prefixo canônico `search_*` e
 *     `event_category = 'search'`.
 *  2. Tolerar ausência de `window.gtag` (SSR, pré-load, bloqueio do GA)
 *     enfileirando eventos numa fila `__searchEventQueue` drenada ao "load".
 *  3. Oferecer debounce para eventos por digitação (search_query) e
 *     attachResultClickTracking para registrar clique antes da navegação.
 *
 * Função pura, sem dependências externas. REGRA #0: textos visíveis em
 * português brasileiro com acentuação completa.
 */

// ---------------------------------------------------------------------------
// Tipos públicos
// ---------------------------------------------------------------------------

export type SearchEvent =
  | 'search_query'
  | 'search_zero_result'
  | 'search_result_click'
  | 'search_filter_applied'
  | 'search_did_you_mean_used'
  | 'search_persona_changed'
  | 'search_facet_cleared'
  | 'search_concept_clicked'
  | 'search_did_you_mean_shown';

export interface SearchEventPayload {
  query?: string;
  query_folded?: string;
  query_length?: number;
  result_count?: number;
  position?: number;
  doc_id?: string;
  doc_kind?: string;
  doc_href?: string;
  filter_kind?: string;
  filter_persona?: string;
  filter_cluster?: string;
  intent?: string;
  source?: 'overlay' | 'page' | 'suggestions';
  suggestion?: string;
}

// ---------------------------------------------------------------------------
// Tipagens internas (não exportadas)
// ---------------------------------------------------------------------------

type GtagFn = (
  cmd: 'event' | 'config' | 'js' | 'set',
  action: string,
  params?: Record<string, unknown>
) => void;

interface QueuedEvent {
  event: SearchEvent;
  payload: SearchEventPayload;
  ts: number;
}

interface QueueHolder {
  __searchEventQueue?: QueuedEvent[];
  __searchEventQueueDrained?: boolean;
  gtag?: GtagFn;
  addEventListener?: Window['addEventListener'];
}

// ---------------------------------------------------------------------------
// Detecção de ambiente
// ---------------------------------------------------------------------------

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function getHolder(): QueueHolder | null {
  if (!isBrowser()) return null;
  return window as unknown as QueueHolder;
}

function getQueue(holder: QueueHolder): QueuedEvent[] {
  if (!holder.__searchEventQueue) {
    holder.__searchEventQueue = [];
  }
  return holder.__searchEventQueue;
}

// ---------------------------------------------------------------------------
// Serialização canônica do payload (GA4 não aceita undefined nem objetos
// aninhados profundos sem custom dimensions; mantemos campos flat).
// ---------------------------------------------------------------------------

function buildLabel(payload: SearchEventPayload): string {
  if (payload.query) return payload.query;
  if (payload.suggestion) return payload.suggestion;
  if (payload.doc_href) return payload.doc_href;
  if (payload.filter_kind) return `kind:${payload.filter_kind}`;
  if (payload.filter_persona) return `persona:${payload.filter_persona}`;
  return '';
}

function buildParams(
  event: SearchEvent,
  payload: SearchEventPayload
): Record<string, unknown> {
  const params: Record<string, unknown> = {
    event_category: 'search',
    event_label: buildLabel(payload),
  };
  // Copia somente chaves definidas
  for (const [k, v] of Object.entries(payload)) {
    if (v === undefined || v === null || v === '') continue;
    params[k] = v;
  }
  // Truncar query_length quando ausente mas query presente
  if (payload.query && params.query_length === undefined) {
    params.query_length = payload.query.length;
  }
  return params;
}

// ---------------------------------------------------------------------------
// Drenagem da fila (chamada no 'load' do window).
// ---------------------------------------------------------------------------

function drainQueue(holder: QueueHolder): void {
  if (holder.__searchEventQueueDrained) return;
  const queue = holder.__searchEventQueue;
  const gtag = holder.gtag;
  if (!gtag || !queue || queue.length === 0) return;
  for (const item of queue) {
    try {
      gtag('event', item.event, buildParams(item.event, item.payload));
    } catch {
      /* swallow — telemetria nunca quebra o app */
    }
  }
  queue.length = 0;
  holder.__searchEventQueueDrained = true;
}

let _loadListenerInstalled = false;

function ensureLoadListener(holder: QueueHolder): void {
  if (_loadListenerInstalled) return;
  if (!holder.addEventListener) return;
  _loadListenerInstalled = true;
  holder.addEventListener.call(holder, 'load', () => {
    drainQueue(holder);
  });
  // Caso o load já tenha ocorrido, agenda um microtask para tentar drenar.
  if (typeof document !== 'undefined' && document.readyState === 'complete') {
    Promise.resolve().then(() => drainQueue(holder));
  }
}

// ---------------------------------------------------------------------------
// API pública
// ---------------------------------------------------------------------------

/**
 * Envia evento GA4 com o prefixo `search_*`. Quando gtag indisponível,
 * enfileira em `window.__searchEventQueue` para drenar ao load.
 *
 * Nunca lança — telemetria silenciosamente falha em ambiente hostil.
 */
export function track(event: SearchEvent, payload: SearchEventPayload = {}): void {
  const holder = getHolder();
  if (!holder) return; // SSR — no-op
  try {
    if (typeof holder.gtag === 'function') {
      holder.gtag('event', event, buildParams(event, payload));
      return;
    }
    // Sem gtag: enfileira
    const queue = getQueue(holder);
    queue.push({ event, payload, ts: Date.now() });
    ensureLoadListener(holder);
  } catch {
    /* swallow */
  }
}

// ---------------------------------------------------------------------------
// Debounce simples por chave de evento.
// ---------------------------------------------------------------------------

const _debounceTimers: Map<string, ReturnType<typeof setTimeout>> = new Map();
const DEFAULT_DEBOUNCE_MS = 300;

/**
 * Versão com debounce. Útil para `search_query` durante digitação:
 * múltiplas chamadas em rajada colapsam em uma única ao final do timeout.
 */
export function trackDebounced(
  event: SearchEvent,
  payload: SearchEventPayload = {},
  ms: number = DEFAULT_DEBOUNCE_MS
): void {
  if (!isBrowser()) return;
  const key = event;
  const existing = _debounceTimers.get(key);
  if (existing) clearTimeout(existing);
  const timer = setTimeout(() => {
    _debounceTimers.delete(key);
    track(event, payload);
  }, Math.max(0, ms));
  _debounceTimers.set(key, timer);
}

// ---------------------------------------------------------------------------
// attachResultClickTracking
// ---------------------------------------------------------------------------

/**
 * Anexa um listener de clique em um elemento âncora para disparar
 * `search_result_click` antes da navegação. Devolve função de cleanup.
 *
 * Implementação:
 *  - Usa capture phase para não perder o evento se outro handler chamar
 *    stopPropagation.
 *  - Em cliques com modificadores (ctrl/cmd/shift/middle) o usuário abre
 *    em nova aba e a página atual permanece; o evento é enviado mesmo
 *    assim, sem sendBeacon (pageview da nova aba também é registrado).
 */
export function attachResultClickTracking(
  el: HTMLElement,
  payload: SearchEventPayload
): () => void {
  if (!isBrowser() || !el || typeof el.addEventListener !== 'function') {
    return () => {
      /* noop */
    };
  }
  const handler = (_ev: Event) => {
    try {
      track('search_result_click', payload);
    } catch {
      /* swallow */
    }
  };
  el.addEventListener('click', handler, { capture: true });
  el.addEventListener('auxclick', handler, { capture: true });
  return () => {
    el.removeEventListener('click', handler, { capture: true } as EventListenerOptions);
    el.removeEventListener('auxclick', handler, { capture: true } as EventListenerOptions);
  };
}
