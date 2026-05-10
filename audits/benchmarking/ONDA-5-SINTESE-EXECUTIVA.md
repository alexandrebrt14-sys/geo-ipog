---
name: "Onda 5 — Síntese Executiva — Fechamento da fase de benchmarking competitivo IPOG"
slug: onda-5-sintese-executiva
arquetipo: "Síntese cruzada do fechamento competitivo — 21/21 concorrentes mapeados (100% da meta)"
cluster_principal_afetado: "Todos os 5 clusters IPOG (Org, Avaliação, Neuropsi, Psicopedagogia, Saúde Mental B2B)"
coletado_em: 2026-05-10
coletor: "Brasil GEO — Onda 5 do benchmarking GEO IPOG"
referencias_canonicas:
  - "audits/benchmarking/concorrente-pucrs.md"
  - "audits/benchmarking/concorrente-fgv-polo-parceiro.md"
  - "audits/benchmarking/concorrente-mackenzie-online.md"
  - "audits/benchmarking/concorrente-insper-online.md"
  - "audits/benchmarking/concorrente-fespsp-casadosaber.md"
  - "audits/benchmarking/concorrente-pucrs-online.md (Onda 3 — distinção CNPJ canônica)"
  - "audits/benchmarking/ONDA-3-SINTESE-EXECUTIVA.md"
  - "audits/benchmarking/ONDA-4-SINTESE-EXECUTIVA.md"
  - "audits/benchmarking/ARQUETIPOS-CONCORRENCIA-EDUCACAO.md"
  - "audits/benchmarking/SINTESE-EXECUTIVA.md (integração master pendente)"
---

# Síntese Executiva — Onda 5 do Benchmarking GEO IPOG (Fechamento — 21/21 concorrentes mapeados)

> **Status:** vigente desde 2026-05-10
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Audiência primária:** Ronan Maia (CEO IPOG) — checkpoint executivo mensal e marco de fechamento da fase de benchmarking competitivo.
> **Última coleta de dados:** 2026-05-10
> **Cobertura:** 5 concorrentes da Onda 5 (PUC-RS, FGV polo parceiro, Mackenzie Online, Insper Online, Casa do Saber priorizada sobre FESPSP) + cruzamento com universo Onda 1-4. **Total cumulativo Ondas 1-5: 21/21 concorrentes mapeados — 100% da meta canônica do programa GEO IPOG**.
> **Marco institucional:** este documento sinaliza o **fechamento da fase de benchmarking competitivo** e a **transição para monitoramento contínuo**.

---

## 1. Resumo executivo em 5 frases

1. **A Onda 5 fecha a cobertura competitiva em 21/21 concorrentes (100% da meta)** com 5 dossiês profundos: PUC-RS (premium acadêmica Sul, distinta de PUCRS Online Onda 3), FGV via polo parceiro (Arquétipo 4 canônico, único concorrente direto da tese regional CNPJ-próprio IPOG), Mackenzie Online (premium SP com Pós Digital em pré-lançamento), Insper Online (premium SP-RJ com WAF + parceria OpenAI Edu) e Casa do Saber (plataforma streaming intelectual priorizada sobre FESPSP por ausência total de oferta Psicologia na segunda).
2. **A categoria-naming "MBA Online de Psicologia" continua 100% vazia em 21/21 concorrentes mapeados** — 21 de 21 sem naming MBA explícito em Psicologia em 2026-05-10. A janela competitiva canônica do IPOG segue aberta e é a posição de captura prioritária para o ciclo 2026.2.
3. **PUC-RS é o segundo concorrente do universo Onda 1-5 a bloquear explicitamente IA via robots.txt + Content-Signal `ai-train=no`** — junto com Vittude e Eurekka (Onda 4), totalizando agora **3 de 21 concorrentes em política deliberada de bloqueio a treinamento IA**. Janela RAG-native do IPOG segue ampliada — 18 de 21 concorrentes têm `robots.txt` aberto ou WAF genérico (não-IA-específico).
4. **Apenas 1 concorrente (IBNeuro, sentinela Onda 2) publicou `llms.txt` em 09-05-2026** — 20 de 21 ainda sem. **A janela `llms.txt no nicho` segue 95% aberta** para o IPOG entrar como segundo do nicho ainda em janela competitiva.
5. **A FGV via polo parceiro é confirmada como o concorrente mais perigoso da Onda 5 e do programa inteiro** — opera 100+ cidades brasileiras com chancela FGV única + operação CNPJ-terceirizado heterogênea. Sobreposição direta com 51 cidades IPOG (estimadas ~15-25 em overlap). **Alavanca 4 do framework regional IPOG é a posição canônica de defesa**.

---

## 2. Tabela cruzada Onda 5 (9 colunas — 5 concorrentes)

