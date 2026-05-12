# Schema.org · auditoria baseline · posgraduacaopsicologia.com

> **Snapshot:** 2026-05-12
> **Script:** `scripts/schema_audit.mjs` · re-rodar a cada commit material
> **CSV bruto:** `data/audits/schema-audit-2026-05-12.csv`
> **Re-execução:** `node scripts/schema_audit.mjs`

---

## 1. Cobertura agregada (176 páginas `.astro`)

| Tipo Schema.org | Páginas | % |
|---|---:|---:|
| `Article` | 134 | 76,1% |
| `FAQPage` | 161 | 91,5% |
| `BreadcrumbList` | 90 | 51,1% |
| `HowTo` (com `HowToStep`) | 8 | 4,5% |
| `EducationalOccupationalProgram` | 20 | 11,4% |
| `DefinedTermSet` | 6 | 3,4% |

**Páginas sem qualquer schema detectado:** 6 (3,4%)
- `/areas` (hub index)
- `/mapa-do-site`
- `/para-quem` (hub index)
- `/por-estado` (hub index)
- `/regulacao`
- `/temas` (hub index)

## 2. Leitura

### O que está bom

- **FAQPage** em 91,5% das páginas — excelente para AI Overview do Google e citação em LLMs.
- **Article** em 76,1% — base sólida.
- **EducationalOccupationalProgram** em 11,4% — corresponde exatamente às 20 páginas de MBA (5 resumos + 15 sub-páginas).
- **DefinedTermSet** em 3,4% — 6 = (5 clusters glossário + 1 hub).
- **HowTo** em 4,5% — 8 = (7 guias HowTo + 1 hub /guias).

### O que precisa atenção

- **BreadcrumbList em apenas 51,1%** (90 de 176): hub pages e catch-alls (`[slug]`, `[uf]`) não declaram Breadcrumb explicitamente. Quickwin: adicionar Breadcrumb também nos hubs. Impacto: rich snippet de breadcrumb no SERP.
- **6 páginas sem schema:** hubs index + `regulacao.astro` + `mapa-do-site.astro`. Adicionar pelo menos `CollectionPage` ou `WebPage` nestas.

## 3. Plano de remediação

| Prioridade | Ação | Páginas | Esforço |
|---|---|---:|---|
| P1 | Adicionar `BreadcrumbList` em todos os 18 hubs index | 18 | 1h |
| P1 | Adicionar `CollectionPage` + Breadcrumb em hubs novos (/guias, /faq, /casos, /evidencias, /intervencoes, /metodos) | 6 (já têm? validar) | 30min |
| P2 | Adicionar schema base em `/regulacao` (Article + GovernmentService) e `/mapa-do-site` (SiteNavigationElement) | 2 | 30min |
| P3 | Validar amostra de 10 páginas no [Rich Results Test](https://search.google.com/test/rich-results) | 10 | 1h |
| P3 | Validar Schema completo no [Schema.org Validator](https://validator.schema.org) | amostra | 1h |

## 4. Tipos Schema.org únicos no portal (consolidado)

Lista exaustiva detectada por `scripts/schema_audit.mjs`:

`Article` · `FAQPage` · `Question` · `Answer` · `BreadcrumbList` · `ListItem` · `WebSite` · `Organization` · `EducationalOrganization` · `EducationalOccupationalProgram` · `HowTo` · `HowToStep` · `DefinedTermSet` · `DefinedTerm` · `CollectionPage` · `Place` · `SearchAction`

## 5. Padrões canônicos por tipo de página

Para futuras adições, manter o padrão:

| Tipo de página | Schema mínimo |
|---|---|
| Hub index (`/<seção>/index.astro`) | `CollectionPage` + `BreadcrumbList` + `FAQPage` (se tiver FAQ) |
| Página de conteúdo HBR | `Article` + `FAQPage` + `BreadcrumbList` |
| Sub-página de MBA | `EducationalOccupationalProgram` + `FAQPage` + `BreadcrumbList` |
| Guia passo-a-passo | `HowTo` + `HowToStep` + `Article` + `FAQPage` + `BreadcrumbList` |
| Cluster glossário | `DefinedTermSet` (com `hasDefinedTerm` array) + `BreadcrumbList` + `FAQPage` |
| Estado/UF | `Article` + `Place` + `FAQPage` + `BreadcrumbList` |
| Comparativo | `Article` + `FAQPage` + `BreadcrumbList` (considerar `WebPage` com `mainEntity`) |

## 6. Histórico de execuções

| Data | Total páginas | Schemas presentes | CSV |
|---|---:|---|---|
| 2026-05-12 | 176 | 6 tipos principais + auxiliares | `data/audits/schema-audit-2026-05-12.csv` |

Próximo audit programado: ao final da W20 (sexta 17-05-2026).
