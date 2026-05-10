# 10 — Roadmap (6 fases)

> **Audiência primária:** CTO + CPO + Board
> **Cadência de revisão:** mensal no checkpoint executivo

## Visão geral

| Fase | Janela | Tema dominante |
|---|---|---|
| Fase 0 — Discovery e fundação | 11-31 maio 2026 | Auditoria + ontologia + taxonomia + menus + KPIs |
| Fase 1 — MVP de autoridade e conversão | 01 jun a 30 ago 2026 | Home + Hub MBAs + 5 páginas curso + 5 temas + Quiz + SEO básico |
| Fase 2 — SEO programático nacional e estadual | 01 set a 30 nov 2026 | 27 UFs + curso×UF + tema×UF + sitemap programático |
| Fase 3 — Comparativos e personalização | 01 dez 2026 a 28 fev 2027 | 10+ comparativos + recomendação personalizada + segmentação por persona |
| Fase 4 — Comunidade, dados e otimização | 01 mar a 31 maio 2027 | Webinars + newsletter + lead scoring + A/B + dashboard performance |
| Fase 5 — Escala e inteligência editorial | 01 jun 2027 em diante | Automação editorial + IA assistiva + integração CRM + BI |

---

## Fase 0 — Discovery e fundação (11-31 maio 2026)

**Objetivo:** alinhar fundação documental + decisões de stack + validação Stone-side dos campos canônicos.

**Entregáveis:**

- Auditoria do repositório (ver `README.md` desta pasta)
- 16 documentos canônicos publicados (esta entrega)
- 6 YAMLs estruturados (`/data/`)
- Validação dos cursos canônicos com coordenação acadêmica IPOG
- Decisão de stack (Next.js 16 + Tailwind v4)
- Decisão de hospedagem (proposta: Cloudflare Workers + Pages)
- Decisão de CMS (proposta: Markdown versionado no monorepo)
- Decisão de auth (sem auth no MVP)
- Decisão de CRM (a confirmar com IPOG)

**Páginas/menus contemplados:** todos (mapeados; não implementados)

**RFs associados:** todos os 40

**Esforço estimado:** 80-100h (apenas docs + decisões)

**Impacto esperado:** zero ainda (fundação)

**Dependências:** validação Bruno + coordenação acadêmica IPOG

**Riscos:** Bruno e Ronan não disponíveis para validar dados canônicos em 30 dias

**Critérios de aceite:** todos os 16 documentos publicados + 6 YAMLs validados + decisões registradas em ata

**DoD:** 19 perguntas-critério respondidas (`16-definition-of-done.md`)

**Métricas de sucesso:** docs publicados; ATAS de decisão registradas

---

## Fase 1 — MVP de autoridade e conversão (jun-ago 2026)

**Objetivo:** publicar **portal funcional** com 50+ páginas indexáveis + captura de lead operacional.

**Entregáveis:**

- Home `/` (RF-001)
- Hub MBAs `/mba-psicologia/` (RF-002)
- 5 páginas individuais de curso (RF-003): MBA POT (flagship) + MBA Psi Positiva + MBA Reab Neuropsi + MBA Neurociência + MBA Gestão Pessoas
- 5 páginas de tema prioritário (RF-005): NR-1 + Saúde Mental + POT + People Analytics + Liderança Positiva
- Quiz "Qual MBA combina com você?" (RF-013)
- Busca interna (RF-014)
- Glossário inicial (50 termos)
- Lead forms operacionais + integração CRM (RF-022, RF-023)
- WhatsApp captação (RF-024)
- 10 lead magnets (e-books + checklists + webinars)
- SEO técnico: sitemap + robots + canonical + Schema (RF-030 a RF-034)
- llms.txt no ar
- PostHog tracking 20+ eventos
- Lighthouse ≥ 90 mobile em 100% das páginas

**Páginas/menus contemplados:** Início, MBAs em Psicologia, Temas em Alta (5 dos 14), Recursos Gratuitos (parcial), Sobre IPOG, Quiz, Busca

**Esforço estimado:** ~600-800h engenharia + ~400h conteúdo (sub-agents Opus paralelos)

**Impacto esperado:** baseline cross-LLM + 5.000-15.000 sessões orgânicas/mês até fim Fase 1

**Dependências:** Fase 0 fechada + auth não-bloqueante (sem auth) + decisões IPOG destravadas

**Riscos:** conteúdo demora mais que código (mitigação: pipeline Opus paralelos); Stone Marketing não aprovar copy a tempo

**Critérios de aceite:**

- 50 páginas indexáveis
- Lighthouse ≥ 90 mobile em 100%
- Schema validado em Rich Results Test (sem erros)
- 30 leads/mês mensurados em PostHog
- Mention rate cross-LLM baseline coletado

**DoD:** todos os 40 RFs Must implementados + 100% Schema validado + 100% LGPD compliance

---

## Fase 2 — SEO programático nacional e estadual (set-nov 2026)

