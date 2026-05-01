# Matriz Técnica — Schema, llms.txt, SEO e Autoridade Externa dos Concorrentes

> **Status:** vigente desde 2026-04-30 (Onda 1) e estendida em 2026-05-01 (Onda 2)
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-05-01
> **Cobertura:** as seções 1-6 cobrem os 5 concorrentes massivos da Onda 1 (Estácio, Anhanguera, UNINTER, UniCesumar, PUC-Minas Virtual). A seção 8 estende a análise técnica aos 5 concorrentes da Onda 2 (CETCC, IBNeuro, Sírio-Libanês IEP/FSL, wPós/Anhembi, Saint Paul/EXAME), com fetches diretos executados em 2026-05-01.

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

## 8. Onda 2 — extensão técnica (especialistas verticais e premium executiva)

A Onda 2 estende a auditoria técnica aos 5 concorrentes adicionados em 2026-05-01 (CETCC, IBNeuro, Sírio-Libanês IEP/FSL, wPós/Anhembi, Saint Paul/EXAME). Os fetches diretos foram executados em 2026-05-01 com validação cruzada via WebSearch.

### 8.1 Tabela mestre — robots, sitemap, llms.txt (Onda 2)

Coleta direta em 2026-05-01.

| Concorrente | robots.txt | Sitemap | llms.txt | Crawlers IA permitidos | Observação |
|---|---|---|---|---|---|
| CETCC | aberto, `User-agent: * Disallow:` vazio | não declarado em robots; sitemap implícito por subdomínios | ausente (404) | sim, todos | múltiplos subdomínios temáticos (`tccinfantil.cetcc.com.br`, `esquema.cetcc.com.br`, etc.) — sintoma de SEO long-tail por nicho clínico |
| IBNeuro | aberto, padrão Shopify | gerado por Shopify (`/sitemap.xml`) | ausente (404) | sim, todos os AI crawlers; restrições apenas a Nutch, AhrefsBot, MJ12bot, Pinterest | "Checkouts are for humans" como política Shopify; checkout flows e admin bloqueados |
| Sírio-Libanês FSL | **HTTP 403** ao crawler | inacessível ao crawler | inacessível ao crawler | **bloqueio total via WAF** | Cloudflare/WAF agressivo idêntico à Anhanguera — segundo grande player com vulnerabilidade autoinfligida em provedores RAG-native |
| wPós/Faculdade Unyleya | aberto, `User-agent: * Disallow:` vazio | `https://wpos.com.br/sitemap.xml` declarado | ausente (404) | sim, todos | configuração permissiva sem restrição a crawlers de IA |
| Anhembi Morumbi | aberto, `User-agent: * Disallow: /busca/` | `https://portal.anhembi.br/sitemap.xml` + sitemap blog declarado | ausente (404) | sim, todos | bloqueia apenas rota de busca interna; sitemap_index estruturado |
| Saint Paul + EXAME | aberto, `User-Agent: * Allow: / Disallow: /api/` | `https://www.saintpaul.com.br/sitemap.xml` declarado | ausente (404) | sim, todos | bloqueia apenas API; URLs `/curso/pos-graduacao-saint-paul` e `/curso/mba-executivo-saint-paul` retornando 404 pós-aquisição EXAME |

**Achado técnico crítico Onda 2 — A:** **Sírio-Libanês FSL é o segundo grande player a bloquear crawlers de IA via WAF**, replicando o padrão da Anhanguera. Em provedores RAG-native (Perplexity, ChatGPT search, Claude com web search), Sírio-Libanês deve aparecer **menos do que a marca sugeriria** em prompts hospitalares qualificados — vulnerabilidade autoinfligida e crítica do líder absoluto em Psicologia Hospitalar.

**Achado técnico crítico Onda 2 — B:** **Nenhum dos 5 da Onda 2 tem llms.txt**. Combinado com a Onda 1, isso significa que **100% dos 10 concorrentes mapeados estão sem llms.txt**. Janela 100% aberta para o IPOG ser primeiro player no nicho de pós em Psicologia no Brasil com `llms.txt` declarado.

**Achado técnico crítico Onda 2 — C:** **Saint Paul/EXAME tem URLs canônicas em 404 pós-aquisição EXAME** (`/curso/pos-graduacao-saint-paul`, `/curso/mba-executivo-saint-paul`). A reorganização editorial pós-aquisição em dezembro/2024 ainda não estabilizou — abre janela técnica curta para o IPOG capturar SERP em prompts MBA executivos enquanto a arquitetura web Saint Paul não consolida.

