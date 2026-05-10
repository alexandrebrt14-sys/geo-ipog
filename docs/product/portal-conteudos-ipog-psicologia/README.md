# Portal de Conteúdos IPOG · MBAs em Psicologia

> **Status:** documentação de produto vigente desde 2026-05-10
> **Dono:** Alexandre Caramaschi (Brasil GEO) — Principal Product Strategist + Information Architect
> **Cliente:** IPOG (Instituto de Pós-Graduação e Graduação) — área de Psicologia
> **Validação:** Bruno Azambuja (Marketing IPOG) + Ronan Maia (CEO IPOG) + coordenação acadêmica
> **Próxima revisão:** 24-05-2026 (quinzenal durante M1)

Documentação completa de **requisitos, arquitetura, ontologia, taxonomia, menus, roadmap e backlog** para o **Portal de Conteúdos sobre MBAs em Psicologia do IPOG** — plataforma editorial e de aquisição que combina conteúdo educacional + SEO nacional/local + comparação competitiva + jornadas por persona + captação de leads + conversão para matrícula.

A tese estratégica:

> **"O IPOG deve ser percebido como a instituição mais relevante, prática, atualizada e orientada a carreira para profissionais que querem aplicar Psicologia em organizações, saúde mental, liderança, neurociência, desenvolvimento humano e performance."**

A leitura é prescritiva: portal sem ontologia vira blog; sem taxonomia vira labirinto; sem segmentação por estado vira commodity nacional; sem comparativo competitivo perde lead na fase de decisão.

---

## 1. Auditoria do repositório (estado em 10-05-2026)

### 1.1 Stack identificado

- **Repositório:** `alexandrebrt14-sys/geo-ipog` (privado)
- **Tipo:** repositório de programa GEO (Generative Engine Optimization) — documentação + workflows + benchmarking
- **Não há código de aplicação** (front-end/back-end). Repositório opera como **fonte de verdade documental** para o programa GEO IPOG executado pela Brasil GEO.
- **Convenção de docs:** Markdown + YAML, organizado em pastas semânticas: `audits/`, `content/`, `dashboards/`, `data/`, `docs/`, `prompts/`, `.github/`
- **Workflows ativos:** quality (markdown lint + link check), concorrentes-monitoring (snapshot quinzenal automático), labeler, report-builder, stale
- **Issue templates:** 6 templates iniciais + 4 templates novos (sprint-task, epic, regional-task, risk-mitigation)
- **PR template:** atualizado com DoD canônico em 12 categorias (`docs/gestao/DEFINITION-OF-DONE-CANONICO.md`)

### 1.2 Documentação canônica pré-existente leveragada por esta entrega

| Documento | Uso nesta entrega |
|---|---|
| `docs/02-contexto-mba-online-psicologia.md` | Recorte de produto MBA Online de Psicologia (3 clusters semânticos) |
| `docs/CONTEXTO-AMPLIADO-2026-05-10.md` | Tese ampliada + 5 vetores + 7 personas-base |
| `docs/05-risk-register.md` | 19 riscos catalogados (R-001 a R-019) |
| `docs/ontologia/ONTOLOGIA-CANONICA.md` | Entidades canônicas (org/unit/program/course/person/place/...) — base para `03-ontologia.md` |
| `docs/ontologia/TAXONOMIA-CONTEUDO.md` | Taxonomia GitHub em 14 dimensões — base para `04-taxonomia.md` |
| `docs/ontologia/SCHEMA-IPOG-CANONICAL.md` | JSON-LD pronto para deploy (Schema.org) |
| `docs/GEO-FRAMEWORK-CANONICO.md` | F1-F6 frameworks GEO (Aggarwal, AutoGEO, Structural, AgenticGEO, Wikipedia/KG, Citation Mechanics) |
| `docs/ROADMAP-SPRINTS-2026-2027.md` | 22 sprints quinzenais até pico 2027.1 |
| `audits/benchmarking/MBA-PSICOLOGIA-MERCADO-2026-EXPANDIDO.md` | SWOT mercado + IPOG + flagship product proposto + 22+ concorrentes catalogados |
| `audits/benchmarking/MERCADO-2026-NOTICIAS.md` | Sinais de mercado 2026 (NR-1, Decreto 12.456, AI search, etc.) |
| `audits/benchmarking/REGIONAL-2026-ESTADOS-CIDADES.md` | Cobertura estado-a-estado + 51 cidades Frente Regional |
| `audits/benchmarking/PAPERS-2025-2026-PROFUNDIDADE.md` | 77 papers acadêmicos sustentando frameworks |

### 1.3 Achados principais da auditoria

1. **Fundação documental forte (HBR-grade, score 9/10)** — `docs/ontologia/`, `docs/gestao/`, `audits/benchmarking/` já existem e cobrem 60% do que esta especificação precisa. **Não vamos duplicar — vamos referenciar e expandir.**
2. **Lacuna identificada:** não há documento de produto orientado a **portal editorial** (frontend de conteúdos). A especificação atual cobre programa GEO operacional, não interface pública para captação de alunos.
3. **Lacuna identificada:** nenhuma página por estado brasileiro mapeada — apesar da Frente Regional 51 cidades estar definida em `docs/framework/05-estrategia-regional-geo-educacao.md`.
4. **Lacuna identificada:** comparativos contra concorrentes catalogados em `MBA-PSICOLOGIA-MERCADO-2026-EXPANDIDO.md` mas sem template de página pública comparativa.
5. **Lacuna identificada:** taxonomia de conteúdo editorial (formato + intenção + jornada) precisa de granularidade adicional para alimentar SEO programático.
6. **Convenção pt-BR:** todos os documentos do repositório seguem PT-BR com acentuação completa, sem emojis, naming canônico ("IPOG", "Brasil GEO", "MBA Online de Psicologia [Cluster]"). Essa especificação respeita.

