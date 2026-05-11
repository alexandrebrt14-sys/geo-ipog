# ADR-0001 — Adoção de Astro + React islands + TypeScript + Tailwind para o portal

- **Data:** 2026-05-11
- **Status:** Aceito
- **Decisor:** Alexandre Caramaschi (CEO Brasil GEO)
- **Aplica-se a:** `posgraduacaopsicologia.com` e qualquer portal-irmão futuro do programa GEO-IPOG.

## Contexto

A versão inicial do portal foi entregue como `index.html` single-page de 1277 linhas com Tailwind via CDN. Foi suficiente para validar o domínio e o posicionamento, mas:

- não escala para dezenas/centenas de páginas (áreas, MBAs, comparativos, conteúdos, estados).
- não tem tipagem nem reuso de componentes.
- expõe o usuário ao custo de Tailwind via CDN (compilação no client).
- não tem padronização de meta tags/schema.org/breadcrumbs entre páginas.
- não tem rotas internas reais (tudo era âncora `#`).

Booking.com foi citado pelo decisor como referência de qualidade de stack frontend.

## Opções consideradas

1. **Next.js (App Router)** — full-featured, mas requer SSR/Node ou export estático com algumas pegadinhas. Bundle JS maior que necessário para um site de conteúdo. Melhor escolha quando houver muita interatividade no client (dashboards, formulários complexos).

2. **Astro + React islands** ← escolhido — static-first, file-based routing, ilhas de React só onde precisa (busca, nav mobile), bundle JS mínimo. Excelente fit para sites de conteúdo educacional.

3. **SvelteKit** — similar a Astro em filosofia, com fora-da-caixa SSR. Adoção menor no ecossistema; o time da Brasil GEO usa React em outros projetos.

4. **Hugo / Eleventy** — extremamente rápidos, mas o time não tem rotina em Go/Liquid; integrar componentes interativos exige andaimes adicionais.

## Decisão

Adotar **Astro 4 + React 18 + TypeScript 5 + Tailwind CSS 3.4** com output estático servido pelo **Cloudflare Pages**.

- TypeScript strict para tipar `src/lib/data.ts` (taxonomia) ponta a ponta.
- Tailwind com config em `tailwind.config.mjs` para tokens canônicos.
- React limitado às ilhas que realmente precisam de estado: `SearchOverlay`, `MobileBottomNav`, `AreasFilteredGrid`, `FilterChips`.
- Sitemap gerado por script Node próprio em `scripts/gen-sitemap.mjs` (mais estável que `@astrojs/sitemap` no nosso pipeline).
- Deploy via `wrangler pages deploy site/dist`.

## Consequências

### Positivas
- Build de 50 páginas estáticas em < 3s.
- Bundle JS na home dentro do target (~40-50KB gzip esperado).
- Páginas novas seguem o mesmo padrão de meta tags + breadcrumbs + JSON-LD automaticamente.
- Time pode adicionar novas áreas/MBAs/personas em **um único arquivo** (`src/lib/data.ts`) e todas as rotas se regeneram.
- View Transitions API entregam navegação fluida sem custo extra.

### Negativas
- Quem nunca usou Astro tem curva de ~1 dia para se sentir produtivo.
- Pequenas mudanças em conteúdo passam pelo pipeline de build + deploy (ok porque Cloudflare Pages permite preview por branch e deploy é rápido).
- Algumas integrações de Astro têm bugs (já vimos com `@astrojs/sitemap`). Mitigação: workaround com script Node próprio, documentado.

### Política para o futuro
- Adição de **nova dependência crítica** (DB, autenticação, payments) que exija SSR deve abrir novo ADR.
- Migração para Astro 5 quando estável pode ser feita sem mudar o ADR (apenas patch).
- Manter o site **estático** o máximo possível. Funcionalidades dinâmicas (form de captação de lead, chat) podem ser feitas via Cloudflare Workers + API isolada — sem virar SSR do site.

## Notas operacionais

- Branch `main` é always-deployable.
- Pre-push hook futuro deve rodar `npm run build` para garantir que main nunca quebra.
- Lighthouse CI será adicionado em sprint seguinte.
- O token Cloudflare CI já disponibilizado (`CLOUDFLARE_API_TOKEN` no repo) tem permissão suficiente para Pages deploy.

## Referências

- [`docs/engineering/frontend-stack.md`](../frontend-stack.md) — documento canônico atualizado do stack.
- [`docs/engineering/ui-patterns.md`](../ui-patterns.md) — catálogo de padrões de UI.
- [`site/astro.config.mjs`](../../../site/astro.config.mjs)
- [`site/tailwind.config.mjs`](../../../site/tailwind.config.mjs)
- [Astro docs](https://docs.astro.build/)
- [Tailwind CSS v3](https://v3.tailwindcss.com/)
