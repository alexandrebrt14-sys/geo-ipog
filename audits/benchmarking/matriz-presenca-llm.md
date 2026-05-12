# Matriz de Presença Cross-LLM — Concorrentes do IPOG (Pós-Graduações em Psicologia)

> **Status:** vigente desde 2026-04-30 (Onda 1), estendida em 2026-05-01 (Onda 2), reescopo 2026-05-12
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-05-12
> **Método:** inferência baseada em SERP + mídia tier 1 + Wikipedia + rankings + presença declarada nos sites institucionais. Coleta direta em ChatGPT, Claude, Gemini, Perplexity, Grok e Copilot será executada na Fase 1 do programa para validar e calibrar esta matriz.
> **Cobertura:** as seções 1-7 cobrem os 5 concorrentes massivos da Onda 1 (Estácio, Anhanguera, UNINTER, UniCesumar, PUC-Minas Virtual). A seção 9 estende a análise aos 5 concorrentes da Onda 2 (CETCC, IBNeuro, Sírio-Libanês IEP/FSL, wPós/Anhembi, Saint Paul/EXAME) — leitura obrigatória para qualquer decisão sobre cluster Clínica/Neuro/TCC/Avaliação ou para produtos MBA em Psicologia Organizacional. Antes de aplicar conclusões da Onda 2, ler `ONDA-2-CORRECOES-PREMISSA.md`.

## Escopo canônico

**Esta matriz cobre o guarda-chuva amplo "Pós-Graduações em Psicologia"** em 5 modalidades canônicas (Especialização Lato Sensu, MBA correlato, Mestrado Profissional, Especialização Clínica certificada por Conselhos, formações híbridas). Os 15 prompts-âncora atuais foram concebidos com foco predominante em MBA Online; o reescopo 2026-05-12 mantém esses prompts como subset MBA específico e adiciona prompts amplos cobrindo as outras modalidades — a calibração balanceada será aplicada na próxima rodada de coleta cross-LLM (ver `prompts/KIT-PROMPTS-V0.md` com distribuição-alvo 60/20/10/5/5).

## 1. Sumário executivo

A presença em motores generativos hoje nas Pós-Graduações em Psicologia (5 modalidades) no Brasil tem três características inferíveis a partir de evidências secundárias:

1. **Domínio fragmentado por escala bruta.** Estácio, Anhanguera e UNINTER aparecem como "principais opções de pós EAD em Psicologia" em LLMs por força de tráfego, peso de Wikipedia, presença em rankings e volume de citações em mídia educacional. Nenhum dos três entrega resposta diferenciada por persona, cluster ou modalidade.
2. **Categoria semântica "Pós-Graduações em Psicologia" tem espaço amplo de captura cross-LLM.** Os cinco concorrentes operam quase exclusivamente em **Especialização Lato Sensu**, sem naming MBA explícito (4 dos 5 clusters), sem Mestrado Profissional consolidado online e sem Especialização Clínica certificada por Conselhos com Schema declarado. O IPOG pode capturar autoridade simultaneamente nas 5 modalidades como resposta primária em prompts qualificados.
3. **PUC-Minas Virtual é a única do grupo com peso paramétrico forte em "premium acadêmica online", mas restringe Psicologia em EAD** (decreto 12.456/2025 e postura institucional). Isso abre janela competitiva para o IPOG ocupar o quadrante "premium online em Psicologia" com formato Ao Vivo síncrono e corpo docente nominal, em qualquer modalidade.

A janela competitiva mais clara está em prompts de **comparação qualificada** que combinam modalidade + cluster específico ("melhor pós-graduação online em Psicologia Organizacional reconhecida pelo MEC — especialização, MBA ou mestrado", "Neuropsicologia online com aulas ao vivo e certificação CFP"), onde o cruzamento modalidade × qualificador × cluster específico não tem resposta natural entre os concorrentes massivos.

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

