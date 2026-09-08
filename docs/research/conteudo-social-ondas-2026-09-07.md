# Dossiê de pesquisa — cinco ondas complementares do menu Conteúdo e Social

**Data:** 07/09/2026. **Escopo:** ampliação do menu `/conteudo-social/` do portal
`posgraduacaopsicologia.com`. **Branch:** `feat/conteudo-social-5waves-20260907`.

Este arquivo é a camada bruta e imutável da rodada, no sentido do fluxo padrão de
onda descrito no `CLAUDE.md` do repositório. Ele registra de onde veio cada
informação, quem a produziu, o que foi conferido em fonte primária e o que
permanece em aberto. As páginas publicadas citam a fonte original, nunca este
arquivo.

## 1. Orquestração multi-LLM

A rodada foi produzida com cinco provedores distintos, cada um no papel em que a
sua vantagem é real, conforme a doutrina de roteamento da casa.

| Papel | Provedor e modelo | Por que este e não outro | Estado |
|---|---|---|---|
| Levantamento com citação viva | Perplexity `sonar-pro` | busca web com URL e data por afirmação | seis dossiês entregues |
| Contrato de canal e política de plataforma | OpenAI `gpt-5.5` pelo Codex CLI | busca oficial em documentação de plataforma | entregue com URLs oficiais |
| Superfícies de conhecimento e grafo | Google `gemini-3.1-pro-preview` | contexto longo e ontologia | entregue |
| Escuta social e vernáculo | xAI `grok-4.6` | acesso à conversa pública | entregue com limite de método declarado |
| Redação, arquitetura e revisão | Anthropic Claude Opus 5 | prosa em português do Brasil sob a diretriz | ondas 1 a 5 |

**Nota de custo e disponibilidade, apurada em 07/09/2026.** A chave de API da
OpenAI e a chave de API da Anthropic estavam sem crédito no momento da execução
(`insufficient_quota` e `credit balance is too low`). O papel da OpenAI foi
cumprido pelo Codex CLI sobre a assinatura, e o da Anthropic pelos agentes do
Claude Code. O modelo padrão do Codex nesta máquina (`gpt-6-astra`) exige uma
versão mais nova do CLI e falha com `400`; a execução precisou fixar `-m gpt-5.5`.
O Perplexity devolve `429` quando recebe quatro chamadas simultâneas, então as
tarefas foram serializadas com intervalo.

## 2. Dossiês brutos

Os arquivos completos ficam em `_research/` no worktree da rodada e não são
versionados, porque contêm rastro de execução. O que interessa ao repositório
está sintetizado abaixo e citado nas páginas.

| Dossiê | Provedor | Conteúdo |
|---|---|---|
| 01 papers psicologia 2026 | Perplexity | 7 estudos de 2026 sobre IA em saúde mental |
| 02 GEO e citação 2026 | Perplexity | share de citação por superfície e por motor |
| 03 contratos de canal | OpenAI | seis superfícies novas, com política oficial linkada |
| 04 superfícies acadêmicas | Google | Wikipedia, Wikidata, preprints, ORCID, ROR, DOI |
| 05 escuta social BR | xAI | 20 perguntas no vernáculo, 10 dores, 5 controvérsias |
| 07 psicologia organizacional | Perplexity | NR-1, INSS, burnout ocupacional |
| 08 neuropsicologia e avaliação | Perplexity | autismo adulto, TDAH, testagem, envelhecimento |
| 09 metadados e psicoterapia | Perplexity | resolução de metadados e psicoterapia humana |
| 10 mercado de pós em Psicologia | Perplexity | números oficiais de CFP, INEP e legislação |

## 3. Achados conferidos em fonte primária

O que segue foi verificado individualmente, com acesso em 07/09/2026, e pode ser
citado nas páginas.

### 3.1 Earned media domina a citação por IA

Muck Rack, Generative Pulse, "What Is AI Reading?", edição de maio de 2026,
publicada em 07/05/2026, terceira edição da série iniciada em julho de 2025.
Análise de mais de 25 milhões de links citados por ChatGPT, Claude e Gemini.

- Earned media responde por **84%** das citações, somando jornalismo, pesquisa
  acadêmica, fontes governamentais, sites enciclopédicos e conteúdo corporativo de
  terceiros. A faixa nas três edições vai de **82% a 89%**.
- Jornalismo sozinho responde por **27%** dos links citados, com faixa de 25% a 27%.
- Conteúdo pago e advertorial responde por **0,3%**.
- Taxa de resposta com citação por modelo: ChatGPT **96%**, Gemini **82%**,
  Claude **55%**, o mais seletivo dos três.

Fontes: `globenewswire.com/news-release/2026/05/07/3290268/0/en/generative-pulse-earned-media-consistently-drives-ai-citations-holding-at-84.html`
e `muckrack.com/blog/what-is-ai-reading-may-2026`.

**Rótulo obrigatório em qualquer uso:** estudo proprietário de fornecedor, não
revisado por pares. O denominador é o corpus de links que a Muck Rack rastreia,
não o universo de respostas de IA.

### 3.2 Viés por earned media em busca generativa

