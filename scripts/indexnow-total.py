#!/usr/bin/env python3
"""IndexNow total — todas as URLs do sitemap-index posgraduacaopsicologia.com."""
import json, urllib.request, urllib.error, re, time, sys
from pathlib import Path

HOST = "posgraduacaopsicologia.com"
KEY = "d2b9ebce0365f8fc565be54671f9fae8"
KEY_URL = f"https://{HOST}/{KEY}.txt"
SITEMAP_INDEX = f"https://{HOST}/sitemap-index.xml"

ENDPOINTS = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
]

BATCH = 100  # IndexNow aceita até 10.000 URLs/POST mas Bing recomenda <= 100


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "BrasilGEO-IndexNow/1.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", errors="replace")


def extract_locs(xml: str) -> list[str]:
    return re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", xml)


def main():
    print(f"Lendo sitemap-index: {SITEMAP_INDEX}")
    try:
        idx = fetch(SITEMAP_INDEX)
    except Exception as e:
        print(f"[FATAL] {type(e).__name__}: {e}")
        sys.exit(1)
    sub_sitemaps = extract_locs(idx)
    print(f"  → {len(sub_sitemaps)} sub-sitemaps:")
    for s in sub_sitemaps:
        print(f"    - {s}")
    print()

    all_urls: list[str] = []
    seen = set()
    for sm in sub_sitemaps:
        try:
            xml = fetch(sm)
            urls = extract_locs(xml)
            new = [u for u in urls if u not in seen and u.startswith(f"https://{HOST}")]
            all_urls.extend(new)
            seen.update(new)
            print(f"  [{len(new):4d}] {sm}")
        except Exception as e:
            print(f"  [FAIL] {sm} :: {type(e).__name__}: {e}")

    print(f"\nTotal único de URLs do host {HOST}: {len(all_urls)}")
    print(f"Enviando em lotes de {BATCH} URLs para 3 engines...\n")

    summary = {ep: {"ok": 0, "fail": 0, "codes": []} for ep in ENDPOINTS}

    for i in range(0, len(all_urls), BATCH):
        chunk = all_urls[i : i + BATCH]
        payload = {
            "host": HOST,
            "key": KEY,
            "keyLocation": KEY_URL,
            "urlList": chunk,
        }
        body = json.dumps(payload).encode("utf-8")
        lote = f"lote {i // BATCH + 1}/{(len(all_urls) + BATCH - 1) // BATCH} ({len(chunk)} URLs)"

        for ep in ENDPOINTS:
            req = urllib.request.Request(
                ep, data=body,
                headers={"Content-Type": "application/json; charset=utf-8"},
                method="POST",
            )
            try:
                with urllib.request.urlopen(req, timeout=45) as resp:
                    code = resp.status
                    summary[ep]["ok"] += 1
                    summary[ep]["codes"].append(code)
                    print(f"  [OK]   {ep:42s} {lote} HTTP {code}")
            except urllib.error.HTTPError as e:
                summary[ep]["fail"] += 1
                summary[ep]["codes"].append(e.code)
                msg = e.read().decode("utf-8", errors="replace")[:120]
                print(f"  [HTTP] {ep:42s} {lote} HTTP {e.code} :: {msg}")
            except Exception as e:
                summary[ep]["fail"] += 1
                print(f"  [FAIL] {ep:42s} {lote} {type(e).__name__}: {e}")
        time.sleep(0.5)  # gentileza entre lotes

    print("\n" + "=" * 70)
    print(f"SUMÁRIO IndexNow Total ({len(all_urls)} URLs)")
    print("=" * 70)
    for ep, s in summary.items():
        print(f"  {ep:42s} ok={s['ok']:2d} fail={s['fail']:2d} codes={s['codes']}")


if __name__ == "__main__":
    main()
