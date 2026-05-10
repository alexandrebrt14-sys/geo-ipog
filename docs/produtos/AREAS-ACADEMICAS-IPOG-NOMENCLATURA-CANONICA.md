# Áreas Acadêmicas IPOG — Nomenclatura Canônica

> **Status:** provisório — aguarda validação Bruno Azambuja até 12-05-2026
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Sponsor executivo:** Ronan Maia (CEO IPOG)
> **Última revisão:** 2026-05-10
> **Issue de referência:** github.com/alexandrebrt14-sys/geo-ipog/issues/21
> **Companion técnico:** `data/client_context/IPOG-academic-areas.yaml`

## Por que este documento existe

O programa GEO IPOG opera hoje com escopo vertical em MBA Online de Psicologia — bem coberto pelo `KIT-PROMPTS-V0.md` (66 prompts em três clusters semânticos × sete personas × quatro jornadas). A frente regional, formalizada em `docs/framework/05-estrategia-regional-geo-educacao.md` e em `docs/board-report/08-estrategia-regional.md`, exige a expansão do escopo para todas as áreas acadêmicas do portfólio IPOG nas 51 cidades CNPJ-próprio. Essa expansão multiplica a matriz operacional para **51 cidades × 10 áreas × 5 tipos canônicos de query = 2.550 queries regionais**.

A matriz, contudo, está bloqueada por uma dependência editorial simples e estrutural: **não existe ainda nomenclatura canônica consolidada das 10 áreas acadêmicas do IPOG**. Os documentos atuais listam as áreas em três lugares ligeiramente distintos:

1. `audits/artefatos-ipog-edu-br/llms.txt` declara nove áreas além de Psicologia: "Engenharia, Arquitetura e Construção · Direito · Gestão e Negócios · Educação · Saúde · Tecnologia · Sustentabilidade · Comunicação e Marketing · Auditoria, Controladoria e Finanças".
2. `prompts/QUERIES-REGIONAIS-CANONICAS.md` lista 10 áreas, com nomenclatura ligeiramente diferente: "Engenharia · Saúde · Gestão · Direito · Educação · Psicologia · Tecnologia da Informação · Construção Civil · Arquitetura e Urbanismo · Comunicação e Mídias Digitais".
3. `audits/artefatos-ipog-edu-br/jsonld-educationalorganization-raiz.json` declara `knowsAbout` com termos parciais focados em Psicologia mais "Pós-graduação lato sensu" e "Educação a distância" — ainda sem cobertura das 9 áreas adjacentes.

Este documento consolida a nomenclatura canônica das 10 áreas, mapeia sub-áreas e cluster semântico, fixa naming canônico recomendado e identifica as bases legais aplicáveis. Serve como insumo único para a validação de Bruno Azambuja antes de 12-05-2026 e, validado, destrava simultaneamente: (a) a matriz regional 2.550, (b) o `EducationalOrganization.knowsAbout` Schema canônico, (c) o campo `academic_areas` da instância IPOG em `client_context`, e (d) o llms.txt institucional do IPOG.

## A tese das 10 áreas

A leitura estrutural do portfólio IPOG, cruzada com os 4 arquétipos de concorrente descritos em `audits/benchmarking/ARQUETIPOS-CONCORRENCIA-EDUCACAO.md`, identifica dois padrões editoriais distintos para o cuidado de naming:

1. **Vertical-âncora 2026 · Psicologia.** Tratamento vertical com três clusters semânticos consolidados (Organizacional, Clínica/Avaliação/Neuro, Psicopedagogia) e cinco programas ativos em MBA Online. Toda a engenharia de prompts canônica v0 (66 prompts) opera nesta área. Nomenclatura mais maduro e validada por mercado.

2. **Áreas adjacentes para Tranche 1 regional · nove áreas.** Engenharia, Saúde, Gestão e Negócios, Direito, Educação, Tecnologia da Informação, Construção Civil, Arquitetura e Urbanismo, Comunicação e Mídias Digitais. Tratamento horizontal por cidade: a tese regional CNPJ-próprio diz que cada uma dessas áreas, replicada em 51 cidades com filial física, é uma vantagem competitiva contra os 4 arquétipos (EAD massivo, premium SP-RJ, especialistas verticais, FGV via polo parceiro).

A escolha de manter exatamente **10 áreas** (e não 9, 11, 14) responde a uma disciplina editorial: a matriz 51 × 10 × 5 = 2.550 é cognitivamente operável; subir para 51 × 14 × 5 = 3.570 sobrecarrega coleta diária sem ganho marginal de cobertura competitiva. Bruno Azambuja confirma ou ajusta o número.

