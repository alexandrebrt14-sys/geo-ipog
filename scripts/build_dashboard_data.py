#!/usr/bin/env python3
"""Consolidador do painel de marketing (camada 2).

Lê as coletas em data/marketing/{hubspot,ga4}/latest.json, aplica o mapa de
canais (data/marketing/canais.json) e as metas (data/marketing/metas.json) e
grava data/marketing/dashboard.json, o único arquivo que a página lê.

Uso: python scripts/build_dashboard_data.py [--hoje AAAA-MM-DD]
Só usa a biblioteca padrão. Fontes ausentes viram status "pendente" no JSON,
nunca erro: a página mostra o que existe e sinaliza o que falta.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import pathlib
import sys

try:
    from zoneinfo import ZoneInfo

    FUSO = ZoneInfo("America/Sao_Paulo")
except Exception:
    FUSO = dt.timezone(dt.timedelta(hours=-3), name="America/Sao_Paulo")

RAIZ = pathlib.Path(__file__).resolve().parents[1]
PASTA = RAIZ / "data" / "marketing"
SEM_UTM = "(sem UTM)"
VERSAO = 1


def ler_json(caminho: pathlib.Path) -> dict | None:
    if not caminho.is_file():
        return None
    return json.loads(caminho.read_text(encoding="utf-8"))


def normalizar(valor: str) -> str:
    return " ".join(valor.strip().lower().split())


class Mapa:
    def __init__(self, cfg: dict):
        self.canais = cfg["canais"]
        self.padrao = cfg.get("canal_padrao", "demais")
        self.origens = cfg.get("origem_hubspot", {})
        self.funil = cfg["funil"]
        self.indice: dict[str, str] = {}
        for canal in self.canais:
            for bruto in canal.get("utm_source", []):
                self.indice[normalizar(bruto)] = canal["id"]

    def canal_de(self, utm_bruto: str) -> str:
        if utm_bruto == SEM_UTM:
            return "sem_utm"
        return self.indice.get(normalizar(utm_bruto), self.padrao)

    def nome(self, canal_id: str) -> str:
        for c in self.canais:
            if c["id"] == canal_id:
                return c["nome"]
        return canal_id


def soma_por_canal(dias: dict, datas: list[str], mapa: Mapa) -> dict[str, int]:
    acumulado = {c["id"]: 0 for c in mapa.canais}
    for data in datas:
        for bruto, n in dias.get(data, {}).get("utm_source", {}).items():
            acumulado[mapa.canal_de(bruto)] += n
    return acumulado


def variacao(atual: int, anterior: int) -> float | None:
    if anterior <= 0:
        return None
    return round((atual - anterior) / anterior * 100, 1)


def datas_ate(fim: dt.date, dias: int) -> list[str]:
    return [(fim - dt.timedelta(days=n)).isoformat() for n in range(dias - 1, -1, -1)]


def funil(dias: dict, datas: list[str], mapa: Mapa) -> dict:
    atual: dict[str, int] = {}
    for data in datas:
        for est, n in dias.get(data, {}).get("lifecyclestage", {}).items():
            atual[est] = atual.get(est, 0) + n
    principais = [e for e in mapa.funil if e.get("principal")]
    pos_cliente = sum(atual.get(e["id"], 0) for e in mapa.funil if e.get("pos_cliente"))
    # "Chegou ao menos até": quem está em um estágio posterior passou pelos anteriores.
    # Lealdade e Churn são estágios posteriores a Cliente, por isso entram em todos.
    estagios = []
    for i, e in enumerate(principais):
        alcancou = sum(atual.get(x["id"], 0) for x in principais[i:]) + pos_cliente
        estagios.append({"id": e["id"], "nome": e["nome"], "atual": atual.get(e["id"], 0), "alcancou": alcancou})
    base = estagios[0]["alcancou"] if estagios else 0
    for i in range(len(estagios)):
        anterior = estagios[i - 1]["alcancou"] if i else None
        estagios[i]["taxa_passagem"] = round(estagios[i]["alcancou"] / anterior * 100, 1) if anterior else None
        estagios[i]["taxa_do_topo"] = round(estagios[i]["alcancou"] / base * 100, 1) if base else None
    outros = [
        {"id": e["id"], "nome": e["nome"], "atual": atual.get(e["id"], 0)}
        for e in mapa.funil
        if not e.get("principal") and atual.get(e["id"], 0) > 0
    ]
    conhecidos = {e["id"] for e in mapa.funil}
    for est, n in atual.items():
        if est not in conhecidos:
            outros.append({"id": est, "nome": f"Estágio {est}", "atual": n})
    return {"estagios": estagios, "outros_estagios": outros, "total_contatos": sum(atual.values())}


def consolidar(hoje: dt.date, agora: dt.datetime) -> dict:
    cfg = ler_json(PASTA / "canais.json")
    metas = ler_json(PASTA / "metas.json") or {}
    if not cfg:
        raise SystemExit("data/marketing/canais.json ausente")
    mapa = Mapa(cfg)
    hub = ler_json(PASTA / "hubspot" / "latest.json")
    ga4 = ler_json(PASTA / "ga4" / "latest.json")

    fontes = {
        "hubspot": {"status": "ok" if hub else "pendente", "coletado_em": hub.get("coletado_em") if hub else None,
                    "detalhe": "Contatos, UTM e funil (CRM v3)" if hub else "Aguardando o segredo HUBSPOT_PRIVATE_APP_TOKEN"},
        "ga4_portal": {"status": "ok" if ga4 and ga4.get("portal") else "pendente", "coletado_em": ga4.get("coletado_em") if ga4 else None,
                       "detalhe": "posgraduacaopsicologia.com (propriedade 537256335)"},
        "ga4_ipog": {"status": "ok" if ga4 and ga4.get("ipog") else "pendente", "coletado_em": ga4.get("coletado_em") if ga4 and ga4.get("ipog") else None,
                     "detalhe": "ipog.edu.br: aguardando acesso de leitura à propriedade GA4 do IPOG"},
        "meta_ads": {"status": "pendente", "coletado_em": None, "detalhe": "Fase 2: token de System User no Business Manager"},
        "google_ads": {"status": "pendente", "coletado_em": None, "detalhe": "Fase 2: developer token da conta de gerente"},
        "linkedin_ads": {"status": "pendente", "coletado_em": None, "detalhe": "Fase 1 por CSV manual; API depende de aprovação do LinkedIn"},
    }

    saida = {
        "versao": VERSAO,
        "gerado_em": agora.isoformat(timespec="seconds"),
        "fuso": "America/Sao_Paulo",
        "hoje": hoje.isoformat(),
        "fontes": fontes,
        "metas": {"leads_mes": metas.get("leads_mes"), "cpl_por_canal": metas.get("cpl_por_canal", {})},
        "canais_config": [{"id": c["id"], "nome": c["nome"], "tipo": c["tipo"]} for c in mapa.canais],
    }
    if not hub:
        saida.update({"cartoes": None, "serie_diaria": [], "canais": [], "funil": None, "sem_utm": None, "utm_brutos": [], "organico": ga4})
        return saida

    dias = hub["dias"]
    ontem = hoje - dt.timedelta(days=1)
    ult7 = datas_ate(ontem, 7)
    ant7 = datas_ate(ontem - dt.timedelta(days=7), 7)
    ult30 = datas_ate(ontem, 30)
    ant30 = datas_ate(ontem - dt.timedelta(days=30), 30)
    mes = [d for d in dias if d.startswith(hoje.strftime("%Y-%m")) and d <= hoje.isoformat()]

    def total(datas: list[str]) -> int:
        return sum(dias.get(d, {}).get("contatos_criados", 0) for d in datas)

    canais_30 = soma_por_canal(dias, ult30, mapa)
    canais_7 = soma_por_canal(dias, ult7, mapa)
    canais_7_ant = soma_por_canal(dias, ant7, mapa)
    canais_hoje = soma_por_canal(dias, [hoje.isoformat()], mapa)
    total_30 = sum(canais_30.values())

    saida["cartoes"] = {
        "leads_hoje": total([hoje.isoformat()]),
        "leads_ontem": total([ontem.isoformat()]),
        "leads_7d": total(ult7),
        "leads_7d_anteriores": total(ant7),
        "variacao_7d_pct": variacao(total(ult7), total(ant7)),
        "leads_30d": total(ult30),
        "leads_30d_anteriores": total(ant30) if all(d in dias for d in ant30) else None,
        "leads_mes": total(mes),
        "dias_no_mes": len(mes),
        "meta_mes": metas.get("leads_mes"),
        "leads_llm_30d": canais_30.get("llm", 0),
        "leads_llm_hoje": canais_hoje.get("llm", 0),
        "sem_utm_30d": canais_30.get("sem_utm", 0),
        "sem_utm_pct_30d": round(canais_30.get("sem_utm", 0) / total_30 * 100, 1) if total_30 else None,
        "investimento_hoje": None,
        "cpl_medio_30d": None,
        "janela_7d": {"inicio": ult7[0], "fim": ult7[-1]},
        "janela_30d": {"inicio": ult30[0], "fim": ult30[-1]},
    }

    serie = []
    for data in datas_ate(hoje, 30):
        dia = dias.get(data)
        por_canal = soma_por_canal(dias, [data], mapa) if dia else {c["id"]: 0 for c in mapa.canais}
        serie.append({"data": data, "total": dia["contatos_criados"] if dia else 0,
                      "parcial": data == hoje.isoformat(), "sem_dado": dia is None, "por_canal": por_canal})
    saida["serie_diaria"] = serie

    cpl_metas = metas.get("cpl_por_canal", {}) or {}
    canais = []
    for c in mapa.canais:
        cid = c["id"]
        canais.append({
            "id": cid, "nome": c["nome"], "tipo": c["tipo"],
            "leads_hoje": canais_hoje.get(cid, 0),
            "leads_7d": canais_7.get(cid, 0),
            "leads_7d_anteriores": canais_7_ant.get(cid, 0),
            "variacao_7d_pct": variacao(canais_7.get(cid, 0), canais_7_ant.get(cid, 0)),
            "leads_30d": canais_30.get(cid, 0),
            "share_30d_pct": round(canais_30.get(cid, 0) / total_30 * 100, 1) if total_30 else None,
            "investimento_30d": None, "impressoes_30d": None, "cliques_30d": None, "ctr_pct": None,
            "cpl_30d": None, "meta_cpl": cpl_metas.get(cid), "semaforo": "sem_custo",
        })
    canais.sort(key=lambda x: -x["leads_30d"])
    saida["canais"] = canais

    saida["funil"] = funil(dias, ult30, mapa)
    saida["funil"]["janela"] = {"inicio": ult30[0], "fim": ult30[-1]}

    origens: dict[str, int] = {}
    for data in ult30:
        for origem, n in dias.get(data, {}).get("sem_utm_por_origem", {}).items():
            origens[origem] = origens.get(origem, 0) + n
    total_sem = sum(origens.values())
    saida["sem_utm"] = {
        "total_30d": total_sem,
        "por_origem": sorted(
            [{"id": k, "nome": mapa.origens.get(k, k), "total": v, "pct": round(v / total_sem * 100, 1) if total_sem else None}
             for k, v in origens.items()], key=lambda x: -x["total"]),
    }

    brutos: dict[str, int] = {}
    for data in ult30:
        for bruto, n in dias.get(data, {}).get("utm_source", {}).items():
            if bruto != SEM_UTM:
                brutos[bruto] = brutos.get(bruto, 0) + n
    saida["utm_brutos"] = sorted(
        [{"utm_source": k, "canal": mapa.canal_de(k), "total_30d": v} for k, v in brutos.items()],
        key=lambda x: -x["total_30d"])[:40]

    saida["organico"] = ga4 if ga4 else None
    return saida


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--hoje", help="data de referência AAAA-MM-DD (padrão: hoje em São Paulo)")
    args = parser.parse_args()
    agora = dt.datetime.now(FUSO)
    hoje = dt.date.fromisoformat(args.hoje) if args.hoje else agora.date()
    saida = consolidar(hoje, agora)
    destino = PASTA / "dashboard.json"
    destino.write_text(json.dumps(saida, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    cartoes = saida.get("cartoes") or {}
    print(f"dashboard.json gerado: {cartoes.get('leads_7d', 0)} leads em 7 dias, "
          f"{cartoes.get('leads_30d', 0)} em 30 dias; fontes ok: "
          + ", ".join(k for k, v in saida["fontes"].items() if v["status"] == "ok"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