### 8.2 Tabela mestre — Schema.org cobertura (Onda 2)

Inferência baseada em padrão de mercado + leitura amostral de páginas. Validação completa exigirá auditoria página a página na Fase 1.

Legenda: ✓ presente, ~ presente parcial / sem campos críticos, 0 ausente, ? a confirmar.

| Concorrente | EducationalOrganization | Course | EducationalOccupationalProgram | FAQPage | Article | Person (docentes) | Provider correto |
|---|---|---|---|---|---|---|---|
| CETCC | ~ | ~ (Course parcial em fichas) | 0 | 0 | ~ (BlogPosting parcial) | 0 | parcial |
| IBNeuro | ~ (Shopify Organization) | ~ (Shopify Product, não Course canônico) | 0 | ~ (FAQ via help-center) | ~ (BlogPosting Shopify blogs) | 0 | parcial — Shopify Product no lugar de Course |
| Sírio-Libanês FSL | ? (página inacessível ao crawler) | ? | 0 | ? | ? | ? | ? |
| wPós/Faculdade Unyleya | ~ | ~ (Course parcial) | 0 | ~ | ~ | 0 | parcial |
| Anhembi Morumbi | ~ (Organization sólida) | ~ (Course parcial em fichas Ulife) | 0 | ~ | ~ (Article OK em blog) | 0 | parcial |
| Saint Paul + EXAME | ~ | ~ | 0 | ~ | ~ (Article OK em exame.com) | 0 | parcial — fragmentação em LIT |

**Achado técnico crítico Onda 2 — D:** **Nenhum dos 5 da Onda 2 tem `EducationalOccupationalProgram` declarado**. Combinado com a Onda 1, **100% dos 10 concorrentes mapeados estão sem o tipo canônico para "MBA"/"programa profissional"**. Vincular o produto IPOG ao `EducationalOccupationalProgram` com `programType: "MBA"` é decisão técnica defensável e durável.

**Achado técnico crítico Onda 2 — E:** **Nenhum dos 5 da Onda 2 tem `Person` Schema com `hasCredential`/`worksFor`/`sameAs` para corpo docente nominal**. Mesmo IBNeuro (que lista nominalmente 17 docentes com 10 PhD) e Sírio-Libanês (com 25 docentes em prática hospitalar) não declaram Schema docente. Janela mais durável para o IPOG capturar — exige consentimento docente mas é praticamente irreplicável a curto prazo.

**Achado técnico crítico Onda 2 — F:** **IBNeuro usa Shopify Product Schema no lugar de Course Schema**. O catálogo é vendido como produto e-commerce (`/products/`, `/collections/`), o que é tecnicamente incorreto para o tipo educacional. LLMs com tool use que extraem JSON-LD não identificam IBNeuro como instância canônica de "curso de pós-graduação" — vulnerabilidade que o IPOG não compartilha.

### 8.3 Tabela mestre — autoridade externa (Onda 2)

Coleta indireta via SERPs e fichas dos dossiês existentes. Volumes aproximados em 2026-05-01.

| Concorrente | Wikipedia (linhas) | Quero Bolsa | Educa Mais Brasil | Mídia tier 1 | Rankings |
|---|---|---|---|---|---|
| CETCC | **ausente** (sem verbete) | médio (1 avaliação 5,0/5,0) | médio | pontual em portais Psi (PUC-RS Online) | sem ranking |
| IBNeuro | **ausente** (sem verbete) | a confirmar | a confirmar | citações pontuais via produção do fundador (Hogrefe MMSE-2) | sem ranking |
| Sírio-Libanês (Hospital) | **denso (200+ linhas, infobox completo)** | médio | médio | **alta**: FAPESP, Anahp, CFM, Conasems, Coren, Pravaler | **JCI top 100 Newsweek (rank global mundial em saúde)** |
| wPós/Faculdade Unyleya | **ausente** (sem verbete) | denso (cobertura ampla) | denso | baixa em mídia generalista; presença em fóruns EAD | sem ranking universitário |
| Anhembi Morumbi | **denso (verbete sólido pt + en wikipedia)** | denso (bolsas até 80%) | denso | **alta**: Exame, Valor, Bloomberg Línea, Visno Invest (cobertura mensal de ANIM3) | RUF 2024 #114; IGC 4 MEC; ex-Laureate; University Guru 4 rankings |
| Saint Paul + EXAME | **ausente para Saint Paul** (sem verbete ativo) | médio (49 programas, rating 4,3/5) | médio | **alta**: Bloomberg Línea, NeoFeed, Brazil Journal, Meio & Mensagem, Exame (cativa); FT Executive Education 5x | Top of Mind RH 11 anos; América Economia 6x top MBA LatAm; FT 5x; ENADE 5 (2015, 2018, 2022) |

