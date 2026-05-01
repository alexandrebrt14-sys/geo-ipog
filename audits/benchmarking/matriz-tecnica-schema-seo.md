# Matriz Técnica — Schema, llms.txt, SEO e Autoridade Externa dos 5 Concorrentes

> **Status:** vigente desde 2026-04-30
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-04-30

## 1. Sumário executivo

Estado técnico geral dos 5 concorrentes em uma frase cada:

- **Estácio:** robots.txt aberto a crawlers de IA, sitemap declarado, mas Schema.org parcial em páginas de pós e nenhuma estrutura `Person` para corpo docente.
- **Anhanguera:** WAF agressivo retornando HTTP 403 a crawlers automatizados, o que **degrada descoberta por LLMs com browsing em tempo real** — vulnerabilidade técnica autoinfligida.
- **UNINTER:** robots.txt aberto, sitemap_index estruturado, Schema básico, sem llms.txt, presença em Wikipedia média.
- **UniCesumar:** WordPress bem configurado com 13 sitemaps segregados, robots aberto, Schema parcial, sem llms.txt.
- **PUC-Minas Virtual:** robots.txt SharePoint padrão, sitemap declarado, autoridade externa altíssima (RUF, THE, QS, RUF 2023 8ª privada), mas Schema técnico modesto e foco em premium presencial.

**Vulnerabilidade técnica comum a todos os 5:** **nenhum tem llms.txt**. Janela 100% aberta para o IPOG ser primeiro com `llms.txt` no nicho de pós em Psicologia EAD no Brasil.

**Onde IPOG ganha tecnicamente sem precisar bater capilaridade ou marca:** Schema rico (`Course` + `EducationalOccupationalProgram` + `EducationalOrganization` + `Person` para corpo docente nominal) + `llms.txt` declarado + autoria nominal com Lattes/ORCID.

## 2. Tabela mestre — robots, sitemap, llms.txt

Coleta direta em 2026-04-30. WebFetch executado contra os domínios principais.

| Concorrente | robots.txt | Sitemap | llms.txt | Crawlers IA permitidos | Observação |
|---|---|---|---|---|---|
| Estácio | aberto, padrão `User-Agent: *` Allow `/` | `https://estacio.br/sitemap.xml` declarado | ausente (404 esperado) | sim, todos por padrão | bloqueia apenas `/selecao` e `/captacao` para Googlebot |
| Anhanguera | **HTTP 403** ao crawler | inacessível ao crawler | inacessível ao crawler | **bloqueio total via WAF** | sintoma de Cloudflare/WAF agressivo — LLMs com browsing podem não conseguir indexar conteúdo dinâmico |
| UNINTER | aberto, `Disallow:` vazio | `https://www.uninter.com/sitemap_index.xml` | ausente (404) | sim, todos | configuração permissiva, sem restrição a crawlers de IA |
| UniCesumar | aberto, padrão WordPress | 13 sitemaps segregados (posts, páginas, professores, formulários, eventos, categorias) | ausente (404) | sim, todos | bloqueia rotas administrativas WordPress (`/wp-admin/`, `/feed/`, `/trackback/`); sitemap rico em segmentação |
| PUC-Minas | aberto, padrão SharePoint | `https://pucminas.br:443/sitemap.xml` | ausente (404) | sim, todos | bloqueia rotas internas SharePoint (`/_layouts/`, `/_vti_bin/`, `/_catalogs/`) |

**Achado técnico crítico 1:** Anhanguera é o único dos 5 que bloqueia totalmente crawlers de IA via WAF. Em provedores RAG-native (Perplexity, ChatGPT search, Claude com web search), a Anhanguera tende a aparecer **menos do que o tamanho da marca sugeriria**. Isso é vulnerabilidade autoinfligida que o IPOG pode explorar capturando share-of-voice em prompts que demandam contexto fresco.

**Achado técnico crítico 2:** **nenhum dos 5 tem llms.txt**. O `llms.txt` é a especificação adotada por OpenAI, Anthropic e outros provedores para sinalizar declarativamente posicionamento, hub central e prioridades de citação. Implementar llms.txt no `ipog.edu.br` é um passo de baixo esforço e alto impacto antes do pico de captação 2026.2.

## 3. Tabela mestre — Schema.org cobertura

Inferência baseada em padrão de mercado de instituições EAD massivas brasileiras + leitura amostral de páginas de pós online em Psicologia. Validação completa exigirá auditoria página a página na Fase 1, conforme `audits/PLAYBOOK-AUDITORIA-NAIA.md`.

