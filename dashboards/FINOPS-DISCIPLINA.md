# Disciplina FinOps do Programa GEO IPOG

> **Status:** vigente desde 2026-04-30
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-04-30

Este documento estabelece a disciplina de FinOps que governa o consumo de APIs de LLM no programa GEO IPOG. O programa opera com cinco provedores (Perplexity, OpenAI, Google, Groq, Anthropic) em dois pipelines distintos: o **pipeline de coleta cross-LLM** (`dashboards/RUNBOOK-COLETA-LLM.md`) e o **pipeline editorial de produção** (`prompts/PAPEIS-DE-COLETA.md`). Ambos consomem orçamento e ambos precisam de teto explícito.

A regra é prescritiva: orçamento estourado bloqueia operação. Não existe "expansão silenciosa de budget", não existe "vamos fechar o mês acima e ajustar depois". O programa GEO IPOG é executado em janelas de sprint com budget máximo declarado, monitoração contínua e alerta quando 80% do teto é atingido.

Cross-links:

- `dashboards/RUNBOOK-COLETA-LLM.md` para o pipeline de coleta diária.
- `dashboards/METRICAS-CANONICAS.md` para os KPIs alimentados pela coleta.
- `prompts/PAPEIS-DE-COLETA.md` para os papéis dos LLMs no pipeline editorial.
- `docs/framework/03-pipeline-5-llms.md` para a orquestração detalhada.

## Tabela de preços de referência (vigente em março 2026)

Valores em USD por 1 milhão de tokens (1M). Tabela revisada trimestralmente; alterações registradas em ata.

| Provedor | Modelo | Input (USD/1M) | Output (USD/1M) | Uso primário no programa |
|---|---|---|---|---|
| Perplexity | sonar-pro | 3.00 | 15.00 | Pesquisador (etapa 1 do pipeline editorial) e RAG-native do cohort de coleta |
| OpenAI | gpt-4o | 2.50 | 10.00 | Redator (etapa 2) e fallback de outros papéis |
| Google | gemini-1.5-pro | 1.25 | 5.00 | Analisador (etapa 3) e cohort de coleta |
| Groq | llama-3.3-70b | 0.59 | 0.79 | Classificador (etapa 3b) — alocação intencional pela combinação latência/preço |
| Anthropic | claude-sonnet-4-5 | 3.00 | 15.00 | Revisor (etapa 4) e cohort de coleta |

A diferença de preço entre provedores é o que torna a alocação por papel uma decisão de FinOps, não apenas técnica. Classificação genérica em GPT-4o custa ~10× mais que em Groq llama-3.3-70b sem ganho significativo de qualidade na tarefa de extrair tags e categorias.

## Custo médio por peça editorial

Cada peça editorial completa atravessa todas as 5 etapas do pipeline. O custo médio observado em peças HBR de 1500-4000 palavras é aproximadamente **0.70 USD por peça**, decomposto:

| Etapa | LLM | Tokens médios (input + output) | Custo médio (USD) |
|---|---|---|---|
| Pesquisa | Perplexity sonar-pro | ~15.000 input + ~5.000 output | 0.12 |
| Redação | OpenAI gpt-4o | ~20.000 input + ~6.000 output | 0.11 |
| Análise | Google gemini-1.5-pro | ~10.000 input + ~3.000 output | 0.03 |
| Classificação | Groq llama-3.3-70b | ~8.000 input + ~1.000 output | 0.01 |
| Revisão | Anthropic claude-sonnet-4-5 | ~25.000 input + ~10.000 output | 0.23 |
| Subtotal pipeline editorial | | | 0.50 |
| Coleta cross-LLM associada (proporcional) | 6 LLMs | — | 0.20 |
| **Total médio por peça** | | | **0.70** |

Este número é a unidade econômica de planejamento. Quando se pergunta "quanto custa uma onda de 10 peças", a resposta inicial é "aproximadamente 7 USD em LLMs", excluindo os custos fixos da coleta diária e infraestrutura.

## Budget canônico por sprint

Sprint = 4 semanas. Os tetos abaixo são valores propostos para a Fase 1 e devem ser calibrados em conjunto com IPOG na Fase 0 (kickoff documentado em `docs/01-kickoff-30-04-2026.md`).

