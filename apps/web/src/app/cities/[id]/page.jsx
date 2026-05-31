import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Users, Train, Star, Beer, UtensilsCrossed, Landmark } from "lucide-react";

const VENUE_ICONS = { Bar: Beer, Restaurant: UtensilsCrossed, "Fan Zone": Users, Attraction: Landmark };

export default function CityDetail() {
  const { id } = useParams();

  const { data: city, isLoading } = useQuery({
    queryKey: ["city", id],
    queryFn: () => fetch(`/api/cities/${id}`).then(r => r.json()),
    enabled: !!id,
  });

  if (isLoading) return (
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-4">
      {[...Array(4)].map((_,i) => <div key={i} className="bg-gray-900 rounded-2xl h-24 animate-pulse" />)}
    </div>
  );
  if (!city || city.error) return (
    <div className="max-w-3xl mx-auto px-6 py-8 text-center text-gray-500">City not found.</div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Back */}
      <Link to="/cities" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Cities
      </Link>

      {/* Hero */}
      <div className="bg-[#FF415B] rounded-2xl p-6 mb-6">
        <p className="text-sm font-semibold text-white/70 mb-1">{city.flag} {city.country}</p>
        <h1 className="text-3xl font-bold text-white mb-1">{city.name}</h1>
        <div className="flex items-center gap-2 mt-3">
          <Users size={15} className="text-white/70" />
          <span className="text-white/90 text-sm">{city.stadium} · {city.stadium_capacity?.toLocaleString()} capacity</span>
        </div>
      </div>

      {/* About */}
      {city.description && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-white mb-3">About</h2>
          <p className="text-gray-400 leading-relaxed">{city.description}</p>
        </section>
      )}

      {/* Transport */}
      {city.transport_tips && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-white mb-3">Getting There</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex gap-3">
            <Train size={20} className="text-[#FF415B] shrink-0 mt-0.5" />
            <p className="text-gray-400 text-sm leading-relaxed">{city.transport_tips}</p>
          </div>
        </section>
      )}

      {/* Fan zones */}
      {city.fan_zones?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-white mb-3">Fan Zones</h2>
          <div className="space-y-3">
            {city.fan_zones.map((z, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FF415B]/10 flex items-center justify-center shrink-0">
                  <Star size={14} className="text-[#FF415B]" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{z.name}</p>
                  {z.address && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin size={11} className="text-gray-500" />
                      <p className="text-xs text-gray-500">{z.address}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recommended venues */}
      {city.recommended_venues?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-white mb-3">Where to Go</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {city.recommended_venues.map((v, i) => {
              const Icon = VENUE_ICONS[v.type] || MapPin;
              return (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-gray-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-white text-sm truncate">{v.name}</p>
                      <span className="text-[10px] text-gray-500 bg-gray-800 px-1.5 py-0.5 rounded shrink-0">{v.type}</span>
                    </div>
                    {v.address && <p className="text-xs text-gray-500 mt-0.5 truncate">{v.address}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Quick facts */}
      <section>
        <h2 className="text-lg font-bold text-white mb-3">Quick Facts</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Best Time</p>
            <p className="font-semibold text-white">{city.best_time_to_visit || "June–July"}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Country</p>
            <p className="font-semibold text-white">{city.flag} {city.country}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
