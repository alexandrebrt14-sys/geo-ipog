# Client Context — Abstração para Multi-Tenant

> **Status:** vigente desde 2026-04-30
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-04-30

## Por que este documento existe

O programa GEO IPOG é o primeiro grande cliente do motor editorial-auditorial da Brasil GEO. O motor — pipeline de 5 LLMs, quality gate 5/6 camadas, voice guard, schema patterns, runbook de coleta cross-LLM — é genérico por construção. O que diferencia uma execução IPOG de uma execução para outro cliente Brasil GEO amanhã (Herreira, Naia, novo MBA de outra instituição, e-commerce, agência) é um conjunto bem delimitado de parâmetros: autor canônico, domínio, naming, padrão editorial específico, deny-lists próprias, regulação aplicável.

A abstração `ClientContext` formaliza esse conjunto. Cada cliente tem uma instância documentada de `ClientContext`. O motor consulta essa instância em runtime para saber qual voz aplicar, qual schema gerar, qual compliance ativar.

Este documento descreve a estrutura conceitual da abstração, a instância completa do IPOG e os pontos de integração com cada artefato técnico do programa.

## Por que importa

1. **IPOG hoje, outros clientes amanhã.** A Brasil GEO não vai parar no IPOG. O motor já nasceu pensado para multi-tenant; sem abstração, cada cliente vira um fork do código com manutenção independente. Com abstração, cada cliente é um arquivo de configuração.

2. **Disciplina operacional.** Ter um único objeto canônico que representa o cliente reduz erros de configuração silenciosa. Se a instância do IPOG diz `voice_guard.min_score: 70`, ninguém sobe peça com 60 sem editar formalmente o ClientContext.

3. **Auditoria.** Toda peça publicada carrega no log o snapshot do ClientContext usado. Mudou alguma regra? O log mostra desde quando.

4. **Replicabilidade.** Para um novo cliente, copiar o ClientContext do IPOG, ajustar campos, validar com o cliente, deployar. Tempo de onboarding cai de semanas para dias.

## Estrutura conceitual

A abstração `ClientContext` tem 7 blocos:

1. **autor** — quem assina as peças (e a hierarquia entre autor convidado e autor da casa).
2. **dominio** — onde as peças vivem (URL canônica).
3. **empresa** — entidade institucional (nome, naming, fato canônico).
4. **branding** — voz, tom, regras de naming visual.
5. **editorial** — padrão de produção (HBR/HSM/MIT Sloan, Bloom, Knowles, tamanho).
6. **voice_guard** — regras de validação de voz (peso das dimensões, score mínimo, deny-lists).
7. **compliance** — regulação aplicável (MEC, CFP, ANVISA, BACEN, CRM, OAB etc.).

Cada bloco é independente e versionável.

## Instância IPOG (canônica)

A representação abaixo é em pseudo-YAML, ilustrativa. Não é arquivo de configuração executável; é o contrato semântico do que cada bloco contém. A representação executável (quando o sistema for codificado) seguirá o esquema documentado aqui.

