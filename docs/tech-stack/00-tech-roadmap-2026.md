# Tech Roadmap 2026 — Programa GEO IPOG

> **Documento:** 00 — Roadmap técnico consolidado do programa GEO IPOG (síntese executiva dos 8 dossiês especializados).
> **Cliente:** IPOG (Instituto de Pós-Graduação e Graduação, Goiânia, fundado 2001 — Portarias SERES MEC 884/2016 e 918/2017).
> **Sponsor executivo:** Ronan Maia (CEO IPOG).
> **Interlocutor operacional:** Bruno Azambuja (Gerente de Marketing IPOG).
> **Executor:** Brasil GEO — Alexandre Caramaschi (CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil).
> **Subcontexto (reframe canônico 12-05-2026):** portfólio amplo de **Pós-Graduações em Psicologia** em 5 modalidades canônicas — Especialização Lato Sensu (formato dominante), MBA correlato à Psicologia, Mestrado Profissional, Especialização Clínica certificada por Conselhos (CFP/ABRAP/FBT) e Formações híbridas/residências (ver `dashboards/METRICAS-CANONICAS.md` Cláusula 0). MBA é um subconjunto, não a vertical.
> **Pico GEO crítico:** 15-06-2026 a 31-07-2026 (captação 2026.2). Próximo pico: 01-12-2026 a 15-02-2027.
> **Janela de execução:** janeiro a dezembro de 2026.
> **Data:** 2026-05-01.
> **Audiência primária:** Alexandre Caramaschi (decisão arquitetural), Bruno Azambuja (operação), Ronan Maia (autorização orçamentária), Conselho IPOG (governança).
> **Tamanho-alvo:** 5.000-8.000 palavras.
> **Documentos-fonte:** `01-solution-architecture.md`, `02-data-engineering.md`, `03-schema-llms-txt-engineer.md`, `04-dashboard-frontend.md`, `05-llm-integration-service.md`, `06-naia-voice-guard.md`, `07-observability-cicd.md`, `08-editorial-cms.md` (mais auxiliares `_aux/08a` e `_aux/08b`).

---

## 1. Sumário executivo

O programa GEO IPOG entra em 2026 com oito dossiês técnicos detalhados que descrevem, individualmente, peças funcionais — arquitetura macro, pipeline de coleta cross-LLM, engenharia de Schema.org e `llms.txt`, dashboard executivo, integrações com os 6 LLMs do cohort canônico, motor de auditoria NAIA + Voice Guard, observability e CI/CD, e sistema editorial Markdown-first. Este Tech Roadmap consolida essas oito vistas em uma única narrativa arquitetural e operacional, destila as cinco convergências materiais entre os dossiês, expõe quatro divergências que pedem decisão executiva e materializa um cronograma mensal de janeiro a dezembro de 2026 com marcos críticos, dependências e custo total de propriedade auditável.

A tese técnica é simples e contraintuitiva. Em vez de comprar SaaS especializados (CMS, observability premium, gerenciador de Schema, framework editorial), o programa **constrói** os componentes de domínio em código Python e TypeScript próprio sobre uma única plataforma serverless de infraestrutura (Cloudflare Workers + Pages + R2 + D1 + Queues + KV) e **compra** apenas três fornecedores SaaS que combinam free tier generoso com lock-in baixo: Axiom (logging e tracing), 1Password Teams (vault humano) e Sentry (RUM frontend). A consequência é um custo total operacional auditável de aproximadamente USD 1.168 (cerca de R$ 6.500) para 12 meses inteiros — 0,25% da receita projetada de R$ 2,6 milhões em 2026.2 (ver `docs/board-report/00-board-report-final.md`, Seção 5).

A stack consolidada é deliberadamente híbrida em linguagem (Python 3.12+ no backend, TypeScript 5 + Next.js 16 no frontend), uniforme em hospedagem (Cloudflare-centric), versionada em multi-repo (4 repositórios secundários) e auditável em Git (todo prompt, Schema, regra editorial e configuração de coleta vive como arquivo versionado). Os 8 KPIs canônicos do `dashboards/METRICAS-CANONICAS.md` são materializados em containers executáveis (não em planilhas) e visualizados em dashboard próprio — não em Streamlit ou ferramenta BI gerenciada.

O custo total de propriedade para 12 meses fica entre **R$ 6.500 (cenário enxuto) e R$ 18.500 (cenário pico com Axiom Hobby + GitHub Actions premium + Workers Paid)**. A divergência de 2,8x entre dossiês — que originalmente projetavam de R$ 12 a R$ 34/mês de infra (cenário arquitetural otimista do `01`) até R$ 3.010/mês de pipeline LLM no cenário máximo do `02` — é reconciliada neste roadmap com três cenários explícitos por fase, pedindo decisão executiva ao Conselho IPOG sobre o teto FinOps recalibrado.

Os três repositórios secundários a criar — `geo-platform`, `geo-dashboard`, `geo-ipog-website` — somam-se ao `geo-ipog` já existente. Cada um tem stack declarada, owner nominal, cadência de release e workflows GitHub Actions pré-especificados. A conta consolidada é de 22 workflows distribuídos entre os 4 repos, com 16 secrets canônicos no inventário de segurança (LLMs, Cloudflare, Axiom, Sentry, GA4, GitHub PAT do bot NAIA, deploy key TI IPOG).

As decisões executivas pedidas ao Conselho IPOG são oito: (1) aprovar provisionamento dos 3 repos secundários no GitHub `alexandrebrt14-sys`; (2) aprovar budget mensal recalibrado de aproximadamente R$ 1.500/mês em pico e R$ 540/mês em regime contínuo; (3) aprovar acesso TI IPOG para Schema injection em `ipog.edu.br` antes de 30-05; (4) aprovar GA4 com referrer/UTM dedicado de LLM até 25-05; (5) aprovar Cloudflare Worker classificador de tráfego LLM para o blog; (6) aprovar 1Password Teams compartilhado; (7) aprovar reconciliação do RUNBOOK obsoleto (cohort 2024) com dossiês 2026; (8) aprovar recalibração do teto FinOps original (USD 50/sprint) para a realidade observada do cohort 2026 premium.

Os três principais riscos arquiteturais consolidados são vendor lock-in com Cloudflare (mitigação: camada de abstração de persistência), drift silencioso de modelo nos provedores LLM (mitigação: drift detector com embedding similarity + entropia 7d vs 30d) e estouro de teto FinOps por uso premium do cohort 2026 (mitigação: budget guards 60-80-95-100% com block automático).

---

## 2. Tese técnica em 5 frases

**Frase 1.** Em mercado onde 100% dos 10 concorrentes mapeados em `audits/benchmarking/matriz-tecnica-schema-seo.md` está sem `llms.txt` e sem `EducationalOccupationalProgram` Schema, ocupar a janela técnica antes do pico GEO 2026.2 vale mais que sofisticar arquitetura — daí a opção por stack mínima, auditável e replicável.

**Frase 2.** O cohort canônico de 6 LLMs (ChatGPT `gpt-5.0`, Claude `claude-opus-4-7`, Gemini `gemini-3-pro`, Perplexity `sonar-pro`, Grok `grok-4`, Copilot `copilot-2026`) é a unidade de comparação irredutível do programa: trocar um LLM por outro, pular um dia, ou reduzir N abaixo do mínimo invalida KPIs 1, 2, 3 e 8 simultaneamente — por isso o pipeline tem fail-loud em coleta parcial e Perplexity não tem hard stop FinOps.

**Frase 3.** Repositório como fonte de verdade canônica é princípio não-negociável: 75 prompts, 6 templates de Schema JSON-LD, 4 dimensões editoriais Voice Guard, 100+ checks NAIA, configuração de cohort, regras de naming, tabela FinOps por LLM e snapshots diários de coleta vivem em Git versionado, não em planilha, Notion ou ferramenta SaaS — porque auditoria do Conselho IPOG exige diff temporal explícito.

**Frase 4.** Build-vs-buy resolve por linha do tempo, não por preferência arquitetural: o programa **constrói** o que é diferencial competitivo (Voice Guard, NAIA, Collector, Schema Manager) e **compra** apenas o que é commodity com lock-in baixo (Axiom para observability, 1Password para vault, Cloudflare para infra) — sem CMS proprietário, sem Datadog, sem Sanity, sem Doppler, sem AWS.

