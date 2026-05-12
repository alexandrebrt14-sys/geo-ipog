# Benchmarking dos Concorrentes do IPOG — Pós-Graduações em Psicologia

> **Status:** vigente desde 2026-04-30 (Onda 1), 2026-05-01 (Onda 2), reescopo 2026-05-12
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-05-12

## Escopo canônico

**Este diretório consolida o benchmarking dos concorrentes do IPOG na vertical de Pós-Graduações em Psicologia**, cobrindo as 5 modalidades canônicas: Especialização Lato Sensu (formato dominante), MBA correlato à Psicologia, Mestrado Profissional, Especialização Clínica certificada por Conselhos (CFP, ABRAP, FBT, ABPp) e formações híbridas. O recorte original "MBA Online de Psicologia" foi ampliado em 2026-05-12 para refletir que a oferta dominante do mercado é lato sensu, com MBA como subconjunto relevante.

Benchmarking executado em duas ondas complementares com pesquisa primária e double-check via web em 2026-05-01.

- **Onda 1 (2026-04-30):** cinco concorrentes massivos do EAD brasileiro (Estácio, Anhanguera, UNINTER, UniCesumar, PUC-Minas Virtual). 10 artefatos canônicos.
- **Onda 2 (2026-05-01):** cinco concorrentes especialistas verticais e premium executiva (CETCC, IBNeuro, Sírio-Libanês IEP, wPós/Anhembi, Saint Paul/EXAME). Cinco dossiês individuais + nota de correções de premissa.

A Onda 2 trouxe três correções de identidade institucional consolidadas em `ONDA-2-CORRECOES-PREMISSA.md` — leitura obrigatória antes de operar sobre os dossiês.

## Por onde começar a leitura

- **Checkpoint executivo (Ronan Maia, 30-60 minutos):** `SINTESE-EXECUTIVA.md` (Onda 1) + `ONDA-2-CORRECOES-PREMISSA.md`.
- **Planejamento operacional (Bruno Azambuja, 3-4 horas):** `SINTESE-EXECUTIVA.md` + `pontos-fortes-a-superar.md` + duas matrizes (`matriz-presenca-llm.md` e `matriz-tecnica-schema-seo.md`) + os cinco dossiês da Onda 2.
- **Preparar uma onda específica de execução (Brasil GEO, 6-8 horas):** ler tudo, começando pelos dez dossiês individuais.

## Catálogo de documentos

### Síntese e priorização

- `SINTESE-EXECUTIVA.md` — visão de uma página com a tese central, os top 5 movimentos prioritários do IPOG, o que NÃO disputar, riscos críticos e KPIs de sucesso. **Cobre apenas os 5 concorrentes da Onda 1**; a integração estratégica da Onda 2 deve ser feita na próxima revisão executiva (matrizes técnica e cross-LLM já cobrem os 10).
- `pontos-fortes-a-superar.md` — matriz comparativa por dimensão estratégica + 15 pontos fortes consolidados a superar com a estratégia explícita do IPOG para cada um + recomendações para a Onda 1. **Cobre apenas a Onda 1**; a integração da Onda 2 está pendente.

### Matrizes analíticas (Onda 1 + Onda 2 integradas)

- `matriz-presenca-llm.md` — inferência da presença em motores generativos cross-LLM. **Seções 1-7 cobrem os 5 concorrentes da Onda 1**; **Seção 9 estende para os 5 concorrentes da Onda 2**, com cobertura por cluster, presença esperada nos 15 prompts-âncora, análise por concorrente, 5 janelas adicionais e 8 confirmações pendentes para a Fase 1. Validação completa será feita na Fase 1 com coleta direta nos 6 LLMs canônicos.
- `matriz-tecnica-schema-seo.md` — coleta direta de robots.txt, llms.txt, sitemap, Schema.org, autoridade externa e rankings. **Seções 1-6 cobrem os 5 da Onda 1**; **Seção 8 estende para os 5 da Onda 2** com fetches diretos executados em 2026-05-01, tabelas mestre estendidas, análise técnica por concorrente Onda 2 e 4 janelas técnicas adicionais. Identifica vulnerabilidades autoinfligidas e gaps Schema dos 10 concorrentes.

