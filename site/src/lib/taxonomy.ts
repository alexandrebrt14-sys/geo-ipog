/**
 * Taxonomia compartilhada do portal posgraduacaopsicologia.com.
 *
 * Define:
 *  - tags conceituais (clusters editoriais reutilizáveis)
 *  - mapa sinônimo → forma canônica (com e sem acento)
 *  - relações entre áreas, MBAs, guias, evidências, casos e FAQs
 *  - próximo passo recomendado por path + persona
 *  - persona-fit para cada URL
 *
 * Esta camada é consumida pelos componentes de busca, recomendação
 * e cross-link automático nas páginas de detalhe.
 *
 * REGRA #0: textos visíveis em português brasileiro com acentuação completa.
 * IDs e slugs permanecem ASCII (URL-safe).
 */

import {
  AREAS,
  MBAS,
  GUIAS,
  EVIDENCIAS,
  CASOS,
  FAQS_DEEP,
  INTERVENCOES,
  METODOS,
  TEMAS,
  TEMAS_EMERGENTES_2025_2026,
} from './data';

// ---------------------------------------------------------------------------
// Tipos públicos
// ---------------------------------------------------------------------------

export interface TaxonomyTag {
  id: string;
  label: string;
  cluster: string;
}

export interface RelatedItem {
  id: string;
  name: string;
  href: string;
}

export type NextStepKind = 'aprofunde' | 'pratica' | 'caminho';

export interface NextStepGroup {
  label: string;
  kind: NextStepKind;
  items: { label: string; href: string; hint: string }[];
}

// ---------------------------------------------------------------------------
// Tags conceituais
// ---------------------------------------------------------------------------

export const TAGS: TaxonomyTag[] = [
  // POT / bem-estar
  { id: 'nr1', label: 'NR-1 e riscos psicossociais', cluster: 'pot-bem-estar' },
  { id: 'pot', label: 'Psicologia Organizacional e do Trabalho', cluster: 'pot-bem-estar' },
  { id: 'cultura-clima', label: 'Cultura e clima organizacional', cluster: 'pot-bem-estar' },
  { id: 'lideranca-positiva', label: 'Liderança positiva', cluster: 'pot-bem-estar' },
  { id: 'seguranca-psicologica', label: 'Segurança psicológica', cluster: 'pot-bem-estar' },
  { id: 'burnout', label: 'Burnout e prevenção', cluster: 'pot-bem-estar' },
  { id: 'saude-mental-trabalho', label: 'Saúde mental no trabalho', cluster: 'pot-bem-estar' },
  { id: 'people-analytics', label: 'People analytics', cluster: 'pot-bem-estar' },
  { id: 'rh', label: 'Recursos humanos', cluster: 'pot-bem-estar' },
  { id: 'diversidade', label: 'Diversidade e inclusão', cluster: 'pot-bem-estar' },
  { id: 'trabalho-hibrido', label: 'Trabalho híbrido', cluster: 'pot-bem-estar' },
  // Neuro / avaliação
  { id: 'neuro', label: 'Neuropsicologia', cluster: 'neuro-avaliacao' },
  { id: 'reabilitacao-cognitiva', label: 'Reabilitação cognitiva', cluster: 'neuro-avaliacao' },
  { id: 'avaliacao', label: 'Avaliação psicológica', cluster: 'neuro-avaliacao' },
  { id: 'satepsi', label: 'SATEPSI', cluster: 'neuro-avaliacao' },
  { id: 'tea', label: 'Transtorno do Espectro Autista', cluster: 'neuro-avaliacao' },
  { id: 'aba', label: 'Análise do Comportamento Aplicada', cluster: 'neuro-avaliacao' },
  // Métodos terapêuticos
  { id: 'tcc', label: 'Terapia Cognitivo-Comportamental', cluster: 'metodos' },
  { id: 'act', label: 'Terapia de Aceitação e Compromisso', cluster: 'metodos' },
  { id: 'dbt', label: 'Terapia Comportamental Dialética', cluster: 'metodos' },
  { id: 'mindfulness', label: 'Mindfulness clínico', cluster: 'metodos' },
  { id: 'emdr', label: 'EMDR', cluster: 'metodos' },
  // Regulação
  { id: 'cfp', label: 'CFP/CRP', cluster: 'regulacao' },
  { id: 'mba-vs-especializacao', label: 'MBA vs especialização', cluster: 'regulacao' },
  { id: 'lato-stricto', label: 'Lato vs stricto sensu', cluster: 'regulacao' },
  { id: 'lgpd', label: 'LGPD e ética em dados', cluster: 'regulacao' },
  // Tecnologia
  { id: 'ia', label: 'Inteligência artificial em Psicologia', cluster: 'tecnologia' },
  { id: 'ia-rh', label: 'IA em RH', cluster: 'tecnologia' },
  // Emergentes 2025-2026
  { id: 'fadiga-digital', label: 'Fadiga digital e tecnostress', cluster: 'emergentes' },
  { id: 'climate-anxiety', label: 'Ansiedade climática', cluster: 'emergentes' },
  { id: 'gen-z', label: 'Geração Z no trabalho', cluster: 'emergentes' },
  { id: 'longevidade', label: 'Longevidade no trabalho', cluster: 'emergentes' },
];

