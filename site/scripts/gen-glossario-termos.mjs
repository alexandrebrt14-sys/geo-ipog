#!/usr/bin/env node
// Gera src/generated/glossario-termos.json — dicionário termo -> URL#slug dos 7
// glossários do portal (Onda 5 SEO/GEO, 03/09/2026).
//
// Fonte: os arrays `termos`/`verbetes` declarados no frontmatter de
//   src/pages/glossario.astro, src/pages/glossario/*.astro (id + termo) e
//   src/pages/autismo/glossario.astro (termo; slug pela mesma função verbeteId da página).
// O dicionário alimenta src/lib/glossario-links.ts, que aplica o link
// termo -> verbete na primeira ocorrência do termo no corpo das páginas
// (scripts/seo-postbuild.mjs). Roda no prebuild/predev; o JSON fica versionado.
//
// Variantes de casamento por termo: o nome completo, a sigla antes de " — ",
// a expansão depois de " — " e o conteúdo entre parênteses quando parece
// expansão (2+ palavras ou sigla em maiúsculas). Palavras genéricas demais para
// virar link (STOP) e termos com "vs" ficam de fora.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pagesDir = path.join(siteRoot, 'src', 'pages');
const outFile = path.join(siteRoot, 'src', 'generated', 'glossario-termos.json');

// Mesma função de slug de src/pages/autismo/glossario.astro (verbeteId).
const verbeteId = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const FONTES = [
  { route: '/glossario/', file: 'glossario.astro', grupo: 'geral' },
  { route: '/glossario/conceitos-neuro/', file: 'glossario/conceitos-neuro.astro', grupo: 'geral' },
  { route: '/glossario/conceitos-pot/', file: 'glossario/conceitos-pot.astro', grupo: 'geral' },
  { route: '/glossario/instrumentos/', file: 'glossario/instrumentos.astro', grupo: 'geral' },
  { route: '/glossario/metodos-terapeuticos/', file: 'glossario/metodos-terapeuticos.astro', grupo: 'geral' },
  { route: '/glossario/regulacao/', file: 'glossario/regulacao.astro', grupo: 'geral' },
  { route: '/autismo/glossario/', file: 'autismo/glossario.astro', grupo: 'autismo' }
];

// Genéricos demais, ambíguos ou que já são nome de seção do portal.
const STOP = new Set([
  'atenção', 'especialização', 'pós-graduação', 'mba', 'faq regulatório', 'pessoa autista', 'assimilação',
  'compensação', 'regressão', 'me', 'mi', 'pe', 'ex', 'da', 'rey', 'masking', 'sinapse', 'dopamina',
  'serotonina', 'noradrenalina', 'neurotransmissor', 'psicanálise', 'psicodrama', 'ipog', 'mec', 'esocial',
  'ia em rh', 'gestão de pessoas', 'terapia de família', 'especialista reconhecido pelo cfp', 'subtexto e implícito',
  'interesses específicos', 'comunidade autoadvogados', 'regulação afetiva', 'reparação pós-conflito',
  'identidade encoberta', 'adulto autista', 'hipersensibilidade', 'hipossensibilidade', 'comunicação direta/literal',
  'padrões de apego', 'lobos cerebrais', 'memória semântica', 'memória episódica', 'ciclo de vida familiar',
  'ergonomia', 'microempresa', 'literal', 'e atualizações'
]);

function variantes(termo) {
  const out = new Set();
  const limpo = termo.replace(/\s+/g, ' ').trim();
  if (/\bvs\b/i.test(limpo)) return [];
  const semParen = limpo.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
  const partes = semParen.split(/\s+[—–]\s+/);
  for (const p of partes) if (p) out.add(p.trim());
  // "MCI / CCL" (barra com espaços) vira duas siglas; "CNE/CES 01/2018" fica inteiro.
  if (partes.length === 1 && /\s\/\s/.test(semParen)) for (const p of semParen.split(/\s\/\s/)) out.add(p.trim());
  for (const m of limpo.matchAll(/\(([^)]+)\)/g)) {
    const inner = m[1].trim();
    // Descarta autores/anos ("Milton, 2012", "Mikulincer e Shaver"), listas e glosas em minúsculas.
    if (/,/.test(inner) || /\d{4}/.test(inner) || /\s(e|and)\s/.test(inner) || !/^[A-Z]/.test(inner)) continue;
    const palavras = inner.split(/\s+/);
    if (palavras.length >= 2 || /^[A-Z][A-Z0-9-]{2,}$/.test(inner)) out.add(inner);
  }
  return [...out].filter(v => {
    const k = v.toLowerCase();
    if (STOP.has(k)) return false;
    if (/^[A-Z0-9][A-Z0-9.\-\/]{2,}$/.test(v)) return v.length >= 3; // sigla
    return v.length >= 5;
  });
}

const termos = [];
const vistos = new Set(); // variante (minúscula) -> já mapeada (primeiro glossário vence)
for (const f of FONTES) {
  const src = fs.readFileSync(path.join(pagesDir, f.file), 'utf-8');
  let pares;
  if (f.grupo === 'autismo') {
    pares = [...src.matchAll(/^\s{4}termo: '((?:[^'\\]|\\.)+)'/gm)].map(m => ({ id: verbeteId(m[1]), termo: m[1] }));
  } else {
    pares = [...src.matchAll(/\bid: '([^']+)',\s*\n\s*termo: '((?:[^'\\]|\\.)+)'/g)].map(m => ({ id: m[1], termo: m[2] }));
  }
  if (pares.length === 0) throw new Error(`[glossario-termos] nenhum termo em ${f.file}`);
  for (const p of pares) {
    const termo = p.termo.replace(/\\'/g, "'").replace(/&amp;/g, '&');
    const vs = variantes(termo).filter(v => {
      const k = `${f.grupo}:${v.toLowerCase()}`;
      if (vistos.has(k)) return false;
      vistos.add(k);
      return true;
    });
    if (vs.length === 0) continue;
    termos.push({ id: p.id, termo, url: `${f.route}#${p.id}`, grupo: f.grupo, variantes: vs });
  }
}

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify({
  comment: 'AUTO-GERADO por scripts/gen-glossario-termos.mjs a partir dos 7 glossários. Não editar à mão; regenerar com: npm run glossario:termos',
  termos
}, null, 2) + '\n', 'utf-8');
const nv = termos.reduce((n, t) => n + t.variantes.length, 0);
console.log(`[glossario-termos] ${termos.length} termos, ${nv} variantes -> ${path.relative(siteRoot, outFile)}`);
