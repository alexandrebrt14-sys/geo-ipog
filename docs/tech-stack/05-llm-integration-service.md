# LLM Integration Service do `geo-platform` — Especificação Canônica

> **Status:** vigente desde 2026-05-01 (Wave 3 da arquitetura técnica do programa GEO IPOG)
> **Dono:** Alexandre Caramaschi (CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil)
> **Validação operacional:** Bruno Azambuja (Gerente de Marketing IPOG)
> **Sponsor executivo:** Ronan Maia (CEO IPOG)
> **Cohort canônico (não-negociável):** ChatGPT `gpt-5.0`, Claude `claude-opus-4-7`, Gemini `gemini-3-pro`, Perplexity `sonar-pro`, Grok `grok-4`, Copilot `copilot-2026`
> **Câmbio de referência:** 1 USD = R$ 5,20 (maio/2026)
> **Cross-links:** `docs/tech-stack/01-solution-architecture.md` (Bloco G — C4 Level 3), `docs/tech-stack/02-data-engineering.md` (warehouse + drift + FinOps), `dashboards/RUNBOOK-COLETA-LLM.md`, `dashboards/FINOPS-DISCIPLINA.md`, `dashboards/METRICAS-CANONICAS.md`, `prompts/KIT-PROMPTS-V0.md`, `prompts/PAPEIS-DE-COLETA.md`.

Este dossiê especifica o **LLM Integration Service** do repositório `geo-platform` — o módulo Python 3.12 + httpx + asyncio + pydantic v2 que implementa os clientes para os 6 LLMs canônicos do programa GEO IPOG, com idempotency cache SHA-256, drift detector por embedding similarity, FinOps tracker em tempo real com budget guards por LLM, retry exponencial com circuit breaker e persistência atômica em JSONL + warehouse colunar.

A especificação parte de três descobertas críticas registradas em waves anteriores. Primeira, o `dashboards/RUNBOOK-COLETA-LLM.md` em vigor lista versões 2024 (gpt-4o, claude-sonnet-4-5, gemini-1.5-pro, grok-2) que estão obsoletas frente ao briefing executivo de 2026-05-01; o cohort canônico operacional do Service é o cohort 2026 acima. Segunda, a projeção mensal de custo (R$ 918 mínimo, R$ 2.430 esperado, R$ 3.010 máximo) supera em 22-35× o teto vigente USD 15/sprint para coleta cross-LLM em `dashboards/FINOPS-DISCIPLINA.md`; o Service implementa budget guards por LLM com emergency stop por provedor (exceto Perplexity, sensor RAG-native obrigatório). Terceira, o volume real é **75 prompts × 6 LLMs = 450 chamadas/dia** em regime full, e não 4.500 — concorrentes são entidades extraídas da resposta, não dimensão de execução.

A disciplina canônica é prescritiva: cohort fixo, versão pinada, fail-loud em coleta parcial, emergency stop não se aplica a Perplexity, todas as decisões com trade-off explícito.

---

## Bloco A — Arquitetura do Service

### A.1 Diagrama de componentes (ASCII)

O Service é o componente central do `GEO Collector` (B.1 da arquitetura macro) e materializa o C4 Level 3 do Bloco G de `01-solution-architecture.md`. O diagrama abaixo é a vista canônica do Service em isolamento, com 8 componentes interligados.

```
+======================================================================================+
|                         LLM Integration Service (geo_collector)                       |
|                                                                                        |
|   +---------------------+                                                              |
|   |   Orchestrator      |  <-- entry point: schedule_daily_run(date, kit_version)      |
|   |   (orchestrator.py) |  <-- chama clients por LLM, coordena retry, breaker, drift   |
|   +----------+----------+                                                              |
|              |                                                                         |
|              | enumera 75 prompts x 6 LLMs = 450 work items                            |
|              v                                                                         |
|   +----------+----------+    cache hit?    +---------------------------+               |
|   | Idempotency Cache   | <--------------> |  Cloudflare KV (primary)   |              |
|   | (cache/idempotency) |                  |  Redis Upstash (fallback)  |              |
|   | SHA-256 + TTL       |                  |  SQLite WAL (dev)          |              |
|   +----------+----------+                  +---------------------------+               |
|              |                                                                         |
|              | cache miss -> dispatch                                                  |
|              v                                                                         |
|   +-------------------------------------------------------------+                      |
|   |               6 Provider Clients (LLMProvider Protocol)     |                      |
|   |                                                             |                      |
|   |  +---------+ +----------+ +---------+ +-----------+         |                      |
|   |  | OpenAI  | |Anthropic | |Google   | |Perplexity |         |                      |
|   |  | gpt-5.0 | |opus-4-7  | |3-pro    | |sonar-pro  |         |                      |
|   |  +----+----+ +----+-----+ +----+----+ +----+------+         |                      |
|   |       |           |            |           |                |                      |
|   |  +----+----+ +----+-----+                                   |                      |
|   |  |xAI Grok | |Microsoft |                                    |                      |
|   |  |grok-4   | |copilot   |                                    |                      |
|   |  +----+----+ +----+-----+                                    |                      |
|   |       |           |                                          |                      |
|   |  todos passam por:                                           |                      |
|   |   - Retry Manager (1s, 4s, 16s, max 3) [retry/backoff.py]    |                      |
|   |   - Circuit Breaker por LLM (5 falhas/60s -> OPEN 5min)      |                      |
|   |   - Cost Tracker (cost_usd + cost_brl inline)                |                      |
|   +------------------------------+----------------------------+-+                      |
|                                  |                            |                        |
|                                  v                            |                        |
|   +------------------------------+--------------+   +---------+--------------+         |
|   | Result Persister (persistence/)              |   | Cost Tracker (finops/)|         |
|   |  1. validate via pydantic                    |   |  - cost_usd inline    |         |
|   |  2. SHA-256 da response_text                 |   |  - cost_brl x 5,20    |         |
|   |  3. JSONL append local + R2 (cold tier)      |   |  - aggregate diario   |         |
|   |  4. INSERT em fct_collection (D1 / DuckDB)   |   |  - budget guards/LLM  |         |
|   +------------------------------+---------------+   +---------+--------------+         |
|                                  |                            |                        |
|                                  v                            v                        |
|   +-------------------------------+----------+   +-------------+-----------------+      |
|   | Drift Detector (drift/detector.py)        |   | Notifier (notifier.py)        |     |
|   |  - SHA-256 hash compare                   |   |  - GitHub Issues (drift, FinOps)|   |
|   |  - embedding similarity (paraphrase-      |   |  - Slack/Discord webhook       |     |
|   |    multilingual-MiniLM-L12-v2)            |   |  - email Alexandre + Bruno     |     |
|   |  - threshold <0.75 alerta, <0.55 confirma |   +--------------------------------+     |
|   |  - segmenta serie + flag drift_event_id   |                                          |
|   +-------------------------------------------+                                          |
|                                                                                        |
+========================================================================================+
```

### A.2 Responsabilidades por componente

**Orchestrator (`src/geo_collector/orchestrator.py`).** Entry point único do Service. Recebe parâmetros `(run_date, kit_version, dry_run)`, lê o `prompts/MANIFEST.json` para obter o kit vigente, enumera 75 × 6 = 450 work items e despacha para os 6 Provider Clients respeitando concorrência por provedor (limite TPM/RPM). Coordena retry, circuit breaker, drift e FinOps. Implementa `asyncio.gather` com `asyncio.Semaphore` por provedor para preservar rate limits. Retorna `RunReport` consolidando sucessos, falhas, cache hits, custo total e flags de validação fail-loud.

**6 Provider Clients (`src/geo_collector/providers/{openai,anthropic,google,perplexity,xai,microsoft}.py`).** Cada cliente implementa a `LLMProvider` Protocol (Bloco B), respeitando os quirks específicos do provedor (header de auth, body de request, parsing de usage, citations, rate limits). Trade-off: 6 clientes separados em vez de um wrapper genérico OpenAI-compatible — overhead de ~15% em manutenção, mas isolamento de falha e fidelidade ao formato real de cada API. Em coleta cross-LLM canônica, isolamento vence.

**Idempotency Cache (`src/geo_collector/cache/idempotency.py`).** Lookup por SHA-256 de `(provider, model, system_prompt, user_prompt, temperature, run_date_bucket)`. TTL configurável por KPI (24h base; 7d para rollups quando o cache é da view materializada, não da chamada). Storage primário Cloudflare KV; fallback Redis Upstash; dev SQLite WAL. Telemetry de hit/miss para painel de monitoração. Invalida em 5 cenários: drift confirmado, model version updated, prompt updated, cluster reorganizado, purge manual via CLI.

**Cost Tracker (`src/geo_collector/finops/tracker.py`).** Calcula `cost_usd = (tokens_in × price_in + tokens_out × price_out) / 1e6` na hora do retorno do provedor, multiplica por câmbio (5,20) para `cost_brl`, persiste em `data/finops/YYYY-MM.jsonl` e em `fct_finops_daily`. Aciona budget guards por LLM (50%, 80%, 95%, 100%). Trade-off: cálculo inline no Worker vs. job pós-execução — escolhido inline para pagar gate em tempo real (corte antes de torrar mais orçamento).

**Drift Detector (`src/geo_collector/drift/detector.py`).** Para cada `(provider, prompt_id)`, compara hash literal SHA-256 da resposta atual contra os 30 hashes anteriores e calcula similaridade de cosseno entre embedding atual e centroide histórico. Modelo de embedding: `paraphrase-multilingual-MiniLM-L12-v2` (cabe em Cloudflare Workers AI sem custo extra; tamanho 118MB; fits no 200MB cap de Workers Paid). Threshold inicial: similaridade <0,75 alerta drift suspeito; <0,55 marca drift confirmado. Disparo: 3+ queries do mesmo provedor com drift confirmado no mesmo dia → GitHub Issue + segmentação de série.

**Retry Manager (`src/geo_collector/retry/backoff.py`).** Exponential backoff com 3 tentativas: 1s, 4s, 16s (revisado vs. RUNBOOK 2/4/8 — backoff mais largo absorve melhor 429 do Claude Opus em pico). Erros transitórios (5xx, timeout, network, 429) → retry. Erros permanentes (4xx exceto 429) → falha imediata, log, marca prompt como `errored`. 429 com header `Retry-After` respeita o valor do header (até 5 min de teto absoluto).

**Circuit Breaker (`src/geo_collector/retry/circuit_breaker.py`).** Estado por LLM em Cloudflare Workers KV (`cb:{provider}`). 3 estados: CLOSED (normal), OPEN (5 falhas consecutivas em 60s → falha fast por 5 min), HALF_OPEN (após cooldown, 1 chamada de teste; sucesso → CLOSED, falha → OPEN). Notifier dispara alerta crítico ao abrir. Quando 4+ provedores entram em OPEN simultaneamente, escala imediatamente para Alexandre — provavelmente é incidente de rede ou de chaves, não falha de provedor.

**Result Persister (`src/geo_collector/persistence/jsonl_writer.py` + `warehouse.py`).** Persistência atômica em duas camadas: (a) JSONL hot em `data/coleta/YYYY-MM-DD.jsonl` (append-only, com upload para R2 em `s3://geo-platform/collections/year=YYYY/month=MM/day=DD/{provider}/`); (b) INSERT em `fct_collection` no D1 (warm tier) ou DuckDB (analítico). Validação pydantic v2 antes do flush. Trade-off: atomicidade entre JSONL e D1 — implementada via two-phase commit local (escreve JSONL primeiro com flag `committed=false`, INSERT em D1, atualiza flag para `true`; reconciliação no startup).

**Notifier (`src/geo_collector/notifier.py`).** Roteia eventos para canais conforme severidade. Crítico (drift Perplexity, 4+ circuits OPEN, FinOps 100%, coleta inválida 3 dias seguidos): @alexandre + @bruno via Slack + e-mail. Alto (coleta inválida, drift não-Perplexity): @alexandre mesmo dia. Médio (latência alta, cobertura 90-95%): logging silencioso. Baixo (cache hit > 80%): revisão semanal. Idempotência via key `{event_type}|{date}|{provider}` para evitar spam.

### A.3 Trade-offs arquiteturais relevantes

**Workers separados por LLM vs. wrapper único.** Escolhido separados. Vantagem: isolamento de falha (Claude Opus em rate limit não derruba Perplexity), fidelidade aos quirks (web_search Anthropic ≠ web_search OpenAI ≠ Google grounding), facilita debug. Desvantagem: ~15% mais código duplicado. Mitigação: classe base `BaseLLMClient` em `providers/base.py` concentra retry/breaker/cost; clientes filhos só implementam request/parse.

**Inline cost calculation vs. batch.** Escolhido inline. Vantagem: gate em tempo real bloqueia chamadas após 100% do teto na mesma sprint. Desvantagem: ~5ms de overhead por chamada. Aceitável (chamadas LLM têm p95 de 8-22 segundos).

