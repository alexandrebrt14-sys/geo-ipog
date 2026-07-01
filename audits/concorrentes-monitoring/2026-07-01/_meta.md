# Snapshot quinzenal dos concorrentes IPOG — 2026-07-01

Snapshot gerado por workflow automatico em Wed Jul  1 14:33:18 UTC 2026.
Cobertura: 10 concorrentes (5 Onda 1 + 5 Onda 2 + Saint Paul).

## Status de captura

| Concorrente | robots.txt | llms.txt | sitemap.xml |
|---|---|---|---|
| onda1-unicesumar | 403 | 403 | 403 |
| onda1-anhanguera | 403 | 403 | 403 |
| onda2-anhembi-morumbi | 403 | 403 | 403 |
| onda2-ibneuro | 200 | 200 | 200 |
| onda1-estacio | 200 | 307 | 200 |
| onda2-sirio-libanes-fsl | 301 | 301 | 301 |
| onda2-cetcc | 200 | 404 | 404 |
| onda1-uninter | 200 | 404 | 301 |
| onda1-pucminas | 200 | 404 | 200 |
| onda2-saint-paul | 200 | 404 | 200 |
| onda2-wpos-unyleya | 200 | 404 | 200 |

## Alertas a inspecionar

1. **llms.txt apareceu (HTTP 200)** em algum concorrente — janela competitiva fechando, escalada R-002.
2. **WAF desbloqueado (Anhanguera ou Sirio-Libanes mudou de 403 para 200)** — escalada R-003.
3. **robots.txt restritivo a IA crawlers** em concorrente que era aberto — recalibrar matriz tecnica.
