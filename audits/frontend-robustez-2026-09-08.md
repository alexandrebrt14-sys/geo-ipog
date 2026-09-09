# Auditoria de robustez do frontend: segunda rodada

A segunda rodada corrigiu dependências que eram carregadas antes do uso e preservou caminhos de navegação quando o JavaScript ou o armazenamento falham. Na verificação local de 8 de setembro de 2026, a busca abriu com a consulta “neuropsicologia”, recuperou o foco ao fechar e manteve um formulário utilizável quando o arquivo do modal foi bloqueado. O build, os testes e os dois deploys desta rodada passaram. A versão final publicada pelo merge `402e5f64d1f38b119f5273de2072321db2ba6bc1` também aprovou o contrato HTTP do worker e de uma fonte crítica, além dos fluxos de busca e navegação descritos abaixo.

O ponto de partida é o commit `085ebe9`, posterior à [primeira auditoria](frontend-2026-09-08.md). As cinco ondas desta rodada cobrem carregamento, service worker, melhoria progressiva, prevenção de regressões e liberação. As métricas da primeira rodada permanecem no relatório original e não são reapresentadas como verificações concluídas desta versão.

## Onda 1: fontes, antecipação de navegação e busca sob demanda

O portal passou a servir as fontes Exo e Inter pela própria origem. O conjunto de dez arquivos WOFF2 soma 267.016 bytes; os dois arquivos críticos antecipados pelo HTML somam 70.084 bytes. Os demais subconjuntos ficam disponíveis conforme a necessidade do texto. O carregamento inicial desktop observado no navegador buscou as duas fontes locais. As referências a Google Fonts saíram do layout, e os arquivos de fontes e recursos com hash receberam regras de cache imutável no artefato de publicação.

A estratégia padrão de prefetch do Astro mudou de entrada na área visível para intenção por hover ou foco. O bloco adicional de prerender por Speculation Rules foi removido. Isso reduz a antecipação de documentos durante a leitura sem criar uma segunda política de navegação paralela. Os cabeçalhos efetivamente servidos pela hospedagem foram conferidos na quinta onda.

A busca tinha um custo próprio antes de qualquer pesquisa: o overlay e seu índice somavam 258.623 bytes no build anterior, descontadas as dependências compartilhadas. O novo `SearchLauncher` importa o modal somente após clique ou atalho. No build local, o lançador tem 5.077 bytes, e a sua árvore de imports estáticos soma 13.697 bytes em quatro módulos. Essa árvore inclui React, JSX e o utilitário de preload, mas não inclui o renderer React carregado pelo Astro. Esses números descrevem arquivos do build; não representam o tráfego total da página nem uma medida de latência.

O gate percorreu a árvore sintática dos imports e reexports estáticos e confirmou que overlay, índice e motion ficaram fora dela. A navegação móvel também passou a hidratar somente no breakpoint abaixo de 1.024 px. No carregamento desktop sem cache inspecionado, não houve requisição inicial do overlay, do índice, de `MobileBottomNav` ou de motion. A mudança de largura foi testada para conferir a ativação posterior da interface móvel.

Os gatilhos de busca agora oferecem links reais para `/busca/` antes da hidratação. Depois de inicializado, o lançador intercepta apenas cliques simples e preserva os modificadores usados para abrir outra aba. Cliques repetidos compartilham a importação pendente; a consulta digitada durante a carga acompanha a abertura do modal. Escape, navegação Astro e desmontagem invalidam aberturas tardias, e outro diálogo aberto impede concorrência entre modais.

A vistoria no navegador confirmou pesquisa por “neuropsicologia”, foco, Escape, CtrlK e mudança de breakpoint. Em uma falha deliberada do arquivo do modal, o formulário GET de busca completa permaneceu disponível com “avaliação” preservada no campo. Esse caso orienta o critério da correção: adiar a carga pode economizar recursos, desde que a primeira ativação e a recuperação da falha continuem utilizáveis.

## Onda 2: resiliência do service worker

O service worker recebeu isolamento de caches e recuperação explícita de falhas. A ativação remove somente versões próprias do namespace `pp-portal-` e o legado conhecido `pp-v1`, preservando caches de outras aplicações na mesma origem. Home e página offline ficam separadas dos recursos com hash e dos arquivos revalidados. Os limites de 128 e 64 entradas controlam a quantidade armazenada; não são limites de bytes.

As navegações priorizam a rede e preservam corpo e status das respostas HTTP 404 e 500. Quando a rede falha ou ultrapassa o prazo de seis segundos, o worker tenta a cópia própria, a página offline e um HTML mínimo com status 503. A corrida de promessas cobre o caso em que a requisição ignora o sinal de cancelamento. Falhas de quota, abertura, leitura, gravação ou poda do cache não descartam uma resposta disponível da rede.

