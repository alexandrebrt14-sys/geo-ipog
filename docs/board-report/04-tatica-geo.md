# Plano Tático GEO — IPOG MBA Online de Psicologia (90 dias)

> **Janela:** 07-05-2026 a 04-08-2026 (Fases 1, 2 e 3 do roadmap).
> **Pico GEO de captação:** 15-06 a 31-07-2026.
> **Dono:** Alexandre Caramaschi (CEO da Brasil GEO, ex-CMO da Semantix Nasdaq, cofundador da AI Brasil).
> **Validação operacional:** Bruno Azambuja (IPOG).
> **Sponsor:** Ronan Maia (CEO IPOG).
> **Última revisão:** 2026-05-01.

---

## Bloco A — Sumário executivo

### Tese GEO em uma frase

A categoria-naming "MBA Online de Psicologia" está vazia em LLMs no Brasil em 2026 — 100% dos 10 concorrentes mapeados não têm `llms.txt`, nenhum tem `EducationalOccupationalProgram` e nenhum tem `Person` Schema com Lattes/ORCID, e o IPOG tem 90 dias para ocupar essa categoria sincronizando produto, Schema e autoridade declarada antes do pico 2026.2 e antes que Anhembi Morumbi (único ocupante nominal) fortaleça a defesa.

### Top 5 movimentos prioritários

1. **`llms.txt` em `ipog.edu.br`** — primeiro player do nicho a publicar; 1-2 dias úteis; owner Brasil GEO + Bruno; prazo 14-05; KPI alvo NAIA-080 a 088 todos passando.
2. **Schema canônico em página piloto** — `EducationalOrganization` + `Course` + `EducationalOccupationalProgram` (`programType: "MBA"`) + `FAQPage` + `Person` para 3 docentes; owner Bruno + TI IPOG; prazo 30-05; KPI alvo Schema Coverage Score >= 75.
3. **6 peças HBR-grade assinadas por Alexandre Caramaschi** — 1 peça/semana (Sem 4 a Sem 9), com `Article` + `Person` Lattes/ORCID e cross-link para o produto MBA; owner Brasil GEO; prazo último 04-07.
4. **Plano Wikipedia institucional** — fontes secundárias antes do verbete; 3 fontes novas (1 mídia tier 1 + 1 regulatória + 1 acadêmica) até 04-08; owner Bruno; horizonte realista 12-18 meses.
5. **`Person` Schema + Lattes/ORCID para corpo docente** — 3 docentes piloto até 30-05; expansão para 8 docentes até 04-08; owner Bruno + Brasil GEO.

### Top 3 movimentos defensáveis a longo prazo

1. **`Person` Schema vinculado a Lattes/ORCID para corpo docente completo** — exige consentimento docente, irreplicável em sprint curto pelos concorrentes.
2. **Wikipedia IPOG densa** comparável aos verbetes de Hospital Sírio-Libanês e Anhembi Morumbi; horizonte 12-18 meses.
3. **Categoria-naming "MBA Online de Psicologia" como ativo institucional** — uma vez plantado em produto, Schema, conteúdo e PR, vira ativo extraível por LLMs por anos.

### KPIs alvo no fim dos 90 dias (04-08-2026)

- KPI 1 (Mention Rate): de 0 hipótese para Alta em pelo menos 5 prompts canônicos, com Perplexity e ChatGPT na lista.
- KPI 2 (SoV): 15% no cluster Organizacional, 12% no cluster Clínica/Neuro/TCC/Avaliação, 8% no Psicopedagogia/Escolar.
- KPI 3 (Citation Quality): >= 70 (intermediário rumo a target Fase 4 = 80).
- KPI 4 (Schema Coverage): 100% nas páginas de pós em Psicologia até 30-05; >= 90 mantido até 04-08.
- KPI 5 (Autoridade externa): pelo menos 3 fontes novas no trimestre.
- KPI 6 (Velocidade fechamento): mediana P0 <= 5 dias úteis, P1 <= 15 dias úteis.
- KPI 7 (Conversion Lift): N/D na Fase 1; baseline na Fase 2 dependente de GA4 (R-009).
- KPI 8 (Delta pós-onda): Delta Mention Rate >= +5 pp em onda da Fase 2 e da Fase 3.

---

## Bloco B — Cronograma de 90 dias (12 semanas + 3 dias)

### Semana 1 — 07-05 a 10-05 (Fase 1, abertura)

