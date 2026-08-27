#!/usr/bin/env node
/**
 * sync-entity-canonical.mjs — regenera src/data/entity-canonical.json a partir da
 * FONTE ÚNICA de entidade (repo landing-page-geo, domínio alexandrecaramaschi.com).
 *
 * Fonte hoje (derivação local, Onda 2):
 *   - Person:       landing-page-geo/src/lib/schemas/person-alexandre.ts (alexandrePersonBase)
 *                   + credenciais de formação do nó Person de JsonLdFull.tsx (mesmo @id;
 *                   os dois nós se fundem na extração, então a união é o canônico efetivo).
 *   - Organization: nó "https://brasilgeo.ai/#organization" de JsonLd.tsx (conjunto mínimo,
 *                   subconjunto literal do grafo completo).
 *
 * TODO(entidade): quando https://alexandrecaramaschi.com/.well-known/entity-canonical.json
 * estiver publicado, trocar a derivação local pela leitura desse arquivo (bloco
 * `fetchRemote` abaixo já tenta primeiro; hoje devolve 404 e cai na derivação local).
 *
 * Uso: node scripts/sync-entity-canonical.mjs [--source-repo <caminho do landing-page-geo>]
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { transform } from 'esbuild';

const here = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(here, '../src/data/entity-canonical.json');
const REMOTE = 'https://alexandrecaramaschi.com/.well-known/entity-canonical.json';
const argIdx = process.argv.indexOf('--source-repo');
const SOURCE_REPO = resolve(
  argIdx > -1 ? process.argv[argIdx + 1] : process.env.ENTITY_SOURCE_REPO || resolve(here, '../../../landing-page-geo')
);

async function fetchRemote() {
  try {
    const r = await fetch(REMOTE, { headers: { accept: 'application/json' } });
    if (!r.ok) return null;
    const j = await r.json();
    if (j && j.person && j.organization) return j;
  } catch {}
  return null;
}

/** Avalia um trecho de literal JS (array/objeto) extraído por regex de um .tsx. */
function evalLiteral(src, DOMAIN = 'https://alexandrecaramaschi.com') {
  // eslint-disable-next-line no-new-func
  return new Function('DOMAIN', `return (${src});`)(DOMAIN);
}

/** Extrai o bloco `hasCredential: [ ... ]` (com colchetes balanceados) a partir de um índice. */
function sliceBalanced(text, start, open, close) {
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    if (text[i] === open) depth++;
    else if (text[i] === close) {
      depth--;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }
  throw new Error('bloco não balanceado');
}

async function deriveLocal() {
  const personTs = resolve(SOURCE_REPO, 'src/lib/schemas/person-alexandre.ts');
  const fullTsx = resolve(SOURCE_REPO, 'src/components/JsonLdFull.tsx');
  const minTsx = resolve(SOURCE_REPO, 'src/components/JsonLd.tsx');
  for (const p of [personTs, fullTsx, minTsx]) {
    if (!existsSync(p)) throw new Error(`fonte única ausente: ${p}`);
  }

  // 1) Person canônica: transpila o .ts e importa como módulo em memória.
  const { code } = await transform(readFileSync(personTs, 'utf8'), { loader: 'ts', format: 'esm' });
  const mod = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
  const person = JSON.parse(JSON.stringify(mod.alexandrePersonBase));

  // 2) Credenciais de formação declaradas no segundo nó Person (JsonLdFull.tsx, mesmo @id).
  const full = readFileSync(fullTsx, 'utf8');
  const idx = full.indexOf('hasCredential: [');
  if (idx < 0) throw new Error('hasCredential não encontrado em JsonLdFull.tsx');
  const eduCreds = evalLiteral(sliceBalanced(full, full.indexOf('[', idx), '[', ']'));
  const seen = new Set(person.hasCredential.map((c) => c.name));
  for (const c of eduCreds) if (!seen.has(c.name)) { person.hasCredential.push(c); seen.add(c.name); }

  // 3) Organization Brasil GEO: nó mínimo de JsonLd.tsx.
  const min = readFileSync(minTsx, 'utf8');
  const oidx = min.indexOf('"@id": "https://brasilgeo.ai/#organization"');
  if (oidx < 0) throw new Error('Organization Brasil GEO não encontrada em JsonLd.tsx');
  const ostart = min.lastIndexOf('{', oidx);
  const organization = evalLiteral(sliceBalanced(min, ostart, '{', '}'));

  return {
    _meta: {
      description: 'Entidades canônicas (Person Alexandre Caramaschi e Organization Brasil GEO). NÃO editar à mão: regenerar com `node scripts/sync-entity-canonical.mjs`.',
      source: {
        person: 'landing-page-geo/src/lib/schemas/person-alexandre.ts + hasCredential de src/components/JsonLdFull.tsx',
        organization: 'landing-page-geo/src/components/JsonLd.tsx (nó https://brasilgeo.ai/#organization)',
        todo: `trocar a derivação local por ${REMOTE} quando publicado`
      },
      syncedAt: new Date().toISOString().slice(0, 10)
    },
    person,
    organization
  };
}

const data = (await fetchRemote()) || (await deriveLocal());
// QIDs mortos são barrados pelo gate scripts/check-external-ids.mjs (raiz do repo), que também cobre este JSON.
writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n');
console.log(`entity-canonical.json: Person sameAs=${data.person.sameAs.length} hasCredential=${data.person.hasCredential.length}; Organization sameAs=${data.organization.sameAs.length}`);