**Achado técnico crítico Onda 2 — G:** **5 dos 6 concorrentes da Onda 2 não têm Wikipedia institucional** (CETCC, IBNeuro, Faculdade Unyleya, Saint Paul). Apenas Hospital Sírio-Libanês e Universidade Anhembi Morumbi têm verbetes densos. Para LLMs que dependem de Wikipedia como fonte canônica em prompts de descoberta institucional, a metade da Onda 2 está em desvantagem paramétrica permanente — e o IPOG, ao trabalhar expansão do verbete IPOG na Wikipedia (com fontes secundárias confiáveis), captura uma das alavancas mais duráveis.

**Achado técnico crítico Onda 2 — H:** **Anhembi/Ânima e Saint Paul/EXAME têm cobertura editorial contínua em mídia tier 1** (Exame, Valor, Bloomberg Línea, Brazil Journal). Em pesos paramétricos do próximo corte de treinamento dos LLMs, ambos vão crescer em peso. O IPOG precisa **acelerar o trabalho de PR e cobertura editorial** com mídia educacional brasileira (Estadão Educação, Folha, Quero Bolsa, Educa Mais Brasil) para não ficar para trás.

**Achado técnico crítico Onda 2 — I:** **Saint Paul tem peso único entre os 10 concorrentes em rankings globais executivos** (Financial Times Executive Education 5x, América Economia 6x). É o único da Onda 2 (e o único do universo Onda 1 + Onda 2) com selo internacional ativo no cluster MBA executivo. Não disputável no horizonte do programa GEO IPOG; a estratégia é **especificar Psicologia em cada conteúdo** para não competir em terreno generalista de liderança onde Saint Paul vence.

### 8.4 Análise técnica por concorrente Onda 2

#### 8.4.1 CETCC

- **robots.txt:** aberto (`User-agent: * Disallow:` vazio); permite todos os crawlers de IA.
- **sitemap:** não declarado em robots; sitemap implícito por subdomínios temáticos.
- **llms.txt:** ausente.
- **Schema observado:** `Organization` em raiz; `BlogPosting` em peças editoriais; `Course` parcial nas fichas. **Sem `Person` para docentes** apesar do corpo docente nominal (Eliana Melcher Martins, etc.). **Sem `EducationalOccupationalProgram`**.
- **Wikipedia:** **ausente**.
- **Pontos técnicos fortes (top 3):**
  1. SEO long-tail via subdomínios temáticos (`tccinfantil`, `esquema`, `terapiascontextuais`, `reabilitacaocognitiva`).
  2. Domínio antigo (24 anos de operação contínua desde 2002).
  3. Robots aberto + reputação Reclame Aqui silenciosa (positivo).
- **Vulnerabilidades técnicas (top 3):**
  1. Sem llms.txt.
  2. Sem Wikipedia institucional — gap crítico de autoridade enciclopédica.
  3. Sem `Person` Schema apesar do corpo docente nominal e CRP ativo.

#### 8.4.2 IBNeuro

- **robots.txt:** aberto Shopify; bloqueia apenas Nutch, AhrefsBot, MJ12bot, Pinterest e rotas de checkout/admin.
- **sitemap:** gerado por Shopify (`/sitemap.xml`).
- **llms.txt:** ausente.
- **Schema observado:** **Shopify Product no lugar de Course canônico** — o catálogo de cursos é vendido como produto e-commerce (`/products/`, `/collections/`). `Organization` parcial. `FAQ` via help-center. **Sem `Person` para docentes** apesar de listar 17 nominais (10 PhD). **Sem `EducationalOccupationalProgram`**.
- **Wikipedia:** **ausente**.
- **Pontos técnicos fortes (top 3):**
  1. Domínio antigo (registrado em 2006).
  2. Multi-canal social (LinkedIn, Instagram, YouTube, Facebook, X, Spotify podcast).
  3. SEO orgânico forte para "neuropsicologia + Brasília + curso clínica".