**Nota canônica sobre os 15 prompts atuais:** os prompts abaixo foram concebidos no recorte original "MBA Online" e mantêm valor como subset MBA do programa. O reescopo 2026-05-12 amplia o monitoramento ao guarda-chuva "Pós-Graduações em Psicologia" cobrindo as 5 modalidades. Nova rodada de coleta (Fase 1) usará a distribuição balanceada definida em `prompts/KIT-PROMPTS-V0.md` (84 prompts canônicos, distribuição 60/20/10/5/5).

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

### Janela 1 — Captura semântica multi-modalidade em "Pós-Graduação em Psicologia" (impacto: alto, esforço: médio)

**Prompt-âncora alvo:** "Qual a melhor pós-graduação online em Psicologia Organizacional reconhecida pelo MEC em 2026 (especialização, MBA ou mestrado)?" + variações por modalidade específica (lato sensu, MBA, mestrado profissional, especialização clínica certificada) e por cluster.

**Por que é janela aberta:** nenhum dos 5 concorrentes oferece naming MBA explícito em Psicologia (Anhembi Morumbi é exceção parcial, em Psicologia Organizacional apenas). Todos operam quase exclusivamente Especialização Lato Sensu. Mestrado profissional online em Psicologia é categoria praticamente vazia. Especialização Clínica certificada por Conselhos é fragmentada em especialistas verticais (CETCC, IBNeuro). O IPOG pode ser **a primeira instituição citada** como resposta primária ao construir produto + Schema + autoridade externa cobrindo as 5 modalidades simultaneamente.

**Alavanca dominante:** combinação de produto (decisão IPOG declarando naming por modalidade) + Schema (`Course` + `EducationalOccupationalProgram` declarando `programType` por modalidade) + autoridade externa (PR posicionando o portfólio multi-modalidade).

**Efeito esperado em mention rate:** subir de 0 para Alta em 4-6 meses pós-lançamento se Schema, llms.txt e mídia rodarem em sincronia, com cobertura balanceada das 5 modalidades.

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

**Prompt-âncora alvo:** "qual o corpo docente da Pós-Graduação em Psicologia [Cluster] X" (variações por modalidade — lato sensu, MBA, mestrado profissional, especialização clínica certificada por Conselhos, formação híbrida).

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

## 9. Onda 2 — extensão da matriz cross-LLM (especialistas verticais e premium executiva)

A Onda 2 do benchmarking adicionou 5 concorrentes que disputam clusters específicos do programa IPOG, frequentemente em terrenos onde os 5 massivos da Onda 1 não chegam. Esta extensão é construída sobre o mesmo método de inferência da seção 2, com fontes primárias listadas em cada dossiê individual.

### 9.1 Cobertura por cluster (qual concorrente atua em qual cluster)

Não é produtivo replicar os 15 prompts em coluna única para os 10 concorrentes — a maior parte dos prompts não se aplica aos especialistas verticais. A tabela abaixo mostra **em quais clusters cada concorrente da Onda 2 disputa terreno**, antes de avaliar presença esperada.

Legenda: ●●● vertical-fortaleza, ●● disputa relevante, ● tangencial, — ausente.

| Concorrente | Organizacional/RH | Clínica/Neuro/TCC/Avaliação | Psicopedagogia/Escolar | Especialidade dominante |
|---|---|---|---|---|
| **CETCC** | — | ●●● TCC clássica de Beck + Esquema + Contextuais | — | Linhagem direta Beck Institute (Filadélfia) + supervisão clínica real |
| **IBNeuro** | — | ●●● Neuropsicologia clínica + aplicação de testes | — | Telepresencial síncrono Brasília + 17 docentes (10 PhD) + Hogrefe |
| **Sírio-Libanês IEP/FSL** | — | ●●● Psicologia Hospitalar + Saúde Mental | — | Hospital JCI top 100 + 25 docentes em prática hospitalar diária |
| **wPós/Faculdade Unyleya** | ●● variações Psi-RH | ●● cobertura combinatória ampla (164 cursos Psi) | ●● variações | Volume de catálogo + preço-piso |
| **Universidade Anhembi Morumbi** | **●●● MBA Psi Org. e Trabalho** | ●● Psi Esporte/Positiva/Clínica/Psicopedagogia | ●● | **Único concorrente com MBA + Psicologia + chancela universitária** |
| **Saint Paul + EXAME** | ●●● MBA Liderança e Gestão (sem Psi) | — | — | C-level executivo + LIT/IBM Watson + Top of Mind RH 11 anos |

