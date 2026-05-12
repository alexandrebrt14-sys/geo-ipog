# SEO indexing — posgraduacaopsicologia.com

> **Status:** ativo desde 11/05/2026.
>
> **Aplicabilidade:** todas as rotas geradas pelo build Astro do projeto. Atualizar sempre que adicionar 5+ páginas novas, mudar estrutura de sitemap ou trocar de propriedade GSC.

## Resumo da arquitetura

| Camada | Onde mora | Função |
| --- | --- | --- |
| Sitemap XML | `site/scripts/gen-sitemap.mjs` → `site/dist/sitemap.xml` | Lista todas as rotas para Google, Bing, Yandex e crawlers |
| Sitemap HTML | `site/src/pages/mapa-do-site.astro` → `/mapa-do-site` | Mapa visível para usuários e crawlers que não processam XML |
| `sitemap-index.xml` | Gerado por `gen-sitemap.mjs` | Aponta para o `sitemap.xml`. Útil quando há múltiplos sitemaps |
| robots.txt | `site/public/robots.txt` | Aponta para o `sitemap-index.xml` |
| IndexNow key | `site/public/<key>.txt` | Chave 32 caracteres que valida posse do domínio nos motores de busca |
| IndexNow ping | execução manual via `curl` (ver runbook) | Notifica Bing, Yandex e IndexNow.org de URLs novas/atualizadas |
| Schema.org JSON-LD | Em cada página Astro | `Article`, `BreadcrumbList`, `FAQPage`, `EducationalOccupationalProgram`, `DefinedTermSet` |
| Open Graph + Twitter Card | `site/src/layouts/Base.astro` | Imagem 1200x630 `og-image.jpg` para preview em redes |

## Google Search Console

| Item | Valor |
| --- | --- |
| Propriedade | `sc-domain:posgraduacaopsicologia.com` (Domain property, verificada por DNS TXT) |
| Conta | mesma conta Google logada na sessão Chrome do Alexandre |
| Sitemap submetido | `https://posgraduacaopsicologia.com/sitemap.xml` em 11/05/2026 |
| URLs com indexação solicitada (lote 1) | `/`, `/pos-graduacao-psicologia`, `/mbas`, `/areas`, `/comparativos`, `/temas`, `/para-quem`, `/carreira`, `/recursos/guia-pos-psicologia`, `/glossario` |

> **Importante:** o Google Search Console aceita 10-12 solicitações de indexação prioritária por dia por propriedade. Use o quota com sabedoria — priorize hubs e o pillar.

### Runbook: submeter novo sitemap no GSC

1. Acessar `https://search.google.com/search-console?resource_id=sc-domain%3Aposgraduacaopsicologia.com`.
2. Menu lateral → **Sitemaps**.
3. No campo "Adicionar um novo sitemap", inserir a **URL absoluta** (`https://posgraduacaopsicologia.com/sitemap.xml`). Domain property recusa caminhos relativos.
4. Clicar **ENVIAR**. O Google responde imediatamente com "Sitemap enviado" e começa a processar.
5. Voltar em 24-48h para conferir status. Status esperados: "Sucesso" (parseou OK) ou "Não foi possível buscar o sitemap" (transitório nos primeiros minutos).

### Runbook: solicitar indexação de uma URL

1. Mesma propriedade GSC.
2. Topo da tela → barra "Inspecionar qualquer URL".
3. Digitar a URL absoluta (`https://posgraduacaopsicologia.com/...`) e Enter.
4. Aguardar 10-15 segundos enquanto o GSC busca o status. Resultado típico para nova página: "O URL não está no Google".
5. Clicar em **SOLICITAR INDEXAÇÃO** (canto direito do card de status).
6. O GSC dispara um teste de URL ao vivo (1-2 min). Quando termina, mostra **"Indexação solicitada"**. Dispensar o modal.
7. Para próxima URL, limpar a barra (triple-click + Backspace) e repetir.

## IndexNow (Bing + Yandex + IndexNow.org)

Protocolo aberto que permite que sites notifiquem motores de busca compatíveis quando uma URL é criada, atualizada ou removida — sem esperar o crawl.

| Item | Valor |
| --- | --- |
| Key | `d2b9ebce0365f8fc565be54671f9fae8` |
| Key location | `https://posgraduacaopsicologia.com/d2b9ebce0365f8fc565be54671f9fae8.txt` |
| Endpoints | `https://api.indexnow.org/indexnow` · `https://www.bing.com/indexnow` · `https://yandex.com/indexnow` |
| Rate limit | ~10.000 URLs por dia por host (largamente acima do nosso volume) |

### Runbook: ping IndexNow

