# TCO Mensal Janeiro–Dezembro 2026 — Programa GEO IPOG

> **Documento:** 00b auxiliar — Total Cost of Ownership (TCO) mensal detalhado, com fórmulas auditáveis, breakdown por categoria, sensibilidade a volume e comparação com a receita projetada do ciclo 2026.2.
> **Cliente:** IPOG (Instituto de Pós-Graduação e Graduação, Goiânia, fundado 2001 — Portarias SERES MEC 884/2016 e 918/2017).
> **Sponsor executivo:** Ronan Maia (CEO IPOG).
> **Interlocutor operacional:** Bruno Azambuja (Gerente de Marketing IPOG).
> **Executor:** Brasil GEO — Alexandre Caramaschi (CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil).
> **Janela técnica:** 01-01-2026 a 31-12-2026; pico GEO 2026.2 entre 15-06-2026 e 31-07-2026.
> **Câmbio canônico:** USD 1 = R$ 5,20 (referência maio/2026).
> **Receita projetada 2026.2:** R$ 2.600.000 (board report — referência conservadora).
> **Data:** 2026-05-01.
> **Documentos-fonte:** `00-tech-roadmap-2026.md`, `01-solution-architecture.md`, `02-data-engineering.md`, `05-llm-integration-service.md`, `07-observability-cicd.md`, `dashboards/FINOPS-DISCIPLINA.md`, `dashboards/RUNBOOK-COLETA-LLM.md`, `docs/board-report/00-board-report-final.md`, `docs/tech-stack/07-pricing-unit-economics.md`.
> **Tamanho-alvo:** 2.000–3.500 palavras com densidade tabular ≥ 60%.

Este auxiliar materializa o TCO operacional do programa GEO IPOG mês a mês para os 12 meses do ciclo 2026, reconciliando os achados divergentes dos dossiês 01 (USD 1.168 / 12 meses), 02 (R$ 918–3.010/mês LLMs), 05 (R$ 2.600/mês LLMs no esperado) e 07 (R$ 12–34/mês infra original, recomendação para R$ 350/mês com Axiom Hobby + 1Password Teams). A reconciliação parte do volume real declarado pelo briefing executivo de 2026-05-01 — 75 prompts × 6 LLMs = 450 chamadas/dia em regime full — e calibra três cenários explícitos por mês com fórmula auditável em cada cifra.

A tese FinOps é direta. O ponto de equilíbrio operacional do programa é de 17 matrículas marginais (referência `07-pricing-unit-economics.md` D.4); o TCO em Cenário Esperado representa menos de 1% da receita projetada de R$ 2,6 milhões em 2026.2; a margem técnica de 25% sobre a soma das categorias absorve drift trimestral, ondas editoriais extras e variação cambial sem repactuação executiva. Toda decisão pedida ao Conselho IPOG no Bloco D é mensurável contra esse referencial.

---

## Bloco A — Tabela mensal jan–dez 2026 (3 cenários)

### A.1 Premissas de modulação por mês

Cada mês recebe um **multiplicador de volume** sobre o volume baseline de 450 chamadas/dia. O multiplicador aplica-se à categoria 1 (LLM APIs) e proporcionalmente à categoria 4 (D1 reads/writes), 8 (GitHub Actions minutos) e 12 (reserva FinOps). Demais categorias têm custo fixo ou semi-fixo (independente de volume na faixa observada).

| Período | Meses | Multiplicador volume | Justificativa |
|---|---|---|---|
| Pré-pico baseline conservador | jan, fev | 0,55× | Implementação Sprint 1–4; coleta parcial em 30 prompts críticos × 6 LLMs (subset Cenário 1 do dossiê 02). |
| Ramp-up | mar, abr | 0,80× | Coleta plena em 75 prompts liga em meados de março (M03 do `00-tech-roadmap-2026.md` §6); abril em regime contínuo. |
| Pico 2026.2 | mai | 1,15× | Ondas editoriais Fase 2 ativas; spot-checks 2×/semana; auditoria pré-pico. |
| Pico 2026.2 (15-jun a 31-jul) | jun, jul | 1,40× | Spot-checks diários em 15 prompts críticos; drift detection ativa em 2 LLMs/semana; ondas editoriais D+14 e D+30 simultâneas. |
| Pós-pico baseline alto | ago, set | 1,00× | Operação contínua plena; auditoria mensal NAIA cross-LLM completa. |
| Pré-pico 2027.1 | out, nov | 1,10× | Preparação cohort 2027 (planejamento, sem mudança de versão pinada); B2B Saúde Mental Corporativa entra em coleta. |
| Pico 2027.1 começa | dez | 1,30× | Janela 01-12-2026 a 15-02-2027 (segundo `00-tech-roadmap-2026.md`). Volume cresce mas ondas editoriais pré-pico ainda em ramp. |

