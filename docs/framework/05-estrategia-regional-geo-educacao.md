# Estratégia Regional de GEO em Educação — Framework Canônico

> **Status:** vigente desde 2026-05-01
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Sponsor executivo:** Ronan Maia (CEO IPOG)
> **Última revisão:** 2026-05-01

## Por que este documento existe

O programa GEO IPOG nasceu com escopo vertical inicialmente enquadrado em "MBA Online de Psicologia". A leitura canônica vigente desde 2026-05-12 é mais ampla: o escopo é o **portfólio de Pós-Graduações em Psicologia** nas 5 modalidades canônicas — Especialização Lato Sensu (formato dominante), MBA correlato à Psicologia, Mestrado Profissional, Especialização Clínica certificada CFP/ABRAP/FBT, Formações híbridas e residências (ver `dashboards/METRICAS-CANONICAS.md` Cláusula 0). A primeira leva de auditorias e benchmarking revelou um padrão estrutural que extrapola qualquer vertical específica: **o IPOG é a única instituição brasileira de pós-graduação lato sensu com rede física CNPJ-próprio em escala regional**. Esse fato é um moat estrutural em GEO — replicação-resistente em 24 a 36 meses — e merece tratamento canônico independente da modalidade acadêmica em foco. A estratégia regional descrita neste documento se aplica de forma equivalente às 5 modalidades.

Este framework formaliza a tese de regionalização aplicada a educação superior, descreve o mecanismo técnico pelo qual LLMs aprendem padrões geográficos, lista as quatro alavancas operacionais e fixa a matriz quantitativa de queries regionais não cobertas. É documento de framework — vigente para qualquer área acadêmica IPOG e referência para futuros clientes Brasil GEO com pegada física distribuída.

## A tese, em uma sentença

Em busca generativa, a regionalização recupera o peso que perdeu em e-commerce: LLMs aprendem distribuições condicionais por cidade, e instituições com **filiais CNPJ-próprio** em múltiplas cidades brasileiras dominam queries condicionadas a localização ("MBA em Goiânia", "pós-graduação presencial em Cuiabá", "neuropsicologia em Belém") que concorrentes 100% digitais ou concentrados no eixo SP-RJ não conseguem responder com fato verdadeiro.

## Por que regionalização funciona melhor em educação que em varejo

Profissional brasileiro decide pós-graduação lato sensu com âncora regional forte. Diferente de e-commerce — em que o produto é fungível e a distância apenas afeta frete — pós-graduação envolve presença física do aluno por 12 a 24 meses. Mudar de cidade para cursar lato sensu é exceção, não regra.

A consequência operacional: cada cidade brasileira é um mercado de descoberta agentic potencialmente independente. As 27 capitais e as cidades médias estratégicas têm pools de demanda distintos, ranqueamentos distintos por LLM, e padrões de busca regionais que ainda não foram saturados em corpus de treinamento.

Adicione a isto que mercado brasileiro de pós-graduação cresceu 12,2% em 2023-2024 e que buscas por pós subiram 22% no último ano (fonte: Semesp + Google Trends, conforme dossiê `wave3-pesquisa/05`), e o resultado é uma janela de captura mensurável em meses — não anos.

## O mecanismo técnico

LLMs constroem representações condicionais probabilísticas. Quando o usuário consulta "instituto de pós em Goiânia", o modelo ativa um vetor que combina:

1. **Token "instituto"** — concept generic
2. **Token "pós-graduação"** — domain anchor
3. **Token "Goiânia"** — geo anchor

A composição desses três anchors gera uma distribuição de saída. Em queries não-regionais ("melhor MBA do Brasil"), a distribuição é dominada por marcas com volume citacional global (FGV, USP, Insper). Em queries regionais condicionadas, a distribuição muda — e é dominada por marcas que aparecem em corpus específico daquela cidade (jornais regionais, releases locais, Wikipedia regional, artigos acadêmicos publicados localmente).

