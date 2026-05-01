# Arquitetura de Solução do Programa GEO IPOG — Visão Macro 2026

> **Documento:** 01 — Solution Architecture macro do programa GEO IPOG.
> **Cliente:** IPOG (Instituto de Pós-Graduação e Graduação, Goiânia, fundado 2001).
> **Sponsor executivo:** Ronan Maia (CEO IPOG).
> **Interlocutor operacional:** Bruno Azambuja (Gerente de Marketing IPOG).
> **Executor:** Brasil GEO — Alexandre Caramaschi (CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil).
> **Janela técnica de referência:** 07-05-2026 a 31-12-2026, com pico GEO 2026.2 entre 15-06-2026 e 31-07-2026.
> **Data:** 2026-05-01.
> **Autor da proposta:** Brasil GEO Solution Architecture.

Este documento desenha a arquitetura macro que sustenta o programa GEO IPOG ao longo de 2026. Ele organiza, em modelo C4 e em decisões arquiteturais formais, os sistemas, os repositórios e a governança de custo necessários para operar a coleta cross-LLM contínua, a auditoria NAIA, o pipeline editorial HBR-grade, a publicação de Schema canônico e o dashboard executivo dos 8 KPIs canônicos. A premissa de partida não é greenfield: o programa já tem repositório `geo-ipog/` ativo, workflows de quality + monitoramento de concorrentes, runbook de coleta cross-LLM versionado, playbook NAIA com 100+ checks, kit de prompts canônicos e disciplina FinOps com teto de USD 50/sprint declarado. Esta arquitetura promove esses artefatos de documentos para componentes executáveis, definindo containers, dependências, decisões de stack com trade-off explícito e plano de orçamento mensal.

A disciplina arquitetural segue três princípios não-negociáveis: (1) FinOps disciplinado desde o dia 1, com teto declarado por sprint e block automático em 100% do orçamento; (2) cohort fixo de 6 LLMs preservado a nível de pipeline (ChatGPT, Claude, Gemini, Perplexity, Grok, Copilot), com versão pinada e drift detection; (3) repositório como fonte de verdade canônica — toda configuração de prompts, KPIs, Schema, llms.txt e fatos canônicos versionada em Git, com snapshots diários de coleta arquivados em armazenamento frio.

---

## Bloco A — Visão de contexto (C4 Level 1)

A visão de contexto delimita atores externos, sistemas externos e o sistema GEO IPOG como um único bloco. O foco do C4 Level 1 é o **fluxo de informação que entra no sistema** (decisões executivas do Conselho IPOG, queries dos candidatos em LLMs, sinais técnicos do site `ipog.edu.br`) e **o fluxo que sai** (peças HBR-grade publicadas, Schema canônico atualizado, relatórios executivos para Ronan Maia, alertas operacionais para Bruno Azambuja).

### A.1 Atores externos

| Ator | Papel | Principais interações com o sistema |
|---|---|---|
| Alexandre Caramaschi | Head do programa Brasil GEO. Owner final dos KPIs 1, 3, 6, 8 | Aprova decisões arquiteturais, recebe alertas críticos, assina peças HBR, lê dashboard semanal |
| Bruno Azambuja | Gerente de Marketing IPOG, owner dos KPIs 2, 4, 5, 7 | Valida Schema antes de go-live, aciona área acadêmica para Lattes/ORCID, recebe relatórios mensais, coordena pré-pico e pico |
| Ronan Maia | CEO IPOG, sponsor executivo | Recebe relatório executivo mensal (board report), aprova orçamento e pricing, decide R-001 (decisão de produto) |
| Conselho IPOG | Órgão de governança | Recebe board report consolidado, aprova as 8 decisões críticas (D01-D08), valida lançamento de produtos |
| Candidatos (P1 a P7) | 7 personas (psicólogo recém-graduado, clínico estabelecido, RH não-psicólogo, profissional saúde, educador, transição de carreira, coach/terapeuta) | Geram queries em LLMs externos sobre MBA Online em Psicologia. Não interagem diretamente com o sistema GEO; interagem com sites IPOG e LLMs externos. O sistema observa esse comportamento via coleta cross-LLM |
| Corpo docente IPOG | 3 docentes piloto até 30-05, expansão para 8 até 04-08, 100% do MBA até 31-12 | Consentem o uso de Lattes/ORCID em `Person` Schema, fornecem mini-bios, aprovam citações em peças HBR |

### A.2 Sistemas externos

| Sistema externo | Tipo | Função no programa | Risco crítico |
|---|---|---|---|
| **OpenAI API** (GPT-4o snapshot 2024-08-06) | Provider LLM | Coleta cross-LLM + Redator no pipeline editorial | Drift silencioso (R-006) |
| **Anthropic API** (Claude sonnet-4-5) | Provider LLM | Coleta cross-LLM + Revisor (60% do gasto editorial) | Rate limit em horário de pico |
| **Google Gemini API** (1.5-pro) | Provider LLM | Coleta cross-LLM + Analisador | Mudança de pricing |
| **Perplexity API** (sonar-pro) | Provider LLM RAG-native | Coleta cross-LLM (sensor RAG **obrigatório**) + Pesquisador | Indisponibilidade invalida coleta do dia |
| **xAI Grok API** (grok-2) | Provider LLM | Coleta cross-LLM | Cobertura semântica em PT-BR ainda imatura |
| **Microsoft Copilot via Bing API** | Provider LLM | Coleta cross-LLM (RAG-native via Bing) | Acesso programático mais restrito que outros |
| **GA4 (Google Analytics 4)** | Analytics | Atribui sessões originadas em referrer/UTM de LLM (KPI 7 Conversion Lift) | R-009 — captura não pronta até 25-05 deferre KPI 7 |
| **GitHub** | Source control + CI/CD + Issues | Repositórios `geo-ipog`, `geo-platform`, `geo-dashboard`. Workflows agendados (cron). Sistema de issues como tracker de gaps NAIA | Limites de minutos de Actions no plano gratuito |
| **ipog.edu.br** | CMS atual do IPOG | Hospeda Schema, `llms.txt`, páginas de produto. Não é controlado pela Brasil GEO; mudanças passam por TI IPOG | Acoplamento técnico com TI IPOG limita velocidade |
| **Wikipedia** | Fonte secundária reputada | Verbete IPOG densa em horizonte 12-18 meses (KPI 5) | Fontes secundárias insuficientes (R-008) |
| **NAIA SaaS** (naia.today) | Plataforma de diagnóstico GEO | Score técnico, monitoramento de citações cross-LLM, diagnóstico Schema | API rate limits, dependência de terceiro |
| **Hogrefe** | Editora de testes psicológicos | Fonte de cross-link e citação acadêmica para Cluster 2 (Avaliação Psicológica + SATEPSI) | Apenas fonte editorial; sem integração técnica |
| **e-MEC** | Sistema oficial de cadastro MEC | Validação de credenciamento IPOG e Portaria SERES MEC 918/2017 | URL canônica instável em períodos de manutenção |
| **Plataformas de mídia paga** | Quero Bolsa, Educa Mais Brasil (Cluster 3 apenas), LinkedIn Ads (B2B), Meta Ads (remarketing) | Origem de UTM dedicado de LLM e atribuição de canal | Inflação de CAC se Quero Bolsa romper teto Cluster 3 |
| **Common Crawl + Google Custom Search** | Crawlers públicos | Auditoria de menções externas (KPI 5) | Latência de indexação |

### A.3 Diagrama C4 Level 1 (ASCII)

```
                ┌──────────────────────────────────────────────────────────────┐
                │                   ATORES (humanos)                            │
                │                                                                │
                │  Alexandre Caramaschi   Bruno Azambuja   Ronan Maia           │
                │  (Head Brasil GEO)      (Marketing IPOG)  (CEO IPOG)          │
                │  KPIs 1,3,6,8           KPIs 2,4,5,7      Sponsor             │
                │                                                                │
                │  Conselho IPOG          Corpo docente     Candidatos P1-P7    │
                │  (8 decisões)           (Lattes/ORCID)    (queries em LLMs)   │
                └────────┬─────────────────────────────────────────┬─────────────┘
                         │ briefings + decisões                    │ queries
                         │ alertas + relatórios                    │ (não tocam o sistema)
                         ▼                                          │
        ┌────────────────────────────────────────────────────────┐  │
        │                                                          │  │
        │              SISTEMA  GEO  IPOG                          │  │
        │                                                          │  │
        │   - GEO Collector Service                                │  │
        │   - NAIA Audit Engine                                    │  │
        │   - Voice Guard Service                                  │  │
        │   - Schema/llms.txt Manager                              │  │
        │   - KPI Dashboard Web App                                │  │
        │   - Editorial CMS                                        │  │
        │   - Reporting Service                                    │  │
        │   - Data Warehouse (séries temporais + JSONL frio)       │  │
        │   - Identity & Secrets                                   │  │
        │                                                          │  │
        └──┬─────────┬─────────┬──────────┬─────────┬────────┬─────┘  │
           │         │         │          │         │        │        │
           ▼         ▼         ▼          ▼         ▼        ▼        ▼
     ┌─────────┐ ┌────────┐ ┌──────┐ ┌────────┐ ┌────┐ ┌──────┐ ┌──────────┐
     │ 6 LLMs  │ │  GA4   │ │GitHub│ │ipog.edu│ │NAIA│ │Wiki  │ │ Mídia    │
     │  APIs   │ │        │ │      │ │  .br   │ │SaaS│ │pédia │ │ Paga +   │
     │         │ │        │ │ CI   │ │ (CMS)  │ │API │ │      │ │ e-MEC +  │
     │OpenAI   │ │        │ │ +    │ │        │ │    │ │      │ │ Hogrefe  │
     │Anthropic│ │        │ │Issues│ │        │ │    │ │      │ │          │
     │Google   │ │        │ │      │ │        │ │    │ │      │ │          │
     │Perplex. │ │        │ │      │ │        │ │    │ │      │ │          │
     │xAI      │ │        │ │      │ │        │ │    │ │      │ │          │
     │MS       │ │        │ │      │ │        │ │    │ │      │ │          │
     └─────────┘ └────────┘ └──────┘ └────────┘ └────┘ └──────┘ └──────────┘
```

