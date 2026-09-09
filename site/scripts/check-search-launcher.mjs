#!/usr/bin/env node
// Testes do carregamento sob demanda, sem rede, navegador ou build do site.
// Usa TypeScript já declarado pelo projeto para executar a fonte real em VM.
// Uso: node scripts/check-search-launcher.mjs [--json]
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';

const source = fs.readFileSync(new URL('../src/components/SearchLauncher.tsx', import.meta.url), 'utf8');
const output = ts.transpileModule(source, {
  fileName: 'SearchLauncher.tsx',
  reportDiagnostics: true,
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
});
assert.equal((output.diagnostics || []).filter(item => item.category === ts.DiagnosticCategory.Error).length, 0);
const checks = [];
const flush = () => new Promise(resolve => setImmediate(resolve));
const equalDeps = (a, b) => !!a && !!b && a.length === b.length && a.every((value, index) => Object.is(value, b[index]));

function harness({ rejectImport = false, href = 'https://posgraduacaopsicologia.com/busca/?q=burnout' } = {}) {
  const state = [], refs = [], effects = [], callbacks = [];
  let stateIndex = 0, refIndex = 0, effectIndex = 0, callbackIndex = 0;
  let jobs = [], importCount = 0, tree, disposed = false;
  const writesAfterDispose = [];
  const document = new EventTarget();
  class Element {
    constructor() { this.isConnected = true; this.focusCount = 0; }
    focus() { this.focusCount++; document.activeElement = this; }
    matches() { return false; }
  }
  const trigger = new Element();
  trigger.closest = selector => selector === '[data-open-search]' ? trigger : null;
  document.activeElement = trigger;
  document.documentElement = { dataset: {} };
  document.body = { dataset: { searchPrefill: 'neuro' } };
  document.querySelector = () => null;
  const dialogs = [];
  document.querySelectorAll = () => dialogs;
  const window = { location: { href } };
  const jsx = (type, props) => ({ type, props });
  const react = {
    useState(initial) {
      const index = stateIndex++;
      if (!(index in state)) state[index] = typeof initial === 'function' ? initial() : initial;
      return [state[index], value => { if (disposed) writesAfterDispose.push(index); state[index] = typeof value === 'function' ? value(state[index]) : value; }];
    },
    useRef(initial) { const index = refIndex++; return refs[index] ||= { current: initial }; },
    useCallback(callback, deps) {
      const index = callbackIndex++;
      if (!equalDeps(callbacks[index]?.deps, deps)) callbacks[index] = { deps, callback };
      return callbacks[index].callback;
    },
    useEffect(callback, deps) {
      const index = effectIndex++;
      if (equalDeps(effects[index]?.deps, deps)) return;
      jobs.push(() => { effects[index]?.cleanup?.(); effects[index] = { deps, cleanup: callback() }; });
    },
  };
  function Overlay() { return null; }
  const context = vm.createContext({
    module: { exports: {} }, exports: {}, document, window, URL, Event,
    HTMLElement: Element, Element, Promise, Error,
    require(name) {
      if (name === 'react') return react;
      if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx, Fragment: 'fragment' };
      if (name === './SearchOverlay') {
        importCount++;
        if (rejectImport) throw new Error('Chunk de teste indisponível.');
        return { default: Overlay };
      }
      throw new Error(`Import inesperado: ${name}`);
    },
  });
  context.exports = context.module.exports;
  new vm.Script(output.outputText, { filename: 'SearchLauncher.cjs' }).runInContext(context);
  const api = context.module.exports;
  function render() {
    stateIndex = refIndex = effectIndex = callbackIndex = 0;
    jobs = [];
    tree = api.default();
    jobs.forEach(job => job());
    return tree;
  }
  const dispatch = name => {
    const event = new Event(name, { cancelable: true });
    document.dispatchEvent(event);
    return event;
  };
  const dispatchClick = (properties = {}) => {
    const event = new Event('click', { cancelable: true });
    Object.defineProperty(event, 'target', { value: trigger });
    Object.assign(event, { button: 0, ctrlKey: false, metaKey: false, altKey: false, shiftKey: false, ...properties });
    document.dispatchEvent(event);
    return event;
  };
  const dispatchKey = key => {
    const event = new Event('keydown', { cancelable: true });
    Object.assign(event, { key });
    document.dispatchEvent(event);
    return event;
  };
  return { api, render, dispatch, dispatchClick, dispatchKey, document, window, dialogs, trigger, Overlay, writesAfterDispose,
    get importCount() { return importCount; },
    unmount() { effects.forEach(effect => effect?.cleanup?.()); disposed = true; },
  };
}

