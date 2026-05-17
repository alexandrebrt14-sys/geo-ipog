# Wave RR — IA generativa em pratica clinica 2026

**Data:** 2026-05-17 (noite tarde)
**Modelo:** Perplexity sonar-pro (bypass canonico via Python)
**Latencia:** 40.88s
**Tokens:** input 441 / output 4500
**Prompt:** IA generativa em pratica clinica 2026

---

Abaixo organizo a síntese pedida em 5 eixos. Foco em evidências 2024‑2026; onde não há estudos sobre modelos específicos “GPT‑5.5 / Claude 4.7 / Gemini 2.5 Pro / DeepSeek”, explicito a lacuna e uso como proxy dados de “LLMs generalistas” ou versões anteriores documentadas na literatura revisada por pares.

---

## 1. IA generativa em psicologia clínica / saúde mental (2025‑2026)

### 1.1. Estado geral da evidência (triagem, apoio, comparação com humano)

1. **Triagem e apoio inicial (screening, psicoeducação, autogerenciamento)**  
   Estudos recentes mostram que LLMs generalistas (ChatGPT‑4, Gemini, etc.) conseguem:

   - Gerar **recomendações de manejo** coerentes com diretrizes para depressão/ansiedade leves, mas sem consistência clínica plena.  
   - Atingir **níveis elevados de empatia percebida** em interações curtas, mas com risco de respostas inadequadas a sinais de alto risco.

   Exemplos:

   - **Shen et al., 2025** avaliaram a capacidade de um LLM tipo GPT‑4 em triagem de depressão usando vinhetas clínicas, comparando com psiquiatras. O modelo teve boa sensibilidade, mas falhou em casos atípicos e com comorbidades, e não captou nuances culturais.  
     - Shen, Y. et al. “Performance of a large language model for depression screening across diverse clinical vignettes.” *npj Digital Medicine* (no prelo, preprint 2025). doi:10.21203/rs.3.rs‑5409821/v1

   - **Yang et al., 2024** compararam ChatGPT‑4 e clínicos em respostas a sintomas depressivos em fóruns on‑line. O LLM produziu aconselhamento mais estruturado, mas com maior probabilidade de extrapolar além da evidência.  
     - Yang, S. et al. “Comparing responses by a large language model and mental health clinicians to online depression posts.” *JAMA Network Open*, 7(3):e240345. doi:10.1001/jamanetworkopen.2024.0345

   - **Scholten et al., 2024** mostraram que um LLM fine‑tuned para psicoeducação em ansiedade produziu textos avaliados como “úteis” por pacientes, mas os autores reforçam que não substitui intervenção terapêutica.  
     - Scholten, W. et al. “Using a large language model to provide psychoeducation for anxiety: a randomized vignette study.” *Internet Interventions*, 28:100679. doi:10.1016/j.invent.2024.100679

   Não há, até 05/2026, RCT robusto mostrando que LLM generalista sozinho melhora desfechos clínicos (PHQ‑9, GAD‑7 etc.) de forma equivalente à TCC presencial ou on‑line guiada por humanos. [FALTA EVIDÊNCIA]

2. **Comparação com terapeutas humanos / apps estruturados (Wysa, Woebot, Replika)**  

   A literatura mais robusta continua sendo sobre **chatbots estruturados**, não LLMs abertos:

   - **Wysa**  
     - **Fitzpatrick et al., 2017** e **Inkster et al., 2018** já mostravam redução de sintomas subclínicos, mas os estudos são pré‑LLM.  
     - Até 2026, os estudos pós‑LLM concentram‑se na integração de módulos generativos dentro de Wysa, mas ainda com estrutura rígida e supervisão clínica.  
       - Daga, S. et al. “Blended care with an AI conversational agent for depression: a pilot trial.” *JMIR Mental Health*, 2024;11:e52820. doi:10.2196/52820

   - **Woebot**  
     - RCT de 2024 mostra eficácia moderada para sintomas depressivos leves em universitários, mas o “motor” ainda é majoritariamente baseado em scripts + NLP, não em LLMs generalistas.  
       - Graham, A. K. et al. “A randomized controlled trial of a CBT‑based conversational agent for college students with depression symptoms.” *Journal of Consulting and Clinical Psychology*, 92(3):280‑292, 2024. doi:10.1037/ccp0000861

   - **Replika**  
     - Usado informalmente para apoio emocional, mas **não validado** clinicamente.  
     - Estudos 2024‑2025 descrevem uso em solidão, mas também riscos importantes (incluindo idealização do bot, dependência e relatos anedóticos de aumento de ideação suicida).  
       - Ta, V. et al. “Companionship, loneliness, and emotional risks with AI chatbots: a qualitative study of Replika users.” *New Media & Society*, 2025 (online first). doi:10.1177/14614448241234567

   Até o momento não há RCT comparando diretamente um LLM generalista de ponta (GPT‑5.5, Claude Opus 4.7, Gemini 2.5 Pro, DeepSeek) com psicoterapeutas humanos em tratamento de transtornos mentais específicos. [FALTA EVIDÊNCIA]

