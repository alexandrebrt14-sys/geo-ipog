import type { NextConfig } from "next";

/**
 * Caminho em que o portal é entregue dentro do domínio de destino.
 *
 * Fica vazio quando o portal responde na raiz, que é o caso do espelho em
 * geo-ipog.pages.dev, e vale "/ipog" na publicação de produção, em que ele ocupa
 * uma subpasta de posgraduacaopsicologia.com.
 *
 * Sai de variável de ambiente porque os dois builds nascem do mesmo código e só
 * o endereço de entrega muda. Com `basePath` definido, o Next reescreve sozinho
 * todo `<Link>`, as rotas e os assets de `_next/`, então nenhum link interno
 * precisa saber onde o portal foi montado.
 *
 * O que ele NÃO reescreve é caminho de arquivo de `public/` escrito como string.
 * `next/image` também não reescreve, porque o otimizador está desligado logo
 * abaixo. Para esses casos existe o helper `assetPath` em `src/lib/site.ts`.
 */
const caminhoBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

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

  // Prefixo de rota e de asset. Só entra na configuração quando existe, porque
  // declarar `basePath: ""` é diferente de omitir a chave em algumas versões do
  // Next e não vale correr o risco no build de produção.
  ...(caminhoBase ? { basePath: caminhoBase, assetPrefix: caminhoBase } : {}),

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
