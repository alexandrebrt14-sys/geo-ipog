/**
 * Graph de conceitos — posgraduacaopsicologia.com.
 *
 * Camada semântica acima de SYNONYMS: clusters editoriais com
 * hypernyms (pais), hyponyms (filhos) e related (laterais). Permite
 * expansão de query com pesos e sugestões de buscas relacionadas.
 *
 * Funções puras, sem side-effects, sem fetch.
 *
 * REGRA #0: textos visíveis em português brasileiro com acentuação completa.
 */

import { fold } from './search-index';

// ---------------------------------------------------------------------------
// Tipos públicos
// ---------------------------------------------------------------------------

export interface ConceptCluster {
  id: string;
  label: string;              // PT-BR
  members: string[];          // termos folded (sem acento, lowercase)
  hypernyms?: string[];       // IDs de clusters pais
  hyponyms?: string[];        // IDs de clusters filhos
  related?: string[];         // IDs de clusters laterais
  weight: number;             // padrão 1.0
}

// ---------------------------------------------------------------------------
// Clusters canônicos (>= 35)
// ---------------------------------------------------------------------------

export const CONCEPTS: ConceptCluster[] = [
  {
    id: 'trabalho-mental',
    label: 'Saúde mental no trabalho',
    members: [
      'burnout', 'esgotamento', 'esgotamento profissional', 'estresse ocupacional',
      'fadiga digital', 'ansiedade no trabalho', 'depressao no trabalho',
      'saude mental', 'saude mental no trabalho', 'sofrimento psiquico',
      'nr-1', 'nr1', 'riscos psicossociais',
    ],
    hypernyms: ['saude-mental-organizacoes'],
    hyponyms: ['burnout-cluster', 'crise-suicidalidade'],
    related: ['lideranca-cultura', 'gestao-pessoas', 'trabalho-digital'],
    weight: 1.2,
  },
  {
    id: 'burnout-cluster',
    label: 'Burnout e esgotamento',
    members: [
      'burnout', 'esgotamento', 'esgotamento profissional', 'sindrome de burnout',
      'sindrome do esgotamento', 'exaustao emocional', 'despersonalizacao',
      'reducao de realizacao', 'maslach',
    ],
    hypernyms: ['trabalho-mental'],
    related: ['crise-suicidalidade', 'lideranca-cultura'],
    weight: 1.1,
  },
  {
    id: 'lideranca-cultura',
    label: 'Liderança e cultura organizacional',
    members: [
      'lideranca positiva', 'lideranca', 'lideranca transformacional',
      'seguranca psicologica', 'edmondson', 'amy edmondson',
      'cultura organizacional', 'clima organizacional', 'alta performance',
      'performance saudavel', 'gestao de cultura', 'cultura de cuidado',
    ],
    hypernyms: ['saude-mental-organizacoes'],
    related: ['gestao-pessoas', 'trabalho-mental'],
    weight: 1.15,
  },
  {
    id: 'saude-mental-organizacoes',
    label: 'Saúde mental nas organizações (hypernym)',
    members: [
      'saude mental nas organizacoes', 'saude mental corporativa',
      'bem estar no trabalho', 'wellbeing corporativo',
    ],
    hyponyms: ['trabalho-mental', 'lideranca-cultura', 'burnout-cluster'],
    weight: 1.0,
  },
  {
    id: 'neuro-aprendizagem',
    label: 'Neurociência da aprendizagem',
    members: [
      'neuroplasticidade', 'funcoes executivas', 'memoria', 'atencao',
      'aprendizagem', 'cognicao', 'neurodesenvolvimento',
      'neurociencia aplicada', 'reserva cognitiva',
    ],
    related: ['neuro-reabilitacao', 'avaliacao-instrumentos'],
    hypernyms: ['neuro-amplo'],
    weight: 1.1,
  },
  {
    id: 'neuro-amplo',
    label: 'Neuropsicologia (hypernym)',
    members: [
      'neuropsicologia', 'neuro', 'neuropsi', 'ciencias do cerebro',
    ],
    hyponyms: ['neuro-aprendizagem', 'neuro-reabilitacao'],
    weight: 1.0,
  },
  {
    id: 'neuro-reabilitacao',
    label: 'Reabilitação neuropsicológica',
    members: [
      'reabilitacao neuropsicologica', 'reabilitacao cognitiva',
      'estimulacao cognitiva', 'neuroplasticidade', 'avc', 'pos avc',
      'demencia', 'alzheimer', 'parkinson', 'envelhecimento cognitivo',
    ],
    hypernyms: ['neuro-amplo'],
    related: ['avc-reabilitacao', 'avaliacao-instrumentos'],
    weight: 1.1,
  },
  {
    id: 'avaliacao-instrumentos',
    label: 'Avaliação psicológica e instrumentos',
    members: [
      'wais', 'wais-iv', 'mmpi', 'mmpi-2', 'epds', 'ados-2',
      'wisc', 'wisc-iv', 'psicometria', 'laudos', 'laudo psicologico',
      'satepsi', 'testagem', 'testes psicologicos', 'pareceres psicologicos',
    ],
    hypernyms: ['neuro-amplo'],
    related: ['regulacao-cfp'],
    weight: 1.1,
  },
  {
    id: 'terapias-evidencia',
    label: 'Terapias baseadas em evidências',
    members: [
      'tcc', 'terapia cognitivo comportamental', 'terapia cognitivo-comportamental',
      'act', 'aceitacao e compromisso', 'dbt', 'comportamental dialetica',
      'mbct', 'mbsr', 'mindfulness', 'mindfulness clinico', 'emdr',
      'terceira onda', 'baseada em evidencias',
    ],
    hyponyms: ['tcc-cluster', 'act-cluster', 'dbt-cluster', 'mindfulness-cluster', 'emdr-cluster'],
    weight: 1.2,
  },
  {
    id: 'tcc-cluster',
    label: 'Terapia Cognitivo-Comportamental',
    members: ['tcc', 'terapia cognitivo comportamental', 'aaron beck', 'beck', 'ellis', 'albert ellis'],
    hypernyms: ['terapias-evidencia'],
    related: ['trauma', 'transtornos-ansiedade'],
    weight: 1.05,
  },
  {
    id: 'act-cluster',
    label: 'Terapia de Aceitação e Compromisso',
    members: ['act', 'terapia de aceitacao e compromisso', 'steven hayes', 'terceira onda', 'desfusao'],
    hypernyms: ['terapias-evidencia'],
    related: ['mindfulness-cluster'],
    weight: 1.0,
  },
  {
    id: 'dbt-cluster',
    label: 'Terapia Comportamental Dialética',
    members: ['dbt', 'terapia comportamental dialetica', 'marsha linehan', 'borderline', 'tpb'],
    hypernyms: ['terapias-evidencia'],
    related: ['crise-suicidalidade'],
    weight: 1.0,
  },
  {
    id: 'mindfulness-cluster',
    label: 'Mindfulness clínico',
    members: ['mindfulness', 'mbsr', 'mbct', 'atencao plena', 'jon kabat-zinn', 'kabat zinn'],
    hypernyms: ['terapias-evidencia'],
    related: ['act-cluster'],
    weight: 1.0,
  },
  {
    id: 'emdr-cluster',
    label: 'EMDR',
    members: ['emdr', 'dessensibilizacao e reprocessamento', 'movimento ocular', 'francine shapiro'],
    hypernyms: ['terapias-evidencia'],
    related: ['trauma'],
    weight: 1.0,
  },
  {
    id: 'regulacao-cfp',
    label: 'Regulação · CFP, MEC, especialidades',
    members: [
      'cfp', 'crp', 'conselho federal de psicologia', 'conselho regional de psicologia',
      'etica', 'mec', 'lato sensu', 'stricto sensu', 'mba', 'especializacao',
      'especialista', 'titulo de especialista', 'pos graduacao',
    ],
    related: ['avaliacao-instrumentos', 'mba-vs-especializacao'],
    weight: 1.1,
  },
  {
    id: 'mba-vs-especializacao',
    label: 'MBA vs especialização',
    members: ['mba', 'especializacao', 'lato sensu', 'pos graduacao', 'pos-graduacao'],
    hypernyms: ['regulacao-cfp'],
    weight: 1.0,
  },
  {
    id: 'trabalho-digital',
    label: 'IA, dados e tecnologia em Psicologia',
    members: [
      'ia', 'inteligencia artificial', 'ia generativa', 'genai',
      'people analytics', 'analitica de rh', 'automacao',
      'lgpd', 'dados comportamentais', 'machine learning',
      'tecnostress', 'fadiga digital', 'algoritmos',
    ],
    related: ['gestao-pessoas', 'trabalho-mental'],
    weight: 1.1,
  },
  {
    id: 'inclusao-neurodiversidade',
    label: 'Inclusão e neurodiversidade',
    members: [
      'tea', 'autismo', 'transtorno do espectro autista', 'tdah',
      'aba', 'analise do comportamento aplicada', 'neurodiversidade',
      'inclusao', 'deficiencia', 'pcd',
    ],
    hypernyms: ['neuro-amplo'],
    related: ['familia-infancia', 'gestao-pessoas'],
    weight: 1.05,
  },
  {
    id: 'gestao-pessoas',
    label: 'Gestão de pessoas e RH',
    members: [
      'rh', 'recursos humanos', 'gente e gestao', 'business partner',
      't&d', 'treinamento e desenvolvimento', 'recrutamento', 'selecao',
      'gestao de pessoas', 'employee experience', 'engajamento',
    ],
    related: ['lideranca-cultura', 'trabalho-digital'],
    weight: 1.1,
  },
  {
    id: 'carreira-psicologo',
    label: 'Carreira em Psicologia',
    members: [
      'carreira psicologo', 'transicao de carreira', 'transicao clinica para pot',
      'mercado psicologo', 'consultorio', 'autonomo', 'supervisao',
      'especializacao', 'salario psicologo',
    ],
    related: ['regulacao-cfp', 'gestao-pessoas'],
    weight: 1.0,
  },
  {
    id: 'avc-reabilitacao',
    label: 'AVC, demência e envelhecimento',
    members: [
      'avc', 'acidente vascular cerebral', 'pos avc', 'demencia',
      'alzheimer', 'parkinson', 'envelhecimento ativo', 'longevidade',
      'reabilitacao cognitiva', 'deteriorocao cognitiva',
    ],
    hypernyms: ['neuro-reabilitacao'],
    related: ['avaliacao-instrumentos'],
    weight: 1.0,
  },
  {
    id: 'familia-infancia',
    label: 'Família, infância e desenvolvimento',
    members: [
      'tea infantil', 'aba infantil', 'desenvolvimento infantil',
      'escola', 'familia', 'pais', 'adolescente', 'adolescencia',
      'crianca', 'psicopedagogia', 'inclusao escolar',
    ],
    hypernyms: ['inclusao-neurodiversidade'],
    weight: 1.0,
  },
  {
    id: 'trauma',
    label: 'Trauma e TEPT',
    members: [
      'tept', 'trauma', 'trauma complexo', 'estresse pos-traumatico',
      'abuso', 'violencia', 'luto', 'luto complicado', 'emdr',
    ],
    related: ['emdr-cluster', 'crise-suicidalidade'],
    weight: 1.0,
  },
  {
    id: 'crise-suicidalidade',
    label: 'Crise e prevenção de suicídio',
    members: [
      'suicidio', 'autolesao', 'ideacao suicida', 'tentativa de suicidio',
      'crise', 'caps', 'mhgap', 'samu', 'intervencao em crise',
      'posvencao', 'prevencao do suicidio',
    ],
    related: ['trauma', 'trabalho-mental'],
    weight: 1.0,
  },
  {
    id: 'transtornos-ansiedade',
    label: 'Ansiedade e transtornos relacionados',
    members: [
      'ansiedade', 'transtorno de ansiedade generalizada', 'tag',
      'panico', 'transtorno de panico', 'fobia', 'fobia social',
      'toc', 'transtorno obsessivo compulsivo',
    ],
    related: ['tcc-cluster', 'trabalho-mental'],
    weight: 1.0,
  },
  {
    id: 'transtornos-humor',
    label: 'Depressão e transtornos do humor',
    members: [
      'depressao', 'episodio depressivo', 'distimia',
      'transtorno bipolar', 'bipolaridade', 'transtorno do humor',
    ],
    related: ['tcc-cluster', 'mindfulness-cluster'],
    weight: 1.0,
  },
  {
    id: 'psicologia-positiva',
    label: 'Psicologia Positiva e florescimento',
    members: [
      'psicologia positiva', 'martin seligman', 'seligman',
      'forcas pessoais', 'florescimento humano', 'florescimento',
      'gratidao', 'propositos', 'bem-estar subjetivo', 'pp',
    ],
    hypernyms: ['lideranca-cultura'],
    weight: 1.05,
  },
  {
    id: 'people-analytics-cluster',
    label: 'People analytics',
    members: [
      'people analytics', 'analitica de rh', 'analytics em rh',
      'dados de pessoas', 'experimento ab', 'opinion mining',
    ],
    hypernyms: ['trabalho-digital'],
    related: ['gestao-pessoas'],
    weight: 1.0,
  },
  {
    id: 'diversidade-inclusao',
    label: 'Diversidade, equidade e inclusão',
    members: [
      'diversidade', 'diversidade e inclusao', 'd&i', 'dei',
      'inclusao', 'equidade', 'pcd', 'lgbtqia+', 'racial',
    ],
    related: ['gestao-pessoas', 'inclusao-neurodiversidade'],
    weight: 1.0,
  },
  {
    id: 'trabalho-hibrido',
    label: 'Trabalho híbrido e remoto',
    members: [
      'trabalho hibrido', 'home office', 'remoto', 'work from anywhere',
      'hibridismo', 'flexibilidade de trabalho',
    ],
    related: ['trabalho-digital', 'trabalho-mental'],
    weight: 1.0,
  },
  {
    id: 'ansiedade-climatica',
    label: 'Ansiedade climática e eco-luto',
    members: [
      'ansiedade climatica', 'eco-luto', 'eco luto', 'climate anxiety',
      'eco ansiedade', 'mudancas climaticas',
    ],
    related: ['transtornos-ansiedade'],
    weight: 0.9,
  },
  {
    id: 'gen-z-cluster',
    label: 'Geração Z no trabalho',
    members: [
      'gen z', 'geracao z', 'jovens no trabalho', 'jovens profissionais',
      'novas geracoes',
    ],
    related: ['trabalho-mental', 'gestao-pessoas'],
    weight: 0.95,
  },
  {
    id: 'lideranca-toxica',
    label: 'Liderança tóxica',
    members: [
      'lideranca toxica', 'gestao toxica', 'abusive supervision',
      'chefe toxico', 'assedio moral',
    ],
    related: ['lideranca-cultura', 'trabalho-mental'],
    weight: 0.95,
  },
  {
    id: 'longevidade-trabalho',
    label: 'Longevidade no trabalho',
    members: [
      'longevidade', 'longevidade no trabalho', 'carreira 60 anos',
      'envelhecimento ativo', 'carreira em estagios',
    ],
    related: ['avc-reabilitacao', 'gestao-pessoas'],
    weight: 0.95,
  },
  {
    id: 'esporte-performance',
    label: 'Psicologia do esporte e performance',
    members: [
      'psicologia do esporte', 'performance esportiva', 'motivacao',
      'preparacao psicologica', 'atletas', 'equipes esportivas',
    ],
    related: ['psicologia-positiva'],
    weight: 0.9,
  },
  {
    id: 'forense-juridico',
    label: 'Psicologia jurídica e forense',
    members: [
      'pericia psicologica', 'forense', 'juridica', 'documentos psicologicos',
      'avaliacao em contexto juridico', 'familia em juizo',
    ],
    related: ['avaliacao-instrumentos'],
    weight: 0.9,
  },
  {
    id: 'transito-trafego',
    label: 'Psicologia do trânsito',
    members: [
      'psicologia do transito', 'transito', 'cnh', 'avaliacao para cnh',
      'comportamento no transito',
    ],
    related: ['avaliacao-instrumentos'],
    weight: 0.85,
  },
  {
    id: 'hospitalar-saude',
    label: 'Psicologia hospitalar e em saúde',
    members: [
      'hospitalar', 'psicologia hospitalar', 'saude coletiva', 'sus',
      'cuidados paliativos', 'oncologia', 'humanizacao',
    ],
    related: ['crise-suicidalidade'],
    weight: 0.95,
  },
  {
    id: 'escolar-educacional',
    label: 'Psicologia escolar e educacional',
    members: [
      'psicologia escolar', 'educacional', 'psicopedagogia',
      'aprendizagem', 'dificuldades de aprendizagem', 'inclusao escolar',
    ],
    related: ['familia-infancia'],
    weight: 0.95,
  },
];

