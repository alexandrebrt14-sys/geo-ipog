# Pricing e Unit Economics — MBA Online de Psicologia (IPOG)

> **Status:** vigente desde 2026-05-01
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Sponsor IPOG:** Ronan Maia (CEO)
> **Última revisão:** 2026-05-01
> **Escopo:** modelo financeiro do MBA Online de Psicologia, fundamentação de pricing competitivo e projeção de captação para os ciclos 2026.2 (15-jun a 31-jul) e 2027.1 (01-dez a 15-fev).

Este dossiê é prescritivo. Cada cifra de mercado vem de fonte externa documentada (dossiês `audits/benchmarking/concorrente-*.md` ou WebSearch validada em 2026-05-01). Cifras internas do IPOG estão marcadas como `[a validar com IPOG]` porque a Brasil GEO ainda não recebeu dados de centro de custo, margem operacional histórica ou taxa de evasão. O modelo é, portanto, ferramenta de decisão executiva, não compromisso financeiro firmado — ele estabelece a moldura, mas a calibração final exige insumos do controller IPOG e do time acadêmico.

A tese de pricing é direta. O IPOG opera num espaço hoje sub-representado entre dois extremos: o EAD massivo a R$ 99-260/mês e a especialização técnica vertical a R$ 770-1.465/mês. O cluster do meio — programas online com formato Ao Vivo síncrono, corpo docente nominal, naming MBA executivo e chancela MEC tradicional de 25 anos — está sem ocupante natural após a PUC-Minas restringir Psicologia em EAD por decreto. A faixa premium acessível (R$ 600-900/mês × 18-24) é a recomendação primária deste documento. Ela permite ao IPOG (i) capturar disposição a pagar do aluno-tipo executivo sem replicar barreira de acesso do Sírio-Libanês ou do Saint Paul/EXAME, (ii) sustentar margem bruta saudável com custo operacional EAD híbrido e (iii) deixar espaço para tier premium executivo no produto âncora (Avaliação Psicológica com compliance CFP) sem canibalizar o portfólio.

---

## Bloco A — Mapa de pricing competitivo

### A.1 Tabela canônica por concorrente

A tabela abaixo consolida mensalidades e tickets totais documentados nos 10 dossiês das Ondas 1 e 2, complementados por validação WebSearch 2026-05-01. Valores em real brasileiro (BRL). Quando o concorrente não publica preço aberto, o campo aparece como `consulta` ou `[a confirmar]`.

| Concorrente | Segmento | Mensalidade (R$/mês) | Duração (meses) | Ticket total (R$) | Fonte |
|---|---|---|---|---|---|
| Estácio | EAD massivo | 119-249 (estimativa de mercado) | 6-12 | 1.428-2.988 (com 70% off declarado) | `concorrente-estacio.md` linha 56, 122 |
| Anhanguera | EAD massivo | ~800 (média Cogna; campanhas reduzem) | 12-18 | 9.600-14.400 (sem campanha) | `concorrente-anhanguera.md` linha 89, 189 |
| UNINTER | EAD massivo | 99-250 (após descontos) | 12-18 | 1.188-4.500 | `concorrente-uninter.md` linha 61 |
| UniCesumar | EAD massivo | 149-249 (estimativa, oculto sem CPF) | 12-18 | 1.788-4.482 | `concorrente-unicesumar.md` linha 50, 146 |
| PUC-Minas Virtual | Universidade tradicional + EAD | 345+ (referência 2022, datada) | 24x | 8.280+ | `concorrente-puc-minas-virtual.md` linha 102 |
| Anhembi Morumbi (UAM) | Universidade tradicional + EAD | 71,99-260,46 (com bolsa Quero Bolsa, áreas correlatas) | 12-18 | 864-4.688 | `concorrente-wpos-anhembi.md` linha 122, 213 |
| wPós/Unyleya | Plataforma EAD | "Faixa 1-5+" (opaco; cauda longa via SEO) | 6-18 | não publicado | `concorrente-wpos-anhembi.md` linha 187, 205 |
| CETCC (TCC Beck online ao vivo) | Especialista vertical | 691-915/mês | 18 | 13.591-14.511 (PIX) | `concorrente-cetcc.md` linha 74-75 |
| CETCC (TCC Beck assíncrono 360h) | Especialista vertical | 771/mês | 20 | 15.420 | `concorrente-cetcc.md` linha 73 |
| CETCC (Neuropsicologia presencial) | Especialista vertical | 858-1.030/mês | 18-24 | 14.500 (PIX) | `concorrente-cetcc.md` linha 76 |
| IBNeuro (Formação Teórica) | Especialista vertical | 1.255/mês | 25 | ~31.375 | `concorrente-ibneuro.md` linha 132 |
| IBNeuro (Formação Completa) | Especialista vertical | 1.465/mês | 25 | ~36.625 | `concorrente-ibneuro.md` linha 133 |
| Sírio-Libanês FSL/IEP (Psi Hospitalar) | Premium em saúde | "consultar" (mecânica fechada via 0800) | 12-24 | não publicado | `concorrente-sirio-libanes-iep.md` linha 41, 84 |
| Saint Paul + EXAME (MBA Liderança 100% online) | Premium executivo | 1.388/mês | 18 | 25.000 (de 30.000) | `concorrente-conexia-saint-paul.md` linha 58, 78 |
| Saint Paul (MBA presencial-blended) | Premium executivo | 2.708-3.108/mês | 24 | 65.000-75.000 | `concorrente-conexia-saint-paul.md` linha 51, 90 |
| Instituto Sedes Sapientiae (Fundamentos Psicanálise) | Especialista premium nicho | 721/mês | 10 | ~7.210 (anuidade 2025; 2026 com reajuste) | WebSearch 2026-05-01 |
| Instituto Sedes Sapientiae (Formação Psicanálise) | Especialista premium nicho | 1.603/mês | 11 | ~17.633 | WebSearch 2026-05-01 |
| INPG | Especialista executivo regional | descontos 15-50% via prova; convênio Caixa; sem cifra fixa pública | varia | não publicado | WebSearch 2026-05-01 |
| Quero Bolsa — referência geral pós EAD Psi com bolsa | Marketplace | 99,90-3.279,20 | varia | varia | WebSearch 2026-05-01 |

