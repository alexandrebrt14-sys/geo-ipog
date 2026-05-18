# Checklist Digital GEO IPOG — 110 Missões Canônicas

> **Status:** vigente a partir de 2026-05-18 (W21)
> **Dono:** Alexandre Caramaschi (Brasil GEO), atuando como Engenheiro de Software e Arquiteto de Sistemas do programa GEO IPOG
> **Validação operacional:** Bruno Azambuja (IPOG), Ronan Maia (CEO IPOG)
> **Última revisão:** 2026-05-18

## Por que este documento existe

Este checklist consolida em uma única fonte canônica as **110 missões digitais** que compõem o trabalho de Generative Engine Optimization do IPOG no horizonte 2026. Ele articula a taxonomia de auditoria NAIA já vigente (categorias A a J em `audits/PLAYBOOK-AUDITORIA-NAIA.md`) com quatro novas categorias (K, L, M, N) que cobrem dimensões emergentes — jornada de conversão, cobertura semântica, citabilidade GEO e E-E-A-T institucional — ainda não taxonomizadas no playbook NAIA original.

Cada uma das 110 missões tem ID estável `GEO-IPOG-XXX`, mapeamento opcional para um check NAIA pré-existente, severidade default, wave de execução, owner nominal, critério de done e saída esperada. A lista é fechada e blindada contra inflação: novas missões só entram via revisão executiva mensal com Ronan Maia, com decisão registrada em ata.

## Dual track de execução

Toda missão deste checklist tem dois lugares de aplicação:

