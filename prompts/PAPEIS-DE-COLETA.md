# Papéis Canônicos do Pipeline de Coleta — Programa GEO IPOG

> **Status:** vigente desde 2026-04-30 (reescopo 2026-05-12)
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-05-12

## Escopo canônico

**O pipeline opera sobre o guarda-chuva amplo "Pós-Graduações em Psicologia"**, cobrindo as 5 modalidades canônicas: Especialização Lato Sensu (formato dominante), MBA correlato à Psicologia (Organizacional, Neurociência Executiva, Coaching, Liderança, Saúde Mental Corporativa), Mestrado Profissional, Especialização Clínica certificada por Conselhos (CFP, ABRAP, FBT, ABPp) e formações híbridas. Cada papel deve respeitar essa amplitude ao pesquisar, redigir, analisar, classificar e revisar peças editoriais.

## Por que existem cinco papéis

O programa GEO IPOG depende de produção editorial recorrente em padrão HBR/HSM/MIT Sloan, com auditoria permanente cross-LLM. Para entregar volume com consistência, dividimos o trabalho em cinco papéis canônicos, cada um com LLM padrão, fallback, input esperado, output esperado e critério de pronto. A divisão é estratégica: cada LLM é alocado no papel onde tem vantagem técnica e custo melhor (ver `dashboards/FINOPS-DISCIPLINA.md`).

Os papéis são **Pesquisador**, **Redator**, **Analisador**, **Classificador** e **Revisor**. Eles compõem o pipeline descrito em `docs/framework/03-pipeline-5-llms.md`.

## Matriz canônica dos cinco papéis

| Papel | LLM padrão | LLM fallback | Input | Output | Onde se encaixa no fluxo | Critério de pronto |
|---|---|---|---|---|---|---|
| Pesquisador | Perplexity sonar-pro | Google Gemini 1.5 Pro → Anthropic Claude Sonnet 4.5 | Tema + persona-alvo + cluster semântico + modalidade-alvo (LATO/MBA/MEPP/CLIN/AMPLO) | JSON `research_data` com 6 categorias estruturadas (mercado, fundamentação acadêmica, tendências, análise competitiva, fontes, casos) cobrindo a modalidade indicada | Etapa 1, sequencial. Bloqueante para todas as demais. | JSON parseável, 6 categorias preenchidas, fontes datadas e válidas, mínimo 3 citações acadêmicas BR, modalidade declarada |
| Redator | OpenAI GPT-4o | Anthropic Claude Sonnet 4.5 → Google Gemini 1.5 Pro | Tema + outline + research_data + briefing | Markdown HBR completo (1500-4000 palavras) com abertura-impacto, objetivos Bloom, fundamentação, caso, tabela, 3 exercícios, síntese | Etapa 2, paraleliza por peça. Cada redator processa uma peça por vez. | 1500-4000 palavras, 6 elementos editoriais presentes, 0 clichés proibidos, naming canônico IPOG correto, parágrafos máximo 5 linhas |
| Analisador | Google Gemini 1.5 Pro | OpenAI GPT-4o → Anthropic Claude Sonnet 4.5 | Draft.md + briefing | JSON com 7 dimensões (coerência, editorial, formatação, andragogia 6 princípios Knowles, gaps, exercícios, acentuação) com score 0-10 cada | Etapa 3, paralela ao Classificador, posterior ao Redator | JSON parseável com 7 dimensões e score; gaps listados quando score < 7 |
| Classificador | Groq llama-3.3-70b | OpenAI GPT-4o → Anthropic Claude Sonnet 4.5 | Draft.md | JSON metadata (nível Bloom dominante, tags 5-10, pré-requisitos, duração estimada de leitura, categoria, persona-alvo, keywords SEO, cluster semântico) | Etapa 3b, paralela ao Analisador | JSON parseável com nível, tags, persona, cluster preenchidos |
| Revisor | Anthropic Claude (Opus ou Sonnet 4.5+) | OpenAI GPT-4o | Draft.md + analise.json + voice_guard_config | Markdown revisado integralmente + summary JSON com 4 contadores (correções, acentuação, editorial, formatação) + flag aprovado sim/não | Etapa 4, sequencial. Última antes da publicação. | Markdown revisado, summary JSON parseável, score Voice Guard >= 70, aprovado sim/não decidido |

## Detalhamento dos critérios de pronto

### Pesquisador

- JSON segue esquema definido em `prompts/PROMPT-PESQUISA.md`.
- 6 categorias preenchidas, mesmo que com `null` justificado quando não há dado.
- Mínimo 3 citações acadêmicas brasileiras (Psicologia: Ciência e Profissão, Trends in Psychology, Estudos de Psicologia, periódicos CFP/ABEP) ou justificativa explícita quando o tema não tem produção acadêmica BR direta.
- Fontes datadas (mês e ano), com URL canônica e autor quando aplicável.
- Concorrentes mapeados conforme lista canônica do programa (EAD massivos, premium presencial, especialistas em Psicologia, plataformas).
- Sem alucinação: se o Pesquisador não encontrou dado, declara explicitamente "não encontrado em fontes auditáveis".

