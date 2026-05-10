# Ontologia Canônica — Programa GEO IPOG

> **Status:** vigente desde 2026-05-10
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação:** Bruno Azambuja (IPOG)
> **Próxima revisão:** 10-08-2026 (trimestral)

Catálogo formal das entidades, relacionamentos e propriedades canônicas do programa GEO IPOG. Cada entidade tem identificador canônico imutável, naming fixo, propriedades obrigatórias e relacionamentos esperados. Entidade fora do catálogo é entidade não-canônica — não aparece em Schema, em Wikidata, em copy assinada.

A lógica é prescritiva: ontologia sem identificador canônico colapsa em sinonímia. Sinonímia mata Entity Consistency Score em LLMs.

---

## 1. Identificação canônica

Toda entidade canônica tem **três identificadores** simultâneos:

- **ID interno** (`@id` no JSON-LD) — slug ASCII estável, ex: `org:ipog`, `unit:goiania-sede`, `course:mba-psi-organizacional`
- **URL canônica** — endereço único em `ipog.edu.br/cursos/...` ou `alexandrecaramaschi.com/...`
- **Wikidata Q-id** quando aplicável — para Wikipedia/RAG inbound (ver `KNOWLEDGE-GRAPH-IPOG.md`)

Os três precisam apontar para a mesma entidade conceitual em qualquer Schema, peça editorial ou perfil docente.

---

## 2. Catálogo de entidades canônicas

### 2.1 EducationalOrganization — IPOG (raiz + 51 unidades)

Tipo Schema.org: `EducationalOrganization`.

#### 2.1.1 Mantenedora raiz

