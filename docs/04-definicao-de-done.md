# Definition of Done — Programa GEO IPOG

> **Status:** vigente desde 2026-05-01
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)

Definição operacional de "pronto" por tipo de artefato. Toda issue do GitHub usa este documento como referência canônica antes de ser fechada. Nenhum artefato passa de status "In Progress" para "Done" sem que **todos os critérios da seção correspondente** estejam atendidos e marcados na issue.

A lógica é prescritiva: ambiguidade na definição de pronto vira ambiguidade na medição (KPI 6 — velocidade de fechamento de gaps depende disto). Critério não cumprido sem registro explícito do motivo é reabertura automática da issue.

## 1. Peça editorial HBR-grade

Aplica-se a todo conteúdo público assinado pela marca IPOG ou por Alexandre Caramaschi.

- [ ] Padrão editorial seguido — abertura-impacto, tese contraintuitiva, evidência, mecanismo, decisão pessoal, próximo passo (`content/PADRAO-EDITORIAL.md`).
- [ ] Voice Guard score ≥ 70/100 (`content/VOICE-GUIDE.md`).
- [ ] Bloom 3+ aplicado em todos os exercícios e CTAs (`content/BLOOM-KNOWLES.md`).
- [ ] Sem clichês das três deny-lists (`content/CLICHES-PROIBIDOS.md`).
- [ ] Acentuação completa PT-BR validada (`content/ACENTUACAO-PT-BR.md`).
- [ ] Glossário de Psicologia respeitado (`content/GLOSSARIO-PSICOLOGIA.md`).
- [ ] Schema `Article` + `Person` (autor com Lattes/ORCID) implementado (`audits/SCHEMA-PATTERNS.md`).
- [ ] Cross-link para o produto MBA Online de Psicologia [Cluster] presente.
- [ ] Imagens com `alt` semântico, não decorativo.
- [ ] Sem emojis em texto, headings ou metadata.
- [ ] CHECKLIST-PUBLICACAO 5 camadas aprovado (`content/CHECKLIST-PUBLICACAO.md`).
- [ ] Camada 6 — compliance MEC/CFP — revisada pelo jurídico/acadêmico IPOG quando houver claim regulatório.
- [ ] Aprovação Bruno Azambuja registrada na issue antes do publish.
- [ ] URL canônica registrada na issue.
- [ ] Métrica inicial coletada 14 dias após publish e arquivada em `dashboards/KPI-DASHBOARD.md` seção 9.

## 2. Auditoria técnica NAIA

Aplica-se a auditorias completas mensais e spot-checks quinzenais P0/P1.

- [ ] Cobertura mínima atendida — hub central, página institucional, 30 páginas de curso amostradas, `/corpo-docente`, 5 perfis de docente.
- [ ] Cada check NAIA-XXX executado tem registro explícito de aprovação ou falha em `audits/auditoria-naia-{YYYY-MM-DD}/`.
- [ ] Falhas P0 viram issue no GitHub com label `naia` + `severidade-p0` no mesmo dia.
- [ ] Falhas P1 viram issue no GitHub com label `naia` + `severidade-p1` em até 1 dia útil.
- [ ] Severidade P0 e P1 falhando deduzem do Schema Coverage Score conforme fórmula em `dashboards/METRICAS-CANONICAS.md` KPI 4.
- [ ] Resultado consolidado registrado em `dashboards/KPI-DASHBOARD.md` seção 5.
- [ ] Diff vs. auditoria anterior arquivado.
- [ ] Comentário com sumário executivo em até 3 linhas adicionado à issue mestre da auditoria.

## 3. Implementação de Schema.org

Aplica-se a páginas IPOG ao vivo recebendo Schema canônico.

- [ ] Schema implementado segue exatamente o template canônico em `audits/SCHEMA-PATTERNS.md`.
- [ ] JSON-LD validado no Google Rich Results Test (HTTP 200, sem erros, com warnings registrados).
- [ ] JSON-LD validado no Schema.org Validator (sem erros).
- [ ] Snapshot do JSON-LD arquivado em `audits/schema-implementations/{YYYY-MM-DD}-{slug}.json`.
- [ ] Tipo Schema correto para o caso — `EducationalOrganization` na raiz, `Course` em fichas, `EducationalOccupationalProgram` com `programType: "MBA"` no produto, `FAQPage` quando há FAQ, `Article` em peças editoriais, `Person` em corpo docente.
- [ ] `provider` apontando para a `EducationalOrganization` IPOG canônica.
- [ ] Para Person: `sameAs` apontando para Lattes e ORCID quando disponíveis; `hasCredential` declarado.
- [ ] Aprovação de Bruno Azambuja registrada antes do go-live.
- [ ] Issue NAIA correspondente fechada com link para a página implementada.
- [ ] Schema Coverage Score recalculado e registrado em `dashboards/KPI-DASHBOARD.md` seção 5.

