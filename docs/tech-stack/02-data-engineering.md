# Dossiê de Data Engineering — Pipeline de Coleta Cross-LLM do Programa GEO IPOG

> **Status:** vigente desde 2026-05-01
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-05-01
> **Cross-links de leitura obrigatória:** `dashboards/METRICAS-CANONICAS.md`, `dashboards/RUNBOOK-COLETA-LLM.md`, `dashboards/FINOPS-DISCIPLINA.md`, `prompts/KIT-PROMPTS-V0.md`, `prompts/PAPEIS-DE-COLETA.md`, `audits/benchmarking/matriz-presenca-llm.md`, `docs/04-definicao-de-done.md`.

## Sumário e premissas operacionais

Este dossiê especifica o pipeline assíncrono de coleta cross-LLM que alimenta os KPIs canônicos do programa GEO IPOG. O programa opera com cohort fixo de seis modelos, versão pinada por trimestre, kit canônico de 75 prompts em três clusters semânticos (organizacional, clínica/neuro/TCC/avaliação, psicopedagogia/escolar) com sete personas e quatro etapas de jornada, e janela diária de coleta entre 06h00 e 09h00 (horário de Brasília).

Cohort canônico vigente desde 2026-04-30 (atualizado conforme briefing executivo de 2026-05-01, próxima revisão prevista 2026-Q3): ChatGPT (`gpt-5.0`), Claude (`claude-opus-4-7`), Gemini (`gemini-3-pro`), Perplexity (`sonar-pro`), Grok (`grok-4`), Copilot (`copilot-2026`). Esta lista substitui as versões anteriormente pinadas no `dashboards/RUNBOOK-COLETA-LLM.md` (gpt-4o, claude-sonnet-4-5, gemini-1.5-pro, grok-2) e exige atualização daquele documento na próxima revisão trimestral. Perplexity permanece obrigatória como sensor RAG-native.

Volume previsto em regime full: 75 prompts × 6 LLMs = 450 chamadas/dia para a coleta canônica de KPI 1, 2 e 3. O briefing menciona 4.500 chamadas/dia considerando 10 concorrentes; entretanto, a coleta cross-LLM canônica não multiplica o volume por concorrente — concorrentes aparecem como entidades extraídas da resposta, não como dimensão de execução. O fator 10× materializa-se em coletas de validação cruzada (auditoria de matriz de presença em `audits/benchmarking/matriz-presenca-llm.md`) e em re-coletas pós-drift; ver Bloco H — Backfill e replay.

N mínimo por leitura segue o estabelecido em `dashboards/METRICAS-CANONICAS.md`: KPI 1 exige 50 prompts/LLM por leitura; KPI 2 exige 100 menções/cluster; KPI 3 exige 30 menções válidas; KPI 7 exige 100 sessões classificadas como originadas em LLM.

Câmbio de referência: 1 USD = R$ 5,20 (referência maio/2026 conforme briefing). Toda cifra em reais é derivada da tabela em USD do `dashboards/FINOPS-DISCIPLINA.md` aplicando esse fator. Discrepâncias com tabela vigente do provedor são reconciliadas mensalmente.

Princípios canônicos não-negociáveis: cohort fixo, versão pinada, N mínimo por leitura, janela de drift, owner único por KPI. Anti-padrões proibidos: misturar versões na mesma série, comparar Mention Rate sem cohort fixo, inflar autoridade contando re-menções, substituir baseline por estimativa, coletar três vezes por dia para "tirar média".

## Bloco A — Arquitetura do pipeline

A arquitetura segue padrão de pipeline assíncrono com isolamento de falha por provedor, cache idempotente, persistência em camadas (logs JSONL hot e warehouse colunar para analytics) e observabilidade contínua. O diagrama abaixo descreve o fluxo prescrito.

```
                  +----------------------------------+
                  |  Scheduler                       |
                  |  - GitHub Actions cron 06h00 BRT |
                  |  - Cloudflare Worker Triggers    |
                  |  - CLI on-demand (backfill)      |
                  +-----------------+----------------+
                                    |
                                    v
                  +-----------------+----------------+
                  |  Job Builder                     |
                  |  - Le KIT-PROMPTS-V0 (75 itens)  |
                  |  - Enumera (LLM x prompt)        |
                  |  - Calcula SHA-256 de cache      |
                  |  - Marca prioridade por cluster  |
                  +-----------------+----------------+
                                    |
                                    v
                  +-----------------+----------------+
                  |  Idempotency Cache (KV)          |
                  |  - chave: SHA-256(prov,model,    |
                  |    query_id,query_text,date)     |
                  |  - hit: pula chamada, registra   |
                  |  - miss: enfileira para worker   |
                  +-----------------+----------------+
                                    |
                                    v (somente miss)
                  +-----------------+----------------+
                  |  Priority Queue                  |
                  |  - 1 fila por LLM (6 filas)      |
                  |  - prioridade por cluster        |
                  |  - rate-limited por TPM/RPM      |
                  +--+--+--+--+--+--+----------------+
                     |  |  |  |  |  |
            +--------+  |  |  |  |  +------------+
            |        +--+  |  |  +--+            |
            v        v  v  v  v  v  v            v
         +---+    +---+  +---+ +---+ +---+    +---+
         |W-1|    |W-2|  |W-3| |W-4| |W-5|    |W-6|
         |GPT|    |CLA|  |GEM| |PER| |GRK|    |COP|
         +-+-+    +-+-+  +-+-+ +-+-+ +-+-+    +-+-+
           |        |      |     |     |        |
           |  Circuit Breaker por LLM (60s cooldown)
           |  Retry exponencial 2/4/8s, max 3 tentativas
           |  Timeout 30s padrao, 60s com browsing
           v        v      v     v     v        v
        +-----------+-------+-----+-----+--------+
        |  HTTP async client (httpx / undici)    |
        |  - mTLS quando aplicavel               |
        |  - tracing OpenTelemetry               |
        |  - cost calculator inline              |
        +---+--------+-------+-----+-----+-------+
            |        |       |     |     |
            v        v       v     v     v
         OpenAI  Anthropic Google Perpl  xAI    Microsoft
           |        |       |     |     |        |
           +--------+-------+-----+-----+--------+
                            |
                            v
                  +---------+----------+
                  |  Response Handler  |
                  |  - parse JSON      |
                  |  - validate schema |
                  |  - SHA-256 hash    |
                  |  - extract sources |
                  |  - mark errors     |
                  +---------+----------+
                            |
              +-------------+-------------+
              v             v             v
        +-----+-----+ +-----+-----+ +-----+-----+
        |Persistence| |   Drift    | |  FinOps   |
        |  Layer    | | Detector   | |  Tracker  |
        | JSONL hot | | entropy 7d | | cost USD  |
        | R2 cold   | | vs 30d     | | budget    |
        | DuckDB an | | alerta GH  | | guards    |
        +-----+-----+ +-----+-----+ +-----+-----+
              |             |             |
              v             v             v
        +-----+-------------+-------------+-----+
        |       Pos-processamento (assincrono)  |
        |  - extract entities (concorrentes)    |
        |  - mention IPOG: bool                 |
        |  - citation quality 0-5               |
        |  - persist em fct_collection          |
        +-----+---------------------------------+
              |
              v
        +-----+-----+
        | Dashboards|
        | KPI 1-8   |
        +-----------+
```

### Componentes detalhados

**Scheduler.** Disparo automático às 06h00 BRT pela GitHub Actions cron (`.github/workflows/coleta-diaria.yml`). Disparo on-demand (backfill, replay, novo concorrente) via CLI local autenticado contra a mesma queue. Triggers Cloudflare Worker para coletas spot (auditoria NAIA quinzenal P0/P1).

**Job Builder.** Lê o `prompts/KIT-PROMPTS-V0.md` na versão vigente (manifestada em `prompts/MANIFEST.json` com SHA-256 do kit), enumera 75 prompts × 6 LLMs = 450 jobs, calcula a chave de cache para cada job e marca prioridade. Prioridade 0 (mais alta): prompts head-to-head e transversais de marca; prioridade 1: prompts de cluster por jornada de decisão (J3); prioridade 2: descoberta (J1) e comparação (J2); prioridade 3: pós-matrícula (J4) e descoberta avançada.

**Idempotency Cache.** Cloudflare KV (recomendação primária) com chave `sha256(provider|model|query_id|query_text|date_iso)`. TTL conforme política do Bloco E. Hit registra `cache_hit: true` no log JSONL com custo zero; miss enfileira para o worker.

**Priority Queue.** Cloudflare Queues (recomendação primária) com 1 fila por LLM. Cada fila tem rate-limit alinhado ao TPM/RPM do provedor (Bloco C). Mensagens carregam payload mínimo (chave de cache + prompt + metadata); resposta volta para handler central.

**Workers async.** Um worker Python 3.12 (httpx + asyncio) por provedor, isolado em processo independente. Falha de um worker não derruba os demais. Cada worker tem seu próprio circuit breaker (estado `closed` / `open` / `half-open`), retry exponencial (2s, 4s, 8s) e timeout (30s padrão, 60s para browsing). O isolamento por LLM é canônico: substituir um LLM caído por outro é proibido (`dashboards/RUNBOOK-COLETA-LLM.md` seção fallback map).

**Response Handler.** Parse + validação contra schema pydantic. Calcula SHA-256 da `response_text` (campo `response_hash`). Extrai sources quando disponível (Perplexity, Copilot, Gemini com browsing). Marca erros não-transientes (401, 403, 400 de payload) sem retry.

**Persistence Layer.** Três camadas: (a) JSONL hot em `data/coleta/YYYY-MM-DD.jsonl` para auditoria diária; (b) R2 cold archive a partir de 90 dias; (c) DuckDB warehouse colunar (Bloco B) materializado a partir do JSONL para queries analíticas. Retention: hot 90 dias, warm 24 meses, cold indefinido.

**Drift Detector.** Lê últimas 30 leituras do par `(provider, query_id)`, calcula entropia do conjunto de hashes em janela de 7 dias e 30 dias. Drift acusado quando entropia 7d diverge mais de 2 desvios padrão da entropia 30d e quando 3+ queries do mesmo provedor acusam no mesmo dia. Disparo de drift confirmado: GitHub Issue automático com label `drift-detected` + provider + data; segmentação da série temporal a partir do ponto de drift.