**Leitura agregada da cobertura:**

- **Cluster Organizacional/RH:** Anhembi Morumbi é o único da Onda 2 com **MBA explícito em Psicologia Organizacional** — overlap mais direto com o produto-âncora IPOG. Saint Paul/EXAME ocupa o cluster com MBA generalista de liderança, sem usar a palavra "Psicologia" em produto.
- **Cluster Clínica/Neuro/TCC/Avaliação:** três especialistas verticais (CETCC, IBNeuro, Sírio-Libanês) cobrem subnichos com profundidade que nenhum massivo da Onda 1 alcança.
- **Cluster Psicopedagogia/Escolar:** ninguém da Onda 2 disputa com força — terreno fica para os massivos da Onda 1.

### 9.2 Presença esperada cluster × prompt × concorrente Onda 2

Mesmas convenções da seção 3: A=Alta, M=Média, B=Baixa, 0=Ausente. Vazio = não disputa o cluster.

#### Cluster Organizacional / Trabalho / RH

| # | Prompt-âncora | CETCC | IBNeuro | Sírio | wPós | Anhembi | Saint Paul |
|---|---|---|---|---|---|---|---|
| 1 | Qual o melhor MBA online em Psicologia Organizacional reconhecido pelo MEC? | 0 | 0 | 0 | B | **A (único MBA Psi Org. + chancela)** | M (alto em "MBA liderança", baixo em "Psicologia") |
| 2 | Pós-graduação online em Psicologia Organizacional: melhores opções | 0 | 0 | 0 | B | **A** | B (Top of Mind RH amplifica em respostas amplas) |
| 3 | MBA online em Gestão de Pessoas com base em Psicologia | 0 | 0 | 0 | B | **A** | M (cluster CHRO EXAME + 76 mil seguidores LinkedIn) |
| 4 | Pós em Psicologia do Trabalho a distância: instituições aprovadas pelo MEC | 0 | 0 | 0 | B | M | 0 |

#### Cluster Clínica / Neuro / TCC / Avaliação

| # | Prompt-âncora | CETCC | IBNeuro | Sírio | wPós | Anhembi | Saint Paul |
|---|---|---|---|---|---|---|---|
| 5 | Pós-graduação a distância em Psicologia Clínica vale a pena? | M | M | B | M | M | 0 |
| 6 | MBA em Neuropsicologia online com aulas ao vivo: opções no Brasil | M | **A (único 100% telepresencial síncrono)** | 0 | M | M | 0 |
| 7 | Especialização online em Terapia Cognitivo-Comportamental: melhores faculdades | **A (linhagem Beck + supervisão real)** | M | 0 | M | 0 | 0 |
| 8 | Especialização em Avaliação Psicológica online: instituições aprovadas pelo CFP | B | M (Hogrefe distribuidor + ensina laudo) | 0 | M | 0 | 0 |
| 9 | Pós online em Psicologia Hospitalar reconhecida pelo MEC | 0 | 0 | **A (DOMINA — JCI top 100 + casos reais)** | M | 0 | 0 |

#### Cluster Psicopedagogia / Escolar / Educação

