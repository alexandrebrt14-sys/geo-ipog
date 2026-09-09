#!/usr/bin/env node
// Executa os componentes reais em VM e confere SSR com React, sem rede ou build.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const componentDir = fileURLToPath(new URL('../src/components/', import.meta.url));
const origin = 'https://posgraduacaopsicologia.com';
const checks = [];
const equalDeps = (a, b) => a && b && a.length === b.length && a.every((value, index) => Object.is(value, b[index]));
const text = node => node == null || typeof node === 'boolean' ? '' : Array.isArray(node) ? node.map(text).join('') : typeof node === 'object' ? text(node.props?.children) : String(node);
function walk(node, predicate, found = []) {
  if (!node || typeof node !== 'object') return found;
  if (Array.isArray(node)) { node.forEach(item => walk(item, predicate, found)); return found; }
  if (predicate(node)) found.push(node);
  walk(node.props?.children, predicate, found);
  return found;
}
function eventHub() {
  const listeners = new Map();
  return {
    listeners,
    addEventListener(name, callback) { if (!listeners.has(name)) listeners.set(name, new Set()); listeners.get(name).add(callback); },
    removeEventListener(name, callback) { listeners.get(name)?.delete(callback); },
    dispatchEvent(event) { [...(listeners.get(event.type) || [])].forEach(callback => callback(event)); return true; },
  };
}
function modules(dependencies, globals = {}) {
  const cache = new Map();
  return function load(file) {
    const full = path.resolve(file);
    if (cache.has(full)) return cache.get(full).exports;
    const source = fs.readFileSync(full, 'utf8');
    const result = ts.transpileModule(source, { fileName: full, reportDiagnostics: true, compilerOptions: {
      target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX,
    } });
    const diagnostics = (result.diagnostics || []).filter(item => item.category === ts.DiagnosticCategory.Error);
    assert.equal(diagnostics.length, 0, `${path.basename(file)} deve compilar`);
    const module = { exports: {} };
    cache.set(full, module);
    vm.runInNewContext(result.outputText, {
      ...globals, module, exports: module.exports, URL, console,
      require(name) {
        if (name in dependencies) return dependencies[name];
        if (name.endsWith('/taxonomy')) return { getNextSteps: () => [] };
        if (name.startsWith('.')) {
          const candidate = path.resolve(path.dirname(full), name);
          return load([candidate, `${candidate}.tsx`, `${candidate}.ts`].find(item => fs.existsSync(item)));
        }
        throw new Error(`Import inesperado no teste: ${name}`);
      },
    }, { filename: file });
    return module.exports;
  };
}
function harness(name, { href = origin + '/areas/', storedPersona, storageBlocked = false, reduce = false } = {}) {
  const hooks = [];
  let cursor = 0, dirty = false, jobs = [], tree, props = {}, disposed = false;
  const document = { ...eventHub(), activeElement: null };
  let currentUrl = new URL(href);
  const storage = new Map(storedPersona ? [['pp_persona', storedPersona]] : []);
  const historyState = { astro: { index: 2 }, marker: 'preservar' };
  const window = {
    ...eventHub(),
    location: { get href() { return currentUrl.href; }, get pathname() { return currentUrl.pathname; } },
    history: { state: historyState, writes: [], replaceState(state, _, value) { this.state = state; currentUrl = new URL(String(value)); this.writes.push(currentUrl.href); } },
    localStorage: {
      getItem(key) { if (storageBlocked) throw new Error('Storage indisponível'); return storage.get(key) ?? null; },
      setItem(key, value) { if (storageBlocked) throw new Error('Storage indisponível'); storage.set(key, value); },
      removeItem(key) { if (storageBlocked) throw new Error('Storage indisponível'); storage.delete(key); },
    },
    timers: [],
    setTimeout(callback) { this.timers.push(callback); return this.timers.length; },
    clearTimeout() {},
    requestAnimationFrame(callback) { callback(); },
  };
  const react = {
    useState(initial) {
      const index = cursor++;
      if (!hooks[index]) hooks[index] = { value: typeof initial === 'function' ? initial() : initial };
      return [hooks[index].value, value => {
        assert.equal(disposed, false, 'não atualizar componente desmontado');
        const next = typeof value === 'function' ? value(hooks[index].value) : value;
        if (!Object.is(next, hooks[index].value)) { hooks[index].value = next; dirty = true; }
      }];
    },
    useRef(initial) { const index = cursor++; return hooks[index] ||= { current: initial }; },
    useId() { const index = cursor++; return `teste-${index}`; },
    useMemo(callback, deps) {
      const index = cursor++;
      if (!equalDeps(hooks[index]?.deps, deps)) hooks[index] = { value: callback(), deps };
      return hooks[index].value;
    },
    useEffect(callback, deps) {
      const index = cursor++;
      if (!equalDeps(hooks[index]?.deps, deps)) jobs.push(() => {
        hooks[index]?.cleanup?.();
        hooks[index] = { deps, cleanup: callback() };
      });
    },
  };
  const jsx = (type, props = {}) => {
    const node = { type, props };
    node.element = {
      id: props.id, textContent: text(props.children), focusCount: 0, scrollCount: 0,
      focus() { this.focusCount++; document.activeElement = this; },
      scrollIntoView(options) { this.scrollCount++; this.scrollOptions = options; },
    };
    if (typeof props.ref === 'function') props.ref(node.element);
    else if (props.ref) props.ref.current = node.element;
    return node;
  };
  class CustomEvent {
    constructor(type, options) { this.type = type; this.detail = options?.detail; }
  }
  const load = modules({
    react,
    'react/jsx-runtime': { jsx, jsxs: jsx, Fragment: 'fragment' },
    'motion/react': { motion: new Proxy({}, { get: (_, tag) => `motion.${String(tag)}` }), AnimatePresence: 'AnimatePresence', useReducedMotion: () => reduce },
  }, { window, document, CustomEvent });
  const component = load(path.join(componentDir, name + '.tsx')).default;
  function render(nextProps = props) {
    props = nextProps;
    let passes = 0;
    do {
      assert.ok(passes++ < 15, 'efeitos devem estabilizar');
      cursor = 0; dirty = false; jobs = [];
      tree = component(props);
      jobs.forEach(job => job());
    } while (dirty);
    return tree;
  }
  return {
    render, get tree() { return tree; }, window, document, storage, historyState,
    all: predicate => walk(tree, predicate),
    role: role => walk(tree, node => node.props?.role === role),
    button(label) { return walk(tree, node => (node.type === 'button' || node.type === 'motion.button') && text(node) === label)[0]; },
    click(node) { assert.ok(node, 'controle deve existir'); node.props.onClick?.(); render(); },
    key(node, key) { let prevented = false; node.props.onKeyDown({ key, preventDefault() { prevented = true; } }); render(); return prevented; },
    navigate(url, event = 'popstate') {
      currentUrl = new URL(url, origin);
      (event === 'popstate' ? window : document).dispatchEvent({ type: event });
      render();
    },
    dispose() { hooks.forEach(hook => hook?.cleanup?.()); disposed = true; },
  };
}
function check(name, fn) { fn(); checks.push(name); console.log(`OK: ${name}`); }
const chipGroup = (h, label) => h.all(node => node.type?.name === 'FilterChips' && node.props.label === label)[0];
const areaLinks = h => h.all(node => node.type === 'motion.a');
const areaSearch = h => h.all(node => node.type === 'input' && node.props.type === 'search')[0];
const question = h => h.role('radiogroup')[0]?.props['aria-labelledby'];
const selected = h => h.role('radio').findIndex(node => node.props['aria-checked']);
const panels = h => h.all(node => node.type?.name === 'PersonaPanel');

