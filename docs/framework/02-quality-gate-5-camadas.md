# Quality Gate em 5 Camadas + Camada 6 de Compliance MEC/CFP

> **Status:** vigente desde 2026-04-30
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-04-30

Este documento descreve o quality gate prescritivo executado sobre toda peça produzida pelo programa GEO IPOG antes da publicação em domínio ao vivo. As cinco camadas são executadas em ordem; falha em qualquer camada bloqueia o avanço para a seguinte. Uma sexta camada — compliance MEC/CFP — é acionada apenas quando a peça contém claim regulatório.

A operação concreta de cada camada (checklist passo-a-passo) está em `content/CHECKLIST-PUBLICACAO.md`. Este documento é a fonte conceitual: o que cada camada valida, o que é auto-fix, o que é bloqueio, exemplo de output esperado, e como cada camada se integra ao Voice Guard. Os dois documentos devem ser lidos em conjunto.

Cross-links:

- `content/CHECKLIST-PUBLICACAO.md` para a versão operacional do quality gate.
- `content/CHECKLIST-AUTOAVALIACAO.md` para o pré-requisito do autor.
- `content/VOICE-GUIDE.md` para a Camada 5 (Voice Guard).
- `content/ACENTUACAO-PT-BR.md` para a Camada 1.
- `content/CLICHES-PROIBIDOS.md` para deny-lists usadas na Camada 2.
- `content/PADRAO-EDITORIAL.md` para regras editoriais HBR da Camada 2.
- `content/BLOOM-KNOWLES.md` para os princípios pedagógicos exigidos na Camada 2.
- `audits/SCHEMA-PATTERNS.md` para padrões Schema.org da Camada 4.
- `prompts/PAPEIS-DE-COLETA.md` para o pipeline editorial que precede o quality gate.
- `dashboards/METRICAS-CANONICAS.md` para os KPIs alimentados pela peça publicada.

## Princípios canônicos do quality gate

1. **Ordem fixa.** Camada 1 → Camada 2 → Camada 3 → Camada 4 → Camada 5 → (Camada 6 quando aplicável). Pular camadas é proibido.
2. **Bloqueio explícito.** Falha em camada bloqueia avanço; não há "promete corrigir depois". A peça volta para o estágio onde a falha pode ser corrigida.
3. **Auto-fix limitado às camadas onde é seguro.** Acentuação PT-BR (Camada 1) admite auto-fix; demais camadas exigem decisão humana.
4. **Voice Guard é transversal.** Embora seja formalmente a Camada 5, sua leitura informa Camadas 1, 2 e 3 em modo consultivo (relatório precoce que ajuda autor e editor antes da camada definitiva).
5. **Compliance é blindagem.** Camada 6 é acionada por presença de claim regulatório. Quando acionada, sua falha bloqueia publicação independentemente do score das demais camadas.
6. **Logs completos.** Cada camada gera log auditável em `audits/publicacao/<slug>/`. A peça publicada sem log completo é considerada irregular e é objeto de auditoria retroativa.

## Camada 1 — Acentuação PT-BR

### O que valida

Que o texto da peça respeita acentuação completa em Português do Brasil em todo conteúdo visível ao usuário final. Inclui termos canônicos da vertical Psicologia (psicológico, neuropsicológico, terapêutico, ético, prático, acadêmico, científico, técnico, didático, pedagógico, sistêmico, dinâmico) e o vocabulário operacional do programa (avaliação, instituição, pós-graduação, MBA Online de Psicologia).

Auditoria detalhada em `content/ACENTUACAO-PT-BR.md`.

### Como o auto-fix funciona

Esta é a única camada onde auto-fix é permitido. O processo prescrito:

1. Pipeline executa varredura por padrões de palavras conhecidas que aparecem sem acento (`nao`, `voce`, `tambem`, `pos`, `ate`, `ja`, `producao`, `psicologico`, `terapeutico`, `etico`, `pratico`).
2. Para cada match, aplica a forma acentuada canônica.
3. Lista todas as substituições em log.
4. Passa o texto corrigido para revisão humana ANTES de avançar para Camada 2.

URLs e slugs ficam em ASCII por design e estão fora do escopo do auto-fix de acentuação textual. Blocos de código preservam grafia original.

