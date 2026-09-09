import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';

const source = fs.readFileSync(new URL('../src/lib/page-effects.ts', import.meta.url), 'utf8');
const output = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS } }).outputText;
function fixture({ reduced = false, timelines = true, observer = true } = {}) {
  const events = () => ({ listeners: {}, addEventListener(name, fn) { (this.listeners[name] ||= []).push(fn); }, fire(name, event = {}) { for (const fn of this.listeners[name] || []) fn(event); } });
  class Element {
    constructor() { this.dataset = {}; this.isConnected = true; this.textContent = ''; this.attrs = {}; this.classes = new Set(); this.tabIndex = 0; this.style = { removeProperty(name) { delete this[name]; } }; this.classList = { add: name => this.classes.add(name), remove: name => this.classes.delete(name), toggle: (name, on) => on ? this.classes.add(name) : this.classes.delete(name) }; }
    setAttribute(name, value) { this.attrs[name] = value; }
    hasAttribute(name) { return name in this.attrs; }
    closest(selector) { return this.match === selector ? this : null; }
    focus(options) { document.activeElement = this; this.focusOptions = options; }
  }
  const progress = new Element(), back = new Element(), heading = new Element(), card = new Element(), counter = new Element();
  back.match = '#back-to-top'; card.match = '.reveal'; counter.dataset.countup = '27'; counter.textContent = '27';
  const root = { scrollHeight: 5000, clientHeight: 1000, scrollTop: 0 };
  const document = { ...events(), documentElement: root, getElementById(id) { return ({ 'reading-progress': progress, 'back-to-top': back, main: heading })[id] || null; }, querySelector: () => heading, querySelectorAll(selector) {
    if (selector.startsWith('.reveal')) return card.classes.has('reveal-in') ? [] : [card];
    if (selector === '[data-countup]') return [counter];
    if (selector.startsWith('[data-countup]')) return counter.dataset.counted ? [] : [counter];
    return [];
  } };
  const media = { ...events(), matches: reduced };
  const jobs = new Map(), timers = new Map(), observers = [], animations = [];
  let serial = 0, now = 0;
  const raf = fn => { const id = ++serial; jobs.set(id, fn); return id; };
  class Observer {
    constructor(callback) { this.callback = callback; this.targets = new Set(); observers.push(this); }
    observe(el) { this.targets.add(el); }
    unobserve(el) { this.targets.delete(el); }
    disconnect() { this.targets.clear(); this.disconnected = true; }
    enter(el) { this.callback([{ target: el, isIntersecting: true }]); }
  }
  counter.animate = () => { const a = { finished: new Promise(resolve => { aResolve = resolve; }), cancel() { this.cancelled = true; } }; animations.push(a); return a; };
  let aResolve;
  const window = { ...events(), matchMedia: () => media, scrollTo(options) { this.lastScroll = options; }, setTimeout(fn) { const id = ++serial; timers.set(id, fn); return id; } };
  if (observer) window.IntersectionObserver = Observer;
  const module = { exports: {} };
  vm.runInNewContext(output, { module, exports: module.exports, document, window, CSS: { supports: () => timelines }, HTMLElement: Element, Element, IntersectionObserver: Observer, requestAnimationFrame: raf, cancelAnimationFrame: id => jobs.delete(id), clearTimeout: id => timers.delete(id), performance: { now: () => now } });
  module.exports.initPageEffects();
  const frame = (time = now + 16) => { now = time; const batch = [...jobs.values()]; jobs.clear(); batch.forEach(fn => fn(time)); };
  return { document, window, media, progress, back, heading, card, counter, root, jobs, timers, observers, animations, frame, reduce(value) { media.matches = value; media.fire('change'); }, resolvePulse() { aResolve?.(); } };
}
const checks = [];
function check(name, fn) { fn(); checks.push(name); }
check('Progresso funciona com movimento reduzido mesmo com timeline CSS', () => {
  const f = fixture({ reduced: true }); f.root.scrollTop = 1000; f.window.fire('scroll'); f.frame(); assert.equal(f.progress.style.transform, 'scaleX(0.25)');
});
check('Preferência muda durante a sessão e devolve controle ao CSS', () => {
  const f = fixture(); f.root.scrollTop = 2000; f.reduce(true); assert.equal(f.progress.style.transform, 'scaleX(0.5)'); f.reduce(false); assert.equal(f.progress.style.transform, undefined);
});
check('Botão oculto não recebe foco; aparece após rolagem', () => {
  const f = fixture(); assert.equal(f.back.tabIndex, -1); assert.equal(f.back.attrs['aria-hidden'], 'true'); f.root.scrollTop = 700; f.window.fire('scroll'); f.frame(); assert.equal(f.back.tabIndex, 0); assert.equal(f.back.attrs['aria-hidden'], 'false');
});
check('Voltar ao topo transfere foco e usa preferência atual', () => {
  const f = fixture(); f.reduce(true); f.document.fire('click', { target: f.back }); assert.equal(f.document.activeElement, f.heading); assert.equal(f.heading.tabIndex, -1); assert.equal(f.window.lastScroll.behavior, 'instant'); f.reduce(false); f.document.fire('click', { target: f.back }); assert.equal(f.window.lastScroll.behavior, 'smooth');
});
check('Eventos de scroll compartilham um frame', () => {
  const f = fixture(); for (let i = 0; i < 20; i++) f.window.fire('scroll'); assert.equal(f.jobs.size, 1); f.frame(); assert.equal(f.jobs.size, 0);
});
check('Progresso limita valores negativos e páginas sem rolagem', () => {
  const f = fixture({ timelines: false }); f.root.scrollTop = -100; f.window.fire('scroll'); f.frame(); assert.equal(f.progress.style.transform, 'scaleX(0)'); f.root.scrollTop = 99999; f.window.fire('scroll'); f.frame(); assert.equal(f.progress.style.transform, 'scaleX(1)'); f.root.scrollHeight = 1000; f.window.fire('resize'); f.frame(); assert.equal(f.progress.style.transform, 'scaleX(0)');
});
check('Sem observador, conteúdo e números permanecem completos', () => {
  const f = fixture({ observer: false, timelines: false }); assert.ok(f.card.classes.has('reveal-in')); assert.equal(f.counter.textContent, '27'); assert.equal(f.counter.dataset.counted, '1'); assert.equal(f.jobs.size, 0);
});
check('Foco revela cartão imediatamente', () => {
  const f = fixture({ timelines: false }); assert.ok(f.card.classes.has('reveal-pending')); f.document.fire('focusin', { target: f.card }); assert.ok(f.card.classes.has('reveal-in')); assert.ok(!f.card.classes.has('reveal-pending'));
});
check('Mudança de preferência encerra contagem e revela conteúdo pendente', () => {
  const f = fixture({ timelines: false }); f.observers.find(o => o.targets.has(f.counter)).enter(f.counter); f.frame(200); assert.notEqual(f.counter.textContent, '27'); f.reduce(true); assert.equal(f.counter.textContent, '27'); assert.equal(f.jobs.size, 0); assert.ok(f.card.classes.has('reveal-in'));
});
check('Navegação cancela frames e atrasos antes de trocar o DOM', () => {
  const f = fixture({ timelines: false }); f.observers.find(o => o.targets.has(f.card)).enter(f.card); f.observers.find(o => o.targets.has(f.counter)).enter(f.counter); f.window.fire('scroll'); assert.ok(f.jobs.size > 0 && f.timers.size > 0); f.document.fire('astro:before-swap'); assert.equal(f.jobs.size, 0); assert.equal(f.timers.size, 0); assert.equal(f.counter.textContent, '27'); assert.ok(f.observers.every(o => o.disconnected));
});
check('Reentrada recria observadores sem repetir a contagem concluída', () => {
  const f = fixture({ timelines: false }); f.observers.find(o => o.targets.has(f.counter)).enter(f.counter); f.document.fire('astro:before-swap'); f.document.fire('astro:page-load'); assert.ok(f.observers.filter(o => !o.disconnected).every(o => !o.targets.has(f.counter))); assert.ok(f.observers.some(o => !o.disconnected && o.targets.has(f.card)));
});
check('Pulso WAAPI é encerrado ao reduzir movimento', () => {
  const f = fixture(); f.observers.find(o => o.targets.has(f.counter)).enter(f.counter); f.frame(1000); assert.equal(f.animations.length, 1); f.reduce(true); assert.equal(f.animations[0].cancelled, true);
});
check('Página restaurada pelo histórico conserva valor final e UI de scroll', () => {
  const f = fixture(); f.observers.find(o => o.targets.has(f.counter)).enter(f.counter); f.frame(300); f.window.fire('pagehide'); assert.equal(f.counter.textContent, '27'); f.root.scrollTop = 800; f.window.fire('pageshow'); assert.equal(f.back.tabIndex, 0);
});
check('Elemento removido não recebe frames de contagem', () => {
  const f = fixture(); f.observers.find(o => o.targets.has(f.counter)).enter(f.counter); f.counter.isConnected = false; f.frame(300); assert.equal(f.counter.textContent, '27'); assert.equal(f.jobs.size, 0);
});
console.log(JSON.stringify({ passed: checks.length, checks }, null, 2));
