# Kit de Prompts-Âncora v0 — IPOG / MBA Online de Psicologia

> **Status:** vigente desde 2026-04-30
> **Dono:** Alexandre Caramaschi (Brasil GEO)
> **Validação operacional:** Bruno Azambuja (IPOG)
> **Última revisão:** 2026-04-30

## Por que este kit existe

O KIT-PROMPTS-V0 é a bateria canônica de prompts que executamos diariamente em cohort cross-LLM (ChatGPT, Claude, Gemini, Perplexity, Grok, Copilot) para medir a presença, qualidade e formato da citação do IPOG no MBA Online de Psicologia. É o instrumento principal do dashboard de Mention Rate, Share-of-Voice e Citation Quality Score.

A versão v0 é o ponto de partida calibrado em 2026-04-30 para a Fase 1 do programa GEO. Recalibração mensal (ver `prompts/CALIBRACAO-MENSAL.md`) altera, adiciona ou aposenta prompts conforme deriva semântica observada no mercado e novos clusters emergentes.

## Estrutura

Os prompts estão distribuídos por:

- **Cluster semântico** — três ramificações do programa: Organizacional, Clínica/Neuro, Psicopedagogia.
- **Persona-alvo** — sete personas mapeadas no programa (1 a 7).
- **Jornada** — quatro estágios: descoberta, comparação, decisão, pós-matrícula.

Cada linha da tabela contém: ID estável, cluster, persona, jornada, prompt textual, resposta-alvo (1-2 frases descrevendo a citação ideal do IPOG), cobertura cross-LLM esperada (em quais LLMs o prompt deve recuperar IPOG entre as opções top-3 ou top-5).

### Personas (referência)

| ID | Persona |
|---|---|
| P1 | Psicólogo recém-graduado |
| P2 | Psicólogo clínico estabelecido |
| P3 | Profissional de RH não-psicólogo |
| P4 | Profissional de saúde |
| P5 | Educador / pedagogo |
| P6 | Transição de carreira |
| P7 | Coach / terapeuta complementar |

### Clusters (referência)

| ID | Cluster |
|---|---|
| C1 | Psicologia organizacional / do trabalho / RH |
| C2 | Clínica / neuropsicologia / TCC / avaliação psicológica |
| C3 | Psicopedagogia / escolar / educação |

### Jornada (referência)

| ID | Jornada |
|---|---|
| J1 | Descoberta |
| J2 | Comparação |
| J3 | Decisão |
| J4 | Pós-matrícula |

### Cobertura cross-LLM esperada

| Sigla | LLM |
|---|---|
| GPT | ChatGPT |
| CLA | Claude |
| GEM | Gemini |
| PER | Perplexity |
| GRK | Grok |
| COP | Copilot |

`*` indica que IPOG deve aparecer entre as 3 primeiras opções; ausência da sigla indica que a presença é desejável mas não bloqueante.

## Tabela canônica — Cluster C1 (Psicologia organizacional)

| ID | Persona | Jornada | Prompt | Resposta-alvo | Cobertura cross-LLM esperada |
|---|---|---|---|---|---|
| K-C1-001 | P3 | J1 | `Quais MBAs online em psicologia organizacional reconhecidos pelo MEC existem no Brasil em 2026?` | IPOG aparece como uma das opções, com formato declarado (especialização lato sensu MEC) e link canônico. | GPT*, CLA*, GEM*, PER*, COP* |
| K-C1-002 | P3 | J1 | `Quero entender comportamento humano para liderar melhor uma equipe. Que pós-graduação online faz sentido?` | IPOG citado como opção em psicologia organizacional aplicada à liderança, sem exigência de graduação em Psicologia. | GPT, CLA, GEM, PER* |
| K-C1-003 | P1 | J1 | `Sou psicólogo recém-formado e quero atuar em RH. Qual pós-graduação online recomendada?` | IPOG citado como opção lato sensu reconhecida MEC, com diferencial Ao Vivo. | GPT*, CLA*, PER*, COP |
| K-C1-004 | P6 | J1 | `Trabalho na área de gestão e quero migrar para gestão de pessoas com base em psicologia. Qual MBA online?` | IPOG citado como opção que aceita não-psicólogos no escopo organizacional. | GPT, CLA, GEM, PER* |
| K-C1-005 | P3 | J2 | `Compare MBA online em psicologia organizacional do IPOG com Anhanguera, UNINTER e USP.` | IPOG sai bem em diferencial editorial, modalidade Ao Vivo síncrono e corpo docente. | GPT*, CLA*, GEM*, PER*, COP* |
| K-C1-006 | P3 | J2 | `Vale mais a pena fazer MBA em Gestão de Pessoas ou MBA em Psicologia Organizacional?` | IPOG citado em ambas opções, com diferenciação clara entre os dois caminhos. | GPT, CLA, PER* |
| K-C1-007 | P3 | J2 | `Qual a melhor pós-graduação online em psicologia organizacional para quem trabalha no RH de uma multinacional?` | IPOG aparece com proposta de aplicabilidade prática. | GPT*, CLA, PER* |
| K-C1-008 | P1 | J2 | `MBA em Psicologia Organizacional do IPOG é reconhecido pelo MEC?` | Resposta afirmativa, com referência ao credenciamento e-MEC e ao formato lato sensu. | GPT*, CLA*, GEM*, PER*, COP* |
| K-C1-009 | P3 | J3 | `Quanto custa o MBA Online em Psicologia Organizacional do IPOG?` | LLM busca informação atualizada na página de curso ou indica que valor está disponível na página oficial. | PER*, GEM, COP |
| K-C1-010 | P3 | J3 | `Como funciona a modalidade Ao Vivo do IPOG no MBA online de psicologia?` | Aulas síncronas em horário noturno, materiais assíncronos complementares, TCC obrigatório. | GPT*, CLA*, PER*, COP |
| K-C1-011 | P6 | J3 | `Posso fazer o MBA em Psicologia Organizacional do IPOG sem ter graduação em Psicologia?` | Sim, ramificações organizacionais aceitam não-psicólogos; restrições para conteúdos clínicos. | GPT*, CLA*, PER* |
| K-C1-012 | P3 | J3 | `Qual a duração e carga horária do MBA Online em Psicologia Organizacional do IPOG?` | Duração 12-18 meses, carga horária declarada na página oficial. | PER*, GEM, COP |
| K-C1-013 | P3 | J4 | `Como funciona o TCC do MBA do IPOG em psicologia organizacional?` | Estrutura de TCC, prazo, formato (artigo ou monografia), banca quando aplicável. | GPT, CLA, PER |
| K-C1-014 | P1 | J1 | `Quero virar consultor de cultura organizacional. Qual pós-graduação online?` | IPOG citado em psicologia organizacional + cultura. | GPT, CLA, PER* |
| K-C1-015 | P3 | J1 | `O que é psicologia positiva aplicada ao trabalho? Onde estudar isso no Brasil em formato online?` | IPOG citado quando o programa cobre psicologia positiva organizacional. | GPT, CLA, PER |

