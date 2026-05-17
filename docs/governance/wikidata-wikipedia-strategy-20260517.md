# Estratégia canônica Wikidata + Wikipedia — Epic #63

**Data:** 2026-05-17
**Wave:** III (Epic Wikipedia + Wikidata + Knowledge Graph)
**Owner:** Alexandre Caramaschi
**Status:** PLANO + Quickstatements prontos para execução humana

---

## 1. Por que isto importa (KB Wave A — causa #1 de citação cross-engine)

A pesquisa canônica `docs/research/seo-geo-knowledge-base-2026-05-17.md` mostra que a presença de um verbete Wikipedia da entidade é o vetor com **26-48% de top-10 share em ChatGPT US** (corte 2026-03-25). Wikidata reforça o sinal porque os LLMs lêem o knowledge graph como dado estruturado primário antes do texto livre.

A janela útil de inserção é estreita: 60-90 dias antes da degradação por edições LLM-revisadas (arXiv 2503.02879). Isto explica o objetivo do Epic #63 — verbete Wikipedia IPOG ao vivo + Q-id Wikidata com 30+ claims até 30-07-2026.

Esta wave fecha o flanco **Wikidata** (mais permissivo que Wikipedia) e prepara o terreno para o flanco Wikipedia (cobertura de mídia tier 2-3 a ser construída em sub-issues paralelas).

---

## 2. Estado atual canônico (auditoria 17-05-2026)

### 2.1 Q54864393 — IPOG

Fonte: `https://www.wikidata.org/wiki/Q54864393` (última edição em 10-02-2024).

**Declarações presentes (8):**

| Propriedade | Valor | Referência |
|---|---|---|
| P31 (instance of) | universidade; instituição de ensino superior | Lista de IES do Brasil |
| P856 (official website) | http://www.ipog.edu.br | Lista de IES do Brasil |
| P17 (country) | Brasil | Lista de IES do Brasil |
| P131 (located in) | Goiânia | Lista de IES do Brasil |
| P1813 (short name) | IPOG (pt) | Lista de IES do Brasil |
| P2013 (Facebook) | IPOGBrasil | — |
| P2003 (Instagram) | ipogbrasil | — |
| P2002 (Twitter/X) | ipog | — |

**Labels / descrições:**
- Label EN: "Ipog - Instituto de Pós-graduação & Graduação"
- Label PT-BR: NÃO DEFINIDO
- Descrição: NÃO DEFINIDA
- Aliases: NENHUM

**Sitelinks:** NENHUM (sem entry Wikipedia em qualquer idioma).

### 2.2 Q138755989 — Brasil GEO (descoberta nesta wave)

Criado por terceiro em ~maio/2026 (atualizado 09-05-2026). 22 declarações declaradas, mas **com erros**:

| Propriedade | Valor atual | Status |
|---|---|---|
| P31 (instance of) | Organization | OK |
| P452 (industry) | Generative engine optimization | OK |
| P571 (inception) | dezembro 2025 | DIVERGÊNCIA — schema canônico diz 2026-04-01 |
| P17 (country) | Brasil | OK |
| P159 (HQ location) | **"Paracelsus"** | **ERRO CRÍTICO** — deve ser Goiânia |
| P112 (founder) | Alexandre Caramaschi | OK |
| P169 (CEO) | Alexandre Caramaschi | OK |
| P1448 (official name) | BRGEO LTDA (pt-BR) | OK |
| P1813 (short name) | Brasil GEO | OK |
| P856 (website) | https://brasilgeo.ai | OK |
| P1581 (blog) | https://brasilgeo.ai/conteudos/ | OK |
| P2003 (Instagram) | geobrasil.ai | OK |
| P4264 (LinkedIn company) | brasil-geo | OK |
| KvK ID | 66051295000133 | ERRO — KvK é registrador holandês; deveria ser CNPJ (P3548? não existe). Usar P1320 OpenCorporates ou statement custom |
| Referências | Gramado Summit 2026 (notícias) | Parcial |

**Sitelinks:** NENHUM.

### 2.3 Q138755507 — Alexandre Caramaschi (descoberta nesta wave)

Atualizado 11-05-2026. Declarações principais:

