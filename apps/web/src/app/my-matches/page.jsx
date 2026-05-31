import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Calendar, MapPin, Plus, X, Trash2 } from "lucide-react";
import { format } from "date-fns";

const STAGES = ["Group Stage","Round of 32","Round of 16","Quarter Final","Semi Final","Final"];
const COUNTRIES = ["USA","Canada","Mexico"];
const BLANK = { team1:"", team2:"", date:"", venue:"", city:"", country:"USA", stage:"Group Stage", notes:"" };

const getUserId = () => {
  let id = localStorage.getItem("fanpass_user_id");
  if (!id) { id = crypto.randomUUID(); localStorage.setItem("fanpass_user_id", id); }
  return id;
};

function Modal({ match, onClose }) {
  const [form, setForm] = useState(match ? {
    team1: match.team1, team2: match.team2, date: match.date, venue: match.venue,
    city: match.city, country: match.country, stage: match.stage, notes: match.notes || ""
  } : BLANK);
  const set = k => v => setForm(f => ({ ...f, [k]: v }));
  const qc = useQueryClient();

  const save = useMutation({
    mutationFn: d => {
      const userId = getUserId();
      const body = { ...d, userId };
      if (match) body.id = match.id;
      return fetch("/api/my-matches", { method: match ? "PUT" : "POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(body) }).then(r => r.json());
    },
    onSuccess: () => { qc.invalidateQueries({queryKey:["myMatches"]}); onClose(); },
  });

  const submit = e => {
    e.preventDefault();
    if (!form.team1 || !form.team2 || !form.date || !form.venue || !form.city) return;
    save.mutate(form);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-800 sticky top-0 bg-gray-900">
          <h2 className="font-bold text-white text-lg">{match ? "Edit Match" : "Add Match"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={20} /></button>
        </div>
        <form onSubmit={submit} className="p-5 space-y-4">
          {[["Team 1 *","team1","e.g. Brazil"],["Team 2 *","team2","e.g. Argentina"],["Date & Time *","date","2026-06-14 18:00"],["Stadium / Venue *","venue","e.g. Estadio Azteca"],["City *","city","e.g. Mexico City"]].map(([label,key,ph]) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-gray-400 mb-1">{label}</label>
              <input value={form[key]} onChange={e => set(key)(e.target.value)} placeholder={ph}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:border-gray-500 transition-colors" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Country *</label>
            <div className="flex gap-2">
              {COUNTRIES.map(c => (
                <button type="button" key={c} onClick={() => set("country")(c)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors border
                    ${form.country===c ? "bg-[#FF415B] border-[#FF415B] text-white" : "bg-gray-800 border-gray-700 text-gray-400 hover:text-white"}`}>{c}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Stage</label>
            <div className="flex flex-wrap gap-2">
              {STAGES.map(s => (
                <button type="button" key={s} onClick={() => set("stage")(s)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors
                    ${form.stage===s ? "bg-[#FF415B] text-white" : "bg-gray-800 text-gray-400 hover:text-white"}`}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Notes (optional)</label>
            <textarea value={form.notes} onChange={e => set("notes")(e.target.value)} rows={2}
              placeholder="Seat number, travel notes…"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:border-gray-500 resize-none" />
          </div>
          <button type="submit" disabled={save.isPending}
            className="w-full bg-[#FF415B] hover:bg-[#e03550] text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50">
            {save.isPending ? "Saving…" : match ? "Save Changes" : "Add Match"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function MyMatches() {
  const [modal, setModal] = useState(null); // null | "new" | matchObj
  const qc = useQueryClient();

  const { data: matches = [], isLoading } = useQuery({
    queryKey: ["myMatches"],
    queryFn: () => {
      const userId = getUserId();
      return fetch(`/api/my-matches?userId=${userId}`).then(r => r.json()).catch(() => []);
    },
  });

  const del = useMutation({
    mutationFn: id => fetch(`/api/my-matches?id=${id}&userId=${getUserId()}`, { method:"DELETE" }).then(r => r.json()),
    onSuccess: () => qc.invalidateQueries({queryKey:["myMatches"]}),
  });

  const grouped = matches.reduce((acc, m) => { if(!acc[m.city]) acc[m.city]=[]; acc[m.city].push(m); return acc; }, {});
  const stats = { total: matches.length, cities: new Set(matches.map(m=>m.city)).size, countries: new Set(matches.map(m=>m.country)).size };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">My Matches</h1>
          <p className="text-gray-500 text-sm mt-1">Your personal match bookings</p>
        </div>
        <button onClick={() => setModal("new")}
          className="flex items-center gap-2 bg-[#FF415B] hover:bg-[#e03550] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={16} /> Add
        </button>
      </div>

      {/* Stats */}
      {matches.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[["Matches",stats.total],["Cities",stats.cities],["Countries",stats.countries]].map(([l,v]) => (
            <div key={l} className="bg-gray-900 border border-gray-800 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-[#FF415B]">{v}</div>
              <div className="text-xs text-gray-500 mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">{[...Array(3)].map((_,i) => <div key={i} className="bg-gray-900 rounded-2xl h-28 animate-pulse border border-gray-800" />)}</div>
      ) : matches.length === 0 ? (
        <div className="text-center py-20">
          <Calendar size={40} className="mx-auto mb-3 text-gray-700" />
          <p className="text-gray-500">No matches booked yet. Tap + Add to get started.</p>
        </div>
      ) : (
        Object.entries(grouped).map(([city, cityMatches]) => (
          <div key={city} className="mb-8">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">{city}</h2>
            <div className="space-y-3">
              {cityMatches.map(m => {
                const dt = (() => { try { return format(new Date(m.date), "EEE, MMM d yyyy · h:mm a"); } catch { return m.date; } })();
                return (
                  <div key={m.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-bold text-white">{m.team1} vs {m.team2}</p>
                        <span className="text-xs text-[#FF415B] bg-[#FF415B]/10 px-2 py-0.5 rounded-full mt-1 inline-block">{m.stage}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setModal(m)} className="text-gray-500 hover:text-white text-xs px-2 py-1 bg-gray-800 rounded-lg transition-colors">Edit</button>
                        <button onClick={() => del.mutate(m.id)} className="text-[#FF415B] hover:bg-[#FF415B]/10 p-1.5 rounded-lg transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm text-gray-400">
                      <div className="flex items-center gap-2"><Calendar size={13} /> {dt}</div>
                      <div className="flex items-center gap-2"><MapPin size={13} /> {m.venue}</div>
                    </div>
                    {m.notes && <p className="text-xs text-gray-500 italic mt-2">{m.notes}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}

      {modal && <Modal match={modal === "new" ? null : modal} onClose={() => setModal(null)} />}
    </div>
  );
}
