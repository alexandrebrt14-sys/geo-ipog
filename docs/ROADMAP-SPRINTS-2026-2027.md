# Roadmap de Sprints — Programa GEO IPOG · 2026-2027

> **Status:** vigente desde 2026-05-10
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação:** Bruno Azambuja (IPOG) + Ronan Maia (CEO IPOG)
> **Cadência de revisão:** quinzenal (fim de sprint) + mensal (checkpoint executivo)
> **Horizonte:** Sprint 1 (11-05-2026) até Sprint 22+ (após pico 2027.1 em 15-02-2027)

Detalhamento operacional do programa GEO IPOG em **22 sprints quinzenais** cobrindo todos os 5 vetores (V1 GEO técnico, V2 engenharia de citação, V3 editorial HBR, V4 autoridade externa, V5 moat regional CNPJ-próprio) e os 6 frameworks canônicos (F1-F6 em `docs/GEO-FRAMEWORK-CANONICO.md`).

A relação com `ROADMAP.md` (4 fases — visão cliente) e `docs/ROADMAP_2026Q2-Q4.md` (CTO masterplan — visão cross-repo): este documento é a **terceira leitura** — visão de execução em sprints com tasks programadas para todos os vetores e frameworks. Convergem nos mesmos marcos críticos (`docs/06-marcos-criticos-2026.md`).

A lógica é prescritiva: roadmap sem sprint definido vira intenção. Sprint sem tasks por vetor permite ângulos cegos. Cada sprint abaixo entrega tasks em ≥ 3 dos 5 vetores.

---

## 1. Macro estrutura — 7 marcos do programa

| Marco | Janela | Sprints | Tema dominante |
|---|---|---|---|
| **M1 — Bootstrap** | 11-05 a 07-06-2026 | 1 + 2 | Destravar 11 bloqueantes IPOG + Schema piloto + llms.txt + Voice Guard 2.0 + Wikidata Q-id |
| **M2 — Pré-pico 2026.2** | 08-06 a 05-07-2026 | 3 + 4 | Primeira leva HBR (6-10 peças) + Wikipedia draft + monitoramento cross-LLM ativo |
| **M3 — Pico 2026.2** | 06-07 a 16-08-2026 | 5 + 6 + 7 | AutoGEO pilot + Reddit autoral + YouTube canal + coleta diária |
| **M4 — Pós-pico calibração** | 17-08 a 27-09-2026 | 8 + 9 + 10 | AgenticGEO escala + recalibração + Wikipedia publish + Q3 fechamento |
| **M5 — Operação contínua** | 28-09 a 08-11-2026 | 11 + 12 + 13 | Onda 3 benchmarking + Wikipedia denso + cohort estabilizado |
| **M6 — Pré-pico 2027.1** | 09-11 a 20-12-2026 | 14 + 15 + 16 | Segunda leva HBR + revisão Schema + dashboard estável + cohort cross-LLM diário |
| **M7 — Pico 2027.1** | 21-12-2026 a 28-02-2027 | 17 + 18 + 19 + 20 | Coleta diária + delta vs 2026.2 + relatório fechamento |
| **M8 — Pós-pico 2027.1** | 01-03-2027 em diante | 21+ | Onda 4 benchmarking + decisão expansão outras áreas IPOG |

---

## 2. Sprint 1 — Bootstrap operacional (11-24/05/2026)

**Tema:** destravar 11 bloqueantes IPOG + bootstrap cadência operacional + iniciar Voice Guard 2.0
**Frameworks aplicados:** F1 (design Voice Guard 2.0) + F3 (estrutura mínima)
**Issues vinculadas:** #38, #39, #40, #6, #36, #4, #20, #21, #22, #35, #41

### Tasks por vetor

