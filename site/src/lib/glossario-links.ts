/**
 * Links termo -> verbete do glossário (Onda 5 SEO/GEO, 03/09/2026).
 *
 * Dicionário: src/generated/glossario-termos.json (gerado por
 * scripts/gen-glossario-termos.mjs a partir dos 7 glossários do portal).
 * Aplicação: scripts/seo-postbuild.mjs chama `linkarTermos(html, route)` sobre
 * o HTML final de cada página elegível e envolve a PRIMEIRA ocorrência de cada
 * termo em <a href="/glossario/...#slug" class="gl-link">.
 *
 * Regras:
 * - 1 link por termo por página; no máximo MAX_LINKS por página.
 * - Só no corpo (<main>): nunca dentro de heading, link, botão, summary, código,
 *   script/style/svg, nav, header, footer, formulários.
 * - Casamento por palavra inteira (limites Unicode), sem diferenciar maiúsculas.
 * - Páginas elegíveis: guias, áreas e MBAs (dicionário geral); artigos e seções
 *   do hub de autismo (dicionário do glossário de autismo, depois o geral).
 * - Glossários nunca recebem link para si mesmos.
 */
import dicionario from '../generated/glossario-termos.json';

export interface TermoGlossario {
  id: string;
  termo: string;
  url: string;
  grupo: 'geral' | 'autismo';
  variantes: string[];
}

export const TERMOS: TermoGlossario[] = (dicionario as { termos: TermoGlossario[] }).termos;

const MAX_LINKS = 15;
const SKIP_TAGS = new Set([
  'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'summary', 'code', 'pre', 'kbd', 'label', 'select', 'option',
  'textarea', 'input', 'nav', 'header', 'footer', 'title', 'figcaption', 'cite', 'time', 'abbr', 'dt'
]);
// Conteúdo bruto: pulamos o bloco inteiro até a tag de fechamento.
const RAW_TAGS = new Set(['script', 'style', 'svg', 'template', 'noscript', 'math']);
const VOID_TAGS = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'source', 'track', 'wbr', 'area', 'base', 'col', 'embed', 'param']);

interface Entrada { termo: TermoGlossario; variante: string; re: RegExp; }

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&');
}

let entradasGeral: Entrada[] | null = null;
let entradasAutismo: Entrada[] | null = null;

function entradas(grupo: 'geral' | 'autismo'): Entrada[] {
  const cache = grupo === 'geral' ? entradasGeral : entradasAutismo;
  if (cache) return cache;
  const out: Entrada[] = [];
  for (const t of TERMOS) {
    if (t.grupo !== grupo) continue;
    for (const v of t.variantes) {
      // Sigla (ACT, NR-1, PHQ-9): casamento sensível a maiúsculas, senão "Act" de
      // "Plan, Do, Check, Act" viraria link para a terapia ACT. Nome comum: insensível.
      const sigla = /^[A-Z0-9][A-Z0-9.\-\/]*$/.test(v);
      out.push({ termo: t, variante: v, re: new RegExp(`(?<![\\p{L}\\p{N}_-])${escapeRe(v)}(?![\\p{L}\\p{N}_-])`, sigla ? 'u' : 'iu') });
    }
  }
  // Variantes mais longas primeiro: "Transtorno do Espectro Autista" antes de "TEA".
  out.sort((a, b) => b.variante.length - a.variante.length);
  if (grupo === 'geral') entradasGeral = out; else entradasAutismo = out;
  return out;
}

/** Decide quais dicionários valem para a rota; vazio = página não elegível. */
export function gruposParaRota(route: string): Array<'geral' | 'autismo'> {
  if (route.startsWith('/glossario')) return [];
  if (route === '/autismo/glossario/') return [];
  if (route.startsWith('/autismo/artigos/') || route.startsWith('/autismo/para-')) return ['autismo', 'geral'];
  if (route.startsWith('/guias/') || route.startsWith('/areas/') || route.startsWith('/mbas/')) return ['geral'];
  return [];
}

interface Segmento { text: string; locked: boolean; }

function tagName(tag: string): string {
  const m = /^<\/?\s*([a-zA-Z][a-zA-Z0-9:-]*)/.exec(tag);
  return m ? m[1].toLowerCase() : '';
}

/**
 * Aplica os links no HTML. Devolve o HTML novo e a quantidade de links criados.
 * Trabalha só entre <main ...> e </main>; sem <main>, entre <body> e </body>.
 */
export function linkarTermos(html: string, route: string): { html: string; count: number } {
  const grupos = gruposParaRota(route);
  if (grupos.length === 0) return { html, count: 0 };

  let start = html.search(/<main\b[^>]*>/i);
  let endTag = '</main>';
  if (start === -1) { start = html.search(/<body\b[^>]*>/i); endTag = '</body>'; }
  if (start === -1) return { html, count: 0 };
  const openEnd = html.indexOf('>', start) + 1;
  const end = html.lastIndexOf(endTag);
  if (end <= openEnd) return { html, count: 0 };

  const region = html.slice(openEnd, end);
  const lista = grupos.flatMap(g => entradas(g));
  const usados = new Set<string>(); // termo.url já linkado nesta página
  let count = 0;

  const tokens = region.match(/<!--[\s\S]*?-->|<[^>]+>|[^<]+/g) || [];
  const out: string[] = [];
  const pilha: string[] = []; // tags de bloqueio abertas
  let raw: string | null = null; // dentro de script/style/svg...

  for (const tok of tokens) {
    if (raw) {
      out.push(tok);
      if (tok.startsWith('</') && tagName(tok) === raw) raw = null;
      continue;
    }
    if (tok.startsWith('<')) {
      out.push(tok);
      if (tok.startsWith('<!--') || tok.startsWith('<!')) continue;
      const name = tagName(tok);
      if (!name) continue;
      if (tok.startsWith('</')) {
        const i = pilha.lastIndexOf(name);
        if (i !== -1) pilha.splice(i, 1);
        continue;
      }
      if (RAW_TAGS.has(name)) { if (!tok.endsWith('/>')) raw = name; continue; }
      if (VOID_TAGS.has(name) || tok.endsWith('/>')) continue;
      if (SKIP_TAGS.has(name)) pilha.push(name);
      continue;
    }
    // Texto.
    if (pilha.length > 0 || count >= MAX_LINKS || !/\p{L}/u.test(tok)) { out.push(tok); continue; }
    let segs: Segmento[] = [{ text: tok, locked: false }];
    for (const e of lista) {
      if (count >= MAX_LINKS) break;
      if (usados.has(e.termo.url)) continue;
      // Não linkar a página para o próprio verbete-alvo nem para o verbete do mesmo slug.
      for (let i = 0; i < segs.length; i++) {
        const s = segs[i];
        if (s.locked) continue;
        const m = e.re.exec(s.text);
        if (!m || m.index === undefined) continue;
        const before = s.text.slice(0, m.index);
        const hit = m[0];
        const after = s.text.slice(m.index + hit.length);
        const anchor = `<a href="${e.termo.url}" class="gl-link" data-termo="${e.termo.id}" title="Ver no glossário: ${e.termo.termo.replace(/"/g, '&quot;')}">${hit}</a>`;
        segs.splice(i, 1, { text: before, locked: false }, { text: anchor, locked: true }, { text: after, locked: false });
        usados.add(e.termo.url);
        count++;
        break;
      }
    }
    out.push(segs.map(s => s.text).join(''));
  }

  if (count === 0) return { html, count: 0 };
  return { html: html.slice(0, openEnd) + out.join('') + html.slice(end), count };
}
