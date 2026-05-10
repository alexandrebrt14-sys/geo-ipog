# 16 — Definition of Done

> **Audiência primária:** Time inteiro

## 1. DoD da especificação (esta documentação)

A documentação está **completa** quando:

1. ✅ A ontologia está definida em Markdown (`03-ontologia.md`) e YAML (`data/ontology.yaml`)
2. ✅ A taxonomia está definida em Markdown (`04-taxonomia.md`) e YAML (`data/taxonomy.yaml`)
3. ✅ Todos os menus e submenus têm requisitos, objetivos, CTAs, analytics e roadmap (`06-menus-e-submenus.md` + `data/menu-map.yaml`)
4. ✅ O roadmap está dividido por 6 fases (`10-roadmap.md`)
5. ✅ O backlog tem épicos (16), features (~50) e user stories (~120) (`11-backlog.md`)
6. ✅ As páginas programáticas estão documentadas (`09-seo-e-conteudo-programatico.md` + `data/seo-page-types.yaml`)
7. ✅ A estratégia SEO nacional e estadual está documentada (`09` + `data/state-pages.yaml`)
8. ✅ Todos os 27 estados brasileiros estão contemplados (`data/state-pages.yaml`)
9. ✅ Os riscos estão mapeados (14 riscos `R-PORTAL-001` a `R-PORTAL-014`)
10. ✅ As dependências estão explícitas (14 dependências externas)
11. ✅ O README raiz aponta para a documentação (a fazer no health check final)
12. ✅ Não há claims inventados (toda informação não validada está marcada como `pendente de validação` / `hipótese` / `pendente de pesquisa`)
13. ✅ Toda informação externa não validada está marcada como pendência
14. ✅ O repositório continua funcional (sem código quebrado)
15. ✅ A documentação é legível para produto, marketing, conteúdo, design e engenharia

## 2. DoD por fase do roadmap

### Fase 0 — Discovery e fundação
- [ ] 16 documentos canônicos publicados
- [ ] 6 YAMLs estruturados
- [ ] Validação Bruno + coordenação acadêmica em pelo menos 50% dos campos
- [ ] Decisões de stack registradas em ata
- [ ] Health check final aprovado

### Fase 1 — MVP de autoridade e conversão
- [ ] 50 páginas indexáveis
- [ ] 5 páginas de curso funcionais com lead form integrado a CRM
- [ ] 5 páginas de tema (pillar SEO) com Voice Guard 2.0 ≥ 7/9
- [ ] Quiz operacional com lead capture
- [ ] Lighthouse ≥ 90 mobile em 100%
- [ ] WCAG 2.2 AA validado
- [ ] Schema validado em Rich Results Test (sem erros)
- [ ] llms.txt + sitemap + IndexNow ping operacional
- [ ] PostHog tracking ≥ 20 eventos
- [ ] LGPD compliance (cookie consent + termos)
- [ ] 30 leads/mês mensurados

### Fase 2 — SEO programático
- [ ] 27 UFs publicadas com Schema válido
- [ ] 135 páginas curso × UF
- [ ] 51 cidades Frente Regional (depende NAIA-310)
- [ ] 12 personas + 9 carreiras
- [ ] Anti-thin-content garantido (≥ 800 palavras únicas/UF)
- [ ] Sessões 50k/mês

### Fase 3 — Comparativos e personalização
- [ ] 12+ comparativos factuais (gate jurídico)
- [ ] Recomendação personalizada operacional
- [ ] A/B testing operacional
- [ ] Sessões 100k/mês; leads 250/mês

### Fase 4 — Comunidade, dados, otimização
- [ ] Webinars mensais operacionais
- [ ] Newsletter ativa
- [ ] Lead scoring operacional
- [ ] Dashboard performance interno

### Fase 5 — Escala e inteligência editorial
- [ ] Automação editorial ativa
- [ ] IA assistiva operacional
- [ ] Integração CRM + BI
- [ ] Sessões 200k/mês

## 3. DoD por entregável (matriz compacta)

| Entregável | Critérios mínimos |
|---|---|
| **Página de curso** | Schema Course + EOP + FAQPage; matriz curricular validada; lead form operacional; Voice Guard 2.0 ≥ 7/9; cross-link 3+ outras páginas; Lighthouse ≥ 90 mobile |
| **Página de tema (pillar)** | ≥ 3.000 palavras; ≥ 5 sources tier-1/tier-2; FAQ attached; Schema Article + FAQPage; lead magnet integrado |
| **Página estadual** | ≥ 800 palavras únicas; dados locais reais; Schema WebPage + Place; cross-link curso + cidades-âncora |
| **Página comparativa** | Matriz comparativa + critérios + validation_status por linha; gate jurídico; Schema Article |
| **Página de persona** | Narrativa de carreira + cursos recomendados + jornada de conteúdos; Schema Article |
| **Quiz** | 8-12 perguntas; tempo ≤ 3 min; lead capture; recomendação determinística |
| **Lead magnet** | Schema DigitalDocument; lead form gating; LGPD compliance |
| **Webinar** | Schema Event; data + duração + speakers; gravação após; e-mail automático |
| **Comparativo** | Factual + verificável + não-difamatório; pendentes marcados |

## 4. DoD universal (toda peça)

- [ ] PT-BR com acentuação completa
- [ ] Sem emojis
- [ ] Naming canônico respeitado
- [ ] Voice Guard 2.0 ≥ 7/9 enriquecimentos quando longa (>1500 palavras)
- [ ] Schema validado
- [ ] Cross-link mínimo (3+ outras páginas)
- [ ] CTA primário com verbo de ação
- [ ] Sources com URL + data + tier (quando aplicável)
- [ ] data_validade declarada
- [ ] LGPD compliance em forms

## Cross-links

- `01-contexto-estrategico.md` — KPIs e Strategic Moat
- `07-requisitos-funcionais.md` (40 RFs)
- `08-requisitos-nao-funcionais.md` (20 RNFs)
- `10-roadmap.md` (6 fases)
- `12-governanca-editorial.md`
- `docs/04-definicao-de-done.md` — DoD canônico do programa GEO IPOG (esta camada estende)
