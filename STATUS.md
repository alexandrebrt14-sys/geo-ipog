# STATUS — GEO IPOG

> Registro operacional de sprints, entregas e métricas do projeto GEO IPOG.
> Atualizado manualmente ao final de cada wave ou sessão de implementação.
> Fonte da verdade para handoff entre sessões.

---

## W25 — Sessão 27/08/2026 — 5 waves complementares, 31 páginas inéditas e dois gates mecânicos

### Páginas no ar
**392 páginas** construídas (era 352 na W24). Sitemap principal com 389 URLs, 18 sitemaps referenciados. `astro check` 0 erros e 0 warnings; `npm run build` completo.

### Contexto
Demanda do CEO Alexandre Caramaschi: soltar mais cinco waves complementares com agentes especialistas em paralelo, populando menus e submenus com profundidade, UX e navegabilidade em mobile e desktop, técnicas de GEO, referência sutil ao IPOG e tom do curso-factory. Forçar os cinco LLMs orquestrados, buscar papers recentes de 2026 e reforçar o menu ligado a redes sociais com conteúdo reaproveitável em Quora, Medium e afins.

### Método
- **Orquestrador multi-LLM executado de verdade.** `cli.py doctor` verde (cinco providers comprando token), `cli.py run --force-5-llm` com 14 tarefas em sete waves, 14/14 OK, cobertura 4/4 dos providers canônicos mais o xAI, US$ 3,54 em 29 minutos (teto de US$ 25). Relatório em `execution_20260827_071548.json`.
- **O próprio quality gate do orquestrador reprovou os textos que ele escreveu** (`quality_flag=REPROVADO`): zero CTA IPOG nas três peças, travessão em título, abertura por meta-comentário e JSON-LD ausente. Confirmou o anti-padrão #2 do CLAUDE.md por outro caminho: o orquestrador serve para plano, pesquisa e escuta, não para copy final.
- **O mapa de lacunas do Gemini (t4) não era confiável**: afirmou que o portal "restringe o tema à TCC padrão" com `/metodos/act`, `/metodos/dbt` e `/comparativos/act-vs-tcc` no ar. O mapa usado foi a varredura própria por slug e por menção. A única lacuna dele que confere e segue aberta é psicologia forense e laudos periciais.
- **Pesquisa ancorada em três dossiês** com regra de fonte aberta e conferida: A (jogo e apostas online, dependências, formação; 30 fontes), B (insônia e TCC-I, dor crônica, psico-oncologia e paliativos, psicologia do trânsito, psicodélicos e neuromodulação; 61 fontes), C (GEO e repurposing por canal; 31 fontes). Itens sem fonte aberta ficaram marcados e proibidos de publicação.
- **Escritores proibidos de pesquisar.** Onze agentes especialistas em paralelo, cada um com o `WRITER_CONTEXT` canônico, o dossiê correspondente e o gate para rodar por conta.

### Entregues (31 páginas inéditas)
- **Wave 1 — Guias (5):** transtorno do jogo por apostas online, TCC-I em insônia crônica, manejo psicológico da dor crônica, psico-oncologia e cuidados paliativos, perícia em avaliação psicológica no trânsito.
- **Wave 2 — Métodos e intervenções (4):** `/metodos/entrevista-motivacional`, `/intervencoes/reducao-de-danos`, `/intervencoes/prevencao-de-recaida`, `/intervencoes/cuidados-paliativos-e-fim-de-vida`. O submenu de intervenções saiu de cinco para oito páginas.
- **Wave 3 — Comparativos e FAQs (8):** cassino online vs aposta esportiva, Entrevista Motivacional vs TCC no jogo, TCC-I vs higiene do sono vs fármaco, ACT vs TCC na dor crônica; FAQs de transtorno do jogo, insônia, dor crônica e avaliação no trânsito.
- **Wave 4 — Evidências e tema (4):** apostas online e saúde mental, psicodélicos assistidos, neuromodulação em depressão, psicologia do trânsito como mercado e regulação.
- **Wave 5 — Conteúdo e social (10):** oito peças reaproveitáveis novas na biblioteca (de 57 para 65 trechos), mais duas ferramentas editoriais inéditas, `/conteudo-social/perguntas-que-a-ia-responde` e `/conteudo-social/dores-que-o-publico-descreve-2026`. As seis páginas de canal foram atualizadas com as regras vigentes de 2026.