Payloads RSC do Next, JSON e outros dados mutáveis seguem a requisição nativa. O mesmo vale para terceiros, métodos diferentes de GET e solicitações com `Range`, `Authorization` ou `no-store`. Respostas privadas, parciais, sem permissão de cache ou com HTML indevido no lugar de um recurso não são persistidas. A revalidação faz uma única consulta à rede e mantém sua promessa ligada ao evento do worker.

Os 26 cenários de `check-service-worker.mjs` passaram sobre o código real em uma VM do Node, com Fetch API nativa e Cache API controlada. A bateria inclui migração, offline, status HTTP, timeout, quota, poda simultânea, instalação parcial e ativação. A mesma bateria foi executada sobre o worker obtido do domínio publicado; a verificação de seu contrato HTTP está documentada na quinta onda.

## Onda 3: melhoria progressiva e acessibilidade

O HTML inicial passou a oferecer conteúdo útil antes de qualquer animação ou hidratação. No teste local com JavaScript desativado, 17 elementos de revelação permaneceram visíveis, os quatro resultados do seletor de modalidade estavam disponíveis por links de fragmento e os contadores exibiam valores úteis. A classe que oculta temporariamente os elementos de revelação agora depende da inicialização do observador.

O `DecisionPicker` oferece links e resultados no HTML inicial. Depois de inicializado, ativa seleção única, regiões nomeadas, anúncio da modalidade e seleção por Espaço. Também respeita movimento reduzido, conserva Tab e evita duplicação de listeners na reentrada por navegação Astro. O teste durável cobre sete grupos de comportamento e reconhece fragmentos iniciais válidos e desconhecidos. A revisão independente encontrou uma lacuna no fallback global da busca: ele precisava rejeitar Alt e composição de texto. A correção em `Base.astro` recebeu testes do listener real com Ctrl e Cmd, composição, Alt, evento já tratado, fallback antes de hidratar, interface hidratada e presença de outro modal.

O `GlossaryTooltip` recebeu correções preventivas: o componente ainda não é importado pelas páginas publicadas. A revisão corrigiu conflito entre foco e clique, fechamento por saída do ponteiro apesar de foco interno, Escape e retorno ao gatilho. O conteúdo conserva um link real antes de hidratar, com posição limitada à área visível. Os destinos usam o catálogo existente: 19 termos apontam para verbetes válidos, e três seguem para a busca interna. Foram verificados 64 casos de HTML gerado pelo servidor, incluindo aliases e texto personalizado; essa cobertura não equivale a uma vistoria de todas as interações nativas de um tooltip no navegador.

Os componentes de dados também receberam ajustes pontuais: `CompareTable` evita anúncio duplicado de um estado já expresso no texto, e `KpiCard` corrige a acentuação do rótulo de tendência estável. `MiniBar` foi revisado nesta rodada e conservou a tabela equivalente acessível introduzida anteriormente.

A confirmação online também resolveu um alerta de contraste nos links do rodapé. O Lighthouse associava fundo branco a elementos fora da área visível enquanto o rodapé usava `content-visibility:auto`; no navegador, o fundo real era `#0A1A33`. O contraste do amarelo `#F5B400` sobre esse fundo é 9,44:1. A correção removeu a renderização adiada do rodapé e preservou as cores. O snapshot desktop intermediário aprovou acessibilidade com nota 100, e o deploy final confirmou o resultado nas navegações completas do CI.

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
| Contrato HTTP publicado | Dez fixtures e dois contratos aprovados no deploy final |
| Workflows | YAML válido, gates únicos e ordem de execução conferida |

Os workflows [gates-seo-geo.yml](../.github/workflows/gates-seo-geo.yml) e [deploy-cloudflare-pages.yml](../.github/workflows/deploy-cloudflare-pages.yml) executam as fixtures Python e os testes do worker, do lançador e do scanner antes do build. A árvore estática da busca e os componentes progressivos são verificados após gerar `dist`. Os filtros de caminhos incluem os dois scripts Python envolvidos, para que uma alteração nesses verificadores também execute o CI.

O gate estrutural completo continua no deploy, depois de montar o export institucional em `/ipog`. O workflow de PR, que constrói somente o Astro, executa as fixtures do verificador, mas não exige recursos de um export Next que ele não produz. A validação sintática dos scripts inline permanece na etapa consolidada de publicação.

## Onda 5: publicação e confirmação online

