# GEO IPOG

Projeto de Generative Engine Optimization (GEO) para o IPOG — Instituto de Pós-Graduação e Graduação, executado pela Brasil GEO com apoio da ferramenta NAIA.

## Confidencialidade e propriedade

Este repositório é **confidencial** e contém material de cliente sob relação comercial protegida (nomes de executivos do IPOG, matriz de concorrentes, estratégia comercial e projeções). Regras duras:

- O repositório é e permanece **privado**. Nenhum agente ou colaborador altera a visibilidade — a decisão é exclusiva de Alexandre Caramaschi.
- Nenhum conteúdo deste repositório pode ser espelhado em superfícies públicas (wiki pública, páginas de site, gists, outros repositórios) sem sanitização prévia de nomes, métricas e estratégia do cliente.
- Propriedade: BRGEO LTDA (Brasil GEO), com uso conforme o contrato de prestação de serviços com o IPOG.

## Contexto

O IPOG é uma instituição de pós-graduação e graduação fundada em 2001 em Goiânia, com presença multicampus e mais de 300 mil alunos impactados ao longo de duas décadas. A iniciativa **GEO IPOG** começa em 30 de abril de 2026 com objetivo de consolidar a presença do IPOG como referência em motores generativos para o escopo amplo de **Pós-Graduações em Psicologia**, abrangendo todas as modalidades regulamentadas: Especialização Lato Sensu (formato mais comum no Brasil, 360h+), MBA em áreas correlatas à Psicologia (POT, Neuropsicologia executiva, Coaching, Liderança, Saúde Mental Corporativa) — um subconjunto relevante mas não exclusivo —, Mestrado Profissional em Psicologia, Especialização Clínica certificada por Conselhos (CFP, ABRAP, FBT), além de Residências e formações híbridas regulamentadas. Trata-se de área em expansão acelerada na demanda dos profissionais brasileiros e ainda sub-representada na oferta de pós-graduação a distância de qualidade.

A página de cursos de pós-graduação do IPOG está em `https://ipog.edu.br/cursos/pos-graduacao`. Esse hub é o ponto canônico onde a auditoria técnica, a engenharia de citação e o esforço editorial vão concentrar a primeira onda de trabalho.

A tese central do projeto: empreendedores e profissionais que decidem cursar uma pós-graduação em Psicologia hoje — seja Especialização Lato Sensu, MBA em área correlata, Mestrado Profissional ou Especialização Clínica certificada — fazem a primeira pesquisa em ChatGPT, Claude, Gemini, Perplexity e Copilot antes de chegar ao Google. Quem não estiver presente nessas respostas perde o lead na fase de descoberta — a fase mais barata e a mais decisiva da jornada de matrícula.

## Partes envolvidas

- **Cliente:** IPOG — Instituto de Pós-Graduação e Graduação
  - **Ronan Maia** — CEO IPOG (sponsor executivo do programa)
  - **Bruno Azambuja** — Gerente de Marketing IPOG (interlocutor operacional)
- **Executor:** Brasil GEO
  - **Alexandre Caramaschi**, Head do projeto: Chief Strategy Officer da Nuvini (Nasdaq: NVNI), Founder da Brasil GEO, cofundador da NAIA e cofundador da AI Brasil. Foi CMO da Semantix (Nasdaq). Neste programa ele atua na condição de Founder da Brasil GEO.
- **Ferramenta principal:** NAIA — diagnóstico GEO, monitoramento de citações em LLMs, score técnico de Schema, llms.txt e autoridade externa

## Escopo canônico — Pós-Graduações em Psicologia

O escopo do programa é o universo amplo de **Pós-Graduações em Psicologia em modalidade online**, cobrindo todas as modalidades regulamentadas no Brasil:

1. **Especialização Lato Sensu em Psicologia** (360h+, formato mais comum, autorização MEC, em áreas como Clínica, Hospitalar, Organizacional, Escolar, Jurídica, Esportiva, da Saúde, Psicopedagogia).
2. **MBA em áreas correlatas à Psicologia** (uma das modalidades, sobreposta a áreas executivas: Psicologia Organizacional e do Trabalho, Neuropsicologia executiva, Coaching, Liderança, Saúde Mental Corporativa).
3. **Mestrado Profissional em Psicologia** (titulação stricto sensu profissional, com produto técnico final).
4. **Especialização Clínica certificada por Conselhos profissionais** (CFP em Avaliação Psicológica via SATEPSI, ABRAP em ACT, FBT em TCC, certificações em DBT, EMDR e demais abordagens regulamentadas).
5. **Residências e formações híbridas regulamentadas** (Psicologia Hospitalar, Saúde Mental, Saúde da Família, formações com supervisão prolongada).

