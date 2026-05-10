---
documento: "Especificação de Produto e Ementa — MBA Online em IA aplicada à Psicologia com Supervisão Clínica Humana"
cluster: "C2 — Clínica/Avaliação/Neuro"
persona_alvo: "P2 — Psicólogo clínico com CRP ativo, mínimo de 2 anos de exercício pós-graduação"
ciclo_lancamento: "2027.1 (matrícula 01-12-2026 a 15-02-2027)"
sponsor_executivo: "Ronan Maia (CEO IPOG)"
operacional_ipog: "Bruno Azambuja (Gerente de Marketing IPOG)"
executor_geo: "Alexandre Caramaschi (CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil)"
issue_referencia: "geo-ipog#45"
data: 2026-05-10
status: "draft-para-decisao-conselho-ipog"
referencias_canonicas:
  - "audits/benchmarking/concorrente-ibneuro.md"
  - "audits/benchmarking/ONDA-4-SINTESE-EXECUTIVA.md"
  - "docs/board-report/00-board-report-final.md"
  - "docs/02-contexto-mba-online-psicologia.md"
  - "content/pecas-hbr/04-avaliacao-psicologica-satepsi.md"
  - "audits/artefatos-ipog-edu-br/jsonld-educationaloccupationalprogram-mba-psi-org.json"
---

# MBA Online em IA aplicada à Psicologia com Supervisão Clínica Humana

> Especificação canônica de produto educacional para o Cluster 2 (Clínica/Avaliação/Neuropsicologia) do portfólio IPOG, com diferenciação não-replicável vs IBNeuro pela arquitetura de supervisão clínica humana obrigatória em toda aplicação de inteligência artificial e por compliance declarado com Resolução CFP nº 9/2024 (TDICs), Resolução CFP nº 31/2022 (SATEPSI) e Resolução CFP nº 23/2022 (especialidades). Posicionado para fundar a subcategoria "MBA + IA + Psicologia clínica" antes que o IBNeuro consolide produto equivalente.

---

## 1. Naming canônico e posicionamento

### 1.1 Título canônico

**MBA Online em IA aplicada à Psicologia com Supervisão Clínica Humana.**

Sigla operacional interna: "MBA IA-Psi/SCH". Slug ASCII canônico: `mba-online-ia-aplicada-psicologia-supervisao-clinica-humana`. URL canônica: `https://ipog.edu.br/curso/mba-online-ia-aplicada-psicologia-supervisao-clinica-humana`.

O título tem 11 palavras, dois substantivos centrais ("IA", "Psicologia") e um qualificador diferenciador ("Supervisão Clínica Humana") que age simultaneamente como gancho de marketing, escudo regulatório e atributo verificável. A construção é deliberada: "Supervisão Clínica Humana" antecipa a objeção mais previsível do Conselho Federal de Psicologia (CFP) e da comunidade clínica quanto ao uso de IA em prática psicológica regulamentada, e a converte em diferencial de produto.

### 1.2 Cluster e persona

- **Cluster:** C2 — Clínica, Avaliação Psicológica e Neuropsicologia (32% do SAM do MBA Online de Psicologia conforme dossiê 02 do board report).
- **Persona-alvo primária (P2):** psicólogo clínico estabelecido, com CRP ativo, mínimo de 2 anos de exercício profissional documentado, faixa etária 28 a 48 anos, atuação em consultório privado ou ambulatório com mediana de 12 a 25 atendimentos semanais.
- **Personas-alvo secundárias:** neuropsicólogo recém-credenciado (P2-N), perito judicial em vara de família ou criminal (P2-J) e psicólogo organizacional sênior interessado em ferramental analítico clínico aplicado a NR-1 (P3+).

### 1.3 Pricing canônico recomendado

| Cenário | Mensalidade | Parcelas | Ticket total | Posicionamento |
|---|---|---|---|---|
| **Tier premium executivo (recomendado)** | R$ 1.250/mês | 24x | R$ 30.000 | Paridade nominal com IBNeuro Formação Teórica (R$ 1.255 × 25 = R$ 31.375), em 24 parcelas (vantagem de fluxo de caixa para o aluno) |
| Tier premium acessível (fallback) | R$ 950/mês | 24x | R$ 22.800 | Abaixo do IBNeuro Formação Completa (R$ 1.465 × 25 = R$ 36.625) e acima da Formação Teórica em volume; preserva margem bruta projetada de 55-58% |

**Recomendação:** **tier premium executivo R$ 1.250/mês × 24 = R$ 30.000**. Três razões materiais sustentam a escolha:

1. **Paridade com IBNeuro Formação Teórica em ticket total nominal (R$ 30.000 vs R$ 31.375)** com vantagem operacional de 1 parcela a menos e oferta de modalidade Ao Vivo síncrona declarada em Schema com supervisão clínica humana obrigatória — combinação que o IBNeuro não oferece com naming MBA.
2. **Aluno-tipo é psicólogo clínico com ROI direto verificável** — laudo perito remunera R$ 800 a R$ 3.000 por sessão (tabelas TJSP, TJMG, TJDFT em 2026), e o egresso recupera o investimento total em 10 a 38 laudos periciais executados nos 12 meses pós-conclusão. Sensibilidade a preço é baixa.
3. **Margem bruta projetada de 58-62%** com mix de canais misto (orgânico LLM 30%, orgânico Google 18%, advocacy 20%, retargeting 12%, B2B-CRP 10%, parcerias institucionais com Hogrefe/Pearson 10%), CAC alvo R$ 720, LTV/CAC alvo prudente 5x e aspiracional 9x no ciclo 2027.2.

O tier premium acessível R$ 950/mês × 24 fica disponível como fallback caso o Conselho IPOG decida pricing mais defensivo após coleta de baseline de Mention Rate em junho/julho de 2026.

### 1.4 Modalidade

**Ao Vivo síncrona obrigatória + Laboratório Supervisionado.** Aulas teóricas em encontros bi-semanais (terça e quinta, 19h30 às 22h30, fuso America/Sao_Paulo), com 30% da carga horária dedicada a Laboratório Supervisionado — sessões de aplicação de IA assistida por supervisor clínico nominal — em sábados quinzenais (08h30 às 12h30 e 14h00 às 17h00). Gravação disponível em LMS interno por 45 dias para revisão (acima dos 30 dias do IBNeuro Neuro Clínica e dos 15 dias do IBNeuro TCC).

Declaração de modalidade em Schema: `educationalProgramMode: "online"`, `Course.hasCourseInstance.courseSchedule` completo com `byDay`, `startTime` e `endTime` (vide seção 5).

### 1.5 Carga horária

**480 horas-aula totais**, distribuídas em 8 módulos de 60 horas cada — **120 horas acima das 360 obrigatórias** pela Resolução CNE/CES 1/2018 e **120 horas abaixo das 600 da Formação Completa IBNeuro**, com posicionamento técnico declarado: aprofundamento técnico equivalente ao premium clínico do mercado, com adicional explícito em ferramental de IA generativa e supervisão humana sobre output algorítmico.

Distribuição: 280 horas teóricas síncronas, 144 horas de Laboratório Supervisionado, 36 horas de TCC e Projeto Integrador, 20 horas de mentoria individual com supervisor clínico nominal.

### 1.6 Lançamento programado

