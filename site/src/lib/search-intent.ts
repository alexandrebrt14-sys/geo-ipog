/**
 * Detector de intent (intenção da busca) — posgraduacaopsicologia.com.
 *
 * Classifica a query em uma das categorias canônicas:
 *  - find     · buscar conteúdo concreto (default quando há termo)
 *  - compare  · comparar A vs B
 *  - learn    · entender o que é, definição, exemplo
 *  - locate   · presença geográfica / modalidade
 *  - enroll   · matrícula, inscrição, preço, ingresso
 *  - unknown  · query vazia ou só stop-words
 *
 * Heurísticas: gazetteer + regex sobre query já folded (sem acento, lowercase).
 * Função pura, sem side-effects.
 *
 * REGRA #0: textos visíveis em português brasileiro com acentuação completa.
 */

import { ESTADOS } from './data';
import { fold } from './search-index';

// ---------------------------------------------------------------------------
// Tipos públicos
// ---------------------------------------------------------------------------

export type SearchIntent = 'find' | 'compare' | 'learn' | 'locate' | 'enroll' | 'unknown';

export interface IntentResult {
  intent: SearchIntent;
  confidence: number;     // 0-1
  signals: string[];      // termos que dispararam a detecção
}

// ---------------------------------------------------------------------------
// Gazetteers folded
// ---------------------------------------------------------------------------

const COMPARE_PATTERNS: RegExp[] = [
  /\bvs\b/,
  /\bversus\b/,
  /\bx\b/,
  /\bdiferenca entre\b/,
  /\bdiferenca de\b/,
  /\bdiferencas entre\b/,
  /\bqual o melhor\b/,
  /\bqual e melhor\b/,
  /\bmelhor que\b/,
  /\bcompar(a|ar|acao|ativo)\b/,
  /\bou\b/,  // "TCC ou ACT" — peso menor
];

const LEARN_TERMS = [
  'o que e', 'oque e', 'oque é', 'o q é', 'o que é',
  'como funciona', 'como atua', 'como age',
  'definicao', 'conceito', 'significado',
  'exemplo', 'exemplos',
  'guia', 'tutorial', 'passo a passo', 'introducao',
  'para iniciantes', 'para quem comeca', 'comecar a estudar',
  'historia', 'origem', 'fundamentos',
  'quem criou', 'quem inventou',
  'principios',
];

const LOCATE_TERMS = [
  'em ', 'perto de', 'proximo a', 'na regiao',
  'presencial', 'online ao vivo', 'ao vivo',
  'polo', 'campus', 'unidade', 'turma presencial',
  'no estado', 'na cidade',
];

const LOCATE_REGIOES = ['norte', 'nordeste', 'centro-oeste', 'centro oeste', 'sudeste', 'sul'];

const ENROLL_TERMS = [
  'matricula', 'inscricao', 'inscricoes', 'inscrever',
  'preco', 'precos', 'valor', 'valores', 'mensalidade',
  'como entrar', 'como fazer', 'como participar',
  'comecar', 'comeco', 'ingresso', 'ingressar',
  'investimento', 'parcelamento', 'parcelas', 'desconto',
  'turma', 'proxima turma', 'data de inicio', 'quando comeca',
  'edital', 'cronograma',
];

// Stop-words puros (query como "o" ou "para o que" sem termo concreto)
const STOPWORDS = new Set([
  'a','o','as','os','um','uma','de','da','do','das','dos','para','por','com','sem','e','ou','no','na','nos','nas',
  'que','q','qual','quais','quem','quando','onde','como','sobre','ate','ja','mais','menos','muito','pouco',
  'sim','nao','aqui','la','ali','isso','isto','aquilo','meu','minha','seu','sua','nosso','nossa','esse','essa',
]);

// Conjuntos de UFs folded para detecção de locate
const UF_LOWER = new Set(ESTADOS.map(e => e.uf.toLowerCase()));
const ESTADO_NOMES_FOLDED = new Set(ESTADOS.map(e => fold(e.nome)));

// ---------------------------------------------------------------------------
// Implementação
// ---------------------------------------------------------------------------

function tokenize(q: string): string[] {
  return q.split(/\s+/).filter(Boolean);
}

function isPureStopwords(tokens: string[]): boolean {
  if (tokens.length === 0) return true;
  return tokens.every(t => STOPWORDS.has(t));
}

