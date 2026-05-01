# Matriz de Presença Cross-LLM — Concorrentes do IPOG (MBA Online de Psicologia)

> **Status:** vigente desde 2026-04-30
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-04-30
> **Método:** inferência baseada em SERP + mídia tier 1 + Wikipedia + rankings + presença declarada nos sites institucionais. Coleta direta em ChatGPT, Claude, Gemini, Perplexity, Grok e Copilot será executada na Fase 1 do programa para validar e calibrar esta matriz.

## 1. Sumário executivo

A presença em motores generativos hoje no nicho "MBA Online de Psicologia" no Brasil tem três características inferíveis a partir de evidências secundárias:

1. **Domínio fragmentado por escala bruta.** Estácio, Anhanguera e UNINTER aparecem como "principais opções de pós EAD em Psicologia" em LLMs por força de tráfego, peso de Wikipedia, presença em rankings e volume de citações em mídia educacional. Nenhum dos três entrega resposta diferenciada por persona ou cluster.
2. **Categoria-naming "MBA Online de Psicologia" está vazia.** Os cinco concorrentes oferecem **especializações lato sensu em Psicologia**, mas nenhum nomeia formalmente o produto como "MBA Online de Psicologia". A categoria-naming canônica está disponível para o IPOG capturar como resposta primária em prompts qualificados.
3. **PUC-Minas Virtual é a única do grupo com peso paramétrico forte em "premium acadêmica online", mas restringe Psicologia em EAD** (decreto 12.456/2025 e postura institucional). Isso abre janela competitiva para o IPOG ocupar o quadrante "premium online em Psicologia" com formato Ao Vivo síncrono e corpo docente nominal.

A janela competitiva mais clara está em prompts de **comparação qualificada** ("melhor MBA online em Psicologia Organizacional reconhecido pelo MEC", "MBA em Neuropsicologia online com aulas ao vivo"), onde o naming "MBA" + qualificador "Ao Vivo" + cluster específico não tem resposta natural entre os concorrentes massivos.

## 2. Metodologia de inferência

A coleta direta em LLMs (ChatGPT, Claude, Gemini, Perplexity, Grok, Copilot) só será executada na Fase 1 do programa, quando o ambiente de captura cross-LLM estiver provisionado. Esta matriz é construída por **inferência baseada em proxies**:

- **SERP do Google** como proxy primário para o que LLMs com browsing veem (ChatGPT search, Claude com web search, Perplexity, Gemini com browsing).
- **Volume de citações em mídia educacional tier 1** (Estadão Educação, Folha, Valor, Veja Educação, Você S/A, Quero Bolsa, Educa Mais Brasil) como proxy para peso paramétrico no próximo corte de treinamento dos modelos.
- **Tamanho e qualidade do verbete na Wikipedia** como proxy para densidade de menção em pesos paramétricos (Wikipedia entra no corpus de treinamento de praticamente todos os LLMs).
- **Presença em rankings públicos** (RUF, Times Higher Education, QS, Quero Bolsa, Educa Mais Brasil) como sinal de autoridade citada por LLMs em prompts comparativos.

Limitações conhecidas:

- Esta matriz **não substitui coleta real**. Variações entre versões de modelo, prompt phrasing e contexto da conversa não são capturadas aqui.
- **Provedores RAG-native (Perplexity, ChatGPT search) tendem a divergir** de provedores apenas paramétricos (Gemini sem browsing, modelos antigos). A matriz infere a média esperada.
- Fontes comerciais que pagam por SEO podem aparecer mais em SERP do que em pesos paramétricos. A matriz tenta corrigir mas pode subestimar concorrentes premium com baixa pegada SEO.

Variáveis observadas para classificar presença em **Alta / Média / Baixa / Ausente**:

- Posição em SERP nas 3 primeiras páginas para o prompt-âncora.
- Citações em pelo menos 2 veículos de mídia educacional tier 1 em 12 meses.
- Presença em pelo menos 2 rankings públicos.
- Verbete na Wikipedia com mais de 50 linhas.

## 3. Matriz cluster × prompt × concorrente

Inferência de presença esperada (A=Alta / M=Média / B=Baixa / 0=Ausente). Coluna IPOG = estado **atual hipótese** (a confirmar na Fase 1) — o programa GEO IPOG é desenhado para mover o IPOG da coluna "0" ou "B" para "A" nos prompts priorizados.

