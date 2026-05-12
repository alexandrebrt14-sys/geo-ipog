# Pipeline de 5 LLMs — Princípios de Orquestração para o Programa GEO IPOG

> **Status:** vigente desde 2026-04-30
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-04-30

> **Reframe canônico 12-05-2026:** o pipeline produz peças adaptadas ao portfólio amplo de pós-graduação em Psicologia nas 5 modalidades canônicas (Especialização Lato Sensu, MBA correlato, Mestrado Profissional, Especialização Clínica certificada CFP/ABRAP/FBT, Formações híbridas/residências — `dashboards/METRICAS-CANONICAS.md` Cláusula 0). O briefing de cada peça declara a modalidade-alvo; o Pesquisador (etapa 1) recupera evidência ancorada na modalidade declarada; o Classificador (etapa 3b) marca a modalidade canônica como tag.

Este documento estabelece os princípios de orquestração do pipeline editorial de cinco LLMs aplicado ao programa GEO IPOG. O pipeline produz peças HBR/HSM/MIT Sloan adaptadas ao recorte do portfólio amplo de pós-graduação em Psicologia (Especialização Lato Sensu, MBA correlato à Psicologia, Mestrado Profissional, Especialização Clínica certificada, Formações híbridas/residências), executando em quatro etapas sequenciais com paralelização interna na etapa 3.

A premissa estratégica é dura: nenhum LLM individualmente sustenta a qualidade necessária para o padrão editorial denso do programa. A combinação de cinco LLMs em papéis especializados (Pesquisador, Redator, Analisador, Classificador, Revisor) entrega volume com consistência, dentro de envelope FinOps controlado, com circuito de fallback que aceita degradação parcial sem comprometer entrega.

A descrição operacional dos cinco papéis (LLM padrão, fallback, input, output, critério de pronto) está em `prompts/PAPEIS-DE-COLETA.md`. Este documento foca nos princípios de orquestração: paralelização, checkpoints, circuit breaker, custo, riscos operacionais, governança de versão de modelo e governança de mudança no pipeline.

Cross-links:

- `prompts/PAPEIS-DE-COLETA.md` para a definição dos cinco papéis canônicos.
- `prompts/KIT-PROMPTS-V0.md` para a bateria canônica de queries.
- `prompts/PROMPT-PESQUISA.md` (e demais prompts canônicos por papel).
- `dashboards/RUNBOOK-COLETA-LLM.md` para o pipeline de coleta cross-LLM (paralelo ao pipeline editorial descrito aqui).
- `dashboards/FINOPS-DISCIPLINA.md` para o orçamento que governa este pipeline.
- `dashboards/METRICAS-CANONICAS.md` para os KPIs alimentados pelas peças produzidas.
- `docs/framework/02-quality-gate-5-camadas.md` para o quality gate que recebe a saída deste pipeline.
- `docs/framework/04-client-context-abstraction.md` para a abstração que parametriza este pipeline para multi-tenant.

## Princípios canônicos do pipeline

1. **Especialização por papel, não por LLM.** O pipeline define papéis (Pesquisador, Redator, Analisador, Classificador, Revisor); cada papel tem LLM padrão escolhido por afinidade técnica e custo. Quando o LLM padrão falha, o papel é executado pelo fallback do papel — não pelo "próximo LLM disponível".
2. **Sequencial onde há dependência, paralelo onde não há.** Pesquisa é bloqueante. Redação depende da pesquisa. Análise e Classificação podem rodar em paralelo após a redação. Revisão é sequencial e bloqueante para a publicação.
3. **Checkpoints incrementais.** Cada etapa grava artefato em disco antes da próxima começar. Falha na etapa N não obriga refazer N-1.
4. **Idempotência via cache SHA-256.** Re-execução com mesma entrada serve do cache.
5. **Governança de versão de modelo.** Versão de modelo é pinada por papel; mudança é decisão registrada, não acidente operacional.
6. **Custo médio fixo.** A unidade econômica do pipeline é a peça, com custo médio de 0.70 USD (`dashboards/FINOPS-DISCIPLINA.md`).
7. **Falha fail-loud.** Etapa que falha sem fallback bloqueia a peça e gera alerta. Coleta editorial silenciosa parcial é proibida.

## Diagrama do fluxo