**FinOps Tracker.** Calcula custo da chamada na hora (input_tokens × preço_input + output_tokens × preço_output, conforme tabela do `dashboards/FINOPS-DISCIPLINA.md`). Persiste em `data/finops/YYYY-MM.jsonl`. Avalia budget guards (50%, 80%, 100% do teto da sprint vigente). Aciona emergency stop quando 100% atingido.

**Idempotency cache + Retry logic + Circuit breaker.** Camada cruzada que protege contra dupla cobrança (cache), instabilidade transiente (retry) e cascade failure (breaker). Ver Bloco E para política detalhada.

### Trade-offs de arquitetura

A escolha por workers separados por provedor (em vez de um worker generalista) trade off código duplicado (~15% de overhead em manutenção) por isolamento de falha. Em coleta cross-LLM canônica, isolamento vence: um único provedor instável não pode invalidar a coleta dos outros cinco.

A escolha por queue priorizada (em vez de FIFO simples) trade off complexidade adicional por garantia de que prompts de marca e head-to-head sejam coletados primeiro — críticos para Mention Rate e Share-of-Voice mesmo quando há degradação parcial.

A escolha por JSONL hot + warehouse colunar (em vez de PostgreSQL único) trade off ciclo de hidratação (~1h após fim da coleta) por custo. DuckDB sobre R2 fornece queries analíticas em escala TB com custo marginal próximo de zero comparado a Postgres gerenciado.

## Bloco B — Schema do data warehouse

O warehouse adota star schema clássico com fatos em grão de execução e dimensões versionadas. Toda coluna texto longo usa compressão dictionary; toda coluna numérica usa run-length quando aplicável. Particionamento padrão por mês (`run_at_month`) reduz scan em queries de leitura.

### dim_llm

Dimensão type-2 (versionada). Toda mudança de versão pinada cria nova linha; histórico preservado.

| Coluna | Tipo | Descrição | Particionamento |
|---|---|---|---|
| `llm_id` | UUID | Surrogate key | — |
| `provider` | VARCHAR(20) | `openai`, `anthropic`, `google`, `perplexity`, `xai`, `microsoft` | — |
| `model_pinned_version` | VARCHAR(80) | Versão exata pinada (ex.: `gpt-5.0`, `claude-opus-4-7`) | — |
| `model_alias_canonical` | VARCHAR(20) | Alias usado em dashboards (`ChatGPT`, `Claude`, `Gemini`, `Perplexity`, `Grok`, `Copilot`) | — |
| `is_rag_native` | BOOLEAN | `true` para Perplexity e Copilot; `false` para os demais | — |
| `version_fixed_at` | TIMESTAMP | Quando esta versão entrou em vigor | — |
| `next_review_at` | DATE | Próxima revisão trimestral prevista | — |
| `replaced_by_llm_id` | UUID nullable | FK para a versão sucessora quando esta linha foi descontinuada | — |
| `is_current` | BOOLEAN | Linha vigente? Apenas uma `true` por `provider` | — |
| `cost_input_usd_per_1m` | DECIMAL(10,4) | Preço de input (vide `dashboards/FINOPS-DISCIPLINA.md`) | — |
| `cost_output_usd_per_1m` | DECIMAL(10,4) | Preço de output | — |

Índices: `(provider, is_current)` único parcial onde `is_current = true`; `(provider, version_fixed_at)` para histórico.
Retenção: indefinida (dim type-2). Uma versão antiga nunca é apagada — a série temporal depende dela.

### dim_prompt

Dimensão type-2. Mudança no texto do prompt cria nova linha; SHA-256 muda.

| Coluna | Tipo | Descrição |
|---|---|---|
| `prompt_id` | VARCHAR(20) | ID estável (`K-C1-001`, `K-TR-003`) |
| `prompt_version` | INT | Versão sequencial dentro do mesmo `prompt_id` |
| `cluster` | VARCHAR(40) | `C1`, `C2`, `C3`, `transversal`, `descoberta-avancada`, `head-to-head`, `objecao` |
| `persona` | VARCHAR(8) | `P1` a `P7` ou `Multi` |
| `jornada` | VARCHAR(4) | `J1`, `J2`, `J3`, `J4` |
| `prompt_text` | TEXT | Texto exato em PT-BR |
| `prompt_sha256` | CHAR(64) | Hash do `prompt_text` |
| `resposta_alvo_canonica` | TEXT | Resposta-alvo conforme KIT-PROMPTS-V0 |
| `cobertura_cross_llm_esperada` | JSON | Estrutura `{"GPT": "*", "CLA": "*", ...}` |
| `kit_version` | VARCHAR(8) | `v0`, `v1`, etc. |
| `is_current` | BOOLEAN | Linha vigente? |
| `created_at` | TIMESTAMP | Quando esta versão entrou em vigor |
| `retired_at` | TIMESTAMP nullable | Quando foi aposentado (pelo critério de `prompts/CALIBRACAO-MENSAL.md`) |

Índices: `(prompt_id, is_current)` único parcial; `(cluster, persona, jornada)` para slicing.
Retenção: indefinida.

### dim_concorrente

Dimensão type-2. Lista canônica em `data/concorrentes.yaml` (a criar quando Wave 5 entrar em operação, conforme `dashboards/METRICAS-CANONICAS.md` KPI 2). Cobre 10 concorrentes ativos (Onda 1 + Onda 2: Estácio, Anhanguera, UNINTER, UniCesumar, PUC-Minas Virtual, CETCC, IBNeuro, Sírio-Libanês IEP, wPós/Anhembi Morumbi, Saint Paul/EXAME) e os concorrentes de borda do KIT (Voitto, Conexia, Descomplica, USP, PUC-SP, Mackenzie, Insper, FGV, InEPP, IBPEX, INPG, Estácio, FAEL, Educa Mais Brasil etc.).

| Coluna | Tipo | Descrição |
|---|---|---|
| `concorrente_id` | VARCHAR(40) | Slug canônico (`anhanguera`, `cetcc`, `ibneuro`, `anhembi-morumbi`) |
| `nome_canonico` | VARCHAR(100) | Nome oficial |
| `aliases` | JSON array | Variações observadas (`Anhembi`, `Universidade Anhembi Morumbi`, `Anhembi-Morumbi`) |
| `cluster_principal` | VARCHAR(40) | Cluster onde concorrente disputa força |
| `categoria` | VARCHAR(40) | `EAD-massivo`, `premium-presencial`, `especialista-vertical`, `plataforma-cursos`, `MBA-executivo` |
| `dossie_path` | VARCHAR(200) | Caminho do dossiê em `audits/benchmarking/concorrente-{slug}.md` |
| `mec_credenciada` | BOOLEAN | Reconhecida pelo MEC? |
| `wikipedia_url` | VARCHAR(200) nullable | URL do verbete |
| `status` | VARCHAR(20) | `ativa`, `monitorada`, `aposentada` |
| `entered_at` | DATE | Quando entrou no monitoramento |
| `is_current` | BOOLEAN | Linha vigente? |

Índices: `(concorrente_id, is_current)` único parcial.
Retenção: indefinida.

### fct_collection

Tabela fato principal. Grão: uma linha por execução de uma query em uma LLM em uma data. PK composta: `(llm_id, prompt_id, run_at_date)`.

| Coluna | Tipo | Descrição |
|---|---|---|
| `collection_id` | UUID | Surrogate key |
| `llm_id` | UUID FK | dim_llm |
| `prompt_id` | VARCHAR(20) FK | dim_prompt |
| `prompt_version` | INT FK | composto com `prompt_id` |
| `run_at` | TIMESTAMP | Momento exato da chamada |
| `run_at_date` | DATE | Data da execução (partition key) |
| `response_text` | TEXT | Resposta integral; comprimida com dictionary |
| `response_hash` | CHAR(64) | SHA-256 da `response_text` |
| `latency_ms` | INT | Latência da chamada |
| `tokens_in` | INT | Tokens de input |
| `tokens_out` | INT | Tokens de output |
| `cost_usd` | DECIMAL(8,4) | Custo da chamada em USD |
| `cost_brl` | DECIMAL(8,4) | Custo em R$ (cost_usd × cambio_dia) |
| `cambio_dia` | DECIMAL(6,4) | Cotação USD/BRL aplicada |
| `mention_ipog` | BOOLEAN | Pós-processado: IPOG citado corretamente? |
| `ipog_position` | TINYINT nullable | Posição no top-N (1, 2, 3, 4, 5+, NULL se ausente) |
| `mention_correta_canonica` | BOOLEAN | Citação correta vs. distorção (`Pog`, `IPOG Brasil`) |
| `mentioned_competitors` | JSON array | Lista de concorrente_ids extraídos |
| `citation_quality_score` | TINYINT | 0 a 5, soma das 5 subdimensões do KIT-PROMPTS-V0 |
| `cq_presenca_nominal` | BOOLEAN | Subdimensão 1 |
| `cq_formato_declarado` | BOOLEAN | Subdimensão 2 |
| `cq_diferencial_editorial` | BOOLEAN | Subdimensão 3 |
| `cq_link_canonico` | BOOLEAN | Subdimensão 4 |
| `cq_autoridade_contextual` | BOOLEAN | Subdimensão 5 |
| `sources_cited` | JSON array nullable | URLs citadas (Perplexity, Copilot, Gemini browsing) |
| `cache_hit` | BOOLEAN | Servida do cache? |
| `under_drift_review` | BOOLEAN | Coleta sob investigação de drift |
| `error_code` | VARCHAR(40) nullable | Código de erro quando aplicável |
| `error_message` | TEXT nullable | Mensagem de erro |
| `pipeline_version` | VARCHAR(10) | Versão do pipeline que executou |
| `kit_version` | VARCHAR(8) | Versão do KIT-PROMPTS-V0 vigente na execução |

Particionamento: por `run_at_date` (partição mensal em DuckDB; em produção R2 + DuckDB, particionamento físico em pasta `year=YYYY/month=MM/`).
Índices recomendados: `(llm_id, run_at_date)`, `(prompt_id, run_at_date)`, `(run_at_date, mention_ipog)`, `(under_drift_review)`.
Retenção: 24 meses online (warm tier), arquivamento indefinido em R2.