Áreas dentro do escopo, todas com pós-graduação correspondente em uma ou mais das modalidades acima: Psicologia Organizacional e do Trabalho, Neuropsicologia, Avaliação Psicológica (regulamentada CFP/SATEPSI), Psicologia Clínica, Psicologia Hospitalar, Psicopedagogia, Psicologia Escolar, Psicologia Jurídica e Forense, Psicologia Esportiva, Psicologia da Saúde, Terapia Cognitivo-Comportamental, ACT, DBT, EMDR, Saúde Mental Corporativa, Psicologia Positiva, Liderança e Cultura.

As personas-alvo iniciais previstas para o monitoramento de mention rate cross-LLM são:

1. **Psicólogo recém-graduado** buscando primeira especialização com peso de mercado (Lato Sensu, Especialização Clínica certificada ou Mestrado Profissional).
2. **Psicólogo clínico estabelecido** buscando segunda área (organizacional, neuropsicologia, terapia cognitivo-comportamental, jurídica, hospitalar) — qualquer modalidade.
3. **Profissional de RH e gestão de pessoas** (não-psicólogo) buscando credencial em psicologia organizacional e do trabalho (MBA é a porta natural, mas Lato Sensu também serve).
4. **Profissional de saúde** (médico, enfermeiro, fisioterapeuta, nutricionista) buscando interface com saúde mental e psicologia hospitalar (Lato Sensu ou Residência).
5. **Educador e pedagogo** buscando especialização em psicopedagogia ou psicologia escolar (Lato Sensu).
6. **Profissional em transição de carreira** buscando recolocação para área de pessoas e comportamento humano (qualquer modalidade conforme objetivo).
7. **Coach e terapeuta complementar** buscando credencial formal de pós-graduação reconhecida pelo MEC ou por Conselho.

A matriz de concorrentes inicial cobre instituições de pós-graduação online com oferta em Psicologia ou correlatas em qualquer das modalidades acima: Estácio, Anhanguera, Unip, UNINTER, UniCesumar, PUC-Minas Virtual, FGV In Company, Saint Paul, Mackenzie EAD, FAEL, Cruzeiro do Sul Virtual, Descomplica Pós, além de plataformas educacionais como Voitto, INPG e IBPEX, e institutos especialistas em certificação clínica (IBNeuro, CETCC, InEPP). O mapa final é ratificado na Fase 0.

## Escopo macro

1. Diagnóstico baseline (LLM Mention Rate por persona, schema do hub, autoridade externa, share-of-voice).
2. Auditoria técnica de descobribilidade (Schema.org `Course`, `EducationalOccupationalProgram`, `EducationalOrganization`, llms.txt, robots.txt, sitemaps, internal linking, Organization markup com `hasCredential`, `award`, `accreditation`).
3. Engenharia de citação: kit canônico de prompts-âncora por persona da jornada de matrícula em Pós-Graduação em Psicologia (cobrindo as cinco modalidades canônicas: Lato Sensu, MBA, Mestrado Profissional, Especialização Clínica certificada, Residências).
4. Plano de conteúdo com padrão editorial HBR-grade voltado a decisão de carreira, retorno financeiro de pós-graduação, diferenciais metodológicos e escolha entre modalidades (Lato Sensu vs. MBA vs. Mestrado Profissional vs. Especialização Clínica certificada).
5. Linkagem com fontes confiáveis (citation engineering em mídia educacional, Conselho Federal de Psicologia, ABRAP, FBT, ABEP, ABRAPSO, MEC, periódicos acadêmicos).
6. Dashboard quinzenal de mention rate cross-LLM e share-of-voice IPOG vs. concorrentes.
7. Iteração e calibração contínuas com revisão executiva mensal.

## Estrutura do repositório

