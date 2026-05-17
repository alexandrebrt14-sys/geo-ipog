# Wave B — Frameworks e vendors GEO+SEO 2026

**Data:** 2026-05-17
**Wave:** B de E (landscape industrial)
**Autor:** Brasil GEO research (Alexandre Caramaschi, CEO Brasil GEO, ex-CMO da Semantix Nasdaq, cofundador da AI Brasil)
**Escopo:** mapa de plataformas, agências, analistas, relatórios e eventos que definem operação GEO+SEO em 2026

---

## TL;DR

1. **Categoria GEO virou unicórnio em 18 meses.** Profound levantou US$ 96M Série C em fev/2026 a US$ 1B de valuation (Lightspeed lead; Sequoia, Kleiner Perkins, South Park Commons) ¹. A categoria "AI visibility" deixou de ser experimento de SEO e virou linha de orçamento de Fortune 500 — Target, Walmart, Figma, MongoDB, US Bank e Charlotte Tilbury já são clientes da Profound.

2. **Pelo menos quatro tiers de pricing já consolidados.** GEO puro vai de US$ 29/mês (Otterly Lite) a US$ 989/mês (Otterly Pro) na faixa SMB; AthenaHQ e Trakkr cobrem mid-market (US$ 95–399/mês); Brandlight e Profound competem no enterprise sob contrato anual. Ahrefs Brand Radar (US$ 398–699/mês) e SEMrush AI Toolkit invadiram o setor com a vantagem de já operar o stack SEO incumbente.

3. **SEO incumbents não estão mortos.** Conductor lançou em nov/2025 o "AEO/GEO Benchmarks Report" analisando 3,3 bilhões de sessões em 13.000+ domínios e ganhou ISO 42001 (primeiro AI Management System certificado na categoria) ². BrightEdge tem o Generative Parser proprietário ³; SISTRIX e seoClarity entregam detecção turnkey de AI Overviews. A leitura: "AI search vence SEO" é prematuro — AI referrals respondem por ~1% do tráfego ainda em 2026, segundo o Conductor.

4. **Camada de monetização e governança é nova fronteira.** Cloudflare lançou Pay-Per-Crawl (HTTP 402 + headers `crawler-price`/`crawler-charged`) ⁴; TollBit integra com DataDome, Fastly, Akamai e Cloudflare e fechou parceria com TIME, Condé Nast, AP, The Atlantic e Fortune. Tráfego de bots OpenAI passou de 1,7 bilhão de requests/mês em junho/2025.

5. **Brasil tem corrida atrasada mas com vantagem estrutural.** Conversion (BR) lançou serviço dedicado de GEO se posicionando como pioneira nacional ⁵. Rock Content cobre tangencialmente via inteligência de mercado. Conteúdo em português é escasso para LLMs — vantagem competitiva real para quem opera com método. Eventos canônicos seguem fora do Brasil (BrightonSEO, MozCon, SMX Munich, GEO Conference DC) — gap para a Brasil GEO ocupar.

---

## 1. Plataformas GEO puras (rastreamento de citação em LLM)

