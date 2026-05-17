# Catálogo de Itens [VERIFICAR] — Sprint de Remediação 2026-05-17

> **Gerado por:** Wave EE da sprint de remediação em 17/05/2026
> **Escopo:** arquivos novos da sprint canônica de 17/05/2026 + runbooks criados em sprints anteriores
> **Metodologia:** grep `[VERIFICAR]` nos diretórios `site/src/pages/`, `docs/research/wave-*-20260517.md`, `docs/governance/*.md`, `docs/runbooks/*.md`
> **Importante:** este arquivo é SOMENTE catálogo — nenhum conteúdo-fonte foi alterado

**Total de ocorrências encontradas:** 32

---

## Arquivo 1 — `site/src/pages/measurement-geo.astro`

### Ocorrência 1.1

- **Linha aproximada:** 234
- **Contexto:** marcação inline de indicador ou dado quantitativo não confirmado por fonte primária
- **Plano:** BACKLOG — verificar fonte primária específica da métrica; prioridade baixa pois a página já contém aviso explícito ao leitor sobre o uso de `[VERIFICAR]`

### Ocorrência 1.2

- **Linha aproximada:** 293
- **Contexto:** marcação inline de segundo indicador não confirmado
- **Plano:** BACKLOG — mesma estratégia da ocorrência 1.1

### Ocorrência 1.3

- **Linha:** 446
- **Contexto:** nota editorial ao leitor: *"Quando a literatura não publica fonte primária, sinalizamos com `[FALTA EVIDÊNCIA]` ou `[VERIFICAR]`."*
- **Plano:** ACEITAR COMO GAP DECLARADO — trata-se de metadocumentação da política editorial, não de lacuna de pesquisa. Nenhuma ação necessária.

---

## Arquivo 2 — `docs/runbooks/lattes-orcid-author-pages.md`

### Ocorrência 2.1

- **Linha:** 69
- **Contexto:** `// [VERIFICAR] — preencher com lista oficial enviada pelo time IPOG.`
- **Plano:** RESOLVER — pendente de entrega do time IPOG com lista de docentes. Abrir ticket para Bruno Azambuja (IPOG) solicitar a lista oficial. Sem esta lista, o arquivo `docentes.ts` permanece incompleto.

### Ocorrência 2.2

- **Linha:** 256
- **Contexto:** nota de política — "`[VERIFICAR]` permitido apenas na fonte de verdade interna (`docentes.ts` comentário), nunca na página pública."
- **Plano:** ACEITAR COMO GAP DECLARADO — é norma editorial do runbook, não lacuna de pesquisa.

---

## Arquivo 3 — `docs/runbooks/ga4-ai-traffic-channel.md`

### Ocorrência 3.1

- **Linha:** 84
- **Contexto:** `[VERIFICAR]` sobre a data exata do rebranding Looker Studio → Data Studio (retorno ao nome anterior em 11/04/2026). Afirmação dependente de fonte primária em `workspaceupdates.googleblog.com`.
- **Plano:** RESOLVER — baixa prioridade; não afeta funcionalidade do GA4. Pesquisar no Google Workspace Updates blog a data canônica e atualizar o runbook cirurgicamente.

---

## Arquivo 4 — `docs/research/wave-C-engines-2026-20260517.md`

### Ocorrência 4.1

- **Linha:** 30
- **Contexto:** `[VERIFICAR]` distribuição exata de uso GPT-5.3 Free vs Plus vs Pro em pt-BR.
- **Plano:** BACKLOG — OpenAI não publica MAU por tier e por país. Gap declarado explicitamente no texto. Monitorar relatórios de terceiros (Similarweb, StatCounter).

### Ocorrência 4.2

- **Linha:** 63
- **Contexto:** Link `https://help.openai.com/en/articles/9237897-chatgpt-search` retornou 403 no WebFetch. `[VERIFICAR]` direto.
- **Plano:** RESOLVER — tentar acesso com Chrome MCP ou copiar URL em navegador com sessão. Prioridade media: URL está no dossiê de research, não em página pública.

### Ocorrência 4.3

- **Linha:** 121
- **Contexto:** `[VERIFICAR]` qual modelo exato roda AI Overviews vs AI Mode em pt-BR em 05/2026; Google não publica explicitamente.
- **Plano:** ACEITAR COMO GAP DECLARADO — Google confirma "custom Gemini model for Search" mas não especifica versão por mercado. Gap legítimo e não resolvível sem fonte interna Google.

### Ocorrência 4.4

- **Linha:** 192
- **Contexto:** `[VERIFICAR]` se Sonar API (Perplexity) tem latência aceitável em data centers BR.
- **Plano:** RESOLVER — teste direto: `curl -w "%{time_total}" api.perplexity.ai/chat/completions` com payload mínimo. Executar em próxima sessão de coleta.

### Ocorrência 4.5