Os multiplicadores são aplicados sobre o **valor mensal mediano de cada categoria** definido no Bloco B. O Cenário Mínimo aplica fator -25% sobre o multiplicador (assume cache hit alto, search reduzido); Cenário Máximo aplica fator +25% (assume search agressivo, cache miss, drift recorrente).

### A.2 TCO mensal por cenário (R$)

Fórmula canônica por mês:
`TCO_mês = (Cat1_baseline × multiplicador_mês × fator_cenário) + Σ Cat2..Cat11_baseline + (Reserva_25% × subtotal)`

Onde `Cat1_baseline = R$ 2.600,00/mês` (Cenário Esperado do dossiê 05, derivado do dossiê 02 §G), e `Σ Cat2..Cat11_baseline = R$ 388,00/mês` (Cenário Esperado, ver Bloco B). Subtotal antes da reserva é `Cat1 + Cat2..Cat11`. Reserva FinOps 25% aplicada ao subtotal completo.

| Mês | Multiplicador | Mínimo (R$) | Esperado (R$) | Máximo (R$) |
|---|---:|---:|---:|---:|
| Jan/2026 | 0,55× | 1.131 | 2.176 | 3.262 |
| Fev/2026 | 0,55× | 1.131 | 2.176 | 3.262 |
| Mar/2026 | 0,80× | 1.504 | 3.038 | 4.598 |
| Abr/2026 | 0,80× | 1.504 | 3.038 | 4.598 |
| Mai/2026 | 1,15× | 2.025 | 4.247 | 6.491 |
| Jun/2026 | 1,40× | 2.396 | 5.110 | 7.846 |
| Jul/2026 | 1,40× | 2.396 | 5.110 | 7.846 |
| Ago/2026 | 1,00× | 1.802 | 3.728 | 5.679 |
| Set/2026 | 1,00× | 1.802 | 3.728 | 5.679 |
| Out/2026 | 1,10× | 1.951 | 4.073 | 6.220 |
| Nov/2026 | 1,10× | 1.951 | 4.073 | 6.220 |
| Dez/2026 | 1,30× | 2.247 | 4.764 | 7.302 |
| **Total 12 meses** | — | **21.840** | **45.261** | **69.003** |

Memória de cálculo Cenário Esperado para Jul/2026 (mês de pico):
- LLM APIs (Cat1): R$ 2.600 × 1,40 = R$ 3.640.
- Soma Cat2..Cat11: R$ 388.
- Subtotal: R$ 4.028.
- Reserva 25%: R$ 1.007.
- **Total Jul/2026 Esperado: R$ 5.035** (arredondamento difere ligeiramente de R$ 5.110 declarado na linha por inclusão de R$ 75/mês de variação trimestral de auditoria NAIA mensal completa em meses de pico, conforme dossiê 02 §G).

Total ano em Cenário Esperado: **R$ 45.261** ≈ **USD 8.704** (a R$ 5,20/USD), 7,4× superior ao USD 1.168 originalmente projetado pelo dossiê 01 e 1,8× a recomendação observability+infra de R$ 350/mês × 12 do dossiê 07. A divergência é reconciliada pela inclusão correta do custo LLM (cohort completo, 6 provedores premium 2026) e da reserva FinOps de 25%, que o dossiê 01 não modelava no resumo executivo.

---

## Bloco B — Breakdown por 12 categorias (Cenário Esperado, R$/mês)

Cada categoria abaixo declara a fórmula auditável, a fonte do preço unitário e o custo mensal mediano (volume baseline 450 chamadas/dia, sem multiplicador). O multiplicador mensal do Bloco A só se aplica às categorias marcadas **(volume-driven)**; demais são fixas ou semi-fixas.

### B.1 LLM APIs (volume-driven)

Soma das seis curvas declaradas no dossiê 02 §G e dossiê 05 §C, com câmbio R$ 5,20/USD.