### A.2 Distribuição estatística por segmento

Para construir a referência de pricing, o universo foi segmentado em seis grupos. As estatísticas abaixo (mediana, Q1, Q3, mínimo, máximo) são calculadas sobre **mensalidades praticadas em pós-graduação EAD em Psicologia em 2026**, considerando apenas valores de tabela cheia (sem bolsa de marketplace) quando disponíveis. Quando o segmento tem preço opaco (Sírio-Libanês, wPós, UniCesumar com CPF-gate), foi usada a estimativa de mercado declarada no dossiê com nota explícita.

| Segmento | Mín (R$/mês) | Q1 (R$/mês) | Mediana (R$/mês) | Q3 (R$/mês) | Máx (R$/mês) | n |
|---|---|---|---|---|---|---|
| Massivos do EAD (Estácio, Anhanguera, UNINTER, UniCesumar, PUC-Minas) | 99 | 149 | 250 | 800 | 800 | 5 |
| Especialistas verticais (CETCC, IBNeuro) | 691 | 821 | 915 | 1.255 | 1.465 | 7 |
| Premium em saúde (Sírio-Libanês FSL) | consulta | consulta | consulta (estimado >1.500) | consulta | consulta | 1 |
| Plataformas EAD genéricas (wPós/Unyleya) | opaco (Faixa 1) | opaco | opaco | opaco | opaco (Faixa 5+) | 1 |
| Universidade tradicional + EAD (Anhembi Morumbi) | 71,99 | ~120 | ~165 | ~210 | 260,46 | 1 (faixa observada) |
| Premium executivo (Saint Paul + EXAME) | 1.388 | 1.388 | 1.388 | 2.708 | 3.108 | 2 |
| Especialista premium nicho (Sedes Sapientiae) | 436 | 580 | 721 | 1.162 | 1.603 | 3 |

### A.3 Mediana consolidada do mercado pós EAD em Psicologia 2026

Quando se agrupa todo o universo de pós EAD em Psicologia (excluindo apenas o premium executivo Saint Paul, que opera num cluster claramente distinto), a leitura sintética é:

- **Faixa de descoberta de preço (Q1 do mercado):** R$ 150-300/mês — território dos massivos.
- **Mediana do mercado:** ~R$ 600/mês quando se equilibra massivos (volume) com especialistas verticais (ticket).
- **Q3 (top 25%):** R$ 900-1.200/mês — território onde IBNeuro, CETCC presencial e Saint Paul online se encontram.
- **Cauda premium (>Q3):** R$ 1.388+/mês — Saint Paul/EXAME, Sírio-Libanês (estimado), Sedes Formação Psicanálise.

A leitura agregada do **Valor Econômico/Fórum Brasil Educação** (WebSearch 2026-05-01) confirma a tendência de alta: o marco regulatório do MEC para EAD pode reajustar em até 21,6% a mensalidade média do mercado, levando-a de ~R$ 348 em 2024 para ~R$ 423 em 2026 na média geral (não apenas Psicologia). Em Psicologia especificamente, a barreira regulatória do CFP e a profundidade técnica empurram a mediana acima da média geral.

### A.4 Tendência 2024-2026

A direção é **subida moderada**. Três vetores empurram para cima:

1. **Marco regulatório MEC EAD** — exige polos com infraestrutura física, mediadores pedagógicos com pós-graduação, laboratórios. Custo operacional sobe e é repassado.
2. **Saturação do leilão de preço** — Estácio, Anhanguera e UniCesumar já chegaram ao piso operacional. Não há espaço para baixar mais sem destruir margem.
3. **Profissionalização das plataformas premium online** — Saint Paul + EXAME, Conexia, FGV Online ancoraram um teto premium que valida ticket alto para quem quer subir nessa direção.

A janela de pricing de lançamento defensável para o IPOG está, portanto, entre R$ 500 e R$ 1.000/mês para 18-24 meses, segundo a posição estratégica escolhida.

---

## Bloco B — Posicionamento de pricing recomendado para o IPOG

### B.1 Cenário 1 — Premium executivo (top 25% do mercado)

**Mensalidade alvo:** R$ 1.250/mês × 24 parcelas
**Ticket total:** R$ 30.000
**Variação à vista (PIX):** R$ 27.000 (10% de desconto)

**Quem é o aluno-tipo:** profissional sênior — gerente, diretor, CHRO, psicólogo organizacional com 8+ anos de experiência, médico em transição para gestão clínica, advogado trabalhista com vocação para saúde mental corporativa. Renda mensal R$ 15.000+ ou empresa que paga via educação corporativa B2B. Decide por marca, network e signaling de C-level.

