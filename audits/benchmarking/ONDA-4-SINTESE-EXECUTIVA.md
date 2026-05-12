---
name: "Onda 4 — Síntese Executiva"
slug: onda-4-sintese-executiva
arquetipo: "Síntese cruzada de especialistas verticais Psi + categoria nova Plataformas de Telepsicologia virando edtechs (R-016)"
cluster_principal_afetado: "Cluster 1 (Organizacional) + Cluster 2 (Avaliação/Clínica) + Cluster 5 (Saúde Mental B2B)"
coletado_em: 2026-05-10
coletor: "Brasil GEO — Onda 4 do benchmarking GEO IPOG"
referencias_canonicas:
  - "audits/benchmarking/concorrente-inepp.md"
  - "audits/benchmarking/concorrente-inpg.md"
  - "audits/benchmarking/concorrente-ibpex.md"
  - "audits/benchmarking/concorrente-vittude.md"
  - "audits/benchmarking/concorrente-zenklub.md"
  - "audits/benchmarking/concorrente-eurekka.md"
  - "audits/benchmarking/concorrente-ibneuro.md"
  - "audits/benchmarking/ONDA-3-SINTESE-EXECUTIVA.md"
  - "audits/benchmarking/SINTESE-EXECUTIVA.md"
  - "audits/benchmarking/ARQUETIPOS-CONCORRENCIA-EDUCACAO.md"
  - "docs/05-risk-register.md"
---

# Síntese Executiva — Onda 4 do Benchmarking GEO IPOG

> **Status:** vigente desde 2026-05-10 (reescopo 2026-05-12)
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Audiência primária:** Ronan Maia (CEO IPOG) — checkpoint executivo mensal.
> **Última coleta de dados:** 2026-05-10
> **Cobertura:** 6 concorrentes da Onda 4 — 3 especialistas verticais Psi (InEPP, INPG, IBPEX) + 3 plataformas de telepsicologia (Vittude, Zenklub, Eurekka). **Cruzamento com IBNeuro (sentinela ativa Cluster 2 Onda 2 — único do universo Onda 1+2+3 com `llms.txt` publicado em 09-05-2026).**

## Escopo canônico

**Esta síntese cobre o guarda-chuva amplo "Pós-Graduações em Psicologia"** em 5 modalidades canônicas (Especialização Lato Sensu, MBA correlato, Mestrado Profissional, Especialização Clínica certificada por Conselhos, formações híbridas). A Onda 4 revela vácuos adicionais cross-modalidade nos especialistas verticais e nas plataformas de telepsicologia (categoria R-016).

---

## 1. Resumo executivo em 5 frases

1. **A Onda 4 confirma que a categoria "InEPP" mencionada na demanda original NÃO existe como entidade autônoma canônica** — o nicho psicanalítico brasileiro é estruturalmente fragmentado em 10+ pequenos institutos (NPP, EPP, IEPP, iPePP, ESPE, EPB, IPP, IPEP, Ibrapsi, IUNIP) sem dominância nacional; essa fragmentação é, em si, a tese estratégica do IPOG capturar o cluster com produto-âncora consolidado.
2. **INPG = INPG Business School** (e não "Instituto Nacional de Psicologia Geral") — escola de negócios multipolar SP/SC com **MBA em RH com ementa que sobrepõe 60% do MBA em Psicologia Organizacional IPOG**, mas **sem usar o naming "Psicologia Organizacional"** — vácuo semântico mantido.
3. **IBPEX = sub-marca do Grupo Uninter** (marca-fundadora de 1996, hoje regional Curitiba) — competidor é a Uninter consolidada (já Onda 1); IBPEX é variação regional sem chancela MEC autônoma e com domínio em HTTP 503 em 2026-05-10.
4. **Categoria nova R-016 (telepsicologia) tem 3 níveis distintos de maturidade educacional:** Vittude (Summit corporativo + 0 lato sensu) < Zenklub (Academy com Selo proprietário + 0 lato sensu) < Eurekka (Formação estruturada 100h em ACT/FAP/DBT + 0 lato sensu) — **nenhum dos 3 tem parceria com IES MEC**, mas todos publicaram capacitação livre para psicólogos; **gatilho R-016 acionado se qualquer um anunciar lato sensu antes de 30-06-2026.**
5. **Total Onda 1+2+3+4 = 16 concorrentes mapeados** (objetivo 21 — restam 5 para Onda 5). Resultado canônico mantido: **100% dos 16 operam quase exclusivamente em Especialização Lato Sensu, sem cobertura cross-modalidade (MBA naming + Mestrado Profissional + Especialização Clínica certificada por Conselhos) consolidada; 100% sem `EducationalOccupationalProgram` Schema; 15 de 16 sem `llms.txt`** (apenas IBNeuro publicou 09-05-2026). **Janela competitiva IPOG segue aberta no guarda-chuva "Pós-Graduação em Psicologia" cobrindo as 5 modalidades simultaneamente.**

