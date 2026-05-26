---
name: mention-rate
type: concept
category: kpi
status: stable
created: 2026-05-26
updated: 2026-05-26
sources:
  - 2026-05-17-seo-geo-kb-canonical
related:
  - geo
  - naia
---

# Mention Rate

KPI principal do programa GEO IPOG. Definido como a porcentagem de
prompts de um kit canônico em que a entidade-alvo é mencionada por
nome na resposta de um LLM, calculada por persona e por provedor.

## Fórmula canônica

```
mention_rate(entidade, persona, provedor, janela) =
  # respostas que contem o nome da entidade
  / # prompts do kit canonico naquela persona e provedor
```

Janela típica: amostragem em 5 execuções por prompt, mediana usada como
valor reportado para reduzir variância intra-provedor.

## Distinção crítica

**Mention ≠ Citation.** Uma menção é o nome aparecer em texto. Uma
citação é o LLM atribuir explicitamente uma afirmação ao conteúdo da
entidade, idealmente com link. O dashboard separa as duas métricas.

## Kit canônico de prompts

Versionado em `prompts/KIT-PROMPTS-V0.md` (66 prompts) e
`site/public/mcp/citation-prompts.json` (50 prompts canônicos publicados
no portal). Cobertura por persona, por modalidade de pós-graduação e
por cluster semântico.

## Provedores rastreados

ChatGPT, Claude, Gemini, Perplexity, Copilot, Grok. Brave Summarizer e
Bing AI Performance são rastreados manualmente conforme runbook em
`docs/runbooks/manual-mention-tracking-reddit-brave-bing.md` (canais sem
API estável em maio/2026).

## Cadência

- Re-rodar kit a cada 14 dias.
- Cohort fixado, expansão apenas em rotina trimestral.
- Versionar por versão de modelo declarada quando disponível.

## Riscos de medição

- Volatilidade dos LLMs (sampling reduz mas não elimina).
- Mudança silenciosa de modelo do provedor (ChatGPT 5.3 Instant default,
  Claude Opus 4.7 GA).
- Saturação competitiva no termo "pós-graduação online em Psicologia"
  pode capturar share-of-voice mesmo com mention rate IPOG estável.

Detalhes operacionais em `dashboards/RUNBOOK-COLETA-LLM.md` e
`dashboards/METRICAS-CANONICAS.md`.
