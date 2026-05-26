---
name: llms-txt
type: concept
status: controversial
created: 2026-05-26
updated: 2026-05-26
sources:
  - 2026-05-17-seo-geo-kb-canonical
related:
  - geo
  - mcp-protocol
---

# llms.txt

Arquivo declarativo proposto em `/llms.txt` (e versão estendida em
`/llms-full.txt`) para sinalizar a LLMs o posicionamento, hub central,
prioridades de citação, política de uso e mapa de conteúdo de um domínio.

## Status canônico em 2026

**Controverso**. Não há evidência estatística publicada que comprove
ganho de mention rate diretamente atribuível a `llms.txt` em provedores
maduros. Google declarou explicitamente que **não é sinal de ranking**
em qualquer produto Google.

Onde aparenta funcionar:

- Provedores RAG-native que tem opt-in declarado para `llms.txt`.
- Bots de descoberta de conteúdo (Information Agents 24/7) que usam o
  arquivo como índice.
- Cenários onde substitui falta de `sitemap.xml` rico ou `mcp.json`.

Onde não funciona:

- Pesos paramétricos de modelos fechados (ChatGPT, Claude, Gemini).
  Esses absorvem o conteúdo via mídia, Wikipedia e crawlers próprios,
  não via `llms.txt`.

## Política canônica do programa

- Manter `llms.txt` v3 no portal `posgraduacaopsicologia.com` com
  disclaimer explícito **"non-Google LLMs"**.
- Não tratar como métrica de sucesso.
- Manter `llms-full.txt` com 45 documents catalogados (tese + evidências
  canônicas) como ferramenta de diagnóstico interno.

## Estrutura canônica do arquivo no portal

Header com:

- `# Site:` URL canônica.
- `# Description:` posicionamento em 1 frase.
- `# Disclaimer:` "non-Google LLMs only" + nota Information Agents 24/7.
- `# DataModified:` data ISO 8601.
- `# Link:` /feed.xml para Information Agents.
- `# YMYL:` CRÍTICO declarado.

Corpo: lista de URLs canônicas agrupadas por hub.

## Cross-referencias canônicas

- Manifesto JSON-LD complementar em `/.well-known/ai-policy.json` v1.2.
- Manifesto MCP em `/.well-known/mcp.json` (padrão emergente de fato,
  detalhes em `[[concepts/mcp-protocol]]`).
- Feed RSS canônico em `/feed.xml` (RFC 822, dc:creator por entrada).
