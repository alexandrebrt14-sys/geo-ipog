# 07 — Requisitos Funcionais (40 RFs)

> **Audiência primária:** CTO + Engenharia + Produto

Padrão: cada RF tem **descrição + objetivo de negócio + persona impactada + prioridade (Must/Should/Could/Won't) + critérios de aceite + dependências + analytics**.

---

## RF-001 — Página inicial do portal

**Descrição:** home `/` apresenta IPOG e conduz para curso/tema/persona/estado.
**Persona:** todas. **Prioridade:** Must.
**Critérios:** Hero + 8-12 blocos canônicos + 5 cards de curso + quiz CTA + Schema Organization + WebSite + SearchAction; Lighthouse ≥ 90 mobile; navegação por keyboard.
**Dependências:** 5 cards de curso publicados; quiz funcional.
**Analytics:** `home_view`, `home_section_clicked`, `home_cta_clicked`.

## RF-002 — Hub de MBAs em Psicologia

**Descrição:** `/mba-psicologia/` lista todos MBAs com filtros e cards.
**Persona:** todas (exploratório principalmente). **Prioridade:** Must.
**Critérios:** filtros por cluster + persona + modalidade; cards com badge "flagship" para MBA POT; comparador "Comparar MBAs" CTA destacado.
**Analytics:** `mba_hub_filter_applied`, `mba_card_clicked`.

## RF-003 — Página individual de cada MBA (5 cursos prioritários)

**Descrição:** página dedicada por MBA com matriz curricular + módulos + professores + capstone + certificado + lead form + FAQ + cases + comparativo.
**Persona:** persona-alvo do curso. **Prioridade:** Must.
**Critérios:** Schema Course + EducationalOccupationalProgram (programType: MBA) + 9 propriedades obrigatórias; Voice Guard 2.0 ≥ 7/9; cross-link com 3+ comparativos + 1 quiz + 5+ ContentItems.
**Dependências:** matriz curricular validada com coordenação acadêmica IPOG.
**Analytics:** `course_page_view` (com course_id), `course_module_expanded`, `lead_form_started`, `lead_form_submitted`, `whatsapp_clicked`, `consultant_clicked`.

## RF-004 — Hub de temas em alta

**Descrição:** `/temas/` com 14 temas canônicos.
**Prioridade:** Must.
**Analytics:** `theme_hub_view`, `theme_card_clicked`.

## RF-005 — Página de tema

**Descrição:** `/temas/{slug-tema}/` com pillar SEO content + cross-link cursos + cases + glossário + lead magnet.
**Prioridade:** Must.
**Critérios:** Schema Article; ≥ 1500 palavras; ≥ 3 cursos cross-linkados; ≥ 5 sources; FAQ attached.
**Analytics:** `theme_page_view`, `theme_lead_magnet_downloaded`.

## RF-006 — Hub por persona

**Descrição:** `/para-quem/` com 12 perfis profissionais. **Prioridade:** Should.

## RF-007 — Página por persona

**Descrição:** `/para-quem/{slug-persona}/` com narrativa de carreira + cursos recomendados + jornada de conteúdos. **Prioridade:** Should.

## RF-008 — Hub geográfico

**Descrição:** `/por-estado/` com mapa Brasil clicável + lista 27 UFs. **Prioridade:** Must.

## RF-009 — Páginas por estado (27 UFs)

**Descrição:** `/por-estado/{uf}/` com cursos prioritários + temas locais + competidores locais + CTAs locais. **Prioridade:** Must.
**Critérios:** ≥ 800 palavras únicas (anti-thin-content); Schema Place + WebPage + areaServed; cidades-âncora linkadas; pelo menos 1 lead magnet localizado.
**Riscos:** thin content. Mitigação: dados locais, ângulo editorial específico, citações de mídia regional.

## RF-010 — Páginas curso × estado

**Descrição:** `/por-estado/{uf}/{slug-curso}/` com headline localizada. **Prioridade:** Should.
**Total:** 5 cursos × 27 UFs = 135 páginas (Fase 2).

## RF-011 — Páginas tema × estado

**Descrição:** `/por-estado/{uf}/temas/{slug-tema}/`. **Prioridade:** Could.

## RF-012 — Página comparativa

**Descrição:** comparação factual IPOG vs concorrente. **Prioridade:** Must (10+ comparativas no MVP).
**Critérios:** matriz comparativa por critérios; "validation_status" por linha; Schema Article; sem linguagem difamatória; "pendente de validação" quando aplicável.
**Governança:** revisão jurídica antes do publish (`12-governanca-editorial.md`).

## RF-013 — Ferramenta "Qual MBA combina com você?"

**Descrição:** quiz interativo com 8-12 perguntas + lead capture no final + recomendação de 1-2 MBAs prioritários. **Prioridade:** Must.
**Critérios:** Schema Quiz; tempo de conclusão ≤ 3 min; estado salvo em LocalStorage; lead form opcional; recomendação determinística baseada em scoring por persona × dor × intenção.

## RF-014 — Busca interna

**Descrição:** input no header + página `/busca` + autosuggest + debounce 200ms + filtros. **Prioridade:** Must.
**Critérios:** indexação Algolia/MeiliSearch; busca em todas as entidades; ranking ver `06-BUSCA-GLOBAL.md` (Stone) — adaptado.

## RF-015 — Filtros multi-dimensão

**Descrição:** filtros por curso + tema + persona + estado + intenção em listagens. **Prioridade:** Must.

## RF-016 — Sistema de tags

**Descrição:** cada ContentItem tagueado em 8 eixos taxonômicos. **Prioridade:** Must.

## RF-017 — Breadcrumbs

**Descrição:** breadcrumb visível em todas páginas exceto Home + Schema BreadcrumbList. **Prioridade:** Must.

## RF-018 — Cards de conteúdo

**Descrição:** componente reutilizável com metadados (título, resumo, área, tipo, tempo de leitura, persona, estado quando aplicável). **Prioridade:** Must.

## RF-019 — Recomendações de conteúdo

**Descrição:** algoritmo determinístico (mesmo Topic 60% + Persona 25% + JourneyStage 10% + State 5%). **Prioridade:** Must.

## RF-020 — Recomendações de curso

**Descrição:** baseada em quiz + comportamento + página atual. **Prioridade:** Should.

## RF-021 — CTA contextual

**Descrição:** CTA varia por jornada + persona. **Prioridade:** Must.

## RF-022 — Formulários de lead

**Descrição:** lead forms em landing pages, lead magnets, webinars. **Prioridade:** Must.
**Critérios:** ≤ 5 campos no MVP; LGPD checkbox + termo de consentimento; honeypot anti-spam; envio integrado a CRM (RF-023).

## RF-023 — Integração com CRM

**Descrição:** integração com CRM IPOG (RD Station, HubSpot ou similar — a confirmar). **Prioridade:** Must.
**Dependências:** acesso à API do CRM IPOG.

## RF-024 — Captação por WhatsApp

**Descrição:** botão flutuante + CTA "Falar no WhatsApp" + mensagem pré-preenchida com contexto da página. **Prioridade:** Must.

## RF-025 — Download de materiais

**Descrição:** lead magnet com gating (lead form antes do download). **Prioridade:** Must.

## RF-026 — Inscrição em webinars

**Descrição:** página de webinar com inscrição + email automático + recording após. **Prioridade:** Should.

## RF-027 — Página de agradecimento

**Descrição:** página pós-conversão com próximos passos + cross-sell. **Prioridade:** Must.

## RF-028 — Tracking de eventos

**Descrição:** PostHog + Google Analytics 4 + integração CRM. **Prioridade:** Must.

## RF-029 — FAQ estruturado

**Descrição:** FAQ por curso + tema + estado + jornada com Schema FAQPage. **Prioridade:** Must.

## RF-030 — Schema markup

**Descrição:** Schema.org em todas páginas conforme tipo. **Prioridade:** Must.
**Critérios:** Rich Results Test sem erros em 100% das páginas.

## RF-031 — Sitemap XML

**Descrição:** `/sitemap.xml` + sub-sitemaps (cursos, temas, estados, recursos). **Prioridade:** Must.

## RF-032 — Robots e metadados SEO

**Descrição:** `/robots.txt` aberto a IA crawlers + meta tags + canonical em todas páginas. **Prioridade:** Must.

## RF-033 — Canonicals

**Descrição:** `<link rel="canonical">` em todas páginas. **Prioridade:** Must.

## RF-034 — Redirecionamentos

**Descrição:** 301 redirects para slugs alterados + 410 gone para conteúdo descontinuado. **Prioridade:** Must.

## RF-035 — Controle editorial

**Descrição:** workflow editorial (rascunho → revisão → aprovação → publicação) + versionamento. **Prioridade:** Should.

## RF-036 — Campos para fontes e evidências

**Descrição:** todo ContentItem tem campo `sources` + `evidence_strength`. **Prioridade:** Must.

## RF-037 — Mecanismo de atualização de conteúdos sensíveis

**Descrição:** alerta para conteúdos com `data_validade < hoje + 90 dias`. **Prioridade:** Should.

## RF-038 — Templates programáticos por estado

**Descrição:** template canônico para `/por-estado/{uf}/{slug-curso}/` com placeholders + dados específicos. **Prioridade:** Must.

## RF-039 — Templates programáticos por comparação

**Descrição:** template canônico para `/comparativos/ipog-vs-{slug-concorrente}/` com matriz + governança. **Prioridade:** Must.

## RF-040 — Dashboard editorial básico

**Descrição:** painel interno (não público) com lista de conteúdos + status + última atualização + próxima revisão. **Prioridade:** Could (Fase 2).

---

## Cross-links

- `04-taxonomia.md` (8 eixos usados nos filtros)
- `08-requisitos-nao-funcionais.md`
- `13-metricas-e-analytics.md` (eventos canônicos)
- `12-governanca-editorial.md` (regras de comparativos)
