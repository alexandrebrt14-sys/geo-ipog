# Sistema editorial GEO IPOG — Markdown + Voice Guard CI + Schema injection automático

> **Reframe canônico 12-05-2026:** o sistema editorial gerencia peças sobre o portfólio amplo de pós-graduação em Psicologia em 5 modalidades canônicas (`dashboards/METRICAS-CANONICAS.md` Cláusula 0). O frontmatter da peça declara obrigatoriamente o campo `modalidade_canonica` com um dos valores: `"especializacao-lato-sensu"`, `"mba-correlato"`, `"mestrado-profissional"`, `"especializacao-clinica-certificada"`, `"formacao-hibrida-residencia"`. O `related_product` aponta para o `EducationalOccupationalProgram` da modalidade correspondente. Os exemplos com URL `/mba-online-...` cobrem a modalidade `"mba-correlato"`; peças sobre Avaliação Psicológica com SATEPSI cobrem `"especializacao-clinica-certificada"`; e assim por diante.

> **Documento:** 08 — Especificação do sistema editorial do programa GEO IPOG (gestão de peças HBR-grade, Voice Guard inline, Schema injection automático, integração GA4).
> **Cliente:** IPOG (Instituto de Pós-Graduação e Graduação, Goiânia, fundado 2001).
> **Sponsor executivo:** Ronan Maia (CEO IPOG).
> **Interlocutor operacional:** Bruno Azambuja (Gerente de Marketing IPOG).
> **Executor:** Brasil GEO — Alexandre Caramaschi (CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil).
> **Janela:** especificação congelada em 2026-05-01; publicação da Peça 1 em 02-06-2026 (M08).
> **Repositório-alvo:** `geo-ipog/` (monorepo do programa) + `geo-platform/` (Voice Guard reutilizado).
> **Cross-links obrigatórios:** `content/PADRAO-EDITORIAL.md`, `content/VOICE-GUIDE.md`, `content/CHECKLIST-PUBLICACAO.md`, `content/CHECKLIST-AUTOAVALIACAO.md`, `content/BLOOM-KNOWLES.md`, `content/CLICHES-PROIBIDOS.md`, `content/ACENTUACAO-PT-BR.md`, `content/GLOSSARIO-PSICOLOGIA.md`, `docs/board-report/06-editorial-strategy.md`, `docs/tech-stack/01-solution-architecture.md` (ADR-006), `docs/tech-stack/03-schema-llms-txt-engineer.md`, `docs/tech-stack/06-naia-voice-guard.md`, `dashboards/METRICAS-CANONICAS.md` (KPI 7), `dashboards/KPI-DASHBOARD.md`.

Este dossiê especifica o sistema editorial que sustenta as 7 peças HBR-grade da Fase 2 (02-23 de junho de 2026) do programa GEO IPOG. A decisão prévia, registrada em ADR-006 do `01-solution-architecture.md`, é Markdown versionado em Git + Voice Guard como CI gate, sem CMS proprietário no curto prazo. A meta operacional é manter o overhead de publicação por peça em menos de 30 minutos para Bruno Azambuja, com Voice Guard inline no editor, Schema injection determinística, GA4 com classificação dedicada de tráfego LLM e observabilidade até D+14 e D+30.

A entrega cobre 13 blocos: decisão de stack revisitada, estrutura de pastas, frontmatter canônico, CLI editorial, pipeline build → publish, Schema injection, integração GA4, coautoria, workflow de revisão, métricas pós-publicação, anti-padrões, CI/CD e roadmap até a Peça 1 de Alexandre.

---

## Bloco A — Decisão de stack revisitada

A decisão arquitetural foi revisitada em 2026-05-01 com três cenários operacionais. O cenário escolhido é Markdown + Git + CI, alinhado a ADR-006. A reavaliação está agendada para 2027.1 caso o volume editorial passe de 15 peças por mês.

### A.1 Cenários comparados

| Critério | Cenário 1 — Markdown + Git + CI (escolhido) | Cenário 2 — Sanity (CMS headless) | Cenário 3 — Payload CMS self-hosted |
|---|---|---|---|
| Custo mensal direto | 0 USD (GitHub Actions free tier; Cloudflare Workers free tier) | 99 USD (Sanity Growth) | 0 USD em licença + 15 a 25 USD em hosting (Render/Fly) |
| Custo de implementação | 1-2 semanas (CLI editorial + workflows) | 3-4 semanas (schema modeling + integração + treinamento) | 4-6 semanas (build custom + auth + plugins) |
| Lock-in | Zero (Markdown é portátil) | Médio (Sanity Studio + GROQ + Sanity Schema) | Baixo (auto-hospedado, exportável) |
| Voice Guard inline | Trivial (pre-commit hook + plugin VS Code) | Customização via Studio plugins (TypeScript) | Plugin Payload custom |
| Schema injection automática | Build script Python lê frontmatter, gera JSON-LD | Webhook + função serverless | Hook Payload `afterChange` |
| UX para autor não-técnico (Bruno) | Markdown editor (VS Code, Obsidian, Typora) | UI rica nativa, drag-and-drop assets | UI rica via Admin panel |
| Auditabilidade | Total (Git history + PRs) | Dependente do export Sanity | Total via Postgres + Git de schema |
| Tempo até Peça 1 (M08) | 30 dias (caminho crítico cumprido) | 45-60 dias (risco de atraso de M08) | 60+ dias (não cabe na janela) |
| Overhead por publicação para Bruno | Aprovar PR + deploy automático: <30 min | Validar visualização + publicar: 15-25 min | Validar + publicar: 15-25 min |
| Integração com Voice Guard existente (`geo-platform/voice_guard`) | Direta (mesmo Python) | Via HTTP (custom plugin) | Via HTTP (custom plugin) |
| Histórico de versões | Git (semantic, infinito) | Sanity Document History (limitado a plano) | Postgres com extensão temporal |
| Risco operacional Fase 2 | Baixo (stack já dominado) | Médio (nova ferramenta) | Médio-alto (self-hosted novo) |

### A.2 Justificativa e trade-offs

Sanity introduz lock-in (GROQ + Sanity Schema) e 99 USD/mês não justificáveis em 7 peças. Payload demanda 4-6 semanas, queimando M08. Markdown + Git + CI aproveita o `voice_guard.py` já em produção (memória `feedback_alexandre_voice`), preserva FinOps (teto USD 50/sprint), e atende Alexandre (Markdown puro) e Bruno (PR review com preview Vercel + comentário automatizado de Voice Guard).

