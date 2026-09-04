/**
 * Datas por rota derivadas do git (Onda 3 SEO/GEO, 03/09/2026).
 *
 * Importa src/generated/lastmod.json, gerado por scripts/gen-lastmod-manifest.mjs
 * (roda no prebuild/predev e fica versionado, como o route-lastmod.json do
 * landing-page-geo, para o `astro check` e um build sem .git continuarem a
 * funcionar). O mesmo manifesto alimenta o sitemap (scripts/gen-sitemap.mjs) e a
 * injeção de dateModified/datePublished no JSON-LD (scripts/seo-postbuild.mjs),
 * portanto lastmod do sitemap == dateModified do JSON-LD por construção.
 *
 * Sem rota no manifesto, sem data: nunca inventamos "hoje".
 */
import manifest from '../generated/lastmod.json';

export interface RouteDates {
  /** YYYY-MM-DD do último commit que tocou a página. */
  modified: string;
  /** YYYY-MM-DD do commit que adicionou a página. */
  published: string;
  /** Caminho relativo do .astro de origem. */
  source: string;
}

const routes = (manifest as { routes: Record<string, RouteDates> }).routes ?? {};

/** Normaliza para a forma do manifesto: com barra inicial e final, sem query/hash. */
export function normalizeRoute(pathname: string): string {
  let p = pathname.split(/[?#]/)[0] || '/';
  if (!p.startsWith('/')) p = '/' + p;
  if (!p.endsWith('/')) p += '/';
  return p;
}

/** Datas da rota, ou null quando a rota não existe no manifesto. */
export function getRouteDates(pathname: string): RouteDates | null {
  return routes[normalizeRoute(pathname)] ?? null;
}

/**
 * dateModified final de uma página: nunca anterior ao datePublished declarado.
 * Um arquivo pode ter sido reescrito no repositório antes da data editorial de
 * publicação; nesse caso a data de modificação exibida é a própria publicação.
 */
export function resolveModified(modified: string, published?: string | null): string {
  if (published && published.slice(0, 10) > modified) return published.slice(0, 10);
  return modified;
}