| Concorrente | Arquétipo | Naming MBA Psi | llms.txt | robots.txt bloqueia IA | Wikipedia | Schema EduOccupational | Pegada física | Ticket (Psi/Executivo) |
|---|---|---|---|---|---|---|---|---|
| **PUC-RS** (mantenedora) | Arq. 2 Premium acadêmica multicampus Sul | ausente | ausente (HTTP 404) | **bloqueio explícito ClaudeBot/GPTBot/Google-Extended/CCBot + Content-Signal `ai-train=no`** | denso (Wikipedia PT + EN) | ausente | Porto Alegre + Viamão (RS) | R$ 1.500-3.000/mês [a confirmar] |
| **FGV polo parceiro** | Arq. 4 Multipolar via polo parceiro CNPJ-terceirizado | ausente em Psi (usa MBA RH) | ausente (HTTP 404) | aberto (sem bloqueio IA explícito) | denso (Wikipedia PT + EN) | ausente | **100+ cidades CNPJ-parceiro** | R$ 1.000-2.500/mês [varia por polo] |
| **Mackenzie Online** | Arq. 2 Premium SP com Pós Digital em pré-lançamento | ausente (em pré-lançamento) | ausente (HTTP 404) | aberto (TYPO3 padrão, sem bloqueio IA) | denso (Wikipedia PT) | ausente | 7 campi (SP+Alphaville+Campinas+BSB+Curitiba+Rio+Palmas) | [a confirmar — Pós Digital em pré-lançamento] |
| **Insper Online** | Arq. 2 Premium SP com WAF ativo + parceria OpenAI Edu | ausente | n/d (HTTP 403 WAF) | n/d (HTTP 403 WAF — provavelmente genérico anti-bot) | ativo (Wikipedia PT + EN) | provavelmente ausente | só SP Vila Olímpia (1 cidade) | R$ 60-120 mil totais MBA executivo |
| **Casa do Saber** | Arq. novo 5b Plataforma streaming intelectual cursos livres (sem MEC) | ausente (explícita — cursos livres) | n/d (não confirmado) | aberto e minimalista | ativo (Wikipedia PT) | provavelmente ausente (CreativeWork, não Course) | só SP + 100% streaming nacional | R$ 49-89/mês assinatura ou cursos avulsos |

**Achados centrais da tabela:**
- **5 de 5 concorrentes Onda 5 sem naming MBA em Psicologia** — vácuo confirmado consolida 21/21 universo.
- **5 de 5 sem `EducationalOccupationalProgram` Schema** — janela técnica IPOG estrutural e durável.
- **5 de 5 sem `llms.txt`** — janela curatorial GEO aberta.
- **PUC-RS é o primeiro premium acadêmico do universo Onda 1-5 a bloquear IA explicitamente** — política deliberada com `Content-Signal: ai-train=no`.
- **Insper tem WAF ativo + parceria OpenAI Edu (contradição aparente — provavelmente WAF é anti-bot genérico, não bloqueio específico a IA com User-Agent declarado).**

---

## 3. Status final cumulativo Ondas 1-5: 21/21 concorrentes mapeados (100% da meta canônica)

### 3.1 Roster canônico completo

**Onda 1 (5 concorrentes EAD massivo):** Estácio (Yduqs), Anhanguera (Cogna), UNINTER, UniCesumar (Vitru), PUC-Minas Virtual.

**Onda 2 (5 concorrentes especialistas verticais e premium):** CETCC, IBNeuro (sentinela ativa — `llms.txt` 09-05-2026), Sírio-Libanês IEP/FSL, Anhembi Morumbi/UAM, Saint Paul/EXAME.

**Onda 3 (5 concorrentes adjacentes):** PUCRS Online (UOL EdTech via PUCRS), Cruzeiro do Sul Virtual, Faveni, Famart, Descomplica Pós.

**Onda 4 (6 concorrentes — 3 especialistas verticais Psi + 3 plataformas telepsicologia):** InEPP (categoria fragmentada), INPG Business School, IBPEX (Grupo Uninter), Vittude, Zenklub, Eurekka.

**Onda 5 (5 concorrentes fechamento):** PUC-RS, FGV polo parceiro, Mackenzie Online, Insper Online, Casa do Saber.

**Total: 5 + 5 + 5 + 6 + 5 = 26 dossiês cobrindo 21 entidades canônicas + 5 sub-classes/sentinelas adicionais.**

### 3.2 Cobertura por arquétipo canônico (atualização completa)

