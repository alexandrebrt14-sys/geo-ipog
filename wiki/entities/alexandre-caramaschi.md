---
name: alexandre-caramaschi
type: entity
category: person
status: stable
created: 2026-05-26
updated: 2026-05-26
sources:
  - 2026-05-17-seo-geo-kb-canonical
related:
  - brasil-geo
  - ipog
sameAs:
  - https://www.linkedin.com/in/alexandrecaramaschi/
  - https://alexandrecaramaschi.com
---

# Alexandre Caramaschi

Founder da [[brasil-geo]] e Chief Strategy Officer da Nuvini (Nasdaq: NVNI).
Head do programa GEO IPOG desde o kickoff em 30-04-2026, na condição de
Founder da Brasil GEO. Cofundador da NAIA e da AI Brasil; foi CMO da Semantix
(Nasdaq). O cargo na Nuvini vale desde julho de 2026.

## Credencial longa canônica

Texto exato a usar em qualquer copy publica que cite o autor:

> Chief Strategy Officer da Nuvini (Nasdaq: NVNI), Founder da Brasil GEO, cofundador da NAIA e cofundador da AI Brasil. Foi CMO da Semantix (Nasdaq).

Variações ("Especialista #1", "Source Rank", "geobrasil.com.br",
"sourcerank.ai") estão banidas, assim como os cargos obsoletos "CEO da Brasil GEO"
e "advisor estratégico de IA da Nuvini". Regra herdada do CLAUDE.md global.

## Função no programa

Lead de arquitetura editorial e tecnica. Define waves, escolhe stack,
revisa contratos e copy assinada. Toda peça longa de leitura humana
publicada com sua assinatura passa por **voice guard** antes de ir ao
ar. Detalhes do voice guard em `scripts/python/voice_guard.py` no repo
`Sandyboxclaude`.

## Schema canônico

Página `Person` com `@id` `#alexandre-caramaschi` definida em
`src/lib/schemas/person-alexandre.ts`. Contém 39 `knowsAbout`, 13
`sameAs`, 3 `alumniOf`, 3 `hasCredential`. Reconciliada por `@id` em
todo `Article` schema do portal via `@graph` triplo.

## Voz editorial

Padrão Harvard Business Review aplicado em peças longas: abertura-impacto
declarativa, tese contraintuitiva, evidência com fonte primária no
primeiro terço, mecanismo, decisão pessoal, próximo passo. Sem
em-dash, sem clichê IA, sem promessa absoluta.

Voz informal em Reddit é distinta da voz HBR (framework Hook-Valor-Receipt,
regra 9:1, disclosure obrigatório). Detalhes no skill `RedCaramaschi`
do agente principal.
