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
2026-08-27 | ingest | claude-opus-5 | W25: tres dossies de evidencia com fonte aberta e conferida. A (jogo, apostas online, dependencias, formacao, 30 fontes), B (insonia e TCC-I, dor cronica, psico-oncologia e paliativos, psicologia do transito, psicodelicos e neuromodulacao, 61 fontes), C (GEO e repurposing por canal em 2026, 31 fontes). | docs/research(outbox dossie-A/B/C)
2026-08-27 | maintain | claude-opus-5 | W25: 31 paginas ineditas (5 guias, 4 comparativos, 4 FAQs, 1 metodo, 3 intervencoes, 3 evidencias, 1 tema, 8 pecas sociais, 2 ferramentas editoriais). Territorios novos: transtorno do jogo e apostas online, insonia e TCC-I, dor cronica, psico-oncologia e paliativos, avaliacao psicologica no transito. Build 392 paginas, astro check 0 erros. | site/src/pages/{guias,comparativos,faq,metodos,intervencoes,evidencias,temas,conteudo-social}
2026-08-27 | maintain | claude-opus-5 | W25: gates mecanicos novos. scripts/lint-editorial.py transforma a Diretriz Editorial em cheque com arquivo e linha; scripts/lint-links.py resolve href interno contra as rotas reais. Baseline do portal: 323 bloqueios em 361 arquivos, dominados por travessao em prosa herdado. | scripts/lint-editorial.py scripts/lint-links.py
2026-08-27 | maintain | claude-opus-5 | W25: orquestrador multi-LLM executado com os 5 providers (14/14 tarefas, US$ 3,54). O proprio quality gate reprovou os artigos que ele escreveu (sem CTA, travessao em titulo, meta-comentario, JSON-LD ausente); aproveitados o mapa de lacunas, a escuta social e o plano de distribuicao. | docs/research(outbox execution_20260827_071548.json)
