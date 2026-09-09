# Auditoria de robustez do frontend: segunda rodada

A segunda rodada corrigiu dependências que eram carregadas antes do uso e preservou caminhos de navegação quando o JavaScript ou o armazenamento falham. Na verificação local de 8 de setembro de 2026, a busca abriu com a consulta “neuro”, recuperou o foco ao fechar e manteve um formulário utilizável quando o arquivo do modal foi bloqueado. O build e os testes descritos abaixo passaram. A matriz ampliada de navegador continua em execução; a publicação desta rodada ainda está pendente.

O ponto de partida é o commit `085ebe9`, posterior à [primeira auditoria](frontend-2026-09-08.md). As cinco ondas desta rodada cobrem carregamento, service worker, melhoria progressiva, prevenção de regressões e liberação. As métricas da primeira rodada permanecem no relatório original e não são reapresentadas como verificações concluídas desta versão.

## Onda 1: fontes, antecipação de navegação e busca sob demanda

O portal passou a servir as fontes Exo e Inter pela própria origem. O conjunto de dez arquivos WOFF2 soma 267.016 bytes; os dois arquivos críticos antecipados pelo HTML somam 70.084 bytes. Os demais subconjuntos ficam disponíveis conforme a necessidade do texto. O carregamento inicial desktop observado no navegador buscou as duas fontes locais. As referências a Google Fonts saíram do layout, e os arquivos de fontes e recursos com hash receberam regras de cache imutável no artefato de publicação.

A estratégia padrão de prefetch do Astro mudou de entrada na área visível para intenção por hover ou foco. O bloco adicional de prerender por Speculation Rules foi removido. Isso reduz a antecipação de documentos durante a leitura sem criar uma segunda política de navegação paralela. A validação dos cabeçalhos efetivamente servidos pela hospedagem pertence à quinta onda.

A busca tinha um custo próprio antes de qualquer pesquisa: o overlay e seu índice somavam 258.623 bytes no build anterior, descontadas as dependências compartilhadas. O novo `SearchLauncher` importa o modal somente após clique ou atalho. No build local, o lançador tem 5.077 bytes, e a sua árvore de imports estáticos soma 13.697 bytes em quatro módulos. Essa árvore inclui React, JSX e o utilitário de preload, mas não inclui o renderer React carregado pelo Astro. Esses números descrevem arquivos do build; não representam o tráfego total da página nem uma medida de latência.

O gate percorreu a árvore sintática dos imports e reexports estáticos e confirmou que overlay, índice e motion ficaram fora dela. A navegação móvel também passou a hidratar somente no breakpoint abaixo de 1.024 px. No carregamento desktop sem cache inspecionado, não houve requisição inicial do overlay, do índice, de `MobileBottomNav` ou de motion. A mudança de largura foi testada para conferir a ativação posterior da interface móvel.

Os gatilhos de busca agora oferecem links reais para `/busca/` antes da hidratação. Depois de inicializado, o lançador intercepta apenas cliques simples e preserva os modificadores usados para abrir outra aba. Cliques repetidos compartilham a importação pendente; a consulta digitada durante a carga acompanha a abertura do modal. Escape, navegação Astro e desmontagem invalidam aberturas tardias, e outro diálogo aberto impede concorrência entre modais.

A vistoria no navegador confirmou pesquisa por “neuropsicologia”, foco, Escape, CtrlK e mudança de breakpoint. Em uma falha deliberada do arquivo do modal, o formulário GET de busca completa permaneceu disponível com “avaliação” preservada no campo. Esse caso orienta o critério da correção: adiar a carga pode economizar recursos, desde que a primeira ativação e a recuperação da falha continuem utilizáveis.

## Onda 2: resiliência do service worker

O service worker recebeu isolamento de caches e recuperação explícita de falhas. A ativação remove somente versões próprias do namespace `pp-portal-` e o legado conhecido `pp-v1`, preservando caches de outras aplicações na mesma origem. Home e página offline ficam separadas dos recursos com hash e dos arquivos revalidados. Os limites de 128 e 64 entradas controlam a quantidade armazenada; não são limites de bytes.