**Objetivo:** capturar demanda local + cobertura SEO 27 UFs + sub-páginas programáticas.

**Entregáveis:**

- 27 páginas estaduais (RF-009)
- 135 páginas curso × UF (RF-010)
- ~80-135 páginas tema × UF (RF-011)
- Sitemap programático com sub-sitemaps
- Estratégia anti-thin-content (≥ 800 palavras únicas/UF + dados locais)
- Linkagem interna automatizada (toda página linka 3+ outras)
- 7 hubs de persona (RF-007)
- 9 trilhas de carreira (RF-007 estendido)
- Hub Glossário expandido (~150 termos)
- Páginas de cidade Frente Regional (51, NAIA-310)

**Páginas/menus contemplados:** Por Estado (todos), Para Quem (todos), Carreira (todos)

**Esforço estimado:** ~400-500h engenharia (templates programáticos) + ~600h conteúdo

**Impacto esperado:** sessões orgânicas 50.000+/mês; leads 100+/mês; cobertura ≥ 1 UF top-10 SEO

**Dependências:** Fase 1 fechada + dados oficiais 27 UFs validados (NAIA-310 confirma 51 cidades)

**Riscos:** thin content em UFs sem demanda real (mitigação: dados locais reais ou page-level noindex)

**Critérios de aceite:**

- 27 UFs publicados com Schema válido
- Lighthouse ≥ 90 mobile em 90% das páginas estaduais
- ≥ 5 UFs com top-5 ranking em queries-âncora locais
- 51 cidades com landing local (Frente Regional)

---

## Fase 3 — Comparativos e personalização (dez 2026 a fev 2027)

**Objetivo:** capturar tráfego comparativo + personalização por persona.

**Entregáveis:**

- 12+ páginas comparativas (RF-012)
- Recomendação personalizada (RF-019, RF-020)
- Segmentação dinâmica por persona × intenção × estado
- A/B testing operacional (PostHog feature flags)
- Action Plan generator (output do quiz vira plano personalizado)

**Páginas/menus contemplados:** Comparativos (todos)

**Esforço estimado:** ~300h engenharia + ~250h conteúdo (cada comparativa exige curadoria + revisão jurídica)

**Impacto esperado:** sessões orgânicas 100.000+/mês; leads 250+/mês; conversion lift +30% via personalização

**Dependências:** Fase 2 fechada + governança jurídica IPOG

**Riscos:** comparativos gerarem risco jurídico (mitigação: gate jurídico antes do publish + linguagem factual)

**Critérios de aceite:**

- 12 comparativas factuais publicadas
- 0 reclamações jurídicas após 60 dias de publicação
- Mention rate cross-LLM em queries comparativas ≥ concorrentes

---

## Fase 4 — Comunidade, dados e otimização (mar-mai 2027)

**Objetivo:** lock-in via comunidade + otimização data-driven.

**Entregáveis:**

- Webinars mensais com captura
- Newsletter quinzenal
- Lead scoring (CRM-side)
- Dashboard de performance (interno)
- A/B testing sistemático em landing pages e CTAs
- Otimização por estado (UFs com baixo ROAS recebem ajuste de copy + CTA)
- Inscrição em eventos presenciais nas 51 cidades (Frente Regional)

**Esforço estimado:** ~250h engenharia + 100h growth/marketing

**Impacto esperado:** sessões 150.000+/mês; leads 400+/mês; matrícula atribuída +50%

---

## Fase 5 — Escala e inteligência editorial (jun 2027+)

**Objetivo:** automação + IA assistiva + integração avançada.

**Entregáveis:**

- Automação editorial (sub-agents Opus paralelos integrados ao CMS)
- Detecção automática de gaps de conteúdo (queries sem página correspondente)
- Atualização periódica de temas 2025/2026 com alerta automático
- Expansão internacional de benchmarks (em-uS landing opcional)
- Integração avançada com CRM IPOG + BI executivo
- IA assistiva no portal (chat contextual sobre conteúdo lido)

**Impacto esperado:** sessões 200.000+/mês; leads 600+/mês; CAC orgânico -30%

---

## KPIs alvo por fase

| KPI | Fase 0 | Fase 1 | Fase 2 | Fase 3 | Fase 4 | Fase 5 |
|---|---|---|---|---|---|---|
| Sessões orgânicas/mês | 0 | 5-15k | 50k | 100k | 150k | 200k+ |
| Leads/mês | 0 | 30 | 100 | 250 | 400 | 600+ |
| Páginas indexáveis | 0 | 50 | ~500 | ~700 | ~900 | 2.000+ |
| Comparativos | 0 | 0 | 0 | 12+ | 12+ | 20+ |
| Mention rate cross-LLM | baseline | +5pp | +15pp | +25pp | +35pp | +50pp+ |

## Cross-links

- `01-contexto-estrategico.md` — KPIs canônicos
- `11-backlog.md` — épicos e features
- `13-metricas-e-analytics.md` — eventos e Playbook de Conversão
- `15-riscos-assuncoes-e-dependencias.md`