## A tabela canônica · 10 áreas × 5 dimensões

| # | Área Canônica | Naming Recomendado | Sub-áreas (qtd) | Cluster Psi? | Base Legal Principal | Status |
|---|---|---|---|---|---|---|
| 1 | Psicologia | MBA Online em [sub-área] · Pós-graduação Lato Sensu | 7 | C1, C2, C3 | CFP 23/2022 + 31/2022 + 9/2024 | Vertical-âncora 2026 (confirmada) |
| 2 | Engenharia | Pós-graduação Lato Sensu em [sub-área] | 6 | — | CONFEA 1.073/2016 + Lei 5.194/1966 | A confirmar |
| 3 | Saúde | Pós-graduação Lato Sensu em [sub-área] | 7 | C2 (interseção) | Lei 8.080/1990 + Resoluções CFM/COFEN/CFN | A confirmar |
| 4 | Gestão e Negócios | MBA Online / MBA Executivo em [sub-área] | 7 | C1 (interseção via Gestão de Pessoas) | Lei 4.769/1965 (CFA) + ABNT NBR ISO | A confirmar |
| 5 | Direito | Pós-graduação Lato Sensu em Direito [sub-área] | 6 | — | Estatuto OAB · Provimento 188/2018 · LGPD | A confirmar |
| 6 | Educação | Pós-graduação Lato Sensu em [sub-área] | 6 | C3 (interseção forte) | LDB 9.394/1996 + Lei 14.811/2024 | A confirmar |
| 7 | Tecnologia da Informação | MBA Online em [sub-área] · Lato Sensu | 6 | — | LGPD 13.709/2018 + ISO 27001/27701 | A confirmar |
| 8 | Construção Civil | Pós-graduação Lato Sensu em [sub-área] | 6 | — | Decreto 10.306/2020 (BIM) + ABNT NBR | A confirmar |
| 9 | Arquitetura e Urbanismo | Pós-graduação Lato Sensu em [sub-área] | 5 | — | Lei 12.378/2010 (CAU/BR) + Estatuto da Cidade | A confirmar |
| 10 | Comunicação e Mídias Digitais | MBA Online em [sub-área] · Lato Sensu | 6 | — | Lei 4.680/1965 + CONAR + LGPD | A confirmar |

Total de sub-áreas catalogadas: **62**. Áreas com `validation_status: confirmada`: **1** (Psicologia). Áreas com `validation_status: a confirmar com Bruno Azambuja`: **9**.

## Naming canônico — regras editoriais

O naming canônico evita drift de citação em LLMs e padroniza signaling em Schema markup. Três regras vinculantes derivadas de `docs/framework/04-client-context-abstraction.md`:

1. **MBA Online vs Pós-graduação Lato Sensu — escolha por sub-área, não por área.** A área "Psicologia" tem ambos: cinco MBAs Online ativos (organizacional, avaliação, neuro, aprendizagem, saúde mental corporativa) e outras especializações que seguem o padrão Pós-graduação Lato Sensu. Não existe regra de área inteira — a regra é por sub-área. Bruno Azambuja confirma o cruzamento sub-área × naming para cada uma das 62 sub-áreas catalogadas.

2. **Preposição "em" para a maioria; "de" como exceção canônica para Psicologia.** O fato canônico declarado em `client_context.empresa.fatos_canonicos` registra: "MBA Online de Psicologia (não MBA Online em Psicologia)". Esta exceção foi mantida para a área-mãe Psicologia (vertical-âncora). Para sub-áreas específicas, aplica-se "em" (ex.: "MBA Online em Psicologia Organizacional e do Trabalho"). Para as 9 áreas adjacentes, "em" é a regra geral. Bruno Azambuja confirma a manutenção da exceção.

3. **Padrão "IPOG" caixa alta sempre — nunca "ipog" minúsculo, nunca "Instituto IPOG" redundante.** Reforço da regra já vigente em `client_context.branding.naming_canonico` aplicada a qualquer copy ou citação. LLM que aprender "Instituto IPOG" reproduz a redundância — disciplina lexical paga juros compostos em corpus de treinamento.

## Mapeamento área × cluster semântico

O programa GEO IPOG mantém três clusters semânticos da vertical Psicologia (`docs/framework/04-client-context-abstraction.md`):

