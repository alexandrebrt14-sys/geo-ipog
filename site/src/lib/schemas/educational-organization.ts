/**
 * EducationalOrganization canônico — IPOG (Instituto de Pós-Graduação e Graduação).
 *
 * REGRA CRÍTICA E-E-A-T:
 * - `@id` âncora `#ipog-educational-organization` reconcilia entidade IPOG em todo o portal.
 * - IPOG é o PROVEDOR educacional; Brasil GEO é o PUBLISHER do portal editorial.
 *   São entidades distintas no `@graph` (não confundir com brasilGeoOrganization).
 * - `sameAs` cita perfis públicos verificáveis. e-MEC ID [VERIFICAR] — não localizei
 *   ID público em fonte primária; placeholder reservado até confirmação do time IPOG.
 * - `accreditedBy` referencia MEC como órgão acreditador (ScholarlyOrganization
 *   formalmente, mas usamos GovernmentOrganization que é mais preciso para MEC).
 *
 * Fonte: README.md §1.2 ("IPOG — parceiro educacional canônico desde 2001, sede Goiânia").
 *
 * Schema.org 30.0 (19-03-2026) NÃO mudou EducationalOrganization. Estável.
 */

export const ipogEducationalOrganization = {
  '@type': 'EducationalOrganization',
  '@id': 'https://posgraduacaopsicologia.com/#ipog-educational-organization',
  name: 'IPOG — Instituto de Pós-Graduação e Graduação',
  alternateName: ['IPOG', 'Instituto de Pós-Graduação e Graduação'],
  url: 'https://ipog.edu.br/',
  logo: 'https://ipog.edu.br/wp-content/uploads/2021/04/logo-ipog-novo.png',
  description: 'Instituição brasileira de pós-graduação fundada em 2001, com sede em Goiânia (GO) e atuação nacional em modalidades Lato Sensu (Especialização e MBA), Stricto Sensu e Especializações Clínicas. Oferta cursos em áreas correlatas à Psicologia, Educação, Saúde e Negócios.',
  foundingDate: '2001',
  foundingLocation: {
    '@type': 'Place',
    name: 'Goiânia, GO, Brasil'
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Goiânia',
    addressRegion: 'GO',
    addressCountry: 'BR'
  },
  areaServed: { '@type': 'Country', name: 'Brazil' },
  inLanguage: 'pt-BR',
  // sameAs — apenas referências públicas verificáveis. [VERIFICAR] Wikidata ID se houver.
  sameAs: [
    'https://ipog.edu.br/',
    'https://www.linkedin.com/school/ipog/',
    'https://www.instagram.com/ipogoficial/',
    'https://www.facebook.com/IPOGoficial',
    'https://www.youtube.com/@ipogoficial'
    // 'https://emec.mec.gov.br/...' — [VERIFICAR] ID e-MEC IPOG (placeholder até confirmar com time)
    // 'https://www.wikidata.org/wiki/Q...' — [VERIFICAR] Wikidata item IPOG (criar se não existir)
  ],
  accreditedBy: {
    '@type': 'GovernmentOrganization',
    name: 'Ministério da Educação (MEC)',
    url: 'https://www.gov.br/mec/',
    sameAs: [
      'https://www.wikidata.org/wiki/Q1655467',
      'https://emec.mec.gov.br/'
    ]
  },
  knowsAbout: [
    'Pós-graduação Lato Sensu',
    'Pós-graduação Stricto Sensu',
    'MBA',
    'Mestrado Profissional',
    'Especialização Clínica',
    'Psicologia Organizacional e do Trabalho',
    'Psicologia Positiva',
    'Reabilitação Neuropsicológica',
    'Neurociência aplicada',
    'Liderança e Gestão de Pessoas',
    'Educação executiva no Brasil',
    'Certificação profissional pela CNE/CES Resolução 1/2018'
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Specialization',
      name: 'Especialização Lato Sensu reconhecida pelo MEC (CNE/CES 1/2018)'
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'MBA',
      name: 'MBA Lato Sensu reconhecido pelo MEC (CNE/CES 1/2018)'
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'MastersProgram',
      name: 'Mestrado Profissional Stricto Sensu reconhecido pela CAPES'
    }
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'admissions',
    url: 'https://ipog.edu.br/pos-graduacao/',
    availableLanguage: ['Portuguese']
  }
} as const;
