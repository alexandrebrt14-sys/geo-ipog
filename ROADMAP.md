# Roadmap GEO IPOG

> **Última revisão:** 10-05-2026 (durante healthcheck — `docs/HEALTHCHECK-2026-05-10.md`)
> **Snapshot operacional ativo:** `STATUS.md`
> **Contexto estratégico integrado:** `docs/CONTEXTO-AMPLIADO-2026-05-10.md`
> **Visão cross-repo (Brasil GEO):** `docs/ROADMAP_2026Q2-Q4.md` — masterplan CTO Q2/Q3/Q4
> **Detalhamento por sprint quinzenal:** `docs/ROADMAP-SPRINTS-2026-2027.md` — 22 sprints até fim do pico 2027.1
> **Frameworks GEO acoplados:** `docs/GEO-FRAMEWORK-CANONICO.md` — F1 a F6 (Aggarwal KDD 2024 + AutoGEO + Structural + AgenticGEO + Wikipedia/KG + Citation Mechanics)

Início: 30 de abril de 2026.
Cadência: ondas quinzenais com checkpoint executivo mensal de calibração com Ronan Maia (CEO IPOG).
Subcontexto vertical: **MBA Online de Psicologia** como recorte prioritário de produto para o ciclo 2026.

Este documento organiza o programa GEO IPOG na **visão do cliente** em 4 fases. A visão complementar de engenharia cross-repo da Brasil GEO em ondas trimestrais (Q2-W4 a Q4-W2) está em `docs/ROADMAP_2026Q2-Q4.md`. Ambas convergem nas mesmas issues e nos mesmos marcos — ver tabela de reconciliação no documento CTO.

---

## Marco crítico — Ciclo de captação IPOG

O calendário do ensino superior brasileiro impõe duas janelas naturais de captação por ano. O programa GEO IPOG é organizado para gerar pico de presença em LLMs nas semanas que antecedem cada janela:

- **Captação 2026.2:** janela de matrícula prevista entre julho e agosto de 2026. Pico GEO esperado entre 15-06-2026 e 31-07-2026.
- **Captação 2027.1:** janela de matrícula prevista entre janeiro e fevereiro de 2027. Pico GEO esperado entre 01-12-2026 e 15-02-2027.

A primeira onda do projeto trabalha em janela espelho: **diagnóstico pré-investimento (06-05 a 26-05)** versus **diagnóstico pós-execução de Schema, llms.txt e primeiras peças HBR (15-06 a 30-06)** para isolar o efeito atribuível ao programa antes do pico de captação 2026.2.

Implicações operacionais:

- Schema.org de `Course` e `EducationalOccupationalProgram` precisa estar implementado e validado até **30-05-2026** para entrar no pico de captação 2026.2.
- Kit de prompts-âncora cobrindo jornada de descoberta → comparação → decisão de matrícula em pós-graduação online de Psicologia precisa estar fechado até **20-05-2026**.
- Primeira leva de conteúdo HBR-grade (entre 6 e 10 peças) publicada até **15-06-2026** com cross-link para o hub `ipog.edu.br/cursos/pos-graduacao` e para a página de produto MBA Online de Psicologia quando estiver no ar.

Detalhes em `docs/02-contexto-mba-online-psicologia.md`.

---

## Fase 0 — Kickoff e onboarding

**Janela:** 30-04-2026 a 06-05-2026 (semana 1)

- Alinhar escopo formal com stakeholders IPOG: Ronan Maia (CEO, sponsor), Bruno Azambuja (Marketing, interlocutor operacional), demais áreas envolvidas (acadêmico, captação, TI, jurídico).
- Mapear personas-alvo prioritárias do MBA Online de Psicologia: psicólogo recém-graduado, psicólogo clínico estabelecido, profissional de RH não-psicólogo, profissional de saúde, educador e pedagogo, transição de carreira, coach e terapeuta complementar.
- Catalogar propriedades digitais IPOG relevantes: domínio principal (`ipog.edu.br`), hub de pós-graduação, blog, central de atendimento, landing pages de captação, perfis sociais oficiais e canais educacionais.
- Definir contas e acessos para NAIA, GSC, GA4 (somente leitura quando aplicável) e ferramentas internas IPOG.
- Acordar política de versionamento e confidencialidade dos prompts-âncora e da matriz de concorrentes monitorada.
- Levantar o estado atual da oferta IPOG em Psicologia (graduação, especialização em Avaliação Psicológica, novos produtos planejados) e ratificar o recorte do MBA Online de Psicologia que entra no escopo do programa GEO.