Trade-off principal: UX de autor não-técnico em Git. Mitigado por (1) CLI `geo-editorial` escondendo Git atrás de `new/validate/preview/publish`; (2) treinamento curto (1h) para Bruno usar PR review em GitHub Web; (3) preview Vercel automático em cada PR.

Reavaliação ADR-006 em 2027.1 com gatilhos: volume sustentado >15 peças/mês por dois trimestres; demanda explícita de Bruno por UI rica de assets; onboarding de autores convidados externos sem fluência em Git.

---

## Bloco B — Estrutura de pastas no `geo-ipog`

A estrutura abaixo é prescritiva. Toda peça HBR-grade vive em `content/peças-hbr/`, todo perfil de autor em `content/autores/`, todo script editorial em `scripts/editorial/`, e os workflows CI em `.github/workflows/`. Nada de copy editorial fora dessa árvore.

```
geo-ipog/
├── content/
│   ├── PADRAO-EDITORIAL.md                       # já existente — fonte de verdade HBR
│   ├── VOICE-GUIDE.md                            # já existente — Voice Guard 4 dimensões
│   ├── CHECKLIST-PUBLICACAO.md                   # já existente — gate 5 camadas
│   ├── CHECKLIST-AUTOAVALIACAO.md                # já existente — pré-requisito autor
│   ├── BLOOM-KNOWLES.md                          # já existente — verbos Bloom 3+
│   ├── CLICHES-PROIBIDOS.md                      # já existente — 3 deny-lists
│   ├── ACENTUACAO-PT-BR.md                       # já existente — auto-fix
│   ├── GLOSSARIO-PSICOLOGIA.md                   # já existente — terminologia canônica
│   ├── EXERCICIO-TEMPLATE.md                     # já existente — Bloom 3+
│   ├── BRIEFING-TEMPLATE.md                      # já existente — input de peça
│   ├── peças-hbr/                                # NOVO — 7 peças Fase 2
│   │   ├── 2026-06-02-categoria-mba-online-psicologia.md
│   │   ├── 2026-06-04-custo-invisivel-rh-sem-psicologia.md
│   │   ├── 2026-06-09-recem-formado-organizacional.md
│   │   ├── 2026-06-11-avaliacao-psicologica-satepsi.md
│   │   ├── 2026-06-16-psicopedagogia-institucional-clinica.md
│   │   ├── 2026-06-18-anhembi-vs-ipog.md
│   │   └── 2026-06-23-aulas-ao-vivo-tres-metricas.md
│   └── autores/                                  # NOVO — perfis canônicos
│       ├── alexandre-caramaschi.yaml
│       ├── ronan-maia.yaml
│       ├── bruno-azambuja.yaml
│       └── autores-convidados/
│           ├── _TEMPLATE.yaml
│           └── docente-organizacional-{slug}.yaml
├── scripts/
│   └── editorial/                                # NOVO — automação editorial
│       ├── geo_editorial.py                      # CLI typer + rich (4 comandos)
│       ├── schema_injection.py                   # gera Article + Person + EOP
│       ├── ga4_utm_builder.py                    # builda UTM dedicada de LLM
│       ├── frontmatter_validator.py              # 18+ campos obrigatórios
│       └── llm_referrer_classifier.py            # Cloudflare Worker opcional
├── .github/
│   └── workflows/
│       ├── ci-editorial.yml                      # NOVO — PR gate completo
│       ├── ci-voice-guard.yml                    # já existente em geo-platform
│       ├── cron-pos-publish-d14.yml              # NOVO — coleta D+14
│       └── deploy-blog.yml                       # NOVO — build estático para ipog.edu.br
├── audits/
│   └── publicacao/                               # já existente — logs por peça
│       └── {slug}/
│           ├── voice-guard-report.json
│           ├── schema-validacao.json
│           ├── checklist-publicacao.md
│           └── licoes-aprendidas.md
└── dashboards/
    └── KPI-DASHBOARD.md                          # já existente — seção 9 atualizada por peça
```

Total: pelo menos 15 arquivos canônicos novos ou modificados nesta especificação, todos auditáveis via Git history.

---

## Bloco C — Frontmatter YAML canônico

Todo arquivo `content/peças-hbr/<data>-<slug>.md` declara frontmatter YAML obrigatório com 18 campos, validados pelo `frontmatter_validator.py` antes do build. Campos faltantes bloqueiam o CI.

### C.1 Campos obrigatórios

| # | Campo | Tipo | Obrigatório | Notas |
|---|---|---|---|---|
| 1 | `title` | string | sim | Título completo da peça (max 110 chars para `headline` Schema). |
| 2 | `subtitle` | string | sim | Subhead (vai em `alternativeHeadline`). |
| 3 | `slug` | string | sim | ASCII puro, kebab-case, sem acento (regra `feedback_accent_url_protection`). |
| 4 | `authors` | list[string] | sim | Lista de slugs de `content/autores/`. Mínimo 1. |
| 5 | `coauthors` | list[string] | não | Slugs de docentes convidados. |
| 6 | `cluster` | enum | sim | `transversal`, `organizacional`, `clinica`, `psicopedagogia`. |
| 7 | `persona_alvo` | enum | sim | P1 a P7 do `prompts/KIT-PROMPTS-V0.md`. |
| 8 | `prompt_ancora` | list[string] | sim | IDs canônicos cobertos (K-TR-001 etc.). |
| 9 | `ementa_dimensoes` | dict[bool] | sim | 6 booleans dos elementos HBR (abertura, fundamentação, caso, tabela, exercícios, síntese). |
| 10 | `hbr_format_score` | int 0-100 | sim | Score self-assessment do autor. |
| 11 | `voice_guard_score` | int 0-100 | sim | Última execução automática (preenchido pelo CI). |
| 12 | `schema_validacao` | enum | sim | `pendente`, `aprovado`, `falha`. |
| 13 | `publish_at` | ISO 8601 | sim | Data + hora janela 9h-11h BRT. |
| 14 | `status` | enum | sim | `rascunho`, `revisao-voice-guard`, `revisao-bruno`, `revisao-juridica`, `aprovado`, `publicado`, `arquivado`. |
| 15 | `related_product` | dict | sim | `type` (`EducationalOccupationalProgram`), `id` (`@id` canônico), `cta` (texto âncora descritivo). |
| 16 | `ga4_utm` | dict | sim | `source`, `medium`, `campaign`, `content`. |
| 17 | `schema_article_overrides` | dict | não | Override de campos do JSON-LD (rara — apenas peças com `HowTo`). |
| 18 | `tags` | list[string] | sim | Naming canônico (`MBA Online de Psicologia`, `Brasil GEO`, `IPOG`, etc.). |

