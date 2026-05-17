# Runbook — páginas `/docencia/[slug]` com Lattes + ORCID + LinkedIn

**Última revisão:** 17-05-2026 (Wave 3 SEO/GEO Sprint)
**Endereça:** issue #56 — Vínculo Lattes/ORCID dos docentes
**Status:** parcial — entrega o padrão técnico; cadastro nominal dos docentes IPOG continua dependente do time IPOG enviar a lista canônica de coordenadores e professores.

---

## TL;DR

Páginas `/docencia/[slug]` são páginas de autor canônicas para coordenadores e professores IPOG citáveis pelo portal. Cada página injeta um `Person` schema com:

- `@id` único atrelado ao slug ASCII;
- `sameAs` apontando para Lattes, ORCID, LinkedIn (e Wikidata quando existir);
- `worksFor` referenciando IPOG (`@id` canônico) e/ou departamento;
- `knowsAbout` editorial com termos verticais de Psicologia/POT/Neurociência;
- `hasCredential` documentando titulação acadêmica reconhecida pela CAPES/MEC;
- `affiliation` quando docente atua simultaneamente em IES pública.

GEO impact: páginas `/docencia/[slug]` são tier 1 para extração de "quem são os professores do MBA X?" em LLMs. Person canônica + sameAs Lattes/ORCID/Wikidata é o sinal mais forte para AI Overviews, ChatGPT Search, Perplexity Pages e Gemini citation.

---

## 1. Estrutura de arquivos

```
site/src/pages/docencia/
  index.astro                       # hub /docencia (lista todos os docentes)
  [slug].astro                      # rota dinâmica /docencia/:slug
site/src/lib/docentes.ts            # fonte da verdade (array DOCENTES)
site/src/lib/schemas/person-docente.ts  # factory buildDocentePerson (a criar)
```

Slugs ASCII obrigatórios (regra global REGRA #0 — slugs nunca acentuados). Exemplos:
- `alexandre-caramaschi` (referência cruzada, mas Alexandre é editor, não docente IPOG)
- `nome-sobrenome-docente`

---

## 2. Padrão de dados — `site/src/lib/docentes.ts`

Cada docente vira um objeto canônico:

```ts
export interface Docente {
  slug: string;                   // ASCII, ex.: "fulano-de-tal"
  nome: string;                   // "Fulano de Tal"
  titulacao: 'Doutor' | 'Mestre' | 'Especialista' | 'Pós-Doutor';
  tituloCompleto: string;         // "Doutor em Psicologia pela USP"
  jobTitle: string;               // "Coordenador do MBA em POT" | "Professor convidado"
  bio: string;                    // 2-4 frases PT-BR acentuadas
  imagemUrl?: string;             // /docentes/<slug>.jpg
  // Identidade verificável — sameAs canônico:
  lattesId?: string;              // URL CV Lattes, ex.: "http://lattes.cnpq.br/0123456789012345"
  orcidId?: string;               // URL ORCID, ex.: "https://orcid.org/0000-0001-2345-6789"
  linkedinUrl?: string;           // URL pública LinkedIn
  googleScholarId?: string;       // URL Google Scholar perfil
  wikidataId?: string;            // URL Wikidata Q-item, se houver
  semanticScholarId?: string;     // URL Semantic Scholar
  // Vínculos institucionais:
  affiliations: Array<{ name: string; url?: string }>;
  // Áreas de competência (mín. 5 termos):
  knowsAbout: string[];
  // Programas IPOG em que leciona (slug do programa):
  lecionaEm: string[];            // ['/mbas/mba-pot', '/mbas/mba-positiva']
}

export const DOCENTES: Docente[] = [
  // [VERIFICAR] — preencher com lista oficial enviada pelo time IPOG.
];
```

**Regra de qualidade Lattes/ORCID:**
- `lattesId` é obrigatório para docentes brasileiros titulados (Lattes é o repositório curricular público da CNPq, mandatório CAPES). Sem Lattes, a página NÃO publica até esclarecer.
- `orcidId` é fortemente recomendado (interoperabilidade internacional, indispensável para `sameAs` cross-lingual).
- `linkedinUrl` é o canal de validação para LLMs que pesam fontes "professional/biographic" (LinkedIn é fonte #1 de citation cross-engine em estudos GEO 2026).
- `wikidataId` cria a "ponte de identidade" canônica que Google Knowledge Graph e Bing absorvem para Knowledge Panels — criar item Wikidata para cada docente sênior (procedimento separado, ver `feedback_wikidata_anonymous_throttle_2026`).

---

## 3. Schema canônico — `site/src/lib/schemas/person-docente.ts`

Factory a criar (sugestão para próxima wave). Snippet canônico:

```ts
import type { Docente } from '../docentes';

export function buildDocentePerson(d: Docente) {
  const baseUrl = 'https://posgraduacaopsicologia.com';
  const personId = `${baseUrl}/docencia/${d.slug}#person`;

  const sameAs = [
    d.lattesId,
    d.orcidId,
    d.linkedinUrl,
    d.googleScholarId,
    d.wikidataId,
    d.semanticScholarId
  ].filter((u): u is string => Boolean(u));

  return {
    '@type': 'Person',
    '@id': personId,
    name: d.nome,
    jobTitle: d.jobTitle,
    description: d.bio,
    image: d.imagemUrl ? `${baseUrl}${d.imagemUrl}` : undefined,
    url: `${baseUrl}/docencia/${d.slug}`,
    sameAs,
    knowsAbout: d.knowsAbout,
    knowsLanguage: ['pt-BR', 'en'],
    nationality: { '@type': 'Country', name: 'Brazil' },
    worksFor: { '@id': `${baseUrl}/#ipog-educational-organization` },
    affiliation: d.affiliations.map((a) => ({
      '@type': 'Organization',
      name: a.name,
      ...(a.url ? { url: a.url } : {})
    })),
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: d.titulacao,
        name: d.tituloCompleto,
        recognizedBy: {
          '@type': 'GovernmentOrganization',
          name: 'CAPES — Coordenação de Aperfeiçoamento de Pessoal de Nível Superior',
          url: 'https://www.gov.br/capes/'
        }
      }
    ]
  };
}
```

---

## 4. Padrão de página `/docencia/[slug].astro`

```astro
---
import Base from '@layouts/Base.astro';
import Breadcrumbs from '@components/Breadcrumbs.astro';
import { DOCENTES } from '@lib/docentes';
import { SITE } from '@lib/data';
import { ipogEducationalOrganization, buildSpeakable } from '@lib/schemas';
import { buildDocentePerson } from '@lib/schemas/person-docente';

