# Dossiê de Frontend — KPI Dashboard do Programa GEO IPOG

> **Documento:** 04 — Especificação Frontend do KPI Dashboard.
> **Cliente:** IPOG (Instituto de Pós-Graduação e Graduação, Goiânia).
> **Sponsor executivo:** Ronan Maia (CEO IPOG) — leitor mensal e trimestral.
> **Interlocutor operacional:** Bruno Azambuja (Gerente de Marketing IPOG) — leitor semanal, edição de relatórios.
> **Lead:** Alexandre Caramaschi (CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil) — owner editorial e de configuração.
> **Stack-base já decidida:** Next.js 16 + Recharts + Tailwind, Cloudflare Pages, warehouse D1 (SQLite) + R2 (Parquet) + DuckDB analítico (ADRs 002/003/005 do `docs/tech-stack/01-solution-architecture.md`).
> **Repositório alvo:** `github.com/alexandrebrt14-sys/geo-dashboard` (a criar).
> **Janela de entrega:** 01-05-2026 a 30-05-2026 (sprint de 30 dias até o fim da Fase 1).
> **Data:** 2026-05-01.
> **Autor:** Brasil GEO — Frontend Engineering.

Este documento especifica de ponta a ponta o KPI Dashboard que substitui o painel em Markdown vivo em `dashboards/KPI-DASHBOARD.md` por uma aplicação web reativa, segura e auditável. A premissa não-negociável é dupla. A primeira é fidelidade ao conjunto canônico de oito KPIs descrito em `dashboards/METRICAS-CANONICAS.md`: cohort fixo de seis LLMs com versão pinada, N mínimo declarado por leitura, owner único por KPI, janela de drift estabelecida, baseline `[a calibrar na Fase 1]` em vez de chute. A segunda é disciplina arquitetural: o dashboard consome dados do warehouse via API tipada, renderiza com Recharts no cliente apenas onde a interatividade compensa o custo de bundle, e degrada com graça quando uma leitura entra como `N/D`. Anti-padrões proibidos do `dashboards/METRICAS-CANONICAS.md` (Health Score combinado, comparar Mention Rate sem cohort, inflar autoridade contando re-menções, misturar versões na mesma série) são impostos no nível do componente: o renderizador recusa séries inválidas e exibe placeholder explicativo, não interpolação cosmética.

A audiência é tripla, com cadências distintas. Bruno Azambuja revisa em celular toda terça-feira de manhã antes da reunião de status semanal das 10h00 BRT — mobile-first é requisito, não nice-to-have. Ronan Maia recebe o checkpoint mensal e abre o dashboard em laptop para validar tendências antes de aprovar o board report. O Conselho IPOG, em sessão trimestral, imprime o documento para discussão presencial — `@media print` com paginação A4 deve renderizar relatórios sem cortar tabelas, com Gantt em paisagem A3 ou A4 landscape. O dashboard atende a três usuários com três jornadas, sem virar aplicativo distinto.

---

## Bloco A — Mapa de telas e navegação

### A.1 Estrutura de rotas

A navegação segue o App Router do Next.js 16 com dois grupos de layout: `(auth)` para fluxo de login (sem chrome do dashboard) e `(dashboard)` para tudo o que exige autenticação. A barra lateral é colapsável em desktop e vira drawer em mobile.

| Rota | Tela | Audiência primária | Cadência típica de acesso |
|---|---|---|---|
| `/` | Home / Painel Executivo | Todas as três personas | Diária para Alexandre, semanal para Bruno, mensal para Ronan |
| `/kpi/[id]` | Detalhe por KPI (1 a 8) | Alexandre + Bruno | Semanal a quinzenal |
| `/matriz-llm` | Cross-LLM Matrix | Alexandre + Bruno | Quinzenal |
| `/auditoria-schema` | Schema Audit (NAIA-200/299 + 080/088) | Bruno (owner KPI 4) | Mensal pós-auditoria + spot-check quinzenal |
| `/riscos` | Risk Heatmap (12 riscos) | Alexandre + Ronan | Mensal |
| `/relatorios/semanal/[periodo]` | Relatório semanal renderizado | Bruno + Alexandre | Semanal |
| `/relatorios/mensal/[periodo]` | Checkpoint executivo mensal | Ronan | Mensal |
| `/relatorios/trimestral/[periodo]` | Revisão estratégica trimestral | Conselho IPOG | Trimestral |
| `/finops` | FinOps cross-LLM + budget guards | Alexandre | Semanal |
| `/calendario` | Calendário de marcos críticos 2026 | Todas as três personas | Semanal a mensal |
| `/configuracao` | Versões pinadas, cohort, dicionário concorrentes | Alexandre (admin) | Trimestral |

### A.2 Tela 1 — Home / Painel Executivo (`/`)

**Propósito.** Responder em 30 segundos à pergunta "como o programa está hoje". Replica visualmente a seção 1 de `dashboards/KPI-DASHBOARD.md`, com semaforização operacional verde/amarelo/vermelho/cinza para cada um dos oito KPIs canônicos.

**Audiência primária.** Bruno Azambuja em celular antes da call de terça. Ronan Maia em laptop antes de aprovar o board report.

**Dados necessários.** Última leitura registrada por KPI no warehouse D1, com derivação de cor segundo o critério canônico do `KPI-DASHBOARD.md` (verde dentro de 10% da meta Fase 4 ou trajetória positiva consistente em 4 leituras; amarelo estagnado em 4+ leituras ou abaixo da meta em 25-50%; vermelho em queda em 2+ leituras consecutivas ou abaixo em mais de 50%; cinza quando há `N/D` em 1 ou mais leituras com causa registrada). Query SQL conceitual:

```sql
SELECT k.id, k.nome, k.owner, k.meta_fase_4,
       lr.valor, lr.timestamp, lr.versao_modelo, lr.n_observado,
       lr.causa_nd, hist.tendencia_4_leituras
FROM kpi k
LEFT JOIN leitura_recente lr ON lr.kpi_id = k.id
LEFT JOIN historico_4l hist ON hist.kpi_id = k.id
ORDER BY k.id;
```

**Componentes-chave.**

- `KpiSemaforo` — grade 4×2 em desktop, coluna única em mobile, com 8 a 11 cards (KPI 2 abre em três cards de cluster; KPI 7 em dois cards de LLM, conforme tabela seção 1 do KPI-DASHBOARD).
- `EstadoGeralBanner` — banner contextual no topo (ex.: "baseline pré-Fase 1 — todas as leituras pendentes da primeira coleta cross-LLM").
- `UltimaLeituraTimestamp` — chip com `Última leitura registrada: 2026-05-01 09h32 BRT` e `Próxima leitura agendada: 2026-05-02 06h00 BRT`.
- `LegendaSemaforo` — legenda horizontal em desktop, modal em mobile.

**Layout mobile (< 640px).** Cards em coluna única, cada card com altura 96 px, ícone de cor sólida na esquerda, KPI + leitura atual + delta no centro, ícone de seta para abrir detalhe. Banner do estado geral fica fixo no topo (sticky) com height 48 px.

**Layout desktop (>= 1024px).** Grade 4×3 (12 slots; sobra de 1 a 4 conforme decomposição de KPI 2 e 7). Cada card 280 × 160 px. Banner do estado geral em barra full-width acima.

### A.3 Tela 2 — Detalhe por KPI (`/kpi/[id]`)

**Propósito.** Aprofundar leitura de um KPI específico — histórico, decomposição (por LLM, por persona, por cluster, por jornada), heatmap de risco quando aplicável e link para issues GitHub correlacionadas.

**Audiência primária.** Alexandre Caramaschi em revisão semanal, Bruno Azambuja em diagnóstico de gap.

