# Histórico de Decisões Canônicas — Programa GEO IPOG

> **Propósito:** registro append-only das decisões canônicas que alteram premissas estruturais do programa. Cada entrada documenta o que mudou, quando, por quê e quais artefatos foram impactados. É a memória persistente da gestão do projeto.
>
> **Quem mantém:** Alexandre Caramaschi (Brasil GEO) com aprovação executiva de Ronan Maia (IPOG) quando aplicável.
>
> **Como ler:** entradas em ordem cronológica reversa (mais recente primeiro). Cada decisão carrega a referência ao commit canônico que a materializou no repositório.

---

## 2026-05-12 — DC-002 · Reframe canônico do escopo: de MBA para Pós-Graduações em Psicologia (5 modalidades)

**Commit canônico:** `ad7127b` (push em 12-05-2026 14h13 BRT)
**Decisor:** Alexandre Caramaschi · **Validador executivo pendente:** Ronan Maia (na reunião quinzenal de 19-05)
**Janela executiva afetada:** Sprint 2 (13-05 a 13-06) e seguintes.

### O que mudou

O programa estava enquadrado em todos os artefatos com "MBA Online de Psicologia" como vertical prioritária única. A correção formaliza o escopo amplo: **"Pós-Graduações em Psicologia"**, com MBA como uma das cinco modalidades canônicas.

### Cinco modalidades canônicas (Cláusula 0)

1. **Especialização Lato Sensu** em Psicologia (carga mínima 360h, autorizada pelo MEC) — formato dominante do mercado brasileiro. Cobre Neuropsicologia, Avaliação Psicológica, Psicologia Clínica, Hospitalar, Escolar, Psicopedagogia, Jurídica.
2. **MBA correlato à Psicologia** — POT, Neurociência Executiva, Coaching, Liderança, Saúde Mental Corporativa B2B.
3. **Mestrado Profissional** em Psicologia (stricto sensu profissional regulamentado CAPES).
4. **Especialização Clínica certificada por Conselhos profissionais** — CFP (com SATEPSI quando aplicável), ABRAP (ACT), FBT (TCC), ABPp, EMDR Brasil.
5. **Formações híbridas e residências** com supervisão clínica regulamentada.

### Schema.org canônico (4 programType)

- `programType: "Specialization"` → modalidade 1
- `programType: "MBA"` → modalidade 2
- `programType: "ProfessionalMastersProgram"` → modalidade 3
- `programType: "ProfessionalCertification"` → modalidade 4
- Modalidade 5 usa dois nós no `@graph`: `Specialization` + `ProfessionalCertification`

### Cinco clusters semânticos canônicos (Share-of-Voice)

Substituem os 3 clusters anteriores baseados em MBA. Um cluster por modalidade. KPI 2 (Share-of-Voice) e KPI-DASHBOARD.md ganharam tabelas 3.4-3.6 para clusters c/d/e (Mestrado Profissional, Especialização Clínica certificada, Formações híbridas).

### Por que foi feito agora

Detectado durante leitura prévia ao onboarding presencial no IPOG em 12-05-2026. Corrigir antes da Sprint 2 (abre 13-05) evita retrabalho e amplia o ROI sem mudança de custo (R$ 17.000/mês inalterados).

### Como foi feito

Cinco waves Opus paralelas (~14 minutos wall-time total):

- **Wave 1** — Governança top-level (12 arquivos): README, ROADMAP, STATUS, CONTRIBUTING, SECURITY, CODE_OF_CONDUCT, docs/01-03, .github/, relatório W20.
- **Wave 2** — Site code + nova rota (8 arquivos + 1 novo): `site/src/lib/data.ts` +217 linhas com 4 novas constantes (TIPOS_DE_POS_GRADUACAO, ESPECIALIZACOES_LATO_SENSU, MESTRADOS_PROFISSIONAIS, ESPECIALIZACOES_CLINICAS). Nova rota `/tipos-de-pos-graduacao` com Schema CollectionPage + ItemList + EducationalOrganization.hasCredential (5 credentialCategory). Header MegaMenu "MBAs" → "Pós-Graduações". Build: **178 páginas** (era 177), 0 erros.
- **Wave 3** — Prompts kit + benchmarking premissas (18 arquivos): KIT-PROMPTS-V0 reescrito de 75 para 84 prompts canônicos com coluna nova "Modalidade" (AMPLO/LATO/MBA/MEPP/CLIN); QUERIES-REGIONAIS amplas; síntese executiva de benchmarking com tese central reescrita.
- **Wave 4** — KPIs/marcos/risk/frameworks/tech-stack (38 arquivos): 8 KPIs canônicos reformulados; SoV expandido para 5 clusters; R-017 novo (fragmentação narrativa entre modalidades); marcos M01 e M06 ampliados preservando datas/owners; KPI-DASHBOARD com 3 tabelas adicionais.
- **Wave 5** — Content editorial + schema patterns (15 arquivos): SCHEMA-PATTERNS com 4 programType; glossário 115 → ~127 termos; BRIEFING e EXERCICIO templates com campo obrigatório Modalidade; cliché "MBA = programa GEO IPOG" banido (deny-list 4); 11 peças HBR avaliadas individualmente (2 expandidas, 9 preservadas).