export function getStaticPaths() {
  return DOCENTES.map((d) => ({ params: { slug: d.slug }, props: { docente: d } }));
}

const { docente } = Astro.props;

const personSchema = buildDocentePerson(docente);
const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: SITE.url + '/' },
    { '@type': 'ListItem', position: 2, name: 'Docência', item: SITE.url + '/docencia' },
    { '@type': 'ListItem', position: 3, name: docente.nome }
  ]
};

const graph = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    { ...personSchema, speakable: buildSpeakable(['#bio', '#credenciais']) },
    ipogEducationalOrganization
  ]
});

const title = `${docente.nome} — ${docente.jobTitle} · Pós-Graduação em Psicologia`;
const description = `${docente.nome}: ${docente.tituloCompleto}. ${docente.bio.slice(0, 120)}`;
---

<Base title={title} description={description}>
  <section class="container-page py-7">
    <Breadcrumbs items={[
      { label: 'Início', href: '/' },
      { label: 'Docência', href: '/docencia' },
      { label: docente.nome }
    ]} />
    <h1 class="section-h text-3xl mt-4">{docente.nome}</h1>
    <p class="text-ink-700 mt-2">{docente.jobTitle} · {docente.tituloCompleto}</p>

    <div id="bio" class="prose mt-6 max-w-3xl">
      <p>{docente.bio}</p>
    </div>

    <section id="credenciais" class="mt-8">
      <h2 class="section-h text-xl">Identidade verificável</h2>
      <ul class="mt-3 space-y-2">
        {docente.lattesId && <li><a href={docente.lattesId} rel="noopener me external" target="_blank">CV Lattes</a></li>}
        {docente.orcidId && <li><a href={docente.orcidId} rel="noopener me external" target="_blank">ORCID</a></li>}
        {docente.linkedinUrl && <li><a href={docente.linkedinUrl} rel="noopener me external" target="_blank">LinkedIn</a></li>}
        {docente.googleScholarId && <li><a href={docente.googleScholarId} rel="noopener me external" target="_blank">Google Scholar</a></li>}
      </ul>
    </section>

    <section class="mt-8">
      <h2 class="section-h text-xl">Áreas de competência</h2>
      <ul class="mt-3 flex flex-wrap gap-2">
        {docente.knowsAbout.map((k) => <li class="px-3 py-1 bg-surface-100 rounded text-sm">{k}</li>)}
      </ul>
    </section>
  </section>

  <script type="application/ld+json" set:html={graph} />
  <script type="application/ld+json" set:html={JSON.stringify(breadcrumb)} />