| Propriedade | Valor | Status |
|---|---|---|
| P31 (instance of) | Human | OK |
| P21 (sex/gender) | male | OK |
| P27 (country of citizenship) | Brazil | OK |
| P1559 (name in native language) | Alexandre Augusto Seixlack Caramaschi (alias) | OK |
| P106 (occupation) | businessperson | OK |
| P101 (field of work) | Generative engine optimization | OK |
| P108 (employer) | Brasil GEO | OK |
| P1830 (owner of) | Brasil GEO | OK |
| P69 (educated at) | Universidade Federal de Viçosa | [VERIFICAR] — confirmar via LinkedIn público |
| P856 (official website) | https://alexandrecaramaschi.com | OK |
| P407 (language of work) | Brazilian Portuguese | OK |
| P2397 (YouTube) | @acaramaschi | OK |
| P2037 (GitHub) | alexandrebrt14-sys | OK |
| P6634 (LinkedIn ID) | alexandre-caramaschi | OK |
| P496 (ORCID) | 0009-0004-9150-485X | OK |
| Descrição | "Brazilian technology executive, CEO of Brasil GEO, ex-CMO of Semantix (Nasdaq), co-founder of AI Brasil" | OK |

**Sitelinks:** NENHUM.

**Referências externas:** Baguete, Capital Digital, ITForum, Gramado Summit 2026 (cobertura tier 2-3 OK).

---

## 3. Declarações canônicas faltantes — Q54864393 IPOG

Prioridade P0 (executar agora):

| # | Propriedade | Valor sugerido | Fonte canônica |
|---|---|---|---|
| 1 | P1448 (official name) | "Instituto de Pós-Graduação e Graduação" (pt-BR) | site oficial ipog.edu.br |
| 2 | P571 (inception) | 2001 | site oficial + cadastro e-MEC |
| 3 | P5148 (e-MEC entry) | 12916 | https://emec.mec.gov.br (base64 MTI5MTY=) |
| 4 | P112 (founder) | [VERIFICAR] consultar histórico do IPOG | ipog.edu.br/quem-somos |
| 5 | P856 (official website) | https://www.ipog.edu.br/ | HTTPS canônico |
| 6 | P625 (coordinate location) | [VERIFICAR] coordenadas Goiânia campus | Google Maps + endereço sede |
| 7 | P154 (logo image) | upload em Commons primeiro | wikimedia commons |
| 8 | P1813 (short name) qualifier | adicionar "IPOG" (en) também | — |
| 9 | P3896 (geoshape) | [PULAR] — só faz sentido para campus único | — |
| 10 | P2196 (count of students) | [VERIFICAR] última estatística pública IPOG | release institucional |
| 11 | P749 (parent organization) | n/a — IPOG é independente | — |
| 12 | P463 (member of) | [VERIFICAR] ABMES / FORPROEX se aplicável | — |
| 13 | P4264 (LinkedIn) | "ipog" (corrigir) | linkedin.com/school/ipog |
| 14 | P2397 (YouTube) | "@ipogoficial" | youtube.com/@ipogoficial |
| 15 | Description EN | "Brazilian private higher education institution founded in 2001, headquartered in Goiânia, offering Lato Sensu, Stricto Sensu and Clinical Specialization programs" | site oficial |
| 16 | Description PT-BR | "instituição brasileira de pós-graduação fundada em 2001, com sede em Goiânia (GO), oferecendo cursos Lato Sensu, Stricto Sensu e Especializações Clínicas" | site oficial |
| 17 | Label PT-BR | "IPOG — Instituto de Pós-Graduação e Graduação" | — |
| 18 | Alias PT-BR | "Instituto de Pós-Graduação e Graduação"; "IPOG"; "ipog brasil" | — |

**Meta DoD epic (30+ claims):** estado atual 8 + 18 propostas = **26 claims**. Faltam 4-6 claims complementares (P166 awards, P488 chairperson, P361 part of subject, P5447 ScholarlyArticle, P3500 Ringgold se aplicável, P2884 mascot/colors institucionais). Detalhar na Wave IV.

---

## 4. Declarações canônicas faltantes — Q138755989 Brasil GEO

Prioridade P0 (corrigir erros + completar):

