/**
 * NER leve (Named Entity Recognition) — posgraduacaopsicologia.com.
 *
 * Extrai entidades de uma query folded usando gazetteer baseado em
 * data.ts (AREAS, MBAS, PERSONAS, ESTADOS, METODOS, TEMAS) + termos
 * canônicos de glossário e tipos editoriais (DocKind).
 *
 * Função pura, sem side-effects, sem fetch. O algoritmo:
 *  1. Coleta entradas folded ordenadas por comprimento (longest match first).
 *  2. Varredura linear: a cada match, marca span ocupado e gera Entity.
 *  3. Constrói `remainder` removendo os spans ocupados.
 *
 * REGRA #0: textos visíveis em português brasileiro com acentuação completa.
 */

import {
  AREAS,
  MBAS,
  ESTADOS,
  PERSONAS,
  METODOS,
  TEMAS,
  TEMAS_EMERGENTES_2025_2026,
  GLOSSARIO_CLUSTERS,
} from './data';
import { fold } from './search-index';

// ---------------------------------------------------------------------------
// Tipos públicos
// ---------------------------------------------------------------------------

export type EntityType =
  | 'estado'
  | 'persona'
  | 'area'
  | 'mba'
  | 'metodo'
  | 'tema'
  | 'glossario-termo'
  | 'kind';

export interface Entity {
  type: EntityType;
  value: string;          // valor canônico (id quando aplicável)
  display: string;        // forma humana
  span: [number, number]; // posições no original folded
  confidence: number;
}

export interface EntityExtractionResult {
  entities: Entity[];
  remainder: string;      // query sem as entidades extraídas (folded)
}

// ---------------------------------------------------------------------------
// Gazetteer interno: lista [pattern_folded, builder]
// ---------------------------------------------------------------------------

type GazetteerEntry = {
  pattern: string;                  // padrão folded
  type: EntityType;
  value: string;                    // valor canônico
  display: string;                  // forma humana
  confidence: number;
  /** Quando true, exige limites de palavra (\b) para casar — evita "rs" em "estresse". */
  wordBoundary?: boolean;
};

// Estado: nome + UF + apelidos
function buildEstadosGazetteer(): GazetteerEntry[] {
  const out: GazetteerEntry[] = [];
  for (const e of ESTADOS) {
    const nomeFolded = fold(e.nome);
    out.push({
      pattern: nomeFolded,
      type: 'estado',
      value: e.uf,
      display: e.nome,
      confidence: 0.98,
    });
    out.push({
      pattern: e.uf.toLowerCase(),
      type: 'estado',
      value: e.uf,
      display: `${e.nome} (${e.uf})`,
      confidence: 0.85,
      wordBoundary: true,
    });
  }
  // Apelidos canônicos
  const apelidos: { pattern: string; uf: string; display: string }[] = [
    { pattern: 'sampa', uf: 'SP', display: 'São Paulo' },
    { pattern: 'capital paulista', uf: 'SP', display: 'São Paulo' },
    { pattern: 'carioca', uf: 'RJ', display: 'Rio de Janeiro' },
    { pattern: 'rio', uf: 'RJ', display: 'Rio de Janeiro' },
    { pattern: 'gaucho', uf: 'RS', display: 'Rio Grande do Sul' },
    { pattern: 'gaucha', uf: 'RS', display: 'Rio Grande do Sul' },
    { pattern: 'mineiro', uf: 'MG', display: 'Minas Gerais' },
    { pattern: 'mineira', uf: 'MG', display: 'Minas Gerais' },
    { pattern: 'baiano', uf: 'BA', display: 'Bahia' },
    { pattern: 'baiana', uf: 'BA', display: 'Bahia' },
    { pattern: 'paranaense', uf: 'PR', display: 'Paraná' },
    { pattern: 'catarinense', uf: 'SC', display: 'Santa Catarina' },
    { pattern: 'goiano', uf: 'GO', display: 'Goiás' },
    { pattern: 'goiana', uf: 'GO', display: 'Goiás' },
    { pattern: 'brasiliense', uf: 'DF', display: 'Distrito Federal' },
    { pattern: 'pernambucano', uf: 'PE', display: 'Pernambuco' },
    { pattern: 'cearense', uf: 'CE', display: 'Ceará' },
    { pattern: 'amazonense', uf: 'AM', display: 'Amazonas' },
    { pattern: 'paraense', uf: 'PA', display: 'Pará' },
  ];
  for (const a of apelidos) {
    out.push({
      pattern: a.pattern,
      type: 'estado',
      value: a.uf,
      display: a.display,
      confidence: 0.9,
      wordBoundary: true,
    });
  }
  return out;
}

