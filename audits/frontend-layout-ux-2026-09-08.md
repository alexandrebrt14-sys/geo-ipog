# Layout, navegação e interação: terceira rodada

A terceira rodada aproximou as ações principais do início da home e corrigiu perdas de orientação durante a leitura e a escolha de uma formação. A vistoria de 8 de setembro de 2026 encontrou um título com espaçamento duplicado entre palavras, um índice que mantinha a seção errada após saltos de rolagem, filtros sem estado recuperável e um quiz que avançava automaticamente após selecionar uma resposta. As correções preservam os textos editoriais, as modalidades e os destinos existentes.

O ponto de partida foi `42a4046`, posterior à [segunda rodada](frontend-robustez-2026-09-08.md). Três especialistas dividiram design, navegação e descoberta; o orquestrador cuidou dos efeitos de leitura, integração, regressão e publicação. Componentes sem uso nas páginas publicadas foram identificados e excluídos das mudanças.

## Onda 1: composição e hierarquia visual

A home passou a apresentar o assunto principal e o complemento do título em dois níveis. A composição desktop distribui título e ações de um lado e contexto editorial do outro; no mobile, as ações vêm antes do bloco de contexto. Todas as palavras do título e o conteúdo dos parágrafos foram preservados. A mudança também removeu a fragmentação do título em palavras animadas com espaços adicionais.

A comparação no navegador, com as fontes carregadas e o mesmo tamanho de tela, registrou:

| Medida | Antes | Depois |
|---|---:|---:|
| Posição vertical da primeira ação, desktop de 1.440 px | 846 px | 426 px |
| Posição vertical da primeira ação, mobile de 320 px | 1.074 px | 447 px |
| Altura dos botões principais | Variável pelo conteúdo | Piso de 48 px |
| Altura dos links do mapa de perfis | Variável pelo conteúdo | Piso de 80 px |

Onze cartões de modalidades e hubs alinham a chamada à base da linha. O mapa de perfis ganhou superfícies efetivas, pois os utilitários anteriores de opacidade não eram gerados, e foco dourado sobre o fundo escuro. O botão secundário recebeu borda própria no tema escuro. A vistoria cobriu cinco larguras e dois temas, teclado, toque e JavaScript desativado. As referências regulatórias passaram de uma faixa contínua parcialmente recortada para uma lista completa que quebra linhas.

## Onda 2: orientação em páginas longas

O índice anterior observava apenas títulos dentro de uma faixa estreita da tela. Ao saltar para o meio de outra seção, o destaque podia continuar no título anterior. Além disso, a cor e a borda aplicadas por classes perdiam na cascata: o link ativo parecia igual aos demais.

O índice agora acompanha a última seção que atravessou a linha de leitura, considera a ordem real dos títulos e mantém o item atual visível dentro da lista lateral. O estado visual usa `aria-current`, com cores verificadas nos dois temas. Em 1.080 × 540 px, o índice passou a terminar em 524 px, enquanto antes chegava a 688,5 px. Sua lista rola internamente, permitindo alcançar o último item.

No mobile, `details` e `summary` oferecem acesso aos links antes da hidratação. Clique simples conserva fragmento e foco; Escape fecha o índice e retorna ao gatilho. Cliques com modificadores mantêm o comportamento nativo. Os 15 cenários automatizados e a vistoria no navegador passaram. A conferência online revelou ainda que o salto nativo soma o padding de rolagem da raiz à margem do título. Em uma página mobile, o destino ficava em 176,25 px e a linha do índice em 160 px. O cálculo passou a considerar a soma dos offsets e 1 px de tolerância quando o fragmento aponta para um item válido. Três regressões cobrem esse caso e fragmentos ausentes, desconhecidos ou malformados. Header, mega-menu e menu móvel também foram testados; seus comportamentos de teclado, fechamento e restauração de foco foram preservados.

## Onda 3: filtros, perfis e quiz

Os filtros de áreas agora restauram busca, agrupamento e regulação a partir da URL. Alterações conservam parâmetros externos, fragmento e estado do histórico usado pelo Astro. Valores desconhecidos de filtros são descartados. A limpeza devolve o foco ao campo de busca, e os chips compartilham seleção e navegação por teclado.

O quiz passou a exigir confirmação por “Continuar” ou “Ver resultado”. A resposta pode ser alterada antes de avançar, as escolhas permanecem ao voltar e o resultado oferece revisão. A troca de pergunta elimina a concorrência entre a saída animada anterior e o novo contador. Na vistoria mobile de 360 × 640 px, apareceu um segundo problema: a pergunta seguinte podia ficar fora da tela mesmo recebendo foco. O ajuste final posiciona o título em 88 px, abaixo do cabeçalho que terminava em 64,7 px, e foi confirmado nas perguntas seguintes.

