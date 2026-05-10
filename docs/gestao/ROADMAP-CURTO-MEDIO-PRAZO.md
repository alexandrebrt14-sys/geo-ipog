# Roadmap Curto e Médio Prazo — Programa GEO IPOG

> **Status:** vigente desde 2026-05-10
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Cadência de revisão:** semanal (fim de sprint) para curto · mensal (checkpoint Ronan) para médio

Síntese executiva do roadmap em 2 horizontes operacionais. Para o detalhamento completo dos 22 sprints, ver `docs/ROADMAP-SPRINTS-2026-2027.md`. Para o detalhamento dos 4 fases (visão cliente), ver `ROADMAP.md`.

A lógica é prescritiva: roadmap sem horizonte fixo vira lista de desejo. Cada bloco abaixo tem janela exata, decisões/marcos e KPIs alvo.

---

## 1. Curto prazo — 30 dias (Sprint 1-2, 11-05 a 07-06-2026)

### 1.1 Objetivos do horizonte curto

1. **Destravar 11 bloqueantes IPOG** na reunião extraordinária 13-05 com Ronan Maia presente
2. **Schema piloto canônico** em produção em ipog.edu.br até 30-05
3. **llms.txt** no ar em ipog.edu.br até 30-05
4. **Voice Guard 2.0 v1.0** deployed com 9 enriquecimentos GEO até 17-05
5. **Q-id Wikidata IPOG** criado com 20+ claims até 17-05
6. **Baseline cross-LLM** Fase 1 fechado em 30-05 (todas as 6 LLMs do cohort)
7. **Cadência operacional consolidada:** primeira ata + primeiro relatório semanal + cadência terça 10h00 confirmada

### 1.2 Decisões críticas para Bruno (curto prazo)

| Item | Prazo | Bloqueia |
|---|---|---|
| (D-07) Aprovar robots.txt aberto a IA crawlers | 14-05 | Auditoria NAIA + crawl LLMs |
| (R-009) Configurar GA4 com referrer/UTM dedicado de LLM | 25-05 | KPI 7 (Conversion Lift) |
| (D-06) Conceder acessos GSC + GA4 IPOG | 25-05 | Squad Schema |
| (D-08) Confirmar 24 cidades médias estratégicas | 17-05 | Squad Regional |
| (D-09) Confirmar 10 áreas acadêmicas IPOG | 17-05 | Squad Editorial |
| (NAIA-310) Confirmar lista oficial das 51 cidades | 30-05 | Squad Regional bloqueado |

### 1.3 Decisões críticas para Ronan (curto prazo)

| Item | Prazo | Bloqueia |
|---|---|---|
| (R-001) Definir naming MBA + 3-5 produtos prioritários | **15-05** (gatilho dispara) | KPI 1, 2, 4, 8; Schema piloto |
| (D-05) Aprovar escopo Frente Regional 51 cidades | 30-05 | Tranche 0 + Squad Regional |
| (D-10) Pré-aprovar Tranche 0 Regional R$ 380-450k | 30-05 | Operação física |

### 1.4 Marcos críticos próximos 30 dias

| Data | Marco | Owner |
|---|---|---|
| 11-05 | Apresentação semanal W19 09h00 | Alexandre + Bruno |
| 13-05 | Reunião extraordinária Ronan + Bruno | Alexandre + Bruno + Ronan |
| 14-05 | Primeira coleta cross-LLM | Alexandre |
| 15-05 | Auditoria NAIA full inicial + decisão produto IPOG | Alexandre + Ronan |
| 17-05 | Voice Guard 2.0 v1.0 deployed + Wikidata Q-id | Alexandre |
| 20-05 | Kit prompts V1 fechado | Alexandre |
| 22-05 | Captura cross-LLM espelho | Alexandre |
| 25-05 | GA4 referrer/UTM operacional | Bruno |
| 30-05 | Schema piloto em produção + llms.txt no ar + Fase 1 fechada | Alexandre + Bruno |
| 01-06 | Sprint 2 fechado, Sprint 3 abre (primeira leva HBR) | Alexandre |
| 07-06 | Sprint 3 mid-point | Alexandre |

