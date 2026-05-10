# Squads e Skills — Programa GEO IPOG

> **Status:** vigente desde 2026-05-10
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Próxima revisão:** 10-08-2026 (trimestral) ou quando squad nova entrar
> **Cadência operacional:** stand-up diário 09h00 BRT (15 min) + retro semanal sexta 17h00 (30 min) por squad

Composição operacional do programa em **5 squads especializadas** (uma por vetor) + **2 squads transversais**. Cada squad tem skills mínimos, capacidade declarada, cadência interna e métricas de saúde. O objetivo é colocar o IPOG na posição #1 em LLMs para a categoria MBA Online de Psicologia até pico 2027.1 (15-02-2027).

A lógica é prescritiva: squad sem skills declarados vira improviso. Skill sem responsável vira ângulo cego. Squad sem cadência vira reunião eterna.

---

## 1. Mapa de squads

| Squad | Vetor | Lead | Backup | Capacidade |
|---|---|---|---|---|
| **Squad Schema** | V1 GEO técnico | Alexandre Caramaschi | sub-agent Opus | 16h/semana Alexandre |
| **Squad Citação** | V2 Engenharia de citação | Alexandre Caramaschi | sub-agent Opus + orchestrator 5 LLMs | 12h/semana Alexandre |
| **Squad Editorial** | V3 Editorial HBR | Alexandre Caramaschi | 2-3 sub-agents Opus paralelos | 20h/semana Alexandre + 30h sub-agents/peça |
| **Squad Autoridade** | V4 Autoridade externa (Wikipedia, Reddit, YouTube, mídia) | Alexandre Caramaschi | Bruno Azambuja (PR mídia) | 10h/semana Alexandre + 4h Bruno |
| **Squad Regional** | V5 Moat regional 51 cidades CNPJ-próprio | Bruno Azambuja | Alexandre Caramaschi | 8h/semana Bruno + 4h Alexandre |
| **Squad QA & Observability** | transversal | Alexandre Caramaschi | sub-agent Opus | 6h/semana Alexandre |
| **Squad Governança** | transversal (atas, relatórios, milestones, riscos) | Alexandre Caramaschi | Bruno Azambuja | 8h/semana Alexandre + 2h Bruno |

**Capacidade total semanal Brasil GEO:** ~84h (Alexandre) + 30h sub-agents/peça x 2 peças/semana = ~144h/semana de trabalho técnico.

---

## 2. Skills mínimos por squad

### 2.1 Squad Schema (V1)

- **Skill 1 — Schema.org JSON-LD avançado:** EducationalOrganization, Course, EducationalOccupationalProgram, Person, Article, FAQPage, Service, LocalBusiness; nesting, `@id` canônico, validation cross-tool (Rich Results Test + Schema.org Validator). Cobertura atual: Alexandre (10/10).
- **Skill 2 — llms.txt + robots.txt + sitemap engineering:** estrutura canônica, GPTBot/ClaudeBot/PerplexityBot whitelisting, sitemap regional. Cobertura: Alexandre (9/10).
- **Skill 3 — NAIA platform:** auditoria NAIA-XXX em 100+ checks, severidade P0-P3. Cobertura: Alexandre (8/10).
- **Skill 4 — Web infra cliente (TI IPOG):** Next.js, Cloudflare Workers, Vercel, GA4, GSC. Cobertura: Alexandre (10/10) + dependência TI IPOG.
- **Skill 5 — Wikidata claims editing:** P31, P571, P159, P137, P1830, P5045. Cobertura: Alexandre (8/10) — orientação `reference_wikidata_anonymous_edit_works.md`.

### 2.2 Squad Citação (V2)

- **Skill 1 — Cross-LLM coleta com cohort fixo:** ChatGPT/Claude/Gemini/Perplexity/Grok/Copilot, versão pinada, drift detection, JSONL persistence. Cobertura: Alexandre (10/10).
- **Skill 2 — Engenharia de prompt-âncora:** kit de 66 prompts × 3 clusters × 7 personas × 4 jornadas. Cobertura: Alexandre (10/10).
- **Skill 3 — Gap mapping por alavanca dominante:** classificar gap por conteúdo/Schema/autoridade. Cobertura: Alexandre (9/10) + sub-agent Opus revisão.
- **Skill 4 — AutoGEO API integration:** Hugging Face, rule-extraction → rewrite. Cobertura: Alexandre (7/10) — pilot Sprint 5+.
- **Skill 5 — Tracking SoV em LLMs (First Answer / Trakkr):** dashboard semanal. Cobertura: Alexandre (8/10) — issue #46 em curso.

### 2.3 Squad Editorial (V3)

