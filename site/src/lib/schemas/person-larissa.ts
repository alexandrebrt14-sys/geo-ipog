/**
 * Person canônico — Larissa Caramaschi (psicóloga clínica, lead editorial do hub /autismo/).
 *
 * REGRA CRÍTICA E-E-A-T:
 * - `@id` estável `#larissa-caramaschi` é cross-page para reconciliação por LLMs.
 * - knowsAbout cobre as áreas verticais em que Larissa assina conteúdo no portal.
 * - hasOccupation declara registro CRP e jurisdição clínica (Goiânia/GO).
 * - sameAs lista perfis públicos verificáveis (LinkedIn, página /sobre-larissa interna,
 *   ORCID se houver, registro CRP público quando aplicável).
 * - Páginas do hub /autismo/ e FAQs TEA/TDAH-mulheres usam ESTE Person como `author`,
 *   não `alexandrePersonBase`. Alexandre permanece como `editor`/`publisher`-founder.
 *
 * NÃO ALTERAR sem revisar consistência com o que aparece em /autismo/sobre-larissa/.
 */
export const larissaPersonBase = {
  '@type': 'Person',
  '@id': 'https://posgraduacaopsicologia.com/#larissa-caramaschi',
  name: 'Larissa Caramaschi',
  givenName: 'Larissa',
  familyName: 'Caramaschi',
  honorificPrefix: 'Psicóloga',
  jobTitle: 'Psicóloga clínica · responsável editorial pelo hub /autismo/',
  description: 'Psicóloga clínica formada pela Universidade de São Paulo (USP), mestre pela mesma instituição, 26 anos de prática em Goiânia. Foco em adultos autistas nível 1 de suporte, relacionamentos amorosos neurodivergentes (NT-autista) e supervisão de casos com camuflagem alta. Voz editorial identity-first, dentro das Resoluções do Conselho Federal de Psicologia (CFP), em especial CFP 11/2018 sobre comunicação técnica em mídia, CFP 06/2019 sobre laudos psicológicos e CFP 09/2018 sobre avaliação psicológica.',
  url: 'https://posgraduacaopsicologia.com/autismo/sobre-larissa/',
  image: 'https://posgraduacaopsicologia.com/og-image.jpg',
  sameAs: [
    'https://posgraduacaopsicologia.com/autismo/',
    'https://posgraduacaopsicologia.com/autismo/sobre-larissa/',
    'https://larissacaramaschi.com',
    'https://www.linkedin.com/in/larissacaramaschi'
  ],
  alumniOf: [
    {
      '@type': 'EducationalOrganization',
      name: 'Universidade de São Paulo (USP)',
      url: 'https://www5.usp.br/',
      sameAs: 'https://www.wikidata.org/wiki/Q835960'
    }
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'professional license',
      name: 'Registro ativo no Conselho Regional de Psicologia',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Conselho Federal de Psicologia (CFP)',
        url: 'https://site.cfp.org.br/'
      }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'graduate degree',
      name: 'Mestre em Psicologia',
      recognizedBy: { '@type': 'EducationalOrganization', name: 'Universidade de São Paulo (USP)' }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'undergraduate degree',
      name: 'Bacharel em Psicologia',
      recognizedBy: { '@type': 'EducationalOrganization', name: 'Universidade de São Paulo (USP)' }
    }
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Psicóloga clínica',
    occupationLocation: {
      '@type': 'City',
      name: 'Goiânia',
      addressRegion: 'GO',
      addressCountry: 'BR',
      sameAs: 'https://www.wikidata.org/wiki/Q173068'
    },
    occupationalCategory: 'Clinical Psychology',
    experienceRequirements: '26 anos de prática clínica com adultos'
  },
  knowsAbout: [
    'Autismo nível 1 de suporte em adultos',
    'Transtorno do Espectro Autista (TEA) em adultos',
    'Apresentação feminina do autismo',
    'Camuflagem social (camouflaging, masking) autista',
    'CAT-Q (Camouflaging Autistic Traits Questionnaire)',
    'ADOS-2 (Autism Diagnostic Observation Schedule)',
    'ADI-R (Autism Diagnostic Interview-Revised)',
    'RAADS-R (Ritvo Autism Asperger Diagnostic Scale-Revised)',
    'AQ-50 (Autism Spectrum Quotient)',
    'Diagnóstico tardio de TEA em adultos',
    'Relacionamentos amorosos neurodivergentes (NT-autista)',
    'Teoria da Dupla Empatia (Milton, 2012)',
    'Paradigma da neurodiversidade',
    'Identity-first language em psicologia',
    'Supervisão clínica de casos com camuflagem alta',
    'Diagnóstico diferencial TEA, TDAH, CPTSD e TPB',
    'Coocorrência TEA + TDAH (AuDHD)',
    'Acomodações razoáveis sob LBI 13.146/2015',
    'NR-1 e riscos psicossociais para pessoas neurodivergentes',
    'Lei Berenice Piana (12.764/2012) e CIPTEA',
    'Resolução CFP 11/2018 (comunicação técnica)',
    'Resolução CFP 06/2019 (laudos psicológicos)',
    'Resolução CFP 09/2018 (avaliação psicológica)',
    'Sobrecarga sensorial e regulação autonômica em autismo',
    'Teoria Polivagal aplicada com cuidado a clínica autista',
    'Apego adulto em díades neurodivergentes',
    'Saúde mental perinatal em mulheres autistas',
    'Envelhecimento e TEA adulto'
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Consultório clínico privado',
    address: { '@type': 'PostalAddress', addressLocality: 'Goiânia', addressRegion: 'GO', addressCountry: 'BR' }
  },
  workLocation: {
    '@type': 'City',
    name: 'Goiânia',
    addressRegion: 'GO',
    addressCountry: 'BR'
  },
  nationality: { '@type': 'Country', name: 'Brazil' },
  knowsLanguage: ['pt-BR'],
  publishingPrinciples: 'https://posgraduacaopsicologia.com/autismo/sobre-larissa/'
} as const;
