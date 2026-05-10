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
| Issues abertas | 53 | 23 novas criadas em 10-05 (#38-#60) — 6 gaps operacionais + 6 janelas curtas mercado + 8 regionais NAIA-310 a NAIA-317 + 3 acadêmicas |
| Documentos ontologia/taxonomia | 4 | `docs/ontologia/` — fonte de verdade para Schema canônico, naming, labels GitHub e Knowledge Graph |
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
