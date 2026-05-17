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

---

## 11. Deltas canônicas de 17/05/2026 — superseding partial contents acima

> **Importante:** este documento de 13/05 segue válido como base. As mudanças abaixo, capturadas nas waves A-E de 17/05 (5 sub-agents Opus paralelos, 203 sources, 70+ spot-checked), atualizam pontos específicos. Quando houver conflito, prevalece o que está aqui ou em `seo-geo-knowledge-base-2026-05-17.md`.

### 11.1 Atualizações na base acadêmica (substitui §1.2 quando aplicável)

- **Aggarwal et al. KDD 2024** — confirmação canônica: `https://arxiv.org/abs/2311.09735`. Veículo correto é KDD 2024 (não SIGIR 2023). Resultado headline +40% via 9 técnicas mantido.
- **Khosravi & Yoganarasimhan 2026** (`arXiv 2602.18455`) — efeito causal -15% no tráfego diário de artigos Wikipedia EN expostos a AIO; Cultura cai mais que STEM; PT-BR foi controle não-exposto.
- **Zhang, He, Yao 2026** (`arXiv 2604.25707`) — distinção fundadora **Citation Selection vs Citation Absorption** (21k citações, 18k páginas, 72 features). Aplicar como KPI canônico no dashboard.
- **Wallat et al. ICTIR 2025** — distinção formal **Correctness ≠ Faithfulness** em RAG attribution.
- **Zhao et al. 2026** (`arXiv 2605.07723`) — auditoria de 111M referências em 2,5M papers; **146.932 citações alucinadas em 2025**. Reforça regra interna de spot-check obrigatório.
- **Chen, Wang, Chen, Koudas 2025** (`arXiv 2509.08919`) — **earned media bias**: AI search favorece terceiros autoritativos sobre owned media; ChatGPT favorece marcas populares; Perplexity menciona mais marcas; AIO mais diverso; Copilot maior desigualdade.
- **Volpini et al. 2026** (`arXiv 2603.10700`) — markup JSON-LD sozinho dá ganho **modesto**; combinado com **entity page architecture enhanced** (instruções para agentes, breadcrumbs, neural search) gera **+29,6% acurácia RAG e +29,8% agentic**. Esta combinação é mais forte que o JSON-LD isolado que §3 listou.

### 11.2 Atualizações em standards técnicos (substitui §3 e §6)

- **FAQ Rich Result morreu em 07/05/2026** no Google Search. **`FAQPage` JSON-LD permanece válido e altamente recomendado para citação em AI Overviews (+3,2× citação).** Não remover do markup; o destino mudou de SERP para AI.
- **7 schemas perderam rich result em janeiro 2026:** Course Info, ClaimReview, EstimatedSalary, LearningVideo, SpecialAnnouncement, VehicleListing, PracticeProblem. Schema segue válido como sinal semântico.
- **`HowTo` rich result morto** mas schema segue válido para AI.
- **`Speakable` mantido como BETA; sem rich result; sinal canônico para AI Overviews hover preview.**
- **`@graph` triplo (Organization + Person + Article) cross-referenciado via `@id` ancorado em URL fragment** é o padrão canônico 2026 — já alinhado com `src/lib/schemas/`.
- **llms.txt: sem evidência estatística.** Estudo SE Ranking em ~300 mil domínios não encontrou correlação entre llms.txt e citação. Cloudflare/Vercel/Anthropic publicam por hygiene. **Manter como hygiene de baixo custo; nunca como linha principal.**
- **MCP (Model Context Protocol)** — padrão de fato 2026 com spec **2025-11-25** (Streamable HTTP substitui SSE). Doado em dez/2025 para **Agentic AI Foundation no Linux Foundation**. ChatGPT Plugins e `ai-plugin.json` mortos desde 09/04/2024.
- **`ai-context.json` e `ai-agents.json` NÃO são padrões.** Zero adoção em fontes canônicas. Não emitir como se fossem.
- **Web Bot Auth** — draft IETF `draft-meunier-web-bot-auth-architecture-05` publicado **02/03/2026** (Cloudflare + Google). Diretório `/.well-known/http-message-signatures-directory` retornando JWKS Ed25519.
- **PerplexityBot delistado dos Verified Bots Cloudflare em ago/2025** por crawler stealth com UA Chrome. Bloquear UA declarado não basta — combinar com Bot Management ou rate-limit por ASN.
- **Cloudflare Pay Per Crawl** — HTTP 402 + JWT + Web Bot Auth; **1+ bilhão de respostas 402/dia em mai/2026.** Beta privada.
- **Agent commerce:** Google **AP2** (set/2025, Intent/Cart/Payment mandates) + Coinbase **x402** (mai/2025, doado a Linux Foundation em 02/04/2026, 165M transações até fim de abril/2026).

### 11.3 Atualizações em comportamento dos engines (substitui §4)