```
[Briefing IPOG]
       |
       v
+--------------------+
|   Etapa 1          |
|   PESQUISADOR      |
|   Perplexity       |   [SEQUENCIAL — bloqueante]
|   sonar-pro        |
+--------------------+
       |
       | research_data.json
       v
+--------------------+
|   Etapa 2          |
|   REDATOR          |
|   OpenAI gpt-4o    |   [SEQUENCIAL por peça; PARALELO entre peças]
+--------------------+
       |
       | draft.md
       v
+----------------------------------+
|   Etapa 3 — DUAS TRILHAS         |
|   PARALELAS                      |
|                                  |
|   3a. ANALISADOR                 |
|       Google Gemini 1.5 Pro      |
|                                  |
|   3b. CLASSIFICADOR              |
|       Groq llama-3.3-70b         |
+----------------------------------+
       |
       | analise.json + metadata.json
       v
+--------------------+
|   Etapa 4          |
|   REVISOR          |
|   Anthropic        |   [SEQUENCIAL — bloqueante]
|   claude-sonnet    |
|   -4-5 / Opus      |
+--------------------+
       |
       | draft_revisado.md + summary.json
       v
+--------------------+
|   QUALITY GATE     |
|   5 Camadas + 6    |
+--------------------+
       |
       v
   [Publicação]
```

## Papéis canônicos (resumo)

A descrição operacional completa está em `prompts/PAPEIS-DE-COLETA.md`. Resumo prescritivo:

| Etapa | Papel | LLM padrão | Sequencial / Paralelo | Critério de pronto |
|---|---|---|---|---|
| 1 | Pesquisador | Perplexity sonar-pro | Sequencial, bloqueante | JSON com 6 categorias e mínimo 3 citações acadêmicas BR |
| 2 | Redator | OpenAI gpt-4o | Sequencial por peça, paralelo entre peças | Markdown HBR 1500-4000 palavras, naming canônico, parágrafos máximo 5 linhas |
| 3a | Analisador | Google gemini-1.5-pro | Paralelo com Etapa 3b | JSON com 7 dimensões scoradas 0-10 |
| 3b | Classificador | Groq llama-3.3-70b | Paralelo com Etapa 3a | JSON com Bloom dominante, tags, persona, cluster |
| 4 | Revisor | Anthropic claude-sonnet-4-5 (ou Opus) | Sequencial, bloqueante | Markdown revisado + summary JSON + flag aprovado sim/não |

## Paralelização

A paralelização do pipeline tem regras prescritivas que protegem qualidade e custo:

### Regras de paralelização

1. **Etapa 1 (Pesquisa) é estritamente sequencial.** Não há paralelização interna; a pesquisa para uma peça consome ~30 segundos de trabalho efetivo do Pesquisador e bloqueia a Etapa 2. Diferentes peças no mesmo lote podem ter pesquisas executadas em paralelo, com cache aproveitando temas correlatos.
2. **Etapa 2 (Redação) é sequencial dentro da peça.** Uma peça é redigida do início ao fim por um único Redator (não há paralelização interna por seção). Diferentes peças no mesmo lote são redigidas em paralelo até o limite de concorrência configurado (padrão: 3 peças simultâneas).
3. **Etapas 3a (Análise) e 3b (Classificação) rodam em paralelo dentro da mesma peça.** Análise e Classificação consomem o mesmo Draft.md como input, produzem outputs distintos, não dependem um do outro. Paralelização total.
4. **Etapa 4 (Revisão) é sequencial dentro da peça.** Revisor lê Draft.md + analise.json + metadata.json e produz versão revisada. Diferentes peças no mesmo lote são revisadas em paralelo até o limite de concorrência (padrão: 3 peças simultâneas).

### Limite de concorrência

O limite padrão de concorrência (3 peças por etapa) é prescrito para:

- Respeitar rate limits dos provedores (OpenAI gpt-4o suporta paralelismo, mas escalonadores de chave podem cair em throttling acima de 5 chamadas simultâneas em janelas curtas).
- Manter custo dentro do `max_per_run = 5.00 USD` por execução isolada (`dashboards/FINOPS-DISCIPLINA.md`).
- Reduzir ruído de logs durante incidente — concorrência alta torna debug exponencialmente mais difícil.

Para ondas grandes (mais de 5 peças), a recomendação operacional é fragmentar em sub-lotes de 3 e executar sub-lotes sequencialmente.

## Checkpoints incrementais

Cada etapa grava artefato em disco antes da próxima começar. A estrutura canônica:

```
data/runs/<sprint_id>/<wave_id>/<slug>/
├── 01-research/research_data.json
├── 02-redacao/draft.md
├── 03a-analise/analise.json
├── 03b-classificacao/metadata.json
├── 04-revisao/draft_revisado.md
├── 04-revisao/summary.json
└── manifest.json
```

`manifest.json` contém: timestamp de cada etapa, hash SHA-256 de cada artefato, versão pinada de cada modelo na execução, custo por etapa, status (sucesso/falha) por etapa.

### Por que checkpoints

