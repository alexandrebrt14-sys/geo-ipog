# Observability e CI/CD do Programa GEO IPOG — Dossiê Canônico 2026

> **Documento:** 07 — Engenharia de Plataforma — Observability + CI/CD do programa GEO IPOG.
> **Cliente:** IPOG (Instituto de Pós-Graduação e Graduação, Goiânia, fundado 2001).
> **Sponsor executivo:** Ronan Maia (CEO IPOG).
> **Interlocutor operacional:** Bruno Azambuja (Gerente de Marketing IPOG).
> **Executor:** Brasil GEO — Alexandre Caramaschi (CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil).
> **Janela técnica de referência:** Schema piloto 30-05-2026 (M06); pico GEO 2026.2 entre 15-06-2026 e 31-07-2026; operação contínua a partir de 01-08-2026.
> **Data:** 2026-05-01.
> **Autor da proposta:** Brasil GEO Platform Engineering.

Este documento especifica a camada de observability e a disciplina de CI/CD do programa GEO IPOG. Ele cobre logging estruturado, métricas, alerting, tracing distribuído, deployment multi-ambiente, secrets management e disaster recovery, ancorado nas decisões já tomadas em `01-solution-architecture.md` (ADR-002 Cloudflare como stack primária, ADR-009 Axiom como observability tier 1) e na disciplina FinOps de `dashboards/FINOPS-DISCIPLINA.md` (teto USD 50/sprint).

A premissa de partida é não-greenfield: o `geo-ipog/` já tem 5 workflows ativos (`quality.yml`, `labeler.yml`, `stale.yml`, `report-builder.yml`, `concorrentes-monitoring.yml`) e o programa precisa adicionar 16 novos workflows distribuídos entre `geo-platform`, `geo-dashboard` e `geo-ipog-website`. Toda decisão segue três princípios não-negociáveis: **(1) free tier first** com upgrade pago apenas quando volume justifica; **(2) observability como produto** — instrumentada desde o primeiro deploy, nunca como afterthought; **(3) deploy gates intransigentes** — nada chega em produção sem passar por staging com Voice Guard e NAIA spot-check verdes.

---

## Bloco A — Estratégia de observability (3 pilares)

A observability do programa GEO IPOG é estruturada como **três pilares complementares** — logging, métricas e tracing — aplicados a quatro superfícies distintas: backend Python (`geo-platform`), frontend Next.js (`geo-dashboard`), pipeline declarativo (`geo-ipog-website`) e camada de orquestração CI/CD (workflows GitHub Actions). Os três pilares conversam entre si por meio de um identificador canônico (`correlation_id` ULID) que propaga do request original até o último span emitido por qualquer worker.

### A.1 Pilar 1 — Logging estruturado

**Objetivo:** capturar evento de negócio + contexto técnico + custo financeiro em formato auditável, retido 30 dias online e arquivado por 24 meses para reconciliação FinOps.

**Tecnologia recomendada:**

- **Python (`geo-platform`):** `structlog` 24.x configurado para JSON com timestamps ISO 8601 UTC. Adapter customizado escreve para `stdout` (capturado pelo runtime Cloudflare Workers ou por GitHub Actions) e em paralelo faz `httpx.post` assíncrono para o endpoint Axiom Ingest. Buffer de até 50 eventos com flush a cada 2 segundos para amortecer latência.
- **Next.js (`geo-dashboard`):** `pino` 9.x em modo edge-runtime-compatible para o middleware e API Routes; `pino-pretty` apenas em ambiente local. No browser, `console.log` é interceptado em produção e enviado em batch a `/api/log` que repassa para Axiom (segregado por `service: "geo-dashboard-client"`).
- **Workflows GitHub Actions:** ações `actions/upload-artifact@v4` para logs verbosos (debug), e `actions/github-script@v7` para emitir eventos sumarizados em Axiom (apenas summary do job: tempo, exit code, custo estimado).

**Alternativas consideradas:**

- **Datadog Logs**: poder, dashboards prontos, mas USD 0,10 por GB ingerido + USD 1,70 por milhão de eventos retidos — insustentável no teto FinOps.
- **Grafana Cloud Logs (Loki)**: free tier 50 GB/mês ingestão. Bom equilíbrio, mas cardinalidade de labels é restritiva e requer Promtail/agent dedicado em cada Worker.
- **CloudWatch / Stackdriver**: lock-in profundo em AWS/GCP que o programa explicitamente evita (ADR-002).

**Custo mensal estimado:**

- Axiom Free Tier: 0,5 GB/mês de ingestão, retenção 30 dias — USD 0/mês.
- Axiom Hobby: USD 25/mês fixo + 0,5 GB extra inclusos quando volume passar 0,5 GB/mês (esperado a partir de M07 quando coleta diária estiver em produção).
- Estimativa de volume em produção plena: 200 MB/mês (coleta diária) + 50 MB/mês (NAIA) + 100 MB/mês (dashboard server-side) + 80 MB/mês (workflows) = **430 MB/mês** — cabe no free tier com folga até pico 2026.2.

**Retenção:**

- 30 dias hot em Axiom (free + Hobby tier).
- Snapshot mensal exportado via Axiom Export API para `data/observability/logs-YYYY-MM.parquet` no R2 (retenção indefinida, custo USD 0,015/GB/mês).

**Integração entre pilares:** todo log JSON inclui `trace_id` e `span_id` quando emitido dentro de uma operação tracable, permitindo `JOIN` em queries Axiom (APL) entre log line e trace span.

### A.2 Pilar 2 — Métricas (counters, histograms, gauges)

**Objetivo:** alimentar SLOs (Bloco J), dashboard FinOps (Bloco K) e regras de alerting (Bloco E) com agregações numéricas de baixa cardinalidade, retidas 13 meses para year-over-year analysis.

**Tecnologia recomendada:**

- **OpenTelemetry SDK** (`opentelemetry-sdk` 1.27.x para Python, `@opentelemetry/sdk-node` 0.55.x para Node) com **OTLP exporter HTTP** apontando para Axiom (Axiom aceita OTLP nativo desde abril 2024). Métricas são agregadas localmente no Worker com janela de 60 segundos e exportadas em batch.
- **Cloudflare Workers Analytics Engine** como backup de métricas críticas (custo USD 0,25 por milhão de data points, free tier 10 milhões/mês). Usa-se para métricas que precisam ser consultadas pelo `geo-dashboard` direto sem ir a Axiom.
- **Cloudflare Web Analytics** (gratuito, sem cookies) para Real User Monitoring no `geo-dashboard` — page views, Core Web Vitals, bot detection.

**Alternativas consideradas:**

- **Prometheus self-hosted no Cloudflare Workers**: viável via Container Workers (beta), mas adiciona complexidade operacional de scrape + storage. Reavaliar quando programa escalar para múltiplos clientes em 2027.1.
- **Datadog Metrics**: USD 18/host/mês — economicamente inviável para o programa.
- **InfluxDB Cloud Free**: 30 dias retenção apenas, sem OTLP nativo.

**Custo mensal estimado:** USD 0 em free tier Axiom + Cloudflare Analytics Engine para volume de até 10 M data points/mês. Volume esperado em pico: ~3 M data points/mês.

**Retenção:**

- 13 meses em Axiom (suficiente para year-over-year do KPI 8 Delta pré/pós).
- Cloudflare Analytics Engine: 90 dias (suficiente para queries operacionais do dashboard).

**Integração entre pilares:** métricas relevantes ao log são publicadas com mesmo `service` e `event` que o log estruturado, permitindo correlacionar uma métrica anômala ao log line correspondente em uma única query APL.

### A.3 Pilar 3 — Tracing distribuído

**Objetivo:** observar latência por hop (Dashboard → API Route → Orchestrator → 6× LLM Workers → Drift Detector → Persistence) e localizar gargalos em workflow editorial e coleta paralela.

**Tecnologia recomendada:**

- **OpenTelemetry SDK + W3C Trace Context propagators** em Python e TypeScript. Sampler probabilístico **5% de requests `info`**, **100% de requests `error`**, **100% de drift events**, **100% em ambiente de homologação** (decisão confirmada no Bloco F).
- **Axiom Traces** como backend (recebe OTLP/HTTP nativamente, dashboards de service map e flame graph prontos).
- **Sentry Performance** (free tier 10 k transactions/mês) como segundo destino apenas para `geo-dashboard` (RUM frontend), permitindo correlacionar erro de UI com trace de backend pelo `trace_id` propagado em headers `traceparent`.

**Alternativas consideradas:**

- **Honeycomb**: poder analítico superior, mas tier gratuito limita 20 M eventos/mês de tracing e UX é mais técnica.
- **Tempo (Grafana)**: bom para self-hosted; complexidade de operar Tempo + S3-compatible storage é overhead.
- **Jaeger self-hosted**: zero custo de licença, alto custo operacional.

**Custo mensal estimado:** USD 0 no free tier Axiom + Sentry. Volume esperado < 100 k spans/mês com sampler 5%.

**Retenção:** 30 dias hot em Axiom; export mensal do P95/P99 por endpoint para `data/observability/traces-summary-YYYY-MM.parquet`.