### C.2 Exemplo concreto da Peça 1 (Alexandre)

Arquivo: `content/peças-hbr/2026-06-02-categoria-mba-online-psicologia.md`.

```yaml
---
title: "A categoria que ainda não existe — por que MBA Online de Psicologia precisa ser nomeada antes do pico de captação 2026.2"
subtitle: "Como Schema canônico, autor verificável e PR coordenado capturam a primeira matrícula 2026.2"
slug: "categoria-mba-online-psicologia-naming-2026"
authors: [alexandre-caramaschi]
coauthors: []
cluster: "transversal"
persona_alvo: "P3"
prompt_ancora: ["K-TR-001", "K-C1-001"]
ementa_dimensoes:
  abertura_impacto: true
  fundamentacao_conceitual: true
  analise_caso: true
  quadro_comparativo: true
  exercicios_praticos: true
  sintese_executiva: true
hbr_format_score: 92
voice_guard_score: 0       # preenchido pelo CI
schema_validacao: "pendente"
publish_at: "2026-06-02T09:30:00-03:00"
status: "rascunho"
related_product:
  type: "EducationalOccupationalProgram"
  id: "https://ipog.edu.br/cursos/pos-graduacao/mba-online-psicologia-organizacional#program"
  cta: "Conheça a estrutura do MBA Online em Psicologia Organizacional e do Trabalho do IPOG"
ga4_utm:
  source: "blog-ipog"
  medium: "editorial-hbr"
  campaign: "fase2-leva1-categoria-naming"
  content: "peca-1-alexandre-2026-06-02"
schema_article_overrides: { inLanguage: "pt-BR" }
tags: ["MBA Online de Psicologia", "Brasil GEO", "IPOG", "Psicologia Organizacional", "Categoria naming"]
---
```

`voice_guard_score` inicia em `0` no rascunho; CI sobrescreve no commit final. `schema_validacao` vira `aprovado` quando `validator.schema.org` retorna zero erros (rodado em `ci-editorial.yml`).

---

## Bloco D — CLI editorial (`geo-editorial`)

A CLI `geo-editorial` é o ponto de entrada operacional. Implementação em Python 3.12 com `typer` + `rich`. Reusa `voice_guard.cli` para a etapa de validação. Distribuição via `pip install -e scripts/editorial/`.

### D.1 Comandos canônicos

| Comando | Função | Saída |
|---|---|---|
| `geo-editorial new` | Cria arquivo Markdown novo a partir de `content/BRIEFING-TEMPLATE.md` com frontmatter pré-populado. | `content/peças-hbr/<data>-<slug>.md` + entrada em `content/autores/<slug>.yaml` se autor novo. |
| `geo-editorial validate` | Roda Voice Guard + valida frontmatter + valida Schema gerado. | Report Markdown ou JSON, exit 0 se aprovado. |
| `geo-editorial preview` | Constrói HTML local com Schema injetado e abre no browser. | Servidor local em http://127.0.0.1:8765. |
| `geo-editorial publish` | Atualiza `status: aprovado`, gera Schema final, abre PR de deploy. | URL do PR no GitHub. |

### D.2 Esqueleto da implementação

```python
# scripts/editorial/geo_editorial.py
import typer
from pathlib import Path
from rich.console import Console
from voice_guard.cli import evaluate_file
from schema_injection import build_schema_graph
from frontmatter_validator import validate_frontmatter

app = typer.Typer(no_args_is_help=True, help="CLI editorial GEO IPOG.")
console = Console()

@app.command()
def new(title: str, author: str = "alexandre-caramaschi", cluster: str = ...,
        persona: str = ..., publish_at: str = ...):
    """Cria peça HBR a partir de BRIEFING-TEMPLATE com frontmatter pré-populado."""

@app.command()
def validate(file: Path):
    """Roda frontmatter_validator + voice_guard + schema_injection (dry_run).
    Exit 1 se Voice Guard < 70, frontmatter incompleto ou Schema inválido."""

@app.command()
def preview(file: Path, port: int = 8765):
    """Builda HTML local com JSON-LD injetado e serve em http://127.0.0.1:8765."""

@app.command()
def publish(file: Path, open_pr: bool = True):
    """Roda validate como gate, set status=aprovado, commit, push, abre PR."""
```

### D.3 Exemplo de uso terminal

```bash
$ geo-editorial new --title "A categoria que ainda nao existe" \
                    --author alexandre-caramaschi \
                    --cluster transversal --persona P3 \
                    --publish-at 2026-06-02T09:30:00-03:00
Criado: content/peças-hbr/2026-06-02-a-categoria-que-ainda-nao-existe.md

$ geo-editorial validate content/peças-hbr/2026-06-02-a-categoria-que-ainda-nao-existe.md
                          Validação — 2026-06-02-a-categoria-que-ainda-nao-existe.md
┏━━━━━━━━━━━━━━┳━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Camada       ┃ Status ┃ Detalhe                          ┃
┡━━━━━━━━━━━━━━╇━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│ Frontmatter  │ OK     │ 18 campos presentes              │
│ Voice Guard  │ 84     │ 84/100                           │
│ Schema       │ OK     │ JSON-LD válido                   │
└──────────────┴────────┴──────────────────────────────────┘

$ geo-editorial preview content/peças-hbr/2026-06-02-a-categoria-que-ainda-nao-existe.md
Preview: http://127.0.0.1:8765

$ geo-editorial publish content/peças-hbr/2026-06-02-a-categoria-que-ainda-nao-existe.md
PR: https://github.com/brasil-geo/geo-ipog/pull/187
```

---

## Bloco E — Pipeline build → publish

O pipeline tem 7 etapas determinísticas, cada uma com gate explícito e log auditável. O fluxo respeita a matriz de aprovação do `content/CHECKLIST-PUBLICACAO.md`.

### E.1 Diagrama operacional

```
[1. Draft local]
   geo-editorial new + redação em VS Code
        |
        v
[2. Husky pre-commit Voice Guard]
   .husky/pre-commit roda voice_guard.cli check em arquivos staged
   Bloqueio se score < 70 ou critical_blocks ativos
        |
        v
[3. PR aberto]
   git push origin feature/peca-1
   gh pr create
        |
        v
[4. ci-editorial.yml]
   Lint frontmatter -> Voice Guard -> Schema validation -> Build preview
   Comentário automatizado anexa report ao PR
        |
        v
[5. Bruno aprova (revisão operacional)]
   GitHub Web ou Vercel preview; SLA 2 dias úteis
   Camada extra (jurídica) acionada em paralelo se claim regulatório
        |
        v
[6. Merge gera Schema + deploy]
   deploy-blog.yml builda estático com JSON-LD injetado
   Push para CMS atual do IPOG via export pré-aprovado
        |
        v
[7. KPI Dashboard registra]
   Hook pós-deploy escreve em dashboards/KPI-DASHBOARD.md seção 9
   Timestamp + URL canônica + autor + cluster + prompts-âncora
```

