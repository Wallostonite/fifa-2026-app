import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Search, MapPin, ChevronRight, Building2 } from "lucide-react";

const COUNTRIES = ["All","USA","Canada","Mexico"];

export default function Cities() {
  const [search, setSearch]   = useState("");
  const [country, setCountry] = useState("All");

  const { data: cities = [], isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: () => fetch("/api/cities").then(r => r.json()),
  });

  const filtered = cities.filter(c => {
    const matchC = country === "All" || c.country === country;
    const matchS = !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.stadium.toLowerCase().includes(search.toLowerCase());
    return matchC && matchS;
  });

  const grouped = filtered.reduce((acc, c) => {
    if (!acc[c.country]) acc[c.country] = [];
    acc[c.country].push(c);
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-white mb-1">Host Cities</h1>
      <p className="text-gray-500 text-sm mb-6">16 cities across USA, Canada & Mexico</p>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search city or stadium…"
          className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-gray-600 transition-colors"
        />
      </div>

      {/* Country filter */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {COUNTRIES.map(c => (
          <button key={c} onClick={() => setCountry(c)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
              ${country === c ? "bg-[#FF415B] text-white" : "bg-gray-900 border border-gray-800 text-gray-400 hover:text-white"}`}>
            {c}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_,i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 h-36 animate-pulse" />
          ))}
        </div>
      ) : (
        Object.entries(grouped).map(([ctry, ctyCities]) => (
          <div key={ctry} className="mb-8">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
              {ctyCities[0]?.flag} {ctry}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ctyCities.map(c => (
                <Link key={c.id} to={`/cities/${c.id}`}
                  className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-2xl p-5 flex flex-col gap-3 transition-colors group">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-white group-hover:text-[#FF415B] transition-colors">{c.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin size={12} className="text-gray-500" />
                        <p className="text-xs text-gray-500 truncate">{c.stadium}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-600 group-hover:text-gray-400 mt-0.5 shrink-0" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#FF415B] bg-[#FF415B]/10 px-2.5 py-1 rounded-full font-medium">
                      {c.stadium_capacity?.toLocaleString()} cap
                    </span>
                    <span className="text-xs text-gray-600">{c.best_time_to_visit}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
