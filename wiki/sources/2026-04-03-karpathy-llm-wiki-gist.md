---
name: 2026-04-03-karpathy-llm-wiki-gist
type: source
source_type: gist
status: stable
created: 2026-05-26
updated: 2026-05-26
publication_date: 2026-04-03
author: Andrej Karpathy
url: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
related:
  - llm-wiki-karpathy
  - ADR-001-adopcao-llm-wiki
---

# Karpathy LLM Wiki Gist (3 abr 2026)

Fonte canônica da arquitetura da camada `wiki/` deste repositório.

## Bibliografia mínima

- **Autor:** Andrej Karpathy.
- **Publicado:** 3 de abril de 2026.
- **URL:** https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- **Formato:** gist GitHub público, markdown.
- **Linhagem citada pelo próprio autor:** Vannevar Bush, Memex (1945).
- **Implementações comunitárias mapeadas:** 15+ no thread de comentários
  (ΩmegaWiki, Link, Synthadoc, Synto, sqz, LLM-WIKI-MCP, SciAI Wiki).

## Claims canônicos extraídos

| ID    | Claim                                                                                              | Alimenta                  |
|-------|----------------------------------------------------------------------------------------------------|---------------------------|
| K-01  | "RAG re-descobre conhecimento do zero a cada query; acúmulo é zero."                               | [[llm-wiki-karpathy]]     |
| K-02  | "LLM Wiki é stateful; conhecimento ingerido vira páginas que compõem ao longo do tempo."           | [[llm-wiki-karpathy]]     |
| K-03  | "Wikis humanos morrem porque manutenção cresce mais rápido que valor; LLMs invertem esse modo."    | [[llm-wiki-karpathy]]     |
| K-04  | "Arquitetura de 3 camadas: raw sources (imutável), wiki core (mutável), schema (configuração)."    | [[llm-wiki-karpathy]] [[ADR-001-adopcao-llm-wiki]] |
| K-05  | "4 operações canônicas: Ingest, Query, Lint, Maintain."                                            | `scripts/wiki/*.md`       |
| K-06  | "Ingest: 1 fonte toca 10-15 páginas wiki + apêndice no log."                                       | `scripts/wiki/ingest-playbook.md` |
| K-07  | "Query: buscar no wiki primeiro; respostas valiosas viram páginas novas."                          | `scripts/wiki/query-playbook.md` |
| K-08  | "Lint: checa contradições, órfãos, missing links, stale claims."                                   | `scripts/wiki/lint.py`    |
| K-09  | "index.md: catálogo navegável; substitui infra RAG em escala moderada."                            | `wiki/index.md`           |
| K-10  | "log.md: ledger append-only; parseável com Unix tools."                                            | `wiki/log.md`             |
| K-11  | "Pattern, não blueprint: cada implementação co-evolui com seu agente."                             | `wiki/README.md`          |
| K-12  | "Tooling ecosystem opcional: qmd, Obsidian Web Clipper, local images, graph viz, Marp, git."       | (futuro)                  |
| K-13  | "Humanos curam fontes e direcionam análise; LLMs fazem a contabilidade."                           | `CLAUDE.md` bloco Wiki    |

## Páginas wiki alimentadas por esta fonte

- [[llm-wiki-karpathy]] — conceito canônico no nosso wiki.
- [[ADR-001-adopcao-llm-wiki]] — decisão arquitetural derivada.
- `wiki/README.md`, `wiki/index.md`, `wiki/log.md` — skeleton.
- `scripts/wiki/lint.py`, `scripts/wiki/ingest-playbook.md`,
  `scripts/wiki/query-playbook.md` — operacionalização das 4 operações.

## Notas de leitura

Karpathy explicitamente evita prescrever diretórios, formatos de página
e tooling. Adaptamos:

- Diretório raiz `wiki/` (vs `kb/` ou `content/notes/` de outras
  implementações comunitárias).
- Frontmatter YAML obrigatório com `name`, `type`, `status`, `created`,
  `updated`, `sources`, `related`.
- Filenames ASCII kebab-case.
- Sintaxe de cross-link `[[slug]]` herdada de Obsidian e TiddlyWiki.

Comparativos com implementações comunitárias relevantes em
`docs/governance/karpathy-llm-wiki-methodology.md`.
