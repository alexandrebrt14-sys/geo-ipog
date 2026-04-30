# Padrão editorial — adaptação HBR/HSM/MIT Sloan para o programa GEO IPOG

> **Status:** vigente desde 2026-04-30
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-04-30

Este documento define a estrutura obrigatória, padrões tipográficos e regras de citação para peças editoriais públicas do programa GEO IPOG (Brasil GEO + IPOG, vertical MBA Online de Psicologia). O padrão é adaptado de Harvard Business Review, HSM Management e MIT Sloan Management Review, com ajustes para o contexto educação superior + Psicologia regulamentada.

Ver também:
- `content/BLOOM-KNOWLES.md` para verbos cognitivos e princípios andragógicos.
- `content/VOICE-GUIDE.md` para Voice Guard ponderado.
- `content/GLOSSARIO-PSICOLOGIA.md` para terminologia canônica.
- `content/CHECKLIST-AUTOAVALIACAO.md` para autoavaliação antes de submeter.

## Princípios editoriais inegociáveis

1. **Tese contraintuitiva primeiro.** A peça abre com um deslocamento de crença comum, ancorado em dado.
2. **Evidência sempre.** Toda afirmação não trivial é apoiada por fonte (autor, ano).
3. **Mecanismo explícito.** Por que funciona ou não funciona é parte do texto, não pressuposto.
4. **Decisão profissional.** A peça encerra apontando o que o leitor decide a partir do que leu.
5. **Próximo passo.** Toda peça aponta um movimento concreto ou cross-link contextualizado.

## Os 6 elementos obrigatórios em peça longa (artigo HBR-grade)

A peça longa do programa GEO IPOG (1500-4000 palavras) precisa conter os seis elementos abaixo, na ordem indicada.

### 1. Abertura com impacto (250-350 palavras)

- Dado surpreendente com fonte explícita (autor, ano).
- Problema central nomeado em até três frases.
- Tese contraintuitiva apresentada em parágrafo dedicado.
- Objetivos da peça com verbos Bloom 3+ (ver `content/BLOOM-KNOWLES.md`).
- Ausência absoluta de rhetoric openers (ver `content/CLICHES-PROIBIDOS.md`).

### 2. Fundamentação conceitual (800-1200 palavras)

- Teoria → aplicação. Conceitos definidos só quando necessários para sustentar análise; nunca como abertura.
- Toda afirmação importante com citação no formato (Autor, Ano).
- Conceitos-chave em blockquote (`>`) para destaque visual.
- Armadilhas comuns em **negrito** na primeira ocorrência.
- Mínimo de uma comparação tabular ou quadro estruturado.

### 3. Análise de caso ou demonstração (400-600 palavras)

Estrutura padrão:

- **Contexto** — quem, quando, escala.
- **Desafio** — o problema enfrentado.
- **Abordagem** — o que foi feito e por quê.
- **Resultado** — números, mesmo aproximados (com marcador "[a confirmar]" quando dado pendente).
- **Lições** — generalização honesta, sem hype.

Casos podem ser reais (com autorização) ou compostos (sinalizados como "caso composto baseado em padrão recorrente").

### 4. Quadro comparativo obrigatório

- Mínimo uma tabela markdown por peça.
- Cabeçalho informativo. Linhas com paralelismo estrutural.
- Em peça sobre regulamentação (CFP, MEC, SATEPSI), tabela compara cenários ou regras.
- Em peça sobre carreira, tabela compara perfis ou abordagens.

### 5. Exercícios práticos (mínimo 3, progressão Bloom)

Cada exercício segue o template canônico em `content/EXERCICIO-TEMPLATE.md`:

- Título descritivo.
- Nível Bloom declarado (3+).
- Contexto profissional real com dados.
- Enunciado com dados suficientes para resolução.
- Critérios de excelência (excelente, adequada, insuficiente).
- Dica estratégica.

A progressão típica em peça longa é: Aplicação (3) → Análise (4) → Avaliação (5) ou Criação (6).

### 6. Síntese executiva (200-250 palavras)

- Pontos-chave em lista (3-7 itens).
- Checklist de aplicação imediata (ações que o leitor executa nas próximas 24-72 horas).
- Ponte para próxima peça do hub IPOG (cross-link com âncora descritiva).

## Diferenciação por tipo de peça

