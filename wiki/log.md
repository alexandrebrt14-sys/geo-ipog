# Wiki Log — geo-ipog

> Append-only ledger de operações no wiki. Parseável com `grep`, `awk`,
> `sed`. Nunca editar entradas anteriores. Sempre append no final.
>
> Formato de linha: `YYYY-MM-DD | tipo | autor | descricao | paginas-tocadas`
>
> Tipos válidos: `ingest`, `query`, `lint`, `maintain`, `init`.

---

2026-05-26 | init | claude-opus-4-7 | Inauguracao da camada wiki Karpathy. Skeleton + 7 entities + 6 concepts + 1 ADR + 3 sources + 1 review baseline. | wiki/README.md wiki/index.md wiki/log.md
2026-05-26 | ingest | claude-opus-4-7 | Ingerido gist Karpathy LLM Wiki como fonte canonica de arquitetura. | sources/2026-04-03-karpathy-llm-wiki-gist.md concepts/llm-wiki-karpathy.md decisions/ADR-001-adopcao-llm-wiki.md
2026-05-26 | ingest | claude-opus-4-7 | Ingerida KB SEO+GEO 2026-05-17 como fonte canonica de conceitos GEO. | sources/2026-05-17-seo-geo-kb-canonical.md concepts/geo.md concepts/llms-txt.md concepts/mention-rate.md concepts/eeat-ymyl.md concepts/schema-graph-triplo.md
2026-05-26 | ingest | claude-opus-4-7 | Ingerido bloco autismo adulto 2026-05-19 Larissa como fonte editorial de pivot do portal. | sources/2026-05-19-autismo-research-larissa.md entities/larissa-caramaschi.md
2026-05-26 | maintain | claude-opus-4-7 | Catalogadas 7 entidades canonicas do programa (IPOG, Brasil GEO, Alexandre, Larissa, Ronan, Bruno, NAIA). | entities/*.md
2026-05-26 | lint | claude-opus-4-7 | Primeiro lint do grafo. Resultado salvo em reviews/2026-05-26-baseline.md. | reviews/2026-05-26-baseline.md
2026-05-26 | lint | scripts/wiki/lint.py | orfaos=0 broken=0 stale=0 conflitos=0 | wiki/log.md
2026-06-25 | ingest | claude-opus-4-8 | Pesquisa viva 2026 (WebSearch) para 5 waves de conteudo: TEA, burnout/INSS, IA clinica/regulacao, neurodiversidade adulta/AHSD, perinatal, mercado/GEO. Fontes BR e globais reais, spot-check. | docs/research(scratchpad dossie-A/B)
2026-06-25 | maintain | claude-opus-4-8 | W24: 19 paginas ineditas publicadas (5 guias, 4 comparativos, 4 FAQs, 6 snippets sociais) + reforco do menu Conteudo e social. astro check 0 erros, build 352 paginas, IndexNow 3 engines. | site/src/pages/{guias,comparativos,faq,conteudo-social}
