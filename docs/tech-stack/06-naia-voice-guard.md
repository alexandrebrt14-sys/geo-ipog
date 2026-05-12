# NAIA Audit Engine + Voice Guard Service — Especificação de Engenharia

> **Reframe canônico 12-05-2026:** NAIA Audit Engine + Voice Guard validam o portfólio amplo de pós-graduação em Psicologia em 5 modalidades canônicas (`dashboards/METRICAS-CANONICAS.md` Cláusula 0). Os checks de `EducationalOccupationalProgram` (categoria B) agora reconhecem `programType` em qualquer dos 4 valores canônicos: `"Specialization"`, `"MBA"`, `"MastersProgram"`, `"ClinicalCertification"`. O check anterior que validava apenas `programType: "MBA"` foi generalizado para "programa declara um `programType` da lista canônica e o valor é coerente com a modalidade da página". O dicionário do Voice Guard mantém naming "MBA Online de Psicologia" para a modalidade b e adiciona naming canônico para as outras 4 modalidades.

> **Documento:** 06 — Especificação dos quality gates programáticos do programa GEO IPOG.
> **Cliente:** IPOG (Instituto de Pós-Graduação e Graduação, Goiânia, fundado 2001).
> **Sponsor executivo:** Ronan Maia (CEO IPOG).
> **Interlocutor operacional:** Bruno Azambuja (Gerente de Marketing IPOG).
> **Executor:** Brasil GEO — Alexandre Caramaschi (CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil).
> **Janela:** Schema piloto em produção em 30-05-2026 (M06); Voice Guard pronto até 02-06-2026 para validar Peça 1 HBR (M08).
> **Repositório-alvo:** `geo-platform/` (monorepo Python 3.12+).
> **Data:** 2026-05-01.
> **Cross-links obrigatórios:** `audits/PLAYBOOK-AUDITORIA-NAIA.md`, `audits/SCHEMA-PATTERNS.md`, `audits/LLMS-TXT-TEMPLATE.md`, `audits/ROBOTS-SITEMAP-CHECKLIST.md`, `content/VOICE-GUIDE.md`, `content/CLICHES-PROIBIDOS.md`, `content/BLOOM-KNOWLES.md`, `content/ACENTUACAO-PT-BR.md`, `content/GLOSSARIO-PSICOLOGIA.md`, `content/PADRAO-EDITORIAL.md`, `content/CHECKLIST-PUBLICACAO.md`, `docs/tech-stack/01-solution-architecture.md`, `docs/tech-stack/02-data-engineering.md`.

Este dossiê especifica, em nível de engenharia executável, dois serviços do `geo-platform` que automatizam quality gates hoje executados manualmente: o **NAIA Audit Engine**, que transforma os 100+ checks `NAIA-XXX` do `audits/PLAYBOOK-AUDITORIA-NAIA.md` em código Python rodável contra `ipog.edu.br` e contra concorrentes, e o **Voice Guard Service**, que materializa as quatro dimensões editoriais do `content/VOICE-GUIDE.md` em score 0–100 com gate de publicação. Ambos são containers em Python 3.12+ com pydantic v2, alinhados às ADRs do `docs/tech-stack/01-solution-architecture.md` e ao schema `fct_schema_audit` do `docs/tech-stack/02-data-engineering.md`. A entrega cobre arquitetura, API interna, mapa exaustivo de checks, snippets executáveis para pelo menos 30 checks NAIA, geração automática de issues no GitHub, auditoria competitiva, score editorial ponderado, auto-correção determinística, testes e CI/CD. O documento serve como input direto para implementação por sub-agents Opus em paralelo.

---

# Parte 1 — NAIA Audit Engine

## Bloco A — Mapa de checks NAIA por categoria

A bateria canônica do `audits/PLAYBOOK-AUDITORIA-NAIA.md` distribui 100+ checks `NAIA-XXX` em dez categorias rotuladas de A a J, com ranges numéricos disjuntos e severidade dominante explícita. O quadro abaixo é a fonte de verdade para o mapeamento código → playbook. Toda execução do NAIA Audit Engine produz cobertura agregada por categoria, e cada falha P0/P1 é tipada pela letra para roteamento de issue (label `categoria-A` etc.).

### A.1 Quadro consolidado das dez categorias

| Letra | Tema | Range canônico | Quantidade vigente | Severidade dominante | Owner técnico do conserto |
|---|---|---|---|---|---|
| A | Schema institucional (`EducationalOrganization`) | NAIA-001 a NAIA-010 | 10 checks | P0 e P1 | TI IPOG (deploy) + Brasil GEO (geração) |
| B | Schema de curso (`Course` + `EducationalOccupationalProgram`) | NAIA-020 a NAIA-033 | 14 checks | P0 e P1 | TI IPOG + Brasil GEO |
| C | Schema de FAQ e blog (`FAQPage`, `Article`, `BlogPosting`) | NAIA-040 a NAIA-050 | 11 checks | P0 e P1 | Brasil GEO (publishers) |
| D | Schema de pessoas (`Person` corpo docente Lattes/ORCID) | NAIA-060 a NAIA-068 | 9 checks | P0 e P1 | Brasil GEO + Coordenação acadêmica IPOG |
| E | `llms.txt` e sinais para crawlers de IA | NAIA-080 a NAIA-088 | 9 checks | P0 e P1 | Brasil GEO (gerador) + TI IPOG (deploy) |
| F | `robots.txt`, sitemap, redirects, canonicals | NAIA-100 a NAIA-110 | 11 checks | P0 dominante | TI IPOG |
| G | Conteúdo declarado e autoridade no hub e cursos | NAIA-120 a NAIA-133 | 14 checks | P0 e P1 | Brasil GEO (copy) + Coordenação acadêmica IPOG |
| H | Performance e fundamentos (CWV, HTTPS, headers) | NAIA-150 a NAIA-156 | 7 checks | P2 e P3 | TI IPOG |
| I | Citações cross-LLM (taxa de menção por LLM) | NAIA-170 a NAIA-180 | 11 checks | P0/P1 | Brasil GEO (entrega editorial) |
| J | Autoridade externa (Wikipedia, LinkedIn, e-MEC, fontes) | NAIA-200 a NAIA-204 | 5 checks | P0/P1 | Brasil GEO (PR/relacionamento) |

Total canônico declarado: **101 checks vigentes em 2026-05-01**, com janela de expansão no playbook para até 120 conforme novos sinais entrem (anexação de novos crawlers, ampliação de marcos regulatórios, novas plataformas de menção). A engine é projetada para checks plugáveis: cada arquivo em `naia/checks/category_*/` declara uma classe que herda de `NaiaCheck` e o registro automático ocorre via decorator. Adicionar um check novo é uma operação de PR sem impacto em outros módulos.

### A.2 Severidade e SLA herdado do playbook

| Severidade | Definição | SLA contratual | Comportamento da engine |
|---|---|---|---|
| P0 | Bloqueador. Impede LLMs de identificar IPOG ou contradiz fato canônico (modalidade errada, ausência de Schema, fato MEC errado). | 5 dias úteis | Abertura imediata de issue; gate de pre-deploy bloqueia merge em `audits/schema-implementations/`. |
| P1 | Alto impacto. Reduz qualidade da citação ou autoridade declarada. | 15 dias úteis | Abertura automática de issue; entra em milestone da onda corrente. |
| P2 | Médio impacto. Otimização de cobertura ou enriquecimento. | 30 dias úteis | Não abre issue automática; entra em backlog priorizado quinzenal. |
| P3 | Polimento. | Folga operacional | Apenas linha em relatório; sem issue automática. |

A engine permite elevar severidade default em runtime via flag `--escalate <NAIA-ID>:<P0|P1>` quando a auditoria operacional observa impacto cross-LLM maior que o esperado (especialmente em Perplexity, RAG-native).

---

## Bloco B — Arquitetura do NAIA Audit Engine

O NAIA Audit Engine é um container Python 3.12+ stateless. Recebe URL ou conjunto de URLs, dispara fetcher concorrente, parser de JSON-LD, executor de checks com isolamento por categoria e sink de persistência que grava em `fct_schema_audit` (D1/Postgres conforme ADR-005 do `docs/tech-stack/02-data-engineering.md`). Output: JSON estruturado, Markdown legível e payload para criação de issues via GitHub API. Modos: spot quinzenal (P0/P1, ~12 minutos) e completa mensal (todas as severidades + amostragem de 30 páginas, ~2 horas).

### B.1 Diagrama de pipeline

```
+---------------------------------------------------+
|  Input                                            |
|  - URL única ou conjunto                          |
|  - Modo (spot-p0p1 | full | competitor)           |
|  - Escopo (hub | curso | docente | full-site)     |
+-------------------+-------------------------------+
                    |
                    v
+---------------------------------------------------+
|  Fetcher (httpx async + retry tenacity)           |
|  - HEAD + GET com User-Agent canônico             |
|  - Render headless (playwright) só se JS-heavy    |
|  - Cache SHA-256 de resposta (24h TTL)            |
+-------------------+-------------------------------+
                    |
                    v
+---------------------------------------------------+
|  Parser                                           |
|  - selectolax (HTML)                              |
|  - extruct (JSON-LD/microdata/RDFa)               |
|  - pyld (validação JSON-LD canônica)              |
|  - parsers dedicados: robots.txt, sitemap.xml,    |
|    llms.txt                                       |
+-------------------+-------------------------------+
                    |
                    v
+---------------------------------------------------+
|  Check Registry                                   |
|  - 101 checks NaiaCheck registrados via decorator |
|  - Filtro por categoria, severidade, page_type    |
|  - Execução paralela com asyncio.gather           |
+-------------------+-------------------------------+
                    |
                    v
+---------------------------------------------------+
|  Aggregator                                       |
|  - Schema Coverage Score (KPI 4)                  |
|  - Delta vs auditoria anterior                    |
|  - Lista priorizada de gaps                       |
+-------------------+-------------------------------+
                    |
        +-----------+-----------+-----------+
        |                       |           |
        v                       v           v
+--------------+      +-----------------+   +----------------+
| Sink: D1 /   |      | Sink: Markdown  |   | Sink: Issues   |
| Postgres     |      | audits/         |   | GitHub geo-ipog|
| fct_schema_  |      | relatorios/     |   | (P0/P1 only)   |
| audit        |      | NAIA-YYYY-MM.md |   |                |
+--------------+      +-----------------+   +----------------+
```

### B.2 Modos de operação

| Modo | Frequência | Escopo | SLA | Produz issue? |
|---|---|---|---|---|
| `spot-p0p1` | Quinzenal | Apenas checks P0 e P1; cobertura mínima (hub + 5 cursos amostrados + `/sobre` + `/corpo-docente` + `/llms.txt` + `/robots.txt`) | 4h | Sim, somente P0 ainda em aberto |
| `full` | Mensal | Todos os 101 checks; 30 cursos + 5 perfis docentes + 5 artigos blog amostrados | 2h | Sim, P0 e P1 |
| `competitor` | Mensal | Categorias A, B, E, F, J contra `data/concorrentes.yaml` (10 entidades) | 4h | Não (vai para `audits/benchmarking/matriz-tecnica-schema-seo.md`) |
| `pre-deploy` | Por PR de Schema | Categorias A, B, C, D somente; URL do branch staging | 5min | Não (gate via exit code não-zero) |

### B.3 Modelos pydantic v2

```python
from __future__ import annotations
from datetime import datetime
from enum import StrEnum
from typing import Literal
from pydantic import BaseModel, Field, HttpUrl

class Severity(StrEnum):
    P0 = "P0"
    P1 = "P1"
    P2 = "P2"
    P3 = "P3"

class CheckStatus(StrEnum):
    PASSED = "passed"
    FAILED = "failed"
    NOT_APPLICABLE = "not-applicable"
    INCONCLUSIVE = "inconclusive"

class PageType(StrEnum):
    HUB = "hub"
    INSTITUCIONAL = "institucional"
    CURSO = "curso"
    CORPO_DOCENTE = "corpo-docente"
    PERFIL_DOCENTE = "perfil-docente"
    ARTIGO = "artigo"
    FAQ = "faq"
    LLMS_TXT = "llms-txt"
    ROBOTS_TXT = "robots-txt"
    SITEMAP = "sitemap"

class PageContext(BaseModel):
    """Contexto fetched + parsed entregue a cada check."""
    url: HttpUrl
    page_type: PageType
    fetched_at: datetime
    http_status: int
    headers: dict[str, str]
    html: str | None = None
    jsonld_blocks: list[dict] = Field(default_factory=list)
    robots_txt: str | None = None
    sitemap_xml: str | None = None
    llms_txt: str | None = None

class CheckResult(BaseModel):
    naia_check_id: str  # ex.: "NAIA-001"
    naia_categoria: Literal["A","B","C","D","E","F","G","H","I","J"]
    status: CheckStatus
    severity: Severity
    page_url: HttpUrl
    page_type: PageType
    evidence: dict | None = None  # JSON-LD bruto, snippet HTML, etc.
    remediation_hint: str | None = None
    audited_at: datetime
```

