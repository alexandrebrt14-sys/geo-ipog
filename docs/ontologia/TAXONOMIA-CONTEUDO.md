# Taxonomia de Conteúdo — Programa GEO IPOG

> **Status:** vigente desde 2026-05-10
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Próxima revisão:** 10-08-2026 (trimestral)

Definição prescritiva da hierarquia de conteúdo, naming de arquivos, labels GitHub, taxonomia de URL e organização de pastas do programa GEO IPOG. Sem taxonomia rígida, cada peça de conteúdo cabe em vários lugares e Entity Consistency Score sofre.

A lógica é prescritiva: cada peça de conteúdo cabe em **exatamente um lugar** na hierarquia. Tagueamento por dimensão (labels) é ortogonal — uma issue pode ter labels de 5+ dimensões simultâneas.

---

## 1. Mapa de pastas canônicas

```
geo-ipog/
├── README.md                              # entrada
├── STATUS.md                              # snapshot semanal vivo
├── ROADMAP.md                             # 4 fases (visão cliente)
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── .github/                               # config GitHub
│   ├── PROJECT.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── ISSUE_TEMPLATE/
│   ├── workflows/
│   └── CODEOWNERS
├── audits/                                # diagnósticos e benchmarking
│   ├── PLAYBOOK-AUDITORIA-NAIA.md
│   ├── SCHEMA-PATTERNS.md
│   ├── LLMS-TXT-TEMPLATE.md
│   ├── ROBOTS-SITEMAP-CHECKLIST.md
│   ├── auditoria-naia-{YYYY-MM-DD}/      # auditorias mensais (a criar)
│   ├── schema-implementations/            # snapshots JSON-LD por página (a criar)
│   ├── llms-txt-versions/                 # versões do llms.txt (a criar)
│   ├── concorrentes-monitoring/           # snapshots quinzenais workflow
│   ├── regional/                          # docs regionais (NAIA-310 a 317)
│   └── benchmarking/                      # dossiês concorrentes + reports
│       ├── README.md
│       ├── ARQUETIPOS-CONCORRENCIA-EDUCACAO.md
│       ├── SINTESE-EXECUTIVA.md
│       ├── ONDA-2-CORRECOES-PREMISSA.md
│       ├── matriz-presenca-llm.md
│       ├── matriz-tecnica-schema-seo.md
│       ├── pontos-fortes-a-superar.md
│       ├── concorrente-{slug}.md          # 10 dossiês
│       ├── MERCADO-2026-NOTICIAS.md
│       ├── REGIONAL-2026-ESTADOS-CIDADES.md
│       └── PAPERS-2025-2026-PROFUNDIDADE.md
├── content/                               # padrões editoriais
│   ├── PADRAO-EDITORIAL.md
│   ├── VOICE-GUIDE.md
│   ├── BLOOM-KNOWLES.md
│   ├── CLICHES-PROIBIDOS.md
│   ├── ACENTUACAO-PT-BR.md
│   ├── GLOSSARIO-PSICOLOGIA.md            # termos canônicos (knowsAbout)
│   ├── BRIEFING-TEMPLATE.md
│   ├── EXERCICIO-TEMPLATE.md
│   ├── CHECKLIST-AUTOAVALIACAO.md
│   └── CHECKLIST-PUBLICACAO.md
├── prompts/                               # kit de prompts
│   ├── KIT-PROMPTS-V0.md
│   ├── PAPEIS-DE-COLETA.md
│   ├── PROMPT-{papel}.md                  # 5 papéis
│   ├── CALIBRACAO-MENSAL.md
│   └── QUERIES-REGIONAIS-CANONICAS.md
├── dashboards/                            # mensuração e disciplina
│   ├── METRICAS-CANONICAS.md
│   ├── KPI-DASHBOARD.md                   # painel ao vivo
│   ├── RUNBOOK-COLETA-LLM.md
│   └── FINOPS-DISCIPLINA.md
├── data/                                  # raw datasets
│   └── baseline-llm-{fase}/{YYYY-MM-DD}/  # logs JSONL
├── docs/                                  # governança e contexto
│   ├── 01-kickoff-30-04-2026.md
│   ├── 02-contexto-mba-online-psicologia.md
│   ├── 03-reunioes-e-cadencia-ipog.md
│   ├── 04-definicao-de-done.md
│   ├── 05-risk-register.md
│   ├── 06-marcos-criticos-2026.md
│   ├── HEALTHCHECK-{YYYY-MM-DD}.md
│   ├── CONTEXTO-AMPLIADO-{YYYY-MM-DD}.md
│   ├── ROADMAP_2026Q2-Q4.md               # masterplan CTO
│   ├── ontologia/                         # esta pasta
│   │   ├── README.md
│   │   ├── ONTOLOGIA-CANONICA.md
│   │   ├── TAXONOMIA-CONTEUDO.md          # este arquivo
│   │   ├── KNOWLEDGE-GRAPH-IPOG.md
│   │   └── SCHEMA-IPOG-CANONICAL.md
│   ├── framework/                         # framework conceitual
│   │   ├── 01-rotinas-e-missoes-geo.md
│   │   ├── 02-quality-gate-5-camadas.md
│   │   ├── 03-pipeline-5-llms.md
│   │   ├── 04-client-context-abstraction.md
│   │   └── 05-estrategia-regional-geo-educacao.md
│   ├── board-report/                      # apresentação Conselho
│   ├── tech-stack/                        # roadmap técnico
│   ├── atas/{YYYY-MM-DD}-ipog-{tipo}.md
│   ├── relatorios-semanais/{YYYY-WNN}-{de}-a-{ate}.md
│   ├── relatorios-mensais/{YYYY-MM}.md
│   └── relatorios-trimestrais/{YYYY-Q{N}}.md
```

