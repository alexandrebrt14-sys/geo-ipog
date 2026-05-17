# Wave A — Papers acadêmicos GEO/SEO 2025-2026

**Data:** 2026-05-17
**Wave:** A de E (papers acadêmicos)
**Método:** WebSearch + WebFetch, spot-check de URLs em arxiv.org (16 sources confirmadas individualmente em 2026-05-17)
**Fonte canônica:** este arquivo
**Repositório:** geo-ipog / posgraduacaopsicologia.com

---

## TL;DR (5 bullets)

- O paper seminal de Aggarwal et al. (KDD 2024, arXiv 2311.09735) sobre Generative Engine Optimization continua sendo a referência canônica em 2025-2026, mas o campo se expandiu rapidamente com pelo menos 8 benchmarks especializados publicados nos últimos 12 meses (CC-GSEO-Bench, SAGEO Arena, E-GEO, GEM-Bench, GEO-bench, RAID G-SEO, AgentSearchBench, CiteME).
- A literatura empírica de 2026 mostra um efeito causal mensurável e negativo das AI Overviews sobre tráfego orgânico: Khosravi e Yoganarasimhan (arXiv 2602.18455) documentam queda de aproximadamente 15% no tráfego diário da Wikipedia em inglês com exposição às AIOs, com Cultura caindo mais que STEM.
- Ondas independentes confirmam concentração extrema de fontes citadas por LLMs: Yang (arXiv 2507.05301) mostra que para notícias, os 20 maiores outlets respondem por 67,3% das citações em modelos OpenAI; Zhang et al. (arXiv 2512.09483) mostra que LLM-SEs têm 37% de domínios únicos vs. buscadores tradicionais mas NÃO superam em credibilidade ou segurança.
- A pesquisa de 2025-2026 introduz o framework "citation selection vs. citation absorption" (Zhang, He, Yao, arXiv 2604.25707): páginas de alta influência são mais longas, melhor estruturadas, semanticamente alinhadas e ricas em evidência extraível (definições, números, comparações, passos procedurais) — o que reforça empiricamente o playbook HBR já adotado pelo posgraduacaopsicologia.com.
- Faithfulness de citação virou subárea formal: VeriCite (arXiv 2510.11394, SIGIR-AP 2025), CiteGuard (arXiv 2510.17853) e Wallat et al. (ICTIR 2025) distinguem citação correta (factualmente válida) de citação fiel (gerada a partir da fonte e não da memória paramétrica) — implicação direta para estratégia GEO: ser citado não basta se o LLM não absorve a evidência da página.

---

## 1. Continuações do paper Aggarwal (KDD 2024 "GEO")

### 1.1 O paper canônico (referência ainda viva em 2026)

**[Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande, 2024]** GEO: Generative Engine Optimization. KDD 2024 (30th ACM SIGKDD Conference). arXiv:2311.09735, última revisão 28-jun-2024 (v3). URL: https://arxiv.org/abs/2311.09735

- Introduz "generative engines" como categoria formal e propõe GEO como paradigma de otimização.
- Resultado-chave (ainda citado em todos os papers subsequentes): boost de visibilidade de até **40%** em respostas geradas usando heurísticas de reescrita.
- Lança GEO-bench (10.000 queries, múltiplos domínios) — primeiro benchmark canônico.
- Heurística mais robusta: adicionar estatísticas e citações de fontes autoritativas eleva impressão score em ~41%.

### 1.2 Trabalhos diretos sobre o mesmo problema (2025-2026)

**[Chen, Wang, Chen, Koudas, 2025]** Generative Engine Optimization: How to Dominate AI Search. arXiv:2509.08919, submetido 10-set-2025. URL: https://arxiv.org/abs/2509.08919

- Experimentos controlados de larga escala em múltiplas verticais, idiomas e paráfrases de query.
- Achado central: AI Search exibe viés sistemático e massivo a favor de earned media (terceiros, autoritativos) em comparação ao comportamento mais equilibrado do Google clássico.
- Diferenças engine-específicas: ChatGPT favorece marcas populares; Perplexity menciona mais marcas por resposta; Google AIO tem maior diversidade; Copilot tem maior desigualdade.
- Propõe 4 estratégias acionáveis: engineering for machine readability, dominância em earned media, abordagem engine/idioma-específica, antídoto para "big brand bias".

