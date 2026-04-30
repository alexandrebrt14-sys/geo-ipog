# Playbook de Auditoria Técnica NAIA — IPOG

> **Status:** vigente desde 2026-04-30
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-04-30

## Por que este playbook existe

O programa Brasil GEO + IPOG depende de uma auditoria técnica recorrente que identifique gaps de presença em LLMs, fragilidades de Schema.org, falhas de sinalização para crawlers de IA e oportunidades de adensar autoridade declarada. NAIA é o nome operacional da bateria de auditoria que executamos sobre o domínio `ipog.edu.br` e seus ativos críticos. Este documento é a fonte de verdade do escopo, da bateria de checks, do formato de relatório, da escala de severidade e da governança de tickets.

A auditoria NAIA não substitui SEO clássico — ela complementa, focando em sinais que LLMs e crawlers de IA priorizam: dados estruturados ricos, declaração explícita de autoridade, fontes externas confiáveis, llms.txt, sitemap canônico, FAQs estruturadas, biografia de corpo docente com Lattes/ORCID, schema de cursos completo. A meta é que ChatGPT, Claude, Gemini, Perplexity, Grok e Copilot citem o IPOG por nome, com formato declarado, carga horária correta, autorização MEC mencionada e diferencial editorial reconhecido.

## Escopo da auditoria

### Domínio raiz

`https://ipog.edu.br` — institucional do IPOG.

### Hub central

`https://ipog.edu.br/cursos/pos-graduacao` — listagem canônica de pós-graduação. É o nó âncora de toda a vertical educacional e o destino preferido de citações dos LLMs.

### Páginas de curso individuais

Toda URL `https://ipog.edu.br/cursos/pos-graduacao/{slug}` referente ao MBA Online de Psicologia e cursos correlatos da grande área. Inclui as três grandes ramificações do programa:

1. Psicologia organizacional, do trabalho e RH.
2. Clínica, neuropsicologia, TCC e avaliação psicológica.
3. Psicopedagogia, escolar e educação.

### Páginas institucionais auxiliares

- `/sobre` — apresentação institucional, fundação, MEC, números.
- `/corpo-docente` — perfis individuais de professores.
- `/blog` — produção editorial vigente.
- `/fale-conosco` — contato canônico.
- `/politica-de-privacidade` — LGPD.

### Ativos técnicos obrigatórios

- `https://ipog.edu.br/sitemap.xml`
- `https://ipog.edu.br/robots.txt`
- `https://ipog.edu.br/llms.txt` (criação prevista — ver `audits/LLMS-TXT-TEMPLATE.md`)
- Headers HTTP de `/`, do hub e de pelo menos 5 páginas de curso amostradas.

## O que coletar em cada auditoria

| Artefato | Origem | Periodicidade | Owner técnico |
|---|---|---|---|
| HTML renderizado completo | `curl --compressed` + render headless quando JS-heavy | Mensal | Brasil GEO |
| Sitemap.xml integral | GET direto | Mensal | Brasil GEO |
| Robots.txt | GET direto | Mensal | Brasil GEO |
| Llms.txt | GET direto | Mensal | Brasil GEO |
| JSON-LD presente | extraído do HTML | Mensal | Brasil GEO |
| Headers HTTP (status, cache, content-type, X-Robots-Tag) | HEAD + GET | Mensal | Brasil GEO |
| Core Web Vitals quando relevante | PageSpeed Insights API | Trimestral | Brasil GEO |
| Menções externas | busca cross-LLM + Google site: + Common Crawl | Mensal | Brasil GEO |
| Resposta de LLMs aos prompts canônicos do KIT-PROMPTS-V0 | bateria multi-LLM diária | Diário | Brasil GEO |

## Bateria de checks NAIA — 100+ verificações

A tabela abaixo lista todos os checks executados pela auditoria. Cada check tem um ID estável (`NAIA-XXX`), categoria, descrição, severidade default e camada onde o resultado é reportado. Severidade default pode ser elevada quando o impacto observado for maior que o esperado.

