# Dossiê C — GEO e reaproveitamento de conteúdo em portais (agosto de 2026)

Pesquisa executada em 27 de agosto de 2026. Todas as fontes listadas na tabela final
foram efetivamente abertas e lidas. Onde a afirmação circula no mercado mas não foi
possível confirmar em fonte primária, o texto traz a marca **[FALTA EVIDÊNCIA]**.

Convenção deste documento: "citação" significa a URL que o motor generativo exibe
como fonte da resposta. "Menção" significa a marca aparecer no texto sem link.
Semrush mostra que os dois não coincidem, e a diferença é grande.

---

## FRENTE 1 — GEO: estado da arte em agosto de 2026

### 1.1 O que efetivamente mudou em 2026 na citação de fontes

**Google (AI Overviews e AI Mode).** A mudança mais consequente do ano foi a troca do
modelo. O Gemini 3 assumiu como padrão global das AI Overviews em 27 de janeiro de 2026,
e o comportamento de seleção de fontes mudou junto. O estudo da Ahrefs sobre 863 mil
palavras-chave e 4 milhões de URLs, publicado em março de 2026, mediu a queda: das
páginas citadas em AI Overviews, apenas 38% também estavam no top 10 orgânico da mesma
consulta, contra 76% em julho de 2025. O restante se divide quase igualmente entre
posições 11 a 100 (31,2%) e páginas fora do top 100 (31,0%).

A explicação técnica é o *query fan-out*: o Google decompõe a pergunta original em
várias subconsultas e privilegia páginas que aparecem bem em várias delas ao mesmo
tempo. A consequência operacional é direta e contraintuitiva para quem vem de SEO
clássico: ranquear em primeiro lugar para uma palavra-chave deixou de ser condição
suficiente ou necessária para ser citado. Cobertura de um tema por vários ângulos passa
a valer mais do que posição única.

Dados complementares na mesma direção: o Gemini 3 substituiu 42,4% dos domínios antes
citados, e a média de fontes por resposta subiu 31,8%, de 11,55 para 15,22 (SE Ranking,
via Conversion). O YouTube virou o domínio mais citado nas AI Overviews, com 5,6% do
total de citações, crescimento de 34% em seis meses, e 18,2% das citações que vêm de
páginas fora do top 100.

**Google, posição oficial.** A documentação do Google sobre AI features é explícita e
vale mais do que qualquer inferência de mercado: "There are no additional requirements
to appear in AI Overviews or AI Mode, nor other special optimizations necessary" e "You
don't need to create new machine readable files, AI text files, or markup to appear in
these features. There's also no special schema.org structured data that you need to add".
Os requisitos são os de sempre: estar indexado, ser elegível a snippet, permitir
rastreamento, ter bom link interno e conteúdo majoritariamente textual. Os controles de
exclusão também são os de sempre: `nosnippet`, `data-nosnippet`, `max-snippet`, `noindex`
e robots.txt. Tráfego de AI Overviews e AI Mode aparece no Search Console dentro do tipo
de busca "Web", sem relatório separado.

**Google, FAQ rich results.** Deprecação confirmada na própria documentação do Google:
o recurso deixou de ser exibido na busca em 7 de maio de 2026, e a documentação foi
removida em junho de 2026. O tipo `FAQPage` do Schema.org continua válido como marcação
e não causa problema se permanecer na página, mas não gera mais expansão de SERP nem
ganho de CTR. Não há confirmação de nenhum fornecedor de que `FAQPage` aumente chance de
citação em ChatGPT, Perplexity ou AI Overviews. Tratar FAQ schema como alavanca de GEO
em 2026 é cargo cult.

**OpenAI (ChatGPT).** A mudança estrutural é que a OpenAI opera índice próprio. A
documentação da OpenAI descreve três agentes distintos com finalidades separadas:
`OAI-SearchBot` (indexação para as funcionalidades de busca do ChatGPT), `GPTBot`
(coleta para treinamento de modelos) e `ChatGPT-User` (busca disparada pelo usuário, à
qual as regras de robots.txt podem não se aplicar). A frase decisiva: sites que
bloqueiam o `OAI-SearchBot` "will not be shown in ChatGPT search answers, though can
still appear as navigational links". Ou seja, bloquear treinamento (`GPTBot`) e permitir
busca (`OAI-SearchBot`) são decisões independentes, e confundir as duas é a forma mais
comum de sair do ChatGPT sem perceber. Mudanças no robots.txt levam cerca de 24 horas
para serem refletidas.

Isso invalida a receita ainda repetida em 2026 de que "ChatGPT usa o índice do Bing,
então otimize para o Bing". O IndexNow continua útil para Bing e Copilot, mas não é o
caminho para o ChatGPT.

**Perplexity.** Além do comportamento de citação (é o motor que mais cita comunidade),
a Perplexity montou um mecanismo econômico: o Comet Plus, assinatura de US$ 5 por mês,
com repartição 80/20 a favor dos publishers, a partir de um pool inicial de US$ 42,5
milhões, pagando em três categorias: visitas humanas, citações em busca e ações de
agente. É a primeira vez que "ser citado" tem preço explícito de tabela.

**Grok / X.** A xAI expõe a ferramenta `x_search` na Responses API, com busca por
palavra-chave, busca semântica, busca por usuário e leitura de thread sobre o corpus do
X, e o modelo devolve citações apontando para os posts de origem. Só posts públicos são
alcançáveis; filtros por data e por handle (máximo de 20) existem. É o único motor cuja
principal fonte de recência é um corpus fechado ao qual só se entra publicando lá dentro.

