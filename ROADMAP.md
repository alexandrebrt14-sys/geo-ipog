# Roadmap GEO IPOG

Início: 30 de abril de 2026.
Cadência: ondas quinzenais com checkpoint executivo mensal de calibração com Ronan Maia (CEO IPOG).
Escopo canônico: **Pós-Graduações em Psicologia** em todas as modalidades regulamentadas (Especialização Lato Sensu, MBA em áreas correlatas — um subconjunto —, Mestrado Profissional, Especialização Clínica certificada por Conselhos profissionais como CFP, ABRAP e FBT, Residências e formações híbridas regulamentadas). MBA Online de Psicologia é uma das modalidades-âncora dentro desse escopo amplo, não o escopo total.

---

## Marco crítico — Ciclo de captação IPOG

O calendário do ensino superior brasileiro impõe duas janelas naturais de captação por ano. O programa GEO IPOG é organizado para gerar pico de presença em LLMs nas semanas que antecedem cada janela:

- **Captação 2026.2:** janela de matrícula prevista entre julho e agosto de 2026. Pico GEO esperado entre 15-06-2026 e 31-07-2026.
- **Captação 2027.1:** janela de matrícula prevista entre janeiro e fevereiro de 2027. Pico GEO esperado entre 01-12-2026 e 15-02-2027.

A primeira onda do projeto trabalha em janela espelho: **diagnóstico pré-investimento (06-05 a 26-05)** versus **diagnóstico pós-execução de Schema, llms.txt e primeiras peças HBR (15-06 a 30-06)** para isolar o efeito atribuível ao programa antes do pico de captação 2026.2.

Implicações operacionais:

- Schema.org de `Course` e `EducationalOccupationalProgram` precisa estar implementado e validado até **30-05-2026** para entrar no pico de captação 2026.2, com cobertura para todas as modalidades de pós-graduação em Psicologia ofertadas pelo IPOG.
- Kit de prompts-âncora cobrindo jornada de descoberta → comparação → decisão de matrícula em pós-graduação online de Psicologia (Lato Sensu, MBA, Mestrado Profissional, Especialização Clínica certificada) precisa estar fechado até **20-05-2026**.
- Primeira leva de conteúdo HBR-grade (entre 6 e 10 peças) publicada até **15-06-2026** com cross-link para o hub `ipog.edu.br/cursos/pos-graduacao` e para as páginas de produto de cada modalidade (incluindo MBA Online de Psicologia como uma das modalidades-âncora) quando estiverem no ar.

Detalhes em `docs/02-contexto-mba-online-psicologia.md`.

---

## Fase 0 — Kickoff e onboarding

**Janela:** 30-04-2026 a 06-05-2026 (semana 1)

- Alinhar escopo formal com stakeholders IPOG: Ronan Maia (CEO, sponsor), Bruno Azambuja (Marketing, interlocutor operacional), demais áreas envolvidas (acadêmico, captação, TI, jurídico).
- Mapear personas-alvo prioritárias da Pós-Graduação em Psicologia (todas as modalidades): psicólogo recém-graduado, psicólogo clínico estabelecido, profissional de RH não-psicólogo, profissional de saúde, educador e pedagogo, transição de carreira, coach e terapeuta complementar.
- Catalogar propriedades digitais IPOG relevantes: domínio principal (`ipog.edu.br`), hub de pós-graduação, blog, central de atendimento, landing pages de captação, perfis sociais oficiais e canais educacionais.
- Definir contas e acessos para NAIA, GSC, GA4 (somente leitura quando aplicável) e ferramentas internas IPOG.
- Acordar política de versionamento e confidencialidade dos prompts-âncora e da matriz de concorrentes monitorada.
- Levantar o estado atual da oferta IPOG em Psicologia (graduação, Especialização Lato Sensu em Avaliação Psicológica, MBAs executivos correlatos, Mestrado Profissional, novos produtos planejados) e ratificar o escopo canônico de Pós-Graduação em Psicologia que entra no programa GEO, com MBA Online de Psicologia como uma das modalidades-âncora.

