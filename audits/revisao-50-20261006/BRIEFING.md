# Revisão de 50 páginas em cinco ondas
Data: 06/10/2026. Conteúdo educativo para escolha de formação e atuação responsável.
O clone foi criado limpo para esta tarefa, na branch codex/psicologia-50-paginas-20261006. Alterações de outros agentes nesta branch são esperadas e autorizadas; respeite a propriedade de arquivos.

## Doutrina editorial
Leia AGENTS.md, DIRETRIZ_EDITORIAL.md e GUIA_ESCRITA_HUMANIZADA.md. O prefixo C:/Sandyboxclaude/scripts/prompts/COPY_PROMPT_PREFIX.md foi procurado e não existe nesta máquina; aplicamos diretamente a doutrina versionada.
Prova antes da escrita. Tese clara, ganho de informação, comparação quando cabível, consequência executável. PT-BR acentuado, parágrafos coesos e justificados; sem emojis, travessões em prosa, estatísticas sem fonte, promessa de renda ou revisão clínica fictícia. Revise substância, estrutura e linguagem.
Corretude prevalece sobre taxonomia desatualizada da diretriz: MBA integra lato sensu, certificado de curso não concede automaticamente registro de especialista.

## Entrega por página
Leia o arquivo inteiro antes de editar. Faça revisão substancial de trechos defasados; não basta acrescentar um rodapé. Pode reestruturar amplamente quando a origem estiver contaminada, preservando URL, assunto principal, âncoras relevantes e ligações internas úteis.
Inclua: abertura concreta, critérios de decisão, exemplo hipotético claramente rotulado, roteiro aplicável, limites e fontes primárias específicas e verificadas. Fonte clássica válida não precisa ser substituída por ser antiga. Sem DOI, estudo ou número inventado.
Não publique tabelas salariais sem prova, estimativas de eficácia ou protocolos clínicos de autoaplicação. Conteúdo clínico deve ensinar a avaliar evidência/formação e buscar cuidado, sem prescrever tratamento.
Atualização editorial em 06/10/2026; não inventar revisão por Larissa ou Alexandre. Em JSON-LD preservar publicador/autoria institucional; não criar reviewedBy pessoal sem revisão real.
Use schema Article e FAQPage com paridade entre perguntas visíveis e schema; datas reais são geradas por Git. Use Base/Breadcrumbs e estilo existente.
Adicione uma leitura complementar pertinente de alexandrecaramaschi.com/educacao. Explique a tarefa educacional que ela apoia, sem atribuir eficácia clínica, título profissional ou pós-graduação ao certificado.
Cada página recebe uma ficha específica:
import StudyWorksheet from '@components/StudyWorksheet.astro';
<StudyWorksheet id="ficha-pratica" title="Título específico" description="Finalidade específica de planejamento educativo" fields={[{label:'Campo',hint:'O que registrar, sem dados pessoais'}, ...]} checklist={['Critério verificável', ...]} />
O root criará esse componente. Use três a cinco campos e três a cinco critérios personalizados. A ficha permite copiar e baixar TXT, opera apenas em memória do navegador, não diagnostica nem envia dados. Não editar o componente compartilhado.
Inclua pelo menos dois links internos pertinentes existentes. Não alterar site/src/lib/data.ts nem layouts/componentes compartilhados.

## Recursos educacionais verificados
https://alexandrecaramaschi.com/educacao/escrever-bem-com-ia : inventário de provas e revisão factual; não metodologia científica completa.
https://alexandrecaramaschi.com/educacao/letramento-ia-executivos : fontes, dados, riscos e revisão humana.
https://alexandrecaramaschi.com/educacao/eeat-qualidade : autoria, evidências e leitura crítica.
https://alexandrecaramaschi.com/educacao/dados-com-python : limpeza/análise de dados públicos ou sintéticos; não diagnóstico.
https://alexandrecaramaschi.com/educacao/segundo-cerebro-agentes-pessoais : organização de bibliografia pública; nunca prontuários.
https://alexandrecaramaschi.com/educacao/prompt-engineering-avancado : estruturar tarefas e validar saídas.
https://alexandrecaramaschi.com/educacao/glossario-dev-fullstack-vibecoding : avaliar software, permissões e aceite.
Cursos do portal são complementares. Não assumir cadastro, funções premium ou preços.

## Apuração regulatória confirmada
CFP 9/2024: TDIC, revogou 11/2018 e 4/2020; e-Psi deixou de ser exigido.
CFP 23/2022, alterada pela 17/2025: registro de especialista. CFP 31/2022: avaliação psicológica/SATEPSI, revoga 9/2018. CFP 6/2019: documentos escritos.
NR-1 capítulo 1.5 com fatores psicossociais: vigência em 26/05/2026, conforme Portaria MTE 765/2025. Sem profissão exclusiva universal, sem questionário único obrigatório; avaliar condições/organização do trabalho, não fazer rastreio diagnóstico individual como substituto.
Fonte principal NR1: https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-1
FAQ MTE 2026: https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/manuais-e-publicacoes/2026/perguntas-e-respostas-gro-pgr-maio-2026
SATEPSI: https://satepsi.cfp.org.br/faq.cfm
Especialista: https://site.cfp.org.br/servicos/titulo-de-especialista/

## Relato da onda
Grave audits/revisao-50-20261006/onda-N.json: array de objetos {route, corrections: [textos], sources: [URLs], oldSentinel: 'frase literal antiga retirada do HTML público', newSentinel: 'frase literal nova única e visível'}.
Sentinelas devem ser texto contínuo sem interpolação/markup, distinguíveis por página. Root vai verificar as 50 páginas servidas.
Não faça commit, push ou deploy; root integra e valida.