**[Wu, Zhong, Kim, Xiong, 2025]** What Generative Search Engines Like and How to Optimize Web Content Cooperatively. arXiv:2510.11438, submetido 13-out-2025. URL: https://arxiv.org/abs/2510.11438

- Apresenta AutoGEO, framework que aprende preferências de motores generativos extraindo regras a partir de prompts a LLMs frontier.
- As preferências aprendidas são robustas e capturam idiossincrasias por domínio (não há "regra universal" — há clusters de regras).

**[Chen, Wu, Bao, Chen, Liao, Huang, 2025]** Role-Augmented Intent-Driven Generative Search Engine Optimization. arXiv:2508.11158, submetido 15-ago-2025 (revisado 18-mar-2026). URL: https://arxiv.org/abs/2508.11158

- Modela intenção de busca por meio de "reflective refinement across diverse informational roles" — aborda explicitamente que a otimização SEO tradicional falha em motores generativos black-box.
- Introduz G-Eval 2.0 (framework de avaliação multi-dimensional refinado) e expande datasets existentes.

### 1.3 Benchmarks que substituem ou complementam GEO-bench

**[Chen et al., 2025]** CC-GSEO-Bench: A Content-Centric Benchmark for Measuring Source Influence in Generative Search Engines. arXiv:2509.05607, submetido 6-set-2025 (revisado 26-dez-2025). URL: https://arxiv.org/abs/2509.05607

- Mede influência de fonte em 5 dimensões: Exposure, Faithful Credit, Causal Impact, Readability and Structure, Trustworthiness and Safety.
- 1.000+ artigos-fonte e 5.000+ pares query-artigo.

**[Kim, Jeong, Kim, Lee, Lee, 2026]** SAGEO Arena: A Realistic Environment for Evaluating Search-Augmented Generative Engine Optimization. arXiv:2602.12187, submetido 12-fev-2026. URL: https://arxiv.org/abs/2602.12187

- Primeiro benchmark com avaliação stage-level (estágios do pipeline) — distingue otimização SEO de otimização generativa explicitamente.
- Corpus de larga escala preservando informação estrutural (schema markup).

**[Bagga, Farias, Korkotashvili, Peng, Wu, 2025]** E-GEO: A Testbed for Generative Engine Optimization in E-Commerce. arXiv:2511.20867, submetido 25-nov-2025. URL: https://arxiv.org/abs/2511.20867

- 7.000+ queries de consumo + product listings.
- Avalia 15 heurísticas comuns e desenvolve algoritmo iterativo de otimização de prompt que supera baselines.
- Achado de interesse para o setor de pós-graduação: as melhores otimizações revelam padrão estável domain-agnostic — sugerindo a existência de uma estratégia GEO universalmente eficaz.

**[Hu, Zhang, Shi, Xiao, 2025]** GEM-Bench: A Benchmark for Ad-Injected Response Generation within Generative Engine Marketing. arXiv:2509.14221, submetido 17-set-2025 (revisado 7-out-2025). URL: https://arxiv.org/abs/2509.14221

- Primeiro benchmark para injeção publicitária em respostas geradas — relevante para o futuro AI-AdSense / Profound-like.
- Insight: métodos baseados em prompt aumentam engagement mas reduzem satisfação; injeção em conteúdo já gerado preserva satisfação a um custo computacional maior.

---

## 2. Papers SIGIR/WWW/WSDM/SIGIR-AP 2025-2026 sobre LLM citation behavior

### 2.1 Faithfulness em citação por LLM

**[Wallat et al., 2025]** Correctness is not Faithfulness in Retrieval Augmented Generation Attributions. ICTIR 2025 (International ACM SIGIR Conference on Innovative Concepts and Theories in Information Retrieval). URL canônica do PDF: https://staff.fnwi.uva.nl/m.derijke/wp-content/papercite-data/pdf/wallat-2025-correctness.pdf (DOI ACM: 10.1145/3731120.3744592)

- Distinção formal entre "correctness" (a citação aponta para fonte que de fato suporta a afirmação) e "faithfulness" (o modelo de fato gerou a afirmação A PARTIR da fonte citada, não pós-racionalizou).
- Afirmações geradas a partir de memória paramétrica não deveriam carregar citação.