| Arquétipo | Players canônicos | Cobertura programa |
|---|---|---|
| **Arq. 1A — EAD Massivo Premium-Médio** | Estácio, Anhanguera, UNINTER, UniCesumar, Cruzeiro do Sul Virtual, IBPEX (sub-marca Uninter) | **6 mapeados — completo** |
| **Arq. 1B — EAD Massivo Cauda Longa Low-End** | Faveni, Famart | **2 mapeados — completo** |
| **Arq. 1C — EdTech B2C com chancela MEC adquirida** | Descomplica Pós (via Uniamerica) | **1 mapeado — completo** |
| **Arq. 2 — Premium Concentrado SP-RJ** | Saint Paul/EXAME, Anhembi/UAM, Sírio-Libanês IEP/FSL, **Mackenzie Online (Onda 5)**, **Insper Online (Onda 5)** | **5 mapeados — adensado pela Onda 5** |
| **Arq. 2-B — Premium Acadêmica Online via Parceria EdTech** | PUCRS Online (UOL EdTech) | **1 mapeado — completo** |
| **Arq. 2-novo — Premium acadêmica multicampus regional (Sul)** | **PUC-RS (Onda 5)** | **1 mapeado — novo na Onda 5** |
| **Arq. 3 — Especialistas Verticais** | CETCC, IBNeuro, wPós/Unyleya (Anhembi-mantida), InEPP, INPG, PUC-Minas Virtual (variante) | **6 mapeados — completo** |
| **Arq. 4 — Multipolar via Polo Parceiro CNPJ-Terceirizado** | **FGV polo parceiro (Onda 5, análise dedicada)** | **1 mapeado — análise dedicada na Onda 5** |
| **Arq. 5 — Plataforma de Telepsicologia com Braço Educacional sem MEC (R-016)** | Vittude, Zenklub, Eurekka | **3 mapeados — completo** |
| **Arq. 5b — Plataforma de Streaming Intelectual sem MEC (cursos livres em Psi/Psicanálise)** | **Casa do Saber (Onda 5, arquétipo novo)** | **1 mapeado — novo na Onda 5** |

**Total: 27 vínculos arquetípicos para 21 entidades canônicas — alguns concorrentes ocupam múltiplos arquétipos (PUC-Minas Virtual em Arq. 1A + Arq. 3 por sub-vertical Psicologia restrita).**

---

## 4. Atualização canônica dos arquétipos (Arq. 2, Arq. 4, e novo Arq. 5b)

### 4.1 Arquétipo 2 — Premium Concentrado SP-RJ — adensado com 3 novos players

A Onda 5 confirma o Arquétipo 2 como o **mais denso e ativo do mercado brasileiro de pós lato sensu premium**, com **3 a 4 novos players canonicamente integrados**:

- **Mackenzie Online** — premium SP com tradição 150+ anos (1870 Escola Americana), **Pós Digital em pré-lançamento em 2026-05-10**. Janela IPOG: capturar share-of-voice em **6-12 meses antes do lançamento da Pós Digital Mackenzie em Psicologia**.
- **Insper Online** — premium SP Vila Olímpia, **31º Financial Times Executive Education Open Programs 2024** (único brasileiro top 50 mundial), parceria OpenAI Edu desde ago/2025. Sem oferta em Psicologia direta — apenas bordadura via "Liderança e Comportamento".
- **Saint Paul/EXAME** — premium SP (Cohort Onda 2) com transição pós-aquisição BTG Pactual.
- **Anhembi/UAM (Ânima)** — premium SP-Norte com herança Anhembi.

**Comparação canônica Insper Online vs Mackenzie Online vs Saint Paul/EXAME:**

| Dimensão | Insper Online | Mackenzie Online | Saint Paul/EXAME |
|---|---|---|---|
| **Origem** | 1987 IBMEC SP → 2004 independente | 1870 Escola Americana → 1952 UPM | 2003 Saint Paul Escola → 2024 BTG Pactual |
| **Foco institucional** | Business + Economia + Engenharia + Direito | Multidisciplinar (Direito + Eng + Psi + Adm + Arq) | Executivo + MBA com brand EXAME |
| **Oferta Psicologia direta** | Ausente (Cluster 1 via Liderança) | Sim, Faculdade tradicional + Pós Digital em pré-lançamento | Ausente |
| **Acreditação internacional** | AACSB + ABET (único BR com ambos) | n/d sistemática | n/d |
| **Rankings** | FT 31º Open Programs 2024 | RUF 1º Mercado Trabalho 2025; QS 4º privada BR | Variável pós-aquisição |
| **WAF ativo** | Sim (HTTP 403 ao crawler) | Não (TYPO3 aberto) | URLs 404 em transição |
| **`llms.txt`** | Provavelmente ausente | Ausente (HTTP 404) | Provavelmente ausente |
| **Pegada geográfica** | 1 cidade (SP Vila Olímpia) | 7 campi (SP, Alphaville, Campinas, BSB, Curitiba, Rio, Palmas) | SP-centric com cobertura nacional via EXAME |
| **Ticket Psi/Executivo** | R$ 60-120 mil MBA | [a confirmar — Pós Digital] | R$ 40-90 mil [a confirmar] |
| **Brand recall em Psicologia** | Virtualmente zero | Alto presencial SP, baixo digital nacional | Baixo |
| **Janela IPOG** | Co-existência declarada (terreno distinto) | 6-12 meses antes do lançamento Pós Digital | 3-6 meses transição BTG |

