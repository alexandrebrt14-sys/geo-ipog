# STATUS · GEO IPOG · posgraduacaopsicologia.com

> **Snapshot:** 2026-05-12 (W20 segunda-feira)
> **Lead Brasil GEO:** Alexandre Caramaschi
> **Reunião de cadência:** terça-feira 10h00 BRT (próxima: 2026-05-19)
> **Arquivo canônico:** este documento. Atualizado a cada commit material de conteúdo, infraestrutura ou observabilidade. Para histórico semanal, ver `docs/relatorios-semanais/`.

---

## 1. Visão executiva

| KPI | Estado em 11-05 | Estado em 12-05 | Δ |
|---|---:|---:|---:|
| Páginas estáticas em produção | 95 | **176** | **+81** |
| Menus top-level (mega-menus) | 4 (Guia, MBAs, Áreas, Por estado) | **7** (+ Métodos, Conhecimento, Guias) | +3 |
| UFs com página dedicada | 5 (SP, RJ, MG, PR, GO) | **27** (100% Brasil) | +22 |
| Áreas com página HBR | 12 | **18** (100% taxonomia) | +6 |
| Sub-páginas por MBA | 0 | **15** (3 por MBA × 5 MBAs) | +15 |
| Schema.org distintos | Article, FAQ, BreadcrumbList | + EducationalOccupationalProgram + HowTo + HowToStep + DefinedTermSet + CollectionPage | — |
| Sitemap submetido GSC | 95 URLs | **176 URLs** | +81 |
| IndexNow propagações 12-05 | 0 | **85 URLs** em 3 engines (indexnow.org, Bing, Yandex) | +85 |
| Custo orchestrator dia | US$ 0 | **US$ 0,60** (perplexity + gpt4o + gemini + groq + claude_sonnet) | +0,60 |

Status global de fase: **Fase 1 (Baseline + Schema piloto) acelerada** — entrega adiantada sobre o plano de fase 2 (Engenharia de citação + 7 peças HBR). Risco R-001 (decisão de produto IPOG) permanece em escalada e não bloqueia o avanço editorial enquanto roteia toda menção a "MBA Online de Psicologia do IPOG" para o portal oficial `ipog.edu.br`.

---

## 2. Taxonomia canônica do site

O site é organizado em **6 eixos taxonômicos** + **3 hubs editoriais novos (12-05)** + **3 ferramentas de leitor**.

### 2.1 Eixos taxonômicos (estrutura programática)

| Eixo | Slug raiz | Páginas | Cluster lógico |
|---|---|---:|---|
| Áreas da Psicologia | `/areas/` | 20 (1 index + 1 catch-all + 18 áreas) | POT+bem-estar / Neuro+avaliação / Demais |
| MBAs do IPOG | `/mbas/` | 21 (1 index + 5 MBAs + 15 sub-páginas grade/metodologia/perfil) | POT / Positiva / Neuro / NCPP / Liderança |
| Temas em alta | `/temas/` | 26 (1 index + 25 temas) | Regulação / Organizacional / Intervenção / Tecnologia / Neuro |
| Estados | `/por-estado/` | 29 (1 index + 1 catch-all + 27 UFs) | 5 regiões |
| Personas | `/para-quem/` | 5 (1 index + 4 personas) | psicólogos / RH / líderes / consultores |
| Carreira | `/carreira/` | 7 (1 index + 6 trilhas) | POT / Neuro / Avaliação / Perícia / Saúde corporativa / Consultoria |

### 2.2 Hubs editoriais novos (criados em 12-05-2026)

| Hub | Slug raiz | Páginas | Propósito |
|---|---|---:|---|
| Métodos terapêuticos | `/metodos/` | 6 (1 hub + TCC/ACT/DBT/Mindfulness/EMDR) | Psicoterapias baseadas em evidência |
| Evidências (papers 2025-2026) | `/evidencias/` | 7 (1 hub + 6 sub) | Síntese da literatura atual com tabelas de papers-chave |
| Casos compostos HBR | `/casos/` | 6 (1 hub + 5 cases) | Estudos de caso baseados em padrão recorrente, sigilo preservado |
| Intervenções (protocolos) | `/intervencoes/` | 6 (1 hub + 5 protocolos) | Stepped Care / IAPT / Matriciamento / Crise / Retorno ao trabalho |
| Guias HowTo | `/guias/` | 7 (1 hub + 6 guias) | Passo-a-passo mobile-first com Schema.org HowTo |
| FAQs aprofundadas | `/faq/` | 7 (1 hub + 6 FAQs) | 1 tema por página · 82 Q&As com 1ª sentença declarativa ≤30 palavras (otimização AI Overview) |

