# Marcos Críticos — Programa GEO IPOG 2026

> **Status:** vigente desde 2026-05-01
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Cadência de revisão:** mensal no checkpoint executivo + ad hoc quando marco for materialmente afetado.

Calendário consolidado dos marcos críticos do programa GEO IPOG no horizonte de 2026.2 a 2027.1. Cada marco tem janela exata, dependências, owner e métrica de aceite. Atrasos são reportados no relatório semanal seção 8 e escalados ao checkpoint mensal.

A lógica é prescritiva: marco sem janela exata é compromisso vago. Compromisso vago não é marco — é intenção. O calendário abaixo opera no sentido inverso: cada marco tem datas, donos e critério de aceite.

## Calendário macro 2026

| Janela | Marco | Owner | Status |
|---|---|---|---|
| 30-04-2026 | **Kickoff oficial do programa** | Alexandre Caramaschi | concluído |
| 01-05-2026 | **Onda 1 do benchmarking concluída** (5 concorrentes massivos) | Alexandre Caramaschi | concluído |
| 01-05-2026 | **Onda 2 do benchmarking concluída** (5 especialistas + premium executiva) | Alexandre Caramaschi | concluído |
| 07-05-2026 | **Início da Fase 1 — Baseline + Schema piloto** | Alexandre Caramaschi | em curso |
| 15-05-2026 | **Decisão de produto IPOG** (naming MBA + 3-5 produtos prioritários) | Bruno Azambuja + Ronan Maia | pendente |
| 20-05-2026 | **Kit de prompts-âncora fechado** (66 prompts × 3 clusters × 7 personas × 4 jornadas) | Alexandre Caramaschi | em curso |
| 25-05-2026 | **Configuração GA4 com referrer/UTM dedicado de LLM** | Bruno Azambuja | pendente |
| 30-05-2026 | **Fim da Fase 1** — baseline cross-LLM capturado + Schema piloto implementado + llms.txt no ar | Alexandre Caramaschi + Bruno Azambuja | em curso |
| 01-06-2026 | **Início da Fase 2 — Primeira leva HBR** | Alexandre Caramaschi | a iniciar |
| 15-06-2026 | **Fim da Fase 2** — 6-10 peças HBR-grade publicadas + integração Onda 2 nas matrizes consolidadas | Alexandre Caramaschi | a iniciar |
| 15-06-2026 | **Início da Fase 3 — Pico GEO captação 2026.2** | Alexandre Caramaschi + Bruno Azambuja | a iniciar |
| 30-06-2026 | **Fechamento Q2 2026** — primeira revisão trimestral | Alexandre Caramaschi | a iniciar |
| 31-07-2026 | **Fim do pico GEO captação 2026.2** | Bruno Azambuja | a iniciar |
| 01-08-2026 | **Início da Fase 4 — Operação contínua + pré-pico 2027.1** | Alexandre Caramaschi | a iniciar |
| 30-09-2026 | **Fechamento Q3 2026** — segunda revisão trimestral + recalibração | Alexandre Caramaschi | a iniciar |
| 30-10-2026 | **Wikipedia IPOG — verbete expandido** (meta: comparável a Anhembi 250+ linhas) | Bruno Azambuja | a iniciar |
| 30-11-2026 | **Onda 3 do benchmarking concluída** (plataformas + premium acadêmica online) | Alexandre Caramaschi | a programar |
| 01-12-2026 | **Início do pico GEO captação 2027.1** | Alexandre Caramaschi + Bruno Azambuja | a iniciar |
| 31-12-2026 | **Fechamento Q4 2026** — terceira revisão trimestral + plano 2027 | Alexandre Caramaschi | a iniciar |

## Calendário macro 2027 (preview)

| Janela | Marco | Owner |
|---|---|---|
| 15-02-2027 | Fim do pico GEO captação 2027.1 | Bruno Azambuja |
| 31-03-2027 | Fechamento Q1 2027 — quarta revisão trimestral | Alexandre Caramaschi |
| Q1 2027 | Onda 4 do benchmarking (especialistas em Psicologia restantes) | Alexandre Caramaschi |
| Q2 2027 | Avaliação de expansão para outras áreas IPOG (decisão executiva) | Ronan Maia + Alexandre Caramaschi |

## Janelas críticas em maio 2026

A maior densidade de marcos do ano está em maio. Sequência operacional:

```
Sem 1 (07-10/05) — Início Fase 1
  ├─ Coleta cross-LLM dia 1 (issue #5)
  ├─ Confirmação robots.txt aberto a IA crawlers (issue #6)
  └─ Auditoria NAIA full primeira execução

Sem 2 (11-17/05)
  ├─ Decisão de produto IPOG (15-05) — gatilho R-001
  ├─ Schema canônico em página piloto começa (issue #3)
  └─ Reconfirmação Portaria FACON CETCC (issue #12)

Sem 3 (18-24/05)
  ├─ Kit de prompts-âncora fechado (20-05)
  ├─ Configuração GA4 com referrer/UTM (25-05)
  └─ Onda 2 integrada nas matrizes consolidadas (issues #8 e #9)

Sem 4 (25-31/05)
  ├─ Schema piloto implementado em produção (30-05)
  ├─ llms.txt no ar (issue #2)
  └─ Baseline cross-LLM Fase 1 fechado
```

