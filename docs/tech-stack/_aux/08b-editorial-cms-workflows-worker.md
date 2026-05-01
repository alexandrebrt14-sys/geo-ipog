# Workflows GitHub Actions, Cloudflare Worker LLM e Schema canônico — programa GEO IPOG

> **Documento auxiliar:** 08b — apêndice operacional do `08-editorial-cms.md`. Reúne código pronto para colar em CI, Cloudflare Worker classificador de tráfego LLM, JSON-LD canônico da Peça 1 de Alexandre Caramaschi e snippet GA4 de KPI 7 (Conversion Lift).
> **Programa:** GEO IPOG, executor Brasil GEO. Head Alexandre Caramaschi (CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil). Sponsor IPOG: Ronan Maia. Marketing IPOG: Bruno Azambuja.
> **Cross-link obrigatório:** `docs/tech-stack/06-naia-voice-guard.md` (Voice Guard score >= 70 e checks NAIA-220-289), `docs/tech-stack/03-schema-llms-txt-engineer.md` (Schema canônico Article + Person + EducationalOrganization), `docs/tech-stack/07-observability-cicd.md` (Axiom + GA4 + dashboards), `dashboards/METRICAS-CANONICAS.md` (KPI 7 Conversion Lift).
> **Cohort canônico de LLMs:** ChatGPT, Claude, Gemini, Perplexity, Grok, Copilot — referrers `chatgpt.com`, `claude.ai`, `gemini.google.com`, `perplexity.ai`, `grok.com`, `copilot.microsoft.com`.
> **Disciplina:** PT-BR sem emojis em prosa e comentários; YAML, TypeScript, JSON e JS válidos prontos para CI.

Este apêndice resolve cinco lacunas operacionais deixadas no documento principal: o workflow de validação editorial em PR, o cron de coleta D+14 cross-LLM, o Worker Cloudflare que classifica tráfego LLM em ipog.edu.br, o JSON-LD canônico que vai injetado no `<head>` de toda peça e os custom events de GA4 que sustentam o cálculo de Conversion Lift do KPI 7. Cada bloco é autônomo e copia-cola direto para o repositório `geo-ipog/`.

---

## Bloco A — `.github/workflows/ci-editorial.yml`

Workflow disparado em pull request quando há alteração em `content/peças-hbr/` ou `content/autores/`. Cinco jobs em paralelo, agregados em um job final que comenta na PR a tabela de scores. Voice Guard é gate bloqueante (score >= 70). Schema preview valida NAIA-220-289 em modo dry-run.

