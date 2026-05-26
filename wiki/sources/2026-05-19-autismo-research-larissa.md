---
name: 2026-05-19-autismo-research-larissa
type: source
source_type: internal-research-bundle
status: stable
created: 2026-05-26
updated: 2026-05-26
publication_date: 2026-05-19
author: brasil-geo
internal_path: _tmp/autismo-research-20260519/
related:
  - larissa-caramaschi
  - eeat-ymyl
---

# Bloco de research autismo adulto Larissa (19 mai 2026)

Pesquisa Perplexity em 6 frentes paralelas que sustentou o pivô
editorial do portal `posgraduacaopsicologia.com` para ter
[[larissa-caramaschi]] como autoridade central em autismo nível 1 de
suporte em adultos.

## Bibliografia mínima

- **Caminho interno:** `_tmp/autismo-research-20260519/` (6 arquivos).
- **Publicado:** 19-05-2026 (W21 sessão UU).
- **Stack:** 6 chamadas Perplexity Sonar Pro paralelas via bypass
  direto (`api.perplexity.ai/chat/completions` model `sonar-pro`).
- **Custo estimado:** ~US$ 0,80 em Perplexity + ~US$ 35 em Opus para
  redação subsequente.

## Frentes de pesquisa

| ID  | Frente                                              | Saída                                        |
|-----|-----------------------------------------------------|----------------------------------------------|
| 01  | Diagnóstico tardio em adultos                       | `/autismo/artigos/diagnostico-tardio-adulto-2026` |
| 02  | Relacionamentos NT-autista                          | `/autismo/artigos/relacionamentos-amorosos-nt-autista-2026` |
| 03  | Camuflagem e CAT-Q                                  | `/autismo/artigos/camuflagem-masking-cat-q-adulto-2026` |
| 04  | Clínica adulto baseada em evidência                 | `/autismo/artigos/clinica-tea-adulto-evidencia-2026` |
| 05  | Fronteira de pesquisa 2026                          | `/autismo/artigos/fronteira-pesquisa-tea-adulto-2026` |
| 06  | Vida cotidiana e trabalho                           | `/autismo/artigos/vida-cotidiana-trabalho-autista-adulto-2026` |

## Páginas wiki alimentadas

- [[larissa-caramaschi]] — função, voz editorial, cobertura.
- [[eeat-ymyl]] — aplicação canônica do disclaimer e do `reviewedBy`.

## Resultados editoriais derivados (W22, 24-05-2026)

- 12 páginas novas em `src/pages/autismo/`.
- Glossário com 54 verbetes em 6 clusters.
- Componente `YMYLDisclaimer.astro` canônico com variante `autismo`
  injetado em 10 páginas via patch idempotente.
- Home reescrita (`src/pages/index.astro`) com nova ontologia centrada
  em autismo adulto.
- Limpeza de jargão GEO visível: 152 arquivos legados modificados, 652
  substituições.

## Compliance CFP aplicada

- Identity-first como default ("pessoa autista", "adulto autista").
- Vocabulário ético: "autismo nível 1 de suporte" (nunca "leve",
  "Asperger", "alto funcionamento").
- Resoluções CFP 03/2007, 11/2018, 06/2019: sem promessa de cura, sem
  comparativo com outros profissionais, sem antes/depois.
- Vinhetas hipotéticas marcadas como compostas.

## Notas de leitura

- A frente 05 (fronteira de pesquisa) deve ser re-rodada
  trimestralmente para manter `dateModified` real.
- Considerar abrir frente 07 (mulheres autistas adultas) dada a
  saturação editorial em homens autistas adultos detectada na frente 04.
- Considerar criar `wiki/entities/cat-q.md` se o instrumento for
  referenciado em mais de 3 páginas adicionais.
