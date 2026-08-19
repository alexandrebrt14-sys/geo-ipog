import type { MetadataRoute } from "next";
import { routes, absoluteUrl } from "@/lib/site";

/**
 * Gera o /sitemap.xml a partir da lista de rotas declarada em `@/lib/site`.
 *
 * Manter a fonte única evita o problema clássico de uma rota nova entrar na
 * navegação e ficar de fora do sitemap.
 */
export const dynamic = "force-static";

/** Data da última revisão do conteúdo institucional publicado no portal. */
const ultimaAtualizacao = new Date("2026-08-18");

const prioridades: Record<string, number> = {
  "/": 1,
  "/areas-de-conhecimento": 0.9,
  "/faq": 0.9,
  "/metodo": 0.8,
  "/autoridade": 0.8,
  "/sobre": 0.7,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((rota) => ({
    url: absoluteUrl(rota),
    lastModified: ultimaAtualizacao,
    changeFrequency: "monthly" as const,
    priority: prioridades[rota] ?? 0.6,
  }));
}