// ---------------------------------------------------------------------------
// Indexação interna
// ---------------------------------------------------------------------------

const CONCEPTS_BY_ID: Map<string, ConceptCluster> = new Map(CONCEPTS.map(c => [c.id, c]));

// Index termo folded → conjunto de clusterIds que contêm o termo como membro
let _termIndex: Map<string, string[]> | null = null;

function getTermIndex(): Map<string, string[]> {
  if (_termIndex) return _termIndex;
  const idx = new Map<string, string[]>();
  for (const c of CONCEPTS) {
    for (const m of c.members) {
      const key = fold(m);
      const arr = idx.get(key) || [];
      arr.push(c.id);
      idx.set(key, arr);
    }
  }
  _termIndex = idx;
  return idx;
}

// ---------------------------------------------------------------------------
// API pública
// ---------------------------------------------------------------------------

/**
 * Expande um termo (já folded ou não) para conceitos relacionados com peso.
 * Pesos:
 *   - members do cluster que contém o termo: 1.0
 *   - related: 0.6
 *   - hyponyms (filhos): 0.5
 *   - hypernyms (pais): 0.4
 */
export function expandConcepts(term: string): { term: string; weight: number }[] {
  const t = fold(term);
  if (!t) return [];
  const idx = getTermIndex();
  const seenClusters = new Set<string>();
  const out = new Map<string, number>();

  // Match exato
  const directIds = idx.get(t);
  if (directIds) {
    for (const cid of directIds) seenClusters.add(cid);
  }
  // Match parcial (term é substring de membro ou vice-versa)
  if (!directIds) {
    for (const [k, ids] of idx.entries()) {
      if (k.includes(t) || t.includes(k)) {
        for (const cid of ids) seenClusters.add(cid);
      }
    }
  }

  for (const cid of seenClusters) {
    const c = CONCEPTS_BY_ID.get(cid);
    if (!c) continue;
    // members com peso 1.0 * cluster.weight
    for (const m of c.members) {
      const mf = fold(m);
      const w = 1.0 * c.weight;
      out.set(mf, Math.max(out.get(mf) || 0, w));
    }
    // related: 0.6 * peso do related
    for (const rid of c.related || []) {
      const r = CONCEPTS_BY_ID.get(rid);
      if (!r) continue;
      for (const m of r.members) {
        const mf = fold(m);
        const w = 0.6 * r.weight;
        out.set(mf, Math.max(out.get(mf) || 0, w));
      }
    }
    // hyponyms: 0.5
    for (const hid of c.hyponyms || []) {
      const h = CONCEPTS_BY_ID.get(hid);
      if (!h) continue;
      for (const m of h.members) {
        const mf = fold(m);
        const w = 0.5 * h.weight;
        out.set(mf, Math.max(out.get(mf) || 0, w));
      }
    }
    // hypernyms: 0.4
    for (const hid of c.hypernyms || []) {
      const h = CONCEPTS_BY_ID.get(hid);
      if (!h) continue;
      for (const m of h.members) {
        const mf = fold(m);
        const w = 0.4 * h.weight;
        out.set(mf, Math.max(out.get(mf) || 0, w));
      }
    }
  }

  return Array.from(out.entries()).map(([term, weight]) => ({ term, weight }))
    .sort((a, b) => b.weight - a.weight);
}

