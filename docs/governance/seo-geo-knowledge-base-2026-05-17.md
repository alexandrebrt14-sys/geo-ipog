# Knowledge Base canônica SEO + GEO 2026 — síntese das 5 waves de pesquisa

**Data:** 2026-05-17
**Repositório:** `alexandrebrt14-sys/geo-ipog`
**Lead:** Alexandre Caramaschi — CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil
**Escopo:** taxonomia operacional do estado-da-arte em Generative Engine Optimization e SEO em maio/2026, destilada de cinco dossiês paralelos rodados em 2026-05-17 por sub-agents Opus.

---

## 0. Como usar este documento

Este arquivo é a **porta de entrada** para o conhecimento canônico GEO+SEO 2026 deste repositório. Estrutura:

1. Sumário executivo das mudanças que afetam decisão neste portal.
2. Taxonomia em 7 ramos com pointer para o dossiê de origem.
3. Mapa de sources (papers, plataformas, analistas, padrões).
4. Glossário canônico unificado.
5. Checklist de implementação para `posgraduacaopsicologia.com` em 2026.
6. Roadmap de waves futuras.

Os 5 dossiês completos estão em `docs/research/`:

- [Wave A — Papers acadêmicos GEO/SEO 2025-2026](../research/wave-A-papers-academicos-20260517.md) — 20 sources, 17 spot-checked em arxiv.org
- [Wave B — Frameworks e vendors industriais](../research/wave-B-frameworks-vendors-20260517.md) — 27 sources, 14 spot-checked
- [Wave C — Comportamento dos motores generativos](../research/wave-C-engines-2026-20260517.md) — 50 sources, 4 spot-checked oficial
- [Wave D — Standards técnicos](../research/wave-D-standards-tecnicos-20260517.md) — 54 sources, 25+ spot-checked
- [Wave E — KPIs e measurement](../research/wave-E-kpis-measurement-20260517.md) — 52 sources, 10+ spot-checked

Total consolidado: **203 sources** mapeadas, das quais **70+ confirmadas individualmente via WebFetch**. Spot-check date stamp: 2026-05-17.

---

## 1. Sumário executivo — 12 mudanças canônicas que afetam decisão em 2026

### 1.1 Mudanças no comportamento dos motores

1. **FAQ Rich Result morreu em 07/05/2026**, mas `FAQPage` JSON-LD virou **+3,2× sinal de citação em AI Overviews**. O markup migrou de SERP para AI. Wave D §2.4.
2. **GPT-5.3 Instant (default desde 04/03/2026) cita marcas em 8% das respostas; GPT-5.4 Thinking cita em 56%.** A escolha de tier altera dramaticamente a probabilidade de menção. Wave C §1.
3. **Domínios únicos citados por ChatGPT caíram 20% em 5 semanas** após mudança para 5.3 Instant. Volatilidade engine-side ficou explícita. Wave C TL;DR.
4. **Em pt-BR, YouTube concentra 65% das citações sociais em AI Overviews; Reddit despenca para 7%; Instagram triplica para 17%** (vs ~16% YT e ~30% Reddit em queries EN-US). Wave C §8.1 — esta diferença muda o playbook de canal para portal BR.
5. **Bing Webmaster Tools liberou AI Performance Report em 10/02/2026** (public preview) — única fonte oficial gratuita de citação Copilot por URL. Wave C §5.

### 1.2 Mudanças na base de evidência acadêmica

6. **Citation Selection vs Citation Absorption** (Zhang, He, Yao 2026, arXiv 2604.25707): páginas com alta absorção são mais longas, melhor estruturadas, ricas em evidência extraível (definições, números, tabelas, passos). Selection ≠ Absorption — duas métricas distintas. Wave A §3.1.
7. **AI Overviews têm efeito causal -15% no tráfego diário da Wikipedia** em inglês (Khosravi & Yoganarasimhan, arXiv 2602.18455 — pt-BR foi controle não-exposto na janela do estudo). Wave A §4.1.
8. **146.932 citações alucinadas em 2025** mapeadas em literatura acadêmica (Zhao et al., arXiv 2605.07723). Reforça a regra interna de nunca aceitar DOI gerado por Opus/Sonnet/GPT-4o sem validação Perplexity. Wave A §3.2.

### 1.3 Mudanças no stack técnico recomendado