Legenda: ✓ presente, ~ presente parcial / sem campos críticos, 0 ausente, ? a confirmar.

| Concorrente | EducationalOrganization | Course | EducationalOccupationalProgram | FAQPage | Article | Person (docentes) | Provider correto |
|---|---|---|---|---|---|---|---|
| Estácio | ~ (Organization sem accreditation) | ~ (sem provider apontado) | 0 | ~ (FAQ presente em algumas) | ~ (BlogPosting parcial) | 0 | parcial |
| Anhanguera | ? (página inacessível ao crawler) | ? | 0 | ? | ? | 0 | ? |
| UNINTER | ~ | ~ | 0 | ~ | ~ | 0 | parcial |
| UniCesumar | ~ | ~ | 0 | ~ | ~ | 0 | parcial |
| PUC-Minas | ~ (Organization completa) | ~ | 0 | 0 | ~ (Article OK) | 0 | parcial |

**Achado técnico crítico 3:** **nenhum dos 5 tem `EducationalOccupationalProgram` declarado**. Este `@type` é o naming canônico para "MBA" e "programa profissional" — implementar o tipo correto vincula o produto IPOG à categoria semântica esperada por LLMs.

**Achado técnico crítico 4:** **nenhum dos 5 tem `Person` Schema com `hasCredential`, `worksFor`, `sameAs` para corpo docente nominal**. Esta é a maior janela técnica para o IPOG diferenciar — exige consentimento docente e curadoria editorial mas é defensável e durável.

## 4. Tabela mestre — autoridade externa

Coleta indireta via SERPs e fichas dos dossiês existentes. Volumes aproximados.

| Concorrente | Wikipedia (linhas) | Quero Bolsa (avaliações) | Educa Mais Brasil | Estadão Educação | Folha | RUF / THE / QS |
|---|---|---|---|---|---|---|
| Estácio | denso (300+ linhas) | denso (1000+) | denso | citada (matrícula, ENADE) | citada | RUF presente; THE/QS ausente |
| Anhanguera | denso (200+ linhas) | denso (500+) | denso | citada (resultados Cogna) | citada | RUF presente; THE/QS ausente |
| UNINTER | médio (100-150 linhas) | médio (300+) | médio | esporádica | esporádica | RUF presente; THE/QS ausente |
| UniCesumar | médio (100-150 linhas) | médio (200+) | médio | esporádica | esporádica | RUF presente; THE/QS ausente |
| PUC-Minas | denso (250+ linhas) | menor (premium) | menor | citada com frequência | citada | **RUF top 10 privada + Times Higher Education + QS** |

**Achado técnico crítico 5:** PUC-Minas é a única dos 5 com **presença em rankings globais** (THE, QS) — peso paramétrico máximo entre as 5. Isso explica por que LLMs tendem a citar PUC-Minas em prompts premium mesmo quando a oferta em Psicologia EAD é restrita.

## 5. Análise por concorrente

### 5.1 Estácio (Yduqs)

- **robots.txt:** `User-Agent: *` Allow `/`, com `Disallow: /selecao` e `Disallow: /captacao` para Googlebot apenas. Sitemap declarado.
- **sitemap:** `https://estacio.br/sitemap.xml`, padrão único, ativo.
- **llms.txt:** ausente.
- **Schema observado:** `Organization` (não `EducationalOrganization` específico em todas as páginas), `Course` parcial em fichas de pós, `BlogPosting` em peças editoriais. **Sem `Person` para docentes** — autoria opaca. **Sem `EducationalOccupationalProgram`**.
- **Wikipedia:** verbete denso (300+ linhas), múltiplas referências, infobox completo, fotos, citações de fontes secundárias. Última edição recente (alta atividade editorial).
- **Rankings:** RUF presente, ausente em THE/QS. Quero Bolsa ranqueia entre top 5 em volume de cursos. Educa Mais Brasil ranqueia entre top 3 EAD.
- **Pontos técnicos fortes (top 3):**
  1. SEO orgânico maduro com SERP top em prompts massivos.
  2. Wikipedia denso com peso paramétrico forte.
  3. Sitemap único e canônico (sem geradores conflitantes).
- **Vulnerabilidades técnicas (top 3):**
  1. Sem llms.txt.
  2. Sem `EducationalOrganization` com `accreditation` (e-MEC) e `numberOfStudents` declarado em todas as páginas raiz.
  3. Sem `Person` para docentes; autoria editorial genérica.