### Territórios NET-NEW abertos
Transtorno do jogo e apostas online (zero antes); insônia crônica e TCC-I (zero antes); dor crônica (zero antes); psico-oncologia e cuidados paliativos (zero antes); avaliação psicológica no trânsito, que tinha página de área órfã e nenhuma profundidade abaixo dela.

### Gates mecânicos novos
- `scripts/lint-editorial.py`: transforma a Diretriz Editorial em cheque com arquivo e linha (clichê, anti-padrão 26, escassez fabricada, verificação virando conteúdo, atribuição anônima, negar para afirmar, travessão em prosa, aspas curvas, acentuação no texto visível, naming canônico, tabela sem contêiner rolável, SVG sem nome acessível). Calibrado contra falso positivo: ignora frontmatter, expressão JSX, valor de chave de título e rótulo curto de link.
- `scripts/lint-links.py`: resolve todo `href` interno contra as rotas que `src/pages` realmente produz. Pegou cinco links mortos durante a onda.
- **Baseline medido do portal antes da W25: 323 bloqueios em 361 arquivos, dos quais 306 são travessão em prosa herdado de ondas anteriores.** As 31 páginas novas entraram em zero bloqueio, e os 40 travessões dos arquivos tocados nesta onda foram consertados.

### Correção de regressão herdada
`src/components/Icon.astro` quebrava o `astro check` com `ts(2322)` desde os commits anteriores a esta sessão. A união dos dois literais de acessibilidade não casava com `SVGAttributes`. Tipado como `Record<string, string>`, o portal voltou a 0 erro.

### Decisão editorial de privacidade
A escuta social do orquestrador trouxe falas de pessoas identificáveis descrevendo sofrimento psíquico, com nome de usuário e link de post. Nada disso foi publicado. A página de dores descreve o padrão em terceira pessoa e no agregado, e o único número institucional publicado é o do INSS (546.254 benefícios por transtornos mentais em 2025, alta de 15,66%, via Agência Brasil de 20/08/2026).

### Pendências
- **Dívida editorial herdada:** 306 arquivos ainda com travessão em prosa fora dos tocados nesta onda. O gate agora mede; a correção pede uma onda própria, porque `--fix` cego quebraria sentido.
- **Wiki vencida:** as 18 páginas da camada `wiki/` estão com 93 dias sem atualização e a review mensal prevista para 26/06/2026 não aconteceu. `lint.py` acusa 0 órfão, 0 cross-link quebrado e 0 frontmatter faltando, mas 18 stale.
- **Lacuna real ainda aberta:** psicologia forense e laudos periciais, com página de área existente e nenhuma profundidade abaixo. É a próxima wave natural.
- IndexNow submetido em 27/08/2026 nos três engines (api.indexnow.org, Bing e Yandex), 389 URLs em quatro lotes, todos com HTTP 200 ou 202. Chamada precisou de `truststore.inject_into_ssl()` por causa do MITM do antivírus local. Falta o resubmit manual do sitemap no Google Search Console.

## W24 — Sessão 25/06/2026 — 5 waves complementares 2026 (19 páginas inéditas) + reforço do menu social

### Páginas no ar
**352 páginas** (era ~332; +19 páginas de conteúdo + regeneração de search-pages/sitemaps). Deploy Cloudflare verificado live (HTTP 200 nas novas URLs). Commit `311e23f` em `main`.

### Contexto
Demanda do CEO Alexandre Caramaschi: soltar mais 5 waves complementares com agentes especialistas em paralelo para popular guias, tabelas comparativas e FAQs com profundidade, bom UX/mobile, técnicas GEO e referência sutil ao IPOG, no tom do curso-factory. Forçar os 5 LLMs orquestrados; pesquisar recência 2026 (autismo, burnout, IA etc.); foco em conteúdo reaproveitável para Quora/Medium/LinkedIn.

### Método
- Orchestrator `board` (5 LLMs) FOI forçado (pedido explícito), mas confirmou o anti-padrão #2/#3: chave Anthropic morta (400), GPT-5.5 vazio, Gemini recusou ("estamos em 2024"), Perplexity ReadTimeout, só Groq respondeu com citações de confabulação. Pesquisa real ancorada via WebSearch ao vivo (2 agentes de pesquisa) com spot-check, fontes BR e globais reais.
- 4 agentes escritores Opus em paralelo (arquivos distintos, sem git no working tree — evitou o hazard de stash/reset). Cânone editorial (Voice Guard, HBR/HSM, deny-lists, anti-padrão 26, em-dash banido, slugs ASCII) injetado via WRITER_CONTEXT.