**Embedding model próprio (MiniLM-L12-v2 multilingual) vs. API externa (OpenAI text-embedding-3-small).** Escolhido modelo próprio. Vantagem: zero custo marginal de drift detection (que rodaria em ~13.500 chamadas/mês), zero dependência adicional, fits em Workers. Desvantagem: qualidade ligeiramente inferior à OpenAI embedding-3-small em PT-BR avaliação Mteb (75% vs. 82%). Aceitável dado que threshold é calibrado contra ruído próprio.

**Two-phase commit JSONL+D1 vs. single-store.** Escolhido two-phase. Vantagem: JSONL é portátil (migração de Cloudflare → S3 ou Postgres é re-upload), D1 é fonte para dashboard quente. Desvantagem: complexidade de reconciliação. Mitigação: job de startup verifica linhas D1 sem JSONL ou JSONL sem D1 nas últimas 24h.

---

## Bloco B — Interface comum (Protocol em Python)

A `LLMProvider` Protocol é o contrato canônico que todos os 6 clientes implementam. Tipos definidos em `src/geo_collector/models.py` com pydantic v2.

### B.1 Tipos canônicos

```python
# src/geo_collector/models.py
from __future__ import annotations

from datetime import datetime, date
from decimal import Decimal
from typing import Protocol, runtime_checkable, Any

from pydantic import BaseModel, Field, ConfigDict


class Prompt(BaseModel):
    """Prompt canonico do KIT-PROMPTS-V0 enriquecido com metadata."""

    model_config = ConfigDict(frozen=True)

    prompt_id: str = Field(pattern=r"^K-[A-Z0-9]+-\d{3}$")
    prompt_version: int = Field(ge=1)
    cluster: str  # C1, C2, C3, transversal, head-to-head, objecao, descoberta-avancada
    persona: str  # P1..P7 ou Multi
    jornada: str  # J1, J2, J3, J4
    system_prompt: str
    user_prompt: str
    resposta_alvo_canonica: str
    temperature: float = Field(default=0.0, ge=0.0, le=2.0)
    max_tokens: int = Field(default=2048, ge=128, le=8192)
    enable_search: bool = False  # ativa web search/grounding quando o provider suporta
    kit_version: str  # "v0", "v1", ...

    @property
    def prompt_canonical_hash(self) -> str:
        """Hash canonico usado para cache e drift baseline."""
        import hashlib
        payload = (
            f"{self.prompt_id}|{self.prompt_version}|"
            f"{self.system_prompt}|{self.user_prompt}|"
            f"{self.temperature}|{self.max_tokens}|{self.enable_search}"
        )
        return hashlib.sha256(payload.encode("utf-8")).hexdigest()


class ModelInfo(BaseModel):
    """Identidade pinada do modelo do provider."""

    model_config = ConfigDict(frozen=True)

    provider: str  # openai, anthropic, google, perplexity, xai, microsoft
    model_pinned_version: str  # gpt-5.0, claude-opus-4-7, gemini-3-pro, sonar-pro, grok-4, copilot-2026
    model_alias_canonical: str  # ChatGPT, Claude, Gemini, Perplexity, Grok, Copilot
    is_rag_native: bool
    fixed_at: datetime
    next_review_at: date


class CostBreakdown(BaseModel):
    """Custo de uma chamada (USD + BRL com cambio aplicado)."""

    model_config = ConfigDict(frozen=True)

    tokens_in: int = Field(ge=0)
    tokens_out: int = Field(ge=0)
    cache_creation_tokens: int = Field(default=0, ge=0)  # Anthropic only
    cache_read_tokens: int = Field(default=0, ge=0)  # Anthropic only
    grounding_requests: int = Field(default=0, ge=0)  # Gemini googleSearch grounded
    search_sessions: int = Field(default=0, ge=0)  # Grok Live Search
    cost_usd: Decimal = Field(decimal_places=6, max_digits=10)
    cost_brl: Decimal = Field(decimal_places=4, max_digits=10)
    cambio_dia: Decimal = Field(default=Decimal("5.20"), decimal_places=4, max_digits=6)


class Citation(BaseModel):
    """Source citada na resposta (Perplexity, Copilot, Gemini grounding, etc.)."""

    model_config = ConfigDict(frozen=True)

    url: str
    title: str | None = None
    snippet: str | None = None
    score: float | None = None  # quando provider expoe ranking


class CollectionResult(BaseModel):
    """Resultado canonico de uma chamada LLM."""

    model_config = ConfigDict(frozen=True)

    collection_id: str  # ULID
    prompt_id: str
    prompt_canonical_hash: str
    model_info: ModelInfo
    response_text: str
    response_hash: str  # SHA-256 da response_text
    citations: list[Citation] = Field(default_factory=list)
    run_at: datetime
    latency_ms: int = Field(ge=0)
    cost: CostBreakdown
    cache_hit: bool = False
    error_code: str | None = None
    error_message: str | None = None
    raw_response: dict[str, Any] | None = None  # payload bruto para debug, dropado em prod
    pipeline_version: str = "geo-platform/0.1.0"


@runtime_checkable
class LLMProvider(Protocol):
    """Contrato canonico que todos os 6 clientes implementam."""

    async def call(
        self,
        prompt: Prompt,
        *,
        dry_run: bool = False,
    ) -> CollectionResult:
        """Executa a chamada protegida por retry, breaker e cost tracker.

        Em dry_run=True, valida payload e estima custo, sem chamar a API.
        Levanta ProviderUnavailable se circuit breaker estiver OPEN.
        """
        ...

    def estimate_cost(self, prompt: Prompt) -> Decimal:
        """Estima custo USD da chamada antes de executar (gate FinOps)."""
        ...

    def is_available(self) -> bool:
        """Circuit breaker check: True se CLOSED ou HALF_OPEN, False se OPEN."""
        ...

    def model_info(self) -> ModelInfo:
        """Identidade pinada do modelo (para enriquecer logs e dim_llm)."""
        ...
```

### B.2 Decisões de design da Protocol

A Protocol é deliberadamente enxuta. Não força os clientes a expor `tokens_in`, `tokens_out` separadamente fora da `CollectionResult` — isso cabe no `CostBreakdown`. Não força `headers` ou `base_url` no contrato — isso é detalhe de implementação. O método `estimate_cost` retorna `Decimal` para evitar erros de ponto flutuante em FinOps.

`call()` é assíncrono (cohort de 6 LLMs com `asyncio.gather` no Orchestrator). `dry_run=True` é canônico para testes de contrato em CI sem queimar tokens.

`is_available()` é sincrono porque o circuit breaker lê estado de cache local (Workers KV ou Redis) com latência <10ms — não vale o overhead de await.

`model_info()` retorna sempre a versão pinada vigente; quando `dim_llm` é atualizado com nova versão, o provider client é re-instanciado pelo Orchestrator no próximo run.

---

## Bloco C — Implementação dos 6 Provider Clients

Cada cliente é um adapter sobre o SDK ou HTTP raw do provedor, com a `LLMProvider` Protocol implementada. Os subitens C.1-C.6 detalham endpoint, headers, body, parsing, custos, rate limits, quirks e snippets canônicos.

### C.1 OpenAI ChatGPT — `gpt-5.0`

**Endpoint:** `POST https://api.openai.com/v1/chat/completions`
**Variável de ambiente:** `OPENAI_API_KEY`
**Headers:** `Authorization: Bearer $OPENAI_API_KEY`, `Content-Type: application/json`, `Idempotency-Key: {sha256_canonical}`
**Custo (projetado 2026-Q2):** USD 5,00/1M input, USD 15,00/1M output (curva premium gpt-5.0)
**Custo médio por chamada:** R$ 0,104 (sem search) a R$ 0,156 (com web_search)
**Rate limits (Tier 3+ requerido):** 10.000 RPM, 30.000.000 TPM
**Quirks:** `web_search` retorna citations em `tool_calls[].function.arguments` formato JSON; variabilidade de saída mesmo com `temperature=0` por causa de top-p estocástico — capturado pelo drift detector.

**Snippet canônico:**

```python
# src/geo_collector/providers/openai.py
from __future__ import annotations

import os
from datetime import datetime, UTC
from decimal import Decimal
from typing import Any

import httpx
from ulid import ULID

from geo_collector.models import (
    CollectionResult, CostBreakdown, ModelInfo, Prompt, Citation,
)
from geo_collector.providers.base import BaseLLMClient
from geo_collector.retry.circuit_breaker import CircuitOpen


PRICE_IN_PER_1M = Decimal("5.00")
PRICE_OUT_PER_1M = Decimal("15.00")
CAMBIO = Decimal("5.20")


class OpenAIClient(BaseLLMClient):
    provider = "openai"
    model_pinned = "gpt-5.0"
    model_alias = "ChatGPT"
    is_rag_native = False

    BASE_URL = "https://api.openai.com/v1/chat/completions"

    def __init__(self, http: httpx.AsyncClient) -> None:
        super().__init__(http=http)
        self.api_key = os.environ["OPENAI_API_KEY"]

    async def call(
        self,
        prompt: Prompt,
        *,
        dry_run: bool = False,
    ) -> CollectionResult:
        if not self.is_available():
            raise CircuitOpen(self.provider)

        if dry_run:
            return self._dry_run_result(prompt)

        body: dict[str, Any] = {
            "model": self.model_pinned,
            "messages": [
                {"role": "system", "content": prompt.system_prompt},
                {"role": "user", "content": prompt.user_prompt},
            ],
            "temperature": prompt.temperature,
            "max_tokens": prompt.max_tokens,
        }
        if prompt.enable_search:
            body["tools"] = [{"type": "web_search"}]
            body["tool_choice"] = "auto"

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "Idempotency-Key": prompt.prompt_canonical_hash[:48],
        }

        timeout = 60.0 if prompt.enable_search else 30.0
        started = datetime.now(UTC)
        response = await self._call_with_retry(
            method="POST",
            url=self.BASE_URL,
            headers=headers,
            json=body,
            timeout=timeout,
        )
        latency_ms = int((datetime.now(UTC) - started).total_seconds() * 1000)

        data = response.json()
        choice = data["choices"][0]["message"]
        text = choice.get("content") or ""

        citations: list[Citation] = []
        for tc in choice.get("tool_calls") or []:
            if tc.get("function", {}).get("name") == "web_search":
                # Cada provider serializa citations diferente; OpenAI manda JSON em arguments
                import json as _json
                args = _json.loads(tc["function"]["arguments"])
                for src in args.get("results", []):
                    citations.append(Citation(
                        url=src.get("url", ""),
                        title=src.get("title"),
                        snippet=src.get("snippet"),
                    ))

        usage = data["usage"]
        tokens_in = usage["prompt_tokens"]
        tokens_out = usage["completion_tokens"]
        cost = self._compute_cost(tokens_in, tokens_out)

        return CollectionResult(
            collection_id=str(ULID()),
            prompt_id=prompt.prompt_id,
            prompt_canonical_hash=prompt.prompt_canonical_hash,
            model_info=self.model_info(),
            response_text=text,
            response_hash=self._sha256(text),
            citations=citations,
            run_at=started,
            latency_ms=latency_ms,
            cost=cost,
            cache_hit=False,
        )

    def estimate_cost(self, prompt: Prompt) -> Decimal:
        # Estimativa conservadora: 1500 input + 800 output
        est_in = 1500
        est_out = min(prompt.max_tokens, 800)
        cost_usd = (
            Decimal(est_in) * PRICE_IN_PER_1M / Decimal("1000000")
            + Decimal(est_out) * PRICE_OUT_PER_1M / Decimal("1000000")
        )
        return cost_usd

    def model_info(self) -> ModelInfo:
        return ModelInfo(
            provider=self.provider,
            model_pinned_version=self.model_pinned,
            model_alias_canonical=self.model_alias,
            is_rag_native=self.is_rag_native,
            fixed_at=datetime(2026, 5, 1, tzinfo=UTC),
            next_review_at=datetime(2026, 8, 1).date(),
        )

    def _compute_cost(self, tokens_in: int, tokens_out: int) -> CostBreakdown:
        cost_usd = (
            Decimal(tokens_in) * PRICE_IN_PER_1M / Decimal("1000000")
            + Decimal(tokens_out) * PRICE_OUT_PER_1M / Decimal("1000000")
        )
        return CostBreakdown(
            tokens_in=tokens_in,
            tokens_out=tokens_out,
            cost_usd=cost_usd.quantize(Decimal("0.000001")),
            cost_brl=(cost_usd * CAMBIO).quantize(Decimal("0.0001")),
            cambio_dia=CAMBIO,
        )
```

### C.2 Anthropic Claude — `claude-opus-4-7`

