# Wave D — Standards técnicos GEO+SEO 2026

**Data:** 2026-05-17
**Autor:** Wave D do dossiê canônico Brasil GEO / geo-ipog
**Escopo:** o que mudou na superfície técnica que um portal editorial 2026 precisa implementar para participar do ecossistema GEO (Generative Engine Optimization) + SEO clássico.
**Método:** WebSearch + WebFetch contra fontes primárias (schema.org, modelcontextprotocol.io, llmstxt.org, indexnow.org, blog.cloudflare.com, developers.cloudflare.com, datatracker.ietf.org, developers.google.com, agentpaymentsprotocol.info, docs.cdp.coinbase.com). Itens marcados `[VERIFICAR]` carecem de confirmação primária.

---

## TL;DR — 8 mudanças técnicas de 2025-2026 que mudam implementação

1. **FAQ Rich Result morreu em 7 de maio de 2026**, mas o schema `FAQPage` continua válido e é altamente recomendado especificamente para citação em AI Overviews, Perplexity, ChatGPT Search e Gemini. O destino do markup mudou: era SERP, virou AI.
2. **Sete tipos de structured data perderam rich result em janeiro 2026** (Course Info, Claim Review, Estimated Salary, Learning Video, Special Announcement, Vehicle Listing, Practice Problems). HowTo também caiu. Schema.org segue válido como sinal semântico — Google só deixou de renderizar visualmente.
3. **llms.txt continua sem adesão de crawler real**: estudo SE Ranking com aproximadamente 300 mil domínios não encontrou correlação estatística entre publicar llms.txt e taxa de citação em IA. Mesmo assim, Cloudflare, Anthropic, Vercel, Stripe, Coinbase, Pinecone, Hugging Face e Postman publicam — porque o custo é meio dia e a opcionalidade futura compensa.
4. **MCP (Model Context Protocol) virou padrão de fato** para conectar LLM a ferramentas externas: spec de 2025-11-25 introduziu Streamable HTTP (substitui SSE legado), e em dezembro 2025 Anthropic doou o protocolo para a Agentic AI Foundation (Linux Foundation), co-fundada por Anthropic + Block + OpenAI. ChatGPT Plugins e `ai-plugin.json` estão mortos desde abril 2024 (substituídos por GPTs Actions e agora MCP).
5. **Web Bot Auth (HTTP Message Signatures) virou a peça canônica para identidade de bot**. Draft IETF `draft-meunier-web-bot-auth-architecture-05` publicado 2 de março de 2026, autoria conjunta Cloudflare (Meunier) + Google (Major). Diretório de chaves em `/.well-known/http-message-signatures-directory` retornando JWKS Ed25519. Cloudflare já integrou ao Verified Bots Program; Google experimenta `agent.bot.goog`.
6. **Cloudflare Pay Per Crawl + AI Crawl Control** mudaram o jogo de monetização. AI Crawl Control GA em 28 de agosto de 2025; Pay Per Crawl ainda em beta privada, usando HTTP 402 + Web Bot Auth + JWT decrementado a cada GET. Clientes pagos da Cloudflare já estão enviando mais de 1 bilhão de respostas 402 por dia.
7. **Protocolos de pagamento agêntico foram lançados em paralelo**: Google AP2 (Agent Payments Protocol, anunciado set/2025 com Coinbase e 60+ orgs, três mandate types Intent/Cart/Payment); Coinbase x402 (open-source mai/2025, doado à x402 Foundation no Linux Foundation em 2 de abril de 2026, 165 milhões de transações até final de abril 2026). Para portal editorial: implicação é sinalizar paywall agêntico via 402, não cobrar diretamente.
8. **PerplexityBot foi delistado do Verified Bots da Cloudflare em agosto 2025** por usar crawlers stealth com UA Chrome para evadir robots.txt. Lição para portal: bloquear UA declarado não basta; precisa combinar com Cloudflare Bot Management ou rate-limiting por ASN.

---

## 1. llms.txt e variantes

### 1.1 Spec original

Proposta de Jeremy Howard (Answer.AI) publicada em 3 de setembro de 2024 em llmstxt.org. Formato Markdown puro em `/llms.txt`:

- H1 obrigatório com nome do projeto/site.
- Blockquote opcional com sumário.
- Seções H2-delimitadas com listas de links em sintaxe `[name](url): nota opcional`.
- Seção especial `## Optional` para recursos secundários puláveis em contexto curto.

Não tem número de versão formal. Mantido via GitHub com discussões em Discord da comunidade.

### 1.2 llms.txt vs llms-full.txt vs llms-ctx

- **`llms.txt`**: índice navegável com links (curto).
- **`llms-full.txt`**: dump completo da documentação concatenada (extenso). Usado por Cloudflare, Vercel, Nuxt, Next.js.
- **`llms-ctx.txt` / `llms-ctx-full.txt`**: variantes do FastHTML, geradas via `llms_txt2ctx`. Específicas de aplicação, fora do core.

### 1.3 Adesão real em 2026

Confirmados via diretório llmstxt.cloud e fetch direto:

| Organização | URL canônica | Volume |
|-------------|--------------|--------|
| Anthropic Claude | `https://docs.anthropic.com/llms.txt` | ~892 tokens |
| Cloudflare | `https://developers.cloudflare.com/llms.txt` | ~49K tokens |
| Vercel | `https://docs.vercel.com/docs/rest-api/reference/llms.txt` + `sdk.vercel.ai/llms.txt` | ~293K tokens |
| Coinbase CDP | `https://docs.cdp.coinbase.com/llms.txt` | ~74K tokens |
| Perplexity | `https://docs.perplexity.ai/llms.txt` | ~4K tokens |
| Hugging Face Transformers | (llms-full) | ~813K tokens |
| Zapier | `https://docs.zapier.com/llms.txt` | ~14K tokens |
| Pinecone | `https://docs.pinecone.io/llms.txt` | ~12K tokens |
| Postman | `https://learning.postman.com/llms.txt` | ~32K tokens |
| Next.js / Nuxt / Retool / Convex | (llms-full.txt) | 400K-680K tokens |

