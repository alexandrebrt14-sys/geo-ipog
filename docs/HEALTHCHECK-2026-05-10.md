# Healthcheck completo — geo-ipog · 10-05-2026

> **Auditor:** Alexandre Caramaschi (Brasil GEO)
> **Período auditado:** 30-04-2026 (kickoff) → 10-05-2026 (data desta auditoria)
> **Janela auditada:** 11 dias corridos · 8 dias úteis
> **Próxima auditoria sugerida:** 24-05-2026 (15 dias)

Auditoria estrutural do repositório `alexandrebrt14-sys/geo-ipog` cobrindo documentação, issues, milestones, labels, workflows, project board e tracking de marcos críticos de maio. Cruza estado declarado nos documentos vivos contra estado verificável no GitHub (issues, commits, milestones) e identifica gaps, oportunidades e ações corretivas.

A leitura é prescritiva: cada gap mapeado abaixo tem ação, owner e prazo. Gap sem ação é gap declarativo, não acionável.

---

## 1. Sumário executivo

### 1.1 Status geral

| Eixo | Score | Observação |
|---|---|---|
| Documentação canônica | 9/10 | README, ROADMAP, framework e DoD em estado HBR-grade. Falta apenas reconciliação CTO masterplan + populá-lo com primeira leitura de KPIs. |
| Issues e milestones | 6/10 | 31 issues abertas, 1 fechada (test). 9 issues órfãs de milestone. Roadmap duplicado (Fases vs Quarters CTO). |
| Workflows e CI | 7/10 | 5 workflows configurados. Markdown lint + monitoramento concorrentes operacionais. Primeira execução do snapshot quinzenal não foi capturada em `audits/concorrentes-monitoring/`. |
| Cadência operacional | 3/10 | Zero atas registradas, zero relatórios semanais publicados, zero auditorias NAIA executadas em 11 dias de programa. |
| Decisões IPOG pendentes | Crítico | R-001 (produto), R-009 (GA4), R-010 (lançamento MBA), R-008 (Wikipedia) em escalada. Decisão D-05 (Frente Regional) e D-06 (acessos) abertas. |
| Marcos próximos (maio) | Em risco | Schema piloto (30-05), Kit prompts fechado (20-05) e Decisão produto (15-05) sem evidência de progresso visível em commits. |