9. **Schema.org `@graph` triplo (Organization + Person + Article) com `@id` canônico ancorado em URL fragment** virou padrão consolidado 2026. `sameAs` para Wikipedia/Wikidata/LinkedIn é alavanca forte de entity recognition. Wave D §2.3.
10. **llms.txt continua sem evidência estatística de impacto** em estudo de ~300 mil domínios (SE Ranking, 408 hits diretos em 500M visitas AI bot). Publicar como hygiene de baixo custo (meio dia), nunca como linha principal. Wave D §1.4-1.5; Wave C TL;DR.
11. **MCP (Model Context Protocol) virou padrão de fato** com spec 2025-11-25, doado em dez/2025 para Agentic AI Foundation no Linux Foundation. `ai-plugin.json`, `ai-context.json` e `ai-agents.json` estão mortos ou nunca foram padrões — não publicar. Wave D §4.
12. **PerplexityBot foi delistado dos Verified Bots da Cloudflare em ago/2025** por crawler stealth. Bloquear UA declarado não basta — combinar com Cloudflare Bot Management ou rate-limit por ASN. Wave D §3.1.

### 1.4 Mudanças no playbook de measurement

Bônus operacional:

- **CTR posição 1 com AI Overview caiu de 27% para 11%** segundo SISTRIX mar/2026 (-59%). Wave E §4.
- **AI Overviews subiram de 6,49% (jan/25) para 13,14% (jan/26)** das queries Google (+102% YoY). Wave E §4.
- **AI Mode entrega 93% queries zero-click** vs 60% do Google clássico. Wave E §4.
- **26% das marcas têm ZERO menções em AI Overviews** (Discovered Labs). Citation Rate baseline de líderes >30%. Wave E §1.
- **Conversão de tráfego AI-referred é 2,3× a 4,4× maior** que orgânico tradicional (Discovered Labs / Lantern). Wave E §4.
- **Overlap top-10 SERP × citações AIO caiu de 75% (mid-2025) para 17-38% (early-2026)**. Ranquear no Google não garante ser citado por IA. Wave C §7.

---

## 2. Taxonomia em 7 ramos

