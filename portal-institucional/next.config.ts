import type { NextConfig } from "next";

/**
 * O portal é gerado como HTML estático.
 *
 * Motores generativos leem o HTML entregue na resposta, sem executar a
 * hidratação do React. Exportar estaticamente garante que todo o conteúdo,
 * inclusive os blocos JSON-LD, esteja presente no documento inicial, e permite
 * hospedar o portal em qualquer CDN ou servi-lo como subdiretório do site novo
 * do IPOG.
 */
const nextConfig: NextConfig = {
  output: "export",

  // Necessário no export estático: cada rota vira uma pasta com index.html,
  // o que evita depender de reescrita de URL no servidor de destino.
  trailingSlash: true,

  // O otimizador de imagens do Next depende de servidor. Como não há imagens
  // rasterizadas no portal (a identidade é montada em SVG e CSS), desligar o
  // otimizador não implica perda de qualidade.
  images: {
    unoptimized: true,
  },

  // Falha o build em erro de tipo, em vez de publicar quebrado.
  // O lint roda separadamente por `npm run lint`, já que o Next 16 removeu a
  // chave `eslint` da configuração.
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