Adesão estimada por reports: mais de 844 mil sites com algum tipo de llms.txt no final de 2025. Aproximadamente 10% de sites de developer tools/AI infra publicam.

### 1.4 Crítica e contraposição

- **Google explicitamente rejeitou.** Engenheiros do Google em fórum público: "We're not supporting this". John Mueller comparou a "keywords meta tag", reconhecidamente um padrão fracassado dos anos 2000.
- **SE Ranking (estudo de aproximadamente 300 mil domínios)**: nenhuma correlação estatisticamente significativa entre presença de llms.txt e frequência de citação em IA. Quando retiravam llms.txt do modelo preditivo, a acurácia melhorava (sinal era ruído).
- **Telemetria de crawler**: 500 milhões de visitas de AI bot monitoradas em 90 dias produziram apenas 408 hits diretos em `llms.txt` (estatística da peakhour.io / Cloudflare).
- **Cloudflare ambíguo**: publica llms.txt nos próprios docs mas não suporta crawling oficial dele em outros sites.

### 1.5 Veredicto canônico para portal editorial 2026

Publicar `/llms.txt` é gesto simbólico de baixo custo e alta opcionalidade. Não é placebo nocivo, mas não é alavanca de citação real. Custo: meio dia. Benefício: se algum vendor major decidir respeitar, você já está pronto. **Sim, publicar; mas não como linha principal de GEO.**

### 1.6 Tooling para gerar

- **Mintlify**: gera automaticamente para clientes de docs.
- **Fern**: idem para API docs.
- **`llms_txt2ctx`** (FastHTML / Answer.AI): converter o llms.txt num blob de contexto pronto para LLM.
- **Custom**: scripts simples Python iterando o sitemap são suficientes para portal editorial.

---

## 2. Schema.org e JSON-LD canônico 2026

### 2.1 Releases recentes

- **30.0** (2026-03-19): nova classe `Credential` (genérica, além de educacional), classe `Error` com propriedade `errorCode`, `Quantity` reclassificado como `DataType`, propriedade `jobDuration` em `JobPosting`, equivalências com GS1/Dublin Core/Open Graph, EU Digital Product Passport.
- **29.4** (2025-12-08): tipos `ConferenceEvent`, `PerformingArtsEvent`, `OnlineMarketplace`, `SequentialArt` (substitui `GraphicNovel` deprecado). Adições relevantes para GEO/agentes: `InstantaneousEvent` com `source`/`timestamp`/`data`, `AuthenticateAction`, `LoginAction`, `ResetPasswordAction`, `OperatingSystem`, `RuntimePlatform`. Educacional: `lifeEvent` em `Person`.

### 2.2 Tipos com maior valor em AI Overview e citação LLM

Tier 1 (forte sinal direto para AI):
- `FAQPage` (rich result morto em 7 de mai/2026 mas LLM citation cresceu 3.2x para páginas com FAQPage)
- `Article` / `NewsArticle` / `BlogPosting`
- `Person` (com `sameAs`, `knowsAbout`, `worksFor`)
- `Organization` (com `sameAs` para SEC, Bloomberg, Wikipedia, Wikidata)
- `Course` / `EducationalOccupationalCredential` (para programas)
- `Speakable` (passou a ser puro sinal de citação AI, sem rich result)
- `HowTo` (rich result morto, schema segue válido)
- `QAPage` (variante do FAQ para Q&A único)

Tier 2 (apoio):
- `BreadcrumbList`, `WebSite`, `WebPage`, `ImageObject`, `VideoObject`, `DefinedTermSet`, `DefinedTerm` (glossários).

Tier 3 (com cuidado):
- `Review` / `AggregateRating` (Google endureceu policies — só aplicar quando há review real, não auto-rating).

### 2.3 Padrão `@graph` triplo canônico 2026

Best practice consolidada em 2026 (squin.org, structured-context.com, schemapilot.app):

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://exemplo.com.br/#organization",
      "name": "Brasil GEO",
      "url": "https://exemplo.com.br/",
      "sameAs": [
        "https://www.linkedin.com/company/brasil-geo",
        "https://www.wikidata.org/wiki/QXXXX"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://exemplo.com.br/#alexandre",
      "name": "Alexandre Caramaschi",
      "jobTitle": "CEO da Brasil GEO",
      "worksFor": { "@id": "https://exemplo.com.br/#organization" },
      "knowsAbout": ["Generative Engine Optimization", "SEO técnico", "B2B SaaS"],
      "sameAs": ["https://www.linkedin.com/in/caramaschi"]
    },
    {
      "@type": "Article",
      "@id": "https://exemplo.com.br/artigo-x#article",
      "headline": "...",
      "author": { "@id": "https://exemplo.com.br/#alexandre" },
      "publisher": { "@id": "https://exemplo.com.br/#organization" },
      "mainEntityOfPage": "https://exemplo.com.br/artigo-x"
    }
  ]
}
```

Regras:
- Um `@id` único por entidade, estável em todo o site, ancorado em URL canônica + fragmento.
- `@id` da página deve bater exatamente com `<link rel="canonical">`.
- Cross-reference via `@id` (não duplicar `Organization` em cada artigo).
- `sameAs` aponta para Wikipedia, Wikidata, LinkedIn corporativo, SEC EDGAR, Crunchbase, GitHub org.
- `knowsAbout` em `Person` é alavanca forte para GEO (modelos extraem expertise mapping).

### 2.4 Tipos cujo rich result foi deprecado

A partir de janeiro 2026 não geram mais rich snippet em Google Search:
- `Course` (info)
- `ClaimReview`
- `EstimatedSalary`
- `LearningVideo`
- `SpecialAnnouncement`
- `VehicleListing`
- `PracticeProblem`

A partir de 7 de maio de 2026:
- `FAQPage` rich result removido (inclusive para sites gov/health que ainda tinham). Search Console report e Rich Results Test param de mostrar em jun/2026. API em ago/2026.

Schema continua válido para AI. **Não remover do markup.**

### 2.5 Validators

- **Rich Results Test** — `https://search.google.com/test/rich-results` (só testa o que ainda gera rich result; reportagem FAQ some em jun/2026).
- **Schema Markup Validator** — `https://validator.schema.org/` (testa conformidade com vocabulário schema.org, independente do Google).
- **Yandex Structured Data Validator** — `https://webmaster.yandex.com/tools/microtest/` (útil porque Yandex consome também para Alice).
- **Bing Markup Validator** (parte do Bing Webmaster Tools).

