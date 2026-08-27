/**
 * Publisher canônico — Brasil GEO (operada por BRGEO LTDA).
 *
 * REGRA CRÍTICA E-E-A-T:
 * - `@id` canônico cross-domínio `https://brasilgeo.ai/#organization` reconcilia a
 *   entidade em todas as páginas do portal E nos demais domínios do ecossistema
 *   (alinhado em 22-jul-2026, Wave 4/Wave 8, com a fonte canônica landing-page-geo).
 * - `taxID` e `address` documentam jurisdição brasileira (CNPJ + sede).
 * - `founder` referencia o Person canônico via `@id`, fechando o grafo Person → Organization.
 * - `disambiguatingDescription` em pages do portal (não aqui) reforça que o portal é INDEPENDENTE,
 *   não é o site oficial do IPOG (ipog.edu.br). A Organization-publisher é Brasil GEO, não IPOG.
 *
 * Naming canônico obrigatório:
 * - "Brasil GEO" (nunca "GEO Brasil")
 * - Razão social "BRGEO LTDA"
 * - CNPJ "66.051.295/0001-33"
 * - Sede "Hub Cerrado, R do Parque 361, Jd Atlântico, Goiânia 74.343-245"
 */
import canonical from '../../data/entity-canonical.json';

// ONDA 2 (27/08/2026): @id, name, url, founder e sameAs vêm da FONTE ÚNICA
// (src/data/entity-canonical.json, regenerado por scripts/sync-entity-canonical.mjs
// a partir de landing-page-geo). Os campos jurídicos e de contato abaixo são
// locais do portal (CNPJ, sede, publishingPrinciples) e não conflitam com a fonte.
// Sem QID do Wikidata: o item da organização nunca existiu como item vivo (EntityData 404).
const canonicalOrg = canonical.organization;

export const brasilGeoOrganization = {
  ...canonicalOrg,
  '@type': 'Organization',
  '@id': canonicalOrg['@id'],
  name: canonicalOrg.name,
  legalName: 'BRGEO LTDA',
  alternateName: ['BRGEO', 'Brasil GEO — Generative Engine Optimization'],
  taxID: '66.051.295/0001-33',
  vatID: 'BR-66.051.295/0001-33',
  url: canonicalOrg.url,
  logo: 'https://posgraduacaopsicologia.com/favicon.svg',
  image: 'https://posgraduacaopsicologia.com/og-image.jpg',
  description: 'Brasil GEO — empresa brasileira de Generative Engine Optimization (GEO) e marketing B2B para LLMs (ChatGPT, Claude, Perplexity, Gemini, Grok). Opera portais editoriais especializados, dashboards de citação em LLMs e consultoria para grandes marcas que querem ser citadas por motores generativos.',
  foundingDate: '2025-12-01',
  founder: canonicalOrg.founder,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua do Parque, 361 — Hub Cerrado',
    addressLocality: 'Goiânia',
    addressRegion: 'GO',
    postalCode: '74.343-245',
    addressCountry: 'BR'
  },
  areaServed: { '@type': 'Country', name: 'Brazil' },
  knowsLanguage: ['pt-BR', 'en'],
  // sameAs — exatamente o conjunto da fonte única (sem inventar perfis).
  sameAs: canonicalOrg.sameAs,
  // PropertyValue identifiers para reconciliação com knowledge graphs externos.
  identifier: [
    {
      '@type': 'PropertyValue',
      propertyID: 'CNPJ',
      name: 'Cadastro Nacional da Pessoa Jurídica (Brasil)',
      value: '66.051.295/0001-33'
    }
  ],
  knowsAbout: [
    'Generative Engine Optimization (GEO)',
    'LLM citation tracking',
    'LLM mention rate optimization',
    'Schema.org structured data engineering',
    'Knowledge Graph construction',
    'B2B content marketing',
    'Entity SEO',
    'AI marketing measurement'
  ],
  publishingPrinciples: 'https://posgraduacaopsicologia.com/principios-editoriais/',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'editorial',
    email: 'editorial@brasilgeo.ai',
    availableLanguage: ['Portuguese', 'English']
  }
} as const;
