# GEO 2026 · frameworks e KPIs emergentes para incorporação ao programa GEO IPOG

> **Status:** intelligence layer — gaps identificados via dossiê Perplexity sonar-deep-research em 2026-05-12 — escopo amplo (12-05-2026)
> **Dono:** Alexandre Caramaschi (CEO da Brasil GEO)

> **Reframe canônico 12-05-2026:** frameworks emergentes (MCP, agentic search, runtime AI agents) operam sobre o portfólio amplo de pós-graduação em Psicologia (5 modalidades canônicas — `dashboards/METRICAS-CANONICAS.md` Cláusula 0). A pergunta de exemplo "qual MBA em Psicologia se encaixa no perfil do usuário?" generaliza para "qual pós-graduação em Psicologia se encaixa no perfil do usuário?" — agentes precisam de MCP exposto que descreva todas as 5 modalidades, não apenas MBA, com `programType` correto em cada.
> **Cross-links obrigatórios:** [`docs/framework/06-voice-guard-v2-aggarwal.md`](06-voice-guard-v2-aggarwal.md) (V2 atual), [`docs/framework/07-research-geo-aplicado-ipog.md`](07-research-geo-aplicado-ipog.md) (papers Caramaschi 2026), [`docs/STATUS.md`](../STATUS.md), [`docs/research/perplexity-dossier-seo-geo-agentic-2026.md`](../research/perplexity-dossier-seo-geo-agentic-2026.md)
> **Issue de rastreamento:** geo-ipog#76 (a abrir)

---

## 1. Resumo executivo

A V1 do programa GEO IPOG opera sob duas bases canônicas: (a) Voice Guard 2.0 incorporando as 9 estratégias de Aggarwal et al. (KDD 2024) — já no repo em [`docs/framework/06-voice-guard-v2-aggarwal.md`](06-voice-guard-v2-aggarwal.md); (b) corpus reprodutível de 14.171 queries cross-LLM com 4 papers Caramaschi 2026 — já no repo em [`docs/framework/07-research-geo-aplicado-ipog.md`](07-research-geo-aplicado-ipog.md). Esta intelligence layer (V2) mapeia 8 frameworks e 12 KPIs emergentes 2026 que ainda **não estão aplicados** e propõe roadmap de incorporação em 3 fases.

A tese central: o programa GEO IPOG hoje tem teses operacionais (Aggarwal 2024) e empíricas (Caramaschi 2026), mas falta a camada de **protocolos de exposição a agentes** (MCP, A2A), **rastreio de citation provenance**, **AI Overview tracking** e **trust signals** específicos para Gen Z. Sem essas três camadas, vencemos o pico 2026.2 com Schema.org + llms.txt mas perdemos o pico 2027.1 quando a interface dominante de descoberta migrar de chat para agente.

---

## 2. Frameworks emergentes 2026 (8) — não aplicados

### 2.1 MCP — Model Context Protocol (Anthropic)

**O que é:** especificação aberta lançada por Anthropic em 2024-11 e adotada por OpenAI/Google em 2025-2026 para que LLMs e agentes IA acessem dados estruturados de uma fonte externa (sistema, documento, API) com tipagem clara.

**Por que importa para IPOG:** quando ChatGPT/Claude/Gemini executarem agentes que recomendam pós-graduação (matrícula assistida por IA), eles consumirão MCP servers para responder "qual MBA em Psicologia se encaixa no perfil do usuário?". Portais sem MCP exposto perdem para portais com.

**Como aplicar no portal:**

1. Expor `/mcp/courses.json` com schema de MCP listando 5 MBAs + 18 áreas + 6 hubs editoriais com metadados (público-alvo, pré-requisitos, ementa, modalidade, fonte oficial em ipog.edu.br).
2. Implementar `/.well-known/mcp.json` apontando para o endpoint.
3. Registrar o portal em diretórios MCP públicos quando emergirem (Anthropic Hub, OpenAI GPT Store equivalente).

**KPI associado:** Agent Authority Score (ver §3.7).

### 2.2 A2A — Agent-to-Agent Protocol (Google)

**O que é:** protocolo Google 2026 para que agentes IA negociem ações entre si (ex: agente do usuário pede ao agente do IPOG informações de matrícula).

**Por que importa:** se o IPOG não expõe um endpoint A2A, agentes do usuário consultarão fontes intermediárias (Estácio, UniCesumar, Anhembi Morumbi) que já sinalizaram suporte.

**Como aplicar:** roadmap Q3-2026 — depende da maturação do protocolo (rascunho ainda em finalização).

### 2.3 AI Overview tracking (Google)