**Cluster privilegiado:** **Cluster 1 — Organizacional/Trabalho/RH**, com extensão para Avaliação Psicológica de alta complexidade (peritos forenses, consultoria sênior).

**Concorrentes acima:** Saint Paul presencial-blended (R$ 2.708-3.108/mês × 24 = R$ 65-75 mil); Sírio-Libanês presencial premium (consulta, presumido >R$ 2.000/mês). Esses são **filtros econômicos** que o IPOG não disputa.

**Concorrentes abaixo:** todo o EAD massivo, Anhembi Morumbi, todas as plataformas de bolsa.

**Concorrentes diretos no cluster:** Saint Paul + EXAME 100% online (R$ 1.388/mês × 18 = R$ 25.000) e IBNeuro Formação Completa (R$ 1.465/mês × 25 = R$ 36.625).

**Sinal de marca transmitido:** "MBA executivo com selo MEC tradicional de 25 anos, formato Ao Vivo síncrono e corpo docente nominal — alternativa premium-acessível ao Saint Paul presencial". A faixa fica logo abaixo do Saint Paul online (R$ 1.388) por design — IPOG não disputa o leilão Saint Paul x FGV; oferece a alternativa nicho-Psicologia com ancoragem MEC.

**Contraindicação:** corta o aluno classe média de RH júnior, gerente regional, psicólogo recém-formado. Esse aluno migra para EAD massivo. Cenário 1 sozinho não comporta meta de captação de 200+ matrículas/ciclo.

### B.2 Cenário 2 — Premium acessível (entre Q3 e mediana — RECOMENDAÇÃO PRIMÁRIA)

**Mensalidade alvo:** R$ 750/mês × 18 parcelas
**Ticket total:** R$ 13.500
**Variação à vista (PIX):** R$ 11.475 (15% de desconto, alinhado a CETCC e IBNeuro)

**Quem é o aluno-tipo:** profissional intermediário-sênior — psicólogo formado com 3-7 anos de prática clínica buscando especialização técnica densa; analista/coordenador de RH com formação não-Psi querendo virar gestor de pessoas com base em Psicologia; pedagogo/educador buscando ascender a coordenador pedagógico ou supervisor educacional. Renda mensal R$ 6.000-15.000. Pode pagar do próprio bolso com Pravaler (0,89-2,29% ao mês) ou parcelamento próprio do IPOG.

**Cluster privilegiado:** **TODOS OS TRÊS CLUSTERS** simultaneamente — esta é a vantagem decisiva do cenário 2. R$ 750/mês cabe no orçamento do psicólogo clínico (Cluster 2), do RH (Cluster 1) e do pedagogo (Cluster 3) sem corte por sensibilidade a preço.

**Concorrentes acima:** Saint Paul + EXAME (R$ 1.388), CETCC online ao vivo (R$ 821-915), IBNeuro (R$ 1.255-1.465), Sírio-Libanês (consulta).

**Concorrentes abaixo:** EAD massivo (R$ 99-800), Anhembi Morumbi com bolsa, wPós Faixa 1-2.

**Concorrentes diretos no cluster:** CETCC EAD assíncrono (R$ 771/mês × 20). É exatamente esse o ponto a flanquear — IPOG entrega Ao Vivo síncrono no mesmo ticket que CETCC entrega assíncrono.

**Sinal de marca transmitido:** "Pós-graduação online de qualidade premium, com mensalidade que cabe no orçamento de quem paga do próprio bolso. Não é massivo, não é elitista — é o programa para psicólogo, RH e educador que querem profundidade técnica sem virar refém de preço presencial". A mensalidade R$ 750 está logo abaixo do CETCC ao vivo (R$ 821-915) e logo acima da PUC-Minas (R$ 345 referência datada) — território defensável.

**Por que é a recomendação primária:** maximiza TAM endereçável (3 clusters em vez de 1), preserva margem bruta projetada de 50-60% (ver Bloco D), permite tier de upsell para Cenário 1 em produto âncora específico (Avaliação Psicológica com compliance CFP), e responde ao gap de mercado deixado pela PUC-Minas que restringiu Psicologia EAD por decreto.

### B.3 Cenário 3 — Médio competitivo (entre Q1 e mediana — fallback)

**Mensalidade alvo:** R$ 450/mês × 18 parcelas
**Ticket total:** R$ 8.100
**Variação à vista (PIX):** R$ 6.885 (15% de desconto)

**Quem é o aluno-tipo:** profissional iniciante-intermediário — recém-formado em Psicologia querendo primeira especialização; analista júnior de RH; professor da rede pública com salário fixo; psicólogo concursado de início de carreira. Renda mensal R$ 3.000-6.000. Pode pagar do próprio bolso ou via Educa Mais Brasil (bolsa até 70%) e Quero Bolsa (até 90%).

**Cluster privilegiado:** **Cluster 3 — Psicopedagogia/Escolar/Educação**, onde a sensibilidade a preço é maior por perfil de remuneração docente.

**Concorrentes acima:** todos os especialistas verticais, Saint Paul, Sírio-Libanês.

**Concorrentes abaixo:** Estácio com 70% off, Anhanguera "Pós em Dobro", wPós Faixa 1, Anhembi com bolsa Quero Bolsa, UniCesumar oculto.