```yaml
name: ci-editorial

on:
  pull_request:
    paths:
      - "content/peças-hbr/**"
      - "content/autores/**"
      - "scripts/editorial/**"

permissions:
  contents: read
  pull-requests: write

concurrency:
  group: ci-editorial-${{ github.ref }}
  cancel-in-progress: true

jobs:
  validate-frontmatter:
    name: Frontmatter (pydantic)
    runs-on: ubuntu-latest
    timeout-minutes: 5
    outputs:
      score: ${{ steps.check.outputs.score }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: "pip"
      - run: pip install -r scripts/editorial/requirements.txt
      - id: check
        run: |
          python scripts/editorial/validate_frontmatter.py \
            --path content/peças-hbr \
            --schema scripts/editorial/schemas/peca_hbr.py \
            --report frontmatter-report.json
          echo "score=$(jq -r '.score' frontmatter-report.json)" >> "$GITHUB_OUTPUT"
      - uses: actions/upload-artifact@v4
        with:
          name: frontmatter-report
          path: frontmatter-report.json

  voice-guard:
    name: Voice Guard (>= 70)
    runs-on: ubuntu-latest
    timeout-minutes: 8
    outputs:
      score: ${{ steps.guard.outputs.score }}
    env:
      VOICE_GUARD_URL: ${{ secrets.VOICE_GUARD_URL }}
      VOICE_GUARD_TOKEN: ${{ secrets.VOICE_GUARD_TOKEN }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install -r scripts/editorial/requirements.txt
      - id: guard
        run: |
          python scripts/editorial/voice_guard_ci.py \
            --base "origin/${{ github.base_ref }}" \
            --threshold 70 \
            --report voice-guard-report.json
          echo "score=$(jq -r '.score' voice-guard-report.json)" >> "$GITHUB_OUTPUT"
      - uses: actions/upload-artifact@v4
        with:
          name: voice-guard-report
          path: voice-guard-report.json

  naia-schema-preview:
    name: NAIA Schema dry-run (220-289)
    runs-on: ubuntu-latest
    timeout-minutes: 6
    outputs:
      passed: ${{ steps.naia.outputs.passed }}
    env:
      NAIA_AUDIT_URL: ${{ secrets.NAIA_AUDIT_URL }}
      NAIA_AUDIT_TOKEN: ${{ secrets.NAIA_AUDIT_TOKEN }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install -r scripts/editorial/requirements.txt
      - id: naia
        run: |
          python scripts/editorial/schema_preview.py \
            --path content/peças-hbr \
            --naia-range 220-289 \
            --dry-run \
            --report naia-report.json
          echo "passed=$(jq -r '.all_passed' naia-report.json)" >> "$GITHUB_OUTPUT"
      - uses: actions/upload-artifact@v4
        with:
          name: naia-report
          path: naia-report.json

  lychee-link-check:
    name: Lychee link check
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - uses: actions/checkout@v4
      - uses: lycheeverse/lychee-action@v2
        with:
          args: >-
            --no-progress
            --max-concurrency 8
            --accept 200,206,429
            --exclude-mail
            content/peças-hbr/**/*.md
          fail: true
          output: lychee-report.md

  markdown-lint:
    name: Markdown lint
    runs-on: ubuntu-latest
    timeout-minutes: 3
    steps:
      - uses: actions/checkout@v4
      - uses: DavidAnson/markdownlint-cli2-action@v16
        with:
          globs: |
            content/peças-hbr/**/*.md
            content/autores/**/*.yaml

  comment-summary:
    name: Comentar tabela de scores na PR
    needs: [validate-frontmatter, voice-guard, naia-schema-preview, lychee-link-check, markdown-lint]
    if: always()
    runs-on: ubuntu-latest
    timeout-minutes: 3
    steps:
      - uses: actions/download-artifact@v4
        with:
          path: artifacts
      - uses: marocchino/sticky-pull-request-comment@v2
        with:
          header: ci-editorial
          message: |
            ### CI editorial — programa GEO IPOG

            | Job | Status | Score |
            |---|---|---|
            | Frontmatter | ${{ needs.validate-frontmatter.result }} | ${{ needs.validate-frontmatter.outputs.score }} |
            | Voice Guard (>= 70) | ${{ needs.voice-guard.result }} | ${{ needs.voice-guard.outputs.score }} |
            | NAIA Schema 220-289 | ${{ needs.naia-schema-preview.result }} | ${{ needs.naia-schema-preview.outputs.passed }} |
            | Lychee link check | ${{ needs.lychee-link-check.result }} | — |
            | Markdown lint | ${{ needs.markdown-lint.result }} | — |

            Reports completos disponíveis nos artifacts da execução.
```

O gate é declarado em branch protection rule: todos os cinco jobs precisam passar antes de merge. `concurrency` cancela execuções obsoletas quando há push novo na PR. Secrets `VOICE_GUARD_URL`, `VOICE_GUARD_TOKEN`, `NAIA_AUDIT_URL` e `NAIA_AUDIT_TOKEN` estão em GitHub Environment `editorial-ci`.

---

## Bloco B — `.github/workflows/cron-pos-publish-d14.yml`

Cron diário às 04h UTC que itera sobre `content/peças-hbr/` e identifica peças com `publish_at` igual a hoje menos 14 dias. Para cada uma, dispara coleta cross-LLM via API do `geo-platform/collector` para o `prompt_ancora` da peça, calcula Mention Rate IPOG e abre PR automatizado atualizando `dashboards/KPI-DASHBOARD.md` seção 9.

