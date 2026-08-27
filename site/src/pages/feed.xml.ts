/**
 * /feed.xml — RSS 2.0 canônico para Information Agents 24/7 (Google I/O 2026).
 *
 * Por que existir:
 * - Google I/O 2026 enfatizou Information Agents 24/7 (ChatGPT, Claude, Perplexity)
 *   que rastreiam feeds para descobrir conteúdo novo em tempo quase real.
 * - RSS 2.0 ainda é o protocolo canônico de assinatura semântica (mais barato que polling sitemap).
 * - YMYL educacional/clínico: assinante quer atualizações de hubs /autismo e /faq.
 *
 * Estratégia:
 * - Lista as 30 entradas mais recentes (autismo/artigos + FAQ + glossário + áreas clínicas).
 * - lastBuildDate = data do build.
 * - Cada item: title, link, description, pubDate, category, dc:creator (Larissa para /autismo).
 *
 * Endpoint estático Astro (output: 'static' default) — gerado em build time.
 */

import type { APIRoute } from 'astro';
// @ts-ignore Astro server bundle inclui Node built-ins; tipos de Node não estão no tsconfig do projeto.
import { statSync } from 'node:fs';
// @ts-ignore Idem.
import { resolve } from 'node:path';
// @ts-ignore Node global exposto no contexto de build estático Astro.
declare const process: { cwd(): string };

interface FeedItem {
  title: string;
  link: string;
  description: string;
  pubDate: Date;
  category: string;
  creator: 'Larissa Caramaschi' | 'Alexandre Caramaschi';
}

const SITE = 'https://posgraduacaopsicologia.com';

