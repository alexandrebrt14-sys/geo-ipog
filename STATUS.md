# Status do Programa GEO IPOG

> **Última atualização:** 10-05-2026
> **Janela coberta:** 30-04-2026 (kickoff) → 10-05-2026
> **Próximo update:** 17-05-2026 (toda segunda-feira até as 09h00 BRT)

Snapshot semanal do programa GEO IPOG para leitura rápida pelo time Brasil GEO + IPOG. Substitui leitura aprofundada de `docs/HEALTHCHECK-*.md` no checkpoint operacional.

A lógica é prescritiva: STATUS é um documento vivo. Se não bate com a realidade, abrir PR de atualização imediato.

---

## 1. Onde estamos

- **Fase ativa:** Fase 1 — Baseline + Schema piloto (07-05 a 30-05)
- **Onda CTO ativa:** Q2-W4 (06-05 a 20-05) — Kit 50 prompts + auditoria técnica baseline
- **Próximos marcos:**
  - 13-05 — Reunião extraordinária IPOG para destravar 11 bloqueantes
  - 15-05 — Decisão produto IPOG (R-001 dispara)
  - 17-05 — Bootstrap KPI Dashboard + ROADMAP_2026Q2-Q4 publicados
  - 20-05 — Kit prompts V1 fechado
  - 25-05 — GA4 com referrer/UTM dedicado
  - 30-05 — Schema piloto em produção + llms.txt no ar + baseline Fase 1 fechado

## 2. Cinco números que importam esta semana