### fct_mention_rate_daily

Tabela fato derivada (rollup). Grão: uma linha por (data, llm, cluster, persona). Materializada por job de pós-processamento.

| Coluna | Tipo | Descrição |
|---|---|---|
| `date` | DATE | Data da agregação |
| `llm_id` | UUID FK | dim_llm |
| `cluster` | VARCHAR(40) | C1, C2, C3, transversal, multi |
| `persona` | VARCHAR(8) | P1-P7, Multi, all |
| `jornada` | VARCHAR(4) | J1-J4, all |
| `mention_rate` | DECIMAL(5,4) | Proporção 0-1 |
| `mention_rate_top3` | DECIMAL(5,4) | Mention rate considerando apenas top-3 |
| `n_prompts_validos` | INT | Denominador (precisa >= 50 conforme KPI 1) |
| `n_prompts_com_mention` | INT | Numerador |
| `n_minimo_atendido` | BOOLEAN | n_prompts_validos >= 50? |
| `kit_version` | VARCHAR(8) | Versão do kit |
| `pipeline_version` | VARCHAR(10) | Versão do pipeline |

Particionamento: por `date` (mensal).
Índices: `(date, llm_id)`, `(llm_id, cluster, date)`.
Retenção: 24 meses online; rollups maiores por trimestre arquivados em cold tier.

### fct_share_of_voice_biweekly

Grão: uma linha por (período quinzenal, cluster, concorrente).

| Coluna | Tipo | Descrição |
|---|---|---|
| `period_start` | DATE | Início do período de 14 dias |
| `period_end` | DATE | Fim do período |
| `cluster` | VARCHAR(40) | C1, C2, C3 |
| `concorrente_id` | VARCHAR(40) FK | dim_concorrente; `IPOG` é tratado como concorrente neste fato |
| `mentions` | INT | Menções da entidade no período |
| `total_mentions` | INT | Total de menções de todas as instituições no cluster |
| `sov_pct` | DECIMAL(5,2) | mentions / total_mentions × 100 |
| `n_minimo_atendido` | BOOLEAN | total_mentions >= 100? |
| `dicionario_concorrentes_versao` | VARCHAR(8) | Versão do `data/concorrentes.yaml` aplicada |

Particionamento: por `period_start` (trimestral).
Índices: `(period_start, cluster)`, `(concorrente_id, cluster, period_start)`.
Retenção: 24 meses online; arquivamento indefinido.

### fct_schema_audit

Tabela fato da auditoria NAIA. Alimenta KPI 4 (Schema Coverage Score).

| Coluna | Tipo | Descrição |
|---|---|---|
| `audit_id` | UUID | Surrogate key |
| `audit_date` | DATE | Data da auditoria (mensal completa ou quinzenal spot) |
| `audit_type` | VARCHAR(20) | `mensal-completa`, `quinzenal-spot-p0p1` |
| `page_url` | VARCHAR(400) | URL auditada |
| `page_type` | VARCHAR(40) | `hub`, `institucional`, `curso`, `corpo-docente`, `perfil-docente`, `artigo`, `faq` |
| `naia_check_id` | VARCHAR(20) | `NAIA-001`, ..., `NAIA-200` |
| `naia_categoria` | CHAR(1) | `A`-`J` |
| `status` | VARCHAR(20) | `passed`, `failed`, `not-applicable`, `inconclusive` |
| `severity` | VARCHAR(2) | `P0`, `P1`, `P2`, `P3` |
| `evidence_url` | VARCHAR(400) nullable | Snapshot do JSON-LD ou screenshot |
| `issue_url` | VARCHAR(200) nullable | GitHub Issue criada quando falha P0/P1 |

Particionamento: por `audit_date` (mensal).
Índices: `(audit_date, status, severity)`, `(naia_check_id, audit_date)`.
Retenção: indefinida (auditoria é histórica).

### fct_finops_daily

Grão: uma linha por (data, llm).

| Coluna | Tipo | Descrição |
|---|---|---|
| `date` | DATE | Data |
| `llm_id` | UUID FK | dim_llm |
| `total_calls` | INT | Total de chamadas (cache hit + cache miss) |
| `cache_miss_calls` | INT | Apenas cache miss (geram custo) |
| `cache_hit_rate` | DECIMAL(5,4) | cache_hit / total_calls |
| `total_tokens_in` | BIGINT | Soma de tokens de input |
| `total_tokens_out` | BIGINT | Soma de tokens de output |
| `total_cost_usd` | DECIMAL(10,4) | Custo total |
| `total_cost_brl` | DECIMAL(10,4) | Custo em reais |
| `avg_cost_per_call_usd` | DECIMAL(8,6) | Custo médio por chamada |
| `error_rate` | DECIMAL(5,4) | Erros / total_calls |
| `circuit_open_events` | INT | Vezes que o circuit breaker abriu |
| `status_budget_guard` | VARCHAR(20) | `ok`, `alert-50`, `alert-80`, `alert-95`, `freeze`, `block` |
| `sprint_id` | VARCHAR(10) | Sprint vigente (`2026-S05`) |

Particionamento: por `date` (mensal).
Índices: `(date, llm_id)`, `(sprint_id, date)`.
Retenção: 24 meses online.

### fct_drift_events

Tabela fato auxiliar para drift detection.

| Coluna | Tipo | Descrição |
|---|---|---|
| `drift_event_id` | UUID | PK |
| `detected_at` | TIMESTAMP | Momento da detecção |
| `llm_id` | UUID FK | Provedor afetado |
| `prompt_id` | VARCHAR(20) | Prompt onde drift foi acusado |
| `entropy_7d` | DECIMAL(8,6) | Entropia em janela de 7 dias |
| `entropy_30d` | DECIMAL(8,6) | Entropia em janela de 30 dias |
| `divergence_sigma` | DECIMAL(6,4) | Desvios padrão da divergência |
| `is_confirmed` | BOOLEAN | Drift confirmado (3+ queries no mesmo dia)? |
| `github_issue_url` | VARCHAR(200) nullable | Issue de drift criada |
| `serie_segmentada_em` | DATE nullable | Data em que a série foi segmentada |

## Bloco C — Pipeline de coleta detalhado por LLM

Cada provedor tem endpoint, formato de request, parsing, rate limit, custo estimado e quirks específicos. Custos calculados a partir da tabela do `dashboards/FINOPS-DISCIPLINA.md` aplicando câmbio R$ 5,20/USD. Os preços para os modelos 2026-Q2 (gpt-5.0, claude-opus-4-7, gemini-3-pro, grok-4, copilot-2026) são projeções derivadas das curvas de pricing observadas até abril/2026 e devem ser reconciliados na primeira fatura mensal de operação.

### ChatGPT — OpenAI gpt-5.0

- **Endpoint:** `POST https://api.openai.com/v1/chat/completions`
- **Auth:** `Authorization: Bearer ${OPENAI_API_KEY}`
- **Headers obrigatórios:** `Content-Type: application/json`, `OpenAI-Beta: assistants=v2` quando usando Responses API.
- **Body (estrutura):** `{"model": "gpt-5.0", "messages": [{"role":"system","content": SYSTEM_GEO}, {"role":"user","content": prompt_text}], "temperature": 0.0, "max_tokens": 2000, "tool_choice":"auto","tools":[{"type":"web_search"}]}` para prompts que requerem citation.
- **Timeout:** 30s padrão; 60s quando `tools.web_search` ativa.
- **Parsing:** `response.choices[0].message.content` para texto; `response.choices[0].message.tool_calls[]` para citations; `response.usage.{prompt_tokens, completion_tokens}` para custo.
- **Error handling:** 429 (rate limit) → backoff exponencial + retry; 5xx → backoff + retry; 401/403 → falha permanente, alerta crítico (chave inválida); 400 com `code: context_length_exceeded` → permanente.
- **Rate limit (Tier 4 estimado):** 10.000 RPM, 30.000.000 TPM. Tier 1 (default novo): 500 RPM, 200.000 TPM. Programa GEO IPOG opera em Tier 3+ por volume.
- **Custo por chamada estimado** (com câmbio 5,20):
  - Prompt curto (1.500 input + 800 output, sem search): USD 0,012 + USD 0,008 = USD 0,020 ≈ **R$ 0,104**.
  - Prompt com search ativa (3.000 input + 1.200 output): ≈ **R$ 0,156**.
  - Diário 75 prompts ≈ R$ 8,00–12,00 (dependendo de search).
- **Idempotency key:** `sha256(openai|gpt-5.0|${prompt_id}|${prompt_text}|${date_iso})`. Header `Idempotency-Key` enviado em paralelo (suportado pela API).
- **Quirks:** ChatGPT search retorna citations em `tool_calls[].function.arguments` em formato JSON (URLs + snippets). Variabilidade de saída mesmo com `temperature=0` por causa de top-p estocástico em chamadas com tools — capturado pelo drift detector. Versão `gpt-5.0` lançada em 2026-Q1 mantém compatibilidade com `chat/completions`; `responses` API (introduzida em GPT-4.1) é caminho preferencial mas não-bloqueante.

### Claude — Anthropic claude-opus-4-7