Os marcadores A/B/C das respostas também receberam proteção contra encolhimento: antes variavam entre 10,79 e 23,44 px; a conferência HTTPS posterior registrou todos em 24 × 24 px. A seleção de perfil valida valores armazenados, acompanha mudanças entre abas e anuncia o estado. Limpar a seleção retorna o foco ao título. Nenhuma resposta do quiz é enviada a um serviço. Os 17 cenários específicos cobrem estado, foco, confirmação, revisão, recuperação de armazenamento e HTML inicial.

## Onda 4: movimento e continuidade da leitura

A barra de leitura ficava com largura zero quando o navegador aceitava timelines CSS e o leitor ativava movimento reduzido. A correção alterna entre timeline CSS e atualização por JavaScript conforme a preferência atual, inclusive quando ela muda durante a sessão. A medição no navegador confirmou o progresso proporcional à rolagem após aguardar a atualização de frame.

O botão de retorno ao topo antes permanecia focável com opacidade zero. Agora fica fora da ordem de Tab enquanto está oculto; quando acionado, retorna a leitura e o foco ao título principal. O atalho existente também usa esse comportamento. Cartões revelados por animação permanecem visíveis ao receber foco.

Os efeitos foram concentrados em `page-effects.ts`. Navegação, saída de página e mudança de preferência encerram observadores, frames, atrasos e pulsos ativos. Contagens em andamento terminam no valor útil antes da restauração pelo histórico. As animações decorativas temporais usam um ciclo curto; microinterações acompanham ações do leitor e respeitam movimento reduzido. Os 14 cenários específicos passaram, assim como a revisão independente do módulo.

## Onda 5: regressão e publicação

| Verificação local | Resultado |
|---|---|
| Build Astro | Aprovado |
| Checagem Astro | 487 arquivos, zero erro, zero warning; 1.159 hints preexistentes |
| Novos cenários de regressão | 46 aprovados: 15 de navegação, 17 de descoberta e 14 de efeitos |
| Estrutura consolidada | 451 HTML, 77.243 links internos e 6.512 referências a recursos locais; zero falhas |
| Scripts inline | 2.302 instâncias, 130 conteúdos únicos; zero erro de sintaxe |
| Matriz local | 448 rotas × três larguras × dois temas = 2.688 visões; zero falhas após os retestes descritos abaixo |
| Gates anteriores | Busca, service worker, recursos CSS, imports e melhoria progressiva aprovados |
| Workflows | Três novos testes obrigatórios, sem duplicação, no PR e no deploy |

A matriz local verificou largura, H1, main, imagens, recursos e erros de execução observados. O preview Windows apresentou atrasos em algumas entregas de CSS e no renderer React. A matriz recebeu o CSS integral do artefato por interceptação; os fluxos React afetados também isolaram a entrega do renderer. Essa técnica valida o artefato e o comportamento, sem comprovar o transporte do preview. O export Next permaneceu sem mudanças de fonte; 23 aliases somente em `dist` reproduziram no Windows os nomes RSC com pontos gerados no Linux. Cinco rotas institucionais foram repetidas após esse ajuste e passaram. Os dois últimos ajustes visuais e de posição do quiz receberam retestes específicos no build de fechamento.

A matriz HTTPS publicada no merge `f71fcd9` completou as mesmas 448 rotas e 2.688 visões, sem falhas e sem repetição de rotas. Nessa execução, CSS e JavaScript vieram do domínio, sem substituição por arquivos locais; o cache HTTP e o service worker foram ignorados apenas nas páginas da matriz. Vistorias separadas com entrega normal e service worker ativo confirmaram busca, fechamento e restauração de foco, filtros, quiz e barra de leitura com movimento reduzido.

