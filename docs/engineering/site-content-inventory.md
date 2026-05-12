# Inventário de conteúdo do site · posgraduacaopsicologia.com

> **Snapshot:** 2026-05-12 08:30 BRT · build 176 páginas estáticas
> **Manutenção:** atualizar a cada commit que adicione/remova rota.
> **Fonte da verdade da taxonomia:** `site/src/lib/data.ts`

---

## 1. Sumário por categoria

| Categoria | Slug raiz | Arquivos `.astro` | Páginas no build | Hub? | Schema dominante |
|---|---|---:|---:|---|---|
| Áreas da Psicologia | `/areas/` | 20 | 19 (1 dyn `[slug]` = 1 build) | Sim · `/areas/index.astro` | Article + FAQPage |
| MBAs do IPOG | `/mbas/` | 21 | 21 | Sim · `/mbas/index.astro` | EducationalOccupationalProgram + FAQPage |
| Temas em alta | `/temas/` | 26 | 26 | Sim · `/temas/index.astro` | Article + FAQPage |
| Por estado | `/por-estado/` | 29 | 28 (1 dyn `[uf]`) | Sim · `/por-estado/index.astro` | Article + Place |
| Para quem (personas) | `/para-quem/` | 5 | 5 | Sim · `/para-quem/index.astro` | Article |
| Carreira | `/carreira/` | 7 | 7 | Sim · `/carreira/index.astro` | Article + FAQPage |
| Comparativos | `/comparativos/` | 12 | 12 | Sim · `/comparativos/index.astro` | Article + FAQPage |
| Pillar pós-graduação | `/pos-graduacao-psicologia/` | 4 | 4 | Sim · pillar 5000+ palavras | Article |
| Recursos | `/recursos/` | 4 | 4 | Sim · `/recursos/index.astro` | Article + HowTo (checklist) |
| **Métodos** · novo 12-05 | `/metodos/` | 6 | 6 | Sim | Article + FAQPage |
| **Evidências (papers 2025-2026)** · novo 12-05 | `/evidencias/` | 7 | 7 | Sim | Article + FAQPage |
| **Casos compostos HBR** · novo 12-05 | `/casos/` | 6 | 6 | Sim | Article + FAQPage |
| **Intervenções (protocolos)** · novo 12-05 | `/intervencoes/` | 6 | 6 | Sim | Article + FAQPage |
| **Guias HowTo** · novo 12-05 | `/guias/` | 7 | 7 | Sim | **HowTo + HowToStep** + Article |
| **FAQs aprofundadas** · novo 12-05 | `/faq/` | 7 | 7 | Sim | **FAQPage** (mainEntity completo) |
| Glossário · expandido 12-05 | `/glossario` + `/glossario/<cluster>/` | 1 root + 5 clusters | 6 | Root atua como hub | **DefinedTermSet** + BreadcrumbList |
| Regulação | `/regulacao` | 1 | 1 | — | Article |
| Mapa do site | `/mapa-do-site` | 1 | 1 | — | — |
| Home | `/` | 1 | 1 | — | WebSite |
| **TOTAL** | — | **176 `.astro`** | **174 no build** | — | — |

> Diferença entre 176 .astro e 174 build: catch-alls `[slug]` e `[uf]` contam como 1 build cada mesmo gerando 0 saídas porque não há registro restante (já cobrimos os 18 slugs e 27 UFs com arquivos explícitos).

---

## 2. Áreas da Psicologia (18)

Fonte da verdade: `AREAS[]` em `site/src/lib/data.ts`. Cada área tem `cluster` (`pot-bem-estar` | `neuro-avaliacao` | `demais`) e `regulatoryLevel` (R0-R4).

### POT + bem-estar (4)

- `/areas/psicologia-organizacional-trabalho` · R2 · POT
- `/areas/psicologia-positiva` · R0/R1 · Positiva
- `/areas/saude-mental-organizacoes` · R2/R3 · SMO
- `/areas/ia-people-analytics-psicologia-digital` · R2/R3 · IA + RH

### Neuro + avaliação (4)

- `/areas/neuropsicologia` · R3 · Neuro
- `/areas/reabilitacao-neuropsicologica` · R3 · ReabNeuro
- `/areas/avaliacao-psicologica` · R3 · Aval.
- `/areas/aba-tea-neurodesenvolvimento` · R3 · ABA/TEA

### Demais (10)