| # | Prompt-âncora | CETCC | IBNeuro | Sírio | wPós | Anhembi | Saint Paul |
|---|---|---|---|---|---|---|---|
| 10 | Pós em Psicopedagogia online reconhecida pelo MEC: quais opções? | 0 | 0 | 0 | M | M | 0 |
| 11 | Especialização em Psicologia Escolar a distância: como escolher? | 0 | 0 | 0 | M | B | 0 |
| 12 | Pós-graduação online em Psicologia da Educação para professor | 0 | 0 | 0 | M | B | 0 |

#### Prompts transversais

| # | Prompt-âncora | CETCC | IBNeuro | Sírio | wPós | Anhembi | Saint Paul |
|---|---|---|---|---|---|---|---|
| 13 | Quanto custa um MBA online em Psicologia no Brasil? | B | B | B (preço sob consulta) | A (preço-piso publicado em comparadores) | M (bolsas via Quero Bolsa) | 0 |
| 14 | Pós-graduação EAD em Psicologia: comparativo entre instituições | B | B | B | M | A (Wikipedia + cobertura ANIM3) | 0 |
| 15 | Melhor faculdade EAD para fazer pós em Psicologia | 0 | 0 | 0 | M | A (peso paramétrico forte) | 0 |

**Leitura agregada da Onda 2 frente à matriz:**
- **Anhembi Morumbi** é o único da Onda 2 que disputa força em prompts massivos ao IPOG — vence em prompts genéricos por força de Wikipedia denso + cobertura financeira da Ânima (ANIM3) + naming MBA explícito em Psi Org.
- **Saint Paul/EXAME** entra como ruído amplo em "MBA online" mas não disputa "MBA em Psicologia" — vácuo claro.
- **CETCC, IBNeuro, Sírio-Libanês** dominam subnichos qualificados que IPOG não deve atacar de frente; estratégia de coexistência declarada faz mais sentido.
- **wPós** funciona como "preço-piso" em prompts comerciais comparativos — captura aluno sensível a preço; IPOG não compete nesse eixo.

### 9.3 Análise por concorrente Onda 2 — presença declarada vs. presença observada

#### CETCC

**Presença declarada:** "a escola de pós-graduação em TCC de Beck que mais forma especialistas no Brasil" (autodeclaração); +5.000 profissionais formados desde 2002.

**Presença observada/inferida:** Alta em prompts qualificados de TCC clássica ("TCC Beck", "Terapia do Esquema", "supervisão clínica em TCC", "TCC infantil online"). **Zero presença em Wikipedia** (verbete inexistente), o que limita peso paramétrico em LLMs. Forte em SEO long-tail por subdomínios temáticos (`tccinfantil.cetcc.com.br`, `esquema.cetcc.com.br`, etc.). Reclame Aqui sem reputação definida (silêncio positivo).

**Discrepância importante:** profundidade técnica reconhecida na comunidade clínica TCC, mas **ausência de Wikipedia + capilaridade restrita a SP** reduzem presença em prompts genéricos de pós em Psicologia. Janela: o IPOG pode mencionar CETCC como referência clínica e posicionar-se como "MBA executivo em Psicologia Clínica para quem quer carreira ampla" — coexistência declarada vs. competição direta.

#### IBNeuro

**Presença declarada:** "uma das melhores instituições de especialização em Neuropsicologia" (declaração própria); +1.500 profissionais especializados.

**Presença observada/inferida:** Alta em prompts qualificados de Neuropsicologia clínica com foco em testes ("aplicação e interpretação de testes neuropsicológicos", "supervisão real em neuropsicologia", "MMSE-2 brasileiro"). **Ausência de Wikipedia** institucional. Domina prompt 6 (Neuropsicologia online ao vivo) por força do modelo telepresencial síncrono — único do tipo. Distribuidor Hogrefe é diferencial técnico.

**Discrepância importante:** **recusa explícita do naming "MBA"** ("Especialização lato sensu — Não é MBA"). Para o aluno-tipo psicólogo clínico engajado, o IBNeuro é referência; para o aluno-tipo executivo/coach/RH, o IBNeuro filtra por design. Janela: o IPOG pode dominar "MBA em Neuropsicologia" sem disputar com IBNeuro o psicólogo clínico puro.