### A.4 Fluxos de dados primários

1. **Fluxo de coleta diária** (cron 06h00 BRT): Scheduler dispara GEO Collector Service → enumera 75 prompts de `KIT-PROMPTS-V0.md` → executa cada prompt em 6 LLMs com versão pinada → grava JSONL em `data/coleta/YYYY-MM-DD.jsonl` → pós-processador classifica `ipog_mentioned` + `competitors_mentioned` + `ipog_citation_quality` → atualiza séries temporais no Data Warehouse.
2. **Fluxo de auditoria NAIA mensal**: NAIA Audit Engine roda 100+ checks contra `ipog.edu.br` (HTML, Schema, robots.txt, llms.txt, sitemap, headers HTTP) → cria GitHub Issue por gap P0/P1 → atualiza KPI 4 (Schema Coverage Score) no dashboard.
3. **Fluxo editorial**: Pesquisador (Perplexity) → Redator (GPT-4o) → Analisador (Gemini) → Classificador (Groq) → Revisor (Claude) → Voice Guard score → publicação em CMS Editorial → Schema `Article` + `Person` aplicado → cross-link com produto MBA → indexação observada via spot-check em Perplexity 24-48h depois.
4. **Fluxo de reporting**: Reporting Service consome séries temporais + logs JSONL → gera relatório semanal (Bruno + Alexandre), mensal (Ronan), trimestral (Conselho) em Markdown → publica em `docs/relatorios-*` → notifica via canal de comunicação operacional.
5. **Fluxo de feedback ao site**: Schema/llms.txt Manager gera artefatos versionados → PR aberto contra branch principal → Bruno aprova → TI IPOG faz deploy em `ipog.edu.br` → NAIA valida pós-deploy.

---

## Bloco B — Visão de containers (C4 Level 2)

Cada container é uma unidade de deploy independente, com responsabilidade declarada, tecnologia recomendada, alternativas consideradas e dependências explícitas. A escolha de containers reflete o equilíbrio entre coesão (pipelines com lógica afim ficam juntos) e desacoplamento (sistemas com cadências e SLOs diferentes ficam separados).

### B.1 GEO Collector Service

**Responsabilidade:** orquestrar a coleta diária cross-LLM contra os 6 provedores canônicos. Implementa cache SHA-256 idempotente, retry exponencial, circuit breaker por provedor, drift detection, validação fail-loud e logging JSONL estruturado conforme `dashboards/RUNBOOK-COLETA-LLM.md`.

**Tecnologia recomendada:** **Python 3.12** + biblioteca `httpx` (async HTTP) + `pydantic` v2 (validação de payloads) + `tenacity` (retry exponencial) + `tiktoken` para contagem de tokens. Persistência em SQLite (D1) para o índice de execuções e em arquivos JSONL para o log integral. Worker stateless executado em Cloudflare Workers (decisão ADR-002) com triggers de cron nativos.

**Alternativas consideradas:**
- **TypeScript + Bun + Cloudflare Workers nativo**: vantagem de tipos compartilhados com o frontend (KPI Dashboard). Desvantagem: ecossistema de SDKs LLM é mais maduro em Python (especialmente Anthropic, Perplexity, OpenAI). Custo de manter dois SDKs paralelos é alto.
- **Python + AWS Lambda + EventBridge**: vantagem de timeout estendido (15 min). Desvantagem: vendor lock-in AWS, custo de cold start alto para chamadas curtas, e o programa já tem Cloudflare como provider preferido pelo ecossistema da Brasil GEO (ver `landing-page-geo`).
- **Node.js + Vercel Cron**: vantagem de proximidade com `landing-page-geo` (que vive em Vercel). Desvantagem: limites de execução em Vercel cron são mais agressivos, sem suporte nativo a JSONL streaming.

**Justificativa:** Python tem o ecossistema mais maduro para LLMs (oficial SDKs Anthropic, OpenAI, Google, e wrappers de qualidade para Perplexity/xAI). Cloudflare Workers (via Pyodide ou containerização leve) oferece zero cold start, custo previsível e proximidade com o restante do stack Cloudflare. O perfil do time Brasil GEO (Alexandre tem profundidade em Python no contexto papers/orchestrator) reduz time-to-market.

**Dependências:** Identity & Secrets (chaves dos 6 provedores), Data Warehouse (escrita em séries temporais + JSONL frio), Schedulers (GitHub Actions cron como redundância).

**Owner:** Brasil GEO (Alexandre Caramaschi).

**SLO:** coleta válida em pelo menos 28 dos 30 dias do mês (≥93%), com Perplexity em 100% das queries dia-a-dia. Falha por 3 dias consecutivos escala para incidente crítico.

### B.2 NAIA Audit Engine

**Responsabilidade:** executar a bateria de 100+ checks NAIA-XXX (`audits/PLAYBOOK-AUDITORIA-NAIA.md`) sobre `ipog.edu.br`. Coleta HTML renderizado, JSON-LD extraído, headers HTTP, robots.txt, llms.txt e sitemap. Compara contra padrões canônicos em `audits/SCHEMA-PATTERNS.md` e `audits/LLMS-TXT-TEMPLATE.md`. Emite gap P0-P3 como GitHub Issue automatizado e calcula KPI 4 (Schema Coverage Score).

**Tecnologia recomendada:** **Python 3.12** + `httpx` + `selectolax` (parsing HTML rápido) + `extruct` (extração JSON-LD/microdata/RDFa) + `playwright` (apenas para páginas JS-heavy quando necessário) + `pyld` (validação JSON-LD). Persistência em SQLite (D1) para histórico de checks e em JSON snapshots arquivados.

**Alternativas consideradas:**
- **Lighthouse + GitHub Actions**: vantagem de bateria pronta de Web Vitals. Desvantagem: não cobre os checks NAIA-XXX customizados (Schema canônico do programa, Person + Lattes/ORCID, llms.txt).
- **Schema.org Validator API + Rich Results Test API**: vantagem de validação oficial. Desvantagem: rate limits agressivos, sem API estável pública para Rich Results, exige headless browser.

**Justificativa:** os 100+ checks do `PLAYBOOK-AUDITORIA-NAIA.md` são específicos do programa (incluem semântica IPOG: nome canônico, autorização MEC, formato lato sensu, naming MBA, Person+Lattes). Lighthouse e validators oficiais cobrem subset, mas não substituem. Reusar Python + bibliotecas maduras de parsing é o caminho mais barato.

**Dependências:** Data Warehouse, GitHub API (criação de issues), Schema/llms.txt Manager (re-validação pós-deploy).

**Owner:** Brasil GEO (execução) + Bruno Azambuja (validação operacional).

**SLO:** auditoria mensal completa entregue em até 2 dias úteis após disparo; spot-check quinzenal em até 4 horas.

### B.3 Voice Guard Service

**Responsabilidade:** validar peças editoriais HBR-grade contra 4 dimensões editoriais — voz Alexandre Caramaschi (`content/VOICE-GUIDE.md`), padrão editorial HBR (`content/PADRAO-EDITORIAL.md`), Bloom 3+ em exercícios e CTAs (`content/BLOOM-KNOWLES.md`) e deny-list de clichês (`content/CLICHES-PROIBIDOS.md`). Score 0-100 por peça; threshold mínimo 70 para publicação.

**Tecnologia recomendada:** **Python 3.12** com adapter para o `voice_guard.py` já existente em `C:/Sandyboxclaude/scripts/python/voice_guard.py`. Wrapping em microsserviço HTTP simples (FastAPI) executado em Cloudflare Workers ou GitHub Actions on-demand. Saída em JSON estruturado consumível por CI e por CMS Editorial.

**Alternativas consideradas:**
- **Reescrever em TypeScript**: dobra o esforço de manutenção das regras editoriais; o código já existe e é maduro em Python.
- **Service-as-a-library (npm package + import nativo)**: bom para integração com frontend Next.js, mas perde a semântica de microsserviço auditável (logs centralizados, versionamento de regras).

**Justificativa:** reuso do investimento já feito em `voice_guard.py` (memória `feedback_alexandre_voice` e publishers existentes). Microsserviço HTTP permite chamada de qualquer pipeline (CI editorial, CMS, agente sub-Opus em paralelo).