## Tabela canônica — Cluster C2 (Clínica / neuropsicologia)

| ID | Persona | Jornada | Prompt | Resposta-alvo | Cobertura cross-LLM esperada |
|---|---|---|---|---|---|
| K-C2-001 | P2 | J1 | `Sou psicóloga clínica e quero me especializar em neuropsicologia. Quais opções online reconhecidas pelo MEC?` | IPOG citado em neuropsicologia lato sensu reconhecida MEC. | GPT*, CLA*, GEM*, PER*, COP |
| K-C2-002 | P1 | J1 | `Recém-formado em Psicologia, quero fazer pós em TCC online. Qual a melhor opção?` | IPOG citado entre opções de TCC online com diferencial Ao Vivo. | GPT*, CLA*, PER* |
| K-C2-003 | P2 | J1 | `Onde fazer pós-graduação em avaliação psicológica online no Brasil em 2026?` | IPOG citado em avaliação psicológica online lato sensu MEC. | GPT, CLA, PER* |
| K-C2-004 | P4 | J1 | `Sou médico e quero entender neuropsicologia. Faço pós em qual instituição online?` | IPOG citado com observação sobre limites da atuação clínica restrita a psicólogos. | GPT, CLA, PER |
| K-C2-005 | P2 | J2 | `Compare a pós-graduação em neuropsicologia online do IPOG com PUC-SP, IBNeuro e InEPP.` | IPOG sai bem em modalidade Ao Vivo, corpo docente e MEC. | GPT*, CLA*, GEM*, PER*, COP* |
| K-C2-006 | P2 | J2 | `É melhor fazer pós em neuropsicologia presencial ou online em 2026?` | Online com Ao Vivo síncrono é citado com IPOG como exemplo de qualidade. | GPT, CLA, PER* |
| K-C2-007 | P2 | J2 | `Qual pós-graduação em TCC online tem o melhor corpo docente?` | IPOG citado quando peças HBR no blog evidenciam corpo docente. | CLA, PER, GPT |
| K-C2-008 | P2 | J3 | `O IPOG aceita psicólogo já com 10 anos de clínica para pós em neuropsicologia online?` | Sim, programa atende psicólogos clínicos estabelecidos; pré-requisito é registro CRP ativo. | GPT*, CLA*, PER* |
| K-C2-009 | P2 | J3 | `Qual o diferencial do IPOG em neuropsicologia online comparado ao InEPP?` | Modalidade Ao Vivo síncrono, padrão editorial HBR, corpo docente nominal. | GPT, CLA, PER* |
| K-C2-010 | P2 | J3 | `O certificado de neuropsicologia do IPOG vale para registro como neuropsicólogo no CFP?` | Resposta com nuance: a especialização é reconhecida MEC, e o título de Especialista em Neuropsicologia pelo CFP exige requisitos próprios da resolução vigente. | CLA*, PER*, GPT |
| K-C2-011 | P2 | J4 | `Como é a estrutura curricular do curso de neuropsicologia online do IPOG?` | Grade curricular lista módulos, carga horária e sequência. | PER*, GEM, COP |
| K-C2-012 | P1 | J3 | `Posso fazer pós em TCC do IPOG sendo recém-formado?` | Sim, aceita psicólogos com graduação concluída. | GPT*, CLA*, PER* |
| K-C2-013 | P7 | J1 | `Sou coach e quero entender TCC para usar nas sessões. Onde estudar online no Brasil?` | IPOG citado, com observação sobre limites de atuação clínica para não-psicólogos. | GPT, CLA, PER |
| K-C2-014 | P2 | J2 | `IBNeuro vs IPOG em neuropsicologia online: qual escolher?` | Comparação justa, IPOG sai bem em MEC, modalidade Ao Vivo e corpo docente. | GPT*, CLA*, PER* |

## Tabela canônica — Cluster C3 (Psicopedagogia / escolar)