**Dados necessários.** Série temporal completa do KPI no warehouse, com decomposições. Para KPI 1: série diária de Mention Rate por LLM × persona × cluster × jornada, com versão pinada por ponto. Para KPI 2: série quinzenal por cluster com top-N concorrentes. Para KPI 8: pares pré/pós-onda com waterfall de variação.

**Componentes-chave.**

- `KpiHeader` — título, owner, fórmula em popover, link para `dashboards/METRICAS-CANONICAS.md` no GitHub.
- `KpiTendenciaPrincipal` — gráfico principal (componente específico por KPI; ver Bloco B).
- `DecomposicaoTabs` — tabs `Por LLM | Por persona | Por cluster | Por jornada`. Cada tab renderiza componente específico.
- `HistoricoTabela` — tabela paginada com colunas data, valor, N, versão pinada, fonte, link issue.
- `MatrizExplicativa` — extrato da "Matriz de leitura cruzada" do `METRICAS-CANONICAS.md` filtrada para o KPI corrente, mostrando "explicado por" e "diagnóstico negativo".

**Mobile.** Decomposição vira accordion (uma seção por tipo). Tabela de histórico vira lista de cards. Gráfico principal mantém altura, simplifica eixos (remove minor ticks).

**Desktop.** Header full-width, gráfico principal em 2/3 da largura, painel lateral com fórmula + N mínimo + owner + meta Fase 4 em 1/3.

### A.4 Tela 3 — Cross-LLM Matrix (`/matriz-llm`)

**Propósito.** Réplica reativa de `audits/benchmarking/matriz-presenca-llm.md`. Para cada combinação cluster × persona × jornada × prompt, mostra qual LLM citou IPOG e com que qualidade.

**Audiência primária.** Alexandre Caramaschi em diagnóstico de qual LLM tem gap em qual cluster.

**Dados necessários.** Tabela `coleta_resultado` com colunas `llm`, `versao_modelo`, `cluster`, `persona`, `jornada`, `prompt_id`, `ipog_mencionado` (booleano), `citation_quality` (0 a 100), `data_coleta`. Filtros multi-select aplicados via TanStack Query com debounce de 200 ms.

**Componentes-chave.**

- `FiltrosMatriz` — sticky bar com seletores `Cluster (3)`, `Persona (7)`, `Jornada (4)`, `Período (presets: últimos 7d, 14d, 30d, custom)`.
- `MatrizHeatmap` — grade 6 LLMs × N prompts (filtrados). Célula colorida por taxa de menção em verde→vermelho. Hover mostra tooltip com versão pinada, N de respostas, exemplo de citação.
- `LlmRankingBar` — barra horizontal lateral ranqueando os 6 LLMs por Mention Rate agregado no filtro corrente.
- `ExportarCsv` — botão que exporta a matriz filtrada para CSV.

**Mobile.** Matriz vira tabela com scroll horizontal e header sticky. Filtros viram drawer bottom-sheet.

**Desktop.** Filtros à esquerda (sidebar 240 px), matriz no centro, ranking lateral à direita.

### A.5 Tela 4 — Schema Audit (`/auditoria-schema`)

**Propósito.** Painel dos checks NAIA-200 a NAIA-299 (auditoria categoria J — autoridade) e NAIA-080 a NAIA-088 (Schema institucional), com pass/fail por check, severidade e Schema Coverage Score atual.

**Audiência primária.** Bruno Azambuja, owner do KPI 4.

**Dados necessários.** Última auditoria NAIA mensal completa + último spot-check quinzenal P0/P1, materializados no warehouse a partir do `NAIA Audit Engine` (container B.2 do `01-solution-architecture.md`).

**Componentes-chave.**

- `SchemaScoreGauge` — gauge central 0 a 100 mostrando Schema Coverage Score corrente.
- `CategoriaDonut` — donut chart por categoria NAIA (A institucional, B curso, C FAQ/blog, D pessoas, J autoridade) com pass/fail.
- `ChecksTabela` — tabela detalhada `check_id | descrição | severidade | status | issue_github | data_validação`.
- `HistoricoSerie` — line chart Schema Coverage Score por mês (12 últimos meses).

**Mobile.** Gauge ocupa toda a largura. Donut em accordion. Tabela vira lista de cards filtrável por severidade.

**Desktop.** Gauge à esquerda (1/3), donut central (1/3), tabela ocupando bottom full-width.

### A.6 Tela 5 — Risk Heatmap (`/riscos`)

**Propósito.** Replicar os 12 riscos canônicos de `docs/05-risk-register.md` em matriz prob × impacto interativa.

**Audiência primária.** Alexandre + Ronan no checkpoint mensal.

**Dados necessários.** Tabela `risco` com `id`, `descricao`, `probabilidade` (alta/média/baixa), `impacto` (crítico/alto/médio/baixo), `status` (mitigado/aceito/em escalada/materializado), `owner`, `kpis_afetados`, `mitigacao_ativa`, `gatilho_escalonamento`, `data_atualizacao`.

**Componentes-chave.**

- `RiskHeatmap` — grade 4 (impacto crítico/alto/médio/baixo) × 3 (prob alta/média/baixa). Pontos coloridos por status. Hover mostra tooltip; click abre drawer.
- `RiscoDrawer` — drawer lateral com detalhes completos do risco.
- `RiscoTimeline` — timeline lateral com mudanças de status nos últimos 90 dias.

**Mobile.** Heatmap mantém grade reduzida (cells 56 px), drawer vira modal full-screen.

### A.7 Tela 6 — Relatórios (`/relatorios/[cadencia]/[periodo]`)

**Propósito.** Renderizar relatório semanal (`YYYY-WW`), mensal (`YYYY-MM`) ou trimestral (`YYYY-Q`) com mesmo conteúdo dos `_TEMPLATE.md` em `docs/relatorios-*`. Em modo edição, Bruno e Alexandre podem preencher seções editoriais (ex.: "1. Sumário executivo"); em modo leitura, Ronan e Conselho consomem.

**Audiência primária.** Bruno (semanal), Ronan (mensal), Conselho (trimestral).

**Dados necessários.** Conteúdo Markdown dos relatórios (gerados pelo Reporting Service em `geo-platform`) + leituras KPI em tempo real do warehouse para renderizar tabelas dinamicamente quando o relatório referenciar.

**Componentes-chave.**

- `ReportSection` — componente reutilizável (props `template: 'semanal' | 'mensal' | 'trimestral'`, `period`).
- `ReportToolbar` — botões Imprimir, Exportar PDF, Editar (gated por role), Compartilhar link público com TTL.
- `KpiInlineCard` — card compacto embutido em seções do relatório que faz fetch da leitura mais recente.

**Mobile.** Toolbar fica sticky bottom com 4 ícones (imprimir, PDF, editar, compartilhar). Conteúdo em coluna única com tipografia ajustada (16 px base).

**Print CSS.** A4 retrato para semanal e mensal, A4 paisagem para trimestral (que inclui Gantt). Ver Bloco F.

### A.8 Tela 7 — FinOps (`/finops`)

**Propósito.** Custo cross-LLM diário/semanal/mensal por provider, budget guards e alertas. Bruno raramente acessa; Alexandre revisa semanalmente.

**Audiência primária.** Alexandre Caramaschi.

**Dados necessários.** Tabela `execucao_custo` com `provider`, `model`, `input_tokens`, `output_tokens`, `cost_usd`, `timestamp`. Agregações em pandas/DuckDB.

**Componentes-chave.**

- `BudgetGuardCards` — três cards: Sprint vigente, Mês vigente, Trimestre vigente. Cada card mostra gasto / teto, com barra de progresso. Verde até 70%, amarelo 70-90%, vermelho >90%.
- `CustoPorProviderStacked` — stacked bar diário por provider (6 cores fixas por LLM).
- `AlertasTimeline` — feed de alertas FinOps disparados (ex.: "2026-05-04 08h12 — gasto Anthropic ultrapassou 60% do teto sprint").

