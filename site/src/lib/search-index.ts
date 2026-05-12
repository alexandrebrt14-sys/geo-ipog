/**
 * Índice de busca unificado para posgraduacaopsicologia.com.
 *
 * Gera um SearchDoc para cada página/cluster relevante (≥250 docs) e expõe
 * uma API simples: search(q, opts), trending(), byPersona(), byKind().
 *
 * - fold(): acento-fold + lowercase. Toda comparação usa string folded.
 * - expandQuery(): aplica SYNONYMS para enriquecer tokens.
 * - Ranking: pondera title/subtitle/tags/keywords + weight do doc.
 *
 * REGRA #0: textos visíveis em português brasileiro com acentuação completa.
 */

import {
  AREAS,
  MBAS,
  TEMAS,
  ESTADOS,
  PERSONAS,
  METODOS,
  EVIDENCIAS,
  CASOS,
  GUIAS,
  FAQS,
  FAQS_DEEP,
  GLOSSARIO_CLUSTERS,
  INTERVENCOES,
  TEMAS_EMERGENTES_2025_2026,
} from './data';
import { SYNONYMS, TAG_MAP, TAG_MAP_MBA } from './taxonomy';

// ---------------------------------------------------------------------------
// Tipos públicos
// ---------------------------------------------------------------------------

export type DocKind =
  | 'Área'
  | 'MBA'
  | 'Tema'
  | 'Estado'
  | 'Persona'
  | 'Guia'
  | 'FAQ'
  | 'Glossário'
  | 'Método'
  | 'Evidência'
  | 'Caso'
  | 'Intervenção'
  | 'Comparativo'
  | 'Carreira'
  | 'Recurso';

export interface SearchDoc {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  kind: DocKind;
  tags: string[];
  /** Concatenação pre-folded (sem acento, lowercase) para match rápido. */
  keywords: string;
  /** Boost de relevância (1.0 padrão; hubs e MBAs recebem mais). */
  weight: number;
  /** Lista de personas associadas (psicologos, rh, lideres, consultores). */
  persona?: string[];
}

// ---------------------------------------------------------------------------
// fold + expandQuery
// ---------------------------------------------------------------------------

/** Remove acentos e normaliza para lowercase. Idempotente. */
export function fold(s: string): string {
  if (!s) return '';
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[ºª]/g, '')
    .toLowerCase()
    .trim();
}

const FOLDED_SYNONYMS: Record<string, string[]> = Object.fromEntries(
  Object.entries(SYNONYMS).map(([k, vs]) => [fold(k), vs.map(fold)])
);

/**
 * Expande a query usuário em tokens canônicos.
 * Retorna lista única de tokens folded (inclui originais + sinônimos).
 */
export function expandQuery(q: string): string[] {
  const folded = fold(q);
  if (!folded) return [];
  const rawTokens = folded.split(/\s+/).filter(Boolean);
  const out = new Set<string>(rawTokens);
  // Frase inteira como token
  out.add(folded);

  // n-grams 2 e 3 para captar "psicologia organizacional" etc.
  for (let i = 0; i < rawTokens.length; i++) {
    if (i + 1 < rawTokens.length) out.add(rawTokens[i] + ' ' + rawTokens[i + 1]);
    if (i + 2 < rawTokens.length) out.add(rawTokens[i] + ' ' + rawTokens[i + 1] + ' ' + rawTokens[i + 2]);
  }

  // Sinônimos por chave
  for (const tok of Array.from(out)) {
    const syns = FOLDED_SYNONYMS[tok];
    if (syns) for (const s of syns) out.add(s);
    // Match parcial: se algum sinônimo bate como substring na key
    for (const [k, vs] of Object.entries(FOLDED_SYNONYMS)) {
      if (k.includes(tok) || tok.includes(k)) {
        out.add(k);
        for (const v of vs) out.add(v);
      }
    }
  }
  return Array.from(out);
}