**Claude e Copilot.** Não localizei documentação primária de 2026 que descreva critério
de seleção de citação de forma auditável para nenhum dos dois. **[FALTA EVIDÊNCIA]**.
O que há é medição de terceiros: o índice da Semrush inclui Claude entre as superfícies
monitoradas, e o Presenc registra confirmação pública de leitura de `llms.txt` pela
Anthropic e pela Perplexity.

### 1.2 Papers de 2026 (todos abertos e verificados)

| arXiv ID | Título e achado central |
|---|---|
| **2607.14035** | *Optimizing Visibility in Generative Engines: A Critical Survey of GEO (2023-2026)*, Olivier Martinez, 15/07/2026. Revisa 45 estudos. Achado que derruba o discurso de mercado: "no reviewed technique shows a stable, longitudinal, cross-platform causal effect on organic discoverability or downstream behavior". Os ganhos do paper fundador de GEO são válidos, mas **condicionados a a fonte já estar presente no contexto**. Relevância tópica e posição no contexto são as duas influências reproduzíveis. Auditorias comerciais mostraram baixa sobreposição de fontes e alta variância entre execuções. |
| **2603.29979** | *Structural Feature Engineering for GEO: How Content Structure Shapes Citation Behavior*, Junwei Yu, Mufeng Yang, Yepeng Ding, Hiroyuki Sato, 31/03/2026. Framework GEO-SFE, três níveis (macro, meso, micro-estrutura). Otimização estrutural elevou taxa de citação em 17,3% e qualidade subjetiva em 18,5% em seis motores generativos. |
| **2604.25707** | *From Citation Selection to Citation Absorption*, Zhang Kai, He Xinyue, Yao Jingang, 28/04/2026. Distingue **ser citado** de **ser absorvido** (a página contribuir linguagem, evidência, estrutura ou suporte factual à resposta). 602 prompts controlados, 21.143 citações válidas, 23.745 registros de feature, 18.151 páginas coletadas, 72 features. Achado operacional: Perplexity e Google citam mais fontes; o ChatGPT cita menos, porém com influência média por página substancialmente maior. |
| **2606.20065** | *Generative Engine Optimization at Scale*, Pratyush Kumar (Ranqo), 18/06/2026. Mais de 100 mil respostas, mais de 100 marcas, março a maio de 2026. Escada de estatura: marcas globais aparecem em 73% das respostas relevantes, médias em 44%, nichos em 11%. Site próprio recebe cerca de 78% das citações; a página de maior alavanca é a **listicle "melhores X" ranqueada**, com cerca de 21% de todas as referências. Sentimento de marca oscila quase 7 vezes mais que a frequência de menção. |
| **2606.12439** | *Position: GEO Creates Underexamined Risks...*, Yizhu Wen et al., ICML 2026 Position Track, 18/05/2026. Três riscos: influência concentrada com baixa contestabilidade, influência comercial não divulgada embutida na evidência e no raciocínio, e assimetria de visibilidade entre pesquisa e sistemas implantados. |
| **2605.29107** | *GEO-Bench: Benchmarking Ranking Manipulation in GEO*, Ojas Nimase, Zhe Chen, Gengpei Qi, Yue Zhao, Xiyang Hu, 27/05/2026. Métricas de eficácia (NRG, Success@α, Promote@α) e de furtividade (taxa de violação de keyword, razão de perplexidade). Achado relevante para quem escreve: **reescrita de conteúdo iguala ou supera métodos baseados em gradiente** em promoção de ranking, com melhor fluência e menor detecção. Ou seja, a via legítima (escrever melhor) compete com a via adversarial. |
| **2509.10762** | *AI Answer Engine Citation Behavior: An Empirical Analysis of the GEO16 Framework*, Arlen Kumar, Leanid Palkhouski, 13/09/2025. 70 prompts, 1.702 citações, 1.100 domínios, três motores (Brave Summary, Google AI Overviews, Perplexity). Os três pilares mais associados a citação: **metadados e frescor, HTML semântico e dados estruturados**. Limiar operacional: score GEO igual ou maior que 0,70 com no mínimo 12 pilares atingidos. Escopo: páginas B2B SaaS em inglês. |
| **2412.18004** | *Correctness is not Faithfulness in RAG Attributions*, Jonas Wallat, Maria Heuss, Maarten de Rijke, Avishek Anand, 23/12/2024 (base conceitual ainda dominante em 2026). Distingue citação **correta** de citação **fiel**. Até 57% das citações sofrem de *post-rationalization*: o modelo cita uma fonte que sustenta a frase, mas não foi a fonte que ele de fato usou. |

Observação metodológica que vale mais que qualquer tática: o survey 2607.14035 e o paper
2509.10762 discordam em altitude. O primeiro diz que nenhuma técnica tem efeito causal
estável entre plataformas ao longo do tempo; o segundo mede correlação forte de
metadados, HTML semântico e dados estruturados com citação em três motores. Os dois
podem estar certos porque medem coisas diferentes: correlação transversal num recorte
(B2B SaaS em inglês) não é efeito causal longitudinal multiplataforma. O uso honesto é
tratar as recomendações táticas como hipóteses de custo baixo, e não como lei.

### 1.3 Padrões técnicos: o que vale, o que não vale