**Frase 5.** O orçamento técnico projetado de aproximadamente R$ 8.150 para 12 meses (com folga de 25%) representa 0,31% da receita projetada de R$ 2,6 milhões em 2026.2 e equivale a 0,6 matrícula marginal — o ponto de equilíbrio operacional do programa GEO IPOG é de 17 matrículas marginais (ver `07-pricing-unit-economics.md`, D.4), o que torna o stack arquitetural materialmente desprezível como linha de custo, mas crítico como linha de capacidade.

---

## 3. Arquitetura consolidada — visão de uma página

A arquitetura macro materializa-se em **9 containers** (C4 Level 2) distribuídos em **4 repositórios secundários**, sustentados por **2 linguagens** (Python 3.12+ no backend, TypeScript 5 no frontend) e **1 plataforma de infraestrutura serverless** (Cloudflare).

### 3.1 Os 4 repositórios

| Repo | Status | Stack | Owner | Conteúdo canônico |
|---|---|---|---|---|
| `geo-ipog` | já existe | Markdown + GitHub Actions | Alexandre + Bruno | Governança, ADRs, board reports, docs, prompts canônicos, runbooks, KPIs, atas, risk register, peças HBR (`content/peças-hbr/`) |
| `geo-platform` | a criar | Python 3.12 + uv + httpx + pydantic v2 + selectolax + extruct + jinja2 | Alexandre | 5 módulos: Collector, NAIA Audit Engine, Voice Guard Service, Schema/llms.txt Manager, Reporting Service |
| `geo-dashboard` | a criar | Next.js 16 + React Server Components + Recharts + Tailwind 4 + NextAuth v5 | Alexandre (com sub-agent Opus) | KPI Dashboard Web App com 11 telas e 8 KPI cards |
| `geo-ipog-website` | a criar (depende de aprovação IPOG) | JSON + Markdown + Python builders + AJV/jsonschema | Brasil GEO + TI IPOG | Schema canônico parametrizado, `llms.txt`, `robots.txt`, snippets HTML versionados que TI IPOG aplica em `ipog.edu.br` |

### 3.2 Os 9 containers do C4 Level 2

| # | Container | Repo | Tecnologia | Responsabilidade primária |
|---|---|---|---|---|
| B.1 | GEO Collector Service | `geo-platform` | Python httpx async + Cloudflare Workers + Queues + KV | Coleta diária 06h-09h BRT contra os 6 LLMs canônicos com idempotency cache, retry, circuit breaker, drift detector, FinOps tracker |
| B.2 | NAIA Audit Engine | `geo-platform` | Python httpx + selectolax + extruct + pyld | Executa 100+ checks NAIA-XXX contra `ipog.edu.br` e concorrentes; emite gaps P0-P3 como GitHub Issues idempotentes |
| B.3 | Voice Guard Service | `geo-platform` | Python pydantic + adapter `voice_guard.py` existente | 4 dimensões editoriais com pesos `30+30+25+15`, score 0-100, auto-fix determinístico, gate de publicação `>= 70` |
| B.4 | Schema/llms.txt Manager | `geo-platform` | Python jinja2 + jsonschema + AJV (lado TS) | Gera, valida e versiona JSON-LD parametrizado por slug; PR contra `geo-ipog-website` revisado por Bruno |
| B.5 | KPI Dashboard Web App | `geo-dashboard` | Next.js 16 + Recharts (primário) + Tremor (secundário) | Visualiza 8 KPIs canônicos com decomposição por LLM/cluster/persona/jornada; 11 telas, mobile-first, print A4 |
| B.6 | Editorial CMS (híbrido) | `geo-ipog` | Markdown + Voice Guard CI gate + frontmatter pydantic 18+ campos | Pipeline editorial 7 peças HBR Fase 2; CLI typer `geo-editorial` com 4 comandos (`new`, `validate`, `preview`, `publish`) |
| B.7 | Reporting Service | `geo-platform` | Python jinja2 + pandas + plotly | Gera relatórios semanal (Bruno+Alex), mensal (Ronan), trimestral (Conselho) em Markdown auditável + HTML |
| B.8 | Data Warehouse | `geo-platform` (config) + Cloudflare | D1 SQLite (quente) + R2 Parquet (frio) + DuckDB (analítico) | 7 tabelas warehouse: `dim_llm`, `dim_prompt`, `dim_concorrente`, `fct_collection`, `fct_mention_rate_daily`, `fct_share_of_voice_biweekly`, `fct_finops_daily` |
| B.9 | Identity & Secrets | infra | GitHub Secrets + Cloudflare Workers Secrets + 1Password Teams + Cloudflare Access | 16 secrets canônicos (LLMs, hosting, observability, GA4, GitHub PAT, deploy key); rotação trimestral/semestral/anual |

### 3.3 Convergências entre os 8 dossiês (mapa de uma página)

A síntese cruzada revela cinco convergências fortes (todos os 8 dossiês concordam) e cinco convergências médias (5+ dossiês concordam):

**Convergências fortes (8/8 dossiês):**

1. **Cloudflare como hosting primário** (Workers + Pages + R2 + D1 + KV + Queues) — `01` ADR-002, `02` Bloco J, `04` Cloudflare Pages, `05` cache KV, `06` deploy worker, `07` ADR-009, `08` Cloudflare Worker classificador.
2. **Python 3.12+ no backend, TypeScript 5 + Next.js 16 no frontend** — `01` ADR-001, `02` Bloco J, `04` stack Next.js, `05` Python httpx, `06` Python typing, `07` instrumentação OTel Python+Node, `08` CLI Python typer.
3. **Cohort canônico fixo de 6 LLMs com versão pinada 2026** — todos os dossiês.
4. **Idempotency cache via SHA-256 + KV** — `01` G.2, `02` Bloco E, `05` Bloco D, `06` cache de fetcher.
5. **Repositório como fonte de verdade canônica + Markdown + Git** — todos os dossiês.

**Convergências médias (5+/8 dossiês):**

6. **GitHub Actions cron + Cloudflare Triggers como redundância** — `01` ADR-007, `02` Scheduler, `05` cron-collect-daily, `06` ci-naia-audit-monthly, `07` Bloco H, `08` cron-pos-publish-d14.
7. **Axiom como observability tier 1 (substitui Datadog)** — `01` ADR-009, `02` Bloco I, `04` Axiom secrets, `05` notifier, `07` Bloco A, `08` métricas D+14.
8. **Multi-repo com separação clara de domínio** — `01` ADR-004, `04` repo `geo-dashboard`, `05` `geo-platform`, `07` Bloco H distribuído em 4 repos, `08` `geo-ipog`.
9. **REST com OpenAPI 3.1 entre Reporting Service e Dashboard** — `01` ADR-010, `04` API consumida via `openapi-typescript`.
10. **Markdown + Voice Guard CI > CMS proprietário (Sanity/Payload)** — `01` ADR-006, `06` Voice Guard pipeline, `08` decisão Cenário 1.

### 3.4 Diagrama compacto

```
                        Conselho IPOG  ←  board reports trimestrais
                              ↑
                    Ronan, Bruno, Alexandre  ←  KPI Dashboard semanal
                              ↑
            ┌─────────────────┴─────────────────┐
            │                                     │
    geo-dashboard                           geo-platform
    (Next.js 16 + Recharts)                 (Python 3.12+)
    Cloudflare Pages                          ├─ Collector  → 6 LLMs
            │                                  ├─ NAIA      → ipog.edu.br
            │   REST/OpenAPI                   ├─ VoiceGuard → peças HBR
            └─────────────────────────────→    ├─ SchemaMgr → JSON-LD
                                              └─ Reporting  → Markdown
                                                     │
                                              ┌──────┴──────┐
                                              ↓             ↓
                                          D1 (quente)   R2 (frio)
                                              │             │
                                              └──── DuckDB (analítico)
                                                     │
                                  ┌──────────────────┴──────────────────┐
                                  │                                     │
                          geo-ipog-website                          geo-ipog
                          (JSON-LD + llms.txt                       (Markdown +
                           versionado)                               peças HBR +
                          PR para TI IPOG                            governança)
                                  │
                                  ↓ (deploy via TI IPOG)
                              ipog.edu.br
```

Para detalhamento C4 Level 2 e Level 3 do GEO Collector ver `01-solution-architecture.md` Bloco B e Bloco G.

---

## 4. Roadmap mensal jan-dez 2026

A tabela abaixo consolida os 19 marcos críticos do `docs/06-marcos-criticos-2026.md` com a distribuição mensal de entregas técnicas, repositórios em atividade, workflows novos lançados, KPIs alvo e custo previsto.

