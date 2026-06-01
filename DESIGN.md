# FanPass — System & Architectural Design

**A FIFA World Cup 2026™ companion app (web + mobile) backed by a shared API.**

---

## 1. Project Overview

FanPass is a multi-platform companion application for the FIFA World Cup 2026,
hosted across the USA, Canada, and Mexico. It helps fans follow the tournament
and plan their trip from one place.

### Core features
- **Live Scores & Fixtures** — all 104 official matches (72 group-stage + knockouts) with auto-computed live status that refreshes every 30 seconds.
- **Host Cities** — guides to all 16 host cities: stadiums, fan zones, recommended venues, transport tips.
- **Fan Events** — community-created meetups, watch parties, and city tours (full CRUD).
- **Fan Forums** — team-based discussion threads with likes (full CRUD).
- **My Matches** — personal match-booking tracker grouped by city (full CRUD).
- **Logistics** — currency converter (USD/CAD/MXN), 30 multilingual phrases (EN/ES/FR), and visa/entry info per host country.
- **Profile / Personalisation** — pick a country + favourite team to personalise the home screen, schedule, and fan zones.

### Platforms
| Surface | Audience | Tech |
|---|---|---|
| **Mobile app** | iOS + Android | Expo / React Native |
| **Web app** | Desktop + mobile browsers | React Router SPA |
| **API server** | Shared backend for both | Hono + Node + PostgreSQL |

Both clients talk to the **same REST API**, so the data (schedule, cities,
events, forums) is identical everywhere.

### Origin story (important context)
The project was bootstrapped from an AI app-builder platform ("Anything"/Create).
A major engineering effort was **decoupling it from that platform** — removing
proprietary SDKs, telemetry, and a sandbox-only server architecture — to make it
a fully self-hostable, standard codebase. This is reflected throughout the
design decisions below.

---

## 2. High-Level Architecture

```
                    ┌─────────────────────────────┐
                    │        Neon PostgreSQL       │
                    │  (serverless Postgres)       │
                    └──────────────▲──────────────┘
                                   │ SQL (tagged templates)
                                   │
                    ┌──────────────┴──────────────┐
                    │   API server  (server.js)    │
                    │   Hono + @hono/node-server   │
                    │   /api/* route handlers      │
                    │   + static SPA hosting       │
                    │   Deployed on Railway        │
                    └───────▲──────────────▲───────┘
                            │ HTTPS/JSON   │ HTTPS/JSON
              ┌─────────────┘              └──────────────┐
              │                                           │
   ┌──────────┴───────────┐                  ┌────────────┴───────────┐
   │   Web client (SPA)    │                  │   Mobile app (Expo)     │
   │   React Router 7      │                  │   React Native + Expo   │
   │   served as static    │                  │   Expo Router           │
   │   files by the API    │                  │   ships via EAS         │
   └───────────────────────┘                  └─────────────────────────┘
```

### Request flow (example: live scores)
1. Client calls `GET /api/live-scores?status=live`.
2. The Hono server routes it to `live-scores/route.js`.
3. That handler pulls the static fixture list, computes each match's status from
   the current time, optionally overlays live scores from the `match_scores`
   table, and returns JSON.
4. React Query on the client caches the response and re-fetches every 30 s.

---

## 3. Monorepo Structure

```
fifa-2026-app/
├── apps/
│   ├── web/                     # React Router SPA + API server
│   │   ├── src/app/
│   │   │   ├── page.jsx         # Home
│   │   │   ├── schedule/        # Live scores & fixtures
│   │   │   ├── cities/          # City list + [id] detail
│   │   │   ├── events/          # Fan events
│   │   │   ├── forums/          # Fan forums
│   │   │   ├── my-matches/      # Personal bookings
│   │   │   ├── logistics/       # Currency / phrases / visa
│   │   │   ├── profile/         # Preferences
│   │   │   ├── privacy/         # Privacy policy
│   │   │   └── api/             # API route handlers (Request→Response)
│   │   │       ├── cities/route.js
│   │   │       ├── matches/route.js
│   │   │       ├── live-scores/route.js
│   │   │       ├── events/route.js
│   │   │       ├── forums/route.js
│   │   │       ├── my-matches/route.js
│   │   │       ├── user-profile/route.js
│   │   │       └── utils/{sql.js, migrate.js}
│   │   ├── src/components/Nav.jsx
│   │   ├── src/hooks/usePreferences.js
│   │   ├── server.js            # standalone Hono production server
│   │   ├── react-router.config.ts (ssr: false)
│   │   └── vite.config.ts
│   └── mobile/                  # Expo / React Native app
│       ├── src/app/             # Expo Router (file-based)
│       │   ├── (tabs)/          # Home, Cities, Events, Forums, Profile
│       │   ├── city/[id].jsx
│       │   ├── live-scores.jsx, my-matches.jsx, logistics.jsx
│       │   └── onboarding/      # country → team → preferences
│       ├── src/hooks/{useProfile.js, useTheme.js}
│       ├── src/utils/api.js     # apiFetch (absolute-URL helper)
│       ├── app.json, eas.json
└── PUBLISHING.md, DESIGN.md
```

