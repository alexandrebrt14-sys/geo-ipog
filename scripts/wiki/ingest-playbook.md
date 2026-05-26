# Ingest playbook — wiki/ Karpathy

Receita canônica para processar uma fonte nova (URL, paper, dossiê
interno, transcrição) e atualizar de 5 a 15 páginas wiki, com apêndice
no `wiki/log.md`. Não é script automático: é um prompt de operação para
agente LLM (Claude Code, Codex ou compatível).

## Quando usar

- Recebeu link novo do usuário ou descobriu paper relevante.
- Terminou onda de research (Perplexity, sub-agents Opus) com dossiê
  novo em `docs/research/`.
- Recebeu transcrição de reunião com cliente que muda contexto.

## Pré-requisitos

- Repositório `geo-ipog` clonado, branch `main` atualizada.
- Acesso de escrita ao `wiki/`.
- Saber o domínio da fonte (research, governance, operação, externo).

## Passo a passo

### 1. Identificar tipo da fonte

| Fonte                                | Onde guardar a página `source`              |
|--------------------------------------|---------------------------------------------|
| Gist, paper arxiv, post de autor     | `wiki/sources/YYYY-MM-DD-slug.md`           |
| Dossiê interno em `docs/research/`   | `wiki/sources/YYYY-MM-DD-slug.md` (ponteiro)|
| Transcrição de reunião               | `wiki/sources/YYYY-MM-DD-meet-slug.md`      |
| Dataset                              | `wiki/sources/YYYY-MM-DD-dataset-slug.md`   |

### 2. Criar a página `source/`

Frontmatter mínimo:

```yaml
---
name: YYYY-MM-DD-slug
type: source
source_type: gist | paper | internal-dossier | meeting | dataset
status: stable | provisional
created: YYYY-MM-DD
updated: YYYY-MM-DD
publication_date: YYYY-MM-DD
author: <quem produziu>
url: <se externo>
internal_path: <se interno>
related: []
---
```

Corpo deve conter:

- **Bibliografia mínima.**
- **Claims canônicos extraídos** em tabela `| ID | Claim | Alimenta |`.
  Cada claim recebe ID estável (ex: `K-01` para Karpathy, `KB-01` para
  KB SEO+GEO etc.).
- **Páginas wiki alimentadas** (lista de cross-links).
- **Notas de leitura** opcionais.

### 3. Mapear claims para páginas wiki

Para cada claim, decidir:

- Alimenta uma página **existente**? Atualizar essa página, anexar nota
  de evidência, incrementar `updated`.
- Justifica página **nova**? Criar em `entities/`, `concepts/` ou
  `decisions/` conforme natureza.
- É **opinião isolada** sem suporte cruzado? Não criar página; deixar
  apenas na source.

Meta canônica Karpathy: 1 fonte nova toca 5 a 15 páginas. Se está
tocando menos de 3, talvez não justifique ingest. Se está tocando mais
de 20, provavelmente é uma fonte composta — decompor.

### 4. Aplicar cross-links

Toda página tocada deve ganhar pelo menos 1 cross-link `[[slug]]` para
outra página wiki relevante. Cross-link unidirecional aceito; lint
detecta órfãos.

### 5. Atualizar `wiki/index.md`

- Adicionar páginas novas na categoria certa, ordem alfabética por slug.
- Se criou conceito mencionado no backlog declarado, remover do backlog.
- Se mencionou conceito não-existente via `[[slug]]`, adicionar ao
  backlog.

### 6. Apendar `wiki/log.md`

Formato:

```
YYYY-MM-DD | ingest | <agent-id> | <descricao em 1 linha> | <paginas tocadas>
```

Nunca editar entradas anteriores. Sempre append no final.

### 7. Rodar lint

```bash
python scripts/wiki/lint.py
```

Endereçar `broken_crosslinks` (não no backlog) e `missing_frontmatter`
antes de commit. `stale` e `orphans` podem ser endereçados em batch.

### 8. Commit

Padrão: `feat(wiki): ingest <source-slug> + tocar N paginas`.

Inclui no commit: a source page nova, todas as páginas wiki tocadas, o
`index.md` atualizado e o `log.md` atualizado.

## Anti-padrões

- Criar página wiki com 1 parágrafo só para "abrir slot". Página atômica
  precisa de conteúdo real ou vira ruído.
- Fazer cross-link `[[slug]]` para slug que você não pretende criar nem
  declarar no backlog.
- Esquecer de atualizar `wiki/log.md`. Lint não exige mas auditoria
  futura precisa.
- Ingerir 1 fonte que toca <3 páginas. Provavelmente a fonte é fraca ou
  o grafo está pobre.