| Mês | Marcos técnicos do mês | Repos com atividade | Workflows novos lançados | KPIs alvo | Custo previsto (R$/mês) |
|---|---|---|---|---|---|
| **jan/2026** | Pré-kickoff: discovery executiva e auditoria documental do IPOG (já encerrado em 30-04) | — | — | — | ~R$ 50 (orchestrator pesquisas exploratórias) |
| **fev/2026** | Pré-kickoff: aprofundamento de mercado, análise concorrencial preliminar | — | — | — | ~R$ 50 |
| **mar/2026** | Onda 1 do benchmarking iniciada; sketches arquiteturais | `geo-ipog` (docs) | — | — | ~R$ 100 |
| **abr/2026** | Onda 1 e Onda 2 do benchmarking concluídas (10 concorrentes); 8 dossiês técnicos redigidos; kit de prompts v0; KPIs canônicos definidos; risk register; 5 workflows existentes em `geo-ipog` | `geo-ipog` | `quality.yml`, `labeler.yml`, `stale.yml`, `report-builder.yml`, `concorrentes-monitoring.yml` (5 já em produção) | — | ~R$ 150 |
| **mai/2026** | **Fase 1.** M01-M07 (kickoff, decisão produto, kit prompts, GA4, llms.txt em produção 14-05, Schema piloto 30-05); criação dos 3 repos secundários; Collector v0 contra Perplexity + GPT-4o; D1 e R2 provisionados; primeira coleta cross-LLM end-to-end; NAIA Audit v1 (categorias A, B, D); Voice Guard como microsserviço; `geo-dashboard` esqueleto com 4 KPIs | `geo-ipog`, `geo-platform`, `geo-dashboard`, `geo-ipog-website` | `ci-test.yml`, `ci-build-docker.yml`, `cron-collect-daily.yml`, `ci-naia-spot-check-biweekly.yml`, `ci-voice-guard.yml`, `ci-editorial.yml`, `pr-check.yml` (dashboard), `deploy-staging.yml`, `deploy-production.yml` (Schema), `cron-llms-txt-rebuild.yml` | KPI 4 (Schema Coverage) leitura inicial; baseline para KPIs 1, 2, 3 | ~R$ 280 (Fase 1 Cenário Mínimo do dossiê 01) |
| **jun/2026** | **Fase 2 + Início Fase 3 (pico).** M08 Peça 1 HBR (02-06); M09 atribuição GA4 ativa; M10 abertura matrícula 2026.2 (15-06); 6-8 peças HBR publicadas; Schema replicado para 2ª página de produto (MBA Avaliação CFP); auditoria NAIA mensal completa; Voice Guard rodando em CI; dashboard com 8 KPIs; SSO Cloudflare Access; observability Axiom integrada | todos os 4 repos | `ci-naia-audit-monthly.yml`, `lighthouse.yml`, `e2e.yml`, `cron-naia-competitors.yml`, `cron-pos-publish-d14.yml`, `cron-warehouse-compact.yml`, `cron-finops-reconcile.yml`, `alert-emit-issue.yml` | KPI 1 (Mention Rate) baseline; KPI 4 ≥ 75; KPI 7 baseline GA4; KPI 8 Delta pré-onda 1 | ~R$ 500 (Fase 2 Cenário Padrão do `01` somado a ~R$ 130 Axiom Hobby + 1Password) |
| **jul/2026** | **Fase 3 — pico GEO 2026.2 em curso.** Coleta cross-LLM diária estável; 5+ peças HBR adicionais; Wikipedia IPOG verbete trabalhado (PR 1 ao MEC vivo); spot-check NAIA quinzenal; M14 XII CBPOT Salvador (14-17/07); peça especial pré-CBPOT | todos | `cron-secret-rotation-quarterly.yml`, `cron-d1-backup-daily.yml` | KPI 1 ≥ +18pp vs baseline; KPI 2 SoV cross-LLM; KPI 3 Citation Quality ≥ 70 | ~R$ 800-1.000 (pico — coleta full + Axiom Hobby + 1Password) |
| **ago/2026** | **Fim do pico, início Fase 4.** M17 fim do pico (31-07); M18 relatório de pico ao Conselho (05-08); auditoria pós-pico; ADR-006 e ADR-009 reavaliados; DuckDB warehouse hardening; Schema replicado para 100% do MBA Online; primeiro Q3 review parcial | todos | (estabilização — sem novos workflows) | KPI 7 lift ≥ 20%; KPI 8 Delta pré/pós ondas; KPI 6 Velocidade Fechamento ≤ 5 dias úteis P0 | ~R$ 700 |
| **set/2026** | Operação contínua. NAIA bateria completa mensal. Voice Guard ajustado com aprendizados. Onda 3 do benchmarking iniciada. Q3 review completo (30-09). Recalibração trimestral de versões pinadas (cohort review) | todos | `cron-naia-competitors.yml` semanal pós-pico | KPIs 1-8 estabilizados; KPI 5 (cobertura fontes) +4 fontes | ~R$ 540 |
| **out/2026** | M19 Wikipedia verbete expandido (30-10). Editorial CMS reavaliação (gatilho >15 peças/mês). Onda 3 concluída. Acessibilidade dashboard ajustada. Reporting trimestral Q3 entregue | todos | `cron-d14-update.yml` mantido | KPI 5 ≥ +6 fontes acumulado; KPI 4 Schema Coverage ≥ 85 | ~R$ 540 |
| **nov/2026** | Pré-pico 2027.1 (kickoff 01-12). Calibração trimestral do kit de prompts. Wikipedia IPOG entrada estável. Q4 review parcial. Schema dos 3 produtos âncora completo | todos | (sem novos) | KPI 1 sustentado; KPI 8 Delta entre ondas medido | ~R$ 540 |
| **dez/2026** | M20 início pico GEO captação 2027.1 (01-12). Q4 fechamento (31-12) + plano 2027. Reavaliação ADRs 002, 006, 009. Decisão sobre upgrade Doppler vs manter GitHub Secrets + 1Password | todos | (sem novos) | KPI 1 entrada Q1; KPI 7 funil 2027.1 ativo | ~R$ 700 (segundo pico) |

**Total anual estimado:** ~R$ 6.500 (cenário enxuto) a ~R$ 8.150 (cenário com folga de 25%) a ~R$ 12.000 (cenário pessimista com Axiom Hobby permanente + GitHub Actions Team + Workers Paid + folga 50%). Detalhamento na Seção 6.

---

## 5. Decisões build-vs-buy consolidadas

A disciplina build-vs-buy do programa segue uma regra simples: **constrói** o que é diferencial competitivo e tem alto custo de lock-in se comprado; **compra** o que é commodity com lock-in baixo e free tier que cobre o volume previsto.

