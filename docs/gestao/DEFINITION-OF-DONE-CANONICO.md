# Definition of Done — Síntese Executiva

> **Status:** vigente desde 2026-05-10 (síntese executiva do exaustivo `docs/04-definicao-de-done.md`)
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação:** Bruno Azambuja (IPOG)

DoD em formato compacto para uso em PRs, issue templates e stand-ups. Para a versão exaustiva com 12 categorias e 100+ critérios, ver `docs/04-definicao-de-done.md`.

A lógica é prescritiva: ambiguidade na DoD vira ambiguidade na medição. Critério não cumprido sem registro explícito do motivo é reabertura automática.

---

## Anti-padrões proibidos (universais)

- Fechar issue sem evidência de pronto (link para artefato)
- Marcar peça como publicada sem Voice Guard 2.0 ≥ 7/9
- Reportar KPI sem N mínimo atingido
- Mover onda para "concluída" sem Delta KPIs medido
- Aprovar Schema sem snapshot arquivado
- Fechar relatório semanal com lacuna silenciosa em qualquer das 12 seções
- Comparar leitura cross-LLM com versões diferentes do modelo

---

## DoD por tipo de artefato (matriz compacta)

### A1 — Peça editorial HBR-grade

- [ ] Padrão editorial 6 elementos seguido
- [ ] **Voice Guard 2.0 score ≥ 7/9 enriquecimentos** (gate Aggarwal KDD 2024)
- [ ] Bloom 3+ aplicado em CTAs e exercícios
- [ ] Sem clichês das 3 deny-lists
- [ ] Acentuação completa PT-BR
- [ ] Glossário Psicologia respeitado
- [ ] Schema Article + Person validado em Rich Results Test + Schema.org Validator
- [ ] Cross-link para Course/Program canônico
- [ ] Compliance MEC + CFP revisado quando há claim regulatório
- [ ] Aprovação Bruno antes do publish
- [ ] URL canônica registrada
- [ ] Métrica inicial coletada 14 dias após publish

### A2 — Implementação de Schema

- [ ] Template canônico `docs/ontologia/SCHEMA-IPOG-CANONICAL.md` seguido (não ad hoc)
- [ ] `@id` da ontologia aplicado (`org:ipog`, `unit:<cidade>`, etc.)
- [ ] JSON-LD validado em Rich Results Test (HTTP 200, sem erros)
- [ ] JSON-LD validado em Schema.org Validator (sem erros)
- [ ] Snapshot arquivado em `audits/schema-implementations/{YYYY-MM-DD}-{slug}.json`
- [ ] Aprovação Bruno antes do go-live
- [ ] Schema Coverage Score recalculado em KPI Dashboard

### A3 — llms.txt

- [ ] Template `audits/LLMS-TXT-TEMPLATE.md` seguido
- [ ] HTTP 200 em `https://ipog.edu.br/llms.txt`
- [ ] Naming canônico: IPOG, Brasil GEO, MBA Online de Psicologia [Cluster]
- [ ] Robots.txt complementar com whitelist GPTBot, ClaudeBot, anthropic-ai, Google-Extended, PerplexityBot, CCBot, Applebot-Extended
- [ ] Snapshot arquivado em `audits/llms-txt-versions/{YYYY-MM-DD}.txt`

### A4 — Coleta cross-LLM

- [ ] Cohort fechado: ChatGPT/Claude/Gemini/Perplexity/Grok/Copilot
- [ ] Versão pinada de cada modelo registrada
- [ ] N mínimo: 50 prompts/LLM/leitura (KPI 1) · 100 menções/cluster (KPI 2) · 30 menções válidas (KPI 3)
- [ ] Logs JSONL persistidos em `data/baseline-llm-{fase}/{YYYY-MM-DD}/`
- [ ] Hash SHA-256 por (provider, model, query)
- [ ] Resultados em `dashboards/KPI-DASHBOARD.md` seções 2-4
- [ ] Drift detection rodado
- [ ] Custo registrado em `dashboards/FINOPS-DISCIPLINA.md`

### A5 — Auditoria NAIA full mensal

