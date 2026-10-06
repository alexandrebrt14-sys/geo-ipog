# Segunda revisão editorial: 50 páginas adicionais

Pedido do proprietário em 6 de outubro de 2026: atualizar outras 50 páginas, pesquisando as mesmas fontes e fazendo crosslinks cuidadosamente. O primeiro lote foi publicado pelo PR 185; suas 50 rotas são excluídas deste lote. Preservar as URLs e as datas de publicação originais, registrando a revisão editorial atual.

## Método e responsabilidades

Cinco ondas de dez páginas, com especialistas trabalhando em paralelo e revisão cruzada. Cada agente altera somente as páginas e o relato da onda atribuída. O orquestrador cuida de componentes compartilhados, captura anterior, integração, testes e publicação. Todos compartilham o repositório: não reverter alterações de outros agentes, não fazer commit/push/deploy e não iniciar servidores.

Leia `DIRETRIZ_EDITORIAL.md` e `GUIA_ESCRITA_HUMANIZADA.md`. O prefixo externo `C:/Sandyboxclaude/scripts/prompts/COPY_PROMPT_PREFIX.md` não foi encontrado na primeira revisão; a doutrina versionada do projeto governa a produção. A corretude prevalece sobre a antiga classificação editorial de MBA como modalidade independente.

## Conteúdo e evidência

Antes de escrever, ler o artigo existente inteiro e levantar suas afirmações, fontes e finalidade. Pesquisar fontes primárias atuais para normas e alegações clínicas; artigos científicos clássicos podem permanecer quando pertinentes, com sua data real. Abrir a fonte e conferir o conteúdo, além da disponibilidade do endereço. Não inventar DOI, percentuais, salários, eficácia, casos atendidos, comparação de modelos de IA, revisão clínica pessoal ou oferta institucional.

Cada página deve ter uma pergunta útil, uma tese demonstrada, decisão ou orientação prática, limites e um exemplo explicitamente hipotético quando usado. Preservar conceitos válidos e aumentar a utilidade do texto. Remover ou restringir afirmações sem prova, sem transformar o artigo numa sequência genérica de ressalvas. Nas páginas de saúde, não apresentar ficha como rastreio, diagnóstico, prescrição ou substituição de avaliação profissional.

Escrever em português do Brasil, com acentos. Não atribuir revisão pessoal a Alexandre ou Larissa por causa de um crosslink. O artigo pode usar autoria editorial da organização Brasil GEO. Biografias e dados profissionais exigem confirmação própria; não serão ampliados por inferência.

## Links e ferramenta prática

Cada página inclui ao menos um recurso específico e pertinente do portal educacional de Alexandre, com explicação concreta de como aprofundar o estudo. Consultar o conteúdo do destino, não somente seu título. Cursos complementares não equivalem automaticamente a pós-graduação, formação clínica ou habilitação.

Links de Larissa serão usados onde ajudarem a leitura sobre adultos autistas, comunicação, suporte, orientação diagnóstica, supervisão ou prática clínica. Eles não substituem fontes normativas ou evidência de eficácia. Evitar destino com informação desatualizada na passagem usada. Preservar limites entre conteúdo educativo e contratação de serviço; não inferir agenda, preço ou resultado clínico.

Reutilizar `@components/StudyWorksheet.astro`, sem nova dependência. Cada página deve ter uma ficha específica, com objetivo, campos e critérios de conferência adequados ao assunto. Interface:

```astro
<StudyWorksheet
  id="ficha-pratica"
  title="Título específico da ferramenta"
  description="Finalidade e contexto de uso"
  fields={[{ label: 'Campo', hint: 'Pergunta orientadora concreta' }]}
  checklist={['Critério de conferência verificável']}
/>
```

O componente já oferece privacidade, cópia, download e limpeza. Não criar testes clínicos, escores automáticos ou armazenamento de informações pessoais. Usar exemplos públicos ou fictícios.

## Estrutura e validação

Reutilizar os layouts existentes aprovados. `Base` já inclui `main`: não criar outro. Usar `pageType="article"`; emitir Article e FAQPage com conteúdo equivalente ao visível. Uma única H1. Preservar IDs/âncoras referenciados quando possível e todos os links internos válidos. Copiar padrões de tema claro/escuro já verificados, sem impor cores escuras fixas ao conteúdo.

Conferir `baseline.json` antes de finalizar: quando a data pública original diferir da data de adição no Git, passar `datePublished` explicitamente para preservar o dado público. A data de modificação é derivada do commit. Exibir revisão editorial em 06/10/2026, sem afirmar revisão clínica individual.

Registrar `onda-N.json` como array de dez objetos:

```json
{"route":"/rota/","corrections":["Correção concreta"],"sources":["https://fonte-primaria.example/"],"oldSentinel":"Frase literal antiga retirada","newSentinel":"Frase literal nova e distintiva"}
```

As sentinelas devem ser texto visível contínuo. A antiga precisa existir na captura pública anterior, não apenas no código-fonte. O orquestrador verificará os 50 pares no build e depois no site público. Revisão de conteúdo, compilação e checagem de fontes complementam os gates; aprovação automática não substitui leitura editorial.

## Recursos e publicação

Sem novas mídias pesadas ou dependências. A publicação seguirá o pipeline existente do Cloudflare Pages, após preflight, testes e PR. Confirmar o domínio público com os 50 pares de sentinelas. Merge isolado não comprova publicação.