### Dossiês individuais — Onda 1 (concorrentes massivos)

- `concorrente-estacio.md` — Estácio (Yduqs, B3 YDUQ3). Líder EAD com 2.000+ polos, 1,38 milhão de alunos, CI-EaD nota máxima.
- `concorrente-anhanguera.md` — Anhanguera (Cogna, B3 COGN3). 16+ especializações em Psicologia EAD. WAF bloqueando crawlers de IA.
- `concorrente-uninter.md` — UNINTER (Centro Universitário Internacional). 770 polos BR + 16 internacionais, 580 mil alunos, Reclame Aqui 8,2/10.
- `concorrente-unicesumar.md` — UniCesumar (Vitru Educação, Nasdaq). 1.300 polos, formato Ao Vivo broadcast institucionalizado.
- `concorrente-puc-minas-virtual.md` — PUC-Minas Virtual. RUF top 10 privada + Times Higher Education + QS. Restringe Psicologia em EAD por decreto 12.456/2025.

### Dossiês individuais — Onda 2 (especialistas verticais e premium executiva)

- `concorrente-cetcc.md` — CETCC (Centro de Estudos em Terapia Cognitivo-Comportamental). Especialista vertical em TCC clássica de Beck, fundado em 2002 por Eliana Melcher Martins. Certificação MEC via FAAECPlan (Portaria 1464/2023). +5.000 profissionais formados desde a fundação.
- `concorrente-ibneuro.md` — IBNeuro (Instituto Brasileiro de Neuropsicologia e Ciências Cognitivas, Brasília/DF). Boutique técnica em Neuropsicologia clínica, 17 docentes (10 PhD), modelo telepresencial, +1.500 profissionais formados. Recusa explícita o naming "MBA". **Não confundir com IBNeC** (ver `ONDA-2-CORRECOES-PREMISSA.md`).
- `concorrente-sirio-libanes-iep.md` — Hospital Sírio-Libanês IEP/Faculdade Sírio-Libanês. Premium absoluto em saúde (JCI desde 2007, top 100 Newsweek, PROADI-SUS). Pós em Psicologia Hospitalar 100% online com 25 docentes nominais em prática hospitalar diária. Faculdade credenciada em maio/2023; Medicina aprovada com nota máxima via Portaria Seres/MEC nº 226 de 04/04/2025.
- `concorrente-wpos-anhembi.md` — **dossiê duplo** cobrindo wPós/Faculdade Unyleya/Unyead Educacional (origem LeYa Portugal, faculdade no Rio de Janeiro, mantenedora em Brasília) **e** Universidade Anhembi Morumbi/Ânima Educação (B3 ANIM3, ex-Laureate desde 2021). **Não pertencem ao mesmo grupo** (ver `ONDA-2-CORRECOES-PREMISSA.md`).
- `concorrente-conexia-saint-paul.md` — Saint Paul Escola de Negócios (adquirida 100% pelo Grupo EXAME em 09/12/2024, controlada pelo BTG Pactual). José Cláudio Securato como CEO da EXAME Educação. **Conexia Educação** (Grupo SEB, K-12) é desambiguada e descartada como concorrente do IPOG (ver `ONDA-2-CORRECOES-PREMISSA.md`).

### Documentos canônicos da Onda 2

- `ONDA-2-CORRECOES-PREMISSA.md` — registro consolidado das três correções de identidade institucional descobertas durante a pesquisa primária da Onda 2 (IBNeuro ≠ IBNeC; wPós ≠ Anhembi; Conexia ≠ Saint Paul) + premissa Saint Paul × FIA-USP marcada como `[a confirmar]`. **Leitura obrigatória** antes de operar sobre qualquer dossiê da Onda 2.

## Os 10 concorrentes — visão de uma frase cada

### Onda 1 — Massivos do EAD

