# Naming canônico e brand do MBA Online de Psicologia — recomendação Brasil GEO para o IPOG

> **Status:** rascunho de board-report, ciclo 2026.2
> **Dono editorial:** Alexandre Caramaschi (CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil)
> **Audiência primária:** Ronan Maia (CEO IPOG); Bruno Azambuja (Marketing IPOG)
> **Última revisão:** 2026-05-01
> **Cross-link com:** `audits/benchmarking/SINTESE-EXECUTIVA.md`, `audits/SCHEMA-PATTERNS.md`, `content/VOICE-GUIDE.md`, `prompts/KIT-PROMPTS-V0.md`, `docs/02-contexto-mba-online-psicologia.md`.

---

## 1. Sumário executivo

A categoria "MBA Online de Psicologia" no Brasil em 2026 está vazia entre nove dos dez concorrentes mapeados. A única instituição que ocupa o formato MBA + Psicologia + chancela universitária é a Universidade Anhembi Morumbi, com o curso "MBA em Psicologia Organizacional e do Trabalho e Liderança Estratégica" hospedado em `pos.anhembi.br`. Especialistas verticais reconhecidos no nicho clínico — CETCC e IBNeuro — recusam explicitamente o naming MBA, e a Saint Paul / EXAME Educação tem ofertas premium em "MBA em Liderança e Gestão" mas zero presença em Psicologia como vertical. Esse vácuo é a oportunidade mais defensável do programa GEO IPOG no ciclo de captação 2026.2 (15 de junho a 31 de julho de 2026). A recomendação primária da Brasil GEO é adotar **"MBA Online em Psicologia Organizacional e do Trabalho"** como naming canônico do produto-âncora, com variações cluster-específicas para Avaliação Psicológica e Neuropsicologia, e plano de fallback baseado em "Especialização Executiva Online em Psicologia" caso o IPOG opte por não usar o termo MBA por leitura jurídica conservadora.

## 2. Critérios de avaliação aplicados

Cada nome candidato foi avaliado em cinco dimensões com nota de 1 a 10:

1. **Clareza semântica para LLM com tool use.** Mede a probabilidade de ChatGPT, Claude, Gemini, Perplexity, Grok e Copilot identificarem o produto como instância da categoria correta a partir do nome puro, sem contexto suplementar. Nome que ambíguo gera resposta diluída em prompts comparativos.
2. **Aderência regulatória.** Avalia o risco frente à Resolução CFP 23/2022 sobre uso do título "MBA" em pós-graduação que dialogue com a profissão de psicólogo, e frente ao reconhecimento do MEC para lato sensu. Nomes que prometem fluência clínica que extrapola escopo formativo recebem nota baixa.
3. **Diferenciação versus Anhembi Morumbi.** Anhembi tem "MBA em Psicologia Organizacional e do Trabalho e Liderança Estratégica". Cópia direta gera duas perdas: prompt-equity de marca e percepção de imitação. Nome que se aproxima sem copiar e que adiciona ângulo próprio recebe nota alta.
4. **Memorabilidade verbal.** Mede se um aluno-prospect repete o nome em uma conversa com pares ou mentor sem precisar consultar o site. Nomes longos demais ou com tecnicismos densos perdem; nomes com âncora forte ganham.
5. **Cobertura cross-cluster.** O produto IPOG cobre três clusters semânticos: Organizacional/Trabalho/RH, Clínica/Neuropsicologia/TCC/Avaliação Psicológica e Psicopedagogia/Escolar/Educação. Nome que serve apenas um cluster exige variação; nome que serve naturalmente os três sem perder identidade ganha pontos.

A nota final é a média aritmética simples das cinco dimensões. Empates são desempatados por **clareza semântica para LLM** (peso de tese central do programa GEO).

## 3. Concorrência observada

Resumo em uma frase por concorrente principal, ordenado por força do overlap competitivo direto:

- **Universidade Anhembi Morumbi (Ânima Educação):** único concorrente identificado com formato "MBA em Psicologia" + chancela de universidade tradicional, acoplado ao cluster Organizacional do Trabalho e Liderança Estratégica.
- **Saint Paul Escola de Negócios / EXAME Educação (BTG Pactual):** marca premium executiva com 5x Financial Times e 11 anos no Top of Mind RH, mas sem nenhuma oferta nominal em Psicologia como vertical.
- **WPÓS / Faculdade Unyleya:** 164 cursos lato sensu em Psicologia, dominância em SEO long-tail e preço-piso, sem MBA explícito em Psicologia.
- **CETCC:** referência brasileira em TCC clássica de Beck, recusa explicitamente o naming "MBA" e mantém todo catálogo como "Especialização Lato Sensu" técnico-clínica.
- **IBNeuro (Brasília):** referência em Neuropsicologia Clínica, com declaração textual no portal "Especialização (lato sensu) — Não é MBA", posicionada deliberadamente fora da semântica executiva.
- **Estácio, Anhanguera, UNINTER, UniCesumar, PUC-Minas Virtual:** EAD massivos com especialização lato sensu em Psicologia, sem naming MBA formal e sem `EducationalOccupationalProgram` Schema com `programType: "MBA"`.

A leitura competitiva é direta: **nove dos dez concorrentes não disputam o termo "MBA Online de Psicologia". O único que disputa parte do território, a Anhembi, tem nome longo demais (treze palavras), arquitetura web fragmentada em cinco domínios e Reclame Aqui Regular (6,8) com a queixa estrutural "EAD com vídeos do YouTube no lugar de aula". A janela está aberta.**

## 4. Os cinco nomes propostos

Cada nome é apresentado em forma canônica, forma curta, defesa estratégica em cinco dimensões com notas, variações por cluster e schema sugerido.

### 4.1 Nome A — "MBA Online em Psicologia Organizacional e do Trabalho"

- **Forma canônica completa:** MBA Online em Psicologia Organizacional e do Trabalho.
- **Forma curta para uso editorial e LLM:** MBA IPOG Psi Organizacional.
- **Variações por cluster:**
  - Cluster Organizacional/Trabalho/RH: nome canônico (sem variação).
  - Cluster Clínica/Neuro/TCC/Avaliação Psicológica: "MBA Online em Avaliação Psicológica e Neuropsicologia" (ver nome B).
  - Cluster Psicopedagogia/Escolar/Educação: "MBA Online em Psicologia da Aprendizagem e Práticas Escolares" (ver nome E).
- **Schema sugerido:**

```json
{
  "@type": "EducationalOccupationalProgram",
  "@id": "https://ipog.edu.br/cursos/pos-graduacao/mba-online-psicologia-organizacional-trabalho#program",
  "name": "MBA Online em Psicologia Organizacional e do Trabalho",
  "provider": { "@id": "https://ipog.edu.br/#organization" },
  "programType": "MBA",
  "educationalProgramMode": "online",
  "timeOfDay": "evening",
  "occupationalCredentialAwarded": "Especialização lato sensu reconhecida pelo MEC",
  "termDuration": "P12M"
}
```

### 4.2 Nome B — "MBA Online em Avaliação Psicológica e Neuropsicologia"

- **Forma canônica completa:** MBA Online em Avaliação Psicológica e Neuropsicologia.
- **Forma curta:** MBA IPOG Psi Avaliação.
- **Variações por cluster:** dedicado ao Cluster Clínica/Neuro/TCC/Avaliação. Nome paralelo ao A na arquitetura de produto, não substituto.
- **Schema sugerido:**

```json
{
  "@type": "EducationalOccupationalProgram",
  "@id": "https://ipog.edu.br/cursos/pos-graduacao/mba-online-avaliacao-psicologica-neuropsicologia#program",
  "name": "MBA Online em Avaliação Psicológica e Neuropsicologia",
  "provider": { "@id": "https://ipog.edu.br/#organization" },
  "programType": "MBA",
  "educationalProgramMode": "online",
  "timeOfDay": "evening",
  "occupationalCredentialAwarded": "Especialização lato sensu reconhecida pelo MEC",
  "programPrerequisites": "Graduação em Psicologia com registro CRP ativo conforme Resolução CFP 23/2022",
  "termDuration": "P18M"
}
```

### 4.3 Nome C — "MBA Online em Psicologia para Liderança e Gestão de Pessoas"