// ---------------------------------------------------------------------------
// Sinônimos: forma livre → lista de variantes canônicas e coloquiais.
// Tudo aqui é comparado em forma "folded" (sem acento, lowercase).
// ---------------------------------------------------------------------------

export const SYNONYMS: Record<string, string[]> = {
  // NR-1
  'nr1': ['nr-1', 'nr1', 'norma regulamentadora 1', 'norma regulamentadora numero 1', 'riscos psicossociais', 'risco psicossocial', 'fatores psicossociais', 'nova nr1'],
  'riscos psicossociais': ['nr1', 'nr-1', 'norma regulamentadora 1', 'fatores psicossociais', 'riscos psicossociais'],

  // POT
  'pot': ['pot', 'psicologia organizacional', 'psicologia do trabalho', 'psicologia organizacional e do trabalho', 'organizacional', 'organizacional e do trabalho'],
  'psicologia organizacional': ['pot', 'organizacional', 'psicologia do trabalho'],
  'psicologia do trabalho': ['pot', 'organizacional', 'psicologia organizacional'],

  // Neuro
  'neuro': ['neuro', 'neuropsicologia', 'neuropsi', 'neurociencia', 'neurociencias', 'cognicao', 'funcoes cognitivas'],
  'neuropsicologia': ['neuro', 'neuropsicologia', 'neuropsi', 'avaliacao neuropsicologica'],
  'reabilitacao neuro': ['reabilitacao neuropsicologica', 'reabilitacao cognitiva', 'estimulacao cognitiva', 'neuroplasticidade'],

  // RH
  'rh': ['rh', 'recursos humanos', 'gente e gestao', 'gente e cultura', 'business partner', 'people'],
  'recursos humanos': ['rh', 'recursos humanos', 'gente e gestao', 'people'],

  // TEA / Autismo
  'tea': ['tea', 'autismo', 'espectro autista', 'transtorno do espectro autista', 'transtorno do espectro do autismo', 'neurodesenvolvimento'],
  'autismo': ['tea', 'autismo', 'espectro autista'],
  'aba': ['aba', 'analise do comportamento aplicada', 'analise aplicada do comportamento'],

  // IA
  'ia': ['ia', 'inteligencia artificial', 'inteligencia artificial generativa', 'ai', 'ia generativa', 'genai'],
  'inteligencia artificial': ['ia', 'inteligencia artificial', 'ai', 'genai'],
  'ia generativa': ['ia generativa', 'genai', 'ai generativa', 'inteligencia artificial generativa', 'llm', 'chatgpt em psicologia'],

  // Burnout
  'burnout': ['burnout', 'esgotamento', 'esgotamento profissional', 'sindrome de burnout', 'sindrome do esgotamento'],
  'esgotamento': ['burnout', 'esgotamento', 'sindrome de burnout'],

  // MBA / lato / stricto
  'mba': ['mba', 'pos-graduacao', 'pos graduacao', 'pos', 'especializacao', 'lato sensu'],
  'especializacao': ['especializacao', 'lato sensu', 'pos-graduacao lato sensu', 'mba'],
  'lato sensu': ['lato sensu', 'lato', 'especializacao', 'mba'],
  'stricto sensu': ['stricto sensu', 'stricto', 'mestrado', 'doutorado'],

  // CFP / regulacao
  'cfp': ['cfp', 'conselho federal de psicologia', 'conselho regional de psicologia', 'crp'],
  'satepsi': ['satepsi', 'sistema de avaliacao de testes psicologicos', 'testes psicologicos validados'],
  'avaliacao psicologica': ['avaliacao psicologica', 'psicometria', 'testes psicologicos', 'laudo psicologico', 'pareceres psicologicos'],

  // Liderança
  'lideranca': ['lideranca', 'lider', 'lideres', 'gestao de pessoas', 'gestao'],
  'lideranca positiva': ['lideranca positiva', 'positive leadership', 'lideranca de cultura'],
  'seguranca psicologica': ['seguranca psicologica', 'psychological safety', 'amy edmondson'],

  // Métodos
  'tcc': ['tcc', 'terapia cognitivo comportamental', 'terapia cognitivo-comportamental', 'cognitivo comportamental', 'aaron beck'],
  'act': ['act', 'terapia de aceitacao e compromisso', 'aceitacao e compromisso', 'steven hayes', 'terceira onda'],
  'dbt': ['dbt', 'terapia comportamental dialetica', 'comportamental dialetica', 'marsha linehan'],
  'mindfulness': ['mindfulness', 'atencao plena', 'mbsr', 'mbct', 'jon kabat-zinn', 'kabat zinn'],
  'emdr': ['emdr', 'dessensibilizacao e reprocessamento', 'movimento ocular', 'francine shapiro'],

  // People analytics
  'people analytics': ['people analytics', 'analytics em rh', 'analytics de pessoas', 'dados de pessoas', 'analitica de rh'],
  'employee experience': ['employee experience', 'experiencia do colaborador', 'ex', 'experiencia do funcionario'],

  // Saúde mental
  'saude mental': ['saude mental', 'saude mental no trabalho', 'bem-estar mental', 'bem estar mental'],
  'bem-estar': ['bem-estar', 'bem estar', 'wellbeing', 'well-being', 'bem-estar no trabalho'],
  'psicologia positiva': ['psicologia positiva', 'martin seligman', 'florescimento humano', 'forcas pessoais', 'pp'],

  // Emergentes
  'fadiga digital': ['fadiga digital', 'tecnostress', 'tech stress', 'fadiga de tela', 'sobrecarga digital'],
  'ansiedade climatica': ['ansiedade climatica', 'eco-luto', 'climate anxiety', 'eco ansiedade', 'eco-ansiedade'],
  'gen z': ['gen z', 'geracao z', 'jovens no trabalho', 'jovens profissionais'],
  'lideranca toxica': ['lideranca toxica', 'gestao toxica', 'abusive supervision', 'chefe toxico'],
  'longevidade': ['longevidade', 'longevidade no trabalho', 'carreira 60 anos', 'envelhecimento ativo'],

  // Cultura / clima
  'cultura organizacional': ['cultura organizacional', 'clima organizacional', 'cultura corporativa', 'cultura da empresa'],
  'clima': ['clima organizacional', 'pesquisa de clima', 'engajamento'],

  // Trabalho híbrido
  'trabalho hibrido': ['trabalho hibrido', 'home office', 'remoto', 'work from anywhere', 'hibridismo'],

  // Diversidade
  'diversidade': ['diversidade', 'diversidade e inclusao', 'dei', 'd&i', 'inclusao', 'equidade'],

  // Carreira
  'carreira': ['carreira', 'transicao de carreira', 'transicao clinica para pot', 'mudanca de carreira'],

  // Educação
  'psicopedagogia': ['psicopedagogia', 'aprendizagem', 'dificuldades de aprendizagem'],
  'escolar': ['psicologia escolar', 'psicologia educacional', 'inclusao escolar'],
};