1. **Auditoria em `ipog.edu.br`** — leitura técnica do domínio canônico do cliente, executável sem destravamento de acesso. Saída: relatório de gap com priorização por severidade e dependência (`audits/PLAYBOOK-AUDITORIA-NAIA.md`).
2. **Execução demonstrativa em `posgraduacaopsicologia.com`** — implementação completa da metodologia GEO no portal operado pela Brasil GEO, sob controle total da equipe. Saída: prova viva da metodologia, com schemas, llms.txt, conteúdo HBR-grade, infraestrutura LLM e telemetria GA4.
3. **Plano de implantação em `ipog.edu.br`** — instruções acionáveis para o time de TI/Marketing do IPOG quando o cliente destravar os bloqueios canônicos (Issues #6 robots.txt, #36 GSC+GA4, #61 schema piloto, ver `docs/board/`).

A coluna `Wave` indica o ciclo operacional em que a missão entra na esteira. Waves F a K já estavam declaradas em `ROADMAP.md` (cf. seção "Próximas waves planejadas") e cobrem entregas de citação, regionalização e schema piloto. Waves L a Q são introduzidas por este checklist e operacionalizam os 9 eixos das 110 missões.

## Princípios canônicos do checklist

1. **Severidade default declarada.** P0 bloqueia citação ou recuperação por LLMs; P1 prejudica fidelidade ou completude da citação; P2 é melhoria incremental.
2. **NAIA ID quando aplicável.** Missões que já têm cobertura no playbook NAIA recebem o ID `NAIA-XXX` correspondente. Missões novas recebem apenas o ID `GEO-IPOG-XXX`, e ficam disponíveis para promoção a NAIA na próxima revisão do playbook.
3. **Owner nominal único.** Toda missão tem um responsável final. Quando há colaboração, o owner é o tomador de decisão, não o coletor de dado.
4. **Critério de done verificável.** Nenhuma missão fecha por desuso; cada uma tem critério explícito (presença/ausência, valor numérico, evidência documental).
5. **Dependência declarada.** Missões bloqueadas em cliente IPOG estão marcadas com `[gating-ipog]`. Missões executáveis sob `posgraduacaopsicologia.com` estão marcadas com `[brasilgeo-portal]`.

---

## Eixo 1 — Infraestrutura técnica e crawlability (missões 1 a 15)

Dimensão dominante: o site responde corretamente a crawlers de mecanismos de busca tradicionais e a crawlers de LLMs (ChatGPT-User, Claude-User, PerplexityBot, GPTBot, Google-Extended, ClaudeBot, CCBot).

**Wave de execução dominante:** L (Crawlability baseline).

| ID | Missão | NAIA | Sev | Wave | Owner | Critério de done | Saída esperada |
|---|---|---|---|---|---|---|---|
| GEO-IPOG-001 | **Status HTTP** — toda URL canônica retorna 200; nenhuma retorna 4xx/5xx em rota produtiva | NAIA-F | P0 | L | Brasil GEO | 100% das URLs do sitemap.xml retornam 200; relatório de exceções vazio | `audits/reports/http-status-{YYYY-MM-DD}.csv` |
| GEO-IPOG-002 | **Redirecionamentos** — chains de redirect tem profundidade máxima 1; sem loops; 301 (não 302) para mudanças permanentes | NAIA-F | P1 | L | Brasil GEO | Zero chains com profundidade >1; zero 302 onde deveria ser 301 | `audits/reports/redirects-{YYYY-MM-DD}.csv` |
| GEO-IPOG-003 | **Canonical** — toda página tem `<link rel="canonical">` apontando para versão canônica; sem auto-referência conflitante; sem canonical cross-domain inesperado | — | P0 | L | Brasil GEO | 100% das páginas com canonical declarado e batendo com URL canônica | `audits/reports/canonical-{YYYY-MM-DD}.csv` |
| GEO-IPOG-004 | **Robots meta** — toda página produtiva tem `<meta name="robots">` com diretivas explícitas (`index,follow` para públicas; `noindex` apenas em utilitárias); zero `nofollow` indevido | — | P1 | L | Brasil GEO | Relatório de robots meta por URL; exceções justificadas | `audits/reports/robots-meta-{YYYY-MM-DD}.csv` |
| GEO-IPOG-005 | **Robots.txt** — `robots.txt` aberto a crawlers de LLM (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot); sem bloqueio acidental ao Googlebot | NAIA-F | P0 | L | Brasil GEO | `robots.txt` validado contra lista canônica de user-agents em `audits/ROBOTS-SITEMAP-CHECKLIST.md` | `audits/ROBOTS-SITEMAP-CHECKLIST.md` atualizado [gating-ipog: Issue #6] |
| GEO-IPOG-006 | **Sitemap.xml** — sitemap principal com sub-sitemaps segmentados (cursos, hubs, FAQs, comparativos); `<lastmod>` atualizado em mudanças; sitemap-index.xml linkado em `robots.txt` | NAIA-F | P0 | L | Brasil GEO | Sitemap-index com 5+ sub-sitemaps; 100% das URLs no sitemap retornam 200 | `audits/reports/sitemap-{YYYY-MM-DD}.xml` [brasilgeo-portal: 5 sub-sitemaps já ativos] |
| GEO-IPOG-007 | **llms.txt** — arquivo `/llms.txt` v2 publicado com posicionamento, hub central, prompts canônicos e prioridades de citação por modalidade | NAIA-E | P0 | L | Brasil GEO | `/llms.txt` retorna 200, contém posicionamento + 5 modalidades + KPIs | `public/llms.txt` v2 [brasilgeo-portal: ativo em 13-05-2026] |
| GEO-IPOG-008 | **Status das URLs** — taxa de URLs com status 200/total no índice ≥ 98%; URLs órfãs e descontinuadas removidas do sitemap | — | P1 | L | Brasil GEO | Relatório agregado com taxa ≥ 98% | `audits/reports/url-status-summary-{YYYY-MM-DD}.md` |
| GEO-IPOG-009 | **Páginas órfãs internas** — toda página produtiva é alcançável a partir de pelo menos um link interno em até 3 cliques desde a home | — | P1 | L | Brasil GEO | Crawl interno detecta zero páginas órfãs com tráfego potencial | `audits/reports/orphan-pages-{YYYY-MM-DD}.csv` |
| GEO-IPOG-010 | **Links quebrados internos** — zero links internos retornando 404 ou 5xx | — | P1 | L | Brasil GEO | Crawl completo com zero 4xx/5xx em anchors internos | `audits/reports/broken-internal-links-{YYYY-MM-DD}.csv` |
| GEO-IPOG-011 | **Links externos quebrados** — zero links externos para sites desativados, especialmente em citações de fontes (DOI, ABEP, CFP, MEC, Wikipedia) | — | P1 | L | Brasil GEO | Crawl externo com taxa de quebra ≤ 1% | `audits/reports/broken-external-links-{YYYY-MM-DD}.csv` |
| GEO-IPOG-012 | **HTTPS** — todo tráfego servido em HTTPS com TLS ≥ 1.2; HSTS habilitado; redirect 301 de HTTP para HTTPS canônico | — | P0 | L | Brasil GEO | Header `Strict-Transport-Security` presente; TLS 1.2+ obrigatório | `audits/reports/tls-config-{YYYY-MM-DD}.md` |
| GEO-IPOG-013 | **Conteúdo misto (mixed content)** — zero recursos servidos via HTTP em páginas HTTPS (imagens, scripts, CSS, fontes) | — | P1 | L | Brasil GEO | Console do browser limpo em todas as páginas críticas | `audits/reports/mixed-content-{YYYY-MM-DD}.csv` |
| GEO-IPOG-014 | **Peso do HTML** — HTML renderizado inicial ≤ 200 KB gzip nas páginas críticas (home, hub de cursos, páginas de curso) | — | P2 | L | Brasil GEO | Relatório Lighthouse com weight ≤ 200 KB gzip | `audits/reports/html-weight-{YYYY-MM-DD}.csv` |
| GEO-IPOG-015 | **Scripts excessivos** — número de scripts third-party ≤ 10 por página; sem scripts bloqueantes em `<head>` sem `defer/async` | — | P2 | L | Brasil GEO | Auditoria de scripts com lista canônica permitida (GA4, GTM, schema) | `audits/reports/scripts-audit-{YYYY-MM-DD}.csv` |

---

## Eixo 2 — Performance, mobile e acessibilidade (missões 16 a 20)

Dimensão dominante: experiência percebida ao usuário humano final em dispositivos móveis e em tecnologias assistivas, com Core Web Vitals como instrumento de leitura quantitativa.

**Wave de execução dominante:** L (Performance baseline).

| ID | Missão | NAIA | Sev | Wave | Owner | Critério de done | Saída esperada |
|---|---|---|---|---|---|---|---|
| GEO-IPOG-016 | **Mobile** — todas as páginas críticas passam no mobile-friendly test do Google; viewport correto; texto legível sem zoom | NAIA-H | P0 | L | Brasil GEO | 100% das páginas críticas com mobile-friendly OK | `audits/reports/mobile-friendly-{YYYY-MM-DD}.md` |
| GEO-IPOG-017 | **Core Web Vitals** — LCP ≤ 2,5s; INP ≤ 200ms; CLS ≤ 0,1 (75º percentil de campo via CrUX) | NAIA-H | P0 | L | Brasil GEO | CWV verde em CrUX para 3 métricas em 75º percentil | `dashboards/cwv-trend-{YYYY-MM-DD}.md` |
| GEO-IPOG-018 | **Performance percebida** — primeira pintura útil ≤ 1,5s em 4G; skeleton loader em listas longas; preload de fontes críticas | — | P1 | L | Brasil GEO | Lighthouse Performance ≥ 90 mobile | `audits/reports/perceived-perf-{YYYY-MM-DD}.md` |
| GEO-IPOG-019 | **Imagens sem alt** — toda imagem com função informativa tem `alt` descritivo; imagens decorativas com `alt=""`; sem `alt` redundante a legenda | — | P1 | L | Brasil GEO | Zero imagens informativas sem `alt` | `audits/reports/images-alt-{YYYY-MM-DD}.csv` |
| GEO-IPOG-020 | **Acessibilidade básica** — WCAG 2.2 AA mínimo nas páginas críticas: contraste, landmarks ARIA, foco visível, labels em formulários, hierarquia heading correta | — | P1 | L | Brasil GEO | axe-core report sem violations sérias em páginas críticas | `audits/reports/a11y-axe-{YYYY-MM-DD}.md` |

---

## Eixo 3 — SEO on-page tradicional (missões 21 a 26)

Dimensão dominante: metadata clássica e estrutura editorial são pré-requisito para SEO orgânico e também influenciam citabilidade GEO (LLMs extraem tese e headings com peso alto).

**Wave de execução dominante:** M (SEO on-page + Conteúdo editorial).

| ID | Missão | NAIA | Sev | Wave | Owner | Critério de done | Saída esperada |
|---|---|---|---|---|---|---|---|
| GEO-IPOG-021 | **Title** — toda página tem `<title>` único, ≤ 60 caracteres, com entidade principal + benefício específico; sem boilerplate genérico | — | P1 | M | Brasil GEO | Relatório de titles únicos com checksum de unicidade | `audits/reports/titles-{YYYY-MM-DD}.csv` |
| GEO-IPOG-022 | **Meta description** — toda página tem `<meta name="description">` ≤ 160 caracteres com tese curta + CTA implícito; sem texto duplicado entre páginas | — | P1 | M | Brasil GEO | Zero descriptions ausentes; zero duplicadas | `audits/reports/meta-desc-{YYYY-MM-DD}.csv` |
| GEO-IPOG-023 | **H1** — exatamente um `<h1>` por página, batendo com `name` do Schema (`Course.name`, `Article.headline`, `Service.name`) | — | P0 | M | Brasil GEO | Zero páginas com 0 ou >1 `<h1>`; checksum H1 ↔ Schema | `audits/reports/h1-consistency-{YYYY-MM-DD}.csv` |
| GEO-IPOG-024 | **H2/H3** — hierarquia de headings sem pular níveis; H2 cobre seções canônicas (tese, evidência, mecanismo, FAQ, próximo passo) | — | P1 | M | Brasil GEO | Auditoria de hierarquia com zero saltos H1→H3 | `audits/reports/heading-hierarchy-{YYYY-MM-DD}.csv` |
| GEO-IPOG-025 | **Estrutura editorial** — padrão HBR aplicado a peças longas: abertura-impacto → tese contraintuitiva → evidência → mecanismo → decisão → próximo passo | — | P1 | M | Brasil GEO | `content/CHECKLIST-PUBLICACAO.md` aprovado para cada peça produtiva | `content/PADRAO-EDITORIAL.md` aplicado |
| GEO-IPOG-026 | **Escaneabilidade** — parágrafos ≤ 5 linhas; bullets/listas em pontos densos; subtítulos a cada 250-400 palavras; bold criterioso em definições | — | P2 | M | Brasil GEO | Auditoria editorial Flesch ≥ 50 em peças canônicas | `audits/reports/readability-{YYYY-MM-DD}.csv` |

---

## Eixo 4 — Conteúdo, profundidade e jornada de conversão (missões 27 a 37)

Dimensão dominante: conteúdo precisa ser denso, original, ancorado em intenção e levar o leitor a uma ação concreta (matrícula, contato, download). É o eixo onde GEO e CRO se encontram.

**Wave de execução dominante:** M (Conteúdo) para 27-32; M+N (Jornada de conversão) para 33-37.

| ID | Missão | NAIA | Sev | Wave | Owner | Critério de done | Saída esperada |
|---|---|---|---|---|---|---|---|
| GEO-IPOG-027 | **Conteúdo visível** — texto crítico renderizado server-side (não escondido atrás de JavaScript); LLMs sem JS conseguem ler tese, evidência, FAQ | — | P0 | M | Brasil GEO | `curl --compressed` retorna conteúdo canônico das páginas críticas | `audits/reports/ssr-coverage-{YYYY-MM-DD}.md` |
| GEO-IPOG-028 | **Profundidade textual** — páginas de curso ≥ 1.500 palavras; artigos HBR-grade ≥ 2.500 palavras; FAQs com ≥ 12 Q&A; comparativos com ≥ 3 tabelas | — | P1 | M | Brasil GEO | Relatório word-count com mediana por tipo de página | `audits/reports/word-count-{YYYY-MM-DD}.csv` |
| GEO-IPOG-029 | **Intenção de busca** — cada página atende a uma intenção dominante declarada (informacional, comparativa, transacional, navegacional) | — | P1 | M | Brasil GEO | Matriz intenção × página em `content/INTENT-MAP.md` | `content/INTENT-MAP.md` novo |
| GEO-IPOG-030 | **Originalidade aparente** — texto original (não scraped/spun); LLMs detectam pegada autoral; uso de exemplos próprios da Brasil GEO/IPOG | — | P0 | M | Brasil GEO | Voice Guard sem violações; sem duplicate content cross-domain | `content/VOICE-GUIDE.md` enforced |
| GEO-IPOG-031 | **Clareza da promessa** — primeira frase da página declara o benefício específico para a persona-alvo; sem clichês como "transforme sua carreira" | — | P1 | M | Brasil GEO | Lead canônico revisado em todas as páginas de curso | `content/CLICHES-PROIBIDOS.md` enforced |
| GEO-IPOG-032 | **Primeira dobra** — acima da dobra: H1, tese curta, prova social mínima (selo MEC ou CFP), CTA primário visível sem rolagem | — | P0 | M | Brasil GEO | Auditoria visual em 360x640, 1366x768, 1920x1080 | `audits/reports/above-fold-{YYYY-MM-DD}.md` |
| GEO-IPOG-033 | **CTA** — CTA primário com verbo de ação concreto (matricular, falar com consultor, baixar ementa); cor de destaque consistente; rastreado em GA4 | — | P0 | M | Brasil GEO | CTA primário com `data-ga-event` em 100% das páginas de curso | GA4 evento `cta_primary_click` ativo |
| GEO-IPOG-034 | **Formulários** — formulários de matrícula/contato com validação inline; campos mínimos canônicos (nome, e-mail, telefone, modalidade); LGPD-compliant | — | P0 | N | Brasil GEO | UX teste em mobile; conversão de form-view → form-submit ≥ 8% | `audits/reports/forms-conversion-{YYYY-MM-DD}.csv` |
| GEO-IPOG-035 | **WhatsApp** — botão WhatsApp clicável com `wa.me/{numero}?text={contexto-da-pagina}`; rastreado em GA4 como `click_outbound_whatsapp` | — | P1 | N | Brasil GEO | WhatsApp click em 100% das páginas de curso; texto pré-preenchido contextual | GA4 evento `click_outbound_whatsapp` |
| GEO-IPOG-036 | **Telefone clicável** — telefones canônicos usam `<a href="tel:...">`; visível em mobile no topo e rodapé; mesmo número em Schema `ContactPoint` | — | P1 | N | Brasil GEO | 100% dos telefones com `tel:` link; bate com `ContactPoint.telephone` | `audits/reports/contactpoint-consistency-{YYYY-MM-DD}.md` |
| GEO-IPOG-037 | **Jornada de conversão** — funil declarado: descoberta → consideração → matrícula → onboarding; cada estágio com landing + CTA + evento GA4 | — | P0 | N | Brasil GEO | Funil documentado em `content/JORNADA-CONVERSAO.md`; eventos GA4 mapeados | `content/JORNADA-CONVERSAO.md` novo |

---

## Eixo 5 — Entidade, cobertura semântica e cobertura GEO (missões 38 a 53)

Dimensão dominante: como o site sinaliza identidade de marca + escopo de oferta para LLMs, e como cobre semanticamente os termos canônicos da área de Psicologia de modo a maximizar recuperabilidade generativa sem cair em canibalização ou diluição de entidade.

**Wave de execução dominante:** N (Entidade + Cobertura semântica).

| ID | Missão | NAIA | Sev | Wave | Owner | Critério de done | Saída esperada |
|---|---|---|---|---|---|---|---|
| GEO-IPOG-038 | **Entidade principal** — `Organization` canônica do IPOG com `@id` estável, declarada em todas as páginas via `@graph` reconciliado | NAIA-A001 | P0 | N | Brasil GEO | `@id` da Organization presente em 100% das páginas | `src/lib/schemas/publisher.ts` |
| GEO-IPOG-039 | **Categoria do negócio** — `Organization` com `additionalType: "EducationalOrganization"` + classificação CNAE 85.41-4-00 (educação superior — pós-graduação) | NAIA-A | P1 | N | Brasil GEO | `additionalType` declarado; CNAE consistente em conteúdo visível | `audits/reports/category-coherence-{YYYY-MM-DD}.md` |
| GEO-IPOG-040 | **Serviços principais** — 5 modalidades canônicas declaradas como `EducationalOccupationalProgram` separados, cada um com `programType` correto | NAIA-B | P0 | N | Brasil GEO | 5 modalidades com schema declarado e validado | `src/lib/schemas/educational-program.ts` |
| GEO-IPOG-041 | **Território citado no conteúdo** — cobertura territorial declarada: 51 cidades CNPJ-próprio + polos por convênio; cada cidade-âncora com página local | NAIA-G | P1 | N+O | Brasil GEO | `LocalBusiness` por unidade nas 24 cidades médias estratégicas | `audits/reports/territory-coverage-{YYYY-MM-DD}.md` [Issue #65] |
| GEO-IPOG-042 | **Cobertura semântica** — termos canônicos da área cobertos por pelo menos uma página dedicada: neuropsicologia, TCC, ACT, DBT, EMDR, avaliação psicológica, POT, psicopedagogia | — | P0 | N | Brasil GEO | Matriz termo × página com 100% dos termos canônicos cobertos | `content/TERM-COVERAGE-MATRIX.md` novo |
| GEO-IPOG-043 | **Termos relacionados** — co-ocorrência de termos relacionados na mesma página (semantic anchoring): TCC ↔ Beck, EMDR ↔ Shapiro, ACT ↔ Hayes, avaliação ↔ SATEPSI | — | P1 | N | Brasil GEO | Análise de co-ocorrência com ≥ 3 termos relacionados por página-âncora | `audits/reports/term-co-occurrence-{YYYY-MM-DD}.csv` |
| GEO-IPOG-044 | **Perguntas frequentes** — `FAQPage` Schema com ≥ 10 Q&A por página de curso; perguntas batendo com prompts canônicos do `KIT-PROMPTS-V0` | NAIA-C | P0 | N | Brasil GEO | 100% das páginas de curso com FAQPage ≥ 10 Q&A | `audits/reports/faq-coverage-{YYYY-MM-DD}.csv` |
| GEO-IPOG-045 | **Answer capsules** — todo H2 da seção FAQ tem resposta extraível em 2-4 frases (formato citável); resposta completa em parágrafo aberto a seguir | — | P0 | N | Brasil GEO | Auditoria de "capsule density" ≥ 80% nas FAQs | `audits/reports/answer-capsules-{YYYY-MM-DD}.md` |
| GEO-IPOG-046 | **Definições curtas** — termos técnicos com definição operacional em 1-2 frases marcada com `DefinedTerm` Schema; glossário canônico cross-link | — | P1 | N | Brasil GEO | 115+ termos no glossário com `DefinedTerm` aplicado | `content/GLOSSARIO-PSICOLOGIA.md` |
| GEO-IPOG-047 | **Blocos comparativos** — comparativos com ≥ 3 tabelas mobile-first; comparação metodológica explícita (Ao Vivo vs EAD, MBA vs Lato Sensu) | — | P1 | N | Brasil GEO | 8+ comparativos publicados (já entregues bateria 13-05-2026) | `src/pages/comparativos/` |
| GEO-IPOG-048 | **Glossário** — glossário canônico publicado, com 5 clusters (TEA, TDAH, Burnout, Avaliação, Clínica), cada termo com `DefinedTerm` + cross-link | — | P1 | N | Brasil GEO | Glossário com 100+ termos publicado | `src/pages/glossario/` ativo |
| GEO-IPOG-049 | **Conteúdo citável** — pelo menos 1 blockquote canônico por peça HBR, em formato extraível: "X% das matrículas em pós-graduação em Psicologia EAD" | — | P0 | N | Brasil GEO | Cada peça HBR-grade com ≥ 1 blockquote canônico citável | `content/CITABLE-PASSAGES.md` novo |
| GEO-IPOG-050 | **Redundância semântica saudável** — termo-âncora repetido ≥ 3 vezes em variações canônicas (sigla + nome completo + sinônimo regulatório) | — | P2 | N | Brasil GEO | Auditoria de termo-âncora com ≥ 3 ocorrências variadas | `audits/reports/anchor-redundancy-{YYYY-MM-DD}.csv` |
| GEO-IPOG-051 | **Coerência entre páginas** — terminologia consistente cross-páginas; CFP é sempre "Conselho Federal de Psicologia" no primeiro uso; MEC sempre "Ministério da Educação" | — | P1 | N | Brasil GEO | Voice Guard com term coherence check ativo | `scripts/voice_guard.py` enforced |
| GEO-IPOG-052 | **Canibalização temática** — zero pares de páginas competindo pela mesma intenção dominante; cada termo tem uma página-âncora declarada | — | P1 | N | Brasil GEO | Matriz de canibalização com zero pares conflitantes | `audits/reports/cannibalization-{YYYY-MM-DD}.md` |
| GEO-IPOG-053 | **Diluição de entidade** — Schema `Organization` único cross-páginas; sem variações de nome ("IPOG Pós", "Ipog", "iPOG"); `name` canônico em todos os schemas | — | P0 | N | Brasil GEO | `name` canônico igual em 100% dos schemas Organization | `scripts/check-entity-coherence.mjs` novo |

---

## Eixo 6 — Schema.org e dados estruturados (missões 54 a 71)

Dimensão dominante: schema é o canal de mais alta densidade semântica para LLMs. Cobertura completa, consistência cross-páginas e ausência de inflação/duplicação são pré-requisito para citação correta.

**Wave de execução dominante:** O (Schema completion).

| ID | Missão | NAIA | Sev | Wave | Owner | Critério de done | Saída esperada |
|---|---|---|---|---|---|---|---|
| GEO-IPOG-054 | **Organization schema** — `EducationalOrganization` na home, com `legalName`, `foundingDate`, `address`, `accreditation` MEC, `sameAs` ≥ 4 perfis | NAIA-A001-A005 | P0 | O | Brasil GEO | 100% dos checks NAIA-A001 a A009 OK | `audits/reports/org-schema-{YYYY-MM-DD}.md` |
| GEO-IPOG-055 | **LocalBusiness schema** — `LocalBusiness` por unidade nas cidades-âncora (Goiânia HQ + 24 cidades médias) com `address`, `geo`, `openingHours` | NAIA-A | P1 | O | Brasil GEO | 25 unidades com `LocalBusiness` publicado | `src/lib/schemas/local-business.ts` novo [Issue #65] |
| GEO-IPOG-056 | **WebSite schema** — `WebSite` declarado com `potentialAction` `SearchAction` apontando para `/?s={search_term_string}` | NAIA-E | P1 | O | Brasil GEO | `WebSite` no `@graph` da home com SearchAction válido | `Base.astro` @graph |
| GEO-IPOG-057 | **WebPage schema** — toda página produtiva com `WebPage` ou subclasse (`AboutPage`, `ContactPage`, `CollectionPage`); `primaryImageOfPage` declarado | — | P1 | O | Brasil GEO | 100% das páginas com WebPage/subclasse | `audits/reports/webpage-schema-{YYYY-MM-DD}.csv` |
| GEO-IPOG-058 | **BreadcrumbList** — toda página interna com `BreadcrumbList` Schema refletindo a navegação canônica | NAIA-C | P1 | O | Brasil GEO | 100% das páginas internas com Breadcrumb | `src/components/Breadcrumbs.astro` |
| GEO-IPOG-059 | **FAQPage** — `FAQPage` em todas as páginas de curso + páginas dedicadas a Q&A; cada `Question` com `Answer.text` ≥ 80 caracteres | NAIA-C | P0 | O | Brasil GEO | 100% das páginas de curso com FAQPage validado | `audits/reports/faqpage-{YYYY-MM-DD}.md` |
| GEO-IPOG-060 | **Service schema** — `Service` nas páginas de serviços institucionais (avaliação corporativa, consultoria B2B saúde mental) | — | P2 | O | Brasil GEO | `Service` declarado em todas as páginas B2B | `src/lib/schemas/service.ts` novo |
| GEO-IPOG-061 | **Article schema** — todo artigo editorial com `Article` ou `ScholarlyArticle` (peças citando literatura científica); `author` e `publisher` reconciliados via `@id` | NAIA-C | P0 | O | Brasil GEO | 100% dos artigos com Article + author + publisher | `src/components/Article.astro` |
| GEO-IPOG-062 | **Person schema** — corpo docente com `Person` canônico, `knowsAbout`, `sameAs` (Lattes, ORCID, LinkedIn), `hasCredential` | NAIA-D | P0 | O | Brasil GEO | 100% do corpo docente com Person validado | `src/lib/schemas/person-*.ts` |
| GEO-IPOG-063 | **ImageObject** — imagens críticas (foto institucional, hero, fotos do corpo docente) com `ImageObject` declarado: `url`, `width`, `height`, `caption` | — | P2 | O | Brasil GEO | ImageObject em 100% das imagens críticas | `audits/reports/imageobject-{YYYY-MM-DD}.csv` |
| GEO-IPOG-064 | **ContactPoint** — `Organization.contactPoint` com `telephone`, `email`, `contactType: "customer service"`, `availableLanguage: "pt-BR"` | — | P1 | O | Brasil GEO | ContactPoint canônico bate com telefone/e-mail visível | `src/lib/schemas/publisher.ts` |
| GEO-IPOG-065 | **sameAs** — `Organization.sameAs` ≥ 6 perfis verificados (LinkedIn, Instagram, YouTube, Facebook, Wikipedia, Wikidata) | NAIA-A005 | P1 | O | Brasil GEO | 6+ sameAs canônicos validados como acessíveis | `audits/reports/sameas-{YYYY-MM-DD}.csv` |
| GEO-IPOG-066 | **@id da entidade** — IRIs canônicas estáveis para Organization, Person, Course, Article cross-páginas; nunca mudam após publicação | NAIA-A009 | P0 | O | Brasil GEO | Auditoria de `@id` com zero IRIs órfãs ou inconsistentes | `scripts/check-graph-ids.mjs` novo |
| GEO-IPOG-067 | **Coerência entre schema e conteúdo visível** — `Course.name`, `Person.name`, `Article.headline` batem com texto visível na página | — | P0 | O | Brasil GEO | Checksum schema↔HTML com zero divergências | `scripts/check-schema-html-coherence.mjs` |
| GEO-IPOG-068 | **Dados estruturados inflados** — zero propriedades schema declarando dados que não aparecem visualmente (rating sem reviews, aggregateRating sem fonte) | — | P0 | O | Brasil GEO | Auditoria de "structured data inflation" com zero violações | `audits/reports/inflated-schema-{YYYY-MM-DD}.md` |
| GEO-IPOG-069 | **Dados estruturados ausentes** — zero páginas críticas sem schema mínimo (WebPage + Breadcrumb + Organization @graph) | — | P0 | O | Brasil GEO | 100% das páginas críticas com schema mínimo | `audits/reports/missing-schema-{YYYY-MM-DD}.csv` |
| GEO-IPOG-070 | **Schema duplicado** — zero duplicação de `@id` cross-página; zero `Organization` declarada múltiplas vezes na mesma página | — | P1 | O | Brasil GEO | Auditoria sem `@id` duplicado | `scripts/check-graph-ids.mjs` (mesmo de 066) |
| GEO-IPOG-071 | **Schema inconsistente** — Course.provider bate com Organization.@id; Person.affiliation bate com Organization; sem schema "solto" sem âncora | — | P0 | O | Brasil GEO | Validação `@graph` cross-referenciada OK | Google Rich Results Test + Schema Validator OK |

---

## Eixo 7 — Citabilidade GEO e infraestrutura LLM (missões 72 a 89)

Dimensão dominante: o site é construído para ser citável e recuperável por motores generativos, com infraestrutura específica (llms-full.txt, ai-citations.json, entity-map.json) e mensuração explícita de attribution gap e zero-click risk.

**Wave de execução dominante:** P (Citabilidade GEO + Infraestrutura LLM).

| ID | Missão | NAIA | Sev | Wave | Owner | Critério de done | Saída esperada |
|---|---|---|---|---|---|---|---|
| GEO-IPOG-072 | **Citabilidade GEO** — toda peça canônica passa pelo Citability Score (≥ 70/100) usando `lesson-audit V2026` ou equivalente | NAIA-I | P0 | P | Brasil GEO | Score médio ≥ 70 nas peças HBR-grade | `dashboards/citability-score-trend.csv` |
| GEO-IPOG-073 | **Recuperabilidade generativa** — bateria de prompts canônicos extrai resposta certa em ≥ 60% dos casos cross-LLM (cohort: ChatGPT, Claude, Gemini, Perplexity, Grok, Copilot) | NAIA-I | P0 | P | Brasil GEO | Mention Rate ≥ 60% por persona-cluster | `dashboards/mention-rate-history.csv` |
| GEO-IPOG-074 | **Risco de pseudo-GEO** — auditoria contra padrões de pseudo-GEO (texto inflado por sinônimos, definições artificiais, FAQs robóticas) | — | P0 | P | Brasil GEO | Voice Guard 2.0 v2026 com pseudo-GEO check ativo | `scripts/voice_guard.py` v2.0 |
| GEO-IPOG-075 | **Linguagem promocional excessiva** — texto factual ≥ 70%; promocional ≤ 30%; zero superlativos sem evidência ("melhor", "líder", "referência") | — | P1 | P | Brasil GEO | Voice Guard com promo:fact ratio ≤ 0,3 | `content/VOICE-GUIDE.md` enforced |
| GEO-IPOG-076 | **Linguagem factual** — claims sempre ancorados em fonte declarada (MEC, CFP, ABEP, paper com DOI, dado primário Brasil GEO) | — | P0 | P | Brasil GEO | Toda claim numérica com citação ou link de fonte | `content/CHECKLIST-PUBLICACAO.md` enforced |
| GEO-IPOG-077 | **Fontes externas** — peças canônicas citam ≥ 3 fontes externas verificáveis (MEC, CFP, Wikipedia, periódico acadêmico) com link funcional | NAIA-J | P1 | P | Brasil GEO | Média ≥ 3 fontes externas por peça HBR-grade | `audits/reports/external-sources-{YYYY-MM-DD}.csv` |
| GEO-IPOG-078 | **Autoria** — `Article.author` declarado com `Person` canônico (Alexandre Caramaschi + corpo docente IPOG); nunca "Equipe Brasil GEO" sem Person | NAIA-D | P0 | P | Brasil GEO | 100% dos artigos com author = Person canônico | `src/lib/schemas/person-*.ts` |
| GEO-IPOG-079 | **Data de publicação** — `Article.datePublished` em ISO 8601 visível também no HTML; nunca data de "publicação eterna" | — | P1 | P | Brasil GEO | 100% dos artigos com datePublished consistente HTML ↔ Schema | `audits/reports/date-coherence-{YYYY-MM-DD}.csv` |
| GEO-IPOG-080 | **Data de atualização** — `Article.dateModified` atualizada a cada edição material; visível como "Atualizado em ..." no HTML | — | P1 | P | Brasil GEO | dateModified ≥ datePublished em 100% dos artigos | `audits/reports/datemod-{YYYY-MM-DD}.csv` |
| GEO-IPOG-081 | **llms-full.txt** — `/llms-full.txt` publicado com tese + evidências canônicas por documento, ≥ 45 entries | NAIA-E | P0 | P | Brasil GEO | `/llms-full.txt` válido com ≥ 45 entries | `public/llms-full.txt` [brasilgeo-portal: ativo] |
| GEO-IPOG-082 | **ai-citations.json** — `/ai-citations.json` publicado em `/.well-known/` com bateria de claims canônicos + evidência + fonte | — | P0 | P | Brasil GEO | `/.well-known/ai-citations.json` retorna 200 com ≥ 50 entries | `public/.well-known/ai-citations.json` novo |
| GEO-IPOG-083 | **entity-map.json** — `/entity-map.json` mapeando entidades canônicas (Organization, Person, Course, Concept) com `@id` + sinônimos + cross-refs | — | P0 | P | Brasil GEO | `/.well-known/entity-map.json` com 100+ entidades | `public/.well-known/entity-map.json` novo |
| GEO-IPOG-084 | **knowledge-base.json** — `/knowledge-base.json` consolidando KB GEO/AISO 2026 em formato extraível por MCP | — | P1 | P | Brasil GEO | `/.well-known/knowledge-base.json` retorna 200 | `public/.well-known/knowledge-base.json` novo |
| GEO-IPOG-085 | **Política para bots de IA** — `/.well-known/ai-policy.json` (JSON-LD manifesto) declara política de uso por crawler/LLM | NAIA-E | P0 | P | Brasil GEO | `/.well-known/ai-policy.json` válido | `public/.well-known/ai-policy.json` [brasilgeo-portal: ativo] |
| GEO-IPOG-086 | **Crawler access para LLMs** — `robots.txt` permite explicitamente GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, OAI-SearchBot | NAIA-E | P0 | P | Brasil GEO | Lista canônica de user-agents permitida em `robots.txt` | `audits/ROBOTS-SITEMAP-CHECKLIST.md` [gating-ipog: Issue #6] |
| GEO-IPOG-087 | **Compression fidelity** — quando LLM cita o conteúdo, fragmento citado bate semanticamente com tese canônica (não distorce) | — | P1 | P | Brasil GEO | Bateria mensal de "fidelity check" cross-LLM em prompts canônicos | `dashboards/compression-fidelity-{YYYY-MM}.md` |
| GEO-IPOG-088 | **Attribution gap** — diferença entre citações em LLMs e tráfego rastreado em GA4 medida e reportada; mitigação via UTMs canônicas | — | P0 | P | Brasil GEO | Attribution gap ≤ 60% (benchmark Datos Insights 2025: ~70%) | `dashboards/attribution-gap.md` [Issue #43] |
| GEO-IPOG-089 | **Zero-click risk** — taxa de zero-click por persona × cluster medida; conteúdo extraível dosado para sustentar autoridade sem perder funil | — | P1 | P | Brasil GEO | Zero-click rate por cluster reportado mensalmente | `dashboards/zero-click-risk.md` |

---

## Eixo 8 — Confiança institucional e E-E-A-T (missões 90 a 109)

Dimensão dominante: sinais que LLMs e usuários humanos usam para julgar Experience, Expertise, Authoritativeness e Trustworthiness. É a camada onde a marca prova que é real, regulada e responsável.

**Wave de execução dominante:** Q (E-E-A-T institucional).

| ID | Missão | NAIA | Sev | Wave | Owner | Critério de done | Saída esperada |
|---|---|---|---|---|---|---|---|
| GEO-IPOG-090 | **Página Sobre** — `/sobre` com fundação, missão, números (alunos, anos, polos), reconhecimentos MEC + CFP, fotos institucionais | NAIA-G | P0 | Q | Brasil GEO | `/sobre` publicada com `AboutPage` Schema | `src/pages/sobre/` |
| GEO-IPOG-091 | **Página Contato** — `/fale-conosco` com `ContactPage` Schema, endereço físico, telefones por unidade, WhatsApp, e-mail; horário declarado | NAIA-G | P0 | Q | Brasil GEO | `/fale-conosco` com ContactPage + ContactPoint canônicos | `src/pages/fale-conosco/` |
| GEO-IPOG-092 | **Política de Privacidade** — `/politica-de-privacidade` LGPD-compliant, base legal declarada, controles do titular, contato do encarregado (DPO) | — | P0 | Q | Brasil GEO | `/politica-de-privacidade` publicada e linkada em todas as páginas | `src/pages/politica-de-privacidade/` |
| GEO-IPOG-093 | **Termos de Uso** — `/termos-de-uso` com regras de uso do portal, propriedade intelectual, foro, política de cancelamento | — | P1 | Q | Brasil GEO | `/termos-de-uso` publicada e linkada no rodapé | `src/pages/termos-de-uso/` |
| GEO-IPOG-094 | **LGPD** — cookie banner consent-mode v2 ativo; opt-out funcional; banner não bloqueia conteúdo crítico ao crawler | — | P0 | Q | Brasil GEO | Consent Mode v2 ativo em GA4 | `scripts/consent-mode-v2.js` [Issue #78] |
| GEO-IPOG-095 | **Autoria editorial** — política de autoria publicada em `/equipe-editorial` ou similar; declara critérios de revisão, hierarquia editorial | — | P1 | Q | Brasil GEO | Política editorial publicada com Person canônicos | `src/pages/equipe-editorial/` novo |
| GEO-IPOG-096 | **Página de autor** — toda Person que assina artigo tem página dedicada (`/autores/{slug}`) com bio, credenciais, Lattes, ORCID, sameAs | NAIA-D | P0 | Q | Brasil GEO | 100% dos autores assinantes com página própria | `src/pages/autores/` |
| GEO-IPOG-097 | **Equipe** — `/equipe` ou `/corpo-docente` com perfis individuais; foto, formação, credenciais, área de atuação, Person Schema | NAIA-D | P0 | Q | Brasil GEO | Corpo docente completo publicado com Person canônico | `src/pages/corpo-docente/` |
| GEO-IPOG-098 | **Cases publicados** — ≥ 6 cases canônicos de aluno/egresso por modalidade, com Person + depoimento citável + resultado mensurável | — | P1 | Q | Brasil GEO | 6+ cases publicados por modalidade-âncora | `src/pages/cases/` novo |
| GEO-IPOG-099 | **Depoimentos** — depoimentos com `Review` Schema + foto + Person identificado (não anônimo); ratings honestos quando aplicáveis | — | P1 | Q | Brasil GEO | Depoimentos com Review canônico em páginas de curso | `audits/reports/reviews-{YYYY-MM-DD}.csv` |
| GEO-IPOG-100 | **Prova social visível** — selos MEC + CFP/ABRAP/FBT + logos de parceiros institucionais visíveis na home e em páginas de curso | NAIA-G | P0 | Q | Brasil GEO | Selo MEC em 100% das páginas de curso; CFP/ABRAP/FBT em Especialização Clínica | `src/components/SeloProvaSocial.astro` |
| GEO-IPOG-101 | **Fotos reais** — fotos institucionais reais (sede, sala de aula, eventos); zero stock photos genéricas nas páginas-âncora | — | P1 | Q | Brasil GEO | Galeria institucional com ≥ 20 fotos reais publicadas | `audits/reports/photo-authenticity-{YYYY-MM-DD}.md` |
| GEO-IPOG-102 | **Endereço** — endereço físico canônico (Hub Cerrado Goiânia + sedes regionais) visível no rodapé + página Contato + `PostalAddress` Schema | NAIA-A004 | P0 | Q | Brasil GEO | Endereço bate em 3 lugares: rodapé, /fale-conosco, PostalAddress | `audits/reports/address-coherence-{YYYY-MM-DD}.md` |
| GEO-IPOG-103 | **CNPJ visível** — CNPJ institucional canônico declarado em rodapé + página Sobre + `Organization.taxID` | NAIA-G | P0 | Q | Brasil GEO | CNPJ presente nos 3 lugares canônicos | `audits/reports/cnpj-coherence-{YYYY-MM-DD}.md` |
| GEO-IPOG-104 | **Credenciais** — credenciais institucionais (autorização MEC, parecer CNE, Resoluções CFP aplicáveis) declaradas com `hasCredential` + visível | NAIA-A006 | P0 | Q | Brasil GEO | hasCredential canônico com URL pública de verificação | `src/lib/schemas/publisher.ts` |
| GEO-IPOG-105 | **Certificações** — certificações por modalidade (CFP 23/2022 Avaliação, ABRAP TCC/ACT, FBT TCC) declaradas em páginas de curso aplicáveis | — | P0 | Q | Brasil GEO | Certificações declaradas em 100% das Especializações Clínicas | `src/components/CertificacaoBlock.astro` novo |
| GEO-IPOG-106 | **Selos** — selos visuais de regulação (MEC, CFP, ABRAP, FBT, CAPES) + ano de validade visível; nunca selo sem validade declarada | — | P1 | Q | Brasil GEO | Selos canônicos com ano de validade visível | `src/components/SeloProvaSocial.astro` |
| GEO-IPOG-107 | **Garantias** — política de garantia/cancelamento declarada (prazo, condições, contato); coerente entre páginas e Termos de Uso | — | P2 | Q | Brasil GEO | Garantia declarada em página de curso + Termos de Uso | `src/components/GarantiaBlock.astro` novo |
| GEO-IPOG-108 | **Histórico** — linha do tempo institucional (25 anos de pós-graduação executiva IPOG) com marcos canônicos verificáveis | — | P1 | Q | Brasil GEO | Timeline com ≥ 10 marcos canônicos publicada | `src/pages/sobre/historico/` novo |
| GEO-IPOG-109 | **Clareza institucional** — todas as páginas críticas respondem em 3 segundos ao usuário: quem é a marca, o que oferece, onde está, como contatar | — | P0 | Q | Brasil GEO | Teste de "5 perguntas em 5 segundos" passa em usabilidade | `audits/reports/clareza-institucional-{YYYY-MM-DD}.md` |

---

## Eixo 9 — Priorização operacional (missão 110)

Dimensão dominante: a matriz que define a ordem de execução das 109 missões anteriores, considerando severidade, dependência, custo e impacto esperado.

| ID | Missão | NAIA | Sev | Wave | Owner | Critério de done | Saída esperada |
|---|---|---|---|---|---|---|---|
| GEO-IPOG-110 | **Prioridade de ação** — matriz canônica `impacto × esforço` com 110 missões classificadas em 4 quadrantes (quick wins, projetos, fillers, deprioritizar); revisada a cada checkpoint mensal com Ronan Maia | — | P0 | L | Alexandre Caramaschi | Matriz publicada com 110 entradas + decisão registrada em ata | `audits/PRIORIZACAO-110-MISSOES.md` novo |

---

## Mapeamento eixo → wave operacional

| Wave | Janela operacional | Eixos cobertos | Missões | Dependências |
|---|---|---|---|---|
| **L** — Crawlability + Performance baseline | 19-05-2026 a 02-06-2026 (W21-W22) | 1, 2 | 1-20, 110 | NAIA-F, NAIA-H |
| **M** — SEO on-page + Conteúdo editorial | 02-06-2026 a 16-06-2026 (W23-W24) | 3, 4 (parte 1) | 21-32 | `content/PADRAO-EDITORIAL.md` |
| **N** — Entidade + Cobertura semântica + Jornada | 16-06-2026 a 30-06-2026 (W25-W26) | 4 (parte 2), 5 | 33-53 | KIT-PROMPTS-V0; GA4 destravado [Issue #36] |
| **O** — Schema completion | 30-06-2026 a 14-07-2026 (W27-W28) | 6 | 54-71 | Schema piloto ipog.edu.br [Issue #61, gating-ipog] |
| **P** — Citabilidade GEO + Infraestrutura LLM | 14-07-2026 a 28-07-2026 (W29-W30) | 7 | 72-89 | llms-full.txt + ai-policy.json [brasilgeo-portal: já ativos] |
| **Q** — E-E-A-T institucional | 28-07-2026 a 11-08-2026 (W31-W32) | 8 | 90-109 | Acesso editorial IPOG [gating-ipog] |

## Cronograma de inserção no ciclo de captação

- **Pico captação 2026.2 (15-07-2026 a 31-08-2026):** waves L, M, N e O precisam estar **concluídas até 15-07-2026** para entrar no pico com cobertura completa.
- **Pico captação 2027.1 (01-12-2026 a 15-02-2027):** waves P e Q ampliam a base entre 14-07 e 11-08-2026; resíduo operacional + iteração até 30-11-2026 com base na telemetria de Fase 4.

## Governance e cadência

1. **Revisão mensal com Ronan Maia (CEO IPOG):** matriz de priorização (missão 110) + status por wave + decisões de destravamento.
2. **Sincronização quinzenal com Bruno Azambuza (Marketing IPOG):** entregáveis por wave + bloqueios de acesso + parcerias com veículos.
3. **Smoke audit mensal NAIA:** bateria completa de 100+ checks em `ipog.edu.br` (auditoria) + `posgraduacaopsicologia.com` (execução demonstrativa).
4. **Coleta cross-LLM diária:** mention rate, share-of-voice, citation quality, conforme `dashboards/RUNBOOK-COLETA-LLM.md`.

## Issues do GitHub a abrir por wave (opcional)

Quando a equipe decidir transformar missões em issues no repo `alexandrebrt14-sys/geo-ipog`, recomenda-se:

- 1 epic por wave (`[L] Crawlability + Performance baseline`, etc.).
- 1 issue por missão com label `geo-ipog-{ID}` + severidade (`p0`, `p1`, `p2`) + wave (`wave-l`, `wave-m`, ...) + status (`gating-ipog` quando aplicável).
- Closeout do epic só com 100% das missões P0 fechadas e P1 com pelo menos 80%.

## Cross-links canônicos

- `audits/PLAYBOOK-AUDITORIA-NAIA.md` — taxonomia NAIA original (A-J)
- `audits/SCHEMA-PATTERNS.md` — padrões Schema canônicos por modalidade
- `audits/LLMS-TXT-TEMPLATE.md` — template e governança do `llms.txt`
- `audits/ROBOTS-SITEMAP-CHECKLIST.md` — checklist de robots e sitemap
- `dashboards/METRICAS-CANONICAS.md` — KPIs e Cláusula 0 (5 modalidades)
- `dashboards/RUNBOOK-COLETA-LLM.md` — operação de coleta cross-LLM
- `prompts/KIT-PROMPTS-V0.md` — kit canônico de prompts-âncora
- `content/PADRAO-EDITORIAL.md` — padrão HBR aplicado
- `docs/framework/01-rotinas-e-missoes-geo.md` — framework conceitual GEO
- `ROADMAP.md` — fases 0-4 e waves operacionais
- `STATUS.md` — registro operacional de sprints

---

**Próxima revisão programada:** 2026-06-15 (após fechamento de Wave L) ou no checkpoint mensal com Ronan Maia, o que vier primeiro.