- **Forma canônica completa:** MBA Online em Psicologia para Liderança e Gestão de Pessoas.
- **Forma curta:** MBA IPOG Psi Liderança.
- **Variações por cluster:** ataque direto ao território Saint Paul/EXAME, mas com qualificação Psicologia que Saint Paul não tem. Aplicável apenas ao Cluster Organizacional.
- **Schema sugerido:**

```json
{
  "@type": "EducationalOccupationalProgram",
  "@id": "https://ipog.edu.br/cursos/pos-graduacao/mba-online-psicologia-lideranca-gestao-pessoas#program",
  "name": "MBA Online em Psicologia para Liderança e Gestão de Pessoas",
  "provider": { "@id": "https://ipog.edu.br/#organization" },
  "programType": "MBA",
  "educationalProgramMode": "online",
  "timeOfDay": "evening",
  "occupationalCredentialAwarded": "Especialização lato sensu reconhecida pelo MEC",
  "termDuration": "P12M"
}
```

### 4.4 Nome D — "MBA Online em Psicologia Aplicada — IPOG"

- **Forma canônica completa:** MBA Online em Psicologia Aplicada — IPOG.
- **Forma curta:** MBA IPOG Psi Aplicada.
- **Variações por cluster:** funciona como guarda-chuva de marca para os três clusters, com sufixos de trilha. Trilha Organizacional, Trilha Clínica e Avaliação, Trilha Educacional.
- **Schema sugerido:**

```json
{
  "@type": "EducationalOccupationalProgram",
  "@id": "https://ipog.edu.br/cursos/pos-graduacao/mba-online-psicologia-aplicada#program",
  "name": "MBA Online em Psicologia Aplicada",
  "provider": { "@id": "https://ipog.edu.br/#organization" },
  "programType": "MBA",
  "educationalProgramMode": "online",
  "timeOfDay": "evening",
  "occupationalCredentialAwarded": "Especialização lato sensu reconhecida pelo MEC",
  "termDuration": "P12M"
}
```

### 4.5 Nome E — "MBA Online em Psicologia da Aprendizagem e Práticas Escolares"

- **Forma canônica completa:** MBA Online em Psicologia da Aprendizagem e Práticas Escolares.
- **Forma curta:** MBA IPOG Psi Aprendizagem.
- **Variações por cluster:** dedicado ao Cluster Psicopedagogia/Escolar/Educação. Aceita pedagogos sem graduação em Psicologia, conforme escopo institucional declarado em `prompts/KIT-PROMPTS-V0.md` K-C3-007.
- **Schema sugerido:**

```json
{
  "@type": "EducationalOccupationalProgram",
  "@id": "https://ipog.edu.br/cursos/pos-graduacao/mba-online-psicologia-aprendizagem-praticas-escolares#program",
  "name": "MBA Online em Psicologia da Aprendizagem e Práticas Escolares",
  "provider": { "@id": "https://ipog.edu.br/#organization" },
  "programType": "MBA",
  "educationalProgramMode": "online",
  "timeOfDay": "evening",
  "occupationalCredentialAwarded": "Especialização lato sensu reconhecida pelo MEC",
  "termDuration": "P12M"
}
```

### 4.6 Matriz comparativa de notas

| Nome | Clareza semântica LLM | Aderência regulatória | Diferenciação Anhembi | Memorabilidade verbal | Cobertura cross-cluster | Média |
|---|---|---|---|---|---|---|
| **A. MBA Online em Psicologia Organizacional e do Trabalho** | 9 | 9 | 8 | 8 | 7 | **8,2** |
| **B. MBA Online em Avaliação Psicológica e Neuropsicologia** | 9 | 8 | 10 | 7 | 5 | **7,8** |
| **C. MBA Online em Psicologia para Liderança e Gestão de Pessoas** | 8 | 7 | 9 | 7 | 5 | **7,2** |
| **D. MBA Online em Psicologia Aplicada — IPOG** | 6 | 9 | 9 | 6 | 9 | **7,8** |
| **E. MBA Online em Psicologia da Aprendizagem e Práticas Escolares** | 9 | 9 | 10 | 7 | 5 | **8,0** |