### B.4 Output JSON estruturado canônico

```json
{
  "audit_id": "uuid-v7",
  "audit_date": "2026-05-15",
  "audit_type": "mensal-completa",
  "scope": {
    "domain": "ipog.edu.br",
    "pages_audited": 42,
    "checks_executed": 101
  },
  "schema_coverage_score": 78,
  "summary": {
    "P0_failed": 2,
    "P1_failed": 5,
    "P2_failed": 7,
    "P3_failed": 3,
    "passed": 84
  },
  "results": [
    {"naia_check_id": "NAIA-001", "status": "passed", "page_url": "https://ipog.edu.br/", "..." : "..."}
  ],
  "issues_to_open": [
    {"naia_check_id": "NAIA-024", "severity": "P0", "title": "...", "labels": [...]}
  ],
  "delta_vs_previous": {
    "P0_closed": 1,
    "P0_opened": 0,
    "P0_recurring": 1
  }
}
```

---

## Bloco C — Implementação dos 30+ checks executáveis

A estrutura `naia/checks/` agrupa checks por letra de categoria. Cada classe herda de `NaiaCheck`, declara metadados como atributos de classe e implementa `async def run(self, page: PageContext) -> CheckResult`. O decorator `@register_check` adiciona ao registro central. As implementações abaixo cobrem **34 checks** distribuídos pelas categorias A, B, C, D, E, F prioritárias para o piloto M06.

### C.1 Base abstrata e registry

```python
# naia/types.py
from abc import ABC, abstractmethod
from datetime import datetime, UTC
from typing import ClassVar
from naia.models import CheckResult, CheckStatus, PageContext, Severity

_REGISTRY: dict[str, type["NaiaCheck"]] = {}

def register_check(cls: type["NaiaCheck"]) -> type["NaiaCheck"]:
    if cls.id in _REGISTRY:
        raise ValueError(f"Check duplicado: {cls.id}")
    _REGISTRY[cls.id] = cls
    return cls

def get_registry() -> dict[str, type["NaiaCheck"]]:
    return dict(_REGISTRY)

class NaiaCheck(ABC):
    id: ClassVar[str]
    severity: ClassVar[Severity]
    category: ClassVar[str]
    description: ClassVar[str]
    applies_to: ClassVar[set[str]]  # PageType values

    @abstractmethod
    async def run(self, page: PageContext) -> CheckResult: ...

    def _result(self, page: PageContext, status: CheckStatus,
                evidence: dict | None = None,
                remediation_hint: str | None = None) -> CheckResult:
        return CheckResult(
            naia_check_id=self.id,
            naia_categoria=self.category,
            status=status,
            severity=self.severity,
            page_url=page.url,
            page_type=page.page_type,
            evidence=evidence,
            remediation_hint=remediation_hint,
            audited_at=datetime.now(UTC),
        )
```

### C.2 Categoria A — Schema institucional (NAIA-001 a NAIA-010)

```python
# naia/checks/category_a/institutional.py
from naia.types import NaiaCheck, register_check
from naia.models import CheckStatus, PageContext, Severity, PageType

def _find_jsonld(page: PageContext, schema_type: str) -> dict | None:
    """Encontra primeiro bloco JSON-LD com @type igual a schema_type."""
    for block in page.jsonld_blocks:
        t = block.get("@type")
        if t == schema_type:
            return block
        if isinstance(t, list) and schema_type in t:
            return block
    return None

@register_check
class NAIA001_EducationalOrgPresent(NaiaCheck):
    id = "NAIA-001"
    severity = Severity.P0
    category = "A"
    description = "EducationalOrganization presente em /"
    applies_to = {PageType.HUB, PageType.INSTITUCIONAL}

    async def run(self, page: PageContext) -> CheckResult:
        edu = _find_jsonld(page, "EducationalOrganization")
        if edu is None:
            return self._result(
                page, CheckStatus.FAILED,
                evidence={"jsonld_types_found": [b.get("@type") for b in page.jsonld_blocks]},
                remediation_hint="Adicionar bloco JSON-LD EducationalOrganization conforme audits/SCHEMA-PATTERNS.md secao 1.",
            )
        return self._result(page, CheckStatus.PASSED, evidence={"@id": edu.get("@id")})

@register_check
class NAIA002_LegalNamePresent(NaiaCheck):
    id = "NAIA-002"
    severity = Severity.P1
    category = "A"
    description = "EducationalOrganization tem legalName declarado"
    applies_to = {PageType.HUB, PageType.INSTITUCIONAL}

    async def run(self, page: PageContext) -> CheckResult:
        edu = _find_jsonld(page, "EducationalOrganization")
        if edu is None:
            return self._result(page, CheckStatus.NOT_APPLICABLE)
        legal_name = edu.get("legalName")
        if not legal_name:
            return self._result(
                page, CheckStatus.FAILED,
                remediation_hint='Adicionar "legalName": "Instituto de Pos-Graduacao e Graduacao".',
            )
        return self._result(page, CheckStatus.PASSED, evidence={"legalName": legal_name})

@register_check
class NAIA003_FoundingDatePresent(NaiaCheck):
    id = "NAIA-003"
    severity = Severity.P1
    category = "A"
    description = "EducationalOrganization tem foundingDate declarado"
    applies_to = {PageType.HUB, PageType.INSTITUCIONAL}

    async def run(self, page: PageContext) -> CheckResult:
        edu = _find_jsonld(page, "EducationalOrganization")
        if edu is None:
            return self._result(page, CheckStatus.NOT_APPLICABLE)
        founding = edu.get("foundingDate")
        if not founding:
            return self._result(
                page, CheckStatus.FAILED,
                remediation_hint='Adicionar "foundingDate": "2001" (canonico).',
            )
        return self._result(page, CheckStatus.PASSED, evidence={"foundingDate": founding})

@register_check
class NAIA004_PostalAddressComplete(NaiaCheck):
    id = "NAIA-004"
    severity = Severity.P1
    category = "A"
    description = "EducationalOrganization tem PostalAddress completo"
    applies_to = {PageType.HUB, PageType.INSTITUCIONAL}

    async def run(self, page: PageContext) -> CheckResult:
        edu = _find_jsonld(page, "EducationalOrganization")
        if edu is None:
            return self._result(page, CheckStatus.NOT_APPLICABLE)
        addr = edu.get("address") or {}
        required = ("streetAddress", "addressLocality", "addressRegion", "postalCode", "addressCountry")
        missing = [k for k in required if not addr.get(k)]
        if missing:
            return self._result(
                page, CheckStatus.FAILED,
                evidence={"missing_fields": missing},
                remediation_hint=f"Completar PostalAddress: {missing}",
            )
        return self._result(page, CheckStatus.PASSED)

@register_check
class NAIA005_SameAsMinFour(NaiaCheck):
    id = "NAIA-005"
    severity = Severity.P1
    category = "A"
    description = "EducationalOrganization tem sameAs com minimo 4 perfis verificados"
    applies_to = {PageType.HUB, PageType.INSTITUCIONAL}

    async def run(self, page: PageContext) -> CheckResult:
        edu = _find_jsonld(page, "EducationalOrganization")
        if edu is None:
            return self._result(page, CheckStatus.NOT_APPLICABLE)
        same_as = edu.get("sameAs") or []
        if not isinstance(same_as, list) or len(same_as) < 4:
            return self._result(
                page, CheckStatus.FAILED,
                evidence={"sameAs_count": len(same_as) if isinstance(same_as, list) else 0},
                remediation_hint="Incluir Wikipedia, LinkedIn Company, e-MEC e Instagram verificado.",
            )
        return self._result(page, CheckStatus.PASSED, evidence={"sameAs_count": len(same_as)})

@register_check
class NAIA006_AccreditationMEC(NaiaCheck):
    id = "NAIA-006"
    severity = Severity.P0
    category = "A"
    description = "EducationalOrganization tem accreditation mencionando e-MEC"
    applies_to = {PageType.HUB, PageType.INSTITUCIONAL}

    async def run(self, page: PageContext) -> CheckResult:
        edu = _find_jsonld(page, "EducationalOrganization")
        if edu is None:
            return self._result(page, CheckStatus.NOT_APPLICABLE)
        accred = edu.get("accreditation")
        if not accred:
            return self._result(
                page, CheckStatus.FAILED,
                remediation_hint="Adicionar accreditation com referencia ao e-MEC (numero de credenciamento).",
            )
        body = str(accred).lower() if not isinstance(accred, dict) else \
               str(accred.get("name", "") + " " + accred.get("description", "")).lower()
        if "mec" not in body and "e-mec" not in body:
            return self._result(page, CheckStatus.FAILED, evidence={"accreditation": accred})
        return self._result(page, CheckStatus.PASSED, evidence={"accreditation": accred})

@register_check
class NAIA009_CanonicalAtId(NaiaCheck):
    id = "NAIA-009"
    severity = Severity.P1
    category = "A"
    description = "@id da organizacao e canonico e consistente em todas as paginas"
    applies_to = {PageType.HUB, PageType.INSTITUCIONAL, PageType.CURSO, PageType.PERFIL_DOCENTE, PageType.ARTIGO}

    CANONICAL_ID = "https://ipog.edu.br/#organization"

    async def run(self, page: PageContext) -> CheckResult:
        edu = _find_jsonld(page, "EducationalOrganization")
        if edu is None:
            # Em paginas nao-institucionais EducationalOrganization aparece como provider/publisher; OK ausentar.
            return self._result(page, CheckStatus.NOT_APPLICABLE)
        at_id = edu.get("@id")
        if at_id != self.CANONICAL_ID:
            return self._result(
                page, CheckStatus.FAILED,
                evidence={"@id_found": at_id, "@id_expected": self.CANONICAL_ID},
            )
        return self._result(page, CheckStatus.PASSED)

@register_check
class NAIA010_ProviderRefInCourse(NaiaCheck):
    id = "NAIA-010"
    severity = Severity.P0
    category = "A"
    description = "EducationalOrganization aparece referenciada como provider em cada Course"
    applies_to = {PageType.CURSO}

    async def run(self, page: PageContext) -> CheckResult:
        course = _find_jsonld(page, "Course")
        if course is None:
            return self._result(page, CheckStatus.NOT_APPLICABLE)
        provider = course.get("provider") or {}
        provider_id = provider.get("@id") if isinstance(provider, dict) else None
        if provider_id != "https://ipog.edu.br/#organization":
            return self._result(
                page, CheckStatus.FAILED,
                evidence={"provider": provider},
                remediation_hint='Adicionar "provider": {"@id": "https://ipog.edu.br/#organization"}.',
            )
        return self._result(page, CheckStatus.PASSED)
```

### C.3 Categoria B — Schema de curso (NAIA-020 a NAIA-033)

