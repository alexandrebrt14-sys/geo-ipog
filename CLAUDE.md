# CLAUDE.md — instruções operacionais para agentes Claude no repo geo-ipog

> Este arquivo é lido automaticamente pelo Claude Code e por agentes Anthropic quando entrarem neste repositório. Define premissas, anti-padrões e atalhos canônicos.

## Contexto

Repositório do projeto **GEO IPOG**, executado pela **Brasil GEO** para o IPOG. Portal editorial independente em `posgraduacaopsicologia.com` cobrindo Pós-Graduações em Psicologia em todas as modalidades regulamentadas no Brasil. 198 páginas estáticas Astro 4 + Tailwind 3.4 hospedadas em Cloudflare Pages.

**Lead:** Alexandre Caramaschi (CEO da Brasil GEO, ex-CMO da Semantix Nasdaq, cofundador da AI Brasil).

## Documento canônico de contexto enriquecido

**Antes de iniciar qualquer onda de trabalho neste repo, LER nesta ordem:**

1. `docs/governance/GEO_50_CONCEITOS_CANONICAL.md` — **TAXONOMIA EDITORIAL CANÔNICA (50 conceitos GEO/SEO 2026).** Referência obrigatória para toda página criada no site (HowTo, FAQ, comparativo, guia clínico, vertical de modalidade). Sub-agents Opus que produzem conteúdo neste repo recebem este arquivo como contexto OBRIGATÓRIO. Inclui mapa de aplicação por vertical do geo-ipog e anti-padrão 26 (veto absoluto a "garante CFP", "aprovado garantido", "carreira em 30 dias", "ChatGPT já cita", etc.).
2. `docs/governance/seo-geo-knowledge-base-2026-05-17.md` — **KB canônica SEO+GEO 2026 (porta de entrada).** Taxonomia em 7 ramos, glossário, checklist de implementação e 12 mudanças canônicas de 2026 que afetam decisão neste portal (FAQ rich result morto em 07/05, GPT-5.3 vs 5.4 dramatic delta, pt-BR YouTube 65% vs Reddit 7%, llms.txt sem evidência estatística, MCP padrão de fato, Schema @graph triplo, etc.). Sintetiza 5 dossiês de wave (A-E) com 203 sources catalogadas, 70+ spot-checked individualmente.
3. `docs/governance/geo-context-enriquecido-2026.md` — premissas operacionais GEO de 13/05 (Aggarwal SIGIR/KDD 2024, frameworks ELCA/Profound, padrões llms.txt/Schema.org/IndexNow, KPIs Mention Rate/SoV/AIGVR).

A KB de 17/05 (item 2) é mais recente e tem prioridade quando houver conflito factual com o item 3. O item 1 (50 conceitos) é a TAXONOMIA editorial e tem precedência em decisões de estrutura/checklist.

### Mapa rápido — 50 conceitos por vertical existente do site

- **Páginas HowTo (Wave AA)** → conceitos 7, 8, 11, 13, 25
- **FAQs (Waves BB, FF, KK)** → conceitos 11, 12, 13, 14
- **Comparativos (Wave CC)** → conceitos 9, 10, 49
- **Páginas clínicas (Waves HH, JJ, MM — saúde mental, neuropsi, IA clínica)** → conceitos 21, 22, 23 (E-E-A-T CRÍTICO em saúde mental)
- **Páginas de modalidade (5 verticais canônicas)** → conceitos 9, 10, 15. Conceito 9 considera quatro intenções distintas: aluno em decisão, profissional CFP, gestor de instituição, familiar de paciente.
- **Anti-padrão 26 (veto absoluto)** → banido em qualquer copy: "garante CFP", "aprovado garantido", "carreira em 30 dias", "ChatGPT já cita", "AI Overview garantido", "especialista #1", "100% de aprovação".

## Dossiês de pesquisa

### Salva canônica 17/05/2026 — knowledge base completa

