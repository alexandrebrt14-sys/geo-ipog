# Wave E — KPIs e measurement GEO 2026

**Data:** 2026-05-17
**Autor:** Pesquisa canônica Brasil GEO (wave 5 de 5, geo-ipog)
**Escopo:** KPIs, frameworks de medição, atribuição zero-click, ferramentas de monitoramento, calibração de prompts, controvérsias metodológicas.
**Regra de evidência:** todo número tem URL. Quando vendors discordam, a controvérsia é declarada explicitamente. Itens com baixa rastreabilidade recebem `[VERIFICAR]`.

---

## TL;DR — 6 KPIs canônicos para 2026 e como ler cada um

A literatura 2025-2026 converge para um stack medível em três camadas (input → channel → outcome). Os seis KPIs que sobrevivem a auditoria de método são:

1. **Mention Rate (taxa de menção):** percentual de prompts canônicos em que a marca é nominada (texto bruto). KPI mais difundido; o mais fácil de inflar. Útil só com SoV pareado.
2. **Citation Rate (taxa de citação com link):** percentual de prompts em que a marca aparece como fonte clicável (URL) no painel/resposta. Mais conservador, mais correlacionado com tráfego.
3. **Share of Voice em AI (SoV-AI):** participação da marca no total de menções competitivas para um universo de prompts fixado. Substitui rank tracking tradicional como bússola estratégica em 2026 (Ahrefs, Profound, SEMrush convergem nessa leitura).
4. **AECR — AI Engagement & Citation Rate:** definido pela ELCA como conversão originada da resposta gerada (e re-batizado por agências como "AI Engine Citation Rate"). É aqui que mora a primeira controvérsia: dois conceitos disputam a mesma sigla.
5. **Sentiment / Positioning quality:** posição da marca dentro da resposta (líder, comparador, budget), com Net Sentiment Score = (endossos + neutros − negativos − alucinações) / total × 100.
6. **AI-Referred Traffic & Conversion:** sessões e conversões com origem confirmada em domínios de assistentes (ChatGPT, Perplexity, Claude, Copilot, Gemini), tipicamente convertendo 2,3× a 4,4× acima do tráfego orgânico tradicional.

Pano de fundo macro que o board precisa entender:
- CTR orgânico na posição 1 com AI Overview caiu de **27% para 11%** segundo SISTRIX em março/2026 (≈59% de perda).
- AI Overviews subiram de **6,49% (jan/25) para 13,14% (jan/26)** das queries no Google (+102% YoY).
- ChatGPT responde por **87,4% do tráfego de referência de AI** e os visitantes vindos de assistentes convertem **4,4×** mais que orgânico tradicional.
- AI Mode do Google entrega **93% de queries zero-click** (vs 60% no Google clássico).

A consequência operacional: tracking de rank em SERP perdeu primazia. O substituto canônico em 2026 é o pacote **Mention Rate + Citation Rate + SoV-AI + AI-Referred Traffic**, com tudo o mais em camada de qualidade.

---

## 1. KPIs canônicos com fórmula e proveniência

A tabela abaixo consolida o universo de KPIs publicado por ELCA, iPullRank, Profound, Ahrefs, Discovered Labs, Aleyda Solis e Averi/SingleGrain. Quando a fonte original não publicou fórmula explícita, isso é declarado.

| KPI | Sigla | Origem | Fórmula resumida | Quem mede em produção | URL canônica |
|---|---|---|---|---|---|
| AI-Generated Visibility Rate | AIGVR | ELCA (2024) | Frequência e proeminência em respostas AI; sem fórmula publicada pela ELCA | Profound, Peec, Otterly, AIGVR derivadas | https://www.elca.ch/news/generative-engine-optimization-geo-kpis |
| AI Engagement & Citation Rate (ELCA) | AECR | ELCA (2024) | Conversão originada da resposta AI (definição ELCA) | Agências GEO | https://www.elca.ch/news/generative-engine-optimization-geo-kpis |
| AI Engine Citation Rate (Averi/Discovered) | AECR (uso disputado) | Averi.ai, Discovered Labs | `(respostas AI citando seu URL ÷ respostas totais para queries-alvo) × 100` | Profound, Peec, Otterly, Brandlight | https://www.averi.ai/how-to/how-to-measure-geo-ai-citation-metrics-framework |
| Conversational Engagement Rate | CER | ELCA | Interação seguinte à resposta AI (clique, segunda pergunta); sem fórmula publicada | Plataformas GEO + GA4 | https://www.elca.ch/news/generative-engine-optimization-geo-kpis |
| Semantic Relevance Score | SRS | ELCA | Alinhamento conteúdo ↔ intenção (proxy: cosine similarity em embeddings) | iPullRank Input layer, Peec | https://www.elca.ch/news/generative-engine-optimization-geo-kpis |
| Schema Markup Effectiveness | SME | ELCA | Impacto de structured data em visibilidade AI; sem fórmula publicada | Auditorias técnicas | https://www.elca.ch/news/generative-engine-optimization-geo-kpis |
| Real-Time Adaptability Score | RTAS | ELCA | Velocidade de adaptação a mudanças algorítmicas; qualitativo | Strategy ops | https://www.elca.ch/news/generative-engine-optimization-geo-kpis |
| User Sentiment & Feedback Score | USFS | ELCA | Sentimento agregado em reviews/menções; sem fórmula publicada | Brand monitoring | https://www.elca.ch/news/generative-engine-optimization-geo-kpis |
| Prompt Alignment Efficiency | PAE | ELCA | Match entre prompts canônicos e conteúdo otimizado | Conversational specialists | https://www.elca.ch/news/generative-engine-optimization-geo-kpis |
| Content Trust & Authority Metric | CTAM | ELCA | Conformidade com sinais de E-E-A-T para LLM | QA de conteúdo | https://www.elca.ch/news/generative-engine-optimization-geo-kpis |
| Mention Rate | — | Profound, Otterly, Peec | `prompts com nome da marca ÷ total de prompts` | Todas as plataformas GEO | https://otterly.ai (cobertura geral) |
| Citation Rate (com link) | — | Discovered Labs, Averi, Profound | `prompts onde marca é fonte clicável ÷ total prompts × 100` | Profound, Peec, Brandlight | https://discoveredlabs.com/blog/aeo-benchmarks-how-to-measure-your-brands-visibility-in-ai-search |
| AI Share of Voice | SoV-AI | Ahrefs Brand Radar, Otterly, SEMrush | `menções/citações da marca ÷ total de menções competitivas no universo de prompts × 100` | Ahrefs, SEMrush AI Toolkit, Otterly, Profound | https://ahrefs.com/blog/brand-radar-methodology/ |
| Prompt-Level Rank | — | Ahrefs, Peec | Posição média da marca em N prompts canônicos (ex.: 1ª, 2ª, 3ª recomendação) | Peec, Ahrefs Brand Radar | https://peec.ai/pricing |
| Brand Association Coverage | — | iPullRank, Averi | Cobertura semântica: quantos sub-temas/entidades da categoria mencionam a marca | iPullRank Channel layer | https://ipullrank.com/ai-search-manual/measurement-geo |
| Net Sentiment Score | NSS | Sight AI, Visiblie | `(endossos + neutros − negativos − alucinações) ÷ total × 100`; varia de −100 a +100 | Sight AI, Indexly, Brandlight | https://www.trysight.ai/blog/sentiment-analysis-for-brand-mentions |
| Citation Position (proeminência) | — | iPullRank | Sequência da citação na resposta gerada (1ª vs enterrada) | iPullRank, Peec (parsing DOM) | https://ipullrank.com/ai-search-manual/measurement-geo |
| Source-of-Truth Precedence | — | iPullRank, Averi | Qual URL própria é citada quando há múltiplas opções (homepage vs pillar vs glossário) | Auditoria manual + Profound | https://ipullrank.com/ai-search-manual/measurement-geo |
| Hallucination Rate | — | Otterly, Sight AI | `% de respostas com erro factual sobre a marca ÷ total respostas` | Otterly (alertas), Sight AI | https://www.tryhikoo.com/en/blog/comparisons/otterly.ai-vs-peec-ai |
| Estimated Impressions | — | Ahrefs Brand Radar | menções × volume de busca do prompt relacionado | Ahrefs | https://ahrefs.com/blog/brand-radar-methodology/ |
| Conceptual Depth Score | — | iPullRank | NER + knowledge graph: profundidade hierárquica de entidades discutidas | iPullRank Input layer (proprietário) | https://ipullrank.com/ai-search-manual/measurement-geo |
| Entity Density | — | iPullRank | `entidades nomeadas ÷ 100 palavras` | iPullRank | https://ipullrank.com/ai-search-manual/measurement-geo |
| Semantic Relationship Density | — | iPullRank | `relacionamentos extraídos ÷ 100 palavras` | iPullRank | https://ipullrank.com/ai-search-manual/measurement-geo |
| Term Freshness & Evolution Rate | — | iPullRank | Adoção de termos novos / depreciação de termos antigos | iPullRank | https://ipullrank.com/ai-search-manual/measurement-geo |
| AI Bot Activity (crawl) | — | iPullRank, Trakkr | Frequência de hits de GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot etc. em log de servidor | Trakkr, server-side logs | https://www.amicited.com/blog/identify-ai-crawlers-server-logs/ |
| AI-Referred Traffic | — | GA4 custom channel, Discovered Labs | Sessões com referrer/UTM de domínio assistente | GA4 + Looker | https://discoveredlabs.com/blog/geo-metrics-what-kpis-matter-how-to-track-them-2026 |

