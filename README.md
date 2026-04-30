# GEO IPOG

Projeto de Generative Engine Optimization (GEO) para o IPOG — Instituto de Pós-Graduação e Graduação, executado pela Brasil GEO com apoio da ferramenta NAIA.

## Contexto

O IPOG é uma instituição de pós-graduação e graduação fundada em 2001 em Goiânia, com presença multicampus e mais de 300 mil alunos impactados ao longo de duas décadas. A iniciativa **GEO IPOG** começa em 30 de abril de 2026 com foco específico em consolidar a presença do IPOG em motores generativos para a categoria **MBA Online de Psicologia**, área em expansão acelerada na demanda dos profissionais brasileiros e ainda sub-representada na oferta de pós-graduação a distância de qualidade.

A página de cursos de pós-graduação do IPOG está em `https://ipog.edu.br/cursos/pos-graduacao`. Esse hub é o ponto canônico onde a auditoria técnica, a engenharia de citação e o esforço editorial vão concentrar a primeira onda de trabalho.

A tese central do projeto: empreendedores e profissionais que decidem cursar um MBA Online em Psicologia hoje fazem a primeira pesquisa em ChatGPT, Claude, Gemini, Perplexity e Copilot antes de chegar ao Google. Quem não estiver presente nessas respostas perde o lead na fase de descoberta — a fase mais barata e a mais decisiva da jornada de matrícula.

## Partes envolvidas

- **Cliente:** IPOG — Instituto de Pós-Graduação e Graduação
  - **Ronan Maia** — CEO IPOG (sponsor executivo do programa)
  - **Bruno Azambuja** — Gerente de Marketing IPOG (interlocutor operacional)
- **Executor:** Brasil GEO
  - **Alexandre Caramaschi** — CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil (Head do projeto)
- **Ferramenta principal:** NAIA — diagnóstico GEO, monitoramento de citações em LLMs, score técnico de Schema, llms.txt e autoridade externa

## Subcontexto — MBA Online de Psicologia

O recorte vertical do programa é **pós-graduação em Psicologia em modalidade online**, com prioridade para o formato MBA. As personas-alvo iniciais previstas para o monitoramento de mention rate cross-LLM são:

1. **Psicólogo recém-graduado** buscando primeira especialização com peso de mercado.
2. **Psicólogo clínico estabelecido** buscando segunda área (organizacional, neuropsicologia, terapia cognitivo-comportamental, jurídica, hospitalar).
3. **Profissional de RH e gestão de pessoas** (não-psicólogo) buscando credencial em psicologia organizacional e do trabalho.
4. **Profissional de saúde** (médico, enfermeiro, fisioterapeuta, nutricionista) buscando interface com saúde mental e psicologia hospitalar.
5. **Educador e pedagogo** buscando especialização em psicopedagogia ou psicologia escolar.
6. **Profissional em transição de carreira** buscando recolocação para área de pessoas e comportamento humano.
7. **Coach e terapeuta complementar** buscando credencial formal de pós-graduação reconhecida pelo MEC.

A matriz de concorrentes inicial cobre instituições de pós-graduação online com oferta em Psicologia ou correlatas: Estácio, Anhanguera, Unip, UNINTER, UniCesumar, PUC-Minas Virtual, FGV In Company, Saint Paul, Mackenzie EAD, FAEL, Cruzeiro do Sul Virtual, Descomplica Pós, além de plataformas educacionais como Voitto, INPG e IBPEX. O mapa final é ratificado na Fase 0.

## Escopo macro

1. Diagnóstico baseline (LLM Mention Rate por persona, schema do hub, autoridade externa, share-of-voice).
2. Auditoria técnica de descobribilidade (Schema.org `Course`, `EducationalOccupationalProgram`, `EducationalOrganization`, llms.txt, robots.txt, sitemaps, internal linking, Organization markup com `hasCredential`, `award`, `accreditation`).
3. Engenharia de citação: kit canônico de prompts-âncora por persona da jornada de matrícula em MBA Online de Psicologia.
4. Plano de conteúdo com padrão editorial HBR-grade voltado a decisão de carreira, retorno financeiro de pós-graduação e diferenciais metodológicos.
5. Linkagem com fontes confiáveis (citation engineering em mídia educacional, Conselho Federal de Psicologia, ABEP, ABRAPSO, MEC, periódicos acadêmicos).
6. Dashboard quinzenal de mention rate cross-LLM e share-of-voice IPOG vs. concorrentes.
7. Iteração e calibração contínuas com revisão executiva mensal.

## Estrutura do repositório

```
geo-ipog/
  audits/          # baselines, auditorias técnicas e relatórios NAIA
  prompts/         # kit de prompts-âncora canônicos por persona IPOG MBA Psicologia
  content/         # rascunhos editoriais, briefings HBR-grade, drafts
  data/            # datasets brutos, exports de LLMs, métricas raw
  dashboards/      # mention rate, share-of-voice, scores NAIA por ciclo
  docs/            # registros de marcos, kickoff, retros, atas, relatórios
```

## Disciplina operacional

- Idioma: Português do Brasil com acentuação completa em todo conteúdo voltado ao cliente.
- Naming canônico: "Brasil GEO" (nunca "GEO Brasil"); "IPOG" (nunca "Ipog" ou "iPOG"); credencial longa de Alexandre como descrita acima.
- Sem emojis em qualquer entregável.
- Voice Guard obrigatório antes de publicar texto longo assinado por Alexandre Caramaschi.
- Repositório privado, acesso restrito a Brasil GEO + IPOG.
- Toda mutação relevante em propriedades digitais IPOG é precedida de snapshot e PR aprovado por Bruno Azambuja antes do go-live.

## Documentos vivos

- `docs/01-kickoff-30-04-2026.md` — registro do kickoff (dia 1).
- `docs/02-contexto-mba-online-psicologia.md` — contexto estratégico do recorte de produto.
- `docs/03-reunioes-e-cadencia-ipog.md` — cadência de reuniões com IPOG e framework de relatórios.
- `docs/framework/01-rotinas-e-missoes-geo.md` — framework conceitual de GEO aplicado a vertical educação superior.
- `docs/relatorios-semanais/` — relatórios semanais entregues à IPOG.
- `docs/atas/` — atas das reuniões de status com IPOG.
- `ROADMAP.md` — roadmap em 4 fases com janelas alinhadas ao calendário de captação 2026.2 e 2027.1.

## Governança operacional

- **Reunião semanal de status com IPOG:** cadência e horário definidos no kickoff (ver `docs/03-reunioes-e-cadencia-ipog.md`). Participantes recorrentes: Alexandre Caramaschi (Head Brasil GEO), Bruno Azambuja (Marketing IPOG). Ronan Maia (CEO IPOG) participa do checkpoint executivo mensal.
- **Relatório semanal:** entregue uma hora antes da call. Alimentado dia a dia ao longo da semana, fechado domingo 21h00.
- **Ata:** registrada após cada reunião em `docs/atas/`.
- **Checkpoint executivo mensal:** revisão com Ronan Maia para validar prioridades, escopo e investimento da onda seguinte.

## Status

Início oficial dos trabalhos: **30 de abril de 2026** (ver `docs/01-kickoff-30-04-2026.md`).