### O que é bloqueio

- Qualquer ocorrência remanescente de palavra-alvo sem acento após o auto-fix.
- Marcador "[a confirmar]" remanescente em qualquer posição.
- Inconsistência entre versão acentuada e versão sem acento da mesma palavra dentro do mesmo texto.

### Exemplo de output esperado

```
[Camada 1 — Acentuação PT-BR]
Status: APROVADO
Substituições aplicadas pelo auto-fix: 23
Termos checados: 142
Termos canônicos da vertical Psicologia presentes: 87
Marcadores "[a confirmar]" remanescentes: 0
Próxima camada: Camada 2 (Conteúdo HBR)
```

ou

```
[Camada 1 — Acentuação PT-BR]
Status: BLOQUEADO
Razão: 2 marcadores "[a confirmar]" remanescentes nas linhas 47 e 89.
Ação requerida: autor preenche e re-submete.
```

### Integração com Voice Guard

Voice Guard, na sua dimensão de naming canônico, verifica que termos como "Brasil GEO" e "MBA Online de Psicologia" estão grafados corretamente. Quando a Camada 1 sinaliza inconsistência de acentuação, o Voice Guard usa essa informação para reduzir score de naming proporcionalmente.

## Camada 2 — Conteúdo HBR completo

### O que valida

Que a peça atende ao padrão editorial HBR/HSM/MIT Sloan adaptado ao contexto IPOG, com estrutura, profundidade, andragogia e exercícios pedagógicos. Cobre Bloom (níveis 3 a 6), Knowles (mínimo 5 dos 6 princípios da andragogia), formato (parágrafos máximo 5 linhas, tabelas obrigatórias, exercícios, palavras 1500-4000), zero clichés e hierarquia H2 > H3 > H4 sem pulos.

Auditoria detalhada em `content/PADRAO-EDITORIAL.md`, `content/BLOOM-KNOWLES.md`, `content/CLICHES-PROIBIDOS.md` e `content/EXERCICIO-TEMPLATE.md`.

### Como o auto-fix funciona

Auto-fix nesta camada é proibido — todas as alterações exigem decisão humana, porque mexer em estrutura editorial sem entender contexto degrada qualidade. O pipeline gera **relatório acionável** que o editor humano usa para devolver ao autor.

### O que é bloqueio

- Algum dos seis elementos editoriais obrigatórios ausente: abertura-impacto, fundamentação acadêmica, caso, tabela comparativa, exercícios, síntese executiva.
- Bloom: nenhum objetivo nos níveis 3 a 6 (objetivos somente em níveis 1 e 2 são bloqueio).
- Knowles: menos de 5 dos 6 princípios detectáveis.
- Qualquer ocorrência das deny-lists (`content/CLICHES-PROIBIDOS.md`):
  - Lista 1: 17 clichés gerais.
  - Lista 2: 8 rhetoric openers proibidos.
  - Lista 3: 7 ai-disclaimers proibidos.
- Tabela ausente.
- Menos de 3 exercícios.
- Parágrafo com mais de 5 linhas.
- Palavras fora do envelope 1500-4000.
- Hierarquia H2 > H3 > H4 com pulos (ex.: H2 → H4 sem H3 intermediário).

### Exemplo de output esperado

```
[Camada 2 — Conteúdo HBR]
Status: BLOQUEADO
Bloqueios encontrados:
  - Tabela comparativa ausente.
  - Knowles: 4 dos 6 princípios detectáveis (faltam: experiência prévia do aprendiz; auto-direção).
  - Clichê encontrado na linha 38: "no mundo VUCA atual" (deny-list 1).
  - Parágrafo com 7 linhas na linha 122.
Score de profundidade editorial: 6.2/10.
Ação requerida: autor recebe diff e re-submete.
```

### Integração com Voice Guard

Voice Guard usa a saída desta camada para a sua dimensão "Bloom + andragogia" (30% do score final). Quando Bloom 3+ e Knowles >=5 estão presentes, a dimensão pontua em cheio; quando ausentes, o Voice Guard reflete a deficiência.

## Camada 3 — Links

### O que valida

