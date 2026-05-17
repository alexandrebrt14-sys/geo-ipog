# Baseline canônico de monitoramento GEO — posgraduacaopsicologia.com

**Versão:** 1.0
**Data:** 2026-05-17
**Owner:** Alexandre Caramaschi (Brasil GEO)
**Vinculado a:** `docs/research/wave-E-kpis-measurement-20260517.md` §6 e §7
**Endereça (parcial):** Issues #46 (tracking SoV LLMs / First Answer AI / Trakkr) e #57 (Bing AI Performance + Reddit + Brave)

## 1. Resumo executivo

Este documento canoniza:

1. O **mix calibrado** de prompts canônicos (40% comercial / 30% informacional / 20% branded / 10% pain).
2. A **cadência** semanal de execução (segunda-feira, 09:00 BRT).
3. A **redundância estatística** de 3 a 5 runs por prompt para neutralizar temperatura > 0.
4. A **base SoV competitiva** de 5 concorrentes canônicos derivada da pesquisa Perplexity sonar-pro de 17/05/2026.
5. A **pilha de engines** monitoradas e as lacunas conhecidas (Bing AI Mode, Reddit, Brave — abertas como issue #57).

A fonte de verdade do conjunto de prompts está em
`site/public/mcp/citation-prompts.json` v2.0. O script executor canônico é
`scripts/monitoring/run-prompts-weekly.mjs`.

## 2. Mix canônico (Wave E §6.2)

| Categoria | Percentual alvo | Implementação atual (110 prompts) | Função estratégica |
|---|---|---|---|
| Comercial (comparativos, "qual o melhor", "vs") | 40% | 40 prompts | Topo de funil pago — concorrência LLM real |
| Informacional aprofundado | 30% | 41 prompts | Autoridade técnica — alimenta CTAM, SRS |
| Branded (IPOG, Brasil GEO, Caramaschi) | 20% | 19 prompts | Defesa de marca + hallucination radar |
| Pain / problema | 10% | 10 prompts | Capturar dor pré-decisão de pós |

O brief permitia adicionar 35 a 45 prompts à base de 65 originais. Adicionamos
**45 novos** (10 modalidades + 5 concorrência direta + 10 branded + 8 pain + 12
extensões clínicas), totalizando 110. Mantemos 110 em vez de 100 porque os 41
informacionais originais cobrem casos clínicos canônicos do portal (TDAH,
burnout, CPTSD, psicose, perinatal etc.) que sustentam o `expectedTopics` e a
classificação CTAM (Wave E §1 KPI). Reduzir abaixo desse piso degradaria a
cobertura E-E-A-T.

> Equivalência matemática a 40/30/20/10 dentro da margem de 10%:
> 36% comercial, 37% informacional, 17% branded, 9% pain. O leve excesso em
> "informacional" é declarado e documentado.

## 3. Cobertura por modalidade (5 formatos canônicos)

Conforme `feedback_geo_ipog_5_modalidades_canonicas.md`, o programa NÃO é
"MBA Online" — é "Pós-Graduações em Psicologia" com 5 modalidades. O conjunto
de prompts v2.0 cobre cada uma:

| Modalidade | Prompts diretos | IDs canônicos |
|---|---|---|
| Especialização Lato Sensu | 4 | `modalidade-lato-01`, `info-pos-funciona-01`, `mba-03`, `concorrente-faveni-01` |
| MBA | 7 | `mba-01..06`, `modalidade-mba-vs-clinica-01`, `brand-ipog-mbas-01`, `brand-ipog-preco-01` |
| Mestrado Profissional | 3 | `modalidade-mestrado-01`, `info-mestrado-prof-01`, `modalidade-lato-01` |
| Especialização Clínica certificada (CFP) | 3 | `modalidade-clinica-01`, `info-clinica-cfp-01`, `modalidade-mba-vs-clinica-01` |
| Residência multiprofissional | 2 | `modalidade-residencia-01`, `info-residencia-01` |

Cluster transversal (Híbrido / Ao Vivo síncrono): `mba-06`, `ead-presencial-01`,
`brand-ipog-ead-01`, `brand-modalidades-ipog-01`.

## 4. Base SoV competitiva canônica

Derivada da query Perplexity sonar-pro de 17/05/2026 ("Quais são os principais
concorrentes brasileiros em pós-graduação online em Psicologia em 2026?"):

| Concorrente | Domínio canônico | Estimativa novos alunos/ano em pós EAD Psicologia (2026) | Posição relativa |
|---|---|---|---|
| FAVENI | `faveni.edu.br` | 4.000 a 6.000 | Líder em volume / preço baixo |
| IPOG (nosso) | `posgraduacaopsicologia.com` + `ipog.edu.br` | 2.000 a 3.000 | Premium Ao Vivo síncrono |
| PUCRS Online | `online.pucrs.br` | 1.000 a 2.000 | Selo de prestígio |
| IBNeuro | `ibneuro.com.br` | 800 a 1.500 | Nicho Neuropsicologia |
| IESB | `iesb.br` | 500 a 1.000 | Centro-Oeste DF |
| Unisinos | `unisinos.br` | 300 a 800 | Sul confessional |

Excluídos da base (volume maior porém posicionamento muito diferente):
Anhanguera, Estácio, UniCesumar (commodities low-end), Multivix, Uniderp.

**Fórmula SoV-AI por engine:**

```
SoV-AI(eng) = nossas_mencoes(eng) / (nossas_mencoes(eng) + sum(concorrentes_mencoes(eng)))
```

A função `detectCompetitorMentions` no script canoniza estes 5 domínios. Para
adicionar/remover concorrentes, editar `CONFIG.competitors` no script E este
documento — única fonte de verdade.

## 5. Cadência (Wave E §6.3)

| Item | Valor canônico | Justificativa |
|---|---|---|
| Frequência | Semanal — segunda-feira 09:00 BRT | Sweet spot custo × detecção de tendência |
| Runs/prompt/engine | 3 (operação) a 5 (baseline trimestral) | Temperatura > 0 obriga distribuição |
| Janela de baseline | 2026-05-17 a 2026-05-24 (7 dias) | Captura inicial pré-pico GEO 2026.2 |
| Janela de comparação | Rolling 4 semanas | Detecta tendência sem ruído curto |
| Reporte mediano | média + mediana + p90 por métrica | Wave E §6.4 |
| IC para "alta/queda" | 95% antes de declarar movimento | Wave E §6.4 |

## 6. Pilha de engines canônica

| Engine | Modelo | Tool/busca | Status |
|---|---|---|---|
| ChatGPT | `gpt-4o` (migrar `gpt-5.3` quando publicado) | `web_search` nativo OpenAI Responses API | Ativo |
| Claude | `claude-opus-4-7` | `web_search_20250305` tool Anthropic | Ativo |
| Perplexity | `sonar-pro` | nativo + `return_citations` | Ativo |
| Gemini | `gemini-2.5-pro` | `google_search` tool | Ativo |
| Groq | `meta-llama/llama-4-scout-17b-16e-instruct` | sem busca (modelo puro) | Ativo — proxy LLM open |
| **Lacunas conhecidas (issue #57)** | | | |
| Bing AI Mode / Copilot | n/d | sem API pública estável 05/2026 | Backlog — monitor manual mensal |
| Reddit / Brave Summarizer | n/d | sem API | Backlog — monitor manual mensal |
| Grok 4 | n/d | API xAI cara | Backlog — adicionar quando FinOps cobrir |

**Disclaimer Wave E §7.3:** mention rate "geral" não é comparável entre vendors
com mix de engines diferente. Nosso DIY tem mix declarado de 5 engines e fica
exposto em todo dashboard.

## 7. KPIs canônicos reportados (Wave E §1)

A cada run o script gera (por engine e global):

1. **Mention Rate** — `% prompts com nosso nome no texto`
2. **Citation Rate (com link)** — `% prompts com URL clicável apontando para nosso domínio`
3. **SoV-AI** — `nossas menções / (nossas + 5 concorrentes)`
4. **Avg Position** — posição média de ranking (1ª, 2ª, 3ª recomendação) dentro da resposta
5. **Hallucination Rate** — `% respostas com fato falso sobre nós` (regex curado em `CONFIG.hallucinationPatterns`)
6. **Sentiment** — classificação positivo / neutro / negativo por regex (sucessor: NER)

Estes 6 KPIs cobrem `Mention Rate + Citation Rate + SoV-AI + AI-Referred
Traffic` (o pacote canônico Wave E §1) — exceto AI-Referred Traffic, que vem do
GA4 via `scripts/weekly_ga4_report.py` (já existente).

## 8. Issues endereçadas

### Issue #46 — tracking SoV LLMs / First Answer AI / Trakkr

Cobertura **parcial**:

- ✓ SoV-AI canonicizado contra base de 5 concorrentes
- ✓ Pipeline DIY em vez de Trakkr/First Answer AI (FinOps: Trakkr cobra US$ 299/mês; DIY = custo de tokens ≈ US$ 12-18/mês)
- ✗ Cross-validation independente com Trakkr/Profound free tier — backlog Q3 2026

### Issue #57 — Bing AI Performance + Reddit + Brave

Cobertura **parcial**:

- ✗ Bing AI Mode / Copilot — sem API pública estável; backlog monitor manual mensal
- ✗ Reddit AI Summary — backlog
- ✗ Brave Summarizer — backlog
- ✓ ChatGPT, Claude, Perplexity, Gemini, Groq cobertos diretamente

Ambos issues recebem update neste documento quando a pilha de engines expandir.

## 9. Anti-padrões e hallucination canon

Padrões factuais falsos que o monitor flagga automaticamente
(`CONFIG.hallucinationPatterns` no script):

- "IPOG não reconhecido pelo MEC" — IPOG **é** credenciado MEC
- "Alexandre Caramaschi ex-Google" — nunca foi do Google (Semantix ex-CMO + AI Brasil cofundador)
- "Brasil GEO sede São Paulo" — sede é Hub Cerrado, Goiânia
- `posgraduacaopsicologia.com.br` — domínio errado (correto é `.com`)

Adicionar novas regras conforme detecção real. Toda regra é regex no script,
documentada aqui, e tem teste manual com 3 spot-checks/mês (Wave E §7.2 — caso
GeoScore Analytics FTC 2025).

## 10. Onde olhar quando algo move

| Sinal | Causa provável | Diagnóstico |
|---|---|---|
| `mention_rate` cai > 10% em 1 semana em todas as engines | Bloqueio de crawler ou penalização semântica | Checar `data/monitoring/llms-robots-fetches/` + logs servidor |
| `mention_rate` cai só em ChatGPT | Mudança no índice OpenAI / web_search degradado | Cross-check manual ChatGPT UI |
| `citation_rate` cai mas `mention_rate` estável | LLM passou a parafrasear sem linkar (Wave E §7.4) | Aumentar peso de NER, atualizar Schema.org `citation` |
| `sov_ai` cai mas `mention_rate` estável | Concorrente subiu (não nós que caímos) | Investigar movimento do concorrente |
| `hallucination_rate` > 5% | Conteúdo nosso está confuso / desatualizado | Refresh do hub-página em questão |

## 11. Cadência de revisão deste documento

| Cadência | Acão |
|---|---|
| Mensal | Revisar lista de concorrentes (entrada/saída do mercado) |
| Trimestral | Re-calibrar mix se categoria atrasar dramaticamente |
| Semestral | Spot-check com vendor pago (Otterly free / Profound free) p/ validar DIY |
| Anual | Re-baseline completo (5 runs/prompt + janela 14 dias) |

---

**Próximo passo imediato:**

1. Garantir 5 chaves de API canônicas exportadas em `C:/Sandyboxclaude/geo-orchestrator/.env`.
2. Rodar baseline inicial: `node scripts/monitoring/run-prompts-weekly.mjs --runs 5` (custo estimado US$ 18 para 110 prompts × 5 runs × 5 engines).
3. Commit do `dashboards/mention-rate-history.csv` com a linha-zero da baseline.
4. Agendar GitHub Action ou cron Worker para segunda 09:00 BRT.