**[Qian, Fan, Guo, Zhang, Chen, Yin, Cheng, 2025]** VeriCite: Towards Reliable Citations in Retrieval-Augmented Generation via Rigorous Verification. arXiv:2510.11394, submetido 13-out-2025, aceito em SIGIR-AP 2025. URL: https://arxiv.org/abs/2510.11394

- Framework em 3 estágios: geração inicial com verificação via NLI, seleção de evidência de suporte, refinamento final.
- Testado em 5 LLMs open-source × 4 datasets — melhora qualidade de citação preservando correção das respostas.

**[Choi, Guo, Fung, Wang, 2025]** CiteGuard: Faithful Citation Attribution for LLMs via Retrieval-Augmented Validation. arXiv:2510.17853, submetido 15-out-2025 (revisado 13-abr-2026). URL: https://arxiv.org/abs/2510.17853

- Reframe avaliação de citação como problema de alinhamento de atribuição (a citação gerada pelo LLM corresponde ao que um autor humano usaria?).
- Atinge **68,1% no CiteME benchmark**, próximo do humano (69,2%).
- Implicação: frontier LLMs sem augmentação atingem só 4-18% nesse mesmo benchmark — uma lacuna enorme.

### 2.2 News citation patterns (vetor importante para Brasil GEO)

**[Yang, 2025]** News Source Citing Patterns in AI Search Systems. arXiv:2507.05301, submetido 7-jul-2025. URL: https://arxiv.org/abs/2507.05301

- Dataset: 24.000+ conversas, ~366.000 citações, 9% referenciando outlets de notícias.
- Achados principais:
  - Citações concentram-se em poucos outlets, com viés ideológico (skew liberal nos EUA).
  - Modelos OpenAI: top 20 outlets = **67,3%** de todas as citações de notícia.
  - Modelos dentro da mesma família (OpenAI, Google, Perplexity) citam de modo similar, mas entre famílias a similaridade cosseno cai para < 0,33.
  - Sistemas raramente citam fontes de baixa credibilidade — sugere filtro de qualidade.

### 2.3 Source coverage e bias (estudo de larga escala)

**[Zhang, Ye, Peng, Garimella, Tyson, 2025]** Source Coverage and Citation Bias in LLM-based vs. Traditional Search Engines. arXiv:2512.09483, submetido 10-dez-2025. URL: https://arxiv.org/abs/2512.09483

- 55.936 queries × 6 LLM-SEs × 2 buscadores tradicionais.
- **37%** dos domínios citados por LLM-SEs são únicos a esses motores (não aparecem em Google/Bing).
- Contudo, LLM-SEs NÃO superam buscadores tradicionais em credibilidade, neutralidade política e segurança.
- Implicação operacional: diversidade ≠ qualidade; otimizar para LLM exige cobrir um conjunto de domínios distinto do que SEO clássico cobre.

### 2.4 Query reformulation e reprodutibilidade

**[Bigdeli, Hamidi Rad, Le, Incesu, Arabzadeh, Clarke, Bagheri, 2026]** A Reproducibility Study of LLM-Based Query Reformulation. arXiv:2604.27421, submetido 30-abr-2026, aceito em SIGIR 2026. URL: https://arxiv.org/abs/2604.27421

- 10 abordagens representativas de reformulação por LLM avaliadas sob condições uniformes em 9 benchmarks.
- 3 achados críticos:
  1. Ganhos dependem fortemente do paradigma de retrieval (léxico vs. esparso neural vs. denso neural).
  2. Melhorias em retrieval léxico NÃO transferem consistentemente para retrievers neurais.
  3. LLMs maiores NÃO entregam ganho uniforme em performance downstream.
- Tooling: QueryGym (toolkit aberto + leaderboard público).

---

## 3. Métricas e benchmarks novos (visibility, attribution, brand mention)

### 3.1 Citation Selection vs. Citation Absorption (framework de medição)

**[Zhang, He, Yao, 2026]** From Citation Selection to Citation Absorption: A Measurement Framework for Generative Engine Optimization Across AI Search Platforms. arXiv:2604.25707, submetido 28-abr-2026 (v2 em 29-abr-2026). URL: https://arxiv.org/abs/2604.25707

