# Checklist de autoavaliação do autor — programa GEO IPOG

> **Status:** vigente desde 2026-04-30
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-04-30

Este checklist é preenchido pelo autor da peça antes de submeter para revisão. Submissão sem checklist preenchido é devolvida automaticamente. Cada item tem instrução curta; quando há nuance, a remissão ao documento canônico aparece em parênteses.

Ver também:
- `content/PADRAO-EDITORIAL.md` para a estrutura HBR completa.
- `content/VOICE-GUIDE.md` para o Voice Guard ponderado.
- `content/CLICHES-PROIBIDOS.md` para as três deny-lists.
- `content/CHECKLIST-PUBLICACAO.md` para o quality gate de cinco camadas.

## Checklist de 14 itens

Marque `[x]` quando o item estiver atendido. Itens não marcados precisam ser corrigidos antes da submissão.

- [ ] **1. Abertura com dado ou caso impactante.** A peça abre com dado surpreendente (formato `(Autor, Ano)`) ou caso real concreto. Sem rhetoric opener (ver `content/CLICHES-PROIBIDOS.md`). Comprimento da abertura entre 250 e 350 palavras (ou conforme tipo de peça em `content/PADRAO-EDITORIAL.md`).

- [ ] **2. Objetivos com Bloom 3+.** Os objetivos da peça usam exclusivamente verbos dos níveis 3 a 6 da taxonomia de Bloom. Nenhum objetivo contém verbo da deny-list (entender, conhecer, saber, compreender, lembrar, memorizar, listar, descrever, identificar, definir, citar). Ver `content/BLOOM-KNOWLES.md`.

- [ ] **3. Mínimo uma tabela markdown.** Há pelo menos uma tabela com cabeçalho, no máximo cinco colunas, paralelismo estrutural nas linhas. Em peça pilar do hub, mínimo duas tabelas. Ver `content/PADRAO-EDITORIAL.md` seção "Padrão de tabela".

- [ ] **4. Mínimo três exercícios práticos com contexto real.** Há ao menos três exercícios construídos com o template canônico, cada um com persona, dados concretos e progressão Bloom. Ver `content/EXERCICIO-TEMPLATE.md`.

- [ ] **5. Blockquotes para insights centrais.** Pelo menos uma frase contraintuitiva ou conceito-chave em blockquote (`>`). Sem usar blockquote para citações longas de autores externos.

- [ ] **6. Negrito em termos-chave na primeira ocorrência.** Termos canônicos da vertical Psicologia em **negrito** na primeira aparição, conforme `content/GLOSSARIO-PSICOLOGIA.md`. Anti-padrões em negrito quando explicitamente sinalizados.

- [ ] **7. Hierarquia H2 > H3 > H4 sem pulos.** H1 apenas no título da peça. Sem pulo de H2 para H4. Subseções dentro de H2 usam H3.

- [ ] **8. Parágrafos com no máximo cinco linhas.** Frases longas quebradas em listas quando possível. Densidade visual adequada para leitura mobile.

- [ ] **9. Zero clichés.** Nenhuma das 17 expressões da deny-list de clichés universais aparece no texto fora de blockquote anti-padrão. Ver `content/CLICHES-PROIBIDOS.md`.

- [ ] **10. Zero rhetoric openers.** Nenhuma das 8 aberturas retóricas proibidas aparece em qualquer posição do texto. Atenção especial aos primeiros 200 caracteres da peça.

- [ ] **11. Zero ai-disclaimers.** Nenhuma das 7 expressões de disclaimer de IA aparece. Toda peça é assinada por humano.

- [ ] **12. Acentuação PT-BR completa.** Auditoria contra `content/ACENTUACAO-PT-BR.md`. Termos canônicos da vertical (psicológico, neuropsicológico, terapêutico, ético, prático, acadêmico, científico, técnico, didático, pedagógico, sistêmico, dinâmico) com acento. URLs e slugs preservados em ASCII.

- [ ] **13. Zero emojis.** Nenhum emoji em qualquer posição do texto, em headings, em rodapé ou em campos Schema.

