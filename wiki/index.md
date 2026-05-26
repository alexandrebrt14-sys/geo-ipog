# Wiki Index — geo-ipog

> Catálogo navegável da wiki, organizado por categoria. Substitui infra RAG
> até escala moderada. Mantido em ordem alfabética por slug.
>
> Última atualização do índice: 2026-05-26.

## Como usar este índice

- Antes de criar uma página nova, conferir se ela já existe.
- Antes de iniciar uma pesquisa externa nova, conferir se o tema já está
  coberto em `concepts/` ou já documentado em uma `source/`.
- Toda página listada aqui tem frontmatter canônico e ao menos um cross-link
  `[[slug]]`. Páginas sem isso são órfãs e disparam alerta do lint.

---

## Entities

Pessoas, instituições, ferramentas, domínios, contas. Uma página por entidade
nomeada que seja referenciada mais de uma vez no projeto.

- [alexandre-caramaschi](entities/alexandre-caramaschi.md) — CEO Brasil GEO,
  head do programa GEO IPOG.
- [brasil-geo](entities/brasil-geo.md) — Executor do programa. BRGEO LTDA,
  CNPJ 66.051.295/0001-33.
- [bruno-azambuja](entities/bruno-azambuja.md) — Gerente de Marketing IPOG,
  interlocutor operacional.
- [ipog](entities/ipog.md) — Instituto de Pós-Graduação e Graduação. Cliente.
- [larissa-caramaschi](entities/larissa-caramaschi.md) — Psicóloga,
  autoridade central em autismo nível 1 adulto no portal.
- [naia](entities/naia.md) — Ferramenta de diagnóstico GEO usada como camada
  de monitoramento técnico.
- [ronan-maia](entities/ronan-maia.md) — CEO IPOG, sponsor executivo do
  programa.

## Concepts

Definições atômicas que aparecem em múltiplas páginas, decisões e dossiês.
Uma página por conceito reusável.

- [eeat-ymyl](concepts/eeat-ymyl.md) — Expertise, Experience, Authoritativeness,
  Trustworthiness em conteúdo Your-Money-Your-Life.
- [geo](concepts/geo.md) — Generative Engine Optimization. Disciplina central
  do programa.
- [llm-wiki-karpathy](concepts/llm-wiki-karpathy.md) — Padrão arquitetural
  desta wiki. Conceito-mãe da camada.
- [llms-txt](concepts/llms-txt.md) — Arquivo declarativo para LLMs. Status
  controverso em 2026.
- [mention-rate](concepts/mention-rate.md) — KPI principal do programa.
- [schema-graph-triplo](concepts/schema-graph-triplo.md) — Padrão de
  reconciliação JSON-LD adotado no portal.

## Decisions

ADRs (Architectural Decision Records). Uma página por decisão que merecia
ser explicada por escrito porque o "porquê" não cabe em um commit message.

- [ADR-001-adopcao-llm-wiki](decisions/ADR-001-adopcao-llm-wiki.md) —
  Por que adotamos o padrão LLM Wiki Karpathy em 2026-05-26.

## Sources

Uma página por fonte externa ou dossiê interno que vale referenciar mais de
uma vez. Cada source page lista: bibliografia mínima, claims extraídos e
páginas wiki que ela alimenta.

- [2026-04-03-karpathy-llm-wiki-gist](sources/2026-04-03-karpathy-llm-wiki-gist.md)
  — Gist original de Andrej Karpathy. Fonte canônica desta camada.
- [2026-05-17-seo-geo-kb-canonical](sources/2026-05-17-seo-geo-kb-canonical.md)
  — KB SEO+GEO 2026 consolidada (5 waves A-E).
- [2026-05-19-autismo-research-larissa](sources/2026-05-19-autismo-research-larissa.md)
  — 6 dossiês Perplexity sobre autismo adulto que alimentaram pivô editorial.

## Reviews

Relatórios periódicos de saúde do grafo gerados por lint.

- [2026-05-26-baseline](reviews/2026-05-26-baseline.md) — Estado inicial do
  grafo no dia da inauguração da camada.

---

## Backlog explícito de páginas pendentes

Páginas mencionadas em cross-links mas ainda não criadas (lint reporta como
"broken link" mas tratamos como TODO):

- `[[concepts/citation-rate]]`
- `[[concepts/share-of-voice]]`
- `[[concepts/aigvr]]`
- `[[concepts/speakable-schema]]`
- `[[concepts/indexnow]]`
- `[[concepts/mcp-protocol]]`
- `[[entities/cloudflare-pages]]`
- `[[entities/posgraduacaopsicologia-com]]`
- `[[entities/ipog-edu-br]]`
- `[[entities/perplexity]]`
- `[[entities/claude-anthropic]]`
- `[[decisions/ADR-002-portal-independente-vs-ipog-edu-br]]`
- `[[decisions/ADR-003-stack-astro-cloudflare-pages]]`
- `[[decisions/ADR-004-perplexity-bypass-vs-orchestrator]]`

Cada onda futura deve fechar pelo menos 1 item deste backlog ou justificar
porque não.