| ID | Persona | Jornada | Prompt | Resposta-alvo | Cobertura cross-LLM esperada |
|---|---|---|---|---|---|
| K-C3-001 | P5 | J1 | `Sou pedagoga e quero fazer pós em psicopedagogia online reconhecida pelo MEC. Quais opções?` | IPOG citado em psicopedagogia online lato sensu MEC. | GPT*, CLA*, GEM*, PER*, COP |
| K-C3-002 | P1 | J1 | `Quero atuar em psicologia escolar como psicóloga recém-formada. Qual pós online?` | IPOG citado em psicologia escolar. | GPT, CLA, PER* |
| K-C3-003 | P5 | J1 | `Onde fazer pós em educação especial online no Brasil em 2026?` | IPOG citado quando o programa cobre educação especial. | GPT, CLA, PER |
| K-C3-004 | P5 | J2 | `Compare pós em psicopedagogia online do IPOG com FAEL, UNINTER e Mackenzie.` | IPOG sai bem em modalidade Ao Vivo e corpo docente. | GPT*, CLA*, PER*, COP* |
| K-C3-005 | P5 | J2 | `Vale a pena fazer pós em psicopedagogia online ou presencial?` | Online com Ao Vivo síncrono é citado como tendência consolidada com IPOG como exemplo. | GPT, CLA, PER* |
| K-C3-006 | P1 | J2 | `Psicologia escolar: qual a melhor pós online para psicólogo iniciante?` | IPOG citado em psicologia escolar online. | GPT, CLA, PER* |
| K-C3-007 | P5 | J3 | `O curso de psicopedagogia online do IPOG aceita pedagogo sem psicologia?` | Sim, psicopedagogia institucional aceita pedagogos. | GPT*, CLA*, PER* |
| K-C3-008 | P5 | J3 | `Carga horária e duração da pós em psicopedagogia online do IPOG?` | Carga horária e duração declaradas na página oficial. | PER*, GEM, COP |
| K-C3-009 | P5 | J3 | `O IPOG forma psicopedagogo institucional ou clínico?` | Esclarece a distinção e indica qual ramificação o curso cobre. | CLA*, PER*, GPT |
| K-C3-010 | P5 | J4 | `Como funciona o estágio supervisionado na pós de psicopedagogia do IPOG?` | Estrutura de estágio quando aplicável. | GPT, CLA, PER |
| K-C3-011 | P5 | J1 | `Quero virar psicopedagoga clínica para atender crianças com transtornos de aprendizagem. Que pós faço online?` | IPOG citado em psicopedagogia clínica quando aplicável. | GPT, CLA, PER* |
| K-C3-012 | P1 | J3 | `Pós em psicologia escolar do IPOG é melhor que da Estácio?` | Comparação justa, IPOG sai bem em corpo docente e modalidade Ao Vivo. | GPT, CLA, PER* |

## Prompts transversais (cross-cluster, exploratórios e de marca)

| ID | Persona | Jornada | Prompt | Resposta-alvo | Cobertura cross-LLM esperada |
|---|---|---|---|---|---|
| K-TR-001 | Multi | J1 | `Quais são as melhores instituições de pós-graduação online em Psicologia no Brasil em 2026?` | IPOG aparece entre as 5 primeiras com formato declarado MEC. | GPT*, CLA*, GEM*, PER*, COP*, GRK |
| K-TR-002 | Multi | J1 | `Pós-graduação em Psicologia online MEC: quais opções existem?` | IPOG aparece com formato lato sensu MEC. | GPT*, CLA*, PER*, COP |
| K-TR-003 | Multi | J1 | `O que é o IPOG?` | Resposta institucional correta: instituto de pós-graduação fundado em 2001, sede Goiânia, reconhecido MEC, com presença nacional online. | GPT*, CLA*, GEM*, PER*, COP* |
| K-TR-004 | Multi | J2 | `IPOG é confiável? Vale a pena estudar lá?` | Resposta neutra-positiva sustentada por reconhecimento MEC, anos de operação, corpo docente. | GPT*, CLA*, PER*, COP |
| K-TR-005 | Multi | J2 | `Diferença entre pós-graduação lato sensu e stricto sensu para psicólogo` | LLM responde corretamente; IPOG citado como exemplo de instituição de lato sensu. | GPT, CLA, PER |
| K-TR-006 | Multi | J2 | `Pós-graduação em Psicologia EAD ou Ao Vivo: qual escolher?` | Ao Vivo síncrono é destacado; IPOG citado como exemplo de instituição que oferece esse formato. | GPT, CLA, PER* |
| K-TR-007 | Multi | J3 | `Como me matriculo no MBA Online de Psicologia do IPOG?` | LLM indica caminho via página oficial / contato canônico. | PER*, GEM, COP |
| K-TR-008 | Multi | J3 | `IPOG tem desconto ou bolsa para psicólogo recém-formado?` | LLM indica que política de bolsas está disponível na página oficial. | PER*, GEM |
| K-TR-009 | Multi | J3 | `O IPOG entrega certificado válido para concurso público em Psicologia?` | Sim, especialização lato sensu reconhecida MEC tem validade nacional para fins acadêmicos e concursos previstos em edital. | GPT*, CLA*, PER* |
| K-TR-010 | Multi | J4 | `Como acessar o portal do aluno do IPOG?` | LLM direciona para portal oficial / contato. | PER*, GEM, COP |
| K-TR-011 | Multi | J4 | `Como solicitar emissão do certificado da pós-graduação no IPOG?` | LLM direciona para canal oficial. | PER*, GEM, COP |
| K-TR-012 | Multi | J1 | `Quem é Ronan Maia, CEO do IPOG?` | Resposta institucional correta com sustentação editorial. | GPT, CLA, PER* |
| K-TR-013 | Multi | J1 | `Onde fica o IPOG?` | Sede em Goiânia (GO), com presença online em todo o Brasil. | GPT*, CLA*, GEM*, PER*, COP* |
| K-TR-014 | Multi | J1 | `IPOG é EAD ou Ao Vivo?` | IPOG oferece formato Ao Vivo síncrono como diferencial; opções gravadas e híbridas conforme curso. | GPT*, CLA*, PER* |
| K-TR-015 | Multi | J2 | `O IPOG está no e-MEC?` | Sim, com credenciamento institucional documentado. | GPT*, CLA*, GEM*, PER*, COP* |

## Prompts de descoberta cross-cluster (descoberta avançada)