#### Sírio-Libanês IEP/FSL

**Presença declarada:** premium absoluto em saúde no Brasil. Hospital JCI top 100 mundial. PROADI-SUS R$ 7,9 bi investidos no SUS em 13 anos.

**Presença observada/inferida:** **Domínio total em Psicologia Hospitalar** — Wikipedia denso (Hospital Sírio-Libanês), cobertura permanente em mídia premium (FAPESP, Anahp, CFM, Conasems), 25 docentes nominais em prática hospitalar diária. Em qualquer prompt "Psicologia Hospitalar Brasil" ou "psico-oncologia premium online", aparece em primeiro lugar. **Anomalia técnica**: site `faculdadesiriolibanes.org.br` retorna **HTTP 403 a crawlers automatizados** (WAF Cloudflare). Em provedores RAG-native (Perplexity, ChatGPT search, Claude com web search), tende a aparecer **menos do que a marca sugeriria** — vulnerabilidade autoinfligida idêntica à da Anhanguera.

**Discrepância importante:** marca máster Sírio-Libanês intransferível, mas o catálogo é vertical-saúde puro. Em qualquer prompt de Psicologia que **não seja hospitalar** (Organizacional, Educacional, Jurídica, Esporte, Neuropsicologia executiva), Sírio-Libanês está estruturalmente ausente. Janela: o IPOG não compete por "Psicologia Hospitalar" — compete pelo cluster amplo de Psicologia + transparência de preço + capilaridade fora de SP-DF.

#### wPós / Faculdade Unyleya

**Presença declarada:** "o maior programa de Pós-Graduação EAD do Brasil"; +400-500 mil alunos (marketing); 164 cursos Psi.

**Presença observada/inferida:** Média em prompts genéricos "pós EAD em [área Psi específica]" por força de SEO long-tail. **Zero presença em Wikipedia** (verbete inexistente). Sem MBA explícito em Psicologia. Modelo "faixas" (Faixa 1 a 5+) com opacidade de preço dilui citação em LLM (modelo não consegue citar mensalidade). Reclame Aqui Faculdade Unyleya 7,9/10 (faixa Bom).

**Discrepância importante:** marca wPós soa "institucional-universitária" mas é faculdade EAD pura. Em prompts qualificados ("MBA Psicologia Organizacional", "pós EAD com aulas ao vivo síncronas", "corpo docente nominal com Lattes"), **wPós some**. Janela: IPOG não disputa volume/preço; ocupa prompts MBA-tier qualificados.

#### Universidade Anhembi Morumbi (Ânima Educação)

**Presença declarada:** "Ensino Superior de Excelência em São Paulo"; 56 anos; IGC 4 do MEC; ex-Laureate (2005-2021); Ânima desde 2021.

**Presença observada/inferida:** **Alta em prompts genéricos de pós EAD em Psicologia** por força de Wikipedia denso (verbete sólido em pt e en wikipedia) + cobertura financeira contínua da Ânima/ANIM3 em mídia tier 1 (Exame, Valor Econômico, Bloomberg Línea, Visno Invest). **Único concorrente identificado em todo o universo (Onda 1 + Onda 2) com formato MBA + Psicologia + chancela universitária** ("MBA em Psicologia Organizacional e do Trabalho e Liderança Estratégica" em `pos.anhembi.br`). Reclame Aqui 6,8/10 (Regular) com queixas estruturais sobre EAD ("vídeos do YouTube no lugar de aulas"). Posição RUF 114 (mediana).

