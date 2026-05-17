# Runbook: Bing Webmaster Tools — AI Performance Report

**Data de criação:** 2026-05-17
**Repositório:** `alexandrebrt14-sys/geo-ipog`
**Portal:** posgraduacaopsicologia.com
**Referência:** Issue #57 — Auditoria de menção IPOG em Bing AI Performance
**Lead:** Alexandre Caramaschi — CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil

---

## 1. O que é o AI Performance Report

O **AI Performance Report** é um painel do Bing Webmaster Tools lançado em **10 de fevereiro de 2026** em public preview. Ele expõe dados sobre como o Microsoft Copilot cita e referencia páginas do seu site nas respostas de IA generativa — a primeira fonte oficial gratuita de citation analytics para Copilot disponível para webmasters.

Anúncio oficial:
`https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview`

Antes desta funcionalidade, não existia forma gratuita de saber se o Copilot citava uma URL específica ou qual contexto era usado. Os dados são específicos por site verificado, portanto exigem verificação de propriedade.

---

## 2. Pré-requisitos

Antes de iniciar:

- [ ] Ter acesso a uma conta Microsoft (pessoal ou corporativa).
- [ ] Ter a propriedade `posgraduacaopsicologia.com` **verificada** no Bing Webmaster Tools. Se ainda não verificada, a verificação leva 1-24h via método DNS TXT, tag HTML ou arquivo de verificação na raiz.
- [ ] Confirmar que `bingbot/2.0` está permitido em `robots.txt` (está — ver linha padrão `User-agent: * Allow: /`).
- [ ] O site precisa ter volume mínimo de tráfego via Bing para que dados apareçam; portais novos podem ver janelas em branco por 2-4 semanas.

---

## 3. Passo a passo para acessar o AI Performance Report

### 3.1 Acessar o Bing Webmaster Tools

1. Navegar para: `https://www.bing.com/webmasters/`
2. Fazer login com a conta Microsoft associada à propriedade.
3. Selecionar a propriedade `posgraduacaopsicologia.com` no dropdown superior esquerdo.

### 3.2 Localizar o painel AI Performance

1. No menu lateral esquerdo, procurar a seção **"Performance"** ou **"Desempenho"**.
2. Dentro de Performance, clicar em **"AI Performance"** (pode aparecer com badge "Preview" ou "Novo").
3. Se o item não aparecer, verificar se a conta tem acesso à preview:
   - Acessar `https://www.bing.com/webmasters/aiperformance`
   - Se retornar página de lista de espera, usar o formulário de solicitação de acesso antecipado.

### 3.3 Configurar o filtro de data

1. No canto superior direito do painel, selecionar o intervalo de datas desejado.
2. Recomendado: começar com os **últimos 28 dias** para ter volume suficiente.
3. O painel suporta comparação de períodos (ex.: semana atual vs. semana anterior).

### 3.4 Navegar pelas abas principais

O AI Performance Report tem três seções principais:

| Aba | O que mostra |
|-----|-------------|
| **Visão Geral** | Total de citações no período, variação, páginas mais citadas |
| **Páginas** | Ranking de URLs do seu domínio por número de citações em respostas Copilot |
| **Consultas** | Queries de busca que geraram citações (grounding queries) |

---

## 4. Métricas canônicas e como interpretá-las

### 4.1 Total Citations (Total de Citações)

**Definição:** número de vezes que uma URL do seu domínio foi referenciada como fonte em uma resposta do Microsoft Copilot dentro do período selecionado.

**Como interpretar:**
- Não equivale a cliques. Uma citação pode gerar um link visível para o usuário ou apenas informar o contexto da resposta (citação implícita).
- Volume absoluto cresce com tráfego geral no Bing — normalizar pelo período e pelo crescimento do índice.
- Quedas bruscas podem indicar mudança de algoritmo de grounding do Copilot ou perda de autoridade temática.

**Meta operacional para este portal:** atingir pelo menos 50 citações/mês até 90 dias após ativação do AI Performance tracking.

### 4.2 Average Cited Pages (Média de Páginas Citadas por Resposta)

**Definição:** número médio de páginas diferentes do seu domínio que o Copilot referencia por resposta que cita o site.

**Como interpretar:**
- Valor próximo de 1 indica que o Copilot cita uma única URL em cada resposta — normal para portais com foco vertical estreito.
- Valor acima de 2 indica que o Copilot reconhece o domínio como autoridade e busca múltiplas perspectivas no mesmo site.
- Para portais com cluster topical denso (como este, com hubs por modalidade + UF), um valor entre 1,3 e 2,0 é saudável.