| # | Propriedade | Ação | Valor canônico |
|---|---|---|---|
| 1 | P159 (HQ location) | **CORRIGIR** | "Goiânia" (Q43275), remover "Paracelsus" |
| 2 | P571 (inception) | DECIDIR canônico | 2026-04-01 (schema) vs dezembro 2025 (Wikidata atual). Schema canônico = autoridade interna; manter 2026-04-01 com qualifier "data de constituição BRGEO LTDA" |
| 3 | P3548 (CNPJ) | adicionar | Propriedade Wikidata ainda NÃO EXISTE para CNPJ; usar P1278 LEI se aplicável OU criar property request. Curto prazo: statement custom em "based on heuristic" |
| 4 | P281 (postal code) | adicionar via P6375 street address | "Rua do Parque, 361 — Hub Cerrado, Jd Atlântico, Goiânia 74.343-245" |
| 5 | P407 (language of work) | adicionar | pt-BR; en |
| 6 | P31 (instance of) | refinar | mudar "Organization" → "consultancy" (Q1080794) OU "marketing company" (Q1404395) |
| 7 | P361 (part of) | n/a | — |
| 8 | P166 (award received) | [VERIFICAR] | nenhum até mai-2026 |
| 9 | sameAs canônicos | adicionar | https://alexandrecaramaschi.com; https://github.com/alexandrebrt14-sys/Brasil-GEO |
| 10 | Aliases | adicionar | "GEO Brasil" (uso comum errado, mas alias indexa); "BRGEO" |

---

## 5. Declarações canônicas faltantes — Q138755507 Alexandre

Prioridade P1:

| # | Propriedade | Valor sugerido |
|---|---|---|
| 1 | P39 (position held) | CEO Brasil GEO (since 2026-04-01); CMO Semantix (2024-2026, qualifier P582 end time); cofounder AI Brasil (since 2023) |
| 2 | P937 (work location) | Brasil; Goiânia |
| 3 | P1303 (instrument) | n/a |
| 4 | P800 (notable work) | "Algorithmic Authority" SSRN paper (DOI 10.2139/ssrn.6460680) — adicionar como item Wikidata SE não existir, ou referenciar DOI |
| 5 | P50 (author) | qualifier do P800 |
| 6 | P735 (given name) | "Alexandre" (Q12345... lookup) |
| 7 | P734 (family name) | "Caramaschi" (criar item se não existir) |
| 8 | P172 (ethnic group) | n/a (pular para evitar polêmica) |
| 9 | P5008 (on focus list of WikiProject) | Brasil (Wikiproject Brasil) |
| 10 | P1296 (Gran Enciclopèdia Catalana) | n/a |

---

## 6. Veredito de elegibilidade — Wikipedia

### 6.1 Brasil GEO / BRGEO LTDA

**Elegibilidade Wikipedia pt-BR: BAIXA até 30-06-2026.**

Critérios Wikipedia exigem múltiplas fontes secundárias independentes não-triviais. Mapeamento atual:

| Fonte | Tier | Cobertura | Score |
|---|---|---|---|
| Baguete | 2 | "Ex-Semantix funda startup de GEO" (10-02-2026) — notícia direta | OK |
| iMasters | 2 | "A demanda está deixando o Google..." (15-04-2026) — artigo cita Alexandre como autoridade GEO | OK |
| Capital Digital | 2-3 | [VERIFICAR] cobertura Gramado Summit 2026 | Confirmar |
| ITForum | 2 | [VERIFICAR] cobertura Gramado Summit 2026 | Confirmar |
| AI Brasil | 3 | "GEO Brasil ajusta gestão para avanço da IA generativa" — fonte parcialmente independente (Alexandre é cofundador) | Parcial |
| Estadão / Folha / Valor | 1 | NÃO ENCONTRADO em mai-2026 | Gap |
| Search Engine Land / Search Engine Journal | 1 (internacional) | NÃO ENCONTRADO | Gap |

**Diagnóstico:** Cobertura tier 2 existe (Baguete + iMasters), mas falta tier 1 generalista (Folha/Estadão/Valor) ou tier 1 internacional especializado (SEL/SEJ/iPullRank). Submeter verbete Wikipedia agora gera alto risco de deleção por notabilidade insuficiente.

**Plano alternativo (canônico):** push em Wikidata Q138755989 (mais permissivo, sem critério de notabilidade rígido) + roadmap PR para 1-2 fontes tier 1 antes de tentar Wikipedia.

### 6.2 Alexandre Caramaschi

