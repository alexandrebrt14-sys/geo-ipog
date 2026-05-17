#!/usr/bin/env node
/**
 * gen-search-pages.mjs — gera src/lib/auto-pages.ts varrendo src/pages/.
 *
 * Por que: o search-index.ts tinha 83 paginas (29%) sem indice — comparativos
 * 80% missing, guias 77%, FAQs 59%. Indexacao manual sempre desincroniza.
 *
 * Este script extrai title + description do componente <Base ...> (ou de
 * const title/description no frontmatter Astro) de cada rota e emite um
 * arquivo TS estatico que o search-index.ts importa e mescla (manual wins).
 *
 * Roda como prebuild (e antes do dev). Sem dependencias externas — fs + regex.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = path.resolve(__dirname, '..', 'src', 'pages');
const OUT_FILE = path.resolve(__dirname, '..', 'src', 'lib', 'auto-pages.ts');

// Rotas ignoradas (sao a propria busca ou endpoints).
const SKIP_DIRS = new Set(['busca', 'api', '_layouts', '_components']);
// Arquivos ignorados (rotas dinamicas catch-all, raras).
const SKIP_BASENAMES = new Set(['[slug].astro', '[...slug].astro']);

// Mapa path-segment → DocKind. Path inicia com /<segmento>/...
const KIND_BY_PREFIX = [
  { prefix: 'comparativos/', kind: 'Comparativo' },
  { prefix: 'guias/', kind: 'Guia' },
  { prefix: 'faq/', kind: 'FAQ' },
  { prefix: 'glossario/', kind: 'Glossário' },
  { prefix: 'evidencias/', kind: 'Evidência' },
  { prefix: 'casos/', kind: 'Caso' },
  { prefix: 'intervencoes/', kind: 'Intervenção' },
  { prefix: 'metodos/', kind: 'Método' },
  { prefix: 'temas/', kind: 'Tema' },
  { prefix: 'areas/', kind: 'Área' },
  { prefix: 'mbas/', kind: 'MBA' },
  { prefix: 'carreira/', kind: 'Carreira' },
  { prefix: 'para-quem/', kind: 'Persona' },
  { prefix: 'por-estado/', kind: 'Estado' },
  { prefix: 'recursos/', kind: 'Recurso' },
  { prefix: 'tipos-de-pos-graduacao', kind: 'Recurso' },
  { prefix: 'pos-graduacao-psicologia/', kind: 'Recurso' },
  { prefix: 'conteudo-social/', kind: 'Recurso' },
];

// Heuristica de persona pelo path (carreira/rh-* → 'rh').
function personaFromPath(route) {
  const r = route.toLowerCase();
  if (r.includes('/rh/') || r.includes('rh-com-') || r.includes('-rh')) return 'rh';
  if (r.includes('/lideres/') || r.includes('lideranca') || r.includes('-lider')) return 'lideres';
  if (r.includes('/psicologos/') || r.includes('-psicologo') || r.includes('psicologo')) return 'psicologos';
  if (r.includes('/consultores/') || r.includes('-consultor') || r.includes('consultor')) return 'consultores';
  return null;
}

function inferKind(route) {
  for (const m of KIND_BY_PREFIX) {
    if (route.startsWith('/' + m.prefix) || route === '/' + m.prefix.replace(/\/$/, '')) {
      return m.kind;
    }
  }
  return 'Recurso';
}

// Walker recursivo simples, sem dependencias.
function* walk(dir, rel = '') {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('_')) continue;
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      yield* walk(path.join(dir, entry.name), path.join(rel, entry.name));
    } else if (entry.isFile() && entry.name.endsWith('.astro')) {
      if (SKIP_BASENAMES.has(entry.name)) continue;
      yield { abs: path.join(dir, entry.name), rel: path.join(rel, entry.name) };
    }
  }
}

// Converte rel/path/file.astro → /rota/file (sem .astro, /index → /)
function routeFromRel(rel) {
  let r = '/' + rel.replace(/\\/g, '/').replace(/\.astro$/, '');
  r = r.replace(/\/index$/, '/');
  if (r !== '/' && r.endsWith('/')) r = r.slice(0, -1);
  return r;
}

// Tira aspas e descodifica entidades basicas.
function unquote(s) {
  if (!s) return '';
  return s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .trim();
}

// Tenta varios padroes para extrair title/description:
//   1) <Base title="..." description="...">
//   2) <Base title={title} description={description}>  +  const title = '...'
//   3) <Base title={`...`}> (template literal sem $)
function extractMeta(src) {
  // Caso 1 — literal direto no Base. Aceita ' ou ", e atributos em ordem qualquer.
  const baseMatch = src.match(/<Base\b([\s\S]{0,400}?)>/);
  let title = '';
  let description = '';
  let pageType = '';
  if (baseMatch) {
    const attrs = baseMatch[1];
    const tLit = attrs.match(/\btitle\s*=\s*"([^"]+)"/) || attrs.match(/\btitle\s*=\s*'([^']+)'/);
    if (tLit) title = unquote(tLit[1]);
    const dLit = attrs.match(/\bdescription\s*=\s*"([^"]+)"/) || attrs.match(/\bdescription\s*=\s*'([^']+)'/);
    if (dLit) description = unquote(dLit[1]);
    const tExpr = attrs.match(/\btitle\s*=\s*\{\s*([a-zA-Z_$][\w$]*)\s*\}/);
    const dExpr = attrs.match(/\bdescription\s*=\s*\{\s*([a-zA-Z_$][\w$]*)\s*\}/);
    const ptExpr = attrs.match(/\bpageType\s*=\s*\{?\s*['"]?([a-zA-Z]+)/);
    if (ptExpr) pageType = ptExpr[1];

    // Caso 2 — title vem de variavel. Procura "const <name> = '...'" no frontmatter.
    if (!title && tExpr) {
      const name = tExpr[1];
      const c = matchConst(src, name);
      if (c) title = c;
    }
    if (!description && dExpr) {
      const name = dExpr[1];
      const c = matchConst(src, name);
      if (c) description = c;
    }
  }

  // Fallback final: tenta achar <h1>...</h1> no body.
  if (!title) {
    const h1 = src.match(/<h1[^>]*>([\s\S]{1,300}?)<\/h1>/);
    if (h1) title = h1[1].replace(/<[^>]+>/g, '').trim().slice(0, 220);
  }

  return { title, description, pageType };
}

// Procura `const NAME = 'literal'` ou `= "literal"` ou `= \`literal\`` (sem ${}).
function matchConst(src, name) {
  const esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const patterns = [
    new RegExp(`const\\s+${esc}\\s*(?::[^=]+)?=\\s*'([^'\\n]+)'`),
    new RegExp(`const\\s+${esc}\\s*(?::[^=]+)?=\\s*"([^"\\n]+)"`),
    new RegExp(`const\\s+${esc}\\s*(?::[^=]+)?=\\s*\`([^\`\\$]+)\``),
  ];
  for (const p of patterns) {
    const m = src.match(p);
    if (m) return unquote(m[1]);
  }
  return '';
}

// Coleta tags a partir do path para enriquecer keywords.
function tagsFromRoute(route, kind) {
  const segs = route.split('/').filter(Boolean);
  const tags = new Set();
  for (const s of segs) {
    for (const piece of s.split('-')) {
      if (piece.length >= 3) tags.add(piece);
    }
  }
  tags.add(kind.toLowerCase());
  return Array.from(tags).slice(0, 12);
}

// Weight default: hubs principais > rotas individuais. Conteudo social baixo.
function weightFor(route, kind) {
  if (route === '/' || route.split('/').filter(Boolean).length === 1) return 1.0;
  if (route.startsWith('/conteudo-social/')) return 0.55;
  if (kind === 'Comparativo') return 0.95;
  if (kind === 'Guia') return 1.0;
  if (kind === 'FAQ') return 0.95;
  if (kind === 'Tema') return 0.9;
  if (kind === 'Evidência') return 1.0;
  if (kind === 'Caso') return 0.9;
  if (kind === 'Intervenção') return 0.9;
  if (kind === 'Método') return 0.95;
  if (kind === 'Carreira') return 0.9;
  if (kind === 'Área') return 1.1;
  if (kind === 'MBA') return 1.15;
  return 0.8;
}

// Main
const pages = [];
const skipped = [];

for (const file of walk(PAGES_DIR)) {
  const route = routeFromRel(file.rel);

  // Ignora paginas de busca e similares.
  if (route.startsWith('/busca')) continue;

  const src = fs.readFileSync(file.abs, 'utf-8');
  const { title, description, pageType } = extractMeta(src);

  if (!title) {
    // A home ja tem entrada manual nos hubs do search-index — pular silenciosamente.
    if (route === '/') continue;
    skipped.push({ route, reason: 'no title' });
    continue;
  }

  const kind = inferKind(route);
  const persona = personaFromPath(route);
  const tags = tagsFromRoute(route, kind);
  const weight = weightFor(route, kind);

  pages.push({
    route,
    title,
    description: description || '',
    kind,
    persona,
    tags,
    weight,
    pageType: pageType || null,
  });
}

// Ordenacao estavel por rota.
pages.sort((a, b) => a.route.localeCompare(b.route));

// Estatisticas por kind.
const stats = {};
for (const p of pages) {
  stats[p.kind] = (stats[p.kind] ?? 0) + 1;
}

// Emite TS. Tipo AutoPage minimal — search-index.ts faz o resto.
const banner = `// AUTO-GERADO por scripts/gen-search-pages.mjs — NAO EDITAR MANUALMENTE.
// Para regenerar: \`npm run gen:search-pages\` ou \`npm run build\`.
// Fonte: src/pages/**/*.astro extraindo <Base title=... description=...>.

