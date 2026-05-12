# KPI Dashboard — Programa GEO IPOG

> **Status:** vigente desde 2026-05-01 — atualizado em 2026-05-12 (reframe canônico de escopo amplo)
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última leitura registrada:** {YYYY-MM-DD HH:MM} BRT
> **Próxima leitura agendada:** {YYYY-MM-DD HH:MM} BRT

> **Reframe canônico 12-05-2026:** todos os KPIs deste painel operam sobre o escopo amplo **Pós-Graduações em Psicologia (Especialização Lato Sensu, MBA correlato, Mestrado Profissional, Especialização Clínica certificada CFP/ABRAP/FBT, Formações híbridas/residências)** — ver `dashboards/METRICAS-CANONICAS.md` Cláusula 0. SoV passa de 3 clusters baseados em MBA para 5 clusters canônicos.

Este documento é o **painel ao vivo** das leituras dos 8 KPIs canônicos do programa GEO IPOG. As definições operacionais (fórmula, fonte, cadência, N mínimo, owner) estão em `dashboards/METRICAS-CANONICAS.md`. Este arquivo carrega apenas os números, o histórico e a leitura cruzada que alimentam os relatórios semanal, mensal e trimestral.

A regra editorial é prescritiva: cada leitura é registrada com data, versão de modelo pinada, N e fonte. **Nenhuma leitura entra sem essas quatro informações.** Quando o N mínimo não é atingido, a leitura é registrada como `N/D` e a célula de delta fica vazia.

## 1. Painel executivo (snapshot atual)

Semaforização operacional das leituras mais recentes. Critério de cor:

- **VERDE** — KPI dentro de 10% da meta de Fase 4 ou em trajetória positiva consistente nas últimas 4 leituras.
- **AMARELO** — KPI estagnado por 4+ leituras ou abaixo da meta de Fase 4 em 25-50%.
- **VERMELHO** — KPI em queda em 2+ leituras consecutivas ou abaixo da meta de Fase 4 em mais de 50%.
- **CINZA** — sem dado (`N/D`) por 1 ou mais leituras (causa registrada).

| KPI | Leitura atual | Meta Fase 4 | Cor | Tendência (últimas 4) | Owner |
|---|---|---|---|---|---|
| KPI 1 — LLM Mention Rate (mediana cohort, escopo amplo 5 modalidades) | N/D | varia por LLM | CINZA | -- | Alexandre Caramaschi |
| KPI 2 — SoV cluster a (Especialização Lato Sensu) | N/D | >= 18% | CINZA | -- | Bruno Azambuja |
| KPI 2 — SoV cluster b (MBA correlato à Psicologia) | N/D | >= 15% | CINZA | -- | Bruno Azambuja |
| KPI 2 — SoV cluster c (Mestrado Profissional) | N/D | >= 8% | CINZA | -- | Bruno Azambuja |
| KPI 2 — SoV cluster d (Clínica certificada CFP/ABRAP/FBT) | N/D | >= 20% | CINZA | -- | Bruno Azambuja |
| KPI 2 — SoV cluster e (Formações híbridas/residências) | N/D | >= 12% | CINZA | -- | Bruno Azambuja |
| KPI 3 — Citation Quality Score | N/D | >= 80 | CINZA | -- | Alexandre Caramaschi |
| KPI 4 — Schema Coverage Score (NAIA) | N/D | >= 90 | CINZA | -- | Bruno Azambuja |
| KPI 5 — Cobertura de fontes externas | N/D | >= 8 | CINZA | -- | Bruno Azambuja |
| KPI 6 — Velocidade fechamento P0 | N/D | <= 5 dias úteis | CINZA | -- | Alexandre Caramaschi |
| KPI 7 — Conversion Lift Perplexity | N/D | >= 1.3 | CINZA | -- | Bruno Azambuja |
| KPI 7 — Conversion Lift ChatGPT | N/D | >= 1.3 | CINZA | -- | Bruno Azambuja |
| KPI 8 — Delta médio pós-onda | N/D | varia | CINZA | -- | Alexandre Caramaschi |

**Estado geral:** baseline pré-Fase 1 — todas as leituras pendentes da primeira coleta cross-LLM. Issue #5 do GitHub rastreia a captura.

---