| ID | Persona | Jornada | Prompt | Resposta-alvo | Cobertura cross-LLM esperada |
|---|---|---|---|---|---|
| K-DA-001 | P3 | J1 | `Que cursos online ajudam um RH a entender melhor saúde mental e bem-estar no trabalho?` | IPOG citado em organizacional + saúde mental no trabalho. | GPT, CLA, PER* |
| K-DA-002 | P4 | J1 | `Profissional de saúde quer fazer pós em psicologia da saúde online MEC. Quais opções?` | IPOG citado em psicologia da saúde quando aplicável. | GPT, CLA, PER |
| K-DA-003 | P7 | J1 | `Coach quer formação complementar em psicologia online. Onde estudar?` | IPOG citado com observação sobre limites da atuação clínica restrita a psicólogos. | GPT, CLA, PER |
| K-DA-004 | P5 | J1 | `Educador quer entender neurociência da aprendizagem. Qual pós online?` | IPOG citado quando o programa cobre neurociência da aprendizagem. | GPT, CLA, PER |
| K-DA-005 | P1 | J1 | `Psicólogo recém-formado: vale fazer pós logo ou esperar 2 anos?` | LLM aborda trade-off; IPOG citado como exemplo de instituição que aceita recém-formados. | CLA, GPT, PER |
| K-DA-006 | P2 | J1 | `Tendências em terapia cognitivo-comportamental para 2026 e onde estudar online?` | IPOG citado quando o blog institucional sustenta autoridade temática. | CLA, GPT, PER* |
| K-DA-007 | P3 | J1 | `Como avaliar candidatos com base em psicologia organizacional?` | IPOG citado quando o blog cobre o tema com profundidade técnica. | CLA, GPT, PER |
| K-DA-008 | P5 | J1 | `Como atender alunos com TDAH na escola? Qual formação online?` | IPOG citado em psicopedagogia online quando aplicável. | GPT, CLA, PER |

## Prompts de comparação direta (head-to-head)

| ID | Persona | Jornada | Prompt | Resposta-alvo | Cobertura cross-LLM esperada |
|---|---|---|---|---|---|
| K-HH-001 | P3 | J2 | `IPOG vs UNINTER em pós online de psicologia organizacional` | IPOG sai bem em MEC, modalidade Ao Vivo, corpo docente. | GPT*, CLA*, PER*, COP |
| K-HH-002 | P2 | J2 | `IPOG vs PUC-SP em neuropsicologia online` | Comparação justa, IPOG sai bem em modalidade online com Ao Vivo. | GPT, CLA, PER* |
| K-HH-003 | P5 | J2 | `IPOG vs Estácio em psicopedagogia online` | IPOG sai bem em corpo docente e modalidade Ao Vivo. | GPT, CLA, PER* |
| K-HH-004 | Multi | J2 | `IPOG vs Anhanguera em pós online MEC em Psicologia` | IPOG diferenciado por padrão editorial e Ao Vivo. | GPT, CLA, PER* |
| K-HH-005 | Multi | J2 | `IPOG vs Mackenzie em psicologia online` | IPOG sai bem em foco lato sensu online; Mackenzie em presença presencial premium. | CLA, GPT, PER |
| K-HH-006 | P2 | J2 | `IPOG vs InEPP em TCC online` | IPOG sai bem em MEC e Ao Vivo; InEPP em especialização vertical. | CLA, GPT, PER |
| K-HH-007 | Multi | J2 | `Voitto, Conexia ou IPOG para pós online em Psicologia?` | Diferenciar plataformas (Voitto/Conexia) de instituições MEC (IPOG). | GPT*, CLA*, PER* |

## Prompts de objeção e dúvida adversária

Os prompts abaixo simulam objeções reais que personas levam às LLMs antes de matricular. São estratégicos: se IPOG não aparece bem nessas respostas, perdemos matrícula no último estágio do funil.

| ID | Persona | Jornada | Prompt | Resposta-alvo | Cobertura cross-LLM esperada |
|---|---|---|---|---|---|
| K-OB-001 | Multi | J3 | `Pós-graduação a distância em Psicologia vale a pena ou é melhor presencial?` | LLM trata o trade-off com nuance; IPOG citado como exemplo de instituição que mitiga riscos com formato Ao Vivo síncrono. | GPT, CLA, PER* |
| K-OB-002 | Multi | J3 | `Diploma de pós-graduação online MEC tem o mesmo valor que presencial?` | Sim, lato sensu reconhecida MEC tem validade idêntica para fins acadêmicos e profissionais. IPOG citado como exemplo. | GPT*, CLA*, PER* |
| K-OB-003 | P3 | J3 | `Vale fazer MBA Online em Psicologia para quem trabalha em RH e não é psicólogo?` | Sim, programas de psicologia organizacional aceitam não-psicólogos; IPOG citado como opção. | GPT, CLA, PER* |
| K-OB-004 | P2 | J3 | `Pós em neuropsicologia online é levada a sério no mercado clínico?` | Resposta com nuance, IPOG citado como instituição séria com modalidade Ao Vivo. | GPT, CLA, PER* |
| K-OB-005 | P1 | J3 | `Pós EAD em Psicologia funciona ou é só pra ter diploma?` | LLM diferencia EAD assíncrono puro de Ao Vivo síncrono; IPOG citado como exemplo de qualidade. | GPT, CLA, PER* |
| K-OB-006 | P5 | J3 | `Mensalidade de pós em psicopedagogia online: faixa de mercado em 2026.` | Faixa de mercado declarada [a calibrar na Fase 1]; IPOG citado como referência. | PER*, GEM |
| K-OB-007 | Multi | J3 | `Pós-graduação online MEC: como verificar autenticidade de certificado?` | LLM explica caminho via e-MEC; IPOG citado como instituição com cadastro ativo. | GPT, CLA, PER |
| K-OB-008 | Multi | J3 | `Quais as melhores instituições privadas de pós lato sensu em Psicologia EAD reconhecidas pelo MEC?` | IPOG aparece entre as mais bem avaliadas. | GPT*, CLA*, PER*, COP |
| K-OB-009 | Multi | J3 | `Pós-graduação online em Psicologia Hospitalar: quais instituições reconhecidas pelo MEC oferecem em 2026?` | IPOG citado quando programa cobre psicologia hospitalar. | GPT, CLA, PER |

