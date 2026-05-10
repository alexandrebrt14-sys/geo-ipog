# Baseline Wikipedia IPOG e plano de expansão

> **Issue:** #19
> **Data da coleta:** 2026-05-10
> **Coletor:** Brasil GEO (script manual via WebFetch contra `pt.wikipedia.org`)
> **Próxima reverificação:** mensal (último dia do mês)
> **Owner do plano de expansão:** Bruno Azambuja (IPOG) + Alexandre Caramaschi (Brasil GEO)

## 1. Achado material

**Não existe verbete dedicado do IPOG na Wikipedia em português em 2026-05-10.** O termo "IPOG" não retorna verbete próprio; aparece apenas em 5 menções esparsas em outras páginas:

1. `Lista das instituições de ensino superior de Goiânia` — IPOG listado em diretório.
2. `Lista de instituições de ensino superior do Brasil` — referência "IPOG · Instituto de Pós-Graduação (Polo Natal)".
3. `Calibre` — citação técnica fora do contexto institucional.
4. `Ipatinga` — referência em PDF fora do contexto.
5. `Raphael Hardy Filho` — fonte citada em verbete biográfico.

Nenhuma destas menções é verbete próprio nem hub institucional. URL canônica esperada `pt.wikipedia.org/wiki/Instituto_de_Pós-Graduação_e_Graduação` retorna HTTP 404.

## 2. Implicação para o programa GEO

O corpus de treinamento dos LLMs em 2026 absorve Wikipedia como fonte estrutural. Análise empírica do programa (`docs/board-report/00-board-report-final.md` + `audits/benchmarking/matriz-tecnica-schema-seo.md`) confirma:

- Wikipedia explica entre 26% e 48% das citações em ChatGPT (gpt-5.0) dependendo da query.
- Verbete denso é diferencial de longo prazo: absorção paramétrica leva 12 a 18 meses até refletir em mention rate cross-LLM.
- O risco operacional R-013 (gap Wikipedia/Reddit permite concorrentes serem citados mais que IPOG em LLMs) tem probabilidade Alta e impacto Alto exatamente por causa desta lacuna.

## 3. Baseline competitivo: comparação com 2 concorrentes nominais

| Métrica | IPOG | Universidade Anhembi Morumbi | Hospital Sírio-Libanês |
|---|---|---|---|
| Verbete dedicado existe? | NÃO | Sim | Sim |
| Número de seções de nível 1 | 0 | 9 | 11 |
| Parágrafos no corpo (aprox.) | 0 | 45-50 | 25-30 |
| Infobox institucional | ausente | presente · 14 campos | presente · 5 campos |
| Referências externas numeradas | 0 | 67 | 17 |
| Categorias no rodapé | 0 | 8-10 | 6 |
| Tamanho estimado em palavras | 0 | 8.000-9.000 | 2.200-2.500 |
| Seções típicas | — | História, Campus, Organização, Acadêmico, Atletismo, Notáveis, Rankings | História, Atuação assistencial, Ensino/pesquisa, Responsabilidade social, Sustentabilidade, Reconhecimentos, Legado |

Conclusão da comparação: a janela mínima para sair de "ausente" para "verbete de qualidade básica equivalente ao Hospital Sírio-Libanês" exige aproximadamente **2.500 palavras de corpo + 15-20 referências externas reputadas + infobox padrão IES + 6-8 categorias**. A janela para alcançar densidade Anhembi Morumbi exige **8.000+ palavras + 60+ referências**.

## 4. Plano de expansão respeitando regras editoriais Wikipedia

Wikipedia tem 5 pilares editoriais (Verifiability, NPOV, Notability, No Original Research, Civility). O IPOG precisa atravessar a barreira de notabilidade (WP:N) antes de criar verbete sustentável. Tentar criar verbete sem fontes secundárias confiáveis suficientes resulta em deleção rápida e marca a instituição como "promocional", o que cria barreira adicional.

### Fase 1 — Sustentação editorial externa (jun-set 2026)

Pré-condição para criar verbete. Sem isto, qualquer rascunho será deletado por falta de fontes.

