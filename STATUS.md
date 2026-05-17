# STATUS — GEO IPOG

> Registro operacional de sprints, entregas e métricas do projeto GEO IPOG.
> Atualizado manualmente ao final de cada wave ou sessão de implementação.
> Fonte da verdade para handoff entre sessões.

---

## W21 — Semana 17/05/2026

### Páginas no ar
**235 páginas** (era 232 antes das waves 17/05).

### Sessão 1 — Sprint KB + 5 waves research (17/05/2026)

Arquivos canônicos gerados:

- `docs/research/seo-geo-knowledge-base-2026-05-17.md` — base de conhecimento GEO/AISO 2026
- 5 waves de research paralelas (Perplexity sonar-pro + Claude Opus 4):
  - Wave AA: Speakable + EducationalOccupationalProgram em /mbas/*
  - Wave BB: Gaps em /areas/*
  - Wave CC: Gaps em /comparativos/*
  - Wave DD: Citation-prompts v2 (25 prompts renovados)
  - Wave EE: Monitor DIY + runbooks operacionais

Novos arquivos de sprint (18 ao total):
- 3 páginas novas (detectadas no audit)
- 3 schemas TypeScript canônicos (`educational-program.ts`, `educational-organization.ts`, `person-alexandre.ts`)
- 2 runbooks operacionais (`docs/runbooks/`)
- 1 monitor DIY (`docs/monitor-diy.md`)
- 1 citation-prompts v2 (`docs/citation-prompts-v2.json`)
- Demais: atualizações em `Base.astro` (@graph triplo), `schemas/index.ts`, `CLAUDE.md`

Issues comentadas no GitHub: #43, #46, #51, #56, #57, #61, #76, #78

### Sessão 2 — Wave AA Remediação (17/05/2026, tarde)

**Objetivo:** Aplicar JSON-LD `EducationalOccupationalProgram` canônico (via `buildEducationalOccupationalProgram`) nas 5 páginas MBA e na página `/tipos-de-pos-graduacao`.

**Entregues:**

1. **5 páginas `/mbas/[slug].astro` remediadas:**
   - `/mbas/mba-pot` — schema canônico com `@id`, `recognizedBy` MEC, `timeRequired: P360H`, 5 `hasCourse`
   - `/mbas/mba-positiva` — idem, `timeRequired: P360H`
   - `/mbas/mba-neuro` — idem, `timeRequired: P420H`
   - `/mbas/mba-ncpp` — idem, `timeRequired: P360H`
   - `/mbas/mba-lideranca-positiva` — idem, `timeRequired: P360H`
   - Import: `buildEducationalOccupationalProgram` de `@lib/schemas/educational-program`
   - Substituição: bloco `ldProgram` inline simples → factory canônica com `@id`, `recognizedBy`, `offers`, `programPrerequisites`, `hasCourse`

2. **`/tipos-de-pos-graduacao.astro` atualizada:**
   - 5 novos blocos `<script type="application/ld+json">` (um por modalidade)
   - Modalidades cobertas: `Especialização Lato Sensu`, `MBA`, `Mestrado Profissional`, `Especialização Clínica`, `Residência`
   - Cada bloco usa `buildEducationalOccupationalProgram` com `timeRequired`, `educationalCredentialAwarded`, `recognizedBy` automático por modalidade

3. **`STATUS.md` criado** na raiz do repo (este arquivo).

---

## §6.3 — Próximas sprints recomendadas

Baseado no audit `docs/governance/audit-graph-triple-2026-05-17.md`:

1. **Wave BB — /areas/* (52 hubs com gap secundário)**
   - Adicionar `EducationalOccupationalProgram` como bloco secundário em cada hub de área
   - Adicionar `Speakable` nos blocos "Resposta rápida" e FAQ

2. **Wave CC — /comparativos/* (18 páginas)**
   - Schema `Article` + `Speakable` nos blocos de síntese
   - `breadcrumb` canônico

3. **Wave DD — citation-prompts v2**
   - Substituir os 25 prompts por versão revisada com dados 2026
   - Publicar em `/citation-prompts.json` (já existe v1)

4. **Wave EE — monitor DIY**
   - Implementar script de monitoramento de citação semanal
   - Alertas por e-mail quando mention rate cair abaixo de threshold

5. **Indexação em lote**
   - IndexNow para as 3 páginas novas (smoke + submit)
   - GSC sitemap re-submit após confirmar 235 URLs no sitemap

---

## Histórico de waves anteriores

| Wave | Data | Páginas | Destaque |
|------|------|---------|----------|
| K–O | 12-05-2026 | 116 | 27 UFs, 18 áreas, /metodos |
| P–T | 12-05-2026 | 143 | /evidencias, /casos, /intervencoes |
| U–Z | 12-05-2026 | 174 | /guias, /faq, glossário 115 termos |
| AA–EE | 13-05-2026 | 198 | 6 guias HowTo, 6 FAQs, 8 comparativos |
| Hardening pt2 | 13-05-2026 | 198 | llms.txt v2, Person Alexandre, Speakable 12 FAQs |
| FF–JJ | 13-05-2026 | 212 | TEA mulheres, burnout NR-1, IA CFP, adolescência |
| KK–OO | 13-05-2026 | 232 | Setores verticais, 6 polos Stone, 5 calculadoras |
| W21 sess.1 | 17-05-2026 | 232 | KB GEO 2026, schemas canônicos, @graph triplo |
| W21 sess.2 | 17-05-2026 | **235** | EducationalOccupationalProgram 5 MBAs + tipos-de-pos |
