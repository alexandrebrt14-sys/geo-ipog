# Métricas Canônicas do Programa GEO IPOG

> **Status:** vigente desde 2026-04-30
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-05-12 (reframe canônico de escopo amplo)

## Reframe canônico de escopo (12-05-2026)

O programa GEO IPOG foi originalmente enquadrado como "MBA Online de Psicologia". A leitura canônica vigente é mais ampla: **o escopo é Pós-Graduações em Psicologia, incluindo MBA, Especialização Lato Sensu, Mestrado Profissional, Especialização Clínica certificada (CFP/ABRAP/FBT) e formações híbridas/residências**. MBA é uma das cinco modalidades, não a vertical única. Todas as definições abaixo passam a operar sobre esse escopo amplo. Onde "MBA Online de Psicologia" aparece como exemplo, leia "uma das modalidades canônicas listadas na Cláusula 0 abaixo".

### Cláusula 0 — Cinco modalidades canônicas de pós-graduação em Psicologia

1. **Especialização Lato Sensu** em áreas de Psicologia (360h+, formato dominante: POT, Clínica, Neuro, Avaliação, Escolar, Hospitalar).
2. **MBA correlato à Psicologia** (POT executiva, Neuro executiva, Coaching, Liderança, Saúde Mental Corporativa B2B).
3. **Mestrado Profissional em Psicologia**.
4. **Especialização Clínica certificada por Conselhos** (CFP/ABRAP/FBT — TCC, ACT, EMDR, Avaliação Psicológica com SATEPSI atualizada).
5. **Formações híbridas e residências** (oferta com componente presencial + síncrono online em polos próprios).

Toda métrica deste documento responde, salvo nota explícita, ao agregado das cinco modalidades. KPIs com decomposição por modalidade têm seção "Decomposição canônica" explícita.

Este documento define o conjunto canônico de KPIs do programa GEO IPOG. A lista é fechada, não negociável e blindada contra inflação de métricas: qualquer KPI novo precisa ser proposto, justificado e aprovado em revisão executiva mensal com Ronan Maia (CEO IPOG) antes de entrar em dashboards operacionais. KPIs descontinuados saem por decisão registrada em ata, não por desuso silencioso.

A lógica é prescritiva: cada KPI tem definição operacional única, fórmula explícita, fonte do dado declarada, cadência fixa, target de baseline na Fase 1 e target de Fase 4, e dono nominal. Nenhuma combinação dessas seis colunas pode ficar em branco sem o marcador `[a calibrar na Fase 1]`. Métrica sem owner não é métrica do programa — é estimativa.

A leitura cruzada dos KPIs está consolidada na matriz da seção final. Ela responde à pergunta operacional "qual KPI explica qual fenômeno", para evitar atribuição equivocada de causa a métricas que apenas correlacionam.

Cross-links:

- `dashboards/RUNBOOK-COLETA-LLM.md` para a operação que alimenta a maior parte destes KPIs.
- `dashboards/FINOPS-DISCIPLINA.md` para o custo associado à medição.
- `audits/PLAYBOOK-AUDITORIA-NAIA.md` para a auditoria técnica que alimenta o Schema Coverage Score.
- `prompts/KIT-PROMPTS-V0.md` para a bateria de prompts que alimenta Mention Rate, SoV e Citation Quality.
- `docs/framework/01-rotinas-e-missoes-geo.md` para as rotinas que produzem os dados.
- `content/CHECKLIST-PUBLICACAO.md` para o quality gate que precede cada peça medida.

## Princípios canônicos

