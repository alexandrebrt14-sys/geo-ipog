# 11 — Backlog (16 épicos + features + user stories)

> **Audiência primária:** Product Owner + Tech Lead + Time

## Estrutura

```
Épico → Feature → User Story
```

Cada user story tem: prioridade (Must/Should/Could) + complexidade (Baixa/Média/Alta) + impacto (Baixo/Médio/Alto) + critérios de aceite.

---

## Épico 1 — Fundação de conteúdo

### Feature 1.1 — 5 páginas individuais de curso

#### US 1.1.1 — Página MBA POT (flagship)
Como **psicóloga em expansão**, quero **ver matriz curricular detalhada do MBA POT**, para **decidir se o curso atende minha necessidade de migrar para área organizacional**.
**Prioridade:** Must · **Complexidade:** Alta · **Impacto:** Alto
**Critérios:**
- Schema Course + EOP + FAQPage validados
- Voice Guard 2.0 ≥ 7/9
- Matriz curricular validada com coordenação IPOG
- Cross-link com 3 comparativos + 1 quiz + 5 ContentItems

#### US 1.1.2 a 1.1.5 — Páginas dos outros 4 MBAs
Equivalente para MBA Psi Positiva + Reab Neuropsi + Neurociência + Gestão Pessoas.

### Feature 1.2 — 14 páginas de tema (pillar SEO)

US 1.2.1: NR-1 e Riscos Psicossociais (Must/Alta/Alto) — pillar 5.000 palavras
US 1.2.2 a 1.2.14: outros 13 temas (Must/Alta/Médio)

### Feature 1.3 — 50 termos de glossário

US 1.3.1: 50 termos canônicos com Schema DefinedTerm + cross-link curso/tema (Must/Média/Médio)

---

## Épico 2 — Ontologia e taxonomia

### Feature 2.1 — Esquema CMS

US 2.1.1: schemas TypeScript das 40 entidades (Must/Alta/Alto)
US 2.1.2: validação automática contra YAMLs canônicos (Should/Média/Alto)

### Feature 2.2 — Tagueamento automatizado

US 2.2.1: linter que valida cada peça contra os 8 eixos taxonômicos (Should/Média/Médio)

---

## Épico 3 — Navegação e menus

### Feature 3.1 — Header desktop

US 3.1.1: 9 menus principais com mega menu ao hover (Must/Média/Alto)
US 3.1.2: campo de busca global no header (Must/Baixa/Alto)

### Feature 3.2 — Header mobile

US 3.2.1: drawer hambúrguer + bottom navigation (Must/Média/Alto)

### Feature 3.3 — Breadcrumbs

US 3.3.1: BreadcrumbList Schema em todas páginas exceto Home (Must/Baixa/Médio)

---

## Épico 4 — Páginas de cursos

### Feature 4.1 — Template de curso programático

US 4.1.1: template Next.js que renderiza Course a partir de Markdown + YAML frontmatter (Must/Alta/Alto)
US 4.1.2: lead form integrado com CRM (Must/Alta/Alto)
US 4.1.3: cross-link automatizado com comparativos + temas (Must/Média/Médio)

### Feature 4.2 — Capstone executivo (mostrar como diferencial)

US 4.2.1: seção "Capstone executivo" em cada MBA com case-template (Should/Baixa/Médio)

---

## Épico 5 — Páginas de temas

### Feature 5.1 — Template pillar

US 5.1.1: template de pillar SEO (3.000-7.000 palavras + FAQ + lead magnet) (Must/Média/Alto)
US 5.1.2: linker automático com spokes (Should/Média/Médio)

---

## Épico 6 — Páginas por persona

### Feature 6.1 — 12 páginas de persona

US 6.1.1: Para Psicólogos com narrativa de carreira + cursos recomendados (Must/Média/Alto)
US 6.1.2 a 6.1.12: outras 11 personas (Should/Média/Médio)

---

## Épico 7 — Páginas por estado

### Feature 7.1 — Template UF programático

US 7.1.1: template `/por-estado/{uf}/` com 800+ palavras únicas + dados locais (Must/Alta/Alto)
US 7.1.2: 27 UFs implementados (Must/Alta/Alto)
US 7.1.3: linkagem cidade-âncora quando Frente Regional (Should/Média/Médio)

### Feature 7.2 — Curso × UF

US 7.2.1: 135 páginas (5 cursos × 27 UFs) com Schema localizado (Must/Alta/Alto)

### Feature 7.3 — 51 cidades Frente Regional

US 7.3.1: 51 páginas de cidade com Schema LocalBusiness + EducationalOrganization (Should/Alta/Alto, depende NAIA-310)

---

## Épico 8 — Comparativos

### Feature 8.1 — Template comparativo

US 8.1.1: template com matriz comparativa + critérios + validation_status por linha (Must/Alta/Alto)
US 8.1.2: 12 comparativos publicados na Fase 3 (Must/Alta/Alto)
US 8.1.3: gate de revisão jurídica antes do publish (Must/Baixa/Crítico)

---

## Épico 9 — Busca e filtros

### Feature 9.1 — Busca global

