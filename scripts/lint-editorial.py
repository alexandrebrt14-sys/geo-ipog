#!/usr/bin/env python3
"""lint-editorial.py — gate mecânico da Diretriz Editorial no portal geo-ipog.

Motivo de existir: regra que vive só no prompt não bloqueia nada. As proibições
da `DIRETRIZ_EDITORIAL.md` (seções 5, 6, 7 e 9), o anti-padrão 26 do
`docs/governance/GEO_50_CONCEITOS_CANONICAL.md` e a regra "verificação é
bastidor" passavam a depender da memória de quem revisa. Este script transforma
cada uma delas em cheque com arquivo e linha.

Uso:
    python scripts/lint-editorial.py                      # varre site/src/pages
    python scripts/lint-editorial.py <arquivo> [...]      # varre alvos
    python scripts/lint-editorial.py --json               # saída parseável
    python scripts/lint-editorial.py --changed            # só o que mudou vs origin/main

Saída: código 1 quando há violação BLOQUEANTE, 0 quando só há avisos.
"""

from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
PAGES = RAIZ / "site" / "src" / "pages"

# --- Léxicos -------------------------------------------------------------

CLICHES = [
    "nos dias de hoje", "é fundamental que", "não é segredo que",
    "o futuro é agora", "em um mundo cada vez mais", "vamos explorar",
    "como sabemos", "é importante ressaltar", "diante desse cenário",
    "vale a pena destacar", "em última análise", "vamos aprender",
    "agora você vai entender", "como todos sabem", "desde os primórdios",
    "desde tempos imemoriais", "neste artigo veremos", "neste guia veremos",
]

ANTI_PADRAO_26 = [
    "garante cfp", "aprovado garantido", "aprovação garantida",
    "carreira em 30 dias", "chatgpt já cita", "ai overview garantido",
    "especialista #1", "especialista número 1", "100% de aprovação",
    "tratamento infalível", "resultado garantido", "emprego garantido",
    "salário garantido",
]

ESCASSEZ = [
    "vagas limitadas", "últimas vagas", "garanta já", "garanta sua vaga",
    "não perca esta", "não perca a chance", "oportunidade única", "inscreva-se já",
]

ADJETIVO_VAZIO = [
    "robusto", "robusta", "crucial", "fascinante", "transformador",
    "transformadora", "disruptivo", "disruptiva", "abordagem holística",
    "mergulhar em", "a essência de", "essa jornada", "sua jornada",
]

CALQUES = [
    "endereçar o problema", "endereçar um problema", "endereçar essa",
    "vamos estar enviando", "vamos estar fazendo", "aplicar para a vaga",
    "assumindo que seja", "de forma proativa", "acionável",
]

# Verificação é bastidor: rótulo de confiança e narração de apuração no corpo.
BASTIDOR = [
    "dado autodeclarado", "amostra de conveniência", "sem denominador",
    "correlação não é causalidade", "correlação, não causalidade",
    "não foi possível confirmar", "verificamos que", "apuramos que",
    "conforme apuração", "dado não verificado", "fonte não confirmada",
]

ATRIBUICAO_ANONIMA = [
    "especialistas apontam", "especialistas afirmam", "estudos mostram",
    "pesquisas indicam", "estudos indicam", "pesquisadores afirmam",
    "dados mostram que", "a literatura mostra",
]

GERUNDIO_VAGO = [
    "contribuindo para", "promovendo a", "impulsionando a", "impulsionando o",
    "garantindo assim", "otimizando o", "potencializando",
]

COPULA_FUGIDA = ["serve como", "atua como", "funciona como", "se configura como"]

INFLACAO = [
    "momento crucial", "divisor de águas", "é um testemunho", "um marco histórico",
    "revolucionar", "revoluciona a", "mudar tudo",
]

# Negar para afirmar (regex, porque a forma varia).
NEGA_AFIRMA = [
    r"[Nn]ão se trata (?:apenas )?de .{2,60}?[.,] [Tt]rata-se de",
    r"[Nn]ão é apenas .{2,60}?[.,] [ÉéEe]",
    r"[Nn]ão basta .{2,60}?[.,] [ÉéEe] preciso",
    r"[Mm]ais do que .{2,60}?, ",
    r"[Nn]ão é sobre .{2,60}?, é sobre",
]

# Acentuação: tokens de texto visível que quase nunca são corretos sem acento.
ACENTO_FALTANDO = [
    "nao", "voce", "tambem", "alem", "apos", "atraves", "porem", "ate",
    "avaliacao", "formacao", "educacao", "informacao", "atencao",
    "intervencao", "reabilitacao", "supervisao", "regulacao", "populacao",
    "saude", "medico", "psicologico", "psicologica", "clinico",
    "diagnostico", "necessario", "possivel", "criterio", "criterios",
    "referencia", "evidencia", "experiencia", "consciencia", "tecnica",
    "tecnico", "usuario", "proprio", "ultimo", "unico", "nivel", "area",
]

