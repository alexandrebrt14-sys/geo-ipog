import { useMemo, useState } from 'react';

/**
 * Quiz: qual MBA em Psicologia combina com você.
 *
 * - 10 perguntas, cada opção possui 5 pesos (um para cada MBA mapeado).
 * - Resultado: MBA com maior soma de pesos.
 * - Não é recomendação formal; é orientação editorial de um portal independente.
 *
 * Naming canônico (espelha src/lib/data.ts):
 *   mba-pot, mba-positiva, mba-neuro, mba-ncpp, mba-lideranca-positiva
 */

type MbaId =
  | 'mba-pot'
  | 'mba-positiva'
  | 'mba-neuro'
  | 'mba-ncpp'
  | 'mba-lideranca-positiva';

interface MbaMeta {
  id: MbaId;
  name: string;
  shortName: string;
  tag: string;
  description: string;
  oneLiner: string;
  href: string;
}

const MBA_META: Record<MbaId, MbaMeta> = {
  'mba-pot': {
    id: 'mba-pot',
    name: 'MBA em Psicologia Organizacional e do Trabalho',
    shortName: 'MBA em POT',
    tag: 'Núcleo POT',
    description:
      'Cultura, clima, liderança, saúde mental no trabalho, riscos psicossociais, NR-1 e people analytics. É o programa-âncora para quem quer estruturar pessoas e organização com base científica.',
    oneLiner:
      'Perfil de quem vai operar cultura, clima e riscos psicossociais com método.',
    href: '/mbas/mba-pot'
  },
  'mba-positiva': {
    id: 'mba-positiva',
    name: 'MBA em Psicologia Positiva, Saúde Mental e Gestão do Bem-Estar nas Organizações',
    shortName: 'MBA em Psicologia Positiva',
    tag: 'Bem-estar',
    description:
      'Forças pessoais, propósito, segurança psicológica, prevenção de burnout e cultura de cuidado. Foco em estruturar programas de bem-estar e saúde mental sem cair no slogan.',
    oneLiner:
      'Perfil de quem vai liderar a agenda de bem-estar, saúde mental e prevenção.',
    href: '/mbas/mba-positiva'
  },
  'mba-neuro': {
    id: 'mba-neuro',
    name: 'MBA em Reabilitação Neuropsicológica e Desenvolvimento Cognitivo',
    shortName: 'MBA em Reabilitação Neuro',
    tag: 'Neuro e cognição',
    description:
      'Funções cognitivas, neuroplasticidade, planos de reabilitação, neurodesenvolvimento e envelhecimento. Programa técnico, orientado a quem atua com cognição em saúde, educação ou clínica.',
    oneLiner:
      'Perfil técnico em cognição, neurodesenvolvimento e reabilitação.',
    href: '/mbas/mba-neuro'
  },
  'mba-ncpp': {
    id: 'mba-ncpp',
    name: 'MBA em Neurociência e Psicologia Positiva no Desenvolvimento Humano',
    shortName: 'MBA em Neurociência + Positiva',
    tag: 'Neurociência aplicada',
    description:
      'Ponte entre neurociência e psicologia positiva no desenvolvimento humano. Aprendizagem, performance, motivação e propósito com base científica.',
    oneLiner:
      'Perfil de quem quer integrar ciência do cérebro com desenvolvimento humano.',
    href: '/mbas/mba-ncpp'
  },
  'mba-lideranca-positiva': {
    id: 'mba-lideranca-positiva',
    name: 'MBA em Gestão de Pessoas e Liderança Positiva',
    shortName: 'MBA em Liderança Positiva',
    tag: 'Liderança',
    description:
      'People-first, liderança de cultura, segurança psicológica, gestão por significado e performance saudável. É o programa de quem quer subir como líder formal.',
    oneLiner:
      'Perfil de líder formal ou pré-líder que quer base científica para gestão de gente.',
    href: '/mbas/mba-lideranca-positiva'
  }
};

type Weights = Record<MbaId, number>;

interface Option {
  label: string;
  weights: Weights;
}

interface Question {
  id: string;
  text: string;
  helper?: string;
  options: Option[];
}