### Entregues (todas inéditas, dedup contra ~150 páginas existentes)
- **Wave 1 — Guias (5):** avaliação AHSD adulto (Decreto 12.773/2025), dupla excepcionalidade 2e, luto perinatal/gestacional, depressão pós-parto paterna, nexo burnout QD85 para afastamento INSS.
- **Wave 2 — Comparativos (4):** AHSD vs TDAH vs TEA adulto, EPDS vs PHQ-9, DPP materna vs paterna, regulação de IA em terapia Brasil vs EUA.
- **Wave 3 — FAQs (4):** AHSD adulto, luto perinatal, DPP paterna, escolher pós pelo Censo INEP 2024. FAQPage + speakable.
- **Wave 4 — Conteúdo social (6):** snippets reaproveitáveis Quora/Medium/LinkedIn com adaptações por canal (regra 9:1).
- **Wave 5 — Integração:** registro nos hubs (guias/comparativos/faqsHub/biblioteca), reforço do menu "Conteúdo e social" com Destaques 2026, sitemaps + auto-pages regenerados.

### Territórios NET-NEW abertos
Altas habilidades/superdotação adulta + dupla excepcionalidade 2e (zero antes); luto perinatal e depressão pós-parto paterna (zero antes); decisão de pós pelos dados do Censo INEP 2024.

### Quality gate
`astro check` 0 erros / 0 warnings (1005 hints pré-existentes de is:inline). `npm run build` 352 páginas OK. Scan: 0 em-dash, 0 aspas curvas delimitadoras, 0 [VERIFICAR], 0 deny-list, 0 anti-padrão 26. IndexNow 3 engines (api 200, Bing 200, Yandex 202).

### Pendências
- Spot-check humano recomendado em: Lei 15.222/2025 (texto exato no Planalto), ponto de corte EPDS paterno (omitido por falta de fonte), números do Censo Escolar AHSD (~56 mil) e "Psicologia 2ª pós mais procurada".
- Wiki ingest formal dos 2 dossiês de pesquisa (dossie-A/B) ainda no scratchpad; criar `sources/` quando promover.

## W23 — Sessão 26/05/2026 — Adoção do padrão LLM Wiki Karpathy

### Páginas no ar
**332 páginas** (estável; sessão de governança/arquitetura, não criou páginas do portal).

### Contexto

Em 26-05-2026 Alexandre Caramaschi trouxe o gist Karpathy de 03-04-2026 ([gist.github.com/karpathy/442a6bf555914893e9891c11519de94f](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)) e pediu para revisar, aprofundar com pesquisas externas e implementar a metodologia no repo `geo-ipog` para garantir arquitetura de ganhos incrementais e atualização de conhecimentos.

### Diagnóstico vs Karpathy

Repo já tinha: `CLAUDE.md` denso (schema do Karpathy), `docs/research/` (raw sources, 19 dossiês datados), `docs/governance/` (canônicos longos), `STATUS.md` (ledger narrativo). Faltavam as 4 peças canônicas Karpathy: catálogo navegável (`index.md`), ledger append-only parseável (`log.md`), páginas wiki atômicas e cross-linkadas, e os 3 workflows formais (Ingest, Query, Lint).

### Entregues

**Camada `wiki/` Karpathy completa (21 arquivos novos):**

- `wiki/README.md`, `wiki/index.md` (catálogo + backlog explícito de 14 páginas pendentes), `wiki/log.md` (append-only canônico).
- `wiki/entities/` × 7: `ipog`, `brasil-geo`, `alexandre-caramaschi`, `larissa-caramaschi`, `ronan-maia`, `bruno-azambuja`, `naia`.
- `wiki/concepts/` × 6: `geo`, `llms-txt`, `mention-rate`, `eeat-ymyl`, `schema-graph-triplo`, `llm-wiki-karpathy`.
- `wiki/decisions/` × 1: `ADR-001-adopcao-llm-wiki.md` (contexto, alternativas consideradas, decisão, consequências, métricas de sucesso em 30/60/90 dias).
- `wiki/sources/` × 3: `2026-04-03-karpathy-llm-wiki-gist.md` (13 claims canônicos K-01 a K-13 extraídos), `2026-05-17-seo-geo-kb-canonical.md` (mapeamento para 5 conceitos), `2026-05-19-autismo-research-larissa.md` (6 frentes para Larissa).
- `wiki/reviews/2026-05-26-baseline.md` (inventário inicial, cross-links por categoria, findings zero, backlog explícito).

