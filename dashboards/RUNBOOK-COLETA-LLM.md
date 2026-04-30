# Runbook Operacional — Coleta Cross-LLM do Programa GEO IPOG

> **Status:** vigente desde 2026-04-30
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-04-30

Este runbook documenta a operação diária de coleta cross-LLM que alimenta os KPIs canônicos do programa GEO IPOG. Ele é prescritivo: define o cohort fixo de modelos, a bateria diária de queries, o cache idempotente, a validação fail-loud, a detecção de drift, o logging estruturado, o circuit breaker, o retry exponencial, o fallback map e os procedimentos de execução, monitoração e escalação.

A coleta cross-LLM é o principal sensor do programa. Sem ela, o KPI 1 (Mention Rate), o KPI 2 (SoV), o KPI 3 (Citation Quality) e o KPI 8 (Delta pré/pós) não existem. Por isso a operação é tratada com a mesma seriedade de pipeline de produção: falha silenciosa é proibida, coleta parcial é descartada, drift de modelo é alertado.

Cross-links:

- `dashboards/METRICAS-CANONICAS.md` para os KPIs alimentados.
- `dashboards/FINOPS-DISCIPLINA.md` para o custo associado.
- `prompts/KIT-PROMPTS-V0.md` para a bateria canônica de queries.
- `prompts/PAPEIS-DE-COLETA.md` para os papéis dos LLMs no pipeline editorial (paralelo ao pipeline de coleta documentado aqui).
- `audits/PLAYBOOK-AUDITORIA-NAIA.md` para a auditoria que cruza com os dados desta coleta.

## Cohort fixo de LLMs

A coleta cross-LLM opera contra um cohort canônico de seis modelos. Modificar o cohort exige decisão registrada em ata mensal com Ronan Maia. Adicionar e remover modelos é uma decisão estratégica, não operacional.

| LLM | Provedor | Versão pinada (vigente em 2026-04-30) | RAG-native | Obrigatório no cohort |
|---|---|---|---|---|
| ChatGPT | OpenAI | gpt-4o (snapshot 2024-08-06 ou superior pinado) | Não (parcial via search) | Sim |
| Claude | Anthropic | claude-sonnet-4-5 (latest pinado) | Não (parcial via web search) | Sim |
| Gemini | Google | gemini-1.5-pro (latest pinado) | Parcial (browsing on-demand) | Sim |
| Perplexity | Perplexity | sonar-pro | Sim (RAG-native) | Sim — obrigatório como sensor RAG |
| Grok | xAI | grok-2 (versão pinada) | Não | Sim |
| Copilot | Microsoft | Copilot via Bing API ou interface oficial | Sim (RAG-native via Bing) | Sim |

Versões pinadas são revisadas trimestralmente. Cada nova versão é pinada explicitamente; nunca usa-se "latest" sem pinagem para coleta canônica.

### Por que o cohort é obrigatoriamente fechado

Coleta com cohort variável não tem comparabilidade temporal. Se o cohort mudar entre duas leituras, a série temporal fica contaminada e KPI 8 (Delta pré/pós) deixa de ser interpretável. A mesma lógica vale para versão de modelo: provedor que atualiza modelo silenciosamente quebra continuidade da série. Drift detection (descrita adiante) protege contra isso.

## Bateria diária de queries canônicas

A bateria executada diariamente é a definida em `prompts/KIT-PROMPTS-V0.md`. Em 2026-04-30 a bateria contém [a calibrar na Fase 1] queries no formato canônico.

Cada query carrega metadados imutáveis:

- `query_id` — identificador estável (`KIT-PROMPTS-V0-XXX`).
- `query_text` — texto exato em PT-BR, sem variação por execução.
- `cluster` — organizacional / clínica-neuro-TCC-avaliação / psicopedagogia-escolar / transversal.
- `persona_alvo` — P1 a P7 (psicólogo recém-graduado, clínico estabelecido, RH não-psicólogo, profissional de saúde, educador/pedagogo, transição de carreira, coach/terapeuta complementar).
- `etapa_jornada` — descoberta / comparação / decisão de matrícula / pós-matrícula.
- `resposta_alvo_canonica` — resposta ideal contra a qual a resposta real é comparada.

