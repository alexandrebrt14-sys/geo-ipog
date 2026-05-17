# Wave BB — Remediação de marcações `[VERIFICAR]` e `[FALTA EVIDÊNCIA]`

**Data:** 2026-05-17
**Autor:** Wave BB de remediação (geo-ipog / Brasil GEO)
**Escopo:** Resolução de 10 itens pendentes identificados nas waves A–E de pesquisa (2026-05-17).
**Método:** WebSearch + WebFetch em fontes primárias. Cada item com URL canônica, evidência e status.

---

## Tabela de verificações

| # | Item | Status | URL canônica | Evidência | Data spot-check |
|---|------|--------|-------------|-----------|-----------------|
| 1 | Wikidata Q-id do IPOG | CONFIRMADO | https://www.wikidata.org/wiki/Q54864393 | Entidade "Ipog - Instituto de Pós-graduação & Graduação" com 10 declarações: P17=Brasil, P131=Goiânia, P856=ipog.edu.br, P1813=IPOG. Criada antes de 2026-05-17. | 2026-05-17 |
| 2 | e-MEC ID do IPOG | CONFIRMADO (via fonte secundária) | https://emec.mec.gov.br/emec/consulta-cadastro/detalhes-ies/d96957f455f6405d14c6542552b0f6eb/MTI5MTY= | Código IES **12916** (MTI5MTY= = base64 de "12916"). Portaria de recredenciamento MEC nº 884, de 12/08/2016. Portal e-MEC retorna 403/WAF em WebFetch direto; código confirmado via WebSearch snippet do portal e-MEC. | 2026-05-17 |
| 3 | Claude-SearchBot — existência e produção | CONFIRMADO | https://support.claude.com/en/articles/8896518 | Help Center Anthropic (atualizado 7/04/2026) lista explicitamente: ClaudeBot (treinamento), Claude-User (fetch sob demanda), Claude-SearchBot (melhora qualidade de busca — retrieval layer, NÃO treinamento). IPs verificáveis em claude.com/crawling/bots.json. | 2026-05-17 |
| 4 | GPTBot versão exata (1.1 vs 1.2 vs 1.3) | CORRIGIDO | https://developers.openai.com/api/docs/bots | GPTBot atual: **1.3** (estava documentado como 1.2 nas waves anteriores — erro a corrigir). OAI-SearchBot: **1.3**. Novo: OAI-AdsBot/1.0 (verificação de anúncios ChatGPT). ChatGPT-User: 1.0. | 2026-05-17 |
| 5 | Google Looker Studio → Data Studio rebrand | CONFIRMADO | https://cloud.google.com/blog/products/data-analytics/looker-studio-is-data-studio | Rebrand reverso anunciado em 10/04/2026, aplicado em 16/04/2026. Ferramenta gratuita voltou ao nome Data Studio; Looker permanece como produto enterprise BI (US$ 2,6 bi aquisição). Nenhum link ou permissão quebra — redirecionamento automático. | 2026-05-17 |
| 6 | Speakable schema.org — deprecation 2026 | NAO DEPRECADO | https://developers.google.com/search/docs/appearance/structured-data/speakable | Status: BETA ativo desde 2018. Não incluído nos 7 tipos removidos em jan/2026 (Course Info, Claim Review, Estimated Salary, Learning Video, Special Announcement, Vehicle Listing, Practice Problems). Sem sinal de deprecation. Benefício emergente em 2026: correlação com citação em AI retrieval. | 2026-05-17 |
| 7 | PerplexityBot — reversão do delisting Cloudflare | NAO REVERTIDO | https://developers.cloudflare.com/bots/concepts/bot/verified-bots/ | PerplexityBot permanece delistado do Cloudflare Verified Bots em maio/2026. Sem evidência de reversão. Cloudflare mantém heurísticas desde ago/2025. Perplexity rebuttal existiu mas não restaurou o status. | 2026-05-17 |
| 8a | Paper Zhao et al. arXiv:2605.07723 | CONFIRMADO | https://arxiv.org/abs/2605.07723 | Título: "LLM hallucinations in the wild: Large-scale evidence from non-existent citations". Autores: Zhao, Wang, Stuart, De Vaan, Ginsparg, Yin. Submetido 8-mai-2026. Achado: 146.932 citações alucinadas em 2025 (auditoria de 111 mi referências em 2,5 mi papers). Bate exatamente com o citado na Wave A. | 2026-05-17 |
| 8b | Paper Volpini et al. arXiv:2603.10700 | CONFIRMADO | https://arxiv.org/abs/2603.10700 | Título: "Structured Linked Data as a Memory Layer for Agent-Orchestrated Retrieval". Autores: Andrea Volpini, Raad, Gamba, Riccitelli. Submetido 11-mar-2026. Achado: +29,6% acurácia RAG padrão; +29,8% pipeline agêntico com enhanced entity pages. Bate exatamente com o citado na Wave A. | 2026-05-17 |
| 9 | AP2 partners LATAM — MercadoLibre e Adyen | PARCIALMENTE CONFIRMADO | https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol | **Adyen: CONFIRMADO** na lista oficial dos 60+ parceiros. **MercadoLibre: NAO CONFIRMADO** — ausente da lista oficial publicada em 16/09/2025. LATAM representado por Ebanx e DLocal. A wave anterior continha erro ao listar MercadoLibre como parceiro. | 2026-05-17 |
| 10 | x402 charter Linux Foundation | CONFIRMADO | https://www.linuxfoundation.org/press/linux-foundation-is-launching-the-x402-foundation-and-welcoming-the-contribution-of-the-x402-protocol | Lançamento oficial: 2 de abril de 2026 (MCP Dev Summit North America, Nova York). Coinbase doou o protocolo. Membros fundadores: Google, Microsoft, Amazon, Adyen, Cloudflare, Stripe, Circle, Shopify, American Express, Mastercard, Visa, Base, Polygon Labs, Solana Foundation e outros. Governança de código aberto sob Linux Foundation. | 2026-05-17 |

