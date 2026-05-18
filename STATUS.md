# STATUS — GEO IPOG

> Registro operacional de sprints, entregas e métricas do projeto GEO IPOG.
> Atualizado manualmente ao final de cada wave ou sessão de implementação.
> Fonte da verdade para handoff entre sessões.

---

## W21 — Semana 17/05/2026

### Páginas no ar
**235 páginas** (era 232 antes das waves 17/05).

### Sessão N — Briefing canônico das 110 missões digitais GEO IPOG (18/05/2026)

**Objetivo:** organizar e taxonomizar as 110 missões digitais GEO IPOG demandadas pelo CEO Alexandre Caramaschi (Brasil GEO, atuando como Engenheiro de Software e Arquiteto de Sistemas do programa) em estrutura canônica acionável por wave operacional, articulada com a taxonomia NAIA existente.

**Entregues:**

1. **`audits/CHECKLIST-DIGITAL-GEO-IPOG-110.md`** — documento mestre com as 110 missões organizadas em 9 eixos:
   - Eixo 1 — Infraestrutura técnica e crawlability (missões 1-15)
   - Eixo 2 — Performance, mobile e acessibilidade (16-20)
   - Eixo 3 — SEO on-page tradicional (21-26)
   - Eixo 4 — Conteúdo, profundidade e jornada de conversão (27-37)
   - Eixo 5 — Entidade, cobertura semântica e cobertura GEO (38-53)
   - Eixo 6 — Schema.org e dados estruturados (54-71)
   - Eixo 7 — Citabilidade GEO e infraestrutura LLM (72-89)
   - Eixo 8 — Confiança institucional e E-E-A-T (90-109)
   - Eixo 9 — Priorização operacional (110)

   Cada missão tem ID estável `GEO-IPOG-XXX`, mapeamento opcional para NAIA-XXX, severidade default (P0/P1/P2), wave de execução (L-Q), owner nominal, critério de done verificável e saída esperada. Dual track explícito: auditoria em `ipog.edu.br` + execução demonstrativa em `posgraduacaopsicologia.com` + plano de implantação gated por destravamento de cliente (Issues #6, #36, #61).

2. **`ROADMAP.md` atualizado** — bloco "Waves operacionais L-Q — 110 missões digitais GEO IPOG" inserido após a seção "Próximas waves planejadas (F-K)". Distribuição:
   - **Wave L** (19-05 a 02-06): Crawlability + Performance baseline — eixos 1, 2 + missão 110
   - **Wave M** (02-06 a 16-06): SEO on-page + Conteúdo editorial — eixo 3 + parte do 4
   - **Wave N** (16-06 a 30-06): Entidade + Cobertura semântica + Jornada — parte do 4 + eixo 5
   - **Wave O** (30-06 a 14-07): Schema completion — eixo 6 [gating-ipog: Issue #61]
   - **Wave P** (14-07 a 28-07): Citabilidade GEO + Infra LLM — eixo 7
   - **Wave Q** (28-07 a 11-08): E-E-A-T institucional — eixo 8 [gating-ipog]

3. **Articulação com ciclo de captação:** waves L, M, N e O concluídas até 15-07-2026 (entrada do pico 2026.2); waves P e Q ampliam a base entre 14-07 e 11-08-2026 para alimentar o pico 2027.1.

**Mapeamento NAIA das 110 missões:**

- ~60% das missões mapeiam diretamente para checks NAIA-A a NAIA-J existentes em `audits/PLAYBOOK-AUDITORIA-NAIA.md` (Schema institucional, Schema curso, FAQ, Person, llms.txt, sitemap/robots, conteúdo declarado, performance, citações cross-LLM, autoridade externa).
- ~40% das missões são gaps emergentes que recomendam-se promover a **novas categorias NAIA-K (Conteúdo + jornada de conversão), NAIA-L (Entidade + cobertura semântica), NAIA-M (Citabilidade GEO + infra LLM), NAIA-N (E-E-A-T institucional)** na próxima revisão do playbook.

**Próximos passos operacionais:**

1. Abrir 1 epic GitHub por wave (`[L] Crawlability + Performance baseline`, etc.) no repo `alexandrebrt14-sys/geo-ipog` — opcional, conforme decisão de governança.
2. Iniciar Wave L imediatamente em `posgraduacaopsicologia.com` (baseline executável sem destravamento de cliente).
3. Levar a matriz de priorização canônica (missão 110) ao próximo checkpoint com Ronan Maia.
4. Sincronizar com Bruno Azambuja na cadência quinzenal para destravar Issues #6 (robots.txt) e #36 (GSC+GA4) antes do início da Wave O.

**Custo estimado da sessão:** $0,00 (trabalho de arquitetura conduzido no Claude principal sem fan-out de sub-agentes).

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