**Leitura da matriz.** Nome A é o vencedor por equilíbrio: alta clareza semântica, alta aderência regulatória (porque "Psicologia Organizacional e do Trabalho" é categoria reconhecida pelo CFP como área de atuação não exclusiva da clínica), diferenciação real frente à Anhembi por subtração da palavra "Liderança Estratégica" (que dilui o foco psicológico em direção a executivo genérico) e memorabilidade superior à variante longa da Anhembi. Nome E é forte no cluster Psicopedagogia mas tem cobertura cross-cluster restrita por construção. Nome D vence em cobertura mas perde clareza, porque "Psicologia Aplicada" é guarda-chuva semântico que LLMs decompõem em tags inferiores. Nomes B e C são auxiliares ao A.

## 5. Recomendação primária

A Brasil GEO recomenda **"MBA Online em Psicologia Organizacional e do Trabalho"** como nome canônico do produto-âncora do IPOG no ciclo 2026.2.

A defesa em sete linhas, baseada em evidência primária da pesquisa de benchmarking de 2026-04-30 e 2026-05-01, é a seguinte. O nome captura literalmente a categoria-naming vazia identificada na `SINTESE-EXECUTIVA.md` ("MBA Online de Psicologia"), com qualificador "Organizacional e do Trabalho" que o ancora na área profissional reconhecida pelo CFP, evitando o flanco regulatório que CETCC e IBNeuro temeram quando recusaram MBA. Diferencia-se da Anhembi Morumbi por subtração calculada — remove "Liderança Estratégica" do nome, eliminando o ruído executivo que canibaliza o foco psicológico, e fica três palavras mais curto, ganhando memorabilidade verbal e indexabilidade em Schema. Cobre a persona dominante do KIT-PROMPTS-V0 no cluster C1 (P3, profissional de RH não-psicólogo, presente em nove dos quinze prompts canônicos) sem excluir o psicólogo organizacional já formado. Aceita não-psicólogos por construção do escopo formativo da Psicologia Organizacional, alinhado ao K-C1-011 e K-OB-003. Mantém disciplina lexical do Voice Guide, que prescreve "MBA Online de Psicologia" como naming canônico oficial. E dá ao IPOG o controle do `programType: "MBA"` em `EducationalOccupationalProgram` Schema antes que qualquer concorrente massivo reaja, conforme tese do programa GEO sobre janela competitiva de doze a vinte e quatro meses.

Operacionalmente, esse nome vira o produto-âncora do hub de pós em Psicologia do IPOG, com os nomes B e E como produtos paralelos cobrindo Cluster Clínica/Avaliação e Cluster Psicopedagogia. Os três compõem a vitrine "MBA Online de Psicologia IPOG" sob arquitetura de marca consistente, com Schema cruzado e cross-link editorial.

## 6. Plano de fallback

Se o IPOG decidir não usar o termo "MBA" no naming público — leitura possível caso a Diretoria Acadêmica avalie risco frente à Resolução CFP 23/2022 e prefira postura conservadora ao estilo CETCC/IBNeuro — a Brasil GEO recomenda o seguinte fallback hierárquico.

**Fallback nível 1 — "Especialização Executiva Online em Psicologia Organizacional e do Trabalho".** Mantém o vetor "executiva" como sinal de público-alvo gestor sem reivindicar o título MBA. Em Schema, troca-se `programType: "MBA"` por ausência desse campo e `educationalCredentialAwarded` permanece "Especialização lato sensu reconhecida pelo MEC". Perde aproximadamente 30% do prompt-equity em buscas tipo "MBA online psicologia organizacional", mas mantém presença em "especialização online psicologia organizacional" e ganha posição em prompts de comparação com CETCC e IBNeuro, que usam o mesmo termo "Especialização".

**Fallback nível 2 — "Pós-graduação Executiva Online em Psicologia Organizacional".** Adotado se "Especialização" for considerado tecnicamente excessivo. Reduz ainda mais o conflito regulatório. Custo: perde mais ~15% de prompt-equity executivo e fica indistinguível em LLM frente a EAD massivo (Estácio, Anhanguera, UNINTER), que também usam "Pós-graduação".