- **Vulnerabilidades técnicas (top 3):**
  1. **Shopify Product Schema no lugar de Course/EducationalOccupationalProgram** — LLMs não identificam como pós-graduação canônica.
  2. Sem llms.txt + sem Wikipedia.
  3. Múltiplos domínios (`ibneuro.com.br`, `ibneuro.org`, `cursos.ibneuro.org`, `ead.ibneuro.online`, `hml.ibneuro.org`) com fragmentação técnica (dois com ECONNREFUSED em 2026-05-01).

#### 8.4.3 Sírio-Libanês IEP/FSL

- **robots.txt:** **HTTP 403** retornado a crawlers automatizados — Cloudflare/WAF bloqueia coleta declarativa, idêntico padrão da Anhanguera.
- **sitemap:** inacessível ao crawler.
- **llms.txt:** inacessível ao crawler (presumido ausente pelo padrão dos outros).
- **Schema observado:** não auditável diretamente por bloqueio WAF. Inferência: `Organization` parcial, `Course` parcial, **sem `EducationalOccupationalProgram`** e **sem `Person`** apesar dos 25 docentes em prática hospitalar diária.
- **Wikipedia:** **denso (200+ linhas para Hospital Sírio-Libanês)** com infobox premium.
- **Pontos técnicos fortes (top 3):**
  1. **Wikipedia denso** com peso paramétrico forte (verbete robusto Hospital Sírio-Libanês).
  2. Cobertura editorial premium contínua (FAPESP, Anahp, CFM, Conasems, Coren).
  3. **Acreditação JCI** (única top 100 Newsweek mundial entre os 10 concorrentes).
- **Vulnerabilidades técnicas (top 3):**
  1. **WAF bloqueando crawlers de IA** — degrada descoberta em provedores RAG-native (vulnerabilidade autoinfligida e crítica, equivalente à Anhanguera).
  2. **Multiplicidade de domínios fragmentando funil** — `iep.hospitalsiriolibanes.org.br`, `faculdadesiriolibanes.org.br`, `digital.faculdadesiriolibanes.org.br`, `eadsiriolibanes.org.br`, `pesquisa.iephsl.org.br`, `oncologiasiriolibanes.com.br`. Redirecionamentos 302 quebrando equity SEO de páginas profundas.
  3. Sem llms.txt + sem `Person` Schema apesar do corpo docente Lattes-denso.

#### 8.4.4 wPós / Faculdade Unyleya

- **robots.txt:** aberto, `User-agent: * Disallow:` vazio. Sitemap declarado.
- **sitemap:** `https://wpos.com.br/sitemap.xml`.
- **llms.txt:** ausente.
- **Schema observado:** `Organization` em raiz; `Course` parcial. **Sem `EducationalOccupationalProgram`** e **sem `Person`** (corpo docente discursivamente "professores renomados" sem nominalização pública).
- **Wikipedia:** **ausente** para wPós e Faculdade Unyleya.
- **Pontos técnicos fortes (top 3):**
  1. Volume de catálogo (164 cursos Psi declarados) — saturação SEO long-tail.
  2. Robots aberto + sitemap declarado + plataforma EAD madura (app proprietário).
  3. Selos exibidos (MEC, ABED, ABMES) — presença declarativa.
- **Vulnerabilidades técnicas (top 3):**
  1. **Sem Wikipedia + sem cobertura imprensa relevante** — peso paramétrico fraco.
  2. **Opacidade de preço** ("Faixa 1 a 5+") — gera fricção em comparadores e LLM (modelo não consegue citar mensalidade).
  3. Multi-domínio (`wpos.com.br`, `unyleya.edu.br`, `cdn-static-mkt.unyleya.com.br`, `portalaluno.unyleya.edu.br`) — fragmentação de equity.

#### 8.4.5 Universidade Anhembi Morumbi (Ânima Educação)

