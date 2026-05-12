/**
 * Motor de busca BM25 com fuzzy e n-grams.
 *
 * Independente de dados: recebe um corpus de EngineDoc (campos já folded) e
 * uma query também folded + expandida. Indexa via posting list invertida e
 * pontua com BM25 multi-campo + boosts. Termos longos sem match exato
 * disparam fuzzy (Levenshtein <= max). N-grams 2-3 chars adicionam pequeno
 * boost para captar variantes morfológicas.
 *
 * Funções puras. Sem efeitos colaterais globais. Testáveis em isolamento.
 *
 * REGRA #0: textos visíveis em português brasileiro com acentuação completa.
 */

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export interface EngineDoc {
  id: string;
  fields: {
    /** Já folded (sem acentos, lowercase). */
    title: string;
    /** Já folded. */
    subtitle?: string;
    /** Já folded. */
    keywords?: string;
    /** Já folded. */
    tags?: string[];
  };
  weight: number;
}

export interface ScoredResult<T = unknown> {
  doc: T;
  score: number;
  /** Matches por campo, para highlight no frontend. */
  matches: { field: string; term: string; positions: number[] }[];
  /** Termos da query que casaram (já folded). */
  matchedTerms: string[];
}

export type FieldName = 'title' | 'subtitle' | 'keywords' | 'tags';

export interface BM25Opts {
  /** Saturação de term-frequency. Padrão BM25: 1.5. */
  k1?: number;
  /** Normalização por comprimento. Padrão BM25: 0.75. */
  b?: number;
  /** Pesos relativos por campo. */
  fieldBoosts?: Partial<Record<FieldName, number>>;
  /** Distância máxima Levenshtein para fuzzy. Default 1; sobe para 2 em query >= 6 chars. */
  fuzzyMaxDistance?: number;
  /** Token mínimo para acionar fuzzy. Default 4. */
  fuzzyMinTermLen?: number;
  /** Tamanhos de n-gram. Default [2,3]. */
  ngramSize?: number[];
  /** Limite de resultados. Default 50. */
  limit?: number;
}

export interface PrecomputedIndex {
  /** Termo folded → IDF agregado (corpus inteiro). */
  idf: Record<string, number>;
  /** Média de tokens por documento (somando todos os campos). */
  avgLen: number;
  /** id do doc → soma de comprimentos de campo (em tokens). */
  docLens: Record<string, number>;
  /** Comprimento médio por campo (para BM25 multi-campo correto). */
  avgLenByField: Record<FieldName, number>;
  /** Comprimento de cada doc por campo (tokens). */
  docLenByField: Record<string, Record<FieldName, number>>;
  /**
   * Índice invertido. Termo folded → lista de posting entries.
   * Cada entry contém docId, tf agregado, e em quais campos apareceu.
   */
  invertedIndex: Record<
    string,
    { docId: string; tf: number; fields: FieldName[]; tfByField: Record<FieldName, number> }[]
  >;
  /** Vocabulário completo (chaves do invertedIndex em array). */
  vocabulary: string[];
}

export interface ParsedQuery {
  /** Termos obrigatórios (já folded). */
  must: string[];
  /** Frases exatas entre aspas (já folded). */
  phrases: string[];
  /** Termos com prefixo `-`, a excluir. */
  not: string[];
  /** Filtros `chave:valor` (ex.: `kind:guia`, `persona:rh`). */
  filters: Record<string, string>;
  /** Query original como digitada. */
  raw: string;
}

// ---------------------------------------------------------------------------
// fold local (cópia minimalista para manter independência)
// ---------------------------------------------------------------------------

function foldLocal(s: string): string {
  if (!s) return '';
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[ºª]/g, '')
    .toLowerCase()
    .trim();
}

function tokenize(s: string): string[] {
  if (!s) return [];
  return s
    .split(/[^a-z0-9]+/i)
    .map(t => t.trim())
    .filter(Boolean);
}

const DEFAULT_FIELD_BOOSTS: Record<FieldName, number> = {
  title: 5.0,
  subtitle: 2.0,
  tags: 3.0,
  keywords: 1.0,
};