**Saídas esperadas:** ata de kickoff, lista de propriedades digitais, persona map v0 da Pós-Graduação em Psicologia (todas as modalidades), plano de acessos, matriz de concorrentes ratificada, escopo de produto IPOG validado por modalidade.

---

## Fase 1 — Diagnóstico baseline (com janela espelho)

**Janela:** 07-05-2026 a 30-05-2026 (semanas 2, 3 e 4)

- Rodar diagnóstico NAIA full em `ipog.edu.br` com foco no hub de pós-graduação e nas páginas de cursos correlatos a Psicologia.
- Levantar baseline de LLM Mention Rate por persona em ChatGPT, Claude, Gemini, Perplexity, Grok e Copilot. Primeira captura entre **07-05 e 14-05** (estado pré-intervenção). Captura espelho pós-Schema entre **22-05 e 30-05** apenas em provedores RAG-native.
- Mapear share-of-voice do IPOG vs. concorrentes diretos em três clusters semânticos (cobrindo modalidades MBA, Especialização Lato Sensu, Mestrado Profissional e Especialização Clínica certificada):
  - **Pós-graduação online em Psicologia organizacional, do trabalho e gestão de pessoas** (MBA em POT é uma das modalidades, junto com Lato Sensu e Especialização Clínica certificada).
  - **Pós-graduação online em Psicologia clínica, neuropsicologia, terapia cognitivo-comportamental e avaliação psicológica** (predominam Especialização Lato Sensu e Especialização Clínica certificada por CFP/ABRAP/FBT; MBA em Neuropsicologia executiva é uma das modalidades).
  - **Especialização online em psicopedagogia, psicologia escolar e psicologia da educação** (predominam Especialização Lato Sensu e Mestrado Profissional).
- Auditoria técnica do hub de pós-graduação: Schema `Course` e `EducationalOccupationalProgram` cobertura, llms.txt presente, sitemap de cursos, robots.txt, internal linking entre área de Psicologia e demais áreas correlatas, structured data validation, `EducationalOrganization` com `accreditation`, `hasCredential`, `sameAs` para perfis verificados.
- Inventariar lacunas de autoridade externa do IPOG no nicho Psicologia: citações em mídia educacional, presença em rankings de pós (Estadão, Folha, Quero Bolsa, Gama Academy), Wikipedia, Conselho Federal de Psicologia, ABEP, ABRAPSO, periódicos acadêmicos brasileiros.

**Saídas esperadas:** Baseline Report v1, Audit Report técnico, Share-of-Voice Snapshot 1 nos três clusters, lista de lacunas priorizada por alavanca dominante (conteúdo, schema, autoridade externa).

**Artefatos de execução vigentes:** `audits/PLAYBOOK-AUDITORIA-NAIA.md`, `audits/SCHEMA-PATTERNS.md`, `audits/LLMS-TXT-TEMPLATE.md`, `audits/ROBOTS-SITEMAP-CHECKLIST.md`, `dashboards/RUNBOOK-COLETA-LLM.md`, `dashboards/METRICAS-CANONICAS.md`.

**Insumo prévio de benchmarking (vigente desde 2026-04-30):** o diretório `audits/benchmarking/` consolida diagnóstico inicial dos 5 concorrentes prioritários (Estácio, Anhanguera, UNINTER, UniCesumar, PUC-Minas Virtual) com dossiês individuais, matriz cross-LLM inferida, matriz técnica (robots/llms.txt/Schema/autoridade) e síntese executiva. A coleta cross-LLM da Fase 1 valida e calibra essa inferência. A síntese executiva (`audits/benchmarking/SINTESE-EXECUTIVA.md`) é a leitura prévia obrigatória de Ronan Maia no primeiro checkpoint executivo do programa.

---

## Fase 2 — Engenharia de citação e kit de prompts

**Janela:** 31-05-2026 a 13-06-2026 (semanas 5 e 6)