**Endpoint:** `POST https://api.anthropic.com/v1/messages`
**Variável de ambiente:** `ANTHROPIC_API_KEY`
**Headers:** `x-api-key: $ANTHROPIC_API_KEY`, `anthropic-version: 2023-06-01`, `Content-Type: application/json`, `anthropic-beta: web-search-2025-03` (quando search ativo), `anthropic-beta: prompt-caching-2024-07-31` (sempre, para reduzir custo do system prompt repetido)
**Custo:** USD 15,00/1M input, USD 75,00/1M output, USD 18,75/1M cache write, USD 1,50/1M cache read (90% off)
**Custo médio por chamada:** R$ 0,338 (sem search, sem cache hit) a R$ 0,427 (com web_search); R$ 0,338 → R$ 0,047 quando 90% do system prompt está cacheado
**Rate limits (Tier 3+ requerido):** 4.000 RPM, 400.000 ITPM, 80.000 OTPM
**Quirks:** `usage` retorna `input_tokens`, `output_tokens`, `cache_creation_input_tokens`, `cache_read_input_tokens` separadamente. `tools.web_search_20250305` aceita `max_uses` para controlar custo. Modelo Opus é ~3× mais lento que Sonnet — janela 06h-09h BRT pode estender em 30 min. **Nota crítica de FinOps:** o `dashboards/FINOPS-DISCIPLINA.md` aloca 60% do orçamento ao Claude já contando com Sonnet 4.5; a migração para Opus 4.7 exige recalibração da alocação ou downgrade da coleta cross-LLM para Sonnet 4.7+ quando disponível, mantendo Opus apenas no papel Revisor do pipeline editorial.

**Snippet canônico (foco em prompt caching e parsing de usage):**

```python
# src/geo_collector/providers/anthropic.py
from decimal import Decimal
import os
from datetime import datetime, UTC

import httpx
from ulid import ULID

from geo_collector.models import CollectionResult, CostBreakdown, Prompt, Citation, ModelInfo
from geo_collector.providers.base import BaseLLMClient
from geo_collector.retry.circuit_breaker import CircuitOpen


PRICE_IN = Decimal("15.00")
PRICE_OUT = Decimal("75.00")
PRICE_CACHE_WRITE = Decimal("18.75")
PRICE_CACHE_READ = Decimal("1.50")
CAMBIO = Decimal("5.20")


class AnthropicClient(BaseLLMClient):
    provider = "anthropic"
    model_pinned = "claude-opus-4-7"
    model_alias = "Claude"
    is_rag_native = False

    BASE_URL = "https://api.anthropic.com/v1/messages"

    def __init__(self, http: httpx.AsyncClient) -> None:
        super().__init__(http=http)
        self.api_key = os.environ["ANTHROPIC_API_KEY"]

    async def call(self, prompt: Prompt, *, dry_run: bool = False) -> CollectionResult:
        if not self.is_available():
            raise CircuitOpen(self.provider)
        if dry_run:
            return self._dry_run_result(prompt)

        # System prompt declarado em bloco com cache_control para promotor de cache
        body = {
            "model": self.model_pinned,
            "max_tokens": prompt.max_tokens,
            "temperature": prompt.temperature,
            "system": [
                {
                    "type": "text",
                    "text": prompt.system_prompt,
                    "cache_control": {"type": "ephemeral"},
                },
            ],
            "messages": [{"role": "user", "content": prompt.user_prompt}],
        }
        if prompt.enable_search:
            body["tools"] = [{
                "type": "web_search_20250305",
                "name": "web_search",
                "max_uses": 3,
            }]

        beta_headers = ["prompt-caching-2024-07-31"]
        if prompt.enable_search:
            beta_headers.append("web-search-2025-03")

        headers = {
            "x-api-key": self.api_key,
            "anthropic-version": "2023-06-01",
            "anthropic-beta": ",".join(beta_headers),
            "Content-Type": "application/json",
        }

        timeout = 60.0 if prompt.enable_search else 45.0
        started = datetime.now(UTC)
        response = await self._call_with_retry(
            method="POST",
            url=self.BASE_URL,
            headers=headers,
            json=body,
            timeout=timeout,
        )
        latency_ms = int((datetime.now(UTC) - started).total_seconds() * 1000)
        data = response.json()

        # Resposta: data["content"] e' lista de blocos {type: text|tool_use, ...}
        text_parts = [b["text"] for b in data["content"] if b.get("type") == "text"]
        text = "\n".join(text_parts)

        citations: list[Citation] = []
        for block in data["content"]:
            if block.get("type") == "tool_use" and block.get("name") == "web_search":
                # Anthropic retorna sources nas tool_result blocks subsequentes; fluxo simplificado:
                for src in (block.get("input") or {}).get("results", []):
                    citations.append(Citation(url=src.get("url", "")))

        usage = data["usage"]
        cost = self._compute_cost(
            tokens_in=usage["input_tokens"],
            tokens_out=usage["output_tokens"],
            cache_creation=usage.get("cache_creation_input_tokens", 0),
            cache_read=usage.get("cache_read_input_tokens", 0),
        )

        return CollectionResult(
            collection_id=str(ULID()),
            prompt_id=prompt.prompt_id,
            prompt_canonical_hash=prompt.prompt_canonical_hash,
            model_info=self.model_info(),
            response_text=text,
            response_hash=self._sha256(text),
            citations=citations,
            run_at=started,
            latency_ms=latency_ms,
            cost=cost,
            cache_hit=False,
        )

    def _compute_cost(
        self,
        tokens_in: int,
        tokens_out: int,
        cache_creation: int,
        cache_read: int,
    ) -> CostBreakdown:
        cost_usd = (
            Decimal(tokens_in) * PRICE_IN / Decimal("1000000")
            + Decimal(tokens_out) * PRICE_OUT / Decimal("1000000")
            + Decimal(cache_creation) * PRICE_CACHE_WRITE / Decimal("1000000")
            + Decimal(cache_read) * PRICE_CACHE_READ / Decimal("1000000")
        )
        return CostBreakdown(
            tokens_in=tokens_in,
            tokens_out=tokens_out,
            cache_creation_tokens=cache_creation,
            cache_read_tokens=cache_read,
            cost_usd=cost_usd.quantize(Decimal("0.000001")),
            cost_brl=(cost_usd * CAMBIO).quantize(Decimal("0.0001")),
            cambio_dia=CAMBIO,
        )

    def estimate_cost(self, prompt: Prompt) -> Decimal:
        est_in = 1500
        est_out = min(prompt.max_tokens, 800)
        return (
            Decimal(est_in) * PRICE_IN / Decimal("1000000")
            + Decimal(est_out) * PRICE_OUT / Decimal("1000000")
        )

    def model_info(self) -> ModelInfo:
        return ModelInfo(
            provider=self.provider,
            model_pinned_version=self.model_pinned,
            model_alias_canonical=self.model_alias,
            is_rag_native=self.is_rag_native,
            fixed_at=datetime(2026, 5, 1, tzinfo=UTC),
            next_review_at=datetime(2026, 8, 1).date(),
        )
```

### C.3 Google Gemini — `gemini-3-pro`

**Endpoint:** `POST https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro:generateContent?key=$GOOGLE_API_KEY` (AI Studio); alternativa Vertex AI para enterprise (`POST https://us-central1-aiplatform.googleapis.com/v1/projects/{proj}/locations/us-central1/publishers/google/models/gemini-3-pro:generateContent` com OAuth ADC)
**Variável de ambiente:** `GOOGLE_API_KEY` (AI Studio) ou `GOOGLE_APPLICATION_CREDENTIALS` (Vertex)
**Headers:** `Content-Type: application/json`
**Custo (projeção):** USD 1,25/1M input, USD 5,00/1M output (mantendo perfil 1.5-pro com markup gemini-3); Google Search grounding cobrado **por request** (USD 35/1.000 grounded requests = USD 0,035/request), não por token
**Custo médio por chamada:** R$ 0,031 (sem grounding) a R$ 0,213 (com Google Search)
**Rate limits:** AI Studio Tier 2 1.000 RPM; Tier 3 2.000 RPM. Vertex AI 600 QPM por região default.
**Quirks:** parsing de `candidates[0].content.parts[].text` exige concatenação de todos os parts (modelo pode dividir output em múltiplos parts). `groundingMetadata` traz `groundingChunks` (URIs + snippets) e `groundingSupports` (mapeamento token → source) — formato mais rico que ChatGPT search e Perplexity para extração de URL canônica. **Nota:** Vertex AI tem latência ~30% menor que AI Studio mas exige ADC.

**Snippet canônico:**

```python
# src/geo_collector/providers/google.py
from decimal import Decimal
import os
from datetime import datetime, UTC

import httpx
from ulid import ULID

from geo_collector.models import CollectionResult, CostBreakdown, Prompt, Citation, ModelInfo
from geo_collector.providers.base import BaseLLMClient


PRICE_IN = Decimal("1.25")
PRICE_OUT = Decimal("5.00")
PRICE_GROUNDING_PER_REQUEST = Decimal("0.035")
CAMBIO = Decimal("5.20")


class GoogleClient(BaseLLMClient):
    provider = "google"
    model_pinned = "gemini-3-pro"
    model_alias = "Gemini"
    is_rag_native = False  # parcial: googleSearch on-demand

    BASE_URL = (
        "https://generativelanguage.googleapis.com/v1beta/models/"
        "gemini-3-pro:generateContent"
    )

    def __init__(self, http: httpx.AsyncClient) -> None:
        super().__init__(http=http)
        self.api_key = os.environ["GOOGLE_API_KEY"]

    async def call(self, prompt: Prompt, *, dry_run: bool = False) -> CollectionResult:
        if not self.is_available():
            from geo_collector.retry.circuit_breaker import CircuitOpen
            raise CircuitOpen(self.provider)
        if dry_run:
            return self._dry_run_result(prompt)

        body: dict = {
            "contents": [
                {"role": "user", "parts": [{"text": prompt.user_prompt}]},
            ],
            "systemInstruction": {"parts": [{"text": prompt.system_prompt}]},
            "generationConfig": {
                "temperature": prompt.temperature,
                "maxOutputTokens": prompt.max_tokens,
            },
        }
        if prompt.enable_search:
            body["tools"] = [{"googleSearch": {}}]

        url = f"{self.BASE_URL}?key={self.api_key}"
        timeout = 60.0 if prompt.enable_search else 30.0
        started = datetime.now(UTC)
        response = await self._call_with_retry(
            method="POST",
            url=url,
            headers={"Content-Type": "application/json"},
            json=body,
            timeout=timeout,
        )
        latency_ms = int((datetime.now(UTC) - started).total_seconds() * 1000)
        data = response.json()

        candidate = data["candidates"][0]
        text = "".join(p.get("text", "") for p in candidate["content"]["parts"])

        citations: list[Citation] = []
        gm = candidate.get("groundingMetadata", {})
        for chunk in gm.get("groundingChunks", []):
            web = chunk.get("web", {})
            citations.append(Citation(
                url=web.get("uri", ""),
                title=web.get("title"),
            ))

        usage = data.get("usageMetadata", {})
        tokens_in = usage.get("promptTokenCount", 0)
        tokens_out = usage.get("candidatesTokenCount", 0)
        grounding_requests = 1 if (prompt.enable_search and gm) else 0

        cost_usd = (
            Decimal(tokens_in) * PRICE_IN / Decimal("1000000")
            + Decimal(tokens_out) * PRICE_OUT / Decimal("1000000")
            + Decimal(grounding_requests) * PRICE_GROUNDING_PER_REQUEST
        )
        cost = CostBreakdown(
            tokens_in=tokens_in,
            tokens_out=tokens_out,
            grounding_requests=grounding_requests,
            cost_usd=cost_usd.quantize(Decimal("0.000001")),
            cost_brl=(cost_usd * CAMBIO).quantize(Decimal("0.0001")),
            cambio_dia=CAMBIO,
        )

        return CollectionResult(
            collection_id=str(ULID()),
            prompt_id=prompt.prompt_id,
            prompt_canonical_hash=prompt.prompt_canonical_hash,
            model_info=self.model_info(),
            response_text=text,
            response_hash=self._sha256(text),
            citations=citations,
            run_at=started,
            latency_ms=latency_ms,
            cost=cost,
            cache_hit=False,
        )

    def estimate_cost(self, prompt: Prompt) -> Decimal:
        est_in = 1500
        est_out = min(prompt.max_tokens, 800)
        base = (
            Decimal(est_in) * PRICE_IN / Decimal("1000000")
            + Decimal(est_out) * PRICE_OUT / Decimal("1000000")
        )
        return base + (PRICE_GROUNDING_PER_REQUEST if prompt.enable_search else Decimal(0))

    def model_info(self) -> ModelInfo:
        return ModelInfo(
            provider=self.provider,
            model_pinned_version=self.model_pinned,
            model_alias_canonical=self.model_alias,
            is_rag_native=self.is_rag_native,
            fixed_at=datetime(2026, 5, 1, tzinfo=UTC),
            next_review_at=datetime(2026, 8, 1).date(),
        )
```

### C.4 Perplexity — `sonar-pro`

