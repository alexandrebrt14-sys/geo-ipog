# 13 — Métricas e Analytics + Playbook de Conversão

> **Audiência primária:** Produto + Growth + Marketing + Engenharia

## 1. Stack analytics

- **PostHog** (analytics + feature flags + heatmap + session recording)
- **GA4** (canal Google + Search Console)
- **Bing Webmaster Tools** (cobertura Bing AI Performance)
- **CRM IPOG** (a confirmar — RD Station, HubSpot ou similar)

## 2. Eventos canônicos

| Evento | Descrição | Quando dispara |
|---|---|---|
| `page_view` | Visualização de página | Toda página carregada |
| `content_view` | Visualização de ContentItem | Após scroll de 25% |
| `course_card_click` | Clique em card de curso em listagem | onClick |
| `course_page_view` | Página de curso aberta | Mount |
| `state_page_view` | Página de estado aberta | Mount |
| `comparison_view` | Comparativo aberto | Mount |
| `quiz_start` | Quiz iniciado | Primeira pergunta respondida |
| `quiz_complete` | Quiz concluído | Última pergunta + resultado |
| `lead_form_start` | Lead form aberto | Click em CTA do form |
| `lead_form_submit` | Lead form enviado | Submit success |
| `whatsapp_click` | Click em botão WhatsApp | onClick |
| `consultant_click` | Click em "Falar com consultor" | onClick |
| `download_click` | Download de material | onClick |
| `webinar_signup` | Inscrição em webinar | Submit |
| `faq_expand` | FAQ expandido | onClick item FAQ |
| `cta_click` | Click em CTA genérico | onClick |
| `scroll_50` | Scroll passou 50% | Scroll milestone |
| `scroll_90` | Scroll passou 90% | Scroll milestone |
| `search_submit` | Busca submetida | Submit input |
| `filter_apply` | Filtro aplicado | onChange filtro |
| `course_compare` | Comparar cursos clicado | onClick |

### 2.1 Eventos por etapa da jornada

| Etapa | Eventos esperados |
|---|---|
| Awareness | `page_view`, `content_view`, `scroll_50` |
| Problem-discovery | `theme_page_view`, `download_click` (lead magnet), `quiz_start` |
| Solution-discovery | `course_card_click`, `course_page_view`, `quiz_complete` |
| Consideration | `lead_form_start`, `webinar_signup`, `faq_expand` |
| Comparison | `comparison_view`, `course_compare` |
| Decision | `consultant_click`, `whatsapp_click`, `lead_form_submit` |
| Enrollment | `cta_click` (matrícula) |

## 3. Propriedades de payload

```yaml
payload_minimum:
  - course_id            # uuid
  - course_name          # naming canônico
  - persona              # slug (ver taxonomy.yaml)
  - journey_stage        # awareness/consideration/decision/etc.
  - topic                # slug primário
  - state                # uf (quando aplicável)
  - city                 # slug (quando aplicável)
  - content_type         # artigo/guia/curso/etc.
  - cta_type             # baixar-material/agendar-conversa/etc.
  - lead_source          # organic/paid/direct/referral
  - search_intent        # informacional/comparativa/transacional
  - comparison_target    # competitor slug (quando comparison_view)
  - utm_source
  - utm_medium
  - utm_campaign
  - device_type          # mobile/desktop/tablet
  - is_logged_in
  - session_id
  - timestamp
```

## 4. KPIs por etapa de funil

| Etapa | KPI | Meta MVP Fase 1 | Meta Fase 3 |
|---|---|---|---|
| Aquisição | Sessões orgânicas/mês | 5-15k | 100k |
| Aquisição | LLM Mention Rate | baseline | +25pp |
| Engajamento | Páginas/sessão | ≥ 1,8 | ≥ 2,2 |
| Engajamento | Scroll 50% | ≥ 50% | ≥ 65% |
| Engajamento | Tempo médio | ≥ 2 min | ≥ 3 min |
| Conversão | Visitor → Lead | ≥ 2,5% | ≥ 3,5% |
| Conversão | Leads/mês | 30 | 250 |
| Conversão | Lead → Matrícula | ≥ 8% | ≥ 12% |
| Conversão | Matrícula atribuída | 2-5/mês | 25-30/mês |

---

## 5. Playbook de Conversão

> **Tese:** conversão não é evento aleatório — é conjunto de mecânicas testáveis.

### 5.1 Lead magnets canônicos (top 12)

| # | Lead Magnet | Persona-alvo | Etapa | Custo de produção |
|---|---|---|---|---|
| 1 | Guia "NR-1 atualizada para RH em 2026" (e-book 30 páginas) | Persona 2 (RH) | awareness/problem-discovery | Médio |
| 2 | Checklist "Como diagnosticar riscos psicossociais" | Persona 2/3 (RH/líder) | solution-discovery | Baixo |
| 3 | Quiz "Qual MBA em Psicologia combina com você?" | Persona 6 (exploratório) | problem-discovery | Médio |
| 4 | Webinar "Saúde Mental Corporativa: dados 2026" | Persona 2/3/4 | consideration | Médio |
| 5 | E-book "Carreira em Psicologia Organizacional" | Persona 1 (psicóloga expansão) | awareness | Médio |
| 6 | Guia "Como migrar da clínica para Psicologia Organizacional" | Persona 1 | problem-discovery | Médio |
| 7 | Webinar "People Analytics: do básico ao avançado" | Persona 2/4 | consideration | Médio |
| 8 | Diagnóstico "Maturidade RH em saúde mental" | Persona 2 | solution-discovery | Médio |
| 9 | E-book "10 papers que mudam a Psicologia Organizacional 2026" | Persona 1/4 | awareness | Baixo |
| 10 | Calculadora "ROI de programa de bem-estar corporativo" | Persona 2/3 | consideration | Alto |
| 11 | Guia "Capstone executivo: como fazer diagnóstico organizacional" | Persona 1/2/4 | comparison/decision | Médio |
| 12 | Webinar "Liderança Positiva: 7 práticas com base científica" | Persona 3 | consideration | Médio |