function nodes(tree) {
  if (!tree) return [];
  if (Array.isArray(tree)) return tree.flatMap(nodes);
  if (typeof tree !== 'object') return [];
  return [tree, ...nodes(tree.props?.children)];
}
function status(tree) { return nodes(tree).find(node => node.props?.['data-search-launcher-status']); }
function input(tree) { return nodes(tree).find(node => node.type === 'input'); }
function overlay(tree, context) { return nodes(tree).find(node => node.type === context.Overlay); }
function deferred() { let resolve, reject; const promise = new Promise((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; }

const pure = harness().api;
{
  let calls = 0; const gate = deferred(); const ready = [], errors = [], starts = [];
  const loader = pure.createSearchLoader({ load: () => { calls++; return gate.promise; }, onStart: request => starts.push(request), onReady: (_, request) => ready.push(request), onError: error => errors.push(error) });
  assert.equal(calls, 0);
  assert.equal(loader.request('primeiro'), true);
  assert.equal(loader.request('duplicado'), false);
  await flush(); assert.equal(calls, 1); assert.equal(starts.length, 1);
  gate.resolve({ default: 'carregado' }); await flush();
  assert.deepEqual(ready, ['primeiro']); assert.equal(errors.length, 0);
  checks.push('Primeira ativação única e cliques duplicados compartilham um import.');
  loader.request('reabrir'); await flush();
  assert.equal(calls, 1); assert.deepEqual(ready, ['primeiro', 'reabrir']);
  checks.push('Reabrir reutiliza o módulo carregado.');
}
{
  const gate = deferred(); const ready = [], errors = [];
  const loader = pure.createSearchLoader({ load: () => gate.promise, onStart: () => {}, onReady: (_, request) => ready.push(request), onError: error => errors.push(error) });
  loader.request('rota antiga'); loader.cancel(); gate.resolve('ok'); await flush();
  assert.equal(ready.length, 0); assert.equal(errors.length, 0);
  loader.request('rota atual'); await flush(); assert.deepEqual(ready, ['rota atual']);
  checks.push('Navegação cancela a abertura tardia e permite ativar na rota atual.');
}
{
  const gate = deferred(); const errors = [];
  const loader = pure.createSearchLoader({ load: () => gate.promise, onStart: () => {}, onReady: () => assert.fail(), onError: error => errors.push(error) });
  loader.request('cancelado'); loader.cancel(); gate.reject(new Error('rede')); await flush();
  assert.equal(errors.length, 0);
  checks.push('Import rejeitado após cancelamento não reabre mensagem de erro.');
}
{
  let calls = 0; const ready = [], errors = [];
  const loader = pure.createSearchLoader({ load: () => { calls++; return calls === 1 ? Promise.reject(new Error('chunk')) : Promise.resolve('ok'); }, onStart: () => {}, onReady: module => ready.push(module), onError: error => errors.push(error) });
  loader.request('primeiro'); await flush(); assert.equal(errors.length, 1);
  loader.request('segundo'); await flush(); assert.deepEqual(ready, ['ok']); assert.equal(calls, 2);
  checks.push('Falha de import é tratada e uma nova ativação pode tentar novamente.');
}
{
  const normal = { button: 0, ctrlKey: false, metaKey: false, altKey: false, shiftKey: false, defaultPrevented: false };
  assert.equal(pure.isPlainSearchClick(normal), true);
  for (const modifier of ['ctrlKey', 'metaKey', 'altKey', 'shiftKey', 'defaultPrevented']) assert.equal(pure.isPlainSearchClick({ ...normal, [modifier]: true }), false);
  assert.equal(pure.isPlainSearchClick({ ...normal, button: 1 }), false);
  checks.push('Cliques modificados e botão central preservam a navegação nativa.');
  const key = { key: '/', ctrlKey: false, metaKey: false, altKey: false, defaultPrevented: false, isComposing: false };
  assert.equal(pure.isSearchShortcut(key, false), true); assert.equal(pure.isSearchShortcut(key, true), false);
  assert.equal(pure.isSearchShortcut({ ...key, key: 'k', ctrlKey: true }, true), true);
  assert.equal(pure.isSearchShortcut({ ...key, key: 'K', metaKey: true }, false), true);
  assert.equal(pure.isSearchShortcut({ ...key, isComposing: true }, false), false);
  checks.push('CtrlK, CmdK e barra respeitam campos de edição e composição.');
}
{
  const context = harness(); context.render(); await flush(); assert.equal(context.importCount, 0);
  assert.equal(context.dispatch('pp:open-search').defaultPrevented, true);
  let tree = context.render(); assert.equal(status(tree).props['data-search-launcher-status'], 'loading');
  assert.equal(input(tree).props.value, 'burnout'); input(tree).props.onChange({ target: { value: 'NR-1 e saúde' } });
  context.dispatch('pp:open-search'); await flush(); tree = context.render();
  assert.equal(context.importCount, 1); assert.equal(overlay(tree, context).props.initialQuery, 'NR-1 e saúde');
  assert.equal(overlay(tree, context).props.returnFocus, context.trigger); assert.equal(status(tree), undefined);
  checks.push('Componente não importa antecipadamente e conserva texto digitado durante o carregamento.');
  overlay(tree, context).props.onOpenChange(false); context.dispatch('pp:open-search'); await flush(); tree = context.render();
  assert.equal(context.importCount, 1); assert(overlay(tree, context).props.requestId > 1);
  checks.push('Reabertura explícita funciona sem depender do clique original nem de novo download.');
  context.unmount(); assert.equal(context.document.documentElement.dataset.searchLauncherReady, undefined);
}
{
  const context = harness({ rejectImport: true }); context.render(); context.dispatch('pp:open-search'); await flush(); const tree = context.render();
  assert.equal(status(tree).props['data-search-launcher-status'], 'error');
  const form = nodes(tree).find(node => node.type === 'form');
  assert.equal(form.props.action, '/busca/'); assert.equal(form.props.method, 'get');
  assert.equal(input(tree).props.name, 'q'); assert.equal(input(tree).props.value, 'burnout'); assert.equal(form.props.onSubmit, undefined);
  checks.push('Import rejeitado mantém formulário GET nativo com a consulta preservada.');
  context.unmount();
}
{
  const context = harness(); context.render(); context.dispatch('pp:open-search'); context.dispatch('astro:before-preparation'); await flush();
  let tree = context.render(); assert.equal(status(tree), undefined); assert.equal(overlay(tree, context), undefined);
  context.window.location.href = 'https://posgraduacaopsicologia.com/areas/';
  context.document.documentElement.dataset = {}; context.dispatch('astro:after-swap');
  assert.equal(context.document.documentElement.dataset.searchLauncherReady, '1');
  context.dispatch('pp:open-search'); await flush(); tree = context.render();
  assert.equal(overlay(tree, context).props.initialQuery, 'neuro'); assert.equal(context.importCount, 1);
  checks.push('Troca Astro durante download cancela a abertura e mantém os gatilhos na página seguinte.');
  context.unmount();
}
{
  const context = harness(); context.render(); context.dispatch('pp:open-search'); context.unmount(); await flush();
  assert.equal(context.writesAfterDispose.length, 0);
  assert.equal(context.dispatch('pp:open-search').defaultPrevented, false);
  checks.push('Desmontagem remove listeners e impede atualizações da importação tardia.');
}
{
  const context = harness(); context.render();
  assert.equal(context.dispatchClick({ ctrlKey: true }).defaultPrevented, false);
  assert.equal(context.dispatchClick({ button: 1 }).defaultPrevented, false);
  await flush(); assert.equal(context.importCount, 0);
  assert.equal(context.dispatchClick().defaultPrevented, true);
  context.dispatchClick(); await flush();
  assert.equal(context.importCount, 1);
  assert.equal(overlay(context.render(), context).props.returnFocus, context.trigger);
  checks.push('Gatilho real intercepta somente o clique simples e conserva o elemento de retorno.');
  context.unmount();
}
{
  const context = harness(); context.render();
  assert.equal(context.dispatchKey('Escape').defaultPrevented, false);
  assert.equal(context.trigger.focusCount, 0);
  context.dispatch('pp:open-search'); context.render();
  assert.equal(context.dispatchKey('Escape').defaultPrevented, true);
  await flush(); const tree = context.render();
  assert.equal(context.trigger.focusCount, 1); assert.equal(status(tree), undefined); assert.equal(overlay(tree, context), undefined);
  checks.push('Escape cancela a carga e devolve foco sem interceptar teclas quando a busca está fechada.');
  context.unmount();
}
{
  const context = harness(); context.render();
  const dialog = { hasAttribute: () => false, getClientRects: () => [{}], getAttribute: () => null };
  context.dialogs.push(dialog);
  assert.equal(context.dispatch('pp:open-search').defaultPrevented, false);
  await flush(); assert.equal(context.importCount, 0);
  context.dialogs.pop(); context.dispatch('pp:open-search'); context.dialogs.push(dialog);
  await flush(); let tree = context.render();
  assert.equal(status(tree), undefined); assert.equal(overlay(tree, context), undefined);
  context.dialogs.pop(); context.dispatch('pp:open-search'); await flush(); tree = context.render();
  assert.equal(context.importCount, 1); assert(overlay(tree, context));
  checks.push('Outro diálogo bloqueia a abertura antes e durante o download, permitindo retomada com cache.');
  context.unmount();
}
{
  const parsed = ts.createSourceFile('SearchLauncher.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const imports = parsed.statements.filter(ts.isImportDeclaration).filter(node => !node.importClause?.isTypeOnly).map(node => node.moduleSpecifier.text);
  assert.deepEqual(imports, ['react']);
  checks.push('Único import estático de runtime do lançador é React.');
}
const result = { passed: checks.length, checks };
if (process.argv.includes('--json')) console.log(JSON.stringify(result, null, 2));
else console.log(`${result.passed} verificações da busca passaram.\n` + checks.map(item => `- ${item}`).join('\n'));