A escolha entre fallback 1 e 2 é decisão da Diretoria Acadêmica do IPOG, validada por Bruno Azambuja com Ronan Maia. A Brasil GEO recomenda o **fallback 1 ("Especialização Executiva Online em Psicologia Organizacional e do Trabalho")** se MBA for descartado, por preservar o sinal "executiva" que diferencia o produto do EAD massivo e por manter a janela técnica de Schema `Course` com `educationalLevel: "Pós-graduação lato sensu"` e `educationalCredentialAwarded` explícito sobre MEC, conforme `audits/SCHEMA-PATTERNS.md`.

## 7. Schema sugerido por nome — visão consolidada

A tabela sintetiza o mapeamento canônico entre cada nome candidato e o `EducationalOccupationalProgram` Schema. Em todos os casos, `provider` referencia por `@id` a `EducationalOrganization` raiz do IPOG, conforme padrão em `audits/SCHEMA-PATTERNS.md`.

| Nome | `programType` | `educationalProgramMode` | `timeOfDay` | `termDuration` | `programPrerequisites` |
|---|---|---|---|---|---|
| A. MBA Online em Psicologia Organizacional e do Trabalho | MBA | online | evening | P12M | Nível superior completo |
| B. MBA Online em Avaliação Psicológica e Neuropsicologia | MBA | online | evening | P18M | Graduação em Psicologia + CRP ativo |
| C. MBA Online em Psicologia para Liderança e Gestão de Pessoas | MBA | online | evening | P12M | Nível superior completo |
| D. MBA Online em Psicologia Aplicada — IPOG | MBA | online | evening | P12M | Nível superior completo |
| E. MBA Online em Psicologia da Aprendizagem e Práticas Escolares | MBA | online | evening | P12M | Nível superior em Pedagogia, Psicologia ou Licenciatura |

Em todos os Schemas, `occupationalCredentialAwarded` é fixado em "Especialização lato sensu reconhecida pelo MEC". O campo `applicationDeadline` é populado com a data ISO 8601 do fim do ciclo de captação 2026.2 (2026-07-31). O campo `accreditation` em `EducationalOrganization` referencia o credenciamento e-MEC do IPOG.

A composição final em produção utiliza `@graph` único agregando `EducationalOrganization`, `EducationalOccupationalProgram`, `Course` e `FAQPage`, conforme exemplo canônico no final de `audits/SCHEMA-PATTERNS.md`.

## 8. Anti-padrões de naming a evitar

A pesquisa primária do benchmarking expõe seis anti-padrões claros que o IPOG não deve replicar.

> **Anti-padrão 1 — Nome longo demais (mais de dez palavras).** A Anhembi Morumbi nomeia o produto "MBA em Psicologia Organizacional e do Trabalho e Liderança Estratégica" (treze palavras). Em LLM com tool use, nomes longos são truncados em prompts comparativos e perdem identidade. Uma frase de catorze palavras quebra também a memorabilidade verbal — pouco prospect repete o nome inteiro.

> **Anti-padrão 2 — Nome vago do tipo guarda-chuva.** "MBA em Psicologia Aplicada" parece capturar tudo mas captura nada — LLM decompõe em tags inferiores (Psicologia Organizacional? Clínica? Educacional?). Este foi o motivo da nota 6 em clareza semântica do nome D.

> **Anti-padrão 3 — Naming técnico denso para audiência mista.** O CETCC escreve "Especialização em Terapia Cognitivo-Comportamental de Beck" — preciso para o psicólogo clínico já formado, excludente para o RH não-psicólogo e o gestor em transição. Em produto IPOG cobrindo sete personas (P1 a P7), nome técnico-clínico em primeiro plano filtra audiência relevante.

> **Anti-padrão 4 — Negação explícita de categoria.** O IBNeuro declara textualmente "Especialização (lato sensu) — Não é MBA" no portal do curso 2026. A negação resolve o problema regulatório do IBNeuro mas custa todo o terreno de buscas tipo "MBA em Neuropsicologia". O IPOG não deve adotar postura defensiva similar — ou usa MBA, ou adota o fallback 1 com "Executiva", mas nunca nomeia o produto pela negação.