### 5.2 Segmentação por persona × CTAs ideais

| Persona | CTA primário (awareness) | CTA primário (decision) |
|---|---|---|
| P1 — Psicóloga | "Baixar guia de carreira em Psi Organizacional" | "Solicitar matriz curricular MBA POT" |
| P2 — RH | "Baixar guia NR-1 para RH" | "Falar com consultor sobre flagship MBA POT" |
| P3 — Líder | "Inscrever em webinar 'Saúde Mental dados 2026'" | "Agendar conversa estratégica com coordenação" |
| P4 — Consultor | "Baixar kit de slides para pitch corporativo" | "Solicitar parceria de mentoria" |
| P5 — Saúde/educação | "Baixar guia carreira em Neuropsicologia" | "Solicitar matriz MBA Reab Neuropsi" |
| P6 — Exploratório | "Fazer quiz Qual MBA combina com você" | (depende do resultado do quiz) |

### 5.3 Segmentação por estado × CTA local

- **GO/DF/MT/MS/TO/BA/MA/PA (Frente Regional):** "Falar com unidade local em [Cidade]" (high-touch)
- **SP/RJ/MG/RS/PR (concorrência alta):** ênfase em diferencial (online ao vivo + capilaridade regional)
- **N/NE com baixa demanda:** lead magnet + WhatsApp (sem unidade local)

### 5.4 Experimentos A/B prioritários (Fase 2+)

| ID | Hipótese | Teste | Métrica |
|---|---|---|---|
| EXP-01 | Hero com pergunta engaja mais que hero com benefício | "Em que ponto do seu negócio você está agora?" vs "MBA em Psi Organizacional Online" | CTR para diagnóstico/quiz |
| EXP-02 | Lead form com 3 campos converte mais que com 5 | 3 campos (nome+email+telefone) vs 5 (+cargo+empresa) | Conversão lead form |
| EXP-03 | CTA "Solicitar grade" vs "Conhecer o curso" | A/B test em página de curso | Conversão lead form |
| EXP-04 | Botão WhatsApp flutuante mobile | com/sem | Taxa de click WhatsApp |
| EXP-05 | Quiz de 8 perguntas vs 12 perguntas | tempo + completion rate | quiz_complete |
| EXP-06 | Página estadual com hero local vs hero nacional | "MBAs em Psicologia em SP" vs "MBA Psi Organizacional" | Conversão local |
| EXP-07 | Comparativo com tabela vs com cards | layouts diferentes | Tempo + conversão |
| EXP-08 | Lead magnet pós-leitura vs pop-up | exit-intent vs sticky botão | Download |

### 5.5 CTAs por etapa da jornada (referência cruzada com `05-arquitetura-da-informacao.md`)

| Etapa | CTA primário (texto canônico) | Conversão esperada |
|---|---|---|
| Awareness | "Baixar guia completo em PDF" | 3-7% |
| Problem-discovery | "Fazer quiz Qual MBA combina com você" | 5-12% |
| Solution-discovery | "Solicitar matriz curricular completa" | 4-8% |
| Consideration | "Inscrever em webinar com data" | 6-10% |
| Comparison | "Ver comparativo IPOG vs [concorrente]" + "Falar com consultor" | 3-6% |
| Decision | "Agendar conversa com coordenação" / "Iniciar matrícula" | 8-15% |

### 5.6 Cadência de teste e otimização

- **Sprint 1-3 (Fase 1):** sem A/B (volume baixo)
- **Fase 2:** 1 experimento A/B/sprint (semanal)
- **Fase 3+:** 2-3 experimentos paralelos por sprint
- **Critério de pausa:** sample size ≥ 1.000/variação ou 95% confidence

### 5.7 Lead scoring (Fase 2)

```
Pontuação base: 0
+10 baixou lead magnet
+15 inscrita em webinar
+20 fez quiz e teve match com curso prioritário
+25 visitou página de curso prioritário
+30 visitou página comparativa
+50 solicitou grade ou agendou conversa
+50 lead empresa B2B (NR-1 driver)
-10 sessão única < 30s

Threshold:
0-39: low (newsletter)
40-69: medium (e-mail nurturing)
70+: high (call de consultor em 24h)
```

### 5.8 Mensagens canônicas por estágio

| Estágio | Mensagem padrão |
|---|---|
| Awareness | "Estamos aqui para te ajudar a entender o caminho" |
| Problem-discovery | "Vamos diagnosticar onde você está agora" |
| Solution-discovery | "Conheça os 5 MBAs do IPOG e veja qual atende seu objetivo" |
| Consideration | "Ouça quem já cursou + tire dúvidas em webinar" |
| Comparison | "Compare factualmente IPOG com outras instituições" |
| Decision | "Agende conversa com coordenação para próximos passos" |

## Cross-links

- `02-personas-e-jornadas.md` (CTAs por persona)
- `09-seo-e-conteudo-programatico.md`
- `12-governanca-editorial.md`
- `15-riscos-assuncoes-e-dependencias.md`
