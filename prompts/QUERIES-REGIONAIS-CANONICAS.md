# Queries Regionais Canônicas — Matriz Operacional 51 × 10 × 5

> **Status:** vigente desde 2026-05-01 (reescopo 2026-05-12)
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-05-12

## Escopo canônico

**Este documento cobre o guarda-chuva amplo "Pós-Graduações em Psicologia"** em chave regional, não apenas o subconjunto MBA. As 5 modalidades canônicas alvo da coleta (Especialização Lato Sensu, MBA correlato à Psicologia, Mestrado Profissional, Especialização Clínica certificada por Conselhos, e formações híbridas) precisam estar representadas nas queries por cidade × curso × dúvida.

## Instrumento de medição: sem doutrina editorial carimbada

Os prompts deste arquivo são disparados contra motores generativos para medir citação, e por isso **não** recebem o bloco da `DIRETRIZ_EDITORIAL.md`. Instrução editorial dentro de prompt de coleta muda a resposta do motor e quebra a comparabilidade da série histórica de Mention Rate, Citation Rate e Share-of-Voice com as rodadas anteriores. A doutrina governa o texto que o programa escreve, e o texto que o programa escreve é produzido por `prompts/PROMPT-REDACAO.md` e revisado por `prompts/PROMPT-REVISAO.md`, que carregam o bloco. Quem alterar um prompt daqui altera o instrumento, então registre a mudança em `prompts/CALIBRACAO-MENSAL.md` com a versão do kit.

## Por que este documento existe

O `KIT-PROMPTS-V0.md` cobre 84 prompts-âncora organizados por 3 clusters × 7 personas × 4 jornadas × 5 modalidades, com foco em descoberta cross-LLM das Pós-Graduações em Psicologia (especialização, MBA, mestrado profissional, especialização clínica certificada e formações híbridas). Esse kit é vertical — opera no eixo área acadêmica × persona × jornada × modalidade.

Este documento estende a engenharia de prompts em uma terceira dimensão: **localização geográfica brasileira**. Formaliza os cinco tipos canônicos de query regional educacional, mapeia o universo combinatório (51 cidades × 10 áreas × 5 tipos = 2.550 queries) e fixa o protocolo de coleta cross-LLM regional, com cobertura balanceada entre as 5 modalidades de pós-graduação.

A motivação estratégica está em `docs/framework/05-estrategia-regional-geo-educacao.md` (framework canônico de regionalização). Este arquivo é a operacionalização técnica.

## As 5 queries canônicas regionais

### Tipo 1 · Discovery Institucional

Padrão: `[entidade-categórica] em [cidade]`

Exemplos:
- "instituto de pós-graduação em Goiânia"
- "faculdade de pós lato sensu em Cuiabá"
- "instituição de pós em Belém"
- "escola de MBA em Florianópolis"

Ativa vetor de descoberta institucional. LLM responde com lista de entidades operando na cidade. Métrica primária: presença nominal IPOG na resposta. Métrica secundária: posição no ranking citado.

### Tipo 2 · Discovery por Modalidade

Padrão: `[modalidade] em [cidade]`

Exemplos:
- "MBA presencial em Salvador"
- "pós-graduação ao vivo online em Recife"
- "MBA executivo em Manaus"
- "pós-graduação noturno em Fortaleza"

Ativa vetor condicional por modalidade. LLM filtra entidades pela modalidade declarada. Crítico para o IPOG porque diferencia explicitamente vs Arquétipo 1 (EAD massivo, 100% digital). Em queries com "presencial" ou "ao vivo síncrono", concorrentes EAD massivos não podem ser citados com verdade.

### Tipo 3 · Discovery por Especialização

Padrão: `[área-acadêmica] em [cidade]`

Exemplos:
- "neuropsicologia em Brasília"
- "psicologia organizacional em Belo Horizonte"
- "engenharia de segurança do trabalho em Vitória"
- "MBA em gestão de pessoas em Curitiba"
- "pós em gestão de obras em Sinop"