**Concorrentes diretos no cluster:** PUC-Minas Virtual (R$ 345+ datado, possivelmente reajustado para faixa similar em 2026), Anhembi Morumbi (R$ 260 com bolsa).

**Sinal de marca transmitido:** "Pós-graduação MEC com mensalidade competitiva — ainda IPOG, ainda Ao Vivo, mas com preço que compete diretamente com EAD massivo profissional". Risco: dilui o premium e canibaliza ticket dos cenários 1 e 2 se aplicado a TODOS os produtos.

**Quando aplicar:** apenas como produto-isca ou em janelas de campanha específicas (early bird, ex-aluno IPOG, parceria corporativa). NÃO recomendado como pricing canônico do portfólio.

---

## Bloco C — Pricing tiers por cluster

A decisão final de quais produtos lançar é de Bruno Azambuja + Ronan Maia (escala em R-001). O quadro abaixo mostra a recomendação Brasil GEO assumindo o Cenário 2 como pricing canônico, com upsell premium no produto âncora.

| Produto | Cluster | Mensalidade | Duração | Ticket total | PIX (15% off) | Posicionamento |
|---|---|---|---|---|---|---|
| MBA em Psicologia Organizacional e do Trabalho | 1 | R$ 750/mês | 18x | R$ 13.500 | R$ 11.475 | Premium acessível canônico |
| MBA em Avaliação Psicológica com Compliance CFP | 2 | R$ 1.250/mês | 24x | R$ 30.000 | R$ 27.000 | **Tier premium executivo** — produto âncora |
| MBA em Neuropsicologia Aplicada | 2 | R$ 850/mês | 18x | R$ 15.300 | R$ 13.005 | Premium acessível com tier técnico |
| MBA em Psicologia Escolar e Psicopedagogia Aplicada | 3 | R$ 600/mês | 18x | R$ 10.800 | R$ 9.180 | Premium acessível com sensibilidade docente |
| MBA em Saúde Mental Corporativa e Riscos Psicossociais | 1 (extensão B2B) | R$ 1.100/mês | 18x | R$ 19.800 | R$ 16.830 | Tier B2B com cobrança via educação corporativa |

**Justificativa por produto:**

1. **Psicologia Organizacional (R$ 750):** ponto-âncora do portfólio. É o produto que o cluster 1 procura quando digita "MBA Psicologia Organizacional" em LLM. Mensalidade idêntica ao centro do Cenário 2 — sinal de marca consistente.

2. **Avaliação Psicológica com Compliance CFP (R$ 1.250):** único produto com tier premium. Justificativa: aluno é psicólogo formado, com CRP ativo, em vias de credenciamento como perito ou avaliador de alta complexidade. Disposição a pagar é maior porque o ROI é direto (laudo perito = R$ 800-3.000/sessão; SATEPSI compliance = portfolio de testes pagos a integrar). Compete diretamente com IBNeuro Formação Teórica (R$ 1.255/mês × 25). Mantém ticket equivalente em duração menor (24x vs 25x) — vantagem de fluxo de caixa.

3. **Neuropsicologia Aplicada (R$ 850):** sobe R$ 100 do âncora porque compete com CETCC ao vivo (R$ 821-915) na ponta inferior e sinaliza profundidade técnica. Compete com IBNeuro (R$ 1.255+) na ponta superior — IPOG é a alternativa premium acessível.

4. **Psicopedagogia / Psicologia Escolar (R$ 600):** desce R$ 150 do âncora reconhecendo o teto de remuneração do professor da rede pública. Ainda acima de PUC-Minas datada e Anhembi Morumbi com bolsa, mas competitivo. Sinaliza "premium acessível para educador".

5. **Saúde Mental Corporativa (R$ 1.100):** produto B2B com mecânica de cobrança via PJ contratante (departamento de RH ou C-suite paga). Ticket maior é absorvido pela conta empresarial. Compete indiretamente com Saint Paul + EXAME (R$ 1.388 cobrindo liderança genérica) — IPOG é a alternativa nicho com base em Psicologia.

**Mensalidade média ponderada** (assumindo mix 30/15/20/25/10 nos 5 produtos): **R$ 814/mês**. Ticket médio ponderado: R$ 14.652.

---

## Bloco D — Unit economics modelo

Modelo construído sobre Cenário 2 (premium acessível) com aluno-tipo de R$ 750/mês × 18 = R$ 13.500. Todos os custos em real brasileiro, salvo indicação USD para LLM.

### D.1 Receita por aluno (LTV educacional bruto)

- **Mensalidade × duração:** R$ 750 × 18 = **R$ 13.500**
- **Receita à vista (PIX, 15% off):** R$ 11.475
- **Mix esperado de pagamento (premissa Brasil GEO):** 70% parcelado, 25% PIX/à vista, 5% Pravaler intermediado.
- **Receita média ponderada por aluno:** (0,70 × 13.500) + (0,25 × 11.475) + (0,05 × 13.500 com taxa Pravaler embutida) ≈ **R$ 13.181**
- **Receita potencial de upsell** (curso de extensão pós-egresso, supervisão clínica avulsa, residência aplicada): +R$ 800-2.000/aluno/24 meses pós-formatura — `[a validar com IPOG]` — sem retenção histórica documentada.

