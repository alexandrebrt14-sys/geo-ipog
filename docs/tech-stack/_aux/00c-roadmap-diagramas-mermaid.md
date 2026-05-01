# Tech Roadmap 2026 — Bundle de Diagramas Mermaid

Documento auxiliar do `00-tech-roadmap-2026.md`. Reúne cinco diagramas Mermaid v10+ prontos para renderização em GitHub, Notion, Confluence ou plataformas que aceitem fenced blocks ` ```mermaid `. Cada diagrama traz uma legenda curta indicando audiência principal e propósito de uso. PT-BR rigoroso, sem emojis, naming canônico Brasil GEO / IPOG / Alexandre Caramaschi.

Convenções comuns:

- Atores humanos em retângulos arredondados com prefixo de papel.
- Sistemas externos (LLMs, GA4, NAIA SaaS) em hexágonos ou paralelogramos.
- Containers internos do programa GEO IPOG agrupados em subgraphs por camada (coleta, conteúdo, dados, observabilidade, identidade).
- Setas com verbo no infinitivo + objeto direto (ex.: "publica", "consulta", "audita").

---

## Diagrama 1 — C4 Level 1 (System Context)

Audiência: Conselho IPOG, sponsor Ronan Maia, marketing Bruno Azambuja. Propósito: mostrar o sistema GEO IPOG como caixa-preta e explicitar atores humanos, sistemas externos e fluxos macro de informação. Use este diagrama como abertura de qualquer apresentação executiva do programa.

```mermaid
flowchart TB
    classDef pessoa fill:#1f3a5f,stroke:#0d1b2a,color:#ffffff,stroke-width:1px
    classDef sistema fill:#2d6a4f,stroke:#1b4332,color:#ffffff,stroke-width:2px
    classDef externo fill:#6c757d,stroke:#343a40,color:#ffffff,stroke-width:1px
    classDef saas fill:#7c3aed,stroke:#4c1d95,color:#ffffff,stroke-width:1px

    %% Atores internos IPOG / Brasil GEO
    Alexandre["Alexandre Caramaschi<br/>Head Brasil GEO<br/>Voz editorial e governance"]:::pessoa
    Bruno["Bruno Azambuja<br/>Marketing IPOG<br/>Aprovador editorial"]:::pessoa
    Ronan["Ronan Maia<br/>CEO IPOG<br/>Sponsor executivo"]:::pessoa
    Conselho["Conselho IPOG<br/>Governanca quinzenal"]:::pessoa
    Docentes["Corpo docente IPOG<br/>Fonte de autoridade"]:::pessoa

    %% Personas externas
    Candidatos["Candidatos<br/>7 personas-alvo<br/>MBA Psicologia Online"]:::pessoa

    %% Sistema central
    GEO["Sistema GEO IPOG<br/>4 repos: geo-ipog,<br/>geo-platform, geo-dashboard,<br/>geo-ipog-website"]:::sistema

    %% Sistemas externos
    LLMs[["6 LLMs APIs<br/>ChatGPT, Claude, Gemini,<br/>Perplexity, Grok, Copilot"]]:::externo
    GA4[["GA4<br/>Referrer e UTM tracking"]]:::externo
    GitHub[["GitHub<br/>Source of truth + CI/CD"]]:::externo
    Site[["ipog.edu.br<br/>Site institucional"]]:::externo
    Wiki[["Wikipedia<br/>Citacao secundaria"]]:::externo
    NAIA[["NAIA SaaS<br/>Audit engine externo"]]:::saas
    Midia[["Plataformas<br/>de midia paga"]]:::externo
    Hogrefe[["Hogrefe<br/>Editora de testes"]]:::externo
    eMEC[["e-MEC<br/>Portarias 884/2016<br/>e 918/2017"]]:::externo

    %% Fluxos de governanca
    Ronan -->|patrocina e prioriza| GEO
    Conselho -->|revisa KPIs quinzenais| GEO
    Bruno -->|aprova pecas editoriais| GEO
    Alexandre -->|opera, redige e revisa| GEO
    Docentes -->|fornece autoridade tecnica| GEO

    %% Fluxos de mercado
    Candidatos -->|consulta LLMs| LLMs
    LLMs -->|cita ou omite IPOG| Candidatos
    Candidatos -->|visita| Site
    Midia -->|trafego pago| Site

    %% Fluxos do sistema
    GEO -->|consulta diariamente| LLMs
    GEO -->|publica Schema e llms.txt| Site
    GEO -->|le referrer e UTM| GA4
    GEO -->|hospeda codigo e CI| GitHub
    GEO -->|aciona auditoria| NAIA
    NAIA -->|relatorio de citacao| GEO

    %% Fontes de autoridade
    Wiki -->|sinal secundario| LLMs
    Hogrefe -->|credibilidade tecnica| GEO
    eMEC -->|valida portarias MEC| GEO

    %% Saidas executivas
    GEO -->|relatorios semanais| Bruno
    GEO -->|relatorios mensais| Ronan
    GEO -->|relatorios trimestrais| Conselho