---

## 4. The Full Stack — and Why

### Shared
| Tech | Why |
|---|---|
| **TypeScript / modern JS (ESM)** | Type safety on shared models; ESM is the native module system for both Vite and modern Node. |
| **@tanstack/react-query 5** | Declarative server-state: caching, background refetch, and the 30 s polling that powers live scores — on *both* web and mobile with the same mental model. |
| **date-fns 4** | Lightweight, tree-shakeable date formatting (match times, "x mins ago"). Chosen over Moment.js (heavy, legacy). |
| **lucide-react / lucide-react-native** | One icon set with identical names across web and native, so UI stays visually consistent. |

### Web client
| Tech | Why |
|---|---|
| **React 18** | Mature, ubiquitous UI library; concurrent features available. |
| **React Router 7** (`react-router`, `-dom`, `/dev`, `/node`) | File-based routing + first-class SPA/SSR toggle. We use **SPA mode** (see §6). |
| **Vite 6** | Fast dev server + optimized production builds; the React Router 7 build runs on Vite. |
| **Tailwind CSS** | Utility-first styling — fast to build the dark, consistent UI without a separate CSS system. |
| **Hono 4** | Tiny, web-standard (`Request`/`Response`) HTTP framework. Powers the API and the production static server. |
| **@hono/node-server** | Adapter that runs a Hono app as a real Node HTTP server (what `server.js` uses). |
| **@neondatabase/serverless** | Postgres driver designed for serverless/edge — connects over HTTP, no long-lived TCP pool needed. |

### Mobile client
| Tech | Why |
|---|---|
| **Expo (SDK 54) + React Native 0.81** | Cross-platform iOS/Android from one codebase; Expo gives managed builds (EAS), OTA updates, and a huge module library without touching Xcode/Android Studio. |
| **Expo Router 6** | File-based routing for native, mirroring the web's structure (tabs + stack screens). |
| **@react-navigation/bottom-tabs** | Underlies Expo Router's tab bar (Home / Cities / Events / Forums / Profile). |
| **@react-native-async-storage/async-storage** | Local persistence for user preferences and anonymous user ID — instant reads, offline-friendly. |
| **expo-secure-store** | Encrypted storage for the auth token (keychain/keystore). |
| **react-native-maps / @teovilla/react-native-web-maps** | Fan-zone map; the `-web-maps` shim lets the same screen render on web. |
| **react-native-reanimated** | Smooth 60fps animations (e.g. the pulsing "LIVE" indicator). |
| **EAS (Expo Application Services)** | Cloud build + store submission pipeline. |

### Backend & data
| Tech | Why |
|---|---|
| **Hono route handlers** | Each `route.js` exports `GET/POST/PUT/PATCH/DELETE` functions taking a web `Request` and returning a `Response` — portable across Node, edge, Vercel, etc. |
| **Neon PostgreSQL** | Managed serverless Postgres; generous free tier; HTTP driver works well from both a Node server and serverless functions. |
| **SQL tagged-template helper** (`sql.js`) | `sql\`SELECT ... ${value}\`` parameterises queries automatically → prevents SQL injection. |
| **Static data modules** | Cities, phrases, and the official match schedule are hard-coded JS modules (not DB rows) because they're read-only reference data that rarely changes — zero DB latency, works with no database at all. |