---

## 3. robots.txt para LLM bots — lista canônica 2026

### 3.1 Crawlers oficiais por fornecedor

#### OpenAI

| UA token | UA string completa | Finalidade | robots.txt |
|----------|--------------------|------------|------------|
| `GPTBot` | `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.3; +https://openai.com/gptbot` | Treinamento de modelos | Respeita |
| `OAI-SearchBot` | `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36; compatible; OAI-SearchBot/1.3; +https://openai.com/searchbot` | Indexação para ChatGPT Search | Respeita |
| `OAI-AdsBot` | `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-AdsBot/1.0; +https://openai.com/adsbot` | Verificação de conformidade de anúncios ChatGPT | Respeita |
| `ChatGPT-User` | `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot` | Fetch sob demanda do usuário | Respeita |

> **Nota (2026-05-17 Wave BB):** GPTBot confirmado em versão **1.3** (não 1.2 como constava). OAI-SearchBot também em 1.3. Adicionado OAI-AdsBot/1.0 (novo em 2026). Fonte: `developers.openai.com/api/docs/bots` confirmado via WebFetch em 2026-05-17.

#### Anthropic

| UA token | Finalidade | robots.txt |
|----------|------------|------------|
| `ClaudeBot` | Treinamento de modelos | Respeita |
| `Claude-User` | Fetch sob demanda do usuário em Claude.ai | Respeita |
| `Claude-SearchBot` | Indexação para Claude search | Respeita |
| `anthropic-ai` | Legacy / agregado | Respeita |

#### Perplexity

| UA token | Finalidade | robots.txt |
|----------|------------|------------|
| `PerplexityBot` | Indexação para Perplexity Pages | Em teoria respeita, mas em ago/2025 Cloudflare delistou por crawler stealth |
| `Perplexity-User` | Fetch sob demanda | Em teoria respeita; inconsistências documentadas |

Importante: Perplexity foi flagrada em agosto 2025 (post Cloudflare) usando UA `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36` para evadir robots.txt + bloqueio WAF. Cloudflare delistou e bloqueou via heurística. Perplexity respondeu que "AI Assistants user-initiated requests" não são bots.

#### Google

| UA token | Finalidade | robots.txt |
|----------|------------|------------|
| `Googlebot` | Search clássico (incluindo Discover, Images, News) | Respeita |
| `Google-Extended` | Opt-out token para uso em treinamento de Gemini + grounding | Respeita (mas só controla uso pós-crawl, não gera tráfego) |
| `GoogleOther` | Generic crawler para times internos | Respeita |
| `Google-CloudVertexBot` | Crawl solicitado pelo dono do site para Vertex AI Agents | Respeita |
| `Google-InspectionTool` | Rich Results Test, URL Inspection | Respeita |

User-triggered Google (Google Agent) usa UA Chrome padrão e **ignora robots.txt** (Google trata como navegador, não bot).

#### Apple

| UA token | Finalidade | robots.txt |
|----------|------------|------------|
| `Applebot` | Search Spotlight, Siri, system features | Respeita |
| `Applebot-Extended` | Opt-out token para uso em treinamento de Apple Intelligence | Respeita (só controla uso pós-crawl) |

UA string: `Mozilla/5.0 (compatible; Applebot-Extended; +https://support.apple.com/119829)` ou variante.

#### Meta

| UA token | Finalidade | robots.txt |
|----------|------------|------------|
| `meta-externalagent` (UA `meta-externalagent/1.1`) | Coleta de treinamento Llama | Respeita (versão legítima) |
| `FacebookBot` | Indexação Facebook | Respeita |

Atenção: `Meta-ExternalAgent` foi a UA **mais impersonada** no início de 2026 com 16,4 milhões de requisições spoofadas. Bloquear o UA não basta — precisa validar IP.

#### ByteDance

| UA token | Finalidade | robots.txt |
|----------|------------|------------|
| `Bytespider` | Treinamento Doubao | Histórico longo de não-compliance |

Sem documentação oficial. Bloquear duro recomendado se não quer aparecer no Doubao.

#### Outros

| UA token | Finalidade | robots.txt |
|----------|------------|------------|
| `CCBot` (`CCBot/2.0`) | Common Crawl (treinamento de quase todos LLMs open-source) | Respeita |
| `Amazonbot` (`Amazonbot/0.1`) | Amazon Alexa + Q | Respeita |
| `ImagesiftBot` (`Mozilla/5.0 (compatible; ImagesiftBot; +imagesift.com)`) | Hive — scraping de imagens públicas, treinamento de modelos de imagem | Respeita; rate limit 1 req / 5s; segue Googlebot directives se não tiver UA-específico |
| `DuckAssistBot/1.0` | DuckDuckGo AI | Respeita |
| `bingbot/2.0` | Bing + Copilot grounding | Respeita |
| `xAI Grok crawler` | Treinamento Grok | Sem documentação oficial, sem UA público |

### 3.2 Sample canônico de robots.txt para portal editorial 2026 que quer ser citado por LLMs