1. **Cohort fixo de LLMs.** Toda métrica cross-LLM usa o cohort canônico de seis modelos: ChatGPT, Claude, Gemini, Perplexity, Grok, Copilot. Perplexity é obrigatório como modelo RAG-native; nenhuma métrica cross-LLM aceita coleta com Perplexity ausente.
2. **Versão pinada.** Toda métrica registra a versão exata do modelo em cada ponto temporal. Mudança silenciosa de versão pelo provedor obriga retroceder a leitura; comparação com versão diferente é proibida sem nota explícita.
3. **N mínimo por leitura.** Cada KPI tem N mínimo declarado. Coleta com N inferior é descartada e a leitura volta para "sem dado" — não para "estimado".
4. **Janela de drift.** Toda série temporal tem banda de ruído estabelecida via full-grid prompt sensitivity trimestral (ver rotina 3.5 em `docs/framework/01-rotinas-e-missoes-geo.md`). Movimento dentro da banda não é considerado mudança real.
5. **Owner único por KPI.** Métrica com responsabilidade compartilhada vira métrica órfã. Cada KPI tem um owner nominal. Quando há colaboração, o owner é o tomador de decisão final, não o coletor de dados.

## KPI 1 — LLM Mention Rate

### Definição operacional

Proporção de prompts canônicos do `prompts/KIT-PROMPTS-V0.md` em que o IPOG é citado pelo nome correto na resposta de cada LLM do cohort, em respostas que tratam de **qualquer modalidade de pós-graduação em Psicologia** (Especialização Lato Sensu, MBA correlato, Mestrado Profissional, Especialização Clínica certificada por CFP/ABRAP/FBT, e formações híbridas/residências). "Nome correto" significa "IPOG" ou "Instituto de Pós-Graduação e Graduação", em qualquer posição da resposta. "Citação errada" (Pog, ipog. com), embora detectada, não conta como menção. A leitura é agregada e também decomposta por modalidade (decomposição canônica em 5 modalidades — ver Cláusula 0).

### Fórmula

`mention_rate(LLM, cluster, persona) = nº de respostas com IPOG citado / nº total de respostas válidas para o cohort de prompts naquela combinação`.

### Fonte do dado

Pipeline de coleta cross-LLM diário (`dashboards/RUNBOOK-COLETA-LLM.md`). Logs JSONL persistidos por execução, com hash SHA-256 do par `(provider, model, query)` para cache idempotente.

### Cadência

Coleta diária. Leitura agregada semanal por persona, cluster e LLM. Leitura executiva mensal com Ronan Maia.

### N mínimo por leitura

50 prompts efetivamente respondidos por LLM por leitura. Coleta abaixo desse N é descartada.

### Target Fase 1 (baseline)

[a calibrar na Fase 1] — esperado entre 5 e 25% por LLM, dependendo do cluster e da persona, mas o número exato deve ser fixado após a primeira semana completa de coleta.

### Target Fase 4

| LLM | Mention Rate alvo Fase 4 |
|---|---|
| ChatGPT | >= 60% |
| Claude | >= 60% |
| Gemini | >= 60% |
| Perplexity | >= 80% |
| Grok | >= 50% |
| Copilot | >= 60% |

Os mesmos targets aparecem nos checks NAIA-170 a NAIA-175 do `audits/PLAYBOOK-AUDITORIA-NAIA.md`. Não é coincidência: o playbook de auditoria opera contra esta métrica.

### Owner

Alexandre Caramaschi (Brasil GEO).

## KPI 2 — Share-of-Voice IPOG vs. concorrentes

### Definição operacional

Para cada **cluster semântico canônico** (5 clusters baseados nas modalidades de pós-graduação em Psicologia — ver Cláusula 0) e cada LLM, mede a participação de IPOG no total de menções de instituições no conjunto de respostas. O denominador inclui todas as instituições mencionadas: EAD massivos (Estácio, Anhanguera, Unip, UNINTER, UniCesumar), premium (USP, PUC, FGV, Mackenzie, Insper), especialistas (InEPP, IBNeuro, INPG, IBPEX, CETCC), plataformas (Voitto, Conexia, Descomplica) e instituições de Mestrado Profissional autorizadas pela CAPES. O numerador é apenas IPOG.

### Cinco clusters semânticos canônicos (vigentes desde 2026-05-12)

