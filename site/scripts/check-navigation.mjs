#!/usr/bin/env node
// Regressões do sumário: fonte real Astro/TypeScript, sem build ou navegador.
// O CSS e o foco nativo são conferidos na vistoria do artefato integrado.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { parse } from '@astrojs/compiler';

const source = fs.readFileSync(new URL('../src/components/InPageNav.astro', import.meta.url), 'utf8');
const script = source.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert(script, 'Script do sumário não encontrado.');
const code = ts.transpileModule(script, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None } }).outputText;
const checks = [];
class Events extends EventTarget {
  listeners = new Map();
  addEventListener(type, callback, options) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(callback);
    super.addEventListener(type, callback, options);
  }
  removeEventListener(type, callback, options) {
    this.listeners.get(type)?.delete(callback);
    super.removeEventListener(type, callback, options);
  }
  count(type) { return this.listeners.get(type)?.size || 0; }
  fire(type, values = {}) {
    const event = new Event(type, { cancelable: true });
    Object.assign(event, values);
    this.dispatchEvent(event);
    return event;
  }
}

function fixture({ reverseLinks = false } = {}) {
  const window = new Events();
  Object.assign(window, { scrollY: 0, innerHeight: 800, location: { hash: '' } });
  const document = new Events();
  document.documentElement = { scrollHeight: 5000, scrollPaddingTop: '0px' };
  document.fonts = { ready: Promise.resolve() };
  let resize;
  const frames = new Map();
  let sequence = 0;
  class Element extends Events {
    attributes = new Map();
    dataset = {};
    scrollTop = 0;
    focus() { document.activeElement = this; }
    hasAttribute(name) { return this.attributes.has(name); }
    setAttribute(name, value) { this.attributes.set(name, value); }
    removeAttribute(name) { this.attributes.delete(name); }
    getAttribute(name) { return this.attributes.get(name) ?? null; }
    getClientRects() { return [this.getBoundingClientRect()]; }
  }
  const targets = [200, 1000, 2500].map((top, index) => {
    const element = new Element();
    element.id = 'section-' + index;
    element.compareDocumentPosition = other => other === element ? 0 : index < targets.indexOf(other) ? 4 : 2;
    element.top = top;
    element.getBoundingClientRect = () => ({ top: element.top - window.scrollY, bottom: element.top - window.scrollY + 40 });
    return element;
  });
  const main = new Element();
  const header = { getBoundingClientRect: () => ({ bottom: 72 }) };
  const list = new Element();
  list.getBoundingClientRect = () => ({ top: 100, bottom: 250 });
  const desktop = new Element();
  const disclosure = new Element();
  disclosure.open = false;
  const summary = new Element();
  disclosure.querySelector = selector => selector === 'summary' ? summary : null;
  const links = ['mobile', 'desktop'].flatMap(kind => targets.map((target, index) => {
    const link = new Element();
    link.dataset.target = target.id;
    link.kind = kind;
    link.closest = selector => ({
      '[data-inpage-mobile]': kind === 'mobile' ? disclosure : null,
      '[data-inpage-desktop]': kind === 'desktop' ? desktop : null,
      '[data-inpage-list]': kind === 'desktop' ? list : null,
    })[selector] || null;
    link.getBoundingClientRect = () => ({ top: 100 + index * 80 - list.scrollTop, bottom: 140 + index * 80 - list.scrollTop });
    return link;
  }));
  if (reverseLinks) links.reverse();
  document.getElementById = id => id === 'main-header' ? header : targets.find(target => target.id === id) || null;
  document.querySelector = selector => selector === 'main' ? main : null;
  document.querySelectorAll = selector => selector === 'a[data-inpage-link]' ? links : selector === '[data-inpage-mobile]' ? [disclosure] : [];
  class ResizeObserver {
    constructor(callback) { this.callback = callback; resize = this; }
    observe(element) { assert.equal(element, main); }
    disconnect() { this.disconnected = true; }
  }
  window.ResizeObserver = ResizeObserver;
  const context = vm.createContext({ window, document, getComputedStyle: element => ({ scrollPaddingTop: element.scrollPaddingTop || 'auto', scrollMarginTop: element.scrollMarginTop || '0px' }), HTMLElement: Element, ResizeObserver, Node: { DOCUMENT_POSITION_FOLLOWING: 4, DOCUMENT_POSITION_PRECEDING: 2 },
    requestAnimationFrame(callback) { const id = ++sequence; frames.set(id, callback); return id; },
    cancelAnimationFrame(id) { frames.delete(id); },
  });
  new vm.Script(code).runInContext(context);
  const flush = () => { for (const [id, callback] of [...frames]) { frames.delete(id); callback(); } };
  const scroll = y => { window.scrollY = y; window.fire('scroll'); flush(); };
  const current = kind => links.filter(link => link.kind === kind && link.getAttribute('aria-current') === 'location').map(link => link.dataset.target);
  const click = (link, values = {}) => link.fire('click', { button: 0, ctrlKey: false, metaKey: false, altKey: false, shiftKey: false, ...values });
  return { context, window, document, targets, list, disclosure, summary, links, frames, scroll, flush, current, click, get resize() { return resize; } };
}

