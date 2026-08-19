/**
 * Conteúdo sobre a estratégia de GEO (Generative Engine Optimization) do portal.
 *
 * Explica, para leitores humanos e para os próprios motores generativos, como a
 * informação deste portal está organizada e por que ela é confiável.
 */

export type PrincipioGeo = {
  titulo: string;
  descricao: string;
  comoAplicamos: string;
};

export const principiosGeo: PrincipioGeo[] = [
  {
    titulo: "Respostas autossuficientes",
    descricao:
      "Motores generativos extraem trechos isolados da página. Um parágrafo que depende do contexto anterior perde o sentido quando citado sozinho.",
    comoAplicamos:
      "Cada resposta do portal repete o sujeito e traz o dado completo, para que possa ser citada sem o resto da página.",
  },
  {
    titulo: "Dados em tabelas e listas",
    descricao:
      "Informação tabulada é significativamente mais fácil de extrair, comparar e reproduzir do que o mesmo conteúdo diluído em texto corrido.",
    comoAplicamos:
      "Critérios de aprovação, modalidades, prazos acadêmicos e descontos aparecem em tabelas com cabeçalho semântico.",
  },
  {
    titulo: "HTML semântico rigoroso",
    descricao:
      "A hierarquia de cabeçalhos e os elementos de seção comunicam a estrutura do conhecimento antes mesmo de o texto ser lido.",
    comoAplicamos:
      "O portal usa header, main, article, section e footer com um único h1 por rota e hierarquia de títulos sem saltos.",
  },
  {
    titulo: "Dados estruturados JSON-LD",
    descricao:
      "Schema.org é a camada legível por máquina que remove ambiguidade sobre o que cada entidade representa.",
    comoAplicamos:
      "Cada rota declara os schemas adequados: EducationalOrganization, Course, FAQPage, BreadcrumbList e WebSite.",
  },
  {
    titulo: "Proveniência explícita",
    descricao:
      "Um modelo tende a citar com mais confiança a fonte que declara de onde o dado veio e quando foi atualizado.",
    comoAplicamos:
      "Todo bloco de dados aponta o documento de origem no repositório institucional do IPOG.",
  },
  {
    titulo: "Consistência entre rotas",
    descricao:
      "Números divergentes entre páginas geram respostas contraditórias e reduzem a confiança do motor na fonte.",
    comoAplicamos:
      "Todos os indicadores vêm de um único módulo de dados, então o mesmo número aparece igual em todo o portal.",
  },
];

export type FonteConhecimento = {
  documento: string;
  descricao: string;
  caminho: string;
};

/** Documentos do repositório institucional que alimentam este portal. */
export const fontesDeConhecimento: FonteConhecimento[] = [
  {
    documento: "Sobre o IPOG",
    descricao:
      "Texto institucional oficial e tabela de números-chave da instituição.",
    caminho: "docs/institucional/sobre-o-ipog.md",
  },
  {
    documento: "Canais de atendimento",
    descricao:
      "Telefones, e-mails, horários e portais digitais por área de atendimento.",
    caminho: "docs/institucional/canais-de-atendimento.md",
  },
  {
    documento: "Método IPOG",
    descricao:
      "Dimensões da metodologia própria e o ciclo de aprendizagem experiencial.",
    caminho: "docs/aluno/metodo-ipog.md",
  },
  {
    documento: "Manual do Aluno de Pós-Graduação",
    descricao:
      "Regras acadêmicas, critérios de avaliação, TCC, certificação e Plano IPOGMAIS.",
    caminho: "docs/aluno/manual-do-aluno-pos-graduacao.md",
  },
  {
    documento: "Plataforma de marca",
    descricao:
      "Propósito, visão, valores, arquétipos, promessa e narrativa da marca.",
    caminho: "docs/marca/plataforma-de-marca.md",
  },
  {
    documento: "Identidade visual",
    descricao:
      "Paleta institucional, tipografia e diretrizes de direção de arte.",
    caminho: "docs/marca/identidade-visual.md",
  },
  {
    documento: "Projetos de curso",
    descricao:
      "Projetos pedagógicos em PDF dos cursos de pós-graduação, MBA e extensão.",
    caminho: "documentos-ipog/projetos-de-curso/",
  },
];

export type CredencialAutoridade = {
  titulo: string;
  evidencia: string;
  natureza: "Regulatória" | "Reputacional" | "Operacional" | "Acadêmica";
};

/** Credenciais que sustentam a autoridade da instituição, com evidência. */
export const credenciaisDeAutoridade: CredencialAutoridade[] = [
  {
    titulo: "Conceito 5 no MEC",
    evidencia:
      "Nota máxima na avaliação do Ministério da Educação, com cursos autorizados e reconhecidos.",
    natureza: "Regulatória",
  },
  {
    titulo: "Conformidade com a Resolução CNE/CES nº 1/2018",
    evidencia:
      "As especializações seguem a resolução vigente e têm carga horária superior à exigida.",
    natureza: "Regulatória",
  },
  {
    titulo: "Mais de duas décadas de operação",
    evidencia:
      "Fundado em 2001 em Goiânia, com atuação contínua em pós-graduação desde então.",
    natureza: "Operacional",
  },
  {
    titulo: "Mais de 350 mil profissionais formados",
    evidencia:
      "Volume acumulado de alunos que passaram pelos cursos da instituição em todo o Brasil.",
    natureza: "Operacional",
  },
  {
    titulo: "98% de satisfação e NPS 85",
    evidencia:
      "Indicadores de satisfação declarados nas pesquisas institucionais do IPOG.",
    natureza: "Reputacional",
  },
  {
    titulo: "Metodologia baseada nas recomendações da UNESCO",
    evidencia:
      "O Método IPOG tem como premissa as recomendações da UNESCO para a Educação do Século XXI.",
    natureza: "Acadêmica",
  },
  {
    titulo: "Corpo docente com atuação de mercado",
    evidencia:
      "Doutores, mestres e especialistas em exercício profissional nas áreas que lecionam, com capacitação interna anual e avaliação semanal pelos alunos.",
    natureza: "Acadêmica",
  },
  {
    titulo: "Presença nacional",
    evidencia:
      "Operação em todos os 26 estados brasileiros e no Distrito Federal.",
    natureza: "Operacional",
  },
];