// ---------------------------------------------------------------------------
// Construção do índice
// ---------------------------------------------------------------------------

let _cache: SearchDoc[] | null = null;

function mkKeywords(...parts: (string | readonly string[] | string[] | undefined | null)[]): string {
  const flat = parts
    .flatMap(p => (Array.isArray(p) ? p : [p]))
    .filter(Boolean)
    .join(' ');
  return fold(flat);
}

function personaListFromMba(personas: string[]): string[] {
  const out: string[] = [];
  for (const p of personas) {
    const pf = fold(p);
    if (pf.includes('psic')) out.push('psicologos');
    else if (pf.includes('rh')) out.push('rh');
    else if (pf.includes('lider') || pf.includes('execut') || pf.includes('gestor') || pf.includes('coach')) out.push('lideres');
    else if (pf.includes('saude') || pf.includes('educ')) out.push('consultores');
    else out.push('consultores');
  }
  return Array.from(new Set(out));
}

function personaListFromArea(personas: string[]): string[] {
  const out: string[] = [];
  for (const p of personas) {
    const pf = fold(p);
    if (pf.includes('psic')) out.push('psicologos');
    else if (pf.includes('rh')) out.push('rh');
    else if (pf.includes('lider')) out.push('lideres');
    else out.push('consultores');
  }
  return Array.from(new Set(out));
}

