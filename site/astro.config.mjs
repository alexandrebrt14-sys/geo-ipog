import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://posgraduacaopsicologia.com',
  // Coerencia canonical<->sitemap: URLs sempre COM barra final (build directory-format).
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'auto',
    assets: 'assets'
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false })
  ],
  vite: {
    build: {
      cssMinify: 'esbuild'
    }
  }
});
