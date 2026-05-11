# Plano de Governanca do Repositorio `geo-ipog` — 11 submenus do GitHub

> **Documento:** `docs/engineering/PLANO-GOVERNANCA-REPO-11-SUBMENUS.md`
> **Versao:** 1.0 — 2026-05-10
> **Autor:** Brasil GEO Platform Engineering (Alexandre Caramaschi)
> **Audiencia primaria:** Alexandre Caramaschi (executor), Bruno Azambuja (operacao), Ronan Maia (decisao executiva), Conselho IPOG (governanca).
> **Cliente:** IPOG — Instituto de Pos-Graduacao e Graduacao (Goiania), programa GEO IPOG.
> **Sponsor executivo:** Ronan Maia (CEO IPOG).
> **Repo alvo:** `github.com/alexandrebrt14-sys/geo-ipog` — privado, repositorio canonico de governanca do programa.
> **Documentos canonicos referenciados:** `docs/tech-stack/00-tech-roadmap-2026.md`, `docs/tech-stack/07-observability-cicd.md`, `docs/03-reunioes-e-cadencia-ipog.md`, `docs/05-risk-register.md`, `docs/framework/06-voice-guard-v2-aggarwal.md`, `docs/framework/07-research-geo-aplicado-ipog.md`, `SECURITY.md`, `CONTRIBUTING.md`, `.github/PULL_REQUEST_TEMPLATE.md`.

---

## Secao 1 — Sumario executivo

Este documento e a primeira leitura integral, do ponto de vista de engenharia de governanca, do estado e das proximas acoes que o repositorio `geo-ipog` deve adotar para suportar o programa GEO IPOG ao longo de 2026, com janela critica entre o pico de captacao 2026.2 (15-06 a 31-07) e a operacao continua a partir de 01-08-2026. O repositorio `geo-ipog` nao e um simples acervo de arquivos: ele e a infraestrutura de execucao do programa, a fonte de verdade canonica para 75 prompts, 4 dimensoes do Voice Guard, 100+ checks NAIA, 16 secrets, 22 workflows planejados, 11 KPIs canonicos (8 canonicos + 3 derivados) e a trilha auditavel para o Conselho IPOG. Toda decisao operacional do programa passa, em algum momento, por um arquivo deste repositorio.

A tese e simples e contraintuitiva: governanca de repositorio nao e ritual de engenharia, e infraestrutura economica do programa. Cada hora gasta em duvida operacional por configuracao ausente, cada PR aberto que nao roda Voice Guard, cada secret rotacionado tarde demais, cada issue orfa de owner e custo direto no KPI 6 (Velocidade de Fechamento de Gaps P0/P1) e custo indireto no KPI 4 (Schema Coverage) e KPI 8 (Delta pre/pos onda) por atraso de publicacao. Em um programa com pico GEO 2026.2 entre 15-06 e 31-07-2026, atraso de 1 semana em Fase 1 reduz em 14% a janela de captacao 2026.2 — ou seja, a disciplina de repositorio e disciplina de captacao.

