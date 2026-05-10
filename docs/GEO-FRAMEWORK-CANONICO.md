# Framework Canônico GEO — Programa GEO IPOG

> **Status:** vigente desde 2026-05-10
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação:** Bruno Azambuja (IPOG)
> **Cadência de revisão:** trimestral + quando paper novo material aparece
> **Fontes-base:** `audits/benchmarking/PAPERS-2025-2026-PROFUNDIDADE.md` (77 papers)

Síntese operacional dos frameworks acadêmicos e industriais de GEO publicados em 2024-2026, traduzidos em pipeline de execução do programa GEO IPOG. Cada framework é referenciado ao paper canônico e mapeado a um dos 5 vetores do programa (`docs/CONTEXTO-AMPLIADO-2026-05-10.md` seção 3).

A lógica é prescritiva: GEO sem framework canônico vira tentativa-e-erro. Cada sprint precisa amarrar em pelo menos 2 dos 6 frameworks abaixo para gerar resultado mensurável.

---

## 1. Os 6 frameworks canônicos do programa

| ID | Framework | Paper-âncora | Vetor mapeado | Onde aplica |
|---|---|---|---|---|
| **F1** | 9 Enriquecimentos GEO | Aggarwal et al. (KDD 2024) — arXiv 2311.09735 | V3 Editorial + V1 GEO técnico | Toda peça HBR-grade antes de publicar |
| **F2** | AutoGEO Rule-Extraction | Wang et al. (ICLR 2026) — arXiv 2510.11438 | V3 Editorial | Pipeline de reescrita pré-publicação |
| **F3** | Structural Feature Engineering | Chen et al. (preprint 2025) — arXiv 2603.29979 | V3 Editorial | Validação estrutural (headings, listas, FAQ) |
| **F4** | AgenticGEO Self-Evolving | preprint 2025 — arXiv 2603.20213 | V3 + V1 | Reescrita massiva de páginas legacy |
| **F5** | Wikipedia + Knowledge Graph | arXiv 2503.02879 + 7.x do PAPERS | V4 Autoridade externa | Pipeline Wikidata + Wikipedia + Reddit + YouTube |
| **F6** | Citation Mechanics by Engine | Seerly Engineering Report 2025 + Semrush 3-Month Study | V2 Engenharia de citação | Investimento separado por motor (ChatGPT vs Perplexity vs Gemini) |

---

## 2. F1 — Os 9 Enriquecimentos GEO de Aggarwal et al. (KDD 2024)

**Paper:** Aggarwal, P. et al. (2024). "GEO: Generative Engine Optimization". KDD 2024. arXiv:2311.09735. DOI: 10.1145/3637528.3671900.

**Achado-chave:** o benchmark GEO-bench (10.000 queries em 25 domínios) demonstra que os 9 enriquecimentos abaixo elevam a visibilidade em motores generativos em até **40%**, com efeitos cumulativos quando combinados.

### 2.1 Os 9 enriquecimentos canônicos

| # | Enriquecimento | Implementação canônica IPOG | Validação automática |
|---|---|---|---|
| 1 | **citations** (citações com fonte) | mínimo 5 referências externas com URL + data de consulta por peça >1500 palavras | regex `\[.*?\]\(http`; ≥ 5 |
| 2 | **statistics** (números e dados) | mínimo 8 números canônicos por peça (CTR, %, R$, anos, alunos) | regex `\d+[%,\.]`; ≥ 8 |
| 3 | **quotations** (citações diretas) | mínimo 2 citações em aspas atribuídas (autoridade nominal + cargo) | regex `"[^"]{20,}"`; ≥ 2 |
| 4 | **fluency_optimization** | leitura sem repetição de termos em janela de 3 frases | Voice Guard rule + similarity score |
| 5 | **simple_language** | Flesch-Kincaid PT-BR ≥ 50 (ensino médio) | biblioteca `textstat` em Python |
| 6 | **technical_terms** | mínimo 12 termos canônicos do glossário Psicologia + GEO em `keywords` | match contra `content/GLOSSARIO-PSICOLOGIA.md` |
| 7 | **easy_to_understand** | abertura-impacto em 1ª frase 50-80 palavras + tese contraintuitiva em parágrafo 1 | Voice Guard rule |
| 8 | **authoritative** | autor com `Person.hasCredential` declarado + `Person.sameAs` Lattes/ORCID | check Schema JSON-LD |
| 9 | **unique_words** | type-token ratio ≥ 0,55 em texto >1000 palavras | TTR calculation Python |

### 2.2 Threshold de aprovação