### Infrastructure / DevOps
| Tech | Why |
|---|---|
| **Railway** | Runs a persistent `node server.js` process (which the app needs). Auto-deploys on `git push`; injects `PORT` and `DATABASE_URL`. |
| **Nixpacks** | Railway's builder; pinned to Node 20 via `nixpacks.toml`. |
| **GitHub** | Source control + deploy trigger. |
| **`.npmrc` (legacy-peer-deps)** | Resolves peer-dependency conflicts inherited from the generator (e.g. `@types/react` 18 vs 19). |

---

## 5. Data Model

```
user_profiles(user_id PK, country, country_flag, team, language, notifications_enabled)
matches        — served as a static module (official FIFA 2026 schedule); DB table optional override
match_scores(match_id PK, team1_score, team2_score, match_minute, status_override)
fan_events(id PK, title, description, team, city, venue_name, address, date_time, organizer_name, type)
forum_posts(id PK, team, title, content, author_name, replies_count, likes, created_date)
my_matches(id PK, user_id, team1, team2, date, venue, city, country, stage, notes)
fan_zones / safety_info / cultural_tips — per-country reference rows
```

Reference data (cities, phrases, schedule) lives in code; user-generated data
(events, forums, bookings, profiles, live scores) lives in Postgres. `migrate.js`
creates all tables idempotently.

---

## 6. Key Architectural Decisions

### 6.1 SPA over SSR (the big one)
The generator produced a **server-rendered** app whose custom server had an
**unsettled top-level `await`** — importing the page bundle hung forever outside
the original sandbox (Node exited with code 13).

**Decision:** switch the web app to **SPA mode** (`ssr: false`).
- React Router emits a static `index.html` + JS bundle.
- Every page already fetched its data **client-side** via React Query and used
  **no server loaders**, so SSR added nothing — dropping it lost zero
  functionality.
- The static bundle runs on any host.

### 6.2 A hand-written API server instead of the platform's
The platform's server scanned the filesystem at runtime to register routes and
hung on boot. We replaced it with a **~70-line `server.js`**: a Hono app that
- statically mounts each API route handler at its path,
- serves the static SPA from `build/client`, and
- has an SPA fallback (`*` → `index.html`) for client-side routing.

This is explicit, debuggable, and portable.

### 6.3 Web-standard route handlers
API routes are plain functions: `export async function GET(request) { return Response.json(...) }`.
Because they use the Fetch standard, the *same files* could run on Node, Vercel
functions, Cloudflare Workers, or Deno — no framework lock-in.

### 6.4 `apiFetch` absolute-URL helper (mobile)
Relative URLs like `/api/cities` work in a browser but mean nothing on a phone.
`src/utils/api.js` prepends `EXPO_PUBLIC_BASE_URL`, so every mobile request
resolves to the Railway server. This was the fix for the "mobile app is empty"
bug (the platform's fetch polyfill that used to do this had been removed during
decoupling).

### 6.5 Local-first preferences (mobile)
`useProfile` reads preferences from AsyncStorage **first** (instant, offline),
then syncs with the DB in the background. The UI never blocks on the network.
`saveProfile` writes locally before hitting the API, so onboarding can't be lost
to a flaky connection.

### 6.6 Computed live-match status
Rather than require a live data feed, match status (`upcoming` / `first-half` /
`half-time` / `second-half` / `finished`) is **derived from the current time vs.
kickoff**, with an optional `match_scores` override for real scores. This makes
the live UI work with zero external dependencies and degrade gracefully.

### 6.7 Decoupling from the generator platform
Removed: proprietary `@anythingai` packages, a phone-home telemetry/error-logging
chain, a "dev menu" overlay, Stripe billing scaffolding, and all
`EXPO_PUBLIC_CREATE_*` / `__B44_DB__` references. Replaced platform env-gates
with the standard Expo `__DEV__` flag. Result: a clean, self-owned codebase.

---

## 7. Security & Privacy
- **Parameterised SQL** everywhere via tagged templates — no string concatenation.
- **HTTPS** end-to-end (Railway TLS).
- **Minimal data**: anonymous device ID + chosen preferences; no email, password, GPS, contacts, or ads/trackers.
- **Secrets** (`DATABASE_URL`) live in Railway env vars, never in git (`.env` is gitignored).
- A published **privacy policy** at `/privacy` (App Store / Play Store requirement).

