#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
lint-conteudo-social.py — gate mecânico das ondas de conteúdo do menu
/conteudo-social/ do portal posgraduacaopsicologia.com.

Por que existe: prompt sem mecanismo não bloqueia. Tudo que a DIRETRIZ_EDITORIAL
e o CLAUDE.md deste repositório conseguem expressar em padrão verificável mora
aqui; o que exige julgamento fica na revisão humana.

Uso:
    python scripts/lint-conteudo-social.py                      # varre o menu
    python scripts/lint-conteudo-social.py --todo-o-site        # varre site/src/pages
    python scripts/lint-conteudo-social.py --json               # saída parseável
    python scripts/lint-conteudo-social.py caminho/arquivo.astro

Severidade:
    ERRO   reprova (exit 1)
    AVISO  relata, não reprova
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
import unicodedata
from collections import defaultdict

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = os.path.join(RAIZ, "site", "src", "pages")
MENU = os.path.join(PAGES, "conteudo-social")

ERRO = "ERRO"
AVISO = "AVISO"

# ---------------------------------------------------------------------------
# 1. Acentuação. Lista curada de palavras do português que EXIGEM acento e cuja
#    forma sem acento não é outra palavra legítima do idioma. Pares ambíguos
#    (esta/está, e/é, so/só, as/às, sera/será, publico/público, medico/médico,
#    pratica/prática, secretaria/secretária, duvida/dúvida, analise/análise)
#    ficam FORA, porque a forma sem acento é palavra real e o gate produziria
#    falso positivo.
# ---------------------------------------------------------------------------
EXIGEM_ACENTO = [
    "nao", "voce", "voces", "tambem", "atraves", "alem", "porem", "ja",
    "graduacao", "graduacoes", "posgraduacao", "especializacao", "especializacoes",
    "formacao", "formacoes", "avaliacao", "avaliacoes", "informacao", "informacoes",
    "publicacao", "publicacoes", "producao", "distribuicao", "divulgacao",
    "resolucao", "resolucoes", "regulacao", "regulamentacao", "atuacao",
    "supervisao", "decisao", "conclusao", "conclusoes", "revisao", "versao",
    "versoes", "discussao", "extensao", "dimensao", "condicao", "condicoes",
    "questao", "questoes", "sessao", "sessoes", "profissao", "profissoes",
    "psicologico", "psicologica", "psicologicos", "psicologicas",
    "clinico", "clinica", "clinicos", "clinicas",
    "academico", "academica", "academicos", "academicas",
    "tecnico", "tecnica", "tecnicos", "tecnicas",
    "cientifico", "cientifica", "cientificos", "cientificas",
    "estatistico", "estatistica", "estatisticas",
    "etico", "etica", "eticos", "eticas",
    "unico", "unica", "unicos", "unicas",
    "proprio", "propria", "proprios", "proprias",
    "necessario", "necessaria", "necessarios", "necessarias",
    "possivel", "possiveis", "impossivel", "disponivel", "disponiveis",
    "responsavel", "responsaveis", "confiavel", "confiaveis", "verificavel",
    "referencia", "referencias", "evidencia", "evidencias", "experiencia",
    "consequencia", "consequencias", "frequencia", "frequente", "recorrencia",
    "importancia", "relevancia", "tendencia", "tendencias", "audiencia",
    "criterio", "criterios", "relatorio", "relatorios", "repositorio",
    "repositorios", "obrigatorio", "obrigatoria", "territorio",
    "historico", "historica", "historicos", "metodo", "metodos", "metodologia",
    "numero", "numeros", "media", "medias", "minimo", "maximo", "minima", "maxima",
    "nivel", "niveis", "util", "uteis", "dificil", "dificeis", "facil", "faceis",
    "saude", "psiquico", "psiquica", "cronico", "cronica", "generico", "generica",
    "ansiedade",  # sem acento é a própria palavra; mantido fora do teste abaixo
    "conteudo", "conteudos", "video", "videos", "audio", "audios", "midia", "midias",
    "usuario", "usuarios", "comentario", "comentarios", "questionario",
    "orgao", "orgaos", "padrao", "padroes", "razao", "razoes", "opiniao", "opinioes",
    "regiao", "regioes", "instituicao", "instituicoes", "orientacao", "orientacoes",
    "aplicacao", "aplicacoes", "indicacao", "indicacoes", "intervencao",
    "intervencoes", "reabilitacao", "populacao", "populacoes", "amostragem",
    "porcentagem", "estrategia", "estrategias", "estrategico", "estrategica",
    "sera", "serao", "estara", "estarao", "havera", "tera", "terao",
    "proximo", "proxima", "proximos", "proximas", "ultimo", "ultima", "ultimos",
    "ultimas", "unicamente", "somente",  # somente não tem acento; filtrado abaixo
    "duvidas", "hipotese", "hipoteses", "sintese", "analises",
    "diagnostico", "diagnosticos", "prognostico", "sintoma",  # sintoma sem acento
    "terapeutico", "terapeutica", "terapeuticos", "terapeuticas",
    "multiprofissional",  # sem acento; filtrado abaixo
    "psicologo", "psicologos", "psicologa", "psicologas",
    "medico", "medicos",  # médico/medico ambíguo com verbo? não; medico é verbo
]

