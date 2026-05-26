# Query playbook — wiki/ Karpathy

Receita canônica para responder uma pergunta operacional consultando o
grafo wiki/ antes de pesquisar externamente. Não é script automático:
é um prompt de operação para agente LLM.

## Quando usar

- Pergunta do usuário pode ser respondida com conhecimento já
  catalogado.
- Suspeita que o tema já foi pesquisado em onda anterior.
- Antes de disparar nova chamada Perplexity ou de spawn de sub-agent.

## Passo a passo

### 1. Buscar no índice

Abrir `wiki/index.md` e procurar termos do pedido em:

- Entities (se a pergunta menciona uma pessoa, instituição ou
  ferramenta nomeada).
- Concepts (se a pergunta menciona um conceito, KPI ou framework).
- Decisions (se a pergunta é "por que escolhemos X").
- Sources (se a pergunta é "o que aquele paper diz sobre Y").
- Backlog (se o tema está declarado como pendente, talvez exija ingest
  primeiro).

### 2. Buscar cross-references nas páginas encontradas

Cada página wiki tem `related:` no frontmatter e cross-links `[[slug]]`
no corpo. Esses são as próximas leituras candidatas. Em geral 2 hops
bastam para mapear o territorio.

### 3. Decidir se a resposta está no grafo

Três cenários:

- **Resposta completa.** Sintetizar usando 2-5 páginas wiki como base.
  Citar nomes de slugs como referência.
- **Resposta parcial.** Cobrir o que está no grafo, sinalizar
  explicitamente o gap, considerar abrir ingest novo.
- **Sem cobertura.** Backlog tem o tema? Promover a ingest. Backlog
  não tem? Adicionar e considerar abrir wave de research.

### 4. Filar a resposta como página nova (se valiosa)

Karpathy K-07: **respostas valiosas viram páginas novas.** Critério de
"valiosa":

- Resposta exigiu sintetizar 3+ páginas wiki existentes.
- Pergunta provavelmente vai se repetir (decisão recorrente, conceito
  reusável).
- Síntese contém claim novo não-explícito nas páginas-fonte.

Se sim, criar página em `wiki/concepts/` (se síntese conceitual) ou
`wiki/decisions/` (se decisão derivada) com cross-links para todas as
páginas-fonte usadas.

### 5. Apendar `wiki/log.md`

```
YYYY-MM-DD | query | <agent-id> | <pergunta resumida> | <paginas consultadas ou criadas>
```

### 6. Responder ao usuário

Citar páginas wiki por slug, não só o link http. Permite que ele abra
no editor e itere.

## Anti-padrões

- Pular o índice e cair direto em busca externa. Custa tempo, perde
  acúmulo, viola Karpathy K-01.
- Filar como página toda resposta. Páginas devem ser densas e atômicas;
  ruído mata o grafo.
- Citar página wiki sem dar slug navegável. Quebra reproducibilidade.
- Responder sem registrar no log se a query foi "operacional relevante"
  (decisão de wave, mudança de prioridade, escolha técnica).

## Heurística de qualidade

Boa query operacional respondida via wiki:

1. Tempo total <2 minutos.
2. 0 chamadas externas (Perplexity, WebSearch).
3. Resposta cita 2-4 slugs wiki.
4. Se for valiosa, vira página nova com cross-links.
5. Log apêndice registra.