**Dependências:** repositório de regras editoriais (`content/*.md`), Data Warehouse (histórico de scores).

**Owner:** Brasil GEO.

**SLO:** chamada síncrona < 5 segundos por peça de até 4.000 palavras.

### B.4 Schema/llms.txt Manager

**Responsabilidade:** gerar, validar e versionar artefatos declarativos canônicos — JSON-LD `EducationalOrganization`, `Course`, `EducationalOccupationalProgram`, `FAQPage`, `Article`, `Person` (com Lattes/ORCID); arquivo `llms.txt`; `robots.txt` com allow-list de crawlers de IA. Aplica templates canônicos de `audits/SCHEMA-PATTERNS.md` e `audits/LLMS-TXT-TEMPLATE.md` parametrizados por curso/produto.

**Tecnologia recomendada:** **Python 3.12** + `jinja2` (templating de Schema parametrizado por slug) + `jsonschema` para validação. Output deployável como PR em GitHub que TI IPOG aplica em `ipog.edu.br`. Snapshots arquivados em `audits/schema-implementations/{YYYY-MM-DD}-{slug}.json` (já previsto no DoD seção 3).

**Alternativas consideradas:**
- **Editor manual em Markdown/JSON sem ferramenta**: alto risco de drift entre páginas, custo de revisão exponencial.
- **Plugin de CMS**: dependeria do CMS escolhido pelo IPOG; menos auditável.

**Justificativa:** geração programática a partir de templates canônicos garante consistência cross-página (NAIA-009: `@id` consistente). PR como artefato de deploy permite revisão por Bruno antes de TI IPOG aplicar.

**Dependências:** repositório `geo-ipog` (templates), GitHub API (PRs), NAIA Audit Engine (re-validação pós-deploy).

**Owner:** Brasil GEO + TI IPOG (deploy efetivo) + Bruno Azambuja (aprovação).

**SLO:** geração de Schema completo para um novo curso em até 1 hora; PR aberto e validado em até 4 horas.

### B.5 KPI Dashboard Web App

**Responsabilidade:** visualizar os 8 KPIs canônicos em tempo quase-real, com decomposição por LLM, cluster, persona, jornada. Dashboard executivo para Ronan, dashboard operacional para Bruno e Alexandre, dashboard temporal para análise de Delta pré/pós (KPI 8).

**Tecnologia recomendada:** **Next.js 16 + React Server Components + Recharts + Tailwind**. Hosting em Cloudflare Pages (mesma família do GEO Collector). Acesso autenticado via Cloudflare Access (SSO Google Workspace IPOG). Dados consumidos via API REST do Reporting Service.

**Alternativas consideradas:**
- **Streamlit**: time-to-market 1-2 dias, ótimo para protótipo. Desvantagem: layout pouco controlável, autenticação fraca, branding Brasil GEO inviável.
- **Metabase / Apache Superset**: ferramentas BI maduras com gráficos prontos. Desvantagem: hosting próprio caro, autenticação complexa, customização de widgets KPI 8 (Delta pré/pós) requer SQL avançado.
- **Astro + Hono + ECharts**: ecossistema mais leve, builds rápidos. Desvantagem: ecossistema React maior; o IPOG e Brasil GEO já têm investimento em Next.js (`landing-page-geo`).

**Justificativa:** Next.js com Recharts dá controle total de layout (8 KPIs com decomposição é uma view não-óbvia que ferramentas BI não cobrem bem), permite branding Brasil GEO, e vive em Cloudflare Pages com custo próximo de zero. Alinha com o stack do `landing-page-geo` (Alexandre tem fluência) e do `geo-stone` (memória `project_geo_ipog_kickoff`).

**Dependências:** Reporting Service (API), Identity & Secrets (Cloudflare Access).

**Owner:** Brasil GEO.

**SLO:** disponibilidade 99,5%, P95 de carregamento < 2 segundos, atualização das séries diária a 09h30 BRT após validação fail-loud da coleta.

### B.6 Editorial CMS

**Responsabilidade:** gerenciar peças HBR-grade desde rascunho até publicação. Voice Guard inline em editor; histórico de versões; metadados Schema `Article` declarados na peça; cross-link com produto MBA; deploy automatizado para `ipog.edu.br/blog` ou para repositório editorial híbrido.

**Decisão de build-vs-buy:** **híbrido** — peças continuam em Markdown versionado em Git (drafts), com plugin Voice Guard chamando o serviço HTTP da B.3. Publicação final acontece no CMS atual do IPOG via export pré-aprovado por Bruno. Não há CMS proprietário do programa GEO IPOG no curto prazo (Fase 1 e 2).

**Alternativas consideradas:**
- **Sanity / Contentful / Payload CMS**: vantagem de UX rica para autores. Desvantagem: licença de Sanity profissional ~USD 99/mês, lock-in de schema, e o IPOG já tem CMS próprio onde as peças finais vivem. Custo não justifica.
- **Build custom com Next.js + MDX + Vercel KV**: 4-6 semanas de dev. Apenas se Fase 4 demandar volume editorial > 30 peças/mês.

**Justificativa:** no horizonte do pico 2026.2, são 6-8 peças HBR. Markdown em Git + Voice Guard como CI gate é suficiente. Build de CMS custom é overkill e queima time-to-market do pico. Reavaliação prevista em 2027.1 quando volume editorial cresce.

**Dependências:** Voice Guard Service, Schema/llms.txt Manager (geração de `Article` Schema), GitHub.

**Owner:** Brasil GEO (operação editorial) + Bruno Azambuja (aprovação) + TI IPOG (deploy final).

**SLO:** ciclo rascunho-a-publicação ≤ 5 dias úteis para peça crítica de pico.

### B.7 Reporting Service

**Responsabilidade:** gerar relatórios automatizados em 3 cadências — semanal (KPIs operacionais para Bruno + Alexandre), mensal (board report para Ronan), trimestral (Conselho IPOG). Saída em Markdown auditável + HTML renderizado para apresentação. Reuso do worker `report-builder.yml` já presente em `.github/workflows/`.

**Tecnologia recomendada:** **Python 3.12** + `jinja2` (templates Markdown) + `pandas` (agregações de séries) + `matplotlib`/`plotly` para gráficos embutidos. Disparo via GitHub Actions cron (semana, mês, trimestre). Saída commitada em `docs/relatorios-semanais/`, `docs/relatorios-mensais/`, `docs/relatorios-trimestrais/` (paths já existentes).

**Alternativas consideradas:**
- **Notion API + Notion como destino**: ótimo para leitura, mas perde versionamento Git e auditoria de longo prazo.
- **Google Docs via API**: força Markdown → conversão; risco de perder formatação canônica.

**Justificativa:** Markdown em Git é fonte de verdade auditável para Conselho. Geração programática em Python aproveita o `pandas`/séries do Data Warehouse. Reuso do workflow `report-builder.yml`.

**Dependências:** Data Warehouse, GitHub.

**Owner:** Brasil GEO.

**SLO:** relatório semanal entregue até segunda-feira 12h BRT; mensal até dia 5 do mês seguinte; trimestral até dia 10 do trimestre seguinte.

### B.8 Data Warehouse

**Responsabilidade:** persistir séries temporais dos 8 KPIs, logs JSONL de coleta cross-LLM, snapshots de Schema, histórico de NAIA, custos FinOps por sprint, custos por execução. Camada analítica para Reporting Service e Dashboard.

**Tecnologia recomendada:** **camada quente em SQLite (Cloudflare D1)** para séries temporais de KPIs e índice de execuções (até ~10 GB) + **camada fria em Cloudflare R2** para JSONL diários, snapshots de Schema e auditorias NAIA históricas (custo USD 0,015 por GB/mês, sem egress fees). Análise ad hoc com **DuckDB** lendo direto de R2 via Parquet quando necessário.

**Alternativas consideradas:**
- **PostgreSQL gerenciado (Supabase, Neon, Railway)**: vantagem de SQL completo, índices avançados. Desvantagem: custo fixo USD 25-50/mês mesmo com pouco volume; overkill para o programa que tem volume modesto.
- **DuckDB analytics + S3**: vantagem de queries analíticas rapidíssimas. Desvantagem: não é OLTP — escrever séries diárias é trabalhoso. Solução é usar DuckDB **só para análise** (que é exatamente o que está proposto).

**Justificativa:** D1 (SQLite) cobre 100% das necessidades transacionais do programa (séries temporais com cardinalidade baixa: 8 KPIs × 6 LLMs × 75 prompts × 30 dias = ~108k linhas/mês). R2 é o destino certo para JSONL volumoso (a USD 0,015/GB, 10 GB/mês = USD 0,15). DuckDB lê Parquet de R2 sem custo adicional.

**Dependências:** Cloudflare account (D1 + R2).

**Owner:** Brasil GEO.

**SLO:** disponibilidade 99,9%, backup diário automático, retenção 24 meses online + arquivamento indefinido em R2 frio.

### B.9 Identity & Secrets

**Responsabilidade:** gerenciar e rotacionar chaves de API dos 6 provedores LLM, credenciais GA4, tokens GitHub, Cloudflare API tokens, e governança de SSO para o Dashboard.