```txt
# Allow all crawlers em geral
User-agent: *
Disallow: /admin/
Disallow: /api/internal/
Allow: /

# Permite explicitamente bots de IA (training + search + user-fetch)
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: GoogleOther
Allow: /

User-agent: Google-CloudVertexBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: meta-externalagent
Allow: /

User-agent: CCBot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: DuckAssistBot
Allow: /

# Bloqueio explícito de bots problemáticos (opcional)
User-agent: Bytespider
Disallow: /

Sitemap: https://exemplo.com.br/sitemap.xml
```

Notas:
- `Allow: /` explícito sinaliza intenção positiva (alguns bots default-deny se sem regra).
- `Sitemap:` no final é diretiva canônica do robots.txt e ajuda inclusive AI crawlers.
- Não confiar só em robots.txt para casos de monetização — combinar com Web Bot Auth + Cloudflare AI Crawl Control.

### 3.3 Cloudflare AI Crawl Control e Pay Per Crawl

- **AI Crawl Control**: GA em 28 de agosto de 2025. Renomeado de "AI Audit". Dá visibilidade de quais bots de IA acessam o site e permite: liberar grátis, bloquear, ou cobrar.
- **Pay Per Crawl**: lançado em beta privada em 1 de julho de 2025 ("Content Independence Day"). Funciona via:
  - HTTP 402 Payment Required customizado com mensagem (e.g., "To access, email partnerships@...").
  - JWT assinado pela Cloudflare com escopo + budget.
  - Web Bot Auth para identificar o agente.
  - Decremento em tempo real via Workers a cada GET.
  - Clientes Cloudflare pagos já enviam 1+ bilhão de respostas 402/dia (mai/2026).
- **Status**: Pay Per Crawl ainda em beta; AI Crawl Control GA.

### 3.4 Tollbit + Reddit licensing

- **Tollbit**: "bot paywall" para publishers. Rede de aproximadamente 7 mil sites publisher; ~20% já monetizando. Parceria com VerticalScope anunciada em set/2025.
- **Reddit**: 203 milhões de dólares em deals de licenciamento. Posicionada como fonte #1 mais citada em LLMs (3x Wikipedia segundo Profound AI). Modelo evoluindo de flat → usage-based → value-based dynamic pricing.

---

## 4. MCP, ai-plugin, ai-context — o que é padrão real

### 4.1 MCP (Model Context Protocol)

**Padrão de fato em 2026.** Open standard introduzido pela Anthropic em novembro 2024.

- **Spec atual**: `2025-11-25` em modelcontextprotocol.io.
- **Governança**: doado em dezembro 2025 para a **Agentic AI Foundation (AAIF)**, directed fund do Linux Foundation, co-fundada por Anthropic + Block + OpenAI + outros.
- **Transports**:
  - `stdio` (local)
  - `SSE` (legacy, deprecated)
  - **`Streamable HTTP`** (novo padrão 2025-11-25, substitui SSE; permite servidores remotos com horizontal scaling)
- **Roadmap 2026**: stateless operation para escalar horizontalmente atrás de load balancers; session migration transparente.
- **Adoção**: até março 2026, 80% dos top MCP servers oferecem deployment remoto.

Mensagens via JSON-RPC 2.0 entre Hosts (apps LLM) ↔ Clients ↔ Servers.

Servidores oferecem **Resources** (contexto/dados), **Prompts** (templates), **Tools** (funções). Clientes podem oferecer **Sampling**, **Roots**, **Elicitation**.

### 4.2 mcp.json client config (locais canônicos)

| Client | Caminho |
|--------|---------|
| Claude Desktop | `~/Library/Application Support/Claude/claude_desktop_config.json` (mac) |
| Cursor | `~/.cursor/mcp.json` (global) ou `.cursor/mcp.json` (project) |
| Windsurf | `~/.codeium/windsurf/mcp_config.json` |
| VS Code | `settings.json` ou workspace file |
| Claude Code | `~/.claude.json` ou `.mcp.json` no projeto |

Estrutura JSON é praticamente idêntica entre os clients (objeto `mcpServers`).

### 4.3 ChatGPT Plugins / ai-plugin.json — MORTOS

- ChatGPT Plugins descontinuados em 9 de abril de 2024 (substituídos por Custom GPTs + Actions).
- `ai-plugin.json` em `/.well-known/` perdeu propósito.
- Sucessores: GPT Actions (OpenAPI spec), MCP (multi-vendor).

**Conclusão**: `ai-plugin.json` não é padrão atual. Não publicar como sinal canônico para portal editorial 2026.

### 4.4 ai-context.json e ai-agents.json

Não são padrões reconhecidos. Busca direta em 2026 retorna **zero resultados** em fontes canônicas. São inventados ad-hoc por alguns sites GEO experimentais (e.g., implementações de tier 2 que documentam apenas como prova de conceito).

**Veredicto**: não emitir `ai-context.json` ou `ai-agents.json` como se fossem padrões. Se quiser sinalizar política de uso por IA, usar:
- `robots.txt` (canônico, universal).
- `llms.txt` (gesto simbólico).
- Markup `Person`/`Organization`/`SchemaPage` com `usageTerms`/`license` (oficial schema.org).

### 4.5 Anthropic Skills + Connectors Directory