---

## 2. Tabela cruzada Onda 4 + sentinela IBNeuro (10 colunas)

| Concorrente | Arquétipo | Naming MBA Psi | llms.txt | robots.txt bloqueia IA | Wikipedia | Sup. clínica/prog. educacional | Schema EduOccupational | Ticket/Investimento | Pegada física |
|---|---|---|---|---|---|---|---|---|---|
| **InEPP** (categoria fragmentada) | Arq. 3 Especialista vertical Psicanálise | ausente — categoria recusa | ausente | n/d (DNS não resolve) | ausente | Formação livre não-MEC + análise pessoal | ausente | R$ 400-2.000/mês ecossistema | mono-cidade por instituto |
| **INPG Business School** | Arq. 3 Especialista vertical Negócios + EAD multipolar | ausente naming Psicologia (usa MBA RH) | HTTP 404 (não publicado) | HTTP 403 WAF | ausente | MBA RH + Pós Gestão Estratégica | ausente | R$ 845/mês (24x) MBA RH | 7 unidades SP/SC |
| **IBPEX** (Grupo Uninter) | Arq. 1 EAD Massivo Premium-Médio (Subclasse 1A) | ausente — segue padrão Uninter | HTTP 503 (não publicado) | HTTP 503 (servidor) | ausente (presente no verbete Uninter) | Pós Psicanálise EAD via Uninter | ausente | R$ 135-350/mês | Curitiba PR + polos Uninter |
| **Vittude** | R-016 Categoria nova Telepsicologia B2B+B2C | ausente | HTTP 404 | **bloqueio explícito** ClaudeBot/GPTBot/CCBot + sinal `ai-train=no` | ausente | Vittude Summit (evento) + 0 lato sensu | n/d (não EduOrg) | R$ 50/sessão B2C; B2B 200 empresas | online + SP sede |
| **Zenklub** | R-016 Categoria nova Telepsicologia B2B+B2C com Academy ativa | ausente | HTTP 502 | **aberto** (sem bloqueio IA) | ausente | Zenklub Academy + Selo Zenklub + 0 lato sensu | provavelmente ausente | Plano Premium acesso grátis; cursos avulsos | online + SP sede |
| **Eurekka** | R-016 Categoria nova Telepsicologia + Franquia + Formação | ausente | HTTP 403 | **bloqueio explícito** ClaudeBot/GPTBot/CCBot + sinal `ai-train=no` | ausente | Formação Eurekka 100h ACT/FAP/DBT + 0 lato sensu | ausente | Formação preço não-público + Franquia R$ 90-125 mil | 30+ cidades via franqueado + sede Porto Alegre RS |
| **IBNeuro (sentinela Onda 2)** | Arq. 3 Especialista vertical Neuropsi | recusa explícita | **PUBLICADO 09-05-2026** | aberto Shopify | ausente | Pós lato sensu via parceria Faculdade Santa Fé + 240h supervisão real | ausente (Shopify Product) | R$ 1.255-1.465/mês (25x) | mono-polo Brasília + telepresencial |