---

## 8. Deployment Pipeline
1. `git push` → GitHub.
2. Railway detects the push, runs Nixpacks: `npm install` → `npm run build` (Vite SPA build).
3. Railway starts `npm start` → `node server.js`, binding `0.0.0.0:$PORT`.
4. Mobile: `eas build` (cloud) → `eas submit` → App Store / Play Store.

---

# 9. Interview Questions & Answers

### A. Project & Architecture

**Q: Give me a 60-second overview of the project.**
A multi-platform FIFA World Cup 2026 companion: a React Native (Expo) mobile app
and a React Router web app, both consuming one Hono/Postgres API. Features
include live scores, city guides, fan events, forums, a personal match tracker,
and travel logistics. It was extracted from an AI app-builder and re-architected
into a self-hostable codebase deployed on Railway.

**Q: Why a monorepo with separate web and mobile apps instead of one universal codebase?**
The two surfaces have genuinely different UI primitives (DOM vs. native views)
and navigation models. A monorepo keeps them in one repo for shared conventions
and a shared API contract, while letting each use its platform's idiomatic stack
(Tailwind/React Router vs. React Native/Expo Router). React Native Web could
unify them, but it tends to compromise both platforms; we kept them separate and
shared the API instead.

**Q: How do the web and mobile clients stay consistent?**
They call the **same REST API**, so the data is identical. They also share
patterns: React Query for server state, lucide icons, date-fns, and a parallel
file-based routing structure.

**Q: Walk me through what happens when a user opens "Live Scores".**
The client issues `GET /api/live-scores?status=live`. Hono routes it to the
handler, which takes the static schedule, computes each match's status from the
current time, overlays any rows from `match_scores`, and returns JSON. React
Query caches it and re-polls every 30 s; a pulsing indicator shows live matches.

### B. Frontend

**Q: Why React Query instead of useEffect + useState for data fetching?**
It gives caching, deduplication, background refetching, and polling
(`refetchInterval`) declaratively. The 30-second live-score refresh is one line.
It also unifies loading/error states and avoids waterfalls and stale data bugs
you hit hand-rolling fetch in effects.

**Q: Why did you choose SPA mode over SSR for the web app?**
Two reasons. First, pragmatic: the inherited SSR server had an unsettled
top-level await that hung on boot outside its sandbox. Second, principled: every
page fetches data client-side and uses no server loaders, so SSR added no SEO or
performance benefit here — it was pure liability. SPA mode gives a static bundle
that hosts anywhere.

**Q: What are the trade-offs of SPA mode you accepted?**
Weaker SEO and a slightly slower first paint (JS must load before content). For a
logged-in-style companion app this is fine. If SEO mattered, I'd reintroduce SSR
or pre-render specific routes.

**Q: How is styling handled and why Tailwind?**
Utility-first Tailwind on web for speed and consistency; React Native inline
style objects on mobile. Tailwind avoids a parallel CSS architecture and keeps
the dark theme consistent via utility classes.

**Q: How does navigation work on each platform?**
Web: React Router 7 file-based routes under `src/app`. Mobile: Expo Router
file-based routes, with a bottom-tab group `(tabs)` and stack screens for detail
pages like `city/[id]`.

### C. Backend & Data

**Q: Why Hono?**
It's tiny, fast, and built on web standards (`Request`/`Response`). That keeps
the route handlers portable — they can run on Node, edge runtimes, or serverless
with no rewrite — and the same framework serves both the API and the static SPA.

**Q: How do you prevent SQL injection?**
All queries use tagged-template literals: ``sql`SELECT * FROM forum_posts WHERE
team = ${team}` ``. The driver parameterises interpolated values rather than
concatenating strings, so user input can't alter the query.

**Q: Why is some data in code and some in the database?**
Reference data — the 16 cities, the official 104-match schedule, phrases — is
read-only and rarely changes, so it lives in static modules: zero DB latency and
the app works even with no database. User-generated data — events, forum posts,
bookings, profiles, live scores — is dynamic, so it lives in Postgres.

**Q: Why Neon specifically?**
It's serverless Postgres with an HTTP driver, a strong free tier, and it works
equally well from a persistent Node server or serverless functions — which kept
deployment options open during the hosting migration.