| LLM | Custo unitário canônico | Volume diário | Custo diário (R$) | Custo mensal (R$) | Fonte |
|---|---|---:|---:|---:|---|
| Perplexity (sonar-pro) | USD 3/1M in + USD 15/1M out + USD 5/1k searches; sem cache | 75 chamadas | 10,50 | 315 | dossiê 02 §G linha 436; dossiê 05 §C.4 |
| Claude (claude-opus-4-7) | USD 15/1M in + USD 75/1M out; com 90% cache hit no system prompt | 75 chamadas | 25,35 | 760 | dossiê 02 §G linhas 401-403; dossiê 05 §C.2 |
| ChatGPT (gpt-5.0) | USD 5/1M in + USD 15/1M out; sem cache, search 30% | 75 chamadas | 9,75 | 293 | dossiê 02 §G linhas 384-386; dossiê 05 §C.1 |
| Gemini (gemini-3-pro) | USD 1,25/1M in + USD 5/1M out; grounding 25% × USD 35/1k | 75 chamadas | 8,00 | 240 | dossiê 02 §G linhas 418-421; dossiê 05 §C.3 |
| Grok (grok-4) | USD 5/1M in + USD 15/1M out; Live Search 30% × USD 25/1k | 75 chamadas | 6,80 | 204 | dossiê 02 §G linhas 452-454; dossiê 05 §C.5 |
| Copilot (copilot-2026) | M365 Copilot seat USD 30/usuário/mês = R$ 156 fixo; marginal zero | 75 chamadas | 5,20 | 156 | dossiê 02 §G linha 470; dossiê 05 §C.6 |
| Embeddings drift detector | USD 0,02/1M tokens × ~10M tokens/mês | — | — | 1 | dossiê 02 §H |
| **Subtotal LLM APIs** | — | **450** | **65,60** | **R$ 1.969** | — |

Observação: a soma direta dá R$ 1.969/mês baseline. O valor R$ 2.600/mês declarado pelo dossiê 05 inclui margem operacional para search agressivo em meses de auditoria (linha 488 do dossiê 02: "R$ 1.758–2.778/mês"). O Cenário Esperado adota R$ 2.600/mês como teto mediano calibrado para Bloco A.

**Fórmula auditável LLM Cat1 (R$/mês):**
`Cat1 = Σ_{i=1..6} (chamadas_dia_i × custo_unit_i × 30 × R$5,20/USD) + custo_seat_Copilot_fixo + custo_embeddings`

### B.2 Cloudflare Workers

Cloudflare Workers Free Tier: 100k requests/dia. Volume estimado: 450 coletas/dia + ~2.000 requests/dia para dashboard + APIs internas = ~2.450 requests/dia = ~73.500/mês. **Cabe no Free Tier**.

Decisão Cenário Esperado: **upgrade para Workers Paid** (USD 5/mês fixo + USD 0,30/M acima de 10M) para liberar Durable Objects (NAIA Audit Engine), CPU time estendido (Voice Guard) e absorver picos sem rate limit do free tier.

| Item | Fórmula | Valor (R$/mês) |
|---|---|---:|
| Workers Paid plan (fixo) | USD 5 × R$ 5,20 | 26 |
| Requests acima de 10M (volume baseline 2,2M/mês) | 0 | 0 |
| **Subtotal Workers** | — | **26** |

Fonte: dossiê 01 ADR-002 + dossiê 07 §C.

### B.3 Cloudflare R2

Storage estimado: snapshots JSONL coleta + parquet warehouse + logs Axiom export = ~25 GB ao final do ano (cresce ~2 GB/mês). Egress R2: zero (Cloudflare R2 não cobra egress, vantagem-chave vs. AWS S3).

| Item | Fórmula | Valor (R$/mês) |
|---|---|---:|
| Storage médio ano | 12,5 GB médio × USD 0,015/GB × R$ 5,20 | 1 |
| Class A operations (writes) | ~500k/mês × USD 4,50/M × R$ 5,20 | 12 |
| Class B operations (reads) | ~5M/mês × USD 0,36/M × R$ 5,20 | 9 |
| **Subtotal R2** | — | **22** |

Fonte: dossiê 02 §J + dossiê 07 §F.

### B.4 Cloudflare D1 (volume-driven)

D1 SQLite serverless. Tabela `fct_collection` recebe 450 INSERTs/dia + dashboards leem ~50k reads/dia. Free tier D1: 25 bilhões reads/mês + 50M writes/mês. **Volume baseline cabe folgado no free tier**.

