# Robots.txt e Sitemap.xml — Checklist Técnico IPOG

> **Status:** vigente desde 2026-04-30
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-04-30

## Por que este checklist existe

Robots.txt e sitemap.xml são fundamentos não-negociáveis. Errar aqui invalida qualquer trabalho de Schema, conteúdo ou llms.txt — o LLM crawler simplesmente não vê a página. Este checklist é prescritivo: cada item é um check obrigatório que passa por verificação na bateria NAIA (categoria F) e bloqueia ondas editoriais quando falha.

## Robots.txt — checklist obrigatório

### 1. Disponibilidade e formato

- [ ] `https://ipog.edu.br/robots.txt` retorna HTTP 200.
- [ ] `Content-Type: text/plain` (ou `text/plain; charset=utf-8`).
- [ ] Arquivo é UTF-8 sem BOM.
- [ ] Tamanho menor que 500KB (limite Google).
- [ ] Nenhuma linha excede 2048 caracteres.

### 2. Allow-list para crawlers de LLM

Default obrigatório para o IPOG é permitir os principais crawlers de LLM. O programa GEO depende disso. Bloqueio é exceção documentada.

- [ ] `GPTBot` — crawler do ChatGPT (OpenAI).
- [ ] `ClaudeBot` — crawler do Claude (Anthropic).
- [ ] `Google-Extended` — usado pelo Gemini para treinamento.
- [ ] `GoogleOther` — Google geral.
- [ ] `PerplexityBot` — crawler do Perplexity (RAG-native, prioritário).
- [ ] `Bytespider` — usado por modelos chineses (avaliar com jurídico).
- [ ] `CCBot` — Common Crawl, usado por múltiplos LLMs em treinamento.
- [ ] `Applebot-Extended` — Apple Intelligence.
- [ ] `Amazonbot` — Alexa e Q.
- [ ] `Meta-ExternalAgent` — crawler da Meta.

### 3. Sitemap directive

- [ ] Diretiva `Sitemap:` presente no `robots.txt`.
- [ ] URL absoluta com protocolo HTTPS.
- [ ] Sitemap declarado retorna 200.
- [ ] Apenas um sitemap canônico declarado (ou sitemap-index único).

### 4. Bloqueios não devem afetar render

- [ ] Não bloqueia globalmente CSS (`*.css`).
- [ ] Não bloqueia globalmente JavaScript (`*.js`).
- [ ] Não bloqueia paths de imagens públicas usadas em conteúdo.
- [ ] Bloqueio de `/wp-admin/`, `/admin/`, `/login/` ou paths internos é permitido e recomendado.

### 5. Sem block global por engano

- [ ] Não existe linha `User-agent: *` seguida de `Disallow: /` aplicada a tudo.
- [ ] Crawler-Delay, quando presente, não é absurdamente alto (>10).

### Exemplo de robots.txt para o IPOG

```
# IPOG — Instituto de Pós-Graduação e Graduação
# Última atualização: 2026-04-30
# Permite crawlers de LLM por estratégia GEO declarada.

User-agent: *
Allow: /
Disallow: /wp-admin/
Disallow: /admin/
Disallow: /aluno/
Disallow: /portal-aluno/
Disallow: /api/
Disallow: /tmp/
Disallow: /*.pdf$
Disallow: /*?s=*
Disallow: /*?utm_*

User-agent: GPTBot
Allow: /
Disallow: /aluno/
Disallow: /portal-aluno/

User-agent: ClaudeBot
Allow: /
Disallow: /aluno/
Disallow: /portal-aluno/

User-agent: Google-Extended
Allow: /
Disallow: /aluno/
Disallow: /portal-aluno/

User-agent: PerplexityBot
Allow: /
Disallow: /aluno/
Disallow: /portal-aluno/

User-agent: GoogleOther
Allow: /

User-agent: CCBot
Allow: /
Disallow: /aluno/

User-agent: Applebot-Extended
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

Sitemap: https://ipog.edu.br/sitemap.xml
```

## Sitemap.xml — checklist obrigatório

### 1. Disponibilidade e formato

- [ ] `https://ipog.edu.br/sitemap.xml` retorna HTTP 200.
- [ ] `Content-Type: application/xml` ou `text/xml`.
- [ ] XML é válido (parse sem erro).
- [ ] Encoding UTF-8 declarado.
- [ ] Tamanho menor que 50MB descomprimido.
- [ ] No máximo 50.000 URLs por sitemap (acima disso, usar sitemap-index).

### 2. Árvore canônica única

- [ ] Apenas um sitemap raiz canônico declarado em `robots.txt`.
- [ ] Sem múltiplos plugins/geradores conflitantes (Yoast + RankMath + sitemap manual).
- [ ] Nenhuma URL aparece em mais de um sitemap.
- [ ] Toda URL listada retorna 200 (não 301, não 404).

### 3. Lastmod realista

- [ ] Toda URL tem `<lastmod>`.
- [ ] `<lastmod>` é a data real da última modificação substantiva (não toda hoje).
- [ ] Formato W3C Datetime (`2026-04-30T14:00:00-03:00` ou `2026-04-30`).
- [ ] Páginas-pilar têm lastmod recente (atualizadas nas últimas ondas).

### 4. Priority coerente

- [ ] Hub `/cursos/pos-graduacao` com priority 1.0.
- [ ] Páginas-pilar (curso individual, sobre, corpo docente) com priority 0.8.
- [ ] Posts de blog com priority 0.6.
- [ ] Páginas auxiliares com priority 0.4.
- [ ] Não usar priority 1.0 para mais que 5 URLs.

