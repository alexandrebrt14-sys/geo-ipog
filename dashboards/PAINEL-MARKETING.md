# Acervo histórico do painel de marketing IPOG

O [painel público](https://posgraduacaopsicologia.com/painel/) preserva a leitura de 14/09/2026. Em 15/10/2026, Alexandre Caramaschi definiu que o acervo deve continuar público, datado e sem atualização automática.

## Dados preservados

`data/marketing/dashboard.json` mantém os valores originais, consolidados em 14/09/2026 às 16h49, no horário de Brasília. A coleta do HubSpot ocorreu às 15h40. A referência diária é 14/09/2026; os sete dias completos vão de 07 a 13/09 e os trinta dias completos, de 15/08 a 13/09/2026.

Os arquivos de origem em `data/marketing/hubspot/`, o mapa de canais e as metas foram preservados sem alteração. Os dados disponíveis são agregados. Campos sem GA4, investimento ou CPL continuam identificados como ausentes; nenhum valor foi estimado.

“Leads” significa contatos criados no HubSpot, pela propriedade `createdate`, no fuso de São Paulo. O funil usa o estágio registrado na coleta, sem histórico individual de transições. Lealdade e Churn contam como quem chegou a Cliente; o estágio Outro fica fora das taxas.

## Operação atual

A página lê o JSON uma vez ao abrir. Não há atualização periódica no navegador nem rotina de coleta do painel em `.github/workflows/`. O workflow anterior e o manual antigo estão em [arquivo-marketing-2026](arquivo-marketing-2026/README.md), como referência.

O deploy completo copia o HTML e o JSON preservados para `/painel/`, após montar a raiz e o portal `/ipog/`. A etapa que guardava uma cópia completa do site em cache para o coletor foi retirada. Não executar `scripts/build_dashboard_data.py` para republicar o acervo: esse script recalcula janelas pela data corrente.

Os workflows do repositório permanecem desabilitados; uma publicação de manutenção pode habilitar apenas o workflow de deploy pelo tempo necessário e desabilitá-lo ao terminar. Nenhuma rotina do Worker compartilhado da Brasil GEO faz parte desta mudança.

## Publicação e conferência

A página é pública por decisão do responsável, mas mantém `noindex`, os cabeçalhos existentes e a exclusão do sitemap. Esses controles de indexação não representam autenticação.

Para conferir uma publicação, verificar o aviso “Acervo histórico público de 14/09/2026.” e a ausência da frase “A página recarrega os dados a cada 5 minutos.” Comparar o SHA-256 de `/painel/dashboard.json` com o blob Git preservado ou com o artefato de produção anterior e testar a raiz do site e `/ipog/`. O checkout Windows pode converter as quebras de linha para CRLF; por isso, ele não é a referência para comparar bytes servidos pelo build Linux.

A publicação de 15/10/2026 parte do commit `31ae7614c6952768a2b80e3e97846b2d10d89fcb`, confirmado no Cloudflare como base em produção. Aplica somente a manutenção do acervo, sem incluir a página `/ipogcompleto/` pendente na `main`. Essa página exige revisão própria antes de uma futura publicação completa.