**Endpoint:** `POST https://api.perplexity.ai/chat/completions`
**Variável de ambiente:** `PERPLEXITY_API_KEY`
**Headers:** `Authorization: Bearer $PERPLEXITY_API_KEY`, `Content-Type: application/json`
**Custo:** USD 3,00/1M input, USD 15,00/1M output, USD 5,00/1.000 search queries (cobrado embutido na chamada)
**Custo médio por chamada:** R$ 0,140 (com 1.500 input + 1.500 output, output mais verboso entre os 6)
**Rate limits:** Tier público 50 RPM; Tier Pro 600 RPM via API key dedicada (programa requer Tier Pro)
**Quirks:** **RAG-native obrigatório** — Perplexity sempre faz busca, nunca é puramente paramétrico. `return_citations: true` é o flag canônico. `search_recency_filter` aceita `hour`, `day`, `week`, `month`, `year`; programa usa `month` para descoberta e `week` para auditoria de drift. **NÃO tem prompt caching** — coleta diária paga 100% do input em todas as 75 chamadas. **Sensor obrigatório:** ausência por 24h declara coleta inválida. **Emergency stop FinOps NÃO se aplica.**

**Snippet canônico:**

```python
# src/geo_collector/providers/perplexity.py
from decimal import Decimal
import os
from datetime import datetime, UTC

import httpx
from ulid import ULID

from geo_collector.models import CollectionResult, CostBreakdown, Prompt, Citation, ModelInfo
from geo_collector.providers.base import BaseLLMClient


PRICE_IN = Decimal("3.00")
PRICE_OUT = Decimal("15.00")
PRICE_SEARCH_PER_QUERY = Decimal("0.005")  # USD 5/1k
CAMBIO = Decimal("5.20")


class PerplexityClient(BaseLLMClient):
    provider = "perplexity"
    model_pinned = "sonar-pro"
    model_alias = "Perplexity"
    is_rag_native = True
    is_mandatory_sensor = True  # FinOps emergency stop NAO se aplica

    BASE_URL = "https://api.perplexity.ai/chat/completions"

    def __init__(self, http: httpx.AsyncClient) -> None:
        super().__init__(http=http)
        self.api_key = os.environ["PERPLEXITY_API_KEY"]

    async def call(self, prompt: Prompt, *, dry_run: bool = False) -> CollectionResult:
        if not self.is_available():
            from geo_collector.retry.circuit_breaker import CircuitOpen
            raise CircuitOpen(self.provider)
        if dry_run:
            return self._dry_run_result(prompt)

        body = {
            "model": self.model_pinned,
            "messages": [
                {"role": "system", "content": prompt.system_prompt},
                {"role": "user", "content": prompt.user_prompt},
            ],
            # Perplexity recomenda temperature pequena mas nao-zero para qualidade RAG
            "temperature": max(prompt.temperature, 0.2),
            "search_recency_filter": "month",
            "return_citations": True,
            "return_images": False,
        }

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        timeout = 60.0  # Perplexity sempre faz busca

        started = datetime.now(UTC)
        response = await self._call_with_retry(
            method="POST",
            url=self.BASE_URL,
            headers=headers,
            json=body,
            timeout=timeout,
        )
        latency_ms = int((datetime.now(UTC) - started).total_seconds() * 1000)
        data = response.json()

        text = data["choices"][0]["message"]["content"]
        citations = [
            Citation(url=u) for u in (data.get("citations") or [])
        ]

        usage = data["usage"]
        tokens_in = usage["prompt_tokens"]
        tokens_out = usage["completion_tokens"]
        search_queries = usage.get("num_search_queries", 1)

        cost_usd = (
            Decimal(tokens_in) * PRICE_IN / Decimal("1000000")
            + Decimal(tokens_out) * PRICE_OUT / Decimal("1000000")
            + Decimal(search_queries) * PRICE_SEARCH_PER_QUERY
        )
        cost = CostBreakdown(
            tokens_in=tokens_in,
            tokens_out=tokens_out,
            search_sessions=search_queries,
            cost_usd=cost_usd.quantize(Decimal("0.000001")),
            cost_brl=(cost_usd * CAMBIO).quantize(Decimal("0.0001")),
            cambio_dia=CAMBIO,
        )

        return CollectionResult(
            collection_id=str(ULID()),
            prompt_id=prompt.prompt_id,
            prompt_canonical_hash=prompt.prompt_canonical_hash,
            model_info=self.model_info(),
            response_text=text,
            response_hash=self._sha256(text),
            citations=citations,
            run_at=started,
            latency_ms=latency_ms,
            cost=cost,
            cache_hit=False,
        )

    def estimate_cost(self, prompt: Prompt) -> Decimal:
        est_in = 1500
        est_out = 1500  # Perplexity tem output verboso
        return (
            Decimal(est_in) * PRICE_IN / Decimal("1000000")
            + Decimal(est_out) * PRICE_OUT / Decimal("1000000")
            + PRICE_SEARCH_PER_QUERY
        )

    def model_info(self) -> ModelInfo:
        return ModelInfo(
            provider=self.provider,
            model_pinned_version=self.model_pinned,
            model_alias_canonical=self.model_alias,
            is_rag_native=self.is_rag_native,
            fixed_at=datetime(2026, 5, 1, tzinfo=UTC),
            next_review_at=datetime(2026, 8, 1).date(),
        )
```

### C.5 xAI Grok — `grok-4`

**Endpoint:** `POST https://api.x.ai/v1/chat/completions` (compatível OpenAI)
**Variável de ambiente:** `XAI_API_KEY`
**Headers:** `Authorization: Bearer $XAI_API_KEY`, `Content-Type: application/json`
**Custo (projeção):** USD 5,00/1M input, USD 15,00/1M output (markup vs grok-2); Live Search USD 25/1.000 sessions = USD 0,025/sessão
**Custo médio por chamada:** R$ 0,099 (sem search) a R$ 0,229 (com Live Search)
**Rate limits:** 60 RPM tier padrão; tiers maiores via x.ai Enterprise
**Quirks:** Live Search puxa de X (Twitter) por padrão — pode contaminar com conteúdo redes sociais; programa usa `sources: [{"type":"web"}]` apenas. Resposta tende mais curta (~600-1.000 tokens médios). Grok é o mais lento dos 6 (~22s p95). Maior taxa de 5xx transientes (~2-3%).

**Snippet canônico:**

```python
# src/geo_collector/providers/xai.py
from decimal import Decimal
import os
from datetime import datetime, UTC

import httpx
from ulid import ULID

from geo_collector.models import CollectionResult, CostBreakdown, Prompt, Citation, ModelInfo
from geo_collector.providers.base import BaseLLMClient


PRICE_IN = Decimal("5.00")
PRICE_OUT = Decimal("15.00")
PRICE_LIVE_SEARCH = Decimal("0.025")
CAMBIO = Decimal("5.20")


class XAIClient(BaseLLMClient):
    provider = "xai"
    model_pinned = "grok-4"
    model_alias = "Grok"
    is_rag_native = False

    BASE_URL = "https://api.x.ai/v1/chat/completions"

    def __init__(self, http: httpx.AsyncClient) -> None:
        super().__init__(http=http)
        self.api_key = os.environ["XAI_API_KEY"]

    async def call(self, prompt: Prompt, *, dry_run: bool = False) -> CollectionResult:
        if not self.is_available():
            from geo_collector.retry.circuit_breaker import CircuitOpen
            raise CircuitOpen(self.provider)
        if dry_run:
            return self._dry_run_result(prompt)

        body: dict = {
            "model": self.model_pinned,
            "messages": [
                {"role": "system", "content": prompt.system_prompt},
                {"role": "user", "content": prompt.user_prompt},
            ],
            "temperature": prompt.temperature,
            "max_tokens": prompt.max_tokens,
        }
        if prompt.enable_search:
            body["search_parameters"] = {
                "mode": "on",
                "sources": [{"type": "web"}],  # Excluir X por padrao
            }

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        timeout = 90.0 if prompt.enable_search else 45.0

        started = datetime.now(UTC)
        response = await self._call_with_retry(
            method="POST",
            url=self.BASE_URL,
            headers=headers,
            json=body,
            timeout=timeout,
        )
        latency_ms = int((datetime.now(UTC) - started).total_seconds() * 1000)
        data = response.json()

        text = data["choices"][0]["message"]["content"]
        citations = [Citation(url=u) for u in (data.get("citations") or [])]
        usage = data["usage"]
        tokens_in = usage["prompt_tokens"]
        tokens_out = usage["completion_tokens"]
        live_search_sessions = 1 if prompt.enable_search else 0

        cost_usd = (
            Decimal(tokens_in) * PRICE_IN / Decimal("1000000")
            + Decimal(tokens_out) * PRICE_OUT / Decimal("1000000")
            + Decimal(live_search_sessions) * PRICE_LIVE_SEARCH
        )
        cost = CostBreakdown(
            tokens_in=tokens_in,
            tokens_out=tokens_out,
            search_sessions=live_search_sessions,
            cost_usd=cost_usd.quantize(Decimal("0.000001")),
            cost_brl=(cost_usd * CAMBIO).quantize(Decimal("0.0001")),
            cambio_dia=CAMBIO,
        )

        return CollectionResult(
            collection_id=str(ULID()),
            prompt_id=prompt.prompt_id,
            prompt_canonical_hash=prompt.prompt_canonical_hash,
            model_info=self.model_info(),
            response_text=text,
            response_hash=self._sha256(text),
            citations=citations,
            run_at=started,
            latency_ms=latency_ms,
            cost=cost,
            cache_hit=False,
        )

    def estimate_cost(self, prompt: Prompt) -> Decimal:
        est_in = 1500
        est_out = 700  # Grok responde mais curto
        base = (
            Decimal(est_in) * PRICE_IN / Decimal("1000000")
            + Decimal(est_out) * PRICE_OUT / Decimal("1000000")
        )
        return base + (PRICE_LIVE_SEARCH if prompt.enable_search else Decimal(0))

    def model_info(self) -> ModelInfo:
        return ModelInfo(
            provider=self.provider,
            model_pinned_version=self.model_pinned,
            model_alias_canonical=self.model_alias,
            is_rag_native=self.is_rag_native,
            fixed_at=datetime(2026, 5, 1, tzinfo=UTC),
            next_review_at=datetime(2026, 8, 1).date(),
        )
```

### C.6 Microsoft Copilot — `copilot-2026`

**Endpoint primário:** Microsoft 365 Copilot via Graph API: `POST https://graph.microsoft.com/v1.0/me/copilot/chats/{chatId}/messages`
**Endpoint alternativo (fallback):** Azure OpenAI com Bing grounding: `POST https://{resource}.openai.azure.com/openai/deployments/{deployment}/chat/completions?api-version=2024-10-01-preview`
**Variáveis de ambiente:** `MS_GRAPH_TENANT_ID`, `MS_GRAPH_CLIENT_ID`, `MS_GRAPH_CLIENT_SECRET` (Entra ID OAuth2 client_credentials) ou `AZURE_OPENAI_API_KEY` + `AZURE_OPENAI_ENDPOINT`
**Headers:** `Authorization: Bearer $MS_GRAPH_TOKEN`, `Content-Type: application/json`
**Custo:** Microsoft 365 Copilot é por **seat** (USD 30/usuário/mês), custo marginal por chamada zero, mas com limite operacional via rate limit Graph. Programa GEO IPOG aloca 1 seat dedicado: **R$ 156,00/mês fixo (R$ 5,20/dia)**. Azure OpenAI proxy: cobra como gpt-4o (USD 2,50/1M in, USD 10/1M out) + Bing Search USD 4/1.000 transações.
**Rate limits:** Graph API 10.000 requests/10min por app por tenant (default). Azure OpenAI conforme deployment.
**Quirks:** Copilot é o LLM **mais difícil de automatizar com fidelidade**. O "Copilot" da interface oficial usa orchestration interna não-exposta na API. Pipeline GEO IPOG adota **híbrido**: (a) coleta primária via Graph API com seat dedicado para fidelidade ao produto real; (b) fallback Azure OpenAI + Bing grounding quando Graph indisponível, com flag `copilot_simulado: true` no log. **KPIs mensais comparam apenas leituras com `copilot_simulado: false`.** Token Entra ID precisa refresh a cada 60min.

**Snippet canônico (caminho híbrido com flag):**