| Vendor | URL | Foco | Pricing tier 2026 | Diferencial 2026 |
|---|---|---|---|---|
| **Profound** | tryprofound.com | Enterprise GEO + agentes | US$ 96M Série C @ US$ 1B valuation (fev/2026) ¹ | "Agent Analytics" + Profound University + marketplace de agências + integração HubSpot/Google Workspace/Vercel; 700+ clientes enterprise, 10% da Fortune 500 |
| **Peec AI** | peec.ai | SEO teams e agências | 4 tiers (Starter→Pro→Advanced→Enterprise); US$ 29M total raised | Cobre 7+ engines (ChatGPT, AI Mode, AI Overviews, Copilot, Perplexity, Gemini, Grok; +Claude Sonnet 4 / GPT-5 Search no Enterprise); tracking diário em todos paid tiers |
| **Otterly.AI** | otterly.ai | Mid-market global | Lite US$ 29/mês · Standard US$ 189/mês · Pro US$ 989/mês | 30.000+ usuários, G2 4.8/5, Gartner "Cool Vendor"; multi-país (US, UK, DE, NL, CH, AT, AU); GEO audit com SWOT |
| **AthenaHQ** | athenahq.ai | Enterprise + agency | Self-Serve US$ 95/mês · Enterprise sob consulta | 8+ engines (ChatGPT, Perplexity, AI Overviews, AI Mode, Gemini, Claude, Copilot, Grok); "Ask Athena" copilot agentic; clientes Coinbase, SoFi, Volkswagen, ZoomInfo, Slalom, R/GA, Nextiva, PagerDuty, DeVry |
| **Brandlight** | brandlight.ai | Enterprise puro (Fortune 500) | Sob contrato (não publica) | "Agentic Commerce" como eixo de produto; clientes Volkswagen Group, Publicis, Caesars, LG, Estée Lauder, TD Bank, Kimberly-Clark, Humana, McCormick; CEO Imri Marcus |
| **Trakkr** | trakkr.ai | Brand teams e agências | Growth US$ 79/mês (50 queries × 8 modelos) · Scale US$ 399/mês (10 brands × 50 queries, API) | Único cobrindo 8 engines (inclui Meta AI e DeepSeek); annual billing 17% off; Revenue Attribution via Google Analytics |
| **Goodie** | goodie.ai | SMB e mid-market | Não publicado consistentemente | Foco em sentiment + prompt gaps; cobre ChatGPT, Perplexity, Gemini, Claude |
| **Scrunch** | scrunch.com | SMB/mid-market AEO+GEO | Não publicado consistentemente | Posiciona-se em rankings curados ("7 best AEO/GEO tools 2026") |
| **Conduit** | [FALTA EVIDÊNCIA] | [FALTA EVIDÊNCIA] | [FALTA EVIDÊNCIA] | Citado em listas mas não confirmado domínio oficial via WebFetch |

**Controvérsia metodológica declarada.** Vendors disputam dois pontos:
- **Origem dos prompts.** Ahrefs (Brand Radar) prega "search-backed prompts, not synthetic ones" com base em 400M+ prompts mensais reais; AthenaHQ usa "Prompt Volume" proprietário para estimar demanda em queries onde não há dado público. Profound combina prompts customizados com inferência. Não há benchmark independente que valide qual amostragem é menos viesada.
- **Score composto vs. métricas individuais.** Trakkr publica "Presence Score" e "Visibility Score" agregados; Peec mostra "visibility percentage" + ranking por engine; AthenaHQ mostra "share of AI Voice". Como cada vendor combina mention rate, position e citation differently, não é trivial comparar pontuações entre plataformas no mesmo cliente.

---

## 2. SEO incumbents adicionando GEO

| Vendor | URL | Movimento 2025-2026 | Diferencial |
|---|---|---|---|
| **Ahrefs Brand Radar** | ahrefs.com/brand-radar | Cobertura de 6 engines (AI Overviews, AI Mode, ChatGPT, Perplexity, Copilot, Gemini, Grok) + YouTube/TikTok/Reddit; banco de 400M+ prompts/mês | US$ 398–699/mês; integra com toda infra Ahrefs de keyword e backlink; 2.500 prompts customizados no tier top |
| **SEMrush AI Toolkit** | semrush.com | Lançado mar/2025; tracking de 25–200 prompts por plano | AI Visibility Score; benchmarking competitivo; já dentro do ecossistema SEMrush incumbente |
| **Conductor Intelligence** | conductor.com | "AEO/GEO Benchmarks Report 2026" (3,3B sessões, 13K+ domínios); ISO 42001 (primeiro AIMS certificado da categoria); lançamento "Enterprise AgentStack" ² | Leader Forrester Wave SEO; clientes incluem BlackRock (Aladdin), Four Seasons, TD Bank, 1-800-Contacts; foco enterprise puro |
| **BrightEdge** | brightedge.com | BrightEdge Generative Parser™ (BGP) — tech proprietária para tracking AIO; AI Catalyst | "Industry-level data" e playbooks; 1 ano de dataset AIO publicado em "AI Overviews at the One-Year Mark" ³ |
| **seoClarity** | seoclarity.net | Foco enterprise AIO em keyword sets massivos | Datatables analyst-friendly para AIO triggering por keyword |
| **SISTRIX** | sistrix.com | Detecção turnkey de AIO + SERP archive | UE-first, dados visuais limpos de AIO em SERPs |
| **Moz** | moz.com | Pesquisa de domínio + Lily Ray (parceira via MozCon) | MozCon NYC virou âncora editorial de GEO/AEO debates |