```yaml
name: cron-pos-publish-d14

on:
  schedule:
    - cron: "0 4 * * *"
  workflow_dispatch:
    inputs:
      override_date:
        description: "Data ISO override (YYYY-MM-DD), apenas debug"
        required: false
        type: string

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: cron-d14
  cancel-in-progress: false

jobs:
  identificar-pecas-d14:
    name: Identificar peças D+14
    runs-on: ubuntu-latest
    timeout-minutes: 5
    outputs:
      matrix: ${{ steps.scan.outputs.matrix }}
      tem-pecas: ${{ steps.scan.outputs.tem-pecas }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install -r scripts/editorial/requirements.txt
      - id: scan
        env:
          OVERRIDE_DATE: ${{ inputs.override_date }}
        run: |
          python scripts/editorial/scan_d14.py \
            --content content/peças-hbr \
            --offset-days 14 \
            --override "${OVERRIDE_DATE:-}" \
            --output matrix.json
          echo "matrix=$(jq -c . matrix.json)" >> "$GITHUB_OUTPUT"
          echo "tem-pecas=$(jq -r 'if (.include | length) > 0 then "true" else "false" end' matrix.json)" >> "$GITHUB_OUTPUT"

  coletar-cross-llm:
    name: Coleta cross-LLM (6 LLMs)
    needs: identificar-pecas-d14
    if: needs.identificar-pecas-d14.outputs.tem-pecas == 'true'
    runs-on: ubuntu-latest
    timeout-minutes: 25
    strategy:
      fail-fast: false
      max-parallel: 2
      matrix: ${{ fromJson(needs.identificar-pecas-d14.outputs.matrix) }}
    env:
      GEO_PLATFORM_API: ${{ secrets.GEO_PLATFORM_API }}
      GEO_PLATFORM_TOKEN: ${{ secrets.GEO_PLATFORM_TOKEN }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install -r scripts/editorial/requirements.txt
      - name: Disparar coleta cross-LLM
        run: |
          python scripts/editorial/cross_llm_collect.py \
            --slug "${{ matrix.slug }}" \
            --prompt-ancora "${{ matrix.prompt_ancora }}" \
            --llms chatgpt,claude,gemini,perplexity,grok,copilot \
            --runs 3 \
            --output "metrics/d14/${{ matrix.slug }}.json"
      - uses: actions/upload-artifact@v4
        with:
          name: d14-${{ matrix.slug }}
          path: metrics/d14/${{ matrix.slug }}.json

  consolidar-pr:
    name: PR automatizado para KPI dashboard
    needs: [identificar-pecas-d14, coletar-cross-llm]
    if: needs.identificar-pecas-d14.outputs.tem-pecas == 'true'
    runs-on: ubuntu-latest
    timeout-minutes: 8
    steps:
      - uses: actions/checkout@v4
      - uses: actions/download-artifact@v4
        with:
          path: metrics/d14
          pattern: d14-*
          merge-multiple: true
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install -r scripts/editorial/requirements.txt
      - name: Atualizar seção 9 do KPI dashboard
        run: |
          python scripts/editorial/update_kpi_dashboard.py \
            --metrics metrics/d14 \
            --dashboard dashboards/KPI-DASHBOARD.md \
            --section "9. Métricas D+14 cross-LLM"
      - uses: peter-evans/create-pull-request@v6
        with:
          commit-message: "chore(metrics): atualiza KPI 7 D+14 cross-LLM"
          branch: bot/d14-${{ github.run_id }}
          delete-branch: true
          title: "Métricas D+14 cross-LLM (cron ${{ github.run_id }})"
          body: |
            PR automatizado pelo cron `cron-pos-publish-d14`.

            Atualiza `dashboards/KPI-DASHBOARD.md` seção 9 com Mention Rate IPOG
            cross-LLM (6 LLMs) das peças com `publish_at` há exatamente 14 dias.

            Revisar antes de merge: validar valores fora de banda 0-100,
            confirmar que peças listadas batem com calendário editorial.
          labels: |
            kpi-dashboard
            automated
            d14
```