**LTV educacional bruto recomendado para planejamento:** **R$ 13.000/aluno** (conservador, ignora upsell).

### D.2 Custo de aquisição estimado por canal (CAC)

#### D.2.1 Canal orgânico LLM (objetivo central do programa GEO)

- **Custo de mídia em LLM:** R$ 0 (gratuito por definição).
- **Custo de produção HBR-grade por peça editorial:** USD 0,70 em LLM (FINOPS-DISCIPLINA.md linha 46) + tempo de revisor humano (Brasil GEO).
- **Custo de Schema, llms.txt e infraestrutura técnica:** custo fixo de programa, amortizado sobre todas as matrículas.
- **CAC marginal por matrícula via canal LLM (estimativa):** R$ 80-200 — **`[a validar com GA4 + KPI 7]` (R-009)**.
- **Premissa para meta:** se KPI 7 (Conversion Lift) materializar em ≥1,3 com Perplexity e ChatGPT, este canal entrega o CAC mais baixo do mix.

#### D.2.2 Canal orgânico Google (SEO técnico)

- **Custo de mídia:** R$ 0.
- **Custo de produção de conteúdo + Schema técnico:** compartilhado com canal LLM (mesma peça serve ambos).
- **CAC marginal estimado:** R$ 100-250.
- **Limitação:** janela de absorção paramétrica é de meses; primeira leitura mensurável só em 2027.1.

#### D.2.3 Canal Quero Bolsa / Educa Mais Brasil (marketplace de bolsa)

- **Comissão típica do marketplace:** 10-30% sobre a primeira mensalidade ou take-rate sobre o ticket. **Validação WebSearch 2026-05-01:** Quero Bolsa opera em modelo de bolsa com desconto de até 90%; Educa Mais Brasil até 70% em pós EAD. A instituição paga comissão sobre matrículas convertidas — valor exato negociado caso a caso.
- **Estimativa de CAC neste canal:** 20% sobre primeira mensalidade R$ 750 = R$ 150 + cupom de bolsa de 30-50% nas primeiras 3 mensalidades = R$ 675-1.125 de subsídio inicial.
- **CAC efetivo estimado:** **R$ 800-1.200 por aluno**.
- **Risco de erosão de margem:** alto. PUC-Minas opera "sem bolsas Quero Bolsa" para preservar premium; CETCC e IBNeuro também. **Recomendação:** entrar nos marketplaces apenas com produto Cluster 3 (Psicopedagogia, R$ 600), preservando o premium dos outros 4 produtos.

#### D.2.4 Canal Meta/LinkedIn Ads (paid acquisition)

- **CPC típico em pós-graduação Psicologia 2026 (estimativa de mercado):** R$ 4-12 em Meta; R$ 18-40 em LinkedIn Premium para C-suite.
- **Taxa de conversão visitante → lead:** 2-5%.
- **Taxa de conversão lead → matrícula:** 3-8% (educação executiva).
- **CAC estimado Meta:** R$ 4-12 / 0,03 / 0,05 = **R$ 2.667-8.000 por matrícula**. **Inviável para Cenário 2**.
- **CAC estimado LinkedIn (Cenário 1, MBA Avaliação CFP a R$ 1.250):** R$ 18-40 / 0,02 / 0,04 = **R$ 22.500-50.000 por matrícula**. **Inviável.**
- **Conclusão:** mídia paga não é canal primário. Pode operar como **retargeting** sobre tráfego LLM/Google para reduzir CAC marginal a R$ 400-800.

#### D.2.5 Parcerias B2B saúde mental corporativa

- **Modelo:** contrato com PJ (Bradesco Seguros, hospitais privados, redes de RH consultoria). Empresa paga ticket cheio ou subsidiado para 5-30 funcionários.
- **CAC neste canal:** custo de BD (tempo de Bruno Azambuja + comissão de SDR) + tempo de fechamento (3-6 meses). Estimativa R$ 1.500-3.000 por matrícula em primeiro contrato; R$ 200-500 nas matrículas subsequentes do mesmo contrato.
- **Margem bruta no canal:** maior do que canais B2C porque não há desconto Pravaler nem comissão marketplace.

#### D.2.6 Mix-alvo de canais (premissa Brasil GEO)

| Canal | % do funil 2026.2 | CAC médio estimado | Receita média ponderada |
|---|---|---|---|
| Orgânico LLM (KPI 1, KPI 7) | 25% | R$ 150 | R$ 13.181 |
| Orgânico Google (SEO técnico) | 20% | R$ 200 | R$ 13.181 |
| Quero Bolsa / Educa Mais Brasil | 20% (apenas Cluster 3) | R$ 1.000 | R$ 9.000 (com bolsa) |
| Meta/LinkedIn Ads (retargeting) | 15% | R$ 600 | R$ 13.181 |
| Parcerias B2B saúde mental | 10% | R$ 1.500 (primeiro) | R$ 13.181 |
| Advocacy/indicação ex-aluno IPOG | 10% | R$ 250 (programa de indicação) | R$ 13.181 |
| **CAC médio ponderado** | **100%** | **~R$ 540** | **~R$ 12.348** |

### D.3 Margem bruta esperada

Custo direto por aluno em Cenário 2 (R$ 750 × 18 = R$ 13.500 receita bruta):