**Integração entre pilares:** todo span tem `trace_id` igual ao do log line associado; métricas registram `trace.exemplar` para o span representativo de cada bucket de histograma, permitindo "drill-down" em P99 de latência diretamente para o trace causador.

### A.4 Aplicação por superfície

| Superfície | Logging | Métricas | Tracing |
|---|---|---|---|
| `geo-platform` Python | structlog → Axiom Ingest | OTel SDK Python → OTLP/Axiom + Analytics Engine | OTel Python + httpx instrumentor |
| `geo-dashboard` Next.js (server) | pino → Axiom Ingest | OTel Node → OTLP/Axiom | OTel Node + Sentry |
| `geo-dashboard` Next.js (browser) | pino client + `/api/log` | web-vitals → `/api/metrics` → Axiom | `traceparent` header propagado |
| `geo-ipog-website` deploy pipeline | logs do GitHub Actions + Axiom event de deploy | Counter `deploy_success_total` | span do workflow inteiro |
| GitHub Actions workflows (todos os 22) | logs nativos + summary em Axiom | Counter `workflow_runs_total{name,outcome}` | span por job + step |

---

## Bloco B — Stack de observability

A pilha completa cabe em um diagrama mental simples: **emissores** (apps + workers + workflows) → **coletor leve** (Axiom Ingest API direta + OTLP/HTTP) → **backend** (Axiom + Sentry + Cloudflare Analytics Engine) → **consumidores** (Axiom dashboards, Sentry alerts, painel FinOps próprio do `geo-dashboard`, regras de alerting).

### B.1 Logging — Pino (Node) + structlog (Python)

**Por quê duas bibliotecas:** ambas geram JSON estruturado idêntico, mas idiomaticamente nativas em cada runtime. Pino é a referência de performance em Node (2-5× mais rápido que Winston); structlog é a referência em Python (12 k stars, suporte oficial a `contextvars` para correlation_id automático). Tentar uniformizar (ex.: usar pino-py) traria perda de qualidade em Python.

**Configuração canônica Python (`geo-platform/src/observability/logging.py`):**

```python
"""Structured logging para geo-platform via structlog + Axiom Ingest."""
from __future__ import annotations

import logging
import os
import sys
from datetime import datetime, timezone
from decimal import Decimal
from typing import Any

import httpx
import structlog
from structlog.contextvars import bind_contextvars, merge_contextvars
from structlog.processors import (
    JSONRenderer,
    TimeStamper,
    add_log_level,
    format_exc_info,
)


AXIOM_INGEST_URL = "https://api.axiom.co/v1/datasets/{dataset}/ingest"
AXIOM_TOKEN = os.environ["AXIOM_TOKEN"]
AXIOM_DATASET = os.environ.get("AXIOM_DATASET", "geo-ipog-prod")
SERVICE_NAME = os.environ.get("OTEL_SERVICE_NAME", "geo-collector")
ENV = os.environ.get("DEPLOY_ENV", "dev")


def _decimal_default(obj: Any) -> Any:
    if isinstance(obj, Decimal):
        return float(obj)
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f"Tipo não serializável: {type(obj).__name__}")


def _axiom_processor(_logger, _method, event_dict: dict) -> dict:
    """Envia o evento para Axiom em batch assíncrono fire-and-forget."""
    payload = {
        **event_dict,
        "service": SERVICE_NAME,
        "env": ENV,
    }
    if ENV != "dev":
        try:
            httpx.post(
                AXIOM_INGEST_URL.format(dataset=AXIOM_DATASET),
                headers={
                    "Authorization": f"Bearer {AXIOM_TOKEN}",
                    "Content-Type": "application/json",
                },
                json=[payload],
                timeout=2.0,
            )
        except httpx.HTTPError:
            # Nunca derrubar o processo principal por falha de telemetria.
            sys.stderr.write("[observability] axiom ingest failed (suppressed)\n")
    return event_dict


def configure_logging(level: str = "INFO") -> None:
    """Configura structlog com pipeline canônico do programa GEO IPOG."""
    logging.basicConfig(
        format="%(message)s",
        stream=sys.stdout,
        level=getattr(logging, level.upper()),
    )
    structlog.configure(
        processors=[
            merge_contextvars,
            add_log_level,
            TimeStamper(fmt="iso", utc=True, key="ts"),
            format_exc_info,
            _axiom_processor,
            JSONRenderer(default=_decimal_default),
        ],
        wrapper_class=structlog.make_filtering_bound_logger(
            getattr(logging, level.upper())
        ),
        context_class=dict,
        logger_factory=structlog.PrintLoggerFactory(),
        cache_logger_on_first_use=True,
    )


def bind_request_context(correlation_id: str, trace_id: str | None = None) -> None:
    """Vincula correlation_id à execução atual via contextvars (thread-safe)."""
    bind_contextvars(correlation_id=correlation_id, trace_id=trace_id)
```

**Configuração canônica Node (`geo-dashboard/lib/observability.ts`):**

```typescript
// Pino logger compartilhado entre middleware, API Routes e RSC.
import pino from "pino";
import { trace } from "@opentelemetry/api";

const AXIOM_TOKEN = process.env.AXIOM_TOKEN!;
const AXIOM_DATASET = process.env.AXIOM_DATASET ?? "geo-ipog-prod";
const SERVICE_NAME = process.env.OTEL_SERVICE_NAME ?? "geo-dashboard";
const ENV = process.env.DEPLOY_ENV ?? "dev";

const transport =
  ENV === "dev"
    ? { target: "pino-pretty", options: { colorize: true } }
    : {
        target: "pino-axiom",
        options: {
          token: AXIOM_TOKEN,
          dataset: AXIOM_DATASET,
        },
      };

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  base: { service: SERVICE_NAME, env: ENV },
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => ({ level: label }),
  },
  mixin: () => {
    const span = trace.getActiveSpan();
    if (!span) return {};
    const ctx = span.spanContext();
    return { trace_id: ctx.traceId, span_id: ctx.spanId };
  },
  transport,
});

export function withCorrelationId<T extends object>(
  correlationId: string,
  fields: T = {} as T,
) {
  return logger.child({ correlation_id: correlationId, ...fields });
}
```

### B.2 Métricas — OpenTelemetry SDK + OTLP + Axiom

OTel é o padrão neutro adotado pelo programa por evitar lock-in (alinhado a ADR-002). Métricas são emitidas em três tipos canônicos:

- **Counter:** monotônico crescente. Exemplos: `geo_collector_calls_total`, `voice_guard_gates_failed_total`.
- **Histogram:** distribuição de valores numéricos. Exemplos: `geo_collector_call_duration_seconds`, `kpi_dashboard_load_seconds`.
- **Gauge** (via UpDownCounter ou ObservableGauge): valor instantâneo. Exemplos: `circuit_breaker_state`, `naia_schema_coverage_score`.

**Configuração Python (`geo-platform/src/observability/metrics.py`):**

```python
"""OpenTelemetry metrics SDK exportando para Axiom via OTLP/HTTP."""
from __future__ import annotations

import os

from opentelemetry import metrics
from opentelemetry.exporter.otlp.proto.http.metric_exporter import OTLPMetricExporter
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.sdk.metrics.export import PeriodicExportingMetricReader
from opentelemetry.sdk.resources import Resource


def configure_metrics() -> metrics.Meter:
    resource = Resource.create(
        {
            "service.name": os.environ.get("OTEL_SERVICE_NAME", "geo-collector"),
            "service.version": os.environ.get("APP_VERSION", "0.0.0"),
            "deployment.environment": os.environ.get("DEPLOY_ENV", "dev"),
        }
    )
    exporter = OTLPMetricExporter(
        endpoint="https://api.axiom.co/v1/traces",
        headers={
            "Authorization": f"Bearer {os.environ['AXIOM_TOKEN']}",
            "X-Axiom-Dataset": os.environ.get("AXIOM_METRICS_DATASET", "geo-ipog-metrics"),
        },
    )
    reader = PeriodicExportingMetricReader(exporter, export_interval_millis=60_000)
    provider = MeterProvider(resource=resource, metric_readers=[reader])
    metrics.set_meter_provider(provider)
    return metrics.get_meter("geo-platform")


# Instrumentos canônicos do programa (ver Bloco D para a lista completa).
meter = configure_metrics()
calls_total = meter.create_counter(
    "geo_collector_calls_total",
    description="Total de chamadas ao cohort cross-LLM",
    unit="1",
)
call_duration = meter.create_histogram(
    "geo_collector_call_duration_seconds",
    description="Duração de cada chamada ao provedor LLM",
    unit="s",
)
cost_brl_total = meter.create_counter(
    "geo_collector_cost_brl_total",
    description="Custo acumulado em BRL por chamada LLM",
    unit="BRL",
)
```

### B.3 Tracing — OTel SDK + sampler probabilístico

Sampler é a chave para conciliar visibilidade com custo. A regra do programa:

