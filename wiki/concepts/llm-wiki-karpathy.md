---
name: llm-wiki-karpathy
type: concept
category: architecture-pattern
status: stable
created: 2026-05-26
updated: 2026-05-26
sources:
  - 2026-04-03-karpathy-llm-wiki-gist
related:
  - geo
sameAs:
  - https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
---

# LLM Wiki (padrão Karpathy)

Padrão arquitetural proposto por Andrej Karpathy em 03-04-2026 para
construir bases de conhecimento persistentes mantidas por agentes LLM.
Conceito-mãe desta camada `wiki/` do repositório `geo-ipog`. Detalhes
da fonte canônica em [[sources/2026-04-03-karpathy-llm-wiki-gist]].

## Tese central

**RAG é amnésico.** Cada query re-descobre conhecimento. Acúmulo zero.
**LLM Wiki é stateful.** Conhecimento ingerido vira páginas markdown
vivas que compõem ao longo do tempo. O modo de falha humano (manutenção
cresce mais rápido que valor) se inverte: LLMs não cansam, não esquecem
cross-links, não pulam atualização.

## Arquitetura de 3 camadas

1. **Raw sources** (imutável). Humano cura. LLM lê. No nosso repo:
   `docs/research/`, `audits/benchmarking/`, transcrições, PDFs.
2. **Wiki core** (mutável). LLM mantém. Humano lê. No nosso repo:
   `wiki/entities/`, `wiki/concepts/`, `wiki/decisions/`,
   `wiki/sources/`.
3. **Schema** (configuração). Convenções e workflows. No nosso repo:
   `CLAUDE.md`, `wiki/README.md`, `scripts/wiki/*-playbook.md`.

## 4 operações canônicas

- **Ingest.** Uma fonte nova toca 5 a 15 páginas wiki. Apêndice no
  `wiki/log.md`.
- **Query.** Buscar no wiki antes de pesquisar externamente. Respostas
  valiosas viram páginas novas.
- **Lint.** Saúde periódica do grafo (órfãos, cross-links quebrados,
  contradições, stale claims).
- **Maintain.** Cross-references contínuos sempre que uma página é
  tocada.

## 2 arquivos de navegação críticos

- `wiki/index.md` — catálogo navegável por categoria. Substitui infra
  RAG em escala moderada.
- `wiki/log.md` — append-only ledger parseável com Unix tools.

## Por que adotamos no geo-ipog

Antes da camada wiki, cada onda de pesquisa do programa terminava em um
único dossiê grande em `docs/research/`. A onda seguinte pagava o custo
de re-leitura para encontrar sub-partes. Em maio/2026 acumulamos 19
dossiês e a re-leitura virou gargalo concreto.

Decisão arquitetural completa em [[decisions/ADR-001-adopcao-llm-wiki]].

## Linhagem

Vannevar Bush (Memex, 1945). Conhecimento privado, curado,
associativamente linkado. Bush não resolveu manutenção porque a
manutenção era humana e o humano cansa. LLMs resolvem.