### A.9 Tela 8 — Calendário de marcos (`/calendario`)

**Propósito.** Réplica reativa de `docs/06-marcos-criticos-2026.md` com Gantt simplificado das 4 fases + marcos D-Day.

**Audiência primária.** Todas as três personas.

**Dados necessários.** Tabela `marco` com `id`, `titulo`, `janela_inicio`, `janela_fim`, `owner`, `status`, `dependencias[]`, `metrica_aceite`.

**Componentes-chave.**

- `GanttCalendar` — barra horizontal por fase com cores fixas (Fase 1 azul, Fase 2 violeta, Fase 3 laranja, Fase 4 verde), marcos D-Day como pontos verticais.
- `MarcosLista` — tabela lateral com lista cronológica.
- `JanelaCriticaBanner` — banner de janela crítica corrente (ex.: "Janela crítica em maio: 4 marcos pendentes nos próximos 14 dias").

**Mobile.** Gantt vira lista cronológica com chips de status. Marcos clicáveis abrem drawer.

---

## Bloco B — Componentes Tremor/Recharts mapeados aos KPIs

A nota técnica importante: **a stack canônica decidida em ADR-005 do `01-solution-architecture.md` é Recharts**, não Tremor. O briefing menciona Tremor v3 como opção; nesta especificação, optamos por **Recharts como charting primário** e **Tremor v3 apenas para componentes de layout** (Card, Metric, BadgeDelta, Tracker, ProgressBar, Tab) que economizam código repetitivo. Os gráficos críticos são Recharts diretamente para garantir controle total — Tremor abstrai bem 80% dos casos, mas componentes não-óbvios (waterfall do KPI 8, gauge customizado do KPI 3, heatmap do KPI 1 cross-LLM) demandam Recharts puro ou d3-scale.

Trade-off explícito: Tremor reduz tempo de desenvolvimento das telas mais simples (Painel Executivo, FinOps) em ~30%, ao custo de bundle adicional de ~45 KB gzip. Para um dashboard com 3 a 5 acessos diários por usuário, o custo é aceitável. Alternativa rejeitada: usar somente Recharts e construir layout do zero — economiza bundle, mas adiciona 1 a 2 dias ao roadmap de 30 dias.

### B.1 KPI 1 — LLM Mention Rate

**Visualização escolhida.** Line chart cross-LLM com 6 linhas (uma por LLM do cohort) + delta semanal exibido em badge no topo + tooltip com versão pinada por ponto.

**Importação:**

```ts
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, Title, BadgeDelta } from "@tremor/react";
```

**Props essenciais:**

```ts
type LlmMentionRateChartProps = {
  series: Array<{
    date: string;
    chatgpt: number | null;
    claude: number | null;
    gemini: number | null;
    perplexity: number | null;
    grok: number | null;
    copilot: number | null;
    n_total: number;
  }>;
  decomposition?: "llm" | "persona" | "cluster";
  highlightLlm?: "chatgpt" | "claude" | "gemini" | "perplexity" | "grok" | "copilot";
};
```

**Exemplo de código:**

```tsx
export function LlmMentionRateChart({ series, decomposition = "llm" }: LlmMentionRateChartProps) {
  const cohort = ["chatgpt", "claude", "gemini", "perplexity", "grok", "copilot"] as const;
  const colors: Record<typeof cohort[number], string> = {
    chatgpt: "#10a37f",
    claude: "#cc785c",
    gemini: "#4285f4",
    perplexity: "#20808d",
    grok: "#000000",
    copilot: "#0078d4",
  };
  return (
    <Card>
      <Title>LLM Mention Rate — cohort canônico</Title>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={series} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
          <Tooltip
            formatter={(value: number, name: string, props) => [
              value === null ? "N/D" : `${value.toFixed(1)}%`,
              `${name} (N=${props.payload.n_total})`,
            ]}
          />
          <Legend />
          {cohort.map((llm) => (
            <Line
              key={llm}
              type="monotone"
              dataKey={llm}
              stroke={colors[llm]}
              strokeWidth={2}
              dot={false}
              connectNulls={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
```

**Fallback.** Se Recharts apresentar problema de renderização em mobile (já visto em Recharts 2 com `ResponsiveContainer` em flex pais), fallback é `victory-line` ou render manual em `<svg>` com `d3-scale`. Probabilidade baixa em Recharts 3.

### B.2 KPI 2 — Share-of-Voice por cluster

**Visualização escolhida.** Stacked bar chart por cluster com legend de top-N concorrentes; treemap secundário para visualizar concentração.

**Importação:**

```ts
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Treemap, ResponsiveContainer } from "recharts";
```

**Props essenciais:**

```ts
type SovStackedBarProps = {
  cluster: "organizacional" | "clinica-neuro-tcc-avaliacao" | "psicopedagogia-escolar";
  period: { start: string; end: string };
  competitors: Array<{ slug: string; nome: string; cor: string }>;
  data: Array<{ date: string } & Record<string, number>>;
};
```

**Comportamento crítico.** O stacking respeita o dicionário canônico de concorrentes mantido em `data/concorrentes.yaml` (nota canônica do `METRICAS-CANONICAS.md`). Quando o dicionário mudar de versão, o gráfico exibe um divisor vertical no eixo X com label "v2 a partir de 2026-07-01" — não interpola entre versões.

### B.3 KPI 3 — Citation Quality Score

**Visualização escolhida.** Gauge chart 0-100 + breakdown horizontal dos 5 fatos canônicos (formato lato sensu MEC, carga horária, autorização MEC, modalidade Online Ao Vivo, diferencial editorial).

**Importação:**

```ts
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { Card, Title, ProgressBar } from "@tremor/react";
```

**Exemplo:**

```tsx
export function CitationQualityGauge({ score, fatos }: CitationQualityGaugeProps) {
  const data = [{ name: "score", value: score, fill: getCorPorScore(score) }];
  return (
    <Card>
      <Title>Citation Quality Score</Title>
      <ResponsiveContainer width="100%" height={220}>
        <RadialBarChart innerRadius="80%" outerRadius="100%" data={data} startAngle={180} endAngle={0}>
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="value" cornerRadius={8} background={{ fill: "#e5e7eb" }} />
          <text x="50%" y="55%" textAnchor="middle" className="text-3xl font-bold">{score.toFixed(0)}</text>
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="space-y-2 mt-4">
        {fatos.map((f) => (
          <div key={f.id}>
            <div className="flex justify-between text-sm"><span>{f.label}</span><span>{f.percent}%</span></div>
            <ProgressBar value={f.percent} color={getCorPorPercent(f.percent)} />
          </div>
        ))}
      </div>
    </Card>
  );
}
```

**Fallback.** Tremor v3 oferece `<Tracker>` que serve como gauge segmentado caso `RadialBarChart` produza renderização inconsistente em iOS Safari.

### B.4 KPI 4 — Schema Coverage Score (NAIA)

**Visualização escolhida.** Donut chart pass/fail por categoria NAIA + score gauge central.

**Importação:**

```ts
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
```

**Comportamento crítico.** Severidade é considerada visualmente — a fatia do donut é proporcional ao peso (P0 vale 5, P1 vale 2, P2 vale 1, P3 não conta), espelhando a fórmula canônica `100 - (5 × P0_falhando) - (2 × P1_falhando) - (1 × P2_falhando)`. A donut não inverte: pass/fail são as cores; severidade é o tamanho da fatia.

### B.5 KPI 5 — Cobertura de fontes externas