Que a peça sustenta sua presença no hub IPOG via links internos válidos, cross-link com hub central, âncoras descritivas e URLs em ASCII (sem acento). Imagens precisam ter `alt` descritivo e não apenas o nome do arquivo.

### Como o auto-fix funciona

Auto-fix limitado a sanitização de URLs com acento (substituição por slugs ASCII canônicos quando o slug-alvo existe). Demais correções exigem decisão humana, porque o link-quebra geralmente indica que a peça referenciada não está publicada ou foi renomeada — cenário que precisa de review editorial, não substituição automática.

### O que é bloqueio

- URL com acento (proibido em qualquer posição visível).
- Link interno apontando para peça inexistente ou em rascunho.
- Cross-link com hub IPOG ausente.
- Cross-link com pelo menos uma peça correlata ausente.
- Âncora "clique aqui" / "saiba mais" / "veja mais" / "leia mais" — proibidas.
- Imagem com `alt` igual ao nome do arquivo (`alt="DSC_4582.jpg"` é bloqueio).

### Exemplo de output esperado

```
[Camada 3 — Links]
Status: APROVADO
Links internos verificados: 7 (todos válidos)
Cross-link com hub IPOG: presente, âncora descritiva ("hub de pós-graduação em Psicologia")
Peças correlatas: 3 cross-links válidos
URLs ASCII: 100% conformes
Imagens com alt descritivo: 5/5
Próxima camada: Camada 4 (Schema.org)
```

### Integração com Voice Guard

Voice Guard verifica que naming canônico ("MBA Online de Psicologia", "IPOG", "Brasil GEO") aparece nas âncoras descritivas, não em forma proibida ("Pós Online", "Ipog", "GEO Brasil"). Falha de âncora no Camada 3 reduz score de naming no Voice Guard.

## Camada 4 — Schema.org (JSON-LD)

### O que valida

Que a peça publica `Article`, `Person` e `EducationalOrganization` em JSON-LD íntegro no `<head>` ou em local definido pelo template do site. Para tipos especiais (FAQ, HowTo) os schemas correspondentes são exigidos. Validador Google Rich Results e Schema.org Validator são usados.

Auditoria detalhada em `audits/SCHEMA-PATTERNS.md`. Os checks formais cruzam com a Categoria C do `audits/PLAYBOOK-AUDITORIA-NAIA.md` (NAIA-044 a NAIA-050).

### Como o auto-fix funciona

Auto-fix limitado a:

- Inserção do JSON-LD canônico via template quando ausente.
- Preenchimento de `dateModified` com timestamp da publicação.
- Geração de `@id` canônico baseado em URL.

Demais correções (campos vazios, autoria errada, datas inconsistentes) exigem decisão humana.

### O que é bloqueio

- JSON-LD ausente.
- `Article` sem `headline`, `datePublished`, `dateModified`, `author`, `publisher`, `image` ou `articleSection`.
- `Person` (autor) sem `name` ou `jobTitle`.
- `EducationalOrganization` (publisher IPOG) sem `name`, `url` ou `logo`.
- Validador Google Rich Results retornando erro.
- Validador Schema.org Validator retornando erro.
- Em peça FAQ: `FAQPage` ausente ou `mainEntity` sem `Question`/`Answer` estruturados.
- Em peça HowTo (checklist procedural): `HowTo` ausente ou `Step` não estruturado.

### Exemplo de output esperado

```
[Camada 4 — Schema.org]
Status: APROVADO
Esquemas detectados: Article, Person (autor), EducationalOrganization (IPOG), FAQPage (3 perguntas)
Validador Google Rich Results: OK
Validador Schema.org Validator: OK
Cross-check NAIA Categoria C: 7/7 checks aprovados
Próxima camada: Camada 5 (Voice Guard)
```

### Integração com Voice Guard

Voice Guard inspeciona o `Person` para garantir que a credencial canônica do autor está íntegra. Para peças assinadas por Alexandre Caramaschi: "CEO da Brasil GEO, ex-CMO da Semantix Nasdaq, cofundador da AI Brasil". Para peças assinadas por corpo docente IPOG: credencial completa com formação, registro CRP/CFP quando aplicável, link Lattes/ORCID.

## Camada 5 — Voice Guard