### Redator

- Padrão HBR/HSM/MIT Sloan: abertura-impacto, tese contraintuitiva, evidência, mecanismo, decisão pessoal, próximo passo.
- Knowles: mínimo 5 dos 6 princípios da andragogia explícitos no texto.
- Bloom: mínimo 3 níveis cobertos no objetivo + nos exercícios.
- Tabela ou matriz comparativa presente.
- 3 exercícios práticos.
- Síntese final que fecha tese.
- Naming canônico: "IPOG", "Brasil GEO", "Pós-Graduação em Psicologia" como guarda-chuva amplo (cobrindo as 5 modalidades canônicas: Especialização Lato Sensu, MBA correlato, Mestrado Profissional, Especialização Clínica certificada por Conselhos, formações híbridas), "Alexandre Caramaschi" (CEO da Brasil GEO, ex-CMO da Semantix Nasdaq, cofundador da AI Brasil), "Ronan Maia" (CEO IPOG), "Bruno Azambuja" (Gerente de Marketing IPOG). Quando a peça for sobre o subconjunto MBA, usar "MBA Online em Psicologia [Cluster]" com naming explícito.
- Zero clichés proibidos (lista em `content/CLICHES-PROIBIDOS.md`).
- Acentuação PT-BR completa, sem `nao`, `voce`, `producao`.
- Parágrafos máximo 5 linhas.
- 1500-4000 palavras.
- Sem emojis.

### Analisador

- 7 dimensões com score 0-10 cada e justificativa em prosa curta.
- Gaps acionáveis listados quando dimensão < 7.
- Veredito final agregado: aprovado para revisão / reescrever / rejeitar.
- Andragogia (Knowles): valida cada um dos 6 princípios separadamente.
- Acentuação: detecta ocorrências de palavras sem acento e lista.

### Classificador

- Nível Bloom dominante.
- 5 a 10 tags relevantes.
- Pré-requisitos: nenhum, básico, intermediário, avançado.
- Duração estimada de leitura em minutos.
- Categoria: cluster semântico (C1, C2, C3) ou transversal.
- Persona-alvo principal (P1 a P7).
- **Modalidade canônica dominante**: AMPLO, LATO, MBA, MEPP, CLIN.
- Keywords SEO: 5 a 8 termos canônicos do tema.

### Revisor

- Markdown revisado integralmente, com correções aplicadas.
- Summary JSON com 4 contadores numéricos: total de correções aplicadas, ocorrências de acentuação corrigidas, ajustes editoriais (estrutura, tom), ajustes de formatação.
- Voice Guard score (0-100) computado conforme `prompts/PROMPT-REVISAO.md`.
- Flag aprovado sim/não com justificativa quando "não".
- Mantém naming canônico, integridade de citações e acentuação.

## Encaixe no fluxo

```
[Briefing IPOG]
    |
    v
[Pesquisador]  -- research_data.json -->  [Redator]
                                              |
                                              v
                                          [Draft.md]
                                              |
                            +-----------------+-----------------+
                            v                                   v
                       [Analisador]                       [Classificador]
                       analise.json                       metadata.json
                            \                                   /
                             \                                 /
                              v                               v
                                   [Revisor (Claude)]
                                          |
                                          v
                                  [Draft revisado + summary]
                                          |
                                          v
                                  [Quality Gate 5/6 camadas]
                                          |
                                          v
                                     [Publicação]
```

## Fallback map

Quando o LLM padrão falha (timeout, erro 5xx, circuit breaker aberto), o pipeline tenta o fallback primário; se este também falhar, tenta o secundário. Política consolidada:

| Papel | Padrão | Fallback 1 | Fallback 2 |
|---|---|---|---|
| Pesquisador | Perplexity sonar-pro | Google Gemini 1.5 Pro | Anthropic Claude Sonnet 4.5 |
| Redator | OpenAI GPT-4o | Anthropic Claude Sonnet 4.5 | Google Gemini 1.5 Pro |
| Analisador | Google Gemini 1.5 Pro | OpenAI GPT-4o | Anthropic Claude Sonnet 4.5 |
| Classificador | Groq llama-3.3-70b | OpenAI GPT-4o | Anthropic Claude Sonnet 4.5 |
| Revisor | Anthropic Claude (Opus/Sonnet 4.5+) | OpenAI GPT-4o | — |

Detalhes de circuit breaker e retry em `docs/framework/03-pipeline-5-llms.md`.

## Cross-links

- KIT-PROMPTS-V0 — `prompts/KIT-PROMPTS-V0.md`.
- Pesquisador — `prompts/PROMPT-PESQUISA.md`.
- Redator — `prompts/PROMPT-REDACAO.md`.
- Analisador — `prompts/PROMPT-ANALISE.md`.
- Classificador — `prompts/PROMPT-CLASSIFICACAO.md`.
- Revisor — `prompts/PROMPT-REVISAO.md`.
- Pipeline completo — `docs/framework/03-pipeline-5-llms.md`.
- Quality gate — `docs/framework/02-quality-gate-5-camadas.md`.
- FinOps — `dashboards/FINOPS-DISCIPLINA.md`.