**Visualização escolhida.** Counter card grande no topo + tabela com 4 tipos de fonte (Wikipedia, regulatórias/setoriais, mídias educacionais tier 1, periódicos acadêmicos).

**Importação:**

```ts
import { Card, Metric, Text } from "@tremor/react";
```

**Exemplo:**

```tsx
export function CoberturaFontesCard({ total, breakdown }: CoberturaFontesProps) {
  return (
    <Card>
      <Text>Fontes externas reputadas — janela 12 meses</Text>
      <Metric>{total}</Metric>
      <Text className="mt-2">Meta Fase 4: 8 fontes</Text>
      <table className="mt-4 w-full text-sm">
        <thead><tr><th>Tipo</th><th>Atual</th><th>Mínimo Fase 4</th></tr></thead>
        <tbody>
          {breakdown.map((b) => (
            <tr key={b.tipo}><td>{b.tipo}</td><td>{b.atual}</td><td>{b.minimo}</td></tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
```

### B.6 KPI 6 — Velocidade fechamento P0/P1

**Visualização escolhida.** Box plot mensal com mediana de dias úteis para P0 e P1 separados.

**Importação.** Recharts não tem `BoxPlot` nativo. Solução: render manual via `<ComposedChart>` + `<Scatter>` para mediana + `<ErrorBar>` para quartis. Alternativa simples e mais legível: `BarChart` com erro implícito mostrando apenas a mediana e um intervalo p25-p75 como erro acima/abaixo.

```tsx
import { ComposedChart, Bar, ErrorBar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export function VelocidadeFechamentoBox({ data }: VelocidadeFechamentoBoxProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={data}>
        <XAxis dataKey="mes" />
        <YAxis label={{ value: "Dias úteis", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Bar dataKey="mediana_p0" fill="#ef4444">
          <ErrorBar dataKey={["p0_p25", "p0_p75"]} stroke="#7f1d1d" />
        </Bar>
        <Bar dataKey="mediana_p1" fill="#f59e0b">
          <ErrorBar dataKey={["p1_p25", "p1_p75"]} stroke="#78350f" />
        </Bar>
      </ComposedChart>
    </ResponsiveContainer>
  );
}
```

### B.7 KPI 7 — Conversion Lift

**Visualização escolhida.** Bar chart por LLM com baseline orgânico Google representado como linha de referência horizontal em y=1.0 (lift neutro).

```tsx
import { BarChart, Bar, ReferenceLine, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export function ConversionLiftChart({ data }: ConversionLiftChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="llm" />
        <YAxis label={{ value: "Lift (× Google orgânico)", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <ReferenceLine y={1.0} stroke="#6b7280" strokeDasharray="4 4" label="Baseline" />
        <ReferenceLine y={1.3} stroke="#10b981" strokeDasharray="2 2" label="Meta Fase 4" />
        <Bar dataKey="lift">
          {data.map((d) => (
            <Cell key={d.llm} fill={d.lift >= 1.3 ? "#10b981" : d.lift >= 1.0 ? "#f59e0b" : "#ef4444"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
```

### B.8 KPI 8 — Delta pré/pós ondas

**Visualização escolhida.** Waterfall chart por onda mostrando delta acumulado nos KPIs 1, 2, 3 e 4.

**Importação.** Recharts não tem waterfall nativo; render via `BarChart` com `Bar` invisível para offset.

```tsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from "recharts";

export function WaterfallDeltaOnda({ data }: WaterfallDeltaOndaProps) {
  const computed = data.map((row, idx, arr) => {
    const baseValue = idx === 0 ? 0 : arr.slice(0, idx).reduce((acc, r) => acc + r.delta, 0);
    return { ...row, base: baseValue, value: Math.abs(row.delta), positive: row.delta >= 0 };
  });
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={computed}>
        <XAxis dataKey="onda" />
        <YAxis label={{ value: "Pontos", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Bar dataKey="base" stackId="wf" fill="transparent" />
        <Bar dataKey="value" stackId="wf">
          {computed.map((c, i) => (
            <Cell key={i} fill={c.positive ? "#10b981" : "#ef4444"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
```

---

## Bloco C — Stack frontend completa

| Camada | Tecnologia | Versão | Justificativa |
|---|---|---|---|
| Framework | Next.js | 16.x | App Router, Server Components default, Edge Runtime nativo, alinhamento com `landing-page-geo`. |
| Linguagem | TypeScript | 5.x | Tipos ponta-a-ponta com OpenAPI/tRPC; reduz classe inteira de bugs. |
| UI library | Tremor v3 | 3.x | Cards, Metrics, ProgressBar, Tracker — componentes específicos de dashboard que economizam ~30% de código. |
| Charting | Recharts | 3.x | Composability React-native, comunidade grande, controle total para waterfall e gauge customizados. |
| Estilo | Tailwind CSS | 4.x | Utility-first; mesma stack do `landing-page-geo`; suporte nativo a dark mode. |
| Primitives acessíveis | Radix UI | latest | Drawer, Dialog, Popover, Tabs com a11y de série. |
| State (server) | TanStack Query | 6.x | Cache, dedup, refetch on focus; padrão para dashboards data-intensive. |
| State (UI local) | Zustand | 5.x | Filtros globais (período, cluster), preferências UI (dark/light, idioma). |
| Auth | NextAuth | 5.x | GitHub OAuth (Alexandre), magic link Resend (Bruno, Ronan, Conselho). |
| Data fetching | OpenAPI Schema + openapi-fetch + Zod | latest | Backend `geo-platform` em Python expõe OpenAPI; cliente tipado gerado. tRPC rejeitado por exigir backend Node. |
| Forms | React Hook Form + Zod | 7.x / 4.x | Padrão React mais maduro; integração natural com Zod schemas do contrato OpenAPI. |
| Internationalization | next-intl | 4.x | PT-BR primário; EN secundário para Conselho IPOG bilíngue se demandado. |
| Print | Tailwind `print:` + CSS `@page` | nativo | A4 retrato e paisagem; `page-break-after` e `page-break-inside: avoid`. |
| Observability cliente | web-vitals + Axiom | latest | LCP, INP, CLS enviados a Axiom (free tier 500 GB/mês). |
| Error tracking | Sentry | latest | Free tier 5k erros/mês; suficiente para dashboard interno. |
| Hosting | Cloudflare Pages | nativo | Mesmo provider do warehouse (D1, R2); zero egress; ADR-002. |
| Testes unitários | Vitest | 2.x | Mais rápido que Jest; integração nativa com Vite/Next. |
| Testes E2E | Playwright | 2.x | Cobertura cross-browser; padrão atual para Next.js. |
| Linting | ESLint + Prettier + TypeScript ESLint | latest | Config compartilhada com `landing-page-geo`. |
| Package manager | pnpm | 10.x | Workspaces leves caso futuras libs internas surjam. |

**Justificativa de decisões controversas.**

- **Recharts em vez de Tremor para charts.** Trade-off: Tremor abstrai bem 80% dos casos, mas KPI 8 (waterfall), KPI 3 (gauge customizado) e KPI 1 (linhas com `connectNulls={false}`) são significativamente mais flexíveis em Recharts puro. Bundle de Tremor charts (~25 KB gzip) fica fora; mantemos Tremor só para layout. Alternativa rejeitada: usar 100% Tremor — perde controle em waterfall e gauge.
- **OpenAPI + openapi-fetch em vez de tRPC.** Backend `geo-platform` é Python (ADR-001). tRPC exige backend Node. OpenAPI é gerado automaticamente por FastAPI; cliente tipado via `openapi-typescript` + `openapi-fetch` mantém DX similar a tRPC. Alternativa rejeitada: criar BFF Node em Cloudflare Workers — adiciona camada sem benefício claro nesta escala.
- **Zustand em vez de Redux Toolkit.** Estado global é trivial (filtros + UI prefs). Zustand resolve em 1 KB; Redux seria overkill.