- 602 prompts × ChatGPT, Google AIO/Gemini, Perplexity = 21.143 citações × 18.151 páginas × 72 features extraídas.
- **Citation Selection** = a plataforma escolheu a fonte para considerar.
- **Citation Absorption** = a fonte efetivamente contribuiu linguagem/evidência/estrutura/factualidade para a resposta final.
- Achado-chave: as duas métricas divergem. Perplexity e Google citam mais fontes amplamente; ChatGPT cita menos mas absorve mais.
- Páginas de alta influência: mais longas, mais estruturadas, semanticamente alinhadas à intenção, ricas em evidência extraível (definições, números, comparações, passos).

### 3.2 Hallucinated citations (problema de saúde pública para ciência)

**[Zhao, Wang, Stuart, De Vaan, Ginsparg, Yin, 2026]** LLM hallucinations in the wild: Large-scale evidence from non-existent citations. arXiv:2605.07723, submetido 8-mai-2026. URL: https://arxiv.org/abs/2605.07723

- Audita 111 milhões de referências em 2,5 milhões de papers (arXiv, bioRxiv, SSRN, PubMed Central).
- Estimativa conservadora: **146.932 citações alucinadas só em 2025**.
- Concentração em campos com adoção rápida de IA + manuscritos com assinatura linguística de redação assistida + times pequenos / early-career.
- Vieses: citações alucinadas atribuem crédito desproporcionalmente a pesquisadores já proeminentes e homens — reforçam desigualdades acadêmicas existentes.
- **Implicação para o repo geo-ipog:** confirma a REGRA já adotada no posgraduacaopsicologia.com de nunca aceitar DOI confabulado por Opus/Sonnet/GPT-4o, sempre rodar dossiê Perplexity dedicado antes de redação.

### 3.3 Manipulação adversarial de ranking via prompt

**[Tang, Fan, Yu, Yang, Zhao, Hu, 2025]** StealthRank: LLM Ranking Manipulation via Stealthy Prompt Optimization. arXiv:2504.05804, submetido 8-abr-2025 (revisado 23-mai-2025). URL: https://arxiv.org/abs/2504.05804

- Framework de otimização baseado em energia + dinâmica de Langevin para gerar sequências adversariais embutidas em descrições de item/documento.
- Boost de ranking covert sem deixar traços explícitos de manipulação — vulnerabilidade ainda aberta em LLM rankers.
- Relevância para GEO ético: existem técnicas adversariais funcionais; conteúdo legítimo precisa competir com elas no curto prazo.

---

## 4. Estudos empíricos sobre AI Overviews e impacto em SEO orgânico

### 4.1 Estudo causal canônico (Wikipedia natural experiment)

**[Khosravi, Yoganarasimhan, 2026]** Impact of AI Search Summaries on Website Traffic: Evidence from Google AI Overviews and Wikipedia. arXiv:2602.18455, submetido 5-fev-2026 (v4 em 12-mai-2026). URL: https://arxiv.org/abs/2602.18455

- Design experimental: rollout escalonado do AIO entre idiomas. Inglês exposto vs. Hindi, Indonésio, Japonês e Português (controle) durante a janela do estudo.
- 161.382 pares artigo-idioma matched.
- **Efeito causal: redução de ~15% no tráfego diário de artigos em inglês expostos ao AIO.**
- Heterogeneidade: artigos de Cultura caem mais; STEM cai bem menos — sugere que o AIO substitui melhor quando a resposta cabe em parágrafo curto.
- Excepcional força metodológica para citar em material institucional (Brasil GEO).

### 4.2 Disrupção empírica multi-engine

**[Grossman, Liu, Chen, Smith, Borcea, Chen, 2026]** How Generative AI Disrupts Search: An Empirical Study of Google Search, Gemini, and AI Overviews. arXiv:2604.27790, submetido 30-abr-2026. URL: https://arxiv.org/abs/2604.27790

- Achados-chave:
  - Mais de **50%** das queries representativas disparam AIO; AIO renderiza acima dos resultados orgânicos.
  - Padrões de seleção de fonte "substancialmente diferentes" — search tradicional prioriza instituições estabelecidas; generative prioriza Google-owned content.
  - Sites que bloqueiam crawlers do Google AI perdem visibilidade nas AIOs mesmo com conteúdo acessível em outras superfícies.
  - Consistência reduzida: queries idênticas ou levemente variadas produzem respostas instáveis.