O `scan_d14.py` retorna `matrix.json` em formato `{ "include": [{ "slug": "...", "prompt_ancora": "..." }, ...] }`. Quando não há peças do dia, o job `coletar-cross-llm` é pulado e o cron termina silencioso. Os secrets `GEO_PLATFORM_API` e `GEO_PLATFORM_TOKEN` apontam para o collector do `geo-platform` reutilizado.

---

## Bloco C — Cloudflare Worker classificador de tráfego LLM

O Worker fica na borda Cloudflare em frente ao origin do ipog.edu.br. Lê o header `Referer`, classifica em uma lista canônica de domínios LLM, injeta `utm_source` dedicado quando ausente (não sobrescreve UTMs explícitos da peça), persiste evento custom no Axiom e adiciona dois headers de telemetria ao response (`X-LLM-Origin`, `X-LLM-Source`) para o Next.js do IPOG ler no SSR.

```typescript
// workers/llm-traffic-classifier/src/index.ts
/**
 * Classifica trafego de entrada por referrer LLM e injeta UTM dedicado.
 * Cross-link com KPI 7 Conversion Lift do programa GEO IPOG.
 *
 * Cohort canonico: ChatGPT, Claude, Gemini, Perplexity, Grok, Copilot.
 * Politica: nao sobrescrever UTMs explicitos. Apenas anexar quando ausentes.
 */

export interface Env {
  ORIGIN_HOST: string;
  AXIOM_DATASET: string;
  AXIOM_TOKEN: string;
  ENVIRONMENT: "production" | "staging";
}

interface LlmDescriptor {
  source: string;
  medium: "ai-organic";
  campaign: string;
}

const LLM_REFERRERS: Record<string, LlmDescriptor> = {
  "chatgpt.com": { source: "chatgpt", medium: "ai-organic", campaign: "geo-ipog" },
  "chat.openai.com": { source: "chatgpt", medium: "ai-organic", campaign: "geo-ipog" },
  "claude.ai": { source: "claude", medium: "ai-organic", campaign: "geo-ipog" },
  "gemini.google.com": { source: "gemini", medium: "ai-organic", campaign: "geo-ipog" },
  "perplexity.ai": { source: "perplexity", medium: "ai-organic", campaign: "geo-ipog" },
  "www.perplexity.ai": { source: "perplexity", medium: "ai-organic", campaign: "geo-ipog" },
  "grok.com": { source: "grok", medium: "ai-organic", campaign: "geo-ipog" },
  "x.com/i/grok": { source: "grok", medium: "ai-organic", campaign: "geo-ipog" },
  "copilot.microsoft.com": { source: "copilot", medium: "ai-organic", campaign: "geo-ipog" },
};

function classifyReferrer(refererHeader: string | null): LlmDescriptor | null {
  if (!refererHeader) return null;
  let host: string;
  let pathname: string;
  try {
    const url = new URL(refererHeader);
    host = url.hostname.toLowerCase();
    pathname = url.pathname.toLowerCase();
  } catch {
    return null;
  }
  const direct = LLM_REFERRERS[host];
  if (direct) return direct;
  const composite = `${host}${pathname}`.replace(/\/$/, "");
  for (const key of Object.keys(LLM_REFERRERS)) {
    if (key.includes("/") && composite.startsWith(key)) {
      return LLM_REFERRERS[key];
    }
  }
  return null;
}

function hasExplicitUtm(url: URL): boolean {
  return url.searchParams.has("utm_source") ||
    url.searchParams.has("utm_medium") ||
    url.searchParams.has("utm_campaign");
}

function annotateUrl(url: URL, llm: LlmDescriptor): URL {
  if (hasExplicitUtm(url)) return url;
  url.searchParams.set("utm_source", llm.source);
  url.searchParams.set("utm_medium", llm.medium);
  url.searchParams.set("utm_campaign", llm.campaign);
  return url;
}

async function logToAxiom(env: Env, payload: Record<string, unknown>): Promise<void> {
  if (env.ENVIRONMENT !== "production") return;
  const endpoint = `https://api.axiom.co/v1/datasets/${env.AXIOM_DATASET}/ingest`;
  await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.AXIOM_TOKEN}`,
    },
    body: JSON.stringify([{ _time: new Date().toISOString(), ...payload }]),
  });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const incoming = new URL(request.url);
    const referer = request.headers.get("Referer");
    const llm = classifyReferrer(referer);

    const target = new URL(incoming.toString());
    target.host = env.ORIGIN_HOST;
    target.protocol = "https:";

    let llmHeaders: Record<string, string> = {};
    if (llm) {
      annotateUrl(target, llm);
      llmHeaders = {
        "X-LLM-Origin": referer ?? "unknown",
        "X-LLM-Source": llm.source,
      };
      ctx.waitUntil(
        logToAxiom(env, {
          event: "llm_traffic_classified",
          source: llm.source,
          referer: referer,
          path: incoming.pathname,
          ua: request.headers.get("User-Agent"),
          country: request.cf?.country ?? null,
          colo: request.cf?.colo ?? null,
        })
      );
    }

    const upstream = await fetch(target.toString(), {
      method: request.method,
      headers: request.headers,
      body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
      redirect: "manual",
    });

    const response = new Response(upstream.body, upstream);
    for (const [k, v] of Object.entries(llmHeaders)) {
      response.headers.set(k, v);
    }
    response.headers.set("X-Worker", "llm-traffic-classifier");
    return response;
  },
};
```

