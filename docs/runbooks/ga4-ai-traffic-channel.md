# Runbook — GA4 Custom Channel Group "AI Traffic"

**Data canônica:** 2026-05-17
**Autor:** Brasil GEO (curadoria Alexandre Caramaschi)
**Propriedade GA4:** `537256335` (Brasil GEO — IPOG, Stream `14864005884`, Measurement ID `G-1VXE1Z4J9R`).
**Issues atendidas:** #43 (GA4 referrer/UTM LLM) e #78 (Camada de medição GA4).
**Fonte canônica:** Wave E §3.2 (`docs/research/wave-E-kpis-measurement-20260517.md`).

---

## Por que criar o canal antes de medir qualquer coisa

Em maio de 2026, sessões originadas por ChatGPT, Perplexity, Claude, Copilot e Gemini caem em três caixas no GA4 default:

- **Referral** quando o referrer header chega íntegro (Perplexity, Copilot, Gemini).
- **Direct** quando o assistente estripa o referrer (Claude com `rel=noreferrer`, ChatGPT em app WKWebView/Custom Tabs, copy-paste de URL pelo usuário, política `strict-origin-when-cross-origin`).
- **Organic Search** quando o usuário entra via AI Overview clicando em link tradicional.

Sem um Custom Channel Group, o board lê tráfego de assistentes como "Direct cresceu 40%" — leitura falsa. O canal canônico "AI Traffic" é o substituto operacional do antigo "Organic" como bússola estratégica em 2026.

> **Atenção:** o GA4 introduziu em 2026 o valor de dimensão `ai-assistant` automaticamente quando o referrer header bate em assistentes reconhecidos. Cobertura ainda é parcial — o Custom Channel Group abaixo é mais confiável e auditável.

---

## 1. Quatro mecanismos que estripam o referrer (Wave E §3.1)

Documentar para o board entender por que "Direct" cresce sem campanha:

1. **`strict-origin-when-cross-origin`** — política padrão do `chatgpt.com` em links externos a partir de jun/2025. ChatGPT também passou a anexar `utm_source=chatgpt.com` em alguns links de citação, mas a cobertura é inconsistente entre web, app e plano Free vs Pro.
2. **`rel=noreferrer`** — Claude (claude.ai) e ChatGPT em algumas superfícies forçam o atributo, removendo o header `Referer` no clique.
3. **WKWebView (iOS) e Custom Tabs (Android)** — apps de ChatGPT, Perplexity e Claude em mobile abrem links via webview embarcada que não propaga referrer ao site de destino.
4. **Copy-paste de URL pelo usuário** — quando o usuário copia a URL citada pela IA e cola no browser, a sessão entra como Direct sem nenhum sinal de origem.

**Implicação operacional:** o canal "AI Traffic" via regex captura apenas o subconjunto que **manda referrer ou UTM**. Para cobertura completa, parear sempre com server-side log parsing (atividade de `ChatGPT-User`, `Perplexity-User`, `Claude-User`) — esse sim é 100% confiável.

---

## 2. Passo a passo — criar Custom Channel Group em GA4

### 2.1 Acessar Admin

1. GA4 → **Admin** (engrenagem inferior esquerda).
2. Coluna **Property** → seção **Data display** → **Channel groups**.
3. Clicar **Create new channel group**.
4. Nome canônico: `AI Traffic` (sem espaços antes/depois, sem acento — esse texto entra em export para Looker e BigQuery).

### 2.2 Criar regra "AI Traffic" no topo da ordem

A ordem das regras importa: a primeira que casa é aplicada. Posicionar **AI Traffic acima de Referral** e **acima de Organic Search**.

**Condição da regra:**

- Dimension: `Session source`
- Match type: `matches regex`
- Pattern (regex canônico Wave E §3.2):

```regex
(chatgpt|openai|perplexity|claude|anthropic|gemini\.google|copilot\.microsoft|bing\.com/chat|deepseek|grok|meta\.ai|you\.com)\.(com|ai)
```

Adicionar segunda condição com `OR`:

- Dimension: `Session medium`
- Match type: `matches regex`
- Pattern: `(ai|chatgpt|llm|assistant|generative)`

