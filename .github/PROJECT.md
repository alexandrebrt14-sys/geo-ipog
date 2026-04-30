# GEO IPOG — GitHub Project v2

## Identificação

- **Título:** GEO IPOG — Programa GEO MBA Online de Psicologia
- **Visibilidade:** Privado
- **Owner:** alexandrebrt14-sys
- **Criado em:** 30-04-2026

---

## Estrutura de campos customizados

O project conta com os seguintes campos além dos campos padrão do GitHub (Title, Assignees, Status, Labels, Milestone, Repository):

| Campo      | Tipo          | Opções                                                                                                       |
|------------|---------------|--------------------------------------------------------------------------------------------------------------|
| Status     | Single Select | Todo / In Progress / Done                                                                                    |
| Fase       | Single Select | Fase 0 - Kickoff / Fase 1 - Diagnóstico / Fase 2 - Citação / Fase 3 - Conteúdo / Fase 4 - Mensuração / Recorrente |
| Prioridade | Single Select | P0 / P1 / P2 / P3                                                                                            |
| Onda       | Single Select | Onda 1 / Onda 2 / Onda 3 / Onda 4 / Onda 5+                                                                  |
| Cluster    | Single Select | Organizacional / Clínica-Neuro-TCC / Psicopedagogia-Escolar / Decisão-de-Carreira / Tendências-Mercado       |
| Owner      | Texto livre   | Nome do responsável (Alexandre Caramaschi, Bruno Azambuja, Ronan Maia, etc.)                                 |
| Prazo      | Data          | Data limite YYYY-MM-DD                                                                                       |

---

## Convenção de uso

1. **Toda issue nova** deve ser adicionada ao project imediatamente após a criação:
   ```bash
   gh project item-add <NUMERO_PROJECT> --owner alexandrebrt14-sys --url https://github.com/alexandrebrt14-sys/geo-ipog/issues/<numero>
   ```

2. **Preenchimento obrigatório** ao adicionar uma issue:
   - **Fase:** Fase 0 / Fase 1 / Fase 2 / Fase 3 / Fase 4 / Recorrente
   - **Prioridade:** P0 (bloqueador), P1 (alta), P2 (média), P3 (baixa/melhoria contínua)
   - **Onda:** indicar a onda quinzenal de execução
   - **Cluster:** apenas para issues `content`, `prompts` e `citation-gap`

3. **Status** deve ser atualizado conforme execução:
   - `Todo` — issue criada, ainda não iniciada
   - `In Progress` — issue em execução ativa
   - `Done` — critério de pronto 100% atendido

4. **Owner** deve ser preenchido com o nome do responsável principal pela execução.

5. **Prazo** deve ser preenchido com a data limite definida no `ROADMAP.md` ou acordada na reunião semanal com Bruno Azambuja.

---

## Cadência de uso

Este project é o board de referência oficial do programa GEO IPOG. Ele é revisado em todas as reuniões semanais de acompanhamento e no checkpoint executivo mensal.

- **Reunião semanal de status:** Alexandre Caramaschi (Head Brasil GEO) e Bruno Azambuja (Marketing IPOG). Cadência registrada em `docs/03-reunioes-e-cadencia-ipog.md`.
- **Checkpoint executivo mensal:** Alexandre Caramaschi e Ronan Maia (CEO IPOG). Decisões de continuidade, expansão de escopo e investimento da onda seguinte.

Durante as reuniões, o board serve como base para:
- Revisar status das ações da semana anterior
- Identificar bloqueadores e issues em atraso
- Planejar as ações da semana seguinte
- Registrar decisões que impactam escopo ou prazo
