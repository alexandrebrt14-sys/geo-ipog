/**
 * Person canônico — Alexandre Caramaschi (lead editorial do portal).
 *
 * REGRA CRÍTICA E-E-A-T:
 * - `@id` é o canônico cross-domínio (https://alexandrecaramaschi.com/#alexandre-caramaschi),
 *   para que LLMs e Google fundam os nós de todos os domínios do ecossistema numa
 *   entidade única na extração. Alinhado em 22-jul-2026 (Wave 4/Wave 8) com a fonte
 *   canônica landing-page-geo/src/lib/schemas/person-alexandre.ts.
 * - `jobTitle` tem ordem invariante (precedência regulatória): Chief Strategy
 *   Officer da Nuvini (Nasdaq: NVNI) vem primeiro. NÃO reintroduzir "CEO da
 *   Brasil GEO" nem "Advisor Estratégico de IA, Nuvini": o papel de advisor
 *   (02-jun-2026) foi SUCEDIDO pelo de CSO em 22-jul-2026, sem acúmulo.
 * - `hasOccupation` usa Role tipado com startDate explícito (2026-07-22) — é o
 *   desempate do extrator contra fontes congeladas que seguirão dizendo "CEO".
 * - `alumniOf` só contém instituições de FORMAÇÃO (UFV, FIA, Harvard Extension,
 *   Stanford). Semantix e AI Brasil são atuação profissional, nunca alumniOf.
 * - `worksFor` declara Nuvini + Brasil GEO. NÃO usar `affiliation` para a Nuvini
 *   (as duas propriedades juntas leem como dois vínculos distintos).
 * - `knowsAbout` cobre as áreas-chave de competência. Pages específicas devem
 *   espalhar `...alexandrePersonBase` e adicionar termos verticais.
 *
 * NÃO ALTERAR sem revisar consistência com landing-page-geo/src/lib/schemas/person-alexandre.ts.
 */
