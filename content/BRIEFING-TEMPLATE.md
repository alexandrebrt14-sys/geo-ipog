# Briefing canônico de peça HBR-grade — programa GEO IPOG

> **Status:** vigente desde 2026-04-30
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-04-30

Este template define o briefing obrigatório que precede toda peça editorial pública do programa GEO IPOG. Sem briefing aprovado, o autor não inicia a redação. O briefing é o contrato editorial entre autor, Brasil GEO e IPOG.

Ver também:
- `content/PADRAO-EDITORIAL.md` para a estrutura da peça resultante.
- `content/VOICE-GUIDE.md` para Voice Guard ponderado.
- `content/EXERCICIO-TEMPLATE.md` para os exercícios previstos.
- `content/CHECKLIST-AUTOAVALIACAO.md` para a autoavaliação após o draft.

## Como usar

1. Copie o template para `drafts/briefings/<slug-da-peca>.md`.
2. Preencha todos os campos. Campos vazios bloqueiam a aprovação do briefing.
3. Submeta para validação operacional de Bruno Azambuja.
4. Se a peça envolver claim regulatório (CFP, MEC, SATEPSI), encaminhe também ao jurídico IPOG (SLA 5 dias úteis).
5. Após aprovação, autor inicia redação seguindo `content/PADRAO-EDITORIAL.md`.

## Template