# Palavras acima que na verdade NÃO levam acento; removidas para não gerar ruído.
SEM_ACENTO_DE_FATO = {
    "ansiedade", "somente", "sintoma", "multiprofissional", "amostragem",
    "porcentagem", "frequente", "recorrencia", "unicamente", "medico", "medicos",
    # "metodologia" não leva acento; entrou na lista por engano.
    "metodologia",
    # "media" é empréstimo corrente do inglês no vocabulário da área
    # ("earned media", "paid media", "social media") e a forma sem acento é
    # legítima nesse uso. Fica fora para não produzir ruído.
    "media",
}
EXIGEM_ACENTO = sorted({p for p in EXIGEM_ACENTO if p not in SEM_ACENTO_DE_FATO})
RE_ACENTO = re.compile(
    r"(?<![\w-])(" + "|".join(EXIGEM_ACENTO) + r")(?![\w-])", re.IGNORECASE
)

# ---------------------------------------------------------------------------
# 2. Promessa proibida (anti-padrão 26 do CLAUDE.md) e escassez fabricada.
# ---------------------------------------------------------------------------
PROMESSAS = [
    (r"garant\w*\s+(?:o\s+)?(?:registro\s+no\s+)?(?:CFP|CRP|conselho)", "promessa de registro no conselho"),
    (r"aprova[cç]\w*\s+garantid\w+", "aprovação garantida"),
    (r"aprovad\w+\s+garantid\w+", "aprovado garantido"),
    (r"carreira\s+em\s+\d+\s+dias", "carreira em N dias"),
    (r"ChatGPT\s+j[aá]\s+cita", "promessa de citação"),
    (r"AI\s+Overview\s+garantid\w+", "promessa de AI Overview"),
    (r"especialista\s+(?:#\s*1|n[uú]mero\s+1)", "especialista número 1"),
    (r"100\s*%\s+de\s+aprova[cç]\w+", "100% de aprovação"),
    (r"resultado\s+garantid\w+", "resultado garantido"),
    (r"cura\s+garantid\w+", "cura garantida"),
    (r"[uú]ltimas\s+vagas", "escassez fabricada"),
    (r"turma\s+fechando", "escassez fabricada"),
    (r"por\s+tempo\s+limitado", "escassez fabricada"),
    (r"\bGEO\s+Brasil\b", "nome errado, o correto é Brasil GEO"),
]
PROMESSAS = [(re.compile(p, re.IGNORECASE), rot) for p, rot in PROMESSAS]