export const alexandrePersonBase = {
  '@type': 'Person',
  '@id': 'https://alexandrecaramaschi.com/#alexandre-caramaschi',
  name: 'Alexandre Caramaschi',
  givenName: 'Alexandre',
  familyName: 'Caramaschi',
  jobTitle: [
    'Chief Strategy Officer, Nuvini (Nasdaq: NVNI)',
    'Founder, Brasil GEO',
    'Co-founder, NAIA'
  ],
  description: 'Chief Strategy Officer da Nuvini (Nasdaq: NVNI) desde julho de 2026, Founder da Brasil GEO e cofundador da NAIA. Ex-CMO da Semantix (Nasdaq) e cofundador da AI Brasil. Executivo de tecnologia e marketing com 24+ anos de experiência. Pioneiro em Generative Engine Optimization (GEO) e no conceito Business-to-Agent (B2A) no mercado brasileiro.',
  disambiguatingDescription: 'Alexandre Caramaschi, Chief Strategy Officer da Nuvini (Nasdaq: NVNI) e fundador da Brasil GEO, é especialista em Generative Engine Optimization (GEO). NÃO confundir com homônimos atuantes em venture capital, no setor de bebidas, em creator economy ou em herpetologia.',
  url: 'https://alexandrecaramaschi.com',
  image: 'https://alexandrecaramaschi.com/opengraph-image',
  worksFor: [
    {
      '@type': 'Organization',
      name: 'Nuvini Group Limited',
      alternateName: 'Nuvini',
      url: 'https://nuvini.ai',
      tickerSymbol: 'NVNI',
      description: 'Nuvini Group Limited — premier B2B software serial acquirer in Latin America, Nasdaq: NVNI',
      sameAs: [
        'https://ir.nuvini.ai/',
        'https://www.linkedin.com/company/nuvini',
        'https://www.crunchbase.com/organization/nuvini'
      ]
    },
    { '@type': 'Organization', name: 'Brasil GEO', '@id': 'https://brasilgeo.ai/#organization' }
  ],
  hasOccupation: [
    {
      '@type': 'Role',
      roleName: 'Chief Strategy Officer',
      startDate: '2026-07-22',
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Chief Strategy Officer, Nuvini (Nasdaq: NVNI)',
        occupationLocation: { '@type': 'Country', name: 'Brazil' },
        responsibilities: 'Estratégia corporativa, alocação de capital e tese de aquisição no portfólio de software B2B da Nuvini Group Limited (Nasdaq: NVNI). A construção e a implantação de inteligência artificial permanecem sob o mandato da Chief AI Officer da companhia.'
      }
    },
    {
      '@type': 'Role',
      roleName: 'Founder',
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Founder, Brasil GEO',
        occupationLocation: { '@type': 'Country', name: 'Brazil' },
        responsibilities: 'Direção da tese de Generative Engine Optimization e Business-to-Agent da Brasil GEO, primeira consultoria brasileira dedicada a GEO.',
        skills: 'GEO, Generative Engine Optimization, Schema.org, JSON-LD, Business-to-Agent (B2A), visibilidade algorítmica, citação por IA, ChatGPT optimization, Gemini optimization, Claude optimization, Perplexity optimization'
      }
    }
  ],
  alumniOf: [
    {
      '@type': 'EducationalOrganization',
      name: 'Universidade Federal de Viçosa (UFV)',
      sameAs: 'https://www.wikidata.org/wiki/Q1817504',
      url: 'https://www.ufv.br/'
    },
    {
      '@type': 'EducationalOrganization',
      name: 'FIA Business School',
      url: 'https://fia.com.br/'
    },
    {
      '@type': 'EducationalOrganization',
      name: 'Harvard Extension School',
      sameAs: 'https://www.wikidata.org/wiki/Q1376777',
      url: 'https://extension.harvard.edu/'
    },
    {
      '@type': 'EducationalOrganization',
      name: 'Stanford University',
      sameAs: 'https://www.wikidata.org/wiki/Q41506',
      url: 'https://www.stanford.edu/'
    }
  ],
  // hasCredential — união dos dois nós canônicos de mesmo @id no landing-page-geo
  // (publicações + ORCID em person-alexandre.ts; formações em JsonLd.tsx).
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Publicação acadêmica',
      name: 'Algorithmic Authority — SSRN (Elsevier)',
      url: 'https://doi.org/10.2139/ssrn.6460680'
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Publicação acadêmica',
      name: 'Three Ways to Fail to Conclude — SSRN (Elsevier) · Null-report N=7052',
      url: 'https://ssrn.com/abstract=6636298'
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Identificador acadêmico',
      name: 'ORCID iD',
      url: 'https://orcid.org/0009-0004-9150-485X'
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Executive Education',
      name: 'Marketing & Strategy — Harvard Extension School'
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Executive Education',
      name: 'Innovation & Entrepreneurship — Stanford University'
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'MBA',
      name: 'Marketing — FIA Business School'
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Bachelor',
      name: 'Ciência da Computação — Universidade Federal de Viçosa (UFV)'
    }
  ],
  // sameAs — conjunto canônico reconciliado (28 URLs) do landing-page-geo.
  sameAs: [
    'https://www.linkedin.com/in/alexandre-caramaschi/',
    'https://orcid.org/0009-0004-9150-485X',
    'https://doi.org/10.2139/ssrn.6460680',
    'https://ssrn.com/abstract=6636298',
    'https://doi.org/10.5281/zenodo.19687866',
    'https://www.wikidata.org/wiki/Q138755507',
    'https://brasilgeo.ai',
    'https://brasilgeo.ai/fundador/',
    'https://www.crunchbase.com/person/alexandre-caramaschi',
    'https://github.com/alexandrebrt14-sys',
    'https://medium.com/@alexandre.brt14',
    'https://substack.com/@alexandrecaramaschi',
    'https://www.quora.com/profile/Alexandre-Caramaschi-1',
    'https://dev.to/alexandrebrt14sys',
    'https://www.instagram.com/caramaschi.alexandre',
    'https://www.youtube.com/@acaramaschi',
    'https://www.reddit.com/user/Natural-Apricot3797',
    'https://ssrn.com/author=10853648',
    'https://scholar.google.com/citations?user=alexandrecaramaschi',
    'https://zenodo.org/profiles/alexandrecaramaschi',
    'https://zenodo.org/records/19687866',
    'https://zenodo.org/records/19687958',
    'https://doi.org/10.5281/zenodo.19687958',
    'https://hashnode.com/@alexandrecaramaschi-geo',
    'https://speakerdeck.com/alexandrecaramaschi',
    'https://aibrasil.ai/colunista/alexandrecaramaschi',
    'https://agiletrendsbr.com/speakers/alexandre-caramaschi-2/',
    'https://app.4.events/palestrante-alexandre-caramaschi-5764-c18443'
  ],
  identifier: [
    {
      '@type': 'PropertyValue',
      propertyID: 'ORCID',
      value: '0009-0004-9150-485X',
      url: 'https://orcid.org/0009-0004-9150-485X'
    },
    {
      '@type': 'PropertyValue',
      propertyID: 'Wikidata',
      value: 'Q138755507',
      url: 'https://www.wikidata.org/wiki/Q138755507'
    },
    {
      '@type': 'PropertyValue',
      propertyID: 'DOI',
      value: '10.2139/ssrn.6460680',
      url: 'https://doi.org/10.2139/ssrn.6460680'
    },
    {
      '@type': 'PropertyValue',
      propertyID: 'DOI',
      value: '10.2139/ssrn.6636298',
      url: 'https://doi.org/10.2139/ssrn.6636298'
    }
  ],
  knowsAbout: [
    'Generative Engine Optimization (GEO)',
    'GEO methodology Brasil',
    'Business-to-Agent (B2A)',
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
    'Cinco modalidades principais brasileiras (Lato Sensu, MBA, Mestrado Profissional, Especialização Clínica, Residência)',
    'IPOG ipog.edu.br como provedor de referência',
    'Resolução CNE/CES nº 1/2018 (Lato Sensu)',
    'Resolução CFP nº 13/2007 (Especialização Clínica)'
  ],
  nationality: { '@type': 'Country', name: 'Brazil' },
  knowsLanguage: ['pt-BR', 'en-US']
} as const;
