# Frente Regional — Plano canônico das 51 cidades

> **Status:** plano aprovado em estrutura, aguardando confirmação cliente do conjunto definitivo de cidades (issue #52).
> **Owner:** Brasil GEO · **Cliente referência:** IPOG · **Data canônica:** 17 de maio de 2026
> **Epic:** [#65 — Frente Regional](https://github.com/) — agrega issues #52, #53, #54, #55, #50, #51, #56

---

## 1. Objetivo

Distribuir presença orgânica e citacional do portal `posgraduacaopsicologia.com` em 51 cidades brasileiras prioritárias, onde a oferta de pós-graduação em Psicologia do IPOG já existe ou está planejada. A Frente Regional opera em cinco fases canônicas, cobertas pelas issues listadas na seção 3.

Cada unidade física da rede ofertante recebe ficha schema-rico (`LocalBusiness`), página dedicada por cidade com taxonomia local (bairro, transporte, perfil ocupacional dominante) e ancoragem cruzada com a malha nacional `/por-estado/` e `/areas/`.

---

## 2. Fases canônicas (Epic #65)

| Fase | Nome canônico | Issue principal | Issues dependentes | Entregável de saída |
|------|---------------|-----------------|--------------------|---------------------|
| **F1** | Definição do conjunto de 51 cidades | #52 | — | Lista canônica `cidades-frente-regional.csv` com coordenadas, polo regional e prioridade (alta/média/baixa) |
| **F2** | Coleta de dados por unidade | #53 | #52 | Ficha por cidade com endereço, telefone, horário, coordenador local, gerência, registro institucional |
| **F3** | Schema `LocalBusiness` + página por cidade | #51 | #52, #53 | 51 páginas `/por-cidade/<slug>` com JSON-LD `LocalBusiness` + `EducationalOrganization` |
| **F4** | Cruzamento com hubs de áreas e MBAs | #54 | #51 | Cada página de área e de MBA passa a citar unidades disponíveis por cidade |
| **F5** | Coleta de docência local + integração com `/docencia` | #56, #50 | #51 | Hub `/docencia` populado com coordenador e professor de cada cidade, com Lattes, ORCID, LinkedIn e CRP |
| **F6** | SEO local + Google Business Profile por unidade | #55 | #51 | GBP ativo por unidade, NAP consistente, schema validado |

---

## 3. Issues dependentes

| Issue | Título canônico | Fase | Status |
|-------|-----------------|------|--------|
| **#52** | Definir conjunto canônico das 51 cidades da Frente Regional | F1 | **Aguarda confirmação cliente** (IPOG precisa confirmar lista definitiva) |
| **#53** | Coleta estruturada de dados por unidade (endereço, telefone, coordenador) | F2 | Bloqueada por #52 |
| **#54** | Cruzamento cidades × áreas × MBAs nas páginas de hub | F4 | Bloqueada por #51 |
| **#55** | Google Business Profile por unidade | F6 | Bloqueada por #51 |
| **#50** | Página por cidade com taxonomia local (bairro, transporte, perfil) | F3 | Bloqueada por #52, #53 |
| **#51** | Schema `LocalBusiness` canônico por unidade | F3 | Bloqueada por #52, #53; **schema definido nesta data — ver seção 4** |
| **#56** | Hub `/docencia` canônico com Lattes, ORCID, LinkedIn, CRP | F5 | **Canal pronto nesta data — ver seção 5** |

---

## 4. Schema canônico `LocalBusiness` por unidade (issue #51)

Cada unidade física da rede ofertante recebe instância de `LocalBusiness` com extensão `EducationalOrganization`. O schema é declarado na página dedicada à cidade (`/por-cidade/<slug>.astro`) e referenciado por `@id` nas páginas de área e MBA correspondentes.

```jsonc
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "EducationalOrganization"],
      "@id": "https://posgraduacaopsicologia.com/por-cidade/<slug>#unidade",
      "name": "IPOG — Unidade <Cidade>",
      "url": "https://posgraduacaopsicologia.com/por-cidade/<slug>",
      "telephone": "+55 <DDD> <numero>",
      "email": "<email-canônico-da-unidade>",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "<endereço completo>",
        "addressLocality": "<Cidade>",
        "addressRegion": "<UF>",
        "postalCode": "<CEP>",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "<lat>",
        "longitude": "<lng>"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "18:00"
        }
      ],
      "sameAs": [
        "https://ipog.edu.br/unidades/<slug>",
        "<facebook>",
        "<instagram>",
        "<linkedin>"
      ],
      "parentOrganization": {
        "@id": "https://posgraduacaopsicologia.com/#ipog-organization"
      },
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": "<Região metropolitana de Cidade>"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Pós-Graduações em Psicologia oferecidas em <Cidade>",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@id": "https://posgraduacaopsicologia.com/mbas/mba-pot#program" } }
        ]
      },
      "employee": [
        { "@id": "https://posgraduacaopsicologia.com/docencia#<docente-slug>" }
      ]
    }
  ]
}
```

**Regras canônicas de preenchimento:**

1. `name` segue padrão `IPOG — Unidade <Cidade>`. Nunca `IPOG <Cidade>` solto.
2. `telephone` em formato E.164 (`+55DDD<numero>` sem espaço dentro do campo, mas com espaço na exibição visual).
3. `geo.latitude` e `geo.longitude` em decimal, quatro casas mínimo.
4. `sameAs` inclui canal social e ficha oficial da unidade no site da rede ofertante.
5. `employee` referencia docente nominal pelo `@id` em `/docencia#<slug>`. Sem docente verificado em `/docencia`, o campo `employee` fica omitido — nunca inventado.
6. `hasOfferCatalog` aponta para `@id` da página de MBA ou da modalidade, não para texto livre.
7. NAP (Name, Address, Phone) consistente em 100% das superfícies: schema, página HTML, Google Business Profile, sitemap, e site oficial do ofertante. Inconsistência NAP é causa de despriorização local.

---

## 5. Hub `/docencia` (issue #56) — canal pronto

Documentado em separado pela página `src/pages/docencia.astro`. O canal está estruturalmente pronto desde 17 de maio de 2026: tabela esqueleto declarada, schema `CollectionPage` + `ItemList` declarado, política de transparência publicada, ponteiros para fontes canônicas (e-MEC, Lattes, ORCID, CFP) ativos.

A tabela é populada quando a coleta da fase F5 (issue #56) trouxer o lote inicial verificado de docente. Padrão canônico Brasil GEO: nenhum docente é listado sem Lattes, ORCID, LinkedIn e CRP confirmados em fonte pública.

---

## 6. Lista de cidades — pendente

**Não inventar lista de cidades neste documento.** A lista canônica das 51 cidades é responsabilidade da issue #52 e depende de confirmação cliente. Quando aprovada, a lista entra no formato:

```csv
slug,cidade,uf,polo_regional,prioridade,latitude,longitude,populacao,observacao
```

Polos regionais já mapeados em outros projetos Brasil GEO (referência metodológica, não substitui confirmação IPOG):

- Norte: Belém, Manaus, Porto Velho
- Nordeste: Recife, Salvador, Fortaleza, João Pessoa, Natal, Maceió, Aracaju, Teresina, São Luís
- Centro-Oeste: Goiânia, Brasília, Cuiabá, Campo Grande
- Sudeste: São Paulo, Rio de Janeiro, Belo Horizonte, Vitória, Campinas, São José dos Campos, Santos, Ribeirão Preto, Sorocaba, Uberlândia, Juiz de Fora, Volta Redonda, Niterói
- Sul: Curitiba, Porto Alegre, Florianópolis, Londrina, Maringá, Caxias do Sul, Joinville, Pelotas, Blumenau

A combinação canônica das 51 cidades **será** subconjunto dessa lista ampla mais cidades de prioridade comercial confirmada pela rede ofertante. **Nenhuma cidade é publicada antes de F1 e F2 estarem fechadas.**

---

## 7. Critério de aceitação por fase

- **F1 fechada:** CSV canônico assinado pelo cliente, hash imutável no repositório.
- **F2 fechada:** 51/51 fichas com endereço completo, telefone, horário, coordenador local, registro institucional.
- **F3 fechada:** 51/51 páginas `/por-cidade/<slug>` no ar com schema validado em [Schema Markup Validator](https://validator.schema.org/) e [Rich Results Test](https://search.google.com/test/rich-results).
- **F4 fechada:** 100% das páginas de área e MBA referenciam unidades por cidade.
- **F5 fechada:** `/docencia` com pelo menos um docente verificado por cidade (Lattes + ORCID + CRP).
- **F6 fechada:** GBP ativo em 51/51 unidades, NAP consistente, primeira foto subida, primeira avaliação respondida.

---

## 8. Riscos e mitigação

1. **NAP inconsistente entre portal e site oficial do ofertante** — mitigação: cada fechamento de F2 valida NAP em três fontes (portal, ofertante, GBP). Discrepância dispara correção no portal antes de F3 publicar.
2. **Docente sem identificador verificável** — mitigação: política `/docencia` é absoluta. Sem Lattes + ORCID + CRP, docente não entra. Página da unidade fica com `employee` vazio em vez de docente inventado.
3. **Cidades alteradas após F1 fechada** — mitigação: alteração tardia exige nova rodada de F1, com hash novo. Não há "atualização silenciosa".
4. **Custo de deploy em onda regional grande** — mitigação: deploy em ondas de 10 cidades, respeitando a regra de 2 pushes/dia em repos públicos.

---

## 9. Próximo passo operacional

1. Aguardar confirmação cliente do CSV das 51 cidades (issue #52).
2. Acionar coleta estruturada (issue #53) na mesma rodada — script já mapeado em `scripts/collect-unit-data.mjs` (a criar em F2).
3. Publicar primeira onda de 10 cidades em `/por-cidade/<slug>` com schema canônico desta seção 4.
4. Iniciar coleta de docente por cidade para popular `/docencia` (issue #56).
5. Acionar Google Business Profile por unidade (issue #55) só após `/por-cidade/` estar no ar, para garantir NAP único.

---

## Histórico de alterações

| Data | Versão | Autor | Mudança |
|------|--------|-------|---------|
| 2026-05-17 | 1.0 | Brasil GEO | Documento canônico inicial. Estabelece F1-F6, schema `LocalBusiness` canônico, política `/docencia`. |
