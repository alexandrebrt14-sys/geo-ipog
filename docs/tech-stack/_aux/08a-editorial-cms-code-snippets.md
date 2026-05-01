# 08a — Editorial CMS · Snippets de Código

Bundle de snippets prontos para colar que sustentam o sistema editorial do programa GEO IPOG (executor Brasil GEO, head Alexandre Caramaschi — CEO da Brasil GEO, ex-CMO da Semantix Nasdaq, cofundador da AI Brasil). Decisão arquitetural canônica em ADR-006 do `01-solution-architecture.md`: Markdown versionado em Git + Voice Guard CI, sem CMS proprietário. Audiência operacional é Bruno Azambuja (Marketing IPOG), que precisa publicar peça em menos de 30 minutos de overhead.

Os 4 blocos abaixo (A — Frontmatter, B — CLI editorial, C — Schema Builder, D — Estrutura + atalhos) cobrem o caminho completo, do template ao deploy.

---

## Bloco A — Frontmatter YAML canônico

Frontmatter da Peça 1 do ciclo Alexandre, "A categoria que ainda não existe", publicada em 02-06-2026. Arquivo `content/peças-hbr/2026-06-02-categoria-que-ainda-nao-existe.md`.

```yaml
---
# ===== Identidade da peça =====
title: "A categoria que ainda não existe"
subtitle: "Por que Psicologia Organizacional precisa de uma nova economia de evidência antes de virar disciplina dominante"
slug: "categoria-que-ainda-nao-existe"
piece_id: "hbr-001-alexandre"
ciclo: "fase-2-hbr"
ordem_no_ciclo: 1

# ===== Autoria =====
authors:
  - alexandre-caramaschi
coauthors: []
revisor_editorial: "bruno-azambuja"
revisor_academico: "ronan-maia"

# ===== Taxonomia GEO =====
cluster: "organizacional"
subcluster: "estrategia-de-categoria"
persona_alvo: "rh-nao-psicologo"
prompt_ancora: "como Psicologia Organizacional vira diferencial competitivo em RH sem virar terapia corporativa"

# ===== Ementa HBR (6 dimensões booleanas) =====
ementa_dimensoes:
  abertura_impacto: true
  tese_contraintuitiva: true
  evidencia_quantitativa: true
  mecanismo_causal: true
  decisao_pessoal: true
  proximo_passo_acionavel: true

# ===== Quality gates =====
hbr_format_score: 92
voice_guard_score: 84
voice_guard_breakdown:
  clichê: 28
  bloom: 27
  naming: 24
  hbr: 14
schema_validacao: "passed"
schema_validator_version: "schema-dts-1.1.2"

# ===== Publicação =====
publish_at: "2026-06-02T07:00:00-03:00"
status: "agendado"
canonical_url: "https://geo.ipog.edu.br/insights/categoria-que-ainda-nao-existe"
language: "pt-BR"
reading_time_min: 9
word_count: 2180

# ===== Cross-link com produto =====
related_product:
  type: "EducationalOccupationalProgram"
  id: "ipog-mba-online-psicologia-organizacional-trabalho"
  cta: "Conheça o MBA Online em Psicologia Organizacional e do Trabalho do IPOG"
  cta_url: "https://www.ipog.edu.br/cursos/mba/psicologia-organizacional-do-trabalho-online/"
  cta_position: "after-section-3"

# ===== Telemetria =====
ga4_utm:
  source: "ipog-insights"
  medium: "hbr-piece"
  campaign: "fase2-alexandre-ciclo1"
  content: "categoria-que-ainda-nao-existe"
ga4_event_d14: true

# ===== Schema overrides =====
schema_article_overrides: {}

# ===== Mídia =====
hero_image: "/images/hbr/categoria-que-ainda-nao-existe/hero.webp"
hero_image_alt: "Diagrama mostrando uma categoria de mercado nascente em Psicologia Organizacional"
og_image: "/images/hbr/categoria-que-ainda-nao-existe/og.webp"
---
```