### E.2 SLA por etapa

| Etapa | Owner | SLA | Falha bloqueia |
|---|---|---|---|
| 1. Draft | Autor (Alexandre ou coautor) | Conforme calendário Bloco C de `06-editorial-strategy.md` | 2 |
| 2. Pre-commit Voice Guard | Pipeline local | <30s por arquivo | 3 |
| 3. PR aberto | Autor | Mesmo dia da entrega | 4 |
| 4. CI completo | Pipeline GitHub Actions | <8 minutos | 5 |
| 5. Bruno aprova | Bruno Azambuja | 2 dias úteis | 6 |
| 5b. Jurídico (se aplicável) | Jurídico IPOG | 5 dias úteis | 6 |
| 6. Deploy | Pipeline + TI IPOG | <15 minutos pós-merge | 7 |
| 7. KPI Dashboard | Hook pós-deploy | <60s | — |

Overhead total para Bruno em peça padrão: 25-30 minutos (revisão PR + aprovação + spot-check Vercel preview). Em peça com camada jurídica, overhead permanece igual para Bruno; o jurídico opera em paralelo.

---

## Bloco F — Schema injection canônico

A injeção de Schema é determinística e roda em build (etapa 6 do pipeline). O script `scripts/editorial/schema_injection.py` lê o frontmatter, lê `content/autores/<slug>.yaml`, e gera um único `@graph` consolidado com `Article` + `Person` (autor principal) + `Person` (coautores quando houver) + `EducationalOrganization` (publisher) + `EducationalOccupationalProgram` (cross-link de produto). O resultado vai em `<head>` da página renderizada.

### F.1 Estrutura `@graph` canônica para Peça 1 (Alexandre)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://ipog.edu.br/blog/categoria-mba-online-psicologia-naming-2026#article",
      "headline": "A categoria que ainda não existe — por que MBA Online de Psicologia precisa ser nomeada",
      "alternativeHeadline": "Como Schema canônico, autor verificável e PR coordenado capturam a primeira matrícula 2026.2",
      "url": "https://ipog.edu.br/blog/categoria-mba-online-psicologia-naming-2026",
      "image": ["...hero-1x1.jpg", "...hero-4x3.jpg", "...hero-16x9.jpg"],
      "datePublished": "2026-06-02T09:30:00-03:00",
      "dateModified": "2026-06-02T09:30:00-03:00",
      "inLanguage": "pt-BR",
      "articleSection": "Transversal",
      "wordCount": 2400,
      "author": { "@id": "https://ipog.edu.br/colunistas/alexandre-caramaschi#person" },
      "publisher": { "@id": "https://ipog.edu.br/#organization" },
      "mainEntityOfPage": { "@type": "WebPage", "@id": "https://ipog.edu.br/blog/categoria-mba-online-psicologia-naming-2026" },
      "about": [{ "@id": "https://ipog.edu.br/cursos/pos-graduacao/mba-online-psicologia-organizacional#program" }],
      "mentions": [
        { "@id": "https://ipog.edu.br/cursos/pos-graduacao/mba-online-psicologia-organizacional#program" },
        { "@id": "https://ipog.edu.br/#organization" }
      ],
      "citation": [
        "Brasil GEO (2026). Auditoria de 10 concorrentes em MBA Online de Psicologia.",
        "Conselho Federal de Psicologia (2025). Distribuição de psicólogos por área."
      ]
    },
    {
      "@type": "Person",
      "@id": "https://ipog.edu.br/colunistas/alexandre-caramaschi#person",
      "name": "Alexandre Caramaschi",
      "jobTitle": "CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil",
      "url": "https://ipog.edu.br/colunistas/alexandre-caramaschi",
      "image": "https://ipog.edu.br/colunistas/alexandre-caramaschi/foto.jpg",
      "worksFor": { "@id": "https://brasilgeo.com/#organization" },
      "affiliation": [{ "@id": "https://ipog.edu.br/#organization" }],
      "sameAs": [
        "http://lattes.cnpq.br/{ID_LATTES_ALEXANDRE}",
        "https://orcid.org/{ID_ORCID_ALEXANDRE}",
        "https://www.linkedin.com/in/alexandrecaramaschi"
      ]
    },
    {
      "@type": "EducationalOrganization",
      "@id": "https://ipog.edu.br/#organization",
      "name": "IPOG",
      "url": "https://ipog.edu.br",
      "foundingDate": "2001",
      "sameAs": ["https://www.linkedin.com/school/ipog", "https://emec.mec.gov.br/.../MTU2NTk="]
    },
    {
      "@type": "EducationalOccupationalProgram",
      "@id": "https://ipog.edu.br/cursos/pos-graduacao/mba-online-psicologia-organizacional#program",
      "name": "MBA Online em Psicologia Organizacional e do Trabalho",
      "url": "https://ipog.edu.br/cursos/pos-graduacao/mba-online-psicologia-organizacional",
      "programType": "MBA",
      "educationalProgramMode": "online",
      "occupationalCredentialAwarded": "Especialização lato sensu reconhecida pelo MEC",
      "provider": { "@id": "https://ipog.edu.br/#organization" },
      "timeToComplete": "P12M",
      "audience": { "@type": "EducationalAudience", "educationalRole": "Profissional de RH, gestor, psicólogo organizacional" }
    }
  ]
}
```

### F.2 Regras determinísticas do `schema_injection.py`

1. `@id` do `Article` sempre `<URL_CANONICA>#article`.
2. `@id` do `Person` sempre `<URL_PERFIL>#person`.
3. `author` do `Article` é referência por `@id`, nunca objeto inline.
4. `publisher` é referência por `@id` à `EducationalOrganization` raiz do IPOG.
5. `mentions` aponta para `EducationalOccupationalProgram` do produto correlato + `EducationalOrganization` do IPOG.
6. `sameAs` do `Person` autor inclui Lattes, ORCID e LinkedIn (3 mínimo).
7. Coautores entram com novo `Person` no `@graph`, com mesmo padrão `sameAs`.
8. Validação obrigatória contra `validator.schema.org` no CI; falha bloqueia merge.

