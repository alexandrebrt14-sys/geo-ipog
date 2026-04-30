# Framework Conceitual de GEO — Rotinas, Missões e Tarefas Recorrentes (vertical Educação Superior)

Este documento consolida o estado conceitual atualizado das práticas de Generative Engine Optimization aplicáveis a uma instituição de ensino superior brasileira que busca presença, fidelidade de citação e share-of-voice em respostas de motores generativos. O framework é genérico em método, mas as ilustrações estão calibradas para o recorte do programa GEO IPOG: pós-graduação online em Psicologia.

---

## 1. Premissa fundamental

GEO não é "SEO para LLMs". É a disciplina de fazer com que o conteúdo, os sinais técnicos e a autoridade externa de uma instituição sejam **citáveis, atribuíveis e recuperáveis** por motores generativos em respostas a prompts onde a marca deveria aparecer. As três alavancas operam em paralelo:

1. **Conteúdo editorial denso e estruturado** (com elementos extraíveis: definições, listas, FAQs, passos, dados, comparativos, tabelas de carga horária e formato).
2. **Sinais técnicos de descobribilidade** (Schema.org, llms.txt, sitemaps, structured data, metadata, especialmente os tipos `EducationalOrganization`, `Course`, `EducationalOccupationalProgram`, `Person`).
3. **Autoridade externa** (citações em mídia educacional tier 1, fontes regulatórias como MEC e CFP, Wikipedia, periódicos acadêmicos, rankings e diretórios de pós-graduação, knowledge graph signals).

Mudar apenas um vetor não move o ponteiro de presença em LLMs. Os três precisam evoluir em sincronia.

---

## 2. Como motores generativos respondem

Modelos generativos compõem respostas a partir de três fontes que precisam ser tratadas independentemente:

| Fonte | Características | Implicação para GEO IPOG |
|---|---|---|
| **Pesos paramétricos** (corpus de treinamento) | Cutoff temporal de meses a anos atrás. Frozen em cada versão de modelo. | Mover este vetor exige presença em mídia educacional, MEC, CFP, Wikipedia e rankings que entrem no próximo corte. Horizonte: meses. |
| **Browsing / RAG ao vivo** | Provedores que consultam web em tempo real (Perplexity, ChatGPT search, Gemini com browsing, Claude com web search). | Sinais técnicos novos (Schema, llms.txt, conteúdo) podem ser absorvidos em dias a semanas. |
| **Tool use estruturado** | Modelos invocam ferramentas (busca, APIs, knowledge bases) e citam fragmentos. | Conteúdo precisa estar em formato extraível: FAQs, listas comparativas, tabelas de carga horária, blockquotes com tese, definições marcadas com Schema. |

A consequência prática é que **não existe ganho instantâneo de presença em LLMs por mudar somente o site IPOG**. O plano de trabalho opera nas três fontes simultaneamente, com expectativa de horizonte distinto para cada.

---

## 3. Rotinas obrigatórias para um programa GEO em educação superior

### 3.1 Rotina diária (automatizável)

- **Coleta de citações em LLMs cohort.** Bateria de queries canônicas executada contra um conjunto fixo de modelos (mínimo 5 provedores, com pelo menos um RAG-native — Perplexity é cohort obrigatório). Cada execução grava resposta, modelo, versão, timestamp e hash da resposta.
- **Cache idempotente** com SHA-256 do par `(provider, model, query)` para evitar reprocessamento de respostas estáveis.
- **Validação fail-loud:** se qualquer provedor obrigatório falhar (rate limit, deprecação, erro de auth), o pipeline interrompe e alerta. Coleta parcial silenciosa desbalanceia o N e contamina análise temporal.
- **Drift detection:** comparação de hash de respostas para o mesmo prompt ao longo do tempo. Alteração de distribuição de hashes é sinal de que o provedor atualizou modelo silenciosamente.
- **Logging estruturado** em JSONL para auditoria posterior.

### 3.2 Rotina semanal

- **Relatório de variação de mention rate** por persona, cluster semântico (organizacional / clínica-neuro-TCC-avaliação / psicopedagogia-escolar) e LLM.
- **Triagem de respostas degradadas** (perda de menção do IPOG, citação errada, alucinação favorável a concorrente massivo).
- **Auditoria de novos posts publicados** quanto a Schema, FAQ markup, autoria nominal e profundidade.
- **Health-check técnico de `ipog.edu.br`:** robots, sitemaps de cursos, llms.txt, redirects, canonicals, broken links, structured data validator, fichas de curso íntegras.
- **Top queries do GSC vs. baseline esperado** para identificar deriva entre o que se busca e o que se ranqueia, com leitura específica para queries de matrícula (decisão final).

### 3.3 Rotina quinzenal