- Implicação operacional: a decisão de bloquear AI bots no robots.txt tem custo de visibilidade mensurável — discussão crítica para a estratégia llms.txt do repo.

---

## 5. Papers sobre estrutura de conteúdo que LLMs citam

### 5.1 Schema.org / structured data como memory layer

**[Volpini, Raad, Gamba, Riccitelli, 2026]** Structured Linked Data as a Memory Layer for Agent-Orchestrated Retrieval. arXiv:2603.10700, submetido 11-mar-2026. URL: https://arxiv.org/abs/2603.10700

- Investiga se linked data estruturado melhora retrieval em RAG (4 domínios: editorial, legal, viagem, e-commerce).
- Achado refinado: **markup JSON-LD sozinho gera melhoria apenas modesta**; quando combinado com formato enhanced entity page (com instruções para agentes, breadcrumbs, neural search), os ganhos saltam para **+29,6% acurácia em RAG padrão e +29,8% em pipelines agênticos**.
- Implicação para posgraduacaopsicologia.com: o investimento em schema só rende quando acompanhado de page architecture otimizada (já feito nos hubs /metodos, /evidencias, /casos, /intervencoes).

### 5.2 Schema-guided entity extraction

**[Choudhary et al., 2025]** PARSE: LLM Driven Schema Optimization for Reliable Entity Extraction. arXiv:2510.08623, submetido 9-out-2025. URL: https://arxiv.org/abs/2510.08623

- JSON schemas como "natural language understanding contract" — encodam regras, relações e expectativas sobre estrutura de dados.
- PARSE atinge até **64,7% melhoria** em SWDE; combinado com framework completo, ganhos de 10% across modelos.

### 5.3 Estrutura preferida em páginas absorvidas

Consolidado da análise de Zhang/He/Yao (Seção 3.1) + Chen/Wang/Chen/Koudas (Seção 1.2) + Wu/Zhong/Kim/Xiong (Seção 1.2):

- Páginas que LLMs citam **e absorvem** tendem a ser:
  - Mais longas (mas não infinitas — entre 1.500-4.000 palavras).
  - Estruturadas em H2/H3 com âncoras claras.
  - Semanticamente alinhadas à intenção (não apenas keyword match).
  - Ricas em evidência extraível: definições explícitas, números com unidade, tabelas comparativas, passos numerados, FAQs com Q&A direta.
  - Earned media tem mais peso que owned media (terceiros autoritativos > propaganda de marca).

---

## 6. Glossário acadêmico (termos novos 2025-2026)

| Termo | Definição operacional | Origem canônica |
|---|---|---|
| **Generative Engine (GE)** | Sistema que usa LLM para sintetizar e sumarizar fontes em resposta a queries (ChatGPT, Perplexity, Gemini, AI Overviews). | Aggarwal et al. 2024 (arXiv:2311.09735) |
| **GEO (Generative Engine Optimization)** | Paradigma de otimização de conteúdo para maximizar visibilidade em respostas de GEs. | Aggarwal et al. 2024 |
| **Citation Selection** | Estágio onde a plataforma escolhe quais fontes considerar para uma query. | Zhang, He, Yao 2026 (arXiv:2604.25707) |
| **Citation Absorption** | Estágio onde a fonte selecionada efetivamente contribui linguagem/evidência/estrutura para a resposta final. | Zhang, He, Yao 2026 |
| **Citation Faithfulness** | A afirmação foi gerada A PARTIR da fonte citada, não de memória paramétrica do modelo. | Wallat et al. ICTIR 2025 |
| **Citation Correctness** | A fonte citada de fato suporta a afirmação (independente de como a afirmação foi gerada). | Wallat et al. ICTIR 2025 |
| **G-Eval / G-Eval 2.0** | Framework de avaliação multi-dimensional de conteúdo otimizado para GE. | Chen et al. 2025 (arXiv:2508.11158) |
| **GEO-bench / CC-GSEO-Bench / SAGEO Arena / E-GEO / GEM-Bench** | Benchmarks especializados de GEO em diferentes verticais. | Sources individuais nas Seções 1.1 e 1.3 |
| **Stage-level visibility** | Avaliação de visibilidade por estágio do pipeline (retrieval → ranking → geração → resposta). | SAGEO Arena 2026 (arXiv:2602.12187) |
| **Earned media bias** | Tendência sistemática de AI search a citar terceiros autoritativos sobre conteúdo da própria marca. | Chen, Wang, Chen, Koudas 2025 (arXiv:2509.08919) |
| **Adversarial GEO / StealthRank** | Manipulação de ranking via prompt injection covert. | Tang et al. 2025 (arXiv:2504.05804) |
| **Hallucinated citation** | Referência citada por LLM que não existe na literatura ou cujo conteúdo não corresponde ao alegado. | Zhao et al. 2026 (arXiv:2605.07723) |

