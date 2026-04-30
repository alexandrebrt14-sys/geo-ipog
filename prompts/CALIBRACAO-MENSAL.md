# Calibração Mensal do Kit de Prompts

> **Status:** vigente desde 2026-04-30
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-04-30

## Por que recalibrar

O kit de prompts em `prompts/KIT-PROMPTS-V0.md` é um instrumento vivo. O mercado de pós-graduação em Psicologia muda, novas resoluções do CFP entram em vigor, novos termos surgem nas buscas (neuropsicologia infantil, terapias contextuais, ABA, ACT, mindfulness, psicologia positiva organizacional), LLMs atualizam pesos e mudam o que recuperam. Sem recalibração, o kit envelhece e o dashboard de Mention Rate fica medindo um Brasil de seis meses atrás.

A regra é simples: o kit tem uma versão (v0, v1, v2, ...) e um ciclo mensal de recalibração documentado neste arquivo. Bruno Azambuja conduz a recalibração; Alexandre Caramaschi homologa.

Cross-link obrigatório: `prompts/KIT-PROMPTS-V0.md`, `prompts/PAPEIS-DE-COLETA.md`, `dashboards/METRICAS-INDICADORES.md`, `docs/03-reunioes-e-cadencia-ipog.md`.

## Cadência

- **Mensal (toda primeira terça do mês):** sessão de calibração de 90 minutos. Bruno + Alexandre.
- **Trimestral:** revisão estrutural maior, possível bump de versão (v0 → v1).
- **Ad hoc:** mudança regulatória CFP/MEC, lançamento de campanha IPOG, evento de mercado (greve, escândalo, nova categoria).

## Quando adicionar prompt novo

Critérios cumulativos. Um sozinho não basta.

1. Termo apareceu em pelo menos 3 fontes vivas (Google Trends BR, Perplexity sonar-pro com filtro semanal, fóruns Reddit r/psicologiabrasil, comentários YouTube de canais de Psicologia).
2. Termo é compatível com pelo menos um dos 3 clusters semânticos (C1 organizacional, C2 clínica/neuro, C3 psicopedagogia).
3. Existe persona dentre P1 a P7 que faria essa pergunta naturalmente.
4. Pelo menos 1 LLM cross-cohort já trouxe IPOG ou competidor direto na resposta a esse prompt em testes preliminares (3 paráfrases).

Quando os 4 critérios são atendidos, o prompt entra como candidato. Antes de virar oficial, passa por **prompt sensitivity test** (ver seção dedicada abaixo).

## Quando aposentar prompt

Critérios cumulativos.

1. Mention Rate do prompt está abaixo de 10% por 3 medições consecutivas (ver `dashboards/METRICAS-INDICADORES.md`).
2. Volume de busca para o termo caiu mais de 40% em 90 dias (Google Trends BR ou Search Console se aplicável).
3. Persona-alvo do prompt foi reescopo ou removida do funil IPOG.
4. Prompt foi substituído por versão mais específica que cobre o mesmo intent.

Prompts aposentados não são deletados. Eles vão para `prompts/KIT-PROMPTS-V0.md` em seção "aposentados em ano-mês", com motivo declarado. Isso preserva auditoria histórica do dashboard.

## Como detectar deriva semântica de mercado

A deriva acontece quando o termo continua igual mas o que as pessoas querem dizer com ele mudou. Exemplo: "psicologia organizacional" em 2020 versus 2026 (em 2026 carrega forte componente de saúde mental no trabalho, NR 1 atualizada, ESG, neurodiversidade).

Sinais de deriva:

- LLMs cross-cohort respondem o mesmo prompt com fontes muito diferentes em duas medições com 30 dias de distância.
- Resposta-alvo definida no kit não bate mais com o que faria sentido para a persona hoje.
- Resultado top-3 da busca orgânica do Google muda mais de 60% em 90 dias.
- Comunidades Reddit/YouTube de Psicologia introduzem novo jargão que o prompt não cobre.

Quando detectada, deriva dispara reescrita do prompt e da resposta-alvo, mantendo o mesmo ID e marcando `versao` no kit (ex: PR-C1-P3-J2-v1 → PR-C1-P3-J2-v2 no histórico).

## Prompt sensitivity test

Todo prompt candidato passa por sensitivity antes de entrar oficialmente.

Procedimento:

1. Bruno Azambuja produz **5 paráfrases** do prompt original. Mantém intent, varia sintaxe, ordem das palavras, formalidade, presença/ausência de marcador temporal.
2. As 5 paráfrases rodam em **6 LLMs** (ChatGPT, Claude, Gemini, Perplexity, Grok, Copilot) por 7 dias consecutivos, uma medição por dia.
3. Para cada par (paráfrase, LLM), mede-se: presença de IPOG no top-3, presença de IPOG no top-5, qualidade da citação (com link, com nome correto, com persona certa), competidor que apareceu no lugar.
4. Total de medições: 5 paráfrases × 6 LLMs × 7 dias = 210 amostras.
5. Critério de robustez: o prompt é robusto se Mention Rate de IPOG for consistente (desvio padrão < 15 pontos percentuais) entre as 5 paráfrases.
6. Prompts não-robustos sinalizam que a busca semântica naquele intent está volátil, e indicam dois caminhos: (a) split em sub-prompts mais específicos, (b) calibrar conteúdo IPOG para cobrir as variações de intent.

Resultado da sensitivity é registrado no log mensal de calibração e referenciado no dashboard.

## Versionamento do kit

Esquema:

- **v0** — versão inicial, calibrada em 2026-04-30, sem dados históricos próprios.
- **v1** — primeira versão com dados de Mention Rate baseline acumulados (mínimo 30 dias). Esperada em 2026-06.
- **v2** — primeira versão com pelo menos um ciclo trimestral concluído. Esperada em 2026-08.
- **vN+** — incremento por ciclo trimestral, ou por evento ad hoc forte.

Mudança de versão exige:

- Changelog explícito no topo do arquivo do kit.
- Registro de prompts adicionados, alterados, aposentados.
- Registro da composição final em IDs.
- Aprovação Alexandre Caramaschi.
- Registro em `docs/03-reunioes-e-cadencia-ipog.md`.

## Saída do ritual mensal

Ata padrão de cada calibração mensal:

1. Resumo de Mention Rate, Share-of-Voice e Citation Quality Score do mês anterior.
2. Lista de prompts adicionados (com critério atendido).
3. Lista de prompts aposentados (com critério atendido).
4. Resultado de sensitivity tests do mês.
5. Deriva semântica detectada (se houver).
6. Decisão sobre bump de versão (sim/não).
7. Pendências para o mês seguinte.

A ata é gravada em `docs/calibracoes/YYYY-MM-DD-calibracao-mensal.md` (a Wave 4B cria o diretório se aplicável).

## Bloqueios críticos

- Não recalibrar sem dado: se o mês não acumulou pelo menos 4 medições do dashboard, posterga em 7 dias.
- Não aposentar prompt em campanha ativa do Bruno Azambuja sem alinhamento prévio.
- Não introduzir prompt novo sem sensitivity test concluído.
- Não fazer bump de versão sem aprovação Alexandre Caramaschi.

## Cross-references

- Para a estrutura do kit, `prompts/KIT-PROMPTS-V0.md`.
- Para os papéis do pipeline, `prompts/PAPEIS-DE-COLETA.md`.
- Para métricas e dashboard, `dashboards/METRICAS-INDICADORES.md`.
- Para cadência de reunião IPOG, `docs/03-reunioes-e-cadencia-ipog.md`.
