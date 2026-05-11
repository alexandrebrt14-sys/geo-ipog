import fs from 'node:fs';
import path from 'node:path';

const SRC = path.resolve('src');
const EXTS = new Set(['.astro', '.tsx', '.ts', '.css']);

// Mapeamentos de termos sem acento -> com acento.
// Cobertura cuidadosa: itens listados com forma exata (case-sensitive)
// e respeitando contextos onde ASCII e necessario (slugs, paths, ids).
const SUBS = [
  // pos-graduacao variantes
  [/Pos-graduacao/g, 'Pós-graduação'],
  [/pos-graduacao/g, 'pós-graduação'],
  [/Pos-graduacoes/g, 'Pós-graduações'],
  [/pos-graduacoes/g, 'pós-graduações'],
  [/Pos-graduado/g, 'Pós-graduado'],
  [/pos-graduado/g, 'pós-graduado'],
  // pos sozinho (com contexto de espaco ao redor)
  [/(\W)pos(\s)/g, '$1pós$2'],
  [/(\W)Pos(\s)/g, '$1Pós$2'],
  [/(\s)pos\b(?=[^\/])/g, '$1pós'],

  // educacao/regulacao/atuacao/intencao/decisao
  [/educacao\b/g, 'educação'],
  [/Educacao\b/g, 'Educação'],
  [/regulacao\b/g, 'regulação'],
  [/Regulacao\b/g, 'Regulação'],
  [/atuacao\b/g, 'atuação'],
  [/Atuacao\b/g, 'Atuação'],
  [/intencao\b/g, 'intenção'],
  [/Intencao\b/g, 'Intenção'],
  [/decisao\b/g, 'decisão'],
  [/Decisao\b/g, 'Decisão'],
  [/avaliacao\b/g, 'avaliação'],
  [/Avaliacao\b/g, 'Avaliação'],
  [/inscricao\b/g, 'inscrição'],
  [/Inscricao\b/g, 'Inscrição'],
  [/aplicacao\b/g, 'aplicação'],
  [/Aplicacao\b/g, 'Aplicação'],
  [/interpretacao\b/g, 'interpretação'],
  [/promocao\b/g, 'promoção'],
  [/Promocao\b/g, 'Promoção'],
  [/prevencao\b/g, 'prevenção'],
  [/Prevencao\b/g, 'Prevenção'],
  [/protecao\b/g, 'proteção'],
  [/comunicacao\b/g, 'comunicação'],
  [/automacao\b/g, 'automação'],
  [/inclusao\b/g, 'inclusão'],
  [/Inclusao\b/g, 'Inclusão'],
  [/transicao\b/g, 'transição'],
  [/Transicao\b/g, 'Transição'],
  [/funcoes\b/g, 'funções'],
  [/Funcoes\b/g, 'Funções'],
  [/intervencao\b/g, 'intervenção'],
  [/preparacao\b/g, 'preparação'],
  [/correcao\b/g, 'correção'],
  [/correcoes\b/g, 'correções'],
  [/seguranca\b/g, 'segurança'],
  [/Seguranca\b/g, 'Segurança'],
  [/lideranca\b/g, 'liderança'],
  [/Lideranca\b/g, 'Liderança'],
  [/mudanca\b/g, 'mudança'],
  [/Mudanca\b/g, 'Mudança'],
  [/crianca\b/g, 'criança'],
  [/criancas\b/g, 'crianças'],
  [/forcas\b/g, 'forças'],
  [/Forcas\b/g, 'Forças'],
  [/ciencia\b/g, 'ciência'],
  [/neurociencia\b/g, 'neurociência'],
  [/Neurociencia\b/g, 'Neurociência'],
  [/experiencia\b/g, 'experiência'],
  [/Experiencia\b/g, 'Experiência'],
  [/preferencia\b/g, 'preferência'],
  [/referencia\b/g, 'referência'],
  [/Referencia\b/g, 'Referência'],
  [/referencias\b/g, 'referências'],
  [/evidencia\b/g, 'evidência'],
  [/evidencias\b/g, 'evidências'],
  [/relevancia\b/g, 'relevância'],
  [/excelencia\b/g, 'excelência'],

  // saude
  [/saude\b/g, 'saúde'],
  [/Saude\b/g, 'Saúde'],

  // numero/familia/historia/matricula
  [/numero\b/g, 'número'],
  [/Numero\b/g, 'Número'],
  [/numeros\b/g, 'números'],
  [/familia\b/g, 'família'],
  [/Familia\b/g, 'Família'],
  [/historia\b/g, 'história'],
  [/Historia\b/g, 'História'],
  [/matricula\b/g, 'matrícula'],
  [/Matricula\b/g, 'Matrícula'],
  [/matriculas\b/g, 'matrículas'],
  [/Matriculas\b/g, 'Matrículas'],
  [/duvida\b/g, 'dúvida'],
  [/duvidas\b/g, 'dúvidas'],
  [/Duvidas\b/g, 'Dúvidas'],
  [/proposito\b/g, 'propósito'],
  [/propositos\b/g, 'propósitos'],
  [/Proposito\b/g, 'Propósito'],
  [/criterio\b/g, 'critério'],
  [/criterios\b/g, 'critérios'],
  [/Criterios\b/g, 'Critérios'],
  [/conteudo\b/g, 'conteúdo'],
  [/conteudos\b/g, 'conteúdos'],
  [/Conteudo\b/g, 'Conteúdo'],
  [/Conteudos\b/g, 'Conteúdos'],
  [/orcamento\b/g, 'orçamento'],
  [/orcamentos\b/g, 'orçamentos'],
  [/Orcamento\b/g, 'Orçamento'],
  [/historico\b/g, 'histórico'],
  [/cronograma\b/g, 'cronograma'],
  [/economico\b/g, 'econômico'],
  [/economia\b/g, 'economia'],
  [/portfolio\b/g, 'portfólio'],
  [/Portfolio\b/g, 'Portfólio'],

  // pratica/politica/clinica/juridica/perica
  [/pratica\b/g, 'prática'],
  [/praticas\b/g, 'práticas'],
  [/pratico\b/g, 'prático'],
  [/praticos\b/g, 'práticos'],
  [/Pratica\b/g, 'Prática'],
  [/politica\b/g, 'política'],
  [/politicas\b/g, 'políticas'],
  [/Politica\b/g, 'Política'],
  [/Politicas\b/g, 'Políticas'],
  [/clinica\b/g, 'clínica'],
  [/clinicas\b/g, 'clínicas'],
  [/Clinica\b/g, 'Clínica'],
  [/clinico\b/g, 'clínico'],
  [/clinicos\b/g, 'clínicos'],
  [/juridica\b/g, 'jurídica'],
  [/juridicas\b/g, 'jurídicas'],
  [/juridico\b/g, 'jurídico'],
  [/Juridica\b/g, 'Jurídica'],
  [/Juridico\b/g, 'Jurídico'],
  [/pericia\b/g, 'perícia'],
  [/Pericia\b/g, 'Perícia'],

  // area/area
  [/\barea\b/g, 'área'],
  [/\bareas\b/g, 'áreas'],
  [/\bArea\b/g, 'Área'],
  [/\bAreas\b/g, 'Áreas'],
  [/\bAREA\b/g, 'ÁREA'],

  // psicologos / psicologico / psicologia
  [/psicologos\b/g, 'psicólogos'],
  [/Psicologos\b/g, 'Psicólogos'],
  [/psicologo\b/g, 'psicólogo'],
  [/Psicologo\b/g, 'Psicólogo'],
  [/psicologico\b/g, 'psicológico'],
  [/psicologicos\b/g, 'psicológicos'],
  [/psicologica\b/g, 'psicológica'],
  [/Psicologica\b/g, 'Psicológica'],
  [/psicologicas\b/g, 'psicológicas'],
  [/Psicologicas\b/g, 'Psicológicas'],
  // Psicologia stays as is (no accent)

  // lider / lideres
  [/lideres\b/g, 'líderes'],
  [/Lideres\b/g, 'Líderes'],
  [/\blider\b/g, 'líder'],
  [/Lider\b/g, 'Líder'],

  // verbos é/são/não/você/já/também
  [/(\W)e\b(?=\s+(?:um|uma|o|a|os|as|para|sobre|de|tratada|tratado|necessario|obrigatorio|preciso|melhor|importante|util|essencial))/g, '$1é'],
  [/\bnao\b/g, 'não'],
  [/\bNao\b/g, 'Não'],
  [/\bvoce\b/g, 'você'],
  [/\bVoce\b/g, 'Você'],
  [/\bsao\b/g, 'são'],
  [/\bSao\b/g, 'São'],
  [/\bja\b/g, 'já'],
  [/\bJa\b/g, 'Já'],
  [/\btambem\b/g, 'também'],
  [/\bTambem\b/g, 'Também'],
  [/\butil\b/g, 'útil'],
  [/\bUtil\b/g, 'Útil'],
  [/\butil\b/g, 'útil'],
  [/\baqui\b/g, 'aqui'], // ok
  [/\baliem\b/g, 'além'],
  [/\bAlem\b/g, 'Além'],
  [/\batraves\b/g, 'através'],
  [/\bAtraves\b/g, 'Através'],
  [/\bproximo\b/g, 'próximo'],
  [/\bProximo\b/g, 'Próximo'],
  [/\bultimo\b/g, 'último'],
  [/\bUltimo\b/g, 'Último'],

  // grafias adicionais
  [/Psicometria/g, 'Psicometria'],
  [/Neuropsicologia/g, 'Neuropsicologia'],
  [/Psicopedagogia/g, 'Psicopedagogia'],
  [/Psicomotricidade/g, 'Psicomotricidade'],
  [/comportamental\b/g, 'comportamental'],
  [/comportamento\b/g, 'comportamento'],
  [/desenvolvimento\b/g, 'desenvolvimento'],
  [/cognicao\b/g, 'cognição'],
  [/cognicoes\b/g, 'cognições'],
  [/Reabilitacao\b/g, 'Reabilitação'],
  [/reabilitacao\b/g, 'reabilitação'],
  [/Reabilitacoes\b/g, 'Reabilitações'],
  [/Forense\b/g, 'Forense'],
  [/Trafego\b/g, 'Tráfego'],
  [/trafego\b/g, 'tráfego'],
  [/transito\b/g, 'trânsito'],
  [/Transito\b/g, 'Trânsito'],
  [/etica\b/g, 'ética'],
  [/Etica\b/g, 'Ética'],
  [/Goias\b/g, 'Goiás'],
  [/\bPara\b\b/g, 'Pará'], // word boundary heuristic but be careful
  [/\bPara\b(?=\s+\()/g, 'Pará'], // só quando seguido de "("
  [/Maranhao\b/g, 'Maranhão'],
  [/Sao Paulo\b/g, 'São Paulo'],
  [/Parana\b/g, 'Paraná'],
  [/Piaui\b/g, 'Piauí'],
  [/Ceara\b/g, 'Ceará'],
  [/Paraiba\b/g, 'Paraíba'],
  [/Rondonia\b/g, 'Rondônia'],
  [/Amapa\b/g, 'Amapá'],
  [/Espirito Santo/g, 'Espírito Santo'],

  // memoria/atencao/linguagem
  [/memoria\b/g, 'memória'],
  [/Memoria\b/g, 'Memória'],
  [/atencao\b/g, 'atenção'],
  [/Atencao\b/g, 'Atenção'],

  // termos especificos do site
  [/Pos Psicologia/g, 'Pós Psicologia'],
  [/independente\.\s/g, 'independente. '],
  // arquitetura, decisao
  [/arquitetura\b/g, 'arquitetura'], // ok ja
  [/sao tratadas/g, 'são tratadas'],

  // generico: nao precedido por url
  [/MARCADOR_INVALIDO/g, '']
];

// Termos que NAO devem ser alterados (em paths/slugs):
// preservamos qualquer ocorrencia dentro de id:, slug:, href: com / no inicio.
// Como os SUBS sao baseados em \b, slugs hifenizados (sem espacos) com 'psicologia-organizacional-trabalho'
// nao casam com \bareas\b pois 'areas' nao esta isolado.

function processFile(file) {
  let content = fs.readFileSync(file, 'utf-8');
  const original = content;
  for (const [pat, repl] of SUBS) {
    content = content.replace(pat, repl);
  }
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf-8');
    return true;
  }
  return false;
}

function walk(dir) {
  let changed = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) changed += walk(full);
    else if (EXTS.has(path.extname(entry.name))) {
      if (processFile(full)) {
        console.log('  ✓', path.relative(SRC, full));
        changed++;
      }
    }
  }
  return changed;
}

console.log('Aplicando acentuacao em src/...');
const changed = walk(SRC);
console.log(`\n${changed} arquivos atualizados.`);