Cada query é executada uma vez por LLM por dia. Total de execuções por dia: `nº de queries × 6`. A execução respeita a janela diária de coleta entre 06h00 e 09h00 (horário de Brasília) para reduzir variabilidade induzida por hora do dia.

### Trimestralmente — full-grid prompt sensitivity

Uma vez por trimestre, durante uma semana, cada query roda com 5 paráfrases distintas para medir variância induzida pelo prompt. A janela de ruído resultante é o intervalo dentro do qual variações em Mention Rate não são consideradas mudança real (ver KPI 1 em `dashboards/METRICAS-CANONICAS.md`).

## Cache SHA-256 idempotente

Toda execução de query gera um par `(provider, model, query_text)` que é hasheado com SHA-256. O hash é a chave do cache. Quando uma execução do dia gera um hash já presente no cache da mesma data, é registrada como cache hit; quando o hash é novo, vai para a coleta efetiva.

Para fins do programa, a chave de cache é `sha256(f"{provider}|{model_version_pinada}|{query_id}|{query_text}|{data_iso}")`.

### Política de invalidação

- Cache vale por 24 horas (uma execução por LLM por query por dia).
- Quando drift detection acusa mudança de comportamento do provedor (descrita adiante), o cache do par afetado é invalidado e re-coletado.
- Quando provedor altera versão pinada, o cache anterior é arquivado e nova chave é criada.

### Por que cache é necessário

Coleta diária de centenas de queries × 6 LLMs gera custo significativo (`dashboards/FINOPS-DISCIPLINA.md`). Cache evita re-cobrança quando coleta é re-executada por incidente (rede, provedor instável). Sem cache, o budget de sprint estoura na primeira semana.

## Validação fail-loud

A coleta é considerada válida apenas quando todos os seis LLMs do cohort responderam dentro da janela operacional do dia. Coleta parcial silenciosa é proibida.

### Critério de validade

- Cada LLM do cohort respondeu a no mínimo 95% das queries do dia (5% de tolerância para erros isolados).
- Perplexity respondeu a 100% das queries (sem tolerância — é o sensor RAG obrigatório).
- Latência média por LLM dentro do envelope esperado (<= 30s por query no padrão; <= 60s para queries com browsing ativo).

### Comportamento quando inválida

- Pipeline grava marcador de coleta inválida em `data/coleta/YYYY-MM-DD.invalid.json`.
- Alerta automático via canal operacional (Slack/Discord/e-mail) para Alexandre Caramaschi e Bruno Azambuja.
- KPIs do dia ficam marcados como "sem leitura" — não são interpolados, não são estimados.
- Replan de re-coleta no dia seguinte; se o problema persistir por 3 dias úteis, escalar para revisão de fallback map.

Coleta parcial silenciosa quebra a comparabilidade temporal. O custo de não registrar uma leitura é menor que o custo de contaminar a série com leitura desbalanceada.

## Drift detection

Detecção de mudança silenciosa de comportamento do provedor. Compara o hash da resposta para o mesmo `(provider, model, query)` ao longo do tempo. Movimento súbito na distribuição de hashes é sinal de que o provedor atualizou modelo sem comunicar (ou alterou parâmetros como temperatura padrão, sistema de moderação, etc.).

### Algoritmo prescrito

1. Para cada `(provider, query_id)`, manter os últimos 30 hashes diários.
2. Calcular a entropia das respostas na janela de 7 dias e na janela de 30 dias.
3. Quando a entropia de 7 dias diverge mais de 2 desvios padrão da entropia de 30 dias, marcar drift.
4. Drift confirmado em 3 ou mais queries no mesmo provedor no mesmo dia → alerta crítico.

### Comportamento quando detectado

- Alerta automático para Alexandre Caramaschi.
- Coleta dos próximos 3 dias é executada com flag `under_drift_review` que segrega a leitura.
- Comparação temporal é interrompida no ponto do drift; série é segmentada antes/depois.
- Decisão executiva: aceitar nova versão como ponto de continuidade ou pinar versão anterior se ainda disponível.

