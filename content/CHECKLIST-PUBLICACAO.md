# Checklist de publicação — quality gate de 5 camadas + compliance MEC/CFP

> **Status:** vigente desde 2026-04-30
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-04-30

Este checklist é o quality gate executado imediatamente antes de publicar uma peça em domínio IPOG ao vivo. Ele assume que `content/CHECKLIST-AUTOAVALIACAO.md` foi preenchido e aprovado. As cinco camadas são executadas em ordem; falha em qualquer camada bloqueia a publicação.

Ver também:
- `content/CHECKLIST-AUTOAVALIACAO.md` para o pré-requisito do autor.
- `content/VOICE-GUIDE.md` para a Camada 5 (Voice Guard).
- `content/ACENTUACAO-PT-BR.md` para a Camada 1.
- `content/CLICHES-PROIBIDOS.md` para deny-lists.
- `content/PADRAO-EDITORIAL.md` para Camada 2 (conteúdo HBR).

## Camada 1 — Acentuação PT-BR

Auto-fix permitido nesta camada antes da revisão humana.

- [ ] Nenhuma ocorrência de "nao", "voce", "tambem", "pos", "ate", "ja" como palavra completa.
- [ ] Termos canônicos da vertical Psicologia com acento (psicológico, neuropsicológico, terapêutico, ético, prático, acadêmico, científico, técnico, didático, pedagógico, sistêmico, dinâmico).
- [ ] URLs e slugs em ASCII (sem acento).
- [ ] Blocos de código preservam grafia original.
- [ ] Sem marcador "[a confirmar]" remanescente em qualquer posição.

Auditoria detalhada em `content/ACENTUACAO-PT-BR.md`.

**Falha bloqueia a Camada 2.**

## Camada 2 — Conteúdo (HBR completo)

- [ ] Os seis elementos editoriais obrigatórios estão presentes (abertura, fundamentação, caso, tabela comparativa, exercícios, síntese executiva).
- [ ] Bloom: objetivos exclusivamente nível 3 a 6.
- [ ] Knowles: pelo menos 5 dos 6 princípios detectáveis.
- [ ] Zero clichés (deny-list 1, 17 expressões).
- [ ] Zero rhetoric openers (deny-list 2, 8 expressões).
- [ ] Zero ai-disclaimers (deny-list 3, 7 expressões).
- [ ] Mínimo uma tabela.
- [ ] Mínimo três exercícios com template canônico e progressão Bloom.
- [ ] Parágrafos com no máximo cinco linhas.
- [ ] Citações no formato (Autor, Ano).
- [ ] Hierarquia H2 > H3 > H4 sem pulos.

Auditoria detalhada em `content/PADRAO-EDITORIAL.md`, `content/BLOOM-KNOWLES.md`, `content/CLICHES-PROIBIDOS.md`.

**Falha bloqueia a Camada 3.**

## Camada 3 — Links

- [ ] URLs sem acento.
- [ ] Links internos válidos (a peça referenciada existe e está publicada).
- [ ] Cross-link com hub IPOG presente, com âncora descritiva (não "clique aqui", não "saiba mais").
- [ ] Cross-link com pelo menos uma peça correlata.
- [ ] Links externos abrem em nova aba quando apropriado pelo padrão do site.
- [ ] Imagens com `alt` descritivo (não apenas o nome do arquivo).
- [ ] Sem links quebrados (verificação automatizada quando disponível).

**Falha bloqueia a Camada 4.**

## Camada 4 — Schema.org (JSON-LD)

- [ ] JSON-LD presente no `<head>` ou em local definido pelo template do site.
- [ ] Schema `Article` com campos obrigatórios: `headline`, `datePublished`, `dateModified`, `author`, `publisher`, `image`, `articleSection`.
- [ ] Schema `Person` para o autor com `name`, `jobTitle` (com credencial canônica), `url`, `sameAs` quando aplicável.
- [ ] Schema `EducationalOrganization` para IPOG com `name`, `url`, `logo`.
- [ ] Validador Google Rich Results sem erro.
- [ ] Validador Schema.org Validator sem erro.
- [ ] Em peça do tipo FAQ, schema `FAQPage` + `Question` + `Answer`.
- [ ] Em peça do tipo HowTo (checklist), schema `HowTo` + `Step`.

**Falha bloqueia a Camada 5.**

