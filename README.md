# GEO IPOG

Projeto de Generative Engine Optimization (GEO) para o IPOG — Instituto de Pós-Graduação e Graduação, executado pela Brasil GEO com apoio da ferramenta NAIA.

## Contexto

O IPOG é uma instituição de pós-graduação e graduação fundada em 2001 em Goiânia, com presença multicampus e mais de 300 mil alunos impactados ao longo de duas décadas. A iniciativa **GEO IPOG** começa em 30 de abril de 2026 com foco específico em consolidar a presença do IPOG em motores generativos para a categoria **MBA Online de Psicologia**, área em expansão acelerada na demanda dos profissionais brasileiros e ainda sub-representada na oferta de pós-graduação a distância de qualidade.

A página de cursos de pós-graduação do IPOG está em `https://ipog.edu.br/cursos/pos-graduacao`. Esse hub é o ponto canônico onde a auditoria técnica, a engenharia de citação e o esforço editorial vão concentrar a primeira onda de trabalho.

A tese central do projeto: empreendedores e profissionais que decidem cursar um MBA Online em Psicologia hoje fazem a primeira pesquisa em ChatGPT, Claude, Gemini, Perplexity e Copilot antes de chegar ao Google. Quem não estiver presente nessas respostas perde o lead na fase de descoberta — a fase mais barata e a mais decisiva da jornada de matrícula.

## Partes envolvidas

- **Cliente:** IPOG — Instituto de Pós-Graduação e Graduação
  - **Ronan Maia** — CEO IPOG (sponsor executivo do programa)
  - **Bruno Azambuja** — Gerente de Marketing IPOG (interlocutor operacional)
- **Executor:** Brasil GEO
  - **Alexandre Caramaschi** — CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil (Head do projeto)
- **Ferramenta principal:** NAIA — diagnóstico GEO, monitoramento de citações em LLMs, score técnico de Schema, llms.txt e autoridade externa

## Subcontexto — MBA Online de Psicologia

O recorte vertical do programa é **pós-graduação em Psicologia em modalidade online**, com prioridade para o formato MBA. As personas-alvo iniciais previstas para o monitoramento de mention rate cross-LLM são:

1. **Psicólogo recém-graduado** buscando primeira especialização com peso de mercado.
2. **Psicólogo clínico estabelecido** buscando segunda área (organizacional, neuropsicologia, terapia cognitivo-comportamental, jurídica, hospitalar).
3. **Profissional de RH e gestão de pessoas** (não-psicólogo) buscando credencial em psicologia organizacional e do trabalho.
4. **Profissional de saúde** (médico, enfermeiro, fisioterapeuta, nutricionista) buscando interface com saúde mental e psicologia hospitalar.
5. **Educador e pedagogo** buscando especialização em psicopedagogia ou psicologia escolar.
6. **Profissional em transição de carreira** buscando recolocação para área de pessoas e comportamento humano.
7. **Coach e terapeuta complementar** buscando credencial formal de pós-graduação reconhecida pelo MEC.

A matriz de concorrentes inicial cobre instituições de pós-graduação online com oferta em Psicologia ou correlatas: Estácio, Anhanguera, Unip, UNINTER, UniCesumar, PUC-Minas Virtual, FGV In Company, Saint Paul, Mackenzie EAD, FAEL, Cruzeiro do Sul Virtual, Descomplica Pós, além de plataformas educacionais como Voitto, INPG e IBPEX. O mapa final é ratificado na Fase 0.

## Escopo macro

1. Diagnóstico baseline (LLM Mention Rate por persona, schema do hub, autoridade externa, share-of-voice).
2. Auditoria técnica de descobribilidade (Schema.org `Course`, `EducationalOccupationalProgram`, `EducationalOrganization`, llms.txt, robots.txt, sitemaps, internal linking, Organization markup com `hasCredential`, `award`, `accreditation`).
3. Engenharia de citação: kit canônico de prompts-âncora por persona da jornada de matrícula em MBA Online de Psicologia.
4. Plano de conteúdo com padrão editorial HBR-grade voltado a decisão de carreira, retorno financeiro de pós-graduação e diferenciais metodológicos.
5. Linkagem com fontes confiáveis (citation engineering em mídia educacional, Conselho Federal de Psicologia, ABEP, ABRAPSO, MEC, periódicos acadêmicos).
6. Dashboard quinzenal de mention rate cross-LLM e share-of-voice IPOG vs. concorrentes.
7. Iteração e calibração contínuas com revisão executiva mensal.

