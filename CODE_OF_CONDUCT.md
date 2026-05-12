# Código de Conduta — Programa GEO IPOG

Este código de conduta orienta o relacionamento entre Brasil GEO e IPOG durante a execução do programa de Generative Engine Optimization, cujo escopo canônico cobre as Pós-Graduações em Psicologia do IPOG em todas as modalidades regulamentadas (Especialização Lato Sensu, MBA em áreas correlatas, Mestrado Profissional, Especialização Clínica certificada por Conselhos profissionais, Residências e formações híbridas). Aplica-se a todos os colaboradores com acesso a este repositório.

## Compromissos mútuos

### Brasil GEO (executor)

- **Confidencialidade absoluta** sobre o roadmap de produto, posicionamento mercadológico, dados de captação e métricas internas IPOG. Nada do conteúdo deste repositório é referenciado externamente sem aprovação prévia de Bruno Azambuja ou Ronan Maia.
- **Honestidade analítica** em diagnósticos, benchmarking e recomendações. Hipóteses são marcadas como `[a confirmar]` quando a evidência primária é insuficiente. Correções de premissa são documentadas explicitamente (ver `audits/benchmarking/ONDA-2-CORRECOES-PREMISSA.md`).
- **Transparência sobre execução** via relatório semanal entregue uma hora antes da call e aberto à revisão integral.
- **Disciplina FinOps** sobre custos de coleta cross-LLM, com budget guards configurados e revisão mensal de gastos.
- **Respeito ao calendário institucional** do IPOG, evitando recomendações que demandem decisões em janelas de baixa disponibilidade.

### IPOG (cliente)

- **Acesso ao repositório** restrito aos colaboradores autorizados pelo CEO Ronan Maia ou Gerente de Marketing Bruno Azambuja.
- **Não-divulgação externa** dos artefatos de auditoria, benchmarking, prompts e dashboards. O repositório é privado e os documentos não são compartilhados com partes não-autorizadas sem aprovação da Brasil GEO.
- **Honestidade sobre constraints** internos (decisões de produto, prazos de catálogo, mudanças regulatórias) que afetem o programa GEO.

### Compromissos compartilhados

- **Sem dados sensíveis** no repositório: PII de candidatos/alunos, credenciais de plataformas, exports brutos do CRM IPOG. Datasets em `data/` que contenham PII devem ser armazenados em diretórios ignorados pelo `.gitignore` e nunca commitados.
- **Naming canônico** respeitado em todo conteúdo público assinado pela marca IPOG ou por Alexandre Caramaschi.
- **Compliance MEC, CFP, ABRAP, FBT e demais Conselhos profissionais** revisado pelo jurídico/acadêmico IPOG em qualquer claim regulatório antes da publicação, independentemente da modalidade de pós-graduação envolvida.

## Conduta esperada nas interações

- Comunicação direta, baseada em evidência primária, sem jargão de marketing.
- Discordância construtiva sobre escopo, prioridade ou método é bem-vinda e documentada.
- Decisões controversas são registradas em `docs/atas/` para preservar racional analítico.
- Nenhum membro pessoaliza divergências técnicas ou ataca colegas.

## Conduta inaceitável

- Vazamento de informação confidencial.
- Apropriação indébita de artefatos sob propriedade intelectual da Brasil GEO ou do IPOG.
- Uso pessoal ou comercial de dados de candidatos/alunos coletados no programa.
- Comunicação desrespeitosa, intimidatória ou preconceituosa entre membros da equipe.

## Fluxo de relato

Violações deste código devem ser comunicadas diretamente:

- Para questões internas Brasil GEO: alexandre@brasilgeo.ai
- Para questões IPOG: contato direto com Ronan Maia (CEO) ou Bruno Azambuja (Marketing).
- Para vulnerabilidades de segurança: ver `SECURITY.md`.

Casos serão tratados em até **5 dias úteis**, com confirmação de recebimento em até **2 dias úteis**.

## Revisão

Este código é revisado pela Brasil GEO em cada checkpoint executivo mensal e atualizado quando necessário. A versão vigente está sempre na branch `main`.

## Contato

**Alexandre Caramaschi** — CEO da Brasil GEO, Head do projeto
alexandre@brasilgeo.ai