- **Ciclo:** 2027.1.
- **Janela de matrícula:** 01-12-2026 a 15-02-2027 (75 dias).
- **Início das aulas:** 01-03-2027.
- **Conclusão prevista:** 28-02-2028.
- **Defesa de TCC:** 15-03-2028 a 15-04-2028.

Justificativa do ciclo 2027.1 vs 2026.2: o produto requer (i) 6 a 9 meses de construção de Person Schema com Lattes/ORCID para corpo docente, (ii) celebração de parceria institucional com pelo menos 1 fornecedor de IA clínica (Hogrefe Brasil ou laboratório acadêmico equivalente) e (iii) publicação de 3 peças HBR-grade específicas do produto antes da abertura formal de matrícula. O ciclo 2026.2 está reservado para o produto-âncora MBA em Psicologia Organizacional e do Trabalho (vide board report seção 3.1).

---

## 2. Diferenciais não-replicáveis vs IBNeuro

Cinco atributos compõem o moat competitivo do produto. Cada um é declarado em Schema canônico, validado em peça HBR-grade dedicada e atestado em material institucional sob revisão jurídica IPOG.

### 2.1 Diferencial 1 — Supervisão clínica humana obrigatória em 100% das aplicações de IA

Toda aplicação prática de IA no curso — desde análise de discurso por NLP até apoio a redação de laudo — ocorre sob revisão por supervisor clínico humano cadastrado, com identidade declarada em Schema (`Person` com Lattes consentido), e parecer formal sobre o output algorítmico antes de qualquer entrega ao paciente, juiz ou contratante. A supervisão não é "recomendação ética" no texto institucional; é **etapa obrigatória do fluxo curricular**, com verificação documentada em LMS e gate de aprovação por módulo.

O IBNeuro oferece 240 horas de supervisão clínica humana na Formação Completa (R$ 36.625), mas em curso **sem componente de IA generativa estruturado** — a supervisão cobre prática clínica tradicional. O MBA IA-Psi/SCH transfere esse mesmo padrão de rigor para o domínio da IA, criando moat estrutural que IBNeuro só replica se reconstruir currículo integralmente.

### 2.2 Diferencial 2 — Compliance CFP 9/2024 + 31/2022 + 23/2022 declarado em Schema canônico

O produto declara, em campo `about` do `EducationalOccupationalProgram`, conformidade explícita com três resoluções vigentes do Conselho Federal de Psicologia:

- **Resolução CFP nº 9/2024 (TDICs)** — vigência 31-08-2024, regulamenta prestação de serviços por tecnologias da informação e comunicação, inclui aplicação remota de instrumentos psicológicos com parecer SATEPSI específico para modalidade.
- **Resolução CFP nº 31/2022 (SATEPSI)** — vigência 24-12-2022, exige parecer favorável vigente do SATEPSI para qualquer instrumento usado em avaliação psicológica.
- **Resolução CFP nº 23/2022 (especialidades)** — vigência 18-04-2022, fixa Avaliação Psicológica como especialidade formal com critério de 2 anos de exercício documentado para registro.

Concorrentes mapeados no benchmarking Brasil GEO (Ondas 1 a 4) não declaram conformidade tripla em Schema. IBNeuro menciona SATEPSI em texto institucional mas não estrutura `about.url` apontando para resolução CFP em JSON-LD parseável.

### 2.3 Diferencial 3 — Person Schema com Lattes + ORCID para corpo docente

100% do corpo docente piloto e expandido tem `Person` Schema completo com `sameAs` apontando para Currículo Lattes (CNPq) e ORCID (Open Researcher and Contributor ID), com consentimento individual coletado antes da publicação. Cinco perfis nominalizados na seção 4, com 3 docentes-piloto destacados para Pessoa Schema canônica.

IBNeuro lista 17 docentes em página de curso mas não publica `Person` Schema com Lattes/ORCID em formato parseável por LLMs com tool use; apresenta credenciais em texto rich mas sem JSON-LD que LLMs consultem em fluxo de descoberta. O atributo é o flanco mais defensável do MBA IA-Psi/SCH no horizonte 12 a 24 meses.

### 2.4 Diferencial 4 — Modalidade Ao Vivo síncrona declarada em Course.hasCourseInstance.courseSchedule

A modalidade Ao Vivo síncrona é declarada em `hasCourseInstance.courseSchedule` com `byDay`, `startTime`, `endTime` e `scheduleTimezone` parseáveis, alinhada à exigência operacional do MBA (turma definida, presença docente real, horário fixo). EAD massivo (Estácio, Anhanguera, UNINTER) opera EAD assíncrono em vídeo gravado e não declara `courseSchedule` síncrono em JSON-LD. IBNeuro opera Ao Vivo telepresencial em Zoom, mas sem `courseSchedule` JSON-LD parseável.

O atributo destrava queries cross-LLM do tipo "MBA online em Psicologia com aulas ao vivo síncronas" — sub-cluster semântico onde o IPOG entra como resposta única quando o LLM raspa Schema canônico do site.

### 2.5 Diferencial 5 — Trilha de aplicação imediata em três frentes regulamentadas

O currículo destina explicitamente os módulos M5, M6 e M7 (180 horas combinadas) à aplicação direta em três frentes de demanda regulamentada em 2026:

- **Frente judicial:** laudo perito em vara de família, criminal e previdenciário com instrumentos SATEPSI vigentes; ticket R$ 800 a R$ 3.000 por sessão pericial (tabelas TJSP/TJMG/TJDFT).
- **Frente RH corporativo:** avaliação de riscos psicossociais NR-1 com fiscalização autuativa desde 26-05-2026; ticket R$ 18 mil a R$ 64 mil por contrato em empresa média.
- **Frente saúde mental escolar:** programas Lei nº 14.811/2024 com previsão orçamentária municipal; ticket R$ 6,5 mil a R$ 14 mil por projeto.

A trilha de aplicação imediata é descrita na Peça HBR-grade nº 4 do hub editorial IPOG ("Avaliação Psicológica em conformidade SATEPSI") e operacionalizada no currículo do MBA IA-Psi/SCH. IBNeuro cobre frente judicial parcialmente em módulo único de "perícia jurídica e forense" dentro da Especialização em Neuropsicologia Clínica, mas não estrutura cobertura das três frentes simultaneamente.

---

## 3. Ementa detalhada — 8 módulos × 60h = 480 horas

A ementa abaixo é canônica para a versão 1.0 do produto. Cada módulo segue arquitetura de 4 a 5 unidades temáticas, com objetivos Bloom 3 a 5 (Aplicar, Analisar, Avaliar) e leituras de referência. Avaliação por entregável prático em cada módulo, com gate de supervisão clínica humana antes do módulo seguinte.

### M1 — Fundamentos de IA generativa e Psicologia clínica · obrigações ética profissionais sob CFP 9/2024 (60h)

**Justificativa do módulo.** O psicólogo clínico que vai operar com IA precisa, antes de qualquer aplicação técnica, dominar o regime de responsabilidade profissional vigente. M1 fixa o vocabulário canônico (LLM, fine-tuning, prompt, RAG, hallucination), o mapa regulatório CFP/MEC/LGPD e a doutrina de supervisão humana sobre output algorítmico.