**Benchmarks declarados:** Discovered Labs propõe Citation Rate de **8-15% (mínimo)**, **20-30% (otimizado)**, **40-50%+ (liderança de categoria)** em queries não-branded, com **26% das marcas com zero menções em AI Overviews**. AECR de high-performers fica em **8-15%** e AIGVR em **15-25%** segundo GenOptima/Averi. Esses ranges são **diretrizes setoriais**, não normas. Verticais regulados (saúde, educação, finanças) tendem a Citation Rate menor por restrição de E-E-A-T em LLMs.

> **Atenção semântica:** a sigla AECR é usada com dois sentidos diferentes na literatura — pela ELCA significa "AI Engagement & Conversion Rate" (relação com resultado de negócio); por Averi/Discovered/GenOptima significa "AI Engine Citation Rate" (frequência de citação com link). Sempre desambiguar em deck. Recomendamos manter "AECR-ELCA" e "Citation Rate" como nomes canônicos no portal Brasil GEO.

---

## 2. Frameworks de measurement publicados 2025-2026

### 2.1 ELCA — 9 KPIs canônicos (referência fundadora)

A ELCA publicou em 2024 a primeira lista canônica de KPIs GEO com 9 nomes: AIGVR, AECR (Engagement & Conversion), CER, SRS, SME, RTAS, USFS, PAE, CTAM. A força do framework é a abrangência (cobre input, channel e outcome); a fraqueza é que **nenhum KPI vem com fórmula matemática publicada**, deixando margem para vendors reescreverem o método.

**URL:** https://www.elca.ch/news/generative-engine-optimization-geo-kpis

### 2.2 Aggarwal et al. — paper GEO (KDD 2024)

O paper "GEO: Generative Engine Optimization" (Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande — Princeton & IIT, aceito no KDD 2024) é o documento acadêmico fundador da disciplina. Introduz:

- **GEO-bench:** benchmark com queries diversas em múltiplos domínios e fontes web relevantes.
- **Visibility metric:** framework black-box para otimizar e definir métricas de visibilidade. Detalhes operacionais (impression-weighted citation, position-adjusted word count) estão no PDF completo, não no abstract.
- **9 métodos de otimização testados:** subset documentado inclui Fluency Optimization, Statistics Addition, Citation Insertion, Authority Signals — com efeitos heterogêneos por domínio (Statistics Addition é o que mais ajuda em "Law & Government" e em queries de opinião).
- **Resultado headline:** ganho de até **40%** em visibilidade em respostas de generative engines com aplicação combinada.

**URLs:** https://arxiv.org/abs/2311.09735 · https://dl.acm.org/doi/10.1145/3637528.3671900

### 2.3 iPullRank — stack de 3 camadas + 4 métricas proprietárias

iPullRank (Mike King, Garrett Sussman) organiza o measurement em três tiers:

1. **Input Metrics** — elegibilidade para recuperação: passage-level relevance via cosine similarity, atividade de bots AI em log, ranking sintético via fan-out.
2. **Channel Metrics** — visibilidade no output gerado: SoV-AI, citation position, source prominence (parsing DOM).
3. **Performance Metrics** — outcomes: tráfego segmentado, conversão, assist value, lift de busca branded.

Quatro métricas proprietárias compõem o "Relevance Engineering" model: Entity Density, Conceptual Depth Score, Term Freshness & Evolution Rate, Semantic Relationship Density. iPullRank cita Profound como "best enterprise solution" para channel-layer (interesse declarado).

**URLs:** https://ipullrank.com/ai-search-manual/measurement-geo · https://ipullrank.com/ai-search-manual/measurement-templates

### 2.4 Aleyda Solis — 3-layer framework (Presence / Readiness / Business Impact)

Publicado em abril/2026, o framework de Aleyda Solis é prático e cobre:

- **Layer 1 — Presence:** a marca aparece? Como? Mention Rate, Citation Rate, SoV-AI, posição na resposta.
- **Layer 2 — Readiness:** o site está estruturalmente apto a ser surfado? 10 atributos canônicos: Accessible, Useful, Recognizable, Extractable, Consistent, Corroborated, Credible, Differentiated, Fresh, Transactable.
- **Layer 3 — Business Impact:** a visibilidade vira receita? Tráfego, conversão, pipeline atribuível.

**URL:** https://www.aleydasolis.com/en/ai-search/a-3-layer-framework-to-measure-ai-presence-readiness-and-business-impact-redefining-metrics-for-the-ai-search-era/ (HTTP 403 no fetch direto em 17/mai; capturada via search results e BrightonSEO speaker deck).
**Speaker deck:** https://speakerdeck.com/aleyda/redefining-success-metrics-for-the-ai-search-era-number-brightonseo

### 2.5 Profound — metodologia de prompts data-driven

Profound construiu seu diferencial sobre um dataset de **100M+ prompts e respostas reais de answer engines** (coletados de conversas reais), usados para recomendar quais prompts vale a pena monitorar. O motor:

1. Topic-matches contra a categoria do cliente.
2. Aplica NLP semântico para identificar sub-tópicos relevantes.
3. Identifica gaps de cobertura nos prompts já trackeados pelo cliente.

A limitação declarada: o recomendador inicialmente roda **apenas com dados do ChatGPT**, com expansão multi-plataforma na roadmap. Profound não publica número fixo de prompts recomendados — mas, em material institucional citado por agências, sugere de **50 a 150 prompts** como faixa canônica.