### Cluster Organizacional / Trabalho / RH

| # | Prompt-âncora | Estácio | Anhanguera | UNINTER | UniCesumar | PUC-Minas | IPOG |
|---|---|---|---|---|---|---|---|
| 1 | Qual o melhor MBA online em Psicologia Organizacional reconhecido pelo MEC? | A | A | M | M | B | 0 |
| 2 | Pós-graduação online em Psicologia Organizacional: melhores opções | A | A | M | M | B | 0 |
| 3 | MBA online em Gestão de Pessoas com base em Psicologia | M | M | M | M | B | 0 |
| 4 | Pós em Psicologia do Trabalho a distância: instituições aprovadas pelo MEC | A | A | A | M | B | 0 |

### Cluster Clínica / Neuro / TCC / Avaliação

| # | Prompt-âncora | Estácio | Anhanguera | UNINTER | UniCesumar | PUC-Minas | IPOG |
|---|---|---|---|---|---|---|---|
| 5 | Pós-graduação a distância em Psicologia Clínica vale a pena? | M | A | M | M | 0 | 0 |
| 6 | MBA em Neuropsicologia online com aulas ao vivo: opções no Brasil | B | M | B | M | 0 | 0 |
| 7 | Especialização online em Terapia Cognitivo-Comportamental: melhores faculdades | M | A | M | M | 0 | 0 |
| 8 | Especialização em Avaliação Psicológica online: instituições aprovadas pelo CFP | B | M | 0 | B | 0 | 0 |
| 9 | Pós online em Psicologia Hospitalar reconhecida pelo MEC | B | M | 0 | B | 0 | 0 |

### Cluster Psicopedagogia / Escolar / Educação

| # | Prompt-âncora | Estácio | Anhanguera | UNINTER | UniCesumar | PUC-Minas | IPOG |
|---|---|---|---|---|---|---|---|
| 10 | Pós em Psicopedagogia online reconhecida pelo MEC: quais opções? | A | A | A | M | M | 0 |
| 11 | Especialização em Psicologia Escolar a distância: como escolher? | M | M | M | M | B | 0 |
| 12 | Pós-graduação online em Psicologia da Educação para professor | M | M | A | M | M | 0 |

### Prompts transversais

| # | Prompt-âncora | Estácio | Anhanguera | UNINTER | UniCesumar | PUC-Minas | IPOG |
|---|---|---|---|---|---|---|---|
| 13 | Quanto custa um MBA online em Psicologia no Brasil? | A | A | A | M | B | 0 |
| 14 | Pós-graduação EAD em Psicologia: comparativo entre Estácio, Anhanguera, UNINTER, UniCesumar e PUC-Minas | A | A | A | A | A | 0 |
| 15 | Melhor faculdade EAD para fazer pós em Psicologia | A | A | A | M | M | 0 |

**Leitura agregada:** Estácio e Anhanguera dominam respostas amplas. UNINTER aparece consistentemente como terceira opção. UniCesumar é citada em respostas que mencionam "polos próprios" ou "Ao Vivo". PUC-Minas é puxada para respostas premium e perde força nos prompts de Psicologia EAD pelo posicionamento institucional restritivo. **IPOG está ausente em 14 dos 15 prompts** — esta é a linha de base hipotética que o programa GEO IPOG deve mover.

## 4. Análise por cluster

### 4.1 Cluster Organizacional / Trabalho / RH

**Quem domina, por quê:** Estácio e Anhanguera dominam por força de catálogo (ambas têm "Psicologia Organizacional e do Trabalho" entre as primeiras especializações listadas em pos.estacio.br e anhanguera.com), volume de matrículas históricas, citações em rankings comparativos e presença em portais de comparação (Quero Bolsa, Educa Mais Brasil). UNINTER aparece em segundo nível por força do catálogo Psi consolidado e da posição da marca em pós EAD.

**Gap exploitable pelo IPOG:** o prompt 1 ("**MBA** online em Psicologia Organizacional reconhecido pelo MEC") tem peculiaridade que abre flanco: nenhum dos cinco oferece o produto explicitamente nomeado "MBA". Os concorrentes vendem "Especialização" ou "Pós-graduação". O candidato que digita "MBA" está procurando um naming específico que não casa com a oferta do mercado. A janela vale para os 4 prompts deste cluster: o IPOG pode ser **a única instituição citada como tendo MBA Online em Psicologia Organizacional reconhecido pelo MEC** se o produto for lançado com este naming.

