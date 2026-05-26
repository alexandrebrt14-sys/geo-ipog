---
name: naia
type: entity
category: tool
status: stable
created: 2026-05-26
updated: 2026-05-26
sources: []
related:
  - brasil-geo
  - mention-rate
---

# NAIA

Ferramenta proprietária de diagnóstico GEO usada pela [[brasil-geo]] como
camada de monitoramento técnico do programa. Cobre score de Schema,
llms.txt, autoridade externa e monitoramento de citações em LLMs.

## Categorias de check canônicas

Conforme `audits/PLAYBOOK-AUDITORIA-NAIA.md`:

- **NAIA-A:** Schema institucional (`Organization`, `EducationalOrganization`).
- **NAIA-B:** Schema de curso (`Course`, `EducationalOccupationalProgram`).
- **NAIA-C:** FAQ Schema.
- **NAIA-D:** Person Schema (corpo docente).
- **NAIA-E:** `llms.txt`.
- **NAIA-F:** `sitemap.xml` e `robots.txt`.
- **NAIA-G:** Conteúdo declarado vs realidade.
- **NAIA-H:** Performance.
- **NAIA-I:** Citações cross-LLM.
- **NAIA-J:** Autoridade externa.

## Categorias emergentes propostas

Mapeadas a partir do plano de 110 missões (W21):

- **NAIA-K:** Conteúdo + jornada de conversão.
- **NAIA-L:** Entidade + cobertura semântica.
- **NAIA-M:** Citabilidade GEO + infra LLM.
- **NAIA-N:** E-E-A-T institucional.

## Mapping para 110 missões digitais

Cerca de 60% das 110 missões digitais GEO IPOG mapeiam diretamente para
NAIA-A a NAIA-J existentes. Os 40% restantes alimentam as categorias
emergentes K-N na próxima revisão do playbook.
