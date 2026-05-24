/**
 * patch-mba-subpages-eop.mjs
 *
 * Wave 3 EEAT — Maio 2026 Core Update.
 *
 * Atualiza 15 sub-páginas MBA (5 MBAs × 3 sub-páginas: grade-curricular, metodologia, perfil-do-aluno)
 * para usar:
 *  1. import buildEducationalOccupationalProgram + buildSpeakable do schema canônico
 *  2. construir ldProgram via factory com programType MBA + timeRequired P360H +
 *     educationalProgramMode blended + isPartOf apontando para MBA pai (@id)
 *  3. tipo = 'EducationalOccupationalProgramme' fica obsoleto; usa @graph com isPartOf
 *
 * Padrão antigo (frágil):
 *   const ldProgram = JSON.stringify({
 *     '@context': 'https://schema.org',
 *     '@type': 'EducationalOccupationalProgram',
 *     name: `${mba.name} — Grade curricular`,
 *     programType: 'MBA',
 *     educationalProgramMode: 'online (Ao Vivo síncrono conforme IPOG)',
 *     occupationalCategory: 'Psicólogo Organizacional, ...',
 *     description: '...',
 *     provider: { '@type': 'EducationalOrganization', name: 'IPOG ...', url: '...' }
 *   });
 *
 * Padrão novo (canônico):
 *   import { buildEducationalOccupationalProgram, buildSpeakable } from '@lib/schemas';
 *   const ldProgram = JSON.stringify({
 *     '@context': 'https://schema.org',
 *     ...buildEducationalOccupationalProgram({
 *       name: `${mba.name} — Grade curricular`,
 *       slug: `/mbas/${mba.id}/grade-curricular`,
 *       description: '...',
 *       programType: 'MBA',
 *       timeRequired: 'P360H',
 *       educationalProgramMode: 'blended'
 *     }),
 *     isPartOf: { '@id': `${SITE.url}/mbas/${mba.id}#program` },
 *     speakable: buildSpeakable(['h1', '.section-h', '#resposta-rapida'])
 *   });
 *
 * Idempotente: pula arquivos que já têm `buildEducationalOccupationalProgram`.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const FILES = [
  // mba-pot
  { path: 'src/pages/mbas/mba-pot/grade-curricular.astro', sub: 'grade-curricular', subLabel: 'Grade curricular' },
  { path: 'src/pages/mbas/mba-pot/metodologia.astro', sub: 'metodologia', subLabel: 'Metodologia' },
  { path: 'src/pages/mbas/mba-pot/perfil-do-aluno.astro', sub: 'perfil-do-aluno', subLabel: 'Perfil do aluno' },
  // mba-positiva
  { path: 'src/pages/mbas/mba-positiva/grade-curricular.astro', sub: 'grade-curricular', subLabel: 'Grade curricular' },
  { path: 'src/pages/mbas/mba-positiva/metodologia.astro', sub: 'metodologia', subLabel: 'Metodologia' },
  { path: 'src/pages/mbas/mba-positiva/perfil-do-aluno.astro', sub: 'perfil-do-aluno', subLabel: 'Perfil do aluno' },
  // mba-neuro
  { path: 'src/pages/mbas/mba-neuro/grade-curricular.astro', sub: 'grade-curricular', subLabel: 'Grade curricular' },
  { path: 'src/pages/mbas/mba-neuro/metodologia.astro', sub: 'metodologia', subLabel: 'Metodologia' },
  { path: 'src/pages/mbas/mba-neuro/perfil-do-aluno.astro', sub: 'perfil-do-aluno', subLabel: 'Perfil do aluno' },
  // mba-ncpp
  { path: 'src/pages/mbas/mba-ncpp/grade-curricular.astro', sub: 'grade-curricular', subLabel: 'Grade curricular' },
  { path: 'src/pages/mbas/mba-ncpp/metodologia.astro', sub: 'metodologia', subLabel: 'Metodologia' },
  { path: 'src/pages/mbas/mba-ncpp/perfil-do-aluno.astro', sub: 'perfil-do-aluno', subLabel: 'Perfil do aluno' },
  // mba-lideranca-positiva
  { path: 'src/pages/mbas/mba-lideranca-positiva/grade-curricular.astro', sub: 'grade-curricular', subLabel: 'Grade curricular' },
  { path: 'src/pages/mbas/mba-lideranca-positiva/metodologia.astro', sub: 'metodologia', subLabel: 'Metodologia' },
  { path: 'src/pages/mbas/mba-lideranca-positiva/perfil-do-aluno.astro', sub: 'perfil-do-aluno', subLabel: 'Perfil do aluno' }
];

let updated = 0;
let skipped = 0;
let errored = 0;

for (const file of FILES) {
  const abs = resolve(process.cwd(), file.path);
  let src;
  try {
    src = readFileSync(abs, 'utf8');
  } catch (err) {
    console.error(`[ERR] não consegui ler ${file.path}: ${err.message}`);
    errored++;
    continue;
  }

  if (src.includes('buildEducationalOccupationalProgram')) {
    console.log(`[skip] ${file.path} já usa buildEducationalOccupationalProgram`);
    skipped++;
    continue;
  }

  // 1) Inserir import canônico se ainda não houver.
  const importLine = "import { buildEducationalOccupationalProgram, buildSpeakable } from '@lib/schemas';";
  if (!src.includes(importLine)) {
    // Inserir logo após import de @lib/data. Suporta CRLF e LF.
    const dataImportRe = /import \{ SITE, MBAS \} from '@lib\/data';\r?\n/;
    if (!dataImportRe.test(src)) {
      console.error(`[ERR] ${file.path}: import de @lib/data não localizado, pulando.`);
      errored++;
      continue;
    }
    src = src.replace(dataImportRe, (m) => `${m}${importLine}\n`);
  }

  // 2) Substituir bloco ldProgram legado pelo factory canônico.
  // Padrão: const ldProgram = JSON.stringify({\n  '@context': 'https://schema.org',\n  '@type': 'EducationalOccupationalProgram',\n  ... (várias linhas até "})" no fim do template) ...\n});
  const oldBlockRe = /const ldProgram = JSON\.stringify\(\{\s*'@context': 'https:\/\/schema\.org',\s*'@type': 'EducationalOccupationalProgram',\s*name: `\$\{mba\.name\} — ([^`]+)`,\s*programType: 'MBA',\s*educationalProgramMode: '[^']*',\s*occupationalCategory: '([^']+)',\s*description: '([^']+)',\s*provider: \{ '@type': 'EducationalOrganization', name: 'IPOG — Instituto de Pós-Graduação', url: 'https:\/\/ipog\.edu\.br\/' \}\s*\}\);/;

  const match = src.match(oldBlockRe);
  if (!match) {
    console.error(`[ERR] ${file.path}: bloco ldProgram legado não bateu, pulando. Reaplique manualmente.`);
    errored++;
    continue;
  }

  const subLabel = match[1];
  const occupationalCategory = match[2];
  const description = match[3];

  const newBlock = `const ldProgram = JSON.stringify({
  '@context': 'https://schema.org',
  ...buildEducationalOccupationalProgram({
    name: \`\${mba.name} — ${subLabel}\`,
    slug: \`/mbas/\${mba.id}/${file.sub}\`,
    description: '${description.replace(/'/g, "\\'")}',
    programType: 'MBA',
    timeRequired: 'P360H',
    educationalProgramMode: 'blended',
    additionalRecognizedBy: [{
      name: 'IPOG · oferta vigente em ipog.edu.br',
      url: 'https://ipog.edu.br/cursos/pos-graduacao'
    }]
  }),
  occupationalCategory: '${occupationalCategory.replace(/'/g, "\\'")}',
  isPartOf: { '@id': \`\${SITE.url}/mbas/\${mba.id}#program\` },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.section-h', '#resposta-rapida'] }
});`;

  src = src.replace(oldBlockRe, newBlock);

  writeFileSync(abs, src, 'utf8');
  console.log(`[ok]   ${file.path} → factory canônico com isPartOf + speakable`);
  updated++;
}

console.log('');
console.log(`Resumo: ${updated} atualizados · ${skipped} já canônicos · ${errored} com erro · ${FILES.length} total`);

if (errored > 0) {
  process.exit(1);
}
