#!/usr/bin/env node
/**
 * sync-entity-canonical.mjs — regenera src/data/entity-canonical.json a partir da
 * FONTE ÚNICA de entidade exportada pelo landing-page-geo
 * (public/.well-known/entity-canonical.json: @graph com a Person de Alexandre
 * Caramaschi e a Organization Brasil GEO, mesmos @id canônicos).
 *
 * Ordem de leitura:
 *   1. URL servida https://alexandrecaramaschi.com/.well-known/entity-canonical.json
 *      (TODO(entidade): passa a ser a única origem quando estiver publicada e o
 *      clone local deixar de ser necessário; hoje pode devolver 404 e cai no item 2).
 *   2. Arquivo local do clone do landing-page-geo (--source-file <caminho> ou
 *      ENTITY_CANONICAL_FILE; padrão ../../_wt-onda2-lpg/public/.well-known/entity-canonical.json,
 *      com fallback para ../../landing-page-geo/public/.well-known/entity-canonical.json).
 *
 * Uso: node scripts/sync-entity-canonical.mjs [--source-file <caminho>] [--offline]
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(here, '../src/data/entity-canonical.json');
const REMOTE = 'https://alexandrecaramaschi.com/.well-known/entity-canonical.json';
const PERSON_ID = 'https://alexandrecaramaschi.com/#alexandre-caramaschi';
const ORG_ID = 'https://brasilgeo.ai/#organization';
const argIdx = process.argv.indexOf('--source-file');
const OFFLINE = process.argv.includes('--offline');
const candidates = [
  argIdx > -1 ? process.argv[argIdx + 1] : null,
  process.env.ENTITY_CANONICAL_FILE,
  resolve(here, '../../../_wt-onda2-lpg/public/.well-known/entity-canonical.json'),
  resolve(here, '../../../landing-page-geo/public/.well-known/entity-canonical.json')
].filter(Boolean).map((p) => resolve(p));

async function fetchRemote() {
  if (OFFLINE) return null;
  try {
    const r = await fetch(REMOTE, { headers: { accept: 'application/json' }, signal: AbortSignal.timeout(10000) });
    if (!r.ok) return null;
    return { doc: await r.json(), origin: REMOTE };
  } catch {
    return null;
  }
}

function readLocal() {
  for (const p of candidates) {
    if (existsSync(p)) return { doc: JSON.parse(readFileSync(p, 'utf8')), origin: p };
  }
  throw new Error(`fonte única ausente. Tentado: ${REMOTE} e ${candidates.join(', ')}`);
}

const { doc, origin } = (await fetchRemote()) || readLocal();
const graph = Array.isArray(doc['@graph']) ? doc['@graph'] : [];
const person = graph.find((n) => n['@id'] === PERSON_ID);
const organization = graph.find((n) => n['@id'] === ORG_ID);
if (!person || !organization) throw new Error(`@graph sem Person ${PERSON_ID} ou Organization ${ORG_ID} em ${origin}`);

const data = {
  _meta: {
    description: 'Entidades canônicas (Person Alexandre Caramaschi e Organization Brasil GEO). NÃO editar à mão: regenerar com `node scripts/sync-entity-canonical.mjs`.',
    source: origin.split(String.fromCharCode(92)).join('/').replace(/^.*?(_wt-onda2-lpg|landing-page-geo)\//, '$1/'),
    version: doc.version || null,
    generatedAt: doc.generatedAt || null,
    todo: `usar somente ${REMOTE} quando publicado`,
    syncedAt: new Date().toISOString().slice(0, 10)
  },
  person,
  organization
};
writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n');
console.log(`entity-canonical.json <- ${origin} (version ${doc.version || '?'}): Person sameAs=${person.sameAs.length} hasCredential=${(person.hasCredential || []).length}; Organization sameAs=${organization.sameAs.length}`);