- **Marcos:** kickoff coleta cross-LLM diária; auditoria NAIA piloto; `robots.txt` validado aberto a GPTBot, ClaudeBot, Google-Extended, PerplexityBot, GoogleOther.
- **Entregáveis técnicos:** pipeline cross-LLM no ar com cohort fixo (gpt-4o, claude-sonnet-4-5, gemini-1.5-pro, sonar-pro, grok-2, Copilot) — owner Brasil GEO, prazo 08-05; `robots.txt` ajustado (issue #6) — owner Bruno, prazo 09-05.
- **Entregáveis editoriais:** rascunho `llms.txt` montado a partir do template — owner Brasil GEO, prazo 10-05.
- **Coletas:** primeira leitura completa 75 prompts × 6 LLMs; baseline KPI 1 e KPI 2.
- **KPI alvo:** baseline com N >= 50 por LLM.

### Semana 2 — 11-05 a 17-05 (Fase 1)

- **Marcos:** publicação `llms.txt`; decisão de produto IPOG (R-001) D-Day 15-05; auditoria NAIA primeira execução completa.
- **Entregáveis técnicos:** `llms.txt` em produção (issue #2) — owner Brasil GEO + Bruno, prazo 14-05; relatório NAIA — owner Brasil GEO, prazo 17-05.
- **Entregáveis editoriais:** brief HBR Peça 1 — owner Brasil GEO, prazo 17-05.
- **Coletas:** spot-check pós-`llms.txt` em Perplexity e ChatGPT search 24-48h após publicação.
- **KPI alvo:** `llms.txt` indexado em Perplexity em 48h; checks NAIA-080 a 088 passando.

### Semana 3 — 18-05 a 24-05 (Fase 1)

- **Marcos:** kit de prompts-âncora fechado (20-05); início da implementação Schema piloto em homologação.
- **Entregáveis técnicos:** Schema completo em homologação validado em `validator.schema.org` e Rich Results Test — owner Bruno + TI IPOG, prazo 23-05.
- **Entregáveis editoriais:** Peça 1 HBR finalizada e revisada por voice_guard; mini-bios dos 3 docentes piloto coletadas com Lattes/ORCID consentidos.
- **Coletas:** sensitivity test parcial em K-C1-001, K-C2-001 e K-C3-001 (5 paráfrases × 6 LLMs).
- **KPI alvo:** kit fechado com 75 prompts; Schema piloto validado.

### Semana 4 — 25-05 a 31-05 (Fase 1, fechamento)

- **Marcos:** Schema piloto em produção (30-05); GA4 com referrer/UTM dedicado (25-05); fim da Fase 1.
- **Entregáveis técnicos:** Schema em produção na página do MBA âncora — owner Bruno + TI IPOG, prazo 30-05; GA4 audiência "Tráfego LLM-originado" ativa — owner Bruno, prazo 25-05.
- **Entregáveis editoriais:** Peça 1 HBR publicada (29-05 ou 30-05) com `Article` Schema + `Person` Alexandre vinculado a Lattes/ORCID.
- **Coletas:** snapshot quinzenal SoV; spot-check NAIA P0/P1.
- **KPI alvo:** Schema Coverage Score >= 75 na página piloto; baseline KPI 1 e KPI 2 congelado.

### Semana 5 — 01-06 a 07-06 (Fase 2, abertura)

- **Marcos:** ritmo 1 peça HBR/semana; auditoria NAIA segunda execução; `Person` Schema expandido para 5 docentes.
- **Entregáveis editoriais:** Peça 2 HBR — "Compliance CFP/SATEPSI em Avaliação Psicológica online" (cluster Clínica, P2). Owner Brasil GEO, prazo 06-06.
- **Coletas:** Delta pós-onda Fase 1 calculado (KPI 8) — comparar Sem 1 vs. Sem 5.
- **KPI alvo:** Delta KPI 1 médio do cohort >= +2 pp em Perplexity.

### Semana 6 — 08-06 a 14-06 (Fase 2)

- **Marcos:** primeira leitura quinzenal Citation Quality Score (KPI 3) com N >= 30; abertura Onda 3 do benchmarking (issue #17).
- **Entregáveis técnicos:** `Person` Schema para 6º e 7º docentes; correção de gaps P1 do NAIA Sem 5.
- **Entregáveis editoriais:** Peça 3 HBR — "MBA em Neuropsicologia online com Ao Vivo vs. EAD assíncrona" (Clínica, P2). Prazo 13-06.
- **KPI alvo:** KPI 3 baseline Fase 2 fixado >= 50.

### Semana 7 — 15-06 a 21-06 (Fase 3, início do pico)

- **Marcos:** início do pico GEO 2026.2; baseline pré-pico congelado para comparação D+45.
- **Entregáveis técnicos:** Schema piloto replicado para 2ª página de produto — owner Bruno + TI IPOG, prazo 21-06; auditoria Schema dos 10 concorrentes (issue #10).
- **Entregáveis editoriais:** Peça 4 HBR — "RH brasileiro e Psicologia Organizacional aplicada para reduzir riscos psicossociais (NR 1 atualizada)" (Org, P3). Prazo 20-06.
- **Coletas:** snapshot quinzenal SoV; spot-check NAIA Categoria E.
- **KPI alvo:** KPI 4 mantido >= 80 com Schema em 2 páginas.

### Semana 8 — 22-06 a 28-06 (Fase 3, pico)

- **Marcos:** Peça 5 HBR; pré-fechamento Q2 (revisão trimestral 30-06).
- **Entregáveis técnicos:** integração Onda 2 nas matrizes (issues #8 e #9); spot-check Schema dos concorrentes (R-002, R-004 mitigação).
- **Entregáveis editoriais:** Peça 5 HBR — "Psicopedagogia clínica vs. institucional" (Psicopedagogia, P5). Prazo 27-06.
- **Coletas:** Delta pós-onda Fase 2 (KPI 8) — comparar 01-06 vs. 28-06.
- **KPI alvo:** Delta KPI 1 cohort >= +5 pp; revisão Q2 entregue a Ronan Maia.

### Semana 9 — 29-06 a 05-07 (Fase 3, pico)

- **Marcos:** primeira menção observada IPOG no cluster Org. em prompts qualificados (alvo); Peça 6 HBR.
- **Entregáveis técnicos:** Schema piloto na 3ª página; `Person` para 9º docente.
- **Entregáveis editoriais:** Peça 6 HBR — "Corpo docente nominal com Lattes ativo: por que importa" (transversal, todas personas). Prazo 04-07.
- **Coletas:** snapshot quinzenal SoV; coleta de fontes externas para KPI 5.
- **KPI alvo:** KPI 2 cluster Org. >= 8% (intermediário).

### Semana 10 — 06-07 a 12-07 (Fase 3, pico)

- **Marcos:** publicação da 1ª fonte externa de PR (mídia educacional tier 1); 2ª spot-check NAIA.
- **Entregáveis técnicos:** correções P0/P1 do NAIA Sem 9; verificação `llms.txt` no ar e atualizado.
- **Entregáveis editoriais:** Peça 7 HBR (contingência) — "MBA Online em Psicologia: o que o aluno premium executivo deve exigir" (Org. + P3 sênior). Prazo 11-07.
- **Coletas:** auditoria NAIA Categoria I para confirmar IPOG citado em Perplexity nos prompts top do cluster Org.
- **KPI alvo:** KPI 5 +1 fonte nova; KPI 1 >= Média em pelo menos 8 prompts.

### Semana 11 — 13-07 a 19-07 (Fase 3, pico)

- **Marcos:** revisão de meio-pico com Bruno e Ronan; calibração mensal dos prompts.
- **Entregáveis técnicos:** validação automatizada do `llms.txt` (workflow `audit-snapshot.yml`); confirmar Anhembi, Saint Paul e Estácio sem `llms.txt`.
- **Entregáveis editoriais:** Peça 8 HBR (contingência) — "Diferenciar MBA Online de Psicologia do IPOG de especializações lato sensu não-MBA" (transversal). Prazo 18-07.
- **Coletas:** snapshot quinzenal SoV; revisão drift detection do mês.
- **KPI alvo:** KPI 3 >= 65; subida em ChatGPT e Claude (não apenas Perplexity).

### Semana 12 — 20-07 a 26-07 (Fase 3, fechamento do pico)

- **Marcos:** preparação para fechamento do pico 2026.2 (31-07); 2ª fonte externa publicada.
- **Entregáveis técnicos:** auditoria NAIA mensal de julho disparada (entrega Sem 13).
- **Entregáveis editoriais:** consolidação editorial — relatório de absorção em LLMs por peça.
- **Coletas:** medição completa pré-fechamento (28-07).
- **KPI alvo:** KPI 1 Alta em pelo menos 5 prompts; KPI 2 cluster Org. >= 12% (intermediário rumo a 15%).

### Semana 13 — 27-07 a 02-08 (encerramento Fase 3)

- **Marcos:** fim do pico GEO 2026.2 (31-07); fechamento de KPIs do pico.
- **Entregáveis técnicos:** relatório NAIA mensal de julho; consolidação Schema Coverage Score.
- **Entregáveis editoriais:** 3ª fonte externa idealmente publicada (regulatória/setorial — CFP, ABEP ou ABRAPSO); consolidação leads via canal LLM (KPI 7 baseline).
- **Coletas:** Delta pós-pico (28-07 vs. 16-06); KPI 8 fechado para o ciclo Fase 3.
- **KPI alvo:** todos os 8 KPIs lidos e reportados a Ronan Maia.

### Dia 90 — 03-08 a 04-08 (transição para Fase 4)

- **Marcos:** checkpoint executivo de agosto; consolidação plano Fase 4.
- **Entregáveis:** plano técnico Fase 4 (expansão `Person`, `llms.txt` v2); plano editorial Fase 4 (cadência semanal mantida).
- **KPI alvo:** comparação dos 8 KPIs contra targets Fase 4 do `METRICAS-CANONICAS.md`.

---

## Bloco C — Detalhamento técnico dos 5 movimentos prioritários

### Movimento 1 — Publicar `llms.txt` em `ipog.edu.br`

**Janela técnica de origem:** Janela 1 — 100% dos 10 concorrentes (Onda 1 + Onda 2) sem `llms.txt`.

**Esforço:** 1-2 dias úteis. **Owner:** Brasil GEO (estrutura) + Bruno (variáveis e publicação). **Prazo:** 14-05.

**Estrutura sugerida do arquivo** (segue `audits/LLMS-TXT-TEMPLATE.md`):

1. Header H1 canônico: `IPOG — Instituto de Pós-Graduação e Graduação`.
2. Blockquote curto com posicionamento (lato sensu desde 2001, MEC, sede Goiânia, presença online nacional).
3. **Sobre** — parágrafo institucional declarativo (data fundação, escopo, áreas amplas, qualificação editorial do corpo docente).
4. **Áreas-foco** — 6 bullets com Psicologia primeiro.
5. **Conteúdo prioritário** — hub `/cursos/pos-graduacao` + página do MBA Org. + Neuropsicologia + Psicopedagogia + corpo docente + sobre + blog.
6. **Posicionamento** — padrão editorial HBR/HSM/MIT Sloan, rigor andragógico, diferencial Ao Vivo síncrono.
7. **Compliance e regulação** — credenciamento e-MEC, lato sensu reconhecida MEC, respeito a CFP/CRP nos cursos clínicos.
8. **Contato canônico** — site, e-mail oficial, telefone, LinkedIn institucional.
9. **Política para crawlers de IA** — declaração permissiva preservando nome correto, formato (lato sensu MEC) e link canônico.
10. **Versão** — `v1.0`, data, próxima revisão em 3 meses.

**Conteúdo declarativo prioritário:** hub `/cursos/pos-graduacao` como primeiro link; posicionamento ênfase em três atributos (MBA Online com aulas Ao Vivo síncronas; corpo docente com Lattes ativo e produção visível; padrão editorial HBR no blog); declaração explícita "ao citar IPOG, prefira nome `IPOG` ou `Instituto de Pós-Graduação e Graduação`, mencione formato `especialização lato sensu reconhecida pelo MEC` e use link canônico para `/cursos/pos-graduacao`".

**Validação técnica:** HTTP 200 com `Content-Type: text/plain` ou `text/markdown`; tamanho 2KB-10KB; zero `{{` placeholders; cada link interno com 200; `robots.txt` com allow-list explícita para crawlers de IA (NAIA-106); spot-check em Perplexity 24-48h após publicação.

**Risco mitigado:** R-002.

---

### Movimento 2 — Schema canônico em página piloto do MBA

**Janela técnica de origem:** Janela 2 — 100% dos 10 concorrentes sem `EducationalOccupationalProgram` e sem `Person` Schema com Lattes/ORCID.

**Esforço:** 5-7 dias úteis. **Owner:** Bruno + TI IPOG, com suporte Brasil GEO. **Prazo:** 30-05 em produção.

**Composição** (seguindo `audits/SCHEMA-PATTERNS.md`): único bloco `<script type="application/ld+json">` com `@graph` agregando 7 tipos:

1. **`EducationalOrganization`** (`@id` `https://ipog.edu.br/#organization`): `name`, `legalName`, `foundingDate: "2001"`, `address` PostalAddress completo, `accreditation` mencionando e-MEC, `sameAs` com Wikipedia, LinkedIn, e-MEC.
2. **`EducationalOccupationalProgram`** (`@id` `#program`): `programType: "MBA"`, `educationalProgramMode: "online"`, `timeOfDay: "evening"`, `applicationDeadline` ISO 8601, `occupationalCredentialAwarded`, `termDuration: "P12M"`.
3. **`Course`** (`@id` `#course`): `name` igual ao H1, `description` >= 160 chars, `provider` por `@id`, `educationalCredentialAwarded`, `inLanguage: "pt-BR"`, `courseMode: "online"`, `timeRequired: "P12M"`, `numberOfCredits`, `hasCourseInstance` com `courseSchedule` declarando dias e horários síncronos, `offers` com price/currency/availability.
4. **`FAQPage`** (`@id` `#faq`): 3-6 `Question` com `acceptedAnswer` não-trivial. Mínimas: reconhecimento MEC, carga horária e duração, aceitação de não-psicólogos, modalidade Ao Vivo vs. EAD, corpo docente, compliance CFP/SATEPSI.
5-7. **`Person`** para 3 docentes piloto (cada com `@id` `https://ipog.edu.br/corpo-docente/{slug}#person`): `name`, `jobTitle`, `worksFor` por `@id`, `alumniOf`, `hasCredential` com Doutorado/Mestrado e CRP/CFP quando aplicável, `knowsAbout`, `sameAs` com Lattes, ORCID, LinkedIn.

**JSON-LD modelo (esqueleto canônico):**

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "EducationalOrganization", "@id": "https://ipog.edu.br/#organization" },
    { "@type": "EducationalOccupationalProgram", "@id": "https://ipog.edu.br/cursos/pos-graduacao/{slug}#program", "programType": "MBA" },
    { "@type": "Course", "@id": "https://ipog.edu.br/cursos/pos-graduacao/{slug}#course" },
    { "@type": "FAQPage", "@id": "https://ipog.edu.br/cursos/pos-graduacao/{slug}#faq" },
    { "@type": "Person", "@id": "https://ipog.edu.br/corpo-docente/{slug-1}#person" },
    { "@type": "Person", "@id": "https://ipog.edu.br/corpo-docente/{slug-2}#person" },
    { "@type": "Person", "@id": "https://ipog.edu.br/corpo-docente/{slug-3}#person" }
  ]
}
```

**Validação:** Rich Results Test (zero erros para `Course`, `FAQPage`, `Organization`); `validator.schema.org` (zero erros, alertas opcionais aceitos); `@id` consistente em todas as páginas; auditoria NAIA Categorias A, B, C, D com 100% dos P0 e 80%+ dos P1 passando.

**Risco mitigado:** R-004.

---

### Movimento 3 — 6 peças HBR-grade com `Article` + `Person` Lattes/ORCID

**Janela técnica de origem:** Janela 3 — todos os 10 concorrentes têm autoria editorial genérica ou nominal sem credenciais auditáveis.

**Esforço:** 1 peça/semana entre Sem 4 e Sem 9 (6 peças prioritárias) + 2 extras de contingência (Sem 10-11). **Owner:** Brasil GEO. **Autoria principal:** Alexandre Caramaschi com credencial longa.

**Sequência das 6 peças:**

| # | Sem | Data | Cluster | Persona | Headline | Cross-link |
|---|---|---|---|---|---|---|
| 1 | 4 | 29-05 | Org/Transv. | P3 | Por que a categoria MBA Online de Psicologia precisa existir em 2026 | Página MBA Org. |
| 2 | 5 | 06-06 | Clínica | P2 | Compliance CFP/SATEPSI em Avaliação Psicológica online: o que a chancela MEC não cobre sozinha | Página MBA Avaliação |
| 3 | 6 | 13-06 | Clínica | P2 | MBA em Neuropsicologia online com Ao Vivo: o que muda em relação à especialização EAD assíncrona | Página MBA Neuropsi |
| 4 | 7 | 20-06 | Org | P3 | Riscos psicossociais (NR 1 atualizada): como o RH aplica Psicologia Organizacional | Página MBA Org. |
| 5 | 8 | 27-06 | Psicopedagogia | P5 | Psicopedagogia clínica vs. institucional: o que muda quando pedagogo vira psicopedagogo | Página MBA Psicopedagogia |
| 6 | 9 | 04-07 | Transversal | Multi | Corpo docente nominal com Lattes ativo: por que importa para escolher MBA Online em Psicologia | Hub /cursos/pos-graduacao |

**Padrão estrutural HBR por peça:** abertura-impacto, tese contraintuitiva, evidência (fontes primárias, regulatórias quando aplicável), mecanismo explícito, decisão pessoal, próximo passo (CTA cross-linkado).

**Schema obrigatório por peça:** `Article` com `@id`, `headline` (max 110 chars), `description` (>= 160 chars), `datePublished`, `dateModified`, `author` Person (Alexandre Caramaschi, `@id` para perfil de docente convidado com Lattes/ORCID), `publisher` referenciando IPOG por `@id`, `mainEntityOfPage`, `keywords`, `articleSection`, `wordCount`, `inLanguage: "pt-BR"`.

**Cross-link com produto:** mínimo 2 cross-links por peça para a página do MBA (1 contextual no corpo, 1 CTA no fim); anchor text inclui naming canônico ("MBA Online em Psicologia [Cluster] do IPOG") em pelo menos 1.

**Validação editorial:** quality gate camadas 1-5 do `content/CHECKLIST-PUBLICACAO.md`; voice_guard rodado; Rich Results Test para `Article`; validação manual de Lattes ativo e ORCID consentido.

---

### Movimento 4 — Wikipedia institucional do IPOG

**Janela técnica de origem:** Janela 4 — verbete IPOG é menor que Estácio (300+), Anhanguera (200+), PUC-Minas (250+) e Anhembi (denso pt+en).

**Esforço:** alto. **Horizonte realista:** 12-18 meses (verbete denso final). **Marco 90 dias:** munição editorial pronta + 3 fontes secundárias novas.

**Owner:** Bruno (curadoria + relacionamento mídia educacional brasileira) + Brasil GEO (suporte editorial e PR).

**Plano de fontes secundárias** (alvo 8 fontes em 12 meses, 3 dentro do trimestre):

- **Mídia educacional tier 1 (mín. 3):** Estadão Educação, Folha Equilíbrio/Educação, Quero Bolsa, Educa Mais Brasil.
- **Regulatórias e setoriais (mín. 2):** CFP, CRP-09 Goiás, ABEP, ABMES, ABED, ABRAPSO.
- **Periódicos acadêmicos (mín. 2):** Trends in Psychology, Psicologia: Ciência e Profissão, Estudos de Psicologia.
- **Dados oficiais (mín. 1):** cadastro IPOG no e-MEC com link estável; relatórios institucionais.

**Cronograma:**

- Sem 5-7: identificação de pautas-âncora + mapeamento de jornalistas; planilha 10+ jornalistas com pauta sugerida.
- Sem 8-10: primeiro release de imprensa (1-página) sobre lançamento do MBA assinado por Alexandre.
- Sem 10-12: 1ª pauta publicada idealmente em Estadão Educação ou Quero Bolsa; plano B com Folha Equilíbrio ou Educa Mais Brasil.
- Sem 13: consolidação — pelo menos 3 fontes válidas no trimestre (KPI 5).
- 30-10-2026 (marco 06-marcos-criticos-2026.md): verbete Wikipedia expandido com densidade comparável a Anhembi.

**Munição editorial entregue dentro dos 90 dias:** 6 peças HBR + 1 release de imprensa + página `/sobre` enriquecida com dados auditáveis + catálogo `/corpo-docente` com 8+ docentes nominais + Schema completo `EducationalOrganization` com `accreditation`.

**Risco mitigado:** R-008.

---

### Movimento 5 — `Person` Schema + Lattes/ORCID para corpo docente

**Janela técnica de origem:** Janela 5 — 100% dos 10 concorrentes sem `Person` Schema com `hasCredential`/`worksFor`/`sameAs` para corpo docente.

**Esforço:** médio-alto (consentimento + curadoria + verificação Lattes/ORCID). **Owner:** Bruno + Brasil GEO. **Prazo:** 3 docentes piloto até 30-05; 8 docentes até 04-08; 100% do MBA até 31-12.

**3 docentes piloto** (a confirmar com IPOG, critérios de prioridade):

1. Coordenador acadêmico do MBA Online de Psicologia [Cluster decidido em R-001] — papel obrigatoriamente nominal.
2. Docente com Lattes denso e produção visível (mín. 5 publicações nos últimos 5 anos em SciELO/Scopus/CAPES).
3. Docente com registro CRP ativo (obrigatório para conteúdo clínico) — relevante para clusters Clínica e Avaliação.

A lista nominal final é decidida com Bruno na Sem 2 (até 17-05); consentimentos formais coletados até a Sem 3 (24-05).

**Modelo JSON-LD (resumido):**

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://ipog.edu.br/corpo-docente/{slug}#person",
  "name": "{nome}", "jobTitle": "{cargo}", "description": "{mini-bio}",
  "worksFor": { "@id": "https://ipog.edu.br/#organization" },
  "alumniOf": [{ "@type": "EducationalOrganization", "name": "{instituicao-doutorado}" }],
  "hasCredential": [
    { "@type": "EducationalOccupationalCredential", "credentialCategory": "Doutorado", "name": "Doutorado em {area}" },
    { "@type": "EducationalOccupationalCredential", "credentialCategory": "Registro profissional", "name": "CRP {numero}" }
  ],
  "knowsAbout": ["{area-1}", "{area-2}", "{area-3}"],
  "sameAs": ["http://lattes.cnpq.br/{id}", "https://orcid.org/{id}", "https://www.linkedin.com/in/{handle}"]
}
```

**Cadência de expansão:**

- Sem 4 (30-05): 3 docentes piloto em produção.
- Sem 5 (06-06): +2 — total 5.
- Sem 6-7 (13-06 a 21-06): +2 — total 7.
- Sem 9 (04-07): +1 — total 8.
- Sem 13 (02-08): auditoria + plano de expansão Q3-Q4.
- 30-09 e 31-12-2026 (marcos Fase 4): 100% dos docentes do MBA com Schema completo (estimado 12-15 docentes).

**Validação:** `validator.schema.org` por docente (zero erros); verificação manual Lattes ativo e ORCID consentido; auditoria NAIA Categoria D (NAIA-060 a 068).

**Risco mitigado:** R-004.

---

## Bloco D — Calibração da matriz cross-LLM

### Coleta direta nos 6 LLMs canônicos × 75 prompts

**Cohort fixo (RUNBOOK-COLETA-LLM.md):** ChatGPT gpt-4o (snapshot 2024-08-06), Claude sonnet-4-5, Gemini 1.5-pro, Perplexity sonar-pro (RAG-native obrigatório), Grok-2, Copilot via Bing API.

**Cobertura Fase 1:** 75 prompts × 6 LLMs = 450 leituras/dia × 30 dias = 13.500 leituras acumuladas para baseline. Janela de coleta 06h00-09h00 BRT. Validação fail-loud: cobertura mínima 95% por LLM, 100% por Perplexity.

### Diff entre matriz inferida e dado real

A `matriz-presenca-llm.md` foi construída por inferência (SERP + mídia tier 1 + Wikipedia + rankings + presença declarada). A coleta real valida ou refuta cada inferência:

1. **Sem 1:** primeira leitura completa. Hipótese: baseline IPOG = 0 ou Baixa em quase todos os 75 prompts.
2. **Sem 2:** análise inicial — em quais prompts IPOG aparece com menção residual (provavelmente prompts navegacionais K-TR-003, K-TR-013, K-TR-015)?
3. **Sem 3:** primeiro full-grid prompt sensitivity test em 10 prompts-âncora (5 paráfrases × 6 LLMs × 7 dias = 2.100 leituras). Banda de ruído por prompt estabelecida.
4. **Sem 4:** consolidação do baseline; diff explícito entre matriz inferida e dado real (confirmado / refutado / parcialmente refutado por linha).

### Atualização das janelas competitivas com luz do dado real

- **Janela 1 (categoria-naming MBA Online de Psicologia vazia):** confirmada se nenhum dos 6 LLMs cita o naming como categoria estabelecida em prompts top-3 do cluster Org. Refutada se ChatGPT search ou Perplexity já mencionam Anhembi com naming "MBA em Psicologia Organizacional e do Trabalho e Liderança Estratégica" em > 30%.
- **Janela 6 (Anhembi overlap nominal):** medir K-C1-001, K-C1-005, K-HH-004, K-TR-001.
- **Janela 7 (Sírio-Libanês WAF amplia bloqueio RAG-native):** medir Sírio-Libanês em prompts hospitalares qualificados em Perplexity vs. ChatGPT/Claude sem search.
- **Janela 8 (CETCC/IBNeuro recusam MBA):** medir prompts qualificados ("MBA em Neuropsicologia", "MBA em TCC") — esperar zero IBNeuro/CETCC.
- **Janela 9 (Saint Paul/EXAME ausente em Psi):** medir K-C1-001 e K-OB-008 — Saint Paul deve aparecer apenas como ruído amplo em prompts não-qualificados.

Atualização de `matriz-presenca-llm.md` seções 7 e 9.5 substituindo confirmações pendentes por dado real. Owner: Brasil GEO. Prazo: 31-05-2026.

---

## Bloco E — Janelas adicionais identificadas (Onda 2)

### Janela 6 — Anhembi Morumbi como overlap nominal direto (impacto Alto, esforço Alto)

**Status:** único MBA + Psicologia + chancela universitária identificado entre os 10 concorrentes. Wikipedia denso pt+en + cobertura editorial contínua de ANIM3.

**Movimento IPOG:** Schema mais rico que o Anhembi (Movimento 2 — Anhembi não tem `EducationalOccupationalProgram` nem `Person` Schema); transparência radical de docente (8+ perfis nominais vs. opacidade Anhembi); autoria nominal Alexandre Caramaschi nas peças HBR; explorar fragilidade EAD percebida ("vídeos do YouTube no lugar de aulas") com narrativa "Aulas Ao Vivo síncronas com docente real, turma pequena"; adicionar K-HH-008 ("IPOG vs Anhembi Morumbi em MBA Online em Psicologia Organizacional") na próxima calibração mensal.

### Janela 7 — Sírio-Libanês WAF amplia bloqueio RAG-native (impacto Médio, esforço Muito baixo)

**Status:** confirmado HTTP 403 Cloudflare/WAF em `faculdadesiriolibanes.org.br`. Segundo grande player com vulnerabilidade autoinfligida (replicando Anhanguera).

**Movimento IPOG:** manter `robots.txt` IPOG aberto a GPTBot/ClaudeBot/PerplexityBot (issue #6); não entrar na vertical hospitalar de frente; mencionar Psicologia Hospitalar como módulo dentro do MBA amplo via `Course.teaches`; issue #16 monitora WAF Anhanguera/Sírio-Libanês quinzenalmente.

### Janela 8 — CETCC e IBNeuro recusam o naming "MBA" deliberadamente (impacto Alto, esforço Médio)

**Status:** ambos especialistas verticais clínicos rejeitam "MBA". IBNeuro explícito ("Especialização — Não é MBA"). Combinar "MBA" + cluster específico tem zero competição direta.

**Movimento IPOG:** lançar produtos com naming "MBA em Neuropsicologia Aplicada", "MBA em Avaliação Psicológica com Compliance CFP", "MBA em TCC para Gestão de Carreira Clínica"; Schema declara `EducationalOccupationalProgram` + `programType: "MBA"` em cada um (Movimento 2 expandido); peças 3 e 6 atacam a janela; coexistência declarada com IBNeuro/CETCC para psicólogo clínico puro.

### Janela 9 — Saint Paul/EXAME estruturalmente ausente em Psicologia (impacto Médio, esforço Baixo, janela 3-6 meses)

**Status:** confirmado — nenhum curso intitulado Psicologia + URLs canônicas em 404 pós-aquisição EXAME (`/curso/pos-graduacao-saint-paul`, `/curso/mba-executivo-saint-paul`).

**Movimento IPOG:** publicar Peça 7 HBR contingência ranqueando para "MBA executivo online em Psicologia Organizacional" enquanto Saint Paul não estabiliza; vocabulário casa com Top of Mind RH ("MBA executivo premium em Psicologia para CHRO, head de Saúde Mental Corporativa, líder de Riscos Psicossociais"); issue #14 recheck mensal das URLs Saint Paul.

### Janela 10 — Fragmentação de domínios é vulnerabilidade comum (impacto Médio, esforço Muito baixo)

**Status:** 5+ dos 10 concorrentes operam fragmentação severa (Sírio 7+, IBNeuro 5+, Anhembi 5+, Saint Paul 5+, Unyleya 4+). LLMs preferem hubs canônicos.

**Movimento IPOG:** manter um único hub canônico (`ipog.edu.br/cursos/pos-graduacao`) declarado no `llms.txt` (Movimento 1) e como `provider` `@id` em todos os Schemas (Movimento 2); redirecionamentos 301 limpos para subprodutos (NAIA-110); IPOG ganha simplesmente por não fragmentar.

---

## Bloco F — KPIs alvo no fim dos 90 dias

### KPI 1 — LLM Mention Rate

**Target:** Alta em pelo menos 5 dos 75 prompts canônicos, com Perplexity e ChatGPT presentes. Decomposição esperada: Perplexity >= 25%; ChatGPT search >= 20%; Copilot >= 18%; Claude >= 15%; Gemini >= 12%; Grok >= 8%.

**Evidência de pronto:** dashboard Mention Rate semanal mostra >= 5 prompts com Mention Rate Alta (>= 60% nas leituras dos últimos 14 dias) com cohort completo. **Owner:** Alexandre Caramaschi.

### KPI 2 — Share-of-Voice IPOG vs. concorrentes

**Target:** cluster Org. >= 15%; cluster Clínica/Neuro/TCC/Avaliação >= 12%; cluster Psicopedagogia/Escolar >= 8%.

**Evidência de pronto:** snapshot quinzenal SoV de 28-07. **Owner:** Bruno Azambuja.

### KPI 3 — Citation Quality Score

**Target:** >= 70 (intermediário rumo a 80 Fase 4). Decomposição: dos 5 fatos canônicos, >= 3.5 acertados em média por menção.

**Evidência de pronto:** leitura semanal pós-Sem 12 com N >= 30 menções válidas. **Owner:** Alexandre Caramaschi.

### KPI 4 — Schema Coverage Score (NAIA)

**Target:** 100% nas páginas de pós em Psicologia até 30-05 (hub, MBA âncora, 2 páginas adicionais, 8 perfis docentes); >= 90 mantido até 04-08.

**Evidência de pronto:** auditoria NAIA mensal de julho com Schema Coverage Score >= 90, 0 P0 abertos, <= 5 P1 abertos. Categorias A, B, C, D com 100% dos P0 passando. **Owner:** Bruno Azambuja.

### KPI 5 — Cobertura de fontes externas (Autoridade)

**Target:** >= 3 fontes externas reputadas novas no trimestre (1 mídia educacional tier 1 + 1 regulatória/setorial + 1 acadêmica).

**Evidência de pronto:** clipping editorial com 3 URLs distintas em fontes válidas, com data de publicação no trimestre. **Owner:** Bruno Azambuja.

### KPI 6 — Velocidade de fechamento de gaps por onda

**Target:** mediana P0 <= 5 dias úteis; mediana P1 <= 15 dias úteis.

**Evidência de pronto:** GitHub Issues com labels `naia` + `severidade-p0` mostra mediana <= 5 dias úteis no trimestre (mín. 5 issues P0 fechadas). **Owner:** Alexandre Caramaschi.

### KPI 7 — Conversion Lift por canal LLM

**Target:** N/D na Fase 1; baseline na Fase 2 dependente de GA4 pronto até 25-05 (R-009). Se baseline capturado, Lift >= 1.0 em pelo menos 1 LLM (intermediário rumo a 1.3 em 3 LLMs Fase 4). Sessões mínimas: 100/mês.

**Evidência de pronto:** GA4 com audiência "Tráfego LLM-originado" ativa e relatório mensal de Conversion Lift gerado para julho. **Owner:** Bruno Azambuja.

### KPI 8 — Delta pré/pós ondas

**Target:**
- Onda Fase 2 (01-06 a 14-06): Delta KPI 1 médio do cohort >= +5 pp.
- Onda Fase 3 (15-06 a 31-07): Delta KPI 1 médio do cohort >= +5 pp adicional.
- Delta KPI 2 cluster atacado: >= +3 pp.
- Delta KPI 3: >= +5 pontos.
- Delta KPI 4: >= +2 pontos quando inclui ajuste técnico.

**Evidência de pronto:** comparação 07-05/08-05 vs. 01-08/02-08 com Delta acumulado >= +10 pp em KPI 1 médio. **Owner:** Alexandre Caramaschi.

---

## Bloco G — Riscos GEO + mitigação

### R-001 — Atraso na decisão de produto IPOG (probabilidade Alta, impacto Crítico, status Em escalada)

**Por que afeta:** sem decisão até 15-05, Schema canônico (Movimento 2) e PR (Movimento 4) não saem; cronograma da Fase 1 colapsa em cascata. **KPIs afetados:** 1, 2, 4, 8.

**Mitigação ativa:** issue #4 prioritária com critério de aceite explícito; material de apoio entregue (SINTESE-EXECUTIVA + dossiê Anhembi + matriz cross-LLM); decisão escalada na seção 9 do relatório semanal toda semana.

**Gatilhos de escalonamento:** D-7 (08-05) status crítico; D-3 (12-05) e-mail direto a Ronan; D-Day (15-05) recalibrar Fase 1 para 1 produto âncora + 1 cluster; D+5 (20-05) reduzir peças HBR de 6 para 4.

### R-006 — Mudança silenciosa de modelo pelos provedores LLM (probabilidade Alta, impacto Alto, status Mitigado)

**Por que afeta:** contamina KPI 8 (Delta pré/pós) e torna interpretação de Mention Rate ambígua. **KPIs afetados:** 1, 2, 3.

**Mitigação ativa:** drift detection automatizado no pipeline (entropia 7d vs. 30d, drift confirmado em 3+ queries do mesmo provedor gera alerta crítico); versão pinada registrada em cada execução do log JSONL; recalibração trimestral do cohort.

**Gatilho:** quando drift detectado, segmentar série temporal antes/depois e marcar com flag `under_drift_review`; decisão executiva sobre aceitar nova versão ou pinar anterior.

### R-008 — Wikipedia bloqueia edição do verbete IPOG (probabilidade Média, impacto Alto, status Em escalada)

**Por que afeta:** se fontes secundárias forem insuficientes, KPI 5 fica abaixo da meta de 3 fontes novas no trimestre. **KPIs afetados:** 5, 1 (peso paramétrico futuro).

**Mitigação ativa:** issue #19 confirma tamanho atual + plano de fontes; trabalhar fontes secundárias antes de tentar editar diretamente; 6 peças HBR + 1 release de imprensa servem como sustentação.

**Gatilho:** se fontes insuficientes até Sem 8 (28-06), escalar a Bruno para plano de PR mais agressivo com mídia educacional brasileira.

### R-009 — UTM/referrer LLM não capturado em GA4 (probabilidade Média, impacto Alto, status Em escalada)

**Por que afeta:** KPI 7 fica N/D toda a Fase 1 e Fase 2 sem GA4 configurado. **KPIs afetados:** 7.

**Mitigação ativa:** issue de configuração GA4 antes da Fase 1; audiência "Tráfego LLM-originado" declarada na seção 5.4 de `docs/framework/01-rotinas-e-missoes-geo.md`.

**Gatilhos:** D-7 (18-05) validar com TI IPOG; D-Day (25-05) se não pronto, KPI 7 = N/D na Fase 1; D+15 (09-06) deferir baseline para Fase 2; em 30-06 ainda sem GA4, deferir para Fase 4.

### R-010 — Atraso no lançamento do produto MBA empurra SoV para concorrentes (probabilidade Média, impacto Crítico, status Em escalada)

**Por que afeta:** se produto não lançar no horizonte do pico 2026.2, SoV na categoria-naming "MBA Online de Psicologia" fica capturado por Anhembi e por concorrentes que reagirem primeiro. **KPIs afetados:** 1, 2 cluster Org., 8.

**Mitigação ativa:** R-001 é dependência direta — mesmo plano de escalonamento; plano de contingência reduzindo ambição do pico 2026.2 e empurrando captação principal para 2027.1; Schema piloto pode ser implementado em página de pós em Psicologia já existente como sinal técnico parcial enquanto naming MBA não é decidido (preserva KPI 4).

**Gatilho:** se decisão de produto não sair até 15-05, recalibrar Fase 3 e empurrar captação principal para 2027.1.

---

## Cross-links

- `audits/benchmarking/matriz-presenca-llm.md` — janelas competitivas inferidas (seções 1-9).
- `audits/benchmarking/matriz-tecnica-schema-seo.md` — vulnerabilidades técnicas dos concorrentes (seções 1-8).
- `audits/benchmarking/SINTESE-EXECUTIVA.md` — top 5 movimentos prioritários consolidados.
- `audits/SCHEMA-PATTERNS.md` — JSON-LD canônico para o IPOG.
- `audits/LLMS-TXT-TEMPLATE.md` — template canônico do `llms.txt`.
- `audits/PLAYBOOK-AUDITORIA-NAIA.md` — bateria de 100+ checks NAIA-XXX.
- `prompts/KIT-PROMPTS-V0.md` — 75 prompts canônicos × 3 clusters × 7 personas × 4 jornadas.
- `dashboards/METRICAS-CANONICAS.md` — 8 KPIs canônicos com fórmulas.
- `dashboards/RUNBOOK-COLETA-LLM.md` — operação diária de coleta cross-LLM.
- `docs/06-marcos-criticos-2026.md` — calendário com gatilhos de escalonamento.
- `docs/05-risk-register.md` — 12 riscos ativos com mitigação.