#### V1 — GEO técnico
- [ ] Confirmar robots.txt aberto a IA crawlers em ipog.edu.br (#6)
- [ ] Validar llms.txt template antes de publish (`audits/LLMS-TXT-TEMPLATE.md`)
- [ ] Auditoria NAIA full inicial em ipog.edu.br (#43) — baseline KPI 4

#### V2 — Engenharia de citação
- [ ] Coleta cross-LLM dia 1 (issue #5) — baseline pré-Schema
- [ ] Captura espelho pós-Schema agendada para 28-05 em RAG-native

#### V3 — Editorial HBR
- [ ] Voice Guard 2.0 — design dos 9 enriquecimentos (issue #59)
- [ ] Kit prompts V1 fechado (66 prompts × 3 clusters × 7 personas × 4 jornadas)

#### V4 — Autoridade externa
- [ ] Plano de fontes secundárias para sustentar Wikipedia (Estadão Educação, Folha, Quero Bolsa, Educa Mais Brasil)

#### V5 — Moat regional
- [ ] Confirmar lista oficial das 51 cidades CNPJ-próprio (NAIA-310 / #50)
- [ ] Iniciar conversa com 3 CRPs (CRP-09, CRP-03, CRP-18) — NAIA-313 / #53

### DoD Sprint 1
- [ ] Reunião extraordinária IPOG 13-05 realizada com ata em `docs/atas/`
- [ ] Pelo menos 6 dos 11 bloqueantes resolvidos ou com prazo D-Day formal
- [ ] Primeiro relatório semanal entregue à IPOG (#40)
- [ ] Voice Guard 2.0 v0.1 em desenvolvimento
- [ ] Lista 51 cidades confirmada por Bruno

### Métricas alvo final do sprint
- 6+ bloqueantes resolvidos · 1 ata + 2 relatórios semanais publicados · NAIA full executada · cross-LLM baseline coletado

---

## 3. Sprint 2 — Schema piloto + Wikidata + Voice Guard 2.0 (25-05 a 07-06/2026)

**Tema:** entregar Schema piloto em produção + Q-id Wikidata + Voice Guard 2.0 deployed
**Frameworks aplicados:** F1 (Voice Guard 2.0 deploy) + F5 [B] (Wikidata) + F6 (segregação por motor)
**Issues vinculadas:** #2, #3, #30, #36, #58, #59, #46

### Tasks por vetor

#### V1 — GEO técnico
- [ ] Schema piloto canônico em página piloto MBA Online de Psicologia (#3 + #30)
- [ ] llms.txt no ar em ipog.edu.br (#2)
- [ ] Configurar GA4 com referrer/UTM dedicado (#41)

#### V2 — Engenharia de citação
- [ ] Tracking de share-of-voice em LLMs configurado (#46) — First Answer AI ou Trakkr
- [ ] 25 queries-foco rastreadas + 11 entidades concorrentes monitoradas
- [ ] Baseline cross-LLM Fase 1 fechado em todas as RAG-native

#### V3 — Editorial HBR
- [ ] Voice Guard 2.0 deployed — 9 enriquecimentos validados em test peça
- [ ] `content/VOICE-GUIDE.md` atualizado para v2.0
- [ ] Briefing da primeira peça HBR (Decreto 12.456 + IPOG, issue #48)

#### V4 — Autoridade externa
- [ ] Q-id Wikidata IPOG criado com 20+ claims iniciais (P31, P571, P159, P137, P1830, P2196 etc.) — issue #58
- [ ] PR aberto com Estadão Educação + Quero Bolsa para sustentação Wikipedia

#### V5 — Moat regional
- [ ] Mapear concorrentes regionais isolados (NAIA-311 / #51)
- [ ] Template `unidade-regional` Schema validado (NAIA-312 / #52)
- [ ] 3 CRPs com termo de cooperação iniciado

### DoD Sprint 2
- [ ] Schema piloto em produção (#3) com Rich Results Test HTTP 200 sem erros
- [ ] llms.txt vivo em https://ipog.edu.br/llms.txt
- [ ] GA4 audiência LLM-originated criada
- [ ] Wikidata Q-id IPOG vivo com 20+ claims
- [ ] Voice Guard 2.0 v1.0 em produção

### Métricas alvo final do sprint
- Schema Coverage Score baseline → 60+ · llms.txt vivo · Q-id Wikidata vivo · 30 templates página de unidade prontos

---

## 4. Sprint 3 — Primeira leva HBR (08-21/06/2026)

**Tema:** publicar 6-10 peças HBR-grade no padrão F1 + F3 + cross-link com hub IPOG
**Frameworks aplicados:** F3 (estrutura aplicada) + F1 (gate ≥7/9) + F6 (segregação por motor)
**Issues vinculadas:** #7, #31, #44, #48, #45 (substituída por #60), #60, #59 (gate aplicado)

### Tasks por vetor

#### V1 — GEO técnico
- [ ] Cada peça publicada com Schema Article + Person + cross-link mentions
- [ ] Sitemap mestre atualizado + IndexNow ping após cada publish

#### V2 — Engenharia de citação
- [ ] Coleta quinzenal cross-LLM (15-06 e 21-06)
- [ ] Gap map atualizado por persona × cluster

#### V3 — Editorial HBR
- [ ] Peça #1 — "Decreto 12.456 e a janela do MBA Lato Sensu em Psicologia" (#48)
- [ ] Peça #2 — "Captura Cogna -32,2% EAD 1T26: alternativa pós-graduação" (#44)
- [ ] Peça #3 — "Trilha IA em Saúde Mental com Supervisão Clínica Humana" (#60)
- [ ] Peça #4 — "Por que CNPJ-próprio é moat regulatório vs Decreto 12.456" (NAIA-315 / #55)
- [ ] Peça #5-6 — escolher entre persona RH não-psicólogo (NR-1) ou cluster organizacional
- [ ] Voice Guard 2.0 ≥ 7/9 em todas as peças (gate obrigatório)

#### V4 — Autoridade externa
- [ ] Cada peça com 5+ citations + 2+ quotations (F1 enriquecimentos)
- [ ] Submissão das peças para Quero Bolsa, Educa Mais Brasil

#### V5 — Moat regional
- [ ] Calibrar pricing por cidade (NAIA-314 / #54)
- [ ] Caso-modelo Ceará 81 polos como narrativa pública (NAIA-315 / #55)

### DoD Sprint 3
- [ ] 6-10 peças HBR-grade publicadas com Voice Guard 2.0 ≥ 7/9
- [ ] Cada peça com Schema Article validado em Rich Results Test
- [ ] Cross-link bidirecional com hub IPOG e produto MBA Online
- [ ] PR ativo em pelo menos 2 mídias educacionais tier 1

### Métricas alvo final do sprint
- 6-10 peças publicadas · 100% Voice Guard 2.0 ≥ 7/9 · 100% Schema validado · 2+ PR placements

---

## 5. Sprint 4 — Pré-pico 2026.2 + Wikipedia draft (22/06 a 05/07/2026)

**Tema:** preparar pico de captação + draft Wikipedia + monitoramento ativo cross-LLM
**Frameworks aplicados:** F5 [A] (Wikipedia draft) + F6 (calibração por motor) + F1 (continuidade)
**Issues vinculadas:** #19 atualizada, #58, #32

### Tasks por vetor

#### V1 — GEO técnico
- [ ] Auditoria NAIA mensal (1ª recorrente) — KPI 4 atualizado
- [ ] Schema cobertura ampliada para hub completo de pós-graduação

#### V2 — Engenharia de citação
- [ ] Coleta diária cross-LLM iniciada (preparação pico)
- [ ] Drift detection trimestral ativada (R-006 mitigação)

#### V3 — Editorial HBR
- [ ] Peça #7-8 publicadas — calibradas por gap map do Sprint 3
- [ ] Iniciar produção peças do pico (15-06 a 31-07)

#### V4 — Autoridade externa
- [ ] Wikipedia IPOG draft submetido em `landing-page-geo/docs/wikipedia-draft-ipog.wikitext`
- [ ] 8-10 referências de fontes secundárias tier 1 catalogadas
- [ ] PR em mídia educacional ativa

#### V5 — Moat regional
- [ ] Sitemap regional submetido ao GSC com 51 unidades (NAIA-312)
- [ ] Termos de cooperação CRP-09, CRP-03, CRP-18 publicados

### DoD Sprint 4
- [ ] Wikipedia IPOG draft pronto para submit (não publicado ainda)
- [ ] Auditoria NAIA mensal executada
- [ ] Coleta cross-LLM diária operacional
- [ ] 51 unidades com Schema validado

### Métricas alvo final do sprint
- Schema Coverage Score → 75+ · Wikipedia draft 8-10 fontes · CRP cooperações: 3 publicadas · Mention Rate baseline → +5pp

---

## 6. Sprint 5 — Pico 2026.2 + AutoGEO pilot (06-19/07/2026)

**Tema:** pico ativo + AutoGEO em 30 páginas-âncora IPOG + Reddit voz autoral
**Frameworks aplicados:** F2 (AutoGEO) + F5 [C] (Reddit) + F1 contínuo
**Issues vinculadas:** #32, #46

### Tasks por vetor

#### V1 — GEO técnico
- [ ] AutoGEO\_API rodado em 30 páginas-âncora IPOG (cursos prioritários)
- [ ] Snapshot pré-AutoGEO arquivado em `audits/schema-implementations/`
- [ ] Comparação cross-LLM pré/pós-AutoGEO em queries-âncora

#### V2 — Engenharia de citação
- [ ] Coleta diária + dashboard ao vivo (`dashboards/KPI-DASHBOARD.md`)
- [ ] Relatórios semanais Bruno + ata extraordinária se delta ≤ -5%

#### V3 — Editorial HBR
- [ ] Peças do pico (cadência semanal): 2 peças/semana de calibração
- [ ] Voice Guard 2.0 com refinamento (≥ 8/9 enriquecimentos)

#### V4 — Autoridade externa
- [ ] Account Reddit Brasil GEO verificada
- [ ] 6 posts em r/psicologiabr, r/EAD, r/brasil — material original (não copy-paste)
- [ ] Disclosure obrigatório em todos posts (regra 9:1)

#### V5 — Moat regional
- [ ] Prova-de-conceito Frente Regional em Cuiabá e Palmas (vácuo Psi premium)
- [ ] Pricing premium 30-50% acima da média validado em landing local

### DoD Sprint 5
- [ ] AutoGEO uplift ≥ 15% em mention rate cross-LLM medido
- [ ] 6 posts Reddit ativos
- [ ] Cuiabá + Palmas com landing local + schema LocalBusiness validado

### Métricas alvo final do sprint
- AutoGEO uplift +15% · Reddit Brasil mention rate: 6/sprint · Mention Rate cross-LLM → +10pp vs baseline

---

## 7. Sprint 6 — Pico 2026.2 + YouTube canal (20-07 a 02-08/2026)

**Tema:** pico em curva ascendente + YouTube institucional + AutoGEO escala
**Frameworks aplicados:** F2 (AutoGEO escala) + F5 [D] (YouTube)
**Issues vinculadas:** #32

### Tasks por vetor

#### V1 — GEO técnico
- [ ] AutoGEO escalado para 100 páginas IPOG
- [ ] Auditoria NAIA quinzenal (P0/P1)

#### V2 — Engenharia de citação
- [ ] Análise mid-pico — gap map atualizado
- [ ] Calibração de prompts-âncora se drift detectado

#### V3 — Editorial HBR
- [ ] Cadência editorial mantida (2 peças/semana)
- [ ] Sumário executivo do pico em curso

#### V4 — Autoridade externa
- [ ] Canal YouTube IPOG criado com Schema VideoObject canônico
- [ ] 4 vídeos institucionais publicados (1/semana)
- [ ] Transcrições em pt-BR com knowsAbout match
- [ ] Reddit: cadência mantida (3 posts/semana)

#### V5 — Moat regional
- [ ] Salvador, Vitória da Conquista, Feira de Santana — landings locais (mitigação R-018, antes Inspirali expandir Psi)

### DoD Sprint 6
- [ ] YouTube canal vivo com 4 vídeos
- [ ] AutoGEO total: 130 páginas otimizadas
- [ ] Bahia: 3 cidades com landing local

### Métricas alvo final do sprint
- YouTube subscribers: 100+ · AutoGEO uplift cumulativo +20% · Mention Rate → +15pp vs baseline

---

## 8. Sprint 7 — Fim do pico 2026.2 + calibração por motor (03-16/08/2026)

**Tema:** calibração F6 por motor + refinamento Voice Guard 2.0 + relatório fechamento pico
**Frameworks aplicados:** F6 (calibração por motor) + F1 (Voice Guard 2.0 v2.1)
**Issues vinculadas:** #32, #15, #16

### Tasks por vetor

#### V1 — GEO técnico
- [ ] Snapshot quinzenal concorrentes auditado (issues #15, #16)
- [ ] Re-auditoria NAIA full mensal

#### V2 — Engenharia de citação
- [ ] Análise pós-pico: delta KPI 1, 2, 3, 8 vs baseline Fase 1
- [ ] Citation Quality Score por motor calculado
- [ ] Relatório fechamento pico → checkpoint mensal Ronan agosto

#### V3 — Editorial HBR
- [ ] Lições aprendidas peças performantes vs sub-performantes
- [ ] Voice Guard 2.0 v2.1 com calibração por LLM-target

#### V4 — Autoridade externa
- [ ] Wikipedia IPOG submetido (após PR consolidado)
- [ ] Reddit: avaliação de redução de cadência (de 3 para 2/semana se threshold atingido)

#### V5 — Moat regional
- [ ] Auditoria Frente Regional 51 unidades — quantas com Schema completo
- [ ] Pricing tier ajustado com base em conversão observada

### DoD Sprint 7
- [ ] Relatório fechamento pico 2026.2 enviado ao Ronan
- [ ] Wikipedia IPOG verbete submetido (eventual revisão de moderadores)
- [ ] Voice Guard 2.0 v2.1 deployed

### Métricas alvo final do sprint
- Mention Rate +25pp · KPI 8 (Delta pré/pós Schema): ≥ +5pp · Conversion Lift LLM via GA4: meta ≥ 1.3x

---

## 9. Sprint 8 — Pós-pico calibração + AgenticGEO pilot (17-30/08/2026)

**Tema:** AgenticGEO em 100 páginas legacy + Wikipedia ao vivo + R-013 a R-019 mitigação ativa
**Frameworks aplicados:** F4 (AgenticGEO) + F5 [A] (Wikipedia ao vivo)
**Issues vinculadas:** #47 (R-013 a R-016), regional R-017 a R-019

### Tasks por vetor
- V1: AgenticGEO pilot 100 páginas legacy não-prioritárias
- V2: Calibração trimestral cohort cross-LLM (rotina 4.2 do template trimestral)
- V3: Voz autoral Brasil GEO em LinkedIn (peças mensais Alexandre)
- V4: Wikipedia IPOG publicado e indexado · Wikidata sub-orgs vinculadas
- V5: Auditoria Frente Regional pós-pico — quais cidades performaram

### DoD Sprint 8
- [ ] AgenticGEO uplift ≥ 15% nas 100 páginas
- [ ] Wikipedia IPOG ao vivo
- [ ] Risk register expandido com R-013 a R-019 oficialmente

---

## 10. Sprint 9 — Q3 2026 fechamento + Onda 3 benchmarking (31/08 a 13/09/2026)

**Tema:** fechamento Q3 + Onda 3 (plataformas + premium acadêmica)
**Issues vinculadas:** #17, #18, #14

### Tasks
- V1: revisão Schema cross-página (auditoria de coerência)
- V2: dashboard estabilizado com 5 leituras pareadas
- V3: peça mensal HBR mantida
- V4: Reddit + YouTube cadência consolidada
- V5: NAIA-316 (auditoria mention rate Reddit/Bing/Brave) executada

### DoD Sprint 9
- [ ] Q3 fechamento documentado
- [ ] Onda 3 dossiês iniciados (5 plataformas: Voitto, Conexia, Descomplica, Pravaler + 1)

---

## 11. Sprint 10 — Recalibração + Wikipedia denso (14-27/09/2026)

**Tema:** recalibração trimestral + Wikipedia IPOG expandido
**Frameworks aplicados:** F1 v3 + F5 [A] expansão
**Issues vinculadas:** todos os recorrentes

### Tasks
- V1: full-grid prompt sensitivity (recalibração rotina 4.2)
- V2: cohort cross-LLM revisado (versão pinada de cada modelo)
- V3: dicionário de concorrentes atualizado
- V4: Wikipedia IPOG → 150+ linhas (meta intermediária)
- V5: NAIA-317 (Lattes/ORCID docentes) iniciada

### DoD Sprint 10
- [ ] Recalibração trimestral aplicada
- [ ] Wikipedia IPOG ≥ 150 linhas

---

## 12. Sprint 11-13 — Operação contínua + Onda 3 (28/09 a 08/11/2026)

**Tema:** operação estabilizada + Onda 3 dossiês completos + cohort robusto
**Frameworks aplicados:** F2 contínuo + F5 todos
**Issues vinculadas:** #17, monitoramento contínuo

### Tasks recorrentes (cada sprint)
- V1: auditoria NAIA mensal
- V2: coleta cross-LLM quinzenal + dashboard atualizado
- V3: 1-2 peças HBR/sprint
- V4: Wikipedia IPOG → 250+ linhas (meta marco 30-10) · Reddit + YouTube cadência mantida
- V5: 51 unidades em status operacional pleno

### DoD Sprint 13
- [ ] Wikipedia IPOG ≥ 250 linhas (comparável a Anhembi)
- [ ] Onda 3 fechada com 5 dossiês
- [ ] 51 unidades com landing + Schema + CRP cooperação

---

## 13. Sprint 14-16 — Pré-pico 2027.1 + segunda leva HBR (09/11 a 20/12/2026)

**Tema:** preparar pico 2027.1 com lições aprendidas pico 2026.2
**Frameworks aplicados:** F1 + F3 + F4 (AgenticGEO escala)
**Issues vinculadas:** #33 (Q4-W1)

### Tasks por sprint
- Sprint 14: 6-10 peças HBR segunda leva (calibradas com Sprint 3 lições)
- Sprint 15: AgenticGEO escala para 1.000 páginas
- Sprint 16: revisão Schema completo do hub + auditoria pré-pico

### DoD Sprint 16
- [ ] Cohort cross-LLM diário ativado para pico 2027.1
- [ ] Segunda leva 6-10 peças publicadas
- [ ] AgenticGEO total: 1.000+ páginas otimizadas

---

## 14. Sprint 17-20 — Pico 2027.1 (21/12/2026 a 28/02/2027)

**Tema:** pico ativo 2027.1 com cohort estabilizado e Wikipedia denso
**Frameworks aplicados:** todos
**Issues vinculadas:** #34 (Q4-W2)

### Tasks por sprint
- Sprint 17: cobrir cohort cross-LLM diário · 2 peças/semana cadência
- Sprint 18: análise mid-pico · ajuste tático
- Sprint 19: KPIs em curva ascendente · checkpoint Ronan
- Sprint 20: relatório fechamento pico 2027.1 (28-02-2027)

### DoD Sprint 20
- [ ] Pico 2027.1 fechado com KPIs medidos
- [ ] Comparação 2026.2 vs 2027.1 documentada
- [ ] Relatório fechamento → Ronan + Conselho IPOG

---

## 15. Sprint 21+ — Pós-pico 2027.1 + decisão expansão (01/03/2027 em diante)

**Tema:** Onda 4 benchmarking + decisão expansão para outras áreas IPOG
**Issues vinculadas:** #18 + decisão executiva Ronan

### Tasks
- V1: auditoria de regressão Schema · cohort estabilizado
- V2: monitoramento mensal cross-LLM
- V3: cadência editorial reduzida (1 peça/sprint) · foco em peças longas
- V4: Reddit + Wikipedia + YouTube em modo operação
- V5: avaliação de novos estados-foco (expansão Frente Regional)

### Decisão executiva esperada (Q2 2027)
- Expansão para outras áreas IPOG (Q2 2027)
- Programa GEO IPOG como caso-modelo cross-cliente Brasil GEO

---

## 16. Mapa de tasks por vetor (síntese)

| Vetor | Sprints onde domina | Total de tasks programadas |
|---|---|---|
| **V1 GEO técnico** | 1, 2, 5, 6, 8, 14-16 | ~25 tasks |
| **V2 Citação** | 2, 3, 5, 7, 9, 10, 17-20 | ~20 tasks |
| **V3 Editorial HBR** | 3, 4, 5, 6, 14, 17-19 | ~30 tasks (peças individuais) |
| **V4 Autoridade externa** | 2, 4, 7, 8, 10, 11-13 | ~22 tasks |
| **V5 Moat regional** | 1, 2, 5, 6, 9-13, 21+ | ~28 tasks |

Total: **125+ tasks programadas** distribuídas em 22 sprints quinzenais. Cada sprint entrega tasks em ≥ 3 dos 5 vetores.

---

## 17. Mapa Frameworks × Sprint (consolidado)

| Sprint | F1 9 enriquecimentos | F2 AutoGEO | F3 Structural | F4 AgenticGEO | F5 Autoridade | F6 Por motor |
|---|---|---|---|---|---|---|
| 1 | design v0.1 | — | aplicado peças | — | F5[A] plano PR | — |
| 2 | deploy v1.0 | — | continuado | — | F5[B] Q-id Wikidata | calibração inicial |
| 3 | gate ≥7/9 | — | aplicado 6-10 peças | — | F5[A] PR ativo | — |
| 4 | continuado | — | continuado | — | F5[A] draft | calibração |
| 5 | refinamento | pilot 30 páginas | continuado | — | F5[C] Reddit autoral | — |
| 6 | v2.0 | escala 100 páginas | continuado | — | F5[D] YouTube | calibração mid-pico |
| 7 | v2.1 | continuado | continuado | — | F5[A] submit | calibração pós-pico |
| 8 | v2.1 | — | continuado | pilot 100 legacy | F5[A] ao vivo + F5[B] sub-orgs | — |
| 9-10 | v3.0 (recal) | — | continuado | continuado | F5[A] denso | recalibração trimestral |
| 11-13 | continuado | — | continuado | continuado | Wikipedia 250+ | continuado |
| 14-16 | continuado | — | aplicado segunda leva | escala 1000 páginas | continuado | continuado |
| 17-20 | continuado | — | continuado | continuado | Wikipedia 300+ | calibração pico 2027.1 |
| 21+ | manutenção | — | manutenção | manutenção | manutenção | manutenção |

---

## 18. KPIs alvo por marco

| Marco | KPI 1 (Mention Rate) | KPI 4 (Schema Score) | KPI 5 (Wikipedia linhas) | F1 score peças |
|---|---|---|---|---|
| Pré-bootstrap (10-05) | N/D | N/D | 0 (sem verbete) | — |
| Fim Sprint 2 (07-06) | baseline coletado | 60+ | 0 (Q-id criado) | v1.0 deployed |
| Fim Sprint 4 (05-07) | baseline +5pp | 75+ | draft pronto | ≥7/9 |
| Fim Sprint 7 (16-08, fim pico 2026.2) | baseline +25pp | 92 | submitted | ≥8/9 |
| Fim Sprint 10 (27-09, recalibração) | baseline +30pp | 95 | 150+ | v3.0 |
| Fim Sprint 13 (08-11) | baseline +35pp | 95 | 250+ | mantido |
| Fim Sprint 16 (20-12, pré-pico 2027.1) | baseline +35pp | 95 | 280+ | mantido |
| Fim Sprint 20 (28-02-2027, fim pico 2027.1) | baseline +50pp | 97 | 300+ | mantido |

---

## 19. Cross-links

- `ROADMAP.md` — fases (visão cliente)
- `docs/ROADMAP_2026Q2-Q4.md` — masterplan CTO (visão cross-repo)
- `docs/06-marcos-criticos-2026.md` — calendário consolidado
- `docs/CONTEXTO-AMPLIADO-2026-05-10.md` — 5 vetores e 3 horizontes
- `docs/GEO-FRAMEWORK-CANONICO.md` — 6 frameworks F1-F6 com papers-âncora
- `docs/ontologia/ONTOLOGIA-CANONICA.md` — entidades canônicas
- `audits/benchmarking/PAPERS-2025-2026-PROFUNDIDADE.md` — 77 papers sustentação
- `dashboards/KPI-DASHBOARD.md` — métricas ao vivo
- `STATUS.md` — snapshot semanal