```bash
cat > /tmp/indexnow.json <<'EOF'
{
  "host": "posgraduacaopsicologia.com",
  "key": "d2b9ebce0365f8fc565be54671f9fae8",
  "keyLocation": "https://posgraduacaopsicologia.com/d2b9ebce0365f8fc565be54671f9fae8.txt",
  "urlList": [
    "https://posgraduacaopsicologia.com/url-nova-1",
    "https://posgraduacaopsicologia.com/url-nova-2"
  ]
}
EOF

# Pinga IndexNow.org (que reencaminha para Bing+Yandex)
curl -sS -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" -d @/tmp/indexnow.json

# Opcional: Bing e Yandex diretos (redundância)
curl -sS -X POST "https://www.bing.com/indexnow" \
  -H "Content-Type: application/json" -d @/tmp/indexnow.json
curl -sS -X POST "https://yandex.com/indexnow" \
  -H "Content-Type: application/json" -d @/tmp/indexnow.json
```

Resposta esperada: `HTTP 200` ou `HTTP 202`. Se for `400 Bad Request`, conferir formato JSON. Se for `403`, conferir se a key bate com o conteúdo do `.txt` no servidor.

## Mapa do site HTML

URL pública: `https://posgraduacaopsicologia.com/mapa-do-site`. Lista todas as 9 categorias do portal (Guia, Áreas, MBAs, Comparativos, Temas, Carreira, Para quem, Por estado, Recursos) com links para cada rota. Atualiza automaticamente a partir de `src/lib/data.ts` quando novas áreas/MBAs/estados são adicionados.

## Cronograma de indexação esperado

| Marco | Janela |
| --- | --- |
| Sitemap processado pelo Google | 24-72h após submissão |
| Primeira URL aparecer em "Páginas indexadas" no GSC | 3-7 dias |
| Maioria das 94 páginas indexadas | 2-4 semanas |
| Posicionamento inicial em SERP para termos long-tail | 4-8 semanas |
| Bing + Yandex (via IndexNow) reconhecem URLs | 24-48h |

Indicadores no GSC para acompanhar:

- **Cobertura → Páginas indexadas:** sobe gradualmente.
- **Cobertura → Excluídas:** se aparecer muito "Detectada, atualmente não indexada", significa que o conteúdo precisa ganhar autoridade externa (links de fora).
- **Desempenho:** começa a popular ~7 dias após indexação. Espere meses para volume consolidado.

## Próximos passos (próximas semanas)

1. Bing Webmaster Tools: criar propriedade equivalente e submeter o mesmo sitemap. Sinergia com IndexNow.
2. Yandex Webmaster: idem.
3. DuckDuckGo: usa Bing como índice — coberto pelo passo 1.
4. Google Rich Results Test: validar Schema.org Article + FAQPage para 5 páginas principais. Endpoint: `https://search.google.com/test/rich-results`.
5. Lighthouse CI no pipeline de deploy: garantir LCP < 1.5s e INP < 200ms continuamente.
6. Google Analytics 4 ou Plausible: tracking de visitantes para validar quais páginas convertem para o IPOG oficial.
7. Backlinks editoriais: 5-10 menções em mídia educacional ou perfis de psicologia. Sem isso, "Detectada, atualmente não indexada" pode persistir.
8. Quando lote 1 de URLs estiver indexado: solicitar lote 2 (próximas 10 URLs prioritárias por valor de tráfego esperado).

## Quotas e limites a respeitar

- GSC: ~10-12 indexing requests / dia / propriedade.
- IndexNow: 10.000 URLs / dia / host. Não atingiremos.
- Sitemap: até 50.000 URLs e 50MB sem compressão. Estamos com 95 URLs.
- Cloudflare Pages: deploys ilimitados no plano free.

## Quando rotacionar a IndexNow key

Não há necessidade rotineira. Rotacione apenas se:

- Houver suspeita de uso indevido por terceiros.
- A key for exposta publicamente em log ou tutorial.

Procedimento:

1. Gerar nova key: `openssl rand -hex 16`.
2. Adicionar `site/public/<new-key>.txt` com o conteúdo da nova key.
3. Manter a antiga por 30 dias para coexistir.
4. Atualizar este documento + scripts de ping com a nova key.
5. Após 30 dias, deletar o `.txt` da antiga.

## Histórico

| Data | Mudança | Quem |
| --- | --- | --- |
| 2026-05-11 | Setup inicial: GSC Domain property verificada, sitemap.xml submetido, 10 URLs solicitadas, IndexNow key criada e 3 engines pingados, página `/mapa-do-site` publicada. | Alexandre Caramaschi |
| 2026-05-12 | Refresh pós-waves K-Z: sitemap.xml re-submetido no GSC e processado com **174 páginas** (era 95). sitemap-index.xml também submetido (status inicial transitório). IndexNow disparado em batch para todas as 174 URLs: IndexNow.org 200, Bing 200, Yandex 202. URL Inspection lote 2 bloqueado por cota diária — retomar 13-05 com: `/guias`, `/faq`, `/casos`, `/evidencias`, `/intervencoes`, `/metodos`, `/por-estado`, `/regulacao`, `/pos-graduacao-psicologia/mba-vs-especializacao`, `/pos-graduacao-psicologia/como-escolher`. | Alexandre Caramaschi |