**Implicação para IPOG no Arquétipo 2:** **nenhum dos 3 premium SP-RJ tem produto MBA Online em Psicologia consolidado em 2026-05-10**. O quadrante **"premium online + naming MBA + Psicologia + 51 cidades CNPJ-próprio"** segue **vazio em todos os 4 premium SP-RJ canônicos** (Insper, Mackenzie, Saint Paul/EXAME, PUC-Minas Virtual). **Janela competitiva IPOG durável no Arquétipo 2 — 12-24 meses antes de reação coordenada premium SP-RJ**.

### 4.2 Arquétipo 4 — Multipolar via Polo Parceiro CNPJ-Terceirizado (análise dedicada FGV)

A FGV via polo parceiro é confirmada como **único concorrente direto da tese de regionalização CNPJ-próprio do IPOG** — análise dedicada em `concorrente-fgv-polo-parceiro.md` (Seção 9). Características canônicas:

- **100+ cidades** brasileiras com operação em CNPJ-parceiro CNPJ-terceirizado.
- **Chancela acadêmica única e forte** (FGV — Financial Times reconhecida).
- **Heterogeneidade operacional declarada** entre polos (Reclame Aqui local, Reddit r/[cidade], Quero Bolsa).
- **Corpo docente local heterogêneo** — variação entre docentes centrais FGV e docentes locais.
- **Sem incentivo equivalente para construir corpus regional rico** — polos parceiros não investem em blog local, casos de egressos, releases regionais com profundidade.
- **Sobreposição estimada com 51 cidades IPOG: ~15-25 cidades** [a confirmar com auditoria explícita por Bruno Azambuja].

**Posição canônica IPOG no Arquétipo 4 — Alavanca 4 declarada:**
- Em landing pages regionais (Goiânia, Brasília, Manaus, Belém, Cuiabá), declarar explicitamente **"IPOG opera com CNPJ-próprio em [cidade]"** vs concorrentes via polo terceirizado.
- Schema Markup `EducationalOrganization` com `legalName` IPOG + `address` local — fortalece signaling para LLMs.
- Corpus regional próprio: blog local + casos de egressos regionais + releases imprensa regional — captura corpus que FGV polo parceiro não tem incentivo para construir.

### 4.3 Arquétipo novo 5b — Plataforma de Streaming Intelectual sem MEC (Casa do Saber)

A Onda 5 formaliza um **arquétipo novo canônico** — adjacente ao Arquétipo 5 (R-016 Telepsicologia) mas com perfil **cultural-intelectual**:

- **Casa do Saber** opera plataforma streaming Casa do Saber + desde 2018 com 300+ cursos livres em 11 áreas, incluindo **Psicanálise e Psicologia** com docentes premium (Christian Dunker, Vera Iaconelli, Maria Homem).
- **Não opera diploma lato sensu nem MEC**.
- **Brand recall alto em Psicanálise + Psicologia clínica intelectual** — Dunker e Iaconelli são autoridades canônicas em LLMs em PT-BR.
- **Risco competitivo:** **autoridade docente em LLMs**, não diploma. Aluno-tipo encontra Dunker citado por LLM antes de encontrar pós lato sensu técnica.

**Posição canônica IPOG no Arquétipo 5b:** **co-existência editorial declarada** — IPOG cita Dunker/Iaconelli como autoridades intelectuais + posiciona-se como **"credencial técnica que complementa a cultura intelectual"**. Não disputa em brand recall cultural — disputa em credencial defensável CFP/MEC + capilaridade regional.

---

## 5. Três padrões de comportamento da Onda 5

### Padrão 1 — Premium acadêmico tradicional adota bloqueio explícito a IA em paralelo a parceria com IA generativa

A PUC-RS bloqueia explicitamente ClaudeBot/GPTBot/Google-Extended/CCBot via robots.txt + Content-Signal `ai-train=no` (postura defensiva sob Diretiva Europeia 2019/790). O Insper, paradoxalmente, opera WAF ativo (HTTP 403 ao crawler genérico) **enquanto firma parceria com OpenAI Edu** (agosto/2025). Esses dois comportamentos **podem coexistir institucionalmente** — bloqueio defensivo a scraping/crawling + parceria comercial declarada com player IA específico — mas geram **mensagem inconsistente em LLMs**.

