#!/usr/bin/env node
// Valida JavaScript inline clássico e módulos no HTML final, após o build.
// Acorn já faz parte do lockfile do site; nenhuma dependência adicional.
// Uso: node scripts/check-inline-scripts.mjs [--json] [--dist caminho]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parse } from 'acorn';

function attribute(attributes, name) {
  const match = attributes.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return match ? match[1] ?? match[2] ?? match[3] : null;
}

export function checkInlineScripts(pages) {
  const scripts = new Map();
  let instances = 0;
  for (const { route, html } of pages) {
    for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
      const attributes = match[1];
      const code = match[2];
      const type = (attribute(attributes, 'type') || '').trim().toLowerCase();
      if (attribute(attributes, 'src') !== null || !code.trim()) continue;
      if (type && type !== 'module' && !/^(?:text|application)\/(?:x-)?(?:java|ecma)script(?:1\.[0-5])?$/.test(type)) continue;
      instances++;
      const sourceType = type === 'module' ? 'module' : 'script';
      const key = `${sourceType}\0${code}`;
      if (scripts.has(key)) {
        scripts.get(key).routes.add(route);
        continue;
      }
      const record = { routes: new Set([route]), sourceType, error: null };
      try {
        parse(code, { ecmaVersion: 'latest', sourceType, locations: true });
      } catch (error) {
        record.error = {
          message: error.message,
          line: error.loc?.line ?? null,
          column: error.loc?.column ?? null,
          excerpt: code.split('\n').slice(Math.max(0, (error.loc?.line ?? 1) - 2), (error.loc?.line ?? 1) + 1).join('\n').slice(0, 800),
        };
      }
      scripts.set(key, record);
    }
  }
  const errors = [...scripts.values()].filter(record => record.error).map(record => ({
    routes: [...record.routes],
    sourceType: record.sourceType,
    ...record.error,
  }));
  return { htmlPages: pages.length, scriptInstances: instances, uniqueScripts: scripts.size, invalidScripts: errors.length, errors };
}

function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(absolute);
    return entry.isFile() && entry.name.endsWith('.html') ? [absolute] : [];
  });
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  const args = process.argv.slice(2);
  const distArgument = args.indexOf('--dist');
  if (distArgument >= 0 && !args[distArgument + 1]) throw new Error('Informe o diretório depois de --dist.');
  const distDir = distArgument >= 0
    ? path.resolve(args[distArgument + 1])
    : fileURLToPath(new URL('../dist/', import.meta.url));
  const pages = htmlFiles(distDir).map(file => ({
    route: '/' + path.relative(distDir, file).replace(/\\/g, '/').replace(/index\.html$/, ''),
    html: fs.readFileSync(file, 'utf8'),
  }));
  if (!pages.length) throw new Error('Nenhum HTML encontrado. Execute o build antes da verificação.');
  const report = checkInlineScripts(pages);
  if (args.includes('--json')) console.log(JSON.stringify(report, null, 2));
  else {
    console.log(`${report.htmlPages} páginas, ${report.scriptInstances} scripts inline e ${report.uniqueScripts} conteúdos únicos: ${report.invalidScripts} erros de sintaxe.`);
    for (const error of report.errors) console.error(`${error.routes.join(', ')}: ${error.message}\n${error.excerpt}`);
  }
  process.exitCode = report.invalidScripts ? 1 : 0;
}
