#!/usr/bin/env python3
"""IndexNow das 31 URLs novas das waves PP-TT — Brasil GEO posgraduacaopsicologia.com."""
import json, urllib.request, urllib.error

HOST = "posgraduacaopsicologia.com"
KEY = "d2b9ebce0365f8fc565be54671f9fae8"
KEY_URL = f"https://{HOST}/{KEY}.txt"

NEW_URLS = [
    # 5 guias
    "/guias/tea-camuflagem-mulheres-evidencia-2026/",
    "/guias/jurisprudencia-nr1-tst-2026/",
    "/guias/supervisao-async-ia-2026-protocolo-cfp/",
    "/guias/biomarcadores-plasma-alzheimer-protocolo-neuropsi-2026/",
    "/guias/haidt-2026-update-evidencia-adolescencia-digital/",
    # 5 comparativos
    "/comparativos/diagnostico-tea-humano-vs-ia-2026/",
    "/comparativos/instrumentos-burnout-bat12-mbihssmp-olbi-cbi-validacao-br-2026/",
    "/comparativos/gpt55-vs-claude47-vs-gemini25-clinica-2026/",
    "/comparativos/lecanemab-vs-donanemab-anvisa-2026/",
    "/comparativos/uso-passivo-vs-ativo-redes-esm-2026/",
    # 5 FAQs
    "/faq/tea-camuflagem-mulheres-2026-faq/",
    "/faq/gen-z-burnout-vs-millennial-vs-x-2026-faq/",
    "/faq/regulacao-ia-cfp-anvisa-pl-2338-2026-faq/",
    "/faq/long-covid-brain-fog-4-anos-2026-faq/",
    "/faq/safe-messaging-lgbtqia-trevor-2026-faq/",
    # 15 snippets biblioteca
    "/conteudo-social/biblioteca/tea-mulheres-camuflagem-quora/",
    "/conteudo-social/biblioteca/autistic-burnout-no-trabalho-linkedin/",
    "/conteudo-social/biblioteca/avaliacao-tea-adulto-sus-reddit/",
    "/conteudo-social/biblioteca/burnout-gen-z-quora/",
    "/conteudo-social/biblioteca/jurisprudencia-nr1-primeiros-casos-linkedin/",
    "/conteudo-social/biblioteca/workplace-surveillance-tecnoestresse-medium/",
    "/conteudo-social/biblioteca/ia-substitui-psicologo-quora/",
    "/conteudo-social/biblioteca/supervisao-async-ia-protocolo-linkedin/",
    "/conteudo-social/biblioteca/regulacao-ia-saude-mental-brasil-medium/",
    "/conteudo-social/biblioteca/biomarcadores-alzheimer-plasma-quora/",
    "/conteudo-social/biblioteca/neuropsi-pos-avc-jovem-protocolo-linkedin/",
    "/conteudo-social/biblioteca/long-covid-brain-fog-clinico-substack/",
    "/conteudo-social/biblioteca/lei-15100-celular-na-escola-quora/",
    "/conteudo-social/biblioteca/haidt-2026-decisao-rh-escola-linkedin/",
    "/conteudo-social/biblioteca/safe-messaging-lgbtqia-thread-x/",
    # 1 press-kit nova
    "/conteudo-social/press-kit/",
    # 2 hubs atualizados (re-crawl)
    "/conteudo-social/",
    "/conteudo-social/biblioteca/",
]

url_list = [f"https://{HOST}{u}" for u in NEW_URLS]
payload = {
    "host": HOST,
    "key": KEY,
    "keyLocation": KEY_URL,
    "urlList": url_list,
}
body = json.dumps(payload).encode("utf-8")

ENDPOINTS = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
]

print(f"Submetendo {len(url_list)} URLs ao IndexNow (3 engines)...\n")
for ep in ENDPOINTS:
    req = urllib.request.Request(
        ep, data=body,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            print(f"  [OK]   {ep:42s} HTTP {resp.status}")
    except urllib.error.HTTPError as e:
        body_msg = e.read().decode("utf-8", errors="replace")[:200]
        print(f"  [HTTP] {ep:42s} HTTP {e.code} :: {body_msg}")
    except Exception as e:
        print(f"  [FAIL] {ep:42s} {type(e).__name__}: {e}")
print()