```

Observacao: as setas entre Candidatos e LLMs sao bidirecionais para representar a jornada de descoberta cross-LLM, foco principal do programa GEO.

---

## Diagrama 2 — C4 Level 2 (Container)

Audiencia: time tecnico Brasil GEO + IPOG, arquitetos parceiros. Proposito: detalhar os 9 containers do sistema GEO IPOG, suas responsabilidades e dependencias. Cada container corresponde a um diretorio dentro de `geo-platform/`, exceto o KPI Dashboard (`geo-dashboard`), o Editorial CMS (`geo-ipog`) e o Schema/llms.txt Manager (que publica em `geo-ipog-website`).

```mermaid
flowchart LR
    classDef servico fill:#1d4ed8,stroke:#1e3a8a,color:#ffffff,stroke-width:1px
    classDef banco fill:#b45309,stroke:#78350f,color:#ffffff,stroke-width:1px
    classDef webapp fill:#15803d,stroke:#14532d,color:#ffffff,stroke-width:1px
    classDef integra fill:#6c757d,stroke:#343a40,color:#ffffff,stroke-width:1px
    classDef seguranca fill:#9f1239,stroke:#581c2c,color:#ffffff,stroke-width:1px

    subgraph EXT["Sistemas externos"]
        direction TB
        ChatGPT[[ChatGPT]]:::integra
        Claude[[Claude]]:::integra
        Gemini[[Gemini]]:::integra
        Perplex[[Perplexity]]:::integra
        Grok[[Grok]]:::integra
        Copilot[[Copilot]]:::integra
        SiteIPOG[[ipog.edu.br]]:::integra
        GA4ext[[GA4]]:::integra
        OnePass[[1Password]]:::integra
        CFSec[[Cloudflare Secrets]]:::integra
    end

    subgraph COLETA["Camada de coleta"]
        direction TB
        Collector["GEO Collector Service<br/>Python httpx + retries<br/>cron diario 03h UTC"]:::servico
        NAIAEng["NAIA Audit Engine<br/>Wrapper para SaaS NAIA<br/>auditoria do site"]:::servico
    end

    subgraph CONTEUDO["Camada editorial e conteudo"]
        direction TB
        Voice["Voice Guard Service<br/>Python score 0-100<br/>gate de pre-commit"]:::servico
        Schema["Schema/llms.txt Manager<br/>Build-time JSON-LD<br/>publica artefatos"]:::servico
        CMS["Editorial CMS<br/>Markdown + Git<br/>conteudo HBR-grade"]:::servico
    end

    subgraph DADOS["Camada de dados e relatorio"]
        direction TB
        Dash["KPI Dashboard Web App<br/>Next.js 16 + Cloudflare<br/>9 secoes de KPI"]:::webapp
        Report["Reporting Service<br/>Geracao programada<br/>semanal, mensal, trimestral"]:::servico
        DW["Data Warehouse<br/>DuckDB local + R2<br/>serie temporal"]:::banco
    end

    subgraph IDENT["Identity e Secrets"]
        direction TB
        IDS["Identity & Secrets<br/>GitHub OIDC + 1Password<br/>Cloudflare Secrets binding"]:::seguranca
    end

    %% Coleta
    Collector --> ChatGPT
    Collector --> Claude
    Collector --> Gemini
    Collector --> Perplex
    Collector --> Grok
    Collector --> Copilot
    Collector -->|grava JSONL e insert| DW
    NAIAEng -->|crawl agendado| SiteIPOG
    NAIAEng -->|relatorio JSON| DW

    %% Conteudo
    CMS -->|trigger build| Schema
    Schema -->|publica HTML, JSON-LD, llms.txt| SiteIPOG
    Voice -->|consumido pelo CI editorial| CMS
    Voice -->|score arquivado| DW

    %% Dashboard e reporting
    Dash -->|le serie temporal| DW
    Report -->|consulta agregados| DW
    Report -->|publica relatorio| CMS
    SiteIPOG -->|referrer e UTM| GA4ext
    GA4ext -->|export diario| DW

    %% Identidade transversal
    IDS -.->|fornece credenciais| Collector
    IDS -.->|fornece credenciais| NAIAEng
    IDS -.->|fornece credenciais| Schema
    IDS -.->|fornece credenciais| Dash
    IDS -.->|fornece credenciais| Report
    IDS --> OnePass
    IDS --> CFSec
