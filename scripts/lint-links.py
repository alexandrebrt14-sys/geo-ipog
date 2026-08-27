#!/usr/bin/env python3
"""lint-links.py — cheque de link interno quebrado nas páginas do portal.

Motivo de existir: página nova costuma linkar rota que o autor supôs existir.
O build do Astro não reprova href morto, e o leitor descobre no 404. Este
script resolve cada `href="/..."` contra as rotas que os arquivos de
`site/src/pages/` realmente produzem.

Uso:
    python scripts/lint-links.py                 # varre site/src/pages
    python scripts/lint-links.py --changed       # só o que mudou vs origin/main
    python scripts/lint-links.py <arquivo> [...] # varre alvos

Saída: código 1 quando há href interno sem rota correspondente.
"""

from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
PAGES = RAIZ / "site" / "src" / "pages"

RE_HREF = re.compile(r'href="(/[^"]*)"')
# Rotas servidas fora de src/pages (arquivos estáticos em public/) ou geradas.
EXTERNAS_CONHECIDAS = {"/feed.xml", "/sitemap.xml", "/robots.txt", "/llms.txt"}


def rotas_do_portal() -> set[str]:
    rotas: set[str] = {"/"}
    for arq in PAGES.rglob("*.astro"):
        rel = arq.relative_to(PAGES).as_posix()[: -len(".astro")]
        if rel.endswith("/index"):
            rel = rel[: -len("/index")]
        if rel == "index":
            rotas.add("/")
            continue
        rotas.add("/" + rel)
    for arq in PAGES.rglob("*.ts"):
        rel = arq.relative_to(PAGES).as_posix()
        if rel.endswith(".ts"):
            rotas.add("/" + rel[: -len(".ts")])
    publico = RAIZ / "site" / "public"
    if publico.exists():
        for arq in publico.rglob("*"):
            if arq.is_file():
                rotas.add("/" + arq.relative_to(publico).as_posix())
    return rotas


def normalizar(href: str) -> str:
    href = href.split("#")[0].split("?")[0]
    if href != "/":
        href = href.rstrip("/")
    return href or "/"


def alvos_do_diff() -> list[Path]:
    saida = subprocess.run(
        ["git", "diff", "--name-only", "origin/main...HEAD"],
        cwd=RAIZ, capture_output=True, text=True, check=False,
    ).stdout
    nomes = set(saida.split())
    status = subprocess.run(
        ["git", "status", "--porcelain"],
        cwd=RAIZ, capture_output=True, text=True, check=False,
    ).stdout
    for linha in status.splitlines():
        nomes.add(linha[3:].strip())
    return [RAIZ / n for n in nomes if n.endswith(".astro")]


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = {a for a in sys.argv[1:] if a.startswith("--")}

    if "--changed" in flags:
        alvos = alvos_do_diff()
    elif args:
        alvos = [Path(a).resolve() for a in args]
    else:
        alvos = sorted(PAGES.rglob("*.astro"))
    alvos = [a for a in alvos if a.exists()]

    rotas = rotas_do_portal() | EXTERNAS_CONHECIDAS
    quebrados: list[tuple[str, str, int]] = []

    for alvo in alvos:
        fonte = alvo.read_text(encoding="utf-8")
        rel = alvo.relative_to(RAIZ).as_posix()
        for m in RE_HREF.finditer(fonte):
            href = normalizar(m.group(1))
            if href.startswith("//"):
                continue
            if href not in rotas:
                linha = fonte.count("\n", 0, m.start()) + 1
                quebrados.append((rel, href, linha))

    print(f"lint-links: {len(alvos)} arquivo(s), {len(rotas)} rota(s) conhecidas")
    for rel, href, linha in quebrados:
        print(f"  QUEBRADO {rel}:{linha} -> {href}")
    print(f"\nTotal: {len(quebrados)} link(s) interno(s) sem rota")
    return 1 if quebrados else 0


if __name__ == "__main__":
    raise SystemExit(main())