export function buildIndex(): SearchDoc[] {
  if (_cache) return _cache;
  const docs: SearchDoc[] = [];

  // 18 Áreas
  for (const a of AREAS) {
    docs.push({
      id: `area:${a.id}`,
      title: a.name,
      subtitle: a.short !== a.name ? a.short : undefined,
      href: `/areas/${a.id}`,
      kind: 'Área',
      tags: TAG_MAP[a.id] || [],
      keywords: mkKeywords(a.name, a.short, a.description, a.subareas, a.regulatoryLevel, a.cluster, a.personas),
      weight: 1.4,
      persona: personaListFromArea(a.personas),
    });
  }

  // 5 MBAs
  for (const m of MBAS) {
    docs.push({
      id: `mba:${m.id}`,
      title: m.shortName,
      subtitle: m.tag,
      href: `/mbas#${m.id}`,
      kind: 'MBA',
      tags: TAG_MAP_MBA[m.id] || [],
      keywords: mkKeywords(m.shortName, m.name, m.description, m.topics, m.personas, m.cluster, 'mba pos graduacao lato sensu especializacao'),
      weight: 1.6,
      persona: personaListFromMba(m.personas),
    });
  }

  // 16 Temas
  for (const t of TEMAS) {
    docs.push({
      id: `tema:${t.id}`,
      title: t.name,
      subtitle: t.area ? AREAS.find(a => a.id === t.area)?.short : undefined,
      href: `/temas/${t.id}`,
      kind: 'Tema',
      tags: t.area ? TAG_MAP[t.area] || [] : [],
      keywords: mkKeywords(t.name, t.id.replace(/-/g, ' '), t.area),
      weight: 1.1,
    });
  }

  // 27 Estados
  for (const e of ESTADOS) {
    docs.push({
      id: `estado:${e.uf}`,
      title: `${e.nome}`,
      subtitle: `${e.uf} · ${e.regiao}`,
      href: `/por-estado/${e.uf.toLowerCase()}`,
      kind: 'Estado',
      tags: [],
      keywords: mkKeywords(e.nome, e.uf, e.regiao, 'pos graduacao psicologia mba'),
      weight: 0.7,
    });
  }

  // 4 Personas (entry no #ancora + /para-quem/id)
  for (const p of PERSONAS) {
    docs.push({
      id: `persona:${p.id}`,
      title: p.name,
      subtitle: 'Trilha sugerida',
      href: `/para-quem/${p.id}`,
      kind: 'Persona',
      tags: [],
      keywords: mkKeywords(p.name, p.description, p.pains, p.recommendedMBA, p.id),
      weight: 1.0,
      persona: [p.id === 'lideres' ? 'lideres' : p.id],
    });
  }

  // 5 Métodos
  for (const m of METODOS) {
    docs.push({
      id: `metodo:${m.id}`,
      title: m.name,
      subtitle: m.evidence,
      href: `/metodos/${m.id}`,
      kind: 'Método',
      tags: [m.id],
      keywords: mkKeywords(m.name, m.founder, m.evidence, m.indications, 'terapia psicoterapia abordagem'),
      weight: 1.2,
    });
  }

  // 6 Evidências
  for (const e of EVIDENCIAS) {
    docs.push({
      id: `evid:${e.id}`,
      title: e.name,
      subtitle: `${e.papers} estudos · ${e.cluster}`,
      href: `/evidencias/${e.id}`,
      kind: 'Evidência',
      tags: [e.cluster],
      keywords: mkKeywords(e.name, e.cluster, 'evidencia revisao paper meta-analise estudo'),
      weight: 1.3,
    });
  }

  // 5 Casos
  for (const c of CASOS) {
    docs.push({
      id: `caso:${c.id}`,
      title: c.name,
      subtitle: AREAS.find(a => a.id === c.area)?.short,
      href: `/casos/${c.id}`,
      kind: 'Caso',
      tags: TAG_MAP[c.area] || [],
      keywords: mkKeywords(c.name, c.area, c.mba, 'caso pratico aplicacao real estudo de caso'),
      weight: 1.2,
    });
  }

  // 6 Guias
  for (const g of GUIAS) {
    docs.push({
      id: `guia:${g.id}`,
      title: g.name,
      subtitle: `${g.steps} passos práticos`,
      href: `/guias/${g.id}`,
      kind: 'Guia',
      tags: [],
      keywords: mkKeywords(g.name, g.persona, 'guia passo a passo howto playbook'),
      weight: 1.3,
      persona: [g.persona],
    });
  }

  // 6 FAQs profundos
  for (const f of FAQS_DEEP) {
    docs.push({
      id: `faq:${f.id}`,
      title: f.name,
      subtitle: `${f.qas} perguntas respondidas`,
      href: `/faq/${f.id}`,
      kind: 'FAQ',
      tags: [],
      keywords: mkKeywords(f.name, 'perguntas frequentes duvidas faq'),
      weight: 1.1,
    });
  }

  // 5 Clusters de glossário
  for (const c of GLOSSARIO_CLUSTERS) {
    docs.push({
      id: `gloss:${c.id}`,
      title: c.name,
      subtitle: 'Glossário',
      href: `/glossario/${c.id}`,
      kind: 'Glossário',
      tags: [c.id],
      keywords: mkKeywords(c.name, c.id, 'glossario termos definicoes'),
      weight: 0.9,
    });
  }

  // 5 Intervenções
  for (const i of INTERVENCOES) {
    docs.push({
      id: `inter:${i.id}`,
      title: i.name,
      subtitle: i.evidence,
      href: `/intervencoes/${i.id}`,
      kind: 'Intervenção',
      tags: [],
      keywords: mkKeywords(i.name, i.evidence, i.context, 'intervencao modelo cuidado clinico'),
      weight: 1.1,
    });
  }

  // 8 Temas emergentes 2025-2026
  for (const t of TEMAS_EMERGENTES_2025_2026) {
    docs.push({
      id: `tema-emergente:${t.id}`,
      title: t.name,
      subtitle: 'Tema emergente 2025-2026',
      href: `/temas/${t.id}`,
      kind: 'Tema',
      tags: t.area ? TAG_MAP[t.area] || [] : [],
      keywords: mkKeywords(t.name, t.id.replace(/-/g, ' '), 'emergente atual 2025 2026 tendencia'),
      weight: 1.2,
    });
  }

  // Hubs raiz (apoio à descoberta de navegação)
  const hubs: { title: string; href: string; subtitle: string; kw: string; weight: number; kind: DocKind }[] = [
    { title: 'Todas as áreas de Psicologia', href: '/areas', subtitle: 'Hub · 18 áreas', kw: 'areas atuacao psicologia hub indice', weight: 1.5, kind: 'Área' },
    { title: 'Todos os MBAs e especializações', href: '/mbas', subtitle: 'Hub · 5 MBAs', kw: 'mbas pos graduacao especializacao lato sensu', weight: 1.6, kind: 'MBA' },
    { title: 'Guias práticos passo a passo', href: '/guias', subtitle: 'Hub · 6 guias HowTo', kw: 'guias playbooks passo a passo howto', weight: 1.3, kind: 'Guia' },
    { title: 'Perguntas frequentes (FAQ)', href: '/faq', subtitle: 'Hub · 82 perguntas', kw: 'faq perguntas frequentes duvidas', weight: 1.2, kind: 'FAQ' },
    { title: 'Glossário · 115 termos', href: '/glossario', subtitle: 'Hub · 5 clusters', kw: 'glossario termos definicoes vocabulario', weight: 1.0, kind: 'Glossário' },
    { title: 'Evidências e revisões', href: '/evidencias', subtitle: 'Hub · 6 dossiês', kw: 'evidencia revisao paper estudo meta-analise', weight: 1.2, kind: 'Evidência' },
    { title: 'Casos práticos', href: '/casos', subtitle: 'Hub · 5 casos', kw: 'casos aplicacao real exemplo pratico', weight: 1.1, kind: 'Caso' },
    { title: 'Intervenções e modelos de cuidado', href: '/intervencoes', subtitle: 'Hub · 5 protocolos', kw: 'intervencoes modelos cuidado clinico protocolos', weight: 1.1, kind: 'Intervenção' },
    { title: 'Métodos terapêuticos', href: '/metodos', subtitle: 'Hub · TCC, ACT, DBT, EMDR, mindfulness', kw: 'metodos terapia abordagens tcc act dbt mindfulness emdr', weight: 1.2, kind: 'Método' },
    { title: 'Temas e tendências', href: '/temas', subtitle: 'Hub · 24 temas', kw: 'temas tendencias atualidade 2025 2026', weight: 1.0, kind: 'Tema' },
    { title: 'Comparativos editoriais', href: '/comparativos', subtitle: 'Hub · análises comparadas', kw: 'comparativos comparacoes ranking analise', weight: 1.0, kind: 'Comparativo' },
    { title: 'Carreira em Psicologia', href: '/carreira', subtitle: 'Hub · trilhas e transições', kw: 'carreira trilhas transicao salario mercado', weight: 1.1, kind: 'Carreira' },
    { title: 'Para quem é a pós', href: '/para-quem', subtitle: 'Hub · 4 personas', kw: 'para quem personas perfil destinatarios publico', weight: 1.0, kind: 'Persona' },
    { title: 'Pós-graduação por estado', href: '/por-estado', subtitle: 'Hub · 27 estados', kw: 'por estado uf regiao polo presencial online', weight: 0.9, kind: 'Estado' },
    { title: 'Regulação · CFP, MEC, lato/stricto', href: '/regulacao', subtitle: 'Guia regulatório', kw: 'regulacao cfp crp mec lato stricto sensu satepsi mba especializacao', weight: 1.4, kind: 'Recurso' },
    { title: 'Mapa do site', href: '/mapa-do-site', subtitle: 'Índice completo', kw: 'mapa site indice navegacao', weight: 0.6, kind: 'Recurso' },
    { title: 'Sobre o portal', href: '/sobre', subtitle: 'Editorial · independente', kw: 'sobre quem somos editorial independente brasil geo', weight: 0.6, kind: 'Recurso' },
    { title: 'Recursos e downloads', href: '/recursos', subtitle: 'Hub · materiais', kw: 'recursos downloads materiais ferramentas templates', weight: 0.9, kind: 'Recurso' },
    { title: 'Pós-graduação em Psicologia (visão geral)', href: '/pos-graduacao-psicologia', subtitle: 'Página pilar', kw: 'pos graduacao em psicologia visao geral pilar', weight: 1.3, kind: 'Recurso' },
  ];
  for (const h of hubs) {
    docs.push({
      id: `hub:${h.href}`,
      title: h.title,
      subtitle: h.subtitle,
      href: h.href,
      kind: h.kind,
      tags: [],
      keywords: mkKeywords(h.title, h.subtitle, h.kw),
      weight: h.weight,
    });
  }

  // Subdocs de regulação (perguntas-chave editoriais)
  const reg: { title: string; href: string; sub: string; kw: string }[] = [
    { title: 'MBA vs Especialização em Psicologia', href: '/regulacao#mba-vs-especializacao', sub: 'Regulação', kw: 'mba versus especializacao diferenca lato sensu mec' },
    { title: 'Lato sensu vs Stricto sensu', href: '/regulacao#lato-stricto', sub: 'Regulação', kw: 'lato sensu stricto sensu mestrado doutorado pos graduacao' },
    { title: 'Modalidades · online, ao vivo, presencial', href: '/regulacao#modalidades', sub: 'Regulação', kw: 'modalidades online ao vivo presencial hibrido ead' },
    { title: 'Especialidades reconhecidas pelo CFP', href: '/regulacao#cfp', sub: 'Regulação', kw: 'cfp conselho federal psicologia especialidades reconhecidas titulo de especialista' },
    { title: 'SATEPSI · testes psicológicos válidos', href: '/regulacao#satepsi', sub: 'Regulação', kw: 'satepsi testes psicologicos validados avaliacao psicologica' },
    { title: 'Níveis editoriais R0 a R4', href: '/regulacao#niveis', sub: 'Regulação', kw: 'nivel regulatorio r0 r1 r2 r3 r4 regulacao' },
    { title: 'Como escolher uma pós em Psicologia', href: '/regulacao#como-escolher', sub: 'Regulação', kw: 'como escolher pos graduacao psicologia mba criterios' },
  ];
  for (const r of reg) {
    docs.push({
      id: `reg:${r.href}`,
      title: r.title,
      subtitle: r.sub,
      href: r.href,
      kind: 'Recurso',
      tags: ['cfp', 'mba-vs-especializacao'],
      keywords: mkKeywords(r.title, r.sub, r.kw),
      weight: 1.1,
    });
  }

  // Persona hubs em /para-quem (entry adicional para o âncora antigo)
  for (const p of PERSONAS) {
    docs.push({
      id: `persona-anchor:${p.id}`,
      title: `${p.name} · home`,
      subtitle: 'Seção da home',
      href: `/#${p.id}`,
      kind: 'Persona',
      tags: [],
      keywords: mkKeywords(p.name, p.description, p.pains, p.recommendedMBA),
      weight: 0.7,
      persona: [p.id],
    });
  }

  // -------------------------------------------------------------------------
  // Subdocs: subáreas como entradas individuais ("Cultura organizacional" etc.)
  // -------------------------------------------------------------------------
  for (const a of AREAS) {
    for (const sub of a.subareas) {
      docs.push({
        id: `subarea:${a.id}:${fold(sub).replace(/\s+/g, '-')}`,
        title: sub,
        subtitle: a.name,
        href: `/areas/${a.id}`,
        kind: 'Área',
        tags: TAG_MAP[a.id] || [],
        keywords: mkKeywords(sub, a.name, a.short, a.cluster),
        weight: 0.75,
        persona: personaListFromArea(a.personas),
      });
    }
  }

  // -------------------------------------------------------------------------
  // Subdocs: tópicos de cada MBA como entradas individuais
  // -------------------------------------------------------------------------
  for (const m of MBAS) {
    for (const topic of m.topics) {
      docs.push({
        id: `mba-topic:${m.id}:${fold(topic).replace(/\s+/g, '-')}`,
        title: topic,
        subtitle: m.shortName,
        href: `/mbas#${m.id}`,
        kind: 'MBA',
        tags: TAG_MAP_MBA[m.id] || [],
        keywords: mkKeywords(topic, m.shortName, m.name, 'tema do mba modulo conteudo'),
        weight: 0.85,
        persona: personaListFromMba(m.personas),
      });
    }
  }

  // -------------------------------------------------------------------------
  // Subdocs: glossário · termos por cluster
  // Cada cluster expandido em 6 termos editorialmente relevantes.
  // -------------------------------------------------------------------------
  const GLOSS_TERMS: Record<string, string[]> = {
    regulacao: ['CFP', 'CRP', 'MEC', 'NR-1', 'LGPD', 'Lato sensu vs Stricto sensu'],
    instrumentos: ['WAIS-IV', 'MMPI-2', 'EPDS', 'ADOS-2', 'Beck (BDI)', 'WISC-IV'],
    'metodos-terapeuticos': ['TCC', 'ACT', 'DBT', 'EMDR', 'Mindfulness MBSR', 'Terceira onda'],
    'conceitos-pot': ['Schein · cultura organizacional', 'Edmondson · segurança psicológica', 'JD-R · Job Demands-Resources', 'Job Crafting', 'Engajamento (UWES)', 'Liderança transformacional'],
    'conceitos-neuro': ['Lezak · avaliação neuropsicológica', 'Damásio · marcador somático', 'Plasticidade cerebral', 'Funções executivas', 'Reserva cognitiva', 'Neurodesenvolvimento'],
  };
  for (const c of GLOSSARIO_CLUSTERS) {
    const terms = GLOSS_TERMS[c.id] || [];
    for (const term of terms) {
      docs.push({
        id: `gloss-term:${c.id}:${fold(term).replace(/\s+/g, '-')}`,
        title: term,
        subtitle: c.name,
        href: `/glossario/${c.id}`,
        kind: 'Glossário',
        tags: [c.id],
        keywords: mkKeywords(term, c.name, c.id),
        weight: 0.8,
      });
    }
  }

  // -------------------------------------------------------------------------
  // Subdocs: FAQs originais (5 perguntas curtas da home)
  // -------------------------------------------------------------------------
  for (let i = 0; i < FAQS.length; i++) {
    const f = FAQS[i];
    docs.push({
      id: `faq-home:${i}`,
      title: f.q,
      subtitle: 'Perguntas frequentes',
      href: `/#faq`,
      kind: 'FAQ',
      tags: [],
      keywords: mkKeywords(f.q, f.a),
      weight: 0.9,
    });
  }

  // -------------------------------------------------------------------------
  // Subdocs: comparativos editoriais (1 por área principal)
  // -------------------------------------------------------------------------
  const COMP_PAIRS: { title: string; href: string; kw: string }[] = [
    { title: 'POT vs Psicologia Positiva', href: '/comparativos/pot-vs-positiva', kw: 'comparativo organizacional positiva diferenca' },
    { title: 'Neuropsicologia vs Reabilitação Neuropsicológica', href: '/comparativos/neuro-vs-reabilitacao', kw: 'comparativo neuropsicologia reabilitacao cognitiva diferenca' },
    { title: 'TCC vs ACT', href: '/comparativos/tcc-vs-act', kw: 'comparativo tcc act terceira onda diferenca' },
    { title: 'TCC vs DBT', href: '/comparativos/tcc-vs-dbt', kw: 'comparativo tcc dbt borderline diferenca' },
    { title: 'MBA em POT vs MBA em Liderança Positiva', href: '/comparativos/mba-pot-vs-lideranca', kw: 'comparativo mbas pot lideranca' },
    { title: 'Psicologia Clínica vs Psicologia Organizacional', href: '/comparativos/clinica-vs-pot', kw: 'comparativo clinica pot organizacional carreira' },
    { title: 'Especialização vs MBA', href: '/comparativos/especializacao-vs-mba', kw: 'especializacao mba lato sensu diferenca pos graduacao' },
    { title: 'Mindfulness vs ACT', href: '/comparativos/mindfulness-vs-act', kw: 'mindfulness act terceira onda diferenca' },
  ];
  for (const c of COMP_PAIRS) {
    docs.push({
      id: `comp:${c.href}`,
      title: c.title,
      subtitle: 'Comparativo editorial',
      href: c.href,
      kind: 'Comparativo',
      tags: [],
      keywords: mkKeywords(c.title, c.kw),
      weight: 1.0,
    });
  }

  // -------------------------------------------------------------------------
  // Subdocs: carreira por persona
  // -------------------------------------------------------------------------
  const CARREIRA_DOCS: { title: string; href: string; persona: string; kw: string }[] = [
    { title: 'Transição da clínica para POT', href: '/carreira/transicao-clinica-pot', persona: 'psicologos', kw: 'transicao carreira clinica para pot organizacional mudanca' },
    { title: 'Trilha de carreira em RH com Psicologia', href: '/carreira/rh-com-psicologia', persona: 'rh', kw: 'rh recursos humanos carreira trilha business partner' },
    { title: 'Carreira em Neuropsicologia', href: '/carreira/neuropsicologia', persona: 'psicologos', kw: 'neuropsicologia carreira mercado salario trilha' },
    { title: 'Carreira em Avaliação Psicológica', href: '/carreira/avaliacao-psicologica', persona: 'psicologos', kw: 'avaliacao psicologica carreira psicometria laudos' },
    { title: 'Salário e mercado de Psicologia Organizacional', href: '/carreira/salario-pot', persona: 'rh', kw: 'salario mercado pot organizacional remuneracao' },
    { title: 'Consultoria em saúde mental corporativa', href: '/carreira/consultoria-saude-mental', persona: 'consultores', kw: 'consultoria saude mental corporativa nr1 burnout' },
    { title: 'Carreira em Psicologia Hospitalar', href: '/carreira/hospitalar', persona: 'psicologos', kw: 'hospitalar carreira saude mercado' },
    { title: 'Carreira em ABA e TEA', href: '/carreira/aba-tea', persona: 'psicologos', kw: 'aba tea autismo carreira mercado' },
  ];
  for (const c of CARREIRA_DOCS) {
    docs.push({
      id: `carreira:${c.href}`,
      title: c.title,
      subtitle: 'Carreira',
      href: c.href,
      kind: 'Carreira',
      tags: [],
      keywords: mkKeywords(c.title, c.kw),
      weight: 1.0,
      persona: [c.persona],
    });
  }

  // -------------------------------------------------------------------------
  // Subdocs: recursos editoriais (templates, checklists, ferramentas)
  // -------------------------------------------------------------------------
  const RECURSOS: { title: string; href: string; kw: string }[] = [
    { title: 'Checklist NR-1 para empresas', href: '/recursos/checklist-nr1', kw: 'checklist nr1 nr-1 implementacao empresa rh' },
    { title: 'Modelo de plano de bem-estar', href: '/recursos/plano-bem-estar', kw: 'plano bem-estar template modelo rh empresa' },
    { title: 'Roteiro de entrevista clínica de triagem', href: '/recursos/roteiro-triagem', kw: 'roteiro triagem entrevista clinica psicologo' },
    { title: 'Mapa de instrumentos SATEPSI', href: '/recursos/mapa-satepsi', kw: 'satepsi instrumentos testes psicologicos mapa' },
    { title: 'Glossário express para gestores', href: '/recursos/glossario-gestores', kw: 'glossario gestores lider executivo termos basicos' },
    { title: 'Calendário de saúde mental no trabalho', href: '/recursos/calendario-saude-mental', kw: 'calendario saude mental trabalho campanhas datas' },
    { title: 'Modelo de laudo neuropsicológico', href: '/recursos/modelo-laudo-neuro', kw: 'laudo neuropsicologico modelo template avaliacao' },
    { title: 'Checklist de uso ético de IA em clínica', href: '/recursos/checklist-ia-clinica', kw: 'ia inteligencia artificial clinica etica lgpd checklist' },
  ];
  for (const r of RECURSOS) {
    docs.push({
      id: `recurso:${r.href}`,
      title: r.title,
      subtitle: 'Recurso prático',
      href: r.href,
      kind: 'Recurso',
      tags: [],
      keywords: mkKeywords(r.title, r.kw),
      weight: 0.95,
    });
  }

  _cache = docs;
  return docs;
}

