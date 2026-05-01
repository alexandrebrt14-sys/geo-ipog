# Catálogo executável dos 22 workflows GitHub Actions — Programa GEO IPOG

Documento auxiliar do roadmap técnico 2026. Espelha o Bloco H de `docs/tech-stack/07-observability-cicd.md` e adiciona dependências, custo consolidado, catálogo de secrets e runbook. Executor: Brasil GEO sob Alexandre Caramaschi (CEO da Brasil GEO, ex-CMO da Semantix Nasdaq, cofundador da AI Brasil), sponsor IPOG Ronan Maia, marketing Bruno Azambuja.

Distribuição em 4 repos privados: `geo-ipog` (6 workflows, governança), `geo-platform` (8, coleta + NAIA), `geo-dashboard` (5, Next.js), `geo-ipog-website` (3, Schema piloto).

---

## Bloco A — Tabela mestre dos 22 workflows

`Tempo médio` em min/execução. `Custo mensal` em min/mês. `Owner` é o responsável humano pelo keep-alive.

### A.1 Repo `geo-ipog` (privado, governança)

| ID | Repo | Workflow | Trigger | Cron schedule | Jobs principais | Secrets | Tempo médio (min) | Custo mensal (min) | Owner | Dependências |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `geo-ipog` | `quality.yml` | push, PR | – | markdownlint, link-check, ci-validate-log-schema | – | 2 | 60 | Alexandre | – |
| 2 | `geo-ipog` | `labeler.yml` | PR opened/edited | – | auto-label por path (docs/, drafts/, ops/) | `GITHUB_TOKEN` | 1 | 30 | Alexandre | – |
| 3 | `geo-ipog` | `stale.yml` | cron diário | `0 3 * * *` UTC | marcar issues/PRs >60d, fechar >90d | `GITHUB_TOKEN` | 2 | 60 | Bruno Azambuja | – |
| 4 | `geo-ipog` | `report-builder.yml` | cron seg + 1º dia 09:00 BRT | `0 12 * * 1` + `0 12 1 * *` UTC | python+jinja, gera MD em `reports/` | `AXIOM_TOKEN` (read), `GA4_*` | 8 | 50 | Alexandre | consome Axiom de #10/#12 |
| 5 | `geo-ipog` | `concorrentes-monitoring.yml` | cron quinzenal | `0 11 1,15 * *` UTC | snapshot 10 concorrentes (Schema, llms.txt, headers) | `GITHUB_TOKEN` | 25 | 50 | Alexandre | consome saídas de #21 |
| – | `geo-ipog` | `dependabot.yml` (config) | semanal | gerenciado pelo GitHub | bumps de deps Python/Node | – | – | – | Alexandre | – |
| 22 | `geo-ipog` | `cron-secret-rotation-quarterly.yml` | cron trimestral | `0 9 1 1,4,7,10 *` UTC | abre issue checklist de rotação dos 14 secrets | `GH_PAT_AUDIT_ENGINE` | 1 | 0,3 | Alexandre | aciona Bloco D |

### A.2 Repo `geo-platform` (privado, coleta + NAIA)

| ID | Repo | Workflow | Trigger | Cron schedule | Jobs principais | Secrets | Tempo médio (min) | Custo mensal (min) | Owner | Dependências |
|---|---|---|---|---|---|---|---|---|---|---|
| 6 | `geo-platform` | `ci-test.yml` | push, PR | – | ruff, mypy --strict, pytest --cov=80, build | – | 5 | 200 | Alexandre | – |
| 7 | `geo-platform` | `ci-build-docker.yml` | push em `staging`, `main` | – | docker build + push GHCR + scan trivy | `GHCR_TOKEN` | 8 | 80 | Alexandre | requer #6 verde |
| 8 | `geo-platform` | `ci-deploy-staging.yml` | push em `staging` | – | wrangler deploy --env staging + smoke test | `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` | 5 | 50 | Alexandre | requer #6 e #7 verdes |
| 9 | `geo-platform` | `ci-deploy-production.yml` | push em `main` + `workflow_dispatch` | – | wrangler deploy --env production + smoke + verify_24h | `CLOUDFLARE_API_TOKEN` | 6 | 30 | Alexandre | requer #8 verde por 24h |
| 10 | `geo-platform` | `cron-collect-daily.yml` | cron diário | `0 9 * * *` UTC (06:00 BRT) | coleta 75 prompts × 6 LLMs, persiste D1+Axiom | 6× LLM keys + `MS_GRAPH_*` + `AXIOM_TOKEN` | 30 | 900 | Alexandre | circuit breaker FinOps |
| 11 | `geo-platform` | `cron-collect-spot.yml` | `workflow_dispatch` | manual | spot-check pontual de prompts selecionados | 6× chaves LLM | 10 | 50 | Alexandre | – |
| 12 | `geo-platform` | `ci-naia-audit-monthly.yml` | cron mensal | `0 9 1 * *` UTC | NAIA full audit, abre issues P0/P1 em `geo-ipog` | `GH_PAT_AUDIT_ENGINE`, `AXIOM_TOKEN` | 35 | 35 | Alexandre | issues consumidas por #4 |
| 13 | `geo-platform` | `ci-naia-spot-check-biweekly.yml` | cron quinzenal | `0 12 1,15 * *` UTC | spot-check P0/P1 reabertos | `GH_PAT_AUDIT_ENGINE` | 8 | 16 | Alexandre | usa baseline de #12 |