Os 11 submenus do GitHub auditados — Code, Issues, Pull Requests, Agents, Discussions, Actions, Projects, Wiki, Security and quality, Insights, Settings — encontram-se em tres niveis de maturidade. Tres submenus estao **maduros** (Actions com 6 workflows e 100% de sucesso, Issues com 49 abertas + 30 labels canonicos + auto-labeler ativo, Pull Requests com template e Dependabot operando). Cinco submenus estao **em construcao** (Code com 22 commits e CODEOWNERS ausente, Projects com #6 linkado mas #5 orfao, Wiki habilitado mas vazio, Settings com branch protection minimal, Insights operacional mas nao integrado a relatorios). Tres submenus estao em **lacuna critica** (Security and quality com code scanning DESABILITADO e secret scanning a confirmar, Agents nao auditado, Discussions vazio sem categorias canonicas).

**Top 5 gaps imediatos com prazo:**

1. **P0 — Ativar code scanning + secret scanning** (gratuito em repositorio privado GitHub; cobre Python e TypeScript) — prazo 15-05-2026 (antes da Fase 1 M05 publicacao `llms.txt`).
2. **P0 — Configurar branch protection canonica em `main`** (required reviews=1, required status checks=Quality gate, linear history=true, no force push, no deletion) — prazo 15-05-2026.
3. **P1 — Criar CODEOWNERS** com mapeamento por path (`audits/` → Alexandre; `content/` → Alexandre + Bruno; `data/` → Alexandre; `docs/board-report/` → Alexandre + Ronan) — prazo 20-05-2026.
4. **P1 — Criar 4 templates canonicos de issue** (`.github/ISSUE_TEMPLATE/bug.yml`, `gap-naia.yml`, `decisao-executiva.yml`, `peca-hbr.yml`) — prazo 22-05-2026.
5. **P1 — Resolver Project v2 #5 orfao** (arquivar ou consolidar com #6) e documentar campos canonicos do #6 — prazo 25-05-2026.

**Top 5 forcas ja estabelecidas:**

1. **Quality gate verde em 100% dos runs** com 6 workflows ativos e tempo medio de 1 minuto por run, dentro do free tier GitHub Actions.
2. **30 labels canonicos** ja em uso operacional, cobrindo fase, horizonte, cluster, persona e vetor — base solida para automacao via auto-labeler.
3. **Templates e documentos canonicos completos:** `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `README.md`, `ROADMAP.md` e `.github/PULL_REQUEST_TEMPLATE.md` ja em producao desde abril/2026.
4. **Dependabot operacional** com 5 PRs abertos para minor/patch de actions — sinal de pipeline de seguranca de dependencias funcionando.
5. **13 milestones criados** cobrindo Fase 1 a Fase 4 + M1 a M8 + Operacao continua — estrutura de cadencia ja materializada.

A leitura do documento e prescritiva: cada uma das 11 secoes proximas tem **estado atual + requisitos + engenharia + arquitetura + gaps acionaveis**. A secao 14 consolida o plano em uma tabela executiva com prioridade, owner, prazo e issue alvo. O total de 38 acoes catalogadas (8 P0, 16 P1, 11 P2, 3 P3) e absorvido pelo cronograma de 6 semanas (15-05 a 30-06-2026), com ROI estimado de 18 a 24 horas/mes economizadas em duvida operacional, retrabalho e auditoria — o equivalente a 1 dia util de capacidade liberada por semana para Alexandre.

---

## Secao 2 — `geo-ipog` no contexto da arquitetura do programa

O repositorio `geo-ipog` e o primeiro de quatro repositorios planejados na arquitetura macro do programa GEO IPOG, conforme `docs/tech-stack/00-tech-roadmap-2026.md` Secao 3.1. Os outros tres — `geo-platform`, `geo-dashboard`, `geo-ipog-website` — serao provisionados durante a Fase 1 (mai/2026), apos aprovacao explicita do Conselho IPOG (decisao D-CONS-01). Enquanto isso, `geo-ipog` carrega solitariamente o papel de fonte de verdade canonica para todo o programa, o que torna sua governanca desproporcionalmente critica.

O papel canonico de `geo-ipog` na arquitetura e duplo. **Primeiro**, ele e o repositorio de **governanca pura**: ADRs (Architecture Decision Records), board reports trimestrais, docs estrategicos, prompts canonicos do kit v1.0, runbooks operacionais, atas de reuniao, risk register, dossies de benchmarking das 5 Ondas (Onda 1-2 concluidas, Onda 3 iniciada em set/2026), pecas HBR Fase 2 (em `content/pecas-hbr/`), KPIs canonicos (em `dashboards/KPI-DASHBOARD.md`) e disciplina FinOps (em `dashboards/FINOPS-DISCIPLINA.md`). **Segundo**, ele e o repositorio **editorial-CMS hibrido** decidido em ADR-006: pecas HBR vivem como Markdown versionado com frontmatter pydantic de 18+ campos, validadas em CI pelo Voice Guard (planejado em `ci-voice-guard.yml`), com publicacao gateada por score >= 70.

A relacao do `geo-ipog` com os tres repositorios secundarios obedece a um padrao de dependencia documentado:

```
                       Conselho IPOG  <-- board reports trimestrais
                              |
                              v
                    Ronan + Bruno + Alexandre  <-- KPI Dashboard semanal
                              |
            +-----------------+-----------------+
            |                                     |
   geo-dashboard (Next.js)              geo-platform (Python)
   visualiza 8 KPIs                     5 modulos:
   Cloudflare Pages                      - Collector
            |                            - NAIA Audit Engine
            |  REST/OpenAPI 3.1          - Voice Guard Service
            +------------------------>   - Schema/llms.txt Manager
                                         - Reporting Service
                                                |
                                       +--------+--------+
                                       v                 v
                                   D1 quente         R2 frio
                                       |                 |
                                       +---- DuckDB analitico
                                                |
                                  +-------------+-------------+
                                  |                           |
                          geo-ipog-website                geo-ipog
                          JSON-LD + llms.txt              Markdown + pecas HBR +
                          PR para TI IPOG                 ADRs + governanca +
                                  |                       prompts + runbooks
                                  v
                              ipog.edu.br
```

Conforme `docs/tech-stack/00-tech-roadmap-2026.md` Secao 3.2 (9 containers C4 Level 2), apenas dois dos nove containers tem `geo-ipog` como repositorio anfitriao: **B.6 Editorial CMS (hibrido)** que e o pipeline editorial das 7 pecas HBR previstas para Fase 2, e **B.9 Identity & Secrets** parcialmente (porcao GitHub Secrets do programa, que e configurada a nivel de repositorio). Os outros sete containers vivem em `geo-platform`, `geo-dashboard` ou `geo-ipog-website`. Mas o `geo-ipog` continua sendo o **repositorio raiz de governanca** que documenta todos os nove containers e ancora os 22 workflows previstos no roadmap v2.2 (`brasilgeo.ai/ipoggeoroadmap`), dos quais 6 ja estao operacionais aqui e 16 serao distribuidos entre os tres repositorios secundarios.

A consequencia arquitetural e direta: enquanto os tres repositorios secundarios nao forem provisionados (D-CONS-01 pendente), todo workflow novo (ex.: `ci-voice-guard.yml`, `cron-collect-daily.yml`, `cron-naia-competitors.yml`) precisa ter um plano explicito de migracao para o repositorio destino correto. Caso contrario, ha risco de acoplamento estrutural entre governanca (`geo-ipog`) e plataforma (`geo-platform`), o que violaria ADR-004 (multi-repo com separacao clara de dominio). Este plano de governanca, portanto, tem horizonte de 6 a 8 semanas — apos provisionamento dos repos secundarios, varias acoes aqui serao replicadas em cada um.

A dependencia operacional entre `geo-ipog` e a propriedade web `ipog.edu.br` se faz via `geo-ipog-website`: snippets JSON-LD e `llms.txt` parametrizados sao gerados no `geo-platform`, validados em CI no `geo-ipog-website`, abertos como PR para TI IPOG aplicar em `ipog.edu.br`, e a **decisao editorial** (texto, slug, naming canonico) sobre cada PR e gateada por `geo-ipog` via Voice Guard. Quem versiona a regra editorial, gere o repositorio raiz. Quem aplica o codigo em producao, gere o repositorio website. A separacao e disciplinada.

---

## Secao 3 — Submenu **Code**

### 3.1 Estado atual

O repositorio `geo-ipog` tem **188 arquivos** versionados, **22 commits** em um unico contribuidor (Alexandre Caramaschi como `alexandrebrt14-sys`), **branch unica `main`**, **1.742 KB** de payload, privacidade ativa, **sem licenca declarada** (`license: null`), **sem arquivo CODEOWNERS**, **sem required signatures GPG** habilitado, e estrutura logica em 9 diretorios raiz (`audits/`, `content/`, `dashboards/`, `data/`, `docs/`, `prompts/`, `scripts/`, mais `README.md`, `ROADMAP.md`, `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`). O `.github/` contem `PULL_REQUEST_TEMPLATE.md` em producao mais 6 workflows ativos e a configuracao do Dependabot. O `.gitignore` cobre `.env`, `data/private/`, `data/raw/` e padrões basicos de Python e Node. Os commits seguem majoritariamente Conventional Commits (validado em amostra de 22 commits recentes — `feat:`, `docs:`, `chore:`, `audit:`).

### 3.2 Requisitos funcionais

O codigo do `geo-ipog` deve atender quatro requisitos funcionais primarios. **Primeiro**, ser fonte de verdade canonica versionada de todos os artefatos de governanca: ADRs, prompts, dossies, pecas HBR, KPIs, FinOps, risk register. Cada artefato deve ter trilha de commit auditavel para o Conselho IPOG, com diff temporal explicito (principio canonico declarado em `docs/tech-stack/00-tech-roadmap-2026.md` Frase 3). **Segundo**, suportar branching estrategico para waves paralelas de execucao: branches `feat/*`, `audit/*`, `content/*`, `schema/*`, `prompts/*`, `fix/*`, `ci/*`, `chore/*` ja documentados em `CONTRIBUTING.md`. **Terceiro**, garantir que nenhum merge em `main` ocorra sem o Quality gate verde (existente) e, futuramente, sem o Voice Guard verde para pecas HBR (planejado `ci-voice-guard.yml`). **Quarto**, ser executavel em qualquer maquina via clone + `bash scripts/install-deps.sh` (futuro) sem dependencia de secrets locais — todos os secrets vivem em GitHub Secrets ou em vaults locais explicitos.

### 3.3 Requisitos nao-funcionais

Branch protection canonica em `main` com required pull request reviews, required status checks (Quality gate), linear history obrigatoria, force push e deletion proibidos, conversation resolution obrigatoria antes do merge. GPG signing obrigatorio para commits do Alexandre — feature crucial para auditoria do Conselho IPOG dado que o repositorio tem 1 unico contribuidor humano. Normalizacao LF via `.gitattributes` (atualmente ausente — risco em ambiente Windows + WSL). `.gitignore` revisado para incluir explicitamente `*.local.json`, `.vercel/`, `.next/`, `__pycache__/`, `node_modules/`, e arquivos `*.draft.md` enquanto nao validados pelo Voice Guard.

### 3.4 Engenharia de software

A organizacao logica em 9 diretorios raiz e coerente com a separacao de dominios do programa: `audits/` para artefatos de auditoria (NAIA, benchmarking das 5 Ondas), `content/` para pecas HBR e copy publicada, `data/` para dados (com `private/` e `raw/` em `.gitignore`), `dashboards/` para KPIs e FinOps, `docs/` para governanca textual, `prompts/` para o kit canonico de 75 prompts, `scripts/` para automacao operacional. Esta organizacao deve ser refletida em **CODEOWNERS** com responsabilizacao explicita: `audits/` → @alexandrebrt14-sys; `content/` → @alexandrebrt14-sys + Bruno (quando IPOG criar conta GitHub); `data/` → @alexandrebrt14-sys; `dashboards/` → @alexandrebrt14-sys; `docs/board-report/` → @alexandrebrt14-sys + Ronan (decisao Conselho); `prompts/` → @alexandrebrt14-sys; `scripts/` → @alexandrebrt14-sys; `.github/` → @alexandrebrt14-sys.

O padrao Conventional Commits ja documentado em `CONTRIBUTING.md` deve ser **gateado em CI** via commitlint ou hook server-side, nao apenas convencao manual. Squash merge deve ser padrao para reduzir noise no historico. Tags semver para releases de prompts (`prompts-v1.0`, `prompts-v1.1`) e de dossies (`benchmarking-onda-2-final`).

### 3.5 Arquitetura de sistemas

O Git como fonte canonica e principio nao-negociavel do programa, declarado em `docs/tech-stack/00-tech-roadmap-2026.md` Frase 3. O GitHub Actions cron e a redundancia primaria (ADR-007 do dossie 01-solution-architecture). Cloudflare Workers cron, quando provisionado em `geo-platform`, e a segunda camada de redundancia. A trilha de auditoria temporal exigida pelo Conselho IPOG e satisfeita pelos commits assinados + tags semver + diff explicito por arquivo.

### 3.6 Gaps e acoes recomendadas

| # | Acao | Prioridade | Owner | Prazo |
|---|---|---|---|---|
| 3-A1 | Configurar branch protection canonica em `main` (required reviews=1, dismiss stale, required status checks=Quality gate, linear history, no force push, no deletion, conversation resolution obrigatoria) | P0 | Alexandre | 15-05-2026 |
| 3-A2 | Criar arquivo `.github/CODEOWNERS` com mapeamento por path | P1 | Alexandre | 20-05-2026 |
| 3-A3 | Criar arquivo `.gitattributes` com LF normalization para `*.md`, `*.py`, `*.ts`, `*.json`, `*.yml` | P2 | Alexandre | 25-05-2026 |
| 3-A4 | Ativar required signatures GPG em `main` | P1 | Alexandre | 25-05-2026 |
| 3-A5 | Adicionar LICENSE (decidir com Ronan: CC-BY-NC-SA 4.0 vs All Rights Reserved proprietario) | P2 | Ronan + Alexandre | 30-05-2026 |
| 3-A6 | Documentar Branch Strategy detalhada em `CONTRIBUTING.md` (prefixos + matriz de quem pode mergear o que) | P1 | Alexandre | 22-05-2026 |
| 3-A7 | Configurar commitlint via Husky pre-commit + GitHub Action server-side | P2 | Alexandre | 05-06-2026 |
| 3-A8 | Revisar `.gitignore` (adicionar `*.local.json`, `.vercel/`, `*.draft.md`) | P2 | Alexandre | 28-05-2026 |

---

## Secao 4 — Submenu **Issues (49 abertas)**

### 4.1 Estado atual

O repositorio tem **49 issues abertas e 15 fechadas** (64 criadas no total ate 2026-05-11), **30 labels canonicos** em uso operacional, templates implicitos para bug/gap NAIA/decisao/peca HBR (mas sem arquivos `.github/ISSUE_TEMPLATE/*.yml`), uso ativo de **epic** (issue de alta granularidade que agrega filhas) e **issue de subtarefa**, com cobertura por **fase** (`fase:1`, `fase:2`, `fase:3`, `fase:4`), **horizonte** (`horizonte:now`, `horizonte:next`, `horizonte:later`), **cluster** (clinica, organizacional, educacional, ciencias-do-comportamento), **persona** (candidato, aluno, docente, conselho), **vetor** (mention-rate, schema, voice, finops, naia) e **prioridade** (`priority:p0`, `priority:p1`, `priority:p2`, `priority:p3`). O auto-labeler ja esta ativo via workflow `labeler.yml` e o gerenciamento de stale ocorre via `stale.yml` (60 dias).

### 4.2 Requisitos funcionais

Issues sao o **ponto de entrada operacional** do programa. Cada peca HBR planejada para Fase 2 (7 pecas conforme `docs/03-reunioes-e-cadencia-ipog.md`), cada dossie de benchmarking das 5 Ondas, cada decisao executiva pedida ao Conselho IPOG (8 decisoes consolidadas em `docs/tech-stack/00-tech-roadmap-2026.md`), cada item do roadmap v2.2 publicado em `brasilgeo.ai/ipoggeoroadmap`, e cada gap NAIA P0/P1 detectado pelo NAIA Audit Engine (futuro) **deve ter espelho em issue tracking** com label apropriada. Cada PR deve linkar a issue correspondente via `Closes #N` ou `Relates to #N` para que o KPI 6 (Velocidade de Fechamento) seja calculavel via gh CLI.

### 4.3 Requisitos nao-funcionais

SLA de fechamento canonico: **P0 <= 5 dias uteis**, **P1 <= 15 dias uteis**, **P2 <= 60 dias**, **P3 sem SLA** (mantido em backlog). Auto-labeler ja ativo. Stale issues marcadas apos 60 dias sem atividade. Issues com label `priority:p0` ou `priority:p1` **nao podem entrar em stale** (regra a implementar no `stale.yml`). Cobertura de templates obrigatoria para 4 tipos: bug operacional, gap NAIA, decisao executiva, peca HBR.

### 4.4 Engenharia de software

Quatro templates canonicos em `.github/ISSUE_TEMPLATE/`:

- **`bug.yml`** — bug operacional ou inconsistencia em artefato (campos: descricao, esperado, observado, repro, arquivos afetados, severidade SEV1/SEV2/SEV3, link para incidente).
- **`gap-naia.yml`** — gap detectado pelo NAIA Audit Engine ou auditoria manual (campos: codigo NAIA-XXX, descricao do check, evidencia coletada, URL alvo, severidade P0/P1/P2/P3, KPIs impactados, owner sugerido).
- **`decisao-executiva.yml`** — decisao que requer escalada ao Bruno ou Ronan (campos: contexto, opcoes A/B/C, recomendacao do executor, impacto se nao decidida, prazo, owner-decisor).
- **`peca-hbr.yml`** — peca editorial HBR planejada (campos: titulo, cluster, persona, tese contraintuitiva, abertura impacto, evidencia, mecanismo, decisao pessoal, proximo passo, slug, deadline, owner-editor).

Usar checkbox em corpo da issue (`- [ ] subtarefa`) para subtarefas. Usar GitHub Projects v2 (#6) como visao de board.

### 4.5 Arquitetura de sistemas

O KPI 6 (Velocidade de Fechamento de Gaps P0/P1) e leitura direta do Issues via `gh issue list --label priority:p0 --state closed --json closedAt,createdAt`. Cada item do roadmap v2.2 (publico em `brasilgeo.ai/ipoggeoroadmap`) deve ter espelho em issue para que o dashboard publico e o board interno estejam sincronizados. Issues com label `compliance:mec` ou `compliance:cfp` (conforme `CONTRIBUTING.md` Secao Compliance) requerem aprovacao explicita registrada na issue.

### 4.6 Gaps e acoes recomendadas

| # | Acao | Prioridade | Owner | Prazo |
|---|---|---|---|---|
| 4-A1 | Criar 4 templates canonicos em `.github/ISSUE_TEMPLATE/` (`bug.yml`, `gap-naia.yml`, `decisao-executiva.yml`, `peca-hbr.yml`) | P1 | Alexandre | 22-05-2026 |
| 4-A2 | Auditar coverage: garantir 1 issue por peca HBR Fase 2 (meta 7), 1 issue por dossie de benchmarking, 1 issue por decisao executiva pendente (meta 8) | P1 | Alexandre | 28-05-2026 |
| 4-A3 | Linkar PRs aos epics correspondentes via `Closes #N` retroativamente (5 dependabot PRs + #37) | P2 | Alexandre | 30-05-2026 |
| 4-A4 | Ajustar `stale.yml` para nao marcar issues `priority:p0` ou `priority:p1` como stale | P1 | Alexandre | 25-05-2026 |
| 4-A5 | Documentar SLA de fechamento por prioridade em `CONTRIBUTING.md` | P2 | Alexandre | 30-05-2026 |
| 4-A6 | Criar issue de tracking para roadmap v2.2 publico (`brasilgeo.ai/ipoggeoroadmap`) com link bidirecional | P1 | Alexandre | 25-05-2026 |
| 4-A7 | Resolver issue duplicada potencial #71 vs item do roadmap v2.2 (auditar e consolidar) | P2 | Alexandre | 05-06-2026 |

---

## Secao 5 — Submenu **Pull Requests (6 abertos)**

### 5.1 Estado atual

Seis PRs abertos no momento desta auditoria. **Cinco sao Dependabot** com bumps de actions: `actions/checkout`, `actions/labeler`, `DavidAnson/markdownlint-cli2-action`, `peter-evans/create-pull-request`, `actions/stale`. **Um e operacional** — PR #37 `chore/healthcheck-2026-05-10` que entrega health check do repositorio. Nao ha PRs com label `peca-hbr` ou `audit` em aberto. O template em `.github/PULL_REQUEST_TEMPLATE.md` ja esta em producao. Auto-labeler aplica labels com base em paths via `labeler.yml`.

### 5.2 Requisitos funcionais

Todo merge em `main` passa por PR + CI verde (Quality gate). Auto-labeler aplica label conforme path modificado. CODEOWNERS (quando criado) auto-solicita review. PRs de peca HBR disparam Voice Guard CI (planejado `ci-voice-guard.yml`) e bloqueiam merge se score < 70. PRs de Schema disparam validacao JSON-LD via AJV (planejado em `geo-ipog-website`). PRs de gap NAIA disparam re-execucao do check NAIA-XXX afetado.

### 5.3 Requisitos nao-funcionais

Quality gate verde como gate obrigatorio. Branch up-to-date com main antes do merge. Squash merge padrao para reduzir noise. Tempo medio de merge de PR menor que 48 horas para PRs de fluxo normal, menor que 5 dias uteis para PRs com label `priority:p0`. Dependabot PRs com auto-merge habilitado para minor e patch apos CI verde (a configurar).

### 5.4 Engenharia de software

PR template ja contem checklist canonico. Estender para incluir gates de qualidade especifica por tipo: para peca HBR, exigir score Voice Guard >= 70 anexado como comentario do PR; para Schema, exigir output do AJV validator; para audit, exigir snapshot NAIA antes/depois. Configurar `actions/dependabot/auto-merge` para PRs Dependabot de patch e minor sem mudanca de major. Habilitar auto-resolucao de conflitos triviais (somente Dependabot).

### 5.5 Arquitetura de sistemas

PR e a **unidade de governanca do quality gate de 5+1 camadas** descrito em `docs/framework/02-quality-gate-5-camadas.md` (camada 0 = linter Markdown; camada 1 = Voice Guard determinístico; camada 2 = Voice Guard LLM com Aggarwal; camada 3 = NAIA spot-check em link novo; camada 4 = revisao humana CODEOWNERS; camada 5 = revisao executiva Bruno antes do go-live em ipog.edu.br). Cada PR de peca HBR deve disparar `ci-voice-guard.yml` (planejado entre os 22 workflows do roadmap), com score postado como comment em linha. PRs em `geo-ipog-website` (quando criado) disparam `ci-validate-jsonld.yml`.

### 5.6 Gaps e acoes recomendadas

| # | Acao | Prioridade | Owner | Prazo |
|---|---|---|---|---|
| 5-A1 | Configurar branch protection `main` para require status checks pass (Quality gate, labeler) | P0 | Alexandre | 15-05-2026 (junto com 3-A1) |
| 5-A2 | Fechar 5 Dependabot PRs abertos (validar CI verde, merge sequencial com squash) | P1 | Alexandre | 18-05-2026 |
| 5-A3 | Fechar PR #37 healthcheck apos validacao do output | P1 | Alexandre | 18-05-2026 |
| 5-A4 | Configurar Dependabot auto-merge para minor/patch | P2 | Alexandre | 05-06-2026 |
| 5-A5 | Documentar politica de squash merge em `CONTRIBUTING.md` | P2 | Alexandre | 30-05-2026 |
| 5-A6 | Estender PR template com sub-templates por tipo (peca-hbr, audit, schema) | P2 | Alexandre | 15-06-2026 |

---

## Secao 6 — Submenu **Agents (feature novo GitHub)**

### 6.1 Estado atual

GitHub Agents (Copilot Workspace e Code Agents) e feature recente do GitHub (lancada entre 2025 e 2026 em GA progressivo). Estado em `alexandrebrt14-sys/geo-ipog` a confirmar via Browser MCP em `github.com/alexandrebrt14-sys/geo-ipog/settings/copilot` — provavelmente **desabilitado por padrao** em repositorios privados sem assinatura Copilot Business ou Copilot Enterprise. Nenhuma referencia a Agents nos workflows ou settings auditados.

### 6.2 Requisitos funcionais

Se habilitado, Agents poderiam auxiliar Alexandre em tarefas auxiliares: rascunho de documentos derivados (relatorios semanais a partir de issues fechadas), geracao de testes para scripts em `scripts/`, refactor de notebooks de auditoria. **Nao podem** ser usados para escrever pecas HBR (voz Alexandre exige sub-agents Opus da Brasil GEO, conforme principio canonico em `~/.claude/CLAUDE.md`), nem para gerar Schema JSON-LD (templates parametrizados em `geo-platform`).

### 6.3 Requisitos nao-funcionais

Isolamento de credenciais: Agents nao acessam GitHub Secrets nem Cloudflare Workers Secrets do programa. Audit trail completo de todas as acoes do Agent. Custo previsivel: free tier ou cota fixa. Permissoes de write em `main` **proibidas** — Agents podem abrir PR, nunca mergear.

### 6.4 Engenharia de software

Habilitacao progressiva: comecar somente com tarefas nao-criticas (rascunho de issues, geracao de documentacao auxiliar, refactor de scripts em `scripts/`). Definir lista explicita de **paths permitidos** (`scripts/`, `docs/_aux/`) e **paths proibidos** (`content/pecas-hbr/`, `prompts/`, `audits/`, `dashboards/`, `data/`, `docs/board-report/`, `.github/workflows/`).

### 6.5 Arquitetura de sistemas

Risco de **overlap funcional** com sub-agents Opus da Brasil GEO ja em uso operacional (memoria `feedback_sub_agents_over_orchestrator_copy_naia` em CLAUDE.md). Sub-agents Opus sao tunados para a voz Alexandre HBR e tem acesso ao Voice Guard local; Agents do GitHub nao tem este contexto. Decisao canonica: Agents do GitHub sao instrumento auxiliar para tarefas operacionais, **nao substituem** sub-agents Opus para qualquer tarefa editorial ou estrategica do programa.

### 6.6 Gaps e acoes recomendadas

| # | Acao | Prioridade | Owner | Prazo |
|---|---|---|---|---|
| 6-A1 | Auditar configuracao atual de Agents no repo via Browser MCP (`github.com/alexandrebrt14-sys/geo-ipog/settings`) | P2 | Alexandre | 05-06-2026 |
| 6-A2 | Decidir se habilita Agents para tarefas auxiliares — decisao executiva com Ronan + Alexandre (custo de Copilot Business: USD 19/usuario/mes) | P2 | Ronan + Alexandre | 30-06-2026 |
| 6-A3 | Documentar politica de uso de Agents em `CONTRIBUTING.md` se habilitado: paths permitidos, paths proibidos, principio de nao-substituicao de sub-agents Opus | P3 | Alexandre | 15-07-2026 |

---

## Secao 7 — Submenu **Discussions (vazio)**

### 7.1 Estado atual

Discussions habilitado mas com **zero threads**. Recurso operacional desde criacao do repo mas nao adotado. Nenhuma categoria canonica criada. Nenhuma thread-seed.

### 7.2 Requisitos funcionais

Canal **assincrono** para topicos sem prazo critico, complementar a Issues (que e operacional). Espaco para perguntas estrategicas de Bruno, Ronan e futuros membros do Conselho IPOG sem poluir a fila de Issues operacional. Espaco para apresentar drafts de pecas HBR antes de virarem issue + PR. Espaco para FAQ do programa que nao cabe em README.

### 7.3 Requisitos nao-funcionais

Moderacao por Alexandre. Notificacoes configuradas para Bruno e Ronan (quando criarem conta IPOG no GitHub). Arquivamento de threads resolvidas apos 90 dias de inatividade. Nenhuma thread publica antes da aprovacao do Conselho IPOG (repo e privado, entao essa preocupacao e residual mas vale documentar).

### 7.4 Engenharia de software

Quatro a cinco categorias canonicas:

- **Estrategia** — discussao de roadmap, ondas, marcos, decisoes pre-formalizacao.
- **Q&A** — perguntas operacionais que viram FAQ.
- **Ideias** — propostas em fase de exploracao antes de virar issue.
- **Anuncios** — comunicados do programa (release de Onda concluida, publicacao de peca HBR, lancamento de workflow).
- **Retros** — retrospectivas trimestrais pos-Conselho IPOG.

Pinned threads para FAQ + Onboarding + Glossario do programa.

### 7.5 Arquitetura de sistemas

Discussions e camada **complementar** a Issues e a Wiki. Tres superficies textuais com responsabilidades distintas: **Issues** = operacional (com SLA e prazo); **Discussions** = estrategico assincrono (sem SLA, descoberta); **Wiki** = referencia estavel (sem timestamp, leitura). A separacao previne o anti-padrao comum de transformar Issues em forum.

### 7.6 Gaps e acoes recomendadas

| # | Acao | Prioridade | Owner | Prazo |
|---|---|---|---|---|
| 7-A1 | Criar 4-5 categorias canonicas (Estrategia, Q&A, Ideias, Anuncios, Retros) | P2 | Alexandre | 05-06-2026 |
| 7-A2 | Postar 3 threads-seed pinadas: Welcome (onboarding programa), FAQ programa, Roadmap v2.2 announcement com link a `brasilgeo.ai/ipoggeoroadmap` | P2 | Alexandre | 10-06-2026 |
| 7-A3 | Linkar Discussions com checkpoints executivos mensais via comentario manual em thread Anuncios apos cada reuniao | P3 | Alexandre | continuo |

---

## Secao 8 — Submenu **Actions**

### 8.1 Estado atual

**Seis workflows ativos**, **100% de sucesso** nos 10 runs mais recentes, **tempo medio de 1 minuto por run**, todos dentro do free tier GitHub Actions (3.000 minutos/mes para repo privado em plano Team).

Workflows operacionais:

1. **Audit Snapshot Quinzenal** (`concorrentes-monitoring.yml`) — re-fetch quinzenal dos 21 concorrentes mapeados nas Ondas 1-5 para detectar publicacao de `llms.txt` ou Schema novo. Mitiga risco R-002 (`docs/05-risk-register.md`).
2. **Auto-Labeler PRs** (`labeler.yml`) — aplica labels por path modificado.
3. **Quality gate** (`quality.yml`) — Markdown lint + checks de naming canonico + Voice Guard determinístico (camada 1 do quality gate de 5+1 camadas).
4. **Construtor Relatorio Semanal** (`report-builder.yml`) — assembla relatorio semanal a partir de issues fechadas + commits da semana + PRs mergeados; output em `docs/relatorios-semanais/SEMANA-YYYY-WXX.md`.
5. **Stale Issues e PRs** (`stale.yml`) — marca stale apos 60 dias e fecha apos 90 (regras a revisar para isentar P0/P1).
6. **Dependabot Updates** (`dependabot.yml`) — bumps semanais de actions e pacotes Python.

### 8.2 Requisitos funcionais

Quality gate em todo PR. Auto-labeler em todo PR. Stale management mensal. Snapshot quinzenal dos 21 concorrentes Onda 1-5. Construcao mensal de relatorios semanais a partir de `docs/relatorios-semanais/`. **Falta:** Voice Guard CI (camadas 2 e 3 do quality gate) em PRs com path `content/pecas-hbr/`, JSON-LD validator em PRs com path `audits/schema/` ou (futuro) `geo-ipog-website`, NAIA spot-check em link novo, recalculo dos 8 KPIs canonicos semanal.

### 8.3 Requisitos nao-funcionais

SLO de disponibilidade dos workflows >= 99% mes-a-mes. Tempo medio <= 2 minutos por run. Custo dentro do free tier GitHub Team (3.000 minutos/mes). Consumo previsto consolidado **2.536 minutos/mes** apos `geo-platform` provisionado (conforme `docs/tech-stack/07-observability-cicd.md` Bloco H), restando margem de 15%. Cron schedules em UTC com offset BRT documentado em comentario do workflow.

### 8.4 Engenharia de software

Naming canonico de workflow: `display_name` em PT-BR (visivel na aba Actions) com `slug` ASCII (nome do arquivo). Matrix builds onde aplicavel (ex.: validar Schema em multiplos slugs em paralelo). **Concurrency groups** para evitar race condition em workflows que escrevem em `data/` (ex.: snapshot quinzenal nao pode rodar concorrente com manual trigger). Cron schedules sempre em UTC com comentario `# BRT = UTC - 3h, executa 06:00 BRT` para clareza. Workflows novos devem incluir `permissions:` explicito (principio de least privilege).

### 8.5 Arquitetura de sistemas

Os 6 workflows ativos cobrem **27% dos 22 workflows planejados** no roadmap consolidado em `docs/tech-stack/00-tech-roadmap-2026.md` Secao 4 e detalhados em `docs/tech-stack/07-observability-cicd.md` Bloco H. Os outros 16 workflows serao distribuidos entre `geo-platform` (9), `geo-dashboard` (4), `geo-ipog-website` (3) apos D-CONS-01 (provisionamento dos repos secundarios). Workflows criticos pendentes que **devem ficar em `geo-ipog`** (pois operam sobre conteudo deste repo):

- **`ci-voice-guard.yml`** — camadas 2 e 3 do quality gate para pecas HBR.
- **`ci-editorial.yml`** — pipeline editorial completo das pecas HBR (lint + Voice Guard + frontmatter pydantic + checagem de naming canonico).
- **`cron-pos-publish-d14.yml`** — coleta de metricas D+14 apos publicacao de peca HBR para alimentar KPI 7 (lift de mention rate por peca).

### 8.6 Gaps e acoes recomendadas

| # | Acao | Prioridade | Owner | Prazo |
|---|---|---|---|---|
| 8-A1 | Documentar cada um dos 6 workflows ativos em `docs/tech-stack/07-observability-cicd.md` Bloco H secao "Workflows ja em producao em `geo-ipog`" (descricao, schedule, output, donos do alerta) | P2 | Alexandre | 30-05-2026 |
| 8-A2 | Criar `ci-voice-guard.yml` (camadas 2 e 3 do quality gate) para gatear merges em `content/pecas-hbr/` — exigencia da Fase 2 pre-publicacao Peca 1 HBR (M08 02-06-2026) | P1 | Alexandre | 28-05-2026 |
| 8-A3 | Investigar issue #42 (Construtor de Relatorio Semanal — comportamento a validar) | P1 | Alexandre | 25-05-2026 |
| 8-A4 | Criar `ci-editorial.yml` para validar frontmatter pydantic 18+ campos em `content/pecas-hbr/` | P1 | Alexandre | 05-06-2026 |
| 8-A5 | Atualizar todos os 6 workflows com `permissions:` explicito (least privilege) | P2 | Alexandre | 10-06-2026 |
| 8-A6 | Adicionar `concurrency:` aos workflows que escrevem em `data/` | P2 | Alexandre | 15-06-2026 |
| 8-A7 | Planejar migracao de `ci-voice-guard.yml` para `geo-platform` quando o repo for provisionado (manter copia espelho enquanto pecas HBR vivem em `geo-ipog`) | P3 | Alexandre | 30-06-2026 |

---

## Secao 9 — Submenu **Projects v2**

### 9.1 Estado atual

Project linkado: **"GEO IPOG — Programa Operacional" #6**. Projeto orfao identificado: **#5** (possivel duplicacao ou rascunho descartado). **Outros 6 projects** existem no owner `alexandrebrt14-sys` mas nao estao linkados a `geo-ipog`. **Treze milestones criados** cobrindo Fase 1 a Fase 4 + M1 a M8 + Operacao continua.

### 9.2 Requisitos funcionais

Visao de board do programa cruzando issue × milestone × workstream × persona × prioridade. Dashboard executivo de cadencia semanal alimentando relatorios em `docs/relatorios-semanais/`. Atualizacao automatica via workflow apos cada PR mergeado e cada issue fechada. Tres views por persona: **Bruno** (itens da semana, peca-hbr e Schema), **Ronan** (itens criticos, decisoes-executivas e escaladas), **Alexandre** (full board, todas as fontes).

### 9.3 Requisitos nao-funcionais

Sincronia entre Project v2 #6 e roadmap publico em `brasilgeo.ai/ipoggeoroadmap`. Latencia de atualizacao do board <= 5 minutos apos evento. Persistencia ate fim do programa (2027.1 no minimo). Backup mensal via export GraphQL API.

### 9.4 Engenharia de software

Fields canonicos no Project v2 #6:

- **`cluster`** (single-select): clinica, organizacional, educacional, ciencias-do-comportamento, geral.
- **`persona`** (single-select): candidato, aluno, docente, conselho.
- **`sprint`** (iteration): sprint atual + 2 sprints futuras.
- **`owner`** (single-select): Alexandre, Bruno, Ronan, TI-IPOG, Pendente.
- **`prioridade`** (single-select): P0, P1, P2, P3.
- **`horizonte`** (single-select): now, next, later.
- **`vetor`** (multi-select): mention-rate, schema, voice, finops, naia, editorial, infraestrutura.
- **`fase`** (single-select): fase-1, fase-2, fase-3, fase-4, operacao-continua.
- **`status`** (single-select): Backlog, Now, Doing, Review, Done, Blocked.

Automacao via workflow: issue criada com label `priority:p0` entra automaticamente em coluna **Now**; issue fechada move para **Done**; PR mergeado com `Closes #N` move issue N para **Done**.

### 9.5 Arquitetura de sistemas

Project v2 #6 **espelha** o roadmap v2.2 publico em `brasilgeo.ai/ipoggeoroadmap`. O dashboard publico e a apresentacao para Bruno e Ronan; o Project v2 e o back-office operacional. **KPI 6** (Velocidade de Fechamento de Gaps P0/P1) e calculo direto a partir do Project v2 + Issues. O Project v2 nao substitui Issues — ele os organiza visualmente.

### 9.6 Gaps e acoes recomendadas

| # | Acao | Prioridade | Owner | Prazo |
|---|---|---|---|---|
| 9-A1 | Arquivar Project v2 #5 orfao (apos validacao de que nao contem itens unicos) | P1 | Alexandre | 25-05-2026 |
| 9-A2 | Documentar os 9 fields canonicos do Project v2 #6 em `docs/engineering/PROJECT-V2-CANONICO.md` (a criar) | P1 | Alexandre | 30-05-2026 |
| 9-A3 | Criar 3 views por persona Bruno/Ronan/Alexandre com filtros pre-configurados | P2 | Alexandre | 05-06-2026 |
| 9-A4 | Implementar automacao de movimentacao por label via workflow `projects-automation.yml` | P2 | Alexandre | 15-06-2026 |
| 9-A5 | Configurar backup mensal do Project v2 via workflow `cron-project-backup.yml` (GraphQL export para `data/private/project-backups/`) | P2 | Alexandre | 30-06-2026 |

---

## Secao 10 — Submenu **Wiki**

### 10.1 Estado atual

Wiki habilitado (`has_wiki: true`) mas **conteudo a confirmar via Browser MCP** em `github.com/alexandrebrt14-sys/geo-ipog/wiki`. Hipotese de trabalho: Wiki esta vazio ou tem apenas a pagina default "Home" gerada na criacao do repo. Wiki nao e versionado pelo Git principal do repo (e um repo separado por design do GitHub).

### 10.2 Requisitos funcionais

Onboarding publico-interno: glossario do programa, abreviacoes (GEO, NAIA, CFP, CRP, MEC, KPI, ADR, DR, RTO, RPO), runbook operacional acessivel sem clonar o repo, links rapidos para os documentos canonicos. **Nao duplicar** conteudo do `docs/` que tem versionamento via Git e que e a fonte de verdade canonica.

### 10.3 Requisitos nao-funcionais

Atualizacao semanal alinhada ao relatorio semanal. Linked tabelas de Issues e Project v2. ToC navegavel. Sem versionamento profundo — Wiki e leitura, nao fonte canonica.

### 10.4 Engenharia de software

Wiki como **vitrine** de onboarding e referencia rapida; `docs/` como fonte canonica versionada; `brasilgeo.ai/ipoggeoroadmap` como dashboard executivo confidencial publico-restrito. Tres superficies, tres responsabilidades distintas. Evitar drift entre Wiki e `docs/` — sincronizacao opcional via workflow (`wiki-sync.yml` se decidido) ou manual semanal.

### 10.5 Arquitetura de sistemas

Tres opcoes em decisao:

- **Opcao A — Ativar como onboarding** (recomendada): paginas curadas (Glossario, Onboarding para Bruno, Onboarding para Ronan, FAQ do programa, links para documentos canonicos). Atualizacao manual semanal.
- **Opcao B — Desabilitar e remover** do menu do repo: simplifica governanca, evita drift. Risco: perde-se canal de onboarding rapido.
- **Opcao C — Espelhar `docs/` automaticamente** via workflow: maxima sincronia, mas dobra superficies de manutencao e quebra a separacao "Wiki=vitrine, docs=fonte".

Decisao canonica recomendada: **Opcao A**, com escopo limitado a 5 paginas iniciais (Glossario, Onboarding-Bruno, Onboarding-Ronan, FAQ, Links Canonicos).

### 10.6 Gaps e acoes recomendadas

| # | Acao | Prioridade | Owner | Prazo |
|---|---|---|---|---|
| 10-A1 | Validar via Browser MCP o estado atual do Wiki (`github.com/alexandrebrt14-sys/geo-ipog/wiki`) | P2 | Alexandre | 25-05-2026 |
| 10-A2 | Decidir entre Opcao A, B, C (recomendacao A) — decisao de Alexandre + Ronan | P2 | Alexandre + Ronan | 30-05-2026 |
| 10-A3 | Se Opcao A: criar 5 paginas iniciais (Glossario, Onboarding-Bruno, Onboarding-Ronan, FAQ, Links Canonicos) | P2 | Alexandre | 15-06-2026 |
| 10-A4 | Documentar politica de Wiki em `CONTRIBUTING.md` ("Wiki = vitrine; docs/ = fonte canonica; sem drift") | P2 | Alexandre | 30-06-2026 |

---

## Secao 11 — Submenu **Security and quality**

### 11.1 Estado atual

**Zero dependabot alerts** atualmente — sinal positivo de dependencias saudaveis. **Code scanning DESABILITADO** (HTTP 403 em resposta a `gh api repos/.../code-scanning/alerts`). **Secret scanning nao confirmado** via API (resposta vazia). **Sem secrets canonicos visiveis** no listing (`gh secret list` retornou vazio). **Branch protection main minimal**: `enforce_admins=false`, `required_signatures=false`, `required_linear_history=false`, `allow_force_pushes=false` (bom), `allow_deletions=false` (bom), `required_conversation_resolution=false`, `lock_branch=false`. **SECURITY.md ja em producao** com politica de relato privado a `alexandre@brasilgeo.ai`.

### 11.2 Requisitos funcionais

Scanning automatico de secrets antes de push. Dependabot atualiza minor e patch automaticamente, escalando major como issue. Code scanning para Python (quando `geo-platform` for criado) e TypeScript (quando `geo-dashboard` for criado), aqui em `geo-ipog` cobertura para arquivos JSON, YAML e Markdown e marginal mas habilita politica unificada de seguranca. **Vault humano** (1Password Teams compartilhado, conforme D-CONS-06 do Conselho) + **Cloudflare Workers Secrets** (runtime production) + **GitHub Secrets** (CI runtime). Inventario de **16 secrets canonicos** previsto em `docs/tech-stack/07-observability-cicd.md` Bloco I: 6 chaves LLM (OpenAI, Anthropic, Google, Perplexity, xAI, Microsoft Azure), Cloudflare API token, Axiom Ingest token, Sentry DSN, GA4 service account, GitHub PAT do bot NAIA, Resend API key, 1Password recovery key, deploy key TI IPOG, mais 2 reservas.

### 11.3 Requisitos nao-funcionais

**Zero secrets vazados** em historia do repo (validar via `gitleaks --log-opts="--all"` em scan inicial). **Rotacao trimestral** de chaves LLM (6 chaves: jan/abr/jul/out 2026). **Rotacao anual** de GitHub PAT (mar 2026 -> mar 2027). **Rotacao semestral** de Cloudflare API token (jan e jul 2026). **GPG sign required** em commits de Alexandre (decisao P1 ja listada em Secao 3). **Required status checks** obrigatorios em PR antes de merge.

### 11.4 Engenharia de software

`SECURITY.md` ja existe com politica de relato. **CODEOWNERS** (acao 3-A2) obriga review por path. **Pre-commit hook** com `gitleaks` ou `detect-secrets` local antes de qualquer push (configurar via `.pre-commit-config.yaml`). **GitHub Advanced Security features gratuitos** em repo privado: code scanning (CodeQL), secret scanning (Push protection + secret detection automatico), Dependabot alerts (ja ativo). Habilitar push protection bloqueia commit com secret detectado antes mesmo de chegar ao servidor.

### 11.5 Arquitetura de sistemas

Inventario consolidado dos 16 secrets em `geo-ipog` reflete o que precisa ficar em GitHub Secrets vs Cloudflare Workers Secrets vs 1Password Teams (vault humano). Em `geo-ipog`, o subset relevante de GitHub Secrets e: GitHub PAT do bot (para auto-labeler escrever em paths `audits/`), Axiom Ingest token (para `report-builder.yml` emitir eventos), eventualmente Resend API key (para `report-builder.yml` enviar relatorio por email). LLM keys vivem em `geo-platform`, nao aqui. Cloudflare token e 1Password recovery key vivem em vaults externos. A separacao e disciplinada e reduz o blast radius de qualquer leak isolado.

### 11.6 Gaps e acoes recomendadas

| # | Acao | Prioridade | Owner | Prazo |
|---|---|---|---|---|
| 11-A1 | **Ativar code scanning** (CodeQL) — feature gratuita em repo privado, cobre Python + JavaScript + YAML | P0 | Alexandre | 15-05-2026 |
| 11-A2 | **Ativar secret scanning** com push protection — feature gratuita em repo privado, cobre 200+ tipos de secrets | P0 | Alexandre | 15-05-2026 |
| 11-A3 | Rodar `gitleaks --log-opts="--all"` em scan retroativo de toda historia do repo | P0 | Alexandre | 18-05-2026 |
| 11-A4 | Ativar required signatures GPG em `main` (consolidado com 3-A4) | P1 | Alexandre | 25-05-2026 |
| 11-A5 | Configurar required status checks: Quality gate + Labeler + (quando criados) Voice Guard + Editorial | P0 | Alexandre | 15-05-2026 |
| 11-A6 | Criar `docs/engineering/ADR-016-INVENTARIO-SECRETS.md` com os 16 secrets canonicos, vault, rotacao e owner | P1 | Alexandre | 30-05-2026 |
| 11-A7 | Configurar `gitleaks` pre-commit local via `.pre-commit-config.yaml` (incluir em `CONTRIBUTING.md`) | P2 | Alexandre | 10-06-2026 |
| 11-A8 | Documentar politica de rotacao de chaves em `docs/engineering/POLITICA-ROTACAO-CHAVES.md` (a criar) | P1 | Alexandre | 05-06-2026 |
| 11-A9 | Validar `SECURITY.md` atualizado com email correto e prazo de resposta vigente | P2 | Alexandre | 20-05-2026 |

---

## Secao 12 — Submenu **Insights**

### 12.1 Estado atual

**Traffic:** 56 views totais nos ultimos 14 dias, **1 unique visitor** (presumidamente Alexandre, via navegador autenticado). **Contributors:** 1 contribuidor unico (Alexandre `alexandrebrt14-sys`) com 22 contribuicoes. **Commits frequency:** ~1.5 commits/dia em media (22 commits em 15 dias). **Milestones:** 13 criados. **Code frequency e Dependency graph e Network graph** disponiveis mas nao auditados em detalhe.

### 12.2 Requisitos funcionais

Trilha de saude do repo para revisao mensal com Bruno. Contributors panel mostrando 1 contribuidor enquanto o programa esta no Alexandre solo (esperado ate provisionamento dos 3 repos secundarios). Dependency graph para visualizar pacotes e actions externos em uso. Network graph nao critico (sem forks publicos).

### 12.3 Requisitos nao-funcionais

Privacidade: repo privado, sem exposicao publica de metricas. Uso **interno** para revisao mensal Bruno + Alexandre + Ronan. Backup quinzenal das contagens via `gh api repos/.../traffic/views` para serie temporal historica.

### 12.4 Engenharia de software

Insights e leitura. **KPIs canonicos do programa** (8 + 3 derivados) sao extraidos via `gh CLI` ou GraphQL direto, nao via Insights nativo. O dashboard executivo publico-restrito em `brasilgeo.ai/ipoggeoroadmap` aba "11 KPIs" e a apresentacao canonica para Conselho IPOG. Insights serve para metricas **operacionais do repo** (saude de cadencia, velocidade de PR, burn-down de issues, dependencias atualizadas) — nao para KPIs de programa.

### 12.5 Arquitetura de sistemas

Insights e leitura native. **KPI 6** (Velocidade de Fechamento) e extraido via `gh issue list --state closed --json closedAt,createdAt,labels` + script Python em `scripts/calc-kpi6.py` (a criar). Quando `geo-dashboard` for provisionado, o calculo do KPI 6 migra para la, mas continua lendo Issues via GraphQL deste repo.

### 12.6 Gaps e acoes recomendadas

| # | Acao | Prioridade | Owner | Prazo |
|---|---|---|---|---|
| 12-A1 | Integrar Insights ao workflow `report-builder.yml` (Construtor Relatorio Semanal) — adicionar secao "Saude do repo" com contagem de commits, PRs mergeados, issues fechadas, contributors ativos | P2 | Alexandre | 15-06-2026 |
| 12-A2 | Revisar `dependency graph` mensalmente como parte do relatorio mensal Bruno + Alexandre | P2 | Alexandre + Bruno | 30-06-2026 |
| 12-A3 | Criar `scripts/calc-kpi6.py` para extracao via gh CLI do KPI 6 (velocidade de fechamento P0/P1) | P1 | Alexandre | 10-06-2026 |
| 12-A4 | Quando `geo-platform`/`geo-dashboard` forem provisionados, expandir contributors esperados para 2-3 (Alexandre + sub-agents Opus + eventualmente Bruno via PRs de revisao em pecas HBR) | P3 | Alexandre | 15-07-2026 |

---

## Secao 13 — Submenu **Settings**

### 13.1 Estado atual

Repo **privado**. Default branch **`main`**. **Sem licenca** declarada. Branch protection minimal (detalhado em Secao 11). **Sem template de issue confirmado** (arquivos `.github/ISSUE_TEMPLATE/*.yml` ausentes — templates implicitos via convencao). **Wiki habilitado** (mas vazio). **Discussions habilitado** (mas vazio). **Issues habilitado**. **Allow merge commits**, **allow squash merge**, **allow rebase merge** — todos os tres habilitados (recomendacao canonica: apenas squash merge).

### 13.2 Requisitos funcionais

Configuracao **imutavel e documentada como ADR**. Branch protection rules canonicas (compativeis com 3-A1, 5-A1, 11-A5). Webhooks documentados em `docs/engineering/WEBHOOKS-CANONICO.md` (a criar — atualmente sem webhooks externos visiveis). Integration apps catalogadas: Dependabot (ja ativo), GitHub Actions (ja ativo), provavelmente Slack ou Linear (a confirmar).

### 13.3 Requisitos nao-funcionais

Mudanca de settings **somente** por Alexandre (owner da conta `alexandrebrt14-sys`). Log de mudancas em `docs/engineering/CHANGELOG-SETTINGS.md` (a criar) com data, motivo, ADR de referencia. **Backup automatico** das settings via `gh api repos/.../` em workflow `cron-settings-backup.yml` mensal.

### 13.4 Engenharia de software

Settings canonicas devem ser reproduziveis via `gh CLI` em `scripts/repo-settings-baseline.sh` (a criar) — para que caso o repo precise ser recriado (cenario disaster recovery, raro) ou um novo repo secundario seja provisionado (cenario Fase 1: `geo-platform`, `geo-dashboard`, `geo-ipog-website`), as settings basicas sejam aplicadas em segundos. ADR canonico para documentar as decisoes: `docs/engineering/ADR-017-SETTINGS-CANONICAS-DO-REPO.md` (a criar).

### 13.5 Arquitetura de sistemas

Settings define o **contrato tecnico** do repo perante o programa. Privado vs publico e decisao executiva (atualmente confidencial, alinhado com programa confidencial Brasil GEO + IPOG conforme `SECURITY.md`). Default branch `main` e canonico. Merge strategies: squash merge unico (decisao canonica recomendada; reduz noise em historia). Auto-delete head branches apos merge (recomendado). Issues + Discussions + Wiki + Projects + Actions + Security and quality habilitados conforme funcao auditada nas Secoes 4 a 12.

### 13.6 Gaps e acoes recomendadas

| # | Acao | Prioridade | Owner | Prazo |
|---|---|---|---|---|
| 13-A1 | Configurar branch protection canonica em `main` (consolidado com 3-A1, 5-A1, 11-A5): required reviews=1, dismiss stale=true, required status checks=Quality gate+CodeQL+Voice Guard, required linear history=true, no force push, no deletion, conversation resolution=true, lock branch=false | P0 | Alexandre | 15-05-2026 |
| 13-A2 | Adicionar LICENSE (decidir entre CC-BY-NC-SA 4.0 vs All Rights Reserved proprietario — escalar a Ronan) | P2 | Ronan + Alexandre | 30-05-2026 |
| 13-A3 | Criar 4 issue templates como arquivos `.github/ISSUE_TEMPLATE/*.yml` (consolidado com 4-A1) | P1 | Alexandre | 22-05-2026 |
| 13-A4 | Configurar squash merge como unico merge strategy permitido (desabilitar merge commits e rebase merge) | P1 | Alexandre | 20-05-2026 |
| 13-A5 | Habilitar auto-delete head branches apos merge | P2 | Alexandre | 22-05-2026 |
| 13-A6 | Documentar settings canonicas como `docs/engineering/ADR-017-SETTINGS-CANONICAS-DO-REPO.md` | P1 | Alexandre | 05-06-2026 |
| 13-A7 | Criar `scripts/repo-settings-baseline.sh` para aplicar settings canonicas via gh CLI (reuso nos 3 repos secundarios futuros) | P2 | Alexandre | 15-06-2026 |
| 13-A8 | Backup mensal das settings via workflow `cron-settings-backup.yml` (output em `data/private/settings-backups/YYYY-MM.json`) | P2 | Alexandre | 30-06-2026 |

---

## Secao 14 — Plano de acao consolidado

### 14.1 Tabela executiva de todas as acoes (38 acoes catalogadas)

| ID | Acao | Submenu | Prioridade | Owner | Prazo | Issue alvo |
|---|---|---|---|---|---|---|
| 3-A1 | Configurar branch protection canonica em `main` | Code | P0 | Alexandre | 15-05-2026 | criar #NEW-A |
| 3-A2 | Criar `.github/CODEOWNERS` | Code | P1 | Alexandre | 20-05-2026 | criar #NEW-B |
| 3-A3 | Criar `.gitattributes` com LF normalization | Code | P2 | Alexandre | 25-05-2026 | criar #NEW-C |
| 3-A4 | Ativar required signatures GPG em `main` | Code | P1 | Alexandre | 25-05-2026 | criar #NEW-D |
| 3-A5 | Adicionar LICENSE (decisao Ronan) | Code | P2 | Ronan + Alexandre | 30-05-2026 | criar #NEW-E |
| 3-A6 | Documentar Branch Strategy em `CONTRIBUTING.md` | Code | P1 | Alexandre | 22-05-2026 | criar #NEW-F |
| 3-A7 | Configurar commitlint (Husky + GitHub Action) | Code | P2 | Alexandre | 05-06-2026 | criar #NEW-G |
| 3-A8 | Revisar `.gitignore` | Code | P2 | Alexandre | 28-05-2026 | criar #NEW-H |
| 4-A1 | Criar 4 templates canonicos `.github/ISSUE_TEMPLATE/` | Issues | P1 | Alexandre | 22-05-2026 | criar #NEW-I |
| 4-A2 | Auditar coverage (issue por peca HBR, dossie, decisao) | Issues | P1 | Alexandre | 28-05-2026 | criar #NEW-J |
| 4-A3 | Linkar PRs retroativamente aos epics via `Closes #N` | Issues | P2 | Alexandre | 30-05-2026 | criar #NEW-K |
| 4-A4 | Ajustar `stale.yml` para nao marcar P0/P1 | Issues | P1 | Alexandre | 25-05-2026 | criar #NEW-L |
| 4-A5 | Documentar SLA por prioridade em `CONTRIBUTING.md` | Issues | P2 | Alexandre | 30-05-2026 | criar #NEW-M |
| 4-A6 | Criar issue de tracking para roadmap v2.2 | Issues | P1 | Alexandre | 25-05-2026 | criar #NEW-N |
| 4-A7 | Resolver issue duplicada #71 | Issues | P2 | Alexandre | 05-06-2026 | revisar #71 |
| 5-A1 | Required status checks em `main` (consolidado com 3-A1) | PR | P0 | Alexandre | 15-05-2026 | consolidado |
| 5-A2 | Fechar 5 Dependabot PRs | PR | P1 | Alexandre | 18-05-2026 | revisar 5 PRs |
| 5-A3 | Fechar PR #37 healthcheck | PR | P1 | Alexandre | 18-05-2026 | revisar #37 |
| 5-A4 | Dependabot auto-merge para minor/patch | PR | P2 | Alexandre | 05-06-2026 | criar #NEW-O |
| 5-A5 | Documentar squash merge em `CONTRIBUTING.md` | PR | P2 | Alexandre | 30-05-2026 | consolidado |
| 5-A6 | Estender PR template com sub-templates por tipo | PR | P2 | Alexandre | 15-06-2026 | criar #NEW-P |
| 6-A1 | Auditar Agents via Browser MCP | Agents | P2 | Alexandre | 05-06-2026 | criar #NEW-Q |
| 6-A2 | Decisao executiva sobre habilitar Agents | Agents | P2 | Ronan + Alexandre | 30-06-2026 | criar #NEW-R |
| 6-A3 | Documentar politica de Agents em `CONTRIBUTING.md` | Agents | P3 | Alexandre | 15-07-2026 | depende 6-A2 |
| 7-A1 | Criar 4-5 categorias canonicas no Discussions | Discussions | P2 | Alexandre | 05-06-2026 | criar #NEW-S |
| 7-A2 | Postar 3 threads-seed pinadas | Discussions | P2 | Alexandre | 10-06-2026 | depende 7-A1 |
| 7-A3 | Linkar Discussions com checkpoints mensais | Discussions | P3 | Alexandre | continuo | continuo |
| 8-A1 | Documentar 6 workflows ativos em `07-observability-cicd.md` | Actions | P2 | Alexandre | 30-05-2026 | criar #NEW-T |
| 8-A2 | Criar `ci-voice-guard.yml` (camadas 2 e 3 do quality gate) | Actions | P1 | Alexandre | 28-05-2026 | criar #NEW-U |
| 8-A3 | Investigar issue #42 (Construtor de Relatorio Semanal) | Actions | P1 | Alexandre | 25-05-2026 | revisar #42 |
| 8-A4 | Criar `ci-editorial.yml` (frontmatter pydantic) | Actions | P1 | Alexandre | 05-06-2026 | criar #NEW-V |
| 8-A5 | Adicionar `permissions:` explicito aos 6 workflows | Actions | P2 | Alexandre | 10-06-2026 | criar #NEW-W |
| 8-A6 | Adicionar `concurrency:` em workflows que escrevem `data/` | Actions | P2 | Alexandre | 15-06-2026 | criar #NEW-X |
| 8-A7 | Planejar migracao de `ci-voice-guard.yml` para `geo-platform` | Actions | P3 | Alexandre | 30-06-2026 | depende D-CONS-01 |
| 9-A1 | Arquivar Project v2 #5 orfao | Projects | P1 | Alexandre | 25-05-2026 | criar #NEW-Y |
| 9-A2 | Documentar 9 fields canonicos do Project v2 #6 | Projects | P1 | Alexandre | 30-05-2026 | criar #NEW-Z |
| 9-A3 | Criar 3 views por persona Bruno/Ronan/Alexandre | Projects | P2 | Alexandre | 05-06-2026 | depende 9-A2 |
| 9-A4 | Automacao movimentacao por label via `projects-automation.yml` | Projects | P2 | Alexandre | 15-06-2026 | criar #NEW-AA |
| 9-A5 | Backup mensal Project v2 via `cron-project-backup.yml` | Projects | P2 | Alexandre | 30-06-2026 | criar #NEW-BB |
| 10-A1 | Validar estado do Wiki via Browser MCP | Wiki | P2 | Alexandre | 25-05-2026 | criar #NEW-CC |
| 10-A2 | Decidir entre Opcao A/B/C para Wiki | Wiki | P2 | Alexandre + Ronan | 30-05-2026 | depende 10-A1 |
| 10-A3 | Se Opcao A: criar 5 paginas iniciais no Wiki | Wiki | P2 | Alexandre | 15-06-2026 | depende 10-A2 |
| 10-A4 | Documentar politica Wiki em `CONTRIBUTING.md` | Wiki | P2 | Alexandre | 30-06-2026 | consolidado |
| 11-A1 | **Ativar code scanning (CodeQL)** | Security | P0 | Alexandre | 15-05-2026 | criar #NEW-DD |
| 11-A2 | **Ativar secret scanning + push protection** | Security | P0 | Alexandre | 15-05-2026 | criar #NEW-EE |
| 11-A3 | Rodar `gitleaks` em scan retroativo de toda historia | Security | P0 | Alexandre | 18-05-2026 | criar #NEW-FF |
| 11-A4 | Required signatures GPG em `main` (consolidado com 3-A4) | Security | P1 | Alexandre | 25-05-2026 | consolidado |
| 11-A5 | Required status checks em PR (consolidado com 3-A1) | Security | P0 | Alexandre | 15-05-2026 | consolidado |
| 11-A6 | Criar `ADR-016-INVENTARIO-SECRETS.md` | Security | P1 | Alexandre | 30-05-2026 | criar #NEW-GG |
| 11-A7 | `gitleaks` pre-commit local via `.pre-commit-config.yaml` | Security | P2 | Alexandre | 10-06-2026 | criar #NEW-HH |
| 11-A8 | `POLITICA-ROTACAO-CHAVES.md` | Security | P1 | Alexandre | 05-06-2026 | criar #NEW-II |
| 11-A9 | Validar `SECURITY.md` atualizado | Security | P2 | Alexandre | 20-05-2026 | criar #NEW-JJ |
| 12-A1 | Integrar Insights ao `report-builder.yml` | Insights | P2 | Alexandre | 15-06-2026 | criar #NEW-KK |
| 12-A2 | Revisar dependency graph mensalmente | Insights | P2 | Alexandre + Bruno | 30-06-2026 | continuo |
| 12-A3 | Criar `scripts/calc-kpi6.py` | Insights | P1 | Alexandre | 10-06-2026 | criar #NEW-LL |
| 12-A4 | Expandir contributors esperados quando 3 repos secundarios provisionados | Insights | P3 | Alexandre | 15-07-2026 | depende D-CONS-01 |
| 13-A1 | Branch protection canonica (consolidado com 3-A1) | Settings | P0 | Alexandre | 15-05-2026 | consolidado |
| 13-A2 | Adicionar LICENSE (consolidado com 3-A5) | Settings | P2 | Ronan + Alexandre | 30-05-2026 | consolidado |
| 13-A3 | 4 issue templates (consolidado com 4-A1) | Settings | P1 | Alexandre | 22-05-2026 | consolidado |
| 13-A4 | Squash merge unico | Settings | P1 | Alexandre | 20-05-2026 | criar #NEW-MM |
| 13-A5 | Auto-delete head branches | Settings | P2 | Alexandre | 22-05-2026 | criar #NEW-NN |
| 13-A6 | `ADR-017-SETTINGS-CANONICAS-DO-REPO.md` | Settings | P1 | Alexandre | 05-06-2026 | criar #NEW-OO |
| 13-A7 | `scripts/repo-settings-baseline.sh` | Settings | P2 | Alexandre | 15-06-2026 | criar #NEW-PP |
| 13-A8 | Backup mensal de settings via `cron-settings-backup.yml` | Settings | P2 | Alexandre | 30-06-2026 | criar #NEW-QQ |

**Sumario por prioridade:** 8 acoes P0 (criticas, semana 1), 16 acoes P1 (afetam KPI canonico, semanas 2-3), 11 acoes P2 (melhoria operacional, semanas 4-6), 3 acoes P3 (otimizacao, Q3).

### 14.2 Cronograma de execucao

**Semana 1 (15-05 a 22-05-2026) — Bloco P0 + abertura P1**

Foco: bloqueios para Fase 1 M05 (publicacao `llms.txt` em 14-05) e Fase 2 M08 (Peca 1 HBR em 02-06).

- Configurar branch protection canonica (3-A1, 5-A1, 11-A5, 13-A1 — consolidados em um unico PR de configuracao).
- Ativar code scanning + secret scanning + push protection (11-A1, 11-A2).
- Rodar `gitleaks --log-opts="--all"` em scan retroativo (11-A3).
- Fechar 5 Dependabot PRs + PR #37 (5-A2, 5-A3).
- Validar `SECURITY.md` (11-A9).
- Criar 4 issue templates `.github/ISSUE_TEMPLATE/*.yml` (4-A1, 13-A3).
- Documentar Branch Strategy em `CONTRIBUTING.md` (3-A6).
- Criar `.github/CODEOWNERS` (3-A2).
- Configurar squash merge unico (13-A4).

**Semana 2 (23-05 a 30-05-2026) — Bloco P1 amadurecimento + abertura P2**

Foco: alinhar Fase 1 com Fase 2.

- Investigar issue #42 (8-A3).
- Ajustar `stale.yml` para isentar P0/P1 (4-A4).
- Auditar coverage de issues (4-A2) — garantir 1 issue por peca HBR + dossie + decisao.
- Required signatures GPG em `main` (3-A4, 11-A4).
- Criar issue de tracking para roadmap v2.2 publico (4-A6).
- Arquivar Project v2 #5 orfao (9-A1).
- Documentar 9 fields do Project v2 #6 (9-A2).
- Criar `ci-voice-guard.yml` (8-A2) — exigencia da Fase 2 pre-publicacao Peca 1 HBR.
- Adicionar LICENSE (3-A5, 13-A2) — decisao Ronan.
- Criar `ADR-016-INVENTARIO-SECRETS.md` (11-A6).
- Documentar 6 workflows ativos (8-A1).
- Documentar SLA por prioridade em `CONTRIBUTING.md` (4-A5).
- Linkar PRs aos epics retroativamente (4-A3).
- Revisar `.gitignore` (3-A8).
- Documentar squash merge em `CONTRIBUTING.md` (5-A5).
- Criar `.gitattributes` (3-A3).
- Auto-delete head branches (13-A5).

**Semana 3-4 (01-06 a 15-06-2026) — Bloco P2 + entrada do pico**

Foco: pre-pico 2026.2.

- Criar `ci-editorial.yml` (8-A4).
- Criar `POLITICA-ROTACAO-CHAVES.md` (11-A8).
- Criar `ADR-017-SETTINGS-CANONICAS-DO-REPO.md` (13-A6).
- Criar `scripts/calc-kpi6.py` (12-A3).
- Configurar Dependabot auto-merge (5-A4).
- Configurar commitlint (3-A7).
- Auditar Agents (6-A1).
- Criar 4-5 categorias Discussions (7-A1).
- Postar 3 threads-seed pinadas (7-A2).
- Criar 3 views por persona no Project v2 (9-A3).
- Validar Wiki via Browser MCP (10-A1).
- Decidir entre Opcao A/B/C para Wiki (10-A2).
- `gitleaks` pre-commit local (11-A7).
- Adicionar `permissions:` explicito aos workflows (8-A5).
- Integrar Insights ao `report-builder.yml` (12-A1).
- Resolver issue #71 duplicada (4-A7).
- Estender PR template com sub-templates (5-A6).

**Semana 5-6 (16-06 a 30-06-2026) — Bloco P2 final + pre-Conselho IPOG**

Foco: estabilizacao para pico GEO 2026.2.

- Adicionar `concurrency:` aos workflows que escrevem `data/` (8-A6).
- Automacao movimentacao Project v2 (9-A4).
- Backup mensal Project v2 (9-A5).
- Se Opcao A para Wiki: criar 5 paginas iniciais (10-A3).
- Documentar politica Wiki em `CONTRIBUTING.md` (10-A4).
- Decisao executiva sobre Agents (6-A2) — escalar a Ronan no checkpoint mensal de junho.
- Criar `scripts/repo-settings-baseline.sh` (13-A7).
- Backup mensal de settings (13-A8).
- Revisar dependency graph (12-A2) — incluir no relatorio mensal.

**Q3 2026 (jul a set) — Bloco P3 + revisao**

- Documentar politica de Agents (6-A3) se 6-A2 = sim.
- Linkar Discussions com checkpoints mensais (7-A3) — continuo.
- Planejar migracao de `ci-voice-guard.yml` para `geo-platform` (8-A7).
- Expandir contributors esperados (12-A4).

### 14.3 Oito decisoes pendentes ao Conselho IPOG (Ronan Maia)

1. **D-CONS-01** (existente no roadmap) — aprovar provisionamento dos 3 repos secundarios (`geo-platform`, `geo-dashboard`, `geo-ipog-website`). Sem essa decisao, 16 dos 22 workflows ficam represados em planejamento.
2. **D-GOV-01** (nova) — escolha de LICENSE: CC-BY-NC-SA 4.0 vs All Rights Reserved proprietario. Recomendacao Brasil GEO: All Rights Reserved enquanto o programa for confidencial; mover para CC-BY-NC-SA apenas se houver decisao publica de open-sourcing parcial.
3. **D-GOV-02** (nova) — habilitar GitHub Advanced Security features pagos (Copilot Business USD 19/usuario/mes) para Agents — recomendacao: aguardar Fase 2 maturada (Q3 2026).
4. **D-GOV-03** (nova) — politica de CODEOWNERS para `content/` e `docs/board-report/`: incluir Bruno e Ronan (requer conta GitHub IPOG) ou manter apenas Alexandre? Recomendacao: criar contas IPOG para Bruno + Ronan no proximo checkpoint para auditoria Conselho.
5. **D-CONS-06** (existente) — aprovar 1Password Teams compartilhado entre Brasil GEO e IPOG (USD 24/mes para 3 usuarios) — pre-requisito para inventario canonico de 16 secrets.
6. **D-GOV-04** (nova) — politica de rotacao de chaves: aprovar cadencia trimestral para LLMs, anual para GitHub PAT, semestral para Cloudflare token. Sem aprovacao, ficam em revisao manual ad-hoc.
7. **D-GOV-05** (nova) — habilitar GitHub Discussions como canal estrategico assincrono? Recomendacao: sim, Opcao A com 4-5 categorias canonicas.
8. **D-GOV-06** (nova) — decisao sobre Wiki: Opcao A (ativar com 5 paginas), B (desabilitar), C (espelhar `docs/`). Recomendacao: Opcao A.

### 14.4 ROI estimado da governanca fortalecida

A consolidacao das 38 acoes catalogadas em 6 semanas tem retorno operacional estimado em **18 a 24 horas por mes** economizadas em duvida operacional, retrabalho e auditoria, conforme decomposicao abaixo:

- **5 a 7 horas/mes** economizadas em duvidas de processo (templates canonicos de issue + CODEOWNERS reduz pingue-pongue por "quem aprova isso").
- **3 a 5 horas/mes** economizadas em retrabalho (Voice Guard CI gateado em PR previne merge de peca HBR fora do padrao Aggarwal).
- **4 a 6 horas/mes** economizadas em auditoria do Conselho IPOG (commits assinados + ADRs canonicos + backup automatizado de settings reduz tempo de preparacao de board report trimestral).
- **3 a 4 horas/mes** economizadas em incidente de seguranca (code scanning + secret scanning + push protection previnem 90% dos vazamentos triviais em fase precoce, evitando retrabalho de rotacao emergencial).
- **3 a 2 horas/mes** economizadas em onboarding (Wiki + Discussions com 3 threads-seed + templates pre-prontos reduz tempo de catch-up de qualquer novo colaborador IPOG).

**Equivalente a 1 dia util de capacidade liberada por semana para Alexandre** — capacidade essa que pode ser redirigida para producao editorial (mais 1-2 pecas HBR/mes), revisao mais profunda dos prompts canonicos, ou trabalho de auditoria de concorrentes (Onda 3 em set/2026). Em valor monetario implicito, considerando custo hora-Alexandre estimado em R$ 400 a R$ 600 (faixa CEO senior Brasil GEO), o ROI direto da governanca e da ordem de **R$ 7.200 a R$ 14.400 por mes** — equivalente a 2 a 4 matriculas marginais MBA Online Psicologia (ticket medio premium IPOG 2026.2), ou seja, **a governanca paga-se em 1 matricula marginal por mes em ROI direto, com benefício indireto adicional** em risco mitigado de incidente de seguranca, perda de auditoria, ou degradacao de KPI 6 por gap operacional nao tracado.

---

## Anexo A — Cross-references a documentos canonicos

Este plano cross-refere os seguintes documentos canonicos do programa:

- `docs/tech-stack/00-tech-roadmap-2026.md` (Secao 3.1 — 4 repositorios; Secao 3.2 — 9 containers C4 Level 2; Secao 4 — 22 workflows planejados; Frase 3 — Git como fonte canonica)
- `docs/tech-stack/07-observability-cicd.md` (Bloco A — 3 pilares observability; Bloco H — 22 workflows; Bloco I — 16 secrets canonicos; Bloco K — FinOps)
- `docs/03-reunioes-e-cadencia-ipog.md` (cadencia operacional; checkpoints executivos mensais; Conselho trimestral)
- `docs/05-risk-register.md` (R-001 a R-016; risco R-002 mitigado pelo `concorrentes-monitoring.yml`)
- `docs/framework/06-voice-guard-v2-aggarwal.md` (4 dimensoes editoriais; 30+30+25+15; gate >= 70)
- `docs/framework/07-research-geo-aplicado-ipog.md` (research aplicado; pecas HBR como peca canonica)
- `docs/framework/02-quality-gate-5-camadas.md` (quality gate 5+1 camadas; camadas 0-5)
- `SECURITY.md` (relato privado; LGPD; confidencialidade IPOG)
- `CONTRIBUTING.md` (idioma + acentuacao; naming canonico; branches; commits; PRs; compliance MEC/CFP)
- `.github/PULL_REQUEST_TEMPLATE.md` (checklist canonico PR)
- `README.md` (visao geral programa)
- `ROADMAP.md` (cronograma fases)
- `CODE_OF_CONDUCT.md` (conduta colaborador)
- `dashboards/KPI-DASHBOARD.md` (8 KPIs canonicos + 3 derivados)
- `dashboards/FINOPS-DISCIPLINA.md` (teto USD 50/sprint — em recalibracao)
- `dashboards/METRICAS-CANONICAS.md` (KPIs canonicos)

---

## Anexo B — Glossario rapido

- **ADR** — Architecture Decision Record. Documento de uma decisao arquitetural com contexto, opcoes, decisao, consequencias. Vivem em `docs/engineering/ADR-NNN-TITULO.md`.
- **CFP** — Conselho Federal de Psicologia. Regulamenta exercicio profissional de psicologia no Brasil.
- **CodeQL** — engine de code scanning gratuito do GitHub, suporta Python, JavaScript, TypeScript, YAML.
- **Conselho IPOG** — instancia executiva trimestral de governanca do programa GEO IPOG, presidida por Ronan Maia.
- **CRP** — Conselho Regional de Psicologia (estadual). Implementa CFP.
- **D-CONS-NN** — codigo canonico de decisao do Conselho IPOG (NN = numero sequencial).
- **D-GOV-NN** — codigo canonico de decisao de governanca de repositorio (introduzido neste plano).
- **GEO** — Generative Engine Optimization. Disciplina de marketing tecnico para presenca em respostas de LLMs.
- **GPG** — GNU Privacy Guard. Mecanismo de assinatura criptografica de commits.
- **HBR** — Harvard Business Review (padrao editorial do programa: abertura-impacto, tese contraintuitiva, evidencia, mecanismo, decisao pessoal, proximo passo).
- **KPI** — Key Performance Indicator. O programa tem 8 KPIs canonicos + 3 derivados.
- **MEC** — Ministerio da Educacao. Regulador de pos-graduacao lato sensu no Brasil.
- **NAIA** — motor de auditoria GEO/SEO/Schema do programa, com 100+ checks `NAIA-XXX`.
- **PR** — Pull Request.
- **SEV1/SEV2/SEV3** — severidade de incidente operacional (1 critico, 2 alto, 3 medio).
- **Voice Guard** — gate canonico de qualidade editorial, 4 dimensoes Aggarwal, pesos 30+30+25+15, score 0-100, gate >= 70.

---

**Documento entregue em 2026-05-10. Revisao programada: 30-06-2026 (apos execucao das 6 semanas do bloco P0+P1+P2).**