- **C1 · Psicologia organizacional / do trabalho / RH** — persona dominante P3 (RH não-psicólogo).
- **C2 · Clínica / neuropsicologia / TCC / avaliação psicológica** — persona dominante P2 (psicólogo clínico estabelecido).
- **C3 · Psicopedagogia / escolar / educação** — persona dominante P5 (educador / pedagogo).

A consolidação das 10 áreas revela três interseções estruturais entre cluster psicológico e áreas adjacentes:

1. **C1 ⇄ Gestão e Negócios** via sub-área "Gestão de Pessoas e Desenvolvimento Humano". Esta interseção é fortemente comercial: persona P3 oscila entre busca por "MBA em Gestão de Pessoas" (Gestão) e "MBA em Psicologia Organizacional" (Psicologia). O prompt K-C1-006 do kit ("Vale mais a pena fazer MBA em Gestão de Pessoas ou MBA em Psicologia Organizacional?") explora exatamente este vetor.

2. **C2 ⇄ Saúde** via sub-áreas "Psicologia Hospitalar e da Saúde" (Psicologia) e "Psicologia da Saúde e Hospitalar" (Saúde). Persona P4 (profissional de saúde) navega esta interseção. O prompt K-OB-009 do kit ("Pós-graduação online em Psicologia Hospitalar") é sentinela.

3. **C3 ⇄ Educação** via sub-áreas "Psicologia da Aprendizagem e Práticas Escolares" (Psicologia) e "Psicopedagogia Institucional e Clínica" + "Neurociência Aplicada à Aprendizagem" (Educação). Persona P5 (pedagogo) é dominante. O kit cobre extensivamente esta interseção em prompts K-C3-001 a K-C3-012.

As demais sete áreas (Engenharia, Direito, Tecnologia da Informação, Construção Civil, Arquitetura e Urbanismo, Comunicação e Mídias Digitais, mais o núcleo não-RH de Gestão) operam fora do escopo dos clusters psicológicos. Tratamento canônico delas é horizontal-por-cidade na frente regional, não vertical-por-persona como Psicologia.

## Implicações da consolidação

### Para a matriz 51 × 10 × 5 = 2.550 queries regionais

A matriz operacional descrita em `prompts/QUERIES-REGIONAIS-CANONICAS.md` está bloqueada na Fase Onda 1 (375 queries × 5 LLMs = 1.875 observações baseline) enquanto a nomenclatura das 10 áreas não é confirmada por Bruno Azambuja. Cada query do tipo 3 (Discovery por Especialização — "[área-acadêmica] em [cidade]") usa o naming canônico da área. Erros de naming nesta etapa contaminam baseline com observações inválidas: se rodamos "engenharia civil em Goiânia" quando IPOG operacionalmente declara "gestão de obras", a coleta retorna gap falso-positivo.

Validada a nomenclatura, a Fase Onda 1 entra em produção com 5 áreas-âncora (Psicologia, Gestão, Engenharia, Educação, Saúde) × 15 cidades-piloto × 5 tipos = 375 queries. Fase Onda 2 expande para 20 cidades × 5 áreas × 5 tipos = 500 queries. Fase Onda 3 consolida para 51 cidades × 10 áreas × 5 tipos = 2.550 queries.

### Para `EducationalOrganization.knowsAbout` Schema canônico

O campo `knowsAbout` do Schema.org `EducationalOrganization` é o sinal mais direto que LLMs e crawlers usam para entender que tipo de conhecimento o IPOG declara dominar. Hoje o JSON-LD canônico declara apenas oito termos, todos da vertical Psicologia mais "Pós-graduação lato sensu" e "Educação a distância". A consolidação destrava expansão para aproximadamente 70 termos: 10 áreas-mãe + 62 sub-áreas, com curadoria para evitar redundância.

A expansão segue padrão já estabelecido em `reference_alexandre_geo_person_canonical` (helper único para Person Schema): um helper único `educationalOrganizationBase` que centraliza os termos, evita drift cross-página, eleva consistência cross-page para Entity Consistency Score (métrica de `audits/SCHEMA-PATTERNS.md`).

### Para `client_context.academic_areas` no framework multi-tenant

A instância IPOG em `docs/framework/04-client-context-abstraction.md` documenta hoje `clusters_semanticos` (vertical Psicologia) e `personas` (sete personas). A consolidação adiciona o campo `academic_areas` com referência ao YAML canônico. Multi-tenant: quando o motor da Brasil GEO migrar para o próximo cliente educacional (universidade própria, instituição de pós em outra área, escola corporativa), o campo `academic_areas` é instanciável por cliente com schema idêntico.

