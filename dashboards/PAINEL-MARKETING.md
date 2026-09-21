# Painel de marketing: leads, origem e funil

> **Status:** Fase 1 entregue em 14/09/2026, aguardando segredos e Cloudflare Access
> **Endereço:** `https://posgraduacaopsicologia.com/painel/`
> **Especificação de origem:** `ESPECIFICACAO-DASHBOARD-MARKETING.txt` (Gabriele Cavalcante, versão 2 de 03/09/2026)
> **Dona do painel:** Gabriele Cavalcante (IPOG). **Administração do repositório e do Cloudflare:** Alexandre Caramaschi (Brasil GEO)

Este documento é o manual de operação do painel. Ele explica o que está no ar, como o dado chega até a página, o que precisa ser configurado uma única vez e como mudar a cadência ou as metas sem abrir código.

## 1. O que o painel mostra hoje

A Fase 1 cobre o que o HubSpot já entrega sem nenhuma credencial nova de mídia:

- **Cartões do topo:** leads de hoje (até a última coleta), últimos 7 dias completos contra os 7 anteriores, mês atual, últimos 30 dias, leads com origem em LLM (ChatGPT, Gemini e afins) e contatos sem UTM. Investimento e CPL aparecem como pendentes da Fase 2.
- **Leads por dia e por canal:** 30 dias empilhados por canal, com tabela equivalente para leitura sem cor.
- **Tabela de canais:** hoje, 7 dias, 7 anteriores, variação, 30 dias e participação. As colunas de investimento, CPL e semáforo já existem e ficam preenchidas quando os coletores de mídia paga entrarem.
- **Funil:** Lead, MQL, SQL, Oportunidade e Cliente, por estágio alcançado nos últimos 30 dias, com taxa de passagem entre estágios.
- **Contatos sem UTM:** distribuição pela origem automática do HubSpot (`hs_analytics_source`).
- **Orgânico e portal:** bloco do GA4, preenchido quando o segredo do GA4 estiver no workflow.
- **Valores brutos de `utm_source`:** como cada grafia foi classificada, para a governança de UTM.
- **Fontes de dados:** o que está conectado e o que falta, com hora da última coleta.

"Leads" neste painel significa contatos criados no HubSpot no dia (propriedade `createdate`), no fuso de São Paulo. O estágio do funil é o estágio atual de cada contato, não o histórico de passagem. Quem está em Oportunidade passou por Lead, MQL e SQL, e é assim que a coluna "alcançou" é calculada. Lealdade e Churn contam como quem chegou a Cliente. O estágio Outro fica fora das taxas.

## 2. Como o dado chega à página

O painel segue o padrão do repositório: script Python coleta, GitHub Actions agenda, arquivos versionados, página estática no Cloudflare Pages.

```
scripts/collectors/collector_hubspot.py  ->  data/marketing/hubspot/latest.json (+ foto do dia)
scripts/collectors/collector_ga4.py      ->  data/marketing/ga4/latest.json
scripts/build_dashboard_data.py          ->  data/marketing/dashboard.json
dashboards/marketing/index.html          ->  lê dashboard.json e desenha tudo no navegador
```

Configuração lida pelo consolidador:

- `data/marketing/canais.json`: mapa de `utm_source` para canal. É aqui que `facebook`, `meta_ads` e `fb` viram "Meta Ads (Facebook)", e que as cinco grafias de Google Ads viram "Google Ads". Valor desconhecido cai em "E-mail, blog, site e outros". Também guarda os nomes dos estágios do funil, inclusive os três estágios personalizados do portal do IPOG (Outro, Lealdade, Churn).
- `data/marketing/metas.json`: meta de leads do mês e meta de CPL por canal. Está com valores nulos de propósito. Quando a meta for definida com o Bruno Azambuja, basta preencher o número e o painel passa a comparar sozinho.

Os coletores só gravam contagens. Nenhum nome, e-mail ou telefone sai do HubSpot.

## 3. Publicação: por que o painel não reconstrói o site

O deploy completo (`deploy-cloudflare-pages.yml`) constrói o site Astro, o portal Next em `/ipog` e agora também copia o painel para `site/dist/painel`, depois de gerar o sitemap, exatamente como faz com o portal. Esse build leva perto de quinze minutos e roda quando alguém altera o site, o portal ou a página do painel.

A atualização dos dados de hora em hora usa outro caminho, o workflow `painel-marketing.yml`:

1. Coleta HubSpot e GA4, gera o `dashboard.json` e faz commit em `data/marketing/` (mensagem com `[skip ci]`, para não disparar mais nada).
2. Restaura do cache do GitHub Actions o site exatamente como saiu do último deploy em produção (o deploy completo salva esse cache no fim de cada publicação).
3. Confere que o site e o portal estão inteiros no cache, troca somente a pasta `painel/` e verifica por hash que nada fora dela mudou.
4. Publica com o `wrangler pages deploy`. O Cloudflare reaproveita os arquivos de hash igual, então o `/ipog` volta ao ar byte a byte como estava.
5. Roda um smoke test na raiz, no `/ipog/` e no `/painel/`.

