# Wiki — geo-ipog

> Base de conhecimento persistente do programa GEO IPOG, mantida por agentes LLM
> conforme o padrão descrito por Andrej Karpathy em
> [gist.github.com/karpathy/442a6bf555914893e9891c11519de94f](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
> (3 de abril de 2026).

## Por que esta camada existe

O repositório já tem `docs/research/` (dossiês imutáveis), `docs/governance/`
(documentos canônicos longos) e `STATUS.md` (ledger narrativo). O que faltava
era um grafo **vivo, atômico e indexado** que evite reescrever a mesma análise
em cada nova onda. Esta wiki resolve exatamente esse gap.

Tese central: **conhecimento que não é catalogado é redescoberto**. Cada onda
de pesquisa que termina em um único dossiê grande paga o custo de re-leitura
toda vez que alguém precisa de uma sub-parte. Atomizar em páginas de entidade
e de conceito, com cross-links explícitos, faz o conhecimento compor ao longo
do tempo em vez de evaporar.

## Layout

```
wiki/
  README.md       — este arquivo
  index.md        — catálogo navegável por categoria
  log.md          — ledger append-only de operações de ingest, query e lint
  entities/       — pessoas, instituições, ferramentas, domínios
  concepts/       — definições atômicas (GEO, llms.txt, mention rate, EEAT, etc.)
  decisions/      — ADRs estilo "por que escolhemos X"
  sources/        — 1 página por dossiê externo, paper, gist, dataset
  reviews/        — relatórios periódicos de lint e saúde do grafo
```

## Operações canônicas

Os playbooks completos vivem em `scripts/wiki/`:

- **Ingest** (`scripts/wiki/ingest-playbook.md`) — processa uma fonte nova
  (URL, paper, dossiê interno, transcrição) e atualiza 5 a 15 páginas wiki,
  com entrada no log.
- **Query** (`scripts/wiki/query-playbook.md`) — responde uma pergunta
  consultando o índice antes de pesquisar externamente; respostas valiosas
  viram novas páginas.
- **Lint** (`scripts/wiki/lint.py`) — checa órfãos, cross-links quebrados,
  frontmatter ausente, claims marcados como conflituosos e fontes paradas
  há mais de 90 dias.

## Convenções obrigatórias

1. Frontmatter YAML em toda página, com `name`, `type`, `status`, `created`,
   `updated`, `sources`, `related`.
2. Cross-links no corpo via sintaxe `[[slug]]`. Um link para slug inexistente
   é tratado como tarefa pendente, não erro.
3. Filenames em ASCII kebab-case. Acentuação mora no corpo, nunca no path.
4. Português do Brasil com acentuação completa em todo texto humano.
5. Sem emojis. Sem em-dash em copy editorial.
6. Page atômica: uma página descreve **uma** coisa. Se precisar de duas, são
   duas páginas com cross-link.
7. Atualizar `log.md` sempre que uma operação de ingest, query ou lint
   modificar o grafo.

## Como começar

1. Ler `wiki/index.md` para mapa atual do território.
2. Antes de iniciar pesquisa nova, buscar `wiki/concepts/` e `wiki/entities/`
   por termos do tema.
3. Antes de fechar uma sessão de trabalho, decidir: o que aprendi merece uma
   página? Se sim, criar e registrar no log.
4. Rodar `python scripts/wiki/lint.py` antes de qualquer push que toque
   `wiki/`.

## Linhagem

A ideia tem raiz em Vannevar Bush (Memex, 1945). O que mudou é a manutenção:
LLMs não cansam, não esquecem cross-links, não pulam atualização. Detalhes
em `wiki/concepts/llm-wiki-karpathy.md` e na decisão arquitetural
`wiki/decisions/ADR-001-adopcao-llm-wiki.md`.