- `docs/research/wave-A-papers-academicos-20260517.md` — 20 papers acadêmicos 2025-2026 (Khosravi/Yoganarasimhan -15% Wikipedia, Zhang/He/Yao Citation Selection vs Absorption, Zhao 146.932 alucinações, Aggarwal continuações), 17 spot-checked arxiv.
- `docs/research/wave-B-frameworks-vendors-20260517.md` — landscape industrial: Profound (Série C US$ 96M @ US$ 1B em 24/02/2026), Peec, Otterly, AthenaHQ, Brandlight, Trakkr, Ahrefs Brand Radar, SEMrush AI Toolkit, Conductor (ISO 42001), 10 analistas canônicos, gap BR identificado.
- `docs/research/wave-C-engines-2026-20260517.md` — comportamento dos 8 engines (ChatGPT 5.3 Instant default, Claude Opus 4.7 GA, Gemini AI Mode pt-BR desde 08/09/2025, Perplexity Sonar Deep Research em Opus 4.5, Bing AI Performance Report 10/02/2026, Meta Muse Spark 08/04/2026).
- `docs/research/wave-D-standards-tecnicos-20260517.md` — standards (FAQ rich result morto 07/05/2026, Schema @graph triplo canônico, lista de 15+ bots, MCP 2025-11-25, IndexNow, AP2/x402/Web Bot Auth, llms.txt sem evidência).
- `docs/research/wave-E-kpis-measurement-20260517.md` — 24 KPIs canônicos, frameworks ELCA/iPullRank/Aleyda/Profound/Aggarwal, regex GA4 "AI Traffic", server log canônico, benchmark setorial (CTR -59%, AIO 6,49%→13,14%, AI Mode 93% zero-click, 26% marcas com zero menção), controvérsias (Mention ≠ Citation, AECR ambíguo, ChatGPT só 34,5% web-search).

### Salva canônica 17/05/2026 (tarde) — sprint de remediação

- `docs/research/verifications-followup-20260517.md` — wave BB: consolidação de verificações de citações e fontes da sprint canônica.
- `docs/governance/frente-regional-51-cidades-plano.md` — wave DD: plano de expansão regional para 51 cidades com presença IPOG.
- `docs/runbooks/manual-mention-tracking-reddit-brave-bing.md` — wave EE: runbook de monitoramento manual de menções em Reddit, Brave Search Summarizer e Bing AI Performance (canais sem API estável em mai/2026). Inclui template CSV em `dashboards/manual-mention-tracking.csv`. Endereça issue #57.
- `docs/governance/verificar-followup-20260517.md` — wave EE: catálogo de 32 ocorrências `[VERIFICAR]` nos arquivos da sprint canônica, classificadas em RESOLVER (8), BACKLOG (10) e GAP DECLARADO (14).

### Salvas anteriores (13/05/2026)

- `docs/research/geo-state-of-art-2026-05-13.md` — 44 citações reais sobre frameworks GEO, embeddings, industry takes.
- `docs/research/perplexity-dossie-9temas-20260513.md` — 19 citações reais sobre TEA, TDAH, burnout, IA clínica, psicose, perinatal, neurodiversidade, IAPT, supervisão.

## Premissas editoriais (toda peça nova)

- 1ª sentença declarativa (sujeito + verbo + objeto, sem rhetoric opener)
- 2-3 estatísticas com fonte no primeiro terço
- Citações `(Autor, Ano)` próximas às afirmações materiais
- Tese contraintuitiva explícita no lead (padrão Harvard Business Review)
- TL;DR box logo após `<h1>` (`<TLDR>` componente)
- JSON-LD: Article + FAQPage/HowTo + BreadcrumbList + Person author (`alexandrePersonBase`) + Publisher Org (`brasilGeoOrganization`)
- 3 cross-links internos mínimos
- CTA IPOG sutil — 1 na última FAQ + 1 secundário "Ver MBAs no IPOG" → `SITE.ipogPos`
- Português PT-BR com acentuação completa
- Slug ASCII canônico no filename e refs href

