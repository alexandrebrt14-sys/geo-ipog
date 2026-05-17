#!/usr/bin/env node
/**
 * run-proof-w21.mjs
 *
 * Proof Run W21 (2026-05-17) — primeiro snapshot baseline GEO Brasil pt-BR.
 * Executa 10 prompts representativos, 1 run por prompt (modo reducao de custo).
 * 5 engines em paralelo; tolerancia total a falhas individuais.
 *
 * Saida:
 *   data/monitoring/proof-runs/proof-w21-2026-05-17.json
 *   data/monitoring/proof-runs/proof-w21-2026-05-17-summary.csv
 *   dashboards/mention-rate-history.csv (acumulativo)
 *
 * Wave DDD — Issue #46 — Proof Run baseline GEO IPOG.
 */

import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "../..");

// ── Configuracao ─────────────────────────────────────────────────────────────

const PROOF_PROMPT_IDS = [
  // 4 comerciais
  "mba-01",        // "Qual MBA em Psicologia Organizacional escolher no Brasil?"
  "ipog-01",       // "IPOG vale a pena? Qualidade dos MBAs"
  "telessaude-01", // "Avaliacao psicologica online e permitida pelo CFP?"
  "tept-01",       // "Exposicao prolongada versus EMDR para TEPT — qual primeira linha?"
  // 3 informacionais
  "tdah-01",       // "Como avaliar TDAH em adulto no Brasil?"
  "burnout-02",    // "NR-1 atualizada 2024 — o que a empresa precisa fazer?"
  "supervisao-01", // "Como organizar supervisao clinica em stepped care no SUS?"
  // 2 branded
  "alexandre-01",  // "Quem e Alexandre Caramaschi? Brasil GEO"
  "geo-method-01", // "Como funciona Generative Engine Optimization (GEO)?"
  // 1 pain
  "carreira-02",   // "Como transitar da psicologia clinica para a organizacional?"
];