- **Endpoint:** `POST https://api.anthropic.com/v1/messages`
- **Auth:** `x-api-key: ${ANTHROPIC_API_KEY}`
- **Headers:** `anthropic-version: 2023-06-01`, `Content-Type: application/json`. Para web search: `anthropic-beta: web-search-2025-03`.
- **Body:** `{"model":"claude-opus-4-7","max_tokens": 4096, "system": SYSTEM_GEO, "messages":[{"role":"user","content": prompt_text}], "temperature": 0.0, "tools":[{"type":"web_search_20250305","name":"web_search","max_uses":3}]}`.
- **Timeout:** 30s padrão; 60s com web search.
- **Parsing:** `response.content[]` é array — concatena segmentos `text`; segmentos `tool_use` carregam search queries; `response.usage.{input_tokens, output_tokens, cache_creation_input_tokens, cache_read_input_tokens}` para custo (Claude tem prompt caching nativo).
- **Error handling:** 429 → backoff (header `retry-after` respeitado); 529 (overloaded) → backoff longo; 5xx → retry; 401 → falha permanente.
- **Rate limit (Tier 4 estimado):** 4.000 RPM, 400.000 ITPM, 80.000 OTPM. Programa requer Tier 3+.
- **Custo por chamada estimado** (mantendo curva claude-opus-4-7 ≈ USD 15/1M input, USD 75/1M output como projeção conservadora; revisar na primeira fatura):
  - Prompt curto (1.500 in + 800 out, sem cache): USD 0,022 + USD 0,060 = **R$ 0,427**.
  - Com prompt caching (90% do system prompt cacheado): USD 0,005 + USD 0,060 = **R$ 0,338**.
  - Com web search: adicionar ~USD 0,01 em tokens de tool result.
  - Cohort de coleta diário com Claude Opus pode chegar a **R$ 25–35/dia** se opus for o modelo pinado. Nota crítica de FinOps: o `dashboards/FINOPS-DISCIPLINA.md` aloca 60% do orçamento ao Claude já contando com Sonnet 4.5; a migração para Opus 4.7 exige recalibração da alocação ou migração da coleta cross-LLM para Sonnet 4.7+ quando disponível.
- **Idempotency key:** `sha256(anthropic|claude-opus-4-7|${prompt_id}|${prompt_text}|${date_iso})`.
- **Quirks:** Claude com web search retorna `usage` adicional para tool result tokens. `tools` array suporta tipo `web_search_20250305` com limite `max_uses` para controlar custo. Modelo Opus é deliberadamente mais lento (~3x latência vs. Sonnet); janela 06h00–09h00 BRT pode precisar ser estendida em 30min.

### Gemini — Google gemini-3-pro

- **Endpoint:** `POST https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro:generateContent?key=${GOOGLE_API_KEY}` (ou via Vertex AI para enterprise).
- **Auth:** API Key (key= no query) ou OAuth2 Bearer para Vertex.
- **Headers:** `Content-Type: application/json`.
- **Body:** `{"contents":[{"role":"user","parts":[{"text": prompt_text}]}], "systemInstruction":{"parts":[{"text": SYSTEM_GEO}]}, "generationConfig":{"temperature":0.0,"maxOutputTokens":2048}, "tools":[{"googleSearch":{}}]}` quando browsing requerido.
- **Timeout:** 30s padrão; 60s com `googleSearch` tool.
- **Parsing:** `response.candidates[0].content.parts[].text` concatenado; `response.candidates[0].groundingMetadata.{groundingChunks, webSearchQueries}` para sources; `response.usageMetadata.{promptTokenCount, candidatesTokenCount}`.
- **Error handling:** 429 → backoff; 503 → retry; 400 com `RESOURCE_EXHAUSTED` → permanente até reset diário. Vertex AI tem retry mais resiliente.
- **Rate limit:** API gratuita 15 RPM; pago Tier 1 360 RPM, Tier 2 1.000 RPM, Tier 3 2.000 RPM. Vertex AI 600 QPM por região como padrão.
- **Custo por chamada estimado** (gemini-3-pro projeção USD 1,25 input / USD 5,00 output por 1M tokens, mantendo perfil 1.5-pro):
  - Prompt curto (1.500 in + 800 out): USD 0,002 + USD 0,004 = **R$ 0,031**.
  - Com Google Search grounding: +USD 0,035 por request (cobrança por grounded request, não por token), totalizando **R$ 0,213**.
  - Diário 75 prompts ≈ R$ 2,50–16,00 (depende de quanto Google Search é usado).
- **Idempotency key:** `sha256(google|gemini-3-pro|${prompt_id}|${prompt_text}|${date_iso})`.
- **Quirks:** Gemini com `googleSearch` tool retorna `groundingMetadata` com `groundingChunks` (web URIs e snippets) e `groundingSupports` (mapeamento token→source). Esse formato é mais rico que ChatGPT search e Perplexity para extração de URL canônica. Google Search grounding é cobrado por request, não por token — bom para FinOps mas exige tracking separado. Vertex AI exige autenticação ADC e tem latência ligeiramente menor que o endpoint AI Studio.

### Perplexity — sonar-pro

- **Endpoint:** `POST https://api.perplexity.ai/chat/completions`
- **Auth:** `Authorization: Bearer ${PERPLEXITY_API_KEY}`.
- **Headers:** `Content-Type: application/json`.
- **Body:** `{"model":"sonar-pro","messages":[{"role":"system","content": SYSTEM_GEO},{"role":"user","content": prompt_text}], "temperature": 0.2, "search_recency_filter":"month", "return_citations": true, "return_images": false}`.
- **Timeout:** 60s (Perplexity SEMPRE faz busca; nunca é puramente paramétrico).
- **Parsing:** `response.choices[0].message.content` para texto; `response.citations[]` é array de URLs (sem texto, sem score) — é o formato mais simples dos seis provedores.
- **Error handling:** 429 → backoff; 5xx → retry; 401 → permanente.
- **Rate limit:** Tier público 50 RPM; Tier Pro 600 RPM via API key dedicada.
- **Custo por chamada estimado:**
  - Prompt 1.500 in + 1.500 out: USD 0,0045 + USD 0,0225 = **R$ 0,140**.
  - Diário 75 prompts ≈ R$ 10,50.
  - Perplexity tem o output mais verboso entre os seis (responde com 1.500–3.000 tokens de saída tipicamente).
- **Idempotency key:** `sha256(perplexity|sonar-pro|${prompt_id}|${prompt_text}|${date_iso})`.
- **Quirks:** Perplexity sonar-pro é RAG-native obrigatório para o cohort. `return_citations: true` é o flag canônico para capturar URLs (sem ele, citações vão inline no texto). `search_recency_filter` aceita `hour`, `day`, `week`, `month`, `year` — programa GEO IPOG usa `month` para coletas de descoberta e `week` para auditorias de drift. Perplexity NÃO tem prompt caching; coleta diária paga 100% input em todas as 75 chamadas. Sensor obrigatório: ausência de Perplexity por 24h declara coleta inválida (`dashboards/RUNBOOK-COLETA-LLM.md` validação fail-loud).

### Grok — xAI grok-4

- **Endpoint:** `POST https://api.x.ai/v1/chat/completions` (compatível OpenAI).
- **Auth:** `Authorization: Bearer ${XAI_API_KEY}`.
- **Headers:** `Content-Type: application/json`.
- **Body:** mesmo formato OpenAI; `{"model":"grok-4","messages":[...], "temperature":0.0, "max_tokens":2000, "search_parameters":{"mode":"on","sources":[{"type":"x"},{"type":"web"}]}}` para Live Search.
- **Timeout:** 30s padrão; 90s com Live Search ativo (Grok com X search é o mais lento dos seis).
- **Parsing:** `response.choices[0].message.content` (compatível OpenAI); citations em `response.citations[]` quando search ativa.
- **Error handling:** 429 → backoff; 5xx → retry; 401 → permanente. Grok é o provedor com maior taxa observada de 5xx transientes (~2-3% conforme RUNBOOK).
- **Rate limit:** 60 RPM tier padrão; tiers maiores via x.ai Enterprise.
- **Custo por chamada estimado** (grok-4 projeção USD 5/1M input, USD 15/1M output mantendo perfil grok-2 com markup):
  - Prompt 1.500 in + 800 out: USD 0,007 + USD 0,012 = **R$ 0,099**.
  - Com Live Search ativa: +USD 0,025 por chamada (cobrança por search session) = **R$ 0,229**.
- **Idempotency key:** `sha256(xai|grok-4|${prompt_id}|${prompt_text}|${date_iso})`.
- **Quirks:** Grok Live Search puxa de X (Twitter) por padrão — pode contaminar respostas com conteúdo redes sociais não-curado. Programa GEO IPOG usa `sources: [{"type":"web"}]` apenas, excluindo X, exceto em coletas específicas de auditoria de menção em redes. Resposta tende a ser mais curta que ChatGPT/Claude (~600-1.000 tokens médios). Operador da coleta marca `resposta-curta` quando output_tokens < 300 conforme `prompts/KIT-PROMPTS-V0.md`.

### Copilot — Microsoft copilot-2026

- **Endpoint:** Microsoft 365 Copilot via Graph API: `POST https://graph.microsoft.com/v1.0/me/copilot/chats/${chatId}/messages` (cenário mais robusto). Alternativa para coleta automatizada: Bing Search API + LLM wrapper, ou Azure OpenAI com `gpt-4o` + Bing grounding (não é o "Copilot real" do produto Microsoft — discrepância documentada).
- **Auth:** OAuth2 (Microsoft Graph) ou API key (Azure).
- **Headers:** `Authorization: Bearer ${MS_GRAPH_TOKEN}`, `Content-Type: application/json`.
- **Body (Graph API):** `{"body":{"content": prompt_text, "contentType":"text"}}`.
- **Body (Azure OpenAI com Bing grounding):** request OpenAI padrão + extension config para Bing Search.
- **Timeout:** 60s.
- **Parsing:** Graph response carrega `body.content`; Azure OpenAI carrega no formato `chat/completions` + `data_sources` para citations.
- **Error handling:** 401 (token expirado) → refresh OAuth; 429 → backoff. Graph API tem rate limits compartilhados com tenant — coleta GEO IPOG deve usar tenant dedicado.
- **Rate limit:** Graph API 10.000 requests/10min por app por tenant (default). Azure OpenAI conforme deployment.
- **Custo por chamada estimado:**
  - Microsoft 365 Copilot é incluído em assinatura (USD 30/usuário/mês). Cobrança não é por chamada — é por seat. Programa GEO IPOG aloca 1 seat dedicado: **R$ 156,00/mês fixo**, custo marginal por chamada zero, mas com limite operacional via rate limit Graph.
  - Azure OpenAI proxy: cobra como gpt-4o (USD 2,50/1M in, USD 10/1M out) + Bing Search USD 4/1.000 transações.