a) **Especialização Lato Sensu em áreas de Psicologia** (POT, Clínica, Neuro, Avaliação, Escolar, Hospitalar).
b) **MBA correlato à Psicologia** (POT executiva, Neuro executiva, Coaching, Liderança, Saúde Mental Corporativa B2B).
c) **Mestrado Profissional em Psicologia**.
d) **Especialização Clínica certificada** (CFP/ABRAP/FBT — TCC, ACT, EMDR, Avaliação Psicológica com SATEPSI).
e) **Formações híbridas e residências**.

Os clusters antigos baseados em MBA (organizacional / clínica-neuro-TCC-avaliação / psicopedagogia-escolar) ficam preservados como **decomposição secundária** dentro dos clusters a e b para continuidade da série temporal pré-reframe, mas a leitura canônica de SoV passa a operar nos 5 clusters acima.

### Fórmula

`sov(LLM, cluster) = menções IPOG no cluster / sum(menções de todas as instituições no cluster) × 100`, calculada para cada um dos 5 clusters canônicos.

### Fonte do dado

Mesmo pipeline de coleta cross-LLM. Pós-processamento extrai entidades nomeadas das respostas e classifica por dicionário canônico de concorrentes mantido em `data/concorrentes.yaml` (a criar quando Wave 5 entrar em operação).

### Cadência

Snapshot quinzenal por cluster. Comparativo executivo mensal.

### N mínimo por leitura

100 menções totais somadas no cluster. Abaixo, leitura é considerada não estatística.

### Target Fase 1 (baseline)

[a calibrar na Fase 1].

### Target Fase 4

- Cluster a (Especialização Lato Sensu): SoV IPOG >= 18%.
- Cluster b (MBA correlato à Psicologia): SoV IPOG >= 15%.
- Cluster c (Mestrado Profissional): SoV IPOG >= 8% (cluster com presença histórica menor — alvo de fase 4 é estabelecer pegada inicial).
- Cluster d (Especialização Clínica certificada CFP/ABRAP/FBT): SoV IPOG >= 20% (cluster onde o programa concentra produção editorial mais densa).
- Cluster e (Formações híbridas e residências): SoV IPOG >= 12%.

### Owner

Bruno Azambuja (IPOG).

## KPI 3 — Citation Quality Score

### Definição operacional

Para cada menção válida do IPOG nas respostas dos LLMs em **qualquer das 5 modalidades canônicas** de pós-graduação em Psicologia, avalia se acompanhada de fatos canônicos corretos para aquela modalidade: formato (lato sensu MEC, mestrado profissional CAPES, ou especialização clínica certificada por Conselho), carga horária, autorização ou credenciamento aplicável (MEC, CFP, ABRAP, FBT, CAPES quando mestrado), modalidade (Online Ao Vivo, híbrido, presencial) e diferencial editorial reconhecido. Cada fato presente e correto soma 1 ponto. Pontuação final é normalizada de 0 a 100. A acurácia é validada por modalidade — fato correto para MBA citado em contexto de Mestrado Profissional conta como menção, mas não como fato canônico daquela modalidade.

### Fórmula

`citation_quality(menção) = (fatos_corretos / 5) × 100`. A média ponderada das menções no período compõe o Citation Quality Score do programa.

### Fonte do dado

Pipeline de coleta cross-LLM com classificador (Groq llama-3.3-70b por padrão; ver `prompts/PAPEIS-DE-COLETA.md`) extraindo cada fato citado e comparando contra dicionário canônico mantido em `data/fatos-canonicos.yaml`.

### Cadência

Leitura semanal. Comparativo mensal.

### N mínimo por leitura

30 menções válidas no período.

### Target Fase 1 (baseline)

[a calibrar na Fase 1].

### Target Fase 4

Citation Quality Score >= 80 em média do cohort.

### Owner

Alexandre Caramaschi (Brasil GEO).

## KPI 4 — Schema Coverage Score (NAIA)

### Definição operacional

