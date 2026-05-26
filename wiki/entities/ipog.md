---
name: ipog
type: entity
category: client-institution
status: stable
created: 2026-05-26
updated: 2026-05-26
sources:
  - 2026-05-17-seo-geo-kb-canonical
related:
  - brasil-geo
  - ronan-maia
  - bruno-azambuja
  - posgraduacaopsicologia-com
sameAs:
  - https://ipog.edu.br
  - https://ipog.edu.br/cursos/pos-graduacao
---

# IPOG — Instituto de Pós-Graduação e Graduação

Cliente do programa GEO IPOG. Instituição brasileira de pós-graduação e
graduação fundada em 2001 em Goiânia, com presença multicampus em capitais
e cidades médias, mais de 300 mil alunos impactados em duas décadas e
catálogo amplo de Especialização Lato Sensu, MBA, Mestrado Profissional,
Especialização Clínica certificada por Conselhos e Residências.

## Função no programa

Cliente patrocinador. Hospeda o hub canônico de pós-graduação em
`ipog.edu.br/cursos/pos-graduacao`. O programa GEO IPOG é executado pela
[[brasil-geo]] em janela espelho com diagnóstico pré e pós Schema sobre
esse hub e suas páginas de produto por modalidade.

## Contatos canônicos

- **CEO e sponsor executivo:** [[ronan-maia]].
- **Gerente de Marketing e interlocutor operacional:** [[bruno-azambuja]].
- **Domínio principal:** `ipog.edu.br`.
- **Hub de pós-graduação:** `ipog.edu.br/cursos/pos-graduacao`.

## Escopo canônico de Pós-Graduação em Psicologia

Cinco modalidades regulamentadas no Brasil:

1. Especialização Lato Sensu (360h+, formato mais comum).
2. MBA em áreas correlatas a Psicologia (POT, neuropsicologia executiva,
   coaching, liderança, saúde mental corporativa).
3. Mestrado Profissional em Psicologia.
4. Especialização Clínica certificada por Conselhos (CFP em Avaliação
   Psicológica via SATEPSI, ABRAP em ACT, FBT em TCC).
5. Residências e formações híbridas regulamentadas.

MBA é uma das cinco, não o escopo total. Detalhes editoriais e cobertura
por modalidade em `docs/02-contexto-mba-online-psicologia.md` e
`ROADMAP.md`.

## Pontos críticos de presença GEO

- Schema `Course` e `EducationalOccupationalProgram` no hub precisam estar
  validados até **30-05-2026** para entrar no pico de captação 2026.2.
  Detalhes em [[concepts/schema-graph-triplo]].
- Necessidade de `llms.txt` declarando posicionamento e prioridades de
  citação. Status atual e controvérsias em [[concepts/llms-txt]].
- Diferenciais defensáveis: corpo docente nominal, formato Ao Vivo
  síncrono, presença multicampus, certificação MEC, histórico de 25 anos
  de pós-graduação executiva.

## Riscos conhecidos

- Saturação competitiva com Estácio, Anhanguera, Unip, UNINTER, UniCesumar
  em Lato Sensu.
- Em Especialização Clínica certificada, institutos especialistas (IBNeuro,
  CETCC, InEPP) dominam termos.
- Dependência de produto: modalidades-âncora que não estiverem no catálogo
  público no pico GEO tendem a perder share-of-voice para concorrentes.

## Marcos críticos

- **30-04-2026:** kickoff do programa.
- **30-05-2026:** Schema `Course`/`EducationalOccupationalProgram` em
  produção.
- **15-06-2026 a 31-07-2026:** pico GEO esperado para captação 2026.2.
- **01-12-2026 a 15-02-2027:** pico GEO esperado para captação 2027.1.