Configuração do Worker em `wrangler.toml`. Routes cobrem o apex e o subdomínio de blog. Variáveis de ambiente sensíveis ficam em secrets do wrangler.

```toml
# workers/llm-traffic-classifier/wrangler.toml
name = "llm-traffic-classifier"
main = "src/index.ts"
compatibility_date = "2026-04-15"
compatibility_flags = ["nodejs_compat"]

[vars]
ORIGIN_HOST = "origin.ipog.edu.br"
AXIOM_DATASET = "geo-ipog-llm-traffic"
ENVIRONMENT = "production"

[[routes]]
pattern = "ipog.edu.br/blog/*"
zone_name = "ipog.edu.br"

[[routes]]
pattern = "www.ipog.edu.br/blog/*"
zone_name = "ipog.edu.br"

[observability]
enabled = true
head_sampling_rate = 1
```

`AXIOM_TOKEN` é registrado via `wrangler secret put AXIOM_TOKEN --env production`. Em staging, `ENVIRONMENT=staging` e o `logToAxiom` é no-op para não poluir o dataset com tráfego de teste.

---

## Bloco D — Schema JSON-LD canônico Article + Person + EducationalOrganization

JSON-LD que vai injetado no `<head>` da Peça 1 de Alexandre Caramaschi. Usa `@graph` com quatro nós interligados via `@id`: o Article, o Person (Alexandre), a EducationalOrganization (IPOG) e o EducationalOccupationalProgram (MBA Online em Psicologia Organizacional e do Trabalho).

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@id": "https://ipog.edu.br/blog/categoria-mba-online-psicologia-que-ainda-nao-existe#article",
      "@type": "Article",
      "headline": "A categoria de MBA online em Psicologia Organizacional que ainda nao existe",
      "alternativeHeadline": "Por que o mercado de pos brasileiro nao categorizou MBA online em psicologia do trabalho e o que muda quando essa categoria nasce",
      "datePublished": "2026-06-02T09:00:00-03:00",
      "dateModified": "2026-06-02T09:00:00-03:00",
      "inLanguage": "pt-BR",
      "isAccessibleForFree": true,
      "wordCount": 2400,
      "articleSection": "Pos-graduacao",
      "keywords": [
        "MBA online psicologia organizacional",
        "psicologia do trabalho",
        "pos-graduacao IPOG",
        "categoria de mercado",
        "GEO Brasil"
      ],
      "author": { "@id": "https://ipog.edu.br/autor/alexandre-caramaschi#person" },
      "publisher": { "@id": "https://ipog.edu.br/#organization" },
      "about": [
        { "@id": "https://ipog.edu.br/cursos/mba-psicologia-organizacional-trabalho#program" }
      ],
      "mentions": [
        { "@id": "https://ipog.edu.br/#organization" },
        { "@id": "https://ipog.edu.br/cursos/mba-psicologia-organizacional-trabalho#program" }
      ],
      "image": {
        "@type": "ImageObject",
        "url": "https://ipog.edu.br/blog/img/categoria-mba-online-psicologia-1200x630.jpg",
        "width": 1200,
        "height": 630
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://ipog.edu.br/blog/categoria-mba-online-psicologia-que-ainda-nao-existe"
      },
      "citation": [
        {
          "@type": "CreativeWork",
          "name": "Conselho Federal de Psicologia — Resolucao CFP 011/2018",
          "url": "https://site.cfp.org.br/wp-content/uploads/2018/06/Resolucao-CFP-011-2018.pdf"
        },
        {
          "@type": "CreativeWork",
          "name": "Sistema de Avaliacao de Testes Psicologicos (SATEPSI) — CFP",
          "url": "https://satepsi.cfp.org.br/"
        }
      ],
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["article h1", "article .resumo-executivo"]
      }
    },
    {
      "@id": "https://ipog.edu.br/autor/alexandre-caramaschi#person",
      "@type": "Person",
      "name": "Alexandre Caramaschi",
      "givenName": "Alexandre",
      "familyName": "Caramaschi",
      "jobTitle": "CEO da Brasil GEO",
      "description": "CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil. Lidera o programa GEO do IPOG.",
      "url": "https://ipog.edu.br/autor/alexandre-caramaschi",
      "sameAs": [
        "https://www.linkedin.com/in/alexandrecaramaschi/",
        "https://alexandrecaramaschi.com",
        "https://brasilgeo.com.br/equipe/alexandre-caramaschi"
      ],
      "image": "https://ipog.edu.br/autor/img/alexandre-caramaschi-512.jpg",
      "worksFor": [
        {
          "@type": "Organization",
          "name": "Brasil GEO",
          "url": "https://brasilgeo.com.br"
        }
      ],
      "alumniOf": [
        {
          "@type": "Organization",
          "name": "Semantix",
          "url": "https://semantix.ai"
        },
        {
          "@type": "Organization",
          "name": "AI Brasil",
          "url": "https://aibrasil.com.br"
        }
      ],
      "knowsAbout": [
        "Generative Engine Optimization",
        "AI Search",
        "Marketing B2B",
        "Categoria de mercado",
        "Educacao executiva"
      ],
      "knowsLanguage": ["pt-BR", "en"],
      "memberOf": { "@id": "https://ipog.edu.br/#organization" }
    },
    {
      "@id": "https://ipog.edu.br/#organization",
      "@type": "EducationalOrganization",
      "name": "IPOG — Instituto de Pos-Graduacao e Graduacao",
      "alternateName": "IPOG",
      "url": "https://ipog.edu.br",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ipog.edu.br/static/logo-ipog-512.png",
        "width": 512,
        "height": 512
      },
      "foundingDate": "2001",
      "foundingLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Goiania",
          "addressRegion": "GO",
          "addressCountry": "BR"
        }
      },
      "sameAs": [
        "https://www.linkedin.com/school/ipog-instituto/",
        "https://www.instagram.com/ipogoficial/",
        "https://www.youtube.com/@IPOGoficial"
      ],
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Pos-graduacao lato sensu reconhecida pelo MEC"
      },
      "department": [
        { "@id": "https://ipog.edu.br/cursos/mba-psicologia-organizacional-trabalho#program" }
      ]
    },
    {
      "@id": "https://ipog.edu.br/cursos/mba-psicologia-organizacional-trabalho#program",
      "@type": "EducationalOccupationalProgram",
      "name": "MBA Online em Psicologia Organizacional e do Trabalho",
      "url": "https://ipog.edu.br/cursos/mba-psicologia-organizacional-trabalho",
      "provider": { "@id": "https://ipog.edu.br/#organization" },
      "educationalProgramMode": "online",
      "programType": "MBA",
      "occupationalCategory": "27-3031.00",
      "timeToComplete": "P18M",
      "educationalCredentialAwarded": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Pos-graduacao lato sensu",
        "recognizedBy": { "@id": "https://ipog.edu.br/#organization" }
      },
      "applicationStartDate": "2026-06-02",
      "applicationDeadline": "2026-08-15",
      "offers": {
        "@type": "Offer",
        "category": "Tuition",
        "priceCurrency": "BRL",
        "availability": "https://schema.org/InStock"
      },
      "audience": {
        "@type": "EducationalAudience",
        "educationalRole": "executive"
      },
      "teaches": [
        "Psicologia organizacional",
        "Psicologia do trabalho",
        "Avaliacao psicologica SATEPSI",
        "Psicopedagogia institucional"
      ]
    }
  ]
}
```

Validação obrigatória antes do merge da peça em `master`. Dois passos: (1) Schema.org Validator em `https://validator.schema.org/` colando o JSON-LD bruto, esperando zero erros e zero warnings de tipo; (2) Google Rich Results Test em `https://search.google.com/test/rich-results` apontando para a URL preview Vercel da PR, esperando elegibilidade para Article e BreadcrumbList. Em caso de discrepância entre ambos, o Google Rich Results Test é a fonte de verdade operacional. O check NAIA-SCHEMA-220 do `06-naia-voice-guard.md` automatiza essa validação no CI via API do Schema.org Validator.