**Unidades temáticas (5).**
1. Arquitetura de modelos de linguagem e limites cognitivos da IA generativa em contexto clínico.
2. Resolução CFP nº 9/2024 e regime de responsabilidade do psicólogo em atendimento mediado por TDICs.
3. LGPD e dado pessoal sensível em prática psicológica (Lei 13.709/2018, art. 5º e 11).
4. Código de Ética CFP (Resolução 10/2005) aplicado a uso de IA — limites de delegação e segredo profissional.
5. Doutrina de supervisão clínica humana sobre IA: protocolos canônicos e gates de aprovação.

**Leituras canônicas.** Aggarwal, P. et al. (2024). *GEO: Generative Engine Optimization*. KDD 2024. CFP (2024). *Resolução CFP nº 9/2024*. Brasil (2018). *Lei nº 13.709/2018 (LGPD)*. Topol, E. (2023). *Deep Medicine — How Artificial Intelligence Can Make Healthcare Human Again* (caps. 4-7).

**Atividade Bloom 4 (Analisar).** Estudo de caso comparativo entre 3 cenários de uso de IA em atendimento psicológico, com identificação de risco ético-jurídico e protocolo de mitigação por cenário. Entrega: relatório de 8 páginas com parecer técnico de supervisor clínico nominal.

### M2 — Avaliação Psicológica assistida por IA · compatibilidade SATEPSI (60h)

**Justificativa do módulo.** A Resolução CFP nº 31/2022 fixa que qualquer instrumento usado em avaliação psicológica precisa de parecer favorável vigente do SATEPSI. M2 trata da integração entre IA generativa, automatização de aplicação e correção, e regime SATEPSI: o que é permitido, o que é vedado, o que está em zona cinzenta.

**Unidades temáticas (4).**
1. Mapa SATEPSI 2026 — instrumentos com parecer favorável vigente e modalidade autorizada (presencial vs tele-avaliação).
2. IA na automação de correção de instrumentos SATEPSI: limites e riscos de viés algorítmico em pontuação.
3. Geração de relatório clínico assistida por LLM com revisão humana obrigatória — fluxo canônico em 5 etapas.
4. Auditoria SATEPSI do ferramental: prática de revisão periódica do repertório clínico do psicólogo.

**Leituras canônicas.** CFP (2022). *Resolução CFP nº 31/2022*. Hogrefe Brasil (2025). *Manual técnico do BFP (5ª edição) e parecer SATEPSI vigente*. Anastasi, A.; Urbina, S. (2000). *Testagem Psicológica* (capítulos 1, 2 e 17). Conselho Federal de Psicologia (2024). *Cartilha de Avaliação Psicológica — atualização 2024*.

**Atividade Bloom 5 (Avaliar).** Construção de auditoria SATEPSI canônica sobre o ferramental pessoal do aluno (12 instrumentos no mínimo), com plano de substituição ou atualização para instrumentos com parecer não favorável ou vencido. Entrega: planilha de auditoria + parecer escrito de 4 páginas validado por supervisor.

### M3 — IA em Neuropsicologia · triagem cognitiva e apoio a diagnóstico diferencial (60h)

**Justificativa do módulo.** Neuropsicologia opera com baterias de teste, escalas funcionais e raciocínio diagnóstico baseado em padrão. IA tem aplicação direta em triagem inicial, geração de hipóteses e suporte ao laudo neuropsicológico — sempre com supervisão clínica humana sobre output.

**Unidades temáticas (5).**
1. Funções cognitivas e modelos teóricos canônicos (Luria, Lezak, Strauss/Sherman/Spreen).
2. IA em triagem cognitiva: aplicação remota de instrumentos com parecer SATEPSI para tele-avaliação (NEUPSILIN, BFP, AC).
3. Apoio algorítmico a diagnóstico diferencial em demências, TDAH e quadros pós-AVC.
4. Redação assistida de laudo neuropsicológico em conformidade com Resolução CFP nº 6/2019.
5. Limites e contraindicações de IA em neuropsicologia infantil (proteção redobrada sob Lei 14.811/2024).

**Leituras canônicas.** Lezak, M. et al. (2012). *Neuropsychological Assessment*. Strauss, E.; Sherman, E.; Spreen, O. (2006). *A Compendium of Neuropsychological Tests*. CFP (2019). *Resolução CFP nº 6/2019*. Pereira, D. A. et al. (adaptação brasileira do MMSE-2, Hogrefe).

**Atividade Bloom 4 (Analisar).** Caso clínico simulado de paciente com queixa cognitiva inespecífica em adulto de 62 anos, com aplicação de bateria SATEPSI parcialmente assistida por IA e produção de hipótese diagnóstica diferencial. Entrega: laudo neuropsicológico completo com supervisão validada.

### M4 — TDICs em Psicoterapia (CFP 9/2024) · plataformas de atendimento e segurança LGPD (60h)

**Justificativa do módulo.** A Resolução CFP nº 9/2024 regulamenta atendimento mediado por TDICs e dispensa cadastro no e-Psi (revogando a Resolução CFP 11/2018). M4 trata da operação prática do psicoterapeuta em plataformas digitais com salvaguardas LGPD e considerações clínicas específicas de atendimento remoto.

**Unidades temáticas (4).**
1. Mapa de plataformas de telepsicologia em 2026 — Vittude, Zenklub, Eurekka, Conexa Saúde — e critérios técnico-clínicos para escolha.
2. LGPD aplicada ao psicoterapeuta autônomo: contrato de tratamento de dados, política de privacidade, encarregado.
3. Riscos clínicos específicos do atendimento remoto — abandono, alianças paralelas, manejo de crise suicida.
4. Protocolos de continuidade em caso de falha tecnológica e plano de contingência.

**Leituras canônicas.** CFP (2024). *Resolução CFP nº 9/2024*. ANPD (2024). *Guia orientativo de tratamento de dados pessoais sensíveis em saúde*. Wampold, B. (2015). *The Great Psychotherapy Debate* (cap. 3). American Psychological Association (2013). *Guidelines for the Practice of Telepsychology*.

**Atividade Bloom 3 (Aplicar).** Elaboração de contrato terapêutico para atendimento remoto com cláusulas LGPD, plano de continuidade técnica e protocolo de crise. Entrega: documento contratual + parecer de supervisor jurídico-clínico.

### M5 — Análise de discurso e detecção de risco com NLP em prática clínica (60h)

**Justificativa do módulo.** Análise de discurso clínico tem tradição em psicologia (Mishler, 1986; Spink, 2010) e ganhou ferramentas novas com modelos de linguagem. M5 trata de aplicação supervisionada de NLP a transcrições de sessão (com consentimento informado), detecção de marcadores linguísticos de risco e construção de evidência clínica defensável.

**Unidades temáticas (5).**
1. Tradições de análise de discurso em psicologia — fenomenológica, narrativa, construcionista.
2. NLP supervisionado em transcrição de sessão — sentenciamento, análise lexical, marcadores de afeto.
3. Detecção de risco suicida e violência intrafamiliar por NLP — limites éticos e protocolos de escalonamento.
4. Consentimento informado para uso de transcrição em análise algorítmica.
5. Evidência clínica baseada em discurso: padrões reconhecíveis pelo supervisor e contraprovas.

