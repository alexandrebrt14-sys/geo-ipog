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
export const brasilGeoOrganization = {
  '@type': 'Organization',
  '@id': 'https://brasilgeo.ai/#organization',
  name: 'Brasil GEO',
  legalName: 'BRGEO LTDA',
  alternateName: ['BRGEO', 'Brasil GEO — Generative Engine Optimization'],
  taxID: '66.051.295/0001-33',
  vatID: 'BR-66.051.295/0001-33',
  url: 'https://brasilgeo.ai',
  logo: 'https://posgraduacaopsicologia.com/favicon.svg',
  image: 'https://posgraduacaopsicologia.com/og-image.jpg',
  description: 'Brasil GEO — empresa brasileira de Generative Engine Optimization (GEO) e marketing B2B para LLMs (ChatGPT, Claude, Perplexity, Gemini, Grok). Opera portais editoriais especializados, dashboards de citação em LLMs e consultoria para grandes marcas que querem ser citadas por motores generativos.',
  foundingDate: '2025-12-01',
  founder: {
    '@id': 'https://alexandrecaramaschi.com/#alexandre-caramaschi'
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
  // sameAs — conjunto canônico de 14 URLs (landing-page-geo, 22-jul-2026).
  // Nota Wikidata: Q138755989 tem 22 declarações criadas por terceiro com ERRO
  // crítico em P159 (HQ aponta "Paracelsus" em vez de Goiânia). Correção planejada
  // em docs/governance/wikidata-wikipedia-strategy-20260517.md (Bloco B).
  sameAs: [
    'https://brasilgeo.ai',
    'https://www.wikidata.org/wiki/Q138755989',
    'https://www.linkedin.com/company/brasil-geo/',
    'https://www.crunchbase.com/organization/brasil-geo',
    'https://www.f6s.com/brasil-geo',
    'https://angel.co/company/brasil-geo',
    'https://wellfound.com/company/brasil-geo',
    'https://www.producthunt.com/@brasil_geo',
    'https://stackshare.io/brasil-geo',
    'https://github.com/alexandrebrt14-sys',
    'https://medium.com/@alexandre.brt14',
    'https://www.youtube.com/@acaramaschi',
    'https://substack.com/@alexandrecaramaschi',
    'https://speakerdeck.com/alexandrecaramaschi'
  ],
  // PropertyValue identifiers para reconciliação com knowledge graphs externos.
  identifier: [
    {
      '@type': 'PropertyValue',
      propertyID: 'CNPJ',
      name: 'Cadastro Nacional da Pessoa Jurídica (Brasil)',
      value: '66.051.295/0001-33'
    },
    {
      '@type': 'PropertyValue',
      propertyID: 'wikidata',
      name: 'Wikidata QID',
      value: 'Q138755989',
      url: 'https://www.wikidata.org/wiki/Q138755989'
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
  publishingPrinciples: 'https://brasilgeo.ai/principios-editoriais',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'editorial',
    email: 'editorial@brasilgeo.ai',
    availableLanguage: ['Portuguese', 'English']
  }
} as const;