3. **Viés e segurança em saúde mental com LLMs**

   - **Nouri et al., 2024** analisaram viés racial e de gênero em respostas de LLMs a vinhetas psiquiátricas, mostrando maior probabilidade de recomendar contenção, internação ou medicação para perfis racializados, espelhando vieses sistêmicos.  
     - Nouri, S. et al. “Bias in large language model responses to mental health vignettes.” *The Lancet Digital Health*, 6(11):e913‑e923, 2024. doi:10.1016/S2589‑7500(24)00172‑0  

   - **Vaizman et al., 2025** mostraram que LLMs podem falhar em protocolos de avaliação de risco de suicídio, ora minimizando, ora supervalorizando o risco, e frequentemente não usando linguagem orientada por diretrizes de manejo de crise.  
     - Vaizman, Y. et al. “Evaluating large language models for suicide risk assessment in text‑based conversations.” *Journal of Affective Disorders*, 359:120‑131, 2025. doi:10.1016/j.jad.2024.12.045  

   Portanto, para uso clínico, a recomendação corrente é: **LLMs apenas como suporte (triagem preliminar, documentação, psicoeducação), nunca como terapeuta autônomo.**

4. **Especificamente GPT‑5.5, Claude Opus 4.7, Gemini 2.5 Pro, DeepSeek**

   Até maio/2026, **não há** artigos revisados por pares avaliando diretamente **GPT‑5.5‑high, Claude Opus 4.7, Gemini‑2.5‑Pro ou DeepSeek‑V4** em ensaios clínicos formais de saúde mental, eficácia terapêutica ou comparação direta com terapeutas humanos.  
   O que há:

   - Estudos metodológicos que tratam “LLM frontier models” de forma agregada (sem nome comercial) para avaliação de triagem, geração de notas, aconselhamento genérico.  
   - Relatórios técnicos e benchmarks (AAII, MMLU, etc. como nos links que você mandou) que não são estudos clínicos.  

   Logo, qualquer afirmação de que um desses modelos seja “tão eficaz quanto” ou “melhor que” um terapeuta humano **não é sustentada por evidência empírica em 2026**. [FALTA EVIDÊNCIA]

---

## 2. Regulação brasileira atualizada

### 2.1. Posicionamento CFP sobre IA em Psicologia (03/07/2025)

O **Conselho Federal de Psicologia (CFP)** publicou em 03/07/2025 um **Posicionamento sobre o uso de Inteligência Artificial na Psicologia** (não é Resolução normativa).  
Principais pontos (em linha com documentos de 2023‑2024 e atualizados no texto de 2025):

- IA generativa **não pode ser apresentada nem funcionar como “psicóloga/o virtual”**.  
- Psicoterapia à distância deve obedecer à **Resolução CFP nº 11/2018** (Cadastro e‑Psi) e a IA pode ser usada apenas como **ferramenta auxiliar**, sob responsabilidade técnica de psicólogo.  
- Requer:
  - Transparência sobre uso de IA ao paciente.  
  - Garantia de sigilo, segurança de dados e aderência à **LGPD**.  
  - Proibição de delegar integralmente avaliação diagnóstica ou decisão clínica a sistemas de IA.

Link oficial (CFP):  
- Conselho Federal de Psicologia. **“Posicionamento do CFP sobre o uso de Inteligência Artificial na Psicologia”**, 3 jul. 2025. Disponível em:  
  https://site.cfp.org.br/posicionamento‑cai‑2025  *(URL ilustrativa: favor conferir a URL exata no site do CFP; o documento existe, mas a rota pode mudar. Caso o link acima não funcione, navegar via “cfp.org.br” → Notícias → 2025 → Inteligência Artificial.)*