- **Idempotency key:** `sha256(microsoft|copilot-2026|${prompt_id}|${prompt_text}|${date_iso})`.
- **Quirks:** Copilot é o LLM mais difícil de automatizar com fidelidade. O "Copilot" da interface oficial usa orchestration interna não-exposta na API. Pipeline GEO IPOG adota híbrido: (a) coleta primária via Graph API com seat dedicado para fidelidade ao produto real; (b) fallback Azure OpenAI + Bing grounding quando Graph indisponível, com flag `copilot_simulado: true` no log. KPIs mensais comparam apenas leituras com `copilot_simulado: false`.

### Tabela consolidada de custo por LLM (estimativa diária do programa)

Considerando 75 prompts × 1 execução × 6 LLMs por dia, sem cache, com search ativa em prompts onde aplicável:

| LLM | Custo médio/chamada (R$) | Custo diário sem cache (R$) | Latência p95 esperada (ms) | TPM/RPM tier requerido |
|---|---|---|---|---|
| ChatGPT (gpt-5.0) | 0,104–0,156 | 7,80–11,70 | 8.000 | Tier 3+ (3000+ RPM) |
| Claude (claude-opus-4-7) | 0,338–0,427 | 25,40–32,00 | 14.000 | Tier 3+ (1.000 RPM) |
| Gemini (gemini-3-pro) | 0,031–0,213 | 2,30–16,00 | 6.000 | Tier 2+ (1.000 RPM) |
| Perplexity (sonar-pro) | 0,140 | 10,50 | 12.000 | Tier Pro |
| Grok (grok-4) | 0,099–0,229 | 7,40–17,20 | 22.000 | Tier 2 |
| Copilot (copilot-2026 via seat) | ~0,00 marginal | 5,20 (R$ 156/30) | 18.000 | 1 seat dedicado |
| **Total diário** | — | **R$ 58,60–92,60** | — | — |
| **Total mensal (30 dias)** | — | **R$ 1.758–2.778** | — | — |

Comparado ao teto de USD 15,00 (R$ 78,00) por sprint para coleta cross-LLM em `dashboards/FINOPS-DISCIPLINA.md`, este número estoura em ~22-35× o teto vigente. **Decisão FinOps requerida em revisão executiva mensal:** ou (a) recalibrar teto da coleta diária para R$ 1.800–2.800/mês considerando o novo cohort com modelos premium 2026; ou (b) downgradar Claude da coleta cross-LLM para Sonnet 4.7+ quando disponível, mantendo Opus apenas no papel Revisor do pipeline editorial; ou (c) reduzir a bateria diária de 75 para um subset de 30-40 prompts críticos com recoleta semanal completa. A escolha precisa registro em ata mensal antes de operar Fase 1 em regime full.

## Bloco D — Drift detection

Drift detection captura mudança silenciosa de comportamento do provedor (provedor atualiza modelo sem comunicar; alteração de temperatura padrão; ajuste em sistema de moderação). Sem drift detection, série temporal pode acusar falsa subida ou queda de Mention Rate.

### Hash do prompt canônico

Para cada `(provider, model, prompt_id)`, calcular `prompt_canonical_hash = sha256(provider + "|" + model_version_pinada + "|" + system_prompt + "|" + prompt_text + "|" + str(temperature) + "|" + str(top_p) + "|" + tools_config_serialized)`. Mudança em qualquer componente quebra o hash e exige nova baseline.

### Checksum semântico da resposta

Hash literal SHA-256 da resposta tem alta entropia (qualquer mudança de pontuação muda o hash). Para drift, usar checksum semântico que tolera variação superficial mas captura mudança estrutural. Duas opções avaliadas:

**Opção 1 — Embedding similarity (recomendada).** Computa embedding (OpenAI text-embedding-3-small ou voyage-3-lite, ambos baratos) da resposta. Similaridade de cosseno entre embedding atual e centroide das últimas 30 leituras do mesmo `(provider, prompt_id)`. Trade-off: custo extra de USD 0,02/1M tokens (negligível) e latência adicional de ~200ms. Captura mudança semântica real (provedor passou a recusar, passou a sugerir concorrente A em vez de B, mudou de tom).

**Opção 2 — Simhash sobre n-grams (fallback).** Simhash de 64 bits sobre tokens normalizados (lowercase, stemmed, sem stopwords). Distância de Hamming entre simhash atual e simhash mediano. Trade-off: zero custo adicional, captura apenas mudança lexical superficial. Adotada quando embedding API indisponível.

### Threshold de mudança

Para embedding similarity: drift acusado quando similaridade de cosseno cai abaixo de 0,82 em relação ao centroide histórico (calibrado em 2026-04-30 a partir de série de 30 dias de coletas piloto; reajustar trimestralmente).

Para simhash: drift acusado quando distância de Hamming excede 18 (de 64 bits).

### Disparo: 3+ queries no mesmo provedor no mesmo dia

Drift isolado em uma query é ruído. Drift confirmado em 3+ queries no mesmo provedor no mesmo dia é sinal de mudança real. O algoritmo:

1. Para cada `(provider, prompt_id)`, manter os últimos 30 hashes (literais) + últimos 30 embeddings.
2. Calcular entropia das respostas em janelas 7d e 30d. Entropia 7d divergindo mais de 2 desvios padrão da entropia 30d marca o par como `drift-suspect`.
3. Quando 3+ pares do mesmo provedor estão em `drift-suspect` no mesmo dia, o provedor entra em estado `drift-confirmed`.
4. Pipeline registra evento em `fct_drift_events` com `is_confirmed = true`.
5. GitHub Issue automático criado via API: title `[drift-detected] {provider} {date}`, label `drift-detected`, body com lista das queries afetadas e métricas.
6. Coletas dos próximos 3 dias gravam `under_drift_review = true` no `fct_collection`.
7. Comparações temporais cross-period são interrompidas no ponto de drift; série é segmentada antes/depois com flag visual nos dashboards.
8. Decisão executiva (Alexandre Caramaschi) em até 5 dias úteis: aceitar nova versão como ponto de continuidade (e atualizar `dim_llm` com nova versão pinada) ou pinar versão anterior se ainda disponível na API do provedor.

### Cuidados anti falso-positivo

Drift legítimo pode ser confundido com efeito de eventos externos (feriado, breaking news que mude resposta). Pipeline aplica três salvaguardas:

- Janela de 7 dias é mediana móvel, não pontual; um único dia ruidoso não dispara.
- Drift que coincide com janela conhecida de manutenção do provedor (status page do provedor) é registrado mas não alerta crítico.
- Drift que coincide com lançamento conhecido de modelo (anúncio público no dia anterior) é tratado como deprecation gracioso, não alerta de incidente.

## Bloco E — Idempotency e cache

### Política de chave

`cache_key = sha256(provider + "|" + model_pinned_version + "|" + prompt_id + "|" + prompt_text + "|" + date_bucket)`

Onde `date_bucket` depende do KPI:

| KPI alimentado | Date bucket | TTL |
|---|---|---|
| KPI 1 (Mention Rate diário) | `YYYY-MM-DD` (ISO date) | 24h |
| KPI 2 (Share-of-Voice quinzenal) | `YYYY-MM-DD` (mesmo dia) — agregação acumula leituras diárias | 24h base + 7d agregação |
| KPI 3 (Citation Quality semanal) | `YYYY-MM-DD` | 24h base + 7d agregação |
| KPI 8 (Delta pré/pós onda) | `YYYY-MM-DD` | 24h |

A política canônica é: cache base por chamada vale 24h (idempotência diária); rollups derivados (KPI 2, 3) têm seu próprio cache de 7d sobre as views materializadas no warehouse, não sobre as chamadas de API.

### Storage do cache

Recomendação primária: **Cloudflare KV**.

- Justificativa: cohort de coleta opera em janela 06h00–09h00 BRT, picos curtos com leitura no resto do dia. KV é eventualmente consistente (latência ~30s para propagar globalmente) mas leitura quente é <10ms. Custo: USD 0,50 por 1M reads, USD 5 por 1M writes, USD 0,50/GB-mês.
- Volume estimado: 450 writes/dia + 450 reads/dia = ~13.500 ops/mês. Custo mensal: <USD 0,10 (R$ 0,52). Negligível.
- TTL nativo: KV suporta `expirationTtl` no PUT, ideal para 24h.

Fallback 1: **Redis Upstash serverless**.

- Justificativa: latência <5ms global, MULTI/EXEC para operações atômicas (drift detection precisa de read-modify-write). Custo: USD 0,20 por 100k commands, USD 0,25/GB-mês.
- Volume estimado: 13.500 commands/mês = USD 0,03/mês. Também negligível.
- Trade-off vs. KV: melhor para drift detection, pior para volume puro de cache.

Fallback 2: **SQLite WAL local**.

- Justificativa: zero custo, zero latência de rede, ideal quando pipeline é monolito local. Trade-off: não compartilhável entre workers em VMs distintas.
- Adotado apenas em ambiente de dev/teste.

### Cache invalidation strategy

Cinco condições invalidam cache antes do TTL natural:

1. **Drift confirmado:** invalidar todas as chaves do `(provider, prompt_id)` afetado nos últimos 30 dias para forçar re-coleta sem cache.
2. **Versão pinada mudou:** ao atualizar `dim_llm` com nova `model_pinned_version`, todas as chaves do provedor antigo passam a ser inalcançáveis (chaves usam `model_pinned_version` no hash) — invalidação implícita.
3. **Kit de prompts mudou:** ao bump v0 → v1, prompts modificados têm novo `prompt_text`, logo nova chave; prompts inalterados continuam servindo do cache do `prompt_text` original.
4. **Backfill manual:** CLI `geo-coleta backfill --invalidate-cache` força re-coleta para janela específica.
5. **Erro de execução prévia:** chave que recebeu execução com `error_code != null` não é re-servida do cache; próxima execução re-tenta.

### Cache hit rate alvo

Em operação estável: 5-15% nos primeiros 7 dias após bump de kit; 0% após estabilização (cada dia é cache miss porque `date_bucket` muda). O cache real de FinOps é o cache de retry e de re-coleta no mesmo dia (incidente de rede); o cache hit > 80% é sinal de configuração errada (TTL longo demais ou date_bucket mal definido) — alarme em `dashboards/RUNBOOK-COLETA-LLM.md` seção "Como monitorar".

## Bloco F — FinOps tracking

### Custo por chamada por LLM (resumo)

