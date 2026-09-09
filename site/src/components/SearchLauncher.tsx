import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react';
import type { SearchOverlayProps } from './SearchOverlay';

interface SearchRequest {
  id: number;
  query: string;
  trigger: HTMLElement | null;
}

type OverlayModule = { default: ComponentType<SearchOverlayProps> };

/** Uma importação compartilhada; cancelamento invalida somente a ativação. */
export function createSearchLoader<T, R>(options: {
  load: () => Promise<T>;
  onStart: (request: R) => void;
  onReady: (module: T, request: R) => void;
  onError: (error: unknown, request: R) => void;
}) {
  let pending: Promise<T> | null = null;
  let loaded: T | undefined;
  let hasLoaded = false;
  let generation = 0;
  let active = false;

  return {
    request(request: R) {
      if (active) return false;
      active = true;
      const ticket = ++generation;
      options.onStart(request);
      if (!pending) {
        pending = hasLoaded ? Promise.resolve(loaded as T) : Promise.resolve().then(options.load).then(module => {
          loaded = module;
          hasLoaded = true;
          return module;
        });
        const current = pending;
        void current.finally(() => { if (pending === current) pending = null; }).catch(() => {});
      }
      void pending.then(module => {
        if (!active || ticket !== generation) return;
        active = false;
        options.onReady(module, request);
      }, error => {
        if (!active || ticket !== generation) return;
        active = false;
        options.onError(error, request);
      });
      return true;
    },
    cancel() {
      active = false;
      generation++;
    },
  };
}

export function isPlainSearchClick(event: Pick<MouseEvent, 'button' | 'ctrlKey' | 'metaKey' | 'altKey' | 'shiftKey' | 'defaultPrevented'>) {
  return !event.defaultPrevented && event.button === 0 && !event.ctrlKey && !event.metaKey && !event.altKey && !event.shiftKey;
}

export function isSearchShortcut(event: Pick<KeyboardEvent, 'key' | 'ctrlKey' | 'metaKey' | 'altKey' | 'defaultPrevented' | 'isComposing'>, editing: boolean) {
  if (event.defaultPrevented || event.isComposing || event.altKey) return false;
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') return true;
  return event.key === '/' && !editing && !event.ctrlKey && !event.metaKey;
}

function currentQuery() {
  return new URL(window.location.href).searchParams.get('q') || document.body.dataset.searchPrefill || '';
}

function anotherDialogOpen() {
  return Array.from(document.querySelectorAll<HTMLElement>('[aria-modal="true"]')).some(element =>
    !element.hasAttribute('data-search-overlay') && element.getClientRects().length > 0 && element.getAttribute('aria-hidden') !== 'true'
  );
}

