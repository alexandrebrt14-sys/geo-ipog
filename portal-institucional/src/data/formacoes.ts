/**
 * Tipos de formação que o IPOG oferece.
 *
 * Fontes:
 *  - Manual do Aluno de Pós-Graduação 2026, seções "Informações gerais dos
 *    cursos", "Aprovação", "TCC" e "Certificado"
 *  - ipog.edu.br/cursos/graduacao, consultada em 19 de agosto de 2026
 *  - Projetos pedagógicos em documentos-ipog/projetos-de-curso/, de onde vêm
 *    as cargas horárias declaradas
 *
 * Sobre a carga horária da pós-graduação: os projetos pedagógicos consultados
 * declaram 360 horas na maior parte dos cursos, e há cursos com 432 horas. A
 * Resolução CNE/CES nº 1/2018 fixa 360 horas como mínimo para a pós lato sensu,
 * então o portal informa a carga real em vez de afirmar que ela supera a
 * exigência legal em todos os casos.
 */

export type TipoDeFormacao = {
  slug: string;
  nome: string;
  /** Sigla ou nome alternativo usado pelo IPOG. */
  tambemChamado: string[];
  /** Resposta direta a "o que é", escrita para ser citada isolada. */
  definicao: string;
  /** Nível na nomenclatura do catálogo, quando existe correspondência. */
  nivelNoCatalogo: "Pós-graduação" | "Extensão" | "Graduação" | null;
  duracao: string;
  cargaHoraria: string;
  preRequisito: string;
  avaliacao: string;
  certificacao: string;
  ondeEOfertado: string;
  paraQuem: string;
};