**Discrepância importante:** **overlap mais sensível com o produto-âncora do IPOG** está aqui. Anhembi vence por marca histórica + Wikipedia + naming MBA Psi Org. consolidado. IPOG precisa: (a) capturar prompts qualificados ("MBA Psicologia Organizacional aulas ao vivo", "MBA Psicologia Organizacional autoral", "comparativo IPOG vs. Anhembi"), (b) explorar fragilidade EAD percebida (queixas no Reclame Aqui), (c) ocupar verticais que Anhembi não cobre (Saúde Mental Corporativa, Riscos Psicossociais NR-1, Neurociência Organizacional executiva). Anhembi tem 5+ domínios concorrentes (`portal.anhembi.br`, `pos.anhembi.br`, `eadanhembi.com.br`, `landing.anhembi.br`, `estudeanhembimorumbi.com.br`) — fragmentação técnica explorável.

#### Saint Paul + EXAME Educação

**Presença declarada:** premium executiva, FT 5x, Top of Mind RH 11 anos consecutivos, 6 vezes #1 América Economia, parcerias ESMT/LSE/Columbia/Bocconi.

**Presença observada/inferida:** **Alta em prompts amplos de "MBA online" e "MBA executivo Brasil"** por força do funil editorial EXAME (20M usuários únicos/mês) + LinkedIn 76.369 seguidores + Top of Mind RH. Domina cluster "MBA C-level" e "CHRO premium". Mas **nenhum curso intitulado Psicologia em catálogo** — em prompts qualificados de Psicologia, está estruturalmente ausente. **Sem verbete Wikipedia ativo** para Saint Paul (gap relevante). URLs de catálogo retornando 404 pós-aquisição EXAME (`/curso/pos-graduacao-saint-paul`, `/curso/mba-executivo-saint-paul`) — janela técnica curta enquanto reorganização editorial não estabiliza.

**Discrepância importante:** Saint Paul/EXAME é **ruído amplo** em prompts não-qualificados que mencionam "MBA online" sem cluster Psicologia. Para o IPOG, a estratégia GEO precisa **especificar Psicologia em cada conteúdo público** para não ser comparada com Saint Paul em terreno onde Saint Paul vence (liderança genérica) e para dominar inequivocamente onde Saint Paul é ausente (Psicologia Organizacional vertical).

### 9.4 Janelas competitivas adicionais (Onda 2)

Reforçando ou recalibrando as 5 janelas da seção 6 com luz da Onda 2:

#### Janela 6 — Anhembi Morumbi como overlap nominal direto (impacto: alto, esforço: alto)

**Status:** Anhembi tem o **único MBA + Psicologia + chancela universitária** identificado (MBA em Psicologia Organizacional e do Trabalho e Liderança Estratégica em `pos.anhembi.br/curso/mba-em-psicologia-organizacional-e-do-trabalho-e-lideranca-estrategica`).

**Implicação:** o IPOG vai disputar **nominalmente** esse termo. Não é mais "categoria-naming vazia" — é "categoria-naming com um ocupante consolidado". A janela ainda existe porque:
- Anhembi tem queixas estruturais de EAD ("vídeos do YouTube no lugar de aulas").
- A página do MBA Anhembi não exibe corpo docente em fluxo público (sintoma de SEO/UX problemático).
- A fragmentação de domínios Anhembi (5+ propriedades digitais) dilui sinais para LLMs.

**Movimento IPOG:** lançar com Schema mais rico que o Anhembi (`Course` + `EducationalOccupationalProgram` com `programType: "MBA"` + `Person` Schema com Lattes/ORCID para corpo docente IPOG) + transparência radical de docente + autoria nominal de Alexandre Caramaschi como mantra de descoberta editorial.

#### Janela 7 — Sírio-Libanês com WAF é o segundo grande player com bloqueio RAG-native (impacto: médio, esforço: muito baixo)

**Status:** confirmado em 2026-05-01 que `faculdadesiriolibanes.org.br/robots.txt` retorna **HTTP 403** ao crawler automatizado, idêntico padrão da Anhanguera. Em provedores RAG-native (Perplexity, ChatGPT search, Claude com web search), Sírio-Libanês deve aparecer menos do que a marca sugere em prompts hospitalares qualificados.