Frontmatter do autor canônico, em `content/autores/alexandre-caramaschi.yaml`.

```yaml
# content/autores/alexandre-caramaschi.yaml
slug: "alexandre-caramaschi"
nome: "Alexandre Caramaschi"
nome_curto: "Alexandre"
credencial_canonica: "CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil"
credencial_curta: "CEO da Brasil GEO"
bio: >
  Alexandre Caramaschi é CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq) e
  cofundador da AI Brasil. Lidera o programa GEO do IPOG, articulando
  Psicologia Organizacional, dados e estratégia de categoria para o mercado
  brasileiro de pós-graduação.
foto: "/images/autores/alexandre-caramaschi.webp"
foto_alt: "Retrato de Alexandre Caramaschi, CEO da Brasil GEO"
linkedin: "https://www.linkedin.com/in/alexandrecaramaschi/"
site_pessoal: "https://alexandrecaramaschi.com"
lattes: "http://lattes.cnpq.br/0000000000000000"
orcid: "0000-0002-0000-0001"
twitter: null
email_publico: "alexandre@brasilgeo.com.br"
empresas:
  - nome: "Brasil GEO"
    cargo: "CEO"
    inicio: "2024-01"
  - nome: "Semantix"
    cargo: "CMO"
    inicio: "2021-03"
    fim: "2023-12"
  - nome: "AI Brasil"
    cargo: "Cofundador"
    inicio: "2018-06"
papeis_no_programa:
  - "head-editorial-fase-2"
  - "autor-ciclo-1-hbr"
schema_person_id: "https://geo.ipog.edu.br/autores/alexandre-caramaschi#Person"
```

---

## Bloco B — CLI editorial (geo-editorial)

Arquivo `scripts/editorial/cli.py`. Executável com `python scripts/editorial/cli.py <comando>` ou via Makefile/justfile.

