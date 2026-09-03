import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import seoPostbuild from './scripts/seo-postbuild.mjs';

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
    tailwind({ applyBaseStyles: false }),
    // Onda 3/5/E-E-A-T (03/09/2026): dateModified por git, citation e links termo->verbete no HTML final.
    seoPostbuild({ glossario: true, citation: true })
  ],
  vite: {
    build: {
      cssMinify: 'esbuild'
    }
  }
});