**Achado central da tabela cruzada Onda 4:** dos 7 concorrentes auditados (6 Onda 4 + sentinela IBNeuro), **0 têm Schema `EducationalOccupationalProgram` + 0 têm `Person` Schema com Lattes + apenas 1 tem `llms.txt`** — **mesmo padrão estrutural** do universo Onda 1+2+3. **Vittude + Eurekka bloqueiam explicitamente IA via robots.txt + sinal `ai-train=no`** — janela RAG-native ampliada para o IPOG.

---

## 3. Três padrões de comportamento dos especialistas verticais Psi (InEPP, INPG, IBPEX)

### Padrão 1 — Fragmentação narrativa por sub-disciplina ou por adjacência institucional

Os 3 especialistas verticais Psi da Onda 4 **não compõem categoria homogênea** — cada um pertence a uma lógica distinta:
- **InEPP**: nicho psicanalítico fragmentado em 10+ pequenos institutos sem dominância. Lógica de tradição clínica continuada.
- **INPG**: escola de negócios que **toca o Cluster 1 IPOG indiretamente** via MBA RH. Lógica de produto executivo com bordadura comportamental.
- **IBPEX**: marca histórica do Grupo Uninter, hoje sub-marca regional. Lógica de EAD massivo via mantenedora-mãe.

**Implicação para a estratégia IPOG**: a Onda 4 demonstra que **"especialistas verticais Psi" como categoria homogênea NÃO existe** no mercado brasileiro. O IPOG não disputa com **um** competidor especialista vertical — disputa com **três competidores diferentes em três jogos competitivos diferentes**.

### Padrão 2 — Vulnerabilidade técnica autoinfligida estende-se aos especialistas verticais

Padrão observado em todas as 4 ondas anteriores se repete:
- **INPG** retorna **HTTP 403** ao WebFetch (provável WAF).
- **IBPEX** retorna **HTTP 503** em `ibpex.com.br/` e em todos os endpoints auditados.
- **InEPP** (`inepp.com.br`) tem **DNS que não resolve**.

**3 de 3 especialistas verticais da Onda 4 com vulnerabilidade técnica em descoberta.** Isso reforça o padrão Onda 1+2+3+4 (8 de 16 concorrentes com bloqueio/indisponibilidade ao crawler de IA — Anhanguera WAF, Sírio-Libanês WAF, Cruzeiro do Sul Virtual WAF, Famart 403, INPG 403, IBPEX 503, InEPP DNS, Vittude robots-block, Eurekka robots-block).

### Padrão 3 — Recusa estrutural ao naming MBA em Psicologia (subset do vácuo cross-modalidade)

- **InEPP/ecossistema psicanalítico**: cultura tradicional recusa "MBA" como termo de mercado executivo.
- **INPG Business School**: usa MBA, mas **só em produtos de Negócios** ("MBA em RH"), nunca em "MBA em Psicologia Organizacional".
- **IBPEX/Uninter**: usa "Especialização" e "Pós-Graduação Lato Sensu", **não "MBA"** em Psicologia.

**3 de 3 com vácuo no naming canônico MBA em Psicologia.** Combinado com 13 dos 13 concorrentes Onda 1+2+3 com mesmo vácuo, **resultado consolidado: 16 de 16 concorrentes sem MBA explícito em Psicologia em 2026-05-10**. Esse vácuo é apenas um subset do **vácuo cross-modalidade** amplo: 16 de 16 também sem Mestrado Profissional online em Psicologia consolidado, sem Especialização Clínica certificada por Conselhos com Schema declarado e sem formações híbridas com supervisão real bem-nomeadas. O guarda-chuva "Pós-Graduação em Psicologia" 5 modalidades está aberto para captura cross-LLM.

---

## 4. Três padrões das plataformas de telepsicologia (Vittude, Zenklub, Eurekka — R-016)

### Padrão 1 — Verticalização educacional iniciada com diferentes graus de maturidade, sem chancela MEC

| Player | Estágio de verticalização educacional | Naming canônico | MEC | Próximo passo provável |
|---|---|---|---|---|
| **Vittude** | Evento + comunicação corporativa | Vittude Summit, Corporate Mental Health Week | Não | Anúncio de produto educacional formal em 12-18 meses |
| **Zenklub** | Plataforma de cursos + comunidade + selo proprietário | Zenklub Academy, Selo de Formação Zenklub | Não | Parceria com IES MEC em 6-12 meses (mais próxima) |
| **Eurekka** | Programa formal estruturado em terapias contextuais | Formação Eurekka 100h ACT/FAP/DBT | Não | Parceria com IES MEC em 18-24 meses |