---

## Bloco D — Estrutura de pastas e arquivos

```
geo-dashboard/
  .github/
    workflows/
      pr-check.yml
      deploy-staging.yml
      deploy-production.yml
      lighthouse.yml
      e2e.yml
  .vscode/
    settings.json
    extensions.json
  public/
    favicon.ico
    logo-brasil-geo.svg
    print/
      a4-retrato.css
      a4-paisagem.css
  src/
    app/
      layout.tsx                          # root layout, providers, fontes
      globals.css                         # Tailwind directives + tokens
      not-found.tsx                       # 404 com link para home
      error.tsx                           # error boundary global
      (auth)/
        layout.tsx                        # layout sem chrome
        sign-in/
          page.tsx                        # tela de login (GitHub + magic link)
        verify-email/
          page.tsx                        # callback do magic link
      (dashboard)/
        layout.tsx                        # sidebar + header + auth gate
        page.tsx                          # Home / Painel Executivo
        kpi/
          [id]/
            page.tsx                      # Detalhe KPI 1 a 8
            loading.tsx                   # skeleton
            error.tsx                     # erro contextual
        matriz-llm/
          page.tsx
          loading.tsx
        auditoria-schema/
          page.tsx
          loading.tsx
        riscos/
          page.tsx
        relatorios/
          layout.tsx                      # layout específico de relatório (print-friendly)
          semanal/
            [periodo]/
              page.tsx
          mensal/
            [periodo]/
              page.tsx
          trimestral/
            [periodo]/
              page.tsx
        finops/
          page.tsx
        calendario/
          page.tsx
        configuracao/
          page.tsx                        # admin only: cohort, versões pinadas
      api/
        auth/
          [...nextauth]/
            route.ts                      # NextAuth handler
        kpi/
          [id]/
            route.ts                      # GET /api/kpi/{1..8}
        matriz-llm/
          route.ts
        auditoria-schema/
          route.ts
        riscos/
          route.ts
        relatorios/
          [cadencia]/
            [periodo]/
              route.ts
        finops/
          route.ts
        calendario/
          route.ts
        health/
          route.ts                        # liveness probe
    components/
      layout/
        Sidebar.tsx
        Header.tsx
        MobileDrawer.tsx
        Footer.tsx
        PrintLayout.tsx
      kpi/
        KpiCard.tsx
        KpiSemaforo.tsx
        KpiHeader.tsx
        KpiInlineCard.tsx
      charts/
        LlmMentionRateChart.tsx           # KPI 1
        SovStackedBar.tsx                 # KPI 2
        SovTreemap.tsx                    # KPI 2 secundário
        CitationQualityGauge.tsx          # KPI 3
        SchemaCoverageDonut.tsx           # KPI 4
        SchemaScoreGauge.tsx              # KPI 4
        CoberturaFontesCard.tsx           # KPI 5
        VelocidadeFechamentoBox.tsx       # KPI 6
        ConversionLiftChart.tsx           # KPI 7
        WaterfallDeltaOnda.tsx            # KPI 8
      matriz/
        FiltrosMatriz.tsx
        MatrizHeatmap.tsx
        LlmRankingBar.tsx
      schema/
        ChecksTabela.tsx
        CategoriaDonut.tsx
      riscos/
        RiskHeatmap.tsx
        RiscoDrawer.tsx
        RiscoTimeline.tsx
      relatorios/
        ReportSection.tsx
        ReportToolbar.tsx
        ReportPrintHeader.tsx
      finops/
        BudgetGuardCards.tsx
        CustoPorProviderStacked.tsx
        AlertasTimeline.tsx
      calendario/
        GanttCalendar.tsx
        MarcosLista.tsx
        JanelaCriticaBanner.tsx
      common/
        EmptyState.tsx                    # render quando N < N_minimo
        LoadingSkeleton.tsx
        ErrorBoundary.tsx
        ExportarCsv.tsx
        ExportarPdf.tsx
        VersionPinBadge.tsx               # exibe versão pinada do LLM
        DeltaBadge.tsx
        SemaforoIndicador.tsx
    lib/
      api/
        client.ts                         # openapi-fetch instance
        types.ts                          # tipos gerados de openapi-typescript
        endpoints/
          kpi.ts
          matriz.ts
          auditoria.ts
          riscos.ts
          relatorios.ts
          finops.ts
          calendario.ts
      auth/
        config.ts                         # NextAuth config
        roles.ts                          # admin/editor/reader
        middleware-helpers.ts
      queries/
        kpi-1-mention-rate.ts
        kpi-2-sov.ts
        kpi-3-citation-quality.ts
        kpi-4-schema-coverage.ts
        kpi-5-fontes-externas.ts
        kpi-6-velocidade-fechamento.ts
        kpi-7-conversion-lift.ts
        kpi-8-delta-pos-onda.ts
      types/
        kpi.ts
        risco.ts
        marco.ts
        coleta.ts
      utils/
        format.ts                         # PT-BR number/percent formatters
        date.ts                           # date-fns wrappers PT-BR
        cores-llm.ts                      # paleta cohort cohort canônico
        semaforo.ts                       # lógica verde/amarelo/vermelho/cinza
        n-minimo.ts                       # validação N mínimo por KPI
      voice-guard-client.ts               # client HTTP para Voice Guard service
    hooks/
      useKpi.ts
      useFiltrosGlobais.ts
      useTheme.ts
      usePrintMode.ts
      useRole.ts
    store/
      filtros.ts                          # Zustand: filtros globais
      ui.ts                               # Zustand: dark mode, idioma, mobile drawer
    locales/
      pt-BR.json
      en.json
    styles/
      globals.css
      print.css
      tokens.css                          # design tokens
  middleware.ts                           # auth gate em (dashboard) group
  next.config.ts
  tailwind.config.ts
  tsconfig.json
  package.json
  pnpm-lock.yaml
  README.md
  .env.example
  .gitignore
  vitest.config.ts
  playwright.config.ts
  openapi-codegen.config.ts
  CLAUDE.md                               # instruções operacionais para Claude Code
```

Total: 30+ arquivos sob `src/` excluindo testes (que ficam em `__tests__/` espelhando estrutura).

---

## Bloco E — Componentes-chave (especificação)

### E.1 `KpiSemaforo`

**Propósito.** Renderizar grade de cards do Painel Executivo. Cada card mostra leitura atual, meta Fase 4, cor semaforizada, tendência das últimas 4 leituras.

**Props:**

```ts
type KpiSnapshot = {
  id: number;                          // 1..8
  nome: string;
  decomposicao?: string;               // ex.: "cluster Organizacional" para KPI 2
  leitura_atual: number | null;        // null = N/D
  unidade: "percent" | "score" | "count" | "dias" | "lift";
  meta_fase_4: string;                 // string para acomodar "varia por LLM"
  cor: "verde" | "amarelo" | "vermelho" | "cinza";
  tendencia: Array<number | null>;     // últimas 4 leituras
  owner: string;
  causa_nd?: string;                   // exibido quando cor === "cinza"
  href: string;                        // link para /kpi/[id]
};

type KpiSemaforoProps = {
  data: KpiSnapshot[];
  onCardClick?: (id: number) => void;
};
```

**Comportamento:**

- Card clicável navega para `/kpi/[id]` (ou abre drawer em mobile).
- Quando `cor === "cinza"`, card renderiza causa em italic abaixo do valor (ex.: "Pendente da primeira coleta").
- Mini-sparkline de tendência usa `ResponsiveContainer` com 60 px de altura.
- Suporta keyboard navigation (Tab + Enter abre detalhe).