| Número | Valor | Comentário |
|---|---|---|
| Issues abertas | 61 | 31 novas criadas em 10-05 (#38-#69) — 6 gaps + 6 janelas mercado + 8 regionais + 3 acadêmicas + 8 epics |
| Documentos ontologia/taxonomia | 4 | `docs/ontologia/` — fonte de verdade para Schema canônico, naming, labels GitHub e Knowledge Graph |
| Documentos gestão operacional | 7 | `docs/gestao/` — squads + skills matrix + DoD + concorrentes status + resultados + roadmap curto-médio |
| Milestones GitHub | 13 | 5 Fases (originais) + 8 Marcos M1-M8 (novos) cobrindo até maio 2027 |
| Epics canônicos | 8 | #61-#69 agregando issues por marco/vetor |
| Labels GitHub canônicas | 100+ | 14 dimensões ortogonais (priority, phase, quarter, vetor, cluster, persona, horizon, janela, framework, marco, risk, concorrente, squad, status) |
| Decisões IPOG bloqueantes | 11 | 4 riscos em escalada + 7 decisões abertas |
| Atas registradas | 0 | Crítico — bootstrappar nesta semana |
| Relatórios semanais entregues | 0 | Crítico — primeiro entregue em 11-05 |
| Dias até pico GEO 2026.2 | 36 | 15-06-2026 é D-Day |

## 3. Riscos top 3

1. **R-001** — Atraso decisão de produto IPOG (Em escalada). Dispara em 15-05. Sem isso, Schema piloto não tem alvo.
2. **R-009** — UTM/referrer LLM não capturado em GA4 (Em escalada). Sem isso, KPI 7 (Conversion Lift) fica N/D toda Fase 1.
3. **R-010** — Atraso lançamento produto MBA (Em escalada). Dependente de R-001. Compromete pico 2026.2.

## 4. Bloqueios pendentes de IPOG

- **Bruno Azambuja:** confirmar 24 cidades médias (#20), 10 áreas acadêmicas (#21), naming MBA + produtos (#4), GA4 referrer/UTM, robots.txt aberto a IA crawlers (#6).
- **Ronan Maia:** decisão estratégica produto (R-001), pré-aprovar Tranche 0 Regional R$ 380-450k (#22), validar acessos GSC + GA4 (#36, D-06), validar escopo Frente Regional 51 cidades (#35, D-05).

## 5. O que foi entregue na semana 04-10/05

- Healthcheck completo (`docs/HEALTHCHECK-2026-05-10.md`)
- Reconciliação roadmap dual (Fases vs CTO Quarters)
- Bootstrap `STATUS.md` e `docs/ROADMAP_2026Q2-Q4.md`
- Atualização `README.md`, `ROADMAP.md`, `.github/PROJECT.md`
- 20 issues novas criadas (#38-#57): 6 gaps operacionais + 6 janelas curtas mercado + 8 regionais (NAIA-310 a NAIA-317)
- 8 issues órfãs vinculadas a milestones (#29 a #36)
- Comentário em #19 (Wikipedia) cruzando R-013 com gap de Entity Consistency em LLMs
- Ampliação benchmarking com pesquisa de mercado, notícias e reports 2026 (`audits/benchmarking/MERCADO-2026-NOTICIAS.md`)
- Aprofundamento regional estado-a-estado + Frente 51 cidades (`audits/benchmarking/REGIONAL-2026-ESTADOS-CIDADES.md`)
- 7 riscos novos detectados (R-013 a R-019) — issue #47 catalogada para incorporar ao risk register
- Contexto ampliado integrado em `docs/CONTEXTO-AMPLIADO-2026-05-10.md` (12 seções: tese ampliada, stakeholders, 5 vetores, personas refinadas, 5 grupos de concorrência, janelas curtas/médias/longas, KPIs derivados, mecânicas de moat, 3 horizontes do roadmap, decisões P0/P1/P2)
- Pesquisa de papers acadêmicos 2025-2026 entregue (`audits/benchmarking/PAPERS-2025-2026-PROFUNDIDADE.md` — 77 papers em 7 dimensões + sínteses cruzadas + 15 implicações)
- 3 issues acadêmicas criadas (#58 Wikipedia+Wikidata, #59 Voice Guard 2.0 com 9 enriquecimentos GEO, #60 Trilha IA+Saúde Mental com supervisão humana vs IBNeuro)
- **Ontologia e taxonomia canônicas** publicadas em `docs/ontologia/` (4 docs):
  - `ONTOLOGIA-CANONICA.md` — 12 catálogos de entidades + 28 relacionamentos Schema.org + 8 casos de uso
  - `TAXONOMIA-CONTEUDO.md` — pastas + naming + labels GitHub em 14 dimensões ortogonais + plano de migração
  - `KNOWLEDGE-GRAPH-IPOG.md` — grafo Mermaid + claims Wikidata canônicos + pipeline quinzenal de manutenção
  - `SCHEMA-IPOG-CANONICAL.md` — JSON-LD concreto pronto para deploy (8 blocos de instâncias)
- `audits/SCHEMA-PATTERNS.md` referenciando a camada ontologia
- **Cockpit estratégico multi-abas publicado:** `https://brasilgeo.ai/ipoggeoroadmap` (confidencial, noindex) — 11 abas (Visão Executiva, Now/Next/Later, Pilares Estratégicos, GEO, SEO, Conversão, UX, Analytics, Backlog, Riscos, Changelog) consolidando todo o programa GEO IPOG (5 vetores, 6 frameworks F1-F6, 8 marcos, 22 sprints, 19 riscos, 22 epics, 16 clusters SEO, 12 lead magnets, 5 MBAs). Repo: `alexandrebrt14-sys/brasilgeo-worker` · commit f886445.
- **Roadmap operacional incrementado** com 2 documentos novos:
  - `docs/GEO-FRAMEWORK-CANONICO.md` — síntese dos 6 frameworks GEO acoplados (F1 a F6) com papers-âncora 2024-2026 e pipeline operacional
  - `docs/ROADMAP-SPRINTS-2026-2027.md` — 22 sprints quinzenais cobrindo todos os 5 vetores e 6 frameworks com 125+ tasks programadas até pico 2027.1 (28-02-2027)
- **Relatório semanal W19 fechado e apresentação visual prontos:**
  - `docs/relatorios-semanais/2026-W19-04-a-10-maio.md` — 12 seções canônicas; envio para Bruno em 11-05 às 08h
  - `docs/relatorios-semanais/2026-W19-04-a-10-maio.html` — apresentação visual autocontida (HBR style) com gantt 8 marcos, 6 frameworks GEO, KPIs, 11 bloqueantes, riscos top 3, resultados Q2/Q3/Q4 2026 e Q1 2027 — pronta para apresentação 11-05 09h00 BRT
- **Camada de gestão operacional publicada** (`docs/gestao/`):
  - 7 squads (5 vetoriais V1-V5 + 2 transversais) com skills + capacidade + cadência operacional
  - Skills Matrix com identificação de single points of failure e gaps
  - Definition of Done canônico em 12 categorias (A1-A12) para PRs e issues
  - Status atual dos 12 concorrentes-base com semáforo + mapa regional
  - Resultados Pretendidos com KPIs por horizonte + modelo de receita
  - Roadmap Curto e Médio Prazo (síntese executiva)
- **GitHub config overhaul** aplicado via gh CLI (não-versionado, reflexão direta no repo):
  - **Settings:** Discussions habilitadas, delete-branch-on-merge ativado, homepage apontando para STATUS.md
  - **Topics:** 20 topics (limite GitHub) cobrindo geo, ai-search, knowledge-graph, frente-regional, voice-guard, wikipedia-pt-br, geo-framework, nr-1, saúde-mental-corporativa
  - **Labels:** 64+ labels canônicas criadas em 9 dimensões (vetor, persona, horizon, janela, framework, marco, risk, concorrente, squad, status, epic) — taxonomia completa em `docs/ontologia/TAXONOMIA-CONTEUDO.md`
  - **Milestones:** 8 marcos novos (M1 Bootstrap a M8 Pós-pico 2027.1) somando aos 5 Fases originais = 13 milestones cobrindo até maio 2027
  - **Epic issues:** 8 epics guarda-chuva criados (#61-#69) agregando todas as 60+ issues do programa por marco/vetor
  - **4 issue templates novos:** sprint-task.yml, epic.yml, regional-task.yml, risk-mitigation.yml
  - **PR template** atualizado com DoD canônico, 8 marcos, 5 vetores, 6 frameworks, squad responsável e KPIs a impactar

## 6. O que precisa rodar 11-17/05

| Atividade | Owner | Prazo |
|---|---|---|
| Bootstrap ata kickoff oficial | Alexandre | 11-05 |
| Bootstrap relatório semanal #1 | Alexandre | 11-05 |
| Reunião extraordinária IPOG | Alexandre + Bruno + Ronan | 13-05 |
| Configurar GA4 referrer/UTM | Bruno | 13-05 |
| Decisão produto IPOG | Ronan + Bruno | 15-05 |
| Iniciar coleta cross-LLM Fase 1 | Alexandre | 14-05 |
| Auditoria NAIA full inicial | Alexandre | 15-05 |
| Investigar workflow concorrentes-monitoring | Alexandre | 12-05 |

## 7. KPIs (placeholders Fase 1)

| KPI | Status | Próxima leitura |
|---|---|---|
| 1. LLM Mention Rate | N/D (a coletar 14-05) | 14-05-2026 |
| 2. Share-of-Voice | N/D (a coletar 14-05) | 14-05-2026 |
| 3. Citation Quality Score | N/D (a coletar 14-05) | 14-05-2026 |
| 4. Schema Coverage Score (NAIA) | N/D (auditoria 15-05) | 15-05-2026 |
| 5. Cobertura de fontes externas | N/D (mapear 15-05) | 15-05-2026 |
| 6. Velocidade fechamento de gaps | N/D | 31-05-2026 (final Fase 1) |
| 7. Conversion Lift por canal LLM | N/D (depende GA4) | 25-05-2026 |
| 8. Delta pré/pós Schema | N/D | 30-06-2026 (janela espelho) |

## 8. Cross-links

- `README.md` — escopo e governança
- `ROADMAP.md` — fases do programa
- `docs/HEALTHCHECK-2026-05-10.md` — auditoria completa
- `docs/ROADMAP_2026Q2-Q4.md` — masterplan CTO
- `docs/05-risk-register.md` — 12 riscos catalogados
- `docs/06-marcos-criticos-2026.md` — calendário com gatilhos
- `dashboards/KPI-DASHBOARD.md` — métricas ao vivo
- GitHub Issues: <https://github.com/alexandrebrt14-sys/geo-ipog/issues>
- GitHub Milestones: <https://github.com/alexandrebrt14-sys/geo-ipog/milestones>