**Conclusão**: os 3 players **estão em ondas diferentes** da mesma transição. **Zenklub é o player mais avançado em risco R-016** — tem LMS rodando, comunidade ativa, calendário de palestras e parcerias editoriais com Conexa e Exame. **Eurekka é o mais sofisticado curricularmente** — 100h em ACT/FAP/DBT com supervisão clínica em 3 turnos. **Vittude está mais próxima do flanco corporativo regulatório** — Summit 2026 com tema NR-1 e Lei 14.831/24.

### Padrão 2 — Polarização técnica em robots.txt (bloqueio explícito vs aberto a IA)

- **Vittude**: bloqueio explícito ClaudeBot/GPTBot/Google-Extended/CCBot/Amazonbot/Bytespider + sinal `ai-train=no` declarado.
- **Eurekka**: **mesmo padrão de Vittude** — bloqueio nominal dos 6 bots + `ai-train=no`.
- **Zenklub**: **única plataforma com `robots.txt` totalmente aberto a IA**.

**2 de 3 players da categoria nova bloqueiam explicitamente IA via robots.txt** — política deliberada (não acidental), provavelmente fricção comercial com licenciamento de conteúdo a provedores de IA. **Janela RAG-native fechada para o IPOG vs Zenklub, aberta vs Vittude+Eurekka**.

### Padrão 3 — Diferenciação estrutural pela ancoragem geográfica via franquia (Eurekka) vs sem polos físicos (Vittude, Zenklub)

- **Eurekka**: **30+ cidades** com 60+ franqueados (CNPJ-terceirizado tipo Arquétipo 4 modificado).
- **Vittude**: **online + sede SP**, sem polos físicos próprios.
- **Zenklub**: **online + sede SP**, sem polos físicos próprios.

**Eurekka é o único dos 3 com pegada geográfica distribuída.** No entanto, o modelo é franquia (CNPJ-terceirizado), não filial-própria. **Alavanca 4 do framework regional IPOG** (CNPJ-próprio em 51 cidades) **continua intacta** mesmo em comparação com o player mais distribuído da categoria nova.

---

## 5. Atualização canônica do R-016 do risk register (probabilidade × impacto recalibrados)

### Estado anterior do R-016 (`docs/05-risk-register.md`, vigente 2026-05-01)

- **Descrição:** "Vittude, Zenklub, Eurekka e outras plataformas de telepsicologia estão verticalizando para educação".
- **Probabilidade:** Média.
- **Impacto:** Alto.
- **Status:** Em monitoramento (sem mitigação ativa contratada).
- **Gatilho:** se Vittude/Zenklub/Eurekka lançarem produto lato sensu OU aparecerem em 3+ prompts canônicos.

### Recalibração após coleta primária 2026-05-10

- **Probabilidade:** **Média-Alta** (recalibrada para cima). Justificativa: **3 de 3 players já têm braço educacional ativo** — Vittude Summit + Corporate Mental Health Week, Zenklub Academy com Thinkific + Selo de Formação, Eurekka Formação 100h estruturada. **A verticalização já começou** — falta apenas chancela MEC. Tempo médio para lançar parceria com IES é 6-24 meses (variando por player).
- **Impacto:** **Alto** (mantido). Aceleração de qualquer um dos 3 captura SoV no Cluster 5 (Saúde Mental B2B) e bordadura Cluster 2.
- **Status:** **Em monitoramento ativo com mitigação dual** (recalibrado de "sem mitigação ativa"). Mitigações ativadas:
  1. **Mitigação preventiva (proativa):** preparar pitch de **parceria comercial preventiva IPOG-Vittude** para Ronan Maia até 30-06-2026 (alinhado a recomendação canônica R-016).
  2. **Mitigação defensiva (reativa):** monitoramento mensal de `academy.zenklub.com.br` e `formacao.eurekka.me` para detectar parceria com IES MEC.
  3. **Mitigação ofensiva (de captura):** IPOG lançar **MBA Online em Saúde Mental Corporativa e Compliance NR-1** com naming MBA + chancela MEC antes de qualquer um dos 3 reagir.