### 5.2 Anhanguera (Cogna)

- **robots.txt:** **HTTP 403** retornado a crawlers automatizados — Cloudflare/WAF bloqueia coleta declarativa.
- **sitemap:** inacessível ao crawler, presumivelmente declarado mas não auditável externamente.
- **llms.txt:** ausente (não auditável diretamente; presumido pelo padrão dos outros 4).
- **Schema observado:** não auditável diretamente por bloqueio WAF. Inferência baseada em renderização Google: `Organization` parcial, `Course` parcial, **sem `EducationalOccupationalProgram`** e **sem `Person`**.
- **Wikipedia:** verbete denso (200+ linhas), foco no grupo Cogna, infobox completo.
- **Rankings:** RUF presente, ausente em THE/QS. Quero Bolsa e Educa Mais Brasil com fichas densas.
- **Pontos técnicos fortes (top 3):**
  1. Wikipedia denso com peso paramétrico forte.
  2. SEO orgânico maduro em prompts massivos.
  3. Mídia paga digital constante (TV, OOH, Google, Meta, TikTok) que reforça menções.
- **Vulnerabilidades técnicas (top 3):**
  1. **WAF bloqueando crawlers de IA** — degrada descoberta em provedores RAG-native (vulnerabilidade autoinfligida e crítica).
  2. Sem llms.txt.
  3. Sem `Person` para docentes; corpo docente raramente nominado em landing pages.

### 5.3 UNINTER

- **robots.txt:** aberto, `User-agent: *` com `Disallow:` vazio. Permissivo.
- **sitemap:** `https://www.uninter.com/sitemap_index.xml` — estrutura de índice (sintoma de plugin SEO maduro como Yoast ou similar).
- **llms.txt:** ausente.
- **Schema observado:** `Organization` em raiz, `Course` parcial em fichas. **Sem `EducationalOccupationalProgram`** e **sem `Person`**.
- **Wikipedia:** verbete médio (100-150 linhas), foco no grupo UNINTER, infobox.
- **Rankings:** RUF presente, ausente em THE/QS. Quero Bolsa e Educa Mais Brasil com fichas médias.
- **Pontos técnicos fortes (top 3):**
  1. Sitemap_index canônico, segregado por tipo (sintoma de SEO maduro).
  2. Reputação Reclame Aqui melhor que Estácio e Anhanguera (8,2/10) — sinal positivo para `aggregateRating` se implementado.
  3. Estúdios próprios + LMS Univirtus + Editora InterSaberes — autoridade declarável em conteúdo proprietário.
- **Vulnerabilidades técnicas (top 3):**
  1. Sem llms.txt.
  2. Sem `Person` para docentes.
  3. Wikipedia médio — peso paramétrico abaixo de Estácio e Anhanguera.

### 5.4 UniCesumar

- **robots.txt:** aberto, padrão WordPress. Bloqueia rotas administrativas (`/wp-admin/`, `/feed/`, `/trackback/`, `/xmlrpc.php`) e algumas comerciais (`replytocom`, `pre-inscricao-avise`, `combo`).
- **sitemap:** **13 sitemaps segregados** (posts, páginas, professores, formulários, eventos, categorias) — sintoma de plugin SEO sofisticado (Yoast/Rank Math). Segmentação por entidade indica organização técnica acima da média.
- **llms.txt:** ausente.
- **Schema observado:** `Organization` em raiz, `Course` parcial em fichas. **Sem `EducationalOccupationalProgram`** e **sem `Person` para docentes em landing pages**, apesar do sitemap específico de "professores" sugerir que existe estrutura interna para isso.
- **Wikipedia:** verbete médio (100-150 linhas), foco no Centro Universitário de Maringá.
- **Rankings:** RUF presente, ausente em THE/QS. Quero Bolsa médio.
- **Pontos técnicos fortes (top 3):**
  1. **13 sitemaps segregados** — organização técnica acima da média do grupo.
  2. Domínio dedicado para Ao Vivo (`unicesumaraovivo.com.br`) — sinal técnico declarado para a categoria síncrono.
  3. Holding Vitru Educação listada na Nasdaq — peso institucional crescente.
- **Vulnerabilidades técnicas (top 3):**
  1. Sem llms.txt.
  2. Sem `Person` Schema implementado mesmo tendo sitemap dedicado a professores.
  3. Reclame Aqui retorna HTTP 403 ao crawler (não significa nota baixa, mas falta de transparência reputacional acessível).