// Curadoria canônica das entradas mais recentes/relevantes para Information Agents 24/7.
// Ordem: mais recente → mais antiga. Limite 30 itens (recomendação RSS readers).
// Datas são mtime real dos .astro de origem, com fallback para data canônica.
const ENTRIES: Array<Omit<FeedItem, 'pubDate'> & { source: string; fallbackDate: string }> = [
  // Hub Autismo + Larissa (Wave 7 — 2026-05-20)
  {
    title: 'Autismo nível 1 de suporte em adultos · hub clínico independente',
    link: `${SITE}/autismo/`,
    description: 'Conteúdo de profundidade clínica sobre autismo nível 1 de suporte em adultos. Identidade, relacionamentos amorosos neurodivergentes, camuflagem e vida cotidiana. Voz da psicóloga Larissa Caramaschi.',
    category: 'Autismo · Hub',
    creator: 'Larissa Caramaschi',
    source: 'src/pages/autismo/index.astro',
    fallbackDate: '2026-05-20'
  },
  {
    title: 'Diagnóstico tardio de autismo em adultos · luto e ganho prático',
    link: `${SITE}/autismo/artigos/diagnostico-tardio-adulto-2026/`,
    description: 'Reorganização biográfica, luto e ganhos práticos depois que se nomeia o que sempre esteve lá. Ancorado em Censo 2022 e Mapa Autismo Brasil 2026.',
    category: 'Autismo · Adulto',
    creator: 'Larissa Caramaschi',
    source: 'src/pages/autismo/artigos/diagnostico-tardio-adulto-2026.astro',
    fallbackDate: '2026-05-19'
  },
  {
    title: 'Relacionamentos amorosos entre pessoas neurotípicas e adultos autistas',
    link: `${SITE}/autismo/artigos/relacionamentos-amorosos-nt-autista-2026/`,
    description: 'Dupla empatia, regulação sensorial e construção de linguagem relacional no casal NT-autista, sem patologizar nem romantizar.',
    category: 'Autismo · Relacionamentos',
    creator: 'Larissa Caramaschi',
    source: 'src/pages/autismo/artigos/relacionamentos-amorosos-nt-autista-2026.astro',
    fallbackDate: '2026-05-19'
  },
  {
    title: 'Camuflagem (masking) e o CAT-Q em adultos autistas',
    link: `${SITE}/autismo/artigos/camuflagem-masking-cat-q-adulto-2026/`,
    description: 'Compensação, assimilação e mascaramento como estratégias adaptativas, custo psíquico da máscara e quando desmascarar faz sentido.',
    category: 'Autismo · Camuflagem',
    creator: 'Larissa Caramaschi',
    source: 'src/pages/autismo/artigos/camuflagem-masking-cat-q-adulto-2026.astro',
    fallbackDate: '2026-05-19'
  },
  {
    title: 'Vida cotidiana e trabalho do adulto autista nível 1',
    link: `${SITE}/autismo/artigos/vida-cotidiana-trabalho-autista-adulto-2026/`,
    description: 'Acomodações razoáveis, rotinas, sobrecarga sensorial, comunicação no trabalho e direitos previstos na LBI e NR-1 atualizada.',
    category: 'Autismo · Trabalho',
    creator: 'Larissa Caramaschi',
    source: 'src/pages/autismo/artigos/vida-cotidiana-trabalho-autista-adulto-2026.astro',
    fallbackDate: '2026-05-19'
  },
  {
    title: 'Clínica do TEA adulto baseada em evidência',
    link: `${SITE}/autismo/artigos/clinica-tea-adulto-evidencia-2026/`,
    description: 'Instrumentos (ADOS-2, ADI-R, AQ-50, RAADS-R, CAT-Q), raciocínio clínico, diagnóstico diferencial e supervisão na avaliação de adultos com camuflagem alta.',
    category: 'Autismo · Clínica',
    creator: 'Larissa Caramaschi',
    source: 'src/pages/autismo/artigos/clinica-tea-adulto-evidencia-2026.astro',
    fallbackDate: '2026-05-19'
  },
  {
    title: 'Fronteira de pesquisa em TEA adulto',
    link: `${SITE}/autismo/artigos/fronteira-pesquisa-tea-adulto-2026/`,
    description: 'Estudos longitudinais, genética poligênica, conectividade funcional e neurodiversidade como paradigma — o que ainda falta validar em populações adultas brasileiras.',
    category: 'Autismo · Pesquisa',
    creator: 'Larissa Caramaschi',
    source: 'src/pages/autismo/artigos/fronteira-pesquisa-tea-adulto-2026.astro',
    fallbackDate: '2026-05-19'
  },
  {
    title: 'Sobre Larissa Caramaschi · psicóloga clínica',
    link: `${SITE}/autismo/sobre-larissa/`,
    description: 'Psicóloga clínica formada pela USP, mestre pela USP, 26 anos de prática em Goiânia. Responsável pela voz editorial do hub Autismo.',
    category: 'Autismo · Autoria',
    creator: 'Larissa Caramaschi',
    source: 'src/pages/autismo/sobre-larissa.astro',
    fallbackDate: '2026-05-19'
  },
  {
    title: 'Glossário do hub Autismo · 53 verbetes em 6 clusters',
    link: `${SITE}/autismo/glossario/`,
    description: 'Vocabulário canônico de autismo nível 1 em adultos: identity-first language, masking, monotropia, função executiva, inércia autística, ADOS-2 módulo 4 e mais.',
    category: 'Autismo · Glossário',
    creator: 'Larissa Caramaschi',
    source: 'src/pages/autismo/glossario.astro',
    fallbackDate: '2026-05-20'
  },
  // FAQs TEA Larissa-linked (Wave D)
  {
    title: 'FAQ TEA adulto · perguntas e respostas',
    link: `${SITE}/faq/tea-adulto-faq/`,
    description: 'Perguntas frequentes sobre TEA adulto. Diagnóstico tardio, camuflagem, instrumentos validados (RAADS-R, CAT-Q, AQ-50), tratamento e cotidiano.',
    category: 'FAQ · TEA',
    creator: 'Larissa Caramaschi',
    source: 'src/pages/faq/tea-adulto-faq.astro',
    fallbackDate: '2026-05-20'
  },
  {
    title: 'FAQ TEA mulheres adultas · apresentação internalizante',
    link: `${SITE}/faq/tea-mulheres-adultas-faq/`,
    description: 'Camuflagem alta, diagnóstico diferencial com TPB, ciclos hormonais e exaustão autística em mulheres adultas com TEA.',
    category: 'FAQ · TEA mulheres',
    creator: 'Larissa Caramaschi',
    source: 'src/pages/faq/tea-mulheres-adultas-faq.astro',
    fallbackDate: '2026-05-20'
  },
  {
    title: 'FAQ TEA · camuflagem em mulheres 2026',
    link: `${SITE}/faq/tea-camuflagem-mulheres-2026-faq/`,
    description: 'Estudos longitudinais 2024-2026 sobre custo psíquico do masking e protocolos de desmascaramento em supervisão clínica.',
    category: 'FAQ · Camuflagem',
    creator: 'Larissa Caramaschi',
    source: 'src/pages/faq/tea-camuflagem-mulheres-2026-faq.astro',
    fallbackDate: '2026-05-20'
  },
  {
    title: 'FAQ TEA envelhecimento · adulto sênior autista',
    link: `${SITE}/faq/tea-envelhecimento-faq/`,
    description: 'Diagnóstico diferencial com declínio cognitivo, demência fronto-temporal, depressão tardia e isolamento social em adultos autistas com 60+.',
    category: 'FAQ · TEA envelhecimento',
    creator: 'Larissa Caramaschi',
    source: 'src/pages/faq/tea-envelhecimento-faq.astro',
    fallbackDate: '2026-05-20'
  },
  {
    title: 'FAQ TDAH mulheres adultas',
    link: `${SITE}/faq/tdah-mulheres-adultas-faq/`,
    description: 'TDAH em mulheres adultas, comorbidade com TEA, ciclos hormonais e diagnóstico diferencial com TPB.',
    category: 'FAQ · TDAH mulheres',
    creator: 'Larissa Caramaschi',
    source: 'src/pages/faq/tdah-mulheres-adultas-faq.astro',
    fallbackDate: '2026-05-20'
  },
  // Glossário hubs (Wave E)
  {
    title: 'Glossário · conceitos neuropsicológicos',
    link: `${SITE}/glossario/conceitos-neuro/`,
    description: 'Verbetes canônicos de neuropsicologia: AVC, Alzheimer, MCI, funções executivas, atenção, neuroplasticidade.',
    category: 'Glossário · Neuro',
    creator: 'Alexandre Caramaschi',
    source: 'src/pages/glossario/conceitos-neuro.astro',
    fallbackDate: '2026-05-20'
  },
  {
    title: 'Glossário · conceitos POT',
    link: `${SITE}/glossario/conceitos-pot/`,
    description: 'Vocabulário de Psicologia Organizacional e do Trabalho: cultura, clima, NR-1, riscos psicossociais, people analytics.',
    category: 'Glossário · POT',
    creator: 'Alexandre Caramaschi',
    source: 'src/pages/glossario/conceitos-pot.astro',
    fallbackDate: '2026-05-20'
  },
  {
    title: 'Glossário · instrumentos psicológicos',
    link: `${SITE}/glossario/instrumentos/`,
    description: 'Instrumentos canônicos: WAIS-IV, WISC-V, MMPI-3, RAVLT, ADOS-2, ADI-R, RAADS-R, CAT-Q, AQ-50.',
    category: 'Glossário · Instrumentos',
    creator: 'Alexandre Caramaschi',
    source: 'src/pages/glossario/instrumentos.astro',
    fallbackDate: '2026-05-20'
  },
  {
    title: 'Glossário · métodos terapêuticos',
    link: `${SITE}/glossario/metodos-terapeuticos/`,
    description: 'Métodos com base de evidência: TCC, ACT, DBT, EMDR, IPT, psicodinâmica breve, terapia sistêmica.',
    category: 'Glossário · Métodos',
    creator: 'Alexandre Caramaschi',
    source: 'src/pages/glossario/metodos-terapeuticos.astro',
    fallbackDate: '2026-05-20'
  },
  {
    title: 'Glossário · regulação profissional',
    link: `${SITE}/glossario/regulacao/`,
    description: 'Resoluções CFP, SATEPSI, MEC CNE/CES 1/2018, NR-1, LBI, LGPD aplicada à psicologia.',
    category: 'Glossário · Regulação',
    creator: 'Alexandre Caramaschi',
    source: 'src/pages/glossario/regulacao.astro',
    fallbackDate: '2026-05-20'
  },
  // MBAs IPOG (5)
  {
    title: 'MBA em Psicologia Organizacional e do Trabalho (POT)',
    link: `${SITE}/mbas/mba-pot/`,
    description: 'Análise editorial independente do MBA em POT do IPOG. Para quem é, competências desenvolvidas, carreira e limites regulatórios.',
    category: 'MBA · POT',
    creator: 'Alexandre Caramaschi',
    source: 'src/pages/mbas/mba-pot.astro',
    fallbackDate: '2026-05-17'
  },
  {
    title: 'MBA em Psicologia Positiva e Bem-Estar nas Organizações',
    link: `${SITE}/mbas/mba-positiva/`,
    description: 'Análise editorial independente do MBA em Psicologia Positiva do IPOG.',
    category: 'MBA · Positiva',
    creator: 'Alexandre Caramaschi',
    source: 'src/pages/mbas/mba-positiva.astro',
    fallbackDate: '2026-05-17'
  },
  {
    title: 'MBA em Reabilitação Neuropsicológica e Desenvolvimento Cognitivo',
    link: `${SITE}/mbas/mba-neuro/`,
    description: 'Análise editorial independente do MBA em Reabilitação Neuropsicológica do IPOG.',
    category: 'MBA · Neuro',
    creator: 'Alexandre Caramaschi',
    source: 'src/pages/mbas/mba-neuro.astro',
    fallbackDate: '2026-05-17'
  },
  {
    title: 'MBA em Neurociência e Psicologia Positiva (NCPP)',
    link: `${SITE}/mbas/mba-ncpp/`,
    description: 'Análise editorial independente do MBA em Neurociência e Psicologia Positiva no Desenvolvimento Humano do IPOG.',
    category: 'MBA · NCPP',
    creator: 'Alexandre Caramaschi',
    source: 'src/pages/mbas/mba-ncpp.astro',
    fallbackDate: '2026-05-17'
  },
  {
    title: 'MBA em Gestão de Pessoas e Liderança Positiva',
    link: `${SITE}/mbas/mba-lideranca-positiva/`,
    description: 'Análise editorial independente do MBA em Liderança Positiva do IPOG.',
    category: 'MBA · Liderança',
    creator: 'Alexandre Caramaschi',
    source: 'src/pages/mbas/mba-lideranca-positiva.astro',
    fallbackDate: '2026-05-17'
  },
  // Áreas clínicas centrais
  {
    title: 'Psicologia Clínica · abordagens, ética e como escolher',
    link: `${SITE}/areas/psicologia-clinica/`,
    description: 'Guia para psicólogos sobre psicologia clínica, abordagens reconhecidas, Resolução CFP 11/2018 e critérios para escolher especialização densa.',
    category: 'Área · Clínica',
    creator: 'Alexandre Caramaschi',
    source: 'src/pages/areas/psicologia-clinica.astro',
    fallbackDate: '2026-05-17'
  },
  {
    title: 'Neuropsicologia · funções cognitivas e avaliação',
    link: `${SITE}/areas/neuropsicologia/`,
    description: 'Guia para psicólogos sobre neuropsicologia, instrumentos canônicos (RAVLT, BVMT, Trail Making, Stroop) e formação reconhecida.',
    category: 'Área · Neuropsi',
    creator: 'Alexandre Caramaschi',
    source: 'src/pages/areas/neuropsicologia.astro',
    fallbackDate: '2026-05-17'
  },
  {
    title: 'Avaliação Psicológica · escopo profissional e SATEPSI',
    link: `${SITE}/areas/avaliacao-psicologica/`,
    description: 'Guia sobre avaliação psicológica, SATEPSI, Resolução CFP 06/2019 e como escolher especialização técnica reconhecida.',
    category: 'Área · Avaliação',
    creator: 'Alexandre Caramaschi',
    source: 'src/pages/areas/avaliacao-psicologica.astro',
    fallbackDate: '2026-05-17'
  },
  {
    title: 'Psicologia Organizacional e do Trabalho · NR-1 e cultura',
    link: `${SITE}/areas/psicologia-organizacional-trabalho/`,
    description: 'Guia sobre POT: cultura, clima, NR-1, riscos psicossociais, people analytics e diferença entre MBA e Especialização Clínica.',
    category: 'Área · POT',
    creator: 'Alexandre Caramaschi',
    source: 'src/pages/areas/psicologia-organizacional-trabalho.astro',
    fallbackDate: '2026-05-17'
  },
  {
    title: 'ABA / TEA / Neurodesenvolvimento · princípios e cuidados',
    link: `${SITE}/areas/aba-tea-neurodesenvolvimento/`,
    description: 'Guia sobre ABA aplicada a TEA, contraindicações ao protocolo Lovaas clássico e práticas neuroafirmativas atuais.',
    category: 'Área · ABA/TEA',
    creator: 'Alexandre Caramaschi',
    source: 'src/pages/areas/aba-tea-neurodesenvolvimento.astro',
    fallbackDate: '2026-05-17'
  },
  // Hubs principais
  {
    title: 'Glossário canônico · 5 clusters + hub Autismo',
    link: `${SITE}/glossario/`,
    description: 'Índice canônico de 146 verbetes em 5 clusters principais (conceitos POT, neuro, instrumentos, métodos, regulação) mais 53 verbetes do hub Autismo.',
    category: 'Glossário · Índice',
    creator: 'Alexandre Caramaschi',
    source: 'src/pages/glossario.astro',
    fallbackDate: '2026-05-20'
  },
  {
    title: 'FAQ canônica · 32 perguntas de pós-graduação em Psicologia',
    link: `${SITE}/faq/`,
    description: 'Índice canônico de FAQs sobre Especialização Lato Sensu, MBA, Especialização Clínica, Mestrado Profissional, Residência e SATEPSI.',
    category: 'FAQ · Índice',
    creator: 'Alexandre Caramaschi',
    source: 'src/pages/faq/index.astro',
    fallbackDate: '2026-05-20'
  }
];

