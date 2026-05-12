# Google Analytics 4 — posgraduacaopsicologia.com

> **Status:** ativo desde 12/05/2026.
>
> **Aplicabilidade:** propriedade GA4 unica para o portal `posgraduacaopsicologia.com`. Qualquer subdominio futuro entra como stream adicional na mesma propriedade.

## Identificadores canonicos

| Item | Valor |
| --- | --- |
| Conta GA4 (display) | Brasil GEO - IPOG |
| Account ID | `394425908` |
| Propriedade (display) | `posgraduacaopsicologia.com` |
| Property ID | `537256335` |
| Data Stream | posgraduacaopsicologia.com - Web |
| Stream ID | `14864005884` |
| Measurement ID (tag) | `G-1VXE1Z4J9R` |
| Fuso horario | (GMT-03:00) America/Sao_Paulo |
| Moeda | BRL |
| Industria | Empregos e educacao |
| Owner Google | `geo.ipog.edu@gmail.com` (GEO IPOG) |
| Console GA4 | `https://analytics.google.com/analytics/web/?hl=pt-br#/a394425908p537256335/admin` |

## Tag injecao no site

A tag GA4 esta hardcoded em `src/lib/data.ts` (constante `SITE.gaMeasurementId`) e injetada no `<head>` por `src/layouts/Base.astro`. O snippet inclui o handler `astro:after-swap` para registrar `page_view` em navegacoes ViewTransitions (sem isso, GA4 nao detecta as transicoes soft).

Trocar o Measurement ID exige:

1. Atualizar `SITE.gaMeasurementId` em `src/lib/data.ts`.
2. `npm run build` e push para main.
3. Deploy automatico Cloudflare Pages.

## Cloud project para Data API

| Item | Valor |
| --- | --- |
| GCP project ID | `geo-ipog-analytics` |
| GCP project display name | geo-ipog-analytics |
| Conta GCP | `geo.ipog.edu@gmail.com` |
| API habilitada | Google Analytics Data API (`analyticsdata.googleapis.com`) |
| Status | Ativada em 12/05/2026 |
| Console GCP | `https://console.cloud.google.com/apis/api/analyticsdata.googleapis.com/metrics?project=geo-ipog-analytics&hl=pt-br` |

### Service account

| Item | Valor |
| --- | --- |
| Email | `geo-ipog-analytics-reader@geo-ipog-analytics.iam.gserviceaccount.com` |
| Display name | Brasil GEO IPOG Analytics Reader |
| Descricao | Service account read-only para Analytics Data API (posgraduacaopsicologia.com). |
| Tipo de chave | JSON |
| Private key ID | `b84882eb5e2e7b725576eec9a817810acc0550f7` |
| Local da key | `~/.gcp/geo-ipog-analytics-reader.json` (chmod 600, gitignored) |
| Papel GCP IAM | nenhum (acesso ao GA4 e via permissao na propriedade, nao no projeto) |
| Papel GA4 | Leitor (`predefinedRoles/viewer`) — accessBinding `AYVX2ezdOzEZaA-uLxxjO8u3gMP2BUZzJd_5dup_HCvObZuCUa1UMhMj8omhJUvComOi_-XfxGT79jj5tNCvRsIlvmSzbzCLiQ9bIO098kkZJzAUWimyogVVyg==` |

### Como o accessBinding foi criado (workaround GA4 UI)

A UI nova do GA4 rejeita o e-mail `*@iam.gserviceaccount.com` com a mensagem "Esse e-mail nao corresponde a uma Conta do Google", apesar de service accounts serem aceitas pela Analytics Admin API. Em 12/05/2026 o acesso foi concedido via API com OAuth do user (`geo.ipog.edu@gmail.com`):

```bash
# 1. OAuth Playground (developers.google.com/oauthplayground) com scope
#    https://www.googleapis.com/auth/analytics.manage.users — autorizar como geo.ipog.edu
# 2. Step 2 Exchange authorization code -> access token
# 3. POST accessBinding (endpoint v1alpha; v1beta ainda nao expoe accessBindings)
TOKEN="<ya29....>"
curl -sS -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  "https://analyticsadmin.googleapis.com/v1alpha/properties/537256335/accessBindings" \
  -d '{"user":"geo-ipog-analytics-reader@geo-ipog-analytics.iam.gserviceaccount.com","roles":["predefinedRoles/viewer"]}'
```