**Workflows operacionais (3 arquivos):**

- `scripts/wiki/lint.py` — Python funcional. Cheques: frontmatter YAML, cross-links quebrados (excluindo backlog declarado), órfãos, stale claims (>90 dias), conflitos marcados `[CONFLITO]`. Suporta `--json` para CI e `--fix-log` para apêndice automático.
- `scripts/wiki/ingest-playbook.md` — receita canônica para processar fonte nova (1 fonte toca 5-15 páginas + apêndice no log).
- `scripts/wiki/query-playbook.md` — receita para responder pergunta operacional consultando grafo antes de pesquisar externamente; respostas valiosas viram páginas novas.

**Governance:**

- `docs/governance/karpathy-llm-wiki-methodology.md` — documento canônico (tese, linhagem Vannevar Bush + Nelson + Luhmann + Matuschak, implementações comunitárias mapeadas: ΩmegaWiki, LLM-WIKI-MCP, Maoxunxing, adaptação concreta, métricas de sucesso, riscos e mitigações).
- `CLAUDE.md` editado: novo bloco "Wiki workflow obrigatório" + fluxo padrão de onda agora começa com "Consulta wiki primeiro" (passo 1) e termina com "Wiki ingest" (passo 7).
- `STATUS.md` editado: este registro W23.

### Teses Karpathy aplicadas (referência canônica)

1. **RAG é amnésico, LLM Wiki é stateful.** Acúmulo zero vs composição contínua.
2. **Inversão do modo de falha humano.** Wikis humanos morrem por manutenção; LLMs não cansam.
3. **3 camadas:** raw (imutável, humano cura) + wiki (mutável, LLM mantém) + schema (configuração).
4. **4 operações:** Ingest, Query, Lint, Maintain.
5. **2 arquivos críticos:** `index.md` substitui RAG até escala moderada; `log.md` append-only parseável.

### Disciplina nova obrigatória

Toda onda futura no `geo-ipog` deve:

1. Antes: consultar `wiki/index.md`.
2. Durante: tocar páginas existentes ou criar novas.
3. Ao final: apendar `wiki/log.md`, rodar `python scripts/wiki/lint.py`, endereçar broken_crosslinks fora do backlog, commit junto.
4. Mensal: review formal em `wiki/reviews/`.

### Quality gate

- `python scripts/wiki/lint.py` no estado inicial: 0 órfãos, 0 broken crosslinks (todos os 14 cross-links pendentes estão no backlog declarado), 0 missing frontmatter, 0 stale, 0 conflitos.

### Custo

- Sessão arquitetura conduzida no Claude principal (sem fan-out de sub-agentes).
- 3 WebFetch (gist Karpathy + 2 análises comunitárias) + 1 WebSearch.
- 0 chamadas Perplexity.
- 0 build, 0 push Cloudflare Pages no portal (apenas push de repo no GitHub).

### Próximos passos sugeridos

1. Fechar 3 itens do backlog na próxima wave: criar `wiki/concepts/citation-rate.md`, `wiki/concepts/share-of-voice.md`, `wiki/decisions/ADR-002-portal-independente-vs-ipog-edu-br.md`.
2. Ingest da próxima onda de research (W24) deve seguir `scripts/wiki/ingest-playbook.md` para validar o fluxo em produção.
3. Em 30 dias (26-06-2026): primeiro review mensal formal em `wiki/reviews/2026-06-26-mensal.md`. Verificar métricas: crescimento de páginas, redução de backlog, tempo médio de query, órfãos.
4. Considerar adicionar hook pre-commit que roda `python scripts/wiki/lint.py` quando há mudança em `wiki/**/*.md`.

---

## W22 — Sessão 24/05/2026 — 7 ondas Google I/O 2026 + Maio 2026 Core Update

### Páginas no ar
**332 páginas** (estável; foco da sessão foi enrich + padronização estrutural, não criação).

### Entregues (commit `9e9c707` main · push origin OK · 32 arquivos · +1115/-95)