| Concorrente | Categoria | Diferencial dominante | Vulnerabilidade chave |
|---|---|---|---|
| Estácio | EAD massivo listado em bolsa | 2.000+ polos + CI-EaD 5 + escala Yduqs | Reclame Aqui 5,68/10; sem MBA Psicologia nomeado |
| Anhanguera | EAD massivo grupo Cogna | 16+ especializações + escala Cogna | WAF bloqueando crawlers de IA; sem MBA Psicologia |
| UNINTER | EAD nacional autônoma | Verticalização produtiva + Reclame Aqui 8,2/10 | Wikipedia médio; sem MBA Psicologia |
| UniCesumar | EAD em expansão | Formato Ao Vivo + 1.300 polos + Vitru Nasdaq | Ao Vivo é broadcast (não interação real); sem MBA Psicologia |
| PUC-Minas Virtual | Premium acadêmica online | Status pontifício + RUF top 10 + THE/QS | Restringe Psicologia em EAD por decreto |

### Onda 2 — Especialistas e premium executiva

| Concorrente | Categoria | Diferencial dominante | Vulnerabilidade chave |
|---|---|---|---|
| CETCC | Especialista vertical em TCC clássica | Linhagem direta Beck Institute + supervisão clínica real | Sem MBA nominal; capilaridade só em SP; sem Wikipedia |
| IBNeuro | Boutique técnica em Neuropsicologia | 10 PhD em 17 docentes + clínica-escola própria + Hogrefe | Recusa MBA; só boleto Santander; mono-polo Brasília |
| Sírio-Libanês IEP/FSL | Premium absoluto em Psicologia Hospitalar | Hospital JCI top 100 + corpo docente em ativ. clínica diária | Operação digital imatura (Reclame Aqui ácido); SP+DF apenas |
| wPós + Anhembi (separados) | Faculdade EAD massiva + universidade tradicional | wPós = volume de catálogo; Anhembi = MBA Psi Org. + Wikipedia | wPós sem Wikipedia/MBA; Anhembi com queixa "EAD defasado" |
| Saint Paul + EXAME | Premium executiva C-level com âncora editorial | FT 5x + Top of Mind RH 11 anos + funil EXAME 20M usuários | Sem oferta de Psicologia; preço alto filtra público IPOG |

## Achados estratégicos transversais (Ondas 1 + 2)

### Onda 1 — confirmados

- O vácuo cross-modalidade em Pós-Graduação em Psicologia é estrutural — entre os 5 concorrentes massivos, **todos operam quase exclusivamente em Especialização Lato Sensu**; nenhum nomeia MBA explícito em Psicologia, nenhum oferece Mestrado Profissional online em Psicologia consolidado, nenhum declara Especialização Clínica certificada por Conselhos com Schema canônico.
- **Nenhum dos 5 tem llms.txt.** Janela técnica 100% aberta para o IPOG ser primeiro do nicho.
- **Nenhum tem `EducationalOccupationalProgram` Schema.** Janela semântica para vincular o produto IPOG ao tipo correto.
- **Nenhum tem `Person` Schema com Lattes/ORCID para corpo docente.** Janela durável (exige consentimento docente).
- **Anhanguera bloqueia crawlers de IA via WAF** — vulnerabilidade autoinfligida do maior concorrente em escala.
- **PUC-Minas restringe Psicologia em EAD por decreto** — abre o quadrante "premium online em Psicologia" sem ocupante natural.

### Onda 2 — adicionais

- **A Anhembi Morumbi tem MBA explícito em Psicologia Organizacional e do Trabalho** — esse é o **único concorrente identificado em todo o universo com formato MBA + Psicologia + chancela universitária**. Overlap direto crítico com o produto-âncora do IPOG.
- **Saint Paul/EXAME não tem nenhum curso intitulado Psicologia Organizacional, Psicologia do Trabalho, Saúde Mental Corporativa ou Riscos Psicossociais.** O cluster Organizacional premium-executivo de Psicologia está sem ocupante claro: Saint Paul cobre liderança genérica; Anhembi cobre Psi Org. mas sem o selo premium.
- **Especialistas verticais (CETCC e IBNeuro) recusam o naming "MBA" deliberadamente** — para o público que valoriza a credencial executiva, esse é um vácuo aproveitável.
- **Sírio-Libanês domina inquestionavelmente Psicologia Hospitalar** — não é terreno a disputar de frente; o flanco aberto é cluster amplo de Psicologia + transparência de preço/financiamento + capilaridade fora de SP-DF.
- **Sírio-Libanês FSL bloqueia crawlers IA via WAF** (HTTP 403) — confirmado em fetch direto 2026-05-01. Segundo grande player com vulnerabilidade autoinfligida (após Anhanguera).
- **IBNeuro usa Shopify Product Schema no lugar de Course Schema canônico** — vende cursos como produto e-commerce, LLMs não identificam como pós-graduação canônica.
- **Saint Paul/EXAME tem URLs canônicas em 404 pós-aquisição EXAME** (`/curso/pos-graduacao-saint-paul`, `/curso/mba-executivo-saint-paul`) — janela técnica curta enquanto reorganização editorial não estabiliza (3-6 meses estimados).
- **Fragmentação de domínios é vulnerabilidade comum**: 5+ dos 10 concorrentes operam fragmentação severa (Sírio com 7+ domínios, IBNeuro com 5+, Anhembi com 5+, Saint Paul com 5+, Unyleya com 4+). LLMs preferem hubs canônicos.
- **Vulnerabilidades técnicas comuns aos 10 concorrentes:** nenhum tem llms.txt, `EducationalOccupationalProgram` ou `Person` Schema vinculado a Lattes/ORCID. Apenas Hospital Sírio-Libanês e Universidade Anhembi Morumbi têm Wikipedia denso (os outros 8 estão sem verbete ou com verbete fraco).