Reapresentado no Bloco C; resumo:

| LLM | Custo médio típico (R$/chamada) | Variabilidade |
|---|---|---|
| Gemini gemini-3-pro (sem search) | 0,031 | Baixa |
| Grok grok-4 | 0,099 | Média (Live Search +130%) |
| ChatGPT gpt-5.0 | 0,104 | Média (web_search +50%) |
| Perplexity sonar-pro | 0,140 | Baixa (sempre faz busca, mais previsível) |
| Gemini com Google Search | 0,213 | Alta |
| Claude claude-opus-4-7 | 0,338 | Baixa (sem search) a 0,500 com web_search |
| Copilot via seat | 0,00 marginal (R$ 5,20/dia fixo) | Zero |

### Cenário 1 — Mínimo (subset 30 prompts críticos × 6 LLMs, 30 dias/mês, sem search agressiva)

- Total chamadas: 30 × 6 × 30 = 5.400 chamadas/mês.
- Custo médio ponderado: R$ 0,17/chamada.
- **Total mensal: R$ 918,00.**

### Cenário 2 — Esperado (75 prompts × 6 LLMs × 30 dias/mês, com search nos provedores RAG)

- Total chamadas: 75 × 6 × 30 = 13.500 chamadas/mês.
- Custo médio ponderado: R$ 0,18/chamada.
- **Total mensal: R$ 2.430,00.**

### Cenário 3 — Máximo (75 prompts × 6 LLMs × 30 dias + spot-checks 2x/semana + auditoria mensal completa + paráfrase trimestral pro-rata)

- Coleta diária: R$ 2.430,00.
- Spot-checks (15 prompts críticos × 6 LLMs × 8 dias): 720 × R$ 0,18 = R$ 130,00.
- Auditoria NAIA cross-LLM mensal (extras): R$ 250,00.
- Paráfrase trimestral pro-rata: R$ 600,00 / 3 = R$ 200,00/mês.
- **Total mensal: R$ 3.010,00.**

Mediana mensal projetada para Fase 1 estável: **R$ 2.500–2.700**.

### Alertas por threshold

Pipeline aplica budget guards em três níveis (por sprint de 4 semanas, com teto recalibrado abaixo do cenário 3):

| Threshold (% do teto sprint) | Ação automática | Notificação |
|---|---|---|
| 50% | Log informativo | Slack #geo-ipog-finops |
| 80% | Alerta acionável; gera projeção até fim da sprint | Slack + e-mail Alexandre Caramaschi e Bruno Azambuja |
| 95% | Pipeline editorial entra em modo "freeze não-essencial"; coleta cross-LLM continua (é o sensor crítico) | E-mail urgente + decisão executiva requerida |
| 100% | **Block automático.** Coleta cross-LLM para. Re-aprovação manual. | Alerta crítico Slack + chamada |

Recalibração proposta para revisão executiva: teto sprint coleta cross-LLM passa de USD 15 (R$ 78) para R$ 700 (4 semanas × R$ 175 = ~R$ 700). Total sprint: R$ 700 (coleta) + R$ 130 (editorial) + R$ 26 (audits) + R$ 26 (reserva) = R$ 882, contra os R$ 260 (USD 50) atuais. Esse 3,4× reflete o salto de pricing de modelos premium 2026 e o cohort completo. Decisão de Alexandre Caramaschi + Bruno Azambuja em ata mensal.

### Emergency stop por LLM

Cada provedor tem circuit breaker de FinOps independente:

- **Trip:** custo acumulado do provedor no dia ultrapassa 1,5× o esperado (calculado a partir da mediana móvel 7d).
- **Comportamento:** worker do provedor entra em estado `cost-limited`; chamadas pendentes na queue são paradas; alerta crítico.
- **Reset:** automático às 00h00 BRT do dia seguinte; manual via CLI `geo-coleta reset --provider claude` para reabrir antes.

Trade-off: emergency stop pode invalidar coleta do dia (sem Perplexity → coleta inválida). Política: emergency stop por FinOps NÃO se aplica a Perplexity (sensor obrigatório); aplica-se apenas aos demais cinco. Perplexity em cost overrun escala para Alexandre imediatamente sem stop automático.

## Bloco G — Schemas de dados (JSONL)

Schema canônico de cada execução persistida em `data/coleta/YYYY-MM-DD.jsonl`, uma linha por chamada.

### Schema completo (validado por pydantic)

```json
{
  "$schema": "https://geo-ipog.brasilgeo.com.br/schemas/coleta-cross-llm-v1.json",
  "type": "object",
  "required": [
    "collection_id", "timestamp", "run_at_date", "provider", "model",
    "model_pinned_version", "prompt_id", "prompt_text", "prompt_sha256",
    "cluster", "persona_alvo", "etapa_jornada", "kit_version",
    "latency_ms", "tokens_input", "tokens_output", "cost_usd", "cost_brl",
    "cambio_dia", "response_text", "response_hash", "ipog_mentioned",
    "ipog_position", "ipog_citation_quality", "competitors_mentioned",
    "cache_hit", "under_drift_review", "pipeline_version"
  ],
  "properties": {
    "collection_id": {"type": "string", "format": "uuid"},
    "timestamp": {"type": "string", "format": "date-time"},
    "run_at_date": {"type": "string", "format": "date"},
    "provider": {"enum": ["openai", "anthropic", "google", "perplexity", "xai", "microsoft"]},
    "model": {"type": "string"},
    "model_pinned_version": {"type": "string"},
    "model_version_observed": {"type": ["string", "null"]},
    "prompt_id": {"type": "string", "pattern": "^K-[A-Z]{2,4}-[0-9]{3}$"},
    "prompt_version": {"type": "integer"},
    "prompt_text": {"type": "string"},
    "prompt_sha256": {"type": "string", "pattern": "^[a-f0-9]{64}$"},
    "cluster": {"enum": ["C1", "C2", "C3", "transversal", "descoberta-avancada", "head-to-head", "objecao"]},
    "persona_alvo": {"enum": ["P1","P2","P3","P4","P5","P6","P7","Multi"]},
    "etapa_jornada": {"enum": ["J1", "J2", "J3", "J4"]},
    "kit_version": {"type": "string"},
    "latency_ms": {"type": "integer"},
    "tokens_input": {"type": "integer"},
    "tokens_output": {"type": "integer"},
    "cost_usd": {"type": "number"},
    "cost_brl": {"type": "number"},
    "cambio_dia": {"type": "number"},
    "response_text": {"type": "string"},
    "response_hash": {"type": "string", "pattern": "^[a-f0-9]{64}$"},
    "response_embedding_id": {"type": ["string", "null"]},
    "sources_cited": {"type": ["array", "null"], "items": {"type": "string"}},
    "ipog_mentioned": {"type": "boolean"},
    "ipog_position": {"type": ["integer", "null"]},
    "mention_correta_canonica": {"type": "boolean"},
    "ipog_citation_quality": {"type": "integer", "minimum": 0, "maximum": 5},
    "cq_subdimensions": {
      "type": "object",
      "properties": {
        "presenca_nominal": {"type": "boolean"},
        "formato_declarado": {"type": "boolean"},
        "diferencial_editorial": {"type": "boolean"},
        "link_canonico": {"type": "boolean"},
        "autoridade_contextual": {"type": "boolean"}
      }
    },
    "competitors_mentioned": {"type": "array", "items": {"type": "string"}},
    "cache_hit": {"type": "boolean"},
    "under_drift_review": {"type": "boolean"},
    "error_code": {"type": ["string", "null"]},
    "error_message": {"type": ["string", "null"]},
    "pipeline_version": {"type": "string"},
    "tool_calls": {"type": ["array", "null"]}
  }
}
```

### Exemplo concreto — execução bem-sucedida

```jsonl
{"collection_id":"a8b9c1d2-3e4f-4a5b-9c6d-7e8f9a0b1c2d","timestamp":"2026-05-07T13:42:18.452Z","run_at_date":"2026-05-07","provider":"perplexity","model":"sonar-pro","model_pinned_version":"sonar-pro","model_version_observed":"sonar-pro-202604","prompt_id":"K-C1-001","prompt_version":1,"prompt_text":"Quais MBAs online em psicologia organizacional reconhecidos pelo MEC existem no Brasil em 2026?","prompt_sha256":"7f3a2c8b9d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a","cluster":"C1","persona_alvo":"P3","etapa_jornada":"J1","kit_version":"v0","latency_ms":11432,"tokens_input":1487,"tokens_output":2103,"cost_usd":0.0360,"cost_brl":0.1872,"cambio_dia":5.2000,"response_text":"Em 2026, os principais MBAs online em Psicologia Organizacional reconhecidos pelo MEC no Brasil incluem: 1. IPOG (Instituto de Pos-Graduacao e Graduacao) - oferece o MBA Online em Psicologia Organizacional com modalidade Ao Vivo sincrona, reconhecido pelo MEC como especializacao lato sensu... 2. Anhanguera (Cogna) - especializacao em Psicologia do Trabalho... 3. Estacio (Yduqs) - pos em Psicologia Organizacional EAD assincrono...","response_hash":"e2f1a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2","response_embedding_id":"emb_b3c4d5e6f7a8","sources_cited":["https://www.ipog.edu.br/cursos/mba-psicologia-organizacional/","https://anhanguera.com/pos/psicologia-do-trabalho","https://emec.mec.gov.br"],"ipog_mentioned":true,"ipog_position":1,"mention_correta_canonica":true,"ipog_citation_quality":5,"cq_subdimensions":{"presenca_nominal":true,"formato_declarado":true,"diferencial_editorial":true,"link_canonico":true,"autoridade_contextual":true},"competitors_mentioned":["anhanguera","estacio","uninter","unicesumar"],"cache_hit":false,"under_drift_review":false,"error_code":null,"error_message":null,"pipeline_version":"1.0.0","tool_calls":null}
```

### Exemplo — execução com cache hit