### F.3 Validação no CI

```bash
# scripts/editorial/schema_injection.py --validate
python -c "
from schema_injection import build_schema_graph, validate_with_schemaorg
graph = build_schema_graph('content/peças-hbr/2026-06-02-categoria-mba-online-psicologia.md')
errors = validate_with_schemaorg(graph)
assert not errors, errors
"
```

---

## Bloco G — Integração GA4

A integração GA4 segue KPI 7 (`Conversion Lift por canal LLM`) do `dashboards/METRICAS-CANONICAS.md`. Objetivo: classificar tráfego LLM por origem, medir engajamento (scroll, tempo) e conversão (CTA → curso → lead → matrícula). UTM dedicada, eventos custom e classificador de referrer opcional em Cloudflare Worker.

### G.1 Tabela UTM por LLM source

A UTM é derivada do `ga4_utm` do frontmatter, mas o `utm_source` real do tráfego entrante é classificado pelo referrer. A tabela canônica:

| LLM source detectado (referrer) | `utm_source` atribuído | Detecção |
|---|---|---|
| `chatgpt.com`, `chat.openai.com` | `chatgpt` | Referrer + UA |
| `claude.ai`, `claude.com` | `claude` | Referrer |
| `gemini.google.com` | `gemini` | Referrer |
| `perplexity.ai`, `www.perplexity.ai` | `perplexity` | Referrer |
| `grok.com`, `x.com/i/grok` | `grok` | Referrer + UA |
| `copilot.microsoft.com`, `bing.com/chat` | `copilot` | Referrer |
| outros (orgânico Google) | `google-organic` | Referrer = `google.com` sem GCLID |
| direto / sem referrer | `direct` | Sem referrer |

O `utm_medium` para tráfego LLM é fixado em `llm-citation`. O `utm_campaign` herda do frontmatter da peça (`fase2-leva1-categoria-naming` etc.). O `utm_content` traz o slug da peça (`peca-1-alexandre-2026-06-02`), permitindo atribuição por peça individual.

### G.2 Custom events GA4

| Evento | Trigger | Parâmetros | Propósito |
|---|---|---|---|
| `peca_hbr_lida_completamente` | Scroll >= 80% da página + tempo na página >= 90s | `slug`, `cluster`, `persona_alvo`, `utm_source` | Mede leitura efetiva (não só pageview). |
| `cta_mba_clicado` | Clique em link com `data-cta="mba-related"` | `slug`, `cluster`, `target_program_id`, `utm_source` | Conversão peça → produto. |
| `voltagem_voice_guard` | Renderização da peça (uma vez por sessão) | `slug`, `voice_guard_score`, `cluster` | Cohort de score editorial × engajamento. |
| `coautoria_visualizada` | Renderização da peça com `coauthors > 0` | `slug`, `coauthor_slug` | Mede valor de coautoria docente. |

### G.3 Funil de conversão canônico

```
peca_hbr_lida_completamente (>=80% scroll)
        |
        v
cta_mba_clicado
        |
        v
course_view (página do MBA carregada)
        |
        v
generate_lead (formulário enviado)
        |
        v
matricula (server-side via Measurement Protocol)
```

Cada etapa é atribuída ao `utm_source` da primeira sessão (atribuição "first non-direct click"). KPI 7 (`Conversion Lift por canal LLM`) compara `taxa_conversao_LLM / taxa_conversao_organica_Google` por LLM, com N mínimo de 100 sessões classificadas por LLM no período.

### G.4 Cloudflare Worker classificador (opcional)

Quando o referrer chega encurtado ou ausente (ex: ChatGPT browse via `oai.com`), um Worker classifica o tráfego antes de chegar ao GA4. Aplicado em domínio próprio do programa, não em `ipog.edu.br` (controlado por TI IPOG). Esqueleto:

```javascript
const LLM_HOSTS = {
  "chatgpt.com": "chatgpt", "claude.ai": "claude", "gemini.google.com": "gemini",
  "perplexity.ai": "perplexity", "grok.com": "grok", "copilot.microsoft.com": "copilot"
};
// Se referrer.hostname está no mapa e UTM ausente, redireciona com utm_source=<llm> e utm_medium=llm-citation.
```

Decisão arquitetural: implementar o Worker só se a Fase 2 mostrar perda de atribuição superior a 15% do tráfego LLM esperado; caso contrário, manter classificação client-side via GTM. Alternativa rejeitada: classificar exclusivamente em GA4 server-side (atrasa decisão por 24-48h e perde edge-case de referrer ausente).

---

## Bloco H — Coautoria

A leva 1 da Fase 2 tem 7 peças, das quais as peças 3 e 5 são coautoria com docente IPOG (cluster Organizacional e cluster Psicopedagogia respectivamente). A peça 4 pode receber endosso técnico via quote, sem coautoria formal. O fluxo padrão suporta até 7 autores convidados ao longo da Fase 2 + Fase 3.

### H.1 Fluxo operacional de coautoria

| Etapa | Responsável | Saída | SLA |
|---|---|---|---|
| 1. Bruno indica candidato a docente | Bruno Azambuja | Nome + área de cluster | D-30 da publicação |
| 2. Coleta de perfil via form | Tally ou Google Form (`forms.gle/geo-ipog-coautor`) | YAML de input | D-25 |
| 3. Materialização em `content/autores/autores-convidados/<slug>.yaml` | Pipeline | YAML canônico | D-22 |
| 4. Cessão de direitos editoriais | Jurídico IPOG (template) | PDF assinado | D-20 |
| 5. Schema `Person` validado (Lattes/ORCID HTTP 200) | `frontmatter_validator.py` | Validação automática | D-18 |
| 6. Voice Guard sobre seção do coautor | Pipeline | Score >= 70 obrigatório | D-15 |
| 7. PR de inclusão na peça | Autor principal | PR mergeado | D-10 |

### H.2 Formulário de coleta — campos obrigatórios

| Campo | Obrigatório | Validação |
|---|---|---|
| Nome completo | sim | Sem abreviações |
| Cargo institucional + IPOG | sim | Em texto livre |
| Área de cluster | sim | Enum: Organizacional, Clínica, Psicopedagogia |
| URL Lattes | sim | HTTP 200 + perfil populado |
| URL ORCID | sim | HTTP 200 + publicações declaradas |
| URL LinkedIn | sim | Perfil ativo nos últimos 90 dias |
| Mini-bio (3 frases, max 400 chars) | sim | Voice Guard >= 70 |
| Foto profissional (1:1, min 800px) | sim | Direitos cedidos |
| Periódicos mais recentes (3) | sim | Indexação em base reconhecida |
| Linha de pesquisa | sim | Em PT-BR |
| CRP ativo (quando aplicável) | condicional | Cluster Clínica e Avaliação Psicológica |