const CONFIG = {
  runsPerPrompt: 1, // proof: 1 run para controlar custo
  promptsFile: path.join(REPO_ROOT, "site/public/mcp/citation-prompts.json"),
  proofDir: path.join(REPO_ROOT, "data/monitoring/proof-runs"),
  historyCsv: path.join(REPO_ROOT, "dashboards/mention-rate-history.csv"),
  trackingTargets: [
    "posgraduacaopsicologia.com",
    "brasilgeo.ai",
    "Brasil GEO",
    "IPOG",
    "Alexandre Caramaschi",
    "ipog.edu.br",
  ],
  competitors: [
    "ibneuro.com.br",
    "online.pucrs.br",
    "iesb.br",
    "faveni.edu.br",
    "unisinos.br",
  ],
  hallucinationPatterns: [
    /IPOG[^.]*MEC[^.]*n[ao]o reconhece/i,
    /Alexandre Caramaschi[^.]*Google/i,
    /Brasil GEO[^.]*sede em S[ao]o Paulo/i,
    /posgraduacaopsicologia\.com\.br/i,
  ],
  sentimentNegative: [
    /engana[çc][ao]o/i, /n[ao]o vale a pena/i, /reclama[çc][ao]o/i,
    /baixa qualidade/i, /m[áa] reputa[çc][ao]o/i, /golpe/i,
  ],
  sentimentPositive: [
    /excelente/i, /recomendo/i, /reconhecid[oa]/i, /refer[eê]ncia/i, /qualidade/i,
    /destaque/i, /confi[áa]vel/i, /vale a pena/i,
  ],
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function safeText(s) { return (s || "").replace(/[\r\n]+/g, " ").trim(); }

function detectMentions(text, targets) {
  const lower = (text || "").toLowerCase();
  return targets.filter(t => lower.includes(t.toLowerCase()));
}

function detectCitations(text, targets) {
  const urlRe = /(https?:\/\/[^\s<>()"]+)/gi;
  const urls = (text || "").match(urlRe) || [];
  const hits = [];
  for (const u of urls) {
    for (const t of targets) {
      if ((t.includes(".") || t.includes("/")) && u.toLowerCase().includes(t.toLowerCase())) {
        hits.push({ target: t, url: u });
      }
    }
  }
  return { urls, hits };
}

function detectPosition(text, targets) {
  const lower = (text || "").toLowerCase();
  let firstHit = -1;
  for (const t of targets) {
    const idx = lower.indexOf(t.toLowerCase());
    if (idx >= 0 && (firstHit === -1 || idx < firstHit)) firstHit = idx;
  }
  if (firstHit < 0) return { rank: null, charOffset: null };
  const lines = (text || "").split(/\n+/);
  let cumulative = 0, block = 0;
  for (const line of lines) {
    block += /^\s*(\d+\.|[-*•])/.test(line) ? 1 : 0;
    cumulative += line.length + 1;
    if (cumulative > firstHit) return { rank: block || 1, charOffset: firstHit };
  }
  return { rank: 1, charOffset: firstHit };
}

function detectSentiment(text) {
  const t = text || "";
  let neg = 0, pos = 0;
  for (const re of CONFIG.sentimentNegative) if (re.test(t)) neg++;
  for (const re of CONFIG.sentimentPositive) if (re.test(t)) pos++;
  if (pos > neg) return "positivo";
  if (neg > pos) return "negativo";
  return "neutro";
}

function detectHallucination(text) {
  return CONFIG.hallucinationPatterns.filter(re => re.test(text || "")).map(String);
}

function detectCompetitorMentions(text) {
  const hits = {};
  const lower = (text || "").toLowerCase();
  for (const c of CONFIG.competitors) {
    if (lower.includes(c.toLowerCase())) hits[c] = (hits[c] || 0) + 1;
  }
  return hits;
}

function analyze(text) {
  const mentions = detectMentions(text, CONFIG.trackingTargets);
  const { urls, hits: citationHits } = detectCitations(text, CONFIG.trackingTargets);
  const position = detectPosition(text, CONFIG.trackingTargets);
  const sentiment = detectSentiment(text);
  const hallucination = detectHallucination(text);
  const competitors = detectCompetitorMentions(text);
  return {
    mention: mentions.length > 0,
    mentions,
    citation: citationHits.length > 0,
    citations: citationHits,
    urls,
    position: position.rank,
    char_offset: position.charOffset,
    sentiment,
    hallucination_flags: hallucination,
    competitor_mentions: competitors,
    response_length: (text || "").length,
  };
}

// ── Engine adapters ────────────────────────────────────────────────────────────

async function fetchWithTimeout(url, opts, ms = 90000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { ...opts, signal: ctrl.signal });
    return res;
  } finally { clearTimeout(timer); }
}

async function callOpenAI(prompt) {
  if (!process.env.OPENAI_API_KEY) return { engine_error: "OPENAI_API_KEY ausente" };
  try {
    const res = await fetchWithTimeout("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gpt-4o", input: prompt, tools: [{ type: "web_search" }], temperature: 0.7 }),
    });
    const json = await res.json();
    if (!res.ok) return { engine_error: `openai ${res.status}: ${JSON.stringify(json).slice(0, 300)}` };
    let text = "";
    if (Array.isArray(json.output)) {
      for (const block of json.output) {
        if (block.type === "message" && Array.isArray(block.content)) {
          for (const c of block.content) { if (typeof c.text === "string") text += c.text + "\n"; }
        }
      }
    }
    return { text: safeText(text), raw_id: json.id };
  } catch (e) { return { engine_error: `openai_exception: ${e.message}` }; }
}