- **Gatilho de escalonamento refinado:**
  - **Gatilho 1 (curto prazo, alta probabilidade):** se **Zenklub** anunciar parceria com IES MEC ou produto "Pós-Graduação Zenklub" antes de 30-06-2026, acionar resposta acelerada IPOG.
  - **Gatilho 2 (médio prazo, média probabilidade):** se **Vittude** anunciar produto educacional formal em Vittude Summit 2026 (25-26 março de 2026 — já ocorreu; verificar anúncios) ou pós-Summit, acionar.
  - **Gatilho 3 (longo prazo, baixa probabilidade):** se **Eurekka** anunciar parceria com IES MEC para Formação Eurekka virar lato sensu, acionar.

### Atualizações canônicas a aplicar no `docs/05-risk-register.md`

Conforme estes achados da Onda 4, **R-016 precisa ser editado em `docs/05-risk-register.md`** com novo texto de Probabilidade (Média → Média-Alta), Status (Em monitoramento → Em monitoramento ativo com mitigação dual), e adição dos 3 gatilhos refinados acima. Issue a abrir: "Editar R-016 com calibração Onda 4 2026-05-10".

---

## 6. Posicionamento dos 4 arquétipos canônicos vs as 6 novas marcas Onda 4

### Arquétipo 1 — EAD Massivo (com 3 subclasses)

- **Subclasse 1A EAD Massivo Premium-Médio:** **IBPEX** entra como variação regional do Grupo Uninter (já presente). Não amplia o cluster — é nó na mesma rede.
- **Subclasses 1B (cauda longa low-end) e 1C (EdTech com chancela adquirida):** **nenhuma adição da Onda 4**.

### Arquétipo 2 — Premium Concentrado SP-RJ + 2-B (Premium Acadêmica Online via Parceria EdTech)

- **Onda 4 não adiciona players nestes arquétipos.**

### Arquétipo 3 — Especialistas Verticais (refinamento)

- **InEPP/ecossistema psicanalítico** entra como **subclasse 3-A Especialistas Verticais Fragmentados**. Característica: nicho com 10+ pequenos institutos sem dominância, formação livre, não-MEC predominante.
- **INPG Business School** entra como **subclasse 3-B Especialista Vertical em Negócios com Pegada Multipolar Regional**. Característica: 7 unidades SP/SC, escola de negócios premium-médio com bordadura para Cluster 1 IPOG.
- **IBNeuro (Onda 2, sentinela)**: continua arquétipo principal "Especialista Vertical Premium Telepresencial Mono-Polo".
- **CETCC (Onda 2)**: continua "Especialista Vertical Premium Multi-Cidade SP".

### Arquétipo 4 — Multipolar via Polo Parceiro

- **Onda 4 não adiciona players neste arquétipo.**

### Arquétipo 5 (NOVO) — Plataforma de Telepsicologia com Braço Educacional sem Chancela MEC

**Categoria nova canônica da Onda 4.** 3 subclasses identificadas:

- **Subclasse 5-A Plataforma B2B+B2C com Educação Corporativa via Evento:** **Vittude**. Característica: Vittude Summit + Corporate Mental Health Week como canal educacional, sem catálogo de cursos próprio.
- **Subclasse 5-B Plataforma B2B+B2C com Plataforma de Cursos via LMS Terceirizado:** **Zenklub** (Zenklub Academy via Thinkific). Característica: catálogo de cursos próprio + Selo de Formação proprietário, sem MEC.
- **Subclasse 5-C Plataforma com Franquia + Braço Educacional Estruturado em Terapia Contextual:** **Eurekka**. Característica: Formação Eurekka 100h estruturada em ACT/FAP/DBT + 60+ franqueados + Academia Eurekka B2C, sem MEC.

