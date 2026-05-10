# Ata — Kickoff GEO IPOG

**Data:** 2026-04-30
**Hora:** 14h00 BRT
**Duração efetiva:** 90 minutos
**Local:** Google Meet (link reservado em calendário IPOG)
**Tipo de reunião:** kickoff oficial do programa GEO IPOG (Fase 0)

---

## 1. Participantes presentes

- Alexandre Caramaschi — Head Brasil GEO (CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil)
- Ronan Maia — CEO IPOG, sponsor executivo
- Bruno Azambuja — Gerente de Marketing IPOG, interlocutor operacional

### Ausências justificadas

- Diretoria Acadêmica IPOG — convidada pontual; participação prevista no checkpoint executivo mensal e quando claim regulatório CFP/MEC for tema.
- TI IPOG — convidada pontual a partir de 06-05-2026 para alinhamento técnico (Schema injection em `ipog.edu.br`, GA4 com referrer/UTM dedicado de LLM, `llms.txt`).
- Jurídico IPOG — convidado a partir de 11-06-2026 para revisão do bloco padrão de rodapé compliance e Peça 4 HBR (Avaliação Psicológica + SATEPSI).

---

## 2. Pauta executada

Comparada com a pauta canônica de kickoff em `docs/01-kickoff-30-04-2026.md`.

- [x] Apresentação da tese central do programa (categoria-naming "MBA Online de Psicologia" vazia em 9 dos 10 concorrentes; janela 12-24 meses até reação coordenada).
- [x] Estrutura de fases (Fase 0 kickoff · Fase 1 baseline + Schema piloto · Fase 2 engenharia de citação + 7 peças HBR · Fase 3 pico GEO 2026.2 · Fase 4 mensuração e pré-pico 2027.1).
- [x] Subcontexto vertical confirmado: MBA Online de Psicologia como recorte prioritário 2026.
- [x] Cohort canônico de 6 LLMs com versão pinada 2026 (ChatGPT gpt-5.0, Claude opus-4-7, Gemini 3-pro, Perplexity sonar-pro, Grok-4, Copilot 2026).
- [x] Apresentação do Quality Gate 5+1 camadas e Voice Guard com 4 dimensões editoriais.
- [x] Cadência operacional acordada: status semanal terça 10h00 BRT · checkpoint executivo mensal 1ª terça 17h00 BRT · revisão estratégica trimestral.
- [x] Risco crítico R-001 (atraso na decisão de produto IPOG) sinalizado como bloqueio mestre — prazo executivo 15-05-2026.
- [x] Estrutura de governança e SLAs internos (resposta a issue 1 dia útil · aprovação PR 1 dia útil · mudança em propriedade IPOG ao vivo 2 dias úteis · revisão jurídica MEC/CFP 5 dias úteis).

---

## 3. Insumo usado como base

- Roadmap formal: `ROADMAP.md` (Fases 0-4 detalhadas) e `docs/01-kickoff-30-04-2026.md`.
- Contexto vertical: `docs/02-contexto-mba-online-psicologia.md` (3 clusters semânticos prioritários, 7 personas-alvo, 4 grupos de concorrentes).
- Benchmarking: `audits/benchmarking/SINTESE-EXECUTIVA.md` (Ondas 1+2 com 10 concorrentes).
- Risk register: `docs/05-risk-register.md` (R-001 a R-012 ativos na data do kickoff).

---

## 4. Decisões tomadas

Decisão sem owner e prazo não é decisão. Decisões formais do Conselho (D01-D08) seguem encaminhadas para a reunião executiva de 15-05-2026 (vide seção 5).

| # | Decisão | Owner | Prazo | Issue vinculada |
|---|---|---|---|---|
| D-K-1 | Janela espelho de medição: diagnóstico pré-investimento 07-05 a 21-05 vs pós-Schema 22-05 a 30-05 (provedores RAG-native). Permite isolar efeito do programa antes do pico. | Alexandre | 30-05-2026 | #41 |
| D-K-2 | Cohort canônico congelado em 6 LLMs com versão pinada 2026 — substituir LLM em caso de falha é proibido; coleta inválida é a resposta correta. | Alexandre | imediato | — |
| D-K-3 | Status semanal de terça às 10h00 BRT confirmado como cadência. Relatório fechado domingo às 21h00 BRT e enviado 1h antes da call. | Alexandre + Bruno | recorrente | #39 |
| D-K-4 | Checkpoint executivo mensal de Ronan Maia agendado para 1ª terça do mês às 17h00 BRT a partir de 02-06-2026. | Ronan + Bruno | recorrente | — |
| D-K-5 | Acentuação PT-BR completa em todo conteúdo visível ao usuário final é regra inviolável (REGRA 0). Naming canônico "Brasil GEO" — nunca "GEO Brasil". | Alexandre | imediato | — |
| D-K-6 | Repositório `geo-ipog` privado é fonte de verdade canônica. 75 prompts, templates de Schema JSON-LD, 4 dimensões Voice Guard, 100+ checks NAIA vivem em Git versionado. | Alexandre | imediato | — |
| D-K-7 | Confidencialidade alta: contato direto Alexandre via `alexandre@brasilgeo.ai`. Página de roadmap operacional confidencial em `brasilgeo.ai/ipoggeoroadmap` com `noindex` + `X-Robots-Tag` + cache `private, no-cache`. | Alexandre + Bruno | recorrente | — |