const w = (
  pot: number,
  positiva: number,
  neuro: number,
  ncpp: number,
  lideranca: number
): Weights => ({
  'mba-pot': pot,
  'mba-positiva': positiva,
  'mba-neuro': neuro,
  'mba-ncpp': ncpp,
  'mba-lideranca-positiva': lideranca
});

const QUESTIONS: Question[] = [
  {
    id: 'q1-formacao',
    text: 'Você já é psicólogo(a) formado(a)?',
    helper:
      'MBA lato sensu é aberto a graduados de áreas afins, mas a área de origem muda o melhor encaixe.',
    options: [
      { label: 'Sim, sou psicólogo(a) com CRP ativo', weights: w(2, 2, 3, 2, 1) },
      { label: 'Estou cursando Psicologia', weights: w(2, 2, 2, 2, 1) },
      {
        label: 'Não, vim de RH, Administração, Engenharia, Saúde ou áreas afins',
        weights: w(3, 2, 0, 1, 3)
      }
    ]
  },
  {
    id: 'q2-area-atual',
    text: 'Qual é a sua principal área de atuação hoje?',
    options: [
      { label: 'Clínica e atendimento individual', weights: w(1, 2, 3, 2, 0) },
      { label: 'RH, gestão de pessoas, T&D, cultura', weights: w(3, 2, 0, 1, 3) },
      { label: 'Liderança formal em empresa', weights: w(2, 2, 0, 2, 3) },
      { label: 'Consultoria ou atuação independente', weights: w(3, 2, 1, 2, 2) },
      { label: 'Saúde, educação ou pesquisa', weights: w(1, 2, 3, 3, 0) },
      { label: 'Outra área', weights: w(2, 2, 1, 2, 2) }
    ]
  },
  {
    id: 'q3-problema',
    text: 'Qual problema você mais quer resolver com a pós?',
    options: [
      {
        label: 'Sair da clínica e entrar em ambiente corporativo',
        weights: w(3, 1, 0, 1, 2)
      },
      {
        label: 'Sair de RH operacional para estratégico',
        weights: w(3, 1, 0, 1, 3)
      },
      {
        label: 'Liderar pessoas com base científica, não no improviso',
        weights: w(2, 2, 0, 2, 3)
      },
      {
        label: 'Aprofundar técnica em uma área regulada e específica',
        weights: w(1, 1, 3, 2, 0)
      },
      {
        label: 'Estruturar bem-estar, saúde mental e prevenção',
        weights: w(2, 3, 0, 1, 2)
      }
    ]
  },
  {
    id: 'q4-lacuna',
    text: 'Em que aspecto você sente mais lacuna hoje?',
    options: [
      {
        label: 'Compreender comportamento humano em grupos e organizações',
        weights: w(3, 1, 0, 1, 3)
      },
      {
        label: 'Tomar decisões baseadas em dados e indicadores',
        weights: w(3, 1, 1, 2, 2)
      },
      {
        label: 'Conduzir conversas difíceis e construir segurança psicológica',
        weights: w(2, 3, 0, 1, 3)
      },
      {
        label: 'Avaliar e intervir tecnicamente com método',
        weights: w(1, 1, 3, 2, 0)
      },
      {
        label: 'Mensurar bem-estar e clima de equipes',
        weights: w(3, 3, 0, 1, 2)
      }
    ]
  },
  {
    id: 'q5-cluster',
    text: 'Qual cluster de temas mais chama sua atenção?',
    options: [
      {
        label: 'Cultura, clima, liderança, NR-1, riscos psicossociais',
        weights: w(3, 1, 0, 1, 3)
      },
      {
        label: 'Neurociência, cognição, aprendizagem, performance',
        weights: w(1, 1, 2, 3, 1)
      },
      {
        label: 'Avaliação psicológica, instrumentos, laudos',
        weights: w(1, 0, 3, 2, 0)
      },
      {
        label: 'Saúde mental no trabalho, NR-1, burnout, retorno ao trabalho',
        weights: w(2, 3, 0, 1, 2)
      },
      {
        label: 'Forças pessoais, propósito, motivação, performance saudável',
        weights: w(2, 3, 0, 2, 2)
      }
    ]
  },
  {
    id: 'q6-carreira',
    text: 'Qual é o seu nível de carreira atual?',
    options: [
      { label: 'Júnior, de 0 a 3 anos', weights: w(2, 2, 2, 2, 1) },
      { label: 'Pleno, de 3 a 8 anos', weights: w(3, 2, 2, 2, 2) },
      { label: 'Sênior, de 8 a 15 anos', weights: w(3, 2, 1, 2, 3) },
      { label: 'Executivo, acima de 15 anos', weights: w(2, 2, 0, 2, 3) }
    ]
  },
  {
    id: 'q7-lideranca',
    text: 'Você lidera equipes hoje?',
    options: [
      { label: 'Sim, lidero time grande', weights: w(2, 2, 0, 1, 3) },
      { label: 'Sim, lidero time pequeno', weights: w(2, 2, 0, 1, 3) },
      { label: 'Lidero projetos, sem time direto', weights: w(3, 2, 1, 2, 2) },
      { label: 'Não lidero, mas pretendo liderar', weights: w(2, 2, 1, 2, 3) },
      { label: 'Não lidero e não pretendo liderar', weights: w(2, 2, 3, 3, 0) }
    ]
  },
  {
    id: 'q8-formato',
    text: 'Sobre formato de aulas, você prefere…',
    helper:
      'O IPOG oferece online Ao Vivo síncrono, presencial e híbrido conforme o programa.',
    options: [
      { label: 'Ao vivo síncrono, com debate em tempo real', weights: w(2, 2, 2, 2, 2) },
      { label: 'Gravado assíncrono, no meu ritmo', weights: w(1, 1, 1, 1, 1) },
      { label: 'Híbrido, com encontros presenciais', weights: w(2, 2, 2, 2, 2) },
      { label: 'Indiferente, decido pelo conteúdo', weights: w(2, 2, 2, 2, 2) }
    ]
  },
  {
    id: 'q9-tempo',
    text: 'Quanto tempo você dedica a estudo por semana?',
    options: [
      { label: '2 a 4 horas', weights: w(1, 1, 0, 1, 1) },
      { label: '5 a 8 horas', weights: w(2, 2, 1, 2, 2) },
      { label: '9 a 12 horas', weights: w(2, 2, 3, 3, 2) },
      { label: 'Mais de 12 horas', weights: w(2, 2, 3, 3, 2) }
    ]
  },
  {
    id: 'q10-ano1',
    text: 'O que você espera tirar dessa pós no primeiro ano?',
    options: [
      { label: 'Mudar de área profissional', weights: w(3, 2, 1, 2, 2) },
      { label: 'Subir de cargo ou virar líder formal', weights: w(2, 2, 0, 1, 3) },
      { label: 'Aprofundar técnica em uma área específica', weights: w(1, 1, 3, 2, 0) },
      { label: 'Construir produto ou consultoria própria', weights: w(3, 2, 1, 2, 2) },
      { label: 'Reposicionar marca pessoal e autoridade', weights: w(2, 2, 1, 2, 3) }
    ]
  }
];

