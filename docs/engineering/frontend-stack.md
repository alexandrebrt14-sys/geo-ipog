# Frontend stack — posgraduacaopsicologia.com

> **Status:** canônico desde 11/05/2026. Revisar anualmente ou quando uma decisão técnica fundamental mudar.
>
> **Aplicabilidade:** todas as páginas do portal `posgraduacaopsicologia.com`, atuais e futuras. Não há fork de stack permitido para páginas individuais sem ADR aprovado.

## Escolha do stack

| Camada | Tecnologia | Versão | Por quê |
| --- | --- | --- | --- |
| Framework | **Astro** | 4.x | Static-first, file-based routing, integrações nativas, ótimo para sites de conteúdo. Build rápido, output zero-JS por padrão. |
| Ilhas de interatividade | **React** | 18.x | Componentes complexos (busca, filtros, nav mobile) usam React, hidratados sob demanda via `client:load` / `client:idle`. |
| Linguagem | **TypeScript** | 5.x (strict) | Tipagem fim-a-fim do `src/lib/data.ts` até componentes. Reduz erros, melhora DX. |
| Estilo | **Tailwind CSS** | 3.4 | Utility-first, design tokens em `tailwind.config.mjs`, JIT, mínima CSS no bundle final. |
| Tipografia | **Inter** + **Exo** | Google Fonts | Inter para corpo (legibilidade), Exo para display (alinhamento visual com IPOG). |
| Build target | Static HTML | — | Output puro. Sem SSR. Servido por Cloudflare Pages na borda. |
| Hosting | **Cloudflare Pages** | — | CDN global, zero-cost por bandwidth típico, integração com o Registrar e Workers do projeto. |
| Sitemap | Script próprio | `scripts/gen-sitemap.mjs` | @astrojs/sitemap teve bug no nosso fluxo; script Node enxuto e estável. |

### Referência arquitetural: Booking.com

Booking opera com:

- componentes reutilizáveis baseados em sistema de design (Bui)
- TypeScript estrito
- SSR com hidratação seletiva
- foco em performance (LCP, INP)
- mobile-first com bottom nav e bottom sheets
- busca persistente sempre acessível

Adotamos **a filosofia, não a stack literal**. Astro + React islands entrega resultado equivalente com bundle menor para um site de conteúdo (que é o nosso caso, diferente do app transacional do Booking).

## Estrutura de pastas

```
site/
├── astro.config.mjs           # configuração Astro
├── tailwind.config.mjs        # design tokens
├── tsconfig.json              # paths @lib, @components, @layouts, @styles
├── package.json               # scripts npm
├── scripts/
│   └── gen-sitemap.mjs        # gera sitemap.xml após build
├── public/                    # assets servidos diretamente (favicon, OG, _headers, robots.txt)
├── src/
│   ├── env.d.ts
│   ├── styles/global.css      # @tailwind base/components/utilities + tokens próprios
│   ├── lib/data.ts            # fonte da verdade da taxonomia (áreas, MBAs, personas, temas, FAQs)
│   ├── layouts/
│   │   └── Base.astro         # HTML shell, meta tags, ViewTransitions, header, footer
│   ├── components/
│   │   ├── Header.astro       # nav desktop com mega-menus
│   │   ├── MegaMenu.astro     # mega-menu reutilizável
│   │   ├── Footer.astro       # mega-footer com sitemap
│   │   ├── SearchOverlay.tsx  # ⌘K, React island, client:idle
│   │   ├── MobileBottomNav.tsx# bottom nav 5 tabs, React island, client:load
│   │   ├── Hero.astro
│   │   ├── AreaCard.astro
│   │   ├── MBACard.astro
│   │   ├── PersonaCard.astro
│   │   ├── FAQAccordion.astro
│   │   ├── Breadcrumbs.astro
│   │   ├── FilterChips.tsx
│   │   ├── AreasFilteredGrid.tsx
│   │   └── StickyDisclaimerCTA.astro
│   └── pages/
│       ├── index.astro
│       ├── areas/index.astro
│       ├── areas/[slug].astro       # 18 áreas geradas estaticamente
│       ├── mbas.astro
│       ├── por-estado/index.astro
│       ├── por-estado/[uf].astro    # 27 estados gerados estaticamente
│       └── regulacao.astro
└── dist/                      # output do build (gerado, não commitar conteúdo)
```

## Design tokens

Definidos em `tailwind.config.mjs`. **Toda nova página/componente deve usar tokens existentes** — sem cores ad-hoc.

