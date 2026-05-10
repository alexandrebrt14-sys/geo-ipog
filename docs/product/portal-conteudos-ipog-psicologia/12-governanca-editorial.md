# 12 — Governança Editorial

> **Audiência primária:** Conteúdo + Marketing + Jurídico IPOG

## 1. Tom de voz

**Características obrigatórias:**

- Claro, prático, direto
- Sem jargão acadêmico desnecessário
- Sem infantilizar o profissional (psicólogos, RHs, líderes)
- Orientado a ação (verbos imperativos: "calcule", "compare", "agende")
- Com exemplos concretos e números
- Linguagem executiva quando persona é E (líder)
- Linguagem mais didática quando persona é A (psicóloga em transição) ou F (consultor recomendando a clientes)

## 2. Princípios de conteúdo (não-negociáveis)

1. **Toda peça responde a uma pergunta real do usuário** — sem "conteúdo de gondola"
2. **Toda peça tem CTA com verbo de ação** — sem "saiba mais" repetido
3. **Toda peça tem `data_validade`** — controle editorial de obsolescência
4. **Toda peça tem `sources`** — fontes citadas com URL + tier de credibilidade
5. **Toda peça respeita naming canônico** — IPOG, MBA Online de Psicologia, Brasil GEO

## 3. Regras de claims

| Tipo de claim | Regra |
|---|---|
| Sobre regulação (NR-1, Decreto 12.456) | Citar fonte oficial gov.br + data + revisão jurídica |
| Sobre estatísticas | Citar fonte (Mapa Semesp, INEP, Gallup, WEF, OMS) + data |
| Sobre concorrentes | Factual, verificável, não-difamatório; "validation_status" por linha |
| Sobre IPOG | Apenas dados validados pela coordenação acadêmica + Bruno |
| Sobre carreira/empregabilidade | "Egressos relataram aumento de X" — nunca "vai aumentar X" |
| Sobre saúde mental | Educacional, não diagnóstico individual; "consulte um psicólogo" disclaimer |

## 4. Regras para comparativos

- **Factual, verificável, não-difamatório** (RNF-018)
- Cada `comparison_criterion` com `validation_status` (validated/partial/pending)
- Quando dado não disponível: "não identificado publicamente" + "pendente de validação"
- Sem linguagem superlativa sem evidência ("o melhor", "número 1")
- Gate jurídico antes do publish
- Atualização semestral

## 5. Regras para citar fontes

| Tier | Tipo | Exemplo |
|---|---|---|
| Tier 1 | Paper peer-reviewed | Aggarwal et al. KDD 2024 |
| Tier 2 | Mídia educacional tier 1 | Estadão Educação, Folha, Quero Bolsa, Educa Mais Brasil |
| Tier 3 | Relatório industrial | BrightEdge, Gartner, McKinsey |
| Tier 4 | Blog empresa concorrente | (citar com caveat) |
| Tier 5 | Rede social | (apenas como ilustração, não evidência) |

**Regra:** pillar SEO ≥ 5 sources tier-1/tier-2. Spoke ≥ 3 sources tier-1/tier-2/tier-3.

## 6. Regras para conteúdos regulatórios

- Cita texto oficial gov.br
- Inclui data da última atualização
- Disclaimer "Este conteúdo é informativo. Para situações específicas, consulte advogado/contador"
- Atualização trimestral obrigatória

## 7. Regras para temas de saúde mental

- Educacional, não diagnóstico individual
- Sem prescrição
- Disclaimer obrigatório: "Se você ou alguém precisa de apoio, ligue CVV 188 (gratuito, 24h)"
- Termos clínicos com tooltip do glossário
- Não substitui aconselhamento profissional

## 8. Regras para conteúdo relacionado a Psicologia

- Respeitar fronteira CFP (psicologia clínica é regulamentada)
- Diferenciar conteúdo educacional de aconselhamento profissional
- MBA não habilita prática clínica para não-psicólogos (declarar explicitamente)
- Evitar promessas de "tornar-se psicólogo organizacional" para não-psicólogos

## 9. Checklist de revisão (universal)

- [ ] Naming canônico (IPOG / Brasil GEO / MBA Online de Psicologia)
- [ ] PT-BR com acentuação completa
- [ ] Sem emojis
- [ ] Voice Guard 2.0 ≥ 7/9 enriquecimentos
- [ ] H1 único + hierarquia H2/H3 nítida
- [ ] Schema validado em Rich Results Test
- [ ] Meta title ≤ 60 chars + meta description ≤ 160 chars
- [ ] Cross-link com ≥ 3 outras páginas
- [ ] CTA primário com verbo de ação
- [ ] Sources citadas com URL + data + tier
- [ ] Data_validade declarada
- [ ] LGPD compliance (lead form)
- [ ] Sem claims sem evidência

## 10. Ciclo de atualização

| Tipo de conteúdo | Cadência |
|---|---|
| Tema regulatório (NR-1, Decreto 12.456) | Trimestral |
| Página de curso | Trimestral |
| Página estadual | Semestral |
| Comparativo | Semestral + após cada movimento competitivo material |
| Glossário | Anual |
| Pillar SEO geral | Semestral |

## 11. Papéis e responsabilidades

| Papel | Responsabilidade |
|---|---|
| Alexandre Caramaschi (Brasil GEO) | Editorial Lead + Voice Guard 2.0 |
| Bruno Azambuja (IPOG) | Aprovação final + integração com curso |
| Coordenação acadêmica IPOG | Validação técnica de conteúdo de Psicologia |
| Jurídico IPOG | Gate de comparativos + claims regulatórios |
| Sub-agents Opus paralelos | Produção em lotes 3-5 peças |

## 12. Versionamento

- Cada ContentItem em Markdown versionado no Git
- Tag semântica por release editorial (v1.0.0)
- Histórico de mudanças via git blame + commit messages

## 13. Critérios de publicação

- Aprovação Voice Guard 2.0 (≥ 7/9)
- Aprovação Bruno
- Schema validado
- Cross-link mínimo (3+ outras páginas)
- LGPD compliance
- Sem dados sensíveis
- Sources tier-1/tier-2 quando regulatório

## 14. Critérios de remoção

- Conteúdo com `data_validade` ultrapassada > 90 dias sem atualização
- Conteúdo que viola compliance MEC/CFP
- Conteúdo com claim refutado por evidência posterior
- Página com tráfego < 10 sessões/mês após 12 meses + sem conversão

## 15. Critérios de atualização anual

- Recheck de cada peça contra naming canônico vigente
- Atualização de números/estatísticas
- Refresh de sources (substituir por mais recentes)
- Validação de cross-links (broken links via `quality.yml` workflow)

## Diretrizes obrigatórias (resumo executivo)

1. Não fazer promessa de emprego, renda ou resultado garantido
2. Não afirmar superioridade contra concorrentes sem evidência
3. Não usar linguagem difamatória
4. Não tratar temas de saúde mental como diagnóstico individual
5. Diferenciar conteúdo educacional de aconselhamento profissional
6. Respeitar LGPD
7. Usar fontes confiáveis para normas, regulações e dados
8. Marcar conteúdos que exigem validação jurídica, acadêmica ou institucional
9. Atualizar temas de 2025/2026 com periodicidade definida
10. Manter consistência entre copy, SEO e oferta real do curso

## Cross-links

- `08-requisitos-nao-funcionais.md` (RNF-016 a RNF-020)
- `13-metricas-e-analytics.md`
- `15-riscos-assuncoes-e-dependencias.md`