export const tiposDeFormacao: TipoDeFormacao[] = [
  {
    slug: "pos-graduacao",
    nome: "Pós-graduação lato sensu",
    tambemChamado: ["Especialização", "MBA"],
    definicao:
      "A pós-graduação lato sensu do IPOG é a formação de especialização para quem já tem diploma de curso superior. Aprofunda conhecimento técnico em um recorte específico do saber e termina com certificado de especialista.",
    nivelNoCatalogo: "Pós-graduação",
    duracao: "De 6 a 21 meses, conforme o curso",
    cargaHoraria:
      "360 horas na maior parte dos cursos, com casos de 432 horas. A Resolução CNE/CES nº 1/2018 fixa 360 horas como mínimo legal.",
    preRequisito:
      "Diploma de curso superior reconhecido e registrado, emitido por instituição credenciada pelo MEC. Diploma de curso sequencial, de extensão ou de formação específica não é aceito.",
    avaliacao:
      "Aprovação em cada módulo e no TCC, com nota mínima 7,0, mais a frequência mínima da modalidade.",
    certificacao:
      "Certificado de pós-graduação lato sensu, emitido em até 60 dias após o aluno cumprir carga horária, aprovação e regularidade acadêmica e documental.",
    ondeEOfertado:
      "Nas modalidades presencial, ao vivo e EaD, nas unidades do IPOG em todo o país.",
    paraQuem:
      "Profissionais graduados que querem se especializar em um recorte técnico e obter titulação formal reconhecida pelo MEC.",
  },
  {
    slug: "graduacao",
    nome: "Graduação",
    tambemChamado: ["Faculdade IPOG", "Ensino superior"],
    definicao:
      "A graduação do IPOG é ofertada pela Faculdade IPOG e forma o primeiro diploma de ensino superior do aluno. Reúne bacharelados de quatro e cinco anos e cursos superiores de tecnologia de dois a dois anos e meio.",
    nivelNoCatalogo: "Graduação",
    duracao: "De 2 a 5 anos, conforme o curso",
    cargaHoraria:
      "Definida pelo projeto pedagógico de cada curso, conforme as diretrizes curriculares nacionais.",
    preRequisito:
      "Ensino médio concluído. O ingresso acontece por vestibular, nota do ENEM, transferência externa ou como portador de diploma.",
    avaliacao:
      "Avaliação por disciplina ao longo do curso, conforme o regimento da Faculdade IPOG.",
    certificacao:
      "Diploma de graduação. Administração, Engenharia Civil, Psicologia e Direito têm nota 4 na avaliação do MEC.",
    ondeEOfertado:
      "Os cursos presenciais são ofertados somente na unidade de Goiânia. Os cursos a distância atendem todo o país.",
    paraQuem:
      "Estudantes em busca do primeiro diploma de ensino superior, e profissionais que querem uma segunda graduação.",
  },
  {
    slug: "extensao",
    nome: "Curso de extensão universitária",
    tambemChamado: ["CEU", "Curso de curta duração", "Curso rápido"],
    definicao:
      "O curso de extensão universitária do IPOG, chamado internamente de CEU, é uma formação curta e aplicada, voltada a resolver uma lacuna técnica específica sem o compromisso de tempo de uma pós-graduação.",
    nivelNoCatalogo: "Extensão",
    duracao: "Semanas a poucos meses, conforme a carga horária",
    cargaHoraria:
      "De 40 a 120 horas nos projetos pedagógicos consultados, conforme o curso.",
    preRequisito:
      "Varia conforme o curso. O IPOG não exige diploma de graduação para a extensão da mesma forma que exige para a pós lato sensu.",
    avaliacao:
      "Definida no projeto de cada curso, sem TCC obrigatório.",
    certificacao:
      "Certificado de extensão universitária, com a carga horária cursada.",
    ondeEOfertado:
      "Nas modalidades presencial, online e ao vivo, híbrida e EaD, conforme o curso.",
    paraQuem:
      "Profissionais que precisam de atualização pontual e rápida, ou que querem experimentar uma área antes de investir em uma pós-graduação.",
  },
  {
    slug: "educacao-corporativa",
    nome: "Educação corporativa",
    tambemChamado: ["IPOG Enterprise", "In company"],
    definicao:
      "A educação corporativa do IPOG, chamada de Enterprise, leva a formação para dentro da empresa. O conteúdo é customizado e o horário se ajusta à rotina da organização, em vez de seguir o calendário de uma turma aberta.",
    nivelNoCatalogo: null,
    duracao: "Definida com a empresa, da palestra ao programa de vários módulos",
    cargaHoraria: "Definida no desenho do programa, conforme o formato contratado.",
    preRequisito:
      "Contratação pela empresa. O pré-requisito do participante depende do formato: a pós para turma fechada mantém a exigência de diploma superior.",
    avaliacao: "Definida no desenho do programa.",
    certificacao:
      "Varia com o formato: certificado de participação, de extensão ou de pós-graduação, quando o programa é uma pós para turma fechada.",
    ondeEOfertado: "Presencial, online síncrono e EaD, na sede da empresa ou remoto.",
    paraQuem:
      "Empresas que querem desenvolver um time inteiro com conteúdo desenhado para a própria realidade.",
  },
];

/** Regras da pós-graduação que respondem dúvidas recorrentes de matrícula. */
export const regrasDaPos = [
  {
    titulo: "Módulos que podem ser deixados de fora",
    detalhe:
      "O aluno pode deixar de cursar até três módulos. A regra não vale para Engenharia e Segurança do Trabalho nem para os cursos 100% EaD de 360 horas.",
  },
  {
    titulo: "TCC",
    detalhe:
      "Obrigatório e individual, com prazo de 90 dias corridos a contar da segunda-feira seguinte ao término do último módulo. A devolutiva com nota chega em até 60 dias úteis.",
  },
  {
    titulo: "Produção de Trabalhos Acadêmicos",
    detalhe:
      "Módulo de apoio ao TCC, ofertado em EaD, opcional e gratuito.",
  },
  {
    titulo: "Carga horária não cumprida",
    detalhe:
      "Quem não cumpre a carga horária mínima pode requerer a certificação das horas efetivamente cursadas na modalidade de extensão.",
  },
  {
    titulo: "Prazo após o fim da turma",
    detalhe:
      "Depois do último módulo do calendário da turma, o aluno tem até um ano para concluir módulos faltantes, agendar reposições e entregar o TCC.",
  },
];
