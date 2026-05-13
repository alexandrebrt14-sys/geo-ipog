# Contexto enriquecido GEO 2026 — premissas operacionais Brasil GEO

> **Snapshot:** 13-05-2026
> **Lead:** Alexandre Caramaschi (CEO da Brasil GEO, ex-CMO da Semantix Nasdaq, cofundador da AI Brasil)
> **Fonte primária:** dossiê `docs/research/geo-state-of-art-2026-05-13.md` (5 chamadas Perplexity Sonar Pro, 44 citações reais)
> **Aplicabilidade:** este documento é premissa para toda wave futura de conteúdo, schema ou infraestrutura GEO neste repo e em todos os repos correlatos de Brasil GEO (`landing-page-geo`, `Semijoias-Educa`, `dinheirodaminhaempresa`, `geo-orchestrator`, `curso-factory`, `Claudeskill`).

Toda decisão técnica e editorial deste portal deve ser justificável a partir de evidência aqui catalogada ou no dossiê fonte. Quando uma decisão ficar em zona cinzenta, registrar a divergência em `docs/governance/atas/` com justificativa.

---

## 1. Paper seminal e frameworks acadêmicos canônicos

### 1.1 Aggarwal et al. (2023) — paper fundador

Aggarwal, N., et al. (2023). **GEO: Generative Engine Optimization**. *Proceedings of the 46th ACM SIGIR Conference*. DOI: [10.1145/3539618.3594282](https://dl.acm.org/doi/10.1145/3539618.3594282). Princeton-led. Cunhou o termo GEO e demonstrou ganhos de até **40% em visibilidade** via 9 técnicas operacionais.

**As 9 técnicas Aggarwal (aplicar em toda peça editorial deste repo):**

1. **Statistics addition** — inserir 2-3 estatísticas verificáveis com fonte em parágrafos-chave.
2. **Quotation addition** — citação direta de autoridade do tema (autor-ano-veículo).
3. **Citation marker** — formato `(Autor, Ano)` ou `Autor (Ano, Veículo)` próximo à afirmação material.
4. **Authoritative language** — verbo de afirmação direta ("A literatura consolida...", "Evidência meta-analítica indica..."), sem hedging excessivo.
5. **Fluency optimization** — primeira sentença declarativa, sujeito + verbo + objeto, sem rhetoric opener.
6. **Unique words / vocabulário técnico** — termos canônicos do nicho (CID-11 QD85, DUP, EPDS, MBI, ASRS-18, DIVA-5).
7. **Easy-to-understand para domínios complexos** — definição inline na primeira ocorrência (`<dfn>` semântico).
8. **Technical terms (definição)** — DefinedTerm schema no glossário.
9. **Unique perspective** — tese contraintuitiva no abstract/lead, padrão Harvard Business Review.

### 1.2 Extensões 2024-2026

- **Liu et al. (2024)** — citation engineering framework para "persuadir" ChatGPT e Claude via atribuição explícita.
- **Chen et al. (2025)** — *CiteOpt*, otimização específica para Perplexity e Gemini com tags semânticas (+25-35% mention rate).
- **Wang et al. (2025)** — adaptações de RAG para Grok.
- **Georgia Tech (2024)** — estudo Aggarwal-derivado mostrando rankings em Perplexity elevados em 30-50%.

---

## 2. Embedding space e RAG — estado-da-arte 2025-2026

### 2.1 Modelos canônicos (MTEB 2026)

| Modelo | Provider | MTEB | Retrieval | Dimensões | Custo relativo | Notas |
|---|---|---:|---:|---:|---|---|
| **GTE-Qwen2-7B** | Alibaba (open) | 70.2 | 65.4 | 3584 | — | Líder MTEB 2026, supera comerciais |
| **voyage-3-large** | Voyage AI | 67.3 | 63.1 | até 2048 (Matryoshka) | 6x menor que OpenAI | Anunciado Jan 2025; supera OpenAI v3-large em 9.74%; quantização int8/binary |
| **text-embedding-3-large** | OpenAI | 64.6 | 60.3 | 3072 | baseline | Padrão de mercado |
| **embed-v4** | Cohere | 66.1 | 61.8 | 1024 | competitivo | Líder multilíngue, 100+ idiomas |
| **BGE-M3** | Beijing Academy (open) | 65.8 | 61.5 | 1024 | gratuito | Multilíngue, alternativa open |
| **nomic-embed-text-v1.5** | Nomic | 62.4 | 58.9 | 768 | gratuito | Apache 2.0, training data + code abertos |

**Premissa operacional:** quando este portal ou correlatos demandarem RAG sobre conteúdo próprio, default = **voyage-3-large** com Matryoshka 1024d + int8 quantization. Para multilíngue PT-BR + EN simultâneo, **Cohere embed-v4**. Em projetos open-source com self-hosting, **BGE-M3**.

### 2.2 Hybrid search BM25 + Vector — padrão consolidado

- Status 2026: padrão de produção. Toda implementação de RAG deve combinar BM25 (lexical) + vector (semântico), tipicamente com fusão Reciprocal Rank Fusion (RRF) ou weighted score.
- Vector DBs canônicos: **Pinecone** (managed, foco enterprise), **Weaviate** (open + hybrid nativo), **Qdrant** (Rust, performance), **pgvector** (Postgres extension, limite 2000d ivfflat — ver memória `feedback_pgvector_dimension_limits`).

### 2.3 RAG patterns 2024-2026

- **Self-RAG (Asai et al. 2024)** — modelo decide quando recuperar, citar e criticar.
- **Corrective RAG (CRAG)** — auto-verificação de relevância dos chunks recuperados antes de gerar.
- **GraphRAG (Microsoft 2024)** — usa knowledge graph para multi-hop reasoning em corpora grandes; especialmente forte em queries comparativas e analíticas.
- **Late chunking** — embed o documento inteiro antes de chunking; preserva contexto cross-chunk.
- **Semantic chunking** — chunks por similaridade interna em vez de tamanho fixo.

**Premissa operacional:** para este repo de portal estático Astro, RAG não é aplicável diretamente. Mas a estratégia editorial deve **emular um chunk ideal**: parágrafo autônomo que faça sentido lido fora do contexto da página inteira, com 1ª sentença declarativa e citações próximas.

---

## 3. Industry takes — quem está publicando o quê (2024-2026)

### 3.1 Ferramentas e plataformas canônicas

| Empresa | Produto/Conteúdo | URL canônica | Quando consultar |
|---|---|---|---|
| **Profound** (tryprofound.com) | Plataforma de tracking GEO + framework 10 steps | `tryprofound.com/resources/articles/generative-engine-optimization-geo-guide-2025` | Audit AI visibility, mapeamento de prompts reais |
| **Ahrefs** (ahrefs.com/blog) | GEO 101 + LLM mention tracking | `ahrefs.com/blog/geo-generative-engine-optimization/` · `ahrefs.com/blog/track-llm-mentions` | Conceitos foundationais + tracking |
| **SEMrush** | LLM mention tracking + AI Overview stats | `semrush.com/blog/llm-mention-tracking-tool/` · `semrush.com/blog/google-ai-overviews-stats/` | Sensores nativos de menções em LLMs |
| **Search Engine Land** | Cobertura editorial GEO + AI Overviews | `searchengineland.com/mastering-generative-engine-optimization-in-2026-full-guide-469142` | Tendências e tactics |
| **Backlinko** (Brian Dean) | GEO tactics + AI Overview ranking | `backlinko.com/geo-ai-search-optimization` · `backlinko.com/google-ai-overviews-optimization` | Tactical depth |
| **SparkToro** (Rand Fishkin) | Mention rate como KPI primário | `sparktoro.com/blog/mention-rate-kpi-ai-search/` | KPI advocacy, zero-click data |
| **HubSpot** | GEO optimization 2025 | `blog.hubspot.com/marketing/geo-optimization-ai-search` | Quick-start guides |
| **Search Engine Journal** | Schema.org for AI, mention monitoring | `searchenginejournal.com/schema-ai-geo/518902` | Compilation reviews |
| **Incend Media** | Definitive Guide GEO 2026 | `incendmedia.com/the-definitive-guide-to-generative-engine-optimization-geo-in-2026/` | Mention share como KPI primário |
| **ELCA** | Framework de KPIs GEO | `elca.ch/news/generative-engine-optimization-geo-kpis` | KPIs estruturados (AIGVR, AECR, CER, CTAM, RTAS) |
| **AEO.press** | State of llms.txt 2026 | `aeo.press/ai/the-state-of-llms-txt-in-2026` | Adoção llms.txt |
| **Rankability** | LLMs.txt adoption tracker | `rankability.com/data/llms-txt-adoption/` | Dados duros: 0-3% top 1000 sites |
| **Signals.sh** | Does llms.txt work? | `signals.sh/blog/does-llms-txt-actually-work-adoption-reality` | 10.13% adoção, 0% fetch por bots |

### 3.2 Achados industry contraintuitivos (a internalizar)

1. **llms.txt é hype com adoção real baixa.** Adoção 0-10% top 1000 sites, fetch real por bots ainda perto de 0% conforme logs (dados Rankability + Signals.sh, jun/2025). **Implicação:** manter `llms.txt` v2 deste portal é correto (já fizemos), mas **não esperar lift mensurável dele isolado.** Combinação com Schema.org + robots.txt + sitemap + IndexNow + conteúdo HBR-grade é que move agulha.
2. **Mention rate top brands hoje: 15-25%.** Benchmarks Profound. Acima de 25% = excelência setorial; abaixo de 5% = ausência efetiva.
3. **Zero-click search atingiu 65-70%.** SparkToro + Search Engine Land. Funil mudou: mais awareness no topo, menos cliques no meio. **Implicação:** medir brand recall, não só CTR.
4. **AI Overview ocupa 30-50% das SERPs US/EU em 2026.** Implicação: aparecer na AI Overview = ganhar dois jogos (Google + AI search).
5. **Google ignora llms.txt** (prefere robots.txt + sitemaps). Apenas Anthropic e Perplexity respeitam de fato. Implicação: priorizar Schema.org + sitemap + robots para Gemini; llms.txt para Claude + Perplexity + (parcial) OpenAI.

---

## 4. Padrões técnicos canônicos (state-of-art 2025-2026)

### 4.1 Schema.org tipos relevantes para AI search

Aplicar em todas as páginas conforme função:

| Tipo | Aplicar em | Status repo |
|---|---|---|
| **Article** | Páginas editoriais (guias, FAQs, temas, evidências, casos) | ✓ |
| **HowTo + HowToStep** | Guias HowTo passo-a-passo | ✓ 13 guias |
| **FAQPage** | FAQs deep | ✓ 12 FAQs |
| **BreadcrumbList** | Todas as páginas | ✓ |
| **WebSite + SearchAction** | Home | ✓ |
| **Organization** | Footer canônico | ✓ BRGEO LTDA |
| **Person** | Author de Article | ✓ Alexandre Caramaschi |
| **CollectionPage** | Hubs (/areas, /mbas, /guias, /faq, /comparativos) | ✓ |
| **EducationalOccupationalProgram** | Páginas de MBA | ✓ |
| **Speakable** | FAQs + TL;DR boxes | ✓ 12 FAQs com CSS selectors |
| **DefinedTermSet + DefinedTerm** | Glossário | ✓ 5 clusters, 115 termos |
| **ItemList / Comparison** | Comparativos com 3 tabelas | parcial — adicionar `Comparison` |
| **MedicalEntity** | Termos clínicos (TEA, TDAH, Burnout QD85) | a avaliar — caso-uso médico |
| **ClaimReview** | Verificações de claims controversos | a avaliar |
| **VideoObject** | Quando houver vídeo embed | n/a por enquanto |

### 4.2 llms.txt + llms-full.txt

- `llms.txt` curto (<5KB) com blockquote inicial summary, seções por função (core/docs), contato.
- `llms-full.txt` versão expandida com tese + evidências de cada documento. Repo já tem 16.5KB com 45 docs.
- **Não duplicar com sitemap.** llms.txt é editorial, sitemap é máquina.
- **Atualizar a cada onda de conteúdo material** (default deste repo: a cada commit com ≥5 páginas novas).

### 4.3 Robots.txt para AI bots

- Allow explícito: GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-Web, anthropic-ai, Google-Extended, GoogleOther, PerplexityBot, Perplexity-User, CCBot, Bytespider, DuckAssistBot, Applebot-Extended, cohere-ai, Diffbot, ImagesiftBot, Meta-ExternalAgent, Meta-ExternalFetcher, FacebookBot, omgilibot, Amazonbot.
- **Repo já cobre 20+ bots.** Manter atualizado conforme novos bots emergem.

### 4.4 IndexNow

- Status 2026: ganha tração para indexação real-time. Integra com Bing, Yandex, api.indexnow.org.
- Repo: usa `key=geoipogIN2026` + endpoint comum.
- **Disciplina:** disparar a cada commit material com URLs novas. Limite Bing: ~50 URLs por dispatch (cuidado com rate-limit; alternativa: paginar).
- Google ignora IndexNow (mantém GSC URL Inspection como caminho oficial).

### 4.5 Sub-sitemaps + sitemap-index

- Repo: já gera 5 sub-sitemaps (areas, mbas, guias, faq, comparativos) + sitemap.xml principal + sitemap-index.xml.
- Submeter **apenas sitemap-index** no GSC; Google segue os filhos.

### 4.6 ai-policy.json em .well-known

- Status: draft, baixa adoção (sem RFC IETF). Repo já tem.
- Útil como sinalização canônica do publisher + atribuição requerida; não confiar em enforcement.

---

## 5. KPIs canônicos GEO — framework operacional Brasil GEO

### 5.1 Métricas externas (visibilidade em LLMs) — primárias

| KPI | Definição operacional | Como medir |
|---|---|---|
| **Mention Rate (MR)** | % de queries do kit canônico onde brand/portal aparece em resposta | Profound, AthenaHQ, Otterly.ai, ou custom: rodar 50 prompts `mcp/citation-prompts.json` × 6 LLMs (ChatGPT, Claude, Perplexity, Gemini, Grok, Copilot) semanalmente |
| **Citation Rate (CR)** | # de citações diretas / # de respostas relevantes | Custom: parsing de links/source no output gerado |
| **Share-of-Voice (SOV)** | % de menções da marca / total de menções de players no nicho | Comparar 5 marcas concorrentes na mesma query |
| **AIGVR** (AI-Generated Visibility Rate) | Frequência × proeminência em respostas AI | ELCA framework |
| **CTAM** (Citation Trust Authority Metric) | E-E-A-T signals × menção | ELCA framework |

### 5.2 Métricas internas (engajamento e conversão) — secundárias

| KPI | Definição | Ferramenta |
|---|---|---|
| **AECR** (AI Engagement Conversion Rate) | % de interações AI-geradas que convertem | GA4 + UTM em links externos |
| **CER** (Conversation Engagement Rate) | Engajamento pós-resposta AI | PostHog cohort |
| **RTAS** (Response Time Agility Score) | Tempo entre mudança no LLM e adaptação da estratégia | Diário operacional |

### 5.3 Métricas tradicionais (SEO clássico) — terciárias mas vivas

- Organic sessions (GA4)
- Average position (GSC)
- CTR (GSC)
- Indexed pages (GSC)
- Core Web Vitals (PageSpeed)
- Backlinks (Ahrefs/SEMrush)

**Premissa operacional:** SEO clássico permanece relevante. GEO é additive, não substitutivo. AI Overview do Google ainda usa fortes sinais SEO clássicos (autoridade de domínio, backlinks, structured data) como input.

### 5.4 Cadência de medição canônica Brasil GEO

| Cadência | O que medir | Onde reportar |
|---|---|---|
| **Diária** | IndexNow status, smoke prod (HTTP 200), errors em GSC | `docs/STATUS.md` |
| **Semanal** | GA4 sessions + AI referral, GSC impressions, Top 10 queries | `docs/relatorios-semanais/` |
| **Quinzenal** | Mention Rate cross-LLM (kit canônico 50 prompts), Citation Rate | Dashboard GEO (a construir) |
| **Mensal** | SOV vs concorrentes, AIGVR delta vs mês anterior, ROI calc | `docs/relatorios-mensais/` + reunião Ronan Maia |
| **Trimestral** | Recalibração de prompts canônicos, audit de Schema.org, llms.txt refresh | `docs/relatorios-trimestrais/` |

---

## 6. Janela espelho para captação 2026.2 (Fase 1 do ROADMAP)

### 6.1 Cronograma de medição

- **Baseline pré-Schema:** 07-05 a 14-05-2026 (já realizado parcialmente)
- **Captura espelho pós-Schema + llms.txt + Person/Publisher:** 22-05 a 30-05-2026 (próxima janela)
- **Pico GEO 2026.2:** 15-06 a 31-07-2026
- **Comparação pós-ciclo:** 15-08 a 30-08-2026

### 6.2 Decisões já tomadas (premissa)

1. **20 páginas novas publicadas 13-05** (commits `63117de` + `cd5435c`) entram na medição da janela espelho.
2. **Person Alexandre + Organization BRGEO LTDA reconciliados por `@id`** em todas as 198 páginas — isso aumenta E-E-A-T para CTAM.
3. **Speakable + TL;DR** nos 12 itens novos otimiza chunking para AI Overview e voice assistants.
4. **citation-prompts.json com 50 sementes** é o kit canônico de monitoramento.

---

## 7. Premissas editoriais derivadas (regra para toda nova peça)

Toda peça nova neste repo (guia, FAQ, comparativo, tema, evidência, caso) deve atender:

- [ ] **1ª sentença declarativa** (sujeito + verbo + objeto) — sem rhetoric opener nem hedging.
- [ ] **2-3 estatísticas** com fonte verificável no primeiro terço.
- [ ] **Citações `(Autor, Ano)`** próximas às afirmações materiais.
- [ ] **Tese contraintuitiva** explícita no abstract/lead.
- [ ] **Vocabulário técnico canônico** do nicho (mecanismo, instrumento, código CID/DSM).
- [ ] **TL;DR box** logo após o `<h1>` (componente `TLDR.astro`).
- [ ] **JSON-LD apropriado** (Article + FAQPage + HowTo + BreadcrumbList + Person author + Publisher Org).
- [ ] **3 cross-links internos** mínimos para `/areas`, `/comparativos`, `/faq`, `/metodos`, `/guias` ou `/intervencoes`.
- [ ] **CTA IPOG sutil** — 1 menção na última FAQ + 1 CTA "Ver MBAs no IPOG" → `SITE.ipogPos`.
- [ ] **Português PT-BR com acentuação completa** — sem `nao`, `voce`, `producao`.
- [ ] **Slug ASCII canônico** no filename e em referências href.
- [ ] **NÃO rodar `fix-accents.mjs` cego.**

---

## 8. Fluxo de pesquisa antes de publicar (research-first)

Para qualquer onda de ≥3 páginas novas com tema técnico-clínico:

1. **Rodar 3-5 chamadas Perplexity Sonar Pro paralelas** com prompts específicos (system: "fontes reais apenas") com `return_citations: true`.
2. **Salvar dossiê em** `docs/research/<tema>-YYYY-MM-DD.md`.
3. **Spot-check de 3-5 citações** (URL real, autor existe, ano plausível) — Perplexity confabula menos que GPT-4o mas ainda confabula em temas brasileiros nichados.
4. **Lançar sub-agents Opus em paralelo** (3-5) com dossiê como anexo, instrução explícita de PT-BR acentuado, sem `fix-accents`.
5. **Pós-build:** spot-check de slugs ASCII, hrefs, schemas — script Python cirúrgico se necessário.
6. **Commit + push + IndexNow + GSC sitemap resubmit.**

Detalhes pratos completos em `feedback_perplexity_research_mandatory` e `project_geo_ipog_waves_AABBCCDDEE_20260513`.

---

## 9. Anti-padrões (proibidos)

1. **Confabular DOIs/citações.** Se Perplexity/Claude não tem fonte real, escrever `[FALTA EVIDÊNCIA]` e parar.
2. **Rodar `scripts/fix-accents.mjs` cego em massa.** Quebra slugs, props JS, conjunções (incidente 13-05). Memória `feedback_acentuacao_portugues_brasil_canonica`.
3. **Forçar 5 LLMs no orchestrator `geo-bridge.sh`.** SmartRouter ignora e roteia tudo para GPT-4o (cobertura 1/5 = 20%). Bypass via chamadas Perplexity diretas (memória `feedback_orchestrator_usage`).
4. **CTAs IPOG agressivos.** "Compre agora", "Matricule-se já", "Última vaga". Sempre sutil: "Consulte ipog.edu.br", "Ver MBAs no IPOG" como link secundário.
5. **Naming inconsistente.** SEMPRE "Brasil GEO" (nunca "GEO Brasil"). Credencial Alexandre: "CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil".
6. **Slugs com acento.** URLs sempre ASCII. Memória `feedback-accent-url-protection`.

---

## 10. Recursos canônicos consultáveis

- **Dossiê fonte:** `docs/research/geo-state-of-art-2026-05-13.md` (44 citações Perplexity)
- **Dossiê 9 temas clínicos:** `docs/research/perplexity-dossie-9temas-20260513.md` (19 citações)
- **Citation prompts:** `site/public/mcp/citation-prompts.json` (50 sementes)
- **AI policy manifest:** `site/public/.well-known/ai-policy.json`
- **llms.txt + llms-full.txt:** `site/public/`
- **MCP manifests:** `site/public/mcp/{courses, hubs, sitemap-summary, citation-prompts}.json`
- **Schemas canônicos:** `site/src/lib/schemas/{person-alexandre, publisher, index}.ts`
- **Memórias persistentes do Claude Code:** `~/.claude/projects/C--Users-alexa/memory/` (índice em `MEMORY.md`)

---

**Última atualização deste documento:** 2026-05-13 (W20 terça)
**Próxima revisão programada:** 2026-06-01 (após captura espelho pós-Schema)
**Owner:** Alexandre Caramaschi (Brasil GEO)