**Implicação:** janela RAG-native em Psicologia Hospitalar abre brecha para o IPOG **se** decidir entrar na vertical hospitalar (não recomendado como prioridade da Onda 1 por confronto frontal com marca máster). Porém, se o IPOG mencionar Psicologia Hospitalar como módulo dentro de produto amplo, captura cauda RAG.

**Movimento IPOG:** manter robots.txt aberto a GPTBot/ClaudeBot/PerplexityBot e continuar tese de "MBA cobre cluster amplo, incluindo Psi Hospitalar como módulo, com supervisão real em parceria com hospital regional não-Sírio".

#### Janela 8 — CETCC e IBNeuro recusam o naming "MBA" deliberadamente (impacto: alto, esforço: médio)

**Status:** ambos os especialistas verticais clínicos (CETCC em TCC, IBNeuro em Neuropsicologia) rejeitam o termo "MBA". O IBNeuro é explícito: "Especialização (lato sensu) — Não é MBA".

**Implicação:** combinar "MBA" + cluster específico (TCC, Neuropsicologia, Avaliação) em prompts de descoberta tem **zero competição direta** com os especialistas. Anhembi cobre apenas Organizacional. CETCC e IBNeuro cobrem cluster Clínica mas sem MBA naming.

**Movimento IPOG:** lançar produtos como "MBA em Neuropsicologia Aplicada", "MBA em Avaliação Psicológica com Compliance CFP", "MBA em TCC para Gestão de Carreira Clínica" — Schema declarando `EducationalOccupationalProgram` + `programType: "MBA"`. Conteúdo HBR-grade explica por que é MBA e não especialização (formato executivo, decisão, aplicabilidade).

#### Janela 9 — Saint Paul/EXAME está estruturalmente ausente em Psicologia (impacto: alto, esforço: baixo)

**Status:** confirmado em 2026-05-01 — nenhum curso intitulado Psicologia Organizacional, Saúde Mental Corporativa ou Riscos Psicossociais NR-1 no catálogo Saint Paul/EXAME. Cluster Organizacional premium de Psicologia está sem ocupante claro: Anhembi cobre o naming MBA Psi Org. mas não tem o selo premium-executivo; Saint Paul tem o selo premium mas sem Psicologia.

**Implicação:** o IPOG pode capturar a **interseção "premium executivo" + "Psicologia Organizacional"** sem disputa direta com nenhum dos dois. Esse é um quadrante vazio.

**Movimento IPOG:** posicionar o MBA em Psicologia Organizacional como "**MBA executivo premium em Psicologia para CHRO, head de Saúde Mental Corporativa, líder de Riscos Psicossociais**" — vocabulário que casa com o público Top of Mind RH atualmente capturado por Saint Paul, mas com vertical-Psi explícita.

#### Janela 10 — Fragmentação de domínios é vulnerabilidade comum (impacto: médio, esforço: muito baixo)

**Status:** confirmado em 2026-05-01 — múltiplos concorrentes da Onda 2 operam fragmentação severa de domínios:
- Sírio-Libanês: 7+ domínios (`iep.hospitalsiriolibanes.org.br`, `faculdadesiriolibanes.org.br`, `digital.faculdadesiriolibanes.org.br`, `eadsiriolibanes.org.br`, `pesquisa.iephsl.org.br`, `oncologiasiriolibanes.com.br`).
- IBNeuro: 5+ domínios (`ibneuro.com.br`, `ibneuro.org`, `cursos.ibneuro.org`, `ead.ibneuro.online`, `hml.ibneuro.org`).
- Anhembi: 5+ domínios (já listados acima).
- Saint Paul: 5+ domínios (`saintpaul.com.br`, `cursos.saintpaul.com.br`, `lit.com.br`, `lps.exame.com`, `m.saintpaul.com.br`).
- Unyleya: 4+ domínios (`wpos.com.br`, `unyleya.edu.br`, `cdn-static-mkt.unyleya.com.br`, `portalaluno.unyleya.edu.br`).