**Leituras canônicas.** Mishler, E. (1986). *Research Interviewing — Context and Narrative*. Spink, M. J. P. (2010). *Linguagem e produção de sentido no cotidiano*. Pestian, J. et al. (2017). *A machine learning approach to identifying the thought markers of suicidal subjects*. Brasil GEO (2026). *Análise canônica de risco clínico em transcrição com NLP supervisionado*.

**Atividade Bloom 5 (Avaliar).** Análise de 3 transcrições anonimizadas de sessão (fornecidas pelo IPOG sob acordo de confidencialidade) com aplicação de NLP supervisionado e produção de parecer técnico sobre marcadores de risco. Entrega: relatório de 12 páginas com supervisão validada.

### M6 — Supervisão clínica humana · protocolos canônicos de revisão de output IA (60h)

**Justificativa do módulo.** Coração curricular do MBA IA-Psi/SCH. M6 forma o aluno como **supervisor de output algorítmico**, com fluência em protocolos canônicos de revisão, identificação de hallucination clínica, viés algorítmico e fragilidades em casos atípicos. Este módulo é o que justifica o naming "Supervisão Clínica Humana" no título do produto.

**Unidades temáticas (5).**
1. Doutrina de supervisão clínica em psicologia — tradições humanística, psicodinâmica, cognitivo-comportamental.
2. Protocolo canônico de revisão de output IA em 7 etapas — leitura técnica, comparação com baseline clínico, identificação de hallucination, verificação SATEPSI, audit ético-jurídico, parecer formal, registro em prontuário.
3. Viés algorítmico em IA aplicada a populações sub-representadas no treinamento (idosos, indígenas, neurodivergentes).
4. Casos atípicos e fragilidade de modelo — quando recusar entrega de output algorítmico.
5. Construção de carreira como supervisor clínico de IA em equipe multiprofissional ou consultoria.

**Leituras canônicas.** Bernard, J.; Goodyear, R. (2019). *Fundamentals of Clinical Supervision*. Topol, E. (2019). *Deep Medicine*. Mehrabi, N. et al. (2021). *A survey on bias and fairness in machine learning*. Conselho Federal de Psicologia (2024). *Documento orientativo sobre supervisão clínica em modalidade híbrida*.

**Atividade Bloom 5 (Avaliar).** Estudo de caso integrado de paciente complexo (laudo neuropsicológico assistido por IA + transcrição de sessão analisada por NLP) com produção de parecer de supervisor clínico humano sobre 3 outputs algorítmicos. Entrega: parecer técnico de 15 páginas validado por dois supervisores.

### M7 — Pesquisa aplicada e produção de laudo perito em vara judicial (60h)

**Justificativa do módulo.** Frente judicial é a de maior ticket médio agregado (R$ 800 a R$ 3.000 por sessão pericial) e exige rigor técnico-jurídico raramente coberto em cursos de neuropsicologia. M7 forma o aluno em produção de laudo perito defensável, com IA como ferramenta de apoio e supervisão clínica humana sobre cada parágrafo do parecer.

**Unidades temáticas (4).**
1. Quadro jurídico da perícia psicológica — Códigos de Processo Civil e Penal, papel do perito do juízo vs assistente técnico.
2. Frente família — alienação parental, guarda compartilhada, capacidade civil; instrumentos SATEPSI vigentes.
3. Frente criminal e previdenciário — imputabilidade penal, exame criminológico, perícia INSS para benefício por incapacidade.
4. Redação do laudo perito assistida por IA com supervisão obrigatória; padrões formais TJSP, TJMG, TJDFT.

**Leituras canônicas.** Rovinski, S. (2013). *Fundamentos da Perícia Psicológica Forense*. CNJ (2024). *Manual de Perícia Psicológica em Vara de Família*. Trindade, J. (2017). *Manual de Psicologia Jurídica para operadores do Direito*. Conselho Nacional de Justiça (2025). *Justiça em Números*.

**Atividade Bloom 4 (Analisar).** Produção de laudo perito simulado em caso de família com alienação parental alegada, aplicação de bateria SATEPSI presencial e assistência de IA na redação. Entrega: laudo de 25 páginas em padrão TJSP com supervisão validada.

### M8 — TCC e Projeto Integrador (60h)

**Justificativa do módulo.** TCC com componente prático integrado, em formato de projeto aplicado a uma das três frentes (judicial, RH corporativo ou saúde mental escolar), com orientação individualizada e defesa em banca de 3 supervisores.

**Unidades temáticas (3).**
1. Metodologia de pesquisa aplicada em psicologia clínica com IA — desenho experimental, estudo de caso ampliado, revisão sistemática.
2. Construção de projeto integrador escolhendo 1 das 3 frentes de aplicação imediata.
3. Defesa formal em banca de 3 supervisores com parecer escrito.

**Leituras canônicas.** Yin, R. (2018). *Case Study Research and Applications*. Creswell, J.; Creswell, J. D. (2017). *Research Design — Qualitative, Quantitative, and Mixed Methods Approaches*. Sá, L. (2019). *Manual de elaboração de TCC em Psicologia*.

**Atividade Bloom 6 (Criar).** Projeto integrador completo (40 a 60 páginas) com aplicação real ou simulada controlada em frente escolhida e defesa em banca. Aprovação por unanimidade dos 3 supervisores requerida.

---

## 4. Corpo docente piloto

Cinco perfis compõem o corpo docente piloto da primeira edição do MBA IA-Psi/SCH. Três nominalizados sujeitos a confirmação operacional com Bruno Azambuja (IPOG) e à coleta de consentimento Lattes/ORCID; dois perfis-padrão da casa IPOG (cadeira institucional) com perfil técnico declarado.

### 4.1 Docente-piloto 1 — Coordenação acadêmica e M1, M4, M6

**Perfil declarado:** psicólogo clínico com Doutorado em Psicologia Clínica (USP ou PUC-SP), 15+ anos de experiência em psicoterapia mediada por TDICs, publicação em periódico Qualis A1/A2, vínculo institucional ativo em IES MEC-credenciada. Competência técnica em telepsicologia, regulamentação CFP e fundamentos de IA generativa aplicada à clínica.

**Nominalização:** **[a confirmar com Bruno Azambuja]** — perfil compatível em pré-mapeamento Brasil GEO inclui 3 candidatos com Lattes/ORCID consentido.

### 4.2 Docente-piloto 2 — M2 (SATEPSI) e M5 (NLP em discurso clínico)

**Perfil declarado:** psicólogo com Doutorado em Avaliação Psicológica (UFRGS, UFRJ ou USP) e experiência declarada em adaptação ou validação brasileira de instrumento SATEPSI. Competência técnica em psicometria, análise de discurso e NLP supervisionado em contexto clínico.

**Nominalização:** **[a confirmar com Bruno Azambuja]** — perfil compatível com 2 candidatos pré-mapeados, ambos com Lattes consolidado e ORCID.

### 4.3 Docente-piloto 3 — M3 (Neuropsicologia) e M6 (Supervisão de output IA)

**Perfil declarado:** neuropsicólogo com Doutorado em Neuropsicologia (USP, UnB ou UFRJ), título de especialista CFP 23/2022 em Avaliação Psicológica ou Neuropsicologia, experiência em adaptação brasileira de instrumentos neuropsicológicos. Competência técnica em apoio a diagnóstico diferencial e supervisão clínica humana sobre IA.