---

## 3. Analistas independentes — quem ler em 2026

| Analista | Papel | Canal canônico | Take 2026 |
|---|---|---|---|
| **Michael "Mike" King** | Founder/CEO iPullRank | ipullrank.com + "The AI Search Manual" (24 capítulos, 6 autores) ⁶ | "Relevance Engineering" — otimizar embeddings, entity density e passage-level retrieval, não keywords. Critica query fan-out do Google AI Mode como o gargalo real |
| **Aleyda Solís** | Founder Orainti + SEOFOMO | aleydasolis.com / seofomo.co | "AI crawlers não processam JavaScript" — sites com SSR/hidração quebrada perdem menus e produtos inteiros. SEOFOMO tem 40K+ subscribers, 45% open rate ⁷ |
| **Lily Ray** | VP SEO Strategy Amsive | amsive.com/insights + LinkedIn | Talk MozCon 2025 "GEO, AEO, LLMO: Separating Fact from Fiction" virou referência. Cita que 95% dos usuários ChatGPT seguem usando Google; AI referrals = 1-2% do tráfego total ⁸ |
| **Marie Haynes** | Consultora algoritmo+spam | mariehaynes.com | Autora de "SEO in the Gemini Era"; foca em E-E-A-T + black box da síntese AI |
| **Bernard Huang** | Founder Clearscope | clearscope.io + webinars | Playbook AEO/GEO/AI-SEO via Clearscope; testou entity extraction para AI responses |
| **Eli Schwartz** | Consultor Product-Led SEO | productledseo.com | Co-host Demand Curve Growth Summit com Bernard Huang; defende abordagem estrutural ao crescimento via SEO |
| **Olga Zarr** | Founder SEOSLY | seosly.com | "AI SEO success = 90% fundamentals, 10% AI"; AI SEO Course 2026 com 50+ aulas; consultora independente Polônia/UE |
| **Rand Fishkin** | Co-founder SparkToro | sparktoro.com + Datos clickstream | "Zero-click search" climbed from 50% (2019) to ~65% (2026) — driver primário: AI Overviews. Livro "Zero Click Marketing" co-autoria Amanda Natividad ⁹ |
| **John Iwuozor** | Contribuidor iPullRank | ipullrank.com | Artigo "Probability AI Search" (out/2025) — argumenta que AI search opera por probabilidade, não determinismo; medir attribution rate + retrieval confidence |
| **Fajr Muhammad** | VP Content iPullRank | ipullrank.com | Co-autora The AI Search Manual; entity/topic strategy |

---

## 4. Relatórios benchmark 2026

| Relatório | Publisher | Data | Achados-chave |
|---|---|---|---|
| **BrightEdge AI Overviews 1-Year Mark** | BrightEdge | fev/2026 | AIO cresceram 58% YoY; trigger em 48% das queries; Education 18%→83%, B2B Tech 36%→82%, Restaurants 10%→78% ³ |
| **Conductor AEO/GEO Benchmarks 2026** | Conductor | nov/2025 | 3,3B sessões, 13K+ domínios; AI referrals ~1% do tráfego total; Health Care 48,7% AIO trigger, Financials 25,8% ² |
| **Seer Interactive CTR Update** | Seer Interactive | set/2025 | CTR orgânico para queries com AIO caiu 61% (de 1,76% para 0,61%) |
| **SparkToro Zero-Click Research** | SparkToro × Datos | 2025-2026 | 58–65% das buscas Google são zero-click; salto de 55%→60% em 18 meses pós-AIO ⁹ |
| **The AI Search Manual** | iPullRank | ago/2025 (release), atualizado 2026 | 24 capítulos cobrindo "Relevance Engineering"; gratuito online ⁶ |
| **State of AI Search 2026** | AthenaHQ | 2026 | Métricas proprietárias de Prompt Volume e Share of AI Voice (athenahq.ai/athena-state-of-ai-full-report) |