**Implicação:** LLMs preferem hubs canônicos com sinais consolidados. O IPOG, ao publicar `llms.txt` declarando `ipog.edu.br` como hub central + Schema completo nesse domínio + redirecionamentos limpos para subprodutos, ganha vantagem técnica imediata.

**Movimento IPOG:** publicar `llms.txt` em `ipog.edu.br` declarando hub central + propriedade canônica + prioridades de citação cobrindo as 5 modalidades canônicas (Especialização Lato Sensu, MBA correlato, Mestrado Profissional, Especialização Clínica certificada por Conselhos, formações híbridas). Manter um único domínio canônico para o portfólio Pós-Graduações em Psicologia.

### 9.5 Confirmações pendentes Onda 2 para a Fase 1

Adicionar à lista da seção 7 (que cobria apenas a Onda 1):

8. Anhembi Morumbi MBA Psi Org. é citado especificamente em prompts "MBA online psicologia organizacional" ou diluído em respostas genéricas "MBA online universidade tradicional"?
9. CETCC aparece quando prompt menciona "Beck", "TCC clássica", "supervisão clínica em TCC" ou apenas em prompt navegacional "CETCC"?
10. IBNeuro domina prompts "Neuropsicologia online ao vivo" mesmo recusando o naming MBA?
11. Sírio-Libanês com WAF realmente reduz presença em provedores RAG-native em prompts hospitalares qualificados (replicar teste da Anhanguera)?
12. Saint Paul/EXAME é citada em prompts amplos "MBA online Brasil" onde IPOG quer aparecer? Em qual percentual de respostas?
13. wPós aparece em prompts comparativos "pós EAD barata em Psicologia" ou só em prompts navegacionais?
14. Em prompts que mencionam "Psicologia Hospitalar" + "fora de São Paulo", Sírio-Libanês ainda domina ou abre espaço para IPOG?
15. Em prompts qualificados que combinam "MBA" + "Psicologia" + cluster específico (Organizacional, Neuropsicologia, Hospitalar), qual a participação real do IPOG vs. Anhembi vs. ausência absoluta?

### 9.6 Fontes consultadas (Onda 2)

- `audits/benchmarking/concorrente-cetcc.md` (consultado 2026-05-01) — dossiê com 25 fontes primárias.
- `audits/benchmarking/concorrente-ibneuro.md` (consultado 2026-05-01) — dossiê com 30+ fontes primárias.
- `audits/benchmarking/concorrente-sirio-libanes-iep.md` (consultado 2026-05-01) — dossiê com 30 fontes primárias.
- `audits/benchmarking/concorrente-wpos-anhembi.md` (consultado 2026-05-01) — dossiê duplo com 34 fontes primárias.
- `audits/benchmarking/concorrente-conexia-saint-paul.md` (consultado 2026-05-01) — dossiê com 15 fontes primárias.
- `audits/benchmarking/ONDA-2-CORRECOES-PREMISSA.md` (consultado 2026-05-01) — registro das três correções de identidade institucional.
- WebFetch direto a `cetcc.com.br/robots.txt` em 2026-05-01 — robots aberto.
- WebFetch direto a `ibneuro.com.br/robots.txt` em 2026-05-01 — robots aberto Shopify.
- WebFetch direto a `faculdadesiriolibanes.org.br/robots.txt` em 2026-05-01 — **HTTP 403** retornado (WAF/Cloudflare).
- WebFetch direto a `wpos.com.br/robots.txt` em 2026-05-01 — robots aberto.
- WebFetch direto a `portal.anhembi.br/robots.txt` em 2026-05-01 — robots aberto.
- WebFetch direto a `saintpaul.com.br/robots.txt` em 2026-05-01 — robots aberto.
- WebFetch direto a `llms.txt` dos 6 domínios acima — todos retornaram 404 ou 403 (todos ausentes/inacessíveis).