# ---------------------------------------------------------------------------
# 3. Antítese que nega para afirmar (DIRETRIZ §5). Fórmulas prontas reprovam.
# ---------------------------------------------------------------------------
ANTITESES = [
    (r"n[aã]o se trata (?:de|da|do|das|dos)\b", "não se trata de X"),
    (r"n[aã]o (?:é|e|são|sao) (?:apenas|só|so|somente|meramente)\b[^.!?\n]{0,120}?[,;:]\s*(?:é|e|são|sao|mas|e sim)\b", "não é apenas X, é Y"),
    (r"n[aã]o basta\b[^.!?\n]{0,120}?(?:é preciso|e preciso|é necessário|e necessario|precisa)", "não basta X, é preciso Y"),
    (r"n[aã]o é sobre\b[^.!?\n]{0,120}?[,;]\s*(?:é|e|mas)(?: sobre)?\b", "não é sobre X, é sobre Y"),
    (r"a (?:pergunta|quest[aã]o) n[aã]o é se\b[^.!?\n]{0,80}?(?:mas|e sim)\s+quando", "a pergunta não é se, mas quando"),
    (r"n[aã]o (?:só|so|apenas|somente)\b[^.!?\n]{0,100}?(?:como também|como tambem|mas também|mas tambem|sen[aã]o também)\b", "não só X como também Y"),
    (r"\blonge de ser\b", "longe de ser X"),
    (r"(?:^|[.!?]\s+)mais (?:do )?que\b[^.!?\n]{2,60},", "mais do que X, Y"),
    (r"(?:^|[.!?]\s+)menos \w+ e mais \w+", "menos X e mais Y"),
]
ANTITESES = [(re.compile(p, re.IGNORECASE | re.MULTILINE), rot) for p, rot in ANTITESES]

# Antítese estrutural: avisa, e reprova a partir da terceira no mesmo arquivo.
ANTITESE_ESTRUTURAL = re.compile(
    r"n[aã]o (?:é|e|são|sao|foi|era|eram)\b[^.!?\n]{0,80}?[.:;]\s*"
    r"(?:é|É|são|sao|foi|era|eram)\b(?!\s*(?:por isso|assim|nesse|nessa|desse|dessa|da[ií]))",
)
# Piso do teto, para um texto curto, e crescimento por mil palavras. Um
# memorando de 600 palavras reprova na terceira ocorrência; um relatório de
# 5.000 aguenta dez. A régua vem da diretriz de escrita empresarial.
LIMITE_ANTITESE_ESTRUTURAL = 2
ANTITESE_ESTRUTURAL_POR_MIL = 2

# ---------------------------------------------------------------------------
# 4. Tipografia.
# ---------------------------------------------------------------------------
# Emoji de verdade: blocos pictográficos e bandeiras, mais qualquer glifo
# seguido do seletor de variação de emoji (U+FE0F). Sinais tipográficos usados
# em tabela do portal (✓ ✗ ✔ ✘ · † ‡ →) NÃO são emoji e ficam de fora.
RE_EMOJI = re.compile(
    "[\U0001F300-\U0001FAFF\U0001F1E6-\U0001F1FF]|.️"
)
RE_TRAVESSAO = re.compile(r"[—–]")

# Travessão como separador de rótulo (título, descrição, headline, legenda de
# card) é convenção de interface já adotada nas 235 páginas do site e não é
# prosa. Só reprova dentro do corpo do texto.
# O nome do campo pode abrir a linha (`const title = ...`) ou aparecer no meio
# dela, como em `{ href: '/x', label: 'Tema — psicologia do trânsito' }`, padrão
# usado no mapa do site e nos menus. Nos dois casos é rótulo, não prosa.
RE_LINHA_DE_ROTULO = re.compile(
    r"\b(?:title|description|headline|name|label|nome|rotulo|alt|"
    r"sourceLabel|eyebrow|subtitulo|heading)\s*[:=]", re.IGNORECASE
)

