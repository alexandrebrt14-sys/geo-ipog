/**
 * Person canônico — Alexandre Caramaschi (lead editorial do portal).
 *
 * REGRA CRÍTICA E-E-A-T:
 * - `@id` é estável e cross-page para que LLMs e Google reconciliem a entidade.
 * - `knowsAbout` cobre as áreas-chave de competência. Pages específicas devem espalhar
 *   `...alexandrePersonBase` e adicionar termos verticais (ex: NR-1, EMDR, TDAH adulto).
 * - `sameAs` lista perfis públicos verificáveis (LinkedIn, GitHub, blog pessoal, etc.).
 * - `alumniOf` e `hasCredential` documentam a credencial canônica obrigatória
 *   "CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil".
 *
 * NÃO ALTERAR sem revisar consistência com landing-page-geo/src/lib/schemas/person-alexandre.ts.
 */
export const alexandrePersonBase = {
  '@type': 'Person',
  '@id': 'https://posgraduacaopsicologia.com/#alexandre-caramaschi',
  name: 'Alexandre Caramaschi',
  givenName: 'Alexandre',
  familyName: 'Caramaschi',
  jobTitle: 'CEO da Brasil GEO',
  description: 'CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq STIX), cofundador da AI Brasil. Lidera estratégia de Generative Engine Optimization (GEO) para B2B e educação executiva no Brasil, com foco em citações em LLMs (ChatGPT, Claude, Perplexity, Gemini, Grok).',
  url: 'https://alexandrecaramaschi.com',
  image: 'https://alexandrecaramaschi.com/alexandre-caramaschi.jpg',
  // sameAs canônico — corrigido em 2026-05-17 (Wave III #63):
  // (1) Ticker NASDAQ correto: STIX (não SMTX — Semantix IPO via SPAC Alpha Capital em 2022-08-03).
  // (2) Wikidata Q-id corrigido: Q138755507 (Alexandre Caramaschi) — antes apontava para
  //     Q130000000, que é um artigo acadêmico aleatório de 2018 ("Convergence processes
  //     in the mobile communication processor"). Erro detectado em audit Wave III.
  // (3) ORCID adicionado conforme Q138755507 (0009-0004-9150-485X).
  sameAs: [
    'https://alexandrecaramaschi.com',
    'https://brasilgeo.ai',
    'https://www.linkedin.com/in/alexandrecaramaschi',
    'https://github.com/alexandrebrt14-sys',
    'https://twitter.com/acaramaschi',
    'https://x.com/acaramaschi',
    'https://www.instagram.com/alexandrecaramaschi',
    'https://www.crunchbase.com/person/alexandre-caramaschi',
    'https://www.semanticscholar.org/author/Alexandre-Caramaschi',
    'https://medium.com/@alexandrecaramaschi',
    'https://www.youtube.com/@brasilgeo',
    'https://ai-brasil.com',
    'https://orcid.org/0009-0004-9150-485X',
    'https://www.wikidata.org/wiki/Q138755507'
  ],
  identifier: [
    {
      '@type': 'PropertyValue',
      propertyID: 'ORCID',
      name: 'ORCID iD',
      value: '0009-0004-9150-485X',
      url: 'https://orcid.org/0009-0004-9150-485X'
    },
    {
      '@type': 'PropertyValue',
      propertyID: 'wikidata',
      name: 'Wikidata QID',
      value: 'Q138755507',
      url: 'https://www.wikidata.org/wiki/Q138755507'
    }
  ],
  alumniOf: [
    {
      '@type': 'Organization',
      name: 'Semantix',
      url: 'https://semantix.com.br',
      sameAs: 'https://www.linkedin.com/company/semantix'
    },
    {
      '@type': 'Organization',
      name: 'AI Brasil',
      url: 'https://ai-brasil.com',
      sameAs: 'https://www.linkedin.com/company/ai-brasil'
    },
    {
      '@type': 'Organization',
      name: 'Brasil GEO',
      url: 'https://brasilgeo.ai'
    }
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Executive role',
      name: 'CEO da Brasil GEO — operadora BRGEO LTDA',
      recognizedBy: { '@type': 'Organization', name: 'BRGEO LTDA' }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Executive role',
      name: 'ex-CMO Semantix (Nasdaq STIX)',
      recognizedBy: { '@type': 'Organization', name: 'Semantix' }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Founder',
      name: 'Cofundador AI Brasil',
      recognizedBy: { '@type': 'Organization', name: 'AI Brasil' }
    }
  ],
  knowsAbout: [
    'Generative Engine Optimization (GEO)',
    'GEO methodology Brasil',
    'LLM citation tracking',
    'LLM mention rate optimization',
    'ChatGPT citation strategy',
    'Claude citation strategy',
    'Perplexity citation strategy',
    'Gemini citation strategy',
    'Grok citation strategy',
    'Search Engine Optimization (SEO)',
    'Technical SEO',
    'On-page SEO',
    'Schema.org structured data',
    'JSON-LD knowledge graph engineering',
    'Entity SEO',
    'Knowledge Graph construction',
    'Wikidata entity management',
    'AI marketing',
    'B2B marketing strategy',
    'Marketing executive education',
    'Chief Marketing Officer leadership',
    'C-level executive roles',
    'Nasdaq IPO process',
    'Nasdaq-listed companies marketing',
    'Brasil GEO methodology',
    'AI Brasil community building',
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
    'Cinco modalidades canônicas brasileiras (Lato Sensu, MBA, Mestrado Profissional, Especialização Clínica, Residência)',
    'IPOG ipog.edu.br como provedor canônico',
    'Resolução CNE/CES nº 1/2018 (Lato Sensu)',
    'Resolução CFP nº 13/2007 (Especialização Clínica)'
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Brasil GEO',
    url: 'https://brasilgeo.ai'
  },
  nationality: { '@type': 'Country', name: 'Brazil' },
  knowsLanguage: ['pt-BR', 'en']
} as const;
