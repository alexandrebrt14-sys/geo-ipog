# AGENTS.md

## Padrão editorial obrigatório

Antes de produzir qualquer texto de leitura humana neste repositório (peça editorial, página do portal, guia, FAQ, material didático, auditoria, relatório, descrição de PR, mensagem longa de commit), leia e aplique `DIRETRIZ_EDITORIAL.md` na raiz, versão 4 de 11/08/2026, com o anexo prático `GUIA_ESCRITA_HUMANIZADA.md`. A seção 14 da diretriz traz a aplicação ao escopo deste repositório: gênero por tipo de peça, portão da promessa educacional, nomenclatura das cinco modalidades canônicas e tratamento da prova quando o dado pertence ao IPOG.

Inegociável, em resumo:

- **Piso de substância (seção 2.1).** Toda peça tem tese identificável, evidência ligada à tese, ganho de informação, critério de decisão quando há alternativas, arco de leitura e consequência executável para o leitor. Aprovação em gate automático nunca equivale a aprovação editorial.
- **Prova antes da escrita (2.2).** O número de blocos que afirmam resultado é menor ou igual ao número de provas datadas disponíveis. Faltando prova: pesquisar a origem, reduzir a afirmação, restringir o uso, segurar a publicação. Só depois entram `[FALTA EVIDÊNCIA: o que buscar]` ou `[PREENCHER-HUMANO: o que falta]`, no lugar do dado e nunca da seção, com teto de cinco abertos por documento.
- **Narrativa (3).** Abertura em situação, tensão antes da solução, caso condutor com rótulo de tipo, promessa cumprida no corpo, fechamento com callback e um pedido por peça, contado por destino. Escassez fabricada ("últimas vagas", "turma fechando") está proibida.
- **Ritmo (4).** Nenhuma cota mecânica de cadência, em nenhuma direção. A amplitude do bloco de dez frases é diagnóstico do texto pronto, nunca alvo durante a escrita. A regra da v2 que mandava perseguir amplitude acima de 30 palavras está revogada.
- **Forma.** Português do Brasil com acentuação completa e tipografia brasileira, zero travessão em prosa, zero emoji, atribuição sempre nomeada, conectivo batido cortado por subtração e antítese "não é X, é Y" fora do padrão recorrente.
- **Revisão em três passadas (13).** Substância, estrutura e linguagem, nessa ordem. Todo símbolo de porcentagem dispara origem, data, método e denominador dentro da mesma frase.

Sub-agente que gera copy recebe o bloco de `C:/Sandyboxclaude/scripts/prompts/COPY_PROMPT_PREFIX.md` carimbado no início do prompt. Prompt de medição de citação em motor generativo (`prompts/KIT-PROMPTS-V0.md`, `prompts/QUERIES-REGIONAIS-CANONICAS.md`, `site/public/mcp/citation-prompts.json`) não recebe doutrina, porque instrução editorial dentro do prompt de coleta altera a resposta do motor e quebra a comparabilidade da série de Mention Rate.

Os documentos completos prevalecem sobre este resumo, e as convenções específicas deste repositório prevalecem sobre convenções genéricas, exceto quando comprometerem segurança ou corretude.
