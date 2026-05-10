# 06 — Menus e Submenus

> **Audiência primária:** Information Architect + Engenharia + UX

## Princípio

Cada menu e cada submenu tem: **objetivo de negócio + persona principal + intenção + páginas incluídas + conteúdo necessário + RF/RNF + CTAs + analytics + roadmap + dependências + riscos + DoD**. Sem isso, menu vira lista de links.

## 1. Estrutura macro — 9 menus principais

```
1. Início
2. MBAs em Psicologia
3. Temas em Alta
4. Para Quem
5. Por Estado
6. Comparativos
7. Recursos Gratuitos
8. Carreira
9. Sobre o IPOG
```

(detalhe estruturado em `data/menu-map.yaml`)

## 2. Menu 1 — Início

- **Objetivo de negócio:** apresentar o IPOG como referência em MBAs de Psicologia + conduzir o visitante para curso/tema/persona/estado
- **Persona principal:** todas (ponto de entrada)
- **Intenção:** awareness + navegacional
- **Submenus (visíveis na home):** Destaques · Escolha seu MBA · Temas em alta · Guia por perfil · Guia por estado · Comparativos · Recursos gratuitos · Fale com consultor
- **CTAs primários:** "Fazer quiz" + "Ver MBAs em Psicologia"
- **Analytics:** `home_view`, `home_section_clicked` (com `section_id`), `home_cta_primary_clicked`
- **Roadmap:** Fase 1 (MVP)
- **Dependências:** 5 cards de curso prontos + quiz funcional
- **Riscos:** muitos blocos sem priorização → confusão; mitigação: máximo 8 blocos visíveis sem scroll
- **DoD:** Lighthouse ≥ 90 mobile + Schema Organization + WebSite + SearchAction

## 3. Menu 2 — MBAs em Psicologia

### 2.1 Submenus

- Todos os MBAs em Psicologia → `/mba-psicologia/`
- MBA em Psicologia Organizacional e do Trabalho → `/mba-psicologia/psicologia-organizacional/` **(flagship)**
- MBA em Psicologia Positiva, Saúde Mental e Gestão do Bem-Estar → `/mba-psicologia/psicologia-positiva-bem-estar/`
- MBA em Reabilitação Neuropsicológica e Desenvolvimento Cognitivo → `/mba-psicologia/reabilitacao-neuropsicologica/`
- MBA em Neurociência e Psicologia Positiva → `/mba-psicologia/neurociencia-psicologia-positiva/`
- MBA em Gestão de Pessoas e Liderança Positiva → `/mba-psicologia/gestao-pessoas-lideranca-positiva/`
- Comparar MBAs → `/comparativos/comparar-mbas-psicologia/`
- Qual MBA escolher? → `/quiz/qual-mba-em-psicologia-combina-com-voce/`

### 2.2 Por submenu (síntese; detalhe em `data/menu-map.yaml`)

| Submenu | Persona principal | CTA primário | Schema |
|---|---|---|---|
| Hub MBAs | exploratório | Fazer quiz | CollectionPage |
| MBA POT | psicóloga + RH + consultor | Solicitar matriz | Course + EOP (programType: MBA) |
| MBA Psi Positiva | psicóloga + RH | Inscrever webinar | Course + EOP |
| MBA Reab Neuropsi | psicóloga clínica + saúde | Solicitar matriz | Course + EOP |
| MBA Neurociência | psicóloga + saúde + educação | Baixar e-book | Course + EOP |
| MBA Gestão Pessoas | RH + líder | Agendar conversa | Course + EOP |
| Comparar MBAs | exploratório + comparativo | Fazer quiz | Article |
| Qual MBA escolher | exploratório | Captura de e-mail no fim do quiz | Quiz |

## 4. Menu 3 — Temas em Alta

Submenus (14 temas-chave 2025-2026):

- NR-1 e Riscos Psicossociais → `/temas/nr-1-riscos-psicossociais/`
- Saúde Mental no Trabalho → `/temas/saude-mental-no-trabalho/`
- Psicologia Organizacional e do Trabalho → `/temas/psicologia-organizacional-trabalho/`
- Psicologia Positiva → `/temas/psicologia-positiva/`
- Neurociência Aplicada → `/temas/neurociencia-aplicada/`
- People Analytics → `/temas/people-analytics/`
- IA em RH → `/temas/ia-em-rh/`
- Liderança Positiva → `/temas/lideranca-positiva/`
- Segurança Psicológica → `/temas/seguranca-psicologica/`
- Clima e Cultura Organizacional → `/temas/clima-cultura-organizacional/`
- Burnout e Prevenção → `/temas/burnout-prevencao/`
- Reabilitação Neuropsicológica → `/temas/reabilitacao-neuropsicologica/`
- Avaliação Psicológica → `/temas/avaliacao-psicologica/`
- Desenvolvimento Cognitivo → `/temas/desenvolvimento-cognitivo/`

CTA padrão por tema: "Conhecer o MBA que aborda este tema" + "Baixar guia completo".

## 5. Menu 4 — Para Quem

Submenus (12 personas/perfis):

- Para Psicólogos → `/para-quem/psicologos/`
- Para Psicólogos Clínicos → `/para-quem/psicologos-clinicos/`
- Para Profissionais de RH → `/para-quem/rh/`
- Para Líderes e Gestores → `/para-quem/lideres/`
- Para Consultores → `/para-quem/consultores/`
- Para Profissionais da Saúde → `/para-quem/saude/`
- Para Profissionais da Educação → `/para-quem/educacao/`
- Para Quem Quer Mudar de Carreira → `/para-quem/transicao-carreira/`
- Para Quem Quer Atuar em Empresas → `/para-quem/atuar-em-empresas/`
- Para Quem Quer Ampliar Consultório → `/para-quem/ampliar-consultorio/`