## Anti-padrões (proibidos)

1. **NUNCA rodar `scripts/fix-accents.mjs` cego em massa.** Quebra slugs ASCII, props JS, conjunções legítimas (incidente 13-05-2026 quebrou 223 arquivos). Memória global: `feedback_acentuacao_portugues_brasil_canonica`.
2. **NUNCA confiar em SmartRouter do `geo-bridge.sh` para forçar 5 LLMs.** Ele roteia tudo para GPT-4o (cobertura 1/5 = 20%) que confabula DOIs. Bypass via chamadas Perplexity diretas (`api.perplexity.ai/chat/completions` com `sonar-pro`).
3. **NUNCA aceitar DOI ou citação confabulada.** Spot-check de 3-5 fontes antes de publicar. Se Perplexity não retornar evidência real, marcar `[FALTA EVIDÊNCIA]`.
4. **NUNCA usar CTAs IPOG agressivos.** Sempre sutil, máximo 1 menção por FAQ + 1 CTA secundário por página.
5. **NUNCA escrever "GEO Brasil".** Sempre **"Brasil GEO"**.
6. **NUNCA usar slug com acento.** Caminhos sempre ASCII; acento mora no `<h1>` e `<title>`, nunca em `href` ou filename.

## Fluxo padrão de onda de conteúdo

1. **Consulta wiki primeiro.** Abrir `wiki/index.md` e procurar o tema em `entities/`, `concepts/`, `sources/` antes de qualquer pesquisa externa. Regra Karpathy K-07 (`scripts/wiki/query-playbook.md`).
2. **Research:** 3-5 chamadas Perplexity Sonar Pro paralelas → dossiê em `docs/research/<tema>-YYYY-MM-DD.md`.
3. **Spot-check** de 3-5 citações (URL real, autor plausível).
4. **Sub-agents Opus paralelos** (3-5) com dossiê + template canônico + instrução PT-BR acentuado + slugs ASCII + `docs/governance/GEO_50_CONCEITOS_CANONICAL.md` (taxonomia editorial obrigatória) + prioridades específicas do tipo de página (HowTo: 7/8/11/13/25; FAQ: 11/12/13/14; comparativo: 9/10/49; clínica: 21/22/23) + anti-padrão 26 literal.
5. **Pós-build:** sanity check de slugs/hrefs/schemas via Python cirúrgico.
6. **Build + push + IndexNow (3 engines) + GSC sitemap resubmit (manual).**
7. **Wiki ingest:** processar o dossiê novo conforme `scripts/wiki/ingest-playbook.md`. Tocar de 5 a 15 páginas wiki. Apendar `wiki/log.md`. Rodar `python scripts/wiki/lint.py`.

## Wiki workflow obrigatório (padrão Karpathy LLM Wiki)

Repositório adotou em 2026-05-26 o padrão LLM Wiki descrito por Andrej Karpathy em [gist.github.com/karpathy/442a6bf555914893e9891c11519de94f](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f). Camada `wiki/` é mutável, atômica, cross-linkada e mantida por agentes LLM. Convive com `docs/research/` (raw imutável), `docs/governance/` (canônico longo) e `STATUS.md` (ledger narrativo). Detalhes em `docs/governance/karpathy-llm-wiki-methodology.md` e ADR completo em `wiki/decisions/ADR-001-adopcao-llm-wiki.md`.

**Disciplina inviolável:**

1. **Antes** de qualquer onda nova: consultar `wiki/index.md`. Tema já coberto?
2. **Durante**: tocar páginas existentes, criar páginas novas quando faltar.
3. **Ao final** da onda: registrar em `wiki/log.md` (append-only no formato canônico), rodar `python scripts/wiki/lint.py`, endereçar `broken_crosslinks` fora do backlog e `missing_frontmatter` zero, commitar tudo junto.
4. **Mensalmente**: review formal em `wiki/reviews/YYYY-MM-DD-...md` com endereçamento de órfãos e stale claims.

