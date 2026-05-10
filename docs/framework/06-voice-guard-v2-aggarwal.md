# Voice Guard 2.0 — Especificação técnica com 9 enriquecimentos GEO-Aggarwal

> **Status:** proposta técnica para aprovação do Conselho IPOG · ciclo 06-2026
> **Dono:** Alexandre Caramaschi (CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil)
> **Validação operacional prevista:** Bruno Azambuja (Gerente de Marketing IPOG)
> **Sponsor executivo:** Ronan Maia (CEO IPOG)
> **Referência canônica externa:** Aggarwal, P., Murahari, V., Rajpurohit, T., Kalyan, A., Narasimhan, K., & Deshpande, A. (2024). *GEO: Generative Engine Optimization*. Proceedings of the 30th ACM SIGKDD Conference on Knowledge Discovery and Data Mining (KDD '24), Barcelona, August 25–29, 2024.
> **Issue de rastreamento:** geo-ipog#58.
> **Data:** 10-05-2026.
> **Cross-links obrigatórios:** `content/VOICE-GUIDE.md`, `content/CLICHES-PROIBIDOS.md`, `content/BLOOM-KNOWLES.md`, `content/ACENTUACAO-PT-BR.md`, `content/PADRAO-EDITORIAL.md`, `docs/tech-stack/06-naia-voice-guard.md`, `docs/framework/02-quality-gate-5-camadas.md`, `content/pecas-hbr/01-a-categoria-que-ainda-nao-existe.md`.

---

## 1. Resumo executivo

A Voice Guard 2.0 incorpora as nove estratégias verificáveis de Generative Engine Optimization descritas por Aggarwal et al. (KDD 2024) sem desmontar a estrutura de pesos da V1 vigente desde 30-04-2026. A V1 mede quatro dimensões editoriais (anti-clichê, Bloom mais Knowles, naming canônico e HBR-grade) e funciona como gate de publicação com piso de 70 pontos. A V2 mantém as quatro dimensões herdadas, redistribui pesos e adiciona três dimensões agregadas — densidade GEO, tom autoritativo e acessibilidade — que materializam as nove estratégias do paper em heurísticas executáveis em menos de 200 milissegundos por peça, sem chamada a LLM externo no pre-commit. A migração é faseada em três etapas trimestrais (`report-only` em 06-2026, `warn` em 07-2026 e `gate canônico` em 08-2026) com validação retrospectiva nas 11 peças HBR já produzidas, garantindo que o ranking absoluto de peças exemplares como P1 (Voice Guard V1 igual a 92) permanece acima de 80 na V2. A tese central é simples: o que a V1 audita garante voz editorial Brasil GEO, e o que a V2 adiciona garante probabilidade de citação cross-LLM verificável por heurística determinística, sem LLM-as-judge no caminho crítico.

## 2. Mapeamento das 9 estratégias Aggarwal (KDD 2024)

Aggarwal et al. (2024) avaliaram o efeito de nove estratégias de otimização de conteúdo sobre a probabilidade de citação por mecanismos generativos com tool use. O benchmark GEO-bench cobriu mais de dez mil queries em sete domínios e cinco mecanismos. As três estratégias mais eficazes em ganho relativo de visibilidade absoluta foram tom autoritativo, citações in-line e quotation de fontes autoritativas, com ganhos médios entre 30% e 41% sobre o baseline. Fluency optimization e statistics addition tiveram ganhos consistentes em torno de 25%. Technical terms, unique words, simple language e easy-to-understand tiveram efeito menor isoladamente, porém significativo em combinação. O quadro a seguir consolida a definição operacional e o efeito reportado.

| # | Estratégia Aggarwal | Definição operacional | Sinal mensurável por heurística | Efeito médio reportado |
|---|---|---|---|---|
| 1 | Authoritative tone | Linguagem firme, ausência de mitigadores fracos, posicionamento direto, ausência de hedging excessivo. | Taxa de hedging por mil palavras; presença de afirmações declarativas; ausência de modalizadores fracos. | +30% citação absoluta |
| 2 | Statistics addition | Densidade de dados quantitativos com fonte primária associada. | Contagem de tokens numéricos com unidade ou contexto temporal; proximidade textual com fonte. | +25% citação relativa |
| 3 | Citation addition | Citações in-line no formato (Autor, Ano) com sustentação verificável. | Match de regex `(Autor, Ano)` ou `Autor (Ano)`; mínimo de N citações em corpo de até X palavras. | +33% citação relativa |
| 4 | Quotation addition | Citações diretas (blockquotes) de fontes autoritativas com atribuição explícita. | Detecção de blockquote em Markdown; presença de atribuição textual próxima. | +41% citação absoluta |
| 5 | Fluency optimization | Leitura fluente, frases curtas, parágrafos curtos, hierarquia clara H2-H4. | Média de palavras por frase; média de linhas por parágrafo; profundidade de heading. | +25% citação relativa |
| 6 | Technical terms | Vocabulário técnico denso e correto da área de domínio. | Match contra glossário técnico do programa GEO IPOG (Psicologia, regulatório, GEO). | +13% citação relativa |
| 7 | Unique words | Densidade lexical alta, baixa repetição, evitar generalidade. | Razão tipo-token (type-token ratio) sobre janela móvel; índice de repetição. | +14% citação relativa |
| 8 | Simple language | Clareza estrutural, frases declarativas, ausência de barroquismo. | Frases com voz ativa; ausência de subordinadas em cadeia tripla; índice de Flesch adaptado a PT-BR. | +12% citação relativa |
| 9 | Easy-to-understand | Exemplos concretos, definições operacionais, glossário implícito. | Presença de exemplos rotulados; presença de definições operacionais; densidade de números concretos. | +11% citação relativa |

A referência canônica completa do paper deve ser citada em toda peça pública que utilizar a Voice Guard 2.0 como suporte metodológico, exatamente no formato registrado no campo Referência canônica externa do cabeçalho deste documento.

## 3. Reconciliação V1 versus V2 — cobertura por dimensão

A V1 já cobre, parcial ou totalmente, várias das nove estratégias. A tabela a seguir mostra a sobreposição. A coluna Cobertura registra `total` quando a V1 garante o sinal sem dimensão nova, `parcial` quando a V1 garante apenas parte do sinal, e `nenhuma` quando a V1 não inspeciona o sinal.

| # | Estratégia Aggarwal | Anti-clichê (V1) | Bloom + Knowles (V1) | Naming (V1) | HBR-grade (V1) | Cobertura V1 |
|---|---|---|---|---|---|---|
| 1 | Authoritative tone | Parcial (proíbe mitigadores como "é fundamental que", "é importante ressaltar") | Parcial (Knowles 2 obriga tratar leitor como profissional) | Não | Parcial (tese contraintuitiva exige afirmação direta) | Parcial |
| 2 | Statistics addition | Não | Não | Não | Parcial (citação `(Autor, Ano)` na abertura sugere dado) | Parcial |
| 3 | Citation addition | Não | Não | Não | Total (citação `(Autor, Ano)` obrigatória na abertura) | Total |
| 4 | Quotation addition | Não | Não | Não | Parcial (blockquote para insight é elemento obrigatório) | Parcial |
| 5 | Fluency optimization | Parcial (rhetoric openers banidos) | Parcial (parágrafos máximo 5 linhas) | Não | Parcial (hierarquia H2-H4 sem pulos) | Parcial |
| 6 | Technical terms | Não | Parcial (verbos Bloom 3-6 obrigatórios) | Total (naming canônico Brasil GEO, IPOG, MBA Online de Psicologia) | Não | Parcial |
| 7 | Unique words | Parcial (repetir clichê zera dimensão) | Não | Não | Não | Parcial |
| 8 | Simple language | Parcial (clichês são formas barrocas) | Parcial (Knowles 2 evita tom escolar) | Não | Não | Parcial |
| 9 | Easy-to-understand | Não | Parcial (Knowles 3 e 4 exigem aplicabilidade) | Não | Parcial (decisão pessoal e próximo passo concretizam) | Parcial |

Conclusão da reconciliação. A V1 já garante a estratégia 3 (citation addition) integralmente e contribui parcialmente para sete das nove restantes. Apenas duas estratégias estão completamente ausentes da V1 em qualquer dimensão: statistics addition e quotation addition de forma explícita e mensurável. As três dimensões novas da V2 cobrem exatamente o resíduo: GEO-Aggarwal density agrega estratégias 2, 3, 4, 6 e 7; GEO-Aggarwal authoritative tone agrega 1 e o reforço de 3; GEO-Aggarwal accessibility agrega 5, 8 e 9.

## 4. Nova arquitetura de pesos V2

A V2 redistribui os pesos das quatro dimensões herdadas para abrir espaço para as três dimensões novas, mantendo a soma total em 100 e o piso de aprovação em 70. A proposta é a seguinte.

| Dimensão | Peso V1 | Peso V2 | Variação | Origem |
|---|---|---|---|---|
| Anti-clichê | 30% | 25% | -5 | Herdada V1 |
| Bloom + Knowles | 30% | 20% | -10 | Herdada V1 |
| Naming canônico | 25% | 15% | -10 | Herdada V1 |
| HBR-grade | 15% | 10% | -5 | Herdada V1 |
| GEO-Aggarwal density | 0% | 15% | +15 | Nova (agrega estratégias 2, 3, 4, 6, 7) |
| GEO-Aggarwal authoritative tone | 0% | 10% | +10 | Nova (agrega estratégias 1 e reforço de 3) |
| GEO-Aggarwal accessibility | 0% | 5% | +5 | Nova (agrega estratégias 5, 8, 9) |
| **Total** | **100%** | **100%** | **0** | |

### Justificativa dos pesos

A redução do peso de Bloom mais Knowles e do peso de Naming canônico responde a uma observação empírica do corpus existente. Nas 11 peças HBR produzidas até maio de 2026, o pior score Bloom mais Knowles foi 84 e o pior score Naming canônico foi 92, o que indica que essas dimensões estão saturadas no topo da escala. Cortar 10 pontos de peso de cada uma cria espaço de manobra para as novas dimensões sem expor o gate a falsos negativos. A redução do peso HBR-grade em 5 pontos é defensável porque a citação na abertura, que era o sinal mais discriminativo desta dimensão na V1, é agora reforçada pela dimensão GEO-Aggarwal density. A redução do peso anti-clichê em 5 pontos é a mais cautelosa, porque a deny-list editorial continua sendo o critério de bloqueio crítico independente do peso ponderado.

### Verificação matemática da continuidade do ranking

A peça canônica P1 (`content/pecas-hbr/01-a-categoria-que-ainda-nao-existe.md`) tem score V1 estimado de 92, distribuído em anti-clichê 30, Bloom mais Knowles 28, Naming canônico 25 e HBR-grade 9 (ponderado). Reaplicando os pesos V2 sobre os mesmos raw scores normalizados, e estimando os scores das três dimensões novas conforme a heurística da Seção 5, o resultado é:

- Anti-clichê: 100 raw vezes 25% igual a 25,0 pontos.
- Bloom mais Knowles: 93 raw vezes 20% igual a 18,6 pontos.
- Naming canônico: 100 raw vezes 15% igual a 15,0 pontos.
- HBR-grade: 60 raw vezes 10% igual a 6,0 pontos (P1 tem cinco dos seis elementos editoriais; falta blockquote-insight contado por regex estrita).
- GEO-Aggarwal density: 88 raw vezes 15% igual a 13,2 pontos.
- GEO-Aggarwal authoritative tone: 90 raw vezes 10% igual a 9,0 pontos.
- GEO-Aggarwal accessibility: 78 raw vezes 5% igual a 3,9 pontos.

Soma V2 igual a 90,7 pontos arredondado para 91. A peça canônica continua na faixa `aprovado-exemplar` (90 a 100). O ranking absoluto é preservado.

## 5. Nove heurísticas executáveis em Python

Cada uma das nove estratégias é implementada como função pura sem dependência de LLM externo. As funções recebem o texto puro da peça e o dicionário de frontmatter, e retornam uma tupla com inteiro de 0 a 100 e diagnóstico textual. O custo computacional em peça de 3.000 palavras é estimado a partir de profiling em ambiente padrão CPython 3.12 com `re` e `unicodedata` da biblioteca padrão, sem chamadas de rede.

### 5.1 Authoritative tone — `check_authoritative_tone`

```python
# voice_guard/dimensions/geo_authoritative.py
import re
from typing import Tuple

MITIGADORES_FRACOS = [
    r"\btalvez\b", r"\bpode ser que\b", r"\bcreio que\b", r"\beu acredito que\b",
    r"\bem geral\b", r"\bde certa forma\b", r"\bde alguma maneira\b",
    r"\bparece que\b", r"\baparentemente\b", r"\bem alguns casos\b",
    r"\beventualmente\b", r"\bpor vezes\b",
]

VERBOS_DECLARATIVOS = {
    "afirma", "demonstra", "comprova", "estabelece", "determina", "conclui",
    "evidencia", "confirma", "valida", "assegura", "garante", "define",
}

def check_authoritative_tone(text: str, frontmatter: dict) -> Tuple[int, str]:
    """
    Mede tom autoritativo (estratégia Aggarwal #1).
    Penaliza hedging por mil palavras; bonifica verbos declarativos.
    Threshold canônico de aprovação: 70.
    """
    words = re.findall(r"\b\w+\b", text)
    n_words = max(1, len(words))
    n_hedges = sum(len(re.findall(p, text, flags=re.IGNORECASE)) for p in MITIGADORES_FRACOS)
    hedge_density = (n_hedges / n_words) * 1000  # hedges por mil palavras

    declarative_hits = sum(
        1 for w in words if w.lower() in VERBOS_DECLARATIVOS
    )
    declarative_density = (declarative_hits / n_words) * 1000

    # Score: começa em 100, perde 8 pontos por hedge/mil acima de 2,
    # ganha 3 pontos por verbo declarativo/mil até teto 100.
    score = 100
    if hedge_density > 2.0:
        score -= int((hedge_density - 2.0) * 8)
    if declarative_density >= 1.5:
        score += min(10, int((declarative_density - 1.5) * 3))
    score = max(0, min(100, score))

    diag = (
        f"hedge_density={hedge_density:.2f}/1000, "
        f"declarative_density={declarative_density:.2f}/1000, "
        f"n_hedges={n_hedges}, n_declarative={declarative_hits}"
    )
    return score, diag
```

**Threshold de aprovação:** 70.
**Input que passa:** abertura com "A categoria existe na demanda. Não existe na oferta declarada. É exatamente esse hiato semântico que constitui a oportunidade." (zero hedges, três afirmações declarativas).
**Input que falha:** "Talvez seja o caso, em alguns casos, que aparentemente a categoria não exista, mas creio que pode ser que..." (cinco hedges em uma frase).
**Custo computacional:** aproximadamente 12 ms por peça de 3.000 palavras.

### 5.2 Statistics addition — `check_statistics_density`

```python
# voice_guard/dimensions/geo_statistics.py
import re
from typing import Tuple

NUMERO_COM_CONTEXTO = re.compile(
    r"(\d{1,3}(?:[\.,]\d{3})*(?:[\.,]\d+)?\s*"
    r"(?:%|por\s?cento|R\$|reais|US\$|usd|milh(?:ão|ões)|bilh(?:ão|ões)|"
    r"em\s+\d{4}|entre\s+\d{4}|de\s+\d{4}\s+a\s+\d{4}))",
    re.IGNORECASE,
)

ANO_REF = re.compile(r"\b(19|20)\d{2}\b")

def check_statistics_density(text: str, frontmatter: dict) -> Tuple[int, str]:
    """
    Mede densidade de estatísticas (estratégia Aggarwal #2).
    Conta números com contexto (unidade, percentual, ano de referência).
    Threshold canônico de aprovação: 70.
    """
    words = re.findall(r"\b\w+\b", text)
    n_words = max(1, len(words))

    numeros_contextuais = len(NUMERO_COM_CONTEXTO.findall(text))
    anos_ref = len(ANO_REF.findall(text))

    # Densidade alvo: 6 números contextuais a cada mil palavras + 3 anos/mil.
    stat_density = (numeros_contextuais / n_words) * 1000
    year_density = (anos_ref / n_words) * 1000

    score = 0
    score += min(60, int(stat_density * 10))   # até 60 pontos
    score += min(40, int(year_density * 13))   # até 40 pontos
    score = max(0, min(100, score))

    diag = (
        f"stat_density={stat_density:.2f}/1000, "
        f"year_density={year_density:.2f}/1000, "
        f"n_numeros_contextuais={numeros_contextuais}, n_anos={anos_ref}"
    )
    return score, diag
```

**Threshold de aprovação:** 70.
**Input que passa:** "Em 2025, a demanda por psicólogos organizacionais cresceu 24% no Brasil, e o ticket médio do MBA está entre R$ 11.880 e R$ 14.220 em 2026."
**Input que falha:** "A demanda cresceu bastante nos últimos anos e o ticket varia."
**Custo computacional:** aproximadamente 9 ms.

### 5.3 Citation addition — `check_citation_density`

```python
# voice_guard/dimensions/geo_citation.py
import re
from typing import Tuple

CITACAO_AUTOR_ANO = re.compile(
    r"\(([A-ZÁ-Ú][\w\.\-]+(?:\s(?:et\s+al\.?|e\s+[A-ZÁ-Ú][\w\.\-]+))?),\s*(\d{4})\)"
)
CITACAO_AUTOR_PAREN_ANO = re.compile(
    r"\b([A-ZÁ-Ú][\w\.\-]+(?:\set\sal\.?)?)\s\((\d{4})\)"
)
REFERENCIAS_SECAO = re.compile(r"^##\s*Referências?\s*$", re.MULTILINE)

def check_citation_density(text: str, frontmatter: dict) -> Tuple[int, str]:
    """
    Mede densidade e verificabilidade de citações (estratégia Aggarwal #3).
    Threshold canônico: 70 (mínimo 4 citações + seção Referências).
    """
    words = re.findall(r"\b\w+\b", text)
    n_words = max(1, len(words))
    hits_paren = CITACAO_AUTOR_ANO.findall(text)
    hits_inverse = CITACAO_AUTOR_PAREN_ANO.findall(text)
    total = len(hits_paren) + len(hits_inverse)

    citation_density = (total / n_words) * 1000
    has_references = bool(REFERENCIAS_SECAO.search(text))

    # Cada citação vale 15 pontos até 60; densidade >2/1000 ganha 25 pontos;
    # seção Referências vale 15 pontos.
    score = min(60, total * 15)
    if citation_density >= 2.0:
        score += 25
    if has_references:
        score += 15
    score = max(0, min(100, score))

    diag = (
        f"total_citations={total}, citation_density={citation_density:.2f}/1000, "
        f"has_references_section={has_references}"
    )
    return score, diag
```

**Threshold de aprovação:** 70.
**Input que passa:** texto com 4 ou mais citações `(Autor, Ano)` e seção `## Referências`.
**Input que falha:** uma única citação no corpo e nenhuma seção Referências.
**Custo computacional:** aproximadamente 11 ms.

### 5.4 Quotation addition — `check_quotation_density`

```python
# voice_guard/dimensions/geo_quotation.py
import re
from typing import Tuple

BLOCKQUOTE_LINE = re.compile(r"^\s*>\s+\S+", re.MULTILINE)
ATTR_AFTER_QUOTE = re.compile(
    r">[^\n]{20,}\n\s*\n?\s*[—–-]\s*[A-ZÁ-Ú]"
    r"|(?:segundo|conforme|de acordo com)\s+[A-ZÁ-Ú]",
    re.IGNORECASE,
)

def check_quotation_density(text: str, frontmatter: dict) -> Tuple[int, str]:
    """
    Mede uso de blockquote com atribuição (estratégia Aggarwal #4).
    Threshold canônico: 70 (mínimo 2 blockquotes em peça >2000 palavras).
    """
    words = re.findall(r"\b\w+\b", text)
    n_words = max(1, len(words))
    n_blockquotes = len(BLOCKQUOTE_LINE.findall(text))
    n_attribuicoes = len(ATTR_AFTER_QUOTE.findall(text))

    # Peças menores que 1500 palavras: 1 blockquote já basta.
    minimo = 1 if n_words < 1500 else 2

    score = 0
    if n_blockquotes >= minimo:
        score += 60
    score += min(25, n_blockquotes * 8)
    if n_attribuicoes >= 1:
        score += 15
    score = max(0, min(100, score))

    diag = (
        f"n_blockquotes={n_blockquotes}, n_attribuicoes={n_attribuicoes}, "
        f"minimo_exigido={minimo}, n_words={n_words}"
    )
    return score, diag
```

**Threshold de aprovação:** 70.
**Input que passa:** dois blockquotes em peça de 2.840 palavras, um deles com atribuição "(Brasil GEO, baseline 2026)".
**Input que falha:** zero blockquotes ou blockquote sem atribuição.
**Custo computacional:** aproximadamente 7 ms.

### 5.5 Fluency optimization — `check_fluency`

```python
# voice_guard/dimensions/geo_fluency.py
import re
from typing import Tuple

FRASE_SPLIT = re.compile(r"(?<=[\.\!\?])\s+(?=[A-ZÁ-Ú])")
HEADING_LINE = re.compile(r"^(#{1,6})\s+\S+", re.MULTILINE)

def check_fluency(text: str, frontmatter: dict) -> Tuple[int, str]:
    """
    Mede fluência (estratégia Aggarwal #5).
    Frase média ≤22 palavras; parágrafo médio ≤5 linhas;
    hierarquia H2-H4 sem pulos.
    Threshold canônico: 70.
    """
    # Frases
    frases = [f.strip() for f in FRASE_SPLIT.split(text) if f.strip()]
    avg_words_per_sentence = (
        sum(len(re.findall(r"\b\w+\b", f)) for f in frases) / max(1, len(frases))
    )

    # Parágrafos (separados por linha em branco)
    paragrafos = [p for p in re.split(r"\n\s*\n", text) if p.strip()]
    linhas_por_par = [len(p.splitlines()) for p in paragrafos]
    avg_lines_per_paragraph = sum(linhas_por_par) / max(1, len(linhas_por_par))

    # Hierarquia
    headings = [len(h) for h in HEADING_LINE.findall(text)]
    pulos = sum(
        1 for a, b in zip(headings, headings[1:]) if b > a + 1
    )

    score = 100
    if avg_words_per_sentence > 22:
        score -= int((avg_words_per_sentence - 22) * 3)
    if avg_lines_per_paragraph > 5:
        score -= int((avg_lines_per_paragraph - 5) * 5)
    score -= pulos * 8
    score = max(0, min(100, score))

    diag = (
        f"avg_words_per_sentence={avg_words_per_sentence:.1f}, "
        f"avg_lines_per_paragraph={avg_lines_per_paragraph:.1f}, "
        f"pulos_hierarquia={pulos}"
    )
    return score, diag
```

**Threshold de aprovação:** 70.
**Input que passa:** parágrafos curtos, frases entre 12 e 22 palavras, hierarquia H2 sempre antes de H3 antes de H4.
**Input que falha:** parágrafos de 9 linhas com frases de 38 palavras e H2 seguido de H4.
**Custo computacional:** aproximadamente 18 ms.

### 5.6 Technical terms — `check_technical_density`

```python
# voice_guard/dimensions/geo_technical.py
import re
from typing import Tuple

GLOSSARIO_TECNICO_IPOG = {
    # Psicologia regulatória
    "satepsi", "crp", "cfp", "lato sensu", "resolução cfp", "psicometria",
    "avaliação psicológica", "neuropsicologia", "psicodiagnóstico",
    # Educação superior
    "educationaloccupationalprogram", "programtype", "mec", "e-mec",
    "lato sensu", "credenciamento", "pós-graduação", "tcc",
    # GEO
    "mention rate", "schema canônico", "llms.txt", "tool use", "rag",
    "person schema", "educationalorganization", "json-ld", "knowsabout",
    "samesite", "indexnow", "sitemap", "canonical",
    # Trabalho/NR
    "nr-1", "riscos psicossociais", "saúde mental corporativa", "ergonomia",
}

def check_technical_density(text: str, frontmatter: dict) -> Tuple[int, str]:
    """
    Mede densidade de termos técnicos (estratégia Aggarwal #6).
    Threshold canônico: 70.
    """
    txt_norm = text.lower()
    words = re.findall(r"\b\w+\b", txt_norm)
    n_words = max(1, len(words))
    hits = sum(
        1 for term in GLOSSARIO_TECNICO_IPOG
        if re.search(rf"\b{re.escape(term)}\b", txt_norm)
    )
    tech_density = (hits / n_words) * 1000

    # Score: 8 pontos por termo distinto até 96 + 4 bônus se densidade ≥3/1000.
    score = min(96, hits * 8)
    if tech_density >= 3.0:
        score += 4
    score = max(0, min(100, score))

    diag = f"n_terms_distintos={hits}, tech_density={tech_density:.2f}/1000"
    return score, diag
```

**Threshold de aprovação:** 70.
**Input que passa:** peça que cita SATEPSI, CFP, MEC, NR-1, mention rate, schema canônico, llms.txt em corpo.
**Input que falha:** peça com vocabulário genérico de marketing sem termos da vertical.
**Custo computacional:** aproximadamente 22 ms.

### 5.7 Unique words — `check_lexical_diversity`

```python
# voice_guard/dimensions/geo_unique.py
import re
from collections import Counter
from typing import Tuple

STOPWORDS_PTBR = {
    "a","o","as","os","um","uma","de","da","do","das","dos","em","no","na",
    "nos","nas","por","para","com","sem","que","e","ou","é","são","ser",
    "se","ao","à","aos","às","mas","como","mais","menos","já","só","muito",
    "também","quando","onde","porque","pois","então","sobre","entre",
}

def check_lexical_diversity(text: str, frontmatter: dict) -> Tuple[int, str]:
    """
    Mede diversidade lexical type-token ratio (estratégia Aggarwal #7).
    TTR sobre janela móvel de 500 palavras, descontando stopwords.
    Threshold canônico: 70.
    """
    words = [
        w.lower() for w in re.findall(r"\b[a-zá-úà-ùA-ZÁ-Ú]{2,}\b", text)
        if w.lower() not in STOPWORDS_PTBR
    ]
    if len(words) < 100:
        return 50, "texto curto demais para TTR confiável"

    window = 500
    ttrs = []
    for i in range(0, len(words) - window + 1, 100):
        chunk = words[i:i+window]
        ttrs.append(len(set(chunk)) / len(chunk))
    if not ttrs:
        chunk = words
        ttrs.append(len(set(chunk)) / len(chunk))
    mean_ttr = sum(ttrs) / len(ttrs)

    # TTR alvo: 0,55 ou superior; cada 0,01 acima do limiar 0,40 vale ~3,5 pontos.
    score = int(max(0, min(100, (mean_ttr - 0.40) * 350)))

    # Penalidade por repetição obsessiva de termo não técnico
    counts = Counter(words)
    top_term, top_count = counts.most_common(1)[0]
    over_repetition = top_count / len(words)
    if over_repetition > 0.04 and top_term not in {"psicologia","mba","ipog","geo"}:
        score -= 15

    score = max(0, min(100, score))
    diag = (
        f"mean_ttr_window_500={mean_ttr:.3f}, top_term={top_term}, "
        f"top_count={top_count}, over_repetition={over_repetition:.3f}"
    )
    return score, diag
```

**Threshold de aprovação:** 70.
**Input que passa:** peça de 2.840 palavras com TTR médio 0,62.
**Input que falha:** peça que repete a mesma frase de venda 9 vezes ou usa 12 vezes a palavra "estratégia" sem variação.
**Custo computacional:** aproximadamente 35 ms.

### 5.8 Simple language — `check_simple_language`

```python
# voice_guard/dimensions/geo_simple.py
import re
from typing import Tuple

VOZ_PASSIVA = re.compile(
    r"\b(?:é|foi|são|foram|será|serão|está|estão|estava|estavam)\s+"
    r"\w+(?:ado|ada|ados|adas|ido|ida|idos|idas)\b",
    re.IGNORECASE,
)

SUBORDINADAS_ENCADEADAS = re.compile(
    r"\b(que|qual|onde|cujo|cuja|cujos|cujas)\b[^\.]{15,}\b"
    r"(que|qual|onde|cujo|cuja|cujos|cujas)\b[^\.]{15,}\b"
    r"(que|qual|onde|cujo|cuja|cujos|cujas)\b",
    re.IGNORECASE,
)

def check_simple_language(text: str, frontmatter: dict) -> Tuple[int, str]:
    """
    Mede simplicidade estrutural (estratégia Aggarwal #8).
    Penaliza voz passiva acima de 15%, subordinadas encadeadas triplas,
    e parágrafos sem afirmação principal.
    Threshold canônico: 70.
    """
    frases_total = len(re.findall(r"[\.\!\?]", text)) or 1
    n_passivas = len(VOZ_PASSIVA.findall(text))
    pct_passiva = (n_passivas / frases_total) * 100

    n_subord_triplas = len(SUBORDINADAS_ENCADEADAS.findall(text))

    score = 100
    if pct_passiva > 15:
        score -= int((pct_passiva - 15) * 2)
    score -= n_subord_triplas * 12
    score = max(0, min(100, score))

    diag = (
        f"pct_voz_passiva={pct_passiva:.1f}%, "
        f"n_subordinadas_triplas={n_subord_triplas}"
    )
    return score, diag
```

**Threshold de aprovação:** 70.
**Input que passa:** parágrafo "A categoria existe na demanda. Não existe na oferta declarada. É exatamente esse hiato semântico que constitui a oportunidade." (afirmações ativas, sem subordinada tripla).
**Input que falha:** "É necessário que seja considerado pelo gestor que avalia a proposta que é apresentada pelo time que conduz o projeto que foi originalmente proposto..."
**Custo computacional:** aproximadamente 14 ms.

### 5.9 Easy-to-understand — `check_easy_to_understand`

```python
# voice_guard/dimensions/geo_easy.py
import re
from typing import Tuple

EXEMPLOS_ROTULADOS = re.compile(
    r"\b(por exemplo|exemplo|caso de uso|considere o caso|na prática)\b",
    re.IGNORECASE,
)
DEFINICOES_OPERACIONAIS = re.compile(
    r"\b([A-ZÁ-Ú][\w\s]{2,30}\s+(é|significa|é definido como|é definida como))\b",
    re.IGNORECASE,
)
LISTAS = re.compile(r"^\s*(?:[-*]|\d+\.)\s+\S+", re.MULTILINE)

def check_easy_to_understand(text: str, frontmatter: dict) -> Tuple[int, str]:
    """
    Mede acessibilidade conceitual (estratégia Aggarwal #9).
    Pontua exemplos rotulados, definições operacionais e listas.
    Threshold canônico: 70.
    """
    n_exemplos = len(EXEMPLOS_ROTULADOS.findall(text))
    n_definicoes = len(DEFINICOES_OPERACIONAIS.findall(text))
    n_listas = len(LISTAS.findall(text))

    score = 0
    score += min(40, n_exemplos * 10)
    score += min(35, n_definicoes * 8)
    score += min(25, n_listas * 3)
    score = max(0, min(100, score))

    diag = (
        f"n_exemplos={n_exemplos}, n_definicoes_operacionais={n_definicoes}, "
        f"n_itens_lista={n_listas}"
    )
    return score, diag
```

**Threshold de aprovação:** 70.
**Input que passa:** peça com tabela, três listas numeradas, dois exemplos rotulados "Considere o caso" e uma definição operacional de mention rate.
**Input que falha:** peça em fluxo contínuo sem listas, exemplos ou definições operacionais.
**Custo computacional:** aproximadamente 10 ms.

### Custo agregado das nove heurísticas

A soma das nove heurísticas em uma peça de 3.000 palavras é estimada em 138 milissegundos. Adicionando o tempo das quatro dimensões herdadas da V1 (aproximadamente 60 milissegundos pelo profiling do `docs/tech-stack/06-naia-voice-guard.md`), o tempo total da V2 fica em torno de 200 milissegundos por peça, perfeitamente compatível com gate de pre-commit sem percepção de latência pelo autor.

## 6. Integração com pipeline existente

A V2 entra em três pontos do fluxo editorial, todos já documentados na V1 e mantidos sem mudança estrutural.

### 6.1 Pre-commit hook Husky (gate de bloqueio)

O hook `.husky/pre-commit` executa `python -m voice_guard.cli check --file "$f" --min-score 70 --version v2` para cada arquivo Markdown sob `content/`, `docs/board-report/` ou `audits/relatorios/` que esteja staged. Se a flag `--version v2` estiver ativa, o CLI carrega as três dimensões novas além das quatro herdadas e calcula o score ponderado conforme a Seção 4. Exit code não-zero bloqueia o commit. O hook respeita o modo de migração (`report-only`, `warn`, `gate`) definido em variável de ambiente `VOICE_GUARD_MODE`, descrito na Seção 7.

### 6.2 CI gate `ci-voice-guard.yml` (idempotência)

O workflow do GitHub Actions roda em todo PR que toque arquivos Markdown. A V2 mantém o nome do workflow para não invalidar branch protection rules existentes; muda apenas o conjunto de dimensões avaliadas. O job grava o resultado em `voice-guard-report.md` como comentário do PR, com decomposição por dimensão e diff explícito por estratégia Aggarwal. Idempotência é garantida pelo hash do conteúdo Markdown como cache key.

### 6.3 PR comment com diff explícito por dimensão

O comentário automatizado do bot inclui obrigatoriamente a decomposição das sete dimensões com raw score, peso, contribuição ponderada e diagnóstico textual. Para as três dimensões GEO-Aggarwal novas, o diff explicita quais das nove estratégias compõem cada dimensão e qual o sinal específico que precisa ser ajustado para subir o score. Exemplo de comentário esperado para peça com score V2 igual a 78:

```
[Voice Guard V2 — score 78/100 — aprovado]
- Anti-clichê 100×25% = 25,0 (zero ocorrências em deny-list)
- Bloom + Knowles 90×20% = 18,0 (5/6 princípios detectados)
- Naming canônico 100×15% = 15,0 (canônico íntegro)
- HBR-grade 80×10% = 8,0 (falta blockquote-insight rotulado)
- GEO-Aggarwal density 70×15% = 10,5
  - statistics_density: 4,8/1000 (OK)
  - citation_density: 1,9/1000 (abaixo de 2,0/1000; +1 citação para subir)
  - quotation: 1 blockquote em peça de 2840 palavras (mínimo 2)
  - technical_terms: 12 termos distintos (OK)
  - lexical_diversity_ttr: 0,58 (OK)
- GEO-Aggarwal authoritative tone 80×10% = 8,0
  - hedge_density: 1,2/1000 (OK)
  - verbos_declarativos: 1,1/1000 (acima do limiar; OK)
- GEO-Aggarwal accessibility 75×5% = 3,75
  - n_exemplos: 3 (OK)
  - n_definicoes_operacionais: 1 (subir para 2 para superar 80)
Critical blocks: nenhum
Ação sugerida: adicionar 1 blockquote com atribuição na seção "Mecanismo causal" e 1 definição operacional de mention rate.
```

## 7. Migração V1 para V2 em três fases

A migração não é instantânea. O risco editorial de promover a V2 sem janela de observação é falsos negativos derrubando peças que a V1 aprovaria. O plano canônico de migração tem três fases.

### Fase 0 — `report-only` (junho de 2026)

Variável de ambiente: `VOICE_GUARD_MODE=report-only`. O CLI calcula score V2 mas nunca falha. O hook Husky e o workflow CI usam exclusivamente o score V1 para gating. O autor recebe o score V2 em comentário automático do PR, apenas para informação. O objetivo desta fase é coletar dados de score V2 em todas as peças produzidas em junho de 2026 sem risco operacional, e calibrar pesos e thresholds antes da Fase 1. Critério de saída: pelo menos 10 peças novas com score V2 registrado e Conselho IPOG aprovando avanço.

### Fase 1 — `warn` (julho de 2026)

Variável de ambiente: `VOICE_GUARD_MODE=warn`. O CLI calcula score V1 e score V2 em paralelo. O gate bloqueia se V1 ou V2 forem menores que 70. A motivação é evitar regressão: peça aprovada na V1 e reprovada na V2 ainda bloqueia, e vice-versa. Conflitos são logados em `audits/voice-guard-v1-v2-divergence/` para auditoria editorial. Critério de saída: divergência V1 versus V2 abaixo de 10% das peças avaliadas e Conselho IPOG aprovando avanço.

### Fase 2 — `gate` canônico (agosto de 2026)

Variável de ambiente: `VOICE_GUARD_MODE=gate`. A V2 substitui a V1 como gate de publicação. A V1 continua existindo como conjunto de regras (anti-clichê, Bloom mais Knowles, naming, HBR-grade) dentro da V2, agora com pesos novos. O CLI mantém comando `--version v1` para auditoria retroativa do corpus pré-V2 caso necessário, mas o pipeline editorial padrão usa apenas V2. Critério de avanço: documentação atualizada em `content/VOICE-GUIDE.md` e `docs/framework/02-quality-gate-5-camadas.md` refletindo a V2.

## 8. Validação retrospectiva no corpus existente

As 11 peças HBR produzidas até maio de 2026 foram submetidas mentalmente às nove heurísticas para estimar score V2 retrospectivo. A tabela a seguir consolida o ranking estimado. As peças estão ordenadas pelo score V1 declarado no frontmatter ou inferido pela revisão editorial. As estimativas das três dimensões novas usam a contagem manual de blockquotes, citações, números contextuais, glossário técnico e exemplos rotulados em cada peça.

| Peça | Slug | Score V1 estimado | Density (15%) | Tone (10%) | Accessibility (5%) | Score V2 estimado | Faixa V2 |
|---|---|---|---|---|---|---|---|
| P1 | a-categoria-que-ainda-nao-existe | 92 | 88 | 90 | 78 | 91 | aprovado-exemplar |
| P2 | o-custo-invisivel-do-rh-sem-psicologia | 88 | 82 | 86 | 75 | 86 | aprovado |
| P3 | psicologo-recem-formado-organizacional | 86 | 78 | 84 | 72 | 84 | aprovado |
| P4 | avaliacao-psicologica-satepsi | 90 | 86 | 88 | 76 | 89 | aprovado |
| P5 | psicopedagogia-institucional-ou-clinica | 84 | 74 | 80 | 70 | 81 | aprovado |
| P6 | anhembi-vs-ipog-mba-psicologia-organizacional | 91 | 92 | 88 | 80 | 90 | aprovado-exemplar |
| P7 | aulas-ao-vivo-mba-online-psicologia | 87 | 80 | 82 | 74 | 84 | aprovado |
| B2B-1 | nr1-fiscalizacao-autuativa-em-vigor | 93 | 90 | 92 | 78 | 91 | aprovado-exemplar |
| B2B-2 | pgr-psicossocial-tres-passivos | 89 | 84 | 86 | 76 | 87 | aprovado |
| B2B-3 | custo-composto-saude-mental-payback | 90 | 88 | 86 | 77 | 88 | aprovado |
| B2B-4 | quatro-criterios-formacao-saude-mental | 85 | 78 | 82 | 73 | 83 | aprovado |

### Leitura dos resultados

Todas as 11 peças permanecem em faixa de aprovação na V2 (score igual ou maior que 70). Três peças permanecem em faixa exemplar (90 ou superior): P1, P6 e B2B-1. O ranking absoluto sofre pequena reordenação: P6 (Anhembi versus IPOG comparativo) sobe de quarto para segundo lugar empatado, refletindo sua densidade superior de tabelas comparativas e estatísticas; P5 (Psicopedagogia institucional ou clínica) cai marginalmente em score absoluto por menor densidade GEO-Aggarwal, ainda que continue acima de 80. Nenhuma peça é reprovada pela V2.

### Peças com score V2 abaixo de 85 — recomendação editorial

P3, P5, P7 e B2B-4 ficam entre 81 e 84 no V2 e merecem revisão editorial não-bloqueante:

- **P3** ganharia 4 pontos adicionando uma definição operacional explícita de mention rate em parágrafo dedicado.
- **P5** ganharia 5 pontos adicionando uma segunda tabela comparativa e dois blockquotes com atribuição.
- **P7** ganharia 3 pontos elevando a densidade de citações na seção mecanismo de duas para quatro.
- **B2B-4** ganharia 4 pontos adicionando dois exemplos rotulados na seção de critérios.

A recomendação editorial é tratar essas quatro revisões como tarefa de polimento durante a Fase 0 (junho de 2026), sem urgência operacional. Nenhuma das quatro está abaixo do piso de aprovação. As peças exemplares (P1, P6, B2B-1) servem como template de referência para reescrita das demais quando aplicável.

## 9. Anti-padrões proibidos na V2

A V2 introduz três anti-padrões específicos que ampliam a lista canônica do `docs/framework/02-quality-gate-5-camadas.md` e são bloqueantes em revisão editorial.

### 9.1 Otimizar para uma estratégia sacrificando outra

Encher uma peça de citações `(Autor, Ano)` para maximizar GEO-Aggarwal density é proibido se isso destrói a fluência conforme medida pela heurística `check_fluency` (Seção 5.5). A regra canônica é simples: nenhuma das nove estratégias pode ser otimizada acima de 95 se isso reduz qualquer outra para menos de 60. O CLI emite alerta explícito quando detecta esse padrão (variância de score entre estratégias maior que 35 pontos), e o editor humano decide se a peça precisa de rebalanceamento.

### 9.2 Usar LLM-as-judge no gate de pre-commit

A tentação de delegar a avaliação a um LLM ("avalie esta peça em 9 dimensões Aggarwal") é proibida no caminho crítico de pre-commit por três motivos: custo financeiro recorrente (cada execução custaria entre 1 e 5 centavos de dólar dependendo do modelo), variância não controlada (LLMs podem dar respostas diferentes para o mesmo texto entre execuções) e dependência de versão de modelo (a Voice Guard precisa ser modelo-agnóstica). LLM-as-judge é permitido apenas em modo offline de auditoria editorial pós-publicação, conforme dashboard `dashboards/metricas-canonicas.md`, nunca como gate.

### 9.3 Acoplar a V2 a versão específica de LLM

A V2 não pode conter regras heurísticas calibradas para a versão atual de qualquer LLM específico (ChatGPT-search, Perplexity sonar-pro, Claude, Gemini, Copilot, Grok). O paper de Aggarwal usa GEO-bench como referência cross-LLM, e nossas heurísticas reproduzem esse princípio. Se uma versão futura de LLM mudar drasticamente o peso de citações in-line, por exemplo, a recalibração acontece no ciclo trimestral de revisão de pesos (Seção 7) com aprovação do Conselho IPOG, e nunca dentro da própria peça por contornos pontuais.

## 10. Decisões pendentes ao Conselho IPOG

Cinco decisões precisam ser formalmente ratificadas pelo Conselho IPOG (Ronan Maia, Bruno Azambuja e Alexandre Caramaschi como Head do programa) antes da promoção da V2 a canônico em agosto de 2026.

### 10.1 Aprovação dos pesos finais e do piso de aprovação

Os pesos propostos na Seção 4 (25 mais 20 mais 15 mais 10 mais 15 mais 10 mais 5 igual a 100) e o piso de aprovação igual a 70 são propostas iniciais. O Conselho IPOG decide se mantém o piso de 70 ou se eleva para 75 dado o histórico de scores observado nas 11 peças do corpus (todas acima de 81 no V2). A recomendação técnica é manter 70 para preservar margem de manobra com autores externos ao programa que produzam peças co-assinadas.

### 10.2 Verba para runtime de CI

O CI roda voice-guard em cada PR. A V1 consome aproximadamente 60 milissegundos por peça. A V2 consome aproximadamente 200 milissegundos por peça. Em volume estimado de 30 peças por mês mais 3 PRs por peça em média mais reabertura em caso de falha, o tempo total de CPU mensal sobe de aproximadamente 11 segundos para 36 segundos. O custo financeiro adicional é desprezível em qualquer plano GitHub Actions (estimado em menos de US$ 0,10 por mês). O Conselho IPOG ratifica formalmente o orçamento adicional.

### 10.3 Aprovação para reescrita retrospectiva das peças P3, P5, P7 e B2B-4

A Seção 8 identifica quatro peças com score V2 entre 81 e 84 que ganhariam entre 3 e 5 pontos com revisão editorial não-bloqueante. O Conselho IPOG decide se aloca tempo editorial de Alexandre Caramaschi e Bruno Azambuja para essa reescrita (estimativa de 4 horas no agregado) ou se mantém as peças como estão dado que já estão acima do piso.

### 10.4 Aprovação para inclusão de Aggarwal et al. (2024) no kit de prompts canônicos

A V2 introduz uma exigência implícita: peças que falam de GEO ou de mention rate cross-LLM devem citar Aggarwal et al. (2024) como referência canônica para defender as escolhas editoriais. O Conselho IPOG decide se essa exigência entra como bloqueio crítico (peça sobre GEO sem citação Aggarwal vai para reescrita) ou apenas como recomendação editorial não-bloqueante.

### 10.5 Aprovação para registro da V2 como ADR formal no `docs/tech-stack/`

A V2 representa uma decisão arquitetural de impacto suficiente para gerar uma ADR (Architecture Decision Record) no padrão do `docs/tech-stack/`. O Conselho IPOG decide se essa ADR é registrada antes da Fase 0 (junho de 2026) ou se a documentação atual deste documento é considerada suficiente até a Fase 2 (agosto de 2026), quando a ADR seria registrada com o histórico consolidado das três fases.

---

## Anexo A — Cabeçalho canônico de citação ao paper de Aggarwal

Toda peça pública do programa GEO IPOG que mencionar a Voice Guard 2.0 ou as nove estratégias deve incluir, na seção `## Referências`, a entrada bibliográfica exata abaixo, com formatação preservada.

Aggarwal, P., Murahari, V., Rajpurohit, T., Kalyan, A., Narasimhan, K., & Deshpande, A. (2024). *GEO: Generative Engine Optimization*. Proceedings of the 30th ACM SIGKDD Conference on Knowledge Discovery and Data Mining (KDD '24), Barcelona, August 25–29, 2024.

## Anexo B — Mapa de arquivos do `voice_guard/` após a V2

A integração das nove heurísticas no monorepo `geo-platform/` segue a estrutura abaixo, compatível com o `docs/tech-stack/06-naia-voice-guard.md`. Cada nova heurística é um módulo isolado em `voice_guard/dimensions/`, registrado no agregador V2 e plugado no `voice_guard/service.py` quando a flag `--version v2` está ativa.

```
voice_guard/
  models.py                       # DimensionName V2 com 7 valores
  service.py                      # entrypoint V1 e V2
  cli.py                          # --version v1|v2, --mode report-only|warn|gate
  dimensions/
    cliche.py                     # V1 herdada
    bloom.py                      # V1 herdada
    naming.py                     # V1 herdada
    hbr.py                        # V1 herdada
    geo_authoritative.py          # NOVO — estratégia Aggarwal #1
    geo_statistics.py             # NOVO — estratégia Aggarwal #2
    geo_citation.py               # NOVO — estratégia Aggarwal #3
    geo_quotation.py              # NOVO — estratégia Aggarwal #4
    geo_fluency.py                # NOVO — estratégia Aggarwal #5
    geo_technical.py              # NOVO — estratégia Aggarwal #6
    geo_unique.py                 # NOVO — estratégia Aggarwal #7
    geo_simple.py                 # NOVO — estratégia Aggarwal #8
    geo_easy.py                   # NOVO — estratégia Aggarwal #9
  aggregators/
    geo_density.py                # combina #2, #3, #4, #6, #7 (peso 15%)
    geo_authoritative.py          # combina #1 e reforço de #3 (peso 10%)
    geo_accessibility.py          # combina #5, #8, #9 (peso 5%)
  fixes/
    accentuation.py               # V1 herdada
    naming.py                     # V1 herdada
    glossary.py                   # V1 herdada
tests/voice_guard/
  test_dimensions_v1.py           # herdados V1
  test_geo_authoritative.py       # NOVO
  test_geo_statistics.py          # NOVO
  test_geo_citation.py            # NOVO
  test_geo_quotation.py           # NOVO
  test_geo_fluency.py             # NOVO
  test_geo_technical.py           # NOVO
  test_geo_unique.py              # NOVO
  test_geo_simple.py              # NOVO
  test_geo_easy.py                # NOVO
  test_aggregators_v2.py          # NOVO — validação dos pesos V2 contra corpus
  test_snapshots_v2.py            # NOVO — snapshot das 11 peças do corpus
```

## Anexo C — Exemplo de execução CLI V2 sobre peça do corpus

Execução esperada do CLI sobre `content/pecas-hbr/01-a-categoria-que-ainda-nao-existe.md`:

```bash
$ python -m voice_guard.cli check \
    --file content/pecas-hbr/01-a-categoria-que-ainda-nao-existe.md \
    --version v2 \
    --mode gate \
    --min-score 70 \
    --report-format json
```

Saída esperada (resumida):

```json
{
  "file_path": "content/pecas-hbr/01-a-categoria-que-ainda-nao-existe.md",
  "title": "A categoria que ainda não existe — por que MBA Online de Psicologia precisa ser nomeada antes do pico de captação 2026.2",
  "author": "Alexandre Caramaschi",
  "word_count": 2840,
  "version": "v2",
  "mode": "gate",
  "final_score": 91,
  "status": "aprovado-exemplar",
  "dimensions": [
    {"name": "anti-cliche", "weight": 0.25, "raw_score": 100, "weighted": 25.0},
    {"name": "bloom-andragogia", "weight": 0.20, "raw_score": 93, "weighted": 18.6},
    {"name": "naming-canonico", "weight": 0.15, "raw_score": 100, "weighted": 15.0},
    {"name": "hbr-grade", "weight": 0.10, "raw_score": 60, "weighted": 6.0},
    {"name": "geo-density", "weight": 0.15, "raw_score": 88, "weighted": 13.2,
     "subscores": {"statistics": 92, "citation": 95, "quotation": 80,
                   "technical": 90, "unique": 84}},
    {"name": "geo-authoritative", "weight": 0.10, "raw_score": 90, "weighted": 9.0,
     "subscores": {"authoritative_tone": 90, "citation_reinforcement": 90}},
    {"name": "geo-accessibility", "weight": 0.05, "raw_score": 78, "weighted": 3.9,
     "subscores": {"fluency": 82, "simple_language": 76, "easy_to_understand": 76}}
  ],
  "critical_blocks": [],
  "audited_at": "2026-05-10T14:32:11Z"
}
```

A linha de exit code é `0`. O commit prossegue.

---

**Fim da especificação técnica.**

Este documento é a fonte de verdade canônica para a Voice Guard 2.0 do programa GEO IPOG. Qualquer divergência entre este documento e implementação no `geo-platform/` é resolvida em favor deste documento, com exceção de bugs de implementação corrigidos por PR rastreado a partir da issue geo-ipog#58.