- **Linha:** 205
- **Contexto:** `[VERIFICAR]` mix exato de modelos Microsoft Copilot em 05/2026 (GPT-5.x + MAI).
- **Plano:** ACEITAR COMO GAP DECLARADO — Microsoft não publica breakdown de modelos por versão de produto. Gap estrutural não resolvível.

### Ocorrência 4.6

- **Linha:** 256
- **Contexto:** `[VERIFICAR]` adoption rate de Grok em pt-BR.
- **Plano:** BACKLOG — pesquisar Similarweb ou SimilarTech dados de mercado para xAI em BR. Baixa urgência.

### Ocorrência 4.7

- **Linha:** 272
- **Contexto:** `[VERIFICAR]` se DeepSeek tem plano de internacionalização anunciado.
- **Plano:** ACEITAR COMO GAP DECLARADO — fora do escopo geo-ipog (mercado BR pt-BR).

### Ocorrência 4.8

- **Linha:** 417
- **Contexto:** `[VERIFICAR]` com Search Liaison declarações públicas sobre modelo exato de AI Overviews pt-BR.
- **Plano:** ACEITAR COMO GAP DECLARADO — duplicata estrutural de 4.3.

### Ocorrência 4.9

- **Linha:** 421
- **Contexto:** `[VERIFICAR]` adoption rate de Grok em pt-BR.
- **Plano:** BACKLOG — duplicata de 4.6.

### Ocorrência 4.10

- **Linha:** 423
- **Contexto:** `[VERIFICAR]` se Sonar API tem latência aceitável em POP BR.
- **Plano:** RESOLVER — duplicata de 4.4. Mesma ação.

### Ocorrência 4.11

- **Linha:** 429
- **Contexto:** `[VERIFICAR]` — GPT-5.5 e modelos rumored; OpenAI não publicou specs oficiais até mai/2026.
- **Plano:** ACEITAR COMO GAP DECLARADO — rumores sem fonte primária; corretamente sinalizados como `[VERIFICAR]` no texto. Monitorar releases OpenAI.

---

## Arquivo 5 — `docs/research/wave-D-standards-tecnicos-20260517.md`

### Ocorrência 5.1

- **Linha:** 6 (nota de método)
- **Contexto:** declaração metodológica sobre uso de `[VERIFICAR]` no documento.
- **Plano:** ACEITAR COMO GAP DECLARADO — metadocumentação.

### Ocorrência 5.2

- **Linha:** 468
- **Contexto:** `[VERIFICAR]` se MercadoLibre e Adyen aderiram ao AP2 (Agent Payments Protocol).
- **Plano:** BACKLOG — monitorar `agentpaymentsprotocol.info` e blog Coinbase. Alta relevância para LATAM.

### Ocorrência 5.3

- **Linha:** 685
- **Contexto:** `[VERIFICAR]` se `ai-context.json` / `ai-agents.json` é proposta de consórcio ou experimentação ad-hoc de vendor único.
- **Plano:** RESOLVER — pesquisar W3C, IETF, schema.org, OpenAPI e AI Alliance por proposta formal. Se não existir, remover menção de "padrão" no texto (já sinalizado no próprio item).

### Ocorrência 5.4

- **Linha:** 686
- **Contexto:** `[VERIFICAR]` estado atual de PerplexityBot na lista Cloudflare Verified Bots pós-controvérsia.
- **Plano:** RESOLVER — verificar `https://radar.cloudflare.com/traffic/verified-bots` em navegador. Prioridade media.

### Ocorrência 5.5

- **Linha:** 687
- **Contexto:** `[VERIFICAR]` lista completa de partners AP2 (especialmente LATAM: MercadoLibre, Adyen).
- **Plano:** BACKLOG — duplicata de 5.2.

### Ocorrência 5.6

- **Linha:** 688
- **Contexto:** `[VERIFICAR]` charter completo da x402 Foundation na Linux Foundation.
- **Plano:** RESOLVER — acessar `https://www.linuxfoundation.org/press/x402-foundation` ou similar para confirmar charter. Prioridade baixa.

### Ocorrência 5.7

- **Linha:** 689
- **Contexto:** `[VERIFICAR]` versão exata do GPTBot User-Agent (entre `/1.1` e `/1.2`).
- **Plano:** RESOLVER — testar `User-Agent: GPTBot/1.1` e `/1.2` em logs de servidor do Cloudflare Pages. Baixa urgência; robots.txt atual aceita ambos.

### Ocorrência 5.8

- **Linha:** 690
- **Contexto:** `[VERIFICAR]` se Claude-SearchBot é UA real em produção ou roadmap Anthropic.
- **Plano:** RESOLVER — verificar `platform.anthropic.com/docs/` em sessão autenticada. Prioridade media.

### Ocorrência 5.9

- **Linha:** 691
- **Contexto:** `[VERIFICAR]` se Google sinaliza deprecação do Schema.org `Speakable`.
- **Plano:** BACKLOG — monitorar `developers.google.com/search/docs/advanced/structured-data/speakable`. Atualmente BETA sem deprecation anunciada.