- `/areas/psicologia-clinica` · R3 · Clínica
- `/areas/psicologia-hospitalar` · R3 · Hospitalar (novo 12-05)
- `/areas/psicologia-saude` · R2/R3 · Saúde (novo 12-05)
- `/areas/psicologia-escolar-educacional` · R2 · Escolar
- `/areas/psicopedagogia` · R2/R3 · Psicopedag. (novo 12-05)
- `/areas/psicomotricidade` · R2/R3 · Psicomotric. (novo 12-05)
- `/areas/psicologia-juridica-forense` · R3 · Jurídica
- `/areas/psicologia-social` · R2 · Social
- `/areas/psicologia-esporte` · R2/R3 · Esporte (novo 12-05)
- `/areas/psicologia-transito-trafego` · R3 · Trânsito (novo 12-05)

---

## 3. MBAs do IPOG (5 × 4 = 20 + index)

Cada MBA tem 1 página resumo + 3 sub-páginas (grade-curricular, metodologia, perfil-do-aluno).

| ID | Slug | Tag | Cluster |
|---|---|---|---|
| `mba-pot` | `/mbas/mba-pot` + 3 subs | Núcleo POT | pot |
| `mba-positiva` | `/mbas/mba-positiva` + 3 subs | Bem-estar | positiva |
| `mba-neuro` | `/mbas/mba-neuro` + 3 subs | Neuro/Cognição | neuro |
| `mba-ncpp` | `/mbas/mba-ncpp` + 3 subs | Neurociência | neuro |
| `mba-lideranca-positiva` | `/mbas/mba-lideranca-positiva` + 3 subs | Liderança | lideranca |

---

## 4. Temas em alta (25 + index)

### 11 originais (W16-W18)

- nr1-riscos-psicossociais · saude-mental-trabalho · burnout-prevencao · seguranca-psicologica · lideranca-positiva · people-analytics · ia-em-rh · cultura-clima-organizacional · trabalho-hibrido · diversidade-inclusao · neurociencia-aplicada-aprendizagem

### 8 emergentes 2025-2026 (round 2 · Wave R · 12-05)

- fadiga-digital · climate-anxiety · ia-generativa-rh · gen-z-burnout · longevidade-no-trabalho · neurodiversidade-corporativa · lideranca-toxica · saude-mental-trabalho-remoto

### 6 papers 2026 (round 3 · Wave Y · 12-05)

- tea-adulto-trabalho · burnout-profissionais-saude-2026 · ia-psicodiagnostico-2026 · adhd-adulto-brasil · psicose-primeiro-episodio · saude-mental-perinatal

---

## 5. Estados (27 + index + catch-all)

Cobertura completa 27/27 UFs. Cada UF tem ~250-300 linhas Astro com Hero, Resposta rápida, Tese contraintuitiva, Mercado, Tabela cidades-hub, Mini-caso, 3 Oportunidades emergentes, FAQ 3-4, Síntese executiva.

| Região | UFs cobertos | Round |
|---|---|---|
| Sudeste | SP, RJ, MG, ES | SP/RJ/MG (W18) · ES (round 1) |
| Sul | PR, RS, SC | PR (W18) · RS/SC (round 1) |
| Centro-Oeste | GO, DF, MT, MS | GO (W18) · DF/MT/MS (round 1) |
| Nordeste | BA, CE, PE, MA, AL, PB, PI, RN, SE | Todos round 1 |
| Norte | AC, AP, AM, PA, RR, RO, TO | Todos round 1 |

---

## 6. Métodos terapêuticos (5 + hub)

`/metodos/` hub + sub-páginas com Article + FAQPage + BreadcrumbList:

- `/metodos/tcc` · Beck/Ellis · NICE A · Cochrane
- `/metodos/act` · Hayes/Strosahl/Wilson · Evidência crescente
- `/metodos/dbt` · Linehan · Gold standard TPB
- `/metodos/mindfulness` · Kabat-Zinn · MBSR/MBCT
- `/metodos/emdr` · Shapiro · OMS/APA/NICE

---

## 7. Evidências · papers 2025-2026 (6 + hub)

`/evidencias/` hub + sub-páginas ancoradas em literatura recente. Cada sub-página tem ≥6 papers (Autor, Ano, Veículo), mínimo 3 brasileiros.

- `/evidencias/nr1-riscos-psicossociais-2026` · 9 papers
- `/evidencias/burnout-gen-z` · 9 papers
- `/evidencias/ia-generativa-saude-mental` · 8 papers
- `/evidencias/mindfulness-corporativo` · 8 papers
- `/evidencias/terapias-terceira-onda` · 9 papers
- `/evidencias/fadiga-digital` · 8 papers

**Total: 51 citações** com mínimo de 3 fontes brasileiras por página (RAE, RPOT, Trends in Psychology, Psicologia: Reflexão e Crítica).

---

## 8. Casos compostos HBR-grade (5 + hub)