Drift não detectado a tempo gera leitura confusa de Mention Rate, com falsa percepção de queda ou subida. É proibido fechar leitura mensal sem revisar o relatório de drift do mês.

## Logging estruturado em JSONL

Toda execução grava uma linha JSON em `data/coleta/YYYY-MM-DD.jsonl`. O esquema canônico é:

| Campo | Tipo | Descrição |
|---|---|---|
| `timestamp` | string ISO 8601 | Momento da execução |
| `query_id` | string | ID da query no `KIT-PROMPTS-V0` |
| `query_text` | string | Texto exato da query |
| `provider` | string | openai / anthropic / google / perplexity / xai / microsoft |
| `model` | string | Versão pinada do modelo |
| `model_version_observed` | string | Versão reportada pelo provedor (quando disponível) |
| `cluster` | string | Cluster semântico da query |
| `persona_alvo` | string | Persona da query |
| `etapa_jornada` | string | Etapa da jornada |
| `latency_ms` | inteiro | Latência da chamada |
| `tokens_input` | inteiro | Tokens de input |
| `tokens_output` | inteiro | Tokens de output |
| `cost_usd` | float | Custo da chamada (calculado conforme `dashboards/FINOPS-DISCIPLINA.md`) |
| `response_text` | string | Resposta integral do LLM |
| `response_hash` | string | SHA-256 da `response_text` |
| `ipog_mentioned` | booleano | Pós-processado: IPOG citado? |
| `ipog_citation_quality` | inteiro 0-5 | Pós-processado: número de fatos canônicos corretos |
| `competitors_mentioned` | array | Pós-processado: lista de concorrentes citados |
| `cache_hit` | booleano | Esta execução foi servida do cache? |
| `error` | string nullable | Mensagem de erro quando aplicável |
| `under_drift_review` | booleano | Coleta sob investigação de drift |

Logs ficam retidos por 24 meses online e arquivados indefinidamente em armazenamento frio. Auditoria NAIA mensal cruza dados deste log com os checks da Categoria I (`audits/PLAYBOOK-AUDITORIA-NAIA.md`).

## Circuit breaker

Padrão de proteção contra falhas em cadeia. Quando um provedor LLM apresenta 3 falhas consecutivas em janela de 60 segundos, o circuit breaker para aquele provedor abre e bloqueia novas chamadas por 60 segundos (cooldown). Após o cooldown, retorna no estado `half-open` com 1 chamada de teste; sucesso fecha o circuito, falha re-abre.

### Estados

- `closed` — operação normal.
- `open` — provedor bloqueado por cooldown de 60 segundos.
- `half-open` — uma chamada de teste pendente após cooldown.

### Por provedor, não global

Circuit breaker é por provedor. ChatGPT em circuito aberto não impede coleta em Claude. A abertura de circuito não invalida a coleta do dia desde que outros provedores cubram a janela; o sistema fail-loud no fim do dia decide se a coleta foi parcial demais.

### Cuidados

- Quando 4 ou mais provedores entram em circuit open simultaneamente, escalar para Alexandre Caramaschi imediatamente — provavelmente é incidente de rede ou de configuração de chaves, não falha de provedor.
- Cooldowns prolongados (mais de 5 minutos) para o mesmo provedor em um dia escalam para revisão de fallback map.

## Retry exponencial

Quando uma chamada falha por motivo transiente (timeout, 5xx, rate limit), o sistema tenta novamente com backoff exponencial: 2s, 4s, 8s. Após 3 retries esgotados, o erro é registrado e a chamada conta como falha contra o circuit breaker.

Erros não-transientes (401, 403, 400 com mensagem de erro de payload) não disparam retry. São registrados imediatamente como falha definitiva e escalam para revisão.

## Fallback map

Quando a coleta cross-LLM precisa de redundância para garantir cobertura mínima dos KPIs em caso de provedor degradado, o sistema NÃO substitui um LLM do cohort por outro. O cohort é fixo. Fallback se aplica apenas ao **pipeline editorial de produção** (`prompts/PAPEIS-DE-COLETA.md`), não à coleta cross-LLM.