**Implicação cross-arquétipo**: o Arquétipo 5 **disputa primariamente o Cluster 5 IPOG (Saúde Mental B2B)** com bordaduras em Cluster 1 (Educação Emocional Corporativa) e Cluster 2 (Avaliação Aplicada em Telepsicologia). **Não disputa Cluster 1 puro nem Cluster 3 (Neuropsicologia) nem Cluster 4 (Psicopedagogia)** — vácuos competitivos mantidos.

### Tabela consolidada de quadrantes — IPOG vs novos arquétipos

| Largura geográfica → | Concentrada | Multicidade SE/Sul | Nacional CNPJ-próprio | Nacional via franquia/polo | Internacional |
|---|---|---|---|---|---|
| **Cross-vertical** | | | | | |
| Mono-área Psicologia | InEPP/ecossistema, IBNeuro, CETCC | — | — | — | — |
| 2-3 áreas | IPP, ESPE | — | — | — | — |
| 5+ áreas (multidisciplinar) | — | INPG Business School | **IPOG (51 cidades)** | FGV polo + Cruzeiro do Sul + Faveni + Eurekka (telepsicologia franchising) | — |
| Telepsicologia + Educação | — | — | — | Vittude, Zenklub | — |

**O quadrante "5+ áreas × Nacional via filial CNPJ-própria" segue tendo apenas o IPOG.** Eurekka aproxima-se com 30+ cidades via franquia, mas opera mono-área (Psicologia) e CNPJ-terceirizado.

---

## 7. Atualização do total cumulativo (16 de 21 concorrentes mapeados)

### Cumulativo Onda 1 + 2 + 3 + 4 = 16 concorrentes

**Onda 1 (5 concorrentes EAD massivo):** Estácio, Anhanguera, UNINTER, UniCesumar, PUC-Minas Virtual.

**Onda 2 (5 concorrentes especialistas verticais e premium):** CETCC, IBNeuro, Sírio-Libanês IEP/FSL, Anhembi Morumbi/UAM, Saint Paul/EXAME.

**Onda 3 (5 concorrentes adjacentes):** PUCRS Online, Cruzeiro do Sul Virtual, Faveni, Famart, Descomplica Pós.

**Onda 4 (6 concorrentes — 3 especialistas verticais Psi + 3 plataformas telepsicologia):** InEPP (categoria fragmentada), INPG Business School, IBPEX (Grupo Uninter), Vittude, Zenklub, Eurekka. **Total Onda 4 = 6**, ultrapassando o piso de 5 para acomodar a categoria nova R-016.

**Total cumulativo: 16 concorrentes mapeados** (objetivo 21 — restam 5 para Onda 5 ou Onda 5+6 combinadas).

### Sugestões para Onda 5 (5 concorrentes restantes)

Sugerido com base em arquétipos sub-representados e demandas pendentes do framework IPOG:

1. **PUC-RS** (verbete Wikipedia denso, premium acadêmica online — variante PUC-Minas Virtual já estudada).
2. **FGV polo parceiro** (Arquétipo 4 Multipolar — único exemplo do arquétipo já no universo IPOG, mapear em profundidade).
3. **Mackenzie Online** (premium acadêmica online não mapeada).
4. **Insper Online** (premium SP-RJ online).
5. **CGD/Casa do Saber + FESPSP** (parcerias EdTech com IES MEC em Psicanálise — exemplo concreto de Arquétipo 2-B aplicado a Psicologia).

---

## 8. Ações recomendadas para a Brasil GEO (3-5 ações com prazo)

### Ação 1 — [Esforço médio, impacto alto, prazo curto 30 dias]: Pitch de parceria preventiva IPOG-Vittude para Ronan Maia

**O quê:** preparar documento de pitch comercial detalhado para parceria comercial IPOG-Vittude conforme R-016 mitigação canônica. Vittude é o player com **melhor reputação RA (9,4)** + **Summit consolidado em 7 edições** + **cobertura tier-1 Bloomberg/Exame** + **base 200 empresas + 3,5 milhões de vidas**. IPOG entra com **chancela MEC + naming MBA + autoridade acadêmica**.

**Por quê:** R-016 é risco de impacto Alto e probabilidade Média-Alta recalibrada. Parceria preventiva neutraliza concorrência frontal e captura **canal B2B saúde mental corporativa** com escala difícil de replicar organicamente.

