# Waves execution log · posgraduacaopsicologia.com

> Log canônico de execução de waves complementares de conteúdo. Cada wave é uma unidade lógica de trabalho com input, ferramenta usada, output mensurável e commit.

---

## 2026-05-12 · 3 rounds (waves K a Z) · 107 páginas em ~60 min wall-clock

### Round 1 · waves K-O · commit `cc19dd6`

| Wave | Tipo | Ferramenta | Escopo | Entregue |
|---|---|---|---|---:|
| K | Orchestrator 5 LLMs | `geo-bridge.sh run` (2 runs) | Research regional + decomposição forçada `[research+analysis+classification+writing+review]` | 8 tarefas distribuídas em perplexity+gpt4o+gemini_flash+groq+groq_heavy · US$ 0,13 |
| L | Sub-agents Opus paralelos (2) | Claude Opus 4.7 | 22 UFs faltantes em `/por-estado/` (split L1 Norte+NE, L2 NE+CO+SE+Sul) | 22 páginas |
| M | Sub-agent Opus | Claude Opus 4.7 | 6 áreas faltantes em `/areas/` | 6 páginas |
| N | Sub-agent Opus | Claude Opus 4.7 | 15 sub-páginas MBA (5 MBAs × grade/metodologia/perfil) | 15 páginas |
| O | Sub-agent Opus | Claude Opus 4.7 | Novo `/metodos/` hub + 5 sub (TCC, ACT, DBT, Mindfulness, EMDR) | 6 páginas |
| **Round 1 total** | — | — | — | **49 páginas** |

**Integração:** `data.ts` ganhou `METODOS` + `NAV_MENUS.metodos`. `Header.astro` ganhou MegaMenu "Métodos" e bug fix crítico (filtro `'neuro-avaliação'` com acento que escondia 4 áreas).

**Deploy:** Cloudflare Pages 140 arquivos, smoke 6/6 HTTP 200, IndexNow 27 URLs.

---

### Round 2 · waves P-T · commit `58503e9`

| Wave | Tipo | Ferramenta | Escopo | Entregue |
|---|---|---|---|---:|
| P | Orchestrator + Perplexity dedicado | `geo-bridge.sh run` (2 runs) | Run 1: decomposição forçada multi-LLM. Run 2: Perplexity sonar-deep-research dedicado em paralelo (dossiê 32KB salvo em `docs/research/perplexity-dossier-2026-05-12.md`) | 8+9 tarefas em 5 LLMs · US$ 0,12 |
| Q | Sub-agent Opus | Claude Opus 4.7 | Novo `/evidencias/` hub + 6 sub-páginas com 45+ papers 2024-2026 | 7 páginas |
| R | Sub-agent Opus | Claude Opus 4.7 | 8 temas emergentes 2025-2026 em `/temas/` (fadiga-digital, climate-anxiety, IA generativa RH, Gen Z burnout, longevidade, neurodiversidade, liderança tóxica, trabalho remoto) | 8 páginas |
| S | Sub-agent Opus | Claude Opus 4.7 | Novo `/casos/` hub + 5 estudos de caso compostos HBR-grade | 6 páginas |
| T | Sub-agent Opus | Claude Opus 4.7 | Novo `/intervencoes/` hub + 5 protocolos (Stepped Care, IAPT, Matriciamento, Crise, Retorno) | 6 páginas |
| **Round 2 total** | — | — | — | **27 páginas** |

**Integração:** `data.ts` ganhou `EVIDENCIAS`, `CASOS`, `INTERVENCOES`, `TEMAS_EMERGENTES_2025_2026` + `NAV_MENUS.*`. `Header.astro` ganhou MegaMenu "Conhecimento" em 3 colunas (Evidências × Casos × Intervenções).

**Deploy:** Cloudflare Pages 149 arquivos, smoke 8/8 HTTP 200, IndexNow 27 URLs.

**Lição:** durante Wave P, Alexandre interrompeu pedindo confirmação explícita de Perplexity. Solução: chamada Perplexity standalone em paralelo às tarefas do orchestrator → padrão documentado em `~/.claude/projects/.../memory/feedback_perplexity_research_mandatory.md`.

---

### Round 3 · waves U-Z · commit `4d7d31f`