## 2. KPI 1 — LLM Mention Rate

### 2.1 Histórico por LLM (cohort canônico)

Leitura agregada semanal. Cohort: ChatGPT, Claude, Gemini, Perplexity, Grok, Copilot. N mínimo: 50 prompts respondidos por LLM por leitura.

| Leitura | ChatGPT | Claude | Gemini | Perplexity | Grok | Copilot | Mediana | N total |
|---|---|---|---|---|---|---|---|---|
| {YYYY-MM-DD} | -- | -- | -- | -- | -- | -- | -- | -- |

### 2.2 Versões pinadas vigentes

Atualizado trimestralmente na sessão de revisão (rotina 4.2 do template trimestral).

| LLM | Versão pinada vigente | Fixada em | Próxima revisão |
|---|---|---|---|
| ChatGPT | gpt-5.0 | 2026-04-30 | 2026-Q3 |
| Claude | claude-opus-4-7 | 2026-04-30 | 2026-Q3 |
| Gemini | gemini-3-pro | 2026-04-30 | 2026-Q3 |
| Perplexity | sonar-pro | 2026-04-30 | 2026-Q3 |
| Grok | grok-4 | 2026-04-30 | 2026-Q3 |
| Copilot | copilot-2026 | 2026-04-30 | 2026-Q3 |

### 2.3 Mention Rate por persona

Leitura mensal agregada. Personas canônicas IPOG.

| Leitura | Psicólogo recém-graduado | Psicólogo clínico estabelecido | RH/gestão de pessoas | Profissional de saúde | Educador/pedagogo | Transição de carreira | Coach/terapeuta complementar |
|---|---|---|---|---|---|---|---|
| {YYYY-MM-DD} | -- | -- | -- | -- | -- | -- | -- |

---

## 3. KPI 2 — Share-of-Voice por cluster

> **Reframe 12-05-2026:** SoV passou para 5 clusters canônicos (a-e). As três tabelas 3.1, 3.2 e 3.3 abaixo permanecem como **decomposição secundária** para continuidade da série pré-reframe (clusters baseados em MBA mapeiam dentro dos clusters a e b). Tabelas 3.4, 3.5 e 3.6 abaixo cobrem os novos clusters c, d e e canônicos.

### 3.1 Histórico cluster Organizacional / Trabalho / RH (decomposição secundária, subconjunto dos clusters canônicos a + b)

Snapshot quinzenal. Concorrentes canônicos do trimestre vigente em `data/concorrentes-{YYYY-Q{N}}.yaml` (a criar). Concorrentes mapeados nas Ondas 1-2 do benchmarking aparecem nominalmente.

| Leitura | IPOG | Anhembi | Estácio | Anhanguera | UNINTER | UniCesumar | wPós | Saint Paul | PUC-Minas | Outros | N total |
|---|---|---|---|---|---|---|---|---|---|---|---|
| {YYYY-MM-DD} | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- |

### 3.2 Histórico cluster Clínica / Neuropsicologia / TCC / Avaliação

| Leitura | IPOG | Anhanguera | Estácio | UniCesumar | UNINTER | CETCC | IBNeuro | Sírio-Libanês | wPós | Anhembi | PUC-Minas | Outros |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| {YYYY-MM-DD} | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- |

### 3.3 Histórico cluster Psicopedagogia / Escolar / Educação (decomposição secundária)

| Leitura | IPOG | Estácio | UNINTER | Anhanguera | UniCesumar | Anhembi | wPós | PUC-Minas | Outros |
|---|---|---|---|---|---|---|---|---|---|
| {YYYY-MM-DD} | -- | -- | -- | -- | -- | -- | -- | -- | -- |

### 3.4 Histórico cluster c — Mestrado Profissional em Psicologia (canônico)

| Leitura | IPOG | USP | PUC-SP | UFRJ | UFMG | Mackenzie | UNIFESP | UFRGS | Outros | N total |
|---|---|---|---|---|---|---|---|---|---|---|
| {YYYY-MM-DD} | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- |

### 3.5 Histórico cluster d — Especialização Clínica certificada CFP/ABRAP/FBT (canônico)

| Leitura | IPOG | CETCC | InEPP | IBNeuro | INPG | IBPEX | FBT | Anhembi | UniCesumar | Outros | N total |
|---|---|---|---|---|---|---|---|---|---|---|---|
| {YYYY-MM-DD} | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- |