| Token | Uso | Valor |
| --- | --- | --- |
| `brand-800` | Cor primária navy (header dark, hero, CTAs secundários) | `#0F2543` |
| `brand-900` | Variante mais escura (footer, CTA blocks) | `#0A1A33` |
| `brand-50` | Background suave em destaques | `#EEF2FA` |
| `sun-500` | Accent dourado (CTA primário, highlights) | `#F5B400` |
| `accent-500` | Azul informacional | `#1E88E5` |
| `ink-900` | Texto principal | `#262B44` |
| `ink-500` | Texto secundário/labels | `#5A6478` |
| `surface-50` | Fundo claro de seções | `#F7F9FC` |
| `surface-200` | Bordas | `#E1E6F0` |
| `font-display` | Fonte de títulos | Exo |
| `font-sans` | Corpo | Inter |
| `shadow-soft` | Cards padrão | 0 1px 2px + 8px 24px |
| `shadow-lift` | Cards em hover | 0 24px 48px −24px |
| `animation-fade-in/slide-up/scale-in` | Microinterações | curva `cubic-bezier(.2,.8,.2,1)` |

## Padrões de UX/UI canônicos

Inspirados em Booking.com, calibrados para portal de conteúdo educacional.

### 1. Header sticky com persistência
- Sempre visível, com sombra acrescida ao rolar (`is-scrolled`).
- Logo + nav central + busca persistente (input fake que abre overlay) + CTA `IPOG oficial`.
- Em mobile: logo + ícone busca + hamburger (bottom nav assume o resto).

### 2. Mega-menu em hover (desktop)
- Cards com cabeçalhos `Conceitos / Núcleo POT + bem-estar / etc.`
- Cada link contém título em negrito + subtítulo pequeno.
- Aciona em hover e foco-dentro, com `animate-fade-in`.

### 3. Busca cmd+K (React island, client:idle)
- Atalho `⌘K` / `Ctrl+K` / `/`.
- Índice gerado de `src/lib/data.ts`: áreas, MBAs, temas, estados, personas, guias.
- Navegação ↑ ↓ ↵ Esc.
- Fuzzy por tokens, ranking por número de tokens casados.

### 4. Bottom nav mobile (React island, client:load)
- 5 itens: Início · Áreas · MBAs · Buscar · Mais.
- Tab "Mais" abre bottom sheet com personas + recursos + CTA IPOG.
- Reage à rota corrente via `astro:after-swap`.

### 5. Filter chips facetados
- `AreasFilteredGrid.tsx` no `/areas` permite filtrar por cluster + nível regulatório + texto livre.
- Mesma padronagem aplicada a futuras listagens (MBAs por persona, estados por região).

### 6. Cards com hover lift
- Cor de borda muda + sombra cresce + `translateY(-3px)` em 180ms.
- `prefers-reduced-motion` desabilita animação.

### 7. Breadcrumbs JSON-LD
- `<Breadcrumbs items={[...]}/>` em toda rota interna.
- Inclui `BreadcrumbList` schema.org para SEO.

### 8. View Transitions
- Habilitadas globalmente via `<ViewTransitions />` em `Base.astro`.
- Navegação interna fica fluida sem reload completo (em browsers compatíveis).

### 9. Prefetch on viewport
- `prefetch: { defaultStrategy: 'viewport' }` em `astro.config.mjs`.
- Astro pré-busca páginas linkadas quando entram na viewport — navegação instantânea.

### 10. Mobile-first responsividade
- Breakpoints Tailwind padrão: `sm 640`, `md 768`, `lg 1024`, `xl 1280`.
- Mobile bottom nav até `lg-`, header desktop com mega-menu a partir de `lg+`.
- Padding seguro com `env(safe-area-inset-bottom)` no bottom nav.

### 11. Acessibilidade
- `aria-label`, `aria-haspopup`, `aria-pressed`, `aria-modal` em todos os componentes interativos.
- Focus rings visíveis (`*:focus-visible`).
- Skip-link "Pular para o conteúdo principal".
- `prefers-reduced-motion` honrado.
- Contraste mínimo AA em todas as combinações brand × surface.

### 12. SEO + schema.org
- Cada rota interna tem `BreadcrumbList`.
- Home tem `WebSite` + `SearchAction`.
- Áreas têm `Article`.
- MBAs têm `ItemList`.
- Estados têm `WebPage` com `about: Place`.
- FAQ tem `FAQPage`.

## Regras editoriais para conteúdo (REGRA #0 do CLAUDE.md)