async function callAnthropic(prompt) {
  if (!process.env.ANTHROPIC_API_KEY) return { engine_error: "ANTHROPIC_API_KEY ausente" };
  try {
    const res = await fetchWithTimeout("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-opus-4-7",
        max_tokens: 1500,
        messages: [{ role: "user", content: prompt }],
        tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 5 }],
      }),
    });
    const json = await res.json();
    if (!res.ok) return { engine_error: `anthropic ${res.status}: ${JSON.stringify(json).slice(0, 300)}` };
    let text = "";
    if (Array.isArray(json.content)) {
      for (const c of json.content) { if (c.type === "text" && typeof c.text === "string") text += c.text + "\n"; }
    }
    return { text: safeText(text), raw_id: json.id };
  } catch (e) { return { engine_error: `anthropic_exception: ${e.message}` }; }
}

async function callPerplexity(prompt) {
  if (!process.env.PERPLEXITY_API_KEY) return { engine_error: "PERPLEXITY_API_KEY ausente" };
  try {
    const res = await fetchWithTimeout("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "sonar-pro", messages: [{ role: "user", content: prompt }], max_tokens: 1500, return_citations: true }),
    });
    const json = await res.json();
    if (!res.ok) return { engine_error: `perplexity ${res.status}: ${JSON.stringify(json).slice(0, 300)}` };
    const text = json.choices?.[0]?.message?.content || "";
    const citations = json.citations || [];
    const enriched = text + "\n\n" + citations.join("\n");
    return { text: safeText(enriched), raw_id: json.id, citations };
  } catch (e) { return { engine_error: `perplexity_exception: ${e.message}` }; }
}