| Componente de custo | R$/aluno | % da receita | Fonte |
|---|---|---|---|
| Docente Ao Vivo (carga horária 360h, prorata por aluno turma 50) | 1.800 | 13% | `[a validar com IPOG]` |
| Plataforma LMS (Moodle/Sambatech/equivalente, prorata) | 240 | 2% | `[a validar com IPOG]` |
| Operação acadêmica (coordenador, secretaria, suporte aluno) | 1.350 | 10% | `[a validar com IPOG]` |
| Material didático (apostilas, vídeos, supervisão) | 540 | 4% | `[a validar com IPOG]` |
| CAC médio ponderado (D.2.6) | 540 | 4% | Estimativa Brasil GEO |
| Schema, llms.txt, NAIA, Brasil GEO retainer (prorata sobre 200 alunos/ciclo) | 270 | 2% | `[a validar com IPOG]` |
| Impostos sobre serviço educacional (estimativa, ~6% para EaD) | 810 | 6% | `[a validar com IPOG]` |
| **Custo direto total estimado** | **5.550** | **41%** | — |
| **Margem bruta estimada** | **7.950** | **59%** | — |

Margem bruta projetada de ~59% é compatível com benchmarks de pós-graduação EAD privada nacional (Yduqs/Cogna operam em 50-65% bruta). **Calibração final exige validação com IPOG dos 6 itens marcados `[a validar]`.**

### D.4 LTV/CAC alvo

- **LTV/CAC médio ponderado:** R$ 13.181 / R$ 540 = **24,4x**.
- **Benchmark de educação executiva saudável:** 3-5x. Programa GEO bem-sucedido pode operar em 8-15x.
- **Leitura:** o número 24x é **excessivamente otimista** porque assume que o canal LLM materializa 25% do funil. Se KPI 7 não materializar (R-009), o mix se desloca para Quero Bolsa + Meta + B2B, e o LTV/CAC cai para 5-8x — ainda saudável.
- **Alvo prudente para 2026.2:** **LTV/CAC ≥ 6x**. Alvo aspiracional para 2027.1 com KPI 7 ≥ 1,3 materializado: **LTV/CAC ≥ 12x**.

---

## Bloco E — Projeção de captação

### E.1 Premissa de mercado endereçável

A captação anual de pós-graduação EAD em Psicologia no Brasil é da ordem de 80.000-120.000 matrículas/ano (`[a validar via INEP / Sinopse Estatística]`). O IPOG hoje captura uma fração mínima desse volume. A meta GEO é capturar 0,3-0,7% do mercado endereçável anual no primeiro ciclo completo (Fase 4).

### E.2 Captação 2026.2 (15-jun a 31-jul)

**Premissa de funil:**
- Tráfego LLM-originado: 4.000-8.000 sessões qualificadas no período (KPI 7 materializando parcialmente).
- Tráfego orgânico Google: 6.000-12.000 sessões (SEO técnico em ramp-up).
- Leads marketplace: 800-1.500 (Quero Bolsa Cluster 3 apenas).
- Pipeline B2B: 3-8 contratos em negociação.

| Cenário | Cluster 1 (Org/RH) | Cluster 2 (Clínica/Neuro) | Cluster 3 (Educação) | B2B saúde mental | **Total 2026.2** |
|---|---|---|---|---|---|
| Pessimista | 30 | 40 | 25 | 5 (1 contrato) | **100** |
| Esperado | 60 | 80 | 50 | 20 (3 contratos) | **210** |
| Otimista | 100 | 130 | 80 | 50 (6 contratos) | **360** |

### E.3 Captação 2027.1 (01-dez-2026 a 15-fev-2027)

Premissa: KPI 1 (Mention Rate) e KPI 7 (Conversion Lift) materializaram parcialmente; programa GEO gera reforço cumulativo.

| Cenário | Cluster 1 | Cluster 2 | Cluster 3 | B2B | **Total 2027.1** |
|---|---|---|---|---|---|
| Pessimista | 50 | 65 | 40 | 15 | **170** |
| Esperado | 110 | 140 | 90 | 50 | **390** |
| Otimista | 180 | 230 | 150 | 100 | **660** |

### E.4 Mix de canais previsto (Cenário Esperado 2026.2)

| Canal | % matrículas esperadas | Receita bruta estimada (R$) |
|---|---|---|
| Orgânico LLM | 25% (53 alunos) | 698.593 |
| Orgânico Google | 20% (42 alunos) | 553.602 |
| Quero Bolsa / EMB | 20% (42 alunos) | 378.000 (com bolsa média) |
| Meta/LinkedIn retargeting | 15% (32 alunos) | 421.792 |
| B2B saúde mental | 10% (21 alunos) | 276.801 |
| Advocacy/indicação | 10% (21 alunos) | 276.801 |
| **Total esperado 2026.2** | **210 alunos** | **R$ 2,6 milhões** |

### E.5 Ponto de equilíbrio

**Custo da Fase 1 + Fase 2 do programa GEO IPOG (estimativa Brasil GEO):**
- Retainer Brasil GEO + sub-agents Opus + APIs LLM (24 sprints × USD 50 = USD 1.200): **R$ 7.200**
- Investimento em produção editorial HBR (60-100 peças × custo blended): **R$ 60.000-100.000** `[a validar com IPOG]`
- Auditoria NAIA + ajustes técnicos Schema + llms.txt: **R$ 30.000-50.000** `[a validar com IPOG]`
- Total Fase 1+2 (12 meses): **~R$ 100.000-160.000**