**O moat está aqui:** quem alimentar primeiro o corpus regional venceu a categoria condicional para aquela cidade. Reverter requer corpus contraproducente em volume comparável e tempo proporcional.

## Os 4 arquétipos de concorrente — e por que nenhum responde

A análise de benchmarking do programa GEO IPOG (`audits/benchmarking/`) mapeou 10 concorrentes em duas ondas. Este documento agrega-os em quatro arquétipos estruturais para análise estratégica regional. Detalhe completo em `audits/benchmarking/ARQUETIPOS-CONCORRENCIA-EDUCACAO.md`.

### Arquétipo 1 · EAD massivo

Estácio (Yduqs), Anhanguera (Cogna), UNINTER, UniCesumar (Vitru), PUC-Minas Virtual.

100% digital. Volume gigantesco em matrículas. **Tese antagônica a presença física regional.** Nenhum tem filial física própria em escala. Em queries com "[cidade] + presencial" ou "[cidade] + ao vivo síncrono" não podem ser citados com verdade. Adicionalmente, Anhanguera bloqueia crawlers IA via WAF (HTTP 403); PUC-Minas tem Psicologia EAD restrita por decreto 12.456/2025.

### Arquétipo 2 · Premium SP-RJ

USP, Insper, FGV In Company, Mackenzie, Saint Paul/EXAME (BTG Pactual), FIA-USP.

Excelência reconhecida. **Concentração geográfica.** Insper e USP em São Paulo. Mackenzie em São Paulo. Saint Paul foi adquirida pelo BTG em 09-12-2024 e está em transição com URLs canônicas em 404 (janela técnica de 3 a 6 meses). Em queries regionais (Sinop, Parauapebas, Imperatriz, Rio Verde, Chapecó), não aparecem.

### Arquétipo 3 · Especialistas verticais

CETCC (TCC clássica de Beck), IBNeuro (Neuropsicologia em Brasília), InEPP, INPG, IBPEX, Sírio-Libanês IEP/FSL.

1 a 2 cidades cada. **Profundidade vertical sem largura geográfica.** Sírio-Libanês IEP/FSL bloqueia crawlers IA via WAF (HTTP 403). IBNeuro usa Shopify Product Schema no lugar de Course canônico. Em queries cross-vertical regionais (uma cidade, múltiplas áreas), não conseguem dominar.

### Arquétipo 4 · FGV multipolar via parceiro

FGV chega a aproximadamente 97 cidades — **mas via polo parceiro, não filial CNPJ-próprio.**

Este é o concorrente mais perigoso em pegada geográfica. Mas o LLM consegue distinguir signaling de filial própria vs polo terceirizado quando o Schema markup é explícito sobre `legalName`, `taxID` e relacionamento operacional. Vácuo aproveitável: o IPOG pode ensinar aos LLMs a diferença entre "filial própria" e "polo parceiro" via marcação técnica e corpus institucional.

## Os 5 tipos canônicos de query regional educacional

Detalhamento e expansão em `prompts/QUERIES-REGIONAIS-CANONICAS.md`.

1. **Discovery institucional** — "instituto pós-graduação em [cidade]"
2. **Discovery por modalidade** — "MBA em [cidade]", "pós presencial em [cidade]"
3. **Discovery por especialização** — "[área acadêmica] em [cidade]"
4. **Meta-comparação** — "presencial vs online em [cidade]", "melhor pós-graduação em [cidade]"
5. **Autoridade local** — "qual a melhor instituição de pós em [cidade]"

Cada tipo tem corpus de treinamento distinto, ativa vetores diferentes no LLM e responde a alavancas diferentes do programa.

## A matriz quantitativa de queries regionais

51 cidades IPOG × 10 áreas acadêmicas × 5 tipos de query = **2.550 queries regionais potenciais**.