- [ ] Cobertura mínima: hub central + página institucional + 30 páginas de curso + `/corpo-docente` + 5 perfis docente
- [ ] Cada NAIA-XXX com aprovação ou falha registrada
- [ ] P0 falhando → issue mesmo dia (label `priority:p0` + `type:audit-finding`)
- [ ] P1 falhando → issue em ≤ 1 dia útil
- [ ] Schema Coverage Score recalculado em `dashboards/KPI-DASHBOARD.md` seção 5
- [ ] Diff vs auditoria anterior arquivado
- [ ] Sumário executivo de até 3 linhas na issue mestre

### A6 — Onda editorial encerrada

- [ ] Mínimo 3 peças HBR-grade publicadas (cada uma cumprindo A1)
- [ ] Pelo menos 1 ajuste Schema aplicado
- [ ] Delta KPIs medido (KPI 8: Δ pré/pós)
- [ ] Janelas pré/pós-onda 14 dias registradas
- [ ] Sumário em `docs/relatorios-mensais/`
- [ ] Issues vinculadas fechadas no GitHub
- [ ] Lições aprendidas documentadas

### A7 — Relatório semanal

- [ ] 12 seções canônicas preenchidas (sem lacuna silenciosa)
- [ ] Métricas com delta vs semana anterior (CINZA com motivo se N/D)
- [ ] Bloqueios + decisões pendentes com owner + prazo
- [ ] Riscos top 3 cross-link com `docs/05-risk-register.md`
- [ ] Plano semana corrente + próximas 2 semanas
- [ ] Fechado domingo 21h00 BRT
- [ ] Enviado segunda 09h00 (1h antes da call) para `bruno.azambuja@ipog.edu.br`

### A8 — Issue do GitHub

- [ ] Template apropriado escolhido
- [ ] Labels nas dimensões aplicáveis (priority + phase/quarter + vetor + cluster + persona + horizon + janela + tipo + owner + gate + risco)
- [ ] Milestone vinculado (8 marcos M1-M8 ou Operação contínua)
- [ ] Adicionada ao project board #6 com Onda/Cluster/Fase/Prioridade
- [ ] Owner declarado
- [ ] Critério de pronto explícito no body
- [ ] Quando fechada: comentário com link para artefato + Status board → Done

### A9 — PR (Pull Request)

- [ ] Branch `chore/`, `docs/`, `audit/`, `feat/`, `fix/` apropriada (kebab-case)
- [ ] Commit messages em formato `type(scope): description`
- [ ] Quality gate passou (markdown-link-check + markdownlint)
- [ ] Aprovação CODEOWNERS quando arquivo crítico
- [ ] Cross-links para issues fechadas (`Closes #X`) ou referenciadas
- [ ] PR description segue template `.github/PULL_REQUEST_TEMPLATE.md`
- [ ] Revisão por Alexandre (auto-review aceitável quando docs)
- [ ] Squash merge preferencial (rebase se branch grande)

### A10 — Decisão IPOG (gating)

- [ ] Decisão registrada em ata `docs/atas/{YYYY-MM-DD}-ipog-{tipo}.md`
- [ ] Owner + prazo + critério explícito
- [ ] Cross-link com risco R-XXX correspondente
- [ ] Se "Em escalada", gatilho documentado em `docs/05-risk-register.md`

### A11 — Sprint encerrado

- [ ] DoD por sprint conforme `docs/ROADMAP-SPRINTS-2026-2027.md`
- [ ] Tasks dos 5 vetores avaliadas (cada sprint cobre ≥ 3)
- [ ] Frameworks F1-F6 aplicáveis aplicados
- [ ] Métricas alvo do sprint medidas
- [ ] Retro sexta-feira 17h00 com cada squad lead
- [ ] Sprint seguinte aberto com placeholders no domingo

### A12 — Marco encerrado (M1-M8)

- [ ] Todos os sprints do marco fechados conforme A11
- [ ] KPIs alvo do marco atingidos ou variância documentada
- [ ] Relatório mensal/trimestral fechado conforme A6/A7
- [ ] Checkpoint executivo Ronan realizado quando aplicável
- [ ] Lições aprendidas documentadas para o marco seguinte

---

## Cross-links

- `docs/04-definicao-de-done.md` — versão exaustiva (12 categorias)
- `docs/gestao/SQUADS-E-SKILLS.md` — quem aplica DoD por squad
- `docs/ROADMAP-SPRINTS-2026-2027.md` — DoD por sprint
- `docs/GEO-FRAMEWORK-CANONICO.md` — frameworks F1-F6 que rodam dentro do DoD
- `dashboards/METRICAS-CANONICAS.md` — N mínimo + fórmulas