### Ocorrência 5.10

- **Linha:** 692
- **Contexto:** `[VERIFICAR]` template canônico para expor MCP server em Vercel/Cloudflare para portal editorial.
- **Plano:** BACKLOG — avaliar em sprint dedicada a MCP. Alta relevância estratégica para fase 2.

### Ocorrência 5.11

- **Linha:** 693
- **Contexto:** `[VERIFICAR]` se Cloudflare, DataDome ou DarkVisitors mantêm lista de IPs do Bytespider.
- **Plano:** RESOLVER — verificar `https://darkvisitors.com/agents/bytedance-bot` em próxima sessão.

### Ocorrência 5.12

- **Linha:** 694
- **Contexto:** `[VERIFICAR]` se papers acadêmicos 2026 publicaram análise causal do algoritmo de citação AI Overview.
- **Plano:** BACKLOG — incluir na próxima rodada de pesquisa Perplexity Sonar Pro (query específica: "AI Overview citation algorithm causal analysis 2026 academic paper").

---

## Arquivo 6 — `docs/governance/seo-geo-knowledge-base-2026-05-17.md`

### Ocorrência 6.1

- **Linha:** 423
- **Contexto:** nota de transparência metodológica sobre uso de `[VERIFICAR]` nas 203 referências.
- **Plano:** ACEITAR COMO GAP DECLARADO — metadocumentação da política de qualidade. Nenhuma ação necessária.

---

## Arquivo 7 — `docs/research/wave-E-kpis-measurement-20260517.md`

### Ocorrência 7.1

- **Linha:** 6 (nota de método)
- **Contexto:** declaração metodológica sobre uso de `[VERIFICAR]` no documento.
- **Plano:** ACEITAR COMO GAP DECLARADO — metadocumentação.

### Ocorrência 7.2

- **Linha:** 265
- **Contexto:** `[VERIFICAR]` — AI Overview CTR 2,4% (fev/2026) dependente de fonte Seer citada via SEJ (secundária).
- **Plano:** RESOLVER — acessar fonte primária Seer Interactive diretamente para confirmar o número. Prioridade alta: número é usado em apresentações.

### Ocorrência 7.3

- **Linha:** 268
- **Contexto:** quatro URLs acessadas apenas via snippet de search results (`almcorp.com`, `position.digital`, `thedigitalbloom.com`, `searchengineland.com/...455498`) merecem releitura antes de usar em deck.
- **Plano:** RESOLVER — acessar cada URL individualmente e confirmar o dado citado. Prioridade media.

### Ocorrência 7.4 a 7.8

- **Linhas:** 282, 284, 289, 290, 291
- **Contexto:** preços sob consulta de ferramentas GEO (Brandlight, Conduit, LLM Pulse, Sight AI, Indexly) não confirmados em fonte primária.
- **Plano:** BACKLOG — para cada ferramenta, acessar a página de pricing diretamente. Baixa urgência; dados de preço são voláteis e devem ser verificados no momento de uso real.

### Ocorrência 7.9

- **Linha:** 544 (nota de encerramento)
- **Contexto:** declaração de spot-check executado com lista de URLs `[VERIFICAR]` inline.
- **Plano:** ACEITAR COMO GAP DECLARADO — metadocumentação do processo de verificação.

### Ocorrência 7.10

- **Linha:** 576
- **Contexto:** nota sobre URLs com fetch parcial (403, ECONNREFUSED) marcadas `[VERIFICAR]` no corpo do texto.
- **Plano:** ACEITAR COMO GAP DECLARADO — metadocumentação.

---

## Resumo por plano de ação

| Plano | Quantidade | Descrição |
|---|---|---|
| RESOLVER (prioritário) | 8 | Itens com ação clara e factível: fonte Seer CTR, Sonar latência, PerplexityBot Cloudflare, Claude-SearchBot UA, Bytespider DarkVisitors, OpenAI help URL, 4 URLs wave-E, x402 charter |
| BACKLOG | 10 | Itens relevantes mas sem urgência: GAP de mercado Grok/Brave, MCP template, Speakable deprecation, AP2 LATAM partners, preços de ferramentas GEO |
| ACEITAR COMO GAP DECLARADO | 14 | Gaps estruturais não resolvíveis (Google não publica modelo exato, Microsoft não publica mix de IA, metadocumentação editorial) |

---

## Próximos passos recomendados

1. **Sprint de verificação express (1-2h):** resolver os 8 itens da categoria RESOLVER antes da próxima publicação pública de dados no site.
2. **Backlog:** incluir os 10 itens de BACKLOG no planejamento da próxima sprint de pesquisa Perplexity.
3. **Nenhuma ação** para os 14 itens declarados como gap estrutural — estão corretamente documentados como incerteza conhecida.
