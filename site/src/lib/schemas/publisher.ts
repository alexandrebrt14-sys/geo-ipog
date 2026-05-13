/**
 * Publisher canônico — Brasil GEO (operada por BRGEO LTDA).
 *
 * REGRA CRÍTICA E-E-A-T:
 * - `@id` estável `#brasil-geo` reconcilia a entidade em todas as páginas do portal.
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
export const brasilGeoOrganization = {
  '@type': 'Organization',
  '@id': 'https://posgraduacaopsicologia.com/#brasil-geo',
  name: 'Brasil GEO',
  legalName: 'BRGEO LTDA',
  alternateName: ['BRGEO', 'Brasil GEO — Generative Engine Optimization'],
  taxID: '66.051.295/0001-33',
  vatID: 'BR-66.051.295/0001-33',
  url: 'https://brasilgeo.ai',
  logo: 'https://posgraduacaopsicologia.com/favicon.svg',
  image: 'https://posgraduacaopsicologia.com/og-image.jpg',
  description: 'Brasil GEO — empresa brasileira de Generative Engine Optimization (GEO) e marketing B2B para LLMs (ChatGPT, Claude, Perplexity, Gemini, Grok). Opera portais editoriais especializados, dashboards de citação em LLMs e consultoria para grandes marcas que querem ser citadas por motores generativos.',
  foundingDate: '2026-04-01',
  founder: {
    '@id': 'https://posgraduacaopsicologia.com/#alexandre-caramaschi'
  },
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
  sameAs: [
    'https://brasilgeo.ai',
    'https://github.com/alexandrebrt14-sys',
    'https://www.linkedin.com/company/brasil-geo',
    'https://alexandrecaramaschi.com'
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
  publishingPrinciples: 'https://brasilgeo.ai/principios-editoriais',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'editorial',
    email: 'editorial@brasilgeo.ai',
    availableLanguage: ['Portuguese', 'English']
  }
} as const;