```python
# naia/checks/category_b/course.py
import re
from naia.types import NaiaCheck, register_check
from naia.models import CheckStatus, PageContext, Severity, PageType
from naia.checks.category_a.institutional import _find_jsonld

ISO8601_DURATION = re.compile(r"^P(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(\d+H)?(\d+M)?(\d+S)?)?$")

@register_check
class NAIA020_CoursePresent(NaiaCheck):
    id = "NAIA-020"
    severity = Severity.P0
    category = "B"
    description = "Course presente em cada pagina de curso individual"
    applies_to = {PageType.CURSO}

    async def run(self, page: PageContext) -> CheckResult:
        course = _find_jsonld(page, "Course")
        if course is None:
            return self._result(
                page, CheckStatus.FAILED,
                remediation_hint="Aplicar template Course de audits/SCHEMA-PATTERNS.md secao 2.",
            )
        return self._result(page, CheckStatus.PASSED)

@register_check
class NAIA021_CourseNameMatchesH1(NaiaCheck):
    id = "NAIA-021"
    severity = Severity.P1
    category = "B"
    description = "Course tem name exato igual ao H1 da pagina"
    applies_to = {PageType.CURSO}

    async def run(self, page: PageContext) -> CheckResult:
        course = _find_jsonld(page, "Course")
        if course is None:
            return self._result(page, CheckStatus.NOT_APPLICABLE)
        from selectolax.parser import HTMLParser
        h1 = HTMLParser(page.html or "").css_first("h1")
        h1_text = h1.text(strip=True) if h1 else ""
        course_name = course.get("name", "")
        if h1_text != course_name:
            return self._result(
                page, CheckStatus.FAILED,
                evidence={"h1": h1_text, "course_name": course_name},
            )
        return self._result(page, CheckStatus.PASSED)

@register_check
class NAIA022_CourseDescriptionMin160(NaiaCheck):
    id = "NAIA-022"
    severity = Severity.P1
    category = "B"
    description = "Course tem description com no minimo 160 caracteres"
    applies_to = {PageType.CURSO}

    async def run(self, page: PageContext) -> CheckResult:
        course = _find_jsonld(page, "Course")
        if course is None:
            return self._result(page, CheckStatus.NOT_APPLICABLE)
        desc = (course.get("description") or "").strip()
        if len(desc) < 160:
            return self._result(
                page, CheckStatus.FAILED,
                evidence={"description_length": len(desc)},
            )
        return self._result(page, CheckStatus.PASSED, evidence={"description_length": len(desc)})

@register_check
class NAIA024_CredentialMECLatoSensu(NaiaCheck):
    id = "NAIA-024"
    severity = Severity.P0
    category = "B"
    description = "Course tem educationalCredentialAwarded mencionando especializacao lato sensu reconhecida pelo MEC"
    applies_to = {PageType.CURSO}

    async def run(self, page: PageContext) -> CheckResult:
        course = _find_jsonld(page, "Course")
        if course is None:
            return self._result(page, CheckStatus.NOT_APPLICABLE)
        cred = course.get("educationalCredentialAwarded") or ""
        body = cred if isinstance(cred, str) else \
               (cred.get("name", "") + " " + cred.get("description", "") if isinstance(cred, dict) else "")
        body_lower = body.lower()
        ok = "lato sensu" in body_lower and ("mec" in body_lower or "e-mec" in body_lower)
        if not ok:
            return self._result(
                page, CheckStatus.FAILED,
                evidence={"educationalCredentialAwarded": cred},
                remediation_hint='Texto canonico: "Especializacao lato sensu reconhecida pelo MEC".',
            )
        return self._result(page, CheckStatus.PASSED)

@register_check
class NAIA025_TimeRequiredISO(NaiaCheck):
    id = "NAIA-025"
    severity = Severity.P1
    category = "B"
    description = "Course tem timeRequired em formato ISO 8601"
    applies_to = {PageType.CURSO}

    async def run(self, page: PageContext) -> CheckResult:
        course = _find_jsonld(page, "Course")
        if course is None:
            return self._result(page, CheckStatus.NOT_APPLICABLE)
        time_req = course.get("timeRequired", "")
        if not ISO8601_DURATION.match(time_req or ""):
            return self._result(
                page, CheckStatus.FAILED,
                evidence={"timeRequired": time_req},
                remediation_hint="Formato exemplo: P12M (12 meses) ou P18M (18 meses).",
            )
        return self._result(page, CheckStatus.PASSED)

@register_check
class NAIA026_CourseModeDeclared(NaiaCheck):
    id = "NAIA-026"
    severity = Severity.P1
    category = "B"
    description = "Course tem courseMode declarado"
    applies_to = {PageType.CURSO}

    VALID_MODES = {"online", "onsite", "blended", "fully online"}

    async def run(self, page: PageContext) -> CheckResult:
        course = _find_jsonld(page, "Course")
        if course is None:
            return self._result(page, CheckStatus.NOT_APPLICABLE)
        mode = (course.get("courseMode") or "").lower()
        if mode not in self.VALID_MODES:
            return self._result(
                page, CheckStatus.FAILED,
                evidence={"courseMode": mode},
            )
        return self._result(page, CheckStatus.PASSED)

@register_check
class NAIA029_OffersWithPriceAvailability(NaiaCheck):
    id = "NAIA-029"
    severity = Severity.P1
    category = "B"
    description = "Course tem offers Offer com price e availability"
    applies_to = {PageType.CURSO}

    async def run(self, page: PageContext) -> CheckResult:
        course = _find_jsonld(page, "Course")
        if course is None:
            return self._result(page, CheckStatus.NOT_APPLICABLE)
        offers = course.get("offers")
        if not offers:
            return self._result(page, CheckStatus.FAILED,
                remediation_hint="Adicionar offers Offer com price, priceCurrency e availability.")
        offer = offers[0] if isinstance(offers, list) else offers
        missing = [k for k in ("price", "priceCurrency", "availability") if not offer.get(k)]
        if missing:
            return self._result(
                page, CheckStatus.FAILED,
                evidence={"missing": missing, "offers": offers},
            )
        return self._result(page, CheckStatus.PASSED)

@register_check
class NAIA031_EduOccupationalProgramMBA(NaiaCheck):
    id = "NAIA-031"
    severity = Severity.P1
    category = "B"
    description = "EducationalOccupationalProgram presente quando programa e abrangente (MBA)"
    applies_to = {PageType.CURSO, PageType.HUB}

    async def run(self, page: PageContext) -> CheckResult:
        # Aplica-se quando H1 ou name contem "MBA"
        course = _find_jsonld(page, "Course") or {}
        name = (course.get("name") or "").lower()
        if "mba" not in name:
            return self._result(page, CheckStatus.NOT_APPLICABLE)
        program = _find_jsonld(page, "EducationalOccupationalProgram")
        if program is None:
            return self._result(
                page, CheckStatus.FAILED,
                remediation_hint="Adicionar EducationalOccupationalProgram conforme SCHEMA-PATTERNS secao 3.",
            )
        return self._result(page, CheckStatus.PASSED)

@register_check
class NAIA032_ProgramTypeMBA(NaiaCheck):
    id = "NAIA-032"
    severity = Severity.P2
    category = "B"
    description = "EducationalOccupationalProgram tem programType MBA quando aplicavel"
    applies_to = {PageType.CURSO}

    async def run(self, page: PageContext) -> CheckResult:
        program = _find_jsonld(page, "EducationalOccupationalProgram")
        if program is None:
            return self._result(page, CheckStatus.NOT_APPLICABLE)
        program_type = (program.get("programType") or "").upper()
        if program_type != "MBA":
            return self._result(
                page, CheckStatus.FAILED,
                evidence={"programType": program.get("programType")},
            )
        return self._result(page, CheckStatus.PASSED)
```

### C.4 Categoria C — FAQ e blog (NAIA-040 a NAIA-050)

```python
# naia/checks/category_c/faq_blog.py
from naia.types import NaiaCheck, register_check
from naia.models import CheckStatus, PageContext, Severity, PageType
from naia.checks.category_a.institutional import _find_jsonld

@register_check
class NAIA041_FAQMainEntityStructured(NaiaCheck):
    id = "NAIA-041"
    severity = Severity.P0
    category = "C"
    description = "FAQPage tem mainEntity Question/Answer estruturados"
    applies_to = {PageType.CURSO, PageType.FAQ}

    async def run(self, page: PageContext) -> CheckResult:
        faq = _find_jsonld(page, "FAQPage")
        if faq is None:
            return self._result(page, CheckStatus.NOT_APPLICABLE)
        main = faq.get("mainEntity") or []
        if not isinstance(main, list) or not main:
            return self._result(
                page, CheckStatus.FAILED,
                remediation_hint="mainEntity deve ser lista de Question com acceptedAnswer.",
            )
        for q in main:
            if q.get("@type") != "Question": return self._result(page, CheckStatus.FAILED)
            ans = q.get("acceptedAnswer") or {}
            if ans.get("@type") != "Answer" or not ans.get("text"):
                return self._result(page, CheckStatus.FAILED, evidence={"question": q})
        return self._result(page, CheckStatus.PASSED, evidence={"questions_count": len(main)})

@register_check
class NAIA044_ArticlePresent(NaiaCheck):
    id = "NAIA-044"
    severity = Severity.P0
    category = "C"
    description = "Article ou BlogPosting presente em cada peca de blog"
    applies_to = {PageType.ARTIGO}

    async def run(self, page: PageContext) -> CheckResult:
        article = _find_jsonld(page, "Article") or _find_jsonld(page, "BlogPosting")
        if article is None:
            return self._result(
                page, CheckStatus.FAILED,
                remediation_hint="Adicionar Schema Article conforme SCHEMA-PATTERNS secao 5.",
            )
        return self._result(page, CheckStatus.PASSED)

@register_check
class NAIA045_ArticleAuthorPerson(NaiaCheck):
    id = "NAIA-045"
    severity = Severity.P0
    category = "C"
    description = "Article tem author Person"
    applies_to = {PageType.ARTIGO}

    async def run(self, page: PageContext) -> CheckResult:
        article = _find_jsonld(page, "Article") or _find_jsonld(page, "BlogPosting")
        if article is None:
            return self._result(page, CheckStatus.NOT_APPLICABLE)
        author = article.get("author")
        if isinstance(author, list):
            author = author[0] if author else None
        if not author or (isinstance(author, dict) and author.get("@type") != "Person"):
            return self._result(
                page, CheckStatus.FAILED,
                evidence={"author": author},
                remediation_hint="author deve ser Person com name, sameAs (LinkedIn/Lattes/ORCID).",
            )
        return self._result(page, CheckStatus.PASSED)

@register_check
class NAIA047_DatePublishedAndModified(NaiaCheck):
    id = "NAIA-047"
    severity = Severity.P1
    category = "C"
    description = "Article tem datePublished e dateModified"
    applies_to = {PageType.ARTIGO}

    async def run(self, page: PageContext) -> CheckResult:
        article = _find_jsonld(page, "Article") or _find_jsonld(page, "BlogPosting")
        if article is None:
            return self._result(page, CheckStatus.NOT_APPLICABLE)
        missing = [k for k in ("datePublished", "dateModified") if not article.get(k)]
        if missing:
            return self._result(page, CheckStatus.FAILED, evidence={"missing": missing})
        return self._result(page, CheckStatus.PASSED)
```

### C.5 Categoria D — Pessoas/corpo docente (NAIA-060 a NAIA-068)

```python
# naia/checks/category_d/people.py
from naia.types import NaiaCheck, register_check
from naia.models import CheckStatus, PageContext, Severity, PageType
from naia.checks.category_a.institutional import _find_jsonld

LATTES_URL_PREFIX = "http://lattes.cnpq.br/"
ORCID_URL_PREFIX = "https://orcid.org/"
CRP_REGEX = r"\bCRP\s*\d{2}/\d{4,6}\b"

@register_check
class NAIA060_PersonPresent(NaiaCheck):
    id = "NAIA-060"
    severity = Severity.P0
    category = "D"
    description = "Person presente em cada perfil de docente"
    applies_to = {PageType.PERFIL_DOCENTE}

    async def run(self, page: PageContext) -> CheckResult:
        p = _find_jsonld(page, "Person")
        if p is None:
            return self._result(
                page, CheckStatus.FAILED,
                remediation_hint="Aplicar template Person de SCHEMA-PATTERNS secao 6.",
            )
        return self._result(page, CheckStatus.PASSED)

@register_check
class NAIA062_WorksForIPOG(NaiaCheck):
    id = "NAIA-062"
    severity = Severity.P0
    category = "D"
    description = "Person tem worksFor referenciando IPOG"
    applies_to = {PageType.PERFIL_DOCENTE}

    async def run(self, page: PageContext) -> CheckResult:
        p = _find_jsonld(page, "Person")
        if p is None:
            return self._result(page, CheckStatus.NOT_APPLICABLE)
        works_for = p.get("worksFor") or {}
        ref_id = works_for.get("@id") if isinstance(works_for, dict) else None
        if ref_id != "https://ipog.edu.br/#organization":
            return self._result(page, CheckStatus.FAILED, evidence={"worksFor": works_for})
        return self._result(page, CheckStatus.PASSED)

@register_check
class NAIA065_SameAsLattes(NaiaCheck):
    id = "NAIA-065"
    severity = Severity.P1
    category = "D"
    description = "Person tem sameAs com Lattes"
    applies_to = {PageType.PERFIL_DOCENTE}

    async def run(self, page: PageContext) -> CheckResult:
        p = _find_jsonld(page, "Person")
        if p is None:
            return self._result(page, CheckStatus.NOT_APPLICABLE)
        same_as = p.get("sameAs") or []
        has_lattes = any(s.startswith(LATTES_URL_PREFIX) for s in same_as if isinstance(s, str))
        if not has_lattes:
            return self._result(
                page, CheckStatus.FAILED,
                evidence={"sameAs": same_as},
                remediation_hint="Adicionar URL Lattes (http://lattes.cnpq.br/<id>) em sameAs.",
            )
        return self._result(page, CheckStatus.PASSED)

@register_check
class NAIA064_CRPCredential(NaiaCheck):
    id = "NAIA-064"
    severity = Severity.P0
    category = "D"
    description = "Person tem hasCredential listando registro CRP/CFP quando aplicavel"
    applies_to = {PageType.PERFIL_DOCENTE}

    async def run(self, page: PageContext) -> CheckResult:
        import re
        p = _find_jsonld(page, "Person")
        if p is None:
            return self._result(page, CheckStatus.NOT_APPLICABLE)
        # Heuristica: se jobTitle menciona "psicologo" / "neuropsicologo" exige CRP.
        job = (p.get("jobTitle") or "").lower()
        if "psicolog" not in job:
            return self._result(page, CheckStatus.NOT_APPLICABLE)
        creds = p.get("hasCredential") or []
        body = " ".join(
            (c if isinstance(c, str) else
             c.get("name", "") + " " + c.get("description", "")) for c in creds
        )
        if not re.search(CRP_REGEX, body, re.IGNORECASE):
            return self._result(
                page, CheckStatus.FAILED,
                remediation_hint='Incluir hasCredential com nome "CRP <UF>/<numero>".',
            )
        return self._result(page, CheckStatus.PASSED)
```

