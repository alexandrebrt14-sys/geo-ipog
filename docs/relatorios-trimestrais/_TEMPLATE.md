# Revisão Trimestral GEO IPOG — Q{N} de {YYYY} ({mês_inicio} a {mês_fim})

**Sessão de revisão estratégica:** {YYYY-MM-DD} {HH:MM} BRT (sessão de 2-3 horas)
**Destinatário primário:** Ronan Maia (CEO IPOG)
**Destinatário operacional:** Bruno Azambuja (Gerente de Marketing IPOG)
**Lead Brasil GEO:** Alexandre Caramaschi (Head)
**Período coberto:** {YYYY-MM-DD} a {YYYY-MM-DD} ({3 meses})
**Fechado em:** {YYYY-MM-DD HH:MM} BRT
**Enviado em:** {YYYY-MM-DD HH:MM} BRT (5 dias antes da sessão)

---

## 1. Estado do programa em uma página

### 1.1 Tese estratégica revisitada

A tese central do programa em uma frase: {citar tese atual}.

**A tese ainda é válida no fechamento do trimestre?** {sim / sim com calibração / precisa ser reescrita}

Justificativa em 3-5 linhas com evidência primária.

### 1.2 Ondas concluídas no trimestre

| Onda | Janela | Escopo | KPI 8 (Delta médio) | Conclusão |
|---|---|---|---|---|
| Onda {N} | | | +{pp} | atingiu / parcial / não atingiu |
| Onda {N+1} | | | +{pp} | -- |

### 1.3 Estado dos KPIs canônicos vs. baseline da Fase 1

| KPI | Baseline Fase 1 | Atual | Meta Fase 4 | % do caminho percorrido |
|---|---|---|---|---|
| KPI 1 — LLM Mention Rate (mediana) | | | varia | XX% |
| KPI 2 — SoV cluster Clínica | | | >= 20% | XX% |
| KPI 2 — SoV cluster Organizacional | | | >= 15% | XX% |
| KPI 2 — SoV cluster Psicopedagogia | | | >= 12% | XX% |
| KPI 3 — Citation Quality Score | | | >= 80 | XX% |
| KPI 4 — Schema Coverage Score | | | >= 90 | XX% |
| KPI 5 — Fontes externas (janela 12m) | | | >= 8 | XX% |
| KPI 6 — Velocidade P0 (dias úteis) | | | <= 5 | XX% |
| KPI 7 — Conversion Lift Perplexity | | | >= 1.3 | XX% |
| KPI 7 — Conversion Lift ChatGPT | | | >= 1.3 | XX% |

---

## 2. Análise estratégica do trimestre

### 2.1 O que funcionou (causalmente, não correlacionalmente)

Listar 3-5 movimentos que produziram delta mensurável em KPI canônico, com cadeia causal explicada (não apenas "publicamos X e KPI Y subiu" — explicar o mecanismo).

### 2.2 O que não funcionou e o porquê

Listar 2-3 movimentos onde o investimento foi feito mas o KPI não respondeu como esperado. Diagnóstico negativo (qual hipótese foi descartada).

### 2.3 Padrão competitivo observado

- Concorrentes que cresceram em SoV no trimestre: {ranking}
- Concorrentes que perderam SoV: {ranking}
- Movimentações estratégicas mapeadas (M&A, lançamentos, mudanças de Schema, llms.txt publicado, etc.)

### 2.4 Mudanças no universo de referência

- Novos concorrentes mapeados em ondas do benchmarking (Onda 3, Onda 4)
- Concorrentes descartados (saíram do universo competitivo)
- Correções de premissa registradas em `audits/benchmarking/ONDA-{N}-CORRECOES-PREMISSA.md`

---

## 3. Mensuração consolidada — 12 séries temporais

Para cada um dos 8 KPIs canônicos + 3 secundários (peças publicadas, gaps abertos, velocidade média de fechamento), apresentar gráfico ou tabela com leituras mensais dos 3 meses + leituras dos meses anteriores quando disponíveis.

### 3.1 KPI 1 — LLM Mention Rate por LLM (3 meses)

| Mês | ChatGPT | Claude | Gemini | Perplexity | Grok | Copilot | Mediana |
|---|---|---|---|---|---|---|---|
| Mês {-2} | | | | | | | |
| Mês {-1} | | | | | | | |
| Mês {0} | | | | | | | |

### 3.2 KPI 2 — Share-of-Voice por cluster (3 meses)

| Cluster | Mês {-2} | Mês {-1} | Mês {0} | Tendência |
|---|---|---|---|---|
| Organizacional/RH | | | | -- |
| Clínica/Neuro/TCC/Avaliação | | | | -- |
| Psicopedagogia/Escolar | | | | -- |

### 3.3 KPI 4 — Schema Coverage Score por mês