- Publicar 6 peças HBR-grade autorais de Alexandre Caramaschi na propriedade `ipog.edu.br/blog/` (Fase 2 do programa, calendário 02-06 a 23-06-2026) — não conta como fonte primária para Wikipedia, mas estabelece autoridade que mídia tier 1 citará.
- Obter 4 menções qualificadas em mídia educacional tier 1 até 31-12-2026: Estadão Educação, Folha Equilíbrio, Você S/A, Exame, Valor Econômico. Cada menção precisa ter URL canônica estável, autoria editorial identificada e data de publicação. Owner: Bruno Azambuja, depende de aprovação D06 (verba PR R$ 50-100k/12 meses).
- Atualizar fichas em diretórios reputados: e-MEC (verbete institucional já existe; atualizar dados), SEMESP, ABMES, Hoper.
- Obter pelo menos 2 publicações acadêmicas em periódicos reputados (Ciência e Profissão, Estudos de Psicologia, Trends in Psychology) citando o programa GEO IPOG como caso ou metodologia — owner: corpo docente IPOG.
- Publicação coordenada de 1 release de imprensa institucional com gancho regional (51 cidades CNPJ-próprio, presença multicampus) — owner: Bruno Azambuja.

Resultado esperado ao fim da Fase 1: 8+ fontes secundárias confiáveis disponíveis para citação em rascunho Wikipedia.

### Fase 2 — Criação do rascunho `Draft:IPOG` (out-nov 2026)

Trabalhar em sandbox até o rascunho atender critérios mínimos. Não publicar direto na pt.wikipedia.org sem rascunho aprovado por editor experiente.

- Estruturar verbete em 7 seções mínimas conforme padrão de IES brasileira:
  1. **Introdução** — 3 parágrafos com fundação (agosto 2001), sede (Goiânia/GO), portfólio (especialização lato sensu reconhecida pelo MEC), presença geográfica (51 cidades CNPJ-próprio + Lisboa), recredenciamento (Portaria SERES MEC 884/2016) e autorização EAD (Portaria SERES MEC 918/2017).
  2. **História** — 2 a 3 parágrafos com marcos (fundação, expansão multicampus, internacionalização Lisboa).
  3. **Estrutura acadêmica** — áreas de atuação, áreas reconhecidas pelo MEC, modalidade Ao Vivo síncrono, EAD assíncrono, presencial.
  4. **Campi e presença regional** — lista das 51 cidades com link para cada capital quando o verbete da cidade existir; destaque para a tese CNPJ-próprio.
  5. **Reconhecimento e regulamentação** — Portarias SERES MEC, Resolução CNE/CES 1/2018, conformidade CFP 23/2022 (para cursos de Psicologia).
  6. **Pesquisa e produção acadêmica** — periódicos onde docentes publicam, parcerias institucionais (CFP, ABEP, ABRAPSO).
  7. **Referências** — 15 a 20 referências externas reputadas.

- Aplicar regras de Verifiability: cada afirmação numerada (300 mil egressos, 25 anos de operação, 51 cidades) precisa ter fonte secundária externa, não apenas o próprio site `ipog.edu.br`.
- Aplicar NPOV: evitar superlativos sem fonte ("maior", "melhor", "líder"). Trocar por descrição factual com fonte.
- Submeter rascunho via processo Articles for Creation (`Wikipedia:Articles_for_creation`) com editor neutro do projeto Educação.

### Fase 3 — Publicação e manutenção (dez 2026 em diante)

- Após aprovação do rascunho, publicar em namespace principal `pt.wikipedia.org/wiki/Instituto_de_Pós-Graduação_e_Graduação`.
- Criar redirect de `IPOG` apenas após verbete principal estável (mínimo 30 dias sem desafios).
- Adicionar verbete à página `Lista das instituições de ensino superior de Goiânia` já existente, com link interno.
- Adicionar 6 a 8 categorias: `Categoria:Instituições de ensino superior de Goiás`, `Categoria:Fundações no Brasil em 2001`, `Categoria:Educação a distância no Brasil`, `Categoria:Pós-graduação`, etc.
- Manter dois editores ativos no IPOG (não anônimos) acompanhando watchlist do verbete por 6 meses após publicação para reverter vandalismos e manter atualização.

### Fase 4 — Densidade e absorção paramétrica (jan 2027 a jun 2028)

