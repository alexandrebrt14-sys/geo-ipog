import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://posgraduacaopsicologia.com';
const today = new Date().toISOString().slice(0, 10);

const distDir = path.resolve('dist');
const out = [];

function walk(dir, base = '') {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('_') || entry.name === 'assets') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, path.join(base, entry.name));
    } else if (entry.name === 'index.html') {
      const route = base.replace(/\\/g, '/');
      const loc = SITE + '/' + route;
      out.push({ loc: loc.replace(/\/+$/, '') || SITE, priority: route === '' ? 1.0 : 0.7 });
    }
  }
}

walk(distDir);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${out.map(u => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${u.priority.toFixed(1)}</priority></url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf-8');
fs.writeFileSync(path.join(distDir, 'sitemap-index.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${SITE}/sitemap.xml</loc><lastmod>${today}</lastmod></sitemap>
</sitemapindex>
`, 'utf-8');

console.log(`Sitemap with ${out.length} URLs written to dist/sitemap.xml`);