---

## Bloco E — GA4 custom events para KPI 7 Conversion Lift

Snippet inserido em `<head>` das páginas de peça HBR (via Tag Manager ou injeção direta no template Next.js do IPOG). Cinco eventos custom mapeados para o funil canônico do KPI 7: leitura completa, click no CTA do MBA, view do produto, lead gerado e matrícula efetivada. Toda chamada propaga `utm_source` capturado da URL ou do header `X-LLM-Source` injetado pelo Worker do Bloco C.

```javascript
// ga4-events.js
// Custom events do programa GEO IPOG para KPI 7 Conversion Lift.
// Cohort LLM: chatgpt, claude, gemini, perplexity, grok, copilot.

(function () {
  "use strict";

  var GA4_MEASUREMENT_ID = "G-XXXXXXXXXX";
  var IS_STAGING = window.location.hostname !== "ipog.edu.br" &&
    window.location.hostname !== "www.ipog.edu.br";

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  if (!IS_STAGING) {
    gtag("js", new Date());
    gtag("config", GA4_MEASUREMENT_ID, { send_page_view: true });
  }

  function getQueryParam(name) {
    var url = new URL(window.location.href);
    return url.searchParams.get(name);
  }

  function getLlmContext() {
    var headerSource = document.querySelector('meta[name="x-llm-source"]');
    return {
      utm_source: getQueryParam("utm_source") || (headerSource ? headerSource.content : null),
      utm_medium: getQueryParam("utm_medium") || (headerSource ? "ai-organic" : null),
      utm_campaign: getQueryParam("utm_campaign") || "geo-ipog",
      llm_referrer: document.referrer || null,
    };
  }

  function track(eventName, params) {
    var payload = Object.assign(
      {
        event_category: "geo_ipog",
        event_label: window.location.pathname,
        page_path: window.location.pathname,
        program: "geo-ipog",
        publisher: "brasil-geo",
      },
      getLlmContext(),
      params || {}
    );
    if (IS_STAGING) {
      console.info("[GA4 staging]", eventName, payload);
      return;
    }
    gtag("event", eventName, payload);
    window.dataLayer.push({ event: eventName, ga4_payload: payload });
  }

  // Evento 1 — leitura completa (>= 80% scroll do article)
  var leituraDisparada = false;
  function checkScrollLeitura() {
    if (leituraDisparada) return;
    var article = document.querySelector("article");
    if (!article) return;
    var rect = article.getBoundingClientRect();
    var total = rect.height;
    var visivel = Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top);
    var lido = (total - rect.bottom + window.innerHeight) / total;
    if (lido >= 0.8) {
      leituraDisparada = true;
      track("peca_hbr_lida_completamente", { scroll_threshold: 0.8 });
    }
  }
  window.addEventListener("scroll", checkScrollLeitura, { passive: true });

  // Evento 2 — click no CTA do MBA
  document.addEventListener("click", function (ev) {
    var alvo = ev.target.closest('[data-cta="mba-online-psicologia"]');
    if (!alvo) return;
    track("cta_mba_clicado", {
      cta_id: alvo.getAttribute("data-cta-id") || "default",
      cta_position: alvo.getAttribute("data-cta-position") || "inline",
    });
  });

  // Evento 3 — course_view (chegada na pagina do produto MBA)
  if (/\/cursos\/mba-psicologia-organizacional-trabalho/.test(window.location.pathname)) {
    track("course_view", {
      course_id: "mba-psicologia-organizacional-trabalho",
      course_name: "MBA Online em Psicologia Organizacional e do Trabalho",
    });
  }

  // Evento 4 — lead_generated (submit do form de matricula)
  document.addEventListener("submit", function (ev) {
    var form = ev.target.closest('form[data-form="matricula"]');
    if (!form) return;
    track("lead_generated", {
      form_id: form.getAttribute("id") || "matricula",
      course_id: form.getAttribute("data-course-id") || "mba-psicologia-organizacional-trabalho",
    });
  });

  // Evento 5 — matricula_efetivada (callback server-side via window event)
  window.addEventListener("ipog:matricula:confirmada", function (ev) {
    var detail = ev.detail || {};
    track("matricula_efetivada", {
      transaction_id: detail.transaction_id,
      course_id: detail.course_id || "mba-psicologia-organizacional-trabalho",
      value: detail.value,
      currency: detail.currency || "BRL",
    });
  });

  window.GeoIpogGA4 = { track: track, getLlmContext: getLlmContext };
})();
```

