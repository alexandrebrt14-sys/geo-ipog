# 15 — Riscos, Assunções e Dependências

> **Audiência primária:** CPO + CTO + Compliance + Marketing

## 1. Riscos catalogados (12+)

### R-PORTAL-001 — Conteúdo programático virar thin content
**Probabilidade:** Alta · **Impacto:** Crítico
**Mitigação:** ≥ 800 palavras únicas/UF + dados locais reais; "pendente de pesquisa" + omitir quando não há dado; revisão editorial mensal de UFs com baixo tráfego.
**Gatilho:** se ≥ 30% das páginas estaduais sem leads em 90 dias.

### R-PORTAL-002 — Comparativos gerarem risco jurídico
**Probabilidade:** Média · **Impacto:** Alto
**Mitigação:** linguagem factual + validation_status por linha + gate jurídico antes do publish + sem superlativos sem evidência.
**Gatilho:** primeira reclamação formal de concorrente.

### R-PORTAL-003 — Claims educacionais sem validação
**Probabilidade:** Média · **Impacto:** Crítico
**Mitigação:** RNF-016 + RNF-017 (linter de claims, sources obrigatórias); coordenação acadêmica IPOG aprova antes do publish; data_validade obrigatório.
**Gatilho:** detecção de claim refutado pós-publish.

### R-PORTAL-004 — Dados sobre cursos desatualizados
**Probabilidade:** Alta · **Impacto:** Médio
**Mitigação:** data_validade ≤ trimestral em páginas de curso; alerta automático ≤ 90 dias antes do vencimento; revisão coordenação acadêmica trimestral.

### R-PORTAL-005 — SEO local sem relevância real
**Probabilidade:** Alta · **Impacto:** Médio
**Mitigação:** dados locais reais por UF; UFs com tráfego < threshold após 6 meses recebem ajuste editorial ou noindex; foco em UFs com Frente Regional CNPJ-próprio (8 estados prioritários).

### R-PORTAL-006 — Taxonomia excessivamente complexa
**Probabilidade:** Média · **Impacto:** Médio
**Mitigação:** 8 eixos taxonômicos com valores enumerados (`data/taxonomy.yaml`); cada peça tagueada em ≤ 6 dimensões na prática (não todas as 8); UI de filtros mostra ≤ 3 dimensões padrão.

### R-PORTAL-007 — Baixa conversão por excesso de conteúdo e pouco CTA
**Probabilidade:** Média · **Impacto:** Alto
**Mitigação:** CTA por etapa da jornada canônico (`05-arquitetura-da-informacao.md` §9); A/B test de CTAs (`13-metricas-e-analytics.md` §5.4); sticky mobile CTA em páginas de curso.

### R-PORTAL-008 — Falta de integração com CRM
**Probabilidade:** Média · **Impacto:** Alto
**Mitigação:** decisão DEC-IPOG-CRM até Fase 0 fechar; fallback temporário com queue de e-mails se CRM não disponível.
**Dependência:** API CRM IPOG.

### R-PORTAL-009 — Métricas incompletas
**Probabilidade:** Média · **Impacto:** Médio
**Mitigação:** PostHog desde Sprint 1 com 30+ eventos canônicos; GA4 + GSC complementares; dashboard de funnel por curso desde Fase 1.

### R-PORTAL-010 — Uso inadequado de temas de saúde mental
**Probabilidade:** Média · **Impacto:** Alto (reputacional + jurídico)
**Mitigação:** governança editorial (`12-governanca-editorial.md` §7); disclaimer CVV 188 obrigatório; sem prescrição; revisão coordenação acadêmica em peças sensíveis.

### R-PORTAL-011 — Confusão entre MBA, pós-graduação Lato Sensu e formação clínica
**Probabilidade:** Alta · **Impacto:** Médio
**Mitigação:** disclaimer canônico em toda página de curso ("Especialização Lato Sensu reconhecida pelo MEC; não habilita prática clínica para não-psicólogos"); FAQ específica por curso.

### R-PORTAL-012 — Oferta de curso não corresponder ao conteúdo publicado
**Probabilidade:** Baixa · **Impacto:** Crítico
**Mitigação:** sincronização trimestral de matriz curricular com coordenação acadêmica; processo formal de change management quando curso muda.

