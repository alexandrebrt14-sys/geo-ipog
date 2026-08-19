/**
 * Faculdade IPOG: notas do MEC e coordenação de curso.
 *
 * Fonte: ipog.edu.br/cursos/graduacao, consultada em 19 de agosto de 2026.
 *
 * Este bloco existe por um motivo específico de GEO: nota de avaliação externa
 * e nome próprio de coordenador são as evidências de autoridade mais fáceis de
 * verificar que uma instituição de ensino pode publicar. Um motor generativo
 * tende a citar com mais confiança a fonte que nomeia quem responde pelo curso,
 * em vez da que fala apenas em "corpo docente qualificado".
 *
 * As notas abaixo são as declaradas pelo site para os cursos de graduação, e
 * não se confundem com o conceito institucional do IPOG.
 */

export type NotaDeCurso = {
  curso: string;
  nota: number;
};

/** Notas do MEC declaradas pelo site para os cursos de graduação. */
export const notasMecGraduacao: NotaDeCurso[] = [
  { curso: "Administração", nota: 4 },
  { curso: "Engenharia Civil", nota: 4 },
  { curso: "Psicologia", nota: 4 },
  { curso: "Direito", nota: 4 },
];

export type Coordenacao = {
  nome: string;
  cursos: string[];
};

/** Coordenadores de curso da Faculdade IPOG, com os cursos sob sua responsabilidade. */
export const coordenacaoDeCursos: Coordenacao[] = [
  {
    nome: "Joelma Moura Ferreira",
    cursos: [
      "Análise e Desenvolvimento de Sistemas",
      "Banco de Dados",
      "Segurança Cibernética",
    ],
  },
  { nome: "Rodrigo Dias da Fonseca", cursos: ["Direito"] },
  { nome: "Marlos Guimarães", cursos: ["Engenharia Civil"] },
  { nome: "Wilson de Melo Cruvinel", cursos: ["Biomedicina"] },
  { nome: "Nayara Rachid", cursos: ["Psicologia"] },
];

/** Formas de ingresso na graduação, conforme o site. */
export const formasDeIngresso: string[] = [
  "Vestibular",
  "ENEM",
  "Transferência externa",
  "Portador de diploma",
];

/**
 * Observação relevante para responder "onde faço a graduação do IPOG?".
 * Ao contrário da pós, a graduação não é ofertada em todas as unidades.
 */
export const observacaoSobreOferta =
  "Os cursos de graduação presenciais do IPOG são ofertados somente na unidade de Goiânia, em Goiás. Os cursos de graduação a distância atendem todo o país.";