// ---------------------------------------------------------------------------
// Mapa areaId → tagIds. Reflete relações editoriais.
// ---------------------------------------------------------------------------

export const TAG_MAP: Record<string, string[]> = {
  'psicologia-organizacional-trabalho': ['pot', 'nr1', 'cultura-clima', 'rh', 'people-analytics', 'trabalho-hibrido', 'diversidade'],
  'psicologia-positiva': ['lideranca-positiva', 'seguranca-psicologica', 'saude-mental-trabalho'],
  'saude-mental-organizacoes': ['saude-mental-trabalho', 'burnout', 'nr1'],
  'neuropsicologia': ['neuro', 'avaliacao'],
  'reabilitacao-neuropsicologica': ['neuro', 'reabilitacao-cognitiva'],
  'avaliacao-psicologica': ['avaliacao', 'satepsi', 'cfp'],
  'psicologia-clinica': ['tcc', 'act', 'mindfulness'],
  'psicologia-hospitalar': ['avaliacao'],
  'psicologia-saude': ['saude-mental-trabalho', 'burnout'],
  'psicologia-escolar-educacional': [],
  'psicopedagogia': [],
  'psicomotricidade': [],
  'psicologia-juridica-forense': ['avaliacao', 'cfp'],
  'psicologia-social': [],
  'psicologia-esporte': [],
  'psicologia-transito-trafego': ['avaliacao', 'cfp'],
  'aba-tea-neurodesenvolvimento': ['aba', 'tea', 'neuro'],
  'ia-people-analytics-psicologia-digital': ['ia', 'ia-rh', 'people-analytics', 'lgpd', 'rh'],
};