```python
# geo-platform/src/observability/tracing.py
from opentelemetry.sdk.trace.sampling import (
    ParentBased,
    Sampler,
    SamplingResult,
    Decision,
    TraceIdRatioBased,
)


class GeoIpogSampler(Sampler):
    """Sampler customizado que força 100% em erros e drift, 5% em info."""

    def __init__(self) -> None:
        self._info_sampler = TraceIdRatioBased(0.05)
        self._homolog = os.environ.get("DEPLOY_ENV") == "staging"

    def should_sample(self, parent_context, trace_id, name, kind=None,
                      attributes=None, links=None, trace_state=None):
        attrs = attributes or {}
        if self._homolog:
            return SamplingResult(Decision.RECORD_AND_SAMPLE, attrs, trace_state)
        if attrs.get("event.type") in {"error", "drift", "circuit_open"}:
            return SamplingResult(Decision.RECORD_AND_SAMPLE, attrs, trace_state)
        if attrs.get("level") == "error":
            return SamplingResult(Decision.RECORD_AND_SAMPLE, attrs, trace_state)
        return self._info_sampler.should_sample(
            parent_context, trace_id, name, kind, attributes, links, trace_state
        )

    def get_description(self) -> str:
        return "GeoIpogSampler(info=0.05, error=1.0, homolog=1.0)"
```

### B.4 Error tracking — Sentry

- **`geo-dashboard`**: SDK `@sentry/nextjs` com 5 k erros/mês free tier suficiente para Fase 1-3. Integração nativa com `next.config.ts` para source maps e tunneling de eventos via `/monitoring` route (escapa de adblockers).
- **`geo-platform`**: Sentry **não** é usado; erros são capturados pelo log estruturado com `level: error` e `event: *.errored`. Razão: o backend Python já roda em Workers Cloudflare onde Sentry SDK precisa workarounds; e Axiom resolve 100% do escopo de error tracking de backend com queries APL.

### B.5 Real User Monitoring — Cloudflare Web Analytics + web-vitals

- **Cloudflare Web Analytics** habilitado em `geo-dashboard` (1 linha de script, gratuito, sem cookies, GDPR-compliant). Fornece page views, top pages, browser/OS, country.
- **web-vitals** (biblioteca oficial Google, 1 KB) emite LCP, FID, CLS, INP, TTFB para `/api/metrics` que repassa para Axiom com `service: "geo-dashboard-rum"`. Permite correlacionar Core Web Vitals a route, user_role e build version.

### B.6 Synthetic monitoring — Cloudflare Trace + Checkly

- **Cloudflare Trace** (gratuito, parte do plano Workers) faz health-checks dos endpoints críticos a cada 60 segundos: `https://geo-dashboard.brasilgeo.com/healthz`, `https://collector.geo-platform.brasilgeo.com/healthz`, `https://www.ipog.edu.br/llms.txt`.
- **Checkly** (free tier 10 k checks/mês, USD 80/mês acima) executa cenários sintéticos mais sofisticados: login no dashboard, render do KPI 1, render do KPI 4, fetch de Schema canônico de 3 produtos. Janela de execução: 1 vez/hora.

### B.7 Cost monitoring — OpenCost + dashboard FinOps próprio

- **OpenCost** (open-source, self-hosted no próprio Cloudflare Worker) consome a Cloudflare Workers Analytics API e a Axiom usage API para gerar custo por serviço/ambiente/dia.
- **Dashboard FinOps** vive em `geo-dashboard/finops/` (route `/finops`, acesso restrito a Alexandre + Bruno via Cloudflare Access). Mostra: custo LLM por sprint vs teto, custo Cloudflare por mês, custo Axiom (ingest GB), custo GitHub Actions (minutos consumidos). Alerta visual quando >80% de qualquer teto.

---

## Bloco C — Schema canônico de logs estruturados

Todo log emitido por qualquer componente do programa GEO IPOG **deve** seguir o schema canônico abaixo. Logs sem campos canônicos são rejeitados pelo CI gate `ci-validate-log-schema` (parte do `quality.yml`).

### C.1 Modelo Pydantic canônico

```python
# geo-platform/src/observability/events.py
"""Schema canônico de eventos de log do programa GEO IPOG."""
from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

ServiceName = Literal[
    "geo-collector",
    "naia-audit",
    "voice-guard",
    "geo-dashboard",
    "schema-deploy",
    "reporting",
    "drift-detector",
    "finops-tracker",
]

LevelName = Literal["debug", "info", "warn", "error", "fatal"]


class LogEvent(BaseModel):
    """Schema canônico de log estruturado.

    Todo log do programa GEO IPOG deve serializar uma instância deste modelo.
    Campos extras vão em `metadata` para preservar baixa cardinalidade dos
    campos top-level (importante para queries Axiom eficientes).
    """

    model_config = ConfigDict(extra="forbid")

    ts: datetime = Field(..., description="ISO 8601 UTC")
    level: LevelName
    service: ServiceName
    env: Literal["dev", "staging", "production"]
    correlation_id: str = Field(..., description="ULID propagado por toda a request")
    span_id: str | None = None
    trace_id: str | None = None
    event: str = Field(..., description="nome canônico do evento, ex llm.call.completed")
    metadata: dict = Field(default_factory=dict)
    cost_brl: Decimal | None = Field(None, description="custo em BRL quando aplicável")
    duration_ms: int | None = Field(None, ge=0)
    sprint_id: str | None = Field(None, description="ex 2026-S05")
    wave_id: str | None = None
```

### C.2 Catálogo canônico de eventos (24 eventos)

Eventos são nomeados em **`<dominio>.<acao>.<resultado>`**. Catálogo abaixo é a fonte de verdade do programa; novos eventos exigem PR contra `geo-platform/src/observability/events.py` aprovado por Alexandre Caramaschi.

| # | Event | Service | Quando emite | Metadata canônica |
|---|---|---|---|---|
| 1 | `llm.call.started` | geo-collector | Início de cada request a provider LLM | `provider, model, prompt_id, tokens_input` |
| 2 | `llm.call.completed` | geo-collector | Resposta 2xx do provider | `provider, model, prompt_id, tokens_input, tokens_output, cost_brl, latency_ms` |
| 3 | `llm.call.cache_hit` | geo-collector | SHA-256 cache resolve sem chamada externa | `provider, model, prompt_id, cache_key` |
| 4 | `llm.call.errored` | geo-collector | Resposta 4xx/5xx ou timeout do provider | `provider, model, prompt_id, error_code, http_status, retry_attempt` |
| 5 | `llm.call.budget_alert` | geo-collector | Soma de `cost_brl` no sprint atinge 60/80/95/100% | `provider, sprint_id, threshold_pct, accumulated_brl` |
| 6 | `naia.audit.started` | naia-audit | Início de full audit ou spot-check | `audit_id, mode, target_url` |
| 7 | `naia.check.passed` | naia-audit | Check NAIA-XXX passa | `check_id, severity, target_url` |
| 8 | `naia.check.failed` | naia-audit | Check NAIA-XXX falha | `check_id, severity, target_url, gap_summary, github_issue_url` |
| 9 | `naia.audit.completed` | naia-audit | Audit completa com sumário | `audit_id, total_checks, passed, failed_p0, failed_p1, schema_coverage_score` |
| 10 | `voice_guard.check.started` | voice-guard | Início de scoring de peça | `file_path, file_hash` |
| 11 | `voice_guard.score.calculated` | voice-guard | Score 0-100 calculado | `file_path, score, dimensions: {voz, hbr, bloom, deny_list}` |
| 12 | `voice_guard.gate.failed` | voice-guard | Score < 70 bloqueia merge | `file_path, score, dimension_failed, ci_run_url` |
| 13 | `drift.detected.suspect` | drift-detector | Heurística sugere drift mas não confirmado | `provider, model, baseline_hash, observed_hash, divergence_score` |
| 14 | `drift.detected.confirmed` | drift-detector | 2 leituras consecutivas confirmam drift | `provider, model, baseline_version, observed_version, segmentation_marker` |
| 15 | `circuit.opened` | geo-collector | Circuit breaker abre por 3 falhas consecutivas | `provider, last_error, failure_count` |
| 16 | `circuit.closed` | geo-collector | Health check retorna sucesso | `provider, downtime_seconds` |
| 17 | `circuit.half_open` | geo-collector | Probe iniciado após cooldown | `provider, cooldown_elapsed_seconds` |
| 18 | `deploy.started` | schema-deploy / dashboard | Push gatilha workflow de deploy | `repo, env, git_sha, actor` |
| 19 | `deploy.succeeded` | schema-deploy / dashboard | Cloudflare Pages/Workers confirma deploy | `repo, env, git_sha, deploy_url, lead_time_seconds` |
| 20 | `deploy.failed` | schema-deploy / dashboard | Pipeline de deploy falha | `repo, env, git_sha, failed_step, failed_reason` |
| 21 | `deploy.rolled_back` | schema-deploy / dashboard | Rollback automático ou manual | `repo, env, from_sha, to_sha, reason` |
| 22 | `report.generation.started` | reporting | Início de geração de relatório | `cadence: weekly/monthly/quarterly, period` |
| 23 | `report.generation.completed` | reporting | Markdown + HTML publicados | `cadence, period, output_path, kpis_count` |
| 24 | `kpi.alert.triggered` | reporting | Regra de alerta dispara | `kpi_id, severity, observed_value, threshold, github_issue_url` |

### C.3 Convenções complementares

