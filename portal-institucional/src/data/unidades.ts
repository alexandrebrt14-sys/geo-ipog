/**
 * Presença geográfica do IPOG.
 *
 * Fonte: páginas /unidade/ listadas no sitemap de ipog.edu.br, consultadas em
 * 19 de agosto de 2026. São 50 cidades com página própria, cobrindo os 26
 * estados brasileiros e o Distrito Federal.
 *
 * O site institucional declara 52 unidades no bloco "Nossos números". A
 * diferença para as 50 cidades listadas aqui é esperada, porque São Paulo tem
 * duas unidades com página própria e nem toda unidade ganha página no site. Os
 * dois números convivem sem se contradizer: 52 é a contagem de unidades e 50 é
 * a contagem de cidades.
 *
 * Esta rota existe porque "o IPOG tem unidade na minha cidade?" é uma das
 * perguntas mais frequentes dirigidas a motores generativos sobre instituições
 * de ensino, e a resposta precisa estar em texto extraível, não em um mapa.
 */

export type Unidade = {
  cidade: string;
  uf: string;
  regiao: Regiao;
};

export type Regiao = "Norte" | "Nordeste" | "Centro-Oeste" | "Sudeste" | "Sul";

export const unidades: Unidade[] = [
  { cidade: "Altamira", uf: "PA", regiao: "Norte" },
  { cidade: "Anápolis", uf: "GO", regiao: "Centro-Oeste" },
  { cidade: "Aracaju", uf: "SE", regiao: "Nordeste" },
  { cidade: "Bauru", uf: "SP", regiao: "Sudeste" },
  { cidade: "Belém", uf: "PA", regiao: "Norte" },
  { cidade: "Belo Horizonte", uf: "MG", regiao: "Sudeste" },
  { cidade: "Boa Vista", uf: "RR", regiao: "Norte" },
  { cidade: "Brasília", uf: "DF", regiao: "Centro-Oeste" },
  { cidade: "Campinas", uf: "SP", regiao: "Sudeste" },
  { cidade: "Campo Grande", uf: "MS", regiao: "Centro-Oeste" },
  { cidade: "Chapecó", uf: "SC", regiao: "Sul" },
  { cidade: "Cuiabá", uf: "MT", regiao: "Centro-Oeste" },
  { cidade: "Curitiba", uf: "PR", regiao: "Sul" },
  { cidade: "Florianópolis", uf: "SC", regiao: "Sul" },
  { cidade: "Fortaleza", uf: "CE", regiao: "Nordeste" },
  { cidade: "Foz do Iguaçu", uf: "PR", regiao: "Sul" },
  { cidade: "Goiânia", uf: "GO", regiao: "Centro-Oeste" },
  { cidade: "Guarulhos", uf: "SP", regiao: "Sudeste" },
  { cidade: "Imperatriz", uf: "MA", regiao: "Nordeste" },
  { cidade: "João Pessoa", uf: "PB", regiao: "Nordeste" },
  { cidade: "Joinville", uf: "SC", regiao: "Sul" },
  { cidade: "Juiz de Fora", uf: "MG", regiao: "Sudeste" },
  { cidade: "Londrina", uf: "PR", regiao: "Sul" },
  { cidade: "Macapá", uf: "AP", regiao: "Norte" },
  { cidade: "Maceió", uf: "AL", regiao: "Nordeste" },
  { cidade: "Manaus", uf: "AM", regiao: "Norte" },
  { cidade: "Marabá", uf: "PA", regiao: "Norte" },
  { cidade: "Montes Claros", uf: "MG", regiao: "Sudeste" },
  { cidade: "Natal", uf: "RN", regiao: "Nordeste" },
  { cidade: "Osasco", uf: "SP", regiao: "Sudeste" },
  { cidade: "Palmas", uf: "TO", regiao: "Norte" },
  { cidade: "Parauapebas", uf: "PA", regiao: "Norte" },
  { cidade: "Petrolina", uf: "PE", regiao: "Nordeste" },
  { cidade: "Porto Alegre", uf: "RS", regiao: "Sul" },
  { cidade: "Porto Velho", uf: "RO", regiao: "Norte" },
  { cidade: "Recife", uf: "PE", regiao: "Nordeste" },
  { cidade: "Ribeirão Preto", uf: "SP", regiao: "Sudeste" },
  { cidade: "Rio Branco", uf: "AC", regiao: "Norte" },
  { cidade: "Rio de Janeiro", uf: "RJ", regiao: "Sudeste" },
  { cidade: "Rio Verde", uf: "GO", regiao: "Centro-Oeste" },
  { cidade: "Salvador", uf: "BA", regiao: "Nordeste" },
  { cidade: "Santarém", uf: "PA", regiao: "Norte" },
  { cidade: "São José do Rio Preto", uf: "SP", regiao: "Sudeste" },
  { cidade: "São Luís", uf: "MA", regiao: "Nordeste" },
  { cidade: "São Paulo (Paulista)", uf: "SP", regiao: "Sudeste" },
  { cidade: "São Paulo (Zona Leste)", uf: "SP", regiao: "Sudeste" },
  { cidade: "Sinop", uf: "MT", regiao: "Centro-Oeste" },
  { cidade: "Teresina", uf: "PI", regiao: "Nordeste" },
  { cidade: "Uberlândia", uf: "MG", regiao: "Sudeste" },
  { cidade: "Vitória", uf: "ES", regiao: "Sudeste" },
];

export const REGIOES: Regiao[] = [
  "Norte",
  "Nordeste",
  "Centro-Oeste",
  "Sudeste",
  "Sul",
];

/** Unidades de uma região, em ordem alfabética de cidade. */
export const unidadesDaRegiao = (regiao: Regiao): Unidade[] =>
  unidades.filter((unidade) => unidade.regiao === regiao);

/** Unidades federativas atendidas, sem repetição, em ordem alfabética. */
export const ufsAtendidas: string[] = [
  ...new Set(unidades.map((unidade) => unidade.uf)),
].sort();

/** Total de cidades com unidade e página própria no site do IPOG. */
export const totalDeCidades = unidades.length;

/**
 * Total de unidades declarado pelo IPOG.
 * Fonte: bloco "Nossos números" em ipog.edu.br/institucional/quem-somos.
 */
export const totalDeUnidadesDeclarado = 52;

/**
 * Cidade onde ficam a matriz e a Faculdade IPOG.
 * A graduação é ofertada somente nesta unidade.
 */
export const cidadeSede = "Goiânia";