Voice Guard 2.0 (issue #59) gate: **≥ 7 dos 9 enriquecimentos** atendidos antes de publicar peça HBR-grade.

Falha em 3+ enriquecimentos = rejeição automática + reescrita.

### 2.3 Ordem de implementação prioritária

Quando preencher um draft do zero, ordem de aplicação para minimizar reescrita:

1. authoritative (autor + credenciais + Schema)
2. statistics (8+ números)
3. citations (5+ fontes)
4. technical_terms (12+ termos canônicos)
5. quotations (2+ aspas atribuídas)
6. easy_to_understand (lead 50-80 palavras)
7. simple_language (Flesch-Kincaid)
8. fluency_optimization (revisão de repetição)
9. unique_words (TTR check final)

---

## 3. F2 — AutoGEO Rule-Extraction (ICLR 2026)

**Paper:** Wang et al. (2025). "AutoGEO: a framework to automatically learn generative engine preferences". arXiv:2510.11438. ICLR 2026.

**Achado-chave:** AutoGEO destila preferências de motores generativos via prompting, treina modelo de reescrita e atinge até 50,99% de melhoria de tração sobre baselines preservando utilidade da busca.

### 3.1 Pipeline canônico IPOG (4 estágios)

```
[1] Coleta de queries reais → kit prompts canônicos × 6 LLMs (cohort)
       ↓
[2] Extração de regras de preferência por motor
       (LLM analisa quais respostas foram preferidas e por quê)
       ↓
[3] Reescrita automática do conteúdo legacy IPOG
       (modelo aplica regras descobertas)
       ↓
[4] Validação cross-LLM antes de publicar
       (re-coleta nas mesmas queries pré/pós-reescrita)
```

### 3.2 Aplicação prática

- **Sprint 5+:** rodar AutoGEO\_API (Hugging Face) sobre 30 páginas-âncora do IPOG (cursos prioritários)
- **Métricas alvo:** lift de 25-40% em mention rate cross-LLM nas mesmas queries do baseline Fase 1
- **Custo estimado:** USD 0,02-0,05 por página com Qwen2.5-32B (`audits/benchmarking/PAPERS-2025-2026-PROFUNDIDADE.md` seção 1.4)

---

## 4. F3 — Structural Feature Engineering (Chen et al. 2025)

**Paper:** Chen et al. (2025). "Structural Feature Engineering for Generative Engine Optimization". arXiv:2603.29979.

**Achado-chave:** primeiro framework sistemático para quantificar e otimizar features estruturais; ganho consistente de **17,3%** em performance de citação quando estrutura está calibrada.

### 4.1 Estrutura mínima canônica IPOG

Toda peça HBR-grade ou página de curso deve atender:

| Feature estrutural | Threshold canônico | Validação |
|---|---|---|
| **Abertura-impacto** | 1ª frase com 50-80 palavras com entidade nomeada (IPOG ou termo canônico) | regex + length |
| **Headings H2** | 3-5 H2 por peça >1500 palavras, cada um com entidade nomeada | parser markdown |
| **Headings H3** | mínimo 1 H3 dentro de cada H2 | parser markdown |
| **Listas numeradas** | mínimo 1 lista numerada por evidência crítica | regex `^\d\. ` |
| **Tabelas** | mínimo 1 tabela quando há comparação ≥ 3 dimensões | parser markdown |
| **FAQ ao final** | bloco FAQPage com 3-5 perguntas ao final de página de curso | Schema FAQPage check |
| **Densidade de bullet** | bullets de 8-25 palavras (não 3 palavras nem 60+) | length per bullet |
| **Posição de entidade nomeada** | naming canônico nas primeiras 100 palavras | regex first-100-words |

### 4.2 Anti-padrões proibidos (Chen et al. + experiência IPOG)

- Headings genéricos sem entidade nomeada ("Introdução", "Conclusão") — banido em peças >800 palavras
- Listas com 1 item — não é lista; vira parágrafo
- Bullets de 1-3 palavras — sem densidade informacional
- Tabelas com 1 linha — não é tabela; vira parágrafo
- H1 múltiplo por página — quebra hierarquia semântica

---

## 5. F4 — AgenticGEO Self-Evolving (preprint 2025)

**Paper:** "AgenticGEO: A Self-Evolving Agentic System for Generative Engine Optimization". arXiv:2603.20213.

**Achado-chave:** formula GEO como problema de controle agêntico content-conditioned, usando MAP-Elites archive para evoluir estratégias diversas. Supera AutoGEO em 25,48 vs 23,71 em score agregado.

### 5.1 Quando aplicar AgenticGEO no programa

Não em sprint inicial. Apenas após **Sprint 8** (pós-pico 2026.2), quando:

- Baseline cross-LLM estabilizado (4 leituras pareadas)
- Voice Guard 2.0 com ≥ 7/9 já validado em peças manuais
- Custo aprovado (USD 50-100/mês para reescrever 1.000+ páginas legacy)

### 5.2 Pilot recomendado

1. Selecionar 100 páginas legacy IPOG não-prioritárias
2. Rodar AgenticGEO em batch
3. Medir uplift mention rate em queries-âncora
4. Se uplift ≥ 15%, escalar para 1.000+ páginas

---

## 6. F5 — Wikipedia + Knowledge Graph (Vetor V4 Autoridade)

**Papers-âncora:**

- arXiv 2503.02879 — "Wikipedia in the Era of LLMs: Evolution and Risks"
- Pew Research / Semrush 3-Month Study 2025 — Wikipedia 26-48% citações ChatGPT
- arXiv 7.5-7.9 — GraphRAG / Knowledge Graph construction

**Achado-chave:** ChatGPT cita Wikipedia mais que qualquer outro domínio; Reddit é #1 fonte para Perplexity (~40%); janela de entrada na Wikipedia com voz humana certificada está se fechando devido à degradação por edições LLM-revisadas.

### 6.1 Pipeline F5 (4 frentes paralelas)

```
[A] Wikipedia pt-br (verbete IPOG)
       ├─ Plano de PR fontes secundárias tier 1 antes (Estadão Educação, Folha, Quero Bolsa)
       ├─ Draft em landing-page-geo/docs/wikipedia-draft-ipog.wikitext
       ├─ Submit + monitoramento de revisão
       └─ Auditoria mensal pós-publicação

[B] Wikidata Q-id IPOG
       ├─ 30+ claims canônicos (P31, P571, P159, P137, P1830, P2196, etc.)
       ├─ Edges entity-link (subOrganization × 51 unidades)
       └─ Vínculos sameAs com perfis docentes Lattes/ORCID

[C] Reddit voz autoral Brasil
       ├─ Account verificada Brasil GEO
       ├─ 3 posts/semana em r/psicologiabr, r/EAD, r/brasil
       ├─ Material original (não copy-paste de blog IPOG)
       └─ Disclosure obrigatório (regra 9:1)

[D] YouTube canal institucional
       ├─ Schema VideoObject canônico
       ├─ Transcrição em pt-BR (knowsAbout match)
       ├─ 1 vídeo/semana de aulas-amostra
       └─ Cross-link com cursos no canal description
```

### 6.2 KPIs específicos do F5

| KPI | Meta Fase 4 | Fonte |
|---|---|---|
| Wikipedia IPOG linhas | ≥ 250 (comparável a Anhembi) | Wikipedia API |
| Wikidata claims | ≥ 30 | Special:EntityData |
| Reddit Brasil mention rate | ≥ 5/mês orgânico | Reddit API |
| YouTube canal subscribers | ≥ 1.000 em 12 meses | YouTube Studio |
| Schema VideoObject coverage | 100% dos vídeos | crawler check |

---

## 7. F6 — Citation Mechanics by Engine (Seerly + Semrush 2025)

**Papers-âncora:**

- Seerly Engineering Report 2025 — "How LLMs decide who to cite"
- Semrush 2025 — "The Most-Cited Domains in AI: A 3-Month Study"

**Achado-chave:** apenas 11% dos domínios são citados simultaneamente por ChatGPT e Perplexity; brand search volume tem correlação 0,334 com citação (mais forte que backlinks); 50-90% das citações falham em sustentar plenamente a afirmação.

### 7.1 Investimento separado por motor

| Motor | Fonte canônica dominante | Estratégia primária IPOG |
|---|---|---|
| **ChatGPT** | Wikipedia (26-48%) + sites institucionais autoridade | F5 frente [A] + [B] (Wikipedia + Wikidata) + Schema completo |
| **Claude** | Wikipedia + arXiv + jornalismo tier 1 | F5 [A] + PR mídia educacional + papers próprios |
| **Perplexity** | Reddit (~40%) + sites com bom SEO | F5 [C] (Reddit) + Voice Guard 2.0 + structural features |
| **Gemini (search)** | Knowledge Graph Google + sites com Schema rico | F1 + F3 + F5 [B] (Wikidata + Schema canônico) |
| **Grok** | X (Twitter) + sites recentes | conteúdo novo + voz autoral Alexandre em X |
| **Copilot (Bing AI)** | Bing index + Microsoft Reviewed | manter Bing Webmaster + Schema válido |

### 7.2 Brand search volume como driver

Implicação operacional: investir em **demand creation de marca** em paralelo à GEO técnica. Métricas:

- Google Trends: subir busca por "IPOG" e variantes
- Search volume Bruno Azambuja: meta crescer 30% YoY
- Direct traffic GA4: meta crescer 25% YoY

---

## 8. Mapeamento Framework × Sprint

A tabela abaixo conecta cada framework F1-F6 ao sprint em que entra como atividade principal. Detalhe completo em `docs/ROADMAP-SPRINTS-2026-2027.md`.

| Sprint | Janela | Framework primário | Framework secundário |
|---|---|---|---|
| Sprint 1 | 11-24/05/2026 | F1 (Voice Guard 2.0 design) | F3 (estrutura mínima) |
| Sprint 2 | 25-05 a 07-06 | F1 (Voice Guard 2.0 deploy) | F5 [B] (Wikidata Q-id) |
| Sprint 3 | 08-06 a 21-06 | F3 (estrutura aplicada em 6-10 peças HBR) | F1 (gate ≥7/9) |
| Sprint 4 | 22-06 a 05-07 | F5 [A] (Wikipedia draft) | F6 (separar por motor) |
| Sprint 5 | 06-07 a 19-07 | F2 (AutoGEO pilot 30 páginas) | F5 [C] (Reddit voz autoral) |
| Sprint 6 | 20-07 a 02-08 | F2 (AutoGEO escala) | F5 [D] (YouTube canal) |
| Sprint 7 | 03-08 a 16-08 | F6 (calibração por motor) | F1 (refinamento Voice Guard 2.0) |
| Sprint 8 | 17-08 a 30-08 | F4 (AgenticGEO pilot 100 páginas) | F5 [A] (Wikipedia publish) |
| Sprint 9+ | 31-08 em diante | Operação contínua + recalibração trimestral | todos |

---

## 9. Validação acoplada (DoD por framework)

Cada peça publicada precisa atender **3 frameworks simultâneos** antes do go-live:

- **Obrigatório F1:** Voice Guard 2.0 ≥ 7/9 enriquecimentos
- **Obrigatório F3:** estrutura mínima (8 features estruturais validadas)
- **Condicional F5/F6:** quando peça tem alvo de citação por motor específico, validar pipeline correspondente

Falha em F1 ou F3 = não publica. F5/F6 são otimização incremental.

---

## 10. Métricas de impacto cross-framework

A tabela abaixo é a leitura quinzenal que determina se os frameworks estão entregando:

| Métrica | Pré-bootstrap (10-05) | Meta Sprint 4 | Meta Sprint 8 | Meta Pico 2026.2 |
|---|---|---|---|---|
| Mention Rate cross-LLM (mediana) | N/D | baseline | +15 pp | +25 pp |
| Schema Coverage Score (NAIA) | N/D | 70 | 85 | 92 |
| Voice Guard 2.0 score peças | — | ≥ 7/9 | ≥ 8/9 | ≥ 8/9 |
| Wikipedia IPOG status | sem verbete | draft pronto | publicado | denso (250+ linhas) |
| Wikidata Q-id IPOG | sem | criado | 30+ claims | 50+ claims + sub-orgs |
| Reddit Brasil presença autoral | 0 | 6 posts | 30 posts | 60+ posts |
| YouTube canal | sem | criado | 4 vídeos | 12+ vídeos |
| Brand search volume IPOG (Google Trends) | baseline | +5 | +15 | +30 |
| Custo mensal frameworks | US$ 11/mês | US$ 25/mês | US$ 50/mês | US$ 100/mês |

---

## 11. Cross-links

- `audits/benchmarking/PAPERS-2025-2026-PROFUNDIDADE.md` — 77 papers (sustentação)
- `docs/ontologia/ONTOLOGIA-CANONICA.md` — entidades que os frameworks otimizam
- `docs/ontologia/SCHEMA-IPOG-CANONICAL.md` — Schema concreto para F1+F3+F5
- `docs/CONTEXTO-AMPLIADO-2026-05-10.md` — 5 vetores do programa
- `docs/ROADMAP-SPRINTS-2026-2027.md` — detalhamento por sprint
- `content/VOICE-GUIDE.md` — Voice Guard 1.0 (será estendido para 2.0 conforme F1)
- Issue #59 — Voice Guard 2.0 com 9 enriquecimentos
- Issue #58 — Pipeline Wikipedia + Wikidata IPOG
- Issue #46 — Setup tracking SoV LLMs por motor