```markdown
# Briefing — [Título provisório da peça]

## 1. Identificação

- **Slug provisório (ASCII, sem acento):** [ex.: roi-mba-online-psicologia-rh]
- **Tipo de peça:** [artigo HBR-grade longo | peça pilar do hub | FAQ | checklist]
- **Modalidade de pós-graduação alvo:** [Especialização Lato Sensu | MBA correlato à Psicologia | Mestrado Profissional | Especialização Clínica certificada por Conselhos | Residência/Híbrida | Transversal (mais de uma modalidade) | Institucional (programa inteiro, todas as modalidades)] — campo obrigatório. Define `programType` Schema (ver `audits/SCHEMA-PATTERNS.md`, seção 3) e governa o uso correto de naming canônico.
- **Cluster semântico:** [ex.: ROI da pós-graduação para profissionais de RH]
- **Hub IPOG correlato:** [URL ou identificador da peça-âncora do hub]
- **Data alvo de publicação:** [AAAA-MM-DD]
- **Wave do roadmap:** [referência a docs/framework]

## 2. Prompt-âncora alvo do kit GEO

[Pergunta ou comando que o conteúdo precisa responder em buscadores e LLMs. Ex.: "Vale a pena fazer MBA Online de Psicologia para quem trabalha em RH sem ser psicólogo?"]

## 3. Tese contraintuitiva

[Uma frase que desloca crença comum no mercado. Ex.: "O ROI do MBA Online de Psicologia é maior para profissionais de RH não-psicólogos do que para psicólogos clínicos buscando especialização clínica adicional, porque o mercado corporativo paga prêmio por cruzamento de competências."]

## 4. Evidências previstas (mínimo 3 fontes com autor/ano)

| # | Fonte (Autor, Ano) | O que evidencia | Onde será citada na peça |
|---|---|---|---|
| 1 | [Autor, Ano] | [Achado central] | [Seção da peça] |
| 2 | [Autor, Ano] | [Achado] | [Seção] |
| 3 | [Autor, Ano] | [Achado] | [Seção] |

## 5. Mecanismo

[Explicação de por que a tese funciona. Cadeia causal explícita em até cinco frases. Ex.: "Mercados corporativos sofisticados precisam de profissionais que entendem comportamento humano e linguagem de negócio. Psicólogos clínicos têm o primeiro mas costumam não dominar o segundo. Profissionais de RH com graduação em Administração têm o segundo mas costumam aplicar Psicologia de forma anedótica. O MBA Online de Psicologia aplicado a RH conecta os dois domínios. A escassez relativa do perfil cruzado eleva o prêmio salarial."]

## 6. Persona alvo

- **Cargo típico:** [ex.: Coordenador de RH em empresa de médio porte (200-1000 funcionários)]
- **Formação típica:** [ex.: Administração, Psicologia ou Ciências Sociais]
- **Idade aproximada:** [faixa]
- **Dor central:** [ex.: Pressão para reduzir turnover sem orçamento adicional]
- **O que a peça promete:** [resultado concreto após leitura]

## 7. Assinatura prevista

- **Autor nominal:** [Alexandre Caramaschi | nome do professor IPOG]
- **Credencial Schema Person:** [credencial canônica conforme `content/PADRAO-EDITORIAL.md`]
- **Co-assinatura:** [não | Brasil GEO + IPOG]

## 8. Schema.org previsto

- **Tipo principal:** [Article | FAQPage | HowTo]
- **Tipos auxiliares:** [Person, EducationalOrganization, ItemList]
- **Campos a preencher:** [headline, datePublished, dateModified, author, publisher, image, articleSection]

## 9. Palavras-chave SEO

- **Cluster principal:** [ex.: mba online psicologia]
- **Palavras-chave secundárias:** [3-7 termos]
- **Volume estimado:** [a confirmar com fonte]
- **Concorrência prevista:** [baixa | média | alta]

## 10. Internal linking previsto

| Tipo | Peça destino | Âncora descritiva |
|---|---|---|
| Hub IPOG | [URL] | [texto de âncora] |
| Peça correlata 1 | [URL] | [âncora] |
| Peça correlata 2 | [URL] | [âncora] |
| Glossário | content/GLOSSARIO-PSICOLOGIA.md | [termo do glossário] |

## 11. Compliance

- [ ] A peça menciona reconhecimento MEC? Se sim, evidência de autorização e-MEC anexada.
- [ ] A peça menciona prática profissional regulamentada (CFP, SATEPSI)? Se sim, revisão jurídica solicitada.
- [ ] A peça menciona dados de terceiros (clientes, alunos)? Se sim, autorização documentada.

## 12. Riscos editoriais previstos

[Liste 2-3 riscos e como mitigar. Ex.: "Risco: leitor confundir MBA Online com habilitação clínica. Mitigação: parágrafo dedicado em fundamentação conceitual + cross-link com peça sobre regulamentação CFP."]

## 13. Critério de sucesso

[Como saberemos que a peça funcionou. Ex.: "Citação em 5 prompts-âncora do kit GEO em 30 dias após publicação. Score Voice Guard >= 80. Tempo médio de leitura >= 6 minutos."]

## 14. Aprovações

- [ ] Validação operacional Bruno Azambuja: data
- [ ] Validação editorial Alexandre Caramaschi: data
- [ ] Validação jurídica IPOG (se aplicável): data
```

## Exemplo preenchido

