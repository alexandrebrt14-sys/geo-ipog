# Relatorio semanal GA4 - posgraduacaopsicologia.com

Dois caminhos paralelos para acompanhar metricas do portal:

1. **Script offline** (`scripts/weekly_ga4_report.py`) que gera HTML+CSV+Markdown sob `dashboards/relatorios-ga4/YYYY-WWnn/`.
2. **Looker Studio** conectado direto a propriedade 537256335 (vivo, com filtros e graficos interativos).

## 1. Script Python (offline, versionavel)

### Pre-requisitos

- Chave da service account em `~/.gcp/geo-ipog-analytics-reader.json` (chmod 600).
- `pip install google-analytics-data`.

### Rodar manualmente

```bash
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.gcp/geo-ipog-analytics-reader.json"

# Janela padrao = 7 dias
python scripts/weekly_ga4_report.py

# Variacoes
python scripts/weekly_ga4_report.py --period 28d
python scripts/weekly_ga4_report.py --period 90d
```

### O que e gerado

Cada execucao cria um diretorio `dashboards/relatorios-ga4/2026-W20/ultimos-7-dias/` com:

| Arquivo | Conteudo |
| --- | --- |
| `index.html` | Tabelas formatadas, pronto para abrir no browser |
| `README.md` | Mesmo conteudo em Markdown (para revisao em PR) |
| `raw.json` | Dump bruto da resposta da API |
| `overview.csv` | activeUsers, newUsers, sessions, pageviews, avgSession, engagementRate |
| `top_pages.csv` | Top 25 paginas por pageviews |
| `channels.csv` | Canais e origens de trafego |
| `countries.csv` | Top 20 regioes |
| `devices.csv` | Desktop/mobile/tablet |
| `events.csv` | Top 25 eventos |
| `ipog_clicks.csv` | Cliques de saida para `ipog.edu.br` (`click_outbound_ipog`) |

### Schedule automatico

#### Opcao A: GitHub Actions (recomendado)

Workflow em `.github/workflows/ga4-weekly-report.yml` roda toda segunda 09:00 BRT, commita o relatorio e abre PR. Secret obrigatorio: `GA4_SERVICE_ACCOUNT_JSON` com o conteudo do JSON da chave.

#### Opcao B: Windows Task Scheduler local

```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS = "$HOME\.gcp\geo-ipog-analytics-reader.json"
schtasks /create /tn "GA4 GEO IPOG semanal" /tr "python C:\Sandyboxclaude\geo-ipog\scripts\weekly_ga4_report.py" /sc weekly /d MON /st 06:00
```

#### Opcao C: cron Linux/Mac

```cron
0 9 * * 1 cd /path/geo-ipog && GOOGLE_APPLICATION_CREDENTIALS=$HOME/.gcp/geo-ipog-analytics-reader.json python3 scripts/weekly_ga4_report.py --period 7d
```

## 2. Looker Studio (dashboard vivo)

### Criar do zero (5 min)

1. Abrir `https://lookerstudio.google.com/create?c.reportId&pli=1` logado com `geo.ipog.edu@gmail.com`.
2. Em "Adicionar dados", escolher **Google Analytics**.
3. Selecionar a conta `Brasil GEO - IPOG` (394425908) -> propriedade `posgraduacaopsicologia.com` (537256335).
4. Clicar "Adicionar ao relatorio".
5. Renomear o relatorio para `posgraduacaopsicologia.com - GA4 semanal`.

### Componentes minimos do dashboard

| Painel | Tipo | Dimensoes | Metricas |
| --- | --- | --- | --- |
| Scorecard KPIs | 6 cartoes | - | Active users, New users, Sessions, Pageviews, Avg session duration, Engagement rate |
| Tendencia 28d | Linha | Date | Active users, Sessions |
| Top paginas | Tabela | Page path | Pageviews, Active users |
| Canais | Pizza | Default channel grouping | Sessions |
| Eventos | Tabela | Event name | Event count, Total users |
| Cliques IPOG (filtro: `eventName = click_outbound_ipog`) | Tabela | Page path | Event count |
| Geografia | Mapa Brasil | Region | Active users |

### Compartilhamento

- Dar acesso de **Leitor** para a equipe interna Brasil GEO e para Ronan Maia / Bruno Azambuja (IPOG) quando o board report for institucionalizado.
- NUNCA tornar publico se houver dados de PII / IDs de cliente em algum custom dimension futuro.

### Filtros padrao recomendados

- Periodo padrao: ultimos 28 dias.
- Filtro global: **excluir** `hostname` diferente de `posgraduacaopsicologia.com` (evita ruido de previews).

## 3. Integracao GSC linkada

Em 12/05/2026 foi criada a vinculacao GA4 -> Search Console (`sc-domain:posgraduacaopsicologia.com`). Depois de 48h os relatorios GA4 sob `Relatorios > Acquisition > Search Console` populam automaticamente com:

- Top consultas organicas (queries do Google)
- CTR organico por query
- Posicao media por query
- Landing page por query

No Looker Studio, isso aparece quando voce adiciona uma segunda fonte "Search Console" e referencia a mesma propriedade verificada.

## Glossario de metricas chave

| Nome | API | Significado |
| --- | --- | --- |
| Active Users | `activeUsers` | Usuarios unicos com pelo menos uma sessao engajada na janela |
| Sessions | `sessions` | Visitas (incluindo `(direct)`) |
| Page views | `screenPageViews` | Total de carregamentos de pagina (inclui SPA re-views via `astro:after-swap`) |
| Engagement rate | `engagementRate` | % de sessoes com >=10s, conversao ou >=2 pageviews |
| Avg session duration | `averageSessionDuration` | Em segundos |
| Event count | `eventCount` | Soma de eventos disparados |
| click_outbound_ipog | custom event | Disparado quando user clica em link para `ipog.edu.br` (commit 56fe0c0) |

## Historico

| Data | Mudanca |
| --- | --- |
| 2026-05-12 | Setup inicial: script `weekly_ga4_report.py` + workflow agendado + doc Looker Studio. Vinculacao GSC criada. |
