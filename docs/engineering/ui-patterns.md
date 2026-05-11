# UI patterns — posgraduacaopsicologia.com

> Catálogo dos padrões de UI usados no portal. Todo componente novo deve **reutilizar** um padrão existente sempre que possível, em vez de inventar.
>
> Referência inspiracional: Booking.com (densidade informacional sem fricção, mobile-first com bottom nav, busca sempre acessível, microinterações sutis).

## 1. Botões

### Variantes

```html
<a class="btn btn-primary">Acessar portal oficial IPOG</a>       <!-- dourado, hover up -->
<a class="btn btn-secondary">Ver no IPOG</a>                      <!-- navy -->
<a class="btn btn-ghost">Voltar</a>                               <!-- borda neutra -->
<a class="btn btn-ghost-dark">Cancelar</a>                        <!-- borda branca, hero dark -->
<a class="btn btn-primary btn-lg">Ação principal</a>              <!-- aumenta padding -->
<a class="btn btn-secondary btn-sm">Compacto</a>
```

### Regras
- `btn-primary` é o CTA de conversão principal (caminho para IPOG oficial).
- `btn-secondary` é para ações navegacionais internas + outbound secundárias.
- `btn-ghost` para ações cancelativas ou alternativas.
- Sempre incluir ícone à direita em links externos (com SVG inline).
- Texto em sentence case ("Ver no IPOG"), não TÍTULO.

## 2. Tags e chips

| Classe | Uso |
| --- | --- |
| `.tag` | Pequeno label dourado (eyebrow em hero, status). |
| `.tag-light` | Mesmo formato em background claro (navy sobre brand-50). |
| `.tag-dark` | Em hero/footer escuros. |
| `.chip` | Filtros e tags clicáveis. Tem variante `.chip-active`. |

## 3. Cards

| Classe | Uso |
| --- | --- |
| `.card` | Base: borda, fundo branco, transição. |
| `.card-lift` | `.card` + hover-up (-3px), sombra `lift`. |
| `.card-dark` | Em fundos navy (`bg-brand-800` ou hero). |

Padrão de conteúdo de um `card-lift`:

```html
<a href="..." class="card-lift block p-6 group">
  <span class="tag tag-light"><span class="text-brand-700">●</span> Categoria</span>
  <h3 class="font-display font-semibold text-lg mt-2 text-ink-900 group-hover:text-brand-800">Título</h3>
  <p class="mt-2 text-sm text-ink-500">Descrição.</p>
  <span class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
    Ação <svg ...>→</svg>
  </span>
</a>
```

## 4. Hero

`<Hero />` é único por página principal (home). Para páginas internas use **section header** mais compacto:

```html
<section class="bg-surface-50 border-b border-surface-200">
  <div class="container-page py-7">
    <Breadcrumbs items={[...]} />
    <h1 class="section-h text-3xl sm:text-4xl mt-3">Título da página</h1>
    <p class="mt-2 text-ink-700 max-w-2xl">Subtítulo.</p>
  </div>
</section>
```

## 5. Mega-menu

`<MegaMenu label="Áreas" panelWidth="820">` com `slot="panel"` arbitrário.

- Sempre subdividir o painel em colunas com cabeçalhos `text-xs uppercase tracking-wider`.
- Itens usam `.mega-link`.

## 6. Bottom nav mobile

5 itens fixos, ícones SVG inline (`stroke-width="2"`). Item ativo usa `text-brand-800 + bg-brand-50` no ícone.

A tab "Mais" abre **bottom sheet** com:
- handle de drag visual
- header com h2 e botão fechar
- seções "Para quem", "Recursos" e CTA final

## 7. Busca (⌘K)

- Atalho global: `⌘K`, `Ctrl+K`, `/`.
- Backdrop blur, modal centralizado, foco automático no input.
- Resultados agrupados por `kind` colorido (Área, MBA, Tema, Estado, Persona, Guia).
- Navegação por teclado obrigatória (↑↓↵ Esc).

## 8. Breadcrumbs

`<Breadcrumbs items={[{label, href?}]} />` sempre como primeiro elemento de páginas internas.
Inclui `BreadcrumbList` schema.org automaticamente.

## 9. FAQ accordion

`<FAQAccordion />` lê de `FAQS` em `data.ts`. Renderiza `<details>` com chevron rotativo. Inclui `FAQPage` schema.org.

## 10. CTA final navy

Bloco de pré-conversão antes do footer:

```html
<section class="bg-brand-900 text-white relative overflow-hidden">
  <!-- gradiente decorativo dourado -->
  <!-- headline + subhead -->
  <!-- 2 botões (primary + ghost-dark) -->
</section>
```

## 11. Filter chips facetados

`<FilterChips options={[...]} defaultActive="all" onChange={fn} label="Filtrar" />`

Padrão para listagens (áreas, MBAs por persona, estados por região).

## 12. Microinterações

| Animação | Onde |
| --- | --- |
| `animate-fade-in` | Mega-menu, dialogs ao abrir |
| `animate-slide-up` | Bottom sheet, search modal |
| `animate-scale-in` | Painel lateral do hero |
| `hover:-translate-y-1` | Cards hover |
| `group-hover:translate-x-0.5` | Setas de ação em link de card |

Todas honram `prefers-reduced-motion: reduce`.

## 13. Cores de estado

| Estado | Cor |
| --- | --- |
| Default | `ink-700` text sobre `surface-0/50` |
| Hover de link | `brand-800` |
| Active de chip | `brand-800` background + branco |
| Foco | outline 2px `brand-500` |
| Disabled | opacity 50% + cursor not-allowed |
| Erro | usar `text-rose-700 bg-rose-50 border-rose-200` (raro neste portal) |

## 14. Espaçamento

| Token | Uso |
| --- | --- |
| `container-page` | Wrapper de seções, max-w-7xl + padding lateral. |
| `py-16 lg:py-20` | Seções principais. |
| `py-7` | Section header de páginas internas. |
| `gap-4` | Entre cards em grid. |
| `gap-10` | Entre colunas grandes (lg). |

## 15. Tipografia

| Classe | Uso |
| --- | --- |
| `section-h` | h1/h2 com Exo + tracking ajustado. |
| `section-eyebrow` | label acima de heading (`tag tag-light uppercase mb-3`). |
| `font-display` | Exo, para títulos. |
| Padrão body | Inter via `<body>`. |
| Tamanhos | `text-3xl sm:text-4xl` para h1/h2, `text-lg` para h3, `text-sm` para corpo de card. |

---

**Atualizações desta página:** sempre que um padrão for adicionado/removido, atualize aqui antes de mergear.