A coleta cross-LLM precisa do cohort completo. Se Perplexity está fora por mais de 24 horas, a coleta do dia é declarada inválida e o pipeline aguarda restabelecimento. Substituir Perplexity por outro provedor para "completar" a coleta contamina os KPIs e é proibido.

## Procedimentos operacionais

### Como executar a coleta diária

1. **06h00 BRT** — disparo automático via cron diário.
2. Pipeline lê `prompts/KIT-PROMPTS-V0.md` (versão vigente) e enumera queries.
3. Para cada query × cada LLM do cohort: verifica cache; se hit, registra como cache hit; se miss, faz a chamada protegida por circuit breaker e retry exponencial.
4. Cada resposta é gravada em `data/coleta/YYYY-MM-DD.jsonl`.
5. Pós-processamento extrai entidades, classifica menção do IPOG, pontua qualidade da citação.
6. **09h00 BRT** — verificação de validade da coleta (95% / 100% Perplexity / latências dentro do envelope).
7. Coleta válida: KPIs atualizados em dashboard. Coleta inválida: alerta + marcador.

### Como monitorar a coleta

- Dashboard operacional com 3 painéis canônicos:
  - Painel A: cobertura por provedor (queries respondidas / total esperado) por dia.
  - Painel B: latência por provedor.
  - Painel C: hashes únicos por provedor (sinal de drift se cair abruptamente).
- Alertas configurados:
  - Provedor com cobertura < 95% no dia.
  - Latência > 2× a mediana dos últimos 7 dias.
  - Drift confirmado em 3+ queries do mesmo provedor.
  - Custo diário > 1.5× o esperado.

### Como escalar

| Severidade | Critério | Para quem | Em quanto tempo |
|---|---|---|---|
| Crítico | 4+ provedores em circuit open simultâneo OU coleta inválida por 3 dias seguidos OU drift crítico em Perplexity | Alexandre Caramaschi + Bruno Azambuja | Imediatamente |
| Alto | Coleta inválida no dia OU drift confirmado em 1 provedor não-Perplexity | Alexandre Caramaschi | Mesmo dia |
| Médio | Cobertura entre 90-95% em provedor não-Perplexity OU latência elevada | Pipeline operacional | Próxima execução |
| Baixo | Cache hits acima do esperado (>80%) | Revisão de configuração | Revisão semanal |

## Ciclo de vida do cohort

Trimestralmente:

1. Cada provedor é checado quanto a anúncios de descontinuação ou nova versão major.
2. Versões pinadas são revisadas; mudanças são propostas com 30 dias de antecedência.
3. Adição de provedor novo (ex.: novo entrante RAG-native relevante) é proposta com pesquisa de cobertura semântica e custo.
4. Decisão registrada em ata mensal seguinte.

Mudanças no cohort entram em vigor no primeiro dia do mês posterior à decisão. Coleta antes e depois é segmentada nos dashboards.

## Anti-padrões proibidos

- Substituir LLM do cohort por outro em caso de falha — proibido. Coleta inválida é a resposta correta.
- Coletar 3 vezes por dia para "tirar média" — proibido. Uma execução por LLM por dia, sem variação intradiária na bateria canônica.
- Misturar versões de modelo na mesma série temporal — proibido. Drift acusa, série é segmentada.
- Estimar Mention Rate de dia faltante por interpolação — proibido. Dia sem coleta é dia sem leitura.
- Aceitar leitura de Perplexity ausente — proibido. Sensor RAG obrigatório.
- Não pinar versão de modelo — proibido. "Latest" como string contamina a série.

## Cadência de revisão deste runbook

| Atividade | Cadência | Owner |
|---|---|---|
| Verificação de cohort (versões pinadas) | Trimestral | Alexandre Caramaschi |
| Recalibração de drift detection | Trimestral | Alexandre Caramaschi |
| Revisão de envelope de latência | Mensal | Alexandre Caramaschi |
| Revisão deste documento | Trimestral | Alexandre Caramaschi |
| Pacto operacional com Bruno Azambuja | Quinzenal | Conjunto |
