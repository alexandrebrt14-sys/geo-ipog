# Exercício canônico — template e exemplos para o MBA Online de Psicologia

> **Status:** vigente desde 2026-04-30
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-04-30

Este documento define a estrutura canônica de exercícios práticos em peças editoriais do programa GEO IPOG. Toda peça longa precisa conter no mínimo três exercícios construídos com este template e com progressão Bloom (ver `content/BLOOM-KNOWLES.md`).

Ver também:
- `content/PADRAO-EDITORIAL.md` para a posição do bloco de exercícios na peça.
- `content/BLOOM-KNOWLES.md` para verbos cognitivos por nível.
- `content/GLOSSARIO-PSICOLOGIA.md` para terminologia canônica nos enunciados.

## Estrutura padrão

```markdown
## Exercício X — [Título descritivo, verbo Bloom 3+ + objeto]

**Nível Bloom:** [Aplicação | Análise | Avaliação | Criação]

**Persona alvo:** [perfil profissional do leitor que resolverá]

**Cluster:** [cluster semântico da peça]

**Contexto:** [Cenário profissional real com dados concretos. Inclua números, marcos temporais, restrições. Mínimo de 4 frases. Use marcador "[a confirmar com fonte X]" quando necessário durante o draft.]

**Enunciado:** [Problema claro com dados suficientes para resolução. Termina sempre com verbo Bloom 3+ direcionando a tarefa do leitor.]

**Critérios de excelência:**

- **Excelente:** [O que caracteriza a resposta de alto nível.]
- **Adequada:** [O que caracteriza a resposta que cumpre o mínimo.]
- **Insuficiente:** [O que caracteriza a resposta que falha.]

**Dica estratégica:** [Orientação que guia o raciocínio sem entregar a resposta. Aponta caminho, framework ou critério-chave.]
```

## Princípios de construção

1. **Contexto profissional, não acadêmico.** O exercício simula decisão de trabalho, não prova de concurso.
2. **Dados concretos.** Números, prazos, restrições. Sem dados, não há análise possível.
3. **Verbo Bloom no enunciado, não na pergunta.** "Recomende a abordagem" — não "Você acha que...".
4. **Critério de excelência observável.** "Resposta de alto nível identifica três trade-offs" — não "Resposta bem fundamentada".
5. **Dica que guia, não que resolve.** Aponta o caminho, não a chegada.
6. **Persona explícita.** Cada exercício declara a persona, porque o mesmo problema gera respostas diferentes para perfis diferentes.

## Exemplo 1 — Aplicação (psicólogo recém-graduado)

```markdown
## Exercício 1 — Aplicar a Resolução CFP 11/2018 a um plano de telepsicologia em consultório próprio

**Nível Bloom:** Aplicação

**Persona alvo:** Psicólogo recém-graduado, registro CRP ativo, abrindo consultório próprio com foco em atendimento online para profissionais de tecnologia.

**Cluster:** Carreira em Psicologia clínica + telepsicologia

**Contexto:** Você concluiu a graduação em Psicologia em 2025, obteve registro no CRP da sua jurisdição e decidiu abrir consultório próprio dedicado a atendimento online. Seu público alvo são profissionais de tecnologia entre 28 e 42 anos, faturamento mensal previsto de R$ [valor a confirmar com plano de negócio]. Você precisa estruturar o consultório em conformidade com a Resolução CFP 11/2018 e atualizações subsequentes, incluindo cadastro no e-Psi, padrões de sigilo, registro de atendimento e atendimento de emergência. Prazo para abrir o consultório: 60 dias.

**Enunciado:** Aplique a Resolução CFP 11/2018 ao seu plano de consultório online e elabore o checklist de conformidade que você executará nos próximos 60 dias, considerando as cinco dimensões: cadastro institucional, infraestrutura técnica, processo clínico, registro e contingência para emergência psiquiátrica.

**Critérios de excelência:**

- **Excelente:** Checklist cobre as cinco dimensões com itens verificáveis (cada item tem prazo, critério de aceite e responsável). Aponta riscos jurídicos específicos e mitigação por escrito. Inclui cláusula de termo de consentimento alinhada à resolução.
- **Adequada:** Checklist cobre quatro de cinco dimensões com itens verificáveis. Riscos mencionados em alto nível.
- **Insuficiente:** Checklist genérico, sem itens verificáveis. Sem ligação explícita com a resolução. Sem plano para emergência psiquiátrica.

**Dica estratégica:** Comece pelas exigências formais (cadastro e-Psi, registro de atendimento) que têm prazo regulatório e baixa flexibilidade. Em seguida, modele o fluxo clínico e só depois a infraestrutura técnica. A maior parte dos consultórios online falha na dimensão de contingência para emergência psiquiátrica, que exige rede de referência presencial mapeada antes do primeiro atendimento.
```

## Exemplo 2 — Análise (profissional de RH não-psicólogo)