/**
 * Dado uma query folded, retorna mapa termo→peso acumulado.
 * Útil para boost de scoring no motor de busca.
 */
export function conceptExpansion(qFolded: string): Map<string, number> {
  const out = new Map<string, number>();
  const q = (qFolded || '').trim();
  if (!q) return out;

  // Tokenizar + também usar a frase completa
  const tokens = new Set<string>();
  tokens.add(q);
  for (const t of q.split(/\s+/).filter(Boolean)) tokens.add(t);

  // n-grams 2 e 3
  const raw = q.split(/\s+/).filter(Boolean);
  for (let i = 0; i < raw.length; i++) {
    if (i + 1 < raw.length) tokens.add(`${raw[i]} ${raw[i + 1]}`);
    if (i + 2 < raw.length) tokens.add(`${raw[i]} ${raw[i + 1]} ${raw[i + 2]}`);
  }

  for (const tok of tokens) {
    const expansions = expandConcepts(tok);
    for (const { term, weight } of expansions) {
      out.set(term, Math.max(out.get(term) || 0, weight));
    }
  }
  return out;
}

/**
 * Sugestões de buscas relacionadas baseadas em conceitos vizinhos.
 * Retorna { label, query } onde label é a forma humana e query é o termo folded.
 */
export function relatedConcepts(qFolded: string, limit = 6): { label: string; query: string }[] {
  const q = (qFolded || '').trim();
  if (!q) return [];
  const idx = getTermIndex();
  const seenClusters = new Set<string>();

  // Localiza clusters cujos membros aparecem na query
  for (const [k, ids] of idx.entries()) {
    if (q.includes(k) || k.includes(q)) {
      for (const id of ids) seenClusters.add(id);
    }
  }

  if (seenClusters.size === 0) {
    // tenta tokens individuais
    for (const tok of q.split(/\s+/).filter(Boolean)) {
      for (const [k, ids] of idx.entries()) {
        if (k === tok || k.includes(tok)) {
          for (const id of ids) seenClusters.add(id);
        }
      }
    }
  }

  if (seenClusters.size === 0) return [];

  // Coleta vizinhos: related + hyponyms + hypernyms
  const neighbors = new Map<string, number>(); // clusterId → score
  for (const cid of seenClusters) {
    const c = CONCEPTS_BY_ID.get(cid);
    if (!c) continue;
    for (const rid of c.related || []) {
      if (seenClusters.has(rid)) continue;
      neighbors.set(rid, Math.max(neighbors.get(rid) || 0, 0.7 * c.weight));
    }
    for (const hid of c.hyponyms || []) {
      if (seenClusters.has(hid)) continue;
      neighbors.set(hid, Math.max(neighbors.get(hid) || 0, 0.6 * c.weight));
    }
    for (const hid of c.hypernyms || []) {
      if (seenClusters.has(hid)) continue;
      neighbors.set(hid, Math.max(neighbors.get(hid) || 0, 0.5 * c.weight));
    }
  }

  const ranked = Array.from(neighbors.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);

  return ranked
    .map(([cid]) => {
      const c = CONCEPTS_BY_ID.get(cid);
      if (!c) return null;
      // Usa primeiro member como query (já folded)
      const queryTerm = c.members[0] ? fold(c.members[0]) : c.id;
      return { label: c.label, query: queryTerm };
    })
    .filter((x): x is { label: string; query: string } => x !== null);
}