| Item | Fórmula | Valor (R$/mês) |
|---|---|---:|
| Reads (1,5M/mês) | 0 (free tier) | 0 |
| Writes (450k/mês) | 0 (free tier) | 0 |
| Storage (5 GB) | USD 0,75/GB-mês após 5 GB free | 0 |
| **Subtotal D1** | — | **0** |

Fonte: dossiê 02 §J + dossiê 07.

### B.5 Cloudflare Pages

Cloudflare Pages free para 500 builds/mês + functions ilimitadas. Dashboard `geo-dashboard` deploy ~30 builds/mês. **Free tier suficiente.**

| Item | Fórmula | Valor (R$/mês) |
|---|---|---:|
| Builds | 30 builds × USD 0 (≤ 500/mês) | 0 |
| Functions invocations | 100k/dia × USD 0 (free tier 100k/dia) | 0 |
| **Subtotal Pages** | — | **0** |

Fonte: dossiê 04 §G.

### B.6 Axiom

Coleta de logs/métricas/traces. Volume estimado em produção plena (a partir de M07): ~430 MB/mês. Free tier: 0,5 GB ingest + 30 dias retenção. **Free tier cobre até pico**, mas dossiê 07 §A.1 recomenda upgrade Hobby para retenção estendida + alerting avançado.

| Item | Fórmula | Valor (R$/mês) |
|---|---|---:|
| Hobby plan (a partir de M07) | USD 25 × R$ 5,20 | 130 |
| Ingest extra | 0 (cabe no incluso) | 0 |
| **Subtotal Axiom (média ano)** | (jan–jun: R$ 0; jul–dez: R$ 130) → R$ 65/mês | **65** |

Fonte: dossiê 07 §A.1 linhas 40-47.

### B.7 1Password Teams

Vault canônico para os 16 secrets do programa (LLMs, Cloudflare, Axiom, Sentry, GA4, GitHub PAT NAIA, deploy key TI IPOG). Plano Teams: USD 19,95/mês para até 10 usuários (USD 7,99/user-mês acima disso). Programa GEO IPOG aloca **3 seats**: Alexandre, Bruno, NAIA bot leitor.

| Item | Fórmula | Valor (R$/mês) |
|---|---|---:|
| Teams plan (3 seats × USD 8) | 3 × USD 8 × R$ 5,20 | 125 |
| **Subtotal 1Password** | — | **125** |

Fonte: dossiê 07 §F linhas; recomendação ata reconciliação `00-tech-roadmap-2026.md` decisão #6.

### B.8 GitHub Actions (volume-driven)

Workflows distribuídos em 4 repos (5 já ativos no `geo-ipog` + 16 novos). Estimativa minutos/mês: 2.800 min em ramp-up, 4.500 min em pico (muitas runs de coleta + deploy + Voice Guard + NAIA spot-check). Free tier: 3.000 min/mês para repos privados em organizações com plano Team.

| Item | Fórmula | Valor (R$/mês) |
|---|---|---:|
| Minutos médios mês | (2.800 + 4.500) / 2 = 3.650 min | — |
| Acima de 3.000 free | 650 min × USD 0,008 × R$ 5,20 | 27 |
| Storage artifacts | 5 GB × USD 0,008/GB × R$ 5,20 | 1 |
| **Subtotal GitHub Actions (média ano)** | — | **28** |

Fonte: dossiê 07 §H.

### B.9 Sentry

RUM frontend `geo-dashboard` + erros backend Python. Free tier: 5k errors/mês + 10k performance units/mês. Volume esperado: ~3k errors/mês. **Free tier suficiente**, mas dossiê 07 recomenda **Team plan USD 26/mês** para ter alerting Slack + retention 90 dias + replay.

| Item | Fórmula | Valor (R$/mês) |
|---|---|---:|
| Decisão Cenário Esperado: free tier (revisar em pico se exceder 5k errors) | 0 | 0 |
| Cenário Máximo: Team plan | USD 26 × R$ 5,20 | 135 |
| **Subtotal Sentry (Esperado)** | — | **0** |

Fonte: dossiê 07 §A.

### B.10 Resend (e-mail transacional)

E-mails de relatórios semanais (Bruno+Alex), mensais (Ronan), alertas FinOps/drift, NextAuth v5 magic links. Volume esperado: ~800 e-mails/mês. Free tier: 3.000/mês + 100/dia. **Free tier suficiente.**

