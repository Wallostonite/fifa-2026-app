import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageSquare, ThumbsUp, Plus, X, Search } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const TEAMS = ["All","Brazil","Argentina","France","England","Spain","Germany","Portugal","Mexico","USA","Canada","Netherlands","Italy","Morocco"];
const BLANK = { team:"", title:"", content:"", author_name:"" };

function Modal({ onClose }) {
  const [form, setForm] = useState(BLANK);
  const set = k => v => setForm(f => ({ ...f, [k]: v }));
  const qc = useQueryClient();

  const create = useMutation({
    mutationFn: d => fetch("/api/forums", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(d) }).then(r => r.json()),
    onSuccess: () => { qc.invalidateQueries({queryKey:["forums"]}); onClose(); },
  });

  const submit = e => {
    e.preventDefault();
    if (!form.team || !form.title || !form.content) return;
    create.mutate(form);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-800 sticky top-0 bg-gray-900">
          <h2 className="font-bold text-white text-lg">New Post</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={20} /></button>
        </div>
        <form onSubmit={submit} className="p-5 space-y-4">
          {[["Team *","team","e.g. Brazil"],["Post Title *","title","What do you want to discuss?"],["Your Name (optional)","author_name","Anonymous"]].map(([label,key,ph]) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-gray-400 mb-1">{label}</label>
              <input value={form[key]} onChange={e => set(key)(e.target.value)} placeholder={ph}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:border-gray-500 transition-colors" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Content *</label>
            <textarea value={form.content} onChange={e => set("content")(e.target.value)} rows={5}
              placeholder="Share your thoughts, predictions, questions…"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:border-gray-500 resize-none" />
          </div>
          <button type="submit" disabled={create.isPending}
            className="w-full bg-[#FF415B] hover:bg-[#e03550] text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50">
            {create.isPending ? "Posting…" : "Post Discussion"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Forums() {
  const [teamFilter, setTeamFilter] = useState("All");
  const [search, setSearch]   = useState("");
  const [showModal, setShowModal] = useState(false);
  const qc = useQueryClient();

  const buildUrl = () => {
    const p = new URLSearchParams();
    if (teamFilter !== "All") p.set("team", teamFilter);
    if (search) p.set("search", search);
    return `/api/forums?${p}`;
  };

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["forums", teamFilter, search],
    queryFn: () => fetch(buildUrl()).then(r => r.json()).catch(() => []),
  });

  const like = useMutation({
    mutationFn: id => fetch(`/api/forums/${id}`, { method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify({action:"like"}) }).then(r => r.json()),
    onSuccess: () => qc.invalidateQueries({queryKey:["forums"]}),
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Fan Forums</h1>
          <p className="text-gray-500 text-sm mt-1">Talk football with fans worldwide</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#FF415B] hover:bg-[#e03550] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={16} /> Post
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search discussions…"
          className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-gray-600 transition-colors" />
      </div>

      {/* Team filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {TEAMS.map(t => (
          <button key={t} onClick={() => setTeamFilter(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors
              ${teamFilter===t ? "bg-[#FF415B] text-white" : "bg-gray-900 border border-gray-800 text-gray-400 hover:text-white"}`}>{t}</button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-4">{[...Array(4)].map((_,i) => <div key={i} className="bg-gray-900 rounded-2xl h-32 animate-pulse border border-gray-800" />)}</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20">
          <MessageSquare size={40} className="mx-auto mb-3 text-gray-700" />
          <p className="text-gray-500">No posts yet. Start the conversation!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map(p => {
            const ago = (() => { try { return formatDistanceToNow(new Date(p.created_date), {addSuffix:true}); } catch { return ""; } })();
            return (
              <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-[#FF415B] bg-[#FF415B]/10 px-2.5 py-1 rounded-full">{p.team}</span>
                  <span className="text-xs text-gray-600 flex-1">{ago}</span>
                </div>
                <h3 className="font-bold text-white mb-2">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{p.content}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                  <span className="text-xs text-gray-500">{p.author_name || "Anonymous"}</span>
                  <div className="flex items-center gap-4">
                    <button onClick={() => like.mutate(p.id)}
                      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#FF415B] transition-colors">
                      <ThumbsUp size={13} /> {p.likes ?? 0}
                    </button>
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <MessageSquare size={13} /> {p.replies_count ?? 0}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
}