// MBAs também ganham tags para enriquecer matchings.
export const TAG_MAP_MBA: Record<string, string[]> = {
  'mba-pot': ['pot', 'nr1', 'cultura-clima', 'rh', 'people-analytics'],
  'mba-positiva': ['lideranca-positiva', 'seguranca-psicologica', 'saude-mental-trabalho', 'burnout'],
  'mba-neuro': ['neuro', 'reabilitacao-cognitiva'],
  'mba-ncpp': ['neuro', 'lideranca-positiva'],
  'mba-lideranca-positiva': ['lideranca-positiva', 'seguranca-psicologica', 'cultura-clima', 'rh'],
};

// ---------------------------------------------------------------------------
// Mapa de pertencimento por tag → docs (preenchido lazily).
// ---------------------------------------------------------------------------

const guiaTagMap: Record<string, string[]> = {
  'implementar-nr1-em-empresa': ['nr1', 'rh', 'pot'],
  'construir-programa-bem-estar': ['saude-mental-trabalho', 'burnout', 'lideranca-positiva'],
  'retorno-ao-trabalho-pos-burnout': ['burnout', 'saude-mental-trabalho'],
  'avaliacao-tea-adulto': ['tea', 'avaliacao', 'aba'],
  'escolher-supervisor-clinico': ['avaliacao'],
  'uso-etico-ia-clinica': ['ia', 'lgpd'],
};

const evidenciaTagMap: Record<string, string[]> = {
  'nr1-riscos-psicossociais-2026': ['nr1', 'pot'],
  'burnout-gen-z': ['burnout', 'gen-z'],
  'ia-generativa-saude-mental': ['ia'],
  'mindfulness-corporativo': ['mindfulness', 'saude-mental-trabalho'],
  'terapias-terceira-onda': ['act', 'dbt', 'mindfulness'],
  'fadiga-digital': ['fadiga-digital', 'trabalho-hibrido'],
};

const casoTagMap: Record<string, string[]> = {
  'pot-fabrica-nr1': ['nr1', 'pot', 'rh'],
  'positiva-burnout-fintech': ['burnout', 'lideranca-positiva'],
  'reabilitacao-pos-avc': ['neuro', 'reabilitacao-cognitiva'],
  'lideranca-positiva-startup-escalando': ['lideranca-positiva', 'seguranca-psicologica'],
  'aba-rede-escolar': ['aba', 'tea'],
};

const faqTagMap: Record<string, string[]> = {
  'nr1-faq': ['nr1'],
  'mba-vs-especializacao-faq': ['mba-vs-especializacao', 'lato-stricto'],
  'carreira-psicologo-organizacional-faq': ['pot'],
  'avaliacao-psicologica-laudos-faq': ['avaliacao', 'satepsi'],
  'regulacao-cfp-faq': ['cfp'],
  'ia-em-psicologia-faq': ['ia', 'lgpd'],
};

// ---------------------------------------------------------------------------
// Funções de relacionamento.
// ---------------------------------------------------------------------------

function intersect(a: string[], b: string[]): boolean {
  for (const x of a) if (b.includes(x)) return true;
  return false;
}

/** Áreas relacionadas a uma área (compartilham ao menos uma tag). */
export function getRelatedAreas(id: string): RelatedItem[] {
  const tags = TAG_MAP[id] || [];
  if (tags.length === 0) return [];
  return AREAS
    .filter(a => a.id !== id && intersect(TAG_MAP[a.id] || [], tags))
    .slice(0, 6)
    .map(a => ({ id: a.id, name: a.name, href: `/areas/${a.id}` }));
}

/** MBAs relacionados a uma área. */
export function getRelatedMbas(id: string): RelatedItem[] {
  const tags = TAG_MAP[id] || TAG_MAP_MBA[id] || [];
  if (tags.length === 0) return MBAS.slice(0, 3).map(m => ({ id: m.id, name: m.shortName, href: `/mbas#${m.id}` }));
  return MBAS
    .filter(m => intersect(TAG_MAP_MBA[m.id] || [], tags))
    .slice(0, 4)
    .map(m => ({ id: m.id, name: m.shortName, href: `/mbas#${m.id}` }));
}

