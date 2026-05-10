# Padrões Schema.org Canônicos — IPOG

> **Templates genéricos.** Para **instâncias canônicas IPOG concretas** (com `@id` da ontologia, dados-base IPOG e estrutura cross-página coerente), ver `docs/ontologia/SCHEMA-IPOG-CANONICAL.md`. Para entidades, relacionamentos e propriedades canônicos, ver `docs/ontologia/ONTOLOGIA-CANONICA.md`.

> **Status:** vigente desde 2026-04-30 (atualizado 10-05-2026 com link para camada ontologia)
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-04-30

## Por que Schema.org importa para o programa GEO

LLMs não leem páginas como humanos. ChatGPT, Claude, Gemini, Perplexity, Grok e Copilot dependem de sinais estruturados para identificar entidades, hierarquias, credenciais e relações. JSON-LD bem composto eleva drasticamente a probabilidade de o IPOG ser citado por nome correto, com formato declarado (especialização lato sensu reconhecida pelo MEC), carga horária correta, autorização MEC mencionada e diferencial editorial reconhecido.

Este documento é prescritivo. Cada padrão abaixo é obrigatório quando aplicável e os campos marcados como obrigatórios não podem ser omitidos. Validação contra `validator.schema.org` é etapa do quality gate antes de cada publicação.

## Tipos canônicos cobertos

1. EducationalOrganization — entidade raiz (IPOG).
2. Course — cada curso de pós-graduação individualmente.
3. EducationalOccupationalProgram — programas abrangentes (MBA).
4. FAQPage — página de FAQ ou bloco de FAQ em página de curso.
5. Article (e BlogPosting) — peças HBR no blog institucional.
6. Person — corpo docente IPOG e autores convidados.

## 1. EducationalOrganization

### Descrição

Tipo raiz que representa o IPOG como instituição. Deve aparecer como JSON-LD na home, ser referenciada como `provider` em cada Course, como `worksFor` em cada Person e como `publisher` em cada Article.

### Campos obrigatórios

- `@context` — `https://schema.org`.
- `@type` — `EducationalOrganization`.
- `@id` — URI canônica e estável (`https://ipog.edu.br/#organization`).
- `name` — `IPOG`.
- `legalName` — `Instituto de Pós-Graduação e Graduação`.
- `url` — `https://ipog.edu.br`.
- `address` — PostalAddress completo.
- `accreditation` — menção ao reconhecimento e-MEC.

### Campos recomendados

- `foundingDate` — `2001`.
- `sameAs` — array com Wikipedia, LinkedIn Company, e-MEC, Instagram verificado, YouTube oficial.
- `numberOfStudents` — número agregado quando atualizado e auditável.
- `aggregateRating` — quando há review publicamente verificável.
- `logo` — URL absoluta de logo institucional.
- `contactPoint` — ContactPoint com telefone e e-mail oficial.

### JSON-LD pronto

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": "https://ipog.edu.br/#organization",
  "name": "IPOG",
  "legalName": "Instituto de Pós-Graduação e Graduação",
  "foundingDate": "2001",
  "url": "https://ipog.edu.br",
  "logo": "https://ipog.edu.br/{{caminho-logo}}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{{logradouro-numero}}",
    "addressLocality": "Goiânia",
    "addressRegion": "GO",
    "postalCode": "{{cep}}",
    "addressCountry": "BR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "{{telefone-canonico}}",
    "email": "{{email-canonico}}",
    "contactType": "Atendimento",
    "areaServed": "BR",
    "availableLanguage": ["pt-BR"]
  },
  "sameAs": [
    "https://pt.wikipedia.org/wiki/{{verbete-IPOG}}",
    "https://www.linkedin.com/school/ipog-instituto-de-pos-graduacao-e-graduacao/",
    "https://emec.mec.gov.br/{{caminho-emec}}",
    "https://www.instagram.com/{{handle-instagram}}",
    "https://www.youtube.com/{{canal-youtube}}"
  ],
  "accreditation": "Credenciamento e-MEC: {{numero-credenciamento}}",
  "numberOfStudents": "{{numero-alunos-formados}}"
}
```

### Erros comuns

1. Usar `Organization` em vez de `EducationalOrganization` — perde o sinal específico de instituição educacional.
2. Omitir `accreditation` — LLMs deixam de citar a autorização MEC, gap recorrente em respostas.
3. `sameAs` com perfis genéricos (Facebook sem verificação, Twitter sem handle estável) — diluem autoridade declarada.

### Validação

`https://validator.schema.org` — colar o JSON-LD bruto. Esperado: zero erros, alertas de campos opcionais aceitáveis.