**Tecnologia recomendada:** **GitHub Secrets** para chaves usadas em Actions (cron de coleta, deploys) + **Cloudflare Workers Secrets** (binding nativo) para chaves usadas em runtime. **1Password Business** como source-of-truth humano (vault `geo-ipog`) para auditoria de quem tem acesso ao quê. SSO via Cloudflare Access para o Dashboard com Google Workspace IPOG.

**Alternativas consideradas:**
- **Doppler**: vantagem de sync centralizado entre múltiplos ambientes. Desvantagem: custo USD 7-15/usuário/mês; programa tem 2-3 usuários, custo se justifica em 2027.1.
- **AWS Secrets Manager**: requer entrar em AWS apenas para isso; lock-in adicional.
- **Apenas `.env` em Git ignored**: risco alto de vazamento; já há precedente positivo no ecossistema Brasil GEO de uso de GitHub Secrets + 1Password.

**Justificativa:** GitHub Secrets + Cloudflare Workers Secrets cobrem uso técnico com custo zero. 1Password Business já é assinatura corporativa; vault dedicado é zero custo marginal. Doppler entra como upgrade quando a equipe crescer.

**Dependências:** GitHub, Cloudflare, 1Password.

**Owner:** Brasil GEO (rotação trimestral) + Bruno Azambuja (acesso).

**SLO:** rotação de chaves a cada 90 dias; rotação de emergência em até 2 horas após incidente.

---

## Bloco C — Decisões arquiteturais (ADRs)

Cada ADR segue o template canônico — contexto, opções consideradas, decisão, consequências, status, data, autor. Qualquer mudança subsequente é registrada como ADR novo (não-mutável) com referência ao predecessor.

### ADR-001 — Linguagem principal: Python como default, TypeScript em fronteiras de UI

**Contexto:** O programa precisa de coleta cross-LLM, parsing HTML/Schema, classificação de respostas, geração de relatórios e dashboard web. O time Brasil GEO tem profundidade comprovada em Python (papers, geo-orchestrator, voice_guard, scripts Drive/GSC). O dashboard precisa de UI rica.

**Opções consideradas:**
- **A. Python only**: stack uniforme; UI em Streamlit ou Reflex.
- **B. TypeScript only**: tipos ponta-a-ponta; UI rica em Next.js.
- **C. Python no backend + TypeScript no frontend**: cada camada com a melhor ferramenta.

**Decisão:** Opção C. Python para Collector, NAIA, Voice Guard, Schema Manager, Reporting. TypeScript + Next.js para Dashboard e qualquer endpoint público.

**Consequências:**
- Positivas: aproveita maturidade do time em Python; ecossistema oficial dos SDKs LLM (Anthropic, OpenAI, Google, Perplexity); Next.js para UI rica e branding.
- Negativas: dois ecossistemas a manter (build, lint, dependências); contratos entre frontend e backend precisam ser explícitos via OpenAPI ou tRPC adapter.

**Status:** Aceita.
**Data:** 2026-05-01.
**Autor:** Brasil GEO Solution Architecture.

### ADR-002 — Hosting: Cloudflare Workers + R2 + D1 + Pages como stack primária

**Contexto:** O programa precisa de cron jobs diários, storage de JSONL frio, banco de séries temporais, e hosting de dashboard, com FinOps disciplinado (teto USD 50/sprint). Programa coexiste com `landing-page-geo` (Vercel) e workers Herreira (Cloudflare).

**Opções consideradas:**
- **A. Cloudflare Workers + R2 + D1 + Pages**: stack uniforme Cloudflare. Custo previsível, zero egress.
- **B. Vercel + Supabase**: ótima DX para Next.js, Postgres pronto. Custo USD 25/mês Supabase Pro + Vercel Hobby.
- **C. AWS Lambda + RDS + S3 + CloudFront**: poder máximo, lock-in alto, custo médio USD 30-60/mês mesmo com baixo volume.
- **D. Railway**: simples, mas custo USD 20+/serviço ativo escala rápido.

**Decisão:** Opção A. Cloudflare como stack primária. Vercel reservado para `landing-page-geo` (já vivo lá).

**Consequências:**
- Positivas: zero egress fees, Workers cron nativo, R2 a USD 0,015/GB, D1 SQLite serverless gratuito até 5 GB, Pages free tier generoso. Brasil GEO já tem fluência (Herreira).
- Negativas: D1 ainda em GA recente (2024-2025); limites de tempo de execução por Worker (30s default, 5 min com Workers Unbound). Mitigação: Collector roda em chunks de prompts.

**Status:** Aceita.
**Data:** 2026-05-01.
**Autor:** Brasil GEO Solution Architecture.

### ADR-003 — Banco de dados: D1 (SQLite) quente + R2 (Parquet) frio + DuckDB analítico

**Contexto:** Volume modesto (centenas de execuções/dia), série temporal de baixa cardinalidade, JSONL diários volumosos, queries analíticas pontuais. Necessidade de retenção 24 meses online + arquivamento indefinido.

**Opções consideradas:**
- **A. PostgreSQL único (Supabase ou Neon)**: poder, mas overkill e custo fixo USD 25/mês.
- **B. SQLite (D1) + R2 + DuckDB**: separação OLTP/OLAP, custo near-zero.
- **C. ClickHouse hospedado**: ótimo para séries temporais. Custo mínimo USD 50/mês.

**Decisão:** Opção B.

**Consequências:**
- Positivas: custo total < USD 1/mês até 10 GB de R2; D1 cobre OLTP; DuckDB lê Parquet de R2 sem ETL.
- Negativas: queries cross-table com R2 não são em tempo real; análise pesada é batch (aceitável).

**Status:** Aceita.
**Data:** 2026-05-01.
**Autor:** Brasil GEO Solution Architecture.

### ADR-004 — Monorepo vs multi-repo: multi-repo com separação clara de domínio

**Contexto:** Programa GEO IPOG tem múltiplos contextos (coleta, dashboard, conteúdo do site IPOG, repositório de docs) com cadências e owners distintos. Repositório `geo-ipog` já existe com docs + workflows.

**Opções consideradas:**
- **A. Monorepo único `geo-ipog/`**: tudo junto, tooling unificado, fácil cross-link. Risco de inflar e misturar concerns.
- **B. Multi-repo claro**: `geo-ipog` (docs + governança), `geo-platform` (collector + NAIA + Voice Guard + reporting), `geo-dashboard` (UI), `geo-ipog-website` (Schema + llms.txt versionados que IPOG aplica).
- **C. Monorepo com Turborepo/pnpm workspaces**: poder do monorepo com pacotes isolados. Overkill para 3-4 repos.

**Decisão:** Opção B (multi-repo). Splits canônicos:
1. `alexandrebrt14-sys/geo-ipog` — docs do programa, governança, KPIs canônicos (já existe).
2. `alexandrebrt14-sys/geo-platform` — código Python: Collector, NAIA, Voice Guard, Schema Manager, Reporting (a criar).
3. `alexandrebrt14-sys/geo-dashboard` — Next.js/TypeScript do KPI Dashboard (a criar).
4. `alexandrebrt14-sys/geo-ipog-website` — Schema canônico, llms.txt, robots.txt, snippets HTML que TI IPOG aplica em `ipog.edu.br` (a criar; é o ponto de versionamento do que IPOG deploya).

**Consequências:**
- Positivas: cada repo tem CI próprio, owner próprio, cadência de release independente. Separação `geo-ipog` (docs/governança) de `geo-platform` (código executável) torna o board report e o histórico decisório separados do código volátil.
- Negativas: cross-link entre repos exige convenção (links absolutos GitHub). Mitigação: documentar em `geo-ipog/README.md`.

**Status:** Aceita.
**Data:** 2026-05-01.
**Autor:** Brasil GEO Solution Architecture.

### ADR-005 — Frontend stack KPI Dashboard: Next.js 16 + Recharts

**Contexto:** Dashboard precisa visualizar 8 KPIs com decomposição (LLM, cluster, persona, jornada), Delta pré/pós ondas, e comparativos cross-LLM. Time tem fluência Next.js (`landing-page-geo`).

**Opções consideradas:**
- **A. Next.js + Recharts (React)**.
- **B. Astro + Hono + ECharts**.
- **C. Streamlit (Python)**.
- **D. Metabase / Superset (BI gerenciado)**.

**Decisão:** Opção A.

**Consequências:**
- Positivas: controle total de layout para 8 KPIs não-triviais; SSR/RSC reduz client bundle; deploy em Cloudflare Pages.
- Negativas: tempo inicial maior que Streamlit (1-2 semanas vs 2 dias). Mitigação: protótipo em Streamlit no Sprint 1 se Dashboard de produção atrasar.

**Status:** Aceita.
**Data:** 2026-05-01.
**Autor:** Brasil GEO Solution Architecture.

### ADR-006 — Editorial CMS: Markdown em Git + Voice Guard como CI gate (sem CMS proprietário no curto prazo)

**Contexto:** 6-8 peças HBR no horizonte do pico 2026.2; CMS atual do IPOG é o destino final de publicação. Voice Guard score já existe em Python.