### O que valida

Score Voice Guard global da peça, calculado em quatro dimensões com pesos canônicos:

- **Clichê (30%)** — verifica deny-lists 1, 2 e 3 e penaliza recorrência de expressões evasivas.
- **Bloom + andragogia (30%)** — verifica Bloom 3+ e Knowles >=5 conforme `content/BLOOM-KNOWLES.md`.
- **Naming (25%)** — verifica que naming canônico está íntegro e que naming proibido está ausente.
- **HBR (15%)** — verifica abertura-impacto, tese contraintuitiva, mecanismo, decisão pessoal, próximo passo.

Score mínimo para aprovar: **>= 70**.

Auditoria detalhada em `content/VOICE-GUIDE.md`.

### Como o auto-fix funciona

Voice Guard não aplica auto-fix. Ele produz **score por dimensão** e gera diff acionável para o autor. Algumas correções, como acentos em palavras canônicas, são forwardadas para a Camada 1 quando possível.

### O que é bloqueio

- Score global < 70.
- Naming proibido detectado (qualquer um da deny-list de naming):
  - "GEO Brasil"
  - "Ipog" / "iPOG"
  - "MBA EAD Psicologia"
  - "Pós Online Psicologia"
  - "Alex" / "A. Caramaschi"
  - "Especialista #1"
  - "Source Rank"
  - "geobrasil.com.br"
  - "sourcerank.ai"
- Bloqueio crítico ativo conforme `content/VOICE-GUIDE.md` (ex.: ai-disclaimer presente, alegação não verificável sobre número de alunos, dado regulatório errado).

### Exemplo de output esperado

```
[Camada 5 — Voice Guard]
Status: APROVADO
Score global: 84/100
Decomposição por dimensão:
  - Clichê: 27/30 (1 ocorrência marginal "no fundo, no fundo" — informativa, não bloqueante)
  - Bloom + andragogia: 28/30 (5 dos 6 princípios Knowles detectados)
  - Naming: 25/25 (canônico íntegro)
  - HBR: 14/15 (decisão pessoal poderia ser mais explícita)
Bloqueio crítico: nenhum
Próxima camada: Camada 6 (Compliance MEC/CFP) — acionada pela detecção do termo "lato sensu MEC".
```

### Integração com as demais camadas

Voice Guard é o auditor cruzado de todas as camadas. Ele inspeciona o que as outras camadas viram e verifica consistência. Casos de uso:

- Camada 1 aprovou mas Voice Guard detectou "GEO Brasil" — Voice Guard bloqueia, Camada 1 não.
- Camada 2 aprovou mas Voice Guard detectou que Bloom só atinge nível 3 marginalmente — Voice Guard reduz score sem bloquear automaticamente.
- Camada 4 aprovou JSON-LD íntegro mas autor é assinado como "Alex" — Voice Guard bloqueia.

Voice Guard é o último filtro antes da publicação em peças sem claim regulatório, e o penúltimo em peças com claim (Camada 6 vem depois).

## Camada 6 — Compliance MEC/CFP

### Quando aciona

Camada 6 é acionada APENAS quando a peça contém pelo menos um destes elementos:

- Afirmação de reconhecimento MEC do MBA Online de Psicologia.
- Afirmação sobre exercício profissional regulamentado (clínico, avaliação psicológica, neuropsicologia).
- Afirmação sobre habilitação para atuação clínica.
- Afirmação sobre conformidade SATEPSI ou registro CFP.

A detecção dessa condição é automática (varredura por padrões de claim regulatório no texto). Pode ser ativada manualmente pelo editor designado se houver dúvida.

### O que valida

- Claim MEC suportado por evidência documental anexa (consulta e-MEC, autorização institucional, número de processo).
- Claim CFP suportado por menção explícita à exigência de registro CRP ativo para a atividade descrita.
- Claim SATEPSI suportado pela versão atual do parecer favorável do instrumento mencionado.
- Revisão jurídica IPOG documentada (ata, parecer ou aprovação registrada).
- SLA jurídico de 5 dias úteis respeitado.

### Como o auto-fix funciona

Sem auto-fix. Compliance é decisão humana de jurídico IPOG. Pipeline apenas roteia para o departamento jurídico e aguarda assinatura formal.

