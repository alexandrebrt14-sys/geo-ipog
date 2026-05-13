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
      out.push({ loc: loc.replace(/\/+$/, '') || SITE, priority: route === '' ? 1.0 : 0.7, route });
    }
  }
}

walk(distDir);

function buildUrlset(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${u.priority.toFixed(1)}</priority></url>`).join('\n')}
</urlset>
`;
}

// Sub-sitemap rules: prefixes mapped to filenames.
const sections = [
  { id: 'areas', prefix: 'areas/', file: 'sitemap-areas.xml' },
  { id: 'mbas', prefix: 'mbas/', file: 'sitemap-mbas.xml' },
  { id: 'guias', prefix: 'guias/', file: 'sitemap-guias.xml' },
  { id: 'faq', prefix: 'faq/', file: 'sitemap-faq.xml' },
  { id: 'comparativos', prefix: 'comparativos/', file: 'sitemap-comparativos.xml' },
];

// Main sitemap = todas as URLs.
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), buildUrlset(out), 'utf-8');

// Generate sub-sitemaps.
const subSitemapsWritten = [];
for (const sec of sections) {
  const urls = out.filter(u => u.route.startsWith(sec.prefix));
  if (urls.length === 0) {
    console.warn(`[gen-sitemap] secao "${sec.id}" sem URLs (prefix=${sec.prefix})`);
    continue;
  }
  fs.writeFileSync(path.join(distDir, sec.file), buildUrlset(urls), 'utf-8');
  subSitemapsWritten.push({ file: sec.file, count: urls.length });
}

// sitemap-index.xml aponta para o principal + todos os sub-sitemaps.
const allMaps = [
  { loc: `${SITE}/sitemap.xml`, lastmod: today },
  ...subSitemapsWritten.map(s => ({ loc: `${SITE}/${s.file}`, lastmod: today })),
];

const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allMaps.map(m => `  <sitemap><loc>${m.loc}</loc><lastmod>${m.lastmod}</lastmod></sitemap>`).join('\n')}
</sitemapindex>
`;

fs.writeFileSync(path.join(distDir, 'sitemap-index.xml'), indexXml, 'utf-8');

console.log(`Sitemap principal: ${out.length} URLs em sitemap.xml`);
for (const s of subSitemapsWritten) {
  console.log(`  - ${s.file}: ${s.count} URLs`);
}
console.log(`Sitemap-index: ${allMaps.length} sitemaps referenciados`);
