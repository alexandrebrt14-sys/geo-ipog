---
name: geo
type: concept
status: stable
created: 2026-05-26
updated: 2026-05-26
sources:
  - 2026-05-17-seo-geo-kb-canonical
related:
  - llms-txt
  - mention-rate
  - eeat-ymyl
  - schema-graph-triplo
sameAs:
  - https://en.wikipedia.org/wiki/Generative_engine_optimization
---

# GEO — Generative Engine Optimization

Disciplina que otimiza presença, citação e atribuição de uma entidade ou
conteúdo dentro das respostas geradas por motores de busca generativos
(ChatGPT, Claude, Gemini, Perplexity, Copilot, Grok, Brave Summarizer,
Bing AI). Sucessora natural do SEO em uma camada onde a resposta é
sintetizada antes de o usuário clicar.

## Tese central canônica 2026

"GEO is still SEO" foi a afirmação oficial do Google no I/O 2026
(maio/2026): boas práticas técnicas de SEO continuam sendo a base
necessária, mas insuficiente. O delta vem de:

1. **Schema.org rico** (`@graph` triplo com `Article` + `Organization`
   + `Person` reconciliados por `@id`). Detalhes em
   [[schema-graph-triplo]].
2. **Feed RSS canônico** para Information Agents 24/7.
3. **Autoridade externa** atestável (Wikidata, sameAs, citações em
   mídia confiável).
4. **Páginas atômicas e citáveis** com TL;DR + Speakable schema +
   FAQ deep.
5. **YMYL com [[eeat-ymyl]]** explícito quando aplicável.

## KPIs canônicos derivados

- [[mention-rate]] — % de prompts âncora em que a entidade é citada.
- `[[concepts/citation-rate]]` — # citações / # respostas relevantes.
- `[[concepts/share-of-voice]]` — fatia vs concorrentes diretos.
- `[[concepts/aigvr]]` — frequência × proeminência (framework ELCA).

## Frameworks vendor relevantes em 2026

- Profound (Série C US$ 96M @ US$ 1B em 24-02-2026).
- Peec, Otterly, AthenaHQ, Brandlight, Trakkr.
- Ahrefs Brand Radar.
- SEMrush AI Visibility Toolkit.
- Conductor (ISO 42001).

Gap relevante: ausência de player BR maduro. Detalhes em
`docs/research/wave-B-frameworks-vendors-20260517.md`.

## Anti-padrões herdados

- "Garante AI Overview", "100% de aprovação", "ChatGPT já cita",
  "especialista #1". Veto absoluto. Conceito 26 da taxonomia editorial
  em `docs/governance/GEO_50_CONCEITOS_CANONICAL.md`.
- Confiar em ranking de LLM como métrica direta sem distinguir
  Mention ≠ Citation.
- Tratar `llms.txt` como sinal de ranking Google: não é. Detalhes em
  [[llms-txt]].