- **Cardinalidade**: campos top-level **nunca** carregam IDs de alta cardinalidade (URLs, hashes longos, prompt completo). Esses vão em `metadata`. Cardinalidade alta em top-level explode custo de indexação no Axiom.
- **PII**: nenhum log carrega dados pessoais identificáveis de alunos/candidatos. UTM clicks são agregados em métricas, não em logs.
- **Idempotência**: eventos de deploy e alerta carregam `correlation_id` derivado do git_sha + run_id, garantindo que reprocessamento não duplique alerta no Axiom.
- **Relação log/trace**: quando `trace_id` está presente, a query Axiom `JOIN traces` é trivial; quando ausente (jobs cron sem trace), `correlation_id` cumpre o papel.

---

## Bloco D — Métricas canônicas

Lista de **17 métricas canônicas** alinhadas aos 8 KPIs do programa e às quatro dimensões operacionais (coleta, NAIA, editorial, deploy). Cada métrica tem nome, tipo, unidade, labels, fonte da medida e KPI/SLO ao qual alimenta.

### D.1 Coleta cross-LLM

| Métrica | Tipo | Unidade | Labels | Fonte | Alimenta |
|---|---|---|---|---|---|
| `geo_collector_calls_total` | Counter | 1 | `provider, model, status` | Cada chamada a provider | KPI 1, 2 (volume base) |
| `geo_collector_call_duration_seconds` | Histogram | s | `provider, model` | Wall-clock entre `started` e `completed` | SLO B.1 (p95 ≤ 8s) |
| `geo_collector_cost_brl_total` | Counter | BRL | `provider, model, date` | Cálculo a partir de `tokens_input/output × pricing` | FinOps + budget guard |
| `geo_collector_cache_hit_ratio` | Gauge | ratio 0-1 | `provider` | janela móvel 1h: hits / (hits+misses) | Otimização FinOps |
| `geo_collector_drift_events_total` | Counter | 1 | `provider, severity: suspect/confirmed` | Drift detector | R-006 |

### D.2 NAIA Audit

| Métrica | Tipo | Unidade | Labels | Fonte | Alimenta |
|---|---|---|---|---|---|
| `naia_check_results_total` | Counter | 1 | `check_id, status: passed/failed, severity` | Cada check NAIA-XXX | KPI 4 |
| `naia_schema_coverage_score` | Gauge | 0-100 | `date` | Pós-audit completo, snapshot diário | KPI 4 (Schema Coverage Score) |
| `naia_audit_duration_seconds` | Histogram | s | `mode: full/spot` | Audit completo ou spot-check | SLO B.2 (full ≤30 min, spot ≤90s) |

### D.3 Voice Guard

| Métrica | Tipo | Unidade | Labels | Fonte | Alimenta |
|---|---|---|---|---|---|
| `voice_guard_scores_histogram` | Histogram | 0-100 | `file_type: article/landing/social` | Score calculado por peça | KPI editorial |
| `voice_guard_gates_failed_total` | Counter | 1 | `dimension: voz/hbr/bloom/deny_list` | Score < 70 | Quality gate |

### D.4 Dashboard + RUM

| Métrica | Tipo | Unidade | Labels | Fonte | Alimenta |
|---|---|---|---|---|---|
| `dashboard_page_views_total` | Counter | 1 | `route, user_role: alex/bruno/ronan/conselho` | Server middleware | Operacional |
| `kpi_dashboard_load_seconds` | Histogram | s | `route` | web-vitals LCP | SLO B.4 (p95 ≤ 2,5s) |

### D.5 Resilience + budget

| Métrica | Tipo | Unidade | Labels | Fonte | Alimenta |
|---|---|---|---|---|---|
| `circuit_breaker_state` | Gauge | 0=closed/1=half_open/2=open | `provider` | State machine do collector | Alerta P0 |
| `budget_guard_alert_level` | Gauge | 0-100 (% do teto) | `provider, sprint_id` | Soma cost_brl / teto | FinOps + Bloco E.1 |

### D.6 Reporting + deploys

| Métrica | Tipo | Unidade | Labels | Fonte | Alimenta |
|---|---|---|---|---|---|
| `report_generation_duration_seconds` | Histogram | s | `cadence: weekly/monthly/quarterly` | Reporting service | SLO operacional |
| `deployment_lead_time_seconds` | Histogram | s | `repo, env: staging/production` | Tempo entre `deploy.started` e `deploy.succeeded` | DORA metric |
| `deployment_failure_rate` | Gauge | ratio 0-1 | `repo, env` | Janela 30 dias: failed / total | DORA metric + SLO B.5 |

### D.7 Convenções de cardinalidade

- Total de séries únicas por métrica deve ficar abaixo de **500** para conter custo do Axiom.
- `provider × model × status` = 6 × 8 × 4 = 192 séries — dentro do orçamento.
- Labels de alta cardinalidade (correlation_id, prompt_id) **vão em logs/traces, não em métricas**.

---

## Bloco E — Alerting + escalation

O programa GEO IPOG opera **8 regras canônicas de alerting** em três níveis de severidade. Toda regra tem trigger declarativo (Axiom Alert Rule), canal de notificação, runbook de resposta e mecanismo de idempotência via GitHub Issue.

### E.1 Matriz de regras

| ID | Severidade | Trigger | Janela | Canais | Runbook | Idempotência |
|---|---|---|---|---|---|---|
| ALR-001 | P0 | `budget_guard_alert_level{provider!="perplexity"} >= 100` | imediata | E-mail Alexandre + GitHub Issue P0 + emergency stop do provider | `dashboards/RUNBOOK-COLETA-LLM.md` §budget | Issue title `[P0] Budget guard 100% — {provider} — sprint {sprint_id}`; 1 issue por sprint+provider |
| ALR-002 | P0 | `circuit_breaker_state == 2 for 30m` | 30 min | E-mail Alexandre + Slack `#geo-ipog-alerts` | `RUNBOOK-COLETA-LLM.md` §circuit | Issue por provider+dia |
| ALR-003 | P1 | `drift.detected.confirmed` evento aparece | imediata | GitHub Issue auto + e-mail Alexandre + Bruno | `RUNBOOK-COLETA-LLM.md` §drift | 1 issue por provider+model+versão_observada |
| ALR-004 | P1 | KPI 1 Mention Rate cai >30% em 2 leituras consecutivas | semanal | GitHub Issue + revisão de coleta | `RUNBOOK-COLETA-LLM.md` §degradação | 1 issue por sprint |
| ALR-005 | P1 | `naia_schema_coverage_score` cai >10 pontos vs leitura anterior | mensal | GitHub Issue + revisão de last deploy | `audits/PLAYBOOK-AUDITORIA-NAIA.md` | 1 issue por audit_id |
| ALR-006 | P2 | `deploy.failed` em produção | imediata | Slack + auto-rollback em 5 min | Bloco G runbook rollback | 1 issue por git_sha+env |
| ALR-007 | P2 | NAIA P0 falha em página crítica (`/`, `/cursos/mba-online-psicologia*`) | imediata | GitHub Issue auto | `PLAYBOOK-AUDITORIA-NAIA.md` §P0 | 1 issue por check_id+url |
| ALR-008 | P3 | Voice Guard score < 70 em peça publicada (regressão) | semanal | Reabertura automática da issue original | `content/VOICE-GUIDE.md` | Reabre issue existente |

### E.2 Configuração Axiom Alert Rule (exemplo ALR-001)

```yaml
# axiom/alerts/alr-001-budget-guard.yaml
apiVersion: axiom.co/v1
kind: AlertRule
metadata:
  name: alr-001-budget-guard-100pct
  severity: P0
spec:
  dataset: geo-ipog-metrics
  apl: |
    ['geo-ipog-metrics']
    | where _time > ago(5m)
    | where metric == "budget_guard_alert_level"
    | where labels.provider != "perplexity"
    | summarize max_pct = max(value) by labels.provider, labels.sprint_id
    | where max_pct >= 100
  evaluationInterval: 60s
  for: 0s
  notify:
    - type: webhook
      url: https://api.github.com/repos/alexandrebrt14-sys/geo-ipog/dispatches
      headers:
        Authorization: Bearer ${GH_PAT_AUDIT_ENGINE}
      body: |
        {
          "event_type": "budget-guard-100",
          "client_payload": {
            "provider": "{{ labels.provider }}",
            "sprint_id": "{{ labels.sprint_id }}",
            "value": {{ max_pct }}
          }
        }
    - type: email
      to: ["alexandre@brasilgeo.com.br"]
```

### E.3 Workflow GitHub Actions de emit-issue idempotente