### O que é bloqueio

- Qualquer claim sem evidência documental anexa.
- Revisão jurídica IPOG ausente.
- SLA jurídico não respeitado (ainda em revisão).
- Parecer SATEPSI desatualizado para o instrumento mencionado.

### Exemplo de output esperado

```
[Camada 6 — Compliance MEC/CFP]
Status: BLOQUEADO
Razão: claim "reconhecido pelo MEC" presente sem anexo de evidência.
Ação requerida: autor anexa consulta e-MEC datada; jurídico IPOG revisa em até 5 dias úteis.
SLA atual: dia 1 de 5.
```

### Integração com Voice Guard

Voice Guard pré-flagueia claims regulatórios e sinaliza ao editor que Camada 6 será acionada. Esta sinalização precoce reduz tempo de ida e volta entre autor e jurídico.

## Fluxo agregado do quality gate

```
[Peça pronta pelo autor]
     |
     v
[Camada 1] -- bloqueio --> [autor corrige acentuação]
     |
     v (aprovado)
[Camada 2] -- bloqueio --> [autor corrige conteúdo HBR]
     |
     v (aprovado)
[Camada 3] -- bloqueio --> [autor corrige links]
     |
     v (aprovado)
[Camada 4] -- bloqueio --> [autor ou template corrige Schema.org]
     |
     v (aprovado)
[Camada 5] -- bloqueio --> [autor corrige conforme Voice Guard]
     |
     v (aprovado)
[Camada 6 acionada?] -- não --> [Publicação]
     |
     v (sim)
[Camada 6: jurídico IPOG] -- bloqueio --> [autor + jurídico ajustam]
     |
     v (aprovado)
[Publicação]
     |
     v
[Logs registrados em audits/publicacao/<slug>/]
     |
     v
[Indexação: IndexNow + GSC sitemap submit]
     |
     v
[Coleta cross-LLM detecta efeito em 4-7 dias]
```

## Matriz de aprovação operacional

| Etapa | Responsável | Critério de avanço | SLA |
|---|---|---|---|
| 1. Editor | Editor da peça (autor ou revisor designado) | Camadas 1, 2 e 3 fechadas | Mesmo dia da entrega final do autor |
| 2. Voice Guard automático | Pipeline editorial GEO IPOG | Camada 5 com score >= 70 e sem bloqueio crítico | 1 hora |
| 3. Bruno Azambuja (IPOG) | Gerente de Marketing IPOG | Validação operacional + naming + cross-link com hub | 2 dias úteis |
| 4. Jurídico IPOG | Departamento jurídico IPOG | Camada 6 (se aplicável) | 5 dias úteis (SLA pactuado) |
| 5. Publicação | Operação editorial | Todas as camadas fechadas e logs de aprovação registrados | Janela editorial pactuada |

A matriz acima é a versão operacional canônica e é replicada em `content/CHECKLIST-PUBLICACAO.md`. Qualquer divergência entre os dois documentos é resolvida em favor desta versão.

## Anti-padrões proibidos

- Pular camada por urgência editorial — proibido. Disciplina HBR não admite atalho.
- Aprovar Camada 5 com score < 70 sob justificativa "score não captou bem o tom" — proibido. Voice Guard é fonte de verdade.
- Publicar sem Camada 6 quando claim MEC presente — proibido. Esta é a maior exposição reputacional do programa.
- Auto-fix em camadas que exigem decisão humana — proibido.
- Re-submeter sem corrigir os bloqueios apontados — proibido (perda de SLA editorial).

## Cadência de revisão deste quality gate

| Atividade | Cadência | Owner |
|---|---|---|
| Recalibração de pesos do Voice Guard | Trimestral | Alexandre Caramaschi |
| Atualização das deny-lists de clichés | Mensal | Alexandre Caramaschi |
| Atualização da deny-list de naming | Mensal | Alexandre Caramaschi |
| Revisão das condições de Camada 6 | Trimestral | Alexandre Caramaschi + Jurídico IPOG |
| Auditoria de logs de publicação | Mensal | Bruno Azambuja |
| Revisão deste documento | Trimestral | Alexandre Caramaschi |
