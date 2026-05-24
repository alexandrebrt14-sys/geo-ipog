/**
 * patch-ymyl-disclaimer.mjs
 *
 * Wave 3 EEAT — Maio 2026 Core Update.
 *
 * Injeta o componente <YMYLDisclaimer /> em todas as páginas YMYL clínicas do hub /autismo:
 *  - 6 artigos /autismo/artigos/*.astro
 *  - hub /autismo/index.astro
 *  - 3 portas de audiência /autismo/para-*
 *
 * Estratégia:
 *  1. Adicionar import do componente após imports existentes (idempotente).
 *  2. Inserir <YMYLDisclaimer ... /> logo após o primeiro <AuthorBox ... />.
 *
 * Idempotente: pula se já existe <YMYLDisclaimer.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const FILES = [
  // 6 artigos
  'src/pages/autismo/artigos/diagnostico-tardio-adulto-2026.astro',
  'src/pages/autismo/artigos/relacionamentos-amorosos-nt-autista-2026.astro',
  'src/pages/autismo/artigos/camuflagem-masking-cat-q-adulto-2026.astro',
  'src/pages/autismo/artigos/vida-cotidiana-trabalho-autista-adulto-2026.astro',
  'src/pages/autismo/artigos/clinica-tea-adulto-evidencia-2026.astro',
  'src/pages/autismo/artigos/fronteira-pesquisa-tea-adulto-2026.astro',
  // hub + 3 portas
  'src/pages/autismo/index.astro',
  'src/pages/autismo/para-pacientes/index.astro',
  'src/pages/autismo/para-profissionais/index.astro',
  'src/pages/autismo/para-pesquisadores/index.astro'
];

const IMPORT_LINE = "import YMYLDisclaimer from '@components/YMYLDisclaimer.astro';";

let updated = 0;
let skipped = 0;
let errored = 0;

for (const rel of FILES) {
  const abs = resolve(process.cwd(), rel);
  let src;
  try {
    src = readFileSync(abs, 'utf8');
  } catch (err) {
    console.error(`[ERR] não consegui ler ${rel}: ${err.message}`);
    errored++;
    continue;
  }

  if (src.includes('<YMYLDisclaimer')) {
    console.log(`[skip] ${rel} já tem <YMYLDisclaimer />`);
    skipped++;
    continue;
  }

  // 1) Adicionar import logo após o último import do bloco --- frontmatter.
  if (!src.includes(IMPORT_LINE)) {
    // Inserir após import AuthorBox.
    const authorBoxRe = /import AuthorBox from '@components\/AuthorBox\.astro';\r?\n/;
    if (authorBoxRe.test(src)) {
      src = src.replace(authorBoxRe, (m) => `${m}${IMPORT_LINE}\n`);
    } else {
      // Fallback: inserir antes do segundo --- (fim do frontmatter).
      const frontMatterEnd = src.indexOf('---', 4);
      if (frontMatterEnd === -1) {
        console.error(`[ERR] ${rel}: não localizei fim do frontmatter`);
        errored++;
        continue;
      }
      src = src.slice(0, frontMatterEnd) + IMPORT_LINE + '\n' + src.slice(frontMatterEnd);
    }
  }

  // 2) Inserir <YMYLDisclaimer .../> logo após o primeiro <AuthorBox .../>.
  // Padrão: <AuthorBox\n      ...\n      reviewedBy="alexandre"\n    />
  const authorBoxBlockRe = /<AuthorBox\s+author="larissa"[\s\S]*?\/>\r?\n/;
  const match = src.match(authorBoxBlockRe);
  if (!match) {
    console.error(`[ERR] ${rel}: não encontrei <AuthorBox author="larissa" .../>`);
    errored++;
    continue;
  }

  const disclaimer = `
    <YMYLDisclaimer
      domain="autismo"
      reviewerName="Larissa Caramaschi"
      reviewerHref="/autismo/sobre-larissa/"
      lastReviewed="2026-05-24"
    />
`;

  src = src.replace(authorBoxBlockRe, (m) => `${m}${disclaimer}`);

  writeFileSync(abs, src, 'utf8');
  console.log(`[ok]   ${rel} → YMYLDisclaimer injetado`);
  updated++;
}

console.log('');
console.log(`Resumo: ${updated} atualizados · ${skipped} já com disclaimer · ${errored} com erro · ${FILES.length} total`);

if (errored > 0) {
  process.exit(1);
}