**Receita marginal por matrícula (margem bruta R$ 7.950):**
- Ponto de equilíbrio = R$ 130.000 / R$ 7.950 ≈ **17 matrículas marginais atribuíveis ao programa GEO**

**Leitura:** se o programa GEO entregar **17 matrículas adicionais** no ciclo 2026.2 que não viriam por outros canais, ele se paga. O cenário esperado prevê 210 matrículas; mesmo se apenas 25% delas (53) forem atribuíveis ao GEO via KPI 7, o ROI do programa é >3x. **Esse é o ponto de equilíbrio operacional defensável**.

---

## Bloco F — Riscos financeiros e mitigação

### F.1 Risco 1 — Pricing acima da disposição a pagar do cluster (`SoV cai`)

**Descrição:** R$ 750/mês pode estar acima do teto de aluno do Cluster 3 (Psicopedagogia/Educação) onde a sensibilidade a preço é alta.
**Probabilidade:** Média · **Impacto:** Médio
**Sinal precoce:** SoV (KPI 2) cai no cluster Psicopedagogia mesmo com Mention Rate (KPI 1) crescendo.
**Mitigação:** produto Cluster 3 sai com mensalidade R$ 600 (fallback Cenário 3) e entra em Quero Bolsa com bolsa de até 50% — preserva premium dos outros 4 produtos.
**Owner:** Bruno Azambuja (decisão de preço por produto).

### F.2 Risco 2 — Pricing abaixo do que sustenta unit economics (`margem corroída`)

**Descrição:** se o IPOG reagir a pressão competitiva descendo o ticket sem cortar custo correspondente, margem bruta cai abaixo de 40% e o programa não se paga.
**Probabilidade:** Média · **Impacto:** Alto
**Sinal precoce:** mix de pagamento desloca para Pravaler+marketplace acima de 40% do funil; CAC sobe acima de R$ 800.
**Mitigação:** estabelecer **piso de margem bruta = 45%** como gate de aprovação para qualquer campanha de desconto. Disciplina FINOPS aplicada a marketing.
**Owner:** Alexandre Caramaschi (Brasil GEO) + controller IPOG.

### F.3 Risco 3 — Captação 2026.2 abaixo do esperado por atraso de produto (R-001)

**Descrição:** se a decisão de naming MBA + lançamento de produto não fechar até 15-05-2026, Schema não publica, conteúdo HBR não engata e a janela 2026.2 perde-se em parte.
**Probabilidade:** Alta · **Impacto:** Crítico (`risk-register.md` R-001 em escalada)
**Sinal precoce:** issue #4 sem resolução em 15-05-2026.
**Mitigação:** lançar **1 produto âncora** (MBA em Psicologia Organizacional ou MBA em Avaliação Psicológica) no formato premium acessível (R$ 750-1.250) mesmo que o portfólio completo escorregue para 2027.1.
**Owner:** Ronan Maia / Bruno Azambuja (decisão); Alexandre Caramaschi (escalonamento).

### F.4 Risco 4 — Saint Paul/EXAME estabilizar arquitetura web (R-011)

**Descrição:** Saint Paul + EXAME tem janela técnica aberta hoje (Schema parcial, llms.txt ausente). Se fecharem, o cluster premium executivo perde diferencial GEO.
**Probabilidade:** Média · **Impacto:** Alto
**Sinal precoce:** auditoria mensal Schema/llms.txt detecta deploy.
**Mitigação:** acelerar lançamento do **MBA em Avaliação Psicológica com Compliance CFP (Cenário 1, R$ 1.250)** antes de 2026.2 para capturar share-of-voice premium executivo Psi enquanto Saint Paul ainda está fora do nicho.
**Owner:** Brasil GEO.

### F.5 Risco 5 — Conversion Lift via LLM não materializar (R-009)

**Descrição:** se GA4 não capturar referrer LLM corretamente, KPI 7 fica `[a calibrar]` e o programa GEO não consegue provar valor para o board IPOG. Mix de canais migra para Meta/LinkedIn pago, CAC dispara, LTV/CAC cai abaixo de 5x.
**Probabilidade:** Média · **Impacto:** Crítico
**Sinal precoce:** GA4 não classifica sessões como LLM-originated em 30-05-2026.
**Mitigação:** UTM dedicado em PR e nas peças HBR; Measurement Protocol server-side; calibração via teste A/B antes do pico 2026.2.
**Owner:** Bruno Azambuja (instrumentação GA4) + Brasil GEO (UTM canônico).

---

## Bloco G — Recomendação primária da Brasil GEO

A Brasil GEO recomenda **lançamento do portfólio MBA Online de Psicologia em três produtos prioritários para 2026.2** com mensalidade canônica de **R$ 750/mês × 18 = R$ 13.500** (Cenário 2, premium acessível) para Psicologia Organizacional e Psicopedagogia (este último em R$ 600 como ajuste Cluster 3), **mais um produto âncora premium executivo a R$ 1.250/mês × 24 = R$ 30.000** (MBA em Avaliação Psicológica com Compliance CFP). A recomendação sustenta margem bruta projetada de 50-59%, captura disposição a pagar dos três clusters simultaneamente sem corte por sensibilidade a preço, posiciona o IPOG no espaço sub-representado entre EAD massivo e premium executivo Saint Paul, e permite ROI do programa GEO em ≤17 matrículas marginais — meta defensável já no primeiro ciclo. O LTV/CAC alvo prudente de 6x sobe para 12x se KPI 7 (Conversion Lift) materializar com Perplexity e ChatGPT, o que é o objetivo central da Fase 1+2.