- **Snapshot quantitativo de share-of-voice** entre IPOG e concorrentes diretos por prompt-âncora nos três clusters semânticos.
- **Delta analysis pré/pós ondas editoriais ou releases técnicos** (causa-efeito atribuível a mudanças concretas no programa).
- **Review do plano editorial da onda seguinte** com base em gaps detectados.

### 3.4 Rotina mensal

- **Recalibração do kit de prompts-âncora** com adição/aposentadoria de queries baseadas em deriva semântica de mercado (novas categorias emergentes — saúde mental corporativa, neuropsicologia infantil, psicologia do esporte, etc.).
- **Auditoria de autoridade externa:** novas menções em mídia educacional, Wikipedia diffs, fichas em diretórios de pós (Estadão, Folha, Quero Bolsa, Gama Academy, Educa Mais Brasil), CFP, ABEP, ABRAPSO, periódicos acadêmicos.
- **Revisão executiva** com Ronan Maia apresentando: variação de mention rate, gaps fechados, fechamentos pendentes, plano da onda seguinte, decisão de expansão de escopo para outras áreas IPOG.
- **Atualização do dashboard ao vivo** com séries temporais por LLM, persona, cluster e cohort de modelo.

### 3.5 Rotina trimestral

- **Full-grid prompt sensitivity:** rotacionar 5 paráfrases de cada prompt-âncora por uma semana para medir variância induzida pelo prompt vs. variância induzida pela marca. Estabelece banda de ruído.
- **Cohort expansion:** adicionar modelos novos ou atualizar versões pinadas conforme mercado evolui. Manter registro versionado dos cohorts.
- **Recalibração da matriz de concorrentes** conforme dinâmica de mercado (novos players EAD, fusões de instituições, lançamentos de produto).
- **Revisão da metodologia** (limites de coleta, vieses descobertos, novos vetores).

### 3.6 Rotina semestral

- **Expansão das categorias semânticas** monitoradas, com avaliação de incluir novas verticais IPOG (engenharia, gestão, direito, saúde, contabilidade, educação) caso o programa expanda além do recorte de Psicologia.
- **Power analysis revisitada:** o N atual permite detectar o efeito mínimo desejado? Se não, aumentar volume ou ajustar MDE.
- **Auditoria editorial completa** do hub: o que está performando, o que envelheceu, o que precisa ser despublicado ou consolidado, o que precisa ser migrado para autoria nominal.

---

## 4. Missões estruturais (não recorrentes, mas indispensáveis)

### 4.1 Missão técnica de descobribilidade

- Implementar `llms.txt` em `ipog.edu.br` declarando posicionamento institucional, hub central de cursos (`/cursos/pos-graduacao`), prioridades de citação e contato canônico.
- Atualizar `Organization` Schema para `EducationalOrganization` com `accreditation` (autorização MEC, e-MEC), `sameAs` apontando para perfis verificados (Wikipedia, LinkedIn Company, e-MEC, perfis em conselhos profissionais quando aplicável), `award`, `memberOf`, `numberOfStudents`, `foundingDate`.
- Garantir cobertura de Schema por tipo de página: `Course` em fichas de curso, `EducationalOccupationalProgram` em programas de pós-graduação, `FAQPage` em conteúdo Q&A, `HowTo` em guias procedurais (como matricular, como solicitar certificado), `Article` em peças editoriais, `Person` para corpo docente com `hasCredential`, `worksFor`, `sameAs` para perfis acadêmicos verificáveis.
- Resolver conflitos de sitemap (múltiplos geradores ativos) consolidando em uma única árvore canônica que cubra cursos, blog e páginas institucionais.
- Validar `robots.txt` permitindo crawlers de LLM relevantes (com avaliação de risco vs. benefício caso a caso, respeitando posicionamento jurídico IPOG).

### 4.2 Missão de engenharia de citação

- Construir kit canônico de **50 a 75 prompts-âncora** cobrindo o ciclo descoberta → comparação → decisão de matrícula → pós-matrícula, segmentado por persona e por cluster semântico.
- Definir, para cada prompt, a **resposta-alvo** (a resposta ideal que o IPOG deveria receber) com fragmentos curtos, citáveis, com dados, números e nomes próprios — modelos generativos preferem extrair afirmações verificáveis. Para curso de pós: nome, carga horária, formato, autorização MEC, duração, corpo docente nominal e diferencial metodológico.
- Classificar cada gap quanto à alavanca dominante de fechamento (conteúdo, Schema, autoridade externa, todas).

### 4.3 Missão editorial

- Definir hub central de conteúdo editorial vinculado ao hub de cursos.
- Estabelecer padrão editorial denso (abertura-impacto, tese contraintuitiva, evidência, mecanismo, decisão pessoal, próximo passo).
- Publicar peças com 1.500 a 4.000 palavras quando o tema for de tese ou guia profundo, com tabelas comparativas (formato, carga horária, mensalidade, certificação), blockquotes para insights centrais, sub-headings frequentes, listas estruturadas.
- Migrar autoria genérica ("Equipe IPOG") para autoria nominal com perfis públicos do corpo docente, credenciais visíveis (Lattes, ORCID, registro CFP quando aplicável) e Schema `Person` completo.
- Operar série editorial signature do IPOG com tese reconhecível, recorrência e selo visual.

