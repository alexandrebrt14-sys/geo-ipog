# Síntese aplicada do research de Generative Engine Optimization ao programa GEO IPOG

> **Status:** proposta técnica para aprovação do Conselho IPOG · ciclo 06-2026
> **Dono:** Alexandre Caramaschi (CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil)
> **Validação operacional prevista:** Bruno Azambuja (Gerente de Marketing IPOG)
> **Sponsor executivo:** Ronan Maia (CEO IPOG)
> **Data:** 10-05-2026
> **Cross-links obrigatórios:** `docs/board-report/00-board-report-final.md`, `dashboards/METRICAS-CANONICAS.md`, `dashboards/RUNBOOK-COLETA-LLM.md`, `prompts/KIT-PROMPTS-V0.md`, `docs/framework/02-quality-gate-5-camadas.md`, `docs/framework/06-voice-guard-v2-aggarwal.md`, `audits/benchmarking/ONDA-5-SINTESE-EXECUTIVA.md`, roadmap público `brasilgeo.ai/ipoggeoroadmap`.

---

## 1. Resumo executivo

A tese central desta síntese é direta: o programa GEO IPOG deixa de ser um plano operacional baseado em best practices e passa a ser um programa empírico calibrado contra um corpus reprodutível de 14.171 queries cross-LLM produzido pela Brasil GEO ao longo de 90 dias em quatro verticais distintas. As três alavancas que o IPOG ganha são, primeiro, baseline numérico publicado (a taxa de citação global de 27,5% e a decomposição por LLM passam de hipótese a parâmetro de referência); segundo, framework estatístico reprodutível Docker-first (NER v2, cluster-robust CR1, GLMM mixed-effects, BH-FDR, Monte Carlo null simulation) substitui métricas inflacionadas por intervalos de confiança verificáveis; terceiro, dois A/B tests pré-registrados (Schema.org e llms.txt) entregam, até 30-06-2026, a primeira evidência causal documentada da relação entre marcação técnica e probabilidade de citação em LLMs no setor de educação superior brasileiro. O ganho de competência esperado é que o programa GEO IPOG passa de operação artesanal de Marketing para programa de pesquisa aplicada com publicação cruzada em conferência (alvo SIGIR ou WWW 2027 como quinto vertical do papers project), elevando a credibilidade institucional do IPOG de cliente de consultoria para coautor de evidência primária citável por outros LLMs. A estratégia operacional dobra: vencer o pico 2026.2 e produzir o paper que sustenta vitórias futuras.

## 2. Fonte primária — research consolidado