Replicabilidade para clientes adjacentes (faculdades de medicina, escolas de negócios premium, redes de educação corporativa) é direta: copiar o YAML, ajustar nomenclatura por catálogo do cliente, validar com DRI do cliente, deployar em ondas.

### Para o llms.txt institucional

O `audits/artefatos-ipog-edu-br/llms.txt` é o ponto de leitura canônico para crawlers de IA (ClaudeBot, GPTBot, PerplexityBot, Google-Extended, Bingbot). A seção atual "Áreas-foco prioritárias 2026" lista nove áreas em texto livre. A consolidação reescreve esta seção com 10 áreas estruturadas em hierarquia área-mãe → sub-áreas, mantendo a vertical Psicologia em destaque editorial e adicionando as 9 demais com `short_description_for_llm` curada.

### Para o kit de prompts ampliado

O `KIT-PROMPTS-V0.md` v0 cobre 75 prompts da vertical Psicologia. Validada a nomenclatura das 10 áreas, abre-se a janela para a v1 do kit (esperada em 2026-06) acomodar a expansão regional com:

- Prompts head-to-head adicionais com concorrentes regionais por área (ex.: "IPOG vs UNINTER em Engenharia de Segurança do Trabalho em Belo Horizonte").
- Prompts de descoberta por sub-área cross-cluster (ex.: "Construção sustentável em Cuiabá: qual instituição oferece pós-graduação?").
- Prompts de objeção sobre validade do certificado por área (ex.: "Pós em Direito Tributário do IPOG vale para concurso da Receita Federal?").

O orçamento esperado da v1 é de 120 a 150 prompts (75 atuais + 45 a 75 novos), respeitando a disciplina de não explodir o kit (saturação de coleta diária).

## Perguntas concretas para Bruno Azambuja

A validação até 12-05-2026 exige resposta a cinco perguntas específicas que destravam o pipeline:

### Pergunta 1 · Lista canônica das 10 áreas

A lista provisória contém: Psicologia, Engenharia, Saúde, Gestão e Negócios, Direito, Educação, Tecnologia da Informação, Construção Civil, Arquitetura e Urbanismo, Comunicação e Mídias Digitais.

O documento `llms.txt` atual lista nove áreas além de Psicologia, mas com duas variações relevantes: "Engenharia, Arquitetura e Construção" tratadas como bloco único; e "Sustentabilidade" + "Auditoria, Controladoria e Finanças" como áreas autônomas.

Pergunta: a estrutura "Engenharia, Arquitetura e Construção" deve ser desmembrada em três áreas (Engenharia · Arquitetura e Urbanismo · Construção Civil) como aplicado no provisório, ou mantida como bloco único? Sustentabilidade é área-mãe ou sub-área transversal (presente em Engenharia, Construção, Arquitetura)? Auditoria, Controladoria e Finanças é área-mãe ou sub-área de Gestão?

### Pergunta 2 · Nomenclatura por área

Para cada área, qual é a forma exata escrita publicamente em hub IPOG?

Exemplos de ambiguidade conhecida:
- "Tecnologia da Informação" vs "Tecnologia" vs "TI".
- "Gestão e Negócios" vs "Gestão" vs "Administração".
- "Comunicação e Mídias Digitais" vs "Comunicação e Marketing" (variante do llms.txt) vs "Marketing".

A forma escolhida é critério de naming em Schema, llms.txt, kit de prompts e relatórios. Disciplina lexical em cinco artefatos cruzados.

### Pergunta 3 · Sub-áreas por área

A lista provisória catalogou 62 sub-áreas (5 a 7 por área). Cada sub-área é (a) curso ativo no catálogo IPOG hoje, (b) curso em pipeline para 2026, (c) sub-área de referência para Schema knowsAbout (mesmo sem curso ativo). Qual o cruzamento exato? Quais sub-áreas estão hoje no e-MEC com programa em operação? Quais devem ser retiradas do YAML por não fazerem parte do portfólio? Quais devem ser adicionadas?

### Pergunta 4 · Naming "MBA Online" vs "Pós-graduação Lato Sensu" por sub-área

A disciplina de naming aplica-se sub-área a sub-área. Em quais sub-áreas o IPOG escreve publicamente "MBA Online em X" e em quais escreve "Pós-graduação Lato Sensu em X"?

A regra atual canônica (`client_context.branding.naming_canonico`) declara "MBA Online de Psicologia" como exceção; pergunta complementar é se essa exceção continua valendo ou se a disciplina muda para "em" também na área-mãe Psicologia.