```markdown
# Briefing — ROI do MBA Online de Psicologia para profissionais de RH em empresas de médio porte

## 1. Identificação

- **Slug provisório:** roi-mba-online-psicologia-rh
- **Tipo de peça:** artigo HBR-grade longo
- **Modalidade de pós-graduação alvo:** MBA correlato à Psicologia (POT/Saúde Mental Corporativa). `programType: "MBA"` em Schema. Peça é específica ao MBA Online de Psicologia Organizacional; menciona Especialização Lato Sensu como alternativa comparativa, mas não amplia escopo.
- **Cluster semântico:** ROI da pós-graduação para profissionais de RH
- **Hub IPOG correlato:** [URL do hub MBA Online de Psicologia, a confirmar]
- **Data alvo de publicação:** 2026-05-21
- **Wave do roadmap:** Wave 4 (conteúdo cluster RH estratégico)

## 2. Prompt-âncora alvo do kit GEO

"Vale a pena fazer MBA Online de Psicologia para quem trabalha em RH sem ser psicólogo?"

## 3. Tese contraintuitiva

O ROI do MBA Online de Psicologia é maior para profissionais de RH não-psicólogos do que para psicólogos clínicos buscando especialização clínica adicional, porque o mercado corporativo paga prêmio por cruzamento de competências raras.

## 4. Evidências previstas

| # | Fonte | O que evidencia | Onde |
|---|---|---|---|
| 1 | Conselho Federal de Psicologia (2024) | Distribuição de psicólogos por área de atuação | Fundamentação |
| 2 | Pesquisa salarial Catho/Robert Half (2025) | Prêmio salarial para perfis cruzados RH + Psicologia [a confirmar] | Fundamentação + Caso |
| 3 | Pesquisa McKinsey Global Institute (2025) | Tendência de saúde mental corporativa [a confirmar tema exato] | Abertura |

## 5. Mecanismo

Mercados corporativos sofisticados precisam de profissionais que dominam tanto comportamento humano quanto linguagem de negócio. Psicólogos clínicos têm o primeiro mas costumam não dominar o segundo. Profissionais de RH com graduação em Administração têm o segundo mas aplicam Psicologia de forma anedótica. O MBA Online de Psicologia aplicado a RH conecta os dois domínios. A escassez relativa eleva o prêmio salarial.

## 6. Persona alvo

- **Cargo típico:** Coordenador ou Gerente de RH em empresa de médio porte (200-1000 funcionários)
- **Formação típica:** Administração, Psicologia ou Ciências Sociais
- **Idade aproximada:** 30-42 anos
- **Dor central:** Pressão para reduzir turnover e absenteísmo sem orçamento adicional
- **O que a peça promete:** Modelo claro para avaliar se o MBA Online de Psicologia é o investimento correto no momento profissional atual

## 7. Assinatura prevista

- **Autor nominal:** Alexandre Caramaschi
- **Credencial Schema Person:** CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil
- **Co-assinatura:** não (validação técnica IPOG via revisão de Bruno Azambuja)

## 8. Schema.org previsto

- **Tipo principal:** Article
- **Tipos auxiliares:** Person, EducationalOrganization
- **Campos:** headline, datePublished, dateModified, author, publisher, image, articleSection: "Pós-graduação"

## 9. Palavras-chave SEO

- **Cluster principal:** mba online psicologia
- **Secundárias:** mba psicologia organizacional, especialização psicologia rh, pós graduação psicologia rh
- **Volume estimado:** [a confirmar com fonte]
- **Concorrência prevista:** média

## 10. Internal linking previsto

| Tipo | Destino | Âncora |
|---|---|---|
| Hub IPOG | [URL hub MBA Online de Psicologia] | "estrutura completa do MBA Online de Psicologia" |
| Glossário | content/GLOSSARIO-PSICOLOGIA.md | "Psicologia organizacional" |
| Peça correlata | [URL peça sobre saúde mental corporativa] | "saúde mental corporativa" |

## 11. Compliance

- [x] A peça não afirma reconhecimento MEC além do que está documentado.
- [x] A peça não afirma habilitação clínica para não-psicólogos.
- [x] Sem dados de terceiros nominais.

## 12. Riscos editoriais previstos

- **Risco:** Leitor RH não-psicólogo concluir que pode exercer prática privativa de psicólogo após o MBA. **Mitigação:** Parágrafo dedicado em fundamentação + cross-link com peça sobre Compliance CFP.
- **Risco:** Tese soar como argumento de vendas. **Mitigação:** Apresentar contraponto explícito (cenários em que NÃO vale a pena) na seção de análise de caso.

## 13. Critério de sucesso

Citação em pelo menos 5 prompts-âncora do kit GEO em 30 dias. Score Voice Guard >= 80. Tempo médio de leitura >= 6 minutos. Cross-link orgânico de pelo menos 2 peças correlatas.

## 14. Aprovações

- [ ] Bruno Azambuja: pendente
- [ ] Alexandre Caramaschi: pendente
- [ ] Jurídico IPOG: não aplicável neste briefing
```