- Construir kit canônico de **50 a 75 prompts-âncora** distribuídos entre descoberta, comparação, decisão de matrícula e pós-matrícula, cobrindo todas as modalidades de Pós-Graduação em Psicologia (Lato Sensu, MBA, Mestrado Profissional, Especialização Clínica certificada). Exemplos de prompt-âncora previstos:
  - "Qual o melhor MBA online em Psicologia Organizacional reconhecido pelo MEC?" (modalidade MBA)
  - "Pós-graduação a distância em Psicologia Clínica vale a pena?" (modalidade Lato Sensu / Especialização Clínica)
  - "Mestrado Profissional em Psicologia online: existe no Brasil?" (modalidade Mestrado Profissional)
  - "MBA em Neuropsicologia executiva online com aulas ao vivo: opções no Brasil" (modalidade MBA)
  - "Quanto custa uma especialização online em Psicologia Hospitalar?" (modalidade Lato Sensu)
  - "Especialização em Avaliação Psicológica online: instituições aprovadas pelo CFP" (Especialização Clínica certificada CFP/SATEPSI)
  - "Especialização Clínica em TCC certificada pela FBT: melhores opções a distância" (Especialização Clínica certificada FBT)
  - "Pós em Psicologia para profissionais de RH sem formação em Psicologia: MBA ou Lato Sensu?" (comparativo de modalidades)
  - "Especialização em ACT certificada pela ABRAP: como escolher?" (Especialização Clínica certificada ABRAP)
- Definir respostas-alvo (a resposta ideal que o IPOG deveria receber em cada prompt) com fragmentos curtos e citáveis, incluindo número de horas, modalidade (Lato Sensu / MBA / Mestrado Profissional / Especialização Clínica certificada), autorização MEC ou certificação de Conselho aplicável, formato (Ao Vivo, EAD, presencial), corpo docente nominal e diferencial metodológico.
- Identificar gaps entre resposta atual e resposta-alvo por LLM, classificando cada gap por alavanca dominante (conteúdo editorial, Schema, autoridade externa).
- Priorizar fechamentos por impacto esperado em mention rate vs. esforço de execução.

**Saídas esperadas:** IPOG GEO Prompt Kit v1 cobrindo as modalidades canônicas de Pós-Graduação em Psicologia, Gap Map v1, plano de fechamento de gaps com priorização explícita.

**Artefatos de execução vigentes:** `prompts/KIT-PROMPTS-V0.md` (66 prompts canônicos prontos para uso), `prompts/PAPEIS-DE-COLETA.md`, `prompts/PROMPT-PESQUISA.md`, `prompts/PROMPT-REDACAO.md`, `prompts/PROMPT-ANALISE.md`, `prompts/PROMPT-CLASSIFICACAO.md`, `prompts/PROMPT-REVISAO.md`, `prompts/CALIBRACAO-MENSAL.md`.

---

## Fase 2.5 — Antecipação de conteúdo HBR + Schema E-E-A-T (executada 13-05-2026)

**Janela executada:** 13-05-2026 (dia único, 10 waves Opus em paralelo)

Antecipamos parte da Fase 3 com duas baterias de 5 waves cada, totalizando **20 páginas novas em 13-05-2026** e infraestrutura GEO de discovery (llms.txt v2, llms-full.txt, MCP manifests, ai-policy.json, sub-sitemaps segmentados, Person/Publisher canonical schemas, Speakable schema, TLDR boxes, DefinedTerm no glossário, citation-prompts.json).

