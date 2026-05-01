# Atas das reuniões — GEO IPOG

Atas de reuniões de status (semanais com Bruno Azambuja) e de checkpoints executivos mensais (com Ronan Maia).

## Padrão de nomeação

- Reunião semanal de status: `YYYY-MM-DD-ipog-status.md`
- Checkpoint executivo mensal: `YYYY-MM-DD-ipog-checkpoint-executivo.md`
- Revisão estratégica trimestral: `YYYY-MM-DD-ipog-revisao-trimestral.md`
- Reuniões pontuais: `YYYY-MM-DD-ipog-<tema-curto-em-slug>.md`

## Template canônico

Toda ata é gerada por cópia do `_TEMPLATE.md`:

```bash
cp _TEMPLATE.md AAAA-MM-DD-ipog-status.md
```

O template tem 11 seções obrigatórias com cross-links para `docs/03-reunioes-e-cadencia-ipog.md`, `docs/05-risk-register.md` e `dashboards/KPI-DASHBOARD.md`.

## Disciplina

- Ata registrada no **mesmo dia da reunião** em PR com label `monitoramento`.
- Decisões com owner e prazo (ver `docs/04-definicao-de-done.md` seção 11).
- Pendências `gating-ipog` cross-linkadas com issue do GitHub.
- Aprovação por silêncio em até **2 dias úteis** após envio (ou correções registradas em commit subsequente).
- Sem emojis (regra do programa).