```

Observacao: linhas pontilhadas representam injecao de credenciais via OIDC (GitHub Actions) e binding de secrets (Cloudflare Workers), sem persistencia local de chaves.

---

## Diagrama 3 — Sequence Diagram do fluxo critico de coleta cross-LLM

Audiencia: engenharia de plataforma, FinOps, observabilidade. Proposito: especificar o caminho feliz e os caminhos de excecao (cache hit, circuit breaker, drift detector) de uma execucao diaria do GEO Collector. Inclui retry exponencial, registro de custo e gatilho de alerta para Alexandre.

```mermaid
sequenceDiagram
    autonumber
    participant Sched as Scheduler<br/>(cron 03h UTC)
    participant Orch as Orchestrator
    participant Cache as Idempotency Cache<br/>(SHA-256)
    participant Worker as Provider Worker<br/>(ex.: Perplexity)
    participant Breaker as Circuit Breaker
    participant API as Provider API
    participant FinOps as FinOps Tracker
    participant Drift as Drift Detector
    participant Pers as Persistence<br/>(JSONL + DW)
    participant Notif as Notifier
    participant Alex as Alexandre Caramaschi

    Sched->>Orch: dispatch daily 03h UTC
    Orch->>Cache: check SHA-256 do prompt do dia

    alt cache miss
        Cache-->>Orch: miss
        Orch->>Worker: call(prompt, providerId)
        Worker->>Breaker: estado do circuito
        alt circuito aberto
            Breaker-->>Worker: open, skip provider
            Worker->>Pers: registra skip + motivo
        else circuito fechado
            Breaker-->>Worker: closed, prosseguir
            loop ate 3 tentativas
                Worker->>API: HTTP POST /chat
                alt 2xx
                    API-->>Worker: response + usage tokens
                else 429 ou 5xx
                    API-->>Worker: erro transitorio
                    Worker->>Worker: backoff exponencial<br/>(1s, 2s, 4s, jitter)
                end
            end
            Worker->>FinOps: record cost (provider, tokens, USD)
            Worker->>Drift: hash semantico da resposta
            alt drift ok
                Drift-->>Worker: ok
            else drift suspect
                Drift-->>Worker: suspect, marcar para review
                Drift->>Notif: drift event suspect
            else drift confirmed
                Drift-->>Worker: confirmed, abrir incidente
                Drift->>Notif: drift event confirmed
            end
            Worker->>Pers: append JSONL + insert DW
        end
    else cache hit
        Cache-->>Orch: return cached result
        Orch->>Pers: registra cache hit
    end

    Orch->>Notif: budget guard check
    alt orcamento abaixo de 95%
        Notif-->>Orch: ok, seguir
    else orcamento >= 95% do mensal
        Notif->>Alex: alerta budget threshold
        Notif->>Orch: pausar provedor se 100%
    end

    Orch-->>Sched: status final<br/>(sucesso parcial, total ou skip)