Resposta canonica de sucesso (formato):

```json
{
  "name": "properties/537256335/accessBindings/AYVX2ezdOzEZaA-...",
  "user": "geo-ipog-analytics-reader@geo-ipog-analytics.iam.gserviceaccount.com",
  "roles": ["predefinedRoles/viewer"]
}
```

Para revogar:

```bash
curl -sS -X DELETE -H "Authorization: Bearer $TOKEN" \
  "https://analyticsadmin.googleapis.com/v1alpha/properties/537256335/accessBindings/AYVX2ezdOzEZaA-uLxxjO8u3gMP2BUZzJd_5dup_HCvObZuCUa1UMhMj8omhJUvComOi_-XfxGT79jj5tNCvRsIlvmSzbzCLiQ9bIO098kkZJzAUWimyogVVyg=="
```

## Teste smoke da Data API (apos liberar acesso)

```bash
python -c "
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import RunReportRequest, DateRange, Metric, Dimension
import os
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'C:/Users/alexa/.gcp/geo-ipog-analytics-reader.json'
client = BetaAnalyticsDataClient()
resp = client.run_report(RunReportRequest(
    property='properties/537256335',
    date_ranges=[DateRange(start_date='7daysAgo', end_date='today')],
    metrics=[Metric(name='screenPageViews'), Metric(name='activeUsers')],
    dimensions=[Dimension(name='pagePath')],
    limit=10
))
for row in resp.rows:
    print(row.dimension_values[0].value, [m.value for m in row.metric_values])
"
```

## Privacidade e LGPD

- A tag GA4 nao usa Consent Mode v2 hoje (portal de conteudo educacional, sem perfis de usuario).
- `anonymize_ip` e legado de Universal Analytics; GA4 anonimiza IP automaticamente.
- Coleta de cookies feita com configuracoes padrao do GA4 (region-aware retention, padrao 14 meses).
- Se o portal receber visitantes EEE significativos, ativar Consent Mode v2 com TC string CMP.

## Quem tem acesso

| Pessoa / sistema | Funcao GA4 |
| --- | --- |
| `geo.ipog.edu@gmail.com` | Administrador |
| `geo-ipog-analytics-reader@geo-ipog-analytics.iam.gserviceaccount.com` | Leitor (ativo desde 12/05/2026 via Admin API v1alpha) |

Convidar usuarios humanos em `https://analytics.google.com/analytics/web/?hl=pt-br#/a394425908p537256335/admin/suiteusermanagement/property`.

## Historico

| Data | Mudanca | Quem |
| --- | --- | --- |
| 2026-05-12 | Setup inicial: conta GA4 + propriedade + stream criados, Measurement ID `G-1VXE1Z4J9R` injetado em Base.astro (commit 4720749), GCP project `geo-ipog-analytics` criado, Analytics Data API habilitada, service account `geo-ipog-analytics-reader` criada com chave JSON exportada para `~/.gcp/`, accessBinding `predefinedRoles/viewer` aplicado via Analytics Admin API v1alpha + OAuth Playground (workaround para UI que rejeita service accounts). Smoke test Data API OK (0 rows, esperado para site recem-deployado). | Alexandre Caramaschi |
| 2026-05-12 | Custom event `click_outbound_ipog` deployado em Base.astro (commit 56fe0c0) — dispara em qualquer clique para `ipog.edu.br` ou subdominio. | Alexandre Caramaschi |
| 2026-05-12 | Vinculacao GSC `sc-domain:posgraduacaopsicologia.com` ↔ GA4 stream criada via UI. | Alexandre Caramaschi |
| 2026-05-12 | Pipeline semanal `scripts/weekly_ga4_report.py` + workflow GitHub Actions `ga4-weekly-report.yml` (cron 09:00 BRT segunda) + runbook Looker Studio em `dashboards/GA4-WEEKLY-REPORT.md`. Commit d410000. Secret pendente: `GA4_SERVICE_ACCOUNT_JSON`. | Alexandre Caramaschi |
