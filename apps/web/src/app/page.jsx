import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Radio, Building2, Calendar, CalendarCheck, MessageSquare, DollarSign, ChevronRight, Trophy, User, Clock, MapPin } from "lucide-react";
import { usePreferences } from "@/hooks/usePreferences";

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm font-medium text-gray-300">{label}</div>
      {sub && <div className="text-xs text-gray-500 mt-0.5">{sub}</div>}
    </div>
  );
}

function QuickLink({ href, icon: Icon, label, desc, accent }) {
  return (
    <Link to={href} className={`flex items-center gap-4 p-4 rounded-2xl border transition-colors group
      ${accent ? "bg-[#FF415B] border-[#FF415B] hover:bg-[#e03550]" : "bg-gray-900 border-gray-800 hover:border-gray-700"}`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
        ${accent ? "bg-white/20" : "bg-[#FF415B]/10"}`}>
        <Icon size={20} className={accent ? "text-white" : "text-[#FF415B]"} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className={`text-xs ${accent ? "text-white/70" : "text-gray-500"}`}>{desc}</p>
      </div>
      <ChevronRight size={16} className={`shrink-0 ${accent ? "text-white/60" : "text-gray-600 group-hover:text-gray-400"}`} />
    </Link>
  );
}

export default function Page() {
  const { prefs, hasPrefs } = usePreferences();

  const { data: liveMatches = [] } = useQuery({
    queryKey: ["homeLive"],
    queryFn: () => fetch("/api/live-scores?status=live").then(r => r.json()).catch(() => []),
    refetchInterval: 30000,
  });

  const { data: allMatches = [] } = useQuery({
    queryKey: ["homeMatches"],
    queryFn: () => fetch("/api/matches").then(r => r.json()).catch(() => []),
  });

  // Team-specific matches when preferences are set
  const { data: teamMatches = [] } = useQuery({
    queryKey: ["homeTeamMatches", prefs.team],
    queryFn: () => fetch(`/api/matches?team=${encodeURIComponent(prefs.team)}`).then(r => r.json()).catch(() => []),
    enabled: !!prefs.team,
  });

  const upcoming = allMatches.filter(m => new Date(m.match_date) > new Date()).slice(0, 4);
  const nextTeamMatch = teamMatches.find(m => new Date(m.match_date) > new Date());

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Trophy size={18} className="text-[#FF415B]" />
          <span className="text-xs font-semibold text-[#FF415B] uppercase tracking-widest">FIFA World Cup 2026™</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Welcome to FanPass</h1>
        <p className="text-gray-400 text-lg">Your companion for the biggest tournament on earth.</p>
        <p className="text-gray-600 text-sm mt-1">Jun 11 – Jul 19, 2026 · USA · Canada · Mexico</p>
      </div>

      {/* Live banner */}
      {liveMatches.length > 0 && (
        <Link to="/schedule" className="block mb-6">
          <div className="bg-[#FF415B] rounded-2xl p-5 hover:bg-[#e03550] transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-white live-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-widest">
                Live Now · {liveMatches.length} Match{liveMatches.length > 1 ? "es" : ""}
              </span>
            </div>
            <div className="space-y-2.5">
              {liveMatches.slice(0, 3).map(m => (
                <div key={m.id} className="flex items-center gap-3">
                  <span className="text-2xl">{m.team1_flag}</span>
                  <span className="font-bold text-white text-xl tabular-nums w-16 text-center">{m.team1_score ?? 0} – {m.team2_score ?? 0}</span>
                  <span className="text-2xl">{m.team2_flag}</span>
                  <span className="text-white/80 text-sm flex-1 truncate">{m.team1} vs {m.team2}</span>
                  <span className="text-white/60 text-xs bg-white/15 rounded-md px-2 py-0.5 shrink-0">
                    {m.status === "half-time" ? "HT" : `${m.match_minute ?? 0}'`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Link>
      )}

      {/* Personalisation prompt — only when no prefs set */}
      {!hasPrefs && (
        <Link to="/profile" className="block mb-6">
          <div className="bg-gray-900 border border-dashed border-gray-700 hover:border-[#FF415B]/50 rounded-2xl p-5 flex items-center gap-4 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-gray-800 group-hover:bg-[#FF415B]/10 flex items-center justify-center shrink-0 transition-colors">
              <User size={20} className="text-gray-500 group-hover:text-[#FF415B] transition-colors" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white text-sm">Personalise FanPass</p>
              <p className="text-xs text-gray-500">Pick your country and team to see your schedule, fan zones and more →</p>
            </div>
          </div>
        </Link>
      )}

      {/* Personalised next match — when prefs are set */}
      {hasPrefs && nextTeamMatch && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">{prefs.countryFlag}</span>
              <h2 className="font-bold text-white text-sm">Your Next Match</h2>
            </div>
            <Link to="/schedule" className="text-xs text-[#FF415B] hover:underline">Full schedule →</Link>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={13} className="text-gray-500" />
              <span className="text-xs text-gray-500">
                {new Date(nextTeamMatch.match_date).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}
                {" · "}
                {new Date(nextTeamMatch.match_date).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}
              </span>
              <span className="text-xs text-[#FF415B] bg-[#FF415B]/10 px-2 py-0.5 rounded-full ml-auto">{nextTeamMatch.tournament}</span>
            </div>
            <div className="flex items-center justify-center gap-6">
              <div className="flex flex-col items-center gap-1">
                <span className="text-4xl">{nextTeamMatch.team1_flag}</span>
                <span className={`text-sm font-bold ${nextTeamMatch.team1 === prefs.team ? "text-[#FF415B]" : "text-white"}`}>{nextTeamMatch.team1}</span>
              </div>
              <span className="text-gray-600 font-bold text-xl">vs</span>
              <div className="flex flex-col items-center gap-1">
                <span className="text-4xl">{nextTeamMatch.team2_flag}</span>
                <span className={`text-sm font-bold ${nextTeamMatch.team2 === prefs.team ? "text-[#FF415B]" : "text-white"}`}>{nextTeamMatch.team2}</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1.5 mt-4 pt-4 border-t border-gray-800 text-xs text-gray-500">
              <MapPin size={12} />
              <span>{nextTeamMatch.venue} · {nextTeamMatch.location}</span>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Teams" value="48" sub="From 6 confederations" />
        <StatCard label="Matches" value="104" sub="Group stage to Final" />
        <StatCard label="Host Cities" value="16" sub="USA · Canada · Mexico" />
        <StatCard label="Days" value="39" sub="Jun 11 – Jul 19" />
      </div>

      {/* Quick links */}
      <h2 className="text-lg font-bold text-white mb-4">Explore</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        <QuickLink href="/schedule"   icon={Radio}         label="Live Scores & Fixtures" desc="All 104 matches · refreshes every 30s" accent />
        <QuickLink href="/cities"     icon={Building2}      label="Host Cities"            desc="16 cities and 16 stadiums" />
        <QuickLink href="/events"     icon={CalendarCheck}  label="Fan Events"             desc="Meetups, watch parties & tours" />
        <QuickLink href="/forums"     icon={MessageSquare}  label="Fan Forums"             desc="Discuss with fans worldwide" />
        <QuickLink href="/my-matches" icon={Calendar}       label="My Matches"             desc="Book and track your tickets" />
        <QuickLink href="/logistics"  icon={DollarSign}     label="Logistics"              desc="Currency, phrases & visa info" />
      </div>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">
              {hasPrefs ? `All Upcoming Matches` : "Next Up"}
            </h2>
            <Link to="/schedule" className="text-sm text-[#FF415B] hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {upcoming.map(m => {
              const d = new Date(m.match_date);
              return (
                <div key={m.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center gap-4">
                  <div className="text-center w-14 shrink-0">
                    <p className="text-xs font-semibold text-gray-400">{d.toLocaleDateString("en-US",{month:"short",day:"numeric"})}</p>
                    <p className="text-xs text-gray-600">{d.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}</p>
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-3 min-w-0">
                    <span className="text-2xl">{m.team1_flag}</span>
                    <span className="text-sm font-semibold text-white hidden sm:block truncate max-w-[80px]">{m.team1}</span>
                    <span className="text-xs text-gray-500 font-bold px-2 py-1 bg-gray-800 rounded-lg">vs</span>
                    <span className="text-sm font-semibold text-white hidden sm:block truncate max-w-[80px]">{m.team2}</span>
                    <span className="text-2xl">{m.team2_flag}</span>
                  </div>
                  <div className="text-right shrink-0 max-w-[120px]">
                    <p className="text-xs text-gray-400 truncate">{m.venue}</p>
                    <span className="text-[10px] text-[#FF415B] bg-[#FF415B]/10 px-2 py-0.5 rounded-full">{m.tournament}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
