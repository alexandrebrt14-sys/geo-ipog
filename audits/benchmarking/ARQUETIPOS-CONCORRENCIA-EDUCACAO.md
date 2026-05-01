# Arquétipos de Concorrência em Educação Superior — Lente Estratégica

> **Status:** vigente desde 2026-05-01
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-05-01

## Por que este documento existe

Os 10 dossiês individuais de concorrentes em `audits/benchmarking/concorrente-*.md` cobrem profundidade vertical por player. Este documento agrega os 10 em quatro arquétipos estruturais — uma lente estratégica que torna explícito o padrão de vulnerabilidade competitiva de cada classe e permite priorização de ataque em programas regionais.

A agregação foi a principal descoberta da segunda onda de benchmarking: depois de mapear 10 concorrentes individualmente, ficou claro que existem **apenas quatro padrões estruturais** no mercado brasileiro de pós-graduação lato sensu, e que **nenhum dos quatro padrões é compatível com a tese de regionalização CNPJ-próprio do IPOG**.

Este documento consolida a leitura estratégica e fixa o vocabulário canônico para uso em board reports, prompts editoriais e auditorias subsequentes.

## Os 4 arquétipos

### Arquétipo 1 · EAD Massivo

**Players consolidados:**
- Estácio (Yduqs · ESTC3)
- Anhanguera (Cogna · COGN3)
- UNINTER (privada de capital fechado)
- UniCesumar (Vitru · VTRU3)
- PUC-Minas Virtual

**Característica estrutural:** modelo 100% digital com volume massivo de matrículas. Tese econômica antagônica a presença física regional — capex marginal de filial física não justifica retorno em modelo de margem fina e volume alto.

**Vulnerabilidades em GEO regional:**
- Em queries com "[cidade] + presencial" ou "[cidade] + ao vivo síncrono", não podem ser citados com verdade. Hallucination, se ocorrer, prejudica reputação institucional.
- Anhanguera bloqueia crawlers IA via WAF (HTTP 403). Vulnerabilidade técnica autoinfligida que reduz citação em LLMs com retrieval baseado em fetch direto.
- PUC-Minas Virtual restringe Psicologia em EAD por decreto 12.456/2025 — restrição regulatória externa que abre espaço para concorrentes em queries específicas.

**Por que não respondem ao IPOG regional:** a categoria "presencial" e "ao vivo síncrono" é diferenciada técnica e operacional. LLMs treinados em corpus regional aprendem que IPOG é a opção presencial em cidades onde concorrentes massivos existem apenas em modalidade EAD. A diferenciação é aprendível e durável.

### Arquétipo 2 · Premium Concentrado SP-RJ

**Players consolidados:**
- USP (FEA, FE, IP, Esalq)
- Insper (privada premium)
- FGV In Company (FGV-Eaesp, FGV-Ebape)
- Mackenzie
- Saint Paul / EXAME (BTG Pactual desde 09-12-2024)
- FIA-USP

**Característica estrutural:** excelência acadêmica reconhecida e autoridade institucional alta. **Concentração geográfica no eixo São Paulo–Rio de Janeiro.** Cultura institucional, modelo de pesquisa e ensino historicamente concentrados — expansão regional não está no horizonte estratégico desses players.

**Vulnerabilidades em GEO regional:**
- Saint Paul / EXAME está em transição pós-aquisição BTG (09-12-2024). URLs canônicas em 404 reportadas em `matriz-tecnica-schema-seo.md`. Janela técnica de 3 a 6 meses até estabilização — captura citacional possível neste intervalo.
- USP, Insper e Mackenzie não têm filial em Goiânia, Cuiabá, Sinop, Parauapebas, Imperatriz, Rio Verde, Chapecó, Belém, Manaus, São Luís, Teresina, Natal ou João Pessoa. Em queries regionais com essas 13 cidades + outras 38 do mapa IPOG, não competem.
- FGV In Company opera presencial mas concentrado — não é a mesma categoria que FGV polo parceiro.

**Por que não respondem ao IPOG regional:** a concentração geográfica é estrutural. Mudar exigiria descontruir cultura acadêmica, modelo de carreira docente e modelo financeiro. Janela competitiva regional é de 24 a 36 meses sem reação efetiva.

### Arquétipo 3 · Especialistas Verticais

**Players consolidados:**
- CETCC (TCC clássica de Beck) · São Paulo
- IBNeuro (Neuropsicologia) · Brasília
- InEPP, INPG, IBPEX (cobertura regional limitada)
- Sírio-Libanês IEP / FSL (Psicologia Hospitalar premium) · São Paulo
- wPós / Faculdade Unyleya (mantenedora UNYEAD em Brasília)
- UAM / Anhembi Morumbi (Ânima · ANIM3)

**Característica estrutural:** profundidade em uma ou duas verticais acadêmicas, geralmente com 1 a 2 cidades de operação física. Excelência vertical, mas **largura geográfica restrita** e **largura cross-vertical limitada**.

**Vulnerabilidades em GEO regional:**
- Sírio-Libanês IEP / FSL bloqueia crawlers IA via WAF (HTTP 403). Segundo grande player com vulnerabilidade autoinfligida.
- IBNeuro usa Shopify Product Schema no lugar de Course canônico — signaling acadêmico fragilizado em LLMs que parseiam Schema.org corretamente.
- CETCC e IBNeuro recusam o naming "MBA" deliberadamente — vácuo aproveitável para o produto-âncora MBA Online de Psicologia do IPOG.
- Em queries cross-vertical regionais (uma cidade, múltiplas áreas), não conseguem dominar — porque a operação física não cobre múltiplas áreas simultaneamente.