### Superfície de impacto

- **91 arquivos modificados + 1 novo** no repositório `geo-ipog`.
- **+1770 inserções / -568 deleções**.
- Site em produção: 178 páginas (era 177).
- Build verde, 0 regressão de URL.
- Dossiês individuais de concorrente (`concorrente-*.md`) intocados — dados específicos por player.

### Artefatos correlatos

- **Contrato reemitido (DOCX)**: `docs/governance/contratos/contrato-geo-ipog-reemissao-12-05-2026.docx` — Cláusula 1.2 nova com 5 modalidades; Cláusula 1.4 nova com inclusão automática sem cobrança adicional; Cláusula 10.5 transicional. Valor e prazo preservados.
- **E-mail executivo para Ronan + Bruno**: 1 e-mail principal + 4 anexos no Desktop do Alexandre (Sprint 1 big numbers, Sprint 2 overview 30 dias, benchmarking + 4 sprints, e Anexo 4 documentando a reframe).
- **Script gerador do DOCX**: `scripts/gerar_contrato_docx.py` — re-executável para próximas revisões.

### Cleanup futuro identificado

- `docs/atas/2026-04-30-ipog-kickoff.md` — Wave 1 reportou que estava fora do escopo; ainda tem framing antigo. Aplicar em commit subsequente quando precisarmos editar atas.
- 26 dossiês `audits/benchmarking/concorrente-*.md` — preservados intactos por instrução; reframe individual ocorre quando atualizarmos cada perfil.

### Decisões D01-D08 afetadas (prazo 15-05-2026)

- **D01** (nomenclatura institucional dos MBAs) → expande para política de naming canônico por modalidade (4 sub-decisões).
- **D02** (preços canônicos) → ganha terceira faixa (Lato Sensu R$ 450-550, MBA R$ 750-1.250, Mestrado Profissional R$ 1.500+, Especialização Clínica certificada R$ 600-900).
- **D03 a D08** — datas e escopos preservados.

---

## 2026-04-30 — DC-001 · Kickoff formal do programa GEO IPOG

**Commit canônico:** initial commit do repositório `geo-ipog`
**Decisor:** Ronan Maia (CEO IPOG) + Alexandre Caramaschi (Brasil GEO)

### O que ficou estabelecido

- Início do programa em 30 de abril de 2026.
- Sponsor: Ronan Maia. Interlocutor operacional: Bruno Azambuja.
- Vertical inicial: MBA Online de Psicologia (recorte estreito posteriormente ampliado em DC-002).
- Cadência: ondas quinzenais com checkpoint executivo mensal.
- Contrato: 4 meses, R$ 17.000/mês, total R$ 68.000.

### Artefatos derivados

- `docs/01-kickoff-30-04-2026.md` (atualizado em DC-002 com escopo amplo).
- `docs/atas/2026-04-30-ipog-kickoff.md` (pendente cleanup).
- `ROADMAP.md` original (atualizado em DC-002).

---

## Convenções de manutenção

- **Numeração:** DC-NNN, append-only, nunca renumerar entradas anteriores.
- **Data:** sempre absoluta (ISO 8601 YYYY-MM-DD), nunca relativa.
- **Commit canônico:** sempre referenciado para permitir bisseção do histórico.
- **Decisor + Validador:** nominal explícito. Validador pendente sinalizado.
- **Superfície de impacto:** quantificada quando possível (arquivos, linhas, marcos afetados).
- **Cleanup futuro:** sempre catalogado para não ser esquecido.