**Acessibilidade.** Cor é redundante a ícone (verde = check, amarelo = alerta, vermelho = warning, cinza = info). `aria-label` descreve KPI completo. Contraste mínimo 4.5:1 verificado.

### E.2 `LlmMentionRateChart`

Já especificado no Bloco B.1. Adicional: prop `decomposition` controla a granularidade — `"llm"` mostra 6 linhas (default), `"persona"` mostra 7 linhas (uma por persona), `"cluster"` mostra 3 linhas (uma por cluster).

**Comportamento crítico.** Quando ponto tem `n_observado < 50` (N mínimo do KPI 1), o ponto fica como `null` e a linha quebra (`connectNulls={false}`). Isso impede a interpolação visual proibida pelo princípio canônico "N mínimo por leitura".

### E.3 `SovStackedBar`

**Props:**

```ts
type SovStackedBarProps = {
  cluster: "organizacional" | "clinica-neuro-tcc-avaliacao" | "psicopedagogia-escolar";
  period: { start: string; end: string };
  competitors: Array<{ slug: string; nome: string; cor: string }>;
  data: Array<{ date: string } & Record<string, number>>;
  versaoDicionario: string;            // ex.: "2026-Q2"
};
```

**Comportamento crítico.** Renderiza badge no topo direito com versão do dicionário de concorrentes (`versaoDicionario`). Quando série atravessa duas versões, divide visualmente por `<ReferenceLine>` vertical.

### E.4 `RiskHeatmap`

**Props:**

```ts
type Risco = {
  id: string;                          // "R-001" ... "R-012"
  descricao: string;
  probabilidade: "alta" | "media" | "baixa";
  impacto: "critico" | "alto" | "medio" | "baixo";
  status: "mitigado" | "aceito" | "em-escalada" | "materializado";
  owner: string;
  kpis_afetados: number[];
  mitigacao_ativa: string;
  gatilho_escalonamento: string;
  data_atualizacao: string;
};

type RiskHeatmapProps = {
  risks: Risco[];
  onRiskClick?: (id: string) => void;
  highlightStatus?: Risco["status"];
};
```

**Comportamento.** Grade 3 colunas (probabilidade) × 4 linhas (impacto). Em cada célula, pontos coloridos por status (`mitigado` verde, `aceito` cinza, `em-escalada` amarelo, `materializado` vermelho) com offset jittered se múltiplos riscos caem na mesma célula. Hover mostra ID + descrição abreviada; click abre `RiscoDrawer`.

### E.5 `GanttCalendar`

**Props:**

```ts
type Fase = {
  id: 1 | 2 | 3 | 4;
  nome: string;
  inicio: string;                      // ISO date
  fim: string;
  cor: string;
  status: "concluida" | "em-curso" | "a-iniciar" | "atrasada";
};

type Marco = {
  id: string;
  titulo: string;
  data: string;
  owner: string;
  status: "concluido" | "pendente" | "em-curso" | "a-iniciar" | "a-programar";
  dependencias: string[];
  metrica_aceite: string;
};

type GanttCalendarProps = {
  phases: Fase[];
  milestones: Marco[];
  highlightWindow?: { start: string; end: string };
  view?: "timeline" | "lista";
};
```

**Comportamento.** Em desktop, renderiza barras horizontais por fase com escala de tempo de 8 meses (mai a dez 2026 conforme `06-marcos-criticos-2026.md`). Marcos D-Day são pontos verticais. Em mobile, default é `view="lista"` cronológica com chips de status.

### E.6 `ReportSection`

**Props:**

```ts
type ReportSectionProps = {
  template: "semanal" | "mensal" | "trimestral";
  period: string;                      // "2026-W19", "2026-05", "2026-Q2"
  mode?: "view" | "edit";
  sectionId?: string;                  // se quiser renderizar só uma seção
};
```

**Comportamento.** Server Component que faz fetch do conteúdo Markdown (gerado por `Reporting Service` no `geo-platform`) e renderiza com `react-markdown` + `remark-gfm`. Quando o Markdown referencia `<KpiInlineCard kpiId={1} />` (extensão MDX customizada), o componente busca leitura mais recente e renderiza inline. Em `mode="edit"` (gated por role Editor+), seções editáveis viram `<textarea>` com auto-save a cada 8 segundos.

---

## Bloco F — Mobile-first design

### F.1 Breakpoints

Tailwind 4 com tokens customizados:

```ts
// tailwind.config.ts
export default {
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      print: { raw: "print" },
    },
  },
};
```

### F.2 Princípios

- **Mobile padrão.** Componentes assumem mobile como default; `md:` e `lg:` adicionam complexidade. Bruno Azambuja em iPhone 13 (390 px) deve ler o painel sem scroll horizontal.
- **Tap-target mínimo 44 × 44 px.** Todos os botões interativos respeitam HIG.
- **Sticky header.** Em mobile, header com 56 px de altura permanece visível. Sidebar vira drawer acionado por hambúrguer.
- **Charts simplificados em mobile.** Eixos com menos ticks; legends viram bottom sheet on-demand; tooltip ativado por tap.
- **Tabela responsiva.** Tabelas com mais de 4 colunas viram lista de cards em mobile (padrão `<dl>` cada item).
- **Scroll horizontal contido.** Gantt e matriz cross-LLM usam `overflow-x-auto` com sticky labels nas primeiras colunas.

### F.3 Print CSS

Arquivo `src/styles/print.css`:

```css
@media print {
  @page {
    size: A4;
    margin: 16mm 12mm 18mm 12mm;
  }
  @page :first {
    margin-top: 24mm;
  }
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    background: white !important;
    color: black !important;
    font-size: 11pt;
  }
  .no-print, nav, aside, .toolbar {
    display: none !important;
  }
  .page-break {
    page-break-after: always;
  }
  table, .chart-container {
    page-break-inside: avoid;
  }
  .gantt-container {
    page-break-before: always;
    page: gantt;
  }
  @page gantt {
    size: A4 landscape;
    margin: 12mm;
  }
  h1, h2, h3 {
    page-break-after: avoid;
  }
}
```

Relatórios trimestrais incluem Gantt (paisagem). Relatórios semanal e mensal são retrato puro.

### F.4 Validação mobile

- Página `/relatorios/semanal/2026-W19` testada em iPhone SE (375 px), iPhone 13 (390 px) e Galaxy S22 (360 px).
- Gantt em mobile vira lista cronológica por padrão; alternar para timeline exige toque em "Ver timeline" e ativa scroll horizontal com hint visual.

---

## Bloco G — Auth + permissões

### G.1 Modelo de papéis

| Papel | Quem | Permissões |
|---|---|---|
| **Admin** | Alexandre Caramaschi | Tudo: edita configuração (cohort, versões pinadas, dicionário concorrentes), dispara coletas manuais, edita risk register, edita qualquer relatório, gerencia usuários. |
| **Editor** | Bruno Azambuja | Edita relatórios (semanal, mensal, trimestral), valida schemas (Schema Audit aprova/rejeita), aprova publicações, lê tudo. NÃO altera configuração nem cohort. |
| **Reader** | Ronan Maia, Conselho IPOG | Leitura completa, exportação PDF, comentários em relatórios. NÃO edita. |

Roles armazenados em D1 (`usuario_role`) com `user_id` (NextAuth) + `role` + `data_concedido` + `concedido_por`.

### G.2 NextAuth v5

```ts
// src/lib/auth/config.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";
import { D1Adapter } from "@auth/d1-adapter";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: D1Adapter(getRequestContext().env.DB),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY!,
      from: "no-reply@brasilgeo.com.br",
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const role = await fetchRole(user.id);
      return { ...session, user: { ...session.user, role } };
    },
    async signIn({ user }) {
      const allowed = await isUserAllowed(user.email);
      return allowed;
    },
  },
  pages: { signIn: "/sign-in", verifyRequest: "/verify-email" },
});
```