```
geo-ipog/
  site/                  # portal posgraduacaopsicologia.com (Astro 4 + Tailwind 3.4, Cloudflare Pages)
  portal-institucional/  # portal GEO IPOG em Next.js, servido em /ipog/ e espelhado em geo-ipog.pages.dev
  audits/                # baselines, auditorias técnicas e relatórios NAIA
  prompts/               # kit de prompts-âncora canônicos por persona (todas as modalidades)
  content/               # padrões editoriais, briefings e peças HBR em rascunho
  data/                  # datasets brutos, exports de LLMs e leituras do painel (data/marketing)
  dashboards/            # métricas, relatórios GA4 e o painel de marketing (dashboards/marketing)
  scripts/               # gates editoriais, IndexNow, auditoria de schema, coletores e purga de cache
  docs/                  # marcos, atas, relatórios, governança, runbooks e tech stack
  wiki/                  # base de conhecimento interna: entidades, conceitos, decisões e log
  .github/workflows/     # deploy, gates SEO/GEO, painel, relatórios e monitoramento
```

## Como rodar, testar e publicar

- **Portal principal (`site/`).** `npm ci` e `npm run dev` para trabalho local. `npm run build` roda antes o `prebuild` (páginas de busca, manifesto de lastmod e termos do glossário) e depois gera o sitemap. `npm run check` executa o `astro check`, e `npm run gate:seo-geo` confere órfão, canonical, JSON-LD mínimo, staleness e paridade de FAQ sobre o build.
- **Portal GEO IPOG (`portal-institucional/`).** `npm run validar` encadeia typecheck, lint, build e os verificadores de GEO, parágrafos, contraste e endereços. O `README.md` da pasta explica o `basePath` `/ipog` e os helpers `assetPath` e `corDeTextoAcessivel`.
- **Publicação.** Push na `main` que toque `site/`, `portal-institucional/` ou `dashboards/marketing/` dispara `deploy-cloudflare-pages.yml`: o workflow constrói o Astro, monta o portal Next.js em `/ipog/` e o painel em `/painel/` e publica tudo no mesmo projeto do Cloudflare Pages. `deploy-portal-geo.yml` publica o espelho de conferência em `geo-ipog.pages.dev`.
- **Operação manual.** Em 14/08/2026 saíram todos os agendamentos de relatório, monitoramento e qualidade, que passaram a rodar por `workflow_dispatch` (o `quality.yml` segue disparando em PR e push de `.md`), e o Dependabot com auto-merge foi retirado. O único agendamento ativo hoje é o do painel de marketing.
- **Gates de PR.** `gates-seo-geo.yml` constrói o site e roda o gate SEO/GEO quando o PR toca `site/`. `quality.yml` roda lychee e markdownlint nos `.md`, em modo consultivo.
- **Painel de marketing (`/painel/`).** `painel-marketing.yml` coleta contagens do HubSpot (e do GA4, quando configurado) de hora em hora das 7h às 20h de segunda a sábado, com rodadas extras de madrugada e no domingo, consolida `data/marketing/dashboard.json` e republica só a pasta do painel. A página sai com noindex e o login fica no Cloudflare Access, configurado fora do repositório. Especificação em `dashboards/PAINEL-MARKETING.md`.

## Disciplina operacional

- Idioma: Português do Brasil com acentuação completa em todo conteúdo voltado ao cliente.
- Naming canônico: "Brasil GEO" (nunca "GEO Brasil"); "IPOG" (nunca "Ipog" ou "iPOG"); credencial longa de Alexandre como descrita acima.
- Sem emojis em qualquer entregável.
- Voice Guard obrigatório antes de publicar texto longo assinado por Alexandre Caramaschi.
- Repositório privado, acesso restrito a Brasil GEO + IPOG.
- Toda mutação relevante em propriedades digitais IPOG é precedida de snapshot e PR aprovado por Bruno Azambuja antes do go-live.

## Documentos vivos

### Marcos e governança