```

Observacao: o orchestrator executa os 6 provider workers em paralelo limitado (semaforo configuravel); o diagrama mostra um unico worker por clareza.

---

## Diagrama 4 — Sequence Diagram do publish editorial

Audiencia: time editorial (Alexandre + Bruno), engenharia de conteudo, sponsor IPOG. Proposito: rastrear o ciclo completo de uma peca HBR-grade desde o `new hbr` ate o relatorio de mention rate D+14 nas 6 LLMs, passando pelos gates de qualidade (Voice Guard, NAIA, Lychee).

```mermaid
sequenceDiagram
    autonumber
    participant Alex as Alexandre Caramaschi
    participant CLI as CLI geo-editorial
    participant Repo as content/pecas-hbr/
    participant VG as Voice Guard Service
    participant GH as GitHub
    participant CI as ci-editorial.yml
    participant NAIA as NAIA Audit
    participant Lychee as Lychee Linkcheck
    participant Bruno as Bruno Azambuja
    participant Schema as Schema Builder
    participant Site as ipog.edu.br
    participant CFW as Cloudflare Worker<br/>(classify referrer)
    participant Cron as cron-pos-publish-d14
    participant Coll as GEO Collector
    participant LLMs as 6 LLMs (cohort)
    participant Dash as KPI Dashboard

    Alex->>CLI: new hbr {slug}
    CLI->>Repo: cria arquivo Markdown + frontmatter
    Alex->>Repo: redige peca HBR-grade
    Alex->>VG: pre-commit check score
    VG-->>Alex: score 84, ok para commit
    Alex->>GH: push branch + abre PR

    GH->>CI: trigger workflow
    par gates de qualidade
        CI->>VG: gate de voz
        VG-->>CI: score >= 80, pass
    and
        CI->>NAIA: gate de auditoria
        NAIA-->>CI: structured data ok
    and
        CI->>Lychee: linkcheck
        Lychee-->>CI: 0 broken links
    end

    CI->>Bruno: comment com summary dos gates
    Bruno->>GH: review + approve
    Alex->>GH: merge para main

    GH->>Schema: trigger build-time generation
    Schema->>Schema: gera JSON-LD Article + Course
    Schema->>Site: deploy (Cloudflare Pages)
    Site-->>CFW: requests entrantes
    CFW->>CFW: classifica referrer<br/>(LLM, organico, pago, direto)
    CFW->>Dash: stream de eventos para warehouse

    Note over Cron,LLMs: 14 dias depois...

    Cron->>Coll: dispatch coleta pos-publish
    Coll->>LLMs: poll prompts relevantes
    LLMs-->>Coll: respostas com ou sem mencao IPOG
    Coll->>Coll: calcula mention rate por LLM
    Coll->>Dash: atualiza secao 9 (Pos-publish D14)
    Dash-->>Alex: notificacao se mention rate < baseline
    Dash-->>Bruno: relatorio editorial semanal