**Opções consideradas:**
- **A. Sanity / Contentful / Payload CMS**: rico, mas USD 99+/mês e lock-in.
- **B. Markdown em Git + Voice Guard CI + export para CMS IPOG**: simples, auditável.
- **C. Build custom Next.js + MDX**: 4-6 semanas, vale apenas em volume alto.

**Decisão:** Opção B.

**Consequências:**
- Positivas: time-to-market imediato; CI gate auditável; cross-link com Schema Manager trivial.
- Negativas: UX de autor é Markdown puro. Aceitável para Alexandre (já é workflow). Reavaliar em 2027.1 se volume passar 15 peças/mês.

**Status:** Aceita.
**Data:** 2026-05-01.
**Autor:** Brasil GEO Solution Architecture.

### ADR-007 — Schedulers: GitHub Actions cron + Cloudflare Triggers como redundância

**Contexto:** GitHub Actions cron já está em uso (`concorrentes-monitoring.yml`, `report-builder.yml`). Cron precisa rodar diário 06h00 BRT (coleta), quinzenal (concorrentes), mensal (NAIA + relatórios).

**Opções consideradas:**
- **A. GitHub Actions cron único**: simples, free tier 2.000 min/mês.
- **B. Cloudflare Triggers único**: nativo dos Workers, sem dependência externa.
- **C. Híbrido**: GitHub Actions para jobs longos (NAIA mensal) e Cloudflare Triggers para coleta diária crítica.

**Decisão:** Opção C. Coleta diária e dashboard refresh em Cloudflare Triggers (latência baixa, mesma plataforma do Worker). NAIA mensal e snapshots concorrentes em GitHub Actions (jobs > 5 min e PR-as-output).

**Consequências:**
- Positivas: separação por SLO; coleta crítica não depende de fila de Actions; jobs longos não consomem minutos do plano free do Workers.
- Negativas: dois agendadores a monitorar. Mitigação: dashboard tem painel "última execução por tipo de job".

**Status:** Aceita.
**Data:** 2026-05-01.
**Autor:** Brasil GEO Solution Architecture.

### ADR-008 — Secrets management: GitHub Secrets + Cloudflare Workers Secrets, 1Password como vault humano

**Contexto:** 6 chaves LLM + GA4 + GitHub PAT + Cloudflare token. Necessidade de rotação trimestral. Time pequeno (2-3 pessoas).

**Opções consideradas:**
- **A. GitHub Secrets + Cloudflare Workers Secrets + 1Password Business vault**: custo zero marginal.
- **B. Doppler**: USD 7/usuário/mês, central, mas overkill para 2-3 usuários.
- **C. AWS Secrets Manager**: lock-in AWS sem motivo.
- **D. HashiCorp Vault self-hosted**: poder máximo, custo operacional alto.

**Decisão:** Opção A.

**Consequências:**
- Positivas: zero custo marginal; vault humano em 1Password já existe; rotação documentada em playbook trimestral.
- Negativas: sync manual entre 1Password e GitHub/Cloudflare. Mitigação: script de rotação versionado em `geo-platform/scripts/rotate-secrets.sh`.

**Status:** Aceita.
**Data:** 2026-05-01.
**Autor:** Brasil GEO Solution Architecture.

### ADR-009 — Observability: logs estruturados + Cloudflare Logs + Axiom como tier 1, OpenTelemetry deferido

**Contexto:** Programa precisa observabilidade básica (logs de coleta, alertas de drift, custos FinOps por execução). Volume baixo a médio.

**Opções consideradas:**
- **A. Cloudflare Logs + Axiom (free tier 500 GB/mês)**: simples, near-zero cost.
- **B. Datadog**: poder, custo alto USD 15+/host/mês.
- **C. Grafana Cloud**: bom equilíbrio, USD 0-49/mês conforme volume.
- **D. OpenTelemetry full stack self-hosted**: máxima portabilidade, custo operacional alto.

**Decisão:** Opção A para Fase 1-3. Reavaliar OpenTelemetry em 2027.1 se programa escalar para múltiplos clientes.

**Consequências:**
- Positivas: instrumentação rápida (push de eventos JSON via HTTP), retenção 30 dias gratuita Axiom.
- Negativas: queries Axiom têm linguagem própria (APL); curva de aprendizado.

**Status:** Aceita.
**Data:** 2026-05-01.
**Autor:** Brasil GEO Solution Architecture.

### ADR-010 — API style: REST simples entre Reporting Service e Dashboard, sem GraphQL

**Contexto:** Dashboard consome séries temporais e agregações de poucos endpoints (8 KPIs, drilldowns por LLM/cluster). Não há clientes externos.

**Opções consideradas:**
- **A. REST com OpenAPI**: simples, cacheável, ferramentas maduras.
- **B. tRPC**: tipos ponta-a-ponta com TypeScript. Acopla cliente ao servidor TS.
- **C. GraphQL**: poder, mas overhead injustificado para escopo atual.

**Decisão:** Opção A. REST com OpenAPI 3.1 declarado em `geo-platform/openapi.yaml`. Cliente Next.js consome via fetch nativo + tipos gerados via `openapi-typescript`.

**Consequências:**
- Positivas: cacheável em Cloudflare CDN; trivial para integração com Postman / curl debug.
- Negativas: tipos não compartilhados nativamente. Mitigação: codegen via openapi-typescript.

**Status:** Aceita.
**Data:** 2026-05-01.
**Autor:** Brasil GEO Solution Architecture.

---

## Bloco D — Repositórios secundários a criar

A separação multi-repo (ADR-004) materializa em 4 repositórios sob `github.com/alexandrebrt14-sys/`. Cada repo tem propósito declarado, stack alinhado com ADRs, dependências explícitas e owner.

### D.1 `geo-ipog` (já existe)

**Propósito:** governança, docs, prompts canônicos, KPIs canônicos, runbooks, playbooks, board reports, atas, risk register, relatórios. Fonte de verdade da estratégia.

**Stack:** Markdown + GitHub Actions (workflows quality, labeler, stale, report-builder, concorrentes-monitoring).

**Dependências:** consumido por todos os outros repos como source-of-truth (templates de Schema, prompts, regras editoriais, KPIs).

**Owner:** Alexandre Caramaschi + Bruno Azambuja.

**Cadência de mudança:** semanal (atas, relatórios) + mensal (KPI snapshots) + sob demanda (decisões arquiteturais).

### D.2 `geo-platform` (a criar)

**Propósito:** monolito Python com 5 módulos — Collector, NAIA, Voice Guard, Schema Manager, Reporting. Cada módulo é um pacote Python instalável via uv/pip. Workflows GitHub Actions disparam cron de coleta diária e auditoria mensal.

**Stack:** Python 3.12, uv (gerenciador de deps moderno), httpx, pydantic v2, tenacity, selectolax, extruct, pyld, jinja2, pandas, plotly. Persistência em D1 + R2 via SDKs Cloudflare. Deploy em Cloudflare Workers (módulos curtos) + GitHub Actions (módulos longos como NAIA mensal).

**Dependências:** consome `geo-ipog` (regras, prompts, templates) via git submodule ou workflow `gh repo clone` em CI; expõe API REST consumida por `geo-dashboard`.

**Owner:** Alexandre Caramaschi.

**Cadência de release:** semanal em Sprint ativa, semi-mensal em manutenção.

**Estrutura de pastas proposta:**
```
geo-platform/
  src/
    collector/         # GEO Collector Service
    naia/              # NAIA Audit Engine
    voice_guard/       # Voice Guard Service
    schema_manager/    # Schema/llms.txt Manager
    reporting/         # Reporting Service
    common/            # SDKs, utils, persistência
  scripts/
    rotate-secrets.sh
    bootstrap-d1.sh
  tests/
  openapi.yaml
  pyproject.toml
  uv.lock
  .github/workflows/
    coleta-diaria.yml
    naia-mensal.yml
    relatorios-cron.yml
```

### D.3 `geo-dashboard` (a criar)

**Propósito:** KPI Dashboard Web App (Next.js). Visualização dos 8 KPIs canônicos com decomposição. Acesso via Cloudflare Access (SSO Google Workspace IPOG).

**Stack:** Next.js 16 (App Router) + React Server Components + Recharts + Tailwind CSS + shadcn/ui. Deploy em Cloudflare Pages. Tipos consumidos via `openapi-typescript` lendo `geo-platform/openapi.yaml`.

**Dependências:** consome API REST de `geo-platform`; SSO via Cloudflare Access.

**Owner:** Alexandre Caramaschi (com sub-agent Opus para componentes complexos).

**Cadência de release:** quinzenal em Sprint ativa.

### D.4 `geo-ipog-website` (a criar — opcional, depende de aprovação IPOG)

**Propósito:** versionamento dos artefatos declarativos que TI IPOG aplica em `ipog.edu.br` — Schema canônico (JSON-LD por curso), `llms.txt`, `robots.txt`, snippets HTML para FAQ. Fonte de verdade dos sinais técnicos do site IPOG, mesmo que o CMS principal seja proprietário do IPOG.

**Stack:** JSON + Markdown + scripts Python que geram artefatos a partir de templates parametrizados. Workflows que abrem PR para revisão por Bruno antes de TI IPOG aplicar.