// Persona: aliases → id
function buildPersonasGazetteer(): GazetteerEntry[] {
  const out: GazetteerEntry[] = [];
  // Da lista oficial
  for (const p of PERSONAS) {
    out.push({
      pattern: fold(p.name),
      type: 'persona',
      value: p.id,
      display: p.name,
      confidence: 0.95,
    });
    out.push({
      pattern: p.id,
      type: 'persona',
      value: p.id,
      display: p.name,
      confidence: 0.85,
      wordBoundary: true,
    });
  }
  // Aliases
  const aliases: { pattern: string; id: string; display: string }[] = [
    { pattern: 'psicologo', id: 'psicologos', display: 'Psicólogo' },
    { pattern: 'psicologa', id: 'psicologos', display: 'Psicóloga' },
    { pattern: 'psicologos', id: 'psicologos', display: 'Psicólogos' },
    { pattern: 'psicologas', id: 'psicologos', display: 'Psicólogas' },
    { pattern: 'recursos humanos', id: 'rh', display: 'Profissionais de RH' },
    { pattern: 'rh', id: 'rh', display: 'Profissionais de RH', },
    { pattern: 'business partner', id: 'rh', display: 'Business partner (RH)' },
    { pattern: 'people', id: 'rh', display: 'People (RH)' },
    { pattern: 'lider', id: 'lideres', display: 'Líder' },
    { pattern: 'lideres', id: 'lideres', display: 'Líderes' },
    { pattern: 'lideranca', id: 'lideres', display: 'Liderança' },
    { pattern: 'executivo', id: 'lideres', display: 'Executivo' },
    { pattern: 'executivos', id: 'lideres', display: 'Executivos' },
    { pattern: 'gestor', id: 'lideres', display: 'Gestor' },
    { pattern: 'gestores', id: 'lideres', display: 'Gestores' },
    { pattern: 'ceo', id: 'lideres', display: 'CEO' },
    { pattern: 'consultor', id: 'consultores', display: 'Consultor' },
    { pattern: 'consultores', id: 'consultores', display: 'Consultores' },
    { pattern: 'consultoria', id: 'consultores', display: 'Consultoria' },
    { pattern: 'estudante', id: 'psicologos', display: 'Estudante de Psicologia' },
    { pattern: 'recem-formado', id: 'psicologos', display: 'Recém-formado' },
    { pattern: 'recem formado', id: 'psicologos', display: 'Recém-formado' },
  ];
  for (const a of aliases) {
    out.push({
      pattern: a.pattern,
      type: 'persona',
      value: a.id,
      display: a.display,
      confidence: 0.9,
      wordBoundary: true,
    });
  }
  return out;
}