- Falha de Etapa 4 não obriga refazer Etapa 1, 2 ou 3. O pipeline retoma da Etapa 4.
- Auditoria retroativa fica viável (peça publicada pode ser revisada para entender decisão do Revisor).
- Drift de modelo pode ser correlacionado com mudança em qualidade de etapas anteriores.
- Cache idempotente é mais simples — chave de cache é o hash do input, retornado pelo manifest.

### Política de retenção

Checkpoints completos retidos por 90 dias online; após 90 dias, somente o `draft_revisado.md` final e o `manifest.json` são arquivados em armazenamento frio. Pesquisas e drafts intermediários são purgados.

## Fallback map

Quando o LLM padrão de um papel falha, o pipeline tenta o fallback primário; se este também falhar, tenta o secundário. Política consolidada (replicada de `prompts/PAPEIS-DE-COLETA.md`):

| Papel | Padrão | Fallback 1 | Fallback 2 |
|---|---|---|---|
| Pesquisador | Perplexity sonar-pro | Google Gemini 1.5 Pro | Anthropic Claude Sonnet 4.5 |
| Redator | OpenAI GPT-4o | Anthropic Claude Sonnet 4.5 | Google Gemini 1.5 Pro |
| Analisador | Google Gemini 1.5 Pro | OpenAI GPT-4o | Anthropic Claude Sonnet 4.5 |
| Classificador | Groq llama-3.3-70b | OpenAI GPT-4o | Anthropic Claude Sonnet 4.5 |
| Revisor | Anthropic Claude Sonnet 4.5 (ou Opus) | OpenAI GPT-4o | — |

Notas:

- O Revisor não tem fallback secundário porque é o papel onde a qualidade é mais sensível ao modelo. Quando OpenAI também falha, o pipeline para e gera alerta crítico.
- O Pesquisador prefere Gemini sobre Claude no fallback porque Gemini também tem capacidade de browsing nativo, condição necessária para pesquisa atualizada.
- Quando o fallback é acionado, o `manifest.json` registra a degradação. Peças com fallback acionado entram com flag em revisão executiva semanal.

## Circuit breaker

Padrão de proteção contra falhas em cadeia. Quando um provedor LLM apresenta 3 falhas consecutivas em janela de 60 segundos, o circuit breaker para aquele provedor abre e bloqueia novas chamadas por 60 segundos (cooldown). Após o cooldown, retorna no estado `half-open` com 1 chamada de teste; sucesso fecha, falha re-abre.

### Estados

- `closed` — operação normal.
- `open` — provedor bloqueado por cooldown de 60 segundos.
- `half-open` — uma chamada de teste pendente após cooldown.

### Granularidade do circuit breaker

Circuit breaker é **por provedor**, não por papel. ChatGPT em circuito aberto afeta o Redator (LLM padrão) e os Analisador/Classificador/Revisor que dependem dele como fallback. O fallback map decide o re-roteamento; o circuit breaker apenas declara que o provedor está temporariamente indisponível.

### Retry exponencial dentro do circuit breaker

Antes de contar uma falha, o pipeline aplica retry exponencial: 2s, 4s, 8s. Erros transientes (timeout, 5xx, rate limit) usam retry. Erros não-transientes (401, 403, 400 com payload errado) ignoram retry e contam imediatamente como falha contra o circuit breaker.

## Custo esperado

A composição canônica do custo por peça (referência em USD, valores do `dashboards/FINOPS-DISCIPLINA.md`):

| Etapa | LLM padrão | Custo médio (USD) |
|---|---|---|
| Pesquisa | Perplexity sonar-pro | 0.12 |
| Redação | OpenAI gpt-4o | 0.11 |
| Análise | Google gemini-1.5-pro | 0.03 |
| Classificação | Groq llama-3.3-70b | 0.01 |
| Revisão | Anthropic claude-sonnet-4-5 | 0.23 |
| Subtotal pipeline editorial | | **0.50** |
| Coleta cross-LLM associada (proporcional) | 6 LLMs | 0.20 |
| **Total médio por peça** | | **0.70** |

### Variação aceitável

- Peça especialmente densa (próximo de 4000 palavras): até 1.20 USD.
- Peça compacta (próximo de 1500 palavras): pode cair para 0.45 USD.
- Peça com pesquisa cacheada (tema correlato a peça anterior): pode cair para 0.55 USD.
- Peça com fallback acionado em duas etapas: pode subir para 1.50 USD (registrar incidente).

Quando o custo médio agregado de uma onda excede 1.00 USD por peça, é obrigatório investigar o desvio antes da próxima onda.

## Riscos operacionais

### Risco 1 — Mudança silenciosa de versão de modelo

