# Roadmap CTO 2026 Q2/Q3/Q4 — geo-ipog

> **Status:** vigente desde 2026-05-10 (criado durante healthcheck para fechar gap)
> **Origem:** masterplan dos 15 repositórios da Brasil GEO publicado em `landing-page-geo/.cto/review-2026-05-04-masterplan-15-repos.md`
> **Tracking issue:** [#28](https://github.com/alexandrebrt14-sys/geo-ipog/issues/28)
> **Cadência de revisão:** trimestral (próxima 2026-08-01)

Este documento consolida a leitura do **masterplan CTO** sobre o repositório `geo-ipog` em uma estrutura de ondas trimestrais (Q2/Q3/Q4 2026) com horas estimadas, critical path e dependências cross-repo.

A relação com o `ROADMAP.md` (sistema de Fases 1-4) é de complementaridade: as **Fases** organizam o programa GEO IPOG na visão do cliente; as **Ondas Quarter** organizam o esforço de engenharia da Brasil GEO na visão cross-repo. Ambas convergem nas mesmas issues e nos mesmos marcos.

A lógica é prescritiva: onda sem horas estimadas não vai para o board. Critical path sem dependência declarada é compromisso vago.

---

## Reconciliação com ROADMAP.md

| Onda CTO | Período | Equivalência Fase | Milestone GitHub |
|---|---|---|---|
| **Q2-W4** | 06-05 a 20-05 | Fase 1 (semanas 2-3) | [Fase 1 — Baseline + Schema piloto](https://github.com/alexandrebrt14-sys/geo-ipog/milestone/1) |
| **Q2-W5** | 20-05 a 30-05 | Fase 1 (semana 4) | [Fase 1 — Baseline + Schema piloto](https://github.com/alexandrebrt14-sys/geo-ipog/milestone/1) |
| **Q2-W8** | 02-06 a 15-06 | Fase 2 (toda) | [Fase 2 — Primeira leva HBR](https://github.com/alexandrebrt14-sys/geo-ipog/milestone/4) |
| **Q2-W10** | 15-06 a 31-07 | Fase 3 (toda) | [Fase 3 — Pico GEO captação 2026.2](https://github.com/alexandrebrt14-sys/geo-ipog/milestone/2) |
| **Q4-W1** | 01-11 a 30-11 | Fase 4 (parte 1) | [Fase 4 — Operação contínua + pré-pico 2027.1](https://github.com/alexandrebrt14-sys/geo-ipog/milestone/3) |
| **Q4-W2** | 01-12 a 15-02-2027 | Fase 4 (pré-pico 2027.1) | [Fase 4 — Operação contínua + pré-pico 2027.1](https://github.com/alexandrebrt14-sys/geo-ipog/milestone/3) |

**Q3 2026 sem ondas dedicadas no masterplan CTO** — a janela ago-out 2026 fica coberta pelo `Operação contínua` da Fase 4 (cohort estabilizado, dashboard ao vivo, recheck mensal, recalibração trimestral).

---

## Categorização cross-repo

- **Categoria interna (CTO masterplan):** cliente-piloto-premium
- **Criticidade:** alta
- **Deadline principal Q2:** 2026-05-30 (Schema live para captação 2026.2 a partir de 15-06)
- **Próxima revisão CTO:** 2026-08-01

---

## Q2 2026

### Q2-W4 — Kit 50 prompts + auditoria técnica baseline

- **Janela:** 06-05 a 20-05-2026
- **Esforço estimado:** 30h
- **Critical path:** Sim
- **Pré-requisitos:** D-05 (Frente Regional) + D-06 (acessos GSC/GA4)
- **Issue:** [#29](https://github.com/alexandrebrt14-sys/geo-ipog/issues/29)
- **Equivalência ROADMAP.md:** Fase 1 — diagnóstico baseline + engenharia de citação
- **Saída esperada:** kit prompts V1 fechado (66 prompts × 3 clusters × 7 personas × 4 jornadas) + auditoria NAIA full em ipog.edu.br
- **Gates obrigatórios:** voice-guard, schema-jsonld
- **Observabilidade:** Mention rate em ChatGPT/Claude/Gemini/Perplexity por persona

### Q2-W5 — Schema Course + EducationalOccupationalProgram validado

- **Janela:** 20-05 a 30-05-2026
- **Esforço estimado:** 24h
- **Critical path:** Sim
- **Pré-requisitos:** Q2-W4 fechado + decisão produto IPOG (R-001)
- **Issue:** [#30](https://github.com/alexandrebrt14-sys/geo-ipog/issues/30)
- **Equivalência ROADMAP.md:** Fase 1 — implementação Schema piloto + llms.txt
- **Saída esperada:** Schema canônico em página piloto MBA Online de Psicologia validado em Rich Results Test + Schema.org Validator + llms.txt no ar em ipog.edu.br
- **Gates obrigatórios:** voice-guard, schema-jsonld
- **Observabilidade:** Schema Coverage Score (NAIA) em ipog.edu.br

### Q2-W8 — Primeira leva 6-10 peças HBR via curso-factory

- **Janela:** 02-06 a 15-06-2026
- **Esforço estimado:** 40h
- **Critical path:** Não
- **Pré-requisitos:** Q2-W5 fechado + Voice Guard configurado
- **Issue:** [#31](https://github.com/alexandrebrt14-sys/geo-ipog/issues/31)
- **Equivalência ROADMAP.md:** Fase 2 — primeira leva HBR
- **Saída esperada:** 6 a 10 peças HBR-grade publicadas com cross-link para hub `ipog.edu.br/cursos/pos-graduacao` e produto MBA Online de Psicologia
- **Gates obrigatórios:** voice-guard, schema-jsonld
- **Observabilidade:** Voice Guard score por peça, Schema Article + Person validado

### Q2-W10 — Monitoramento diário pico captação 2026.2

- **Janela:** 15-06 a 31-07-2026
- **Esforço estimado:** 60h
- **Critical path:** Não
- **Pré-requisitos:** Q2-W8 fechado + dashboard KPI ao vivo
- **Issue:** [#32](https://github.com/alexandrebrt14-sys/geo-ipog/issues/32)
- **Equivalência ROADMAP.md:** Fase 3 — pico GEO captação 2026.2
- **Saída esperada:** coleta cross-LLM diária + dashboard KPI atualizado quinzenalmente + relatórios semanais consistentes + checkpoint mensal com Ronan
- **Gates obrigatórios:** voice-guard, schema-jsonld
- **Observabilidade:** todos os 8 KPIs canônicos (`dashboards/METRICAS-CANONICAS.md`)

---

## Q3 2026

**Sem ondas dedicadas no masterplan CTO.**

A janela ago-out 2026 é coberta por:

- Operação contínua da Fase 4 do `ROADMAP.md` (cohort cross-LLM, dashboard ao vivo, recalibração mensal)
- Issues recorrentes do milestone `Operação contínua` (#11, #12, #13, #15, #16)
- Marcos pontuais em `docs/06-marcos-criticos-2026.md` (Wikipedia expandido até 30-10, Onda 3 benchmarking até 30-11, fechamento Q3 30-09)

---

## Q4 2026

### Q4-W1 — Onda 2 conteúdo HBR + revisão Schema

- **Janela:** 01-11 a 30-11-2026
- **Esforço estimado:** 40h
- **Critical path:** Sim (pico 2027.1 começa 01-12)
- **Pré-requisitos:** lições aprendidas pico 2026.2 incorporadas + auditoria Schema mensal estabilizada
- **Issue:** [#33](https://github.com/alexandrebrt14-sys/geo-ipog/issues/33)
- **Equivalência ROADMAP.md:** Fase 4 (parte 1) — operação contínua + pré-pico 2027.1
- **Saída esperada:** segunda leva 6-10 peças HBR + revisão completa Schema do hub + integração Onda 3 do benchmarking
- **Gates obrigatórios:** voice-guard, schema-jsonld
- **Observabilidade:** delta KPIs vs pico 2026.2, calibração de prompts

### Q4-W2 — Pico captação 2027.1 + monitoramento diário

- **Janela:** 01-12-2026 a 15-02-2027
- **Esforço estimado:** 80h
- **Critical path:** Sim
- **Pré-requisitos:** Q4-W1 fechado + dashboard KPI estável
- **Issue:** [#34](https://github.com/alexandrebrt14-sys/geo-ipog/issues/34)
- **Equivalência ROADMAP.md:** Fase 4 (pré-pico 2027.1)
- **Saída esperada:** coleta cross-LLM diária com cohort estabilizado + dashboard ao vivo + relatório de fechamento de pico em 28-02-2027
- **Gates obrigatórios:** voice-guard, schema-jsonld
- **Observabilidade:** todos os 8 KPIs + Conversion Lift por canal LLM (KPI 7 ativo)

---

## Decisões pendentes (CTO masterplan)

| ID | Tema | Categoria | Owner | Issue | Deadline |
|---|---|---|---|---|---|
| D-04 | Naming MBA Online de Psicologia + 3-5 produtos prioritários | Produto | Ronan + Bruno | [#4](https://github.com/alexandrebrt14-sys/geo-ipog/issues/4) | 15-05-2026 |
| D-05 | Escopo Frente Regional 51 cidades CNPJ-próprio | Estratégico | Ronan | [#35](https://github.com/alexandrebrt14-sys/geo-ipog/issues/35) | 30-05-2026 |
| D-06 | Acesso GSC + GA4 IPOG | Operacional | Bruno | [#36](https://github.com/alexandrebrt14-sys/geo-ipog/issues/36) | 25-05-2026 |
| D-07 | Robots.txt aberto a IA crawlers em ipog.edu.br | Técnico | Bruno | [#6](https://github.com/alexandrebrt14-sys/geo-ipog/issues/6) | 14-05-2026 |
| D-08 | Confirmação 24 cidades médias estratégicas | Estratégico | Bruno | [#20](https://github.com/alexandrebrt14-sys/geo-ipog/issues/20) | 17-05-2026 |
| D-09 | Confirmação 10 áreas acadêmicas IPOG | Operacional | Bruno | [#21](https://github.com/alexandrebrt14-sys/geo-ipog/issues/21) | 17-05-2026 |
| D-10 | Pré-aprovação Tranche 0 Regional R$ 380-450k | Financeiro | Ronan | [#22](https://github.com/alexandrebrt14-sys/geo-ipog/issues/22) | 30-05-2026 |

---

## Gates obrigatórios (cross-onda)

Aplicáveis a toda onda do `geo-ipog` antes do merge:

- **voice-guard** — Voice Guard score ≥ 70/100 em conteúdo Alexandre (`content/VOICE-GUIDE.md`)
- **schema-jsonld** — JSON-LD validado em Google Rich Results Test + Schema.org Validator
- **markdown-lint** — `.markdownlint.json` aplicado via workflow `quality.yml`
- **secret-scan** — checagem antes de cada push
- **finops-budget** — máximo 2 pushes/dia em `landing-page-geo` (afeta cross-link)

---

## Observabilidade

- **Mention rate** em ChatGPT/Claude/Gemini/Perplexity/Grok/Copilot por persona e por cluster
- **Funil captação 2026.2** (15-06 a 31-07) — dados GA4 com referrer/UTM dedicado
- **Funil captação 2027.1** (01-12 a 15-02-2027) — comparação cohort 2026.2 vs 2027.1
- **Schema Coverage Score** (NAIA) em ipog.edu.br
- **Voice Guard score** por peça publicada
- **Custo LLM por leitura** (`dashboards/FINOPS-DISCIPLINA.md`)

---

## Cross-links

- `ROADMAP.md` — fases do programa (visão cliente)
- `docs/06-marcos-criticos-2026.md` — calendário consolidado com gatilhos
- `docs/05-risk-register.md` — 12 riscos catalogados
- `dashboards/KPI-DASHBOARD.md` — métricas ao vivo
- `STATUS.md` — snapshot semanal
- `docs/HEALTHCHECK-2026-05-10.md` — auditoria estrutural
- Masterplan completo (cross-repo): `landing-page-geo/.cto/review-2026-05-04-masterplan-15-repos.md`
- Tracking issue: [#28](https://github.com/alexandrebrt14-sys/geo-ipog/issues/28)
- GitHub Milestones: <https://github.com/alexandrebrt14-sys/geo-ipog/milestones>