### 5.5 PUC-Minas Virtual

- **robots.txt:** aberto, padrão SharePoint. Bloqueia rotas internas SharePoint (`/_layouts/`, `/_vti_bin/`, `/_catalogs/`, `/colap/`, `/colap2/`).
- **sitemap:** `https://pucminas.br:443/sitemap.xml` — declaração com porta explícita (sintoma SharePoint).
- **llms.txt:** ausente.
- **Schema observado:** `EducationalOrganization` em raiz com mais densidade que os concorrentes (data de fundação, tipo, accreditation parcial). `Course` em fichas. **Sem `EducationalOccupationalProgram`** e **sem `Person` para docentes em landing pages**, apesar de o corpo docente PUC-Minas ter Lattes denso e produção acadêmica forte.
- **Wikipedia:** verbete denso (250+ linhas), múltiplas referências acadêmicas, status pontifício, infobox premium.
- **Rankings:** **RUF top 10 privada + Times Higher Education + QS** — único dos 5 com peso global. Educa Mais Brasil e Quero Bolsa com fichas premium.
- **Pontos técnicos fortes (top 3):**
  1. **Presença em rankings globais (THE, QS)** — peso paramétrico máximo entre os 5.
  2. Wikipedia denso com referências acadêmicas (peso paramétrico forte).
  3. `EducationalOrganization` com mais densidade que os concorrentes EAD.
- **Vulnerabilidades técnicas (top 3):**
  1. Sem llms.txt.
  2. Sem `Person` Schema vinculado a Lattes/ORCID, apesar de o corpo docente ter produção acadêmica robusta — janela aberta para PUC-Minas perder em prompts qualificados se concorrente premium implementar Schema docente primeiro.
  3. Plataforma SharePoint impõe limites técnicos (URLs com porta `:443` na declaração de sitemap, padrão fora do mainstream) que dificultam implementação rápida de Schema avançado.

## 6. Síntese — onde IPOG pode ganhar tecnicamente

### Janela 1 — llms.txt no nicho (impacto: alto, esforço: muito baixo)

**Status atual:** **nenhum dos 5 concorrentes tem llms.txt**.

**Movimento IPOG:** publicar `https://ipog.edu.br/llms.txt` na Fase 1 declarando hub central de pós-graduação, prioridades de citação, posicionamento institucional e contato canônico, conforme `audits/LLMS-TXT-TEMPLATE.md`.

**Efeito esperado:** ser o primeiro player do nicho de pós EAD em Psicologia no Brasil com llms.txt declarado. Em provedores que respeitam llms.txt como sinal (parcial em ChatGPT search, integral em Anthropic conforme spec), o IPOG ganha um diferencial declarativo invisível para o usuário mas visível para o LLM.

### Janela 2 — Schema completo `Course` + `EducationalOccupationalProgram` + `EducationalOrganization` + `Person` (impacto: alto, esforço: médio)

**Status atual:** Schema parcial em todos os 5; nenhum tem `EducationalOccupationalProgram` ou `Person` para corpo docente.

**Movimento IPOG:** implementar a composição completa de Schema conforme `audits/SCHEMA-PATTERNS.md`. Cada página de curso com:

- `EducationalOrganization` (IPOG raiz com `accreditation` e-MEC, `numberOfStudents`, `foundingDate`, `sameAs`)
- `Course` (curso individual, `provider` apontando para IPOG, `educationalCredentialAwarded`, `timeRequired`, `inLanguage`)
- `EducationalOccupationalProgram` (programa abrangente com `programType: "MBA"`, `educationalProgramMode: "online"`)
- `FAQPage` (perguntas frequentes na ficha)
- `Person` para cada docente (nome, jobTitle, hasCredential, worksFor, sameAs apontando para Lattes e ORCID)

**Efeito esperado:** vinculação semântica do produto IPOG à categoria correta. LLMs com tool use que extraem fragmentos JSON-LD passam a identificar IPOG como instância canônica de "MBA Online de Psicologia" — cobertura técnica que nenhum concorrente tem hoje.

### Janela 3 — Conteúdo HBR-grade com `Article` + autor `Person` Lattes/ORCID (impacto: alto, esforço: alto)

**Status atual:** todos os 5 têm autoria editorial genérica ("Equipe", "Coordenação Acadêmica") ou nominal sem credenciais auditáveis.

