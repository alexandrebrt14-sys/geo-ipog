# Risk Register — Programa GEO IPOG

> **Status:** vigente desde 2026-05-01
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Cadência de revisão:** mensal no checkpoint executivo + ad hoc quando risco novo emerge.

Registro estruturado de riscos do programa GEO IPOG. Cada risco tem identificador, descrição operacional, probabilidade, impacto, owner de mitigação, mitigação ativa e gatilho de escalonamento. A leitura mensal do registro alimenta o `dashboards/KPI-DASHBOARD.md` seção 10 (heatmap por KPI) e a seção 7 do `_TEMPLATE.md` mensal.

A lógica é prescritiva: risco sem mitigação ativa explícita é decisão pendente, não risco. Risco sem owner é risco órfão e fica visível no painel até receber owner em ata.

## Convenções

### Probabilidade

- **Alta** — evento provável nos próximos 30 dias (>50%).
- **Média** — evento provável no horizonte 30-90 dias (20-50%).
- **Baixa** — evento possível em horizonte >90 dias (<20%).

### Impacto

- **Crítico** — invalida hipótese central do programa, exige replanejamento de fase ou onda.
- **Alto** — atrasa marco crítico em 2+ semanas ou degrada KPI canônico em mais de 25%.
- **Médio** — atrasa marco em 1 semana ou degrada KPI em até 25%.
- **Baixo** — degrada métrica secundária ou exige micro-ajuste em uma onda.

### Status

- **Mitigado** — controle ativo está reduzindo o risco.
- **Aceito** — custo de mitigação maior que custo do impacto; risco monitorado.
- **Em escalada** — owner não consegue mitigar isoladamente; aguardando decisão executiva.
- **Materializado** — risco virou problema; gestão muda para resolução de incidente.

---

## R-001 — Atraso na decisão de produto IPOG (naming MBA + catálogo)

**Descrição:** o produto MBA Online de Psicologia [Cluster] depende de decisão de Bruno Azambuja + Ronan Maia sobre uso do naming MBA no catálogo lato sensu, seleção de 3-5 produtos prioritários e data de publicação. Sem isso, Schema canônico e PR não saem.

**Probabilidade:** Alta · **Impacto:** Crítico · **Status:** Em escalada

**KPIs afetados:** KPI 1 (Mention Rate), KPI 2 (SoV cluster Organizacional principalmente), KPI 4 (Schema Coverage), KPI 8 (Delta pós-onda Fase 2).

**Owner mitigação:** Alexandre Caramaschi · **Owner decisão:** Ronan Maia / Bruno Azambuja.

**Mitigação ativa:**
- Issue #4 prioritária com critério de aceite explícito.
- Decisão escalada na seção 9 do relatório semanal (bloqueios e decisões pendentes).
- Material de apoio entregue: SINTESE-EXECUTIVA do benchmarking + dossiê Anhembi (overlap direto).

**Gatilho de escalonamento:** se decisão não sair até 15-05-2026, escalar a Ronan Maia em e-mail direto + ajustar plano da Fase 1 reduzindo escopo de Schema piloto para apenas 1 produto âncora.

---

## R-002 — Concorrente publica llms.txt antes do IPOG

**Descrição:** 100% dos 10 concorrentes mapeados (Ondas 1+2) estão sem `llms.txt` em 2026-05-01. Janela 100% aberta para o IPOG. Risco: Anhembi Morumbi, Saint Paul/EXAME ou Estácio decidirem publicar e fechar a janela.

**Probabilidade:** Média · **Impacto:** Alto · **Status:** Mitigado

**KPIs afetados:** KPI 1 (vantagem RAG-native), KPI 5 (autoridade declarativa).

**Owner:** Brasil GEO.

**Mitigação ativa:**
- Issue #2 prioritária — publicar `llms.txt` em ipog.edu.br na primeira semana da Fase 1.
- Issue #15 — re-fetch quinzenal automatizado (workflow `audit-snapshot.yml` quando ativo) detecta publicação concorrente e alerta.

**Gatilho de escalonamento:** se algum dos 10 concorrentes publicar `llms.txt` antes de 30-05-2026, acelerar publicação IPOG independente de outros gates da Fase 1.

---

## R-003 — Sírio-Libanês ou Anhanguera desbloqueia WAF

**Descrição:** ambos bloqueiam crawlers de IA via WAF (HTTP 403). Vulnerabilidade autoinfligida que reduz presença em provedores RAG-native. Se desbloquearem, vantagem do IPOG diminui.

**Probabilidade:** Baixa · **Impacto:** Médio · **Status:** Mitigado