As mudanças foram integradas pelos PRs [#171](https://github.com/alexandrebrt14-sys/geo-ipog/pull/171), [#172](https://github.com/alexandrebrt14-sys/geo-ipog/pull/172) e [#173](https://github.com/alexandrebrt14-sys/geo-ipog/pull/173). O último merge é `248cd79e747854e0471c15102643e436b0ec37d8`, registrado às 23h13 de 8 de setembro no horário de Brasília. O deploy correspondente é [34302364638](https://github.com/alexandrebrt14-sys/geo-ipog/actions/runs/34302364638).

O deploy final concluiu com sucesso às 23h17 de 8 de setembro, com build dos dois projetos, verificações de tipos do portal, contraste, endereços externos, links, scripts, smoke e integridade de cache aprovados. O artefato publicado está em [55d505c5.posgraduacaopsicologia.pages.dev](https://55d505c5.posgraduacaopsicologia.pages.dev/), associado ao domínio principal.

Após esse deploy, o clique nativo em Google Scholar foi repetido com os recursos HTTPS reais: em 360 × 640 px no tema escuro, o título ficou em 176,25 px e fragmento, foco e `aria-current` concordaram. A rolagem posterior selecionou a seção seguinte e o retorno restaurou Google Scholar. Escape fechou o índice e restaurou o foco. Em 1.080 × 540 px, a âncora ficou em 176,08 px e o último item do índice permaneceu dentro da lista; claro e escuro passaram. Não houve erros de execução ou requisição observados nessa vistoria final, registrada em `navigation/qa-production-final-248cd79e.json`.

A tentativa de cancelar um deploy intermediário foi rejeitada pela revisão automática por risco de interromper a publicação autorizada. A alternativa adotada foi deixar os deploys concluírem em sequência; nenhum cancelamento foi repetido.

A auditoria HTTP encontrou uma única resposta antiga no cache da CDN para `/ipog/marca/logo-ipog-branca.svg`: o SVG estava íntegro, mas o cabeçalho CSP presente na origem não aparecia na URL normal. O workflow operacional recebeu uma ação de purga de uma URL, com domínio HTTPS exato, validação antes da rede, JSON seguro e verificação de `success=true`. Sete testes cobrem a entrada, o pedido real simulado e falhas da API. A operação usa o [endpoint oficial de purga do Cloudflare](https://developers.cloudflare.com/api/resources/cache/methods/purge/) e não é acionada automaticamente pelo merge.

A [execução 34302656168](https://github.com/alexandrebrt14-sys/geo-ipog/actions/runs/34302656168) confirmou a purga exclusiva desse SVG. A consulta seguinte à URL normal retornou `MISS`, CSP completa e `no-transform`; os bytes permaneceram íntegros. As evidências anteriores e posteriores estão em `production/svg-after-deploy-248cd79.json` e `production/svg-after-purge-248cd79.json`. Não foi necessária outra purga.

O rastreamento final do merge `248cd79` fez 755 requisições: 446 HTML, 94 recursos, 96 payloads RSC e os demais arquivos e controles do inventário. Passaram 96/96 payloads RSC, 86/86 respostas 404 esperadas, 18/18 âncoras críticas, 10/10 fontes e 207/207 verificações de cabeçalhos. O service worker publicado corresponde byte a byte ao Git e passou nos 26 testes específicos; o CSS publicado corresponde ao artefato local. Resultado: zero falhas, zero desafios Cloudflare e saída 0. A execução está registrada em `production/run-20260909T021843Z/`.

O Lighthouse final usou quatro navegações desktop HTTPS, com uma execução por URL. As notas de acessibilidade, boas práticas e SEO foram 100 nas quatro páginas; o contraste passou e CLS foi zero. Os resultados de desempenho foram:

| Página | Performance | LCP | TBT |
|---|---:|---:|---:|
| Home | 100 | 581 ms | 14 ms |
| MBAs | 96 | 1.257 ms | 0 ms |
| Psicologia Organizacional e do Trabalho | 99 | 913 ms | 0 ms |
| Guia de implementação da NR-1 | 99 | 878 ms | 0 ms |

Uma execução por URL está sujeita a variação de ambiente. A coleta anterior desta mesma rodada registrou 98–100 em desempenho. Não houve `runtimeError` ou `runWarnings` nos quatro relatórios finais. Isso não significa que todas as assertions diagnósticas do preset passaram: restam 14 em nível `error` e 31 avisos. Doze assertions já existiam no baseline e tratam de CSS/JS não usados e cadeia de rede; duas adicionais em MBAs apontam reflow do Google Tag Manager (56,9 ms) e sugestão de preconnect ao Google Analytics (86 ms estimados). Foram registradas como diagnósticos de desempenho, sem falha funcional correspondente demonstrada. INP não foi medido nessa navegação. Os relatórios integrais, a comparação e os resultados das assertions estão em `lighthouse/34302364638/`.

O preview local foi encerrado pelo controlador ao terminar a vistoria. Nenhum servidor de desenvolvimento ficou como parte da entrega.

A matriz e as fixtures complementam a inspeção visual e a interação humana. Não certificam todos os comportamentos possíveis, nem substituem métricas de campo. As evidências brutas ficam em `psicologia-auditoria-5-waves-20260908/audit-round3/`, ao lado do clone: `design/`, `navigation/`, `discovery/`, `matrix-local-final.json`, `matrix-production-f71.json` e logs de build, estrutura e testes. A confirmação do domínio usa entrega HTTPS normal e fica registrada separadamente.