- `docs/01-kickoff-30-04-2026.md` — registro do kickoff (dia 1).
- `docs/02-contexto-mba-online-psicologia.md` — contexto estratégico do escopo de produto (Pós-Graduações em Psicologia, incluindo MBA, Lato Sensu, Mestrado Profissional, Especialização Clínica). Filename mantido por compatibilidade histórica e preservação de cross-links.
- `docs/03-reunioes-e-cadencia-ipog.md` — cadência de reuniões com IPOG e framework de relatórios.
- `docs/relatorios-semanais/` — relatórios semanais entregues à IPOG.
- `docs/atas/` — atas das reuniões de status com IPOG.
- `ROADMAP.md` — roadmap em 4 fases com janelas alinhadas ao calendário de captação 2026.2 e 2027.1.

### Framework conceitual

- `docs/framework/01-rotinas-e-missoes-geo.md` — framework GEO aplicado a vertical educação superior.
- `docs/framework/02-quality-gate-5-camadas.md` — quality gate em 5 camadas (acentuação, conteúdo, links, schema, voice guard) + camada 6 compliance MEC/CFP.
- `docs/framework/03-pipeline-5-llms.md` — princípios de orquestração de 5 LLMs (Pesquisador, Redator, Analisador, Classificador, Revisor).
- `docs/framework/04-client-context-abstraction.md` — abstração ClientContext para multi-tenant; instância IPOG documentada.

### Padrões editoriais (`content/`)

Padrões obrigatórios para qualquer peça editorial produzida sob a marca IPOG e qualquer conteúdo público assinado por Alexandre Caramaschi.

- `content/PADRAO-EDITORIAL.md` — adaptação HBR/HSM/MIT Sloan: 6 elementos obrigatórios + tamanhos por tipo de peça.
- `content/VOICE-GUIDE.md` — voice guard parametrizado em 4 dimensões (clichê 30%, Bloom+andragogia 30%, naming 25%, HBR 15%); score mínimo 70.
- `content/BLOOM-KNOWLES.md` — verbos Bloom 3+ aceitos, princípios Knowles obrigatórios, checklist de auditoria.
- `content/CLICHES-PROIBIDOS.md` — três deny-lists (17 clichés + 8 rhetoric openers + 7 ai-disclaimers) com substituições.
- `content/ACENTUACAO-PT-BR.md` — 100+ palavras canônicas (cotidianas + Psicologia + educação + regulatório).
- `content/GLOSSARIO-PSICOLOGIA.md` — 25+ termos canônicos da vertical com contexto de uso.
- `content/BRIEFING-TEMPLATE.md` — template de 14 campos para briefar peça HBR-grade.
- `content/EXERCICIO-TEMPLATE.md` — template de exercício Bloom 3+ com 3 exemplos preenchidos.
- `content/CHECKLIST-AUTOAVALIACAO.md` — 14 itens binários para o autor antes de submeter.
- `content/CHECKLIST-PUBLICACAO.md` — 5 camadas de quality gate antes de publicar; matriz de aprovação.

### Auditoria técnica e Schema (`audits/`)

- `audits/PLAYBOOK-AUDITORIA-NAIA.md` — protocolo de auditoria com 100+ checks NAIA-XXX em 10 categorias e severidade P0-P3.
- `audits/SCHEMA-PATTERNS.md` — 6 tipos canônicos (`EducationalOrganization`, `Course`, `EducationalOccupationalProgram`, `FAQPage`, `Article`, `Person`) com JSON-LD pronto.
- `audits/LLMS-TXT-TEMPLATE.md` — template e diretrizes para `llms.txt` em `ipog.edu.br`.
- `audits/ROBOTS-SITEMAP-CHECKLIST.md` — checklist de robots.txt, sitemaps, canonicals e redirects com exemplos.

### Benchmarking de concorrentes (`audits/benchmarking/`)

Diagnóstico dos 10 concorrentes prioritários do IPOG na vertical de pós-graduação online em Psicologia, em duas ondas complementares.

