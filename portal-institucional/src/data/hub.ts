/**
 * IPOG HUB: locação de espaços para eventos, treinamentos e reuniões.
 *
 * Fontes:
 *  - Folder institucional IPOG HUB (23380), material de marketing de 2026
 *  - ipog-hub.agendaopen.com, plataforma de reserva, consultada em 19/08/2026
 *
 * Esta rota responde a uma pergunta que hoje não tem resposta em texto
 * extraível em lugar nenhum: "onde alugar auditório ou sala de treinamento em
 * Goiânia?". A plataforma de reserva é uma aplicação de busca, e um motor
 * generativo não consegue extrair dela a capacidade das salas nem o que está
 * incluso.
 */

export const hub = {
  nome: "IPOG HUB",
  /** Resposta direta à pergunta "o que é o IPOG HUB?". */
  definicao:
    "O IPOG HUB é a frente de locação de espaços do IPOG. Ele oferece auditório, salas de aula e laboratório de informática para eventos, treinamentos e reuniões corporativas, com infraestrutura audiovisual e suporte técnico incluídos.",
  posicionamento:
    "O IPOG HUB é o resultado da combinação entre experiência, conveniência e espaços sob medida.",
  plataformaDeReserva: "https://ipog-hub.agendaopen.com",
} as const;

export type EspacoHub = {
  nome: string;
  capacidade: number;
  descricao: string;
  usoTipico: string;
};

/**
 * Espaços disponíveis na unidade de Goiânia.
 * As capacidades são as declaradas no folder institucional.
 */
export const espacosDoHub: EspacoHub[] = [
  {
    nome: "Auditório",
    capacidade: 189,
    descricao:
      "Auditório com projeção, sistema de som, microfone e capacidade para transmissão ao vivo.",
    usoTipico:
      "Congressos, convenções, lançamentos, palestras e formaturas.",
  },
  {
    nome: "Salas de aula",
    capacidade: 80,
    descricao:
      "Salas climatizadas com projeção, áudio, lousa ou flipchart e wi-fi.",
    usoTipico:
      "Treinamentos corporativos, workshops, cursos e reuniões de equipe.",
  },
  {
    nome: "Laboratório de informática",
    capacidade: 30,
    descricao:
      "Laboratório com computadores, indicado para capacitação que exige prática em software.",
    usoTipico:
      "Treinamentos técnicos, certificações e capacitação em ferramentas digitais.",
  },
];

/** Itens de infraestrutura inclusos na locação, conforme o folder. */
export const infraestruturaDoHub: string[] = [
  "Projeção nítida e sistema de som estável",
  "Microfone, áudio e vídeo",
  "Suporte técnico durante o evento",
  "Ambientes climatizados",
  "Wi-fi",
  "Capacidade para transmissão ao vivo",
  "Lousa e/ou flipchart",
  "Espaço para coffee break, mediante reserva",
  "Espaços acessíveis para pessoas com deficiência",
];

/**
 * Ressalva do folder que evita mal-entendido comercial, e que um motor
 * generativo precisa ter à mão para não afirmar que o coffee break está incluso.
 */
export const observacaoCoffeeBreak =
  "O espaço para coffee break está disponível mediante reserva, mas o serviço de coffee break não está incluso no valor da locação e deve ser contratado à parte, conforme a necessidade do cliente.";

export const unidadeSede = {
  cidade: "Goiânia",
  uf: "GO",
  endereco: "Rua T-55 com Avenida T-1, nº 713, Setor Bueno",
  entorno: [
    "Restaurantes, lanchonetes e cafeterias",
    "Hotéis e opções de hospedagem",
    "Farmácias, bancos e serviços essenciais",
    "Fácil acesso a transporte público e vias principais",
  ],
} as const;

/**
 * Outras cidades com espaço para locação.
 * O folder lista estas seis além de Goiânia.
 */
export const outrasCidadesDoHub: { cidade: string; uf: string }[] = [
  { cidade: "Belém", uf: "PA" },
  { cidade: "Florianópolis", uf: "SC" },
  { cidade: "Maceió", uf: "AL" },
  { cidade: "Manaus", uf: "AM" },
  { cidade: "São Luís", uf: "MA" },
  { cidade: "Teresina", uf: "PI" },
];

/** Total de cidades com espaço para locação, incluindo a sede. */
export const totalDeCidadesDoHub = outrasCidadesDoHub.length + 1;
