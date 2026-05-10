## Descrição

Resumo do que este PR entrega e por que está sendo proposto agora.

## Tipo de mudança

- [ ] `feat` — nova funcionalidade ou artefato
- [ ] `fix` — correção de erro
- [ ] `docs` — documentação
- [ ] `audit` — artefatos de auditoria
- [ ] `content` — peças editoriais
- [ ] `schema` — Schema.org
- [ ] `prompts` — kit de prompts-âncora
- [ ] `ci` — pipelines/automações
- [ ] `chore` — manutenção interna

## Vinculação ao roadmap

### Marco (8 marcos M1-M8)

- [ ] M1 — Bootstrap (11-05 a 07-06)
- [ ] M2 — Pré-pico 2026.2 (08-06 a 05-07)
- [ ] M3 — Pico 2026.2 (06-07 a 16-08)
- [ ] M4 — Pós-pico calibração (17-08 a 27-09)
- [ ] M5 — Operação contínua (28-09 a 08-11)
- [ ] M6 — Pré-pico 2027.1 (09-11 a 20-12)
- [ ] M7 — Pico 2027.1 (21-12 a 28-02-2027)
- [ ] M8 — Pós-pico 2027.1 (01-03-2027 em diante)
- [ ] Recorrente operacional

### Vetor primário (5 vetores)

- [ ] V1 — GEO técnico (Schema + llms.txt + robots + sitemap)
- [ ] V2 — Engenharia de citação (prompt-âncora + cross-LLM + gap mapping)
- [ ] V3 — Editorial HBR-grade (peças + Voice Guard 2.0)
- [ ] V4 — Autoridade externa (Wikipedia + Reddit + YouTube + mídia)
- [ ] V5 — Moat regional 51 cidades CNPJ-próprio
- [ ] Transversal QA & Observability
- [ ] Transversal Governança

### Framework GEO acoplado (6 frameworks F1-F6)

- [ ] F1 — 9 Enriquecimentos GEO (Aggarwal KDD 2024)
- [ ] F2 — AutoGEO Rule-Extraction (Wang ICLR 2026)
- [ ] F3 — Structural Feature Engineering (Chen 2025)
- [ ] F4 — AgenticGEO Self-Evolving (preprint 2025)
- [ ] F5 — Wikipedia + Knowledge Graph
- [ ] F6 — Citation Mechanics by Engine
- [ ] Não aplica framework específico

## Issue vinculada

Closes #

## Checklist canônico (DoD `docs/gestao/DEFINITION-OF-DONE-CANONICO.md`)

### Universal

- [ ] Texto em Português do Brasil com acentuação completa
- [ ] Sem emojis em qualquer arquivo do PR
- [ ] Naming canônico respeitado (Brasil GEO, IPOG, MBA Online de Psicologia, nomes próprios completos)
- [ ] Conventional Commits no histórico do PR
- [ ] Branch nomeada com prefixo correto (`feat/`, `audit/`, `content/`, `schema/`, `prompts/`, `fix/`, `ci/`, `chore/`, `docs/`)
- [ ] Sem dados sensíveis (PII de candidatos/alunos, credenciais, exports brutos do CRM IPOG)
- [ ] `quality.yml` workflow passou (markdown lint + link check)

### Quando o PR adiciona/modifica peça editorial HBR-grade

- [ ] Padrão editorial 6 elementos (`content/PADRAO-EDITORIAL.md`)
- [ ] **Voice Guard 2.0 score ≥ 7/9 enriquecimentos** (gate Aggarwal KDD 2024)
- [ ] Bloom 3+ aplicado em CTAs e exercícios
- [ ] Sem clichês das 3 deny-lists
- [ ] Glossário Psicologia respeitado
- [ ] Schema Article + Person validado em Rich Results Test + Schema.org Validator
- [ ] Cross-link para Course/Program canônico
- [ ] Aprovação Bruno antes do publish

### Quando o PR adiciona/modifica Schema.org

- [ ] Template canônico `docs/ontologia/SCHEMA-IPOG-CANONICAL.md` seguido
- [ ] `@id` da ontologia aplicado (`org:ipog`, `unit:<cidade>`, etc.)
- [ ] JSON-LD validado em Rich Results Test (HTTP 200, sem erros)
- [ ] JSON-LD validado em Schema.org Validator (sem erros)
- [ ] Snapshot arquivado em `audits/schema-implementations/{YYYY-MM-DD}-{slug}.json`

### Quando o PR adiciona/modifica llms.txt

- [ ] Template `audits/LLMS-TXT-TEMPLATE.md` seguido
- [ ] Naming canônico (IPOG, Brasil GEO, MBA Online de Psicologia [Cluster])
- [ ] Robots.txt complementar com whitelist GPTBot/ClaudeBot/PerplexityBot/Google-Extended
- [ ] Snapshot em `audits/llms-txt-versions/{YYYY-MM-DD}.txt`

### Quando o PR adiciona resultados de coleta cross-LLM

- [ ] Cohort fechado (ChatGPT/Claude/Gemini/Perplexity/Grok/Copilot)
- [ ] Versão pinada de cada modelo registrada
- [ ] N mínimo atingido (50 prompts/LLM/leitura)
- [ ] Logs JSONL em `data/baseline-llm-{fase}/{YYYY-MM-DD}/`
- [ ] Drift detection rodado
- [ ] Custo registrado em `dashboards/FINOPS-DISCIPLINA.md`

## Compliance regulatório (marque apenas quando aplicável)

- [ ] Conteúdo afirma autorização MEC, reconhecimento de curso ou validade nacional do certificado — **revisado pelo jurídico/acadêmico IPOG**
- [ ] Conteúdo faz claims sobre exercício profissional pós-especialização (CFP, registro profissional) — **revisado pelo jurídico IPOG**
- [ ] Mudança em propriedade digital IPOG ao vivo (Schema em produção, llms.txt, página publicada) — **aprovada por Bruno Azambuja**
- [ ] Decisão regional (Frente 51 cidades) — **aprovada por Ronan Maia**

## Skill aplicado / Squad responsável

Selecione quais squads do `docs/gestao/SQUADS-E-SKILLS.md` estão envolvidas:

- [ ] Squad Schema (V1)
- [ ] Squad Citação (V2)
- [ ] Squad Editorial (V3)
- [ ] Squad Autoridade (V4)
- [ ] Squad Regional (V5)
- [ ] Squad QA & Observability
- [ ] Squad Governança

## Métricas a impactar

Quais KPIs canônicos este PR pretende mover (em horizonte qual):

- [ ] KPI 1 — LLM Mention Rate
- [ ] KPI 2 — Share-of-Voice
- [ ] KPI 3 — Citation Quality Score
- [ ] KPI 4 — Schema Coverage Score (NAIA)
- [ ] KPI 5 — Cobertura fontes externas
- [ ] KPI 6 — Velocidade fechamento P0
- [ ] KPI 7 — Conversion Lift por canal LLM
- [ ] KPI 8 — Delta pré/pós Schema
- [ ] Não impacta KPI canônico diretamente
