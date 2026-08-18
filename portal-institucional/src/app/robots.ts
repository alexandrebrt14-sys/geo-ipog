import type { MetadataRoute } from "next";
import { site, absoluteUrl } from "@/lib/site";

/**
 * Gera o /robots.txt.
 *
 * O portal existe para ser lido por motores generativos, então os crawlers de
 * IA são liberados explicitamente em vez de ficarem sujeitos apenas à regra
 * geral. Declarar cada um pelo nome evita que uma futura política restritiva no
 * agente coringa bloqueie por acidente a indexação que se quer aqui.
 */
export const dynamic = "force-static";

const crawlersGenerativos = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...crawlersGenerativos.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