```jsonl
{"collection_id":"b1c2d3e4-5f6a-4b7c-8d9e-0f1a2b3c4d5e","timestamp":"2026-05-07T06:01:03.118Z","run_at_date":"2026-05-07","provider":"openai","model":"gpt-5.0","model_pinned_version":"gpt-5.0","prompt_id":"K-TR-003","prompt_version":1,"prompt_text":"O que e o IPOG?","prompt_sha256":"8a4b3c9d0e2f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b","cluster":"transversal","persona_alvo":"Multi","etapa_jornada":"J1","kit_version":"v0","latency_ms":12,"tokens_input":0,"tokens_output":0,"cost_usd":0.0000,"cost_brl":0.0000,"cambio_dia":5.2000,"response_text":"[CACHED — see collection_id a1b2c3d4-e5f6-4789-0abc-def012345678]","response_hash":"f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4","ipog_mentioned":true,"ipog_position":1,"mention_correta_canonica":true,"ipog_citation_quality":4,"competitors_mentioned":[],"cache_hit":true,"under_drift_review":false,"error_code":null,"pipeline_version":"1.0.0"}
```

### Exemplo — execução com erro (rate limit não recuperado)

```jsonl
{"collection_id":"c4d5e6f7-8a9b-4c0d-1e2f-3a4b5c6d7e8f","timestamp":"2026-05-07T07:15:42.892Z","run_at_date":"2026-05-07","provider":"anthropic","model":"claude-opus-4-7","model_pinned_version":"claude-opus-4-7","prompt_id":"K-C2-005","prompt_version":1,"prompt_text":"Compare a pos-graduacao em neuropsicologia online do IPOG com PUC-SP, IBNeuro e InEPP.","prompt_sha256":"9c5d4e3f2a1b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d","cluster":"C2","persona_alvo":"P2","etapa_jornada":"J2","kit_version":"v0","latency_ms":31000,"tokens_input":0,"tokens_output":0,"cost_usd":0.0000,"cost_brl":0.0000,"cambio_dia":5.2000,"response_text":"","response_hash":"","ipog_mentioned":false,"ipog_position":null,"mention_correta_canonica":false,"ipog_citation_quality":0,"competitors_mentioned":[],"cache_hit":false,"under_drift_review":false,"error_code":"rate_limit_exceeded","error_message":"429 from anthropic after 3 retries; circuit breaker opened","pipeline_version":"1.0.0"}
```

### Validação fail-loud no fim do dia

Job de validação às 09h00 BRT lê todas as linhas de `data/coleta/YYYY-MM-DD.jsonl`, agrega:

- `coverage_per_provider = (linhas com error_code IS NULL) / (75 linhas esperadas por provider)`.
- Coleta válida exige: cada provider >= 95%; Perplexity = 100%; latência mediana por provider <= 30s padrão / 60s com browsing.
- Coleta inválida grava marcador em `data/coleta/YYYY-MM-DD.invalid.json` e dispara alerta. KPIs do dia ficam como "sem leitura".

## Bloco H — Backfill e replay

Quatro cenários canônicos de backfill, cada um com playbook próprio. Em todos os casos, backfill respeita o princípio fundamental do programa: cohort fixo, versão pinada, N mínimo, série não contaminada. Backfill que mistura versões é proibido.

### Cenário 1 — Adicionar novo concorrente (Onda 3, Onda 4)

Quando o programa adiciona um concorrente ao monitoramento (ex.: Onda 3 inclui novo entrante RAG-native em Psicologia), o pipeline NÃO precisa re-executar coletas históricas. As respostas das LLMs já mencionavam (ou não) o concorrente; mudança é no pós-processamento.

Playbook:

1. Adicionar entrada em `data/concorrentes.yaml` com slug, nome, aliases, dossiê.
2. Bump `dim_concorrente.version` (type-2).
3. Re-rodar pós-processamento de extração de concorrentes em todas as linhas de `fct_collection` dos últimos 90 dias (ou desde a data em que o concorrente entrou em operação relevante). Esse job é assíncrono e não impacta a coleta diária.
4. Re-materializar `fct_share_of_voice_biweekly` com o dicionário atualizado.
5. Registrar em ata da reunião mensal a data do bump e a janela re-processada.

Custo de backfill cenário 1: zero (apenas pós-processamento, sem chamadas a LLM).

### Cenário 2 — Adicionar novo prompt no kit (bump v0 → v1)

Novo prompt entra na bateria; prompts antigos seguem com mesmo `prompt_id`. NÃO há contaminação retroativa.

Playbook:

1. Atualizar `prompts/KIT-PROMPTS-V0.md` (ou criar `KIT-PROMPTS-V1.md`).
2. Bump `dim_prompt` (type-2): linha nova com `prompt_version` incrementado para prompts modificados; linhas inalteradas ficam como estão.
3. Coleta diária do dia seguinte já enumera os novos prompts.
4. Histórico do prompt antigo permanece intacto.
5. Para prompts NOVOS sem histórico, marcar nas séries temporais como início em `created_at`.

Custo de backfill cenário 2: nulo (não há re-coleta retroativa).

### Cenário 3 — Drift confirmado, baseline contaminada

Drift detector acusou drift confirmado em provedor X em data D. Tudo a partir de D-1 (inclusive, pela natureza da janela 7d) está sob suspeita.

Playbook:

1. Confirmar drift via revisão manual de 5 respostas afetadas vs. respostas históricas pré-drift.
2. Decisão executiva: aceitar nova versão como continuidade OU pinar versão antiga se ainda disponível na API.
3. Caso "aceitar continuidade": atualizar `dim_llm` com nova `model_pinned_version` e novo `version_fixed_at`. Série temporal segmentada visualmente nos dashboards no ponto de drift.
4. Caso "pinar antiga": invalidar cache do provedor por 30 dias passados; re-coletar com versão antiga via parâmetro de versão na API (quando suportado por OpenAI snapshot, Anthropic com versão específica, etc.). Se versão antiga não está mais acessível, série fica segmentada e baseline reinicia.
5. Para o KPI 8 (Delta pré/pós onda), eventos de drift que cruzam onda invalidam o delta dessa onda (não interpolar — sem leitura).

Custo de backfill cenário 3: alto. Re-coleta de 30 dias × 75 prompts × 1 provedor × R$ 0,18/chamada = R$ 405 + janela administrativa. Decisão de re-coletar precisa registro em ata.

### Cenário 4 — Bug no pipeline, histórico precisa re-processamento

Bug introduzido em pipeline_version V causou cálculo errado de `citation_quality_score` para todas as linhas executadas em janela [V_start, V_end]. As respostas brutas (`response_text`, `response_hash`) estão íntegras no JSONL — apenas o pós-processamento foi afetado.

Playbook:

1. Diagnóstico: comparar saída do pipeline V com pipeline V-1 em conjunto de teste; produzir patch.
2. Bump `pipeline_version` (V+1). Mudança em `dim_collection.pipeline_version`.
3. Re-executar pós-processamento sobre janela afetada lendo `response_text` do JSONL (não chamando LLM) e gravando colunas afetadas em `fct_collection`.
4. Adicionar coluna `pipeline_version_reprocessed_at` (timestamp) para auditoria.
5. Re-materializar tabelas derivadas (`fct_mention_rate_daily`, `fct_share_of_voice_biweekly`, `fct_finops_daily` quando custo for afetado).
6. Anotar incidente em GitHub Issue com label `incident` + `pipeline-bug` + janela afetada.
7. Comunicar Bruno Azambuja se KPIs de leituras já reportadas mudaram após reprocessamento.

Custo de backfill cenário 4: zero em LLM (não chama API), apenas custo de compute para pós-processamento — desprezível.

### Política comum a todos os cenários

- Backfill nunca substitui leitura inválida por estimativa.
- Backfill que afeta KPIs já reportados executivamente é comunicado a Bruno e Alexandre antes de propagar.
- Toda execução de backfill é registrada em `data/backfill-runs/YYYY-MM-DD-{cenario}.json` com escopo, motivo, janela e resultado.

## Bloco I — Observability do pipeline

Observability é tratada como pré-requisito de operação, não como nice-to-have. Métricas e logs essenciais são coletados em três camadas:

### Camada 1 — Métricas operacionais (tempo real)

Exportadas via OpenTelemetry para backend de tracing (recomendação: Axiom; fallback Datadog).

| Métrica | Fonte | Alerta |
|---|---|---|
| `coleta.latencia.ms` | Histograma p50/p95/p99 por provider, por prompt_id | p95 > 2× mediana 7d |
| `coleta.throughput.calls_per_min` | Counter por provider | < 50% do esperado em janela ativa |
| `coleta.error_rate` | Ratio de chamadas com `error_code != null` por provider | > 5% em 60s |
| `coleta.circuit_open.events` | Counter de transições closed→open | 4+ providers em open simultâneo |
| `coleta.cache.hit_rate` | Ratio cache_hit / total | > 80% (sinal de TTL errado) ou < 0,5% no início da janela (sinal de cache off) |
| `coleta.cost.usd_per_provider_per_day` | Gauge cumulativo | > 1,5× mediana 7d |
| `coleta.cost.budget_burn_rate` | Sprint cost / sprint elapsed | Projeção de fim de sprint > 100% do teto |
| `coleta.drift.suspect_pairs` | Counter de pares (provider, prompt_id) em drift-suspect | 3+ no mesmo provider, mesmo dia |
| `coleta.coverage.percent_per_provider` | Gauge calculado às 09h00 BRT | < 95% (provider não-Perplexity) ou < 100% (Perplexity) |

### Camada 2 — Logs estruturados (JSONL)

Já cobertos no Bloco G. Acessíveis via:

- `data/coleta/YYYY-MM-DD.jsonl` (hot, 90 dias).
- R2 cold storage particionado.
- DuckDB warehouse para analytics.

Logs adicionais não cobertos no JSONL principal:

- `data/coleta/YYYY-MM-DD.runtime.log` — logs de execução do pipeline (nível INFO/WARN/ERROR), em formato JSON estruturado.
- `data/finops/YYYY-MM.jsonl` — log de FinOps detalhado (já no `dashboards/FINOPS-DISCIPLINA.md`).
- `data/drift/YYYY-MM-DD.jsonl` — log de drift detection.

### Camada 3 — Dashboards operacionais

Três painéis canônicos (referência em `dashboards/RUNBOOK-COLETA-LLM.md` "Como monitorar"):

