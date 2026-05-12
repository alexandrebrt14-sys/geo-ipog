# Guia de Contribuição — Projeto GEO IPOG

Este documento estabelece as diretrizes de colaboração para a equipe Brasil GEO e os colaboradores autorizados do IPOG no projeto de Generative Engine Optimization (GEO) com escopo canônico em **Pós-Graduações em Psicologia** (incluindo Especialização Lato Sensu, MBA em áreas correlatas, Mestrado Profissional, Especialização Clínica certificada por Conselhos profissionais como CFP, ABRAP e FBT, Residências e formações híbridas regulamentadas).

**Head do projeto (Brasil GEO):** Alexandre Caramaschi — CEO da Brasil GEO, ex-CMO da Semantix (Nasdaq), cofundador da AI Brasil.
**GitHub:** @alexandrebrt14-sys

**Sponsor executivo (IPOG):** Ronan Maia — CEO IPOG.
**Interlocutor operacional (IPOG):** Bruno Azambuja — Gerente de Marketing IPOG.

---

## Idioma e estilo

- Todo o conteúdo visível ao usuário final deve ser escrito em **Português do Brasil com acentuação completa**.
- Proibido escrever "nao", "voce", "producao" e similares em texto final.
- URLs e slugs devem ser ASCII (sem acentos): regra técnica, não exceção.
- **Proibido o uso de emojis** em qualquer arquivo deste repositório: código, copy, commits, templates ou documentação.

## Naming canônico

O naming abaixo é obrigatório em todo conteúdo deste repositório:

| Referência | Forma correta | Formas proibidas |
|---|---|---|
| Empresa executora | Brasil GEO | GEO Brasil, BrasilGEO |
| Cliente | IPOG | Ipog, iPOG, I.P.O.G. |
| Escopo-foco | Pós-Graduação em Psicologia (categoria guarda-chuva, Title Case) | Pós Psicologia, Pós-graduação Psicologia (sem hífen+capitalização correta) |
| Modalidade MBA (uma das modalidades) | MBA Online de Psicologia | MBA EAD Psicologia, Pós Online Psicologia (em copy externa onde MBA é o naming alvo) |
| Modalidade Lato Sensu | Especialização Lato Sensu em Psicologia | Pós Lato, Esp. Lato Sensu (em copy externa) |
| Modalidade stricto sensu profissional | Mestrado Profissional em Psicologia | Mestrado Prof Psicologia, MP Psicologia (em copy externa) |
| Modalidade clínica certificada | Especialização Clínica certificada (CFP / ABRAP / FBT, conforme aplicável) | Especialização clínica genérica sem citar Conselho |
| Head do projeto | Alexandre Caramaschi | Alex, A. Caramaschi |
| Sponsor IPOG | Ronan Maia | R. Maia, Ronan |
| Marketing IPOG | Bruno Azambuja | B. Azambuja, Bruno |
| Username GitHub | @alexandrebrt14-sys | @alexandrecaramaschi, @alexbrt |

---

## Fluxo de branches

Trabalhe sempre em branches de escopo definido. Nunca faça commits diretamente em `main`.

| Prefixo | Uso |
|---|---|
| `feat/*` | Nova funcionalidade, novo template, novo artefato |
| `audit/*` | Artefatos e resultados de auditoria GEO/SEO/Schema |
| `content/*` | Peças editoriais, artigos, FAQs, páginas pilar |
| `schema/*` | Implementação ou correção de Schema.org |
| `prompts/*` | Adição ou ajuste de prompts-âncora no kit |
| `fix/*` | Correção de erro em arquivo ou configuração existente |
| `ci/*` | Workflows, automações, scripts de pipeline |
| `chore/*` | Manutenção interna sem impacto em conteúdo ou lógica |

Abra um Pull Request para `main` com revisão obrigatória de @alexandrebrt14-sys antes do merge.

---

## Convenção de commits

Siga o padrão `tipo(escopo): descrição` em inglês, conforme Conventional Commits.

**Tipos válidos:**