### C.6 Categoria E — `llms.txt` (NAIA-080 a NAIA-088)

```python
# naia/checks/category_e/llms_txt.py
import re
from naia.types import NaiaCheck, register_check
from naia.models import CheckStatus, PageContext, Severity, PageType

@register_check
class NAIA080_LlmsTxtExists(NaiaCheck):
    id = "NAIA-080"
    severity = Severity.P0
    category = "E"
    description = "/llms.txt existe e retorna 200"
    applies_to = {PageType.LLMS_TXT}

    async def run(self, page: PageContext) -> CheckResult:
        if page.http_status != 200:
            return self._result(
                page, CheckStatus.FAILED,
                evidence={"http_status": page.http_status},
                remediation_hint="Publicar /llms.txt seguindo audits/LLMS-TXT-TEMPLATE.md.",
            )
        if not page.llms_txt or not page.llms_txt.strip():
            return self._result(page, CheckStatus.FAILED, evidence={"empty": True})
        return self._result(page, CheckStatus.PASSED)

@register_check
class NAIA081_LlmsTxtSpec(NaiaCheck):
    id = "NAIA-081"
    severity = Severity.P1
    category = "E"
    description = "Llms.txt segue spec Anthropic (H1 com nome da organizacao + descricao curta)"
    applies_to = {PageType.LLMS_TXT}

    async def run(self, page: PageContext) -> CheckResult:
        body = page.llms_txt or ""
        m = re.match(r"^# (.+)\n+>\s*(.+)", body, re.MULTILINE)
        if not m:
            return self._result(
                page, CheckStatus.FAILED,
                remediation_hint="Primeira linha deve ser H1 com nome canonico; seguida de blockquote com descricao curta.",
            )
        h1 = m.group(1).strip()
        if "IPOG" not in h1:
            return self._result(page, CheckStatus.FAILED, evidence={"h1": h1})
        return self._result(page, CheckStatus.PASSED, evidence={"h1": h1})

@register_check
class NAIA082_LlmsHubPriority(NaiaCheck):
    id = "NAIA-082"
    severity = Severity.P0
    category = "E"
    description = "Llms.txt lista hub central como link prioritario"
    applies_to = {PageType.LLMS_TXT}

    HUB_URL = "https://ipog.edu.br/cursos/pos-graduacao"

    async def run(self, page: PageContext) -> CheckResult:
        body = page.llms_txt or ""
        if self.HUB_URL not in body:
            return self._result(
                page, CheckStatus.FAILED,
                remediation_hint=f"Adicionar link para {self.HUB_URL} na secao 'Conteudo prioritario'.",
            )
        return self._result(page, CheckStatus.PASSED)

@register_check
class NAIA083_LlmsPilarPagesMBA(NaiaCheck):
    id = "NAIA-083"
    severity = Severity.P1
    category = "E"
    description = "Llms.txt lista 5+ paginas-pilar do MBA Online de Psicologia"
    applies_to = {PageType.LLMS_TXT}

    async def run(self, page: PageContext) -> CheckResult:
        body = (page.llms_txt or "").lower()
        # heuristica: links em /cursos/pos-graduacao/<slug-psicologia*>
        links = re.findall(r"https://ipog\.edu\.br/cursos/pos-graduacao/[a-z0-9\-]+", body)
        psi_links = [l for l in links if any(k in l for k in
                     ("psicolog", "neuropsi", "psicopedag", "tcc", "avaliacao-psicolog", "saude-mental"))]
        if len(psi_links) < 5:
            return self._result(
                page, CheckStatus.FAILED,
                evidence={"psi_links_count": len(psi_links), "links_found": psi_links},
            )
        return self._result(page, CheckStatus.PASSED, evidence={"psi_links_count": len(psi_links)})

@register_check
class NAIA086_LlmsNoCliches(NaiaCheck):
    id = "NAIA-086"
    severity = Severity.P1
    category = "E"
    description = "Llms.txt declara posicionamento institucional sem cliches"
    applies_to = {PageType.LLMS_TXT}

    async def run(self, page: PageContext) -> CheckResult:
        # Cross-call ao Voice Guard (cliche dimension)
        from voice_guard.dimensions.cliche import scan_cliches
        hits = scan_cliches(page.llms_txt or "")
        if hits:
            return self._result(
                page, CheckStatus.FAILED,
                evidence={"cliches_found": hits},
                remediation_hint="Reescrever conforme content/CLICHES-PROIBIDOS.md.",
            )
        return self._result(page, CheckStatus.PASSED)
```

### C.7 Categoria F — robots, sitemap, redirects (NAIA-100 a NAIA-110)

```python
# naia/checks/category_f/robots_sitemap.py
import re
from naia.types import NaiaCheck, register_check
from naia.models import CheckStatus, PageContext, Severity, PageType

LLM_CRAWLERS_REQUIRED = {
    "GPTBot", "ClaudeBot", "Google-Extended", "PerplexityBot", "GoogleOther"
}

@register_check
class NAIA100_SitemapStatus(NaiaCheck):
    id = "NAIA-100"
    severity = Severity.P0
    category = "F"
    description = "Sitemap.xml retorna 200 e content-type application/xml"
    applies_to = {PageType.SITEMAP}

    async def run(self, page: PageContext) -> CheckResult:
        if page.http_status != 200:
            return self._result(page, CheckStatus.FAILED, evidence={"http_status": page.http_status})
        ct = page.headers.get("content-type", "").lower()
        if "xml" not in ct:
            return self._result(page, CheckStatus.FAILED, evidence={"content-type": ct})
        return self._result(page, CheckStatus.PASSED)

@register_check
class NAIA105_RobotsStatus(NaiaCheck):
    id = "NAIA-105"
    severity = Severity.P0
    category = "F"
    description = "Robots.txt retorna 200 e content-type text/plain"
    applies_to = {PageType.ROBOTS_TXT}

    async def run(self, page: PageContext) -> CheckResult:
        if page.http_status != 200:
            return self._result(page, CheckStatus.FAILED, evidence={"http_status": page.http_status})
        ct = page.headers.get("content-type", "").lower()
        if "text/plain" not in ct:
            return self._result(page, CheckStatus.FAILED, evidence={"content-type": ct})
        return self._result(page, CheckStatus.PASSED)

@register_check
class NAIA106_AllowListLLMCrawlers(NaiaCheck):
    id = "NAIA-106"
    severity = Severity.P0
    category = "F"
    description = "Robots.txt tem allow-list explicita para crawlers de LLM"
    applies_to = {PageType.ROBOTS_TXT}

    async def run(self, page: PageContext) -> CheckResult:
        body = page.robots_txt or ""
        present = {ua for ua in LLM_CRAWLERS_REQUIRED if re.search(rf"User-agent:\s*{re.escape(ua)}", body, re.IGNORECASE)}
        missing = LLM_CRAWLERS_REQUIRED - present
        if missing:
            return self._result(
                page, CheckStatus.FAILED,
                evidence={"missing_user_agents": sorted(missing)},
                remediation_hint="Adicionar bloco User-agent + Allow para cada crawler ausente.",
            )
        return self._result(page, CheckStatus.PASSED)

@register_check
class NAIA107_RobotsHasSitemap(NaiaCheck):
    id = "NAIA-107"
    severity = Severity.P0
    category = "F"
    description = "Robots.txt declara Sitemap: apontando para sitemap canonico"
    applies_to = {PageType.ROBOTS_TXT}

    async def run(self, page: PageContext) -> CheckResult:
        body = page.robots_txt or ""
        m = re.search(r"^Sitemap:\s*(\S+)", body, re.IGNORECASE | re.MULTILINE)
        if not m:
            return self._result(page, CheckStatus.FAILED)
        sitemap_url = m.group(1)
        if not sitemap_url.startswith("https://ipog.edu.br/"):
            return self._result(page, CheckStatus.FAILED, evidence={"sitemap_url": sitemap_url})
        return self._result(page, CheckStatus.PASSED, evidence={"sitemap_url": sitemap_url})

@register_check
class NAIA108_RobotsDoesntBlockCSSJS(NaiaCheck):
    id = "NAIA-108"
    severity = Severity.P1
    category = "F"
    description = "Robots.txt nao bloqueia globalmente CSS/JS"
    applies_to = {PageType.ROBOTS_TXT}

    async def run(self, page: PageContext) -> CheckResult:
        body = page.robots_txt or ""
        for line in body.splitlines():
            line_l = line.strip().lower()
            if line_l.startswith("disallow:") and any(p in line_l for p in ("*.css", "*.js", "/*.css$", "/*.js$")):
                return self._result(page, CheckStatus.FAILED, evidence={"line": line})
        return self._result(page, CheckStatus.PASSED)

@register_check
class NAIA109_CanonicalsPresent(NaiaCheck):
    id = "NAIA-109"
    severity = Severity.P0
    category = "F"
    description = "Canonicals presentes em cada pagina principal"
    applies_to = {PageType.HUB, PageType.INSTITUCIONAL, PageType.CURSO, PageType.PERFIL_DOCENTE, PageType.ARTIGO}

    async def run(self, page: PageContext) -> CheckResult:
        from selectolax.parser import HTMLParser
        link = HTMLParser(page.html or "").css_first('link[rel="canonical"]')
        if not link or not link.attributes.get("href"):
            return self._result(
                page, CheckStatus.FAILED,
                remediation_hint='Adicionar <link rel="canonical" href="..."> apontando para URL canonica.',
            )
        return self._result(page, CheckStatus.PASSED, evidence={"canonical": link.attributes["href"]})
```

Os 30+ checks acima cobrem o caminho crítico do piloto M06. As categorias H (performance), I (cross-LLM) e J (autoridade externa) seguem o mesmo padrão e são implementadas em ondas posteriores conforme `06-marcos-criticos-2026.md`. A engine carrega via `importlib.import_module` todos os módulos sob `naia.checks.*`, registrando os subclasses `NaiaCheck` automaticamente.

---

## Bloco D — Schema Coverage Score (KPI 4)

O KPI 4 do programa GEO IPOG (`dashboards/METRICAS-CANONICAS.md`) é o **Schema Coverage Score** agregado das auditorias NAIA. A fórmula canônica é:

```
schema_coverage = max(0, 100 - 5 * P0_falhando - 2 * P1_falhando - 1 * P2_falhando)
```

P3 não entra no KPI (é polimento). A cobertura mínima exigida em cada execução `full` para o KPI ser válido:

| Tipo de página | Quantidade mínima |
|---|---|
| Hub central (`/cursos/pos-graduacao`) | 1 |
| Institucional (`/sobre`, `/`, `/corpo-docente`, `/blog`, `/fale-conosco`) | 5 |
| Páginas de curso individuais | 30 (amostragem prioriza vertical Psicologia) |
| Perfis de docente | 5 |
| Artigos de blog | 5 |
| Artefatos técnicos (`/llms.txt`, `/robots.txt`, `/sitemap.xml`) | 3 |

### D.1 Implementação canônica

```python
# naia/scoring.py
from collections import Counter
from naia.models import CheckResult, CheckStatus, Severity

def schema_coverage_score(results: list[CheckResult]) -> int:
    by_sev = Counter()
    for r in results:
        if r.status != CheckStatus.FAILED:
            continue
        by_sev[r.severity] += 1
    raw = 100 - 5 * by_sev[Severity.P0] - 2 * by_sev[Severity.P1] - 1 * by_sev[Severity.P2]
    return max(0, raw)

def coverage_breakdown(results: list[CheckResult]) -> dict:
    by_sev_status = Counter()
    for r in results:
        by_sev_status[(r.severity.value, r.status.value)] += 1
    return {
        "P0_failed": by_sev_status[("P0", "failed")],
        "P1_failed": by_sev_status[("P1", "failed")],
        "P2_failed": by_sev_status[("P2", "failed")],
        "P3_failed": by_sev_status[("P3", "failed")],
        "passed": sum(1 for r in results if r.status == CheckStatus.PASSED),
        "score": schema_coverage_score(results),
    }
```

### D.2 Persistência em `fct_schema_audit`

Cada `CheckResult` produz uma linha no fato (esquema documentado em `docs/tech-stack/02-data-engineering.md`). A engine usa transação por execução: ou todas as linhas entram juntas ou rollback. O `audit_id` (UUIDv7) identifica a execução; `audit_date` é particionamento mensal; `audit_type` distingue `mensal-completa` de `quinzenal-spot-p0p1`. O ETL sumariza `schema_coverage_score` em `fct_kpi_4_history` semanalmente para a seção 5 do `dashboards/KPI-DASHBOARD.md`.