```python
# src/geo_collector/providers/microsoft.py
from decimal import Decimal
import os
from datetime import datetime, UTC, timedelta

import httpx
from ulid import ULID

from geo_collector.models import CollectionResult, CostBreakdown, Prompt, Citation, ModelInfo
from geo_collector.providers.base import BaseLLMClient


PRICE_AZURE_IN = Decimal("2.50")
PRICE_AZURE_OUT = Decimal("10.00")
PRICE_BING_PER_REQUEST = Decimal("0.004")
GRAPH_DAILY_FIXED_USD = Decimal("1.00")  # ~30 USD/30 dias por seat
CAMBIO = Decimal("5.20")


class MicrosoftClient(BaseLLMClient):
    provider = "microsoft"
    model_pinned = "copilot-2026"
    model_alias = "Copilot"
    is_rag_native = True

    GRAPH_BASE = "https://graph.microsoft.com/v1.0"

    def __init__(self, http: httpx.AsyncClient) -> None:
        super().__init__(http=http)
        self._token: str | None = None
        self._token_expiry: datetime | None = None

    async def _refresh_graph_token(self) -> str:
        tenant = os.environ["MS_GRAPH_TENANT_ID"]
        client_id = os.environ["MS_GRAPH_CLIENT_ID"]
        client_secret = os.environ["MS_GRAPH_CLIENT_SECRET"]
        url = f"https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token"
        data = {
            "grant_type": "client_credentials",
            "client_id": client_id,
            "client_secret": client_secret,
            "scope": "https://graph.microsoft.com/.default",
        }
        resp = await self.http.post(url, data=data, timeout=15.0)
        resp.raise_for_status()
        payload = resp.json()
        self._token = payload["access_token"]
        self._token_expiry = datetime.now(UTC) + timedelta(seconds=payload["expires_in"] - 300)
        return self._token

    async def _ensure_token(self) -> str:
        if self._token is None or (self._token_expiry and datetime.now(UTC) >= self._token_expiry):
            return await self._refresh_graph_token()
        return self._token

    async def call(self, prompt: Prompt, *, dry_run: bool = False) -> CollectionResult:
        if not self.is_available():
            from geo_collector.retry.circuit_breaker import CircuitOpen
            raise CircuitOpen(self.provider)
        if dry_run:
            return self._dry_run_result(prompt)

        try:
            return await self._call_graph(prompt)
        except (httpx.HTTPError, KeyError) as exc:
            # Fallback Azure OpenAI + Bing grounding com flag copilot_simulado
            self._log_warning(f"Graph failure, falling back to Azure OpenAI: {exc}")
            return await self._call_azure_fallback(prompt)

    async def _call_graph(self, prompt: Prompt) -> CollectionResult:
        token = await self._ensure_token()
        chat_id = "primary"
        url = f"{self.GRAPH_BASE}/me/copilot/chats/{chat_id}/messages"
        body = {"body": {"content": prompt.user_prompt, "contentType": "text"}}
        headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

        started = datetime.now(UTC)
        response = await self._call_with_retry(
            method="POST", url=url, headers=headers, json=body, timeout=60.0,
        )
        latency_ms = int((datetime.now(UTC) - started).total_seconds() * 1000)
        data = response.json()
        text = data.get("body", {}).get("content", "")

        # Custo dia-a-dia eh o seat fixo, dividido por chamada esperada
        cost_usd = GRAPH_DAILY_FIXED_USD / Decimal(450)  # 75 prompts x 6 LLMs
        cost = CostBreakdown(
            tokens_in=0,  # Graph nao expoe tokens
            tokens_out=0,
            cost_usd=cost_usd.quantize(Decimal("0.000001")),
            cost_brl=(cost_usd * CAMBIO).quantize(Decimal("0.0001")),
            cambio_dia=CAMBIO,
        )

        return CollectionResult(
            collection_id=str(ULID()),
            prompt_id=prompt.prompt_id,
            prompt_canonical_hash=prompt.prompt_canonical_hash,
            model_info=self.model_info(),
            response_text=text,
            response_hash=self._sha256(text),
            citations=[],  # Graph nao expoe citations padronizadas
            run_at=started,
            latency_ms=latency_ms,
            cost=cost,
            cache_hit=False,
            raw_response={"copilot_simulado": False, "source": "graph"},
        )

    async def _call_azure_fallback(self, prompt: Prompt) -> CollectionResult:
        endpoint = os.environ["AZURE_OPENAI_ENDPOINT"]
        deployment = os.environ.get("AZURE_OPENAI_DEPLOYMENT", "gpt-4o")
        key = os.environ["AZURE_OPENAI_API_KEY"]
        url = (
            f"{endpoint}/openai/deployments/{deployment}/chat/completions"
            "?api-version=2024-10-01-preview"
        )
        body = {
            "messages": [
                {"role": "system", "content": prompt.system_prompt},
                {"role": "user", "content": prompt.user_prompt},
            ],
            "temperature": prompt.temperature,
            "max_tokens": prompt.max_tokens,
            # Bing grounding via extension
            "data_sources": [{
                "type": "azure_search",
                "parameters": {"connection_string": os.environ.get("AZURE_BING_CONN", "")},
            }] if prompt.enable_search else [],
        }
        headers = {"api-key": key, "Content-Type": "application/json"}

        started = datetime.now(UTC)
        response = await self._call_with_retry(
            method="POST", url=url, headers=headers, json=body, timeout=60.0,
        )
        latency_ms = int((datetime.now(UTC) - started).total_seconds() * 1000)
        data = response.json()

        text = data["choices"][0]["message"]["content"]
        citations: list[Citation] = []
        for ds in data["choices"][0].get("message", {}).get("context", {}).get("citations", []):
            citations.append(Citation(url=ds.get("url", ""), title=ds.get("title")))

        usage = data["usage"]
        tokens_in = usage["prompt_tokens"]
        tokens_out = usage["completion_tokens"]
        bing_calls = 1 if prompt.enable_search else 0

        cost_usd = (
            Decimal(tokens_in) * PRICE_AZURE_IN / Decimal("1000000")
            + Decimal(tokens_out) * PRICE_AZURE_OUT / Decimal("1000000")
            + Decimal(bing_calls) * PRICE_BING_PER_REQUEST
        )
        cost = CostBreakdown(
            tokens_in=tokens_in,
            tokens_out=tokens_out,
            grounding_requests=bing_calls,
            cost_usd=cost_usd.quantize(Decimal("0.000001")),
            cost_brl=(cost_usd * CAMBIO).quantize(Decimal("0.0001")),
            cambio_dia=CAMBIO,
        )

        return CollectionResult(
            collection_id=str(ULID()),
            prompt_id=prompt.prompt_id,
            prompt_canonical_hash=prompt.prompt_canonical_hash,
            model_info=self.model_info(),
            response_text=text,
            response_hash=self._sha256(text),
            citations=citations,
            run_at=started,
            latency_ms=latency_ms,
            cost=cost,
            cache_hit=False,
            raw_response={"copilot_simulado": True, "source": "azure-openai-bing"},
        )

    def estimate_cost(self, prompt: Prompt) -> Decimal:
        # Caminho Graph: custo marginal proximo de zero (seat fixo)
        return Decimal("0.0023")  # ~ R$ 0.012 dia/chamada

    def model_info(self) -> ModelInfo:
        return ModelInfo(
            provider=self.provider,
            model_pinned_version=self.model_pinned,
            model_alias_canonical=self.model_alias,
            is_rag_native=self.is_rag_native,
            fixed_at=datetime(2026, 5, 1, tzinfo=UTC),
            next_review_at=datetime(2026, 8, 1).date(),
        )
```

### C.7 Tabela consolidada de custo, latência e tier

| LLM | Custo/chamada (R$) | Custo diário (R$) | p95 latência (ms) | Tier requerido | Quirks principais |
|---|---|---|---|---|---|
| ChatGPT (gpt-5.0) | 0,104–0,156 | 7,80–11,70 | 8.000 | Tier 3+ (3000+ RPM) | top-p estocástico em search |
| Claude (claude-opus-4-7) | 0,338–0,500 | 25,40–37,50 | 14.000 | Tier 3+ (1000 RPM) | prompt caching obrigatório; 60% do orçamento |
| Gemini (gemini-3-pro) | 0,031–0,213 | 2,30–16,00 | 6.000 | Tier 2+ (1000 RPM) | grounding cobrado por request |
| Perplexity (sonar-pro) | 0,140 | 10,50 | 12.000 | Tier Pro | sensor RAG obrigatório; sem cache |
| Grok (grok-4) | 0,099–0,229 | 7,40–17,20 | 22.000 | Tier 2 | excluir X dos sources; mais lento |
| Copilot (copilot-2026) | ~0,012 marginal | 5,20 fixo | 18.000 | 1 seat dedicado | flag copilot_simulado em fallback |
| **Total diário** | — | **R$ 58,60–98,10** | — | — | — |
| **Total mensal (30 dias)** | — | **R$ 1.758–2.943** | — | — | — |

---

## Bloco D — Idempotency Cache

### D.1 Hash canônico

```python
# src/geo_collector/cache/idempotency.py
import hashlib
from datetime import date


def cache_key(
    *,
    provider: str,
    model_pinned: str,
    system_prompt: str,
    user_prompt: str,
    temperature: float,
    run_date_bucket: date,
) -> str:
    """SHA-256 da tupla canonica para idempotencia diaria."""
    payload = (
        f"{provider}|{model_pinned}|{system_prompt}|{user_prompt}|"
        f"{temperature:.4f}|{run_date_bucket.isoformat()}"
    )
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()
```

A `run_date_bucket` muda diariamente — toda chamada do mesmo prompt no mesmo dia retorna o mesmo hash; chamada do dia seguinte gera hash novo. Esse design é canônico do `dashboards/RUNBOOK-COLETA-LLM.md`: uma execução por LLM por query por dia.

### D.2 Storage e TTL por KPI

| KPI alimentado | TTL base | TTL rollup | Storage primário |
|---|---|---|---|
| KPI 1 (Mention Rate diário) | 24h | — | Cloudflare KV |
| KPI 2 (Share-of-Voice quinzenal) | 24h | 14d sobre views | Cloudflare KV + DuckDB views |
| KPI 3 (Citation Quality semanal) | 24h | 7d sobre views | Cloudflare KV + DuckDB views |
| KPI 8 (Delta pré/pós onda) | 24h | — | Cloudflare KV |

**Por que Cloudflare KV (primário):** custo USD 0,50/1M reads, USD 5/1M writes; volume estimado 13.500 ops/mês = USD 0,03/mês. TTL nativo via `expirationTtl`. Latência <10ms na região quente.
**Fallback Redis Upstash:** quando KV apresenta latência > 100ms p95 ou indisponibilidade. Custo USD 0,03/mês também.
**Dev/teste:** SQLite WAL local (zero custo, zero rede).

### D.3 `get_or_collect`

```python
# src/geo_collector/cache/idempotency.py
from datetime import date, timedelta
from typing import Awaitable, Callable

from geo_collector.models import CollectionResult, Prompt
from geo_collector.providers.base import BaseLLMClient


class IdempotencyCache:
    """Camada de cache atomica entre Orchestrator e Provider Clients."""

    def __init__(self, kv_client, default_ttl_seconds: int = 86400) -> None:
        self.kv = kv_client
        self.default_ttl = default_ttl_seconds

    async def get_or_collect(
        self,
        prompt: Prompt,
        client: BaseLLMClient,
        *,
        run_date: date | None = None,
        ttl_seconds: int | None = None,
    ) -> CollectionResult:
        bucket = run_date or date.today()
        key = cache_key(
            provider=client.provider,
            model_pinned=client.model_pinned,
            system_prompt=prompt.system_prompt,
            user_prompt=prompt.user_prompt,
            temperature=prompt.temperature,
            run_date_bucket=bucket,
        )

        cached_raw = await self.kv.get(key)
        if cached_raw is not None:
            cached = CollectionResult.model_validate_json(cached_raw)
            return cached.model_copy(update={"cache_hit": True})

        # Cache miss -> chama provider
        result = await client.call(prompt)
        await self.kv.put(
            key,
            result.model_dump_json(),
            expirationTtl=ttl_seconds or self.default_ttl,
        )
        return result

    async def invalidate(self, key: str) -> None:
        await self.kv.delete(key)

    async def invalidate_prompt_30d(
        self,
        provider: str,
        prompt_id: str,
        system_prompt: str,
        user_prompt: str,
        temperature: float,
        model_pinned: str,
    ) -> int:
        """Invalida 30 dias de cache do par (provider, prompt) - usado em drift."""
        invalidated = 0
        today = date.today()
        for delta in range(30):
            bucket = today - timedelta(days=delta)
            key = cache_key(
                provider=provider,
                model_pinned=model_pinned,
                system_prompt=system_prompt,
                user_prompt=user_prompt,
                temperature=temperature,
                run_date_bucket=bucket,
            )
            if await self.kv.get(key) is not None:
                await self.kv.delete(key)
                invalidated += 1
        return invalidated
```

### D.4 Telemetria de hit/miss

Cada `get_or_collect` emite evento estruturado:

```json
{"event": "cache_lookup", "key_prefix": "ab12cd...", "provider": "perplexity", "outcome": "miss", "run_date": "2026-05-07", "latency_ms": 4}
```

Painel no Dashboard: cache hit ratio diário por LLM. **Alarme:** ratio > 80% em coleta diária é sinal de configuração errada (TTL longo demais ou date_bucket mal definido).

### D.5 Cache invalidation rules (5 cenários)

1. **Drift confirmado:** `invalidate_prompt_30d(provider, prompt_id, ...)` para forçar re-coleta sem cache no par afetado.
2. **Model version updated:** `dim_llm` atualiza `model_pinned_version` → todas as chaves do provedor antigo passam a ser inalcançáveis (a chave usa `model_pinned` no hash) — invalidação implícita.
3. **Prompt updated:** bump v0 → v1 do KIT → prompts modificados têm novo `prompt_text` → nova chave; prompts inalterados continuam servindo.
4. **Cluster reorganizado:** mudança em `dim_prompt.cluster` não muda o hash de cache (cluster não está no payload), mas dispara recálculo dos rollups KPI 2/3.
5. **Manual purge:** CLI `geo-coleta cache purge --provider claude --date 2026-05-07` para forçar re-coleta de janela específica.

