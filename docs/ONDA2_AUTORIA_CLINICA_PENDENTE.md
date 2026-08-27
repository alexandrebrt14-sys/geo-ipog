# Onda 2: pendência de autoria clínica (YMYL) nos guias

Data: 27/08/2026. Branch `feat/onda2-entidade-unica` (empilhada sobre o PR #157).

## Situação

O diretório `site/src/pages/guias/` tem 35 guias clínicos (protocolos de avaliação, manejo e intervenção). Hoje 29 deles declaram `author` como Alexandre Caramaschi, que não é psicólogo, e 6 declaram `author` como a Organization Brasil GEO. Nenhum guia declara `reviewedBy`. Para conteúdo YMYL de saúde, a expectativa de E-E-A-T é autoria ou revisão por profissional habilitado, com credencial verificável.

A única psicóloga do portal com Person canônico é Larissa Caramaschi (`site/src/lib/schemas/person-larissa.ts`). O `hasCredential` dela declara "Registro ativo no Conselho Regional de Psicologia" sem número de CRP, e o Person não tem Lattes nem ORCID. Sem esses identificadores, trocar a autoria apenas move o problema: o extrator continua sem como verificar a credencial.

**Decisão do dono do repositório: a reatribuição de autoria está BLOQUEADA.** Esta onda não altera `author` nem `reviewedBy` em nenhum guia. O documento existe para que a troca seja mecânica quando o bloqueio cair.

## O que falta para destravar

1. Número de registro no CRP de Larissa Caramaschi (formato `CRP 09/NNNNN`), para preencher `hasCredential[0].identifier` (PropertyValue `CRP`) e `hasCredential[0].url` apontando para o Cadastro Nacional de Psicólogos do CFP.
2. Currículo Lattes (URL `http://lattes.cnpq.br/<id>`), para `sameAs` e `identifier` (PropertyValue `Lattes`).
3. ORCID (se existir), para `sameAs` e `identifier` (PropertyValue `ORCID`).
4. Confirmação, guia a guia, de qual regime se aplica: `author` = Larissa (ela assina) ou `reviewedBy` = Larissa mantendo `author` = Alexandre/Brasil GEO (ela revisa).
5. `datePublished` explícito nos guias que não o declaram (a maioria); `reviewedBy` sem data de revisão tem pouco valor para o extrator.

## Onde a troca acontece (por arquivo)

Em cada guia o JSON-LD é montado no frontmatter em objetos `const ld*` (listados na tabela). O campo a trocar é `author` (e, no regime de revisão, `reviewedBy` a acrescentar) em **todos** os objetos que o declaram na página: normalmente `ldArticle` e `ldHowTo`, às vezes também `ldFaq`. Valor alvo, quando destravar: `author: larissaAuthorRef` (helper a criar em `person-larissa.ts`, no mesmo molde de `alexandreAuthorRef` em `person-alexandre.ts`, com `@id` + `sameAs`). O nó completo da Larissa só entra no `@graph` de `Base.astro` em rotas `/autismo/*`; ao reatribuir guias fora desse prefixo, `Base.astro` precisa passar a injetar `larissaPersonBase` também nessas rotas (ou a página passa a emitir o nó completo).

## Guias assinados por Alexandre Caramaschi (29)

| Slug | Título | Autor atual | Data | reviewedBy | Objetos JSON-LD com `author` |
|---|---|---|---|---|---|
| `afastamento-inss-burnout-nexo-qd85-2026` | Documentar o nexo de burnout (CID-11 QD85) para afastamento no INSS em 2026: o que o documento precisa conter | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | sem datePublished | não | `ldArticle`, `ldFaq` |
| `atendimento-primeiro-episodio-psicose` | Como conduzir primeiro atendimento em primeiro episódio psicótico: guia passo-a-passo | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | sem datePublished | não | `ldArticle`, `ldFaq`, `ldHowTo` |
| `avaliacao-altas-habilidades-superdotacao-adulto-2026` | Avaliar altas habilidades/superdotação (AHSD) em adultos no Brasil: protocolo, instrumentos e o Decreto 12.773/2025 | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | sem datePublished | não | `ldArticle`, `ldFaq` |
| `avaliacao-ccl-biomarcadores-2026` | Avaliação de Comprometimento Cognitivo Leve em 2026: protocolo com biomarcadores em plasma, MoCA e diferenciais | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | sem datePublished | não | `ldArticle`, `ldFaq`, `ldHowTo` |
| `avaliacao-demencia-precoce-jovem-adulto-2026` | Avaliar demência de início precoce (Early-Onset Dementia) em adulto 45-65 anos: HowTo 2026 | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | sem datePublished | não | `ldArticle`, `ldHowTo` |
| `avaliacao-saude-mental-perinatal` | Como avaliar saúde mental perinatal: guia passo-a-passo | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | sem datePublished | não | `ldArticle`, `ldFaq`, `ldHowTo` |
| `avaliacao-tdah-adulto` | Como conduzir avaliação de TDAH em adulto: guia passo-a-passo | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | sem datePublished | não | `ldArticle`, `ldFaq`, `ldHowTo` |
| `avaliacao-tdah-mulheres-adultas` | Como conduzir avaliação de TDAH em mulheres adultas: protocolo em 10 passos | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | sem datePublished | não | `ldArticle`, `ldFaq`, `ldHowTo` |
| `avaliacao-tea-idosos-2026` | Avaliar TEA em adulto idoso: protocolo 2026 para diferencial com demência, depressão tardia e camuflagem prolongada | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | sem datePublished | não | `ldArticle`, `ldFaq`, `ldHowTo` |
| `avaliacao-tea-mulheres-adultas` | Avaliação de TEA em mulher adulta: protocolo clínico em 9 passos com CAT-Q, ADOS-2 e fenótipo feminino | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | sem datePublished | não | `ldArticle`, `ldFaq`, `ldHowTo` |
| `biomarcadores-plasma-alzheimer-protocolo-neuropsi-2026` | Biomarcadores plasma para Alzheimer em 2026: como o neuropsicólogo se posiciona com p-tau217 — HowTo 10 passos | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | 2026-05-17 | não | `ldArticle`, `ldHowTo` |
| `conduzir-supervisao-stepped-care` | Como conduzir supervisão clínica em stepped-care no SUS: guia passo-a-passo | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | sem datePublished | não | `ldArticle`, `ldFaq`, `ldHowTo` |
| `depressao-pos-parto-paterna-rastreio-2026` | Depressão pós-parto paterna: rastreio e manejo do pai esquecido do puerpério | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | sem datePublished | não | `ldArticle`, `ldFaq` |
| `dupla-excepcionalidade-2e-adulto-avaliacao` | Dupla excepcionalidade (2e) no adulto: avaliar AHSD com TDAH ou TEA sem ver só um lado | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | sem datePublished | não | `ldArticle`, `ldFaq` |
| `escalas-burnout-bat-mbi-olbi-cbi` | Escalas de burnout no Brasil em 2026: como escolher e aplicar BAT, MBI, OLBI e CBI | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | sem datePublished | não | `ldArticle`, `ldFaq`, `ldHowTo` |
| `haidt-2026-update-evidencia-adolescencia-digital` | Haidt 2026 update e adolescência digital: HowTo em 10 passos para psicólogo escolar e clínico no Brasil | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | 2026-05-17 | não | `ldArticle`, `ldHowTo` |
| `integracao-ia-psicodiagnostico-clinica` | Como integrar IA generativa no psicodiagnóstico clínico: guia passo-a-passo | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | sem datePublished | não | `ldArticle`, `ldFaq`, `ldHowTo` |
| `intervencao-adolescente-ideacao-suicida-algoritmos` | Intervenção em adolescente com ideação suicida no contexto de algoritmos digitais: protocolo em 9 passos | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | sem datePublished | não | `ldArticle`, `ldFaq`, `ldHowTo` |
| `intervencao-crise-suicida-zero-suicide` | Como conduzir intervenção em crise suicida com método Zero Suicide: protocolo em 10 passos | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | sem datePublished | não | `ldArticle`, `ldFaq`, `ldHowTo` |
| `jurisprudencia-nr1-tst-2026` | Jurisprudência da NR-1 atualizada e burnout no TST/TRT em 2026: como ler decisões pós-Portaria 765/2025 | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | 2026-05-17 | não | `ldArticle`, `ldHowTo` |
| `luto-perinatal-gestacional-manejo-clinico-2026` | Luto gestacional e perinatal: manejo clínico, diferencial entre luto normal e complicado e cuidado na gestação subsequente | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | sem datePublished | não | `ldArticle`, `ldFaq` |
| `manejo-trauma-complexo-cptsd` | Como conduzir manejo de trauma complexo (CPTSD/TEPT-C): protocolo trifásico em 10 passos | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | sem datePublished | não | `ldArticle`, `ldFaq`, `ldHowTo` |
| `neuropsi-long-covid-brain-fog` | Como conduzir avaliação neuropsicológica em long COVID/brain fog: protocolo em 10 passos | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | sem datePublished | não | `ldArticle`, `ldFaq`, `ldHowTo` |
| `notas-clinicas-ia-implantar-consultorio-2026` | Implantar notas clínicas por IA no consultório em 2026: HowTo passo-a-passo com LGPD, sigilo e auditoria | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | 2026-05-17 | não | `ldArticle`, `ldHowTo` |
| `protocolo-act-burnout-saude` | Protocolo ACT em 8 sessões para burnout em profissionais da saúde: guia passo-a-passo | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | sem datePublished | não | `ldArticle`, `ldFaq`, `ldHowTo` |
| `protocolo-burnout-academico-pos-graduacao` | Protocolo de manejo de burnout em estudante de pós-graduação: passo-a-passo para coordenação e clínica em 2026 | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | sem datePublished | não | `ldArticle`, `ldHowTo` |
| `supervisao-async-ia-2026-protocolo-cfp` | Supervisão clínica assíncrona com apoio de IA em 2026: protocolo em 10 passos sob CFP, LGPD e Posicionamento CFP 03/07/2025 | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | 2026-05-17 | não | `ldArticle`, `ldHowTo` |
| `tea-camuflagem-mulheres-evidencia-2026` | Avaliação de TEA em mulher adulta com camuflagem em 2026: HowTo passo-a-passo com CAT-Q, ADOS-2 e diferencial | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | 2026-05-17 | não | `ldArticle`, `ldHowTo` |
| `uso-etico-ia-generativa-2026` | Uso ético de IA generativa na clínica em 2026: protocolo em 9 passos para psicólogos brasileiros | Alexandre Caramaschi (Person `@id` alexandrecaramaschi.com/#alexandre-caramaschi) | 2026-05-13 | não | `ldArticle`, `ldFaq`, `ldHowTo` |

## Guias assinados pela Organization Brasil GEO (6)

Não é reatribuição, mas o mesmo bloqueio se aplica: assinar por Organization em conteúdo clínico não resolve a credencial.

| Slug | Título | Autor atual | Data | reviewedBy | Objetos JSON-LD com `author` |
|---|---|---|---|---|---|
| `avaliacao-tea-adulto` | Como conduzir avaliação de TEA em adulto: guia passo-a-passo | Brasil GEO (Organization, `SITE.publisher`) | sem datePublished | não | `ldArticle`, `ldFaq`, `ldHowTo` |
| `construir-programa-bem-estar` | Como construir um programa de bem-estar corporativo evidence-based | Brasil GEO (Organization, `SITE.publisher`) | sem datePublished | não | `ldArticle`, `ldFaq`, `ldHowTo` |
| `escolher-supervisor-clinico` | Como escolher supervisor clínico com método: guia passo-a-passo | Brasil GEO (Organization, `SITE.publisher`) | sem datePublished | não | `ldArticle`, `ldFaq`, `ldHowTo` |
| `implementar-nr1-em-empresa` | Como implementar a NR-1 atualizada na empresa: guia passo-a-passo | Brasil GEO (Organization, `SITE.publisher`) | sem datePublished | não | `ldArticle`, `ldFaq`, `ldHowTo` |
| `retorno-ao-trabalho-pos-burnout` | Como conduzir o retorno ao trabalho pós-burnout: guia passo-a-passo | Brasil GEO (Organization, `SITE.publisher`) | sem datePublished | não | `ldArticle`, `ldFaq`, `ldHowTo` |
| `uso-etico-ia-clinica` | Como usar IA generativa na prática clínica com ética: guia passo-a-passo | Brasil GEO (Organization, `SITE.publisher`) | sem datePublished | não | `ldArticle`, `ldFaq`, `ldHowTo` |

## Fora do escopo desta lista

As 5 FAQs de TEA/TDAH em `site/src/pages/faq/` e os artigos de `/autismo/` já têm `author: larissaPersonBase` (com `reviewedBy` = Alexandre em parte delas). Continuam dependentes dos itens 1 a 3 acima para a credencial ficar verificável, mas não estão pendentes de reatribuição.

## Achados de 27/08/2026 (fontes públicas, sessão logada)

O que foi possível apurar sem a Larissa, e o que continua dependendo dela:

| Item | Resultado | Fonte |
|---|---|---|
| ORCID | Nenhum registro para "Larissa Caramaschi" (busca expandida da API pública: 0 resultados). Não criar ORCID em nome dela; se ela abrir um, entra em `sameAs`. | `pub.orcid.org/v3.0/expanded-search` |
| Lattes | Existe currículo de **Larissa Seixlack Caramaschi** (id de busca `K4700994P8`). A URL pública `lattes.cnpq.br/<16 dígitos>` só aparece no CV completo, que exige reCAPTCHA; pedir o link a ela ou abrir o CV manualmente na busca textual. | `buscatextual.cnpq.br` (busca simples por nome) |
| Formação no Lattes | Graduação em Psicologia pela **Universidade Católica de Goiás (1996–2001)**; especialização em Terapia de Família e de Casal (Holon, 2000); mestrado em Psicologia na **USP Ribeirão Preto** iniciado em 2002 (o CV coletado em 15/09/2025 ainda o marca "em andamento"). **Diverge do `person-larissa.ts`**, que declara bacharelado pela USP em `alumniOf`/`hasCredential`. Confirmar com ela antes de qualquer reatribuição: a credencial declarada tem de bater com o Lattes, senão o extrator lê contradição. | Escavador (espelho do Lattes) `escavador.com/sobre/1030598/larissa-seixlack-caramaschi` |
| CRP | O Cadastro Nacional de Profissionais de Psicologia (`cadastro.cfp.org.br`) exige reCAPTCHA na consulta; não foi consultado por automação. O site `larissacaramaschi.com` publica apenas "CRP 09 (Goiás), em ratificação". O número tem de vir dela. | `cadastro.cfp.org.br`, `larissacaramaschi.com/sobre` |
| Regime (assina ou revisa) | Decisão do dono do repositório, guia a guia. Sugestão operacional: `reviewedBy` = Larissa com `dateModified` da revisão nos 35 guias (Alexandre e a Organization continuam como `author`), porque ela não escreveu os textos; `author` = Larissa só nos guias que ela reescrever. | esta onda |

Enquanto CRP e Lattes (URL) não chegam, nada muda em `author`/`reviewedBy`: continua valendo o bloqueio da seção anterior.