// Áreas: nome + short + slug
function buildAreasGazetteer(): GazetteerEntry[] {
  const out: GazetteerEntry[] = [];
  for (const a of AREAS) {
    out.push({
      pattern: fold(a.name),
      type: 'area',
      value: a.id,
      display: a.name,
      confidence: 0.95,
    });
    if (a.short && a.short !== a.name) {
      out.push({
        pattern: fold(a.short),
        type: 'area',
        value: a.id,
        display: a.name,
        confidence: 0.88,
        wordBoundary: a.short.length <= 6,
      });
    }
    out.push({
      pattern: a.id.replace(/-/g, ' '),
      type: 'area',
      value: a.id,
      display: a.name,
      confidence: 0.8,
    });
  }
  // Aliases extras canônicos
  const extras: { pattern: string; id: string; display: string }[] = [
    { pattern: 'pot', id: 'psicologia-organizacional-trabalho', display: 'POT' },
    { pattern: 'organizacional', id: 'psicologia-organizacional-trabalho', display: 'Psicologia Organizacional' },
    { pattern: 'neuro', id: 'neuropsicologia', display: 'Neuropsicologia' },
    { pattern: 'neuropsi', id: 'neuropsicologia', display: 'Neuropsicologia' },
    { pattern: 'positiva', id: 'psicologia-positiva', display: 'Psicologia Positiva' },
    { pattern: 'forense', id: 'psicologia-juridica-forense', display: 'Psicologia Jurídica e Forense' },
    { pattern: 'juridica', id: 'psicologia-juridica-forense', display: 'Psicologia Jurídica e Forense' },
    { pattern: 'esporte', id: 'psicologia-esporte', display: 'Psicologia do Esporte' },
    { pattern: 'transito', id: 'psicologia-transito-trafego', display: 'Psicologia de Trânsito' },
    { pattern: 'hospitalar', id: 'psicologia-hospitalar', display: 'Psicologia Hospitalar' },
    { pattern: 'escolar', id: 'psicologia-escolar-educacional', display: 'Psicologia Escolar' },
    { pattern: 'aba', id: 'aba-tea-neurodesenvolvimento', display: 'ABA' },
    { pattern: 'tea', id: 'aba-tea-neurodesenvolvimento', display: 'TEA' },
    { pattern: 'autismo', id: 'aba-tea-neurodesenvolvimento', display: 'Autismo' },
  ];
  for (const e of extras) {
    out.push({
      pattern: e.pattern,
      type: 'area',
      value: e.id,
      display: e.display,
      confidence: 0.85,
      wordBoundary: e.pattern.length <= 4,
    });
  }
  return out;
}

// MBAs: shortName + name + tag
function buildMbasGazetteer(): GazetteerEntry[] {
  const out: GazetteerEntry[] = [];
  for (const m of MBAS) {
    out.push({
      pattern: fold(m.shortName),
      type: 'mba',
      value: m.id,
      display: m.shortName,
      confidence: 0.95,
    });
    out.push({
      pattern: fold(m.name),
      type: 'mba',
      value: m.id,
      display: m.name,
      confidence: 0.92,
    });
    out.push({
      pattern: fold(m.tag),
      type: 'mba',
      value: m.id,
      display: m.shortName,
      confidence: 0.7,
    });
  }
  return out;
}

// Métodos terapêuticos
function buildMetodosGazetteer(): GazetteerEntry[] {
  const out: GazetteerEntry[] = [];
  for (const m of METODOS) {
    out.push({
      pattern: fold(m.name),
      type: 'metodo',
      value: m.id,
      display: m.name,
      confidence: 0.95,
    });
    out.push({
      pattern: m.id,
      type: 'metodo',
      value: m.id,
      display: m.name,
      confidence: 0.92,
      wordBoundary: true,
    });
  }
  // Aliases
  const aliases: { pattern: string; id: string; display: string }[] = [
    { pattern: 'terapia cognitivo comportamental', id: 'tcc', display: 'TCC' },
    { pattern: 'terapia cognitivo-comportamental', id: 'tcc', display: 'TCC' },
    { pattern: 'cognitivo comportamental', id: 'tcc', display: 'TCC' },
    { pattern: 'aceitacao e compromisso', id: 'act', display: 'ACT' },
    { pattern: 'terapia de aceitacao', id: 'act', display: 'ACT' },
    { pattern: 'comportamental dialetica', id: 'dbt', display: 'DBT' },
    { pattern: 'dialetica', id: 'dbt', display: 'DBT' },
    { pattern: 'mbct', id: 'mindfulness', display: 'MBCT' },
    { pattern: 'mbsr', id: 'mindfulness', display: 'MBSR' },
    { pattern: 'atencao plena', id: 'mindfulness', display: 'Mindfulness' },
    { pattern: 'movimento ocular', id: 'emdr', display: 'EMDR' },
    { pattern: 'dessensibilizacao', id: 'emdr', display: 'EMDR' },
  ];
  for (const a of aliases) {
    out.push({
      pattern: a.pattern,
      type: 'metodo',
      value: a.id,
      display: a.display,
      confidence: 0.88,
    });
  }
  return out;
}