```
SEO + GEO Knowledge Base 2026
│
├── 2.1 Foundations & Research (papers acadêmicos)              → Wave A
│   ├── Paper canônico Aggarwal et al. (KDD 2024)
│   ├── Benchmarks especializados (CC-GSEO, SAGEO, E-GEO, GEM)
│   ├── Citation Selection × Absorption (Zhang/He/Yao 2026)
│   ├── Citation Faithfulness vs Correctness (Wallat ICTIR 2025)
│   ├── News citation patterns (Yang 2025, Zhang/Ye/Peng 2025)
│   ├── Schema as memory layer (Volpini et al. 2026)
│   ├── Adversarial GEO (StealthRank 2025)
│   └── Empirical AIO impact (Khosravi/Yoganarasimhan 2026)
│
├── 2.2 Industry Frameworks & Vendors                            → Wave B
│   ├── Plataformas GEO puras (Profound, Peec, Otterly, AthenaHQ,
│   │     Brandlight, Trakkr, Goodie, Scrunch)
│   ├── SEO incumbents adicionando GEO (Ahrefs Brand Radar,
│   │     SEMrush AI Toolkit, Conductor, BrightEdge, seoClarity,
│   │     SISTRIX, Moz)
│   ├── Analistas canônicos (Mike King, Aleyda Solís, Lily Ray,
│   │     Marie Haynes, Bernard Huang, Rand Fishkin, Olga Zarr)
│   ├── Relatórios benchmark 2026 (BrightEdge AIO 1-Year,
│   │     Conductor AEO/GEO, Seer CTR, SparkToro zero-click)
│   ├── Tooling adjacente (Cloudflare AI Crawl Control / Pay Per
│   │     Crawl, TollBit, DataDome, Vercel AI SDK)
│   ├── Eventos 2026 (AEO Conf SF, SMX Munich, GEO Conference DC
│   │     primeira edição 100% GEO, MozCon NY, BrightonSEO)
│   └── Brasil — gap estrutural (Conversion única agência BR
│         com serviço dedicado; sem analista canônico BR; sem
│         evento BR 2026 dedicado a GEO)
│
├── 2.3 Engine-Specific Updates                                  → Wave C
│   ├── ChatGPT / OpenAI (GPT-5.3 Instant default + 5.4 Thinking;
│   │     Atlas Browser macOS; Pulse proativo; web.run fan-out;
│   │     Connectors)
│   ├── Claude / Anthropic (Opus 4.7 GA em 16/04/2026; web_search
│   │     tool com Citations API que não conta tokens; Skills +
│   │     Connectors Directory unificado em claude.ai/directory)
│   ├── Gemini / AI Overviews / AI Mode (Gemini 2.5 customizado
│   │     para Search; AI Mode em pt-BR no Brasil desde 08/09/2025;
│   │     mudanças de 06/05/2026 — inline links próximos ao texto,
│   │     hover preview, subscription highlight)
│   ├── Perplexity (Sonar/Sonar Pro/Sonar Deep Research; Deep
│   │     Research roda Claude Opus 4.5; Comet Browser global em
│   │     mar/2026 iOS/Android/Mac/Windows)
│   ├── Microsoft Copilot / Bing (AI Performance Report public
│   │     preview 10/02/2026 — única fonte oficial gratuita de
│   │     citation tracking)
│   └── Meta AI / Grok / DeepSeek / Mistral (baixa prioridade para
│         portal editorial pt-BR; Meta lançou Muse Spark em
│         08/04/2026, saída do open-source Llama)
│
├── 2.4 Technical Standards                                      → Wave D
│   ├── Schema.org & JSON-LD (release 30.0 em 19/03/2026; @graph
│   │     triplo canônico; FAQ rich result morto mas FAQPage segue;
│   │     7 schemas perderam rich result em jan/2026)
│   ├── llms.txt (spec original Howard 2024; sem alavanca de
│   │     citação estatisticamente comprovada; adotar como hygiene)
│   ├── robots.txt para LLM bots (lista canônica 15+ UAs:
│   │     GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot,
│   │     Claude-User, Claude-SearchBot, PerplexityBot,
│   │     Perplexity-User, Google-Extended, GoogleOther,
│   │     Google-CloudVertexBot, Applebot-Extended,
│   │     meta-externalagent, CCBot, Amazonbot, Bytespider)
│   ├── MCP (Model Context Protocol — padrão de fato 2026)
│   ├── IndexNow (Bing/Yandex/Naver/Seznam/Yep — Google NÃO
│   │     participa; Cloudflare integra via Crawler Hints)
│   ├── Agent commerce (Google AP2 set/2025; Coinbase x402
│   │     open-source mai/2025, doado a Linux Foundation 02/04/2026)
│   ├── Web Bot Auth (draft IETF meunier-web-bot-auth-architecture
│   │     publicado 02/03/2026, autoria Cloudflare + Google)
│   ├── Cloudflare Pay Per Crawl (HTTP 402 + JWT + Web Bot Auth;
│   │     1+ bilhão de 402/dia em mai/2026)
│   └── Acessibilidade (WCAG 2.2 vigente; 3.0 working draft;
│         alinhada com GEO — heading semântico + alt-text + HTML
│         tables > imagem reforçam ambos)
│
├── 2.5 Measurement & KPIs                                       → Wave E
│   ├── KPIs canônicos (Mention Rate, Citation Rate, SoV-AI,
│   │     AECR, Citation Position, NSS, Hallucination Rate,
│   │     AI-Referred Traffic & Conversion, AI Bot Activity)
│   ├── Frameworks (ELCA 9 KPIs, iPullRank 3-tier, Aleyda
│   │     3-layer Presence/Readiness/Business Impact, Profound
│   │     data-driven, Aggarwal GEO-bench)
│   ├── Atribuição zero-click (4 mecanismos que estripam referrer;
│   │     regex canônico GA4 "AI Traffic"; GSC ainda NÃO filtra
│   │     AI Mode em 2026)
│   ├── Server logs (canônico para tracking via UA dos bots —
│   │     única fonte 100% confiável)
│   ├── Calibração de prompts (50-150 sweet spot; mix 40% comercial
│   │     + 30% informacional + 20% branded + 10% pain; 3-5 runs
│   │     por prompt para significância estatística)
│   └── Controvérsias declaradas (Mention ≠ Citation; AECR usado
│         com 2 sentidos; ChatGPT só web-search em 34,5% das
│         queries; SoV-SEO ≠ SoV-AI; SEMrush mix opaco)
│
├── 2.6 Tactical Playbooks
│   ├── Citation engineering (statistics + citations + quotes +
│   │     authority signals = padrão Aggarwal +40% visibility)
│   ├── Padrão HBR para conteúdo (abertura impacto + tese
│   │     contraintuitiva + evidência + mecanismo + decisão +
│   │     próximo passo) — converge com achados Zhang/He/Yao 2026
│   ├── Topical authority + entity SEO (knowsAbout robusto,
│   │     Wikidata canônico, sameAs cross-platform)
│   ├── Multi-canal pt-BR (YouTube com transcript clean = #1;
│   │     LinkedIn Pulse 500-2000 palavras = #2; Instagram com
│   │     alt-text robusto = #3 em AIO BR)
│   ├── Reddit/community (residual em pt-BR; pesado em EN)
│   └── E-E-A-T evolution para AI (March 2026 core update
│         reforçou; Person canônico com author bylines virou
│         alavanca forte para Claude)
│
└── 2.7 SEO / GEO Convergence
    ├── Hybrid strategies (overlap top-10 SERP × citações AIO
    │     caiu de 75% → 17-38%; otimizar para ambos)
    ├── Core Web Vitals (continua relevante para SEO clássico;
    │     LCP/INP/CLS sem peso direto em citação AI mas afetam
    │     experience indirectly)
    ├── Backlink decay vs entity signals (PageRank ainda importa
    │     para Google clássico; LLMs citam 37% de domínios únicos
    │     fora do PageRank — Zhang/Ye/Peng/Garimella 2025)
    ├── Wikidata & Knowledge Graph (alavanca subestimada;
    │     correção em 2 semanas vs treinamento de modelo)
    └── Brasil-específico (vantagem estrutural: conteúdo pt-BR
          escasso para LLMs; oportunidade para Brasil GEO publicar
          benchmark próprio em educação superior)
```