```python
# naia/sinks/warehouse.py
import asyncpg
from uuid import UUID
from datetime import date
from naia.models import CheckResult

async def persist_audit(conn: asyncpg.Connection, audit_id: UUID, audit_date: date,
                        audit_type: str, results: list[CheckResult]) -> None:
    rows = [
        (audit_id, audit_date, audit_type, str(r.page_url), r.page_type.value,
         r.naia_check_id, r.naia_categoria, r.status.value, r.severity.value,
         (r.evidence or {}).get("evidence_url"), None)
        for r in results
    ]
    await conn.executemany("""
        INSERT INTO fct_schema_audit
        (audit_id, audit_date, audit_type, page_url, page_type,
         naia_check_id, naia_categoria, status, severity,
         evidence_url, issue_url)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    """, rows)
```

### D.3 Histórico no dashboard

A view `vw_kpi4_weekly` agrega o score por semana e alimenta o gráfico de série temporal em `dashboards/KPI-DASHBOARD.md` seção 5. O target M06 é Score ≥ 70; M08 ≥ 80; M12 ≥ 90.

---

## Bloco E — Geração de issues no GitHub

Toda falha P0 ou P1 vira issue no `geo-ipog`. A engine usa `PyGithub` + token `GITHUB_TOKEN` em `~/.claude/.env`. Idempotência garantida por busca de issue aberta com mesmo título antes de criar nova.

### E.1 Convenções

| Campo | Valor |
|---|---|
| Title | `[NAIA-XXX] <descrição curta do check> em <slug da página>` |
| Labels | `auditoria`, `categoria-<letra>`, e por categoria: `schema` (A-D), `llms-txt` (E), `robots-waf` (F), `conteudo` (G), `performance` (H), `cross-llm` (I), `autoridade-externa` (J); severidade vira `prioridade-alta` (P0) ou `prioridade-media` (P1) |
| Milestone | Onda editorial corrente (`Onda M06`, `Onda M07`...) lida de `data/ondas.yaml` |
| Assignees | `@brunoazambuja` para categorias F/H/A (TI IPOG); `@alexandrecaramaschi` para C/G/I/J; `@bruno+@alexandre` para B/D/E |
| Body | Descrição → evidência (`<details>` com JSON-LD problemático) → remediation hint → link para `audits/PLAYBOOK-AUDITORIA-NAIA.md#NAIA-XXX` → SLA |

### E.2 Implementação

```python
# naia/issues/github.py
import os
from github import Github, GithubException
from naia.models import CheckResult, Severity

REPO = "Brasil-GEO/geo-ipog"

CATEGORY_LABELS = {
    "A": "schema", "B": "schema", "C": "schema", "D": "schema",
    "E": "llms-txt", "F": "robots-waf",
    "G": "conteudo", "H": "performance",
    "I": "cross-llm", "J": "autoridade-externa",
}

def _slug_from_url(url: str) -> str:
    return url.rstrip("/").split("/")[-1] or "root"

def _priority_label(sev: Severity) -> str:
    return "prioridade-alta" if sev == Severity.P0 else "prioridade-media"

def _sla_text(sev: Severity) -> str:
    return "5 dias uteis" if sev == Severity.P0 else "15 dias uteis"

def _build_title(r: CheckResult) -> str:
    return f"[{r.naia_check_id}] {_short_description(r.naia_check_id)} em /{_slug_from_url(str(r.page_url))}"

def _short_description(check_id: str) -> str:
    from naia.types import get_registry
    cls = get_registry().get(check_id)
    return cls.description if cls else check_id

def _build_body(r: CheckResult) -> str:
    import json
    evidence_block = ""
    if r.evidence:
        evidence_block = (
            "<details><summary>Evidencia</summary>\n\n```json\n"
            + json.dumps(r.evidence, indent=2, ensure_ascii=False)
            + "\n```\n</details>\n\n"
        )
    return f"""## Contexto
Check `{r.naia_check_id}` (categoria {r.naia_categoria}) falhou em `{r.page_url}`.

**Severidade:** {r.severity.value}
**SLA:** {_sla_text(r.severity)}
**Tipo de pagina:** {r.page_type.value}
**Auditado em:** {r.audited_at.isoformat()}

## Descricao
{_short_description(r.naia_check_id)}

{evidence_block}## Remediacao sugerida
{r.remediation_hint or 'Ver audits/PLAYBOOK-AUDITORIA-NAIA.md para acao canonica.'}

## Referencias
- Playbook: [audits/PLAYBOOK-AUDITORIA-NAIA.md](../audits/PLAYBOOK-AUDITORIA-NAIA.md)
- Schema canonico: [audits/SCHEMA-PATTERNS.md](../audits/SCHEMA-PATTERNS.md)
"""

async def open_issue_if_needed(r: CheckResult) -> str | None:
    if r.severity not in (Severity.P0, Severity.P1):
        return None
    if r.status.value != "failed":
        return None
    gh = Github(os.environ["GITHUB_TOKEN"])
    repo = gh.get_repo(REPO)
    title = _build_title(r)
    # Idempotencia: nao abre se ja existe issue aberta com mesmo titulo
    for issue in repo.get_issues(state="open", labels=["auditoria"]):
        if issue.title == title:
            return issue.html_url
    labels = [
        "auditoria",
        f"categoria-{r.naia_categoria}",
        CATEGORY_LABELS[r.naia_categoria],
        _priority_label(r.severity),
    ]
    issue = repo.create_issue(title=title, body=_build_body(r), labels=labels)
    return issue.html_url
```

### E.3 Idempotência reforçada

A busca por título exato é estável porque o template inclui o slug da página. Caso título mude entre versões (ex.: refactor da `description` do check), a engine usa fallback de busca por label `auditoria` + ID NAIA no body. Issues fechadas que recorrem (mesmo check + mesma URL) são reabertas com comentário "Recorrência detectada em <data>".

---

## Bloco F — Auditoria de concorrentes (extensão da Onda 2)

A engine resolve a issue #10 do programa (auditoria Schema dos 10 concorrentes) executando o modo `competitor` contra a lista canônica em `data/concorrentes.yaml`. Apenas categorias **A, B, E, F, J** são executadas (categorias internas ao IPOG não fazem sentido externamente). Resultado consolidado em `audits/benchmarking/matriz-tecnica-schema-seo.md` seção 8.2.

### F.1 Concorrentes canônicos (10 entidades)

A lista exata vive em `data/concorrentes.yaml`. Concorrentes com WAF agressivo (Anhanguera, FSL Sírio-Libanês) são tratados em fluxo dedicado: tentativa via User-Agent disfarçado (`Mozilla/5.0 ... Brasil-GEO-NAIA-Audit`), e em caso de HTTP 403, marca o resultado como `inconclusive` com flag `Bloqueado WAF`.

### F.2 Implementação

```python
# naia/competitor.py
import asyncio
import yaml
from naia.engine import run_audit_for_url
from naia.models import CheckStatus

UA_PRIMARY = "Brasil-GEO-NAIA/1.0 (+https://brasilgeo.com.br/naia)"
UA_FALLBACK = "Mozilla/5.0 (Windows NT 10.0; Win64) AppleWebKit/537.36 Chrome/126.0.0.0 Safari/537.36"

async def audit_competitors(yaml_path: str = "data/concorrentes.yaml") -> dict:
    with open(yaml_path, encoding="utf-8") as f:
        cfg = yaml.safe_load(f)
    results = {}
    for comp in cfg["concorrentes"]:
        try:
            res = await run_audit_for_url(comp["url"], categories={"A","B","E","F","J"}, user_agent=UA_PRIMARY)
        except WAFBlockedError:
            res = await run_audit_for_url(comp["url"], categories={"A","B","E","F","J"},
                                          user_agent=UA_FALLBACK, allow_403_inconclusive=True)
        results[comp["id"]] = res
    return results

class WAFBlockedError(Exception):
    pass
```

### F.3 Output competitivo

Cada execução gera linha em `fct_schema_audit_competitor` (variante do fato canônico, com coluna `concorrente_id`) e atualiza a matriz markdown que vai para `audits/benchmarking/matriz-tecnica-schema-seo.md`. A coluna "IPOG vs concorrente" exibe o delta de Schema Coverage Score por categoria, alimentando a narrativa do board report.

---

# Parte 2 — Voice Guard Service

## Bloco G — As 4 dimensões em código

O Voice Guard pondera quatro dimensões com pesos `30+30+25+15=100`. Score mínimo `70/100` para publicação. Bloqueios críticos (3+ ocorrências em qualquer deny-list, naming proibido, Bloom 1-2 em objetivo, ausência de tabela, ausência de citação na abertura, marcador `[a confirmar]` residual, claim regulatório sem revisão jurídica, acentuação incompleta) zeram o score independentemente da soma ponderada — exatamente como o `content/VOICE-GUIDE.md` prescreve.

### G.1 Modelos pydantic

```python
# voice_guard/models.py
from datetime import datetime
from enum import StrEnum
from pydantic import BaseModel, Field

class DimensionName(StrEnum):
    CLICHE = "anti-cliche"
    BLOOM_KNOWLES = "bloom-andragogia"
    NAMING = "naming-canonico"
    HBR = "hbr-grade"

class DimensionScore(BaseModel):
    name: DimensionName
    weight: float  # 0-1
    raw_score: float  # 0-100
    weighted: float  # raw_score * weight / 100 * peso_ponderado_como_pontos
    issues: list[dict] = Field(default_factory=list)

class CriticalBlock(BaseModel):
    code: str
    description: str
    location: str | None = None  # ex.: "secao 'Objetivos', linha 42"

class VoiceGuardReport(BaseModel):
    file_path: str
    title: str | None = None
    author: str | None = None
    word_count: int
    dimensions: list[DimensionScore]
    final_score: int  # 0-100
    critical_blocks: list[CriticalBlock]
    status: str  # "aprovado-exemplar" | "aprovado" | "reescrita-parcial" | "reescrita-estrutural" | "bloqueio-critico"
    audited_at: datetime
```

### G.2 Dimensão 1 — Anti-clichê (peso 30)

Detecta 17 clichês + 8 rhetoric openers + 7 ai-disclaimers do `content/CLICHES-PROIBIDOS.md`. Pontuação: começa em 100, cada ocorrência subtrai 10. Três ou mais ocorrências em qualquer deny-list zera a dimensão e dispara bloqueio crítico.

```python
# voice_guard/dimensions/cliche.py
import re
from voice_guard.models import DimensionName, DimensionScore

CLICHES_UNIVERSAIS = [
    "nos dias de hoje", "e fundamental que", "nao e segredo que",
    "o futuro e agora", "em um mundo cada vez mais", "vamos explorar",
    "como sabemos", "e importante ressaltar", "diante desse cenario",
    "nesse contexto", "vale a pena destacar", "em ultima analise",
    "grosso modo", "vamos aprender", "agora voce vai entender",
    "como todos sabem", "desde os primordios",
]

RHETORIC_OPENERS = [
    "voce ja se perguntou", "voce sabia que", "imagine se",
    "e se eu te dissesse", "tem certeza que", "quantas vezes voce",
    "pare e pense", "reflita comigo",
]

AI_DISCLAIMERS = [
    "como modelo de ia", "como modelo de linguagem", "como uma ia",
    "devo ressaltar", "como assistente",
    "nao tenho a capacidade", "nao posso fornecer",
]

def _normalize(text: str) -> str:
    """Remove acentos para casamento estavel (regras estao em ASCII)."""
    import unicodedata
    nfkd = unicodedata.normalize("NFKD", text.lower())
    return "".join(c for c in nfkd if not unicodedata.combining(c))

def _scan(text_norm: str, deny_list: list[str]) -> list[dict]:
    hits = []
    for term in deny_list:
        for m in re.finditer(rf"\b{re.escape(term)}\b", text_norm):
            hits.append({"term": term, "offset": m.start()})
    return hits

def scan_cliches(text: str) -> dict:
    norm = _normalize(text)
    return {
        "universais": _scan(norm, CLICHES_UNIVERSAIS),
        "rhetoric_openers": _scan(norm, RHETORIC_OPENERS),
        "ai_disclaimers": _scan(norm, AI_DISCLAIMERS),
    }

def score_cliche(text: str) -> tuple[DimensionScore, list]:
    hits = scan_cliches(text)
    total_hits = sum(len(v) for v in hits.values())
    raw = max(0, 100 - 10 * total_hits)
    critical = []
    for kind, items in hits.items():
        if len(items) >= 3:
            critical.append({
                "code": f"BLOQ-CLICHE-{kind.upper()}",
                "description": f"3+ ocorrencias em deny-list {kind}: {[i['term'] for i in items]}",
            })
            raw = 0
    weight = 0.30
    weighted = raw * weight  # contribuicao em pontos finais (max 30)
    return DimensionScore(
        name=DimensionName.CLICHE,
        weight=weight,
        raw_score=raw,
        weighted=weighted,
        issues=[{"kind": k, "items": v} for k, v in hits.items() if v],
    ), critical