/** Guias práticos relacionados. */
export function getRelatedGuias(id: string): RelatedItem[] {
  const tags = TAG_MAP[id] || TAG_MAP_MBA[id] || [];
  if (tags.length === 0) return [];
  return GUIAS
    .filter(g => intersect(guiaTagMap[g.id] || [], tags))
    .slice(0, 4)
    .map(g => ({ id: g.id, name: g.name, href: `/guias/${g.id}` }));
}

/** Evidências relacionadas. */
export function getRelatedEvidencias(id: string): RelatedItem[] {
  const tags = TAG_MAP[id] || TAG_MAP_MBA[id] || [];
  if (tags.length === 0) return [];
  return EVIDENCIAS
    .filter(e => intersect(evidenciaTagMap[e.id] || [], tags))
    .slice(0, 4)
    .map(e => ({ id: e.id, name: e.name, href: `/evidencias/${e.id}` }));
}

/** Casos práticos relacionados. */
export function getRelatedCasos(id: string): RelatedItem[] {
  const tags = TAG_MAP[id] || TAG_MAP_MBA[id] || [];
  if (tags.length === 0) return [];
  return CASOS
    .filter(c => intersect(casoTagMap[c.id] || [], tags))
    .slice(0, 4)
    .map(c => ({ id: c.id, name: c.name, href: `/casos/${c.id}` }));
}

/** FAQs profundos relacionados. */
export function getRelatedFaqs(id: string): RelatedItem[] {
  const tags = TAG_MAP[id] || TAG_MAP_MBA[id] || [];
  if (tags.length === 0) return [];
  return FAQS_DEEP
    .filter(f => intersect(faqTagMap[f.id] || [], tags))
    .slice(0, 4)
    .map(f => ({ id: f.id, name: f.name, href: `/faq/${f.id}` }));
}

// ---------------------------------------------------------------------------
// Persona-fit por path.
// ---------------------------------------------------------------------------

const PERSONA_BY_AREA_TAG: Record<string, string> = {
  'pot': 'rh',
  'nr1': 'rh',
  'rh': 'rh',
  'people-analytics': 'rh',
  'cultura-clima': 'rh',
  'lideranca-positiva': 'lideres',
  'seguranca-psicologica': 'lideres',
  'saude-mental-trabalho': 'consultores',
  'burnout': 'consultores',
  'neuro': 'psicologos',
  'avaliacao': 'psicologos',
  'tea': 'psicologos',
  'aba': 'psicologos',
  'tcc': 'psicologos',
  'act': 'psicologos',
  'dbt': 'psicologos',
  'mindfulness': 'psicologos',
  'emdr': 'psicologos',
  'ia': 'rh',
  'ia-rh': 'rh',
};