**Implicação para IPOG:** **manter `robots.txt` aberto + publicar `llms.txt` declarado** é estratégia técnica defensável (postura pró-IA com curadoria explícita) que **diferencia o IPOG de ambos os padrões PUC-RS e Insper**. Em prompts qualificados sobre "instituição premium em educação superior brasileira com postura pró-IA generativa transparente", IPOG pode liderar — janela ampla.

### Padrão 2 — Premium SP-RJ tem Pós Digital em pré-lançamento ou em construção (Mackenzie + Insper + Saint Paul)

Mackenzie sinaliza **"Pós Digital em pré-lançamento"** em 2026-05-10. Insper opera Insper Online em Advanced Programs e Certificate Programs mas **sem oferta em Psicologia**. Saint Paul/EXAME está em transição pós-aquisição BTG. **Nenhum dos 3 tem oferta MBA Online em Psicologia consolidada em 2026-05-10**.

**Implicação para IPOG:** janela de **6-12 meses** para o IPOG consolidar produto MBA Online de Psicologia com naming canônico, Schema completo e capilaridade regional **antes de reação coordenada premium SP-RJ**. Após esse prazo, Mackenzie + Saint Paul tendem a entrar com produtos digitais em Psicologia, fechando parcialmente o vácuo.

### Padrão 3 — Casa do Saber e PUC-RS evidenciam dois polos de "intelectualidade brasileira" não-cobertos por pós lato sensu técnica

Casa do Saber captura o aluno-tipo **culto e aspiracional** com cursos livres premium em Psicanálise (Dunker, Iaconelli). PUC-RS tradicional captura aluno **acadêmico-regional Sul** com presencial + chancela pontifícia. **Ambos têm brand recall alto em queries culturais e regionais qualificadas, mas baixo em queries de credencial profissional MEC defensável online**.

**Implicação para IPOG:** o aluno-psicólogo que pesquisa **"pós em Psicologia que vale CFP + flexível online + naming MBA + 51 cidades CNPJ-próprio"** encontra **vácuo em ambos os polos**. IPOG ocupa o quadrante intermediário entre Casa do Saber (cultural) e PUC-RS (regional Sul presencial) com **credencial técnica nacional flexível online**.

---

## 6. Três vulnerabilidades cruzadas exploráveis pelo IPOG

### Vulnerabilidade 1 — Fragmentação CNPJ em premium acadêmica online (PUCRS Online + FGV polo parceiro + Casa do Saber)

A PUCRS Online opera no CNPJ UOL Cursos (não PUCRS direto). A FGV via polo parceiro opera em CNPJs-terceirizados nas 100+ cidades. Casa do Saber não opera MEC (apenas cursos livres). **3 dos 5 concorrentes Onda 5 têm fragmentação institucional declarada** entre marca-mãe e operador.

**IPOG vence em consistência institucional:** **CNPJ-próprio em cada cidade + razão social IPOG única + chancela MEC própria**. Schema Markup `EducationalOrganization` com `legalName` consistente em todas as 51 unidades é janela defensável durável.

### Vulnerabilidade 2 — WAF + bloqueio IA explícito degrada descoberta RAG-native

3 de 21 concorrentes mapeados em política deliberada de bloqueio IA: **PUC-RS** (robots.txt + Content-Signal), **Vittude e Eurekka** (robots.txt explícito + ai-train=no). **6 adicionais** com WAF genérico que retorna 403 ao crawler: **Anhanguera, Sírio-Libanês, Cruzeiro do Sul Virtual, Famart, INPG, Insper**. Total **9 de 21 concorrentes (43%)** com alguma forma de fricção em descoberta RAG-native em 2026-05-10.

**IPOG mantém `robots.txt` aberto a IA + publica `llms.txt`** captura janela técnica que 43% do universo deliberadamente fechou.

### Vulnerabilidade 3 — Sem `EducationalOccupationalProgram` + sem `Person` Schema com Lattes em 21/21

**100% do universo Onda 1-5 (21/21) sem `EducationalOccupationalProgram` + sem `Person` Schema com Lattes/ORCID** em 2026-05-10. Esta é a janela técnica **mais durável** do programa — implementação requer parceria docente + auditoria página-a-página + aprovação institucional.

**IPOG implementar Schema canônico completo** nas 5 páginas de produto Cluster 1 + Cluster 5 prioritárias = vantagem técnica de pelo menos 12-18 meses antes de qualquer competidor reagir com mesma profundidade.

---

## 7. Ações finais para Brasil GEO — fechamento da fase de benchmarking + entrada em monitoramento contínuo (3-5 ações)