| Domínio | Decisão | Justificativa | Quando reavaliar |
|---|---|---|---|
| **Observability** (logs, metrics, traces) | **Buy: Axiom** (free tier 0,5 GB/mês; Hobby USD 25/mês quando passar) | OpenTelemetry padrão aberto + Axiom Ingest API substitui Datadog (USD 31+/host/mês) com 90% da capacidade. Sentry é tier 2 só para RUM frontend. (ver `07-observability-cicd.md`, A.1 e ADR-009 do `01`) | 2027.1 se volume passar Hobby+; Datadog fica como fallback enterprise |
| **CMS editorial** | **Build: Markdown + Git + Voice Guard CI** | 6-8 peças HBR/mês até pico não justificam Sanity USD 99/mês; Voice Guard inline em pre-commit + PR comment cobre UX para Bruno; Git é fonte de verdade auditável para Conselho. (ver `08-editorial-cms.md`, Bloco A; `01` ADR-006) | 2027.1 com gatilho >15 peças/mês por dois trimestres |
| **Schema generator** | **Build: Schema Builder Python + jinja2 + JSON-LD validado AJV em CI** | Templates parametrizados por slug garantem consistência cross-página (NAIA-009 `@id` consistente); plugins de CMS WordPress/Yoast brigam entre si. (ver `03-schema-llms-txt-engineer.md` Bloco F; `01` ADR-006) | Apenas se TI IPOG mover ipog.edu.br para CMS headless (Sanity/Strapi) |
| **Voice Guard** | **Build: parte do `geo-platform`** | Reutiliza `voice_guard.py` já em produção (memória `feedback_alexandre_voice`); 4 dimensões editoriais são canônicas do programa, sem equivalente comercial. Auto-fix determinístico de acentuação e naming proibido. (ver `06-naia-voice-guard.md` Parte 2) | Não reavaliar — é diferencial estrutural |
| **NAIA Audit Engine** | **Build: parte do `geo-platform`** | 100+ checks NAIA-XXX são canônicos do programa (NAIA-006 MEC, NAIA-064 CRP/CFP, NAIA-080 llms.txt); Lighthouse cobre ~25%, Schema.org Validator cobre ~40%, mas nenhum substitui. (ver `06` Parte 1; `01` B.2) | Não reavaliar |
| **LLM Integration Service** | **Build: clientes próprios em Python httpx** | 6 Provider Clients separados (em vez de wrapper OpenAI-compatible) preservam isolamento de falha + fidelidade ao formato real de cada API; SDKs oficiais variam em maturidade (xAI, Perplexity menos polidos). (ver `05-llm-integration-service.md` Bloco B) | 2027.1 se Vercel AI SDK ou LangChain/LlamaIndex amadurecerem cohort |
| **Identity** | **Build: NextAuth v5 + magic link Resend** | Free tier Resend 3.000 e-mails/mês cobre time pequeno; SSO via Cloudflare Access para dashboard com Google Workspace IPOG (já existe). Auth0 USD 23+/mês inviável. (ver `04-dashboard-frontend.md` D5) | 2027.1 se equipe passar de 5 usuários |
| **Hosting** | **Buy: Cloudflare Workers + Pages + R2 + D1 + KV + Queues** | Free tier cobre 100% da Fase 1; Workers Paid USD 5/mês entry suficiente para Fase 2-4; zero egress fees é vantagem estrutural sobre AWS/Vercel. (ver `01` ADR-002; `02` Bloco J; `07` Bloco K) | Trimestral — benchmark vs Vercel/Supabase |
| **Secrets** | **Buy híbrido: 1Password Teams (USD 24/mês para 3 usuários) + Cloudflare Workers Secrets + GitHub Secrets** | 1Password é vault humano auditável; Workers Secrets é runtime nativo; GitHub Secrets é CI nativo. Doppler USD 7/usuário/mês fica reservado para 2027.1 quando equipe crescer. (ver `01` ADR-008; `07` Bloco I) | 2027.1 se equipe passar de 5 usuários |
| **Database OLTP/OLAP** | **Buy + build: D1 (quente) + R2 + DuckDB analítico** | D1 cobre OLTP (séries temporais 8 KPIs com cardinalidade baixa); R2 USD 0,015/GB cobre cold; DuckDB lê Parquet de R2 sem ETL. PostgreSQL Supabase USD 25+/mês é overkill no volume. (ver `01` ADR-003; `02` Bloco B) | 2027.1 se programa escalar para 5+ clientes |
| **API style** | **Build: REST + OpenAPI 3.1 + `openapi-typescript`** | Cacheável em Cloudflare CDN; trivial Postman/curl debug; tipos compartilhados via codegen. tRPC acopla cliente ao servidor TS; GraphQL é overhead. (ver `01` ADR-010) | Não reavaliar |
| **Drift detection** | **Build: SHA-256 + embedding similarity (paraphrase-multilingual-MiniLM-L12-v2)** | Modelo cabe em 200MB do Workers Paid; threshold 0,75/0,55; entropia 7d vs 30d como heurística secundária. (ver `05` Drift Detector; `02` Bloco D) | Trimestral — calibração de threshold |

---

## 6. TCO 12 meses jan-dez 2026

A reconciliação entre os 8 dossiês expõe que o teto FinOps original de USD 50/sprint (R$ 260) declarado em `dashboards/FINOPS-DISCIPLINA.md` foi calibrado para o cohort 2024 (gpt-4o, claude-sonnet-4-5, gemini-1.5-pro, grok-2) e não suporta o cohort 2026 premium (gpt-5.0, claude-opus-4-7, gemini-3-pro, grok-4) sem recalibração. Os três cenários abaixo organizam o custo total de propriedade por categoria, aderente aos números dos dossiês 02 (data engineering), 05 (LLM integration) e 07 (observability + CI/CD).

### 6.1 Custo mensal por categoria — 3 cenários

| Categoria | Item | Mínimo viável (R$/mês) | Padrão (R$/mês) | Pico/escala (R$/mês) |
|---|---|---|---|---|
| **LLMs APIs (coleta)** | 75 prompts × 6 LLMs × 30 dias com cache + Perplexity sempre ligada | 918 | 2.430 | 3.010 |
| **LLMs APIs (editorial)** | 5 papéis editoriais × 6-8 peças/mês HBR | 100 | 130 | 200 |
| **Cloudflare Workers Paid** | Workers Unbound + Cron Triggers + Queues | 0 (free) | 26 (USD 5) | 26 |
| **Cloudflare R2** | JSONL frio + snapshots NAIA | 5 | 10 | 15 |
| **Cloudflare D1** | Séries temporais quente (10 GB) | 0 (free) | 5 | 10 |
| **Cloudflare KV** | Idempotency cache (~14k ops/mês) | 0 (free) | 0 (free) | 5 |
| **Axiom** | Logs + traces + métricas | 0 (free 0,5 GB) | 0 (free) | 130 (Hobby USD 25) |
| **Sentry** | RUM frontend (free 5k erros/mês) | 0 | 0 | 0 (cabe em free) |
| **1Password Teams** | 3 usuários USD 8/mês | 125 | 125 | 125 |
| **GitHub Actions** | ~2.500 min/mês (privado) | 0 (within free) | 22 (USD 4) | 22 |
| **Resend** | Magic link auth (free 3.000 e-mails/mês) | 0 | 0 | 0 |
| **Cloudflare Web Analytics** | RUM gratuito | 0 | 0 | 0 |
| **Domínio + DNS** | Reuso de `brasilgeo.com.br` | 0 | 0 | 0 |
| **Embedding p/ drift** | OpenAI text-embedding-3-small ou modelo local | 5 | 15 | 25 |
| **Total mensal** | | **R$ 1.153** | **R$ 2.763** | **R$ 3.568** |

Observações:

- **Cenário Mínimo viável** corresponde à Fase 1 (mai-jun) com cohort enxuto (subset 30 prompts críticos) e Axiom em free tier — equivalente ao Cenário 1 de `02-data-engineering.md` E.1 + infra base.
- **Cenário Padrão** corresponde à Fase 2 + 3 (jun-ago) com cohort full (75 prompts × 6 LLMs × 30 dias) — equivalente ao Cenário 2 de `02` E.2 com observability Axiom + 1Password.
- **Cenário Pico/escala** corresponde a operação total (Fase 4 + segundo pico) com Axiom Hobby permanente + spot-checks 2x/semana + paráfrase trimestral pro-rata — equivalente ao Cenário 3 de `02` E.3.

### 6.2 Total anual jan-dez 2026 (phasing)

| Período | Meses | Cenário | Subtotal (R$) |
|---|---|---|---|
| Fase 0 (jan-fev — pré-kickoff sem coleta plena) | 2 | Quase zero (~R$ 50/mês de pesquisas pontuais) | 100 |
| Fase 1 (mar-mai — ramp + baseline) | 3 | Mínimo viável (~R$ 1.153/mês com peso para abr e mai) | 1.700 |
| Fase 2 + 3 (jun-ago — pico 2026.2) | 3 | Padrão (~R$ 2.763/mês) | 8.290 |
| Fase 4 contínua (set-nov — operação) | 3 | Padrão (~R$ 2.500/mês com folga) | 7.500 |
| Início segundo pico (dez) | 1 | Pico/escala (~R$ 3.568/mês) | 3.568 |
| **Total 12 meses 2026** | **12** | — | **~R$ 21.158** |

Em USD ao câmbio R$ 5,20: **~USD 4.070**. Com margem de segurança de 25% para incidentes (drift Perplexity, re-coleta, sprint experimental, fatura LLM acima da projeção): **provisão recomendada R$ 26.500 para 2026 inteiro**.

### 6.3 Reconciliação com dossiê 01 (orçamento original) e divergência material

O dossiê `01-solution-architecture.md` E.4 projetou USD 1.168 (~R$ 6.080) para 12 meses inteiros, com cenário Fase 4 a apenas USD 214,50/mês (~R$ 1.115). Esta projeção subestima dois itens identificados pelos dossiês posteriores:

1. **LLMs APIs no cohort 2026 premium** — `02-data-engineering.md` Bloco F.7 estima R$ 2.430/mês (Cenário 2 esperado), 6,5x o teto original USD 50/sprint (R$ 260). Causa: gpt-5.0, claude-opus-4-7 e gemini-3-pro têm preços de input/output substancialmente maiores que cohort 2024.
2. **Observability Axiom Hobby + 1Password Teams** — `07-observability-cicd.md` K.4 documenta R$ 260/mês adicional não previsto no teto FinOps original.

A divergência material é de **3,5x entre projeção otimista do dossiê 01 (R$ 6.080) e projeção realista consolidada (R$ 21.158)**. Esta reconciliação é uma das oito decisões pedidas ao Conselho (Seção 9, decisão D-CONS-08).

### 6.4 Comparação com receita projetada 2026.2

A projeção de receita 2026.2 do board report é **R$ 2.600.000** com 210 matrículas (`docs/board-report/00-board-report-final.md` Seção 5). O TCO consolidado de R$ 21.158 representa:

- **0,81% da receita projetada 2026.2** (mais alto que a projeção otimista do dossiê 01 de 0,31%, mas ainda materialmente desprezível).
- Equivalente a **1,7 matrícula marginal** (ponto de equilíbrio operacional do programa GEO IPOG é 17 matrículas marginais, ver `07-pricing-unit-economics.md`).
- **0,008% da receita projetada por matrícula** (R$ 21.158 / 210 = R$ 100/matrícula) — invariante mesmo no pessimista.

A disciplina FinOps do programa não muda: teto declarado por sprint, gates 60-80-95-100%, block automático em 100% (com exceção da Perplexity como sensor RAG-native obrigatório).

---

## 7. Top 7 riscos arquiteturais consolidados

Cada risco arquitetural é distinto dos riscos de programa do `docs/05-risk-register.md` — foca exclusivamente em decisões e dependências da stack.

| ID | Risco | Probabilidade × Impacto | Owner | Mitigação ativa | Gatilho de escalonamento |
|---|---|---|---|---|---|
| **TR-01** | Vendor lock-in com Cloudflare (Workers + D1 + R2 + KV) | Média × Alto | Alexandre | Camada de abstração de persistência em `geo-platform/src/common/db.py`; JSONL no R2 é formato portável; Workers escritos como funções puras (ver `01` F.1) | Aumento de preço Workers Paid > 25% ou descontinuação de D1 → migração planejada para Supabase em 6 semanas |
| **TR-02** | Drift de modelo silencioso nos LLMs (R-006 amplificado) | Alta × Crítico (KPIs 1, 2, 3, 8) | Alexandre | Drift detector com SHA-256 + embedding similarity (paraphrase-multilingual-MiniLM-L12-v2); entropia 7d vs 30d como secundária; segmentação de série antes/depois com flag `under_drift_review`; cohort não substitui em caso de drift de um (ver `02` Bloco D; `05` Drift Detector) | Drift confirmado em Perplexity (sensor RAG obrigatório) → escalada crítica imediata; drift em qualquer outro provedor → segmenta série e prossegue |
| **TR-03** | Estouro de teto FinOps com cohort 2026 premium | Alta × Médio (pode bloquear coleta) | Alexandre + Bruno | Cache SHA-256 idempotente (paga apenas em miss); budget guards 60-80-95-100% por LLM; teto recalibrado para R$ 2.600/mês (vs USD 15/sprint atual); Perplexity isenta de hard stop; classificador roda em Groq 10x mais barato (ver `02` Bloco F; `05` Bloco F) | Sprint atinge 80% antes de 75% do tempo decorrido → freeze pipelines não-essenciais; Perplexity em cost overrun escala para Alexandre sem stop automático |
| **TR-04** | Discrepância de cohort entre RUNBOOK 2024 e dossiês 2026 | Alta × Alto (operacional) | Alexandre | PR específico contra `RUNBOOK-COLETA-LLM.md` com 6 mudanças canônicas (cohort 2026, backoff 1/4/16, circuit breaker 5/60s/5min, embedding drift, recalibração FinOps R$ 2.600/mês, nota Copilot híbrido) — ver `05` Bloco L | Coleta cross-LLM em produção sem RUNBOOK atualizado → bloqueio de Sprint 1 |
| **TR-05** | Latência da coleta cross-LLM excedendo janela 06h-09h BRT | Média × Médio | Alexandre | Collector executa em chunks paralelos (asyncio + httpx) com semáforo por provedor; circuit breaker isolado por LLM; fallback GitHub Actions cron 06h30; Cloudflare Worker primário com Trigger nativo (ver `01` F.4; `05` A.2 Orchestrator) | Janela ultrapassa 09h30 BRT → alerta médio + investigação no mesmo dia |
| **TR-06** | TI IPOG não viabiliza Schema injection no domínio principal `ipog.edu.br` até 30-05 (M06) | Média × Crítico (M06 é gating do pico) | Bruno + Alexandre | Cenário 3 do `03-schema-llms-txt-engineer.md` E.3: subdomínio `mba.ipog.edu.br` com `sameAs` declarando canônicos; PR antecipado para TI IPOG validar até 23-05 (D-7) | TI IPOG não responder até 23-05 → escalada a Ronan + acionamento Cenário 3 |
| **TR-07** | Compliance LGPD em captura de UTM/referrer LLM no GA4 (KPI 7) | Baixa-Média × Crítico | Bruno + jurídico IPOG | Política de Privacidade `ipog.edu.br/politica-de-privacidade` revisada na semana 1; UTM/referrer não persiste PII fora do GA4; contrato de processamento Brasil GEO operador, IPOG controlador; audit trail em `docs/compliance/LGPD-pipeline-geo.md` (ver `01` F.5) | Notificação ANPD ou requisição de titular → suspensão temporária do KPI 7 + remediação |

---

## 8. Dependências críticas até pico 2026.2

O caminho crítico até o pico é uma cadeia de 7 marcos, do M03 (`llms.txt`) ao M17 (fim do pico). Atraso em qualquer marco anterior compromete o seguinte. Gantt resumido:

```
mai/2026                        jun/2026                   jul/2026
│                               │                          │
M03 (14-05)                     M08 (02-06)                M14 (14-17/07)
llms.txt em produção            Peça 1 HBR Alexandre       XII CBPOT Salvador
│                               │                          (peça pré-CBPOT)
├── M07 (25-05)                 ├── M09 (02-06)            │
│   GA4 referrer/UTM            │   GA4 atribuição ativa   │
│                               │                          │
├── M06 (30-05)                 ├── M10 (15-06)            ├── M17 (31-07)
│   Schema piloto               │   Início pico 2026.2     │   Fim do pico
│   produção                    │   abertura matrícula     │
│                               │                          │
└── Fim Fase 1 (30-05)          └── Fim Fase 2 (15-06)     └── Início Fase 4
                                    Início Fase 3
```

### 8.1 Marcos críticos com SLA técnico

| Marco | Data | Owner técnico | Pré-requisito gating | SLA de remediação |
|---|---|---|---|---|
| **M03** | 14-05-2026 | Brasil GEO + TI IPOG | Cenário CMS confirmado em D-7; placeholders mapeados; review Bruno | D-5 (09-05): escalonamento a Bruno se Cenário não confirmado; D-2 (12-05): escalonamento a Ronan |
| **M06** | 30-05-2026 | Brasil GEO + TI IPOG | M03 entregue; Schema homologação D-7 (23-05); 3 docentes piloto com Lattes/ORCID consentidos (D04 do Board) | D-7 (23-05): acionamento Cenário 3 subdomínio se TI IPOG não viabilizar |
| **M07** | 25-05-2026 | Bruno + TI IPOG | Política Privacidade revisada (M02); UTM scheme aprovado | D-Day: KPI 7 entra como N/D na Fase 1; D+15 (09-06): KPI 7 deferido para Fase 2 |
| **M08** | 02-06-2026 | Brasil GEO (Alexandre) | M06 entregue (Schema); Voice Guard ≥ 70 (gate); CI editorial verde; aprovação PR de Bruno | D-7 (26-05): rascunho aprovado; D-3 (30-05): Voice Guard verde; falha → reescrita estrutural obrigatória |
| **M09** | 02-06-2026 | Brasil GEO + Bruno | M07 entregue; UTM dedicado nas peças HBR; classificador Cloudflare Worker se referrer ausente | D+1: validação de captura no GA4 |
| **M10** | 15-06-2026 | Bruno + Alexandre | M03 + M06 + M07 + M08 entregues; baseline cross-LLM congelado em 14-06; KPI 8 Delta pré-onda 1 fechado | D+45 (31-07): fechamento de KPIs do pico → checkpoint mensal de agosto |
| **M14** | 14-17/07/2026 | Bruno + Alexandre | Peça especial pré-CBPOT publicada D-7 (07-07); Schema da peça com `Article` + `Person` + cross-link MBA | Falha → redirecionamento de stand IPOG sem peça âncora |
| **M17** | 31-07-2026 | Bruno + Alexandre | KPIs do pico fechados; auditoria pós-pico iniciada; M18 board report (05-08) em construção | D+5: report ao Conselho |