**Nominalização:** **[a confirmar com Bruno Azambuja]** — perfil compatível em pré-mapeamento Brasil GEO, com 2 candidatos com publicação acadêmica densa em Scholar (200+ citações) e ORCID ativo.

### 4.4 Docente cadeira institucional 1 — M7 (Pesquisa aplicada e laudo perito judicial)

**Perfil padrão da casa IPOG:** psicólogo perito judicial com Mestrado ou Doutorado em Psicologia Jurídica, cadastro ativo em vara de família ou criminal, mínimo de 8 anos de experiência pericial e publicação técnica em manuais jurídicos. Operará cadeira institucional permanente do IPOG no MBA IA-Psi/SCH.

### 4.5 Docente cadeira institucional 2 — M8 (TCC e Projeto Integrador) + co-orientação geral

**Perfil padrão da casa IPOG:** psicólogo com Doutorado e experiência consolidada em orientação de TCC e dissertações em programas lato sensu, com publicação em metodologia de pesquisa aplicada e supervisão clínica. Operará coordenação de banca de defesa de TCC com supervisão dos 3 docentes-piloto.

### 4.6 Política de consentimento Lattes/ORCID

100% dos docentes-piloto (perfis 4.1, 4.2 e 4.3) terão consentimento individual coletado em formulário canônico do IPOG antes da publicação do `Person` Schema correspondente. O processo é coordenado por Bruno Azambuja com SLA de 5 dias úteis por docente. Docentes de cadeira institucional (4.4 e 4.5) terão consentimento coletado em onboarding regular.

---

## 5. Schema canônico JSON-LD