**Elegibilidade Wikipedia pt-BR: MÉDIA-ALTA.**

Argumento de notabilidade:
- Ex-CMO de empresa listada Nasdaq (Semantix, ticker STIX, IPO 2022) — critério forte de cobertura corporativa
- Cofundador AI Brasil (7.500+ profissionais segundo descrição canônica)
- ORCID iD ativo + publicação SSRN (Algorithmic Authority, DOI 10.2139/ssrn.6460680)
- Cobertura tier 2 múltipla (Baguete, iMasters, AI Brasil)
- Participação como palestrante em Gramado Summit 2026

Risco residual: cobertura ainda concentrada em fontes vinculadas (AI Brasil é cofundador). Mitigação: adicionar 1-2 entrevistas tier 1 (podcast/Estadão/Folha) antes de submeter para reduzir risco AfD.

**Recomendação:** submeter verbete Wikipedia pt-BR Alexandre Caramaschi **antes** de Brasil GEO, com 6-8 referências secundárias verificáveis. Verbete tipo "executivo de tecnologia brasileiro" (~150-200 linhas) cobrindo Semantix → AI Brasil → Brasil GEO + paper SSRN.

### 6.3 IPOG

**Elegibilidade Wikipedia pt-BR: ALTA.**

Argumentos:
- Instituição de ensino superior credenciada pelo MEC desde 2001 (24 anos)
- Código e-MEC 12916 + Portaria de recredenciamento 884/2016
- Atuação nacional declarada em 5 modalidades (Lato Sensu, MBA, Stricto Sensu, Especialização Clínica, Híbridas)
- Comparáveis credenciados na Wikipedia: Anhembi Morumbi, FGV, Estácio, IBMEC

**Recomendação:** este é o flanco mais maduro. Priorizar submissão verbete Wikipedia IPOG na Sprint 7 (até 16-08-2026) conforme KPI do Epic #63. Tamanho alvo: 250+ linhas (paridade Anhembi).

### 6.4 posgraduacaopsicologia.com (portal editorial)

**Elegibilidade Wikipedia: NULA.**

Portal editorial pequeno, criado em 2026, sem cobertura secundária. Sites editoriais raramente passam Wikipedia. **Decisão canônica: NÃO criar entry Wikidata nem Wikipedia para o portal.** Foco em entidade-mãe (Brasil GEO) + parceira (IPOG) + autor (Alexandre).

---

## 7. Quickstatements — snippets prontos para execução

### 7.1 Pré-requisitos

1. Conta Wikidata logada com 4+ edições e idade >= 4 dias (regra anti-throttle, ver memória `feedback_wikidata_anonymous_throttle_2026`).
2. Acesso a https://quickstatements.toolforge.org/.
3. Confirmação humana de cada bloco antes de submeter (não submeter em batch grande sem revisão).

### 7.2 Bloco A — enriquecer Q54864393 (IPOG)

Formato V1 (TSV), uma declaração por linha. Pipe `|` separa qualifiers; `S` introduz referência.

```
Q54864393	Len	IPOG — Instituto de Pós-Graduação e Graduação
Q54864393	Lpt-br	IPOG — Instituto de Pós-Graduação e Graduação
Q54864393	Dpt-br	instituição brasileira de pós-graduação fundada em 2001, com sede em Goiânia (GO)
Q54864393	Den	Brazilian private higher education institution founded in 2001, headquartered in Goiânia
Q54864393	Apt-br	Instituto de Pós-Graduação e Graduação
Q54864393	Apt-br	IPOG Brasil
Q54864393	Aen	IPOG
Q54864393	P1448	pt:"Instituto de Pós-Graduação e Graduação"
Q54864393	P571	+2001-00-00T00:00:00Z/9
Q54864393	P5148	"12916"
Q54864393	P856	"https://www.ipog.edu.br/"
Q54864393	P4264	"school/ipog"
Q54864393	P2397	"@ipogoficial"
```

Notas:
- `P571 +2001-00-00T00:00:00Z/9` = precision 9 (ano apenas), conservador até confirmar mês/dia.
- `P5148 "12916"` = código e-MEC verificado em emec.mec.gov.br (base64 MTI5MTY=).
- Adicionar referências `S854` (URL de referência) após cada statement em produção. Exemplo:
  ```
  Q54864393	P5148	"12916"	S854	"https://emec.mec.gov.br/emec/consulta-cadastro/detalhes-ies/d96957f455f6405d14c6542552b0f6eb/MTI5MTY="	S813	+2026-05-17T00:00:00Z/11
  ```