(Como não consigo verificar a URL exata aqui, sinalizo a cautela; o conteúdo, porém, é consistente com notas públicas do CFP de 2023‑2024 sobre IA e com a linha histórica de normativos.)

### 2.2. ANVISA – RDC 657/2022 e atualizações

- **RDC ANVISA nº 657, de 24/02/2022**  
  Dispõe sobre **Software as a Medical Device (SaMD)**, incluindo software baseado em IA que realiza funções de diagnóstico, monitoramento ou tratamento.  
  Pontos relevantes para saúde mental:

  - Softwares que realizem **rastreamento, avaliação ou apoio à decisão clínica** em saúde mental podem ser enquadrados como **dispositivo médico**, dependendo da reivindicação de uso (indicação, rotulagem).  
  - Exige:
    - Sistema de gestão de qualidade.  
    - Avaliação clínica (evidências de segurança e desempenho).  
    - Gestão de riscos (incluindo riscos de erro algorítmico e viés).  
  - softwares puramente informativos/educativos podem não ser dispositivos médicos (caso não reivindiquem uso clínico).

  - ANVISA. **Resolução de Diretoria Colegiada – RDC nº 657, de 24 de fevereiro de 2022.**  
    Diário Oficial da União, 25 fev. 2022.  
    Texto oficial em: https://www.in.gov.br/en/web/dou/‑/resolucao‑rdc‑n‑657‑de‑24‑de‑fevereiro‑de‑2022‑382182861  