**Dependências:** consome templates de `geo-ipog/audits/SCHEMA-PATTERNS.md` e `geo-ipog/audits/LLMS-TXT-TEMPLATE.md`. Pode ser visto pelo Schema Manager (`geo-platform`) como destino de output.

**Owner:** Brasil GEO + TI IPOG. Depende de aprovação do IPOG para virar repositório oficial. Se não aprovado, fica como pasta dentro de `geo-platform/output/`.

**Cadência de release:** sob demanda (cada novo curso ou ajuste de Schema).

### D.5 `geo-cms` (NÃO a criar no curto prazo)

**Propósito hipotético:** CMS proprietário para peças editoriais com Voice Guard inline. Decidido não criar (ADR-006). Reavaliar em 2027.1.

---

## Bloco E — Orçamento mensal e FinOps

A disciplina FinOps em `dashboards/FINOPS-DISCIPLINA.md` declara teto de USD 50/sprint (4 semanas) para LLM APIs. Esta seção traduz o teto em orçamento mensal completo da stack arquitetural — LLM + hosting + storage + observability + domínio + CMS — em três cenários: mínimo viável, padrão e escala.

### E.1 Cenário mínimo viável (Fase 1 abril-maio 2026)

| Categoria | Item | Custo mensal (USD) | Comentário |
|---|---|---|---|
| LLM APIs (coleta + editorial) | 6 provedores cohort + 5 papéis editoriais | 50,00 | Teto canônico de 1 sprint; cobre baseline + 6-8 peças HBR |
| Hosting Cloudflare | Workers + Pages + D1 + R2 | 0,00 | Free tier abrange volume da Fase 1 |
| Hosting GitHub | Actions free tier (2.000 min/mês) | 0,00 | Suficiente para auditorias mensais e snapshots quinzenais |
| Domínio + DNS | Reuso de `brasilgeo.com.br` (já existe) | 0,00 | Sem custo marginal |
| Observability | Axiom free tier (500 GB/mês) | 0,00 | Cobre logs de coleta + Worker logs |
| Editorial CMS | Markdown em Git (Opção B do ADR-006) | 0,00 | Sem licença |
| Secrets | GitHub Secrets + 1Password Business existente | 0,00 | Vault dedicado é zero custo marginal |
| **Total mensal Fase 1** | | **50,00** | **~R$ 280/mês** |

### E.2 Cenário padrão (Fase 2 + Fase 3, junho-agosto 2026, pico 2026.2)

| Categoria | Item | Custo mensal (USD) | Comentário |
|---|---|---|---|
| LLM APIs (coleta + editorial expandido) | Volume 1,5x do baseline (mais peças HBR + sensitivity test trimestral) | 75,00 | Onda Fase 3 com 5+ peças/sprint + 2 spot-checks |
| Cloudflare Workers (volume crescente) | 10M req/mês + Workers Unbound para Collector | 5,00 | Workers paid tier USD 5/mês entry |
| Cloudflare D1 (acima do free tier) | ~10 GB armazenados + 5M reads/mês | 1,00 | Free tier cobre quase tudo |
| Cloudflare R2 | 25 GB JSONL frio + snapshots NAIA | 0,38 | USD 0,015/GB |
| GitHub Actions | Plano Team USD 4/usuário/mês × 2 | 8,00 | Mais minutos para NAIA mensal e relatórios HTML |
| Domínio + DNS | Reuso | 0,00 | |
| Observability | Axiom free tier ainda comporta | 0,00 | |
| Editorial CMS | Markdown + Voice Guard | 0,00 | |
| Secrets | Mesmo do mínimo viável | 0,00 | |
| **Total mensal Fase 2+3** | | **89,38** | **~R$ 500/mês** |

### E.3 Cenário escala (Fase 4 e 2027.1, setembro 2026 em diante)

| Categoria | Item | Custo mensal (USD) | Comentário |
|---|---|---|---|
| LLM APIs (3 produtos paralelos + B2B + Psicopedagogia) | Volume 3x do baseline; pipeline editorial maduro | 150,00 | 12-15 peças HBR/mês, 5 produtos cobertos |
| Cloudflare Workers Paid | Workers Unbound + Cron Triggers expandidos | 5,00 | Teto fixo |
| Cloudflare D1 (Premium) | Já dentro do plano Workers Paid | 0,00 | Incluído |
| Cloudflare R2 | 100 GB acumulado em 12 meses | 1,50 | USD 0,015/GB |
| GitHub Team | 2-3 usuários | 12,00 | |
| Doppler (upgrade ADR-008) | 3 usuários USD 7/mês | 21,00 | Quando time crescer |
| Observability | Axiom Pro USD 25/mês quando passar 500 GB | 25,00 | Esperado quando volume editorial 3x |
| Domínio + DNS | Reuso | 0,00 | |
| Editorial CMS | Reavaliação Sanity ou Payload em 2027.1 | 0 ou 99 | Buy postergado; decidir 2027.1 |
| **Total mensal Fase 4** | | **214,50** | **~R$ 1.200/mês** |

### E.4 Total para 12 meses (jan-dez 2026)

Premissa de phasing — 2 meses Fase 0 (jan-fev) + 2 meses Fase 1 (mar-mai com ramp) + 4 meses Fase 2+3 (jun-set incluindo pico) + 4 meses Fase 4 (out-jan ramp para 2027.1):

| Período | Meses | Custo mensal (USD) | Subtotal (USD) |
|---|---|---|---|
| Fase 0 (kickoff, sem coleta plena) | 2 | 10 | 20 |
| Fase 1 (baseline) | 3 | 50 | 150 |
| Fase 2 + 3 (pico 2026.2) | 4 | 89 | 356 |
| Fase 4 (escala) | 3 | 214 | 642 |
| **Total 12 meses 2026** | **12** | **médio 97** | **1.168 USD** |

Em BRL ao câmbio ~R$ 5,60: **~R$ 6.500/12 meses**, ou **R$ 540/mês médio**. Com margem de segurança de 25% para incidentes (drift, re-coleta, Sprint experimental), **provisão recomendada: R$ 8.150 para 2026 inteiro**.

### E.5 Comparação com receita projetada

A projeção 2026.2 do board report é R$ 2,6 milhões em receita bruta com 210 matrículas. **R$ 8.150/ano de stack arquitetural representa 0,31% da receita projetada**. Ponto de equilíbrio operacional do programa GEO IPOG é 17 matrículas marginais; o orçamento da arquitetura tecnológica equivale a 0,6 matrícula. Disciplina FinOps protege esta razão — qualquer item acima do teto exige aprovação executiva registrada.

### E.6 FinOps — alocação canônica e gates

Reafirmando o canônico de `dashboards/FINOPS-DISCIPLINA.md`:

- 60% Anthropic (Claude — Revisor + cohort)
- 25% OpenAI (GPT-4o — Redator + cohort)
- 10% Google (Gemini — Analisador + cohort)
- 3% Groq (llama-3.3-70b — Classificador)
- 2% Perplexity (sonar-pro — Pesquisador + RAG sensor obrigatório)

Gates de FinOps por sprint (4 semanas):
- 60% do teto: notificação informativa ao Alexandre.
- 80%: alerta acionável + projeção até fim do sprint.
- 95%: freeze de pipelines não-essenciais.
- 100%: block automático; reaprovação executiva obrigatória.

---

## Bloco F — Riscos arquiteturais Top 5

Cada risco arquitetural é distinto dos riscos de programa do `docs/05-risk-register.md` — foca exclusivamente em decisões e dependências da stack proposta.

### F.1 Vendor lock-in com Cloudflare

**Probabilidade:** Média.
**Impacto:** Alto (migração de Workers + D1 + R2 para outro provider é custo de meses).

**Vetor:** Cloudflare oferece preço imbatível e DX excelente, mas APIs proprietárias (D1, Workers KV, Workers Bindings) dificultam saída. Caso Cloudflare aumente preços abruptamente ou descontinue feature, migração para AWS/Vercel/Supabase exige reescrita.

**Mitigação ativa:**
- Camada de abstração persistência: D1 acessado via SDK custom em `geo-platform/src/common/db.py` que isola dialetos. Migração para Postgres (Supabase/Neon) seria troca de driver, não reescrita.
- JSONL no R2 é formato **portável** (não proprietário); migração para S3/B2 é só re-upload.
- Workers escritos como funções puras com pouca dependência de Bindings Cloudflare (cron Triggers e Secrets são exceções aceitas).
- Reavaliação trimestral do roadmap Cloudflare e benchmark de preços vs Vercel/AWS.

**Gatilho de escalonamento:** aumento de preço Workers Paid >25% ou descontinuação de D1 → migração planejada para Supabase em 6 semanas.

### F.2 Drift de modelo silencioso (R-006 em camada arquitetural)

**Probabilidade:** Alta (ocorre múltiplas vezes/ano em provedores LLM).
**Impacto:** Crítico para KPI 1, 2, 3, 8.

**Vetor:** OpenAI, Anthropic, Google atualizam modelos sem comunicação (mesmo com versão pinada, comportamento muda quando "snapshot" expira). Quebra de comparabilidade da série temporal contamina KPI 8 (Delta pré/pós).