// ---------------------------------------------------------------------------
// Ranking + busca
// ---------------------------------------------------------------------------

function scoreDoc(d: SearchDoc, terms: string[], rawFolded: string): number {
  if (terms.length === 0) return 0;
  const title = fold(d.title);
  const subtitle = fold(d.subtitle || '');
  const tagsFolded = d.tags.join(' ');
  let score = 0;

  // Match na frase completa (mais forte)
  if (rawFolded && title === rawFolded) score += 10;
  if (rawFolded && title.startsWith(rawFolded)) score += 6;
  if (rawFolded && title.includes(rawFolded)) score += 4;

  // Tokens
  for (const t of terms) {
    if (!t) continue;
    if (title === t) score += 10;
    if (title.startsWith(t)) score += 6;
    if (title.includes(t)) score += 4;
    if (subtitle.includes(t)) score += 2;
    if (tagsFolded.includes(t)) score += 3;
    if (d.keywords.includes(t)) score += 1;
  }
  return score * d.weight;
}

export interface SearchOpts {
  kind?: DocKind;
  persona?: string;
  limit?: number;
}

export function search(q: string, opts: SearchOpts = {}): SearchDoc[] {
  const idx = buildIndex();
  const limit = opts.limit ?? 24;
  const rawFolded = fold(q);
  if (!rawFolded) {
    return trending().slice(0, limit);
  }
  const terms = expandQuery(q);
  const scored = idx
    .map(d => ({ d, s: scoreDoc(d, terms, rawFolded) }))
    .filter(x => x.s > 0);

  let filtered = scored;
  if (opts.kind) filtered = filtered.filter(x => x.d.kind === opts.kind);
  if (opts.persona) filtered = filtered.filter(x => !x.d.persona || x.d.persona.includes(opts.persona!));

  return filtered
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(x => x.d);
}

/** Top 12 docs por weight (sem query). Base de "trending" do zero-state. */
export function trending(): SearchDoc[] {
  const idx = buildIndex();
  // Mistura curada: top hubs + MBAs + algumas evidências/guias com peso alto.
  const allowedKinds: DocKind[] = ['MBA', 'Área', 'Guia', 'Evidência', 'Tema', 'Método'];
  return idx
    .filter(d => allowedKinds.includes(d.kind))
    .sort((a, b) => b.weight - a.weight || a.title.localeCompare(b.title))
    .slice(0, 12);
}

/** Top 8 docs com persona casada, exclui hubs muito genéricos. */
export function byPersona(persona: string): SearchDoc[] {
  const idx = buildIndex();
  return idx
    .filter(d => d.persona && d.persona.includes(persona))
    .sort((a, b) => b.weight - a.weight || a.title.localeCompare(b.title))
    .slice(0, 8);
}

/** Lista todos os docs de um tipo, ordenados por weight. */
export function byKind(kind: DocKind): SearchDoc[] {
  const idx = buildIndex();
  return idx
    .filter(d => d.kind === kind)
    .sort((a, b) => b.weight - a.weight || a.title.localeCompare(b.title));
}
