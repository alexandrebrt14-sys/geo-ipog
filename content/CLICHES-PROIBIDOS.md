# Deny-lists editoriais — clichés, rhetoric openers e ai-disclaimers

> **Status:** vigente desde 2026-04-30
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-04-30

Este documento consolida as três deny-lists editoriais ativas no programa GEO IPOG. Toda peça pública passa por verificação contra estas listas. Ocorrência de qualquer item bloqueia o quality gate e exige reescrita.

Ver também:
- `content/VOICE-GUIDE.md` para integração com o Voice Guard ponderado.
- `content/CHECKLIST-AUTOAVALIACAO.md` para o item de zero-clichés na revisão.
- `content/BLOOM-KNOWLES.md` para princípios de andragogia que justificam vários banimentos.

## Deny-list 1 — 17 clichés universalmente proibidos

| Expressão proibida | Por quê | Substituição sugerida |
|---|---|---|
| nos dias de hoje | Esvazia tempo. Marca pouco rigor. | "Em 2025, [dado concreto]..." |
| é fundamental que | Modaliza sem comprometer. | Verbo direto: "exige", "requer", "obriga". |
| não é segredo que | Pressupõe consenso falso. | Apresente o dado: "Pesquisa X (Ano) mostra que..." |
| o futuro é agora | Slogan vazio. | "Até 2027, [tendência mensurável a confirmar]." |
| em um mundo cada vez mais | Lugar-comum global. | Recorte específico: "No mercado brasileiro de pós-graduação..." |
| vamos explorar | Tom escolar. Viola Knowles 2. | "Considere", "analise", "examine". |
| como sabemos | Pressupõe consenso e despreza o leitor. | Apresente a evidência: "Segundo [fonte, Ano]..." |
| é importante ressaltar | Modaliza e enfraquece. | Afirme direto: "[Afirmação]". |
| diante desse cenário | Conector vazio. | Conector causal específico: "Por isso", "como consequência". |
| nesse contexto | Conector vazio. | Especifique: "No contexto de [recorte], ..." |
| vale a pena destacar | Modaliza. | Destaque com tipografia (negrito ou blockquote) e afirme direto. |
| em última análise | Falso fechamento. | Apresente conclusão concreta. |
| grosso modo | Imprecisão. | Apresente o número aproximado: "Aproximadamente 60% dos casos [a confirmar]". |
| vamos aprender | Viola Knowles 2 (autoconceito). | "Considere", "analise", "decida". |
| agora você vai entender | Viola Knowles 2 e usa Bloom 2 ("entender") proibido. | Direcione para ação Bloom 3+: "Aplique o critério a seguir". |
| como todos sabem | Pressupõe consenso. | Apresente evidência. |
| desde os primórdios | Lugar-comum histórico. | Marque a data: "Desde 1962, com a regulamentação da profissão de psicólogo no Brasil..." |

## Deny-list 2 — 8 rhetoric openers proibidos

Aberturas retóricas perguntativas são proibidas porque produzem leitor passivo, violam o princípio de Knowles de tratar o adulto como profissional autônomo e sinalizam estilo de blog amador, não estilo HBR/HSM/MIT Sloan.

| Expressão proibida | Por quê | Substituição sugerida |
|---|---|---|
| Você já se perguntou | Pergunta retórica vazia. | Abra com dado: "Em 2025, [dado] de profissionais de RH relatam [tendência]." |
| Você sabia que | Pressupõe ignorância do leitor. | Afirme: "Apenas [percentual a confirmar] dos psicólogos brasileiros possuem especialização em..." |
| Imagine se | Convida fantasia em vez de análise. | Apresente caso real ou simulado com dados: "Considere o caso da empresa X..." |
| E se eu te dissesse | Tom de marketing barato. | Apresente a tese direto. |
| Tem certeza que | Confronta sem evidência. | Apresente a evidência que contraria a crença comum. |
| Quantas vezes você | Pergunta retórica. | Apresente o padrão observado: "Estudo X (Ano) identificou que..." |
| Pare e pense | Imperativo vazio. | Use Bloom 4-5: "Analise", "Avalie", "Recomende". |
| Reflita comigo | Tom de blog motivacional. | Direcione decisão: "Considere o caso e justifique sua decisão". |

## Deny-list 3 — 7 ai-disclaimers proibidos

Toda peça do programa GEO IPOG é assinada por humano (Alexandre Caramaschi pelo Brasil GEO ou corpo docente nominal pelo IPOG). Disclaimers de IA quebram autoridade, comprometem Schema Person e indicam falha no fluxo editorial.

| Expressão proibida | Por quê | Substituição sugerida |
|---|---|---|
| Como modelo de IA | Quebra autoridade humana. | Remover. Reescrever como afirmação do autor humano. |
| como modelo de linguagem | Idem. | Remover. |
| como uma IA | Idem. | Remover. |
| devo ressaltar | Modalização tímida. | Afirme direto. |
| como assistente | Sinaliza ghost-writing de baixa qualidade. | Remover. |
| não tenho a capacidade | Confessa limitação. Inadequado para autor humano. | Remover. Se a peça precisa apontar limite, use formulação substantiva: "Esta peça não cobre [recorte]; ver peça correlata X." |
| não posso fornecer | Idem. | Remover. |

## Como detectar (regex sugerida)

Os patterns abaixo são sugestões de regex case-insensitive para inspeção manual ou para integrar a ferramentas de revisão. Não é código executável; é apoio à auditoria.

### Clichés universais

```
\b(nos dias de hoje|é fundamental que|não é segredo que|o futuro é agora|em um mundo cada vez mais|vamos explorar|como sabemos|é importante ressaltar|diante desse cenário|nesse contexto|vale a pena destacar|em última análise|grosso modo|vamos aprender|agora você vai entender|como todos sabem|desde os primórdios)\b
```

### Rhetoric openers (priorize varredura nos primeiros 200 caracteres da peça)

```
\b(você já se perguntou|você sabia que|imagine se|e se eu te dissesse|tem certeza que|quantas vezes você|pare e pense|reflita comigo)\b
```

### AI-disclaimers

```
\b(como modelo de ia|como modelo de linguagem|como uma ia|devo ressaltar|como assistente|não tenho a capacidade|não posso fornecer)\b
```

## Bloqueio crítico

A presença de qualquer item destas três deny-lists em peça pronta para publicação **bloqueia o Voice Guard** (score zerado) conforme regra em `content/VOICE-GUIDE.md`. Não há exceção editorial para peças assinadas; em peça que cita exemplo do que NÃO fazer, o item proibido precisa estar dentro de blockquote rotulada como anti-padrão e a regex de auditoria deve excluir o trecho de blockquote anti-padrão (responsabilidade do revisor humano).