**Prazo de entrega:** **30-06-2026** para apresentação a Ronan Maia em checkpoint executivo.

**Owner:** Alexandre Caramaschi (Brasil GEO) + Bruno Azambuja (IPOG comercial).

### Ação 2 — [Esforço baixo, impacto alto, prazo curtíssimo 14 dias]: Editar R-016 no risk register com calibração Onda 4

**O quê:** atualizar `docs/05-risk-register.md` R-016 com novo texto: Probabilidade **Média → Média-Alta**, Status **Em monitoramento → Em monitoramento ativo com mitigação dual**, adição dos 3 gatilhos refinados (Zenklub MEC < 30-06-2026, Vittude Summit anúncio, Eurekka lato sensu). Adicionar referência cruzada com `audits/benchmarking/ONDA-4-SINTESE-EXECUTIVA.md` seção 5.

**Prazo:** **24-05-2026** (14 dias).

**Owner:** Alexandre Caramaschi.

### Ação 3 — [Esforço médio, impacto alto, prazo curto 45 dias]: Lançar peça HBR-grade "Compliance NR-1 e Lei 14.831/24 muda a formação em Saúde Mental Corporativa"

**O quê:** peça editorial profunda assinada por Alexandre Caramaschi capturando 4 elementos simultâneos:
1. **SEO** para queries "NR-1 saúde mental", "Lei 14.831/24 RH", "compliance saúde mental corporativa".
2. **Autoridade** posicionando o IPOG como referência regulatória.
3. **Diferenciação** vs Vittude Summit (que cobre o mesmo tema sem chancela acadêmica).
4. **Naming canônico** para lançar **MBA Online em Saúde Mental Corporativa e Compliance NR-1** com produto-âncora bem-nomeado.

**Prazo:** **25-06-2026** (45 dias).

**Owner:** Brasil GEO (Alexandre Caramaschi) + revisão Bruno Azambuja.

### Ação 4 — [Esforço baixo, impacto médio, prazo curtíssimo 30 dias]: Publicar `llms.txt` em `ipog.edu.br` declarando hub e prioridades

**O quê:** publicação canônica de `llms.txt` em `ipog.edu.br/llms.txt` conforme `audits/LLMS-TXT-TEMPLATE.md`. **Universo Onda 1+2+3+4 = 16 concorrentes mapeados, apenas IBNeuro publicou** — janela 94% aberta para o IPOG entrar como 2º do nicho. Vittude e Eurekka bloqueiam IA explicitamente; IPOG aberto + `llms.txt` declarado captura ainda mais a janela RAG-native.

**Prazo:** **10-06-2026** (30 dias).

**Owner:** Bruno Azambuja (TI/Marketing IPOG) + Brasil GEO.

### Ação 5 — [Esforço alto, impacto alto, prazo médio 90 dias]: Schema canônico completo nas 5 páginas de produto IPOG prioritárias

**O quê:** implementar Schema canônico (`EducationalOrganization` + `Course` + `EducationalOccupationalProgram.programType: "MBA"` + `Person` Schema com Lattes/ORCID para 3 docentes piloto + `FAQPage`) nas 5 páginas de produto IPOG do Cluster 1 + Cluster 5. **100% dos 16 concorrentes sem `EducationalOccupationalProgram` e sem `Person` com Lattes** — janela mais durável do programa.

**Prazo:** **08-08-2026** (90 dias).

**Owner:** Bruno Azambuja (TI IPOG) + Brasil GEO (Alexandre Caramaschi para Schema patterns canônicos).

---

## 9. Riscos críticos e próximas ondas

### Riscos críticos identificados na Onda 4