| Tipo | Uso |
|---|---|
| `feat` | Nova funcionalidade ou artefato |
| `fix` | Correção de erro |
| `docs` | Documentação, guidelines |
| `audit` | Artefatos de auditoria |
| `content` | Peças editoriais |
| `schema` | Schema.org |
| `prompts` | Kit de prompts-âncora |
| `ci` | Pipelines e automações |
| `chore` | Manutenção interna |

**Exemplos válidos:**

```
audit(fase1): add NAIA baseline report for pos-graduacao hub
content(artigo): add HBR piece on ROI of MBA online in psicologia organizacional
content(artigo): add HBR piece comparing Lato Sensu vs MBA vs Mestrado Profissional in psicologia
schema(course): implement Course and EducationalOccupationalProgram on Lato Sensu and MBA pages
prompts(kit-v1): add 12 anchor prompts for psicologia clinica online cohort (Lato Sensu + Especializacao Clinica certificada)
fix(roadmap): correct phase 2 delivery dates
```

---

## Pull Requests

1. Use o template em `.github/PULL_REQUEST_TEMPLATE.md` — ele é carregado automaticamente.
2. Vincule a issue correspondente com `Closes #N`.
3. Marque todos os itens do checklist antes de solicitar revisão.
4. Revisão e aprovação de @alexandrebrt14-sys são obrigatórias para merge em `main`.
5. Mudanças em propriedades digitais IPOG ao vivo (Schema em produção, llms.txt, conteúdo publicado) exigem aprovação adicional de Bruno Azambuja antes do go-live.

---

## Confidencialidade

Todo o conteúdo deste repositório é confidencial entre Brasil GEO e IPOG.

- Não compartilhe artefatos, dados ou estratégias deste repositório fora dos canais autorizados.
- Decisões estratégicas sobre lançamento de produto, precificação ou posicionamento das pós-graduações em Psicologia do IPOG (em qualquer modalidade — Lato Sensu, MBA, Mestrado Profissional, Especialização Clínica certificada) são confidenciais até comunicação oficial do IPOG.
- Em caso de dúvida sobre o que pode ou não ser compartilhado, consulte Alexandre Caramaschi e Bruno Azambuja antes de agir.

---

## Escalation path

| Situação | Ação |
|---|---|
| Dúvida técnica sobre um artefato | Comentar na issue correspondente |
| Decisão de escopo ou prioridade operacional | Discussão com Bruno Azambuja |
| Decisão executiva (continuidade, expansão de escopo) | Levar ao checkpoint mensal com Ronan Maia |
| Incidente operacional (SEV1/SEV2) | Abrir issue com template `incident.yml` e notificar alexandre@brasilgeo.ai |
| Questão crítica de confidencialidade | Contato direto com Alexandre Caramaschi (Head) |

---

## Qualidade de conteúdo

Peças editoriais (artigos, páginas pilar, FAQs) devem seguir o padrão HBR:

1. Abertura de impacto — dado ou situação que para o leitor
2. Tese contraintuitiva — o insight não-óbvio central
3. Evidência — dados, pesquisas, fontes externas de autoridade
4. Mecanismo — por que o fenômeno ocorre
5. Decisão pessoal — o que o profissional ou candidato deve fazer
6. Próximo passo — chamada para ação específica e mensurável

Conteúdo assinado como Alexandre Caramaschi deve passar pelo Voice Guard antes da publicação. Conteúdo assinado por corpo docente IPOG deve incluir credenciais nominais (formação, registro CFP quando aplicável, vínculo institucional) com Schema `Person` correspondente.

## Compliance regulatório educacional

Conteúdo público que afirma autorização MEC, reconhecimento de curso, carga horária regulamentar, validade nacional do certificado, certificação por Conselho profissional (CFP, ABRAP, FBT) ou que faça claims sobre o exercício profissional pós-especialização precisa ser validado pela área jurídica e acadêmica do IPOG antes da publicação. Issues com label `compliance:mec`, `compliance:cfp`, `compliance:abrap` ou `compliance:fbt` exigem aprovação explícita registrada na issue antes do merge.