**Schema.org e `@graph`.** A documentação do Google sobre Organization (atualizada em 15
de abril de 2026) confirma o que o markup faz de fato: ajuda o Google a entender detalhes
administrativos e a **desambiguar a organização**, alimentando painel de conhecimento,
exibição de logotipo e perfis de comerciante. `sameAs` é propriedade recomendada e aceita
múltiplas URLs para perfis externos. Isso é real e verificável. O que **não** está
confirmado em fonte primária é a afirmação de mercado de que `@graph` com `@id`
encadeando Article, Person e Organization aumenta citação em motores generativos. Essa
tese só aparece em blogs de fornecedor. **[FALTA EVIDÊNCIA]**. A leitura correta:
estruturar entidade é bom porque resolve identidade (e o GEO16 correlaciona dados
estruturados com citação), não porque exista um canal declarado de schema para LLM.

**`speakable`.** Continua **em beta** na documentação do Google, restrito a conteúdo em
inglês e usuários nos Estados Unidos com Google Home em inglês. Não há aviso de
deprecação, mas também não há disponibilidade para português do Brasil. Para o mercado
brasileiro, é investimento zero em 2026.

**`llms.txt`.** A evidência é convergente e negativa para quem espera ganho de citação.
O estudo da SE Ranking sobre cerca de 300 mil domínios (novembro de 2025) encontrou
adoção de 10,13% e **nenhuma correlação** entre ter o arquivo e frequência de citação;
ao remover a variável `llms.txt` de um modelo XGBoost, a acurácia preditiva **melhorou**,
o que indica que o campo adicionava ruído. Google afirma na documentação de AI features
que não é preciso criar "AI text files". O relatório Presenc (abril de 2026) registra
confirmação pública de leitura por Anthropic e Perplexity, padrão observável sem
compromisso público na OpenAI, e nenhum suporte visível em Google/Gemini; o mesmo
relatório afirma "modest but measurable uplift" em Anthropic e Perplexity, porém **sem
número, amostra ou metodologia**, o que rebaixa a afirmação a anedota. Veredito: custo
de implementação é quase zero e risco é zero, então publicar não é erro; **prometer
resultado é**.

**IndexNow.** O Google não adota o protocolo. Bing, Yandex, Naver, Seznam e Yep adotam.
Como o Bing alimenta o Copilot, IndexNow segue valendo para essa superfície. Não vale
para ChatGPT (índice próprio, `OAI-SearchBot`) nem para Google.

**MCP (Model Context Protocol).** Deixou de ser padrão de um fornecedor. A Anthropic doou
o MCP em 9 de dezembro de 2025 à Agentic AI Foundation, da Linux Foundation, cofundada
com Block e OpenAI e apoiada por Google, Microsoft, AWS, Cloudflare e Bloomberg. Goose
(Block) e AGENTS.md (OpenAI) entraram como projetos inaugurais. Para conteúdo, a leitura
é que a superfície de consumo migra de "página lida por crawler" para "recurso consumido
por agente", e um servidor MCP público passa a ser um canal de distribuição legítimo.

**Web Bot Auth.** É o padrão emergente de identidade criptográfica de agentes, baseado em
HTTP Message Signatures (RFC 9421): o bot assina os cabeçalhos com chave privada e o site
verifica com a chave pública publicada em local conhecido. Estado real em agosto de 2026:
o draft de arquitetura `draft-meunier-web-bot-auth-architecture-05` está **expirado e
arquivado** (última atualização 02/03/2026), superado por
`draft-meunier-webbotauth-httpsig-protocol-02`, de 18 de agosto de 2026, que é **submissão
individual, não adotada por grupo de trabalho do IETF** e declara "no formal standing in
the IETF standards process". Ou seja: não é padrão. Na prática, porém, já está em
produção: a Cloudflare integrou Message Signatures ao Verified Bots Program (1 de julho
de 2025), valida assinaturas ed25519 na borda automaticamente, sem ação do dono do site,
e expõe o campo `cf.verified_bot_category` para regras de WAF. Implementação roda na
frente da especificação.

### 1.4 O que funciona hoje para ser citado

Consolidando apenas o que tem base nas fontes verificadas acima:

1. **Estar recuperável antes de ser otimizável.** O survey 2607.14035 é categórico: os
   ganhos de GEO se materializam sobre fonte já presente no contexto. Antes de qualquer
   tática de redação, garanta indexação, `OAI-SearchBot` liberado, snippet permitido.
2. **Cobrir o tema por vários ângulos, não uma palavra-chave.** Consequência direta do
   fan-out do Gemini 3 e da queda de 76% para 38% de citações vindas do top 10.
3. **Estrutura importa e é mensurável.** GEO-SFE mediu 17,3% de ganho em taxa de citação
   com engenharia de macro, meso e micro-estrutura. GEO16 aponta HTML semântico entre os
   três pilares mais associados a citação.
4. **Metadados e frescor.** Primeiro pilar do GEO16. Data visível, data no markup, e
   atualização real do conteúdo.
5. **Dado original e fonte primária na mesma frase da afirmação.** O paper de absorção
   (2604.25707) mostra que o que importa não é aparecer na lista de fontes, é a página
   contribuir evidência para o texto da resposta. Número solto sem procedência é
   descartável; número com fonte colada é absorvível.
6. **Listicle ranqueada é a página de maior alavanca.** Cerca de 21% de todas as
   referências no estudo Ranqo, e site próprio concentra 78% das citações. A implicação
   é que o site próprio continua sendo o ativo, e o formato "melhores X para Y" é o
   formato de maior retorno.
7. **Reescrever bem compete com manipular.** GEO-Bench mostra que reescrita de conteúdo
   iguala ou supera ataques por gradiente em promoção de ranking, com melhor fluência.
   A rota legítima não é a rota mais fraca.