```yaml
# .github/workflows/alert-emit-issue.yml
name: Alert — Emit Issue (idempotent)
on:
  repository_dispatch:
    types: [budget-guard-100, drift-confirmed, schema-coverage-drop, naia-p0-fail]
jobs:
  emit:
    runs-on: ubuntu-latest
    permissions:
      issues: write
    steps:
      - name: Search existing issue (idempotency)
        id: search
        uses: actions/github-script@v7
        with:
          script: |
            const payload = context.payload.client_payload;
            const eventType = context.payload.action;
            const titleHash = `[${payload.severity || 'P1'}] ${eventType} — ${payload.provider || payload.check_id} — ${payload.sprint_id || payload.audit_id}`;
            const issues = await github.rest.issues.listForRepo({
              owner: context.repo.owner,
              repo: context.repo.repo,
              state: 'open',
              labels: 'auto-generated,alert',
            });
            const existing = issues.data.find(i => i.title === titleHash);
            return { exists: !!existing, number: existing?.number ?? null, title: titleHash };
      - name: Create issue
        if: steps.search.outputs.exists == 'false'
        uses: actions/github-script@v7
        with:
          script: |
            await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: ${{ steps.search.outputs.title }},
              body: JSON.stringify(context.payload.client_payload, null, 2),
              labels: ['auto-generated', 'alert', context.payload.action],
            });
```

### E.4 Política de escalação

- **P0**: Alexandre + Bruno notificados; se sem ack em 30 min, escalada para Ronan via e-mail direto. Resposta target em 2h.
- **P1**: Alexandre owner; resposta target em 1 dia útil.
- **P2**: rotina; revisão no daily standup operacional.
- **P3**: backlog; revisão semanal.

---

## Bloco F — Tracing distribuído

### F.1 Workflow exemplar — Coleta cross-LLM completa

```
HTTP Request (cron trigger)
└─ Span: coleta.diaria.batch  [span_id=A1, trace_id=T1]
   ├─ Span: coleta.prompt.iterate  [parent=A1]
   │  ├─ Span: llm.call.openai  [parent, kind=client, attrs: provider, model]
   │  ├─ Span: llm.call.anthropic  [parallel]
   │  ├─ Span: llm.call.google  [parallel]
   │  ├─ Span: llm.call.perplexity  [parallel]
   │  ├─ Span: llm.call.xai  [parallel]
   │  └─ Span: llm.call.copilot  [parallel]
   ├─ Span: drift.detector.evaluate  [parent=A1]
   ├─ Span: finops.tracker.persist  [parent=A1]
   ├─ Span: persistence.r2.write  [parent=A1, attrs: bucket, key]
   ├─ Span: persistence.d1.insert  [parent=A1, attrs: table, row_count]
   └─ Span: notifier.dispatch  [parent=A1, condition=alert_triggered]
```

Cada span carrega atributos canônicos: `service.name`, `provider`, `model`, `prompt_id`, `correlation_id`, `cost_brl`, `cache_hit` (boolean), `event.type` (info/error/drift/circuit_open).

### F.2 Workflow exemplar — Dashboard request

```
HTTP GET /kpi/1
└─ Span: nextjs.request  [trace_id=T2, attrs: route, user_role]
   ├─ Span: middleware.auth  [Cloudflare Access JWT verify]
   ├─ Span: api.kpi.fetch  [parent, attrs: kpi_id=1]
   │  ├─ Span: cache.kv.lookup  [Cloudflare KV]
   │  ├─ Span: d1.query  [if cache miss, attrs: query_hash]
   │  └─ Span: aggregation.compute  [Recharts data prep]
   └─ Span: rsc.render  [server-side render, attrs: bytes_streamed]
```

### F.3 Sampler — política consolidada

| Cenário | Decisão |
|---|---|
| `attributes.level == "error"` | RECORD_AND_SAMPLE 100% |
| `attributes.event.type ∈ {drift, circuit_open}` | RECORD_AND_SAMPLE 100% |
| `DEPLOY_ENV == "staging"` | RECORD_AND_SAMPLE 100% |
| Demais requests `info` | RECORD_AND_SAMPLE 5% (TraceIdRatioBased) |
| Health checks (`/healthz`, `/llms.txt` HEAD) | DROP (não traçar) |

### F.4 Propagação cross-service

- Headers HTTP: `traceparent` e `tracestate` (W3C Trace Context).
- Workflows GitHub Actions: variável de ambiente `OTEL_TRACEPARENT` injetada pelo workflow caller.
- Cron jobs: `correlation_id` gerado no início do job e propagado em metadata de toda métrica/log do job.

---

## Bloco G — CI/CD multi-env

O programa opera **três ambientes** com isolamento total de credenciais, dados e domínios:

### G.1 Topologia de ambientes

| Ambiente | Trigger | Hosting | Domínios | Dados | Acesso |
|---|---|---|---|---|---|
| **dev (local)** | Manual (`npm run dev` / `uvicorn`) | localhost | `localhost:3000`, `localhost:8000` | SQLite local + R2 dev bucket | Alexandre |
| **staging** | Push para branch `staging` | Cloudflare Pages staging + Workers preview | `staging.geo-dashboard.brasilgeo.com`, `staging.collector.geo-platform.brasilgeo.com` | D1 staging + R2 staging bucket | Alexandre + Bruno via Cloudflare Access |
| **production** | Push para `main` (após gate verde em staging) | Cloudflare Pages prod + Workers prod | `geo-dashboard.brasilgeo.com`, `collector.geo-platform.brasilgeo.com` | D1 prod + R2 prod bucket | Alexandre + Bruno + Ronan (read-only board view) |

### G.2 Branching canônico (cada repo)

```
feature/* (autor) ──PR──▶ staging ──merge tras aprovação──▶ main (production)
                          │                                    │
                          │ deploy automático                   │ deploy automático
                          ▼                                    ▼
                     staging Cloudflare                  production Cloudflare
```

- **`feature/*` → `staging`**: PR obrigatório. Reviewer Alexandre. Pelo menos 1 approval.
- **`staging` → `main`**: PR obrigatório. Smoke test em staging deve estar verde por 24h em produção contínua (apenas para deploys que tocam o collector).
- **`hotfix/*` → `main`**: permitido com reviewer Alexandre + aprovação de Bruno via comentário em PR (para incidentes P0/P1 onde rota staging > main não é viável).

### G.3 Deploy gates canônicos

Todo deploy a staging ou production passa por **8 gates obrigatórios**, em ordem:

1. **Lint** — `ruff check` (Python) ou `eslint` (TS). Falha bloqueia.
2. **Typecheck** — `mypy --strict src/` (Python) ou `tsc --noEmit` (TS). Falha bloqueia.
3. **Tests unitários** — `pytest --cov=src --cov-fail-under=80` (Python) ou `vitest run --coverage` (TS). Cobertura mínima 80% em `src/` core. Falha bloqueia.
4. **Tests integração** — apenas em PR para `main`: `pytest tests/integration/` com mocks dos LLMs. Falha bloqueia.
5. **Build** — `python -m build` (geo-platform) ou `next build` (geo-dashboard). Falha bloqueia.
6. **Voice Guard** — só para PRs que tocam `content/*.md`. Score ≥ 70 obrigatório. Falha bloqueia.
7. **NAIA spot-check** — só para deploys do `geo-ipog-website`. P0/P1 verdes em staging. Falha bloqueia.
8. **Lighthouse** (apenas `geo-dashboard`) — performance ≥ 90, accessibility ≥ 95, best practices ≥ 95. Falha em production é blocker; em staging é warning.

### G.4 Rollback runbook

| Ambiente | Tecnologia | Procedimento | Tempo target |
|---|---|---|---|
| Cloudflare Pages | Pages Deployments API | `wrangler pages deployment list --project-name geo-dashboard` → `wrangler pages deployment promote <DEPLOY_ID>` | < 2 min |
| Cloudflare Workers | Workers Versions | `wrangler versions list` → `wrangler versions deploy <VERSION_ID>@100%` | < 2 min |
| D1 schema migrations | `wrangler d1 migrations apply` com flag `dangerously_irreversible: false` em todo migration | Rollback exige migration reversa pré-aprovada | < 15 min |
| R2 buckets | Object versioning habilitado | Restore de objeto via `wrangler r2 object get --version <VID>` | < 5 min |

### G.5 Database migration policy

- Toda migração D1 versionada em `geo-platform/migrations/NNN_descricao.sql`.
- **Forward-compatible obrigatório**: schema novo aceita código antigo lendo durante o deploy window.
- Flag `dangerously_irreversible: false` declarada no metadata de cada migration; migrations irreversíveis exigem PR com sign-off explícito de Alexandre.
- Backup automático de D1 antes de cada `migrations apply` em produção (snapshot para R2).

---

## Bloco H — Workflows GitHub Actions consolidados

Lista canônica de **22 workflows** distribuídos em 4 repositórios. Cada workflow é especificado com trigger, jobs, gates, secrets e custo estimado em GitHub Actions minutes.

### H.1 `geo-ipog` (existentes — 5 + dependabot)

| # | Arquivo | Trigger | Jobs | Gates | Secrets | Min/exec | Min/mês |
|---|---|---|---|---|---|---|---|
| 1 | `quality.yml` | push, PR | markdown lint, link check | falha bloqueia merge | – | 2 | 60 |
| 2 | `labeler.yml` | PR opened/edited | auto-label por path | – | `GITHUB_TOKEN` | 1 | 30 |
| 3 | `stale.yml` | cron diário 03:00 UTC | marcar issues/PRs >60d | – | `GITHUB_TOKEN` | 2 | 60 |
| 4 | `report-builder.yml` | cron seg 09:00 BRT, 1º dia mês 09:00 BRT | gerar relatórios MD | python deps, jinja | `AXIOM_TOKEN` (read), `GA4_*` | 8 | 50 |
| 5 | `concorrentes-monitoring.yml` | cron quinzenal | snapshot 10 concorrentes | exit code 0 | `GITHUB_TOKEN` | 25 | 50 |
| – | `dependabot.yml` (config) | semanal | bumps de deps | – | – | – | – |