**Alavanca:** expandir interlinks internos e fortalecer o `BreadcrumbList` + `FAQPage` nas páginas de hub — o Copilot tende a citar múltiplas URLs de domínios com estrutura semântica clara.

### 4.3 Grounding Queries (Consultas de Fundamentação)

**Definição:** as queries de busca no Bing que desencadearam respostas do Copilot onde o seu domínio foi citado.

**Como interpretar:**
- Revelar intent: queries de grounding tendem a ser perguntas diretas ("qual é o melhor...?", "como funciona...?", "quais são as diferenças...?") — exatamente o formato que FAQPage e HowTo atendem.
- Identificar lacunas: queries para as quais o site é citado mas não tem página dedicada = oportunidade de nova página.
- Identificar vazamentos: queries onde concorrentes são citados mas este portal não é = lacuna de conteúdo ou autoridade.

**Filtragem recomendada:** exportar as top 50 grounding queries mensalmente e cruzar com o backlog de pautas editoriais.

---

## 5. Checklist operacional mensal (Issue #57 — Ciclo de auditoria)

Executar até o dia 5 de cada mês:

- [ ] **Acessar** Bing Webmaster Tools > AI Performance > período = mês anterior.
- [ ] **Registrar** Total Citations no arquivo `docs/relatorios-mensais/kpis-YYYYMM.md` (campo `bing_copilot_citations`).
- [ ] **Registrar** Average Cited Pages (campo `bing_avg_cited_pages`).
- [ ] **Exportar** top 20 Grounding Queries para `docs/relatorios-mensais/bing-grounding-queries-YYYYMM.csv`.
- [ ] **Identificar** top 3 páginas mais citadas — confirmar se têm `FAQPage` + `Speakable` + `Speakable.cssSelector` atualizados.
- [ ] **Cruzar** grounding queries com backlog editorial — abrir issue para cada gap relevante.
- [ ] **Comparar** com mês anterior — variação > -20% dispara investigação de causa (mudança de algoritmo? perda de indexação? concorrente novo?).

---

## 6. Integração com o dashboard GEO do portal

O AI Performance do Bing é uma das **5 fontes de dados do dashboard de citation tracking** deste portal:

| Fonte | Motor | Dado disponível |
|-------|-------|-----------------|
| Bing Webmaster Tools AI Performance | Microsoft Copilot | Citações por URL, grounding queries — oficial |
| Google Search Console (AI Overview via Insights) | Google AI Overviews | Cliques gerados por AI Overviews — proxy |
| Perplexity Pages Analytics | Perplexity | Citações em Pages — somente para criadores de Pages |
| ChatGPT Browsing (manual spot-check) | ChatGPT Search | Menções manuais via prompt sampling |
| Discovered Labs / Lantern (terceiros) | Multi-motor | Citation Rate agregado — pago, opcional |

O dado do Bing é o **único completamente gratuito e oficial** para citation de IA por URL em maio de 2026.

---

## 7. Troubleshooting comum

| Problema | Causa provável | Ação |
|----------|---------------|------|
| Aba AI Performance não aparece | Conta fora da preview | Solicitar acesso via formulário na página do anúncio |
| Dados zerados por mais de 4 semanas | Baixo volume Bing ou `bingbot` bloqueado | Verificar robots.txt; verificar indexação via Bing URL Inspection |
| Citações caíram > 30% de um mês pro outro | Mudança algoritmo Copilot ou perda de página de hub | Auditar top URLs com queda; verificar crawl errors no Bing |
| Grounding queries em inglês > 60% do total | Conteúdo percebido como EN pelo Bing | Reforçar `inLanguage: "pt-BR"` no JSON-LD de todas as páginas + meta `content-language` |

---

## 8. Referências

- Anúncio oficial: `https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview`
- Bing Webmaster Tools: `https://www.bing.com/webmasters/`
- Documentação de verificação de propriedade: `https://www.bing.com/webmasters/help/how-to-verify-ownership-of-your-site-afcfefc6`
- Padrão Web Bot Auth (referência técnica complementar): `https://datatracker.ietf.org/doc/html/draft-meunier-web-bot-auth-architecture`
- KB canônica GEO+SEO 2026: `docs/governance/seo-geo-knowledge-base-2026-05-17.md` (seção Wave C §5)
- Wave D — Standards técnicos: `docs/research/wave-D-standards-tecnicos-20260517.md` (seção 8.1)