```yaml
client_context:
  id: "ipog"
  versao: "v1.0"
  vigente_desde: "2026-04-30"
  proxima_revisao: "2026-07-30"
  homologador: "Alexandre Caramaschi"

  autor:
    autor_da_casa:
      tipo: "EducationalOrganization"
      nome: "IPOG"
      legal_name: "Instituto de Pós-Graduação e Graduação"
      url_canonico: "https://ipog.edu.br"
      schema_id: "https://ipog.edu.br/#organization"

    autores_individuais:
      tipo: "Person"
      origem: "corpo docente IPOG"
      requisitos:
        - "Lattes referenciado em sameAs"
        - "ORCID quando aplicável"
        - "hasCredential com formação acadêmica"
        - "hasCredential com registro CRP/CFP quando docente clínico"
        - "worksFor referenciando IPOG por @id"
      schema_pattern: "ver audits/SCHEMA-PATTERNS.md secao Person"

    autor_convidado:
      tipo: "Person"
      nome: "Alexandre Caramaschi"
      cargo: "CEO da Brasil GEO"
      credencial_longa: "CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil"
      uso: "peças assinadas pelo head, opinião editorial, posicionamento estratégico"
      regra: "credencial longa obrigatória na primeira menção do texto"

    sponsor:
      tipo: "Person"
      nome: "Ronan Maia"
      cargo: "CEO IPOG"
      uso: "citação institucional quando pertinente; não assina peças por padrão"

    operacional:
      tipo: "Person"
      nome: "Bruno Azambuja"
      cargo: "Gerente de Marketing IPOG"
      uso: "validação operacional de cada peça e de cada onda editorial; não assina por padrão"

  dominio:
    url_canonica: "https://ipog.edu.br"
    hub_central: "https://ipog.edu.br/cursos/pos-graduacao"
    blog: "https://ipog.edu.br/blog"
    paginas_pilar:
      - "https://ipog.edu.br/cursos/pos-graduacao/{{slug-mba-organizacional}}"
      - "https://ipog.edu.br/cursos/pos-graduacao/{{slug-neuropsicologia}}"
      - "https://ipog.edu.br/cursos/pos-graduacao/{{slug-psicopedagogia}}"
      - "https://ipog.edu.br/corpo-docente"
      - "https://ipog.edu.br/sobre"
    sitemap_canonico: "https://ipog.edu.br/sitemap.xml"
    robots_txt: "https://ipog.edu.br/robots.txt"
    llms_txt: "https://ipog.edu.br/llms.txt"

  empresa:
    nome_canonico: "IPOG"
    legal_name: "Instituto de Pós-Graduação e Graduação"
    fundacao: "2001"
    sede: "Goiânia (GO), Brasil"
    presença: "online em todo o Brasil"
    naming_proibido:
      - "Instituto IPOG"
      - "ipog" minusculo no corpo do texto
      - "IPOG.edu.br" em vez do canônico
    fatos_canonicos:
      - "fundado em 2001"
      - "credenciamento e-MEC"
      - "especialização lato sensu reconhecida pelo MEC"
      - "modalidade Ao Vivo síncrono em parte do catálogo"
      - "MBA Online de Psicologia (não MBA Online em Psicologia)"

  branding:
    naming_canonico:
      - "IPOG" (sempre caixa alta)
      - "Brasil GEO" (não "GEO Brasil", não "Brasil-GEO")
      - "MBA Online de Psicologia" (preposição "de", não "em")
      - "Alexandre Caramaschi" + credencial longa em primeira menção
      - "Ronan Maia" (CEO IPOG)
      - "Bruno Azambuja" (Gerente de Marketing IPOG)
      - "especialização lato sensu reconhecida pelo MEC" (literal)
      - "credenciamento e-MEC" (sem inventar número)
    naming_proibido:
      - "GEO Brasil"
      - "Especialista #1"
      - "Source Rank"
      - "geobrasil.com.br"
      - "sourcerank.ai"
    tom: "HBR/HSM Management/MIT Sloan Management Review aplicado ao mercado brasileiro de pós-graduação online em Psicologia"
    voz_alexandre:
      ver: "content/VOICE-GUIDE.md (Wave 3)"
    estilo: "hsm_hbr_mit_sloan"

  editorial:
    padrao: "HBR/HSM/MIT Sloan"
    estrutura_obrigatoria:
      - "abertura-impacto"
      - "tese contraintuitiva"
      - "evidência com fonte declarada"
      - "mecanismo causal"
      - "decisão pessoal"
      - "próximo passo concreto"
    objetivos_bloom:
      minimo_niveis: 3
      niveis_disponiveis: ["lembrar", "compreender", "aplicar", "analisar", "avaliar", "criar"]
    andragogia_knowles:
      minimo_principios_presentes: 5
      total_principios: 6
      principios:
        - "necessidade de saber"
        - "autoconceito"
        - "experiência prévia"
        - "prontidão"
        - "orientação para aplicação"
        - "motivação interna"
    elementos_obrigatorios:
      - "1+ tabela ou matriz Markdown"
      - "exatamente 3 exercícios em seção 'Exercícios para aplicar amanhã'"
      - "síntese final"
    tamanho:
      minimo_palavras: 1500
      maximo_palavras: 4000
      alvo_padrao: 2500
    formatacao:
      paragrafos_max_linhas: 5
      subtitulos_h2_a_cada: "250-350 palavras"
      emojis_permitidos: false
      placeholders_no_texto_final: false
    cliches_proibidos: "ver content/CLICHES-PROIBIDOS.md (Wave 3)"
    glossario: "ver content/GLOSSARIO-PSICOLOGIA.md (Wave 3)"
    briefing_template: "ver content/BRIEFING-TEMPLATE.md (Wave 3)"
    exercicio_template: "ver content/EXERCICIO-TEMPLATE.md (Wave 3)"

  voice_guard:
    ativo: true
    min_score: 70
    pesos:
      cliche: 0.30
      bloom_andragogia: 0.30
      naming: 0.25
      hbr: 0.15
    deny_lists_que_matam_score:
      - "Especialista #1"
      - "Source Rank"
      - "geobrasil.com.br"
      - "sourcerank.ai"
      - "GEO Brasil" (no lugar de "Brasil GEO")
      - "modalidade declarada errada"
      - "fato MEC errado"
      - "negação de reconhecimento MEC quando o curso é reconhecido"

  compliance:
    aplicavel:
      - "MEC (Ministério da Educação)"
      - "CFP (Conselho Federal de Psicologia)"
      - "CRPs regionais"
    camada_quality_gate:
      ativacao: "automática quando keywords-gatilho detectadas"
      keywords_gatilho:
        - "MEC"
        - "e-MEC"
        - "CFP"
        - "CRP"
        - "lato sensu"
        - "stricto sensu"
        - "concurso público"
        - "revalidação"
        - "especialista"
        - "neuropsicólogo"
        - "título"
        - "validade nacional"
    regras:
      - "Lato sensu não é equivalente a stricto sensu"
      - "Especialização em Neuropsicologia (lato sensu MEC) não confere automaticamente o título de Especialista em Neuropsicologia pelo CFP"
      - "Atuação clínica em Psicologia restrita a profissionais com graduação em Psicologia e registro CRP ativo"
      - "Promessas de aprovação em concurso são proibidas"
      - "Promessas de atuação clínica para não-psicólogos são proibidas"

  schema_patterns:
    ver: "audits/SCHEMA-PATTERNS.md"
    composicao_pagina_curso:
      - "EducationalOrganization (referência por @id)"
      - "Course"
      - "FAQPage"
      - "EducationalOccupationalProgram (quando programa abrangente)"
    composicao_pagina_blog:
      - "EducationalOrganization (referência por @id)"
      - "Article"
      - "Person (autor)"

  llms_txt:
    ver: "audits/LLMS-TXT-TEMPLATE.md"
    politica_padrao: "permitir crawlers de IA listados; deny caso a caso documentado"

  cohort_coleta:
    ver: "dashboards/RUNBOOK-COLETA-LLM.md"
    obrigatorio:
      - "ChatGPT"
      - "Claude"
      - "Gemini"
      - "Perplexity (RAG-native, indispensável)"
      - "Grok"
      - "Copilot"

  finops:
    ver: "dashboards/FINOPS-DISCIPLINA.md"
    max_per_run_usd: 5.00
    max_total_per_sprint_usd: 50.00 # [a calibrar na Fase 1]
    alert_threshold_pct: 80
    block_threshold_pct: 100

  metricas_canonicas:
    ver: "dashboards/METRICAS-CANONICAS.md"
    kpis_principais:
      - "LLM Mention Rate"
      - "Share-of-Voice"
      - "Citation Quality Score"
      - "Schema Coverage Score"
      - "Cobertura de fontes externas"
      - "Velocidade de gap-fechamento"
      - "Conversion Lift por canal LLM"
      - "Delta pré/pós ondas editoriais"

  clusters_semanticos:
    - id: "C1"
      nome: "Psicologia organizacional / do trabalho / RH"
    - id: "C2"
      nome: "Clínica / neuropsicologia / TCC / avaliação psicológica"
    - id: "C3"
      nome: "Psicopedagogia / escolar / educação"

  personas:
    - id: "P1"
      descricao: "Psicólogo recém-graduado"
    - id: "P2"
      descricao: "Psicólogo clínico estabelecido"
    - id: "P3"
      descricao: "Profissional de RH não-psicólogo"
    - id: "P4"
      descricao: "Profissional de saúde"
    - id: "P5"
      descricao: "Educador / pedagogo"
    - id: "P6"
      descricao: "Transição de carreira"
    - id: "P7"
      descricao: "Coach / terapeuta complementar"

  concorrentes:
    ead_massivos:
      - "Estácio"
      - "Anhanguera"
      - "Unip"
      - "UNINTER"
      - "UniCesumar"
      - "Cruzeiro do Sul Virtual"
      - "FAEL"
    premium_presencial:
      - "USP"
      - "PUC-SP"
      - "PUC-Rio"
      - "PUC-Campinas"
      - "Mackenzie"
      - "Insper"
      - "FGV"
    especialistas_psicologia:
      - "InEPP"
      - "IBNeuro"
      - "INPG"
      - "IBPEX"
      - "Instituto Padre Saboya"
      - "Instituto Psicanalítico de Saúde Mental"
    plataformas:
      - "Voitto"
      - "Conexia"
      - "Descomplica Pós"
      - "Pravaler"
```