### H.2 `geo-platform` (novos — 8)

| # | Arquivo | Trigger | Jobs principais | Gates | Secrets | Min/exec | Min/mês |
|---|---|---|---|---|---|---|---|
| 6 | `ci-test.yml` | push, PR | ruff, mypy --strict, pytest --cov=80, build | todos verdes para merge | – | 5 | 200 |
| 7 | `ci-build-docker.yml` | push em `staging`, `main` | docker build + push para GHCR | image scan trivy | `GHCR_TOKEN` | 8 | 80 |
| 8 | `ci-deploy-staging.yml` | push em `staging` | wrangler deploy --env staging + smoke test | ci-test + ci-build verdes | `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` | 5 | 50 |
| 9 | `ci-deploy-production.yml` | push em `main` | wrangler deploy --env production + smoke test | ci-test + 24h em staging | `CLOUDFLARE_API_TOKEN` | 6 | 30 |
| 10 | `cron-collect-daily.yml` | cron 09:00 UTC (06:00 BRT) | dispara coleta dos 75 prompts × 6 LLMs | – | 6× chaves LLM, `AXIOM_TOKEN` | 30 | 900 |
| 11 | `cron-collect-spot.yml` | manual (`workflow_dispatch`) | spot-check pontual | – | 6× chaves LLM | 10 | 50 |
| 12 | `ci-naia-audit-monthly.yml` | cron dia 1 09:00 UTC | full NAIA audit | exit code 0 | `GH_PAT_AUDIT_ENGINE`, `AXIOM_TOKEN` | 35 | 35 |
| 13 | `ci-naia-spot-check-biweekly.yml` | cron dias 1 e 15 12:00 UTC | spot-check P0/P1 | exit code 0 | `GH_PAT_AUDIT_ENGINE` | 8 | 16 |

### H.3 `geo-dashboard` (novos — 5)

| # | Arquivo | Trigger | Jobs principais | Gates | Secrets | Min/exec | Min/mês |
|---|---|---|---|---|---|---|---|
| 14 | `pr-check.yml` | PR | eslint, tsc, vitest --coverage 80, next build | bloqueia merge | – | 6 | 240 |
| 15 | `deploy-staging.yml` | push `staging` | next build + cloudflare pages deploy --branch staging | pr-check verde | `CLOUDFLARE_API_TOKEN`, `SENTRY_AUTH_TOKEN` | 5 | 50 |
| 16 | `deploy-production.yml` | push `main` | next build + cloudflare pages deploy --branch production | pr-check + 24h staging | `CLOUDFLARE_API_TOKEN`, `SENTRY_AUTH_TOKEN` | 6 | 30 |
| 17 | `lighthouse.yml` | post-deploy (workflow_run) | Lighthouse CI 5 routes | thresholds Bloco G.3 | `LHCI_GITHUB_APP_TOKEN` | 8 | 80 |
| 18 | `e2e.yml` | nightly cron 04:00 UTC + manual | Playwright E2E em staging | smoke flows verdes | `CLOUDFLARE_ACCESS_SERVICE_TOKEN` | 12 | 360 |

### H.4 `geo-ipog-website` (novos — 3)

| # | Arquivo | Trigger | Jobs principais | Gates | Secrets | Min/exec | Min/mês |
|---|---|---|---|---|---|---|---|
| 19 | `ci-validate-jsonld.yml` | push, PR | jsonld validate via `pyld`, schema.org check | exit code 0 | – | 3 | 90 |
| 20 | `ci-validate-llms-txt.yml` | push, PR | parser llms.txt + checagem de URLs declaradas | exit code 0 | – | 2 | 60 |
| 21 | `snapshot-schema-implementations.yml` | cron mensal dia 5 | snapshot Schema dos 10 concorrentes | – | – | 15 | 15 |

### H.5 Workflow auxiliar — secret rotation

| # | Arquivo | Trigger | Jobs | Secrets | Min/exec | Min/mês |
|---|---|---|---|---|---|---|
| 22 | `cron-secret-rotation-quarterly.yml` (no `geo-ipog`) | cron trimestral | abre issue checklist de rotação dos 14 secrets | `GH_PAT_AUDIT_ENGINE` | 1 | 0,3 |

### H.6 Custo total GitHub Actions

- **Total mensal estimado**: 90 + 50 + 30 + 60 + 200 + 80 + 50 + 30 + 900 + 50 + 35 + 16 + 240 + 50 + 30 + 80 + 360 + 90 + 60 + 15 + 0,3 = **2.516 minutos/mês**.
- **Free tier público**: 2.000 min/mês. Repos privados: linear cost USD 0,008/min.
- **Estratégia**: o `geo-ipog` permanece privado (governança/decisões), mas executa workflows leves (~190 min/mês cabe no free tier porque privado tem 2.000 min). Repos `geo-platform`, `geo-dashboard` e `geo-ipog-website` são privados também; total privado ~2.500 min/mês.
- **Custo mensal Actions**: USD 0,008 × (2.516 - 2.000) = **USD 4,13/mês**.
- **Mitigação**: `cron-collect-daily.yml` é o maior consumidor (900 min). Em produção plena, migrar para Cloudflare Cron Triggers reduz para ~50 min/mês de Actions overhead. Custo mensal cai para ~USD 0.

### H.7 Snippet canônico — `ci-deploy-production.yml`

```yaml
# .github/workflows/ci-deploy-production.yml
name: Deploy Production
on:
  push:
    branches: [main]
  workflow_dispatch: {}

permissions:
  contents: read
  deployments: write

concurrency:
  group: deploy-production
  cancel-in-progress: false

jobs:
  preflight:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Verify staging stability (24h)
        uses: actions/github-script@v7
        with:
          script: |
            const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
            const { data } = await github.rest.actions.listWorkflowRuns({
              owner: context.repo.owner,
              repo: context.repo.repo,
              workflow_id: 'ci-deploy-staging.yml',
              status: 'success',
              created: `>=${since}`,
            });
            if (data.workflow_runs.length === 0) {
              core.setFailed('Sem deploys verdes em staging nas últimas 24h');
            }

  deploy:
    needs: preflight
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.12' }
      - name: Install
        run: pip install -e ".[dev]"
      - name: Test
        run: pytest --cov=src --cov-fail-under=80
      - name: Deploy via wrangler
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: deploy --env production
      - name: Smoke test
        run: |
          curl -fsS https://collector.geo-platform.brasilgeo.com/healthz
      - name: Emit deploy.succeeded
        if: success()
        run: |
          curl -X POST https://api.axiom.co/v1/datasets/geo-ipog-prod/ingest \
            -H "Authorization: Bearer ${{ secrets.AXIOM_TOKEN }}" \
            -H "Content-Type: application/json" \
            -d "[{\"ts\":\"$(date -u +%FT%TZ)\",\"level\":\"info\",\"service\":\"schema-deploy\",\"env\":\"production\",\"event\":\"deploy.succeeded\",\"correlation_id\":\"${{ github.run_id }}\",\"metadata\":{\"repo\":\"${{ github.repository }}\",\"git_sha\":\"${{ github.sha }}\"}}]"
      - name: Auto-rollback on failure
        if: failure()
        run: |
          wrangler versions list --json | jq -r '.[1].id' | \
            xargs -I {} wrangler versions deploy {}@100%
```

---

## Bloco I — Secrets management consolidado

### I.1 Inventário canônico (16 secrets)

| Categoria | Nome | Onde usa | Storage primário | Rotação |
|---|---|---|---|---|
| LLM | `OPENAI_API_KEY` | geo-platform runtime + cron | GitHub Secrets + Cloudflare Workers Secrets | Trimestral |
| LLM | `ANTHROPIC_API_KEY` | geo-platform | GitHub + CF Workers | Trimestral |
| LLM | `GOOGLE_API_KEY` | geo-platform | GitHub + CF Workers | Trimestral |
| LLM | `PERPLEXITY_API_KEY` | geo-platform | GitHub + CF Workers | Trimestral |
| LLM | `XAI_API_KEY` | geo-platform | GitHub + CF Workers | Trimestral |
| LLM | `MS_GRAPH_TENANT_ID`, `MS_GRAPH_CLIENT_ID`, `MS_GRAPH_CLIENT_SECRET`, `AZURE_OPENAI_API_KEY` | geo-platform (Copilot via Bing) | GitHub + CF Workers | Trimestral |
| Hosting | `CLOUDFLARE_API_TOKEN` | CI deploys | GitHub Secrets | Semestral |
| Hosting | `CLOUDFLARE_ACCOUNT_ID` | CI deploys | GitHub Secrets (não-secreto, mas centralizado) | – |
| Observability | `AXIOM_TOKEN`, `AXIOM_ORG_ID`, `AXIOM_DATASET` | runtime + CI | GitHub + CF Workers Secrets | Semestral |
| Observability | `SENTRY_DSN`, `SENTRY_AUTH_TOKEN` | geo-dashboard + CI source maps | GitHub + CF Workers | Semestral |
| Analytics | `GA4_PROPERTY_ID`, `GA4_CLIENT_EMAIL`, `GA4_PRIVATE_KEY` | reporting service (KPI 7) | GitHub Secrets + CF Workers | Anual |
| GitHub | `GH_PAT_AUDIT_ENGINE` | NAIA → emit issue, alert workflow | GitHub Secrets (PAT do bot) | Trimestral |
| Deploy externo | `IPOG_CMS_DEPLOY_KEY` | geo-ipog-website → deploy de Schema/llms.txt | GitHub Secrets (deploy key SSH) | Anual ou em troca de TI IPOG |