# ---------------------------------------------------------------------------
# Extração de prosa a partir do arquivo .astro.
# Remove: frontmatter de import, atributos técnicos, blocos <style>/<script>,
# nomes de classe, href/src/id, chaves de objeto JS. O que sobra é o que um
# leitor humano lê.
# ---------------------------------------------------------------------------
RE_BLOCO_TECNICO = re.compile(r"<(style|script)\b[^>]*>.*?</\1>", re.DOTALL | re.IGNORECASE)
RE_ATRIB_TECNICO = re.compile(
    r"\b(class|className|href|src|id|slug|name|viewBox|d|fill|stroke|aria-labelledby|"
    r"aria-controls|for|rel|type|property|content|datetime|style|transform|points|"
    r"text-anchor|font-size|font-weight|rx|ry|cx|cy|x|y|x1|y1|x2|y2|width|height)\s*=\s*"
    r"(\"[^\"]*\"|'[^']*'|\{[^}]*\})"
)
RE_IMPORT = re.compile(r"^\s*import\s.+?;?\s*$", re.MULTILINE)
RE_TAG = re.compile(r"<[^>]+>")
# Endereço com esquema e também o endereço nu, do tipo
# "posgraduacaopsicologia.com/regulacao", que aparece muito no corpo das peças.
RE_URL = re.compile(
    r"https?://\S+"
    r"|(?<![\w/])[a-z0-9][a-z0-9.-]*\.(?:com|br|org|net|ai|edu|gov|io)"
    r"(?:\.br)?(?:/[a-z0-9\-/#?=&+.]*)?"
)
# Caminho de rota do site: é ASCII por norma, então não pode disparar o teste de
# acentuação. Cobre '/regulacao', '/evidencias/nr1-2026', '/a/b?t=x#frag'.
RE_ROTA = re.compile(r"(?<![\w.])/[a-z0-9][a-z0-9\-/]*(?:[?#][^\s'\"`,)]*)?")
# Valor de tag/slug em literal: 'regulacao', "lato-sensu", `metodos`.
RE_LITERAL_SLUG = re.compile(r"(['\"`])([a-z0-9]+(?:[-_][a-z0-9]+)*)\1")
# Chaves técnicas cujo valor é identificador, não prosa.
# A própria marcação de pendência é ASCII por convenção da diretriz e não pode
# disparar o teste de acentuação.
# Declaração de nome no próprio arquivo e nomes de um import: identificador
# ASCII por norma da casa, nunca prosa lida por humano.
RE_DECLARACAO = re.compile(r"\b(?:const|let|var|function)\s+([A-Za-z_$][\w$]*)")
RE_IMPORT_NOMES = re.compile(r"\bimport\s+\{([^}]*)\}")
RE_ESCAPE_JS = re.compile(r"\\[nrt]")
RE_HASHTAG = re.compile(r"#[A-Za-zÀ-ÿ0-9_]+")
RE_MARCACAO = re.compile(r"\[(?:FALTA EVIDENCIA|FALTA EVIDÊNCIA|PREENCHER-HUMANO)")
# Comentário de código não é prosa lida por ninguém no site.
RE_COMENTARIO = re.compile(r"//[^\n]*|/\*.*?\*/", re.DOTALL)
# Nome de propriedade em objeto JavaScript (`criterio: 'texto'`) e acesso a
# membro (`d.criterio`) são identificadores, escritos em ASCII por norma.
RE_NOME_PROPRIEDADE = re.compile(r"\b[a-z][A-Za-z0-9_]*\s*:\s*(?=['\"`\[{])")
RE_ACESSO_MEMBRO = re.compile(r"\.[A-Za-z_][A-Za-z0-9_]*")
RE_CAMPO_TECNICO = re.compile(
    r"\b(slug|sourceHref|href|id|tags|channel|canal|key|route|rota|path|anchor|"
    r"datePublished|dateModified|'@id'|'@type'|\"@id\"|\"@type\")\s*:\s*"
    r"(\[[^\]]*\]|['\"`][^'\"`]*['\"`])"
)


def extrair_prosa(texto: str, identificadores: set | None = None) -> str:
    # Apaga o conteúdo mas preserva as quebras de linha, para que o número de
    # linha reportado continue batendo com o arquivo original.
    def manter(m):
        return re.sub(r"[^\n]", " ", m.group(0))

    t = RE_BLOCO_TECNICO.sub(manter, texto)
    t = RE_IMPORT.sub(manter, t)
    t = RE_COMENTARIO.sub(manter, t)
    # Sequência de escape dentro de literal JavaScript. A quebra de linha
    # escrita como barra invertida seguida de n cola no início da palavra
    # seguinte, e o par barra-n mais a palavra Ao era lido como a palavra nao
    # sem acento. Some antes do teste de acentuação.
    t = RE_ESCAPE_JS.sub(lambda m: " " * len(m.group(0)), t)
    # Hashtag é identificador de plataforma, escrito em ASCII por convenção.
    t = RE_HASHTAG.sub(lambda m: " " * len(m.group(0)), t)
    t = RE_MARCACAO.sub(lambda m: " " * len(m.group(0)), t)
    t = RE_NOME_PROPRIEDADE.sub(lambda m: " " * len(m.group(0)), t)
    t = RE_ACESSO_MEMBRO.sub(lambda m: " " * len(m.group(0)), t)
    t = RE_URL.sub(lambda m: " " * len(m.group(0)), t)
    t = RE_CAMPO_TECNICO.sub(lambda m: " " * len(m.group(0)), t)
    t = RE_ATRIB_TECNICO.sub(lambda m: " " * len(m.group(0)), t)
    t = RE_ROTA.sub(lambda m: " " * len(m.group(0)), t)
    t = RE_LITERAL_SLUG.sub(lambda m: " " * len(m.group(0)), t)
    t = RE_TAG.sub(lambda m: " " * len(m.group(0)), t)
    # Nome de variável declarada no próprio arquivo (const evidencias = [...])
    # é identificador em ASCII por norma, e aparece solto no JSX ({evidencias
    # .map(...)}). Sem isto, o teste de acentuação acusa a própria variável.
    if identificadores:
        rx = re.compile(r"(?<![\w-])(" + "|".join(sorted(map(re.escape, identificadores), key=len, reverse=True)) + r")(?![\w-])")
        t = rx.sub(lambda m: " " * len(m.group(0)), t)
    return t