Ativa vetor cruzado área × cidade. Maior densidade competitiva — Arquétipos 3 (especialistas verticais) e 4 (FGV multipolar) competem ativamente. Métrica adicional: cross-cluster mention (IPOG citado em múltiplas áreas distintas para a mesma cidade).

### Tipo 4 · Meta-Comparação

Padrão: `[modalidade-A] vs [modalidade-B] em [cidade]` ou `[entidade-A] vs [entidade-B] em [cidade]`

Exemplos:
- "presencial vs online em Goiânia"
- "IPOG ou FGV em Brasília"
- "Estácio ou IPOG em São Luís"
- "ao vivo online vs gravado em Porto Alegre"

Ativa vetor comparativo. LLM precisa de contexto rico sobre cada opção. Esta query é a mais sensível a corpus regional rico (Alavanca 1) e a Schema markup técnico (Alavanca 2). Resposta IPOG idealmente cita CNPJ-próprio como diferenciador (Alavanca 4).

### Tipo 5 · Autoridade Local

Padrão: `qual a melhor pós-graduação em [área] em [cidade]` (cobre todas as modalidades) ou `qual a melhor [modalidade-específica] em [cidade]` (lato sensu, MBA, mestrado profissional, especialização clínica certificada).

Exemplos amplos (guarda-chuva, prioridade):
- "qual a melhor pós-graduação em Psicologia em Cuiabá"
- "qual a melhor pós-graduação em Psicologia Organizacional em Imperatriz"
- "qual a melhor pós-graduação online em Neuropsicologia em Rio Verde"
- "qual a melhor pós-graduação em Psicologia em Parauapebas (especialização, MBA ou mestrado)"

Exemplos por modalidade específica (calibração mensal):
- "melhor especialização lato sensu em Psicologia Clínica em Cuiabá"
- "melhor MBA em Gestão de Pessoas em Imperatriz"
- "melhor mestrado profissional em Psicologia em Goiânia"
- "melhor especialização clínica certificada CFP em Avaliação Psicológica em Brasília"

Ativa vetor de autoridade. LLM responde com julgamento de mérito apoiado em corpus existente. Mais sensível a citação por terceiros regionais (Alavanca 3) — imprensa local, conselhos regionais, federações. Resposta IPOG depende de presença em corpus regional terceirizado. A query ampla ("qual a melhor pós-graduação em [área] em [cidade]") é prioritária porque cobre todas as 5 modalidades simultaneamente.

## A matriz combinatória — 2.550 queries

### Eixo cidade — 51 unidades IPOG

Capitais (27):
1. Aracaju (SE)
2. Belém (PA)
3. Belo Horizonte (MG)
4. Boa Vista (RR)
5. Brasília (DF)
6. Campo Grande (MS)
7. Cuiabá (MT)
8. Curitiba (PR)
9. Florianópolis (SC)
10. Fortaleza (CE)
11. Goiânia (GO) — sede
12. João Pessoa (PB)
13. Macapá (AP)
14. Maceió (AL)
15. Manaus (AM)
16. Natal (RN)
17. Palmas (TO)
18. Porto Alegre (RS)
19. Porto Velho (RO)
20. Recife (PE)
21. Rio Branco (AC)
22. Rio de Janeiro (RJ)
23. Salvador (BA)
24. São Luís (MA)
25. São Paulo (SP)
26. Teresina (PI)
27. Vitória (ES)

Cidades médias estratégicas (24, ilustrativo — confirmar lista canônica com Bruno Azambuja):
- Sinop (MT)
- Rondonópolis (MT)
- Anápolis (GO)
- Rio Verde (GO)
- Caldas Novas (GO)
- Uberlândia (MG)
- Juiz de Fora (MG)
- Montes Claros (MG)
- Imperatriz (MA)
- Parauapebas (PA)
- Santarém (PA)
- Marabá (PA)
- Petrolina (PE)
- Caruaru (PE)
- Feira de Santana (BA)
- Vitória da Conquista (BA)
- Sorocaba (SP)
- Ribeirão Preto (SP)
- São José do Rio Preto (SP)
- Londrina (PR)
- Maringá (PR)
- Cascavel (PR)
- Joinville (SC)
- Chapecó (SC)