```

### G.3 Dimensão 2 — Bloom + andragogia (peso 30)

Valida verbos Bloom **3+** em objetivos e exercícios. Verbos Bloom 1-2 (`entender`, `conhecer`, `saber`, `compreender`, `lembrar`, `memorizar`, `listar`, `descrever`, `identificar`, `definir`, `citar`) são deny-list dura. Detecta seis princípios de Knowles em estrutura.

```python
# voice_guard/dimensions/bloom.py
import re
from voice_guard.models import DimensionName, DimensionScore

VERBOS_BLOOM_3PLUS = {
    "aplicar","implementar","executar","demonstrar","calcular","utilizar",
    "analisar","comparar","diferenciar","diagnosticar","categorizar","examinar",
    "avaliar","justificar","priorizar","recomendar","defender","criticar",
    "criar","projetar","formular","propor","desenvolver","construir","elaborar",
}

VERBOS_BLOOM_1_2_DENY = {
    "entender","conhecer","saber","compreender","lembrar","memorizar",
    "listar","descrever","identificar","definir","citar",
}

KNOWLES_SIGNALS = {
    1: [r"\b(em \d{4}|segundo .* \(\d{4}\)|por que este conteudo)\b"],
    2: [r"\b(considere o caso|analise qual abordagem|decida com base)\b"],
    3: [r"\b(se voce ja|se na sua experiencia|profissionais que)\b"],
    4: [r"\b(aplicavel ja|no proximo ciclo|na sua organizacao)\b"],
    5: [r"\b(o dilema|o problema|o desafio enfrentado)\b"],
    6: [r"\b(diferencial|crescimento profissional|autonomia tecnica)\b"],
}

def _extract_objectives_section(text: str) -> str:
    """Extrai bloco de Objetivos para auditoria isolada."""
    m = re.search(r"##\s*Objetivos[\s\S]+?(?=\n##\s|\Z)", text, re.IGNORECASE)
    return m.group(0) if m else ""

def score_bloom_knowles(text_norm: str, text_raw: str) -> tuple[DimensionScore, list]:
    critical = []
    raw = 100

    # Bloom 1-2 em objetivos -> bloqueio critico
    objectives = _extract_objectives_section(text_norm)
    deny_hits = [v for v in VERBOS_BLOOM_1_2_DENY if re.search(rf"\b{v}\b", objectives)]
    if deny_hits:
        critical.append({
            "code": "BLOQ-BLOOM-1-2",
            "description": f"Verbos Bloom 1-2 em objetivos: {deny_hits}",
            "location": "secao Objetivos",
        })
        raw -= 20 * len(deny_hits)

    # Knowles: 5+ de 6 obrigatorio; subtrair -15 por ausente abaixo de 5
    detected = sum(1 for sigs in KNOWLES_SIGNALS.values() if any(re.search(s, text_norm) for s in sigs))
    if detected < 5:
        raw -= 15 * (5 - detected)
        if detected < 4:
            critical.append({
                "code": "BLOQ-KNOWLES-LT-5",
                "description": f"Apenas {detected}/6 principios de Knowles detectados.",
            })

    raw = max(0, raw)
    weight = 0.30
    return DimensionScore(
        name=DimensionName.BLOOM_KNOWLES,
        weight=weight,
        raw_score=raw,
        weighted=raw * weight,
        issues=[
            {"bloom_deny_hits": deny_hits},
            {"knowles_detected": detected, "knowles_required": 5},
        ],
    ), critical
```

### G.4 Dimensão 3 — Naming canônico (peso 25)

Valida `Brasil GEO` (não `GEO Brasil`), `IPOG` (não `Ipog`/`iPOG`/`I.P.O.G.`), credencial completa Alexandre Caramaschi quando assinada por ele, `MBA Online de Psicologia` (não `MBA EAD Psicologia`/`Pos Online Psicologia`).

```python
# voice_guard/dimensions/naming.py
import re
from voice_guard.models import DimensionName, DimensionScore

NAMING_PROIBIDO = {
    "GEO Brasil": "Inversao do canonico Brasil GEO",
    "Ipog": "Variacao fora do padrao IPOG",
    "iPOG": "Variacao fora do padrao IPOG",
    "I.P.O.G.": "Variacao fora do padrao IPOG",
    "MBA EAD Psicologia": "Naming antigo do produto",
    "Pos Online Psicologia": "Naming antigo do produto",
    "Pós Online Psicologia": "Naming antigo do produto",
    "Alex": "Apelido nao autorizado de Alexandre Caramaschi",
    "A. Caramaschi": "Apelido nao autorizado",
    "Especialista #1": "Claim sem prova, banido globalmente",
    "Source Rank": "Marca antiga descontinuada",
    "geobrasil.com.br": "Dominio antigo banido",
    "sourcerank.ai": "Dominio antigo banido",
}

CREDENCIAL_CANONICA = (
    "CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil"
)

def score_naming(text_raw: str, author: str | None) -> tuple[DimensionScore, list]:
    critical = []
    issues = []
    raw = 100
    for term, motivo in NAMING_PROIBIDO.items():
        if re.search(rf"\b{re.escape(term)}\b", text_raw):
            raw -= 25
            issues.append({"term": term, "motivo": motivo})
            critical.append({
                "code": "BLOQ-NAMING-PROIBIDO",
                "description": f"Naming proibido detectado: {term} ({motivo})",
            })
    # Credencial Alexandre quando assinada
    if author and "alexandre caramaschi" in author.lower():
        if CREDENCIAL_CANONICA not in text_raw:
            raw -= 10
            issues.append({"missing_credential": CREDENCIAL_CANONICA})
    raw = max(0, raw)
    weight = 0.25
    return DimensionScore(
        name=DimensionName.NAMING,
        weight=weight,
        raw_score=raw,
        weighted=raw * weight,
        issues=issues,
    ), critical
```

### G.5 Dimensão 4 — HBR-grade (peso 15)

Valida 6 elementos obrigatórios do `content/PADRAO-EDITORIAL.md`: abertura-impacto, tese contraintuitiva, evidência (citação `(Autor, Ano)`), mecanismo, decisão pessoal, próximo passo. Cada elemento ausente subtrai 20 pontos da dimensão.

```python
# voice_guard/dimensions/hbr.py
import re
from voice_guard.models import DimensionName, DimensionScore

CITACAO_REGEX = r"\([A-Z][\w\sçãéíóúâêôû\.\-,]+,\s*\d{4}\)|\b[A-Z][\w\s\.\-]+\s+\(\d{4}\)"

def _has_table(text: str) -> bool:
    return bool(re.search(r"\n\|.+\|.+\|", text))

def _has_blockquote(text: str) -> bool:
    return bool(re.search(r"^\s*>", text, re.MULTILINE))

def _has_citation_in_opening(text: str, opening_chars: int = 1500) -> bool:
    return bool(re.search(CITACAO_REGEX, text[:opening_chars]))

def _has_proximo_passo(text: str) -> bool:
    return bool(re.search(r"(proximo passo|leia tambem|ver tambem|cross-link)", text, re.IGNORECASE))

def _has_decisao(text: str) -> bool:
    return bool(re.search(r"(o leitor decide|sua decisao|recomendar|priorizar|escolher)", text, re.IGNORECASE))

def _has_mecanismo(text: str) -> bool:
    return bool(re.search(r"(porque|por que funciona|mecanismo|o que explica)", text, re.IGNORECASE))

def score_hbr(text_raw: str) -> tuple[DimensionScore, list]:
    critical = []
    issues = []
    raw = 100

    elements = {
        "tabela": _has_table(text_raw),
        "blockquote_insight": _has_blockquote(text_raw),
        "citacao_abertura": _has_citation_in_opening(text_raw),
        "mecanismo_explicito": _has_mecanismo(text_raw),
        "decisao_pessoal": _has_decisao(text_raw),
        "proximo_passo": _has_proximo_passo(text_raw),
    }
    for name, present in elements.items():
        if not present:
            raw -= 20
            issues.append({"missing_element": name})

    # Bloqueios criticos do VOICE-GUIDE: tabela e citacao na abertura
    if not elements["tabela"]:
        critical.append({"code": "BLOQ-HBR-TABELA", "description": "Ausencia completa de tabela."})
    if not elements["citacao_abertura"]:
        critical.append({"code": "BLOQ-HBR-CITACAO", "description": "Ausencia de citacao (Autor, Ano) na abertura."})

    # marcador residual
    if "[a confirmar]" in text_raw.lower():
        critical.append({"code": "BLOQ-HBR-A-CONFIRMAR", "description": 'Marcador "[a confirmar]" residual.'})
        raw = 0

    raw = max(0, raw)
    weight = 0.15
    return DimensionScore(
        name=DimensionName.HBR,
        weight=weight,
        raw_score=raw,
        weighted=raw * weight,
        issues=issues,
    ), critical
```

### G.6 Exemplos de input que falha vs passa

| Dimensão | Falha | Passa |
|---|---|---|
| Anti-clichê | "Nos dias de hoje, é fundamental que..." | "Em 2025, a demanda por psicólogos organizacionais cresceu 24% (Conselho Federal de Psicologia, 2025)..." |
| Bloom | "Objetivos: Entender Psicologia organizacional." | "Objetivos: Aplicar a Resolução CFP 11/2018; Analisar viabilidade de programa..." |
| Naming | "GEO Brasil em parceria com Ipog lança..." | "Brasil GEO em parceria com IPOG lança..." |
| HBR | Texto sem tabela e sem citação na abertura | Texto com 1 tabela + abertura "Pesquisa McKinsey (2025) mostra..." + síntese executiva com cross-link |

---

## Bloco H — Pipeline Voice Guard

Workflow canônico em 7 etapas:

```
1. Input: Markdown ou plain text -> arquivo OU stdin OU corpo HTTP
2. Pre-processing: split de paragrafos, extracao de headings,
   identificacao de assinatura (frontmatter ou bloco "Por: ...")
3. Validacao por dimensao: 4 funcoes em paralelo (asyncio.gather)
4. Scoring: soma ponderada (raw_score * weight) com piso 0 e teto 100
5. Output: JSON estruturado + Markdown legivel com diff inline
6. Persistencia: historico de scores em fct_voice_guard_runs (DB)
7. Gate: score < 70 ou critical_blocks nao-vazio -> reabertura automatica
   da issue de peca em geo-ipog (DoD secao 1)
```

### H.1 Service entrypoint

```python
# voice_guard/service.py
import asyncio
from datetime import datetime, UTC
from pathlib import Path
import frontmatter
from voice_guard.dimensions.cliche import score_cliche
from voice_guard.dimensions.bloom import score_bloom_knowles, _normalize
from voice_guard.dimensions.naming import score_naming
from voice_guard.dimensions.hbr import score_hbr
from voice_guard.models import VoiceGuardReport

STATUS_BANDS = [
    (90, "aprovado-exemplar"),
    (70, "aprovado"),
    (50, "reescrita-parcial"),
    (0,  "reescrita-estrutural"),
]

def _status_for(score: int, has_critical: bool) -> str:
    if has_critical:
        return "bloqueio-critico"
    for threshold, label in STATUS_BANDS:
        if score >= threshold:
            return label
    return "reescrita-estrutural"

async def evaluate(file_path: str | Path) -> VoiceGuardReport:
    path = Path(file_path)
    raw = path.read_text(encoding="utf-8")
    fm = frontmatter.loads(raw)
    text_raw = fm.content
    text_norm = _normalize(text_raw)
    title = fm.get("title")
    author = fm.get("author")

    cliche_d, cliche_crit = score_cliche(text_raw)
    bloom_d, bloom_crit = score_bloom_knowles(text_norm, text_raw)
    naming_d, naming_crit = score_naming(text_raw, author)
    hbr_d, hbr_crit = score_hbr(text_raw)

    dims = [cliche_d, bloom_d, naming_d, hbr_d]
    final = int(round(sum(d.weighted for d in dims)))
    final = max(0, min(100, final))
    critical = cliche_crit + bloom_crit + naming_crit + hbr_crit
    if critical:
        final = 0
    return VoiceGuardReport(
        file_path=str(path),
        title=title,
        author=author,
        word_count=len(text_raw.split()),
        dimensions=dims,
        final_score=final,
        critical_blocks=critical,
        status=_status_for(final, bool(critical)),
        audited_at=datetime.now(UTC),
    )