## Camada 5 — Voice Guard

- [ ] Score Voice Guard >= 70.
- [ ] Naming canônico íntegro ("Brasil GEO", "IPOG", "MBA Online de Psicologia", "Alexandre Caramaschi"; demais conforme `content/VOICE-GUIDE.md`).
- [ ] Sem match em deny-list de naming proibido (GEO Brasil, Ipog, iPOG, MBA EAD Psicologia, Pós Online Psicologia, Alex, A. Caramaschi, Especialista #1, Source Rank, geobrasil.com.br, sourcerank.ai).
- [ ] Sem bloqueio crítico ativo (ver `content/VOICE-GUIDE.md`).

**Falha bloqueia publicação.**

## Camada extra de compliance MEC/CFP (quando aplicável)

Esta camada se aplica APENAS quando a peça contém claim regulatório.

### Quando aplicar

A peça contém pelo menos um destes elementos:

- Afirmação de reconhecimento MEC do MBA Online de Psicologia.
- Afirmação sobre exercício profissional regulamentado (clínico, avaliação psicológica, neuropsicologia).
- Afirmação sobre habilitação para atuação clínica.
- Afirmação sobre conformidade SATEPSI ou registro CFP.

### Itens

- [ ] Claim MEC suportado por evidência documental anexa (consulta e-MEC, autorização institucional, número de processo).
- [ ] Claim CFP suportado por menção explícita à exigência de registro CRP ativo para a atividade descrita.
- [ ] Claim SATEPSI suportado pela versão atual do parecer favorável do instrumento mencionado.
- [ ] Revisão jurídica IPOG documentada (ata, parecer ou aprovação registrada).
- [ ] SLA jurídico de 5 dias úteis respeitado (ver `docs/03-reunioes-e-cadencia-ipog.md`).

**Falha bloqueia publicação.** Quando a camada extra é acionada, a publicação só ocorre após assinatura do jurídico IPOG.

## Matriz de aprovação

| Etapa | Responsável | Critério de avanço | SLA |
|---|---|---|---|
| 1. Editor | Editor da peça (autor ou revisor designado) | Camadas 1, 2 e 3 fechadas | Mesmo dia da entrega final do autor |
| 2. Voice Guard automático | Pipeline editorial GEO IPOG | Camada 5 com score >= 70 e sem bloqueio crítico | 1 hora |
| 3. Bruno Azambuja (IPOG) | Gerente de Marketing IPOG | Validação operacional + naming + cross-link com hub | 2 dias úteis |
| 4. Jurídico IPOG | Departamento jurídico IPOG | Camada extra de compliance (se aplicável) | 5 dias úteis (SLA pactuado) |
| 5. Publicação | Operação editorial | Todas as camadas fechadas e logs de aprovação registrados | Janela editorial pactuada |

## Procedimento operacional

1. Quando o autor sinaliza submissão, o pipeline executa Voice Guard automático e gera relatório.
2. O editor designado executa Camadas 1, 2 e 3 com auxílio do relatório do Voice Guard.
3. Se a peça aciona a camada extra (claim regulatório), o editor abre solicitação para jurídico IPOG em paralelo às demais camadas.
4. Bruno Azambuja recebe a peça após Camadas 1-3 e Voice Guard aprovados.
5. Jurídico IPOG recebe a peça quando aplicável e devolve com parecer.
6. Operação publica somente quando todas as aprovações estão registradas.
7. Logs de aprovação ficam em `audits/publicacao/<slug>/`.

## Tratamento de falha

- **Falha em Camada 1, 2 ou 3:** devolve para o autor com diff explícito e checklist marcado.
- **Falha em Camada 4:** corrige no template ou no JSON-LD da peça e re-submete sem reabrir o conteúdo.
- **Falha em Camada 5:** devolve para o autor com pontuação detalhada por dimensão.
- **Falha em compliance MEC/CFP:** retém publicação, abre revisão jurídica formal e aciona Alexandre Caramaschi e Bruno Azambuja.

## Cadência

- Máximo de duas publicações por dia em domínios IPOG ao vivo (alinhado à disciplina FinOps do programa).
- Janela preferencial de publicação: terças e quintas, 9h-11h.
- Peças com camada extra de compliance têm janela alargada e seguem o SLA jurídico antes da janela operacional.