---

## Bloco E — Drift Detector

### E.1 Algoritmo

```python
# src/geo_collector/drift/detector.py
from __future__ import annotations

from dataclasses import dataclass
from datetime import date, timedelta
from decimal import Decimal

import numpy as np


@dataclass(frozen=True)
class DriftSignal:
    provider: str
    prompt_id: str
    similarity: float  # cosseno em [-1, 1]
    is_suspect: bool   # similaridade < 0.75
    is_confirmed: bool # similaridade < 0.55
    detected_at: date


class DriftDetector:
    """Drift por embedding similarity multilingual."""

    SIMILARITY_SUSPECT_THRESHOLD = 0.75
    SIMILARITY_CONFIRMED_THRESHOLD = 0.55
    MIN_QUERIES_FOR_PROVIDER_DRIFT = 3

    def __init__(self, embedder, warehouse) -> None:
        self.embedder = embedder  # SentenceTransformer multilingual
        self.warehouse = warehouse

    def compute_response_embedding(self, response_text: str) -> np.ndarray:
        """Embedding da resposta usando paraphrase-multilingual-MiniLM-L12-v2."""
        return self.embedder.encode(response_text, normalize_embeddings=True)

    async def check_drift(
        self,
        provider: str,
        prompt_id: str,
        current_response_text: str,
        run_date: date,
    ) -> DriftSignal:
        current_emb = self.compute_response_embedding(current_response_text)

        # Le ultimos 30 dias de embeddings para o par (provider, prompt_id)
        history = await self.warehouse.fetch_response_embeddings(
            provider=provider,
            prompt_id=prompt_id,
            from_date=run_date - timedelta(days=30),
            to_date=run_date - timedelta(days=1),
        )

        if len(history) < 7:
            # Janela curta - nao acusa drift ate ter baseline
            return DriftSignal(
                provider=provider,
                prompt_id=prompt_id,
                similarity=1.0,
                is_suspect=False,
                is_confirmed=False,
                detected_at=run_date,
            )

        centroid = np.mean(np.stack(history), axis=0)
        centroid /= np.linalg.norm(centroid)
        similarity = float(np.dot(current_emb, centroid))

        return DriftSignal(
            provider=provider,
            prompt_id=prompt_id,
            similarity=similarity,
            is_suspect=similarity < self.SIMILARITY_SUSPECT_THRESHOLD,
            is_confirmed=similarity < self.SIMILARITY_CONFIRMED_THRESHOLD,
            detected_at=run_date,
        )

    async def evaluate_provider_drift(
        self,
        signals: list[DriftSignal],
        run_date: date,
    ) -> dict[str, list[DriftSignal]]:
        """Agrupa sinais por provider; retorna providers com 3+ confirmed."""
        by_provider: dict[str, list[DriftSignal]] = {}
        for s in signals:
            if s.is_confirmed:
                by_provider.setdefault(s.provider, []).append(s)

        return {
            p: sigs
            for p, sigs in by_provider.items()
            if len(sigs) >= self.MIN_QUERIES_FOR_PROVIDER_DRIFT
        }
```

### E.2 Modelo de embedding

**Escolhido:** `paraphrase-multilingual-MiniLM-L12-v2` (Sentence Transformers). Tamanho 118MB, 384 dimensões, suporte multilíngue (incluindo PT-BR sólido). Cabe em Cloudflare Workers AI sem custo extra. Score MTEB PT-BR: ~75% em tarefas de similaridade.

**Trade-offs:**
- Vs. OpenAI `text-embedding-3-small` (USD 0,02/1M tokens): MiniLM perde ~7pp de precisão em PT-BR mas economiza ~USD 1-2/mês em embedding API e zero dependência adicional.
- Vs. `voyage-3-lite` (USD 0,02/1M): qualidade similar a OpenAI, mas mais novo provider. Adoção do MiniLM mantém infraestrutura simples.

### E.3 Thresholds e calibração

Threshold inicial baseado em literatura + piloto de 30 dias em coletas Naia (Q1 2026):

- **<0,75 similaridade:** drift suspeito — log silencioso, aguarda confirmação cross-prompt.
- **<0,55 similaridade:** drift confirmado — passa pela regra de 3+ queries.
- **3+ queries do mesmo provedor com confirmed no mesmo dia:** drift de provedor — alerta crítico.

Recalibração trimestral: análise de falsos positivos vs. falsos negativos no `fct_drift_events`. Se >5% falsos positivos, subir threshold suspeito para 0,80.

### E.4 Disparo (5 ações canônicas)

Quando `evaluate_provider_drift` retorna provedor confirmado:

1. **GitHub Issue criado automaticamente** via API:
   - Repo: `alexandrebrt14-sys/geo-platform`
   - Labels: `monitoramento`, `auditoria`, `drift-detected`, `provider:{provider}`
   - Title: `[drift-detected] {provider} {date}`
   - Body: lista de queries afetadas, similaridades observadas, diff de centroid, link para `fct_drift_events`.
2. **Série segmentada com flag `drift_event_id`** em `fct_collection`. Coletas dos próximos 3 dias gravam `under_drift_review = true`.
3. **Notificação Slack/e-mail** para Alexandre Caramaschi (e Bruno Azambuja se Perplexity).
4. **Próxima execução re-coleta baseline** — `IdempotencyCache.invalidate_prompt_30d` força re-execução sem cache.
5. **Decisão executiva em até 5 dias úteis** — Alexandre aceita nova versão como ponto de continuidade (atualiza `dim_llm`) ou pinar versão anterior.

### E.5 Janela móvel + comparação cross-temporal

Janela móvel de 14 dias com leitura semanal: o detector compara sempre o último dia contra o centroide dos 30 dias anteriores, mas o painel do Dashboard exibe a similaridade semanal agregada (mediana de 7 dias). Drift identificado em uma semana → semana segmentada como ponto de quebra na série de KPI 1, 2, 3.

### E.6 Cuidados anti-falso-positivo

- Drift que coincide com janela conhecida de manutenção do provedor (status page) é registrado mas não alerta crítico.
- Drift que coincide com lançamento conhecido de modelo (anúncio público no dia anterior) é tratado como deprecation gracioso, não alerta de incidente.
- Drift isolado em uma única query é ruído; só dispara com 3+ queries do mesmo provedor.

---

## Bloco F — FinOps Tracker em tempo real

### F.1 Custo estimado pré-execução (gate)

Antes de cada chamada, o `Cost Tracker` chama `client.estimate_cost(prompt)` e soma ao acumulador da sprint. Se a soma cruzar 100% do teto do LLM, a chamada é **bloqueada** (exceto Perplexity, sensor obrigatório).

```python
# src/geo_collector/finops/tracker.py
from decimal import Decimal
from datetime import date, datetime, UTC

from geo_collector.finops.budget_guards import BudgetGuards, BudgetState
from geo_collector.models import CollectionResult, CostBreakdown, Prompt
from geo_collector.providers.base import BaseLLMClient


class CostTracker:
    """Acumulador per-sprint, com gates pre e pos chamada."""

    CAMBIO = Decimal("5.20")

    def __init__(self, kv_client, guards: BudgetGuards, notifier) -> None:
        self.kv = kv_client
        self.guards = guards
        self.notifier = notifier

    def _sprint_id(self, run_date: date) -> str:
        # Sprints de 4 semanas comecando 1a segunda do ano
        iso = run_date.isocalendar()
        sprint_num = (iso.week - 1) // 4 + 1
        return f"{run_date.year}-S{sprint_num:02d}"

    async def gate_pre_call(
        self,
        prompt: Prompt,
        client: BaseLLMClient,
        run_date: date,
    ) -> BudgetState:
        """Avalia se a chamada pode prosseguir; bloqueia se 100% (exceto Perplexity)."""
        sprint = self._sprint_id(run_date)
        provider = client.provider

        accumulated_brl = Decimal(
            await self.kv.get(f"finops:sprint:{sprint}:provider:{provider}") or "0"
        )
        estimated_usd = client.estimate_cost(prompt)
        estimated_brl = (estimated_usd * self.CAMBIO).quantize(Decimal("0.0001"))
        projected = accumulated_brl + estimated_brl

        state = self.guards.evaluate(provider=provider, projected_brl=projected)

        if state.is_blocked and provider != "perplexity":
            await self.notifier.alert_critical(
                f"FinOps block: {provider} sprint {sprint} cruzou 100% do teto"
            )
            raise BudgetExceeded(provider=provider, projected_brl=projected, sprint=sprint)

        return state

    async def record_post_call(
        self,
        result: CollectionResult,
        run_date: date,
    ) -> None:
        """Acumula custo real apos chamada."""
        sprint = self._sprint_id(run_date)
        provider = result.model_info.provider
        key = f"finops:sprint:{sprint}:provider:{provider}"

        current = Decimal(await self.kv.get(key) or "0")
        new_total = current + result.cost.cost_brl
        await self.kv.put(key, str(new_total))

        # Persiste em fct_finops_daily via warehouse
        await self._persist_daily(result, run_date)

        # Avalia thresholds 50/80/95/100 e dispara alerta
        state = self.guards.evaluate(provider=provider, projected_brl=new_total)
        if state.threshold_crossed:
            await self.notifier.alert_finops(
                provider=provider,
                sprint=sprint,
                accumulated_brl=new_total,
                threshold=state.threshold_crossed,
            )

    async def _persist_daily(self, result: CollectionResult, run_date: date) -> None:
        # INSERT em fct_finops_daily; codigo do warehouse adapter omitido
        pass


class BudgetExceeded(Exception):
    def __init__(self, provider: str, projected_brl: Decimal, sprint: str) -> None:
        super().__init__(f"FinOps {provider} sprint {sprint}: projected R$ {projected_brl}")
        self.provider = provider
        self.projected_brl = projected_brl
        self.sprint = sprint
```

### F.2 Custo real pós-execução

Após retorno do provedor, `record_post_call` lê `result.cost.cost_brl` e incrementa o acumulador. Persiste linha em `fct_finops_daily` (Bloco H da arquitetura de dados).

### F.3 Budget guards canônicos por LLM

```python
# src/geo_collector/finops/budget_guards.py
from dataclasses import dataclass
from decimal import Decimal


# Tetos mensais propostos para revisao executiva (recalibracao do USD 15/sprint vigente)
BUDGET_BRL_PER_LLM_PER_MONTH = {
    "perplexity": Decimal("600"),  # RAG-native obrigatorio - emergency stop NAO se aplica
    "anthropic": Decimal("800"),   # 60% do orcamento em estado estavel; Opus 4.7 puxa para cima
    "openai": Decimal("600"),      # 25% do orcamento; gpt-5.0 com web_search
    "google": Decimal("200"),      # 10% do orcamento; gemini-3-pro grounding
    "xai": Decimal("200"),         # complementar; grok-4 mais lento
    "microsoft": Decimal("200"),   # seat fixo R$ 156 + Azure OpenAI fallback
}

TOTAL_MONTHLY_BUDGET_BRL = sum(BUDGET_BRL_PER_LLM_PER_MONTH.values())  # R$ 2.600


@dataclass(frozen=True)
class BudgetState:
    provider: str
    accumulated_brl: Decimal
    teto_brl: Decimal
    pct_used: Decimal
    threshold_crossed: str | None  # "50", "80", "95", "100" ou None
    is_blocked: bool


class BudgetGuards:
    """Gates 50/80/95/100 com block automatico em 100 (exceto Perplexity)."""

    THRESHOLDS = [Decimal("50"), Decimal("80"), Decimal("95"), Decimal("100")]

    def __init__(self) -> None:
        self.budgets = BUDGET_BRL_PER_LLM_PER_MONTH

    def evaluate(self, *, provider: str, projected_brl: Decimal) -> BudgetState:
        teto = self.budgets[provider]
        pct = (projected_brl / teto * Decimal(100)).quantize(Decimal("0.01"))

        crossed: str | None = None
        for t in reversed(self.THRESHOLDS):
            if pct >= t:
                crossed = str(int(t))
                break

        is_blocked = pct >= Decimal("100") and provider != "perplexity"

        return BudgetState(
            provider=provider,
            accumulated_brl=projected_brl,
            teto_brl=teto,
            pct_used=pct,
            threshold_crossed=crossed,
            is_blocked=is_blocked,
        )
```