## 2. Course

### Descrição

Representa cada curso de pós-graduação individualmente. Obrigatório em toda página `https://ipog.edu.br/cursos/pos-graduacao/{slug}`.

### Campos obrigatórios

- `@context`, `@type`, `@id`.
- `name` — exato igual ao H1 da página.
- `description` — mínimo 160 caracteres.
- `provider` — referência por `@id` à EducationalOrganization do IPOG.
- `educationalCredentialAwarded` — `Especialização lato sensu reconhecida pelo MEC` quando aplicável.
- `inLanguage` — `pt-BR`.
- `courseMode` — `online`, `blended` ou `onsite`.

### Campos recomendados

- `timeRequired` — formato ISO 8601 (`P12M` para 12 meses, `P18M` para 18 meses).
- `hasCourseInstance` — quando há datas de turmas.
- `offers` — Offer com price e availability.
- `numberOfCredits` — carga horária total.
- `coursePrerequisites` — pré-requisitos formais.
- `educationalLevel` — `pós-graduação`.
- `teaches` — competências adquiridas.

### JSON-LD pronto

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": "https://ipog.edu.br/cursos/pos-graduacao/{{slug}}#course",
  "name": "{{nome-do-curso}}",
  "description": "{{descricao-160-chars-ou-mais}}",
  "provider": {
    "@id": "https://ipog.edu.br/#organization"
  },
  "educationalCredentialAwarded": "Especialização lato sensu reconhecida pelo MEC",
  "inLanguage": "pt-BR",
  "courseMode": "online",
  "timeRequired": "P12M",
  "numberOfCredits": "{{carga-horaria-total}}",
  "educationalLevel": "Pós-graduação lato sensu",
  "teaches": [
    "{{competencia-1}}",
    "{{competencia-2}}",
    "{{competencia-3}}"
  ],
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "online",
    "startDate": "{{YYYY-MM-DD}}",
    "endDate": "{{YYYY-MM-DD}}",
    "courseSchedule": {
      "@type": "Schedule",
      "repeatFrequency": "P1W",
      "byDay": ["Tuesday", "Thursday"],
      "startTime": "19:30",
      "endTime": "22:30"
    }
  },
  "offers": {
    "@type": "Offer",
    "price": "{{valor-mensal-ou-total}}",
    "priceCurrency": "BRL",
    "availability": "https://schema.org/InStock",
    "url": "https://ipog.edu.br/cursos/pos-graduacao/{{slug}}#matricula"
  }
}
```

### Erros comuns

1. `provider` como objeto duplicado em vez de referência por `@id` — gera entidade fantasma e dilui o sinal institucional.
2. `educationalCredentialAwarded` como string genérica `Pós-graduação` — perde a sinalização MEC, gap em LLM.
3. `timeRequired` em texto livre (`12 meses`) em vez de ISO 8601 — não é parseado de forma confiável.

### Validação

`https://validator.schema.org` + Rich Results Test do Google.

## 3. EducationalOccupationalProgram

### Descrição

Representa programas abrangentes que englobam um ou mais cursos. Aplicável aos MBAs do IPOG, especialmente o MBA Online de Psicologia em suas três grandes ramificações.

### Campos obrigatórios