### 4.4 Missão de autoridade externa

- Mapear veículos de mídia tier 1 do setor educacional brasileiro relevantes para citation engineering: Estadão Educação, Folha, Quero Bolsa, Gama Academy, Educa Mais Brasil, Você S/A, Exame, Valor Econômico, Folha Equilíbrio.
- Mapear fontes regulatórias e setoriais de Psicologia: Conselho Federal de Psicologia (CFP), Conselhos Regionais, ABEP, ABRAPSO, periódicos científicos brasileiros (Psicologia: Ciência e Profissão, Estudos de Psicologia, Trends in Psychology).
- Atualizar a página da instituição em Wikipedia (quando elegível, seguindo regras editoriais) e contribuir com fontes secundárias citáveis.
- Manter perfis em rankings e diretórios de pós-graduação (Quero Bolsa, Educa Mais Brasil, Plataforma e-MEC).
- Cultivar relacionamento com analistas e pesquisadores que produzem material citável (relatórios de mercado de educação superior, pesquisas de retorno de pós, estudos de empregabilidade por área).

---

## 5. Arquitetura de medição

### 5.1 Stack canônica

| Camada | Função | Papel no GEO IPOG |
|---|---|---|
| Captura comportamental | Eventos de site e conteúdo | GA4 com Consent Mode v2 (LGPD) |
| Captura SERP | Performance em motores de busca tradicionais | Google Search Console |
| Captura LLM | Coleta sistemática de respostas em modelos | Pipeline NAIA + cohort de prompts e modelos |
| Persistência | Armazenamento temporal versionado | Banco relacional + warehouse para séries longas |
| Atribuição | Persistência de identificadores cross-touchpoint | sessionStorage + hidden fields + servidor |
| Privacidade | Consent Mode v2, deduplicação | Banner antes de qualquer tag, persistência de escolha |

### 5.2 Princípios não negociáveis

- **Consent ANTES de tags.** Default `denied` para `ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`. Banner persistido em local storage. `wait_for_update` mínimo de 500 ms.
- **Cross-domain linker** quando a jornada cruza domínios (hub editorial → site institucional → checkout/matrícula).
- **Deduplicação** de eventos macro (1x por sessão para `generate_lead`, `sign_up`, evento de matrícula).
- **Server-side tagging** (Measurement Protocol) para reduzir perda por adblockers no funil de matrícula.
- **Enhanced conversions** com hash SHA-256 de identificadores (e-mail, telefone) para reconciliação cross-channel.
- **Shapes versionados:** qualquer mudança em endpoints internos que alimentam dashboards quebra dashboards. Alterações precisam ser tratadas como contrato.

### 5.3 Eventos canônicos

- Padrão GA4 recommended onde possível: `page_view`, `scroll`, `view_item` (página de curso), `select_item` (clique em CTA de matrícula), `view_promotion`, `select_promotion`, `begin_checkout` (início de processo de matrícula), `generate_lead`, `sign_up`, `purchase` (matrícula confirmada).
- Custom obrigatórios: `cta_click` com `cta_label`, `course_view` com `course_id` e `course_area`, `faq_open` com `question`, `format_select` para tabs de formato (Ao Vivo / EAD / Presencial), `persona_select` para tabs de persona quando aplicável.
- Custom dimensions event-scoped que precisam ser declarados em UI: `cta_label`, `course_id`, `course_area`, `course_format`, `persona`, `lead_source`, `depth`.

### 5.4 Audiências mínimas

- **Visitantes 30 dias** do hub de pós-graduação (base de remarketing).
- **Engajados sem conversão** (scroll ≥ 75% sem `generate_lead` em página de curso).
- **CTA click sem conversão de matrícula.**
- **Convertidos 30 dias** (matrículas para seed de lookalike).
- **Tráfego originado em referrers de LLM** (segmentação via `document.referrer` e UTM dedicada para campanhas de PR).

---

## 6. Ontologia e crosslink semântico

A presença em LLMs depende de a instituição estar conectada semanticamente em três planos: identidade institucional (`EducationalOrganization`), oferta de produto (`Course`, `EducationalOccupationalProgram`), e pessoas (`Person` para corpo docente nominal). Os três planos precisam estar tecnicamente interligados via Schema, narrativamente interligados via conteúdo HBR, e externamente interligados via rankings, mídia e fontes regulatórias.

A consequência prática para o programa GEO IPOG: cada peça de Schema, cada artigo HBR e cada ação de PR deve fortalecer um ou mais nós dessa rede e, sempre que possível, criar uma nova aresta. Edges criadas valem mais que nodes adicionados isoladamente.
