#!/usr/bin/env python3
"""Lint do grafo wiki/ no padrao Karpathy LLM Wiki.

Cheques:
  1. Frontmatter YAML presente e com campos minimos.
  2. Cross-links [[slug]] apontam para paginas existentes ou para o
     backlog explicito em wiki/index.md.
  3. Detecta orfaos (paginas sem inbound link em outras paginas ou no
     index).
  4. Detecta stale claims (campo updated mais antigo que STALE_DAYS).
  5. Detecta conflitos marcados com [CONFLITO] no corpo.

Uso:
  python scripts/wiki/lint.py             # roda em wiki/ e imprime relatorio
  python scripts/wiki/lint.py --json      # saida JSON para CI
  python scripts/wiki/lint.py --fix-log   # apenda entrada de lint em log.md
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import datetime, date, timedelta
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
WIKI_DIR = REPO_ROOT / "wiki"
INDEX_FILE = WIKI_DIR / "index.md"
LOG_FILE = WIKI_DIR / "log.md"

FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)
CROSSLINK_RE = re.compile(r"\[\[([a-zA-Z0-9_\-\/]+)\]\]")
CONFLITO_RE = re.compile(r"\[CONFLITO[^\]]*\]")
BACKLOG_RE = re.compile(r"`\[\[([a-zA-Z0-9_\-\/]+)\]\]`")

REQUIRED_FRONTMATTER = {"name", "type", "status", "created", "updated"}
STALE_DAYS = 90


def load_pages() -> dict[str, Path]:
    pages = {}
    for md in WIKI_DIR.rglob("*.md"):
        if md.name in {"README.md", "index.md", "log.md"}:
            continue
        slug = md.stem
        pages[slug] = md
    return pages


def parse_frontmatter(text: str) -> dict | None:
    m = FRONTMATTER_RE.match(text)
    if not m:
        return None
    fm_text = m.group(1)
    fm = {}
    current_key = None
    for line in fm_text.splitlines():
        if not line.strip():
            continue
        if line.startswith(("  -", "    -")):
            if current_key:
                fm.setdefault(current_key, [])
                if isinstance(fm[current_key], list):
                    fm[current_key].append(line.strip().lstrip("-").strip())
            continue
        if ":" in line and not line.startswith(" "):
            key, _, value = line.partition(":")
            key = key.strip()
            value = value.strip()
            current_key = key
            if value:
                fm[key] = value
            else:
                fm[key] = []
    return fm


def load_backlog() -> set[str]:
    if not INDEX_FILE.exists():
        return set()
    text = INDEX_FILE.read_text(encoding="utf-8")
    return {m.group(1).split("/")[-1] for m in BACKLOG_RE.finditer(text)}


def collect_inbound(pages: dict[str, Path]) -> dict[str, set[str]]:
    inbound: dict[str, set[str]] = {slug: set() for slug in pages}
    index_text = INDEX_FILE.read_text(encoding="utf-8") if INDEX_FILE.exists() else ""
    for slug in pages:
        if slug in index_text:
            inbound[slug].add("index.md")
    for slug, path in pages.items():
        text = path.read_text(encoding="utf-8")
        for m in CROSSLINK_RE.finditer(text):
            target = m.group(1).split("/")[-1]
            if target in inbound and target != slug:
                inbound[target].add(slug)
    return inbound


def parse_date(value: str) -> date | None:
    if not isinstance(value, str):
        return None
    try:
        return datetime.strptime(value.strip(), "%Y-%m-%d").date()
    except ValueError:
        return None


def lint(verbose: bool = True) -> dict:
    pages = load_pages()
    backlog = load_backlog()
    inbound = collect_inbound(pages)

    findings: dict[str, list] = {
        "missing_frontmatter": [],
        "incomplete_frontmatter": [],
        "broken_crosslinks": [],
        "orphans": [],
        "stale": [],
        "conflitos": [],
    }

    today = date.today()
    threshold = today - timedelta(days=STALE_DAYS)

    for slug, path in pages.items():
        text = path.read_text(encoding="utf-8")
        rel = path.relative_to(REPO_ROOT).as_posix()

        fm = parse_frontmatter(text)
        if fm is None:
            findings["missing_frontmatter"].append(rel)
            continue
        missing = REQUIRED_FRONTMATTER - set(fm.keys())
        if missing:
            findings["incomplete_frontmatter"].append({
                "page": rel,
                "missing": sorted(missing),
            })

        for m in CROSSLINK_RE.finditer(text):
            target = m.group(1).split("/")[-1]
            if target == slug:
                continue
            if target in pages:
                continue
            if target in backlog:
                continue
            findings["broken_crosslinks"].append({
                "page": rel,
                "target": target,
            })

        updated = parse_date(fm.get("updated", ""))
        if updated and updated < threshold:
            findings["stale"].append({
                "page": rel,
                "updated": updated.isoformat(),
                "days": (today - updated).days,
            })

        if CONFLITO_RE.search(text):
            findings["conflitos"].append(rel)

    for slug, refs in inbound.items():
        if not refs:
            findings["orphans"].append(pages[slug].relative_to(REPO_ROOT).as_posix())

    summary = {
        "total_pages": len(pages),
        "backlog_size": len(backlog),
        "issues": {k: len(v) for k, v in findings.items()},
        "findings": findings,
        "run_at": datetime.now().isoformat(timespec="seconds"),
    }

    if verbose:
        print_report(summary)

    return summary


def print_report(summary: dict) -> None:
    print(f"Wiki lint — {summary['run_at']}")
    print(f"  paginas catalogadas: {summary['total_pages']}")
    print(f"  backlog declarado: {summary['backlog_size']}")
    print()
    for category, count in summary["issues"].items():
        marker = "OK" if count == 0 else "ALERTA"
        print(f"  [{marker}] {category}: {count}")
    print()

    findings = summary["findings"]
    for category, items in findings.items():
        if not items:
            continue
        print(f"--- {category} ---")
        for item in items[:50]:
            print(f"  {item}")
        if len(items) > 50:
            print(f"  ... mais {len(items) - 50}")
        print()


def append_log(summary: dict) -> None:
    line = (
        f"{date.today().isoformat()} | lint | scripts/wiki/lint.py | "
        f"orfaos={summary['issues']['orphans']} "
        f"broken={summary['issues']['broken_crosslinks']} "
        f"stale={summary['issues']['stale']} "
        f"conflitos={summary['issues']['conflitos']} | wiki/log.md\n"
    )
    with LOG_FILE.open("a", encoding="utf-8") as f:
        f.write(line)


def main() -> int:
    parser = argparse.ArgumentParser(description="Lint do grafo wiki/")
    parser.add_argument("--json", action="store_true", help="saida JSON")
    parser.add_argument("--fix-log", action="store_true", help="apenda entrada em wiki/log.md")
    args = parser.parse_args()

    summary = lint(verbose=not args.json)

    if args.json:
        print(json.dumps(summary, indent=2, ensure_ascii=False))

    if args.fix_log:
        append_log(summary)

    total_issues = sum(v for k, v in summary["issues"].items() if k != "stale")
    return 0 if total_issues == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
