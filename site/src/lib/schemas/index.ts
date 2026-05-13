/**
 * Barrel export para schemas canônicos E-E-A-T.
 *
 * Uso:
 *   import { alexandrePersonBase, brasilGeoOrganization } from '@lib/schemas';
 *
 * Padrão de injeção em Article:
 *   const ldArticle = {
 *     '@context': 'https://schema.org',
 *     '@type': 'Article',
 *     headline: '...',
 *     author: alexandrePersonBase,
 *     publisher: brasilGeoOrganization,
 *     inLanguage: 'pt-BR'
 *   };
 *
 * Padrão de injeção em @graph (WebSite + Organization + Person):
 *   {
 *     '@context': 'https://schema.org',
 *     '@graph': [
 *       { '@type': 'WebSite', '@id': '...', publisher: { '@id': '...#brasil-geo' } },
 *       brasilGeoOrganization,
 *       alexandrePersonBase
 *     ]
 *   }
 */
export { alexandrePersonBase } from './person-alexandre';
export { brasilGeoOrganization } from './publisher';