### G.3 Middleware

```ts
// middleware.ts
import { auth } from "@/lib/auth/config";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isDashboard = req.nextUrl.pathname.startsWith("/(dashboard)") || !req.nextUrl.pathname.startsWith("/sign-in");
  const isApi = req.nextUrl.pathname.startsWith("/api");
  if (!req.auth && isDashboard && !isApi) {
    const url = new URL("/sign-in", req.url);
    url.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  if (req.auth?.user.role === "reader" && req.nextUrl.pathname.startsWith("/configuracao")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sign-in|verify-email).*)"],
};
```

### G.4 Provedores e onboarding

- **Alexandre Caramaschi.** GitHub OAuth (já tem conta `alexandrebrt14-sys`). Role admin atribuído manualmente em primeira execução de seed.
- **Bruno Azambuja.** Magic link Resend para `bruno.azambuja@ipog.edu.br`. Role editor.
- **Ronan Maia.** Magic link Resend para e-mail corporativo. Role reader.
- **Conselho IPOG.** Magic link Resend (até 8 e-mails); role reader.

### G.5 API protection

API routes em `app/api/*` validam sessão via `auth()` antes de qualquer query. Endpoints de mutação (`/api/configuracao/*`) exigem role admin. Endpoints de edição de relatório (`/api/relatorios/*/edit`) exigem editor+. Reader só acessa GETs.

---

## Bloco H — Performance + observability frontend

### H.1 Estratégia de rendering

- **Server Components por padrão.** Telas Painel Executivo, KPI detalhe, Calendário, Riscos são Server Components consumindo o warehouse via API interna.
- **Client Components apenas para interatividade.** Charts Recharts, filtros multi-select, drawers, tabs.
- **Streaming SSR.** Painel Executivo carrega esqueleto + 8 cards em paralelo via `<Suspense>`. Cada card faz fetch independente; primeiro a chegar renderiza primeiro.
- **Edge Runtime para APIs leves.** `/api/health`, `/api/calendario` (estático) rodam em Edge; `/api/relatorios/*/edit` (mutação) roda em Node Runtime para acessar libs Python via wrapper HTTP do `geo-platform`.

### H.2 Cache

- TanStack Query com `staleTime` de 5 minutos para leituras KPI (que atualizam diariamente).
- Cloudflare Pages CDN com revalidação por tag (`revalidateTag('kpi-1')` chamado após pipeline diário).
- ISR para relatórios fechados (publicados): cache infinito até regeneração explícita.

### H.3 Bundle budgets

| Asset | Budget |
|---|---|
| First JS bundle (entry) | ≤ 180 KB gzip |
| First CSS | ≤ 35 KB gzip |
| Maior chunk de chart (Recharts) | ≤ 120 KB gzip (lazy) |
| LCP em mobile 4G | ≤ 2.5s |
| INP P95 | ≤ 200 ms |

Lighthouse CI bloqueia merge se LCP > 2.8s ou INP > 250 ms.

### H.4 Web Vitals

`src/app/layout.tsx`:

```tsx
"use client";
import { useReportWebVitals } from "next/web-vitals";

export function VitalsReporter() {
  useReportWebVitals((metric) => {
    fetch("/api/vitals", {
      method: "POST",
      body: JSON.stringify(metric),
      keepalive: true,
    });
  });
  return null;
}
```

`/api/vitals` encaminha para Axiom dataset `geo-dashboard-vitals`.

### H.5 Error tracking

Sentry SDK em `instrumentation.ts`:

```ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NEXT_PUBLIC_ENV,
  beforeSend(event) {
    if (event.user?.email) event.user.email = "[redacted]";
    return event;
  },
});
```

### H.6 Custom analytics

Eventos canônicos (não-comerciais, anonimizados):

- `kpi_inspecionado` — props: `kpi_id`, `persona` (admin/editor/reader), `dispositivo`.
- `relatorio_exportado` — props: `cadencia`, `formato` (pdf/csv).
- `filtro_aplicado` — props: `tela`, `filtro_nome`, `valor_hash`.
- `drift_alert_visualizado` — props: `kpi_id`, `severidade`.

Enviado para Axiom; não para GA4 (GA4 fica para `ipog.edu.br` exclusivamente — KPI 7).

---

## Bloco I — CI/CD do dashboard

### I.1 Workflows GitHub Actions

#### `pr-check.yml`

```yaml
name: PR check
on: pull_request
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 10 }
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm tsc --noEmit
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm build
        env:
          NEXT_PUBLIC_API_BASE: https://api-staging.geo-ipog.brasilgeo.com.br
```

#### `deploy-staging.yml`

Trigger: push em `staging`. Deploy em `geo-dashboard-staging.pages.dev`.

#### `deploy-production.yml`

Trigger: push em `main` após PR mergeado. Deploy em `dashboard.geo-ipog.brasilgeo.com.br`. Inclui smoke test pós-deploy.

#### `lighthouse.yml`

Cron semanal (`0 6 * * 1`). Roda Lighthouse CI contra staging com budget de performance.

```yaml
- uses: treosh/lighthouse-ci-action@v12
  with:
    urls: |
      https://geo-dashboard-staging.pages.dev/
      https://geo-dashboard-staging.pages.dev/kpi/1
      https://geo-dashboard-staging.pages.dev/relatorios/semanal/2026-W19
    budgetPath: ./lighthouse-budget.json
    uploadArtifacts: true
```

#### `e2e.yml`

Trigger: push em `main` ou cron diário 04h00 UTC. Roda Playwright contra staging.

Cobertura mínima E2E:

1. Login com magic link (mock Resend em CI).
2. Painel Executivo carrega 8 cards e cor é coerente com mock data.
3. KPI 1 detalhe carrega gráfico Recharts e tabela de histórico.
4. Exportar PDF do relatório semanal gera arquivo válido.
5. Filtro de cluster em `/matriz-llm` atualiza heatmap.

### I.2 Branching e governança

- Trunk-based: branch `main` é produção; `staging` é integração; feature branches `feat/*` ou `fix/*`.
- PR exige 1 review de Alexandre ou Bruno.
- Pre-push hook local roda `pnpm tsc && pnpm lint && pnpm build`.
- Disciplina FinOps: máximo 2 deploys por dia (memória global do CLAUDE.md).

### I.3 Secrets