### 2.3 Ferramentas de leitor

| Recurso | Slug | Propósito |
|---|---|---|
| Glossário cluster | `/glossario/` + `/glossario/<cluster>/` | 1 single-page original + 5 sub-páginas cluster (115 termos definidos: regulação 21, instrumentos 22, métodos 25, conceitos-pot 22, conceitos-neuro 25) |
| Comparativos | `/comparativos/` | 12 (1 index + 11): 5 originais (MBA-vs-Esp, neuro-vs-reab, online-vs-presencial, positiva-vs-org, pot-vs-gestão) + 6 novos (ACT-vs-TCC, EMDR-vs-TCC-trauma, mindfulness-vs-ACT, presencial-vs-híbrido-vs-online, BR-vs-PT, IA-vs-terapeuta) |
| Recursos pillar | `/recursos/` | 4: checklist, guia pillar, quiz, index |
| Pillar pós-graduação | `/pos-graduacao-psicologia/` | 4 (pillar + tipos + como-escolher + MBA-vs-Esp) |
| Regulação | `/regulacao` | 1 single-page |
| Mapa do site | `/mapa-do-site` | 1 single-page (HTML sitemap) |

---

## 3. Padrões editoriais e técnicos

### 3.1 Voice Guard (`content/VOICE-GUIDE.md` + `content/PADRAO-EDITORIAL.md`)

- **Voz Brasil GEO/Alexandre Caramaschi:** terceira pessoa analítica, tese contraintuitiva, paragrafação curta (3-5 linhas), (Autor, Ano, Veículo) explícito em afirmações não triviais, sem rhetoric openers.
- **Score mínimo:** 70/100 ponderado (Anti-clichê 30% / Bloom-andragogia 30% / Naming canônico 25% / HBR style 15%).
- **Naming canônico OBRIGATÓRIO:** "Brasil GEO" (nunca "GEO Brasil"), "IPOG" (nunca "Ipog/iPOG/I.P.O.G."), "MBA Online de Psicologia" (nunca "MBA EAD Psicologia" ou "Pós Online Psicologia"), "Ao Vivo síncrono", "CFP", "CRP", "MEC".
- **Naming proibido (bloqueio crítico):** "GEO Brasil", "Especialista #1", "Source Rank", "geobrasil.com.br", "sourcerank.ai", "Alex" ou "A. Caramaschi".

### 3.2 Schema.org aplicado

| Tipo Schema | Onde |
|---|---|
| `Article` | Todas as páginas de conteúdo (areas, temas, casos, evidências, guias) |
| `FAQPage` | Hub `/faq/`, todas sub-páginas FAQ, áreas com FAQ-block, MBAs, comparativos |
| `BreadcrumbList` | Todas as páginas profundas (≥2 níveis) |
| `EducationalOccupationalProgram` | `/mbas/<id>` + 15 sub-páginas |
| `HowTo` + `HowToStep` | 6 guias em `/guias/` (rich snippet com passos numerados) |
| `DefinedTermSet` | 5 sub-páginas do glossário (115 termos) |
| `CollectionPage` | Hub pages (/guias/, /casos/, /faq/, /comparativos/, /metodos/, /evidencias/, /intervencoes/) |
| `Place` + `addressRegion` | 27 UFs em `/por-estado/<uf>` |

### 3.3 Acentuação PT-BR

REGRA INVIOLÁVEL: textos visíveis em PT-BR completo (`não`, `você`, `também`, `público`, `técnico`). ASCII apenas em paths, slugs, atributos técnicos. Voice Guard pré-publicação previne regressão.

### 3.4 Mobile-first (aplicado a partir do round 3, 12-05)