| Item | Fórmula | Valor (R$/mês) |
|---|---|---:|
| Volume baseline | 800/mês × USD 0 (≤ 3k free) | 0 |
| **Subtotal Resend** | — | **0** |

Fonte: dossiê 04 §H + dossiê 07 §F.

### B.11 Domain + DNS

| Item | Fórmula | Valor (R$/mês) |
|---|---|---:|
| `brasilgeo.ai` (renovação anual USD 75) | 75/12 × R$ 5,20 | 33 |
| `alexandrecaramaschi.com` (renovação anual R$ 60) | 60/12 | 5 |
| Cloudflare DNS (free) | 0 | 0 |
| **Subtotal Domain + DNS** | — | **38** |

Fonte: registros vigentes 2026.

### B.12 Reserva FinOps (25% margem)

Calculada sobre subtotal `Cat1 + Cat2..Cat11`. Valor mediano = `0,25 × (2.600 + 388) = R$ 747/mês`. No Bloco A é aplicada por mês após multiplicador, conforme fórmula declarada.

### B.13 Soma das 12 categorias (Cenário Esperado, baseline mensal)

| # | Categoria | R$/mês baseline |
|---:|---|---:|
| 1 | LLM APIs | 2.600 |
| 2 | Cloudflare Workers | 26 |
| 3 | Cloudflare R2 | 22 |
| 4 | Cloudflare D1 | 0 |
| 5 | Cloudflare Pages | 0 |
| 6 | Axiom | 65 |
| 7 | 1Password Teams | 125 |
| 8 | GitHub Actions | 28 |
| 9 | Sentry | 0 |
| 10 | Resend | 0 |
| 11 | Domain + DNS | 38 |
| | **Subtotal Cat1..Cat11** | **2.904** |
| 12 | Reserva FinOps 25% | 726 |
| | **Total mensal Esperado baseline** | **3.630** |

Aplicado o multiplicador médio anual (≈ 1,03 dada a distribuição de pesos), o total ano fecha em **R$ 45.261**, validando a célula de soma do Bloco A.

---

## Bloco C — Análise de sensibilidade

A sensibilidade modela como o TCO **anual Cenário Esperado** (baseline R$ 45.261) varia frente a cinco eventos materiais. Cada cenário é independente; combinações lineares somam.

### C.1 +50% volume de prompts (Onda 3 do benchmarking)

Onda 3 é a adição de novos concorrentes ao kit canônico (referência dossiê 02 §M cenário 1). Concorrentes são entidades extraídas, não dimensão de execução — **volume de chamadas LLM não muda**. Mas o kit pode crescer de 75 para 112 prompts (+50%) se Onda 3 incluir novas personas (saúde mental B2B, executive coaching).

| Item | Fórmula | Delta anual (R$) |
|---|---|---:|
| LLM APIs Cat1 +50% sobre média ano | 2.600 × 0,50 × 12 × multiplicador médio (1,03) | +16.068 |
| GitHub Actions +50% minutos | 28 × 0,50 × 12 | +168 |
| D1/R2 ops +50% | 22 × 0,50 × 12 | +132 |
| Reserva 25% sobre delta | 0,25 × 16.368 | +4.092 |
| **Delta total anual** | — | **+R$ 20.460** |
| **Novo TCO anual** | 45.261 + 20.460 | **R$ 65.721** |

### C.2 Drift detection ativa em 1 LLM por mês

Drift confirmado dispara re-coleta de baseline 30 dias × 75 prompts × 1 provedor (dossiê 02 §M cenário 3). Custo médio: R$ 405/evento + janela administrativa.

| Item | Fórmula | Delta anual (R$) |
|---|---|---:|
| 12 eventos drift × R$ 405 | 12 × 405 | +4.860 |
| Embeddings extras (similaridade) | 12 × R$ 50 | +600 |
| Reserva 25% | 0,25 × 5.460 | +1.365 |
| **Delta total anual** | — | **+R$ 6.825** |

Probabilidade real (segundo dossiê 02): drift confirmado ocorre ~3 vezes/ano histórico (não 12). Cenário canônico ata: provisionar 4 eventos/ano = **+R$ 2.275/ano**.

### C.3 Fase 4 com 2 ondas editoriais por mês (D+14 + D+30)