### Categoria A — Schema.org institucional

| ID | Check | Severidade default |
|---|---|---|
| NAIA-001 | EducationalOrganization presente em `/` | P0 |
| NAIA-002 | EducationalOrganization tem `legalName` declarado | P1 |
| NAIA-003 | EducationalOrganization tem `foundingDate` declarado | P1 |
| NAIA-004 | EducationalOrganization tem `address` PostalAddress completo | P1 |
| NAIA-005 | EducationalOrganization tem `sameAs` com no mínimo 4 perfis verificados | P1 |
| NAIA-006 | EducationalOrganization tem `accreditation` mencionando e-MEC | P0 |
| NAIA-007 | EducationalOrganization tem `numberOfStudents` quando disponível | P2 |
| NAIA-008 | EducationalOrganization tem `aggregateRating` quando aplicável | P2 |
| NAIA-009 | `@id` da organização é canônico e consistente em todas as páginas | P1 |
| NAIA-010 | EducationalOrganization aparece referenciada como `provider` em cada Course | P0 |

### Categoria B — Schema.org de curso

| ID | Check | Severidade default |
|---|---|---|
| NAIA-020 | Course presente em cada página de curso individual | P0 |
| NAIA-021 | Course tem `name` exato igual ao H1 da página | P1 |
| NAIA-022 | Course tem `description` com no mínimo 160 caracteres | P1 |
| NAIA-023 | Course tem `provider` apontando para EducationalOrganization | P0 |
| NAIA-024 | Course tem `educationalCredentialAwarded` mencionando especialização lato sensu reconhecida pelo MEC | P0 |
| NAIA-025 | Course tem `timeRequired` em formato ISO 8601 (`P12M` etc.) | P1 |
| NAIA-026 | Course tem `courseMode` declarado (`online`, `blended` etc.) | P1 |
| NAIA-027 | Course tem `inLanguage` declarado | P2 |
| NAIA-028 | Course tem `hasCourseInstance` quando há datas de turmas | P2 |
| NAIA-029 | Course tem `offers` Offer com price e availability | P1 |
| NAIA-030 | Course tem `numberOfCredits` ou carga horária estruturada | P1 |
| NAIA-031 | EducationalOccupationalProgram presente quando programa é abrangente (ex.: MBA) | P1 |
| NAIA-032 | EducationalOccupationalProgram tem `programType` "MBA" quando aplicável | P2 |
| NAIA-033 | EducationalOccupationalProgram tem `applicationDeadline` quando há janela definida | P2 |

### Categoria C — Schema.org de FAQ e blog

| ID | Check | Severidade default |
|---|---|---|
| NAIA-040 | FAQPage presente em página de curso quando há FAQ | P1 |
| NAIA-041 | FAQPage tem mainEntity Question/Answer estruturados | P0 |
| NAIA-042 | Cada Question tem texto não trivial (mínimo 30 caracteres) | P2 |
| NAIA-043 | Cada Answer tem texto não trivial (mínimo 80 caracteres) | P2 |
| NAIA-044 | Article ou BlogPosting presente em cada peça de blog | P0 |
| NAIA-045 | Article tem `author` Person | P0 |
| NAIA-046 | Article tem `publisher` EducationalOrganization (IPOG) | P1 |
| NAIA-047 | Article tem `datePublished` e `dateModified` | P1 |
| NAIA-048 | Article tem `articleBody` ou `description` | P2 |
| NAIA-049 | Article tem `keywords` relevantes | P2 |
| NAIA-050 | Article tem `headline` com no máximo 110 caracteres | P2 |

### Categoria D — Schema.org de pessoas (corpo docente)