```python
# scripts/editorial/cli.py
"""
geo-editorial — CLI para fluxo editorial do programa GEO IPOG.

Comandos:
- new <tipo> <slug>  cria nova peça do template apropriado
- validate <file>    roda Voice Guard + NAIA preview do Schema
- preview <file>     renderiza peça localmente em http://localhost:4321
- publish <file>     valida, gera Schema, faz deploy no CMS IPOG
"""
from __future__ import annotations

import asyncio
import sys
from datetime import datetime, timezone, timedelta
from pathlib import Path
from typing import Annotated, Literal

import frontmatter  # python-frontmatter
import httpx
import typer
from pydantic import BaseModel, Field, ValidationError, field_validator
from rich.console import Console
from rich.panel import Panel
from rich.progress import Progress, SpinnerColumn, TextColumn
from rich.table import Table

# ===== Constantes canônicas =====
ROOT = Path(__file__).resolve().parents[2]
CONTENT_DIR = ROOT / "content" / "peças-hbr"
AUTORES_DIR = ROOT / "content" / "autores"
TEMPLATE_PATH = CONTENT_DIR / "_TEMPLATE.md"
VOICE_GUARD_URL = "http://localhost:8081/voice-guard/check"
SCHEMA_VALIDATOR_URL = "http://localhost:8082/schema/validate"
PUBLISHER_URL = "http://localhost:8083/publish"
TZ_BR = timezone(timedelta(hours=-3))

console = Console()
app = typer.Typer(
    name="geo-editorial",
    help="CLI editorial do programa GEO IPOG (Brasil GEO).",
    rich_markup_mode="rich",
    no_args_is_help=True,
)

# ===== Modelos pydantic =====
class EmentaDimensoes(BaseModel):
    abertura_impacto: bool
    tese_contraintuitiva: bool
    evidencia_quantitativa: bool
    mecanismo_causal: bool
    decisao_pessoal: bool
    proximo_passo_acionavel: bool

    @property
    def cobertura(self) -> int:
        return sum(1 for v in self.model_dump().values() if v)


class RelatedProduct(BaseModel):
    type: Literal["EducationalOccupationalProgram", "Course", "Service"]
    id: str
    cta: str
    cta_url: str
    cta_position: str = "after-section-3"


class GA4UTM(BaseModel):
    source: str
    medium: str
    campaign: str
    content: str


class Frontmatter(BaseModel):
    title: str = Field(min_length=8, max_length=140)
    subtitle: str = Field(min_length=10, max_length=240)
    slug: str = Field(pattern=r"^[a-z0-9][a-z0-9\-]{2,80}$")
    piece_id: str
    cluster: Literal["organizacional", "clinico", "social", "educacional"]
    persona_alvo: str
    prompt_ancora: str
    authors: list[str]
    coauthors: list[str] = []
    ementa_dimensoes: EmentaDimensoes
    hbr_format_score: int = Field(ge=0, le=100)
    voice_guard_score: int = Field(ge=0, le=100)
    schema_validacao: Literal["passed", "warning", "failed", "pending"]
    publish_at: datetime
    status: Literal["draft", "review", "agendado", "publicado", "arquivado"]
    related_product: RelatedProduct
    ga4_utm: GA4UTM
    schema_article_overrides: dict = {}

    @field_validator("voice_guard_score")
    @classmethod
    def _check_min_score(cls, v: int) -> int:
        if v < 70:
            raise ValueError("voice_guard_score abaixo de 70 — peça não pode publicar")
        return v


# ===== Helpers =====
def _read_piece(path: Path) -> tuple[Frontmatter, str]:
    if not path.exists():
        console.print(f"[red]Arquivo não encontrado:[/red] {path}")
        raise typer.Exit(code=2)
    post = frontmatter.load(path)
    try:
        meta = Frontmatter.model_validate(post.metadata)
    except ValidationError as exc:
        console.print(Panel.fit(str(exc), title="[red]Frontmatter inválido", border_style="red"))
        raise typer.Exit(code=3) from exc
    return meta, post.content


def _render_template(slug: str, tipo: str) -> str:
    today = datetime.now(TZ_BR).strftime("%Y-%m-%d")
    return f"""---
title: "TODO — título HBR de até 12 palavras"
subtitle: "TODO — subtítulo de uma frase"
slug: "{slug}"
piece_id: "{tipo}-{slug}"
cluster: "organizacional"
persona_alvo: "rh-nao-psicologo"
prompt_ancora: "TODO — prompt-âncora que esta peça responde"
authors: [alexandre-caramaschi]
coauthors: []
ementa_dimensoes:
  abertura_impacto: false
  tese_contraintuitiva: false
  evidencia_quantitativa: false
  mecanismo_causal: false
  decisao_pessoal: false
  proximo_passo_acionavel: false
hbr_format_score: 0
voice_guard_score: 0
schema_validacao: "pending"
publish_at: "{today}T07:00:00-03:00"
status: "draft"
related_product:
  type: "EducationalOccupationalProgram"
  id: "ipog-mba-online-psicologia-organizacional-trabalho"
  cta: "Conheça o MBA Online em Psicologia Organizacional e do Trabalho do IPOG"
  cta_url: "https://www.ipog.edu.br/cursos/mba/psicologia-organizacional-do-trabalho-online/"
  cta_position: "after-section-3"
ga4_utm:
  source: "ipog-insights"
  medium: "hbr-piece"
  campaign: "fase2-{slug}"
  content: "{slug}"
schema_article_overrides: {{}}
---

# TODO — Abertura impacto

Parágrafo 1 de impacto, dado contraintuitivo, sem clichê.

## Tese

## Evidência

## Mecanismo

## Decisão pessoal

## Próximo passo
"""


async def _call_voice_guard(text: str, frontmatter_meta: dict) -> dict:
    payload = {"text": text, "frontmatter": frontmatter_meta}
    async with httpx.AsyncClient(timeout=30.0) as client:
        resp = await client.post(VOICE_GUARD_URL, json=payload)
        resp.raise_for_status()
        return resp.json()


async def _call_schema_validator(schema_jsonld: dict) -> dict:
    async with httpx.AsyncClient(timeout=30.0) as client:
        resp = await client.post(SCHEMA_VALIDATOR_URL, json=schema_jsonld)
        resp.raise_for_status()
        return resp.json()


async def _call_publisher(path: Path, schema_jsonld: dict) -> dict:
    async with httpx.AsyncClient(timeout=60.0) as client:
        resp = await client.post(
            PUBLISHER_URL,
            json={
                "path": str(path.relative_to(ROOT)),
                "schema_jsonld": schema_jsonld,
            },
        )
        resp.raise_for_status()
        return resp.json()


def _print_score_table(vg: dict) -> None:
    table = Table(title="Voice Guard — 4 dimensões", title_style="bold cyan")
    table.add_column("Dimensão", style="cyan")
    table.add_column("Peso", justify="right")
    table.add_column("Score", justify="right")
    for dim, peso in [("clichê", 30), ("bloom", 30), ("naming", 25), ("hbr", 15)]:
        score = vg["breakdown"].get(dim, 0)
        cor = "green" if score >= peso * 0.8 else "yellow" if score >= peso * 0.5 else "red"
        table.add_row(dim, str(peso), f"[{cor}]{score}[/{cor}]")
    table.add_row("[bold]TOTAL[/bold]", "100", f"[bold]{vg['total']}[/bold]")
    console.print(table)


# ===== Comandos =====
@app.command()
def new(
    tipo: Annotated[str, typer.Argument(help="Tipo da peça: hbr, news, opiniao")],
    slug: Annotated[str, typer.Argument(help="Slug em kebab-case ASCII")],
) -> None:
    """Cria nova peça a partir do template apropriado."""
    if tipo not in {"hbr", "news", "opiniao"}:
        console.print(f"[red]Tipo inválido:[/red] {tipo}")
        raise typer.Exit(code=1)
    target = CONTENT_DIR / f"{datetime.now(TZ_BR).strftime('%Y-%m-%d')}-{slug}.md"
    if target.exists():
        console.print(f"[yellow]Arquivo já existe:[/yellow] {target}")
        raise typer.Exit(code=1)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(_render_template(slug, tipo), encoding="utf-8")
    console.print(Panel.fit(f"Peça criada em [cyan]{target}[/cyan]", border_style="green"))


@app.command()
def validate(file: Annotated[Path, typer.Argument(exists=True)]) -> None:
    """Roda Voice Guard + NAIA preview do Schema na peça."""
    meta, body = _read_piece(file)
    with Progress(SpinnerColumn(), TextColumn("[progress.description]{task.description}")) as p:
        t1 = p.add_task("Voice Guard...", total=None)
        vg = asyncio.run(_call_voice_guard(body, meta.model_dump(mode="json")))
        p.update(t1, completed=1)
    _print_score_table(vg)
    if vg["total"] < 70:
        console.print(f"[red]Voice Guard {vg['total']}/100 — abaixo do mínimo 70.[/red]")
        raise typer.Exit(code=4)
    from schema_builder import build_article_schema  # import lazy
    autor = (AUTORES_DIR / f"{meta.authors[0]}.yaml").read_text(encoding="utf-8")
    schema_jsonld = build_article_schema(meta.model_dump(mode="json"), body, autor)
    schema_check = asyncio.run(_call_schema_validator(schema_jsonld))
    cor = "green" if schema_check["status"] == "passed" else "yellow"
    console.print(f"[{cor}]Schema:[/] {schema_check['status']} — {schema_check.get('message', '')}")


@app.command()
def preview(file: Annotated[Path, typer.Argument(exists=True)]) -> None:
    """Renderiza peça localmente em http://localhost:4321."""
    meta, _ = _read_piece(file)
    console.print(Panel.fit(
        f"Preview de [cyan]{meta.slug}[/cyan]\n"
        f"http://localhost:4321/insights/{meta.slug}",
        border_style="cyan",
    ))
    import subprocess
    subprocess.run(["pnpm", "--filter", "site", "dev"], cwd=ROOT, check=False)


@app.command()
def publish(
    file: Annotated[Path, typer.Argument(exists=True)],
    skip_voice_guard: Annotated[bool, typer.Option(help="Pular Voice Guard — só admin")] = False,
) -> None:
    """Valida, gera Schema, faz deploy no CMS IPOG."""
    meta, body = _read_piece(file)
    if not skip_voice_guard:
        vg = asyncio.run(_call_voice_guard(body, meta.model_dump(mode="json")))
        if vg["total"] < 70:
            console.print(f"[red]Voice Guard {vg['total']} < 70 — bloqueado.[/red]")
            raise typer.Exit(code=4)
    from schema_builder import build_article_schema
    autor = (AUTORES_DIR / f"{meta.authors[0]}.yaml").read_text(encoding="utf-8")
    schema_jsonld = build_article_schema(meta.model_dump(mode="json"), body, autor)
    result = asyncio.run(_call_publisher(file, schema_jsonld))
    console.print(Panel.fit(
        f"Publicado em [cyan]{result['canonical_url']}[/cyan]\n"
        f"Build Vercel: {result['build_id']}\n"
        f"IndexNow: {result['indexnow_status']}",
        title="[green]Deploy concluído",
        border_style="green",
    ))


if __name__ == "__main__":
    try:
        app()
    except KeyboardInterrupt:
        console.print("[yellow]Cancelado pelo usuário.[/yellow]")
        sys.exit(130)
```