- **ChatGPT:** GPT-5.3 Instant é default desde 04/03/2026. **Cita marcas em apenas 8% das respostas** vs **56% no GPT-5.4 Thinking** (delta dramatic). Domínios únicos por resposta caíram **20%** com a mudança. Atlas Browser macOS desde 21/10/2025; superapp ChatGPT+Codex+Atlas anunciado em mar/2026.
- **Claude Opus 4.7 GA em 16/04/2026.** Web search tool versão `web_search_20260209` com filtragem dinâmica. Citations API com campos `cited_text`/`title`/`url` que **não contam para tokens** — incentivo direto. Atenção: source attribution accuracy CAIU vs 4.6 em benchmarks (MindStudio). Skills + Connectors unificados em `claude.ai/directory` desde 31/03/2026.
- **Gemini / AI Overviews / AI Mode:** AI Mode em **pt-BR no Brasil desde 08/09/2025** rodando em Gemini 2.5 custom para Search. Em **06/05/2026** chegaram 5 atualizações: inline links próximos ao texto citado, hover preview no desktop, subscription highlight. Deep Research Max em Gemini 3.1 Pro lançou em 21/04/2026 com **MCP support nativo**.
- **Perplexity:** Sonar/Sonar Pro/Sonar Deep Research. **Deep Research roda em Claude Opus 4.5**; Comet Agent default Sonnet 4.6 Pro / Opus 4.6 Max. **Comet Browser global em mar/2026** (iOS/Android/Mac/Windows). **100% das respostas têm pelo menos uma citação** — diferente de ChatGPT que sintetiza.
- **Microsoft Copilot/Bing:** **AI Performance Report no Bing Webmaster Tools desde 10/02/2026** (public preview) — primeira fonte oficial gratuita de citation tracking Copilot por URL. **Habilitar no portal.**
- **Meta lançou Muse Spark em 08/04/2026** (closed-source, sai do open-source Llama). Meta AI **raramente cita fontes externas** — baixa prioridade.

### 11.4 Atualizações em fontes preferidas — DIFERENÇA pt-BR vs EN-US (novo)

Padrão pt-BR é radicalmente diferente do EN-US (Profound 2026):

| Canal | EN-US AIO | pt-BR AIO |
|---|---|---|
| YouTube | ~16% | **65%** |
| Reddit | ~30% | **7%** |
| Instagram | ~5% | **17%** |
| Wikipedia | alto | alto |
| LinkedIn | 14,3% (ChatGPT) | médio |

**Implicação para `posgraduacaopsicologia.com`:**

1. **YouTube precisa entrar no playbook como canal #1** — canal com transcripts limpos, chapter markers, descriptions ricas. Não copiar playbook americano de Reddit dominante.
2. **Reddit é residual em pt-BR** — não vale investimento exclusivo, mas marginal para queries EN globais.
3. **Instagram com alt-text e legenda densa** pode ser citado em AIO BR.
4. **LinkedIn Pulse 500-2000 palavras** segue alavanca para Claude e ChatGPT (sinergia com Person canônico do autor).

### 11.5 Atualizações em KPIs (substitui §5)

- **6 KPIs canônicos** consolidados em 2026: Mention Rate, Citation Rate, SoV-AI, AECR (desambiguar), NSS (Net Sentiment Score), AI-Referred Traffic & Conversion.
- **Atenção semântica: AECR usado com 2 sentidos.** ELCA = "AI Engagement & Conversion Rate" (resultado de negócio). Averi/Discovered/GenOptima = "AI Engine Citation Rate" (frequência de citação com link). **Recomendação canônica:** Brasil GEO adota "AECR-Conversion" e "Citation Rate" como nomes canônicos no portal.
- **Discovered Labs benchmarks setoriais:**
  - Citation Rate baseline 8-15%, otimizado 20-30%, **líder de categoria 30%+**.
  - **26% das marcas têm zero menções em AI Overviews** — não basta estar no Google.
  - Conversão AI-referred é **2,3× a 4,4× maior** que orgânico tradicional.
- **CTR posição 1 com AI Overview caiu de 27% para 11%** (SISTRIX mar/2026, -59%).
- **AI Overviews subiram de 6,49% (jan/25) para 13,14% (jan/26)** das queries Google.
- **AI Mode entrega 93% queries zero-click** vs 60% do Google clássico.
- **ChatGPT ativa web search em apenas 34,5% das queries** — 65% das respostas vêm de training data, fora de tracking real-time. Estratégia de **data presence pré-training cutoff** é tão importante quanto tracking semanal.
- **Vertical Educação está em 83% de presença AIO** (ALM Corp 2026). Canal dominante para pós-graduação.

### 11.6 Atualizações em fluxo de pesquisa (acrescenta a §9)

- **Calibração canônica de prompts:** **3-5 runs por prompt** (LLMs têm temperatura > 0 mesmo em search mode). Reportar **média + mediana + p90** com intervalo de confiança 95% antes de declarar tendência. Decompor por engine sempre.
- **Mix recomendado de prompts:** 40% comercial ("X vs Y", "qual o melhor") + 30% informacional aprofundado + 20% branded + 10% pain.
- **Cadência:** semanal é o sweet spot; diário só vale para mercados de alta volatilidade.
- **Spot-check de URL real obrigatório** — 146.932 citações alucinadas em 2025; nunca aceitar DOI gerado por Opus/Sonnet/GPT-4o sem dossiê Perplexity prévio.

### 11.7 Gaps estruturais identificados (para próximas waves)

1. **Sem benchmark canônico pt-BR de mention/citation rate para educação superior.** Brasil GEO deve publicar o primeiro — rodar baseline próprio de 50-100 prompts canônicos × 5 engines × 3-5 runs.
2. **Sem analista BR canônico em GEO** — espaço de posicionamento para Alexandre Caramaschi via newsletter semanal + dossiês públicos.
3. **Sem evento BR 2026 dedicado a GEO** — RD Summit, iMasters, Casa dos Criadores não têm tracks formais.

---

**Versão deste delta:** 2026-05-17 (síntese das waves A-E)
**Arquivo canônico de referência:** `docs/governance/seo-geo-knowledge-base-2026-05-17.md`
