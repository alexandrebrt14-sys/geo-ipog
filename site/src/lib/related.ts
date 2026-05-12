/**
 * Wrapper resiliente sobre `./taxonomy`.
 *
 * Componentes Astro consomem APENAS esta superfície — isso isola o acoplamento
 * com a taxonomia e garante que, se as funções de taxonomia mudarem ou
 * retornarem `undefined` em um caso de borda, os componentes não quebrem.
 *
 * Todas as funções aqui:
 *   - Retornam arrays (nunca `undefined` ou `null`).
 *   - Deduplicam por `href` quando agregando vários grupos.
 *   - Preservam acentuação em PT-BR nos labels.
 *
 * REGRA #0: PT-BR com acentuação completa.
 */

import {
  getRelatedAreas as _getRelatedAreas,
  getRelatedMbas as _getRelatedMbas,
  getRelatedGuias as _getRelatedGuias,
  getRelatedEvidencias as _getRelatedEvidencias,
  getRelatedCasos as _getRelatedCasos,
  getRelatedFaqs as _getRelatedFaqs,
  getNextSteps as _getNextSteps,
  getPersonaFor as _getPersonaFor,
  getTagsFor as _getTagsFor,
} from './taxonomy';
import type { RelatedItem, NextStepGroup } from './taxonomy';
import { AREAS, MBAS, GUIAS, EVIDENCIAS, CASOS, FAQS_DEEP, INTERVENCOES, METODOS } from './data';

// ---------------------------------------------------------------------------
// Tipos públicos
// ---------------------------------------------------------------------------

export interface RelatedLink {
  name: string;
  href: string;
}

export interface RelatedBundle {
  areas: RelatedLink[];
  mbas: RelatedLink[];
  guias: RelatedLink[];
  evidencias: RelatedLink[];
  casos: RelatedLink[];
  faqs: RelatedLink[];
  metodos: RelatedLink[];
  intervencoes: RelatedLink[];
}

export type NextStepBlock = NextStepGroup;

// Re-exporta tipos da taxonomy para conveniência
export type { NextStepGroup, RelatedItem };

// ---------------------------------------------------------------------------
// Helpers de extração de id por path
// ---------------------------------------------------------------------------

function extractId(href: string, prefix: string): string | null {
  if (!href) return null;
  const re = new RegExp('^/' + prefix + '/([^/?#]+)');
  const m = href.match(re);
  return m ? m[1] : null;
}

function mapToLink(items: RelatedItem[] | undefined): RelatedLink[] {
  if (!Array.isArray(items)) return [];
  return items
    .filter(i => i && i.name && i.href)
    .map(i => ({ name: i.name, href: i.href }));
}

// ---------------------------------------------------------------------------
// Versões "safe" das funções de taxonomy.
// Cada uma aceita `href` (path) ou `id` cru.
// ---------------------------------------------------------------------------