---

## 3. Mapa de sources canônicas (top picks)

### 3.1 Papers acadêmicos canônicos para citar em material institucional

| Citação canônica | Tema | URL |
|---|---|---|
| Aggarwal et al. 2024 (KDD) | GEO foundation paper, +40% visibility | https://arxiv.org/abs/2311.09735 |
| Khosravi & Yoganarasimhan 2026 | -15% tráfego Wikipedia EN com AIO | https://arxiv.org/abs/2602.18455 |
| Zhang, He, Yao 2026 | Citation Selection vs Absorption | https://arxiv.org/abs/2604.25707 |
| Zhao et al. 2026 | 146.932 citações alucinadas em 2025 | https://arxiv.org/abs/2605.07723 |
| Chen, Wang, Chen, Koudas 2025 | Earned media bias em AI search | https://arxiv.org/abs/2509.08919 |
| Volpini et al. 2026 | Structured linked data como memory layer | https://arxiv.org/abs/2603.10700 |
| Wallat et al. ICTIR 2025 | Correctness ≠ Faithfulness em RAG | DOI 10.1145/3731120.3744592 |
| Grossman et al. 2026 | 50%+ queries disparam AIO; consistência baixa | https://arxiv.org/abs/2604.27790 |

### 3.2 Plataformas de citation tracking (escolha por tier)

| Tier | Plataforma | Preço base | Quando usar |
|---|---|---|---|
| DIY | run-prompts-weekly.mjs próprio | tokens (~US$ 30/mês) | Baseline em 50 prompts × 5 engines |
| SMB | Otterly Lite | US$ 29/mês | Diagnose inicial, brand monitoring básico |
| Mid | Peec Pro / AthenaHQ Self-Serve | €199 / US$ 295 | 100-300 prompts, recomendações acionáveis |
| Mid+ | Ahrefs Brand Radar | US$ 398-699 | Se já cliente Ahrefs, 13M+ queries/mês |
| Enterprise | Profound Growth/Enterprise | US$ 399-5.000+ | 700+ clientes Fortune 500; dataset 100M+ |
| Enterprise+ | Conductor Intelligence | sob consulta | ISO 42001, 3,3B sessões dataset |

### 3.3 Analistas para acompanhar semanalmente (em 2026)

