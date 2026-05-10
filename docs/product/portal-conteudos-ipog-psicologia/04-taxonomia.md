# 04 — Taxonomia do Portal

> **Audiência primária:** Information Architect + SEO + Conteúdo + CMS

## Princípio

Taxonomia organiza; ontologia define. Toda peça de conteúdo (Course, ContentItem, LandingPage, StatePage, etc.) é tagueada com cada um dos 8 eixos abaixo. Sistema de filtros (busca, listagens, recomendação) usa qualquer combinação.

## 1. Eixo 1 — Por curso (15 valores)

```
psicologia-organizacional-trabalho
psicologia-positiva
saude-mental-organizacoes
gestao-bem-estar-corporativo
reabilitacao-neuropsicologica
desenvolvimento-cognitivo
neurociencia-aplicada
gestao-pessoas
lideranca-positiva
avaliacao-psicologica
pericia-psicologica-forense
intervencao-aba-tea
psicologia-juridica
desenvolvimento-humano
mba-multiplos-cluster
```

## 2. Eixo 2 — Por tema (29 valores)

Tags editoriais ortogonais ao curso (uma peça pode cobrir múltiplos temas):

```
nr-1
riscos-psicossociais
saude-mental-no-trabalho
burnout
seguranca-psicologica
clima-organizacional
cultura-organizacional
engajamento
lideranca
gestao-de-conflitos
people-analytics
ia-em-rh
psicometria
avaliacao-psicologica
neurociencia-aplicada
neuropsicologia
reabilitacao-cognitiva
psicologia-positiva
bem-estar-corporativo
felicidade-no-trabalho
trabalho-hibrido
diversidade-inclusao
aprendizagem-desenvolvimento
performance-humana
employee-experience
gestao-mudanca
psicodinamica-trabalho
ergonomia
qualidade-vida-trabalho
```

## 3. Eixo 3 — Por persona (12 valores)

```
psicologos
psicologos-clinicos
psicologos-organizacionais
profissionais-rh
business-partners
lideres
executivos
consultores
profissionais-saude
profissionais-educacao
estudantes-psicologia
transicao-carreira
```

## 4. Eixo 4 — Por intenção de busca (14 valores)

```
informacional
comercial
comparativa
transacional
local
navegacional
carreira
regulatorio
tendencia
como-fazer
melhor-curso
curso-online
pos-graduacao
mba
```

## 5. Eixo 5 — Por etapa da jornada (9 valores)

```
awareness
problem-discovery
solution-discovery
consideration
comparison
decision
enrollment
post-enrollment
alumni-advocacy
```

## 6. Eixo 6 — Por geografia

### 6.1 Brasil + 5 regiões

```
brasil
regiao-norte
regiao-nordeste
regiao-centro-oeste
regiao-sudeste
regiao-sul
```

### 6.2 27 UFs (todos obrigatórios)

```
acre
alagoas
amapa
amazonas
bahia
ceara
distrito-federal
espirito-santo
goias
maranhao
mato-grosso
mato-grosso-do-sul
minas-gerais
para
paraiba
parana
pernambuco
piaui
rio-de-janeiro
rio-grande-do-norte
rio-grande-do-sul
rondonia
roraima
santa-catarina
sao-paulo
sergipe
tocantins
```

### 6.3 Cidades médias estratégicas (subset Frente Regional 51 cidades CNPJ-próprio)

Hipótese de composição (a confirmar via NAIA-310 com Bruno):

- **GO + DF (~14):** Goiânia (sede), Aparecida de Goiânia, Anápolis, Rio Verde, Catalão, Itumbiara, Jataí, Luziânia, Brasília (DF), e 5 a confirmar
- **MT (~7):** Cuiabá, Sinop, Sorriso, Rondonópolis, Cáceres, Lucas do Rio Verde, Várzea Grande
- **MS (~5):** Campo Grande, Dourados, Três Lagoas, Corumbá, Ponta Porã
- **TO (3):** Palmas, Araguaína, Gurupi
- **BA (~9):** Salvador, Vitória da Conquista, Feira de Santana, Barreiras, Luís Eduardo Magalhães, Ilhéus, Itabuna, Juazeiro, Teixeira de Freitas
- **MA + PA (~6):** São Luís, Imperatriz, Belém, Marabá, Parauapebas, Ananindeua
- **7 a definir** com Bruno

Detalhe canônico em `data/state-pages.yaml` (Wave 4).

## 7. Eixo 7 — Por formato de conteúdo (22 valores)

```
artigo
guia-completo
pilar-seo
landing-page
pagina-curso
pagina-estado
pagina-cidade
pagina-comparativa
faq
checklist
quiz
e-book
webinar
aula-aberta
case
entrevista
glossario
ferramenta
diagnostico
calculadora
infografico
roteiro-carreira
```

## 8. Eixo 8 — Por conversão (11 valores)

```
baixar-material
fazer-quiz
assistir-aula-aberta
inscrever-webinar
falar-whatsapp
agendar-conversa
solicitar-grade
comparar-cursos
ver-investimento
fazer-inscricao
iniciar-matricula
```

## 9. Combinação típica de tagueamento

Exemplo — guia "NR-1 atualizada: o que RH precisa saber em 2026":

```yaml
curso: [psicologia-organizacional-trabalho, gestao-pessoas]
tema: [nr-1, riscos-psicossociais, saude-mental-no-trabalho]
persona: [profissionais-rh, business-partners]
intencao: [informacional, regulatorio, tendencia]
jornada: [awareness, problem-discovery]
geografia: [brasil]
formato: [guia-completo, pilar-seo]
conversao: [baixar-material, inscrever-webinar]
```

A página de listagem `/temas/nr-1-riscos-psicossociais/` filtra por intersecção de qualquer combinação. URL canônica de filtro: `/temas/nr-1-riscos-psicossociais/?persona=profissionais-rh&estado=sp`.

## 10. Hierarquia de subáreas — exemplo Topic

```
nr-1 (parent)
├── nr-1-historico-vigencia
├── nr-1-gro-gestao-riscos
├── nr-1-riscos-psicossociais-categorias
├── nr-1-fmea-priorizacao
├── nr-1-plano-acao-mitigacao
├── nr-1-documentacao-evidencia
└── nr-1-fiscalizacao-mte
```

## Cross-links

- `data/taxonomy.yaml` — definição estruturada
- `03-ontologia.md` — entidades que recebem tags
- `09-seo-e-conteudo-programatico.md` — clusters SEO usando taxonomia
- `docs/ontologia/TAXONOMIA-CONTEUDO.md` — taxonomia macro do programa GEO IPOG (esta camada estende)
