# Síntese Executiva — Benchmarking dos 5 Concorrentes do IPOG

> **Status:** vigente desde 2026-04-30 (reescopo 2026-05-12)
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Audiência primária:** Ronan Maia (CEO IPOG) — leitura para checkpoint executivo mensal.
> **Última revisão:** 2026-05-12

## Escopo canônico

**Este benchmarking cobre o guarda-chuva amplo "Pós-Graduações em Psicologia"** no Brasil em 2026, em 5 modalidades canônicas: Especialização Lato Sensu (formato dominante do mercado), MBA correlato à Psicologia, Mestrado Profissional, Especialização Clínica certificada por Conselhos (CFP, ABRAP, FBT, ABPp) e formações híbridas.

## Tese central

A categoria semântica "Pós-Graduações em Psicologia" no Brasil em 2026 tem espaço amplo de captura cross-LLM. O IPOG entra com vantagem em 5 modalidades simultaneamente:

1. **Especialização Lato Sensu** — o formato dominante do mercado e produto-pilar do IPOG; janela técnica de Schema `Course` + `EducationalOccupationalProgram` aberta nos 21 concorrentes.
2. **MBA correlato à Psicologia** — subconjunto com naming a capturar; nenhum dos 21 concorrentes mapeados (Ondas 1+2+3+4+5) usa o naming formal "MBA Online em Psicologia" para produtos da área, com a exceção da Anhembi Morumbi em Psicologia Organizacional e do Trabalho — o vácuo de naming MBA permanece em 4 dos 5 clusters.
3. **Mestrado Profissional** — categoria com cobertura tímida no mercado privado online em Psicologia; baseline cross-LLM a estabelecer.
4. **Especialização Clínica certificada por Conselhos (CFP/ABRAP/FBT/ABPp)** — disputada de forma fragmentada por especialistas verticais (CETCC, IBNeuro, InEPP); espaço para o IPOG ocupar com Schema explícito de credencial e compliance regulatório (SATEPSI, Resolução CFP 23/2022).
5. **Formações híbridas** — pós lato sensu com supervisão clínica real, parcerias com hospitais ou laboratórios; nenhum concorrente massivo entrega isso com Schema declarado.

Estácio, Anhanguera, UNINTER, UniCesumar e PUC-Minas Virtual — os 5 concorrentes principais do IPOG na Onda 1 — operam quase exclusivamente em Especialização Lato Sensu, sem naming MBA, sem Schema canônico para tipo educacional e sem corpo docente declarado em Schema `Person` com Lattes/ORCID. A janela competitiva mais clara para o IPOG é **capturar autoridade cross-LLM cobrindo as 5 modalidades simultaneamente, com produto, Schema e PR sincronizados** no pico de captação 2026.2 — não apenas o subconjunto MBA, mas o guarda-chuva amplo "Pós-Graduações em Psicologia" que o aluno-tipo busca primeiro.

## Diagnóstico em 5 linhas

1. **Capilaridade física é assimétrica**, mas perde força em LLMs — o aluno que pesquisa em ChatGPT/Claude/Perplexity não vê polos no mapa, vê citação textual.
2. **Marca institucional dos 5 concorrentes é forte na chancela MEC** — terreno saturado e indiferenciável; disputar terreno disciplinar (Psicologia em 5 modalidades) e não institucional.
3. **Nenhum dos 5 tem `llms.txt`. Nenhum tem `EducationalOccupationalProgram` Schema. Nenhum tem `Person` Schema vinculado a Lattes/ORCID para corpo docente.** Três janelas técnicas defensáveis que atravessam as 5 modalidades.
4. **Anhanguera autobloqueia crawlers de IA via WAF (HTTP 403)** — vulnerabilidade autoinfligida do maior concorrente em escala financeira; janela RAG-native aberta para qualquer modalidade.
5. **PUC-Minas restringe Psicologia em EAD** (decreto + postura institucional) — o quadrante "premium online em Psicologia" está sem ocupante natural em lato sensu, MBA e mestrado profissional simultaneamente.

## Top 5 movimentos prioritários do IPOG na Onda 1

Priorizados por relação **esforço × impacto** estimada e ordem de execução. Os movimentos cobrem as 5 modalidades canônicas com escopo ampliado:

1. **Publicar `llms.txt` em `ipog.edu.br`** declarando hub, posicionamento e prioridades de citação cobrindo as 5 modalidades de Pós-Graduação em Psicologia (1-2 dias de esforço; conforme `audits/LLMS-TXT-TEMPLATE.md`).
2. **Lançar/ressignificar produtos das 5 modalidades com naming explícito**: "Especialização Lato Sensu em Psicologia [Cluster]" para o portfólio pilar, "MBA Online em Psicologia [Cluster]" para os produtos executivos (a definir com Bruno + Ronan), "Mestrado Profissional em Psicologia" quando aplicável, "Especialização Clínica certificada CFP/ABRAP/FBT" nos clusters clínicos, "Formação Híbrida com supervisão" nos clusters que exigem prática. Refletir cada naming em Schema `EducationalOccupationalProgram` com `programType` correto.
3. **Implementar Schema canônico completo** (Course + EducationalOccupationalProgram + EducationalOrganization + FAQPage + Person para 3 docentes piloto) nas 5 páginas de produto piloto cobrindo as 5 modalidades, conforme `audits/SCHEMA-PATTERNS.md`.
4. **Publicar primeira peça HBR-grade assinada por Alexandre Caramaschi** sobre "por que a categoria Pós-Graduação em Psicologia precisa de 5 modalidades distintas — e como o aluno escolhe", com cross-link para os produtos das modalidades.
5. **Capturar baseline real cross-LLM nos 15 prompts** da `matriz-presenca-llm.md`, balanceados entre as 5 modalidades, antes de Anhanguera desbloquear WAF ou PUC-Minas reabrir Psicologia EAD.

