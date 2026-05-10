# 08 — Requisitos Não-Funcionais

> **Audiência primária:** CTO + Engenharia + InfoSec + Compliance

## RNF-001 Performance — Core Web Vitals

| Métrica | Mobile alvo | Desktop alvo |
|---|---|---|
| LCP | ≤ 2,5 s | ≤ 2,0 s |
| INP | ≤ 200 ms | ≤ 100 ms |
| CLS | ≤ 0,1 | ≤ 0,05 |
| FCP | ≤ 1,8 s | ≤ 1,0 s |
| TTFB | ≤ 600 ms | ≤ 400 ms |
| Lighthouse Performance | ≥ 90 | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 | ≥ 95 |
| Lighthouse SEO | ≥ 95 | ≥ 95 |

## RNF-002 Acessibilidade — WCAG 2.2 AA

- HTML semântico, landmarks ARIA, 1 H1 por página
- Skip link, foco visível, ESC fecha modais
- Contraste ≥ 4,5:1 (texto comum), ≥ 3:1 (texto grande)
- Touch targets ≥ 44×44pt
- Não depender apenas de cor (usar cor + ícone + texto)
- Forms com label associado, aria-describedby para helper, aria-invalid em erros
- Vídeos com legendas; gráficos com descrição textual

## RNF-003 Responsividade mobile-first

- Todos os layouts começam pelo mobile e expandem
- Hero ≤ 80% da viewport
- Sumário em drawer (não sidebar) no mobile
- Tabelas → cards verticais no mobile
- CTAs sticky no rodapé em páginas de curso

## RNF-004 SEO técnico

- URLs canônicas (kebab-case ASCII)
- 1 H1 por página
- Meta title (≤ 60 chars) + description (≤ 160 chars)
- Schema.org por tipo de página (`05-arquitetura-da-informacao.md`)
- Sitemap XML segmentado + IndexNow ping
- Internal linking (toda página linka ≥ 3 outras)
- Páginas hub por tema + intenção + estado

## RNF-005 Segurança

- HTTPS only (HSTS)
- CSP (Content Security Policy) restritivo
- CSRF tokens em forms
- Rate limiting em lead forms (10/min/IP)
- Honeypot + Turnstile/reCAPTCHA em forms
- Headers seguros (X-Frame-Options DENY, X-Content-Type-Options nosniff)
- Logs sem PII

## RNF-006 LGPD

- Cookie consent (granular: necessários + analytics + marketing)
- Termo de consentimento explícito em lead forms
- Direito de acesso/portabilidade/esquecimento (`/conta/dados` quando logado; `/contato/lgpd` quando deslogado)
- Política de Privacidade + Termos de Uso públicos
- DPO declarado em footer
- Logs de consentimento auditáveis
- Sem coleta de dados sensíveis (saúde mental específica do usuário, etc.)

## RNF-007 Privacidade de dados sensíveis

- Diagnóstico/quiz: resultado em LocalStorage no MVP (sem coleta server-side); Fase 2 com consentimento explícito
- Sem rastreamento cross-site além do necessário
- Anonimização de session-id em logs de longo prazo

## RNF-008 Observabilidade

- PostHog (analytics + feature flags + heatmap + session recording)
- Sentry (erros front-end + back-end)
- Logs estruturados (JSON)
- Uptime monitoring (≥ 99,9% SLA Fase 2)
- Alertas para queda de conversão > 30% em 24h

## RNF-009 Escalabilidade editorial

- CMS deve suportar: 200+ ContentItems no MVP; 1.000+ em Fase 2; 5.000+ em Fase 3
- Sem degradação de build time acima de 5 min para 1.000 ContentItems
- ISR (incremental static regeneration) para listagens dinâmicas

## RNF-010 Manutenibilidade

- Convenção PT-BR + naming canônico (`docs/ontologia/`)
- TypeScript strict mode
- ESLint + Prettier + markdownlint
- Convenção de commits: Conventional Commits
- Branch protection main: PR obrigatório + CI verde

## RNF-011 Versionamento de conteúdo

- Cada ContentItem tem `version`, `published_at`, `last_updated`, `data_validade`
- Histórico de mudanças via Git (Markdown versionado)
- Tag semântica de release editorial (v1.0.0, v1.1.0, etc.)

## RNF-012 Resiliência

- Cache CDN (Cloudflare ou equivalente)
- Fallback estático quando API indisponível
- Forms com queue se CRM down (retry exponential backoff)
- Sem dependência de single point of failure

## RNF-013 Qualidade de código

- Cobertura de testes ≥ 80% em componentes críticos (lead forms, quiz, busca)
- E2E (Playwright) cobrindo: home, página de curso, lead form, quiz, busca
- Lighthouse CI bloqueando merge se score < threshold

## RNF-014 Internacionalização (futura)

- i18n estruturado desde MVP (ainda que apenas pt-BR)
- Strings em arquivo separado
- Fase 3: en-US opcional para captação internacional

## RNF-015 Tempo de carregamento por template

- Home: ≤ 2,5 s LCP mobile
- Página de curso: ≤ 3,0 s LCP mobile
- Página de estado: ≤ 3,0 s LCP mobile
- Quiz: ≤ 1,5 s TTI mobile

## RNF-016 Proteção contra claims não verificados

- Sistema de gating editorial (RF-035): claims sobre regulação/estatísticas exigem `source` + `evidence_strength` ≥ tier-2
- Linter de claims: detecta verbos "garante", "número 1", "imperdível" sem evidência

## RNF-017 Rastreabilidade de fontes

- Toda peça com `sources` array obrigatório (mínimo 3 sources tier-1 ou tier-2 em pillar SEO)
- Cada `source` com `url`, `publication_date`, `credibility_tier`, `last_validated_date`

## RNF-018 Governança sobre comparativos

- Comparativos passam por gate jurídico antes do publish
- Cada `comparison_criterion` com `validation_status` (validated/partial/pending)
- Sem linguagem difamatória (linter)
- "Pendente de validação" / "Não identificado publicamente" para dados não confirmados

## RNF-019 Políticas de atualização

- Conteúdos com `data_validade` ≤ hoje + 90 dias entram em fila de revisão
- Temas regulatórios (NR-1, Decreto 12.456) revisão trimestral
- Comparativos revisão semestral
- Páginas estaduais revisão semestral

## RNF-020 Definition of Done por entregável

Critérios em `16-definition-of-done.md`.

---

## Cross-links

- `07-requisitos-funcionais.md`
- `12-governanca-editorial.md`
- `13-metricas-e-analytics.md`
- `15-riscos-assuncoes-e-dependencias.md`
- `16-definition-of-done.md`