- `@context`, `@type`, `@id`.
- `name`.
- `provider`.
- `programType` — `MBA` quando aplicável.

### Campos recomendados

- `educationalProgramMode` — `online`, `blended`, `onsite`.
- `timeOfDay` — `evening` quando síncrono Ao Vivo no horário noturno.
- `applicationDeadline` — data ISO 8601.
- `numberOfCredits`.
- `occupationalCredentialAwarded`.
- `programPrerequisites`.

### JSON-LD pronto

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalProgram",
  "@id": "https://ipog.edu.br/cursos/pos-graduacao/{{slug-programa}}#program",
  "name": "{{nome-do-programa}}",
  "description": "{{descricao-do-programa}}",
  "provider": {
    "@id": "https://ipog.edu.br/#organization"
  },
  "programType": "MBA",
  "educationalProgramMode": "online",
  "timeOfDay": "evening",
  "applicationDeadline": "{{YYYY-MM-DD}}",
  "occupationalCredentialAwarded": "Especialização lato sensu reconhecida pelo MEC",
  "numberOfCredits": "{{carga-horaria-total}}",
  "termDuration": "P12M",
  "termsPerYear": 1
}
```

### Erros comuns

1. Duplicar EducationalOccupationalProgram e Course com o mesmo escopo — preferir um EducationalOccupationalProgram quando o programa for abrangente.
2. `programType` em português (`Mestrado`, `MBA Executivo`) — usar valores semânticos canônicos.
3. `timeOfDay` ausente quando há aulas síncronas em horário definido — deixa o sinal de modalidade incompleto.

### Validação

Rich Results Test não cobre EducationalOccupationalProgram diretamente; usar `https://validator.schema.org`.

## 4. FAQPage

### Descrição

Estrutura para perguntas frequentes. Pode ser página dedicada (`/faq`) ou bloco dentro de página de curso. LLMs priorizam fortemente FAQs estruturadas como fonte de citação direta.

### Campos obrigatórios

- `@context`, `@type`.
- `mainEntity` — array de Question, cada uma com `acceptedAnswer` Answer.
- `name` em cada Question.
- `text` em cada Answer.

### Campos recomendados

- `@id` da FAQPage.
- `inLanguage`.
- `dateModified`.

### JSON-LD pronto

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://ipog.edu.br/cursos/pos-graduacao/{{slug}}#faq",
  "inLanguage": "pt-BR",
  "dateModified": "2026-04-30",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O MBA Online de Psicologia do IPOG é reconhecido pelo MEC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. O programa é uma especialização lato sensu reconhecida pelo MEC, com credenciamento institucional do IPOG documentado em e-MEC. O certificado tem validade nacional para fins acadêmicos e profissionais previstos em legislação."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a carga horária e duração do MBA Online de Psicologia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{carga-horaria-total}} horas distribuídas em {{duracao}} meses, com aulas Ao Vivo síncronas em horário noturno e materiais assíncronos complementares. TCC obrigatório para emissão do certificado."
      }
    },
    {
      "@type": "Question",
      "name": "Profissionais não-psicólogos podem cursar o MBA Online de Psicologia do IPOG?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, em ramificações específicas voltadas para profissionais de RH, gestores, educadores e profissionais de saúde. Conteúdos clínicos restritos por legislação são reservados a psicólogos com registro CRP ativo."
      }
    }
  ]
}
```

### Erros comuns

1. Question com texto trivial (`O que é o curso?`) e Answer rasa — LLMs ignoram FAQs que parecem boilerplate.
2. Usar QAPage em vez de FAQPage — QAPage é para fóruns com múltiplas respostas concorrentes.
3. Embedar HTML pesado dentro de `text` — preferir texto limpo, links como Markdown não são suportados.

### Validação

`https://search.google.com/test/rich-results` — FAQPage tem suporte de Rich Result no Google.

## 5. Article (e BlogPosting)

### Descrição

