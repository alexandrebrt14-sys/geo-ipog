"""
fetch_competitor_signals.py — quinzenal monitoring de robots.txt e llms.txt nos 10 concorrentes do programa GEO IPOG.

Uso:
    python scripts/fetch_competitor_signals.py [--out DATA_DIR]

Salva snapshots datados em DATA_DIR/YYYY-MM-DD/{slug}-{robots,llms}.txt
e gera um SUMMARY.md no diretório raiz de DATA_DIR com diff vs último snapshot.

Issue: #15
Cadência: quinzenal (segunda-feira). Pode rodar via GitHub Actions ou cron local.
"""

import argparse
import datetime as dt
import json
import os
import sys
import urllib.request
import urllib.error

COMPETITORS = [
    ("anhembi-morumbi", "https://pos.anhembi.br"),
    ("estacio", "https://www.estacio.br"),
    ("anhanguera", "https://www.anhanguera.com"),
    ("uninter", "https://www.uninter.com"),
    ("unicesumar", "https://www.unicesumar.edu.br"),
    ("puc-minas-virtual", "https://virtual.pucminas.br"),
    ("cetcc", "https://www.cetcc.com.br"),
    ("ibneuro", "https://www.ibneuro.com.br"),
    ("sirio-libanes-iep", "https://iep.hospitalsiriolibanes.org.br"),
    ("saint-paul-exame", "https://www.saintpaul.com.br"),
]

UA = "BrasilGEO-Monitor/1.0 (+https://brasilgeo.ai; contact: alexandre@brasilgeo.ai)"
TIMEOUT = 20


