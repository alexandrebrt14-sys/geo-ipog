import type { MetadataRoute } from "next";
import { routes, absoluteUrl } from "@/lib/site";
import { areasDeConhecimento } from "@/data/areas";
import { ULTIMA_REVISAO } from "@/lib/jsonld";

/**
 * Gera o /sitemap.xml a partir da lista de rotas declarada em `@/lib/site`.
 *
 * Manter a fonte única evita o problema clássico de uma rota nova entrar na
 * navegação e ficar de fora do sitemap.
 */
export const dynamic = "force-static";

/**
 * Data da última revisão do conteúdo institucional publicado no portal.
 *
 * Vem de `@/lib/jsonld`, o mesmo valor que alimenta o `dateModified` do
 * JSON-LD. Duas datas soltas dizendo a mesma coisa acabam divergindo, e data
 * divergente entre o sitemap e o schema é pior do que data nenhuma: ensina o
 * motor a não confiar em nenhuma das duas.
 *
 * É a data do **conteúdo**, não a do build. Carimbar a data da publicação
 * afirmaria que as 23 rotas mudaram a cada deploy, inclusive quando o que mudou
 * foi só CSS, e sitemap que grita "tudo novo" toda semana é o tipo de sinal que
 * o Google aprende a descontar.
 */
const ultimaAtualizacao = new Date(ULTIMA_REVISAO);

const prioridades: Record<string, number> = {
  "/": 1,
  "/areas-de-conhecimento": 0.9,
  "/faq": 0.9,
  "/metodo": 0.8,
  "/autoridade": 0.8,
  "/unidades": 0.8,
  "/enterprise": 0.9,
  "/tipos-de-curso": 0.9,
  "/modalidades": 0.9,
  "/ipog-hub": 0.8,
  "/sobre": 0.7,
};

/** Rotas das páginas de área, derivadas do catálogo. */
const rotasDeArea = areasDeConhecimento.map(
  (area) => `/areas-de-conhecimento/${area.slug}`,
);

export default function sitemap(): MetadataRoute.Sitemap {
  return [...routes, ...rotasDeArea].map((rota) => ({
    url: absoluteUrl(rota),
    lastModified: ultimaAtualizacao,
    changeFrequency: "monthly" as const,
    priority: prioridades[rota] ?? 0.6,
  }));
}