/** Persona principal para um path (best-effort). */
export function getPersonaFor(href: string): string | null {
  if (!href) return null;
  // MBAs já carregam personas
  const mbaMatch = href.match(/\/mbas[#/]?(.*)$/);
  if (mbaMatch && mbaMatch[1]) {
    const m = MBAS.find(x => x.id === mbaMatch[1]);
    if (m && m.personas[0]) {
      const p = m.personas[0].toLowerCase();
      if (p.includes('psic')) return 'psicologos';
      if (p.includes('rh')) return 'rh';
      if (p.includes('lider') || p.includes('execut') || p.includes('gestor')) return 'lideres';
      return 'consultores';
    }
  }
  // Área?
  const areaMatch = href.match(/\/areas\/([^/?#]+)/);
  if (areaMatch) {
    const a = AREAS.find(x => x.id === areaMatch[1]);
    if (a && a.personas[0]) {
      const p = a.personas[0].toLowerCase();
      if (p.includes('rh')) return 'rh';
      if (p.includes('lider')) return 'lideres';
      if (p.includes('psic')) return 'psicologos';
      return 'consultores';
    }
  }
  // Guia
  const guiaMatch = href.match(/\/guias\/([^/?#]+)/);
  if (guiaMatch) {
    const g = GUIAS.find(x => x.id === guiaMatch[1]);
    if (g) return g.persona;
  }
  // FAQ / Evidência / Caso → busca por tag
  const tags = getTagsFor(href);
  for (const t of tags) {
    if (PERSONA_BY_AREA_TAG[t]) return PERSONA_BY_AREA_TAG[t];
  }
  return null;
}

/** Lista de tagIds inferidos para um path. */
export function getTagsFor(href: string): string[] {
  if (!href) return [];
  const areaMatch = href.match(/\/areas\/([^/?#]+)/);
  if (areaMatch) return TAG_MAP[areaMatch[1]] || [];

  const mbaMatch = href.match(/\/mbas[#/]?([^/?#]+)/);
  if (mbaMatch && mbaMatch[1]) return TAG_MAP_MBA[mbaMatch[1]] || [];

  const guiaMatch = href.match(/\/guias\/([^/?#]+)/);
  if (guiaMatch) return guiaTagMap[guiaMatch[1]] || [];

  const evidMatch = href.match(/\/evidencias\/([^/?#]+)/);
  if (evidMatch) return evidenciaTagMap[evidMatch[1]] || [];

  const casoMatch = href.match(/\/casos\/([^/?#]+)/);
  if (casoMatch) return casoTagMap[casoMatch[1]] || [];

  const faqMatch = href.match(/\/faq\/([^/?#]+)/);
  if (faqMatch) return faqTagMap[faqMatch[1]] || [];

  const temaMatch = href.match(/\/temas\/([^/?#]+)/);
  if (temaMatch) {
    const t = TEMAS.find(x => x.id === temaMatch[1]);
    if (t && t.area) return TAG_MAP[t.area] || [];
    const e = TEMAS_EMERGENTES_2025_2026.find(x => x.id === temaMatch[1]);
    if (e && e.area) return TAG_MAP[e.area] || [];
  }
  return [];
}

// ---------------------------------------------------------------------------
// Próximos passos sugeridos.
// ---------------------------------------------------------------------------

/**
 * Sugere 1 a 3 grupos de próximos passos para um path, considerando persona.
 * Cada grupo: "aprofunde" (conteúdo conceitual), "pratica" (guias/intervenções)
 * ou "caminho" (MBAs/recursos práticos).
 */
export function getNextSteps(href: string, persona?: string): NextStepGroup[] {
  const tags = getTagsFor(href);
  const p = persona || getPersonaFor(href) || undefined;
  const groups: NextStepGroup[] = [];

  // 1. Caminho (MBAs)
  let mbas = MBAS.filter(m => intersect(TAG_MAP_MBA[m.id] || [], tags));
  if (mbas.length === 0) mbas = MBAS.slice(0, 2);
  if (mbas.length > 0) {
    groups.push({
      label: 'Caminho de formação',
      kind: 'caminho',
      items: mbas.slice(0, 3).map(m => ({
        label: m.shortName,
        href: `/mbas#${m.id}`,
        hint: m.tag,
      })),
    });
  }

  // 2. Prática (guias + intervenções)
  const guiasRel = GUIAS.filter(g => intersect(guiaTagMap[g.id] || [], tags));
  const intRel = INTERVENCOES.filter(i => tags.some(t => i.id.includes(t.replace('-', ''))));
  const praticaItems = [
    ...guiasRel.map(g => ({ label: g.name, href: `/guias/${g.id}`, hint: `${g.steps} passos` })),
    ...intRel.map(i => ({ label: i.name, href: `/intervencoes/${i.id}`, hint: i.evidence })),
  ].slice(0, 4);
  if (praticaItems.length > 0) {
    groups.push({ label: 'Coloque em prática', kind: 'pratica', items: praticaItems });
  }

  // 3. Aprofunde (evidências + FAQs + métodos)
  const evidRel = EVIDENCIAS.filter(e => intersect(evidenciaTagMap[e.id] || [], tags));
  const faqRel = FAQS_DEEP.filter(f => intersect(faqTagMap[f.id] || [], tags));
  const metRel = METODOS.filter(m => tags.includes(m.id));
  const aprofundeItems = [
    ...evidRel.map(e => ({ label: e.name, href: `/evidencias/${e.id}`, hint: `${e.papers} estudos` })),
    ...faqRel.map(f => ({ label: f.name, href: `/faq/${f.id}`, hint: `${f.qas} perguntas` })),
    ...metRel.map(m => ({ label: m.name, href: `/metodos/${m.id}`, hint: m.evidence })),
  ].slice(0, 4);
  if (aprofundeItems.length > 0) {
    groups.push({ label: 'Aprofunde nas fontes', kind: 'aprofunde', items: aprofundeItems });
  }

  // Boost persona-fit
  if (p) {
    for (const g of groups) {
      g.items.sort((a, b) => {
        const fa = getPersonaFor(a.href) === p ? 1 : 0;
        const fb = getPersonaFor(b.href) === p ? 1 : 0;
        return fb - fa;
      });
    }
  }

  return groups;
}

// ===========================================================================
// THESAURUS_RICH · apêndice semântico (SE-2)
// ---------------------------------------------------------------------------
// Estende SYNONYMS com relações hiperonímicas/hiponímicas/laterais.
// Permite expansão thesáurica via BFS limitado.
// Nada aqui altera exports existentes.
// ===========================================================================

export interface ThesaurusEntry {
  term: string;
  hypernyms?: string[];
  hyponyms?: string[];
  related?: string[];
}

export const THESAURUS_RICH: ThesaurusEntry[] = [
  {
    term: 'terapia',
    hyponyms: ['TCC', 'ACT', 'DBT', 'EMDR', 'MBCT', 'MBSR', 'mindfulness clínico', 'psicanálise', 'psicoterapia'],
    related: ['psicoterapia', 'tratamento psicológico'],
  },
  {
    term: 'psicoterapia',
    hypernyms: ['terapia'],
    hyponyms: ['TCC', 'ACT', 'DBT', 'EMDR', 'mindfulness clínico'],
  },
  {
    term: 'TCC',
    hypernyms: ['terapia', 'psicoterapia', 'terapias de evidência'],
    related: ['ansiedade', 'depressão', 'insônia', 'TOC', 'fobia social'],
  },
  {
    term: 'ACT',
    hypernyms: ['terapia', 'terceira onda', 'terapias de evidência'],
    related: ['dor crônica', 'aceitação', 'mindfulness clínico'],
  },
  {
    term: 'DBT',
    hypernyms: ['terapia', 'terceira onda', 'terapias de evidência'],
    related: ['borderline', 'TPB', 'autolesão', 'desregulação emocional'],
  },
  {
    term: 'EMDR',
    hypernyms: ['terapia', 'terapias de evidência'],
    related: ['TEPT', 'trauma', 'trauma complexo'],
  },
  {
    term: 'mindfulness clínico',
    hypernyms: ['terapia', 'terceira onda'],
    hyponyms: ['MBSR', 'MBCT'],
    related: ['ACT', 'meditação', 'atenção plena'],
  },
  {
    term: 'burnout',
    hypernyms: ['esgotamento profissional', 'saúde mental no trabalho'],
    related: ['NR-1', 'estresse ocupacional', 'fadiga digital', 'exaustão emocional'],
  },
  {
    term: 'saúde mental no trabalho',
    hypernyms: ['saúde mental nas organizações'],
    hyponyms: ['burnout', 'NR-1', 'riscos psicossociais', 'fadiga digital'],
    related: ['liderança positiva', 'segurança psicológica'],
  },
  {
    term: 'NR-1',
    hypernyms: ['riscos psicossociais', 'saúde mental no trabalho'],
    related: ['burnout', 'cultura organizacional', 'POT'],
  },
  {
    term: 'liderança positiva',
    hypernyms: ['liderança'],
    related: ['segurança psicológica', 'cultura organizacional', 'psicologia positiva'],
  },
  {
    term: 'segurança psicológica',
    hypernyms: ['cultura organizacional'],
    related: ['liderança positiva', 'Edmondson', 'alta performance'],
  },
  {
    term: 'POT',
    hypernyms: ['Psicologia'],
    hyponyms: ['cultura organizacional', 'clima', 'NR-1', 'people analytics'],
    related: ['RH', 'recursos humanos'],
  },
  {
    term: 'people analytics',
    hypernyms: ['POT', 'IA em RH'],
    related: ['dados comportamentais', 'LGPD', 'engajamento'],
  },
  {
    term: 'neuropsicologia',
    hypernyms: ['Psicologia'],
    hyponyms: ['avaliação neuropsicológica', 'reabilitação cognitiva', 'funções executivas'],
    related: ['neurociência'],
  },
  {
    term: 'reabilitação neuropsicológica',
    hypernyms: ['neuropsicologia'],
    related: ['neuroplasticidade', 'AVC', 'demência', 'envelhecimento'],
  },
  {
    term: 'avaliação psicológica',
    hypernyms: ['Psicologia'],
    hyponyms: ['psicometria', 'laudos', 'testes psicológicos'],
    related: ['SATEPSI', 'CFP'],
  },
  {
    term: 'SATEPSI',
    hypernyms: ['avaliação psicológica'],
    related: ['CFP', 'testes psicológicos'],
  },
  {
    term: 'CFP',
    related: ['CRP', 'MEC', 'lato sensu', 'stricto sensu', 'especialidades'],
  },
  {
    term: 'TEA',
    hypernyms: ['neurodesenvolvimento'],
    hyponyms: ['TEA infantil', 'TEA adulto'],
    related: ['ABA', 'autismo', 'inclusão'],
  },
  {
    term: 'ABA',
    hypernyms: ['análise do comportamento'],
    related: ['TEA', 'autismo', 'neurodesenvolvimento'],
  },
  {
    term: 'TEPT',
    hypernyms: ['trauma'],
    related: ['EMDR', 'estresse pós-traumático'],
  },
  {
    term: 'ansiedade',
    hypernyms: ['transtorno mental'],
    hyponyms: ['TAG', 'pânico', 'fobia social', 'fobia'],
    related: ['TCC'],
  },
  {
    term: 'depressão',
    hypernyms: ['transtornos do humor'],
    related: ['TCC', 'MBCT', 'distimia'],
  },
  {
    term: 'IA em Psicologia',
    hypernyms: ['inteligência artificial'],
    hyponyms: ['IA generativa', 'people analytics'],
    related: ['LGPD', 'ética'],
  },
  {
    term: 'IA generativa',
    hypernyms: ['IA em Psicologia', 'inteligência artificial'],
    related: ['LGPD', 'GenAI', 'LLM'],
  },
  {
    term: 'MBA',
    hypernyms: ['pós-graduação', 'lato sensu'],
    hyponyms: ['MBA em POT', 'MBA em Psicologia Positiva', 'MBA em Liderança Positiva'],
    related: ['especialização'],
  },
  {
    term: 'especialização',
    hypernyms: ['pós-graduação', 'lato sensu'],
    related: ['MBA', 'CFP'],
  },
  {
    term: 'pós-graduação',
    hyponyms: ['lato sensu', 'stricto sensu', 'MBA', 'mestrado', 'doutorado'],
  },
  {
    term: 'lato sensu',
    hypernyms: ['pós-graduação'],
    hyponyms: ['MBA', 'especialização'],
    related: ['MEC'],
  },
  {
    term: 'stricto sensu',
    hypernyms: ['pós-graduação'],
    hyponyms: ['mestrado', 'doutorado'],
    related: ['CAPES'],
  },
  {
    term: 'fadiga digital',
    hypernyms: ['saúde mental no trabalho'],
    related: ['tecnostress', 'trabalho híbrido', 'burnout'],
  },
  {
    term: 'psicologia positiva',
    hypernyms: ['Psicologia'],
    related: ['Seligman', 'florescimento humano', 'forças pessoais', 'liderança positiva'],
  },
  {
    term: 'RH',
    related: ['recursos humanos', 'gestão de pessoas', 'POT', 'people analytics'],
  },
  {
    term: 'mindfulness',
    hypernyms: ['mindfulness clínico'],
    related: ['MBSR', 'MBCT', 'meditação', 'ACT'],
  },
];

// Indexação interna para BFS rápido (folded).
const _THESAURUS_INDEX: Map<string, ThesaurusEntry> = new Map(
  THESAURUS_RICH.map(e => [foldThesaurus(e.term), e]),
);

/** fold local (sem importar de search-index para evitar ciclo). */
function foldThesaurus(s: string): string {
  if (!s) return '';
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[ºª]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Expande thesaurus por BFS limitado em depth (default 1).
 * Retorna union de hypernyms ∪ hyponyms ∪ related (até a profundidade dada).
 * O termo de entrada é incluído na saída.
 */
export function thesaurusExpand(term: string, depth = 1): string[] {
  const start = foldThesaurus(term);
  if (!start) return [];
  const visited = new Set<string>([start]);
  const queue: Array<{ t: string; d: number }> = [{ t: start, d: 0 }];

  while (queue.length > 0) {
    const cur = queue.shift()!;
    if (cur.d >= depth) continue;
    const entry = _THESAURUS_INDEX.get(cur.t);
    if (!entry) continue;
    const neighbors = [
      ...(entry.hypernyms || []),
      ...(entry.hyponyms || []),
      ...(entry.related || []),
    ];
    for (const n of neighbors) {
      const nf = foldThesaurus(n);
      if (!visited.has(nf)) {
        visited.add(nf);
        queue.push({ t: nf, d: cur.d + 1 });
      }
    }
  }

  return Array.from(visited);
}