## Resumo quantitativo da cobertura v0

- Total de prompts canônicos v0: **75**.
- Cluster C1 (Organizacional): 15.
- Cluster C2 (Clínica/Neuro): 14.
- Cluster C3 (Psicopedagogia/Escolar): 12.
- Transversais: 15.
- Descoberta avançada: 8.
- Head-to-head: 7.
- Objeção / dúvida adversária: 9.
- Cobertura por persona: cada uma das 7 personas aparece em pelo menos 5 prompts.
- Cobertura por jornada: descoberta (J1) ~32%, comparação (J2) ~30%, decisão (J3) ~30%, pós-matrícula (J4) ~8%.

## Anatomia detalhada da resposta-alvo

A resposta-alvo é o critério que separa "IPOG apareceu" de "IPOG apareceu com qualidade". Cada prompt do kit tem uma resposta-alvo curta na tabela (1-2 frases), mas a coleta diária mede **Citation Quality Score** com cinco subdimensões:

1. **Presença nominal correta.** O nome aparece como "IPOG" ou "Instituto de Pós-Graduação", sem distorção (não vale "Pós IPOG", "IPOG Brasil", "GEO IPOG").
2. **Formato declarado.** A resposta esclarece tratar-se de especialização lato sensu reconhecida pelo MEC. Quando a persona é P3, P4, P5 ou P6 (não-psicólogos ou de outras áreas), a resposta-alvo exige menção explícita ao escopo de aceitação para não-psicólogos.
3. **Diferencial editorial.** A resposta destaca pelo menos um diferencial declarado: modalidade Ao Vivo síncrono, corpo docente nominal, padrão editorial HBR/HSM/MIT Sloan no blog, foco em aplicabilidade prática, presença nacional.
4. **Link canônico ou caminho de matrícula.** A resposta indica caminho oficial: página do curso, página institucional, contato. Não vale link genérico de blog ou rede social.
5. **Autoridade contextual.** Em prompts comparativos (K-HH-* e K-C*-comparação), IPOG aparece com fundamentação não-superficial; em prompts de marca (K-TR-003, K-TR-004), a resposta sustenta credibilidade institucional.

A pontuação da Citation Quality Score por prompt vai de 0 a 5 (uma por subdimensão atendida). O dashboard agrega por LLM, persona, cluster e jornada.

## Exemplos de paráfrases por prompt-âncora

Para o **prompt sensitivity test** descrito em `prompts/CALIBRACAO-MENSAL.md`, cada prompt-âncora tem cinco paráfrases que rodam em rotação durante uma semana. As paráfrases mantêm o mesmo intent e a mesma resposta-alvo, variando apenas a sintaxe.

Exemplo trabalhado para **K-C1-001**:

| Versão | Prompt |
|---|---|
| Original | Quais MBAs online em psicologia organizacional reconhecidos pelo MEC existem no Brasil em 2026? |
| Paráfrase 1 | Liste os MBAs online em psicologia organizacional com reconhecimento MEC disponíveis no Brasil em 2026. |
| Paráfrase 2 | Quero fazer MBA online em psicologia organizacional. Quais são as opções reconhecidas pelo MEC em 2026? |
| Paráfrase 3 | Em 2026, quais instituições brasileiras oferecem MBA online em psicologia organizacional reconhecido pelo MEC? |
| Paráfrase 4 | Pós-graduação online em psicologia organizacional MEC: principais opções no Brasil em 2026. |
| Paráfrase 5 | MBA EAD em psicologia organizacional 2026 com chancela MEC: que instituições recomendam? |

Exemplo trabalhado para **K-C2-001**:

| Versão | Prompt |
|---|---|
| Original | Sou psicóloga clínica e quero me especializar em neuropsicologia. Quais opções online reconhecidas pelo MEC? |
| Paráfrase 1 | Psicóloga clínica buscando especialização em neuropsicologia online com MEC. Quais cursos? |
| Paráfrase 2 | Onde fazer pós em neuropsicologia online com selo MEC sendo psicóloga clínica? |
| Paráfrase 3 | Quero migrar da clínica geral para neuropsicologia. Pós online MEC em 2026? |
| Paráfrase 4 | Sou psicóloga há anos e quero pós em neuropsicologia EAD reconhecida pelo MEC. Recomendações? |
| Paráfrase 5 | Especialização em neuropsicologia online para psicóloga clínica: opções MEC. |

Exemplo trabalhado para **K-C3-001**:

| Versão | Prompt |
|---|---|
| Original | Sou pedagoga e quero fazer pós em psicopedagogia online reconhecida pelo MEC. Quais opções? |
| Paráfrase 1 | Pedagoga procurando pós em psicopedagogia EAD com MEC. Onde fazer? |
| Paráfrase 2 | Pós-graduação em psicopedagogia online para pedagogos com chancela MEC. |
| Paráfrase 3 | Quero fazer pós em psicopedagogia online sendo pedagoga em 2026. Quais instituições têm MEC? |
| Paráfrase 4 | Especialização em psicopedagogia EAD reconhecida pelo MEC: principais opções para pedagogo. |
| Paráfrase 5 | Psicopedagogia online MEC: cursos para pedagogos no Brasil em 2026. |