**Saídas esperadas:** ata de kickoff, lista de propriedades digitais, persona map v0 do MBA Online de Psicologia, plano de acessos, matriz de concorrentes ratificada, recorte de produto IPOG validado.

---

## Fase 1 — Diagnóstico baseline (com janela espelho)

**Janela:** 07-05-2026 a 30-05-2026 (semanas 2, 3 e 4)

- Rodar diagnóstico NAIA full em `ipog.edu.br` com foco no hub de pós-graduação e nas páginas de cursos correlatos a Psicologia.
- Levantar baseline de LLM Mention Rate por persona em ChatGPT, Claude, Gemini, Perplexity, Grok e Copilot. Primeira captura entre **07-05 e 14-05** (estado pré-intervenção). Captura espelho pós-Schema entre **22-05 e 30-05** apenas em provedores RAG-native.
- Mapear share-of-voice do IPOG vs. concorrentes diretos em três clusters semânticos:
  - **MBA online em Psicologia organizacional, do trabalho e gestão de pessoas.**
  - **Pós-graduação online em Psicologia clínica, neuropsicologia, terapia cognitivo-comportamental e avaliação psicológica.**
  - **Especialização online em psicopedagogia, psicologia escolar e psicologia da educação.**
- Auditoria técnica do hub de pós-graduação: Schema `Course` e `EducationalOccupationalProgram` cobertura, llms.txt presente, sitemap de cursos, robots.txt, internal linking entre área de Psicologia e demais áreas correlatas, structured data validation, `EducationalOrganization` com `accreditation`, `hasCredential`, `sameAs` para perfis verificados.
- Inventariar lacunas de autoridade externa do IPOG no nicho Psicologia: citações em mídia educacional, presença em rankings de pós (Estadão, Folha, Quero Bolsa, Gama Academy), Wikipedia, Conselho Federal de Psicologia, ABEP, ABRAPSO, periódicos acadêmicos brasileiros.

**Saídas esperadas:** Baseline Report v1, Audit Report técnico, Share-of-Voice Snapshot 1 nos três clusters, lista de lacunas priorizada por alavanca dominante (conteúdo, schema, autoridade externa).

**Artefatos de execução vigentes:** `audits/PLAYBOOK-AUDITORIA-NAIA.md`, `audits/SCHEMA-PATTERNS.md`, `audits/LLMS-TXT-TEMPLATE.md`, `audits/ROBOTS-SITEMAP-CHECKLIST.md`, `dashboards/RUNBOOK-COLETA-LLM.md`, `dashboards/METRICAS-CANONICAS.md`.

**Insumo prévio de benchmarking (vigente desde 2026-04-30):** o diretório `audits/benchmarking/` consolida diagnóstico inicial dos 5 concorrentes prioritários (Estácio, Anhanguera, UNINTER, UniCesumar, PUC-Minas Virtual) com dossiês individuais, matriz cross-LLM inferida, matriz técnica (robots/llms.txt/Schema/autoridade) e síntese executiva. A coleta cross-LLM da Fase 1 valida e calibra essa inferência. A síntese executiva (`audits/benchmarking/SINTESE-EXECUTIVA.md`) é a leitura prévia obrigatória de Ronan Maia no primeiro checkpoint executivo do programa.

---

## Fase 2 — Engenharia de citação e kit de prompts

**Janela:** 31-05-2026 a 13-06-2026 (semanas 5 e 6)