**Tipos canônicos de página:** `entities/`, `concepts/`, `decisions/`, `sources/`, `reviews/`. Detalhes do critério de criação em `docs/governance/karpathy-llm-wiki-methodology.md`.

**Convenções inegociáveis:**

- Frontmatter YAML com `name`, `type`, `status`, `created`, `updated`, `sources`, `related`.
- Cross-links `[[slug]]` no corpo. Filenames ASCII kebab-case.
- Português PT-BR acentuado. Sem emojis. Sem em-dash em copy editorial.
- Cada onda fecha pelo menos 1 item do backlog explícito em `wiki/index.md` ou justifica.

**Métricas (revisão em 30/60/90 dias):** 5+ páginas novas por wave; backlog reduz por wave; tempo médio de query operacional via wiki <2 minutos; 0 órfãos não-justificados em review mensal.

## Ferramentas canônicas

- **Build:** `cd site && npm run build` → gera 6 sitemaps (principal + areas/mbas/guias/faq/comparativos + index).
- **Type-check:** `cd site && npx astro check` — exigir 0 errors antes de commit.
- **Perplexity bypass direto:** curl `api.perplexity.ai/chat/completions` model `sonar-pro` + chave `~/.../.env` `PERPLEXITY_API_KEY`.
- **IndexNow:** POST JSON com `urlList` ao endpoint da engine. Key: `geoipogIN2026`. Endpoints: `api.indexnow.org/indexnow`, `www.bing.com/indexnow`, `yandex.com/indexnow`.

## KPIs canônicos a rastrear

- **Mention Rate** (% queries kit canônico × 6 LLMs)
- **Citation Rate** (# citações / # respostas relevantes)
- **Share-of-Voice** vs 5 concorrentes diretos
- **AIGVR** (frequência × proeminência, framework ELCA)
- **GA4 organic + AI referral traffic** (perplexity.ai, chatgpt.com, claude.ai)

Kit de sementes em `site/public/mcp/citation-prompts.json` (50 prompts).

## Schemas canônicos

- `src/lib/schemas/person-alexandre.ts` — Person `#alexandre-caramaschi` (39 knowsAbout, 13 sameAs, 3 alumniOf, 3 hasCredential).
- `src/lib/schemas/publisher.ts` — Organization `#brasil-geo` (BRGEO LTDA, CNPJ 66.051.295/0001-33, sede Hub Cerrado Goiânia).
- `src/lib/schemas/index.ts` — barrel export.
- `src/layouts/Base.astro` — `@graph` triplo (WebSite + Organization + Person) reconciliado por `@id`.

Toda nova página de Article deve importar e usar:

```typescript
import { alexandrePersonBase, brasilGeoOrganization } from '@lib/schemas';

const ldArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '...',
  author: alexandrePersonBase,
  publisher: brasilGeoOrganization,
  // ...
};
```

## Convenções de commit

- Estilo: `feat(scope): mensagem` ou `docs(scope): mensagem` ou `fix(scope): mensagem`.
- Co-author: `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`.
- Branch principal: `main`.
- Sem `--no-verify`, sem `--amend` em commits publicados.

## Memórias persistentes globais relevantes

(Em `~/.claude/projects/C--Users-alexa/memory/`)

- `project_geo_ipog_hardening_waves_20260513_pt2` — 5 waves hardening GEO 13-05
- `project_geo_ipog_waves_AABBCCDDEE_20260513` — 20 páginas novas 13-05
- `feedback_acentuacao_portugues_brasil_canonica` — proibição fix-accents cego
- `feedback_perplexity_research_mandatory` — Perplexity bypass para research
- `feedback_orchestrator_usage` — orchestrator SmartRouter ignora forçar
- `feedback_geo_ipog_5_modalidades_canonicas` — escopo amplo, MBA é 1 das 5

Última revisão deste arquivo: 2026-05-26 (adição do bloco "Wiki workflow obrigatório" e do passo 1 + passo 7 no fluxo padrão de onda).
