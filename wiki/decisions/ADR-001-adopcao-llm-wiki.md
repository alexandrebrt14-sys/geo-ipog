---
name: ADR-001-adopcao-llm-wiki
type: decision
status: accepted
created: 2026-05-26
updated: 2026-05-26
decision_date: 2026-05-26
decided_by: alexandre-caramaschi
sources:
  - 2026-04-03-karpathy-llm-wiki-gist
related:
  - llm-wiki-karpathy
  - brasil-geo
  - ipog
---

# ADR-001 — Adoção do padrão LLM Wiki Karpathy na camada `wiki/` do repositório `geo-ipog`

**Status:** Accepted
**Data da decisão:** 2026-05-26
**Decidido por:** [[alexandre-caramaschi]]
**Sponsor:** programa GEO IPOG (cliente [[ipog]])

## Contexto

Em 2026-05-26 o repositório `geo-ipog` acumulava:

- 19 dossiês de research em `docs/research/` (waves A-E de 17-05, waves
  PP-TT, autismo 6-frentes, KB SEO+GEO, perplexity 9 temas).
- 1 KB SEO+GEO 2026 consolidada (`seo-geo-knowledge-base-2026-05-17.md`).
- 50 conceitos canônicos GEO em arquivo monolítico
  (`GEO_50_CONCEITOS_CANONICAL.md`).
- Histórico de decisões em arquivo monolítico
  (`HISTORICO-DECISOES-CANONICAS.md`).
- 332 páginas em produção no portal demonstrativo.

Sintomas observados:

1. **Re-leitura de dossiês como gargalo.** Cada nova onda paga custo de
   re-leitura de 19 arquivos longos para encontrar sub-partes
   relevantes.
2. **Acúmulo sem composição.** Dossiês são imutáveis e narrativos. Não
   há grafo navegável que cresça por adição de cross-links.
3. **Frontmatter ausente em research e governance.** Impossível
   automatizar queries por entidade, conceito, fonte ou data.
4. **`STATUS.md` é ledger narrativo, não parseável.** Histórico de
   waves precisa ser lido para auditoria, não consultado.

## Alternativas consideradas

1. **Status quo.** Continuar com dossiês monolíticos + STATUS.md
   narrativo. Custo de re-leitura cresce linearmente. Rejeitada.
2. **RAG sobre `docs/`.** Construir índice vetorial sobre todo o
   repositório. Resolve descoberta mas não resolve acúmulo nem
   composição. Cada query reinventa síntese. Rejeitada.
3. **Migrar tudo para Notion ou Obsidian externo.** Quebraria fluxo
   git-nativo, perderia integração com CI e perderia auditabilidade
   por commits. Rejeitada.
4. **LLM Wiki padrão Karpathy.** Adotar a camada `wiki/` com índice,
   log apêndice-only, páginas atômicas e cross-links explícitos.
   **Aceita.**

## Decisão

Adotar o padrão descrito em
[gist.github.com/karpathy/442a6bf555914893e9891c11519de94f](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
como camada complementar (não substitutiva) das existentes
`docs/research/`, `docs/governance/` e `STATUS.md`.

A camada `wiki/` é a **camada mutável de cross-link e síntese**. As
camadas anteriores permanecem como:

- `docs/research/`: raw sources imutáveis (Karpathy's "raw layer").
- `docs/governance/`: documentos longos canônicos com governança
  formal.
- `STATUS.md`: ledger narrativo por wave (para apresentação humana).
- `wiki/log.md`: ledger append-only parseável (para automação).

## Consequências

### Positivas esperadas

- Queries futuras consultam `wiki/index.md` antes de re-ler dossiês.
- Cada onda fecha pelo menos 1 item do backlog explícito de páginas
  pendentes, gerando composição mensurável.
- Lint automatizado detecta órfãos, cross-links quebrados e stale
  claims que hoje passam despercebidos.
- ADRs atomizadas substituem
  `docs/governance/HISTORICO-DECISOES-CANONICAS.md` de forma
  incremental (legado preservado, novas decisões nascem aqui).

### Negativas e custo

- Disciplina nova exigida: toda onda precisa atualizar `wiki/log.md` e
  criar ou tocar páginas wiki.
- Risco de duplicação com `docs/governance/` se a fronteira não for
  respeitada. Mitigação: regra explícita em `CLAUDE.md` de que
  governance é canônico longo, wiki é atômico cross-linkado.
- Custo inicial de seed: ~20 páginas escritas manualmente na inauguração
  (este commit).

### Métricas de sucesso (revisar em 30 dias)

- Crescimento mensurável: 5+ páginas novas por wave operacional.
- Backlog explícito de páginas pendentes reduz em pelo menos 1 item
  por wave.
- 0 órfãos não-justificados em `wiki/reviews/` mensal.
- Pelo menos 1 query operacional respondida via `wiki/index.md` sem
  re-leitura de dossiê.

## Implementação

Concluída em 2026-05-26 (este commit). Detalhes técnicos em
`scripts/wiki/lint.py`, `scripts/wiki/ingest-playbook.md`,
`scripts/wiki/query-playbook.md` e bloco "Wiki workflow obrigatório"
adicionado ao `CLAUDE.md`.