{
  const f = fixture();
  assert.deepEqual(f.current('desktop'), ['section-0']);
  assert.deepEqual(f.current('mobile'), ['section-0']);
  f.scroll(2700); assert.deepEqual(f.current('desktop'), ['section-2']);
  f.scroll(1300); assert.deepEqual(f.current('desktop'), ['section-1']);
  f.scroll(1900); assert.deepEqual(f.current('desktop'), ['section-1']);
  checks.push('Saltos para baixo e para cima atualizam a seção, inclusive entre headings.');
  f.targets[2].top = 4900; f.scroll(4200);
  assert.deepEqual(f.current('desktop'), ['section-2']);
  checks.push('Fim do documento seleciona a última seção mesmo antes de cruzar a linha de leitura.');
  f.document.fire('astro:before-swap');
}
{
  const f = fixture(); f.scroll(1300);
  f.targets[1].top = 2000; f.resize.callback(); f.flush();
  assert.deepEqual(f.current('desktop'), ['section-0']);
  checks.push('Mudança de altura do conteúdo recalcula a seção sem exigir rolagem adicional.');
  f.window.fire('scroll'); f.window.fire('scroll'); f.window.fire('resize');
  assert.equal(f.frames.size, 1); f.flush();
  checks.push('Eventos frequentes compartilham um único frame de atualização.');
  f.document.fire('astro:before-swap');
}
{
  const f = fixture(); f.scroll(2700);
  assert(f.list.scrollTop > 0); assert.equal(f.window.scrollY, 2700); assert.equal(f.document.activeElement, undefined);
  checks.push('O item ativo aparece na lista lateral sem rolar a página ou roubar foco.');
  const desktopLink = f.links.find(link => link.kind === 'desktop' && link.dataset.target === 'section-1');
  assert.equal(f.click(desktopLink).defaultPrevented, false);
  assert.equal(f.document.activeElement, f.targets[1]); assert.equal(f.targets[1].tabIndex, -1);
  checks.push('Clique desktop transfere foco e conserva a navegação nativa por fragmento.');
  f.document.fire('astro:before-swap');
}
{
  const f = fixture(); const link = f.links[1];
  f.disclosure.open = true;
  for (const modifier of ['ctrlKey', 'metaKey', 'altKey', 'shiftKey']) {
    assert.equal(f.click(link, { [modifier]: true }).defaultPrevented, false);
    assert.equal(f.disclosure.open, true); assert.equal(f.document.activeElement, undefined);
  }
  f.click(link, { button: 1 }); assert.equal(f.disclosure.open, true);
  f.click(link); assert.equal(f.disclosure.open, false); assert.equal(f.document.activeElement, f.targets[1]);
  checks.push('Disclosure fecha e devolve foco somente em clique simples, preservando modificadores.');
  f.disclosure.open = true;
  assert.equal(f.disclosure.fire('keydown', { key: 'Escape' }).defaultPrevented, true);
  assert.equal(f.disclosure.open, false); assert.equal(f.document.activeElement, f.summary);
  assert.equal(f.disclosure.fire('keydown', { key: 'Escape' }).defaultPrevented, false);
  checks.push('Escape dispensa o sumário aberto e retorna ao controle nativo.');
  f.document.fire('astro:before-swap');
}
{
  const f = fixture();
  f.document.fire('astro:page-load'); f.document.fire('astro:page-load');
  assert.equal(f.window.count('scroll'), 1); assert.equal(f.links[0].count('click'), 1);
  assert.equal(f.disclosure.count('keydown'), 1);
  checks.push('Reentrada Astro não duplica listeners de scroll, links ou disclosure.');
  f.window.fire('scroll'); const previousResize = f.resize;
  f.document.fire('astro:before-swap');
  assert.equal(f.frames.size, 0); assert.equal(f.window.count('scroll'), 0);
  assert.equal(f.links[0].count('click'), 0); assert.equal(previousResize.disconnected, true);
  await Promise.resolve(); assert.equal(f.frames.size, 0);
  f.document.fire('astro:page-load'); f.scroll(2700);
  assert.deepEqual(f.current('mobile'), ['section-2']);
  checks.push('Troca de página limpa frame, observador e promessas tardias; a página seguinte reinicializa.');
  f.document.fire('astro:before-swap');
}
{
  const f = fixture({ reverseLinks: true });
  f.scroll(1300); assert.deepEqual(f.current('desktop'), ['section-1']);
  f.scroll(2700); assert.deepEqual(f.current('desktop'), ['section-2']);
  checks.push('A ordem real dos headings no DOM prevalece sobre a ordem dos links recebidos.');
  f.document.fire('astro:before-swap');
}
{
  const f = fixture();
  const anchor = f.targets[1];
  const previousId = anchor.id;
  anchor.id = 'google-scholar';
  f.links.filter(link => link.dataset.target === previousId).forEach(link => { link.dataset.target = anchor.id; });
  f.document.documentElement.scrollPaddingTop = '88px';
  anchor.scrollMarginTop = '88px';
  const destinationScrollY = anchor.top - 176.25;
  f.scroll(destinationScrollY);
  assert.deepEqual(f.current('mobile'), ['section-0']);
  f.window.location.hash = '#google-scholar';
  f.window.fire('hashchange'); f.window.fire('scroll');
  assert.equal(f.frames.size, 1); f.flush();
  assert.deepEqual(f.current('mobile'), ['google-scholar']);
  assert.deepEqual(f.current('desktop'), ['google-scholar']);
  checks.push('Âncora em 176,25px permanece ativa com padding de 88px, margin de 88px e tolerância de arredondamento, em um único frame.');
  f.scroll(destinationScrollY - 2);
  assert.deepEqual(f.current('mobile'), ['section-0']);
  f.scroll(destinationScrollY);
  for (const hash of ['', '#ausente', '#%E0%A4%A']) {
    f.window.location.hash = hash; f.window.fire('hashchange'); f.flush();
    assert.deepEqual(f.current('mobile'), ['section-0']);
  }
  checks.push('Sem âncora válida conserva a linha original; a tolerância não antecipa headings além do limite calculado.');
  f.window.location.hash = '#google%2Dscholar';
  f.window.fire('hashchange'); f.flush();
  assert.deepEqual(f.current('mobile'), ['google-scholar']);
  checks.push('Fragmento codificado identifica o heading sem quebrar a leitura com fragmentos malformados.');
  f.document.fire('astro:before-swap');
}
{
  const parsed = await parse(source);
  assert.equal(parsed.diagnostics.length, 0);
  const elements = [];
  function walk(node) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'element') elements.push(node);
    for (const [key, value] of Object.entries(node)) {
      if (key === 'position') continue;
      if (Array.isArray(value)) value.forEach(walk);
      else if (value && typeof value === 'object') walk(value);
    }
  }
  walk(parsed.ast);
  const disclosure = elements.find(node => node.name === 'details' && node.attributes.some(attr => attr.name === 'data-inpage-mobile'));
  assert(disclosure);
  assert(disclosure.children.some(node => node.name === 'summary'));
  const drawer = elements.find(node => node.attributes.some(attr => attr.name === 'id' && attr.value === 'drawerId'));
  assert(drawer && !drawer.attributes.some(attr => attr.name === 'hidden'));
  checks.push('Template usa disclosure nativo sem esconder o conteúdo por atributo dependente de JavaScript.');
}
const report = { passed: checks.length, checks };
console.log(process.argv.includes('--json') ? JSON.stringify(report, null, 2) : `${report.passed} regressões de navegação aprovadas.`);
