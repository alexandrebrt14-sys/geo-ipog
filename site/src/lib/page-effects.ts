/** Efeitos de leitura com encerramento na navegação e preferência de movimento dinâmica. */
export function initPageEffects() {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const supports = (value: string) => {
    try { return CSS.supports('animation-timeline', value); } catch { return false; }
  };
  const scrollTimeline = supports('scroll()');
  const viewTimeline = supports('view()');
  let revealObserver: IntersectionObserver | null = null;
  let countObserver: IntersectionObserver | null = null;
  let scrollFrame = 0;
  const frames = new Set<number>();
  const delays = new Set<number>();
  const pulses = new Set<Animation>();
  const activeCounts = new Set<HTMLElement>();

  const updateScrollUI = () => {
    scrollFrame = 0;
    const doc = document.documentElement;
    const progress = document.getElementById('reading-progress');
    if (progress) {
      if (!scrollTimeline || motion.matches) {
        const length = doc.scrollHeight - doc.clientHeight;
        const ratio = length > 0 ? Math.max(0, Math.min(1, doc.scrollTop / length)) : 0;
        progress.style.transform = `scaleX(${ratio})`;
      } else progress.style.removeProperty('transform');
    }
    const button = document.getElementById('back-to-top');
    if (button) {
      const visible = doc.scrollTop > 600;
      button.classList.toggle('is-visible', visible);
      button.setAttribute('aria-hidden', String(!visible));
      button.tabIndex = visible ? 0 : -1;
    }
  };
  const scheduleScroll = () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollUI);
  };
  const reveal = (el: HTMLElement) => {
    el.classList.remove('reveal-pending');
    el.classList.add('reveal-in');
  };
  const finishCount = (el: HTMLElement) => {
    const target = Number(el.dataset.countup || el.textContent || '0');
    if (!Number.isFinite(target)) return;
    el.textContent = (el.dataset.countupPrefix || '') + target + (el.dataset.countupSuffix || '');
    el.dataset.counted = '1';
  };
  const nextFrame = (callback: FrameRequestCallback) => {
    const id = requestAnimationFrame(now => { frames.delete(id); callback(now); });
    frames.add(id);
  };
  const runCount = (el: HTMLElement) => {
    const target = Number(el.dataset.countup || el.textContent || '0');
    el.dataset.counted = '1';
    if (!Number.isFinite(target)) return;
    if (motion.matches) { finishCount(el); return; }
    activeCounts.add(el);
    const start = performance.now();
    const tick = (now: number) => {
      if (!el.isConnected) { activeCounts.delete(el); return; }
      if (motion.matches) { finishCount(el); activeCounts.delete(el); return; }
      const fraction = Math.min(1, (now - start) / 900);
      const value = Math.round(target * (1 - (1 - fraction) ** 3));
      el.textContent = (el.dataset.countupPrefix || '') + value + (el.dataset.countupSuffix || '');
      if (fraction < 1) nextFrame(tick);
      else {
        activeCounts.delete(el);
        if (typeof el.animate !== 'function') return;
        const pulse = el.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.06)' }, { transform: 'scale(1)' }], { duration: 240, easing: 'ease-out' });
        pulses.add(pulse);
        pulse.finished.then(() => pulses.delete(pulse), () => pulses.delete(pulse));
      }
    };
    nextFrame(tick);
  };

  const cleanup = () => {
    revealObserver?.disconnect();
    countObserver?.disconnect();
    revealObserver = countObserver = null;
    frames.forEach(cancelAnimationFrame);
    frames.clear();
    activeCounts.forEach(el => { if (el.isConnected) finishCount(el); });
    activeCounts.clear();
    delays.forEach(clearTimeout);
    delays.clear();
    pulses.forEach(animation => animation.cancel());
    pulses.clear();
    if (scrollFrame) cancelAnimationFrame(scrollFrame);
    scrollFrame = 0;
  };
  const init = () => {
    updateScrollUI();
    const hasObserver = 'IntersectionObserver' in window;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.reveal-in)'));
    if (motion.matches || !hasObserver) reveals.forEach(reveal);
    else if (!viewTimeline) {
      revealObserver ||= new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          revealObserver?.unobserve(el);
          const delay = Math.max(0, Math.min(300, Number(el.dataset.revealDelay) || 0));
          const id = window.setTimeout(() => { delays.delete(id); if (el.isConnected) reveal(el); }, delay);
          delays.add(id);
        });
      }, { rootMargin: '0px 0px -5% 0px', threshold: 0.05 });
      reveals.forEach(el => { el.classList.add('reveal-pending'); revealObserver!.observe(el); });
    }
    const counters = Array.from(document.querySelectorAll<HTMLElement>(motion.matches ? '[data-countup]' : '[data-countup]:not([data-counted])'));
    if (motion.matches || !hasObserver) counters.forEach(finishCount);
    else {
      countObserver ||= new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          countObserver?.unobserve(el);
          if (!el.dataset.counted) runCount(el);
        });
      }, { threshold: 0.4 });
      counters.forEach(el => countObserver!.observe(el));
    }
  };
  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', scheduleScroll, { passive: true });
  document.addEventListener('astro:before-swap', cleanup);
  document.addEventListener('astro:page-load', init);
  window.addEventListener('pagehide', cleanup);
  window.addEventListener('pageshow', init);
  motion.addEventListener('change', () => { cleanup(); init(); });
  document.addEventListener('focusin', event => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const card = target.closest<HTMLElement>('.reveal');
    if (card) { revealObserver?.unobserve(card); reveal(card); }
  });
  document.addEventListener('click', event => {
    if (!(event.target instanceof Element) || !event.target.closest('#back-to-top')) return;
    scrollToPageTop();
  });
  init();
}

export function scrollToPageTop() {
    const heading = document.querySelector<HTMLElement>('main h1') || document.getElementById('main');
    if (heading) {
      if (!heading.hasAttribute('tabindex')) heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}