1. **/feed.xml RSS 2.0 canônico** (Information Agents 24/7, Google I/O 2026). Endpoint Astro em `src/pages/feed.xml.ts` com 31 entradas curadas (hub /autismo + 6 artigos + sobre-larissa + 5 FAQs Larissa-linked + 5 hubs glossário + 5 MBAs + 5 áreas + 2 índices). lastBuildDate via mtime real, RFC 822, dc:creator por entrada, ttl 360.
2. **YMYLDisclaimer.astro componente canônico** (`src/components/YMYLDisclaimer.astro`). Caixa visual `role="note"` com 4 variantes de domain (autismo / saude-mental / neuropsicologia / geral). Texto canônico "não substitui avaliação clínica" + indicação de busca por psicólogo + revisão clínica nominal + dateModified. Injetado em 10 páginas /autismo via patch idempotente (`site/scripts/patch-ymyl-disclaimer.mjs`).
3. **EducationalOccupationalProgram canônico em 15 sub-páginas MBA** (`site/scripts/patch-mba-subpages-eop.mjs`). Refatora `ldProgram` legado para usar factory `buildEducationalOccupationalProgram` do schema canônico com: `timeRequired: P360H`, `educationalProgramMode: blended`, `provider` por `@id #ipog-educational-organization`, `recognizedBy` MEC + IPOG, `isPartOf` apontando para `@id` do MBA pai (`/mbas/{id}#program`), `speakable` em h1/.section-h/#resposta-rapida.
4. **llms.txt v3** (`site/public/llms.txt`). Header com disclaimer "non-Google LLMs" explícito, nota Information Agents 24/7, dataModified 2026-05-24, link para /feed.xml, YMYL CRÍTICO declarado.
5. **ai-policy.json v1.2** (`site/public/.well-known/ai-policy.json`). dateModified 2026-05-24, version 1.2.0, `ymylCategories`, `criticalUpdate20260524` com changelog, `manifests.feed` apontando para /feed.xml.
6. **robots.txt** atualizado com referência ao feed RSS para Information Agents.
7. **Sub-páginas /autismo + portas** (hub + 3 portas + 6 artigos = 10) ganharam YMYLDisclaimer.

### Quality gate

- `npm run check` (astro check): **0 erros · 0 warnings · 956 hints** (385 files).
- `npm run build`: **332 páginas em 23.88s** + 18 sub-sitemaps + /feed.xml.
- Smoke produção 15/15 HTTP 200 (cb cache-busted).
- Validação produção: YMYL "Aviso clínico" em /autismo/artigos/diagnostico-tardio (1 hit), EducationalOccupationalProgram + isPartOf + ipog-educational-organization em /mbas/mba-pot/grade-curricular (3 hits), /feed.xml com 31 items, llms.txt v3 com 2 menções a "non-Google LLMs / Information Agents 24/7".

### IndexNow

- 38 URLs × 3 engines.
- **Yandex 202** OK. Bing + api.indexnow.org **403 "UserForbiddedToAccessSite"** (key file servido HTTP 200 com conteúdo correto `geoipogIN2026\n`; provavelmente o domínio nunca foi associado ao IndexNow no Bing Webmaster Tools ou ban temporal por excesso de pings de outros projetos do mesmo IP). Gap operacional **não-bloqueante** — Yandex já fechou crawl da wave.

### Custo

- 1 sub-agent Opus paralelo (este turno); scripts mjs idempotentes reusáveis.
- 1 push Cloudflare Pages (deploy automático via Git connection).

### Próximos passos (não executados)

1. **Resolver IndexNow Bing**: associar o domínio ao Bing Webmaster Tools (manual UI) ou tentar IndexNow GET single-URL com IP origin diferente.
2. **GSC sitemap-index.xml resubmit** via Chrome MCP (manual; tornaria as 332 URLs re-crawled).
3. **Expandir YMYLDisclaimer para /areas/aba-tea-neurodesenvolvimento** (clínica YMYL adicional).
4. **Adicionar EducationalOccupationalProgram nas páginas de comparativo entre modalidades** se relevante.
5. **Auditar glossário Wikidata** — 12/169 verbetes têm sameAs; potencial expansão para TEA Q244329, TDAH Q181923, Depressão Q41112, Ansiedade Q175854 (já existe `Q11081` Alzheimer comprovado, padrão funciona).

Veja também `project_geo_ipog_seo_geo_eeat_waves_20260520` (W21).

---

