# 03 — Ontologia do Portal

> **Audiência primária:** Engenharia + CMS + SEO + Schema.org engineer
> **Objetivo:** entidades, atributos e relacionamentos que orientam CMS, SEO, filtros, busca, recomendação, analytics

## Princípios

- **Uma entidade, um identificador.** Cada conceito tem `@id` canônico que aparece em Schema, naming de arquivo, foreign-key no banco.
- **Relacionamentos preferem Schema.org** quando disponível.
- **Naming canônico** ("IPOG", "Brasil GEO", "MBA Online de Psicologia [Cluster]") é imutável.
- **Compatibilidade com `docs/ontologia/ONTOLOGIA-CANONICA.md`** — esta camada estende, não substitui.

## 1. Catálogo de 40 entidades

| # | Entidade | Schema.org | Propósito |
|---|---|---|---|
| 1 | `Course` | `Course` + `EducationalOccupationalProgram` | MBA ou Pós (instância concreta) |
| 2 | `CourseCategory` | — | Cluster Organizacional/Clínica/Neuro/Pessoas |
| 3 | `MBA` | `EducationalOccupationalProgram` (programType: MBA) | Subtipo de Course |
| 4 | `Specialization` | `EducationalOccupationalProgram` (programType: Especialização) | Subtipo de Course |
| 5 | `Module` | `Chapter` + `LearningResource` | Módulo do curso |
| 6 | `Topic` | `Thing` + keywords | Tema editorial (NR-1, POT, etc.) |
| 7 | `Subtopic` | `Thing` | Subdivisão de Topic |
| 8 | `Persona` | `Audience` + `EducationalAudience` | 6 personas canônicas |
| 9 | `UserJourneyStage` | — | awareness/consideration/decision/etc. |
| 10 | `PainPoint` | — | Dor canônica do usuário |
| 11 | `CareerGoal` | — | Objetivo de carreira |
| 12 | `Skill` | `DefinedTerm` | Habilidade desenvolvida |
| 13 | `Competency` | `DefinedTerm` | Competência (agregado de skills) |
| 14 | `ContentItem` | `Article`/`HowTo`/`BlogPosting` | Peça de conteúdo |
| 15 | `ContentType` | — | Tipo: guia, aula, FAQ, etc. |
| 16 | `LandingPage` | `WebPage` | Página de captura |
| 17 | `StatePage` | `WebPage` + `Place` | Página por UF |
| 18 | `CityPage` | `WebPage` + `Place` | Página por cidade média |
| 19 | `Region` | `AdministrativeArea` | N/NE/CO/SE/S |
| 20 | `State` | `AdministrativeArea` | UF |
| 21 | `Competitor` | `EducationalOrganization` | Concorrente catalogado |
| 22 | `ComparisonPage` | `Article` | Página comparativa |
| 23 | `FAQ` | `FAQPage` | Pergunta + resposta canônica |
| 24 | `CTA` | `Action` | Call-to-action |
| 25 | `LeadMagnet` | `DigitalDocument` | Material de captura (e-book, checklist) |
| 26 | `Webinar` | `Event` (online) | Evento ao vivo |
| 27 | `Event` | `Event` | Evento presencial ou híbrido |
| 28 | `Professor` | `Person` | Corpo docente |
| 29 | `Testimonial` | `Review` + `Person` | Depoimento |
| 30 | `CaseStudy` | `Article` | Empresa-caso |
| 31 | `Regulation` | `LegalDocument` | NR-1, Portaria 506, Decreto 12.456 |
| 32 | `Trend` | `Thing` | Tendência editorial 2025-2026 |
| 33 | `Metric` | `PropertyValue` | Indicador (KPI 1-8) |
| 34 | `AnalyticsEvent` | — | Evento PostHog |
| 35 | `SEOKeyword` | — | Query-âncora monitorada |
| 36 | `SearchIntent` | — | informacional/comercial/comparativo/transacional/local |
| 37 | `InternalLink` | — | Vínculo cross-link entre páginas |
| 38 | `EditorialOwner` | `Person` | Responsável editorial pela peça |
| 39 | `Source` | `CreativeWork` | Fonte citada (paper, mídia, regulação) |
| 40 | `Evidence` | `Claim` + `Source` | Claim sustentado por Source |

## 2. Atributos por entidade — exemplo `Course`