| Campo | Valor canônico |
|---|---|
| `@id` | `org:ipog` |
| `name` | "Instituto de Pós-Graduação e Graduação" |
| `alternateName` | "IPOG" |
| `legalName` | (a confirmar com Bruno) |
| `taxID` | (CNPJ mantenedora — a confirmar) |
| `url` | `https://ipog.edu.br` |
| `foundingDate` | "2001-XX-XX" (mês a confirmar) |
| `foundingLocation` | Goiânia, GO, Brasil |
| `accreditation` | MEC (autorizada para pós-graduação Lato Sensu) |
| `slogan` | (a definir com Bruno + Voice Guard) |
| `parentOrganization` | (não tem — é raiz) |
| `subOrganization` | 51 unidades regionais (CNPJ-próprio) |
| `wikidataId` | (a criar — issue #58 NAIA equivalent) |

#### 2.1.2 Unidades regionais (51 — Frente Regional CNPJ-próprio)

Cada unidade é `EducationalOrganization` independente vinculada à raiz por `parentOrganization` → `org:ipog`.

| Campo | Valor canônico |
|---|---|
| `@id` | `unit:<slug-cidade>` (ex: `unit:cuiaba`, `unit:palmas`) |
| `name` | "IPOG Unidade <Cidade>" |
| `legalName` | razão social local |
| `taxID` | CNPJ local |
| `url` | `https://ipog.edu.br/unidades/<slug-cidade>` |
| `address` | endereço completo da unidade |
| `geo` | `GeoCoordinates` (latitude + longitude) |
| `parentOrganization` | `org:ipog` |
| `member` | CRP estadual onde a unidade opera |
| `areaServed` | Place(<estado>) |

**Hipótese de composição** (a confirmar via NAIA-310 com Bruno): GO+DF (~14), MT (~7), MS (~5), TO (3), BA (~9), MA+PA (~6), e 7 a definir = 51 unidades. Ver `audits/benchmarking/REGIONAL-2026-ESTADOS-CIDADES.md` seção 5.2.

### 2.2 EducationalOccupationalProgram — Programas de pós-graduação

Tipo Schema.org: `EducationalOccupationalProgram`.

#### 2.2.1 MBA Online de Psicologia (3 clusters)

Cada cluster é um `EducationalOccupationalProgram` distinto.

| `@id` | `name` | Cluster |
|---|---|---|
| `program:mba-psi-organizacional` | "MBA Online de Psicologia Organizacional" | Cluster 1 — Organizacional / RH / Trabalho |
| `program:mba-psi-clinica-neuro` | "MBA Online de Psicologia Clínica, Neuropsicologia, TCC e Avaliação" | Cluster 2 — Clínica / Neuro / TCC / Avaliação |
| `program:mba-psi-escolar` | "MBA Online de Psicologia Escolar e Psicopedagogia" | Cluster 3 — Psicopedagogia / Escolar |

Propriedades obrigatórias:

- `programType` — `"MBA"` ou `"Especialização"` (decisão R-019: manter ambos como fallback)
- `educationalCredentialAwarded` — "Especialização Lato Sensu em <área>" (compliance MEC)
- `numberOfCredits` — créditos totais
- `timeToComplete` — duração no formato ISO 8601 (`P12M` = 12 meses)
- `programPrerequisites` — graduação em qualquer área (ou Psicologia, conforme cluster)
- `provider` — `org:ipog`
- `occupationalCategory` — código CBO de Psicólogo (251510 conforme caso)
- `applicationDeadline` — janela de captação atual
- `hasCourse` — array de `Course` que compõem o programa

### 2.2.2 Programas derivados (Fase 3 e além)

| `@id` | `name` | Vinculação |
|---|---|---|
| `program:trilha-ia-saude-mental` | "Trilha IA em Saúde Mental com Supervisão Clínica Humana" | Issue #60 (acadêmica vs IBNeuro) |
| `program:b2b-nr1-saude-mental` | "Pacote B2B Saúde Mental Corporativa NR-1" | Issue #49 |

### 2.3 Course — Disciplinas e unidades curriculares

Tipo Schema.org: `Course`.

| Campo | Valor canônico |
|---|---|
| `@id` | `course:<slug>` (ex: `course:psicometria-aplicada`) |
| `name` | nome canônico da disciplina |
| `provider` | `org:ipog` |
| `courseCode` | código interno IPOG |
| `educationalLevel` | "Pós-graduação Lato Sensu" |
| `inLanguage` | `pt-BR` |
| `numberOfCredits` | créditos |
| `timeRequired` | ISO 8601 |
| `hasCourseInstance` | turmas concretas (`CourseInstance`) |
| `teaches` | array de habilidades/competências |
| `coursePrerequisites` | pré-requisitos |

### 2.4 Person — Pessoas canônicas do programa

Tipo Schema.org: `Person`.

#### 2.4.1 Stakeholders fixos

| `@id` | Nome | Papel | sameAs canônicos |
|---|---|---|---|
| `person:alexandre-caramaschi` | Alexandre Caramaschi | CEO Brasil GEO + Head do programa GEO IPOG | LinkedIn + alexandrecaramaschi.com + Lattes (a confirmar) |
| `person:ronan-maia` | Ronan Maia | CEO IPOG + Sponsor executivo | LinkedIn (a confirmar com Bruno) |
| `person:bruno-azambuja` | Bruno Azambuja | Gerente de Marketing IPOG + Interlocutor operacional | LinkedIn (a confirmar) |

#### 2.4.2 Corpo docente (51 unidades × N docentes — NAIA-317)

| Campo | Valor canônico |
|---|---|
| `@id` | `person:<slug-nome>` |
| `name` | nome civil completo |
| `jobTitle` | cargo na unidade |
| `worksFor` | `unit:<slug-cidade>` (a unidade local específica, não a raiz) |
| `hasCredential` | array de `EducationalOccupationalCredential` (graduação + pós + registro CFP) |
| `sameAs` | Lattes URL + ORCID URL + LinkedIn quando público |
| `knowsAbout` | array de termos canônicos (subset de §2.9) |
| `memberOf` | `crp:<sigla>` quando aplicável |

#### 2.4.3 Helper canônico Alexandre

Ver memória `reference_alexandre_geo_person_canonical.md`. Helper único `src/lib/schemas/person-alexandre.ts` na landing-page-geo já tem 38 `knowsAbout` core + 13 `sameAs` + 3 `alumniOf` + 2 `hasCredential`. Toda peça assinada por Alexandre espalha `...alexandrePersonBase`.

### 2.5 Place — Lugares canônicos

Tipo Schema.org: `Place`, `City`, `State`, `Country`.

#### 2.5.1 País + estados-foco

| `@id` | Tipo | Nome |
|---|---|---|
| `place:brasil` | `Country` | Brasil |
| `place:go` | `State` (administrativeArea) | Goiás |
| `place:df` | `State` | Distrito Federal |
| `place:mt` | `State` | Mato Grosso |
| `place:ms` | `State` | Mato Grosso do Sul |
| `place:to` | `State` | Tocantins |
| `place:ba` | `State` | Bahia |
| `place:ma` | `State` | Maranhão |
| `place:pa` | `State` | Pará |

#### 2.5.2 51 cidades médias (definidas em NAIA-310)

| `@id` | Tipo | Vinculação |
|---|---|---|
| `place:goiania` | `City` | `containedInPlace` `place:go` |
| `place:cuiaba` | `City` | `containedInPlace` `place:mt` |
| `place:palmas` | `City` | `containedInPlace` `place:to` |
| ... (48 outras) | `City` | conforme estado |

### 2.6 Article — Peças HBR-grade

Tipo Schema.org: `Article` (ou `BlogPosting` quando informal).

| Campo | Valor canônico |
|---|---|
| `@id` | `article:<slug>` |
| `headline` | título canônico (≤ 110 caracteres) |
| `author` | `Person` (ex: `person:alexandre-caramaschi`) |
| `publisher` | `org:brasil-geo` ou `org:ipog` |
| `datePublished` | ISO 8601 |
| `dateModified` | ISO 8601 |
| `inLanguage` | `pt-BR` |
| `about` | array de `knowsAbout` (subset de §2.9) |
| `mentions` | array de `Course` / `EducationalOccupationalProgram` / `Person` |
| `articleSection` | seção editorial canônica |
| `keywords` | termos canônicos |
| `wordCount` | contagem |
| `timeRequired` | tempo de leitura ISO 8601 |

### 2.7 FAQPage — Páginas de perguntas e respostas

Tipo Schema.org: `FAQPage`. Ver memória `feedback_schema_faqpage_vs_qapage.md` — usar **FAQPage** quando há múltiplas perguntas; QAPage só para 1 pergunta + respostas usuário. Validar SEMPRE em Rich Results Test.

### 2.8 Service — Pacotes B2B

Tipo Schema.org: `Service`. Cobre pacotes corporativos (NR-1, treinamentos in-company).

### 2.9 Concept (knowsAbout) — Termos canônicos

Termos que aparecem em `knowsAbout` (Person, Article) e em `keywords`. Lista mestra mantida em `content/GLOSSARIO-PSICOLOGIA.md` + helper `src/lib/schemas/person-alexandre.ts`. Categorias:

| Categoria | Exemplos | Total |
|---|---|---|
| GEO / AI Search | Generative Engine Optimization, AI Overviews, llms.txt, Schema.org, Knowledge Graph, Entity Consistency Score | ~12 |
| Psicologia (vertical IPOG) | Psicologia Organizacional, Neuropsicologia, Avaliação Psicológica, TCC, Psicopedagogia, Terapia Cognitivo-Comportamental, Psicologia Clínica, Psicologia Hospitalar, Psicologia Escolar, Psicologia Jurídica | ~15 |
| Educação / EAD | EAD, Lato Sensu, MBA, Educação a Distância, Educação Híbrida, Pós-Graduação, MEC, e-MEC, Decreto 12.456/2025, Portaria MEC 506/2025 | ~10 |
| Negócio / Marca pessoal | Brasil GEO, Semantix, AI Brasil, Knowledge Graph para Marcas, Marketing GEO | ~6 |
| Regulatório | CFP, ABEP, ABRAPSO, NR-1, CRP estaduais, Conselho Federal de Psicologia | ~8 |

**Total mínimo:** 50+ termos canônicos. Cada peça HBR-grade espalha 8-15 termos relevantes em `keywords` + `about`.

### 2.10 Organization (não-IPOG) — Concorrentes canônicos

Tipo Schema.org: `Organization` ou `EducationalOrganization`. Catalogados para benchmarking, comparações editoriais e tracking SoV.

| `@id` | Nome canônico | Grupo competitivo |
|---|---|---|
| `org:estacio` | Estácio (Yduqs YDUQ3) | G1 EAD massivos |
| `org:anhanguera` | Anhanguera (Cogna COGN3) | G1 EAD massivos |
| `org:uninter` | UNINTER | G1 EAD massivos |
| `org:unicesumar` | UniCesumar (Vitru VTRU) | G1 EAD massivos |
| `org:puc-minas-virtual` | PUC Minas Virtual | G1 EAD massivos |
| `org:cetcc` | CETCC | G3 Especialistas Psi |
| `org:ibneuro` | IBNeuro | G3 Especialistas Psi |
| `org:sirio-libanes-iep` | Sírio-Libanês IEP/FSL | G3 Especialistas Psi |
| `org:wpos-anhembi` | wPós/Anhembi (Ânima ANIM3) | G3 Especialistas Psi |
| `org:saint-paul-exame` | Saint Paul/EXAME | G3 Especialistas Psi |
| `org:vittude` | Vittude | G5 Edtechs convergentes |
| `org:zenklub` | Zenklub | G5 Edtechs convergentes |

### 2.11 Risk — Riscos catalogados

Não é tipo Schema.org formal — é taxonomia interna. Ver `docs/05-risk-register.md`.

| `@id` | Tema | Status |
|---|---|---|
| `risk:r-001` | Atraso decisão produto IPOG | Em escalada |
| `risk:r-002` | Concorrente publica llms.txt antes do IPOG | Mitigado |
| `risk:r-003` | Sírio-Libanês/Anhanguera desbloqueia WAF | Mitigado |
| `risk:r-004` | Anhembi adiciona Person Schema com Lattes | Mitigado |
| `risk:r-005` | PUC-Minas reabre Psicologia EAD | Aceito |
| `risk:r-006` | Mudança silenciosa modelo provedor LLM | Mitigado |
| `risk:r-007` | Especialistas em Psi fora do mapa atual aceleram GEO | Mitigado |
| `risk:r-008` | Wikipedia bloqueia edição IPOG por notabilidade | Em escalada |
| `risk:r-009` | UTM/referrer LLM não capturado em GA4 | Em escalada |
| `risk:r-010` | Atraso lançamento produto MBA empurra SoV para concorrentes | Em escalada |
| `risk:r-011` | Saint Paul/EXAME estabiliza arquitetura web | Mitigado |
| `risk:r-012` | Vazamento de informação confidencial | Mitigado |
| `risk:r-013` | Wikipedia/Reddit gap permite concorrentes citados mais que IPOG | Detectado 10-05-2026 |
| `risk:r-014` | UniCesumar industrial — IPOG não replica catálogo | Detectado 10-05-2026 |
| `risk:r-015` | Decreto 12.456 segunda onda atinge lato sensu | Detectado 10-05-2026 |
| `risk:r-016` | Edtechs convergentes (Vittude/Zenklub) viram concorrentes diretos | Detectado 10-05-2026 |
| `risk:r-017` | Avanço regulatório do Decreto 12.456 para pós lato sensu | Detectado 10-05-2026 |
| `risk:r-018` | M&A regional do cluster Psi pelos consolidadores | Detectado 10-05-2026 |
| `risk:r-019` | Reação institucional CFP/CRPs contra MBA online em Psicologia | Detectado 10-05-2026 |

### 2.12 KPI — Indicadores canônicos

Não é Schema.org. Ver `dashboards/METRICAS-CANONICAS.md` + `dashboards/KPI-DASHBOARD.md`.

8 KPIs canônicos + 4 derivados (KPI 1.1 regional, KPI 5.1 Wikipedia, KPI 5.2 Reddit, KPI 7.1 Conversion Lift × cidade).

---

## 3. Catálogo de relacionamentos canônicos

### 3.1 Schema.org standard

| Relacionamento | Domínio → Range | Uso canônico |
|---|---|---|
| `provider` | Course / EducationalOccupationalProgram → EducationalOrganization | Course X tem provider IPOG (`org:ipog`) |
| `parentOrganization` | EducationalOrganization → EducationalOrganization | Unit X tem parent `org:ipog` |
| `subOrganization` | EducationalOrganization → EducationalOrganization | IPOG tem 51 sub-organizations |
| `member` | Organization → Organization | IPOG é member de CRP-09 (a confirmar) |
| `memberOf` | Person → Organization | Pessoa Y é memberOf CRP-09 |
| `worksFor` | Person → Organization | Docente trabalha para `unit:<cidade>` |
| `employer` | Person → Organization | Equivalente a worksFor |
| `hasCredential` | Person → EducationalOccupationalCredential | Docente tem credenciais declaradas |
| `sameAs` | qualquer → URL externa | Person → Lattes/ORCID/LinkedIn; Org → Wikidata/Wikipedia |
| `alumniOf` | Person → EducationalOrganization | Alexandre alumniOf USP (a verificar) |
| `accreditation` | EducationalOrganization → Organization | IPOG accreditation MEC |
| `award` | qualquer → string ou Organization | títulos recebidos |
| `location` | qualquer → Place | unit:cuiaba location place:cuiaba |
| `address` | qualquer → PostalAddress | endereço estruturado |
| `areaServed` | Service / Org → Place | Service B2B areaServed estado X |
| `geo` | Place → GeoCoordinates | latitude + longitude |
| `containedInPlace` | Place → Place | place:cuiaba containedInPlace place:mt |
| `author` | Article → Person | Article authored by `person:alexandre-caramaschi` |
| `mentions` | Article → qualquer | Article mentions Course X |
| `about` | Article → Concept/Thing | Article about "Psicologia Organizacional" |
| `keywords` | Article → string list | termos canônicos |
| `inLanguage` | qualquer → BCP-47 | sempre `pt-BR` |
| `educationalCredentialAwarded` | EducationalOccupationalProgram → string ou Credential | tipo de diploma emitido |
| `programType` | EducationalOccupationalProgram → string | "MBA" ou "Especialização" |
| `numberOfCredits` | Course/Program → integer | créditos |
| `timeToComplete` | EducationalOccupationalProgram → Duration ISO 8601 | duração |
| `timeRequired` | Course/Article → Duration ISO 8601 | tempo de execução |
| `occupationalCategory` | EducationalOccupationalProgram → string ou CategoryCode | CBO 251510 Psicólogo |

### 3.2 Convenções IPOG-específicas

| Relacionamento implícito | Implementação | Justificativa |
|---|---|---|
| Unidade → CRP estadual | Schema `member` apontando para `Organization` do CRP-XX | NAIA-313: parcerias formais com CRPs |
| Programa → Cluster semântico | Schema `keywords` com termos do cluster | LLMs precisam ancorar Programa em cluster discoverável |
| Article → Persona-alvo | Schema `audience.audienceType` com persona canônica | personalização semântica de SoV |
| Article → Janela curta | Schema `temporalCoverage` com período da janela | crawl-friendly time anchoring |

---

## 4. Hierarquia de naming

### 4.1 Naming canônico (NUNCA mudar)

- **Brasil GEO** — nunca "GEO Brasil"
- **IPOG** — nunca "Ipog" ou "iPOG"
- **MBA Online de Psicologia [Cluster]** — usar exatamente esta forma com placeholder
- **Frente Regional 51 cidades CNPJ-próprio** — não abreviar
- **Alexandre Caramaschi** — nome completo; credencial canônica longa: "CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil"
- **Voice Guard** — em maiúsculas como tool name
- **NAIA** — sigla em maiúsculas
- **Schema.org** — sempre com ponto, não "Schema org"

### 4.2 Naming proibido (causou incidente histórico)

- "Especialista #1" ou rankings auto-atribuídos
- "Source Rank" como métrica IPOG
- "geobrasil.com.br" (não é domínio canônico)
- "sourcerank.ai" (não é produto canônico)

### 4.3 Slug e URL

ASCII puro, kebab-case, sem acentos. Exemplos:

- `/cursos/mba-psicologia-organizacional` ✓
- `/cursos/mba-psicologia-organizacional-online` ✓ (variação aceita)
- `/cursos/mba-psicologia-organização` ✗ (acento em URL — banido)
- `/cursos/MBA-Psicologia` ✗ (camelcase em URL)

Memória: `feedback_accent_url_protection.md`.

---

## 5. Casos de uso (8 padrões canônicos)

### Caso 1 — Criar página de curso

1. Definir `@id` (`course:<slug>`).
2. Aplicar Schema `Course` com 9 propriedades obrigatórias (§2.3).
3. Vincular `provider` → `org:ipog`.
4. Vincular `hasCourseInstance` para turmas abertas.
5. `keywords` com 5-10 termos canônicos do cluster correspondente.
6. Validar Rich Results Test + Schema.org Validator.

### Caso 2 — Criar perfil de docente

1. Definir `@id` (`person:<slug-nome>`).
2. Aplicar Schema `Person` com `worksFor` → unidade local específica (`unit:<cidade>`).
3. `hasCredential` array com graduação, pós, registro CFP.
4. `sameAs` apontando para Lattes + ORCID + LinkedIn.
5. `knowsAbout` 5-10 termos canônicos.
6. NAIA-317 cobre os 51 docentes da Frente Regional.

### Caso 3 — Criar peça HBR-grade

1. Padrão editorial 6 elementos (`content/PADRAO-EDITORIAL.md`).
2. Voice Guard 2.0 ≥ 7/9 enriquecimentos GEO (issue acadêmica #59).
3. Schema `Article` com `author` (sempre Person) + `mentions` + `about`.
4. `keywords` 8-15 termos canônicos.
5. Cross-link para 1+ Course ou EducationalOccupationalProgram.

### Caso 4 — Adicionar nova unidade regional

1. Definir `@id` (`unit:<slug-cidade>`).
2. Schema `EducationalOrganization` com `parentOrganization` → `org:ipog`.
3. CNPJ local + endereço + GeoCoordinates.
4. `member` → CRP estadual quando parceria firmada (NAIA-313).
5. Sitemap regional submetido + IndexNow ping.

### Caso 5 — Adicionar termo ao knowsAbout

1. Validar que o termo é estável (não trend de 30 dias).
2. Adicionar em `content/GLOSSARIO-PSICOLOGIA.md` com contexto de uso.
3. Adicionar ao helper `src/lib/schemas/person-alexandre.ts` se for `knowsAbout` core.
4. Cross-link em ≥ 2 peças editoriais para sustentar Entity Consistency.

### Caso 6 — Catalogar novo concorrente

1. Definir `@id` (`org:<slug-concorrente>`).
2. Atribuir grupo competitivo (G1-G5).
3. Criar dossiê em `audits/benchmarking/concorrente-<slug>.md` (DoD seção 6).
4. Atualizar matrizes consolidadas (presença LLM + técnica Schema/SEO).
5. Adicionar ao label GitHub `concorrente:<slug>` se rastreamento contínuo justificar.

### Caso 7 — Catalogar novo risco

1. Próximo número da série R-XXX.
2. Adicionar em `docs/05-risk-register.md` com formato canônico (descrição + probabilidade + impacto + status + KPIs afetados + mitigação ativa + gatilho).
3. `@id` (`risk:r-XXX`).
4. Atualizar heatmap risco × KPI em `dashboards/KPI-DASHBOARD.md` seção 10.

### Caso 8 — Criar issue no GitHub

1. Template apropriado (audit-finding, citation-gap, content-piece, schema-task, gating-decision-ipog, incident).
2. Labels: priority + phase OU quarter + vetor + cluster + persona quando aplicável + tipo + owner.
3. Milestone vinculado.
4. Adicionar ao project board #6.
5. DoD explícito no body.

---

## 6. Validação periódica

A cada onda fechada (DoD seção 7), executar 3 checks de aderência à ontologia:

1. **Naming canônico** — grep automático em todos os arquivos novos por strings proibidas (§4.2). Saída: zero ocorrências ou justificativa explícita.
2. **Schema validator** — Rich Results Test em todas as URLs novas. Saída: HTTP 200 sem erros.
3. **Entity Consistency** — comparar mention rate de IPOG vs `org:ipog` (canônico) vs variantes em LLM. Saída: ≥ 90% das menções usando naming canônico.

Falha em qualquer check vira issue com label `type:audit-finding`.

---

## 7. Cross-links

- `docs/ontologia/TAXONOMIA-CONTEUDO.md` — hierarquia + naming + labels GitHub
- `docs/ontologia/KNOWLEDGE-GRAPH-IPOG.md` — grafo Wikidata-ready
- `docs/ontologia/SCHEMA-IPOG-CANONICAL.md` — JSON-LD concreto
- `audits/SCHEMA-PATTERNS.md` — templates Schema.org (referência inicial; será expandida com instâncias canônicas IPOG)
- `audits/PLAYBOOK-AUDITORIA-NAIA.md` — checks que validam aderência
- `content/GLOSSARIO-PSICOLOGIA.md` — termos canônicos
- `docs/CONTEXTO-AMPLIADO-2026-05-10.md` — visão estratégica integrada
- `docs/05-risk-register.md` — riscos R-001 a R-019
- Helper canônico Alexandre: memória `reference_alexandre_geo_person_canonical.md`