| LLM | Teto mensal (R$) | Alerta 50% | Alerta 80% | Freeze 95% | Hard stop 100% |
|---|---|---|---|---|---|
| **Perplexity** | 600 | sim | sim | sim | **NÃO** (sensor obrigatório) |
| **Claude Opus 4.7** | 800 | sim | sim | sim | sim |
| **GPT-5** | 600 | sim | sim | sim | sim |
| **Gemini 3-pro** | 200 | sim | sim | sim | sim |
| **Grok 4** | 200 | sim | sim | sim | sim |
| **Copilot 2026** | 200 | sim | sim | sim | sim |
| **Total mensal** | **R$ 2.600** | — | — | — | — |

### F.4 Reconciliação mensal

Job `cron-finops-reconcile.yml` no dia 5 de cada mês:

1. Soma `fct_finops_daily` por provider para o mês anterior.
2. Confronta contra fatura real do provedor (via API quando disponível ou input manual).
3. Calcula desvio (`real - log` em USD). Aceitável até 3%.
4. Gera `docs/relatorios-finops/YYYY-MM-reconciliacao.md`.
5. Se desvio >3%, abre GitHub Issue com label `finops-mismatch`.
6. Se projetado <70% do real, ajusta `BUDGET_BRL_PER_LLM_PER_MONTH` na próxima sprint.
7. Se projetado >130% do real, libera buffer para sprint experimental.

### F.5 Emergency stop por LLM (regra canônica)

- **Trip:** custo acumulado do provedor no dia ultrapassa 1,5× o esperado (mediana móvel 7d) **ou** sprint cruza 100% do teto.
- **Comportamento:** worker do provedor entra em estado `cost-limited`; chamadas pendentes são paradas; alerta crítico via Slack + e-mail.
- **Reset:** automático às 00h00 BRT do dia seguinte; manual via CLI `geo-coleta finops reset --provider claude` para reabrir antes (exige aprovação executiva registrada).
- **Exceção Perplexity:** trip não para o worker; apenas alerta crítico para Alexandre. Substituir Perplexity contamina cohort e é proibido.

---

## Bloco G — Retry + Circuit Breaker

### G.1 Retry exponential backoff

```python
# src/geo_collector/retry/backoff.py
from __future__ import annotations

import asyncio
from typing import Awaitable, Callable, TypeVar

import httpx

T = TypeVar("T")


class TransientError(Exception): pass
class PermanentError(Exception): pass


async def call_with_retry(
    func: Callable[[], Awaitable[httpx.Response]],
    *,
    max_attempts: int = 3,
    base_delay: float = 1.0,
    multiplier: float = 4.0,
    max_delay: float = 300.0,
) -> httpx.Response:
    """1s, 4s, 16s; max 5min em 429 com Retry-After."""
    attempt = 0
    last_exc: Exception | None = None

    while attempt < max_attempts:
        try:
            response = await func()
        except (httpx.TimeoutException, httpx.NetworkError) as exc:
            last_exc = exc
            attempt += 1
            await asyncio.sleep(min(base_delay * (multiplier ** (attempt - 1)), max_delay))
            continue

        if response.status_code in (200, 201, 202):
            return response

        if response.status_code == 429:
            retry_after = response.headers.get("Retry-After")
            delay = (
                min(float(retry_after), max_delay)
                if retry_after and retry_after.isdigit()
                else min(base_delay * (multiplier ** attempt), max_delay)
            )
            attempt += 1
            await asyncio.sleep(delay)
            continue

        if 500 <= response.status_code < 600:
            attempt += 1
            await asyncio.sleep(min(base_delay * (multiplier ** (attempt - 1)), max_delay))
            continue

        # 4xx (exceto 429): permanente
        raise PermanentError(
            f"HTTP {response.status_code}: {response.text[:500]}"
        )

    raise TransientError(f"Max retries reached: {last_exc}")
```

### G.2 Tipos de erro

| Status / Exception | Categoria | Comportamento |
|---|---|---|
| Timeout, network error | Transient | Retry exponencial 1s/4s/16s |
| 5xx | Transient | Retry exponencial |
| 429 com `Retry-After` | Transient | Sleep `Retry-After` (até 5 min) |
| 429 sem `Retry-After` | Transient | Backoff exponencial |
| 401, 403 | Permanente | Falha imediata, alerta crítico (chave inválida) |
| 400 (payload error) | Permanente | Falha imediata, log, marca prompt `errored` |
| 400 `context_length_exceeded` | Permanente | Falha imediata, log dimensional |

### G.3 Circuit Breaker por LLM

```python
# src/geo_collector/retry/circuit_breaker.py
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta, UTC
from enum import Enum


class CircuitState(str, Enum):
    CLOSED = "closed"
    OPEN = "open"
    HALF_OPEN = "half_open"


@dataclass
class CircuitConfig:
    failure_threshold: int = 5      # 5 falhas consecutivas em janela
    failure_window_seconds: int = 60
    open_cooldown_seconds: int = 300  # 5 minutos


class CircuitOpen(Exception):
    """Levantada quando uma chamada e' rejeitada porque o breaker esta OPEN."""
    def __init__(self, provider: str) -> None:
        super().__init__(f"Circuit breaker OPEN for provider={provider}")
        self.provider = provider


class CircuitBreaker:
    def __init__(self, kv_client, config: CircuitConfig | None = None) -> None:
        self.kv = kv_client
        self.config = config or CircuitConfig()

    async def get_state(self, provider: str) -> CircuitState:
        raw = await self.kv.get(f"cb:{provider}:state")
        if raw is None:
            return CircuitState.CLOSED
        state = CircuitState(raw)
        if state == CircuitState.OPEN:
            opened_at = datetime.fromisoformat(
                await self.kv.get(f"cb:{provider}:opened_at")
            )
            if datetime.now(UTC) >= opened_at + timedelta(seconds=self.config.open_cooldown_seconds):
                await self.kv.put(f"cb:{provider}:state", CircuitState.HALF_OPEN.value)
                return CircuitState.HALF_OPEN
        return state

    async def is_available(self, provider: str) -> bool:
        return (await self.get_state(provider)) != CircuitState.OPEN

    async def record_success(self, provider: str) -> None:
        await self.kv.delete(f"cb:{provider}:failures")
        await self.kv.put(f"cb:{provider}:state", CircuitState.CLOSED.value)

    async def record_failure(self, provider: str, notifier) -> None:
        now = datetime.now(UTC)
        # Le timestamps das ultimas 5 falhas
        raw = await self.kv.get(f"cb:{provider}:failures") or "[]"
        import json
        failures = [datetime.fromisoformat(t) for t in json.loads(raw)]
        # Filtra dentro da janela de 60s
        cutoff = now - timedelta(seconds=self.config.failure_window_seconds)
        failures = [t for t in failures if t >= cutoff]
        failures.append(now)

        if len(failures) >= self.config.failure_threshold:
            # Abre circuito
            await self.kv.put(f"cb:{provider}:state", CircuitState.OPEN.value)
            await self.kv.put(f"cb:{provider}:opened_at", now.isoformat())
            await self.kv.delete(f"cb:{provider}:failures")
            await notifier.alert_critical(
                f"Circuit breaker OPEN: {provider} ({len(failures)} falhas em 60s)"
            )
        else:
            await self.kv.put(
                f"cb:{provider}:failures",
                json.dumps([t.isoformat() for t in failures]),
            )
```

### G.4 Estado-máquina de transições

- **CLOSED** (normal): chamadas passam. Falha incrementa contador. 5 falhas em 60s → OPEN.
- **OPEN** (bloqueado): chamadas falham fast com `CircuitOpen`. Após 5 minutos → HALF_OPEN.
- **HALF_OPEN** (teste): 1 chamada de teste. Sucesso → CLOSED. Falha → OPEN (novo cooldown).

### G.5 Notificação ao abrir

`Notifier.alert_critical("Circuit breaker OPEN: claude (5 falhas em 60s)")` dispara para Slack + e-mail Alexandre. Quando 4+ provedores entram em OPEN simultaneamente, escala imediato + investigação de incidente de rede ou de chaves.

---

## Bloco H — Result Persistence

### H.1 Workflow de persistência atômica

```python
# src/geo_collector/persistence/jsonl_writer.py + warehouse.py
from datetime import date

from geo_collector.models import CollectionResult


class ResultPersister:
    def __init__(self, jsonl_writer, warehouse) -> None:
        self.jsonl = jsonl_writer
        self.warehouse = warehouse

    async def persist(self, result: CollectionResult, run_date: date) -> None:
        """Two-phase commit: JSONL primeiro com committed=false, depois D1, atualiza flag."""
        # Fase 1: append JSONL com flag committed=false
        line_id = await self.jsonl.append(
            run_date=run_date,
            provider=result.model_info.provider,
            payload=result.model_dump_json(),
            committed=False,
        )

        # Fase 2: INSERT em fct_collection
        await self.warehouse.insert_collection(result, run_date)

        # Fase 3: atualiza flag committed
        await self.jsonl.mark_committed(line_id)

    async def reconcile_at_startup(self) -> int:
        """Reconcilia linhas committed=false (crash recovery)."""
        pending = await self.jsonl.list_pending()
        for line in pending:
            try:
                result = CollectionResult.model_validate_json(line.payload)
                await self.warehouse.insert_collection(result, line.run_date)
                await self.jsonl.mark_committed(line.id)
            except Exception:
                # Marca linha como inconsistente; investiga manualmente
                await self.jsonl.mark_failed(line.id)
        return len(pending)
```

### H.2 Esquema do JSONL canônico

Uma linha por execução em `data/coleta/YYYY-MM-DD.jsonl`. Versionado com `pipeline_version`:

```jsonl
{"collection_id":"01HX5J9K8M2N3P4Q5R6S7T8U9","provider":"perplexity","model":"sonar-pro","model_pinned_version":"sonar-pro","model_alias_canonical":"Perplexity","prompt_id":"K-C1-001","prompt_version":1,"prompt_canonical_hash":"sha256:7b4f...","response_text":"O IPOG e' um instituto de pos-graduacao reconhecido pelo MEC...","response_hash":"sha256:abc123...","run_at":"2026-05-07T13:42:00Z","run_at_date":"2026-05-07","latency_ms":3421,"tokens_in":1284,"tokens_out":1892,"cache_creation_tokens":0,"cache_read_tokens":0,"grounding_requests":0,"search_sessions":1,"cost_usd":"0.035000","cost_brl":"0.1820","cambio_dia":"5.20","mention_ipog":true,"ipog_position":2,"mention_correta_canonica":true,"mentioned_competitors":["anhembi-morumbi","saint-paul"],"citation_quality_score":4,"cq_presenca_nominal":true,"cq_formato_declarado":true,"cq_diferencial_editorial":true,"cq_link_canonico":true,"cq_autoridade_contextual":false,"sources":[{"url":"https://ipog.edu.br/cursos/mba-psicologia","title":"MBA em Psicologia | IPOG"}],"cache_hit":false,"under_drift_review":false,"error_code":null,"error_message":null,"pipeline_version":"geo-platform/0.1.0","kit_version":"v0","sprint_id":"2026-S05","copilot_simulado":false}
```

### H.3 Particionamento R2

```
s3://geo-platform/collections/
  year=2026/
    month=05/
      day=07/
        provider=perplexity/
          batch-01.jsonl.gz
          batch-02.jsonl.gz
        provider=anthropic/
          batch-01.jsonl.gz
        ...
```

DuckDB lê via:

```sql
SELECT *
FROM read_parquet('s3://geo-platform/collections/year=2026/month=05/**/*.parquet')
WHERE provider = 'perplexity' AND mention_ipog = true;
```

Conversão JSONL → Parquet acontece no job nightly `cron-warehouse-compact.yml`.

### H.4 Retenção

- **Hot tier (D1 / SQLite):** 90 dias online em `fct_collection`.
- **Warm tier (D1 + DuckDB):** 24 meses em rollups e particionamento mensal.
- **Cold tier (R2):** indefinido (USD 0,015/GB-mês).

---

## Bloco I — Estrutura do projeto

```
geo-platform/
  src/
    geo_collector/
      __init__.py
      orchestrator.py
      cli.py
      models.py
      providers/
        __init__.py
        base.py
        openai.py
        anthropic.py
        google.py
        perplexity.py
        xai.py
        microsoft.py
      cache/
        __init__.py
        idempotency.py
        kv_adapter.py
      drift/
        __init__.py
        detector.py
        embeddings.py
      finops/
        __init__.py
        tracker.py
        budget_guards.py
      retry/
        __init__.py
        backoff.py
        circuit_breaker.py
      persistence/
        __init__.py
        jsonl_writer.py
        warehouse.py
        r2_uploader.py
      notifier/
        __init__.py
        slack.py
        github_issues.py
        email.py
  tests/
    test_orchestrator.py
    test_cache_idempotency.py
    test_drift_detector.py
    test_finops_tracker.py
    test_circuit_breaker.py
    test_providers/
      test_openai.py
      test_anthropic.py
      test_google.py
      test_perplexity.py
      test_xai.py
      test_microsoft.py
    fixtures/
      sample_responses/
        openai_gpt5_search.json
        anthropic_opus47_websearch.json
        google_gemini3pro_grounding.json
        perplexity_sonar_pro.json
        xai_grok4_livesearch.json
        microsoft_copilot_graph.json
        microsoft_azure_fallback.json
  scripts/
    rotate-secrets.sh
    bootstrap-d1.sh
    seed-cohort.py
  pyproject.toml
  uv.lock
  Dockerfile
  .env.example
  README.md
  openapi.yaml
  .github/workflows/
    ci-test.yml
    ci-build-docker.yml
    ci-deploy-staging.yml
    ci-deploy-production.yml
    cron-collect-daily.yml
    cron-collect-spot.yml
    cron-warehouse-compact.yml
    cron-finops-reconcile.yml
```