def sem_acento(s: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")


def linha_de(texto: str, pos: int) -> int:
    return texto.count("\n", 0, pos) + 1


def trecho(texto: str, pos: int, largura: int = 70) -> str:
    ini = max(0, pos - 25)
    return " ".join(texto[ini:ini + largura].split())


# ---------------------------------------------------------------------------
# Verificações
# ---------------------------------------------------------------------------
def checar_arquivo(caminho: str, ids_globais: dict) -> list:
    achados = []
    with open(caminho, encoding="utf-8") as f:
        bruto = f.read()
    try:
        rel = os.path.relpath(caminho, RAIZ).replace("\\", "/")
    except ValueError:  # arquivo em outra unidade de disco
        rel = caminho.replace("\\", "/")
    # Nome declarado no próprio arquivo (const, let, var, function) e nome
    # importado: identificador ASCII por norma, nunca prosa.
    declarados = set(RE_DECLARACAO.findall(bruto))
    for grupo in RE_IMPORT_NOMES.findall(bruto):
        declarados |= {n.strip() for n in grupo.split(",")}
    declarados = {d for d in declarados if d}
    prosa = extrair_prosa(bruto, declarados)

    def add(sev, regra, linha, detalhe):
        achados.append({"arquivo": rel, "linha": linha, "severidade": sev,
                        "regra": regra, "detalhe": detalhe})

    # 1. Nome de arquivo ASCII.
    base = os.path.basename(caminho)
    if base != sem_acento(base) or not base.isascii():
        add(ERRO, "slug-nao-ascii", 1, f"nome de arquivo com caractere fora do ASCII: {base}")

    # 2. href interno com acento.
    for m in re.finditer(r'href=["\'](/[^"\']*)["\']', bruto):
        alvo = m.group(1)
        if not alvo.isascii():
            add(ERRO, "href-com-acento", linha_de(bruto, m.start()), alvo)

    # 3. Acentuação faltando na prosa.
    for m in RE_ACENTO.finditer(prosa):
        add(ERRO, "acentuacao", linha_de(prosa, m.start()),
            f"'{m.group(1)}' sem acento em: {trecho(prosa, m.start())}")

    # 4. Emoji.
    for m in RE_EMOJI.finditer(bruto):
        add(ERRO, "emoji", linha_de(bruto, m.start()), repr(m.group(0)))

    # 5. Travessão em prosa. Separador de rótulo em title, description, headline
    #    e legenda de card é convenção de interface do site e não reprova.
    linhas_brutas = bruto.split("\n")
    for m in RE_TRAVESSAO.finditer(prosa):
        ln = linha_de(prosa, m.start())
        contexto = linhas_brutas[ln - 1] if ln - 1 < len(linhas_brutas) else ""
        sev = AVISO if RE_LINHA_DE_ROTULO.search(contexto) else ERRO
        add(sev, "travessao", ln, trecho(prosa, m.start()))

    # 6. Promessa proibida.
    for rx, rot in PROMESSAS:
        for m in rx.finditer(prosa):
            add(ERRO, "promessa-proibida", linha_de(prosa, m.start()),
                f"{rot}: {trecho(prosa, m.start())}")

    # 7. Antítese de fórmula pronta.
    for rx, rot in ANTITESES:
        for m in rx.finditer(prosa):
            add(ERRO, "antitese", linha_de(prosa, m.start()),
                f"{rot}: {trecho(prosa, m.start())}")

    # 8. Antítese estrutural acima do teto. O teto CRESCE COM O TEXTO, como na
    #    diretriz: um contraste único é recurso corrente em prosa executiva, e o
    #    defeito é o padrão recorrente. Um memorando de 600 palavras reprova na
    #    terceira; um arquivo de índice que agrega dezenas de peças curtas, como
    #    biblioteca.astro, não pode ser medido pela mesma régua de um texto só.
    palavras = len(prosa.split())
    teto = max(LIMITE_ANTITESE_ESTRUTURAL,
               round(ANTITESE_ESTRUTURAL_POR_MIL * palavras / 1000))
    estruturais = list(ANTITESE_ESTRUTURAL.finditer(prosa))
    if len(estruturais) > teto:
        for m in estruturais[teto:]:
            add(ERRO, "antitese-estrutural", linha_de(prosa, m.start()),
                f"{len(estruturais)} ocorrências, teto é {teto} para {palavras} "
                f"palavras: {trecho(prosa, m.start())}")
    elif estruturais:
        add(AVISO, "antitese-estrutural", linha_de(prosa, estruturais[0].start()),
            f"{len(estruturais)} ocorrência(s), teto {teto} para {palavras} palavras")

    # 9. Figura sem alternativa textual.
    for m in re.finditer(r"<svg\b(?![^>]*aria-hidden)[^>]*>(.*?)</svg>", bruto, re.DOTALL):
        corpo, ln = m.group(1), linha_de(bruto, m.start())
        if "<title" not in corpo:
            add(ERRO, "figura-sem-title", ln, "svg sem <title>")
        if "<desc" not in corpo:
            add(ERRO, "figura-sem-desc", ln, "svg sem <desc>")
        if 'role="img"' not in m.group(0):
            add(AVISO, "figura-sem-role", ln, 'svg sem role="img"')

    # 10. Cor fixa dentro de svg quebra o tema escuro.
    for m in re.finditer(r"<svg\b.*?</svg>", bruto, re.DOTALL):
        for h in re.finditer(r'(?:fill|stroke)\s*=\s*["\'](#[0-9A-Fa-f]{3,8})["\']', m.group(0)):
            if h.group(1).lower() in ("#fff", "#ffffff", "#000", "#000000"):
                continue
            add(AVISO, "cor-fixa-em-svg", linha_de(bruto, m.start() + h.start()),
                f"{h.group(1)} — prefira classe utilitária para o tema escuro funcionar")

    # 11. @id de JSON-LD duplicado no site. Referência pura, do tipo
    #     { '@id': 'https://brasilgeo.ai/#organization' }, é ponteiro para um nó
    #     declarado em outro lugar e DEVE se repetir: só a declaração conta.
    #     O valor costuma ser literal de template com variável (`${SITE.url}/.../
    #     ${slug}/#article`), que resolve diferente em cada arquivo. Por isso as
    #     constantes locais são substituídas antes da comparação; sem isso, todo
    #     arquivo da biblioteca pareceria colidir com todos os outros.
    locais = dict(re.findall(r"^\s*const\s+(\w+)\s*=\s*'([^']*)'\s*;", bruto, re.MULTILINE))

    def resolver(valor: str) -> str:
        for nome, v in locais.items():
            valor = valor.replace("${" + nome + "}", v)
        return valor

    for m in re.finditer(r"'@id'\s*:\s*[`\"']([^`\"']+)[`\"']", bruto):
        depois = bruto[m.end():m.end() + 40]
        antes = bruto[max(0, m.start() - 40):m.start()]
        referencia = re.match(r"\s*[,}]?\s*\}", depois) and antes.rstrip().endswith("{")
        if referencia:
            continue
        valor = resolver(m.group(1))
        if "${" in valor and "slug" not in locais:
            continue  # variável não resolvida: não dá para afirmar colisão
        ids_globais[valor].append((rel, linha_de(bruto, m.start())))

    # 12. Marcações abertas acima do teto.
    abertos = len(re.findall(r"\[(?:FALTA EVID[EÊ]NCIA|PREENCHER-HUMANO)", bruto, re.IGNORECASE))
    if abertos > 5:
        add(ERRO, "marcacoes-abertas", 1, f"{abertos} marcações abertas, teto é 5")
    elif abertos:
        add(AVISO, "marcacoes-abertas", 1, f"{abertos} marcação(ões) aberta(s)")

    # 13. Links internos mínimos.
    internos = {h for h in re.findall(r'href=["\'](/[^"\'#?]*)', bruto)}
    internos = {h for h in internos if h not in ("/",)}
    if len(internos) < 3:
        add(AVISO, "poucos-links-internos", 1,
            f"{len(internos)} link(s) interno(s) distinto(s); o piso editorial é 3")

    return achados


def rotas_existentes() -> set:
    rotas = set()
    for raiz, _, arquivos in os.walk(PAGES):
        for a in arquivos:
            if not a.endswith((".astro", ".ts")):
                continue
            rel = os.path.relpath(os.path.join(raiz, a), PAGES).replace("\\", "/")
            rel = re.sub(r"\.(astro|ts)$", "", rel)
            rotas.add("/" + ("" if rel == "index" else rel.removesuffix("/index")))
            if rel.endswith("/index"):
                rotas.add("/" + rel[: -len("/index")])
    return rotas


def main() -> int:
    ap = argparse.ArgumentParser(description="Gate mecânico do menu Conteúdo e Social")
    ap.add_argument("alvos", nargs="*", help="arquivos ou pastas; padrão é o menu inteiro")
    ap.add_argument("--todo-o-site", action="store_true", help="varre site/src/pages inteiro")
    ap.add_argument("--json", action="store_true", help="saída em JSON")
    ap.add_argument("--sem-links", action="store_true", help="não confere se href interno resolve")
    args = ap.parse_args()

    if args.alvos:
        base = args.alvos
    elif args.todo_o_site:
        base = [PAGES]
    else:
        base = [MENU]

    arquivos = []
    for b in base:
        b = b if os.path.isabs(b) else os.path.join(RAIZ, b)
        if os.path.isfile(b):
            arquivos.append(b)
        else:
            for raiz, _, nomes in os.walk(b):
                arquivos += [os.path.join(raiz, n) for n in nomes if n.endswith(".astro")]
    arquivos.sort()

    ids_globais = defaultdict(list)
    achados = []
    for a in arquivos:
        achados += checar_arquivo(a, ids_globais)

    for ident, ocorrencias in ids_globais.items():
        if len(ocorrencias) > 1:
            for rel, ln in ocorrencias[1:]:
                achados.append({"arquivo": rel, "linha": ln, "severidade": ERRO,
                                "regra": "id-jsonld-duplicado",
                                "detalhe": f"{ident} já usado em {ocorrencias[0][0]}"})

    if not args.sem_links:
        rotas = rotas_existentes()
        for a in arquivos:
            rel = os.path.relpath(a, RAIZ).replace("\\", "/")
            with open(a, encoding="utf-8") as f:
                bruto = f.read()
            for m in re.finditer(r'href=["\'](/[^"\'#?]*)["\']', bruto):
                alvo = m.group(1).rstrip("/") or "/"
                if alvo.startswith(("/http", "//")) or "." in os.path.basename(alvo):
                    continue
                if alvo not in rotas and alvo + "/index" not in rotas:
                    achados.append({"arquivo": rel, "linha": linha_de(bruto, m.start()),
                                    "severidade": AVISO, "regra": "rota-nao-encontrada",
                                    "detalhe": alvo})

    erros = [a for a in achados if a["severidade"] == ERRO]
    avisos = [a for a in achados if a["severidade"] == AVISO]

    if args.json:
        print(json.dumps({"arquivos": len(arquivos), "erros": len(erros),
                          "avisos": len(avisos), "achados": achados},
                         ensure_ascii=False, indent=2))
    else:
        por_arquivo = defaultdict(list)
        for a in achados:
            por_arquivo[a["arquivo"]].append(a)
        for arq in sorted(por_arquivo):
            itens = sorted(por_arquivo[arq], key=lambda x: x["linha"])
            print(f"\n{arq}")
            for i in itens:
                print(f"  {i['severidade']:5} L{i['linha']:<5} {i['regra']:24} {i['detalhe']}")
        print(f"\n{len(arquivos)} arquivo(s). {len(erros)} erro(s), {len(avisos)} aviso(s).")

    return 1 if erros else 0


if __name__ == "__main__":
    sys.exit(main())