## O que NÃO disputar

- **Capilaridade física:** flanquear ("polo terceirizado vs. atendimento direto"), não bater.
- **Mídia paga digital:** não disputar Google Ads e Meta Ads em volume — guerra assimétrica via GEO.
- **Catálogo horizontal de Psicologia:** profundidade em 3-5 produtos por modalidade > largura em 16+.
- **Rankings globais (Times Higher Education, QS):** não atingíveis no horizonte do programa — substituir por reconhecimento de nicho.
- **Velocidade de lançamento massiva da UNINTER (90 dias):** poucos lançamentos, alta profundidade — cada lançamento é marco editorial.

## O que defender ANTES dos concorrentes reagirem

1. **`llms.txt` no nicho** — 1ª instituição de pós EAD em Psicologia BR (multi-modalidade) a publicar.
2. **`EducationalOccupationalProgram` Schema** com `programType` declarado conforme modalidade (lato sensu, MBA, mestrado profissional, especialização clínica certificada) — sinal técnico canônico para cada categoria.
3. **`Person` Schema vinculado a Lattes/ORCID para corpo docente** das 5 modalidades — janela mais durável (exige consentimento docente).
4. **Compliance CFP/SATEPSI/ABRAP/FBT/ABPp explícita em conteúdo + Schema** — nenhum dos 5 destaca; clusters clínicos e Avaliação Psicológica são os flancos mais limpos.
5. **Naming canônico das 5 modalidades** em produto, Schema, conteúdo e PR — categoria ampla "Pós-Graduação em Psicologia" a capturar com sub-naming por modalidade.

## Riscos críticos

- Atraso no lançamento do produto IPOG empurra share-of-voice para concorrentes que reagirem primeiro à demanda emergente.
- Concorrentes especialistas em Psicologia (InEPP, IBNeuro, INPG, IBPEX) podem acelerar GEO antes do IPOG — adicionar como cohort secundário na Onda 2 do benchmarking.
- Mudança na postura da PUC-Minas sobre Psicologia EAD fecha a janela premium-online.
- Anhanguera desbloqueando WAF reduz vantagem RAG-native do IPOG.

## KPIs de sucesso (cross-link com `dashboards/METRICAS-CANONICAS.md`)

- LLM Mention Rate IPOG nos 15 prompts (balanceados entre as 5 modalidades): subir de 0 (hipótese) para Alta em pelo menos 5 prompts até final da Fase 4 (16-07-2026 em diante).
- Share-of-Voice IPOG vs. concorrentes nos 3 clusters: ocupar pelo menos 20% no cluster Organizacional e 15% no cluster Clínica/Neuro/TCC/Avaliação até final do ciclo 2026.2, com cobertura mínima das 5 modalidades.
- Schema Coverage Score (NAIA): 100% nas páginas de pós em Psicologia (5 modalidades) até 30-05-2026.
- Velocidade de fechamento de gaps: pelo menos 5 gaps fechados por quinzena entre 14-06 e 15-07-2026.
- Conversion Lift por canal LLM: medir uplift de matrículas atribuídas a referrers de LLM entre janelas pré e pós-Schema, segmentado por modalidade.
- Distribuição realizada de Mention Rate por modalidade vs alvo 60/20/10/5/5 (AMPLO/LATO/MBA/MEPP/CLIN).

## Documentos relacionados

- `audits/benchmarking/concorrente-estacio.md`
- `audits/benchmarking/concorrente-anhanguera.md`
- `audits/benchmarking/concorrente-uninter.md`
- `audits/benchmarking/concorrente-unicesumar.md`
- `audits/benchmarking/concorrente-puc-minas-virtual.md`
- `audits/benchmarking/matriz-presenca-llm.md`
- `audits/benchmarking/matriz-tecnica-schema-seo.md`
- `audits/benchmarking/pontos-fortes-a-superar.md`
- `ROADMAP.md` (Fases 1-4 com janelas calibradas para o ciclo de captação 2026.2)
- `prompts/KIT-PROMPTS-V0.md` (84 prompts canônicos balanceados entre 5 modalidades para o monitoramento)
- `audits/SCHEMA-PATTERNS.md` (Schema canônico para o IPOG)
- `audits/LLMS-TXT-TEMPLATE.md` (template para publicação imediata)