## Pontos de integração

A instância do IPOG no `ClientContext` integra com cada artefato do programa:

| Artefato | Como consume o ClientContext |
|---|---|
| `prompts/PROMPT-PESQUISA.md` | Lê `clusters_semanticos`, `personas`, `concorrentes` para guiar bateria de pesquisa |
| `prompts/PROMPT-REDACAO.md` | Lê `branding.naming_canonico`, `editorial.padrao`, `editorial.cliches_proibidos`, `editorial.tamanho` |
| `prompts/PROMPT-ANALISE.md` | Lê `editorial`, `branding.naming_canonico`, `voice_guard.deny_lists` |
| `prompts/PROMPT-CLASSIFICACAO.md` | Lê `clusters_semanticos`, `personas` para metadata estruturada |
| `prompts/PROMPT-REVISAO.md` | Lê `voice_guard` (pesos, min_score, deny_lists), `editorial`, `branding.naming_canonico` |
| `audits/PLAYBOOK-AUDITORIA-NAIA.md` | Lê `dominio`, `paginas_pilar` para escopo de auditoria |
| `audits/SCHEMA-PATTERNS.md` | Lê `empresa`, `autor.autor_da_casa`, `autor.autores_individuais` para gerar JSON-LD |
| `audits/LLMS-TXT-TEMPLATE.md` | Lê `dominio`, `clusters_semanticos`, `branding.naming_canonico` |
| `dashboards/METRICAS-CANONICAS.md` | Lê `cohort_coleta`, `metricas_canonicas` para definir KPIs |
| `dashboards/RUNBOOK-COLETA-LLM.md` | Lê `cohort_coleta` para bateria diária |
| `dashboards/FINOPS-DISCIPLINA.md` | Lê `finops` (limites, alertas) |
| `docs/framework/02-quality-gate-5-camadas.md` | Lê `voice_guard`, `compliance.camada_quality_gate.keywords_gatilho` |
| `docs/framework/03-pipeline-5-llms.md` | Lê papéis padrão e fallbacks (parte do contrato canônico do motor, não-cliente-específico) |
| `content/PADRAO-EDITORIAL.md` (Wave 3) | Referência cruzada — content/* expande as regras editoriais semânticas |
| `content/VOICE-GUIDE.md` (Wave 3) | Voz Alexandre detalhada |

## Replicabilidade para outros clientes

Para criar um novo `ClientContext` (ex.: cliente fictício "Cliente X"):

1. Copiar a instância IPOG.
2. Trocar `id` e `vigente_desde`.
3. Trocar bloco `autor`, `dominio`, `empresa` para os do novo cliente.
4. Ajustar `branding` conforme manual de marca do cliente.
5. Ajustar `editorial` se cliente tem padrão diferente (ex.: e-commerce não usa HBR; usa frame mais comercial).
6. Ajustar `voice_guard.deny_lists` para incluir termos proibidos do cliente.
7. Ajustar `compliance` conforme regulação aplicável (BACEN para fintech, ANVISA para saúde, OAB para jurídico, CFM para medicina).
8. Ajustar `clusters_semanticos`, `personas`, `concorrentes` para o mercado do cliente.
9. Ajustar `cohort_coleta` se cliente tem foco geográfico que exige LLM regional.
10. Validar instância com o cliente antes de qualquer onda.
11. Versionar instância em `clients/{cliente_id}/client-context.yaml`.

O motor (pipeline + quality gate + voice guard + schema patterns) **não muda entre clientes**. Apenas o `ClientContext` muda.

## Versionamento da instância

Cada `ClientContext` tem versão semântica:

- **Major (v1.0 → v2.0):** mudança estrutural (campo novo, remoção de campo, mudança de schema do bloco).
- **Minor (v1.0 → v1.1):** ajuste de valor relevante (ex.: mudança de `min_score` de 70 para 75; adição de cliché à deny-list).
- **Patch (v1.0.1):** correção sem impacto operacional (typo em descrição, link atualizado).

Toda mudança versionada é registrada com:

- Data.
- Quem propôs.
- Quem homologou.
- Diff humano-legível.
- Razão da mudança.

Mudança Major exige aprovação Alexandre Caramaschi. Mudança Minor exige aprovação Bruno Azambuja + Alexandre Caramaschi. Patch exige só Brasil GEO.

## Cross-links

- Padrão editorial — `content/PADRAO-EDITORIAL.md` (Wave 3).
- Voz Alexandre — `content/VOICE-GUIDE.md` (Wave 3).
- Bloom + Knowles — `content/BLOOM-KNOWLES.md` (Wave 3).
- Clichés proibidos — `content/CLICHES-PROIBIDOS.md` (Wave 3).
- Acentuação PT-BR — `content/ACENTUACAO-PT-BR.md` (Wave 3).
- Briefing template — `content/BRIEFING-TEMPLATE.md` (Wave 3).
- Exercício template — `content/EXERCICIO-TEMPLATE.md` (Wave 3).
- Checklist autoavaliação — `content/CHECKLIST-AUTOAVALIACAO.md` (Wave 3).
- Checklist publicação — `content/CHECKLIST-PUBLICACAO.md` (Wave 3).
- Glossário Psicologia — `content/GLOSSARIO-PSICOLOGIA.md` (Wave 3).
- Auditoria NAIA — `audits/PLAYBOOK-AUDITORIA-NAIA.md`.
- Schema patterns — `audits/SCHEMA-PATTERNS.md`.
- Llms.txt — `audits/LLMS-TXT-TEMPLATE.md`.
- Robots e sitemap — `audits/ROBOTS-SITEMAP-CHECKLIST.md`.
- Kit de prompts — `prompts/KIT-PROMPTS-V0.md`.
- Papéis canônicos — `prompts/PAPEIS-DE-COLETA.md`.
- Pesquisa — `prompts/PROMPT-PESQUISA.md`.
- Redação — `prompts/PROMPT-REDACAO.md`.
- Análise — `prompts/PROMPT-ANALISE.md`.
- Classificação — `prompts/PROMPT-CLASSIFICACAO.md`.
- Revisão — `prompts/PROMPT-REVISAO.md`.
- Calibração mensal — `prompts/CALIBRACAO-MENSAL.md`.
- Métricas canônicas — `dashboards/METRICAS-CANONICAS.md`.
- Runbook coleta — `dashboards/RUNBOOK-COLETA-LLM.md`.
- FinOps — `dashboards/FINOPS-DISCIPLINA.md`.
- Quality gate — `docs/framework/02-quality-gate-5-camadas.md`.
- Pipeline — `docs/framework/03-pipeline-5-llms.md`.
- Rotinas — `docs/framework/01-rotinas-e-missoes-geo.md`.
