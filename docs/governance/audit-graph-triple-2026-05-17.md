# Auditoria @graph triplo + schemas canônicos

**Data:** 2026-05-17  
**Escopo:** `site/src/pages/` + `site/src/components/` + `site/src/layouts/`  
**Gerador:** `scripts/audit-graph-triple.mjs` (Wave 3 SEO/GEO Sprint 17-05-2026)

---

## TL;DR

- 234 páginas `.astro` em `site/src/pages/`, 18 componentes, 1 layouts.
- **`@graph` triplo (WebSite + Organization + Person) herdado de Base.astro:** 234/234 = **100.0%**.
- 54 páginas importam helpers canônicos de `@lib/schemas`.
- Schemas Tier 2 por página:
  - `Article` / `BlogPosting` / `NewsArticle`: 188.
  - `BreadcrumbList`: 147.
  - `FAQPage`: 215.
  - `EducationalOccupationalProgram`: 20.
  - `EducationalOrganization` (page-level): 22.
  - `Course`: 0.
  - `HowTo`: 23.
  - `Speakable` (qualquer forma): 37.

## Cobertura por tipo de página

| Tipo | Total | Com triplo herdado |
|------|-------|--------------------|
| Hub de programa | 52 | 52 |
| Artigo (guia/faq/comparativo/caso/evidência) | 88 | 88 |
| Institucional | 94 | 94 |

## Top 10 páginas com schemas mais ricos

| Rota | Score | Schemas próprios | Speakable |
|------|------:|------------------|:--------:|
| `/guias/avaliacao-ccl-biomarcadores-2026` | 100 | Article, BreadcrumbList, FAQPage, HowTo, SpeakableSpecification | sim |
| `/guias/avaliacao-tea-mulheres-adultas` | 100 | Article, BreadcrumbList, FAQPage, HowTo, SpeakableSpecification | sim |
| `/guias/escalas-burnout-bat-mbi-olbi-cbi` | 100 | Article, BreadcrumbList, FAQPage, HowTo, SpeakableSpecification | sim |
| `/guias/intervencao-adolescente-ideacao-suicida-algoritmos` | 100 | Article, BreadcrumbList, FAQPage, HowTo, SpeakableSpecification | sim |
| `/guias/uso-etico-ia-generativa-2026` | 100 | Article, BreadcrumbList, FAQPage, HowTo, SpeakableSpecification | sim |
| `/comparativos/bat-vs-mbi-burnout` | 90 | Article, BreadcrumbList, FAQPage, SpeakableSpecification | sim |
| `/comparativos/ccl-amnestico-vs-nao-amnestico` | 90 | Article, BreadcrumbList, FAQPage, SpeakableSpecification | sim |
| `/comparativos/chatbots-terapeuticos-vs-terapeuta-humano-2026` | 90 | Article, BreadcrumbList, FAQPage, SpeakableSpecification | sim |
| `/comparativos/cvv-188-vs-capsi-adolescente` | 90 | Article, BreadcrumbList, FAQPage, SpeakableSpecification | sim |
| `/comparativos/dir-floortime-vs-aba-tea-precoce` | 90 | Article, BreadcrumbList, FAQPage, SpeakableSpecification | sim |

## Top 10 páginas com mais gaps