1. **Aleyda Solís** — newsletter SEOFOMO (40k subs, 45% open rate) — https://www.seofomo.co/
2. **Mike King** (iPullRank) — "The AI Search Manual" + blog — https://ipullrank.com/
3. **Lily Ray** (Amsive) — LinkedIn newsletter + MozCon talks — https://lilyraynyc.substack.com/
4. **Rand Fishkin** (SparkToro) — zero-click thesis + Datos clickstream — https://sparktoro.com/
5. **Marie Haynes** — algoritmo + spam + E-E-A-T — https://mariehaynes.com/
6. **Bernard Huang** (Clearscope) — webinars AEO/GEO — https://clearscope.io/
7. **Olga Zarr** (SEOSLY) — AI SEO Course 2026 + consultoria UE — https://seosly.com/

### 3.4 Documentação oficial de engines (canônica)

| Engine | URL canônica de release notes |
|---|---|
| OpenAI ChatGPT | https://help.openai.com/en/articles/6825453-chatgpt-release-notes |
| Anthropic Claude | https://platform.claude.com/docs/en/release-notes/overview |
| Google Gemini Apps | https://gemini.google/release-notes/ |
| Perplexity | https://www.perplexity.ai/changelog/ |
| Microsoft Bing/Copilot | https://blogs.bing.com/webmaster |
| xAI Grok | https://docs.x.ai/docs/release-notes |

### 3.5 Standards técnicos canônicos

| Standard | URL |
|---|---|
| Schema.org releases | https://schema.org/docs/releases.html |
| MCP spec 2025-11-25 | https://modelcontextprotocol.io/specification/2025-11-25 |
| IndexNow docs | https://www.indexnow.org/documentation |
| Web Bot Auth IETF draft | https://datatracker.ietf.org/doc/html/draft-meunier-web-bot-auth-architecture |
| Cloudflare AI Crawl Control | https://developers.cloudflare.com/ai-audit/ |
| Coinbase x402 | https://docs.cdp.coinbase.com/x402/welcome |
| Google AP2 | https://agentpaymentsprotocol.info/docs/introduction/ |
| WCAG 3.0 working draft mar/2026 | https://www.w3.org/WAI/news/2026-03-03/wcag3/ |

---

## 4. Glossário canônico unificado