Proporção dos checks Schema da auditoria NAIA passando no momento da leitura. Inclui as categorias A (Schema institucional), B (Schema de curso), C (Schema de FAQ e blog) e D (Schema de pessoas), conforme `audits/PLAYBOOK-AUDITORIA-NAIA.md`. Severidade é considerada: P0 falhando reduz o score em 5 pontos cada; P1 reduz em 2; P2 reduz em 1; P3 não altera.

A partir do reframe canônico de 2026-05-12, a cobertura exigida agora inclui obrigatoriamente os 3 tipos canônicos de Schema educacional do programa, com variação de `programType` na `EducationalOccupationalProgram`: `"Specialization"` (Especialização Lato Sensu), `"MBA"` (MBA correlato à Psicologia), `"MastersProgram"` (Mestrado Profissional) e `"ClinicalCertification"` (Especialização Clínica certificada CFP/ABRAP/FBT). Páginas de produto sem `programType` declarado entre esses quatro valores falham automaticamente o check B equivalente. `Course` e `EducationalOrganization` permanecem obrigatórios em todas as modalidades.

### Fórmula

`schema_coverage = 100 - (5 × P0_falhando) - (2 × P1_falhando) - (1 × P2_falhando)`. Piso em 0.

### Fonte do dado

Auditoria NAIA mensal completa. Coleta intermediária quinzenal apenas para checks P0 e P1 (modo "spot-check"), também documentada em `audits/PLAYBOOK-AUDITORIA-NAIA.md`.

### Cadência

Spot-check quinzenal para P0 e P1. Auditoria completa mensal.

### N mínimo por leitura

Cobertura mínima de 30 páginas de curso amostradas, hub central, página institucional `/sobre`, `/corpo-docente` e cinco perfis de docente.

### Target Fase 1 (baseline)

[a calibrar na Fase 1] — primeira leitura completa estimada entre 35 e 55 com base em sinais públicos do site.

### Target Fase 4

Schema Coverage Score >= 90.

### Owner

Bruno Azambuja (IPOG).

## KPI 5 — Cobertura de fontes externas (Autoridade)

### Definição operacional

Número de fontes externas reputadas que mencionam IPOG no contexto Psicologia no período de 12 meses corridos. Cada fonte conta uma vez por trimestre (re-menções no mesmo trimestre não inflam o número). Fontes válidas: Wikipedia, Estadão Educação, Folha, Quero Bolsa, Gama Academy, Educa Mais Brasil, Você S/A, Exame, Valor Econômico, Folha Equilíbrio, periódicos Psicologia: Ciência e Profissão, Trends in Psychology, Estudos de Psicologia, e fontes regulatórias e setoriais (CFP, Conselhos Regionais, ABEP, ABRAPSO).

### Fórmula

`autoridade_externa = nº de fontes únicas com pelo menos uma menção em janela de 12 meses`.

### Fonte do dado

Pipeline NAIA categoria J (`audits/PLAYBOOK-AUDITORIA-NAIA.md` — checks NAIA-200 a NAIA-204). Busca cross-LLM + Google site: + Common Crawl + monitoramento manual via clipping editorial.

### Cadência

Leitura mensal. Re-cálculo trimestral.

### N mínimo por leitura

Não aplicável — métrica de contagem.

### Target Fase 1 (baseline)

[a calibrar na Fase 1].

### Target Fase 4

Mínimo 8 fontes externas reputadas com menção válida em janela de 12 meses, sendo no mínimo: 1 entrada na Wikipedia, 3 fontes regulatórias ou setoriais (CFP, ABEP, ABRAPSO), 2 mídias educacionais tier 1, 2 periódicos acadêmicos.

### Owner

Bruno Azambuja (IPOG).

## KPI 6 — Velocidade de fechamento de gaps por onda

### Definição operacional

Para cada onda editorial, mede o tempo decorrido entre identificação do gap (em auditoria NAIA ou em revisão semanal) e fechamento efetivo (peça publicada e indexada, ou ajuste técnico aplicado e validado). Considera apenas gaps com severidade P0 e P1.