**KPIs afetados:** KPI 1 em Perplexity e ChatGPT search; KPI 2 em prompts hospitalares e prompts massivos amplos.

**Owner:** Brasil GEO.

**Mitigação ativa:**
- Issue #16 — monitoramento quinzenal automatizado.
- Manter `robots.txt` IPOG aberto a IA crawlers (issue #6).
- Capturar share-of-voice em RAG-native antes da janela fechar.

**Gatilho de escalonamento:** se WAF mudar para HTTP 200, recalibrar matriz cross-LLM (`matriz-presenca-llm.md`) na próxima leitura quinzenal e ajustar narrativa competitiva.

---

## R-004 — Anhembi Morumbi adiciona Person Schema com Lattes

**Descrição:** a Anhembi tem corpo docente declarado (parcerias HSM/BSP) mas não publica `Person` Schema com `sameAs` Lattes/ORCID. Se implementar antes do IPOG, fecha a janela mais durável de diferenciação técnica do programa.

**Probabilidade:** Baixa · **Impacto:** Alto · **Status:** Mitigado

**KPIs afetados:** KPI 4 (Schema Coverage), KPI 3 (Citation Quality — fato corpo docente), KPI 1 em prompts qualificados sobre docente.

**Owner:** Brasil GEO + Bruno Azambuja.

**Mitigação ativa:**
- Issue #3 prioritária — Schema piloto com `Person` para 3 docentes IPOG.
- Auditoria Schema mensal dos 10 concorrentes (issue #10).

**Gatilho de escalonamento:** se Anhembi publicar `Person` Schema, acelerar implementação IPOG cobrindo 5+ docentes na semana seguinte.

---

## R-005 — PUC-Minas reabre Psicologia em EAD

**Descrição:** PUC-Minas Virtual restringe Psicologia em EAD por decreto 12.456/2025 e postura institucional. Se reabrir, o quadrante "premium online em Psicologia" ganha ocupante natural com peso paramétrico forte (THE/QS/RUF top 10).

**Probabilidade:** Baixa · **Impacto:** Alto · **Status:** Aceito (monitorado)

**KPIs afetados:** KPI 2 (SoV em prompts qualificados premium), KPI 1 (Mention Rate em prompts comparativos).

**Owner:** Brasil GEO.

**Mitigação ativa:**
- Monitoramento mensal do catálogo PUC-Minas Virtual.
- Plano de antecipação: estabelecer presença defensável (Schema completo + autoria nominal + autoridade externa) antes de reação.

**Gatilho de escalonamento:** se PUC-Minas anunciar pós em Psicologia EAD, recalibrar a estratégia premium do IPOG no checkpoint mensal seguinte.

---

## R-006 — Mudança silenciosa de modelo pelos provedores LLM

**Descrição:** ChatGPT, Claude, Gemini, Perplexity, Grok ou Copilot pode atualizar a versão do modelo sem comunicação prévia. Comparações cross-period com versões diferentes são proibidas (anti-padrão em `dashboards/METRICAS-CANONICAS.md`).

**Probabilidade:** Alta · **Impacto:** Alto · **Status:** Mitigado

**KPIs afetados:** KPI 1, 2, 3 (toda métrica cross-LLM).

**Owner:** Alexandre Caramaschi.

**Mitigação ativa:**
- Drift detection automatizado no pipeline (`dashboards/RUNBOOK-COLETA-LLM.md`).
- Versão pinada registrada em cada execução.
- Recalibração trimestral do cohort (rotina 4.2 do template trimestral).

**Gatilho de escalonamento:** quando drift detectado, segmentar série temporal antes/depois e marcar leituras com flag de versão. Reportar no relatório semanal seguinte.

---

## R-007 — Concorrentes especialistas em Psicologia fora do mapa atual aceleram GEO

**Descrição:** InEPP, INPG, IBPEX e outros especialistas que ficaram fora das Ondas 1-2 podem acelerar GEO antes do IPOG, fechando janelas em clusters de nicho.

**Probabilidade:** Média · **Impacto:** Médio · **Status:** Mitigado

**KPIs afetados:** KPI 2 cluster Clínica/Neuro/TCC/Avaliação.

**Owner:** Brasil GEO.

**Mitigação ativa:**
- Onda 4 do benchmarking programada para Fase 3 (issue #18).
- Monitoramento via prompts qualificados específicos no kit de prompts.

**Gatilho de escalonamento:** se algum especialista publicar `llms.txt` ou implementar Schema avançado, antecipar Onda 4 do benchmarking.

---

## R-008 — Wikipedia bloqueia edição do verbete IPOG por critério de notabilidade

**Descrição:** expansão do verbete IPOG na Wikipedia depende de fontes secundárias confiáveis citando o IPOG (mídia educacional, dados oficiais MEC, números de alunos publicados). Pode ser bloqueada por revisores Wikipedia se a notabilidade for considerada insuficiente.

**Probabilidade:** Média · **Impacto:** Alto · **Status:** Em escalada

**KPIs afetados:** KPI 5 (autoridade externa — Wikipedia é tipo de fonte canônica), KPI 1 (peso paramétrico no próximo corte de treinamento dos LLMs).

**Owner:** Bruno Azambuja + Brasil GEO.

**Mitigação ativa:**
- Issue #19 — confirmar tamanho atual + plano de fontes secundárias confiáveis disponíveis.
- Trabalhar fontes secundárias antes de tentar editar Wikipedia diretamente.

**Gatilho de escalonamento:** se as fontes secundárias atuais forem insuficientes, escalar a Bruno Azambuja para definir plano de PR com mídia educacional brasileira (Estadão Educação, Folha Equilíbrio, Quero Bolsa, Educa Mais Brasil).

---

## R-009 — UTM dedicado / referrer LLM não capturado em GA4

**Descrição:** KPI 7 (Conversion Lift por canal LLM) depende de identificar tráfego originado em LLM via referrer ou UTM dedicado. Se a configuração GA4 não estiver pronta antes da Fase 1, o KPI fica "N/D" indeterminadamente.

**Probabilidade:** Média · **Impacto:** Alto · **Status:** Em escalada

**KPIs afetados:** KPI 7 (totalmente).

**Owner:** Bruno Azambuja (TI/Marketing IPOG).

**Mitigação ativa:**
- Issue de configuração GA4 antes da Fase 1 (a abrir).
- Audiência "Tráfego originado em referrers de LLM" declarada na seção 5.4 de `docs/framework/01-rotinas-e-missoes-geo.md`.

**Gatilho de escalonamento:** se GA4 não estiver pronto até 25-05-2026, KPI 7 entra como `N/D` na Fase 1 e baseline é deferido para Fase 2.

---

## R-010 — Atraso no lançamento do produto MBA empurra share-of-voice para concorrentes

**Descrição:** se o produto MBA Online de Psicologia não for lançado pelo IPOG no horizonte do pico de captação 2026.2 (15-06 a 31-07), share-of-voice na categoria-naming "MBA Online de Psicologia" fica capturado por concorrentes que reagirem primeiro à demanda emergente.

**Probabilidade:** Média · **Impacto:** Crítico · **Status:** Em escalada

**KPIs afetados:** KPI 1, KPI 2 (especialmente cluster Organizacional), KPI 8 (delta pós-onda Fase 3).

**Owner:** Bruno Azambuja + Ronan Maia.

**Mitigação ativa:**
- R-001 (decisão de produto) é dependência direta deste risco.
- Plano de escalonamento de prioridades caso decisão atrase.

**Gatilho de escalonamento:** se decisão de produto não sair até 15-05-2026, recalibrar Fase 3 reduzindo ambição do pico 2026.2 e empurrando captação principal para 2027.1.

---

## R-011 — Saint Paul/EXAME estabiliza arquitetura web e fecha janela técnica

**Descrição:** Saint Paul tem URLs canônicas em 404 pós-aquisição EXAME (`/curso/pos-graduacao-saint-paul`, `/curso/mba-executivo-saint-paul`). Janela técnica curta (3-6 meses estimados) para o IPOG capturar SERP em prompts MBA executivos.

**Probabilidade:** Alta · **Impacto:** Médio · **Status:** Mitigado

**KPIs afetados:** KPI 2 em prompts amplos de MBA online.

**Owner:** Brasil GEO.

**Mitigação ativa:**
- Issue #14 — recheck mensal das URLs.
- Publicação de conteúdo HBR-grade ranqueando para "MBA executivo online em Psicologia Organizacional" enquanto janela está aberta.

**Gatilho de escalonamento:** se URLs voltarem para 200 antes de 31-08-2026, ajustar plano editorial para focar em prompts qualificados onde Saint Paul é estruturalmente ausente (Psicologia Organizacional vertical).

---

## R-012 — Vazamento de informação confidencial sobre roadmap de produto IPOG

**Descrição:** Decisões estratégicas do IPOG sobre lançamento, precificação, formato e posicionamento do MBA Online de Psicologia são confidenciais até comunicação oficial. Vazamento via repositório, conversa externa ou rede social compromete o programa.

**Probabilidade:** Baixa · **Impacto:** Crítico · **Status:** Mitigado

**KPIs afetados:** todos potencialmente; principalmente KPI 1 e 2 se concorrente reagir antes do go-live.

**Owner:** Alexandre Caramaschi + Bruno Azambuja.

**Mitigação ativa:**
- Repositório privado, acesso restrito a Brasil GEO + IPOG.
- `SECURITY.md` documenta política de confidencialidade.
- `CODE_OF_CONDUCT.md` reforça compromisso B2B.
- Conteúdo público preparado em rascunho, publicado apenas em janela acordada com Bruno.

**Gatilho de escalonamento:** se vazamento for detectado, escalada imediata a Ronan Maia + jurídico IPOG para resposta coordenada.

---

## R-013 — Gap Wikipedia/Reddit permite concorrentes serem citados mais que IPOG

**Descrição:** análise empírica do corpus de treinamento dos LLMs em 2026 confirma que Wikipedia explica 26-48% das citações em ChatGPT e Reddit explica aproximadamente 40% das citações em Perplexity. IPOG tem verbete Wikipedia raso ou ausente e presença mínima em Reddit (r/Psicologia, r/EAD, r/MBA), enquanto Anhembi Morumbi e Hospital Sírio-Libanês têm verbetes densos. A janela de absorção paramétrica dos LLMs é lenta (12-18 meses) — atraso material aqui ecoa por dois ciclos de captação.

**Probabilidade:** Alta · **Impacto:** Alto · **Status:** Em escalada

**KPIs afetados:** KPI 1 (Mention Rate em ChatGPT e Perplexity prioritariamente), KPI 2 (SoV nos três clusters), KPI 5 (Cobertura de fontes externas confiáveis).

**Owner mitigação:** Bruno Azambuja + Alexandre Caramaschi · **Owner decisão:** Ronan Maia (verba PR + Wikipedia).

**Mitigação ativa:**
- Issue #19 e #60 (Wikipedia + Knowledge Graph) com baseline mensurado e plano de expansão.
- Issue #57 (Auditoria de menção em Reddit, Bing AI Performance e Brave) com cadência mensal.
- 6 peças HBR Fase 2 servem como sustentação para verbete Wikipedia (precondição editorial).
- D06 do Board: aprovação de verba inicial R$ 50-100k em 12 meses para PR tier 1 + Wikipedia.

**Gatilho de escalonamento:** prazo crítico 60 dias para baseline confirmado + plano editorial Wikipedia em curso. Sem verba aprovada até 30-05-2026, mitigação parcial usando apenas peças HBR + 1 release.

---

## R-014 — UniCesumar matrícula contínua + 50 cursos por trimestre é fábrica não-replicável

**Descrição:** UniCesumar (Vitru Nasdaq VTRU3) opera modelo de matrícula contínua com aproximadamente 50 novos cursos lato sensu por trimestre. Volume e velocidade que IPOG não consegue replicar em escopo de catálogo. Risco competitivo se IPOG tentar brigar em volume — equivale a perder na assimetria.

**Probabilidade:** Alta · **Impacto:** Alto · **Status:** Aceito (com mitigação por reposicionamento)

**KPIs afetados:** KPI 2 (SoV em queries genéricas tipo "qual o melhor MBA online em Psicologia") onde UniCesumar pode ter recall dominante por volume de catálogo indexado.

**Owner:** Alexandre Caramaschi + Bruno Azambuja.

**Mitigação ativa:**
- Reposicionamento explícito do IPOG como premium regional com modalidade Ao Vivo síncrono — não disputa catálogo massivo.
- Schema canônico marca `Course.courseMode: "online (Ao Vivo síncrono)"` + `EducationalOccupationalProgram.programType: "MBA"`, atributos que UniCesumar não declara.
- Person Schema com Lattes/ORCID consentido em 3 docentes piloto até 30-05 — diferencial não-replicável em sprint curto.
- Conteúdo editorial HBR-grade focado em decisão de carreira e diferenciação metodológica, não em volume de catálogo.

**Gatilho de escalonamento:** se UniCesumar publicar `llms.txt` ou declarar `EducationalOccupationalProgram` Schema antes de 30-06-2026, acelerar Lançamentos 2-3 e aumentar densidade editorial em Cluster 1 (Organizacional).

---

## R-015 — Decreto 12.456 segunda onda pode estender vedação a lato sensu em áreas críticas

**Descrição:** o Decreto 12.456/2025 atual veda EAD em graduação de Psicologia, Medicina, Enfermagem, Odontologia e Direito mas explicitamente preserva lato sensu. Cenário de segunda onda regulatória (12-24 meses): ampliação da vedação para lato sensu em áreas com forte demanda profissional regulada. Probabilidade baixa-média, mas impacto crítico — invalida o portfólio inteiro de MBA Online de Psicologia.

**Probabilidade:** Média · **Impacto:** Crítico · **Status:** Mitigado (monitoramento ativo + plano B presencial)

**KPIs afetados:** todos. Em caso de materialização, programa muda de pista (online → híbrido/presencial em polos).

**Owner monitoramento:** Diretoria Acadêmica IPOG + jurídico IPOG · **Owner contingência:** Ronan Maia.

**Mitigação ativa:**
- Monitoramento mensal de `gov.br/mec`, ABMES, SEMESP e portais especializados (Conjur, Carta Educação) — owner Bruno Azambuja com SLA 7 dias úteis para sinalizar publicação relevante.
- Plano B presencial documentado: oferta híbrida com até 30% presencial em polos próprios (Goiânia + Brasília + 3-5 capitais), aproveitando a rede CNPJ-próprio de 51 cidades como vantagem estrutural.
- Schema declara `EducationalOrganization.address` por unidade já no piloto — sinaliza capacidade de oferta presencial sem refactor estrutural.

**Gatilho de escalonamento:** publicação de Portaria MEC, Parecer CNE/CES ou nova Portaria SERES restringindo lato sensu EAD em Psicologia → acionamento imediato do plano B presencial + comunicação coordenada com aluno corrente.

---

## R-016 — Plataformas de telepsicologia virando edtechs próprias (convergência IBNeuro + LLMs)

**Descrição:** Vittude, Zenklub, Eurekka e outras plataformas de telepsicologia estão verticalizando para educação (formação continuada para psicólogos da rede, capacitação de coordenadores de saúde mental corporativa, formação para pedagogos). Convergência prevista com IBNeuro (vertical Neuropsi) e com LLMs (corpus de psicologia digital). Risco competitivo no Cluster 2 (Clínica/Avaliação/Neuro) e no produto P5 (Saúde Mental Corporativa B2B).

**Probabilidade:** Média · **Impacto:** Alto · **Status:** Em monitoramento (sem mitigação ativa contratada)

**KPIs afetados:** KPI 2 (SoV Cluster Clínica), KPI 7 (Conversion Lift se essas plataformas ganharem mention rate cross-LLM).

**Owner:** Alexandre Caramaschi + Bruno Azambuja.

**Mitigação ativa:**
- Inclusão de Vittude, Zenklub e Eurekka na Onda 4 do benchmarking (issue #18) para mapear pegada técnica, Schema, presença em LLMs e catálogo de produtos educacionais existentes.
- Avaliação de parcerias preventivas com Vittude e Zenklub como canal de captação B2B (RH corporativo + saúde mental corporativa) — proposta a apresentar a Ronan Maia no checkpoint executivo de 30-06-2026.
- Diferenciação editorial: peças HBR cobrem o flanco "supervisão clínica humana + IA aplicada à Psicologia" (issue #59) como diferencial vs plataformas verticais.

**Gatilho de escalonamento:** se Vittude, Zenklub ou Eurekka lançarem produto lato sensu EAD em Psicologia ou aparecerem em 3+ prompts canônicos dos 75 do kit (`prompts/KIT-PROMPTS-V0.md`), acionar avaliação de parceria comercial em até 30 dias.

---

## Riscos retirados ou materializados (arquivo histórico)

Quando um risco é materializado (vira incidente) ou definitivamente retirado (mitigação completa, condição estrutural mudou), o registro é movido para esta seção com data e justificativa.

| ID | Descrição | Resultado | Data |
|---|---|---|---|
| -- | -- | -- | -- |

---

## Cadência de revisão

| Atividade | Cadência | Owner |
|---|---|---|
| Revisão dos 16 riscos ativos | Mensal no checkpoint executivo | Alexandre Caramaschi + Bruno Azambuja |
| Atualização de probabilidade/impacto | Mensal | Alexandre Caramaschi |
| Adição de risco novo | Ad hoc (na semana em que emerge) | Alexandre Caramaschi |
| Recalibração de gatilhos | Trimestral | Alexandre Caramaschi + Ronan Maia |
| Arquivamento de risco mitigado/materializado | Quando aplicável | Alexandre Caramaschi |

Toda alteração em probabilidade, impacto, status ou owner é registrada em `docs/atas/` da reunião correspondente com data e justificativa.