GitHub Actions secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `RESEND_API_KEY`, `SENTRY_DSN`, `AXIOM_TOKEN`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`. Cloudflare Workers Secrets para runtime.

---

## Bloco J — Roadmap de entrega 30 dias até 30-05-2026

### Sprint 1 — D-30 a D-23 (01-05 a 07-05-2026): scaffold

Marcos:

- D1 Provisionamento. Repositório `geo-dashboard` criado em `github.com/alexandrebrt14-sys/`. Cloudflare Pages projeto criado com binding D1 (mock) e R2.
- D2-D3 Scaffold Next.js 16. `pnpm create next-app`, configura Tailwind 4, instala Tremor v3 + Recharts + TanStack Query + Zustand + Radix UI.
- D4 Layout base. Sidebar + Header + Footer + MobileDrawer. Tema dark/light com toggle persistido.
- D5 Auth scaffold. NextAuth v5 com providers GitHub + Resend; D1Adapter; middleware gate.
- D6 Conexão warehouse mock. API stub em `/api/kpi/[id]` retornando fixture JSON.
- D7 Deploy staging. Primeiro deploy em `geo-dashboard-staging.pages.dev`. Smoke test passa.

Risco controlado: Cloudflare Pages + D1Adapter + NextAuth v5 ainda é combinação relativamente nova. Mitigação: Sprint 1 dedica 1 dia para validar antes de avançar.

### Sprint 2 — D-22 a D-15 (08-05 a 14-05-2026): KPIs 1 a 4

Marcos:

- D8-D9 Painel Executivo (`/`). `KpiSemaforo` + 8 cards mock. Layout responsivo.
- D10-D11 KPI 1 detalhe. `LlmMentionRateChart` com cohort canônico, fallback `connectNulls={false}`.
- D12 KPI 2 detalhe. `SovStackedBar` com 3 clusters.
- D13 KPI 3 detalhe. `CitationQualityGauge` com breakdown 5 fatos.
- D14 KPI 4 detalhe. `SchemaCoverageDonut` + `SchemaScoreGauge`.
- D15 Conexão real ao warehouse. Substitui fixtures por queries reais a D1.

Critério de aceite: Bruno consegue abrir `/` no celular e navegar para `/kpi/1` em < 3 toques.

### Sprint 3 — D-14 a D-7 (15-05 a 21-05-2026): KPIs 5-8 + telas auxiliares

Marcos:

- D16 KPI 5. `CoberturaFontesCard` + tabela 4 tipos de fonte.
- D17 KPI 6. `VelocidadeFechamentoBox` (P0 + P1).
- D18 KPI 7. `ConversionLiftChart` com baseline + meta.
- D19 KPI 8. `WaterfallDeltaOnda`.
- D20 Cross-LLM Matrix (`/matriz-llm`). Filtros + heatmap.
- D21 Risk Heatmap (`/riscos`) + Calendário (`/calendario`).
- D22 Páginas de relatório (`/relatorios/[cadencia]/[periodo]`). `ReportSection` + `ReportToolbar`.

Critério de aceite: Alexandre valida 8 KPIs em staging com leituras mock e aprova layout.

### Sprint 4 — D-6 a D-Day (22-05 a 30-05-2026): polimento + go-live

Marcos:

- D23 Mobile-first refinement. Testes em iPhone SE, 13, Galaxy S22.
- D24 Print CSS. Relatórios renderizam corretamente em A4 retrato + Gantt em paisagem.
- D25 Acessibilidade. Audit a11y com axe-core; corrige contraste, aria-label, keyboard nav.
- D26 Performance. Lighthouse CI; reduz bundle se LCP > 2.5s.
- D27 E2E Playwright. 5 fluxos críticos passando.
- D28 Deploy produção. Push em `main`; smoke test pós-deploy.
- D29 Validação com Bruno. Sessão de 1h com Bruno em celular pré-call de terça.
- D30 Validação com Ronan. Apresentação do checkpoint mensal pré-board report.

Critério de aceite final:

1. Bruno acessa `/` no celular em < 5 segundos com 4G real.
2. Ronan aprova `/relatorios/mensal/2026-05` para incluir no board report.
3. Alexandre confirma que cohort canônico, versões pinadas e N mínimo são respeitados em 100% das visualizações.
4. Conselho IPOG imprime `/relatorios/trimestral/2026-Q2` (rascunho) e a página A4 fica legível sem cortes.

### Riscos do roadmap e mitigações

- **R-Frontend-01: Cloudflare Pages + D1 + NextAuth v5 incompatibilidade.** Probabilidade média. Mitigação: Sprint 1 valida em D7; se falhar, fallback para Vercel + Supabase com custo USD 25/mês (cabe no budget GEO IPOG).
- **R-Frontend-02: Recharts não suporta waterfall sem código manual.** Probabilidade alta. Já mitigado: implementação manual via `BarChart` stacked com offset (Bloco B.8).
- **R-Frontend-03: Bruno em celular antigo (iPhone 11 ou inferior) com performance ruim.** Probabilidade baixa. Mitigação: Sprint 4 testa com throttling 4G e CPU 4× slow.
- **R-Frontend-04: TI IPOG nega liberação de subdomínio `dashboard.geo-ipog.brasilgeo.com.br`.** Probabilidade baixa (subdomínio é Brasil GEO, não IPOG). Mitigação: usar `geo-dashboard.pages.dev` como fallback.

---

## Anexo — Notas finais e cross-links

### Cross-links canônicos

- `dashboards/METRICAS-CANONICAS.md` — fonte de verdade dos 8 KPIs com fórmula, N mínimo, cadência, owner.
- `dashboards/KPI-DASHBOARD.md` — painel atual em Markdown que este dashboard substitui.
- `docs/relatorios-semanais/_TEMPLATE.md` — estrutura do relatório semanal (12 seções).
- `docs/relatorios-mensais/_TEMPLATE.md` — checkpoint executivo mensal Ronan.
- `docs/relatorios-trimestrais/_TEMPLATE.md` — revisão estratégica Conselho.
- `docs/05-risk-register.md` — 12 riscos canônicos.
- `docs/06-marcos-criticos-2026.md` — calendário com 19 marcos 2026.
- `docs/tech-stack/01-solution-architecture.md` — ADRs 001-006 e visão de containers.
- `docs/tech-stack/02-data-engineering.md` — schema do warehouse e API.
- `dashboards/RUNBOOK-COLETA-LLM.md` — pipeline que alimenta KPIs 1, 2, 3 e 8.
- `dashboards/FINOPS-DISCIPLINA.md` — teto de orçamento que alimenta tela `/finops`.
- `audits/PLAYBOOK-AUDITORIA-NAIA.md` — checks NAIA que alimentam tela `/auditoria-schema`.

### Princípios não-negociáveis impostos no nível de componente

1. **Cohort fixo de 6 LLMs.** `LlmMentionRateChart` recusa renderizar se cohort tiver < 6 modelos no payload. `EmptyState` indica "Cohort incompleto — coleta inválida".
2. **Versão pinada.** Toda série temporal exibe badge `VersionPinBadge` por ponto. Mudança de versão dentro da janela visualizada quebra a linha.
3. **N mínimo por leitura.** Renderizador valida `n_observado >= n_minimo_kpi` antes de pintar ponto. Abaixo, ponto é `null` e exibe causa.
4. **Janela de drift.** Movimento dentro da banda canônica (full-grid prompt sensitivity trimestral) renderiza em cinza claro; só sai do cinza quando ultrapassa a banda.
5. **Owner único por KPI.** Card mostra owner explicitamente; se múltiplos owners aparecerem, exibe alerta.

### Anti-padrões impostos por linting custom

- ESLint custom rule proíbe importar componente `HealthScoreCombined` (não existe; rule garante que ninguém crie).
- ESLint custom rule proíbe `Number.average(mention_rates)` cross-LLM sem decomposição por cohort.
- TypeScript tipo `KpiSnapshot` proíbe campo `versao_modelo: undefined` — versão pinada é obrigatória.

### Encerramento

O dashboard, ao final do Sprint 4 (D-Day = 30-05-2026), deve atender três jornadas distintas com a mesma base de código: Bruno em celular antes de call semanal, Ronan em laptop antes de aprovar board report mensal, Conselho com material impresso A4 em sessão trimestral. O custo marginal de manutenção é baixo (Cloudflare Pages free tier, Resend free tier 3.000 e-mails/mês, Axiom free tier 500 GB/mês, Sentry free tier 5k erros/mês). O custo de oportunidade de não tê-lo, em contrapartida, é alto: o painel em Markdown é frágil para audiência tripla, exige edição manual semanal e não suporta deep-links para reuniões executivas. O dashboard fecha esse gap.

A próxima revisão deste documento é **2026-06-15** (D+15 do go-live), quando uso real por Bruno, Ronan e Alexandre vai expor decisões a recalibrar — provavelmente em densidade de informação por tela e em granularidade de filtros da matriz cross-LLM. Mudanças subsequentes registradas como ADRs do frontend (ADR-Frontend-001+) sob a mesma disciplina dos ADRs arquiteturais do `01-solution-architecture.md`.