### 3.6 Histórico cluster e — Formações híbridas e residências (canônico)

| Leitura | IPOG | Sírio-Libanês | Albert Einstein | HCFMUSP | Anhembi | Estácio | PUC-Minas | UniCesumar | Outros | N total |
|---|---|---|---|---|---|---|---|---|---|---|
| {YYYY-MM-DD} | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- |

---

## 4. KPI 3 — Citation Quality Score

Leitura semanal. N mínimo: 30 menções válidas no período.

| Leitura | Score médio | Fato MEC presente (%) | Fato modalidade Online Ao Vivo (%) | Fato carga horária (%) | Fato corpo docente (%) | Fato diferencial editorial (%) |
|---|---|---|---|---|---|---|
| {YYYY-MM-DD} | -- | -- | -- | -- | -- | -- |

---

## 5. KPI 4 — Schema Coverage Score (NAIA)

### 5.1 Histórico mensal (auditoria completa)

| Leitura | Score | P0 falhando | P1 falhando | P2 falhando | Categorias com mais falhas | Auditoria executada em |
|---|---|---|---|---|---|---|
| {YYYY-MM-DD} | -- | -- | -- | -- | -- | -- |

### 5.2 Spot-check quinzenal P0/P1

| Data | P0 falhando | P1 falhando | Issues abertas |
|---|---|---|---|
| {YYYY-MM-DD} | -- | -- | #X, #Y |

---

## 6. KPI 5 — Cobertura de fontes externas (Autoridade)

Re-cálculo trimestral. Janela 12 meses corridos.

### 6.1 Tipos de fonte

| Tipo de fonte | Q{N} | Q{N+1} | Q{N+2} | Q{N+3} | Meta Fase 4 |
|---|---|---|---|---|---|
| Wikipedia (verbete IPOG) | -- | -- | -- | -- | 1 |
| Mídia educacional tier 1 (Estadão Educação, Folha, Quero Bolsa, Educa Mais Brasil) | -- | -- | -- | -- | >= 2 |
| Periódicos acadêmicos (PCP, Trends, Estudos de Psi) | -- | -- | -- | -- | >= 2 |
| Fontes regulatórias / setoriais (CFP, ABEP, ABRAPSO, Conselhos Regionais) | -- | -- | -- | -- | >= 3 |
| **Total fontes únicas (12m)** | -- | -- | -- | -- | **>= 8** |

### 6.2 Wikipedia IPOG — baseline e crescimento

| Leitura | Linhas no verbete | Referências | Infobox completo | Comparação com Anhembi (250+ linhas) | Comparação com Hospital Sírio-Libanês (200+ linhas) |
|---|---|---|---|---|---|
| {YYYY-MM-DD} | -- | -- | sim/não | -- | -- |

---

## 7. KPI 6 — Velocidade de fechamento de gaps por onda

| Onda | P0 abertos | P0 mediana fechamento (dias úteis) | P1 abertos | P1 mediana fechamento (dias úteis) | Conclusão da onda |
|---|---|---|---|---|---|
| Onda {N} | -- | -- | -- | -- | -- |

Meta Fase 4: P0 mediana ≤ 5 dias úteis · P1 mediana ≤ 15 dias úteis.

---

## 8. KPI 7 — Conversion Lift por canal LLM

Leitura mensal com janela de 30 dias. N mínimo: 100 sessões classificadas como LLM-originated.

| Mês | Perplexity (lift / N) | ChatGPT (lift / N) | Claude (lift / N) | Gemini (lift / N) | Outros (lift / N) |
|---|---|---|---|---|---|
| {YYYY-MM} | -- / -- | -- / -- | -- / -- | -- / -- | -- / -- |

Meta Fase 4: lift ≥ 1.3 em pelo menos 3 LLMs do cohort, com Perplexity e ChatGPT obrigatoriamente entre eles.

---

## 9. KPI 8 — Delta pré/pós ondas

| Onda | Janela | Peças publicadas | Ajustes Schema | Delta Mention Rate | Delta SoV cluster atacado | Delta Citation Quality | Delta Schema Coverage |
|---|---|---|---|---|---|---|---|
| Onda {N} | -- | -- | -- | +/- pp | +/- pp | +/- pontos | +/- pontos |

