# 09 — SEO e Conteúdo Programático

> **Audiência primária:** SEO + Conteúdo + Engenharia

## 1. Princípios

- Cada cluster SEO tem **pillar content** (3.000-7.000 palavras) + 6-12 spokes (artigos 800-1500 palavras)
- Linkagem interna obrigatória (toda spoke linka pillar; pillar linka spokes)
- Schema.org rico em todas páginas (`Article`, `HowTo`, `Course`, `FAQPage`, `Quiz`, `BreadcrumbList`)
- llms.txt declara hub central + naming canônico
- Sem thin content: páginas estaduais ≥ 800 palavras únicas + dados locais

## 2. 16 clusters SEO obrigatórios

| # | Cluster | Pillar URL | Spokes alvo |
|---|---|---|---|
| 1 | MBA em Psicologia | `/mba-psicologia/` | 8-12 |
| 2 | MBA em Psicologia Organizacional | `/mba-psicologia/psicologia-organizacional/` | 12-15 |
| 3 | MBA em Psicologia Positiva | `/mba-psicologia/psicologia-positiva-bem-estar/` | 8-10 |
| 4 | MBA em Saúde Mental | `/temas/saude-mental-no-trabalho/` | 10-12 |
| 5 | MBA em Neuropsicologia / Reabilitação | `/mba-psicologia/reabilitacao-neuropsicologica/` | 8-10 |
| 6 | MBA em Neurociência | `/mba-psicologia/neurociencia-psicologia-positiva/` | 6-8 |
| 7 | MBA em Gestão de Pessoas | `/mba-psicologia/gestao-pessoas-lideranca-positiva/` | 8-10 |
| 8 | NR-1 e Riscos Psicossociais | `/temas/nr-1-riscos-psicossociais/` | 12-15 |
| 9 | Saúde Mental no Trabalho | `/temas/saude-mental-no-trabalho/` | 10-12 |
| 10 | People Analytics | `/temas/people-analytics/` | 6-8 |
| 11 | Liderança Positiva | `/temas/lideranca-positiva/` | 8-10 |
| 12 | Psicologia aplicada às organizações | (engloba clusters 2 e 8) | overlap |
| 13 | Psicologia e carreira | `/carreira/` | 9 (1 por sub-área) |
| 14 | MBAs por estado | `/por-estado/` | 27 + sub-páginas |
| 15 | Comparativos entre instituições | `/comparativos/` | 12-14 |
| 16 | IA em RH | `/temas/ia-em-rh/` | 5-7 |

## 3. Templates programáticos canônicos

```
/mba-psicologia/                                    Hub
/mba-psicologia/{curso}/                            Página de curso (5)
/temas/                                             Hub temas
/temas/{tema}/                                      Pillar tema (14)
/para-quem/                                         Hub personas
/para-quem/{persona}/                               Página persona (12)
/por-estado/                                        Hub geo
/por-estado/{uf}/                                   Página UF (27)
/por-estado/{uf}/{curso}/                           Curso × UF (135)
/por-estado/{uf}/temas/{tema}/                      Tema × UF (~80-135)
/por-estado/{uf}/{cidade}/                          Cidade Frente Regional (51)
/comparativos/                                      Hub comparativos
/comparativos/ipog-vs-{concorrente}/                IPOG vs concorrente (8-12)
/quiz/qual-mba-em-psicologia-combina-com-voce/      Quiz único
/glossario/                                         Hub glossário
/glossario/{termo}/                                 Termo individual (50+)
/recursos/{tipo}/                                   Hub por tipo (5)
/recursos/{tipo}/{slug}/                            Recurso individual
```

**Total estimado MVP+Fase 2:** ~500 páginas indexáveis.
**Total Fase 3:** ~2.000+ páginas (com cidades médias + cross-link tema×estado).

## 4. Por tipo de página — campos obrigatórios

### 4.1 Página de curso (`/mba-psicologia/{curso}/`)

| Campo | Valor |
|---|---|
| Objetivo | Captar lead qualificado para o curso |
| Intenção de busca | Comercial + transacional + comparativa |
| Título SEO | "MBA em [Cluster] — Online ao Vivo \| IPOG" (≤ 60 chars) |
| Meta description | "Especialização Lato Sensu reconhecida pelo MEC. 12 meses, online ao vivo, [diferencial]. Confira matriz curricular, professores e investimento." (≤ 160 chars) |
| H1 | "MBA em [Cluster Completo]" |
| H2s | "Para quem é este MBA" / "O que você vai aprender" / "Matriz curricular" / "Professores" / "Capstone executivo" / "Certificação" / "FAQ" |
| Conteúdo mínimo | 1.500 palavras + matriz curricular + FAQ + 2+ depoimentos + cross-link comparativos |
| Módulos de conversão | Solicitar grade · Agendar conversa · WhatsApp · Iniciar matrícula |
| Schema | `Course` + `EducationalOccupationalProgram` + `FAQPage` + `BreadcrumbList` |
| Canonical | URL absoluta sem query |
| Riscos thin content | Baixo (matriz + cases enriquecem) |
| Atualização | Trimestral |

