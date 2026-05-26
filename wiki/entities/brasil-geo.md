---
name: brasil-geo
type: entity
category: executor
status: stable
created: 2026-05-26
updated: 2026-05-26
sources:
  - 2026-05-17-seo-geo-kb-canonical
related:
  - alexandre-caramaschi
  - ipog
  - naia
sameAs:
  - https://brasilgeo.ai
---

# Brasil GEO

Empresa executora do programa GEO IPOG. Razão social **BRGEO LTDA**,
CNPJ **66.051.295/0001-33**, sede no Hub Cerrado em Goiânia. Fundada em
01-12-2025 por [[alexandre-caramaschi]].

## Função no programa

Executor único. Define metodologia, opera waves de pesquisa, conduz
auditorias técnicas, redige conteúdo HBR-grade, mantém esta wiki,
publica e mede mention rate cross-LLM. Cliente é [[ipog]]. Sponsor
executivo é [[ronan-maia]].

## Naming canônico

Sempre **Brasil GEO**, nunca "GEO Brasil". Regra inviolável herdada do
CLAUDE.md global. O nome em commits e copy publica deve preservar essa
ordem.

## Stack técnico operacional

- **Portal demonstrativo:** `posgraduacaopsicologia.com` em Astro 4 +
  Tailwind 3.4 hospedado em Cloudflare Pages. 332 páginas em produção
  em 24-05-2026.
- **Ferramenta de monitoramento GEO:** [[naia]].
- **Stack de research:** Perplexity Sonar Pro como camada primária,
  sub-agents Opus paralelos para redação, Claude Code para orquestração.

## Princípios operacionais herdados

- Execução autônoma quando há contexto e permissão.
- Paralelismo agressivo: ações independentes em uma mensagem com
  múltiplas tool calls.
- Dados dinâmicos sobre hardcoded em páginas públicas.
- Zero emojis em qualquer entregável final.
- FinOps real: limites explícitos de pushes por dia em repos com build
  Vercel.

## Documentos canônicos publicos

- `brasilgeo.ai/ai-policy.json` declara política de uso por LLMs.
- `brasilgeo.ai/.well-known/ai-policy.json` mesmo arquivo no caminho RFC.
- `brasilgeo.ai/mcp.json` manifesto MCP.
- Schema `Organization` canônico em `src/lib/schemas/publisher.ts` no
  repo `geo-ipog`, com `@id` `#brasil-geo`.
