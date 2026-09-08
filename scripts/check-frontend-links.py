#!/usr/bin/env python3
"""Confere a integridade do HTML consolidado antes do deploy.

Executar da raiz do repositório: python3 scripts/check-frontend-links.py
O diretório padrão é sempre site/dist, relativo a este arquivo. O gate usa
somente a biblioteca padrão e não acessa a rede nem grava arquivos.

Escopo: links HTTP(S) do próprio domínio, fragmentos de páginas HTML, arquivos
referenciados por src/srcset/poster, recursos de link e módulos das ilhas Astro,
um H1 e um main por página, além de IDs únicos. A checagem inclui páginas 404. Endereços externos
e protocolos como mailto/tel/data não correspondem a arquivos deste build.
A inspeção visual, o comportamento após hidratação e imports dentro de JS/CSS
continuam cobertos pelas outras etapas de QA.

Retorno: zero quando o artefato está íntegro; um quando falta o build ou quando
existe falha. O relatório de stdout limita os exemplos para manter o CI legível.
"""

from collections import Counter
from dataclasses import dataclass, field
from functools import lru_cache
from html.parser import HTMLParser
from pathlib import Path
import sys
from urllib.parse import unquote, urljoin, urlsplit


SITE_ORIGIN = "https://posgraduacaopsicologia.com"
SITE_HOST = urlsplit(SITE_ORIGIN).hostname
DIST_ROOT = Path(__file__).resolve().parents[1] / "site" / "dist"
RESOURCE_LINK_RELS = {
    "stylesheet", "preload", "modulepreload", "icon", "apple-touch-icon", "manifest"
}
EXAMPLE_LIMIT = 20


def srcset_urls(value: str):
    """Separa URLs preservando as vírgulas internas de data URIs."""
    position = 0
    while position < len(value):
        while position < len(value) and (value[position].isspace() or value[position] == ","):
            position += 1
        start = position
        while position < len(value) and not value[position].isspace():
            position += 1
        token = value[start:position]
        if not token:
            break
        yield token.rstrip(",")
        if token.endswith(","):
            continue
        parentheses = 0
        while position < len(value):
            char = value[position]
            position += 1
            if char == "(":
                parentheses += 1
            elif char == ")":
                parentheses = max(parentheses - 1, 0)
            elif char == "," and parentheses == 0:
                break


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids: list[str] = []
        self.named_anchors: set[str] = set()
        self.links: list[str] = []
        self.resources: list[str] = []
        self.h1_count = 0
        self.main_count = 0
        self.base_href: str | None = None

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if attrs.get("id"):
            self.ids.append(attrs["id"])
        if tag == "a":
            if attrs.get("href"):
                self.links.append(attrs["href"])
            if attrs.get("name"):
                self.named_anchors.add(attrs["name"])
        if tag == "h1":
            self.h1_count += 1
        if tag == "main":
            self.main_count += 1
        if tag == "base" and self.base_href is None and attrs.get("href"):
            self.base_href = attrs["href"]
        for name in ("src", "poster", "component-url", "renderer-url"):
            if attrs.get(name):
                self.resources.append(attrs[name])
        for name in ("srcset", "imagesrcset"):
            if attrs.get(name):
                self.resources.extend(srcset_urls(attrs[name]))
        if tag == "link" and set((attrs.get("rel") or "").lower().split()) & RESOURCE_LINK_RELS:
            if attrs.get("href"):
                self.resources.append(attrs["href"])
        if tag in ("image", "use"):
            resource = attrs.get("href") or attrs.get("xlink:href")
            if resource:
                self.resources.append(resource)


@dataclass
class AuditResult:
    pages: int = 0
    links: int = 0
    resources: int = 0
    failures: Counter = field(default_factory=Counter)
    examples: list[str] = field(default_factory=list)

    def fail(self, category: str, message: str):
        self.failures[category] += 1
        if len(self.examples) < EXAMPLE_LIMIT:
            self.examples.append(f"{category}: {message}")


def page_url(root: Path, file: Path) -> str:
    relative = file.relative_to(root).as_posix()
    if relative.endswith("/index.html"):
        relative = relative[:-len("index.html")]
    elif relative == "index.html":
        relative = ""
    return SITE_ORIGIN + "/" + relative


