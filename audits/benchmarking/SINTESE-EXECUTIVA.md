# Síntese Executiva — Benchmarking dos 5 Concorrentes do IPOG

> **Status:** vigente desde 2026-04-30
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Audiência primária:** Ronan Maia (CEO IPOG) — leitura para checkpoint executivo mensal.
> **Última revisão:** 2026-04-30

## Tese central

A categoria-naming "MBA Online de Psicologia" no Brasil em 2026 está vazia. Estácio, Anhanguera, UNINTER, UniCesumar e PUC-Minas Virtual — os 5 concorrentes principais do IPOG na vertical educação superior em pós online de Psicologia — oferecem **especializações lato sensu**, mas nenhum nomeia formalmente o produto como MBA. A janela competitiva mais clara para o IPOG é capturar essa categoria-naming antes que os concorrentes massivos reajam, com produto, Schema e PR sincronizados no pico de captação 2026.2.

## Diagnóstico em 5 linhas

1. **Capilaridade física é assimétrica**, mas perde força em LLMs — o aluno que pesquisa em ChatGPT/Claude/Perplexity não vê polos no mapa, vê citação textual.
2. **Marca institucional dos 5 concorrentes é forte na chancela MEC** — terreno saturado e indiferenciável; disputar terreno disciplinar (Psicologia) e não institucional.
3. **Nenhum dos 5 tem `llms.txt`. Nenhum tem `EducationalOccupationalProgram` Schema. Nenhum tem `Person` Schema vinculado a Lattes/ORCID para corpo docente.** Três janelas técnicas defensáveis.
4. **Anhanguera autobloqueia crawlers de IA via WAF (HTTP 403)** — vulnerabilidade autoinfligida do maior concorrente em escala financeira; janela RAG-native aberta.
5. **PUC-Minas restringe Psicologia em EAD** (decreto + postura institucional) — o quadrante "premium online em Psicologia" está sem ocupante natural.

## Top 5 movimentos prioritários do IPOG na Onda 1

Priorizados por relação **esforço × impacto** estimada e ordem de execução:

1. **Publicar `llms.txt` em `ipog.edu.br`** declarando hub, posicionamento e prioridades de citação (1-2 dias de esforço; conforme `audits/LLMS-TXT-TEMPLATE.md`).
2. **Lançar produto MBA Online de Psicologia [Cluster] com naming explícito** e refletir o naming em Schema `EducationalOccupationalProgram` (decisão de produto IPOG sincronizada com decisão de Bruno + Ronan).
3. **Implementar Schema canônico completo** (Course + EducationalOccupationalProgram + EducationalOrganization + FAQPage + Person para 3 docentes piloto) na página de produto, conforme `audits/SCHEMA-PATTERNS.md`.
4. **Publicar primeira peça HBR-grade assinada por Alexandre Caramaschi** sobre por que a categoria MBA Online de Psicologia precisa existir, com cross-link para o produto.
5. **Capturar baseline real cross-LLM nos 15 prompts** da `matriz-presenca-llm.md` antes de Anhanguera desbloquear WAF ou PUC-Minas reabrir Psicologia EAD.

## O que NÃO disputar

- **Capilaridade física:** flanquear ("polo terceirizado vs. atendimento direto"), não bater.
- **Mídia paga digital:** não disputar Google Ads e Meta Ads em volume — guerra assimétrica via GEO.
- **Catálogo horizontal de Psicologia:** profundidade em 3-5 produtos > largura em 16+.
- **Rankings globais (Times Higher Education, QS):** não atingíveis no horizonte do programa — substituir por reconhecimento de nicho.
- **Velocidade de lançamento massiva da UNINTER (90 dias):** poucos lançamentos, alta profundidade — cada lançamento é marco editorial.

## O que defender ANTES dos concorrentes reagirem

1. **`llms.txt` no nicho** — 1ª instituição de pós EAD em Psicologia BR a publicar.
2. **`EducationalOccupationalProgram` Schema com `programType: "MBA"`** — sinal técnico canônico para a categoria.
3. **`Person` Schema vinculado a Lattes/ORCID para corpo docente** — janela mais durável (exige consentimento docente).
4. **Compliance CFP/SATEPSI explícita em conteúdo + Schema** — nenhum dos 5 destaca; cluster Avaliação Psicológica é o flanco mais limpo.
5. **Naming canônico "MBA Online de Psicologia"** em produto, Schema, conteúdo e PR — categoria a capturar.

## Riscos críticos

- Atraso no lançamento do produto IPOG empurra share-of-voice para concorrentes que reagirem primeiro à demanda emergente.
- Concorrentes especialistas em Psicologia (InEPP, IBNeuro, INPG, IBPEX) podem acelerar GEO antes do IPOG — adicionar como cohort secundário na Onda 2 do benchmarking.
- Mudança na postura da PUC-Minas sobre Psicologia EAD fecha a janela premium-online.
- Anhanguera desbloqueando WAF reduz vantagem RAG-native do IPOG.

## KPIs de sucesso (cross-link com `dashboards/METRICAS-CANONICAS.md`)

- LLM Mention Rate IPOG nos 15 prompts: subir de 0 (hipótese) para Alta em pelo menos 5 prompts até final da Fase 4 (16-07-2026 em diante).
- Share-of-Voice IPOG vs. concorrentes nos 3 clusters: ocupar pelo menos 20% no cluster Organizacional e 15% no cluster Clínica/Neuro/TCC/Avaliação até final do ciclo 2026.2.
- Schema Coverage Score (NAIA): 100% nas páginas de pós em Psicologia até 30-05-2026.
- Velocidade de fechamento de gaps: pelo menos 5 gaps fechados por quinzena entre 14-06 e 15-07-2026.
- Conversion Lift por canal LLM: medir uplift de matrículas atribuídas a referrers de LLM entre janelas pré e pós-Schema.

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
- `prompts/KIT-PROMPTS-V0.md` (66 prompts canônicos para o monitoramento)
- `audits/SCHEMA-PATTERNS.md` (Schema canônico para o IPOG)
- `audits/LLMS-TXT-TEMPLATE.md` (template para publicação imediata)