// Temas (regulares + emergentes)
function buildTemasGazetteer(): GazetteerEntry[] {
  const out: GazetteerEntry[] = [];
  for (const t of TEMAS) {
    out.push({
      pattern: fold(t.name),
      type: 'tema',
      value: t.id,
      display: t.name,
      confidence: 0.9,
    });
    out.push({
      pattern: t.id.replace(/-/g, ' '),
      type: 'tema',
      value: t.id,
      display: t.name,
      confidence: 0.8,
    });
  }
  for (const t of TEMAS_EMERGENTES_2025_2026) {
    out.push({
      pattern: fold(t.name),
      type: 'tema',
      value: t.id,
      display: t.name,
      confidence: 0.9,
    });
    out.push({
      pattern: t.id.replace(/-/g, ' '),
      type: 'tema',
      value: t.id,
      display: t.name,
      confidence: 0.78,
    });
  }
  return out;
}

// Termos de glossário canônicos
function buildGlossarioGazetteer(): GazetteerEntry[] {
  const termos: { pattern: string; display: string; cluster: string }[] = [
    { pattern: 'nr-1', display: 'NR-1', cluster: 'regulacao' },
    { pattern: 'nr1', display: 'NR-1', cluster: 'regulacao' },
    { pattern: 'norma regulamentadora 1', display: 'NR-1', cluster: 'regulacao' },
    { pattern: 'satepsi', display: 'SATEPSI', cluster: 'instrumentos' },
    { pattern: 'cfp', display: 'CFP', cluster: 'regulacao' },
    { pattern: 'crp', display: 'CRP', cluster: 'regulacao' },
    { pattern: 'mec', display: 'MEC', cluster: 'regulacao' },
    { pattern: 'lgpd', display: 'LGPD', cluster: 'regulacao' },
    { pattern: 'wais', display: 'WAIS', cluster: 'instrumentos' },
    { pattern: 'wais-iv', display: 'WAIS-IV', cluster: 'instrumentos' },
    { pattern: 'mmpi', display: 'MMPI', cluster: 'instrumentos' },
    { pattern: 'mmpi-2', display: 'MMPI-2', cluster: 'instrumentos' },
    { pattern: 'epds', display: 'EPDS', cluster: 'instrumentos' },
    { pattern: 'ados-2', display: 'ADOS-2', cluster: 'instrumentos' },
    { pattern: 'wisc', display: 'WISC', cluster: 'instrumentos' },
    { pattern: 'wisc-iv', display: 'WISC-IV', cluster: 'instrumentos' },
    { pattern: 'jd-r', display: 'JD-R', cluster: 'conceitos-pot' },
    { pattern: 'uwes', display: 'UWES', cluster: 'conceitos-pot' },
    { pattern: 'edmondson', display: 'Edmondson', cluster: 'conceitos-pot' },
    { pattern: 'schein', display: 'Schein', cluster: 'conceitos-pot' },
    { pattern: 'lezak', display: 'Lezak', cluster: 'conceitos-neuro' },
    { pattern: 'damasio', display: 'Damásio', cluster: 'conceitos-neuro' },
    { pattern: 'beck', display: 'Aaron Beck', cluster: 'metodos-terapeuticos' },
    { pattern: 'aaron beck', display: 'Aaron Beck', cluster: 'metodos-terapeuticos' },
    { pattern: 'lato sensu', display: 'Lato sensu', cluster: 'regulacao' },
    { pattern: 'stricto sensu', display: 'Stricto sensu', cluster: 'regulacao' },
  ];
  const out: GazetteerEntry[] = [];
  // Garantir que cluster válido
  const clusterIds = new Set<string>(GLOSSARIO_CLUSTERS.map(c => c.id));
  for (const t of termos) {
    const cluster: string = clusterIds.has(t.cluster) ? t.cluster : 'regulacao';
    out.push({
      pattern: t.pattern,
      type: 'glossario-termo',
      value: `${cluster}#${t.display.toLowerCase()}`,
      display: t.display,
      confidence: 0.93,
      wordBoundary: t.pattern.length <= 5,
    });
  }
  return out;
}