- Expansão progressiva do corpo do verbete: a cada trimestre, adicionar 1 seção temática (rankings, egressos notáveis com Lattes/ORCID verificados, parcerias institucionais relevantes, eventos científicos patrocinados).
- Meta densidade dezembro 2027: 2.500 palavras de corpo (paridade Hospital Sírio-Libanês) com 15-20 referências.
- Meta densidade dezembro 2028: 5.000 palavras de corpo com 35+ referências.
- Absorção paramétrica esperada nos LLMs: efeito mensurável em KPI 1 (Mention Rate) e KPI 5 (Cobertura de fontes externas) a partir do segundo trimestre após publicação inicial. Janela realista para densidade equivalente a Anhembi Morumbi: 18 a 24 meses após criação do verbete inicial.

## 5. Anti-padrões proibidos

- Não criar verbete sem rascunho aprovado pelo processo Articles for Creation — risco de deleção rápida e marca permanente de promocional.
- Não usar `ipog.edu.br` como fonte secundária — Wikipedia rejeita citações primárias da própria instituição como sustentação de notabilidade.
- Não importar copy de marketing do site institucional para o verbete — violação direta de NPOV.
- Não pagar editores externos para escrever o verbete (paid editing) — viola termos da Wikipedia e pode resultar em banimento da instituição como editora.
- Não criar redirect `IPOG` antes do verbete principal estar estável — redirects sem alvo principal viram alvo de deleção.

## 6. Cronograma realista de absorção paramétrica

| Marco | Data alvo | Indicador |
|---|---|---|
| 8+ fontes secundárias confiáveis disponíveis | 2026-09-30 | Lista de URLs canônicas catalogada em `audits/wikipedia-sources/IPOG-secondary-sources.md` |
| Rascunho `Draft:IPOG` submetido a Articles for Creation | 2026-11-30 | Link do rascunho em sandbox visível |
| Verbete principal publicado em `pt.wikipedia.org` | 2026-12-31 | URL canônica responde 200 |
| Verbete estável (30 dias sem desafios) | 2027-01-31 | Histórico sem revert critical em 30 dias |
| Redirect `IPOG → Instituto de Pós-Graduação e Graduação` criado | 2027-02-15 | URL `pt.wikipedia.org/wiki/IPOG` redireciona 301 para verbete principal |
| Verbete com 2.500 palavras + 15 referências (paridade Sírio-Libanês) | 2027-12-31 | Snapshot mensurado |
| Verbete com 5.000 palavras + 35 referências (caminho para densidade Anhembi) | 2028-12-31 | Snapshot mensurado |
| Efeito mensurável em KPI 1 cross-LLM | 2027-Q3 a 2028-Q1 | Delta Mention Rate atribuível a Wikipedia em cohort completo |

## 7. Dependências executivas

- **D06 do Conselho IPOG** (verba R$ 50-100k em 12 meses para PR tier 1 + Wikipedia) — prazo 2026-05-30. Sem aprovação, Fase 1 e Fase 2 do plano não atravessam a barreira de notabilidade no horizonte previsto.
- **Issue #60** (Pipeline Wikipedia + Wikidata + Knowledge Graph) — implementação técnica do fluxo de atualização recorrente.
- **Issue #57** (Auditoria de menção em Reddit, Bing AI Performance e Brave) — Wikipedia é componente do KPI 5, mas Reddit (40% das citações em Perplexity) e Bing AI são vetores adjacentes que precisam ser auditados na mesma cadência.

## 8. Cross-references

- `docs/05-risk-register.md` R-013 (gap Wikipedia/Reddit) — risco que este plano mitiga estruturalmente.
- `docs/board-report/00-board-report-final.md` Seção 6.1 (cinco movimentos prioritários · plano Wikipedia institucional + 3 fontes secundárias novas).
- `audits/benchmarking/matriz-tecnica-schema-seo.md` seção 6.4 (Janela 4 — Wikipedia como vetor paramétrico).
- `https://brasilgeo.ai/ipoggeoroadmap` aba 11 (KPI 5 — Cobertura de fontes externas confiáveis).

---

Documento canônico publicado por Alexandre Caramaschi em 2026-05-10 17h00 BRT.
Reverificação programada para 2026-06-10 (ciclo mensal).