@lru_cache(maxsize=16384)
def resolve_target(root: Path, path: str, *, resource: bool = False) -> Path | None:
    """Resolve rotas estáticas sem aceitar fallback para a home ou sair de dist."""
    try:
        target = (root / unquote(path).lstrip("/")).resolve()
        target.relative_to(root)
    except (ValueError, OSError):
        return None
    if target.is_file():
        return target
    if resource:
        return None
    candidates = [target / "index.html"]
    if not target.suffix:
        candidates.append(target.with_suffix(".html"))
    for candidate in candidates:
        try:
            candidate = candidate.resolve()
            candidate.relative_to(root)
        except (ValueError, OSError):
            continue
        if candidate.is_file():
            return candidate
    return None


def local_url(base: str, reference: str):
    parsed = urlsplit(urljoin(base, reference))
    if parsed.scheme not in ("http", "https") or parsed.hostname != SITE_HOST:
        return None
    return parsed


def audit(root: Path) -> AuditResult:
    root = root.resolve()
    resolve_target.cache_clear()
    result = AuditResult()
    if not (root / "index.html").is_file():
        result.fail("Artefato ausente", f"{root}/index.html não existe; execute o build primeiro.")
        return result
    parsed_pages: dict[Path, PageParser] = {}
    for file in sorted(root.rglob("*.html")):
        parser = PageParser()
        try:
            parser.feed(file.read_text(encoding="utf-8"))
            parser.close()
        except (UnicodeError, OSError) as error:
            result.fail("HTML ilegível", f"{file.relative_to(root)}: {error}")
            continue
        parsed_pages[file.resolve()] = parser
    result.pages = len(parsed_pages)

    for file, page in parsed_pages.items():
        route = "/" + file.relative_to(root).as_posix()
        base = page_url(root, file)
        if page.base_href:
            base = urljoin(base, page.base_href)
        if page.h1_count != 1:
            result.fail("H1 inválido", f"{route} possui {page.h1_count}; esperado: um.")
        if page.main_count != 1:
            result.fail("Main inválido", f"{route} possui {page.main_count}; esperado: um.")
        for identifier, count in Counter(page.ids).items():
            if count > 1:
                result.fail("ID duplicado", f"{route}: #{identifier} aparece {count} vezes.")

        for reference in page.links:
            try:
                parsed = local_url(base, reference)
            except ValueError:
                result.fail("URL inválida", f"{route} → {reference}")
                continue
            if parsed is None:
                continue
            result.links += 1
            target = resolve_target(root, parsed.path)
            if target is None:
                result.fail("Link ausente", f"{route} → {reference}")
                continue
            # Text fragments são instruções do navegador, não IDs do documento.
            fragment = unquote(parsed.fragment.split(":~:", 1)[0])
            if fragment and target in parsed_pages:
                destination = parsed_pages[target]
                if fragment not in destination.ids and fragment not in destination.named_anchors:
                    result.fail("Âncora ausente", f"{route} → {reference}")

        for reference in page.resources:
            try:
                parsed = local_url(base, reference)
            except ValueError:
                result.fail("URL inválida", f"{route} → {reference}")
                continue
            if parsed is None:
                continue
            result.resources += 1
            if resolve_target(root, parsed.path, resource=True) is None:
                result.fail("Recurso ausente", f"{route} → {reference}")

    return result


def main(root: Path = DIST_ROOT) -> int:
    result = audit(root)
    print(f"Auditoria estrutural: {result.pages} páginas HTML, {result.links} links internos "
          f"e {result.resources} referências a recursos locais.")
    if result.failures:
        print("Falhas: " + "; ".join(f"{category}: {count}" for category, count in result.failures.items()))
        for example in result.examples:
            print(f"  - {example}")
        remaining = sum(result.failures.values()) - len(result.examples)
        if remaining > 0:
            print(f"  Outros {remaining} achados foram omitidos deste resumo.")
        print("Deploy bloqueado: corrija os caminhos ou a estrutura antes de publicar.")
        return 1
    print("Aprovado: nenhum link, âncora ou recurso ausente; H1, main e IDs válidos em todas as páginas.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
