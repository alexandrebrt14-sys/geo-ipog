import fs from 'node:fs';
import path from 'node:path';

const SRC = path.resolve('src');
const EXTS = new Set(['.astro', '.tsx', '.ts', '.css']);

// Correcoes cirurgicas: paths ASCII + ortografia.
const SUBS = [
  // URLs (paths sempre ASCII)
  [/\/regulação/g, '/regulacao'],
  [/\/áreas/g, '/areas'],
  [/\/educação/g, '/educacao'],
  [/\/saúde/g, '/saude'],
  [/\/áreas\$\{/g, '/areas${'],

  // Identifier TS: t.área deve ser t.area (campo do objeto)
  [/t\.área/g, 't.area'],
  [/a\.área/g, 'a.area'],
  // Strings: id 'áreas' nao deveria existir
  [/\bárea: PsychologyArea/g, 'area: PsychologyArea'],

  // ortografia: especializacao -> especialização
  [/Especializacao/g, 'Especialização'],
  [/especializacao/g, 'especialização'],

  // outras
  [/Matrículas é ofertas/g, 'Matrículas e ofertas'],
  [/publicamos é o que não/g, 'publicamos e o que não'],
  [/que e pós/g, 'que é pós'],
  [/o que e o que não/g, 'o que é o que não'],
  [/Niveis\b/g, 'Níveis'],
  [/niveis\b/g, 'níveis'],
  [/nivel\b/g, 'nível'],
  [/favoravel\b/g, 'favorável'],
  [/diferente\b/g, 'diferente'],

  // pequeno fix para variavel slug: id deve ser 'areas' nao 'áreas'
  [/'áreas'/g, "'areas'"],
  [/áreas:/g, 'areas:'],
  [/\báreas\b: '/g, "areas: '"]
];

function processFile(file) {
  let content = fs.readFileSync(file, 'utf-8');
  const original = content;
  for (const [pat, repl] of SUBS) content = content.replace(pat, repl);
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf-8');
    return true;
  }
  return false;
}

function walk(dir) {
  let changed = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) changed += walk(full);
    else if (EXTS.has(path.extname(entry.name))) {
      if (processFile(full)) { console.log('  ✓', path.relative(SRC, full)); changed++; }
    }
  }
  return changed;
}

console.log('Corrigindo URLs e ortografia...');
const changed = walk(SRC);
console.log(`${changed} arquivos atualizados.`);