### 5. Segregação por tipo

Recomendado para o IPOG: usar sitemap-index com sitemaps segregados por tipo. Facilita auditoria, reduz tempo de re-indexação e dá controle granular sobre lastmod.

- [ ] `sitemap.xml` é um sitemap-index.
- [ ] `sitemap-cursos.xml` lista apenas páginas de curso.
- [ ] `sitemap-blog.xml` lista apenas posts de blog.
- [ ] `sitemap-institucional.xml` lista páginas institucionais (sobre, contato, política).
- [ ] `sitemap-corpo-docente.xml` lista perfis de docentes.

### 6. Canonicals coerentes

- [ ] Toda URL no sitemap tem canonical apontando para si mesma.
- [ ] Nenhuma URL no sitemap tem canonical apontando para outra página.
- [ ] Variantes UTM, query strings de tracking ou paginação não aparecem no sitemap.

### Exemplo de sitemap-index

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://ipog.edu.br/sitemap-cursos.xml</loc>
    <lastmod>2026-04-30T14:00:00-03:00</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://ipog.edu.br/sitemap-blog.xml</loc>
    <lastmod>2026-04-30T14:00:00-03:00</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://ipog.edu.br/sitemap-institucional.xml</loc>
    <lastmod>2026-04-15T09:00:00-03:00</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://ipog.edu.br/sitemap-corpo-docente.xml</loc>
    <lastmod>2026-04-20T11:00:00-03:00</lastmod>
  </sitemap>
</sitemapindex>
```

### Exemplo de sitemap-cursos.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ipog.edu.br/cursos/pos-graduacao</loc>
    <lastmod>2026-04-30</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://ipog.edu.br/cursos/pos-graduacao/mba-online-psicologia-organizacional</loc>
    <lastmod>2026-04-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ipog.edu.br/cursos/pos-graduacao/neuropsicologia</loc>
    <lastmod>2026-04-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ipog.edu.br/cursos/pos-graduacao/psicopedagogia</loc>
    <lastmod>2026-04-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

## Canonicals — checklist obrigatório

- [ ] Toda página principal tem `<link rel="canonical">` no `<head>`.
- [ ] Canonical aponta para a URL preferida em HTTPS.
- [ ] Canonical é absoluta, não relativa.
- [ ] Canonical não contém parâmetros UTM ou query strings de tracking.
- [ ] Canonical é coerente com `og:url` quando Open Graph é usado.
- [ ] Versões com e sem `www` consolidam no canonical preferido.
- [ ] Versões com e sem barra final (`/`) consolidam no canonical preferido.
- [ ] Páginas paginadas (`?page=2`) têm canonical apontando para si mesmas e usam `rel="prev"`/`rel="next"`.

## Redirects — checklist obrigatório

- [ ] Redirects definitivos são 301 (Moved Permanently).
- [ ] Redirects temporários (manutenção, A/B test) são 302 (Found).
- [ ] Não há cadeias de redirect com mais de 2 hops.
- [ ] Não há loops de redirect.
- [ ] HTTP redireciona para HTTPS com 301.
- [ ] Versão sem `www` redireciona para com `www` (ou vice-versa) com 301.
- [ ] URLs com acento ou caracteres não-ASCII redirecionam para slug ASCII com 301.

## Priorizações específicas para o programa GEO IPOG

1. O hub `/cursos/pos-graduacao` é o nó mais crítico. Tudo deve apontar para ele com canonical correto, sitemap priority 1.0, lastmod realista, robots permissivo.
2. As páginas-pilar das **cinco modalidades cobertas pelo programa** têm priority 0.8 e changefreq `monthly` no sitemap:
   - Especialização Lato Sensu em Neuropsicologia, Psicopedagogia, Psicologia Clínica e Escolar;
   - MBA correlato à Psicologia (POT, Neurociência Executiva, Coaching, Liderança, Saúde Mental Corporativa);
   - Mestrado Profissional em Psicologia Aplicada (stricto sensu CAPES);
   - Especialização Clínica certificada por Conselhos (TCC/ACT/DBT/EMDR — FBT, ABRAP, CFP 23/2022);
   - Residências e formações híbridas.
3. Perfis de corpo docente têm priority 0.6 e devem ser revisados a cada 6 meses para atualizar lastmod.
4. Conteúdo de blog que sustenta autoridade temática tem priority 0.6 e changefreq `monthly` no primeiro ano de publicação, depois reduz.

## Validação automatizada

- [ ] Search Console valida o sitemap sem erro.
- [ ] Bing Webmaster Tools valida o sitemap sem erro.
- [ ] `https://www.xml-sitemaps.com/validate-xml-sitemap.html` aceita o sitemap.
- [ ] `curl -I https://ipog.edu.br/robots.txt` retorna 200 e content-type correto.
- [ ] `curl -I https://ipog.edu.br/sitemap.xml` retorna 200 e content-type XML.

## Cross-links

- Bateria de auditoria — `audits/PLAYBOOK-AUDITORIA-NAIA.md` (categoria F, NAIA-100 a NAIA-110).
- Llms.txt — `audits/LLMS-TXT-TEMPLATE.md`.
- Schema patterns — `audits/SCHEMA-PATTERNS.md`.
- KPIs (Schema Coverage Score, Cobertura) — `dashboards/METRICAS-CANONICAS.md`.