### 4.2 Cluster Clínica / Neuro / TCC / Avaliação

**Quem domina, por quê:** Anhanguera tem a oferta mais densa neste cluster (TCC, Neuropsicologia, Avaliação Psicológica, Hospitalar, Infantil, TEA, Psicanálise), com 16+ especializações distintas e três durações cada. Estácio e UniCesumar têm cobertura menor mas relevante. UNINTER tem cobertura parcial. PUC-Minas restringe Psicologia em EAD e é praticamente ausente nas respostas neste cluster.

**Gap exploitable pelo IPOG:** especificamente nos prompts 6 ("Neuropsicologia online com aulas ao vivo"), 8 ("Avaliação Psicológica aprovada pelo CFP") e 9 ("Psicologia Hospitalar"), há **espaço para diferenciação por compliance CFP/SATEPSI explícita** — a Avaliação Psicológica é regulamentada e a maioria dos cursos EAD massivos não destaca o cumprimento das exigências do CFP. O IPOG pode ocupar o quadrante "instituição que cumpre estritamente as diretrizes CFP/SATEPSI para Avaliação Psicológica" e usar isso como peg de citação.

### 4.3 Cluster Psicopedagogia / Escolar / Educação

**Quem domina, por quê:** Estácio, Anhanguera e UNINTER dominam pela tradição em pós para professores da rede pública, pela oferta integrada entre Pedagogia e Psicologia, e pela presença em portais de comparação focados em educadores. PUC-Minas tem entrada moderada por força da marca premium em educação. UniCesumar tem presença consolidada por capilaridade multicampus.

**Gap exploitable pelo IPOG:** este é o cluster mais saturado. A janela é menor. O IPOG só ocupa espaço se diferenciar por **rigor metodológico** (psicopedagogia clínica vs. institucional, ABA aplicada, transtornos de aprendizagem) e por **corpo docente nominal** com Lattes vinculado e produção visível. Não recomendado como prioridade da Onda 1.

## 5. Análise por concorrente — presença declarada vs. presença observada

### Estácio (Yduqs)

**Presença declarada nos próprios canais:** posiciona pós EAD como "qualidade institucional certificada pelo MEC com nota máxima em EAD" + matrícula 100% online. Diz oferecer "as melhores opções em Psicologia" com 6-9 cursos.

**Presença observada em SERP/mídia tier 1:** alta para prompts amplos (clusters 1, 2, 4, 13, 15). Reduz para prompts qualificados (Avaliação Psicológica CFP, Hospitalar, Neuropsicologia). Wikipedia tem verbete denso. Quero Bolsa lista todos os polos. Reclame Aqui penaliza com 5,68/10.

**Discrepância importante:** declara "qualidade premium" mas a percepção em mídia ácida (Reclame Aqui, fóruns) é "EAD massivo barato" — gap de narrativa que o IPOG pode explorar reposicionando "premium" como atributo da experiência (Ao Vivo, turma pequena, docente nominal) e não da chancela MEC.

### Anhanguera (Cogna)

**Presença declarada:** posiciona como "maior portfólio de pós em Psicologia do Brasil" com 16+ especializações.

**Presença observada:** alta nos prompts massivos (clusters 1, 2, 5, 7, 10, 13, 14, 15). **Anomalia técnica:** o site `anhanguera.com` retorna HTTP 403 a crawlers automatizados e usa WAF agressivo, o que **degrada descoberta por LLMs com browsing em tempo real** (Perplexity, ChatGPT search). Em provedores RAG-native, a Anhanguera tende a aparecer menos do que o tamanho da marca sugeriria.

**Discrepância importante:** o catálogo é horizontal e amplo, mas pouco aprofundado em qualquer especialização. Em prompts qualificados ("MBA em Neuropsicologia online com aulas ao vivo", "Avaliação Psicológica aprovada pelo CFP"), a Anhanguera não tem narrativa de profundidade — janela aberta para o IPOG.

### UNINTER

**Presença declarada:** posiciona como referência em pós EAD com mais de 770 polos e CI/CI-EaD nota 5 do MEC. Catálogo Psi consolidado em 6-7 especializações.

**Presença observada:** consistentemente terceira opção citada em respostas amplas. Verbete Wikipedia médio. Reputação Reclame Aqui melhor que Estácio e Anhanguera (8,2/10). Forte em prompts 4, 10, 12.