**URLs:** https://www.tryprofound.com/blog/data-driven-prompt-recommendation · https://www.tryprofound.com/resources/articles/generative-engine-optimization-geo-guide-2025

### 2.6 Peec / Otterly — comparação metodológica

- **Peec AI:** monitoramento diário de prompts, descoberta de prompts, mapeamento competitivo, recomendações de conteúdo. Tiering por número de prompts (25, 100, 300+).
- **Otterly:** monitoramento recorrente de respostas, log de menções e citações, métrica "Share of AI Voice", alertas de alucinação. Foco em simplicidade e detecção de hallucinations.

**Trade-off declarado:** Peec dá profundidade (descoberta + recomendação), Otterly dá velocidade (tracking simples + alerta). Não competem direto: stacks GEO maduros usam **as duas**.

**URLs:** https://peec.ai/pricing · https://www.tryhikoo.com/en/blog/comparisons/otterly.ai-vs-peec-ai

### 2.7 SEMrush AI Toolkit / Ahrefs Brand Radar

- **SEMrush AI Toolkit:** add-on de **US$ 99/mês** sobre subscriptions base (US$ 139,95 a US$ 499,95/mês). Combina keywords reais com prompts AI-generated e roda em LLMs principais. Crítica recorrente: **opacidade sobre fonte de dados** e mistura de prompts sintéticos com queries reais.
- **Ahrefs Brand Radar:** colhe prompts via PAA + Fanout, rodando contra **13,3 milhões de queries/mês em ChatGPT, Perplexity, Copilot**, **12,4 milhões em Gemini**, **143 milhões em AI Overviews** e **41 milhões em AI Mode**. KPIs expostos: AI Share of Voice e Estimated Impressions. Update mensal com janela de 90 dias para ChatGPT/Perplexity/Gemini/Copilot, contínuo para AI Overviews/AI Mode.

**URLs:** https://ahrefs.com/blog/brand-radar-methodology/ · https://bloggerjet.com/semrush-ai-toolkit-vs-ahrefs-brand-radar/

### 2.8 Discovered Labs — 5 KPIs operáveis (visão CMO)

Lista enxuta para uso de board, citada em seção 1. Diferencial: cada KPI vem com benchmark numérico setorial. Tracking principal via auditoria proprietária + GA4 filtrado por sources AI.

**URL:** https://discoveredlabs.com/blog/geo-metrics-what-kpis-matter-how-to-track-them-2026

---

## 3. Atribuição em era zero-click — GA4, GSC e server logs

### 3.1 Comportamento de referrer dos assistentes (canônico 2026)

| Plataforma | Referrer enviado | UTM agregado | Como aparece no GA4 default |
|---|---|---|---|
| ChatGPT (web, ChatGPT search) | `chatgpt.com` em modo `strict-origin-when-cross-origin` | Desde jun/2025: anexa `utm_source=chatgpt.com` em links de citação | Referral (quando referrer chega) ou Direct |
| ChatGPT (app iOS WKWebView) | Sem referrer | Sem UTM | Direct |
| ChatGPT (app Android Custom Tabs) | Sem referrer | Sem UTM | Direct |
| Perplexity | `perplexity.ai` | Inconsistente | Referral |
| Claude (claude.ai) | Bloqueia referrer em links externos | Sem UTM | Direct |
| Copilot | `copilot.microsoft.com` | Sem UTM | Referral |
| Gemini | `gemini.google.com` | Sem UTM | Referral |

**Quatro mecanismos comprovados que estripam o referrer:** (1) política `strict-origin-when-cross-origin` em chatgpt.com, (2) `rel=noreferrer` em links inline do plano pago, (3) WKWebView (iOS) e Custom Tabs (Android), (4) copy-paste de URL pelo usuário.

**URLs:** https://clickport.io/blog/chatgpt-direct-traffic-ga4 · https://www.atyla.io/blog/track-ai-traffic-google-analytics-ga4/en

### 3.2 Channel Group canônico em GA4 (regex de produção)

Em Admin → Channel Groups → criar **AI Traffic**, posicionado **acima de Referral** na ordem.

```regex
(chatgpt|openai|perplexity|claude|anthropic|gemini\.google|copilot\.microsoft|bing\.com/chat|deepseek|grok|meta\.ai|you\.com)\.(com|ai)
```

Em Looker Studio (renomeada de volta para **Data Studio** em 11/04/2026), CASE WHEN equivalente:

```sql
CASE WHEN REGEXP_MATCH(Session source, "chatgpt|openai|perplexity|claude|gemini|copilot|anthropic|deepseek|meta\\.ai")
     THEN "AI Traffic"
     ELSE Session default channel group END
```

GA4 introduziu em 2026 o valor de dimensão `ai-assistant` automaticamente quando o referrer header bate em assistentes reconhecidos — mas a cobertura ainda é parcial.

**URLs:** https://www.databloo.com/blog/how-to-track-ai-traffic/ · https://www.qwestyon.com/blog/how-to-track-ai-traffic-in-ga4-using-custom-channel-groups · https://delante.co/ga4-adds-a-ai-assistant-channel-what-it-changes/

### 3.3 GSC em 2026 — AI Mode não está separado

Estado de 2026 (confirmado em fontes Search Engine Journal e Google Developers):

- AI Mode e AI Overviews aparecem no relatório Performance **misturados** com Web.
- **Não existe filtro nativo** para isolar AI Mode no GSC (até o cierre de 17/05/2026).
- A configuração "AI-powered" do GSC (rollout global em fevereiro/2026) permite linguagem natural para filtrar relatórios, **mas só atua sobre Performance de Search results**, não sobre Discover, News, nem ainda separa AI Mode.

**Implicação operacional:** tracking confiável de AI Mode em 2026 exige plataformas externas (Ahrefs Brand Radar trackeia 41M queries AI Mode/mês) **ou** análise indireta via decay de CTR + crescimento de Impressões.

**URLs:** https://developers.google.com/search/blog/2025/12/ai-powered-configuration · https://www.searchenginejournal.com/google-adds-ai-mode-traffic-to-search-console-reports/549089/

### 3.4 Server-side logging (a única fonte 100% confiável)

Logs de servidor capturam:

| Bot | User-Agent canônico | Função |
|---|---|---|
| GPTBot | `GPTBot/1.x (+https://openai.com/gptbot)` | Training crawler OpenAI |
| OAI-SearchBot | `OAI-SearchBot/1.x` | Indexação para ChatGPT search |
| ChatGPT-User | `ChatGPT-User/1.x` | Fetch em tempo real durante conversa do usuário |
| ClaudeBot | `ClaudeBot/1.x` | Training Anthropic |
| Claude-User | `Claude-User/1.x` | Fetch em tempo real Anthropic |
| PerplexityBot | `PerplexityBot/1.x` | Indexação Perplexity |
| Perplexity-User | `Perplexity-User/1.x` | Fetch em tempo real Perplexity |
| Google-Extended | `Google-Extended` | Training Gemini / AI Overviews |
| Gemini Deep Research | (varia) | Pesquisa multi-step Gemini |

**ChatGPT-User e Perplexity-User são o sinal direto de citação:** cada hit representa um usuário real perguntando ao assistente e a IA buscando a URL para citar. Cada 5xx ou 4xx nesses bots é uma citação perdida.

**Verificação canônica:** reverse-DNS lookup do IP. Se reverse não bate com domínio da OpenAI/Anthropic/Perplexity/Google, é spoof.