- Construir kit canônico de **50 a 75 prompts-âncora** distribuídos entre descoberta, comparação, decisão de matrícula e pós-matrícula, com eixo dominante em MBA Online de Psicologia. Exemplos de prompt-âncora previstos:
  - "Qual o melhor MBA online em Psicologia Organizacional reconhecido pelo MEC?"
  - "Pós-graduação a distância em Psicologia Clínica vale a pena?"
  - "MBA em Neuropsicologia online com aulas ao vivo: opções no Brasil"
  - "Quanto custa um MBA online em Psicologia Hospitalar?"
  - "Especialização em Avaliação Psicológica online: instituições aprovadas pelo CFP"
  - "MBA Online em Psicologia para profissionais de RH sem formação em Psicologia"
  - "Pós em Terapia Cognitivo-Comportamental EAD: melhores faculdades"
- Definir respostas-alvo (a resposta ideal que o IPOG deveria receber em cada prompt) com fragmentos curtos e citáveis, incluindo número de horas, autorização MEC, formato (Ao Vivo, EAD, presencial), corpo docente nominal e diferencial metodológico.
- Identificar gaps entre resposta atual e resposta-alvo por LLM, classificando cada gap por alavanca dominante (conteúdo editorial, Schema, autoridade externa).
- Priorizar fechamentos por impacto esperado em mention rate vs. esforço de execução.

**Saídas esperadas:** IPOG GEO Prompt Kit v1 (com foco em MBA Psicologia), Gap Map v1, plano de fechamento de gaps com priorização explícita.

**Artefatos de execução vigentes:** `prompts/KIT-PROMPTS-V0.md` (66 prompts canônicos prontos para uso), `prompts/PAPEIS-DE-COLETA.md`, `prompts/PROMPT-PESQUISA.md`, `prompts/PROMPT-REDACAO.md`, `prompts/PROMPT-ANALISE.md`, `prompts/PROMPT-CLASSIFICACAO.md`, `prompts/PROMPT-REVISAO.md`, `prompts/CALIBRACAO-MENSAL.md`.

---

## Fase 3 — Execução de conteúdo HBR-grade e Schema

**Janela:** 14-06-2026 a 15-07-2026 (semanas 7 a 10)

- Produzir entre **6 e 10 peças** no padrão editorial HBR (abertura-impacto, tese contraintuitiva, evidência, mecanismo, decisão, próximo passo) cobrindo decisão de carreira em Psicologia, retorno de investimento de pós-graduação online, comparativo metodológico (Ao Vivo vs. EAD assíncrono), regulamentação CFP da prática profissional pós-especialização e tendências de mercado em saúde mental corporativa.
- Reforçar Schema.org no hub de pós-graduação: `Course`, `EducationalOccupationalProgram`, `EducationalOrganization`, `FAQPage`, `Person` com credenciais para corpo docente, `Article` em peças editoriais.
- Implementar `llms.txt` em `ipog.edu.br` declarando posicionamento, hub central de cursos e prioridades de citação.
- Coordenar citation engineering: PR e parcerias com veículos confiáveis de educação e psicologia (Estadão Educação, Folha Equilíbrio, Quero Bolsa, Conselho Federal de Psicologia, ABEP, ABRAPSO), atualização de fichas em rankings e diretórios de pós-graduação.

**Saídas esperadas:** 6 a 10 peças HBR-grade publicadas, Schema cobertura ampliada e validada, llms.txt no ar, plano de PR ativo, matriz de parcerias com veículos.

**Artefatos de execução vigentes:** `content/PADRAO-EDITORIAL.md`, `content/VOICE-GUIDE.md`, `content/BLOOM-KNOWLES.md`, `content/CLICHES-PROIBIDOS.md`, `content/ACENTUACAO-PT-BR.md`, `content/GLOSSARIO-PSICOLOGIA.md`, `content/BRIEFING-TEMPLATE.md`, `content/EXERCICIO-TEMPLATE.md`, `content/CHECKLIST-AUTOAVALIACAO.md`, `content/CHECKLIST-PUBLICACAO.md`, `docs/framework/02-quality-gate-5-camadas.md`, `docs/framework/03-pipeline-5-llms.md`.

---

## Fase 4 — Mensuração, iteração e dashboard

