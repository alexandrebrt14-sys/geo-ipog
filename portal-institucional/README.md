# Portal GEO IPOG

> Este portal vive em `portal-institucional/`, com `package.json` e ciclo de
> build próprios, separados do projeto Astro em `site/`.
>
> **Onde ele é publicado.** A produção é
> <https://posgraduacaopsicologia.com/ipog/>. O workflow
> `deploy-cloudflare-pages.yml` constrói este portal com
> `NEXT_PUBLIC_BASE_PATH=/ipog` e copia o `out/` para dentro do artefato do site
> Astro, então os dois saem no mesmo projeto Cloudflare e no mesmo domínio.
>
> O workflow `deploy-portal-geo.yml` continua publicando em
> <https://geo-ipog.pages.dev>, agora como **espelho** de conferência, servido na
> raiz e sem `basePath`. As duas cópias declaram a mesma URL canônica, a de
> produção, porque `site.url` em `src/lib/site.ts` é fixo. Um push que toque
> `portal-institucional/` dispara os dois workflows.
>
> **Ao mexer em arquivo de `public/`:** o `basePath` do Next reescreve `<Link>` e
> rotas, mas não caminho escrito como string, e `next/image` também não reescreve
> porque o otimizador está desligado. Use o helper `assetPath` de
> `@/lib/site`, senão o arquivo sai apontando para a raiz do site anfitrião.
>
> **Ao usar cor de marca como cor de texto:** passe por `corDeTextoAcessivel`,
> de `@/lib/cor`. As cores claras da paleta não alcançam os 4,5:1 que a WCAG 2.2
> AA exige, e o helper escurece o tom sem trocar o matiz, deixando a cor original
> na borda e no preenchimento. `npm run verificar:contraste` mede o HTML
> exportado e falha o build se alguma combinação ficar abaixo do mínimo.
>
> **Tema claro e escuro.** As cores vivem em OKLCH, e o tema escuro reescreve só
> os tokens semânticos e a rampa neutra em `globals.css`, num bloco só. As
> rampas da marca não se movem: vermelho da marca é vermelho da marca nos dois
> temas. Ao acrescentar cor nova, use os tokens de papel (`--surface`, `--ink`,
> `--acento`, `--acento-tenue`) em vez de `bg-white` ou de um degrau fixo da
> rampa, senão a tela fica presa em um tema.
>
> A escolha de tema é compartilhada com o site anfitrião: mesma origem, mesma
> chave `pp-theme` no `localStorage`, mesmo atributo `data-theme`. Quem escolhe
> escuro no site chega ao portal já no escuro.
>
> **Ao publicar endereço de terceiro,** a fonte é o site que publica o link, e
> não o documento que descreve o serviço. O portal já publicou por meses
> `www.ipogmais.ipog.edu.br` como "Portal Financeiro": esse host não resolve, e
> o endereço veio do Manual do Aluno 2026, que traz o `www.` indevido e chama de
> "Portal do Aluno – Financeiro" o que a leitura quebrou em dois portais. Quem
> publica o link que funciona é o ipog.edu.br. `npm run verificar:enderecos`
> agora reprova o build se algum endereço publicado não responder.
>
> **Ao criar uma rota nova:** crie também um `opengraph-image.tsx` ao lado do
> `page.tsx`, copiando o de qualquer rota existente e trocando título e etiqueta.
> Sem ele a rota herda a imagem do segmento acima e o link compartilhado mostra
> o assunto errado. O desenho comum fica em `@/lib/og`.

Portal de conhecimento e otimização GEO do IPOG. Reúne os dados institucionais da
instituição em uma base estruturada para consulta humana e, principalmente, para
extração por motores de busca generativos, como ChatGPT, Perplexity, Gemini e
SearchGPT.

O projeto é modular por construção: o conteúdo vive em módulos de dados tipados,
a apresentação vive em componentes isolados, e a casca visual pode ser trocada
sem tocar no conteúdo. Isso permite acoplar o portal ao site novo do IPOG depois.

---

## Como executar

Todos os comandos rodam a partir desta pasta, e não da raiz do repositório:

```bash
cd portal-institucional

npm install     # instala as dependências
npm run dev     # ambiente de desenvolvimento em http://localhost:3000
npm run build   # gera o site estático em out/
npm start       # serve o build de out/ para conferência local
```