## 6. Menu 5 — Por Estado

### 6.1 Hub geográfico

- MBAs em Psicologia no Brasil → `/por-estado/`

### 6.2 27 UFs (todos os estados + DF)

```
/por-estado/ac/   Acre
/por-estado/al/   Alagoas
/por-estado/ap/   Amapá
/por-estado/am/   Amazonas
/por-estado/ba/   Bahia
/por-estado/ce/   Ceará
/por-estado/df/   Distrito Federal
/por-estado/es/   Espírito Santo
/por-estado/go/   Goiás (sede IPOG)
/por-estado/ma/   Maranhão
/por-estado/mt/   Mato Grosso
/por-estado/ms/   Mato Grosso do Sul
/por-estado/mg/   Minas Gerais
/por-estado/pa/   Pará
/por-estado/pb/   Paraíba
/por-estado/pr/   Paraná
/por-estado/pe/   Pernambuco
/por-estado/pi/   Piauí
/por-estado/rj/   Rio de Janeiro
/por-estado/rn/   Rio Grande do Norte
/por-estado/rs/   Rio Grande do Sul
/por-estado/ro/   Rondônia
/por-estado/rr/   Roraima
/por-estado/sc/   Santa Catarina
/por-estado/sp/   São Paulo
/por-estado/se/   Sergipe
/por-estado/to/   Tocantins
```

Cada UF tem sub-pages programáticas:

```
/por-estado/{uf}/{slug-curso}/         (~5-7 cursos × 27 UFs = 135-190 páginas)
/por-estado/{uf}/temas/{slug-tema}/    (~3-5 temas × 27 UFs = 80-135 páginas)
/por-estado/{uf}/{slug-cidade}/        (51 cidades médias Frente Regional)
```

## 7. Menu 6 — Comparativos

Submenus:

- IPOG vs Outras Instituições (hub) → `/comparativos/`
- IPOG vs PUCRS Online → `/comparativos/ipog-vs-pucrs-online/`
- IPOG vs Ânima Educação → `/comparativos/ipog-vs-anima-educacao/`
- IPOG vs Faculdade Líbano → `/comparativos/ipog-vs-faculdade-libano/`
- IPOG vs Academy Educação → `/comparativos/ipog-vs-academy-educacao/`
- IPOG vs UNIP → `/comparativos/ipog-vs-unip/`
- IPOG vs UNESC Digital → `/comparativos/ipog-vs-unesc-digital/`
- IPOG vs UNIFENAS → `/comparativos/ipog-vs-unifenas/`
- IPOG vs Cursos EAD Baratos → `/comparativos/ipog-vs-cursos-ead-baratos/`
- MBA Ao Vivo vs MBA EAD → `/comparativos/mba-ao-vivo-vs-mba-ead/`
- MBA Psi Organizacional vs Pós em RH → `/comparativos/mba-psi-organizacional-vs-pos-rh/`
- MBA Psi Positiva vs MBA Gestão de Pessoas → `/comparativos/mba-psi-positiva-vs-mba-gestao-pessoas/`
- MBA em Neuropsicologia vs Reabilitação Neuropsicológica → `/comparativos/mba-neuropsicologia-vs-reabilitacao-neuropsicologica/`
- Como Comparar MBAs em Psicologia → `/comparativos/como-comparar-mbas-psicologia/`

**Governança crítica:** todo comparativo deve ser **factual, verificável, não-difamatório**. Quando dado não estiver disponível, registrar como "não identificado publicamente" ou "pendente de validação". Detalhe em `12-governanca-editorial.md`.

## 8. Menu 7 — Recursos Gratuitos

- Guias Completos → `/recursos/guias/`
- E-books → `/recursos/ebooks/`
- Checklists → `/recursos/checklists/`
- Webinars → `/recursos/webinars/`
- Aulas Abertas → `/recursos/aulas-abertas/`
- Quizzes → `/recursos/quizzes/`
- Diagnósticos → `/recursos/diagnosticos/`
- Glossário → `/glossario/`
- Newsletter → `/recursos/newsletter/`
- Estudos de Caso → `/casos/`

## 9. Menu 8 — Carreira

- Carreira em Psicologia Organizacional → `/carreira/psicologia-organizacional/`
- Carreira em Neuropsicologia → `/carreira/neuropsicologia/`
- Carreira em Psicologia Positiva → `/carreira/psicologia-positiva/`
- Carreira em RH Estratégico → `/carreira/rh-estrategico/`
- Carreira em Saúde Mental Corporativa → `/carreira/saude-mental-corporativa/`
- Carreira em Avaliação Psicológica → `/carreira/avaliacao-psicologica/`
- Carreira em Consultoria Organizacional → `/carreira/consultoria-organizacional/`
- Quanto Ganha um Profissional da Área → `/carreira/quanto-ganha/`
- Como Escolher uma Pós ou MBA → `/carreira/como-escolher/`

## 10. Menu 9 — Sobre o IPOG

- Por Que Escolher o IPOG → `/sobre/por-que-ipog/`
- Metodologia → `/sobre/metodologia/`
- Professores → `/sobre/professores/`
- Experiência ao Vivo → `/sobre/experiencia-ao-vivo/`
- Comunidade → `/sobre/comunidade/`
- Certificação → `/sobre/certificacao/`
- Dúvidas Frequentes → `/sobre/faq/`
- Fale com o IPOG → `/contato/`

## Cross-links

- `data/menu-map.yaml` — definição estruturada
- `05-arquitetura-da-informacao.md`
- `09-seo-e-conteudo-programatico.md`
- `12-governanca-editorial.md` (regras para comparativos)