### 1.4 Decisões tomadas nesta entrega

1. **Pasta canônica:** `/docs/product/portal-conteudos-ipog-psicologia/` (segue convenção de produto separada do programa GEO)
2. **22 arquivos:** 16 markdown numerados (00 README + 01-16) + 6 YAML em `/data` (ontology, taxonomy, content-types, menu-map, seo-page-types, state-pages)
3. **Wave delivery:** 5 waves complementares com health check final (cross-link verificado, naming canônico, alinhamento com fundação existente)
4. **Sem invenção factual:** dados sobre cursos, preços, professores, datas IPOG marcados como `Pendente de validação` quando não confirmados por Bruno
5. **Tese ampliada incorporada:** flagship product proposto em `MBA-PSICOLOGIA-MERCADO-2026-EXPANDIDO.md` é o produto-líder canônico do portal

### 1.5 Próximos passos recomendados (após esta documentação ser aceita)

1. Validação Bruno Azambuja (Marketing IPOG) e coordenação acadêmica IPOG sobre dados marcados como pendência
2. Decisão sobre stack front-end (proposta: Next.js 16 + React 19 + Tailwind CSS v4 — alinhado com `landing-page-geo`)
3. Decisão sobre hospedagem (proposta: Cloudflare Workers + Pages ou Vercel)
4. Decisão sobre CMS (proposta: Markdown versionado no monorepo no MVP, sem CMS visual)
5. Decisão sobre auth (proposta: sem auth no MVP — diagnóstico em LocalStorage)
6. Sprint 0 de discovery: validação dos campos de cada `Course`, `Persona`, `Topic`
7. Sprint 1 de implementação: Home + Hub MBAs + 5 páginas de curso prioritárias + 1 página comparativa + Schema canônico

---

## 2. Estrutura desta documentação

### 2.1 Documentos canônicos (16)

| # | Arquivo | Foco |
|---|---|---|
| 01 | `01-contexto-estrategico.md` | North Star Metric + objetivos + KPIs + Strategic Moat |
| 02 | `02-personas-e-jornadas.md` | 6 personas com dores + jobs + objeções + jornadas |
| 03 | `03-ontologia.md` | 40 entidades + atributos + relacionamentos |
| 04 | `04-taxonomia.md` | 8 eixos taxonômicos + cobertura por estado |
| 05 | `05-arquitetura-da-informacao.md` | 18 áreas + sitemap + breadcrumbs + canonical |
| 06 | `06-menus-e-submenus.md` | 9 menus + ~80 submenus com requisitos |
| 07 | `07-requisitos-funcionais.md` | 40 RFs (Must/Should/Could/Won't) |
| 08 | `08-requisitos-nao-funcionais.md` | Performance + a11y + SEO + LGPD + governança |
| 09 | `09-seo-e-conteudo-programatico.md` | 16 clusters + ~20 templates de página programática |
| 10 | `10-roadmap.md` | 6 fases (Fase 0 a Fase 5) |
| 11 | `11-backlog.md` | 16 épicos + features + user stories |
| 12 | `12-governanca-editorial.md` | Tom de voz + claims + comparativos + LGPD |
| 13 | `13-metricas-e-analytics.md` | Eventos + propriedades + Playbook de Conversão |
| 14 | `14-benchmark-competitivo.md` | Framework + matriz + 22+ concorrentes |
| 15 | `15-riscos-assuncoes-e-dependencias.md` | Riscos + assunções + dependências externas |
| 16 | `16-definition-of-done.md` | Critérios objetivos por entregável |

### 2.2 YAMLs estruturados (6)

| Arquivo | Conteúdo |
|---|---|
| `data/ontology.yaml` | 40 entidades com atributos required/optional |
| `data/taxonomy.yaml` | 8 eixos taxonômicos com valores canônicos |
| `data/content-types.yaml` | 22 tipos de conteúdo do portal |
| `data/menu-map.yaml` | Mapa completo de menus + submenus |
| `data/seo-page-types.yaml` | Templates programáticos com regras |
| `data/state-pages.yaml` | 27 UFs com configuração específica |

---

## 3. Cross-links externos (programa GEO IPOG)

- `ROADMAP.md` (raiz) — fases do programa (visão cliente)
- `docs/ROADMAP-SPRINTS-2026-2027.md` — sprints quinzenais com tasks por vetor
- `docs/CONTEXTO-AMPLIADO-2026-05-10.md` — tese ampliada e 5 vetores
- `docs/HEALTHCHECK-2026-05-10.md` — auditoria estrutural completa
- `docs/ontologia/` — Schema canônico + Knowledge Graph IPOG
- `audits/benchmarking/MBA-PSICOLOGIA-MERCADO-2026-EXPANDIDO.md` — flagship product proposto
- `STATUS.md` — snapshot semanal vivo

---

## 4. Histórico de revisões

| Data | Revisão | Autor |
|---|---|---|
| 10-05-2026 | Wave 1 — audit + 01-02 publicados | Alexandre Caramaschi |
| 10-05-2026 | Wave 2 — 03-04 + 3 YAMLs publicados | Alexandre Caramaschi |
| 10-05-2026 | Wave 3 — 05-06-07-08 + menu-map.yaml | Alexandre Caramaschi |
| 10-05-2026 | Wave 4 — 09-10-11 + seo + state-pages YAML | Alexandre Caramaschi |
| 10-05-2026 | Wave 5 — 12-13-14-15-16 + Strategic Moat + Playbook + health check | Alexandre Caramaschi |
