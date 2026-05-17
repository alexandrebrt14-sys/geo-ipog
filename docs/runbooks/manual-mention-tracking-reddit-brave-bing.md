# Runbook Operacional — Monitoramento Manual de Menções: Reddit, Brave Search e Bing AI Performance

> **Status:** vigente desde 2026-05-17
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Frequência geral:** quinzenal (Reddit e Brave) + mensal (Bing)
> **Issue relacionada:** #57 (cobertura de canais sem API estável em mai/2026)
> **Última revisão:** 2026-05-17

---

## Contexto e justificativa

O pipeline automatizado de coleta cross-LLM (`dashboards/RUNBOOK-COLETA-LLM.md`) cobre os seis LLMs canônicos via API. Entretanto, três canais de distribuição de menções **não possuem API estável ou pública em maio/2026** e exigem coleta manual periódica:

1. **Reddit** — API pública disponível, mas sem endpoint dedicado a "AI summary" ou "answer box" do Reddit Answers (lançado em beta limitado; sem acesso programático público confirmado em mai/2026).
2. **Brave Search Summarizer** — Brave não tem programa de Webmaster Tools equivalente ao Google Search Console nem ao Bing Webmaster Tools. O Brave Search API (`brave.com/search/api/`) existe para busca programática, mas não expõe dados de citação do Summarizer para publishers. Não há Brave Search Console.
3. **Bing AI Performance** — Lançado em **public preview em 10/02/2026** via Bing Webmaster Tools. Ainda não atingiu GA em mai/2026; dados não disponíveis via API (API export está no backlog da Microsoft). Coleta manual obrigatória via dashboard.

Este runbook padroniza a coleta manual dos três canais e registra a captura em `dashboards/manual-mention-tracking.csv`.

---

## Seção 1 — Reddit

### Status da API (mai/2026)

A Reddit Data API (v1) existe e é acessível mediante OAuth 2.0 com app registrado em `https://www.reddit.com/prefs/apps`. O nível free suporta até 100 queries/minuto para leitura de posts públicos. **Não há endpoint para "Reddit Answers" (o AI summary box)** — esse produto estava em beta fechado em mai/2026, sem acesso programático publicado. Coleta de dados de citação no Reddit Answers exige monitoramento visual.

Referência oficial: `https://support.reddithelp.com/hc/en-us/articles/16160319875092-Reddit-Data-API-Wiki`

### Queries canônicas de busca

Execute as seguintes URLs no navegador (sem login para ver resultados públicos não personalizados):

| # | URL canônica | Objetivo |
|---|---|---|
| 1 | `https://www.reddit.com/search/?q=IPOG+psicologia&sort=new&t=month` | Posts recentes sobre IPOG + psicologia |
| 2 | `https://www.reddit.com/search/?q=IPOG+p%C3%B3s-gradua%C3%A7%C3%A3o&sort=relevance&t=year` | Menções anuais de pós-graduação IPOG |
| 3 | `https://www.reddit.com/search/?q=posgraduacaopsicologia&sort=new` | Menções diretas ao domínio |
| 4 | `https://www.reddit.com/search/?q=%22Brasil+GEO%22+OR+%22BrasilGEO%22&sort=new&t=year` | Menções à marca Brasil GEO |
| 5 | Google: `site:reddit.com IPOG pós psicologia` | Threads indexadas no Google sobre IPOG |

### Subreddits prioritários para varredura manual

- `r/brasil` — maior subreddit BR, principal ponto de conversas sobre pós-graduação
- `r/saopaulo`, `r/goiania` — geográfico IPOG
- `r/psicologia` — específico de área
- `r/mestrado`, `r/posgraduacao` — decisão educacional
- `r/concursos`, `r/carreira` — contexto profissional

### Frequência e calendário

- **Frequência:** quinzenal, toda segunda-feira alternada (semanas ímpares do mês)
- **Duração estimada:** 20-30 minutos por sessão
- **Responsável:** Alexandre Caramaschi ou analista designado

### O que capturar

Para cada thread encontrada, registrar no CSV (`dashboards/manual-mention-tracking.csv`):

- `url_seen` — URL completa do post ou comentário
- `sentiment` — `positivo`, `neutro`, `negativo`, `misto`
- `mentions_ipog` — `sim` / `nao`
- `mentions_brasilgeo` — `sim` / `nao`
- `observations` — contexto resumido (ex.: "usuário recomenda IPOG vs concorrente X", "crítica a preço", "pergunta sobre qualidade")

### Sinais de alerta