```

### H.2 Output JSON canônico

```json
{
  "file_path": "drafts/peca-1-mba-roi.md",
  "title": "ROI do MBA Online de Psicologia para profissionais de RH",
  "author": "Alexandre Caramaschi",
  "word_count": 2860,
  "final_score": 78,
  "status": "aprovado",
  "dimensions": [
    {"name": "anti-cliche", "weight": 0.30, "raw_score": 100, "weighted": 30.0, "issues": []},
    {"name": "bloom-andragogia", "weight": 0.30, "raw_score": 70, "weighted": 21.0,
     "issues": [{"knowles_detected": 4, "knowles_required": 5}]},
    {"name": "naming-canonico", "weight": 0.25, "raw_score": 100, "weighted": 25.0, "issues": []},
    {"name": "hbr-grade", "weight": 0.15, "raw_score": 80, "weighted": 12.0,
     "issues": [{"missing_element": "blockquote_insight"}]}
  ],
  "critical_blocks": [],
  "audited_at": "2026-06-02T14:32:11Z"
}
```

### H.3 Persistência

A tabela `fct_voice_guard_runs` (proposta no `docs/tech-stack/02-data-engineering.md` em ondas posteriores) registra cada execução com `run_id` UUIDv7, `file_path`, `final_score`, `status`, `dimensions_json`, `critical_blocks_json`, `git_sha` (quando rodado em CI). Histórico permite gráfico de evolução por peça e cohort de score por autor (Alexandre vs IPOG vs co-assinatura).

### H.4 Gate de publicação

Score `< 70` ou `critical_blocks` não-vazio dispara reabertura automática da issue de peça (campo `peca_id` no frontmatter da peça mapeia para `Issue#` em `geo-ipog`). O comentário automatizado inclui o JSON de issues do report e o link para o diff explicito gerado.

---

## Bloco I — Integração com fluxo editorial

Três pontos de integração obrigatórios.

### I.1 Pre-commit hook (`.husky/pre-commit`)

Bloqueia commit em `content/`, `docs/board-report/` ou `audits/relatorios/` se score `< 70` em arquivo modificado. Roda apenas em arquivos staged (`git diff --cached --name-only -- '*.md'`).

```bash
#!/usr/bin/env bash
# .husky/pre-commit
set -e
files=$(git diff --cached --name-only --diff-filter=ACMR -- 'content/*.md' 'docs/board-report/*.md' 'audits/relatorios/*.md')
if [ -z "$files" ]; then exit 0; fi
for f in $files; do
  python -m voice_guard.cli check --file "$f" --min-score 70 || {
    echo "Voice Guard reprovou $f. Rode 'voice-guard fix --file $f' antes de commit." >&2
    exit 1
  }
done
```

### I.2 GitHub Action `ci-voice-guard.yml`

Roda em toda PR que toque `content/**.md`, `docs/relatorios-*/**.md` ou `audits/relatorios/**.md`. Falha o status check se `final_score < 70`. Comentário automatizado anexa o report Markdown ao PR.

```yaml
name: ci-voice-guard
on:
  pull_request:
    paths:
      - 'content/**.md'
      - 'docs/relatorios-*/**.md'
      - 'audits/relatorios/**.md'
jobs:
  voice-guard:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: actions/setup-python@v5
        with: { python-version: '3.12' }
      - run: pip install -e geo-platform[voice-guard]
      - name: Identifica arquivos alterados
        id: diff
        run: |
          echo "files=$(git diff --name-only origin/${{ github.base_ref }} -- 'content/**.md' 'docs/relatorios-*/**.md' 'audits/relatorios/**.md' | tr '\n' ' ')" >> $GITHUB_OUTPUT
      - name: Voice Guard
        run: |
          for f in ${{ steps.diff.outputs.files }}; do
            python -m voice_guard.cli check --file "$f" --min-score 70 --report-format md >> voice-guard-report.md
          done
      - uses: actions/github-script@v7
        if: always()
        with:
          script: |
            const fs = require('fs');
            const body = fs.readFileSync('voice-guard-report.md', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body
            });
```

### I.3 CLI

```bash
# Validacao local
voice-guard check --file content/peca-1.md
voice-guard check --file content/peca-1.md --min-score 70 --report-format json
voice-guard check --file content/peca-1.md --report-format md > review.md

# Auto-correcao
voice-guard fix --file content/peca-1.md           # gera content/peca-1.fixed.md
voice-guard fix --file content/peca-1.md --write   # in-place
voice-guard fix --file content/peca-1.md --dimension naming  # apenas naming

# Auditoria de pasta inteira
voice-guard scan content/ --min-score 70 --fail-fast
```

```python
# voice_guard/cli.py
import asyncio
import json
import sys
import typer
from pathlib import Path
from voice_guard.service import evaluate
from voice_guard.fixes.accentuation import fix_accentuation
from voice_guard.fixes.naming import fix_naming

app = typer.Typer(no_args_is_help=True)

@app.command()
def check(
    file: Path = typer.Option(..., exists=True, readable=True),
    min_score: int = 70,
    report_format: str = typer.Option("json", "--report-format"),
):
    report = asyncio.run(evaluate(file))
    if report_format == "json":
        typer.echo(report.model_dump_json(indent=2))
    else:
        typer.echo(_render_md(report))
    if report.final_score < min_score or report.critical_blocks:
        raise typer.Exit(code=1)

@app.command()
def fix(
    file: Path = typer.Option(..., exists=True, readable=True),
    write: bool = False,
    dimension: str | None = None,
):
    text = file.read_text(encoding="utf-8")
    if dimension in (None, "accentuation"):
        text = fix_accentuation(text)
    if dimension in (None, "naming"):
        text = fix_naming(text)
    out_path = file if write else file.with_suffix(".fixed.md")
    out_path.write_text(text, encoding="utf-8")
    typer.echo(f"Gravado em {out_path}")

if __name__ == "__main__":
    app()
```

---

## Bloco J — Auto-correção (Voice Guard fix mode)

Determinístico para acentuação e naming. Sugestivo (não aplica) para clichês, Bloom e estrutura HBR (humano decide).

### J.1 Acentuação (100+ palavras canônicas)

