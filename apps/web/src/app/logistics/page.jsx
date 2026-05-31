import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, Languages, FileText, ChevronDown, ChevronUp } from "lucide-react";

const RATES = { USD: 1, CAD: 1.37, MXN: 17.15 };
const CURRENCIES = [
  { code:"USD", name:"US Dollar",        symbol:"$",   flag:"🇺🇸" },
  { code:"CAD", name:"Canadian Dollar",  symbol:"C$",  flag:"🇨🇦" },
  { code:"MXN", name:"Mexican Peso",     symbol:"MX$", flag:"🇲🇽" },
];
const VISA_INFO = {
  USA: [
    { h:"Visa Requirements",    b:"Many nationalities enter under the Visa Waiver Program (ESTA). Apply at esta.cbp.dhs.gov before travelling. Those outside the VWP must apply for a B-2 tourist visa at a US Embassy." },
    { h:"Required Documents",   b:"Valid passport (6+ months), confirmed match tickets, proof of accommodation, return flight, and sufficient funds." },
    { h:"Customs & Entry",      b:"Complete customs declaration forms on arrival. Declare amounts over $10,000 USD. Prohibited: fresh produce, raw meat, certain medications." },
    { h:"Emergency Contacts",   b:"Emergency: 911 · US CBP: 1-877-227-5511" },
  ],
  Canada: [
    { h:"Visa Requirements",    b:"Many nationalities require an eTA (Electronic Travel Authorization). Apply at canada.ca/eta before travel. Others require a visitor visa from a Canadian embassy." },
    { h:"Required Documents",   b:"Valid passport, eTA confirmation, match tickets, hotel booking, return flight. Travel insurance is recommended." },
    { h:"Customs & Entry",      b:"Declare all food, plants and amounts over CAD $10,000. CBSA officers conduct checks at entry points." },
    { h:"Emergency Contacts",   b:"Emergency: 911 · CBSA: 1-800-461-9999 · Health info: 811" },
  ],
  Mexico: [
    { h:"Visa Requirements",    b:"Citizens of USA, Canada, EU, UK and many others can visit visa-free for up to 180 days. You'll receive an FMM tourist card at immigration — keep it for your entire stay." },
    { h:"Required Documents",   b:"Valid passport, FMM tourist card (do not lose it!), match tickets, accommodation proof, and return travel documents." },
    { h:"Customs & Entry",      b:"Declare amounts over $10,000 USD. Mexico uses a traffic light customs system — green = pass, red = inspection. Prohibited: fresh citrus, meat, certain medications." },
    { h:"Emergency Contacts",   b:"Emergency: 911 · Tourist assistance (SECTUR): 01800-006-8839 · Tourist police: 078" },
  ],
};

const TABS = [
  { key:"currency", label:"Currency", icon:DollarSign },
  { key:"phrases",  label:"Phrases",  icon:Languages },
  { key:"visa",     label:"Visa Info", icon:FileText },
];

function AccordionItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      <button className="w-full flex items-center justify-between p-4 text-left" onClick={() => setOpen(v => !v)}>
        <span className="font-semibold text-white text-sm">{item.h}</span>
        {open ? <ChevronUp size={16} className="text-gray-500 shrink-0" /> : <ChevronDown size={16} className="text-gray-500 shrink-0" />}
      </button>
      {open && <p className="px-4 pb-4 text-sm text-gray-400 leading-relaxed border-t border-gray-800 pt-3">{item.b}</p>}
    </div>
  );
}

export default function Logistics() {
  const [tab,     setTab]     = useState("currency");
  const [amount,  setAmount]  = useState("100");
  const [visaCtry, setVisaCtry] = useState("USA");
  const [phraseCategory, setPhraseCategory] = useState(null);

  const { data: phrasesData } = useQuery({
    queryKey: ["phrases", phraseCategory],
    queryFn: () => fetch(`/api/phrases${phraseCategory ? `?category=${phraseCategory}` : ""}`).then(r => r.json()),
    enabled: tab === "phrases",
  });

  const convert = rate => {
    const n = parseFloat(amount);
    return isNaN(n) ? "—" : (n * rate).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-white mb-1">Logistics</h1>
      <p className="text-gray-500 text-sm mb-6">Everything you need to navigate the tournament countries</p>

      {/* Tab bar */}
      <div className="flex gap-2 mb-8">
        {TABS.map(({ key, label, icon:Icon }) => (
          <button key={key} onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors border flex-1 justify-center
              ${tab===key ? "bg-[#FF415B] border-[#FF415B] text-white" : "bg-gray-900 border-gray-800 text-gray-400 hover:text-white"}`}>
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {/* Currency */}
      {tab === "currency" && (
        <div>
          <p className="text-gray-400 text-sm mb-6">Quick currency reference. Enter a USD amount to convert.</p>
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-400 mb-2">Amount in USD ($)</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-2xl font-bold text-white focus:border-[#FF415B] transition-colors" />
          </div>
          <div className="space-y-3">
            {CURRENCIES.map(c => (
              <div key={c.code} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
                <span className="text-3xl">{c.flag}</span>
                <div className="flex-1">
                  <p className="font-semibold text-white">{c.name}</p>
                  <p className="text-xs text-gray-500">1 USD = {RATES[c.code]} {c.code}</p>
                </div>
                <p className="text-2xl font-bold text-white tabular-nums">{c.symbol}{convert(RATES[c.code])}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">Rates are approximate. Check your bank for exact rates.</p>
        </div>
      )}

      {/* Phrases */}
      {tab === "phrases" && (
        <div>
          <p className="text-gray-400 text-sm mb-4">Essential phrases in English, Spanish (🇲🇽🇺🇸) and French (🇨🇦).</p>
          <div className="flex flex-wrap gap-2 mb-6">
            <button onClick={() => setPhraseCategory(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors
                ${!phraseCategory ? "bg-[#FF415B] text-white" : "bg-gray-900 border border-gray-800 text-gray-400 hover:text-white"}`}>All</button>
            {(phrasesData?.categories || []).map(cat => (
              <button key={cat} onClick={() => setPhraseCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors
                  ${phraseCategory===cat ? "bg-[#FF415B] text-white" : "bg-gray-900 border border-gray-800 text-gray-400 hover:text-white"}`}>{cat}</button>
            ))}
          </div>
          <div className="space-y-3">
            {(phrasesData?.phrases || []).map(p => (
              <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">{p.category}</span>
                </div>
                <p className="font-bold text-white mb-3">{p.english}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">🇲🇽 Spanish</p>
                    <p className="text-sm text-gray-300">{p.spanish}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">🇨🇦 French</p>
                    <p className="text-sm text-gray-300">{p.french}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visa */}
      {tab === "visa" && (
        <div>
          <p className="text-gray-400 text-sm mb-6">Entry requirements for each host country. Always verify with official government sources before travel.</p>
          <div className="flex gap-2 mb-6">
            {["USA","Canada","Mexico"].map(c => (
              <button key={c} onClick={() => setVisaCtry(c)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors border
                  ${visaCtry===c ? "bg-[#FF415B] border-[#FF415B] text-white" : "bg-gray-900 border-gray-800 text-gray-400 hover:text-white"}`}>{c}</button>
            ))}
          </div>
          <div className="space-y-3">
            {VISA_INFO[visaCtry].map((item, i) => <AccordionItem key={i} item={item} />)}
          </div>
        </div>
      )}
    </div>
  );
}