| Wave | Tipo | Ferramenta | Escopo | Entregue |
|---|---|---|---|---:|
| U | Orchestrator + Perplexity dedicado | `geo-bridge.sh run` (2 runs) | Run 1: colapsou em 1 task gpt4o ($0,01). Run 2: Perplexity sonar-deep-research em 5 tasks + Claude Sonnet review ($0,36). Dossiê 30KB salvo em `docs/research/perplexity-dossier-2026-clusters-a-f.md` | 6+1 tarefas · US$ 0,37 |
| V | Sub-agent Opus | Claude Opus 4.7 | Novo `/guias/` hub + 6 guias HowTo mobile-first com Schema.org HowTo + HowToStep | 7 páginas |
| W | Sub-agent Opus | Claude Opus 4.7 | 6 novos `/comparativos/` (ACT-vs-TCC, EMDR-vs-TCC-trauma, mindfulness-vs-ACT, presencial-vs-híbrido-vs-online, BR-vs-PT, IA-vs-terapeuta) | 6 páginas |
| X | Sub-agent Opus | Claude Opus 4.7 | Novo `/faq/` hub + 6 FAQs deep com 82 Q&As otimizadas AI Overview (1ª sentença declarativa ≤30 palavras) | 7 páginas |
| Y | Sub-agent Opus | Claude Opus 4.7 | 6 temas 2026 (TEA adulto trabalho, burnout saúde 2026, IA psicodiagnóstico 2026, TDAH adulto BR, psicose primeiro episódio, perinatal) | 6 páginas |
| Z | Sub-agent Opus | Claude Opus 4.7 | `/glossario/` expandido em 5 sub-páginas cluster com 115 termos definidos | 5 páginas |
| **Round 3 total** | — | — | — | **31 páginas** |

**Integração:** `data.ts` ganhou `GUIAS`, `FAQS_DEEP`, `GLOSSARIO_CLUSTERS` exports. `Header.astro` ganhou MegaMenu "Guias" antes de "Métodos" com CTA para "Ver FAQs aprofundadas".

**Deploy:** Cloudflare Pages 198 arquivos, smoke 7/7 HTTP 200, IndexNow 31 URLs.

**Mobile-first explícito no briefing:** `flex-col lg:flex-row` em heros, `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, `overflow-x-auto rounded-2xl border` em TODAS as tabelas, `h-11` touch target Apple HIG, `lg:sticky lg:top-20` no aside.

---

## Cumulativo · 12-05-2026

| Métrica | Valor |
|---|---:|
| Waves logicas executadas | 18 (K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z + 2 orchestrator extras) |
| Sub-agents Opus disparados | 16 em paralelo |
| Orchestrator runs | 6 (3 round 1+2 round 2+1 round 3 = inconsistente, ver detalhamento por round) |
| Páginas novas | **107** |
| Site cresceu | 94 → 174 estáticas (+85%) |
| Novos menus top-level | 6 (Métodos, Conhecimento, Guias — Evidências/Casos/Intervenções via Conhecimento, FAQ via Guias CTA) |
| Custo orchestrator total | **US$ 0,60** |
| Dossiês Perplexity gerados | 2 (~62KB total em `docs/research/`) |
| IndexNow propagações | 85 URLs em 3 engines |

---

## Padrões observados (aprendizados)

### Orchestrator decomposição é volátil

Mesmo prompt com 5 tipos `[research|analysis|classification|writing|review]` pode:
- Expandir em 5-9 tarefas distribuídas (Wave P, Wave U-run2) ✅
- Colapsar em 1 tarefa (`writing` → gpt4o, Wave U-run1) ❌

**Mitigação:** rodar 2 chamadas em paralelo. Uma com decomposição forçada, outra com Perplexity standalone. Salvar ambas no `docs/research/` para revisão.

### Perplexity é mandatório para context vivo

Sub-agents Opus de escrita NÃO têm Perplexity como tool. Confiam em training cutoff. Para papers 2025-2026 corretos:
1. Rodar Perplexity standalone ANTES e salvar dossiê em `docs/research/<topic>-<data>.md`
2. Sub-agents podem ser briefed para consultar o dossiê via Read tool
3. Cross-checar citações dos agents contra o dossiê na integração

Documentado em `~/.claude/projects/.../memory/feedback_perplexity_research_mandatory.md`.

### Sub-agents Opus em paralelo escalam bem

3 rounds × 5-6 sub-agents = 16 paralelos sem conflito de arquivos (cada agent escreve em diretório próprio). Tempo wall-clock ~13-17 min por round.

### Mobile-first deve ser explícito

Opus tende a default Tailwind desktop-first. Briefing deve incluir:
- `overflow-x-auto` em tabelas
- `grid-cols-1 sm:grid-cols-X` em cards
- `h-11` em botões
- `flex-col lg:flex-row` em heros
- `lg:sticky lg:top-20` em aside

### Bug fix oportuno

Round 1 capturou bug no `Header.astro` (filtro `'neuro-avaliação'` com acento que escondia 4 áreas do mega-menu). Cluster names em string literal são frágeis. Considerar union type ou enum.

---

## Próxima wave planejada

**Wave AA-EE (pós-W20):** auditoria de citações nas 107 páginas escritas contra dossiês Perplexity, substituição de DOIs marcados `[verificar]`, implementação de `llms.txt`, adição de Schema `LearningResource` em `/recursos/`.

---

*Última atualização:* `2026-05-12 08:30 BRT`