## Janelas críticas em junho-julho 2026 (pico de captação 2026.2)

```
Junho 2026
  Sem 1 (01-07/06) — Início Fase 2
    ├─ Primeira peça HBR-grade Alexandre publicada (issue #7)
    ├─ Wikipedia IPOG — baseline confirmado (issue #19)
    └─ Auditoria Schema dos 10 concorrentes em curso (issue #10)

  Sem 2 (08-14/06)
    ├─ Peças HBR 2 e 3 publicadas
    └─ Onda 3 do benchmarking iniciada (issue #17)

  Sem 3 (15-21/06) — Início Fase 3 (pico)
    ├─ Peças HBR 4 e 5 publicadas
    └─ Primeira leitura quinzenal pós-Schema

  Sem 4 (22-28/06)
    ├─ Peças HBR 6+ publicadas
    └─ Fechamento Q2 — revisão trimestral (30-06)

Julho 2026
  Operação contínua do pico
    ├─ Coleta cross-LLM diária
    ├─ Recheck mensal Saint Paul/EXAME (issue #14)
    ├─ Re-fetch quinzenal robots/llms (issue #15)
    └─ Monitoramento WAF Anhanguera/Sírio-Libanês (issue #16)

  Sem final (27-31/07) — Fim do pico 2026.2
    └─ Fechamento de KPIs de pico para análise no checkpoint executivo de agosto
```

## Marcos com gatilhos de escalonamento explícitos

Quando o marco se aproxima sem progresso esperado, gatilhos disparados em ordem:

### Decisão de produto (15-05-2026)

- **D-7 (08-05):** se decisão não sair, status R-001 muda para "Em escalada".
- **D-3 (12-05):** se decisão não sair, e-mail direto a Ronan Maia.
- **D-Day (15-05):** se decisão não sair, recalibrar Fase 1 para apenas 1 produto âncora.
- **D+5 (20-05):** se ainda sem decisão, replanejar Fase 2 reduzindo ambição.

### Configuração GA4 (25-05-2026)

- **D-7 (18-05):** validar com TI IPOG.
- **D-Day (25-05):** se não estiver pronto, KPI 7 entra como N/D na Fase 1.
- **D+15 (09-06):** se ainda sem GA4, baseline KPI 7 é deferido para Fase 2.

### Schema piloto em produção (30-05-2026)

- **D-7 (23-05):** validar JSON-LD em ambiente de homologação.
- **D-Day (30-05):** se não estiver no ar, recalibrar Fase 1 para fechamento na primeira semana de junho.
- **D+7 (06-06):** se ainda sem Schema piloto, escalada a Ronan + plano de remediação técnica.

### Pico GEO captação 2026.2 (15-06 a 31-07-2026)

- **D-30 (15-05):** todos os artefatos da Fase 1 precisam estar prontos.
- **D-15 (01-06):** primeira peça HBR no ar.
- **D-Day (15-06):** baseline pré-pico congelado para comparação.
- **D+45 (31-07):** fechamento de KPIs do pico → checkpoint mensal de agosto.

## Reuniões fixas no calendário

| Reunião | Cadência | Próxima ocorrência | Duração | Audiência |
|---|---|---|---|---|
| Status semanal IPOG | Semanal — proposta inicial terça-feira 10h00 BRT | A confirmar no kickoff | 60 min | Alexandre + Bruno |
| Checkpoint executivo mensal | Mensal — proposta inicial primeira terça-feira do mês 17h00 BRT | A confirmar no kickoff | 60 min | Alexandre + Ronan + Bruno |
| Revisão estratégica trimestral | Trimestral | 30-06-2026 (Q2) | 2-3 horas | Alexandre + Ronan + Bruno |
| Auditoria NAIA mensal | Mensal | Última quinta-feira do mês | Preparada por Brasil GEO | Bruno (validação) |
| Spot-check NAIA quinzenal | Quinzenal | 15 e último dia do mês | Preparada por Brasil GEO | Bruno (validação) |

## Cross-links

- `ROADMAP.md` — fases do programa.
- `docs/03-reunioes-e-cadencia-ipog.md` — cadência operacional.
- `docs/05-risk-register.md` — riscos com gatilhos.
- `docs/04-definicao-de-done.md` — DoD por tipo de artefato.
- `dashboards/KPI-DASHBOARD.md` — KPIs ao vivo.
- GitHub Milestones — fases vinculadas: https://github.com/alexandrebrt14-sys/geo-ipog/milestones