**Veredito:** repositório com fundação documental forte e operação sub-executada. Risco material de perda de janela do pico de captação 2026.2 se a próxima quinzena (10-05 a 24-05) não destravar decisões IPOG e produzir os primeiros artefatos verificáveis (relatório semanal #1, ata kickoff oficial, baseline cross-LLM Fase 1).

### 1.2 Top 5 ações desta auditoria

1. **Reconciliar roadmap dual** — vincular issues #28 a #34 (CTO masterplan) aos milestones existentes (Fase 1-4) e publicar `docs/ROADMAP_2026Q2-Q4.md` referenciado mas inexistente.
2. **Popular KPI Dashboard** — `dashboards/KPI-DASHBOARD.md` está completo estruturalmente mas com 100% das células `N/D`. Iniciar primeira leitura cross-LLM em 14-05 e auditoria NAIA em 15-05.
3. **Destravar decisões IPOG críticas** — escalar R-001 (produto), R-009 (GA4) e D-06 (acessos GSC/GA4) ao Bruno e Ronan via reunião extraordinária na semana 11-15/05.
4. **Publicar primeiro relatório semanal** — ainda sem entregar a IPOG após kickoff de 30-04. Quebra de cadência mata a relação operacional.
5. **Configurar workflow concorrentes-monitoring** — primeira execução agendada (01-05) não gerou diretório `audits/concorrentes-monitoring/2026-05-01/`. Investigar se workflow rodou e falhou silenciosamente ou se nunca disparou.

---

## 2. Inventário de artefatos

### 2.1 Documentação canônica (vigente e auditada)

| Arquivo | Estado | Qualidade | Observação |
|---|---|---|---|
| `README.md` | Vigente | HBR | 147 linhas. Cobre escopo, partes envolvidas, estrutura, governança. |
| `ROADMAP.md` | Vigente | HBR | 137 linhas. 4 fases + janela espelho. Falta seção sobre CTO masterplan paralelo. |
| `CONTRIBUTING.md` | Vigente | HBR | 6KB. Disciplina de contribuição. |
| `CODE_OF_CONDUCT.md` | Vigente | OK | 3.7KB. |
| `SECURITY.md` | Vigente | OK | 2.7KB. Política de confidencialidade B2B. |
| `docs/01-kickoff-30-04-2026.md` | Vigente | HBR | Registro do kickoff. |
| `docs/02-contexto-mba-online-psicologia.md` | Vigente | HBR | Contexto estratégico. |
| `docs/03-reunioes-e-cadencia-ipog.md` | Vigente | HBR | Cadência operacional. |
| `docs/04-definicao-de-done.md` | Vigente | HBR | 12 categorias de DoD. Refencia `dashboards/KPI-DASHBOARD.md` que não existe. |
| `docs/05-risk-register.md` | Vigente | HBR | 12 riscos R-001 a R-012. 4 em escalada. |
| `docs/06-marcos-criticos-2026.md` | Vigente | HBR | Calendário 2026 com gatilhos. |
| `docs/framework/01-rotinas-e-missoes-geo.md` | Vigente | HBR | Framework GEO. |
| `docs/framework/02-quality-gate-5-camadas.md` | Vigente | HBR | Quality gate. |
| `docs/framework/03-pipeline-5-llms.md` | Vigente | HBR | Pipeline orquestrador. |
| `docs/framework/04-client-context-abstraction.md` | Vigente | HBR | Abstração multi-tenant. |
| `docs/framework/05-estrategia-regional-geo-educacao.md` | Vigente | HBR | Tese regionalização (commit 810d492). |

### 2.2 Audits e benchmarking

| Arquivo | Estado | Cobertura | Observação |
|---|---|---|---|
| `audits/PLAYBOOK-AUDITORIA-NAIA.md` | Vigente | 100+ checks | Protocolo P0-P3. |
| `audits/SCHEMA-PATTERNS.md` | Vigente | 6 tipos | EducationalOrganization, Course, EOP, FAQPage, Article, Person. |
| `audits/LLMS-TXT-TEMPLATE.md` | Vigente | Template + diretrizes | Pronto para deploy em ipog.edu.br. |
| `audits/ROBOTS-SITEMAP-CHECKLIST.md` | Vigente | Checklist | Pronto para uso. |
| `audits/benchmarking/SINTESE-EXECUTIVA.md` | Onda 1 OK | 60% | Integração Onda 2 pendente (issue #8). |
| `audits/benchmarking/pontos-fortes-a-superar.md` | Onda 1 OK | 60% | Integração Onda 2 pendente (issue #9). |
| `audits/benchmarking/matriz-presenca-llm.md` | Vigente | 10 concorrentes | 15 prompts × 10 concorrentes. |
| `audits/benchmarking/matriz-tecnica-schema-seo.md` | Vigente | 10 concorrentes | Robots/llms.txt/Schema/autoridade. |
| `audits/benchmarking/ARQUETIPOS-CONCORRENCIA-EDUCACAO.md` | Vigente | Tese consolidada | Adicionado em 01-05-2026. |
| `audits/benchmarking/concorrente-{10}.md` | Vigente | 10 dossiês | Onda 1 + Onda 2 fechadas. |
| `audits/benchmarking/ONDA-2-CORRECOES-PREMISSA.md` | Vigente | Crítico | Correções identidade institucional. Leitura obrigatória. |
| `audits/concorrentes-monitoring/2026-05-01/` | **Ausente** | — | Workflow agendado mas snapshot inicial não gerado. |

### 2.3 Conteúdo, prompts e dashboards

| Arquivo | Estado | Observação |
|---|---|---|
| `content/PADRAO-EDITORIAL.md` + 9 outros | Vigentes | Padrão HBR completo. |
| `prompts/KIT-PROMPTS-V0.md` | Vigente | 66 prompts. Versão V1 fechada até 20-05 conforme ROADMAP. |
| `prompts/PAPEIS-DE-COLETA.md` + 5 prompts × papel + CALIBRACAO + QUERIES-REGIONAIS | Vigentes | Pipeline 5 LLMs documentado. |
| `dashboards/METRICAS-CANONICAS.md` | Vigente | KPIs canônicos. |
| `dashboards/RUNBOOK-COLETA-LLM.md` | Vigente | Runbook coleta. |
| `dashboards/FINOPS-DISCIPLINA.md` | Vigente | Budget guards. |
| `dashboards/KPI-DASHBOARD.md` | Vigente | 226 linhas estruturadas. Todas as células com `N/D` aguardando primeira leitura cross-LLM (14-05) e auditoria NAIA (15-05). |

### 2.4 Board report (apresentação Conselho IPOG)

8 documentos em `docs/board-report/` cobrindo naming, mercado, GTM, GEO, compliance, editorial, pricing, regional + 2 HTMLs (ipog + regional). **Estado:** completo, vigente desde 01-05-2026, pronto para apresentação ao Conselho.

### 2.5 Tech stack roadmap (consolidado em 01-05)

8 documentos principais + 5 auxiliares em `docs/tech-stack/` cobrindo solution architecture, data engineering, schema/llms.txt engineer, dashboard frontend, LLM integration, NAIA voice guard, observability/CI-CD, editorial CMS. **Estado:** completo, vigente, pronto para execução técnica.

---

## 3. Issues e milestones

### 3.1 Distribuição

| Estado | Quantidade |
|---|---|
| OPEN | 31 |
| CLOSED | 1 (issue #1, test) |
| **Total** | **32** |

### 3.2 Distribuição por milestone

| Milestone | Open | Issues |
|---|---|---|
| Fase 1 — Baseline + Schema piloto | 10 | #2, #3, #4, #5, #6, #10, #19, #20, #21, #22 |
| Fase 2 — Primeira leva HBR | 5 | #7, #8, #9, #14, #17 |
| Fase 3 — Pico GEO captação 2026.2 | 1 | #18 |
| Fase 4 — Operação contínua | 0 | — |
| Operação contínua | 5 | #11, #12, #13, #15, #16 |
| **Sem milestone** | **9** | **#28, #29, #30, #31, #32, #33, #34, #35, #36** |
| **Total** | **30** | (excluindo a fechada #1) |

### 3.3 Gap crítico — issues órfãs de milestone

Issues #28 a #36 foram criadas pelo `/cto` em 04-05-2026 a partir do masterplan dos 15 repositórios e usam labels `quarter:q2-2026` / `quarter:q3-2026` / `quarter:q4-2026` ao invés do sistema de milestones por Fase. Resultado: dois sistemas paralelos de tracking sem reconciliação.

| Issue | Tema | Data alvo | Milestone correto |
|---|---|---|---|
| #28 | Tracking Q2/Q3/Q4 (CTO) | 2026-05-30 | Fase 1 |
| #29 | Q2-W4 — Kit 50 prompts + auditoria baseline | 06-05 a 20-05 | Fase 1 |
| #30 | Q2-W5 — Schema Course + EOP validado | 20-05 a 30-05 | Fase 1 |
| #31 | Q2-W8 — Primeira leva 6-10 peças HBR | 02-06 a 15-06 | Fase 2 |
| #32 | Q2-W10 — Monitoramento diário pico | 15-06 a 31-07 | Fase 3 |
| #33 | Q4-W1 — Onda 2 conteúdo HBR + Schema review | 01-11 a 30-11 | Fase 4 |
| #34 | Q4-W2 — Pico captação 2027.1 | 01-12 a 15-02-2027 | Fase 4 |
| #35 | D-05 escopo Frente Regional 51 cidades | Decisão 2026-05-30 | Fase 1 |
| #36 | D-06 acesso GSC + GA4 IPOG | Decisão 2026-05-25 | Fase 1 |

**Ação corretiva:** vincular cada issue ao milestone correspondente. Manter labels `quarter:*` como tags transversais (cross-repo CTO).

### 3.4 Issues que precisam ser criadas (gap detectado)

| Tema | Justificativa | Milestone | Prazo |
|---|---|---|---|
| Configurar GA4 com referrer/UTM dedicado de LLM | Marco 25-05; R-009 em escalada; KPI 7 (Conversion Lift) depende disso | Fase 1 | 25-05-2026 |
| Publicar `docs/ROADMAP_2026Q2-Q4.md` | Referenciado em 7 issues #28-34; ausente | Fase 1 | 17-05-2026 |
| Popular primeira leitura cross-LLM em `dashboards/KPI-DASHBOARD.md` | Documento estruturado mas com todas as células `N/D` | Fase 1 | 14-05-2026 |
| Bootstrap relatório semanal #1 (semana 04-10/05) | Cadência IPOG quebrada — zero relatórios entregues | Fase 1 | 11-05-2026 |
| Bootstrap ata kickoff oficial em `docs/atas/` | Zero atas registradas após kickoff de 30-04 | Fase 1 | 11-05-2026 |
| Investigar primeira execução do workflow `concorrentes-monitoring.yml` | Cron disparou em 01-05 mas snapshot não apareceu | Operação contínua | 12-05-2026 |
| Auditoria NAIA full inicial em ipog.edu.br | Pré-requisito de KPI 4 (Schema Coverage) baseline | Fase 1 | 15-05-2026 |
| Reunião extraordinária IPOG: destravar D-05 + D-06 + R-001 | Quatro decisões em escalada bloqueando Fase 1 | Fase 1 | 13-05-2026 |

---

## 4. Workflows e automação

### 4.1 Inventário

| Workflow | Trigger | Estado | Última execução observável |
|---|---|---|---|
| `quality.yml` | PR/push em `*.md` + cron seg 11h UTC + manual | OK | A confirmar |
| `concorrentes-monitoring.yml` | Cron dias 1 e 15 às 12h UTC + manual | **Não verificado** | Snapshot 2026-05-01 ausente |
| `labeler.yml` | PR | OK | A confirmar |
| `report-builder.yml` | A confirmar | A confirmar | A confirmar |
| `stale.yml` | Cron padrão | OK | — |

### 4.2 Issue templates configurados (5)

- `audit-finding.yml` — achados de auditoria NAIA
- `citation-gap.yml` — gaps de citação cross-LLM
- `content-piece.yml` — peças editoriais HBR-grade
- `gating-decision-ipog.yml` — decisões pendentes IPOG
- `incident.yml` — incidentes operacionais
- `schema-task.yml` — tarefas de Schema.org

**Cobertura:** completa para tipos de trabalho do programa.

### 4.3 Configuração transversal

- `.github/CODEOWNERS` — review obrigatório
- `.github/dependabot.yml` — atualizações automáticas
- `.github/PROJECT.md` — board v2 #6 documentado
- `.markdownlint.json` — lint config
- `.gitignore` — ignorar locais

---

## 5. Cadência operacional — gaps materiais

| Cadência | Esperado em 11 dias | Observado | Gap |
|---|---|---|---|
| Atas reuniões IPOG | ≥1 (kickoff oficial) | 0 | Crítico |
| Relatórios semanais | ≥1 (semana 04-10/05) | 0 | Crítico |
| Auditoria NAIA | 1 baseline | 0 | Alto |
| Snapshot quinzenal concorrentes | 1 (01-05) | 0 | Alto |
| Coleta cross-LLM dia 1 | 1 (07-05) | 0 (pendente) | Alto |
| Decisão produto MBA | 1 (15-05 deadline) | Pendente | Em risco — gatilho R-001 |
| Schema piloto homologação | Em curso | Pendente | Em risco |
| Kit prompts V1 | Em curso | V0 fechado | OK até 20-05 |

**Diagnóstico:** o repositório está em modo "fundação documental" com cadência operacional ainda não iniciada. A próxima quinzena precisa virar a chave para "operação ativa" — relatório, ata, coleta cross-LLM, primeira auditoria NAIA full.

---

## 6. Reconciliação roadmap dual

O programa opera com dois sistemas paralelos:

### Sistema A — Fases 1 a 4 (canônico do programa)

- Fase 1 (07-30 maio): baseline + Schema piloto + llms.txt
- Fase 2 (01-15 junho): primeira leva HBR
- Fase 3 (15-06 a 31-07): pico GEO 2026.2
- Fase 4 (ago em diante): operação contínua + pré-pico 2027.1

Vinculação: milestones GitHub `Fase 1` a `Fase 4` + `Operação contínua`.

### Sistema B — CTO masterplan (transversal cross-repo)

- Q2-W4 a Q4-W2 — ondas com horas estimadas, critical path e dependências
- Labels: `quarter:q2-2026`, `quarter:q3-2026`, `quarter:q4-2026`
- Tracking issue: #28
- Documento mestre: `docs/ROADMAP_2026Q2-Q4.md` **(ausente, a criar)**

### Reconciliação proposta

| Onda CTO | Período | Equivalência Fase | Milestone GitHub |
|---|---|---|---|
| Q2-W4 | 06-05 a 20-05 | Fase 1 (semanas 2-3) | Fase 1 |
| Q2-W5 | 20-05 a 30-05 | Fase 1 (semana 4) | Fase 1 |
| Q2-W8 | 02-06 a 15-06 | Fase 2 (toda) | Fase 2 |
| Q2-W10 | 15-06 a 31-07 | Fase 3 (toda) | Fase 3 |
| Q4-W1 | 01-11 a 30-11 | Fase 4 (parte 1) | Fase 4 |
| Q4-W2 | 01-12 a 15-02-2027 | Fase 4 (pré-pico 2027.1) | Fase 4 |

**Decisão:** o sistema A (Fases) é a fonte de verdade operacional do programa GEO IPOG. O sistema B (Quarters CTO) é tag transversal para reporting cross-repo. As duas devem coexistir nas issues — milestone do sistema A + label do sistema B.

---

## 7. Riscos e decisões pendentes IPOG

### 7.1 Riscos em escalada (4 dos 12)

- **R-001** — Atraso decisão de produto IPOG (naming MBA + catálogo). Gatilho dispara em 15-05.
- **R-008** — Wikipedia bloqueia edição por critério de notabilidade. Owner Bruno + Brasil GEO.
- **R-009** — UTM dedicado / referrer LLM não capturado em GA4. Owner Bruno (TI/Marketing IPOG).
- **R-010** — Atraso lançamento produto MBA. Owner Bruno + Ronan.

### 7.2 Decisões pendentes (CTO masterplan)

- **D-05** — escopo Frente Regional 51 cidades CNPJ-próprio (issue #35)
- **D-06** — acesso GSC + GA4 IPOG (issue #36)
- **D-04** — naming MBA Online de Psicologia + 3-5 produtos prioritários (issue #4 + R-001)
- **D-07** — robots.txt aberto a IA crawlers em ipog.edu.br (issue #6)
- **D-08** — confirmação 24 cidades médias estratégicas (issue #20)
- **D-09** — confirmação 10 áreas acadêmicas IPOG (issue #21)
- **D-10** — pré-aprovação Tranche 0 Regional R$ 380-450k (issue #22)

**Total:** 4 riscos em escalada + 7 decisões abertas = **11 itens bloqueantes** dependentes de Bruno Azambuja e/ou Ronan Maia.

**Ação proposta:** consolidar em pauta única para reunião extraordinária 13-05-2026 com Ronan Maia presente. Sem destravar metade desses itens até 17-05, a Fase 1 não fecha em 30-05.

---

## 8. Plano de remediação 11-24/05/2026

### Wave 1 — Documentação e tracking (10-11/05)

- [x] Healthcheck publicado (este documento)
- [x] `docs/ROADMAP_2026Q2-Q4.md` publicado (gap CTO)
- [x] `STATUS.md` na raiz publicado (snapshot semanal vivo)
- [ ] `ROADMAP.md` atualizado com seção reconciliação CTO
- [ ] `README.md` atualizado com cross-links HEALTHCHECK + STATUS + ROADMAP_2026Q2-Q4
- [ ] `.github/PROJECT.md` atualizado com issues #28-36

### Wave 2 — Reorganização issues (11-12/05)

- [ ] Vincular issues #28 a #36 aos milestones corretos
- [ ] Criar 8 issues de gap (seção 3.4 acima)
- [ ] Padronizar labels: toda issue ganha `priority:*` + `quarter:*` + `owner:*`
- [ ] Adicionar todas as 8 novas ao project board #6

### Wave 3 — Cadência operacional (11-17/05)

- [ ] Publicar relatório semanal #1 (semana 04-10/05)
- [ ] Registrar ata kickoff oficial em `docs/atas/2026-04-30-ipog-kickoff.md`
- [ ] Confirmar cadência semanal com Bruno + Ronan
- [ ] Reunião extraordinária 13-05 para destravar 11 bloqueantes
- [ ] Iniciar coleta cross-LLM Fase 1 (issue #5)

### Wave 4 — Marcos críticos maio (até 30-05)

- [ ] Decisão produto IPOG (15-05) — owner Bruno + Ronan
- [ ] Kit prompts V1 fechado (20-05) — owner Alexandre
- [ ] GA4 referrer/UTM (25-05) — owner Bruno
- [ ] Schema piloto em produção (30-05) — owner Alexandre + Bruno
- [ ] llms.txt no ar em ipog.edu.br (30-05) — owner Alexandre + Bruno
- [ ] Baseline cross-LLM Fase 1 fechado (30-05) — owner Alexandre

---

## 9. Métricas da auditoria

| Métrica | Valor |
|---|---|
| Arquivos no repo | 88 |
| Tamanho repo | 865 KB |
| Commits desde kickoff | 14 |
| Issues abertas | 31 |
| Issues fechadas | 1 |
| Milestones configurados | 5 |
| Labels configuradas | 50+ |
| Workflows ativos | 5 |
| Issue templates | 6 |
| Riscos catalogados | 12 |
| Riscos em escalada | 4 |
| Decisões IPOG abertas | 7 |
| Documentos canônicos vigentes | 39 |
| Documentos referenciados ausentes | 1 (`docs/ROADMAP_2026Q2-Q4.md`) |
| Atas registradas | 0 |
| Relatórios semanais | 0 |
| Auditorias NAIA executadas | 0 |

---

## 10. Cross-links

- `README.md`
- `STATUS.md`
- `ROADMAP.md`
- `docs/ROADMAP_2026Q2-Q4.md`
- `docs/05-risk-register.md`
- `docs/06-marcos-criticos-2026.md`
- `dashboards/KPI-DASHBOARD.md`
- `.github/PROJECT.md`
- GitHub Issues: <https://github.com/alexandrebrt14-sys/geo-ipog/issues>
- GitHub Milestones: <https://github.com/alexandrebrt14-sys/geo-ipog/milestones>