As navegações priorizam a rede e preservam corpo e status das respostas HTTP 404 e 500. Quando a rede falha ou ultrapassa o prazo de seis segundos, o worker tenta a cópia própria, a página offline e um HTML mínimo com status 503. A corrida de promessas cobre o caso em que a requisição ignora o sinal de cancelamento. Falhas de quota, abertura, leitura, gravação ou poda do cache não descartam uma resposta disponível da rede.

Payloads RSC do Next, JSON e outros dados mutáveis seguem a requisição nativa. O mesmo vale para terceiros, métodos diferentes de GET e solicitações com `Range`, `Authorization` ou `no-store`. Respostas privadas, parciais, sem permissão de cache ou com HTML indevido no lugar de um recurso não são persistidas. A revalidação faz uma única consulta à rede e mantém sua promessa ligada ao evento do worker.

Os 26 cenários de `check-service-worker.mjs` passaram sobre o código real em uma VM do Node, com Fetch API nativa e Cache API controlada. A bateria inclui migração, offline, status HTTP, timeout, quota, poda simultânea, instalação parcial e ativação. A validação do worker obtido do domínio publicado permanece reservada à quinta onda.

## Onda 3: melhoria progressiva e acessibilidade

O HTML inicial passou a oferecer conteúdo útil antes de qualquer animação ou hidratação. No teste local com JavaScript desativado, 17 elementos de revelação permaneceram visíveis, os quatro resultados do seletor de modalidade estavam disponíveis por links de fragmento e os contadores exibiam valores úteis. A classe que oculta temporariamente os elementos de revelação agora depende da inicialização do observador.

O `DecisionPicker` oferece links e resultados no HTML inicial. Depois de inicializado, ativa seleção única, regiões nomeadas, anúncio da modalidade e seleção por Espaço. Também respeita movimento reduzido, conserva Tab e evita duplicação de listeners na reentrada por navegação Astro. O teste durável cobre sete grupos de comportamento e reconhece fragmentos iniciais válidos e desconhecidos. A revisão independente encontrou uma lacuna no fallback global da busca: ele precisava rejeitar Alt e composição de texto. A correção em `Base.astro` recebeu testes do listener real com Ctrl e Cmd, composição, Alt, evento já tratado, fallback antes de hidratar, interface hidratada e presença de outro modal.

O `GlossaryTooltip` recebeu correções preventivas: o componente ainda não é importado pelas páginas publicadas. A revisão corrigiu conflito entre foco e clique, fechamento por saída do ponteiro apesar de foco interno, Escape e retorno ao gatilho. O conteúdo conserva um link real antes de hidratar, com posição limitada à área visível. Os destinos usam o catálogo existente: 19 termos apontam para verbetes válidos, e três seguem para a busca interna. Foram verificados 64 casos de HTML gerado pelo servidor, incluindo aliases e texto personalizado; essa cobertura não equivale a uma vistoria de todas as interações nativas de um tooltip no navegador.

Os componentes de dados também receberam ajustes pontuais: `CompareTable` evita anúncio duplicado de um estado já expresso no texto, e `KpiCard` corrige a acentuação do rótulo de tendência estável. `MiniBar` foi revisado nesta rodada e conservou a tabela equivalente acessível introduzida anteriormente.

## Onda 4: gates e regressão local

O build Astro final passou, e o gate estrutural do artefato consolidado não encontrou links, âncoras ou recursos ausentes. Os registros locais de 8 de setembro de 2026 delimitam a cobertura:

| Verificação | Resultado local |
|---|---|
| Build Astro final | Aprovado |
| Checagem Astro | 486 arquivos, zero erro e zero warning; permanecem 1.159 hints |
| Estrutura do artefato consolidado | 451 HTML, 77.243 ocorrências de links internos e 6.512 referências a recursos locais, incluindo duas folhas CSS |
| H1, landmark principal e IDs | Válidos em todas as páginas do gate estrutural |
| Sintaxe de scripts inline | 451 HTML, 2.302 instâncias e 130 conteúdos únicos; zero erro de sintaxe |
| Lançador da busca | 16 cenários aprovados |
| Service worker | 26 cenários aprovados |
| Fixtures Python do gate de links e recursos CSS | Seis cenários aprovados |
| Scanner de imports da busca | Três fixtures aprovadas e gate do build aprovado |
| Melhoria progressiva | 64 casos de HTML do tooltip, sete grupos do seletor e guardas de Ctrl/Cmd aprovados |
| Workflows | YAML válido, gates únicos e ordem de execução conferida |

Os workflows [gates-seo-geo.yml](../.github/workflows/gates-seo-geo.yml) e [deploy-cloudflare-pages.yml](../.github/workflows/deploy-cloudflare-pages.yml) executam as fixtures Python e os testes do worker, do lançador e do scanner antes do build. A árvore estática da busca e os componentes progressivos são verificados após gerar `dist`. Os filtros de caminhos incluem os dois scripts Python envolvidos, para que uma alteração nesses verificadores também execute o CI.

O gate estrutural completo continua no deploy, depois de montar o export institucional em `/ipog`. O workflow de PR, que constrói somente o Astro, executa as fixtures do verificador, mas não exige recursos de um export Next que ele não produz. A validação sintática dos scripts inline permanece na etapa consolidada de publicação.

## Onda 5: matriz ampliada e liberação

A matriz local completou 448 rotas × três larguras (360, 768 e 1.440 px) × dois temas, totalizando 2.688 visões. Após repetir um carregamento interrompido de /roadmap/, não restaram falhas nas verificações de largura, H1, main, imagens, recursos internos e erros de JavaScript observados. Os fluxos de hidratação e foco foram ensaiados separadamente.

O transporte local apresentou uma limitação reproduzida com e sem service worker: algumas respostas CSS terminaram em 65.280 dos 104.632 bytes esperados. A causa não foi determinada; o controlador estava ativo e não continha limite correspondente. Para concluir a inspeção do artefato, a matriz recebeu o CSS integral do build por interceptação e ignorou o worker via CDP. Essa execução valida a renderização do artefato, e não comprova a entrega pelo servidor. A entrega HTTPS normal e o worker publicado serão verificados após o deploy. A evidência está em audit-round2/matrix-local-final.json.

O verificador HTTP de produção está preparado para comparar a versão publicada com o commit do merge. Seu escopo inclui páginas, sitemaps, recursos, fontes locais, rotas inexistentes, payloads RSC e o worker servido pelo domínio. Também verificará os cabeçalhos de cache, `no-transform` em `/ipog/` e a preservação da CSP institucional da base `085ebe9`. A configuração local desses cabeçalhos não comprova, por si só, a resposta da hospedagem.

Continuam válidos os limites metodológicos registrados na primeira auditoria: medições estruturais e fixtures complementam a vistoria visual e as interações, sem certificar todos os comportamentos possíveis. Os nomes dos payloads RSC produzidos pelo Next no Windows diferem do export Linux usado no deploy; uma falha restrita a essa representação local exige comparação com o artefato Linux. A inspeção de recursos internos também distingue mensagens de telemetria externa de falhas de execução da aplicação.

As evidências brutas desta rodada ficam em `psicologia-auditoria-5-waves-20260908/audit-round2/`, ao lado do clone e fora do Git. `build-astro-final.log`, `check-astro.log` e `structural-final.json` sustentam as verificações do artefato; `search/` guarda os grafos de imports, testes e validação dos workflows; `cache/` e `accessibility/` registram as baterias específicas. `production/` contém o verificador preparado e a baseline de comparação, sem representar aprovação online desta versão.

Para encerrar a rodada, o orquestrador deve anexar o resultado final da matriz, a identificação do merge, o workflow de deploy concluído e os retestes no domínio. O critério de fechamento retoma o caso da busca: o usuário precisa conseguir consultar o portal na versão publicada, inclusive quando o carregamento opcional falha.