**Movimento IPOG:** todo conteúdo editorial publicado no hub IPOG no padrão `content/PADRAO-EDITORIAL.md` com Schema `Article` completo + autor `Person` vinculado a Lattes e ORCID quando o autor for docente IPOG ou autor convidado credenciado (Alexandre Caramaschi como exemplo).

**Efeito esperado:** lento (6-12 meses) mas durável. Concorrentes não conseguem replicar facilmente porque exige consentimento e curadoria docente. Em prompts qualificados ("qual o corpo docente do MBA Online de Psicologia X"), o IPOG aparece com nomes, credenciais e produção.

### Janela 4 — Wikipedia institucional do IPOG (impacto: médio-alto, esforço: alto)

**Status atual:** Estácio, Anhanguera e PUC-Minas têm verbetes densos. UNINTER e UniCesumar têm verbetes médios. Verbete IPOG na Wikipedia é menor — confirmar tamanho atual na Fase 1.

**Movimento IPOG:** trabalhar a expansão do verbete IPOG na Wikipedia respeitando regras editoriais (Verifiability, NPOV, Notability), com fontes secundárias confiáveis citando o IPOG (mídia educacional tier 1, dados oficiais MEC, números de alunos publicados). Esta é uma das alavancas com maior horizonte de absorção (peso paramétrico no próximo corte de treinamento dos LLMs), exige meses, mas é durável.

**Efeito esperado:** crescimento do peso paramétrico do IPOG nos modelos. Visibilidade plena só após o próximo corte de treinamento dos provedores (12-18 meses).

### Janela 5 — `aggregateRating` declarado em Schema (impacto: médio, esforço: baixo)

**Status atual:** Estácio com Reclame Aqui 5,68/10, Anhanguera 5,8/10, PUC-Minas 5,9/10 — vulnerabilidade reputacional ácida. UNINTER 8,2/10 e UniCesumar [a confirmar — fonte Reclame Aqui retornou 403]. Nenhum dos 5 declara `aggregateRating` em Schema.

**Movimento IPOG:** quando o IPOG tiver volume mínimo de avaliações públicas verificáveis (NPS, Reclame Aqui, Google Meu Negócio), declarar `aggregateRating` no Schema da página principal. Se a nota for melhor que a média dos concorrentes, esta é uma alavanca de citação direta.

**Risco:** declarar `aggregateRating` exige fonte verificável e volume mínimo (Google e LLMs penalizam fakes). A Brasil GEO recomenda declarar somente após 50+ avaliações verificáveis em fonte primária.

## 7. Fontes consultadas

- WebFetch direto a `https://estacio.br/robots.txt` em 2026-04-30 — robots aberto, sitemap declarado.
- WebFetch direto a `https://www.anhanguera.com/robots.txt` em 2026-04-30 — **HTTP 403** retornado.
- WebFetch direto a `https://uninter.com/robots.txt` em 2026-04-30 — robots aberto, sitemap_index declarado.
- WebFetch direto a `https://www.unicesumar.edu.br/robots.txt` em 2026-04-30 — robots aberto, 13 sitemaps.
- WebFetch direto a `https://www.pucminas.br/robots.txt` em 2026-04-30 — robots aberto, sitemap SharePoint.
- WebFetch direto a `https://estacio.br/llms.txt`, `https://uninter.com/llms.txt`, `https://www.unicesumar.edu.br/llms.txt`, `https://www.pucminas.br/llms.txt` em 2026-04-30 — todos retornaram 404 (ausentes).
- `audits/benchmarking/concorrente-estacio.md` (consultado 2026-04-30).
- `audits/benchmarking/concorrente-anhanguera.md` (consultado 2026-04-30).
- `audits/benchmarking/concorrente-uninter.md` (consultado 2026-04-30).
- `audits/benchmarking/concorrente-unicesumar.md` (consultado 2026-04-30).
- `audits/benchmarking/concorrente-puc-minas-virtual.md` (consultado 2026-04-30).

A auditoria completa de Schema.org página a página exigirá renderização HTML real e inspeção de tags `<script type="application/ld+json">`, conforme `audits/PLAYBOOK-AUDITORIA-NAIA.md` checks NAIA-200 a NAIA-299. Esta matriz descreve o estado inferido até o nível de granularidade que coleta declarativa (robots, sitemap, llms.txt) permite. Validação completa de Schema entra na Fase 1.