- [ ] **14. Referências com autor/ano + checklist de aplicação imediata + ponte para próxima peça + naming canônico.** Bloco final contém: (a) referências completas em formato canônico quando há cinco ou mais citações no corpo; (b) checklist de aplicação imediata (ações para 24-72 horas); (c) cross-link descritivo para próxima peça do hub IPOG; (d) naming canônico íntegro ("Brasil GEO", "IPOG", "MBA Online de Psicologia", "Alexandre Caramaschi"; sem nenhum naming proibido). Ver `content/VOICE-GUIDE.md` para a deny-list de naming.

## Procedimento de submissão

1. Abra o arquivo da peça no diretório de drafts (ex.: `drafts/<wave>/<slug>.md`).
2. Confira os 14 itens linha por linha.
3. Onde encontrar item não atendido, **corrija antes de prosseguir**.
4. Ao final, copie a versão final do checklist (com `[x]` em todos os itens) para o cabeçalho da pull request ou para o canal de submissão usado pelo programa.
5. Encaminhe para Bruno Azambuja (validação operacional) e, se aplicável, para o jurídico IPOG (claims regulatórios).
6. Aguarde aprovação. A peça só passa para o `content/CHECKLIST-PUBLICACAO.md` após aprovação do checklist de autoavaliação.

## Quando o checklist não cobre o caso

Se a peça apresenta caso de borda não previsto (ex.: peça de opinião pura, peça em formato carta aberta, peça em formato debate), o autor escreve nota dirigida ao revisor explicando o caso e a adaptação proposta. A decisão final é de Alexandre Caramaschi com validação operacional de Bruno Azambuja.

## Tabela rápida de remissão por item

Quando um item falhar e o autor precisar revisar a regra, esta tabela aponta o documento canônico que detalha o critério.

| Item | Documento canônico para consulta |
|---|---|
| 1. Abertura | `content/PADRAO-EDITORIAL.md` (seção "1. Abertura com impacto") |
| 2. Bloom 3+ | `content/BLOOM-KNOWLES.md` (seção "Tabela canônica de verbos por nível") |
| 3. Tabela | `content/PADRAO-EDITORIAL.md` (seção "Padrão de tabela") |
| 4. Exercícios | `content/EXERCICIO-TEMPLATE.md` (estrutura padrão e exemplos) |
| 5. Blockquote | `content/PADRAO-EDITORIAL.md` (seção "Padrão de blockquote") |
| 6. Negrito em termos-chave | `content/GLOSSARIO-PSICOLOGIA.md` (tabela de termos canônicos) |
| 7. Hierarquia | `content/PADRAO-EDITORIAL.md` (seção "Hierarquia tipográfica") |
| 8. Parágrafos curtos | `content/PADRAO-EDITORIAL.md` (mesma seção) |
| 9. Clichés | `content/CLICHES-PROIBIDOS.md` (deny-list 1) |
| 10. Rhetoric openers | `content/CLICHES-PROIBIDOS.md` (deny-list 2) |
| 11. AI-disclaimers | `content/CLICHES-PROIBIDOS.md` (deny-list 3) |
| 12. Acentuação | `content/ACENTUACAO-PT-BR.md` (tabela e checklist binário) |
| 13. Emojis | regra global do programa, sem exceção |
| 14. Referências e naming | `content/VOICE-GUIDE.md` (naming canônico e deny-list) |

## Tempo médio esperado de autoavaliação

| Tipo de peça | Tempo estimado |
|---|---|
| FAQ ou checklist (300-800 palavras) | 10-15 minutos |
| Artigo HBR-grade longo (1500-4000 palavras) | 30-45 minutos |
| Peça pilar do hub (3000-6000 palavras) | 60-90 minutos |

A autoavaliação não é etapa burocrática; é a última oportunidade do autor de capturar inconsistências antes de submeter ao revisor. Tratada com seriedade, reduz drasticamente o número de rodadas de retrabalho.

## Histórico de revisões deste checklist

- 2026-04-30: versão inicial vigente.