---

## 5. Brasil GEO ecosystem

### Agências

- **Conversion** — `conversion.com.br/servicos/generative-engine-optimization-geo/` — primeiro serviço dedicado de GEO no mercado BR, posicionando-se como pioneira nacional. Metodologia: Prompt Mapping, Semantic Branding, Authority Building, AI Presence Diagnostics, Topical Mapping, Chatbot Optimization. Liderança não publicada na página de serviço ⁵.
- **Rock Content** — `rockcontent.com` — cobre GEO tangencialmente via "Inteligência Rock Content" e blog editorial. Não tem serviço empacotado nem track record público de GEO operacional. [FALTA EVIDÊNCIA] de oferta formal.
- **Senso Performance** — `sensoperformance.com.br/geo-generative-engine-optimization/` — agência BR com conteúdo editorial sobre GEO, sem produto publicado.
- **Fresh Lab** — `freshlab.com.br/blog/geo-llmo-ou-aeo-o-impacto-da-ia-generativa-no-seo/` — conteúdo editorial; sem serviço empacotado claro.
- **Wyse** — `wyse.com.br/geo/` — branding integrado com pitch GEO; oferta em estágio inicial.
- **Making Net** — `makingnet.com.br/blog/otimizar-conteudo-geo/` — conteúdo editorial focado em otimização de conteúdo legado para IA.
- **Mind Consulting** — `mindconsulting.com.br/2026/05/geo-generative-engine-optimization-chatgpt-claude-2026/` — conteúdo editorial; tema GEO presente, oferta formal não confirmada.

### Pesquisadores e analistas BR

[FALTA EVIDÊNCIA] de analista BR consolidado com publicação semanal canônica em GEO. Maior parte do conhecimento é replicação de Mike King, Aleyda, Lily Ray, traduzida para PT-BR. Oportunidade de posicionamento.

### Eventos BR

[FALTA EVIDÊNCIA] de evento BR 2026 dedicado 100% a GEO. iMasters tem track de marketing técnico tangencial; Rock Content faz "RD Summit" mas não dedicado a GEO. Gap claro.

### Vantagem estrutural identificada

Conteúdo em português é escasso para LLMs — para muitas queries em PT-BR, Google e LLMs têm menos fontes de qualidade do que em inglês. Conteúdo bem estruturado em português tem **probabilidade maior** de ser a fonte escolhida. Pesquisa sobre mercado brasileiro, casos de empresas BR e dados de consumidor BR é informação exclusiva e altamente valorizada por IA.

---

## 6. Tooling adjacente (bot tolls, AI audit, agent commerce)

| Vendor | URL | Camada | Status 2026 |
|---|---|---|---|
| **Cloudflare AI Crawl Control + Pay Per Crawl** | developers.cloudflare.com/ai-crawl-control + blog.cloudflare.com/introducing-pay-per-crawl | CDN/edge governance + monetização | Private beta. Mecânica: HTTP 402 Payment Required + headers `crawler-price` / `crawler-exact-price` / `crawler-charged`. Modelos flat per-request domain-wide ⁴ |
| **TollBit** | tollbit.com | Bot paywall + RAG licensing | Integra CDN (Cloudflare, Fastly, Akamai, WordPress VIP); parceria DataDome (set/2025); usado por TIME para negociar com OpenAI e Perplexity |
| **DataDome × TollBit** | datadome.co/bot-management-protection/datadome-tollbit-partner-protect-monetize-ai-traffic/ | Bot mitigation + monetização | AI traffic triplicou em 6 meses no parque DataDome; 1,7B+ requests/mês só OpenAI |
| **Vercel AI SDK 6** | ai-sdk.dev + vercel.com/docs/ai-sdk | Agent runtime / commerce | TypeScript SDK que abstrai 25+ providers; `ToolLoopAgent` com até 20 steps; usado por Clay para construir Claygent (agente de research que faz scraping + MCP) |

