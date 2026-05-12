# Governança — projeto geo-ipog

Documentos canônicos sobre titularidade, ativos digitais, contas operacionais e regras de manuseio do programa GEO para IPOG.

## Conteúdo

| Tópico | Documento |
| --- | --- |
| Domínios registrados | [`dominios/`](dominios/README.md) |
| Conta no registrador (Cloudflare) | [`registrador-cloudflare.md`](registrador-cloudflare.md) |
| CI Cloudflare (token, secrets, workflow) | [`ci-cloudflare.md`](ci-cloudflare.md) |
| Frontend stack canônico (Astro + React + TS) | [`../engineering/frontend-stack.md`](../engineering/frontend-stack.md) |
| Catálogo de padrões de UI | [`../engineering/ui-patterns.md`](../engineering/ui-patterns.md) |
| SEO indexing canônico (GSC + IndexNow + sitemaps) | [`../engineering/seo-indexing.md`](../engineering/seo-indexing.md) |
| Google Analytics 4 + Data API + service account | [`google-analytics.md`](google-analytics.md) |
| ADR-0001 — escolha do stack frontend | [`../engineering/adr/0001-frontend-stack-astro-react-tailwind.md`](../engineering/adr/0001-frontend-stack-astro-react-tailwind.md) |

## Convenções

- Toda informação sensível (números completos de cartão, tokens, senhas, chaves privadas) fica **fora** deste repositório.
- Os arquivos aqui podem citar identificadores públicos ou semi-públicos (Account IDs, IANA IDs, últimos 4 dígitos de cartão), mas nunca o segredo bruto.
- Datas seguem o padrão ISO 8601 (`YYYY-MM-DD`) ou UTC completo (`YYYY-MM-DDTHH:MM:SSZ`) quando vindas do WHOIS.
- Razão social, CNPJ e endereço da pessoa jurídica titular seguem o Cartão CNPJ canônico emitido em 02/04/2026: BRGEO LTDA, CNPJ 66.051.295/0001-33, sede em Goiânia/GO.