**O que é:** caixa de resposta gerada por LLM no topo do SERP Google, lançada globalmente em 2024-08. Reduz CTR orgânico em 30-60% nas queries cobertas.

**Por que importa:** páginas do portal que aparecem citadas no AI Overview ganham presença mesmo sem clique. Páginas que não aparecem perdem tráfego mesmo posicionadas em #1 orgânico.

**Como aplicar:**

1. Selecionar 25 queries-prioritárias de matrícula em Psicologia (lista canônica em `prompts/QUERIES-REGIONAIS-CANONICAS.md`).
2. Capturar semanalmente HTML do SERP via Playwright/Browserless headless detectando bloco `[data-async-context*="ai-overview"]`.
3. Computar **AI Overview Presence Rate** (AOPR) e **AI Overview Citation Rate** (ACR) — ver §3.5 e §3.6.

### 2.4 EEAT 2026 — Experience reforçado

**O que é:** Google Search Quality Rater Guidelines (SQRG) 2025 e 2026 elevam o peso de **Experience** (E) acima de Expertise/Authoritativeness/Trust em domínios YMYL (Your Money or Your Life), onde educação superior se encaixa.

**Por que importa:** "Quem é Alexandre Caramaschi?" precisa retornar prova de experiência (ex-CMO Semantix Nasdaq, cofundador AI Brasil) verificável em Wikipedia, Wikidata, LinkedIn, conferências. O portal não pode ser apenas editorial — precisa demonstrar autoria humana especializada.

**Como aplicar:**

1. Schema.org `Person` em todas as peças assinadas Alexandre Caramaschi com `hasCredential`, `alumniOf`, `award`, `worksFor`, `knowsAbout`.
2. Cross-link entre peças do portal e biografia em `alexandrecaramaschi.com/sobre`.
3. Wikipedia + Wikidata anchored (drafts em `docs/wikipedia-draft-*.wikitext`).

### 2.5 INP (Interaction to Next Paint) — Core Web Vitals 2026

**O que é:** métrica Google que substituiu FID em março/2024, mede latência de resposta visual após interação. Threshold "Good" = ≤200ms.

**Por que importa:** Core Web Vitals impactam ranking. Astro static + CF Pages tem INP excelente (<100ms na maioria), mas elementos React (SearchOverlay, QuizQualMBA, MobileBottomNav) precisam de auditoria.

**Como aplicar:** rodar Lighthouse CI no workflow `deploy-cloudflare-pages.yml` com gate de INP <200ms. Adicionar `chrome-lighthouse-ci-action`.

### 2.6 Citation Provenance Chain

**O que é:** rastreamento da cadeia de origem quando um LLM cita uma marca. Ex: LLM diz "MBA em Psicologia Positiva do IPOG é referência" — qual fonte primária ele consultou? (papers Caramaschi 2026 já cobrem isso parcialmente via Source Divergence)

**Por que importa:** se o LLM cita o portal indireto via Wikipedia → IPOG, o portal não captura crédito direto. Otimizar para que LLMs citem o portal como fonte primária (e o portal cite ipog.edu.br como caminho oficial).

**Como aplicar:** logging cross-LLM diário (já no script `daily-collect.yml`) + análise de attribution chain (extensão do método Caramaschi 2026 paper 3).

### 2.7 Semantic Density Score (SDS)

**O que é:** extensão de Aggarwal KDD 2024 estratégia #6 (Technical Terms) e #7 (Unique Words). Mede densidade de entidades canônicas, citações (Autor, Ano) e termos técnicos por mil palavras.

**Por que importa:** LLMs em modo RAG priorizam passagens com alta densidade semântica para citação. Voice Guard V2 já mede densidade de citação mas não consolida em score único.

**Como aplicar:** adicionar dimensão SDS ao Voice Guard com peso 10% (redistribuir dos 30% de anti-clichê para 25% anti-clichê + 5% SDS).

### 2.8 LLM Trust Ladder (Bing/Microsoft 2026)

**O que é:** modelo conceitual Microsoft Research 2026 graduando confiança de fonte em 5 níveis para LLMs: (1) menção direta, (2) menção com atribuição, (3) citação literal com fonte, (4) citação com link verificável, (5) citação com Schema.org rico + link + Wikipedia anchor.

**Por que importa:** programa GEO IPOG opera nos níveis 3-4 hoje. Subir para 5 é o moat estrutural — Wikipedia + Wikidata + Schema.org rico bloqueia concorrentes que não fizeram o trabalho de fundação.

**Como aplicar:**