8. **Entidade resolvida.** Organization schema com `sameAs` apontando para perfis
   externos é documentado pelo Google como mecanismo de desambiguação.

O que **não** funciona ou não tem prova: `llms.txt` como alavanca de citação, `FAQPage`
como alavanca de citação, `speakable` em português, e qualquer promessa de efeito
estável entre plataformas ao longo do tempo.

---

## FRENTE 2 — Reaproveitamento de conteúdo em portais

### 2.1 Quem é efetivamente citado

Três medições independentes, todas abertas:

**Semrush, AI Visibility Index 2026** (janeiro a abril de 2026, 126 milhões de prompts
de busca com IA nos Estados Unidos, cobrindo ChatGPT, Gemini, Google AI Mode e Google AI
Overviews). Achados que importam para repurposing:
- O ChatGPT cita em média **15 fontes por resposta**; o Gemini, apenas **3**. A mesma
  peça tem chance muito diferente de aparecer em cada superfície.
- **Menção não é citação.** No Gemini, a sobreposição entre marcas mencionadas e marcas
  citadas como fonte cai a **30%**.
- Apenas 36 marcas globais mantiveram visibilidade no top 100 nas quatro plataformas
  simultaneamente, mês a mês, entre elas YouTube, Google, Reddit, Amazon e Apple.
- Concentração varia por setor: News/Media tem 82,9% entre as três primeiras marcas;
  Finanças, 41,4%.

**Profound** (agosto de 2024 a junho de 2025, 680 milhões de citações):
- ChatGPT: perfil enciclopédico. Wikipedia responde por 7,8% do total de citações e
  47,9% do seu top 10 de fontes.
- Google AI Overviews: perfil equilibrado, Reddit lidera com 2,2% do total e 21% do top.
- Perplexity: perfil comunitário, Reddit com 6,6% do total e 46,7% do top.
- Domínios `.com` respondem por mais de 80% das citações; `.org` por 11,29%.

**Ahrefs via SEJ e Conversion** (março de 2026): YouTube é o domínio mais citado nas AI
Overviews, com 5,6% do total, 34% de crescimento em seis meses e 18,2% das citações que
vêm de fora do top 100.

A leitura combinada: **Reddit, YouTube, Wikipedia e LinkedIn concentram citação**, e o
peso relativo de cada um muda por motor. Otimizar para "IA" em geral é otimizar para
nenhum motor. A afirmação de que o Reddit sozinho responde por cerca de 40% das citações
entre as fontes de topo circula em índices comerciais mas não foi confirmada em fonte
primária aberta. **[FALTA EVIDÊNCIA]**.

### 2.2 Regras vigentes e mudanças de política, por plataforma

**Reddit.** Duas camadas distintas.