### Camada de defesa/governança

Ahrefs, Profound e Brandlight publicam dashboards de "AI crawler activity" para o domínio do cliente — quais bots visitam quais páginas, com que frequência. Isso é input para decidir entre **bloquear** (Cloudflare AI Crawl Control), **monetizar** (Pay Per Crawl + TollBit) ou **deixar livre** (estratégia GEO clássica).

---

## 7. Eventos canônicos 2026 (talks sobre GEO)

| Evento | Data | Local | Foco GEO |
|---|---|---|---|
| **AEO Conf** | 19/fev/2026 | San Francisco, USA | Pioneiro dedicado AEO |
| **SEO & GEO Summit** | 18-20/mar/2026 | Paris, França | Bilíngue, foco enterprise EU |
| **SMX Munich** | 9-11/mar/2026 | Munique, Alemanha | 60+ sessões; Lily Ray, Dr Pete Meyers, Wil Reynolds |
| **Sydney SEO Conference** | 20/mar/2026 | Sydney, Austrália | APAC GEO discussion |
| **Digital Marketing Europe** | 14-16/abr/2026 | Lisboa, Portugal | Foco europeu, comunidade lusófona acessível |
| **SEO Week** | 27-30/abr/2026 | NYC, USA | Curated GEO track |
| **BrightonSEO UK Spring** | 30/abr-1/mai/2026 | Brighton, UK | Curso dedicado "Generative Engine Optimization (GEO)" |
| **Ahrefs Evolve Singapore** | 14/mai/2026 | Singapura | Lançamento APAC do Brand Radar |
| **Demand & Expand** | 19-20/mai/2026 | San Francisco, USA | Demand-side enterprise |
| **GEO Conference** | 18/jun/2026 | Washington DC, USA | **Primeiro evento 100% dedicado a GEO**; speakers OpenAI, Perplexity, equipes GEO de grandes marcas |
| **MozCon New York** | 14/jul/2026 | NYC, USA | Talks de Lily Ray + Rand Fishkin |
| **BrightonSEO San Diego** | 15-16/set/2026 | San Diego, USA | Edição US do BrightonSEO |
| **INBOUND 2026** | 16-18/set/2026 | Boston, USA | HubSpot — marketing + GEO mainstream |
| **GEO KNOW HOW** | 1/out/2026 | Berlim, Alemanha | Evento dedicado GEO no DACH |
| **Ahrefs Evolve San Diego** | 12-13/out/2026 | San Diego, USA | Brand Radar deep-dive |
| **SMX Advanced** | 29-30/set/2026 | EUA | "Deep Dive Day" expert |
| **SMX Next** | 18/nov/2026 | Virtual | Talks AI Search |
| **BrightonSEO April 2026 — "GEO Experiments"** | abr/2026 | Brighton, UK | Talk experimental: llms.txt + schema + YouTube citations |

---

## 8. Sources confirmadas (spot-check via WebFetch)

URLs spot-checked com sucesso (conteúdo atual confirmado):