| Elemento | Artigo HBR-grade longo (1500-4000 palavras) | Peça pilar do hub (3000-6000 palavras) | FAQ (200-600 palavras por pergunta) | Checklist (300-800 palavras) |
|---|---|---|---|---|
| Abertura com impacto | Obrigatória, 250-350 palavras | Obrigatória, 350-500 palavras | Pergunta + 2-3 frases de contexto | Parágrafo de 80-150 palavras com problema |
| Fundamentação conceitual | Obrigatória, 800-1200 palavras | Obrigatória, 1200-2000 palavras | 1-2 parágrafos densos com 1-2 fontes | Resumo conceitual em até 200 palavras |
| Análise de caso | Obrigatória | Obrigatória, mínimo 2 casos | Mini-caso opcional | Não obrigatório |
| Quadro comparativo | Obrigatório, mínimo 1 tabela | Obrigatório, mínimo 2 tabelas | Tabela quando comparar opções | Obrigatório (a tabela é a peça) |
| Exercícios práticos | Mínimo 3 | Mínimo 5, progressão Bloom 3-6 | 1 mini-exercício opcional | Exercício embutido no checklist |
| Síntese executiva | Obrigatória | Obrigatória + roadmap de leitura | Próximo passo em 1-2 frases | Resumo final + cross-link |
| Schema.org | Article + Person + EducationalOrganization | Article + Person + EducationalOrganization + ItemList | FAQPage + Question + Answer | HowTo + Step |
| Exemplo | "ROI do MBA Online de Psicologia para profissionais de RH em empresas de médio porte" | "Guia executivo: especialização em Psicologia para profissionais de carreira corporativa" | "O MBA Online de Psicologia é reconhecido pelo MEC?" (resposta canônica) | "Checklist de elegibilidade para o MBA Online de Psicologia" |

## Padrão de citação

Formato obrigatório no corpo: `(Autor, Ano)` ou `Autor (Ano)` quando o autor está integrado à frase.

Exemplos aceitos:

- "Segundo McKinsey Global Institute (2025), [achado]."
- "Pesquisa do Conselho Federal de Psicologia (2024) mostra que [dado]."
- "[Afirmação] (Autor, Ano)."

Exemplos inaceitos:

- "Estudos mostram que..." (sem fonte).
- "Empresas estão investindo mais em..." (sem fonte ou ano).
- "Pesquisas recentes apontam..." (sem nominação).

Quando a peça depende de fonte ainda não confirmada, usar marcador explícito `[a confirmar com fonte X]` durante o draft. Marcadores não podem chegar à publicação; são bloqueados pelo checklist.

Ao final da peça, **referências completas** em seção dedicada quando há mais de cinco citações no corpo. Formato:

> Autor, A. (Ano). *Título da obra ou artigo*. Veículo, vol(num), pp-pp.

## Padrão de tabela

- Cabeçalho com no máximo cinco colunas para legibilidade mobile.
- Linhas com no máximo duas frases curtas por célula.
- Negrito apenas no cabeçalho. Negrito em célula só para sinalizar anti-padrão ou risco.
- Toda tabela deve ter título implícito no parágrafo imediatamente anterior.

## Padrão de blockquote

Use `>` para:

1. Definir conceito-chave em frase única e marcante.
2. Destacar afirmação contraintuitiva.
3. Marcar anti-padrão (com rótulo explícito "Anti-padrão:" no início).

Não use blockquote para citações longas de autores externos; nesse caso, prefira parágrafo regular com `(Autor, Ano)` e referência ao final.

## Padrão de assinatura

Toda peça pública é assinada por humano. Duas configurações:

| Cenário | Autor nominal | Credencial Schema Person |
|---|---|---|
| Peça do programa GEO IPOG assinada por Brasil GEO | Alexandre Caramaschi | "CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil" |
| Peça assinada por corpo docente IPOG | Nome do professor com titulação máxima | Cargo institucional + IPOG + área de especialização (validar com Bruno Azambuja) |
| Peça co-assinada | Brasil GEO + IPOG, ambos com credencial | Schema Person para os dois autores |

## Hierarquia tipográfica

- H1 — apenas o título da peça.
- H2 — seções principais (abertura, fundamentação, caso, exercícios, síntese).
- H3 — subseções dentro de H2.
- H4 — apenas quando estritamente necessário para tabelas ou exercícios numerados.
- Sem pulos de hierarquia (proibido H2 → H4).

Parágrafos com no máximo cinco linhas em desktop. Frases longas quebradas em listas quando possível.

## Auto-checagem antes de submeter

Use `content/CHECKLIST-AUTOAVALIACAO.md` (14 itens). Submissão sem checklist preenchido é devolvida.

