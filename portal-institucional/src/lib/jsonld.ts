/**
 * Construtores de dados estruturados Schema.org (JSON-LD).
 *
 * Cada função devolve um objeto puro, serializado pelo componente <JsonLd />.
 * Centralizar aqui garante que o `@id` da organização seja o mesmo em todas as
 * rotas, permitindo que os motores generativos consolidem as declarações em uma
 * única entidade em vez de tratá-las como organizações distintas.
 */

import { site, absoluteUrl } from "@/lib/site";
import {
  instituicao,
  atendimento,
  canaisAtendimento,
  perfisOficiais,
} from "@/data/institucional";
import type { Curso } from "@/data/areas";
import { areasDeConhecimento } from "@/data/areas";
import type { PerguntaFrequente } from "@/data/faq";

/** Identificador canônico da entidade IPOG, reutilizado por referência. */
export const ORGANIZATION_ID = absoluteUrl("/#organizacao");
export const WEBSITE_ID = absoluteUrl("/#site");

/**
 * Datas do conteúdo institucional do portal.
 *
 * Conteúdo sem data compete em desvantagem: perguntado sobre como algo é
 * "hoje", o motor prefere a fonte que diz quando foi revista. As duas datas são
 * do conteúdo, e não do build, de propósito. Carimbar a data do build a cada
 * publicação diria que tudo mudou toda vez, que é falso e, repetido, ensina o
 * motor a ignorar o campo.
 *
 * `PRIMEIRA_PUBLICACAO` é quando o portal foi ao ar. `ULTIMA_REVISAO` sobe
 * quando o conteúdo institucional é de fato revisto, não quando o código muda.
 */
export const PRIMEIRA_PUBLICACAO = "2026-08-18";
export const ULTIMA_REVISAO = "2026-08-25";

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
    /* Amarra esta descrição do IPOG aos perfis que o IPOG declara como seus.
       É o que permite ao motor tratar tudo como uma entidade só, em vez de
       vários candidatos parecidos. Ver `perfisOficiais`. */
    sameAs: [...perfisOficiais],
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
    /* Um ponto de contato por segmento, mais um para quem ainda vai se
       matricular. O telefone é o mesmo em todos porque a Central é uma só: o
       que distingue o segmento é o e-mail. */
    contactPoint: [
      ...canaisAtendimento.map((canal) => ({
        "@type": "ContactPoint",
        contactType: canal.area,
        telephone: atendimento.central,
        email: canal.email,
        areaServed: "BR",
        availableLanguage: "Portuguese",
        hoursAvailable: atendimento.horario,
      })),
      {
        "@type": "ContactPoint",
        contactType: "Matrícula",
        telephone: atendimento.matricula,
        areaServed: "BR",
        availableLanguage: "Portuguese",
        hoursAvailable: atendimento.horario,
      },
    ],
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

/**
 * Schema.org/FAQPage — cada par pergunta e resposta vira uma Question.
 *
 * `basePath` existe porque o portal tem mais de um bloco de perguntas: o FAQ
 * geral em `/faq` e um FAQ próprio em cada página de área. Os identificadores
 * precisam acompanhar a rota, senão duas perguntas diferentes compartilhariam
 * o mesmo `@id` e os motores fundiriam as duas em uma só entidade.
 */