## W21 — Sessão 19/05/2026 — Pivô para Autismo em adultos com Larissa Caramaschi

### Páginas no ar
**332 páginas** (era 320 antes desta sessão; +12 dedicadas a Autismo em adultos).

### Sessão UU — Reescrita de ontologia e taxonomia para Autismo em adultos com Larissa Caramaschi (19/05/2026)

**Objetivo:** redirecionar o portal `posgraduacaopsicologia.com` para ter Larissa Caramaschi como autoridade central em autismo nível 1 de suporte em adultos. Conteúdo útil para 3 audiências (pacientes e famílias, profissionais de psicologia, pesquisadores). Eliminar jargão técnico GEO visível ao leitor final.

**Entregues:**

1. **Pesquisa Perplexity em 6 frentes paralelas** (`_tmp/autismo-research-20260519/`):
   - 01 Diagnóstico tardio em adultos
   - 02 Relacionamentos NT-autista
   - 03 Camuflagem e CAT-Q
   - 04 Clínica adulto baseada em evidência
   - 05 Fronteira de pesquisa 2026
   - 06 Vida cotidiana e trabalho

2. **12 páginas novas** em `src/pages/autismo/`:
   - Hub `/autismo/` (index)
   - 3 portas de audiência: `/autismo/para-pacientes/`, `/autismo/para-profissionais/`, `/autismo/para-pesquisadores/`
   - 6 artigos longos HBR (3.500 a 5.000 palavras cada):
     * `diagnostico-tardio-adulto-2026`
     * `relacionamentos-amorosos-nt-autista-2026`
     * `camuflagem-masking-cat-q-adulto-2026`
     * `vida-cotidiana-trabalho-autista-adulto-2026`
     * `clinica-tea-adulto-evidencia-2026`
     * `fronteira-pesquisa-tea-adulto-2026`
   - Glossário com 54 verbetes em 6 clusters: `/autismo/glossario`
   - Biografia profissional: `/autismo/sobre-larissa`

3. **Home reescrita** (`src/pages/index.astro`): nova ontologia centrada em autismo adulto. Hubs antigos (Áreas, Pós-Graduações, Guias, FAQ) viraram conteúdo complementar acessível por menu.

4. **Menu primário atualizado** (Header, MegaMenu, MobileBottomNav, Footer): "Autismo em adultos" é agora o primeiro item, com submenu de 3 portas + glossário + sobre + 6 artigos.

5. **Limpeza de jargão visível**: 152 arquivos legados modificados, 652 substituições removendo "canônico/canônica/canônicos/canônicas" visíveis ao leitor (preservados apenas usos técnicos `rel="canonical"`, identificadores TS).

6. **Travessões em-dash removidos** dos 6 artigos novos (regra anti-padrão IA).

**Voz editorial Larissa Caramaschi aplicada:**
- Identity-first ("pessoa autista", "adulto autista") como default
- Vocabulário ético: "autismo nível 1 de suporte" (nunca "leve", "Asperger", "alto funcionamento")
- CFP-compliance (Resolução 03/2007, 11/2018, 06/2019): sem promessa de cura, sem comparativo com outros profissionais, sem antes/depois
- Densidade HBR com vinhetas hipotéticas marcadas como compostas
- Frontend: text-align justify + hyphens auto, mobile-first, max-w-3xl/4xl

**Quality gates:**
- `npx astro check`: 0 errors, 0 warnings, 939 hints (apenas hints `is:inline` esperados)
- `npm run build`: 332 páginas em 24s, exit 0
- Acentuação ortográfica: revisão completa pré-commit

### Páginas no ar (histórico)
**235 páginas** (era 232 antes das waves 17/05).

### Sessão N — Briefing canônico das 110 missões digitais GEO IPOG (18/05/2026)

**Objetivo:** organizar e taxonomizar as 110 missões digitais GEO IPOG demandadas pelo CEO Alexandre Caramaschi (Brasil GEO, atuando como Engenheiro de Software e Arquiteto de Sistemas do programa) em estrutura canônica acionável por wave operacional, articulada com a taxonomia NAIA existente.

**Entregues:**

