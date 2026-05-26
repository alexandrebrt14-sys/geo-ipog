---
name: eeat-ymyl
type: concept
status: stable
created: 2026-05-26
updated: 2026-05-26
sources:
  - 2026-05-17-seo-geo-kb-canonical
related:
  - geo
  - larissa-caramaschi
---

# E-E-A-T em conteúdo YMYL

Conceito derivado das Search Quality Rater Guidelines do Google e
incorporado como pilar canônico de GEO em 2026.

- **E-E-A-T:** Experience, Expertise, Authoritativeness, Trustworthiness.
- **YMYL:** Your Money Your Life. Domínios onde decisões podem afetar
  saúde, finanças, segurança ou bem-estar do leitor.

## Aplicação canônica no portal

`posgraduacaopsicologia.com` é YMYL crítico em 3 verticais:

1. **Saúde mental** (autismo, TEA, TDAH, depressão, ansiedade, burnout,
   primeiro episódio psicótico, perinatal). Revisão clínica nominal por
   [[larissa-caramaschi]] obrigatória.
2. **Neuropsicologia** (avaliação, laudo, prescrição de intervenção).
3. **IA aplicada a psicologia** (psicodiagnóstico assistido, CFP-compliance).

## Componente canônico

`src/components/YMYLDisclaimer.astro` com 4 variantes (`autismo`,
`saude-mental`, `neuropsicologia`, `geral`). Texto fixo inclui:

- "Não substitui avaliação clínica."
- Indicação de busca por psicólogo registrado no CRP.
- Revisão clínica nominal.
- `dateModified` visível.

## Sinais técnicos canônicos

- `Person` schema do autor com `hasCredential` (registro CRP, formação,
  certificações).
- `Article` schema com `reviewedBy` apontando para `Person` clínico
  competente (CFP, COFFITO, CRN, CFM, CFP, CFC, CRP conforme YMYL
  específico).
- `dateModified` real, não placeholder.
- Aviso visual `role="note"` injetado em todas as páginas do domínio
  YMYL.

## Anti-padrões absolutos

Veto a:

- "Garante CFP", "aprovado garantido", "carreira em 30 dias",
  "ChatGPT já cita", "AI Overview garantido", "especialista #1",
  "100% de aprovação".
- Comparativo direto com outros profissionais ("melhor que").
- Antes/depois clínico.
- Promessa de cura.

Conceito 26 da taxonomia editorial canônica
(`docs/governance/GEO_50_CONCEITOS_CANONICAL.md`).