- Threads com mais de 50 comentários sobre IPOG ou posgraduacaopsicologia.com → escalonar para relatório mensal com link
- Sentimento negativo recorrente (3+ posts/mês) → registrar em `docs/governance/HISTORICO-DECISOES-CANONICAS.md`
- Qualquer menção ao domínio `posgraduacaopsicologia.com` em contexto de desinformação → acionar Alexandre imediatamente

---

## Seção 2 — Brave Search Summarizer

### Status do programa Webmaster (mai/2026)

**Brave Search não possui programa de Webmaster Tools em mai/2026.** Múltiplas solicitações na comunidade Brave (`community.brave.app`) foram respondidas com confirmação de que o recurso não existe e está em consideração para o roadmap sem data definida. A descoberta de sites ocorre via **Web Discovery Project (WDP)** — extensão opt-in que usuários instalam e que alimenta o índice Brave.

O Brave Search API (`https://api.search.brave.com/res/v1/web/search`) permite busca programática, mas **não expõe dados de citação do AI Summarizer** para publishers. Não há painel de visibilidade equivalente ao Bing AI Performance Report.

Referências:
- Fórum Brave: `https://community.brave.app/t/does-brave-have-its-own-webmaster-tools-yet/652675`
- API Brave: `https://brave.com/search/api/tools/`

### Queries canônicas de monitoramento

Executar manualmente no navegador (`search.brave.com`) **sem login** para ver o Summarizer público:

| # | Query | Observação |
|---|---|---|
| 1 | `IPOG pós-graduação psicologia` | Query principal em pt-BR |
| 2 | `melhor pós-graduação psicologia Brasil` | Query comparativa |
| 3 | `psicologia clínica pós-graduação online Brasil` | Variante online |
| 4 | `IPOG psychology postgraduate Brazil` | Query em inglês (Summarizer mais ativo em EN) |
| 5 | `Brazil online psychology postgraduate program` | Competitivo EN |

> **Nota:** O Brave Search Summarizer aparece com maior frequência em queries em inglês com volume expressivo. Em pt-BR, a ativação do Summarizer é rara e menos previsível em mai/2026.
>
> **Spot-check 17/05/2026:** A query `IPOG pós-graduação psicologia` no Brave retorna resultados de `ipog.edu.br`, `instagram.com`, `youtube.com` e `reddit.com`. O domínio `posgraduacaopsicologia.com` **não aparece** nesta query em mai/2026. Nenhum Summarizer ativado. Prioridade de ação: submeter o domínio via `https://search.brave.com/submit-url` e monitorar quinzenalmente para detectar quando o domínio passar a aparecer.

### O que observar e registrar

- O Summarizer aparece para a query? (`sim` / `nao`)
- O domínio `posgraduacaopsicologia.com` é citado como fonte? (`sim` / `nao`)
- Capturar screenshot se houver citação (salvar em `docs/evidencias/brave-summarizer-YYYY-MM-DD.png`)
- Anotar qual URL do domínio foi citada (ex.: `/mbas/mba-neuropsicologia`)

### Frequência e calendário

- **Frequência:** quinzenal, mesma data da coleta Reddit (segunda-feira alternada, semana ímpar)
- **Duração estimada:** 15 minutos por sessão
- **Responsável:** Alexandre Caramaschi ou analista designado

### Limitações declaradas

Brave Search não fornece:
- Contagem de impressões no Summarizer
- Taxa de citação por URL
- Dados históricos de presença no AI summary

A coleta é qualitativa e visual. O valor está em detectar se o domínio aparece ou não, e capturar evidência screenshot quando sim.

---

## Seção 3 — Bing AI Performance (Bing Webmaster Tools)

### Status do produto (mai/2026)

O **Bing AI Performance Report** foi lançado em **public preview em 10 de fevereiro de 2026** via Bing Webmaster Tools. Em mai/2026 o produto **ainda está em public preview** — não atingiu GA (General Availability). Dados **não disponíveis via API** (a Microsoft indicou que exportação via API está no backlog, sem data anunciada).

Referência canônica: `https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview`

### Acesso ao dashboard

1. Acessar `https://www.bing.com/webmasters/` com login Microsoft associado à propriedade verificada
2. Selecionar a propriedade `posgraduacaopsicologia.com`
3. Menu lateral → **AI Performance** (ou via `https://aka.ms/BWTAIpref`)

> **Pré-requisito:** a propriedade deve estar verificada no Bing Webmaster Tools. Verificar se o DNS TXT ou meta tag de verificação estão ativos antes da primeira coleta.

### As 3 métricas a registrar mensalmente