- **robots.txt:** aberto, `User-agent: * Disallow: /busca/ Allow: /`. Sitemap_index + sitemap blog declarados.
- **sitemap:** `https://portal.anhembi.br/sitemap.xml` + `https://portal.anhembi.br/blog/index-sitemap.xml`.
- **llms.txt:** ausente.
- **Schema observado:** `Organization` em raiz com mais densidade que os concorrentes Onda 2; `Course` parcial em fichas Ulife. **Sem `EducationalOccupationalProgram` mesmo no MBA Psi Org. anchor**. **Sem `Person` Schema**, apesar do corpo docente declarado (parcerias HSM/BSP).
- **Wikipedia:** **denso (verbete sólido pt + en wikipedia)** com histórico, marcos, fundadores, aquisições.
- **Pontos técnicos fortes (top 3):**
  1. **Wikipedia denso pt + en + cobertura editorial contínua** (Exame, Valor, Bloomberg Línea, Visno Invest, Acionista) — peso paramétrico forte e crescente.
  2. Plataforma Ulife madura (backbone Ânima compartilhado em 371 mil alunos do grupo).
  3. RUF #114 + IGC 4 + integração Quero Bolsa/EMB — presença em comparadores.
- **Vulnerabilidades técnicas (top 3):**
  1. **MBA em Psicologia Organizacional sem `Person` Schema nem `EducationalOccupationalProgram`** — tipo errado para o produto-âncora.
  2. **5+ domínios concorrentes** (`portal.anhembi.br`, `pos.anhembi.br`, `eadanhembi.com.br`, `landing.anhembi.br`, `estudeanhembimorumbi.com.br`) — fragmentação técnica explorável.
  3. Reclame Aqui Regular (6,8/10) com queixas estruturais "EAD defasado" — `aggregateRating` indeclarável sem reforma operacional.

#### 8.4.6 Saint Paul + EXAME Educação

- **robots.txt:** aberto, `User-Agent: * Allow: / Disallow: /api/`. Sitemap declarado.
- **sitemap:** `https://www.saintpaul.com.br/sitemap.xml`.
- **llms.txt:** ausente.
- **Schema observado:** `Organization` parcial; `Course` parcial em fichas. **Sem `EducationalOccupationalProgram`** mesmo no MBA Liderança e Gestão. **Sem `Person`** apesar de 500+ professores declarados após combinação EXAME. **Article** sólido em peças editoriais via exame.com.
- **Wikipedia:** **ausente para Saint Paul Escola de Negócios** em pt e en wikipedia (verificação 2026-05-01).
- **Pontos técnicos fortes (top 3):**
  1. **Funil editorial EXAME (20M usuários únicos/mês)** — autoridade de domínio `exame.com` consolidada e amplificada para `exame.com/faculdade`.
  2. **Selos internacionais únicos no universo Onda 1+2** — Financial Times Executive Education 5x, América Economia 6x top MBA LatAm, Top of Mind RH 11 anos.
  3. **Plataforma LIT proprietária** com IBM Watson + patentes Brasil/EUA + 300+ cursos + 20.000 horas.
- **Vulnerabilidades técnicas (top 3):**
  1. **URLs canônicas em 404 pós-aquisição EXAME** — `/curso/pos-graduacao-saint-paul`, `/curso/mba-executivo-saint-paul`, `/cursos/mba-executivo/mba-executivo-internacional-em-lideranca-e-gestao/`. Janela técnica curta para IPOG capturar SERP enquanto reorganização não estabiliza.
  2. **Sem Wikipedia ativa** + sem `Person` Schema + sem `EducationalOccupationalProgram`.
  3. **5+ domínios concorrentes** (`saintpaul.com.br`, `cursos.saintpaul.com.br`, `m.saintpaul.com.br`, `lit.com.br`, `lps.exame.com`, `exame.com/faculdade`) — fragmentação severa pós-aquisição.

### 8.5 Síntese — janelas técnicas adicionais e janelas reforçadas pela Onda 2

A Onda 2 confirma 4 das 5 janelas da seção 6 e adiciona 4 janelas novas ou recalibradas:

#### Janelas confirmadas (Onda 1 → Onda 2)

- **Janela 1 (llms.txt):** confirmada e ampliada — **100% dos 10 concorrentes (Onda 1 + Onda 2) estão sem llms.txt**. IPOG continua com janela 100% aberta.
- **Janela 2 (Schema completo):** confirmada e ampliada — **100% dos 10 concorrentes estão sem `EducationalOccupationalProgram` e sem `Person` Schema com Lattes/ORCID**. Janela mais durável e defensável.
- **Janela 3 (Conteúdo HBR + Article):** confirmada — Saint Paul tem `Article` forte via exame.com, mas sem `Person` Schema vinculado a Lattes; Anhembi tem Article OK em blog mas sem autor nominal vinculado. IPOG pode capturar tanto via autoria assinada (Alexandre Caramaschi) quanto via Schema completo.
- **Janela 4 (Wikipedia):** **recalibrada** — verbete IPOG continua a ser construído, mas agora se enfrenta com Wikipedia denso de **Hospital Sírio-Libanês e Universidade Anhembi Morumbi** (não apenas dos 5 da Onda 1). Trabalho de expansão é mais urgente do que parecia na Onda 1.

