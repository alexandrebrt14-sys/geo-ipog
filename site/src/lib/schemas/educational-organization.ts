/**
 * EducationalOrganization canônico — IPOG (Instituto de Pós-Graduação e Graduação).
 *
 * REGRA CRÍTICA E-E-A-T:
 * - `@id` âncora `#ipog-educational-organization` reconcilia entidade IPOG em todo o portal.
 * - IPOG é o PROVEDOR educacional; Brasil GEO é o PUBLISHER do portal editorial.
 *   São entidades distintas no `@graph` (não confundir com brasilGeoOrganization).
 * - `sameAs` cita perfis públicos verificáveis. e-MEC código IES 12916 (confirmado
 *   via portal e-MEC MTI5MTY= + busca secundária em 2026-05-17). Portaria de
 *   recredenciamento nº 884 de 12/08/2016.
 * - Wikidata Q54864393 confirmado em 2026-05-17 (10 declarações, país=Brasil,
 *   localidade=Goiânia, website ipog.edu.br).
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
  // sameAs — referências públicas verificáveis. Confirmadas em 2026-05-17.
  // e-MEC código IES 12916 — confirmado via emec.mec.gov.br (MTI5MTY= = base64 de "12916").
  // Wikidata Q54864393 — confirmado via Wikidata Special:Search em 2026-05-17.
  sameAs: [
    'https://ipog.edu.br/',
    'https://www.linkedin.com/school/ipog/',
    'https://www.instagram.com/ipogoficial/',
    'https://www.facebook.com/IPOGoficial',
    'https://www.youtube.com/@ipogoficial',
    'https://www.wikidata.org/wiki/Q54864393',
    'https://emec.mec.gov.br/emec/consulta-cadastro/detalhes-ies/d96957f455f6405d14c6542552b0f6eb/MTI5MTY='
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
    url: 'https://ipog.edu.br/cursos/pos-graduacao',
    availableLanguage: ['Portuguese']
  }
} as const;