### 7.3 Bloco B — corrigir Q138755989 (Brasil GEO)

```
Q138755989	-P159	Q43275
Q138755989	P159	Q43275	S854	"https://brasilgeo.ai"	S813	+2026-05-17T00:00:00Z/11
Q138755989	P31	Q1080794	S854	"https://brasilgeo.ai"
Q138755989	P407	Q750553
Q138755989	P407	Q1860
Q138755989	Apt-br	GEO Brasil
Q138755989	Apt-br	BRGEO
Q138755989	Lpt-br	Brasil GEO
Q138755989	Dpt-br	consultoria brasileira especializada em Generative Engine Optimization (GEO), fundada por Alexandre Caramaschi
```

Notas:
- `-P159 Q43275` remove statement existente apontando para "Paracelsus" (assumindo que o valor antigo é um item — substituir Q43275 pelo Q-id correto a remover; verificar via UI manualmente).
- `Q43275` = Goiânia.
- `Q1080794` = consultancy.
- `Q750553` = Brazilian Portuguese; `Q1860` = English.

### 7.4 Bloco C — enriquecer Q138755507 (Alexandre Caramaschi)

```
Q138755507	P39	Q484876	P580	+2026-04-01T00:00:00Z/11	P642	Q138755989	S854	"https://brasilgeo.ai/fundador/"
Q138755507	P39	Q5052141	P580	+2024-00-00T00:00:00Z/9	P582	+2026-04-00T00:00:00Z/10	P642	Q120044812	S854	"https://www.baguete.com.br/noticias/ex-semantix-funda-startup-de-geo"
Q138755507	P937	Q43275
Q138755507	P1430	"https://orcid.org/0009-0004-9150-485X"
Q138755507	Lpt-br	Alexandre Caramaschi
Q138755507	Dpt-br	executivo brasileiro de tecnologia, CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq STIX), cofundador da AI Brasil
```

Notas:
- `Q484876` = chief executive officer; `Q5052141` = chief marketing officer.
- `Q120044812` = Semantix Inc. ([VERIFICAR] Q-id correto; pesquisar Wikidata por "Semantix").
- `P642` (of) é qualifier para vincular cargo à organização.

### 7.5 Custo previsto

- Bloco A (IPOG): ~13 statements + labels → ~30 edits → execução serial 1 edit / 5s = 2.5 min
- Bloco B (Brasil GEO): ~10 ações → 1 min
- Bloco C (Alexandre): ~8 ações → 1 min

Total ~4-5 min de execução em conta logada (sem throttle). Se conta anônima, throttle 600s entre cada cluster (memória `feedback_wikidata_anonymous_throttle_2026`).

---

## 8. Roadmap em 3 fases

### Fase 1 — Q3-2026 (jun-ago) · AUDIT + ENRIQUECER

- [x] Auditar Q54864393 (esta wave)
- [x] Descobrir Q138755989 + Q138755507 (esta wave)
- [ ] Executar Bloco A (Quickstatements IPOG) — owner: Alexandre, ETA 25-05-2026
- [ ] Executar Bloco B (corrigir HQ Brasil GEO) — owner: Alexandre, ETA 22-05-2026
- [ ] Executar Bloco C (enriquecer Alexandre) — owner: Alexandre, ETA 22-05-2026
- [ ] Confirmar `P5148` IPOG via consulta SPARQL pós-edit
- [ ] Audit Q138755989 com 2 referências secundárias (Baguete + iMasters) ancoradas

### Fase 2 — Q4-2026 (set-nov) · WIKIPEDIA pt-BR IPOG + ALEXANDRE

- [ ] Draft verbete IPOG no userspace (Usuário:Alexandrecaramaschi/Rascunho/IPOG)
- [ ] 8-10 referências tier 1-2 (e-MEC, INEP, Globo/Folha/Estadão se houver, releases CAPES)
- [ ] Submeter verbete IPOG via AfC (Articles for Creation)
- [ ] Em paralelo: draft verbete Alexandre Caramaschi com 6-8 referências
- [ ] Pre-flight check com revisor wiki (consultoria Wikipedia-pt voluntária)
- [ ] Push verbetes ao vivo + cross-link Wikidata sitelinks