check('SSR mantém 18 áreas, filtros, quiz inicial e perfis sem executar efeitos', () => {
  const React = require('react');
  const { renderToString } = require('react-dom/server');
  const load = modules({ react: React, 'react/jsx-runtime': require('react/jsx-runtime'), 'motion/react': require('motion/react') });
  const areas = renderToString(React.createElement(load(path.join(componentDir, 'AreasFilteredGrid.tsx')).default));
  assert.equal((areas.match(/href="\/areas\//g) || []).length, 18);
  assert.match(areas, /Filtrar áreas por nome ou subárea/);
  const quiz = renderToString(React.createElement(load(path.join(componentDir, 'QuizQualMBA.tsx')).default));
  assert.match(quiz, /Iniciar quiz/);
  assert.doesNotMatch(quiz, /role="radiogroup"/);
  const persona = renderToString(React.createElement(load(path.join(componentDir, 'PersonaQuickPicker.tsx')).default));
  const labels = [...persona.matchAll(/aria-label="Usar perfil: ([^"]+)"/g)].map(match => match[1]);
  assert.equal(labels.length, 4);
  assert.equal(new Set(labels).size, 4);
});

check('URL restaura busca e cluster, preservando fragmento, parâmetros e estado Astro', () => {
  const h = harness('AreasFilteredGrid', { href: origin + '/areas/?utm_source=auditoria&q=neuro&cluster=neuro-avaliacao#lista' });
  h.render();
  assert.equal(areaSearch(h).props.value, 'neuro');
  assert.equal(chipGroup(h, 'Cluster').props.value, 'neuro-avaliacao');
  assert.equal(areaLinks(h).length, 3);
  assert.equal(new URL(h.window.location.href).searchParams.get('utm_source'), 'auditoria');
  assert.equal(new URL(h.window.location.href).hash, '#lista');
  assert.equal(h.window.history.state, h.historyState);
});

check('filtros modificados ficam compartilháveis e limpeza devolve foco à busca', () => {
  const h = harness('AreasFilteredGrid', { href: origin + '/areas/?externo=1#areas' });
  h.render();
  areaSearch(h).props.onChange({ target: { value: 'neuro' } }); h.render();
  chipGroup(h, 'Cluster').props.onChange('neuro-avaliacao'); h.render();
  assert.equal(new URL(h.window.location.href).searchParams.get('q'), 'neuro');
  assert.equal(areaLinks(h).length, 3);
  h.click(h.button('Limpar filtros'));
  assert.equal(areaLinks(h).length, 18);
  assert.equal(h.window.location.href, origin + '/areas/?externo=1#areas');
  assert.equal(h.document.activeElement.id, areaSearch(h).props.id);
});

check('parâmetros desconhecidos de filtro voltam à lista completa sem criar opções', () => {
  const h = harness('AreasFilteredGrid', { href: origin + '/areas/?cluster=inexistente&reg=R99&externo=1#x' });
  h.render();
  assert.equal(chipGroup(h, 'Cluster').props.value, 'all');
  assert.equal(chipGroup(h, 'Regulação').props.value, 'all');
  assert.equal(areaLinks(h).length, 18);
  assert.equal(h.window.location.href, origin + '/areas/?externo=1#x');
});

check('popstate e astro:page-load sincronizam filtros sem duplicar listeners', () => {
  const h = harness('AreasFilteredGrid'); h.render(); h.render();
  assert.equal(h.window.listeners.get('popstate').size, 1);
  assert.equal(h.document.listeners.get('astro:page-load').size, 1);
  h.navigate('/areas/?q=neuro&cluster=neuro-avaliacao#x');
  assert.equal(areaLinks(h).length, 3);
  h.navigate('/areas/?reg=R3&origem=teste', 'astro:page-load');
  assert.equal(areaSearch(h).props.value, '');
  assert.equal(chipGroup(h, 'Regulação').props.value, 'R3');
  assert.ok(areaLinks(h).length < 18 && areaLinks(h).length > 0);
  h.dispose();
  assert.equal(h.window.listeners.get('popstate').size, 0);
  assert.equal(h.document.listeners.get('astro:page-load').size, 0);
});

check('componente antigo não reescreve a URL de outra página durante navegação', () => {
  const h = harness('AreasFilteredGrid'); h.render();
  h.navigate('/mbas/?origem=areas#lista', 'astro:page-load');
  areaSearch(h).props.onChange({ target: { value: 'neuro' } }); h.render();
  assert.equal(h.window.location.href, origin + '/mbas/?origem=areas#lista');
});

check('estado vazio de áreas permite recuperação completa', () => {
  const h = harness('AreasFilteredGrid'); h.render();
  areaSearch(h).props.onChange({ target: { value: 'termo-inexistente-xyz' } }); h.render();
  assert.equal(areaLinks(h).length, 0);
  assert.match(text(h.tree), /Nenhuma área encontrada/);
  h.click(h.button('Limpar filtros'));
  assert.equal(areaLinks(h).length, 18);
});

check('chips controlados refletem limpeza externa e mantêm navegação por teclado', () => {
  const options = [{ id: 'all', label: 'Todas' }, { id: 'neuro', label: 'Neuro' }, { id: 'outra', label: 'Outra' }];
  let changed;
  const h = harness('FilterChips');
  h.render({ options, value: 'neuro', controls: 'resultados', onChange: value => { changed = value; } });
  assert.equal(h.button('Neuro').props['aria-pressed'], true);
  h.click(h.button('Outra'));
  assert.equal(changed, 'outra');
  assert.equal(h.button('Neuro').props['aria-pressed'], true, 'valor controlado pertence ao pai');
  assert.equal(h.key(h.button('Todas'), 'End'), true);
  assert.equal(h.document.activeElement.textContent, 'Outra');
  assert.equal(h.document.activeElement.scrollCount, 1);
  h.render({ options, value: 'all', controls: 'resultados' });
  assert.equal(h.button('Todas').props['aria-pressed'], true);
  assert.equal(h.button('Todas').props['aria-controls'], 'resultados');
});

check('chips sem controle continuam selecionáveis e lista vazia é válida', () => {
  const h = harness('FilterChips');
  h.render({ options: [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }] });
  assert.equal(h.button('A').props['aria-pressed'], true);
  h.click(h.button('B'));
  assert.equal(h.button('B').props['aria-pressed'], true);
  h.render({ options: [] });
  assert.match(text(h.tree), /Nenhum filtro disponível/);
});

check('quiz exige seleção e confirmação explícita, sem timer de avanço', () => {
  const h = harness('QuizQualMBA'); h.render(); h.click(h.button('Iniciar quiz'));
  assert.equal(h.button('Continuar').props.disabled, true);
  const firstQuestion = question(h);
  h.click(h.button('Continuar'));
  assert.equal(question(h), firstQuestion);
  h.click(h.role('radio')[1]);
  assert.equal(selected(h), 1);
  assert.equal(question(h), firstQuestion);
  assert.equal(h.button('Continuar').props.disabled, false);
  assert.equal(h.window.timers.length, 0);
  assert.equal(h.document.activeElement.id, firstQuestion);
});

check('setas selecionam o radio e Voltar conserva a resposta escolhida', () => {
  const h = harness('QuizQualMBA'); h.render(); h.click(h.button('Iniciar quiz'));
  assert.equal(h.key(h.role('radio')[0], 'ArrowDown'), true);
  assert.equal(selected(h), 1);
  assert.match(h.document.activeElement.textContent, /Estou cursando Psicologia/);
  h.click(h.button('Continuar'));
  assert.match(question(h), /q2-area-atual/);
  assert.equal(selected(h), -1);
  h.click(h.role('radio')[2]);
  h.click(h.button('← Voltar'));
  assert.match(question(h), /q1-formacao/);
  assert.equal(selected(h), 1);
  h.click(h.button('Continuar'));
  assert.equal(selected(h), 2);
});

check('quiz conclui dez respostas, permite revisão e devolve foco no reinício', () => {
  const h = harness('QuizQualMBA'); h.render(); h.click(h.button('Iniciar quiz'));
  for (let index = 0; index < 10; index++) {
    assert.match(text(h.tree), new RegExp(`Pergunta ${index + 1} de 10`));
    h.click(h.role('radio')[0]);
    h.click(h.button(index === 9 ? 'Ver resultado' : 'Continuar'));
  }
  assert.equal(h.role('radiogroup').length, 0);
  assert.match(h.document.activeElement.textContent, /Encaixe principal:/);
  assert.equal(h.role('region').length, 1);
  h.click(h.button('Revisar respostas'));
  assert.match(text(h.tree), /Pergunta 10 de 10/);
  assert.equal(selected(h), 0);
  h.click(h.button('Reiniciar'));
  assert.equal(h.document.activeElement.textContent, 'Iniciar quiz');
  h.click(h.button('Iniciar quiz'));
  assert.equal(selected(h), -1);
});

check('pergunta e contador mudam juntos; movimento reduzido elimina transição', () => {
  const h = harness('QuizQualMBA', { reduce: true }); h.render(); h.click(h.button('Iniciar quiz'));
  h.click(h.role('radio')[0]); h.click(h.button('Continuar'));
  assert.match(question(h), /q2-area-atual/);
  assert.match(text(h.tree), /Pergunta 2 de 10/);
  assert.equal(h.all(node => node.type === 'AnimatePresence').length, 0);
  const questionAnimation = h.all(node => node.type === 'motion.div' && node.props.transition?.duration === 0 && node.props.initial === false);
  assert.ok(questionAnimation.length >= 1);
  assert.ok(h.all(node => typeof node.type === 'string' && node.type.startsWith('motion.')).every(node => !node.props.exit));
});

check('trocas do quiz mantêm o alvo focado e visível, inclusive com movimento reduzido', () => {
  for (const reduce of [false, true]) {
    const h = harness('QuizQualMBA', { reduce }); h.render();
    assert.equal(h.document.activeElement, null, 'SSR e montagem não devem roubar foco');
    h.click(h.button('Iniciar quiz'));
    for (let index = 0; index < 10; index++) {
      const target = h.document.activeElement;
      assert.equal(target.id, question(h));
      assert.equal(target.scrollCount, 1);
      assert.equal(target.scrollOptions.behavior, 'instant');
      assert.equal(target.scrollOptions.block, 'start');
      h.click(h.role('radio')[0]);
      h.click(h.button(index === 9 ? 'Ver resultado' : 'Continuar'));
    }
    assert.match(h.document.activeElement.textContent, /Encaixe principal:/);
    assert.equal(h.document.activeElement.scrollCount, 1);
    h.click(h.button('Revisar respostas'));
    assert.equal(h.document.activeElement.id, question(h));
    assert.equal(h.document.activeElement.scrollCount, 1);
    h.click(h.button('Reiniciar'));
    assert.equal(h.document.activeElement.textContent, 'Iniciar quiz');
    assert.equal(h.document.activeElement.scrollCount, 1);
  }
});

check('perfil armazenado inválido não cria seleção fantasma', () => {
  const h = harness('PersonaQuickPicker', { storedPersona: 'perfil-removido' }); h.render();
  assert.equal(panels(h).filter(node => node.props.isActive).length, 0);
  assert.equal(h.button('Limpar seleção'), undefined);
  assert.match(text(h.role('status')[0]), /Nenhum perfil selecionado/);
});

check('perfil sincroniza escolha, storage externo e limpeza com foco', () => {
  const h = harness('PersonaQuickPicker', { storedPersona: 'rh' }); h.render(); h.render();
  assert.equal(panels(h).find(node => node.props.isActive).props.card.id, 'rh');
  assert.equal(h.window.listeners.get('pp:persona-change').size, 1);
  assert.equal(h.window.listeners.get('storage').size, 1);
  panels(h).find(node => node.props.card.id === 'psicologos').props.onSelect(); h.render();
  assert.equal(h.storage.get('pp_persona'), 'psicologos');
  h.window.dispatchEvent({ type: 'storage', key: 'pp_persona', newValue: 'lideres' }); h.render();
  assert.equal(panels(h).find(node => node.props.isActive).props.card.id, 'lideres');
  h.click(h.button('Limpar seleção'));
  assert.equal(h.storage.has('pp_persona'), false);
  assert.match(h.document.activeElement.textContent, /Qual desses perfis/);
  h.dispose();
  assert.equal(h.window.listeners.get('pp:persona-change').size, 0);
  assert.equal(h.window.listeners.get('storage').size, 0);
});

check('perfil continua utilizável quando localStorage está bloqueado', () => {
  const h = harness('PersonaQuickPicker', { storageBlocked: true }); h.render();
  panels(h).find(node => node.props.card.id === 'consultores').props.onSelect(); h.render();
  assert.equal(panels(h).find(node => node.props.isActive).props.card.id, 'consultores');
  assert.match(text(h.role('status')[0]), /Perfil selecionado:/);
});

console.log(`\nDescoberta: ${checks.length} cenários aprovados, sem rede ou build do site.`);