```

Observacao: o gate paralelo (`par ... and ... and`) e renderizado pelo Mermaid como tres faixas simultaneas, evidenciando que os tres checks rodam em paralelo no CI.

---

## Diagrama 5 — Gantt mai-ago 2026 com marcos criticos

Audiencia: Conselho IPOG, sponsor Ronan, head de marketing Bruno, time Brasil GEO. Proposito: visualizar as 5 fases do programa, dependencias temporais entre entregas e marcos D-Day (M03 a M17). Use como mapa de execucao e referencia para reunioes quinzenais de governanca.

```mermaid
gantt
    title Programa GEO IPOG — execucao 2026.2 (mai-ago)
    dateFormat YYYY-MM-DD
    axisFormat %d-%m
    excludes weekends

    section Fase 0 Setup
    Decisoes Board e onboarding         :f0a, 2026-05-01, 14d
    Provisionamento 4 repos             :f0b, 2026-05-01, 7d
    Identity, Secrets e OIDC            :f0c, 2026-05-04, 7d
    Baseline cohort 6 LLMs              :f0d, after f0b, 5d

    section Fase 1 Baseline tecnico
    llms.txt draft e revisao            :f1a, 2026-05-07, 7d
    llms.txt producao (M03)             :milestone, m03, 2026-05-14, 0d
    Schema piloto homologacao           :f1b, 2026-05-15, 10d
    GA4 referrer e UTM (M07)            :milestone, m07, 2026-05-25, 0d
    Schema piloto producao (M06)        :milestone, m06, 2026-05-30, 0d
    NAIA primeiro audit completo        :f1c, 2026-05-20, 5d

    section Fase 2 Pre-pico editorial
    Pecas HBR drafting (1 a 4)          :f2a, 2026-05-23, 14d
    Voice Guard calibracao              :f2b, 2026-05-25, 7d
    Peca 1 HBR Alexandre (M08)          :milestone, m08, 2026-06-02, 0d
    Pecas HBR 2 publicacao              :f2c, 2026-06-05, 4d
    Pecas HBR 3 publicacao              :f2d, 2026-06-09, 4d
    Pecas HBR 4 publicacao              :f2e, 2026-06-12, 3d
    KPI Dashboard 9 secoes prontas      :f2f, 2026-05-28, 14d

    section Fase 3 Pico GEO 2026.2
    Abertura matricula (M10)            :milestone, m10, 2026-06-15, 0d
    Captacao ativa (47 dias)            :f3a, 2026-06-15, 47d
    Pecas HBR 5 a 8 (semanal)           :f3b, 2026-06-16, 28d
    Coleta diaria cross-LLM             :f3c, 2026-06-15, 47d
    CNP CFP Brasilia                    :f3d, 2026-07-03, 4d
    XII CBPOT Salvador (M14)            :milestone, m14, 2026-07-14, 0d
    Cobertura editorial CBPOT           :f3e, 2026-07-14, 4d
    Pecas HBR 9 e 10                    :f3f, 2026-07-18, 10d
    Fim do pico (M17)                   :milestone, m17, 2026-07-31, 0d

    section Fase 4 Licoes e proximo ciclo
    Relatorio pico Conselho             :f4a, 2026-08-01, 7d
    Retrospectiva Brasil GEO + IPOG     :f4b, 2026-08-05, 5d
    Backlog 2026.3 priorizado           :f4c, 2026-08-10, 7d
    Atualizacao Tech Roadmap            :f4d, 2026-08-12, 5d
```

Observacao: os marcos `milestone` aparecem como losangos na linha do tempo. As barras `Captacao ativa` e `Coleta diaria cross-LLM` cobrem todo o pico (15-jun a 31-jul) e devem ser monitoradas semanalmente pelo Reporting Service. Dependencias criticas implicitas: `llms.txt producao (M03)` precede `Schema piloto producao (M06)`; `GA4 referrer e UTM (M07)` precede `Abertura matricula (M10)`; `Peca 1 HBR (M08)` antecede o lancamento da matricula em 13 dias para garantir indexacao nas LLMs.

---

## Como renderizar este bundle

1. GitHub e GitLab renderizam os blocos ` ```mermaid ` nativamente em arquivos `.md`.
2. Em Notion, cole cada bloco em um Code block com linguagem `mermaid`.
3. Em Confluence, use a macro `Mermaid Diagrams for Confluence` ou exporte SVG via `mermaid-cli` (`mmdc -i 00c-roadmap-diagramas-mermaid.md -o roadmap.pdf`).
4. Para preservar tipografia e cores em apresentacoes Conselho, exporte SVG com tema `default` e fundo branco.

Versionamento: este arquivo e auxiliar (`_aux/`) do `00-tech-roadmap-2026.md` e deve ser atualizado em conjunto com qualquer mudanca em `01-solution-architecture.md` Bloco B (containers) ou em marcos do roadmap.