#### Janelas adicionais (Onda 2)

#### Janela 6 — Sírio-Libanês com WAF amplia bloqueio RAG-native (impacto: médio, esforço: muito baixo)

**Status:** confirmado WAF bloqueando crawlers em `faculdadesiriolibanes.org.br/robots.txt` (HTTP 403). Segundo grande player com vulnerabilidade autoinfligida.

**Movimento IPOG:** manter `robots.txt` aberto a GPTBot/ClaudeBot/PerplexityBot e capturar share-of-voice em provedores RAG-native em prompts hospitalares qualificados, **se** o IPOG decidir entrar na vertical (não recomendado como prioridade da Onda 1, mas mencionar Psicologia Hospitalar como módulo dentro do produto amplo é estratégia de baixo custo e capturável).

#### Janela 7 — Saint Paul/EXAME tem URLs canônicas em 404 pós-aquisição (impacto: médio, esforço: baixo)

**Status:** confirmado em 2026-05-01 — URLs `/curso/pos-graduacao-saint-paul`, `/curso/mba-executivo-saint-paul` retornam 404. Reorganização editorial pós-aquisição EXAME (dezembro/2024) ainda em andamento.

**Movimento IPOG:** publicar conteúdo HBR-grade ranqueando para "MBA executivo online em Psicologia Organizacional" enquanto a arquitetura web Saint Paul não estabiliza. Janela curta — provavelmente 3-6 meses até consolidação.

#### Janela 8 — IBNeuro usa Shopify Product Schema no lugar de Course (impacto: alto em prompts qualificados de Neuropsicologia, esforço: médio)

**Status:** confirmado em 2026-05-01 — IBNeuro vende cursos como `/products/` e `/collections/` Shopify, sem Course Schema canônico. LLMs com tool use que extraem JSON-LD não identificam IBNeuro como instância canônica de "curso de pós-graduação online" — apenas como "produto à venda".

**Movimento IPOG:** implementar Schema completo de pós-graduação no produto IPOG e em conteúdo HBR-grade sobre Neuropsicologia, capturando prompts qualificados onde LLMs busquem "curso reconhecido pelo MEC" — o IBNeuro é certificado via parceria com Faculdade Santa Fé mas o Schema técnico não reflete isso.

#### Janela 9 — Fragmentação de domínios é vulnerabilidade comum entre os 10 (impacto: médio, esforço: baixo)

**Status:** confirmado em 2026-05-01 que **5+ dos 10 concorrentes operam fragmentação severa de domínios** (Sírio-Libanês com 7+, IBNeuro com 5+, Anhembi com 5+, Saint Paul com 5+, Unyleya com 4+). LLMs preferem hubs canônicos com sinais consolidados.

**Movimento IPOG:** declarar `ipog.edu.br` como hub canônico no `llms.txt` + manter um único domínio canônico para o MBA Online de Psicologia + Schema completo apontando para esse hub + redirecionamentos limpos para subprodutos. IPOG pode ganhar simplesmente por **não fragmentar**.

### 8.6 Confirmações técnicas Onda 2 para a Fase 1

- Auditoria Schema.org página-a-página dos 5 da Onda 2 (NAIA-200 a NAIA-299) — substituir os "~" desta tabela por dado coletado.
- Confirmar via fetch dedicado se Sírio-Libanês FSL bloqueia crawlers de IA específicos por User-Agent (GPTBot, ClaudeBot, PerplexityBot, etc.) ou apenas WAF generalista.
- Validar tamanho atual do verbete Wikipedia IPOG vs. Anhembi Morumbi e Hospital Sírio-Libanês — definir baseline para o plano de expansão.
- Confirmar status atual dos cursos Saint Paul/EXAME após reorganização (recheck mensal das URLs em 404).
- Mapear quais subdomínios IBNeuro têm Schema diferente (`cursos.ibneuro.org` vs. `ibneuro.com.br`) — Shopify limita estrutura.
- Coletar dado real de citações cross-LLM nos 15 prompts × 6 LLMs canônicos para todos os 10 concorrentes (Onda 1 + Onda 2 integradas).