### 1.1 Regras de organização

- **Pasta = dimensão operacional.** `audits/` é diagnóstico; `content/` é padrão editorial; `docs/` é governança e contexto.
- **Subpasta = especialização vertical.** `audits/benchmarking/` é benchmarking; `audits/regional/` é regional.
- **Arquivo na raiz da pasta = doc canônico do escopo.** `content/PADRAO-EDITORIAL.md` é o padrão editorial mestre; subdocs vão em subpasta.
- **Versionamento por data ou onda no naming, não em pasta.** `HEALTHCHECK-2026-05-10.md` em `docs/`, não `docs/healthchecks/2026-05-10/`.

---

## 2. Naming convention de arquivos

### 2.1 Documentos vivos (atualizados)

`{TIPO}-{YYYY-MM-DD}.md` ou `{TIPO}.md` quando há apenas um.

- `HEALTHCHECK-2026-05-10.md` ✓
- `STATUS.md` ✓ (único, sempre atualizado)
- `KPI-DASHBOARD.md` ✓ (único, atualizado in-place)

### 2.2 Documentos por evento

`{YYYY-MM-DD}-ipog-{tipo}.md`

- `docs/atas/2026-04-30-ipog-kickoff.md` ✓
- `docs/atas/2026-05-13-ipog-extraordinaria.md` ✓

### 2.3 Documentos por onda/sprint

`{YYYY-WNN}-{de}-a-{ate}.md` para semana ISO.

- `docs/relatorios-semanais/2026-W19-04-a-10-maio.md` ✓

### 2.4 Documentos canônicos numerados

`{NN}-{slug-em-kebab}.md`

- `docs/01-kickoff-30-04-2026.md` ✓
- `docs/framework/01-rotinas-e-missoes-geo.md` ✓

### 2.5 Anti-padrões proibidos

- ALL CAPS em meio de slug: `docs/HealthCheck-2026.md` ✗
- Acentos em filename: `docs/auditoria-mês.md` ✗
- Sufixos vagos: `docs/ARTIGO-FINAL.md` ✗ (use slug semântico)
- Espaços no filename: `docs/ata kickoff.md` ✗
- Separação mista: `docs/ata_kickoff-final.md` ✗ (use kebab-case puro)

---

## 3. Labels GitHub — taxonomia em 14 dimensões ortogonais

Cada issue ganha **3 a 7 labels** — uma por dimensão relevante. Issue sem labels é issue não-classificada (queda de Entity Consistency interna).

### 3.1 Catálogo canônico