1. https://www.tryprofound.com/blog/profound-raises-96m-series-c — anúncio oficial da Série C de US$ 96M a US$ 1B valuation, founders James Cadwallader (CEO) e Dylan Babbs (CTO); Lightspeed lead; clientes Target, Walmart, Figma, MongoDB, Charlotte Tilbury, US Bank, Gamma — **CONFIRMADO**
2. https://peec.ai/pricing — 4 tiers (Starter/Pro/Advanced/Enterprise); engines ChatGPT, AI Mode, AI Overviews, Copilot, Perplexity, Gemini, Grok + Claude Sonnet 4 e GPT-5 Search no enterprise — **CONFIRMADO**
3. https://athenahq.ai/ — Self-Serve US$ 95/mês ou US$ 295/ano; 8+ engines; clientes Coinbase, SoFi, Slalom, R/GA, Nextiva, Paperless Post, DeVry, PagerDuty — **CONFIRMADO**
4. https://ahrefs.com/brand-radar — US$ 398–699/mês; 7 engines + YouTube/TikTok/Reddit; 400M+ prompts/mês; tagline "largest AI visibility database" — **CONFIRMADO**
5. https://otterly.ai/ — Lite US$ 29/mês, multi-país (US, UK, AU, DE, NL, CH, AT), 30K+ usuários, G2 4.8/5 — **CONFIRMADO**
6. https://www.brandlight.ai/ — enterprise puro, CEO Imri Marcus, clientes Volkswagen, Publicis, Caesars, LG, Estée Lauder, TD Bank — **CONFIRMADO**
7. https://tollbit.com/ — "complete web stack for the agentic internet"; parceiros OpenAI, Perplexity; TIME usou para licensing — **CONFIRMADO**
8. https://trakkr.ai/ — 8 engines (inclui Meta AI e DeepSeek); Growth US$ 79/mês, Scale US$ 399/mês; annual 17% off — **CONFIRMADO**
9. https://ipullrank.com/probability-ai-search — autor John Iwuozor; publicado out/2025; tese "Relevance Engineering" + query fan-out — **CONFIRMADO**
10. https://ipullrank.com/ai-search-manual — 24 capítulos; autores Mike King, Fajr Muhammad, Garrett Sussman, Francine Monahan, Annie Cushing, John Iwuozor; gratuito — **CONFIRMADO**
11. https://www.conversion.com.br/servicos/generative-engine-optimization-geo/ — Conversion BR como agência pioneira em GEO; metodologia descrita — **CONFIRMADO**
12. https://www.amsive.com/insights/seo/geo-aeo-llmo-separating-fact-from-fiction-how-to-win-in-ai-search/ — Lily Ray; 95% dos usuários ChatGPT seguem usando Google; AI = 1-2% tráfego — **CONFIRMADO**
13. https://blog.cloudflare.com/introducing-pay-per-crawl/ — HTTP 402 + headers `crawler-price` / `crawler-exact-price` / `crawler-charged`; private beta — **CONFIRMADO**
14. https://ahrefs.com/blog/geo-conferences/ — lista 14 conferências GEO 2026 com datas e locais — **CONFIRMADO**

Sources adicionais (via WebSearch, não spot-checked via WebFetch):

15. https://fortune.com/2026/02/24/exclusive-as-ai-threatens-search-profound-raises-96-million-to-help-brands-stay-visible/ — Fortune anuncia Série C
16. https://www.businesswire.com/news/home/20251113364791/en/Conductor-Unveils-2026-AEO-GEO-Benchmarks-Report-How-AI-Shapes-Brand-Visibility-in-a-Zero-Click-World — Conductor benchmark report (timeout no WebFetch; URL existe e foi indexada)
17. https://www.brightedge.com/resources/weekly-ai-search-insights/ai-overviews-one-year-presence-size-citing — BrightEdge AIO 1-Year report
18. https://searchengineland.com/seo-geo-aso-new-era-brand-visibility-ai-research-464936 — Search Engine Land sobre naming "SEO/GEO/ASO"
19. https://sparktoro.com/blog/5-strategic-features-that-predict-survival-in-the-zero-click-era/ — SparkToro zero-click
20. https://datadome.co/bot-management-protection/datadome-tollbit-partner-protect-monetize-ai-traffic/ — parceria DataDome × TollBit
21. https://www.cloudflare.com/paypercrawl-signup/ — Pay Per Crawl signup
22. https://www.businesswire.com/news/home/20251216993239/en/Conductor-Reports-Record-Enterprise-Momentum-as-AI-Search-Reshapes-Digital-Discovery — Conductor enterprise momentum + ISO 42001
23. https://searchengineland.com/smx — SMX 2026 calendar
24. https://www.aleydasolis.com/en/ai-search/ai-search-winning-brands-characteristics/ — Aleyda audit checklist
25. https://lilyraynyc.substack.com/p/your-geo-strategy-might-be-destroying — Lily Ray substack
26. https://www.clearscope.io/webinars/how-aeo-geo-actually-works — Bernard Huang webinar
27. https://seosly.com/ai-seo-course/ — Olga Zarr AI SEO Course