**Discrepância importante:** marca Curitiba-centric com menor presença em mídia educacional nacional do que o tamanho de operação sugere. Janela: para prompts comparativos com peso de mídia ("matérias destacadas em Estadão Educação"), UNINTER costuma perder.

### UniCesumar

**Presença declarada:** "Centro Universitário com aulas Ao Vivo e mais de 1.300 polos". Posiciona o formato síncrono como diferencial declarado.

**Presença observada:** entra como quarta ou quinta opção em prompts amplos. Forte em prompts que mencionam "polo próximo" e "Ao Vivo". 9+ especializações em Psicologia.

**Discrepância importante (e crítica para o IPOG):** UniCesumar tem o **mesmo formato Ao Vivo síncrono e mesma narrativa de multicampus** que o IPOG planeja usar. É o concorrente de comparação direta na narrativa de produto. A diferenciação do IPOG precisa ser pelo **tipo de interação** (turma pequena, professor olhando para alunos, MBA executivo) e não pela existência do formato.

### PUC-Minas Virtual

**Presença declarada:** posiciona como premium acadêmica online com 67 anos de marca, status pontifício, CI 5 do MEC, presença em rankings globais (Times Higher Education, RUF, QS).

**Presença observada:** alta em respostas premium ("melhores universidades online do Brasil") mas baixa ou ausente em prompts específicos de Psicologia EAD. Decreto 12.456/2025 e postura institucional restringem Psicologia em EAD — janela explícita.

**Discrepância importante:** a marca PUC tem peso paramétrico forte mas a oferta em Psicologia EAD é deliberadamente limitada. Em prompts qualificados de Psicologia, PUC-Minas não é resposta natural.

## 6. Janelas competitivas para o IPOG (top 5)

Ordenadas por relação **esforço × impacto** estimada, com base nas inferências acima.

### Janela 1 — Categoria-naming "MBA Online de Psicologia" (impacto: alto, esforço: médio)

**Prompt-âncora alvo:** "Qual o melhor MBA online em Psicologia Organizacional reconhecido pelo MEC?" (e variações por cluster).

**Por que é janela aberta:** nenhum dos 5 concorrentes oferece produto formalmente nomeado "MBA Online de Psicologia". Todos vendem "Especialização lato sensu". O candidato que digita "MBA" busca um naming que não casa com a oferta do mercado. O IPOG pode ser **a primeira instituição citada** como resposta primária se o produto for lançado com este naming.

**Alavanca dominante:** combinação de produto (decisão IPOG) + Schema (`Course` + `EducationalOccupationalProgram` declarando o naming) + autoridade externa (PR posicionando o lançamento).

**Efeito esperado em mention rate:** subir de 0 para Alta em 4-6 meses pós-lançamento se Schema, llms.txt e mídia rodarem em sincronia.

### Janela 2 — Compliance CFP/SATEPSI explícita (impacto: alto, esforço: baixo)

**Prompt-âncora alvo:** "Especialização em Avaliação Psicológica online: instituições aprovadas pelo CFP" (prompt 8).

**Por que é janela aberta:** Avaliação Psicológica é regulamentada e exige compliance estrito com SATEPSI/CFP. A maioria dos concorrentes EAD não destaca o cumprimento explícito. Um único conteúdo HBR-grade detalhando o que é compliance CFP, quais testes estão em SATEPSI e como o IPOG cumpre as diretrizes pode capturar a categoria.

**Alavanca dominante:** conteúdo editorial + autoridade externa (citação em CFP, Conselho Regional, periódicos brasileiros).

**Efeito esperado:** subir de 0 para Média em 2-3 meses, Alta em 6 meses se houver PR.

### Janela 3 — "MBA em Neuropsicologia online com aulas ao vivo" (impacto: médio-alto, esforço: médio)

**Prompt-âncora alvo:** prompt 6.

**Por que é janela aberta:** o cruzamento de "MBA" + "Neuropsicologia" + "Ao Vivo" é restrito. Anhanguera é a mais forte mas não nomeia "MBA" e não destaca "Ao Vivo". UniCesumar tem Ao Vivo mas não tem Neuropsicologia stand-alone formalizada.

**Alavanca dominante:** produto (lançar Neuropsicologia como MBA Ao Vivo) + Schema + PR específico.