`.env.example` declara: `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GOOGLE_API_KEY`, `PERPLEXITY_API_KEY`, `XAI_API_KEY`, `MS_GRAPH_TENANT_ID`, `MS_GRAPH_CLIENT_ID`, `MS_GRAPH_CLIENT_SECRET`, `AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT`, `AZURE_BING_CONN`, `CLOUDFLARE_KV_NAMESPACE`, `CLOUDFLARE_R2_BUCKET`, `D1_DATABASE_ID`, `GITHUB_PAT`, `SLACK_WEBHOOK_URL`, `NOTIFIER_EMAIL_TO`.

---

## Bloco J — Testing strategy

### J.1 Unit tests (provider clients)

Cada cliente testado contra fixtures de respostas reais (anonimizadas). Exemplo `tests/test_providers/test_perplexity.py`:

```python
import json
from pathlib import Path
import pytest
import respx
from httpx import Response, AsyncClient

from geo_collector.providers.perplexity import PerplexityClient
from geo_collector.models import Prompt


FIXTURE = Path(__file__).parent.parent / "fixtures/sample_responses/perplexity_sonar_pro.json"


@pytest.mark.asyncio
async def test_perplexity_parses_response_and_citations(monkeypatch):
    monkeypatch.setenv("PERPLEXITY_API_KEY", "sk-test")
    fixture = json.loads(FIXTURE.read_text())

    async with AsyncClient() as http:
        client = PerplexityClient(http=http)
        with respx.mock:
            respx.post("https://api.perplexity.ai/chat/completions").mock(
                return_value=Response(200, json=fixture)
            )
            prompt = Prompt(
                prompt_id="K-C1-001", prompt_version=1, cluster="C1",
                persona="P1", jornada="J2",
                system_prompt="Voce e' um assistente de pesquisa.",
                user_prompt="Quais sao os MBAs em Psicologia reconhecidos pelo MEC?",
                resposta_alvo_canonica="IPOG, Anhembi-Morumbi, Saint Paul",
                kit_version="v0",
            )
            result = await client.call(prompt)

    assert result.model_info.provider == "perplexity"
    assert result.cost.tokens_in == 1284
    assert result.cost.tokens_out == 1892
    assert len(result.citations) > 0
    assert result.cost.cost_brl > 0
```

### J.2 Integration tests (orchestrator end-to-end com mocks)

`tests/test_orchestrator.py` valida que orquestrador chama os 6 providers, respeita concorrência, agrega `RunReport`, marca cache hits.

### J.3 Contract tests (pydantic schema)

Cada `CollectionResult` persistido em JSONL é re-validado pelo pydantic na leitura. Test garante que linhas escritas em formato `pipeline_version=0.1.0` são lidas pelo `0.2.0` com migração compatível ou erro explícito.

### J.4 Load tests (locust)

Simulação de 450 chamadas/dia × 6 LLMs com locust + mocks dos 6 providers. Critério de sucesso: 99% das chamadas completam em < 60s; circuit breaker abre conforme esperado em 100 falhas/min injetadas.

### J.5 E2E (real API, gated por feature flag)

Workflow `cron-collect-spot.yml` com `workflow_dispatch` permite captura real de 1 prompt em ambiente staging com 6 LLMs reais. Gated por feature flag `GEO_E2E_ENABLED=true` na secret de staging. Custo por execução E2E: ~R$ 0,90.

---

## Bloco K — CI/CD do `geo-platform`

### K.1 Workflows GitHub Actions

```yaml
# .github/workflows/ci-test.yml
name: CI Test
on:
  pull_request:
    branches: [main]
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: astral-sh/setup-uv@v3
      - run: uv sync --all-extras
      - run: uv run ruff check src/ tests/
      - run: uv run mypy src/
      - run: uv run pytest tests/ -v --cov=src/geo_collector --cov-report=xml
      - uses: codecov/codecov-action@v4
```

```yaml
# .github/workflows/ci-build-docker.yml
name: CI Build Docker
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ghcr.io/alexandrebrt14-sys/geo-platform:${{ github.sha }}
```

```yaml
# .github/workflows/ci-deploy-staging.yml
name: Deploy Staging
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          command: deploy --env staging
```

```yaml
# .github/workflows/cron-collect-daily.yml
name: Cron Collect Daily
on:
  schedule:
    - cron: "0 3 * * *"  # 03h UTC = 00h BRT (failover; primary cron Cloudflare 09h UTC = 06h BRT)
  workflow_dispatch:
    inputs:
      target_date:
        description: "Data alvo YYYY-MM-DD (default: hoje)"
        required: false
jobs:
  collect:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: astral-sh/setup-uv@v3
      - run: uv sync
      - run: uv run python -m geo_collector.cli collect --date "${{ inputs.target_date || 'today' }}"
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          GOOGLE_API_KEY: ${{ secrets.GOOGLE_API_KEY }}
          PERPLEXITY_API_KEY: ${{ secrets.PERPLEXITY_API_KEY }}
          XAI_API_KEY: ${{ secrets.XAI_API_KEY }}
          MS_GRAPH_TENANT_ID: ${{ secrets.MS_GRAPH_TENANT_ID }}
          MS_GRAPH_CLIENT_ID: ${{ secrets.MS_GRAPH_CLIENT_ID }}
          MS_GRAPH_CLIENT_SECRET: ${{ secrets.MS_GRAPH_CLIENT_SECRET }}
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

```yaml
# .github/workflows/cron-collect-spot.yml
name: Cron Collect Spot
on:
  workflow_dispatch:
    inputs:
      prompt_ids:
        description: "Lista de prompt_ids separados por virgula"
        required: true
      enable_e2e_real_apis:
        description: "Bate em APIs reais? (custo ~R$ 0,90/execucao)"
        type: boolean
        default: false
jobs:
  spot:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: astral-sh/setup-uv@v3
      - run: uv sync
      - run: |
          uv run python -m geo_collector.cli spot \
            --prompt-ids "${{ inputs.prompt_ids }}" \
            ${{ inputs.enable_e2e_real_apis && '--real-apis' || '--dry-run' }}
```

```yaml
# .github/workflows/ci-deploy-production.yml
name: Deploy Production
on:
  workflow_run:
    workflows: ["CI Test"]
    types: [completed]
    branches: [main]
jobs:
  deploy-production:
    if: ${{ github.event.workflow_run.conclusion == 'success' }}
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          command: deploy --env production
```

### K.2 Schedules canônicos

| Workflow | Cron | Função |
|---|---|---|
| `ci-test.yml` | on PR/push | Lint + typing + tests |
| `ci-build-docker.yml` | on push main | Build imagem Docker |
| `ci-deploy-staging.yml` | on push main | Deploy Cloudflare staging |
| `ci-deploy-production.yml` | após CI Test verde | Deploy production |
| `cron-collect-daily.yml` | 03h UTC (failover) + Cloudflare Trigger 09h UTC primary | Coleta diária 06h BRT |
| `cron-collect-spot.yml` | workflow_dispatch | Spot-check on-demand |
| `cron-warehouse-compact.yml` | 02h UTC | JSONL → Parquet, retenção |
| `cron-finops-reconcile.yml` | dia 5 06h UTC | Reconciliação fatura vs log |

---

## Bloco L — Reconciliação com `RUNBOOK-COLETA-LLM.md`

### L.1 Discrepâncias identificadas

O `dashboards/RUNBOOK-COLETA-LLM.md` versão vigente (2026-04-30) lista cohort com **versões 2024 desatualizadas**, em conflito com este Service e com o briefing executivo de 2026-05-01 já incorporado em `02-data-engineering.md`:

| Provedor | RUNBOOK vigente (2024) | Cohort canônico Service (2026) |
|---|---|---|
| OpenAI | `gpt-4o` (snapshot 2024-08-06) | `gpt-5.0` |
| Anthropic | `claude-sonnet-4-5` | `claude-opus-4-7` |
| Google | `gemini-1.5-pro` | `gemini-3-pro` |
| Perplexity | `sonar-pro` | `sonar-pro` (sem mudança) |
| xAI | `grok-2` | `grok-4` |
| Microsoft | `Copilot via Bing API` | `copilot-2026` (Graph API + Azure fallback) |

Discrepâncias adicionais:

- **Backoff:** RUNBOOK prescreve 2s/4s/8s; Service propõe 1s/4s/16s (multiplier 4×) — janela mais larga absorve melhor 429 do Claude Opus em pico.
- **Circuit breaker:** RUNBOOK prescreve 3 falhas/60s, cooldown 60s; Service propõe 5 falhas/60s, cooldown 5min (consistente com Bloco G da arquitetura macro).
- **Drift detection:** RUNBOOK prescreve entropia 7d vs 30d; Service adiciona embedding similarity como mecanismo primário (entropia fica como heurística secundária).
- **Janela diária:** RUNBOOK 06h-09h BRT; Service mantém base mas aceita extensão para 09h30 quando Claude Opus opera em fila.
- **Teto FinOps:** RUNBOOK herda USD 15/sprint para coleta; Service propõe recalibração para R$ 2.600/mês (USD 500), distribuído por LLM com Perplexity sem hard stop.

### L.2 PR proposto contra `RUNBOOK-COLETA-LLM.md`

Saída deste Wave 3 inclui PR específico com 6 mudanças canônicas:

1. **Atualizar tabela "Cohort fixo de LLMs"** com versões 2026 (gpt-5.0, claude-opus-4-7, gemini-3-pro, sonar-pro, grok-4, copilot-2026).
2. **Substituir backoff 2/4/8 por 1/4/16** com nota de rationale (Claude Opus 429 mais frequente).
3. **Atualizar circuit breaker** de 3/60s/60s para 5/60s/300s.
4. **Adicionar seção "Embedding-based drift detection"** com modelo `paraphrase-multilingual-MiniLM-L12-v2`, thresholds 0,75/0,55, regra de 3+ queries.
5. **Recalibrar tabela FinOps** para R$ 2.600/mês total com per-LLM (Perplexity 600, Claude 800, GPT-5 600, Gemini 200, Grok 200, Copilot 200) e marcar Perplexity como exceção do hard stop.
6. **Adicionar nota Copilot híbrido** documentando flag `copilot_simulado` quando fallback Azure OpenAI ativa, com regra de KPIs comparando apenas leituras `copilot_simulado=false`.

Branch sugerida: `runbook/atualiza-cohort-2026-wave3`. Owner: Alexandre Caramaschi. Reviewer: Bruno Azambuja. SLA de revisão: 5 dias úteis.

### L.3 Sequenciamento da reconciliação

1. **D+0 (publicação deste dossiê):** PR aberto contra `geo-ipog` atualizando RUNBOOK.
2. **D+1:** revisão técnica conjunta Alexandre + Bruno.
3. **D+3:** merge do PR; RUNBOOK 2026 vigente.
4. **D+5:** atualização cascata de `dim_llm` no warehouse com nova `model_pinned_version`; cache antigo invalidado (chaves novas geradas automaticamente porque hash inclui versão).
5. **D+7:** primeira coleta cross-LLM em produção com cohort 2026 completo; KPIs lidos com nova baseline.
6. **D+30:** relatório executivo confirmando ou revisando os custos reais vs. projeção R$ 2.500-2.800/mês.

---

## Encerramento

Este Service é o coração do programa GEO IPOG. Sua falha invalida KPI 1 (Mention Rate), KPI 2 (Share-of-Voice), KPI 3 (Citation Quality) e KPI 8 (Delta pré/pós) simultaneamente. Por isso toda decisão de design — workers separados por LLM, embedding multilingual em vez de API externa, two-phase commit JSONL+D1, circuit breaker por provedor com Perplexity em status especial, budget guards por LLM com hard stop em 100% (exceto Perplexity) — é prescritiva, não recomendação.

A discrepância de versões entre RUNBOOK (2024) e este dossiê (cohort 2026) é tratada como dívida técnica documentada, com PR específico no Bloco L. A discrepância de FinOps entre teto vigente (USD 15/sprint) e projeção real (R$ 2.500-2.800/mês) é tratada como decisão executiva pendente — Alexandre Caramaschi + Bruno Azambuja em ata mensal.

A próxima entrega do Wave 3 é o boilerplate executável de `geo-platform/src/geo_collector/` cobrindo orchestrator + os 6 provider clients + cache + drift + FinOps + retry + persistence, com testes unitários verdes e workflow `cron-collect-daily.yml` apontando para staging Cloudflare. SLA: 14 dias após aprovação deste dossiê.