### 1.5 KPIs alvo final do horizonte curto (07-06)

- KPI 1 baseline coletado em ≥ 5 dos 6 LLMs do cohort
- KPI 4 (Schema Coverage Score) ≥ 60
- KPI 5 (fontes externas) ≥ 1 (Quero Bolsa ou Estadão)
- Voice Guard 2.0 score peças ≥ 7/9
- Q-id Wikidata IPOG criado com 20+ claims
- 6/11 bloqueantes IPOG destravados

---

## 2. Médio prazo — pico GEO 2026.2 (08-06 a 31-07-2026, Sprint 3-7)

### 2.1 Objetivos do horizonte médio

1. **Primeira leva HBR** (6-10 peças) publicadas até 15-06 com Voice Guard 2.0 ≥ 7/9
2. **Schema cobertura ampliada** para hub completo de pós + 51 unidades regionais
3. **Wikipedia IPOG submetido** até fim de Sprint 7 (16-08, ~5 dias antes do pico fechar)
4. **Reddit Brasil voz autoral** ativa: 3 posts/semana em r/psicologiabr, r/EAD, r/brasil
5. **YouTube canal institucional** vivo com 4 vídeos Sprint 6 (ago)
6. **AutoGEO pilot** em 30 páginas-âncora Sprint 5 + escala 100 páginas Sprint 6
7. **Coleta diária cross-LLM** ativada Sprint 5 + dashboard ao vivo
8. **51 unidades regionais com Schema válido:** ≥ 30 até pico 2026.2

### 2.2 Marcos críticos médio prazo

| Sprint | Janela | Marco principal |
|---|---|---|
| Sprint 3 | 08-21/06 | 6-10 peças HBR publicadas; PR mídia tier 1 ativa |
| Sprint 4 | 22/06-05/07 | Wikipedia draft pronto; auditoria NAIA mensal recorrente; coleta diária cross-LLM |
| Sprint 5 | 06-19/07 | AutoGEO pilot 30 páginas; Reddit Brasil 6 posts; Cuiabá+Palmas landings |
| Sprint 6 | 20/07-02/08 | YouTube canal vivo (4 vídeos); AutoGEO escala 100 páginas; Bahia 3 cidades |
| Sprint 7 | 03-16/08 | Wikipedia submetido; Voice Guard 2.0 v2.1; relatório fechamento pico → Ronan |

### 2.3 KPIs alvo final do horizonte médio (31-07-2026)

- **KPI 1 (Mention Rate):** baseline +25 pp (mediana cohort)
- **KPI 2 (Share-of-Voice):** ≥ 12% Organizacional, ≥ 18% Clínica, ≥ 10% Psicopedagogia
- **KPI 3 (Citation Quality):** ≥ 75
- **KPI 4 (Schema Coverage):** ≥ 92
- **KPI 5 (fontes externas):** ≥ 4
- **KPI 7 (Conversion Lift):** ≥ 1,3x em ≥ 2 LLMs
- **KPI 8 (Delta pré/pós):** ≥ +5 pp
- **YouTube subscribers:** 100+
- **Reddit mention rate Brasil:** ≥ 5/mês
- **Wikipedia status:** submetido
- **Wikidata claims:** 30+
- **51 unidades com Schema:** 30+

### 2.4 Resultado de receita esperado (médio prazo)

Modelo base (meta pico 2026.2): mention rate +25 pp → 2.000 sessões LLM/mês × 0,8% conversão × R$ 12k LTV = **R$ 192k/mês de receita adicional atribuída a GEO** (depende GA4 R-009 ativo).

---

## 3. Médio prazo estendido — Q3 + Q4 2026 (Sprint 8-16)

### 3.1 Q3 2026 — Pós-pico calibração + Operação contínua (17-08 a 27-09)

**Objetivos:**