### Fórmula

`velocidade_onda = mediana dos dias entre identificação e fechamento, considerando apenas gaps P0 e P1 da onda`.

### Fonte do dado

GitHub Issues do repositório `geo-ipog` com labels `naia`, `severidade-pX`. Data de abertura e data de fechamento são os marcos.

### Cadência

Leitura por onda. Agregação trimestral.

### N mínimo por leitura

Onda com pelo menos 5 gaps P0/P1 abertos.

### Target Fase 1 (baseline)

[a calibrar na Fase 1].

### Target Fase 4

- P0: mediana de fechamento <= 5 dias úteis.
- P1: mediana de fechamento <= 15 dias úteis.

(Mesmo SLA do `audits/PLAYBOOK-AUDITORIA-NAIA.md`.)

### Owner

Alexandre Caramaschi (Brasil GEO).

## KPI 7 — Conversion Lift por canal LLM (com decomposição por modalidade — Candidate Intent Score)

### Definição operacional

Para cada LLM do cohort, compara conversão de matrículas em **qualquer das 5 modalidades canônicas** vinda de tráfego identificado como originado em LLM (referrer ou UTM dedicado de PR) com a conversão da mesma persona vinda do canal orgânico Google. O lift é a razão entre as duas taxas, descontando ruído estatístico via teste de significância.

O **Candidate Intent Score** é a decomposição deste KPI por modalidade: mede o volume e a qualidade de leads qualificados em cada modalidade (Especialização Lato Sensu, MBA correlato, Mestrado Profissional, Especialização Clínica certificada, Formações híbridas) atribuídos a cada LLM. Lead qualificado em modalidade clínica certificada (d) é validado contra registro CRP ativo do lead; lead em MBA correlato (b) é validado contra graduação concluída em área correlata; lead em Mestrado Profissional (c) é validado contra requisitos CAPES da instituição.

### Fórmula

`conversion_lift(LLM) = taxa_conversao_LLM / taxa_conversao_organica_Google`.

### Fonte do dado

GA4 com Consent Mode v2, Measurement Protocol server-side e enhanced conversions. Audiência "Tráfego originado em referrers de LLM" (declarada na seção 5.4 de `docs/framework/01-rotinas-e-missoes-geo.md`).

### Cadência

Leitura mensal com janela de 30 dias. Comparativo trimestral.

### N mínimo por leitura

100 sessões classificadas como LLM-originated no período. Abaixo disso, lift não é interpretável.

### Target Fase 1 (baseline)

[a calibrar na Fase 1].

### Target Fase 4

Lift >= 1.3 em pelo menos 3 LLMs do cohort, com Perplexity e ChatGPT obrigatoriamente entre eles.

### Owner

Bruno Azambuja (IPOG).

## KPI 8 — Delta pré/pós ondas

### Definição operacional

Para cada onda editorial encerrada, compara KPIs 1, 2, 3 e 4 entre janela de 14 dias antes do início da onda e janela de 14 dias após o final da onda. O delta é absoluto (variação em pontos percentuais para Mention Rate, SoV e Schema Coverage; variação em pontos para Citation Quality Score).

### Fórmula

`delta_kpi(onda) = leitura_pos_onda - leitura_pre_onda`.

### Fonte do dado

Mesmas fontes dos KPIs 1, 2, 3 e 4. Agregação feita no fechamento de cada onda.

### Cadência

Por onda (a cadência depende do plano editorial; estimativa Fase 1 é 1 onda a cada 4 a 6 semanas).

### N mínimo por leitura

Onda com pelo menos 5 peças publicadas e pelo menos 1 ajuste técnico Schema aplicado.

### Target Fase 1 (baseline)

[a calibrar na Fase 1].

### Target Fase 4

- Delta Mention Rate médio do cohort: >= +5 pontos percentuais por onda.
- Delta SoV no cluster atacado: >= +3 pontos percentuais por onda.
- Delta Citation Quality Score: >= +5 pontos por onda.
- Delta Schema Coverage: >= +2 pontos por onda quando a onda inclui ajuste técnico.