type View = 'welcome' | 'questions' | 'result';

interface ResultPayload {
  primary: MbaMeta;
  secondary: MbaMeta;
  scores: Array<{ mba: MbaMeta; score: number; share: number }>;
}

function computeResult(answers: number[]): ResultPayload {
  const totals: Weights = {
    'mba-pot': 0,
    'mba-positiva': 0,
    'mba-neuro': 0,
    'mba-ncpp': 0,
    'mba-lideranca-positiva': 0
  };

  answers.forEach((optionIndex, qIndex) => {
    if (optionIndex < 0) return;
    const option = QUESTIONS[qIndex].options[optionIndex];
    (Object.keys(totals) as MbaId[]).forEach((id) => {
      totals[id] += option.weights[id];
    });
  });

  const grand = Math.max(
    1,
    (Object.values(totals) as number[]).reduce((acc, v) => acc + v, 0)
  );

  const scores = (Object.keys(totals) as MbaId[])
    .map((id) => ({
      mba: MBA_META[id],
      score: totals[id],
      share: Math.round((totals[id] / grand) * 100)
    }))
    .sort((a, b) => b.score - a.score);

  return {
    primary: scores[0].mba,
    secondary: scores[1].mba,
    scores
  };
}

export default function QuizQualMBA() {
  const [view, setView] = useState<View>('welcome');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    () => QUESTIONS.map(() => -1)
  );

  const total = QUESTIONS.length;
  const answered = useMemo(
    () => answers.filter((a) => a >= 0).length,
    [answers]
  );
  const progress = Math.round((answered / total) * 100);

  function start() {
    setAnswers(QUESTIONS.map(() => -1));
    setCurrent(0);
    setView('questions');
  }

  function answer(optionIndex: number) {
    const next = [...answers];
    next[current] = optionIndex;
    setAnswers(next);
    // pequeno delay visual para feedback de seleção
    window.setTimeout(() => {
      if (current + 1 < total) {
        setCurrent(current + 1);
      } else {
        setView('result');
      }
    }, 120);
  }

  function goPrev() {
    if (current > 0) setCurrent(current - 1);
  }

  function reset() {
    setAnswers(QUESTIONS.map(() => -1));
    setCurrent(0);
    setView('welcome');
  }

  const result = useMemo(
    () => (view === 'result' ? computeResult(answers) : null),
    [view, answers]
  );

  if (view === 'welcome') {
    return (
      <div className="card p-6 sm:p-8 animate-scale-in">
        <span className="section-eyebrow">Quiz · orientação</span>
        <h2 className="section-h text-2xl sm:text-3xl mt-2">
          10 perguntas. Resultado em 3 minutos.
        </h2>
        <p className="mt-3 text-ink-700">
          O quiz mapeia formação, área de atuação, problema central e momento de
          carreira para sugerir um MBA principal e um secundário. Resultado é
          orientação editorial deste portal, não recomendação formal.
        </p>
        <ul className="mt-5 grid sm:grid-cols-2 gap-3 text-sm text-ink-700">
          <li className="flex gap-2 items-start">
            <span className="shrink-0 w-6 h-6 rounded-full bg-brand-50 text-brand-700 font-bold inline-flex items-center justify-center">
              1
            </span>
            <span>10 perguntas curtas, múltipla escolha.</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="shrink-0 w-6 h-6 rounded-full bg-brand-50 text-brand-700 font-bold inline-flex items-center justify-center">
              2
            </span>
            <span>Você pode voltar uma pergunta e reiniciar.</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="shrink-0 w-6 h-6 rounded-full bg-brand-50 text-brand-700 font-bold inline-flex items-center justify-center">
              3
            </span>
            <span>Resultado mostra MBA principal e secundário.</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="shrink-0 w-6 h-6 rounded-full bg-brand-50 text-brand-700 font-bold inline-flex items-center justify-center">
              4
            </span>
            <span>Matrículas e ofertas oficiais são tratadas em ipog.edu.br.</span>
          </li>
        </ul>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button onClick={start} className="btn btn-primary btn-lg">
            Iniciar quiz
          </button>
          <a href="/mbas" className="btn btn-ghost btn-lg">
            Ver lista de MBAs antes
          </a>
        </div>
        <p className="mt-4 text-xs text-ink-500">
          Portal independente. Não é o site oficial do IPOG.
        </p>
      </div>
    );
  }

  if (view === 'questions') {
    const q = QUESTIONS[current];
    const selected = answers[current];

    return (
      <div className="card p-6 sm:p-8 animate-fade-in">
        <div className="flex items-center justify-between text-xs text-ink-500 uppercase tracking-wider font-semibold">
          <span>
            Pergunta {current + 1} de {total}
          </span>
          <span>{progress}% respondido</span>
        </div>
        <div
          className="mt-2 h-1.5 w-full rounded-full bg-surface-100 overflow-hidden"
          aria-hidden="true">
          <div
            className="h-full bg-sun-500 transition-all duration-300"
            style={{ width: `${Math.max(progress, ((current + 1) / total) * 100)}%` }}
          />
        </div>

        <h2 className="section-h text-xl sm:text-2xl mt-5">{q.text}</h2>
        {q.helper && (
          <p className="mt-2 text-sm text-ink-500">{q.helper}</p>
        )}

        <div className="mt-5 space-y-2.5">
          {q.options.map((opt, i) => {
            const active = selected === i;
            return (
              <button
                key={i}
                onClick={() => answer(i)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-150 ${
                  active
                    ? 'border-brand-600 bg-brand-50 text-brand-900 shadow-soft'
                    : 'border-surface-200 hover:border-brand-400 hover:bg-surface-50 text-ink-900'
                }`}
                aria-pressed={active}>
                <span className="inline-flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold border ${
                      active
                        ? 'border-brand-600 bg-brand-600 text-white'
                        : 'border-surface-200 text-ink-500'
                    }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{opt.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className={`btn btn-ghost btn-sm ${
              current === 0 ? 'opacity-40 cursor-not-allowed' : ''
            }`}>
            ← Voltar
          </button>
          <button onClick={reset} className="text-sm text-ink-500 hover:text-brand-800">
            Reiniciar
          </button>
        </div>
      </div>
    );
  }

  // result
  if (!result) return null;
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card p-6 sm:p-8 bg-brand-800 text-white border-brand-800">
        <span className="tag tag-dark uppercase">Resultado · orientação</span>
        <h2 className="section-h text-white text-2xl sm:text-3xl mt-3">
          Encaixe principal: {result.primary.shortName}
        </h2>
        <p className="mt-2 text-white/85">{result.primary.oneLiner}</p>
        <p className="mt-3 text-white/80 text-sm">{result.primary.description}</p>
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <a href={result.primary.href} className="btn btn-primary">
            Ler análise deste MBA
          </a>
          <a
            href="https://ipog.edu.br/"
            target="_blank"
            rel="noopener external"
            className="btn btn-ghost-dark">
            Ver grade no IPOG ↗
          </a>
        </div>
      </div>

      <div className="card p-6 sm:p-8 animate-scale-in">
        <span className="section-eyebrow">Plano B</span>
        <h3 className="section-h text-xl mt-2">
          Segundo encaixe: {result.secondary.shortName}
        </h3>
        <p className="mt-2 text-ink-700">{result.secondary.oneLiner}</p>
        <p className="mt-3 text-ink-700 text-sm">{result.secondary.description}</p>
        <a href={result.secondary.href} className="btn btn-ghost mt-4 btn-sm">
          Ver análise comparada →
        </a>
      </div>

      <div className="card p-6 sm:p-8">
        <span className="section-eyebrow">Ranking dos 5 MBAs</span>
        <h3 className="section-h text-lg mt-2">
          Como suas respostas distribuíram pontos
        </h3>
        <ul className="mt-4 space-y-3">
          {result.scores.map((row, i) => (
            <li key={row.mba.id}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-ink-900">
                  {i + 1}. {row.mba.shortName}
                </span>
                <span className="text-ink-500 tabular-nums">
                  {row.share}% · {row.score} pts
                </span>
              </div>
              <div
                className="mt-1 h-2 w-full rounded-full bg-surface-100 overflow-hidden"
                aria-hidden="true">
                <div
                  className={`h-full ${
                    i === 0 ? 'bg-sun-500' : 'bg-brand-300'
                  }`}
                  style={{ width: `${row.share}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={reset} className="btn btn-ghost">
          Refazer quiz
        </button>
        <a href="/recursos/guia-pos-psicologia" className="btn btn-ghost">
          Ler guia executivo
        </a>
        <a href="/recursos/checklist-escolher-pos-psicologia" className="btn btn-ghost">
          Ver checklist de elegibilidade
        </a>
      </div>

      <p className="text-xs text-ink-500">
        Portal independente. Resultado é orientação editorial baseada em padrões
        do mercado e na taxonomia dos cinco MBAs do IPOG cobertos por este
        portal. Não é recomendação formal de matrícula nem promessa de carreira.
      </p>
    </div>
  );
}