# --- Extração de texto visível ------------------------------------------

RE_FRONTMATTER = re.compile(r"^---\n.*?\n---\n", re.S)
RE_TAG = re.compile(r"<[^>]+>")
RE_IMPORT = re.compile(r"^\s*import .*$", re.M)
RE_HEADING = re.compile(r"<h[1-4][^>]*>.*?</h[1-4]>", re.S)
RE_ATTR = re.compile(r'(?:href|src|id|class|className|import|slug)\s*=\s*"[^"]*"')
RE_HEX = re.compile(r"#[0-9a-fA-F]{3,8}\b")
RE_TABELA = re.compile(r"<table\b")
RE_SVG = re.compile(r"<svg\b[^>]*>", re.I)
RE_EXPR = re.compile(r"\{[^{}]*\}")
RE_CHAVE_TITULO = re.compile(
    r"(?:title|titulo|name|nome|headline|eyebrow|label|about|shortName)\s*:\s*'([^']*)'"
)
RE_ROTULO_LINK = re.compile(r"<a\b[^>]*>([^<]{1,80})</a>")


def texto_visivel(fonte: str) -> str:
    """Devolve só o que o leitor humano lê, sem tags, atributos e imports."""
    corpo = RE_FRONTMATTER.sub("", fonte)
    corpo = RE_IMPORT.sub("", corpo)
    corpo = RE_ATTR.sub("", corpo)
    corpo = RE_TAG.sub(" ", corpo)
    # Expressão JSX não é texto lido por humano: {area.regulatoryLevel}, {f.qas}.
    for _ in range(4):
        novo = RE_EXPR.sub(" ", corpo)
        if novo == corpo:
            break
        corpo = novo
    return corpo


def linha_de(fonte: str, pos: int) -> int:
    return fonte.count("\n", 0, pos) + 1


# --- Cheques -------------------------------------------------------------


def checar(caminho: Path) -> list[dict]:
    fonte = caminho.read_text(encoding="utf-8").replace(chr(13), "")
    visivel = texto_visivel(fonte)
    visivel_low = visivel.lower()
    achados: list[dict] = []

    def add(nivel: str, regra: str, detalhe: str, linha: int = 0) -> None:
        achados.append({
            "arquivo": str(caminho.relative_to(RAIZ)).replace("\\", "/"),
            "linha": linha, "nivel": nivel, "regra": regra, "detalhe": detalhe,
        })

    def varrer(lista: list[str], regra: str, nivel: str) -> None:
        for termo in lista:
            idx = visivel_low.find(termo.lower())
            if idx >= 0:
                add(nivel, regra, termo)

    varrer(CLICHES, "cliche", "BLOQUEIA")
    varrer(ANTI_PADRAO_26, "anti-padrao-26", "BLOQUEIA")
    varrer(ESCASSEZ, "escassez-fabricada", "BLOQUEIA")
    varrer(BASTIDOR, "verificacao-e-bastidor", "BLOQUEIA")
    varrer(ATRIBUICAO_ANONIMA, "atribuicao-anonima", "BLOQUEIA")
    varrer(ADJETIVO_VAZIO, "adjetivo-vazio", "AVISA")
    varrer(CALQUES, "calque", "AVISA")
    varrer(GERUNDIO_VAGO, "gerundio-vago", "AVISA")
    varrer(COPULA_FUGIDA, "fuga-da-copula", "AVISA")
    varrer(INFLACAO, "inflacao-de-significancia", "AVISA")

    for padrao in NEGA_AFIRMA:
        m = re.search(padrao, visivel)
        if m:
            add("BLOQUEIA", "nega-para-afirmar", m.group(0)[:70])

    # Travessão: vetado em prosa, tolerado em título e cabeçalho de seção.
    # Título aqui não é só <hN>: valor de chave de título num array de dados
    # (title, titulo, name, nome, headline, eyebrow, label) vira cabeçalho de
    # cartão na renderização, e rótulo curto de link também é rótulo, não prosa.
    prosa = visivel
    for h in RE_HEADING.findall(fonte):
        prosa = prosa.replace(RE_TAG.sub(" ", h), " ")
    for m in RE_CHAVE_TITULO.finditer(fonte):
        prosa = prosa.replace(m.group(1), " ")
    for m in RE_ROTULO_LINK.finditer(fonte):
        rotulo = m.group(1).strip()
        if len(rotulo) <= 60:
            prosa = prosa.replace(rotulo, " ")
    if chr(8212) in prosa:
        idx = fonte.find(chr(8212))
        add("BLOQUEIA", "travessao-em-prosa",
            f"{prosa.count(chr(8212))} ocorrência(s) fora de título", linha_de(fonte, idx))

    # Aspas curvas como delimitador (U+201C e U+201D).
    ABRE, FECHA = chr(8220), chr(8221)
    if ABRE in visivel or FECHA in visivel:
        idx = max(fonte.find(ABRE), fonte.find(FECHA))
        add("BLOQUEIA", "aspas-curvas", "aspa curva delimitando citacao",
            linha_de(fonte, idx) if idx > 0 else 0)

    # Marcadores abertos.
    n_verificar = visivel.count("[VERIFICAR]")
    if n_verificar > 5:
        add("BLOQUEIA", "marcadores-abertos", f"{n_verificar} marcadores (teto é 5)")
    elif n_verificar:
        add("AVISA", "marcadores-abertos", f"{n_verificar} marcadores abertos")

    # Naming canônico.
    if "GEO Brasil" in fonte:
        add("BLOQUEIA", "naming", "escreva Brasil GEO, nunca GEO Brasil",
            linha_de(fonte, fonte.find("GEO Brasil")))

    # Acentuação no texto visível.
    for token in ACENTO_FALTANDO:
        m = re.search(rf"(?<![\w\-/.]){token}(?![\w\-/.])", visivel)
        if m:
            add("BLOQUEIA", "acentuacao", f"'{token}' sem acento no texto visível")

    # Cor crua quebra o tema escuro em OKLCH.
    for m in RE_HEX.finditer(fonte):
        add("AVISA", "hex-cru", f"{m.group(0)} (use token do tema)",
            linha_de(fonte, m.start()))

    # Tabela sem contêiner rolável estoura o layout em 390px.
    for m in RE_TABELA.finditer(fonte):
        janela = fonte[max(0, m.start() - 400):m.start()]
        if "overflow-x-auto" not in janela:
            add("BLOQUEIA", "tabela-sem-rolagem",
                "table sem wrapper overflow-x-auto", linha_de(fonte, m.start()))

    # SVG sem nome acessível é invisível para leitor de tela.
    for m in RE_SVG.finditer(fonte):
        abertura = m.group(0)
        if "aria-hidden" in abertura:
            continue
        janela = fonte[m.start():m.start() + 900]
        if "aria-labelledby" not in abertura and "<title" not in janela:
            add("AVISA", "svg-sem-nome",
                "svg sem title/aria-labelledby nem aria-hidden",
                linha_de(fonte, m.start()))

    return achados


