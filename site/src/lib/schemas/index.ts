/**
 * Barrel export para schemas canônicos E-E-A-T.
 *
 * Uso:
 *   import {
 *     alexandrePersonBase,
 *     brasilGeoOrganization,
 *     ipogEducationalOrganization,
 *     buildEducationalOccupationalProgram,
 *     buildSpeakable,
 *     FIVE_MODALITIES
 *   } from '@lib/schemas';
 *
 * Padrão de injeção em Article (referenciando Person + Organization via @id):
 *   const ldArticle = {
 *     '@context': 'https://schema.org',
 *     '@type': 'Article',
 *     headline: '...',
 *     author: { '@id': 'https://alexandrecaramaschi.com/#alexandre-caramaschi' },
 *     publisher: { '@id': 'https://brasilgeo.ai/#organization' },
 *     inLanguage: 'pt-BR'
 *   };
 *
 * Padrão de injeção em @graph (WebSite + Organization + Person — Base.astro já cobre):
 *   {
 *     '@context': 'https://schema.org',
 *     '@graph': [
 *       { '@type': 'WebSite', '@id': '...', publisher: { '@id': '...#brasil-geo' } },
 *       brasilGeoOrganization,
 *       alexandrePersonBase
 *     ]
 *   }
 *
 * Padrão de injeção em página de programa (hub MBA, hub Lato Sensu, etc.):
 *   {
 *     '@context': 'https://schema.org',
 *     '@graph': [
 *       buildEducationalOccupationalProgram({ ... }),
 *       ipogEducationalOrganization
 *     ]
 *   }
 *
 * Padrão Speakable em página com TL;DR e FAQs:
 *   const ld = { ...articleSchema, speakable: buildSpeakable(['#tldr', '.faq-question']) };
 */

export { alexandrePersonBase } from './person-alexandre';
export { larissaPersonBase } from './person-larissa';
export { brasilGeoOrganization } from './publisher';
export { ipogEducationalOrganization } from './educational-organization';
export {
  buildEducationalOccupationalProgram,
  buildSpeakable,
  buildBreadcrumb,
  FIVE_MODALITIES
} from './educational-program';
export type { FiveModalitiesType, BuildEducationalProgramArgs } from './educational-program';