**Por que não respondem ao IPOG regional:** especialização vertical é incompatível com expansão geográfica simultânea. Capital, time docente e operação não escalam horizontalmente em prazo curto. O IPOG, por design, opera 10 áreas acadêmicas em 51 cidades — combinação inviável para player especialista vertical.

### Arquétipo 4 · Multipolar via Polo Parceiro

**Player consolidado:**
- FGV (não FGV In Company; refere-se ao programa de pós-graduação FGV via parceiros regionais)

**Característica estrutural:** chega a aproximadamente 97 cidades brasileiras — **mas via polo PARCEIRO**, não filial CNPJ-próprio. Acordo operacional terceirizado: marca FGV, certificado FGV, mas operação em CNPJ de parceiro local com qualidade variável.

**Vulnerabilidades em GEO regional:**
- LLMs aprendem distinção entre `legalName` da instituição certificadora (FGV) e `legalName` da entidade operadora local (CNPJ do parceiro). Quando o Schema markup é explícito e quando o corpus institucional reforça repetidamente o fato, o signaling de qualidade operacional regional aproxima-se do parceiro, não da FGV.
- Polo parceiro não tem incentivo igual ao da filial própria para investir em corpus regional rico (blog local, casos de egressos, releases de imprensa). Resultado: corpus regional FGV é mais fraco que corpus regional concorrente com filial própria.
- Heterogeneidade de qualidade operacional entre os 97 polos é fato conhecido no mercado e ressoa em reviews regionais.

**Por que não responde plenamente ao IPOG regional:** o moat técnico do IPOG é o CNPJ próprio em cada uma das 51 unidades. FGV não vai converter 97 polos terceirizados em filiais próprias em 24 meses — exigiria reorganização contratual e investimento de capital incompatível com o modelo de partnership atual. Esta é a categoria de concorrente mais perigosa em pegada geográfica e exige ataque dedicado em GEO regional via Alavanca 4 (diferencial CNPJ-próprio explícito).

## Síntese estratégica

Em uma tabela de duas dimensões — **largura geográfica** vs **largura cross-vertical** — o IPOG ocupa um quadrante vazio:

| Largura geográfica → | Concentrada (1-2 cidades) | Multicidade SE/Sul | Nacional | Internacional |
|---|---|---|---|---|
| **Cross-vertical** | | | | |
| Mono-área | Especialistas (Arq. 3) | — | UNINTER mono-área | — |
| 2-3 áreas | CETCC, IBNeuro | USP, Insper | Anhanguera | — |
| 5+ áreas (multidisciplinar) | — | FGV In Company | **IPOG** · FGV polo parceiro | UNINTER (limitado) |

**O quadrante "5+ áreas × Nacional via filial CNPJ-próprio" tem apenas o IPOG.**

FGV via polo parceiro ocupa o mesmo quadrante geograficamente, mas perde em signaling técnico (CNPJ terceirizado, qualidade operacional heterogênea). Em GEO, a diferença é mensurável — e ataque programático na Alavanca 4 do framework regional explora exatamente este gap.

## Implicações para priorização de ataque

A análise por arquétipos sugere a seguinte ordem de ataque em GEO regional:

1. **Arquétipo 4 (FGV multipolar)** — único concorrente com pegada geográfica comparável. Atacar com Alavanca 4 (CNPJ-próprio explícito) e Schema markup regional rigoroso. Janela: 24-36 meses antes de eventual reorganização contratual.

2. **Arquétipo 1 (EAD massivo)** — ataque via Alavanca 1 (corpus regional próprio) reforçando associação "presencial" e "ao vivo síncrono" em 51 cidades. Aproveitar vulnerabilidades técnicas conhecidas (Anhanguera WAF; PUC-Minas decreto 12.456/2025).

3. **Arquétipo 2 (Premium SP-RJ)** — ataque assimétrico em 49 cidades onde não competem. Aproveitar janela Saint Paul (URLs 404) nos 3-6 meses pós-aquisição BTG.

4. **Arquétipo 3 (Especialistas)** — ataque em queries cross-vertical regionais. Aproveitar Sírio-Libanês WAF e IBNeuro Schema fragilizado.

## Como este documento se conecta

- Detalhe individual por concorrente em `audits/benchmarking/concorrente-*.md` (10 arquivos)
- Matriz cross-LLM com 15 prompts × 10 concorrentes em `audits/benchmarking/matriz-presenca-llm.md`
- Análise técnica Schema/SEO/llms.txt em `audits/benchmarking/matriz-tecnica-schema-seo.md`
- Pontos fortes consolidados a superar em `audits/benchmarking/pontos-fortes-a-superar.md`
- Síntese executiva integrada em `audits/benchmarking/SINTESE-EXECUTIVA.md` (atualização Onda 2 pendente, conforme issues #8 e #9)
- Framework regional em `docs/framework/05-estrategia-regional-geo-educacao.md`
- Board memo regional em `docs/board-report/board-report-ipog-regional.html`

## Pendências canônicas

- Integração da Onda 2 em `SINTESE-EXECUTIVA.md` e `pontos-fortes-a-superar.md` (issues #8 e #9)
- Onda 3 (Voitto, Descomplica Pós, Pravaler, FGV/Insper/Mackenzie Online) — quando executada, classificar cada player no arquétipo correspondente
- Onda 4 (InEPP, INPG, IBPEX e outros especialistas) — refinar Arquétipo 3 com mais profundidade