| Onde | Regra |
| --- | --- |
| `id`, slugs, paths, hrefs internos | **ASCII obrigatório** (sem acentos, sem `ç`). Caso contrário roteamento quebra. |
| `name`, `description`, `q`, `a`, `label`, `title` | **Acentuação completa do PT-BR**. Sem `nao`, `voce`, `producao`, `pos`, `area`, `educacao` em texto visível. |
| Commit messages | Inglês conciso, sem caracteres especiais (pre-commit hook compatível). |
| Comentários no código | PT-BR ok, mas evitar acentuação que possa virar mojibake no Windows console — usar sem acento OK aqui. |
| URLs externas (IPOG, CFP, etc.) | Sempre `target="_blank" rel="noopener external"`. |

## Adicionar uma nova página

1. **Decidir se vira rota dedicada ou âncora**. Páginas de área, MBA, estado, persona → rota dedicada. Subtemas pequenos podem virar âncora de uma rota maior.
2. **Adicionar dados em `src/lib/data.ts`** se for taxonomia (área, MBA, persona, tema, estado, FAQ).
3. **Criar `src/pages/<rota>.astro`** usando o `Base` layout.
4. Sempre incluir:
   - `<Breadcrumbs items={[...]} />` no topo
   - `section-eyebrow` + `section-h` no título principal
   - meta tags via props do `Base` (`title`, `description`, opcionalmente `ogImage`)
   - JSON-LD apropriado ao tipo de conteúdo
   - CTA secundário para `https://ipog.edu.br/` quando fizer sentido
5. **Não criar novos tokens de cor** — usar paleta existente. Se uma necessidade legítima surgir, abrir ADR.
6. Rodar `npm run build` localmente — deve passar com 0 erros.
7. Deploy via `npx wrangler pages deploy site/dist --project-name=posgraduacaopsicologia`.

## Adicionar um componente React (ilha)

- Use apenas quando o componente precisa de estado, evento global ou interação que HTML/CSS puro não dá conta.
- Diretiva de hidratação:
  - `client:load` — hidrata imediatamente (bottom nav, header sticky)
  - `client:idle` — hidrata quando o browser está ocioso (busca, lazy)
  - `client:visible` — hidrata quando entra na viewport
- Mantenha o componente **fora** dos blocos `<Astro.Component>` reutilizados em N páginas. Pesa em todas elas.

## Performance targets

| Métrica | Target | Como aferir |
| --- | --- | --- |
| Lighthouse Performance | ≥ 95 | `npx lighthouse https://posgraduacaopsicologia.com --view` |
| LCP | < 1.5s em 4G | WebPageTest, real user metrics |
| INP | < 200ms | Cloudflare Analytics, Web Vitals |
| Bundle JS na home | < 60KB gzip | `du -sh dist/_astro/*.js` |
| Tamanho médio da página | < 100KB gzip | curl --compressed -w "%{size_download}" |

Builds que extrapolam esses limites devem virar issue de regressão antes do deploy.

## Comandos canônicos

```bash
# Setup
cd site
npm install

# Desenvolvimento
npm run dev               # http://localhost:4321

# Build de produção
npm run build             # gera site/dist/

# Preview local do build
npm run preview

# Deploy para Cloudflare Pages
export CLOUDFLARE_API_TOKEN=$(cat ~/.cloudflare/geo-ipog-api-token.txt)
export CLOUDFLARE_ACCOUNT_ID=792448bf922857a2a0c2230bc5088dee
npx wrangler pages deploy dist --project-name=posgraduacaopsicologia --branch=main

# Logs e monitoring
npx wrangler pages deployment list --project-name=posgraduacaopsicologia
```

## CI/CD (próxima sprint)

Pendente: workflow GitHub Actions que dispara `astro build` + `wrangler pages deploy` em push para `main` na pasta `site/`. Já existe `.github/workflows/cloudflare-zone-ops.yml` para operações na zona — adicionar `frontend-deploy.yml` em sprint dedicada com:

- gate de TypeScript (`tsc --noEmit`)
- gate de Lighthouse CI
- preview deploy por PR

## Versionamento e governança

- Mudanças na **estrutura de tokens, na config do Astro ou no design system** exigem ADR em `docs/engineering/adr/`.
- Mudanças triviais em conteúdo (`src/lib/data.ts`) podem ir direto via PR.
- Mudanças em componentes do design system devem ser refletidas neste documento.

## Histórico

| Data | Mudança | Quem |
| --- | --- | --- |
| 2026-05-11 | Criação do stack: Astro 4 + React 18 + Tailwind 3.4 + TypeScript 5. Migração da home HTML single-file para 50 páginas estáticas. Deploy em Cloudflare Pages. | Alexandre Caramaschi |