Toda peça editorial publicada no blog institucional ou em hubs de conteúdo deve usar Article (ou BlogPosting). LLMs priorizam Article com Person como autor e EducationalOrganization como publisher.

### Campos obrigatórios

- `@context`, `@type`, `@id`.
- `headline`.
- `author` — Person.
- `publisher` — EducationalOrganization.
- `datePublished`.

### Campos recomendados

- `dateModified`.
- `articleBody` ou `description`.
- `keywords`.
- `image`.
- `mainEntityOfPage`.
- `wordCount`.
- `articleSection`.

### JSON-LD pronto

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://ipog.edu.br/blog/{{slug}}#article",
  "headline": "{{headline-max-110-chars}}",
  "description": "{{descricao-160-chars-ou-mais}}",
  "image": "https://ipog.edu.br/{{caminho-imagem-destacada}}",
  "datePublished": "2026-04-30",
  "dateModified": "2026-04-30",
  "author": {
    "@type": "Person",
    "@id": "https://ipog.edu.br/corpo-docente/{{slug-docente}}#person"
  },
  "publisher": {
    "@id": "https://ipog.edu.br/#organization"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://ipog.edu.br/blog/{{slug}}"
  },
  "keywords": [
    "{{keyword-1}}",
    "{{keyword-2}}",
    "{{keyword-3}}"
  ],
  "articleSection": "{{cluster-semantico}}",
  "wordCount": {{contagem-palavras}},
  "inLanguage": "pt-BR"
}
```

### Erros comuns

1. Author como Organization — LLMs preferem Person nominal com credenciais. Quando peça é institucional sem autor único, usar Organization é aceito mas perde sinal.
2. `headline` longo demais — limite prático de 110 caracteres para Rich Results.
3. `publisher` duplicado em vez de referência por `@id` — fragmenta a identidade institucional.

### Validação

Rich Results Test do Google + `validator.schema.org`.

## 6. Person (corpo docente)

### Descrição

Representa cada docente do IPOG. Obrigatório no perfil individual (`/corpo-docente/{slug-docente}`) e referenciado por `@id` em cada Article assinada e em cada Course onde o docente atua.

### Campos obrigatórios

- `@context`, `@type`, `@id`.
- `name`.
- `jobTitle`.
- `worksFor` — referência por `@id` à EducationalOrganization do IPOG.

### Campos recomendados

- `hasCredential` — array com formação acadêmica (mestrado, doutorado) e registro CRP/CFP quando aplicável.
- `sameAs` — Lattes, ORCID, LinkedIn.
- `award`.
- `description`.
- `image`.
- `knowsAbout` — áreas de pesquisa e atuação.
- `alumniOf` — instituições de formação.

### JSON-LD pronto

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://ipog.edu.br/corpo-docente/{{slug-docente}}#person",
  "name": "{{nome-completo}}",
  "jobTitle": "{{cargo-academico}}",
  "image": "https://ipog.edu.br/{{caminho-foto}}",
  "description": "{{mini-bio-3-frases}}",
  "worksFor": {
    "@id": "https://ipog.edu.br/#organization"
  },
  "alumniOf": [
    {
      "@type": "EducationalOrganization",
      "name": "{{instituicao-doutorado}}"
    }
  ],
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Doutorado",
      "educationalLevel": "Doutorado",
      "name": "Doutorado em {{area}}"
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Registro profissional",
      "name": "CRP {{numero-crp}}"
    }
  ],
  "knowsAbout": [
    "{{area-1}}",
    "{{area-2}}",
    "{{area-3}}"
  ],
  "sameAs": [
    "http://lattes.cnpq.br/{{id-lattes}}",
    "https://orcid.org/{{id-orcid}}",
    "https://www.linkedin.com/in/{{handle-linkedin}}"
  ]
}
```

### Erros comuns