**Mitigação ativa (já prevista no runbook, reforçada na arquitetura):**
- Drift detection é módulo first-class do Collector: entropia 7d vs 30d, alerta crítico em 3+ queries do mesmo provedor com drift no mesmo dia.
- Versão pinada armazenada em cada linha do JSONL (`model` + `model_version_observed`).
- Quando drift detectado, série é segmentada antes/depois com flag `under_drift_review`.
- Cohort de 6 LLMs **não** se substitui em caso de drift de um — coleta inválida é a resposta correta.
- Política trimestral de revisão de versões pinadas com decisão registrada em ata.

**Gatilho:** drift confirmado em Perplexity (sensor RAG obrigatório) → escalonamento crítico imediato; drift em qualquer outro provedor → segmenta série e prossegue.

### F.3 Custo escalonando com volume de prompts

**Probabilidade:** Média.
**Impacto:** Médio (pode quebrar teto FinOps em sprint pesada).

**Vetor:** Cohort de 75 prompts × 6 LLMs × 30 dias = 13.500 chamadas/mês na coleta. Aumento de prompts (calibração mensal pode adicionar prompts) ou aumento de tokens (resposta-alvo mais detalhada) escalam o custo super-linearmente.

**Mitigação ativa:**
- Cache SHA-256 idempotente: cobra apenas em miss; re-execução do dia serve do cache.
- Teto rígido USD 50/sprint com gates 60/80/95/100%.
- Classificador roda em Groq (10× mais barato que Claude/GPT-4o).
- Tokens de prompt enxutos (módulos compartilhados, deny-list em arquivo separado).
- Revisão mensal da alocação por LLM contra alvo (60/25/10/3/2); desvio >10pp dispara investigação.
- Prompts marginais (acima do canônico) cobrados em `experimental` na reserva técnica de USD 5/sprint.

**Gatilho:** chegada em 80% do teto antes de 75% do sprint → freeze não-essencial.

### F.4 Latência da coleta cross-LLM

**Probabilidade:** Média.
**Impacto:** Médio (afeta janela 06h-09h BRT; coleta inválida marca o dia).

**Vetor:** Perplexity sonar-pro com browsing pode levar 30-60s/query; com 75 queries em série, coleta diária leva > 1 hora. Workers Unbound têm timeout máximo de 5 minutos por execução. Excede sem chunking.

**Mitigação ativa:**
- Collector executa em chunks de prompts paralelos (asyncio + httpx) com concorrência limitada por provedor (respeitando rate limits).
- Janela de coleta 06h-09h BRT: Worker Cron dispara orquestrador que enfileira chunks; cada chunk roda em Worker separado; consolidação ao fim.
- Circuit breaker por provedor protege contra um provedor lento parar a coleta toda.
- Fallback: GitHub Actions cron como redundância — se Worker Cron falhar, GHA executa coleta com timeout 6h.

**Gatilho:** janela ultrapassa 09h30 BRT → alerta médio + investigação no mesmo dia.

### F.5 Compliance LGPD em dados de candidatos

**Probabilidade:** Baixa-Média.
**Impacto:** Crítico (pode parar coleta de UTM/referrer LLM e KPI 7).

**Vetor:** GA4 com Consent Mode v2 captura IDs de sessão LLM-originada (KPI 7). Se IPOG não tiver Política de Privacidade explícita sobre uso desses dados, captura cross-border pode violar LGPD (artigo 33). Se atribuição cruza com dados de matrícula no CRM IPOG, integração precisa de cláusula contratual.

**Mitigação ativa:**
- Política de Privacidade `ipog.edu.br/politica-de-privacidade` revisada com Bruno + jurídico IPOG na semana 1 (entrega prevista no DoD).
- Captura de UTM/referrer **não** persiste PII fora do GA4. IDs anonimizados.
- Audit trail de processamento documentado em `docs/compliance/LGPD-pipeline-geo.md` (a criar).
- Reporting Service não exporta nenhum dado pessoal; apenas agregações de KPI.
- Contrato de processamento de dados com IPOG declarando Brasil GEO como operador, IPOG como controlador.

**Gatilho:** notificação de incidente LGPD ou requisição ANPD → escalada imediata + suspensão temporária do KPI 7 enquanto remediação.

---

## Bloco G — Diagrama C4 Level 3: componentes do GEO Collector Service

O GEO Collector Service é o componente mais crítico do sistema. Sua falha invalida KPIs 1, 2, 3 e 8 simultaneamente. Este detalhamento C4 Level 3 desce ao nível de componentes internos: scheduler, queue, workers por LLM, persistence layer, drift detector, FinOps tracker, retry logic, idempotency cache, circuit breaker.

### G.1 Mapa de componentes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       GEO Collector Service                                  │
│                                                                              │
│  ┌──────────────┐                                                            │
│  │  Scheduler   │ ── cron 06h00 BRT (Cloudflare Trigger)                     │
│  │ (Worker Cron)│ ── fallback cron 06h30 BRT (GitHub Actions)                │
│  └──────┬───────┘                                                            │
│         │ dispatch (job_id, sprint_id, query_set_version)                    │
│         ▼                                                                    │
│  ┌──────────────────────┐    enqueue 75 × 6 = 450 work items                │
│  │  Orchestrator Worker │ ────────────────────────────────────────┐         │
│  │  (job planner)       │                                          │         │
│  └──────┬───────────────┘                                          │         │
│         │ enumera prompts × cohort                                 │         │
│         ▼                                                          ▼         │
│  ┌─────────────────┐    cache hit?    ┌────────────────────────────────┐    │
│  │ Idempotency     │ ◀──────────────▶│  Queue (Cloudflare Queues)     │    │
│  │ Cache           │                  │  ou Workers Durable Objects    │    │
│  │ (D1 + SHA-256)  │                  └──────┬─────────────────────────┘    │
│  └─────────────────┘                         │ pop work items               │
│                                                ▼                              │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │                    Provider Workers (1 por LLM)                    │     │
│  │                                                                     │     │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────┐ ┌────┐│     │
│  │  │ChatGPT   │ │Claude    │ │Gemini    │ │Perplexity│ │Grok│ │Cop.││     │
│  │  │Worker    │ │Worker    │ │Worker    │ │Worker    │ │Wkr │ │Wkr ││     │
│  │  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └─┬──┘ └─┬──┘│     │
│  └───────┼────────────┼────────────┼────────────┼─────────┼──────┼───┘     │
│          │            │            │            │         │      │          │
│          │  todos passam por:                                                │
│          │   - Retry exponencial (2s/4s/8s, max 3)                           │
│          │   - Circuit breaker (3 falhas em 60s → open 60s)                  │
│          │   - Token counter + FinOps Tracker                                │
│          ▼                                                                   │
│  ┌──────────────────────────────────────────┐                                │
│  │       Response Pipeline                   │                                │
│  │                                           │                                │
│  │  1. Hash (SHA-256) → guarda no Cache     │                                │
│  │  2. Persistence: JSONL append a R2       │                                │
│  │     + linha em D1 séries temporais       │                                │
│  │  3. Pós-processador NER → ipog_mentioned │                                │
│  │     + competitors_mentioned              │                                │
│  │  4. Pós-processador Citation Quality     │                                │
│  │     (Groq llama-3.3-70b)                  │                                │
│  └──────┬───────────────────────────────────┘                                │
│         │                                                                    │
│         ▼                                                                    │
│  ┌──────────────────────┐    ┌─────────────────────┐                         │
│  │ Drift Detector       │    │ FinOps Tracker      │                         │
│  │ (entropia 7d vs 30d) │    │ (sprint accumulator)│                         │
│  └──────┬───────────────┘    └────────┬────────────┘                         │
│         │ alerta crítico               │ gate em 60/80/95/100%               │
│         ▼                              ▼                                     │
│  ┌─────────────────────────────────────────────┐                             │
│  │     Validation (fail-loud)                   │                             │
│  │   - cobertura >= 95% por LLM                 │                             │
│  │   - Perplexity 100%                          │                             │
│  │   - latências dentro do envelope             │                             │
│  │   coleta inválida → marca dia + alerta       │                             │
│  └──────┬───────────────────────────────────────┘                             │
│         │                                                                    │
│         ▼                                                                    │
│  ┌─────────────────────────────────────────────┐                             │
│  │     Notifier (Slack/Discord/email)           │                             │
│  │   - alerta crítico (drift, 4+ circuit open) │                             │
│  │   - alerta alto (coleta inválida)           │                             │
│  └─────────────────────────────────────────────┘                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### G.2 Detalhamento por componente

**Scheduler.** Cloudflare Cron Trigger às 06h00 BRT (09h UTC) dispara o Orchestrator Worker. Fallback em GitHub Actions cron às 06h30 BRT — se Worker Cron não tiver disparado em 30 minutos, GHA executa a coleta. Idempotência garantida pelo `job_id = sha256(date_iso || sprint_id)`.

**Orchestrator Worker.** Lê `prompts/KIT-PROMPTS-V0.md` da revisão vigente (declarada em `query_set_version`), enumera 75 × 6 = 450 work items, e enfileira na Queue. Decisão arquitetural: enfileirar tudo de uma vez é simples; a Queue gerencia paralelismo controlado.