- AgenticGEO pilot em 100 páginas legacy IPOG (Sprint 8)
- Wikipedia IPOG ao vivo (Sprint 8)
- Risk register oficial expandido com R-013 a R-019 (Sprint 8)
- Recalibração trimestral aplicada (Sprint 10)
- Wikipedia IPOG ≥ 150 linhas (Sprint 10)
- Onda 3 dossiês iniciados (Sprint 9 — plataformas + premium acadêmica)

### 3.2 Q4 2026 — Operação contínua + Pré-pico 2027.1 (28-09 a 20-12)

**Objetivos:**

- Wikipedia IPOG ≥ 250 linhas (30-10, comparável a Anhembi)
- Onda 3 fechada com 5 dossiês (Sprint 13)
- 51 unidades em status operacional pleno (Sprint 13)
- Segunda leva HBR (6-10 peças) Sprint 14
- AgenticGEO escalado para 1.000+ páginas (Sprint 15)
- Cohort cross-LLM diário ativado para pico 2027.1 (Sprint 16)

### 3.3 KPIs alvo Q4 2026 (31-12)

- **KPI 1:** baseline +35 pp
- **KPI 4:** ≥ 95
- **Wikipedia IPOG:** ≥ 250 linhas
- **51 unidades operacionais:** 45+

---

## 4. Médio prazo — pico GEO 2027.1 (21-12-2026 a 28-02-2027, Sprint 17-20)

### 4.1 Objetivos do pico 2027.1

- Coleta diária cross-LLM com cohort estabilizado
- 2 peças HBR/semana de calibração
- Comparação delta 2026.2 vs 2027.1 documentada
- Relatório fechamento → Ronan + Conselho IPOG (28-02)

### 4.2 KPIs alvo final pico 2027.1 (15-02-2027)

- **KPI 1:** baseline +50 pp
- **KPI 2 Organizacional:** ≥ 18%
- **KPI 2 Clínica:** ≥ 25%
- **KPI 2 Psicopedagogia:** ≥ 15%
- **KPI 3:** ≥ 82
- **KPI 4:** ≥ 97
- **KPI 5:** ≥ 8 fontes
- **KPI 6:** ≤ 3 dias úteis
- **KPI 7:** ≥ 1,5x em ≥ 3 LLMs
- **Wikipedia IPOG:** 300+ linhas
- **YouTube:** ≥ 1.000 subscribers
- **51 unidades operacionais:** 51 (todas)
- **Brand search volume IPOG (Google Trends):** +30% YoY

### 4.3 Resultado de receita esperado (pico 2027.1)

Modelo otimista: mention rate +50 pp → 5.000 sessões LLM/mês × 1,2% conversão × R$ 12k LTV = **R$ 720k/mês de receita adicional atribuída a GEO** (cumulativo desde pico 2026.2).

---

## 5. Resumo executivo — visão de uma página

| Horizonte | Janela | Objetivo central | Mention Rate alvo | Schema Score alvo |
|---|---|---|---|---|
| Curto (30d) | 11-05 a 07-06 | Bootstrap + 11 bloqueantes destravados + Schema piloto + llms.txt | baseline coletado | 60+ |
| Médio (90d) | 08-06 a 31-07 | Pico 2026.2 + Wikipedia submetido + 30+ unidades regionais | baseline +25 pp | 92 |
| Médio estendido (180d) | 17-08 a 31-12 | Wikipedia denso + 51 unidades + segunda leva HBR + AgenticGEO 1.000 páginas | baseline +35 pp | 95 |
| Médio extra (270d) | 21-12 a 15-02-2027 | **Pico 2027.1: IPOG #1 em LLMs no segmento MBA Online de Psicologia** | **baseline +50 pp** | 97 |

---

## 6. Cross-links

- `docs/ROADMAP-SPRINTS-2026-2027.md` — 22 sprints detalhados
- `docs/06-marcos-criticos-2026.md` — calendário consolidado com gatilhos
- `docs/gestao/RESULTADOS-PRETENDIDOS.md` — KPIs por marco com modelo de receita
- `STATUS.md` — snapshot semanal vivo
- `docs/relatorios-semanais/2026-W19-04-a-10-maio.md` — primeiro relatório semanal canônico