---

## Bloco C — Schema Builder (Article + Person + cross-link MBA)

Arquivo `scripts/editorial/schema_builder.py`. Gera JSON-LD canônico com `@graph` integrado.

```python
# scripts/editorial/schema_builder.py
"""
Gera JSON-LD canônico Article + Person + EducationalOccupationalProgram
para peça HBR publicada no programa GEO IPOG.

Cross-link: a peça `mentions` o programa MBA, o autor `worksFor` Brasil GEO,
o programa tem `provider` IPOG. Validação via schema-dts (TypeScript) ou pyld.
"""
from __future__ import annotations

import re
from datetime import datetime
from typing import Any, Literal

import yaml
from pydantic import BaseModel, Field, HttpUrl

# ===== Modelos canônicos =====
SITE_BASE = "https://geo.ipog.edu.br"
BRASIL_GEO_ORG_ID = "https://www.brasilgeo.com.br/#Organization"
IPOG_ORG_ID = "https://www.ipog.edu.br/#EducationalOrganization"


class PersonSchema(BaseModel):
    type_: Literal["Person"] = Field(default="Person", alias="@type")
    id_: str = Field(alias="@id")
    name: str
    jobTitle: str
    description: str
    image: HttpUrl
    url: HttpUrl
    sameAs: list[HttpUrl] = []
    worksFor: dict


class OrgSchema(BaseModel):
    type_: Literal["Organization"] = Field(default="Organization", alias="@type")
    id_: str = Field(alias="@id")
    name: str
    url: HttpUrl


class ProgramSchema(BaseModel):
    type_: Literal["EducationalOccupationalProgram"] = Field(
        default="EducationalOccupationalProgram", alias="@type"
    )
    id_: str = Field(alias="@id")
    name: str
    provider: dict
    url: HttpUrl
    educationalProgramMode: str = "online"
    occupationalCategory: str = "Psicologia Organizacional e do Trabalho"


class ArticleSchema(BaseModel):
    type_: Literal["Article"] = Field(default="Article", alias="@type")
    id_: str = Field(alias="@id")
    headline: str = Field(max_length=110)
    alternativeHeadline: str | None = None
    description: str
    inLanguage: str = "pt-BR"
    datePublished: str
    dateModified: str
    author: dict
    publisher: dict
    mainEntityOfPage: dict
    image: HttpUrl
    keywords: list[str]
    articleSection: str
    wordCount: int
    mentions: list[dict] = []
    isPartOf: dict | None = None


# ===== Helpers =====
def _extract_first_image(body: str, fallback: str) -> str:
    match = re.search(r"!\[[^\]]*\]\(([^)]+)\)", body)
    if match:
        url = match.group(1)
        if url.startswith("http"):
            return url
        return f"{SITE_BASE}{url}"
    return fallback


def _extract_keywords(meta: dict, body: str) -> list[str]:
    base = [meta["cluster"], meta["persona_alvo"], "Psicologia Organizacional"]
    headings = re.findall(r"^#{2,3}\s+(.+)$", body, flags=re.MULTILINE)
    base += [h.strip().lower() for h in headings[:5]]
    return list(dict.fromkeys(base))


def _article_section_from_cluster(cluster: str) -> str:
    return {
        "organizacional": "Psicologia Organizacional",
        "clinico": "Psicologia Clínica",
        "social": "Psicologia Social",
        "educacional": "Psicologia Educacional",
    }.get(cluster, "Insights GEO")


def _build_person(autor_yaml: str) -> dict:
    autor = yaml.safe_load(autor_yaml)
    return PersonSchema(
        **{
            "@id": autor["schema_person_id"],
            "name": autor["nome"],
            "jobTitle": autor["credencial_canonica"],
            "description": autor["bio"].strip(),
            "image": f"{SITE_BASE}{autor['foto']}",
            "url": autor["site_pessoal"],
            "sameAs": [autor["linkedin"]] + ([autor["lattes"]] if autor.get("lattes") else []),
            "worksFor": {"@id": BRASIL_GEO_ORG_ID},
        }
    ).model_dump(by_alias=True, exclude_none=True)


def _build_program(meta: dict) -> dict:
    rp = meta["related_product"]
    return ProgramSchema(
        **{
            "@id": f"{SITE_BASE}/produtos/{rp['id']}#Program",
            "name": rp["cta"].replace("Conheça o ", ""),
            "provider": {"@id": IPOG_ORG_ID},
            "url": rp["cta_url"],
        }
    ).model_dump(by_alias=True, exclude_none=True)


def _build_article(meta: dict, body: str, person_id: str, program_id: str) -> dict:
    canonical = f"{SITE_BASE}/insights/{meta['slug']}"
    image = _extract_first_image(body, f"{SITE_BASE}/images/hbr/{meta['slug']}/og.webp")
    pub_at = meta["publish_at"]
    if isinstance(pub_at, datetime):
        pub_at = pub_at.isoformat()
    return ArticleSchema(
        **{
            "@id": f"{canonical}#Article",
            "headline": meta["title"],
            "alternativeHeadline": meta.get("subtitle"),
            "description": meta.get("subtitle", meta["title"]),
            "datePublished": pub_at,
            "dateModified": pub_at,
            "author": {"@id": person_id},
            "publisher": {"@id": IPOG_ORG_ID},
            "mainEntityOfPage": {"@type": "WebPage", "@id": canonical},
            "image": image,
            "keywords": _extract_keywords(meta, body),
            "articleSection": _article_section_from_cluster(meta["cluster"]),
            "wordCount": len(body.split()),
            "mentions": [{"@id": program_id}],
            "isPartOf": {
                "@type": "Blog",
                "@id": f"{SITE_BASE}/insights#Blog",
                "name": "GEO IPOG Insights",
            },
        }
    ).model_dump(by_alias=True, exclude_none=True)


# ===== API pública =====
def build_article_schema(meta: dict, body: str, autor_yaml: str) -> dict:
    """Monta @graph com Article + Person + Org + Program cross-linkados."""
    person = _build_person(autor_yaml)
    program = _build_program(meta)
    article = _build_article(meta, body, person["@id"], program["@id"])
    overrides = meta.get("schema_article_overrides") or {}
    article.update(overrides)
    return {
        "@context": "https://schema.org",
        "@graph": [
            article,
            person,
            program,
            {
                "@type": "Organization",
                "@id": BRASIL_GEO_ORG_ID,
                "name": "Brasil GEO",
                "url": "https://www.brasilgeo.com.br",
            },
            {
                "@type": "EducationalOrganization",
                "@id": IPOG_ORG_ID,
                "name": "IPOG — Instituto de Pós-Graduação",
                "url": "https://www.ipog.edu.br",
            },
        ],
    }


def validate_jsonld(schema: dict) -> tuple[bool, list[str]]:
    """Validação manual leve contra schema-dts: campos obrigatórios + tipos."""
    errors: list[str] = []
    required_per_type = {
        "Article": {"headline", "datePublished", "author", "publisher", "image"},
        "Person": {"name", "jobTitle"},
        "EducationalOccupationalProgram": {"name", "provider", "url"},
    }
    for node in schema.get("@graph", []):
        t = node.get("@type")
        if t in required_per_type:
            missing = required_per_type[t] - node.keys()
            if missing:
                errors.append(f"{t} faltando campos: {sorted(missing)}")
        if t == "Article" and len(node.get("headline", "")) > 110:
            errors.append("Article.headline > 110 caracteres (Google reduz na SERP).")
    return (len(errors) == 0, errors)


# ===== Snippet de exemplo (Peça 1) =====
EXAMPLE_OUTPUT = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Article",
            "@id": "https://geo.ipog.edu.br/insights/categoria-que-ainda-nao-existe#Article",
            "headline": "A categoria que ainda não existe",
            "alternativeHeadline": "Por que Psicologia Organizacional precisa de uma nova economia de evidência antes de virar disciplina dominante",
            "datePublished": "2026-06-02T07:00:00-03:00",
            "author": {"@id": "https://geo.ipog.edu.br/autores/alexandre-caramaschi#Person"},
            "publisher": {"@id": "https://www.ipog.edu.br/#EducationalOrganization"},
            "image": "https://geo.ipog.edu.br/images/hbr/categoria-que-ainda-nao-existe/hero.webp",
            "keywords": ["organizacional", "rh-nao-psicologo", "Psicologia Organizacional"],
            "articleSection": "Psicologia Organizacional",
            "wordCount": 2180,
            "mentions": [
                {"@id": "https://geo.ipog.edu.br/produtos/ipog-mba-online-psicologia-organizacional-trabalho#Program"}
            ],
        },
        # ... Person, Program, Brasil GEO Org, IPOG Org omitidos por brevidade.
    ],
}
```