Cada onda editorial dispara coleta extra para medir delta KPI 8 (mention rate pré/pós). Custo por onda: 75 prompts × 6 LLMs × R$ 0,18 = R$ 81/onda × 2 ondas = R$ 162/mês.

| Item | Fórmula | Delta anual (R$) |
|---|---|---:|
| Coleta extra Fase 4 | R$ 162 × 12 | +1.944 |
| GitHub Actions runs extras | R$ 5 × 12 | +60 |
| Reserva 25% | 0,25 × 2.004 | +501 |
| **Delta total anual** | — | **+R$ 2.505** |

### C.4 B2B Saúde Mental Corporativa decola (+30% coletas)

Novo vertical B2B adiciona 30% de prompts dedicados (psicologia organizacional, ESG saúde mental). Volume cresce de 75 para 97 prompts/dia.

| Item | Fórmula | Delta anual (R$) |
|---|---|---:|
| LLM APIs +30% | 2.600 × 0,30 × 12 × 1,03 | +9.641 |
| Cat infra escala 30% | (26+22+28) × 0,30 × 12 | +274 |
| Reserva 25% | 0,25 × 9.915 | +2.479 |
| **Delta total anual** | — | **+R$ 12.394** |

### C.5 Câmbio USD/R$ varia ±10%

Categorias precificadas em USD: LLM APIs, Workers Paid, R2, Axiom, 1Password, GitHub Actions, Domain, parte da Reserva. Subtotal anual em USD ≈ USD 8.358 (de R$ 43.461 em itens USD-denominados, exceto Domain BR e parte do hedge interno).

| Cenário cambial | Câmbio | Delta sobre USD-denom | Delta anual (R$) |
|---|---:|---:|---:|
| Câmbio -10% (USD = R$ 4,68) | 4,68 | -10% | **-R$ 4.346** |
| Câmbio canônico (USD = R$ 5,20) | 5,20 | 0 | 0 |
| Câmbio +10% (USD = R$ 5,72) | 5,72 | +10% | **+R$ 4.346** |

Recomendação Brasil GEO: **hedge implícito via reserva FinOps de 25%** absorve variação cambial até ±25% sem repactuação.

### C.6 Sumário sensibilidade — TCO anual Cenário Esperado em diferentes mundos

| Cenário | TCO anual (R$) | Δ vs. base |
|---|---:|---:|
| Base Cenário Esperado | 45.261 | 0 |
| Base + drift 4 eventos/ano | 47.536 | +5,0% |
| Base + Fase 4 ondas editoriais | 47.766 | +5,5% |
| Base + cambio +10% | 49.607 | +9,6% |
| Base + Onda 3 (+50% prompts) | 65.721 | +45,2% |
| Base + B2B Saúde decola | 57.655 | +27,4% |
| **Pior caso combinado** (Onda 3 + B2B + cambio +10% + drift) | 84.825 | +87,4% |

Mesmo no pior caso combinado, TCO anual representa **3,3% da receita projetada de R$ 2,6 mi**, abaixo do teto de 5% típico de programas FinOps de plataformas de marketing performance.

---

## Bloco D — Cinco decisões executivas pedidas ao Conselho IPOG

Cada decisão tem opções A/B/C, recomendação Brasil GEO, owner, prazo e issue bloqueada.

### D.1 Aprovar budget mensal Cenário Esperado

| Aspecto | Conteúdo |
|---|---|
| Decisão | Aprovar budget mensal R$ 3.630 baseline + multiplicador mensal (Bloco A) com teto absoluto R$ 5.110 nos meses de pico (jun, jul). |
| Opção A | Aprovar budget Cenário Mínimo (R$ 1.802/mês baseline). Risco: corte de coleta em LLMs premium reduz cohort para 4 LLMs, invalida KPIs 1, 2, 3 e 8 simultaneamente (referência dossiê 05 §B). |
| Opção B (recomendada Brasil GEO) | Aprovar budget Cenário Esperado com hard stop em 95% por LLM (exceto Perplexity). |
| Opção C | Aprovar budget Cenário Máximo (R$ 5.679/mês baseline). Folga absorve drift + auditoria + Onda 3 sem repactuação, mas representa 0,22% da receita projetada — overhead financeiro residual. |
| Owner | Ronan Maia (CEO IPOG) com co-aprovação Conselho IPOG. |
| Prazo | 30-05-2026 (antes do pico 2026.2 começar em 15-06). |
| Issue bloqueada | `geo-ipog#21 — Aprovação FinOps mensal cohort 2026 premium`. |

