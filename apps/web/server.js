// Standalone production server — serves the static SPA (build/client)
// and mounts the API route handlers. Replaces the platform's hung
// createHonoServer with a minimal, deploy-friendly Hono + Node server.
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { readFile } from "node:fs/promises";

// API route modules (Web-standard Request -> Response handlers)
import * as cities from "./src/app/api/cities/route.js";
import * as cityDetail from "./src/app/api/cities/[id]/route.js";
import * as matches from "./src/app/api/matches/route.js";
import * as liveScores from "./src/app/api/live-scores/route.js";
import * as phrases from "./src/app/api/phrases/route.js";
import * as events from "./src/app/api/events/route.js";
import * as forums from "./src/app/api/forums/route.js";
import * as forumDetail from "./src/app/api/forums/[id]/route.js";
import * as myMatches from "./src/app/api/my-matches/route.js";
import * as userProfile from "./src/app/api/user-profile/route.js";
import * as fanZones from "./src/app/api/fan-zones/route.js";
import * as safetyInfo from "./src/app/api/safety-info/route.js";
import * as culturalTips from "./src/app/api/cultural-tips/route.js";

const app = new Hono();

// Adapt a route module's method to a Hono handler.
// Route handlers take (Request, { params }) and return a Response.
const wrap = (mod, method) => async (c) => {
  if (typeof mod[method] !== "function") {
    return c.json({ error: "Method not allowed" }, 405);
  }
  return mod[method](c.req.raw, { params: c.req.param() });
};

// ── API routes ──
app.get("/api/cities", wrap(cities, "GET"));
app.get("/api/cities/:id", wrap(cityDetail, "GET"));

app.get("/api/matches", wrap(matches, "GET"));

app.get("/api/live-scores", wrap(liveScores, "GET"));
app.patch("/api/live-scores", wrap(liveScores, "PATCH"));

app.get("/api/phrases", wrap(phrases, "GET"));

app.get("/api/events", wrap(events, "GET"));
app.post("/api/events", wrap(events, "POST"));

app.get("/api/forums", wrap(forums, "GET"));
app.post("/api/forums", wrap(forums, "POST"));
app.put("/api/forums/:id", wrap(forumDetail, "PUT"));
app.delete("/api/forums/:id", wrap(forumDetail, "DELETE"));

app.get("/api/my-matches", wrap(myMatches, "GET"));
app.post("/api/my-matches", wrap(myMatches, "POST"));
app.put("/api/my-matches", wrap(myMatches, "PUT"));
app.delete("/api/my-matches", wrap(myMatches, "DELETE"));

app.get("/api/user-profile", wrap(userProfile, "GET"));
app.post("/api/user-profile", wrap(userProfile, "POST"));
app.put("/api/user-profile", wrap(userProfile, "PUT"));

app.get("/api/fan-zones", wrap(fanZones, "GET"));
app.get("/api/safety-info", wrap(safetyInfo, "GET"));
app.get("/api/cultural-tips", wrap(culturalTips, "GET"));

// ── Static assets ──
app.use("/assets/*", serveStatic({ root: "./build/client" }));
app.use("/*", serveStatic({ root: "./build/client" }));

// ── SPA fallback: any non-API, non-file route serves index.html ──
app.get("*", async (c) => {
  const html = await readFile("./build/client/index.html", "utf-8");
  return c.html(html);
});

const port = Number(process.env.PORT) || 3000;
serve({ fetch: app.fetch, port }, (info) => {
  console.log(`🚀 FanPass server running on port ${info.port}`);
});
