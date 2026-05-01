# GEO IPOG — GitHub Project v2

## Identificação

- **Título:** GEO IPOG — Programa Operacional
- **Project number:** 6
- **URL:** https://github.com/users/alexandrebrt14-sys/projects/6
- **Visibilidade:** Privado
- **Owner:** alexandrebrt14-sys
- **Criado em:** 01-05-2026

---

## Estrutura de campos customizados

Além dos campos padrão do GitHub (Title, Assignees, Status, Labels, Milestone, Repository, Linked PRs, Reviewers, Parent issue, Sub-issues progress), o project tem **4 campos custom** específicos do programa GEO IPOG:

| Campo | Tipo | Opções |
|---|---|---|
| Status | Single Select | Todo / In Progress / Done |
| Onda | Single Select | Onda 1 / Onda 2 / Onda 3 / Onda 4 / Programa |
| Cluster | Single Select | Organizacional / Clinica/Neuro / Psicopedagogia / Transversal |
| Fase | Single Select | Fase 1 / Fase 2 / Fase 3 / Fase 4 / Continuo |
| Prioridade | Single Select | Alta / Media / Baixa |

### Significado dos campos

- **Onda** — distingue trabalho originário de uma onda específica do benchmarking (Onda 1 a Onda 4) do trabalho geral do programa (Programa). Issues de monitoramento contínuo de concorrentes da Onda 2 ficam marcadas como Onda 2.
- **Cluster** — cluster semântico do produto-âncora MBA Online de Psicologia. "Transversal" para issues que afetam todos os clusters (Schema, llms.txt, baseline, framework).
- **Fase** — fase do roadmap (Fase 1 a Fase 4) ou "Continuo" para monitoramento e operação contínua sem fim de fase.
- **Prioridade** — Alta (bloqueante de pico ou janela competitiva), Media (relevante mas não bloqueante), Baixa (backlog ou observação).

---

## Mapeamento de issues por fase

Distribuição das 18 issues canônicas do programa em 2026-05-01:

| Fase | Issues |
|---|---|
| Fase 1 — Baseline + Schema piloto | #2, #3, #4, #5, #6, #10, #19 |
| Fase 2 — Primeira leva HBR | #7, #8, #9, #17 |
| Fase 3 — Pico GEO captação 2026.2 | #18 |
| Continuo — monitoramento e validações | #11, #12, #13, #14, #15, #16 |

---

## Convenção de uso

1. **Toda issue nova** deve ser adicionada ao project imediatamente após a criação:

   ```bash
   gh project item-add 6 --owner alexandrebrt14-sys --url https://github.com/alexandrebrt14-sys/geo-ipog/issues/<numero>
   ```

2. **Preenchimento obrigatório** ao adicionar uma issue:
   - **Onda** — Onda 1 / Onda 2 / Onda 3 / Onda 4 / Programa.
   - **Cluster** — Organizacional / Clinica/Neuro / Psicopedagogia / Transversal (a maioria fica Transversal).
   - **Fase** — Fase 1 / Fase 2 / Fase 3 / Fase 4 / Continuo.
   - **Prioridade** — Alta / Media / Baixa.

3. **Status** atualizado conforme execução:
   - `Todo` — issue criada, ainda não iniciada.
   - `In Progress` — issue em execução ativa.
   - `Done` — critério de pronto 100% atendido conforme `docs/04-definicao-de-done.md`.

4. **Owner** registrado no campo Assignees do GitHub (preenchimento manual).

---

## Cadência de uso

Este project é o board de referência operacional do programa GEO IPOG. É revisado em todas as reuniões semanais com Bruno Azambuja (IPOG):

- **Reunião semanal:** proposta inicial terça-feira 10h00 BRT.
- **Participantes:** Alexandre Caramaschi (Head Brasil GEO) + Bruno Azambuja (Marketing IPOG).
- **Pré-requisito:** relatório semanal entregue uma hora antes da call para `bruno.azambuja@ipog.edu.br`.

Durante a reunião, o board serve como base para:

- Revisar status das ações da semana anterior
- Identificar bloqueios e issues em atraso
- Planejar as ações da semana seguinte
- Registrar decisões que impactam escopo ou prazo

No checkpoint executivo mensal com Ronan Maia (CEO IPOG), o board é usado para:

- Mostrar % de conclusão por fase
- Mostrar distribuição de prioridade entre fases ativas
- Discutir issues paradas em "In Progress" há mais de 14 dias

Na revisão trimestral, o board é congelado em snapshot para a sessão de revisão estratégica.

---

## Views recomendadas

Quando o board ganhar mais issues, criar views customizadas:

1. **Roadmap por Fase** — agrupado por Fase, ordenado por Prioridade descendente. Visão executiva do checkpoint mensal.
2. **Operação semanal** — filtrado por Status = In Progress + Todo com Prioridade = Alta. Visão da reunião semanal.
3. **Monitoramento contínuo** — filtrado por Fase = Continuo. Visão das issues de cadência permanente (re-fetch quinzenal, recheck mensal, monitoramento WAF).
4. **Por cluster** — agrupado por Cluster. Visão para revisão de cobertura por vertical de Psicologia.
5. **Por onda** — agrupado por Onda. Visão para revisão de waves do benchmarking competitivo.

---

## Acesso

O project é privado e acessível apenas ao owner `alexandrebrt14-sys`. Compartilhamento read-only para Bruno Azambuja (IPOG) requer convite manual via interface GitHub ou via API GraphQL.

---

## Cross-links

- `ROADMAP.md` — fases do programa
- `docs/03-reunioes-e-cadencia-ipog.md` — cadência operacional
- `docs/04-definicao-de-done.md` — DoD por tipo de artefato
- `docs/06-marcos-criticos-2026.md` — calendário de marcos com gatilhos
- `dashboards/KPI-DASHBOARD.md` — KPIs ao vivo
- GitHub Issues: https://github.com/alexandrebrt14-sys/geo-ipog/issues
- GitHub Milestones: https://github.com/alexandrebrt14-sys/geo-ipog/milestones