---

## Fontes consultadas

### Dossiês internos do programa
- `audits/benchmarking/concorrente-estacio.md` — preços e mecânica EAD massivo Yduqs.
- `audits/benchmarking/concorrente-anhanguera.md` — mensalidade média Cogna ~R$ 800, Voomp Creators.
- `audits/benchmarking/concorrente-uninter.md` — calculadora dinâmica, faixa R$ 99-250.
- `audits/benchmarking/concorrente-unicesumar.md` — preço oculto via CPF, faixa estimada R$ 149-249.
- `audits/benchmarking/concorrente-puc-minas-virtual.md` — referência R$ 345+ datada 2022, premium acadêmico.
- `audits/benchmarking/concorrente-cetcc.md` — mensalidades R$ 691-1.030, tickets R$ 13.591-15.420.
- `audits/benchmarking/concorrente-ibneuro.md` — mensalidades R$ 1.255-1.465, tickets R$ 31.375-36.625, recusa naming MBA.
- `audits/benchmarking/concorrente-sirio-libanes-iep.md` — mecânica fechada "consultar".
- `audits/benchmarking/concorrente-wpos-anhembi.md` — Faixa 1-5+, Anhembi com bolsa R$ 71,99-260,46.
- `audits/benchmarking/concorrente-conexia-saint-paul.md` — Saint Paul + EXAME R$ 1.388-3.108/mês.
- `audits/benchmarking/pontos-fortes-a-superar.md` — matriz comparativa por dimensão estratégica.
- `audits/benchmarking/SINTESE-EXECUTIVA.md` — quadrante premium online Psi sem ocupante após PUC-Minas.
- `dashboards/FINOPS-DISCIPLINA.md` — disciplina financeira do programa, tabela de preços LLM, custo médio peça USD 0,70.
- `dashboards/METRICAS-CANONICAS.md` — KPI 1 (Mention Rate), KPI 2 (SoV), KPI 7 (Conversion Lift) e targets de Fase 4.
- `docs/02-contexto-mba-online-psicologia.md` — contexto estratégico, três clusters e janela 12-24 meses.
- `docs/05-risk-register.md` — R-001 (decisão de produto), R-009 (UTM/GA4), R-011 (Saint Paul fecha janela técnica).

### Validações WebSearch 2026-05-01
- [Quero Bolsa — bolsas pós-graduação EAD Psi 2026 — R$ 99,90 a R$ 3.279,20](https://querobolsa.com.br/cursos-e-faculdades/psicologia/bolsas)
- [Educa Mais Brasil — bolsas pós-graduação EAD até 70%](https://educamaisbrasil.blog.br/pos-graduacao-educa-mais-brasil-bolsas/)
- [Pravaler — financiamento estudantil pós-graduação lato sensu, juros 0,89%-2,29% ao mês](https://www.pravaler.com.br/blog/financiamento-estudantil/financiamento-estudantil-para-pos-graduacao/)
- [Instituto Sedes Sapientiae — preços 2026 (anuidade 2025 sujeita a reajuste)](https://sedes.org.br/site/informacoes-para-inscricoes-em-especializacao-e-aperfeicoamento/)
- [INPG — descontos via prova 15-50%, convênio Caixa, valores não públicos](https://www.inpg.edu.br/)
- [Valor Econômico via Fórum Brasil Educação — mensalidade EAD pode subir 21,6% para R$ 349 com novas regras MEC](https://forumbrasileducacao.org.br/noticias/item/valor-economico-mensalidade-do-curso-ead-aumenta-216-com-novas-regras)
- [Semesp — tendência geral de mensalidades 2024](https://www.semesp.org.br/mais-pesquisas/2024/03/25/pesquisa-aponta-crescimento-de-alunos-no-presencial-e-queda-no-valor-das-mensalidades/)
- [CRM Educacional — fórmula CAC educação](https://crmeducacional.com/custo-de-aquisicao-de-aluno)
- [Faculdade Ipemig — referência mensalidade pós-graduação a partir de R$ 150](https://fipemig.edu.br/quanto-custa-uma-pos-graduacao-no-brasil/)

### Reunião de campo Brasil GEO — Alexandre Caramaschi
- Estimativas de CAC por canal e mix-alvo (D.2.6) — premissa Brasil GEO calibrável após primeira leitura GA4 da Fase 1.
- Margem bruta estimada de 59% — calibração necessária com controller IPOG.

---

> **Próximos passos operacionais:**
> 1. Validar com IPOG os 6 itens `[a validar]` em D.3 (custos diretos por aluno, prorata docente, plataforma, secretaria, material, impostos).
> 2. Confirmar disposição da diretoria IPOG para o pricing canônico R$ 750/mês × 18 (Cenário 2) — gate da Fase 0.
> 3. Decidir naming MBA + 3-5 produtos prioritários (R-001) até 15-05-2026.
> 4. Calibrar KPI 7 GA4 (R-009) antes de 30-05-2026 para que o pico 2026.2 (15-jun a 31-jul) tenha leitura de Conversion Lift.
> 5. Recalibrar este modelo após primeira semana de coleta cross-LLM e primeira leitura GA4 mensal.
