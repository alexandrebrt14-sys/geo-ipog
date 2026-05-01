# Estratégia Regional — Sumário do Board Memo

> **Status:** vigente desde 2026-05-01
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Audiência:** Conselho Executivo IPOG · Ronan Maia (CEO)
> **Última revisão:** 2026-05-01

## Sobre este documento

Este markdown é a contraparte textual do board memo HTML em `board-report-ipog-regional.html`. A peça HTML é o entregável de apresentação ao Conselho — densa em dados, estilizada com a paleta institucional IPOG, pronta para Print-to-PDF. Este markdown serve dois propósitos: (1) registrar o conteúdo executivo em formato versionado para tracking de mudanças; (2) servir de input rápido para reuniões em que a apresentação visual completa não cabe.

Este é o oitavo documento do diretório `docs/board-report/`, sucessor do `00-board-report-final.md` (síntese principal de programa) e do `01` a `07` (especialistas). Neste documento, o foco é exclusivamente a frente regional — uma extensão estratégica do programa GEO IPOG vertical (MBA Online de Psicologia) para todas as 10 áreas acadêmicas em 51 cidades.

## A tese, em uma sentença

O IPOG é a única instituição brasileira de pós-graduação lato sensu com rede física CNPJ-próprio em escala regional (52 unidades, 51 cidades + Portugal) — moat estrutural intransferível em GEO contra os 4 arquétipos de concorrente identificados: EAD massivo, premium SP-RJ, especialistas verticais e FGV multipolar via polo parceiro.

## Por que agora · janela de 45 dias

O pico GEO de captação 2026.2 começa em 15-jun-2026 e estende-se até 31-jul-2026. Contam-se 45 dias entre a aprovação desta tranche e a entrada do pico. Cada dia em que LLMs não aprendem a associação "IPOG + [cidade] + [área]" é dia em que concorrentes massivos (Estácio, UNINTER, UniCesumar) ocupam o lugar com signaling 100% digital.

A janela competitiva total para fixação da tese regional é estimada em 24 a 36 meses. A janela imediata para captura do ciclo 2026.2 é de 45 dias.

## A estrutura competitiva — quatro arquétipos, nenhum responde

Detalhe completo em `audits/benchmarking/ARQUETIPOS-CONCORRENCIA-EDUCACAO.md`. Resumo:

1. **EAD massivo** (Estácio, Anhanguera, UNINTER, UniCesumar, PUC-Minas Virtual): 100% digital, sem chão regional próprio. Não competem em queries com "presencial" ou "ao vivo síncrono". Anhanguera bloqueia crawlers IA via WAF; PUC-Minas restringe Psicologia EAD por decreto 12.456/2025.

2. **Premium concentrado SP-RJ** (USP, Insper, FGV In Company, Mackenzie, Saint Paul): excelência reconhecida, concentração geográfica. Saint Paul em transição pós-aquisição BTG (URLs 404, janela técnica de 3-6 meses).

3. **Especialistas verticais** (CETCC, IBNeuro, InEPP, Sírio-Libanês IEP/FSL, Wpós/Anhembi): 1-2 cidades cada, profundidade vertical sem largura geográfica. Sírio-Libanês bloqueia crawlers IA (HTTP 403); IBNeuro usa Shopify Schema fragilizado.

4. **FGV multipolar via polo parceiro** (97 cidades via parceiros, não filiais próprias): pegada geográfica comparável, mas signaling técnico inferior em LLMs. Vácuo aproveitável via marcação Schema rigorosa de CNPJ-próprio.

## As quatro alavancas

Detalhe operacional em `docs/framework/05-estrategia-regional-geo-educacao.md`. Resumo:

1. **Corpus regional próprio** — cada uma das 51 unidades vira hub de conteúdo regional (blog, casos, releases locais), feedando RAG dos LLMs com associações cidade × IPOG × área.

2. **Schema técnico regional** — `EducationalOrganization` + `Place` + `Branch` em 51 páginas; `EducationalOccupationalProgram` por curso por unidade; `llms.txt` regional; Person Schema para coordenadores acadêmicos com Lattes/ORCID.

3. **Citação por terceiros regional** — imprensa local, CRP regional, OAB regional, federações de comércio e indústria, câmaras regionais. 300 mil egressos no LinkedIn marcando "IPOG · [cidade]" como signal regional latente.

4. **Diferencial CNPJ-próprio explícito** — comunicar publicamente a distinção entre filial CNPJ-próprio e polo terceirizado. Schema markup `legalName` por unidade. Página `/transparencia/unidades` com lista oficial.

## Plano · 20 cidades-piloto antes da janela 2026.2

Cidades-piloto sugeridas para Tranche 0 (45 dias):