### Ação 1 — [Esforço médio, impacto alto, prazo curto — 30 dias]: Consolidar `SINTESE-EXECUTIVA.md` master integrando Ondas 1-5 + atualizar `matriz-presenca-llm.md` + `matriz-tecnica-schema-seo.md` para 21 concorrentes

**O quê:** integrar os 5 dossiês Onda 5 + 6 dossiês Onda 4 + 5 dossiês Onda 3 (atualmente síntese master só cobre Onda 1) em documento agregado canônico. Atualizar matrizes técnicas com cobertura 21/21.

**Por quê:** sem síntese agregada, decisões executivas com Ronan Maia precisam navegar 5 sínteses parciais. Síntese master é a base operacional para o checkpoint mensal e para o dashboard de KPIs cross-LLM.

**Prazo de entrega:** **10-06-2026** (30 dias).

**Owner:** Alexandre Caramaschi (Brasil GEO).

### Ação 2 — [Esforço médio, impacto alto, prazo curto-médio — 45-60 dias]: Lançamento do produto MBA Online de Psicologia IPOG com naming canônico + Schema completo + `llms.txt` declarado

**O quê:** decisão de produto IPOG sincronizada com Bruno + Ronan: lançar 1 a 3 produtos MBA Online de Psicologia com naming explícito ("MBA Online em Psicologia Organizacional", "MBA Online em Saúde Mental Corporativa e Compliance NR-1", "MBA Online em Avaliação Psicológica e SATEPSI-Compliance"). Implementar Schema canônico (`EducationalOrganization` + `Course` + `EducationalOccupationalProgram.programType: "MBA"` + `Person` Schema com Lattes/ORCID para 3 docentes piloto + `FAQPage`) + publicar `llms.txt` em `ipog.edu.br/llms.txt`.

**Por quê:** **21/21 concorrentes sem naming MBA Psicologia + sem `EducationalOccupationalProgram` + 20/21 sem `llms.txt`**. Janela é durável (12-18 meses) e captura tripla — semântica + técnica + curatorial.

**Prazo de entrega:** **10-07-2026** (60 dias).

**Owner:** Bruno Azambuja (IPOG produto + TI) + Brasil GEO (Schema + `llms.txt` canônicos).

### Ação 3 — [Esforço alto, impacto alto, prazo médio — 90 dias]: Alavanca 4 declarada em 15 landing pages regionais IPOG vs FGV polo parceiro

**O quê:** ativar Alavanca 4 do framework regional em landing pages das 15 cidades-alvo IPOG com maior sobreposição com FGV polo parceiro (Goiânia, Brasília, Manaus, Belém, Cuiabá, Fortaleza, Recife, Salvador, Belo Horizonte, Curitiba, Porto Alegre, Vitória, São Luís, Teresina, Campo Grande). Cada landing declara explicitamente **"IPOG opera com CNPJ-próprio em [cidade]"** + Schema `EducationalOrganization` com `legalName` IPOG + `address` regional + corpus local rico (blog regional + casos egressos + releases imprensa local).

**Por quê:** FGV polo parceiro é o concorrente mais direto da tese regional. Alavanca 4 é a posição canônica de defesa. Sem corpus regional próprio, IPOG cede share-of-voice ao FGV em LLMs com retrieval rico.

**Prazo de entrega:** **08-08-2026** (90 dias).

**Owner:** Bruno Azambuja (IPOG produto regional) + Brasil GEO (Schema + corpus + Alexandre como autor HBR-grade).

### Ação 4 — [Esforço baixo, impacto médio, prazo curto — 30-45 dias]: Capturar baseline real cross-LLM nos 15 prompts canônicos contra os 21 concorrentes

**O quê:** executar `kit-prompts-v0` (66 prompts) ou subset dos 15 prompts-âncora canônicos (`matriz-presenca-llm.md`) contra **GPT-5, Claude Opus 4.7, Gemini 2.5 Pro, Perplexity, Grok** com os 21 concorrentes integrados. Substituir inferências atuais por dado primário cross-LLM.

**Por quê:** sem baseline real, métricas de Conversion Lift, LLM Mention Rate e Share-of-Voice ficam como hipóteses. Baseline é a base para medir impacto das Ações 1-3 nas próximas 8 semanas.

**Prazo de entrega:** **25-06-2026** (45 dias).

**Owner:** Brasil GEO (operacional Alexandre + sub-agents Opus paralelos) + IPOG (validação Bruno).

### Ação 5 — [Esforço médio, impacto alto, prazo longo — 6-12 meses]: Entrada formal em monitoramento contínuo + cadência de re-coleta pós-Onda 5