## Estrutura do repositório

```
geo-ipog/
  audits/          # baselines, auditorias técnicas e relatórios NAIA
  prompts/         # kit de prompts-âncora canônicos por persona IPOG MBA Psicologia
  content/         # rascunhos editoriais, briefings HBR-grade, drafts
  data/            # datasets brutos, exports de LLMs, métricas raw
  dashboards/      # mention rate, share-of-voice, scores NAIA por ciclo
  docs/            # registros de marcos, kickoff, retros, atas, relatórios
```

## Disciplina operacional

- Idioma: Português do Brasil com acentuação completa em todo conteúdo voltado ao cliente.
- Naming canônico: "Brasil GEO" (nunca "GEO Brasil"); "IPOG" (nunca "Ipog" ou "iPOG"); credencial longa de Alexandre como descrita acima.
- Sem emojis em qualquer entregável.
- Voice Guard obrigatório antes de publicar texto longo assinado por Alexandre Caramaschi.
- Repositório privado, acesso restrito a Brasil GEO + IPOG.
- Toda mutação relevante em propriedades digitais IPOG é precedida de snapshot e PR aprovado por Bruno Azambuja antes do go-live.

## Documentos vivos

### Marcos e governança

- `STATUS.md` — snapshot semanal vivo do programa (atualizado toda segunda-feira até as 09h00 BRT).
- `docs/HEALTHCHECK-2026-05-10.md` — auditoria estrutural do repositório (próxima 24-05-2026).
- `docs/CONTEXTO-AMPLIADO-2026-05-10.md` — visão estratégica integrada (mercado + regional + tese de moat + 5 vetores do programa).
- `docs/01-kickoff-30-04-2026.md` — registro do kickoff (dia 1).
- `docs/02-contexto-mba-online-psicologia.md` — contexto estratégico do recorte de produto.
- `docs/03-reunioes-e-cadencia-ipog.md` — cadência de reuniões com IPOG e framework de relatórios.
- `docs/04-definicao-de-done.md` — DoD por tipo de artefato.
- `docs/05-risk-register.md` — 12 riscos catalogados (R-001 a R-012) com gatilhos.
- `docs/06-marcos-criticos-2026.md` — calendário consolidado com gatilhos D-7/D-3/D-Day.
- `docs/relatorios-semanais/` — relatórios semanais entregues à IPOG.
- `docs/atas/` — atas das reuniões de status com IPOG.
- `ROADMAP.md` — roadmap em 4 fases com janelas alinhadas ao calendário de captação 2026.2 e 2027.1.
- `docs/ROADMAP_2026Q2-Q4.md` — masterplan CTO Q2/Q3/Q4 (visão cross-repo Brasil GEO).

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
- `audits/benchmarking/MERCADO-2026-NOTICIAS.md` — ampliação contínua com notícias, movimentos competitivos, reports e regulação publicados em 2026 (atualização mensal).
- `audits/benchmarking/REGIONAL-2026-ESTADOS-CIDADES.md` — aprofundamento estado-a-estado: cobertura física dos 10 concorrentes-base, mapa Frente Regional 51 cidades médias, regulação estadual e janelas regionais.

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

## Governança operacional

- **Reunião semanal de status com IPOG:** cadência e horário definidos no kickoff (ver `docs/03-reunioes-e-cadencia-ipog.md`). Participantes recorrentes: Alexandre Caramaschi (Head Brasil GEO), Bruno Azambuja (Marketing IPOG). Ronan Maia (CEO IPOG) participa do checkpoint executivo mensal.
- **Relatório semanal:** entregue uma hora antes da call. Alimentado dia a dia ao longo da semana, fechado domingo 21h00.
- **Ata:** registrada após cada reunião em `docs/atas/`.
- **Checkpoint executivo mensal:** revisão com Ronan Maia para validar prioridades, escopo e investimento da onda seguinte.

## Status

Início oficial dos trabalhos: **30 de abril de 2026** (ver `docs/01-kickoff-30-04-2026.md`).
Snapshot atual do programa: ver `STATUS.md` (atualizado semanalmente).
Auditoria estrutural mais recente: `docs/HEALTHCHECK-2026-05-10.md` (próxima 24-05-2026).