</Base>
```

Notas:
- `rel="noopener me external"` no `<a>` para Lattes/ORCID/LinkedIn é o canônico H-card / IndieAuth (`rel=me` para verificação de identidade) + segurança (`noopener`).
- `id="bio"` + `id="credenciais"` permitem `Speakable` apontar para os 2 blocos críticos para citation AI.
- `getStaticPaths()` garante geração estática com 1 página por docente.
- Schema agrupa `Person` + `EducationalOrganization` em `@graph` (deduplicação canônica).

---

## 5. Página hub `/docencia/index.astro`

Lista todos os docentes com `ItemList` schema e cards canônicos. Snippet schema:

```ts
const itemList = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE.url}/docencia`,
  name: 'Corpo docente — Pós-Graduação em Psicologia',
  description: 'Coordenadores e professores dos MBAs e Especializações em Psicologia do IPOG.',
  isPartOf: { '@id': `${SITE.url}/#website` },
  about: { '@id': `${SITE.url}/#ipog-educational-organization` },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: DOCENTES.length,
    itemListElement: DOCENTES.map((d, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE.url}/docencia/${d.slug}`,
      name: d.nome,
      item: { '@id': `${SITE.url}/docencia/${d.slug}#person` }
    }))
  }
};
```

---

## 6. Política de dados — sem invenção, sem placeholder público

- Toda credencial publicada (Lattes, ORCID, titulação, instituição) **deve ser verificável em fonte primária**. CV Lattes oficial é o gate final.
- Se um docente não tiver ORCID, NÃO inventar ID. Deixar o campo vazio na fonte de verdade e o `sameAs` simplesmente omite a URL.
- **Proibido**: gerar `lattesId` ou `orcidId` placeholder/aleatório para "preencher". Schema.org com URL quebrada degrada E-E-A-T.
- **`[VERIFICAR]`** permitido apenas na fonte de verdade interna (`docentes.ts` comentário), nunca na página pública.

---

## 7. Checklist de publicação por docente

- [ ] CV Lattes URL coletada e validada (HTTP 200).
- [ ] ORCID URL coletada e validada (HTTP 200). Se inexistente, registrar `[VERIFICAR criar ORCID]` em backlog.
- [ ] LinkedIn URL pública (perfil ativo, não placeholder).
- [ ] Biografia 2-4 frases PT-BR acentuada revisada pelo voice_guard (`feedback_alexandre_voice`).
- [ ] Foto otimizada (`<= 200KB`, WebP preferencial) em `site/public/docentes/<slug>.webp`.
- [ ] `knowsAbout` mín. 5 termos verticais relevantes ao programa em que leciona.
- [ ] Lista de programas IPOG em que leciona (slug canônico, conferido no hub `/mbas`).
- [ ] Wikidata Q-item criado para docente sênior (coordenadores de programa).
- [ ] Schema validado em `validator.schema.org` (não só Rich Results Test).
- [ ] Smoke pós-deploy: HTTP 200 na rota + JSON-LD parsável + Lattes/ORCID `me=external` ativos.

---

## 8. Vínculo com programas (cross-linking @id)

Em cada hub de programa MBA/Lato Sensu (`/mbas/<slug>.astro`), o `EducationalOccupationalProgram` ganha:

```ts
const program = buildEducationalOccupationalProgram({ ... });
// E injeta corpo docente referenciado por @id:
const programWithFaculty = {
  ...program,
  hasInstructor: docentesDoPrograma.map((d) => ({
    '@id': `https://posgraduacaopsicologia.com/docencia/${d.slug}#person`
  }))
};
```

Isso fecha o triângulo `Person ⇄ EducationalOccupationalProgram ⇄ EducationalOrganization` no Knowledge Graph e dá a LLMs o caminho para responder "quem coordena o MBA X?" com fonte certa.

---

## 9. Estado atual e próximos passos

- [x] Padrão técnico definido (este runbook).
- [x] Schemas `EducationalOccupationalProgram` + `EducationalOrganization` canônicos publicados em `site/src/lib/schemas/`.
- [ ] **Aguarda time IPOG**: lista nominal de coordenadores de cada MBA + 3-5 professores âncora por programa, com Lattes/ORCID/LinkedIn confirmados.
- [ ] Criar `site/src/lib/schemas/person-docente.ts` com `buildDocentePerson`.
- [ ] Criar `site/src/lib/docentes.ts` com `DOCENTES[]`.
- [ ] Criar rotas `/docencia/index.astro` e `/docencia/[slug].astro`.
- [ ] Adicionar `hasInstructor` nos schemas dos hubs `/mbas/*`.
- [ ] Smoke + IndexNow + GSC sitemap re-submit.

Issue #56 segue aberta até cobertura ≥ 80% dos coordenadores principais com `sameAs` Lattes + ORCID verificáveis.