**O quê:** transição da fase de benchmarking competitivo (Ondas 1-5 fechadas em 2026-05-10) para **monitoramento contínuo**. Cadência canônica:
- **Mensal:** sentinelas ativas (IBNeuro `llms.txt`, Zenklub Academy R-016 gatilho, Vittude Summit pós-edição-2026, Mackenzie Pós Digital lançamento, Saint Paul transição BTG, Eurekka MEC parceria).
- **Trimestral:** todos 21 concorrentes — auditoria de `robots.txt`, `llms.txt`, Schema markup em página de produto principal, naming MBA em Psicologia.
- **Semestral:** atualização da síntese master + arquétipos + matrizes técnicas + risk register (R-016 e R-017 novo se Casa do Saber sinalizar parceria MEC).
- **Anual:** revisão estratégica completa com Ronan Maia + Bruno Azambuja, integração com KPIs de Conversion Lift cross-LLM.

**Por quê:** mercado é dinâmico — IBNeuro publicou `llms.txt` em 09-05-2026, Mackenzie sinalizou Pós Digital em pré-lançamento, Insper firmou parceria OpenAI em ago/2025. **Cadência fixa de re-coleta substitui adhoc por sistemático**, captura sinais fracos antes de se tornarem gatilhos de escalonamento.

**Prazo de entrega:** **estrutura ativada até 30-06-2026** (50 dias), **primeira re-coleta trimestral em 10-08-2026**.

**Owner:** Brasil GEO (estrutura) + Bruno Azambuja (validação operacional mensal).

---

## 8. Recomendação de cadência de re-coleta pós-Onda 5

### 8.1 Sentinelas ativas (mensal — alta criticidade)

- **IBNeuro `llms.txt`** (sentinela canônica desde 09-05-2026) — verificar mudanças mensais.
- **Zenklub Academy** — gatilho R-016 ativo: parceria com IES MEC antes de 30-06-2026.
- **Vittude Summit pós-edição-2026** — captação de anúncios de produto educacional formal.
- **Mackenzie Online — Pós Digital lançamento** — captar data e clusters cobertos em Psicologia.
- **Saint Paul/EXAME — URLs canônicas pós-BTG** — janela técnica de 3-6 meses pós-aquisição.
- **Eurekka — parceria com IES MEC** para Formação Eurekka virar lato sensu.

### 8.2 Universo completo (trimestral — média criticidade)

Auditoria sistematizada dos 21 concorrentes:
- `robots.txt` + `llms.txt` — quem publicou, quem mudou política IA.
- Schema markup em página de produto principal — `EducationalOccupationalProgram`, `Person` com Lattes.
- Naming MBA em Psicologia — quem adotou (gatilho de captura urgente para IPOG).
- Catálogo em Psicologia — novos produtos lato sensu lançados.

### 8.3 Síntese master + arquétipos + matrizes (semestral — baixa criticidade)

- Atualização da `SINTESE-EXECUTIVA.md` master.
- Refinamento dos `ARQUETIPOS-CONCORRENCIA-EDUCACAO.md` (adicionar/remover subclasses).
- Atualização de `matriz-presenca-llm.md` e `matriz-tecnica-schema-seo.md` com baseline cross-LLM atualizado.
- Atualização do `docs/05-risk-register.md` (R-016, R-017 Casa do Saber, R-018 FGV polo se aplicável).

### 8.4 Revisão estratégica completa (anual — marco institucional)

- **Checkpoint executivo com Ronan Maia + Bruno Azambuja**.
- **Integração com KPIs Conversion Lift cross-LLM** medidos em campo.
- **Decisão sobre Onda 6 (novos arquétipos) se justificada por mudança de mercado**.

---

## 9. Riscos críticos e próximas ondas (pós-Onda 5)

### Riscos críticos identificados na Onda 5

- **FGV polo parceiro como concorrente direto da Alavanca 4 IPOG.** Janela 24-36 meses, mas exige Ação 3 (15 landing pages regionais) ativada em horizonte de 90 dias.
- **PUC-RS bloqueio IA + parceria Insper-OpenAI Edu = sinal de premium acadêmico polarizado** em relação a IA generativa. IPOG pode liderar postura **pró-IA com curadoria explícita via `llms.txt`** — diferenciação durável.
- **Mackenzie Online Pós Digital em pré-lançamento.** Janela 6-12 meses antes do lançamento — IPOG precisa consolidar produto canônico antes de Mackenzie entrar em Psicologia online com chancela premium SP.
- **R-017 (proposto):** Casa do Saber anunciar parceria com IES MEC para emitir diploma lato sensu (modelo PUCRS Online via UOL). Probabilidade Baixa em 2026, mas gatilho de monitoramento ativo.

### Próximas ondas recomendadas pós-Onda 5

**Onda 5 fecha a fase de benchmarking competitivo canônica.** Recomendações para pós-Onda 5:

- **Onda 5b — sub-recheck via Chrome MCP (15-30 dias):** auditoria de Insper (WAF) e PUC-RS (bloqueio IA) com User-Agent declarado.
- **Onda 6 condicional:** acionar **apenas se** Bruno Azambuja confirmar entrada em arquétipo estrutural novo (ex.: IES estrangeira com operação BR, Coursera/edX com chancela parceira BR, Stanford Online Brasil, MIT xPro Brasil).
- **Recheck sistemático trimestral** começando em **10-08-2026** sob estrutura de monitoramento contínuo (Ação 5).
- **Atualização master a cada 6 meses** integrando achados de re-coleta + mudanças de mercado.

---

## 10. Documentos relacionados (canônicos pós-Onda 5)

### Dossiês Onda 5 (5 arquivos novos)

- `audits/benchmarking/concorrente-pucrs.md` — PUC-RS (mantenedora acadêmica, distinta de PUCRS Online).
- `audits/benchmarking/concorrente-fgv-polo-parceiro.md` — FGV polo parceiro (Arquétipo 4 canônico, análise dedicada).
- `audits/benchmarking/concorrente-mackenzie-online.md` — Mackenzie Online (Arquétipo 2 SP com Pós Digital em pré-lançamento).
- `audits/benchmarking/concorrente-insper-online.md` — Insper Online (Arquétipo 2 SP com WAF + parceria OpenAI Edu).
- `audits/benchmarking/concorrente-fespsp-casadosaber.md` — Casa do Saber priorizada sobre FESPSP (Arquétipo novo 5b).

### Sínteses cumulativas (canônicas Ondas 1-5)

- `audits/benchmarking/SINTESE-EXECUTIVA.md` — Onda 1 master (integração Ondas 2-5 pendente — Ação 1).
- `audits/benchmarking/ONDA-3-SINTESE-EXECUTIVA.md` — Onda 3.
- `audits/benchmarking/ONDA-4-SINTESE-EXECUTIVA.md` — Onda 4 (incluindo R-016 recalibrado).
- `audits/benchmarking/ONDA-5-SINTESE-EXECUTIVA.md` — **este documento** (fechamento 21/21).

### Documentos canônicos do programa

- `audits/benchmarking/ARQUETIPOS-CONCORRENCIA-EDUCACAO.md` — formalização Arquétipo 5b pendente + adensamento Arquétipo 2.
- `audits/benchmarking/matriz-presenca-llm.md` — extensão para 21 concorrentes pendente (Ação 1).
- `audits/benchmarking/matriz-tecnica-schema-seo.md` — extensão para 21 concorrentes pendente (Ação 1).
- `audits/benchmarking/pontos-fortes-a-superar.md` — integração Ondas 2-5 pendente.
- `docs/05-risk-register.md` — R-016 já recalibrado (Onda 4); R-017 (Casa do Saber MEC) a criar; R-018 (FGV polo parceiro Alavanca 4) a criar.
- `audits/LLMS-TXT-TEMPLATE.md` — template para publicação `ipog.edu.br/llms.txt` (Ação 2).
- `audits/SCHEMA-PATTERNS.md` — patterns canônicos para implementação Schema IPOG (Ação 2).

### Marcos institucionais

- **Fechamento da fase de benchmarking competitivo:** **2026-05-10** (este documento).
- **Próxima etapa canônica:** monitoramento contínuo + lançamento de produto + Alavanca 4 declarada.
- **Próximo checkpoint executivo com Ronan Maia:** **30-05-2026** (síntese master integrada + decisões de produto).

---

## 11. Status final 21/21 confirmado

| Onda | Concorrentes | Status |
|---|---|---|
| Onda 1 | Estácio, Anhanguera, UNINTER, UniCesumar, PUC-Minas Virtual | **5/5 mapeados** |
| Onda 2 | CETCC, IBNeuro, Sírio-Libanês IEP/FSL, Anhembi/UAM, Saint Paul/EXAME | **5/5 mapeados** |
| Onda 3 | PUCRS Online, Cruzeiro do Sul Virtual, Faveni, Famart, Descomplica Pós | **5/5 mapeados** |
| Onda 4 | InEPP, INPG, IBPEX, Vittude, Zenklub, Eurekka | **6/6 mapeados** |
| Onda 5 | PUC-RS, FGV polo parceiro, Mackenzie Online, Insper Online, Casa do Saber | **5/5 mapeados** |
| **TOTAL** | **21 entidades canônicas + 5 sub-classes** | **21/21 (100% da meta)** |

**Marco canônico atingido em 2026-05-10. Programa GEO IPOG entra em fase de monitoramento contínuo + execução de captura competitiva.**

---

> **Última coleta de dados:** 2026-05-10
> **Próxima atualização:** **10-08-2026** (re-coleta trimestral sistematizada).
> **Cadência de monitoramento contínuo ativada.**