US 9.1.1: indexação Algolia/MeiliSearch + autosuggest (Must/Alta/Alto)
US 9.1.2: ranking conforme `06-BUSCA-GLOBAL.md` adaptado (Must/Média/Alto)
US 9.1.3: estado vazio inteligente (Should/Baixa/Médio)

### Feature 9.2 — Filtros multi-dimensão

US 9.2.1: filtros por curso + tema + persona + estado em listagens (Must/Média/Alto)

---

## Épico 10 — Conversão e CRM

### Feature 10.1 — Lead forms

US 10.1.1: lead form com ≤ 5 campos + LGPD checkbox (Must/Média/Alto)
US 10.1.2: integração CRM IPOG via API (Must/Alta/Alto, dependência: API CRM)
US 10.1.3: página de agradecimento com cross-sell (Must/Baixa/Médio)

### Feature 10.2 — Quiz interativo

US 10.2.1: quiz "Qual MBA combina com você?" (Must/Alta/Alto)
US 10.2.2: lead capture no fim do quiz (Must/Média/Alto)
US 10.2.3: scoring determinístico baseado em persona × dor × intenção (Must/Média/Alto)

### Feature 10.3 — WhatsApp + agendamento

US 10.3.1: botão flutuante WhatsApp com mensagem pré-preenchida (Must/Baixa/Alto)
US 10.3.2: integração Calendly ou similar para agendamento de conversa (Should/Média/Médio)

---

## Épico 11 — SEO técnico

### Feature 11.1 — Schema.org

US 11.1.1: Schema em todas páginas conforme `data/seo-page-types.yaml` (Must/Média/Alto)
US 11.1.2: validação automática em CI (Should/Média/Médio)

### Feature 11.2 — Sitemap + robots + llms.txt

US 11.2.1: sitemap.xml + sub-sitemaps (Must/Média/Alto)
US 11.2.2: robots.txt aberto a IA crawlers (Must/Baixa/Alto)
US 11.2.3: llms.txt no ar (Must/Baixa/Alto)
US 11.2.4: IndexNow ping em publishes (Should/Baixa/Médio)

---

## Épico 12 — Analytics

### Feature 12.1 — PostHog

US 12.1.1: instalação + configuração (Must/Baixa/Alto)
US 12.1.2: 30+ eventos canônicos rastreados (Must/Média/Alto)
US 12.1.3: dashboard de funnel por curso (Should/Média/Alto)

### Feature 12.2 — GA4 + Search Console

US 12.2.1: integração GA4 + GSC (Must/Baixa/Alto)

---

## Épico 13 — Governança editorial

### Feature 13.1 — Workflow editorial

US 13.1.1: branch protection main + PR review obrigatório (Must/Baixa/Alto)
US 13.1.2: Voice Guard 2.0 como gate de publish (Must/Média/Alto)
US 13.1.3: revisão jurídica para comparativos + claims regulatórios (Must/Baixa/Crítico)
US 13.1.4: data_validade + alerta automático para conteúdos vencidos (Should/Média/Médio)

---

## Épico 14 — Performance e acessibilidade

### Feature 14.1 — Core Web Vitals

US 14.1.1: Lighthouse CI bloqueando merge se score < threshold (Must/Média/Alto)
US 14.1.2: otimização de imagens (Next.js Image + lazy loading) (Must/Baixa/Alto)
US 14.1.3: SSG para conteúdo estático + ISR para dinâmico (Must/Média/Alto)

### Feature 14.2 — WCAG 2.2 AA

US 14.2.1: axe-core em CI (Must/Baixa/Alto)
US 14.2.2: auditoria manual mensal (Should/Baixa/Médio)

---

## Épico 15 — Ferramentas interativas

### Feature 15.1 — Quiz "Qual MBA"

(coberto em Épico 10)

### Feature 15.2 — Calculadoras (Fase 2+)

US 15.2.1: Calculadora ROI saúde mental corporativa (Could/Média/Médio)
US 15.2.2: Diagnóstico maturidade RH em saúde mental (Could/Média/Médio)

---

## Épico 16 — Segurança e LGPD

### Feature 16.1 — LGPD

US 16.1.1: cookie consent granular (Must/Média/Crítico)
US 16.1.2: termo de consentimento em lead forms (Must/Baixa/Crítico)
US 16.1.3: política de privacidade + termos públicos (Must/Baixa/Crítico)
US 16.1.4: direito de acesso/portabilidade/esquecimento (`/contato/lgpd`) (Must/Média/Crítico)

### Feature 16.2 — Segurança

US 16.2.1: HTTPS only + HSTS (Must/Baixa/Alto)
US 16.2.2: CSP restritivo (Must/Média/Alto)
US 16.2.3: rate limiting em lead forms (Must/Baixa/Alto)
US 16.2.4: honeypot + Turnstile/reCAPTCHA (Must/Baixa/Alto)

---

## Resumo

- **16 épicos** mapeados
- **~50 features**
- **~120 user stories**
- Distribuídas em 6 fases conforme `10-roadmap.md`

## Cross-links

- `07-requisitos-funcionais.md` (40 RFs)
- `08-requisitos-nao-funcionais.md` (20 RNFs)
- `10-roadmap.md`