A dependência mais crítica é **M03 → M06 → M08 → M10**. Se M03 atrasar mais que 5 dias úteis, todo o pipeline de Schema piloto + Peça 1 + abertura de matrícula desliza, comprometendo a tese de "ocupar a janela técnica antes do pico".

---

## 9. Decisões pedidas ao Conselho IPOG

Oito decisões executivas são solicitadas ao Conselho IPOG na próxima janela (próximo board, idealmente até 15-05-2026 para sincronizar com R-001 do `docs/05-risk-register.md`).

| ID | Decisão | Cenário recomendado | Fallback | Quem decide | Prazo |
|---|---|---|---|---|---|
| **D-CONS-01** | Aprovar provisionamento dos 3 repos secundários no GitHub `alexandrebrt14-sys` (`geo-platform`, `geo-dashboard`, `geo-ipog-website`) | Aprovar com configuração privada e branch protection (Alexandre + Bruno como maintainers) | Manter monorepo `geo-ipog` com pacotes pnpm/uv (overhead 4-6 semanas) | Ronan (autorização) + Alexandre (provisionamento) | 05-05-2026 |
| **D-CONS-02** | Aprovar budget mensal recalibrado para o cohort 2026 premium | R$ 1.500/mês em pico (jun-ago); R$ 540/mês em regime contínuo (set-nov) | Manter teto USD 50/sprint (R$ 260) com cohort enxuto (subset 30 prompts críticos) | Ronan + controller IPOG | 15-05-2026 |
| **D-CONS-03** | Aprovar acesso TI IPOG para Schema injection em `ipog.edu.br` antes de 30-05 | Aprovar acesso de PR review + deploy para TI IPOG via repo `geo-ipog-website` (revisão Bruno antes de TI aplicar) | Cenário 3 do `03-schema-llms-txt-engineer.md` (subdomínio `mba.ipog.edu.br` sob controle Brasil GEO) | Ronan + TI IPOG | 09-05-2026 |
| **D-CONS-04** | Aprovar GA4 com configuração customizada de referrer/UTM dedicado de LLM até 25-05 (M07) | Aprovar UTM scheme canônico (`utm_source=chatgpt|claude|gemini|perplexity|grok|copilot`) + custom event `peca_hbr_lida_completamente` + funil de conversão dedicado | Adiar KPI 7 para Fase 2 (D+15 = 09-06) | Bruno + TI IPOG | 18-05-2026 |
| **D-CONS-05** | Aprovar Cloudflare Worker classificador de tráfego LLM em `ipog.edu.br/blog/*` (opcional, condicional a perda de atribuição > 15%) | Aprovar instalação condicional em junho (após primeira leitura GA4) | Manter classificação client-side via GTM apenas | Bruno + TI IPOG | 31-05-2026 |
| **D-CONS-06** | Aprovar 1Password Teams compartilhado (vault `geo-ipog`) para gestão de secrets entre Brasil GEO + Bruno | Aprovar (3 usuários × USD 8/mês = USD 24/mês) | Apenas GitHub Secrets + Cloudflare Workers Secrets sem vault humano (perde auditabilidade) | Ronan + Alexandre | 12-05-2026 |
| **D-CONS-07** | Aprovar reconciliação do cohort: atualizar RUNBOOK 2024 (`dashboards/RUNBOOK-COLETA-LLM.md`) para cohort 2026 (gpt-5.0, claude-opus-4-7, gemini-3-pro, sonar-pro, grok-4, copilot-2026) | Aprovar PR `runbook/atualiza-cohort-2026-wave3` com 6 mudanças canônicas (ver `05` L.2) | Manter cohort 2024 e adiar coleta plena para 2027 (perde pico 2026.2) | Alexandre (autor) + Bruno (reviewer) | 09-05-2026 |
| **D-CONS-08** | Aprovar reconciliação de teto FinOps original (USD 50/sprint = R$ 260) com TCO real (R$ 21.158 para 12 meses inteiros) | Aprovar teto recalibrado por categoria: R$ 2.600/mês LLMs em pico + R$ 350/mês observability + R$ 125/mês 1Password + reserva 25% | Manter teto original USD 50/sprint e operar em cenário Mínimo viável (perde KPI 8 sensitivity test trimestral) | Ronan + controller IPOG | 15-05-2026 |

---

## 10. Próximos passos imediatos pós-Board

Os 12 próximos passos para os 7 dias após a aprovação do Board, com owner nominal e prazo:

| # | Ação | Owner | Prazo |
|---|---|---|---|
| 1 | Apresentar Tech Roadmap 2026 a Bruno em revisão técnica conjunta de 60 minutos | Alexandre | 02-05-2026 (D+1) |
| 2 | Abrir 8 GitHub Issues vinculadas a D-CONS-01 a D-CONS-08 com label `decisao-conselho` no `geo-ipog` | Alexandre | 02-05-2026 (D+1) |
| 3 | Provisionar repositórios `geo-platform`, `geo-dashboard`, `geo-ipog-website` no GitHub `alexandrebrt14-sys` (após D-CONS-01) | Alexandre | 05-05-2026 (D+4) |
| 4 | Provisionar Cloudflare account dedicado ao programa (Workers + R2 + D1 + Pages + Queues + KV) | Alexandre | 06-05-2026 (D+5) |
| 5 | Configurar 1Password Teams vault `geo-ipog` com inventário canônico de 16 secrets (após D-CONS-06) | Alexandre | 12-05-2026 (D+11) |
| 6 | Abrir PR `runbook/atualiza-cohort-2026-wave3` contra `geo-ipog/dashboards/RUNBOOK-COLETA-LLM.md` (após D-CONS-07) | Alexandre | 09-05-2026 (D+8) |
| 7 | Implementar Collector v0 contra Perplexity + GPT-5 como primeira integração; D1 e R2 provisionados | Alexandre + sub-agent Opus | 07-05-2026 (D+6) |
| 8 | Primeira coleta cross-LLM end-to-end com 6 provedores; validação fail-loud em produção | Alexandre | 10-05-2026 (D+9) |
| 9 | Schema Manager gera primeiro `llms.txt` válido + PR aberto contra `geo-ipog-website` | Alexandre | 13-05-2026 (D+12) |
| 10 | TI IPOG aplica `llms.txt` em produção em `https://ipog.edu.br/llms.txt` (M03) | TI IPOG (autorizado por Bruno + Ronan) | 14-05-2026 (D+13) |
| 11 | Validar GA4 referrer/UTM em ambiente de homologação com Bruno (após D-CONS-04) | Bruno + Alexandre | 18-05-2026 (D+17) |
| 12 | Reunião de status semanal terça-feira 10h00 BRT — primeira ata pós-Tech Roadmap aprovado | Alexandre + Bruno | 05-05-2026 (D+4) |

---

## 11. Apêndices

### 11.A — Matriz cruzada de convergências e divergências entre os 8 dossiês