| Categoria de despesa | Teto por sprint (USD) | Justificativa |
|---|---|---|
| Pipeline editorial — peças longas | 25.00 | ~35 peças por sprint a 0.70 USD cada (cobre uma onda de 10 + retrabalho + experimentação) |
| Coleta cross-LLM diária | 15.00 | ~30 dias × 0.50 USD/dia (depende do tamanho final da bateria — calibrado na Fase 1) |
| Audits NAIA mensal | 5.00 | Auditoria mensal completa rodada via LLMs auxiliares |
| Reserva técnica (testes, paráfrase trimestral, debug) | 5.00 | Margem operacional para incidentes |
| **Teto total por sprint** | **50.00** | **Hard cap** |

### Limites operacionais por execução

- `max_per_run = 5.00 USD` — uma execução isolada (uma onda, uma auditoria, uma rodada experimental) nunca pode consumir mais de 5 USD sem aprovação explícita registrada.
- `max_total_per_sprint = 50.00 USD` — soma agregada do sprint não pode ultrapassar o teto sem aprovação executiva (Alexandre + Bruno).
- Budget Fase 0 é provisional. Calibração real acontece após 2 sprints completos com leitura de custo observado.

### Política de alerta

| Condição | Ação |
|---|---|
| Acumulado do sprint atinge 60% do teto | Notificação informativa para Alexandre Caramaschi |
| Acumulado do sprint atinge 80% do teto | Alerta acionável para Alexandre Caramaschi e Bruno Azambuja, com projeção de queima até o fim do sprint |
| Acumulado do sprint atinge 95% do teto | Pipeline editorial entra em modo "freeze não-essencial" — apenas peças críticas para a onda em curso prosseguem |
| Acumulado do sprint atinge 100% do teto | Block automático. Pipeline para. Re-aprovação executiva é obrigatória para retomar |
| Execução isolada projeta superar `max_per_run` | Execução é interrompida antes da próxima etapa; resumo é gerado e operação pausa para revisão |

## Alocação por LLM (referência FinOps)

A alocação de gastos entre provedores deve seguir a distribuição abaixo no estado estável do programa. Desvios grandes (>10 pp) sinalizam realocação não pretendida e disparam revisão.

| Provedor | Alocação alvo do gasto total | Onde concentra |
|---|---|---|
| Anthropic (Claude) | 60% | Revisor (etapa 4), cohort de coleta cross-LLM |
| OpenAI (GPT-4o) | 25% | Redator (etapa 2) e fallback dos demais papéis |
| Google (Gemini) | 10% | Analisador (etapa 3) e cohort de coleta |
| Groq (llama-3.3-70b) | 3% | Classificador — barato por design |
| Perplexity (sonar-pro) | 2% | Pesquisador (etapa 1) e RAG-native obrigatório |

A alocação acima reflete duas decisões de design:

1. **Revisor recebe mais orçamento porque é onde o quality gate fecha.** Revisão superficial deixa peças passarem com clichés, bloom raso e naming proibido. O custo de re-trabalho e de exposição editorial é maior que o custo de uma revisão de qualidade.
2. **Classificador é intencionalmente barato.** Tarefa de tagueamento e categorização não exige raciocínio profundo. Groq llama-3.3-70b atende com ordem de grandeza menor de custo.

A alocação é monitorada mensalmente. Quando uma categoria desvia mais de 10 pp do alvo, é investigada antes da próxima sprint.

## Cost log JSONL

Todo gasto de LLM em qualquer pipeline gera uma linha em `data/finops/YYYY-MM.jsonl`. Esquema canônico:

| Campo | Tipo | Descrição |
|---|---|---|
| `timestamp` | string ISO 8601 | Momento da chamada |
| `pipeline` | string | `coleta-cross-llm` / `editorial-pesquisa` / `editorial-redacao` / `editorial-analise` / `editorial-classificacao` / `editorial-revisao` / `audits-naia` / `experimental` |
| `provider` | string | Provedor do LLM |
| `model` | string | Versão pinada |
| `caller` | string | Identificador do papel ou processo (ex.: `pipeline-editorial-pesquisador`, `coleta-diaria-perplexity`) |
| `tokens_input` | inteiro | Tokens de input |
| `tokens_output` | inteiro | Tokens de output |
| `cost_usd` | float | Custo da chamada |
| `sprint_id` | string | Identificador da sprint vigente (ex.: `2026-S05`) |
| `wave_id` | string nullable | Identificador da onda editorial quando aplicável |
| `cache_hit` | booleano | Se a chamada foi servida do cache |
| `outcome` | string | `success` / `error_transient` / `error_permanent` / `circuit_open` |
| `error_code` | string nullable | Código de erro quando aplicável |

