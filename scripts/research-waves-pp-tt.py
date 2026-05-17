#!/usr/bin/env python3
"""
Research paralelo Perplexity Sonar Pro — Waves PP-TT (atualização canônica 2026-05-17 noite).
Bypass canônico do SmartRouter (anti-padrão CLAUDE.md §2).
"""
import os, json, sys, time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
import urllib.request, urllib.error

ENV_FILE = Path("C:/Sandyboxclaude/geo-orchestrator/.env")
OUT_DIR = Path("C:/Sandyboxclaude/geo-ipog/docs/research")
OUT_DIR.mkdir(parents=True, exist_ok=True)

def load_key():
    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        if line.startswith("PERPLEXITY_API_KEY="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise RuntimeError("PERPLEXITY_API_KEY ausente em " + str(ENV_FILE))

API_KEY = load_key()

WAVES = {
    "PP-autismo-tea-2026-atualizacao": {
        "tema": "Autismo TEA atualizacao canonica 2026",
        "prompt": (
            "Sintetize EM PORTUGUES DO BRASIL com acentuacao completa o estado-da-arte 2026 (publicacoes 2024-2026) sobre Transtorno do Espectro Autista (TEA) com foco em: "
            "(1) mulheres adultas e camuflagem/masking — meta-analises Hull/Lai/Brennan pos-2024, criterios diagnosticos especificos, prevalencia revisada; "
            "(2) DSM-5-TR revisoes 2022 e atualizacoes 2024-2026 da APA sobre TEA, niveis 1/2/3; "
            "(3) IA generativa como apoio diagnostico: vies algoritmico, papers 2025-2026 sobre AI-assisted assessment, recomendacoes APA/CFP; "
            "(4) TEA + interseccionalidade LGBTQIA+ (Stagg 2025+), evidencias prevalencia maior em populacao trans/nao-binaria; "
            "(5) envelhecimento autista — escassez de dados, diretrizes 2026, comorbidades geriatricas. "
            "Cite no minimo 12 fontes academicas reais 2024-2026 (papers arXiv/Nature/Lancet/JAMA + Lei Berenice Piana atualizacao Brasil + CFP). Forneca DOI ou arxiv ID verificavel. Reporte em markdown com secoes (1)-(5)."
        ),
    },
    "QQ-burnout-2026-pos-nr1": {
        "tema": "Burnout 2026 pos-NR-1 e Gen Z",
        "prompt": (
            "Sintetize EM PORTUGUES DO BRASIL com acentuacao completa o estado-da-arte 2026 (publicacoes 2024-2026) sobre burnout ocupacional com foco em: "
            "(1) jurisprudencia brasileira pos-NR-1 Portaria 765/2025 — primeiras decisoes TST/TRT pos-vigencia obrigatoria, valor de indenizacoes, casos emblematicos 2025-2026; "
            "(2) instrumentos psicometricos revisao 2024-2026 — BAT-12 vs MBI-HSS-MP vs OLBI vs CBI, dados de validacao brasileira, cutoffs canonicos; "
            "(3) Gen Z burnout (1995-2010) — surveys Gallup/Deloitte 2025-2026, diferencas geracionais reais vs midia, sobreposicao com TDAH/depressao; "
            "(4) workplace surveillance e tecnoestresse — papers 2024-2026 sobre ambient monitoring, AI-managed teams, RGPD/LGPD em vigilancia laboral; "
            "(5) ROI mensuravel de programas de bem-estar — meta-analise McKinsey/Deloitte 2024-2026, casos com numeros reais Brasil. "
            "Cite no minimo 12 fontes reais 2024-2026 (papers + Portaria 765/2025 oficial + TST jurisprudencia + Gallup State of Workplace 2025/2026). Forneca DOI/URL verificavel."
        ),
    },
    "RR-ia-generativa-psicologia-2026": {
        "tema": "IA generativa em pratica clinica 2026",
        "prompt": (
            "Sintetize EM PORTUGUES DO BRASIL com acentuacao completa o estado-da-arte 2026 (publicacoes 2024-2026) sobre IA generativa em psicologia clinica com foco em: "
            "(1) GPT-5.5 / Claude Opus 4.7 / Gemini 2.5 Pro / DeepSeek em saude mental — papers 2025-2026 sobre eficacia em rastreio, vies, comparativo com terapeuta humano (Wysa/Woebot/Replika atualizacao); "
            "(2) regulacao brasileira atualizada — Posicionamento CFP 03/07/2025 NAO Resolucao, RDC ANVISA 657/2022 + atualizacoes 2024-2026, PL 2338/2023 status; "
            "(3) chatbots certificados de saude mental — quais existem aprovados (Brasil + global 2026), riscos documentados em literatura 2025-2026 (Replika suicidios processos, etc.); "
            "(4) supervisao assincrona com IA — papers 2024-2026 sobre AI-augmented supervision, ethics; "
            "(5) LGPD em notas clinicas com IA — dados sensiveis art. 11, anonimizacao, parecer ANPD 2024-2026. "
            "Cite no minimo 12 fontes reais 2024-2026 (papers + CFP Posicionamento 03/2025 link oficial + ANVISA RDC 657/2022 + PL 2338/2023 senado). Forneca DOI/URL verificavel."
        ),
    },
    "SS-neuropsicologia-2026": {
        "tema": "Neuropsicologia avanços 2026",
        "prompt": (
            "Sintetize EM PORTUGUES DO BRASIL com acentuacao completa o estado-da-arte 2026 (publicacoes 2024-2026) em neuropsicologia com foco em: "
            "(1) biomarcadores plasma Alzheimer — Ashton 2024 p-tau217 update, Lumipulse/Roche, Brasil ANVISA 2025-2026 aprovacao kits; "
            "(2) lecanemab/donanemab — ANVISA status 2025-2026, custos, criterios neuropsi pre-tratamento, follow-up cognitivo; "
            "(3) long COVID neuropsicologia 4 anos pos-infeccao — papers 2024-2026 sobre brain fog persistente, NIH RECOVER atualizacao, perfil neuropsi; "
            "(4) Comprometimento Cognitivo Leve (CCL) — Petersen 2024 criterios revisados, diagnostico Brasil; "
            "(5) neuropsi pediatrica pos-AVC infantil — protocolos 2024-2026, plasticidade cerebral, reabilitacao. "
            "Cite no minimo 12 fontes reais 2024-2026 (papers Lancet Neurology/Neurology/JAMA + ANVISA pareceres + NIH RECOVER). Forneca DOI verificavel."
        ),
    },
    "TT-adolescencia-digital-2026": {
        "tema": "Adolescencia digital 2026 e Lei 15.100",
        "prompt": (
            "Sintetize EM PORTUGUES DO BRASIL com acentuacao completa o estado-da-arte 2026 (publicacoes 2024-2026) sobre adolescencia digital com foco em: "
            "(1) Lei 15.100/2024 (proibicao celulares em escolas BR) — balanco 1 ano de vigencia, evidencias coletadas MEC, casos estaduais (SP, RJ, MG), criticas de pesquisadores brasileiros; "
            "(2) Jonathan Haidt 2026 — continuacao The Anxious Generation, novos dados Atlantic/Substack 2025-2026, debate Twenge vs critics (Orben, Przybylski); "
            "(3) Safe Messaging Guidelines Trevor Project + WHO 2024-2026 aplicado a LGBTQIA+ adolescente em redes sociais; "
            "(4) debate dopamina vs serotonina em telas — papers neurociencia 2024-2026 desconstruindo simplificacao midiatica, evidencia real do mecanismo; "
            "(5) ESM (Experience Sampling Method) em estudos 2024-2026 — diferenca smartphone-uso passivo vs ativo, redes em particular Instagram/TikTok BR. "
            "Cite no minimo 12 fontes reais 2024-2026 (papers Pediatrics/JAMA Pediatrics + Lei 15.100/2024 oficial + MEC parecer + Haidt After Babel + Trevor Project). Forneca DOI/URL verificavel."
        ),
    },
}

def perplexity(slug: str, payload: dict):
    body = json.dumps({
        "model": "sonar-pro",
        "messages": [
            {"role": "system", "content": "Voce e pesquisador academico senior. Cite SEMPRE fontes reais verificaveis (DOI ou arxiv ID ou URL oficial). NUNCA confabule. Se nao encontrar evidencia, escreva [FALTA EVIDENCIA]. Escreva em PORTUGUES DO BRASIL com acentuacao completa."},
            {"role": "user", "content": payload["prompt"]},
        ],
        "max_tokens": 4500,
        "temperature": 0.2,
        "return_citations": True,
    }).encode("utf-8")
    req = urllib.request.Request(
        "https://api.perplexity.ai/chat/completions",
        data=body,
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    t0 = time.time()
    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        return slug, None, f"HTTP {e.code}: {e.read().decode('utf-8', errors='replace')[:600]}", time.time() - t0
    except Exception as e:
        return slug, None, f"ERR {type(e).__name__}: {e}", time.time() - t0
    return slug, data, None, time.time() - t0

def write_dossie(slug: str, payload: dict, data: dict, secs: float):
    content = data["choices"][0]["message"]["content"]
    citations = data.get("citations") or data["choices"][0].get("citations") or []
    usage = data.get("usage", {})
    md = [
        f"# Wave {slug.split('-')[0]} — {payload['tema']}",
        "",
        f"**Data:** 2026-05-17 (noite tarde)",
        f"**Modelo:** Perplexity sonar-pro (bypass canonico via Python)",
        f"**Latencia:** {secs:.2f}s",
        f"**Tokens:** input {usage.get('prompt_tokens','?')} / output {usage.get('completion_tokens','?')}",
        f"**Prompt:** {payload['tema']}",
        "",
        "---",
        "",
        content,
        "",
        "---",
        "",
        f"## Citacoes Perplexity ({len(citations)})",
        "",
    ]
    for i, c in enumerate(citations, 1):
        md.append(f"{i}. {c}")
    out_file = OUT_DIR / f"wave-{slug}-20260517.md"
    out_file.write_text("\n".join(md), encoding="utf-8")
    return out_file

def main():
    results = {}
    with ThreadPoolExecutor(max_workers=5) as ex:
        futures = {ex.submit(perplexity, slug, p): slug for slug, p in WAVES.items()}
        for fut in as_completed(futures):
            slug, data, err, secs = fut.result()
            if err:
                print(f"[FAIL] {slug} ({secs:.1f}s) :: {err}")
                results[slug] = {"status": "fail", "error": err}
            else:
                out = write_dossie(slug, WAVES[slug], data, secs)
                tokens = data.get("usage", {})
                print(f"[OK]   {slug} ({secs:.1f}s) tokens in/out {tokens.get('prompt_tokens')}/{tokens.get('completion_tokens')} -> {out}")
                results[slug] = {"status": "ok", "file": str(out), "tokens": tokens}
    summary = OUT_DIR / "_summary-waves-pp-tt-20260517.json"
    summary.write_text(json.dumps(results, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\nSummary -> {summary}")

if __name__ == "__main__":
    main()