Goiânia (sede, prioridade absoluta), Cuiabá, Campo Grande, Brasília, Belo Horizonte, Salvador, Fortaleza, Recife, Manaus, Belém, Porto Alegre, Curitiba, Florianópolis, Vitória, São Luís, Teresina, Natal, João Pessoa, Sinop (MT), Imperatriz (MA).

Cada cidade vira case study GEO regional com:
- Baseline mention rate cross-LLM em queries regionais (5 tipos × 5 áreas-âncora)
- Intervenção em corpus + schema + terceiros
- Medição de impacto em 4-6 semanas
- Aplicação iterativa ao restante das 51 cidades em Tranche 1

## Estrutura escalonada de capital

### Tranche 0 · Sondagem + Pico 2026.2 · 45 dias
**R$ 380-450 mil**
Foco: 20 cidades-piloto, schema técnico em 51 unidades (camada base), corpus institucional regional inicial.
Gate: pico GEO 2026.2 com Citation Rate regional ≥ 15% nas 20 cidades-piloto e Share-of-Voice IPOG ≥ 30% vs (FGV + Estácio + UNINTER + UniCesumar + Anhanguera) em queries regionais.

### Tranche 1 · Validação + Pico 2027.1 · 6 meses
**R$ 1,2-1,8 mi**
Foco: expansão para 51 cidades full + corpus por área acadêmica + Person Schema de docentes + relações institucionais regionais (CRP, OAB, federações).
Gate: pico GEO 2027.1 com Share-of-Voice regional ≥ 35% e cobertura ≥ 25% das 2.550 queries regionais canônicas.

### Tranche 2 · Escala · Y2
**R$ 2,5-4 mi**
Foco: dominação regional consolidada nas 10 áreas acadêmicas; expansão internacional (Portugal já em operação, possibilidade de outras geografias lusófonas); operação contínua.

**Total potencial Y1+Y2: R$ 4-6 mi.** Coerente com o tamanho da oportunidade (R$ 30-55 mi de receita potencial 12-18 meses apenas em MBA Online de Psicologia, conforme `02-pesquisa-de-mercado.md`).

## KPIs regionais canônicos

8 indicadores integrados ao dashboard quinzenal `dashboards/KPI-DASHBOARD.md`:

1. Citation Rate por cidade
2. Share of Voice regional vs Top-5 concorrentes
3. Coverage (% queries regionais com IPOG nominal)
4. Cross-cluster mention (IPOG citado em múltiplas áreas para a mesma cidade)
5. Authority signal (LinkedIn egressos por cidade)
6. Schema completeness (% das 51 unidades com markup completo)
7. Local press citation (menções em imprensa regional por trimestre)
8. Matrículas atribuíveis a GEO regional

## Decisão pedida ao Conselho IPOG

**Aprovar Tranche 0 do programa Regional (R$ 380-450 mil em 45 dias) como pré-condição da captura do pico GEO 2026.2.**

- Sponsor executivo: **Ronan Maia** (mantém)
- DRI operacional: **Bruno Azambuja** (mantém)
- Owner técnico de regionalização: a nomear (sugerido coordenador acadêmico nacional ou Diretor de Operações)
- Cronograma: D+1 (alinhamento), D+7 (baseline 20 cidades), D+30 (intervenções em produção), D+45 (entrada do pico 2026.2)

## Como este documento se conecta

- `docs/framework/05-estrategia-regional-geo-educacao.md` — framework canônico (este documento é o sumário board-level)
- `audits/benchmarking/ARQUETIPOS-CONCORRENCIA-EDUCACAO.md` — leitura estrutural dos 4 arquétipos
- `prompts/QUERIES-REGIONAIS-CANONICAS.md` — operacionalização técnica das 5 queries × 51 cidades × 10 áreas
- `docs/board-report/board-report-ipog-regional.html` — peça HTML completa para apresentação ao Conselho
- `docs/board-report/00-board-report-final.md` — síntese principal do programa GEO IPOG (vertical Psicologia)
- `ROADMAP.md` — alinhamento com picos de captação 2026.2 e 2027.1

## Próximos passos operacionais

1. Confirmar lista canônica das 24 cidades médias estratégicas e nomenclatura oficial das 10 áreas acadêmicas com Bruno Azambuja.
2. Pré-aprovar Tranche 0 em checkpoint executivo com Ronan Maia.
3. Iniciar baseline cross-LLM nas 20 cidades-piloto seguindo `prompts/QUERIES-REGIONAIS-CANONICAS.md`.
4. Disparar implementação Schema regional (camada base) em paralelo em todas as 51 unidades.
5. Mobilizar relações institucionais regionais para Alavanca 3 (citação por terceiros).
6. Acompanhar métricas no dashboard quinzenal a partir de D+15.