### I.2 Storage strategy

- **GitHub Secrets** (Actions): para CI/CD. Encrypted at rest, RBAC por environment.
- **Cloudflare Workers Secrets**: para runtime production. Binding nativo no Worker; chave nunca aparece em plaintext, nem em logs.
- **1Password Business** (vault `geo-ipog`): source of truth humano para auditoria. Quem tem acesso a quê. Bruno Azambuja recebe acesso de leitura aos secrets compartilhados (Cloudflare, GA4) durante onboarding.
- **`.env.local`** (dev only): nunca committed. `.gitignore` enforced. `direnv` recomendado para auto-load.

### I.3 Política de rotação

- **Trimestral**: chaves LLM (5 providers + 4 do Microsoft Graph + Azure OpenAI). Workflow `cron-secret-rotation-quarterly.yml` abre issue checklist 7 dias antes do trimestre vencer.
- **Semestral**: Cloudflare API Token, Axiom Token, Sentry tokens.
- **Anual**: GA4 service account, IPOG deploy key.
- **Emergencial**: incident response em 2h após detecção de vazamento.

### I.4 Auditoria

- **Mensal**: Alexandre revisa `gh secret list` + Cloudflare dashboard secrets para confirmar que não há credencial órfã.
- **Trimestral**: revisão completa do vault 1Password contra inventário canônico (Bloco I.1). Discrepâncias geram issue.
- **Pós-incidente**: rotação de **todos** os secrets relacionados ao serviço comprometido + audit log de uso da chave nas últimas 90 dias.

### I.5 Snippet — uso correto em workflow

```yaml
# Exemplo: forma canônica de consumir secrets em job
jobs:
  collect:
    runs-on: ubuntu-latest
    environment: production  # exige approval explícito + secrets dedicados
    env:
      OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
      ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
      AXIOM_TOKEN: ${{ secrets.AXIOM_TOKEN }}
      AXIOM_DATASET: geo-ipog-prod
      DEPLOY_ENV: production
    steps:
      - run: |
          # Nunca usar `echo $OPENAI_API_KEY` em logs.
          # Sempre passar via env var ao processo Python.
          python -m geo_collector.cli collect --date $(date -I)
```

---

## Bloco J — Monitoring de SLOs

O programa GEO IPOG opera com **5 SLOs canônicos**. Cada SLO tem indicador (SLI) computável a partir de métricas do Bloco D, target, error budget mensal, e regra de alerta de burn rate.

### J.1 SLO-01 — Disponibilidade `geo-collector` ≥ 99,5%/mês

- **SLI**: `1 - (count(events where event in {circuit.opened, llm.call.errored} during 5m windows) / total_5m_windows_in_month)`.
- **Target**: 99,5% → error budget de 3,6 horas/mês.
- **Burn rate alert**: burn ≥ 2× esperado por 6h consecutivas → P1 issue.
- **Query Axiom (APL)**:

```kusto
['geo-ipog-prod']
| where _time > startofmonth(now())
| where service == "geo-collector"
| summarize
    total_minutes = bin(count() / 12, 1.0),  // 12 windows de 5min/h
    bad_minutes = bin(countif(event in ("circuit.opened","llm.call.errored")) / 12, 1.0)
| extend availability_pct = 100.0 * (1 - bad_minutes / total_minutes)
```

### J.2 SLO-02 — Latência p95 `geo-collector` ≤ 8s por chamada LLM

- **SLI**: `histogram_quantile(0.95, geo_collector_call_duration_seconds)` por janela 1h.
- **Target**: p95 ≤ 8s. Excedências consecutivas (3 janelas) → P1.
- **Justificativa**: pico de latência em Perplexity sonar-pro pode atingir 12-15s; budget reflete realidade do cohort.

### J.3 SLO-03 — Runtime `naia-audit`

- **SLI** (spot-check): `histogram_quantile(0.95, naia_audit_duration_seconds{mode="spot"})`. **Target**: p95 ≤ 90s.
- **SLI** (full audit): `histogram_quantile(0.95, naia_audit_duration_seconds{mode="full"})`. **Target**: p95 ≤ 30 min.
- **Burn rate alert**: 2 audits consecutivos acima do target → P2.

### J.4 SLO-04 — `geo-dashboard` p95 page load ≤ 2,5s

- **SLI**: `histogram_quantile(0.95, kpi_dashboard_load_seconds)` (origem: web-vitals LCP).
- **Target**: p95 ≤ 2,5s. Janela de avaliação: 7 dias.
- **Mitigação preventiva**: Lighthouse CI no workflow #17 bloqueia deploy de production se performance score < 90.

### J.5 SLO-05 — Deploy success rate `geo-ipog-website` ≥ 95%/mês

- **SLI**: `1 - (deployment_failure_rate{repo="geo-ipog-website"} window=30d)`.
- **Target**: ≥ 95% → tolera até 5% de deploys falhos no mês.
- **Burn rate alert**: 2 deploys falhos consecutivos → P2.

### J.6 Implementação

- SLO calculado **a cada hora** via Axiom Scheduled Query (cron `0 * * * *`) que escreve resultado para dataset dedicado `geo-ipog-slos`.
- SLI exposto em `/finops` no `geo-dashboard` em widget "SLO compliance" com semáforo verde/amarelo/vermelho.
- Error budget burn rate calculado por janela de 1h e 6h; alerta dispara quando `actual_burn / expected_burn > 2.0`.

---

## Bloco K — Custo total observability + CI/CD

### K.1 Estimativa mensal — operação mínima (M01-M06)

| Item | Custo USD/mês | Notas |
|---|---|---|
| Axiom (Free tier) | 0 | Volume ≤ 0,5 GB/mês esperado |
| Sentry (Free tier) | 0 | < 5 k erros/mês |
| Cloudflare Web Analytics | 0 | Gratuito |
| Cloudflare Workers Analytics Engine | 0 | < 10 M data points/mês |
| Cloudflare Trace (synthetic) | 0 | Incluído no Workers |
| GitHub Actions (privado) | 4 | ~516 min/mês acima do free tier |
| Checkly (Free tier) | 0 | < 10 k checks/mês |
| 1Password Business (3 usuários) | 24 | USD 8/usuário/mês |
| **Total mínimo** | **28** | |

### K.2 Estimativa mensal — pico 2026.2 (M07-M09)

| Item | Custo USD/mês | Notas |
|---|---|---|
| Axiom Hobby | 25 | Volume passa 0,5 GB com coleta diária + dashboard RUM |
| Sentry Team (se necessário) | 26 | Apenas se ultrapassar 5 k erros/mês — improvável |
| GitHub Actions | 4 | Estável |
| Cloudflare Workers Paid (USD 5 mínimo) | 5 | Quando tráfego do dashboard ultrapassar 100 k req/dia |
| Checkly Pro (se necessário) | 80 | Apenas se cenários sintéticos crescerem |
| 1Password Business | 24 | Estável |
| Cloudflare R2 (storage observability) | 1 | ~5 GB JSONL frio/mês |
| **Total pico** | **89-165** | Cenário realista 100-130 |

### K.3 Estimativa mensal — operação contínua (M10+)

| Item | Custo USD/mês |
|---|---|
| Axiom Hobby | 25 |
| Cloudflare Paid + Analytics | 6 |
| GitHub Actions | 2 (após migração para CF Triggers) |
| 1Password | 24 |
| R2 observability | 2 |
| **Total** | **59** |

### K.4 Conversão para BRL e teto

- Câmbio referência: USD 1 = BRL 5,30.
- Custo total observability + CI/CD em BRL: R$ 148/mês (mínimo) → R$ 530-870/mês (pico) → R$ 313/mês (operação contínua).
- **Cabe folgadamente** no teto de R$ 12-34/mês infra declarado no `FINOPS-DISCIPLINA.md`? **Não**. O teto declarado cobre apenas Cloudflare + R2 ($ 6/mês ≈ R$ 32). Observability + CI/CD adicionais (Axiom Hobby + 1Password) somam R$ 260/mês na operação contínua.
- **Decisão de governança**: o teto FinOps original é revisado via ata para incluir linha "observability + CI/CD" em R$ 350/mês target. Justificativa: observability é precondição para FinOps confiável (sem log auditável, não há reconciliação de custo LLM contra fatura).

---

## Bloco L — Disaster recovery + business continuity

### L.1 RPO / RTO declarados

