---
name: schema-graph-triplo
type: concept
category: technical-pattern
status: stable
created: 2026-05-26
updated: 2026-05-26
sources:
  - 2026-05-17-seo-geo-kb-canonical
related:
  - geo
  - eeat-ymyl
  - alexandre-caramaschi
  - brasil-geo
---

# Schema.org `@graph` triplo

Padrão canônico de JSON-LD adotado em todo `Article` do portal
`posgraduacaopsicologia.com`. Consiste em emitir três nós distintos
reconciliados pelo mesmo `@id` em todo o site.

## Os três nós

1. **WebSite** (`@id` `#website`) — declarado uma vez no layout base.
2. **Organization** (`@id` `#brasil-geo`) — publisher canônico. Definido
   em `src/lib/schemas/publisher.ts`. CNPJ, sede, sameAs, areaServed.
   Detalhes em [[brasil-geo]].
3. **Person** (`@id` `#alexandre-caramaschi`) — autor canônico. Definido
   em `src/lib/schemas/person-alexandre.ts`. 39 `knowsAbout`, 13
   `sameAs`, 3 `alumniOf`, 3 `hasCredential`. Detalhes em
   [[alexandre-caramaschi]].

Em YMYL clínico ([[eeat-ymyl]]), adiciona-se um quarto nó: `Person`
revisor clínico via `reviewedBy`.

## Implementação canônica

```typescript
import { alexandrePersonBase, brasilGeoOrganization } from '@lib/schemas';

const ldArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '...',
  author: alexandrePersonBase,
  publisher: brasilGeoOrganization,
  // ...
};
```

`src/lib/schemas/index.ts` é o barrel export. `src/layouts/Base.astro`
emite o `@graph` triplo no `<head>` de toda página.

## Por que `@graph` em vez de objetos inline

- LLMs com retrieval-augmented (Perplexity, Brave Summarizer) absorvem
  melhor entidades reconciliáveis por `@id`.
- Reduz duplicação em validação de Schema (`Person` aparece uma vez no
  grafo, é referenciada N vezes).
- Permite cross-page consistency check via lint.

## Validação canônica

- `npx astro check` em build (0 errors exigido antes de commit).
- `scripts/schema_audit.mjs` para sweep de grafo por página.
- `scripts/audit-graph-triple.mjs` para validar reconciliação de `@id`.

## Cobertura atual (24-05-2026, W22)

332 páginas em produção. `@graph` triplo presente em 100% dos `Article`,
`EducationalOccupationalProgram` canônico em 15 sub-páginas MBA via
factory `buildEducationalOccupationalProgram`. Validação produção
positiva em smoke W22.