- **R-016 recalibrado para Média-Alta probabilidade**: Zenklub é o mais próximo do gatilho de escalonamento (Academy operacional + Thinkific LMS rodando + Selo proprietário + cobertura tier-1). Monitoramento mensal dedicado a Zenklub Academy é prioritário.
- **Vittude bloqueia IA explicitamente em robots.txt + sinal `ai-train=no`**: paradoxo competitivo — vantagem RAG-native para IPOG, mas Vittude pode argumentar **respeito a direitos autorais e privacidade de psicólogos** como diferencial reputacional. Bruno Azambuja a avaliar se IPOG mantém `robots.txt` aberto ou se publicar `llms.txt` com permissão explícita captura ambos os benefícios (RAG-native + respeito declarado a Diretiva UE 2019/790).
- **Fragmentação do nicho psicanalítico (InEPP) é vácuo, não risco**: oportunidade para IPOG ofertar produto consolidado, mas **não ativar disputa direta** com institutos psicanalíticos tradicionais cuja cultura intelectual recusa o naming MBA.

### Próximas ondas recomendadas

- **Onda 5 (5 concorrentes restantes):** PUC-RS, FGV polo parceiro, Mackenzie Online, Insper Online, CGD/FESPSP+Casa do Saber. Esforço estimado: 6-8h de pesquisa primária + 4-6h de redação. Janela: pós-checkpoint executivo de 30-05-2026.
- **Onda 4-recheck (sub-ondas):**
  - **InEPP-recheck (Onda 4a):** auditoria dedicada das 5 entidades psicanalíticas concretas (IEPP, EPP, ESPE, IPEP, EPB) **somente se Bruno Azambuja confirmar que IPOG entrará no nicho psicanalítico**.
  - **Zenklub Academy-recheck (Onda 4b):** auditoria mensal técnica de `academy.zenklub.com.br` (atualmente 503) e catálogo completo de cursos.
  - **Vittude Summit pós-edição-2026 (Onda 4c):** captura de anúncios e palestrantes pós-Summit (25-26 março 2026).
- **Atualização `SINTESE-EXECUTIVA.md` master:** integrar Onda 4 no documento agregado (atualmente Onda 1 apenas) em próximo checkpoint executivo com Ronan Maia.
- **Atualização `matriz-presenca-llm.md` e `matriz-tecnica-schema-seo.md`:** adicionar 6 colunas Onda 4 antes do baseline cross-LLM canônico.

---

## 10. Documentos relacionados

- `audits/benchmarking/concorrente-inepp.md` — dossiê InEPP (categoria fragmentada).
- `audits/benchmarking/concorrente-inpg.md` — dossiê INPG Business School.
- `audits/benchmarking/concorrente-ibpex.md` — dossiê IBPEX (Grupo Uninter).
- `audits/benchmarking/concorrente-vittude.md` — dossiê Vittude (R-016).
- `audits/benchmarking/concorrente-zenklub.md` — dossiê Zenklub (R-016).
- `audits/benchmarking/concorrente-eurekka.md` — dossiê Eurekka (R-016).
- `audits/benchmarking/concorrente-ibneuro.md` — sentinela ativa Cluster 2 Onda 2.
- `audits/benchmarking/UPDATE-2026-05-10-llms-txt-ibneuro.md` — publicação `llms.txt` IBNeuro 09-05-2026.
- `audits/benchmarking/ONDA-3-SINTESE-EXECUTIVA.md` — síntese Onda 3.
- `audits/benchmarking/SINTESE-EXECUTIVA.md` — síntese executiva master (integração Onda 4 pendente).
- `audits/benchmarking/ARQUETIPOS-CONCORRENCIA-EDUCACAO.md` — atualização com Arquétipo 5 + subclasses 3-A e 3-B pendente.
- `audits/benchmarking/matriz-tecnica-schema-seo.md` — extensão para os 6 da Onda 4 pendente.
- `audits/benchmarking/matriz-presenca-llm.md` — extensão para os 6 da Onda 4 pendente.
- `audits/benchmarking/pontos-fortes-a-superar.md` — integração Onda 4 pendente.
- `docs/05-risk-register.md` — R-016 com edição canônica pendente (Probabilidade Média-Alta + 3 gatilhos refinados).
- `audits/LLMS-TXT-TEMPLATE.md` — template para publicação `ipog.edu.br/llms.txt`.
- `audits/SCHEMA-PATTERNS.md` — patterns canônicos para implementação Schema IPOG.

---

> **Última coleta de dados:** 2026-05-10