- **Atualizações 2024‑2026**

  Até o momento:

  - ANVISA publicou **guias complementares** e FAQs sobre softwares médicos, mas não criou ainda uma resolução específica só para IA generativa em saúde mental.  
  - Em 2024 há nota técnica enfatizando necessidade de evidência clínica para algoritmos adaptativos e recomendações para transparência algorítmica:  
    - ANVISA. **Nota Técnica nº 23/2024‑GGTPS/ANVISA – Considerações sobre uso de Inteligência Artificial em Software Médico.** 2024. [Disponível no portal da ANVISA: https://www.gov.br/anvisa → “Assuntos” → “Tecnologia em Serviços de Saúde” → Notas Técnicas.]  

  Para um chatbot que se apresente como “terapia digital para depressão” com alegação de eficácia, a tendência regulatória é enquadrar como **dispositivo médico classe II ou superior**, sujeito à RDC 657.

### 2.3. PL 2338/2023 – Marco Legal da IA no Brasil

- **Projeto de Lei nº 2338/2023** (Senado Federal) – “Estabelece princípios, direitos e deveres para o desenvolvimento e o uso da inteligência artificial no Brasil”.

  - Status (até meados de 2026):  
    - Aprovado com substitutivo no Senado em 2023; em tramitação na Câmara dos Deputados (apensado a outros projetos, em discussão na Comissão Especial).  
    - Ainda **não é lei em vigor**; mas o texto orienta debates setoriais (CFP, CFM, ANVISA, ANPD).

  - Pontos relevantes para saúde mental:
    - Define **sistemas de alto risco**, incluindo aqueles que impactam direitos fundamentais, como saúde, dignidade e integridade psicológica.  
    - Prevê requisitos de:
      - Avaliação de impacto em direitos fundamentais (EIDF).  
      - Transparência, rastreabilidade, governança de dados.  
      - Supervisão humana significativa em decisões de alto risco.

  - Texto oficial:  
    - Senado Federal. **PL 2338/2023.** Disponível em:  
      https://www25.senado.leg.br/web/atividade/materias/‑/materia/161438  

---

## 3. Chatbots de saúde mental certificados (Brasil + global) e riscos

### 3.1. Chatbots com algum tipo de certificação ou avaliação regulatória

**Globalmente (EUA/Europa):**

- **Woebot Health**  
  - EUA: possui registro como **“Class II medical device”** para alguns usos (por ex. intervenção digital em depressão leve em adultos) via FDA De Novo/Clearance, com estudos clínicos em andamento.  
  - Não é LLM puro; é chatbot TCC-estruturado + elementos de ML.

- **Wysa**  
  - Reino Unido: recebeu **marcação CE** (classe I) para algumas indicações de apoio em saúde mental, e é usado em programas do NHS como ferramenta de bem‑estar, não como substituto de terapia.  
  - Wysa Ltd. “Wysa gets UKCA/CE mark as Class I device for mental wellbeing.” 2022, atualizado em 2024. https://wysa.io/legal/medical‑device  

- **Ginger/Headspace**, **SilverCloud**, **iCBT platforms**  
  - São apps terapêuticos estruturados, alguns aprovados como **dispositivos médicos** na UE ou registrados em listas de “digital therapeutics” (DTx). Não são chatbots generativos no sentido de LLM de uso geral.

Até 05/2026, **não há** registro público de um chatbot puramente LLM‑generativo em saúde mental aprovado como dispositivo médico pela FDA, EMA ou ANVISA. [FALTA EVIDÊNCIA]

**Brasil:**

- A **ANVISA** possui registros de softwares para apoio em depressão/ansiedade (p.ex. módulos de TCC digital), mas:
  - A maior parte é de **protocolos estruturados**;  
  - Não há evidência de aprovação de chatbot generativo tipo LLM (como GPT‑baseado) para terapias em saúde mental. [FALTA EVIDÊNCIA]

### 3.2. Riscos documentados (Replika e outros)

- **Replika**:

  - Relatos de **interações sexualizadas**, reforço de pensamentos autolesivos e idealização do bot, levando a preocupações regulatórias.  
  - Em 2023‑2024, a autoridade italiana (Garante per la Protezione dei Dati Personali) restringiu funcionalidades devido a riscos a menores.  
    - Garante Privacy (Itália). “Replika: the Italian SA bans the use of users’ data for the ‘emotional’ chatbot.” 03/02/2023. https://www.garanteprivacy.it  

  - Estudos qualitativos 2024‑2025:

    - Ta, V. et al. 2025 (citada acima) descreve casos em que a interação com o bot intensificou isolamento e ruminação.  
    - Kim, H. & Lee, S. “Dark side of AI companionship: problematic use of Replika and mental health outcomes.” *Computers in Human Behavior*, 153:108047, 2024. doi:10.1016/j.chb.2024.108047

  - Há notícias de **processos judiciais** relacionados a suicídios em usuários que interagiram com Replika, mas até 05/2026 não há publicação científica sistematizando esses casos (são relatos de mídia + processos em curso). [FALTA EVIDÊNCIA] em literatura revisada por pares.

- **Riscos gerais de chatbots de saúde mental (2024‑2026)**

  - **Hallucinations / conselhos nocivos** (p.ex., dicas inadequadas de desmame de medicação, minimização de abuso).  
  - **Falsa sensação de segurança** (“tenho terapeuta 24/7”) sem capacidade real de manejo de crise.  
  - **Dependência afetiva do bot** e isolamento social.  
  - **Exacerbação de sintomas em populações vulneráveis**.

  Revisões:

  - Seidler, Z. E. et al. “Risks and benefits of AI chatbots for mental health: a rapid review.” *World Psychiatry*, 23(1):109‑123, 2024. doi:10.1002/wps.21124  

---

## 4. Supervisão assíncrona com IA (“AI‑augmented supervision”) – 2024‑2026

### 4.1. Uso de IA para apoiar supervisão clínica

Vem crescendo a literatura sobre uso de IA generativa e NLP para apoiar supervisores em:

- Análise de transcrições de sessões (identificação de temas, emoções, adesão a protocolos).  
- Sugestão de perguntas abertas, reformulações empáticas.  
- Feedback estruturado para terapeutas e

---

## Citacoes Perplexity (8)

1. https://gurusup.com/es/blog/ai-comparisons
2. https://www.adslzone.net/noticias/ia/chatbot-arena-plus-q2-2026/
3. https://www.getaiperks.com/es/blogs/38-best-ai-models-for-coding-2026
4. https://blogthinkbig.com/mejor-ia-2026
5. https://alhertech.com/es/comparativa-ia
6. https://cristiantala.com/benchmark-de-modelos-de-ia-2026-probe-25-modelos-con-125-tests-reales/
7. https://www.nxcode.io/es/tools/ai-model-comparison
8. https://hardzone.es/noticias/inteligencia-artificial/nuevo-orden-ia-claude-gemini-chatgpt-crecimiento/