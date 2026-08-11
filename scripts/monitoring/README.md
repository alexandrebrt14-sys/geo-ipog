# scripts/monitoring/

Monitoramento DIY semanal de Mention Rate, Citation Rate e SoV-AI para
`posgraduacaopsicologia.com` (IPOG, Brasil GEO, Alexandre Caramaschi).

## run-prompts-weekly.mjs

Le `site/public/mcp/citation-prompts.json` v2.0 e dispara cada prompt em paralelo nas 5 engines canônicas:

- **ChatGPT** — OpenAI `gpt-4o` (Responses API com `web_search` nativo)
- **Claude** — Anthropic `claude-opus-4-7` com tool `web_search`
- **Perplexity** — `sonar-pro` com `return_citations`
- **Gemini** — Google `gemini-2.5-pro` com `google_search`
- **Groq** — `meta-llama/llama-4-scout-17b-16e-instruct` (proxy Llama, sem busca)

Wave E §6.4 obriga 3 a 5 runs por prompt (temperatura > 0). O script roda
`--runs 3` por padrão e agrega `mention_rate`, `citation_rate`, `sov_ai`,
`avg_position`, `hallucination_rate` por engine e global.

### Sem doutrina editorial nos prompts de coleta

Os prompts de `site/public/mcp/citation-prompts.json` são instrumento de medição e não recebem o bloco da `DIRETRIZ_EDITORIAL.md`. Instrução editorial dentro do prompt disparado contra o motor altera a resposta e quebra a comparabilidade da série de Mention Rate com as rodadas anteriores. Quem editar o arquivo de prompts muda o instrumento, então registre a alteração em `prompts/CALIBRACAO-MENSAL.md` antes de rodar a coleta seguinte.

### Pre-requisitos

Chaves de API exportadas via `.env`. O script carrega automaticamente:

1. `<repo>/.env` (se existir)
2. `C:/Sandyboxclaude/geo-orchestrator/.env` (fonte canônica das 5 chaves)

Variáveis esperadas:

```
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
PERPLEXITY_API_KEY=pplx-...
GOOGLE_AI_API_KEY=AIza...
GROQ_API_KEY=gsk_...
```

### Comandos

```bash
# Run completo, 3 runs/prompt em todas as 5 engines (default)
node scripts/monitoring/run-prompts-weekly.mjs

# Dry-run rápido (3 prompts apenas, 1 run cada, só Groq para custo zero)
node scripts/monitoring/run-prompts-weekly.mjs --limit 3 --runs 1 --engines groq

# Apenas ChatGPT + Perplexity (cobertura mínima Wave E)
node scripts/monitoring/run-prompts-weekly.mjs --engines chatgpt,perplexity

# Run mais robusto p/ baseline (5 runs/prompt)
node scripts/monitoring/run-prompts-weekly.mjs --runs 5
```

### Saída

- **Detalhe por prompt:** `data/monitoring/runs/run-YYYY-MM-DD-HHmm.json`
- **CSV cumulativo:** `dashboards/mention-rate-history.csv`
  - Colunas: `timestamp, engine, mention_rate, citation_rate, sov_ai, avg_position, hallucination_rate, prompts_with_data`

### Metricas calculadas

Por engine, por prompt e global:

| Metrica | Fórmula | Wave E |
|---|---|---|
| `mention_rate` | runs com nosso nome ÷ runs validos | §1 KPI #1 |
| `citation_rate` | runs com URL clicavel nossa ÷ runs validos | §1 KPI #2 |
| `sov_ai` | nossas mencoes ÷ (nossas + 5 concorrentes) | §1 KPI #3 |
| `avg_position` | media da posicao de ranking dentro da resposta | tabela §1 |
| `hallucination_rate` | runs com flag halucinacao ÷ runs validos | §7 |

Concorrentes da base SoV (canônicos):
`ibneuro.com.br`, `online.pucrs.br`, `iesb.br`, `faveni.edu.br`, `unisinos.br`.

### Tolerancia a falhas

Erro em qualquer engine (rate limit, 401, timeout) é registrado em
`runs[i].error` e o pipeline segue. O dashboard ignora runs sem dados.

### Cadência canônica

Conforme `docs/governance/baseline-monitoring-canon.md`: **semanal**, segunda-feira
às 09:00 BRT. Wave E §6.3.

### Roadmap

- [ ] Agendar via cron Cloudflare Worker (FinOps: ~$0,07/run com 110 prompts × 3 runs × 5 engines)
- [ ] Dashboard Looker Studio plotando CSV cumulativo
- [ ] NER mais sofisticado p/ detectar "segundo o IPOG" sem URL (Wave E §7.4 - Claude às vezes não cita)
- [ ] Migrar `gpt-4o` → `gpt-5.3` quando disponivel