### H.3 YAML resultante (campos canônicos)

`slug`, `nome`, `nome_completo_titulado`, `cargo`, `cluster`, `url_lattes`, `url_orcid`, `url_linkedin`, `foto`, `mini_bio` (max 400 chars, Voice Guard >= 70), `crp` (quando aplicável), `direitos_cedidos: true`, `voice_guard_score_bio`, `status: aprovado`. Salvo em `content/autores/autores-convidados/<slug>.yaml`.

### H.4 Cessão de direitos — itens obrigatórios

Template canônico (`content/autores/CESSAO-DIREITOS-TEMPLATE.md`): cessão exclusiva para o programa GEO IPOG, prazo perpétuo, direito de uso da imagem em Schema `Person`, direito de citação em campanhas, direito de tradução caso a Fase 4 expanda para internacional. Assinatura digital aceita (DocuSign ou GovBR Assina).

---

## Bloco I — Workflow de revisão

A revisão segue 6 camadas. Voice Guard é a primeira camada automatizada; as demais são humanas e operam em sequência ou paralelo conforme a peça aciona compliance regulatório.

### I.1 Tabela de revisão

| Camada | Owner | O que aprova | Bloqueio | SLA |
|---|---|---|---|---|
| Voice Guard CI | Pipeline | Score >= 70 e zero bloqueios críticos. | Falha bloqueia PR. | <8 min por execução |
| NAIA Schema preview | NAIA Audit Engine + `validator.schema.org` | JSON-LD válido + cross-link com `EducationalOccupationalProgram`. | Falha bloqueia merge. | <5 min |
| Bruno Azambuja (institucional) | Bruno | Naming canônico, cross-link MBA, alinhamento com calendário, tom institucional do IPOG. | Falha devolve para autor com diff. | 2 dias úteis |
| Diretoria Acadêmica IPOG (claim regulatório) | Coordenação Acadêmica | Conformidade MEC/CFP/SATEPSI; verifica claim de reconhecimento, registro CRP exigido, instrumento SATEPSI vigente. | Falha aciona reescrita técnica. | 5 dias úteis |
| Jurídico IPOG (claim regulatório CFP) | Departamento Jurídico IPOG | Aprovação formal documentada de claim regulatório (peça 4 da Fase 2). | Falha bloqueia publicação. | 5 dias úteis pactuados |
| Alexandre (final) | Alexandre Caramaschi | Voz autoral, tese contraintuitiva, dado verificável, mecanismo causal, decisão pessoal, próximo passo. | Falha aciona reescrita estrutural. | 1 dia útil |

A Diretoria Acadêmica e o Jurídico atuam em paralelo ao Voice Guard e à revisão de Bruno quando a peça aciona claim regulatório (peça 4 — Avaliação Psicológica + SATEPSI; peça 1 cita reconhecimento MEC). Em peças sem claim regulatório, as camadas Diretoria e Jurídico são puladas.

### I.2 Tratamento de falha

Conforme `content/CHECKLIST-PUBLICACAO.md`: falha em camada 1, 2 ou 3 devolve para autor com diff explícito; falha em Schema corrige no template sem reabrir conteúdo; falha em Voice Guard devolve com pontuação por dimensão; falha em compliance MEC/CFP retém publicação e aciona Alexandre + Bruno.

Limite de 3 reescritas estruturais antes de escalar para descontinuação ou redirecionamento de cluster (`content/VOICE-GUIDE.md`).

---

## Bloco J — Métricas pós-publicação D+14 e D+30

A medição cross-LLM em D+14 segue o `dashboards/RUNBOOK-COLETA-LLM.md` e alimenta KPI 1 (Mention Rate), KPI 3 (Citation Quality), KPI 7 (Conversion Lift) e KPI 8 (Delta pré/pós onda). D+30 adiciona métricas de tráfego, conversão e backlinks.

### J.1 Tabela canônica

| Métrica | Fonte | Cadência | Meta Fase 2 | Owner |
|---|---|---|---|---|
| Mention Rate cross-LLM (6 cohort) | Coleta cross-LLM diária | D+14 e D+30 | +20 pp em ChatGPT/Claude/Perplexity nos prompts-âncora da peça (Bloco H do `06-editorial-strategy.md`) | Alexandre |
| Citation Quality Score | Pipeline coleta + classificador Groq | D+14 | +1 ponto na dimensão atacada pela peça | Alexandre |
| GA4 sessões (peça) | GA4 | D+14 e D+30 | >= 500 sessões D+14, >= 1.500 D+30 | Bruno |
| GA4 tempo médio na página | GA4 | D+14 | >= 4 min em peças 2.000-2.500 palavras | Bruno |
| GA4 scroll >= 80% | Custom event `peca_hbr_lida_completamente` | D+14 | >= 25% das sessões | Bruno |
| GA4 taxa de saída | GA4 | D+14 | <= 70% | Bruno |
| Conversões CTA (`cta_mba_clicado`) | GA4 | D+14 e D+30 | >= 8% em peças âncora; >= 5% em peças amplas | Bruno |
| Conversões matrícula (atribuição LLM) | GA4 + CRM IPOG | D+30 | KPI 7 lift >= 1.3 em ChatGPT, Claude, Perplexity | Bruno |
| Backlinks novos | NAIA categoria J + Ahrefs spot-check | D+30 | >= 2 backlinks tier 1 (Wikipedia, mídia educacional) | Brasil GEO |
| Citações em mídia | Clipping editorial manual + Brand24 | D+30 | >= 1 citação em fonte educacional reconhecida | Bruno |
| Atualização KPI Dashboard seção 9 | Hook pós-deploy + revisão D+18 | D+0, D+14, D+30 | Linha por peça com Delta KPI 8 calculado | Alexandre |

### J.2 Delta KPI 8 (pré/pós onda)

Calculado conforme `dashboards/METRICAS-CANONICAS.md` KPI 8: janela 14 dias antes do início da onda vs. janela 14 dias após o final da onda. Variáveis observadas: KPI 1 (Mention Rate), KPI 2 (SoV), KPI 3 (Citation Quality), KPI 4 (Schema Coverage). Targets canônicos da Fase 4: Delta Mention Rate >= +5 pp por onda; Delta SoV no cluster atacado >= +3 pp; Delta Citation Quality >= +5 pontos; Delta Schema Coverage >= +2 pontos.