// ---------------------------------------------------------------------------
// Levenshtein limitado
// ---------------------------------------------------------------------------

/**
 * Distância de edição com curto-circuito acima do limite.
 * Implementação em duas linhas alternadas para O(min(a,b)) de memória.
 */
export function levenshtein(a: string, b: string, max: number = 2): number {
  if (a === b) return 0;
  const la = a.length;
  const lb = b.length;
  if (Math.abs(la - lb) > max) return max + 1;
  if (la === 0) return lb;
  if (lb === 0) return la;

  let prev = new Array<number>(lb + 1);
  let curr = new Array<number>(lb + 1);
  for (let j = 0; j <= lb; j++) prev[j] = j;

  for (let i = 1; i <= la; i++) {
    curr[0] = i;
    let rowMin = curr[0];
    for (let j = 1; j <= lb; j++) {
      const cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      if (curr[j] < rowMin) rowMin = curr[j];
    }
    if (rowMin > max) return max + 1;
    const tmp = prev;
    prev = curr;
    curr = tmp;
  }
  return prev[lb];
}

// ---------------------------------------------------------------------------
// N-grams
// ---------------------------------------------------------------------------

/** Gera n-grams contíguos para os tamanhos pedidos. Default [2,3]. */
export function ngrams(s: string, sizes: number[] = [2, 3]): string[] {
  if (!s) return [];
  const out: string[] = [];
  for (const n of sizes) {
    if (n <= 0 || n > s.length) continue;
    for (let i = 0; i <= s.length - n; i++) {
      out.push(s.slice(i, i + n));
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// parseQuery
// ---------------------------------------------------------------------------

/**
 * Reconhece "frase exata", -termo (exclusão) e chave:valor (filtros).
 * Retorna todos os componentes já folded (exceto o raw).
 */
export function parseQuery(q: string): ParsedQuery {
  const raw = q || '';
  const must: string[] = [];
  const phrases: string[] = [];
  const not: string[] = [];
  const filters: Record<string, string> = {};

  // Extrai frases entre aspas primeiro.
  const phraseRegex = /"([^"]+)"/g;
  let stripped = raw;
  let m: RegExpExecArray | null;
  while ((m = phraseRegex.exec(raw)) !== null) {
    const folded = foldLocal(m[1]);
    if (folded) phrases.push(folded);
    stripped = stripped.replace(m[0], ' ');
  }

  // Tokeniza o restante respeitando :
  const parts = stripped.split(/\s+/).map(p => p.trim()).filter(Boolean);
  for (const part of parts) {
    if (part.startsWith('-') && part.length > 1) {
      const t = foldLocal(part.slice(1));
      if (t) not.push(t);
      continue;
    }
    const colonIdx = part.indexOf(':');
    if (colonIdx > 0 && colonIdx < part.length - 1) {
      const key = foldLocal(part.slice(0, colonIdx));
      const val = foldLocal(part.slice(colonIdx + 1));
      if (key && val) {
        filters[key] = val;
        continue;
      }
    }
    const folded = foldLocal(part);
    if (folded) must.push(folded);
  }

  return { must, phrases, not, filters, raw };
}

// ---------------------------------------------------------------------------
// Sugestão de correção
// ---------------------------------------------------------------------------

/**
 * Para um token raro, propõe a forma mais próxima do vocabulário dentro do
 * limite de edição. Retorna null se nada cair abaixo do threshold.
 */
export function suggestCorrection(
  token: string,
  vocabulary: string[],
  maxDistance: number = 2,
): string | null {
  if (!token || token.length < 4) return null;
  let best: { term: string; d: number } | null = null;
  for (const term of vocabulary) {
    if (Math.abs(term.length - token.length) > maxDistance) continue;
    const d = levenshtein(token, term, maxDistance);
    if (d > maxDistance) continue;
    if (!best || d < best.d || (d === best.d && term.length === token.length)) {
      best = { term, d };
    }
    if (best.d === 0) break;
  }
  return best && best.d > 0 ? best.term : null;
}

// ---------------------------------------------------------------------------
// indexEngine: pré-computa posting lists, idf, comprimentos
// ---------------------------------------------------------------------------

/**
 * Constrói o índice invertido + estatísticas BM25 para o corpus.
 * Custo: O(N · L) onde N é número de docs e L tokens médio. Reutilizável
 * entre chamadas de bm25Search enquanto o corpus não mudar.
 */
export function indexEngine(docs: EngineDoc[]): PrecomputedIndex {
  const invertedIndex: PrecomputedIndex['invertedIndex'] = Object.create(null);
  const docLens: Record<string, number> = Object.create(null);
  const docLenByField: Record<string, Record<FieldName, number>> = Object.create(null);
  const fieldNames: FieldName[] = ['title', 'subtitle', 'keywords', 'tags'];
  const lenSumByField: Record<FieldName, number> = { title: 0, subtitle: 0, keywords: 0, tags: 0 };
  const countByField: Record<FieldName, number> = { title: 0, subtitle: 0, keywords: 0, tags: 0 };
  let totalLen = 0;

  for (const doc of docs) {
    const perField: Record<FieldName, number> = { title: 0, subtitle: 0, keywords: 0, tags: 0 };
    let docLen = 0;

    for (const fn of fieldNames) {
      const raw = (doc.fields as Record<string, string | string[] | undefined>)[fn];
      let tokens: string[] = [];
      if (Array.isArray(raw)) tokens = raw.flatMap(v => tokenize(v));
      else if (typeof raw === 'string') tokens = tokenize(raw);
      perField[fn] = tokens.length;
      docLen += tokens.length;
      lenSumByField[fn] += tokens.length;
      countByField[fn] += 1;

      // Acumula tf por (term, doc, field)
      const localTf: Record<string, number> = Object.create(null);
      for (const t of tokens) localTf[t] = (localTf[t] || 0) + 1;
      for (const [term, tf] of Object.entries(localTf)) {
        let posting = invertedIndex[term];
        if (!posting) {
          posting = [];
          invertedIndex[term] = posting;
        }
        let entry = posting.find(e => e.docId === doc.id);
        if (!entry) {
          entry = {
            docId: doc.id,
            tf: 0,
            fields: [],
            tfByField: { title: 0, subtitle: 0, keywords: 0, tags: 0 },
          };
          posting.push(entry);
        }
        entry.tf += tf;
        entry.tfByField[fn] = (entry.tfByField[fn] || 0) + tf;
        if (!entry.fields.includes(fn)) entry.fields.push(fn);
      }
    }

    docLens[doc.id] = docLen;
    docLenByField[doc.id] = perField;
    totalLen += docLen;
  }

  const N = docs.length || 1;
  const idf: Record<string, number> = Object.create(null);
  for (const [term, posting] of Object.entries(invertedIndex)) {
    const df = posting.length;
    // IDF Lucene/BM25+1 (sempre positivo)
    idf[term] = Math.log(1 + (N - df + 0.5) / (df + 0.5));
  }

  const avgLen = totalLen / N;
  const avgLenByField: Record<FieldName, number> = {
    title: lenSumByField.title / Math.max(1, countByField.title),
    subtitle: lenSumByField.subtitle / Math.max(1, countByField.subtitle),
    keywords: lenSumByField.keywords / Math.max(1, countByField.keywords),
    tags: lenSumByField.tags / Math.max(1, countByField.tags),
  };

  return {
    idf,
    avgLen,
    docLens,
    avgLenByField,
    docLenByField,
    invertedIndex,
    vocabulary: Object.keys(invertedIndex),
  };
}

// ---------------------------------------------------------------------------
// bm25Search
// ---------------------------------------------------------------------------

interface Accumulator {
  score: number;
  matched: Set<string>;
  matches: { field: string; term: string; positions: number[] }[];
}

function findPositions(haystack: string | string[] | undefined, term: string): number[] {
  if (!haystack || !term) return [];
  if (Array.isArray(haystack)) {
    // Para arrays de tags, devolve o índice do elemento que contém.
    const out: number[] = [];
    for (let i = 0; i < haystack.length; i++) {
      if (haystack[i].includes(term)) out.push(i);
    }
    return out;
  }
  const out: number[] = [];
  let idx = 0;
  while ((idx = haystack.indexOf(term, idx)) !== -1) {
    out.push(idx);
    idx += term.length || 1;
  }
  return out;
}

/**
 * Busca BM25 com fuzzy e n-grams.
 *
 * Complexidade: O(|terms| · |postings_médio|) — varre apenas docs com match,
 * graças ao índice invertido. Fuzzy aumenta em O(|terms| · |vocab|) no pior
 * caso, mas com curto-circuito Levenshtein na prática fica próximo de linear.
 */
export function bm25Search<T extends EngineDoc>(
  docs: T[],
  query: string,
  expanded: string[],
  precomputed: PrecomputedIndex,
  opts: BM25Opts = {},
): ScoredResult<T>[] {
  const k1 = opts.k1 ?? 1.5;
  const b = opts.b ?? 0.75;
  const fieldBoosts: Record<FieldName, number> = {
    ...DEFAULT_FIELD_BOOSTS,
    ...(opts.fieldBoosts || {}),
  };
  const minLen = opts.fuzzyMinTermLen ?? 4;
  const defaultMaxDist = opts.fuzzyMaxDistance ?? 1;
  const ngSizes = opts.ngramSize ?? [2, 3];
  const limit = opts.limit ?? 50;

  if (!query || !expanded.length || docs.length === 0) return [];

  const docsById = new Map<string, T>();
  for (const d of docs) docsById.set(d.id, d);

  // Termos únicos a buscar (já folded).
  const queryTerms = Array.from(new Set(expanded.filter(Boolean)));
  const accumulators = new Map<string, Accumulator>();

  function addScore(
    docId: string,
    delta: number,
    term: string,
    matchedTerm: string,
  ): void {
    let acc = accumulators.get(docId);
    if (!acc) {
      acc = { score: 0, matched: new Set<string>(), matches: [] };
      accumulators.set(docId, acc);
    }
    acc.score += delta;
    acc.matched.add(matchedTerm);
    const doc = docsById.get(docId);
    if (!doc) return;
    const fieldNames: FieldName[] = ['title', 'subtitle', 'keywords', 'tags'];
    for (const fn of fieldNames) {
      const rawField = (doc.fields as Record<string, string | string[] | undefined>)[fn];
      const positions = findPositions(rawField, term);
      if (positions.length) acc.matches.push({ field: fn, term, positions });
    }
  }

  function scoreTerm(term: string, contributionMultiplier: number, displayTerm: string): void {
    const posting = precomputed.invertedIndex[term];
    if (!posting) return;
    const idf = precomputed.idf[term] || 0;
    if (idf <= 0) return;

    for (const entry of posting) {
      const lens = precomputed.docLenByField[entry.docId];
      let docTermScore = 0;
      for (const fn of ['title', 'subtitle', 'keywords', 'tags'] as FieldName[]) {
        const tf = entry.tfByField[fn] || 0;
        if (tf === 0) continue;
        const dl = lens?.[fn] || 0;
        const avg = precomputed.avgLenByField[fn] || 1;
        const norm = 1 - b + b * (dl / Math.max(1, avg));
        const tfTerm = (tf * (k1 + 1)) / (tf + k1 * norm);
        docTermScore += fieldBoosts[fn] * idf * tfTerm;
      }
      if (docTermScore !== 0) {
        addScore(entry.docId, docTermScore * contributionMultiplier, term, displayTerm);
      }
    }
  }

  // Passo 1: termos exatos da query expandida.
  for (const term of queryTerms) {
    scoreTerm(term, 1.0, term);
  }

  // Passo 2: fuzzy para tokens curtos sem match exato.
  for (const term of queryTerms) {
    if (term.length < minLen) continue;
    if (precomputed.invertedIndex[term]) continue;
    const maxDist = term.length >= 6 ? Math.max(defaultMaxDist, 2) : defaultMaxDist;
    for (const candidate of precomputed.vocabulary) {
      if (Math.abs(candidate.length - term.length) > maxDist) continue;
      if (candidate === term) continue;
      const d = levenshtein(term, candidate, maxDist);
      if (d > maxDist) continue;
      // Match fuzzy contribui com 0.5x e cai proporcional à distância.
      const penalty = 0.5 / (1 + d);
      scoreTerm(candidate, penalty, term);
    }
  }

  // Passo 3: n-grams (boost pequeno) — só para termos com tamanho suficiente.
  const ngramSeen = new Set<string>();
  for (const term of queryTerms) {
    if (term.length < 4) continue;
    for (const ng of ngrams(term, ngSizes)) {
      if (ngramSeen.has(ng)) continue;
      ngramSeen.add(ng);
      const idf = precomputed.idf[ng];
      const posting = precomputed.invertedIndex[ng];
      if (!posting || !idf) continue;
      for (const entry of posting) {
        addScore(entry.docId, 0.1 * idf, ng, term);
      }
    }
  }

  // Passo 4: aplica weight do doc e ordena.
  const results: ScoredResult<T>[] = [];
  for (const [docId, acc] of accumulators) {
    const doc = docsById.get(docId);
    if (!doc) continue;
    const finalScore = acc.score * doc.weight;
    if (finalScore <= 0) continue;
    results.push({
      doc,
      score: finalScore,
      matches: acc.matches,
      matchedTerms: Array.from(acc.matched),
    });
  }

  results.sort((a, b2) => b2.score - a.score);
  return results.slice(0, limit);
}

// ---------------------------------------------------------------------------
// Smoke tests (executar com `tsx src/lib/search-engine.ts`)
// ---------------------------------------------------------------------------

// O bloco abaixo só roda quando o arquivo é invocado como script direto.
// Mantemos as asserções como documentação executável.
declare const process: { argv: string[] } | undefined;

if (typeof import.meta !== 'undefined' && typeof process !== 'undefined') {
  const url: string = import.meta.url;
  if (url && process.argv[1] && url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
    /* eslint-disable no-console */
    const sample: EngineDoc[] = [
      {
        id: 'a',
        fields: { title: 'psicologia organizacional', subtitle: 'pot', tags: ['pot', 'rh'], keywords: 'rh organizacional pot' },
        weight: 1.6,
      },
      {
        id: 'b',
        fields: { title: 'neuropsicologia', subtitle: 'avaliacao', tags: ['neuro'], keywords: 'avaliacao neurologica cognicao' },
        weight: 1.2,
      },
      {
        id: 'c',
        fields: { title: 'mba em lideranca', subtitle: 'gestao', tags: ['mba', 'lideranca'], keywords: 'mba lideranca gestao executivos' },
        weight: 1.5,
      },
    ];
    const idx = indexEngine(sample);

    // 1) BM25: query exata "neuropsicologia" rankeia o doc B no topo.
    const r1 = bm25Search(sample, 'neuropsicologia', ['neuropsicologia'], idx);
    console.assert(r1[0]?.doc.id === 'b', 'BM25 deve priorizar match exato em title');

    // 2) Fuzzy 1-edit: "neuropsiculogia" ainda acerta neuropsicologia.
    const r2 = bm25Search(sample, 'neuropsiculogia', ['neuropsiculogia'], idx);
    console.assert(r2[0]?.doc.id === 'b', 'Fuzzy 1-edit deve recuperar neuropsicologia');

    // 3) N-grams: query "neuro" pega prefixo via n-gram.
    const r3 = bm25Search(sample, 'neuro', ['neuro'], idx);
    console.assert(r3.some(r => r.doc.id === 'b'), 'N-gram/prefixo deve capturar neuro');

    // 4) parseQuery: -termo, "frase", chave:valor.
    const p = parseQuery('mba "psicologia organizacional" -clinica kind:guia');
    console.assert(p.must.includes('mba'), 'parseQuery: must');
    console.assert(p.phrases.includes('psicologia organizacional'), 'parseQuery: phrases');
    console.assert(p.not.includes('clinica'), 'parseQuery: not');
    console.assert(p.filters.kind === 'guia', 'parseQuery: filters');

    // 5) levenshtein: cap em 2 com curto-circuito.
    console.assert(levenshtein('teste', 'tesste', 2) === 1, 'levenshtein 1-insert');
    console.assert(levenshtein('abcdef', 'xyzwvu', 2) > 2, 'levenshtein curto-circuita');

    console.log('search-engine smoke: OK');
  }
}