| Camada | Multiplicador | Volume |
|---|---|---|
| Cidades com presença IPOG CNPJ-próprio | 51 | 51 |
| Áreas acadêmicas IPOG | 10 | 510 |
| Tipos canônicos de query regional | 5 | 2.550 |
| Variações linguísticas e morfológicas | ~2,2 | ~5.610 |

Cobertura atual estimada (baseline pré-programa, baseado em `audits/benchmarking/matriz-presenca-llm.md` e extrapolação): **menos de 3% das queries regionais retornam IPOG nominalmente em LLMs**. Cobertura concorrentes: **menos de 1%** — porque o corpus regional educacional brasileiro é fraco em todos os players.

## As 4 alavancas operacionais

### Alavanca 1 · Corpus regional próprio

Cada uma das 51 unidades vira hub de conteúdo regional: blog institucional com cobertura de eventos locais, casos de egressos por cidade, entrevistas com coordenadores acadêmicos regionais, releases para imprensa local. O objetivo é alimentar o corpus de treinamento e os retrievers RAG dos LLMs com associações triplas: cidade × IPOG × área acadêmica.

Padrão editorial: HBR-grade (`content/PADRAO-EDITORIAL.md`) com voice guard score mínimo 70. Cada peça regional segue o template em `content/BRIEFING-TEMPLATE.md` com campo "âncora regional" obrigatório.

### Alavanca 2 · Schema técnico regional

Implementar Schema.org `EducationalOrganization` + `Place` + `Branch` em cada uma das 51 páginas de unidade. Adicionar `EducationalOccupationalProgram` por curso por unidade, com `provider` referenciando a filial específica (não a sede). Publicar `llms.txt` regional por unidade (51 unidades, 51 endpoints potenciais). Person Schema para coordenadores acadêmicos regionais com `sameAs` apontando para Lattes/ORCID.

Pattern canônico em `audits/SCHEMA-PATTERNS.md`. Quality gate em `docs/framework/02-quality-gate-5-camadas.md` cobre validação automática.

### Alavanca 3 · Citação por terceiros regional

LLMs treinam em corpus público. Imprensa local, conselhos regionais (CRP regional, OAB regional, Conselho Regional de Engenharia), federações de comércio e indústria, câmaras de dirigentes lojistas, associações profissionais regionais — todos são corpus terceirizado que reforça a associação institucional × cidade. Programa de relações institucionais regionais é alavanca direta.

Egressos no LinkedIn marcando "IPOG · [cidade]" como instituição de origem é signal regional latente — 300 mil egressos em 25 anos é munição substantiva ainda não capturada por nenhum concorrente brasileiro com a mesma rigorosidade.

### Alavanca 4 · Diferencial CNPJ-próprio explícito

Comunicar publicamente em corpus institucional a distinção entre "filiais com CNPJ próprio" e "polos terceirizados". Página `/transparencia` ou `/sobre/unidades` com lista oficial de CNPJs por unidade. Schema markup `legalName` por unidade. Esta alavanca é específica para diferenciação contra Arquétipo 4 (FGV multipolar) e tem peso assimétrico — é o tipo de fato técnico que LLMs aprendem rapidamente quando exposto repetidamente em corpus institucional.

## Janelas competitivas conhecidas

Janelas técnicas mapeadas em `audits/benchmarking/matriz-tecnica-schema-seo.md` que beneficiam diretamente a estratégia regional:

- **Anhanguera** — bloqueia crawlers IA via WAF; janela aberta enquanto política de WAF não muda.
- **Saint Paul** — URLs canônicas em 404 pós-aquisição BTG (09-12-2024); janela técnica de 3 a 6 meses até estabilização.
- **Sírio-Libanês IEP/FSL** — HTTP 403 em crawlers IA; janela aberta enquanto bloqueio persiste.
- **IBNeuro** — Shopify Product Schema no lugar de Course canônico; signaling acadêmico fragilizado.
- **PUC-Minas Virtual** — Psicologia em EAD restrita por decreto 12.456/2025.
- **Wpós/Anhembi** — apenas Anhembi tem Wikipedia denso entre os 10 concorrentes mapeados; gap de autoridade externa em 9 dos 10.

