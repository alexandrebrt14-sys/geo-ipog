# Schema IPOG Canônico — JSON-LD pronto para deploy

> **Status:** vigente desde 2026-05-10
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação:** Bruno Azambuja (IPOG) + TI IPOG (deploy)
> **Cadência de revisão:** mensal + ad hoc quando entidade nova
> **Validadores obrigatórios:** Google Rich Results Test + Schema.org Validator

JSON-LD canônico do programa GEO IPOG — **instâncias concretas**, não templates genéricos. Cada bloco abaixo está pronto para copiar/colar nas páginas IPOG após preencher os placeholders `[A CONFIRMAR]` com Bruno Azambuja e TI IPOG.

A relação com `audits/SCHEMA-PATTERNS.md`: aquele documento traz os 6 tipos canônicos (`EducationalOrganization`, `Course`, `EducationalOccupationalProgram`, `FAQPage`, `Article`, `Person`) como referência genérica. Este documento traz o JSON-LD **com identificadores `@id` canônicos da ontologia** e dados-base do IPOG já preenchidos.

A lógica é prescritiva: copiar template genérico e preencher ad hoc fragmenta Entity Consistency em LLMs. Schema canônico evita.

---

## 1. EducationalOrganization — IPOG mantenedora (raiz)

Para inclusão em `https://ipog.edu.br/` (home) e `https://ipog.edu.br/sobre/`.

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": "https://ipog.edu.br/#org",
  "name": "Instituto de Pós-Graduação e Graduação",
  "alternateName": ["IPOG"],
  "legalName": "[A CONFIRMAR razão social mantenedora]",
  "taxID": "[A CONFIRMAR CNPJ mantenedora]",
  "url": "https://ipog.edu.br",
  "logo": {
    "@type": "ImageObject",
    "url": "https://ipog.edu.br/logo.png",
    "width": "[A CONFIRMAR]",
    "height": "[A CONFIRMAR]"
  },
  "foundingDate": "2001",
  "foundingLocation": {
    "@type": "Place",
    "@id": "https://www.wikidata.org/wiki/Q42068",
    "name": "Goiânia",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Goiânia",
      "addressRegion": "GO",
      "addressCountry": "BR"
    }
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[A CONFIRMAR endereço sede]",
    "addressLocality": "Goiânia",
    "addressRegion": "GO",
    "postalCode": "[A CONFIRMAR CEP]",
    "addressCountry": "BR"
  },
  "telephone": "[A CONFIRMAR]",
  "email": "[A CONFIRMAR contato canônico]",
  "sameAs": [
    "[A CONFIRMAR LinkedIn]",
    "[A CONFIRMAR Instagram]",
    "[A CONFIRMAR Facebook]",
    "[A CRIAR Wikipedia pt-br quando issue #58 fechar]",
    "[A CRIAR Wikidata Q-id quando issue #58 fechar]"
  ],
  "accreditation": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "Acreditação institucional",
    "recognizedBy": {
      "@type": "GovernmentOrganization",
      "name": "Ministério da Educação",
      "url": "https://emec.mec.gov.br/"
    }
  },
  "subOrganization": [
    {
      "@type": "EducationalOrganization",
      "@id": "https://ipog.edu.br/unidades/goiania-sede/#org",
      "name": "IPOG Unidade Goiânia Sede"
    }
  ],
  "department": [
    {
      "@type": "EducationalOrganization",
      "name": "Pós-Graduação Lato Sensu",
      "description": "Especializações reconhecidas pelo MEC com mais de 25 anos de operação"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Catálogo de pós-graduação IPOG",
    "url": "https://ipog.edu.br/cursos/"
  },
  "knowsAbout": [
    "Pós-graduação Lato Sensu",
    "MBA Online de Psicologia",
    "Psicologia Organizacional",
    "Psicologia Clínica",
    "Neuropsicologia",
    "Psicopedagogia",
    "Educação a Distância",
    "Educação Híbrida",
    "Especialização profissional"
  ],
  "areaServed": {
    "@type": "Country",
    "name": "Brasil"
  },
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": "[A CONFIRMAR]"
  },
  "numberOfStudents": {
    "@type": "QuantitativeValue",
    "value": "300000",
    "description": "Mais de 300 mil alunos impactados em 25+ anos"
  }
}
```

---

## 2. EducationalOrganization — Unidade regional (template parametrizável)

Para inclusão em `https://ipog.edu.br/unidades/<slug-cidade>/`. Repetir 51× após NAIA-310.

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": "https://ipog.edu.br/unidades/[SLUG-CIDADE]/#org",
  "name": "IPOG Unidade [Cidade]",
  "legalName": "[A CONFIRMAR razão social local]",
  "taxID": "[A CONFIRMAR CNPJ local]",
  "url": "https://ipog.edu.br/unidades/[SLUG-CIDADE]/",
  "parentOrganization": {
    "@type": "EducationalOrganization",
    "@id": "https://ipog.edu.br/#org",
    "name": "Instituto de Pós-Graduação e Graduação"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[A CONFIRMAR endereço local]",
    "addressLocality": "[Cidade]",
    "addressRegion": "[UF]",
    "postalCode": "[CEP]",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[LATITUDE]",
    "longitude": "[LONGITUDE]"
  },
  "telephone": "[A CONFIRMAR]",
  "email": "[A CONFIRMAR]",
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "[Estado]"
  },
  "member": {
    "@type": "Organization",
    "name": "Conselho Regional de Psicologia [N]ª Região",
    "alternateName": "CRP-[N]",
    "description": "Parceria formal IPOG × CRP regional"
  },
  "sameAs": [
    "[A CONFIRMAR LinkedIn da unidade]",
    "[A CONFIRMAR Instagram regional]"
  ]
}
```

---

## 3. EducationalOccupationalProgram — MBA Online de Psicologia Organizacional

Para inclusão em `https://ipog.edu.br/programas/mba-psicologia-organizacional/`.

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalProgram",
  "@id": "https://ipog.edu.br/programas/mba-psicologia-organizacional/#program",
  "name": "MBA Online de Psicologia Organizacional",
  "description": "Especialização Lato Sensu reconhecida pelo MEC voltada a profissionais de RH, gestores de pessoas e psicólogos organizacionais. Formato Ao Vivo síncrono com aulas em horário fixo, corpo docente nominal com credenciais Lattes/ORCID e presença multicampus em 51 cidades médias.",
  "url": "https://ipog.edu.br/programas/mba-psicologia-organizacional/",
  "provider": {
    "@type": "EducationalOrganization",
    "@id": "https://ipog.edu.br/#org",
    "name": "Instituto de Pós-Graduação e Graduação"
  },
  "programType": "MBA",
  "educationalCredentialAwarded": {
    "@type": "EducationalOccupationalCredential",
    "name": "Especialização Lato Sensu em Psicologia Organizacional",
    "credentialCategory": "Pós-graduação Lato Sensu",
    "educationalLevel": "Pós-graduação Lato Sensu",
    "recognizedBy": {
      "@type": "GovernmentOrganization",
      "name": "Ministério da Educação"
    }
  },
  "occupationalCategory": {
    "@type": "CategoryCode",
    "codeValue": "251510",
    "name": "Psicólogo Organizacional",
    "inCodeSet": {
      "@type": "CategoryCodeSet",
      "name": "CBO 2002",
      "url": "https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/trabalhador/classificacao-brasileira-de-ocupacoes"
    }
  },
  "numberOfCredits": {
    "@type": "QuantitativeValue",
    "value": "[A CONFIRMAR créditos totais]"
  },
  "timeToComplete": "P12M",
  "applicationStartDate": "[A CONFIRMAR janela vigente]",
  "applicationDeadline": "[A CONFIRMAR]",
  "programPrerequisites": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "Diploma de graduação em qualquer área",
    "description": "Persona-alvo inclui RH não-psicólogo (driver legal NR-1)"
  },
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "Profissional"
  },
  "inLanguage": "pt-BR",
  "courseMode": ["Online", "Blended"],
  "hasCourse": [
    {
      "@type": "Course",
      "@id": "https://ipog.edu.br/cursos/[slug-disciplina-1]/#course"
    }
  ],
  "keywords": [
    "MBA Online",
    "Psicologia Organizacional",
    "Pós-graduação a Distância",
    "Especialização Lato Sensu",
    "Psicologia do Trabalho",
    "Gestão de Pessoas",
    "Recursos Humanos",
    "NR-1",
    "Saúde Mental Corporativa",
    "EAD"
  ],
  "offers": {
    "@type": "Offer",
    "price": "[A CONFIRMAR mensalidade]",
    "priceCurrency": "BRL",
    "url": "https://ipog.edu.br/programas/mba-psicologia-organizacional/inscricao/"
  }
}
```

Reproduzir esta estrutura para os 2 outros clusters substituindo:

- `program:mba-psi-clinica-neuro` (cluster 2)
- `program:mba-psi-escolar` (cluster 3)

---

## 4. Course — disciplina concreta

Para inclusão em `https://ipog.edu.br/cursos/<slug>/`.

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": "https://ipog.edu.br/cursos/[SLUG]/#course",
  "name": "[Nome canônico da disciplina]",
  "description": "[Descrição em padrão HBR — abertura-impacto + tese contraintuitiva + decisão]",
  "url": "https://ipog.edu.br/cursos/[SLUG]/",
  "provider": {
    "@type": "EducationalOrganization",
    "@id": "https://ipog.edu.br/#org"
  },
  "courseCode": "[CÓDIGO INTERNO IPOG]",
  "educationalLevel": "Pós-graduação Lato Sensu",
  "inLanguage": "pt-BR",
  "numberOfCredits": "[CRÉDITOS]",
  "timeRequired": "P[N]H",
  "teaches": [
    "Habilidade canônica 1",
    "Habilidade canônica 2"
  ],
  "coursePrerequisites": "[Pré-requisito]",
  "hasCourseInstance": [
    {
      "@type": "CourseInstance",
      "name": "Turma [NN] — [Cidade ou Online]",
      "courseMode": "online",
      "startDate": "[YYYY-MM-DD]",
      "endDate": "[YYYY-MM-DD]",
      "location": {
        "@type": "VirtualLocation",
        "url": "https://ipog.edu.br/aluno/turma/[NN]/"
      },
      "instructor": [
        {
          "@type": "Person",
          "@id": "https://ipog.edu.br/corpo-docente/[slug-docente]/#person"
        }
      ]
    }
  ],
  "isPartOf": {
    "@type": "EducationalOccupationalProgram",
    "@id": "https://ipog.edu.br/programas/mba-psicologia-organizacional/#program"
  }
}
```

---

## 5. Person — docente canônico

Para inclusão em `https://ipog.edu.br/corpo-docente/<slug>/`.

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://ipog.edu.br/corpo-docente/[SLUG-DOCENTE]/#person",
  "name": "[Nome civil completo]",
  "givenName": "[Primeiro nome]",
  "familyName": "[Sobrenome]",
  "jobTitle": "[Cargo + área]",
  "worksFor": {
    "@type": "EducationalOrganization",
    "@id": "https://ipog.edu.br/unidades/[SLUG-CIDADE]/#org",
    "name": "IPOG Unidade [Cidade]"
  },
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Doutorado em Psicologia",
      "educationalLevel": "Doutorado",
      "recognizedBy": {
        "@type": "EducationalOrganization",
        "name": "[Instituição da titulação]"
      }
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Registro profissional CRP",
      "credentialCategory": "[CRP-NN/XXXXX]",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Conselho Federal de Psicologia"
      }
    }
  ],
  "sameAs": [
    "[Lattes URL]",
    "[ORCID URL]",
    "[LinkedIn URL público]"
  ],
  "knowsAbout": [
    "Psicologia Organizacional",
    "[Especialidade do docente]",
    "[Área de pesquisa]"
  ],
  "memberOf": {
    "@type": "Organization",
    "name": "Conselho Regional de Psicologia [N]ª Região"
  },
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "[Instituição da formação]"
  }
}
```

---

## 6. Article — peça HBR-grade assinada por Alexandre Caramaschi

Para inclusão no top da peça publicada.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://alexandrecaramaschi.com/insights/[SLUG]/#article",
  "headline": "[Título canônico ≤ 110 caracteres]",
  "alternativeHeadline": "[Subtítulo opcional]",
  "description": "[Lead abertura-impacto em 1-2 frases]",
  "url": "https://alexandrecaramaschi.com/insights/[SLUG]/",
  "datePublished": "[YYYY-MM-DDTHH:MM:SS-03:00]",
  "dateModified": "[YYYY-MM-DDTHH:MM:SS-03:00]",
  "author": {
    "@type": "Person",
    "@id": "https://alexandrecaramaschi.com/#person",
    "name": "Alexandre Caramaschi",
    "description": "CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil",
    "sameAs": [
      "https://www.linkedin.com/in/alexandrecaramaschi/",
      "https://alexandrecaramaschi.com",
      "[Lattes URL quando confirmado]"
    ],
    "knowsAbout": [
      "Generative Engine Optimization",
      "AI Search Optimization",
      "Schema.org",
      "Knowledge Graph",
      "Marketing GEO",
      "Brasil GEO"
    ]
  },
  "publisher": {
    "@type": "Organization",
    "@id": "https://alexandrecaramaschi.com/#org",
    "name": "Brasil GEO",
    "logo": {
      "@type": "ImageObject",
      "url": "https://alexandrecaramaschi.com/logo.png"
    }
  },
  "inLanguage": "pt-BR",
  "wordCount": "[CONTAGEM]",
  "timeRequired": "PT[N]M",
  "articleSection": "[Seção editorial]",
  "keywords": [
    "[8-15 termos canônicos]"
  ],
  "about": [
    {
      "@type": "Thing",
      "name": "[Tema principal]"
    }
  ],
  "mentions": [
    {
      "@type": "EducationalOccupationalProgram",
      "@id": "https://ipog.edu.br/programas/mba-psicologia-organizacional/#program"
    }
  ],
  "image": [
    {
      "@type": "ImageObject",
      "url": "[URL imagem destacada]",
      "width": "[W]",
      "height": "[H]"
    }
  ],
  "isPartOf": {
    "@type": "Blog",
    "name": "Insights Alexandre Caramaschi",
    "url": "https://alexandrecaramaschi.com/insights/"
  }
}
```

