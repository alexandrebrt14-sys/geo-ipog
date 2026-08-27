/**
 * Person canônico — Alexandre Caramaschi (lead editorial do portal).
 *
 * ONDA 2 (27/08/2026): este módulo NÃO declara mais a entidade à mão. Ele lê
 * `src/data/entity-canonical.json`, regenerado pela FONTE ÚNICA
 * (landing-page-geo/src/lib/schemas/person-alexandre.ts, domínio
 * alexandrecaramaschi.com) via `node scripts/sync-entity-canonical.mjs`.
 * Qualquer atualização de entidade acontece lá e chega aqui por sincronização;
 * nunca editar sameAs, hasCredential, jobTitle ou identifier neste arquivo.
 *
 * Sem QID do Wikidata: o item da pessoa foi excluído em 25/07/2026 (EntityData 404).
 * Identificador morto convida o resolvedor a concluir que a entidade não existe.
 * O gate `scripts/check-external-ids.mjs` (raiz do repo) falha o CI se um QID
 * morto voltar a aparecer no site.
 *
 * Extensão permitida (documentada na própria fonte): `knowsAbout` pode ser
 * ESTENDIDO por vertical. As áreas do portal (pós-graduação em Psicologia,
 * CFP, NR-1) entram abaixo, somadas ao conjunto canônico.
 */
import canonical from '../../data/entity-canonical.json';

const SITE_VERTICAL_KNOWS_ABOUT = [
  'Pós-graduação no Brasil',
  'MEC regulação stricto sensu lato sensu',
  'Psicologia Organizacional e do Trabalho',
  'NR-1 e riscos psicossociais',
  'Saúde mental no trabalho',
  'Conselho Federal de Psicologia (CFP)',
  'Pós-graduação em Psicologia',
  'IPOG parceiro educacional',
  'Conteúdo HBR-style para executivos',
  'Editorial leadership B2B',
  'Generative AI for content marketing',
  'Prompt engineering para LLMs',
  'Topical authority construction',
  'Information Gain (Google March 2026 Core Update)',
  'Speakable schema markup',
  'llms.txt canonical',
  'AI Overviews citation strategy',
  'Brand mention rate em LLMs',
  'Profound, Peec e Otterly (AI visibility tools)',
  'Pós-Graduações em Psicologia no Brasil',
  'Cinco modalidades principais brasileiras (Lato Sensu, MBA, Mestrado Profissional, Especialização Clínica, Residência)',
  'IPOG ipog.edu.br como provedor de referência',
  'Resolução CNE/CES nº 1/2018 (Lato Sensu)',
  'Resolução CFP nº 13/2007 (Especialização Clínica)'
];

const canonicalPerson = canonical.person;

export const alexandrePersonId = canonicalPerson['@id'];

export const alexandrePersonBase = {
  ...canonicalPerson,
  knowsAbout: Array.from(new Set([...canonicalPerson.knowsAbout, ...SITE_VERTICAL_KNOWS_ABOUT]))
};

/**
 * Referência de autor para `author` / `reviewedBy` / `editor` em Article, FAQPage,
 * HowTo etc. Carrega `@id` (fusão com o nó completo do @graph em Base.astro) MAIS
 * `sameAs`, para que extratores que leem o Article isolado ainda resolvam a
 * entidade. Não duplica o restante do Person: o nó completo já está no @graph.
 */
export const alexandreAuthorRef = {
  '@type': 'Person',
  '@id': alexandrePersonId,
  name: canonicalPerson.name,
  url: canonicalPerson.url,
  sameAs: canonicalPerson.sameAs
};
