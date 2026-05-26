# Metodologia LLM Wiki Karpathy aplicada ao geo-ipog

Documento canônico de governança que descreve a tese, as fontes
externas, as implementações comunitárias relevantes e a adaptação
concreta adotada no repositório `geo-ipog`.

Última revisão: 2026-05-26.

---

## 1. Origem

Andrej Karpathy publicou em 3 de abril de 2026 o gist
[gist.github.com/karpathy/442a6bf555914893e9891c11519de94f](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
descrevendo um padrão arquitetural para bases de conhecimento mantidas
por agentes LLM. O gist explicitamente evita prescrever diretórios,
formatos e tooling: é uma ideia para ser "copiada, colada e adaptada".

## 2. Tese central

**RAG é amnésico.** Cada query re-descobre conhecimento do zero. Não
há acúmulo entre execuções. O custo cognitivo por consulta cresce
indefinidamente com o tamanho da base.

**LLM Wiki é stateful.** Conhecimento ingerido vira páginas markdown
vivas que compõem ao longo do tempo. Conexões pré-estabelecidas.
Contradições já sinalizadas. Cada onda nova reduz custo da próxima.

**Inversão do modo de falha humano.** Wikis humanos morrem porque
manutenção cresce mais rápido que valor. LLMs não cansam, não esquecem
cross-references, não pulam atualização. O humano cura fontes e
direciona análise; o LLM faz a contabilidade.

## 3. Linhagem intelectual

- **Vannevar Bush, "As We May Think", 1945.** Conceito do Memex:
  conhecimento privado, curado, associativamente linkado. Bush não
  resolveu manutenção porque a manutenção era humana e o humano cansa.
- **Ted Nelson, Project Xanadu, anos 1960.** Hipertexto bidirecional
  com transclusão. Inspiração para a sintaxe `[[slug]]` adotada.
- **Niklas Luhmann, Zettelkasten, anos 1960-1990.** Cartões atômicos
  com cross-references explícitos. Princípio "uma ideia, um cartão"
  herdado em "uma página descreve uma coisa".
- **TiddlyWiki, Obsidian.** Implementações modernas do princípio
  Zettelkasten. Sintaxe `[[slug]]` herdada.
- **Andy Matuschak, evergreen notes.** "Notes should be atomic, densely
  linked, and concept-oriented." Princípios incorporados no nosso
  padrão de página atômica.

## 4. Implementações comunitárias relevantes mapeadas

O thread de comentários do gist Karpathy lista 15+ implementações.
Selecionamos 3 para benchmarking:

- **ΩmegaWiki.** Typed entity graphs com claim-level provenance.
  Inspirou nossa decisão de separar `entities/`, `concepts/`,
  `decisions/`, `sources/` como tipos canônicos distintos.
- **LLM-WIKI-MCP.** Expõe o wiki via Model Context Protocol. Não
  adotamos ainda; está no backlog para considerar quando a wiki passar
  de 100 páginas.
- **Maoxunxing, "Practicing Karpathy's Personal Knowledge Base Method
  with a Git Repository"** (abr/2026,
  [maoxunxing.com/karpathy-knowledge-base-practice](https://maoxunxing.com/karpathy-knowledge-base-practice/)).
  Implementação Git+Hugo com pipeline `raw/ → notes/ → posts/`. Slash
  commands `/kb collect`, `/kb compile`, `/kb check`. Inspirou os 3
  playbooks operacionais (`ingest`, `query`, `lint`).

## 5. Adaptação canônica no geo-ipog

### 5.1 Diretório raiz

`wiki/` na raiz do repositório. Não em `docs/` para evitar mistura com
governance/research existentes.

### 5.2 Tipos canônicos de página

| Tipo       | Pasta            | Critério de criação                          |
|------------|------------------|----------------------------------------------|
| entity     | `entities/`      | Pessoa, instituição, ferramenta, domínio referenciada mais de 1 vez |
| concept    | `concepts/`      | Definição atômica reusável em múltiplas páginas |
| decision   | `decisions/`     | ADR cujo "porquê" não cabe em commit message |
| source     | `sources/`       | Fonte externa ou dossiê interno referenciada mais de 1 vez |
| review     | `reviews/`       | Relatório periódico de lint                  |

### 5.3 Convenções

- Frontmatter YAML obrigatório com `name`, `type`, `status`, `created`,
  `updated`, `sources`, `related`.
- Cross-links via `[[slug]]`. Lint detecta órfãos e quebrados.
- Filenames ASCII kebab-case. Acentuação no corpo.
- Português PT-BR com acentuação completa.
- Sem emojis. Sem em-dash em copy editorial.
- Página atômica. Uma página descreve uma coisa.

### 5.4 Coexistência com camadas existentes

- `docs/research/` continua sendo a camada **raw imutável**. Cada
  dossiê pesado vive aqui.
- `docs/governance/` continua sendo camada de **documentos longos
  canônicos** com governança formal (incluindo este arquivo).
- `STATUS.md` continua sendo **ledger narrativo por wave** para
  apresentação humana.
- `wiki/` é a camada **mutável atômica cross-linkada** para acúmulo de
  síntese e queries futuras.
- `wiki/log.md` é o **ledger append-only parseável** para automação.

### 5.5 Operações

| Operação  | Implementação                                  |
|-----------|------------------------------------------------|
| Ingest    | `scripts/wiki/ingest-playbook.md`              |
| Query     | `scripts/wiki/query-playbook.md`               |
| Lint      | `scripts/wiki/lint.py` (Python funcional)      |
| Maintain  | feito implicitamente em ingest/query           |

## 6. Disciplina obrigatória nas waves futuras

1. **Antes** de iniciar onda nova: consultar `wiki/index.md` para
   mapear cobertura.
2. **Durante**: atualizar páginas wiki conforme aprendizados surgem.
3. **Ao final**: registrar a wave no `wiki/log.md`. Rodar lint.
   Endereçar broken crosslinks.
4. **Mensalmente**: rodar review formal em `wiki/reviews/YYYY-MM-DD-...md`.
   Endereçar órfãos e stale claims acumulados.
5. **Trimestralmente**: revisar este documento e considerar
   adaptações conforme grafo cresce.

## 7. Métricas de sucesso da camada

Revisar em 30, 60 e 90 dias após inauguração (2026-05-26):

- Crescimento: 5+ páginas novas por wave operacional.
- Backlog explícito reduz em pelo menos 1 item por wave.
- 0 órfãos não-justificados em review mensal.
- Pelo menos 1 query operacional respondida via wiki sem re-leitura
  de dossiê (medido via log).
- Tempo médio de resposta a query operacional <2 minutos.

## 8. Riscos conhecidos e mitigações

- **Risco de duplicação com `docs/governance/`.** Mitigação: regra
  explícita acima (governance é canônico longo, wiki é atômico
  cross-linkado).
- **Risco de virar cemitério de páginas semi-prontas.** Mitigação:
  threshold de lint para órfãos e stale claims; review mensal
  obrigatório.
- **Risco de ingest cobrir apenas tópicos conhecidos.** Mitigação:
  backlog explícito no `index.md` força confronto com gaps.
- **Risco de cross-link spam (criar links só pra inflar grafo).**
  Mitigação: cada cross-link deve ter conteúdo de suporte na frase
  que o introduz; lint futuro pode flag isso.

## 9. Referências

- Karpathy, A. "LLM Wiki gist", 03-04-2026:
  https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- Maoxunxing, "Practicing Karpathy's Personal Knowledge Base Method
  with a Git Repository", abr/2026:
  https://maoxunxing.com/karpathy-knowledge-base-practice/
- Bush, V. "As We May Think", The Atlantic, jul/1945:
  https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/
- Matuschak, A. "Evergreen notes": https://notes.andymatuschak.org/Evergreen_notes
- Decisão arquitetural derivada:
  `wiki/decisions/ADR-001-adopcao-llm-wiki.md`.