| ID | Check | Severidade default |
|---|---|---|
| NAIA-060 | Person presente em cada perfil de docente | P0 |
| NAIA-061 | Person tem `jobTitle` declarado | P1 |
| NAIA-062 | Person tem `worksFor` referenciando IPOG | P0 |
| NAIA-063 | Person tem `hasCredential` listando formação acadêmica | P1 |
| NAIA-064 | Person tem `hasCredential` listando registro CRP/CFP quando aplicável | P0 |
| NAIA-065 | Person tem `sameAs` com Lattes | P1 |
| NAIA-066 | Person tem `sameAs` com ORCID quando disponível | P2 |
| NAIA-067 | Person tem `sameAs` com LinkedIn | P2 |
| NAIA-068 | Person tem `award` quando aplicável | P3 |

### Categoria E — Llms.txt e sinais para crawlers de IA

| ID | Check | Severidade default |
|---|---|---|
| NAIA-080 | `/llms.txt` existe e retorna 200 | P0 |
| NAIA-081 | Llms.txt segue spec Anthropic (header H1 com nome da organização, descrição curta) | P1 |
| NAIA-082 | Llms.txt lista hub central como link prioritário | P0 |
| NAIA-083 | Llms.txt lista 5+ páginas-pilar do MBA Online de Psicologia | P1 |
| NAIA-084 | Llms.txt declara áreas-foco com clareza | P1 |
| NAIA-085 | Llms.txt declara contato canônico | P2 |
| NAIA-086 | Llms.txt declara posicionamento institucional sem clichês | P1 |
| NAIA-087 | Llms.txt tem versão acompanhada (data de última atualização) | P2 |
| NAIA-088 | Decisão sobre deny crawlers de IA está documentada formalmente | P1 |

### Categoria F — Sitemap e robots

| ID | Check | Severidade default |
|---|---|---|
| NAIA-100 | Sitemap.xml retorna 200 e content-type `application/xml` | P0 |
| NAIA-101 | Sitemap declara apenas uma árvore canônica (sem múltiplos geradores conflitantes) | P0 |
| NAIA-102 | Cada URL no sitemap tem `lastmod` realista (não toda hoje) | P1 |
| NAIA-103 | Cada URL no sitemap tem `priority` coerente | P2 |
| NAIA-104 | Sitemap segrega por tipo (cursos, blog, institucional) ou usa sitemap-index | P2 |
| NAIA-105 | Robots.txt retorna 200 e content-type `text/plain` | P0 |
| NAIA-106 | Robots.txt tem allow-list explícita para crawlers de LLM (GPTBot, ClaudeBot, Google-Extended, PerplexityBot, GoogleOther) | P0 |
| NAIA-107 | Robots.txt declara `Sitemap:` apontando para sitemap canônico | P0 |
| NAIA-108 | Robots.txt não bloqueia globalmente CSS/JS (impacta render de LLM crawlers) | P1 |
| NAIA-109 | Canonicals presentes em cada página principal | P0 |
| NAIA-110 | Redirects são 301 (não 302) quando definitivos | P1 |

### Categoria G — Conteúdo declarado e autoridade

| ID | Check | Severidade default |
|---|---|---|
| NAIA-120 | Hub central tem texto institucional com no mínimo 600 palavras | P1 |
| NAIA-121 | Hub central declara reconhecimento MEC/e-MEC explicitamente | P0 |
| NAIA-122 | Hub central lista pelo menos 5 áreas de pós-graduação | P1 |
| NAIA-123 | Hub central tem cross-links para páginas-pilar do MBA Online de Psicologia | P0 |
| NAIA-124 | Cada página de curso declara coordenador acadêmico nominal | P1 |
| NAIA-125 | Cada página de curso declara corpo docente com no mínimo 5 perfis | P1 |
| NAIA-126 | Cada página de curso lista grade curricular completa | P1 |
| NAIA-127 | Página de curso lista pelo menos 3 perguntas frequentes estruturadas em FAQPage | P1 |
| NAIA-128 | Página de curso declara autorização MEC com número quando aplicável | P0 |
| NAIA-129 | Página de curso declara modalidade (Ao Vivo síncrono / gravado / híbrido) sem ambiguidade | P0 |
| NAIA-130 | Página de curso declara carga horária total e a divisão (síncrono / assíncrono / TCC) | P1 |
| NAIA-131 | Página de curso declara critério de aprovação e emissão de certificado | P1 |
| NAIA-132 | Página de curso declara política de cancelamento e devolução | P2 |
| NAIA-133 | Cada perfil docente tem mini-bio com formação, registro profissional e linha de pesquisa | P1 |

