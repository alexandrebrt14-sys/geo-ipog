"""Relatorio semanal GA4 para posgraduacaopsicologia.com.

Puxa as 6 metricas canonicas via Analytics Data API e grava
HTML + CSV + Markdown em dashboards/relatorios-ga4/YYYY-WW/.

Uso:
    GOOGLE_APPLICATION_CREDENTIALS=~/.gcp/geo-ipog-analytics-reader.json \
        python scripts/weekly_ga4_report.py [--period 7d|28d|90d]

Sem argumentos = 7d (proposta semanal).

Schedule recomendado (Windows Task Scheduler ou cron):
    Toda segunda 06:00 BRT.
"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import json
import os
import pathlib
import sys
from typing import Any

try:
    from google.analytics.data_v1beta import BetaAnalyticsDataClient
    from google.analytics.data_v1beta.types import (
        DateRange,
        Dimension,
        Metric,
        OrderBy,
        RunReportRequest,
    )
except ImportError:
    sys.stderr.write("Instale: pip install google-analytics-data\n")
    sys.exit(2)


PROPERTY_ID = "537256335"
SITE_URL = "https://posgraduacaopsicologia.com"
REPORT_ROOT = pathlib.Path(__file__).resolve().parent.parent / "dashboards" / "relatorios-ga4"

PERIODS = {
    "7d": ("7daysAgo", "today", "ultimos-7-dias"),
    "28d": ("28daysAgo", "today", "ultimos-28-dias"),
    "90d": ("90daysAgo", "today", "ultimos-90-dias"),
}


def run_report(client: BetaAnalyticsDataClient, request: RunReportRequest) -> dict[str, Any]:
    resp = client.run_report(request)
    rows = []
    for row in resp.rows:
        rows.append({
            "dimensions": [d.value for d in row.dimension_values],
            "metrics": [m.value for m in row.metric_values],
        })
    return {
        "dimension_headers": [d.name for d in resp.dimension_headers],
        "metric_headers": [m.name for m in resp.metric_headers],
        "rows": rows,
        "row_count": resp.row_count,
    }


def fetch_all(client: BetaAnalyticsDataClient, date_range: DateRange) -> dict[str, dict[str, Any]]:
    out: dict[str, dict[str, Any]] = {}

    out["overview"] = run_report(client, RunReportRequest(
        property=f"properties/{PROPERTY_ID}",
        date_ranges=[date_range],
        metrics=[
            Metric(name="activeUsers"),
            Metric(name="newUsers"),
            Metric(name="sessions"),
            Metric(name="screenPageViews"),
            Metric(name="averageSessionDuration"),
            Metric(name="engagementRate"),
        ],
    ))

    out["top_pages"] = run_report(client, RunReportRequest(
        property=f"properties/{PROPERTY_ID}",
        date_ranges=[date_range],
        dimensions=[Dimension(name="pagePath"), Dimension(name="pageTitle")],
        metrics=[Metric(name="screenPageViews"), Metric(name="activeUsers"), Metric(name="averageSessionDuration")],
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="screenPageViews"), desc=True)],
        limit=25,
    ))

    out["channels"] = run_report(client, RunReportRequest(
        property=f"properties/{PROPERTY_ID}",
        date_ranges=[date_range],
        dimensions=[Dimension(name="sessionDefaultChannelGroup"), Dimension(name="sessionSource")],
        metrics=[Metric(name="sessions"), Metric(name="activeUsers"), Metric(name="engagementRate")],
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="sessions"), desc=True)],
        limit=20,
    ))

    out["countries"] = run_report(client, RunReportRequest(
        property=f"properties/{PROPERTY_ID}",
        date_ranges=[date_range],
        dimensions=[Dimension(name="country"), Dimension(name="region")],
        metrics=[Metric(name="activeUsers"), Metric(name="sessions")],
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="activeUsers"), desc=True)],
        limit=20,
    ))

    out["devices"] = run_report(client, RunReportRequest(
        property=f"properties/{PROPERTY_ID}",
        date_ranges=[date_range],
        dimensions=[Dimension(name="deviceCategory")],
        metrics=[Metric(name="activeUsers"), Metric(name="sessions"), Metric(name="engagementRate")],
    ))

    out["events"] = run_report(client, RunReportRequest(
        property=f"properties/{PROPERTY_ID}",
        date_ranges=[date_range],
        dimensions=[Dimension(name="eventName")],
        metrics=[Metric(name="eventCount"), Metric(name="totalUsers")],
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="eventCount"), desc=True)],
        limit=25,
    ))

    from google.analytics.data_v1beta.types import Filter, FilterExpression
    out["ipog_clicks"] = run_report(client, RunReportRequest(
        property=f"properties/{PROPERTY_ID}",
        date_ranges=[date_range],
        dimensions=[Dimension(name="pagePath"), Dimension(name="eventName")],
        metrics=[Metric(name="eventCount"), Metric(name="totalUsers")],
        dimension_filter=FilterExpression(filter=Filter(
            field_name="eventName",
            string_filter=Filter.StringFilter(value="click_outbound_ipog"),
        )),
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="eventCount"), desc=True)],
        limit=25,
    ))

    return out


def write_csv(out_dir: pathlib.Path, name: str, report: dict[str, Any]) -> None:
    headers = report["dimension_headers"] + report["metric_headers"]
    path = out_dir / f"{name}.csv"
    with path.open("w", encoding="utf-8", newline="") as fh:
        writer = csv.writer(fh)
        writer.writerow(headers)
        for row in report["rows"]:
            writer.writerow(row["dimensions"] + row["metrics"])


def render_html(out_dir: pathlib.Path, data: dict[str, dict[str, Any]], period_label: str, start: str, end: str) -> None:
    def table(report: dict[str, Any]) -> str:
        headers = report["dimension_headers"] + report["metric_headers"]
        thead = "".join(f"<th>{h}</th>" for h in headers)
        rows = []
        for r in report["rows"]:
            cells = "".join(f"<td>{v}</td>" for v in r["dimensions"] + r["metrics"])
            rows.append(f"<tr>{cells}</tr>")
        tbody = "\n".join(rows) or '<tr><td colspan="99" style="color:#888">sem dados</td></tr>'
        return f"<table><thead><tr>{thead}</tr></thead><tbody>{tbody}</tbody></table>"

    html = f"""<!doctype html>