// DocKind hints (Guia, FAQ, etc.)
function buildKindsGazetteer(): GazetteerEntry[] {
  const kinds: { pattern: string; kind: string; display: string }[] = [
    { pattern: 'guia', kind: 'Guia', display: 'Guia' },
    { pattern: 'guias', kind: 'Guia', display: 'Guias' },
    { pattern: 'playbook', kind: 'Guia', display: 'Playbook' },
    { pattern: 'passo a passo', kind: 'Guia', display: 'Passo a passo' },
    { pattern: 'tutorial', kind: 'Guia', display: 'Tutorial' },
    { pattern: 'faq', kind: 'FAQ', display: 'FAQ' },
    { pattern: 'duvidas frequentes', kind: 'FAQ', display: 'Dúvidas frequentes' },
    { pattern: 'perguntas frequentes', kind: 'FAQ', display: 'Perguntas frequentes' },
    { pattern: 'evidencia', kind: 'Evidência', display: 'Evidência' },
    { pattern: 'evidencias', kind: 'Evidência', display: 'Evidências' },
    { pattern: 'paper', kind: 'Evidência', display: 'Paper' },
    { pattern: 'revisao', kind: 'Evidência', display: 'Revisão' },
    { pattern: 'meta-analise', kind: 'Evidência', display: 'Meta-análise' },
    { pattern: 'caso', kind: 'Caso', display: 'Caso' },
    { pattern: 'casos', kind: 'Caso', display: 'Casos' },
    { pattern: 'intervencao', kind: 'Intervenção', display: 'Intervenção' },
    { pattern: 'intervencoes', kind: 'Intervenção', display: 'Intervenções' },
    { pattern: 'protocolo', kind: 'Intervenção', display: 'Protocolo' },
    { pattern: 'metodo', kind: 'Método', display: 'Método' },
    { pattern: 'metodos', kind: 'Método', display: 'Métodos' },
    { pattern: 'abordagem', kind: 'Método', display: 'Abordagem' },
    { pattern: 'comparativo', kind: 'Comparativo', display: 'Comparativo' },
    { pattern: 'comparativos', kind: 'Comparativo', display: 'Comparativos' },
    { pattern: 'comparacao', kind: 'Comparativo', display: 'Comparação' },
    { pattern: 'glossario', kind: 'Glossário', display: 'Glossário' },
    { pattern: 'mba', kind: 'MBA', display: 'MBA' },
    { pattern: 'mbas', kind: 'MBA', display: 'MBAs' },
    { pattern: 'pos-graduacao', kind: 'MBA', display: 'Pós-graduação' },
    { pattern: 'pos graduacao', kind: 'MBA', display: 'Pós-graduação' },
    { pattern: 'especializacao', kind: 'MBA', display: 'Especialização' },
    { pattern: 'carreira', kind: 'Carreira', display: 'Carreira' },
  ];
  return kinds.map(k => ({
    pattern: k.pattern,
    type: 'kind' as const,
    value: k.kind,
    display: k.display,
    confidence: 0.85,
    wordBoundary: k.pattern.length <= 5,
  }));
}

// ---------------------------------------------------------------------------
// Gazetteer consolidado: ordenado por comprimento desc (longest match first)
// ---------------------------------------------------------------------------

let _gazetteer: GazetteerEntry[] | null = null;