Se não houver cache (primeira vez, ou sete dias sem deploy), o workflow dispara o deploy completo, que monta o painel a partir do `dashboard.json` já commitado.

Custo: cerca de três minutos de GitHub Actions por execução. A cadência padrão é de hora em hora das 7h às 20h de segunda a sábado, a cada três horas na madrugada e quatro vezes aos domingos, cerca de 17 execuções por dia. Para 30 minutos em horário comercial, trocar a primeira linha de cron por `*/30 10-23 * * 1-6` e acompanhar a cota em Settings, Billing.

## 4. Configuração única (exige admin do repositório)

Em Settings, Secrets and variables, Actions:

| Nome | Tipo | Para quê | Situação |
|---|---|---|---|
| `HUBSPOT_PRIVATE_APP_TOKEN` | Secret | Coletor HubSpot. Private App com o escopo `crm.objects.contacts.read`, criada em Settings, Integrations, Private Apps do portal 48837477 | pendente |
| `GA4_SERVICE_ACCOUNT_JSON` | Secret | Coletor GA4 do portal. Já existe para o relatório semanal | existente |
| `GA4_PROPERTY_IPOG` | Variable | Propriedade GA4 do ipog.edu.br, quando o IPOG liberar leitura para a mesma service account | pendente |
| `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` | Secret | Publicação. Já existem para o deploy | existente |

Enquanto o token do HubSpot não entra, o workflow agendado falha no primeiro passo com uma mensagem clara e abre uma issue por dia com o rótulo `monitoramento`. O painel continua no ar com a última leitura commitada.

### Cloudflare Access (antes do merge)

O `/painel` fica num domínio público. O repositório já entrega três barreiras contra indexação: `noindex` na página, `X-Robots-Tag` no cabeçalho e `Disallow: /painel/` no `robots.txt`. Nenhuma delas impede que uma pessoa com o link abra a página. A proteção real é o Cloudflare Access, e a recomendação é ligá-lo antes de o painel ir para produção:

1. Cloudflare, Zero Trust, Access, Applications, Add an application, Self-hosted.
2. Domain: `posgraduacaopsicologia.com`, Path: `painel`. Marcar a aplicação para cobrir subcaminhos.
3. Policy: Allow, Include, Emails, com a lista da equipe (Brasil GEO, Gabriele Cavalcante, Bruno Azambuja, e Ronan Maia quando institucionalizar).
4. Método de login: One-time PIN por e-mail resolve sem integrar identidade.

O smoke test dos workflows aceita a resposta 302 do Access no `/painel/`, então ligar a proteção não quebra o deploy.

## 5. Rodar localmente

```
export HUBSPOT_PRIVATE_APP_TOKEN=pat-...
python scripts/collectors/collector_hubspot.py --dias 35
python scripts/build_dashboard_data.py
cp data/marketing/dashboard.json dashboards/marketing/dashboard.json
python -m http.server 8000 --directory dashboards/marketing
```

Abrir `http://localhost:8000/`. Apagar a cópia local do `dashboard.json` antes de commitar (a página em produção lê o arquivo copiado pelo workflow). O coletor do GA4 é opcional e precisa de `pip install google-analytics-data` e da variável `GOOGLE_APPLICATION_CREDENTIALS`.

## 6. Carga inicial de 14/09/2026

A primeira leitura versionada em `data/marketing/hubspot/2026-09-14.json` não veio do coletor, e sim de consultas feitas no mesmo dia pela integração oficial do HubSpot, no mesmo portal e com os mesmos cortes (contatos criados por dia, por `utm_source`, por `lifecyclestage` e por `hs_analytics_source` para quem chegou sem UTM). A janela é de 15/08 a 14/09/2026, com 22.662 contatos. Na primeira execução do coletor esse arquivo é substituído pela leitura da API.

Leitura dessa carga, para orientar a Fase 2:

- Meta Ads (Facebook) responde por 52% dos contatos com UTM nos 30 dias completos até 13/09. Sem UTM: 31%.
- Dois dias com pico atípico de contatos sem UTM e no estágio Outro (09/09 e 11/09) parecem importação em lote no CRM, não captação. Vale confirmar com a equipe do HubSpot do IPOG antes de ler tendência nesses dias.
- LLM/GEO: 129 contatos em 30 dias com `utm_source` de ChatGPT e Gemini, o que confirma o canal como mensurável.

## 7. Próximas fases

- **Fase 2:** coletores de Meta Ads e Google Ads (`scripts/collectors/collector_meta.py` e `collector_gads.py`) gravando em `data/marketing/{meta,gads}/latest.json`. O consolidador já reserva as chaves de investimento, impressões, cliques, CTR, CPL e semáforo por canal; a página já desenha essas colunas.
- **LinkedIn:** CSV manual do Campaign Manager em `data/marketing/linkedin/` até a aprovação da API.
- **Governança de UTM:** o bloco "Valores brutos de utm_source" mostra o que precisa ser padronizado na origem. O padrão proposto está na seção 5 da especificação.
- **Decisões em aberto (seção 10 da especificação):** recorte por produto (só Psicologia ou IPOG inteiro), qual blog entra, e quem assume a padronização de UTM nas campanhas ativas.