*Camada de conteúdo.* O guia de autopromoção do próprio Reddit é explícito e continua a
referência cultural: "It's perfectly fine to be a redditor with a website, it's not okay
to be a website with a reddit account". A regra prática publicada é a **proporção de 10%**:
"a general rule of thumb is that 10% or less of your posting and conversation should link
to your own content". Também: não votar apenas no próprio domínio (isso é vote
manipulation e leva a banimento de conta e, em casos extremos, do domínio), não pedir
votos nem fora do Reddit, e identificar-se de forma transparente ("Hi, I'm the author of
this article..."). A página do wiki avisa que não é mais atualizada e remete a
reddithelp.com.

*Camada de licenciamento.* Aqui está a instabilidade de 2026. O Reddit fecha o acesso a
crawlers que não se comprometem a não usar os dados para treino, o que na prática deixou
Bing e DuckDuckGo sem resultados recentes de reddit.com enquanto o Google seguiu com
acesso via acordo de US$ 60 milhões por ano. Em 22 de julho de 2026, o Wall Street
Journal reportou (e a CNBC confirmou com pronunciamento do Reddit) que o acordo com o
Google **está terminando** e que o Reddit discute cortar o acesso do Google ao seu
conteúdo para uso em IA; a ação caiu 8% no dia. O Reddit declarou que negocia "focusing
on doing what's best for Reddit". A receita de licenciamento cresceu 24%, para US$ 43
milhões, com Google e OpenAI como maiores compradores. Consequência operacional: **a
plataforma mais citada pelos motores generativos é também a de canal mais instável em
2026**. Depender de Reddit como principal via de citação é assumir risco contratual de
terceiro.

**Medium.** Política de IA verificada na fonte, e é a mais restritiva do conjunto.
Definição: conteúdo gerado por IA é aquele em que a maioria foi criada por programa com
pouca ou nenhuma edição, checagem ou melhoria; ferramentas de outline, correção
ortográfica e verificação factual não contam. Regras:
- Texto gerado por IA, **divulgado ou não, não pode ficar atrás do paywall** do Partner
  Program. Consequência: remoção do paywall e/ou revogação da matrícula no programa.
- Texto gerado por IA **sem disclosure** recebe distribuição "Network Only", ou seja, só
  chega a seguidores e assinantes diretos, sem distribuição ampla.
- Texto **assistido** por IA também exige rótulo claro; sem disclosure, cai igualmente
  em Network Only.
- Imagens geradas por IA são permitidas **com legenda identificando**.
- Proibido: conteúdo gerado por IA feito só para ranquear e promover links de afiliado;
  uso de IA para reformular, resumir ou remixar conteúdo existente de modo que o
  resultado se pareça com o original em conceito, estrutura ou elementos essenciais
  (isso é tratado como plágio); e artigos com estatísticas, eventos ou fatos alucinados
  facilmente refutáveis.
- Forma de disclosure aceita: uma frase nos dois primeiros parágrafos, no modelo "This
  story was written with the assistance of an AI writing program".
- O Medium declara usar "a wide variety of tools and technologies" de detecção,
  combinadas com revisão humana dos positivos.

O ponto crítico para repurposing: **republicar no Medium um texto já publicado no seu
site, reescrito por IA, cai exatamente na cláusula de remix derivativo**, que o Medium
classifica como violação das diretrizes de plágio. Republicação canônica e declarada é
outra coisa; reescrita automática do próprio conteúdo não é.

**LinkedIn.** As Professional Community Policies proíbem literalmente conteúdo e mensagens
"untargeted, irrelevant, obviously unwanted, unauthorized, inappropriate commercial or
promotional" e "gratuitously repetitive messages or similar content". Também proíbem
manipulação de engajamento: "Don't do things to artificially increase engagement with
your content. Respond authentically to others' content and don't agree with others ahead
of time to like or re-share each other's content" — o que é a proibição explícita de
pods. E pedem originalidade: "Please make the effort to create original, professional,
relevant, and interesting content in order to gain engagement".

Ponto forte do LinkedIn para GEO: a Semrush aponta o LinkedIn entre as fontes mais
citadas pelos motores generativos, e o índice deriva de 89 mil URLs únicas do LinkedIn
citadas em respostas de IA no recorte de 325 mil prompts (janeiro a fevereiro de 2026).
Isso torna o LinkedIn um dos poucos canais em que o repurposing gera citação, não apenas
alcance.

Sobre o que circula e **não** foi confirmado em fonte primária do LinkedIn: a "Authenticity
Update" de março de 2026, o rótulo "Frequently Promotional" para newsletters a partir de
abril de 2026, o sistema de ranqueamento 360Brew, as quedas de 50% em visualizações e
59% em novos seguidores, e os números do relatório de transparência. Tudo isso vem de
blogs de agência. **[FALTA EVIDÊNCIA]**. Trate como sinal de mercado, não como regra.

**Substack.** Não há proibição de conteúdo gerado por IA. O que existe desde 22 de julho
de 2026 é **transparência opcional**, em parceria com a Pangram: leitores podem acionar
"Scan for AI text" em posts, notes, replies e comentários e receber uma estimativa de
quanto do texto é humano; o resultado **não aparece automaticamente**, é preciso pedir.
Autores podem rodar a checagem em rascunhos antes de publicar e contestar varreduras que
considerem erradas. Há uma declaração opcional "How I make this", em que o criador
descreve seu processo. Ferramenta viva na web e no iOS, com Android depois. Funciona em
textos acima de 100 palavras. O CEO Chris Best enquadrou o movimento como transparência,
não punição. Implicação para repurposing: **o Substack é o canal mais permissivo do
conjunto, e por isso mesmo o de maior risco reputacional** — o leitor pode auditar seu
texto a qualquer momento.

**Quora.** Política verificada na fonte, com quatro linhas que governam tudo:
- "Answers should respond to the question asked."
- "A user should disclose any relevant affiliations explicitly in an answer or in the
  credential that appears with the answer. Affiliate links are not allowed."
- "Self-promotional links or self-promotion that does not form a part of a direct and
  helpful response to the question is not allowed."
- "The gist of the answer should be able to be understood without having to leave Quora
  to access an external website. Answers that cannot be understood without navigating to
  an external site and appear to be doing so for promotional purposes may be collapsed
  and/or removed."

A quarta é a que quebra a maioria das estratégias de repurposing: **o teaser com link é
explicitamente punível**. A resposta tem que ser completa dentro do Quora.

**X.** Não há política de autopromoção que valha citar como trava; o que muda o jogo é o
mecanismo. O `x_search` do Grok lê o corpus público do X com busca semântica e leitura de
thread, e cita os posts de origem. Como o corpus é fechado a crawlers externos, **a única
forma de estar nessa base é publicar no X**. É o caso mais puro de "o canal é o índice".
Sobre user agents da xAI para a web aberta (`xAI-Bot`, `xAI-Grok`, `Grok-DeepSearch`),
não localizei página de documentação oficial da xAI; as referências são diretórios de
terceiros. **[FALTA EVIDÊNCIA]**.

### 2.3 Evidência em português do Brasil

Esta é a parte mais fraca do dossiê, e é honesto dizer.

**O que está verificado.** O AI Mode em português do Brasil foi lançado em 8 de setembro
de 2025, rodando Gemini 2.5, dentro de uma expansão que alcançou mais de 180 países
(Conversion). O Brasil é o terceiro maior mercado do ChatGPT no mundo, com 310,67 milhões
de acessos em agosto de 2025 (Tropk). O TIC Domicílios 2025, pesquisa probabilística com
24.535 entrevistas domiciliares, mediu 32% dos usuários de internet usando IA generativa,
cerca de 50 milhões de pessoas. Consultas em AI Search no Brasil têm em média 23 palavras,
cinco vezes mais longas que buscas tradicionais de 3 a 5 palavras, com sessões acima de
7 minutos.

**O que está em conflito e não deve ser citado como fato.** Duas fontes brasileiras dão
números incompatíveis de share do ChatGPT no tráfego de IA no Brasil: uma reporta 99%,
outra reporta 78,36% com Perplexity em 8,42%, Gemini 5,87%, Copilot 3,77% e Claude 0,62%.
Não abri a metodologia de nenhuma das duas. **[FALTA EVIDÊNCIA]** para qualquer número
de share de IA no Brasil.

**O que não existe.** Não localizei nenhum estudo que meça **quais domínios são citados
por motores generativos em consultas em português do Brasil**. Semrush, Profound e Ahrefs
são todos recortes de mercado americano ou global sem quebra por idioma. Qualquer
afirmação do tipo "no Brasil a IA cita X" é, hoje, extrapolação de dado em inglês.
**[FALTA EVIDÊNCIA]**.

**O que isso implica.** A hipótese de "janela aberta em português" (menos concorrência
por citação porque o pool de fontes em português é menor) é plausível e circula no
mercado brasileiro, mas **não tem medição publicada**. Se a Brasil GEO quiser afirmar
isso com autoridade, o caminho não é citar terceiros: é **medir e publicar o dado**.
Um levantamento próprio de domínios citados em consultas em pt-BR, com metodologia
aberta, seria simultaneamente o ativo de conteúdo mais citável e a prova da tese. Vale
lembrar o achado do Ranqo: dado original em site próprio concentra a citação.

---

## Tabela de fontes

| Afirmação | Fonte | URL | Status |
|---|---|---|---|
| Nenhuma técnica de GEO tem efeito causal estável multiplataforma; 45 estudos revisados | Martinez, arXiv 2607.14035 | https://arxiv.org/abs/2607.14035 | Aberto e verificado |
| Estrutura eleva citação em 17,3% e qualidade em 18,5% (GEO-SFE) | Yu, Yang, Ding, Sato, arXiv 2603.29979 | https://arxiv.org/abs/2603.29979 | Aberto e verificado |
| Absorção vs seleção; ChatGPT cita menos com influência maior; 21.143 citações | Zhang, He, Yao, arXiv 2604.25707 | https://arxiv.org/abs/2604.25707 | Aberto e verificado |
| Marcas globais 73%, médias 44%, nicho 11%; listicle = 21% das referências; site próprio = 78% | Kumar (Ranqo), arXiv 2606.20065 | https://arxiv.org/abs/2606.20065 | Aberto e verificado |
| Riscos de concentração e influência comercial não divulgada em GEO (ICML 2026) | Wen et al., arXiv 2606.12439 | https://arxiv.org/abs/2606.12439 | Aberto e verificado |
| Reescrita de conteúdo iguala ou supera ataques por gradiente | Nimase et al., arXiv 2605.29107 | https://arxiv.org/abs/2605.29107 | Aberto e verificado |
| Metadados/frescor, HTML semântico e dados estruturados são os pilares mais ligados a citação | Kumar, Palkhouski, arXiv 2509.10762 | https://arxiv.org/abs/2509.10762 | Aberto e verificado |
| Até 57% das citações sofrem post-rationalization (correção não é fidelidade) | Wallat, Heuss, de Rijke, Anand, arXiv 2412.18004 | https://arxiv.org/abs/2412.18004 | Aberto e verificado |
| Google: não há requisito extra, arquivo de IA nem schema especial para AI Overviews/AI Mode | Google Search Central | https://developers.google.com/search/docs/appearance/ai-features | Aberto e verificado |
| FAQ rich result deixou de ser exibido em 07/05/2026; doc removida em junho de 2026 | Google Search Central | https://developers.google.com/search/docs/appearance/structured-data/faqpage | Aberto e verificado |
| `speakable` segue em beta, só inglês e Estados Unidos | Google Search Central | https://developers.google.com/search/docs/appearance/structured-data/speakable | Aberto e verificado |
| Organization schema desambigua entidade; `sameAs` recomendado; atualizado 15/04/2026 | Google Search Central | https://developers.google.com/search/docs/appearance/structured-data/organization | Aberto e verificado |
| OAI-SearchBot, GPTBot e ChatGPT-User têm funções distintas; bloquear o primeiro tira o site das respostas de busca do ChatGPT | OpenAI Docs | https://developers.openai.com/api/docs/bots | Aberto e verificado |
| Web Bot Auth: draft de arquitetura expirado, superado por httpsig-protocol-02 (18/08/2026), submissão individual sem status formal no IETF | IETF Datatracker | https://datatracker.ietf.org/doc/draft-meunier-webbotauth-httpsig-protocol/ | Aberto e verificado |
| Draft de arquitetura Web Bot Auth 05, expirado, última atualização 02/03/2026 | IETF Datatracker | https://datatracker.ietf.org/doc/draft-meunier-web-bot-auth-architecture/ | Aberto e verificado |
| Cloudflare validou HTTP Message Signatures no Verified Bots (01/07/2025), sem ação do dono do site | Cloudflare Blog | https://blog.cloudflare.com/verified-bots-with-cryptography/ | Aberto e verificado |
| MCP doado à Agentic AI Foundation (Linux Foundation) em 09/12/2025, com Block e OpenAI cofundadores | Anthropic | https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation | Aberto e verificado |
| llms.txt: 10,13% de adoção em ~300 mil domínios, zero correlação com citação; XGBoost melhora sem a variável | SE Ranking (07/11/2025) | https://seranking.com/blog/llms-txt/ | Aberto e verificado |
| Anthropic e Perplexity confirmam leitura de llms.txt; Google sem suporte visível; "uplift" sem número | Presenc AI (abril/2026) | https://presenc.ai/research/state-of-llms-txt-2026 | Aberto e verificado; afirmação de uplift sem metodologia |
| AI Overviews: citações do top 10 caíram de 76% (jul/2025) para 38% (mar/2026); 863 mil keywords, 4 mi de URLs; fan-out | Search Engine Journal sobre Ahrefs (02/03/2026) | https://www.searchenginejournal.com/google-ai-overview-citations-from-top-ranking-pages-drop-sharply/568637/ | Aberto e verificado |
| Gemini 3 trocou 42,4% dos domínios citados; fontes por resposta 11,55 → 15,22; YouTube 5,6% do total e 18,2% fora do top 100 | Conversion | https://www.conversion.com.br/blog/ai-overviews-citacoes-top-10-queda/ | Aberto e verificado |
| ChatGPT: Wikipedia 7,8% e 47,9% do top 10; AI Overviews: Reddit 2,2% e 21%; Perplexity: Reddit 6,6% e 46,7%; 680 mi de citações | Profound | https://www.tryprofound.com/blog/ai-platform-citation-patterns | Aberto e verificado |
| 126 mi de prompts; ChatGPT 15 fontes/resposta vs Gemini 3; menção-citação cai a 30% no Gemini; 36 marcas universais | Semrush (2026) | https://www.semrush.com/news/463141-semrush-releases-expanded-2026-ai-visibility-index-analyzing-126-million-ai-search-prompts/ | Aberto e verificado |
| Reddit discute cortar acesso do Google; acordo de US$ 60 mi/ano terminando; ação caiu 8% em 22/07/2026 | CNBC | https://www.cnbc.com/2026/07/22/reddit-stock-google-ai-content-deal.html | Aberto e verificado |
| Reddit servia robots.txt diferente por crawler (cloaking), permitindo Google e Internet Archive | MERJ (04/07/2024) | https://merj.com/blog/investigating-reddits-robots-txt-cloaking-strategy | Aberto e verificado; **data é 2024, não 2026** |
| Reddit: regra dos 10%, proibição de vote manipulation, exigência de transparência de autoria | Reddit wiki (marcado como não atualizado) | https://www.reddit.com/wiki/selfpromotion/ | Aberto e verificado |
| Medium: IA gerada não pode ser paywalled; sem disclosure vai para Network Only; remix derivativo é plágio | Medium Help Center | https://help.medium.com/hc/en-us/articles/22576852947223-Artificial-Intelligence-AI-content-policy | Aberto e verificado |
| Quora: sem links autopromocionais, sem afiliado, disclosure de afiliação, resposta compreensível sem sair do Quora | Quora Help Center | https://help.quora.com/hc/en-us/articles/9456583756180-Question-and-Answer-Policies | Aberto e verificado |
| LinkedIn: proíbe conteúdo promocional não solicitado, repetitivo, e manipulação de engajamento/pods | LinkedIn Professional Community Policies | https://www.linkedin.com/legal/professional-community-policies | Aberto e verificado |
| Substack + Pangram: scan opcional de IA em posts e comentários, "How I make this", disclosure não obrigatório (22/07/2026) | TechCrunch | https://techcrunch.com/2026/07/22/substacks-new-tool-tells-you-whos-been-writing-their-newsletters-with-ai/ | Aberto e verificado |
| Grok `x_search`: busca semântica e thread fetch sobre posts públicos do X, com citação ao post de origem | xAI Docs | https://docs.x.ai/developers/tools/x-search | Aberto e verificado |
| AI Mode em pt-BR lançado em 08/09/2025 com Gemini 2.5, mais de 180 países | Conversion | https://www.conversion.com.br/blog/google-ai-mode-portugues/ | Aberto e verificado |
| Brasil 3º maior mercado do ChatGPT (310,67 mi de acessos, ago/2025); TIC Domicílios 2025: 32% e ~50 mi de pessoas; consultas de 23 palavras | Tropk | https://blog.tropk.ai/o-mercado-brasileiro-de-ai-search-em-2026/ | Aberto e verificado; share de 99% **conflita** com outra fonte |
| Perplexity Comet Plus: US$ 5/mês, split 80/20, pool de US$ 42,5 mi, pagamento por visita, citação e ação de agente | Search Engine Journal | https://www.searchenginejournal.com/perplexity-launches-comet-plus-shares-revenue-with-publishers/554596/ | Referenciado em busca, **não aberto integralmente** — [FALTA EVIDÊNCIA] no detalhe |
| LinkedIn: "Authenticity Update" mar/2026, rótulo "Frequently Promotional", 360Brew, quedas de alcance | Blogs de agência | — | **[FALTA EVIDÊNCIA]** — sem fonte primária LinkedIn |
| Reddit ≈ 40% das citações entre fontes de topo | Índices comerciais | — | **[FALTA EVIDÊNCIA]** |
| Domínios citados por IA em consultas em português do Brasil | — | — | **[FALTA EVIDÊNCIA]** — nenhum estudo localizado |
| User agents oficiais da xAI (`xAI-Bot` etc.) | Diretórios de terceiros | — | **[FALTA EVIDÊNCIA]** — sem doc oficial da xAI |

Total de fontes abertas e verificadas: **31**.

---

## Regras operacionais por canal

### Quora

**Fazer**
- Responder a pergunta por inteiro dentro do Quora: a política exige que o essencial seja
  compreensível sem sair da plataforma.
- Declarar a afiliação explicitamente no corpo da resposta ou no *credential* que aparece
  ao lado dela. Isso é exigência escrita, não etiqueta.
- Usar o link próprio só quando ele for parte de uma resposta direta e útil, no máximo um
  ou dois por resposta longa.
- Levar dado original e tabela: é o que sobrevive à extração por motor generativo.

**Não fazer**
- Teaser com "veja o artigo completo no meu site". É a hipótese literal de colapso e
  remoção prevista na política.
- Link de afiliado. Proibição explícita, sem exceção.
- Colar a mesma resposta em várias perguntas.

### Medium

**Fazer**
- Publicar peça reescrita **por humano** com ângulo próprio, não a mesma peça do site.
- Se houve assistência de IA, colocar a frase de disclosure nos dois primeiros parágrafos.
  Sem ela, a peça cai em Network Only e o reaproveitamento não gera alcance nenhum.
- Legendar imagem gerada por IA na própria legenda.
- Usar canonical apontando para o original quando for republicação declarada.

**Não fazer**
- Passar o próprio artigo por um LLM para "adaptar ao Medium". O texto derivativo que
  preserva conceito, estrutura ou elementos essenciais do original é tratado como plágio
  pela política do Medium.
- Colocar texto gerado por IA atrás do paywall. Risco de perder a matrícula no Partner
  Program.
- Publicar peça de IA otimizada para SEO com link de afiliado. Proibição nominal.
- Publicar estatística que não sustente checagem: alucinação factual está listada entre as
  violações.

### LinkedIn

**Fazer**
- Tratar como canal de citação, não só de alcance: está entre os domínios mais citados
  pelos motores generativos.
- Publicar o conteúdo nativo, completo, no post ou no artigo. Link externo cru é o padrão
  de menor distribuição e o que a política chama de promocional não solicitado.
- Escrever original por peça. A política pede explicitamente esforço de originalidade.
- Usar a newsletter como camada de entrega direta ao inscrito, com peça própria por edição.

**Não fazer**
- Pods e combinações prévias de curtida ou compartilhamento. Proibição literal na política.
- Repetir o mesmo conteúdo ou variações mínimas: "gratuitously repetitive messages or
  similar content" é violação nomeada.
- Automação fora das APIs oficiais.
- Tratar como fato as regras de 2026 que circulam em blogs de agência (360Brew, rótulo
  "Frequently Promotional", quedas de alcance). Nada disso foi confirmado pelo LinkedIn.

### Substack

**Fazer**
- Usar como arquivo canônico de peça longa e como lista própria, fora de algoritmo.
- Publicar a declaração "How I make this", opcional, descrevendo o processo. É o
  movimento de menor custo e maior retorno de confiança no canal.
- Rodar a checagem da Pangram no rascunho antes de publicar, já que qualquer leitor pode
  rodá-la depois.
- Deixar a peça fora do paywall quando o objetivo for citação: conteúdo pago não é
  extraível pelo motor.

**Não fazer**
- Publicar texto de IA sem revisão substancial só porque a plataforma permite. Aqui não
  há punição de política, há auditoria pública sob demanda pelo leitor.
- Assumir que a marcação de IA é automática. Ela só aparece quando alguém pede.

### Reddit

**Fazer**
- Respeitar a proporção de 10% publicada pelo próprio Reddit: no máximo um décimo das
  postagens e conversas apontando para conteúdo próprio.
- Identificar-se ao comentar sobre o próprio material ("sou o autor deste artigo").
  Transparência é recomendada nominalmente pelo guia.
- Participar em subreddits relevantes antes de postar qualquer coisa própria, e ler as
  regras específicas de cada subreddit, que se sobrepõem à regra geral.
- Acompanhar `reddit.com/domain/<seu-dominio>` para ver o que já circula.

**Não fazer**
- Votar apenas no próprio domínio ou pedir voto, dentro ou fora do Reddit. É vote
  manipulation, com banimento de conta e, em caso extremo, de domínio.
- Postar links próprios como primeira atividade da conta.
- Construir a estratégia de citação **sobre** o Reddit. É o domínio mais citado e, desde
  julho de 2026, o de futuro contratual mais incerto: o acordo de US$ 60 milhões com o
  Google está terminando e o Reddit discute cortar o acesso. Use como camada, nunca
  como base.

### X

**Fazer**
- Publicar nativo. O corpus do X é fechado a crawlers externos e o `x_search` do Grok só
  alcança post público: quem não publica lá não existe para o Grok.
- Escrever o argumento inteiro no thread, com o número e a fonte na mesma frase. O Grok
  faz thread fetch, então a thread é a unidade citável.
- Manter conta pública. Conteúdo protegido some da base.

**Não fazer**
- Postar só o link. Fora do texto do post não há o que o motor absorva.
- Confiar em bloqueio de crawler para controlar presença: o Grok também descreve marcas a
  partir de posts de terceiros e do treino.
- Escrever regra de robots.txt para agentes da xAI com base em diretórios de terceiros.
  Não há documentação oficial verificada dos user agents.

---

## Erratas e limites deste dossiê

- O estudo da MERJ sobre o robots.txt do Reddit é de **julho de 2024**, não de 2026. Foi
  mantido por descrever o mecanismo de acesso seletivo, não o estado atual.
- O paper *Correctness is not Faithfulness* é de dezembro de 2024. Entrou por ser a base
  conceitual ainda usada em 2026 para distinguir citação correta de citação fiel.
- O estudo da Profound cobre agosto de 2024 a junho de 2025 e é anterior ao Gemini 3.
  Seus percentuais para AI Overviews devem ser lidos como linha de base, não como
  fotografia de agosto de 2026.
- A documentação do Google sobre AI features, lida em 27/08/2026, exibia "Last updated
  December 10, 2025". Fontes de mercado atribuem a esse guia uma publicação em 15/05/2026;
  não foi possível reconciliar as duas datas na fonte primária.
- Nenhum dado de citação por idioma português do Brasil foi localizado. Toda extrapolação
  para o mercado brasileiro neste documento está marcada como tal.