---

## 5. Pendências escaladas para IPOG

Itens que precisam de Bruno Azambuja ou Ronan Maia para destravar. Vinculados ao label `gating-ipog` no GitHub. Material completo de apoio em `docs/board-report/00-board-report-final.md` Seção 9 e em `brasilgeo.ai/ipoggeoroadmap` aba 13.

| Item | Owner IPOG | Prazo limite | Status | Issue |
|---|---|---|---|---|
| D01 — Decisão Conselho sobre uso público de MBA + naming canônico (R-001) | Ronan Maia + Conselho | 2026-05-15 | em escalada | #4 |
| D02 — Pricing canônico do produto-âncora (R$ 750/mês × 18) | Ronan Maia + controller IPOG | 2026-05-15 | aguardando aprovação | #5 |
| D03 — Tier premium executivo Avaliação Psicológica CFP (R$ 1.250/mês × 24) | Ronan Maia + Diretoria Acadêmica | 2026-05-15 | aguardando aprovação | #6 |
| D04 — Liberação de 3 docentes piloto com Lattes/ORCID consentido para `Person` Schema | Bruno Azambuja + área acadêmica | 2026-05-17 | em coleta | #11 |
| D05 — Patrocínio CBPOT Salvador 14-17/07 + presença CNP CFP Brasília 03-06/07 | Ronan Maia + Bruno | 2026-05-25 | aguardando aprovação | #12 |
| D06 — Verba inicial Wikipedia + PR tier 1 (R$ 50-100k em 12 meses) | Ronan Maia + Bruno | 2026-05-30 | aguardando aprovação | #13 |
| D07 — Cluster 3 Psicopedagogia em Quero Bolsa com bolsa controlada (R$ 600/mês) | Bruno Azambuja | 2026-05-15 | aguardando aprovação | #14 |
| D08 — Confirmação jurídica IPOG sobre Decreto 12.456/2025 + Portaria SERES MEC 918/2017 cobrindo lato sensu EAD em Psi | Diretoria Acadêmica + jurídico IPOG | 2026-05-12 | aguardando parecer | #15 |
| M03 — `llms.txt` em produção em `ipog.edu.br` | TI IPOG + Bruno | 2026-05-14 | em homologação | #61 |
| M07 — GA4 com referrer/UTM dedicado de LLM (R-009) | Bruno + TI IPOG | 2026-05-25 | pendente | #43 |
| M06 — Schema piloto produção (EduOrg + EduOccupProgram + Course + FAQPage + 3 Person) | Bruno + TI IPOG | 2026-05-30 | em desenvolvimento | #61 |

---

## 6. Riscos discutidos

Cross-link com `docs/05-risk-register.md`. Foco nos riscos críticos da Fase 0/1 e nos novos riscos identificados na pesquisa de mercado 2026.