| Mês | Score | P0 falhando | P1 falhando | Auditoria NAIA executada em |
|---|---|---|---|---|
| Mês {-2} | | | | YYYY-MM-DD |
| Mês {-1} | | | | YYYY-MM-DD |
| Mês {0} | | | | YYYY-MM-DD |

### 3.4 KPI 5 — Autoridade externa cumulativa (12 meses corridos)

| Tipo de fonte | Fontes únicas |
|---|---|
| Wikipedia | |
| Mídia educacional tier 1 | |
| Periódicos acadêmicos | |
| Fontes regulatórias (CFP, ABEP, ABRAPSO) | |
| **Total** | |

---

## 4. Re-calibração trimestral

### 4.1 Full-grid prompt sensitivity (rotina trimestral 3.5 do framework)

- Variância entre prompts equivalentes do kit canônico: {valor}
- Banda de ruído atualizada: {valor}
- Prompts descartados por excesso de variância: {lista}
- Prompts adicionados: {lista}

### 4.2 Cohort de LLMs — versões pinadas

- Versões atualizadas no trimestre: {lista}
- Provedores que mudaram modelo silenciosamente (drift detection): {lista}
- Decisão de migração de versão pinada: {sim/não/aguardar}

### 4.3 Dicionário de concorrentes versionado

- Dicionário versão atual: `data/concorrentes-{YYYY-Q{N}}.yaml`
- Concorrentes adicionados: {lista}
- Concorrentes removidos: {lista}
- Justificativas em `audits/benchmarking/`

### 4.4 Recalibração do kit de prompts-âncora

- Kit versão atual: `prompts/KIT-PROMPTS-V{X}.md`
- Prompts retirados (saturação ou irrelevância): {lista}
- Prompts adicionados (novas personas ou clusters emergentes): {lista}

---

## 5. Roadmap — confirmação ou ajuste

### 5.1 Fases originais do roadmap

| Fase | Status original | Status atual | Justificativa de ajuste |
|---|---|---|---|
| Fase 1 — Baseline + Schema piloto | -- | concluída / em curso / atrasada | |
| Fase 2 — Primeira leva HBR | -- | -- | |
| Fase 3 — Pico GEO captação 2026.2 | -- | -- | |
| Fase 4 — Operação contínua + pré-pico 2027.1 | -- | -- | |

### 5.2 Próximas fases / ondas no trimestre seguinte

- Onda {N+2}: {escopo} — janela {YYYY-MM-DD} a {YYYY-MM-DD}
- Onda {N+3}: {escopo} — janela {YYYY-MM-DD} a {YYYY-MM-DD}

### 5.3 Marcos críticos do trimestre seguinte

- {Marco 1} — prazo {YYYY-MM-DD}
- {Marco 2} — prazo {YYYY-MM-DD}

---

## 6. Decisões executivas pedidas no checkpoint trimestral

| # | Decisão | Opções | Recomendação Brasil GEO | Owner | Prazo |
|---|---|---|---|---|---|
| 1 | | A/B/C | | Ronan Maia | |
| 2 | | A/B/C | | Bruno Azambuja | |

---

## 7. Risco estratégico — top 5 do trimestre

Detalhes completos em `docs/05-risk-register.md`.

| Risco | Probabilidade | Impacto | Mitigação aplicada no trimestre | Status atual | Decisão pedida |
|---|---|---|---|---|---|
| | | | | reduzido / inalterado / agravado | |

---

## 8. FinOps trimestral

- Gasto total cross-LLM no trimestre: {valor}
- Gasto total infraestrutura no trimestre: {valor}
- Custo por leitura cross-LLM (mediana do trimestre): {valor}
- Custo por gap fechado: {valor}
- Custo por matrícula atribuída a referrers de LLM: {valor}
- Variação vs. budget anual: {%}
- Decisões de re-alocação propostas: {lista}

---

## 9. Expansão do programa (se aplicável)

### 9.1 Vertical MBA Online de Psicologia consolidada

- KPIs Fase 4 atingidos? {sim/parcial/não}
- Quando se torna razoável "abrir" para outras áreas IPOG?

### 9.2 Outras áreas IPOG — assessment preliminar

- {Área candidata} — {fit estratégico} — {esforço estimado}
- Decisão: {expandir / aguardar / descartar}

---

## 10. Anexos

- Atas dos 3 checkpoints mensais do trimestre: `docs/atas/{YYYY-MM-DD}-ipog-checkpoint-executivo.md` ×3
- 12 relatórios semanais (3 meses × 4 semanas): links
- 3 relatórios mensais consolidados: links
- KPI Dashboard atualizado: `dashboards/KPI-DASHBOARD.md`
- Roadmap atualizado: `ROADMAP.md`
- Risk register: `docs/05-risk-register.md`
- Auditorias NAIA dos 3 meses: links

---

Revisão trimestral fechada em {YYYY-MM-DD HH:MM} BRT e enviada para Ronan Maia + Bruno Azambuja em {YYYY-MM-DD HH:MM} BRT.
