# CLAUDE.md — instruções operacionais para agentes Claude no repo geo-ipog

> Este arquivo é lido automaticamente pelo Claude Code e por agentes Anthropic quando entrarem neste repositório. Define premissas, anti-padrões e atalhos canônicos.

## Contexto

Repositório do projeto **GEO IPOG**, executado pela **Brasil GEO** para o IPOG. Portal editorial independente em `posgraduacaopsicologia.com` cobrindo Pós-Graduações em Psicologia em todas as modalidades regulamentadas no Brasil. 198 páginas estáticas Astro 4 + Tailwind 3.4 hospedadas em Cloudflare Pages.

**Lead:** Alexandre Caramaschi (CEO da Brasil GEO, ex-CMO da Semantix Nasdaq, cofundador da AI Brasil).

## Documento canônico de contexto enriquecido

**Antes de iniciar qualquer onda de trabalho neste repo, LER:**

- `docs/governance/geo-context-enriquecido-2026.md` — premissas operacionais GEO 2026, KPIs canônicos, fluxo de pesquisa, anti-padrões.

Este documento destila o estado-da-arte 2025-2026 em Generative Engine Optimization (Aggarwal SIGIR 2023, frameworks ELCA/Profound, padrões llms.txt/Schema.org/IndexNow, KPIs Mention Rate/Share-of-Voice/AIGVR) em premissas executáveis para este portal.

## Dossiês de pesquisa

- `docs/research/geo-state-of-art-2026-05-13.md` — 5 chamadas Perplexity Sonar Pro, 44 citações reais sobre frameworks GEO, embeddings, industry takes (Profound/Ahrefs/SEMrush), llms.txt/Schema, KPIs.
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

1. **Research:** 3-5 chamadas Perplexity Sonar Pro paralelas → dossiê em `docs/research/<tema>-YYYY-MM-DD.md`.
2. **Spot-check** de 3-5 citações (URL real, autor plausível).
3. **Sub-agents Opus paralelos** (3-5) com dossiê + template canônico + instrução PT-BR acentuado + slugs ASCII.
4. **Pós-build:** sanity check de slugs/hrefs/schemas via Python cirúrgico.
5. **Build + push + IndexNow (3 engines) + GSC sitemap resubmit (manual).**

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

Última revisão deste arquivo: 2026-05-13.