---

## Bloco D — Estrutura de pastas + atalhos para Bruno

Estrutura de pastas completa do sistema editorial dentro do repositório `geo-ipog`.

```
geo-ipog/
├── content/
│   ├── peças-hbr/
│   │   ├── _TEMPLATE.md
│   │   ├── 2026-06-02-categoria-que-ainda-nao-existe.md
│   │   ├── 2026-06-16-evidencia-de-que-rh-nao-e-departamento.md
│   │   ├── 2026-06-30-mecanismo-causal-de-cultura.md
│   │   └── ... (até 7 peças HBR Fase 2)
│   └── autores/
│       ├── alexandre-caramaschi.yaml
│       ├── ronan-maia.yaml
│       └── autores-convidados/
│           └── {slug}.yaml
├── scripts/
│   └── editorial/
│       ├── __init__.py
│       ├── cli.py
│       ├── schema_builder.py
│       ├── voice_guard_runner.py
│       ├── publisher.py
│       └── ga4_event_emitter.py
├── .github/
│   └── workflows/
│       ├── ci-editorial.yml
│       └── cron-pos-publish-d14.yml
├── docs/
│   └── tech-stack/
│       └── _aux/
│           └── 08a-editorial-cms-code-snippets.md
├── Makefile
├── justfile
├── pyproject.toml
└── README.md
```