export default function SearchLauncher() {
  const [Component, setComponent] = useState<ComponentType<SearchOverlayProps> | null>(null);
  const [request, setRequest] = useState<SearchRequest | null>(null);
  const [phase, setPhase] = useState<'idle' | 'loading' | 'error'>('idle');
  const [query, setQuery] = useState('');
  const draft = useRef('');
  const lastTrigger = useRef<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const statusVisible = useRef(false);
  const overlayOpen = useRef(false);
  const onOpenChange = useCallback((open: boolean) => { overlayOpen.current = open; }, []);
  const cancelRef = useRef<() => void>(() => {});

  useEffect(() => {
    let mounted = true;
    let sequence = 0;
    const loader = createSearchLoader<OverlayModule, SearchRequest>({
      load: () => import('./SearchOverlay').then(module => {
        if (typeof module.default !== 'function') throw new Error('Módulo de busca indisponível.');
        return module;
      }),
      onStart: next => {
        statusVisible.current = true;
        draft.current = next.query;
        lastTrigger.current = next.trigger;
        setQuery(next.query);
        setPhase('loading');
      },
      onReady: (module, next) => {
        if (!mounted) return;
        if (anotherDialogOpen()) {
          statusVisible.current = false;
          setPhase('idle');
          return;
        }
        statusVisible.current = false;
        overlayOpen.current = true;
        setComponent(() => module.default);
        setRequest({ ...next, query: draft.current });
        setPhase('idle');
      },
      onError: () => { if (mounted) setPhase('error'); },
    });
    const cancel = (restoreFocus = false) => {
      loader.cancel();
      statusVisible.current = false;
      setPhase('idle');
      if (restoreFocus && lastTrigger.current?.isConnected) lastTrigger.current.focus({ preventScroll: true });
    };
    cancelRef.current = () => cancel(true);
    const activate = (trigger: HTMLElement | null) => {
      if (anotherDialogOpen()) return false;
      const currentInput = document.querySelector<HTMLInputElement>('[data-search-overlay] [data-search-input]');
      if (overlayOpen.current) {
        currentInput?.focus();
        return true;
      }
      loader.request({ id: ++sequence, query: currentQuery(), trigger });
      return true;
    };
    const click = (event: MouseEvent) => {
      if (!isPlainSearchClick(event) || !(event.target instanceof Element)) return;
      const trigger = event.target.closest<HTMLElement>('[data-open-search]');
      if (!trigger || !activate(document.activeElement instanceof HTMLElement ? document.activeElement : trigger)) return;
      event.preventDefault();
    };
    const keydown = (event: KeyboardEvent) => {
      const active = document.activeElement as HTMLElement | null;
      const editing = !!(active?.matches('input, textarea, select') || active?.isContentEditable);
      if (event.key === 'Escape' && statusVisible.current) {
        event.preventDefault();
        cancel(true);
        return;
      }
      if (isSearchShortcut(event, editing) && activate(active)) event.preventDefault();
    };
    const navigate = () => cancel();
    const custom = (event: Event) => {
      if (activate(document.activeElement as HTMLElement | null)) event.preventDefault();
    };
    document.addEventListener('click', click, true);
    document.addEventListener('keydown', keydown);
    document.addEventListener('pp:open-search', custom);
    document.addEventListener('astro:before-preparation', navigate);
    document.addEventListener('astro:before-swap', navigate);
    const ready = () => { document.documentElement.dataset.searchLauncherReady = '1'; };
    document.addEventListener('astro:after-swap', ready);
    ready();
    return () => {
      mounted = false;
      loader.cancel();
      delete document.documentElement.dataset.searchLauncherReady;
      document.removeEventListener('click', click, true);
      document.removeEventListener('keydown', keydown);
      document.removeEventListener('pp:open-search', custom);
      document.removeEventListener('astro:before-preparation', navigate);
      document.removeEventListener('astro:before-swap', navigate);
      document.removeEventListener('astro:after-swap', ready);
    };
  }, []);

  useEffect(() => {
    if (phase === 'loading') inputRef.current?.focus({ preventScroll: true });
  }, [phase]);

  return (
    <>
      {Component && request && <Component requestId={request.id} initialQuery={request.query} returnFocus={request.trigger} onOpenChange={onOpenChange} />}
      {phase !== 'idle' && (
        <section data-search-launcher-status={phase} aria-label="Abrir busca do portal" className="fixed inset-x-4 bottom-24 z-[90] rounded-2xl border border-surface-200 bg-white p-4 text-ink-900 shadow-lift sm:left-auto sm:w-96">
          <div className="flex items-start justify-between gap-3">
            <p role="status" className="text-sm font-medium">{phase === 'loading' ? 'Carregando a busca…' : 'Não foi possível abrir a busca rápida. Use a busca completa abaixo.'}</p>
            <button type="button" onClick={() => cancelRef.current()} aria-label="Fechar carregamento da busca" className="shrink-0 rounded-md px-2 py-1 text-sm text-ink-700">Fechar</button>
          </div>
          <form action="/busca/" method="get" className="mt-3 flex min-w-0 flex-wrap gap-2">
            <label htmlFor="search-launcher-query" className="sr-only">Termo para buscar no portal</label>
            <input ref={inputRef} id="search-launcher-query" name="q" type="search" value={query} onChange={event => { draft.current = event.target.value; setQuery(event.target.value); }} className="min-w-0 flex-1 rounded-lg border border-surface-200 bg-white px-3 py-2 text-sm" />
            <button type="submit" className="btn btn-primary btn-sm">Buscar</button>
          </form>
        </section>
      )}
    </>
  );
}
