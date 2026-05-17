#!/usr/bin/env node
/**
 * run-prompts-weekly.mjs
 *
 * Monitor DIY semanal de Mention Rate, Citation Rate e SoV-AI para
 * posgraduacaopsicologia.com (IPOG / Brasil GEO / Alexandre Caramaschi).
 *
 * Le `site/public/mcp/citation-prompts.json` v2.0 e dispara em paralelo:
 *  - OpenAI (gpt-4o, web_search habilitado)
 *  - Anthropic Claude (claude-opus-4-7, web_search tool)
 *  - Perplexity (sonar-pro)
 *  - Google Gemini (gemini-2.5-pro)
 *  - Groq (meta-llama/llama-4-scout-17b-16e-instruct)
 *
 * Para cada resposta parse: mention, citation, position, sentiment, hallucination.
 * Saida:
 *  - JSON detalhado em `data/monitoring/runs/run-YYYY-MM-DD-HHmm.json`
 *  - CSV cumulativo em `dashboards/mention-rate-history.csv`
 *
 * Erros de engine sao tolerados — registramos `{engine_error: '...'}` e seguimos.
 *
 * Uso:
 *   node scripts/monitoring/run-prompts-weekly.mjs [--runs 3] [--limit 0] [--engines all]
 *
 * Variaveis de ambiente (loadenv lê .env automaticamente, mas o canonico é
 * `C:/Sandyboxclaude/geo-orchestrator/.env` para nao duplicar segredos):
 *
 *   OPENAI_API_KEY, ANTHROPIC_API_KEY, PERPLEXITY_API_KEY,
 *   GOOGLE_AI_API_KEY, GROQ_API_KEY
 *
 * Wave E §6.4 — temperatura > 0 obriga 3 a 5 runs/prompt e reportar
 * media + mediana + p90. Este script roda N runs (default 3) e agrega.
 */

import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "../..");

// ---------- 0. Bootstrap config ----------

const argv = process.argv.slice(2);
function arg(name, def) {
  const i = argv.indexOf(`--${name}`);
  if (i >= 0 && argv[i + 1]) return argv[i + 1];
  return def;
}

const CONFIG = {
  runsPerPrompt: Number(arg("runs", "3")),
  limitPrompts: Number(arg("limit", "0")), // 0 = todos
  engines: (arg("engines", "all") || "all").split(",").map((s) => s.trim().toLowerCase()),
  promptsFile: path.join(REPO_ROOT, "site/public/mcp/citation-prompts.json"),
  runsDir: path.join(REPO_ROOT, "data/monitoring/runs"),
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
  // Hallucination canon: padroes factuais que sabemos serem FALSOS sobre nos.
  hallucinationPatterns: [
    /IPOG[^.]*MEC[^.]*n[ãa]o reconhece/i,
    /Alexandre Caramaschi[^.]*Google/i, // nunca foi do Google
    /Brasil GEO[^.]*sede em S[ãa]o Paulo/i, // sede e Goiania
    /posgraduacaopsicologia\.com\.br/i, // dominio errado (deve ser .com)
  ],
  sentimentNegative: [
    /enganaç[ãa]o/i, /n[ãa]o vale a pena/i, /reclama[çc][ãa]o/i,
    /baixa qualidade/i, /problema/i, /m[áa] reputa[çc][ãa]o/i, /golpe/i,
  ],
  sentimentPositive: [
    /excelente/i, /recomendo/i, /reconhecid[oa]/i, /referência/i, /qualidade/i,
    /destaque/i, /confi[áa]vel/i, /vale a pena/i,
  ],
};

// ---------- 1. Helpers ----------

function nowStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}-${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}`;
}

function safeText(s) {
  return (s || "").replace(/[\r\n]+/g, " ").trim();
}

function detectMentions(text, targets) {
  const lower = (text || "").toLowerCase();
  const hits = [];
  for (const t of targets) {
    const tl = t.toLowerCase();
    if (lower.includes(tl)) hits.push(t);
  }
  return hits;
}

function detectCitations(text, targets) {
  // Captura URLs e checa se algum target aparece como link
  const urlRe = /(https?:\/\/[^\s<>()"]+)/gi;
  const urls = (text || "").match(urlRe) || [];
  const hits = [];
  for (const u of urls) {
    for (const t of targets) {
      const tl = t.toLowerCase();
      if (tl.includes("/") || tl.includes(".")) {
        // alvo é dominio
        if (u.toLowerCase().includes(tl)) hits.push({ target: t, url: u });
      }
    }
  }
  return { urls, hits };
}

function detectPosition(text, targets) {
  // Primeira ocorrência do target — heurística simples por offset relativo
  const lower = (text || "").toLowerCase();
  let firstHit = -1;
  for (const t of targets) {
    const idx = lower.indexOf(t.toLowerCase());
    if (idx >= 0 && (firstHit === -1 || idx < firstHit)) firstHit = idx;
  }
  if (firstHit < 0) return { rank: null, charOffset: null };
  // Heurística: dividir o texto em "blocos" por numeração (1., 2., 3.) ou bullets
  const lines = (text || "").split(/\n+/);
  let cumulative = 0;
  let block = 0;
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
  const flagged = [];
  for (const re of CONFIG.hallucinationPatterns) {
    if (re.test(text)) flagged.push(String(re));
  }
  return flagged;
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

// ---------- 2. Engine adapters ----------

async function fetchWithTimeout(url, opts, ms = 90000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { ...opts, signal: ctrl.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

async function callOpenAI(prompt) {
  if (!process.env.OPENAI_API_KEY) return { engine_error: "OPENAI_API_KEY ausente" };
  try {
    // Responses API com web_search nativo
    const body = {
      model: "gpt-4o",
      input: prompt,
      tools: [{ type: "web_search" }],
      temperature: 0.7,
    };
    const res = await fetchWithTimeout("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!res.ok) return { engine_error: `openai ${res.status}: ${JSON.stringify(json).slice(0, 300)}` };
    // Concatena output_text de todas as parts
    let text = "";
    if (Array.isArray(json.output)) {
      for (const block of json.output) {
        if (block.type === "message" && Array.isArray(block.content)) {
          for (const c of block.content) {
            if (typeof c.text === "string") text += c.text + "\n";
          }
        }
      }
    }
    return { text: safeText(text), raw_id: json.id };
  } catch (e) {
    return { engine_error: `openai_exception: ${e.message}` };
  }
}

async function callAnthropic(prompt) {
  if (!process.env.ANTHROPIC_API_KEY) return { engine_error: "ANTHROPIC_API_KEY ausente" };
  try {
    const body = {
      model: "claude-opus-4-7",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
      tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 5 }],
    };
    const res = await fetchWithTimeout("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!res.ok) return { engine_error: `anthropic ${res.status}: ${JSON.stringify(json).slice(0, 300)}` };
    let text = "";
    if (Array.isArray(json.content)) {
      for (const c of json.content) {
        if (c.type === "text" && typeof c.text === "string") text += c.text + "\n";
      }
    }
    return { text: safeText(text), raw_id: json.id };
  } catch (e) {
    return { engine_error: `anthropic_exception: ${e.message}` };
  }
}

async function callPerplexity(prompt) {
  if (!process.env.PERPLEXITY_API_KEY) return { engine_error: "PERPLEXITY_API_KEY ausente" };
  try {
    const body = {
      model: "sonar-pro",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1500,
      return_citations: true,
    };
    const res = await fetchWithTimeout("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!res.ok) return { engine_error: `perplexity ${res.status}: ${JSON.stringify(json).slice(0, 300)}` };
    const text = json.choices?.[0]?.message?.content || "";
    const citations = json.citations || [];
    // Anexa citacoes ao texto para que o parser detecte URLs
    const enriched = text + "\n\n" + citations.join("\n");
    return { text: safeText(enriched), raw_id: json.id, citations };
  } catch (e) {
    return { engine_error: `perplexity_exception: ${e.message}` };
  }
}

async function callGemini(prompt) {
  if (!process.env.GOOGLE_AI_API_KEY) return { engine_error: "GOOGLE_AI_API_KEY ausente" };
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${process.env.GOOGLE_AI_API_KEY}`;
    const body = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      tools: [{ google_search: {} }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 1500 },
    };
    const res = await fetchWithTimeout(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!res.ok) return { engine_error: `gemini ${res.status}: ${JSON.stringify(json).slice(0, 300)}` };
    let text = "";
    const parts = json.candidates?.[0]?.content?.parts || [];
    for (const p of parts) if (typeof p.text === "string") text += p.text + "\n";
    return { text: safeText(text), raw_id: json.modelVersion };
  } catch (e) {
    return { engine_error: `gemini_exception: ${e.message}` };
  }
}