`Makefile` com atalhos para Bruno Azambuja (cobertura: criar peça, validar, preview, publicar, CI local).

```makefile
# Makefile — atalhos editoriais GEO IPOG
.PHONY: help new validate preview publish lint test clean

PYTHON ?= python
CLI := $(PYTHON) scripts/editorial/cli.py

help:
	@echo "GEO IPOG — atalhos editoriais"
	@echo "  make new tipo=hbr slug=minha-peca   cria peça nova"
	@echo "  make validate file=content/peças-hbr/...md"
	@echo "  make preview file=content/peças-hbr/...md"
	@echo "  make publish file=content/peças-hbr/...md"
	@echo "  make lint                           ruff + mypy"
	@echo "  make test                           pytest"

new:
	$(CLI) new $(tipo) $(slug)

validate:
	$(CLI) validate $(file)

preview:
	$(CLI) preview $(file)

publish:
	$(CLI) publish $(file)

lint:
	ruff check scripts/
	mypy scripts/editorial/

test:
	pytest tests/editorial/ -v

clean:
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
```

`justfile` equivalente, opcional, para quem prefere `just`.

```just
# justfile — atalhos editoriais GEO IPOG (alternativa a Makefile)
default:
    @just --list

# Cria nova peça (tipo: hbr | news | opiniao)
new tipo slug:
    python scripts/editorial/cli.py new {{tipo}} {{slug}}

# Roda Voice Guard + Schema check
validate file:
    python scripts/editorial/cli.py validate {{file}}

# Preview local em http://localhost:4321
preview file:
    python scripts/editorial/cli.py preview {{file}}

# Publica no CMS IPOG (valida, gera Schema, deploy)
publish file:
    python scripts/editorial/cli.py publish {{file}}

# Lint + tipagem
lint:
    ruff check scripts/
    mypy scripts/editorial/

# Bateria de testes
test:
    pytest tests/editorial/ -v
```