1. **`audits/CHECKLIST-DIGITAL-GEO-IPOG-110.md`** — documento mestre com as 110 missões organizadas em 9 eixos:
   - Eixo 1 — Infraestrutura técnica e crawlability (missões 1-15)
   - Eixo 2 — Performance, mobile e acessibilidade (16-20)
   - Eixo 3 — SEO on-page tradicional (21-26)
   - Eixo 4 — Conteúdo, profundidade e jornada de conversão (27-37)
   - Eixo 5 — Entidade, cobertura semântica e cobertura GEO (38-53)
   - Eixo 6 — Schema.org e dados estruturados (54-71)
   - Eixo 7 — Citabilidade GEO e infraestrutura LLM (72-89)
   - Eixo 8 — Confiança institucional e E-E-A-T (90-109)
   - Eixo 9 — Priorização operacional (110)

   Cada missão tem ID estável `GEO-IPOG-XXX`, mapeamento opcional para NAIA-XXX, severidade default (P0/P1/P2), wave de execução (L-Q), owner nominal, critério de done verificável e saída esperada. Dual track explícito: auditoria em `ipog.edu.br` + execução demonstrativa em `posgraduacaopsicologia.com` + plano de implantação gated por destravamento de cliente (Issues #6, #36, #61).

2. **`ROADMAP.md` atualizado** — bloco "Waves operacionais L-Q — 110 missões digitais GEO IPOG" inserido após a seção "Próximas waves planejadas (F-K)". Distribuição:
   - **Wave L** (19-05 a 02-06): Crawlability + Performance baseline — eixos 1, 2 + missão 110
   - **Wave M** (02-06 a 16-06): SEO on-page + Conteúdo editorial — eixo 3 + parte do 4
   - **Wave N** (16-06 a 30-06): Entidade + Cobertura semântica + Jornada — parte do 4 + eixo 5
   - **Wave O** (30-06 a 14-07): Schema completion — eixo 6 [gating-ipog: Issue #61]
   - **Wave P** (14-07 a 28-07): Citabilidade GEO + Infra LLM — eixo 7
   - **Wave Q** (28-07 a 11-08): E-E-A-T institucional — eixo 8 [gating-ipog]

3. **Articulação com ciclo de captação:** waves L, M, N e O concluídas até 15-07-2026 (entrada do pico 2026.2); waves P e Q ampliam a base entre 14-07 e 11-08-2026 para alimentar o pico 2027.1.

**Mapeamento NAIA das 110 missões:**

- ~60% das missões mapeiam diretamente para checks NAIA-A a NAIA-J existentes em `audits/PLAYBOOK-AUDITORIA-NAIA.md` (Schema institucional, Schema curso, FAQ, Person, llms.txt, sitemap/robots, conteúdo declarado, performance, citações cross-LLM, autoridade externa).
- ~40% das missões são gaps emergentes que recomendam-se promover a **novas categorias NAIA-K (Conteúdo + jornada de conversão), NAIA-L (Entidade + cobertura semântica), NAIA-M (Citabilidade GEO + infra LLM), NAIA-N (E-E-A-T institucional)** na próxima revisão do playbook.

**Próximos passos operacionais:**

1. Abrir 1 epic GitHub por wave (`[L] Crawlability + Performance baseline`, etc.) no repo `alexandrebrt14-sys/geo-ipog` — opcional, conforme decisão de governança.
2. Iniciar Wave L imediatamente em `posgraduacaopsicologia.com` (baseline executável sem destravamento de cliente).
3. Levar a matriz de priorização canônica (missão 110) ao próximo checkpoint com Ronan Maia.
4. Sincronizar com Bruno Azambuja na cadência quinzenal para destravar Issues #6 (robots.txt) e #36 (GSC+GA4) antes do início da Wave O.

**Custo estimado da sessão:** $0,00 (trabalho de arquitetura conduzido no Claude principal sem fan-out de sub-agentes).

### Sessão 1 — Sprint KB + 5 waves research (17/05/2026)

Arquivos canônicos gerados:

- `docs/research/seo-geo-knowledge-base-2026-05-17.md` — base de conhecimento GEO/AISO 2026
- 5 waves de research paralelas (Perplexity sonar-pro + Claude Opus 4):
  - Wave AA: Speakable + EducationalOccupationalProgram em /mbas/*
  - Wave BB: Gaps em /areas/*
  - Wave CC: Gaps em /comparativos/*
  - Wave DD: Citation-prompts v2 (25 prompts renovados)
  - Wave EE: Monitor DIY + runbooks operacionais

Novos arquivos de sprint (18 ao total):
- 3 páginas novas (detectadas no audit)
- 3 schemas TypeScript canônicos (`educational-program.ts`, `educational-organization.ts`, `person-alexandre.ts`)
- 2 runbooks operacionais (`docs/runbooks/`)
- 1 monitor DIY (`docs/monitor-diy.md`)
- 1 citation-prompts v2 (`docs/citation-prompts-v2.json`)
- Demais: atualizações em `Base.astro` (@graph triplo), `schemas/index.ts`, `CLAUDE.md`

Issues comentadas no GitHub: #43, #46, #51, #56, #57, #61, #76, #78

### Sessão 2 — Wave AA Remediação (17/05/2026, tarde)

**Objetivo:** Aplicar JSON-LD `EducationalOccupationalProgram` canônico (via `buildEducationalOccupationalProgram`) nas 5 páginas MBA e na página `/tipos-de-pos-graduacao`.

**Entregues:**

1. **5 páginas `/mbas/[slug].astro` remediadas:**
   - `/mbas/mba-pot` — schema canônico com `@id`, `recognizedBy` MEC, `timeRequired: P360H`, 5 `hasCourse`
   - `/mbas/mba-positiva` — idem, `timeRequired: P360H`
   - `/mbas/mba-neuro` — idem, `timeRequired: P420H`
   - `/mbas/mba-ncpp` — idem, `timeRequired: P360H`
   - `/mbas/mba-lideranca-positiva` — idem, `timeRequired: P360H`
   - Import: `buildEducationalOccupationalProgram` de `@lib/schemas/educational-program`
   - Substituição: bloco `ldProgram` inline simples → factory canônica com `@id`, `recognizedBy`, `offers`, `programPrerequisites`, `hasCourse`

2. **`/tipos-de-pos-graduacao.astro` atualizada:**
   - 5 novos blocos `<script type="application/ld+json">` (um por modalidade)
   - Modalidades cobertas: `Especialização Lato Sensu`, `MBA`, `Mestrado Profissional`, `Especialização Clínica`, `Residência`
   - Cada bloco usa `buildEducationalOccupationalProgram` com `timeRequired`, `educationalCredentialAwarded`, `recognizedBy` automático por modalidade

3. **`STATUS.md` criado** na raiz do repo (este arquivo).

---

## §6.3 — Próximas sprints recomendadas

Baseado no audit `docs/governance/audit-graph-triple-2026-05-17.md`:

1. **Wave BB — /areas/* (52 hubs com gap secundário)**
   - Adicionar `EducationalOccupationalProgram` como bloco secundário em cada hub de área
   - Adicionar `Speakable` nos blocos "Resposta rápida" e FAQ

2. **Wave CC — /comparativos/* (18 páginas)**
   - Schema `Article` + `Speakable` nos blocos de síntese
   - `breadcrumb` canônico

3. **Wave DD — citation-prompts v2**
   - Substituir os 25 prompts por versão revisada com dados 2026
   - Publicar em `/citation-prompts.json` (já existe v1)

4. **Wave EE — monitor DIY**
   - Implementar script de monitoramento de citação semanal
   - Alertas por e-mail quando mention rate cair abaixo de threshold

5. **Indexação em lote**
   - IndexNow para as 3 páginas novas (smoke + submit)
   - GSC sitemap re-submit após confirmar 235 URLs no sitemap

---

## Histórico de waves anteriores

| Wave | Data | Páginas | Destaque |
|------|------|---------|----------|
| K–O | 12-05-2026 | 116 | 27 UFs, 18 áreas, /metodos |
| P–T | 12-05-2026 | 143 | /evidencias, /casos, /intervencoes |
| U–Z | 12-05-2026 | 174 | /guias, /faq, glossário 115 termos |
| AA–EE | 13-05-2026 | 198 | 6 guias HowTo, 6 FAQs, 8 comparativos |
| Hardening pt2 | 13-05-2026 | 198 | llms.txt v2, Person Alexandre, Speakable 12 FAQs |
| FF–JJ | 13-05-2026 | 212 | TEA mulheres, burnout NR-1, IA CFP, adolescência |
| KK–OO | 13-05-2026 | 232 | Setores verticais, 6 polos Stone, 5 calculadoras |
| W21 sess.1 | 17-05-2026 | 232 | KB GEO 2026, schemas canônicos, @graph triplo |
| W21 sess.2 | 17-05-2026 | **235** | EducationalOccupationalProgram 5 MBAs + tipos-de-pos |