1. Wikipedia: aprovar verbete IPOG (Issue #63 em curso).
2. Wikidata: criar item com qID + sameAs Wikipedia + propriedades P31 (instance of), P17 (country), P159 (HQ location).
3. Schema.org `EducationalOrganization` no portal cross-linkado para Wikipedia e Wikidata via `sameAs`.

---

## 3. KPIs emergentes 2026 (12) — não medidos

| # | KPI | Fórmula / sinal | Quem mede | Fonte de dados | Status atual |
|---|---|---|---|---|---|
| 1 | **AI Mention Rate** (AMR) | menções(LLM)/queries × 100 | NAIA + scripts próprios | 5 LLMs × 25 queries semanais | Coletado parcialmente; consolidação pendente |
| 2 | **First-Answer Share** (FAS) | citações_como_primeira_fonte / total_citações | NAIA + scripts | mesmo dataset | Não medido |
| 3 | **Citation Stability Index** (CSI) | 1 − σ(AMR)/μ(AMR) ao longo de 8 semanas | scripts Python | snapshot semanal | Não medido |
| 4 | **Source Divergence Score** (SDS-1) | 1 − Jaccard(SERP_Google, citações_LLM) | scripts Python | papers Caramaschi 2026 #3 | Definido, não automatizado |
| 5 | **AI Overview Presence Rate** (AOPR) | queries_com_AO_citando_portal / total | Playwright headless | SERP Google semanal | Não medido |
| 6 | **AI Overview Citation Rate** (ACR) | citações_AO / impressões_AO | mesmo | mesmo | Não medido |
| 7 | **Agent Authority Score** (AAS) | (MCP_exposto × LLM_consulta_MCP × resposta_cita) | manual + scripts | logs futuros | Pendente MCP |
| 8 | **Schema Coverage Index** (SCI) | páginas_com_schema_rico / total | `scripts/schema_audit.mjs` | weekly | **Em produção · 91,5% FAQPage** |
| 9 | **Snippet Conversion Rate** | clicks_AO / impressões_AO | GA4 + GSC | dashboard | Pendente GA4 (R-009) |
| 10 | **GEO ROI** | receita_atribuída / custo_GEO | GA4 + IPOG CRM | trimestral | Pendente GA4 + CRM access |
| 11 | **Semantic Density Score** (SDS-2) | (entidades + citações + termos_técnicos) / palavras × 1000 | Voice Guard CI | per-commit | Componentes medidos, não consolidados |
| 12 | **LLM Trust Ladder Position** | nível 1-5 atual | manual | quarterly review | Estimado nível 3-4 hoje |

---

## 4. Gap analysis vs frameworks já no repo

| Capacidade | Status | Onde |
|---|---|---|
| 9 estratégias Aggarwal KDD 2024 | ✅ aplicado | Voice Guard V2 |
| Corpus 14.171 queries cross-LLM | ✅ disponível | papers Caramaschi 2026 |
| Source Divergence Score | 🟡 definido, sem automação | paper Caramaschi 2026 #3 |
| A/B tests Schema.org + llms.txt | 🟡 pré-registrados, não executados | paper Caramaschi 2026 #4 |
| Voice Guard score min 70 | ✅ aplicado | Voice Guard V1 + V2 |
| Schema.org auditing | ✅ baseline 12-05 | `scripts/schema_audit.mjs` |
| `llms.txt` publicado | ✅ portal próprio | `site/public/llms.txt` |
| `robots.txt` AI-permissive | ✅ portal próprio | `site/public/robots.txt` |
| **MCP exposto** | ❌ não implementado | — |
| **A2A** | ❌ aguardar maturação protocolo | — |
| **AI Overview tracking** | ❌ não medido | — |
| **AOPR, ACR, AMR** | ❌ não consolidados em dashboard | — |
| **CSI** (Citation Stability) | ❌ não medido | — |
| **Wikipedia + Wikidata anchored** | 🟡 drafts existem (Issue #63) | `docs/wikipedia-draft-*.wikitext` |
| **EEAT Experience signals** | 🟡 Person schema parcial | falta hasCredential consolidado |
| **INP < 200ms gate** | ❌ não validado em CI | — |
| **Semantic Density Score** | 🟡 componentes existem | falta consolidação Voice Guard |

---

## 5. Roadmap de incorporação (3 fases)

### Fase A · Quickwins até 30-05-2026 (W22)

**Objetivo:** instrumentar 6 KPIs primários sem dependência IPOG.

1. **SCI automatizado** — `scripts/schema_audit.mjs` rodando weekly via cron + commit do CSV em `data/audits/` ✅ **JÁ EM PRODUÇÃO** (commit `b8fc598`).
2. **MCP /courses.json prova de conceito** — expor `/.well-known/mcp.json` + `/mcp/courses.json` no portal com schema dos 5 MBAs + 18 áreas + 6 hubs. Esforço: 4h. Owner: Brasil GEO.
3. **AOPR baseline** — script Playwright headless para 25 queries × 1x/semana, salvando HTML + extraindo `[data-async-context*="ai-overview"]`. Esforço: 1 dia. Owner: Brasil GEO.
4. **AMR consolidação** — Python script lendo dataset Caramaschi 2026 (14.171 queries) e extraindo subconjunto IPOG. Esforço: 4h.
5. **EEAT Person Schema** — atualizar todas as peças assinadas Alexandre com `Person` + `hasCredential` + `alumniOf` + `award`. Esforço: 2h (script automatizado sobre 11 peças HBR).
6. **INP gate no CI** — adicionar `lighthouse-ci-action` ao workflow `deploy-cloudflare-pages.yml`. Esforço: 2h.

### Fase B · Estrutural até 30-06-2026 (W26)

**Objetivo:** Wikipedia + Wikidata + executar A/B tests pré-registrados.

1. Aprovar verbete Wikipedia IPOG (Issue #63 em curso).
2. Criar item Wikidata com cross-link Wikipedia + Schema.org `sameAs`.
3. Executar A/B test Schema.org (paper Caramaschi 2026 #4): grupo A com Schema rico, grupo B com Schema mínimo, medir citation rate cross-LLM em 30 dias.
4. Executar A/B test llms.txt: subgrupo de páginas com llms.txt detalhado vs llms.txt mínimo.
5. Consolidar AMR + FAS + CSI em dashboard semanal (próximo a Trakkr/First Answer AI quando disponível — Issue #46).

### Fase C · Agentic até pico 2027.1 (Q4-2026)

**Objetivo:** preparar portal para era de agentes IA.

1. Endpoint A2A quando protocolo Google maturar (esperado Q3-2026).
2. MCP server v2 com queries dinâmicas (não só JSON estático).
3. Citation Provenance Chain automatizada com NER + retrieval inverso.
4. LLM Trust Ladder posição 5 atingida (Wikipedia + Wikidata + Schema rico + cross-link).

---

## 6. Fontes consultadas

Dossiê Perplexity sonar-deep-research bruto em [`docs/research/perplexity-dossier-seo-geo-agentic-2026.md`](../research/perplexity-dossier-seo-geo-agentic-2026.md) (31KB · 10 tarefas orchestrator US$ 0,30 · 4× Perplexity + 3× Gemini Flash + 1× GPT-4o + 1× Groq + 1× Groq Heavy).

Frameworks complementares de conhecimento próprio:

- **Aggarwal, P. et al. (KDD 2024).** *GEO: Generative Engine Optimization*. — JÁ no repo, Voice Guard V2.
- **Anthropic (2024-11).** *Model Context Protocol (MCP) specification*. modelcontextprotocol.io.
- **Google (2026).** *Agent2Agent (A2A) protocol draft*. blog.google.
- **Microsoft Research (2026).** *Trust signals in LLM citation ranking*. — base do LLM Trust Ladder.
- **Google Search Quality Rater Guidelines (2025-2026).** — EEAT 2026 com Experience reforçado.
- **web.dev / Google (2024).** *Interaction to Next Paint (INP)* — substitui FID em 2024-03.
- **Caramaschi, A. (2026).** 4 papers — corpus 14.171 queries, JÁ no repo em `docs/framework/07-...`.

**Fontes do dossiê Perplexity citadas (não validadas para uso em produção sem cross-check):**

- Eight Oh Two Marketing (2026) — funil de descoberta com IA reordenado.
- CITI Program (2026) — descoberta Gen Z via vídeo curto, IA, peers.
- ETS (2026) — sete tendências em ensino superior.
- upGrad (2026) — ROI Pivot em educação global.
- Campus Technology (2026) — predições IA + EdTech.
- Fortune (2026) — desconfiança Gen Z em IA.

---

## 7. Próximos passos imediatos

1. **Esta semana (W20):** implementar Fase A.1, A.2, A.3 (SCI ✅, MCP, AOPR baseline). Issue #76 a abrir como tracker.
2. **Reunião W20 terça 2026-05-19:** apresentar este doc a Bruno Azambuja e propor decisão de avançar para Fase B.
3. **Voice Guard V3:** incorporar SDS-2 (Semantic Density) como dimensão #8 com peso 5%. Documento técnico em [`docs/framework/09-voice-guard-v3.md`](09-voice-guard-v3.md) (a criar).

---

*Última atualização:* `2026-05-12 09:00 BRT` · Alexandre Caramaschi