## 4. Implementação de llms.txt

Aplica-se a `https://ipog.edu.br/llms.txt`.

- [ ] Arquivo implementado segue o template em `audits/LLMS-TXT-TEMPLATE.md`.
- [ ] Arquivo retorna HTTP 200 em `https://ipog.edu.br/llms.txt`.
- [ ] Declara hub central, posicionamento institucional, prioridades de citação e contato canônico.
- [ ] Naming canônico respeitado — "IPOG", "Brasil GEO", "MBA Online de Psicologia [Cluster]".
- [ ] Robots.txt complementar mantém permissão a GPTBot, ClaudeBot, anthropic-ai, Google-Extended, PerplexityBot, CCBot, Applebot-Extended.
- [ ] Aprovação Bruno Azambuja registrada antes do go-live.
- [ ] Snapshot do conteúdo arquivado em `audits/llms-txt-versions/{YYYY-MM-DD}.txt`.
- [ ] Issue #2 fechada com link para o arquivo ao vivo.

## 5. Captura cross-LLM (baseline e leituras recorrentes)

Aplica-se à coleta diária e às leituras agregadas.

- [ ] Coleta executada com cohort canônico fechado (ChatGPT, Claude, Gemini, Perplexity, Grok, Copilot).
- [ ] Versão pinada de cada modelo registrada no log da execução.
- [ ] N mínimo do KPI atendido (KPI 1: 50 prompts/LLM/leitura · KPI 2: 100 menções totais por cluster · KPI 3: 30 menções válidas).
- [ ] Logs JSONL persistidos em `data/baseline-llm-{fase}/{YYYY-MM-DD}/`.
- [ ] Hash SHA-256 de cada par `(provider, model, query)` registrado para cache idempotente.
- [ ] Resultados agregados publicados em `dashboards/KPI-DASHBOARD.md` seções 2 a 4.
- [ ] Drift detection rodado para cada provedor — flag levantada se versão silenciosamente atualizou.
- [ ] Custo da execução registrado em `dashboards/FINOPS-DISCIPLINA.md`.

## 6. Dossiê de concorrente (benchmarking)

Aplica-se a cada onda do benchmarking competitivo.

- [ ] 11 seções obrigatórias preenchidas (identidade, atuação online/offline, oferta Psicologia, marca, satisfação, autoridade externa, pontos fortes, vulnerabilidades, hipóteses cross-LLM, fontes).
- [ ] Mínimo de 12 fontes primárias consultadas com data de consulta explícita.
- [ ] Razão social, CNPJ e endereço sede confirmados via fonte primária ou cadastral.
- [ ] Acreditação MEC verificada via e-MEC.
- [ ] Wikipedia institucional auditada — verbete denso/médio/ausente.
- [ ] Mínimo de 5 redes sociais oficiais inspecionadas (LinkedIn, Instagram, Facebook, YouTube, X).
- [ ] Reclame Aqui consultado — score atual + período de avaliação.
- [ ] Pelo menos 2 prompts qualificados onde o concorrente domina e 2 onde o concorrente é ausente listados.
- [ ] Correções de premissa registradas em `audits/benchmarking/ONDA-{N}-CORRECOES-PREMISSA.md` quando aplicável.
- [ ] Integração nas matrizes consolidadas (`matriz-presenca-llm.md` e `matriz-tecnica-schema-seo.md`) na sequência da onda.

## 7. Onda editorial encerrada

Aplica-se ao fechamento de cada onda do plano editorial.

- [ ] Mínimo de 3 peças HBR-grade publicadas (cada uma cumprindo a DoD da seção 1).
- [ ] Pelo menos 1 ajuste Schema aplicado em página relacionada à onda.
- [ ] Delta KPIs medido conforme KPI 8 (`dashboards/METRICAS-CANONICAS.md`).
- [ ] Janela pré-onda (14 dias antes) e pós-onda (14 dias depois) registradas em `dashboards/KPI-DASHBOARD.md` seção 9.
- [ ] Sumário executivo da onda registrado em `docs/relatorios-mensais/` ou `docs/relatorios-semanais/`.
- [ ] Issues vinculadas à onda fechadas no GitHub.
- [ ] Lições aprendidas registradas — quais peças performaram, quais não, hipóteses para a próxima onda.