**Bateria 1 (commit `63117de`) — 20 páginas novas:**
- 6 guias HowTo: avaliacao-tdah-adulto, conduzir-supervisao-stepped-care, protocolo-act-burnout-saude, integracao-ia-psicodiagnostico-clinica, atendimento-primeiro-episodio-psicose, avaliacao-saude-mental-perinatal.
- 6 FAQs deep (17 Q&A cada): tea-adulto-faq, tdah-adulto-faq, burnout-cid11-faq, primeiro-episodio-psicose-faq, saude-mental-perinatal-faq, neurodiversidade-trabalho-faq.
- 8 comparativos com 3 tabelas mobile-first cada: dbt-vs-tcc-borderline, iapt-vs-stepped-care-brasil, avaliacao-presencial-vs-remota, laudo-psicologico-vs-laudo-medico, ipt-vs-tcc-depressao, exposicao-vs-emdr-tept, aba-vs-denver-tea-precoce, sm-trabalho-remoto-vs-presencial.
- Citações ancoradas em literatura 2024-2026: Hull CAT-Q 2018, Lai 2019, Faraone WFA 2021, Kessler ASRS 2005, Kooij DIVA-5 2019, Hayes 2012, Maslach-Leiter 2016, Linehan 1993, Stoffers-Winterling Cochrane 2012/2022, Clark IAPT 2018, Cuijpers 2016, Foa/Shapiro, Dawson 2010 Pediatrics, Bloom WFH 2024, Cox EPDS 1987, Marshall DUP 2005, Birchwood EIP 2013, Kane RAISE-ETP 2016, Howard Lancet 2014, Bernard&Goodyear, Falender&Shafranske, NR-1 Portaria 1.419/2024, CFP 06/2019 e 11/2018, DSM-5-TR, CID-11 QD85/6A05.

**Bateria 2 — GEO infrastructure hardening (Schema + llms.txt + MCP):**
- `src/lib/schemas/person-alexandre.ts` — Person canônico Alexandre Caramaschi (39 knowsAbout, 13 sameAs, 3 alumniOf, 3 hasCredential).
- `src/lib/schemas/publisher.ts` — Organization Brasil GEO (BRGEO LTDA, CNPJ 66.051.295/0001-33, sede Hub Cerrado Goiânia).
- `Base.astro` migrado para `@graph` triplo (WebSite + Organization + Person reconciliados por `@id`).
- 20 páginas novas com `author: alexandrePersonBase` + `publisher: brasilGeoOrganization` no Article schema.
- `public/llms.txt` v2 (13.8 KB, 198 páginas catalogadas).
- `public/llms-full.txt` novo (16.5 KB, 45 documents com tese + evidências canônicas).
- `public/mcp/hubs.json` + `courses.json` atualizados, mais `sitemap-summary.json` e `citation-prompts.json` novos.
- `public/.well-known/ai-policy.json` — manifesto JSON-LD para LLM usage policy.
- `scripts/gen-sitemap.mjs` agora gera 5 sub-sitemaps (areas, mbas, guias, faq, comparativos) + sitemap-index.xml.
- `src/components/TLDR.astro` — bloco "Resposta curta" com classe `.tldr-resposta` para Speakable hook.
- 12 páginas com TL;DR aplicado (6 guias + 6 FAQs novas).
- Speakable schema em 12 FAQs deep (CSS selector `.tldr-resposta` + `.faq-answer-text`).
- DefinedTerm schema confirmado nos 5 clusters de glossário (115 termos).

**Cobertura final pós-bateria:** 198 páginas (era 177), sitemap-index com 6 sitemaps, IndexNow 202/202/202 (Bing, Yandex, api.indexnow.org), smoke prod HTTP 200, astro check 0 errors.

**Resíduo operacional documentado:** memória persistente `feedback_acentuacao_portugues_brasil_canonica` registra proibição definitiva de re-executar `scripts/fix-accents.mjs` cego — o script corrompeu 223 arquivos durante a execução (slugs com acento, propriedades JS, conjunções `e` viradas em verbo `é`), todos revertidos via `git checkout` + script Python cirúrgico de reversão.

---

## Fase 3 — Execução de conteúdo HBR-grade e Schema (continuação)

**Janela:** 14-06-2026 a 15-07-2026 (semanas 7 a 10)