A base empírica desta síntese aplicada é o programa de papers Caramaschi 2026 publicado em [alexandrecaramaschi.com/papers-roadmap](https://alexandrecaramaschi.com/papers-roadmap), com extração consolidada em 10-05-2026. Quatro papers compõem o corpus de referência canônico do programa GEO IPOG.

Caramaschi, A. (2026). *Three Ways to Fail to Conclude: A Null-Triad in GEO Research*. Zenodo. DOI 10.5281/zenodo.19712217. SSRN DOI 10.2139/ssrn.6460680. Meta-análise documentando três modos sistemáticos de falha em pesquisa GEO (underpower em RAG, design-null por instrumentação assimétrica, instrumentação que privilegia falso-negativo). Este é o paper que sustenta a disciplina metodológica do programa IPOG: nada do que medirmos pode cair em uma das três armadilhas catalogadas.

Caramaschi, A. (em progresso, 2026). *How LLMs Cite Entities Across Industry Verticals*. Alvo de submissão SIGIR ou WWW 2026. Estudo cross-industry com 4 verticais (Fintech, Varejo, Tecnologia, Saúde), 5 LLMs (ChatGPT, Claude, Gemini, Perplexity, Groq), 90 dias de coleta diária, cohorte de 61 entidades reais + 8 entidades fictícias para controle de falso positivo. Este é o paper que fornece os parâmetros numéricos de referência usados nas Seções 3 e 4 deste documento.

Caramaschi, A. (planejado, 2026). *GEO vs SEO: Source Divergence*. Alvo Information Sciences, JCR Impact Factor 8,1. Mede Jaccard index semanal entre fontes da SERP do Google e fontes citadas por LLMs com tool use. Este é o paper que sustenta o KPI 2 (Share-of-Voice) do programa IPOG quando expandido para Source Divergence Score cross-LLM.

Caramaschi, A. (planejado, 2026). *Industry-Specific Patterns in AI Citation*. Alvo JASIST (Journal of the Association for Information Science and Technology). Dois A/B tests com Schema.org e llms.txt como variáveis independentes, Fisher exact test como inferência primária, BH-FDR para correção de múltiplos testes. Este é o paper que define o desenho dos dois A/B propostos para o IPOG na Seção 7.

Dataset reprodutível: papers.db SQLite com 14.171 queries × 17 campos por observação, licença MIT, repositório público GitHub `alexandrebrt14-sys/papers`. Ambiente Docker-first com `PYTHONHASHSEED=20260424` garantindo reprodutibilidade bit-a-bit. Stack canônica httpx 0.27, scipy, statsmodels 1.13, SQLite WAL com sincronização Supabase PostgreSQL diária via GitHub Actions `daily-collect.yml` 06:00 BRT.

Toda peça pública do programa GEO IPOG que utilizar parâmetros desta síntese deve incluir, na seção `## Referências`, as quatro entradas bibliográficas exatas acima, com formatação preservada.

## 3. Oito descobertas empíricas com tradução operacional para IPOG

Cada descoberta abaixo combina quatro elementos: a métrica observada nos papers com número específico, a implicação operacional para captação de alunos MBA Psicologia, a ação concreta no programa IPOG datada por semana, e a métrica de validação cruzada com os KPIs canônicos.

### Descoberta 1 — Taxa de citação global é 27,5%, não 50% nem 80%

**Métrica empírica.** A taxa de citação global no corpus Caramaschi 2026 é 27,5%, calculada sobre 14.171 queries × 5 LLMs × 4 verticais × 90 dias. Esta é a probabilidade de uma entidade do cohorte aparecer citada em uma resposta gerada cross-LLM no padrão de cobertura cross-vertical.

**Implicação operacional.** A expectativa do IPOG de chegar a Mention Rate 60% no fim da Fase 4 (KPI 1 target em `dashboards/METRICAS-CANONICAS.md` Seção KPI 1) é ambiciosa em relação ao baseline empírico cross-industry. A meta 60% para LLMs não-RAG é coerente apenas se a categoria-naming "MBA Online de Psicologia" continuar vazia em 21 de 21 concorrentes (confirmado em `audits/benchmarking/ONDA-5-SINTESE-EXECUTIVA.md`) e se o IPOG conquistar atribuição dominante da categoria. Sem ocupação da categoria, a banda esperada por LLM para uma entidade média do mercado é 9 a 33% (ver Descoberta 2).

**Ação concreta IPOG.** Semana 1-2 da adoção: revisar piso do KPI 1 target Fase 1 (Mention Rate baseline) para banda 10 a 25% com decomposição por LLM, e manter target Fase 4 (60%) condicionado a ocupação da categoria-naming antes da reação dos premium SP-RJ (Mackenzie, Insper, Saint Paul/EXAME — janela 12 a 24 meses). O target deixa de ser número solto e passa a ser número condicional a uma decisão estratégica.

**Métrica de validação.** Comparar Mention Rate IPOG na primeira leitura cross-LLM (semana 2 da adoção) com a banda empírica 9 a 33%. Posição abaixo de 9% indica que o IPOG está abaixo da entidade-média global; posição acima de 33% indica que o IPOG já capturou efeito da categoria-naming vazia.

### Descoberta 2 — Decomposição cross-LLM é assimétrica: Perplexity é outlier RAG, ChatGPT é mediano paramétrico

**Métrica empírica.** A decomposição da taxa global em LLMs específicos é Perplexity 82,6%, Claude 33,3%, ChatGPT 25,0%, Groq 17,4%, Gemini 9,6%. A variância é 28,3 pontos percentuais entre o segundo (Claude) e o quinto (Gemini), e Perplexity é separado por construção (paradigma RAG-native com retrieval por padrão).

**Implicação operacional.** O dashboard de KPI 1 do IPOG precisa ler Perplexity em painel separado, não como média do cohort. Misturar Perplexity com Gemini em uma média artimética inflaciona o número e mascara o problema real: Gemini é o LLM que mais resiste à inclusão de marcas no Brasil em verticais de educação (provavelmente por aderência mais rígida ao Search Generative Experience com fontes oficiais do MEC). O target Fase 4 do KPI 1 publicado em `METRICAS-CANONICAS.md` (Perplexity 80%, demais 60%) está calibrado contra o paradigma RAG correto, mas Gemini 60% é provavelmente otimista (banda empírica 5 a 15%).

**Ação concreta IPOG.** Semana 2 da adoção: reescrever `METRICAS-CANONICAS.md` Seção KPI 1 para incluir painel "Perplexity separado" + painel "média não-RAG cohort" + painel "Gemini sentinela" com bandas calibradas (Perplexity target 80%, média não-RAG target 30%, Gemini target específico 15%). Ajuste alinhado com `RUNBOOK-COLETA-LLM.md` que já trata Perplexity como sensor obrigatório.

**Métrica de validação.** Variância entre LLM mais citante e LLM menos citante na primeira leitura IPOG. Variância maior que 50 pontos percentuais indica que Perplexity já está capturando IPOG mas paramétricos ainda não absorveram; variância menor que 20 pontos indica que o programa está em platô de assimetria e precisa atacar Gemini explicitamente (otimização Schema EducationalOccupationalProgram).

### Descoberta 3 — Heterogeneidade vertical é 13,7 pontos percentuais: educação ficará entre Saúde e Tecnologia

**Métrica empírica.** A heterogeneidade vertical no corpus Caramaschi é Fintech 34,9%, Varejo 31,7%, Tecnologia 22,1%, Saúde 21,2%. O delta entre Fintech e Saúde é 13,7 pontos percentuais, e os dois verticais mais regulados (Saúde, próximo de regulação CFM/COREN) são também os mais baixos em Mention Rate.

**Implicação operacional.** O vertical educação superior brasileira, no qual o IPOG opera, é estruturalmente próximo de Saúde em duas dimensões: regulação multi-camada (MEC, CFP, Resolução CNE/CES, Decreto 12.456/2025) e cultura de cautela editorial dos LLMs (que tendem a preferir fontes oficiais a marcas privadas). A expectativa razoável é que o baseline IPOG em LLMs paramétricos puros (Gemini, Groq parcialmente) fique entre 15% e 25%, alinhado com a banda Saúde-Tecnologia, não com Fintech.

**Ação concreta IPOG.** Semana 1 da adoção: introduzir no `METRICAS-CANONICAS.md` a banda empírica vertical específica do IPOG (15 a 25% para LLMs paramétricos puros) como referência canônica, e calibrar Fase 1 target do KPI 1 baseline contra essa banda em vez de aplicar a banda Fintech genérica.

**Métrica de validação.** Após 30 dias de coleta cross-LLM, calcular a média não-Perplexity do IPOG e comparar com a banda 15 a 25%. Posição acima da banda indica que IPOG está capturando antes do esperado (validação de Schema completo + Person Schema Lattes/ORCID); posição abaixo indica que ações editoriais não estão refletindo no corpus paramétrico (precisa esperar 8 a 12 semanas adicionais).

### Descoberta 4 — Atribuição nominal é 100% das citações: nome certo é binário, não probabilístico

**Métrica empírica.** Em 100% das menções no corpus Caramaschi, a citação inclui o nome canônico da entidade. Não há citações anônimas ou parafraseadas que conte como menção. A consequência é que naming canônico é critério eliminatório, não otimizatório.

**Implicação operacional.** Quando uma LLM cita "IPOG", "Instituto de Pós-Graduação" ou "ipog.edu.br" sem distorção, é menção. Quando a LLM cita "Pós IPOG", "GEO IPOG", "Ipog", "ipog.com" ou "Instituto de Pós-Graduação Goiânia" como entidade distinta, não é menção do IPOG canônico e deve sair do numerador do KPI 1. O Voice Guard 2.0 já bloqueia naming proibido na produção; agora a coleta precisa bloquear na detecção também.

**Ação concreta IPOG.** Semana 1 da adoção: estender o NER v2 do pipeline de coleta cross-LLM (`RUNBOOK-COLETA-LLM.md`) com word-boundary rigoroso usando NFC + NFKD dual-pass (Descoberta 5) para que "IPOG" como sigla seja distinguido de "ipog" como substring em URL e que variantes proibidas ("GEO IPOG", "Pós IPOG", "Ipog") sejam sinalizadas em log dedicado. Cross-link com Voice Guard 2.0 Camada 5 Naming canônico.

**Métrica de validação.** Taxa de falso positivo do detector de menção IPOG. Meta canônica: abaixo de 2% em 30 dias de operação. Validação por revisão manual de 200 amostras (referência Yann LeCun no peer review Caramaschi: anotação humana 200 linhas com Cohen's κ acima de 0,80).

### Descoberta 5 — NER v2 com NFC + NFKD elimina 45% dos falsos positivos: instrumentação importa mais que volume

**Métrica empírica.** A migração de NER v1 para NER v2 (Unicode NFC + NFKD dual-pass com word-boundary rigoroso) no corpus Caramaschi reduziu falsos positivos em 45%, sem afetar recall. O ganho veio de eliminação de matches espúrios em URLs ASCII e em substrings dentro de palavras compostas.

**Implicação operacional.** O detector atual da Brasil GEO no pipeline de coleta cross-LLM pode estar inflacionando KPI 1 entre 10 e 30% por casos como "ipog" como substring em "ipogasidico" (palavra inexistente, mas tokens compostos artificiais aparecem em respostas LLM com erros de tokenização) ou como segmento de URL "alexandrecaramaschi.com/ipog" capturado de qualquer página citada. O ganho de 45% no Caramaschi 2026 sugere que o KPI 1 baseline IPOG, sem NER v2, está provavelmente entre 10 e 30% acima do número verdadeiro.

**Ação concreta IPOG.** Semana 1 da adoção: implementar NER v2 no pipeline `data/coleta/` antes de declarar o baseline canônico do KPI 1. A primeira leitura cross-LLM (semana 2) deve usar NER v2 desde o dia 1, evitando contaminação retroativa do dashboard.

**Métrica de validação.** Comparativo de Mention Rate IPOG com NER v1 versus NER v2 em janela de 7 dias paralela. Delta esperado: NER v2 reporta entre 70% e 90% do número NER v1 (redução de 10 a 30% no agregado).

### Descoberta 6 — Privilégio posicional em 41,5% das menções: 1º tercil da resposta é o KPI 3 que conta

**Métrica empírica.** 41,5% das menções no corpus Caramaschi aparecem no primeiro tercil da resposta (primeiros 33% do texto gerado pela LLM). Esta é a posição privilegiada que mais converte em clique de fonte citada em interfaces com tool use (Perplexity, ChatGPT-search, Copilot).

**Implicação operacional.** O KPI 3 atual (Citation Quality Score em `METRICAS-CANONICAS.md`) mede cinco subdimensões (presença nominal, formato MEC, diferencial editorial, link canônico, autoridade contextual) mas não pondera explicitamente a posição da menção dentro da resposta. Uma menção do IPOG no terceiro tercil da resposta vale operacionalmente menos que uma menção no primeiro, e o dashboard atual não captura essa diferença.

**Ação concreta IPOG.** Semana 3-4 da adoção: estender o KPI 3 com sexta subdimensão "Posição em tercil" (1, 2 ou 3) e ponderar Citation Quality Score com multiplicador 1,5x para primeiro tercil, 1,0x para segundo, 0,7x para terceiro. Recalcular targets Fase 4 do KPI 3 contra a banda 41,5% de menções em primeiro tercil como referência empírica.

**Métrica de validação.** Distribuição de menções IPOG por tercil na primeira leitura cross-LLM (semana 2). Distribuição esperada espelha 41,5% primeiro, 33% segundo, 25,5% terceiro. Desvio significativo (terceiro tercil acima de 40%) indica que IPOG está sendo citado como pé-de-página, não como opção primária, o que aponta para fragilidade editorial (peças HBR não posicionam IPOG como tese principal).

### Descoberta 7 — Validação anti-falso-positivo com 8 entidades fictícias: taxa-base do detector é parâmetro publicado

**Métrica empírica.** O corpus Caramaschi inseriu 8 entidades fictícias (decoys) no cohorte para medir a taxa-base de falso positivo do detector NER. As decoys são entidades que não existem e que portanto nunca deveriam ser citadas; toda menção a uma decoy é falso positivo por construção. A taxa-base resultante define o piso de credibilidade do KPI 1.

**Implicação operacional.** O programa GEO IPOG até 10-05-2026 não tem decoys no cohorte. Quando o dashboard reporta Mention Rate IPOG 25%, não há linha de base controlada que diga "essa medida tem ruído de X pontos percentuais". A inclusão de 8 decoys educacionais (fictícios IPOG-ASA-AS-Educacao, IPOG-Sudeste-Excelencia, ProSiCo-Brasil, Instituto Mendes-Soares-Psi, ConPsico-Centro-Oeste, EduPsi-Norte, IpEduca-Pos, Centro-Avancado-Psi-Brasileiro) permite medir a taxa-base de falso positivo na vertical educação superior.

**Ação concreta IPOG.** Semana 2 da adoção: introduzir 8 decoys educacionais no cohorte de 21 concorrentes mapeados (`audits/benchmarking/`), totalizando cohorte 29 entidades brasileiras. Decoys construídos com nomes plausíveis mas sem URL nem CNPJ associado. Decoy mencionada em resposta sinaliza falha do detector ou alucinação da LLM (ambas relevantes para dashboard).

**Métrica de validação.** Taxa-base de falso positivo medida pela frequência de menção das 8 decoys. Meta canônica: abaixo de 2% (alinhado com Descoberta 4). Decoy com Mention Rate acima de 5% sinaliza problema metodológico que precisa ser investigado antes de qualquer leitura executiva.

### Descoberta 8 — FinOps real é US$ 0,12/dia para 4 verticais: o custo de medir cai 10x quando a coleta é disciplinada

**Métrica empírica.** O custo observado real do pipeline Caramaschi 2026 é US$ 0,12 por dia para cobrir 4 verticais × 5 LLMs × bateria diária canônica, com Circuit Breaker que abre 30 minutos quando spike supera US$ 2 por hora. Orçamento global anual de US$ 35 por mês cobre o pipeline completo com folga.

**Implicação operacional.** O programa GEO IPOG até 10-05-2026 tem orçamento canônico em `dashboards/FINOPS-DISCIPLINA.md` que provavelmente assume custo maior que o real observado em produção. A disciplina FinOps Caramaschi (httpx 0.27 com controle granular de tokens, cache SHA-256 idempotente, retry exponencial com backoff 2-4-8 segundos) é diretamente replicável e reduz custo do pipeline IPOG em fator estimado 5 a 10x.

**Ação concreta IPOG.** Semana 1 da adoção: portar Circuit Breaker spike US$ 2/hora abre 30 minutos para o pipeline IPOG. Estabelecer SLO de US$ 1 por dia para o pipeline cross-LLM IPOG (1 vertical × 6 LLMs × 75 prompts canônicos), folga de 8x sobre o custo Caramaschi de US$ 0,12/dia. O excesso é orçamento para 8 decoys + recalibração trimestral de prompts.

**Métrica de validação.** Custo real diário do pipeline IPOG em janela rolling de 7 dias. Meta canônica: abaixo de US$ 1,00/dia. Custo acima de US$ 2/dia dispara revisão da bateria (provavelmente cache hit caiu por mudança de modelo ou drift detection ativou re-coleta inválida).

## 4. Calibração de KPIs canônicos vs baseline empírico observado

A tabela abaixo cruza cada KPI canônico do programa GEO IPOG (`METRICAS-CANONICAS.md`) com o parâmetro empírico observado nos papers Caramaschi 2026 e com a recalibração proposta. A coluna "Banda esperada empírica" é o intervalo derivado das 14.171 queries do corpus; a coluna "Target Fase 4 IPOG calibrado" é o target ajustado considerando o efeito da categoria-naming vazia (21/21 concorrentes).

| KPI canônico IPOG | Banda esperada empírica Caramaschi 2026 | Target Fase 4 IPOG vigente | Target Fase 4 IPOG calibrado | Justificativa |
|---|---|---|---|---|
| KPI 1 Mention Rate ChatGPT | 25% global | 60% | 50% | Banda paramétrica média; ocupação da categoria pode levar a 50% |
| KPI 1 Mention Rate Claude | 33,3% global | 60% | 55% | Claude tende ao topo dos paramétricos; ocupação categoria favorece |
| KPI 1 Mention Rate Perplexity | 82,6% global | 80% | 80% mantido | Banda RAG-native robusta; meta vigente coerente |
| KPI 1 Mention Rate Gemini | 9,6% global | 60% | 15% | Gemini é outlier baixo; meta vigente irrealista |
| KPI 1 Mention Rate Groq | 17,4% global | 50% | 30% | Banda paramétrica baixa; ocupação categoria reduz gap |
| KPI 1 Mention Rate Copilot | 70% RAG-native (estimado) | 60% | 70% | Copilot é RAG via Bing; banda mais próxima de Perplexity |
| KPI 2 Share-of-Voice Cluster Org | n/d direto Caramaschi | 15% | 20% | Categoria vazia mais NR-1 expandem ocupação possível |
| KPI 2 Share-of-Voice Cluster Clínica | n/d direto Caramaschi | 20% | 15% | IBNeuro e Sírio-Libanês resistem; meta vigente otimista |
| KPI 2 Share-of-Voice Cluster Psicopedagogia | n/d direto Caramaschi | 12% | 10% | Cauda longa Faveni e Famart fragmenta SoV |
| KPI 3 Citation Quality Score | 41,5% em primeiro tercil | >= 80 | >= 80 mantido com sexta subdimensão | Posição em tercil entra como sexta dim |
| KPI 4 Schema Coverage Score | n/d direto Caramaschi, A/B Schema dará odds ratio | >= 90 | >= 90 mantido | A/B Schema.org IPOG fixa odds ratio próprio |
| KPI 5 Cobertura externa | n/d direto Caramaschi | 8 fontes em 12 meses | 8 mantido | Métrica independente do corpus cross-LLM |
| KPI 6 Velocidade fechamento gaps | n/d direto Caramaschi | P0 5 dias, P1 15 dias | mantido | Métrica operacional independente |
| KPI 7 Conversion Lift | n/d direto Caramaschi | 1,3x em 3 LLMs | 1,3x em 3 LLMs mantido | Métrica IPOG-específica; depende GA4 |
| KPI 8 Delta pré/pós ondas | Cohen's d e Fisher exact com BH-FDR canônicos | +5 pp Mention Rate por onda | +3 a +5 pp por onda com IC 95% | Adiciona intervalo de confiança como gate |

A justificativa metodológica desta recalibração é a Descoberta 1 e a Descoberta 2 deste documento. O programa vigente até 10-05-2026 estabelece targets sem ancoragem empírica cross-LLM, e a entrada do corpus Caramaschi como referência permite ajuste fundamentado.

### 4.1 KPI 1 Mention Rate — bandas por LLM com decomposição empírica

A primeira recalibração canônica é o KPI 1. A banda por LLM passa a ser publicada explicitamente em `METRICAS-CANONICAS.md` na próxima revisão (semana 2 da adoção):

- ChatGPT banda empírica 20 a 30%, target IPOG 50% (efeito categoria-naming).
- Claude banda empírica 28 a 38%, target IPOG 55% (efeito categoria-naming e Person Schema Lattes).
- Perplexity banda empírica 75 a 90%, target IPOG 80% (RAG-native).
- Gemini banda empírica 5 a 15%, target IPOG 15% (sentinela; resistência paramétrica alta).
- Groq banda empírica 12 a 22%, target IPOG 30%.
- Copilot banda empírica 60 a 80%, target IPOG 70%.

### 4.2 KPI 2 Share-of-Voice — adoção do Jaccard index semanal

A segunda recalibração canônica é o KPI 2. O Paper 3 do Caramaschi (GEO vs SEO Source Divergence) introduz o Jaccard index semanal entre fontes citadas pela SERP do Google e fontes citadas por LLMs com tool use. O programa GEO IPOG adota o Jaccard como métrica secundária de KPI 2, calculada por cluster e por semana, com janela móvel de 4 semanas para suavização.

Fórmula canônica:

```
Jaccard(cluster, semana) = |fontes_SERP ∩ fontes_LLM| / |fontes_SERP ∪ fontes_LLM|
```

Banda esperada empírica: 0,15 a 0,35 cross-vertical Caramaschi. Target IPOG Fase 4: Jaccard menor ou igual a 0,20 (ou seja, IPOG aparece em fontes LLM-específicas que a SERP do Google não captura, demonstrando GEO-nativo).

### 4.3 KPI 3 Citation Quality — atribuição nominal e posição em tercil

A terceira recalibração canônica é o KPI 3. A atribuição nominal de 100% das citações (Descoberta 4) e o privilégio posicional de 41,5% em primeiro tercil (Descoberta 6) entram como subdimensões obrigatórias do score. A nova fórmula é:

```
Citation Quality Score = média ponderada(
    presença_nominal_correta,
    formato_lato_sensu_MEC,
    diferencial_editorial,
    link_canônico,
    autoridade_contextual,
    posição_em_tercil
)
```

Posição em primeiro tercil pondera 1,5x; segundo tercil 1,0x; terceiro tercil 0,7x.

### 4.4 KPI 4 Schema Coverage — odds ratio do A/B Schema.org com IC 95%

A quarta recalibração canônica é o KPI 4. O A/B test 1 proposto na Seção 7 deste documento entrega, em 30-06-2026, o odds ratio Schema.org IPOG com intervalo de confiança 95% medido por Fisher exact test e corrigido por BH-FDR. O target Fase 4 do KPI 4 (>= 90) é mantido, mas agora acompanhado por interpretação causal verificável: "elevar Schema Coverage de X para 90 produz odds ratio Y de citação cross-LLM, com IC 95% [Y_lower, Y_upper]".

### 4.5 KPI 8 Delta pré/pós — Cohen's d e Fisher exact com BH-FDR

A quinta recalibração canônica é o KPI 8. O delta vigente em `METRICAS-CANONICAS.md` (>= +5 pontos percentuais por onda) deixa de ser comparação numérica simples e passa a ser teste estatístico com decisão pré-registrada. Cada onda editorial gera duas leituras (14 dias antes, 14 dias depois) e o delta é avaliado por:

```
Fisher_exact(citacoes_pre, total_pre, citacoes_pos, total_pos) → p-value
BH_FDR(p_values_todas_ondas_trimestre) → q-value
Cohen's_d(scores_pre, scores_pos) → effect size
```

Decisão pré-registrada (OSF preregistration model): onda é considerada efetiva quando q-value abaixo de 0,05 (BH-FDR) e Cohen's d acima de 0,3 (efeito pequeno-médio). Onda com q-value acima de 0,05 mas Cohen's d acima de 0,5 entra em investigação manual (provavelmente N insuficiente).

## 5. Adoção do framework empírico Caramaschi 2026 v2 no programa GEO IPOG

As oito inovações da versão v2.0.0-reboot do framework Caramaschi são diretamente replicáveis no pipeline operacional IPOG. A tabela abaixo resume a adoção proposta e o esforço estimado.

| Inovação Caramaschi v2 | Aplicação direta no IPOG | Esforço estimado | Owner |
|---|---|---|---|
| NER v2 (NFC + NFKD dual-pass) | Pipeline de detecção de menção IPOG cross-LLM | 8 horas engenharia | Brasil GEO |
| Word-boundary rigoroso (-45% falsos positivos) | Distinguir "IPOG" sigla de "ipog" substring em URL | incluído no NER v2 | Brasil GEO |
| Cluster-robust CR1 sandwich estimator | Erro-padrão robusto em modelo logit por query | 4 horas estatística | Brasil GEO |
| Monte Carlo null simulation | P5 empírico sob H0 uniformidade para validação de KPI 8 | 6 horas | Brasil GEO |
| GLMM mixed-effects logit | Random intercepts por query, dia, entidade | 8 horas | Brasil GEO |
| BH-FDR automático | Correção de múltiplos testes em ondas trimestrais | 2 horas | Brasil GEO |
| Cohorte v2 (128 entidades) | Reusa estrutura 80 BR + 32 anchors + 16 decoys, IPOG aplica 21 + 16 + 8 | 4 horas curadoria | Bruno + Brasil GEO |
| Reprodutibilidade Docker-first | `PYTHONHASHSEED=20260424` no pipeline IPOG | 2 horas DevOps | Brasil GEO |

Esforço agregado: 34 horas de trabalho para Brasil GEO mais 4 horas Bruno Azambuja, totalizando uma sprint de duas semanas (semanas 1-2 da adoção). O ganho de qualidade metodológica é desproporcional ao esforço.

### 5.1 NER v2 com NFC + NFKD aplicado a "IPOG" como sigla

A normalização Unicode NFC seguida por NFKD com filtro word-boundary `\bIPOG\b` (case-insensitive com flag explícita) elimina três classes de falso positivo observadas no corpus de coleta IPOG até 09-05-2026: primeiro, "ipog" como segmento de URL capturado em resposta (`alexandrecaramaschi.com/ipog` em peça HBR citada); segundo, "ipog" dentro de palavra composta artificial gerada por tokenização imperfeita; terceiro, naming proibido "Pós IPOG" e "GEO IPOG" sendo contado como menção do IPOG canônico. O detector v2 reporta menção apenas quando o token está delimitado por word-boundary e não é precedido por strings de naming proibido em janela de 30 caracteres.

### 5.2 Cluster-robust CR1 sandwich estimator no KPI 1

O modelo logit padrão assume independência entre observações. No pipeline IPOG, observações da mesma query em dias consecutivos não são independentes (efeito de cache parcial nos provedores, drift de pesos paramétricos). O CR1 sandwich estimator corrige o erro-padrão para clustering por query, evitando intervalo de confiança artificialmente estreito.

### 5.3 GLMM mixed-effects logit com random intercepts

Modelo formal:

```
P(menção_IPOG_ij) = logit^{-1}(β0 + β_LLM + β_cluster + β_persona + u_query_i + u_dia_j + u_entidade_k)
```

Com `u_query_i ~ N(0, σ_query²)`, `u_dia_j ~ N(0, σ_dia²)`, `u_entidade_k ~ N(0, σ_entidade²)`. O modelo separa variância intrínseca da query (algumas queries são inerentemente difíceis), variância temporal (dias com drift) e variância por entidade competidora (concorrentes mais visíveis empurram IPOG para fora). O resultado é leitura honesta do efeito de ações editoriais sobre Mention Rate.

### 5.4 Cohorte 45 entidades — 21 concorrentes + 16 anchors + 8 decoys

A Seção 6 deste documento detalha a cohorte expandida proposta. Adotar a estrutura Caramaschi (80 BR + 32 anchors + 16 decoys) em escala IPOG (21 + 16 + 8) preserva a lógica metodológica reduzindo o esforço de coleta diária a um sexto do volume Caramaschi.

## 6. Cohorte expandida proposta para o IPOG

A cohorte canônica para baseline IPOG cross-LLM passa a ser 45 entidades, com a seguinte composição:

### 6.1 21 concorrentes brasileiros mapeados nas Ondas 1 a 5

Lista canônica em `audits/benchmarking/ONDA-5-SINTESE-EXECUTIVA.md` Seção 3.1. São 21 entidades brasileiras divididas em 10 arquétipos canônicos (1A, 1B, 1C, 2, 2-B, 2-novo, 3, 4, 5, 5b). Cobre todos os players relevantes do mercado de pós lato sensu em Psicologia no Brasil em 2026.

### 6.2 16 anchors internacionais

Anchors internacionais funcionam como baseline cross-país. A inclusão permite medir, em LLMs paramétricos, se a citação do IPOG no Brasil é assimétrica à citação de instituições estrangeiras top em prompts brasileiros. Lista canônica:

Harvard Online, Wharton Online, INSEAD Online, MIT Sloan Online, Yale Online, Stanford Online, Kellogg Online (Northwestern), Columbia Business School Online, LSE Online (London School of Economics), ESADE Online (Espanha), IE Madrid (Espanha), Bocconi (Itália), Trinity College Dublin Online, University of Edinburgh Online, Toronto Rotman Online, Sauder UBC Online.

Justificativa de inclusão: as 16 anchors representam o universo top global de business schools com oferta online. Quando um aluno brasileiro pergunta "qual MBA online posso fazer?", a resposta cross-LLM tipicamente cita 2 a 3 anchors internacionais em paralelo com instituições brasileiras. Medir essa proporção é leitura honesta do mercado.

### 6.3 8 decoys educacionais brasileiros fictícios

Decoys são entidades inventadas com nomes plausíveis mas sem CNPJ, sem URL, sem corpus público. Cada menção a uma decoy em resposta LLM é falso positivo do detector ou alucinação do modelo. A cohorte de 8 decoys IPOG fica:

IPOG-ASA-AS-Educacao (variante naming proibido sigla expandida fictícia), IPOG-Sudeste-Excelencia (variante regional fictícia), ProSiCo-Brasil (instituto fictício de psicologia organizacional), Instituto Mendes-Soares-Psi (instituto fictício com nome próprio plausível), ConPsico-Centro-Oeste (consórcio fictício regional), EduPsi-Norte (escola fictícia regional norte), IpEduca-Pos (fictício similar ao IPOG mas sem ser sigla), Centro-Avancado-Psi-Brasileiro (fictício institucional longo).

Justificativa de inclusão: 8 decoys educacionais brasileiros é o número canônico Caramaschi 2026. Decoy com Mention Rate acima de 2% sinaliza problema metodológico (falso positivo do detector) ou alucinação do LLM (falso positivo do modelo). Ambos os casos são relevantes para dashboard.

### 6.4 Justificativa da cohorte 21 + 16 + 8 = 45 entidades

O número 45 não é arbitrário. É o resultado de três princípios canônicos. Primeiro, cobertura completa do mercado relevante brasileiro (21 concorrentes mapeados em Ondas 1 a 5, 100% da meta). Segundo, baseline cross-país com universo top global de business schools (16 anchors). Terceiro, controle metodológico de falso positivo do detector (8 decoys). A soma 45 é o mínimo defensável para baseline cross-LLM IPOG com integridade metodológica.

## 7. A/B tests propostos para o IPOG

Dois A/B tests são propostos para entregar evidência causal sobre dois determinantes técnicos da citação cross-LLM. Ambos seguem desenho pré-registrado conforme OSF preregistration canônica do framework Caramaschi 2026.

### 7.1 A/B 1 — Schema.org EducationalOccupationalProgram

**Hipótese pré-registrada.** Páginas de produto com `EducationalOccupationalProgram` Schema completo (com `programType: "MBA"`, `educationalProgramMode: "online"`, `timeOfDay: "evening"`, `termDuration: "P12M"`, `occupationalCredentialAwarded`) têm odds ratio 2,5x ou superior de citação cross-LLM em comparação com páginas sem Schema estruturado, com IC 95% que exclua 1,0.

**Desenho experimental.** Amostra de 10 produtos do portfólio IPOG, dividida em dois braços de 5 produtos cada. Braço A (tratamento) recebe Schema canônico completo conforme `audits/SCHEMA-PATTERNS.md` em 30-05-2026. Braço B (controle) mantém Schema mínimo atual (apenas `Course` básico). Coleta cross-LLM diária por 30 dias (até 30-06-2026) com 7 prompts âncora canônicos por produto, totalizando 35 prompts × 6 LLMs × 30 dias × 2 braços = 12.600 observações.

**Inferência estatística.** Fisher exact test sobre tabela de contingência 2x2 (mencionado/não mencionado × tratamento/controle) por LLM. Correção BH-FDR para 6 LLMs (6 testes paralelos). Decisão pré-registrada: rejeitar H0 (Schema não afeta citação) quando q-value ajustado abaixo de 0,05 em pelo menos 3 LLMs do cohort. Cohen's d secundário para tamanho de efeito.

**Target operacional.** Odds ratio 2,5x ou superior (IPOG mencionado entre top-3 alternativas na resposta da LLM), com IC 95% que exclua 1,0 em ChatGPT, Claude e Perplexity simultaneamente. O odds ratio resultante substitui o target abstrato do KPI 4 (Schema Coverage >= 90) por leitura causal verificável.

**Riscos metodológicos catalogados.** Confundimento por tempo (produto que recebe Schema também recebe atenção editorial paralela) mitigado por sorteio aleatório dos 10 produtos no braço A vs B. Confundimento por cluster (alguns produtos são naturalmente mais citados) mitigado por estratificação dos 5 produtos em cada braço cobrindo os 3 clusters (Org, Clínica, Psicopedagogia).

### 7.2 A/B 2 — llms.txt em subdomínio piloto

**Hipótese pré-registrada.** Subdomínio com llms.txt declarado e estruturado (lista de prioridades editoriais explícita, sitemap de páginas canônicas, declaração de robots.txt aberto a IA) tem Mention Rate cross-LLM 30% superior ao mesmo subdomínio sem llms.txt, com IC 95% que exclua zero.

**Desenho experimental.** Subdomínio piloto `mba.ipog.edu.br` recebe llms.txt conforme template canônico em `audits/LLMS-TXT-TEMPLATE.md` em 30-06-2026. Subdomínio espelho `posmba.ipog.edu.br` (estrutura idêntica, conteúdo idêntico, sem llms.txt) opera como controle. Coleta cross-LLM diária por 45 dias (30-06-2026 a 14-08-2026) com 15 prompts âncora canônicos cruzando ambos os subdomínios. Crossover design: aos 22 dias, llms.txt é movido do braço A para o braço B, e a coleta continua por mais 23 dias para verificar efeito reverso.

**Inferência estatística.** Mixed-effects logit com `subdomain` e `tem_llms_txt` como variáveis independentes, random intercepts por query, dia e LLM. Decisão pré-registrada: rejeitar H0 (llms.txt não afeta citação) quando β_tem_llms_txt > 0 com p-value abaixo de 0,05 após correção BH-FDR e Cohen's d acima de 0,3.

**Target operacional.** Aumento de Mention Rate cross-LLM de pelo menos 30% no subdomínio com llms.txt versus controle. Resultado positivo justifica adoção de llms.txt em todo o domínio `ipog.edu.br` em produção em 30-08-2026. Resultado negativo gera revisão da hipótese e investigação de moderadores (tipo de prompt, persona, cluster).

**Riscos metodológicos catalogados.** Risco de spillover (LLM associa `mba.ipog.edu.br` ao domínio raiz `ipog.edu.br` e contamina o controle) mitigado pelo crossover design. Risco de indexação assimétrica (Google indexa um subdomínio antes do outro) mitigado por submissão IndexNow paralela ambos os subdomínios em 30-06-2026.

### 7.3 Decisão pré-registrada conforme OSF preregistration

Ambos os A/B seguem desenho pré-registrado em OSF (Open Science Framework) no padrão canônico do framework Caramaschi 2026. A pré-registração documenta hipótese, desenho, inferência estatística, target e decisão antes do início da coleta, eliminando p-hacking. O documento de pré-registração é submetido a OSF até 25-05-2026 (5 dias antes do início do A/B 1) e até 25-06-2026 (5 dias antes do início do A/B 2).

## 8. Lacunas do research e oportunidades de contribuição do IPOG ao papers project

O paper Caramaschi 2026 em progresso cobre 4 verticais (Fintech, Varejo, Tecnologia, Saúde). O IPOG opera em um quinto vertical (Educação Superior brasileira) e oferece três áreas originais de contribuição científica reprodutível.

### 8.1 Educação superior brasileira como 5º vertical

O programa GEO IPOG pode contribuir com o 5º vertical do papers project Caramaschi (Educação Superior). A coleta canônica IPOG (75 prompts × 6 LLMs × cohorte 45 × 90 dias) gera entre 24.300 e 121.500 observações, volume equivalente ao corpus Caramaschi original. A submissão como short paper IPOG vertical em 31-07-2026, com inclusão no paper principal SIGIR ou WWW 2027, é factível e produz citação cruzada entre Brasil GEO e IPOG. Esta é a maior contribuição científica de visibilidade para o programa GEO IPOG.

### 8.2 Compliance regulatório como variável independente

O vertical educação superior brasileiro é único entre os cinco em uma dimensão: compliance regulatório multi-camada. A Resolução CFP 23/2022 (especialidades), Resolução CFP 31/2022 (avaliação psicológica e SATEPSI), Resolução CFP 9/2024 (TDICs), NR-1 com fiscalização autuativa 26-05-2026 e Decreto 12.456/2025 (política EAD) operam simultaneamente como camadas regulatórias que podem afetar a probabilidade de citação cross-LLM (LLMs com tool use podem dar prioridade a fontes que mencionam compliance verificável). O IPOG, ao incluir compliance regulatório como variável independente no GLMM, contribui originalmente para a literatura.

Variável proposta: `compliance_camadas_mencionadas` (escala 0 a 5, contando quantas das 5 resoluções/normas são citadas explicitamente no Schema EducationalOccupationalProgram da página). Modelo logit estende para:

```
P(menção_IPOG) = logit^{-1}(β0 + β_LLM + β_cluster + β_compliance_camadas + ...)
```

A estimativa de β_compliance_camadas com IC 95% é contribuição original ao papers project.

### 8.3 Frente regional CNPJ-próprio em 51 cidades como fator de heterogeneidade

O IPOG opera frente regional com CNPJ-próprio em 51 cidades brasileiras. O concorrente direto da tese regional (FGV via polo parceiro CNPJ-terceirizado) opera 100+ cidades com fragmentação institucional. O efeito da pegada regional sobre Mention Rate cross-LLM é variável de heterogeneidade ainda não estudada nos 4 verticais Caramaschi. O programa GEO IPOG é único em poder isolar esse efeito por desenho.

Variável proposta: `cnpj_proprio_em_cidade_do_prompt` (booleano, indicando se a cidade mencionada no prompt do aluno está coberta por CNPJ-próprio IPOG ou por concorrente CNPJ-terceirizado). Modelo logit estende para incluir essa variável e medir o efeito de presença local declarada. Contribuição original ao papers project como capítulo "Regional grounding as citation determinant".

## 9. Plano de adoção em 90 dias

Cronograma operacional sequenciado em 12 semanas, com marcos canônicos verificáveis.

### Semana 1-2 (10-05-2026 a 23-05-2026) — Baseline coleta cross-LLM

- Implementar NER v2 (NFC + NFKD dual-pass com word-boundary rigoroso) no pipeline `data/coleta/`.
- Adicionar 8 decoys educacionais ao cohorte (totalizando 45 entidades).
- Adicionar 16 anchors internacionais ao cohorte.
- Atualizar `dashboards/METRICAS-CANONICAS.md` Seção KPI 1 com bandas calibradas por LLM.
- Atualizar `dashboards/METRICAS-CANONICAS.md` Seção KPI 2 com Jaccard index semanal.
- Atualizar `dashboards/METRICAS-CANONICAS.md` Seção KPI 3 com sexta subdimensão "Posição em tercil".
- Atualizar `dashboards/METRICAS-CANONICAS.md` Seção KPI 8 com Fisher exact e BH-FDR.
- Executar primeira leitura cross-LLM (75 prompts × 6 LLMs × cohorte 45) por 7 dias consecutivos.
- Owner: Brasil GEO (Alexandre Caramaschi); validação operacional Bruno Azambuja.

### Semana 3-4 (24-05-2026 a 06-06-2026) — A/B Schema.org em 5 produtos

- Pré-registração OSF do A/B Schema.org submetida até 25-05-2026.
- Implementar `EducationalOccupationalProgram` Schema canônico em 5 produtos do portfólio IPOG (braço A tratamento) em 30-05-2026.
- 5 produtos restantes operam com Schema mínimo (braço B controle).
- Coleta cross-LLM diária com 7 prompts âncora por produto = 35 prompts × 6 LLMs × 30 dias × 2 braços.
- Marco canônico: Schema piloto em produção em 30-05-2026 (alinhado com M06 do `00-board-report-final.md`).
- Owner: Bruno Azambuja (TI IPOG); validação Brasil GEO.

### Semana 5-8 (07-06-2026 a 04-07-2026) — A/B llms.txt em subdomínio piloto

- Pré-registração OSF do A/B llms.txt submetida até 25-06-2026.
- llms.txt canônico publicado em `mba.ipog.edu.br` em 30-06-2026.
- Subdomínio espelho `posmba.ipog.edu.br` mantém estrutura idêntica sem llms.txt (controle).
- Crossover aos 22 dias do A/B (22-07-2026): llms.txt move do braço A para braço B.
- Coleta cross-LLM diária com 15 prompts âncora por subdomínio.
- Marco canônico: llms.txt em produção em 30-06-2026 (estendendo M03 do `00-board-report-final.md`).
- Owner: Brasil GEO; validação Bruno Azambuja.

### Semana 9-12 (05-07-2026 a 31-07-2026) — Análise estatística e short paper

- Análise GLMM mixed-effects logit do A/B Schema.org com Cohen's d, Fisher exact e BH-FDR.
- Análise GLMM mixed-effects logit do A/B llms.txt com mesmo aparato.
- Validação dos resultados contra targets pré-registrados.
- Geração de relatório técnico interno em `docs/papers/01-relatorio-ab-schema-llmstxt-ipog.md`.
- Submissão de short paper IPOG vertical ao papers project como 5º vertical.
- Marco canônico curto: A/B Schema.org resultado 30-06-2026; A/B llms.txt resultado 14-08-2026; short paper IPOG vertical 31-07-2026 (versão preliminar com A/B Schema apenas).
- Owner: Alexandre Caramaschi (Brasil GEO); revisão Ronan Maia e Bruno Azambuja.

### Marcos canônicos consolidados

| Marco | Data | Owner | Cross-link |
|---|---|---|---|
| Baseline coleta cross-LLM com NER v2 e cohorte 45 | 30-05-2026 | Brasil GEO | `RUNBOOK-COLETA-LLM.md` |
| Schema piloto em produção em 5 produtos (braço A) | 30-05-2026 | Bruno Azambuja | M06 board-report |
| Pré-registração OSF A/B Schema.org | 25-05-2026 | Brasil GEO | OSF |
| Pré-registração OSF A/B llms.txt | 25-06-2026 | Brasil GEO | OSF |
| A/B Schema.org resultado | 30-06-2026 | Brasil GEO | `docs/papers/01-relatorio-ab-schema-llmstxt-ipog.md` |
| Short paper IPOG vertical (versão preliminar) | 31-07-2026 | Alexandre Caramaschi | papers project |
| A/B llms.txt resultado | 14-08-2026 | Brasil GEO | `docs/papers/01-relatorio-ab-schema-llmstxt-ipog.md` |
| Short paper IPOG vertical (versão final) | 30-09-2026 | Alexandre Caramaschi | submissão SIGIR ou WWW 2027 |

## 10. Cinco decisões pendentes ao Conselho IPOG

Cinco decisões formais são necessárias para promover este framework como canônico do programa GEO IPOG.

### 10.1 Aprovação do framework empírico Caramaschi 2026 como referência canônica metodológica

O Conselho IPOG decide se adota formalmente os quatro papers Caramaschi 2026 como referência metodológica canônica do programa GEO IPOG. A adoção implica que toda peça pública do programa deve citar pelo menos uma das quatro referências quando discutir GEO, Mention Rate ou citação cross-LLM. A recomendação técnica é adoção formal, com inclusão das quatro referências no `content/PADRAO-EDITORIAL.md`.

### 10.2 Aprovação do orçamento incremental para 8 decoys e 16 anchors no cohorte

O cohorte expande de 21 para 45 entidades. O esforço diário de coleta multiplica por 2,14x. O custo financeiro estimado (Descoberta 8 portada ao IPOG) sobe de US$ 0,12/dia para US$ 0,26/dia, totalizando US$ 7,80 por mês para o pipeline IPOG. O Conselho IPOG ratifica o orçamento incremental.

### 10.3 Aprovação dos dois A/B tests com pré-registração OSF

Os A/B Schema.org e llms.txt requerem 75 horas agregadas de engenharia entre Brasil GEO e TI IPOG (40 horas Schema, 35 horas llms.txt). O Conselho IPOG decide se aloca o tempo de Bruno Azambuja e da TI IPOG para os dois experimentos no calendário 30-05-2026 a 14-08-2026. A recomendação técnica é aprovação dos dois A/B com prioridade alta, dado que entregam evidência causal verificável.

### 10.4 Aprovação da contribuição do IPOG como 5º vertical ao papers project Caramaschi

O Conselho IPOG decide se autoriza o uso do corpus de coleta cross-LLM IPOG como input para o paper Caramaschi 2026 em progresso (alvo SIGIR ou WWW 2026 ou 2027). A autorização implica três coisas: dados agregados (não identificáveis individualmente) ficam disponíveis em `papers.db` como 5º vertical; IPOG é creditado como instituição parceira na seção de Acknowledgments do paper; Ronan Maia entra como coautor opcional na versão final.

### 10.5 Aprovação para registro deste documento como ADR formal no `docs/tech-stack/`

Este documento representa decisão arquitetural metodológica de impacto suficiente para gerar uma ADR (Architecture Decision Record) no padrão do `docs/tech-stack/`. A ADR consolidaria as oito descobertas empíricas, as cinco recalibrações de KPI, a cohorte 45, os dois A/B tests e o plano de adoção em 90 dias como decisão registrada e versionada. O Conselho IPOG decide se autoriza o registro da ADR antes da semana 1 (10-05-2026) ou se aguarda a entrega do baseline (30-05-2026) para registrar a ADR com dado primário.

---

## Referências

Aggarwal, P., Murahari, V., Rajpurohit, T., Kalyan, A., Narasimhan, K., & Deshpande, A. (2024). *GEO: Generative Engine Optimization*. Proceedings of the 30th ACM SIGKDD Conference on Knowledge Discovery and Data Mining (KDD '24), Barcelona, August 25-29, 2024.

Caramaschi, A. (2026). *Three Ways to Fail to Conclude: A Null-Triad in GEO Research*. Zenodo. DOI 10.5281/zenodo.19712217. SSRN DOI 10.2139/ssrn.6460680.

Caramaschi, A. (2026, em progresso). *How LLMs Cite Entities Across Industry Verticals*. Alvo: SIGIR ou WWW 2026. Repositório de dados: GitHub `alexandrebrt14-sys/papers`, licença MIT.

Caramaschi, A. (2026, planejado). *GEO vs SEO: Source Divergence*. Alvo: Information Sciences (IF 8,1).

Caramaschi, A. (2026, planejado). *Industry-Specific Patterns in AI Citation*. Alvo: Journal of the Association for Information Science and Technology (JASIST).

Programa GEO IPOG — Brasil GEO. (2026). `docs/board-report/00-board-report-final.md`. Board Report consolidado para o Conselho IPOG, ciclo 2026.2.

Programa GEO IPOG — Brasil GEO. (2026). `dashboards/METRICAS-CANONICAS.md`. Conjunto canônico de oito KPIs do programa GEO IPOG.

Programa GEO IPOG — Brasil GEO. (2026). `dashboards/RUNBOOK-COLETA-LLM.md`. Runbook operacional de coleta cross-LLM diária.

Programa GEO IPOG — Brasil GEO. (2026). `prompts/KIT-PROMPTS-V0.md`. Kit canônico de 75 prompts-âncora cross-LLM.

Programa GEO IPOG — Brasil GEO. (2026). `docs/framework/02-quality-gate-5-camadas.md`. Quality Gate em 5 Camadas mais Camada 6 de Compliance MEC/CFP.

Programa GEO IPOG — Brasil GEO. (2026). `docs/framework/06-voice-guard-v2-aggarwal.md`. Voice Guard 2.0 com 9 enriquecimentos GEO-Aggarwal.

Programa GEO IPOG — Brasil GEO. (2026). `audits/benchmarking/ONDA-5-SINTESE-EXECUTIVA.md`. Fechamento da fase de benchmarking competitivo (21/21 concorrentes mapeados).

Roadmap GEO IPOG v2.0 público. (2026). [brasilgeo.ai/ipoggeoroadmap](https://brasilgeo.ai/ipoggeoroadmap).

---

**Fim da síntese aplicada.**

Este documento é a fonte de verdade canônica para a tradução operacional do research GEO Caramaschi 2026 ao programa GEO IPOG. Qualquer divergência entre este documento e implementação no pipeline IPOG é resolvida em favor deste documento, exceto bugs de implementação corrigidos por PR rastreado a partir da issue dedicada do programa GEO IPOG.