### R-PORTAL-013 — Concorrentes lançarem portal similar antes do MVP
**Probabilidade:** Média · **Impacto:** Alto
**Mitigação:** time-to-market — MVP em 3 meses (`10-roadmap.md` Fase 1); diferencial F5 Wikipedia + Reddit + YouTube + Frente Regional CNPJ-próprio; flagship product MBA POT 9 módulos.

### R-PORTAL-014 — Reação CFP/CRPs específicos contra MBA online em Psi
**Probabilidade:** Média · **Impacto:** Alto
**Mitigação:** R-019 do registro macro IPOG; parcerias formais com 5+ CRPs estaduais (CRP-09, 03, 18, 14, 23); naming alternativo "Especialização" como fallback.

## 2. Assunções

A1. O portal será usado como motor de **aquisição orgânica e conversão** (não apenas branding).
A2. O IPOG quer competir **nacionalmente** (não apenas em Goiás).
A3. O visitante pode chegar pelo curso, problema, persona ou estado (4 eixos).
A4. Conteúdo regulatório de 2025/2026 (NR-1, Decreto 12.456) **precisa de atualização constante**.
A5. As páginas por estado serão úteis para SEO e segmentação comercial (validar via tráfego).
A6. O time IPOG terá capacidade editorial para manter o portal (validar Fase 0 com Bruno).
A7. O orçamento da Brasil GEO suporta produção HBR-grade via sub-agents Opus paralelos.
A8. CMS de Markdown versionado é viável (sem necessidade de CMS visual no MVP).
A9. Stack Next.js 16 + React 19 + Tailwind v4 é decisão final (alinhada com `landing-page-geo`).
A10. Hospedagem Cloudflare Workers + Pages é viável (a confirmar com TI IPOG).

## 3. Dependências externas

| Dependência | Owner | Bloqueia | Prazo |
|---|---|---|---|
| **Dados oficiais dos cursos** (matrizes curriculares vigentes) | Coordenação acadêmica IPOG | Páginas de curso | Pre-Fase 1 |
| **Grade curricular atualizada** | Coordenação acadêmica IPOG | RF-003 | Pre-Fase 1 |
| **Preços** (se públicos) | Bruno + financeiro IPOG | RF-003 (módulo "Investimento") | Sprint 1 |
| **Modalidade e duração validadas** | Coordenação acadêmica IPOG | RF-003 | Pre-Fase 1 |
| **Políticas comerciais** (descontos, parcelamento) | Bruno + financeiro IPOG | Lead form + matrícula | Sprint 1-2 |
| **Integração com CRM** (RD Station, HubSpot ou similar) | Bruno + TI IPOG | RF-023 | Sprint 1 |
| **Aprovação jurídica** | Jurídico IPOG | Comparativos + claims | Por peça |
| **Aprovação acadêmica** | Coordenação acadêmica | Conteúdo de Psicologia | Por peça |
| **Diretrizes de marca** (logo, cores, tipografia) | Bruno + Stone Marketing equivalente | Design system | Pre-Fase 1 |
| **Dados de concorrentes** (a validar) | Brasil GEO + pesquisa primária | Comparativos | Sprint 4-6 |
| **Ferramentas de analytics** (PostHog license) | Bruno + Brasil GEO | RF-028 | Sprint 1 |
| **Acessos GSC + GA4 IPOG** (D-06 do programa GEO) | Bruno + TI IPOG | SEO measurement | Pre-Fase 1 |
| **Lista oficial 51 cidades Frente Regional** (NAIA-310) | Bruno + Ronan | Páginas cidade + Frente Regional | Pre-Fase 2 |
| **Termos de cooperação CRPs** (NAIA-313) | Bruno + Brasil GEO | Cluster autoridade institucional | Fase 2 |

## Cross-links

- `01-contexto-estrategico.md` — Strategic Moat (5 moats defensáveis)
- `08-requisitos-nao-funcionais.md` (RNF-016 a RNF-020)
- `12-governanca-editorial.md`
- `docs/05-risk-register.md` (R-001 a R-019 macro do programa GEO IPOG)
- `audits/benchmarking/MBA-PSICOLOGIA-MERCADO-2026-EXPANDIDO.md` (riscos competitivos)