Usa tabela de `content/ACENTUACAO-PT-BR.md` carregada como dicionário `forma_incorreta -> forma_correta`. Aplica substituição apenas em palavras inteiras (`\b`) fora de blocos de código (` ``` ` blocks) e fora de URLs/slugs (regex `https?://\S+` e `\b[a-z0-9\-]+\.(md|html|js|ts|py)\b` mantidos).

```python
# voice_guard/fixes/accentuation.py
import re
from pathlib import Path

def _load_table() -> dict[str, str]:
    """Le content/ACENTUACAO-PT-BR.md e extrai pares incorreta -> correta."""
    md = Path("content/ACENTUACAO-PT-BR.md").read_text(encoding="utf-8")
    table = {}
    for m in re.finditer(r"\|\s*([a-z\-_]+)\s*\|\s*([a-zA-Zçãáéíóúâêôûà\-_]+)\s*\|", md):
        wrong, right = m.group(1).strip(), m.group(2).strip()
        if wrong != right:
            table[wrong] = right
    return table

_TABLE = _load_table()

CODE_BLOCK = re.compile(r"```[\s\S]+?```", re.MULTILINE)
INLINE_CODE = re.compile(r"`[^`]+`")
URL = re.compile(r"https?://\S+")

def _protect(text: str) -> tuple[str, list[str]]:
    placeholders = []
    def _stash(m):
        placeholders.append(m.group(0))
        return f"§§{len(placeholders)-1}§§"
    for pat in (CODE_BLOCK, INLINE_CODE, URL):
        text = pat.sub(_stash, text)
    return text, placeholders

def _restore(text: str, placeholders: list[str]) -> str:
    for i, ph in enumerate(placeholders):
        text = text.replace(f"§§{i}§§", ph)
    return text

def fix_accentuation(text: str) -> str:
    safe, ph = _protect(text)
    for wrong, right in _TABLE.items():
        safe = re.sub(rf"\b{re.escape(wrong)}\b", right, safe)
    return _restore(safe, ph)
```

### J.2 Naming canônico

```python
# voice_guard/fixes/naming.py
import re

NAMING_FIX = {
    "GEO Brasil": "Brasil GEO",
    "Ipog": "IPOG",
    "iPOG": "IPOG",
    "I.P.O.G.": "IPOG",
    "MBA EAD Psicologia": "MBA Online de Psicologia",
    "Pos Online Psicologia": "MBA Online de Psicologia",
    "Pós Online Psicologia": "MBA Online de Psicologia",
}

def fix_naming(text: str) -> str:
    for wrong, right in NAMING_FIX.items():
        text = re.sub(rf"\b{re.escape(wrong)}\b", right, text)
    return text
```

### J.3 Glossário Psicologia

Validação contra `content/GLOSSARIO-PSICOLOGIA.md`: identifica termos proibidos e propõe substituição (mas não aplica em peças assinadas — humano valida o contexto).

```python
# voice_guard/fixes/glossary.py
def suggest_glossary_fixes(text: str) -> list[dict]:
    """Apenas sugere; nao aplica."""
    from pathlib import Path
    import re
    md = Path("content/GLOSSARIO-PSICOLOGIA.md").read_text(encoding="utf-8")
    suggestions = []
    # Heuristica: extrair pares "termo proibido -> sinonimo aceito"
    for line in md.splitlines():
        if line.startswith("| ") and "Termos proibidos" not in line:
            cols = [c.strip() for c in line.split("|")][1:-1]
            if len(cols) >= 6:
                termo, _, _, _, sinonimos, proibidos = cols[:6]
                for prohibited in re.findall(r'"([^"]+)"', proibidos):
                    if re.search(rf"\b{re.escape(prohibited)}\b", text, re.IGNORECASE):
                        suggestions.append({
                            "found": prohibited, "term": termo, "suggest": sinonimos
                        })
    return suggestions
```

### J.4 Limitações declaradas

| Tipo de correção | Auto-aplica? | Motivo |
|---|---|---|
| Acentuação | Sim | Determinístico via dicionário canônico |
| Naming | Sim | Substituição 1-para-1 sem ambiguidade |
| Clichês | Não | Substituição depende de contexto editorial; humano decide |
| Estrutura HBR | Não | Só sugere; reescrita é editorial |
| Bloom | Não | Reescrever objetivo é decisão editorial |
| Glossário Psi | Não (apenas sugestão) | Contexto regulatório precisa de revisão jurídica |

---

## Bloco K — Testing

Estratégia de teste em três camadas:

### K.1 Unit tests por dimensão (`tests/voice_guard/`)

Pelo menos 20 casos cobrindo:

- **10 peças que passam** com score ≥ 70: artigos HBR canônicos sem clichês, com Bloom 3+, naming correto, 6 elementos editoriais.
- **10 peças que falham**: 1 com cada bloqueio crítico (cliché 3x, rhetoric opener, ai-disclaimer, naming proibido, Bloom 1-2 em objetivo, ausência de tabela, ausência de citação na abertura, marcador `[a confirmar]`, claim regulatório sem revisão, acentuação incompleta).

```python
# tests/voice_guard/test_dimensions.py
import pytest
from voice_guard.dimensions.cliche import score_cliche
from voice_guard.dimensions.bloom import score_bloom_knowles, _normalize
from voice_guard.dimensions.naming import score_naming

@pytest.mark.parametrize("text,expected_raw", [
    ("Em 2025, a demanda cresceu (CFP, 2025).", 100),
    ("Nos dias de hoje, é fundamental que profissionais...", 80),  # 2 hits = -20
])
def test_cliche_scoring(text, expected_raw):
    score, _ = score_cliche(text)
    assert score.raw_score == expected_raw

def test_cliche_critical_block_at_3():
    text = "Nos dias de hoje, é fundamental que como sabemos..."
    score, critical = score_cliche(text)
    assert score.raw_score == 0
    assert any(c["code"].startswith("BLOQ-CLICHE") for c in critical)

def test_naming_blocks_geo_brasil():
    score, critical = score_naming("A GEO Brasil é referência...", author=None)
    assert score.raw_score == 75
    assert any(c["code"] == "BLOQ-NAMING-PROIBIDO" for c in critical)

def test_bloom_blocks_entender_in_objectives():
    text = "## Objetivos\nEntender Psicologia organizacional."
    norm = _normalize(text)
    score, critical = score_bloom_knowles(norm, text)
    assert any(c["code"] == "BLOQ-BLOOM-1-2" for c in critical)
```

### K.2 Snapshot tests

Salva relatório JSON canônico de uma peça-fixture e compara em cada execução. Detecta regressões silenciosas em scoring.

```python
# tests/voice_guard/test_snapshots.py
import json
from pathlib import Path
from voice_guard.service import evaluate
import asyncio

FIXTURES = Path(__file__).parent / "fixtures"

def test_snapshot_peca_1_passa(tmp_path):
    report = asyncio.run(evaluate(FIXTURES / "peca-1-aprovada.md"))
    actual = json.loads(report.model_dump_json())
    expected = json.loads((FIXTURES / "peca-1-aprovada.report.json").read_text())
    # Ignora audited_at e file_path
    for d in (actual, expected):
        d.pop("audited_at", None); d.pop("file_path", None)
    assert actual == expected
```

### K.3 Property-based testing com hypothesis

Garante invariantes: score sempre `0 <= s <= 100`; bloqueio crítico sempre zera score; soma de pesos = 1.0; idempotência de `fix_accentuation` (rodar duas vezes produz o mesmo resultado).

```python
# tests/voice_guard/test_properties.py
from hypothesis import given, strategies as st
from voice_guard.fixes.accentuation import fix_accentuation
from voice_guard.dimensions.cliche import score_cliche

@given(st.text(min_size=0, max_size=10000))
def test_score_in_bounds(text):
    score, _ = score_cliche(text)
    assert 0 <= score.raw_score <= 100
    assert 0 <= score.weighted <= 30

@given(st.text(min_size=0, max_size=5000))
def test_fix_accentuation_idempotent(text):
    once = fix_accentuation(text)
    twice = fix_accentuation(once)
    assert once == twice
```

### K.4 Tests do NAIA Audit Engine

Estrutura espelhada em `tests/naia/`. Fixtures de HTML com Schema válido vs inválido. Mock de respostas HTTP via `respx` para `httpx`. Cobertura mínima:

- 1 fixture por categoria A-J com case `passed` e case `failed`.
- Snapshot do relatório JSON da auditoria de fixture estável.
- Teste de idempotência da abertura de issue (rodar 2x não cria duplicata).
- Teste do Schema Coverage Score com inputs sintéticos (e.g., 2 P0 + 5 P1 → score = `100 - 10 - 10 = 80`).

---

## Bloco L — Estrutura do projeto

```
geo-platform/
  pyproject.toml
  README.md
  src/
    naia/
      __init__.py
      cli.py                  # entrypoint typer
      engine.py               # orquestracao do pipeline
      models.py               # pydantic v2: PageContext, CheckResult
      types.py                # NaiaCheck base, register_check, registry
      scoring.py              # schema_coverage_score
      competitor.py           # auditoria competitiva
      fetchers/
        http.py               # httpx async + retry
        playwright.py         # render headless quando JS-heavy
      parsers/
        jsonld.py             # extruct + pyld
        robots.py
        sitemap.py
        llms_txt.py
      checks/
        category_a/
          __init__.py
          institutional.py    # NAIA-001 a NAIA-010
        category_b/
          __init__.py
          course.py           # NAIA-020 a NAIA-033
        category_c/
          __init__.py
          faq_blog.py         # NAIA-040 a NAIA-050
        category_d/
          __init__.py
          people.py           # NAIA-060 a NAIA-068
        category_e/
          __init__.py
          llms_txt.py         # NAIA-080 a NAIA-088
        category_f/
          __init__.py
          robots_sitemap.py   # NAIA-100 a NAIA-110
        category_g/
          __init__.py
          content_authority.py # NAIA-120 a NAIA-133
        category_h/
          __init__.py
          performance.py      # NAIA-150 a NAIA-156
        category_i/
          __init__.py
          cross_llm.py        # NAIA-170 a NAIA-180
        category_j/
          __init__.py
          external_authority.py # NAIA-200 a NAIA-204
      reports/
        markdown.py           # gerador NAIA-YYYY-MM.md
        json.py
      issues/
        github.py             # PyGithub + idempotencia
      sinks/
        warehouse.py          # asyncpg -> fct_schema_audit
        files.py              # JSONL frio
    voice_guard/
      __init__.py
      cli.py
      service.py
      models.py
      dimensions/
        __init__.py
        cliche.py
        bloom.py
        naming.py
        hbr.py
      fixes/
        __init__.py
        accentuation.py
        naming.py
        glossary.py
      reports/
        markdown.py           # diff inline
        json.py
      sinks/
        warehouse.py          # fct_voice_guard_runs
  tests/
    naia/
      fixtures/
        valid_org.html
        invalid_course.html
        robots_complete.txt
        llms_complete.txt
      test_category_a.py
      test_category_b.py
      test_scoring.py
      test_issues_idempotency.py
    voice_guard/
      fixtures/
        peca-1-aprovada.md
        peca-1-aprovada.report.json
        peca-2-cliche-3x.md
        ... (20 fixtures total)
      test_dimensions.py
      test_snapshots.py
      test_properties.py
      test_fixes.py
  scripts/
    run_naia_full.py          # invocavel no GH Actions cron mensal
    run_naia_spot.py          # invocavel quinzenal
    run_voice_guard_pr.py     # invocavel no Action ci-voice-guard
```

A estrutura segue convenção de pacote `src/` para evitar import accidental durante teste, com `pyproject.toml` declarando dois extras: `[project.optional-dependencies] naia = [...]` e `voice-guard = [...]`. Ambos compartilham `pydantic`, `httpx` e `selectolax`; apenas `naia` carrega `playwright` e `extruct`. Instalação seletiva: `pip install -e .[voice-guard]` para CI editorial; `pip install -e .[naia]` para CI de auditoria.

---

## Bloco M — CI/CD

Quatro workflows GitHub Actions cobrem o ciclo completo.

### M.1 `ci-naia-audit-monthly.yml`

```yaml
name: ci-naia-audit-monthly
on:
  schedule:
    - cron: '0 9 1 * *'  # primeiro dia de cada mes 06h00 BRT
  workflow_dispatch: {}
jobs:
  audit-full:
    runs-on: ubuntu-latest
    timeout-minutes: 180
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.12' }
      - run: pip install -e geo-platform[naia]
      - run: python -m naia.cli run --mode full --domain ipog.edu.br --persist --open-issues
        env:
          GITHUB_TOKEN: ${{ secrets.GH_NAIA_BOT }}
          PG_DSN: ${{ secrets.PG_DSN }}
      - uses: actions/upload-artifact@v4
        with:
          name: naia-report-${{ github.run_id }}
          path: audits/relatorios/NAIA-*.md
      - name: Commit relatorio
        run: |
          git config user.name "naia-bot"
          git config user.email "naia@brasilgeo.com.br"
          git add audits/relatorios/
          git commit -m "chore(naia): relatorio mensal $(date +%Y-%m)" || exit 0
          git push
```

### M.2 `ci-naia-spot-check-biweekly.yml`

```yaml
name: ci-naia-spot-check-biweekly
on:
  schedule:
    - cron: '0 9 1,15 * *'  # dias 1 e 15 de cada mes
  workflow_dispatch: {}
jobs:
  spot:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.12' }
      - run: pip install -e geo-platform[naia]
      - run: python -m naia.cli run --mode spot-p0p1 --domain ipog.edu.br --persist --open-issues
        env:
          GITHUB_TOKEN: ${{ secrets.GH_NAIA_BOT }}
          PG_DSN: ${{ secrets.PG_DSN }}
```

### M.3 `ci-voice-guard.yml`

(detalhado no Bloco I.2 acima)

### M.4 `cron-naia-competitors.yml`

```yaml
name: cron-naia-competitors
on:
  schedule:
    - cron: '0 12 5 * *'  # dia 5 de cada mes
  workflow_dispatch: {}
jobs:
  competitors:
    runs-on: ubuntu-latest
    timeout-minutes: 240
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.12' }
      - run: pip install -e geo-platform[naia]
      - run: python -m naia.cli competitor --yaml data/concorrentes.yaml --persist
        env:
          PG_DSN: ${{ secrets.PG_DSN }}
      - name: Atualizar matriz
        run: |
          python scripts/update_competitor_matrix.py
          git config user.name "naia-bot"
          git config user.email "naia@brasilgeo.com.br"
          git add audits/benchmarking/matriz-tecnica-schema-seo.md
          git commit -m "chore(naia): atualizacao matriz competitiva $(date +%Y-%m)" || exit 0
          git push
```

### M.5 Disciplina FinOps no CI

Cada workflow tem `timeout-minutes` declarado para evitar runaway. O `competitor` é o mais caro (4h) e roda apenas uma vez por mês. Spot-check P0/P1 fica abaixo de 30 min em GitHub Actions plano gratuito. Voice Guard em PR fica em segundos por arquivo. O conjunto cabe folgadamente nos 2.000 minutos/mês do plano gratuito de Actions.

---

## Bloco N — Reconciliação com `PLAYBOOK-AUDITORIA-NAIA.md`

A engine não substitui o playbook conceitual; complementa. O playbook continua sendo a especificação humana canônica (severidade, descrição, SLA). A engine é a implementação executável. Mapeamento explícito é dever do pacote: cada `NaiaCheck` referencia o ID do playbook como atributo `id`, e a engine produz, no final de cada execução `full`, um relatório `audits/COBERTURA-CHECKS.md` que cruza checks declarados no playbook vs. checks implementados no código.

### N.1 Tabela de cobertura (extrato exemplificativo)

| ID | Playbook | Código | Arquivo | Status |
|---|---|---|---|---|
| NAIA-001 | declarado | implementado | `naia/checks/category_a/institutional.py:NAIA001_EducationalOrgPresent` | ok |
| NAIA-002 | declarado | implementado | `category_a/institutional.py:NAIA002_LegalNamePresent` | ok |
| NAIA-007 | declarado | pendente | — | gap-implementacao |
| NAIA-150 | declarado | pendente onda 2 | — | scheduled |
| NAIA-180 | declarado | depende coleta cross-LLM | — | scheduled-onda-coleta |
| ... | | | | |

### N.2 PR canônico para o playbook

Um PR mensal automatizado (`update-playbook-links.yml`) atualiza o `audits/PLAYBOOK-AUDITORIA-NAIA.md` adicionando, ao lado de cada linha de check, o link permanente para o arquivo + função executável. Exemplo do diff:

```diff
- | NAIA-001 | EducationalOrganization presente em `/` | P0 |
+ | NAIA-001 | EducationalOrganization presente em `/` | P0 | [`category_a/institutional.py`](../src/naia/checks/category_a/institutional.py) |
```

A reconciliação é leitura obrigatória na revisão trimestral do playbook por Bruno Azambuja e Alexandre Caramaschi: itens `gap-implementacao` viram backlog imediato; itens `scheduled-onda-coleta` ganham marco do `06-marcos-criticos-2026.md`.

### N.3 Versionamento conjunto

Cada release do `geo-platform` que adiciona/altera checks bumpa também a versão do playbook (semver). A engine grava `playbook_version` em cada `audit_id` do `fct_schema_audit` para garantir que séries históricas de Schema Coverage Score sejam comparáveis ao longo do tempo (mudança de bateria de checks invalida comparações pré-versão). Política: bump major em mudança de fórmula do score; minor em adição de check; patch em correção de implementação.

---

## Apêndice — Cronograma de implementação

| Marco | Data | Entrega |
|---|---|---|
| M06 piloto | 30-05-2026 | Categorias A, B, E, F implementadas; engine roda em modo `spot-p0p1` quinzenal; `ci-naia-spot-check-biweekly.yml` ativo; Schema Coverage Score persistido em `fct_schema_audit`. |
| M07 expansão | 15-06-2026 | Categorias C, D, G implementadas; modo `full` mensal ativo; `ci-naia-audit-monthly.yml` ativo. |
| M08 Voice Guard | 02-06-2026 | Voice Guard Service em produção; CLI `voice-guard check` + `fix`; `ci-voice-guard.yml` em PR; pre-commit hook em `geo-ipog`; valida Peça 1 HBR de Alexandre Caramaschi. |
| M09 competitivo | 30-06-2026 | Modo `competitor` ativo; `cron-naia-competitors.yml` mensal; matriz competitiva auto-atualizada. |
| M10 cross-LLM | 31-07-2026 | Categoria I (citações cross-LLM) integrada com `geo-collector`; KPI 4 cruza com KPI 1/2/3. |
| M12 polimento | 31-12-2026 | Categorias H e J completas; cobertura playbook → código atinge 95%+; documento `audits/COBERTURA-CHECKS.md` automatizado. |

A entrega segue paralelismo agressivo: três sub-agents Opus tocam categorias A+B (TI/Schema institucional+curso), C+D (publishers/Schema editorial+pessoas) e E+F (sinais técnicos crawlers) em paralelo na semana 26-30/05, com integração final no engine no dia 30. Voice Guard é construído em paralelo por agent dedicado, reaproveitando código existente em `C:/Sandyboxclaude/scripts/python/voice_guard.py` (memória `feedback_alexandre_voice`).

---

> **Fim do dossiê.** Ver `docs/tech-stack/01-solution-architecture.md` (Bloco B.2 e B.3) para o lugar canônico do NAIA Audit Engine e Voice Guard Service na arquitetura macro; `docs/tech-stack/02-data-engineering.md` (`fct_schema_audit`, `fct_voice_guard_runs`) para schema do warehouse; `audits/PLAYBOOK-AUDITORIA-NAIA.md` para a fonte conceitual de cada check; `content/VOICE-GUIDE.md` para a fonte editorial das quatro dimensões.