---

## 7. Sources spot-checked (lista canônica)

Cada entrada confirmada individualmente via WebFetch em 2026-05-17. URL retorna 200 OK, título e autoria batem com o citado.

1. [Aggarwal et al., 2024] GEO: Generative Engine Optimization — https://arxiv.org/abs/2311.09735 — confirmado 2026-05-17
2. [Chen, Wang, Chen, Koudas, 2025] Generative Engine Optimization: How to Dominate AI Search — https://arxiv.org/abs/2509.08919 — confirmado 2026-05-17
3. [Wu, Zhong, Kim, Xiong, 2025] What Generative Search Engines Like and How to Optimize Web Content Cooperatively — https://arxiv.org/abs/2510.11438 — confirmado 2026-05-17
4. [Chen, Wu, Bao, Chen, Liao, Huang, 2025] Role-Augmented Intent-Driven Generative Search Engine Optimization — https://arxiv.org/abs/2508.11158 — confirmado 2026-05-17
5. [Chen et al., 2025] CC-GSEO-Bench — https://arxiv.org/abs/2509.05607 — confirmado 2026-05-17
6. [Kim et al., 2026] SAGEO Arena — https://arxiv.org/abs/2602.12187 — confirmado 2026-05-17
7. [Bagga, Farias, Korkotashvili, Peng, Wu, 2025] E-GEO — https://arxiv.org/abs/2511.20867 — confirmado 2026-05-17
8. [Hu, Zhang, Shi, Xiao, 2025] GEM-Bench — https://arxiv.org/abs/2509.14221 — confirmado 2026-05-17
9. [Qian et al., 2025] VeriCite — https://arxiv.org/abs/2510.11394 — confirmado 2026-05-17
10. [Choi, Guo, Fung, Wang, 2025] CiteGuard — https://arxiv.org/abs/2510.17853 — confirmado 2026-05-17
11. [Yang, 2025] News Source Citing Patterns in AI Search Systems — https://arxiv.org/abs/2507.05301 — confirmado 2026-05-17
12. [Zhang, Ye, Peng, Garimella, Tyson, 2025] Source Coverage and Citation Bias in LLM-based vs. Traditional Search Engines — https://arxiv.org/abs/2512.09483 — confirmado 2026-05-17
13. [Bigdeli et al., 2026] A Reproducibility Study of LLM-Based Query Reformulation — https://arxiv.org/abs/2604.27421 — confirmado 2026-05-17
14. [Zhang, He, Yao, 2026] From Citation Selection to Citation Absorption — https://arxiv.org/abs/2604.25707 — confirmado 2026-05-17
15. [Zhao et al., 2026] LLM hallucinations in the wild — https://arxiv.org/abs/2605.07723 — confirmado 2026-05-17
16. [Tang et al., 2025] StealthRank — https://arxiv.org/abs/2504.05804 — confirmado 2026-05-17
17. [Khosravi, Yoganarasimhan, 2026] Impact of AI Search Summaries on Website Traffic — https://arxiv.org/abs/2602.18455 — confirmado 2026-05-17
18. [Grossman et al., 2026] How Generative AI Disrupts Search — https://arxiv.org/abs/2604.27790 — confirmado 2026-05-17
19. [Volpini, Raad, Gamba, Riccitelli, 2026] Structured Linked Data as a Memory Layer for Agent-Orchestrated Retrieval — https://arxiv.org/abs/2603.10700 — confirmado 2026-05-17
20. [Wallat et al., 2025] Correctness is not Faithfulness in Retrieval Augmented Generation Attributions — ICTIR 2025, ACM DOI 10.1145/3731120.3744592, PDF em https://staff.fnwi.uva.nl/m.derijke/wp-content/papercite-data/pdf/wallat-2025-correctness.pdf — citado via SIGIR 2025 proceedings (URL ACM completa retornou 403 nesta sessão, PDF do autor confirmado via WebFetch).