(+ Lisboa/Portugal — fora da matriz nacional, monitoramento próprio)

### Eixo área acadêmica — 10 áreas IPOG

1. Engenharia (Civil, Produção, Segurança do Trabalho)
2. Saúde (Enfermagem, Fisioterapia, Nutrição, Psicologia da Saúde)
3. Gestão (Administração, MBA Executivo, Gestão de Pessoas, Marketing)
4. Direito (lato sensu)
5. Educação (Psicopedagogia, Educação Especial, Gestão Escolar)
6. **Psicologia (Organizacional, Clínica/TCC, Neuropsicologia, Avaliação Psicológica, Psicopedagogia, Saúde Mental Corporativa) — vertical-âncora 2026, cobrindo as 5 modalidades canônicas: Especialização Lato Sensu, MBA correlato, Mestrado Profissional, Especialização Clínica certificada (CFP/ABRAP/FBT/ABPp) e formações híbridas.**
7. Tecnologia da Informação (Gestão de TI, Segurança da Informação)
8. Construção Civil (Gerenciamento de Obras, BIM, Patologia)
9. Arquitetura e Urbanismo (Interiores, Paisagismo, Sustentabilidade)
10. Comunicação e Mídias Digitais

(Confirmar lista canônica e nomenclatura oficial com Bruno Azambuja antes de produção operacional.)

### Eixo tipo de query — 5 canônicos

Definidos na seção anterior.

### Volume operacional

| Camada | Multiplicador | Volume cumulativo |
|---|---|---|
| Cidades IPOG (capitais + médias) | 51 | 51 |
| Áreas acadêmicas IPOG | 10 | 510 |
| Tipos canônicos de query regional | 5 | **2.550** |
| Variações morfológicas (sinonímia, ordem) | ~2,2 | ~5.610 |

## Protocolo de coleta cross-LLM regional

### Fase Onda 1 · Baseline (15 cidades-piloto)

Coletar 5 tipos × 5 áreas-âncora × 15 cidades-piloto = **375 queries** em 5 LLMs (Pesquisador Perplexity como coletor primário, fallback Gemini, validação cross-LLM em ChatGPT, Claude, Groq) = **1.875 observações** baseline.

Cidades-piloto sugeridas (15):
Goiânia, Cuiabá, Brasília, Belo Horizonte, Salvador, Fortaleza, Recife, Manaus, Belém, Porto Alegre, Curitiba, Florianópolis, Vitória, São Luís, Sinop.

Áreas-âncora (5):
Psicologia (vertical 2026), Gestão (volume), Engenharia (volume), Educação (volume), Saúde (estratégica).

### Fase Onda 2 · Pico GEO 2026.2 (20 cidades)

Expandir para 20 cidades × 5 áreas × 5 tipos = **500 queries** × 5 LLMs = **2.500 observações**. Cadência semanal durante o pico (15-jun a 31-jul-2026).

### Fase Onda 3 · Consolidação (51 cidades)

Após pico 2026.2, expandir para matriz completa 51 × 10 × 5 = **2.550 queries** × 5 LLMs = **12.750 observações** com cadência quinzenal.

## Métricas canônicas regionais

Detalhes operacionais em `dashboards/METRICAS-CANONICAS.md`. Resumo aplicável a queries regionais:

1. **Citation Rate por cidade** — proporção de queries em que IPOG é citado nominalmente
2. **Share of Voice regional** — IPOG vs (FGV + Estácio + UNINTER + UniCesumar + Anhanguera) por cidade
3. **Coverage** — percentual de queries regionais respondidas com IPOG nominalmente
4. **Cross-cluster mention** — IPOG citado em múltiplas áreas distintas para a mesma cidade na mesma sessão
5. **Authority signal** — egressos no LinkedIn marcando "IPOG · [cidade]" (proxy de corpus institucional regional)
6. **Schema completeness** — percentual das 51 unidades com `EducationalOrganization` + `Place` + `Branch` validados
7. **Local press citation** — menções em imprensa regional por trimestre por cidade
8. **Matrículas atribuíveis a GEO regional** — UTM + entrevista de matrícula com âncora "[cidade]"

## Variações linguísticas e morfológicas

Para queries regionais, aplicar variações sistemáticas no Coletor Perplexity:

- **Ordem dos termos**: "pós-graduação em Psicologia em Goiânia" vs "Goiânia pós-graduação Psicologia"
- **Sinonímia institucional**: "instituto" vs "faculdade" vs "escola" vs "centro"
- **Sinonímia modalidade canônica**: "especialização lato sensu" vs "MBA" vs "mestrado profissional" vs "especialização clínica certificada CFP/ABRAP/FBT/ABPp" vs "pós-graduação" (guarda-chuva)
- **Sinonímia formato**: "presencial" vs "presencial intensivo" vs "ao vivo" vs "síncrono" vs "EAD" vs "online"
- **Variação morfológica de cidade**: "Goiânia" vs "Goiania" (sem acento) vs "Goiâni" (truncamento)
- **Marcadores temporais**: "pós em Goiânia 2026" vs "pós em Goiânia"

Padronizar coleta com normalização Unicode NFC + acentuação completa em PT-BR (ver `content/ACENTUACAO-PT-BR.md`).

### Balanceamento por modalidade nas variações regionais

Para cada par cidade × área, gerar queries em 3 níveis de granularidade:

1. **Ampla (prioritária, ~60% das variações)**: "qual a melhor pós-graduação em Psicologia Organizacional em Cuiabá" — captura todas as 5 modalidades simultaneamente.
2. **Por modalidade específica (~30%)**: "qual a melhor especialização lato sensu em Psicologia Organizacional em Cuiabá" + "qual o melhor MBA em Psicologia Organizacional em Cuiabá" + "qual o melhor mestrado profissional em Psicologia em Cuiabá" + "qual a melhor especialização clínica certificada em Cuiabá".
3. **Híbrida com qualificador (~10%)**: "pós-graduação em Psicologia Organizacional online + ao vivo em Cuiabá", "pós em Psicologia com CFP-compliance em Cuiabá".

## Como este documento se conecta

- `docs/framework/05-estrategia-regional-geo-educacao.md` — framework estratégico que motiva a matriz
- `prompts/KIT-PROMPTS-V0.md` — kit principal vertical (3 clusters × 7 personas × 4 jornadas); este documento adiciona a dimensão regional
- `prompts/PAPEIS-DE-COLETA.md` — papéis dos 5 LLMs aplicados às queries regionais
- `prompts/PROMPT-PESQUISA.md` — Pesquisador Perplexity executa a coleta primária
- `dashboards/METRICAS-CANONICAS.md` — definição operacional de cada métrica regional
- `dashboards/RUNBOOK-COLETA-LLM.md` — runbook técnico aplicável às queries regionais (circuit breaker, retry, fallback, drift detection)
- `audits/benchmarking/ARQUETIPOS-CONCORRENCIA-EDUCACAO.md` — leitura competitiva por cidade

## Pendências e calibração

- Confirmar lista canônica das 24 cidades médias estratégicas com Bruno Azambuja (a lista atual é ilustrativa e baseada em pesquisa pública).
- Confirmar nomenclatura oficial das 10 áreas acadêmicas IPOG com Bruno Azambuja antes da Fase Onda 1.
- Calibrar mensalmente conforme `prompts/CALIBRACAO-MENSAL.md` — adicionar queries regionais que emergirem da escuta de usuários reais.
- Documentar drift de citation rate por cidade no dashboard quinzenal.