<html lang="pt-BR"><head><meta charset="UTF-8">
<title>GA4 {SITE_URL} - {period_label}</title>
<style>
  body{{font-family:-apple-system,Inter,Arial,sans-serif;color:#111;max-width:1100px;margin:32px auto;padding:0 24px}}
  h1{{font-size:24px;border-bottom:2px solid #0F2543;padding-bottom:8px}}
  h2{{font-size:18px;color:#0F2543;margin-top:32px}}
  .meta{{color:#666;font-size:13px;margin-bottom:24px}}
  table{{width:100%;border-collapse:collapse;font-size:13px;margin:12px 0}}
  th,td{{padding:6px 10px;text-align:left;border-bottom:1px solid #eee}}
  th{{background:#f6f8fa;font-weight:600}}
  tr:hover td{{background:#fcfcfd}}
</style></head><body>
<h1>Relatorio GA4 - posgraduacaopsicologia.com</h1>
<div class="meta">
  Periodo: <strong>{period_label}</strong> ({start} -> {end}) ·
  Property ID: <code>{PROPERTY_ID}</code> ·
  Gerado: {dt.datetime.now().isoformat(timespec='seconds')}
</div>

<h2>Visao geral</h2>
{table(data['overview'])}

<h2>Top 25 paginas por pageviews</h2>
{table(data['top_pages'])}

<h2>Canais e origens (top 20)</h2>
{table(data['channels'])}

<h2>Top 20 regioes</h2>
{table(data['countries'])}

<h2>Dispositivos</h2>
{table(data['devices'])}

<h2>Top 25 eventos</h2>
{table(data['events'])}

<h2>Cliques de saida para ipog.edu.br</h2>
<p style="font-size:13px;color:#666">Evento custom <code>click_outbound_ipog</code>. Vazio nos primeiros dias e normal.</p>
{table(data['ipog_clicks'])}

</body></html>
"""
    (out_dir / "index.html").write_text(html, encoding="utf-8")


def render_markdown(out_dir: pathlib.Path, data: dict[str, dict[str, Any]], period_label: str, start: str, end: str) -> None:
    lines = [
        f"# Relatorio GA4 - posgraduacaopsicologia.com",
        f"",
        f"- Periodo: **{period_label}** ({start} - {end})",
        f"- Property ID: `{PROPERTY_ID}`",
        f"- Gerado: {dt.datetime.now().isoformat(timespec='seconds')}",
        f"",
    ]

    overview = data["overview"]
    if overview["rows"]:
        m = overview["rows"][0]["metrics"]
        lines += [
            "## Visao geral",
            "",
            f"| Active Users | New Users | Sessions | Pageviews | Avg Session (s) | Engagement Rate |",
            f"|---|---|---|---|---|---|",
            f"| {m[0]} | {m[1]} | {m[2]} | {m[3]} | {m[4]} | {m[5]} |",
            "",
        ]

    def section(title: str, report: dict[str, Any]) -> list[str]:
        headers = report["dimension_headers"] + report["metric_headers"]
        out = [f"## {title}", "", "| " + " | ".join(headers) + " |", "|" + "|".join(["---"] * len(headers)) + "|"]
        if not report["rows"]:
            out.append("| _sem dados_ " + "| " * (len(headers) - 1) + "|")
        else:
            for r in report["rows"]:
                out.append("| " + " | ".join(r["dimensions"] + r["metrics"]) + " |")
        out.append("")
        return out

    lines += section("Top 25 paginas", data["top_pages"])
    lines += section("Canais e origens", data["channels"])
    lines += section("Regioes", data["countries"])
    lines += section("Dispositivos", data["devices"])
    lines += section("Top eventos", data["events"])
    lines += section("Cliques para ipog.edu.br", data["ipog_clicks"])

    (out_dir / "README.md").write_text("\n".join(lines), encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--period", choices=PERIODS.keys(), default="7d")
    args = parser.parse_args()

    start, end, label = PERIODS[args.period]

    if not os.environ.get("GOOGLE_APPLICATION_CREDENTIALS"):
        default = pathlib.Path.home() / ".gcp" / "geo-ipog-analytics-reader.json"
        if default.exists():
            os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = str(default)
        else:
            sys.stderr.write(
                "Defina GOOGLE_APPLICATION_CREDENTIALS apontando para a chave da "
                "service account. Default esperado: ~/.gcp/geo-ipog-analytics-reader.json\n"
            )
            return 2

    client = BetaAnalyticsDataClient()
    date_range = DateRange(start_date=start, end_date=end)
    data = fetch_all(client, date_range)

    iso_year, iso_week, _ = dt.date.today().isocalendar()
    out_dir = REPORT_ROOT / f"{iso_year}-W{iso_week:02d}" / label
    out_dir.mkdir(parents=True, exist_ok=True)

    for name, report in data.items():
        write_csv(out_dir, name, report)
    (out_dir / "raw.json").write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")

    render_html(out_dir, data, label, start, end)
    render_markdown(out_dir, data, label, start, end)

    print(f"OK: {out_dir} | overview rows={data['overview']['row_count']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