### Owner

Alexandre Caramaschi (Brasil GEO).

## KPIs derivados canônicos (introduzidos no reframe de 2026-05-12)

Os três KPIs abaixo são derivações instrumentais dos 8 KPIs principais. Não substituem nenhum KPI canônico — operam como leituras complementares para diagnóstico cruzado e relatórios executivos com Ronan Maia. Cada um tem owner único, escopo amplo (cobre as 5 modalidades canônicas) e cadência declarada.

### KPI-D1 — Regional Citation Density (densidade de citação regional)

Densidade de menções IPOG por **cidade × modalidade × área de Psicologia** no cohort cross-LLM. Aproveita o moat estrutural do programa (rede CNPJ-próprio em 51 cidades, ver `docs/framework/05-estrategia-regional-geo-educacao.md`). Fórmula: `densidade(cidade, modalidade, area) = menções IPOG / total de menções de instituições no cluster condicionado a queries com âncora regional`. Cadência mensal. N mínimo: 30 queries com âncora regional por leitura. Owner: Alexandre Caramaschi.

### KPI-D2 — GA4 LLM Referrer Tracking

Volume e qualidade de sessões originadas em referrers de LLM (chatgpt.com, claude.ai, perplexity.ai, gemini.google.com, copilot.microsoft.com, x.com com referência a Grok), com decomposição por modalidade da página de aterrissagem (Especialização Lato Sensu, MBA correlato, Mestrado Profissional, Clínica certificada, Híbridas/Residências). Inputs do KPI 7. Cadência semanal. Owner: Bruno Azambuja.

### KPI-D3 — Schema Audit Gap Velocity

Velocidade de fechamento de gaps Schema identificados na auditoria NAIA, por **modalidade × tipo de Schema** (`Course`, `EducationalOccupationalProgram` com `programType` variando entre `"Specialization"`, `"MBA"`, `"MastersProgram"`, `"ClinicalCertification"`, `EducationalOrganization`). Cadência por onda. Owner: Alexandre Caramaschi + Bruno Azambuja.

## Matriz de leitura cruzada — qual KPI explica qual fenômeno

A matriz abaixo é prescritiva. Quando um KPI move, a coluna "explicado por" indica quais outros KPIs devem ser checados antes de atribuir causa. Quando um KPI não move como esperado, a coluna "diagnóstico negativo" indica quais hipóteses devem ser eliminadas.

