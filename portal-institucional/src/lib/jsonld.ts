/**
 * Construtores de dados estruturados Schema.org (JSON-LD).
 *
 * Cada função devolve um objeto puro, serializado pelo componente <JsonLd />.
 * Centralizar aqui garante que o `@id` da organização seja o mesmo em todas as
 * rotas, permitindo que os motores generativos consolidem as declarações em uma
 * única entidade em vez de tratá-las como organizações distintas.
 */

import { site, absoluteUrl } from "@/lib/site";
import { instituicao, canaisAtendimento } from "@/data/institucional";
import type { AreaConhecimento } from "@/data/areas";
import type { PerguntaFrequente } from "@/data/faq";

/** Identificador canônico da entidade IPOG, reutilizado por referência. */
export const ORGANIZATION_ID = absoluteUrl("/#organizacao");
export const WEBSITE_ID = absoluteUrl("/#site");

type JsonLdObject = Record<string, unknown>;

/**
 * Schema.org/EducationalOrganization — a entidade raiz do portal.
 * Declarada uma única vez, no layout, e referenciada por `@id` nas demais rotas.
 */
export function organizationSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": ORGANIZATION_ID,
    name: instituicao.nome,
    legalName: instituicao.nomeCompleto,
    alternateName: "Instituto de Pós-Graduação e Graduação",
    url: instituicao.site,
    foundingDate: instituicao.fundacao,
    slogan: instituicao.tagline,
    description: instituicao.descricaoCurta,
    knowsLanguage: "pt-BR",
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: instituicao.cidadeOrigem,
        addressRegion: instituicao.estadoOrigem,
        addressCountry: instituicao.pais,
      },
    },
    areaServed: {
      "@type": "Country",
      name: "Brasil",
    },
    employee: {
      "@type": "Person",
      name: instituicao.ceo,
      jobTitle: "CEO",
    },
    contactPoint: canaisAtendimento.map((canal) => ({
      "@type": "ContactPoint",
      contactType: canal.area,
      telephone: canal.telefones[0],
      email: canal.email,
      areaServed: "BR",
      availableLanguage: "Portuguese",
    })),
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Conceito MEC",
      name: "Conceito 5 no MEC",
      description:
        "Nota máxima na avaliação do Ministério da Educação do Brasil.",
    },
  };
}

/** Schema.org/WebSite — habilita o entendimento do portal como obra própria. */
export function websiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: site.locale,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/**
 * Schema.org/BreadcrumbList — informa a posição da rota na hierarquia do portal.
 * Recebe a trilha já montada, do nível mais alto para o mais baixo.
 */
export function breadcrumbSchema(
  trilha: ReadonlyArray<{ nome: string; href: string }>,
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trilha.map((item, indice) => ({
      "@type": "ListItem",
      position: indice + 1,
      name: item.nome,
      item: absoluteUrl(item.href),
    })),
  };
}

/** Schema.org/FAQPage — cada par pergunta e resposta vira uma Question. */
export function faqSchema(perguntas: ReadonlyArray<PerguntaFrequente>): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": absoluteUrl("/faq#faqpage"),
    inLanguage: site.locale,
    about: { "@id": ORGANIZATION_ID },
    mainEntity: perguntas.map((item) => ({
      "@type": "Question",
      "@id": absoluteUrl(`/faq#${item.id}`),
      name: item.pergunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.resposta,
      },
    })),
  };
}

/** Converte um nome de curso em identificador estável, sem acento nem símbolo. */
function slugificar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Schema.org/Course para um curso do portfólio.
 *
 * `hasCourseInstance` declara as modalidades disponíveis usando o vocabulário
 * `courseMode`, que é o campo que os motores leem para responder perguntas do
 * tipo "esse curso tem versão online?".
 *
 * O `@id` combina a área e o nome do curso porque um identificador repetido
 * levaria os consumidores a fundir cursos distintos em uma única entidade.
 */
export function courseSchema(
  curso: { nome: string; nivel: string; modalidades: readonly string[] },
  area: Pick<AreaConhecimento, "nome" | "slug">,
): JsonLdObject {
  const modoPorModalidade: Record<string, string> = {
    Presencial: "onsite",
    "Ao vivo": "online",
    EaD: "online",
  };

  return {
    "@type": "Course",
    "@id": absoluteUrl(
      `/areas-de-conhecimento#curso-${area.slug}-${slugificar(curso.nome)}`,
    ),
    url: absoluteUrl(`/areas-de-conhecimento#${area.slug}-cursos`),
    name: curso.nome,
    description: `${curso.nivel} do IPOG na área de ${area.nome}, disponível nas modalidades ${curso.modalidades.join(", ")}.`,
    educationalLevel: curso.nivel,
    inLanguage: site.locale,
    provider: { "@id": ORGANIZATION_ID },
    hasCourseInstance: curso.modalidades.map((modalidade) => ({
      "@type": "CourseInstance",
      courseMode: modoPorModalidade[modalidade] ?? "blended",
      name: `${curso.nome} — ${modalidade}`,
      availableLanguage: site.locale,
    })),
  };
}

/**
 * Agrupa os cursos de todas as áreas em um ItemList navegável por máquina.
 *
 * A posição é contada de forma corrida sobre a lista achatada, e não reiniciada
 * a cada área, porque `position` identifica o item dentro do ItemList inteiro.
 */
export function catalogoDeCursosSchema(
  areas: ReadonlyArray<AreaConhecimento>,
): JsonLdObject {
  let posicao = 0;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": absoluteUrl("/areas-de-conhecimento#catalogo"),
    name: "Catálogo de cursos do IPOG por área de conhecimento",
    itemListOrder: "https://schema.org/ItemListUnordered",
    numberOfItems: areas.reduce((total, area) => total + area.cursos.length, 0),
    itemListElement: areas.flatMap((area) =>
      area.cursos.map((curso) => {
        posicao += 1;
        return {
          "@type": "ListItem",
          position: posicao,
          item: courseSchema(curso, area),
        };
      }),
    ),
  };
}

/** Schema.org/WebPage genérico, para rotas de conteúdo institucional. */
export function webPageSchema(params: {
  path: string;
  name: string;
  description: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl(`${params.path}#pagina`),
    url: absoluteUrl(params.path),
    name: params.name,
    description: params.description,
    inLanguage: site.locale,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
  };
}
