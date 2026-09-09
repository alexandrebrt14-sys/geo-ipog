/**
 * Regressões de melhoria progressiva e acessibilidade dos componentes.
 * Executar após npm run build: node scripts/check-progressive-components.mjs
 * Usa o HTML de produção, o script real do seletor e SSR real do React.
 * A fixture de DOM cobre comportamento; layout e foco nativo exigem QA no navegador.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(path.join(siteRoot, 'package.json'));
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const homePath = path.join(siteRoot, 'dist/index.html');
assert.ok(fs.existsSync(homePath), 'Execute npm run build antes deste teste.');
const home = fs.readFileSync(homePath, 'utf8');
const ids = ['clinica', 'lideranca', 'avaliacao', 'pesquisa'];
const optionTags = home.match(/<a\b[^>]*\bdata-decision-option="[^"]+"[^>]*>/g) ?? [];
const resultTags = home.match(/<div\b[^>]*\bdata-decision-result="[^"]+"[^>]*>/g) ?? [];
assert.equal(optionTags.length, ids.length, 'O HTML sem JavaScript deve conter as quatro opções como links.');
assert.equal(resultTags.length, ids.length, 'O HTML sem JavaScript deve conter os quatro resultados.');
for (const id of ids) {
  const option = optionTags.find(tag => tag.includes(`data-decision-option="${id}"`));
  const result = resultTags.find(tag => tag.includes(`data-decision-result="${id}"`));
  assert.ok(option?.includes(`href="#decision-result-${id}"`), `Link sem JavaScript ausente: ${id}`);
  assert.ok(result?.includes(`id="decision-result-${id}"`), `Destino do link ausente: ${id}`);
  assert.doesNotMatch(option, /\brole="button"/, 'O link só assume papel de botão após inicialização.');
  assert.doesNotMatch(result, /\shidden(?:[\s=>])|class="[^"]*\bhidden\b/, `Resultado sem JavaScript oculto: ${id}`);
  assert.match(result, /role="region".*aria-label="[^"]+"/, 'Cada resultado deve ter uma região nomeada.');
}
assert.match(home, /<p\b[^>]*data-decision-status[^>]*role="status"[^>]*aria-live="polite"/, 'O seletor precisa anunciar a modalidade.');

const decisionPath = path.join(siteRoot, 'src/components/DecisionPicker.astro');
const decisionSource = fs.readFileSync(decisionPath, 'utf8');
const script = decisionSource.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script, 'Script do DecisionPicker não encontrado.');
const decisionCode = ts.transpileModule(script, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None },
}).outputText;

function decisionFixture(hash = '') {
  const listeners = {};
  let reducedMotion = false;
  function element(attributes = {}) {
    const callbacks = {};
    const classes = new Set();
    return {
      attributes, dataset: {}, hidden: false, textContent: '',
      classList: {
        add: name => classes.add(name),
        remove: name => classes.delete(name),
        toggle: (name, enabled) => enabled ? classes.add(name) : classes.delete(name),
        contains: name => classes.has(name),
      },
      getAttribute: name => attributes[name] ?? null,
      setAttribute: (name, value) => { attributes[name] = value; },
      addEventListener: (name, callback) => { (callbacks[name] ??= []).push(callback); },
      fire(name, event = {}) {
        event.preventDefault ??= () => { event.prevented = true; };
        callbacks[name]?.forEach(callback => callback(event));
        return event;
      },
      click() { return this.fire('click'); },
      callbackCount: name => (callbacks[name] ?? []).length,
    };
  }
  const options = ids.map(id => ({
    ...element({ 'data-decision-option': id }), hash: `#decision-result-${id}`,
  }));
  const results = ids.map(id => ({
    ...element({ 'data-decision-result': id }),
    querySelector: () => ({ textContent: `Modalidade ${id}` }),
  }));
  const hint = element();
  const status = element();
  const picker = element();
  picker.querySelectorAll = selector => selector === '[data-decision-option]' ? options : results;
  picker.querySelector = selector => selector === '[data-decision-hint]' ? hint : status;
  const document = {
    querySelectorAll: () => [picker],
    addEventListener: (name, callback) => { listeners[name] = callback; },
  };
  const window = { location: { hash }, matchMedia: () => ({ matches: reducedMotion }) };
  vm.runInNewContext(decisionCode, { document, window }, { filename: decisionPath, timeout: 5000 });
  return { options, results, hint, status, listeners, reduce: () => { reducedMotion = true; } };
}

const picker = decisionFixture();
assert.ok(picker.results.every(result => result.hidden), 'Após inicializar, aguarda-se uma escolha.');
assert.ok(picker.options.every(option => option.attributes.role === 'button' && option.attributes['aria-pressed'] === 'false'));
assert.equal(picker.options[1].click().prevented, true);
assert.deepEqual(picker.results.map(result => result.hidden), [true, false, true, true]);
assert.deepEqual(picker.options.map(option => option.attributes['aria-pressed']), ['false', 'true', 'false', 'false']);
assert.equal(picker.status.textContent, 'Modalidade lideranca');
assert.equal(picker.hint.hidden, true);
assert.equal(picker.results[1].classList.contains('decision-reveal'), true);
picker.reduce();
const space = picker.options[2].fire('keydown', { key: ' ' });
assert.equal(space.prevented, true, 'Espaço deve selecionar e impedir rolagem.');
assert.deepEqual(picker.results.map(result => result.hidden), [true, true, false, true]);
assert.equal(picker.results[2].classList.contains('decision-reveal'), false);
picker.options[1].click();
assert.equal(picker.results[1].classList.contains('decision-reveal'), false, 'Movimento reduzido deve limpar a animação anterior.');
assert.equal(picker.options[0].fire('keydown', { key: 'Tab' }).prevented, undefined, 'Tab deve preservar a navegação nativa.');
picker.listeners['astro:after-swap']();
picker.listeners['astro:after-swap']();
assert.ok(picker.options.every(option => option.callbackCount('click') === 1 && option.callbackCount('keydown') === 1), 'A navegação Astro não pode duplicar listeners.');
const deepLink = decisionFixture('#decision-result-pesquisa');
assert.deepEqual(deepLink.results.map(result => result.hidden), [true, true, true, false]);
assert.equal(deepLink.options[3].attributes['aria-pressed'], 'true');
assert.ok(decisionFixture('#outro-trecho').results.every(result => result.hidden));

// Transpila somente os módulos TS/TSX locais; React e JSON vêm do lockfile/repo.
// Isso permite SSR verdadeiro sem adicionar um runner ou exigir Node com TS nativo.
const modules = new Map();
function loadTypeScript(filename) {
  if (modules.has(filename)) return modules.get(filename).exports;
  const module = { exports: {} };
  modules.set(filename, module);
  const nativeRequire = createRequire(filename);
  const localRequire = specifier => {
    if (specifier.startsWith('.')) {
      const candidate = path.resolve(path.dirname(filename), specifier);
      const local = ['', '.ts', '.tsx'].map(extension => candidate + extension)
        .find(target => /\.tsx?$/.test(target) && fs.existsSync(target));
      if (local) return loadTypeScript(local);
    }
    return nativeRequire(specifier);
  };
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    fileName: filename,
    reportDiagnostics: true,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
    },
  });
  assert.deepEqual(compiled.diagnostics?.filter(diagnostic => diagnostic.category === ts.DiagnosticCategory.Error), [], `Erro de sintaxe: ${filename}`);
  vm.runInThisContext(`(function(module, exports, require) {\n${compiled.outputText}\n})`, { filename })(module, module.exports, localRequire);
  return module.exports;
}

const tooltip = loadTypeScript(path.join(siteRoot, 'src/components/GlossaryTooltip.tsx'));
const checkedPages = new Map();
let tooltipCases = 0;
let canonicalTerms = 0;
let searchTerms = 0;
for (const definition of tooltip.GLOSSARY_TOOLTIP_TERMS) {
  for (const term of [definition.label, definition.slug, ...(definition.aliases ?? [])]) {
    const html = renderToStaticMarkup(React.createElement(tooltip.default, { term }));
    assert.match(html, /<a\b/, `O termo ${term} deve ser um link sem JavaScript.`);
    assert.doesNotMatch(html, /\brole="(?:button|tooltip)"|aria-expanded=/, 'SSR não deve anunciar controles inertes.');
    const href = html.match(/\bhref="([^"]+)"/)?.[1]?.replaceAll('&amp;', '&');
    assert.ok(href?.startsWith('/'), `Destino interno ausente: ${term}`);
    const url = new URL(href, 'https://posgraduacaopsicologia.com');
    assert.equal(url.origin, 'https://posgraduacaopsicologia.com');
    const target = path.join(siteRoot, 'dist', decodeURIComponent(url.pathname), 'index.html');
    assert.ok(fs.existsSync(target), `Destino inexistente para ${term}: ${href}`);
    if (url.hash) {
      if (!checkedPages.has(target)) checkedPages.set(target, fs.readFileSync(target, 'utf8'));
      assert.ok(checkedPages.get(target).includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Fragmento inexistente para ${term}: ${href}`);
    } else {
      assert.equal(url.pathname, '/busca', `Fallback inesperado: ${href}`);
      assert.equal(url.searchParams.get('q'), definition.label);
    }
    if (term === definition.label) {
      if (url.hash) canonicalTerms++;
      else searchTerms++;
    }
    tooltipCases++;
  }
}
assert.equal(renderToStaticMarkup(React.createElement(tooltip.default, { term: 'termo de teste não cadastrado' })), '<span>termo de teste não cadastrado</span>');
assert.match(renderToStaticMarkup(React.createElement(tooltip.default, { term: 'NR1' }, 'Texto personalizado')), />Texto personalizado<\/a>/);


// Executa o listener real do layout para manter o fallback e o lançador coerentes.
const basePath = path.join(siteRoot, 'src/layouts/Base.astro');
const baseSource = fs.readFileSync(basePath, 'utf8');
const baseScript = [...baseSource.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(match => match[1]).find(code => code.includes('pp:open-search'));
assert.ok(baseScript, 'Script global com fallback da busca não encontrado.');
const baseAst = ts.createSourceFile(basePath, baseScript, ts.ScriptTarget.Latest, true);
const searchListeners = [];
function findSearchListener(node) {
  if (ts.isCallExpression(node) && node.expression.getText(baseAst) === 'document.addEventListener' &&
      node.arguments[0]?.text === 'keydown' && node.getText(baseAst).includes('pp:open-search')) {
    searchListeners.push(node.getText(baseAst));
  }
  ts.forEachChild(node, findSearchListener);
}
findSearchListener(baseAst);
assert.equal(searchListeners.length, 1, 'O layout deve ter um único listener de fallback da busca.');
const fallbackCode = ts.transpileModule(searchListeners[0], {
  compilerOptions: { target: ts.ScriptTarget.ES2022 },
}).outputText;
function fallbackFixture({ hydrated = false, dialog = false } = {}) {
  let listener;
  const dispatched = [];
  const navigations = [];
  const document = {
    body: { dataset: {} },
    addEventListener: (_, callback) => { listener = callback; },
    querySelector: () => dialog ? { getClientRects: () => [{}] } : null,
    dispatchEvent(event) {
      dispatched.push(event.type);
      if (hydrated) event.preventDefault();
      return !event.defaultPrevented;
    },
  };
  vm.runInNewContext(fallbackCode, {
    document, Event, URL, isTypingTarget: () => false, gPressedAt: 0,
    location: { href: 'https://posgraduacaopsicologia.com/?q=NR-1', assign: href => navigations.push(href) },
  }, { filename: basePath, timeout: 5000 });
  return {
    dispatched, navigations,
    key(properties = {}) {
      const event = {
        key: 'k', ctrlKey: false, metaKey: false, altKey: false,
        isComposing: false, defaultPrevented: false,
        preventDefault() { this.defaultPrevented = true; }, ...properties,
      };
      listener(event);
      return event;
    },
  };
}
for (const modifier of ['ctrlKey', 'metaKey']) {
  for (const blocked of [{ altKey: true }, { isComposing: true }, { defaultPrevented: true }]) {
    const fixture = fallbackFixture();
    const event = fixture.key({ [modifier]: true, ...blocked });
    assert.equal(event.defaultPrevented, !!blocked.defaultPrevented, 'Alt e composição não devem ser interceptados.');
    assert.deepEqual(fixture.dispatched, [], 'Atalho inválido não deve disparar a busca.');
    assert.deepEqual(fixture.navigations, [], 'Atalho inválido não deve navegar.');
  }
  const cold = fallbackFixture();
  assert.equal(cold.key({ [modifier]: true, key: 'K' }).defaultPrevented, true);
  assert.deepEqual(cold.dispatched, ['pp:open-search']);
  assert.deepEqual(cold.navigations, ['/busca/?q=NR-1']);
  const ready = fallbackFixture({ hydrated: true });
  assert.equal(ready.key({ [modifier]: true }).defaultPrevented, true);
  assert.deepEqual(ready.dispatched, ['pp:open-search']);
  assert.deepEqual(ready.navigations, [], 'O lançador hidratado deve consumir o fallback.');
  const modal = fallbackFixture({ dialog: true });
  assert.equal(modal.key({ [modifier]: true }).defaultPrevented, false);
  assert.deepEqual(modal.dispatched, [], 'Outro diálogo aberto deve preservar seu teclado.');
}

console.log(JSON.stringify({
  searchShortcutFallback: { ctrlAndCmd: 'aprovado', altAndComposition: 'aprovado', hydration: 'aprovado', modal: 'aprovado' },
  decisionPicker: {
    htmlSsr: 'aprovado', selection: 'aprovado', announcement: 'aprovado',
    spaceKey: 'aprovado', reducedMotion: 'aprovado', astroIdempotency: 'aprovado', deepLink: 'aprovado',
  },
  glossaryTooltip: { ssr: 'aprovado', cases: tooltipCases, canonicalTerms, searchTerms, unknownTerm: 'aprovado' },
}, null, 2));