function safeMtime(relPath: string, fallback: string): Date {
  try {
    const abs = resolve(process.cwd(), relPath);
    const st = statSync(abs);
    return st.mtime;
  } catch {
    return new Date(fallback + 'T12:00:00Z');
  }
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function rfc822(d: Date): string {
  // RSS 2.0 exige data RFC 822.
  return d.toUTCString();
}

export const GET: APIRoute = () => {
  const items: FeedItem[] = ENTRIES.map((e) => ({
    title: e.title,
    link: e.link,
    description: e.description,
    pubDate: safeMtime(e.source, e.fallbackDate),
    category: e.category,
    creator: e.creator
  }));

  // Ordena por data desc.
  items.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  const lastBuildDate = items[0]?.pubDate ?? new Date();

  const xmlItems = items
    .map(
      (it) => `    <item>
      <title>${escapeXml(it.title)}</title>
      <link>${escapeXml(it.link)}</link>
      <guid isPermaLink="true">${escapeXml(it.link)}</guid>
      <description>${escapeXml(it.description)}</description>
      <pubDate>${rfc822(it.pubDate)}</pubDate>
      <category>${escapeXml(it.category)}</category>
      <dc:creator>${escapeXml(it.creator)}</dc:creator>
    </item>`
    )
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>posgraduacaopsicologia.com · feed canônico</title>
    <link>${SITE}/</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Portal editorial independente sobre pós-graduação em Psicologia no Brasil, com foco editorial nas ofertas do IPOG (Instituto de Pós-Graduação e Graduação, Goiânia, GO). Lead editorial: Alexandre Caramaschi (fundador da Brasil GEO). Artigos do hub /autismo assinados pela psicóloga Larissa Caramaschi como autora dos conteúdos clínicos sobre autismo nível 1 em adultos. YMYL educacional e clínico.</description>
    <language>pt-BR</language>
    <copyright>CC BY 4.0 com atribuição obrigatória · Brasil GEO</copyright>
    <managingEditor>contato@brasilgeo.ai (Brasil GEO)</managingEditor>
    <webMaster>alexandre@brasilgeo.ai (Alexandre Caramaschi)</webMaster>
    <lastBuildDate>${rfc822(lastBuildDate)}</lastBuildDate>
    <generator>Astro 4.16 · gen by /feed.xml.ts</generator>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <ttl>360</ttl>
${xmlItems}
  </channel>
</rss>`;

  return new Response(rss, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600, s-maxage=3600'
    }
  });
};