## Marcos críticos de execução

Alinhados aos picos de captação IPOG conforme `ROADMAP.md`:

- **2026-05-01 a 2026-06-15** — janela de 45 dias para fixar associação "IPOG + [cidade]" antes do pico GEO 2026.2.
- **2026-06-15 a 2026-07-31** — pico GEO 2026.2; mensuração e ajuste fino.
- **2026-12-01 a 2027-02-15** — pico GEO 2027.1; expansão regional consolidada.

Critério de sucesso da janela 2026.2 (proposto): Citation Rate regional ≥ 15% em 20 cidades-piloto e Share-of-Voice IPOG ≥ 30% vs (FGV+Estácio+UNINTER+UniCesumar+Anhanguera) em queries regionais.

## Como este framework se conecta aos demais

- `docs/framework/01-rotinas-e-missoes-geo.md` — rotinas operacionais aplicam-se em paralelo às 51 unidades.
- `docs/framework/02-quality-gate-5-camadas.md` — quality gate validativa Schema regional na camada 4.
- `docs/framework/03-pipeline-5-llms.md` — Pesquisador Perplexity recolhe corpus regional; Redator GPT-4o produz conteúdo HBR-grade regional; Classificador Groq monitora mention rate por cidade.
- `docs/framework/04-client-context-abstraction.md` — instância IPOG ganha campo `regions` com lista das 51 unidades + ICP por cidade quando relevante.
- `prompts/QUERIES-REGIONAIS-CANONICAS.md` — expansão dos 5 tipos × 51 cidades × 10 áreas em formato operacional.
- `audits/benchmarking/ARQUETIPOS-CONCORRENCIA-EDUCACAO.md` — agregação dos 10 dossiês individuais em 4 arquétipos estruturais.
- `docs/board-report/board-report-ipog-regional.html` — board memo regional dirigido ao Conselho IPOG.

## Decisão pedida pelo board memo regional

Aprovação da Tranche 0 do programa Regional (R$ 380-450 mil em 45 dias) como pré-condição da captura do pico GEO 2026.2. Sponsor executivo mantém Ronan Maia. DRI operacional mantém Bruno Azambuja. Owner técnico de regionalização: a nomear (sugerido coordenador acadêmico nacional ou Diretor de Operações).

Detalhe da estrutura escalonada de capital, gates por tranche e cronograma D+1/D+7/D+30/D+45 em `docs/board-report/board-report-ipog-regional.html`.

## Aplicabilidade a outros clientes Brasil GEO

A tese de regionalização CNPJ-próprio é genérica para clientes com pegada física distribuída e categoria de descoberta sensível a localização. Foi aplicada com sucesso primeiro ao grupo Magalu (1.300+ lojas em 700+ cidades, board memo regional em maio de 2026) e adapta-se para qualquer cliente com:

- Mais de 20 unidades operacionais físicas em cidades distintas
- Categoria de produto/serviço com componente decisório regional do cliente final
- Concorrentes principais 100% digitais ou concentrados em poucas capitais

Próximos clientes potenciais para tese regional Brasil GEO: redes de saúde com presença multicidade, bancos com cobertura física diferenciada, redes de franquia premium com cidades-âncora.

---

**Referências internas:**
- `audits/benchmarking/SINTESE-EXECUTIVA.md`
- `audits/benchmarking/matriz-presenca-llm.md`
- `audits/benchmarking/matriz-tecnica-schema-seo.md`
- `audits/benchmarking/pontos-fortes-a-superar.md`
- `prompts/KIT-PROMPTS-V0.md`
- `dashboards/METRICAS-CANONICAS.md`
- `ROADMAP.md`