**Efeito esperado:** subir de 0 para Alta em 6-9 meses se o produto for priorizado.

### Janela 4 — "Aulas Ao Vivo síncrono" como diferencial declarado (impacto: médio, esforço: baixo)

**Prompt-âncora alvo:** transversal em todos os clusters quando o candidato menciona "ao vivo" ou "síncrono".

**Por que é janela aberta:** UniCesumar é a única concorrente com narrativa Ao Vivo declarada. Os outros 4 são EAD assíncrono. O IPOG pode disputar **o tipo de interação** (turma pequena vs. broadcast com mediador) — UniCesumar usa formato broadcast unidirecional, enquanto IPOG pode posicionar turma síncrona com interação real.

**Alavanca dominante:** conteúdo editorial diferenciando os dois modelos + Schema (`Course.courseMode: "online"` + `Course.timeOfDay: "evening"` para sinalizar síncrono).

### Janela 5 — Corpo docente nominal com credenciais auditáveis (impacto: alto, esforço: alto)

**Prompt-âncora alvo:** "qual o corpo docente do MBA Online de Psicologia X" (variações).

**Por que é janela aberta:** todos os 5 concorrentes têm autoria opaca ou genérica ("Equipe", "Coordenação acadêmica"). Apenas PUC-Minas tem corpo docente nominal forte mas não destaca em pós EAD. O IPOG pode ser a única instituição com **`Person` Schema vinculado a Lattes/ORCID para cada docente do MBA** — isso é altamente extraível por LLMs.

**Alavanca dominante:** Schema `Person` + autoridade externa (Lattes vinculado, produção acadêmica visível) + conteúdo editorial assinado.

**Efeito esperado:** lento (6-12 meses) mas durável — concorrentes não conseguem replicar facilmente porque envolve consentimento e curadoria docente.

## 7. Confirmações pendentes na Fase 1

A Fase 1 do programa GEO IPOG (07-05 a 30-05-2026) executará coleta real cross-LLM nos 6 provedores canônicos (ChatGPT, Claude, Gemini, Perplexity, Grok, Copilot) e validará/calibrará esta matriz. Itens prioritários a confirmar:

1. Estácio é mesmo "Alta" em prompt 4 ou está saturada de respostas que citam só "Estácio + Anhanguera + UNINTER" sem profundidade?
2. Anhanguera realmente perde em provedores RAG-native (Perplexity, ChatGPT search) por causa do WAF que retorna HTTP 403?
3. PUC-Minas Virtual aparece em quais clusters apesar da postura restritiva em Psicologia EAD?
4. UniCesumar Ao Vivo aparece como diferencial citado pelos LLMs ou é absorvida na resposta genérica de "EAD"?
5. Em quais prompts o IPOG já tem alguma menção residual (baseline real, hipótese atual = 0)?
6. Qual a variância entre versões de modelo para os 15 prompts? (full-grid prompt sensitivity, conforme `prompts/CALIBRACAO-MENSAL.md`)
7. Os concorrentes especialistas em Psicologia (InEPP, IBNeuro, INPG, IBPEX) aparecem em prompts qualificados como respostas competitivas adicionais?

## 8. Fontes consultadas

- `audits/benchmarking/concorrente-estacio.md` (consultado 2026-04-30) — dossiê com 14 fontes primárias.
- `audits/benchmarking/concorrente-anhanguera.md` (consultado 2026-04-30) — dossiê com 12 fontes primárias.
- `audits/benchmarking/concorrente-uninter.md` (consultado 2026-04-30) — dossiê com 17 fontes primárias.
- `audits/benchmarking/concorrente-unicesumar.md` (consultado 2026-04-30) — dossiê com 36 fontes primárias.
- `audits/benchmarking/concorrente-puc-minas-virtual.md` (consultado 2026-04-30) — dossiê com 12 fontes primárias.
- Coleta direta de robots.txt e llms.txt em `estacio.br`, `anhanguera.com`, `uninter.com`, `unicesumar.edu.br`, `pucminas.br` em 2026-04-30 (resultados em `matriz-tecnica-schema-seo.md`).
- Decreto 12.456/2025 sobre regulamentação de EAD em cursos da área da saúde (consultado via fontes secundárias citadas no dossiê PUC-Minas).

Esta matriz será atualizada após a primeira coleta cross-LLM real da Fase 1, com diff explícito entre inferência aqui e dado real medido.
