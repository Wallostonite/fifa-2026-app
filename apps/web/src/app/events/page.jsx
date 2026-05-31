import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CalendarCheck, MapPin, Clock, Plus, X, Users, Search } from "lucide-react";
import { format } from "date-fns";

const EVENT_TYPES = ["Pre-Match Meetup","Post-Match Celebration","Watch Party","City Tour","Other"];
const BLANK = { title:"", description:"", team:"", city:"", venue_name:"", address:"", date_time:"", organizer_name:"", type:"Pre-Match Meetup" };

function Modal({ onClose, onCreate }) {
  const [form, setForm] = useState(BLANK);
  const set = k => v => setForm(f => ({ ...f, [k]: v }));
  const qc = useQueryClient();

  const create = useMutation({
    mutationFn: d => fetch("/api/events", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(d) }).then(r => r.json()),
    onSuccess: () => { qc.invalidateQueries({queryKey:["events"]}); onClose(); },
  });

  const submit = e => {
    e.preventDefault();
    if (!form.title || !form.city || !form.venue_name || !form.date_time) return;
    create.mutate(form);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-800 sticky top-0 bg-gray-900">
          <h2 className="font-bold text-white text-lg">Create Event</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={20} /></button>
        </div>
        <form onSubmit={submit} className="p-5 space-y-4">
          {[["Title *","title","Pre-match meetup at the plaza"],["City *","city","Mexico City"],["Venue / Meeting point *","venue_name","Zócalo main entrance"],["Date & Time *","date_time","2026-06-11 17:00"],["Team (optional)","team","Brazil"],["Address (optional)","address","Full address"],["Organiser name (optional)","organizer_name","Your name"]].map(([label,key,ph]) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-gray-400 mb-1">{label}</label>
              <input value={form[key]} onChange={e => set(key)(e.target.value)} placeholder={ph}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:border-gray-500 transition-colors" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Description (optional)</label>
            <textarea value={form.description} onChange={e => set("description")(e.target.value)} rows={3}
              placeholder="What's happening at this event?"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:border-gray-500 resize-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Event Type</label>
            <div className="flex flex-wrap gap-2">
              {EVENT_TYPES.map(t => (
                <button type="button" key={t} onClick={() => set("type")(t)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors
                    ${form.type===t ? "bg-[#FF415B] text-white" : "bg-gray-800 text-gray-400 hover:text-white"}`}>{t}</button>
              ))}
            </div>
          </div>
          <button type="submit" disabled={create.isPending}
            className="w-full bg-[#FF415B] hover:bg-[#e03550] text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50">
            {create.isPending ? "Creating…" : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Events() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const qc = useQueryClient();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events", search],
    queryFn: () => fetch(`/api/events${search ? `?search=${encodeURIComponent(search)}` : ""}`).then(r => r.json()).catch(() => []),
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Fan Events</h1>
          <p className="text-gray-500 text-sm mt-1">Meetups, watch parties & city tours</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#FF415B] hover:bg-[#e03550] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={16} /> Create
        </button>
      </div>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events…"
          className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-gray-600 transition-colors" />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_,i) => <div key={i} className="bg-gray-900 rounded-2xl h-40 animate-pulse border border-gray-800" />)}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-20">
          <CalendarCheck size={40} className="mx-auto mb-3 text-gray-700" />
          <p className="text-gray-500">No events yet. Be the first to create one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map(e => {
            const dt = (() => { try { return format(new Date(e.date_time), "EEE, MMM d · h:mm a"); } catch { return e.date_time; } })();
            return (
              <div key={e.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-white">{e.title}</p>
                    {e.team && <span className="text-xs text-[#FF415B] bg-[#FF415B]/10 px-2 py-0.5 rounded-full mt-1 inline-block">{e.team}</span>}
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-lg shrink-0 ml-2">{e.type}</span>
                </div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex items-center gap-2 text-[#FF415B]">
                    <Clock size={13} /> <span className="font-medium">{dt}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin size={13} /> <span className="truncate">{e.venue_name}{e.city ? `, ${e.city}` : ""}</span>
                  </div>
                </div>
                {e.description && <p className="text-xs text-gray-500 mt-3 line-clamp-2">{e.description}</p>}
                {e.organizer_name && (
                  <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-800">
                    <Users size={12} className="text-gray-600" />
                    <span className="text-xs text-gray-500">by {e.organizer_name}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
}
