# Reuniões e Cadência Operacional — GEO IPOG

Este documento estabelece o ritmo operacional acordado entre Brasil GEO e IPOG para o programa GEO IPOG, cujo escopo canônico cobre as Pós-Graduações em Psicologia do IPOG em todas as modalidades regulamentadas (Especialização Lato Sensu, MBA em áreas correlatas, Mestrado Profissional, Especialização Clínica certificada por Conselhos profissionais como CFP, ABRAP e FBT, Residências e formações híbridas). As cadências aqui descritas são definidas no kickoff e revisadas no checkpoint executivo mensal.

## Reunião semanal de status

- **Frequência:** semanal
- **Dia e horário:** a confirmar no kickoff (proposta inicial: terça-feira às 10h00 BRT, 60 minutos).
- **Participantes recorrentes:**
  - Alexandre Caramaschi (Head Brasil GEO)
  - Bruno Azambuja (Gerente de Marketing IPOG)
- **Convidados pontuais:** áreas IPOG (acadêmico, captação, jurídico, TI) quando o tópico exigir.
- **Pauta padrão:**
  1. Revisão do relatório semanal entregue antes da reunião
  2. Status das ações da semana anterior (board GitHub Project)
  3. Bloqueadores e dependências externas
  4. Decisões da semana com efeito sobre cronograma ou escopo
  5. Plano da semana seguinte e priorização
- **Ata:** registrada em `docs/atas/` no formato `YYYY-MM-DD-ipog-status.md` no mesmo dia da reunião.

## Relatório semanal

- **Entrega:** uma hora antes da reunião semanal de status.
- **Destinatário:** Bruno Azambuja, com cópia para Ronan Maia uma vez por mês ou quando houver decisão executiva pendente.
- **Local:** `docs/relatorios-semanais/YYYY-MM-DD-relatorio-semanal-ipog.md`.
- **Construção:** alimentado dia a dia pela equipe Brasil GEO ao longo da semana, fechado domingo às 21h00 BRT.
- **Estrutura mínima:** progresso por fase do roadmap, mention rate e share-of-voice da quinzena, gaps fechados, gaps abertos, riscos ativos, decisão pendente, plano da semana seguinte.

## Checkpoint executivo mensal

- **Frequência:** mensal
- **Dia e horário:** a confirmar no kickoff (proposta inicial: primeira terça-feira do mês às 17h00 BRT, 60 minutos).
- **Participantes:**
  - Alexandre Caramaschi (Head Brasil GEO)
  - Ronan Maia (CEO IPOG)
  - Bruno Azambuja (Gerente de Marketing IPOG)
- **Pauta padrão:**
  1. Revisão executiva da onda concluída (KPIs, mention rate, share-of-voice, gaps fechados)
  2. Decisões de continuidade ou recalibração
  3. Eventual expansão de escopo (outras áreas IPOG além de Psicologia, ou inclusão de novas modalidades de Pós-Graduação em Psicologia no programa GEO)
  4. Investimento da onda seguinte (recursos, prazos, prioridades)
  5. Riscos estratégicos e dependências executivas
- **Ata:** `docs/atas/YYYY-MM-DD-ipog-checkpoint-executivo.md`.

## Cadência de entregas

| Entrega | Cadência | Responsável |
|---|---|---|
| Coleta de respostas LLM cohort | Diária | Brasil GEO (automatizada via NAIA) |
| Snapshot quantitativo de share-of-voice | Quinzenal | Brasil GEO |
| Relatório semanal | Semanal | Brasil GEO |
| Atas de reunião semanal | Semanal | Brasil GEO |
| Relatório mensal de performance | Mensal | Brasil GEO |
| Ata de checkpoint executivo | Mensal | Brasil GEO |
| Recalibração do kit de prompts-âncora | Mensal | Brasil GEO |
| Auditoria de autoridade externa | Mensal | Brasil GEO |
| Full-grid prompt sensitivity | Trimestral | Brasil GEO |
| Cohort expansion (atualizar versões pinadas de modelos) | Trimestral | Brasil GEO |
| Auditoria editorial completa do hub | Semestral | Brasil GEO + IPOG (acadêmico) |

## Canais de comunicação

- **Discussões assíncronas operacionais:** GitHub Discussions no repositório `geo-ipog`.
- **Issues operacionais:** GitHub Issues com templates apropriados.
- **Decisões executivas e escalation:** e-mail direto + checkpoint mensal.
- **Confidencialidade alta:** contato direto com Alexandre Caramaschi via alexandre@brasilgeo.ai.

## SLAs internos

| Situação | SLA |
|---|---|
| Resposta a comentário em issue por @alexandrebrt14-sys | 1 dia útil |
| Aprovação de PR pelo Head Brasil GEO | 1 dia útil após checklist completo |
| Aprovação de mudança em propriedade IPOG ao vivo (Bruno Azambuja) | 2 dias úteis |
| Revisão jurídica IPOG para conteúdo com claim MEC/CFP/ABRAP/FBT ou demais Conselhos | 5 dias úteis |
| Resposta a SEV1/SEV2 de incidente | 4 horas (em horário comercial BRT) |
| Decisão executiva escalada para Ronan Maia | Próximo checkpoint mensal, ou e-mail direto se SEV1 |