function getGazetteer(): GazetteerEntry[] {
  if (_gazetteer) return _gazetteer;
  const all = [
    ...buildEstadosGazetteer(),
    ...buildPersonasGazetteer(),
    ...buildAreasGazetteer(),
    ...buildMbasGazetteer(),
    ...buildMetodosGazetteer(),
    ...buildTemasGazetteer(),
    ...buildGlossarioGazetteer(),
    ...buildKindsGazetteer(),
  ];
  // Dedup por (type+value+pattern), preservando o de maior confidence
  const map = new Map<string, GazetteerEntry>();
  for (const e of all) {
    const key = `${e.type}:${e.value}:${e.pattern}`;
    const prev = map.get(key);
    if (!prev || e.confidence > prev.confidence) map.set(key, e);
  }
  _gazetteer = Array.from(map.values()).sort((a, b) => b.pattern.length - a.pattern.length);
  return _gazetteer;
}

// ---------------------------------------------------------------------------
// Matching helpers
// ---------------------------------------------------------------------------

function isWordBoundary(text: string, start: number, end: number): boolean {
  const before = start === 0 || /[^\p{L}\p{N}]/u.test(text[start - 1]!);
  const after = end >= text.length || /[^\p{L}\p{N}]/u.test(text[end]!);
  return before && after;
}

function findAllOccurrences(haystack: string, needle: string, requireBoundary: boolean): number[] {
  const out: number[] = [];
  if (!needle) return out;
  let from = 0;
  while (from <= haystack.length - needle.length) {
    const i = haystack.indexOf(needle, from);
    if (i === -1) break;
    const end = i + needle.length;
    if (!requireBoundary || isWordBoundary(haystack, i, end)) {
      out.push(i);
    }
    from = i + 1;
  }
  return out;
}

function buildRemainder(qFolded: string, spans: Array<[number, number]>): string {
  if (spans.length === 0) return qFolded.trim();
  const sorted = [...spans].sort((a, b) => a[0] - b[0]);
  // merge overlaps
  const merged: Array<[number, number]> = [];
  for (const sp of sorted) {
    const last = merged[merged.length - 1];
    if (last && sp[0] <= last[1]) {
      last[1] = Math.max(last[1], sp[1]);
    } else {
      merged.push([sp[0], sp[1]]);
    }
  }
  let out = '';
  let cursor = 0;
  for (const [s, e] of merged) {
    if (s > cursor) out += qFolded.slice(cursor, s);
    out += ' ';
    cursor = e;
  }
  if (cursor < qFolded.length) out += qFolded.slice(cursor);
  return out.replace(/\s+/g, ' ').trim();
}

// ---------------------------------------------------------------------------
// API pública
// ---------------------------------------------------------------------------

/**
 * Extrai entidades de uma query folded.
 * Aplica longest-match-first e elimina spans sobrepostos (mantém o primeiro,
 * que é o mais longo na ordenação).
 */
export function extractEntities(qFolded: string): EntityExtractionResult {
  const q = (qFolded || '').toString();
  if (!q.trim()) return { entities: [], remainder: '' };

  const gaz = getGazetteer();
  const used: boolean[] = new Array(q.length).fill(false);
  const entities: Entity[] = [];

  for (const entry of gaz) {
    const occs = findAllOccurrences(q, entry.pattern, !!entry.wordBoundary);
    for (const start of occs) {
      const end = start + entry.pattern.length;
      // checa sobreposição
      let overlap = false;
      for (let i = start; i < end; i++) {
        if (used[i]) { overlap = true; break; }
      }
      if (overlap) continue;
      // marca uso
      for (let i = start; i < end; i++) used[i] = true;
      entities.push({
        type: entry.type,
        value: entry.value,
        display: entry.display,
        span: [start, end],
        confidence: entry.confidence,
      });
    }
  }

  // ordena por posição
  entities.sort((a, b) => a.span[0] - b.span[0]);

  const remainder = buildRemainder(q, entities.map(e => e.span));
  return { entities, remainder };
}