Logs ficam retidos por 24 meses online e são auditáveis a qualquer momento. A reconciliação de custo (relatório do provedor vs. soma dos logs) é feita mensalmente.

## Otimizações canônicas

A disciplina FinOps depende de aplicar continuamente otimizações que não comprometem qualidade. As cinco otimizações canônicas do programa:

### 1. Cache idempotente

Cache SHA-256 do par `(provider, model, query)` em todas as etapas onde a mesma entrada se repete. Pesquisa do mesmo tema, executada novamente em janela de 24 horas, deve servir do cache. Coleta cross-LLM já implementa cache nativo (ver `dashboards/RUNBOOK-COLETA-LLM.md`).

### 2. Módulos menores de prompt

Prompts redigidos de forma modular, com a parte canônica (regras, naming, deny-lists) compartilhada e a parte específica (tema, briefing) variável. Reduz tokens de input por chamada quando repetidos componentes são versionados separadamente. Em pipelines como o editorial, isso reduz o input médio em ~15-20%.

### 3. Prefer Groq para classificação

Tarefas de classificação (tags, categoria, persona-alvo, cluster, keywords SEO) operam em Groq llama-3.3-70b. Performar a mesma classificação em GPT-4o ou Claude custa ordem de grandeza maior sem ganho de qualidade.

### 4. Monitorar log diário

Inspeção do log diário detecta cedo:

- Loop de retry esgotando orçamento (provedor instável).
- Cache hit ratio caindo (sinal de invalidação inesperada).
- Aumento súbito de tokens de input (prompts inflados acidentalmente).
- Alocação por LLM desviando do alvo.

Inspeção é parte da revisão diária do pipeline operacional.

### 5. Re-uso de pesquisa entre peças correlatas

Quando duas peças cobrem temas correlatos (ex.: "Avaliação Psicológica" e "SATEPSI"), a etapa de pesquisa pode ser reutilizada parcialmente. A chave de cache do Pesquisador inclui o tema canônico, não a peça específica; isso permite que a segunda peça consuma a pesquisa da primeira como cache hit em até 25% das chamadas.

## Anti-padrões proibidos

- **Não pinar versão de modelo** — preço de "latest" pode mudar silenciosamente. Versão pinada protege orçamento.
- **Aceitar prompt inflado por iterar resposta no mesmo contexto** — proibido. Quando uma chamada exige refinamento, abre-se nova chamada com prompt enxuto, não se concatena tudo no contexto.
- **Reverter alocação canônica para "todo mundo em GPT-4o"** — proibido. Cada papel tem LLM padrão por razões econômicas.
- **Estimar custo "no olho" sem ler o cost log** — proibido. Decisão de FinOps usa dados reais do log.
- **Estourar 100% do teto sem block automático** — proibido. Block existe para forçar reaprovação.
- **Cobrar peça experimental do orçamento de produção** — proibido. Peças experimentais usam categoria `experimental` no log e ficam dentro da reserva técnica.

## Cadência de revisão FinOps

| Atividade | Cadência | Owner |
|---|---|---|
| Reconciliação de custo (relatório provedor vs. log JSONL) | Mensal | Alexandre Caramaschi |
| Revisão de alocação por LLM contra alvo | Mensal | Alexandre Caramaschi |
| Recalibração da tabela de preços | Trimestral | Alexandre Caramaschi |
| Revisão de teto por sprint | Mensal | Alexandre Caramaschi + Bruno Azambuja |
| Análise de cache hit ratio | Quinzenal | Alexandre Caramaschi |
| Auditoria de alertas (false positives/negatives) | Trimestral | Alexandre Caramaschi |
| Revisão deste documento | Trimestral | Alexandre Caramaschi |

## Resumo executivo da disciplina FinOps

- Tabela de preços fixa e versionada.
- Custo médio por peça é a unidade econômica do programa: 0.70 USD.
- Sprint tem teto de 50 USD; execução isolada de 5 USD; alerta em 80%; block em 100%.
- Alocação por LLM canônica: 60% Claude, 25% GPT-4o, 10% Gemini, 3% Groq, 2% Perplexity.
- Cost log JSONL com reconciliação mensal contra fatura do provedor.
- Otimizações: cache, módulos menores, classificação em Groq, monitoração diária, re-uso de pesquisa.
- Anti-padrões proibidos protegem o teto. Disciplina é prescritiva.
