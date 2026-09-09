#!/usr/bin/env node
// Gate pós-build: o lançador só pode alcançar a busca pesada por import dinâmico.
// Usa Acorn presente no lockfile para seguir imports/exports estáticos reais.
// Uso: node scripts/check-search-bundle.mjs [--json] [--self-test]
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { gzipSync } from 'node:zlib';
import { parse } from 'acorn';

const forbiddenName = /(?:SearchOverlay|search-index|search-engine|taxonomy|use-reduced-motion|(?:^|[/.])motion(?:[/.]|$))/i;

export function collectStaticModules(entry, readModule) {
  const modules = new Set();
  const dynamicImports = [];
  const externalImports = new Set();
  const visit = file => {
    if (modules.has(file)) return;
    modules.add(file);
    const tree = parse(readModule(file), { ecmaVersion: 'latest', sourceType: 'module' });
    const walk = node => {
      if (!node || typeof node !== 'object') return;
      if (node.type === 'ImportExpression' && typeof node.source?.value === 'string') dynamicImports.push({ from: file, source: node.source.value });
      for (const value of Object.values(node)) {
        if (Array.isArray(value)) value.forEach(walk);
        else if (value && typeof value === 'object') walk(value);
      }
    };
    walk(tree);
    for (const node of tree.body) {
      if (!['ImportDeclaration', 'ExportNamedDeclaration', 'ExportAllDeclaration'].includes(node.type) || !node.source) continue;
      const specifier = node.source.value;
      if (specifier.startsWith('.')) visit(path.posix.normalize(path.posix.join(path.posix.dirname(file), specifier)));
      else if (specifier.startsWith('/')) visit(specifier.replace(/^\/+/, ''));
      else externalImports.add(specifier);
    }
  };
  visit(entry);
  return { modules: [...modules], dynamicImports, externalImports: [...externalImports] };
}

export function inspectSearchBundle(distDir) {
  const html = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
  const entryUrl = [...html.matchAll(/component-url="([^"]*SearchLauncher\.[^"]+\.js)"/g)][0]?.[1];
  assert(entryUrl, 'A home gerada deve usar a ilha SearchLauncher. Execute o build atualizado.');
  const entry = entryUrl.replace(/^\//, '');
  const root = path.resolve(distDir);
  const read = relative => {
    const absolute = path.resolve(root, relative);
    assert(absolute.startsWith(root + path.sep), `Import fora do build: ${relative}`);
    return fs.readFileSync(absolute, 'utf8');
  };
  const graph = collectStaticModules(entry, read);
  const forbidden = [...graph.modules, ...graph.externalImports].filter(file => forbiddenName.test(file));
  assert.equal(forbidden.length, 0, `Busca pesada na árvore estática do lançador: ${forbidden.join(', ')}`);
  assert(graph.dynamicImports.some(item => /SearchOverlay\.[^/]+\.js$/.test(item.source)), 'O overlay deve permanecer em um chunk de import dinâmico.');
  const modules = graph.modules.map(file => {
    const code = Buffer.from(read(file));
    return { file, bytes: code.length, gzipBytes: gzipSync(code).length };
  });
  return {
    entry,
    staticModules: modules,
    staticBytes: modules.reduce((sum, item) => sum + item.bytes, 0),
    staticGzipBytes: modules.reduce((sum, item) => sum + item.gzipBytes, 0),
    dynamicImports: graph.dynamicImports,
    forbiddenStaticModules: forbidden,
  };
}

function selfTest() {
  const files = {
    'assets/SearchLauncher.js': 'import { value } from "./react.js"; export const start=()=>import("./SearchOverlay.js");',
    'assets/react.js': 'export const value=1;',
    'assets/SearchOverlay.js': 'import "./search-index.js";',
    'assets/search-index.js': 'export const index=[];',
  };
  const graph = collectStaticModules('assets/SearchLauncher.js', file => files[file]);
  assert.deepEqual(graph.modules, ['assets/SearchLauncher.js', 'assets/react.js']);
  assert.equal(graph.dynamicImports.length, 1);
  assert.equal(graph.modules.some(file => forbiddenName.test(file)), false);
  files['assets/react.js'] = 'export * from "./search-index.js";';
  assert(collectStaticModules('assets/SearchLauncher.js', file => files[file]).modules.some(file => forbiddenName.test(file)));
  files['assets/search-index.js'] = 'export * from "./react.js";';
  assert.equal(collectStaticModules('assets/SearchLauncher.js', file => files[file]).modules.length, 3);
  return { passed: 3, checks: ['Imports dinâmicos ficam fora da árvore inicial.', 'Reexports estáticos pesados são detectados.', 'Ciclos não causam recursão infinita.'] };
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  const report = process.argv.includes('--self-test')
    ? selfTest()
    : inspectSearchBundle(fileURLToPath(new URL('../dist/', import.meta.url)));
  if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
  else if ('passed' in report) console.log(`${report.passed} testes do gate de bundle passaram.`);
  else console.log(`Lançador: ${report.staticBytes} bytes estáticos em ${report.staticModules.length} módulos; overlay e índice permanecem sob demanda.`);
}