**Q: How is live match status determined without a paid data feed?**
It's computed from `now` vs. each match's kickoff time into states like
first-half/half-time/second-half/finished, with an optional `match_scores`
override for real scores entered via `PATCH /api/live-scores`. It degrades
gracefully and needs no third-party dependency.

**Q: How would you scale this if a feed and millions of users arrived?**
Introduce a real-time scores provider feeding `match_scores`; push updates via
WebSockets/SSE instead of 30 s polling; add a read cache (Redis) in front of hot
endpoints; move static reference data to a CDN; and horizontally scale the
stateless API behind a load balancer.

### D. Mobile

**Q: The mobile app showed blank screens at one point — what was the bug?**
Mobile API calls used relative URLs (`/api/...`). In a browser those resolve to
the origin, but on a device there's no origin, so every request silently failed.
The platform's fetch polyfill that used to rewrite these had been removed during
decoupling. Fix: an `apiFetch` helper that prepends `EXPO_PUBLIC_BASE_URL` to
build absolute URLs.

**Q: How are user preferences persisted, and why local-first?**
`useProfile` reads from AsyncStorage first for an instant, offline-capable load,
then syncs from the API in the background. `saveProfile` writes locally before
the network call, so onboarding survives a flaky connection. Network is an
enhancement, not a dependency.

**Q: How do you publish an Expo app to the stores?**
Via EAS: `eas build` produces signed `.aab`/`.ipa` binaries in the cloud (EAS
manages certificates), then `eas submit` uploads to Play Console / App Store
Connect. JS-only changes can ship instantly over-the-air with `eas update`.

### E. DevOps & Deployment

**Q: Why was Vercel difficult, and why Railway?**
The app needs a persistent server (custom API server + originally SSR). Vercel
serves static files and short-lived functions, not a long-running process — so a
404 (nothing to statically serve) and then the server's boot-time hang. Railway
runs a real `node server.js` continuously, which is exactly the model this app
needs.

**Q: Could it run on Vercel now that it's a SPA?**
Yes — host `build/client` as static files on Vercel and run the API as
serverless functions (the handlers are already Fetch-standard) or keep it on
Railway. Since Railway works end-to-end, there was no need to split it.

**Q: What was the `legacy-peer-deps` issue?**
The generated dependency tree had conflicting peer ranges (e.g. `@types/react`
18 vs. a package wanting 19). npm 7+ errors on these by default. An `.npmrc` with
`legacy-peer-deps=true` makes both local and CI installs resolve them
consistently.

**Q: How does a code change reach production?**
`git push` → Railway detects it → Nixpacks installs deps and runs the Vite build
→ Railway restarts `node server.js`. Env vars (`DATABASE_URL`, `PORT`) are
injected by Railway, never committed.

### F. Decoupling & Code Quality

**Q: What did "removing the platform" actually involve?**
Deleting proprietary SDK packages and a sandbox-only SSR server; neutering a
phone-home telemetry/error-reporting chain; removing a dev-menu overlay, Stripe
billing scaffolding, and auth that depended on the platform; and replacing
`EXPO_PUBLIC_CREATE_*`/`__B44_DB__` env-gates with the standard Expo `__DEV__`
flag. Then verifying both apps still build and the API still serves.

**Q: How did you verify nothing broke during that cleanup?**
A repeated full-repo grep for platform identifiers (down to only false-positive
prose matches), a clean web production build, a local run of `server.js`
hitting every endpoint, and a Metro bundle check for dangling imports to deleted
files.

### G. Trade-offs & Reflection

**Q: What would you do differently from scratch?**
Start without the generator to avoid the decoupling tax; define the API contract
and DB schema first; pick SPA + standalone API from day one; and add automated
tests (the codebase is light on them).

**Q: Biggest technical risk in the current design?**
The hand-maintained static schedule can drift from reality, and computed live
status is an approximation. Both are acceptable for a companion app but would be
replaced by a licensed data feed for a production-grade product.

**Q: What's the testing story and how would you improve it?**
Currently minimal. I'd add: unit tests for the status-computation and currency
logic, API integration tests against a test Postgres, and a few end-to-end flows
(onboarding, posting an event) with Playwright (web) and Detox/Maestro (mobile).
```
