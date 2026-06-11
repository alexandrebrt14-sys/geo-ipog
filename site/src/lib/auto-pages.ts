// AUTO-GERADO por scripts/gen-search-pages.mjs — NAO EDITAR MANUALMENTE.
// Para regenerar: `npm run gen:search-pages` ou `npm run build`.
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

export const AUTO_PAGES: AutoPage[] = [
  {
    "route": "/",
    "title": "Pós-graduação em Psicologia, guia editorial independente para escolher MBA, Especialização Lato Sensu, Mestrado Profissional, Especialização Clínica e Residência",
    "description": "Portal editorial independente sobre pós-graduação em Psicologia no Brasil, com foco nas ofertas e na curadoria do IPOG (Instituto de Pós-Graduação e Graduação). Cobre as cinco modalidades canônicas (Especialização Lato Sensu, MBA, Mestrado Profissional, Especialização Clínica certificada e Residência Multiprofissional), os cinco MBAs do IPOG em Psicologia, 18 áreas mapeadas (CFP e correlatas), comparativos regulatórios CFP, MEC, CAPES, NR-1, SATEPSI, LBI, LGPD.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "recurso"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/areas",
    "title": "Áreas da Psicologia — 18 áreas mapeadas (CFP + correlatas)",
    "description": "Explore as 13 especialidades reconhecidas pelo CFP e áreas correlatas estrategicas para carreira em Psicologia.",
    "kind": "Área",
    "persona": null,
    "tags": [
      "areas",
      "área"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/areas/aba-tea-neurodesenvolvimento",
    "title": "ABA, TEA e Neurodesenvolvimento: o que é, evidência e formação no Brasil",
    "description": "Guia técnico sobre Análise do Comportamento Aplicada (ABA), transtorno do espectro autista (TEA), neurodesenvolvimento, intervenção precoce e como escolher uma especialização.",
    "kind": "Área",
    "persona": null,
    "tags": [
      "areas",
      "aba",
      "tea",
      "neurodesenvolvimento",
      "área"
    ],
    "weight": 1.1,
    "pageType": null
  },
  {
    "route": "/areas/avaliacao-psicologica",
    "title": "Avaliação Psicológica: o que é, escopo profissional e formação reconhecida",
    "description": "Guia para psicólogos sobre o escopo da avaliação psicológica, regulamentação do CFP, SATEPSI e como escolher uma especialização técnica reconhecida no Brasil.",
    "kind": "Área",
    "persona": null,
    "tags": [
      "areas",
      "avaliacao",
      "psicologica",
      "área"
    ],
    "weight": 1.1,
    "pageType": null
  },
  {
    "route": "/areas/ia-people-analytics-psicologia-digital",
    "title": "IA, People Analytics e Psicologia Digital: pós aplicada ao RH",
    "description": "Análise técnica de IA aplicada a RH, people analytics, ética LGPD e viés algorítmico. Como integrar psicologia no centro da decisão automatizada.",
    "kind": "Área",
    "persona": null,
    "tags": [
      "areas",
      "people",
      "analytics",
      "psicologia",
      "digital",
      "área"
    ],
    "weight": 1.1,
    "pageType": null
  },
  {
    "route": "/areas/neuropsicologia",
    "title": "Neuropsicologia: o que é, escopo profissional e formação especializada",
    "description": "Guia para psicólogos sobre o escopo da neuropsicologia, avaliação de funções cognitivas, regulamentação do CFP e como escolher uma especialização densa e reconhecida.",
    "kind": "Área",
    "persona": null,
    "tags": [
      "areas",
      "neuropsicologia",
      "área"
    ],
    "weight": 1.1,
    "pageType": null
  },
  {
    "route": "/areas/psicologia-clinica",
    "title": "Psicologia Clínica: abordagens, ética e como escolher uma especialização",
    "description": "Guia para psicólogos sobre psicologia clínica, abordagens reconhecidas, regulamentação do CFP, ética profissional e critérios para escolher uma especialização densa.",
    "kind": "Área",
    "persona": null,
    "tags": [
      "areas",
      "psicologia",
      "clinica",
      "área"
    ],
    "weight": 1.1,
    "pageType": null
  },
  {
    "route": "/areas/psicologia-escolar-educacional",
    "title": "Psicologia Escolar e Educacional: a maior alavanca está no currículo",
    "description": "Guia técnico de Psicologia Escolar e Educacional: Lei 13.935, atuação institucional, níveis de intervenção e como escolher pós aplicada.",
    "kind": "Área",
    "persona": null,
    "tags": [
      "areas",
      "psicologia",
      "escolar",
      "educacional",
      "área"
    ],
    "weight": 1.1,
    "pageType": null
  },
  {
    "route": "/areas/psicologia-esporte",
    "title": "Psicologia do Esporte: alta performance, ansiedade competitiva e pós aplicada",
    "description": "Guia técnico de Psicologia do Esporte: alta performance, motivação, ansiedade competitiva, equipes, COB/CPB, mensuração e pós-graduação. Especialidade reconhecida pelo CFP.",
    "kind": "Área",
    "persona": null,
    "tags": [
      "areas",
      "psicologia",
      "esporte",
      "área"
    ],
    "weight": 1.1,
    "pageType": null
  },
  {
    "route": "/areas/psicologia-hospitalar",
    "title": "Psicologia Hospitalar: UTI, oncologia, cuidados paliativos e pós aplicada",
    "description": "Guia técnico de Psicologia Hospitalar: atuação em UTI, oncologia, transplantes, cuidados paliativos, comunicação difícil, humanização e como escolher uma pós-graduação. Resolução CFP 09/2018.",
    "kind": "Área",
    "persona": null,
    "tags": [
      "areas",
      "psicologia",
      "hospitalar",
      "área"
    ],
    "weight": 1.1,
    "pageType": null
  },
  {
    "route": "/areas/psicologia-juridica-forense",
    "title": "Psicologia Jurídica e Forense: perícia, documentos psicológicos e formação",
    "description": "Guia para psicólogos sobre psicologia jurídica e forense, perícia, documentos psicológicos, Resolução CFP 06/2019, escuta especializada e como escolher uma especialização.",
    "kind": "Área",
    "persona": null,
    "tags": [
      "areas",
      "psicologia",
      "juridica",
      "forense",
      "área"
    ],
    "weight": 1.1,
    "pageType": null
  },
  {
    "route": "/areas/psicologia-organizacional-trabalho",
    "title": "Psicologia Organizacional e do Trabalho (POT): cultura, NR-1 e pós aplicada",
    "description": "Guia técnico de POT: cultura, liderança, NR-1 e riscos psicossociais, people analytics e como escolher uma pós-graduação aplicada. Conteúdo independente, fontes oficiais.",
    "kind": "Área",
    "persona": null,
    "tags": [
      "areas",
      "psicologia",
      "organizacional",
      "trabalho",
      "área"
    ],
    "weight": 1.1,
    "pageType": null
  },
  {
    "route": "/areas/psicologia-positiva",
    "title": "Psicologia Positiva: PERMA, ciência do florescimento e pós aplicada",
    "description": "Guia técnico de Psicologia Positiva: modelo PERMA, forças pessoais, segurança psicológica e aplicação organizacional. Conteúdo independente, base científica.",
    "kind": "Área",
    "persona": null,
    "tags": [
      "areas",
      "psicologia",
      "positiva",
      "área"
    ],
    "weight": 1.1,
    "pageType": null
  },
  {
    "route": "/areas/psicologia-saude",
    "title": "Psicologia em Saúde: SUS, atenção primária e pós aplicada",
    "description": "Guia técnico de Psicologia em Saúde: SUS, atenção primária, apoio matricial, saúde coletiva, equipe multiprofissional e como escolher uma pós-graduação. PNAB 2017, CFP, RAPS.",
    "kind": "Área",
    "persona": null,
    "tags": [
      "areas",
      "psicologia",
      "saude",
      "área"
    ],
    "weight": 1.1,
    "pageType": null
  },
  {
    "route": "/areas/psicologia-social",
    "title": "Psicologia Social: campo, métodos e atuação em políticas públicas",
    "description": "Guia técnico de Psicologia Social: leitura do grupo, métodos, atuação em CRAS, CREAS e gestão pública. Conteúdo independente, base científica.",
    "kind": "Área",
    "persona": null,
    "tags": [
      "areas",
      "psicologia",
      "social",
      "área"
    ],
    "weight": 1.1,
    "pageType": null
  },
  {
    "route": "/areas/psicologia-transito-trafego",
    "title": "Psicologia de Trânsito e Tráfego: avaliação CNH, DETRAN e pós aplicada",
    "description": "Guia técnico de Psicologia do Trânsito: avaliação CNH, DETRAN, CONTRAN, Resoluções CFP 07/2009 e 425/2012, perícia, segurança viária e pós-graduação para credenciamento.",
    "kind": "Área",
    "persona": null,
    "tags": [
      "areas",
      "psicologia",
      "transito",
      "trafego",
      "área"
    ],
    "weight": 1.1,
    "pageType": null
  },
  {
    "route": "/areas/psicomotricidade",
    "title": "Psicomotricidade: corpo, movimento e desenvolvimento — pós interdisciplinar",
    "description": "Guia técnico de Psicomotricidade: campo interdisciplinar, vertentes educativa, reeducativa e terapêutica, desenvolvimento psicomotor, populações e contextos. Referência SBP, MEC.",
    "kind": "Área",
    "persona": null,
    "tags": [
      "areas",
      "psicomotricidade",
      "área"
    ],
    "weight": 1.1,
    "pageType": null
  },
  {
    "route": "/areas/psicopedagogia",
    "title": "Psicopedagogia: aprendizagem, dificuldades escolares e pós interdisciplinar",
    "description": "Guia técnico de Psicopedagogia: campo interdisciplinar, atuação institucional e clínica, instrumentos, dificuldades e transtornos de aprendizagem. Referência ABPp, CFP, MEC.",
    "kind": "Área",
    "persona": null,
    "tags": [
      "areas",
      "psicopedagogia",
      "área"
    ],
    "weight": 1.1,
    "pageType": null
  },
  {
    "route": "/areas/reabilitacao-neuropsicologica",
    "title": "Reabilitação Neuropsicológica: o que é, abordagens e formação reconhecida",
    "description": "Guia para psicólogos sobre reabilitação neuropsicológica, planos de intervenção cognitiva, neuroplasticidade, AVC, TCE e demências, com critérios de escolha de especialização.",
    "kind": "Área",
    "persona": null,
    "tags": [
      "areas",
      "reabilitacao",
      "neuropsicologica",
      "área"
    ],
    "weight": 1.1,
    "pageType": null
  },
  {
    "route": "/areas/saude-mental-organizacoes",
    "title": "Saúde Mental nas Organizações: NR-1, burnout e o que funciona",
    "description": "Guia técnico de saúde mental corporativa: NR-1, modelo de Maslach, níveis de intervenção e o que distingue programa estruturado de selo cosmético.",
    "kind": "Área",
    "persona": null,
    "tags": [
      "areas",
      "saude",
      "mental",
      "organizacoes",
      "área"
    ],
    "weight": 1.1,
    "pageType": null
  },
  {
    "route": "/autismo",
    "title": "Autismo nível 1 de suporte em adultos: portal clínico independente com Larissa Caramaschi",
    "description": "Conteúdo de profundidade clínica sobre autismo nível 1 de suporte em adultos, com foco em identidade, relacionamentos amorosos neurodivergentes e vida cotidiana. Voz da psicóloga clínica Larissa Caramaschi, com vocabulário identity-first, respeito à comunidade autista adulta e rigor de evidência.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "autismo",
      "recurso"
    ],
    "weight": 1,
    "pageType": "website"
  },
  {
    "route": "/autismo/artigos/camuflagem-masking-cat-q-adulto-2026",
    "title": "{titulo}",
    "description": "Material educativo para adultos com autismo nível 1 de suporte e profissionais que os acompanham. Aborda o conceito de camuflagem social, as três dimensões do CAT-Q (compensação, mascaramento, assimilação), por que mulheres adultas chegam tarde ao diagnóstico, os custos invisíveis em saúde mental e o que costuma mudar em terapia adaptada para o adulto autista.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "autismo",
      "artigos",
      "camuflagem",
      "masking",
      "cat",
      "adulto",
      "2026",
      "recurso"
    ],
    "weight": 0.8,
    "pageType": "article"
  },
  {
    "route": "/autismo/artigos/clinica-tea-adulto-evidencia-2026",
    "title": "{titulo}",
    "description": "Guia técnico para psicólogos clínicos sobre avaliação diagnóstica, adaptação do enquadre, instrumentos (AQ-50, RAADS-R, ADOS-2, ADI-R, CAT-Q, AAA), TCC adaptada, terapia familiar sistêmica, dupla empatia e intervenções neuroafirmativas no acompanhamento de adultos autistas nível 1 de suporte.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "autismo",
      "artigos",
      "clinica",
      "tea",
      "adulto",
      "evidencia",
      "2026",
      "recurso"
    ],
    "weight": 0.8,
    "pageType": "article"
  },
  {
    "route": "/autismo/artigos/diagnostico-tardio-adulto-2026",
    "title": "{titulo}",
    "description": "Adultos brasileiros que recebem diagnóstico de TEA nível 1 nos últimos 24 meses enfrentam reorganização biográfica, luto e ganhos práticos. Mapa do que muda na clínica, no trabalho e nas relações, ancorado em Censo 2022, Mapa Autismo Brasil 2026 e literatura sobre camuflagem (Hull, Lai, Mandy).",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "autismo",
      "artigos",
      "diagnostico",
      "tardio",
      "adulto",
      "2026",
      "recurso"
    ],
    "weight": 0.8,
    "pageType": "article"
  },
  {
    "route": "/autismo/artigos/fronteira-pesquisa-tea-adulto-2026",
    "title": "{titulo}",
    "description": "Revisão crítica para pesquisadores em autismo nível 1 em adultos: debate paradigmático medical model vs neurodiversidade, double empathy problem (Milton, 2012; Bottema-Beutel et al., 2021), default mode network, biomarcadores plasmáticos, neurofeedback, intervenções psicossociais com evidência, grupos brasileiros e gaps de pesquisa para pós-graduandos.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "autismo",
      "artigos",
      "fronteira",
      "pesquisa",
      "tea",
      "adulto",
      "2026",
      "recurso"
    ],
    "weight": 0.8,
    "pageType": "article"
  },
  {
    "route": "/autismo/artigos/relacionamentos-amorosos-nt-autista-2026",
    "title": "{titulo}",
    "description": "Em casais em que um parceiro é neurotípico e o outro é adulto autista nível 1 de suporte, a maioria das brigas crônicas não vem de falta de amor, mas de diferenças invisíveis de processamento. Como ler a relação pela lente da dupla empatia, do apego adulto, da camuflagem em contexto íntimo e da Terapia Familiar Sistêmica.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "autismo",
      "artigos",
      "relacionamentos",
      "amorosos",
      "autista",
      "2026",
      "recurso"
    ],
    "weight": 0.8,
    "pageType": "article"
  },
  {
    "route": "/autismo/artigos/vida-cotidiana-trabalho-autista-adulto-2026",
    "title": "{titulo}",
    "description": "O que protege e o que adoece a vida laboral de adultos autistas nível 1 de suporte: autistic burnout como fenômeno qualitativamente distinto, sobrecarga sensorial em escritórios abertos, remotos e híbridos, meltdown e shutdown, stim adulto, hiperfoco, acomodações razoáveis pela CLT e pela NR-1, vigilância no trabalho e estratégias práticas de regulação energética e sensorial.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "autismo",
      "artigos",
      "vida",
      "cotidiana",
      "trabalho",
      "autista",
      "adulto",
      "2026",
      "recurso"
    ],
    "weight": 0.8,
    "pageType": "article"
  },
  {
    "route": "/autismo/glossario",
    "title": "Glossário de autismo nível 1 em adultos, vocabulário técnico, ético e atualizado em 2026",
    "description": "Cinquenta verbetes essenciais sobre autismo nível 1 de suporte em adultos, do diagnóstico tardio à dupla empatia, da camuflagem ao apego, com vocabulário identity-first e definições operacionais para pacientes, profissionais e pesquisadores.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "autismo",
      "glossario",
      "recurso"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/autismo/para-pacientes",
    "title": "Autismo nível 1 em adultos para pacientes e famílias: leitura clínica acessível com Larissa Caramaschi",
    "description": "Conteúdo para adultos autistas nível 1 de suporte, parceiros, pais, irmãos e amigos que querem entender diagnóstico tardio, camuflagem, vida amorosa neurodivergente e acomodações no trabalho, em vocabulário identity-first e com rigor clínico.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "autismo",
      "para",
      "pacientes",
      "recurso"
    ],
    "weight": 0.8,
    "pageType": "website"
  },
  {
    "route": "/autismo/para-pesquisadores",
    "title": "Autismo nível 1 em adultos para pesquisadores, fronteira metodológica e lacunas brasileiras",
    "description": "Conteúdo para pesquisadoras e pesquisadores em psicologia, neurociências, psiquiatria e estudos da neurodiversidade: fronteira de pesquisa em TEA adulto, validação cruzada de instrumentos como CAT-Q e RAADS-R, lacunas em amostras brasileiras e diálogo entre paradigma médico e paradigma da neurodiversidade.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "autismo",
      "para",
      "pesquisadores",
      "recurso"
    ],
    "weight": 0.8,
    "pageType": "website"
  },
  {
    "route": "/autismo/para-profissionais",
    "title": "Autismo nível 1 em adultos para profissionais de psicologia, conteúdo técnico com Larissa Caramaschi",
    "description": "Material clínico sobre autismo nível 1 de suporte em adultos para psicólogas, psicólogos, neuropsicólogos e profissionais da saúde mental: instrumentos validados, raciocínio diferencial, escuta de apresentações internalizantes, supervisão de casos com camuflagem alta e compliance CFP.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "autismo",
      "para",
      "profissionais",
      "recurso"
    ],
    "weight": 0.8,
    "pageType": "website"
  },
  {
    "route": "/autismo/sobre-larissa",
    "title": "Larissa Caramaschi, psicóloga clínica em Goiânia, autoridade em autismo nível 1 de suporte em adultos",
    "description": "Psicóloga clínica em Goiânia, mestre em Psicologia pela USP, com 26 anos de prática em psicoterapia individual, familiar e de casal. Lente clínica atual em autismo nível 1 de suporte em adultos, relacionamentos amorosos e dinâmicas familiares neurodivergentes.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "autismo",
      "sobre",
      "larissa",
      "recurso"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/benchmarks-brasil-geo-2026",
    "title": "Benchmarks de GEO no Brasil — onde estamos em maio de 2026 | Brasil GEO",
    "description": "Por que importar baseline americano de mention rate é importação cega — e como Brasil GEO está construindo o primeiro baseline de referência pt-BR para educação superior em 2026.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "benchmarks",
      "brasil",
      "geo",
      "2026",
      "recurso"
    ],
    "weight": 1,
    "pageType": "article"
  },
  {
    "route": "/carreira",
    "title": "Carreira em Psicologia aplicada — trajetórias por área de atuação",
    "description": "Mapa das seis carreiras mais demandadas em Psicologia aplicada. Faixa salarial, progressão típica e MBA que combina com cada trilha.",
    "kind": "Carreira",
    "persona": null,
    "tags": [
      "carreira"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/carreira/avaliacao-psicologica",
    "title": "Carreira em Avaliação Psicológica — SATEPSI, laudo e ética regulatória",
    "description": "A trilha mais sensível a ética e contexto. Quem confunde regra com técnica vira processo. Quem domina o conjunto define o padrão da praça. Progressão e formação.",
    "kind": "Carreira",
    "persona": null,
    "tags": [
      "carreira",
      "avaliacao",
      "psicologica"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/carreira/consultoria-organizacional",
    "title": "Carreira em Consultoria Organizacional — framework, vendas e marca pessoal",
    "description": "A trilha de saída do CLT que mais falha. Sem retaguarda teórica, o consultor vende workshop. Com método, escala. Progressão típica e MBA combinado.",
    "kind": "Carreira",
    "persona": "consultores",
    "tags": [
      "carreira",
      "consultoria",
      "organizacional"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/carreira/neuropsicologia",
    "title": "Carreira em Neuropsicologia — formação, progressão e MBA combinado",
    "description": "Trilha técnica mais regulada da Psicologia aplicada. Avaliação neuropsicológica, laudo, integração com equipe médica. Progressão típica e MBA do IPOG.",
    "kind": "Carreira",
    "persona": null,
    "tags": [
      "carreira",
      "neuropsicologia"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/carreira/pericia-psicologica",
    "title": "Carreira em Perícia Psicológica — contraditório, audiência e laudo defensável",
    "description": "A trilha forense que exige tolerância a contraditório jurídico. Quem não suporta defesa pública, sofre. Quem domina, vira referência regional. Progressão e formação.",
    "kind": "Carreira",
    "persona": null,
    "tags": [
      "carreira",
      "pericia",
      "psicologica"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/carreira/psicologia-organizacional",
    "title": "Carreira em Psicologia Organizacional — do analista de R&S ao VP de Pessoas",
    "description": "Trilha POT mapeada: progressão de júnior a sênior, faixa salarial, competências e MBA combinado. Por que ler sistema antes de indivíduo decide o teto da carreira.",
    "kind": "Carreira",
    "persona": null,
    "tags": [
      "carreira",
      "psicologia",
      "organizacional"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/carreira/saude-mental-corporativa",
    "title": "Carreira em saúde mental corporativa — NR-1, prevenção e desenho de sistema",
    "description": "A trilha nascida da NR-1 e da agenda ESG. Não é clínica em escritório — é desenho de sistema de prevenção em escala. Progressão típica e MBA combinado.",
    "kind": "Carreira",
    "persona": null,
    "tags": [
      "carreira",
      "saude",
      "mental",
      "corporativa"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/casos",
    "title": "Estudos de caso compostos em Psicologia aplicada · POT, Positiva, Reabilitação, Liderança, ABA",
    "description": "Cinco casos compostos HBR-grade em Psicologia aplicada no Brasil: NR-1 em fábrica, burnout em fintech, reabilitação pós-AVC, liderança em scale-up SaaS e ABA em rede escolar.",
    "kind": "Caso",
    "persona": null,
    "tags": [
      "casos",
      "caso"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/casos/aba-rede-escolar",
    "title": "Caso composto · ABA em rede escolar particular com 60 alunos com TEA",
    "description": "Estudo de caso composto em ABA e inclusão escolar: rede bilíngue 5 unidades, 60 alunos com TEA, formação certificada de educadores, ajustes razoáveis sob LBI.",
    "kind": "Caso",
    "persona": null,
    "tags": [
      "casos",
      "aba",
      "rede",
      "escolar",
      "caso"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/casos/ceara-81-polos-ead-pos-graduacao",
    "title": "Caso Ceará 81 polos EAD · capilaridade como moat regulatório em pós-graduação",
    "description": "A meta de 81 polos UAB no Ceará tornou-se referência regional para pós-graduação EAD. Análise do Decreto 12.456/2025, Portaria MEC 381/2025 e por que credenciamento de polo virou barreira de entrada estrutural.",
    "kind": "Caso",
    "persona": null,
    "tags": [
      "casos",
      "ceara",
      "polos",
      "ead",
      "pos",
      "graduacao",
      "caso"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/casos/lideranca-positiva-startup-escalando",
    "title": "Caso composto · Liderança Positiva em scale-up SaaS de 80 para 350 colaboradores",
    "description": "Estudo de caso composto em Liderança Positiva: SaaS B2B brasileira em Série C, mentoria ao CEO, transformação cultural e retenção de C-level em 18 meses.",
    "kind": "Caso",
    "persona": "lideres",
    "tags": [
      "casos",
      "lideranca",
      "positiva",
      "startup",
      "escalando",
      "caso"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/casos/positiva-burnout-fintech",
    "title": "Caso composto · Psicologia Positiva contra burnout em fintech Série B",
    "description": "Estudo de caso composto em Psicologia Positiva: fintech em São Paulo, 320 pessoas, Job Crafting, segurança psicológica, PERMA-Profiler e queda em pedidos de afastamento.",
    "kind": "Caso",
    "persona": null,
    "tags": [
      "casos",
      "positiva",
      "burnout",
      "fintech",
      "caso"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/casos/pot-fabrica-nr1",
    "title": "Caso composto · POT em fábrica de autopeças implementando a NR-1",
    "description": "Estudo de caso composto: fábrica do ABC paulista, 1.240 colaboradores, NR-1, diagnóstico de cultura defensiva, plano 90/180 dias e queda em afastamentos por transtorno mental.",
    "kind": "Caso",
    "persona": null,
    "tags": [
      "casos",
      "pot",
      "fabrica",
      "nr1",
      "caso"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/casos/reabilitacao-pos-avc",
    "title": "Caso composto · Reabilitação neuropsicológica de executivo pós-AVC isquêmico",
    "description": "Estudo de caso composto em Reabilitação Neuropsicológica: executivo de 55 anos, AVC isquêmico, programa 12 meses, retorno parcial ao trabalho com escopo redesenhado.",
    "kind": "Caso",
    "persona": null,
    "tags": [
      "casos",
      "reabilitacao",
      "pos",
      "avc",
      "caso"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/comparativos",
    "title": "Comparativos — quando dois caminhos parecem o mesmo (e não são).",
    "description": "",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "comparativo"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/comparativos/aba-vs-denver-tea-precoce",
    "title": "ABA tradicional vs Modelo Denver (ESDM) para TEA precoce",
    "description": "Comparativo independente entre ABA (Lovaas) e ESDM (Dawson & Rogers) em TEA precoce. Mecanismo, evidência por faixa etária, perfil de criança e decisão clínica.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "aba",
      "denver",
      "tea",
      "precoce",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/act-vs-tcc",
    "title": "ACT vs TCC: comparativo entre Aceitação e Compromisso e Cognitivo-Comportamental",
    "description": "Comparativo independente entre ACT e TCC em Psicologia clínica. Mecanismo de ação, evidência por condição, perfil ideal de paciente, decisão clínica.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "act",
      "tcc",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/antipsicotico-vs-intervencao-psicossocial-pos-crise",
    "title": "Antipsicótico vs psicossocial após primeiro episódio: RAISE-ETP, baixa dose e Birchwood",
    "description": "Comparativo independente entre monoterapia farmacológica e tratamento combinado pós-primeiro episódio psicótico. Evidência RAISE-ETP/NAVIGATE de Kane (2016), Family Intervention de Birchwood e perfil clínico.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "antipsicotico",
      "intervencao",
      "psicossocial",
      "pos",
      "crise",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/avaliacao-presencial-vs-remota",
    "title": "Avaliação psicológica presencial vs remota: regulamentação CFP e técnica",
    "description": "Comparativo independente entre avaliação psicológica presencial e por telessaúde. Resolução CFP 11/2018, SATEPSI, equivalência psicométrica e indicação por perfil.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "avaliacao",
      "presencial",
      "remota",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/bat-vs-mbi-burnout",
    "title": "BAT vs MBI em burnout: comparativo entre Schaufeli (2020) e Maslach (1996)",
    "description": "Comparativo técnico entre Burnout Assessment Tool (Schaufeli, Desart & De Witte, 2020) e Maslach Burnout Inventory (Maslach et al., 1996). Base teórica, propriedades psicométricas e cenários de uso em clínica, NR-1 e pesquisa.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "bat",
      "mbi",
      "burnout",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/brasil-vs-portugal-pos-psi",
    "title": "Pós em Psicologia: Brasil vs Portugal — regulação, mercado e reciprocidade",
    "description": "Comparativo independente entre pós-graduação em Psicologia no Brasil e em Portugal. CFP vs OPP, Tratado de Reciprocidade, mercado, custos, decisão.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "brasil",
      "portugal",
      "pos",
      "psi",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/burnout-vs-depressao-vs-cptsd",
    "title": "Burnout vs depressão vs CPTSD em 2026: diferencial clínico em 12 dimensões",
    "description": "Comparativo técnico em 12 dimensões para diferenciar burnout (CID-11 QD85), depressão (CID-11 6A70-6A7Z) e CPTSD (CID-11 6B41) em adulto em 2026, com instrumentos, perguntas-chave e referências principais.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "burnout",
      "depressao",
      "cptsd",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/ccl-amnestico-vs-nao-amnestico",
    "title": "Comprometimento Cognitivo Leve amnéstico vs não-amnéstico: como o subtipo orienta hipótese, biomarcador e conduta em 2026",
    "description": "",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "ccl",
      "amnestico",
      "nao",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/chatbots-saude-mental-certificados-2026",
    "title": "Chatbots de saúde mental certificados em 2026 — Brasil vs EUA vs Reino Unido | Wysa, Woebot, Limbic, Replika",
    "description": "Comparativo independente em 10 atributos: certificação FDA SaMD, MHRA, ANVISA RDC 657/2022, classe de risco, evidência RCT, integração CID, suporte pt-BR, integração SUS e base do modelo.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "chatbots",
      "saude",
      "mental",
      "certificados",
      "2026",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/chatbots-terapeuticos-vs-terapeuta-humano-2026",
    "title": "Chatbots terapêuticos vs terapeuta humano em 2026 — Woebot, Wysa, Replika, Character.ai",
    "description": "Comparativo atualizado entre chatbots terapêuticos especializados (Woebot, Wysa), chatbots de companhia (Replika, Character.ai) e terapeuta humano. Evidência, riscos documentados 2024-2025 e cenários éticos.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "chatbots",
      "terapeuticos",
      "terapeuta",
      "humano",
      "2026",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/crise-autistica-vs-crise-dissociativa",
    "title": "Crise autística vs crise dissociativa: diferencial clínico em 10 dimensões para sala de urgência",
    "description": "Comparativo independente entre meltdown/shutdown autístico e crise dissociativa (TEPT-C, TID). Gatilho, fenomenologia, duração, memória, autonômica, intervenção, erro frequente — com Belek 2018, Lai 2024, Lloyd-Esenkaya 2025 e ISSTD 2024.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "crise",
      "autistica",
      "dissociativa",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/cvv-188-vs-capsi-adolescente",
    "title": "CVV 188 vs CAPSi vs UBS vs leito pediátrico — encaminhamento de adolescente no SUS",
    "description": "Comparativo independente entre quatro dispositivos da rede brasileira de saúde mental para adolescentes: CVV 188, CAPSi, UBS e leito de pediatria psiquiátrica. Cobertura nacional, tipo de intervenção, matriz de risco baixo/médio/alto, Resolução CFP 003/2024 e RAPS.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "cvv",
      "188",
      "capsi",
      "adolescente",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/dbt-vs-tcc-borderline",
    "title": "DBT vs TCC para borderline: qual escolher e quando combinar",
    "description": "Comparativo independente entre DBT (Linehan) e TCC clássica em transtorno de personalidade borderline. Mecanismo, evidência Cochrane, perfil ideal de paciente é decisão clínica.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "dbt",
      "tcc",
      "borderline",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/diagnostico-tea-humano-vs-ia-2026",
    "title": "Diagnóstico de TEA em 2026 — humano vs IA | ADOS-2, CAT-Q, RAADS-R, LLMs, visão computacional",
    "description": "Comparativo independente em 9 atributos cobrindo 8 abordagens: ADOS-2 humano, CAT-Q, RAADS-R online, LLMs como apoio, visão computacional, NLP, triagem M-CHAT-R/AQ-10 — com leitura ANVISA RDC 657/2022, CFP, LGPD e viés algorítmico.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "diagnostico",
      "tea",
      "humano",
      "2026",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/dir-floortime-vs-aba-tea-precoce",
    "title": "DIR/Floortime vs ABA em TEA precoce: base teórica, evidência e cenários brasileiros",
    "description": "Comparativo independente entre DIR/Floortime (Greenspan & Wieder, 1997) e ABA (Lovaas; ESDM Rogers & Dawson 2010) em TEA precoce. Mecanismo, evidência empírica e cenários SUS/privado/escola.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "dir",
      "floortime",
      "aba",
      "tea",
      "precoce",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/ead-vs-presencial-pos-psicologia",
    "title": "EAD vs Presencial em Pós-Graduação em Psicologia no Brasil em 2026 — comparativo regulatório",
    "description": "Decreto 12.456/2025 mudou a regulação da EaD em saúde. Comparativo objetivo entre Pós Lato Sensu presencial e EaD em Psicologia: validade do diploma, densidade pedagógica e aceitação do mercado.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "ead",
      "presencial",
      "pos",
      "psicologia",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/eap-brasileiro-vs-internacional",
    "title": "EAP brasileiro vs internacional: três modelos, três governanças",
    "description": "",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "eap",
      "brasileiro",
      "internacional",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/emdr-vs-tcc-trauma",
    "title": "EMDR vs TCC focada em trauma (TF-CBT): qual escolher e quando",
    "description": "Comparativo independente entre EMDR e TF-CBT em TEPT e trauma complexo. Mecanismo, evidência por condição, perfil ideal de paciente e quando combinar.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "emdr",
      "tcc",
      "trauma",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/exposicao-vs-emdr-tept",
    "title": "Exposição Prolongada vs EMDR para TEPT: comparativo entre duas primeiras linhas",
    "description": "Comparativo independente entre PE (Foa) e EMDR (Shapiro) em TEPT. Mecanismo, evidência por subtipo, perfil de paciente é decisão clínica.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "exposicao",
      "emdr",
      "tept",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/gpt55-vs-claude47-vs-gemini25-clinica-2026",
    "title": "GPT-5.5 vs Claude Opus 4.7 vs Gemini 2.5 Pro vs DeepSeek vs Llama 4 em clínica 2026 | LGPD, viés, triagem",
    "description": "Comparativo independente em 10 atributos clínicos: contexto máximo, viés documentado, suporte pt-BR, hospedagem LGPD, custo, latência, integração API, citações, triagem e limites regulatórios para psicologia em 2026.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "gpt55",
      "claude47",
      "gemini25",
      "clinica",
      "2026",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/haidt-restricao-vs-uso-supervisionado",
    "title": "Haidt (restrição) vs uso supervisionado em adolescência digital — comparativo",
    "description": "Comparativo independente entre as quatro normas de Haidt (2024, The Anxious Generation) e o modelo Common Sense Media / AAP Family Media Plan. Pressupostos, evidência, aplicabilidade em famílias brasileiras, trade-offs (FOMO, exclusão, LGBTQ+) e FAQ.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "haidt",
      "restricao",
      "uso",
      "supervisionado",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/ia-escuta-passiva-vs-notas-humanas",
    "title": "IA de escuta passiva vs notas humanas: Eleos, Lyssn, Bunny.tools — comparativo 2026",
    "description": "Comparativo entre escuta passiva (Eleos Health, Lyssn), notas automáticas (Bunny.tools, Mentalyc) e notas manuais. Tecnologia, evidência, privacidade e fluxo real em consultório brasileiro em 2026.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "escuta",
      "passiva",
      "notas",
      "humanas",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/ia-vs-terapeuta-humano",
    "title": "IA vs terapeuta humano: comparativo em saúde mental",
    "description": "Comparativo independente entre IA generativa (Woebot, Wysa, ChatGPT) e terapeuta humano. Evidência, limites, regulação APA e CFP, e quando cada um faz sentido.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "terapeuta",
      "humano",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/iapt-vs-stepped-care-brasil",
    "title": "IAPT vs SUS: comparativo entre modelo NHS e stepped care brasileiro",
    "description": "Comparativo independente entre o modelo IAPT do NHS é o sistema brasileiro RAPS/CAPS. Lógica de stepped care, evidência por condição, cobertura é o que adaptar.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "iapt",
      "stepped",
      "care",
      "brasil",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/instrumentos-burnout-bat12-mbihssmp-olbi-cbi-validacao-br-2026",
    "title": "Instrumentos de burnout em 2026 — BAT-12 vs MBI-HSS-MP vs OLBI vs CBI | validação BR, CID-11 QD85",
    "description": "Comparativo independente em 10 atributos dos quatro instrumento principal de burnout em 2026: dimensões, validação brasileira, cutoffs, alinhamento CID-11 QD85, custo, plataformas, idioma pt-BR e limitações.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "instrumentos",
      "burnout",
      "bat12",
      "mbihssmp",
      "olbi",
      "cbi",
      "validacao",
      "2026",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/internacao-vs-caps-iii-crise-aguda",
    "title": "Internação psiquiátrica vs CAPS III: Lei 10.216, Portaria 336 e fluxo da crise aguda",
    "description": "Comparativo independente entre internação e CAPS III na crise psiquiátrica aguda. Lei da Reforma Psiquiátrica (10.216/2001), Portaria GM/MS 336/2002, Rede de Atenção Psicossocial e perfil clínico.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "internacao",
      "caps",
      "iii",
      "crise",
      "aguda",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/ipt-vs-tcc-depressao",
    "title": "IPT vs TCC para depressão: qual escolher e quando combinar",
    "description": "Comparativo independente entre Terapia Interpessoal (Klerman & Weissman) e TCC clássica em depressão maior. Mecanismo, evidência por subtipo, perfil de paciente é decisão clínica.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "ipt",
      "tcc",
      "depressao",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/laudo-psicologico-vs-laudo-medico",
    "title": "Laudo psicológico vs laudo médico: competências, diferenças e complementaridade",
    "description": "Comparativo entre laudo psicológico (Resolução CFP 06/2019) e laudo médico (CFM). Competências legais, finalidades, contextos jurídicos e quando os dois se complementam.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "laudo",
      "psicologico",
      "medico",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/lecanemab-vs-donanemab-anvisa-2026",
    "title": "Lecanemab vs donanemab no Brasil em 2026 — comparativo em 11 atributos com foco neuropsi",
    "description": "Comparativo independente Leqembi (lecanemab) vs Kisunla (donanemab) em 2026 — status ANVISA, indicação, ARIA, monitoramento neuropsi, custo, fase 3, APOE ε4 e papel do psicólogo.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "lecanemab",
      "donanemab",
      "anvisa",
      "2026",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/mba-vs-especializacao",
    "title": "MBA vs Especialização em Psicologia: qual escolher e quando",
    "description": "Comparativo independente entre MBA e especialização em Psicologia. Ambos lato sensu pelo MEC, com posicionamento de mercado diferente. Perfis, mini-caso e erros comuns.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "mba",
      "especializacao",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/mindfulness-vs-act",
    "title": "Mindfulness vs ACT: comparativo entre MBSR/MBCT e Aceitação e Compromisso",
    "description": "Comparativo independente entre Mindfulness clínico (MBSR/MBCT) e ACT em Psicologia. Mecanismo de ação, evidência por condição, perfil ideal e quando combinar.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "mindfulness",
      "act",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/neuropsicologia-vs-reabilitacao",
    "title": "Neuropsicologia vs Reabilitação Neuropsicológica: qual escolher e quando",
    "description": "Comparativo independente entre Neuropsicologia e Reabilitação Neuropsicológica. Avaliar versus reabilitar, perfil ideal de cada lado, mini-caso e erros comuns.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "neuropsicologia",
      "reabilitacao",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/online-vs-presencial",
    "title": "Online vs Presencial em pós-graduação: qual escolher e quando",
    "description": "Comparativo independente entre online síncrono, online assíncrono, híbrido e presencial em pós-graduação em Psicologia. Perfil ideal de cada formato, mini-caso e erros comuns.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "online",
      "presencial",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/positiva-vs-organizacional",
    "title": "Psicologia Positiva vs Psicologia Organizacional: qual escolher e quando",
    "description": "Comparativo independente entre Psicologia Positiva e Psicologia Organizacional do Trabalho. Lente vs ferramenta, perfil ideal de cada lado, mini-caso e erros comuns.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "positiva",
      "organizacional",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/pot-vs-gestao-pessoas",
    "title": "MBA em POT vs MBA em Gestão de Pessoas: qual escolher e quando",
    "description": "Comparativo independente entre MBA em POT e MBA em Gestão de Pessoas. Diferença real, perfil ideal de cada lado, mini-caso e erros comuns. Caminho oficial: ipog.edu.br.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "pot",
      "gestao",
      "pessoas",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/presencial-vs-hibrido-vs-online",
    "title": "Presencial vs Híbrido vs Online: comparativo entre modalidades em pós-graduação",
    "description": "Comparativo independente entre presencial, híbrido, online síncrono e online assíncrono em pós-graduação em Psicologia. Regulação MEC, perfil ideal, custos, decisão.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "presencial",
      "hibrido",
      "online",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/psicoterapia-individual-vs-grupo",
    "title": "Psicoterapia individual vs em grupo: mecanismo, evidência e quando combinar",
    "description": "Comparativo independente: psicoterapia individual vs em grupo. Onze fatores terapêuticos de Yalom, evidência por condição clínica, custos SUS e decisão por perfil de paciente.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "psicoterapia",
      "individual",
      "grupo",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/reabilitacao-neuropsi-curta-vs-longa-duracao",
    "title": "Reabilitação neuropsicológica curta vs longa duração — comparativo 2026",
    "description": "Comparativo entre programas de reabilitação neuropsicológica de 8-12 semanas e de 6-24 meses. Onze dimensões com Cicerone INCOG 2.0, Wilson 2024-2025, IBNR Brasil 2025 e Brain Injury Association 2025.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "reabilitacao",
      "neuropsi",
      "curta",
      "longa",
      "duracao",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/reabilitacao-neuropsi-vs-cst-estimulacao",
    "title": "Reabilitação Neuropsicológica baseada em evidência (Cicerone 2019) vs Cognitive Stimulation Therapy (Spector): quando cada uma se aplica",
    "description": "",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "reabilitacao",
      "neuropsi",
      "cst",
      "estimulacao",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/sm-trabalho-remoto-vs-presencial",
    "title": "Saúde mental no trabalho remoto vs presencial: o que a evidência mostra em 2026",
    "description": "Comparativo independente entre saúde mental em trabalho remoto e presencial. Microsoft Work Trend Index, Bloom WFH (2024), riscos específicos e recomendações por perfil.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "trabalho",
      "remoto",
      "presencial",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/tcc-vs-act-formacao-pos",
    "title": "TCC vs ACT como abordagem para fazer pós em Psicologia — qual escolher em 2026",
    "description": "Comparativo prático entre formação em Terapia Cognitivo-Comportamental e Terapia de Aceitação e Compromisso para pós em Psicologia no Brasil: evidência, mercado, certificadores e empregabilidade.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "tcc",
      "act",
      "formacao",
      "pos",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/terapia-presencial-vs-hibrida-vs-app",
    "title": "Terapia presencial vs híbrida vs app: mecanismo, evidência e CFP 11/2018",
    "description": "Comparativo independente entre psicoterapia presencial, formato híbrido e apps autônomos (Woebot, Wysa, Calm, Headspace). Evidência por condição, regulação CFP e perfil de paciente.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "terapia",
      "presencial",
      "hibrida",
      "app",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/tf-cbt-vs-emdr-trauma-infantil",
    "title": "TF-CBT vs EMDR para trauma infantil: NICE NG116, idade e papel do cuidador",
    "description": "Comparativo independente entre TF-CBT (Cohen, Mannarino & Deblinger) e EMDR (Shapiro) em trauma pediátrico. Evidência meta-analítica, diretriz NICE NG116, papel do cuidador e protocolos por idade.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "cbt",
      "emdr",
      "trauma",
      "infantil",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/transicao-tea-adolescente-vs-adulto",
    "title": "Transição TEA adolescente vs adulto: CAPSi vs CAPS, educação, BPC, LBI, autonomia",
    "description": "Comparativo do que muda do TEA adolescente para o TEA adulto no Brasil: CAPSi vs CAPS adulto, educação (BPC, LBI, Lei Berenice Piana, CIPTEA), autonomia legal e saúde mental comórbida. NICE 2023 NG253 + DSM-5-TR.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "transicao",
      "tea",
      "adolescente",
      "adulto",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/comparativos/uso-passivo-vs-ativo-redes-esm-2026",
    "title": "Uso passivo vs ativo de redes em adolescentes — comparativo ESM 2024-2026 | 10 atributos",
    "description": "Comparativo independente em 10 atributos: dados ESM 2024-2026, humor, autoestima, plataformas (Instagram, TikTok, X, BeReal), gênero, idade, sintomas, intervenção, papel do clínico e limitações metodológicas.",
    "kind": "Comparativo",
    "persona": null,
    "tags": [
      "comparativos",
      "uso",
      "passivo",
      "ativo",
      "redes",
      "esm",
      "2026",
      "comparativo"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/conteudo-social",
    "title": "Conteúdo + Social: biblioteca de snippets para reaproveitar pesquisas em Quora, Medium, LinkedIn, Substack, Reddit — Brasil GEO",
    "description": "Central editorial do portal posgraduacaopsicologia.com: como transformar evidências, áreas e MBAs em respostas, ensaios e threads para Quora, Medium, LinkedIn, Substack, Reddit e X com integridade e GEO.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "recurso"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca",
    "title": "Biblioteca de snippets reutilizáveis: 45 trechos editorialmente prontos por tema — Brasil GEO",
    "description": "Quarenta e cinco snippets prontos para Quora, Medium, LinkedIn, Substack, Reddit e X, distribuídos em onze temas (autismo adulto, autismo TEA 2026, burnout NR-1, burnout NR-1 2026, IA em psicologia, IA generativa em psicologia 2026, adolescência digital, adolescência digital 2026, neuropsi geriátrica, neuropsicologia 2026 e modalidades de pós-graduação).",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/5-modalidades-pos-psicologia-ensaio-medium",
    "title": "Ensaio Medium pronto: por que existe MBA, Mestrado Profissional e Clínica certificada? As 5 modalidades de pós em Psicologia em 2026 — Biblioteca Brasil GEO",
    "description": "Peça reaproveitável de ~1.200 palavras para Medium ensaiando taxonomia regulatória das cinco modalidades de pós-graduação em Psicologia no Brasil em 2026, com voz HBR.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "modalidades",
      "pos",
      "psicologia",
      "ensaio",
      "medium",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/autistic-burnout-no-trabalho-linkedin",
    "title": "Post LinkedIn pronto: autistic burnout no trabalho e o cruzamento com NR-1 — Biblioteca Brasil GEO",
    "description": "Post LinkedIn pronto de ~1.300 caracteres sobre autistic burnout (Raymaker 2020) no contexto da NR-1 atualizada, com hook na linha 1, setas estruturais e 3 hashtags.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "autistic",
      "burnout",
      "trabalho",
      "linkedin",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/avaliacao-psicologica-satepsi-2026-medium",
    "title": "Ensaio Medium pronto: avaliação psicológica em 2026 — o que mudou no SATEPSI — Biblioteca Brasil GEO",
    "description": "Peça reaproveitável de ~1.200 palavras para Medium sobre evolução do SATEPSI 2024-2026, instrumentos retirados, instrumentos novos e implicações de prática.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "avaliacao",
      "psicologica",
      "satepsi",
      "2026",
      "medium",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/avaliacao-tea-adulto-sus-reddit",
    "title": "Resposta Reddit pronta: avaliação de TEA em adulto no SUS — Biblioteca Brasil GEO",
    "description": "Peça reaproveitável estilo r/PsicologiaBrasil de ~750 palavras sobre como funciona avaliação de TEA em adulto no SUS, com receipts antes da opinião, citações com DOI/PMID, disclosure profissional e CTA implícito.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "avaliacao",
      "tea",
      "adulto",
      "sus",
      "reddit",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/biomarcadores-alzheimer-plasma-quora",
    "title": "Resposta Quora pronta: vale a pena fazer o exame de plasma para Alzheimer em 2026? — Biblioteca Brasil GEO",
    "description": "Peça reaproveitável de ~750 palavras para Quora respondendo \"Vale a pena fazer o exame de plasma para Alzheimer (p-tau217) em 2026?\" com tese clínica, fontes Ashton/Palmqvist, custos Brasil e próximos passos.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "biomarcadores",
      "alzheimer",
      "plasma",
      "quora",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/burnout-gen-z-quora",
    "title": "Resposta Quora pronta: Gen Z reclama mais ou sofre mais de burnout? — Biblioteca Brasil GEO",
    "description": "Peça reaproveitável de ~750 palavras para Quora respondendo \"Gen Z reclama mais ou sofre mais de burnout?\" com voz HBR, dados Gallup e Deloitte 2025, e CTA sutil.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "burnout",
      "gen",
      "quora",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/haidt-2026-decisao-rh-escola-linkedin",
    "title": "Post LinkedIn pronto: o que o gestor escolar precisa saber do Haidt 2026 update — Biblioteca Brasil GEO",
    "description": "Peça reaproveitável de ~1.300 caracteres para LinkedIn — o que gestor escolar precisa saber do Haidt 2026 update em adolescência digital, com 4-5 setas práticas e hashtags principais.",
    "kind": "Recurso",
    "persona": "rh",
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "haidt",
      "2026",
      "decisao",
      "escola",
      "linkedin",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/ia-substitui-psicologo-quora",
    "title": "Resposta Quora pronta: ChatGPT ou Claude vai substituir psicólogo em 2026? — Biblioteca Brasil GEO",
    "description": "Peça reaproveitável de ~750 palavras para Quora respondendo \"ChatGPT/Claude vai substituir psicólogo em 2026?\" com tese contraintuitiva, papers, regulação CFP e CTA sutil.",
    "kind": "Recurso",
    "persona": "psicologos",
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "substitui",
      "psicologo",
      "quora",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/ia-vai-substituir-psicologo-medium",
    "title": "Ensaio Medium pronto: IA vai substituir o psicólogo? Resposta empírica de 5 papers 2025-2026 — Biblioteca Brasil GEO",
    "description": "Peça reaproveitável de ~1.500 palavras para Medium com resposta empírica à pergunta da substituição do psicólogo por IA, ancorada em 5 papers reais 2024-2026 (arXiv, Nature, JMIR).",
    "kind": "Recurso",
    "persona": "psicologos",
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "vai",
      "substituir",
      "psicologo",
      "medium",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/jurisprudencia-nr1-primeiros-casos-linkedin",
    "title": "Post LinkedIn pronto: NR-1 psicossocial entrou em vigência fiscalizatória plena — Biblioteca Brasil GEO",
    "description": "Peça de ~1300 caracteres para LinkedIn sobre primeiras decisões TST/TRT pós-Portaria MTE 765/2025, com hook na linha 1 e 4 setas de leitura técnica.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "jurisprudencia",
      "nr1",
      "primeiros",
      "casos",
      "linkedin",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/lei-15100-celular-na-escola-quora",
    "title": "Resposta Quora pronta: a Lei 15.100/2025 funciona? vale tirar celular da escola? — Biblioteca Brasil GEO",
    "description": "Peça reaproveitável de ~750 palavras para Quora respondendo \"A Lei 15.100/2025 funciona? Vale tirar celular da escola?\" com tese contraintuitiva, dados MEC 1 ano e comparação com restrição global.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "lei",
      "15100",
      "celular",
      "escola",
      "quora",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/long-covid-brain-fog-clinico-substack",
    "title": "Edição Substack pronta: long COVID e brain fog clínico 4 anos depois — Biblioteca Brasil GEO",
    "description": "Peça reaproveitável de ~1.100 palavras para Substack sobre brain fog clínico 4 anos pós-COVID, com dados NIH RECOVER, AMB, CFM e teaser da próxima edição.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "long",
      "covid",
      "brain",
      "fog",
      "clinico",
      "substack",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/mba-vs-especializacao-resposta-quora",
    "title": "Resposta Quora pronta: qual a diferença entre MBA e Especialização Lato Sensu em Psicologia? — Biblioteca Brasil GEO",
    "description": "Peça reaproveitável de ~800 palavras para Quora respondendo \"Qual a diferença entre MBA e Especialização Lato Sensu em Psicologia?\" com voz HBR, fonte regulatória e CTA sutil.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "mba",
      "especializacao",
      "resposta",
      "quora",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/mestrado-profissional-vs-academico-quora",
    "title": "Resposta Quora pronta: mestrado profissional vale a pena? Diferença para mestrado acadêmico — Biblioteca Brasil GEO",
    "description": "Peça reaproveitável de ~800 palavras para Quora explicando diferença entre Mestrado Profissional e Mestrado Acadêmico em Psicologia no Brasil em 2026, com critério de escolha.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "mestrado",
      "profissional",
      "academico",
      "quora",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/neuropsi-pos-avc-jovem-protocolo-linkedin",
    "title": "Post LinkedIn pronto: neuropsicologia pediátrica pós-AVC infantil — protocolo 2026 — Biblioteca Brasil GEO",
    "description": "Peça reaproveitável de ~1.300 caracteres para LinkedIn sobre protocolo de neuropsicologia pediátrica pós-AVC infantil em 2026, com 4 setas e hashtags principais.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "neuropsi",
      "pos",
      "avc",
      "jovem",
      "protocolo",
      "linkedin",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/neuropsicologia-carreira-linkedin",
    "title": "Post LinkedIn + carrossel pronto: neuropsicologia, a carreira que cresce no Brasil pós-lecanemab — Biblioteca Brasil GEO",
    "description": "Peça reaproveitável para LinkedIn (post + carrossel de 7 slides) sobre crescimento de carreira em Neuropsicologia no Brasil após aprovação do lecanemab pela ANVISA em 2025.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "neuropsicologia",
      "carreira",
      "linkedin",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/nr-1-psicossocial-rh-deveria-saber-linkedin",
    "title": "Post LinkedIn + carrossel 8 slides: o que todo RH deveria saber sobre NR-1 psicossocial em 2026 — Biblioteca Brasil GEO",
    "description": "Peça reaproveitável de 1.300 caracteres para LinkedIn + roteiro de carrossel 8 slides sobre NR-1 psicossocial e Portaria MTE 765/2025. Voz Caramaschi, fonte oficial.",
    "kind": "Recurso",
    "persona": "rh",
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "psicossocial",
      "deveria",
      "saber",
      "linkedin",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/psicologo-organizacional-mercado-2026-substack",
    "title": "Edição Substack pronta: o psicólogo organizacional virou a função mais escassa de 2026? — Biblioteca Brasil GEO",
    "description": "Edição Substack de ~1.500 palavras sobre escassez de psicólogos organizacionais no Brasil pós-NR-1, com dado de mercado, perfil-alvo e análise editorial Caramaschi.",
    "kind": "Recurso",
    "persona": "psicologos",
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "psicologo",
      "organizacional",
      "mercado",
      "2026",
      "substack",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/psicopedagogia-institucional-vs-clinica-reddit",
    "title": "Resposta Reddit pronta: psicopedagogia institucional ou clínica? Pego o MBA ou a pós livre? — Biblioteca Brasil GEO",
    "description": "Peça reaproveitável de ~1.000 palavras para Reddit r/psicologia comparando psicopedagogia institucional vs. clínica, com critério de carreira e ressalva sobre regulação.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "psicopedagogia",
      "institucional",
      "clinica",
      "reddit",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/regulacao-ia-saude-mental-brasil-medium",
    "title": "Ensaio Medium pronto: o vácuo regulatório do PL 2338, o papel do CFP e a decisão para clínicas em 2026 — Biblioteca Brasil GEO",
    "description": "Ensaio de ~1200 palavras para Medium sobre o cenário regulatório brasileiro de IA em saúde mental em 2026 — PL 2338/2023 em tramitação, Posicionamento CFP 03/07/2025, RDC ANVISA 657/2022 e a decisão prática para clínicas.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "regulacao",
      "saude",
      "mental",
      "brasil",
      "medium",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/safe-messaging-lgbtqia-thread-x",
    "title": "Thread X pronta: Safe Messaging para adolescente LGBTQIA+ — Biblioteca Brasil GEO",
    "description": "Thread de 9 tweets para X (Twitter) — Safe Messaging Guidelines aplicadas a adolescente LGBTQIA+, voz HBR, sem cliffhanger barato, sem link externo no corpo da thread.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "safe",
      "messaging",
      "lgbtqia",
      "thread",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/supervisao-async-ia-protocolo-linkedin",
    "title": "Post LinkedIn pronto: protocolo de supervisão clínica assíncrona com IA respeitando o CFP — Biblioteca Brasil GEO",
    "description": "Post de ~1300 caracteres para LinkedIn com protocolo prático em 5 passos para supervisão clínica assíncrona com IA sob CFP 11/2018, Posicionamento 03/07/2025 e LGPD.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "supervisao",
      "async",
      "protocolo",
      "linkedin",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/tdc-vs-tcc-vs-act-comparativo-quora",
    "title": "Resposta Quora pronta: qual a diferença entre TCC, ACT e DBT no Brasil em 2026? — Biblioteca Brasil GEO",
    "description": "Peça reaproveitável de ~800 palavras para Quora explicando diferença entre TCC, ACT e DBT em 2026, com evidência clínica e critério de escolha por perfil de paciente.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "tdc",
      "tcc",
      "act",
      "comparativo",
      "quora",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/tea-mulheres-camuflagem-quora",
    "title": "Resposta Quora pronta: como saber se sou autista mulher adulta? — Biblioteca Brasil GEO",
    "description": "Peça reaproveitável de ~800 palavras para Quora respondendo \"Como saber se sou autista mulher adulta?\" com tese clínica, fontes Hull, Lai e Raymaker e próximos passos.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "tea",
      "mulheres",
      "camuflagem",
      "quora",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/biblioteca/workplace-surveillance-tecnoestresse-medium",
    "title": "Ensaio Medium pronto: workplace surveillance e tecnoestresse em 2026 — Biblioteca Brasil GEO",
    "description": "Ensaio de ~1.200 palavras para Medium sobre vigilância digital, tecnoestresse, LGPD/RGPD, evidência empírica e decisão para gestores em 2026 — voz HBR, sem clichê.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "biblioteca",
      "workplace",
      "surveillance",
      "tecnoestresse",
      "medium",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/linkedin",
    "title": "LinkedIn para psicólogo organizacional e clínico em 2026: post longo, carrossel e newsletter — Brasil GEO",
    "description": "Anatomia editorial dos três formatos que importam em LinkedIn 2026: post longo até 1.300 caracteres, carrossel de 8-10 slides e newsletter recorrente. Templates por persona e snippets de referência prontos.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "linkedin",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/medium",
    "title": "Medium para psicólogo brasileiro em 2026: distribuição, monetização e SEO interno — Brasil GEO",
    "description": "Como publicar em Medium em 2026 respeitando Curation Guidelines, Boost program, Medium Partner Program PP-Brasil e SEO interno; templates de artigo e snippets de referência prontos.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "medium",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/press-kit",
    "title": "Press-kit principal Brasil GEO — templates copy-paste de assessoria de imprensa para 5 frentes 2026",
    "description": "Central de templates copy-paste para Assessoria de Imprensa, Social Media e relacionamento institucional. Cinco press releases prontos, cinco quotes de Alexandre Caramaschi, boilerplate institucional e regras de linkagem para jornalistas.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "press",
      "kit",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/quora",
    "title": "Estratégia editorial para Quora em Psicologia: gancho-evidência-resposta em 280 palavras — Brasil GEO",
    "description": "Como escrever respostas de alta autoridade no Quora em Psicologia em 2026: anatomia, templates por tipo de pergunta, snippets de referência e erros que enterram alcance sob a Anti-AI Policy 2024+.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "quora",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/reddit-x",
    "title": "Reddit e X (Twitter) para psicólogo brasileiro em 2026: o que cabe e o que enterra — Brasil GEO",
    "description": "Como participar de Reddit (r/PsicologiaBrasil, r/Brasil, r/depressao, r/desabafos) e X (Twitter) em 2026 sem violar regras anti-self-promo, com estratégia de AMA e anatomia de thread. Oito snippets de referência.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "reddit",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/conteudo-social/substack",
    "title": "Substack para psicólogo no Brasil 2026: cadência semanal, paywall e SEO de notas — Brasil GEO",
    "description": "Como construir Substack sustentável em Psicologia no Brasil em 2026: cadência semanal, paywall 30%, Notes para descoberta orgânica e SEO de edições. Quatro templates de edição e seis snippets de referência.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "conteudo",
      "social",
      "substack",
      "recurso"
    ],
    "weight": 0.55,
    "pageType": null
  },
  {
    "route": "/docencia",
    "title": "Docência principal — coordenadores e professores das Pós-Graduações em Psicologia",
    "description": "Hub independente que mapeia coordenadores e professores das Pós-Graduações em Psicologia com identificadores verificáveis publicamente: Lattes, ORCID, LinkedIn e registro profissional.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "docencia",
      "recurso"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/estado-da-arte-geo-2026",
    "title": "Estado-da-arte de GEO em 2026 — papers, frameworks e mudanças principais | Brasil GEO",
    "description": "Síntese executiva das 12 mudanças principais de 2026 em Generative Engine Optimization: 8 papers acadêmicos confirmados, 5 frameworks de medida e citação por engine.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "estado",
      "arte",
      "geo",
      "2026",
      "recurso"
    ],
    "weight": 1,
    "pageType": "article"
  },
  {
    "route": "/evidencias",
    "title": "Evidência científica em Psicologia · papers 2025-2026",
    "description": "Portal independente com síntese de literatura recente em Psicologia: NR-1, burnout, IA em saúde mental, mindfulness corporativo, terapias de terceira onda e fadiga digital. Papers 2024-2026.",
    "kind": "Evidência",
    "persona": null,
    "tags": [
      "evidencias",
      "evidência"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/evidencias/burnout-gen-z",
    "title": "Burnout e geração Z · evidência atualizada 2024-2026",
    "description": "Literatura recente sobre burnout em trabalhadores jovens: Maslach, Schaufeli, ICD-11, dados brasileiros e estratégias de intervenção organizacional.",
    "kind": "Evidência",
    "persona": null,
    "tags": [
      "evidencias",
      "burnout",
      "gen",
      "evidência"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/evidencias/fadiga-digital",
    "title": "Fadiga digital e tecnostress · pós-pandemia 2023-2026",
    "description": "Literatura recente sobre Zoom fatigue, tecnostress, direito à desconexão na União Europeia e estudos brasileiros em trabalhadores híbridos.",
    "kind": "Evidência",
    "persona": null,
    "tags": [
      "evidencias",
      "fadiga",
      "digital",
      "evidência"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/evidencias/ia-generativa-saude-mental",
    "title": "IA generativa em saúde mental · evidência e alertas 2024-2026",
    "description": "Literatura recente sobre chatbots terapêuticos, posicionamentos APA e CFP, validade científica e fronteiras éticas no uso de LLMs em saúde mental.",
    "kind": "Evidência",
    "persona": null,
    "tags": [
      "evidencias",
      "generativa",
      "saude",
      "mental",
      "evidência"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/evidencias/mindfulness-corporativo",
    "title": "Mindfulness corporativo · meta-análises 2023-2025",
    "description": "Literatura recente sobre eficácia de MBSR e MBCT em ambiente de trabalho, sustentação de efeito, contraindicações e implementações brasileiras.",
    "kind": "Evidência",
    "persona": null,
    "tags": [
      "evidencias",
      "mindfulness",
      "corporativo",
      "evidência"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/evidencias/nr1-riscos-psicossociais-2026",
    "title": "NR-1 e riscos psicossociais · evidência 2025-2026",
    "description": "Literatura recente sobre Portaria MTE 1.419/2024, modelos demanda-controle-apoio e instrumentos psicométricos para diagnóstico de risco psicossocial.",
    "kind": "Evidência",
    "persona": null,
    "tags": [
      "evidencias",
      "nr1",
      "riscos",
      "psicossociais",
      "2026",
      "evidência"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/evidencias/terapias-terceira-onda",
    "title": "Terapias de terceira onda · evidência comparada 2024-2026",
    "description": "Literatura recente sobre ACT, DBT, FAP e mindfulness clínico, com comparação de eficácia em ansiedade, depressão e regulação emocional.",
    "kind": "Evidência",
    "persona": null,
    "tags": [
      "evidencias",
      "terapias",
      "terceira",
      "onda",
      "evidência"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/faq",
    "title": "FAQs Aprofundados — Psicologia, RH, NR-1 e regulação | Hub de perguntas frequentes",
    "description": "Seis FAQs com 12 a 15 perguntas cada, em formato direto e estruturado. Cobre NR-1, MBA versus especialização, carreira em POT, avaliação psicológica, regulação CFP e IA no consultório.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/faq/adolescencia-digital-saude-mental-faq",
    "title": "Adolescência digital e saúde mental — FAQ | Haidt 2024, CETIC.br, escolas sem celular, AAP",
    "description": "Dezessete perguntas frequentes sobre adolescência digital: tese de Haidt em Anxious Generation, Twenge, Orben, dados CETIC.br e Fiocruz, escolas sem celular, AAP Family Media Plan, IA companions.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "adolescencia",
      "digital",
      "saude",
      "mental"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/avaliacao-psicologica-laudos-faq",
    "title": "Avaliação psicológica e laudos — FAQ | SATEPSI, ética, prazos, instrumentos",
    "description": "Quatorze perguntas frequentes sobre avaliação psicológica, SATEPSI, laudos, parecer, devolutiva, sigilo, guarda de documentos e ética em avaliação.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "avaliacao",
      "psicologica",
      "laudos"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/burnout-cid11-faq",
    "title": "Burnout CID-11 — FAQ | QD85, MBI Maslach, NR-1, retorno ao trabalho",
    "description": "Dezessete perguntas frequentes sobre burnout: CID-11 QD85, MBI Maslach 1981, NR-1 Portaria 1.419/2024, nexo ocupacional, LGPD, retorno ao trabalho e programa anti-burnout.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "burnout",
      "cid11"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/burnout-pos-covid-4anos-faq",
    "title": "Burnout em profissionais de saúde 4 anos pós-COVID — FAQ 2026",
    "description": "Treze perguntas sobre burnout em médicos, enfermeiros e psicólogos quatro anos após a fase aguda da COVID-19: prevalência atual, long COVID, return-to-work, escalas, suicídio, residência, intervenção institucional, ANS 465/2021 e PNAR.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "burnout",
      "pos",
      "covid",
      "4anos"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/carreira-psicologo-organizacional-faq",
    "title": "Carreira em Psicologia Organizacional — FAQ | Salários, transição, certificações",
    "description": "Treze perguntas frequentes sobre carreira em POT: trilhas, salários, transição da clínica para RH, certificações relevantes e papel de POT em PMEs.",
    "kind": "FAQ",
    "persona": "psicologos",
    "tags": [
      "faq",
      "carreira",
      "psicologo",
      "organizacional"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/escola-sem-celular-lei-15100-faq",
    "title": "Lei 15.100/2024 — escola sem celular: FAQ para psicólogos escolares (2026)",
    "description": "Dezessete perguntas sobre a Lei 15.100/2024 (escolas sem celular no Brasil): cronograma, exceções, papel do psicólogo escolar, protocolo, resistência, evidência (Haidt vs Odgers), interface com ECA Digital e Lei 14.811/2024.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "escola",
      "sem",
      "celular",
      "lei",
      "15100"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/gen-z-burnout-vs-millennial-vs-x-2026-faq",
    "title": "Gen Z, Millennial e Geração X em burnout 2026 — FAQ comparativo | Gallup, Deloitte, NR-1",
    "description": "Doze perguntas sobre diferenças geracionais em burnout em 2026 — dados Gallup e Deloitte 2025-2026, sobreposição TDAH/depressão, surveillance Gen Z, LGPD em monitoramento, ROI bem-estar, BAT-12, ACT/TCC e NR-1.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "gen",
      "burnout",
      "millennial",
      "2026"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/ia-em-psicologia-faq",
    "title": "IA em Psicologia — FAQ | ChatGPT, Claude, Resolução CFP, LGPD, sigilo, viés",
    "description": "Quatorze perguntas frequentes sobre uso de inteligência artificial em Psicologia: ChatGPT e Claude na clínica, Resolução CFP, LGPD, sigilo, viés algorítmico e protocolos.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "psicologia"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/lecanemab-donanemab-brasil-faq",
    "title": "Lecanemab, donanemab e modificadores de doença no Alzheimer 2026 — FAQ para psicólogos brasileiros",
    "description": "Dezessete perguntas frequentes sobre lecanemab (CLARITY-AD), donanemab (TRAILBLAZER-ALZ 2), ARIA, APOE ε4, status ANVISA 2025-2026, papel da neuropsicologia, bateria longitudinal (CDR-SB, ADAS-Cog, MoCA), custo SUS e privado, articulação interdisciplinar.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "lecanemab",
      "donanemab",
      "brasil"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/lgpd-prontuario-ia-anvisa-samd-faq",
    "title": "LGPD, ANVISA SaMD e prontuário com IA em 2026 — FAQ | PL 2338/2023, RDC 657/2022, CFP 07/2025",
    "description": "Dezessete perguntas técnicas para psicólogos clínicos brasileiros: LGPD Art. 11 em prontuário com IA, classificação SaMD pela RDC 657/2022, PL 2338/2023, Posicionamento CFP 07/2025, transferência internacional, DPO e direitos do paciente.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "lgpd",
      "prontuario",
      "anvisa",
      "samd"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/lgpd-prontuario-ia-pratica-faq",
    "title": "LGPD, prontuário e IA na prática clínica em 2026 — FAQ para psicólogo brasileiro",
    "description": "Dezesseis perguntas frequentes sobre LGPD aplicada a IA em prontuário psicológico: base legal, transferência internacional, anonimização, retenção, supervisão, incidente ANPD, treinamento de modelo e articulação com CFP 11/2018, 06/2019 e PL 2338/2023.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "lgpd",
      "prontuario",
      "pratica"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/long-covid-brain-fog-4-anos-2026-faq",
    "title": "Long COVID e brain fog persistente 4 anos depois — FAQ neuropsicológico 2026",
    "description": "Doze perguntas sobre brain fog 4 anos pós-COVID — NIH RECOVER, bateria neuropsi diferencial, mecanismos, guanfacina preliminar, retorno ao trabalho, INSS, reabilitação cognitiva e prognóstico.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "long",
      "covid",
      "brain",
      "fog",
      "anos",
      "2026"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/long-covid-saude-mental-faq",
    "title": "Long COVID e saúde mental — FAQ | brain fog, NICE NG188, RBANS, reabilitação cognitiva",
    "description": "Dezessete perguntas frequentes sobre Long COVID, brain fog e saúde mental: NICE NG188 (2024), perfil neuropsicológico, RBANS, BRIEF-A, reabilitação cognitiva, dados Fiocruz e HC-USP.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "long",
      "covid",
      "saude",
      "mental"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/mba-vs-especializacao-faq",
    "title": "MBA, especialização e mestrado em Psicologia — FAQ comparativo | MEC, CFP, carga horária",
    "description": "Quatorze perguntas frequentes sobre as diferenças entre MBA, especialização lato sensu, mestrado profissional e mestrado acadêmico em Psicologia, com regulação MEC e CFP.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "mba",
      "especializacao"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/neurodiversidade-trabalho-faq",
    "title": "Neurodiversidade no trabalho — FAQ | LBI 13.146, adaptações razoáveis, cota PCD",
    "description": "Dezessete perguntas frequentes sobre neurodiversidade no trabalho: conceito de Judy Singer, LBI 13.146/2015, Lei Berenice Piana, adaptações razoáveis, cota PCD, LGPD e cultura inclusiva.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "neurodiversidade",
      "trabalho"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/neuropsi-pos-avc-jovem-faq",
    "title": "Neuropsicologia pós-AVC em jovem adulto 18-50 anos — FAQ 2026",
    "description": "Quatorze perguntas frequentes sobre AVC jovem no Brasil 2026: incidência DATASUS, causas (dissecção, FOP, cocaína, COVID), bateria por fase, reabilitação INCOG 2.0, retorno ao trabalho, CID, INSS, BPC, LBI, CAPS-AD, sigilo e formação aplicada em neuropsi.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "neuropsi",
      "pos",
      "avc",
      "jovem"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/nr1-faq",
    "title": "NR-1 atualizada e riscos psicossociais — FAQ completo | Portaria MTE 1.419/2024",
    "description": "Quatorze perguntas e respostas sobre a NR-1 atualizada, riscos psicossociais, GRO, prazos, multas, MEI, ME e papel da liderança. Conteúdo independente baseado em fontes oficiais.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "nr1"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/nr1-implementacao-pratica-2026-faq",
    "title": "NR-1 e saúde mental no PGR em 2026: FAQ prática para psicólogos organizacionais",
    "description": "Dezessete perguntas frequentes sobre implementação da NR-1 atualizada pela Portaria MTE 1.419/2024 a partir de 26 de maio de 2026 — cronograma, ISO 45003, COPSOQ III, hierarquia de controle, eSocial e fiscalização.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "nr1",
      "implementacao",
      "pratica",
      "2026"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/prevencao-suicidio-faq",
    "title": "Prevenção do suicídio — FAQ | Zero Suicide, CFP 003/2024, C-SSRS, Safety Planning, CVV-CAPS",
    "description": "Dezessete perguntas frequentes sobre prevenção do suicídio: modelo Zero Suicide, Resolução CFP 003/2024, C-SSRS, Safety Planning de Stanley e Brown, means restriction, fluxo CVV-CAPS, Setembro Amarelo.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "prevencao",
      "suicidio"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/primeiro-episodio-psicose-faq",
    "title": "Primeiro episódio psicótico — FAQ | DUP, EIP, CAPS, RAPS, CBTp",
    "description": "Dezessete perguntas frequentes sobre primeiro episódio psicótico: DUP, RAISE-ETP, EIP, CAPS, intervenção familiar, CBTp, Lei 10.216/2001 e comorbidades.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "primeiro",
      "episodio",
      "psicose"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/regulacao-cfp-faq",
    "title": "Regulação CFP e CRP em Psicologia — FAQ | Registro, especialidades, ética",
    "description": "Treze perguntas frequentes sobre CFP, CRP, inscrição profissional, especialidades reconhecidas, supervisão, transferência de jurisdição e Código de Ética do Psicólogo.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "regulacao",
      "cfp"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/regulacao-ia-cfp-anvisa-pl-2338-2026-faq",
    "title": "Regulação de IA em saúde mental no Brasil em 2026 — FAQ | CFP, ANVISA, LGPD, PL 2338/2023",
    "description": "Doze perguntas sobre o cenário regulatório brasileiro de IA em Psicologia em 2026: Posicionamento CFP 03/07/2025, RDC ANVISA 657/2022, PL 2338/2023, LGPD Art. 11 e Art. 33, ANPD, responsabilidade civil, prontuário, chatbot terapêutico e formação ética.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "regulacao",
      "cfp",
      "anvisa",
      "2338",
      "2026"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/safe-messaging-lgbtqia-trevor-2026-faq",
    "title": "Safe Messaging para adolescente LGBTQIA+ — FAQ principal 2026 | Trevor Project, OMS, CVV 188",
    "description": "Doze perguntas sobre Safe Messaging Guidelines em adolescente LGBTQIA+: OMS 2024, Trevor Project 2024, ABRASCO, CVV 188, ECA Digital, Marco Civil, Resoluções CFP 01/2018, 01/2022, 11/2018, 06/2019, NSSI no TikTok, plano de segurança e ética profissional.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "safe",
      "messaging",
      "lgbtqia",
      "trevor",
      "2026"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/saude-mental-perinatal-faq",
    "title": "Saúde mental perinatal — FAQ | EPDS, depressão pós-parto, psicose puerperal, PNAISC",
    "description": "Dezessete perguntas frequentes sobre saúde mental perinatal: EPDS, depressão e ansiedade perinatal, psicose pós-parto, antidepressivo na gestação, SUS, PNAISC e formação aplicada.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "saude",
      "mental",
      "perinatal"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/tdah-adulto-faq",
    "title": "TDAH em adulto — FAQ | ASRS, DIVA-5, medicação, TCC adaptada e LBI",
    "description": "Dezessete perguntas frequentes sobre TDAH em adulto: rastreio com ASRS, DIVA-5, diferenciais, comorbidades, medicação de primeira linha, TCC, custo, laudo e LBI 13.146.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "tdah",
      "adulto"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/tdah-mulheres-adultas-faq",
    "title": "TDAH em mulher adulta — FAQ | apresentação feminina, ciclo hormonal, DIVA-5, perimenopausa",
    "description": "Dezessete perguntas frequentes sobre TDAH em mulher adulta: apresentação desatenta, ciclo menstrual, gestação, perimenopausa, comorbidades, DIVA-5, ASRS adaptado, tratamento cíclico e LBI.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "tdah",
      "mulheres",
      "adultas"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/tea-adulto-faq",
    "title": "TEA em adulto — FAQ | ADOS-2, AQ-50, CAT-Q, apresentação feminina, laudo e LBI",
    "description": "Dezessete perguntas frequentes sobre TEA em adulto: avaliação, ADOS-2, AQ-50, CAT-Q, apresentação feminina, comorbidades, custo, laudo, LBI 13.146 e escolha do avaliador.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "tea",
      "adulto"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/tea-camuflagem-mulheres-2026-faq",
    "title": "TEA em mulheres adultas, camuflagem e diagnóstico tardio — FAQ 2026",
    "description": "Doze perguntas sobre autismo em mulheres adultas, camuflagem (CAT-Q), diagnóstico tardio, ADOS-2 Módulo 4, RAADS-R, comorbidades, autistic burnout, interseccionalidade LGBTQIA+, envelhecimento, IA diagnóstica, regulação CFP e formação.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "tea",
      "camuflagem",
      "mulheres",
      "2026"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/tea-envelhecimento-faq",
    "title": "TEA e envelhecimento — FAQ | diagnóstico em 60+, comorbidades, demência, qualidade de vida",
    "description": "Quatorze perguntas frequentes sobre adulto autista 60+: diagnóstico tardio, custo cumulativo de camuflagem, aposentadoria, demência, suicídio, cuidador, residência terapêutica, herança, CIPTEA e qualidade de vida.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "tea",
      "envelhecimento"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/tea-mulheres-adultas-faq",
    "title": "TEA em mulher adulta — FAQ | camuflagem, CAT-Q, ADOS-2, comorbidades, atraso diagnóstico",
    "description": "Dezessete perguntas frequentes sobre TEA em mulher adulta: fenótipo feminino, camuflagem social, CAT-Q, ADOS-2 em adultas, sobreposição TEA-TDAH-TPL, anorexia, autistic burnout, maternidade autista e comorbidades autoimunes.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "tea",
      "mulheres",
      "adultas"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/faq/trauma-complexo-cptsd-faq",
    "title": "Trauma complexo CPTSD — FAQ | CID-11 6B41, ITQ, STAIR de Cloitre, EMDR e diferencial com TPB",
    "description": "Dezessete perguntas frequentes sobre trauma complexo (CPTSD): CID-11 6B41, ITQ, fases STAIR, EMDR adaptado, diferencial com TPB, violência doméstica, abuso infantil e fluxo SUS no Brasil.",
    "kind": "FAQ",
    "persona": null,
    "tags": [
      "faq",
      "trauma",
      "complexo",
      "cptsd"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/glossario",
    "title": "Glossário de pós-graduação em Psicologia — 35 termos técnicos definidos",
    "description": "Definições técnicas de áreas, conceitos, regulação e instituições em pós-graduação em Psicologia aplicada. CFP, SATEPSI, NR-1, MBA, especialização, áreas reconhecidas.",
    "kind": "Glossário",
    "persona": null,
    "tags": [
      "glossario",
      "glossário"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/glossario/conceitos-neuro",
    "title": "Glossário neuro — funções cognitivas, AVC, demência, BDNF, Hebb, Damásio",
    "description": "25 conceitos centrais de Neurociência aplicada e Neuropsicologia: funções cognitivas, atenção, memória de trabalho/episódica/semântica, funções executivas (Lezak), neuroplasticidade, sinapse, dopamina/serotonina/noradrenalina, AVC, TDAH, TEA, demência, Alzheimer, MCI, lobos, BDNF, Hebb, Damásio.",
    "kind": "Glossário",
    "persona": null,
    "tags": [
      "glossario",
      "conceitos",
      "neuro",
      "glossário"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/glossario/conceitos-pot",
    "title": "Glossário POT — cultura, clima, segurança psicológica, JD-R, Karasek, Siegrist",
    "description": "22 conceitos de Psicologia Organizacional e do Trabalho com autor e ano. Cultura (Schein), segurança psicológica (Edmondson), JD-R, Job Crafting, ERI Siegrist, demand-control Karasek, NR-1, people analytics, EX, lideranças, OKRs, BSC, ANOVA, regressão.",
    "kind": "Glossário",
    "persona": null,
    "tags": [
      "glossario",
      "conceitos",
      "pot",
      "glossário"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/glossario/instrumentos",
    "title": "Glossário de instrumentos de avaliação psicológica — WAIS-IV, MMPI-2, PHQ-9, COPSOQ",
    "description": "22 instrumentos de avaliação em Psicologia: WAIS-IV, WISC-V, RAVLT, Rey, Trail Making, Wisconsin, MMPI-2, BDI-II, BAI, PHQ-9, GAD-7, EPDS, AQ-50, ADOS-2, RAADS-R, ASRS, Vanderbilt, PERMA-Profiler, MBI-GS, COPSOQ, ERI, ABNT 14724.",
    "kind": "Glossário",
    "persona": null,
    "tags": [
      "glossario",
      "instrumentos",
      "glossário"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/glossario/metodos-terapeuticos",
    "title": "Glossário de métodos terapêuticos em Psicologia — TCC, ACT, DBT, EMDR, IPT",
    "description": "25 métodos psicoterapêuticos com autor, ano e evidência: TCC, ACT, DBT, MBSR, MBCT, EMDR, FAP, RFT, exposição prolongada, TF-CBT, IPT, terapia de esquemas, MI motivacional, terapia de família, sistêmica, gestalt, psicodrama, psicanálise.",
    "kind": "Glossário",
    "persona": null,
    "tags": [
      "glossario",
      "metodos",
      "terapeuticos",
      "glossário"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/glossario/regulacao",
    "title": "Glossário regulatório em Psicologia — CFP, CRP, MEC, SATEPSI, NR-1, LGPD",
    "description": "21 termos regulatórios essenciais para psicólogos clínicos, organizacionais e de trânsito. CFP, CRP, MEC, SATEPSI, NR-1, NR-17, GRO, eSocial, LGPD, LBI, Berenice Piana, MEI, ME e mais.",
    "kind": "Glossário",
    "persona": null,
    "tags": [
      "glossario",
      "regulacao",
      "glossário"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/guias",
    "title": "Guias práticos · passo-a-passo para profissionais",
    "description": "",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/atendimento-primeiro-episodio-psicose",
    "title": "Primeiro atendimento em primeiro episódio psicótico — guia 9 passos · DUP, CAPS, EIP, Family Intervention",
    "description": "Protocolo passo-a-passo para primeiro atendimento em primeiro episódio psicótico: DUP (Marshall 2005), avaliação de risco, aliança terapêutica, antipsicóticos em baixa dose, Family Intervention, articulação com CAPS/EIP e período crítico de Birchwood.",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "atendimento",
      "primeiro",
      "episodio",
      "psicose",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/avaliacao-ccl-biomarcadores-2026",
    "title": "Avaliação de Comprometimento Cognitivo Leve em 2026: protocolo com biomarcadores em plasma, MoCA e diferenciais",
    "description": "",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "avaliacao",
      "ccl",
      "biomarcadores",
      "2026",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/avaliacao-demencia-precoce-jovem-adulto-2026",
    "title": "Avaliar demência de início precoce em adulto 45-65 anos — HowTo 2026",
    "description": "Guia clínico em 10 passos para EOD: anamnese específica, bateria sensível a FTD/PPA/Alzheimer precoce, critérios principais 2024, neuroimagem RNM e FDG-PET, biomarcador p-tau217 e A/T/N, mimickers tratáveis, avaliação genética e plano longitudinal articulado com centro de referência.",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "avaliacao",
      "demencia",
      "precoce",
      "jovem",
      "adulto",
      "2026",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/avaliacao-saude-mental-perinatal",
    "title": "Avaliação de saúde mental perinatal — guia 9 passos · EPDS, GAD-7, screening universal, depressão pós-parto",
    "description": "Protocolo passo-a-passo para avaliação de saúde mental perinatal: EPDS (Cox 1987), GAD-7, screening universal em três momentos, depressão pós-parto, ansiedade perinatal, TEPT pós-parto, psicose puerperal e encaminhamento.",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "avaliacao",
      "saude",
      "mental",
      "perinatal",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/avaliacao-tdah-adulto",
    "title": "Avaliação de TDAH em adulto — guia 9 passos · ASRS-18, DIVA-5, DSM-5-TR, laudo CFP",
    "description": "Protocolo passo-a-passo para avaliação de TDAH em adulto: anamnese retrospectiva, ASRS-18, DIVA-5, neuropsicologia, diferenciais com TEA/ansiedade, prejuízo funcional, plano integrado e laudo conforme Resolução CFP 06/2019.",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "avaliacao",
      "tdah",
      "adulto",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/avaliacao-tdah-mulheres-adultas",
    "title": "Avaliação de TDAH em mulheres adultas — guia 10 passos · ASRS-18, DIVA-5, modulação hormonal, laudo CFP",
    "description": "Protocolo passo-a-passo para avaliação de TDAH em mulher adulta: anamnese com mascaramento, mapeamento hormonal cíclico, ASRS-18 sensibilizado, DIVA-5 ampliado, diferenciais com burnout, comorbidades específicas femininas, plano integrado e laudo CFP 06/2019.",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "avaliacao",
      "tdah",
      "mulheres",
      "adultas",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/avaliacao-tea-adulto",
    "title": "Avaliação de TEA em adulto — guia 9 passos · AQ-50, ADOS-2, RAADS-R, RBANS",
    "description": "Trajeto técnico para avaliação de TEA em adulto: triagem, observação ADOS-2 módulo 4, neuropsicologia, mascaramento, laudo CFP e orientação LBI 13.146/2015.",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "avaliacao",
      "tea",
      "adulto",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/avaliacao-tea-idosos-2026",
    "title": "Avaliar TEA em adulto idoso: protocolo 2026 para diferencial com demência e camuflagem prolongada",
    "description": "Guia clínico em 8 passos para TEA em adulto 60+: anamnese longitudinal com informante, AQ-50/RAADS-R/CAT-Q, ADOS-G adaptado e ADI-R, bateria com diferencial Alzheimer/DCL/PPA, p-tau217 articulado com médico, critérios DSM-5-TR/CID-11 e laudo conforme Resolução CFP 06/2019.",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "avaliacao",
      "tea",
      "idosos",
      "2026",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/avaliacao-tea-mulheres-adultas",
    "title": "Avaliação de TEA em mulher adulta — guia 9 passos · CAT-Q, ADOS-2, fenótipo feminino, laudo CFP",
    "description": "Protocolo passo-a-passo para avaliação de TEA em mulher adulta: anamnese retrospectiva com camuflagem, CAT-Q (Hull 2019), AQ-50 + RAADS-R ajustados, GQ-ASC vs ADOS-2, 3DI/ADI-R, diferenciais TPL/TDAH/anorexia, comorbidades e laudo CFP 06/2019.",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "avaliacao",
      "tea",
      "mulheres",
      "adultas",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/biomarcadores-plasma-alzheimer-protocolo-neuropsi-2026",
    "title": "Biomarcadores plasma Alzheimer (p-tau217) em 2026 — protocolo do neuropsicólogo em 10 passos",
    "description": "Como o neuropsicólogo se posiciona com p-tau217 plasmática disponível em 2026: indicação, articulação com neurologia, bateria pré e pós, CCL Petersen/NIA-AA, devolutiva e longitudinal.",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "biomarcadores",
      "plasma",
      "alzheimer",
      "protocolo",
      "neuropsi",
      "2026",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/conduzir-supervisao-stepped-care",
    "title": "Supervisão clínica em stepped-care no SUS — guia 8 passos · matriciamento, IAPT, discrimination model",
    "description": "Protocolo passo-a-passo para supervisão clínica em modelo stepped-care no SUS: mapa de rede, matriciamento, critérios de escalonamento por PHQ-9/GAD-7, formulação, contratransferência é avaliação por rubrica.",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "conduzir",
      "supervisao",
      "stepped",
      "care",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/construir-programa-bem-estar",
    "title": "Como construir programa de bem-estar evidence-based — guia 9 passos · PERMA, Job Crafting",
    "description": "Guia passo-a-passo para desenhar programa de bem-estar corporativo com base em PERMA, Job Crafting, segurança psicológica e mensuração. Portal independente.",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "construir",
      "programa",
      "bem",
      "estar",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/escalas-burnout-bat-mbi-olbi-cbi",
    "title": "Escalas de burnout no Brasil em 2026: como escolher e aplicar BAT, MBI, OLBI e CBI",
    "description": "Protocolo técnico em 9 passos para selecionar entre BAT (Schaufeli, 2020), MBI (Maslach, 1996), OLBI (Demerouti, 2003) e CBI (Kristensen, 2005), com cutoffs, validação brasileira, integração com NR-1 e Resolução CFP 06/2019.",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "escalas",
      "burnout",
      "bat",
      "mbi",
      "olbi",
      "cbi",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/escolher-supervisor-clinico",
    "title": "Como escolher supervisor clínico com método — guia 8 passos · CFP, contrato, sigilo",
    "description": "Critérios técnicos para escolher supervisor clínico, POT ou neuropsicológico: filiação teórica, contrato escrito, frequência, sigilo cruzado e revisão periódica.",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "escolher",
      "supervisor",
      "clinico",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/haidt-2026-update-evidencia-adolescencia-digital",
    "title": "Haidt 2026 update e adolescência digital — HowTo 10 passos | psicólogo escolar e clínico",
    "description": "Protocolo operacional em 10 passos: 4 normas fundadoras, debate Twenge vs Orben/Przybylski, Lei 15.100/2025, ECA Digital, ESM, neurociência 2024-2026, intervenção clínica e plano de 90 dias.",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "haidt",
      "2026",
      "update",
      "evidencia",
      "adolescencia",
      "digital",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/implementar-nr1-em-empresa",
    "title": "Como implementar a NR-1 atualizada na empresa — guia 9 passos · riscos psicossociais",
    "description": "Guia passo-a-passo para implementar a NR-1 atualizada com gestão de riscos psicossociais: comitê, instrumentos validados, treinamento de líder, GRO e ciclo PDCA.",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "implementar",
      "nr1",
      "empresa",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/integracao-ia-psicodiagnostico-clinica",
    "title": "IA generativa no psicodiagnóstico clínico — guia 9 passos · CFP 11/2018, LGPD, vieses, prompts auditáveis",
    "description": "Protocolo passo-a-passo para integrar IA generativa no psicodiagnóstico clínico com ética: Resolução CFP 11/2018, vieses algorítmicos, LGPD, prompts auditáveis, anonimização robusta e registro técnico.",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "integracao",
      "psicodiagnostico",
      "clinica",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/intervencao-adolescente-ideacao-suicida-algoritmos",
    "title": "Intervenção em adolescente com ideação suicida e algoritmos digitais — protocolo 9 passos",
    "description": "Guia clínico para psicólogos brasileiros: avaliação sem reexposição, Safety Planning Stanley-Brown adaptado, articulação CAPSi e CVV 188, Lei 15.100/2024 (celular em escolas), Lei 14.811/2024 (cyberbullying), Resolução CFP 003/2024, Safe Messaging Guidelines.",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "intervencao",
      "adolescente",
      "ideacao",
      "suicida",
      "algoritmos",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/intervencao-crise-suicida-zero-suicide",
    "title": "Conduzir intervenção em crise suicida com método (Zero Suicide)",
    "description": "",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "intervencao",
      "crise",
      "suicida",
      "zero",
      "suicide",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/jurisprudencia-nr1-tst-2026",
    "title": "Jurisprudência da NR-1 atualizada e burnout no TST/TRT em 2026 — HowTo 10 passos | Portaria 765/2025",
    "description": "Protocolo em 10 passos para advogados trabalhistas, psicólogos peritos, gestores SST e RH lerem decisões pós-vigência fiscalizatória da NR-1 psicossocial em 2026: fontes primárias, perícia, defesa documental, padrões de indenização.",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "jurisprudencia",
      "nr1",
      "tst",
      "2026",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/manejo-trauma-complexo-cptsd",
    "title": "Conduzir manejo de trauma complexo (CPTSD/TEPT-C)",
    "description": "",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "manejo",
      "trauma",
      "complexo",
      "cptsd",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/neuropsi-long-covid-brain-fog",
    "title": "Conduzir avaliação neuropsicológica em long COVID/brain fog",
    "description": "",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "neuropsi",
      "long",
      "covid",
      "brain",
      "fog",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/notas-clinicas-ia-implantar-consultorio-2026",
    "title": "Implantar notas clínicas por IA no consultório em 2026 — HowTo 10 passos | LGPD, CFP, auditoria",
    "description": "Protocolo operacional em 10 passos para psicólogos brasileiros: LGPD Art. 11 e 33, CFP 11/2018, CFP 06/2019, RDC 657/2022, redação supervisionada, hospedagem, auditoria trimestral e política de incidente.",
    "kind": "Guia",
    "persona": "consultores",
    "tags": [
      "guias",
      "notas",
      "clinicas",
      "implantar",
      "consultorio",
      "2026",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/protocolo-act-burnout-saude",
    "title": "Protocolo ACT 8 sessões para burnout em profissionais da saúde — guia · hexaflex, MBI, NR-1",
    "description": "Protocolo de Terapia de Aceitação e Compromisso (ACT) em 8 sessões para burnout em profissionais da saúde: CID-11 dimensões, MBI-GS, hexaflex, desfusão, valores, ações comprometidas e NR-1.",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "protocolo",
      "act",
      "burnout",
      "saude",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/protocolo-burnout-academico-pos-graduacao",
    "title": "Protocolo de burnout em pós-graduação 2026: 9 passos para coordenação e clínica",
    "description": "Como manejar burnout em estudante de pós-graduação no Brasil em 2026. Triagem com PHQ-9, GAD-7 e MBI-SS, encaminhamento, ajuste de orientação, NR-1 universitária, sigilo e plano clínico integrado.",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "protocolo",
      "burnout",
      "academico",
      "pos",
      "graduacao",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/retorno-ao-trabalho-pos-burnout",
    "title": "Retorno ao trabalho pós-burnout — guia 9 passos · plano escalonado e revisão 90/180 dias",
    "description": "Protocolo passo-a-passo para retorno gradual ao trabalho após licença por saúde mental: comunicação com líder, ajustes razoáveis, monitoramento e revisão estrutural.",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "retorno",
      "trabalho",
      "pos",
      "burnout",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/supervisao-async-ia-2026-protocolo-cfp",
    "title": "Supervisão clínica assíncrona com apoio de IA em 2026: protocolo em 10 passos sob CFP e LGPD.",
    "description": "",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "supervisao",
      "async",
      "2026",
      "protocolo",
      "cfp",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/tea-camuflagem-mulheres-evidencia-2026",
    "title": "Avaliação de TEA em mulher adulta com camuflagem em 2026 — HowTo 10 passos | CAT-Q, ADOS-2, diferencial",
    "description": "Protocolo em 10 passos para psicólogas e psicólogos brasileiros: finalidade, CAT-Q (Hull et al.), RAADS-R, AQ-50, ADOS-2 Módulo 4 com lente feminina, diferencial TDAH/TPB/CPTSD, autistic burnout (Raymaker 2020), interseccionalidade LGBTQIA+ e devolutiva ética.",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "tea",
      "camuflagem",
      "mulheres",
      "evidencia",
      "2026",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/uso-etico-ia-clinica",
    "title": "Uso ético de IA generativa na clínica — guia 9 passos · sigilo, LGPD, viés, CFP, APA",
    "description": "Guia passo-a-passo para uso ético de ChatGPT, Claude e Copilot em prática clínica: sigilo, LGPD, viés algorítmico, consentimento, alertas APA 2024-2026 e Resolução CFP.",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "uso",
      "etico",
      "clinica",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/guias/uso-etico-ia-generativa-2026",
    "title": "Uso ético de IA generativa na clínica em 2026 — protocolo em 9 passos · CFP, LGPD, viés, deepfakes",
    "description": "Protocolo operacional para psicólogos brasileiros: caso de uso, Resolução CFP 11/2018, Posicionamento CFP 07/2025, LGPD prontuário, desidentificação, escolha de modelo, viés, deepfakes e documentação pericial.",
    "kind": "Guia",
    "persona": null,
    "tags": [
      "guias",
      "uso",
      "etico",
      "generativa",
      "2026",
      "guia"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/intervencoes",
    "title": "Protocolos de intervenção baseados em evidência: stepped care, IAPT, matriciamento, crise, retorno ao trabalho",
    "description": "Mapa técnico dos cinco protocolos de intervenção em saúde mental com maior suporte empírico: indicações, evidência, custos e aplicação no SUS, em empresas e em consultório. Conteúdo independente.",
    "kind": "Intervenção",
    "persona": null,
    "tags": [
      "intervencoes",
      "intervenção"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/intervencoes/atencao-primaria-matriciamento",
    "title": "Atenção primária à saúde mental e matriciamento: fundamentação e prática no SUS",
    "description": "Fundamentação técnica do matriciamento de Campos e Domitti (2007): arranjo organizacional, RAPS, PNAB 2017, eMulti, mhGAP e indicadores de implementação. Conteúdo independente.",
    "kind": "Intervenção",
    "persona": null,
    "tags": [
      "intervencoes",
      "atencao",
      "primaria",
      "matriciamento",
      "intervenção"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/intervencoes/iapt-nhs",
    "title": "IAPT / NHS Talking Therapies: fundamentação, evidência e lições para o Brasil",
    "description": "Análise técnica do IAPT inglês (hoje NHS Talking Therapies): origem em David Clark, stepped care em escala, formação massiva, taxas de recuperação e adaptação ao SUS. Conteúdo independente.",
    "kind": "Intervenção",
    "persona": null,
    "tags": [
      "intervencoes",
      "iapt",
      "nhs",
      "intervenção"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/intervencoes/intervencao-crise",
    "title": "Intervenção em crise: protocolos de avaliação, estabilização e seguimento (Caplan, Roberts, OMS, RAPS)",
    "description": "Fundamentação técnica da intervenção em crise: Caplan (1964), Roberts (2005), avaliação de risco suicida, Primeiros Cuidados Psicológicos da OMS, dispositivos da RAPS, SAMU, CAPS, posvenção. Conteúdo independente.",
    "kind": "Intervenção",
    "persona": null,
    "tags": [
      "intervencoes",
      "intervencao",
      "crise",
      "intervenção"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/intervencoes/retorno-ao-trabalho",
    "title": "Protocolo de retorno ao trabalho pós-afastamento por saúde mental: fundamentos, OMS, NR-1 e ajustes razoáveis",
    "description": "Fundamentação técnica do protocolo de retorno ao trabalho: produção brasileira recente, diretrizes OMS (2022), ajustes razoáveis, retorno gradual, NR-1 e seguimento. Conteúdo independente.",
    "kind": "Intervenção",
    "persona": null,
    "tags": [
      "intervencoes",
      "retorno",
      "trabalho",
      "intervenção"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/intervencoes/stepped-care",
    "title": "Stepped Care: cuidado escalonado para depressão e ansiedade — fundamentos, NICE, IAPT e RAPS",
    "description": "Fundamentação do modelo de stepped care: origem em Bower e Gilbody (2005), diretrizes NICE CG90 e CG113, aplicação no IAPT inglês e adaptações no SUS brasileiro. Conteúdo independente.",
    "kind": "Intervenção",
    "persona": null,
    "tags": [
      "intervencoes",
      "stepped",
      "care",
      "intervenção"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/mapa-do-site",
    "title": "Mapa do site — posgraduacaopsicologia.com",
    "description": "Mapa completo do portal independente: áreas da Psicologia, MBAs, comparativos, temas, estados, carreiras, recursos e regulação.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "mapa",
      "site",
      "recurso"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/mbas",
    "title": "MBAs em Psicologia · uma das cinco modalidades de pós-graduação — guia independente IPOG",
    "description": "Os 5 MBAs em destaque do IPOG (POT, Positiva, Reabilitação Neuro, Neurociência, Liderança) com perfis recomendados, competências desenvolvidas e páginas detalhe. MBA é uma das cinco modalidades principais de pós-graduação em Psicologia cobertas pelo portal.",
    "kind": "MBA",
    "persona": null,
    "tags": [
      "mbas",
      "mba"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/mbas/mba-lideranca-positiva",
    "title": "MBA em Gestão de Pessoas e Liderança Positiva — análise do programa do IPOG",
    "description": "Análise editorial independente do MBA do IPOG em Liderança Positiva. Para quem é, competências, limites, carreira e como integrar segurança psicológica, performance e ESG.",
    "kind": "MBA",
    "persona": "lideres",
    "tags": [
      "mbas",
      "mba",
      "lideranca",
      "positiva"
    ],
    "weight": 1.15,
    "pageType": null
  },
  {
    "route": "/mbas/mba-lideranca-positiva/grade-curricular",
    "title": "Grade curricular do MBA em Gestão de Pessoas e Liderança Positiva — eixos esperados",
    "description": "Eixos disciplinares típicos de um MBA em Liderança Positiva: people-first, cultura, segurança psicológica, gestão por significado, performance saudável. Grade vigente em ipog.edu.br.",
    "kind": "MBA",
    "persona": "lideres",
    "tags": [
      "mbas",
      "mba",
      "lideranca",
      "positiva",
      "grade",
      "curricular"
    ],
    "weight": 1.15,
    "pageType": null
  },
  {
    "route": "/mbas/mba-lideranca-positiva/metodologia",
    "title": "Metodologia do MBA em Liderança Positiva — Ao Vivo síncrono, simulação de conversa e prática de feedback",
    "description": "Como funciona um MBA em Liderança Positiva no formato Ao Vivo síncrono: simulação de conversa difícil, prática de feedback, discussão de caso real. Diferença para EAD gravado.",
    "kind": "MBA",
    "persona": "lideres",
    "tags": [
      "mbas",
      "mba",
      "lideranca",
      "positiva",
      "metodologia"
    ],
    "weight": 1.15,
    "pageType": null
  },
  {
    "route": "/mbas/mba-lideranca-positiva/perfil-do-aluno",
    "title": "Perfil do aluno do MBA em Liderança Positiva — quem cursa, pré-requisitos e motivações",
    "description": "Quem realmente faz um MBA em Gestão de Pessoas e Liderança Positiva: gestores, executivos, RH, consultores. Pré-requisitos lato sensu, motivações e ponto de virada de carreira.",
    "kind": "MBA",
    "persona": "lideres",
    "tags": [
      "mbas",
      "mba",
      "lideranca",
      "positiva",
      "perfil",
      "aluno"
    ],
    "weight": 1.15,
    "pageType": null
  },
  {
    "route": "/mbas/mba-ncpp",
    "title": "MBA em Neurociência e Psicologia Positiva no Desenvolvimento Humano — análise do programa do IPOG",
    "description": "Análise editorial independente do MBA do IPOG que combina neurociência aplicada e psicologia positiva. Para quem é, competências, limites, carreira e como distinguir de neurociência em curso livre.",
    "kind": "MBA",
    "persona": null,
    "tags": [
      "mbas",
      "mba",
      "ncpp"
    ],
    "weight": 1.15,
    "pageType": null
  },
  {
    "route": "/mbas/mba-ncpp/grade-curricular",
    "title": "Grade curricular do MBA em Neurociência e Psicologia Positiva — integração ciência e bem-estar",
    "description": "Eixos disciplinares esperados em um MBA que integra neurociência cognitiva e Psicologia Positiva no desenvolvimento humano: cérebro, emoção, aprendizagem, propósito, performance. Grade vigente em ipog.edu.br.",
    "kind": "MBA",
    "persona": null,
    "tags": [
      "mbas",
      "mba",
      "ncpp",
      "grade",
      "curricular"
    ],
    "weight": 1.15,
    "pageType": null
  },
  {
    "route": "/mbas/mba-ncpp/metodologia",
    "title": "Metodologia do MBA em Neurociência e Psicologia Positiva — Ao Vivo síncrono, ciência aplicada e desenho de programa",
    "description": "Como funciona um MBA integrador de Neurociência e Psicologia Positiva no formato Ao Vivo síncrono: leitura de paper, prática de intervenção, desenho de programa fundamentado em evidência.",
    "kind": "MBA",
    "persona": null,
    "tags": [
      "mbas",
      "mba",
      "ncpp",
      "metodologia"
    ],
    "weight": 1.15,
    "pageType": null
  },
  {
    "route": "/mbas/mba-ncpp/perfil-do-aluno",
    "title": "Perfil do aluno do MBA em Neurociência e Psicologia Positiva — quem cursa, pré-requisitos e motivações",
    "description": "Quem realmente faz um MBA em Neurociência e Psicologia Positiva no Desenvolvimento Humano: psicólogos, educadores, profissionais de desenvolvimento humano, lideranças. Pré-requisitos lato sensu.",
    "kind": "MBA",
    "persona": null,
    "tags": [
      "mbas",
      "mba",
      "ncpp",
      "perfil",
      "aluno"
    ],
    "weight": 1.15,
    "pageType": null
  },
  {
    "route": "/mbas/mba-neuro",
    "title": "MBA em Reabilitação Neuropsicológica e Desenvolvimento Cognitivo — análise do programa do IPOG",
    "description": "Análise editorial independente do MBA do IPOG em Reabilitação Neuropsicológica: para quem é, competências clínicas desenvolvidas, limites regulatórios, carreira e como diferencia de avaliação e estimulação.",
    "kind": "MBA",
    "persona": null,
    "tags": [
      "mbas",
      "mba",
      "neuro"
    ],
    "weight": 1.15,
    "pageType": null
  },
  {
    "route": "/mbas/mba-neuro/grade-curricular",
    "title": "Grade curricular do MBA em Reabilitação Neuropsicológica e Desenvolvimento Cognitivo — eixos esperados",
    "description": "Eixos disciplinares típicos de um MBA em Reabilitação Neuropsicológica: bases neuroanatômicas, funções cognitivas, avaliação, plano de reabilitação, neuroplasticidade. Grade vigente em ipog.edu.br.",
    "kind": "MBA",
    "persona": null,
    "tags": [
      "mbas",
      "mba",
      "neuro",
      "grade",
      "curricular"
    ],
    "weight": 1.15,
    "pageType": null
  },
  {
    "route": "/mbas/mba-neuro/metodologia",
    "title": "Metodologia do MBA em Reabilitação Neuropsicológica — Ao Vivo síncrono, casos clínicos e bateria estruturada",
    "description": "Como funciona, na prática, um MBA em Reabilitação Neuropsicológica no formato Ao Vivo síncrono: discussão de caso clínico, análise de bateria, desenho de plano de reabilitação. Diferença para EAD gravado.",
    "kind": "MBA",
    "persona": null,
    "tags": [
      "mbas",
      "mba",
      "neuro",
      "metodologia"
    ],
    "weight": 1.15,
    "pageType": null
  },
  {
    "route": "/mbas/mba-neuro/perfil-do-aluno",
    "title": "Perfil do aluno do MBA em Reabilitação Neuropsicológica — quem cursa, pré-requisitos e motivações",
    "description": "Quem realmente faz um MBA em Reabilitação Neuropsicológica e Desenvolvimento Cognitivo: psicólogos, profissionais de saúde, educadores. Pré-requisitos lato sensu e armadilhas comuns.",
    "kind": "MBA",
    "persona": null,
    "tags": [
      "mbas",
      "mba",
      "neuro",
      "perfil",
      "aluno"
    ],
    "weight": 1.15,
    "pageType": null
  },
  {
    "route": "/mbas/mba-positiva",
    "title": "MBA em Psicologia Positiva, Saúde Mental e Bem-Estar nas Organizações — análise do programa do IPOG",
    "description": "Análise editorial do MBA do IPOG em Psicologia Positiva e Bem-Estar Corporativo: para quem é, competências, limites regulatórios, carreira e como diferenciar da pop psychology.",
    "kind": "MBA",
    "persona": null,
    "tags": [
      "mbas",
      "mba",
      "positiva"
    ],
    "weight": 1.15,
    "pageType": null
  },
  {
    "route": "/mbas/mba-positiva/grade-curricular",
    "title": "Grade curricular do MBA em Psicologia Positiva, Saúde Mental e Bem-Estar — eixos disciplinares esperados",
    "description": "Análise editorial dos eixos típicos de um MBA em Psicologia Positiva e bem-estar nas organizações: PERMA, forças, flow, segurança psicológica, NR-1. Grade vigente em ipog.edu.br.",
    "kind": "MBA",
    "persona": null,
    "tags": [
      "mbas",
      "mba",
      "positiva",
      "grade",
      "curricular"
    ],
    "weight": 1.15,
    "pageType": null
  },
  {
    "route": "/mbas/mba-positiva/metodologia",
    "title": "Metodologia do MBA em Psicologia Positiva e Bem-Estar — Ao Vivo síncrono, casos reais e práticas aplicadas",
    "description": "Como funciona um MBA em Psicologia Positiva no formato Ao Vivo síncrono: docente nominal, prática de intervenções, escalas validadas, projeto aplicado. Diferença para EAD massificado.",
    "kind": "MBA",
    "persona": null,
    "tags": [
      "mbas",
      "mba",
      "positiva",
      "metodologia"
    ],
    "weight": 1.15,
    "pageType": null
  },
  {
    "route": "/mbas/mba-positiva/perfil-do-aluno",
    "title": "Perfil do aluno do MBA em Psicologia Positiva — quem cursa, pré-requisitos e motivações",
    "description": "Quem realmente faz um MBA em Psicologia Positiva e Bem-Estar nas Organizações: psicólogos, RH, líderes, profissionais de saúde. Pré-requisitos lato sensu e armadilhas comuns.",
    "kind": "MBA",
    "persona": null,
    "tags": [
      "mbas",
      "mba",
      "positiva",
      "perfil",
      "aluno"
    ],
    "weight": 1.15,
    "pageType": null
  },
  {
    "route": "/mbas/mba-pot",
    "title": "MBA em Psicologia Organizacional e do Trabalho — análise técnica do programa do IPOG",
    "description": "O que realmente entrega um MBA em POT, para quem é, competências desenvolvidas, carreira e limites regulatórios. Portal independente sobre o programa do IPOG.",
    "kind": "MBA",
    "persona": null,
    "tags": [
      "mbas",
      "mba",
      "pot"
    ],
    "weight": 1.15,
    "pageType": null
  },
  {
    "route": "/mbas/mba-pot/grade-curricular",
    "title": "Grade curricular do MBA em Psicologia Organizacional e do Trabalho — eixos, disciplinas e carga horária esperada",
    "description": "Análise editorial dos eixos disciplinares típicos de um MBA em POT lato sensu: cultura, NR-1, liderança, people analytics, TCC. Grade vigente em ipog.edu.br.",
    "kind": "MBA",
    "persona": null,
    "tags": [
      "mbas",
      "mba",
      "pot",
      "grade",
      "curricular"
    ],
    "weight": 1.15,
    "pageType": null
  },
  {
    "route": "/mbas/mba-pot/metodologia",
    "title": "Metodologia do MBA em Psicologia Organizacional e do Trabalho — Ao Vivo síncrono, discussão de caso e corpo docente nominal",
    "description": "Como funciona, na prática, um MBA em POT no formato Ao Vivo síncrono: aula com docente nominal, debate de caso, exercícios aplicados, avaliação contínua. Diferença para EAD gravado.",
    "kind": "MBA",
    "persona": null,
    "tags": [
      "mbas",
      "mba",
      "pot",
      "metodologia"
    ],
    "weight": 1.15,
    "pageType": null
  },
  {
    "route": "/mbas/mba-pot/perfil-do-aluno",
    "title": "Perfil do aluno do MBA em POT — quem cursa, pré-requisitos e ponto de virada de carreira",
    "description": "Quem realmente faz um MBA em Psicologia Organizacional e do Trabalho: psicólogos, business partners, líderes, consultores. Pré-requisitos lato sensu, motivações e armadilhas.",
    "kind": "MBA",
    "persona": null,
    "tags": [
      "mbas",
      "mba",
      "pot",
      "perfil",
      "aluno"
    ],
    "weight": 1.15,
    "pageType": null
  },
  {
    "route": "/measurement-geo",
    "title": "Measurement GEO 2026 — KPIs, frameworks e atribuição zero-click | Brasil GEO",
    "description": "Estado da arte de medição GEO em 2026: 24 KPIs principais (Mention Rate, Citation Rate, SoV-AI), regex GA4 de produção, server logs com bots de ChatGPT, Claude e Perplexity, e benchmarks com URL para cada número.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "measurement",
      "geo",
      "recurso"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/metodos",
    "title": "Métodos psicoterapêuticos baseados em evidência: TCC, ACT, DBT, Mindfulness, EMDR",
    "description": "Mapa técnico dos cinco métodos com maior suporte empírico em psicoterapia: indicações, evidência, formação e limites. Conteúdo independente, fontes oficiais.",
    "kind": "Método",
    "persona": null,
    "tags": [
      "metodos",
      "método"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/metodos/act",
    "title": "Terapia de Aceitação e Compromisso (ACT): fundamentos e evidência",
    "description": "Fundamentação técnica da ACT: hexaflex de flexibilidade psicológica, evidência empírica em dor crônica e ansiedade, formação no Brasil. Conteúdo independente.",
    "kind": "Método",
    "persona": null,
    "tags": [
      "metodos",
      "act",
      "método"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/metodos/dbt",
    "title": "Terapia Comportamental Dialética (DBT): fundamentos e evidência",
    "description": "Fundamentação técnica da DBT: origem em Linehan, quatro módulos, programa padrão de 12 meses, evidência gold standard para TPB e formação no Brasil.",
    "kind": "Método",
    "persona": null,
    "tags": [
      "metodos",
      "dbt",
      "método"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/metodos/emdr",
    "title": "EMDR (Eye Movement Desensitization and Reprocessing): fundamentos e evidência",
    "description": "Fundamentação técnica do EMDR: origem em Shapiro, oito fases do protocolo, evidência empírica forte para TEPT, formação no Brasil. Conteúdo independente.",
    "kind": "Método",
    "persona": null,
    "tags": [
      "metodos",
      "emdr",
      "método"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/metodos/mindfulness",
    "title": "Mindfulness clínico (MBSR e MBCT): fundamentos, evidência e formação",
    "description": "Fundamentação técnica do mindfulness clínico: origem em Kabat-Zinn, protocolos MBSR e MBCT, evidência empírica em depressão recorrente. Conteúdo independente.",
    "kind": "Método",
    "persona": null,
    "tags": [
      "metodos",
      "mindfulness",
      "método"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/metodos/tcc",
    "title": "Terapia Cognitivo-Comportamental (TCC): fundamentos, evidência e formação",
    "description": "Fundamentação técnica da TCC: origem em Beck e Ellis, princípios, evidência empírica em meta-análises e caminho de formação no Brasil. Conteúdo independente.",
    "kind": "Método",
    "persona": null,
    "tags": [
      "metodos",
      "tcc",
      "método"
    ],
    "weight": 0.95,
    "pageType": null
  },
  {
    "route": "/para-quem",
    "title": "Para quem — trilhas de pós-graduação em Psicologia por perfil profissional",
    "description": "Psicólogos, RH, líderes ou consultores: a formação muda. Análise técnica de qual MBA ou especialização combina com cada perfil e estágio de carreira.",
    "kind": "Persona",
    "persona": null,
    "tags": [
      "para",
      "quem",
      "persona"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/para-quem/consultores",
    "title": "Pós-graduação em Psicologia para consultores — POT, Liderança Positiva e Psicologia Positiva",
    "description": "Consultor em pessoas, cultura ou bem-estar decide melhor com mapa. Especialização técnica vs MBA aplicado, retaguarda teórica e construção de método.",
    "kind": "Persona",
    "persona": "consultores",
    "tags": [
      "para",
      "quem",
      "consultores",
      "persona"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/para-quem/lideres",
    "title": "Pós-graduação em Psicologia para líderes e executivos — Liderança Positiva, POT e Neurociência aplicada",
    "description": "Por que MBA aplicado em Psicologia vale mais que MBA generalista para líder. Análise técnica de Liderança Positiva, POT e Neurociência aplicada por nível.",
    "kind": "Persona",
    "persona": null,
    "tags": [
      "para",
      "quem",
      "lideres",
      "persona"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/para-quem/psicologos",
    "title": "Pós-graduação em Psicologia para psicólogos — trilhas por estágio de carreira",
    "description": "Psicólogo formado decide melhor com mapa. Onde MBA agrega, onde especialização é o caminho direto, e como ler CFP, SATEPSI e corpo docente.",
    "kind": "Persona",
    "persona": "psicologos",
    "tags": [
      "para",
      "quem",
      "psicologos",
      "persona"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/para-quem/rh",
    "title": "Pós-graduação em Psicologia para RH — POT, Liderança Positiva ou Psicologia Positiva",
    "description": "Profissional de RH decide melhor com mapa. Análise técnica de qual MBA combina com cada estágio: business partner, T&D, cultura, C&B, analytics.",
    "kind": "Persona",
    "persona": null,
    "tags": [
      "para",
      "quem",
      "persona"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado",
    "title": "Pós-graduação em Psicologia por estado — 27 UFs",
    "description": "Mapa nacional de pós-graduação em Psicologia: cobertura por estado e regiao. Modalidades online é ao vivo do IPOG.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/por-estado/[uf]",
    "title": "Pós-graduação em Psicologia em {estado.nome}.",
    "description": "",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado",
      "[uf]"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/ac",
    "title": "Pós-graduação em Psicologia no Acre (AC): mercado, salário e formato",
    "description": "Psicologia aplicada no Acre: Rio Branco, Cruzeiro do Sul, SUS, justiça, fronteira e por que ficar e construir mercado local vale mais do que migrar.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/al",
    "title": "Pós-graduação em Psicologia em Alagoas (AL): mercado, salário e formato",
    "description": "Psicologia aplicada em Alagoas: Maceió, Arapiraca, Marechal Deodoro. Turismo de alto padrão, saúde, sucroalcooleiro, reparação socioambiental Braskem e formato Ao Vivo síncrono.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/am",
    "title": "Pós-graduação em Psicologia no Amazonas (AM): mercado, salário e formato",
    "description": "Psicologia aplicada no Amazonas: Manaus, PIM, interior amazônico, fronteira. POT corporativo, NR-1, saúde pública e por que o formato Ao Vivo síncrono é o melhor encaixe.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/ap",
    "title": "Pós-graduação em Psicologia no Amapá (AP): mercado, salário e formato",
    "description": "Psicologia aplicada no Amapá: Macapá, Santana, Oiapoque, SUS, fronteira, mineração e por que construir mercado local vale mais do que migrar.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/ba",
    "title": "Pós-graduação em Psicologia na Bahia (BA): mercado, salário e formato",
    "description": "Psicologia aplicada na Bahia: Salvador, Camaçari, Feira, Barreiras, Juazeiro. Petroquímico, agro irrigado, saúde regional e POT corporativo em escala.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/ce",
    "title": "Pós-graduação em Psicologia no Ceará (CE): mercado, salário e formato",
    "description": "Psicologia aplicada no Ceará: Fortaleza, Sobral, Cariri. Hapvida, tech, indústria, saúde regional e por que o formato Ao Vivo síncrono é o melhor encaixe.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/df",
    "title": "Pós-graduação em Psicologia no Distrito Federal (DF): mercado, salário e formato",
    "description": "Mercado do Distrito Federal para Psicologia aplicada: servidor público, tribunais, mediana mais alta do país e formato Ao Vivo síncrono ideal para a agenda do servidor.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/es",
    "title": "Pós-graduação em Psicologia no Espírito Santo (ES): mercado, salário e formato",
    "description": "Mercado capixaba de Psicologia: Vitória, Serra, Vila Velha, Cachoeiro do Itapemirim, mediana salarial e formato Ao Vivo síncrono ideal para o profissional do estado.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/go",
    "title": "Pós-graduação em Psicologia em Goiás (GO): agro, saúde e a sede do IPOG",
    "description": "Mercado goiano de Psicologia: Goiânia, Anápolis, Aparecida e Rio Verde. Agroindústria, saúde, governo e educação como bases de demanda. IPOG nasceu aqui.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/ma",
    "title": "Pós-graduação em Psicologia no Maranhão (MA): mercado, salário e formato",
    "description": "Psicologia aplicada no Maranhão: São Luís, Imperatriz, Açailândia, Balsas. Vale, siderurgia, Matopiba, saúde regional e por que o formato Ao Vivo síncrono é o melhor encaixe.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/mg",
    "title": "Pós-graduação em Psicologia em Minas Gerais (MG): corporativo clássico e indústria",
    "description": "Mercado mineiro de Psicologia: BH, Contagem, Juiz de Fora, Uberlândia e Uberaba. Indústria, mineração, automotivo e agro como bases de demanda em POT.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/ms",
    "title": "Pós-graduação em Psicologia em Mato Grosso do Sul (MS): mercado, salário e formato",
    "description": "Mercado sul-mato-grossense de Psicologia: Campo Grande, Dourados, Três Lagoas, Corumbá, mediana salarial e formato Ao Vivo síncrono ideal para o profissional do estado.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/mt",
    "title": "Pós-graduação em Psicologia em Mato Grosso (MT): mercado, salário e formato",
    "description": "Mercado mato-grossense de Psicologia: Cuiabá, Rondonópolis, Sorriso, Sinop, Lucas do Rio Verde, mediana salarial e formato Ao Vivo síncrono ideal para o profissional do MT.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/pa",
    "title": "Pós-graduação em Psicologia no Pará (PA): mercado, salário e formato",
    "description": "Psicologia aplicada no Pará: Belém, Marabá, Parauapebas, Santarém. Mineração, agro, saúde regional, NR-1 industrial e por que o formato Ao Vivo síncrono é o melhor encaixe.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/pb",
    "title": "Pós-graduação em Psicologia na Paraíba (PB): mercado, salário e formato",
    "description": "Mercado paraibano de Psicologia aplicada: João Pessoa, Campina Grande, setores que demandam, mediana salarial e por que online ao vivo combina com o profissional da PB.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/pe",
    "title": "Pós-graduação em Psicologia em Pernambuco (PE): mercado, salário e formato",
    "description": "Mercado pernambucano de Psicologia: Recife como polo médico e tech, Caruaru e Petrolina, mediana salarial e formato Ao Vivo síncrono ideal para o profissional do estado.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/pi",
    "title": "Pós-graduação em Psicologia no Piauí (PI): mercado, salário e formato",
    "description": "Mercado piauiense de Psicologia: Teresina, Parnaíba e Picos, mediana salarial e formato Ao Vivo síncrono ideal para o profissional do estado.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/pr",
    "title": "Pós-graduação em Psicologia no Paraná (PR): saúde mental corporativa e cooperativismo",
    "description": "Mercado paranaense de Psicologia: Curitiba, Maringá, Londrina, Cascavel e Foz do Iguaçu. Saúde mental corporativa, cooperativismo, agro e tech como bases de demanda.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/rj",
    "title": "Pós-graduação em Psicologia no Rio de Janeiro (RJ): hospitalar, forense e POT",
    "description": "Mercado fluminense de Psicologia: hubs, hospitais, sistema de justiça, óleo e gás e mediana salarial. Por que recortes especializados ganham no RJ.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/rn",
    "title": "Pós-graduação em Psicologia no Rio Grande do Norte (RN): mercado, salário e formato",
    "description": "Mercado potiguar de Psicologia: Natal, Mossoró, Bacia Potiguar e Vale do Açu, mediana salarial e formato Ao Vivo síncrono ideal para o profissional do estado.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/ro",
    "title": "Pós-graduação em Psicologia em Rondônia (RO): mercado, salário e formato",
    "description": "Psicologia aplicada em Rondônia: Porto Velho, Ji-Paraná, Vilhena. Frigoríficos, hidrelétricas do Madeira, agro de fronteira e POT industrial em escala.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/rr",
    "title": "Pós-graduação em Psicologia em Roraima (RR): mercado, salário e formato",
    "description": "Psicologia aplicada em Roraima: Boa Vista, Pacaraima, fronteira, migração, povos indígenas. Operação Acolhida, agências internacionais e nicho humanitário.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/rs",
    "title": "Pós-graduação em Psicologia no Rio Grande do Sul (RS): mercado, salário e formato",
    "description": "Mercado gaúcho de Psicologia: Porto Alegre, Caxias do Sul, Pelotas, Novo Hamburgo, mediana salarial e formato Ao Vivo síncrono ideal para o profissional do estado.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/sc",
    "title": "Pós-graduação em Psicologia em Santa Catarina (SC): mercado, salário e formato",
    "description": "Mercado catarinense de Psicologia: Florianópolis, Joinville, Blumenau, Chapecó, mediana salarial e formato Ao Vivo síncrono ideal para o profissional do estado.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/se",
    "title": "Pós-graduação em Psicologia em Sergipe (SE): mercado, salário e formato",
    "description": "Mercado sergipano de Psicologia: Aracaju, Itabaiana e Lagarto, mediana salarial e formato Ao Vivo síncrono ideal para o profissional do estado.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/sp",
    "title": "Pós-graduação em Psicologia em São Paulo (SP): mercado, salário e formato",
    "description": "Mercado paulista de Psicologia aplicada: cidades-hub, setores que demandam, mediana salarial pelo Catho e por que online ao vivo combina com agenda densa em SP.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/por-estado/to",
    "title": "Pós-graduação em Psicologia no Tocantins (TO): mercado, salário e formato",
    "description": "Psicologia aplicada no Tocantins: Palmas, Araguaína, Gurupi, Matopiba. Agro de larga escala, serviço público, POT em expansão e formato Ao Vivo síncrono.",
    "kind": "Estado",
    "persona": null,
    "tags": [
      "por",
      "estado"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/pos-graduacao-psicologia",
    "title": "Pós-graduação em Psicologia no Brasil — guia completo para MBA, especialização e área de atuação",
    "description": "Guia completo e independente sobre pós-graduação em Psicologia no Brasil: lato sensu vs stricto sensu, MBA vs especialização, as 13 especialidades reconhecidas pelo CFP, regulação MEC e SATEPSI, custo, prazo e ROI honesto.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "pos",
      "graduacao",
      "psicologia",
      "recurso"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/pos-graduacao-psicologia/como-escolher",
    "title": "Como escolher uma pós em Psicologia em 2026 — checklist de decisão",
    "description": "Sete critérios de decisão com peso para escolher pós lato sensu em Psicologia em 2026. Cargo pretendido, modalidade, corpo docente, credenciamento, rede, foco, orçamento — sinais fortes e de alerta.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "pos",
      "graduacao",
      "psicologia",
      "como",
      "escolher",
      "recurso"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/pos-graduacao-psicologia/mba-vs-especializacao",
    "title": "MBA em Psicologia vs Especialização em Psicologia — diferença real e quando escolher cada",
    "description": "Como decidir entre MBA e especialização em Psicologia: árvore de decisão com cinco perguntas, perfis ideais de cada um, exemplos concretos de carreira e perguntas frequentes.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "pos",
      "graduacao",
      "psicologia",
      "mba",
      "especializacao",
      "recurso"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/pos-graduacao-psicologia/tipos",
    "title": "Tipos de pós-graduação em Psicologia — lato sensu, stricto sensu, MBA, especialização e curso livre",
    "description": "Os cinco tipos de pós-graduação em Psicologia no Brasil: lato sensu vs stricto sensu, diferença entre MBA, especialização e curso livre, regulação MEC/CAPES, carga horária e quando escolher cada um.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "pos",
      "graduacao",
      "psicologia",
      "tipos",
      "recurso"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/recursos",
    "title": "Recursos para decidir sobre pós-graduação em Psicologia",
    "description": "Quiz, checklist e guia executivo para quem está escolhendo um MBA ou uma especialização em Psicologia em 2026. Portal independente.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "recursos",
      "recurso"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/recursos/checklist-escolher-pos-psicologia",
    "title": "Checklist — você está pronto para fazer uma pós em Psicologia?",
    "description": "Doze itens objetivos para evitar matrícula por inércia. Pré-requisito acadêmico, ajuste de horário, orçamento real, alinhamento com gestor e o que um MBA não entrega.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "recursos",
      "checklist",
      "escolher",
      "pos",
      "psicologia",
      "recurso"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/recursos/guia-pos-psicologia",
    "title": "Guia executivo — como escolher uma pós em Psicologia em 2026",
    "description": "Lato sensu vs stricto sensu, MBA vs especialização, modalidades, custo, ROI, áreas reconhecidas pelo CFP e como avaliar corpo docente. Pillar editorial independente com tabelas e fontes.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "recursos",
      "guia",
      "pos",
      "psicologia",
      "recurso"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/recursos/quiz-qual-mba-psicologia",
    "title": "Quiz — qual MBA em Psicologia combina com você",
    "description": "Dez perguntas mapeiam formação, área de atuação, problema central e momento de carreira para sugerir um MBA principal e um secundário. Orientação editorial independente.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "recursos",
      "quiz",
      "qual",
      "mba",
      "psicologia",
      "recurso"
    ],
    "weight": 0.8,
    "pageType": null
  },
  {
    "route": "/regulacao",
    "title": "Regulação, ética e escopo profissional em Psicologia — CFP, SATEPSI e MEC",
    "description": "O que diz o CFP sobre especialidades reconhecidas, registro de especialista, papel do SATEPSI e como o MEC trata a pós lato sensu. Níveis editoriais R0-R4 do portal.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "regulacao",
      "recurso"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/roadmap",
    "title": "Roadmap Brasil GEO x IPOG - 2026 | posgraduacaopsicologia.com",
    "description": "Roadmap institucional do programa Brasil GEO x IPOG: quatro fases entre maio de 2026 e a captação 2027.1, cinco sprints fechadas em 17-05 e seis waves planejadas (F a K).",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "roadmap",
      "recurso"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/sobre",
    "title": "Sobre o portal e quem o assina · posgraduacaopsicologia.com",
    "description": "Portal editorial independente sobre Pós-Graduações em Psicologia no Brasil (incluindo MBA, Especialização Lato Sensu, Mestrado Profissional e Clínica certificada), publicado pela Brasil GEO sob responsabilidade editorial de Alexandre Caramaschi. Caminho oficial das matrículas: ipog.edu.br.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "sobre",
      "recurso"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/temas",
    "title": "Temas em alta em Psicologia aplicada — NR-1, saúde mental, burnout, IA em RH e segurança psicológica",
    "description": "Cinco temas que estão movendo Psicologia aplicada em 2026: NR-1 e riscos psicossociais, saúde mental no trabalho, burnout, IA em RH e segurança psicológica. Análise técnica independente.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "tema"
    ],
    "weight": 1,
    "pageType": null
  },
  {
    "route": "/temas/adhd-adulto-brasil",
    "title": "TDAH adulto no Brasil: subdiagnóstico, tratamento e o que mudou em 2024-2026",
    "description": "TDAH adulto continua subdiagnosticado no Brasil. Polanczyk, Mattos, Rohde, Faraone e Tripp & Wickens consolidaram a literatura. O que muda para a clínica, o RH e a regulação CFM/ABDA.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "adhd",
      "adulto",
      "brasil",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/adolescencia-lgbtqia-trevor-project-2026",
    "title": "Adolescente LGBTQIA+ no Brasil 2026 — Trevor Project, Williams Institute e clínica afirmativa",
    "description": "Adolescência LGBTQIA+ no Brasil 2026. Minority stress, Trevor Project 2024-2025, Williams Institute 2025, Hatchel 2024, ANTRA, GIRA-FIOCRUZ. Seis fatores de risco com proteção e intervenção.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "adolescencia",
      "lgbtqia",
      "trevor",
      "project",
      "2026",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/avaliar-tdah-adulto-brasil-protocolo",
    "title": "Como avaliar TDAH em adulto no Brasil em 2026 — protocolo principal",
    "description": "Protocolo principal para avaliação de TDAH em adulto no Brasil em 2026: prevalência 2,5-4%, critérios DSM-5-TR e CID-11 6A05, ASRS-18, DIVA-5, BRIEF-A, CAARS e Resolução CFP 31/2022.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "avaliar",
      "tdah",
      "adulto",
      "brasil",
      "protocolo",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/burnout-lgbtqia-minority-stress-2026",
    "title": "Burnout em colaborador LGBTQIA+ 2026: minority stress que escapa ao PGR padrão",
    "description": "Minority stress (Meyer 2003, atualizações 2024-2025) opera em camadas distais e proximais sobre o trabalho de pessoas LGBTQIA+. Análise com Velez 2024, Hendricks & Testa 2012, McKinsey 2025 e dados Brasil ABRH 2025.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "burnout",
      "lgbtqia",
      "minority",
      "stress",
      "2026",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/burnout-mae-trabalhadora-2026",
    "title": "Burnout em mãe trabalhadora 2026: sobrecarga cumulativa e os limites da NR-1",
    "description": "Mãe trabalhadora opera três turnos simultâneos — invisible labor, emotional labor e work labor. NR-1 captura só o terceiro. Análise técnica com Daminger 2019, Roskam 2018, Mikolajczak 2024 e dados PNAD 2024-2025.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "burnout",
      "mae",
      "trabalhadora",
      "2026",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/burnout-prevencao",
    "title": "Burnout e prevenção: as seis áreas de worklife e como evitar o adoecimento estrutural",
    "description": "Burnout não se previne com massagem corporativa. Análise técnica do modelo de Maslach & Leiter: as seis áreas que decidem se o sistema adoece a pessoa.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "burnout",
      "prevencao",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/burnout-profissionais-saude-2026",
    "title": "Burnout em médicos, enfermeiros e psicólogos em 2026: a degradação de longa cauda pós-pandemia",
    "description": "Burnout em profissionais de saúde não recuou em 2026. Estado da arte com Maslach, Demerouti, Shanafelt, CFM e ANEPS. O que muda para hospital, clínica e sistema de saúde.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "burnout",
      "profissionais",
      "saude",
      "2026",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/climate-anxiety",
    "title": "Ansiedade climática no trabalho: eco-ansiedade, luto ecológico e o impacto sobre jovens profissionais",
    "description": "Ansiedade climática não é modismo de geração frágil. É resposta legítima a risco real, com evidência empírica robusta. O que muda para RH, líderes e psicólogos em 2025-2026.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "climate",
      "anxiety",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/cultura-clima-organizacional",
    "title": "Cultura e clima organizacional: o que se gerencia e o que se cultiva",
    "description": "Cultura não se gerencia diretamente — se cultiva via decisões gerenciais sobre o que é recompensado e tolerado. Análise técnica de Schein, Cameron & Quinn, McKinsey e MIT Sloan.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "cultura",
      "clima",
      "organizacional",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/diversidade-inclusao",
    "title": "Diversidade e inclusão: diversidade entra, inclusão retém, equidade promove",
    "description": "Quem confunde os três conceitos faz programa que só contrata e perde. Edmondson, McKinsey, Catalyst, Dobbin & Kalev e o desenho que distingue programa eficaz de teatro corporativo.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "diversidade",
      "inclusao",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/fadiga-digital",
    "title": "Fadiga digital: Zoom fatigue, tecnostress e direito à desconexão em 2025-2026",
    "description": "Fadiga digital não é metáfora — é exaustão mensurável. Análise técnica de Bailenson, Fauville e da diretiva europeia de desconexão. O que a empresa decide sobre arquitetura digital.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "fadiga",
      "digital",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/gen-z-burnout",
    "title": "Burnout na geração Z: o que retém quem está sendo contratado em 2025-2026",
    "description": "Gen Z não é mais frágil — é coorte distinta em contexto distinto. Análise técnica de Twenge, Deloitte e evidência brasileira sobre burnout, engajamento e retenção.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "gen",
      "burnout",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/gpt5-claude47-em-psicoterapia-2026",
    "title": "GPT-5.4 e Claude 4.7 em psicoterapia em 2026: capacidades, riscos clínicos e mitigações",
    "description": "Análise dos modelos de fronteira em saúde mental — janela de 1M tokens, voice mode, multimodalidade, memory persistente, reasoning estendido — e dos riscos sutis de sicofancia, alucinação afetiva e reforço de delírio em uso clínico.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "gpt5",
      "claude47",
      "psicoterapia",
      "2026",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/ia-em-rh",
    "title": "IA em RH: governança, viés algorítmico e o papel da Psicologia",
    "description": "IA em RH amplifica viés humano. Análise técnica das aplicações por estágio do funil de pessoas, riscos éticos, LGPD e como construir governança defensável.",
    "kind": "Tema",
    "persona": "rh",
    "tags": [
      "temas",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/ia-generativa-rh",
    "title": "IA generativa em RH: viés algorítmico, LGPD e a defesa técnica em 2025-2026",
    "description": "ChatGPT em hiring amplifica viés histórico e expõe a empresa juridicamente. Análise técnica de Raghavan, Kim, EEOC, AI Act e da posição do CFP — com o que decidir.",
    "kind": "Tema",
    "persona": "rh",
    "tags": [
      "temas",
      "generativa",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/ia-psicodiagnostico-2026",
    "title": "IA generativa em psicodiagnóstico em 2026: validade, viés, CFP e LGPD aplicados à clínica",
    "description": "ChatGPT, Claude e Gemini em screening psicológico. Estado da arte 2024-2026 com Sharma, Heinz, Inkster e Fitzpatrick. APA, CFP, LGPD. O que muda para a clínica brasileira.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "psicodiagnostico",
      "2026",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/ia-psicologia-2026",
    "title": "IA e Psicologia em 2026: 5 frentes que todo psicólogo deveria conhecer",
    "description": "Cluster editorial sobre IA aplicada à Psicologia em 2026: terapia digital, avaliação psicológica, papers 2025-2026, formação do psicólogo e modelos de fronteira. CFP, SATEPSI e literatura recente.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "psicologia",
      "2026",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/ia-psicologia-2026/avaliacao-psicologica-ia-satepsi-2026",
    "title": "Avaliação psicológica com IA e o debate SATEPSI em 2026: o que é defensável, o que é vedado",
    "description": "IA na avaliação psicológica em 2026 — 4 camadas de uso, Resolução CFP 09/2018, Posicionamento CFP de 03/07/2025, SATEPSI, Resolução CFP 06/2019 e PL 2338/2023.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "psicologia",
      "2026",
      "avaliacao",
      "psicologica",
      "satepsi",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/ia-psicologia-2026/ia-na-formacao-do-psicologo-2026",
    "title": "IA na formação do psicólogo brasileiro em 2026: o que entrou na grade, o que é workshop, o que ainda falta",
    "description": "Mapa da formação em IA aplicada para psicólogos no Brasil em 2026 — graduação, MBA, mestrado, formação independente. Casos IPOG, PUC, FGV. Critérios técnicos para escolha de programa.",
    "kind": "Tema",
    "persona": "psicologos",
    "tags": [
      "temas",
      "psicologia",
      "2026",
      "formacao",
      "psicologo",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/ia-psicologia-2026/papers-2025-2026-saude-mental-ia",
    "title": "5 papers 2025-2026 que mudaram a leitura de IA em saúde mental — síntese técnica com DOI",
    "description": "Síntese de 5 publicações 2025-2026 sobre IA em saúde mental: Therabot RCT (NEJM AI), p-tau217 com ML (JAMA Neurology), chatbot e solidão (MIT + OpenAI), Demszky LLMs em Psicologia (Stanford), Sharma sicofancia (Anthropic).",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "psicologia",
      "2026",
      "papers",
      "2025",
      "saude",
      "mental",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/ia-psicologia-2026/terapia-digital-chatbots-clinicos-2026",
    "title": "Terapia digital e chatbots clínicos em 2026: Woebot, Wysa, Replika e o Posicionamento CFP de 03/07/2025",
    "description": "Estado da evidência clínica de chatbots terapêuticos em 2026 — Woebot, Wysa, Youper e o caso Replika. Posicionamento CFP, RDC 657/2022 da Anvisa e literatura recente (Fitzpatrick, Inkster, Heinz, Maples).",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "psicologia",
      "2026",
      "terapia",
      "digital",
      "chatbots",
      "clinicos",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/ia-saude-mental-supervisao-clinica-humana-mba-trilha",
    "title": "IA em Saúde Mental com Supervisão Clínica Humana: a trilha MBA que captura a onda regulatória de 2026",
    "description": "",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "saude",
      "mental",
      "supervisao",
      "clinica",
      "humana",
      "mba",
      "trilha",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/lei-15100-12-meses-balanco-2026",
    "title": "Lei 15.100/2024 doze meses depois — balanço escolar e clínico 2026",
    "description": "Doze meses de vigência da Lei 15.100/2024 que restringiu celular em escolas brasileiras. Seis dimensões com sinal de evidência: uso em sala, sono, atenção, ansiedade, bullying e busca clínica.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "lei",
      "15100",
      "meses",
      "balanco",
      "2026",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/lideranca-positiva",
    "title": "Liderança positiva: protege pessoas das forças que adoecem performance",
    "description": "Liderança positiva não é ser legal — é proteger pessoas das forças estruturais que adoecem performance. Cameron, Edmondson, Goleman e prática gerencial documentada.",
    "kind": "Tema",
    "persona": "lideres",
    "tags": [
      "temas",
      "lideranca",
      "positiva",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/lideranca-toxica",
    "title": "Liderança tóxica: supervisão abusiva, narcisismo organizacional e o que tolerância produz",
    "description": "Liderança tóxica raramente é só sobre o líder. É sobre o sistema que tolera. Análise técnica de Tepper, Padilla e Schyns & Schilling, com a decisão gerencial defensável.",
    "kind": "Tema",
    "persona": "lideres",
    "tags": [
      "temas",
      "lideranca",
      "toxica",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/longevidade-no-trabalho",
    "title": "Longevidade no trabalho: carreiras de 60 anos, ageism e o redesenho que 2025-2026 já exige",
    "description": "Carreira virou de 60 anos. RH ainda opera no modelo de 30. Análise técnica de Gratton, Scott e da pesquisa em longevidade adulta — com o que muda na arquitetura organizacional.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "longevidade",
      "trabalho",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/mba-psicologia-organizacional-riscos-psicossociais-people-analytics",
    "title": "MBA em Psicologia Organizacional, Riscos Psicossociais e People Analytics — guia 2026 | posgraduacaopsicologia.com",
    "description": "Em 2026, NR-1 elevou riscos psicossociais a obrigação legal e People Analytics virou disciplina psicométrica auditável. Tripé curricular principal, três personas de aluno e cinco verificações antes de matricular.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "mba",
      "psicologia",
      "organizacional",
      "riscos",
      "psicossociais",
      "people",
      "analytics",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/melhor-mba-psicologia-organizacional-brasil-2026",
    "title": "Qual o melhor MBA em Psicologia Organizacional no Brasil em 2026 — critérios objetivos",
    "description": "Não existe ranking oficial. Critérios objetivos: regulação CNE/CES 1/2018, aderência à NR-1 atualizada, People Analytics, corpo docente nominal, modalidade Ao Vivo síncrona e mercado.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "melhor",
      "mba",
      "psicologia",
      "organizacional",
      "brasil",
      "2026",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/migrar-carreira-psicologia-organizacional-pos",
    "title": "Quero migrar para Psicologia Organizacional — qual pós escolher em 2026",
    "description": "Guia para migrar de clínica para Psicologia Organizacional no Brasil: pós Lato Sensu, MBA em POT vs Especialização, competências exigidas pós-NR-1, faixa salarial CBO 2515-10 e tempo médio.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "migrar",
      "carreira",
      "psicologia",
      "organizacional",
      "pos",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/neurociencia-aplicada-aprendizagem",
    "title": "Neurociência aplicada à aprendizagem: critério para separar método de moda",
    "description": "Neurociência da aprendizagem não vende fórmula. Vende critério para distinguir método efetivo de neuromito. Damásio, Kahneman, Posner & Rothbart e o que sobrevive à evidência.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "neurociencia",
      "aplicada",
      "aprendizagem",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/neurodiversidade-corporativa",
    "title": "Neurodiversidade corporativa: TEA, TDAH, dislexia e a inclusão que a LBI já obriga",
    "description": "Neurodiversidade no trabalho deixou de ser nicho. Análise técnica da literatura de Krzeminska, Hawse, Austin e Pisano, com a base legal brasileira (LBI 13.146/2015).",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "neurodiversidade",
      "corporativa",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/nr1-explicada-para-psicologos-2026",
    "title": "NR-1 explicada para psicólogos no Brasil em 2026 — Portaria 1.419/2024 e PGR psicossocial",
    "description": "O que é a NR-1 para psicólogos. Portaria MTE 1.419/2024 incorporou riscos psicossociais ao PGR e a Portaria 765/2025 definiu vigência plena em 26/05/2026. Papel técnico do psicólogo e instrumentos validados.",
    "kind": "Tema",
    "persona": "psicologos",
    "tags": [
      "temas",
      "nr1",
      "explicada",
      "para",
      "psicologos",
      "2026",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/nr1-riscos-psicossociais",
    "title": "NR-1 e riscos psicossociais: a mudança regulatória que reorganiza saúde mental no trabalho",
    "description": "A NR-1 atualizada incorpora riscos psicossociais ao GRO. Análise técnica para quem precisa mapear, avaliar e controlar — sem confundir gestão de risco com avaliação clínica.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "nr1",
      "riscos",
      "psicossociais",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/people-analytics",
    "title": "People analytics: dado comportamental sem psicólogo vira vigilância",
    "description": "People analytics não é dashboard de RH — é análise causal com risco ético. Davenport & Harris, McKinsey, MIT Sloan, LGPD e o que separa análise útil de análise enganadora.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "people",
      "analytics",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/pos-graduacao-lato-sensu-psicologia-decreto-12456",
    "title": "Especialização em Psicologia pós-Decreto 12.456: o que mudou, o que ficou e como verificar antes de matricular",
    "description": "Decreto 12.456/2025 reorganiza Lato Sensu — não a extingue. Especialização em Psicologia segue como caminho regulamentado e mais comum no Brasil. Análise técnica para 2026.2 com decreto, Resolução CNE/CES nº 1/2018, Parecer CNE/CES nº 637/2025 e Resoluções CFP.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "pos",
      "graduacao",
      "lato",
      "sensu",
      "psicologia",
      "decreto",
      "12456",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/psicose-primeiro-episodio",
    "title": "Primeiro episódio psicótico (PEP) e intervenção precoce em 2026: McGorry, Marshall e a RAPS brasileira",
    "description": "PEP é janela clínica decisiva. McGorry, Marshall e a literatura 2024-2026 consolidaram o modelo de intervenção precoce. RAPS e CAPS são o substrato brasileiro. O que muda para clínica e família.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "psicose",
      "primeiro",
      "episodio",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/saude-mental-corporativa-nr1-pacote-b2b",
    "title": "Saúde Mental Corporativa e NR-1: pacote B2B mínimo viável antes da fiscalização punitiva de 2026",
    "description": "Pacote B2B principal alinhado à NR-1 atualizada — diagnóstico, intervenção e governança. Portaria MTE 1.419/2024 e 765/2025: fiscalização punitiva começa em 26 de maio de 2026.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "saude",
      "mental",
      "corporativa",
      "nr1",
      "pacote",
      "b2b",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/saude-mental-perinatal",
    "title": "Saúde mental perinatal em 2026: depressão, ansiedade, EPDS, IPT e a rede brasileira (SUS) frente ao NHS",
    "description": "Saúde mental perinatal é frente clínica e de política pública. Howard, Stein, Hahn-Holbrook, Vigneau & Toledano. EPDS, IPT, fluoxetina. O que muda para a atenção primária e o cuidado clínico no Brasil.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "saude",
      "mental",
      "perinatal",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/saude-mental-trabalho",
    "title": "Saúde mental no trabalho: por que programas falham e o que faz diferença",
    "description": "Programa de saúde mental que não toca em estilo de liderança e desenho do trabalho é folder caro. Análise técnica dos níveis de prevenção, ROI e como medir resultado.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "saude",
      "mental",
      "trabalho",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/saude-mental-trabalho-remoto",
    "title": "Saúde mental no trabalho remoto: isolamento, fronteira difusa e o desenho que falta",
    "description": "Trabalho remoto não é bom nem ruim em si. É como foi desenhado. Análise técnica de Wang, Galanti, Vyas e da regulação brasileira (Lei 14.442/2022, NR-17).",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "saude",
      "mental",
      "trabalho",
      "remoto",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/seguranca-psicologica",
    "title": "Segurança psicológica: tolerância gerencial à discordância técnica",
    "description": "Não é ambiente agradável — é base da performance sustentada. Análise técnica do framework de Edmondson, quatro níveis, instrumento de medição e plano de construção.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "seguranca",
      "psicologica",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/supervisao-clinica-async-ia-2026",
    "title": "Supervisão clínica assíncrona com IA em 2026 — o que CFP e evidência permitem",
    "description": "Tese técnica: supervisão assíncrona com camada de IA é viável e ética se preservar presença humana do supervisor. Evidência Watkins 2024-2025, Carlsson 2025, Bernard e Goodyear 2024 e Posicionamento CFP 03/07/2025.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "supervisao",
      "clinica",
      "async",
      "2026",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/tea-adulto-trabalho",
    "title": "TEA em adultos no trabalho: diagnóstico tardio, masking e adaptações razoáveis no Brasil",
    "description": "Autismo adulto na pauta corporativa. Estado da arte 2024-2026 com Pellicano, Lai, Bishop e Krzeminska. O que muda para RH, clínica e a Lei Brasileira de Inclusão.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "tea",
      "adulto",
      "trabalho",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/tea-mulheres-lgbtqia-camuflagem-2026",
    "title": "Camuflagem autística em mulheres LGBTQIA+ — a interseção que a clínica brasileira só está começando a ler",
    "description": "Dupla camuflagem em mulheres autistas LGBTQIA+ eleva risco de burnout, ideação suicida e diagnóstico tardio em 2-3 vezes. Análise técnica com Hull (CAT-Q), Lai (Lancet Psychiatry), Strang (gender diversity), Murphy (mulheres queer) e Pellicano.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "tea",
      "mulheres",
      "lgbtqia",
      "camuflagem",
      "2026",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/temas/trabalho-hibrido",
    "title": "Trabalho híbrido: tecnologia social, não meio-termo entre presencial e remoto",
    "description": "Híbrido não é compromisso preguiçoso. É tecnologia social que precisa de cultura, ritmo e infraestrutura dedicados. Bloom, Gallup, McKinsey e o desenho que separa híbrido eficaz de híbrido caótico.",
    "kind": "Tema",
    "persona": null,
    "tags": [
      "temas",
      "trabalho",
      "hibrido",
      "tema"
    ],
    "weight": 0.9,
    "pageType": null
  },
  {
    "route": "/tipos-de-pos-graduacao",
    "title": "Tipos de Pós-Graduação em Psicologia · cinco modalidades principais · guia independente",
    "description": "Mapa principal das cinco modalidades de pós-graduação em Psicologia no Brasil: Especialização Lato Sensu (CFP/MEC), MBA aplicado, Mestrado Profissional (CAPES), Especialização Clínica certificada (ACT, EMDR, DBT) e Residência Multiprofissional. Comparativo de carga horária, público, regulador e exemplos.",
    "kind": "Recurso",
    "persona": null,
    "tags": [
      "tipos",
      "pos",
      "graduacao",
      "recurso"
    ],
    "weight": 1,
    "pageType": null
  }
];

export const AUTO_PAGES_STATS = {
  "Recurso": 63,
  "Área": 19,
  "Carreira": 7,
  "Caso": 7,
  "Comparativo": 46,
  "Evidência": 7,
  "FAQ": 32,
  "Glossário": 6,
  "Guia": 31,
  "Intervenção": 6,
  "MBA": 21,
  "Método": 6,
  "Persona": 5,
  "Estado": 29,
  "Tema": 46
} as const;