# --- Alvos ---------------------------------------------------------------


def alvos_do_diff() -> list[Path]:
    """Arquivos tocados nesta branch, incluindo os ainda nao rastreados."""
    nomes: set[str] = set()
    diff = subprocess.run(
        ["git", "diff", "--name-only", "origin/main...HEAD"],
        cwd=RAIZ, capture_output=True, text=True, check=False,
    ).stdout
    nomes.update(diff.split())
    status = subprocess.run(
        ["git", "status", "--porcelain"],
        cwd=RAIZ, capture_output=True, text=True, check=False,
    ).stdout
    for linha in status.splitlines():
        nomes.add(linha[3:].strip())
    return [RAIZ / n for n in nomes if n.endswith(".astro")]


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = {a for a in sys.argv[1:] if a.startswith("--")}

    if "--changed" in flags:
        alvos = alvos_do_diff()
    elif args:
        alvos = [Path(a).resolve() for a in args]
    else:
        alvos = sorted(PAGES.rglob("*.astro"))

    alvos = [a for a in alvos if a.exists()]
    achados: list[dict] = []
    for alvo in alvos:
        achados.extend(checar(alvo))

    bloqueios = [a for a in achados if a["nivel"] == "BLOQUEIA"]
    avisos = [a for a in achados if a["nivel"] == "AVISA"]

    if "--json" in flags:
        print(json.dumps({
            "arquivos": len(alvos), "bloqueios": len(bloqueios),
            "avisos": len(avisos), "achados": achados,
        }, ensure_ascii=False, indent=2))
        return 1 if bloqueios else 0

    print(f"lint-editorial: {len(alvos)} arquivo(s) varrido(s)")
    for a in bloqueios:
        print(f"  BLOQUEIA {a['arquivo']}:{a['linha']} [{a['regra']}] {a['detalhe']}")
    for a in avisos:
        print(f"  avisa    {a['arquivo']}:{a['linha']} [{a['regra']}] {a['detalhe']}")
    print(f"\nTotal: {len(bloqueios)} bloqueio(s), {len(avisos)} aviso(s)")
    return 1 if bloqueios else 0


if __name__ == "__main__":
    raise SystemExit(main())