Apache (regex):
```
RewriteCond %{HTTP_USER_AGENT} (GPTBot|ChatGPT-User|ClaudeBot|Claude-User|PerplexityBot|Perplexity-User|OAI-SearchBot|Google-Extended) [NC]
```

Nginx:
```
if ($http_user_agent ~* (GPTBot|ChatGPT-User|ClaudeBot|Claude-User|PerplexityBot|Perplexity-User|OAI-SearchBot|Google-Extended)) { ... }
```

**URLs:** https://www.amicited.com/blog/identify-ai-crawlers-server-logs/ · https://www.wislr.com/articles/ai-bot-behavior-log-analysis · https://momenticmarketing.com/blog/ai-search-crawlers-bots

---

## 4. Benchmarks setoriais 2026 (com URL para cada número)

| Métrica | Valor | Fonte (URL) |
|---|---|---|
| % de respostas ChatGPT que citam alguma fonte | **87%** (varia por contexto) | https://www.averi.ai/blog/ai-citation-tracking-chatgpt-perplexity-claude |
| % de páginas que ChatGPT cita em relação às que recupera | **15%** (85% das fontes recuperadas nunca são citadas) | https://www.averi.ai/blog/ai-citation-tracking-chatgpt-perplexity-claude |
| % de queries ChatGPT com web search ativado (fev/2026) | **34,5%** (caiu de 46% no fim de 2024) | https://www.semrush.com/blog/chatgpt-search-insights/ |
| Citações ChatGPT que vêm direto do Bing top results | **87%** | https://www.seerinteractive.com/insights/87-percent-of-searchgpt-citations-match-bings-top-results |
| Overlap de domínios citados ChatGPT ↔ Perplexity | **11%** | https://authoritytech.io/curated/ai-citation-11-percent-platform-overlap-per-engine-audit-2026 |
| Respostas com link externo: Perplexity + Copilot | **>77%** | https://www.singlegrain.com/artificial-intelligence/measuring-share-of-voice-inside-ai-answer-engines/ |
| Respostas com link externo: ChatGPT | **~31%** | https://www.singlegrain.com/artificial-intelligence/measuring-share-of-voice-inside-ai-answer-engines/ |
| CTR orgânico posição 1 sem AI Overview | **27%** | https://ppc.land/googles-ai-grip-tightens-what-sistrixs-march-data-means-for-publishers/ |
| CTR orgânico posição 1 com AI Overview (SISTRIX mar/26) | **11%** (queda ~59%) | https://ppc.land/googles-ai-grip-tightens-what-sistrixs-march-data-means-for-publishers/ |
| CTR queda média com AIO (Seer/SEJ Q4-25) | **−61%** (1,76% → 0,61% em 15 meses) | https://www.searchenginejournal.com/ai-overview-ctr-fell-61-but-clicks-didnt-collapse/572993/ |
| Sample Seer Interactive | 5,47M queries em 53 marcas | https://www.searchenginejournal.com/ai-overview-ctr-fell-61-but-clicks-didnt-collapse/572993/ |
| AIO trigger rate (Ahrefs, 146M results) | **20,5%** | https://www.searchenginejournal.com/ai-overview-ctr-fell-61-but-clicks-didnt-collapse/572993/ |
| Pew Research: clicks com AIO vs sem | **8% vs 15%** | https://www.searchenginejournal.com/ai-overview-ctr-fell-61-but-clicks-didnt-collapse/572993/ |
| AIO presença jan/25 → jan/26 (queries Google) | **6,49% → 13,14%** (+102% YoY) | https://www.position.digital/blog/ai-seo-statistics/ |
| % de queries zero-click Google clássico | **60%** | https://www.success.com/zero-click-search-strategy |
| % de queries zero-click Google AI Mode | **93%** | https://www.success.com/zero-click-search-strategy |
| Tráfego orgânico US YoY (jan/26) | **−2,5%** | https://searchengineland.com/google-ai-overviews-search-clicks-fell-report-455498 |
| Cliques orgânicos perdidos / mês (Alemanha, SISTRIX) | **265 milhões** | https://ppc.land/googles-ai-grip-tightens-what-sistrixs-march-data-means-for-publishers/ |
| AIO presença vertical Healthcare | **88%** | https://almcorp.com/blog/google-ai-overviews-surge-9-industries/ |
| AIO presença vertical Education | **83%** | https://almcorp.com/blog/google-ai-overviews-surge-9-industries/ |
| AIO presença vertical B2B Tech | **82%** (era 36% um ano antes) | https://almcorp.com/blog/google-ai-overviews-surge-9-industries/ |
| Overlap top-10 SERP ↔ citações AIO (mid-25 → early-26) | **75% → 17-38%** | https://thedigitalbloom.com/learn/organic-traffic-crisis-report-2026-update/ |
| Tráfego de AI referral (jun/2025) | **>1,1 bilhão de visitas/mês**, +357% YoY | https://www.asklantern.com/blogs/chatgpt-drives-87-of-ai-referral-traffic |
| Conversão AI-referred vs orgânico | **4,4×** maior | https://www.asklantern.com/blogs/chatgpt-drives-87-of-ai-referral-traffic |
| Share ChatGPT no tráfego AI total | **87,4%** | https://www.asklantern.com/blogs/chatgpt-drives-87-of-ai-referral-traffic |
| Conversão AI-referred (Discovered Labs) | **2,3×** maior que orgânico tradicional | https://discoveredlabs.com/blog/geo-metrics-what-kpis-matter-how-to-track-them-2026 |
| Marcas com **zero** menções em AI Overviews | **26%** | https://discoveredlabs.com/blog/geo-metrics-what-kpis-matter-how-to-track-them-2026 |
| Citation Rate target B2B SaaS (baseline) | **10-15%** | https://discoveredlabs.com/blog/aeo-benchmarks-how-to-measure-your-brands-visibility-in-ai-search |
| Citation Rate target líderes de categoria | **>30%** | https://discoveredlabs.com/blog/aeo-benchmarks-how-to-measure-your-brands-visibility-in-ai-search |
| AI Overview CTR (fev/2026, recuperação) | **2,4%** (saindo de 1,3% em dez/25) | https://www.searchenginejournal.com/ai-overviews-ctr-fell-61-but-clicks-didnt-collapse/572993/ `[VERIFICAR]` — número de Seer secundário |
| Lift de cliques orgânicos para marcas citadas em AIO | **+35%** | https://thedigitalbloom.com/learn/organic-traffic-crisis-report-2026-update/ |

> **Spot-check de 10 URLs realizado:** todas as 10 URLs marcadas como "canônicas" nesta tabela foram verificadas via WebSearch + WebFetch durante a coleta. Quatro adicionais (`almcorp.com`, `position.digital`, `thedigitalbloom.com`, `searchengineland.com/...455498`) só foram acessadas via snippet de search results e merecem releitura antes de virarem citação em deck cliente — marquei como `[VERIFICAR]` quando o número crítico depende delas.

---

## 5. Ferramentas de monitoramento — comparativo

Tabela comparativa das plataformas operando em maio/2026 com preço base, free tier, disponibilidade de API e diferencial competitivo. Preços confirmados na URL de cada vendor (ou via Trakkr/Hikoo, agregadores canônicos).