| Sistema | RPO (Recovery Point Objective) | RTO (Recovery Time Objective) |
|---|---|---|
| `geo-platform` (collector + NAIA + Voice Guard) | 24h (1 snapshot diário) | 4h |
| `geo-dashboard` | 0 (state em D1 cross-region) | 1h |
| `geo-ipog-website` artifacts | 0 (Git é fonte de verdade) | 30 min |
| Logs de observability (Axiom) | 24h (snapshot mensal Parquet) | 24h |
| Secrets (1Password + GitHub) | 7d | 2h (rotação emergencial) |

### L.2 Backups canônicos

- **R2 cross-region snapshots**: bucket `geo-ipog-prod` configurado com replicação para região secundária (FRA → AMS). Snapshot diário 04:00 UTC. Restore via `wrangler r2 object copy`.
- **D1 daily backup**: workflow `cron-d1-backup-daily.yml` (parte do `geo-platform`) executa `wrangler d1 export <DB> --output backups/d1-$(date -I).sql.gz` e armazena em R2 backup bucket. Retenção 90 dias.
- **DuckDB local snapshot semanal**: GitHub Release (privado) com arquivo `analytics-YYYY-WW.duckdb` cifrado via `age` (chave em 1Password).
- **Secrets backup**: vault 1Password exporta `.1pux` semanalmente via `op vault export geo-ipog`, cifrado e armazenado em R2 (bucket `geo-ipog-secrets-backup`, ACL apenas Alexandre).
- **GitHub repo mirror**: cron mensal espelha repos para Codeberg como mitigação de risco GitHub. Documentado em `RUNBOOK-DR.md`.

### L.3 Runbook de disaster recovery

```
Incidente: collector caído + D1 corrompido
1. (T+0) Detecção via SLO-01 burn rate → alert P0 disparado
2. (T+5min) Alexandre acessa Cloudflare dashboard, valida estado dos Workers
3. (T+10min) Promote último snapshot D1 verde:
     wrangler d1 import geo-ipog-prod backups/d1-YYYY-MM-DD.sql.gz
4. (T+30min) Rollback do Worker para versão N-1:
     wrangler versions list
     wrangler versions deploy <PREVIOUS_ID>@100%
5. (T+45min) Smoke test: curl /healthz, curl /collect/dry-run
6. (T+1h) Reabilita cron de coleta
7. (T+2h) Postmortem draft em docs/postmortems/YYYY-MM-DD.md
```

Target: RTO 4h respeitado em 95% dos incidentes simulados (drill trimestral).

### L.4 Postmortem template canônico

`docs/postmortems/_TEMPLATE.md`:

```markdown
# Postmortem — <título do incidente>

> **Data:** YYYY-MM-DD
> **Severidade:** P0 | P1 | P2 | P3
> **Duração:** HH:MM
> **Owner postmortem:** <nome>
> **Owners afetados:** <lista>

## Resumo executivo
<1 parágrafo>

## Linha do tempo
| Hora | Evento |
|---|---|

## Causa raiz
<seção 5-whys>

## Detecção
- Quando foi detectado e por qual mecanismo (SLO, alerta, usuário)
- Tempo entre incidente e detecção (TTD)
- Tempo entre detecção e mitigação (TTM)

## Impacto
- KPIs afetados
- Usuários afetados (Alexandre, Bruno, Ronan, candidatos)
- Custo financeiro estimado

## O que funcionou bem
<bullets>

## O que precisa melhorar
<bullets>

## Action items
| ID | Descrição | Owner | Prazo | Status |
|---|---|---|---|---|

## Lições aprendidas
<o que vai virar feedback canônico ou atualização de runbook>
```

### L.5 Drill trimestral

- Cada trimestre, Alexandre executa **2 drills**:
  1. **DR drill**: simula corrupção de D1, executa runbook L.3, mede RTO real.
  2. **Secret rotation drill**: rotaciona 1 chave LLM em produção sem downtime, valida que workflows continuam verdes.
- Resultados documentados em `docs/postmortems/drill-YYYY-QN-*.md`.

---

## Bloco M — Estrutura de pastas observability

### M.1 Layout canônico `geo-platform`

```
geo-platform/
├─ src/
│  ├─ observability/
│  │  ├─ __init__.py
│  │  ├─ logging.py        # structlog config (snippet B.1)
│  │  ├─ metrics.py        # OTel SDK + instrumentos (snippet B.2)
│  │  ├─ tracing.py        # OTel propagators + sampler (snippet B.3)
│  │  ├─ events.py         # canonical event registry (snippet C.1)
│  │  └─ alerts.py         # cliente para emit-issue webhook
│  ├─ collector/
│  ├─ naia/
│  ├─ voice_guard/
│  └─ reporting/
├─ tests/
│  └─ observability/
│     ├─ test_logging.py
│     ├─ test_events_schema.py   # valida que todo emit usa schema canônico
│     └─ test_sampler.py
├─ migrations/
├─ wrangler.toml
└─ pyproject.toml
```

### M.2 Layout canônico `geo-dashboard`

```
geo-dashboard/
├─ app/
│  ├─ (dashboard)/
│  ├─ api/
│  │  ├─ log/route.ts        # ingere logs do browser → Axiom
│  │  ├─ metrics/route.ts    # ingere web-vitals → Axiom
│  │  └─ healthz/route.ts
│  ├─ finops/page.tsx        # painel FinOps interno (Bloco B.7)
│  └─ layout.tsx
├─ lib/
│  ├─ observability.ts       # pino logger + OTel SDK (snippet B.1)
│  ├─ sentry.ts              # Sentry init server + client
│  └─ slo.ts                 # cliente Axiom para SLO widgets
├─ middleware.ts             # request tracing + correlation_id
├─ instrumentation.ts        # OpenTelemetry init (Next.js convention)
├─ sentry.client.config.ts
├─ sentry.server.config.ts
├─ next.config.ts
└─ package.json
```

### M.3 Layout canônico `geo-ipog-website`

```
geo-ipog-website/
├─ schemas/
│  ├─ educational-organization.jsonld
│  ├─ courses/
│  └─ persons/
├─ llms.txt
├─ robots.txt
├─ scripts/
│  ├─ validate.py            # CI gate workflow #19/#20
│  └─ snapshot-competitors.py
├─ .github/workflows/
│  ├─ ci-validate-jsonld.yml
│  ├─ ci-validate-llms-txt.yml
│  └─ snapshot-schema-implementations.yml
└─ README.md
```

### M.4 Convenção de imports

```python
# Forma canônica em qualquer módulo do geo-platform
from geo_platform.observability.logging import configure_logging, bind_request_context
from geo_platform.observability.metrics import calls_total, call_duration, cost_brl_total
from geo_platform.observability.events import LogEvent
from geo_platform.observability.tracing import GeoIpogSampler
```

```typescript
// Forma canônica em qualquer módulo do geo-dashboard
import { logger, withCorrelationId } from "@/lib/observability";
import { trackKpiView } from "@/lib/metrics";
import * as Sentry from "@sentry/nextjs";
```

---

## Apêndice — Cronograma de implementação

| Marco | Data | Entregáveis |
|---|---|---|
| M02 — Schema piloto em homologação | 30-05-2026 | structlog + pino configurados; Axiom dataset criado; eventos #1-9 catalogados; workflows #6, #14, #19, #20 ativos |
| M03 — Coleta diária em produção | 06-06-2026 | OTel metrics + tracing ativos; SLO-01/02/03 com queries APL; ALR-001/002/003 disparando |
| M04 — Dashboard public beta | 12-06-2026 | RUM + Sentry em geo-dashboard; SLO-04 ativo; lighthouse gate em deploy |
| M07 — Pico 2026.2 ramp-up | 15-06-2026 | Todos 22 workflows ativos; ALR-004/005/006/007/008 ligadas; Axiom Hobby ativo |
| M09 — DR drill 1 | 30-09-2026 | RTO < 4h validado; postmortem template em uso; backup R2 + 1Password export ativos |
| M12 — DR drill 2 + revisão SLO | 31-12-2026 | Renegociação dos targets de SLO baseado em 6 meses de produção; recalibração de error budget |

---

## Resumo executivo

- **Stack 100% free-tier-first** com Axiom como pivô de observability, OpenTelemetry como padrão neutro, Sentry apenas no frontend, GitHub Actions + Cloudflare CI/CD multi-ambiente.
- **3 pilares observability** (logging, métricas, tracing) integrados via `correlation_id` ULID e `trace_id` W3C.
- **24 eventos canônicos** + **17 métricas canônicas** + **8 regras de alerting** alinhadas aos 8 KPIs.
- **22 workflows GitHub Actions** distribuídos entre 4 repos, ~2.516 min/mês, custo ~USD 4/mês acima do free tier.
- **5 SLOs canônicos** com error budget e burn rate alerts em Axiom Scheduled Queries.
- **Custo total mensal** USD 28 (mínimo) → USD 100-130 (pico 2026.2) → USD 59 (operação contínua) — equivalente a R$ 148-690/mês.
- **DR runbook** com RTO 4h, drills trimestrais, backups multi-camada (R2 cross-region, D1 daily, DuckDB semanal, 1Password export semanal).
- **Disciplina prescritiva**: deploy gates intransigentes, idempotência em alertas, rotação trimestral de secrets, postmortems para todo P0/P1.