**Idempotency Cache.** D1 SQLite com tabela `coleta_cache(hash TEXT PRIMARY KEY, response_text BLOB, created_at TIMESTAMP, expires_at TIMESTAMP)`. Chave: `sha256(provider || '|' || model_pinned || '|' || query_id || '|' || query_text || '|' || data_iso)`. TTL 24 horas. Cache miss vai para coleta efetiva; cache hit registra `cache_hit: true` no log.

**Queue (Cloudflare Queues ou Durable Objects).** Limite de concorrência por provedor (ex.: 5 simultâneas Anthropic, 10 Perplexity) respeita rate limits sem custo de coordenação manual. Decisão: usar Cloudflare Queues quando GA estável; Durable Objects para distributed lock se Queues for instável.

**Provider Workers (1 por LLM).** Cada Worker é um adapter para um SDK. Encapsula auth, rate limiting interno, retry exponencial (tenacity-style: 2s/4s/8s, max 3 tentativas) e circuit breaker (estados closed → open → half-open). Estado do circuit breaker persistido em Workers KV (chave `cb:provider`). Cooldown 60s. Cada chamada incrementa o FinOps Tracker.

**FinOps Tracker.** Workers KV mantém acumulador `finops:sprint:{sprint_id}` com soma USD da sprint vigente. Cada Worker, ao finalizar chamada, calcula `cost_usd = (tokens_in × price_in + tokens_out × price_out) / 1e6` (tabela canônica de `FINOPS-DISCIPLINA.md`), incrementa o acumulador e dispara gate se cruzar 60/80/95/100% do teto USD 50.

**Response Pipeline.** Cada resposta passa por 4 estágios: (1) hash SHA-256 da resposta para detecção de drift; (2) persistence — append a `data/coleta/YYYY-MM-DD.jsonl` em R2 + insert em D1 `coleta_runs` para séries temporais; (3) pós-processador NER (regex + fuzzy match sobre `data/concorrentes.yaml`) extrai `ipog_mentioned: bool` e `competitors_mentioned: array`; (4) pós-processador Citation Quality usa Groq llama-3.3-70b para classificar `ipog_citation_quality: 0-5` contra `data/fatos-canonicos.yaml`.

**Drift Detector.** Job pós-coleta que, para cada `(provider, query_id)`, lê os últimos 30 hashes de resposta no D1 e calcula entropia da janela de 7 dias e da janela de 30 dias. Se entropia 7d diverge >2σ da entropia 30d em 3+ queries do mesmo provedor no mesmo dia, dispara alerta crítico. Coleta dos 3 dias seguintes marcada `under_drift_review`.

**Validation (fail-loud).** Job de fechamento às 09h30 BRT verifica: (a) cada provedor não-Perplexity respondeu >= 95% das queries; (b) Perplexity respondeu 100%; (c) latência mediana por provedor dentro do envelope (<= 30s padrão, <= 60s browsing). Se válido, atualiza séries temporais consumíveis pelo dashboard. Se inválido, grava marcador em `data/coleta/YYYY-MM-DD.invalid.json` e dispara alerta alto.

**Notifier.** Worker simples que envia para canal operacional (Discord ou Slack via webhook). Payload estruturado JSON com tipo de alerta, severidade, payload diagnóstico. Roteamento:
- Crítico (drift Perplexity, 4+ circuit open simultâneo, coleta inválida 3 dias seguidos): @alexandre + @bruno imediato.
- Alto (coleta inválida, drift não-Perplexity): @alexandre mesmo dia.
- Médio (cobertura 90-95%, latência alta): logging silencioso + revisão na próxima execução.
- Baixo (cache hit ratio acima de 80%): revisão semanal.

### G.3 Pontos de extensibilidade

- Adicionar novo provedor LLM (ex.: futuro entrante RAG-native): novo Provider Worker com mesmo contrato. Decisão registrada em ata mensal seguinte (cohort fixo é regra).
- Adicionar nova métrica derivada: novo pós-processador no Response Pipeline com custo declarado em FinOps.
- Trocar provider de Queue (Cloudflare Queues → Durable Objects → SQS): troca de adapter; lógica de orquestração não muda.
- Mover persistência D1 → Postgres (caso ADR-002 mude): adapter `db.py` isola dialeto; migração de schema documentada.

---

## Anexos

### Anexo I — Cross-references

- `docs/board-report/00-board-report-final.md` — síntese estratégica.
- `docs/board-report/04-tatica-geo.md` — plano tático 90 dias.
- `dashboards/METRICAS-CANONICAS.md` — 8 KPIs canônicos com fórmulas.
- `dashboards/RUNBOOK-COLETA-LLM.md` — operação cross-LLM.
- `dashboards/FINOPS-DISCIPLINA.md` — disciplina financeira USD 50/sprint.
- `audits/PLAYBOOK-AUDITORIA-NAIA.md` — 100+ checks.
- `audits/SCHEMA-PATTERNS.md` — Schema canônico.
- `audits/LLMS-TXT-TEMPLATE.md` — llms.txt canônico.
- `prompts/KIT-PROMPTS-V0.md` — 75 prompts × 3 clusters × 7 personas × 4 jornadas.
- `docs/04-definicao-de-done.md` — DoD por artefato.
- `docs/05-risk-register.md` — 12 riscos ativos.
- `.github/workflows/concorrentes-monitoring.yml`, `report-builder.yml`, `quality.yml`, `labeler.yml`, `stale.yml`.

### Anexo II — Roadmap de implementação arquitetural (90 dias)

| Semana | Entregável arquitetural | Owner |
|---|---|---|
| Sem 1 (07-10/05) | `geo-platform` repo criado; estrutura base; Collector v0 contra Perplexity + GPT-4o; D1 e R2 provisionados | Brasil GEO |
| Sem 2 (11-17/05) | Collector cobre 6 LLMs; cache idempotente; circuit breaker; FinOps tracker; logs JSONL | Brasil GEO |
| Sem 3 (18-24/05) | NAIA Audit Engine v1 (categorias A, B, D); Schema Manager gera JSON-LD piloto | Brasil GEO |
| Sem 4 (25-31/05) | Voice Guard como microsserviço HTTP; Reporting Service v1 (relatório semanal); `geo-dashboard` repo criado, esqueleto | Brasil GEO |
| Sem 5-6 (01-14/06) | Dashboard v1 com 4 KPIs (1, 4, 6, 8); SSO Cloudflare Access; integração ponta-a-ponta validada | Brasil GEO |
| Sem 7 (15-21/06) | Dashboard com 8 KPIs completos; drift detector em produção; observability Axiom integrada | Brasil GEO |
| Sem 8-9 (22/06-05/07) | `geo-ipog-website` repo criado se IPOG aprovar; Schema piloto deployado; primeiro PR de Schema atualizado | Brasil GEO + TI IPOG |
| Sem 10-11 (06-19/07) | Hardening: failovers testados, secrets rotation rodada de teste, runbook de incidente | Brasil GEO |
| Sem 12-13 (20/07-04/08) | Reporting Service mensal completo; auditoria pós-pico; ADR-009 reavaliado; ADR-006 reavaliado | Brasil GEO |

### Anexo III — Próximos passos imediatos

1. **02-05-2026 (D+1):** apresentar este documento a Bruno Azambuja em revisão técnica conjunta.
2. **05-05-2026 (D+4):** criar repositórios `geo-platform`, `geo-dashboard` no GitHub `alexandrebrt14-sys`.
3. **06-05-2026 (D+5):** provisionar Cloudflare account dedicado ao programa (Workers + R2 + D1 + Pages).
4. **07-05-2026 (D+6):** Collector v0 commitado em `geo-platform` (esqueleto + adapter Perplexity como primeira integração).
5. **10-05-2026 (D+9):** primeira coleta cross-LLM end-to-end com 6 provedores; validação fail-loud em produção.
6. **14-05-2026 (D+13):** Schema Manager gera primeiro `llms.txt` válido + PR aberto contra `geo-ipog-website`.
7. **30-05-2026 (D+29):** Schema piloto em produção em `ipog.edu.br`; KPI 4 lido em dashboard pela primeira vez.

---

> **Encerramento.** A arquitetura macro proposta sustenta o programa GEO IPOG ao longo de 2026 com custo total estimado de ~R$ 8.150 para 12 meses (0,31% da receita projetada de R$ 2,6 milhões em 2026.2), preserva o cohort fixo de 6 LLMs canônicos com drift detection e validação fail-loud, materializa os 8 KPIs canônicos em containers executáveis e respeita a disciplina FinOps de USD 50/sprint com block automático em 100% do teto. As 10 ADRs registram trade-offs explícitos com 2-3 alternativas avaliadas cada; os 4 repositórios secundários têm propósito declarado e owner nominal; os 5 riscos arquiteturais críticos têm mitigação ativa e gatilho de escalonamento. A próxima decisão pedida ao Conselho é a aprovação dos repositórios secundários e do orçamento mensal canônico até 15-05-2026, sincronizando com R-001 (decisão de produto) para que Schema piloto, Collector e Dashboard entrem em produção dentro do calendário do pico 2026.2.