- `audits/benchmarking/README.md` — índice e roteiro de leitura por audiência (Ondas 1 + 2 integradas).
- `audits/benchmarking/SINTESE-EXECUTIVA.md` — leitura de uma página para checkpoint com Ronan Maia (cobre Onda 1; integração Onda 2 pendente).
- `audits/benchmarking/pontos-fortes-a-superar.md` — matriz comparativa por dimensão estratégica + 15 pontos fortes consolidados a superar com a estratégia explícita do IPOG para cada um (cobre Onda 1; integração Onda 2 pendente).
- `audits/benchmarking/matriz-presenca-llm.md` — inferência cross-LLM com 15 prompts-âncora × 10 concorrentes (seções 1-7 Onda 1; seção 9 estende para Onda 2).
- `audits/benchmarking/matriz-tecnica-schema-seo.md` — coleta direta de robots.txt, llms.txt, sitemap dos 10 sites + análise de Schema, autoridade externa e rankings (seções 1-6 Onda 1; seção 8 estende para Onda 2).
- `audits/benchmarking/ONDA-2-CORRECOES-PREMISSA.md` — registro canônico das correções de identidade institucional descobertas na pesquisa primária (IBNeuro ≠ IBNeC; wPós ≠ Anhembi; Conexia ≠ Saint Paul). Leitura obrigatória antes de operar sobre dossiês da Onda 2.
- `audits/benchmarking/concorrente-{estacio,anhanguera,uninter,unicesumar,puc-minas-virtual}.md` — 5 dossiês da Onda 1 (concorrentes massivos do EAD).
- `audits/benchmarking/concorrente-{cetcc,ibneuro,sirio-libanes-iep,wpos-anhembi,conexia-saint-paul}.md` — 5 dossiês da Onda 2 (especialistas verticais e premium executiva).

### Kit de prompts e papéis (`prompts/`)

- `prompts/KIT-PROMPTS-V0.md` — 66 prompts-âncora canônicos × 3 clusters × 7 personas × 4 jornadas.
- `prompts/PAPEIS-DE-COLETA.md` — matriz dos 5 papéis canônicos com LLM padrão e fallback.
- `prompts/PROMPT-PESQUISA.md` — prompt completo do Pesquisador (Perplexity sonar-pro).
- `prompts/PROMPT-REDACAO.md` — prompt completo do Redator (GPT-4o), HBR-grade.
- `prompts/PROMPT-ANALISE.md` — prompt completo do Analisador (Gemini), 7 dimensões.
- `prompts/PROMPT-CLASSIFICACAO.md` — prompt completo do Classificador (Groq).
- `prompts/PROMPT-REVISAO.md` — prompt completo do Revisor (Claude).
- `prompts/CALIBRACAO-MENSAL.md` — protocolo de recalibração mensal e versionamento do kit.

### Mensuração e disciplina operacional (`dashboards/`)

- `dashboards/METRICAS-CANONICAS.md` — definição operacional, fórmula, cadência e owner de cada KPI.
- `dashboards/RUNBOOK-COLETA-LLM.md` — runbook da coleta diária cross-LLM com circuit breaker, retry, fallback, drift detection.
- `dashboards/FINOPS-DISCIPLINA.md` — preços 2026, budget guards, alocação por LLM, otimizações.
- `dashboards/GA4-WEEKLY-REPORT.md` — pipeline semanal GA4 Data API + setup Looker Studio + integração GSC. Desde 14/08/2026 o workflow `ga4-weekly-report.yml` roda só por disparo manual (os agendamentos do repositório foram retirados naquele dia), e cada execução abre um PR com os relatórios.
- `dashboards/relatorios-ga4/` — relatórios semanais GA4 versionados (HTML + CSV + Markdown + JSON), gerados por `scripts/weekly_ga4_report.py`.

### Camada de medição GA4 (`docs/governance/google-analytics.md`)