**Janela:** 16-07-2026 em diante (recorrente)

- Re-rodar kit de prompts-âncora a cada 14 dias.
- Comparar mention rate, share-of-voice e qualidade de resposta vs. baseline.
- Calibrar conteúdo, Schema e PR com base no delta observado, com ajuste explícito da onda seguinte ao detectar deriva.
- Manter dashboard ao vivo com séries temporais por LLM, persona, cluster semântico de prompt e cohort de modelo.
- Revisão executiva mensal com Ronan Maia para decisão de continuidade, expansão de escopo (outras áreas IPOG) ou recalibração.

**Saídas esperadas:** Dashboard GEO IPOG (ao vivo), Relatório Mensal de Performance, plano de calibração da onda seguinte, plano de captação 2027.1 com lições aprendidas do ciclo 2026.2.

**Artefatos de execução vigentes:** `dashboards/METRICAS-CANONICAS.md`, `dashboards/RUNBOOK-COLETA-LLM.md`, `dashboards/FINOPS-DISCIPLINA.md`, `docs/framework/04-client-context-abstraction.md`.

---

## KPIs principais

- **LLM Mention Rate** do IPOG por persona em prompts-âncora cross-LLM (ChatGPT, Claude, Gemini, Perplexity, Grok, Copilot).
- **Share-of-Voice IPOG** vs. concorrentes diretos nos três clusters semânticos (organizacional, clínica/neuro/TCC/avaliação, psicopedagogia/escolar).
- **Citation Quality Score:** precisão e completude da resposta com IPOG citado corretamente como instituição autorizada pelo MEC, com formato declarado, carga horária correta e diferencial metodológico mencionado.
- **Schema Coverage Score** (NAIA) no hub de pós-graduação.
- **Cobertura de fontes externas confiáveis** citando IPOG em educação superior e Psicologia.
- **Velocidade de fechamento de gaps** por onda (gaps fechados por quinzena).
- **Conversion Lift por canal LLM:** uplift de matrículas atribuídas a tráfego originado em referrers de LLM no GA4 entre janelas espelho.
- **Delta pré/pós Schema:** variação de mention rate entre janelas 07-14 de maio e 22-30 de maio.

## Riscos e mitigações conhecidos

- **Volatilidade dos LLMs:** sampling repetido com janela de 14 dias para reduzir ruído. Coleta cross-modelo por dia para neutralizar variância intra-provedor.
- **Mudança de modelo dos provedores:** dashboard versionado por versão de modelo declarada quando disponível. Cohort fixado e expandido apenas em rotina trimestral.
- **Concorrentes acelerando GEO:** kit de prompts-âncora compartilhado com concorrência simulada para detecção precoce de movimento competitivo.
- **Compliance regulatório educacional:** todo conteúdo público que faz claims de autorização MEC, carga horária ou registro CFP passa por revisão jurídica IPOG antes da publicação externa.
- **Latência de absorção pelos LLMs:** modelos com pesos paramétricos não retreinam imediatamente. Ganho de presença em pesos paramétricos depende de fontes externas atualizadas (mídia, Wikipedia, llms.txt, Schema). Provedores RAG-native absorvem mudança em dias.
- **Saturação competitiva no termo "MBA online em Psicologia":** instituições EAD massivas (Estácio, Anhanguera, Unip, UNINTER, UniCesumar) também disputam a narrativa. Diferenciação semântica precisa ser construída em torno de atributos defensáveis pelo IPOG: corpo docente nominal, formato Ao Vivo síncrono, presença multicampus, certificação MEC e histórico de 25 anos de pós-graduação.
- **Dependência de produto:** se o produto MBA Online de Psicologia ainda não estiver no catálogo público no momento do pico GEO, share-of-voice tende a ficar capturado por concorrentes. Mitigação: cronograma do programa GEO sincroniza com plano de lançamento do produto IPOG.
- **Calendário de captação:** atrasos em Schema ou em conteúdo editorial além de 30-05-2026 reduzem janela de impacto sobre o ciclo 2026.2 e empurram retorno mensurável para o ciclo 2027.1.