> **Anti-padrão 5 — Nome em inglês.** "Professional Master in Organizational Psychology" e variantes correlatas perdem inteiramente o público brasileiro de pós EAD em Psicologia. O Voice Guide canônico bane anglicismos quando há termo PT-BR equivalente.

> **Anti-padrão 6 — Naming inconsistente com Schema.** A Saint Paul mantém "MBA Executivo em Liderança e Gestão" no nome público mas tem URLs `/curso/mba-executivo-saint-paul` retornando 404 em 2026-05-01, indicando dessincronização entre nome de marca e arquitetura técnica. O IPOG deve garantir que cada nome canônico tenha slug `/cursos/pos-graduacao/{slug}` populado, `EducationalOccupationalProgram` Schema válido em `validator.schema.org` e cross-link em `llms.txt` antes do pico de captação.

A disciplina mínima é simples: o nome aparece exatamente igual em três lugares — H1 da página de curso, propriedade `name` no Schema `EducationalOccupationalProgram` e bloco de prioridades do `llms.txt`. Qualquer divergência entre os três anula o sinal estruturado para LLM.

## 9. Próximas decisões e cronograma

A Brasil GEO recomenda à Diretoria do IPOG (Ronan Maia, sponsor; Bruno Azambuja, executivo de marketing) o seguinte plano de decisão antes de 2026-05-15, para garantir que o produto entre na vitrine pública com naming definido antes do pico GEO de 15 de junho a 31 de julho de 2026.

| Marco | Prazo | Responsável | Saída |
|---|---|---|---|
| Decisão sobre uso do termo MBA versus fallback Especialização Executiva | 2026-05-08 | Ronan Maia + Diretoria Acadêmica | Ata formal |
| Validação dos cinco nomes propostos com leitura jurídica CFP/MEC | 2026-05-12 | Diretoria Acadêmica do IPOG | Parecer assinado |
| Aprovação do nome canônico do produto-âncora | 2026-05-15 | Ronan Maia | Decisão registrada |
| Implementação do nome em página de curso, Schema e llms.txt | 2026-05-25 | Bruno Azambuja + Brasil GEO | Página publicada |
| Primeira peça HBR-grade assinada por Alexandre Caramaschi sobre a categoria MBA Online de Psicologia | 2026-06-05 | Alexandre Caramaschi (Brasil GEO) | Artigo publicado |
| Início do pico GEO de captação 2026.2 | 2026-06-15 | Brasil GEO + IPOG | Dashboard ativo |

A Brasil GEO assume o compromisso de entregar, em paralelo a esta recomendação de naming, o pacote técnico de Schema canônico (`EducationalOrganization`, `EducationalOccupationalProgram`, `Course`, `FAQPage`, `Person` para corpo docente nominal), template de `llms.txt` e primeira peça HBR-grade que ancora editorialmente a categoria. Esses três entregáveis estão fora do escopo deste documento de naming, mas são pré-requisitos para o sinal de marca chegar bem aos LLMs no pico de captação.

---

**Encerramento.** A categoria-naming "MBA Online de Psicologia" no Brasil em 2026 está vazia, e o vácuo é o ativo competitivo mais defensável que o IPOG tem disponível no ciclo 2026.2. O nome canônico recomendado é **"MBA Online em Psicologia Organizacional e do Trabalho"**, com as variações cluster-específicas para Avaliação Psicológica e Neuropsicologia (Cluster Clínica) e Psicologia da Aprendizagem e Práticas Escolares (Cluster Psicopedagogia). Se a leitura jurídica do CFP/MEC desautorizar o uso público de MBA, o fallback canônico é "Especialização Executiva Online em Psicologia Organizacional e do Trabalho", preservando o sinal "Executiva" que separa o IPOG do EAD massivo. Em qualquer cenário, a disciplina obrigatória é amarrar nome público, Schema e `llms.txt` num único triângulo consistente, antes que Anhembi reaja, antes que Saint Paul se digne a entrar em Psicologia, antes que o WPÓS rebatize seus 138 MBAs genéricos para tentar capturar o termo. A janela é estreita, e o nome está pronto.