Adicionar terceira condição com `OR` (captura UTM canônico do ChatGPT):

- Dimension: `Session campaign`
- Match type: `contains`
- Value: `chatgpt`

### 2.3 Salvar e validar

1. Clicar **Save**.
2. GA4 leva 24-48h para reprocessar canais (não é retroativo na maioria dos relatórios padrão; é retroativo em Explore).
3. Validar em **Reports → Acquisition → Traffic acquisition** com filtro `Default channel group = AI Traffic` após 48h.
4. Se zero linhas após 72h, verificar no DebugView se algum evento atual está casando o regex via realtime.

---

## 3. Equivalente SQL para Looker Studio

> Looker Studio foi **renomeada de volta para Data Studio** em 11/04/2026 ([Google Workspace Updates](https://workspaceupdates.googleblog.com/) — `[VERIFICAR]` rebranding date precisa de fonte primária). O nome do produto na barra de menus pode aparecer como uma das duas grafias. SQL abaixo funciona em ambos.

### 3.1 Calculated Field em Looker Studio / Data Studio

```sql
CASE
  WHEN REGEXP_MATCH(Session source, "chatgpt|openai|perplexity|claude|anthropic|gemini|copilot|deepseek|meta\\.ai|you\\.com")
       OR REGEXP_MATCH(Session medium, "ai|chatgpt|llm|assistant|generative")
       OR LOWER(Session campaign) LIKE "%chatgpt%"
  THEN "AI Traffic"
  ELSE Session default channel group
END
```

Nome do field: `AI Channel Group` (ASCII puro).

### 3.2 Equivalente em BigQuery (export GA4)

```sql
SELECT
  PARSE_DATE('%Y%m%d', event_date) AS dia,
  CASE
    WHEN REGEXP_CONTAINS(
      LOWER(traffic_source.source),
      r'(chatgpt|openai|perplexity|claude|anthropic|gemini|copilot|deepseek|meta\.ai|you\.com)'
    ) THEN 'AI Traffic'
    WHEN REGEXP_CONTAINS(
      LOWER(traffic_source.medium),
      r'(ai|chatgpt|llm|assistant|generative)'
    ) THEN 'AI Traffic'
    WHEN LOWER(traffic_source.name) LIKE '%chatgpt%' THEN 'AI Traffic'
    ELSE default_channel_grouping
  END AS canal_canonico,
  COUNT(DISTINCT user_pseudo_id) AS usuarios,
  COUNTIF(event_name = 'session_start') AS sessoes,
  COUNTIF(event_name = 'generate_lead') AS leads
FROM `projeto.analytics_NNNNNN.events_*`
WHERE _TABLE_SUFFIX BETWEEN
  FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY))
  AND FORMAT_DATE('%Y%m%d', CURRENT_DATE())
GROUP BY dia, canal_canonico
ORDER BY dia DESC;
```

Substituir `projeto.analytics_NNNNNN` pelo dataset real do export GA4 → BigQuery.

---

## 4. Como ler o relatório depois de 30 dias

### 4.1 Métricas a monitorar semanalmente

| Métrica | Onde | Interpretação |
|---|---|---|
| Sessões AI Traffic | Reports → Traffic acquisition | Tendência de citação clicada |
| Engagement rate AI Traffic vs Organic | Reports → User acquisition | Visitante de AI converte 2,3-4,4× mais segundo Discovered Labs / Lantern |
| Top landing pages AI Traffic | Explore custom | Quais páginas a IA está citando com link |
| AI Traffic → goal completions | Reports → Conversions | Pipeline atribuível direto |
| Direct sessions YoY | Reports → Traffic acquisition | Cresce porque parte do AI cai em Direct |

### 4.2 Decomposição por engine

Em Explore, adicionar dimension secundária `Session source` para decompor:

- `chatgpt.com` — ChatGPT web
- `perplexity.ai` — Perplexity
- `copilot.microsoft.com` — Copilot
- `gemini.google.com` — Gemini
- `claude.ai` — Claude (parcial; bloqueia referrer em muitos casos)

Comparar com Mention Rate e Citation Rate reportados pela plataforma GEO (Profound, Peec, Otterly): se Citation Rate na plataforma sobe mas AI Traffic não acompanha, há bug de rel=noreferrer ou de captura. Investigar.

---

## 5. Limites e armadilhas conhecidas

1. **GA4 sampling em altas janelas.** Para 90 dias completos sem sampling, exportar para BigQuery. Default GA4 amostra acima de 10M eventos.
2. **AI Mode no GSC não está separado.** Em 2026, AI Mode e AI Overviews aparecem misturados com Web no relatório Performance. Não há filtro nativo até o cierre de 17/05/2026. Tracking confiável exige Ahrefs Brand Radar (41M queries AI Mode/mês) ou análise indireta via decay de CTR + crescimento de Impressões. Fontes: [Search Engine Journal](https://www.searchenginejournal.com/google-adds-ai-mode-traffic-to-search-console-reports/549089/) e [Google Developers — AI-powered configuration](https://developers.google.com/search/blog/2025/12/ai-powered-configuration).
3. **`utm_source=chatgpt.com` é inconsistente.** Implementado por OpenAI em jun/2025 mas cobertura parcial. Não dá para depender só do UTM; manter regex de source como fonte primária.
4. **Cookie consent (LGPD).** Sessões com consent recusado entram em modeled data (Consent Mode v2). O canal AI Traffic ainda computa, mas com identidade modelada.
5. **ChatGPT Search ativo em ~34,5% das queries (fev/2026).** Só citações com web search ativado batem no servidor; o resto da influência vem de training data. Tracking real-time captura apenas a fatia rastreável; estratégia de "data presence" antes do próximo training cutoff endereça o resto.
6. **Server-side log parsing é a única fonte 100% confiável.** Cruzar AI Traffic GA4 com hits de `ChatGPT-User`, `Perplexity-User` e `Claude-User` no log (regex em Apache/Nginx — ver Wave E §3.4). Cada 4xx ou 5xx nesses bots = citação perdida; tratar como P0.

---

## 6. Checklist canônico de implantação

- [ ] Channel group "AI Traffic" criado em Admin (item 2.1)
- [ ] Regex Wave E §3.2 colado e salvo (item 2.2)
- [ ] Posição AI Traffic acima de Referral e Organic Search confirmada
- [ ] Calculated Field "AI Channel Group" criado no Looker / Data Studio (item 3.1)
- [ ] Query BigQuery validada em sandbox (item 3.2)
- [ ] Server log parsing rodando (regex Wave E §3.4) e cruzando com GA4 AI Traffic
- [ ] Dashboard executivo Brasil GEO consumindo a métrica (Wave E §8.1)
- [ ] Alerta "AI Traffic cai mais de 15% semana-a-semana" configurado em Looker
- [ ] Revisão trimestral do regex para incluir novos assistentes (LLMs novos = patch de regex)

---

## Referências canônicas

- Wave E §3.1, §3.2, §3.4 — `docs/research/wave-E-kpis-measurement-20260517.md`
- KB SEO/GEO canônica — `docs/governance/seo-geo-knowledge-base-2026-05-17.md`
- Clickport — [Why ChatGPT Shows Direct in GA4](https://clickport.io/blog/chatgpt-direct-traffic-ga4)
- Databloo — [How to Track AI Traffic GA4 + Looker Studio](https://www.databloo.com/blog/how-to-track-ai-traffic/)
- Qwestyon — [GA4 Custom Channel Groups](https://www.qwestyon.com/blog/how-to-track-ai-traffic-in-ga4-using-custom-channel-groups)
- Delante — [GA4 AI Assistant Channel](https://delante.co/ga4-adds-a-ai-assistant-channel-what-it-changes/)
- Google Search Central — [AI-powered configuration](https://developers.google.com/search/blog/2025/12/ai-powered-configuration)
- Ahrefs — [Brand Radar Methodology](https://ahrefs.com/blog/brand-radar-methodology/)
- Discovered Labs — [GEO Metrics 2026](https://discoveredlabs.com/blog/geo-metrics-what-kpis-matter-how-to-track-them-2026)