| # | Métrica | Definição | Onde encontrar no dashboard |
|---|---|---|---|
| 1 | **Total Citations** | Número total de vezes que o domínio foi citado como fonte em respostas geradas por IA (Copilot, Bing AI summary, experiências parceiras) no período | Card principal da tela AI Performance |
| 2 | **Average Cited Pages** | Média diária de URLs únicas do domínio que foram referenciadas em respostas de IA | Card secundário ao lado de Total Citations |
| 3 | **Top Cited Pages (Page-level Citation Activity)** | Lista das URLs com maior contagem de citação no período; o dashboard também expõe "Grounding Queries" (frases-chave que acionaram a recuperação do conteúdo) | Tabela na parte inferior — exportar top 5 URLs e top 3 grounding queries |

> **Nota de spot-check (17/05/2026):** o blog oficial da Microsoft (`blogs.bing.com/webmaster/February-2026/...`) confirma 4 métricas principais: Total Citations, Average Cited Pages, Grounding Queries e Page-level Citation Activity, mais gráfico de trends. Status permanece **public preview** em mai/2026; GA não anunciado.

### Frequência e calendário

- **Frequência:** mensal, toda primeira segunda-feira do mês
- **Período de análise:** selecionar "últimos 30 dias" no filtro de data do dashboard
- **Duração estimada:** 20 minutos por sessão
- **Responsável:** Alexandre Caramaschi

### Procedimento passo a passo

1. Acessar o dashboard (link acima)
2. Confirmar que o período está definido para "últimos 30 dias"
3. Anotar `Total Citations` no CSV
4. Anotar `Average Cited Pages` no CSV
5. Exportar as top 5 URLs da tabela "Top Cited Pages" e registrar as top 3 em `observations`
6. Capturar screenshot do dashboard completo e salvar em `docs/evidencias/bing-ai-perf-YYYY-MM.png`
7. Se `Total Citations` cresceu >20% mês a mês, registrar em `docs/governance/HISTORICO-DECISOES-CANONICAS.md` como marco

### Sinais de alerta

- `Total Citations = 0` por dois meses consecutivos → verificar se a propriedade ainda está verificada + se as páginas principais estão indexadas no Bing
- Queda >30% no Total Citations → checar se houve mudança de schema, remoção de FAQPage, ou penalidade Bing

---

## Template CSV — Captura integrada

Arquivo: `dashboards/manual-mention-tracking.csv`

**Cabeçalho:**
```
date,source,query,url_seen,sentiment,mentions_ipog,mentions_brasilgeo,observations
```

**Valores aceitos por coluna:**

| Coluna | Tipo | Valores aceitos |
|---|---|---|
| `date` | ISO 8601 | `YYYY-MM-DD` |
| `source` | enum | `reddit`, `brave-summarizer`, `bing-ai-performance` |
| `query` | texto livre | query exata executada |
| `url_seen` | URL ou string | URL do post/citação, ou `n/a` se ausente |
| `sentiment` | enum | `positivo`, `neutro`, `negativo`, `misto`, `n/a` |
| `mentions_ipog` | bool | `sim`, `nao` |
| `mentions_brasilgeo` | bool | `sim`, `nao` |
| `observations` | texto livre | contexto resumido, máx 200 chars |

**Exemplo de linha:**
```
2026-05-19,reddit,IPOG psicologia,https://www.reddit.com/r/psicologia/comments/xyz123/,positivo,sim,nao,usuário recomenda IPOG como melhor opção online custo-benefício
```

---

## Calendário consolidado

| Frequência | Canal | Dia sugerido |
|---|---|---|
| Quinzenal | Reddit | Toda segunda-feira ímpar |
| Quinzenal | Brave Search Summarizer | Mesma sessão do Reddit |
| Mensal | Bing AI Performance | Primeira segunda-feira do mês |

---

## Issue #57 — Endereçamento

Esta issue registrava a ausência de cobertura de monitoramento para Reddit, Brave e Bing AI em razão da inexistência de APIs estáveis. Este runbook resolve a issue com:

- Protocolo manual estruturado para os três canais
- Template CSV para captura padronizada
- Frequências definidas (quinzenal Reddit/Brave, mensal Bing)
- Procedimentos de alerta e escalação
- Declaração explícita do status de API de cada canal em mai/2026

A issue #57 pode ser **fechada** após a primeira coleta bem-sucedida usando este runbook.

---

## Cross-links

- `dashboards/RUNBOOK-COLETA-LLM.md` — coleta automatizada cross-LLM (complementar a este runbook)
- `dashboards/METRICAS-CANONICAS.md` — KPIs que esta coleta alimenta
- `dashboards/manual-mention-tracking.csv` — arquivo de captura
- `docs/governance/HISTORICO-DECISOES-CANONICAS.md` — registro de marcos
- `docs/runbooks/bing-ai-performance-setup.md` — setup inicial da propriedade Bing