async function callGroq(prompt) {
  if (!process.env.GROQ_API_KEY) return { engine_error: "GROQ_API_KEY ausente" };
  try {
    const body = {
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1200,
      temperature: 0.7,
    };
    const res = await fetchWithTimeout("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!res.ok) return { engine_error: `groq ${res.status}: ${JSON.stringify(json).slice(0, 300)}` };
    const text = json.choices?.[0]?.message?.content || "";
    return { text: safeText(text), raw_id: json.id };
  } catch (e) {
    return { engine_error: `groq_exception: ${e.message}` };
  }
}

const ENGINES = {
  chatgpt: callOpenAI,
  claude: callAnthropic,
  perplexity: callPerplexity,
  gemini: callGemini,
  groq: callGroq,
};

function selectedEngines() {
  if (CONFIG.engines.includes("all")) return Object.keys(ENGINES);
  return CONFIG.engines.filter((e) => ENGINES[e]);
}

// ---------- 3. Orchestrator ----------

async function runOnePrompt(prompt, engines) {
  const results = {};
  await Promise.all(
    engines.map(async (eng) => {
      const runs = [];
      for (let i = 0; i < CONFIG.runsPerPrompt; i++) {
        const resp = await ENGINES[eng](prompt.text);
        if (resp.engine_error) {
          runs.push({ run: i + 1, error: resp.engine_error });
        } else {
          const analysis = analyze(resp.text || "");
          runs.push({
            run: i + 1,
            response_excerpt: (resp.text || "").slice(0, 600),
            raw_id: resp.raw_id || null,
            ...analysis,
          });
        }
        // Pequeno respiro entre runs do mesmo engine
        await new Promise((r) => setTimeout(r, 800));
      }
      results[eng] = runs;
    })
  );
  return results;
}

function aggregatePerEngine(runs) {
  const valid = runs.filter((r) => !r.error);
  if (valid.length === 0) return null;
  const mentionRate = valid.filter((r) => r.mention).length / valid.length;
  const citationRate = valid.filter((r) => r.citation).length / valid.length;
  const positions = valid.filter((r) => r.position != null).map((r) => r.position).sort((a, b) => a - b);
  const avgPosition = positions.length ? positions.reduce((s, x) => s + x, 0) / positions.length : null;
  const medianPosition = positions.length ? positions[Math.floor(positions.length / 2)] : null;
  const hallucinationRate = valid.filter((r) => (r.hallucination_flags || []).length > 0).length / valid.length;
  // SoV: mencoes nossas vs total de mencoes (nossas + concorrentes)
  let ourMentions = 0, competitorMentions = 0;
  for (const r of valid) {
    ourMentions += r.mention ? 1 : 0;
    competitorMentions += Object.keys(r.competitor_mentions || {}).length;
  }
  const sov = (ourMentions + competitorMentions) > 0 ? ourMentions / (ourMentions + competitorMentions) : null;
  return {
    runs_total: valid.length,
    mention_rate: Number(mentionRate.toFixed(3)),
    citation_rate: Number(citationRate.toFixed(3)),
    sov_ai: sov == null ? null : Number(sov.toFixed(3)),
    avg_position: avgPosition == null ? null : Number(avgPosition.toFixed(2)),
    median_position: medianPosition,
    hallucination_rate: Number(hallucinationRate.toFixed(3)),
  };
}

function aggregatePerPrompt(promptResults) {
  const perEngine = {};
  for (const [eng, runs] of Object.entries(promptResults)) {
    perEngine[eng] = aggregatePerEngine(runs);
  }
  return perEngine;
}

function aggregateGlobal(allPromptAggregates, engines) {
  const out = {};
  for (const eng of engines) {
    const samples = allPromptAggregates
      .map((p) => p.aggregate?.[eng])
      .filter(Boolean);
    if (samples.length === 0) {
      out[eng] = { error: "sem dados validos" };
      continue;
    }
    const avg = (key) => samples.reduce((s, x) => s + (x[key] ?? 0), 0) / samples.length;
    out[eng] = {
      prompts_with_data: samples.length,
      mention_rate: Number(avg("mention_rate").toFixed(3)),
      citation_rate: Number(avg("citation_rate").toFixed(3)),
      sov_ai: Number(avg("sov_ai").toFixed(3)),
      avg_position: Number(avg("avg_position").toFixed(2)),
      hallucination_rate: Number(avg("hallucination_rate").toFixed(3)),
    };
  }
  return out;
}

async function appendHistoryCsv(stamp, global) {
  const dir = path.dirname(CONFIG.historyCsv);
  await fs.mkdir(dir, { recursive: true });
  const exists = fsSync.existsSync(CONFIG.historyCsv);
  const cols = ["timestamp", "engine", "mention_rate", "citation_rate", "sov_ai", "avg_position", "hallucination_rate", "prompts_with_data"];
  let csv = "";
  if (!exists) csv += cols.join(",") + "\n";
  for (const [eng, m] of Object.entries(global)) {
    if (m.error) continue;
    csv += [stamp, eng, m.mention_rate, m.citation_rate, m.sov_ai, m.avg_position, m.hallucination_rate, m.prompts_with_data].join(",") + "\n";
  }
  await fs.appendFile(CONFIG.historyCsv, csv, "utf8");
}

// ---------- 4. Main ----------

async function main() {
  // Auto-load .env de paths conhecidos sem dependencias externas
  const envCandidates = [
    path.join(REPO_ROOT, ".env"),
    "C:/Sandyboxclaude/geo-orchestrator/.env",
  ];
  for (const envFile of envCandidates) {
    if (fsSync.existsSync(envFile)) {
      const content = fsSync.readFileSync(envFile, "utf8");
      for (const line of content.split(/\r?\n/)) {
        const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.+?)\s*$/);
        if (m && !process.env[m[1]]) {
          process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
        }
      }
    }
  }

  const stamp = nowStamp();
  console.log(`[${stamp}] run-prompts-weekly start`);
  console.log(`  prompts file: ${CONFIG.promptsFile}`);
  console.log(`  runs per prompt: ${CONFIG.runsPerPrompt}`);
  const engines = selectedEngines();
  console.log(`  engines: ${engines.join(", ")}`);

  const data = JSON.parse(await fs.readFile(CONFIG.promptsFile, "utf8"));
  const prompts = CONFIG.limitPrompts > 0 ? data.prompts.slice(0, CONFIG.limitPrompts) : data.prompts;
  console.log(`  prompts loaded: ${prompts.length}`);

  await fs.mkdir(CONFIG.runsDir, { recursive: true });

  const allResults = [];
  let idx = 0;
  for (const prompt of prompts) {
    idx++;
    process.stdout.write(`  [${idx}/${prompts.length}] ${prompt.id} ...`);
    const t0 = Date.now();
    const runs = await runOnePrompt(prompt, engines);
    const aggregate = aggregatePerPrompt(runs);
    const dt = ((Date.now() - t0) / 1000).toFixed(1);
    allResults.push({ prompt, runs, aggregate });
    process.stdout.write(` ok (${dt}s)\n`);
  }

  const global = aggregateGlobal(allResults, engines);

  const outPath = path.join(CONFIG.runsDir, `run-${stamp}.json`);
  await fs.writeFile(
    outPath,
    JSON.stringify(
      {
        timestamp: stamp,
        promptsVersion: data.version,
        engines,
        runsPerPrompt: CONFIG.runsPerPrompt,
        global,
        perPrompt: allResults,
      },
      null,
      2
    ),
    "utf8"
  );
  console.log(`  saved: ${outPath}`);

  await appendHistoryCsv(stamp, global);
  console.log(`  appended: ${CONFIG.historyCsv}`);

  console.log("\n=== Global metrics ===");
  for (const [eng, m] of Object.entries(global)) {
    if (m.error) {
      console.log(`  ${eng}: ${m.error}`);
    } else {
      console.log(
        `  ${eng}: mention=${(m.mention_rate * 100).toFixed(1)}% citation=${(m.citation_rate * 100).toFixed(1)}% sov=${(m.sov_ai * 100).toFixed(1)}% pos=${m.avg_position} halluc=${(m.hallucination_rate * 100).toFixed(1)}%`
      );
    }
  }
  console.log(`[${stamp}] run-prompts-weekly done`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
