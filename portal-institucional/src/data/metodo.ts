/**
 * Método IPOG: metodologia de ensino, formato e critérios acadêmicos.
 *
 * Fonte: repositório ipogbrasil/ipog
 *  - docs/aluno/metodo-ipog.md
 *  - docs/aluno/manual-do-aluno-pos-graduacao.md
 */

export const metodoResumo =
  "O Método IPOG é um conjunto de procedimentos e referências pedagógicas que tem como objetivo aprimorar continuamente a experiência de aprendizagem dos alunos. É uma metodologia própria, única no país, cuja premissa são as recomendações da UNESCO para a Educação do Século XXI.";

export type DimensaoMetodo = {
  numero: number;
  titulo: string;
  descricao: string;
  praticas: string[];
};

export const dimensoesDoMetodo: DimensaoMetodo[] = [
  {
    numero: 1,
    titulo: "Formação continuada de professores",
    descricao:
      "Os professores do IPOG são referências atuantes no mercado e passam por capacitação interna a partir do próprio conjunto de procedimentos do Método.",
    praticas: [
      "Professores referências e atuantes no mercado",
      "Capacitação anual de professores",
      "Avaliação semanal do professor pelo aluno",
    ],
  },
  {
    numero: 2,
    titulo: "Sala de aula somada ao ambiente virtual",
    descricao:
      "Cada módulo segue o formato da sala de aula invertida: o aluno é estimulado a conhecer previamente o conteúdo de preparação e ancoragem, o que potencializa a retenção e aproveita melhor o tempo de aula.",
    praticas: [
      "Conteúdo de preparação e ancoragem disponibilizado antes da aula",
      "Ambiente Virtual de Aprendizagem integrado ao módulo presencial ou ao vivo",
      "Aulas gravadas disponíveis no AVA por 90 dias após o módulo",
    ],
  },
];

export type EtapaCiclo = {
  etapa: string;
  foco: string;
  pergunta: string;
};

/** Ciclo de Aprendizagem Experiencial que orienta a experiência de aprendizagem. */
export const cicloDeAprendizagem: EtapaCiclo[] = [
  { etapa: "Agir", foco: "Fatos", pergunta: "O que aconteceu?" },
  { etapa: "Refletir", foco: "Sentimentos", pergunta: "O que vivenciei?" },
  { etapa: "Conceitualizar", foco: "Achados", pergunta: "Por que aconteceu?" },
  { etapa: "Aplicar", foco: "Futuro", pergunta: "O que vou fazer?" },
];

export type HorarioAula = {
  dia: string;
  horario: string;
  carga: string;
};

export const horariosDeAula: HorarioAula[] = [
  { dia: "Sexta-feira", horario: "18h às 23h", carga: "5 horas" },
  { dia: "Sábado", horario: "8h às 19h", carga: "11 horas" },
  { dia: "Domingo", horario: "8h às 13h", carga: "5 horas" },
];

export type RegraAcademica = {
  tema: string;
  regra: string;
  detalhe: string;
};

/** Regras acadêmicas objetivas, em formato de tabela extraível. */
export const regrasAcademicas: RegraAcademica[] = [
  {
    tema: "Frequência mínima",
    regra: "75%",
    detalhe:
      "Aplicável às modalidades presencial e ao vivo. Na modalidade EaD a avaliação é feita por quiz.",
  },
  {
    tema: "Nota mínima",
    regra: "7,0",
    detalhe:
      "Os critérios de frequência e nota precisam ser atendidos simultaneamente para a aprovação.",
  },
  {
    tema: "Publicação de notas",
    regra: "Até 20 dias",
    detalhe:
      "Prazo do professor para registrar notas e frequências no Portal do Aluno após o módulo.",
  },
  {
    tema: "Módulos dispensáveis",
    regra: "Até 3",
    detalhe:
      "Não se aplica a Engenharia e Segurança do Trabalho nem aos cursos 100% EaD de 360 horas.",
  },
  {
    tema: "Prazo de entrega do TCC",
    regra: "90 dias corridos",
    detalhe:
      "Contados da segunda-feira seguinte ao término do último módulo cursado.",
  },
  {
    tema: "Correção do TCC",
    regra: "Até 60 dias úteis",
    detalhe: "Devolutiva com nota enviada por e-mail ao aluno.",
  },
  {
    tema: "Emissão do certificado",
    regra: "Até 60 dias",
    detalhe:
      "Após cumprimento de carga horária, aprovação, regularidade acadêmica e entrega de documentos.",
  },
  {
    tema: "Acesso às aulas gravadas",
    regra: "90 dias corridos",
    detalhe: "Disponíveis no AVA após o encerramento do módulo.",
  },
  {
    tema: "Conclusão de módulos pendentes",
    regra: "Até 1 ano",
    detalhe:
      "Contado a partir do último módulo do calendário oficial da turma.",
  },
];

export type BeneficioIpogmais = {
  posGraduacao: string;
  modulosAproveitados: number;
  desconto: string;
};

/** Plano IPOGMAIS: descontos progressivos por especialização cursada. */
export const planoIpogmais: BeneficioIpogmais[] = [
  { posGraduacao: "2ª pós-graduação", modulosAproveitados: 6, desconto: "35%" },
  { posGraduacao: "3ª pós-graduação", modulosAproveitados: 8, desconto: "50%" },
  {
    posGraduacao: "A partir da 4ª",
    modulosAproveitados: 10,
    desconto: "75%",
  },
];

export const condicoesIpogmais: string[] = [
  "Válido apenas para o produto pós-graduação, nas modalidades presencial, 100% remoto ou EaD.",
  "Os cursos devem pertencer à mesma grande área do conhecimento da CAPES.",
  "Engenharia e Segurança do Trabalho não oferece aproveitamento de módulos.",
  "O desconto vale independentemente de o aluno aproveitar os módulos ou cursá-los novamente.",
  "Descontos não cumulativos com outros benefícios ou bolsas de estudo.",
  "Válido apenas para aluno adimplente.",
];