def fetch(url: str) -> tuple[int, bytes, str]:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/plain,*/*"})
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            return resp.status, resp.read(), resp.headers.get("Content-Type", "")
    except urllib.error.HTTPError as e:
        return e.code, b"", ""
    except Exception as e:
        return 0, str(e).encode("utf-8"), ""


def save(path: str, body: bytes) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "wb") as f:
        f.write(body)


def diff_against_previous(out_root: str, slug: str, kind: str, today_path: str) -> str | None:
    """Retorna 'NEW' se for primeira coleta, 'CHANGED' se conteúdo mudou, 'SAME' se igual,
    ou None se houver erro de leitura."""
    today_dir = os.path.basename(os.path.dirname(today_path))
    snapshots = sorted(d for d in os.listdir(out_root) if d != today_dir and not d.startswith("."))
    if not snapshots:
        return "NEW"
    prev_dir = snapshots[-1]
    prev_path = os.path.join(out_root, prev_dir, f"{slug}-{kind}.txt")
    if not os.path.exists(prev_path):
        return "NEW"
    try:
        with open(prev_path, "rb") as a, open(today_path, "rb") as b:
            return "SAME" if a.read() == b.read() else "CHANGED"
    except OSError:
        return None


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", default="data/monitoring/llms-robots-fetches", help="Diretório raiz de snapshots")
    args = parser.parse_args()

    today = dt.date.today().isoformat()
    out_root = args.out
    today_dir = os.path.join(out_root, today)
    os.makedirs(today_dir, exist_ok=True)

    results = []
    for slug, base in COMPETITORS:
        row = {"slug": slug, "base": base, "fetched_at": dt.datetime.utcnow().isoformat() + "Z"}
        for kind, suffix in (("robots", "/robots.txt"), ("llms", "/llms.txt")):
            url = base + suffix
            status, body, ctype = fetch(url)
            path = os.path.join(today_dir, f"{slug}-{kind}.txt")
            if status == 200 and body:
                save(path, body)
            else:
                save(path, f"# HTTP {status}\n# url: {url}\n# fetched_at: {row['fetched_at']}\n".encode("utf-8"))
            row[f"{kind}_status"] = status
            row[f"{kind}_bytes"] = len(body) if status == 200 else 0
            row[f"{kind}_content_type"] = ctype
            row[f"{kind}_diff"] = diff_against_previous(out_root, slug, kind, path)
            sys.stderr.write(f"  {slug:22s} {kind:6s} HTTP {status} {len(body):6d}B {row[f'{kind}_diff'] or 'N/A'}\n")
        results.append(row)

    summary = build_summary(today, results)
    summary_path = os.path.join(out_root, f"SUMMARY-{today}.md")
    with open(summary_path, "w", encoding="utf-8") as f:
        f.write(summary)

    json_path = os.path.join(today_dir, "_index.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump({"date": today, "results": results}, f, ensure_ascii=False, indent=2)

    sys.stderr.write(f"\nSnapshot completo: {today_dir}\nSumário: {summary_path}\n")
    return 0


def build_summary(today: str, results: list) -> str:
    out = []
    out.append(f"# Snapshot quinzenal robots.txt + llms.txt — {today}\n\n")
    out.append(f"> Coleta automática · issue #15 · script `scripts/fetch_competitor_signals.py`.\n\n")
    out.append(f"## Resumo executivo\n\n")
    llms_published = [r["slug"] for r in results if r["llms_status"] == 200 and r["llms_bytes"] > 0]
    waf_blocked = [r["slug"] for r in results if r["robots_status"] in (403, 0)]
    out.append(f"- **{len(results)} concorrentes** monitorados.\n")
    out.append(f"- **{len(llms_published)}/{len(results)}** publicaram `llms.txt`: {', '.join(llms_published) if llms_published else 'nenhum'}.\n")
    out.append(f"- **{len(waf_blocked)}/{len(results)}** bloqueiam crawlers (HTTP 403 ou timeout): {', '.join(waf_blocked) if waf_blocked else 'nenhum'}.\n")
    changes = [r["slug"] for r in results if r["robots_diff"] == "CHANGED" or r["llms_diff"] == "CHANGED"]
    new_llms = [r["slug"] for r in results if r["llms_diff"] == "NEW" and r["llms_status"] == 200]
    out.append(f"- **{len(changes)} mudanças** vs snapshot anterior: {', '.join(changes) if changes else 'nenhuma'}.\n")
    if new_llms:
        out.append(f"- **ALERTA: {len(new_llms)} concorrente(s) acabaram de publicar llms.txt**: {', '.join(new_llms)}.\n")
    out.append("\n## Tabela detalhada\n\n")
    out.append("| Slug | URL base | robots.txt | llms.txt | Diff robots | Diff llms |\n")
    out.append("|---|---|---|---|---|---|\n")
    for r in results:
        rb = f"HTTP {r['robots_status']} · {r['robots_bytes']}B" if r['robots_status'] == 200 else f"HTTP {r['robots_status']}"
        lb = f"HTTP {r['llms_status']} · {r['llms_bytes']}B" if r['llms_status'] == 200 else f"HTTP {r['llms_status']}"
        out.append(f"| `{r['slug']}` | `{r['base']}` | {rb} | {lb} | {r['robots_diff'] or '-'} | {r['llms_diff'] or '-'} |\n")
    out.append("\n## Próximos passos\n\n")
    if new_llms:
        out.append(f"- **AÇÃO IMEDIATA:** investigar conteúdo do `llms.txt` recém-publicado de {', '.join(new_llms)}. Atualizar matriz técnica em `audits/benchmarking/matriz-tecnica-schema-seo.md`.\n")
    if changes:
        out.append(f"- Revisar diff bruto em `{today}/` para os slugs alterados: {', '.join(changes)}.\n")
    if waf_blocked:
        out.append(f"- WAF mantém bloqueio em {', '.join(waf_blocked)} — monitoramento simétrico (issue #16).\n")
    out.append(f"- Próximo snapshot: segunda-feira da quinzena seguinte.\n")
    return "".join(out)


if __name__ == "__main__":
    raise SystemExit(main())