| Rota | Score | Gaps |
|------|------:|------|
| `/areas/:slug` | 40 | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/mbas` | 40 | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/aba-tea-neurodesenvolvimento` | 50 | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/avaliacao-psicologica` | 50 | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/ia-people-analytics-psicologia-digital` | 50 | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/neuropsicologia` | 50 | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/psicologia-clinica` | 50 | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/psicologia-escolar-educacional` | 50 | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/psicologia-esporte` | 50 | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/psicologia-hospitalar` | 50 | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |

## Hubs de programa que precisam de `EducationalOccupationalProgram`

_Adicionar via `buildEducationalOccupationalProgram` de `@lib/schemas`._

- `/areas/aba-tea-neurodesenvolvimento` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/areas/avaliacao-psicologica` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/areas/ia-people-analytics-psicologia-digital` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/areas/neuropsicologia` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/areas/psicologia-clinica` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/areas/psicologia-escolar-educacional` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/areas/psicologia-esporte` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/areas/psicologia-hospitalar` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/areas/psicologia-juridica-forense` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/areas/psicologia-organizacional-trabalho` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/areas/psicologia-positiva` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/areas/psicologia-saude` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/areas/psicologia-social` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/areas/psicologia-transito-trafego` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/areas/psicomotricidade` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/areas/psicopedagogia` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/areas/reabilitacao-neuropsicologica` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/areas/saude-mental-organizacoes` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/areas/:slug` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/intervencoes/atencao-primaria-matriciamento` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/intervencoes/iapt-nhs` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/intervencoes/intervencao-crise` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/intervencoes/retorno-ao-trabalho` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/intervencoes/stepped-care` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/mbas` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/mbas/mba-lideranca-positiva/grade-curricular` → sem Speakable em página candidata
- `/mbas/mba-lideranca-positiva/metodologia` → sem Speakable em página candidata
- `/mbas/mba-lideranca-positiva/perfil-do-aluno` → sem Speakable em página candidata
- `/mbas/mba-lideranca-positiva` → sem Speakable em página candidata
- `/mbas/mba-ncpp/grade-curricular` → sem Speakable em página candidata
- `/mbas/mba-ncpp/metodologia` → sem Speakable em página candidata
- `/mbas/mba-ncpp/perfil-do-aluno` → sem Speakable em página candidata
- `/mbas/mba-ncpp` → sem Speakable em página candidata
- `/mbas/mba-neuro/grade-curricular` → sem Speakable em página candidata
- `/mbas/mba-neuro/metodologia` → sem Speakable em página candidata
- `/mbas/mba-neuro/perfil-do-aluno` → sem Speakable em página candidata
- `/mbas/mba-neuro` → sem Speakable em página candidata
- `/mbas/mba-positiva/grade-curricular` → sem Speakable em página candidata
- `/mbas/mba-positiva/metodologia` → sem Speakable em página candidata
- `/mbas/mba-positiva/perfil-do-aluno` → sem Speakable em página candidata
- `/mbas/mba-positiva` → sem Speakable em página candidata
- `/mbas/mba-pot/grade-curricular` → sem Speakable em página candidata
- `/mbas/mba-pot/metodologia` → sem Speakable em página candidata
- `/mbas/mba-pot/perfil-do-aluno` → sem Speakable em página candidata
- `/mbas/mba-pot` → sem Speakable em página candidata
- `/metodos/act` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/metodos/dbt` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/metodos/emdr` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/metodos` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/metodos/mindfulness` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/metodos/tcc` → hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata
- `/tipos-de-pos-graduacao` → hub de programa sem EducationalOccupationalProgram; sem Speakable em página candidata

## Detalhamento completo

| Rota | Tipo | Score | Triplo | Schemas próprios | Gaps |
|------|------|------:|:------:|------------------|------|
| `/` | institucional | 40 | sim | BreadcrumbList | — |
| `/areas` | institucional | 30 | sim | — | — |
| `/areas/:slug` | hub-programa | 40 | sim | Article | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/aba-tea-neurodesenvolvimento` | hub-programa | 50 | sim | Article, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/avaliacao-psicologica` | hub-programa | 50 | sim | Article, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/ia-people-analytics-psicologia-digital` | hub-programa | 50 | sim | Article, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/neuropsicologia` | hub-programa | 50 | sim | Article, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/psicologia-clinica` | hub-programa | 50 | sim | Article, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/psicologia-escolar-educacional` | hub-programa | 50 | sim | Article, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/psicologia-esporte` | hub-programa | 50 | sim | Article, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/psicologia-hospitalar` | hub-programa | 50 | sim | Article, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/psicologia-juridica-forense` | hub-programa | 50 | sim | Article, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/psicologia-organizacional-trabalho` | hub-programa | 50 | sim | Article, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/psicologia-positiva` | hub-programa | 50 | sim | Article, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/psicologia-saude` | hub-programa | 50 | sim | Article, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/psicologia-social` | hub-programa | 50 | sim | Article, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/psicologia-transito-trafego` | hub-programa | 50 | sim | Article, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/psicomotricidade` | hub-programa | 50 | sim | Article, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/psicopedagogia` | hub-programa | 50 | sim | Article, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/reabilitacao-neuropsicologica` | hub-programa | 50 | sim | Article, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/areas/saude-mental-organizacoes` | hub-programa | 50 | sim | Article, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/busca` | institucional | 60 | sim | BreadcrumbList, WebPage, ItemList | — |
| `/busca/sugestoes` | institucional | 30 | sim | — | — |
| `/carreira` | institucional | 40 | sim | CollectionPage | — |
| `/carreira/avaliacao-psicologica` | institucional | 50 | sim | Article, FAQPage | — |
| `/carreira/consultoria-organizacional` | institucional | 50 | sim | Article, FAQPage | — |
| `/carreira/neuropsicologia` | institucional | 50 | sim | Article, FAQPage | — |
| `/carreira/pericia-psicologica` | institucional | 50 | sim | Article, FAQPage | — |
| `/carreira/psicologia-organizacional` | institucional | 50 | sim | Article, FAQPage | — |
| `/carreira/saude-mental-corporativa` | institucional | 50 | sim | Article, FAQPage | — |
| `/casos` | institucional | 60 | sim | Article, BreadcrumbList, FAQPage | — |
| `/casos/aba-rede-escolar` | artigo | 60 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/casos/lideranca-positiva-startup-escalando` | artigo | 60 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/casos/positiva-burnout-fintech` | artigo | 60 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/casos/pot-fabrica-nr1` | artigo | 60 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/casos/reabilitacao-pos-avc` | artigo | 60 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/comparativos` | institucional | 50 | sim | BreadcrumbList, ItemList | — |
| `/comparativos/aba-vs-denver-tea-precoce` | artigo | 65 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/comparativos/act-vs-tcc` | artigo | 60 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/comparativos/antipsicotico-vs-intervencao-psicossocial-pos-crise` | artigo | 65 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/comparativos/avaliacao-presencial-vs-remota` | artigo | 65 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/comparativos/bat-vs-mbi-burnout` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/comparativos/brasil-vs-portugal-pos-psi` | artigo | 60 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/comparativos/ccl-amnestico-vs-nao-amnestico` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/comparativos/chatbots-terapeuticos-vs-terapeuta-humano-2026` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/comparativos/cvv-188-vs-capsi-adolescente` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/comparativos/dbt-vs-tcc-borderline` | artigo | 65 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/comparativos/dir-floortime-vs-aba-tea-precoce` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/comparativos/eap-brasileiro-vs-internacional` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/comparativos/emdr-vs-tcc-trauma` | artigo | 60 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/comparativos/exposicao-vs-emdr-tept` | artigo | 65 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/comparativos/haidt-restricao-vs-uso-supervisionado` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/comparativos/ia-escuta-passiva-vs-notas-humanas` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/comparativos/ia-vs-terapeuta-humano` | artigo | 60 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/comparativos/iapt-vs-stepped-care-brasil` | artigo | 65 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/comparativos/internacao-vs-caps-iii-crise-aguda` | artigo | 65 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/comparativos/ipt-vs-tcc-depressao` | artigo | 65 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/comparativos/laudo-psicologico-vs-laudo-medico` | artigo | 65 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/comparativos/mba-vs-especializacao` | artigo | 50 | sim | Article, FAQPage | artigo sem BreadcrumbList; sem Speakable em página candidata |
| `/comparativos/mindfulness-vs-act` | artigo | 60 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/comparativos/neuropsicologia-vs-reabilitacao` | artigo | 50 | sim | Article, FAQPage | artigo sem BreadcrumbList; sem Speakable em página candidata |
| `/comparativos/online-vs-presencial` | artigo | 50 | sim | Article, FAQPage | artigo sem BreadcrumbList; sem Speakable em página candidata |
| `/comparativos/positiva-vs-organizacional` | artigo | 50 | sim | Article, FAQPage | artigo sem BreadcrumbList; sem Speakable em página candidata |
| `/comparativos/pot-vs-gestao-pessoas` | artigo | 50 | sim | Article, FAQPage | artigo sem BreadcrumbList; sem Speakable em página candidata |
| `/comparativos/presencial-vs-hibrido-vs-online` | artigo | 60 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/comparativos/psicoterapia-individual-vs-grupo` | artigo | 65 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/comparativos/reabilitacao-neuropsi-vs-cst-estimulacao` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/comparativos/sm-trabalho-remoto-vs-presencial` | artigo | 65 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/comparativos/terapia-presencial-vs-hibrida-vs-app` | artigo | 65 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/comparativos/tf-cbt-vs-emdr-trauma-infantil` | artigo | 65 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/comparativos/transicao-tea-adolescente-vs-adulto` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/evidencias` | institucional | 60 | sim | Article, BreadcrumbList, FAQPage | — |
| `/evidencias/burnout-gen-z` | artigo | 60 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/evidencias/fadiga-digital` | artigo | 60 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/evidencias/ia-generativa-saude-mental` | artigo | 60 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/evidencias/mindfulness-corporativo` | artigo | 60 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/evidencias/nr1-riscos-psicossociais-2026` | artigo | 60 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/evidencias/terapias-terceira-onda` | artigo | 60 | sim | Article, BreadcrumbList, FAQPage | sem Speakable em página candidata |
| `/faq` | institucional | 70 | sim | BreadcrumbList, FAQPage, CollectionPage, WebPage | — |
| `/faq/adolescencia-digital-saude-mental-faq` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/faq/avaliacao-psicologica-laudos-faq` | artigo | 85 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/faq/burnout-cid11-faq` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/faq/carreira-psicologo-organizacional-faq` | artigo | 85 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/faq/escola-sem-celular-lei-15100-faq` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/faq/ia-em-psicologia-faq` | artigo | 85 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/faq/lecanemab-donanemab-brasil-faq` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/faq/lgpd-prontuario-ia-anvisa-samd-faq` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/faq/long-covid-saude-mental-faq` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/faq/mba-vs-especializacao-faq` | artigo | 85 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/faq/neurodiversidade-trabalho-faq` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/faq/nr1-faq` | artigo | 85 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/faq/nr1-implementacao-pratica-2026-faq` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/faq/prevencao-suicidio-faq` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/faq/primeiro-episodio-psicose-faq` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/faq/regulacao-cfp-faq` | artigo | 85 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/faq/saude-mental-perinatal-faq` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/faq/tdah-adulto-faq` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/faq/tdah-mulheres-adultas-faq` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/faq/tea-adulto-faq` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/faq/tea-mulheres-adultas-faq` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/faq/trauma-complexo-cptsd-faq` | artigo | 90 | sim | Article, BreadcrumbList, FAQPage, SpeakableSpecification | — |
| `/glossario` | institucional | 50 | sim | DefinedTermSet, DefinedTerm | — |
| `/glossario/conceitos-neuro` | institucional | 70 | sim | BreadcrumbList, FAQPage, DefinedTermSet, DefinedTerm | — |
| `/glossario/conceitos-pot` | institucional | 70 | sim | BreadcrumbList, FAQPage, DefinedTermSet, DefinedTerm | — |
| `/glossario/instrumentos` | institucional | 70 | sim | BreadcrumbList, FAQPage, DefinedTermSet, DefinedTerm | — |
| `/glossario/metodos-terapeuticos` | institucional | 70 | sim | BreadcrumbList, FAQPage, DefinedTermSet, DefinedTerm | — |
| `/glossario/regulacao` | institucional | 70 | sim | BreadcrumbList, FAQPage, DefinedTermSet, DefinedTerm | — |
| `/guias` | institucional | 70 | sim | BreadcrumbList, FAQPage, CollectionPage, HowTo | — |
| `/guias/atendimento-primeiro-episodio-psicose` | artigo | 75 | sim | Article, BreadcrumbList, FAQPage, HowTo | sem Speakable em página candidata |
| `/guias/avaliacao-ccl-biomarcadores-2026` | artigo | 100 | sim | Article, BreadcrumbList, FAQPage, HowTo, SpeakableSpecification | — |
| `/guias/avaliacao-saude-mental-perinatal` | artigo | 75 | sim | Article, BreadcrumbList, FAQPage, HowTo | sem Speakable em página candidata |
| `/guias/avaliacao-tdah-adulto` | artigo | 75 | sim | Article, BreadcrumbList, FAQPage, HowTo | sem Speakable em página candidata |
| `/guias/avaliacao-tdah-mulheres-adultas` | artigo | 75 | sim | Article, BreadcrumbList, FAQPage, HowTo | sem Speakable em página candidata |
| `/guias/avaliacao-tea-adulto` | artigo | 70 | sim | Article, BreadcrumbList, FAQPage, HowTo | sem Speakable em página candidata |
| `/guias/avaliacao-tea-mulheres-adultas` | artigo | 100 | sim | Article, BreadcrumbList, FAQPage, HowTo, SpeakableSpecification | — |
| `/guias/conduzir-supervisao-stepped-care` | artigo | 75 | sim | Article, BreadcrumbList, FAQPage, HowTo | sem Speakable em página candidata |
| `/guias/construir-programa-bem-estar` | artigo | 70 | sim | Article, BreadcrumbList, FAQPage, HowTo | sem Speakable em página candidata |
| `/guias/escalas-burnout-bat-mbi-olbi-cbi` | artigo | 100 | sim | Article, BreadcrumbList, FAQPage, HowTo, SpeakableSpecification | — |
| `/guias/escolher-supervisor-clinico` | artigo | 70 | sim | Article, BreadcrumbList, FAQPage, HowTo | sem Speakable em página candidata |
| `/guias/implementar-nr1-em-empresa` | artigo | 70 | sim | Article, BreadcrumbList, FAQPage, HowTo | sem Speakable em página candidata |
| `/guias/integracao-ia-psicodiagnostico-clinica` | artigo | 75 | sim | Article, BreadcrumbList, FAQPage, HowTo | sem Speakable em página candidata |
| `/guias/intervencao-adolescente-ideacao-suicida-algoritmos` | artigo | 100 | sim | Article, BreadcrumbList, FAQPage, HowTo, SpeakableSpecification | — |
| `/guias/intervencao-crise-suicida-zero-suicide` | artigo | 75 | sim | Article, BreadcrumbList, FAQPage, HowTo | sem Speakable em página candidata |
| `/guias/manejo-trauma-complexo-cptsd` | artigo | 75 | sim | Article, BreadcrumbList, FAQPage, HowTo | sem Speakable em página candidata |
| `/guias/neuropsi-long-covid-brain-fog` | artigo | 75 | sim | Article, BreadcrumbList, FAQPage, HowTo | sem Speakable em página candidata |
| `/guias/protocolo-act-burnout-saude` | artigo | 75 | sim | Article, BreadcrumbList, FAQPage, HowTo | sem Speakable em página candidata |
| `/guias/retorno-ao-trabalho-pos-burnout` | artigo | 70 | sim | Article, BreadcrumbList, FAQPage, HowTo | sem Speakable em página candidata |
| `/guias/uso-etico-ia-clinica` | artigo | 70 | sim | Article, BreadcrumbList, FAQPage, HowTo | sem Speakable em página candidata |
| `/guias/uso-etico-ia-generativa-2026` | artigo | 100 | sim | Article, BreadcrumbList, FAQPage, HowTo, SpeakableSpecification | — |
| `/intervencoes` | institucional | 60 | sim | Article, BreadcrumbList, FAQPage | — |
| `/intervencoes/atencao-primaria-matriciamento` | hub-programa | 60 | sim | Article, BreadcrumbList, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/intervencoes/iapt-nhs` | hub-programa | 60 | sim | Article, BreadcrumbList, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/intervencoes/intervencao-crise` | hub-programa | 60 | sim | Article, BreadcrumbList, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/intervencoes/retorno-ao-trabalho` | hub-programa | 60 | sim | Article, BreadcrumbList, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/intervencoes/stepped-care` | hub-programa | 60 | sim | Article, BreadcrumbList, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/mapa-do-site` | institucional | 30 | sim | — | — |
| `/mbas` | hub-programa | 40 | sim | ItemList | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/mbas/mba-lideranca-positiva` | hub-programa | 70 | sim | BreadcrumbList, FAQPage, EducationalOccupationalProgram, EducationalOrganization | sem Speakable em página candidata |
| `/mbas/mba-lideranca-positiva/grade-curricular` | hub-programa | 70 | sim | BreadcrumbList, FAQPage, EducationalOccupationalProgram, EducationalOrganization | sem Speakable em página candidata |
| `/mbas/mba-lideranca-positiva/metodologia` | hub-programa | 70 | sim | BreadcrumbList, FAQPage, EducationalOccupationalProgram, EducationalOrganization | sem Speakable em página candidata |
| `/mbas/mba-lideranca-positiva/perfil-do-aluno` | hub-programa | 70 | sim | BreadcrumbList, FAQPage, EducationalOccupationalProgram, EducationalOrganization | sem Speakable em página candidata |
| `/mbas/mba-ncpp` | hub-programa | 70 | sim | BreadcrumbList, FAQPage, EducationalOccupationalProgram, EducationalOrganization | sem Speakable em página candidata |
| `/mbas/mba-ncpp/grade-curricular` | hub-programa | 70 | sim | BreadcrumbList, FAQPage, EducationalOccupationalProgram, EducationalOrganization | sem Speakable em página candidata |
| `/mbas/mba-ncpp/metodologia` | hub-programa | 70 | sim | BreadcrumbList, FAQPage, EducationalOccupationalProgram, EducationalOrganization | sem Speakable em página candidata |
| `/mbas/mba-ncpp/perfil-do-aluno` | hub-programa | 70 | sim | BreadcrumbList, FAQPage, EducationalOccupationalProgram, EducationalOrganization | sem Speakable em página candidata |
| `/mbas/mba-neuro` | hub-programa | 70 | sim | BreadcrumbList, FAQPage, EducationalOccupationalProgram, EducationalOrganization | sem Speakable em página candidata |
| `/mbas/mba-neuro/grade-curricular` | hub-programa | 70 | sim | BreadcrumbList, FAQPage, EducationalOccupationalProgram, EducationalOrganization | sem Speakable em página candidata |
| `/mbas/mba-neuro/metodologia` | hub-programa | 70 | sim | BreadcrumbList, FAQPage, EducationalOccupationalProgram, EducationalOrganization | sem Speakable em página candidata |
| `/mbas/mba-neuro/perfil-do-aluno` | hub-programa | 70 | sim | BreadcrumbList, FAQPage, EducationalOccupationalProgram, EducationalOrganization | sem Speakable em página candidata |
| `/mbas/mba-positiva` | hub-programa | 70 | sim | BreadcrumbList, FAQPage, EducationalOccupationalProgram, EducationalOrganization | sem Speakable em página candidata |
| `/mbas/mba-positiva/grade-curricular` | hub-programa | 70 | sim | BreadcrumbList, FAQPage, EducationalOccupationalProgram, EducationalOrganization | sem Speakable em página candidata |
| `/mbas/mba-positiva/metodologia` | hub-programa | 70 | sim | BreadcrumbList, FAQPage, EducationalOccupationalProgram, EducationalOrganization | sem Speakable em página candidata |
| `/mbas/mba-positiva/perfil-do-aluno` | hub-programa | 70 | sim | BreadcrumbList, FAQPage, EducationalOccupationalProgram, EducationalOrganization | sem Speakable em página candidata |
| `/mbas/mba-pot` | hub-programa | 70 | sim | BreadcrumbList, FAQPage, EducationalOccupationalProgram, EducationalOrganization | sem Speakable em página candidata |
| `/mbas/mba-pot/grade-curricular` | hub-programa | 70 | sim | BreadcrumbList, FAQPage, EducationalOccupationalProgram, EducationalOrganization | sem Speakable em página candidata |
| `/mbas/mba-pot/metodologia` | hub-programa | 70 | sim | BreadcrumbList, FAQPage, EducationalOccupationalProgram, EducationalOrganization | sem Speakable em página candidata |
| `/mbas/mba-pot/perfil-do-aluno` | hub-programa | 70 | sim | BreadcrumbList, FAQPage, EducationalOccupationalProgram, EducationalOrganization | sem Speakable em página candidata |
| `/metodos` | hub-programa | 60 | sim | Article, BreadcrumbList, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/metodos/act` | hub-programa | 60 | sim | Article, BreadcrumbList, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/metodos/dbt` | hub-programa | 60 | sim | Article, BreadcrumbList, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/metodos/emdr` | hub-programa | 60 | sim | Article, BreadcrumbList, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/metodos/mindfulness` | hub-programa | 60 | sim | Article, BreadcrumbList, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/metodos/tcc` | hub-programa | 60 | sim | Article, BreadcrumbList, FAQPage | hub de programa sem EducationalOccupationalProgram; hub de programa sem EducationalOrganization; sem Speakable em página candidata |
| `/para-quem` | institucional | 30 | sim | — | — |
| `/para-quem/consultores` | institucional | 50 | sim | Article, FAQPage | — |
| `/para-quem/lideres` | institucional | 50 | sim | Article, FAQPage | — |
| `/para-quem/psicologos` | institucional | 50 | sim | Article, FAQPage | — |
| `/para-quem/rh` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado` | institucional | 30 | sim | — | — |
| `/por-estado/:uf` | institucional | 40 | sim | WebPage | — |
| `/por-estado/ac` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/al` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/am` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/ap` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/ba` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/ce` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/df` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/es` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/go` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/ma` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/mg` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/ms` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/mt` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/pa` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/pb` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/pe` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/pi` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/pr` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/rj` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/rn` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/ro` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/rr` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/rs` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/sc` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/se` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/sp` | institucional | 50 | sim | Article, FAQPage | — |
| `/por-estado/to` | institucional | 50 | sim | Article, FAQPage | — |
| `/pos-graduacao-psicologia` | institucional | 60 | sim | Article, FAQPage, ItemList | — |
| `/pos-graduacao-psicologia/como-escolher` | institucional | 50 | sim | Article, FAQPage | — |
| `/pos-graduacao-psicologia/mba-vs-especializacao` | institucional | 50 | sim | Article, FAQPage | — |
| `/pos-graduacao-psicologia/tipos` | institucional | 50 | sim | Article, FAQPage | — |
| `/recursos` | institucional | 50 | sim | BreadcrumbList, CollectionPage | — |
| `/recursos/checklist-escolher-pos-psicologia` | institucional | 60 | sim | BreadcrumbList, FAQPage, HowTo | — |
| `/recursos/guia-pos-psicologia` | institucional | 60 | sim | Article, BreadcrumbList, FAQPage | — |
| `/recursos/quiz-qual-mba-psicologia` | institucional | 40 | sim | BreadcrumbList | — |
| `/regulacao` | institucional | 30 | sim | — | — |
| `/sobre` | institucional | 50 | sim | BreadcrumbList, EducationalOrganization | — |
| `/temas` | institucional | 30 | sim | — | — |
| `/temas/adhd-adulto-brasil` | institucional | 60 | sim | Article, BreadcrumbList, FAQPage | — |
| `/temas/burnout-prevencao` | institucional | 50 | sim | Article, FAQPage | — |
| `/temas/burnout-profissionais-saude-2026` | institucional | 60 | sim | Article, BreadcrumbList, FAQPage | — |
| `/temas/climate-anxiety` | institucional | 60 | sim | Article, BreadcrumbList, FAQPage | — |
| `/temas/cultura-clima-organizacional` | institucional | 50 | sim | Article, FAQPage | — |
| `/temas/diversidade-inclusao` | institucional | 50 | sim | Article, FAQPage | — |
| `/temas/fadiga-digital` | institucional | 60 | sim | Article, BreadcrumbList, FAQPage | — |
| `/temas/gen-z-burnout` | institucional | 60 | sim | Article, BreadcrumbList, FAQPage | — |
| `/temas/ia-em-rh` | institucional | 50 | sim | Article, FAQPage | — |
| `/temas/ia-generativa-rh` | institucional | 60 | sim | Article, BreadcrumbList, FAQPage | — |
| `/temas/ia-psicodiagnostico-2026` | institucional | 60 | sim | Article, BreadcrumbList, FAQPage | — |
| `/temas/lideranca-positiva` | institucional | 50 | sim | Article, FAQPage | — |
| `/temas/lideranca-toxica` | institucional | 60 | sim | Article, BreadcrumbList, FAQPage | — |
| `/temas/longevidade-no-trabalho` | institucional | 60 | sim | Article, BreadcrumbList, FAQPage | — |
| `/temas/neurociencia-aplicada-aprendizagem` | institucional | 50 | sim | Article, FAQPage | — |
| `/temas/neurodiversidade-corporativa` | institucional | 60 | sim | Article, BreadcrumbList, FAQPage | — |
| `/temas/nr1-riscos-psicossociais` | institucional | 50 | sim | Article, FAQPage | — |
| `/temas/people-analytics` | institucional | 50 | sim | Article, FAQPage | — |
| `/temas/psicose-primeiro-episodio` | institucional | 60 | sim | Article, BreadcrumbList, FAQPage | — |
| `/temas/saude-mental-perinatal` | institucional | 60 | sim | Article, BreadcrumbList, FAQPage | — |
| `/temas/saude-mental-trabalho` | institucional | 50 | sim | Article, FAQPage | — |
| `/temas/saude-mental-trabalho-remoto` | institucional | 60 | sim | Article, BreadcrumbList, FAQPage | — |
| `/temas/seguranca-psicologica` | institucional | 50 | sim | Article, FAQPage | — |
| `/temas/tea-adulto-trabalho` | institucional | 60 | sim | Article, BreadcrumbList, FAQPage | — |
| `/temas/trabalho-hibrido` | institucional | 50 | sim | Article, FAQPage | — |
| `/tipos-de-pos-graduacao` | hub-programa | 70 | sim | BreadcrumbList, CollectionPage, EducationalOrganization, ItemList | hub de programa sem EducationalOccupationalProgram; sem Speakable em página candidata |

## Componentes com schema próprio

| Componente | Schemas | Speakable |
|------------|---------|:---------:|
| `Breadcrumbs.astro` | BreadcrumbList, ListItem | — |
| `FAQAccordion.astro` | Answer, FAQPage, Question | — |
| `Footer.astro` | SiteNavigationElement | — |

## Próximos passos sugeridos

1. Adicionar `Speakable` em todas as páginas de hub de programa e em artigos com TL;DR/FAQ.
2. Migrar hubs MBA (`/mbas/*`) para `buildEducationalOccupationalProgram` (atualmente declaram apenas Course/credential parcial).
3. Centralizar `EducationalOrganization` IPOG via `ipogEducationalOrganization` em vez de inline.
4. Atrelar `Article` ao `@graph` Person+Organization via `@id` em vez de inline duplicado.