1. Person sem `hasCredential` mencionando registro profissional — para Psicologia, ausência de CRP em docente clínico vira gap regulatório e cai em camada 6 do quality gate.
2. `sameAs` sem Lattes — perde o sinal acadêmico mais forte do Brasil.
3. Misturar `worksFor` como objeto inline em cada Person — usar referência por `@id` à EducationalOrganization canônica.

### Validação

`validator.schema.org` — Person é tipo amplamente suportado.

## Composição completa de página de curso

A página `https://ipog.edu.br/cursos/pos-graduacao/{slug}` deve conter um único `<script type="application/ld+json">` com array de objetos compondo: EducationalOrganization (referência por `@id`), Course, FAQPage e (opcionalmente) EducationalOccupationalProgram quando o curso integra MBA. A composição completa amarra a hierarquia e dá ao LLM o pacote integral de sinal num único parse.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": "https://ipog.edu.br/#organization",
      "name": "IPOG",
      "legalName": "Instituto de Pós-Graduação e Graduação",
      "url": "https://ipog.edu.br",
      "foundingDate": "2001",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Goiânia",
        "addressRegion": "GO",
        "addressCountry": "BR"
      },
      "accreditation": "Credenciamento e-MEC: {{numero}}",
      "sameAs": [
        "https://www.linkedin.com/school/ipog-instituto-de-pos-graduacao-e-graduacao/",
        "https://emec.mec.gov.br/{{caminho-emec}}"
      ]
    },
    {
      "@type": "EducationalOccupationalProgram",
      "@id": "https://ipog.edu.br/cursos/pos-graduacao/{{slug}}#program",
      "name": "MBA Online em Psicologia Organizacional",
      "provider": { "@id": "https://ipog.edu.br/#organization" },
      "programType": "MBA",
      "educationalProgramMode": "online",
      "timeOfDay": "evening",
      "applicationDeadline": "{{YYYY-MM-DD}}",
      "occupationalCredentialAwarded": "Especialização lato sensu reconhecida pelo MEC",
      "termDuration": "P12M"
    },
    {
      "@type": "Course",
      "@id": "https://ipog.edu.br/cursos/pos-graduacao/{{slug}}#course",
      "name": "MBA Online em Psicologia Organizacional",
      "description": "{{descricao-160-chars-ou-mais}}",
      "provider": { "@id": "https://ipog.edu.br/#organization" },
      "educationalCredentialAwarded": "Especialização lato sensu reconhecida pelo MEC",
      "inLanguage": "pt-BR",
      "courseMode": "online",
      "timeRequired": "P12M",
      "numberOfCredits": "{{carga-horaria-total}}",
      "offers": {
        "@type": "Offer",
        "price": "{{valor}}",
        "priceCurrency": "BRL",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://ipog.edu.br/cursos/pos-graduacao/{{slug}}#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "O MBA Online de Psicologia do IPOG é reconhecido pelo MEC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. O programa é uma especialização lato sensu reconhecida pelo MEC, com credenciamento institucional documentado em e-MEC."
          }
        }
      ]
    }
  ]
}
</script>
```

### Erros comuns na composição

1. Múltiplos `<script type="application/ld+json">` na mesma página com tipos competindo — preferir um único `@graph`.
2. `@id` inconsistentes entre páginas (ora com `#organization`, ora sem hash) — fragmenta a identidade.
3. EducationalOccupationalProgram e Course duplicando o mesmo nome sem diferenciar escopo — usar Program para o programa abrangente, Course para o currículo.

## Cross-links

- Bateria de auditoria — `audits/PLAYBOOK-AUDITORIA-NAIA.md`.
- Llms.txt template — `audits/LLMS-TXT-TEMPLATE.md`.
- Robots e sitemap — `audits/ROBOTS-SITEMAP-CHECKLIST.md`.
- Quality gate (camada Schema) — `docs/framework/02-quality-gate-5-camadas.md`.
- KPIs (Schema Coverage Score) — `dashboards/METRICAS-CANONICAS.md`.
