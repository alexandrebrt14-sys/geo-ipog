#!/usr/bin/env python3
"""Coletor GA4 do painel de marketing (camada 1).

Evolução do scripts/weekly_ga4_report.py para o painel: lê a propriedade do
portal posgraduacaopsicologia.com (537256335) e, quando a variável
GA4_PROPERTY_IPOG estiver definida, também a propriedade do ipog.edu.br.
Grava data/marketing/ga4/latest.json com sessões, usuários, canais, páginas
mais vistas e o evento click_outbound_ipog dos últimos 7 dias, além da série
diária de sessões dos últimos 30 dias.

Uso:
    GOOGLE_APPLICATION_CREDENTIALS=... [GA4_PROPERTY_IPOG=123456] \
        python scripts/collectors/collector_ga4.py

Sem credencial o script avisa e sai com código 0 sem gravar nada: o
consolidador marca a fonte como pendente e o painel segue funcionando.
Dependência: pip install google-analytics-data
"""

from __future__ import annotations

import datetime as dt
import json
import os
import pathlib
import sys

try:
    from zoneinfo import ZoneInfo

    FUSO = ZoneInfo("America/Sao_Paulo")
except Exception:
    FUSO = dt.timezone(dt.timedelta(hours=-3), name="America/Sao_Paulo")

RAIZ = pathlib.Path(__file__).resolve().parents[2]
SAIDA = RAIZ / "data" / "marketing" / "ga4"
PROPRIEDADE_PORTAL = "537256335"


def sem_credencial(motivo: str) -> int:
    sys.stderr.write(f"GA4 não coletado: {motivo}\n")
    return 0


def main() -> int:
    if not os.environ.get("GOOGLE_APPLICATION_CREDENTIALS"):
        return sem_credencial("GOOGLE_APPLICATION_CREDENTIALS não definido")
    try:
        from google.analytics.data_v1beta import BetaAnalyticsDataClient
        from google.analytics.data_v1beta.types import (
            DateRange,
            Dimension,
            Filter,
            FilterExpression,
            Metric,
            OrderBy,
            RunReportRequest,
        )
    except ImportError:
        return sem_credencial("biblioteca google-analytics-data ausente (pip install google-analytics-data)")

    client = BetaAnalyticsDataClient()

    def linhas(prop: str, **kw) -> list[dict]:
        resp = client.run_report(RunReportRequest(property=f"properties/{prop}", **kw))
        return [{"d": [x.value for x in r.dimension_values], "m": [x.value for x in r.metric_values]} for r in resp.rows]

    def coletar(prop: str, com_clique_ipog: bool) -> dict:
        sete = DateRange(start_date="7daysAgo", end_date="yesterday")
        trinta = DateRange(start_date="30daysAgo", end_date="yesterday")
        visao = linhas(prop, date_ranges=[sete], metrics=[Metric(name="sessions"), Metric(name="activeUsers"), Metric(name="conversions")])
        m = visao[0]["m"] if visao else ["0", "0", "0"]
        serie = linhas(prop, date_ranges=[trinta], dimensions=[Dimension(name="date")], metrics=[Metric(name="sessions")],
                       order_bys=[OrderBy(dimension=OrderBy.DimensionOrderBy(dimension_name="date"))])
        canais = linhas(prop, date_ranges=[sete], dimensions=[Dimension(name="sessionDefaultChannelGroup")],
                        metrics=[Metric(name="sessions")], order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="sessions"), desc=True)], limit=10)
        paginas = linhas(prop, date_ranges=[sete], dimensions=[Dimension(name="pagePath")], metrics=[Metric(name="screenPageViews")],
                         order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="screenPageViews"), desc=True)], limit=15)
        saida = {
            "propriedade": prop,
            "sessoes_7d": int(float(m[0])),
            "usuarios_7d": int(float(m[1])),
            "conversoes_7d": int(float(m[2])),
            "sessoes_por_dia": [{"data": f"{r['d'][0][:4]}-{r['d'][0][4:6]}-{r['d'][0][6:]}", "sessoes": int(float(r["m"][0]))} for r in serie],
            "canais_7d": [{"canal": r["d"][0], "sessoes": int(float(r["m"][0]))} for r in canais],
            "top_paginas_7d": [{"caminho": r["d"][0], "visualizacoes": int(float(r["m"][0]))} for r in paginas],
        }
        if com_clique_ipog:
            cliques = linhas(prop, date_ranges=[sete], dimensions=[Dimension(name="eventName")], metrics=[Metric(name="eventCount")],
                             dimension_filter=FilterExpression(filter=Filter(field_name="eventName", string_filter=Filter.StringFilter(value="click_outbound_ipog"))))
            saida["cliques_ipog_7d"] = int(float(cliques[0]["m"][0])) if cliques else 0
        return saida

    resultado = {
        "fonte": "ga4",
        "coletado_em": dt.datetime.now(FUSO).isoformat(timespec="seconds"),
        "portal": coletar(PROPRIEDADE_PORTAL, com_clique_ipog=True),
        "ipog": None,
    }
    prop_ipog = os.environ.get("GA4_PROPERTY_IPOG", "").strip()
    if prop_ipog:
        try:
            resultado["ipog"] = coletar(prop_ipog, com_clique_ipog=False)
        except Exception as erro:  # acesso ainda não liberado: segue só com o portal
            sys.stderr.write(f"GA4 do ipog.edu.br indisponível: {erro}\n")

    SAIDA.mkdir(parents=True, exist_ok=True)
    (SAIDA / "latest.json").write_text(json.dumps(resultado, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"GA4: portal com {resultado['portal']['sessoes_7d']} sessões em 7 dias; ipog.edu.br "
          + ("coletado" if resultado["ipog"] else "pendente"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