Chen, M., Wang, X., Chen, K. e Koudas, N. (2025). "Generative Engine
Optimization: How to Dominate AI Search". arXiv:2509.08919, submetido em
10/09/2025. O resumo afirma viés sistemático e acentuado da busca por IA em favor
de earned media, fontes autoritativas de terceiros, sobre conteúdo próprio de
marca e conteúdo social.

**Não confirmado:** a proporção "2,3 a 3,1 vezes o owned", que circula em
material secundário da casa, não aparece no resumo do arXiv. Não usar sem
localizar a seção dentro do PDF.

### 3.3 Número de psicólogos no Brasil: a série do CFP não fecha

O próprio Conselho Federal de Psicologia publica totais divergentes em painéis
diferentes, o que é fato editorial relevante e precisa aparecer no texto sempre
que o número for usado.

| Valor | Fonte | Data de publicação | Método |
|---|---|---|---|
| 513.917 registros ativos | Relatório de Gestão CFP 2024 | 2024 | Cadastro Nacional de Profissionais, registro ativo |
| 553.057 profissionais | página "Profissionais por regional" | 13/01/2025 | soma dos 24 Conselhos Regionais |
| 574.130 profissionais | mesma família de páginas | 10/11/2025 | soma dos Conselhos Regionais |
| 600.286 profissionais | infográfico "A Psicologia em números" | 2025 | sem ano de corte declarado no gráfico |

O infográfico serve para ilustrar o porte da categoria e não serve como ponto de
série, porque não declara mês de corte.

### 3.4 Censo da Educação Superior

O censo mais recente com apresentação publicada, em 07/09/2026, é o de **2024**,
com notas estatísticas de 2025. A página de resultados do INEP registra
atualização em 08/07/2026.

Matrículas em graduação em Psicologia, com denominador de matrículas e não de
pessoas: **261.818** em 2021, segundo a apresentação do Censo 2021, equivalentes a
7,8% entre os dez maiores cursos. Para 2022, 2023 e 2024 as apresentações trazem
recortes parciais sem rótulo de total, e o número consolidado exige microdados.

**Em aberto:** número de cursos de graduação em Psicologia por ano em tabela
oficial do INEP, e total de matrículas em 2024 somando todas as modalidades. Um
estudo acadêmico de mapeamento identifica 925 cursos em determinado recorte, o
que é citável como estudo e nunca como número oficial.

## 4. Limites de método declarados

1. **A escuta social do dossiê 05 não é captura ao vivo.** As vinte perguntas são
   reconstrução do registro em que o público escreve, não citação de post
   específico. Nenhuma delas pode ser publicada como "ouvimos no X em 2026" antes
   de haver URL, data e recorte de canal. O próprio dossiê marca essa exigência.
2. **Os percentuais de share de citação por domínio são estimativa de
   fornecedor.** Profound, ClickGuard, SE Ranking, PromptWatch, Evertune, Tinuiti
   e Indexly rastreiam corpora próprios com métodos próprios, e os números
   divergem entre si em ordem de grandeza. Reddit aparece com 21% em um painel de
   AI Overviews e com 2,5% a 3% em outro, no mesmo ano. A divergência é o dado.
3. **Vários estudos de 2026 do dossiê 01 chegaram sem autoria resolvida.** Onde o
   autor não foi confirmado, a citação usa veículo, ano e identificador do artigo,
   como "JMIR Mental Health, 2026, artigo e82642". Nenhum nome foi inferido.
4. **Nenhum número de resolução do Conselho Federal de Psicologia entrou sem
   conferência em fonte oficial.** Onde a conferência não foi possível, a regra
   ficou em termos gerais com marcação de falta de evidência.

## 5. Gate mecânico desta rodada

`scripts/lint-conteudo-social.py` verifica por script o que a diretriz consegue
expressar em padrão: acentuação do português no corpo do texto, nome de arquivo e
endereço interno em ASCII, ausência de emoji, travessão em prosa, promessa
proibida do anti-padrão 26, antítese que nega para afirmar, figura sem
alternativa textual, cor fixa dentro de SVG que quebraria o tema escuro,
identificador de JSON-LD duplicado, teto de marcações abertas e piso de links
internos.

O extrator separa prosa de código antes de testar, para que caminho de rota,
valor de atributo, literal de slug e endereço de site nunca disparem o teste de
acentuação. Separador de rótulo em título e em legenda de card é convenção de
interface já adotada nas páginas existentes e sai como aviso, não como erro.

Uso: `python scripts/lint-conteudo-social.py` para o menu,
`--todo-o-site` para varrer `site/src/pages` inteiro, `--json` para saída
parseável. Sai com código 1 quando há erro.

## 6. O que a rodada deixou em aberto

1. Fechar as vinte perguntas da escuta social com URL, data e canal.
2. Localizar no PDF do arXiv:2509.08919 a proporção entre earned e owned.
3. Obter no INEP o total de matrículas em Psicologia em 2024 por microdados.
4. Conferir as resoluções do Conselho sobre publicidade, infoproduto e uso de
   inteligência artificial vigentes em 2026.
5. Remediar o travessão em prosa nas páginas antigas do menu, que o gate aponta e
   que esta rodada não tocou por estarem fora do escopo.