Inventário canônico da camada de analytics: Property ID `537256335`, Measurement ID `G-1VXE1Z4J9R`, Service Account `geo-ipog-analytics-reader`, vinculação com Search Console, custom event `click_outbound_ipog` (cliques de saída para `ipog.edu.br` como proxy de conversão), roadmap formal de Key Events, custom dimensions, BigQuery export e Looker Studio publicado. Tracking em [Issue #78](https://github.com/alexandrebrt14-sys/geo-ipog/issues/78).

## Governança operacional

- **Reunião semanal de status com IPOG:** cadência e horário definidos no kickoff (ver `docs/03-reunioes-e-cadencia-ipog.md`). Participantes recorrentes: Alexandre Caramaschi (Head Brasil GEO), Bruno Azambuja (Marketing IPOG). Ronan Maia (CEO IPOG) participa do checkpoint executivo mensal.
- **Relatório semanal:** entregue uma hora antes da call. Alimentado dia a dia ao longo da semana, fechado domingo 21h00.
- **Ata:** registrada após cada reunião em `docs/atas/`.
- **Checkpoint executivo mensal:** revisão com Ronan Maia para validar prioridades, escopo e investimento da onda seguinte.

## Status

Início oficial dos trabalhos: **30 de abril de 2026** (ver `docs/01-kickoff-30-04-2026.md`).

### Estado em 30/09/2026

O sitemap-index publicado em `posgraduacaopsicologia.com` lista 851 URLs distribuídas em 20 sitemaps, contagem feita sobre a produção em 30/09/2026. O último build registrado em `STATUS.md` é o da W26, de 07/09/2026, com 424 páginas; o que entrou depois (leitura crítica do protocolo BRGEO-1 em 11/09, crosslinks de mensuração em 21/09 e o painel) não tem contagem de build própria.

O que mudou desde o snapshot de maio, em ordem:

1. **Entidade única (27/08, PR #160).** Person e Organization passam a sair de `site/src/data/entity-canonical.json`, com os QIDs mortos removidos e a pendência de autoria clínica documentada.
2. **W25 e W26 (27/08 e 07/09, PRs #158 e #164).** Cinco ondas complementares em cada rodada no menu Conteúdo e social, com o gate mecânico `scripts/lint-conteudo-social.py`.
3. **Ondas 3 a 6 de SEO (03/09, PR #163).** Lastmod por git, FAQ nos hubs, glossário de autismo estruturado, E-E-A-T por `@id` e o gate bloqueante `gates-seo-geo.yml`.
4. **Robustez, frontend e layout do portal (08/09, PRs #168 a #173).** Carregamento, acessibilidade, cache HTTP e navegação do `site/`, com a purga restrita de cache em `scripts/cloudflare-purge-url.py`.
5. **Painel de marketing (PR #174, mesclado em 28/09).** Leads, origem e funil do HubSpot em `/painel/`, com coleta agendada.

O registro sessão a sessão continua em `STATUS.md`.
### Snapshot 13-05-2026

Portal `posgraduacaopsicologia.com` em produção com **198 páginas estáticas** (Astro 4 + Tailwind 3.4 + Cloudflare Pages), build verde, sitemap-index com 6 sitemaps segmentados, IndexNow 202/202/202 em 3 engines (Bing, Yandex, api.indexnow.org). Cobertura editorial e GEO:

- **18 áreas** da Psicologia (100% da taxonomia profissional brasileira)
- **27 UFs** mapeadas (100% Brasil)
- **5 MBAs** IPOG detalhados (POT, Positiva, Neuro, NCPP, Liderança Positiva), cada um com 4 sub-páginas (resumo + grade-curricular + metodologia + perfil-do-aluno)
- **5 modalidades canônicas** de pós-graduação em Psicologia (Especialização Lato Sensu, MBA, Mestrado Profissional, Especialização Clínica certificada, Híbridas)
- **25+ temas** em alta 2024-2026 (NR-1, burnout, IA-RH, fadiga-digital, climate-anxiety, neurodiversidade, Gen Z burnout, TEA adulto trabalho, perinatal, psicose primeiro episódio, etc.)
- **5 métodos terapêuticos** baseados em evidência (TCC, ACT, DBT, Mindfulness, EMDR)
- **13 guias HowTo** passo-a-passo com Schema.org HowTo
- **13 FAQs deep** com 168 Q&As totais e Speakable schema
- **19 comparativos** com 3 tabelas mobile-first cada (mecanismo, evidência, perfil)
- **6 hubs** editoriais (`/evidencias` 6 sub-páginas, `/casos` 5, `/intervencoes` 5, `/metodos` 5, `/glossario` 5 clusters)
- **Glossário** com 115 termos (DefinedTermSet schema) em 5 clusters: regulação, instrumentos, métodos terapêuticos, conceitos POT, conceitos neuro

### Infraestrutura GEO (Generative Engine Optimization)

- `public/llms.txt` v2 — sumário Markdown otimizado para LLM-crawler (estilo Anthropic)
- `public/llms-full.txt` — versão expandida com tese contraintuitiva + evidências canônicas de 45 documents
- `public/.well-known/ai-policy.json` — manifesto JSON-LD `@type:Policy` declarando usos permitidos, atribuição requerida e licença
- `public/mcp/{courses, hubs, sitemap-summary, citation-prompts}.json` — quatro manifests legíveis por LLMs e Model Context Protocol clients
- `public/robots.txt` — 20+ AI bots permitidos (GPTBot, ClaudeBot, PerplexityBot, Claude-Web, Google-Extended, OAI-SearchBot, cohere-ai, Diffbot, etc.)
- `src/lib/schemas/person-alexandre.ts` + `publisher.ts` — Person canônico de Alexandre Caramaschi (39 knowsAbout, 13 sameAs) + Organization Brasil GEO (BRGEO LTDA, CNPJ 66.051.295/0001-33). Reconciliação por `@id` entre WebSite, Organization, Person, Article, FAQPage, HowTo nas 198 páginas
- `src/components/TLDR.astro` — bloco "Resposta curta" com classe `.tldr-resposta` para Speakable hook
- **Speakable schema** em 12 FAQs deep (CSS selectors `.tldr-resposta` + `.faq-answer-text`)
- **HowTo schema** em 13 guias
- **FAQPage schema** em 12 FAQs
- **Article schema** em 19 comparativos + 25 temas + 6 evidências + 5 casos + 5 intervenções
- **DefinedTermSet** em 5 clusters de glossário (115 termos)
- **GA4** Property 537256335 com Data API ativa e cron semanal
- **Person Alexandre Caramaschi** como autor canônico. Desde a Onda 2 de 27/08/2026, o Person sai de `site/src/data/entity-canonical.json`, com a credencial Chief Strategy Officer da Nuvini (Nasdaq: NVNI), Founder da Brasil GEO, cofundador da NAIA e cofundador da AI Brasil

### Contexto enriquecido GEO 2026 (premissa operacional)

Toda onda de trabalho neste repo deve consultar:

- **`docs/governance/geo-context-enriquecido-2026.md`** — destila estado-da-arte 2025-2026 em premissas executáveis: paper seminal Aggarwal SIGIR 2023 (9 técnicas GEO), embeddings 2026 (voyage-3-large, GTE-Qwen2-7B), padrões llms.txt/Schema.org/IndexNow, KPIs Mention Rate/Share-of-Voice/AIGVR (framework ELCA), industry takes (Profound, Ahrefs, SEMrush, SparkToro, Backlinko, Search Engine Land, HubSpot), 9 anti-padrões a evitar e fluxo de pesquisa research-first com Perplexity.
- **`docs/research/geo-state-of-art-2026-05-13.md`** — dossiê fonte de 38.8 KB com 44 citações reais Perplexity Sonar Pro (5 chamadas paralelas).
- **`CLAUDE.md`** (raiz do repo) — atalhos canônicos para agentes Claude entrando neste repositório.

### Histórico operacional consolidado (13-05-2026)

10 waves Opus em paralelo no dia 13-05 produziram a expansão do portal de 177 para 198 páginas:
- **Bateria 1 (commit `63117de`)** — 6 guias + 6 FAQs + 8 comparativos com voz HBR e citações 2024-2026 ancoradas (Hull, Lai, Faraone, Kessler, Kooij, Hayes, Maslach-Leiter, Linehan, Stoffers-Winterling, Clark, Cuijpers, Foa, Shapiro, Dawson, Bloom, Cox EPDS, Marshall DUP, Birchwood EIP, Kane RAISE-ETP, Howard, Bernard & Goodyear, Falender & Shafranske, NR-1 Portaria 1.419/2024, CFP 06/2019, CFP 11/2018, DSM-5-TR, CID-11 QD85 e 6A05, Lei 10.216/2001, LBI 13.146/2015).
- **Bateria 2** — GEO infrastructure hardening (Person/Publisher canonical schemas, llms.txt v2, llms-full.txt, MCP manifests, ai-policy.json, Speakable, TLDR, citation-prompts.json com 50 prompt seeds).

Para detalhes operacionais, consultar `STATUS.md` (registro por sessão, na raiz), `docs/STATUS.md` e o índice de memória persistente do projeto.