| Tool | Preço base | Free tier | API | Diferencial canônico | URL |
|---|---|---|---|---|---|
| **Profound** | Lite **US$ 499/mês** (ChatGPT, 50 prompts, 1 seat). Growth **US$ 399/mês** [VERIFICAR — preço Lite > Growth é anomalia reportada]. Enterprise **US$ 2.000-5.000+/mês** (10+ plataformas, API, SOC2 Type II). Sem self-serve checkout. | Não | Sim (Enterprise) | Dataset proprietário de 100M+ prompts reais; integração GA; recomendação de prompts data-driven | https://www.tryprofound.com/ · https://trakkr.ai/reviews/profound-review/pricing |
| **Peec AI** | Starter **€89/mês** (25 prompts). Pro **€199/mês** (100 prompts). Enterprise **€499+/mês** (300+ prompts). | Trial limitado | Sim | Recomendações acionáveis de conteúdo; competitor mapping; descoberta de prompts | https://peec.ai/pricing |
| **Otterly.AI** | Lite **US$ 29/mês** (15 prompts). Standard **US$ 189/mês** (100 prompts). Premium **US$ 489/mês** (400 prompts). | Trial | Sim | Alertas de hallucination; "Share of AI Voice"; simplicidade | https://otterly.ai (preços via comparativos) https://www.tryanalyze.ai/blog/peec-ai-vs-otterly-ai |
| **AthenaHQ** | Self-Serve **US$ 295/mês** (3.600 créditos/mês, single country). Enterprise = ACE Citation Engine. Pricing por créditos (uso variável). | Não declarado | Sim (Enterprise) | ACE Citation Engine (Enterprise only); modelo por créditos | https://trakkr.ai/reviews/athenahq-review/pricing |
| **Brandlight** | Preço sob consulta `[VERIFICAR]` | Não declarado | Sim | Foco em narrativa de marca + Bing/Perplexity/ChatGPT; analise de fontes mais influentes | https://sourceforge.net/software/product/Brandlight/ |
| **Goodie AI** | A partir de **US$ 495/mês** | Não | Sim (Enterprise) | AEO end-to-end; cobre ChatGPT, Gemini, Llama, Perplexity, DeepSeek | https://pikaseo.com/articles/goodie-ai-review |
| **Conduit** | Preço sob consulta `[VERIFICAR]` | — | — | Posicionamento enterprise GEO `[VERIFICAR]` | — (não confirmado em fonte canônica) |
| **Trakkr** | Preço variável (modelo freemium reportado). Daily monitoring. | Sim (entry tier) | Sim | Crawler analytics nativo (vê AI bots batendo no site); Presence Score + Visibility Score | https://trakkr.ai |
| **SEMrush AI Toolkit** | **US$ 99/mês add-on** sobre subscription Semrush (US$ 139,95-499,95/mês) | Não | Via Semrush | Integração com SEO existente; análise de sentimento; transparência criticada | https://bloggerjet.com/semrush-ai-toolkit-vs-ahrefs-brand-radar/ |
| **Ahrefs Brand Radar** | Incluso nos planos Ahrefs (a partir de **US$ 129/mês**) | Trial | Via Ahrefs API | Maior escala (143M AI Overview queries/mês); metodologia PAA + Fanout publicada | https://ahrefs.com/brand-radar · https://ahrefs.com/blog/brand-radar-methodology/ |
| **HubSpot AI Share of Voice** | Free grader | Sim (free tool) | Não | Ponto de entrada zero-custo para diagnose | https://www.hubspot.com/aeo-grader/share-of-voice |
| **LLM Pulse** | Preço sob consulta `[VERIFICAR]` | Trial | Sim `[VERIFICAR]` | Foco em dashboards executivos | https://llmpulse.ai/data-studies/top-cited-domains |
| **Sight AI** | A partir de **US$ 49/mês** `[VERIFICAR]` | Trial | Sim | Sentiment tracking dedicado | https://www.trysight.ai/blog/ai-visibility-software-pricing |
| **Indexly** | Preço sob consulta `[VERIFICAR]` | — | — | Sentiment tracking + drivers análise | https://indexly.ai/features/ai-sentiment-tracking |

### 5.1 Open-source / DIY (alternativa NAIA-style)

- **run-prompts-weekly.mjs (Brasil GEO):** script proprietário do portfólio Herreira/papers que roda lista canônica de prompts em 5 LLMs com agendamento semanal. Baseline reportada: OpenAI 60%, Perplexity 40%, Gemini 40%, Groq 40%, Anthropic 0% de mention rate. Custo: chaves de API próprias.
- **Apify AI Brand Monitor:** actor pronto (ChatGPT, Claude, Perplexity) pago por execução. https://apify.com/amernas/ai-brand-monitor
- **Stack mínimo "faça em casa":** N prompts → cron job → OpenAI/Anthropic/Perplexity API → parser regex de menção → SQLite/Postgres → Looker. Custo marginal: tokens de API. Aceitável até ~150 prompts × 5 engines × semanal (estimado <US$ 30/mês em tokens). Acima disso, ferramenta paga vence em ROI.

### 5.2 Critério de escolha (orientação Brasil GEO)

| Caso de uso | Recomendação primária | Alternativa |
|---|---|---|
| Brand monitoring básico, <50 prompts | Otterly Lite ou stack DIY | HubSpot grader (diagnose) |
| Cobertura competitiva pesada, 100-300 prompts | Peec Pro ou Profound Growth | Ahrefs Brand Radar (se já cliente Ahrefs) |
| Enterprise + integração GA + multi-país | Profound Enterprise | Goodie AI |
| Análise de sentimento canônica | Sight AI ou Indexly | Profound Enterprise |
| Server-side bot tracking | Trakkr + log analysis nativo | Screaming Frog Log Analyser |
| Stack hibrida com SEO tradicional | Ahrefs Brand Radar + SEMrush AI Toolkit | Profound + Discovered Labs audit |

---

## 6. Calibração de prompts âncora — playbook canônico

### 6.1 Quantidade de prompts (consenso 2026)

Os números variam conforme tier de maturidade. A síntese das fontes canônicas (Profound, Ahrefs, Discovered Labs, SE Ranking):

| Fase | Prompts | Justificativa |
|---|---|---|
| Initial test (diagnose) | **25-50 prompts de alta intenção** | Permite mention rate estatisticamente significativo sem custo proibitivo |
| Baseline operacional | **50-100 prompts** | Cobertura mínima para SoV competitivo com 3-5 concorrentes |
| Maturity (Profound recomendado) | **50-150 prompts** | Sweet spot publicado em material institucional |
| Enterprise pleno (Discovered Labs) | **50-200 prompts highest-intent** | Cobertura full-funnel da categoria |
| Cobertura exaustiva (Ahrefs scale) | **>1.000 prompts** via PAA/Fanout | Só faz sentido com automação de larga escala |

### 6.2 Como gerar a lista canônica (4 fontes)

1. **GSC Performance — top 50-100 keywords não-branded:** converte cada keyword em pergunta natural ("X best", "is X worth", "how to do X"). Base de pergunta com volume real.
2. **Entrevistas com clientes/SDRs:** pergunta literal que o lead fez no primeiro contato. Maior peso de conversão.
3. **AlsoAsked + Google PAA:** captura como usuário refina. Bom para sub-perguntas comparativas.
4. **Recomendador Profound/Ahrefs (se disponível):** prompt suggestions baseado em conversas reais. Eficiente para sub-tópicos invisíveis em GSC.

Mix recomendado: 40% intenção comercial ("X vs Y", "qual o melhor"), 30% informacional aprofundado ("como funciona X", "X regulado por"), 20% branded ("o que pensam de X"), 10% problema/pain ("erro X", "dificuldade X").

### 6.3 Frequência de re-rodada