Provedor atualiza modelo sem comunicar. Detectado pelo drift detection (`dashboards/RUNBOOK-COLETA-LLM.md`). Mitigação: versão pinada no pipeline; quando provedor não permite pinagem (ex.: "latest" forçado), o pipeline usa flag de quarentena que segrega a saída para revisão manual antes de ir para Quality Gate.

### Risco 2 — Falha em cadeia de provedores

Múltiplos provedores caem simultaneamente (raro, mas possível em incidentes regionais). Mitigação: o pipeline para e aguarda; o `max_per_run = 5.00 USD` impede que retries massivos consumam orçamento; alerta crítico é disparado quando 4+ provedores estão em circuit open.

### Risco 3 — Degradação de qualidade não detectada

Analisador e Voice Guard podem falhar em detectar degradação sutil (ex.: redator começa a usar clichês novos não contemplados na deny-list). Mitigação: revisão amostral mensal manual de peças publicadas (Bruno Azambuja); recalibração mensal das deny-lists; revisão executiva mensal com Ronan Maia.

### Risco 4 — Inflação de tokens

Prompts inflam ao longo do tempo por iteração não disciplinada (autor do prompt adiciona contexto sem podar). Mitigação: revisão trimestral dos prompts canônicos com leitura de tamanho de token; reorganização modular (componente canônico vs. específico) descrita em `dashboards/FINOPS-DISCIPLINA.md`.

### Risco 5 — Cache hit ratio caindo

Cache eficaz é precondição do envelope FinOps. Quando hit ratio cai abaixo do esperado, o sprint estoura. Mitigação: monitoração diária do cache hit ratio; investigação imediata quando cai abaixo de 30%.

### Risco 6 — Conflito entre paralelização e rate limits

Limite de concorrência mal configurado dispara throttling do provedor e cascateia falhas. Mitigação: limite default conservador (3 peças); aumento depende de teste em ambiente de homologação antes de produção.

### Risco 7 — Revisor "amassando" voz do Redator

Revisor (Claude) pode ter tendência a homogeneizar tom. Mitigação: prompt de revisão prescreve "preservar voz do Redator quando alinhada ao Voice Guide"; auditoria amostral mensal compara draft.md vs. draft_revisado.md.

## Governança de versões de modelo

Toda execução do pipeline registra a versão pinada de cada modelo em `manifest.json`. Mudança de versão segue o protocolo:

1. Provedor anuncia nova versão.
2. Versão é proposta para o pipeline com 30 dias de antecedência (em ata mensal).
3. Pipeline roda em paralelo: versão atual vs. versão nova em sub-lote de 3 peças, com avaliação cega por Bruno Azambuja.
4. Aprovação executiva (Alexandre + Bruno) decide adoção.
5. Versão nova entra no primeiro dia do mês posterior à decisão.
6. Coleta cross-LLM (`dashboards/RUNBOOK-COLETA-LLM.md`) segmenta a série temporal antes/depois.

Versão "latest" sem pinagem é proibida por design. Quando o provedor não oferece pinagem, o pipeline usa flag de quarentena.

## Anti-padrões proibidos

- Substituir LLM padrão por outro sem passar pelo fallback map — proibido.
- Pular checkpoints incrementais "para ir mais rápido" — proibido. Disciplina protege contra refazer etapas inteiras.
- Aumentar limite de concorrência em produção sem teste prévio — proibido.
- Usar "latest" como versão pinada — proibido. Drift contamina série.
- Aceitar peça com fallback acionado em duas ou mais etapas sem revisão executiva — proibido.
- Misturar pipeline de coleta cross-LLM com pipeline editorial em alocação de orçamento — proibido. Cada um tem sua linha de cost log (`dashboards/FINOPS-DISCIPLINA.md`).
- Editar prompt canônico sem versionar — proibido. Mudança em prompt vira commit em git com nota de mudança.

## Cadência de revisão deste pipeline

| Atividade | Cadência | Owner |
|---|---|---|
| Verificação de versões pinadas | Trimestral | Alexandre Caramaschi |
| Revisão de fallback map | Trimestral | Alexandre Caramaschi |
| Recalibração do envelope de custo | Mensal | Alexandre Caramaschi |
| Avaliação de novos modelos | Trimestral | Alexandre Caramaschi |
| Auditoria amostral de qualidade (draft vs. revisado) | Mensal | Bruno Azambuja |
| Revisão dos prompts canônicos | Trimestral | Alexandre Caramaschi |
| Análise de incidentes (circuit breaker, fallback acionado) | Mensal | Alexandre Caramaschi |
| Revisão deste documento | Trimestral | Alexandre Caramaschi |