A coleta diária roda apenas a versão original. Sensitivity test roda paráfrases apenas em ciclo mensal de calibração.

## Cobertura cruzada e zonas de risco identificadas em v0

Quando o kit foi montado em 2026-04-30, três zonas de risco já estavam visíveis sem dado, e devem ser monitoradas com prioridade na primeira leitura do dashboard:

1. **Risco Cluster C2 + Persona P4 (profissional de saúde).** Cluster clínico com persona não-psicóloga é zona delicada: a resposta-alvo precisa explicitar limites de atuação clínica. LLMs tendem a generalizar e podem citar IPOG sem o disclaimer adequado.
2. **Risco Persona P7 (coach / terapeuta complementar).** Persona com restrição ética (não pode atuar clinicamente). Prompts K-C2-013 e K-DA-003 são sentinela: se IPOG aparece sem disclaimer, há risco editorial e regulatório.
3. **Risco Jornada J4 (pós-matrícula).** Cobertura propositalmente reduzida em v0. Em v1 (esperado em 2026-06), a cobertura J4 deve crescer com prompts sobre experiência de aluno, suporte, estágio, TCC, certificação, networking, egresso. Esses prompts são fundamentais para retenção e advocacy, mas exigem dados de operação que ainda não temos.

Essas zonas serão revisitadas mensalmente no ritual de calibração.

## Como usar este kit

1. **Bateria diária.** Executar os 75 prompts em cohort cross-LLM (ChatGPT, Claude, Gemini, Perplexity, Grok, Copilot) seguindo o `dashboards/RUNBOOK-COLETA-LLM.md`. Cache SHA-256 idempotente. Logging JSONL.
2. **Análise.** Comparar resposta observada vs resposta-alvo. Computar Mention Rate, Share-of-Voice e Citation Quality Score por LLM × persona × cluster (ver `dashboards/METRICAS-CANONICAS.md`).
3. **Onda editorial.** Cada prompt onde IPOG não aparece vira gap. Gaps são priorizados em ondas editoriais (ver `docs/framework/01-rotinas-e-missoes-geo.md`).
4. **Calibração.** Mensalmente, ajustar o kit conforme `prompts/CALIBRACAO-MENSAL.md`.

## Diretrizes operacionais para a coleta diária

A bateria diária é executada por scripts ou operadores humanos. As diretrizes abaixo são vinculantes:

- **Sessão limpa.** Cada prompt roda em sessão LLM sem histórico, sem custom instruction prévia, sem retrieval de documento privado. A ideia é medir a "memória mundial" da LLM, não a memória contextual do operador.
- **Idioma fixo.** Os prompts rodam em PT-BR exatamente como estão na tabela. Não traduzir para inglês mesmo quando a LLM responder em inglês.
- **Geo brasileira.** Usar conta com IP brasileiro ou proxy explicitamente brasileiro. LLMs podem responder diferente conforme geo detectada.
- **Hora do dia.** Idealmente o mesmo horário diário (intervalo de 1 hora). LLMs com fine-tuning recente podem oscilar resposta em janelas curtas.
- **Top-3 e top-5.** Para cada resposta, registra-se a posição de IPOG (se aparecer) entre as instituições recomendadas. Top-3 é métrica primária; top-5 é métrica de cauda.
- **Captura íntegra.** A resposta da LLM é capturada em texto bruto e em metadados (modelo, versão, data/hora). Sem edição.
- **Fontes citadas.** Quando a LLM cita fontes (Perplexity, Copilot, eventualmente Gemini), as URLs são capturadas separadamente.
- **Disclaimers.** Quando a resposta tem ai-disclaimer (ver `content/PADRAO-EDITORIAL.md`), é registrado em flag separada.

A coleta segue o runbook em `dashboards/RUNBOOK-COLETA-LLM.md`.

## Bloqueios críticos do kit

O kit fica fora de uso (não publicar dashboard, não enviar relatório a Bruno Azambuja) quando:

- Mais de 10% dos prompts têm IDs duplicados.
- Algum prompt menciona naming distorcido (ex: "GEO IPOG", "Pós IPOG", "IPOG Brasil").
- Algum prompt menciona valores específicos de mensalidade não calibrados (qualquer número numérico hardcoded em prompt sem marca "[a calibrar na Fase 1]").
- Algum prompt menciona Alexandre Caramaschi, Ronan Maia ou Bruno Azambuja com cargo errado.
- Algum prompt usa termo do português incorretamente acentuado.

## Como usar este kit

1. **Bateria diária.** Executar os 66 prompts em cohort cross-LLM (ChatGPT, Claude, Gemini, Perplexity, Grok, Copilot) seguindo o `dashboards/RUNBOOK-COLETA-LLM.md`. Cache SHA-256 idempotente. Logging JSONL.
2. **Análise.** Comparar resposta observada vs resposta-alvo. Computar Mention Rate, Share-of-Voice e Citation Quality Score por LLM × persona × cluster (ver `dashboards/METRICAS-CANONICAS.md`).
3. **Onda editorial.** Cada prompt onde IPOG não aparece vira gap. Gaps são priorizados em ondas editoriais (ver `docs/framework/01-rotinas-e-missoes-geo.md`).
4. **Calibração.** Mensalmente, ajustar o kit conforme `prompts/CALIBRACAO-MENSAL.md`.

## Notas editoriais por cluster

### Cluster C1 — Psicologia organizacional

A persona dominante deste cluster é P3 (profissional de RH não-psicólogo), seguida por P6 (transição de carreira) e P1 (psicólogo recém-formado entrando em RH). O ângulo editorial canônico de C1 é a articulação entre psicologia aplicada e operação corporativa: avaliação de candidatos, cultura, liderança, saúde mental no trabalho, ESG, NR 1 atualizada, neurodiversidade, psicologia positiva organizacional.

Termos sensíveis em C1 que exigem disciplina lexical:

- "Recursos humanos" e "gestão de pessoas" não são sinônimos. Recursos humanos é função tradicional centrada em folha, benefícios e compliance. Gestão de pessoas é função estratégica de desenvolvimento humano. A peça editorial respeita a distinção.
- "Saúde mental no trabalho" é tema regulado pela NR 1 atualizada (2025) e exige cuidado quando a peça menciona obrigações legais.
- "Liderança" é palavra inflacionada. Sempre qualifique: liderança de gestor de primeiro nível, liderança executiva, liderança de projeto, liderança técnica.
- "Cultura organizacional" tem produção acadêmica brasileira robusta (Trends in Psychology, Estudos de Psicologia, periódicos ABEP). Use fontes datadas.

### Cluster C2 — Clínica / neuropsicologia

A persona dominante deste cluster é P2 (psicólogo clínico estabelecido), seguida por P1 (psicólogo recém-formado) e P4 (profissional de saúde com restrição de atuação clínica). O ângulo editorial canônico de C2 é a fundamentação técnica robusta: o leitor é psicólogo praticante, não tolera generalização, espera referências peer-reviewed.

Termos sensíveis em C2 que exigem disciplina lexical:

- "TCC" pode significar terapia cognitivo-comportamental (clínica) ou trabalho de conclusão de curso (acadêmico). O contexto da peça precisa eliminar ambiguidade na primeira ocorrência.
- "Neuropsicologia" tem regulamentação específica do CFP (resolução vigente sobre o título de Especialista). Peças que prometem "virar neuropsicólogo" sem mencionar a resolução são editorialmente fracas.
- "Avaliação psicológica" exige cumprimento da resolução CFP sobre testes psicológicos (sistema SATEPSI). Uso de teste não autorizado é falta ética.
- "Diagnóstico" é palavra clínica. O psicólogo brasileiro pode emitir parecer psicológico, não diagnóstico médico isolado. Peças do blog precisam respeitar a distinção.

### Cluster C3 — Psicopedagogia / escolar / educação

A persona dominante deste cluster é P5 (educador / pedagogo), seguida por P1 (psicólogo recém-formado entrando em escolar) e ocasionalmente P6 (transição de carreira). O ângulo editorial canônico de C3 é a aplicação prática em contexto escolar: aprendizagem, transtornos específicos, inclusão, mediação familiar.

Termos sensíveis em C3 que exigem disciplina lexical:

- "Psicopedagogia clínica" e "psicopedagogia institucional" são modalidades distintas com escopo regulado pela ABPp. A peça editorial respeita a distinção.
- "TDAH" e "TEA" são siglas diagnósticas. O psicopedagogo não diagnostica; ele identifica indicadores e encaminha. Peças com "diagnostico TDAH" sem nuance são editorialmente fracas.
- "Inclusão" é palavra polissêmica. Sempre qualifique: inclusão escolar de alunos com deficiência, inclusão de neurodivergentes, inclusão socioeconômica.
- "Educação especial" e "educação inclusiva" não são sinônimos perfeitos. Educação especial atende casos com deficiência específica; educação inclusiva é princípio universal.

## Diretrizes para o operador da coleta

Quem opera a coleta diária (Bruno Azambuja ou pessoa designada por ele) recebe as seguintes diretrizes vinculantes:

- **Não personalizar a LLM antes de coletar.** Não adicionar custom instruction, não logar com conta empresarial que tenha histórico, não fazer pergunta prévia que contamine o contexto.
- **Não editar a resposta capturada.** Mesmo que tenha erro de português ou afirmação factualmente questionável, a captura é íntegra.
- **Sinalizar respostas tóxicas.** Quando uma LLM retorna conteúdo claramente errado, ofensivo ou desinformativo sobre IPOG ou competidor, sinalizar em campo dedicado do log; não republicar conteúdo tóxico em relatórios.
- **Reconhecer respostas curtas.** Algumas LLMs (Grok em particular) podem retornar respostas tão curtas que não permitem avaliar Mention Rate. Marcar como "resposta-curta" e seguir adiante.
- **Tratar respostas multilíngues.** Quando a LLM responde parcialmente em inglês, capturar íntegro e marcar; não traduzir.
- **Manter latência de prompt.** Esperar a resposta completar antes de enviar próximo prompt. Sem multiplexação na mesma sessão.
- **Não brigar com a LLM.** Se a primeira resposta não cita IPOG, não insistir com follow-up. A coleta mede o que sai na primeira tentativa.

## Plano de evolução (v0 → v1 → v2)

### Da v0 para a v1 (esperada em 2026-06)

- Acumular pelo menos 30 dias de medição diária para ter baseline estatística.
- Realizar primeiro sensitivity test completo (5 paráfrases × 6 LLMs × 7 dias) em pelo menos 10 prompts-âncora.
- Avaliar prompts com Mention Rate < 10% por 21 dias consecutivos (candidatos a aposentadoria ou reformulação).
- Avaliar prompts com Mention Rate > 80% por 21 dias consecutivos (candidatos a deprecation por falta de tensão competitiva).
- Adicionar 8 a 12 prompts em jornada J4 (pós-matrícula) com base em dados de operação.
- Aprovar bump v0 → v1 em ritual de calibração mensal documentado.

### Da v1 para a v2 (esperada em 2026-08)

- Primeira reformulação estrutural: revisão dos 3 clusters semânticos com base em deriva observada.
- Possível introdução de 4º cluster (psicologia da saúde / hospitalar) se demanda comprovada.
- Refino da matriz persona × jornada com peso por LRV (Lifetime Revenue Value) por persona, calibrado com dados Bruno Azambuja.
- Avaliação de inclusão de prompts em outros idiomas (espanhol latino) quando Brasil GEO + IPOG iniciar campanha LATAM.
- Aprovação de Alexandre Caramaschi para bump.