### Categoria H — Performance e fundamentos

| ID | Check | Severidade default |
|---|---|---|
| NAIA-150 | Página principal carrega em menos de 4s em 4G simulado | P2 |
| NAIA-151 | Núcleo Web Vital LCP < 2.5s | P2 |
| NAIA-152 | Núcleo Web Vital CLS < 0.1 | P2 |
| NAIA-153 | TTFB < 800ms | P2 |
| NAIA-154 | HTTPS válido com certificado não expirado em até 30 dias | P1 |
| NAIA-155 | HSTS habilitado | P3 |
| NAIA-156 | Headers de segurança básicos (X-Content-Type-Options, X-Frame-Options) | P3 |

### Categoria I — Citações cross-LLM

| ID | Check | Severidade default |
|---|---|---|
| NAIA-170 | IPOG citado por nome correto em ChatGPT para 60%+ dos prompts canônicos | P1 |
| NAIA-171 | IPOG citado por nome correto em Claude para 60%+ dos prompts canônicos | P1 |
| NAIA-172 | IPOG citado por nome correto em Gemini para 60%+ dos prompts canônicos | P1 |
| NAIA-173 | IPOG citado por nome correto em Perplexity para 80%+ dos prompts canônicos (RAG-native) | P0 |
| NAIA-174 | IPOG citado por nome correto em Grok para 50%+ dos prompts canônicos | P2 |
| NAIA-175 | IPOG citado por nome correto em Copilot para 60%+ dos prompts canônicos | P1 |
| NAIA-176 | Quando IPOG é citado, formato declarado (especialização lato sensu MEC) está correto | P0 |
| NAIA-177 | Quando IPOG é citado, carga horária está correta | P1 |
| NAIA-178 | Quando IPOG é citado, autorização MEC é mencionada | P1 |
| NAIA-179 | Quando IPOG é citado, diferencial editorial é reconhecido | P2 |
| NAIA-180 | Concorrentes citados em primeiro lugar antes do IPOG nos clusters principais | P1 |

### Categoria J — Autoridade externa

| ID | Check | Severidade default |
|---|---|---|
| NAIA-200 | Wikipedia tem entrada para IPOG | P2 |
| NAIA-201 | LinkedIn Company verificada existe | P1 |
| NAIA-202 | E-MEC retorna IPOG na busca por nome canônico | P0 |
| NAIA-203 | Pelo menos 5 fontes externas reputadas citam IPOG no contexto Psicologia em 2026 | P1 |
| NAIA-204 | Pelo menos 3 fontes acadêmicas (Lattes, ORCID, Repositórios institucionais) referenciam corpo docente IPOG | P2 |

## Critérios de severidade

| Severidade | Definição | SLA de mitigação |
|---|---|---|
| P0 | Bloqueador. Impacta diretamente a capacidade de LLMs identificarem o IPOG, ou o produto contradiz fato canônico (modalidade errada, ausência de Schema, fato MEC errado). | 5 dias úteis |
| P1 | Alto impacto. Reduz qualidade da citação ou autoridade declarada. Conserta na próxima onda editorial. | 15 dias úteis |
| P2 | Médio impacto. Otimização de cobertura ou enriquecimento de Schema. Backlog priorizado por sprint. | 30 dias úteis |
| P3 | Baixo impacto. Polimento. Backlog não bloqueia ondas. | Quando houver folga operacional |

Severidade pode ser elevada para um nível superior quando o impacto cross-LLM observado for maior que o esperado, especialmente em Perplexity (RAG-native).

## Fluxo da auditoria

O fluxo padrão executa em ciclo mensal e segue seis etapas. Coleta acontece em janela de 24 horas; análise consome 48 horas; relatório é entregue em até 5 dias úteis após o fim da coleta.