O evento `matricula_efetivada` é disparado pelo backend de matrícula do IPOG via `window.dispatchEvent(new CustomEvent("ipog:matricula:confirmada", { detail: { transaction_id, course_id, value, currency } }))` na página de confirmação. Em staging, todos os eventos são apenas logados em console e não chegam ao GA4 de produção. As custom dimensions `utm_source`, `utm_medium`, `utm_campaign`, `llm_referrer`, `program` e `publisher` precisam estar registradas em GA4 Admin > Custom definitions antes do go-live da Peça 1 em 02-06-2026 — sem isso, o cálculo de Conversion Lift do KPI 7 não consegue segmentar tráfego LLM contra baseline orgânico.

---

## Encerramento operacional

Os cinco blocos acima compõem a malha CI/CD + edge + telemetria que sustenta o KPI 7 Conversion Lift do programa GEO IPOG. Ordem de implantação recomendada para Bruno Azambuja e Alexandre Caramaschi: (1) registrar custom dimensions em GA4 Admin; (2) deploy do Worker `llm-traffic-classifier` em staging com `ENVIRONMENT=staging` e teste com referrers fake; (3) merge dos workflows `ci-editorial.yml` e `cron-pos-publish-d14.yml` com secrets configurados; (4) injeção do JSON-LD canônico no template Next.js da peça em pre-production; (5) deploy do Worker em produção e ativação dos custom events GA4. Toda a malha precisa estar verde até 30-05-2026 para suportar a publicação da Peça 1 em 02-06-2026 (M08).