### Verificações

```bash
npm run typecheck       # checagem de tipos do TypeScript
npm run lint            # ESLint com as regras do Next
npm run verificar:geo   # auditoria de GEO e SEO sobre o HTML já exportado
npm run verificar:contraste  # contraste WCAG 2.2 AA nos temas claro e escuro
npm run verificar:enderecos  # todo endereco externo publicado responde
npm run validar         # roda tudo na ordem: tipos, lint, build e auditoria
```

`npm run verificar:geo` precisa de um build feito antes, porque a auditoria roda
sobre os arquivos de `out/`, e não sobre o código-fonte. Ela é a checagem mais
importante do projeto: confere no HTML entregue ao crawler que o JSON-LD é
válido, que cada rota tem exatamente um `h1`, que os elementos semânticos e os
metadados sociais estão presentes, e que o conteúdo aparece sem depender de
JavaScript.

---

## Arquitetura

```
src/
├── app/                      Rotas (App Router), uma pasta por rota
│   ├── layout.tsx            Casca, fontes, metadados globais e JSON-LD raiz
│   ├── page.tsx              Home do portal
│   ├── areas-de-conhecimento/
│   ├── metodo/
│   ├── autoridade/
│   ├── faq/
│   ├── sobre/
│   ├── not-found.tsx         Página 404, marcada como noindex
│   ├── robots.ts             Gera o robots.txt
│   ├── sitemap.ts            Gera o sitemap.xml
│   └── globals.css           Tokens de design e estilos base
├── components/               Componentes isolados e reutilizáveis
│   ├── Layout.tsx            Container, Section, PageHeader, Card, DataTable…
│   ├── Header.tsx            Cabeçalho com navegação responsiva
│   ├── Footer.tsx            Rodapé institucional
│   ├── Cards.tsx             Cartões de indicador, área e conteúdo
│   ├── FaqList.tsx           Lista de perguntas frequentes
│   ├── JsonLd.tsx            Injeta dados estruturados no HTML
│   └── Logo.tsx              Marca em SVG
├── data/                     Conteúdo, separado da apresentação
│   ├── institucional.ts      Instituição, indicadores, valores, contatos
│   ├── areas.ts              Áreas de conhecimento, cursos e modalidades
│   ├── metodo.ts             Método IPOG e regras acadêmicas
│   ├── faq.ts                Perguntas frequentes
│   └── geo.ts                Princípios de GEO, fontes e credenciais
├── lib/
│   ├── site.ts               Configuração central: domínio, rotas, navegação
│   ├── seo.ts                Construção padronizada dos metadados de rota
│   └── jsonld.ts             Construtores de schemas Schema.org
└── scripts/
    └── verificar-geo.mjs     Auditoria de GEO e SEO pós-build
```

**Regra que organiza tudo:** conteúdo em `data/`, apresentação em `components/`,
configuração em `lib/`. Nenhuma página escreve texto institucional direto no JSX,
com exceção do texto institucional oficial na rota `/sobre`, que é citação literal.
É por isso que o mesmo indicador aparece idêntico em todas as rotas.

---

## Rotas

| Rota | O que concentra |
| --- | --- |
| `/` | Visão geral do IPOG, indicadores, frentes de atuação, áreas e princípios de GEO |
| `/areas-de-conhecimento` | 6 áreas e 82 cursos catalogados, com nível e modalidades |
| `/metodo` | Dimensões do Método IPOG, ciclo de aprendizagem, formato das aulas e regras acadêmicas |
| `/autoridade` | Credenciais da instituição, fontes de conhecimento e schemas implementados |
| `/faq` | 20 perguntas frequentes, organizadas em 5 categorias |
| `/sobre` | História, propósito, visão, valores, arquétipos e canais de atendimento |

---

## O que foi implementado

### Identidade visual

Os tokens de design em `globals.css` reproduzem a paleta oficial do **Guia de
Expressão da Marca IPOG 2025**, extraída do repositório institucional
(`docs/marca/identidade-visual.md`):

