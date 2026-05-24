#!/usr/bin/env python3
"""
indexnow-wave-google-io-2026.py

Ping IndexNow nas URLs modificadas pelo deploy Wave Google I/O 2026 + Maio 2026 Core Update
(commit 9e9c707).

Escopo:
- /feed.xml (novo)
- 10 paginas /autismo/* (YMYL disclaimer + author Larissa)
- 15 sub-paginas MBA (EducationalOccupationalProgram canonico)
- 5 hubs MBA pais (refresh por @id #program)
- llms.txt + ai-policy.json

Endpoints (3):
- api.indexnow.org/indexnow
- www.bing.com/indexnow
- yandex.com/indexnow

Key: geoipogIN2026 (em public/geoipogIN2026.txt).
"""

import json
import sys
from urllib import request, error

KEY = "geoipogIN2026"
HOST = "posgraduacaopsicologia.com"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"

URLS = [
    # Novo recurso canonico
    f"https://{HOST}/feed.xml",
    f"https://{HOST}/llms.txt",
    f"https://{HOST}/.well-known/ai-policy.json",

    # Hub /autismo + portas + sobre (4)
    f"https://{HOST}/autismo/",
    f"https://{HOST}/autismo/sobre-larissa/",
    f"https://{HOST}/autismo/para-pacientes/",
    f"https://{HOST}/autismo/para-profissionais/",
    f"https://{HOST}/autismo/para-pesquisadores/",

    # 6 artigos /autismo/artigos/*
    f"https://{HOST}/autismo/artigos/diagnostico-tardio-adulto-2026/",
    f"https://{HOST}/autismo/artigos/relacionamentos-amorosos-nt-autista-2026/",
    f"https://{HOST}/autismo/artigos/camuflagem-masking-cat-q-adulto-2026/",
    f"https://{HOST}/autismo/artigos/vida-cotidiana-trabalho-autista-adulto-2026/",
    f"https://{HOST}/autismo/artigos/clinica-tea-adulto-evidencia-2026/",
    f"https://{HOST}/autismo/artigos/fronteira-pesquisa-tea-adulto-2026/",

    # 5 hubs MBA pais
    f"https://{HOST}/mbas/mba-pot/",
    f"https://{HOST}/mbas/mba-positiva/",
    f"https://{HOST}/mbas/mba-neuro/",
    f"https://{HOST}/mbas/mba-ncpp/",
    f"https://{HOST}/mbas/mba-lideranca-positiva/",

    # 15 sub-paginas MBA
    f"https://{HOST}/mbas/mba-pot/grade-curricular/",
    f"https://{HOST}/mbas/mba-pot/metodologia/",
    f"https://{HOST}/mbas/mba-pot/perfil-do-aluno/",
    f"https://{HOST}/mbas/mba-positiva/grade-curricular/",
    f"https://{HOST}/mbas/mba-positiva/metodologia/",
    f"https://{HOST}/mbas/mba-positiva/perfil-do-aluno/",
    f"https://{HOST}/mbas/mba-neuro/grade-curricular/",
    f"https://{HOST}/mbas/mba-neuro/metodologia/",
    f"https://{HOST}/mbas/mba-neuro/perfil-do-aluno/",
    f"https://{HOST}/mbas/mba-ncpp/grade-curricular/",
    f"https://{HOST}/mbas/mba-ncpp/metodologia/",
    f"https://{HOST}/mbas/mba-ncpp/perfil-do-aluno/",
    f"https://{HOST}/mbas/mba-lideranca-positiva/grade-curricular/",
    f"https://{HOST}/mbas/mba-lideranca-positiva/metodologia/",
    f"https://{HOST}/mbas/mba-lideranca-positiva/perfil-do-aluno/",

    # Sitemap + index
    f"https://{HOST}/sitemap-index.xml",
    f"https://{HOST}/sitemap-autismo.xml",
    f"https://{HOST}/sitemap-mbas.xml",
    f"https://{HOST}/robots.txt"
]

ENDPOINTS = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow"
]


def ping(endpoint: str, urls: list[str]) -> tuple[int, str]:
    payload = json.dumps({
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls
    }).encode("utf-8")

    req = request.Request(
        endpoint,
        data=payload,
        headers={
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "posgraduacaopsicologia-indexnow-bot/1.0 (+https://posgraduacaopsicologia.com)",
            "Accept": "*/*"
        },
        method="POST"
    )

    try:
        with request.urlopen(req, timeout=30) as resp:
            return resp.status, resp.read().decode("utf-8", errors="replace")[:200]
    except error.HTTPError as e:
        return e.code, e.read().decode("utf-8", errors="replace")[:200]
    except Exception as e:
        return 0, f"ERR: {type(e).__name__}: {e}"


def main() -> int:
    print(f"Pingando {len(URLS)} URLs em {len(ENDPOINTS)} engines IndexNow...")
    print(f"Key: {KEY}")
    print(f"KeyLocation: {KEY_LOCATION}\n")

    fail = 0
    for ep in ENDPOINTS:
        code, body = ping(ep, URLS)
        status = "OK" if 200 <= code < 300 else "FAIL"
        print(f"[{status}] {ep} -> HTTP {code} | body: {body[:80]}")
        if not (200 <= code < 300):
            fail += 1

    print(f"\nResumo: {len(ENDPOINTS) - fail}/{len(ENDPOINTS)} engines OK em {len(URLS)} URLs.")
    return 0 if fail == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