| Termo | Definição operacional | Origem |
|---|---|---|
| **GEO** | Generative Engine Optimization — paradigma de otimização para maximizar visibilidade em respostas de motores generativos (ChatGPT, Claude, Gemini, Perplexity, Copilot) | Aggarwal et al. 2024 |
| **AEO** | Answer Engine Optimization — sinônimo prático de GEO usado por agências; ênfase em "ser a resposta" | Indústria 2024-2025 |
| **LLMO** | LLM Optimization — variante terminológica equivalente | Indústria 2025 |
| **Generative Engine (GE)** | Sistema que usa LLM para sintetizar e sumarizar fontes em resposta a queries | Aggarwal et al. 2024 |
| **Citation Selection** | Estágio em que a plataforma escolhe quais fontes considerar para uma query | Zhang/He/Yao 2026 |
| **Citation Absorption** | Estágio em que a fonte selecionada efetivamente contribui linguagem/evidência/estrutura para a resposta gerada — distingue-se de Selection | Zhang/He/Yao 2026 |
| **Citation Faithfulness** | A afirmação foi gerada A PARTIR da fonte citada, não da memória paramétrica do modelo | Wallat et al. ICTIR 2025 |
| **Citation Correctness** | A fonte citada de fato suporta a afirmação (independente de como a afirmação foi gerada) | Wallat et al. ICTIR 2025 |
| **Mention Rate** | Percentual de prompts canônicos em que a marca é nominada (texto bruto, sem exigir link) | Profound, Otterly, Peec |
| **Citation Rate** | Percentual de prompts em que a marca aparece como fonte clicável (URL) — mais conservador que Mention Rate | Discovered Labs, Averi |
| **SoV-AI** | Share of Voice em AI — participação da marca no total de menções competitivas em um universo de prompts | Ahrefs Brand Radar, Profound |
| **AECR-Conversion** | AI Engagement & Conversion Rate (definição ELCA) — conversão originada da resposta gerada | ELCA 2024 |
| **AECR-Citation** | AI Engine Citation Rate (definição agência) — frequência de citação com link. **Recomenda-se desambiguar com "Citation Rate"** | Averi, Discovered Labs, GenOptima |
| **AIGVR** | AI-Generated Visibility Rate — frequência e proeminência em respostas AI (ELCA) | ELCA 2024 |
| **NSS** | Net Sentiment Score = (endossos + neutros − negativos − alucinações) ÷ total × 100; varia −100 a +100 | Sight AI, Visiblie |
| **Earned media bias** | Tendência sistemática de AI search a citar terceiros autoritativos sobre conteúdo da própria marca | Chen/Wang/Chen/Koudas 2025 |
| **Fan-out (web.run, query fan-out)** | Mecanismo de retrieval que decompõe a query do usuário em múltiplas sub-queries internas (GPT-5.4 dispara ~8,5 vs 1 do 5.3) | OpenAI / Google AI Mode |
| **Hallucinated citation** | Referência citada por LLM que não existe ou cujo conteúdo não corresponde ao alegado | Zhao et al. 2026 |
| **MCP** | Model Context Protocol — open standard de conexão LLM ↔ ferramentas; spec 2025-11-25; doado ao Linux Foundation | Anthropic 2024 / Agentic AI Foundation 2025 |
| **AP2** | Agent Payments Protocol — Google + 60+ orgs; Intent/Cart/Payment mandates | Google Cloud 2025 |
| **x402** | Open-source agent payment via HTTP 402 + JWT; Coinbase; doado Linux Foundation em 02/04/2026 | Coinbase 2025 / x402 Foundation 2026 |
| **Web Bot Auth** | HTTP Message Signatures para identidade de bot via JWKS em `/.well-known/http-message-signatures-directory` | IETF draft Meunier 2026 |
| **Pay Per Crawl** | Monetização de crawl via HTTP 402 + JWT, Cloudflare beta | Cloudflare 2025 |
| **llms.txt** | Arquivo Markdown na raiz com índice navegável para LLMs (Howard / Answer.AI). Sem evidência estatística de impacto em citação | Howard 2024 |
| **GPTBot/ClaudeBot/PerplexityBot etc.** | User-agents canônicos de crawler de IA — declarados no robots.txt | OpenAI/Anthropic/Perplexity 2024-2026 |
| **Speakable Schema** | Schema.org type que marca blocos de texto destinados a serem lidos em voz por assistentes — status BETA, sem rich result mas com sinal para AI | Schema.org 2018 |
| **@graph triplo** | Padrão JSON-LD com Organization + Person + Article cross-referenciados via `@id` único ancorado em URL fragment | Best practice 2026 |
| **Zero-click rate** | % de queries que terminam sem clique outbound (60% no Google clássico; 93% em AI Mode) | SparkToro / Success.com |
| **AI Bot Activity** | Frequência de hits de crawlers AI (GPTBot, ChatGPT-User, etc.) em log de servidor — sinal forward-looking | iPullRank, Trakkr |

---

## 5. Checklist de implementação canônica para `posgraduacaopsicologia.com`

> Auditar e atualizar conforme estado do repo. Itens que já estão no portal são marcados na auditoria do próximo commit; itens em vermelho viram backlog priorizado.

### 5.1 Base obrigatória (Camada 1)

- [ ] `robots.txt` na raiz com `Allow:` explícito para os 15+ user-agents canônicos da Wave D §3.1.
- [ ] `sitemap.xml` com `<lastmod>` real; segmentar em `sitemap-index.xml` se exceder 50 mil URLs.
- [ ] `<link rel="canonical">` em toda página.
- [ ] HTTPS + HSTS preload.
- [ ] `<title>` único 50-60 chars; meta description única 140-160 chars.
- [ ] Open Graph + Twitter Card.
- [ ] Heading hierarchy estrita (1× H1, depois H2/H3 sem pular nível).

### 5.2 JSON-LD canônico (Camada 2)

- [ ] `@graph` triplo Organization + Person + WebSite em todas as páginas.
- [ ] `Article` em cada artigo com `author` apontando para Person via `@id`.
- [ ] `FAQPage` em hubs com perguntas (mantém valor para AI mesmo sem rich result).
- [ ] `BreadcrumbList`.
- [ ] `Person` com `knowsAbout` rico e `sameAs` apontando para Wikipedia/Wikidata/LinkedIn.
- [ ] `Organization` com `sameAs` para fontes oficiais.
- [ ] `Speakable` em blocos-chave para citação AI.
- [ ] `Course` + `EducationalOccupationalCredential` para programas.
- [ ] Validar em https://validator.schema.org/ (não só Rich Results Test, que parou de exibir FAQ).