`.github/workflows/ci-editorial.yml` — gate mínimo de CI que bloqueia merge se Voice Guard < 70.

```yaml
# .github/workflows/ci-editorial.yml
name: CI Editorial
on:
  pull_request:
    paths:
      - "content/peças-hbr/**"
      - "content/autores/**"
      - "scripts/editorial/**"
jobs:
  voice-guard:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.12" }
      - run: pip install -e ".[editorial]"
      - name: Roda Voice Guard em todas as peças alteradas
        run: |
          git diff --name-only origin/main...HEAD | grep "content/peças-hbr/.*\.md" | while read f; do
            python scripts/editorial/cli.py validate "$f"
          done
```

`.github/workflows/cron-pos-publish-d14.yml` — checagem D+14 das peças publicadas (LLM mention rate, GA4, GSC).

```yaml
# .github/workflows/cron-pos-publish-d14.yml
name: Pós-publicação D+14
on:
  schedule:
    - cron: "0 9 * * *"  # 06:00 BRT
  workflow_dispatch:
jobs:
  d14-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.12" }
      - run: pip install -e ".[editorial]"
      - name: Emite eventos GA4 + verifica indexação
        env:
          GSC_TOKEN: ${{ secrets.GSC_TOKEN }}
          GA4_API_SECRET: ${{ secrets.GA4_API_SECRET }}
        run: python scripts/editorial/ga4_event_emitter.py run-d14
```

Fluxo operacional Bruno (overhead total <30min): `make new tipo=hbr slug=...` → preencher → `make validate` → corrigir até score >=70 → `make publish`. CI de PR garante que nada com score baixo entra em main; cron D+14 emite telemetria de citação LLM. O CLI, o Schema Builder e os atalhos juntos cobrem a promessa do ADR-006: Markdown versionado + Voice Guard CI substituem o CMS proprietário sem perder rastreabilidade.