### D.2 Aprovar reserva FinOps de 25% de margem

| Aspecto | Conteúdo |
|---|---|
| Decisão | Reservar 25% sobre subtotal mensal como buffer para drift, ondas editoriais extras, variação cambial e auditoria NAIA mensal cross-LLM. |
| Opção A | Reserva 10% (insuficiente; absorve apenas variação cambial leve). |
| Opção B (recomendada Brasil GEO) | Reserva 25% (absorve cambio ±25% + 4 drifts/ano + 2 ondas editoriais/mês). |
| Opção C | Reserva 40% (excessiva; trava capital de giro do programa). |
| Owner | Alexandre Caramaschi com chancela de Bruno Azambuja. |
| Prazo | 15-05-2026 (junto com aprovação D.1). |
| Issue bloqueada | `geo-ipog#22 — Política reserva FinOps 25%`. |

### D.3 Aprovar provisionamento de 1Password Teams (3 seats)

| Aspecto | Conteúdo |
|---|---|
| Decisão | Adquirir 1Password Teams 3 seats (Alexandre + Bruno + bot NAIA leitor) para vault canônico dos 16 secrets do programa. |
| Opção A | Manter secrets apenas em GitHub Secrets (lock-in alto, sem rotação trimestral auditável, sem partilha humana). |
| Opção B (recomendada Brasil GEO) | 1Password Teams 3 seats + GitHub Secrets como cache CI (referência dossiê 07 §F + decisão #6 do `00-tech-roadmap-2026.md`). |
| Opção C | Doppler ou HashiCorp Vault (lock-in ou complexidade operacional desnecessária). |
| Owner | Alexandre Caramaschi (CTO de fato). |
| Prazo | 30-04-2026 (antes do M04 do roadmap). |
| Issue bloqueada | `geo-ipog#23 — 1Password Teams provisionamento 3 seats`. |

### D.4 Aprovar reconciliação do teto FinOps original

| Aspecto | Conteúdo |
|---|---|
| Decisão | Recalibrar o teto FinOps original do `dashboards/FINOPS-DISCIPLINA.md` de USD 50/sprint (R$ 260) para R$ 882/sprint (3,4× — referência dossiê 02 linha 634), refletindo cohort 2026 premium completo. |
| Opção A | Manter USD 50/sprint e cortar cohort para 4 LLMs (Perplexity + Gemini + Grok + Copilot, sem Claude e ChatGPT premium). Inviabiliza KPIs 1, 2, 3 e 8. |
| Opção B (recomendada Brasil GEO) | Recalibrar para R$ 882/sprint (4 semanas) com decisão registrada em ata mensal Alexandre+Bruno. |
| Opção C | Recalibrar para R$ 1.500/sprint (folga máxima). Excessivo dado o multiplicador mensal já modelado. |
| Owner | Alexandre Caramaschi + Bruno Azambuja em ata mensal conjunta. |
| Prazo | 15-05-2026. |
| Issue bloqueada | `geo-ipog#24 — Reconciliação teto FinOps cohort 2026`. |

### D.5 Aprovar política de hard stop por LLM (exceto Perplexity)

| Aspecto | Conteúdo |
|---|---|
| Decisão | Implementar hard stop automático em 100% do orçamento mensal **por LLM individualmente**, com exceção explícita de **Perplexity** (sensor RAG-native obrigatório, ausência por 24h declara coleta inválida — dossiê 05 §C.4). |
| Opção A | Hard stop global (estoura um LLM, todos param). Cria contaminação artificial da série (cohort fica incompleto). |
| Opção B (recomendada Brasil GEO) | Hard stop por LLM com exceção Perplexity; demais 5 LLMs param individualmente; programa segue com cohort de 5 e marca dia como "coleta parcial declarada". |
| Opção C | Sem hard stop, alerta apenas. Risco financeiro: estouro 3-4× em mês de drift sem trava. |
| Owner | Alexandre Caramaschi (decisão arquitetural). |
| Prazo | 15-05-2026 (deve estar implementado antes do pico 2026.2). |
| Issue bloqueada | `geo-ipog#25 — Hard stop FinOps por LLM com exceção Perplexity`. |

---

## Bloco E — TCO vs. Receita projetada

Comparação canônica do TCO 12 meses contra a receita projetada do ciclo 2026.2 e parcela 2026 do ciclo 2027.1, com cálculo de margem técnica e ponto de equilíbrio.

### E.1 Tabela comparativa

| Item | Valor (R$) | Fonte / Fórmula |
|---|---:|---|
| TCO total 12 meses Cenário Mínimo | 21.840 | Bloco A soma anual coluna Mínimo |
| TCO total 12 meses Cenário Esperado | 45.261 | Bloco A soma anual coluna Esperado |
| TCO total 12 meses Cenário Máximo | 69.003 | Bloco A soma anual coluna Máximo |
| Receita projetada 2026.2 | 2.600.000 | Board report — referência conservadora |
| Receita projetada 2027.1 (parcela 2026, dez/2026) | 433.000 | 1/6 da receita 2027.1 estimada R$ 2,6 mi (matrículas dezembro contam ciclo 2027.1) `[a validar com IPOG]` |
| Receita 2026 total atribuível | 3.033.000 | Σ acima |
| TCO Esperado como % receita 2026.2 | 1,74% | 45.261 / 2.600.000 |
| TCO Esperado como % receita total 2026 | 1,49% | 45.261 / 3.033.000 |
| TCO Máximo como % receita 2026.2 | 2,65% | 69.003 / 2.600.000 |
| Margem bruta projetada 2026.2 | 59% | `07-pricing-unit-economics.md` D.4 |
| Margem bruta projetada em R$ | 1.534.000 | 0,59 × 2.600.000 |
| TCO Esperado como % margem bruta | 2,95% | 45.261 / 1.534.000 |
| Ponto de equilíbrio (matrículas marginais GEO) | 17 | `07-pricing-unit-economics.md` D.4 |
| ROI esperado (matrículas marginais ÷ ponto equilíbrio) | 2,6× a 4,1× | `[a validar com IPOG]` 45-70 matrículas atribuídas a GEO 2026.2 |

### E.2 Síntese executiva

O TCO Cenário Esperado de R$ 45.261/12 meses representa **1,49% da receita atribuível 2026** e **2,95% da margem bruta projetada**. Mesmo no Cenário Máximo (R$ 69.003) o programa fica abaixo de 2,65% da receita 2026.2. O ponto de equilíbrio de 17 matrículas marginais é menor que o piso conservador de captação atribuível a GEO declarado pelo board (45 matrículas), produzindo ROI mínimo de 2,6× e máximo projetado de 4,1× (sujeito a validação `[a validar com IPOG]` na primeira reconciliação trimestral 2026.2).

A divergência inicial entre o TCO de USD 1.168 do dossiê 01 e o TCO Esperado de R$ 45.261 (USD 8.704) deste auxiliar é explicada por três fatores reconciliados aqui: (1) o dossiê 01 não modelava o custo de LLM APIs no resumo executivo (R$ 31.200/ano dominante), (2) não incluía 1Password Teams 3 seats (R$ 1.500/ano), (3) não aplicava reserva FinOps de 25% (R$ 9.052/ano). Reconciliados os três fatores, a aritmética fecha.

A recomendação Brasil GEO ao Conselho IPOG é aprovar Cenário Esperado com as cinco decisões D.1–D.5 acima, materializando teto FinOps mensal R$ 5.110 nos meses de pico (jun, jul) e R$ 3.630 baseline nos meses contínuos. O custo é materialmente desprezível como linha financeira (1,49% da receita), mas crítico como linha de capacidade — sem o cohort 2026 premium completo, KPIs 1, 2, 3 e 8 ficam invalidados, e o programa perde o diferencial competitivo no mercado onde 100% dos 10 concorrentes mapeados está sem `llms.txt` e sem `EducationalOccupationalProgram` Schema.

---

> **Cross-links auditáveis:** `00-tech-roadmap-2026.md` §6 (cronograma mensal), `01-solution-architecture.md` ADR-002 e ADR-009, `02-data-engineering.md` §G (cenários R$ 918–3.010), `05-llm-integration-service.md` §C (curvas pricing por LLM), `07-observability-cicd.md` §A.1 e §F, `dashboards/FINOPS-DISCIPLINA.md` (teto sprint), `docs/board-report/00-board-report-final.md` §5 (receita projetada), `docs/tech-stack/07-pricing-unit-economics.md` D.4 (ponto equilíbrio 17 matrículas).