- Produzir entre **6 e 10 peças** no padrão editorial HBR (abertura-impacto, tese contraintuitiva, evidência, mecanismo, decisão, próximo passo) cobrindo decisão de carreira em Psicologia, retorno de investimento de pós-graduação online, comparativo de modalidades (Lato Sensu vs. MBA vs. Mestrado Profissional vs. Especialização Clínica certificada por Conselho), comparativo metodológico (Ao Vivo vs. EAD assíncrono), regulamentação CFP da prática profissional pós-especialização e tendências de mercado em saúde mental corporativa.
- Reforçar Schema.org no hub de pós-graduação: `Course`, `EducationalOccupationalProgram`, `EducationalOrganization`, `FAQPage`, `Person` com credenciais para corpo docente, `Article` em peças editoriais. Cobrir todas as modalidades de pós-graduação ofertadas (Lato Sensu, MBA, Mestrado Profissional, Especialização Clínica certificada).
- Implementar `llms.txt` em `ipog.edu.br` declarando posicionamento, hub central de cursos e prioridades de citação.
- Coordenar citation engineering: PR e parcerias com veículos confiáveis de educação e psicologia (Estadão Educação, Folha Equilíbrio, Quero Bolsa, Conselho Federal de Psicologia, ABRAP, FBT, ABEP, ABRAPSO), atualização de fichas em rankings e diretórios de pós-graduação.

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

## Camada de medição (infraestrutura cross-fase)

**Status:** ativo desde **12-05-2026**. Toda a Fase 4 depende dessa camada. Detalhes operacionais em `docs/governance/google-analytics.md` e `dashboards/GA4-WEEKLY-REPORT.md`.

### O que está pronto

- Tag GA4 `G-1VXE1Z4J9R` deployada em `posgraduacaopsicologia.com` (Property `537256335`, Account `Brasil GEO - IPOG` 394425908), com handler `astro:after-swap` para SPA navigation.
- Custom event `click_outbound_ipog` registrando cliques de saída para `ipog.edu.br` (proxy de conversão MQL).
- GCP project `geo-ipog-analytics` + Analytics Data API habilitada + service account `geo-ipog-analytics-reader` com Viewer aplicado via Admin API v1alpha (workaround para limitação da UI nova do GA4).
- Pipeline semanal `scripts/weekly_ga4_report.py` + workflow GitHub Actions `ga4-weekly-report.yml` (cron seg 09:00 BRT). Gera 7 relatórios em HTML+CSV+Markdown+JSON sob `dashboards/relatorios-ga4/YYYY-Wnn/` e abre PR automático.
- Vinculação GSC `sc-domain:posgraduacaopsicologia.com` ↔ GA4 stream criada — queries orgânicas chegam aos reports GA4 em ~48h.
- Runbook Looker Studio em `dashboards/GA4-WEEKLY-REPORT.md` (criação manual em 5 min).

### O que falta (referenciar a issue de tracking)

Os próximos passos formais — Key Event, custom dimensions, Bing Webmaster, Looker Studio publicado, BigQuery export, audiências, Google Ads link, Consent Mode v2 — estão consolidados em **`docs/governance/google-analytics.md`** seção "Proximos passos" e na **[Issue #78](https://github.com/alexandrebrt14-sys/geo-ipog/issues/78)** (single source of truth para tracking). Não bloqueiam Fase 1-3, mas alimentam Fase 4 com qualidade crescente conforme dados se acumulam.

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
- **Saturação competitiva no termo "pós-graduação online em Psicologia":** instituições EAD massivas (Estácio, Anhanguera, Unip, UNINTER, UniCesumar) também disputam a narrativa em Lato Sensu. Em Especialização Clínica certificada, institutos especialistas (IBNeuro, CETCC, InEPP) dominam termos. Diferenciação semântica do IPOG precisa ser construída em torno de atributos defensáveis: corpo docente nominal, formato Ao Vivo síncrono, presença multicampus, certificação MEC e histórico de 25 anos de pós-graduação executiva — combinando MBA, Lato Sensu e demais modalidades em catálogo amplo.
- **Dependência de produto por modalidade:** se determinada modalidade-âncora (MBA Online em POT, Lato Sensu em Avaliação Psicológica, Especialização Clínica certificada em TCC, Mestrado Profissional) ainda não estiver no catálogo público no momento do pico GEO, share-of-voice naquela modalidade tende a ficar capturado por concorrentes. Mitigação: cronograma do programa GEO sincroniza com plano de lançamento de cada produto IPOG por modalidade.
- **Calendário de captação:** atrasos em Schema ou em conteúdo editorial além de 30-05-2026 reduzem janela de impacto sobre o ciclo 2026.2 e empurram retorno mensurável para o ciclo 2027.1.