function detectCompare(q: string): string[] {
  const signals: string[] = [];
  for (const re of COMPARE_PATTERNS) {
    const m = q.match(re);
    if (m) signals.push(m[0]);
  }
  return signals;
}

function detectLocate(q: string, tokens: string[]): string[] {
  const signals: string[] = [];

  for (const term of LOCATE_TERMS) {
    if (q.includes(term)) signals.push(term.trim());
  }
  for (const reg of LOCATE_REGIOES) {
    if (q.includes(reg)) signals.push(reg);
  }

  // UFs (apenas tokens curtos de 2 chars para evitar falsos positivos como "rs" em "estresse")
  for (const t of tokens) {
    if (t.length === 2 && UF_LOWER.has(t)) signals.push(t);
  }
  // Nomes de estado (multi-token também)
  for (const nome of ESTADO_NOMES_FOLDED) {
    if (q.includes(nome)) signals.push(nome);
  }

  return signals;
}

function detectEnroll(q: string): string[] {
  const signals: string[] = [];
  for (const term of ENROLL_TERMS) {
    if (q.includes(term)) signals.push(term);
  }
  return signals;
}

function detectLearn(q: string): string[] {
  const signals: string[] = [];
  for (const term of LEARN_TERMS) {
    if (q.includes(term)) signals.push(term);
  }
  return signals;
}

/**
 * Detecta intent a partir da query folded.
 * Aplica precedência: compare > enroll > locate > learn > find > unknown.
 */
export function detectIntent(qFolded: string): IntentResult {
  const q = (qFolded || '').trim();

  if (!q) {
    return { intent: 'unknown', confidence: 1.0, signals: [] };
  }

  const tokens = tokenize(q);
  if (isPureStopwords(tokens)) {
    return { intent: 'unknown', confidence: 0.9, signals: tokens };
  }

  const compareSignals = detectCompare(q);
  const enrollSignals = detectEnroll(q);
  const locateSignals = detectLocate(q, tokens);
  const learnSignals = detectLearn(q);

  // Compare tem precedência (mais específico semanticamente),
  // mas "ou" sozinho não basta — precisa de termo concreto adicional.
  if (compareSignals.length > 0) {
    const strong = compareSignals.some(s => s !== 'ou' && s !== 'x');
    const weakOnly = !strong && compareSignals.every(s => s === 'ou' || s === 'x');

    if (strong) {
      const confidence = Math.min(0.95, 0.7 + 0.1 * compareSignals.length);
      return { intent: 'compare', confidence, signals: compareSignals };
    }
    // "ou"/"x" sozinho só vira compare se houver ≥2 termos concretos não-stop
    if (weakOnly) {
      const nonStop = tokens.filter(t => !STOPWORDS.has(t) && t !== 'ou' && t !== 'x');
      if (nonStop.length >= 2) {
        return { intent: 'compare', confidence: 0.6, signals: compareSignals };
      }
    }
  }

  if (enrollSignals.length > 0) {
    const confidence = Math.min(0.92, 0.6 + 0.1 * enrollSignals.length);
    return { intent: 'enroll', confidence, signals: enrollSignals };
  }

  if (locateSignals.length > 0) {
    // UF/estado/regiao dão confiança alta; "presencial" sozinho dá média
    const hasGeo = locateSignals.some(s =>
      UF_LOWER.has(s) || ESTADO_NOMES_FOLDED.has(s) || LOCATE_REGIOES.includes(s)
    );
    const confidence = hasGeo
      ? Math.min(0.95, 0.75 + 0.07 * locateSignals.length)
      : 0.6;
    return { intent: 'locate', confidence, signals: locateSignals };
  }

  if (learnSignals.length > 0) {
    const confidence = Math.min(0.9, 0.65 + 0.08 * learnSignals.length);
    return { intent: 'learn', confidence, signals: learnSignals };
  }

  // default: find (há termo concreto, mas nenhum sinal específico)
  const concreteTokens = tokens.filter(t => !STOPWORDS.has(t));
  const confidence = concreteTokens.length > 0
    ? Math.min(0.8, 0.5 + 0.06 * concreteTokens.length)
    : 0.4;
  return { intent: 'find', confidence, signals: concreteTokens };
}