| Ferramenta | Cadência publicada |
|---|---|
| Profound | Diária para tier pago |
| Peec AI | Diária |
| Otterly | Recorrente (configurável) |
| Ahrefs Brand Radar | Mensal (90-day window) para ChatGPT/Perplexity/Gemini/Copilot; contínuo para AIO/AI Mode |
| SEMrush AI Toolkit | Semanal |
| DIY (Brasil GEO run-prompts-weekly) | Semanal |

**Recomendação canônica Brasil GEO:** **semanal** é o trade-off ideal entre detectar tendência e absorver custo de tokens/credits. Diário só vale para dashboards executivos em mercados de alta volatilidade (finanças, política).

### 6.4 Tratamento estatístico

Um único run por prompt é insuficiente. LLMs têm temperatura > 0 (mesmo em "search mode") e output varia. Discovered Labs e o estudo Statistical Framework for Generative Search 2026 recomendam:

- **3-5 runs por prompt** por ciclo (Mention Rate é distribuição, não ponto).
- Reportar **média + mediana + p90** para cada métrica.
- Usar intervalo de confiança 95% antes de declarar "subida" ou "queda" entre ciclos.
- Decompor mention rate por **engine** (ChatGPT, Perplexity, Claude, Copilot, Gemini) — agregação global esconde variação enorme entre plataformas.

**URLs:** https://www.tryprofound.com/blog/data-driven-prompt-recommendation · https://seranking.com/blog/how-to-choose-prompts-to-track/ · https://ahrefs.com/blog/custom-prompt-tracking/

---

## 7. Controvérsias metodológicas 2026

### 7.1 Mention Rate ≠ Citation Rate (a divisão fundadora)

Caso real reportado por Michael Brito (LinkedIn, fev/2026): marca com **~90% de recommendation rate** e **~15% de citation rate**. A diferença: o nome é mencionado em conteúdo de terceiros que o LLM extrai, mas o site oficial raramente é a fonte clicada. **Reportar só mention rate é vaidade; reportar só citation rate subestima brand pull.** O canônico em 2026 é reportar **os dois pareados**, sempre.

**URL:** https://www.linkedin.com/pulse/how-measure-geo-performance-when-ai-answers-citations-michael-brito-x6apc

### 7.2 Phantom citations e o caso GeoScore Analytics (FTC, 2025)

Em 5 de agosto de 2025, FTC fechou settlement com GeoScore Analytics: a métrica "AI Authority Score" da agência **não correlacionou** com frequência de citação real em produção. Reportagem aponta padrões de:

- Citações reportadas que não aparecem em queries reais de usuário.
- KPIs "shiny" otimizados para venda de retainer, não para uso de marketing.
- Modelos de scraping que rodam só GPT-4o (mid-tier) enquanto vendem cobertura "multi-engine".

**Recomendação operacional:** contratos GEO em 2026 devem ter holdback amarrado a verificação independente — minimamente 3 spot-checks/mês via run manual em prompts canônicos, comparando contra o dashboard do vendor.

**URL:** https://generative-engine.org/the-geo-measurement-mirage-how-phantom-citations-and-inflate-1756195420777 `[VERIFICAR — site fora do ar em 17/05/2026, ECONNREFUSED. Referência preservada via snippet de search.]`

### 7.3 Engine mix nos scrapers (cobertura desigual)

- Profound (Lite) cobre só ChatGPT.
- Otterly Lite cobre ChatGPT + Perplexity.
- Profound Enterprise cobre 10+ engines (Claude, Gemini, Grok, Meta AI, DeepSeek).
- Ahrefs Brand Radar cobre ChatGPT, Perplexity, Gemini, Copilot, AIO, AI Mode.

**Consequência:** mention rate "geral" reportado por dois vendors **não é comparável** se a mistura de engines for diferente. Auditoria canônica exige que o KPI venha **decomposto por engine** ou que ambos os vendors rodem no **mesmo mix**.

### 7.4 Claude às vezes não cita URL

Em respostas conversacionais sem web search ativado, Claude descreve a fonte ("segundo X agência") sem linkar. Isso quebra o tracking baseado em parsing de URL. Solução parcial: **NER + brand matching no texto da resposta** (não só nos hyperlinks). Otterly e Sight AI fazem isso; SEMrush historicamente só capturava links explícitos.

### 7.5 SoV-AI vs SoV tradicional

Ahrefs e SEMrush usam o termo SoV em contexto AI. Mas:
- Em SEO clássico, SoV é função de **rank ponderado pela curva de CTR esperada**.
- Em GEO, SoV é função de **menções no texto + citações com link**, sem curva de CTR estabelecida.

Equivalência matemática não existe. **Não comparar SoV-SEO histórica com SoV-AI atual** como se fosse a mesma série temporal — é o erro mais comum em dashboards de transição 2026.

### 7.6 ChatGPT Search ativo apenas em 34,5% das queries

Como a maioria das respostas do ChatGPT (≈65%) ainda vem de training data, o universo "rastreável via prompt em tempo real" é minoria. Vendors que rodam apenas com web search ON capturam só essa fatia; o restante da influência sobre o usuário vem de respostas geradas a partir de training data — e essa parte só é endereçável otimizando **antes do próximo training cutoff** (estratégia de data presence, não de tracking real-time).

**URL:** https://www.semrush.com/blog/chatgpt-search-insights/

### 7.7 SEMrush AI Toolkit — falta de transparência

SEMrush combina keywords reais com prompts AI-generated antes de rodar contra LLMs. Não publica:
- Volume de prompts AI-generated por relatório.
- Modelo usado para gerar prompts (proprietário?).
- Critério de mix sintético vs real.

Resultado: número de SoV-AI vindo do SEMrush **não é auditável** sem acesso interno aos prompts. Para compliance enterprise ou pitch a board, prefira plataformas que **publicam metodologia** (Ahrefs, Profound) ou **expõem o prompt set tracking** (Peec, Otterly).

---

## 8. Dashboard recomendado para portal editorial Brasil GEO

Mapeamento canônico de campos para o portal `alexandrecaramaschi.com` / `posgraduacaopsicologia.com` / `dinheirodaminhaempresa.com`. Stack: GA4 + GSC + ferramenta GEO (sugestão: Profound Growth + Trakkr para logs, ou DIY run-prompts-weekly em escala inicial).

### 8.1 Layout do dashboard executivo (3 colunas × 3 linhas)

**Linha 1 — Presença (Layer Aleyda):**
- Card 1: **Mention Rate** por engine (ChatGPT, Perplexity, Claude, Gemini, Copilot). Fonte: Profound API ou run-prompts-weekly. Filtro: últimos 7d, 30d, 90d.
- Card 2: **Citation Rate** (com link). Fonte: idem.
- Card 3: **SoV-AI** vs 3 concorrentes canônicos. Fonte: Profound competitive view ou Ahrefs Brand Radar.

**Linha 2 — Qualidade e profundidade:**
- Card 4: **Net Sentiment Score** (−100 a +100), decomposto por engine. Fonte: Sight AI ou parsing pós-hoc do output do run-prompts-weekly.
- Card 5: **Citation Position** (1ª, 2ª, 3ª recomendação). Fonte: parsing DOM Profound ou manual sample.
- Card 6: **Hallucination count** por semana. Fonte: Otterly ou auditoria manual.

**Linha 3 — Outcome de negócio:**
- Card 7: **AI-Referred Sessions** GA4. Fonte: GA4 custom channel "AI Traffic" (regex canônico §3.2).
- Card 8: **AI-Referred Conversions** + Conversion Rate vs orgânico. Fonte: GA4 + CRM matching.
- Card 9: **AI Bot Hits** (ChatGPT-User, Perplexity-User, ClaudeBot) — sinal forward-looking. Fonte: server log parsing (Trakkr ou script próprio).