## 8. Relatório semanal

- [ ] Estrutura canônica do template seguida (`docs/relatorios-semanais/_TEMPLATE.md`).
- [ ] Todas as 12 seções preenchidas — sem lacunas silenciosas.
- [ ] Métricas da semana com delta vs. semana anterior preenchidas (CINZA quando dados não disponíveis com motivo registrado).
- [ ] Bloqueios e decisões pendentes com owner e prazo.
- [ ] Riscos top 3 cross-link com `docs/05-risk-register.md`.
- [ ] Plano da semana corrente com critério de pronto e prazo intra-semana.
- [ ] Próximas duas semanas (visão preditiva) preenchidas.
- [ ] Fechado domingo 21h00 BRT.
- [ ] Enviado para `bruno.azambuja@ipog.edu.br` uma hora antes da reunião de status.

## 9. Relatório mensal

- [ ] Estrutura canônica do template seguida (`docs/relatorios-mensais/_TEMPLATE.md`).
- [ ] 12 seções preenchidas.
- [ ] Painel executivo de uma página fechado (semaforização atualizada).
- [ ] KPIs canônicos com diagnóstico cruzado (causa atribuída, não apenas correlação).
- [ ] Decisão executiva pedida ao Ronan formulada com opções A/B/C e recomendação.
- [ ] Plano do mês seguinte com marcos e onda(s) planejada(s).
- [ ] FinOps mensal consolidado.
- [ ] Anexos com 4 relatórios semanais do mês.
- [ ] Fechado último domingo do mês 21h00 BRT.
- [ ] Enviado 24 horas antes do checkpoint executivo.

## 10. Revisão trimestral

- [ ] Estrutura canônica do template seguida (`docs/relatorios-trimestrais/_TEMPLATE.md`).
- [ ] Tese estratégica revisitada com julgamento explícito (válida / com calibração / reescrever).
- [ ] 12 séries temporais consolidadas (8 KPIs + 3 secundários).
- [ ] Recalibração trimestral aplicada — full-grid prompt sensitivity, cohort de LLMs, dicionário de concorrentes, kit de prompts.
- [ ] Roadmap confirmado ou ajustado com justificativa.
- [ ] Decisões executivas pedidas formuladas.
- [ ] Riscos estratégicos top 5 atualizados.
- [ ] FinOps trimestral consolidado.
- [ ] Anexos com 3 relatórios mensais + atas dos 3 checkpoints.
- [ ] Fechado último domingo do trimestre 21h00 BRT.
- [ ] Enviado 5 dias antes da sessão de revisão.

## 11. Decisão registrada (ata)

- [ ] Ata salva em `docs/atas/{YYYY-MM-DD}-ipog-{tipo}.md` no mesmo dia da reunião.
- [ ] Participantes presentes listados nominalmente.
- [ ] Decisões com owner e prazo.
- [ ] Pendências escaladas para IPOG identificadas.
- [ ] Próxima reunião confirmada com data.
- [ ] Link para o relatório usado como base.
- [ ] Aprovação por silêncio em até 2 dias úteis após envio (ou correções registradas).

## 12. Issue do GitHub

Aplica-se a qualquer issue do repositório `geo-ipog`.

- [ ] Issue criada com template apropriado (audit-finding, citation-gap, content-piece, schema-task, incident).
- [ ] Labels aplicadas — onda, cluster, fase, prioridade, áreas técnicas.
- [ ] Milestone vinculada quando aplicável.
- [ ] Issue adicionada ao project board #6 com Onda/Cluster/Fase/Prioridade preenchidos.
- [ ] Owner declarado.
- [ ] Critério de pronto explícito no body (esta seção do DoD se aplicável).
- [ ] Quando fechada: comentário com link para o artefato gerado (PR, peça publicada, snapshot, etc.).
- [ ] Status no project atualizado para "Done".

---

## Anti-padrões proibidos

- **Fechar issue sem evidência de pronto.** Comentário com link para o artefato é obrigatório.
- **Marcar peça como publicada sem Voice Guard ≥ 70.** Score abaixo é reabertura automática.
- **Reportar KPI sem N mínimo.** N abaixo do mínimo registra `N/D`, nunca estimativa.
- **Mover onda para "concluída" sem Delta KPIs medido.** A onda só fecha com leitura pós.
- **Aprovar Schema sem snapshot arquivado.** Snapshot é evidência irreplicável.
- **Fechar relatório semanal sem 12 seções preenchidas.** Lacuna silenciosa quebra a série temporal.