| Cor | HEX | Papel no portal |
| --- | --- | --- |
| Vermelho Protagonismo | `#D71C37` | Cor de ação: botões, links, números em destaque |
| Vermelho Excelência | `#8A212E` | Área de Direito, apoio |
| Vinho Determinação | `#481A1F` | Área de Comportamento e Educação |
| Azul Digital | `#0C1A36` | Superfície institucional escura: cabeçalho, rodapé, hero |
| Azul Precisão | `#113A78` | Área de Saúde |
| Cinza Inteligente | `#363636` | Área de Engenharia |
| Verde Vital | `#05A48C` | Área de Tecnologia |
| Amarelo Estratégico | `#F3AD39` | Área de Gestão |
| Cinza Conexão | `#7F7F7F` | Bordas e elementos decorativos |
| Branco Essencial | `#FFFFFF` | Superfície principal |

> **Observação sobre o briefing.** O pedido descrevia a paleta do IPOG como
> azul-marinho com acentos em azul claro. A paleta oficial de 2025 é
> **vermelha**: o guia registra que os tons de laranja e salmão foram removidos e
> que novos matizes de vermelho e vinho foram introduzidos. Como a instrução era
> usar rigorosamente a paleta do IPOG e extrair os valores exatos dos ativos da
> marca, o portal segue o guia oficial. O azul institucional pedido está
> contemplado pelo **Azul Digital `#0C1A36`**, que é a cor complementar do
> próprio guia e sustenta toda a superfície escura do portal, com o vermelho
> aplicado como cor de ação. Se a preferência for inverter essa relação, a troca
> é feita apenas nos tokens de `globals.css`.

**Tipografia.** O guia define Degular e Barlow. Degular é licenciada da Oh No Type
e não é distribuída pelo Google Fonts, então o portal usa **Barlow Condensed**
para títulos em caixa alta e **Barlow** para corpo de texto, que é exatamente a
combinação que o guia especifica para a vertical Pós-Graduação. Para adicionar
Degular depois, basta registrá-la em `layout.tsx` com `next/font/local`.

**Contraste.** Todos os pares de cor de texto foram auditados contra o WCAG AA.
O Cinza Conexão `#7F7F7F` atinge 4,00:1 sobre branco, abaixo do mínimo de 4,5:1,
então ficou restrito a bordas e decoração: textos auxiliares usam `conexao-600`
(5,99:1) ou `conexao-700` (8,42:1).

### Responsividade

Construída mobile-first, com layouts em Flexbox e Grid e escala tipográfica
fluida em `clamp()`, que dispensa saltos bruscos entre breakpoints.

- Navegação em painel no mobile, com `aria-expanded`, `aria-controls`, fechamento
  por `Esc`, devolução de foco ao botão e trava de rolagem do corpo.
- Tabelas largas rolam horizontalmente dentro do próprio contêiner, sem que a
  página ganhe rolagem lateral. A tabela é preservada como tabela, em vez de
  virar cartões no mobile, porque é a estrutura `thead`/`tbody` que torna o dado
  extraível por LLM.
- Alvos de toque com altura mínima confortável e estados visíveis de hover, focus
  e active em todos os elementos interativos.
- Verificado sem overflow horizontal em **6 rotas × 5 larguras** (320, 360, 390,
  768 e 1024 px), com a navegação correta em cada faixa.

### GEO e SEO

**HTML semântico.** `header`, `main`, `article`, `section`, `footer` e `nav`, com
exatamente um `h1` por rota e hierarquia de títulos sem saltos. Cada `section`
tem `id` e `aria-labelledby`, o que dá ao motor um endereço estável para citar
cada bloco.

**Dados estruturados JSON-LD:**

| Schema | Onde | O que comunica |
| --- | --- | --- |
| `EducationalOrganization` | Layout raiz | Instituição, fundação, localização, contatos e conceito MEC |
| `WebSite` | Layout raiz | O portal como obra própria, com idioma e editor |
| `WebPage` | Cada rota | Descrição da página, vinculada à organização por `@id` |
| `BreadcrumbList` | Cada rota | Posição na hierarquia, espelhando a trilha visível |
| `Course` + `CourseInstance` | `/areas-de-conhecimento` | Cursos com nível, provedor e modalidade de oferta |
| `ItemList` | `/areas-de-conhecimento` | Catálogo completo como lista ordenada |
| `FAQPage` + `Question` | `/faq` | 20 perguntas com resposta aceita e âncora própria |