### Notas de rodapé

¹ Profound Série C US$ 96M @ US$ 1B valuation, 24/fev/2026 — Fortune, GlobeNewswire, Wilson Sonsini, blog Profound.
² Conductor AEO/GEO Benchmarks Report 2026 + ISO 42001 — BusinessWire 13/nov/2025 e 16/dez/2025.
³ BrightEdge Generative Parser + AIO 1-Year — brightedge.com/news/press-releases.
⁴ Cloudflare Pay Per Crawl — blog.cloudflare.com/introducing-pay-per-crawl + developers.cloudflare.com/ai-crawl-control.
⁵ Conversion BR GEO service — conversion.com.br/servicos/generative-engine-optimization-geo + conversion.com.br/blog/servico-de-geo.
⁶ The AI Search Manual — ipullrank.com/ai-search-manual, 24 capítulos, release ago/2025 atualizado 2026.
⁷ SEOFOMO stats — 40K+ subs, 45% open rate, 10% click — entrevista Humans of Martech (humansofmartech.com/2026/01/13/202-aleyda-solis-ai-search-crawlability).
⁸ Lily Ray @ MozCon 2025 — amsive.com/insights/seo/geo-aeo-llmo-separating-fact-from-fiction.
⁹ SparkToro zero-click thesis — sparktoro.com + livro "Zero Click Marketing" Rand Fishkin + Amanda Natividad.

---

## 9. Gaps de cobertura

1. **Conduit não confirmado.** Citado em listas de "top GEO platforms" mas WebSearch direto não trouxe domínio canônico verificável. Necessário rastrear via Crunchbase/LinkedIn para confirmar se é vendor real ou apenas mention recorrente.
2. **Goodie e Scrunch** têm presença mas pricing público não foi confirmado via spot-check direto. Listados como alternativas em comparativos.
3. **Conductor Intelligence page WebFetch timeout** — confirmação via texto da página falhou; fontes secundárias (BusinessWire, Yahoo Finance) confirmam capabilities e ISO 42001, mas não tivemos visual direto do platform page.
4. **Brasil — falta analista canônico.** Não foi possível identificar pesquisador/analista BR consolidado publicando regularmente em GEO (equivalente a Aleyda/Mike King/Lily Ray no Brasil). Oportunidade clara para Alexandre Caramaschi ocupar este vácuo via newsletter semanal e dossiês de pesquisa.
5. **Brasil — falta evento dedicado.** Nenhum evento BR 2026 com track 100% GEO foi confirmado. iMasters tem tangências; RD Summit, Casa dos Criadores, Web Summit Rio não publicam tracks formais. Gap estrutural.
6. **Métodos de medição entre vendors não são comparáveis.** Profound, Peec, Trakkr e AthenaHQ usam metodologias diferentes para "share of voice" / "visibility score". Brasil GEO deveria publicar comparativo independente com mesmo dataset cliente rodado em 2-3 plataformas para mensurar drift entre scores (oportunidade editorial alta).
7. **Pay Per Crawl publishers BR** — Cloudflare ainda não publicou lista de publishers BR no programa Pay-Per-Crawl. Globo, UOL, Estadão, Folha não foram confirmados como participantes. Pesquisa adicional necessária para mapear quem no Brasil já bloqueia ou monetiza crawlers OpenAI/Anthropic/Google.
8. **Vercel AI SDK + agent commerce — caso brasileiro.** Nenhum case BR public de agent commerce rodando em produção foi identificado. Mercado local ainda copia US.
9. **GEO + LGPD/legislação BR.** Como a Lei Geral de Proteção de Dados e regulações da ANPD interagem com Pay-Per-Crawl e bot toll é gap regulatório por explorar.
10. **Profound Université + agency marketplace** — Profound lançou programa de certificação e marketplace de agências em 2026. Brasil GEO poderia se candidatar como agency parceira oficial — explora gap institucional e ganha selo distribuído.
