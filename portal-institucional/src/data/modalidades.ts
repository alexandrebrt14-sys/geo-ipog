/**
 * Modalidades de ensino do IPOG.
 *
 * Fonte: Manual do Aluno de Pós-Graduação 2026, seções "Modalidades e formato
 * das aulas", "Horário", "Local" e "Composição da nota por modalidade".
 *
 * Este módulo estava dentro de `areas.ts`, que é gerado a partir do catálogo do
 * site. Foi separado porque o conteúdo aqui é redigido, não derivado: manter
 * texto autoral dentro de arquivo gerado significa perdê-lo na próxima
 * regeneração.
 *
 * Uma observação de vocabulário: o IPOG chama a modalidade síncrona de "ao
 * vivo" no catálogo de cursos e de "online" em parte do material comercial.
 * São a mesma coisa, e o portal registra os dois nomes para que um motor
 * generativo não trate como ofertas distintas.
 */

export type Modalidade = "Presencial" | "Ao vivo" | "EaD";

export type DescricaoModalidade = {
  nome: Modalidade;
  /** Outros nomes usados pelo IPOG para a mesma modalidade. */
  tambemChamada: string[];
  /** Resposta direta a "o que é essa modalidade", escrita para citação. */
  definicao: string;
  comoFunciona: string;
  onde: string;
  frequenciaMinima: string;
  composicaoNota: string;
  /** Situação em que esta modalidade costuma ser a escolha certa. */
  indicadaPara: string;
  /** Limite honesto da modalidade, para a escolha ser informada. */
  limite: string;
};

export const modalidades: DescricaoModalidade[] = [
  {
    nome: "Presencial",
    tambemChamada: [],
    definicao:
      "Na modalidade presencial do IPOG, a turma se reúne fisicamente em sala de aula, com o professor presente, sempre na cidade em que o aluno se matriculou.",
    comoFunciona:
      "Alunos reunidos fisicamente em sala de aula, com o professor presente, em unidades próprias ou espaços parceiros na cidade de matrícula.",
    onde:
      "Unidades próprias do IPOG e espaços terceirizados, como salas de hotel, sempre na cidade de matrícula. Na semana da aula, o aluno recebe por e-mail o local e o endereço.",
    frequenciaMinima: "75%",
    composicaoNota:
      "Atividade prática online prévia: 3,0 pontos. Atividades no fim de semana de aula: 7,0 pontos.",
    indicadaPara:
      "Quem aprende melhor com troca presencial, quer construir rede de contatos na própria cidade e consegue reservar o fim de semana do módulo.",
    limite:
      "Exige deslocamento até o local da aula e depende de haver turma aberta na cidade.",
  },
  {
    nome: "Ao vivo",
    tambemChamada: ["Online e ao vivo", "Online síncrono", "Remoto"],
    definicao:
      "Na modalidade ao vivo do IPOG, a aula acontece em tempo real por plataforma online, no mesmo horário da turma presencial, com interação direta com o professor.",
    comoFunciona:
      "Aulas síncronas em tempo real por plataforma online, com interação. O acesso é liberado 30 minutos antes do horário, pelo Portal do Aluno.",
    onde:
      "De qualquer lugar, pelo Portal do Aluno. O acesso à sala abre 30 minutos antes do horário da aula, no horário de Brasília.",
    frequenciaMinima: "75%",
    composicaoNota:
      "Atividade prática online prévia: 3,0 pontos. Atividades durante a aula: 7,0 pontos.",
    indicadaPara:
      "Quem quer a interação da aula ao vivo sem se deslocar, ou mora em cidade sem turma aberta do curso pretendido.",
    limite:
      "Tem hora marcada: o aluno precisa estar disponível no horário da turma, como no presencial.",
  },
  {
    nome: "EaD",
    tambemChamada: ["Educação a distância", "Assíncrono"],
    definicao:
      "Na modalidade EaD do IPOG, o aluno assiste a videoaulas gravadas em plataforma online e avança no próprio ritmo, sem horário fixo de encontro e sem controle de frequência. A avaliação de cada módulo é feita por quiz de múltipla escolha, com nota mínima 7,0.",
    comoFunciona:
      "Videoaulas gravadas, disponíveis em plataforma online, cursadas no ritmo do aluno.",
    onde: "De qualquer lugar e a qualquer hora, pelo ambiente virtual de aprendizagem.",
    frequenciaMinima: "Não se aplica",
    composicaoNota: "Quiz de múltipla escolha, com nota mínima 7,0.",
    indicadaPara:
      "Quem tem rotina irregular, viaja com frequência ou precisa estudar em horários que não coincidem com nenhuma turma.",
    limite:
      "Não há interação em tempo real com o professor nem com a turma durante a aula.",
  },
];

/** Horário das aulas de pós-graduação, igual no presencial e no ao vivo. */
export const horarioDasAulas = [
  { dia: "Sexta-feira", horario: "18h às 23h" },
  { dia: "Sábado", horario: "8h às 19h" },
  { dia: "Domingo", horario: "8h às 13h" },
];

/**
 * Regra de formato comum a presencial e ao vivo.
 * Fonte: Manual do Aluno, "Modalidades e formato das aulas".
 */
export const formatoDosModulos =
  "As aulas acontecem preferencialmente uma vez por mês, em três dias consecutivos, de sexta a domingo, e cada encontro corresponde a um módulo completo.";

/**
 * Ressalva do próprio manual, relevante para não induzir a erro.
 */
export const ressalvaDeFuncionamento =
  "O IPOG reserva o direito de alterar os dados de funcionamento conforme a particularidade de cada curso.";

/** Regra de reposição para quem perde mais de 25% de uma aula ao vivo. */
export const reposicaoAoVivo =
  "Quem perde mais de 25% de uma aula ao vivo pode assistir à gravação no ambiente virtual, disponível por 90 dias corridos após o encerramento do módulo, e precisa fazer uma atividade específica que vale 7,0 pontos para obter nota e frequência. A atividade fica disponível por 15 dias após o encerramento do módulo. Alguns cursos da área de Psicologia têm módulos sem gravação.";