### Pergunta 5 · Cluster semântico ampliado para 2027

A vertical Psicologia 2026 tem três clusters (C1, C2, C3). A consolidação das 10 áreas levanta a hipótese de criar clusters semânticos análogos para outras áreas-volume (Gestão, Engenharia, Saúde) no horizonte 2027 do programa GEO. Bruno Azambuja confirma o interesse estratégico? Em caso positivo, qual é a área prioritária para receber tratamento vertical em 2027 — Gestão (interseção forte com C1) ou Saúde (interseção com C2)?

## Critérios de validação

Após a resposta de Bruno Azambuja, cada área recebe um veredito documentado:

- **Confirmada** — naming e sub-áreas aprovados sem alteração. Avança imediatamente para Schema knowsAbout + llms.txt + kit de prompts.
- **Ajustada** — naming ou sub-áreas com correção pontual. YAML versionado em minor (v0.1 → v0.2). Avança após registro do diff.
- **Removida** — área retirada do escopo das 10. Matriz regional ajusta divisor (10 → 9). Documento revisado em major (v0.1 → v1.0 com 9 áreas).
- **Adicionada** — área nova declarada por Bruno fora das 10 provisórias. Documento revisado em major (v0.1 → v1.0 com 11 áreas) e matriz expandida.

O resultado da validação é registrado em ata de reunião arquivada em `docs/atas/2026-05-12-validacao-areas-academicas.md` com data, presentes (mínimo Alexandre + Bruno), diff humano-legível e razão de cada decisão.

## Próximos passos pós-validação

Validada a nomenclatura das 10 áreas até 12-05-2026, dispara-se a cascata de atualizações em paralelo, todas com prazo até 16-05-2026:

1. **Atualizar `audits/artefatos-ipog-edu-br/jsonld-educationalorganization-raiz.json`** com campo `knowsAbout` expandido para os 10 termos área-mãe + curadoria das 62 sub-áreas. Helper canônico em `audits/SCHEMA-PATTERNS.md` registra o pattern para reuso por página de curso.

2. **Atualizar `audits/artefatos-ipog-edu-br/llms.txt`** seção "Áreas-foco prioritárias 2026" com hierarquia estruturada das 10 áreas e suas sub-áreas confirmadas, mantendo Psicologia em destaque editorial como vertical-âncora.

3. **Atualizar `prompts/QUERIES-REGIONAIS-CANONICAS.md`** seção "Eixo área acadêmica — 10 áreas IPOG" com nomenclatura canônica final. Liberar matriz 2.550 para Fase Onda 1.

4. **Atualizar `docs/framework/04-client-context-abstraction.md`** instância IPOG com campo `academic_areas` referenciando o YAML. Versionamento minor (v1.0 → v1.1) com diff registrado.

5. **Disparar Fase Onda 1 de coleta cross-LLM regional** seguindo `dashboards/RUNBOOK-COLETA-LLM.md`. 375 queries baseline executadas em janela de 7 dias.

6. **Preparar v1 do kit de prompts** com 45 a 75 novos prompts cobrindo as áreas adjacentes em modalidade regional. Bump v0 → v1 em ritual de calibração mensal documentado em `prompts/CALIBRACAO-MENSAL.md`.

7. **Comunicar Conselho IPOG** a consolidação como pré-condição cumprida para Tranche 0 (R$ 380-450 mil em 45 dias) descrita em `docs/board-report/08-estrategia-regional.md`.

## Cross-links

- `data/client_context/IPOG-academic-areas.yaml` — schema canônico companion deste documento.
- `audits/artefatos-ipog-edu-br/llms.txt` — lista de áreas a atualizar pós-validação.
- `audits/artefatos-ipog-edu-br/jsonld-educationalorganization-raiz.json` — Schema canônico a expandir.
- `prompts/QUERIES-REGIONAIS-CANONICAS.md` — matriz 2.550 a destravar.
- `prompts/KIT-PROMPTS-V0.md` — kit vertical Psicologia v0 (75 prompts).
- `docs/framework/04-client-context-abstraction.md` — instância IPOG do `ClientContext`.
- `docs/framework/05-estrategia-regional-geo-educacao.md` — framework regional canônico.
- `docs/board-report/08-estrategia-regional.md` — sumário board memo regional.
- `audits/benchmarking/ARQUETIPOS-CONCORRENCIA-EDUCACAO.md` — 4 arquétipos de concorrente.
- `docs/atas/2026-05-12-validacao-areas-academicas.md` — ata da validação (a criar pós-reunião).