- **Skill 1 — Padrão editorial HBR-grade:** abertura-impacto, tese contraintuitiva, evidência, mecanismo, decisão, próximo passo. Cobertura: Alexandre (10/10).
- **Skill 2 — Voice Guard 2.0 com 9 enriquecimentos:** citations, statistics, quotations, fluency, simple_language, technical_terms, easy_to_understand, authoritative, unique_words. Cobertura: Alexandre (9/10) — issue #59 deploy v1.0.
- **Skill 3 — Bloom 3+ andragogia:** verbos Bloom 3+, princípios Knowles. Cobertura: Alexandre (10/10) + 2-3 sub-agents Opus paralelos.
- **Skill 4 — Compliance MEC + CFP:** claims regulatórios. Cobertura: Alexandre (7/10) — dependência jurídico IPOG.
- **Skill 5 — Sub-agent Opus orchestration:** lotes 3-5 peças por sub-agent paralelo. Cobertura: Alexandre (10/10) — memória `feedback_sub_agents_over_orchestrator_copy_naia`.
- **Skill 6 — Glossário Psicologia + termos canônicos:** 50+ termos em `content/GLOSSARIO-PSICOLOGIA.md`. Cobertura: Alexandre (9/10).

### 2.4 Squad Autoridade (V4)

- **Skill 1 — Wikipedia pt-br editing:** drafts em wikitext, fontes secundárias tier 1, critério de notabilidade. Cobertura: Alexandre (8/10) — orientação `reference_wikidata_anonymous_edit_works.md`.
- **Skill 2 — Reddit Brasil engagement:** r/brasil, r/EAD, r/psicologiabr; regra 9:1 Hook-Valor-Receipt + disclosure obrigatório. Cobertura: Alexandre (8/10) — skill `RedCaramaschi`.
- **Skill 3 — YouTube institucional:** Schema VideoObject, transcrição pt-BR com knowsAbout match. Cobertura: Alexandre (7/10) — pilot Sprint 6.
- **Skill 4 — PR mídia educacional:** Estadão Educação, Folha Equilíbrio, Quero Bolsa, Educa Mais Brasil. Cobertura: Bruno (preferencial) + Alexandre (backup).
- **Skill 5 — CRPs estaduais relacionamento institucional:** CRP-09, CRP-03, CRP-18, CRP-14, CRP-23. Cobertura: Bruno (5/10) — issue #53 em curso.
- **Skill 6 — Lattes/ORCID engineering para corpo docente:** vincular 51 docentes regionais. Cobertura: Bruno (preferencial) + Alexandre (backup) — issue #57 NAIA-317.

### 2.5 Squad Regional (V5)

- **Skill 1 — Mapeamento de cidades médias estratégicas:** PIB per capita, saturação competitiva, demografia educacional. Cobertura: Alexandre (8/10) + dependência Bruno (lista oficial NAIA-310).
- **Skill 2 — Schema LocalBusiness + EducationalOrganization por unidade:** 51 instâncias canônicas. Cobertura: Alexandre (9/10).
- **Skill 3 — Pricing tier por cidade:** matriz PIB per capita + saturação local. Cobertura: Bruno (preferencial) + Alexandre (suporte) — issue #54.
- **Skill 4 — Compliance MEC regional + CEEs estaduais:** Conselhos Estaduais de Educação. Cobertura: Bruno (5/10) — dependência jurídico IPOG.
- **Skill 5 — Operação física multicampus:** 51 unidades CNPJ-próprio, fundadora local, cronograma. Cobertura: Bruno (preferencial — IPOG-side).

### 2.6 Squad QA & Observability (transversal)

- **Skill 1 — Markdown lint + link check:** `quality.yml` workflow. Cobertura: Alexandre (10/10).
- **Skill 2 — Schema validation cross-tool:** Rich Results Test + Schema.org Validator + snapshot arquivado. Cobertura: Alexandre (10/10).
- **Skill 3 — Voice Guard automation:** `voice_guard.py` com gates v1.0 → v2.0. Cobertura: Alexandre (9/10).
- **Skill 4 — KPI dashboard maintenance:** `dashboards/KPI-DASHBOARD.md` quinzenal. Cobertura: Alexandre (10/10).
- **Skill 5 — Concorrentes monitoring workflow:** snapshot quinzenal automatizado. Cobertura: Alexandre (8/10) — issue #42 investigar.

### 2.7 Squad Governança (transversal)

- **Skill 1 — Atas + relatórios semanais/mensais/trimestrais:** DoD seções 8-10. Cobertura: Alexandre (10/10).
- **Skill 2 — Risk register management:** R-001 a R-019, gatilhos D-7/D-Day/D+15. Cobertura: Alexandre (10/10).
- **Skill 3 — Milestones + GitHub Project board:** 5 milestones + project #6. Cobertura: Alexandre (10/10).
- **Skill 4 — Healthcheck quinzenal estrutural:** auditoria do repo. Cobertura: Alexandre (10/10).
- **Skill 5 — Stakeholder management cliente:** Bruno + Ronan + jurídico IPOG + TI IPOG. Cobertura: Alexandre (8/10) + Bruno (8/10).

---

## 3. Cadência operacional por squad