Para a Fase 2 (Bloco H do `06-editorial-strategy.md`), o registro de Delta por peça vai em `dashboards/KPI-DASHBOARD.md` seção 9 com flag de aprovação/reprovação contra a meta da Fase 4.

### J.3 Lições aprendidas (ritual D+18)

Documento curto de 200-400 palavras por peça, registrado em `audits/publicacao/<slug>/licoes-aprendidas.md`, respondendo:

1. O Voice Guard pegou algum match em deny-list que demandou reescrita antes do publish?
2. Qual prompt-âncora teve maior uplift e qual teve menor?
3. Qual subdimensão do Citation Quality Score subiu e qual ficou estagnada?
4. Que decisão editorial deve mudar na próxima peça da leva?

A pergunta 4 alimenta a leva 2 da Fase 3.

---

## Bloco K — Anti-padrões editoriais

Lista canônica de anti-padrões observados em auditoria de concorrentes (Anhembi, Estácio, UNINTER) e lições internas. Cada item é bloqueio ou red flag explícita no checklist.

1. **Voice Guard < 70.** Publicação proibida; reescrita estrutural obrigatória.
2. **Schema sem `author` Person.** Peça assinada por `Organization` perde sinal de autoridade autoral; LLMs com tool use não cruzam Lattes/ORCID.
3. **`Person` sem Lattes + ORCID.** Reduz Citation Quality Score; LLMs descontam autoridade quando `sameAs` não inclui base acadêmica brasileira.
4. **Frontmatter incompleto.** Bloqueia CI (camada `frontmatter_validator.py`); 18 campos obrigatórios.
5. **Sem cross-link MBA.** Quebra cadeia GEO `Article` → `EducationalOccupationalProgram`. Bloqueio crítico.
6. **Claim regulatório não revisado.** Reconhecimento MEC, registro CFP ou instrumento SATEPSI sem ata jurídica documentada bloqueia publicação.
7. **Autoria genérica (`equipe IPOG`, `redação`).** Voice Guard rebaixa naming + autoridade. Toda peça pública é assinada por humano nominal.
8. **Alt sem semântica (`hero.jpg`, `image1`).** Falha NAIA categoria H; alt deve descrever conteúdo da imagem em texto curto.
9. **CTA genérico (`saiba mais`, `clique aqui`).** Conforme `content/CHECKLIST-PUBLICACAO.md` camada 3, âncoras devem ser descritivas.
10. **Métrica D+14 não coletada.** Quebra cadência KPI 1, KPI 3, KPI 8. Hook D+14 (`cron-pos-publish-d14.yml`) é mandatório.
11. **Peça fora do KPI Dashboard seção 9.** Toda peça publicada vira linha no dashboard com URL canônica, autor, cluster, prompts-âncora e timestamps.
12. **Naming proibido em quote ou referência (`GEO Brasil`, `Ipog`, `Especialista #1`).** Bloqueio crítico Voice Guard.
13. **Marcador `[a confirmar]` residual em peça publicada.** Bloqueio camada 1 do `CHECKLIST-PUBLICACAO.md`.
14. **Tabela ausente.** Bloqueio crítico Voice Guard dimensão HBR.
15. **Citação sem fonte na abertura.** Bloqueio crítico Voice Guard.
16. **Acentuação PT-BR incompleta (`nao`, `voce`, `tambem`).** Camada 1 do checklist; auto-fix permitido.
17. **Referência cruzada à Anhembi com Schema `Course` cross-domínio.** Concorrente é citado em texto e referência sem Schema.
18. **UTM padrão sem `utm_content` da peça.** Quebra atribuição por peça individual no GA4.

---

## Bloco L — CI/CD editorial

Dois workflows GitHub Actions canônicos: `ci-editorial.yml` (PR gate) e `cron-pos-publish-d14.yml` (coleta cross-LLM 14 dias após publish).

### L.1 `ci-editorial.yml` — PR gate

```yaml
name: ci-editorial
on:
  pull_request:
    paths: ['content/peças-hbr/**.md', 'content/autores/**.yaml']

jobs:
  editorial-gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: actions/setup-python@v5
        with: { python-version: '3.12' }
      - run: pip install -e ../geo-platform[voice-guard] && pip install -e scripts/editorial
      - id: diff
        run: echo "files=$(git diff --name-only origin/${{ github.base_ref }} -- 'content/peças-hbr/*.md' | tr '\n' ' ')" >> $GITHUB_OUTPUT
      - name: Gate (frontmatter + voice-guard + schema + Lattes/ORCID online)
        run: |
          for f in ${{ steps.diff.outputs.files }}; do
            python -m scripts.editorial.frontmatter_validator "$f"
            python -m voice_guard.cli check --file "$f" --min-score 70 --report-format md >> editorial-report.md
            python -m scripts.editorial.schema_injection --file "$f" --validate
          done
          python -m scripts.editorial.frontmatter_validator --check-authors-online ${{ steps.diff.outputs.files }}
      - run: python -m scripts.editorial.geo_editorial preview-build --output _preview/
      - uses: actions/upload-artifact@v4
        with: { name: preview, path: _preview/ }
      - uses: actions/github-script@v7
        if: always()
        with:
          script: |
            const fs = require('fs');
            const body = fs.readFileSync('editorial-report.md', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner, repo: context.repo.repo, body
            });
```

### L.2 `cron-pos-publish-d14.yml` — coleta D+14

```yaml
name: cron-pos-publish-d14
on:
  schedule: [{ cron: '0 9 * * *' }]  # 09h UTC = 06h BRT
  workflow_dispatch:

jobs:
  d14-collect:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.12' }
      - run: pip install -e scripts/editorial
      - run: python -m scripts.editorial.geo_editorial list-d14 --output pieces.json
      - name: Coleta cross-LLM (6 cohort)
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          GOOGLE_API_KEY: ${{ secrets.GOOGLE_API_KEY }}
          PERPLEXITY_API_KEY: ${{ secrets.PERPLEXITY_API_KEY }}
          XAI_API_KEY: ${{ secrets.XAI_API_KEY }}
          AZURE_COPILOT_KEY: ${{ secrets.AZURE_COPILOT_KEY }}
        run: python -m scripts.editorial.geo_editorial collect-d14 --input pieces.json --output coletas/
      - run: python -m scripts.editorial.geo_editorial delta-kpi8 --input coletas/ --output delta.json
      - run: python -m scripts.editorial.geo_editorial update-dashboard --input delta.json
      - uses: peter-evans/create-pull-request@v6
        with:
          title: "[D+14] Atualização Delta KPI 8 — peças publicadas"
          branch: cron/d14-update
          base: main
```