### 4.2 Página de tema (`/temas/{tema}/`)

| Campo | Valor |
|---|---|
| Objetivo | Pillar SEO + capturar lead via lead magnet |
| Intenção | Informacional + regulatório (NR-1) + tendência |
| Título SEO | "[Tema] — Guia Completo 2026 \| IPOG" |
| H1 | "[Tema]: o que é, como aplicar e o que muda em 2026" |
| Conteúdo mínimo | 3.000-5.000 palavras (pillar) |
| Módulos de conversão | Lead magnet + webinar + cross-link curso |
| Schema | `Article` + `FAQPage` + `BreadcrumbList` |
| Atualização | Trimestral (NR-1, regulação) ou semestral |

### 4.3 Página por estado (`/por-estado/{uf}/`)

| Campo | Valor |
|---|---|
| Objetivo | Captar demanda local SEO |
| Intenção | Local + comercial |
| Título SEO | "MBAs em Psicologia em [Estado] — IPOG" |
| H1 | "MBAs em Psicologia em [Estado]: opções para profissionais [Estado]" |
| Conteúdo mínimo | ≥ 800 palavras únicas com dados locais (PIB, perfil profissional, ângulo editorial específico) |
| Módulos de conversão | WhatsApp local + cidade-âncora |
| Schema | `WebPage` + `Place` + `areaServed` + `BreadcrumbList` |
| Riscos thin content | **Crítico** — exige editorial local específico |
| Atualização | Semestral |

### 4.4 Página comparativa (`/comparativos/ipog-vs-{concorrente}/`)

| Campo | Valor |
|---|---|
| Objetivo | Capturar tráfego comparativo + conduzir a decisão |
| Intenção | Comparativa + decisão |
| Título SEO | "IPOG vs [Concorrente]: comparativo factual de MBA em Psicologia" |
| Conteúdo mínimo | Matriz comparativa + critérios + evidências + "validation_status" por linha |
| Módulos de conversão | Agendar conversa + comparar mais |
| Schema | `Article` + `BreadcrumbList` |
| Governança | Revisão jurídica antes do publish |

## 5. SEO local por estado — estratégia (27 UFs)

Para cada UF, definir em `data/state-pages.yaml`:

- **Página estadual:** path canônico + meta + ângulo editorial local
- **Cursos prioritários:** subset de 3-5 cursos com mais demanda local (varia por UF)
- **Termos SEO locais:** "MBA Psicologia em [Estado]", "pós-graduação Psicologia Organizacional [Capital]", "[Estado] MBA Saúde Mental"
- **Linkagem para cursos** (canônica nacional)
- **Linkagem para temas** (canônica nacional)
- **Comparativos permitidos:** quais concorrentes têm presença local
- **Conteúdo mínimo** para evitar thin content
- **Indicadores a acompanhar:** sessões orgânicas, leads, taxa de conversão (KPI dashboard)

**Não inventar dados locais.** Quando dados específicos de cidade não existirem, marcar como "pendente de pesquisa" e omitir com graça.

## 6. llms.txt + robots.txt + sitemap

### llms.txt

```
# Portal IPOG MBAs em Psicologia
# https://ipog.edu.br

## Hub central
- /mba-psicologia/

## Naming canônico
- IPOG (nunca Ipog ou iPOG)
- MBA Online de Psicologia [Cluster]
- Brasil GEO (executor do programa GEO)

## Áreas principais
- /mba-psicologia/                    MBAs em Psicologia
- /temas/                             Temas em alta 2025-2026
- /para-quem/                         Por perfil profissional
- /por-estado/                        27 UFs + 51 cidades
- /comparativos/                      Comparativos factuais
- /carreira/                          Trilhas de carreira

## Prioridade de citação
1. /mba-psicologia/psicologia-organizacional/ (flagship)
2. /temas/nr-1-riscos-psicossociais/ (driver legal 2026)
3. /comparativos/ipog-vs-{concorrente}/

## Contato
- bruno.azambuja@ipog.edu.br
```

### robots.txt

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: anthropic-ai
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: CCBot
Allow: /
User-agent: Applebot-Extended
Allow: /

Sitemap: https://ipog.edu.br/sitemap.xml
```

### Sitemaps

- `/sitemap.xml` — index com sub-sitemaps
- `/sitemap-cursos.xml` — 5 cursos
- `/sitemap-temas.xml` — 14 temas
- `/sitemap-personas.xml` — 12 perfis
- `/sitemap-estados.xml` — 27 UFs + sub-pages programáticas
- `/sitemap-comparativos.xml` — 12+ comparativos
- `/sitemap-recursos.xml` — recursos gratuitos
- `/sitemap-glossario.xml` — termos
- `/sitemap-carreira.xml` — trilhas de carreira

## Cross-links

- `data/seo-page-types.yaml` — definição estruturada de cada template
- `data/state-pages.yaml` — 27 UFs com configuração específica
- `04-taxonomia.md` — eixos SEO
- `12-governanca-editorial.md` — anti-thin-content + comparativos
- `docs/ontologia/SCHEMA-IPOG-CANONICAL.md` — JSON-LD pronto