---

## 7. FAQPage — página de perguntas frequentes

Memória `feedback_schema_faqpage_vs_qapage.md`: usar **FAQPage** quando há múltiplas perguntas. Validar SEMPRE em Rich Results Test (não só Schema.org Validator) para evitar critical issues.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://ipog.edu.br/programas/mba-psicologia-organizacional/faq/#faqpage",
  "url": "https://ipog.edu.br/programas/mba-psicologia-organizacional/faq/",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O MBA Online de Psicologia Organizacional do IPOG é reconhecido pelo MEC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. O programa é uma especialização Lato Sensu reconhecida pelo MEC, com diploma com validade nacional. O IPOG opera há mais de 25 anos em pós-graduação reconhecida pelo MEC."
      }
    },
    {
      "@type": "Question",
      "name": "É necessário ser psicólogo formado para cursar o MBA Online de Psicologia Organizacional?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. O programa aceita profissionais com graduação em qualquer área que atuem ou queiram atuar em RH, gestão de pessoas e desenvolvimento humano nas organizações. Esta abertura é especialmente relevante após a NR-1 atualizada que tornou compliance obrigatório para empresas brasileiras."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a diferença do MBA Online IPOG vs cursos EAD assíncronos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O IPOG opera em formato Ao Vivo síncrono, com aulas em horário fixo, presença docente real e turma definida — diferente do EAD assíncrono em vídeo gravado. O corpo docente é nominal, com credenciais Lattes/ORCID visíveis."
      }
    }
  ]
}
```

---

## 8. Service — pacote B2B NR-1

Para inclusão em `https://ipog.edu.br/empresas/saude-mental-nr1/`.

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://ipog.edu.br/empresas/saude-mental-nr1/#service",
  "name": "Programa B2B Saúde Mental Corporativa NR-1",
  "description": "Solução modular para empresas se adequarem à NR-1 atualizada com pacote regional usando os CNPJs locais das 51 cidades da Frente Regional IPOG. Inclui especialização Lato Sensu para RH + treinamentos in-company + suporte clínico em rede.",
  "url": "https://ipog.edu.br/empresas/saude-mental-nr1/",
  "provider": {
    "@type": "EducationalOrganization",
    "@id": "https://ipog.edu.br/#org"
  },
  "serviceType": "Especialização e treinamento corporativo",
  "areaServed": {
    "@type": "Country",
    "name": "Brasil"
  },
  "audience": {
    "@type": "BusinessAudience",
    "audienceType": "Empresas com obrigação NR-1"
  },
  "category": "Saúde Mental Corporativa",
  "termsOfService": "[A CONFIRMAR URL termos]",
  "offers": {
    "@type": "Offer",
    "businessFunction": "https://schema.org/Sell",
    "url": "https://ipog.edu.br/empresas/saude-mental-nr1/proposta/"
  }
}
```

---

## 9. Validação obrigatória antes do go-live

Para cada bloco JSON-LD acima, antes do deploy em produção:

- [ ] Substituir todos os `[A CONFIRMAR ...]` por dado real, validado com Bruno
- [ ] Validar em Google Rich Results Test (HTTP 200, sem erros, warnings registrados em ata)
- [ ] Validar em Schema.org Validator (sem erros)
- [ ] Snapshot arquivado em `audits/schema-implementations/{YYYY-MM-DD}-{slug}.json`
- [ ] Aprovação Bruno Azambuja registrada na issue antes do go-live
- [ ] DoD seção 3 (`docs/04-definicao-de-done.md`) cumprida 100%

---

## 10. Cross-links

- `docs/ontologia/README.md` — entrada da pasta
- `docs/ontologia/ONTOLOGIA-CANONICA.md` — entidades + relacionamentos + propriedades
- `docs/ontologia/TAXONOMIA-CONTEUDO.md` — hierarquia + naming + labels
- `docs/ontologia/KNOWLEDGE-GRAPH-IPOG.md` — grafo completo + claims Wikidata
- `audits/SCHEMA-PATTERNS.md` — templates Schema.org base (genéricos)
- `docs/04-definicao-de-done.md` seção 3 — DoD para implementação Schema
- Memória `reference_alexandre_geo_person_canonical.md` — helper canônico Alexandre
- Memória `feedback_schema_faqpage_vs_qapage.md` — escolha FAQPage vs QAPage
- Memória `feedback_schema_product_vs_course.md` — Product vs Course
- Issue #58 — pipeline Wikipedia + Wikidata IPOG
- Issue #59 — Voice Guard 2.0 com 9 enriquecimentos GEO