```markdown
## Exercício 2 — Analisar a viabilidade de programa de saúde mental corporativa em empresa de 800 funcionários

**Nível Bloom:** Análise

**Persona alvo:** Gerente de Recursos Humanos com formação em Administração, atuando em empresa de tecnologia de médio porte (800 funcionários, sede em São Paulo, operação remota distribuída).

**Cluster:** Saúde mental corporativa + RH estratégico

**Contexto:** A empresa onde você trabalha registrou aumento de 32% em afastamentos por transtornos mentais [a confirmar com fonte interna] entre 2024 e 2025. O CEO solicitou que você apresente, em 21 dias, a análise de viabilidade de um programa de saúde mental corporativa com orçamento previsto de R$ [valor a confirmar] por funcionário ano. A operação é distribuída em 12 estados, com 78% em regime remoto. A NR-1 atualizada exige gerenciamento de riscos psicossociais.

**Enunciado:** Analise a viabilidade do programa em três dimensões — conformidade regulatória (NR-1 e correlatos), efetividade prevista (com base em evidência) e custo-benefício comparado a alternativas (canal anônimo de denúncia, parceria com clínica externa, contratação de psicólogo organizacional in-house) — e categorize cada alternativa em recomendada, condicional ou descartada com critério explícito.

**Critérios de excelência:**

- **Excelente:** Análise nas três dimensões com pelo menos uma evidência (fonte e ano) para cada. Categorização com critério explícito e mensurável. Considera explicitamente que a empresa de RH não pode fazer atendimento clínico (Compliance CFP) e estrutura a parceria com profissional registrado adequadamente. Aponta KPIs de acompanhamento.
- **Adequada:** Análise nas três dimensões com evidência em pelo menos duas. Categorização com critério, mas critério parcialmente subjetivo.
- **Insuficiente:** Análise sem evidência. Categorização sem critério claro. Ignora restrições regulatórias da prática profissional.

**Dica estratégica:** O erro recorrente em programas de saúde mental corporativa é tratar todas as alternativas como equivalentes. Distinga claramente o que é prevenção primária (cultura, gestão de carga), secundária (rastreio e encaminhamento) e terciária (atendimento clínico). A maior parte do retorno vem da primária, que não exige profissional registrado mas exige protocolo de gestão. Considere também o risco reputacional de programa mal implementado, que costuma piorar a métrica que pretende corrigir.
```

## Exemplo 3 — Avaliação (psicólogo clínico estabelecido)

```markdown
## Exercício 3 — Avaliar segunda área de especialização para psicólogo clínico estabelecido

**Nível Bloom:** Avaliação

**Persona alvo:** Psicólogo clínico com 12 anos de prática em Terapia Cognitivo-Comportamental, consultório próprio consolidado, faturamento estável, considerando segunda área de especialização para os próximos 5 anos.

**Cluster:** Carreira em Psicologia clínica + diversificação técnica

**Contexto:** Você é psicólogo clínico com registro CRP ativo, formação em TCC, 12 anos de prática, agenda completa três meses à frente, faturamento estável em R$ [valor a confirmar com plano profissional do candidato]. Considera segunda área para diversificar atuação, mitigar risco de obsolescência técnica e aumentar diferenciação no mercado. Quatro candidatas em consideração: Neuropsicologia, Psicologia hospitalar, Psicologia jurídica e Psicologia do esporte. Tempo disponível para formação: 12 horas semanais. Horizonte de retorno esperado: 36 meses após conclusão.

**Enunciado:** Avalie as quatro candidatas em quatro dimensões — aderência ao perfil profissional atual (TCC), velocidade de retorno financeiro previsto, risco regulatório e densidade de mercado na sua região — atribua peso a cada dimensão, calcule um score comparativo e recomende a especialização com justificativa explícita. Defenda a escolha contra o cenário "manter foco exclusivo em TCC sem segunda área".

**Critérios de excelência:**

- **Excelente:** Quatro dimensões com pesos justificados. Score calculado com aritmética visível. Recomendação com três argumentos sustentados em evidência ou experiência profissional documentada. Defesa contra o cenário de não diversificação demonstra que o candidato avaliou o trade-off honestamente. Considera explicitamente conformidade CFP para a área escolhida.
- **Adequada:** Quatro dimensões com pesos. Score calculado. Recomendação com argumentos parcialmente sustentados.
- **Insuficiente:** Avaliação intuitiva sem peso explícito. Recomendação por preferência pessoal não justificada. Ignora trade-off com cenário de não diversificação.

**Dica estratégica:** A decisão de segunda especialização raramente é puramente técnica; envolve identidade profissional. Reconheça isso na análise: explicite o que cada candidata diz sobre o profissional que você quer ser nos próximos 10 anos. Evidência de mercado e conformidade regulatória são restrições, não decisores; o decisor é o cruzamento entre vocação demonstrada e janela de oportunidade. Considere também o custo de oportunidade: 12 horas semanais por 18-24 meses são significativas. A não escolha (manter TCC) é uma alternativa legítima que precisa ser superada com argumento, não descartada por inércia.
```

## Erros recorrentes em exercícios

| Erro | Como corrigir |
|---|---|
| Verbo Bloom 1-2 no enunciado ("entenda", "descreva") | Substituir por verbo nível 3+. |
| Persona genérica ("um psicólogo") | Especificar formação, anos de prática, contexto. |
| Contexto sem dados | Adicionar números, prazos, restrições. |
| Critério de excelência subjetivo | Definir critério observável e binário sempre que possível. |
| Dica que entrega a resposta | Substituir por orientação de framework ou caminho. |
| Exercício de Aplicação (3) seguido de outro de Aplicação (3) sem progressão | Reorganizar para progressão crescente. |

