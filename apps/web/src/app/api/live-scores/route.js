import { GET as getMatches } from "../matches/route";

// Persist score store across hot-reloads in dev via globalThis
if (!globalThis.__FIFA_SCORE_STORE__) globalThis.__FIFA_SCORE_STORE__ = new Map();
const SCORE_STORE = globalThis.__FIFA_SCORE_STORE__;

function computeStatus(matchDate) {
  const now = new Date();
  const start = new Date(matchDate);
  const diffMs = now - start;
  const diffMins = diffMs / (1000 * 60);

  if (diffMins < -120) return "upcoming";   // more than 2h away
  if (diffMins < 0)    return "pre-match";  // within 2h of kickoff
  if (diffMins < 50)   return "first-half"; // 0–50 min window
  if (diffMins < 65)   return "half-time";  // ~50–65 min (includes HT break)
  if (diffMins < 115)  return "second-half";// 65–115 min
  return "finished";
}

function matchMinute(matchDate) {
  const now = new Date();
  const start = new Date(matchDate);
  const diffMins = Math.floor((now - start) / (1000 * 60));
  if (diffMins < 0) return null;
  if (diffMins <= 45) return diffMins;
  if (diffMins <= 60) return 45; // half time
  if (diffMins <= 105) return Math.min(90, diffMins - 15);
  return 90;
}

async function loadScoresFromDB() {
  if (!process.env.DATABASE_URL) return {};
  try {
    const { default: sql } = await import("@/app/api/utils/sql");
    const rows = await sql`SELECT * FROM match_scores`;
    const map = {};
    for (const r of rows) map[r.match_id] = r;
    return map;
  } catch {
    return {};
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");   // live | pre-match | upcoming | finished
  const team   = searchParams.get("team");
  const date   = searchParams.get("date");     // YYYY-MM-DD — filter by match day

  // Fetch base match data
  const matchRes = await getMatches(new Request(`http://localhost/api/matches${team ? `?team=${team}` : ""}`));
  const matches  = await matchRes.json();

  // Load any saved scores
  const dbScores = await loadScoresFromDB();

  const enriched = matches.map((m) => {
    const saved    = dbScores[m.id] || SCORE_STORE.get(m.id) || {};
    const computed = computeStatus(m.match_date);
    const s        = saved.status_override || computed;
    const isLive   = s === "first-half" || s === "second-half" || s === "half-time";

    return {
      ...m,
      status:        s,
      team1_score:   saved.team1_score ?? (s === "upcoming" || s === "pre-match" ? null : 0),
      team2_score:   saved.team2_score ?? (s === "upcoming" || s === "pre-match" ? null : 0),
      match_minute:  isLive ? (saved.match_minute ?? matchMinute(m.match_date)) : null,
    };
  });

  let filtered = enriched;

  if (status) {
    if (status === "live") {
      filtered = enriched.filter((m) => m.status === "first-half" || m.status === "second-half" || m.status === "half-time");
    } else {
      filtered = enriched.filter((m) => m.status === status);
    }
  }

  if (date) {
    filtered = filtered.filter((m) => m.match_date.startsWith(date));
  }

  // Default sort: live first, then pre-match, then chronological
  const ORDER = { "first-half": 0, "second-half": 0, "half-time": 0, "pre-match": 1, "upcoming": 2, "finished": 3 };
  filtered.sort((a, b) => {
    const diff = (ORDER[a.status] ?? 2) - (ORDER[b.status] ?? 2);
    if (diff !== 0) return diff;
    return new Date(a.match_date) - new Date(b.match_date);
  });

  return Response.json(filtered);
}

// PATCH /api/live-scores  { matchId, team1_score, team2_score, match_minute, status_override }
export async function PATCH(request) {
  try {
    const { matchId, team1_score, team2_score, match_minute, status_override } = await request.json();
    if (!matchId) return Response.json({ error: "matchId required" }, { status: 400 });

    const update = {
      team1_score:     team1_score     ?? 0,
      team2_score:     team2_score     ?? 0,
      match_minute:    match_minute    ?? null,
      status_override: status_override ?? null,
    };

    // Persist to DB if available
    if (process.env.DATABASE_URL) {
      try {
        const { default: sql } = await import("@/app/api/utils/sql");
        await sql`
          INSERT INTO match_scores (match_id, team1_score, team2_score, match_minute, status_override)
          VALUES (${matchId}, ${update.team1_score}, ${update.team2_score}, ${update.match_minute}, ${update.status_override})
          ON CONFLICT (match_id) DO UPDATE
          SET team1_score = EXCLUDED.team1_score,
              team2_score = EXCLUDED.team2_score,
              match_minute = EXCLUDED.match_minute,
              status_override = EXCLUDED.status_override
        `;
      } catch {
        SCORE_STORE.set(matchId, update);
      }
    } else {
      SCORE_STORE.set(matchId, update);
    }

    return Response.json({ success: true, matchId, ...update });
  } catch (err) {
    return Response.json({ error: "Failed to update score" }, { status: 500 });
  }
}