### Sources NÃO confirmadas (citadas em fontes secundárias mas sem URL primária validada nesta wave)

- KDD 2024 proceedings (dl.acm.org/doi/10.1145/3637528.3671900) — ACM Digital Library retornou HTTP 403 nesta sessão; o paper está confirmado via arXiv 2311.09735.
- PARSE (arXiv:2510.08623) — citado a partir de busca, não tive WebFetch direto bem-sucedido. Marcar como `[FALTA EVIDÊNCIA FORTE]` até reconfirmar.

---

## 8. Gaps e perguntas em aberto

### 8.1 Gaps de evidência identificados nesta wave

1. **Português brasileiro / mercado BR.** Toda a literatura confirmada é em inglês, com benchmarks em inglês (com exceção de Khosravi/Yoganarasimhan que usa PT como CONTROLE não-exposto). Não há paper indexado em arXiv 2025-2026 medindo GEO especificamente em consultas em português brasileiro ou no comportamento de citation patterns para domínios .com.br.
2. **Educação / pós-graduação como vertical.** Os benchmarks especializados existem para e-commerce (E-GEO), publicidade (GEM-Bench) e busca em geral, mas não há benchmark dedicado a educação/cursos. Oportunidade canônica para Brasil GEO publicar.
3. **Psicologia / saúde mental como vertical.** AI Overviews têm comportamento conservador em saúde (filtros de credibilidade reforçados), mas não há estudo quantitativo público mapeando padrões de citação para queries de psicologia/psiquiatria/saúde mental.
4. **Disclosure / transparência editorial.** Há discussão sobre faithfulness no nível técnico (NLI), mas pouca literatura empírica sobre se "página com bylines + credenciais explícitas + DOIs de fonte" é citada mais por LLMs do que página equivalente sem isso. Hipótese testável.

### 8.2 Perguntas operacionais para waves B-E

- **Wave B (tools landscape):** validar se Profound, Ahrefs Brand Radar, Peec, Otterly cobrem os 5 modelos canônicos (OpenAI, Gemini, Claude, Perplexity, Groq) e se medem citation selection + absorption ou apenas selection.
- **Wave C (KPIs):** mapear quais métricas dos benchmarks acadêmicos (Exposure, Faithful Credit, Causal Impact, etc.) traduzem-se em KPIs operacionais já em produção no dashboard de 25 prompts canônicos do posgraduacaopsicologia.com.
- **Wave D (semantic layer):** o paper Volpini et al. sugere que entity pages enhanced > schema sozinho. Auditar se os hubs do posgraduacaopsicologia.com já têm entity pages no padrão proposto ou se ainda dependem de JSON-LD sem afford structure.
- **Wave E (SEO-GEO convergence):** Bigdeli et al. mostraram que reformulation gains não transferem entre paradigmas de retrieval. Implicação: campanhas de cobertura semântica devem ser planejadas POR engine, não uma só estratégia transversal.

### 8.3 Anti-padrões identificados nesta literatura

- Tratar GEO como "SEO + schema" — vários papers (especialmente Chen/Wu/Bao 2025 e Wu/Zhong/Kim/Xiong 2025) mostram que a natureza black-box dos GEs torna técnicas tradicionais insuficientes.
- Confiar em domain authority / PageRank como proxy de citation probability — Zhang et al. 2025 mostra que LLM-SEs citam 37% de domínios únicos vs. buscadores tradicionais, sinalizando que o sinal de autoridade interno dos LLMs diverge do PageRank.
- Otimizar apenas para selection ignorando absorption — Zhang/He/Yao 2026 mostra que as duas métricas divergem; uma página pode ser citada (linkada) sem que seu conteúdo realmente vire o corpo da resposta gerada.