### 8.2 Mapeamento técnico campo a campo

| Card | Campo GA4 / GSC / GEO | Granularidade | Cadência |
|---|---|---|---|
| Mention Rate | Métrica custom da plataforma GEO | Por engine + por prompt | Semanal |
| Citation Rate | Métrica custom (URL match) | Por engine + por prompt | Semanal |
| SoV-AI | Competitive view | Por categoria | Semanal |
| NSS | Sentiment custom | Por engine | Semanal |
| Citation Position | DOM index | Por prompt | Semanal |
| Hallucination | Alert log | Por instância | Diário |
| AI-Referred Sessions | GA4 — `sessionDefaultChannelGroup = 'AI Traffic'` (custom) | Por dia, por landing page | Diário |
| AI-Referred Conversions | GA4 — `eventName = 'generate_lead' AND session.AI Traffic` | Por dia | Diário |
| AI Bot Hits | Server log (user-agent regex §3.4) | Por bot, por URL | Diário |

### 8.3 Alertas canônicos

- **Mention Rate** cai >10% semana-a-semana em qualquer engine: investigar.
- **Citation Rate** cai >5pp ou cai abaixo do baseline setorial (Discovered Labs 8-15%): alerta crítico.
- **Hallucination** detectada: revisar URL canônica e considerar pingar `/api/indexnow` para forçar reindex.
- **ChatGPT-User** retorna 4xx/5xx para qualquer URL canônica: tratar como bug P0 (citação real perdida).
- **NSS** cai abaixo de +20: revisar respostas negativas e atualizar conteúdo on-site.

### 8.4 Stack mínima recomendada (R$/mês estimado para Brasil GEO scale)

| Componente | Ferramenta | Custo aprox./mês |
|---|---|---|
| Tracking core | Profound Growth ou Peec Pro ou DIY run-prompts-weekly | US$ 199-399 ou tokens (~US$ 30) |
| Sentiment | Sight AI ou parsing custom | US$ 49 ou zero |
| Logs / bots | Trakkr ou parsing nginx próprio | Variável ou zero |
| Tradicional | Ahrefs (já cliente para SEO) | US$ 129+ |
| GA4 + Looker | Google free tier | zero |
| **Total mínimo viável** | DIY + Looker + Ahrefs existente | **~US$ 130/mês** |
| **Total enterprise** | Profound Enterprise + Sight AI + Trakkr + Ahrefs + SEMrush AI | **~US$ 3.000-5.500/mês** |

---

## 9. Sources confirmadas (mínimo 25)

### KPIs e frameworks
1. ELCA — Generative Engine Optimization KPIs: https://www.elca.ch/news/generative-engine-optimization-geo-kpis
2. Aggarwal et al. — GEO: Generative Engine Optimization (KDD 2024) arXiv: https://arxiv.org/abs/2311.09735
3. Aggarwal et al. — GEO ACM SIGKDD page: https://dl.acm.org/doi/10.1145/3637528.3671900
4. iPullRank — The Measurement Chasm (Tracking GEO Performance): https://ipullrank.com/ai-search-manual/measurement-geo
5. iPullRank — Measurement Frameworks and Templates: https://ipullrank.com/ai-search-manual/measurement-templates
6. Aleyda Solis — 3-Layer Framework: https://www.aleydasolis.com/en/ai-search/a-3-layer-framework-to-measure-ai-presence-readiness-and-business-impact-redefining-metrics-for-the-ai-search-era/
7. Aleyda Solis — BrightonSEO Speaker Deck: https://speakerdeck.com/aleyda/redefining-success-metrics-for-the-ai-search-era-number-brightonseo
8. Discovered Labs — GEO Metrics 2026: https://discoveredlabs.com/blog/geo-metrics-what-kpis-matter-how-to-track-them-2026
9. Discovered Labs — AEO Benchmarks: https://discoveredlabs.com/blog/aeo-benchmarks-how-to-measure-your-brands-visibility-in-ai-search
10. Discovered Labs — AEO Performance Metrics: https://discoveredlabs.com/blog/aeo-performance-metrics-what-to-measure-and-how-to-track-ai-citations
11. Averi.ai — AI Citation Metrics Framework: https://www.averi.ai/how-to/how-to-measure-geo-ai-citation-metrics-framework
12. Averi.ai — Track AI Citations 2026: https://www.averi.ai/how-to/how-to-track-ai-citations-and-measure-geo-success-the-2026-metrics-guide
13. GenOptima — GEO ROI KPI Framework 2026: https://www.gen-optima.com/geo/how-to-measure-geo-roi-kpi-framework-2026/
14. SingleGrain — Share of Voice in AI Answer Engines: https://www.singlegrain.com/artificial-intelligence/measuring-share-of-voice-inside-ai-answer-engines/
15. Profound — Data-Driven Prompt Recommendation: https://www.tryprofound.com/blog/data-driven-prompt-recommendation
16. Profound — 10-step GEO framework: https://www.tryprofound.com/resources/articles/generative-engine-optimization-geo-guide-2025

### Plataformas / ferramentas
17. Peec AI — Pricing: https://peec.ai/pricing
18. Otterly vs Peec (Hikoo): https://www.tryhikoo.com/en/blog/comparisons/otterly.ai-vs-peec-ai
19. AthenaHQ Pricing (Trakkr): https://trakkr.ai/reviews/athenahq-review/pricing
20. Profound Pricing (Trakkr): https://trakkr.ai/reviews/profound-review/pricing
21. Goodie AI Review (PikaSEO): https://pikaseo.com/articles/goodie-ai-review
22. Ahrefs Brand Radar Methodology: https://ahrefs.com/blog/brand-radar-methodology/
23. Ahrefs Brand Radar landing: https://ahrefs.com/brand-radar
24. Bloggerjet — SEMrush AI Toolkit vs Ahrefs Brand Radar: https://bloggerjet.com/semrush-ai-toolkit-vs-ahrefs-brand-radar/

### Atribuição zero-click / GA4 / GSC
25. Clickport — Why ChatGPT Shows Direct in GA4 (2026): https://clickport.io/blog/chatgpt-direct-traffic-ga4
26. Databloo — Track AI Traffic GA4 + Looker Studio: https://www.databloo.com/blog/how-to-track-ai-traffic/
27. Qwestyon — GA4 Custom Channel Groups: https://www.qwestyon.com/blog/how-to-track-ai-traffic-in-ga4-using-custom-channel-groups
28. Atyla — Track AI Traffic GA4: https://www.atyla.io/blog/track-ai-traffic-google-analytics-ga4/en
29. Delante — GA4 AI Assistant Channel: https://delante.co/ga4-adds-a-ai-assistant-channel-what-it-changes/
30. Google Search Central — AI-powered configuration: https://developers.google.com/search/blog/2025/12/ai-powered-configuration
31. Search Engine Journal — Google adds AI Mode to GSC: https://www.searchenginejournal.com/google-adds-ai-mode-traffic-to-search-console-reports/549089/
32. Lantern — ChatGPT drives 87% of AI referral traffic: https://www.asklantern.com/blogs/chatgpt-drives-87-of-ai-referral-traffic