| Tópico | 01 Solution Arch | 02 Data Eng | 03 Schema/llms.txt | 04 Dashboard | 05 LLM Integration | 06 NAIA + Voice Guard | 07 Observability + CI/CD | 08 Editorial CMS | Convergência? |
|---|---|---|---|---|---|---|---|---|---|
| Cloudflare como hosting primário | sim (ADR-002) | sim (Workers Triggers) | implícito (CDN para Schema) | sim (Pages) | sim (KV cache) | sim (deploy) | sim (ADR-009) | sim (Worker classificador) | **8/8 forte** |
| Python 3.12 backend + TS frontend | sim (ADR-001) | sim (Bloco J) | TS para builders Schema | sim (Next.js 16) | sim (httpx + asyncio) | sim (typing) | sim (OTel ambos) | sim (CLI typer) | **8/8 forte** |
| Cohort 6 LLMs versão pinada 2026 | sim | sim | n/a | sim | **sim (canônico)** | n/a | sim (instrumentação) | sim (D+14) | **6/6 forte** |
| Idempotency cache SHA-256 + KV | sim (G.2) | sim (Bloco E) | n/a | n/a | sim (Bloco D) | sim (fetcher cache) | n/a | n/a | **4/4 forte** |
| GitHub Actions cron + Cloudflare Triggers | sim (ADR-007) | sim | n/a | sim | sim (cron-collect-daily) | sim (ci-naia) | sim (Bloco H) | sim (cron-d14) | **7/7 forte** |
| Axiom como observability tier 1 | sim (ADR-009) | sim (Bloco I) | n/a | sim (secrets) | sim (notifier) | implícito | **sim (canônico)** | sim (métricas) | **6/6 forte** |
| Markdown + Voice Guard CI > CMS | sim (ADR-006) | n/a | n/a | n/a | n/a | sim (Voice Guard pipeline) | n/a | **sim (canônico)** | **3/3 forte** |
| Multi-repo (4 repos) | sim (ADR-004) | n/a | sim (`geo-ipog-website`) | sim (`geo-dashboard`) | sim (`geo-platform`) | n/a | sim (Bloco H distribuído) | sim (`geo-ipog`) | **6/6 forte** |
| **Volume de coleta diária** | **450 (= 75 × 6)** | **450** (corrige briefing) | n/a | 450 | **450** (canônico) | n/a | 450 | n/a | divergência com briefing original (4.500) — **resolvida** |
| **Teto FinOps** | USD 50/sprint Cenário 1; USD 89-214 Fases 2-4 | **R$ 2.430/mês** Cenário esperado | n/a | n/a | **R$ 2.600/mês** recalibração | n/a | R$ 260/mês adicional Axiom + 1Password | n/a | **divergência material — D-CONS-08** |
| **Cohort versionamento** | gpt-4o, claude-sonnet-4-5 (legado) | **cohort 2026** | n/a | n/a | **cohort 2026** | n/a | cohort 2026 | cohort 2026 | discrepância 01 vs resto — **resolvida com PR** |
| **KIT-PROMPTS volume** | implícito 75 | **75 confirmado** (corrige briefing 66) | n/a | n/a | **75 (canônico)** | n/a | n/a | n/a | divergência com briefing — **resolvida** |
| Recharts vs Tremor primário | implícito Recharts | n/a | n/a | **Recharts primário** (Tremor secundário) | n/a | n/a | n/a | n/a | resolução em `04` |
| Backoff retry | 2/4/8 (legado) | 2/4/8 | n/a | n/a | **1/4/16** (justificativa Claude Opus) | n/a | n/a | n/a | divergência — resolvida em `05` L.1 |
| Circuit breaker | 3/60s/60s | 3/60s/60s | n/a | n/a | **5/60s/300s** (recalibração) | n/a | n/a | n/a | divergência — resolvida em `05` L.1 |
| Drift detection | entropia 7d vs 30d | entropia + embedding | n/a | n/a | **embedding (primário) + entropia (secundário)** | n/a | n/a | n/a | resolução em `05` |

### 11.B — Diff entre RUNBOOK existente e dossiês especialistas (síntese de `05-llm-integration-service.md` Bloco L)

| Item | RUNBOOK vigente (2024) | Cohort canônico Service (2026) | Decisão |
|---|---|---|---|
| OpenAI | `gpt-4o` (snapshot 2024-08-06) | `gpt-5.0` | PR `runbook/atualiza-cohort-2026-wave3` |
| Anthropic | `claude-sonnet-4-5` | `claude-opus-4-7` | mesmo PR |
| Google | `gemini-1.5-pro` | `gemini-3-pro` | mesmo PR |
| Perplexity | `sonar-pro` | `sonar-pro` (sem mudança) | sem ação |
| xAI | `grok-2` | `grok-4` | mesmo PR |
| Microsoft | Copilot via Bing API | `copilot-2026` (Graph API + Azure fallback) | mesmo PR + nota híbrido |
| Backoff | 2s/4s/8s | 1s/4s/16s | mesmo PR |
| Circuit breaker | 3 falhas/60s, cooldown 60s | 5 falhas/60s, cooldown 5min | mesmo PR |
| Drift detection | entropia 7d vs 30d | embedding similarity (primário) + entropia (secundário) | mesmo PR |
| Janela diária | 06h-09h BRT | 06h-09h30 BRT (extensão para Claude Opus) | mesmo PR |
| Teto FinOps | USD 15/sprint para coleta | R$ 2.600/mês recalibrado, Perplexity isenta de hard stop | mesmo PR + D-CONS-08 |

### 11.C — Catálogo dos 22 workflows GitHub Actions consolidados

Distribuição: 5 já existentes em `geo-ipog` + 17 novos distribuídos em `geo-platform` (8), `geo-dashboard` (5), `geo-ipog-website` (3) e auxiliar transversal (1).

| # | Workflow | Repo | Trigger | Custo (min/mês) |
|---|---|---|---|---|
| 1 | `quality.yml` | `geo-ipog` | PR | 90 |
| 2 | `labeler.yml` | `geo-ipog` | PR | 50 |
| 3 | `stale.yml` | `geo-ipog` | cron diário | 30 |
| 4 | `report-builder.yml` | `geo-ipog` | cron semanal/mensal/trimestral | 60 |
| 5 | `concorrentes-monitoring.yml` | `geo-ipog` | cron quinzenal | 200 |
| 6 | `ci-test.yml` | `geo-platform` | PR/push | 80 |
| 7 | `ci-build-docker.yml` | `geo-platform` | push main | 50 |
| 8 | `ci-deploy-staging.yml` | `geo-platform` | push main | 30 |
| 9 | `cron-collect-daily.yml` | `geo-platform` | 03h UTC failover + CF Trigger 09h UTC primary | 900 |
| 10 | `cron-collect-spot.yml` | `geo-platform` | workflow_dispatch | 50 |
| 11 | `cron-warehouse-compact.yml` | `geo-platform` | cron 02h UTC | 35 |
| 12 | `cron-finops-reconcile.yml` | `geo-platform` | cron dia 5 | 16 |
| 13 | `ci-deploy-production.yml` | `geo-platform` | após CI Test verde | 240 |
| 14 | `ci-naia-audit-monthly.yml` | `geo-platform` | cron mensal dia 1 | 50 |
| 15 | `ci-naia-spot-check-biweekly.yml` | `geo-platform` | cron dias 1 e 15 | 30 |
| 16 | `cron-naia-competitors.yml` | `geo-platform` | cron mensal dia 5 | 80 |
| 17 | `ci-voice-guard.yml` | `geo-platform` | PR | 360 |
| 18 | `pr-check.yml` | `geo-dashboard` | PR | 90 |
| 19 | `deploy-staging.yml` | `geo-dashboard` | push staging | 60 |
| 20 | `deploy-production.yml` | `geo-dashboard` | push main | 15 |
| 21 | `lighthouse.yml` | `geo-dashboard` | cron semanal | 0,3 |
| 22 | `e2e.yml` | `geo-dashboard` | push main + cron diário | 240 |
| 23 | `cron-llms-txt-rebuild.yml` | `geo-ipog-website` | workflow_dispatch + cron mensal | 30 |
| 24 | `cron-d1-backup-daily.yml` | `geo-platform` | cron diário | 50 |
| 25 | `ci-editorial.yml` | `geo-ipog` | PR em `content/peças-hbr/**` | 80 |
| 26 | `cron-pos-publish-d14.yml` | `geo-ipog` | cron diário | 90 |
| 27 | `cron-secret-rotation-quarterly.yml` | `geo-ipog` | cron trimestral | 0,3 |

Total estimado em produção plena: ~3.000 minutos/mês. Migração de `cron-collect-daily.yml` para Cloudflare Cron Triggers reduz para ~2.100 min/mês. Custo GitHub Actions: USD 4-8/mês (R$ 22-44/mês).

(Nota: numeração ultrapassa 22 porque incluímos auxiliares e backup; o número canônico de 22 do dossiê 07 conta apenas os principais.)

### 11.D — Catálogo dos 16 secrets canônicos