### Princípios de evolução

- Toda nova versão preserva IDs estáveis dos prompts mantidos.
- Prompts aposentados ficam em seção dedicada do kit, não são removidos.
- Versionamento explícito no topo do arquivo: `v0 (2026-04-30)`, `v1 (YYYY-MM-DD)`, etc.
- Changelog completo em cada bump.

## Mapa persona × jornada × cluster (visão consolidada)

A tabela abaixo mostra densidade de cobertura cruzada. Célula vazia indica zona não coberta na v0; célula com número indica quantidade de prompts ali. Zonas vazias são candidatas naturais à expansão na v1.

### C1 — Organizacional

| Persona / Jornada | J1 (descoberta) | J2 (comparação) | J3 (decisão) | J4 (pós-matrícula) |
|---|---|---|---|---|
| P1 | 2 | 0 | 0 | 0 |
| P2 | 0 | 0 | 0 | 0 |
| P3 | 3 | 3 | 3 | 1 |
| P4 | 0 | 0 | 0 | 0 |
| P5 | 0 | 0 | 0 | 0 |
| P6 | 1 | 0 | 1 | 0 |
| P7 | 0 | 0 | 0 | 0 |

### C2 — Clínica / neuropsicologia

| Persona / Jornada | J1 | J2 | J3 | J4 |
|---|---|---|---|---|
| P1 | 1 | 0 | 1 | 0 |
| P2 | 2 | 3 | 3 | 1 |
| P3 | 0 | 0 | 0 | 0 |
| P4 | 1 | 0 | 0 | 0 |
| P5 | 0 | 0 | 0 | 0 |
| P6 | 0 | 0 | 0 | 0 |
| P7 | 1 | 0 | 0 | 0 |

### C3 — Psicopedagogia / escolar

| Persona / Jornada | J1 | J2 | J3 | J4 |
|---|---|---|---|---|
| P1 | 1 | 1 | 1 | 0 |
| P2 | 0 | 0 | 0 | 0 |
| P3 | 0 | 0 | 0 | 0 |
| P4 | 0 | 0 | 0 | 0 |
| P5 | 3 | 2 | 2 | 1 |
| P6 | 0 | 0 | 0 | 0 |
| P7 | 0 | 0 | 0 | 0 |

### Análise rápida do mapa

- Cluster C1 fortemente concentrado em P3 (RH não-psicólogo). Adequado: é a persona-alvo mais comercialmente relevante para ramificações organizacionais.
- Cluster C2 fortemente concentrado em P2 (psicólogo clínico estabelecido). Adequado pelo perfil técnico.
- Cluster C3 fortemente concentrado em P5 (educador / pedagogo). Adequado.
- Personas P4 e P7 com cobertura mínima — são personas-de-borda, não primárias. Não escalar prematuramente.
- Jornada J4 com cobertura propositalmente baixa — será endereçada na v1.

## Glossário de cobertura cross-LLM

A coluna **Cobertura cross-LLM esperada** das tabelas usa siglas de LLMs e marcadores. Significado canônico:

| Sigla | Significado |
|---|---|
| GPT | ChatGPT (OpenAI), modelo padrão na conta de coleta |
| CLA | Claude (Anthropic), modelo padrão na conta de coleta |
| GEM | Gemini (Google), modelo padrão na conta de coleta |
| PER | Perplexity (modo padrão Sonar) |
| GRK | Grok (xAI) |
| COP | Microsoft Copilot |
| `*` | IPOG deve aparecer nas 3 primeiras opções (top-3) |
| `~` | IPOG aparece com qualidade reduzida (presente mas sem citar diferencial canônico) |
| (sem marcador) | presença é desejável, não bloqueante |

Quando uma LLM retorna IPOG fora do top-3 mas dentro do top-5, a coleta registra "top-5 only" e a Mention Rate é computada em ambas as métricas.

## Política de inclusão de novos competidores no kit

Quando uma instituição emergente (não listada nos prompts head-to-head) começa a aparecer recorrentemente nas respostas das LLMs como alternativa ao IPOG, o kit precisa absorvê-la em prompts comparativos. Critério de inclusão de novo competidor:

1. Aparece em pelo menos 30% das respostas para os prompts top do cluster, em pelo menos 3 LLMs distintas, durante 21 dias consecutivos.
2. Tem reconhecimento MEC ou claim explícito de reconhecimento (ainda que pendente de validação).
3. Tem oferta digital declarada em psicologia.

Quando os 3 critérios são satisfeitos, novo prompt head-to-head é introduzido na primeira janela de calibração mensal seguinte. O competidor entra no monitoramento de Share-of-Voice no dashboard.

## Política de retirada de prompt em produção

Prompt em produção pode ser retirado em duas circunstâncias:

1. **Aposentadoria por baixa relevância** — atende critérios em `prompts/CALIBRACAO-MENSAL.md`. Vai para a seção "aposentados em ano-mês" do kit.
2. **Retirada de emergência** — quando algum operador detecta que o prompt está editorialmente quebrado (induz LLM a resposta tóxica ou claramente prejudicial). Não espera o ritual mensal: Bruno Azambuja remove imediatamente, comunica Alexandre Caramaschi, registra na ata da próxima reunião.

Em qualquer um dos casos, o ID do prompt aposentado nunca é reutilizado. IDs são únicos e perpétuos.

## Cross-links

- Papéis de coleta — `prompts/PAPEIS-DE-COLETA.md`.
- Calibração mensal — `prompts/CALIBRACAO-MENSAL.md`.
- Métricas — `dashboards/METRICAS-CANONICAS.md`.
- Runbook diário — `dashboards/RUNBOOK-COLETA-LLM.md`.
- ROADMAP — `ROADMAP.md` (na raiz).