async function callGemini(prompt) {
  if (!process.env.GOOGLE_AI_API_KEY) return { engine_error: "GOOGLE_AI_API_KEY ausente" };
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${process.env.GOOGLE_AI_API_KEY}`;
    const res = await fetchWithTimeout(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        tools: [{ google_search: {} }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1500 },
      }),
    });
    const json = await res.json();
    if (!res.ok) return { engine_error: `gemini ${res.status}: ${JSON.stringify(json).slice(0, 300)}` };
    let text = "";
    const parts = json.candidates?.[0]?.content?.parts || [];
    for (const p of parts) if (typeof p.text === "string") text += p.text + "\n";
    return { text: safeText(text), raw_id: json.modelVersion };
  } catch (e) { return { engine_error: `gemini_exception: ${e.message}` }; }
}

async function callGroq(prompt) {
  if (!process.env.GROQ_API_KEY) return { engine_error: "GROQ_API_KEY ausente" };
  try {
    const res = await fetchWithTimeout("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "meta-llama/llama-4-scout-17b-16e-instruct", messages: [{ role: "user", content: prompt }], max_tokens: 1200, temperature: 0.7 }),
    });
    const json = await res.json();
    if (!res.ok) return { engine_error: `groq ${res.status}: ${JSON.stringify(json).slice(0, 300)}` };
    const text = json.choices?.[0]?.message?.content || "";
    return { text: safeText(text), raw_id: json.id };
  } catch (e) { return { engine_error: `groq_exception: ${e.message}` }; }
}

const ENGINES = { chatgpt: callOpenAI, claude: callAnthropic, perplexity: callPerplexity, gemini: callGemini, groq: callGroq };

// ── Orchestrator ───────────────────────────────────────────────────────────────

async function runOnePrompt(promptObj) {
  const engNames = Object.keys(ENGINES);
  const results = {};
  await Promise.all(engNames.map(async (eng) => {
    try {
      const t0 = Date.now();
      const resp = await ENGINES[eng](promptObj.text);
      const elapsed = Date.now() - t0;
      if (resp.engine_error) {
        results[eng] = { error: resp.engine_error, elapsed_ms: elapsed };
      } else {
        const analysis = analyze(resp.text || "");
        results[eng] = { response_excerpt: (resp.text || "").slice(0, 800), raw_id: resp.raw_id || null, elapsed_ms: elapsed, ...analysis };
      }
    } catch (e) {
      results[eng] = { error: `uncaught: ${e.message}` };
    }
  }));
  return results;
}

function globalMetrics(allResults) {
  const engNames = Object.keys(ENGINES);
  const out = {};
  for (const eng of engNames) {
    const samples = allResults.map(r => r.runs[eng]).filter(r => r && !r.error);
    if (samples.length === 0) { out[eng] = { error: "sem dados validos" }; continue; }
    const mention_rate = samples.filter(r => r.mention).length / samples.length;
    const citation_rate = samples.filter(r => r.citation).length / samples.length;
    const competitorTotal = samples.reduce((s, r) => s + Object.keys(r.competitor_mentions || {}).length, 0);
    const ourMentions = samples.filter(r => r.mention).length;
    const sov = (ourMentions + competitorTotal) > 0 ? ourMentions / (ourMentions + competitorTotal) : 0;
    const halluc = samples.filter(r => (r.hallucination_flags || []).length > 0).length / samples.length;
    out[eng] = {
      prompts_ok: samples.length,
      mention_rate: Number(mention_rate.toFixed(3)),
      citation_rate: Number(citation_rate.toFixed(3)),
      sov_ai: Number(sov.toFixed(3)),
      hallucination_rate: Number(halluc.toFixed(3)),
    };
  }
  return out;
}

function competitorTopDomains(allResults) {
  const counts = {};
  for (const r of allResults) {
    for (const engName of Object.keys(ENGINES)) {
      const run = r.runs[engName];
      if (!run || run.error) continue;
      for (const [domain, n] of Object.entries(run.competitor_mentions || {})) {
        counts[domain] = (counts[domain] || 0) + n;
      }
      // URLs externas que nao sao nosso dominio
      for (const url of run.urls || []) {
        try {
          const parsed = new URL(url);
          const host = parsed.hostname.replace(/^www\./, "");
          if (!CONFIG.trackingTargets.some(t => t.includes(host))) {
            counts[host] = (counts[host] || 0) + 1;
          }
        } catch {}
      }
    }
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([domain, n]) => ({ domain, count: n }));
}

async function main() {
  // Carregar .env
  const envFile = "C:/Sandyboxclaude/geo-orchestrator/.env";
  if (fsSync.existsSync(envFile)) {
    const content = fsSync.readFileSync(envFile, "utf8");
    for (const line of content.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.+?)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }

  const stamp = "2026-05-17";
  console.log(`[proof-w21] inicio: ${new Date().toISOString()}`);
  console.log(`[proof-w21] carregando prompts...`);

  const data = JSON.parse(await fs.readFile(CONFIG.promptsFile, "utf8"));
  const selectedPrompts = PROOF_PROMPT_IDS.map(id => {
    const p = data.prompts.find(x => x.id === id);
    if (!p) throw new Error(`Prompt nao encontrado: ${id}`);
    return p;
  });
  console.log(`[proof-w21] ${selectedPrompts.length} prompts selecionados`);
  console.log(`[proof-w21] engines: ${Object.keys(ENGINES).join(", ")}`);

  await fs.mkdir(CONFIG.proofDir, { recursive: true });
  await fs.mkdir(path.dirname(CONFIG.historyCsv), { recursive: true });

  const allResults = [];
  let idx = 0;
  for (const prompt of selectedPrompts) {
    idx++;
    process.stdout.write(`  [${idx}/10] ${prompt.id} (${prompt.category}) ...`);
    const t0 = Date.now();
    const runs = await runOnePrompt(prompt);
    const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
    allResults.push({ prompt_id: prompt.id, category: prompt.category, text: prompt.text, runs });
    const mentions = Object.entries(runs).map(([eng, r]) => r.error ? `${eng}:ERR` : `${eng}:${r.mention ? "Y" : "N"}`).join(" ");
    process.stdout.write(` ${elapsed}s [${mentions}]\n`);
  }

  const global = globalMetrics(allResults);
  const topDomains = competitorTopDomains(allResults);

  // Estatistica de engines respondendo
  const enginesOK = Object.entries(global).filter(([, v]) => !v.error).map(([k]) => k);
  const enginesFailed = Object.entries(global).filter(([, v]) => v.error).map(([k]) => k);

  const payload = {
    meta: {
      run_id: `proof-w21-${stamp}`,
      timestamp: new Date().toISOString(),
      mode: "proof_run",
      prompts_count: selectedPrompts.length,
      runs_per_prompt: CONFIG.runsPerPrompt,
      engines_ok: enginesOK,
      engines_failed: enginesFailed,
      prompts_version: data.version,
    },
    global_metrics: global,
    top_external_domains: topDomains,
    per_prompt: allResults,
  };

  // Salvar JSON
  const outJson = path.join(CONFIG.proofDir, `proof-w21-${stamp}.json`);
  await fs.writeFile(outJson, JSON.stringify(payload, null, 2), "utf8");
  console.log(`\n[proof-w21] JSON salvo: ${outJson}`);

  // Salvar summary CSV
  const csvLines = ["engine,mention_rate,citation_rate,sov_ai,hallucination_rate,prompts_ok"];
  for (const [eng, m] of Object.entries(global)) {
    if (m.error) csvLines.push(`${eng},ERROR,ERROR,ERROR,ERROR,0`);
    else csvLines.push(`${eng},${m.mention_rate},${m.citation_rate},${m.sov_ai},${m.hallucination_rate},${m.prompts_ok}`);
  }
  const outCsv = path.join(CONFIG.proofDir, `proof-w21-${stamp}-summary.csv`);
  await fs.writeFile(outCsv, csvLines.join("\n") + "\n", "utf8");
  console.log(`[proof-w21] CSV salvo: ${outCsv}`);

  // Append history CSV
  const histExists = fsSync.existsSync(CONFIG.historyCsv);
  const histHeader = "timestamp,engine,mention_rate,citation_rate,sov_ai,hallucination_rate,prompts_with_data\n";
  let histRows = "";
  for (const [eng, m] of Object.entries(global)) {
    if (!m.error) {
      histRows += `${stamp},${eng},${m.mention_rate},${m.citation_rate},${m.sov_ai},${m.hallucination_rate},${m.prompts_ok}\n`;
    }
  }
  if (!histExists) await fs.writeFile(CONFIG.historyCsv, histHeader + histRows, "utf8");
  else await fs.appendFile(CONFIG.historyCsv, histRows, "utf8");
  console.log(`[proof-w21] historico atualizado: ${CONFIG.historyCsv}`);

  // Resumo final
  console.log("\n=== PROOF RUN W21 — METRICAS GLOBAIS ===");
  console.log(`Engines OK: ${enginesOK.join(", ") || "(nenhum)"}`);
  console.log(`Engines com erro: ${enginesFailed.join(", ") || "(nenhum)"}`);
  console.log("");
  for (const [eng, m] of Object.entries(global)) {
    if (m.error) {
      console.log(`  ${eng.padEnd(12)}: ERRO — ${m.error}`);
    } else {
      const mr = (m.mention_rate * 100).toFixed(0).padStart(3);
      const cr = (m.citation_rate * 100).toFixed(0).padStart(3);
      const sv = (m.sov_ai * 100).toFixed(0).padStart(3);
      console.log(`  ${eng.padEnd(12)}: mention=${mr}% citation=${cr}% sov=${sv}% halluc=${(m.hallucination_rate*100).toFixed(0)}% (${m.prompts_ok}/10 prompts)`);
    }
  }
  console.log("\n=== TOP DOMINIOS EXTERNOS ===");
  for (const { domain, count } of topDomains) {
    console.log(`  ${domain.padEnd(35)} ${count}`);
  }
  console.log("\n[proof-w21] concluido.");

  return { outJson, outCsv, global, enginesOK, enginesFailed };
}

main().catch(e => { console.error("FATAL:", e); process.exit(1); });