### 5.3 GEO específico (Camada 3)

- [ ] `/llms.txt` publicado (gesto simbólico, baixo custo).
- [ ] IndexNow setup com chave em `/<key>.txt` + ping em cada publicação para Bing/Yandex/Naver/Seznam/Yep.
- [ ] Tabelas HTML estruturadas para dados quantitativos (não imagens).
- [ ] FAQs explícitos em `<section>` semântico, marcados com `FAQPage`.
- [ ] Padrão HBR em conteúdo: abertura-impacto → tese contraintuitiva → evidência → mecanismo → decisão → próximo passo.
- [ ] TL;DR no topo em formato `Speakable`.
- [ ] Long-form 1.500-2.500 palavras com argumento de cabeça.
- [ ] By-line claro + author page com `Person` completo.

### 5.4 Defesa e governança (Camada 4)

- [ ] Cloudflare AI Crawl Control habilitado para visibilidade.
- [ ] WAF rules para spoofers (UA Chrome rotativos sem IP range conhecido).
- [ ] Decisão consciente: bloquear `Bytespider` e crawlers undeclared.
- [ ] Acompanhar Pay Per Crawl como opção futura (não monetizar agora — audiência LLM mention rate baixa no Brasil).

### 5.5 Observabilidade (Camada 5)

- [ ] Log de UA de bot em CDN/proxy.
- [ ] Dashboard semanal: hits de GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, ChatGPT-User.
- [ ] Monitoramento de citação em LLM (Profound, Peec, Ahrefs Brand Radar) — ou DIY run-prompts-weekly em escala inicial.
- [ ] Bing Webmaster Tools com AI Performance Report habilitado (única fonte gratuita oficial de citation Copilot).
- [ ] GA4 com Channel Group customizado "AI Traffic" via regex canônico da Wave E §3.2.

### 5.6 Multi-canal pt-BR (alavancas específicas Brasil)