Meta Fase 4 por onda: ΔMention Rate ≥ +5 pp · ΔSoV ≥ +3 pp no cluster atacado · ΔCitation Quality ≥ +5 pontos · ΔSchema Coverage ≥ +2 pontos quando há ajuste técnico.

---

## 10. Heatmap de risco por KPI

Atualização mensal no checkpoint executivo.

| KPI | Risco principal | Probabilidade | Impacto | Mitigação ativa |
|---|---|---|---|---|
| KPI 1 — Mention Rate | Mudança silenciosa de versão pelo provedor LLM | Média | Alto | Drift detection trimestral; segmentar série antes/depois da mudança |
| KPI 2 — Share-of-Voice | Concorrente publica llms.txt antes do IPOG | Média | Alto | Issue #2 prioritária na Fase 1; monitoramento quinzenal automatizado (issue #15) |
| KPI 3 — Citation Quality | Schema institucional não declara fatos canônicos com clareza | Alta | Médio | Issue #3 (Schema piloto) prioritária na Fase 1 |
| KPI 4 — Schema Coverage | Plataforma IPOG limita injeção de Schema avançado | Baixa | Médio | Validar com TI IPOG antes da Fase 1 |
| KPI 5 — Autoridade externa | Wikipedia bloqueia edição por critério de notabilidade | Média | Alto | Plano de fontes secundárias confiáveis primeiro (issue #19) |
| KPI 6 — Velocidade gaps | Gating IPOG (Bruno/Ronan) atrasa decisões | Alta | Alto | Decisões críticas escaladas no relatório semanal seção 9 |
| KPI 7 — Conversion Lift | UTM dedicado / referrer não capturado em GA4 | Média | Alto | Issue de configuração GA4 antes da Fase 1 |
| KPI 8 — Delta pós-onda | Tema da onda não ataca cluster prioritário | Baixa | Médio | Plano de cada onda passa por revisão semanal antes do start |

---

## 11. Cadência de atualização deste arquivo

| Seção | Cadência | Owner |
|---|---|---|
| Painel executivo (seção 1) | Semanal | Alexandre Caramaschi |
| Histórico KPI 1 (seção 2.1) | Semanal | Alexandre Caramaschi |
| Mention Rate por persona (seção 2.3) | Mensal | Alexandre Caramaschi |
| Versões pinadas (seção 2.2) | Trimestral | Alexandre Caramaschi |
| Histórico KPI 2 (seção 3) | Quinzenal | Bruno Azambuja |
| Histórico KPI 3 (seção 4) | Semanal | Alexandre Caramaschi |
| Histórico KPI 4 mensal (seção 5.1) | Mensal | Bruno Azambuja |
| Spot-check quinzenal (seção 5.2) | Quinzenal | Bruno Azambuja |
| Histórico KPI 5 (seção 6) | Trimestral | Bruno Azambuja |
| Wikipedia baseline (seção 6.2) | Mensal | Bruno Azambuja |
| Histórico KPI 6 (seção 7) | Por onda | Alexandre Caramaschi |
| Histórico KPI 7 (seção 8) | Mensal | Bruno Azambuja |
| Histórico KPI 8 (seção 9) | Por onda | Alexandre Caramaschi |
| Heatmap de risco (seção 10) | Mensal | Alexandre Caramaschi + Bruno Azambuja |

---

## 12. Cross-links

- `dashboards/METRICAS-CANONICAS.md` — definições operacionais completas dos 8 KPIs.
- `dashboards/RUNBOOK-COLETA-LLM.md` — operação que alimenta KPIs 1, 2, 3.
- `dashboards/FINOPS-DISCIPLINA.md` — custo associado à medição.
- `audits/PLAYBOOK-AUDITORIA-NAIA.md` — auditoria que alimenta KPI 4.
- `audits/benchmarking/` — universo competitivo que alimenta KPI 2.
- `docs/relatorios-semanais/` — relatórios que consumem este dashboard.
- `docs/relatorios-mensais/` — relatórios que consolidam este dashboard.
- `docs/relatorios-trimestrais/` — revisão estratégica que recalibra KPIs.
- `docs/05-risk-register.md` — riscos do programa.