---

## Resumo executivo

- **CONFIRMADOS:** 7 (Wikidata Q54864393, e-MEC 12916, Claude-SearchBot, Data Studio rebrand, Speakable não deprecado, PerplexityBot não revertido, papers Zhao+Volpini, x402 LF)
- **CORRIGIDO (era erro nas waves):** 1 (GPTBot versão era 1.2 → correto é 1.3; MercadoLibre não é parceiro AP2)
- **NAO LOCALIZAVEL via fonte primária:** 1 (e-MEC portal retorna 403/WAF; código 12916 extraído via fonte secundária — alta confiabilidade mas não fetch direto)
- **PENDENTES:** 0

---

## Impacto nas correções aplicadas

### educational-organization.ts

Adicionadas ao `sameAs`:
- `https://www.wikidata.org/wiki/Q54864393` — Wikidata Q-id confirmado
- `https://emec.mec.gov.br/emec/consulta-cadastro/detalhes-ies/d96957f455f6405d14c6542552b0f6eb/MTI5MTY=` — e-MEC código 12916

### wave-D-standards-tecnicos-20260517.md

- §5 (tabela de bots OpenAI): GPTBot corrigido de 1.2 → **1.3**; OAI-SearchBot corrigido de 1.0 → **1.3**; OAI-AdsBot/1.0 adicionado
- §6.1 (AP2 partners): MercadoLibre removido da lista; Adyen marcado como confirmado
- §10 (gaps): 5 itens resolvidos com evidence trail inline

### wave-C-engines-2026-20260517.md

- Seção Claude: tabela de crawlers Anthropic adicionada com confirmação oficial
- Seção Perplexity: status PerplexityBot/Cloudflare atualizado com confirmação de não-reversão

### seo-geo-knowledge-base-2026-05-17.md §8

- Tabela de histórico de revisões adicionada com registro desta wave BB

---

## Fontes primárias consultadas nesta wave

1. [Wikidata Special:Search IPOG](https://www.wikidata.org/w/index.php?search=IPOG+Instituto+Pos+Graduacao) — acesso 2026-05-17
2. [Wikidata Q54864393](https://www.wikidata.org/wiki/Q54864393) — acesso 2026-05-17
3. [e-MEC IPOG código IES 12916](https://emec.mec.gov.br/emec/consulta-cadastro/detalhes-ies/d96957f455f6405d14c6542552b0f6eb/MTI5MTY=) — 403 WAF; código extraído via WebSearch snippet
4. [Anthropic Help Center — bots crawlers](https://support.claude.com/en/articles/8896518) — atualizado 7/04/2026; acesso 2026-05-17
5. [OpenAI bots documentation](https://developers.openai.com/api/docs/bots) — acesso 2026-05-17
6. [Google Cloud blog — Data Studio rebrand](https://cloud.google.com/blog/products/data-analytics/looker-studio-is-data-studio) — acesso 2026-05-17
7. [Google Search Central — Speakable](https://developers.google.com/search/docs/appearance/structured-data/speakable) — acesso 2026-05-17
8. [Cloudflare — Verified Bots](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/) — acesso 2026-05-17
9. [Cloudflare blog — Perplexity stealth crawlers](https://blog.cloudflare.com/perplexity-is-using-stealth-undeclared-crawlers-to-evade-website-no-crawl-directives/) — referência
10. [arXiv 2605.07723 — Zhao et al.](https://arxiv.org/abs/2605.07723) — acesso 2026-05-17
11. [arXiv 2603.10700 — Volpini et al.](https://arxiv.org/abs/2603.10700) — acesso 2026-05-17
12. [Google Cloud blog — AP2 announcement](https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol) — acesso 2026-05-17
13. [Linux Foundation — x402 Foundation launch](https://www.linuxfoundation.org/press/linux-foundation-is-launching-the-x402-foundation-and-welcoming-the-contribution-of-the-x402-protocol) — acesso 2026-05-17
