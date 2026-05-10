# Skills Matrix — Programa GEO IPOG

> **Status:** vigente desde 2026-05-10
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Cadência:** quinzenal (atualizar cobertura) + trimestral (revisar gaps)

Matriz formal Skill × Pessoa × Cobertura para identificar gaps, single points of failure e oportunidades de mentoring/transferência. Cobertura na escala 0-10 (0 = nenhum conhecimento; 10 = expert capaz de operar sem supervisão).

A lógica é prescritiva: cobertura sub-ótima vira gargalo de delivery. Single point of failure (cobertura única) é risco operacional.

---

## 1. Matriz consolidada

| Skill | Alexandre | Bruno | Sub-agent Opus | Sub-agent Haiku | Orchestrator 5 LLMs | NAIA | Voice Guard 2.0 | Cobertura mínima target |
|---|---|---|---|---|---|---|---|---|
| **V1 Schema.org JSON-LD avançado** | 10 | 4 | 8 | — | — | — | — | 8/10 |
| **V1 llms.txt + robots.txt + sitemap** | 9 | 3 | 7 | — | — | — | — | 7/10 |
| **V1 NAIA platform (auditoria 100+ checks)** | 8 | 5 | — | — | — | 10 | — | 8/10 |
| **V1 Wikidata claims editing** | 8 | 3 | 7 | — | — | — | — | 7/10 |
| **V2 Cross-LLM coleta com cohort fixo** | 10 | 4 | 8 | — | 10 | — | — | 8/10 |
| **V2 Engenharia de prompt-âncora** | 10 | 5 | 9 | — | 9 | — | — | 8/10 |
| **V2 Gap mapping por alavanca dominante** | 9 | 6 | 9 | — | — | — | — | 8/10 |
| **V2 AutoGEO API integration** | 7 | 2 | 8 | — | — | — | — | 7/10 |
| **V2 Tracking SoV (First Answer / Trakkr)** | 8 | 4 | — | — | — | — | — | 7/10 |
| **V3 Padrão editorial HBR-grade** | 10 | 5 | 10 | — | — | — | — | 9/10 |
| **V3 Voice Guard 2.0 (9 enriquecimentos)** | 9 | 3 | 8 | — | — | — | 10 | 9/10 |
| **V3 Bloom 3+ andragogia** | 10 | 6 | 9 | — | — | — | — | 8/10 |
| **V3 Compliance MEC + CFP** | 7 | 6 | 6 | — | — | — | — | 8/10 (gap) |
| **V3 Sub-agent Opus orchestration** | 10 | 2 | — | — | — | — | — | 8/10 |
| **V3 Glossário Psicologia + termos canônicos** | 9 | 7 | 9 | — | — | — | — | 9/10 |
| **V4 Wikipedia pt-br editing** | 8 | 4 | 7 | — | — | — | — | 8/10 |
| **V4 Reddit Brasil engagement** | 8 | 3 | 6 | — | — | — | — | 7/10 |
| **V4 YouTube institucional** | 7 | 5 | — | — | — | — | — | 7/10 |
| **V4 PR mídia educacional tier 1** | 6 | 8 | — | — | — | — | — | 8/10 |
| **V4 CRPs estaduais (relacionamento)** | 5 | 5 | — | — | — | — | — | 8/10 (gap) |
| **V4 Lattes/ORCID engineering corpo docente** | 8 | 5 | — | — | — | — | — | 8/10 |
| **V5 Mapeamento cidades médias** | 8 | 7 | — | — | 8 | — | — | 8/10 |
| **V5 Schema LocalBusiness 51 unidades** | 9 | 5 | 8 | — | — | — | — | 8/10 |
| **V5 Pricing tier por cidade** | 7 | 8 | — | — | — | — | — | 8/10 |
| **V5 Compliance regional CEEs** | 5 | 6 | — | — | — | — | — | 8/10 (gap) |
| **V5 Operação multicampus 51 CNPJs** | 5 | 9 | — | — | — | — | — | 8/10 |
| **QA Markdown lint + link check** | 10 | 5 | 9 | 9 | — | — | — | 8/10 |
| **QA Schema validation cross-tool** | 10 | 4 | 8 | — | — | — | — | 8/10 |
| **QA Voice Guard automation** | 9 | 3 | 7 | — | — | — | 10 | 8/10 |
| **QA KPI dashboard maintenance** | 10 | 6 | — | — | — | — | — | 8/10 |
| **QA Concorrentes monitoring workflow** | 8 | 4 | 6 | — | — | — | — | 7/10 |
| **GOV Atas + relatórios** | 10 | 6 | 7 | — | — | — | — | 9/10 |
| **GOV Risk register management** | 10 | 7 | — | — | — | — | — | 9/10 |
| **GOV Milestones + project board #6** | 10 | 6 | — | — | — | — | — | 8/10 |
| **GOV Healthcheck quinzenal estrutural** | 10 | 4 | 8 | — | — | — | — | 8/10 |
| **GOV Stakeholder management cliente** | 8 | 8 | — | — | — | — | — | 8/10 |

---

## 2. Single Points of Failure (cobertura única ≥ 9 com backup ≤ 5)