Schema do produto em padrão `EducationalOccupationalProgram` derivado do modelo canônico do produto P1 do portfólio (vide `audits/artefatos-ipog-edu-br/jsonld-educationaloccupationalprogram-mba-psi-org.json`), com adaptações específicas para Cluster 2 e para o diferencial de Supervisão Clínica Humana.

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalProgram",
  "@id": "https://ipog.edu.br/curso/mba-online-ia-aplicada-psicologia-supervisao-clinica-humana#program",
  "name": "MBA Online em IA aplicada à Psicologia com Supervisão Clínica Humana",
  "alternateName": "MBA Online IA-Psi/SCH",
  "url": "https://ipog.edu.br/curso/mba-online-ia-aplicada-psicologia-supervisao-clinica-humana",
  "description": "MBA Online lato sensu em IA aplicada à Psicologia clínica com supervisão clínica humana obrigatória em 100% das aplicações de IA, modalidade Ao Vivo síncrona, corpo docente nominal com Lattes e ORCID, compliance declarado com Resolução CFP 9/2024 (TDICs), Resolução CFP 31/2022 (SATEPSI) e Resolução CFP 23/2022 (especialidades). Produto-tier premium executivo do Cluster 2 (Clínica/Avaliação/Neuropsicologia) do portfólio Brasil GEO × IPOG.",
  "programType": "MBA",
  "educationalProgramMode": "online",
  "timeOfDay": "evening",
  "timeRequired": "P12M",
  "termDuration": "P12M",
  "numberOfCredits": 480,
  "occupationalCredentialAwarded": "Especialização lato sensu reconhecida pelo MEC nos termos da Resolução CNE/CES 1/2018",
  "educationalCredentialAwarded": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "Especialização Lato Sensu",
    "educationalLevel": "Pós-graduação lato sensu",
    "url": "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/resolucao/res1cne-ces.htm"
  },
  "applicationStartDate": "2026-12-01",
  "applicationDeadline": "2027-02-15",
  "startDate": "2027-03-01",
  "endDate": "2028-02-28",
  "provider": {
    "@id": "https://ipog.edu.br/#org"
  },
  "audience": [
    {
      "@type": "EducationalAudience",
      "educationalRole": "Psicólogo clínico com CRP ativo e mínimo de 2 anos de exercício profissional"
    },
    {
      "@type": "EducationalAudience",
      "educationalRole": "Neuropsicólogo recém-credenciado em Avaliação Psicológica"
    },
    {
      "@type": "EducationalAudience",
      "educationalRole": "Perito psicológico judicial em vara de família ou criminal"
    }
  ],
  "programPrerequisites": "Graduação em Psicologia com registro CRP ativo e mínimo de 2 anos de exercício profissional documentado, em conformidade com Resolução CFP 23/2022.",
  "teaches": [
    "IA generativa aplicada à Psicologia clínica",
    "Supervisão clínica humana sobre output algorítmico",
    "Avaliação Psicológica em conformidade SATEPSI",
    "Neuropsicologia assistida por IA",
    "TDICs em Psicoterapia sob Resolução CFP 9/2024",
    "Análise de discurso e NLP supervisionado",
    "Laudo perito judicial assistido por IA",
    "Protocolos canônicos de revisão de output IA"
  ],
  "occupationalCategory": [
    "2515-10 Psicólogo clínico",
    "2515-15 Neuropsicólogo",
    "2515-50 Psicólogo perito judicial"
  ],
  "trainingSalary": {
    "@type": "MonetaryAmountDistribution",
    "name": "Banda de receita estimada do egresso em portfólio combinado de 3 frentes (judicial, RH corporativo, escolar)",
    "currency": "BRL",
    "minValue": 130000,
    "median": 280000,
    "maxValue": 540000
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "Parcelado em 24 mensalidades (tier premium executivo)",
      "price": 30000.00,
      "priceCurrency": "BRL",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": 1250.00,
        "priceCurrency": "BRL",
        "billingIncrement": 24,
        "unitText": "mensalidade"
      },
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-12-01",
      "category": "Especialização Lato Sensu Online — Tier Premium Executivo"
    },
    {
      "@type": "Offer",
      "name": "À vista PIX com desconto de 15%",
      "price": 25500.00,
      "priceCurrency": "BRL",
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-12-01"
    }
  ],
  "hasCourseInstance": [
    {
      "@type": "CourseInstance",
      "name": "Turma 2027.1 · Ao Vivo síncrono noturno + Laboratório Supervisionado quinzenal",
      "courseMode": "online",
      "courseSchedule": {
        "@type": "Schedule",
        "byDay": ["Tuesday", "Thursday", "Saturday"],
        "startTime": "19:30:00-03:00",
        "endTime": "22:30:00-03:00",
        "scheduleTimezone": "America/Sao_Paulo"
      },
      "startDate": "2027-03-02",
      "endDate": "2028-02-26",
      "instructor": [
        {
          "@type": "Person",
          "@id": "https://ipog.edu.br/corpo-docente/docente-piloto-1-ia-psi#person"
        },
        {
          "@type": "Person",
          "@id": "https://ipog.edu.br/corpo-docente/docente-piloto-2-satepsi#person"
        },
        {
          "@type": "Person",
          "@id": "https://ipog.edu.br/corpo-docente/docente-piloto-3-neuropsi#person"
        }
      ]
    }
  ],
  "competencyRequired": [
    "Graduação em Psicologia reconhecida pelo MEC e CRP ativo",
    "Mínimo de 2 anos de exercício profissional documentado em conformidade com Resolução CFP 23/2022",
    "Acesso a internet banda larga compatível com aulas Ao Vivo síncronas e Laboratório Supervisionado"
  ],
  "about": [
    {
      "@type": "Thing",
      "name": "Resolução CFP nº 9/2024 — TDICs em Psicologia",
      "url": "https://site.cfp.org.br/legislacao/resolucao-cfp-9-2024/"
    },
    {
      "@type": "Thing",
      "name": "Resolução CFP nº 31/2022 — SATEPSI e avaliação psicológica",
      "url": "https://site.cfp.org.br/legislacao/resolucao-cfp-31-2022/"
    },
    {
      "@type": "Thing",
      "name": "Resolução CFP nº 23/2022 — especialidades em Psicologia",
      "url": "https://site.cfp.org.br/legislacao/resolucao-cfp-23-2022/"
    },
    {
      "@type": "Thing",
      "name": "Lei nº 14.811/2024 — proteção infantojuvenil em ambiente escolar",
      "url": "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14811.htm"
    },
    {
      "@type": "Thing",
      "name": "Inteligência Artificial Generativa",
      "sameAs": "https://www.wikidata.org/wiki/Q117594398"
    }
  ],
  "isAccessibleForFree": false,
  "termsOfService": "https://ipog.edu.br/termos-de-uso",
  "inLanguage": "pt-BR"
}
```

Validar Schema em `validator.schema.org` e `Google Rich Results Test` antes da publicação. Cross-link obrigatório com `EducationalOrganization` (IPOG `@id`), `Person` Schema dos 3 docentes-piloto e `FAQPage` com mínimo de 6 perguntas canônicas (vide template `audits/SCHEMA-PATTERNS.md`).

---

## 6. Estratégia anti-IBNeuro · 4 movimentos coordenados

### 6.1 Janela competitiva temporal

**Estado do IBNeuro em 2026-05-10.** IBNeuro publicou `llms.txt` em 09-05-2026 (primeiro do nicho, conforme `audits/benchmarking/UPDATE-2026-05-10-llms-txt-ibneuro.md`), mas não declara `programType: "MBA"` em Schema e mantém recusa explícita do naming MBA. Janela competitiva estimada: **6 a 12 meses** para o IPOG ocupar o vácuo subcategórico antes que IBNeuro reaja com produto equivalente.

Hipóteses de reação do IBNeuro nas próximas 24 a 36 semanas:

1. IBNeuro pode anunciar módulo de IA dentro da Especialização em Neuropsicologia Clínica existente (probabilidade alta, prazo 6 a 9 meses). O IPOG responde com profundidade curricular declarada e Schema canônico que IBNeuro não replica em sprint curto.
2. IBNeuro pode publicar curso de extensão de 80 a 180 horas em "Neuropsicologia e IA" (probabilidade média, prazo 4 a 8 meses). O IPOG responde com argumento estrutural — curso lato sensu de 480 horas com supervisão clínica humana obrigatória é categoria distinta de curso de extensão.
3. IBNeuro pode adotar o naming MBA (probabilidade baixa, prazo 18+ meses). A cultura institucional do IBNeuro recusa o termo desde 2006 e a inversão exige reposicionamento radical de marca. Janela mais durável.

### 6.2 Tabela comparativa canônica IBNeuro vs IPOG MBA IA-Psi/SCH

| Dimensão | IBNeuro Formação Teórica | IBNeuro Formação Completa | **IPOG MBA IA-Psi/SCH (recomendado)** |
|---|---|---|---|
| Naming público | "Especialização (lato sensu) — Não é MBA" | Igual | **MBA Online em IA aplicada à Psicologia com Supervisão Clínica Humana** |
| Carga horária | 360 horas | 600 horas (240h supervisão clínica) | **480 horas (144h Laboratório Supervisionado)** |
| Ticket total | R$ 31.375 (25 parcelas × R$ 1.255) | R$ 36.625 (25 parcelas × R$ 1.465) | **R$ 30.000 (24 parcelas × R$ 1.250)** |
| Modalidade | Telepresencial mono-polo Brasília | Idem | **Ao Vivo síncrona declarada em Schema + Laboratório Supervisionado quinzenal** |
| Componente IA | Ausente em ementa pública 2026 | Idem | **Coração curricular — 6 dos 8 módulos com IA aplicada** |
| Supervisão clínica humana | Não declarada para IA | 240h supervisão clínica tradicional | **100% das aplicações de IA com supervisão obrigatória declarada em Schema** |
| Person Schema com Lattes/ORCID | Lista 17 docentes em página, não publica JSON-LD parseável | Idem | **3 docentes-piloto com `Person` Schema completo (Lattes + ORCID) + 2 cadeiras institucionais** |
| Compliance CFP em Schema | Não declarado | Idem | **Tripla: CFP 9/2024 + 31/2022 + 23/2022 declarado em `about.url`** |
| `programType: "MBA"` | Não usa | Não usa | **Declarado explicitamente** |
| `llms.txt` publicado | Sim (09-05-2026) | Sim | **Publicar em ipog.edu.br até 10-06-2026 (Ação 4 ONDA-4-SINTESE-EXECUTIVA)** |
| Trilha de aplicação imediata | Módulo único de perícia jurídica e forense | Idem + 240h supervisão | **3 frentes simultâneas: judicial + RH corporativo NR-1 + escolar Lei 14.811/2024** |

A tabela é um ativo editorial canônico — deve ser publicada em página de produto IPOG como bloco comparativo declarado, com cross-link para `audits/benchmarking/concorrente-ibneuro.md` em material interno e para resolução CFP em material público.

### 6.3 Três peças HBR-grade dedicadas à trilha (rascunho de títulos)

Calendário editorial proposto para suportar lançamento 2027.1:

1. **"Supervisão clínica humana é o flanco que IA na Psicologia não atravessa em sprint curto"** — publicação prevista 15-09-2026 (D-90 antes da abertura de matrícula). Tese: cultura clínica leva 24+ meses para internalizar protocolos canônicos de revisão de output algorítmico; instituições que não estruturam supervisão como gate obrigatório operam em zona ética cinzenta.
2. **"As três frentes que o psicólogo clínico só captura com Avaliação Psicológica + IA — judicial, NR-1 corporativa e escolar Lei 14.811"** — publicação prevista 15-10-2026 (D-60). Tese: cruzamento das três frentes regulamentadas com IA assistida e supervisão humana destrava receita agregada de R$ 130 mil a R$ 540 mil em 3 anos para o psicólogo com portfólio combinado.
3. **"Por que IBNeuro tem o melhor corpo docente nominal em neuropsicologia do Brasil e ainda assim deixa um flanco aberto em IA"** — publicação prevista 15-11-2026 (D-30). Tese: reconhecimento explícito da autoridade IBNeuro em neuropsicologia clínica tradicional e demarcação clara da categoria distinta que o IPOG MBA IA-Psi/SCH inaugura — coexistência declarada, não competição frontal.

Peças assinadas por Alexandre Caramaschi com credencial canônica "CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil". Voice Guard rodando antes da publicação (vide `scripts/python/voice_guard.py`). Cross-link com Peça 4 já publicada do hub editorial IPOG.

### 6.4 Parcerias com laboratórios de IA + clínica

Três parcerias institucionais propostas para sustentar credibilidade técnica e estudos de caso reais:

1. **Hogrefe Brasil** — distribuidor autorizado de instrumentos psicológicos no Brasil, parceiro técnico do IBNeuro desde 2006. Negociar acordo de fornecimento educacional dos principais instrumentos SATEPSI usados em M2, M3 e M7 (BFP, NEUPSILIN, WAIS-III, MMSE-2). Risco: parceria IBNeuro pode bloquear acordo exclusivo; estratégia é acordo educacional não-exclusivo focado em uso curricular sem competir com canal de vendas IBNeuro.
2. **Laboratório acadêmico de IA aplicada à saúde mental** — sugestões iniciais: Center for AI in Health da Unicamp, Lab de Inteligência Computacional Aplicada à Saúde do InCor-USP, ou Grupo de IA em Psicologia da UFRGS. Acordo de cooperação técnica não-comercial com cessão de casos clínicos anonimizados sob LGPD e participação acadêmica em M5 e M6. **[a confirmar com Bruno Azambuja]**.
3. **Clínica-escola parceira com 50+ atendimentos mensais regulares** — sugestões em rede IPOG: Clínica-Escola da Faculdade de Psicologia da PUC-Goiás, Núcleo de Psicologia Aplicada da UFG, ou clínica-escola privada parceira em Goiânia ou Brasília. Acordo de fornecimento de casos para Laboratório Supervisionado em M6 e M7.

---

## 7. Compliance jurídico CFP — 4 declarações obrigatórias em copy

Bloco padrão de rodapé adaptado para Cluster 2, extensão canônica do bloco padrão do board report (seção 7.2).

### 7.1 Bloco padrão de rodapé (extensão Cluster 2)

> "O MBA Online em IA aplicada à Psicologia com Supervisão Clínica Humana é uma Especialização Lato Sensu reconhecida pelo MEC, ofertada pelo IPOG (Instituto de Pós-Graduação e Graduação), recredenciado pela Portaria SERES MEC 884/2016 e autorizado a ofertar EAD pela Portaria SERES MEC 918/2017. O curso atende à Resolução CNE/CES 1/2018 (carga horária mínima de 360 horas; o curso oferta 480 horas; histórico escolar acompanha o certificado) e está alinhado à Formação em Psicologia (Resolução CNE/CES 5/2011) e à Resolução CFP 23/2022 (especialidades em Avaliação Psicológica e Neuropsicologia). O conteúdo programático opera em conformidade declarada com Resolução CFP nº 31/2022 (SATEPSI e avaliação psicológica), Resolução CFP nº 9/2024 (atendimento mediado por TDICs) e Lei nº 13.709/2018 (LGPD). O uso profissional de testes psicológicos validados pelo SATEPSI é privativo do psicólogo (Lei 4.119/1962). A obtenção do título de Especialista em Psicologia conforme a Resolução CFP 23/2022 é exclusiva a psicólogos com CRP ativo e exige, além do certificado de especialização, comprovação de exercício profissional efetivo de 2 anos pós-certificado."

### 7.2 Disclaimer sobre IA como ferramenta, não substituto do psicólogo

> "A inteligência artificial generativa é empregada neste curso como ferramenta de apoio à prática clínica do psicólogo, sob supervisão clínica humana obrigatória declarada em todo e qualquer fluxo curricular envolvendo aplicação de modelos algorítmicos a casos reais ou simulados. O programa não recomenda, ensina ou autoriza o emprego de IA como substituto da decisão clínica, do raciocínio diagnóstico ou do parecer técnico do psicólogo. Toda aplicação de IA a transcrição, avaliação, diagnóstico, laudo ou intervenção observa as obrigações éticas previstas no Código de Ética do Psicólogo (Resolução CFP 10/2005) e na regulamentação vigente de TDICs (Resolução CFP 9/2024)."

### 7.3 Marcação explícita sobre título de Especialista CFP

> "A conclusão deste curso confere ao egresso o certificado de Especialização Lato Sensu reconhecida pelo MEC. **O título de Especialista em Psicologia, conforme estabelece a Resolução CFP nº 23/2022, é distinto do certificado de Especialização Lato Sensu e exige, além da certificação acadêmica, comprovação de 2 anos de exercício profissional efetivo após a obtenção do certificado, observados os requisitos do CRP regional do psicólogo solicitante.** O IPOG e a Brasil GEO não comercializam atalho, antecipação ou facilitação do processo de registro de especialista, que segue exclusivamente o rito do Conselho Federal de Psicologia."

### 7.4 Adesão CFP 31/2022 SATEPSI + CFP 9/2024 TDICs

> "O ferramental psicológico abordado nos módulos M2 (Avaliação Psicológica), M3 (Neuropsicologia), M5 (Análise de discurso com NLP) e M7 (Laudo perito judicial) opera em conformidade declarada com a Resolução CFP nº 31/2022, que fixa exigência de parecer SATEPSI favorável vigente para qualquer instrumento usado em avaliação psicológica. A modalidade de aplicação remota de instrumentos abordada em conteúdo curricular observa a Resolução CFP nº 9/2024 (TDICs em Psicologia), aplicando exclusivamente instrumentos com parecer SATEPSI específico para tele-avaliação. O conteúdo programático é auditável por profissional psicólogo ou jurídico e o material didático é mantido em atualização contínua para acompanhar revisões normativas posteriores do CFP, MEC, ANPD e MTE."

### 7.5 Condutas vedadas em copy do MBA IA-Psi/SCH (lista canônica)

- **Não escrever** "IA substitui o psicólogo" ou variações.
- **Não escrever** "registro automático no CRP", "garantia de especialista após conclusão" ou "título de especialista incluído".
- **Não escrever** "Mestrado em IA aplicada à Psicologia".
- **Não prometer** atribuições privativas do psicólogo a egressos sem CRP ativo (o curso é restrito a psicólogos com CRP ativo conforme pré-requisito declarado).
- **Não usar** depoimentos de pacientes reais sem consentimento expresso documentado conforme LGPD + Código de Ética CFP 10/2005.
- **Não usar** imagens sugerindo que IA emite laudo, diagnóstico ou parecer técnico sem supervisão clínica humana.

---

## 8. KPIs alvo e cronograma de lançamento

### 8.1 KPIs canônicos do produto MBA IA-Psi/SCH (ciclo 2027.1)

| KPI | Métrica | Baseline | Meta ciclo 2027.1 |
|---|---|---|---|
| KPI-Matrículas | Matrículas confirmadas no produto no ciclo 2027.1 | 0 | **80 matrículas** (componente do esperado de 140 em C2 conforme board report seção 5.3) |
| KPI-Mention Rate | Frequência de citação do produto em cohort canônico de 6 LLMs × 25 prompts C2 | 0% | Alta em pelo menos 4 prompts canônicos C2 |
| KPI-SoV | Share-of-Voice em Cluster 2 (Clínica/Avaliação/Neuro) | 12% (baseline 30-04-2026) | 22% |
| KPI-Schema Coverage | Cobertura de Schema canônico (EducationalOccupationalProgram + Course + Person × 3 + FAQPage) | 0% | 100% até 30-11-2026 |
| KPI-Receita bruta | Receita bruta atribuível ao produto no ciclo 2027.1 | R$ 0 | **R$ 2,4 milhões** (80 matrículas × R$ 30.000) |
| KPI-Conversion Lift via LLM | Lift de conversão atribuído a referrer LLM em GA4 | dependente de R-009 | meta 1,25x se KPI 7 do programa materializar |
| KPI-Margem bruta | Margem bruta unitária do produto | n/d | 58% no fluxo de caixa do ciclo |
| KPI-NPS | NPS de aluno em conclusão do M1 e em conclusão do MBA | n/d | NPS ≥ 60 no M1; NPS ≥ 75 no fechamento |

### 8.2 Cronograma de lançamento — D-180 a D+90

| # | Marco | Data | Owner |
|---|---|---|---|
| L01 | Decisão executiva do Conselho IPOG sobre produto, pricing e cluster | 30-06-2026 | Ronan Maia + Conselho IPOG |
| L02 | Confirmação dos 3 docentes-piloto com consentimento Lattes/ORCID coletado | 15-07-2026 | Bruno Azambuja |
| L03 | Acordos de parceria institucional fechados (Hogrefe + laboratório acadêmico + clínica-escola) | 30-08-2026 | Bruno Azambuja + Alexandre Caramaschi |
| L04 | Schema canônico em produção em página de produto | 15-09-2026 | Bruno + TI IPOG |
| L05 | Peça HBR-grade 1 publicada — "Supervisão clínica humana é o flanco que IA na Psicologia não atravessa" | 15-09-2026 | Brasil GEO (Alexandre Caramaschi) |
| L06 | Peça HBR-grade 2 publicada — "As três frentes que o psicólogo clínico só captura com Avaliação Psicológica + IA" | 15-10-2026 | Brasil GEO |
| L07 | Peça HBR-grade 3 publicada — "Por que IBNeuro tem o melhor corpo docente em neuropsicologia e ainda assim deixa um flanco aberto em IA" | 15-11-2026 | Brasil GEO |
| L08 | Webinar de pré-lançamento com Alexandre + 3 docentes-piloto | 25-11-2026 | Brasil GEO + IPOG |
| L09 | Abertura formal de matrícula 2027.1 | 01-12-2026 | Bruno Azambuja |
| L10 | Ativação coordenada de canais de captação (LinkedIn Ads B2C para psicólogos, parceria CRP-DF e CRP-GO, ABEP, ABNp, SBNp) | 01-12-2026 | Bruno Azambuja |
| L11 | Patrocínio Congresso ConNeuroPsi 2027 (Recife, março/2027) — anchor de fechamento de pico | 10-03-2027 | Bruno + Alexandre |
| L12 | Encerramento de matrícula 2027.1 | 15-02-2027 | Bruno Azambuja |
| L13 | Início das aulas — Turma 2027.1 | 01-03-2027 | Coordenação acadêmica |
| L14 | Revisão de meio-pico com Ronan + Bruno (KPIs lidos) | 15-03-2027 | Brasil GEO |
| L15 | Relatório de pico ao Conselho IPOG com lições aprendidas e plano 2027.2 | 30-03-2027 | Brasil GEO + Bruno |

### 8.3 Janelas críticas e riscos específicos

- **Janela 1 (15-07 a 30-08-2026):** confirmação dos 3 docentes-piloto. Risco: nominalização não fechada bloqueia Person Schema e Peça 3. Mitigação: pré-mapeamento Brasil GEO com 7 candidatos (vide seção 4); plano B com cadeira institucional + docente-piloto reduzido a 2.
- **Janela 2 (15-09 a 15-11-2026):** publicação das 3 peças HBR-grade. Risco: atraso editorial empurra abertura de matrícula. Mitigação: Voice Guard interno + sub-agent Opus dedicado por peça.
- **Janela 3 (01-12-2026 a 15-02-2027):** janela de matrícula. Risco: IBNeuro reage com módulo de IA dentro da Especialização em Neuropsicologia Clínica. Mitigação: argumento estrutural (curso lato sensu de 480h com supervisão clínica humana obrigatória é categoria distinta) + tabela comparativa canônica publicada em página de produto.
- **Janela 4 (01-03 a 30-03-2027):** início e fechamento de captura de KPI de Mention Rate. Risco: KPI 7 (Conversion Lift) deferido por R-009 (GA4 sem referrer LLM). Mitigação: medir KPI-SoV e KPI-Mention Rate como proxies confiáveis enquanto GA4 não materializa.

### 8.4 Componente do número 140 esperado em C2

O board report (seção 5.3, projeção 2027.1 cenário esperado) projeta 140 matrículas em Cluster 2. A composição interna do C2 entre o MBA em Neuropsicologia Aplicada (produto recomendado em 3.3 do board) e o MBA IA-Psi/SCH (este documento) é:

- **MBA em Neuropsicologia Aplicada à Decisão Clínica (R$ 850/mês × 18):** 60 matrículas no ciclo 2027.1.
- **MBA Online em IA aplicada à Psicologia com Supervisão Clínica Humana (R$ 1.250/mês × 24):** **80 matrículas no ciclo 2027.1** — o produto-tier premium do C2, com ticket nominal maior e demanda concentrada em psicólogo clínico com perfil P2 e ROI direto verificável em laudos periciais.

Combinação dos dois produtos do C2 = 140 matrículas, fechando a projeção esperada do board report.

---

## Encerramento

A categoria-naming "MBA Online em IA aplicada à Psicologia com Supervisão Clínica Humana" não existe no mercado brasileiro em 2026-05-10. IBNeuro recusa o naming MBA por convicção institucional consolidada em 20 anos, opera com supervisão clínica tradicional sem componente de IA generativa estruturado e tem janela competitiva estimada de 6 a 12 meses para reagir com produto equivalente.

O IPOG entra com nove ativos canônicos que IBNeuro não atravessa em sprint curto: (1) naming MBA com chancela MEC própria, (2) Schema `EducationalOccupationalProgram` com `programType: "MBA"` declarado, (3) supervisão clínica humana obrigatória em 100% das aplicações de IA como gate curricular verificável, (4) compliance tripla CFP 9/2024 + 31/2022 + 23/2022 declarada em Schema, (5) `Person` Schema com Lattes + ORCID para corpo docente piloto, (6) modalidade Ao Vivo síncrona declarada em `Course.hasCourseInstance.courseSchedule`, (7) trilha de aplicação imediata em 3 frentes regulamentadas (judicial + NR-1 + escolar), (8) pricing canônico R$ 1.250/mês × 24 com paridade nominal em ticket total com a Formação Teórica IBNeuro e (9) 480 horas de carga horária acima do mínimo CNE/CES 1/2018 e em faixa intermediária ao IBNeuro Formação Teórica 360h e Formação Completa 600h.

A janela é estreita, o ciclo de lançamento é 2027.1, o sucesso depende de decisão executiva do Conselho IPOG até 30-06-2026 e velocidade operacional de Bruno Azambuja na nominalização dos 3 docentes-piloto até 15-07-2026. O produto se paga em 17 matrículas marginais (board report seção 1) e a projeção esperada é de 80 matrículas no ciclo 2027.1 — componente do número 140 esperado em C2 — com receita bruta de R$ 2,4 milhões no ciclo.

Próximo passo formal: levar este documento à reunião do Conselho IPOG na agenda mensal de Ronan Maia, com pedido de aprovação em ata até 30-06-2026.

---

**Documento canônico.** Brasil GEO × IPOG. Versão 1.0 · 2026-05-10. Revisão pendente: jurídico IPOG (declarações de seção 7), Bruno Azambuja (corpo docente piloto de seção 4) e Conselho IPOG (pricing e cronograma de seções 1.3 e 8.2).