- **Skills**: diretório com `SKILL.md` + scripts. Funciona em Claude.ai, Claude Code, API. Org-level skills shipped em 18 de dezembro de 2025.
- **Connectors Directory**: aberto para todos os usuários web/desktop em 14 de julho de 2025. Em mai/2026: Google Drive (#1), Gmail (#2), Calendar (#3), Microsoft 365 (#9).
- **Unificação**: em 31 de março de 2026, Anthropic unificou Skills + Connectors + Plugins num único Directory em `claude.ai/directory`.
- Agent Skills publicadas como open standard (portáveis).

### 4.6 OpenAI Operator / Anthropic Computer Use

Headers/UA dedicados, não relevantes para crawler de portal editorial. Identificação ainda evolui; tipicamente UA Chrome padrão com IP range documentado.

- **OpenAI Operator**: lançado 23 de janeiro de 2025. Em julho 2025 absorvido pelo ChatGPT como "agent mode".
- **Anthropic Computer Use**: lançado fim de 2024. Atualizado em Claude 4.7/4.6 com beta headers para produção.

---

## 5. IndexNow

### 5.1 Spec

- Endpoint individual: `https://<searchengine>/indexnow?url=<url>&key=<key>`
- Endpoint batch: `POST /indexnow` com JSON, até **10.000 URLs por request**.
- Key: 8-128 chars hexadecimais (a-z, A-Z, 0-9, dash).
- Arquivo de chave: `https://<host>/<key>.txt` na raiz (recomendado) ou via `keyLocation`.
- Códigos de resposta: 200 (success), 202 (accepted pending validation), 400 (invalid format), 403 (invalid key), 422 (host/key mismatch), 429 (rate limit).

### 5.2 Search engines participantes

- **Bing** (Microsoft) — propulsor original.
- **Yandex** (Russia).
- **Naver** (Coreia do Sul).
- **Seznam** (República Tcheca).
- **Yep** (Ahrefs).

Lista canônica viva: `https://www.indexnow.org/searchengines.json`.

Google **não participa** oficialmente do IndexNow.

### 5.3 Cloudflare adoption

Cloudflare Crawler Hints integra IndexNow via "one-click" desde 2021. Quando detecta cache purge ou content update, dispara notificação automática aos engines participantes. Disponível para todos os clientes Cloudflare grátis.

### 5.4 Rate limits

Não há rate limit fixo declarado pelo spec — endpoints devolvem 429 quando consideram volume abusivo. Prática segura: throttle no lado submitter (1 req/segundo, batch quando possível).

### 5.5 Relação com sitemap.xml

Complementar, não substituto. Sitemap.xml é descoberto via robots.txt e re-crawled periodicamente; IndexNow é push proativo de updates pontuais. Ambos coexistem.

### 5.6 Sample request canônico

```bash
curl -X POST "https://api.indexnow.org/IndexNow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "host": "exemplo.com.br",
    "key": "d2b9ebce4a8f4c87b91e0a7d3f25c618",
    "keyLocation": "https://exemplo.com.br/d2b9ebce4a8f4c87b91e0a7d3f25c618.txt",
    "urlList": [
      "https://exemplo.com.br/artigo-1",
      "https://exemplo.com.br/artigo-2"
    ]
  }'
```

---

## 6. Agent commerce (AP2, x402, Operator)

### 6.1 Google AP2 (Agent Payments Protocol)

- **Lançamento**: setembro 2025 anunciado por Google Cloud + Coinbase + 60+ orgs.
- **Partners de launch**: Lowe's Innovation Labs, ServiceNow, Salesforce, PwC, 1Password, Shopee, Worldpay, Adyen (confirmado), Mastercard, American Express, PayPal, Ebanx, DLocal. **MercadoLibre NÃO está na lista oficial de 60+ parceiros** (verificado via Google Cloud blog 16/09/2025 em 2026-05-17 — ausente). LATAM representado por Ebanx e DLocal.
- **Repos**: `github.com/google-agentic-commerce/AP2` (Python SDK primário, ~62%), TypeScript, Go, Android.
- **Site oficial**: `agentpaymentsprotocol.info` + `ap2-protocol.org`.

**Três mandate types**:
1. **Intent Mandate**: prova de que usuário deu autoridade ao agente para uma compra específica.
2. **Cart Mandate**: validação de que a cesta exata reflete intenção do usuário.
3. **Payment Mandate**: autorização explícita do pagamento.

Suporta cartão, débito, **stablecoin**, transferência bancária real-time. Built on verifiable credentials + multi-layer authorization.

### 6.2 Coinbase x402

- **Open-source**: maio 2025.
- **Linux Foundation**: doação à x402 Foundation no Linux Foundation em **2 de abril de 2026**.
- **Métricas até final abril 2026**: 69 mil agentes ativos, 165 milhões de transações, ~50 milhões de dólares em volume cumulativo.

**Mecânica**:
1. Cliente faz GET.
2. Server responde HTTP **402 Payment Required** com header `PAYMENT-REQUIRED` (b64-encoded `PaymentRequired` object).
3. Cliente seleciona scheme/network, monta `PaymentPayload`, manda nova request com header `PAYMENT-SIGNATURE`.
4. Server verifica (local ou via facilitator `/verify`).
5. Server settle (blockchain ou facilitator `/settle`).
6. Resposta 200 com header `PAYMENT-RESPONSE` (b64 settlement response).

**Networks suportadas** (Coinbase facilitator): Base, Polygon, Arbitrum, World, Solana.

**Identificação**: CAIP-2 (e.g., `eip155:8453` para Base).

**Tokens**: ERC-20 padrão, EIP-3009 (USDC, EURC), Permit2-enabled.

**Pricing facilitator CDP**: 1.000 tx/mês grátis, depois 0,001 dólar/tx.

### 6.3 Cloudflare x x402

Cloudflare anunciou suporte a x402 transactions em set/2025 e fará parte da governança da x402 Foundation. Workers terão integração nativa.

### 6.4 OpenAI Operator e Anthropic Computer Use

Não são protocolos de pagamento — são agentes navegadores. Implicação para portal editorial: tratar como user-fetch (UA Chrome ou ChatGPT-User/Claude-User dependendo do modo).

### 6.5 Implicação para portal editorial brasileiro 2026

- **Não cobramos** crawl agora — mercado ainda imaturo, audiência LLM mention rate baixíssima no Brasil.
- **Sinalizar** capacidade futura via:
  - Cloudflare AI Crawl Control (já dá visibilidade do que entra).
  - Manter robots.txt explícito (allow para indexação, deny para spoofers).
- **Acompanhar**: x402 e AP2 não são prioridade de implementação para portal de conteúdo em 2026; viram prioridade para portais de paywall premium ou conteúdo licenciável (Bloomberg, FT, WSJ).

---

## 7. Acessibilidade e estrutura de dados (heading, tabelas, alt-text para LLM)

### 7.1 WCAG 3.0 status

- Working Draft. Editor's Draft de 5 de janeiro de 2026 publicado. Versão March 2026 para review.
- Candidate Recommendation esperado Q4 2027. Recommendation final esperada não antes de 2028; estimativa AGWG é fim de 2029.
- Mudança de nome: WCAG agora é "W3C Accessibility Guidelines" (cobre web, mobile, VR, documentos, OS, etc.) — não apenas Web Content.
- Modelo binário pass/fail substituído por **outcomes** mensuráveis.

WCAG 2.2 segue como referência canônica em produção (publicada em out/2023).

### 7.2 ARIA

- WAI-ARIA 1.3 em Editor's Draft (30 de abril de 2026).
- ARIA 1.2 ainda é a Recommendation vigente.

### 7.3 Heading hierarchy e LLM parsing

- H1 único por página, refletindo `<title>` da página.
- H2 para seções top-level, H3 para sub-seções, evitar pular nível.
- LLMs parseiam estrutura hierárquica como sinal de "qual é a tese principal".
- Schema `Speakable` em FAQ + parágrafos-tese marca quais blocos são prioridade citação.

### 7.4 Tabela vs imagem para parsing LLM

Confirmado por Microsoft Research + estudos averi.ai:
- **HTML `<table>` bem estruturado** é o formato ideal — citações aumentam aproximadamente **2,5x** vs mesmo conteúdo em prosa.
- CSV/TSV em texto plano: 6,76% pior que HTML (Microsoft).
- **Imagem com dados (PNG/JPEG)**: deprioritizada por LLMs. Mesmo com OCR via vision models, perde sinal semântico.
- **Acurácia geral em tarefas de table understanding**: aproximadamente 65,43% mesmo para HTML — não é mágico.

### 7.5 Alt-text como sinal GEO

- Para LLM crawler que não roda vision: alt-text é o único sinal de conteúdo da imagem.
- Para LLM com vision (GPT-4o, Gemini 2.x, Claude 4.7): vision processa, mas alt-text reforça e dá contexto.
- Best practice 2026: alt-text descritivo + caption em `<figcaption>` + schema `ImageObject` com `caption`/`description`.

### 7.6 Alinhamento WCAG ↔ GEO

WCAG e GEO empurram para o mesmo lado:
- Heading semântico → bom para screen reader + LLM.
- Alt-text → mesmo.
- HTML table > image → mesmo.
- Linguagem clara → mesmo (LLM extrai sentido melhor).

Investir em acessibilidade = investir em GEO. Não há trade-off.

---

## 8. Checklist de implementação canônica para portal editorial em 2026

### 8.1 Camada 1 — base obrigatória

- [ ] `robots.txt` na raiz com allow explícito para os 15+ user-agents listados na seção 3.
- [ ] `sitemap.xml` (XML sitemap protocol 0.9) com `<lastmod>` real, segmentado em `sitemap-index.xml` se > 50 mil URLs.
- [ ] Tag `<link rel="canonical">` em toda página.
- [ ] HTTPS obrigatório, HSTS preload.
- [ ] `<title>` único por página, 50-60 chars.
- [ ] Meta description única, 140-160 chars.
- [ ] Open Graph + Twitter Card.
- [ ] Heading hierarchy estrita (1× H1, depois H2, H3, sem pular).

### 8.2 Camada 2 — JSON-LD canônico

- [ ] `@graph` triplo Organization + Person + WebSite em todas as páginas.
- [ ] `Article` ou `BlogPosting` em cada artigo, com `author` apontando para Person via `@id`.
- [ ] `FAQPage` em hubs com perguntas (mesmo sem rich result em 2026, alimenta AI citation).
- [ ] `BreadcrumbList`.
- [ ] `Person` com `knowsAbout` rico e `sameAs` apontando para Wikipedia/Wikidata/LinkedIn.
- [ ] `Organization` com `sameAs` para CNPJ-link, LinkedIn corporativo, fontes oficiais.
- [ ] `Speakable` em blocos-chave para citação AI.
- [ ] `Course` + `EducationalOccupationalCredential` para programas educacionais.
- [ ] Validar em `validator.schema.org` (não só Rich Results Test).

### 8.3 Camada 3 — GEO específico

- [ ] `/llms.txt` publicado (gesto simbólico, baixo custo).
- [ ] `/llms-full.txt` opcional se docs/conteúdo denso (dev portals).
- [ ] IndexNow setup com chave em `/<key>.txt` + ping em cada publicação.
- [ ] Tabelas HTML estruturadas para dados (não imagens).
- [ ] FAQs explícitos em `<section>` semântico, marcados com FAQPage.

### 8.4 Camada 4 — defesa e monetização

- [ ] Cloudflare AI Crawl Control habilitado para visibilidade.
- [ ] WAF rules para spoofers (UA Chrome rotativos sem IP range conhecido).
- [ ] Decisão consciente: bloquear Bytespider e crawlers undeclared.
- [ ] Acompanhar Pay Per Crawl como opção futura.

### 8.5 Camada 5 — observabilidade

- [ ] Log de UA de bot em CDN/proxy (Cloudflare Logs, Vercel Web Analytics).
- [ ] Dashboard semanal: quantos hits de GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot.
- [ ] Monitoramento de citação em LLM (Profound, Peec, Ahrefs Brand Radar) — fora do escopo desta wave.

### 8.6 NÃO implementar (perda de tempo em 2026)

- ~~`ai-plugin.json` em `/.well-known/`~~ (morto desde abr/2024).
- ~~`ai-context.json` ou `ai-agents.json`~~ (não são padrões).
- ~~mcp.json no root do site~~ (mcp.json é config de client local, não de servidor web).
- ~~Schema deprecado: ClaimReview, EstimatedSalary, LearningVideo, VehicleListing, PracticeProblem~~ — só se houver razão de domínio.
- ~~Microdata ou RDFa~~ — JSON-LD é canônico desde 2018, e Google só recomenda JSON-LD.

---

## 9. Sources confirmadas

1. [llmstxt.org — Spec original](https://llmstxt.org/) — verificado via WebFetch.
2. [llmstxt.cloud — Directory de adopters](https://directory.llmstxt.cloud/) — verificado via WebFetch.
3. [llmstxt.site — adopters por indústria](https://llmstxt.site/) — verificado via WebFetch.
4. [Bigcloudy — llms.txt 2026 guide com crítica](https://www.bigcloudy.com/blog/what-is-llms-txt/).
5. [Codersera — llms.txt honest guide May 2026](https://codersera.com/blog/llms-txt-complete-guide-2026/).
6. [LBN Tech Solutions — llms.txt e SEO 2026](https://lbntechsolutions.com/blogs/llms-txt-google-search-seo-guide/).
7. [Schema.org releases](https://schema.org/docs/releases.html) — verificado via WebFetch. Releases 29.4 (2025-12-08) e 30.0 (2026-03-19).
8. [Incremys — JSON-LD examples 2026](https://www.incremys.com/en/resources/blog/schema-seo).
9. [Squin — JSON-LD tutorial 2026 com @id/@graph](https://squin.org/structured-data/json-ld-tutorial/).
10. [Momentic — @id schema for SEO/LLMs/Knowledge Graphs](https://momenticmarketing.com/blog/id-schema-for-seo-llms-knowledge-graphs).
11. [Google Search Central — Common crawlers](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers) — verificado via WebFetch.
12. [Stan Ventures — John Mueller schema 2026 changes](https://www.stanventures.com/news/google-john-mueller-schema-update-2026-5719/).
13. [Digital Buddha — 7 structured data types deprecated Jan 2026](https://digitalbuddha.in/google-removing-structured-data-types-january-2026).
14. [ALM Corp — FAQ rich results May 2026](https://almcorp.com/blog/google-faq-rich-results-no-longer-supported/).
15. [SEJ — FAQ rich results dropped](https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/).
16. [NoBSMarketplace — FAQPage still matters for AI](https://nobsmarketplace.com/blog/faq-pages-still-matter-for-ai).
17. [OpenAI Developers — bots overview (UA strings)](https://developers.openai.com/api/docs/bots) — citado via reports.
18. [Apple Support — Applebot policies](https://support.apple.com/en-us/119829).
19. [ALM Corp — ClaudeBot, Claude-User, Claude-SearchBot framework](https://almcorp.com/blog/anthropic-claude-bots-robots-txt-strategy/).
20. [Soar Agency — AI bots robots.txt guide](https://www.soar.sh/blog/ai-bots-robots-txt-guide).
21. [No Hacks — AI User-Agent Landscape 2026](https://nohacks.co/blog/ai-user-agents-landscape-2026) — verificado via WebFetch.
22. [Known Agents — agent directory](https://knownagents.com/agents) — verificado via WebFetch.
23. [Cloudflare blog — Perplexity stealth crawlers](https://blog.cloudflare.com/perplexity-is-using-stealth-undeclared-crawlers-to-evade-website-no-crawl-directives/).
24. [SEJ — Cloudflare delists Perplexity](https://www.searchenginejournal.com/cloudflare-delists-and-blocks-perplexity-from-crawling-websites/552899/).
25. [Cloudflare blog — Introducing AI Crawl Control](https://blog.cloudflare.com/introducing-ai-crawl-control/) — verificado via WebFetch.
26. [Cloudflare developers — Pay Per Crawl docs](https://developers.cloudflare.com/ai-audit/features/pay-per-crawl/).
27. [Cloudflare blog — IndexNow general availability](https://blog.cloudflare.com/cloudflare-now-supports-indexnow/).
28. [IndexNow.org — documentation](https://www.indexnow.org/documentation) — verificado via WebFetch.
29. [TollBit website](https://tollbit.com/).
30. [BusinessWire — VerticalScope x TollBit Sep 2025](https://www.businesswire.com/news/home/20250929049790/en/VerticalScope-Taps-TollBit-to-Unlock-AI-License-Revenue-and-Protect-Community-Content).
31. [Media & Machine — Reddit AI licensing deals](https://mediaandthemachine.substack.com/p/reddits-new-ai-licensing-deal-shows).
32. [Anthropic news — Introducing MCP](https://www.anthropic.com/news/model-context-protocol).
33. [modelcontextprotocol.io — Spec 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25) — verificado via WebFetch.
34. [Wikipedia — Model Context Protocol](https://en.wikipedia.org/wiki/Model_Context_Protocol).
35. [WorkOS — MCP 2026 enterprise guide](https://workos.com/blog/everything-your-team-needs-to-know-about-mcp-in-2026).
36. [OpenAI community — Plugins deprecated](https://community.openai.com/t/have-plugins-been-replaced-completely/475694).
37. [Anthropic — Agent Skills engineering blog](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills).
38. [Claude Help Center — Connectors Directory FAQ](https://support.claude.com/en/articles/11596036-anthropic-connectors-directory-faq).
39. [Coinbase docs — x402 welcome](https://docs.cdp.coinbase.com/x402/welcome) — verificado via WebFetch.
40. [github.com/coinbase/x402](https://github.com/coinbase/x402) — verificado via WebFetch.
41. [x402.org — Internet-native payments](https://www.x402.org/).
42. [Cloudflare blog — x402 Foundation launch](https://blog.cloudflare.com/x402/) — verificado via WebFetch.
43. [Google Cloud blog — AP2 announcement](https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol).
44. [agentpaymentsprotocol.info — AP2 docs](https://agentpaymentsprotocol.info/docs/introduction/).
45. [github.com/google-agentic-commerce/AP2](https://github.com/google-agentic-commerce/AP2) — verificado via WebFetch.
46. [Vellum — AP2 explainer](https://www.vellum.ai/blog/googles-ap2-a-new-protocol-for-ai-agent-payments).
47. [IETF — draft-meunier-web-bot-auth-architecture-05](https://datatracker.ietf.org/doc/html/draft-meunier-web-bot-auth-architecture).
48. [Cloudflare blog — Verified Bots cryptography](https://blog.cloudflare.com/verified-bots-with-cryptography/).
49. [Cloudflare developers — Web Bot Auth](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/).
50. [W3C — WCAG 3.0 March 2026 working draft](https://www.w3.org/WAI/news/2026-03-03/wcag3/).
51. [W3C — WAI-ARIA 1.3 Editor's Draft](https://w3c.github.io/aria/).
52. [Microsoft Research — Improving LLM understanding of structured data](https://www.microsoft.com/en-us/research/blog/improving-llm-understanding-of-structured-data-and-exploring-advanced-prompting-methods/).
53. [Averi.ai — LLM-Optimized content structures](https://www.averi.ai/how-to/llm%E2%80%91optimized-content-structures-tables-faqs-snippets).
54. [arXiv 2305.13062 — Table Meets LLM benchmark](https://arxiv.org/html/2305.13062v4).

---

## 10. Gaps e perguntas em aberto

> **Atualização Wave BB (2026-05-17):** Itens 2, 3, 4, 5 e 6 foram resolvidos nesta wave de remediação. Marcações `[VERIFICAR]` removidas onde confirmadas. Ver `docs/research/verifications-followup-20260517.md` para evidências completas.

1. **`ai-context.json` / `ai-agents.json`** — não localizei norma de consórcio. Parece experimentação ad-hoc. Recomendação: não publicar como se fosse padrão estabelecido.
2. ~~**PerplexityBot compliance pós-controvérsia** — `[VERIFICAR]`~~  
   **RESOLVIDO (2026-05-17):** PerplexityBot **permanece delistado** do Verified Bots da Cloudflare em maio/2026. Sem reversão documentada. Fonte: developers.cloudflare.com/bots/concepts/bot/verified-bots/ + radar.cloudflare.com.
3. ~~**AP2 partners completos** — `[VERIFICAR]` MercadoLibre/Adyen~~  
   **RESOLVIDO (2026-05-17):** Adyen **CONFIRMADO** na lista oficial (Google Cloud blog 16/09/2025). MercadoLibre **NÃO está listado** entre os 60+ parceiros oficiais do AP2. Fonte primária: cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol.
4. ~~**x402 governança na Linux Foundation** — `[VERIFICAR]` charter~~  
   **RESOLVIDO (2026-05-17):** Linux Foundation anunciou oficialmente o lançamento da x402 Foundation em **2 de abril de 2026** (MCP Dev Summit NY). Coinbase doou o protocolo; governança aberta com Google, Microsoft, Amazon como membros fundadores. Fonte: linuxfoundation.org/press/linux-foundation-is-launching-the-x402-foundation-and-welcoming-the-contribution-of-the-x402-protocol.
5. ~~**GPTBot UA versão atual** — fontes variam entre `/1.1` e `/1.2`. `[VERIFICAR]`~~  
   **RESOLVIDO (2026-05-17):** GPTBot versão atual é **1.3** (não 1.2 como constava). OAI-SearchBot também em **1.3**. Novo crawler **OAI-AdsBot/1.0** adicionado. Fonte: developers.openai.com/api/docs/bots confirmado via WebFetch direto.
6. ~~**Claude-SearchBot existência** — `[VERIFICAR]` se é UA real~~  
   **RESOLVIDO (2026-05-17):** Claude-SearchBot é **UA real e em produção**. Confirmado no Help Center oficial da Anthropic (support.claude.com/en/articles/8896518, atualizado 7 de abril de 2026). Três bots ativos: ClaudeBot (treinamento), Claude-User (fetch sob demanda), Claude-SearchBot (melhora qualidade de busca). IP verification em claude.com/crawling/bots.json.
7. **Schema.org `Speakable` longevidade** — Status: **BETA ativo, sem deprecation sinalizada** (confirmado em 2026-05-17). Sete tipos foram removidos em jan/2026 mas Speakable não está na lista. Benefício emergente: correlação com citação em AI retrieval (Perplexity, ChatGPT Search, AI Overviews). Recomendação: manter implementação, custo baixo.
8. **MCP no Vercel/Cloudflare como host remoto** — Cloudflare Workers já tem MCP hosting; Vercel anunciou suporte em jan/2026. **[VERIFICAR]** template canônico para portal editorial expor MCP server (e.g., busca de artigos).
9. **Bytespider IP ranges** — Sem documentação oficial. Bloquear via UA pode falhar (UA spoofable). **[VERIFICAR]** se Cloudflare, DataDome, ou DarkVisitors mantêm lista IP rotativa.
10. **AI Overview / AI Mode citation algorithm** — Black box. Sinais mais correlacionados em estudos 2026: presença de FAQPage, `@graph` Person+Organization, citação de fonte primária, tabelas HTML. **[VERIFICAR]** se papers acadêmicos 2026 publicaram análise causal (ECS Caramaschi, Aggarwal, Profound studies).

> **Looker Studio → Data Studio:** Confirmado rebrand reverso em **16 de abril de 2026** (anúncio 10/04/2026). Ferramenta gratuita voltou ao nome Data Studio; Looker permanece como produto enterprise. Nenhum link quebra — redirecionamento automático. Fonte: cloud.google.com/blog/products/data-analytics/looker-studio-is-data-studio.