**Painel A — Cobertura por provedor.** Stacked bar diário das últimas 30 datas, X = data, Y = chamadas válidas / 75. Linha alvo em 95% (e 100% em Perplexity destacado).

**Painel B — Latência por provedor.** Time series 24h, p50, p95, p99 por provider. Anotações de eventos (lançamento de modelo do provedor, manutenção declarada, drift confirmado).

**Painel C — Hashes únicos por provedor.** Time series de cardinalidade de `response_hash` em janela 7d. Queda abrupta sinaliza convergência de respostas (provedor passou a ser muito determinístico, possível drift); subida abrupta sinaliza divergência (instabilidade).

Painéis derivados:

**Painel D — Cost burn rate.** Linha cumulativa do sprint vs. teto, com extrapolação até fim do sprint.

**Painel E — Drift events.** Heatmap de drift events: linhas = provider, colunas = data, cor = severidade.

**Painel F — Cache hit rate.** Time series 30d, com anotações de TTL change ou kit bump.

### Tracing distribuído

Cada execução de coleta gera um trace OpenTelemetry com spans:

- `pipeline.coleta-diaria` (root) — todo o ciclo das 06h00 às 09h00.
- `pipeline.job-builder` — enumeração dos 450 jobs.
- `pipeline.queue-publish` — publish em Cloudflare Queues.
- `worker.{provider}.consume` — span por chamada.
- `worker.{provider}.api-call` — span da chamada HTTP em si (com tags de model, tokens, custo).
- `pipeline.persistence.write-jsonl` — gravação no JSONL.
- `pipeline.persistence.materialize-warehouse` — hidratação do DuckDB.
- `pipeline.drift-detector.run` — span do drift detector.
- `pipeline.validation.daily` — span da validação fail-loud das 09h00.

Trace IDs propagados em todos os logs. Consulta cross-cutting: "para uma coleta diária X, mostre todas as chamadas de Y provider que demoraram mais de 30s e foram mais caras que R$ 0,30".

## Bloco J — Stack tecnológica recomendada

### Linguagem

**Recomendação primária: Python 3.12+** com `httpx[async]` + `asyncio` + `pydantic` v2.

Justificativa: ecossistema rico de SDKs de provedores (`openai`, `anthropic`, `google-generativeai`, `perplexity-python`); pydantic V2 fornece schema validation + JSON Schema export; `httpx` é o cliente HTTP assíncrono mais maduro do ecossistema Python; comunidade GEO IPOG já tem expertise (a base do `geo-orchestrator` está em Python). Trade-offs: latência de cold start em serverless; GIL em workloads CPU-bound (não é o caso aqui — pipeline é I/O-bound).

**Fallback: TypeScript Node 22 LTS** com `undici` + `zod`.

Justificativa: melhor integração com Cloudflare Workers (Workers tem runtime JS nativo); TypeScript V8 isolates têm cold start <5ms; ecossistema serverless mais maduro. Trade-offs: SDKs de provedores menos completos em alguns casos (xAI, Perplexity); quando a equipe é mais Python, manutenção dispersa.

### Queue

**Recomendação primária: Cloudflare Queues.**

Justificativa: integração nativa com Cloudflare Workers e R2; pricing previsível (USD 0,40 por milhão de operações, USD 0,40 por GB de retention); sem ops; consumer groups paralelos; dead letter queue nativo. Volume estimado 14.000 ops/mês = USD <0,01.

**Fallback: Redis Streams (Upstash serverless).**

Justificativa: melhor para drift detection (operações atômicas), latência menor (<5ms global). Trade-off: pricing por operações em volumes altos pode ultrapassar Queues, mas no volume do programa (~30k ops/mês) ambos custam centavos.

**Fallback de monolito: SQLite WAL queue.**

Justificativa: zero ops, zero rede, zero custo. Adotado em dev/CI e em ambientes onde Cloudflare está indisponível. Não recomendado para produção pela ausência de coordenação distribuída.

### DB warehouse

**Recomendação primária: DuckDB + Cloudflare R2.**

Justificativa: storage colunar Parquet em R2 (USD 0,015/GB-mês egress free); DuckDB query engine local ou em Workers via WASM; queries analíticas em escala TB com custo praticamente zero. Compatível com pandas/polars. Trade-offs: não é OLTP; não é multi-tenant; queries concorrentes precisam coordenação.

**Fallback: PostgreSQL Supabase.**

Justificativa: OLTP + analytics híbrido; row-level security; auth integrado se algum dia precisar expor dashboards externos. Trade-offs: custo (USD 25/mês mínimo no plano Pro); queries analíticas em volume escalam mal sem TimescaleDB ou Citus.

**Fallback enterprise: BigQuery.**

Justificativa: query engine state-of-the-art; integração nativa com GA4 (KPI 7); ML features built-in. Trade-offs: lock-in; pricing por query pode surpreender; latência de slot allocation.

### Scheduler

**Recomendação primária: GitHub Actions cron** + **Cloudflare Worker Triggers para spot**.

Justificativa: GitHub Actions é gratuito até 2.000 min/mês em repos privados; cron `0 9 * * *` (UTC, equivale a 06h00 BRT); secrets nativos para chaves. Cloudflare Worker Triggers para coletas spot e on-demand. Trade-offs: GitHub Actions pode atrasar em janelas de pico (3-5 min de delay observado); para janelas críticas, Worker Trigger primário.

### Cache

**Recomendação primária: Cloudflare KV.**

Justificativa: já detalhado no Bloco E; baixo custo, baixa latência, TTL nativo, sem ops.

**Fallback: Redis Upstash serverless.**

### Observability

**Recomendação primária: OpenTelemetry SDK + Axiom.**

Justificativa: OTel é padrão aberto, evita lock-in. Axiom tem ingestion gratuita até 500 GB/mês, queries em ANSI SQL, dashboards customizáveis. Custo previsível. Trade-offs: ecossistema menor que Datadog; alguns plugins menos polidos.

**Fallback enterprise: Datadog.**

Justificativa: stack mais completa (APM + logs + RUM + synthetic + security); melhor UX; mais integrações. Trade-offs: caro (USD 31/host/mês para APM Pro), pricing por métrica custom pode escalar.

### Pacote consolidado de stack (recomendação primária)

| Camada | Escolha | Custo mensal estimado (R$) | Justificativa |
|---|---|---|---|
| Linguagem | Python 3.12 + httpx + pydantic | 0 | Open source |
| Queue | Cloudflare Queues | <2 | Volume baixo |
| Cache | Cloudflare KV | <2 | Volume baixo |
| Storage hot | JSONL local + commit Git | 0 | Repo privado |
| Storage cold | Cloudflare R2 | 5–15 | <100GB/ano |
| Warehouse | DuckDB + R2 | 0 | Compute local |
| Scheduler | GitHub Actions + Worker Triggers | 0 | Free tiers cobrem |
| Observability | OpenTelemetry + Axiom (free tier) | 0 | <500GB ingest |
| Embedding p/ drift | OpenAI text-embedding-3-small | 5–15 | 13.500 chamadas × 1.5k tokens |
| **Total infra** | | **R$ 12–34/mês** | Excluído custo dos LLMs (Bloco F) |

Custo total operacional do pipeline (LLMs + infra) projetado em regime full: **R$ 2.512–2.812/mês**. Comparado ao teto vigente da `dashboards/FINOPS-DISCIPLINA.md` de USD 50 (R$ 260) por sprint, o programa em Fase 1 demanda recalibração executiva de teto. Decisão antes do go-live.

### Trade-offs finais e racional

A stack acima privilegia: (a) custo baixo de infra (Cloudflare-centric); (b) compatibilidade com expertise Python da equipe Brasil GEO; (c) auditabilidade (JSONL + commits Git + dashboards públicos); (d) reversibilidade (cada componente substituível por um fallback); (e) zero lock-in com vendor de LLM (cohort fixo + tabela de preços versionada).

A stack NÃO privilegia: throughput máximo (não é necessário no volume do programa); latência sub-segundo (janela diária comporta delays); features enterprise como SSO, RBAC granular (programa GEO IPOG opera com 2 owners nominais).

Trade-off explícito sobre cohort 2026: a migração para gpt-5.0, claude-opus-4-7, gemini-3-pro, grok-4 e copilot-2026 multiplica o custo do pipeline por ~3,4× em relação à Fase 0 calibrada com modelos 2024. Isso reflete: (a) preço maior dos modelos premium 2026; (b) cobertura full do cohort (sem amostragem); (c) Perplexity sempre ligada como sensor RAG. Decisão de go-live em regime full requer aprovação executiva conjunta Alexandre Caramaschi + Bruno Azambuja com novo teto R$ 700/sprint (vs. USD 15 atuais), registrada em ata mensal antes da Fase 1.

## Cross-links

- Métricas e KPIs alimentados — `dashboards/METRICAS-CANONICAS.md`.
- Runbook conceitual da coleta — `dashboards/RUNBOOK-COLETA-LLM.md`.
- Disciplina FinOps detalhada — `dashboards/FINOPS-DISCIPLINA.md`.
- Kit de prompts canônico — `prompts/KIT-PROMPTS-V0.md`.
- Papéis editoriais (paralelo) — `prompts/PAPEIS-DE-COLETA.md`.
- Matriz de presença esperada cross-LLM — `audits/benchmarking/matriz-presenca-llm.md`.
- Definition of Done seção 5 (captura cross-LLM) — `docs/04-definicao-de-done.md`.

## Cadência de revisão deste dossiê

| Atividade | Cadência | Owner |
|---|---|---|
| Revisão de versões pinadas dos 6 LLMs vs. realidade dos provedores | Trimestral | Alexandre Caramaschi |
| Recalibração de tabela de custo por LLM | Trimestral | Alexandre Caramaschi |
| Revisão dos thresholds de drift detection | Trimestral | Alexandre Caramaschi |
| Auditoria de cache hit rate vs. esperado | Quinzenal | Pipeline operacional |
| Revisão de teto de FinOps vs. burn rate observado | Mensal | Alexandre Caramaschi + Bruno Azambuja |
| Revisão de schema do warehouse (drift de coluna) | Trimestral | Alexandre Caramaschi |
| Revisão deste documento na íntegra | Trimestral | Alexandre Caramaschi |