```
input (escopo + KIT-PROMPTS-V0)
  -> coleta tecnica (HTML, sitemap, robots, llms.txt, JSON-LD, headers)
  -> coleta cross-LLM (bateria de prompts canonicos x 6 LLMs)
  -> analise (passa pelos 100+ checks NAIA-XXX)
  -> relatorio (Markdown estruturado em secoes A-J)
  -> priorizacao (P0 -> P3, com SLA por severidade)
  -> abertura de tickets (GitHub Issues do repo geo-ipog)
  -> validacao com IPOG (Bruno) antes do encerramento
```

## Formato do relatório

O relatório de auditoria é entregue como Markdown único em `audits/relatorios/NAIA-YYYY-MM.md`. A estrutura é fixa:

1. **Sumário executivo** — 5 a 10 bullets com os achados mais críticos.
2. **Seção A — Schema institucional** — quadro com checks NAIA-001 a NAIA-010, status (passou / falhou / parcial), severidade e ação proposta.
3. **Seção B — Schema de curso** — checks NAIA-020 a NAIA-033, com amostragem de pelo menos 5 páginas de curso.
4. **Seção C — Schema de FAQ e blog** — checks NAIA-040 a NAIA-050.
5. **Seção D — Schema de pessoas** — checks NAIA-060 a NAIA-068.
6. **Seção E — Llms.txt e sinais para crawlers de IA** — checks NAIA-080 a NAIA-088.
7. **Seção F — Sitemap e robots** — checks NAIA-100 a NAIA-110.
8. **Seção G — Conteúdo declarado e autoridade** — checks NAIA-120 a NAIA-133.
9. **Seção H — Performance e fundamentos** — checks NAIA-150 a NAIA-156.
10. **Seção I — Citações cross-LLM** — quadro com checks NAIA-170 a NAIA-180, agrupados por LLM, com taxa de menção observada.
11. **Seção J — Autoridade externa** — checks NAIA-200 a NAIA-204.
12. **Mapa de tickets** — lista numerada de issues a abrir, cada uma com ID NAIA-XXX, severidade, descrição curta e proposta de mitigação.
13. **Comparativo com auditoria anterior** — quadro de delta (quantos P0 fechados, abertos, quais voltaram).
14. **Anexos** — JSON-LD bruto extraído, headers HTTP, exemplos de respostas dos LLMs.

## Governança de tickets

Todo achado P0 ou P1 vira issue no repositório `geo-ipog`. Convenção:

- Título: `[NAIA-XXX] descrição curta`.
- Labels: `naia`, `severidade-pX`, `categoria-Y`.
- Corpo: contexto, evidência, ação proposta, owner sugerido, SLA.
- Milestone: onda editorial em andamento.

P2 e P3 entram em backlog priorizado por sprint, revisado quinzenalmente por Bruno Azambuja e Alexandre Caramaschi.

## Cadência

| Atividade | Cadência |
|---|---|
| Coleta técnica completa | Mensal |
| Coleta cross-LLM (bateria de prompts canônicos) | Diária |
| Relatório NAIA completo | Mensal |
| Validação operacional com IPOG | Quinzenal |
| Recalibração do KIT-PROMPTS-V0 | Mensal |
| Revisão deste playbook | Trimestral |

## Cross-links

- Bateria de prompts auditada — `prompts/KIT-PROMPTS-V0.md`.
- Padrões Schema.org — `audits/SCHEMA-PATTERNS.md`.
- Llms.txt template — `audits/LLMS-TXT-TEMPLATE.md`.
- Robots e sitemap — `audits/ROBOTS-SITEMAP-CHECKLIST.md`.
- KPIs do programa — `dashboards/METRICAS-CANONICAS.md`.
- Runbook de coleta cross-LLM — `dashboards/RUNBOOK-COLETA-LLM.md`.
- Quality gate editorial — `docs/framework/02-quality-gate-5-camadas.md`.
- Pipeline de 5 LLMs — `docs/framework/03-pipeline-5-llms.md`.