## Cadência de atualização

- **Quinzenal:** revisão da matriz de presença cross-LLM com dado real coletado na Fase 1 (Ondas 1 + 2 integradas).
- **Mensal:** revisão da síntese executiva no checkpoint com Ronan Maia + atualização de `ONDA-2-CORRECOES-PREMISSA.md` se novas correções surgirem.
- **Trimestral:** atualização dos dossiês individuais (mudanças de oferta, M&A, lançamentos).
- **Semestral:** expansão do cohort de concorrentes para incluir novos players relevantes.

## Próximas ondas previstas

- **Onda 3 (a programar — recomendada antes do pico de captação 2026.2):** plataformas educacionais e premium acadêmica online (Voitto, Descomplica Pós, Pravaler, FGV Online, Insper Online, Mackenzie Online).
- **Onda 4 (a programar):** especialistas em Psicologia que ficaram fora da Onda 2 (InEPP, INPG, IBPEX, Instituto Padre Saboya), e plataformas que disputam descoberta digital com posicionamento ambíguo entre pós tradicional e curso livre.
- **Integração das Ondas 1 + 2 em matriz consolidada:** próxima revisão de `matriz-presenca-llm.md` e `matriz-tecnica-schema-seo.md` deve incluir colunas para os 5 da Onda 2, com inferência calibrada e integração ao plano da Fase 1.

## Auditorias técnicas pendentes (insumos para o IPOG)

- Confirmar status atual no e-MEC da Faculdade Santa Fé como certificadora dos cursos IBNeuro.
- Reconfirmar com a coordenação CETCC se a Portaria FACON 544/2017 ainda está vigente como certificação adicional.
- Validar parceria Saint Paul × FIA-USP (atualmente marcada como `[a confirmar]` em `ONDA-2-CORRECOES-PREMISSA.md`).
- Coletar dado real cross-LLM nos 15 prompts da matriz × 6 LLMs canônicos para todos os 10 concorrentes (Ondas 1 + 2 integradas).
- Auditoria Schema.org página-a-página dos 10 concorrentes (NAIA-200 a NAIA-299), substituindo a inferência da matriz técnica por dado coletado.
- Confirmar tamanho atual do verbete Wikipedia IPOG vs. Anhembi Morumbi e Hospital Sírio-Libanês — definir baseline para o plano de expansão.
- Recheck mensal das URLs em 404 da Saint Paul/EXAME (janela técnica curta de 3-6 meses).
- Mapear quais subdomínios IBNeuro têm Schema diferente (Shopify storefront vs. domínios `cursos.ibneuro.org`) — Shopify limita estrutura.

## Trabalho pendente de integração

- **`SINTESE-EXECUTIVA.md` e `pontos-fortes-a-superar.md` ainda cobrem apenas a Onda 1** — integração estratégica da Onda 2 deve ser feita na próxima revisão executiva, antes do checkpoint mensal com Ronan Maia. Insumos para essa integração já estão consolidados na seção 9 da matriz cross-LLM e na seção 8 da matriz técnica.
