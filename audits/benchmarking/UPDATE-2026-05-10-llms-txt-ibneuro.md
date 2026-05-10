# Update da matriz técnica · IBNeuro publicou `llms.txt` válido

> **Data do update:** 2026-05-10
> **Owner:** Alexandre Caramaschi (Brasil GEO)
> **Fonte da coleta:** `scripts/fetch_competitor_signals.py` v1.1 (com validação de Content-Type)
> **Snapshot bruto:** `data/monitoring/llms-robots-fetches/2026-05-10/ibneuro-llms.txt`
> **Issues correlatas:** #15 (monitoramento quinzenal), R-002 do `docs/05-risk-register.md`

## Achado material

A primeira rodada quinzenal automatizada do monitoramento de `robots.txt` e `llms.txt` dos 10 concorrentes mapeados pelo programa GEO IPOG revelou que **IBNeuro publicou `llms.txt` válido em maio de 2026** — primeiro do cohort de 10 concorrentes a fechar esta janela técnica.

Detalhes do arquivo `https://www.ibneuro.com.br/llms.txt`:

- **HTTP status:** 200
- **Content-Type:** text/plain (validado pelo `is_valid_txt()` do script — não é HTML mascarado)
- **Tamanho:** 1.081 bytes
- **Conteúdo de abertura:** `# IBNeuro\n\n\n\n` (estrutura canônica de spec llms.txt iniciando com H1 da marca)
- **Diff vs snapshot anterior:** NEW (primeira detecção; não havia snapshot prévio)

## Reconciliação com a matriz técnica vigente

A leitura anterior em `audits/benchmarking/matriz-tecnica-schema-seo.md` afirmava que **100% dos 10 concorrentes mapeados estavam sem `llms.txt` em 2026-05-01**. Esta afirmação precisa ser revista para refletir a coleta de 2026-05-10:

| Concorrente | Estado em 2026-05-01 | Estado em 2026-05-10 | Mudança |
|---|---|---|---|
| Anhembi Morumbi | sem `llms.txt` | HTTP 200 retornando HTML (falso positivo) | sem mudança real — site não publicou `llms.txt`; servidor entrega HTML para caminhos não mapeados |
| Estácio | sem `llms.txt` | HTTP 200 retornando HTML 380 KB (falso positivo) | sem mudança real — mesmo padrão do Anhembi |
| Anhanguera | bloqueio WAF | HTTP 403 mantido | sem mudança |
| UNINTER | sem `llms.txt` | HTTP 404 | sem mudança |
| UniCesumar | bloqueio WAF | HTTP 403 mantido | sem mudança |
| PUC-Minas Virtual | inacessível | HTTP 0 (timeout/SSL) mantido | sem mudança |
| CETCC | sem `llms.txt` | HTTP 404 | sem mudança |
| **IBNeuro** | **sem `llms.txt`** | **HTTP 200 text/plain 1.081 bytes VÁLIDO** | **MUDANÇA REAL — publicou `llms.txt` em janela ≤ 10 dias** |
| Sírio-Libanês IEP | sem `llms.txt` | HTTP 200 retornando HTML 295 KB (falso positivo) | sem mudança real |
| Saint Paul/EXAME | sem `llms.txt` | HTTP 404 | sem mudança |

Conclusão metodológica: a janela de 100% sem `llms.txt` válido fechou para **9/10**. O dado canônico passa a ser **9 de 10 concorrentes ainda sem `llms.txt` válido**.

## Implicação estratégica

IBNeuro é especialista vertical em Neuropsicologia (Cluster 2 — Clínica/Neuro/Avaliação) com sede em Brasília. Ticket alto (R$ 31.375-36.625) e modalidade Ao Vivo síncrona declarada. Publica `Person` Schema com Lattes/ORCID para corpo docente. A publicação de `llms.txt` consolida IBNeuro como o concorrente tecnicamente mais maduro do cluster Clínica/Neuro.

Três implicações operacionais imediatas para o programa GEO IPOG:

1. **Cluster 2 (produto P2 Avaliação Psicológica + SATEPSI e produto P3 Neuropsicologia Aplicada) está disputado mais cedo do que esperado.** IBNeuro tem hoje vantagem técnica sobre o IPOG no cluster onde o IPOG planeja tier premium executivo R$ 1.250/mês × 24 = R$ 30.000 (D03 do Conselho). Prazo de execução dos produtos P2 e P3 fica mais sensível ao gating de M03 + M06 (`llms.txt` + Schema piloto em produção).

2. **R-002 do risk register precisa migrar de "Mitigado" para "Parcialmente materializado".** O risco original previa que "Anhembi Morumbi, Saint Paul/EXAME ou Estácio decidiriam publicar e fechar a janela". O fato concreto é que o primeiro a publicar foi IBNeuro, no flanco que mais ameaça os produtos premium do IPOG. Atualização do risco a ser feita na próxima revisão mensal do registro.

3. **Peça 1 HBR canônica (`01-a-categoria-que-ainda-nao-existe.md`, M08 02-06)** já incorpora este achado na tabela comparativa dos 10 concorrentes em cinco dimensões. A peça registra IBNeuro como "primeiro a publicar `llms.txt`" mantendo a tese de 90% do mercado em vácuo técnico — sem invalidar o argumento central do programa.

## Próximas ações operacionais

- **Análise de conteúdo do `llms.txt` do IBNeuro** (segunda semana de maio): catalogar quais páginas/produtos o IBNeuro priorizou em `llms.txt`, qual a hierarquia declarada, e se há sinalização de áreas-foco que sobreponham ao portfólio IPOG.
- **Acelerar M03 (publicação de `llms.txt` em `ipog.edu.br`)** já programado para 14-05-2026. Sem isso, o gap entre IBNeuro e IPOG em sinalização técnica para LLMs cresce dia a dia.
- **Monitoramento semanal (não quinzenal) do `llms.txt` do IBNeuro pelos próximos 60 dias** — alterações no arquivo do IBNeuro são indicador antecipado de movimento estratégico no Cluster 2.
- **Atualizar matriz técnica canônica** (`audits/benchmarking/matriz-tecnica-schema-seo.md` seções 2 e 8.1) substituindo "100% sem llms.txt" por "90% sem llms.txt válido; IBNeuro fechou primeiro no Cluster 2".

## Cross-references

- `data/monitoring/llms-robots-fetches/2026-05-10/ibneuro-llms.txt` — arquivo bruto coletado
- `data/monitoring/llms-robots-fetches/SUMMARY-2026-05-10.md` — sumário executivo da rodada
- `scripts/fetch_competitor_signals.py` v1.1 — script com validação de Content-Type
- `content/pecas-hbr/01-a-categoria-que-ainda-nao-existe.md` — peça inaugural M08 com tabela atualizada
- `docs/05-risk-register.md` R-002 — risco a ser atualizado na próxima revisão mensal

---

Registrado por Alexandre Caramaschi em 2026-05-10 18h00 BRT.
Próxima reverificação programada: 2026-05-24 (quinzena seguinte) com pipeline automatizado.