| Cadência | Atividade | Duração | Owner |
|---|---|---|---|
| Diária 09h00 | Stand-up de 15 min Brasil GEO interno (Alexandre + sub-agents) | 15 min | Alexandre |
| Semanal terça 10h00 | Status com Bruno (cliente) | 60 min | Alexandre + Bruno |
| Semanal sexta 17h00 | Retro interna por squad (Schema, Editorial etc.) | 30 min/squad | Alexandre |
| Quinzenal | Coleta cross-LLM + atualização KPI Dashboard | 4h | Alexandre (Squad Citação + QA) |
| Quinzenal | Snapshot concorrentes-monitoring (workflow automático) | 0h | Squad QA |
| Mensal primeira terça 17h00 | Checkpoint executivo com Ronan | 60 min | Alexandre + Ronan + Bruno |
| Mensal | Auditoria NAIA full + atualização KPI 4 | 8h | Alexandre (Squad Schema) |
| Mensal | Heatmap risco × KPI revisado | 1h | Alexandre + Bruno (Squad Governança) |
| Trimestral | Relatório trimestral + recalibração full-grid | 16h | Alexandre |
| Trimestral | Onda de benchmarking (Onda 3 → Q4 2026; Onda 4 → Q1 2027) | 40h | Alexandre + Squad Citação |

---

## 4. Métricas de saúde por squad

| Squad | Métrica de saúde | Meta operacional | Cadência |
|---|---|---|---|
| Schema | Schema Coverage Score (KPI 4) | ≥ 90 em pico 2026.2 | Mensal |
| Citação | Mention Rate cohort (KPI 1) + N mínimo atendido | ≥ 50 prompts × 6 LLMs por leitura; +25 pp em pico | Quinzenal |
| Editorial | Voice Guard 2.0 score por peça | ≥ 8/9 enriquecimentos em todas | Por peça |
| Autoridade | KPI 5 (fontes externas) + Wikipedia linhas | ≥ 8 fontes; ≥ 250 linhas até 30-10 | Mensal |
| Regional | 51 unidades com Schema válido | 30+ até pico 2026.2; 51 até pico 2027.1 | Quinzenal |
| QA & Observability | % issues NAIA P0 fechadas em ≤ 5 dias úteis | ≥ 90% | Mensal |
| Governança | Cadência cumprida (atas + relatórios + checkpoints) | 100% (zero lacuna silenciosa) | Semanal |

---

## 5. Decisões de squad nos próximos 90 dias (curto prazo)

### 5.1 Squad Editorial — decisão crítica

Cada peça HBR-grade publicada precisa de Voice Guard 2.0 ≥ 7/9 (issue #59). Sem essa gate, peças saem com qualidade GEO sub-ótima. **Decisão Sprint 1-2:** deploy Voice Guard 2.0 v1.0 até 17-05-2026.

### 5.2 Squad Regional — bloqueio cliente

51 unidades CNPJ-próprio dependem de NAIA-310 (issue #50) com Bruno. **Decisão pauta 13-05:** confirmar lista oficial das 51 cidades.

### 5.3 Squad Autoridade — janela curta

Wikipedia IPOG sem verbete + Reddit Brasil sem presença autoral = R-013 ativo. **Decisão Sprint 2-4:** publicar primeira leva fontes secundárias + Q-id Wikidata + iniciar account Reddit Brasil GEO.

---

## 6. Plano de expansão de squad (médio prazo)

Skills atualmente sob risco se Alexandre Caramaschi não for backed-up:

| Skill | Cobertura única | Ação proposta |
|---|---|---|
| Schema.org JSON-LD avançado | Alexandre | Documentar em `docs/ontologia/SCHEMA-IPOG-CANONICAL.md` (feito 10-05) |
| Voice Guard 2.0 deploy | Alexandre | Open-source `voice_guard.py` com testes; sub-agent Opus pode rodar gates |
| AutoGEO API integration | Alexandre | Documentar pipeline em `docs/GEO-FRAMEWORK-CANONICO.md` (feito 10-05) |
| Wikipedia/Wikidata edits | Alexandre | Bruno faz workshops mensais em CRP estadual sobre Wikipedia |
| Reddit Brasil engagement | Alexandre | Skill canônica `RedCaramaschi` (memória) + protocolo de Bruno como reviewer |

---

## 7. Cross-links

- `docs/gestao/SKILLS-MATRIX.md` — matriz Skill × Pessoa × Cobertura detalhada
- `docs/gestao/DEFINITION-OF-DONE-CANONICO.md` — DoD aplicado por squad
- `docs/04-definicao-de-done.md` — DoD canônico exaustivo
- `docs/ROADMAP-SPRINTS-2026-2027.md` — 22 sprints com tasks por vetor
- `docs/GEO-FRAMEWORK-CANONICO.md` — frameworks F1-F6 mapeados a vetores
- `docs/03-reunioes-e-cadencia-ipog.md` — cadência de reuniões com IPOG