```yaml
Course:
  required:
    - id                       # uuid
    - slug                     # ascii kebab-case
    - name                     # naming canônico exato
    - alternateName            # variantes para SEO (sinônimos)
    - short_description        # 150-200 chars (meta)
    - full_description         # parágrafo executivo
    - modality                 # ao-vivo|ead|hibrido
    - duration                 # ISO 8601 ex: P12M
    - target_personas          # array de Persona
    - primary_topics           # array de Topic
    - related_skills           # array de Skill
    - career_outcomes          # array de CareerGoal
    - primary_cta              # ref CTA
    - lead_form_id             # ref LeadForm
    - seo_title                # ≤60 chars
    - seo_description          # ≤160 chars
    - canonical_url            # absoluta
    - course_category          # ref CourseCategory
    - schema_org_type          # Course / EducationalOccupationalProgram
    - program_type             # MBA / Especialização
    - educational_credential_awarded
    - mec_authorization        # boolean
    - cfp_compliance_notes     # texto
    - is_flagship              # boolean (true para MBA POT)
  optional:
    - professor_ids            # array de Professor
    - testimonials             # array de Testimonial
    - case_studies             # array de CaseStudy
    - related_content          # array de ContentItem
    - faq_ids                  # array de FAQ
    - competitor_comparisons   # array de ComparisonPage
    - state_specific_variants  # array de StatePage
    - city_specific_variants   # array de CityPage
    - prerequisites
    - certificate_template
    - tuition_payment_options
    - international_modules    # opcionais (ex: Harvard, Poli.Design)
    - capstone_template        # template do capstone executivo
    - language_of_instruction  # default: pt-BR
    - international_validity   # texto
    - data_validade            # ISO 8601 (campo de governança editorial)
```

(Atributos completos das 40 entidades em `data/ontology.yaml`.)

## 3. Relacionamentos canônicos

### 3.1 Relacionamentos Schema.org standard

| Relação | Schema property | Exemplo |
|---|---|---|
| Curso → Categoria | `belongsToSchema` (custom) | MBA POT → CourseCategory:Organizacional |
| Curso → Módulos | `hasPart` | Course → Module[] |
| Curso → Personas | `audience.audienceType` | Course → Persona[] |
| Curso → Skills | `teaches` | Course → Skill[] |
| Curso → Career outcomes | `occupationalCategory` | Course → CareerGoal[] |
| Topic → Subtopics | `hasPart` | NR-1 → Subtopic[Riscos psicossociais, GRO, Plano de ação] |
| ContentItem → Topic | `about` + `mentions` | Article → Topic[] |
| ContentItem → Persona | `audience` | Article → Persona |
| LandingPage → Course | `mainEntity` ou `relatedLink` | LP → Course |
| StatePage → Place | `contentLocation` + `areaServed` | StatePage → State |
| ComparisonPage → Competitors | `compareTo` (custom) + `mentions` | ComparisonPage → Competitor[] |
| Course → FAQs | `mainEntity` (em FAQPage) | FAQPage → Question[] |
| Course → CTAs | `potentialAction` | Course → CTA[] |
| LeadMagnet → JourneyStage | `educationalAlignment` | LeadMagnet → UserJourneyStage |
| SEOKeyword → SearchIntent | — | Keyword → Intent |
| Regulation → Topic | `keywords` + `subjectOf` | NR-1 → Topic:Riscos psicossociais |
| AnalyticsEvent → ContentItem | — | Event → Page |
| Source → Evidence | — | Paper → Claim |

### 3.2 Relacionamentos IPOG-específicos (custom)

| Relação | Implementação | Justificativa |
|---|---|---|
| Course → State variants | `state_specific_variants` | Cada UF pode ter LP customizada do curso |
| Course → City variants | `city_specific_variants` | 51 cidades CNPJ-próprio (Frente Regional) |
| Persona → Recommended courses | array ordenado | Quiz "Qual MBA combina com você?" usa este array |
| Topic → Trend (alta 2025-2026) | flag boolean | NR-1, people analytics, IA RH = trends ativas |

## 4. Perguntas que a ontologia precisa responder

A ontologia é considerada **completa** quando responde corretamente:

1. ✅ Qual MBA é melhor para psicóloga clínica que quer migrar para organizações? (Persona 1 → MBA POT)
2. ✅ Qual curso é mais indicado para RH lidar com saúde mental e NR-1? (Persona 2 → MBA POT + Trilha B2B NR-1)
3. ✅ Quais conteúdos devem aparecer para visitantes de São Paulo interessados em Psi Organizacional? (StatePage:SP × Topic:POT × ContentItem[])
4. ✅ Quais páginas devem ranquear para "MBA Psicologia Organizacional online"? (SEOKeyword → LandingPage + Course detail)
5. ✅ Quais conteúdos são adequados para awareness, consideration e decision? (UserJourneyStage filtro em ContentItem)
6. ✅ Quais CTAs são melhores para visitantes em estágio de decisão? (CTA por UserJourneyStage)
7. ✅ Quais concorrentes devem ser comparados por curso ou tema? (ComparisonPage → Competitor[] por Course/Topic)
8. ✅ Quais temas estão em alta em 2025-2026? (Trend filter em Topic)

## 5. Cross-links

- `data/ontology.yaml` — definição estruturada das 40 entidades
- `04-taxonomia.md` — eixos taxonômicos (taxonomia ≠ ontologia; taxonomia organiza, ontologia define)
- `docs/ontologia/ONTOLOGIA-CANONICA.md` — ontologia macro do programa GEO IPOG (esta camada estende)
- `docs/ontologia/SCHEMA-IPOG-CANONICAL.md` — JSON-LD pronto para deploy