| ID risco | Risco | Mudança discutida | Owner | Próxima revisão |
|---|---|---|---|---|
| R-001 | Atraso na decisão de produto IPOG | Status confirmado como Em escalada; prazo executivo crítico 2026-05-15; plano B de 1 produto âncora documentado | Ronan Maia | checkpoint 2026-06-02 |
| R-002 | Concorrente publica `llms.txt` antes do IPOG | Status Mitigado; cadência quinzenal de monitoramento ativada (issue #15); script `scripts/fetch_competitor_signals.py` operacional | Alexandre + Bruno | mensal |
| R-009 | UTM/referrer LLM não capturado em GA4 | Status Pendente; prazo crítico 2026-05-25; sem captura na Fase 1, KPI 7 vira N/D na Fase 2 | Bruno + TI IPOG | semanal |
| R-013 | Gap Wikipedia/Reddit permite concorrentes serem citados mais que IPOG em LLMs | Risco novo incorporado; prazo crítico 60 dias para baseline + plano editorial Wikipedia; depende de D06 | Bruno + Alexandre | checkpoint 2026-06-02 |
| R-014 | UniCesumar fábrica de cursos não-replicável | Risco novo Aceito com mitigação por reposicionamento (premium regional, não brigar em catálogo) | Alexandre + Bruno | trimestral |
| R-015 | Decreto 12.456 segunda onda pode estender vedação a lato sensu | Risco novo Mitigado com plano B presencial em polos próprios + monitoramento mensal | Diretoria Acadêmica IPOG | mensal |
| R-016 | Plataformas de telepsicologia virando edtechs próprias | Risco novo Em monitoramento; Vittude/Zenklub/Eurekka incluídos na Onda 4 do benchmarking (issue #18) | Alexandre + Bruno | trimestral |

---

## 7. KPIs revisados

Leitura inicial pré-baseline. Coleta cross-LLM dia 1 programada para 2026-05-07 (75 prompts × 6 LLMs). Decomposição completa em `dashboards/METRICAS-CANONICAS.md` e dashboard executivo em `brasilgeo.ai/ipoggeoroadmap` aba 11.

| KPI | Leitura discutida | Tendência | Decisão |
|---|---|---|---|
| KPI 1 Mention Rate | Pré-baseline; coleta dia 1 em 07-05 | — | Aguardar primeira leitura completa antes de fixar metas operacionais para o time |
| KPI 4 Schema Coverage | Estimativa &lt; 30 sem ajuste (NAIA não rodada ainda) | — | Aguardar primeira execução NAIA full (issue #41) |
| KPI 5 Cobertura externa | 0 fontes reputadas em janela 12 meses (verbete Wikipedia raso; sem mídia tier 1 em 2026) | -- | Plano de expansão Wikipedia (issue #19, #60) + 4 menções tier 1 até 31-12 |

---

## 8. Próximos passos imediatos (semana 01-W18 e seguinte)

| Ação | Owner | Prazo | Issue |
|---|---|---|---|
| Bootstrap ata kickoff em `docs/atas/` | Alexandre | 2026-05-10 | #38 |
| Bootstrap relatório semanal #1 (semana 04-10/05) | Alexandre | 2026-05-11 | #39 |
| Coleta cross-LLM dia 1 — 75 prompts × 6 LLMs | Brasil GEO | 2026-05-07 | — |
| Primeira execução script `scripts/fetch_competitor_signals.py` (quinzenal robots/llms) | Alexandre | 2026-05-10 | #15 |
| Baseline Wikipedia IPOG mensurado | Bruno + Alexandre | 2026-05-17 | #19 |
| Brief jurídico do bloco padrão de rodapé enviado a Diretoria Acadêmica | Alexandre | 2026-05-05 | — |
| `llms.txt` em produção em `ipog.edu.br` (M03) | Bruno + TI IPOG | 2026-05-14 | #61 |
| Schema piloto entra em homologação | Brasil GEO | 2026-05-06 | #61 |
| Validação jurídica dos 5 nomes propostos (M02) | Diretoria Acadêmica IPOG | 2026-05-12 | #4 |
| Reunião extraordinária IPOG para destravar 11 bloqueantes | Ronan + Bruno + Alexandre | 2026-05-13 | #40 |
| Decisão Conselho sobre produto + naming MBA (M01 / D01) | Ronan + Conselho | 2026-05-15 | #4 |

---

## 9. Próxima reunião

- **Data confirmada:** 2026-05-13 (extraordinária para destravar bloqueantes) e 2026-05-19 10h00 BRT (semanal canônica de terça).
- **Tipo:** semanal de status + reunião extraordinária IPOG.
- **Pré-requisito de envio:** relatório semanal #1 entregue até 2026-05-11 09h00 BRT (uma hora antes da call de terça-feira).
- **Local:** Google Meet (link em calendário IPOG).

Checkpoint executivo mensal seguinte agendado para 2026-06-02 17h00 BRT.

---

## 10. Anexos e referências

- Roadmap operacional confidencial: `https://brasilgeo.ai/ipoggeoroadmap` (`noindex`, distribuição restrita Brasil GEO × IPOG).
- Site público da Brasil GEO: `https://brasilgeo.ai`.
- Tese central completa: `docs/board-report/00-board-report-final.md` Seções 1, 2 e 9.
- Pesquisa de mercado 2026 e novos riscos: `docs/board-report/02-pesquisa-de-mercado.md`.
- Estratégia regional CNPJ-próprio em 51 cidades: `docs/board-report/08-estrategia-regional.md` + `docs/framework/05-estrategia-regional-geo-educacao.md`.
- Tech stack consolidado (9 containers C4 + 4 repos + 22 workflows + TCO R$ 21k/12m): `docs/tech-stack/00-tech-roadmap-2026.md`.

---

## 11. Disciplina

- [x] Ata fechada e publicada.
- [x] Decisões com owner e prazo registrados.
- [x] Issues vinculadas referenciadas com `#X`.
- [x] Riscos discutidos cruzados com `docs/05-risk-register.md`.
- [x] Sem emojis (regra do programa).
- [ ] Aprovação por silêncio em até 2 dias úteis após envio.

---

Ata registrada por Alexandre Caramaschi em 2026-05-10 16h00 BRT (publicação retroativa do kickoff de 30-04, conforme issue #38).
Aprovada por Bruno Azambuja em — pendente · prazo limite 2026-05-12.