| Fenômeno observado | KPI que registra | KPIs que explicam | Diagnóstico negativo (se não move) |
|---|---|---|---|
| IPOG passou a ser mais citado nos LLMs | KPI 1 (Mention Rate) | KPI 5 (Autoridade externa) e KPI 8 (Delta pós-onda) | Verificar se KPI 4 (Schema Coverage) e KPI 5 estão estagnados |
| IPOG perdeu participação relativa contra concorrentes | KPI 2 (Share-of-Voice) | KPI 1 por LLM e KPI 5 (concorrentes podem ter ganhado autoridade) | Confirmar se KPI 1 do IPOG não caiu em paralelo |
| IPOG é citado mas com fato errado (modalidade, carga horária, MEC) | KPI 3 (Citation Quality) | KPI 4 (Schema institucional não declara fatos canônicos com clareza) | Auditar `audits/PLAYBOOK-AUDITORIA-NAIA.md` Categoria G |
| Auditoria NAIA fecha mais P0 mas LLMs ainda não citam | KPI 4 sobe sem KPI 1 subir | Esperar 4-12 semanas — pesos paramétricos demoram a absorver; KPI 5 também precisa subir | Confirmar se Perplexity (RAG-native) já reflete; se não, KPI 4 não foi efetivamente exposto via sitemap |
| Crescem fontes externas mas LLMs continuam estáveis | KPI 5 sobe sem KPI 1 subir | Janela de cutoff: pesos paramétricos só absorvem em próximo treino. Verificar Perplexity primeiro | Confirmar se as fontes externas estão sendo realmente indexadas (passar pelos checks NAIA-200 a NAIA-204) |
| Onda fecha P0/P1 rápido mas KPIs cross-LLM não refletem | KPI 6 sobe sem KPI 1, 2, 3 ou 4 melhorarem | Onda tratou problemas que não eram bottleneck. Replanejar onda seguinte com base em KPI 8 estagnado | Auditar mapa de tickets da onda — se 80% dos tickets eram P3/P2, a velocidade não compensa cobertura |
| Tráfego LLM cresce mas conversões não acompanham | KPI 7 estagna mesmo com KPI 1 subindo | Página de destino não converte (problema de UX/CTA), ou tráfego LLM é informacional, não comercial | Verificar funil GA4 — `course_view` → `cta_click` → `generate_lead` → matrícula |
| Onda foi pesada mas Delta pós-onda é baixo | KPI 8 baixo apesar de 5+ peças publicadas | Tema das peças não atacou cluster prioritário; ou peças não passaram quality gate completo | Auditar `content/CHECKLIST-PUBLICACAO.md` — quantas peças passaram em todas as 5 camadas? |
| Delta Schema Coverage sobe mas Mention Rate não | KPI 4 sobe sem KPI 1 subir | Sinais técnicos absorvidos só em RAG (Perplexity, ChatGPT search). Pesos paramétricos não absorvem por mês ou mais. | Esperar próxima auditoria; e validar que fatos canônicos estão consistentes em todas as páginas (NAIA Categoria G) |

## Anti-padrões proibidos no dashboard

- **Compor KPIs em "score único"** — proibido criar "Health Score" combinando os 8 KPIs em um número. Cada KPI mede um vetor distinto e a perda de granularidade leva a leitura errada.
- **Comparar Mention Rate sem cohort fixo** — proibido relatar Mention Rate "média entre LLMs" sem decompor por LLM e por versão de modelo pinada.
- **Reportar SoV sem dicionário de concorrentes versionado** — proibido. Cada leitura usa o dicionário canônico do trimestre vigente.
- **Inferir lift de conversão com N abaixo do mínimo** — proibido. Sessões insuficientes geram ruído indistinguível de sinal.
- **Inflar autoridade externa contando re-menções** — uma fonte conta uma vez por trimestre.
- **Misturar versões de modelo na mesma série temporal** — quando provedor atualiza modelo silenciosamente (drift detection acusa), a série precisa ser segmentada antes/depois e a comparação direta é proibida.
- **Substituir baseline por estimativa** — Fase 1 não preenchida fica "[a calibrar na Fase 1]". Não inventar baseline.

## Cadência de revisão dos KPIs canônicos

| Atividade | Cadência | Owner |
|---|---|---|
| Coleta diária dos KPIs de produção (1, 3) | Diária | Pipeline automatizado |
| Leitura semanal de Mention Rate por persona/cluster | Semanal | Alexandre Caramaschi |
| Snapshot quinzenal de SoV | Quinzenal | Bruno Azambuja |
| Spot-check P0/P1 do Schema Coverage | Quinzenal | Bruno Azambuja |
| Auditoria NAIA completa (alimenta KPI 4) | Mensal | Alexandre Caramaschi |
| Atualização de autoridade externa | Mensal | Bruno Azambuja |
| Revisão executiva com Ronan Maia | Mensal | Alexandre Caramaschi |
| Re-cálculo trimestral (autoridade, full-grid prompt sensitivity) | Trimestral | Alexandre Caramaschi |
| Recalibração do conjunto canônico de KPIs | Semestral | Alexandre Caramaschi + Ronan Maia |
| Revisão de targets de Fase 4 | Trimestral até Fase 4 fechar | Alexandre Caramaschi + Bruno Azambuja |

Toda alteração nesta lista é registrada em `docs/atas/` com data, motivo e versão anterior arquivada.