A matriz local completou 448 rotas × três larguras (360, 768 e 1.440 px) × dois temas, totalizando 2.688 visões. Após repetir um carregamento interrompido de `/roadmap/`, não restaram falhas nas verificações de largura, H1, main, imagens, recursos internos e erros de JavaScript observados. Os fluxos de hidratação e foco foram ensaiados separadamente.

O transporte local apresentou uma limitação reproduzida com e sem service worker: algumas respostas CSS terminaram em 65.280 dos 104.632 bytes esperados, com espera registrada de cerca de 19 segundos. A causa não foi determinada; o controlador estava ativo e não continha limite correspondente. Para concluir a inspeção do artefato, a matriz recebeu os mesmos bytes do CSS integral do build por interceptação e ignorou o worker via CDP. Essa execução valida a renderização do artefato, sem comprovar a entrega pelo servidor. A entrega HTTPS normal e o worker foram verificados separadamente no domínio publicado. O resultado local está em `audit-round2/matrix-local-final.json`.

O [PR #169](https://github.com/alexandrebrt14-sys/geo-ipog/pull/169) integrou o commit `342d49f6d25bf9c7e1955de361f0afd347f5920e` pelo merge `d2bc9ef7290b3eb9adade1d0514d3fa5f63d7890`, às 21h24min12s de 8 de setembro de 2026, horário de Brasília. O [deploy 34294862683](https://github.com/alexandrebrt14-sys/geo-ipog/actions/runs/34294862683) terminou com sucesso e produziu o artefato [4bd5d698.posgraduacaopsicologia.pages.dev](https://4bd5d698.posgraduacaopsicologia.pages.dev/).

O crawl dessa primeira entrega fez 754 requisições e conferiu 446 HTML, 93 recursos, 96 payloads RSC, 86 respostas 404 esperadas, 18 âncoras críticas, dez fontes e 206 verificações de cabeçalhos. Encontrou uma falha adicional no cache do `/sw.js`: o GET normal recebia `public, max-age=14400, s-maxage=3600`, embora a regra específica pretendesse evitar esse armazenamento. Os demais critérios do crawl passaram, incluindo a bateria de 26 cenários executada sobre os bytes do worker publicado.

A correção removeu o TTL global do arquivo de cabeçalhos e definiu `no-store, max-age=0` para o worker. O [PR #170](https://github.com/alexandrebrt14-sys/geo-ipog/pull/170) reuniu esse ajuste, a correção de renderização do rodapé e o gate HTTP durável no commit `be69f3c`, integrado pelo merge `402e5f64d1f38b119f5273de2072321db2ba6bc1` às 21h45min40s de 8 de setembro de 2026, horário de Brasília. O [deploy 34296375086](https://github.com/alexandrebrt14-sys/geo-ipog/actions/runs/34296375086) terminou com sucesso em três minutos e 39 segundos, com artefato em [acf90a0e.posgraduacaopsicologia.pages.dev](https://acf90a0e.posgraduacaopsicologia.pages.dev/).

O novo [check-published-cache.mjs](../scripts/check-published-cache.mjs) executou dez fixtures e aprovou os dois contratos HTTP no domínio oficial durante o deploy final. Ele usa GET normal, sem parâmetros para contornar cache, exige HTTP 200 e compara os bytes do worker com o código-fonte, normalizando somente CRLF. Também rejeita `public` e prazos positivos de cache no worker. Para a fonte latin escolhida do manifesto, exige cache imutável por pelo menos um ano, hash correspondente e igualdade binária com o arquivo local. O passo é bloqueante, ocorre depois do smoke test e se restringe a publicações de produção, com timeout de dez segundos e até três tentativas.

A leitura independente do `/sw.js` às 21h52 de Brasília confirmou HTTP 200, tipo JavaScript, `Cache-Control: no-store, max-age=0`, `CF-Cache-Status: BYPASS` e 7.429 bytes. O SHA-256 publicado foi `7eab43358a323648424f5e44ed7a2e3352e7d48f48bd89448c77057d4071c36e`. A fonte crítica também aprovou os cabeçalhos de um ano, o hash e os bytes locais. O teste negativo anterior havia reprovado o worker nas três tentativas; o sucesso final corresponde à política corrigida efetivamente recebida pela rede.

No navegador, a navegação normal HTTPS com o service worker ativo recebeu o novo CSS com identificador `CJiYKI6F` e as fontes locais carregadas. O CSS final tem 104.529 bytes e hash igual ao artefato. A home respondeu `public, max-age=0, must-revalidate`, com `CF-Cache-Status: DYNAMIC`. A abertura desktop continuou sem requisição inicial de `SearchOverlay`, índice de busca, `MobileBottomNav` ou motion. A busca por “neuropsicologia” apresentou 25 resultados; Escape devolveu o foco, o resultado levou à rota de neuropsicologia e o menu móvel “Mais” funcionou. Esses fluxos não registraram erros de execução da página.

Os relatórios Lighthouse do deploy final cobrem quatro navegações desktop em Chrome Headless 152/Linux. A pontuação de acessibilidade passou de 96 para 100 em cada URL; o indicador binário de contraste passou de zero para um. Boas práticas e SEO tiveram nota 100 nas quatro páginas. O comparativo preserva o ambiente da coleta anterior:

| Página | Acessibilidade final | Performance final | Boas práticas | SEO | CLS |
|---|---:|---:|---:|---:|---:|
| `/` | 100 | 99 | 100 | 100 | 0 |
| `/mbas/` | 100 | 99 | 100 | 100 | 0 |
| `/areas/psicologia-organizacional-trabalho/` | 100 | 99 | 100 | 100 | 0 |
| `/guias/implementar-nr1-em-empresa/` | 100 | 100 | 100 | 100 | 0 |

Cada valor de performance vem de uma execução por URL, sem representar média estatística. O snapshot intermediário avaliou a página já aberta e não mediu a navegação inicial. INP não foi medido nessas navegações sem interação. As oportunidades restantes de CSS e JavaScript não utilizados, tamanho do DOM e bloqueio de renderização são anotações do preset; elas não constituem, por si, falhas funcionais de layout. O recurso externo `static.cloudflareinsights.com` permaneceu no aviso de duração de cache, sem recursos próprios nesse aviso.

| Consolidação independente da versão final | Resultado |
|---|---|
| Matriz de navegador online | 448 rotas × três larguras × dois temas = 2.688 visões; zero falhas de largura, H1/main, imagens, recursos internos ou JavaScript nas verificações executadas. |
| Crawl HTTP final do merge `402e5f64d1f38b119f5273de2072321db2ba6bc1` | Aprovado: 754 requisições, 446 HTML e 93 recursos; zero falhas e zero desafios Cloudflare |

Na matriz online, o CSS foi entregue normalmente pelo HTTPS, com fontes aguardadas. A matriz isolou cache HTTP, service worker e telemetria somente nos alvos de teste; os fluxos normais com o worker ativo foram verificados separadamente. A evidência está em `audit-round2/matrix-production-final.json`.

O crawl final, em `production/run-20260909T005057Z/`, terminou com código de saída zero: 668 respostas HTTP 200 e 86 respostas HTTP 404 esperadas. Conferiu 22 sitemaps e 451 URLs declaradas, aprovou 96 payloads RSC, 18 âncoras críticas e as dez fontes com hash e referência CSS. As 423 páginas Astro verificadas apresentaram preloads locais, e as 206 verificações de cabeçalhos passaram. O worker obtido do domínio foi idêntico ao Git e aprovou os 26 testes de VM. As nove comparações GET/HEAD entre domínio e origem de publicação confirmaram a política `no-store, max-age=0`; as respostas do domínio indicaram `BYPASS` no cache da Cloudflare.

Continuam válidos os limites metodológicos registrados na primeira auditoria: medições estruturais e fixtures complementam a vistoria visual e as interações, sem certificar todos os comportamentos possíveis. Os nomes dos payloads RSC produzidos pelo Next no Windows diferem do export Linux usado no deploy; uma falha restrita a essa representação local exige comparação com o artefato Linux. A inspeção de recursos internos também distingue mensagens de telemetria externa de falhas de execução da aplicação.

As evidências brutas desta rodada ficam em `psicologia-auditoria-5-waves-20260908/audit-round2/`, ao lado do clone e fora do Git. `build-astro-final.log`, `check-astro.log` e `structural-final.json` sustentam as verificações do artefato; `search/` guarda os grafos de imports, testes e validação dos workflows; `cache/` e `accessibility/` registram as baterias específicas. `contrast/RELATORIO-FINAL.md`, `contrast/comparison.json` e `contrast/final-deploy/` sustentam a correção do rodapé e os resultados Lighthouse.

Os logs `production/deploy-34294862683-full.log` e `production/deploy-34296375086-full.log` registram os dois deploys. `production/run-20260909T002857Z/summary.json` conserva o crawl da primeira entrega, inclusive a falha de cache identificada; `production/sw-header-comparison-20260909T003336Z.json` e `production/sw-header-final-20260909T005219Z.json` permitem comparar os cabeçalhos antes e depois do ajuste. O crawl final está consolidado em `production/run-20260909T005057Z/summary.json` e `production/FINAL-402e5f64.md`. O preview local foi encerrado pelo controlador, com estado `stopped` confirmado para o PID 78664.
