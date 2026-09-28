#!/usr/bin/env python3
"""Coletor HubSpot do painel de marketing (camada 1).

Lê os contatos criados na janela pedida pela API CRM v3 (busca) e agrega, por
dia no fuso America/Sao_Paulo, três contagens: utm_source bruto, origem
automática do HubSpot (hs_analytics_source) dos contatos sem UTM e estágio
atual do ciclo de vida (lifecyclestage). Nenhum dado pessoal sai do HubSpot:
o arquivo gravado só tem contagens.

Saída:
    data/marketing/hubspot/latest.json
    data/marketing/hubspot/YYYY-MM-DD.json  (foto do dia da coleta)

Uso:
    HUBSPOT_PRIVATE_APP_TOKEN=pat-... python scripts/collectors/collector_hubspot.py [--dias 35]

Escopo necessário na Private App: crm.objects.contacts.read.
Só usa a biblioteca padrão.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import pathlib
import sys
import time
import urllib.error
import urllib.request

try:
    from zoneinfo import ZoneInfo

    FUSO = ZoneInfo("America/Sao_Paulo")
except Exception:  # sem base de fusos (Windows sem tzdata): Brasil sem horário de verão desde 2019
    FUSO = dt.timezone(dt.timedelta(hours=-3), name="America/Sao_Paulo")

API = "https://api.hubapi.com/crm/v3/objects/contacts/search"
PORTAL_ID = 48837477
PROPRIEDADES = ["utm_source", "lifecyclestage", "hs_analytics_source"]
LIMITE_PAGINA = 200
TETO_BUSCA = 10_000  # a busca do HubSpot não pagina além de 10 mil resultados
PAUSA_ENTRE_CHAMADAS = 0.3  # a busca aceita poucas chamadas por segundo
SEM_UTM = "(sem UTM)"
SEM_VALOR = "(sem origem)"
SEM_ESTAGIO = "(sem estágio)"
RAIZ = pathlib.Path(__file__).resolve().parents[2]
SAIDA = RAIZ / "data" / "marketing" / "hubspot"


def token() -> str:
    valor = os.environ.get("HUBSPOT_PRIVATE_APP_TOKEN", "").strip()
    if not valor:
        sys.stderr.write(
            "HUBSPOT_PRIVATE_APP_TOKEN não definido. Crie uma Private App no HubSpot "
            "com o escopo crm.objects.contacts.read e exporte o token.\n"
        )
        sys.exit(2)
    return valor


def chamar(corpo: dict, chave: str, tentativas: int = 5) -> dict:
    dados = json.dumps(corpo).encode("utf-8")
    for tentativa in range(1, tentativas + 1):
        req = urllib.request.Request(
            API,
            data=dados,
            method="POST",
            headers={
                "Authorization": f"Bearer {chave}",
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        )
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as erro:
            if erro.code in (429, 500, 502, 503, 504) and tentativa < tentativas:
                espera = min(2 ** tentativa, 30)
                sys.stderr.write(f"HubSpot respondeu {erro.code}; nova tentativa em {espera}s\n")
                time.sleep(espera)
                continue
            detalhe = erro.read().decode("utf-8", "replace")[:500]
            raise SystemExit(f"Erro {erro.code} na API do HubSpot: {detalhe}") from erro
        except urllib.error.URLError as erro:
            if tentativa < tentativas:
                time.sleep(min(2 ** tentativa, 30))
                continue
            raise SystemExit(f"Falha de rede ao chamar o HubSpot: {erro}") from erro
    raise SystemExit("Esgotadas as tentativas de chamada ao HubSpot")


def buscar_intervalo(chave: str, inicio_ms: int, fim_ms: int) -> list[dict]:
    """Devolve as propriedades dos contatos criados em [inicio_ms, fim_ms].

    Se o intervalo tiver mais de 10 mil contatos, divide ao meio e soma as
    partes, porque a busca do HubSpot não pagina além desse teto.
    """
    corpo = {
        "filterGroups": [{
            "filters": [{
                "propertyName": "createdate",
                "operator": "BETWEEN",
                "value": str(inicio_ms),
                "highValue": str(fim_ms),
            }]
        }],
        "properties": PROPRIEDADES,
        "sorts": [{"propertyName": "createdate", "direction": "ASCENDING"}],
        "limit": LIMITE_PAGINA,
    }
    primeira = chamar(corpo, chave)
    total = int(primeira.get("total", 0))
    if total > TETO_BUSCA and fim_ms - inicio_ms > 60_000:
        meio = (inicio_ms + fim_ms) // 2
        time.sleep(PAUSA_ENTRE_CHAMADAS)
        return buscar_intervalo(chave, inicio_ms, meio) + buscar_intervalo(chave, meio + 1, fim_ms)

    linhas = [r.get("properties", {}) for r in primeira.get("results", [])]
    proximo = (primeira.get("paging") or {}).get("next", {}).get("after")
    while proximo:
        time.sleep(PAUSA_ENTRE_CHAMADAS)
        pagina = chamar({**corpo, "after": proximo}, chave)
        linhas.extend(r.get("properties", {}) for r in pagina.get("results", []))
        proximo = (pagina.get("paging") or {}).get("next", {}).get("after")
    return linhas


def agregar(linhas: list[dict]) -> dict:
    utm: dict[str, int] = {}
    origem_sem_utm: dict[str, int] = {}
    estagio: dict[str, int] = {}
    for p in linhas:
        fonte = (p.get("utm_source") or "").strip() or SEM_UTM
        utm[fonte] = utm.get(fonte, 0) + 1
        if fonte == SEM_UTM:
            origem = (p.get("hs_analytics_source") or "").strip() or SEM_VALOR
            origem_sem_utm[origem] = origem_sem_utm.get(origem, 0) + 1
        est = (p.get("lifecyclestage") or "").strip() or SEM_ESTAGIO
        estagio[est] = estagio.get(est, 0) + 1
    return {
        "contatos_criados": len(linhas),
        "utm_source": dict(sorted(utm.items(), key=lambda kv: -kv[1])),
        "sem_utm_por_origem": dict(sorted(origem_sem_utm.items(), key=lambda kv: -kv[1])),
        "lifecyclestage": dict(sorted(estagio.items(), key=lambda kv: -kv[1])),
    }


def coletar(chave: str, dias: int) -> dict:
    agora = dt.datetime.now(FUSO)
    hoje = agora.date()
    inicio = hoje - dt.timedelta(days=dias - 1)
    saida_dias: dict[str, dict] = {}
    for n in range(dias):
        dia = inicio + dt.timedelta(days=n)
        comeco = dt.datetime.combine(dia, dt.time.min, tzinfo=FUSO)
        fim = dt.datetime.combine(dia, dt.time.max, tzinfo=FUSO)
        linhas = buscar_intervalo(chave, int(comeco.timestamp() * 1000), int(fim.timestamp() * 1000))
        saida_dias[dia.isoformat()] = agregar(linhas)
        sys.stderr.write(f"{dia.isoformat()}: {len(linhas)} contatos\n")
        time.sleep(PAUSA_ENTRE_CHAMADAS)
    return {
        "fonte": "hubspot",
        "portal_id": PORTAL_ID,
        "coletado_em": agora.isoformat(timespec="seconds"),
        "fuso": "America/Sao_Paulo",
        "janela": {"inicio": inicio.isoformat(), "fim": hoje.isoformat(), "dias": dias},
        "observacao": "Contagens de contatos criados por dia (createdate). Estágio do funil é o estágio atual do contato, não o histórico.",
        "dias": saida_dias,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--dias", type=int, default=35, help="tamanho da janela em dias, contando hoje (padrão 35)")
    args = parser.parse_args()
    if args.dias < 8 or args.dias > 120:
        parser.error("--dias precisa estar entre 8 e 120")

    resultado = coletar(token(), args.dias)
    SAIDA.mkdir(parents=True, exist_ok=True)
    conteudo = json.dumps(resultado, ensure_ascii=False, indent=1) + "\n"
    (SAIDA / "latest.json").write_text(conteudo, encoding="utf-8")
    (SAIDA / f"{resultado['janela']['fim']}.json").write_text(conteudo, encoding="utf-8")
    total = sum(d["contatos_criados"] for d in resultado["dias"].values())
    print(f"HubSpot: {total} contatos em {args.dias} dias gravados em {SAIDA.relative_to(RAIZ)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