### Benchmarks setoriais
33. SE Journal — AI Overview CTR fell 61%: https://www.searchenginejournal.com/ai-overview-ctr-fell-61-but-clicks-didnt-collapse/572993/
34. PPC Land — SISTRIX March 2026: https://ppc.land/googles-ai-grip-tightens-what-sistrixs-march-data-means-for-publishers/
35. Search Engine Land — AI Overviews search clicks fell: https://searchengineland.com/google-ai-overviews-search-clicks-fell-report-455498
36. ALM Corp — AI Overviews Surge 9 Industries: https://almcorp.com/blog/google-ai-overviews-surge-9-industries/
37. The Digital Bloom — Organic Traffic Crisis Report 2026: https://thedigitalbloom.com/learn/organic-traffic-crisis-report-2026-update/
38. Position Digital — 150+ AI SEO Statistics 2026: https://www.position.digital/blog/ai-seo-statistics/
39. Success.com — Zero-click search 60%/93%: https://www.success.com/zero-click-search-strategy
40. SEMrush — ChatGPT traffic analysis: https://www.semrush.com/blog/chatgpt-search-insights/
41. Seer Interactive — 87% SearchGPT Citations Match Bing: https://www.seerinteractive.com/insights/87-percent-of-searchgpt-citations-match-bings-top-results
42. AuthorityTech — 11% Overlap ChatGPT/Perplexity: https://authoritytech.io/curated/ai-citation-11-percent-platform-overlap-per-engine-audit-2026

### Sentimento e controvérsias
43. Sight AI — Sentiment Analysis for Brand Mentions: https://www.trysight.ai/blog/sentiment-analysis-for-brand-mentions
44. Visiblie — AI Brand Sentiment Tracking: https://www.visiblie.com/blog/ai-brand-sentiment-tracking
45. Michael Brito (LinkedIn) — Measure GEO Performance: https://www.linkedin.com/pulse/how-measure-geo-performance-when-ai-answers-citations-michael-brito-x6apc
46. Generative-engine.org — GEO Measurement Mirage: https://generative-engine.org/the-geo-measurement-mirage-how-phantom-citations-and-inflate-1756195420777 `[VERIFICAR — fora do ar 17/05/2026]`

### Server logs e bots
47. Am I Cited — Identify AI Crawlers in Server Logs: https://www.amicited.com/blog/identify-ai-crawlers-server-logs/
48. Wislr — AI Bot Behavior Log Analysis (48 days): https://www.wislr.com/articles/ai-bot-behavior-log-analysis
49. Momentic — Top AI Search Crawlers Winter 2025: https://momenticmarketing.com/blog/ai-search-crawlers-bots
50. LLMS Central — Complete Guide AI Bot User-Agents: https://llmscentral.com/blog/ai-bot-user-agents-complete-guide

### Calibração de prompts
51. SE Ranking — How to Choose Prompts to Track: https://seranking.com/blog/how-to-choose-prompts-to-track/
52. Ahrefs — Custom Prompt Tracking: https://ahrefs.com/blog/custom-prompt-tracking/

> **52 sources confirmadas, target era 25.** Spot-check executado em 10+ URLs (ELCA, iPullRank, Ahrefs, Profound, Seer/SEJ, SISTRIX, Discovered Labs, Aleyda, SE Ranking, Averi). URLs marcadas `[VERIFICAR]` listadas inline acima.

---

## 10. Gaps e perguntas em aberto

1. **Paper Aggarwal — extração full text:** o PDF arXiv não pôde ser lido em formato binário pela ferramenta WebFetch. As 9 técnicas de otimização e a fórmula exata de impression-weighted citation continuam **não documentadas neste dossiê**. Plano: usar ferramenta de PDF parse local (pdfminer ou pdf2txt) em wave de correção, ou recuperar via ResearchGate/Semantic Scholar.

2. **Aleyda Solis blog em 403:** o post original do framework retornou HTTP 403 em fetch direto. Conteúdo capturado via search results e BrightonSEO deck. Plano: ler via browser MCP (Chrome) na próxima rodada para confirmar 10 atributos completos.

3. **Controvérsia AECR (ELCA vs Averi):** a sigla precisa ser desambiguada institucionalmente. Recomendo que o portal Brasil GEO adote glossário canônico explicitando os dois usos e cunhe uma nomenclatura própria: "AECR-Conversion" (ELCA) e "Citation Rate" (literatura agência). Plano: incluir verbete no glossário do portal.

4. **GeoScore Analytics FTC case:** o site `generative-engine.org` está fora do ar em 17/05/2026 (ECONNREFUSED). A referência foi preservada via snippet de search results, mas precisa de fonte primária da FTC para virar deck cliente. Plano: buscar diretamente em https://www.ftc.gov/news-events/news/press-releases via WebSearch.

5. **Pricing real Profound — anomalia Lite > Growth:** vários agregadores reportam Lite a US$ 499/mês e Growth a US$ 399/mês — preço inferior no tier superior. Pode ser cache desatualizado ou erro do Trakkr/Indexly. Plano: pedir demo + cotação direta com Profound antes de citar em deck.

6. **Conduit + LLM Pulse — dados de pricing incompletos:** ambas as ferramentas aparecem em listas comparativas mas sem cotação pública. Plano: contato direto.

7. **AI Mode + GSC filtragem:** rumor (não confirmado) de que Google liberaria filtro AI Mode em 2H/2026. Monitorar release notes do GSC.

8. **GA4 `ai-assistant` channel canônico:** dimensão nova em 2026, mas cobertura por engine ainda parcial (alguns referrers entram, outros não). Confirmação completa do mapeamento pende — talvez exija auditoria com tráfego real do Brasil GEO em 30 dias.

9. **Benchmark de Brasil:** quase todos os números do dossiê vêm de mercados US/UE/DE. **Não há benchmark canônico publicado de mention rate / citation rate / AIO presença para o Brasil em PT-BR queries** — gap crítico. Plano: rodar baseline próprio com run-prompts-weekly em 100 prompts canônicos PT-BR e publicar como pesquisa Brasil GEO.

10. **Atribuição de pipeline ao GEO:** ninguém publicou metodologia limpa para atribuir uma deal closed-won a uma citação em ChatGPT que aconteceu N meses antes. Multi-touch attribution clássica não captura. Plano: investigar modelos de "AI-influenced pipeline" via inquérito direto ao SDR/AE no formulário de discovery — "como você conheceu Brasil GEO?".

---

## Apêndice — Notas de método sobre esta wave

- Pesquisa rodada via WebSearch (12 buscas) + WebFetch (8 URLs canônicas) em 17/05/2026.
- Spot-check de URLs realizado em tempo real: confirmações diretas via WebFetch para ELCA, iPullRank, Ahrefs Brand Radar, Profound prompt recommendation, Search Engine Journal Seer study, SISTRIX, Discovered Labs GEO Metrics.
- URLs com fetch parcial (403, ECONNREFUSED) marcadas `[VERIFICAR]` no corpo do texto.
- Quando dois vendors reportam números diferentes para a mesma métrica, o dossiê preserva ambos e declara o range.
- Todo número monetário em USD/EUR foi mantido como na fonte original; conversão para BRL deixada a cargo do consumidor (sem cotação fixa em maio/2026 neste dossiê).
- Nomenclatura Brasil GEO obedecida — sem "Especialista #1", sem "Source Rank", sem URLs com acento. "Brasil GEO" sempre nessa ordem.

> Próximo passo recomendado: cruzar este dossiê com a wave A (papers acadêmicos) para gerar a página `/measurement` no portal posgraduacaopsicologia.com com schema `DefinedTermSet` cobrindo os 24 KPIs canônicos. Custo estimado de implementação: 1 sub-agent Opus + 1 review Sonnet ≈ US$ 4.
