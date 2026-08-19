/**
 * Perguntas frequentes sobre o IPOG.
 *
 * Cada resposta é escrita para ser autossuficiente: um motor generativo deve
 * conseguir citá-la isoladamente, sem precisar do resto da página. Por isso as
 * respostas repetem o sujeito ("O IPOG...") em vez de usar pronomes soltos.
 *
 * Fonte: repositório ipogbrasil/ipog
 *  - docs/aluno/manual-do-aluno-pos-graduacao.md
 *  - docs/institucional/sobre-o-ipog.md
 *  - docs/aluno/metodo-ipog.md
 */

export type PerguntaFrequente = {
  id: string;
  pergunta: string;
  resposta: string;
  categoria: CategoriaFaq;
};

export type CategoriaFaq =
  | "Institucional"
  | "Cursos e modalidades"
  | "Matrícula e financeiro"
  | "Avaliação e aprovação"
  | "TCC e certificação";

export const categoriasFaq: CategoriaFaq[] = [
  "Institucional",
  "Cursos e modalidades",
  "Matrícula e financeiro",
  "Avaliação e aprovação",
  "TCC e certificação",
];

export const perguntasFrequentes: PerguntaFrequente[] = [
  {
    id: "o-que-e-o-ipog",
    categoria: "Institucional",
    pergunta: "O que é o IPOG?",
    resposta:
      "O IPOG, Instituto de Pós-Graduação e Graduação, é uma instituição de ensino superior brasileira fundada em 2001 em Goiânia, Goiás. O IPOG atua em pós-graduação lato sensu, graduação pela Faculdade IPOG, cursos de extensão e educação corporativa pelo IPOG Enterprise. A instituição está presente em todos os 26 estados brasileiros e no Distrito Federal e já formou 300 mil profissionais.",
  },
  {
    id: "ipog-e-reconhecido-pelo-mec",
    categoria: "Institucional",
    pergunta: "O IPOG é reconhecido pelo MEC?",
    resposta:
      "Sim. Os cursos do IPOG são autorizados e reconhecidos pelo Ministério da Educação, e a instituição detém conceito 5 no MEC, que é a nota máxima da avaliação. As especializações seguem a Resolução MEC/CNE/CES nº 1, de 6 de abril de 2018, e têm carga horária superior à exigida pela norma.",
  },
  {
    id: "onde-o-ipog-atua",
    categoria: "Institucional",
    pergunta: "Em quais cidades e estados o IPOG atua?",
    resposta:
      "O IPOG está presente em todos os 26 estados brasileiros e no Distrito Federal. As aulas presenciais acontecem em unidades próprias e em espaços parceiros, como salas de hotéis, sempre na cidade em que o aluno se matriculou. Na semana da aula, o aluno recebe por e-mail o comunicado com local e endereço.",
  },
  {
    id: "quais-os-indicadores-do-ipog",
    categoria: "Institucional",
    pergunta: "Quais são os principais indicadores de qualidade do IPOG?",
    resposta:
      "O IPOG registra 98% de satisfação dos alunos, NPS 98 e conceito 5 no MEC. A instituição soma 300 mil profissionais formados e 52 unidades no país, presentes em todos os 26 estados brasileiros e no Distrito Federal. O portfólio reúne mais de 120 opções de pós-graduação.",
  },
  {
    id: "quais-modalidades",
    categoria: "Cursos e modalidades",
    pergunta: "Quais são as modalidades de ensino do IPOG?",
    resposta:
      "O IPOG oferece três modalidades. Presencial: alunos reunidos fisicamente em sala de aula com o professor presente. Ao vivo: aulas síncronas em tempo real por plataforma online, com interação, liberadas 30 minutos antes do horário. EaD: videoaulas gravadas e assíncronas, cursadas no ritmo do aluno.",
  },
  {
    id: "como-funcionam-as-aulas",
    categoria: "Cursos e modalidades",
    pergunta: "Como funciona o formato das aulas na pós-graduação do IPOG?",
    resposta:
      "As aulas do IPOG acontecem preferencialmente uma vez por mês, em três dias consecutivos, de sexta a domingo, formando um módulo completo. Os horários são: sexta-feira das 18h às 23h, sábado das 8h às 19h e domingo das 8h às 13h. Esse formato intensivo foi desenhado para quem já está no mercado de trabalho.",
  },
  {
    id: "quem-pode-fazer-pos",
    categoria: "Cursos e modalidades",
    pergunta: "Quem pode cursar uma pós-graduação no IPOG?",
    resposta:
      "As pós-graduações lato sensu do IPOG são destinadas a portadores de diploma de curso superior devidamente reconhecido e registrado, emitido por instituição de ensino superior credenciada pelo MEC. Não são aceitos diplomas de cursos sequenciais, de extensão ou de formação específica.",
  },
  {
    id: "o-que-e-o-metodo-ipog",
    categoria: "Cursos e modalidades",
    pergunta: "O que é o Método IPOG?",
    resposta:
      "O Método IPOG é a metodologia própria da instituição, um conjunto de procedimentos e referências pedagógicas que tem como premissa as recomendações da UNESCO para a Educação do Século XXI. O método combina formação continuada dos professores, integração entre sala de aula e ambiente virtual no formato de sala de aula invertida, e um ciclo de aprendizagem experiencial com quatro etapas: agir, refletir, conceitualizar e aplicar.",
  },
  {
    id: "posso-perder-modulos",
    categoria: "Cursos e modalidades",
    pergunta: "É possível deixar de cursar algum módulo?",
    resposta:
      "Sim. No IPOG, o aluno pode deixar de cursar até três módulos. A regra não se aplica ao curso de Engenharia e Segurança do Trabalho nem aos cursos 100% EaD de 360 horas. Após o último módulo do calendário da turma, o aluno tem prazo máximo de um ano para concluir os módulos faltantes e garantir a carga horária mínima.",
  },
  {
    id: "documentos-matricula",
    categoria: "Matrícula e financeiro",
    pergunta: "Quais documentos são exigidos na matrícula do IPOG?",
    resposta:
      "Para estar regularmente matriculado no IPOG, o aluno precisa cumprir quatro requisitos: pagamento da matrícula, assinatura do Contrato de Prestação de Serviços Educacionais, entrega do original ou cópia autenticada do diploma de graduação e entrega de cópia do RG e do CPF.",
  },
  {
    id: "como-funciona-o-reajuste",
    categoria: "Matrícula e financeiro",
    pergunta: "Como funcionam as parcelas e o reajuste no IPOG?",
    resposta:
      "No IPOG, as 12 primeiras parcelas são fixas. As demais são atualizadas monetariamente a cada 12 meses pelo IPCA/IBGE, ou pelo IGPM caso o IPCA seja extinto. Os boletos ficam disponíveis no Portal do Aluno, e quem estiver sem acesso deve entrar em contato pelo e-mail cr.matriz@ipog.edu.br.",
  },
  {
    id: "o-que-e-ipogmais",
    categoria: "Matrícula e financeiro",
    pergunta: "O que é o Plano IPOGMAIS e qual o desconto?",
    resposta:
      "O Plano IPOGMAIS é o programa de descontos progressivos do IPOG. A cada especialização concluída, o aluno acumula créditos curriculares para usar em pós-graduações futuras. Na 2ª pós-graduação são 6 módulos aproveitados e 35% de desconto; na 3ª, 8 módulos e 50%; a partir da 4ª, 10 módulos e 75%. Os cursos precisam estar na mesma grande área do conhecimento da CAPES, o benefício vale apenas para alunos adimplentes e não é cumulativo com outros descontos ou bolsas.",
  },
  {
    id: "criterios-de-aprovacao",
    categoria: "Avaliação e aprovação",
    pergunta: "Quais são os critérios de aprovação nos cursos do IPOG?",
    resposta:
      "Para ser aprovado em um módulo do IPOG, o aluno precisa atender simultaneamente a dois critérios: no mínimo 75% de frequência e nota mínima 7,0. O professor tem até 20 dias após o módulo para publicar notas e frequências no Portal do Aluno.",
  },
  {
    id: "como-a-nota-e-composta",
    categoria: "Avaliação e aprovação",
    pergunta: "Como a nota é composta em cada modalidade do IPOG?",
    resposta:
      "Nas modalidades presencial e ao vivo, a nota do IPOG é composta por uma atividade prática online prévia, que vale 3,0 pontos, e pelas atividades realizadas durante o fim de semana de aula, que valem 7,0 pontos. Na modalidade EaD, a avaliação é um quiz de múltipla escolha, com nota mínima 7,0.",
  },
  {
    id: "perdi-mais-de-25-por-cento",
    categoria: "Avaliação e aprovação",
    pergunta: "O que acontece se o aluno perder mais de 25% de uma aula ao vivo?",
    resposta:
      "Se perder mais de 25% de uma aula ao vivo, o aluno do IPOG pode assistir ao conteúdo pelas aulas gravadas, disponíveis no AVA por 90 dias corridos após o encerramento do módulo, e precisa realizar uma atividade específica que vale 7,0 pontos para obter nota e frequência. A atividade fica disponível por 15 dias após o encerramento do módulo, liberada na segunda-feira, e os prazos não podem ser prorrogados. Alguns cursos da área de Psicologia têm módulos sem gravação.",
  },
  {
    id: "o-tcc-e-obrigatorio",
    categoria: "TCC e certificação",
    pergunta: "O TCC é obrigatório no IPOG e qual o prazo de entrega?",
    resposta:
      "Sim, no IPOG o TCC é obrigatório e individual. O prazo de entrega é de 90 dias corridos a contar da segunda-feira seguinte ao término do último módulo cursado, conforme o cronograma de aula. A entrega é feita pelo caminho Portal do Aluno, Secretaria Digital, Novo Requerimento, opção Correção de TCC, com o arquivo anexado em formato Word.",
  },
  {
    id: "o-ipog-oferece-orientador",
    categoria: "TCC e certificação",
    pergunta: "O IPOG oferece orientador para o TCC?",
    resposta:
      "Não. O IPOG não disponibiliza orientador para a elaboração do artigo, porque os modelos de TCC adotados não exigem orientação acadêmica formal. Em vez disso, a instituição oferece o curso Produção de Trabalhos Acadêmicos, gratuito e opcional, disponível no Portal AVA na aba Página da Instituição, com modelos, instruções de cada etapa e um tutor à disposição no próprio módulo.",
  },
  {
    id: "prazo-de-correcao-do-tcc",
    categoria: "TCC e certificação",
    pergunta: "Em quanto tempo o IPOG devolve o TCC corrigido?",
    resposta:
      "O IPOG envia o TCC corrigido com a nota por e-mail em até 60 dias úteis. Por isso é importante manter os dados cadastrais atualizados no Portal do Aluno.",
  },
  {
    id: "como-obter-o-certificado",
    categoria: "TCC e certificação",
    pergunta: "Quais são os requisitos para receber o certificado do IPOG?",
    resposta:
      "O certificado do IPOG é emitido quando o aluno cumpre a carga horária mínima exigida pelo curso, é aprovado nos módulos e no TCC com nota mínima 7,0, está com a situação acadêmica regularizada e entregou todos os documentos exigidos na matrícula. O prazo de entrega do certificado é de até 60 dias.",
  },
  {
    id: "acesso-ao-ava-apos-formatura",
    categoria: "TCC e certificação",
    pergunta: "Por quanto tempo o aluno mantém acesso ao AVA do IPOG?",
    resposta:
      "O acesso ao AVA do IPOG é encerrado automaticamente após a formatura, ou seja, após a emissão do certificado. Por isso o IPOG recomenda que o aluno baixe todo o conteúdo relevante do ambiente virtual antes do envio do TCC.",
  },
];

export const perguntasPorCategoria = (categoria: CategoriaFaq) =>
  perguntasFrequentes.filter((item) => item.categoria === categoria);