---

## Bloco M — Roadmap 30 dias até Peça 1 de Alexandre (M08, 02-06-2026)

Cronograma D-30 a D-Day, contado a partir de 03-05-2026. Cada marco é um milestone GitHub com issues vinculadas.

| Dia | Marco | Owner | Saída |
|---|---|---|---|
| D-30 (03-05) | Aprovação ADR-006 ratificada e estrutura de pastas criada | Alexandre | `content/peças-hbr/`, `content/autores/`, `scripts/editorial/`, `.github/workflows/` |
| D-29 (04-05) | Issues GitHub abertas para 7 peças + CLI + workflows | Alexandre | Milestone `fase-2-leva-1` com 25+ issues |
| D-28 a D-25 (05-08-05) | CLI `geo-editorial` com 4 comandos (`new`, `validate`, `preview`, `publish`) | Brasil GEO + sub-agent Opus | `scripts/editorial/geo_editorial.py` testado |
| D-25 a D-22 (08-11-05) | `frontmatter_validator.py` + `schema_injection.py` em produção | Brasil GEO | Scripts versionados; testes pytest |
| D-22 a D-19 (11-14-05) | Integração Voice Guard + Schema no `ci-editorial.yml` | Brasil GEO | PR rodando o gate completo |
| D-19 a D-17 (14-16-05) | Perfil canônico `content/autores/alexandre-caramaschi.yaml` com Lattes + ORCID + LinkedIn validados | Alexandre + Bruno | YAML + Schema `Person` cross-validado |
| D-17 a D-15 (16-18-05) | GA4: UTM dedicada + custom events `peca_hbr_lida_completamente` e `cta_mba_clicado` em GTM | Bruno + Brasil GEO | Eventos visíveis no Realtime |
| D-15 (18-05) | Decisão sobre Cloudflare Worker classificador (sim/não) | Alexandre | ADR auxiliar registrada |
| D-14 a D-11 (19-22-05) | Rascunho da Peça 1 concluído (Alexandre) | Alexandre | Markdown com 6 elementos HBR e Voice Guard >= 70 local |
| D-11 a D-8 (22-25-05) | Smoke test do pipeline completo com peça-piloto fictícia | Brasil GEO | Pipeline end-to-end validado |
| D-8 (25-05) | Pre-Voice Guard manual da Peça 1 (Alexandre) | Alexandre | Score >= 70 confirmado |
| D-7 (26-05) | PR aberto com Peça 1 | Alexandre | PR #N |
| D-6 (27-05) | Voice Guard CI + Schema validation | Pipeline | Status check verde |
| D-5 (28-05) | Bruno revisa institucional | Bruno | Aprovação ou diff |
| D-3 a D-1 (30-05 a 01-06) | Última calibração + preview Vercel + publish staging | Alexandre + Bruno | Staging fechado |
| D-Day (02-06) | Publicação 9h-11h BRT | Pipeline + TI IPOG | Peça ao vivo em `ipog.edu.br/blog/categoria-mba-online-psicologia-naming-2026` |
| D+0 (02-06) | KPI Dashboard seção 9 atualizada | Hook pós-deploy | Linha registrada |
| D+14 (16-06) | Coleta cross-LLM D+14 da Peça 1 | Pipeline `cron-pos-publish-d14.yml` | Delta KPI 8 |
| D+18 (20-06) | Lições aprendidas Peça 1 | Alexandre + Bruno + editor | `audits/publicacao/categoria-mba-online-psicologia-naming-2026/licoes-aprendidas.md` |

Riscos críticos do roadmap:

1. **CLI atrasada (D-25 a D-22).** Mitigação: sub-agent Opus dedicado com prompt fonte deste documento; lote único de 3 dias.
2. **Lattes/ORCID de Alexandre não públicos.** Mitigação: validação em D-19; se ORCID não emitido, registrar em https://orcid.org/register (tempo: 15 min) e atualizar perfil.
3. **GA4 custom events bloqueados por TI IPOG.** Mitigação: GTM em conta Brasil GEO com container injetado em `ipog.edu.br/blog/*` (negociado D-15 com Bruno).
4. **Voice Guard reprova Peça 1 em D-7.** Mitigação: pre-Voice Guard manual em D-8; ciclo de reescrita de 1 dia útil; janela 9h-11h BRT preservada com folga.
5. **Smoke test de pipeline falha em D-11.** Mitigação: peça-piloto fictícia descartável; problema isolado entre D-11 e D-8 sem comprometer Peça 1.

---

## Apêndice — Cross-references canônicas

- `content/PADRAO-EDITORIAL.md` — 6 elementos HBR; alimenta Bloco F (Schema) e Bloco K (anti-padrões).
- `content/VOICE-GUIDE.md` — 4 dimensões ponderadas + bloqueios críticos; alimenta Bloco D (CLI), Bloco L (CI), Bloco K.
- `content/CHECKLIST-PUBLICACAO.md` — 5 camadas + compliance MEC/CFP; alimenta Bloco I (workflow revisão).
- `docs/board-report/06-editorial-strategy.md` — Bloco H (medição D+14), Anexo A (quadro consolidado); alimenta Bloco J e Bloco M.
- `docs/tech-stack/01-solution-architecture.md` — ADR-006; alimenta Bloco A.
- `docs/tech-stack/03-schema-llms-txt-engineer.md` — B.5 Article, B.6 Person, B.7 `@graph`; alimenta Bloco F.
- `docs/tech-stack/06-naia-voice-guard.md` — Bloco G (4 dimensões em código), Bloco I (CI hooks); alimenta Bloco D e Bloco L.
- `dashboards/METRICAS-CANONICAS.md` — KPI 1, 3, 7, 8; alimenta Bloco G (GA4) e Bloco J.
- `dashboards/KPI-DASHBOARD.md` — Seção 9 (peças publicadas); alimenta Bloco E etapa 7 e Bloco J.

O sistema editorial é **derivado** dos documentos canônicos, não independente. Mudanças em `PADRAO-EDITORIAL`, `VOICE-GUIDE` ou `CHECKLIST-PUBLICACAO` propagam automaticamente via Voice Guard CI e `frontmatter_validator.py`. Reavaliação ADR-006 em 2027.1 com gatilhos quantitativos explícitos (Bloco A).