- [ ] **YouTube** — canal com transcript clean + chapter markers + description longa (65% das citações sociais AIO em pt-BR).
- [ ] **LinkedIn Pulse** — 500-2000 palavras/post, 5+ posts/mês por autor (#2 cross-platform).
- [ ] **Instagram** — alt-text robusto e legendas descritivas (17% AIO BR).
- [ ] **Wikipedia/Wikidata** — entry da instituição + autores principais (causa #1 cross-engine).

### 5.7 NÃO implementar (perda de tempo em 2026)

- ❌ `ai-plugin.json` em `/.well-known/` (descontinuado 09/04/2024).
- ❌ `ai-context.json` ou `ai-agents.json` (não são padrões — zero adoção em fontes canônicas).
- ❌ `mcp.json` no root do site (é config de client local, não descritor de servidor).
- ❌ Schema deprecado: `ClaimReview`, `EstimatedSalary`, `LearningVideo`, `SpecialAnnouncement`, `VehicleListing`, `PracticeProblem`.
- ❌ Microdata ou RDFa (JSON-LD é canônico desde 2018; Google só recomenda JSON-LD).
- ❌ Otimização agressiva para Meta AI / DeepSeek / Mistral em portal pt-BR de pós-graduação (share marginal).
- ❌ llms.txt como prioridade alta (custo baixo, mas sem evidência estatística — não é alavanca).

---

## 6. Implicações específicas para o programa GEO IPOG

### 6.1 Riscos atualizados a partir das waves

1. **Volatilidade ChatGPT.** Mudança 5.2 → 5.3 Instant cortou domínios únicos citados em 20% e mention de marca em 7 pontos percentuais (8% vs 56% no 5.4 Thinking). Implicação: tracking mensal não basta — precisamos detectar drops em 1-2 semanas.
2. **AI Overviews em vertical Educação está em 83%** (ALM Corp). O canal já é dominante para queries de pós-graduação no Brasil — não é cenário futuro.
3. **26% das marcas têm zero menções em AIO** (Discovered Labs). Sem dossiê de baseline em PT-BR para educação superior, não sabemos se IPOG está neste grupo. Recomendação: rodar primeiro baseline de 50-100 prompts canônicos com 3-5 runs cada antes de qualquer decisão estratégica do programa.
4. **PerplexityBot delistado** e crawlers stealth: precisamos confirmar via Cloudflare logs se o portal está sendo visitado regularmente e por quais UAs.

### 6.2 Oportunidades estruturais identificadas

1. **Gap analista BR.** Nenhum analista BR publicando semanalmente em GEO foi identificado (vs Aleyda/Mike King/Lily Ray no EN-US). Alexandre Caramaschi pode ocupar — newsletter semanal + dossiês públicos.
2. **Gap evento BR.** Nenhum evento BR 2026 com track 100% GEO. iMasters tem tangências; RD Summit não publica track formal. Espaço para Brasil GEO patrocinar/curar.
3. **Gap benchmark vertical educação superior PT-BR.** Toda literatura empírica é EN-US ou EN-IN. Brasil GEO pode publicar o primeiro benchmark canônico de mention/citation rate para pós-graduação BR — material institucional de altíssimo valor.
4. **AI Mode pt-BR rodando desde 08/09/2025** com Gemini 2.5 custom. Domínio AI Mode é prioritário para educação superior BR; portal precisa de feature parity com a melhor experiência Google clássica.

### 6.3 Próximas waves recomendadas

| Wave | Foco | Tipo |
|---|---|---|
| F | Benchmark próprio Brasil GEO em PT-BR para pós-graduação (50 prompts × 5 engines × 3 runs) | Execução |
| G | Auditoria do estado do `@graph` triplo + Speakable em todos os hubs do portal | Auditoria técnica |
| H | Pipeline IndexNow + GSC URL Inspection para 232 páginas | Operacional |
| I | Implementação YouTube canal Brasil GEO com 12 vídeos canônicos sobre pós-graduação em Psicologia | Conteúdo |
| J | Cobertura Wikidata/Wikipedia das 5 modalidades canônicas + autores | Entity SEO |
| K | Documentação canônica de prompts âncora para monitoring (50 base + 50 cobertura competitiva) | Measurement |

---

## 7. Princípios canônicos a aplicar daqui para frente

1. **Citation Selection ≠ Citation Absorption.** Ser citado em painel lateral é uma coisa; ter o conteúdo absorvido na resposta é outra. Otimizar para AMBOS — chunks autocontidos com definição + número + comparação extraível, não só link bonito.
2. **Diferenciar Mention Rate de Citation Rate.** Reportar os dois pareados; aceitar que vendors usam siglas conflitantes.
3. **Decompor métricas por engine.** SoV agregado esconde variação enorme — ChatGPT, Perplexity, Claude, Gemini, Copilot têm fontes preferidas distintas.
4. **Tratar Schema.org + heading + tabela HTML como sinais que afetam Citation Absorption**, não só Selection.
5. **Não confiar em llms.txt como alavanca** — publicar como hygiene de baixo custo apenas.
6. **Tracking diário só onde a volatilidade justifica** (ChatGPT pós-mudança de default); semanal é o sweet spot canônico.
7. **3-5 runs por prompt** antes de declarar tendência — LLMs têm temperatura > 0 mesmo em search mode.
8. **Spot-check de URL real** antes de citar paper — 146.932 citações alucinadas em 2025.
9. **PT-BR canal mix difere drasticamente do EN-US** (YouTube 65% vs 16%; Reddit 7% vs 30%) — não copiar playbook americano cego.
10. **Entity-first.** Wikidata + Wikipedia + LinkedIn com `sameAs` canônico é alavanca subestimada para todos os engines.

---

## 8. Manutenção deste documento

- Próxima revisão obrigatória: 2026-08-17 (90 dias) ou quando houver release major de qualquer engine (GPT-5.5+, Claude Mythos GA, Gemini 4, AI Mode pt-BR feature parity).
- Mudanças incrementais (novos papers, novos vendors, novas controvérsias) entram diretamente nas waves correspondentes em `docs/research/`.
- A taxonomia em §2 só muda quando a estrutura conceitual mudar — nova categoria de motor, novo standard major, nova frente regulatória LGPD/EU AI Act.
- Glossário em §4 é a fonte canônica de nomenclatura — qualquer copy pública deste programa usa essas definições.

---

**Sources consolidadas:** 203 referências distribuídas pelos 5 dossiês das waves A-E em `docs/research/`. Spot-check date stamp: 2026-05-17. Nenhuma citação inventada foi aceita — todas têm URL real ou marcação `[VERIFICAR]` / `[FALTA EVIDÊNCIA]` quando incertas.