`/casos/` hub + 5 cases. Banner obrigatório: "Caso composto baseado em padrão recorrente. Detalhes alterados para preservar sigilo profissional." Marcadores `[estimativa]` em todos os números aproximados.

| Caso | Área | MBA correlato |
|---|---|---|
| `/casos/pot-fabrica-nr1` | POT | mba-pot |
| `/casos/positiva-burnout-fintech` | Positiva | mba-positiva |
| `/casos/reabilitacao-pos-avc` | ReabNeuro | mba-neuro |
| `/casos/lideranca-positiva-startup-escalando` | Positiva | mba-lideranca-positiva |
| `/casos/aba-rede-escolar` | ABA/TEA | mba-ncpp |

---

## 9. Intervenções · protocolos baseados em evidência (5 + hub)

`/intervencoes/` hub + 5 protocolos:

- `/intervencoes/stepped-care` · NICE A · Bower & Gilbody (2005)
- `/intervencoes/iapt-nhs` · Clark (2018, 2024)
- `/intervencoes/atencao-primaria-matriciamento` · Campos & Domitti (2007)
- `/intervencoes/intervencao-crise` · Caplan (1964) · Roberts (2005)
- `/intervencoes/retorno-ao-trabalho` · Bezerra & Souza (2024-2026) · OMS (2022)

---

## 10. Guias HowTo · mobile-first (6 + hub)

`/guias/` hub + 6 guias passo-a-passo. Schema.org **HowTo + HowToStep** (rich snippet com passos numerados).

| Guia | Passos | Persona alvo |
|---|---:|---|
| `/guias/implementar-nr1-em-empresa` | 9 | RH |
| `/guias/construir-programa-bem-estar` | 9 | RH |
| `/guias/retorno-ao-trabalho-pos-burnout` | 9 | Psicólogos |
| `/guias/avaliacao-tea-adulto` | 9 | Psicólogos |
| `/guias/escolher-supervisor-clinico` | 8 | Psicólogos |
| `/guias/uso-etico-ia-clinica` | 9 | Psicólogos |

---

## 11. FAQs aprofundadas (6 + hub)

`/faq/` hub + 6 FAQs com 82 Q&As totais. **Otimização AI Overview:** primeira sentença de cada resposta é declarativa e direta ≤30 palavras.

| FAQ | Q&As |
|---|---:|
| `/faq/nr1-faq` | 14 |
| `/faq/mba-vs-especializacao-faq` | 14 |
| `/faq/carreira-psicologo-organizacional-faq` | 13 |
| `/faq/avaliacao-psicologica-laudos-faq` | 14 |
| `/faq/regulacao-cfp-faq` | 13 |
| `/faq/ia-em-psicologia-faq` | 14 |

---

## 12. Glossário expandido (115 termos)

`/glossario` (single-page original) + `/glossario/<cluster>/` (5 sub-páginas cluster):

| Cluster | Slug | Termos |
|---|---|---:|
| Regulação | `/glossario/regulacao` | 21 (CFP, CRP, MEC, SATEPSI, NR-1, LBI, LGPD...) |
| Instrumentos | `/glossario/instrumentos` | 22 (WAIS, MMPI, EPDS, ADOS-2, AQ-50...) |
| Métodos terapêuticos | `/glossario/metodos-terapeuticos` | 25 (TCC, ACT, DBT, EMDR, TF-CBT, FAP...) |
| Conceitos POT | `/glossario/conceitos-pot` | 22 (Schein, Edmondson, JD-R, Karasek...) |
| Conceitos Neuro | `/glossario/conceitos-neuro` | 25 (Lezak, Damásio, BDNF, neuroplasticidade...) |

Cada termo: definição técnica 60-150 palavras + exemplo prático + (Autor, Ano) + "Veja também" com anchor links.

---

## 13. Comparativos (11 + hub)

`/comparativos/` hub + 11 análises com **3 tabelas comparativas** por página (overflow-x-auto):

### 5 originais

- mba-vs-especializacao · neuropsicologia-vs-reabilitacao · online-vs-presencial · positiva-vs-organizacional · pot-vs-gestao-pessoas

### 6 novos (round 3)

- act-vs-tcc · emdr-vs-tcc-trauma · mindfulness-vs-act · presencial-vs-hibrido-vs-online · brasil-vs-portugal-pos-psi · ia-vs-terapeuta-humano

---

## 14. Páginas single (sem hub)

- `/` · home portal independente
- `/regulacao` · CFP, MEC, SATEPSI, áreas reconhecidas
- `/glossario` · single-page original (links agora para `/glossario/<cluster>/`)
- `/mapa-do-site` · HTML sitemap navegável

---

*Última atualização:* `2026-05-12 08:30 BRT`