### Fase 3 — 2027.1 (jan-mar) · INTERNACIONAL + KG completo

- [ ] Traduzir verbete IPOG para Wikipedia EN (mercado LLM-US)
- [ ] Submeter Brasil GEO para Wikipedia EN (mais permissiva em tech)
- [ ] Cross-link com Brave Search KG + Bing KG
- [ ] Wikidata Lexeme para "GEO" pt-BR (Q-Lid) reforçando entidade conceitual
- [ ] Schema.org `mainEntityOfPage` apontando para verbetes ao vivo

---

## 9. Snippets schema.org canônicos pós-Wikidata

Após executar Quickstatements, atualizar:

1. `site/src/lib/schemas/educational-organization.ts` — adicionar `identifier` para e-MEC:
   ```ts
   identifier: [{
     '@type': 'PropertyValue',
     propertyID: 'e-MEC',
     value: '12916',
     url: 'https://emec.mec.gov.br/emec/consulta-cadastro/detalhes-ies/d96957f455f6405d14c6542552b0f6eb/MTI5MTY='
   }]
   ```
2. `site/src/lib/schemas/publisher.ts` — adicionar Wikidata canônico em `sameAs`:
   ```ts
   sameAs: [..., 'https://www.wikidata.org/wiki/Q138755989']
   ```
3. `site/src/lib/schemas/person-alexandre.ts` — corrigir Q-id Wikidata (atualmente Q130000000 = artigo acadêmico aleatório):
   ```ts
   sameAs: [..., 'https://www.wikidata.org/wiki/Q138755507']  // SUBSTITUIR Q130000000
   ```

---

## 10. Riscos e mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Verbete Wikipedia Brasil GEO deletado por notabilidade | ALTA | Médio (queima de janela) | Adiar para 2027 após 2-3 tier 1 |
| Throttle Quickstatements anônimo | MÉDIA | Baixo | Usar conta logada Alexandre (memória `feedback_wikidata_anonymous_throttle_2026`) |
| Edição LLM-revisada degrada Q54864393 pós-push | BAIXA | Alto | Watch list Wikidata; revisão semanal pós-edit |
| Q138755989 deletado por bot de spam (criado por terceiro) | BAIXA | Alto | Adicionar 2+ referências tier 2 dentro de 7 dias |
| Conflito edição `P159` HQ Brasil GEO ("Paracelsus" vs "Goiânia") | BAIXA | Baixo | Documentar edição com edit summary detalhado |

---

## 11. Métricas de sucesso

- **KPI 5 (cobertura fontes externas) ≥ 4** até 30-06-2026 (definido no risk register R-013/R-016).
- **Q54864393 com 25+ claims** até 30-06-2026.
- **Verbete Wikipedia IPOG submetido** até 16-08-2026 (Sprint 7).
- **Wikipedia IPOG ≥ 250 linhas** até 30-10-2026.
- **Q138755507 Alexandre com sitelink Wikipedia pt-BR** até 30-12-2026.
- **Cross-link Wikidata × Wikipedia × schema.org operacional** em todas as 3 entidades até 31-03-2027.

---

## 12. Referências

- KB Wave A: `docs/research/seo-geo-knowledge-base-2026-05-17.md` (causa #1 de citação cross-engine)
- Risk register: `docs/05-risk-register.md` (R-013 Wikipedia/Reddit gap, R-016 a definir)
- Memória global: `feedback_wikidata_anonymous_throttle_2026`
- Política Wikipedia pt: `https://pt.wikipedia.org/wiki/Wikipédia:Critérios_de_notoriedade`
- WikiProject Higher education: `https://www.wikidata.org/wiki/Wikidata:WikiProject_Higher_education/Recommended_statements`
- Property e-MEC: `https://www.wikidata.org/wiki/Property:P5148`
- arXiv 2503.02879 (janela degradação LLM-revisada): KB Wave A §2.4

---

**Owner técnico:** Wave III (esta sessão)
**Owner de execução:** Alexandre Caramaschi (humano)
**Próximo checkpoint:** 22-05-2026 (Blocos B+C executados) → 25-05-2026 (Bloco A executado) → 16-08-2026 (Sprint 7 Wikipedia submetida)