- Heros: `flex flex-col lg:flex-row lg:items-end justify-between gap-4`
- Grids: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`
- Tabelas: SEMPRE wrapper `<div class="overflow-x-auto rounded-2xl border border-surface-200">` + `<table class="min-w-full text-sm">`
- Botões: `h-11` mínimo (Apple HIG touch target 44px)
- Aside: `lg:col-span-4` + `lg:sticky lg:top-20` (stack mobile no fim)
- Paddings progressivos: `py-7 md:py-10 lg:py-12`

---

## 4. Pipeline operacional

### 4.1 Stack frontend

- **Framework:** Astro 4.16 (static) + React 18 islands + TypeScript 5 + Tailwind 3.4
- **Repo:** `alexandrebrt14-sys/geo-ipog` em `site/`
- **Build:** `cd site && npm install && npm run build` → `site/dist/`
- **Deploy:** `npx wrangler pages deploy site/dist --project-name=posgraduacaopsicologia --branch=main`
- **Fonte da verdade da taxonomia:** `site/src/lib/data.ts` (AREAS, MBAS, TEMAS, ESTADOS, PERSONAS, FAQS, NAV_MENUS, METODOS, EVIDENCIAS, CASOS, INTERVENCOES, GUIAS, FAQS_DEEP, GLOSSARIO_CLUSTERS, TEMAS_EMERGENTES_2025_2026)

### 4.2 Infraestrutura

| Recurso | Identificador | Conta |
|---|---|---|
| Domínio | `posgraduacaopsicologia.com` (3 anos, expira 2029-05-11) | BRGEO LTDA (CNPJ 66.051.295/0001-33) |
| Cloudflare zone | `295d3886...` | brasilgeo (`Bbrasilgeo@gmail.com`) |
| Cloudflare Pages project | `posgraduacaopsicologia` | brasilgeo |
| API token CI | `geo-ipog CI` (ID `0979089e...`) | GH Secret `CLOUDFLARE_API_TOKEN` |
| GSC property | `sc-domain:posgraduacaopsicologia.com` | alexandre.brt14 |
| IndexNow key | `d2b9ebce0365f8fc565be54671f9fae8` em `/.txt` | — |

### 4.3 Orchestrator 5 LLMs (`bash C:/Sandyboxclaude/scripts/bin/geo-bridge.sh run "demanda"`)

| LLM | Modelo | Especialidade |
|---|---|---|
| Perplexity | `sonar-deep-research` | Pesquisa ao vivo com fontes (papers, dossiês) |
| GPT-4o | `gpt-4o` | Redação técnica, copywriting |
| Gemini Pro | `gemini-2.5-pro` | Análise estrutural, dados |
| Gemini Flash | `gemini-2.5-flash` | Inferência rápida, sumarização |
| Groq | `llama-3.3-70b-versatile` | Classificação rápida, resumos |
| Groq Heavy | `openai/gpt-oss-120b` | Fast reasoning + code review |
| Claude Opus | `claude-opus-4-7-1m` | Arquitetura, código, revisão final |
| Claude Sonnet | `claude-sonnet-4-6` | Balanced code/writing |
| Claude Haiku | `claude-haiku-4-5` | Classificação rápida |

**Regra Perplexity obrigatório** quando demanda exige papers ≤30 dias ou contexto factual ao vivo. Sub-agents Opus de escrita podem confabular DOIs.

---

## 5. Histórico de execução · 12-05-2026

3 rounds de waves complementares executados sequencialmente em ~60 min wall-clock. Detalhamento canônico em `docs/engineering/waves-execution-log.md`.

| Round | Commit | Waves | Páginas | Custo orchestrator |
|---|---|---|---:|---:|
| 1 | `cc19dd6` | K (orchestrator) · L (22 UFs) · M (6 áreas) · N (15 sub-MBAs) · O (/metodos hub+5) | 49 | US$ 0,13 |
| 2 | `58503e9` | P (orchestrator+Perplexity) · Q (/evidencias hub+6) · R (8 temas 2025-2026) · S (/casos hub+5) · T (/intervencoes hub+5) | 27 | US$ 0,12 |
| 3 | `4d7d31f` | U (orchestrator+Perplexity) · V (/guias hub+6) · W (6 comparativos) · X (/faq hub+6) · Y (6 temas 2026) · Z (/glossario 5 clusters) | 31 | US$ 0,37 |
| **Total dia** | — | 18 waves logical · 16 Opus sub-agents · 4 orchestrator runs | **107** | **US$ 0,60** |

---

## 6. Observabilidade

### 6.1 Smoke test contínuo

Após cada deploy, 6-8 URLs amostradas com `curl -sIL` esperando HTTP 200. Última execução 12-05 às 08:04 BRT: 7/7 HTTP 200.

### 6.2 IndexNow

Cada deploy material dispara `POST api.indexnow.org/IndexNow` com lista de URLs novas + ping individual em `bing.com/indexnow` e `yandex.com/indexnow`. Logs em commit message.

### 6.3 GSC sitemap

Sitemap auto-gerado por `site/scripts/gen-sitemap.mjs` após build. Resubmissão manual periódica via Chrome MCP no GSC (`authuser=4`).

### 6.4 Dossiês Perplexity

Salvos em `docs/research/`:
- `perplexity-dossier-2026-05-12.md` (32KB · papers 2025-2026 cluster 6 temas)
- `perplexity-dossier-2026-clusters-a-f.md` (30KB · 6 clusters específicos TEA/burnout-saúde/IA/TDAH/perinatal/psicose)

Servem como fact-check source para revisar citações dos sub-agents Opus que escreveram baseados em training cutoff.

---

## 7. Próximas ondas (planejamento)

### 7.1 Fase 1 — concluir baseline (deadline 30-05-2026)

- [ ] Validar todas as 176 páginas no Rich Results Test (amostra estratificada por tipo de Schema)
- [ ] Substituir DOIs marcados `[verificar]` por DOIs do dossiê Perplexity
- [ ] Implementar `llms.txt` em raiz com sumário de hubs e personas
- [ ] Adicionar `robots.txt` permissivo para crawlers de IA (PerplexityBot, ClaudeBot, GPTBot, Google-Extended)

### 7.2 Fase 2 — engenharia de citação (01 a 13 jun 2026)

- [ ] 7 peças HBR-grade assinadas Alexandre Caramaschi em `alexandrecaramaschi.com/educacao/` cross-linkando para `posgraduacaopsicologia.com/<hub>/`
- [ ] Cross-linking interno aprimorado: cada página deve ter 3-5 anchors contextuais para hubs relacionados
- [ ] Wikipedia: aprovação de verbete IPOG e cross-link sutil para curso de Psicologia (drafts em `docs/wikipedia-draft-*.wikitext`)

### 7.3 Pré-pico 2026.2 (14 jun a 31 jul 2026)

- [ ] Monitoramento NAIA `mention rate` por persona em ChatGPT/Claude/Gemini/Perplexity/Copilot — baseline 15-06, target +30% até 15-07
- [ ] Schema piloto `Course` + `EducationalOccupationalProgram` no `ipog.edu.br` (depende M03/M06 e R-001 IPOG)

---

## 8. Risco corrente

| ID | Descrição | Status | Impacto |
|---|---|---|---|
| R-001 | Decisão produto IPOG (Ronan Maia) sobre uso de MBA + naming canônico | ESCALADA · prazo 2026-05-15 | Bloqueia M01/D02/D03/D04 |
| R-009 | GA4 referrer/UTM pendente em TI IPOG | ATIVO · prazo 2026-05-25 | Bloqueia observabilidade de origem de tráfego |
| R-013 | Gap Wikipedia/Reddit em verbete IPOG | ATIVO · novo na W19 | Reduz autoridade externa para LLMs |

Lista completa em `docs/05-risk-register.md`.

---

## 9. Arquivos canônicos relacionados

- **README:** [`README.md`](../README.md)
- **Roadmap:** [`ROADMAP.md`](../ROADMAP.md)
- **Risk register:** [`docs/05-risk-register.md`](05-risk-register.md)
- **Marcos críticos 2026:** [`docs/06-marcos-criticos-2026.md`](06-marcos-criticos-2026.md)
- **Stack frontend:** [`docs/engineering/frontend-stack.md`](engineering/frontend-stack.md)
- **Patterns UI:** [`docs/engineering/ui-patterns.md`](engineering/ui-patterns.md)
- **SEO indexing runbook:** [`docs/engineering/seo-indexing.md`](engineering/seo-indexing.md)
- **Site content inventory:** [`docs/engineering/site-content-inventory.md`](engineering/site-content-inventory.md)
- **Waves execution log:** [`docs/engineering/waves-execution-log.md`](engineering/waves-execution-log.md)
- **Relatório semanal vigente:** [`docs/relatorios-semanais/2026-W20-11-a-17-maio.md`](relatorios-semanais/2026-W20-11-a-17-maio.md)
- **Dossiês Perplexity:** [`docs/research/`](research/)

---

*Última atualização:* `2026-05-12 08:30 BRT` · Alexandre Caramaschi
