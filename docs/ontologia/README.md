# Ontologia e Taxonomia — Programa GEO IPOG

> **Status:** vigente desde 2026-05-10 (criado durante healthcheck para organizar contexto e melhorar resultados GEO)
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Cadência de revisão:** trimestral + ad hoc quando entidade nova entra

Esta pasta consolida a **arquitetura conceitual** do programa GEO IPOG. Sem ontologia canônica, cada peça editorial reinventa naming, cada Schema duplica entidade, cada label GitHub tagueia em dimensão diferente — Entity Consistency Score cai e LLMs perdem o IPOG na borda do recall.

A leitura é prescritiva: ontologia define **o que é** (entidades, propriedades, relacionamentos); taxonomia define **como organizar** (hierarquia, naming, labels). Schema é a **expressão técnica** da ontologia em JSON-LD. Knowledge Graph é a **representação operacional** da ontologia em formato de grafo.

## Documentos canônicos

| Documento | Foco | Quando consultar |
|---|---|---|
| `ONTOLOGIA-CANONICA.md` | Entidades + Relacionamentos + Propriedades | Antes de criar página, peça, perfil, novo conceito |
| `TAXONOMIA-CONTEUDO.md` | Hierarquia + Naming + Labels GitHub + Pastas + URLs | Antes de nomear arquivo, criar issue, criar label, escolher slug |
| `KNOWLEDGE-GRAPH-IPOG.md` | Grafo Wikidata-ready + Edges + Pipeline | Antes de submeter Wikidata, validar Person Schema, mapear Entity Consistency |
| `SCHEMA-IPOG-CANONICAL.md` | JSON-LD concreto do IPOG (instâncias prontas) | Antes de implementar Schema em página IPOG ou em peça assinada por Alexandre |

## Princípios

1. **Uma entidade, um identificador.** Cada conceito do programa tem ID canônico que aparece em Schema, Wikidata, GitHub labels, naming de arquivo. Sem isso, LLMs fragmentam recall.
2. **Naming canônico imutável.** "Brasil GEO", "IPOG", "MBA Online de Psicologia [Cluster]", "Frente Regional 51 cidades CNPJ-próprio" são fixos. Não se reescreve.
3. **Relacionamentos preferem Schema.org sobre invenção.** Quando Schema.org tem propriedade que cobre o relacionamento, usa-se ela. Inventa-se só quando não existe.
4. **Taxonomia hierárquica não-redundante.** Cada peça de conteúdo cabe em exatamente um lugar. Duplicação cria confusão de Entity Consistency.
5. **Labels GitHub em 10 dimensões ortogonais.** priority, phase, quarter, vetor, cluster, persona, horizon, janela, tipo, owner, gate, blocker, concorrente, risco. Cada issue ganha 3-7 labels — uma por dimensão relevante.

## Cross-links

- `audits/SCHEMA-PATTERNS.md` — templates Schema.org canônicos (vão ser expandidos com instâncias IPOG concretas)
- `audits/PLAYBOOK-AUDITORIA-NAIA.md` — checks que validam aderência à ontologia
- `docs/CONTEXTO-AMPLIADO-2026-05-10.md` — visão estratégica integrada
- `docs/HEALTHCHECK-2026-05-10.md` — auditoria que motivou esta reestruturação
- `audits/benchmarking/PAPERS-2025-2026-PROFUNDIDADE.md` seção 7 — papers de Knowledge Graph que sustentam as decisões abaixo