| Skill | Único | Backup atual | Risco | Plano de transferência |
|---|---|---|---|---|
| **V3 Sub-agent Opus orchestration** | Alexandre (10) | Bruno (2) — não opera | Alto | Documentar pipeline em `docs/framework/03-pipeline-5-llms.md` (já feito) + skill `architect` |
| **V3 Voice Guard 2.0 deploy** | Alexandre (9) | Bruno (3) | Alto | Issue #59 + open-source `voice_guard.py` com testes |
| **GOV Atas + relatórios** | Alexandre (10) | Bruno (6) | Médio | Bruno faz draft + Alexandre revisa por 4 semanas |
| **V1 Schema.org JSON-LD avançado** | Alexandre (10) | Bruno (4) | Alto | `docs/ontologia/SCHEMA-IPOG-CANONICAL.md` (feito 10-05); Bruno aprende via Schema.org Validator + Rich Results Test |
| **V2 Cross-LLM coleta** | Alexandre (10) | Bruno (4) | Médio | `dashboards/RUNBOOK-COLETA-LLM.md` operacional (feito) |

---

## 3. Gaps de competência (cobertura mínima target não atingida)

| Skill | Cobertura atual | Target | Gap | Plano |
|---|---|---|---|---|
| **V3 Compliance MEC + CFP** | Alexandre 7 / Bruno 6 | 8/10 | dependência jurídico IPOG | Workshop interno IPOG; checklist canônico em `content/CHECKLIST-PUBLICACAO.md` |
| **V4 CRPs estaduais (relacionamento)** | Alexandre 5 / Bruno 5 | 8/10 | sem owner forte | Issue #53 (NAIA-313) — Bruno assume lead; Alexandre apoia tecnicamente |
| **V5 Compliance regional CEEs** | Alexandre 5 / Bruno 6 | 8/10 | sem owner forte | Bruno + jurídico IPOG; mapear em `audits/regional/compliance-cees-{estado}.md` |
| **V4 PR mídia educacional tier 1** | Alexandre 6 / Bruno 8 | 8/10 | OK pelo Bruno; backup fraco | Alexandre escreve peças + Bruno opera relacionamento |

---

## 4. Skills emergentes (próximos 90 dias)

Skills que vão entrar no programa entre Sprint 1 e Sprint 6 e precisam ser desenvolvidos:

- **F1 Voice Guard 2.0 — 9 enriquecimentos GEO** (issue #59) — owner Alexandre; backup `voice_guard.py` automatizado
- **F2 AutoGEO API integration via Hugging Face** (Sprint 5+) — owner Alexandre; sub-agent Opus pode rodar pipeline
- **F4 AgenticGEO MAP-Elites** (Sprint 8+) — owner Alexandre; documentar antes de aplicar
- **F5 Wikidata Q-id maintenance** (issue #58) — owner Alexandre; Bruno aprende via mensal review
- **F5 YouTube canal institucional** (Sprint 6) — owner Alexandre + freelancer audiovisual a contratar
- **F6 Brand search volume tracking (Google Trends API)** (Sprint 7+) — owner Alexandre; dashboard quinzenal

---

## 5. Capacidade declarada vs demanda (40 horas/semana base Alexandre)

| Squad | Demanda semanal pré-pico | Demanda semanal durante pico | Capacidade Alexandre | Backup necessário |
|---|---|---|---|---|
| Schema | 8h | 12h | 10h | — |
| Citação | 6h | 12h | 8h | sub-agent Opus (KPI 1 collection) |
| Editorial | 14h | 20h | 12h | 2-3 sub-agents Opus paralelos |
| Autoridade | 6h | 10h | 6h | freelancer audiovisual (YouTube) + Bruno (PR) |
| Regional | 4h | 6h | 4h | Bruno (8h) |
| QA & Observability | 4h | 6h | 4h | sub-agent Haiku (Markdown lint) |
| Governança | 4h | 6h | 6h | Bruno (2h) |
| **Total Alexandre** | **46h** | **72h** | **50h máx** | **18h cobertas por sub-agents/Bruno** |

Conclusão: durante pico 2026.2 (Sprint 5-7), Alexandre opera no limite. Mitigação: sub-agents Opus em paralelo + Bruno cobrir Squad Regional + Governança parcial.

---

## 6. Plano de evolução de skills (médio prazo)

| Skill | Hoje | Q3 2026 | Q1 2027 |
|---|---|---|---|
| Voice Guard 2.0 (Alexandre) | v0 design | v1.0 deployed | v3.0 com cohort calibrado |
| AutoGEO integration | desconhecido | pilot 30 páginas | escala 1.000 páginas |
| Wikipedia editing (Alexandre) | 8 | 9 (com verbete IPOG ao vivo) | 9 |
| Reddit Brasil voz autoral | 8 | 9 | 9 |
| YouTube canal | desconhecido | canal vivo + 12 vídeos | 1.000+ subscribers |
| CRPs estaduais (Bruno) | 5 | 7 (3 termos cooperação) | 8 (5+ termos) |
| Compliance MEC + CFP (Bruno) | 6 | 8 | 9 |

---

## 7. Cross-links

- `docs/gestao/SQUADS-E-SKILLS.md` — composição de squads que aplicam estes skills
- `docs/gestao/DEFINITION-OF-DONE-CANONICO.md` — DoD por tipo de artefato (skills aplicados)
- `docs/GEO-FRAMEWORK-CANONICO.md` — frameworks F1-F6 que demandam skills emergentes
- `docs/ROADMAP-SPRINTS-2026-2027.md` — sprint quando cada skill emergente entra