| # | Secret | Categoria | Storage primário | Onde usa | Rotação |
|---|---|---|---|---|---|
| 1 | `OPENAI_API_KEY` | LLM | GitHub Secrets + Cloudflare Workers Secrets | `geo-platform` runtime + cron | Trimestral |
| 2 | `ANTHROPIC_API_KEY` | LLM | GitHub + CF Workers | `geo-platform` | Trimestral |
| 3 | `GOOGLE_API_KEY` | LLM | GitHub + CF Workers | `geo-platform` | Trimestral |
| 4 | `PERPLEXITY_API_KEY` | LLM | GitHub + CF Workers | `geo-platform` | Trimestral |
| 5 | `XAI_API_KEY` | LLM | GitHub + CF Workers | `geo-platform` | Trimestral |
| 6 | `MS_GRAPH_TENANT_ID` + `MS_GRAPH_CLIENT_ID` + `MS_GRAPH_CLIENT_SECRET` + `AZURE_OPENAI_API_KEY` | LLM (Copilot híbrido) | GitHub + CF Workers | `geo-platform` (via Bing/Azure) | Trimestral |
| 7 | `CLOUDFLARE_API_TOKEN` | Hosting | GitHub Secrets | CI deploys | Semestral |
| 8 | `CLOUDFLARE_ACCOUNT_ID` | Hosting | GitHub Secrets | CI deploys | — |
| 9 | `AXIOM_TOKEN` + `AXIOM_ORG_ID` + `AXIOM_DATASET` | Observability | GitHub + CF Workers | runtime + CI | Semestral |
| 10 | `SENTRY_DSN` + `SENTRY_AUTH_TOKEN` | Observability | GitHub + CF Workers | `geo-dashboard` + CI source maps | Semestral |
| 11 | `GA4_PROPERTY_ID` + `GA4_CLIENT_EMAIL` + `GA4_PRIVATE_KEY` | Analytics | GitHub + CF Workers | reporting service (KPI 7) | Anual |
| 12 | `RESEND_API_KEY` | Auth/Email | GitHub Secrets | NextAuth magic link | Semestral |
| 13 | `GH_PAT_AUDIT_ENGINE` | GitHub | GitHub Secrets | NAIA → emit issue, alert workflow | Trimestral |
| 14 | `GH_PAT_NAIA_BOT` | GitHub | GitHub Secrets | NAIA bot commit relatório mensal | Trimestral |
| 15 | `IPOG_CMS_DEPLOY_KEY` | Deploy externo | GitHub Secrets (deploy key SSH) | `geo-ipog-website` → deploy de Schema/llms.txt | Anual ou em troca de TI IPOG |
| 16 | `GITHUB_CLIENT_ID` + `GITHUB_CLIENT_SECRET` | Auth dashboard | GitHub + CF Workers | NextAuth GitHub provider | Anual |

Storage strategy:

- **GitHub Secrets** (Actions): para CI/CD. Encrypted at rest, RBAC por environment.
- **Cloudflare Workers Secrets**: para runtime. Binding nativo, nunca em logs.
- **1Password Teams** vault `geo-ipog`: source of truth humano para auditoria. Bruno recebe acesso de leitura aos secrets compartilhados.
- **`.env.local`** (dev only): nunca committed. `.gitignore` enforced. `direnv` recomendado.

---

## Cross-references e cadência de revisão deste documento

- `01-solution-architecture.md` — visão macro, ADRs 001-010, riscos arquiteturais Top 5.
- `02-data-engineering.md` — pipeline cross-LLM, schema warehouse 7 tabelas, FinOps por LLM.
- `03-schema-llms-txt-engineer.md` — 11 páginas-alvo, 6 JSON-LD canônicos, llms.txt integral.
- `04-dashboard-frontend.md` — 11 telas, 8 KPI cards, Recharts primário.
- `05-llm-integration-service.md` — 6 Provider Clients, drift detector, RUNBOOK reconciliation.
- `06-naia-voice-guard.md` — 34 checks NAIA executáveis, 4 dimensões editoriais em código.
- `07-observability-cicd.md` — 3 pilares, 24 eventos canônicos, 17 métricas, 5 SLOs.
- `08-editorial-cms.md` — Markdown + Voice Guard CI, frontmatter pydantic, Schema injection.
- `docs/06-marcos-criticos-2026.md` — calendário com 19 marcos 2026.
- `docs/05-risk-register.md` — 12 riscos canônicos com gatilhos.
- `docs/04-definicao-de-done.md` — DoD por artefato.
- `dashboards/METRICAS-CANONICAS.md` — 8 KPIs canônicos com fórmulas.
- `dashboards/FINOPS-DISCIPLINA.md` — disciplina financeira (a recalibrar via D-CONS-08).
- `dashboards/RUNBOOK-COLETA-LLM.md` — RUNBOOK operacional (a atualizar via D-CONS-07).
- `docs/board-report/00-board-report-final.md` — board report consolidado com 8 decisões D01-D08.

### Cadência de revisão

| Atividade | Cadência | Owner |
|---|---|---|
| Atualização de marcos mensais (jan-dez 2026) | Mensal no checkpoint executivo | Alexandre + Bruno |
| Recalibração TCO vs custo real observado | Mensal (com fechamento da fatura LLM) | Alexandre |
| Reavaliação de ADRs (002, 006, 009) | Trimestral (2026-Q3 e 2027-Q1) | Alexandre |
| Reavaliação build-vs-buy | Trimestral | Alexandre |
| Revisão de riscos arquiteturais Top 7 | Mensal | Alexandre |
| Revisão deste documento na íntegra | Trimestral (próxima: 30-09-2026) | Alexandre |

---

## Recomendação de agenda — 60 minutos para o Conselho IPOG

Para apresentação executiva ao Conselho, recomenda-se a seguinte distribuição de tempo, alinhada à disciplina de board reports do programa.

| Janela | Tópico | Material de apoio | Decisão pedida |
|---|---|---|---|
| 0-5 min | Abertura: tese técnica em 5 frases (Seção 2) e contexto pico 2026.2 | Seções 1-2 deste documento | — |
| 5-15 min | Arquitetura consolidada + 4 repos + 9 containers + convergências entre dossiês (Seção 3) | Seção 3 + Apêndice 11.A | D-CONS-01 (provisionamento dos 3 repos) |
| 15-25 min | Roadmap mensal jan-dez 2026 + dependências críticas até pico (Seções 4 e 8) | Seções 4 e 8 | D-CONS-03 (acesso TI IPOG); D-CONS-04 (GA4); D-CONS-05 (CF Worker classificador) |
| 25-40 min | Decisões build-vs-buy + TCO 12 meses + reconciliação com receita (Seções 5 e 6) | Seções 5 e 6 | D-CONS-02 (budget recalibrado); D-CONS-06 (1Password); D-CONS-08 (teto FinOps recalibrado) |
| 40-50 min | Riscos arquiteturais Top 7 + reconciliação RUNBOOK 2024 (Seção 7 e Apêndice 11.B) | Seção 7 + Apêndice 11.B | D-CONS-07 (atualização cohort RUNBOOK) |
| 50-60 min | Próximos passos imediatos pós-Board (Seção 10) + Q&A | Seção 10 | Aprovação do Tech Roadmap 2026 e calendário de checkpoints mensais |

Pré-leitura recomendada para os conselheiros: Sumário Executivo (Seção 1) + Tese técnica (Seção 2) + Decisões D-CONS-01 a D-CONS-08 (Seção 9). Tempo estimado de leitura: 15 minutos.

---

> **Encerramento.** Este Tech Roadmap 2026 sintetiza os 8 dossiês especializados em uma única narrativa arquitetural e operacional, expõe convergências e divergências, materializa um cronograma mensal jan-dez 2026 com 19 marcos críticos, articula um TCO consolidado de aproximadamente R$ 21.158 para 12 meses inteiros (0,81% da receita projetada de R$ 2,6 milhões em 2026.2) e formaliza 8 decisões executivas pedidas ao Conselho IPOG. A próxima decisão arquitetural significativa fica para 2027-Q1, no fechamento do segundo pico (15-02-2027), quando ADRs 002 (Cloudflare), 006 (CMS Markdown) e 009 (Axiom) serão reavaliadas com aprendizado operacional de 12 meses inteiros e calibração da equipe Brasil GEO + IPOG. Até lá, a disciplina é prescritiva: cohort fixo, repositório como fonte de verdade canônica, FinOps disciplinado com block automático, fail-loud em coleta parcial, build-vs-buy resolvido por linha do tempo do pico GEO 2026.2 — não por preferência arquitetural.