function resolveSeedId(href: string): string | null {
  // Tentativa 1: área
  const a = extractId(href, 'areas');
  if (a) return a;
  // Tentativa 2: MBA
  const mbaMatch = href.match(/\/mbas[#/]?([^/?#]+)/);
  if (mbaMatch && mbaMatch[1]) return mbaMatch[1];
  // Tentativa 3: guia/faq/evidencia/caso/intervencao/metodo (usar id direto)
  const direct =
    extractId(href, 'guias') ||
    extractId(href, 'evidencias') ||
    extractId(href, 'casos') ||
    extractId(href, 'faq') ||
    extractId(href, 'intervencoes') ||
    extractId(href, 'metodos') ||
    extractId(href, 'temas');
  return direct;
}

function safeAreas(seedId: string | null): RelatedLink[] {
  if (!seedId) return [];
  try { return mapToLink(_getRelatedAreas(seedId)); } catch { return []; }
}
function safeMbas(seedId: string | null): RelatedLink[] {
  if (!seedId) return [];
  try { return mapToLink(_getRelatedMbas(seedId)); } catch { return []; }
}
function safeGuias(seedId: string | null): RelatedLink[] {
  if (!seedId) return [];
  try { return mapToLink(_getRelatedGuias(seedId)); } catch { return []; }
}
function safeEvidencias(seedId: string | null): RelatedLink[] {
  if (!seedId) return [];
  try { return mapToLink(_getRelatedEvidencias(seedId)); } catch { return []; }
}
function safeCasos(seedId: string | null): RelatedLink[] {
  if (!seedId) return [];
  try { return mapToLink(_getRelatedCasos(seedId)); } catch { return []; }
}
function safeFaqs(seedId: string | null): RelatedLink[] {
  if (!seedId) return [];
  try { return mapToLink(_getRelatedFaqs(seedId)); } catch { return []; }
}

// ---------------------------------------------------------------------------
// Fallback de hub: se o path é um índice (/areas, /mbas, /guias), montamos um
// bundle representativo a partir dos primeiros itens canônicos do dataset.
// ---------------------------------------------------------------------------

function isHubIndex(href: string): boolean {
  const clean = href.replace(/\/+$/, '');
  const hubs = ['/areas', '/mbas', '/guias', '/faq', '/glossario', '/evidencias', '/casos', '/intervencoes', '/metodos', '/temas', '/por-estado'];
  return hubs.includes(clean);
}

function bundleForHub(href: string): RelatedBundle {
  const clean = href.replace(/\/+$/, '');
  // Por padrão sugere os hubs irmãos como pontes — mas o bundle prefere ITENS, não hubs.
  // Aqui pegamos os top picks de cada coleção.
  const top = <T extends { id: string; name: string }>(arr: readonly T[], prefix: string): RelatedLink[] =>
    arr.slice(0, 3).map(x => ({ name: x.name, href: `/${prefix}/${x.id}` }));

  const topAreas = AREAS.slice(0, 3).map(a => ({ name: a.name, href: `/areas/${a.id}` }));
  const topMbas = MBAS.slice(0, 3).map(m => ({ name: m.shortName, href: `/mbas#${m.id}` }));
  const topGuias = top(GUIAS, 'guias');
  const topEvid = top(EVIDENCIAS, 'evidencias');
  const topCasos = top(CASOS, 'casos');
  const topFaqs = FAQS_DEEP.slice(0, 3).map(f => ({ name: f.name, href: `/faq/${f.id}` }));
  const topMetodos = METODOS.slice(0, 3).map(m => ({ name: m.name, href: `/metodos/${m.id}` }));
  const topIntervencoes = INTERVENCOES.slice(0, 3).map(i => ({ name: i.name, href: `/intervencoes/${i.id}` }));

  // Para evitar redundância visual, escondemos a coluna do próprio hub
  if (clean === '/areas') return { areas: [], mbas: topMbas, guias: topGuias, evidencias: topEvid, casos: topCasos, faqs: topFaqs, metodos: topMetodos, intervencoes: topIntervencoes };
  if (clean === '/mbas') return { areas: topAreas, mbas: [], guias: topGuias, evidencias: topEvid, casos: topCasos, faqs: topFaqs, metodos: topMetodos, intervencoes: topIntervencoes };
  if (clean === '/guias') return { areas: topAreas, mbas: topMbas, guias: [], evidencias: topEvid, casos: topCasos, faqs: topFaqs, metodos: topMetodos, intervencoes: topIntervencoes };
  if (clean === '/faq') return { areas: topAreas, mbas: topMbas, guias: topGuias, evidencias: topEvid, casos: topCasos, faqs: [], metodos: topMetodos, intervencoes: topIntervencoes };
  if (clean === '/evidencias') return { areas: topAreas, mbas: topMbas, guias: topGuias, evidencias: [], casos: topCasos, faqs: topFaqs, metodos: topMetodos, intervencoes: topIntervencoes };
  if (clean === '/casos') return { areas: topAreas, mbas: topMbas, guias: topGuias, evidencias: topEvid, casos: [], faqs: topFaqs, metodos: topMetodos, intervencoes: topIntervencoes };
  if (clean === '/intervencoes') return { areas: topAreas, mbas: topMbas, guias: topGuias, evidencias: topEvid, casos: topCasos, faqs: topFaqs, metodos: topMetodos, intervencoes: [] };
  if (clean === '/metodos') return { areas: topAreas, mbas: topMbas, guias: topGuias, evidencias: topEvid, casos: topCasos, faqs: topFaqs, metodos: [], intervencoes: topIntervencoes };
  if (clean === '/temas') return { areas: topAreas, mbas: topMbas, guias: topGuias, evidencias: topEvid, casos: topCasos, faqs: topFaqs, metodos: topMetodos, intervencoes: topIntervencoes };
  if (clean === '/glossario') return { areas: topAreas, mbas: topMbas, guias: topGuias, evidencias: topEvid, casos: topCasos, faqs: topFaqs, metodos: topMetodos, intervencoes: topIntervencoes };
  if (clean === '/por-estado') return { areas: topAreas, mbas: topMbas, guias: topGuias, evidencias: topEvid, casos: topCasos, faqs: topFaqs, metodos: topMetodos, intervencoes: topIntervencoes };
  return { areas: topAreas, mbas: topMbas, guias: topGuias, evidencias: topEvid, casos: topCasos, faqs: topFaqs, metodos: topMetodos, intervencoes: topIntervencoes };
}

// ---------------------------------------------------------------------------
// API pública
// ---------------------------------------------------------------------------

/**
 * Bundle agregado de "Conteúdo relacionado" para um `href`.
 * Cada coleção contém até 4 itens; nenhuma chave é `undefined`.
 */
export function relatedBundleFor(href: string): RelatedBundle {
  if (!href) return { areas: [], mbas: [], guias: [], evidencias: [], casos: [], faqs: [], metodos: [], intervencoes: [] };

  if (isHubIndex(href)) return bundleForHub(href);

  const seed = resolveSeedId(href);

  // Métodos: tenta cross-relating via tags do método
  const metodos: RelatedLink[] = (() => {
    const metodoId = extractId(href, 'metodos');
    if (metodoId) {
      const m = METODOS.find(x => x.id === metodoId);
      if (m) {
        return METODOS.filter(x => x.id !== metodoId)
          .slice(0, 3)
          .map(x => ({ name: x.name, href: `/metodos/${x.id}` }));
      }
    }
    // Caso seed seja área que tem ligação com métodos via tags (tcc/act/dbt/mindfulness/emdr)
    try {
      const tags = _getTagsFor(href);
      const hits = METODOS.filter(m => tags.includes(m.id));
      return hits.slice(0, 3).map(m => ({ name: m.name, href: `/metodos/${m.id}` }));
    } catch {
      return [];
    }
  })();

  // Intervenções: cruzamento por tag id ↔ intervencao id substring
  const intervencoes: RelatedLink[] = (() => {
    const intId = extractId(href, 'intervencoes');
    if (intId) {
      return INTERVENCOES.filter(i => i.id !== intId)
        .slice(0, 3)
        .map(i => ({ name: i.name, href: `/intervencoes/${i.id}` }));
    }
    try {
      const tags = _getTagsFor(href);
      const hits = INTERVENCOES.filter(i => tags.some(t => i.id.includes(t.replace(/-/g, ''))));
      return hits.slice(0, 3).map(i => ({ name: i.name, href: `/intervencoes/${i.id}` }));
    } catch {
      return [];
    }
  })();

  return {
    areas: safeAreas(seed),
    mbas: safeMbas(seed),
    guias: safeGuias(seed),
    evidencias: safeEvidencias(seed),
    casos: safeCasos(seed),
    faqs: safeFaqs(seed),
    metodos,
    intervencoes,
  };
}

/**
 * Lista de blocos "Próximo passo" para um `href`, com personalização opcional.
 * Retorna `[]` quando não há nada útil a sugerir.
 */
export function nextStepsFor(href: string, persona?: string): NextStepBlock[] {
  if (!href) return [];
  try {
    const groups = _getNextSteps(href, persona);
    return Array.isArray(groups) ? groups : [];
  } catch {
    return [];
  }
}

/** Persona principal inferida para um path (best-effort). */
export function personaFor(href: string): string | null {
  if (!href) return null;
  try { return _getPersonaFor(href); } catch { return null; }
}

/** Tags conceituais inferidas para um path. */
export function tagsFor(href: string): string[] {
  if (!href) return [];
  try { return _getTagsFor(href) || []; } catch { return []; }
}

/** Soma de itens em um bundle (para gating de render). */
export function bundleTotal(b: RelatedBundle): number {
  return b.areas.length + b.mbas.length + b.guias.length + b.evidencias.length + b.casos.length + b.faqs.length + b.metodos.length + b.intervencoes.length;
}