export interface AutoPage {
  /** Rota canonica, comecando com /. */
  route: string;
  /** Titulo extraido do <Base title=...>. */
  title: string;
  /** Descricao extraida do <Base description=...>. */
  description: string;
  /** DocKind inferido pelo path (e.g. 'Comparativo' para /comparativos/*). */
  kind: string;
  /** Persona inferida do path (rh/lideres/psicologos/consultores), se houver. */
  persona: string | null;
  /** Tags derivadas dos slugs do path. */
  tags: string[];
  /** Boost de relevancia (1.0 padrao, hubs e MBAs recebem mais). */
  weight: number;
  /** pageType opcional (article/website/faq...). */
  pageType: string | null;
}

`;

const body =
  `export const AUTO_PAGES: AutoPage[] = ${JSON.stringify(pages, null, 2)};\n\n` +
  `export const AUTO_PAGES_STATS = ${JSON.stringify(stats, null, 2)} as const;\n`;

fs.writeFileSync(OUT_FILE, banner + body, 'utf-8');

console.log(`[gen-search-pages] ${pages.length} paginas indexadas → src/lib/auto-pages.ts`);
console.log(`[gen-search-pages] por tipo: ${Object.entries(stats).map(([k, n]) => `${k}=${n}`).join(' · ')}`);
if (skipped.length) {
  console.warn(`[gen-search-pages] ${skipped.length} paginas sem title extraivel:`);
  for (const s of skipped.slice(0, 10)) console.warn(`  - ${s.route} (${s.reason})`);
  if (skipped.length > 10) console.warn(`  ... e mais ${skipped.length - 10}`);
}