### A.3 Repo `geo-dashboard` (privado, Next.js)

| ID | Repo | Workflow | Trigger | Cron schedule | Jobs principais | Secrets | Tempo médio (min) | Custo mensal (min) | Owner | Dependências |
|---|---|---|---|---|---|---|---|---|---|---|
| 14 | `geo-dashboard` | `pr-check.yml` | PR | – | eslint, tsc, vitest --coverage 80, next build | – | 6 | 240 | Alexandre | consome dados de #10 via D1 |
| 15 | `geo-dashboard` | `deploy-staging.yml` | push em `staging` | – | next build + cloudflare pages deploy --branch staging | `CLOUDFLARE_API_TOKEN`, `SENTRY_AUTH_TOKEN` | 5 | 50 | Alexandre | requer #14 verde |
| 16 | `geo-dashboard` | `deploy-production.yml` | push em `main` + `workflow_dispatch` | – | next build + cloudflare pages deploy --branch production | `CLOUDFLARE_API_TOKEN`, `SENTRY_AUTH_TOKEN` | 6 | 30 | Alexandre | requer #14 + #15 verdes por 24h |
| 17 | `geo-dashboard` | `lighthouse.yml` | `workflow_run` (após #15 e #16) | – | Lighthouse CI 5 rotas, thresholds Bloco G.3 | `LHCI_GITHUB_APP_TOKEN` | 8 | 80 | Alexandre | dispara após #15/#16 |
| 18 | `geo-dashboard` | `e2e.yml` | cron noturno + `workflow_dispatch` | `0 4 * * *` UTC | Playwright E2E em staging, smoke flows | `CLOUDFLARE_ACCESS_SERVICE_TOKEN` | 12 | 360 | Alexandre | testa staging mantido por #15 |

### A.4 Repo `geo-ipog-website` (privado, Schema piloto)

| ID | Repo | Workflow | Trigger | Cron schedule | Jobs principais | Secrets | Tempo médio (min) | Custo mensal (min) | Owner | Dependências |
|---|---|---|---|---|---|---|---|---|---|---|
| 19 | `geo-ipog-website` | `ci-validate-jsonld.yml` | push, PR | – | jsonld validate via `pyld`, schema.org check | – | 3 | 90 | Alexandre | bloqueia merge |
| 20 | `geo-ipog-website` | `ci-validate-llms-txt.yml` | push, PR | – | parser llms.txt + checagem de URLs declaradas | – | 2 | 60 | Alexandre | bloqueia merge |
| 21 | `geo-ipog-website` | `snapshot-schema-implementations.yml` | cron mensal | `0 9 5 * *` UTC | snapshot Schema dos 10 concorrentes | – | 15 | 15 | Alexandre | alimenta #5 |

---

## Bloco B — Diagrama de dependências entre workflows

Setas: `==>` gate bloqueante (CI fail = merge bloqueado); `-->` consumo de artefato/dado; `..>` acionamento via API/issue.

### B.1 Cadeia de dados (coleta → consumo)

```
                                +---------------------+
                                | #10 cron-collect    |
                                |    daily (06:00BRT) |
                                +----------+----------+
                                           |
                          grava em D1, R2, |  Axiom
                                           v
+------------------+         +--------------------------+
| #11 cron-collect | ......> | warehouse: D1 + Axiom    |
|     spot (manual)|         +-----+-------------+------+
+------------------+               |             |
                                   |             |
                                   v             v
                       +--------------------+   +---------------------+
                       | #14 pr-check       |   | #4 report-builder   |
                       | (geo-dashboard)    |   | (geo-ipog)          |
                       +--------+-----------+   +--------+------------+
                                |                        |
                                v                        v
                       +----------------+        publica relatorios
                       | #15 deploy-    |        em reports/MM-YYYY/
                       |   staging      |
                       +-------+--------+
                               |
                               v
                       +----------------+        +-------------------+
                       | #17 lighthouse | <----- | #16 deploy-prod   |
                       +----------------+        +-------------------+
                               ^
                               |
                       +----------------+
                       | #18 e2e nightly|
                       +----------------+
```

### B.2 Cadeia NAIA (audit → issues → relatorio)

```
+--------------------------+         abre issues (P0/P1) com label "naia-finding"
| #12 ci-naia-audit-       | ........................................>  geo-ipog issues
|     monthly (dia 1)      |
+-----------+--------------+
            |
            | baseline.json
            v
+--------------------------+
| #13 ci-naia-spot-check-  |
|     biweekly (1, 15)     |  ........................................>  geo-ipog issues
+--------------------------+
                                                          |
                                                          v
                                                +--------------------+
                                                | #4 report-builder  |
                                                | consome issues e   |
                                                | gera report mensal |
                                                +--------------------+
```

### B.3 Cadeia Schema piloto (geo-ipog-website → produção)

```
push em geo-ipog-website
       |
       v
+--------------------------+   gate bloqueante
| #19 ci-validate-jsonld   | ==>  bloqueia merge se invalido
+-----------+--------------+
            |
            v
+--------------------------+   gate bloqueante
| #20 ci-validate-llms-txt | ==>  bloqueia merge se URLs ausentes
+-----------+--------------+
            |
       (merge libera)
            v
       deploy-production via CI externo (CMS IPOG)
            |
            v
+--------------------------+        cron mensal (dia 5)
| #21 snapshot-schema-     | --> alimenta dataset usado por #5
|     implementations      |
+--------------------------+
            |
            v
+--------------------------+
| #5 concorrentes-         |  --> alimenta #4 report-builder
|     monitoring (geo-ipog)|
+--------------------------+
```

### B.4 Cadeia governança (rotação + saúde)

```
+--------------------------+   abre issue 7d antes do trimestre vencer
| #22 cron-secret-rotation | ........................................>  Bloco D rotinas
|     quarterly (geo-ipog) |
+--------------------------+

push/PR em geo-ipog
       |
       v
+--------------------------+ +--------------------+
| #1 quality.yml           | | #2 labeler.yml     |
+--------------------------+ +--------------------+
       (gate de merge para docs e ops)

cron diario
       |
       v
+--------------------------+
| #3 stale.yml             |  housekeeping de issues e PRs
+--------------------------+
```

### B.5 Resumo das dependências

| Origem | Tipo | Destino |
|---|---|---|
| #10, #11 | dados (D1/Axiom) | #4, #14 |
| #12, #13 | issue API | #4 |
| #19, #20 | CI gate | merge website + deploy externo |
| #21 | dataset mensal | #5 |
| #5 | dataset quinzenal | #4 |
| #6 | CI gate | #7, #8, #9 |
| #7 | artefato GHCR | #8, #9 |
| #8 | soak 24h | #9 |
| #14 | CI gate | #15, #16 |
| #15, #16 | trigger workflow_run | #17 |
| #15 | ambiente staging | #18 |
| #22 | issue checklist | Bloco D |

---

## Bloco C — Total mensal de minutos consolidado

Free tier privado: **3.000 min/mês compartilhados na org** (GitHub Team). Públicos não consomem.

### C.1 Distribuição por workflow

| ID | Workflow | Frequência mensal (execuções) | Tempo médio (min) | Total min/mês | Repo |
|---|---|---|---|---|---|
| 1 | `quality.yml` | 30 | 2 | 60 | `geo-ipog` |
| 2 | `labeler.yml` | 30 | 1 | 30 | `geo-ipog` |
| 3 | `stale.yml` | 30 | 2 | 60 | `geo-ipog` |
| 4 | `report-builder.yml` | 5 | 8 | 50 | `geo-ipog` |
| 5 | `concorrentes-monitoring.yml` | 2 | 25 | 50 | `geo-ipog` |
| 6 | `ci-test.yml` | 40 | 5 | 200 | `geo-platform` |
| 7 | `ci-build-docker.yml` | 10 | 8 | 80 | `geo-platform` |
| 8 | `ci-deploy-staging.yml` | 10 | 5 | 50 | `geo-platform` |
| 9 | `ci-deploy-production.yml` | 5 | 6 | 30 | `geo-platform` |
| 10 | `cron-collect-daily.yml` | 30 | 30 | 900 | `geo-platform` |
| 11 | `cron-collect-spot.yml` | 5 | 10 | 50 | `geo-platform` |
| 12 | `ci-naia-audit-monthly.yml` | 1 | 35 | 35 | `geo-platform` |
| 13 | `ci-naia-spot-check-biweekly.yml` | 2 | 8 | 16 | `geo-platform` |
| 14 | `pr-check.yml` | 40 | 6 | 240 | `geo-dashboard` |
| 15 | `deploy-staging.yml` | 10 | 5 | 50 | `geo-dashboard` |
| 16 | `deploy-production.yml` | 5 | 6 | 30 | `geo-dashboard` |
| 17 | `lighthouse.yml` | 10 | 8 | 80 | `geo-dashboard` |
| 18 | `e2e.yml` | 30 | 12 | 360 | `geo-dashboard` |
| 19 | `ci-validate-jsonld.yml` | 30 | 3 | 90 | `geo-ipog-website` |
| 20 | `ci-validate-llms-txt.yml` | 30 | 2 | 60 | `geo-ipog-website` |
| 21 | `snapshot-schema-implementations.yml` | 1 | 15 | 15 | `geo-ipog-website` |
| 22 | `cron-secret-rotation-quarterly.yml` | 0,33 | 1 | 0,3 | `geo-ipog` |

### C.2 Distribuição entre repos

| Repo | Total min/mês | Visibilidade | Quota dedicada |
|---|---|---|---|
| `geo-ipog` | 250,3 | privado | – |
| `geo-platform` | 1.361 | privado | – |
| `geo-dashboard` | 760 | privado | – |
| `geo-ipog-website` | 165 | privado | – |
| **Total privado consolidado** | **2.536** | – | 3.000 min/mês free tier compartilhado |

### C.3 Margem vs free tier e recomendação

| Item | Valor |
|---|---|
| Total consumido (privado) | 2.536 min/mês |
| Free tier disponível | 3.000 min/mês |
| Margem | 464 min/mês (15,5% folga) |
| Margem por sprint pico (50% mais PRs) | -300 min/mês (estoura free tier) |
| Custo USD acima do free tier | 0,008 USD/min × 0 min = USD 0/mês em ritmo normal |
| Custo USD em pico 2026.2 | aprox. USD 4/mês |

### C.4 Recomendações de migração

| Workflow | Migrar para | Economia (min/mês) |
|---|---|---|
| #10 `cron-collect-daily.yml` | Cloudflare Cron Triggers (Worker dedicado) | 850 |
| #18 `e2e.yml` | Playwright em Cloudflare Pages preview + Worker headless | 280 |
| #14 `pr-check.yml` | Turbo cache no Actions | 60 |

Pós-migração: total ~**1.346 min/mês** (dobra a margem).

---

## Bloco D — Catálogo dos 16 secrets

Inventário canônico (14 do Bloco I.1 + 2 derivados de CI/registry).

### D.1 Tabela canônica

| # | Nome canônico | Tipo | Repos que usam | Storage | Rotação | Owner |
|---|---|---|---|---|---|---|
| 1 | `OPENAI_API_KEY` | LLM API key | geo-platform | GitHub Secrets + CF Workers Secrets | Trimestral | Alexandre |
| 2 | `ANTHROPIC_API_KEY` | LLM API key | geo-platform | GitHub Secrets + CF Workers Secrets | Trimestral | Alexandre |
| 3 | `GOOGLE_API_KEY` | LLM API key (Gemini) | geo-platform | GitHub Secrets + CF Workers Secrets | Trimestral | Alexandre |
| 4 | `PERPLEXITY_API_KEY` | LLM API key | geo-platform | GitHub Secrets + CF Workers Secrets | Trimestral | Alexandre |
| 5 | `XAI_API_KEY` | LLM API key (Grok) | geo-platform | GitHub Secrets + CF Workers Secrets | Trimestral | Alexandre |
| 6 | `AZURE_OPENAI_API_KEY` + `MS_GRAPH_TENANT_ID` + `MS_GRAPH_CLIENT_ID` + `MS_GRAPH_CLIENT_SECRET` | LLM API key (Copilot via Bing) | geo-platform | GitHub Secrets + CF Workers Secrets | Trimestral | Alexandre |
| 7 | `CLOUDFLARE_API_TOKEN` | Cloudflare token | geo-platform, geo-dashboard | GitHub Secrets | Semestral | Alexandre |
| 8 | `CLOUDFLARE_ACCOUNT_ID` | Cloudflare ID (não-secreto) | geo-platform, geo-dashboard | GitHub Secrets (centralizado) | – | Alexandre |
| 9 | `AXIOM_TOKEN` + `AXIOM_ORG_ID` + `AXIOM_DATASET` | Axiom | geo-platform runtime + CI; geo-ipog (#4) | GitHub Secrets + CF Workers Secrets | Semestral | Alexandre |
| 10 | `SENTRY_DSN` + `SENTRY_AUTH_TOKEN` | Sentry | geo-dashboard runtime + CI source maps | GitHub Secrets + CF Workers Secrets | Semestral | Alexandre |
| 11 | `GA4_PROPERTY_ID` + `GA4_CLIENT_EMAIL` + `GA4_PRIVATE_KEY` | GA4 service account | geo-ipog (#4) reporting | GitHub Secrets + CF Workers Secrets | Anual | Alexandre |
| 12 | `GH_PAT_AUDIT_ENGINE` | GitHub PAT (bot) | geo-platform (#12, #13), geo-ipog (#22) | GitHub Secrets (PAT do bot) | Trimestral | Alexandre |
| 13 | `IPOG_CMS_DEPLOY_KEY` | Deploy key SSH | geo-ipog-website | GitHub Secrets (deploy key) | Anual ou em troca de TI IPOG | Alexandre + TI IPOG |
| 14 | `GITHUB_TOKEN` (built-in) | GitHub token | todos os repos | gerenciado pelo GitHub | rotação automática por job | – |
| 15 | `GHCR_TOKEN` | GitHub Container Registry token | geo-platform (#7) | GitHub Secrets | Semestral | Alexandre |
| 16 | `LHCI_GITHUB_APP_TOKEN` | Lighthouse CI app token | geo-dashboard (#17) | GitHub Secrets | Anual | Alexandre |
| 17 | `CLOUDFLARE_ACCESS_SERVICE_TOKEN` | Cloudflare Access | geo-dashboard (#18) | GitHub Secrets | Semestral | Alexandre |

Source of truth humano: 1Password Business, vault `geo-ipog`. Bruno Azambuja recebe leitura dos compartilhados (Cloudflare, GA4) no onboarding. Total auditável: 17 (14 categorias + 3 CI/registry).

### D.2 Política de rotação consolidada

| Cadência | Itens | Workflow trigger |
|---|---|---|
| Trimestral | LLM (#1-#6), `GH_PAT_AUDIT_ENGINE` | #22 abre issue 7d antes |
| Semestral | `CLOUDFLARE_API_TOKEN`, `AXIOM_*`, `SENTRY_*`, `GHCR_TOKEN`, `CLOUDFLARE_ACCESS_SERVICE_TOKEN` | issue manual seguindo runbook E.4 |
| Anual | `GA4_*`, `IPOG_CMS_DEPLOY_KEY`, `LHCI_GITHUB_APP_TOKEN` | issue manual em janeiro |
| Emergencial | qualquer item após detecção de vazamento | runbook E.4 em <2h |

### D.3 Storage strategy resumida

| Storage | Função | Itens |
|---|---|---|
| GitHub Secrets (environment-scoped) | CI/CD; `production` exige approval | todos os 17 |
| Cloudflare Workers Secrets | runtime production | #1-#6, #9, #11 |
| 1Password Business (vault `geo-ipog`) | source of truth humano | todos os 17 |
| `.env.local` (gitignored) | dev only | espelho parcial |

---

## Bloco E — Runbook operacional consolidado

Cenários assumem `gh` autenticado contra a org Brasil GEO e `wrangler` autenticado.

### E.1 Disparar coleta cross-LLM on-demand

Workflow: #11 (geo-platform). Uso: validar prompt novo, debugar drift fora do horário diário, demanda ad-hoc IPOG.

```bash
gh workflow run cron-collect-spot.yml \
  --repo brasilgeo/geo-platform \
  --field prompts="prompt_id_42,prompt_id_43" \
  --field llms="openai,anthropic,perplexity"
gh run watch --repo brasilgeo/geo-platform
```

### E.2 Audit NAIA full manualmente

Workflow: #12 (geo-platform). Uso: validar pre-deploy de schema piloto, demanda Naia ad-hoc.

```bash
gh workflow run ci-naia-audit-monthly.yml \
  --repo brasilgeo/geo-platform \
  --field domain="geo.ipog.edu.br" \
  --field severity_threshold="P1"
gh run watch --repo brasilgeo/geo-platform
gh issue list --repo brasilgeo/geo-ipog --label "naia-finding" --state open
```

### E.3 Investigar deploy falhado

Workflows: #9, #16.

```bash
gh run list --repo brasilgeo/geo-platform --workflow=ci-deploy-production.yml --limit 5
gh run view <run-id> --repo brasilgeo/geo-platform --log-failed
curl -s "https://sentry.io/api/0/organizations/brasilgeo/releases/?per_page=5" \
  -H "Authorization: Bearer $SENTRY_AUTH_TOKEN" | jq '.[].version'
axiom query 'geo-ipog-prod | where event == "deploy.failed" | take 5'
```

### E.4 Rotacionar secret expirado

Workflow: issue gerada por #22.

```bash
# 1. Gerar nova chave no provider (ex: OpenAI)
# 2. Atualizar GitHub Secret (org-level)
gh secret set OPENAI_API_KEY --org brasilgeo --visibility private --body "$NEW_KEY"
# 3. Atualizar Cloudflare Workers Secret
wrangler secret put OPENAI_API_KEY --env production
# 4. Atualizar 1Password
op item edit "OPENAI_API_KEY" password="$NEW_KEY" --vault geo-ipog
# 5. Smoke test
gh workflow run cron-collect-spot.yml --repo brasilgeo/geo-platform --field prompts="canary_001"
# 6. Revogar chave antiga apenas após smoke verde
```

### E.5 Reabrir issue NAIA fechada por engano

Workflows: #12 + #13.

```bash
gh issue list --repo brasilgeo/geo-ipog --label "naia-finding" --state closed --limit 30
gh issue reopen <issue-number> --repo brasilgeo/geo-ipog --comment "Reaberto por validação humana; aguardando re-run do spot-check"
gh workflow run ci-naia-spot-check-biweekly.yml --repo brasilgeo/geo-platform --field issue_id=<issue-number>
```

### E.6 Pausar coleta diária por FinOps

Workflow: #10.

```bash
gh workflow disable cron-collect-daily.yml --repo brasilgeo/geo-platform
gh workflow list --repo brasilgeo/geo-platform | grep cron-collect-daily
axiom ingest geo-ipog-prod --json '{"event":"collect.paused","actor":"alexandre","reason":"finops_circuit_breaker"}'
# Reativar
gh workflow enable cron-collect-daily.yml --repo brasilgeo/geo-platform
```

### E.7 Rebuild dashboard sem mudança de código

Workflow: #16.

```bash
gh workflow run deploy-production.yml \
  --repo brasilgeo/geo-dashboard \
  --field reason="rebuild_for_data_refresh"
gh run watch --repo brasilgeo/geo-dashboard
```

### E.8 Validar Schema piloto manualmente

Workflows: #19, #20.

```bash
gh workflow run ci-validate-jsonld.yml --repo brasilgeo/geo-ipog-website --ref staging
gh workflow run ci-validate-llms-txt.yml --repo brasilgeo/geo-ipog-website --ref staging
# Validação local antes de push
npm run validate:jsonld -- --file public/schema/course.jsonld
npm run validate:llmstxt  -- --file public/llms.txt
```

### E.9 Forçar Voice Guard re-run

Workflow: pipeline editorial (acionado em PR via #1 `quality.yml`).

```bash
gh pr checks <pr-number> --repo brasilgeo/geo-ipog --watch
python scripts/python/voice_guard.py check --file drafts/<artigo>.md
python scripts/python/voice_guard.py fix   --file drafts/<artigo>.md
git add drafts/<artigo>.md && git commit -m "voice-guard: auto-fix" && git push
```

### E.10 Investigar drift confirmado

Workflows: #10 (origem do alerta) + #4 (relatório).

```bash
axiom query 'geo-ipog-prod | where event == "drift.confirmed" | take 20'
gh workflow run cron-collect-spot.yml \
  --repo brasilgeo/geo-platform \
  --field prompts="<prompt_id_drift>" \
  --field llms="<llm_origem>"
gh workflow run report-builder.yml --repo brasilgeo/geo-ipog --field type="drift_postmortem"
```

### E.11 Reverter deploy de produção

Workflows: #9 (geo-platform) ou #16 (geo-dashboard).

```bash
# Cloudflare Workers (geo-platform)
wrangler rollback --env production
# Cloudflare Pages (geo-dashboard)
wrangler pages deployment list --project-name geo-dashboard
wrangler pages deployment rollback <deployment-id> --project-name geo-dashboard
# Confirmar
gh workflow run ci-deploy-production.yml --repo brasilgeo/geo-platform --field action="verify_rollback"
axiom ingest geo-ipog-prod --json '{"event":"deploy.rolled_back","repo":"geo-platform","actor":"alexandre"}'
```

### E.12 Resetar circuit breaker FinOps

Workflows afetados: #10, #11.

```bash
wrangler kv:key get --binding=FINOPS_KV "circuit_breaker:state" --env production
wrangler kv:key put --binding=FINOPS_KV "circuit_breaker:state" "closed" --env production
wrangler kv:key put --binding=FINOPS_KV "circuit_breaker:tripped_at" "" --env production
gh workflow enable cron-collect-daily.yml --repo brasilgeo/geo-platform
gh workflow run cron-collect-spot.yml --repo brasilgeo/geo-platform --field prompts="canary_001"
```

### E.13 Investigar workflow lento (alerta `workflow_runs_total` p95 > 2x baseline)

Workflow: qualquer um dos 22.

```bash
gh run list --repo brasilgeo/<repo> --workflow=<workflow>.yml --limit 20 --json databaseId,startedAt,updatedAt,conclusion
gh run view <run-id> --repo brasilgeo/<repo> --log
axiom query 'geo-ipog-prod | where workflow == "<name>" | summarize p95(duration_ms) by bin(time, 1d)'
```

### E.14 Rebuildar imagem Docker do geo-platform

Workflow: #7.

```bash
gh workflow run ci-build-docker.yml --repo brasilgeo/geo-platform --ref main
gh api /orgs/brasilgeo/packages/container/geo-platform/versions --jq '.[0:3] | .[] | {id, name, created_at}'
```

### E.15 Pré-publicar relatório mensal sob demanda

Workflow: #4.

```bash
gh workflow run report-builder.yml --repo brasilgeo/geo-ipog --field type="monthly" --field month="2026-05"
gh run watch --repo brasilgeo/geo-ipog
ls reports/2026-05/
```

---

## Sumário

| Indicador | Valor |
|---|---|
| Workflows mapeados | 22 (em 4 repos privados) |
| Consumo mensal | 2.536 min/mês (free tier 3.000 = 15,5% folga) |
| Secrets auditáveis | 17 no vault 1Password `geo-ipog` |
| Workflow mais caro | #10 `cron-collect-daily.yml` (900 min/mês, 35%) |
| Recomendação prioritária | migrar #10 para Cloudflare Cron Triggers (-850 min/mês) |
| Gates bloqueantes do piloto | #19 (`ci-validate-jsonld`) e #20 (`ci-validate-llms-txt`) |
| Runbook | 15 cenários (operação, incident, FinOps, secrets) |

Atualizar quando: workflow novo entrar em produção, secret novo for adicionado, frequência de cron mudar, ou repo for criado/desativado.
