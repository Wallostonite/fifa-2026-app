import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Radio, Clock, CheckCircle2, Calendar, Search } from "lucide-react";

const FILTERS = ["All","Live","Today","Upcoming","Results"];
const LIVE_STATUSES = new Set(["first-half","second-half","half-time"]);

function statusLabel(m) {
  if (m.status === "first-half")  return `${m.match_minute ?? 0}'`;
  if (m.status === "second-half") return `${m.match_minute ?? 45}'`;
  if (m.status === "half-time")   return "HT";
  if (m.status === "finished")    return "FT";
  if (m.status === "pre-match")   return "Soon";
  try { return new Date(m.match_date).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}); }
  catch { return ""; }
}

function MatchCard({ m }) {
  const isLive     = LIVE_STATUSES.has(m.status);
  const isFinished = m.status === "finished";
  const isUpcoming = m.status === "upcoming" || m.status === "pre-match";

  return (
    <div className={`bg-gray-900 rounded-2xl p-4 border transition-colors
      ${isLive ? "border-[#FF415B]/40" : "border-gray-800"}`}>
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{m.tournament}</span>
        {isLive ? (
          <span className="flex items-center gap-1.5 text-xs font-bold text-[#FF415B] bg-[#FF415B]/10 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF415B] live-pulse" />
            {statusLabel(m)}
          </span>
        ) : isFinished ? (
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <CheckCircle2 size={12} /> FT
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={12} /> {statusLabel(m)}
          </span>
        )}
      </div>

      {/* Teams + Score */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 min-w-0">
          <span className="text-2xl">{m.team1_flag}</span>
          <span className="text-sm font-semibold text-white truncate">{m.team1}</span>
        </div>
        <div className={`px-3 py-1.5 rounded-xl min-w-[72px] text-center
          ${isLive ? "bg-[#FF415B]/15" : "bg-gray-800"}`}>
          {isUpcoming
            ? <span className="text-gray-500 font-bold text-sm">vs</span>
            : <span className={`text-lg font-bold tabular-nums ${isLive ? "text-[#FF415B]" : "text-white"}`}>
                {m.team1_score ?? 0} – {m.team2_score ?? 0}
              </span>
          }
        </div>
        <div className="flex-1 flex items-center gap-2 justify-end min-w-0">
          <span className="text-sm font-semibold text-white truncate text-right">{m.team2}</span>
          <span className="text-2xl">{m.team2_flag}</span>
        </div>
      </div>

      {/* Venue */}
      <p className="text-center text-xs text-gray-600 mt-2 truncate">{m.venue} · {m.location}</p>
    </div>
  );
}

export default function Schedule() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const buildUrl = () => {
    if (filter === "Live")     return "/api/live-scores?status=live";
    if (filter === "Today")    return `/api/live-scores?date=${new Date().toISOString().slice(0,10)}`;
    if (filter === "Upcoming") return "/api/live-scores?status=upcoming";
    if (filter === "Results")  return "/api/live-scores?status=finished";
    return "/api/live-scores";
  };

  const { data: matches = [], dataUpdatedAt } = useQuery({
    queryKey: ["schedule", filter],
    queryFn: () => fetch(buildUrl()).then(r => r.json()).catch(() => []),
    refetchInterval: 30000,
  });

  const liveCount = matches.filter(m => LIVE_STATUSES.has(m.status)).length;

  const filtered = search
    ? matches.filter(m =>
        m.team1.toLowerCase().includes(search.toLowerCase()) ||
        m.team2.toLowerCase().includes(search.toLowerCase()) ||
        m.venue?.toLowerCase().includes(search.toLowerCase()) ||
        m.tournament?.toLowerCase().includes(search.toLowerCase())
      )
    : matches;

  // Group by date
  const grouped = filtered.reduce((acc, m) => {
    const d = m.match_date.slice(0,10);
    if (!acc[d]) acc[d] = [];
    acc[d].push(m);
    return acc;
  }, {});

  const lastUpdated = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit"})
    : "—";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Scores & Fixtures</h1>
          <p className="text-gray-500 text-sm mt-1">Updated {lastUpdated} · auto-refreshes every 30s</p>
        </div>
        {liveCount > 0 && (
          <span className="flex items-center gap-2 bg-[#FF415B]/10 border border-[#FF415B]/30 text-[#FF415B] text-sm font-bold px-3 py-1.5 rounded-full">
            <Radio size={14} className="live-pulse" /> {liveCount} LIVE
          </span>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search team, venue or stage…"
          className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-gray-600 transition-colors"
        />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
              ${filter === f ? "bg-[#FF415B] text-white" : "bg-gray-900 border border-gray-800 text-gray-400 hover:text-white"}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Match groups */}
      {Object.keys(grouped).length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          <Calendar size={40} className="mx-auto mb-3 opacity-30" />
          <p>No matches found</p>
        </div>
      ) : (
        Object.entries(grouped).map(([date, dayMatches]) => (
          <div key={date} className="mb-8">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
              {new Date(date + "T12:00:00Z").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {dayMatches.map(m => <MatchCard key={m.id} m={m} />)}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