| Dimensão | Prefixo | Valores canônicos | Quando aplicar |
|---|---|---|---|
| **priority** | `priority:` | p0, p1, p2, p3 | sempre |
| **phase** (Fases do programa) | `phase:` | fase-1, fase-2, fase-3, fase-4, operacao-continua | sempre que vincular ao milestone |
| **quarter** (CTO masterplan) | `quarter:` | q2-2026, q3-2026, q4-2026, q1-2027 | quando issue tem onda CTO |
| **vetor** (5 vetores do programa) | `vetor:` | v1-geo-tecnico, v2-citacao, v3-editorial, v4-autoridade, v5-moat-regional | sempre — define qual alavanca a issue ataca |
| **cluster** (clusters semânticos) | `cluster:` | organizacional, clinica-neuro-tcc, psicopedagogia, transversal | quando issue tem foco vertical Psi |
| **persona** (7 personas-alvo) | `persona:` | rh-nao-psicologo, recem-graduado, clinico-estabelecido, profissional-saude, educador, transicao-carreira, coach | quando issue mira persona específica |
| **horizon** (3 horizontes estratégicos) | `horizon:` | tatico (0-90d), operacional (90-365d), estrategico (1-3a) | sempre |
| **janela** (janelas curtas competitivas) | `janela:` | 30d, 60d, 90d, 180d | quando issue tem deadline competitivo de janela curta |
| **tipo** (tipo de trabalho) | `type:` | governance, observability, quality-gate, security, finops, audit-finding, roadmap, content-piece, schema, llms-txt, robots-waf, wikipedia, monitoramento, benchmarking | sempre |
| **owner** | `owner:` | alexandre, bruno, ronan, subagent-opus, client, external, ti-ipog, juridico-ipog | sempre |
| **gate** (quality gates) | `gate:` | voice-guard, schema-jsonld, secret-scan, migration-pt-br, visual-double-check, vercel-finops, shopify-snapshot | quando issue exige gate específico antes de merge |
| **blocker** (bloqueadores) | `blocker:` | decision-pending, critical-path, client-deadline | quando issue está bloqueada |
| **concorrente** (granular para tracking) | `concorrente:` | estacio, anhanguera, uninter, unicesumar, puc-minas, cetcc, ibneuro, sirio-libanes, wpos-anhembi, saint-paul, vittude, zenklub | quando issue ataca movimento competitivo específico |
| **risco** (vínculo a risco catalogado) | `risk:` | r-001 a r-019 | quando issue mitiga risco específico do registro |

### 3.2 Anti-redundância

A label `prioridade-alta` (sem prefixo) e a label `priority:p0` (com prefixo) são **redundantes**. Migração proposta: descontinuar gradualmente o conjunto sem prefixo. Manter ambos durante 30 dias, depois remover sem prefixo.

A label `gating-ipog` (sem prefixo) é equivalente a `blocker:decision-pending` + `owner:client`. Migração: substituir.

A label `fase-1` é equivalente ao milestone `Fase 1 — Baseline + Schema piloto`. Migração: usar **milestone** como fonte canônica de fase, descontinuar label.

### 3.3 Combinação típica

Exemplo de issue bem labelada:

```
#44 [Janela 30d] Capturar fuga de matrículas Cogna -32,2% EAD 1T26

Labels:
- priority:p0
- phase:fase-1 (vinculado ao milestone)
- quarter:q2-2026
- vetor:v3-editorial
- vetor:v5-moat-regional
- cluster:transversal
- persona:recem-graduado
- horizon:tatico
- janela:30d
- type:content-piece
- owner:alexandre
- gate:voice-guard
- gate:schema-jsonld
- concorrente:anhanguera
- risk:r-014
```

São 13 labels. Não é exagero — é precisão de Entity Consistency interna do projeto. Permite filtrar pelo board "issues com janela:30d AND vetor:v5 AND owner:alexandre" e obter exatamente o que importa esta semana.

### 3.4 Migração de labels existentes

Plano de transição (executar gradualmente em 30 dias):

| Label antiga (descontinuar) | Label nova (canônica) | Ação |
|---|---|---|
| `prioridade-alta` | `priority:p0` (ou `priority:p1` conforme contexto) | duplicar e descontinuar antiga |
| `prioridade-media` | `priority:p2` | duplicar e descontinuar |
| `prioridade-baixa` | `priority:p3` | duplicar e descontinuar |
| `fase-1`, `fase-2`, `fase-3`, `fase-4` | usar milestone equivalente | preferir milestone |
| `gating-ipog` | `blocker:decision-pending` + `owner:client` | duplicar e descontinuar |
| `correcao-premissa` | `type:audit-finding` | duplicar e descontinuar |
| `auditoria` | `type:audit-finding` | duplicar e descontinuar |
| `onda-1`, `onda-2`, `onda-3`, `onda-4` | criar `wave:onda-N` se útil; senão integrar em `quarter:` | avaliar caso-a-caso |
| `fonte-cliente` | `owner:client` | duplicar e descontinuar |
| `framework` | `type:governance` | duplicar e descontinuar |

### 3.5 Labels novas a criar

Quando a migração começar (issue dedicada a abrir), criar:

```
vetor:v1-geo-tecnico       (#1F77B4 azul)
vetor:v2-citacao           (#FF7F0E laranja)
vetor:v3-editorial         (#2CA02C verde)
vetor:v4-autoridade        (#9467BD roxo)
vetor:v5-moat-regional     (#8C564B marrom)

cluster:organizacional     (#8957e5 roxo claro — manter cor existente)
cluster:clinica-neuro-tcc  (#ec407a rosa — manter cor existente)
cluster:psicopedagogia     (#ff9800 laranja — manter cor existente)
cluster:transversal        (#9E9E9E cinza)

persona:rh-nao-psicologo   (#0E8A16 verde — produto P0)
persona:recem-graduado     (#1ABC9C ciano — produto P0)
persona:clinico-estabelecido (#117A65 verde escuro)
persona:profissional-saude (#3498DB azul claro)
persona:educador           (#F39C12 amarelo)
persona:transicao-carreira (#7F8C8D cinza-azulado)
persona:coach              (#BDC3C7 cinza claro)

horizon:tatico             (#C0392B vermelho — 0-90d)
horizon:operacional        (#E67E22 laranja escuro — 90-365d)
horizon:estrategico        (#34495E azul-marinho — 1-3a)

janela:30d                 (#B60205 vermelho intenso)
janela:60d                 (#D93F0B laranja)
janela:90d                 (#FBCA04 amarelo)
janela:180d                (#5319E7 roxo)

risk:r-001 a risk:r-019    (#922B21 vinho — vinculação a risco)

concorrente:estacio        (#1F6FEB azul Estácio)
concorrente:anhanguera     (#1F77B4)
concorrente:uninter        (#0E8A16)
concorrente:unicesumar     (#FBCA04)
concorrente:puc-minas      (#9C27B0)
concorrente:cetcc          (#EC407A)
concorrente:ibneuro        (#FF9800)
concorrente:sirio-libanes  (#D4C5F9)
concorrente:wpos-anhembi   (#26C6DA)
concorrente:saint-paul     (#37474F)
concorrente:vittude        (#26A69A)
concorrente:zenklub        (#5C6BC0)
```

---

## 4. Issue templates atualizados

Os 6 templates atuais cobrem audit-finding, citation-gap, content-piece, gating-decision-ipog, incident, schema-task. Proposta de evolução:

### 4.1 Adicionar 4 templates

- `regional-task.yml` — para issues NAIA-310+ vinculadas à Frente Regional
- `content-piece-hbr.yml` — peça HBR-grade com gate Voice Guard 2.0 obrigatório
- `risk-mitigation.yml` — para issues que mitigam risco R-XXX específico
- `competitive-window.yml` — para issues de janela curta (30d/60d/90d)

### 4.2 Manter os 6 atuais

Adicionar nos templates existentes os campos das novas dimensões (vetor, persona, horizon, janela) como dropdowns.

---

## 5. Taxonomia de URL

### 5.1 ipog.edu.br (cliente)

```
/                                    Home institucional
/cursos/                             Hub de pós-graduação (canônico)
/cursos/{slug-curso}/                Página de curso (Schema Course)
/programas/                          Hub de programas (EducationalOccupationalProgram)
/programas/mba-psicologia-{cluster}/ Programa por cluster
/unidades/                           Hub das 51 unidades
/unidades/{slug-cidade}/             Unidade local (Schema EducationalOrganization)
/corpo-docente/                      Lista de docentes
/corpo-docente/{slug-docente}/       Perfil docente (Schema Person)
/blog/                               Peças HBR-grade publicadas em ipog.edu.br
/blog/{slug-artigo}/                 Artigo individual
/llms.txt                            llms.txt canônico
/robots.txt                          robots.txt aberto a IA crawlers
/sitemap.xml                         sitemap mestre
/sitemap-cursos.xml                  sitemap específico
/sitemap-unidades.xml                sitemap regional (51 unidades)
```

### 5.2 alexandrecaramaschi.com (Brasil GEO)

```
/                                    Home Alexandre + Brasil GEO
/educacao/                           Cursos próprios
/educacao/{slug-curso}/              Curso individual
/insights/{slug-artigo}/             Peça HBR-grade assinada por Alexandre
/sobre/                              Bio Alexandre + credencial canônica
```

### 5.3 Slugs

- ASCII puro
- kebab-case
- sem acentos
- sem caracteres especiais
- preferir 4-7 palavras quando puder
- estável (não muda após publish; redirect 301 quando precisar)

---

## 6. Cross-links

- `docs/ontologia/README.md` — entrada da pasta
- `docs/ontologia/ONTOLOGIA-CANONICA.md` — entidades + relacionamentos + propriedades
- `docs/ontologia/KNOWLEDGE-GRAPH-IPOG.md` — grafo Wikidata-ready
- `docs/ontologia/SCHEMA-IPOG-CANONICAL.md` — JSON-LD concreto
- `.github/PROJECT.md` — board v2 #6
- `.github/ISSUE_TEMPLATE/` — templates atuais
- `audits/SCHEMA-PATTERNS.md` — templates Schema.org