export function faqSchema(
  perguntas: ReadonlyArray<PerguntaFrequente>,
  basePath = "/faq",
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": absoluteUrl(`${basePath}#faqpage`),
    inLanguage: site.locale,
    about: { "@id": ORGANIZATION_ID },
    mainEntity: perguntas.map((item) => ({
      "@type": "Question",
      "@id": absoluteUrl(`${basePath}#${item.id}`),
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
 * Converte a duração declarada pelo site em duração ISO 8601.
 *
 * O campo `timeRequired` do Schema.org espera duração de máquina, não o texto
 * exibido ao leitor. "12 meses" vira "P12M" e "2,5 anos" vira "P30M", já que a
 * notação ISO não admite fração de ano.
 */
function duracaoIso(duracao: string | null): string | undefined {
  if (!duracao) return undefined;

  const meses = /^(\d+)\s+meses$/.exec(duracao);
  if (meses) return `P${meses[1]}M`;

  const anos = /^(\d+(?:[.,]\d+)?)\s+anos?$/.exec(duracao);
  if (anos) return `P${Math.round(Number(anos[1].replace(",", ".")) * 12)}M`;

  return undefined;
}

/**
 * Schema.org/Course para um curso do portfólio.
 *
 * `hasCourseInstance` declara as modalidades disponíveis usando o vocabulário
 * `courseMode`, que é o campo que os motores leem para responder perguntas do
 * tipo "esse curso tem versão online?".
 *
 * O `@id` é derivado apenas do nome e do nível, e não da área. Um mesmo curso
 * pode pertencer a várias áreas, como o site do IPOG declara, e repetir a
 * entidade por área faria os motores contarem o mesmo curso mais de uma vez.
 * As áreas entram em `about`, que é o campo próprio para assunto.
 */
export function courseSchema(curso: Curso): JsonLdObject {
  const modoPorModalidade: Record<string, string> = {
    Presencial: "onsite",
    "Ao vivo": "online",
    EaD: "online",
  };

  const areas = areasDeConhecimento.filter((area) =>
    curso.areas.includes(area.slug),
  );
  const nomesDasAreas = areas.map((area) => area.nome);
  const tempo = duracaoIso(curso.duracao);

  return {
    "@type": "Course",
    "@id": absoluteUrl(
      `/areas-de-conhecimento#curso-${slugificar(curso.nivel)}-${slugificar(curso.nome)}`,
    ),
    url: absoluteUrl(
      `/areas-de-conhecimento#${areas[0]?.slug ?? "catalogo"}-cursos`,
    ),
    name: curso.nome,
    description: `${curso.nivel} do IPOG ${
      nomesDasAreas.length > 1 ? "nas áreas de" : "na área de"
    } ${nomesDasAreas.join(", ")}, ${
      curso.duracao ? `com duração de ${curso.duracao}, ` : ""
    }disponível nas modalidades ${curso.modalidades.join(", ")}.`,
    educationalLevel: curso.nivel,
    inLanguage: site.locale,
    provider: { "@id": ORGANIZATION_ID },
    about: nomesDasAreas.map((nome) => ({ "@type": "Thing", name: nome })),
    ...(tempo ? { timeRequired: tempo } : {}),
    hasCourseInstance: curso.modalidades.map((modalidade) => ({
      "@type": "CourseInstance",
      courseMode: modoPorModalidade[modalidade] ?? "blended",
      name: `${curso.nome} — ${modalidade}`,
      availableLanguage: site.locale,
      ...(tempo ? { courseSchedule: { "@type": "Schedule", duration: tempo } } : {}),
    })),
  };
}

/**
 * Reúne o catálogo inteiro em um ItemList navegável por máquina.
 *
 * A lista percorre os cursos, e não as áreas, para que um curso que pertence a
 * mais de uma área apareça uma única vez. `numberOfItems` passa então a
 * refletir o número real de formações distintas.
 */
export function catalogoDeCursosSchema(
  cursos: ReadonlyArray<Curso>,
  opcoes: { compacto?: boolean; path?: string } = {},
): JsonLdObject {
  const { compacto = false, path = "/areas-de-conhecimento" } = opcoes;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": absoluteUrl(`${path}#catalogo`),
    name: "Catálogo de cursos do IPOG por área de conhecimento",
    itemListOrder: "https://schema.org/ItemListUnordered",
    numberOfItems: cursos.length,
    itemListElement: cursos.map((curso, indice) => ({
      "@type": "ListItem",
      position: indice + 1,
      item: compacto ? referenciaDeCurso(curso) : courseSchema(curso),
    })),
  };
}

/**
 * Referência enxuta a um curso, para a lista do índice de áreas.
 *
 * O índice precisa continuar declarando os 213 cursos, senão a lista completa
 * deixa de existir em um endereço só. Mas repetir ali a definição inteira de
 * cada curso, que já está na página da área, custava centenas de kilobytes de
 * JSON duplicado. A referência por `@id` resolve os dois lados: a lista fica
 * completa e o motor encontra a definição rica na rota da área, sob o mesmo
 * identificador.
 */
function referenciaDeCurso(curso: Curso): JsonLdObject {
  return {
    "@type": "Course",
    "@id": absoluteUrl(
      `/areas-de-conhecimento#curso-${slugificar(curso.nivel)}-${slugificar(curso.nome)}`,
    ),
    name: curso.nome,
    educationalLevel: curso.nivel,
    provider: { "@id": ORGANIZATION_ID },
  };
}

/**
 * Schema.org/Service para uma frente de atuação do IPOG.
 *
 * `Service` é o tipo certo para educação corporativa: não é um curso com turma
 * e calendário, e sim um serviço prestado sob medida. O catálogo entra em
 * `hasOfferCatalog`, que é onde um motor procura "o que essa empresa oferece".
 */
export function servicoSchema(params: {
  path: string;
  nome: string;
  descricao: string;
  tipoServico: string;
  catalogo: ReadonlyArray<{ nome: string; descricao: string }>;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`${params.path}#servico`),
    url: absoluteUrl(params.path),
    name: params.nome,
    description: params.descricao,
    serviceType: params.tipoServico,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "Country", name: "Brasil" },
    inLanguage: site.locale,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Catálogo do ${params.nome}`,
      itemListElement: params.catalogo.map((item, indice) => ({
        "@type": "Offer",
        position: indice + 1,
        itemOffered: {
          "@type": "Service",
          name: item.nome,
          description: item.descricao,
        },
      })),
    },
  };
}

/**
 * Schema.org/EventVenue para espaço locável.
 *
 * `maximumAttendeeCapacity` e `amenityFeature` são os campos que respondem
 * "cabe quanta gente?" e "tem projetor?" sem que o motor precise inferir do
 * texto corrido.
 */
export function locaisDeEventoSchema(params: {
  path: string;
  nome: string;
  descricao: string;
  endereco: string;
  cidade: string;
  uf: string;
  capacidadeMaxima: number;
  comodidades: readonly string[];
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    "@id": absoluteUrl(`${params.path}#local`),
    url: absoluteUrl(params.path),
    name: params.nome,
    description: params.descricao,
    maximumAttendeeCapacity: params.capacidadeMaxima,
    address: {
      "@type": "PostalAddress",
      streetAddress: params.endereco,
      addressLocality: params.cidade,
      addressRegion: params.uf,
      addressCountry: "BR",
    },
    amenityFeature: params.comodidades.map((comodidade) => ({
      "@type": "LocationFeatureSpecification",
      name: comodidade,
      value: true,
    })),
    isAccessibleForFree: false,
    parentOrganization: { "@id": ORGANIZATION_ID },
  };
}

/**
 * Schema.org/WebPage genérico, para rotas de conteúdo institucional.
 *
 * `relacionados` declara endereços de outra propriedade do IPOG que tratam do
 * mesmo assunto, hoje os artigos do blog. É por `relatedLink` que um motor
 * associa portal e blog como a mesma fonte, em vez de dois sites soltos, e o
 * campo é o correto aqui: o conteúdo do artigo não está nesta página, então
 * declarar `Article` seria mentir sobre o que a rota contém.
 */
export function webPageSchema(params: {
  path: string;
  name: string;
  description: string;
  relacionados?: readonly string[];
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
    datePublished: PRIMEIRA_PUBLICACAO,
    dateModified: ULTIMA_REVISAO,
    ...(params.relacionados && params.relacionados.length > 0
      ? { relatedLink: [...params.relacionados] }
      : {}),
  };
}