A organização é declarada **uma única vez**, no layout, e referenciada por `@id`
nas demais rotas. Assim os motores consolidam tudo em uma entidade IPOG, em vez
de tratarem cada rota como uma organização diferente.

**Metadados.** OpenGraph completo, Twitter Card `summary_large_image`, imagem
social em SVG, URL canônica por rota, `robots.txt` com liberação explícita dos
crawlers generativos e `sitemap.xml` gerado a partir da lista única de rotas.

**Redação para extração.** Cada resposta do FAQ é autossuficiente: repete o
sujeito e traz o dado completo, para poder ser citada sem o resto da página. As
perguntas usam `details`/`summary` nativos justamente porque o texto permanece no
HTML mesmo com o item fechado, ao contrário de um acordeão que só monta o
conteúdo após o clique.

**Export estático.** O build gera HTML puro. Todo o conteúdo, inclusive os blocos
JSON-LD, está no documento inicial, sem depender de hidratação do React.

---

## Fonte dos dados

Todo o conteúdo é derivado do repositório institucional
[`ipogbrasil/ipog`](https://github.com/ipogbrasil/ipog):

| Documento | Alimenta |
| --- | --- |
| `docs/institucional/sobre-o-ipog.md` | Texto institucional e indicadores |
| `docs/institucional/canais-de-atendimento.md` | Telefones, e-mails, horários e portais |
| `docs/aluno/metodo-ipog.md` | Dimensões do método e ciclo de aprendizagem |
| `docs/aluno/manual-do-aluno-pos-graduacao.md` | Regras acadêmicas, TCC, certificação e IPOGMAIS |
| `docs/marca/plataforma-de-marca.md` | Propósito, visão, valores, arquétipos e tagline |
| `docs/marca/identidade-visual.md` | Paleta e tipografia |
| `documentos-ipog/projetos-de-curso/` | Catálogo de cursos por área e modalidade |

### Ressalvas de dados

Estas ressalvas vêm do próprio repositório institucional e estão sinalizadas
também nas páginas, em vez de silenciadas:

- **Número de alunos.** O texto institucional traz "mais de 350 mil" e o Guia de
  Expressão da Marca 2025 traz "mais de 300 mil". O portal adota o dado mais
  recente. Antes de usar qualquer indicador em peça pública, confirme com a área
  responsável, porque dado de instituição de ensino tem implicação regulatória.
- **Dimensões do Método IPOG.** O Manual do Aluno afirma que o método tem três
  dimensões, mas nomeia apenas duas no texto extraível. A terceira aparece só no
  infográfico, sem camada de texto. O portal publica as duas documentadas e
  registra a pendência.
- **Catálogo de cursos.** É uma fotografia do acervo de projetos pedagógicos, não
  a oferta comercial vigente. Turmas com matrícula aberta ficam em ipog.edu.br.
- **Logotipo.** `Logo.tsx` é uma reprodução tipográfica feita para o portal. Ao
  integrar ao site novo, substitua pelo SVG oficial do Marketing.

---

## Integração com o site novo do IPOG

O portal foi construído para ser acoplado, não reescrito:

1. **Domínio e rotas.** Ajuste `site.url` em `src/lib/site.ts`. Sitemap, URLs
   canônicas e identificadores JSON-LD derivam daí e se atualizam juntos.
2. **Conteúdo.** Os módulos em `src/data/` são objetos tipados. Trocar a origem
   por uma API ou CMS significa manter o mesmo formato de retorno, sem mexer nos
   componentes.
3. **Casca visual.** `Header`, `Footer` e as primitivas de `Layout.tsx` podem ser
   substituídas pelos componentes do site novo. As páginas consomem apenas essas
   primitivas.
4. **Tokens.** Toda a identidade está em `@theme` no `globals.css`. Alinhar com o
   design system do site novo é trocar valores nesse bloco.
5. **Tipografia.** Adicione Degular via `next/font/local` em `layout.tsx` e
   aponte `--font-display` para ela.

---

## Stack

Next.js 16 (App Router, export estático) · React 19 · TypeScript em modo estrito ·
Tailwind CSS 4 com tokens via `@theme` · ESLint com a configuração do Next.
