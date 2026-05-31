import { useState } from "react";
import { Search, Check, User, Globe, Trophy, Languages } from "lucide-react";
import { usePreferences } from "@/hooks/usePreferences";

const COUNTRIES = [
  { name: "Germany",      flag: "🇩🇪" }, { name: "Brazil",       flag: "🇧🇷" },
  { name: "England",      flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }, { name: "Spain",         flag: "🇪🇸" },
  { name: "France",       flag: "🇫🇷" }, { name: "Italy",         flag: "🇮🇹" },
  { name: "Argentina",    flag: "🇦🇷" }, { name: "Portugal",      flag: "🇵🇹" },
  { name: "Netherlands",  flag: "🇳🇱" }, { name: "Belgium",       flag: "🇧🇪" },
  { name: "Japan",        flag: "🇯🇵" }, { name: "South Korea",   flag: "🇰🇷" },
  { name: "United States",flag: "🇺🇸" }, { name: "Mexico",        flag: "🇲🇽" },
  { name: "Croatia",      flag: "🇭🇷" }, { name: "Uruguay",       flag: "🇺🇾" },
  { name: "Morocco",      flag: "🇲🇦" }, { name: "Senegal",       flag: "🇸🇳" },
  { name: "Australia",    flag: "🇦🇺" }, { name: "Canada",        flag: "🇨🇦" },
  { name: "Ecuador",      flag: "🇪🇨" }, { name: "USA",           flag: "🇺🇸" },
  { name: "Switzerland",  flag: "🇨🇭" }, { name: "Norway",        flag: "🇳🇴" },
  { name: "Austria",      flag: "🇦🇹" }, { name: "Colombia",      flag: "🇨🇴" },
  { name: "Tunisia",      flag: "🇹🇳" }, { name: "Ghana",         flag: "🇬🇭" },
  { name: "Sweden",       flag: "🇸🇪" }, { name: "Scotland",      flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  { name: "Algeria",      flag: "🇩🇿" }, { name: "Saudi Arabia",  flag: "🇸🇦" },
];

const TEAMS = [
  { name: "Argentina",    flag: "🇦🇷" }, { name: "Brazil",       flag: "🇧🇷" },
  { name: "France",       flag: "🇫🇷" }, { name: "England",      flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { name: "Spain",        flag: "🇪🇸" }, { name: "Germany",      flag: "🇩🇪" },
  { name: "Portugal",     flag: "🇵🇹" }, { name: "Netherlands",  flag: "🇳🇱" },
  { name: "Mexico",       flag: "🇲🇽" }, { name: "USA",          flag: "🇺🇸" },
  { name: "Canada",       flag: "🇨🇦" }, { name: "Japan",        flag: "🇯🇵" },
  { name: "Morocco",      flag: "🇲🇦" }, { name: "South Korea",  flag: "🇰🇷" },
  { name: "Belgium",      flag: "🇧🇪" }, { name: "Uruguay",      flag: "🇺🇾" },
  { name: "Croatia",      flag: "🇭🇷" }, { name: "Switzerland",  flag: "🇨🇭" },
  { name: "Colombia",     flag: "🇨🇴" }, { name: "Senegal",      flag: "🇸🇳" },
  { name: "Norway",       flag: "🇳🇴" }, { name: "Austria",      flag: "🇦🇹" },
  { name: "Australia",    flag: "🇦🇺" }, { name: "Ecuador",      flag: "🇪🇨" },
  { name: "Scotland",     flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" }, { name: "Ghana",        flag: "🇬🇭" },
  { name: "Sweden",       flag: "🇸🇪" }, { name: "Algeria",      flag: "🇩🇿" },
  { name: "Tunisia",      flag: "🇹🇳" }, { name: "Saudi Arabia", flag: "🇸🇦" },
  { name: "Italy",        flag: "🇮🇹" }, { name: "Turkey",       flag: "🇹🇷" },
];

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "pt", label: "Português" },
  { code: "de", label: "Deutsch" },
];

function SelectGrid({ items, value, onSelect, searchable = false }) {
  const [search, setSearch] = useState("");
  const filtered = search
    ? items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    : items;

  return (
    <div>
      {searchable && (
        <div className="relative mb-3">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search…"
            className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-8 pr-3 py-2 text-sm text-white placeholder-gray-600 focus:border-gray-500 transition-colors"
          />
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-72 overflow-y-auto pr-1">
        {filtered.map(item => {
          const selected = value === item.name;
          return (
            <button
              key={item.name}
              onClick={() => onSelect(item)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-left transition-colors border
                ${selected
                  ? "bg-[#FF415B]/15 border-[#FF415B]/40 text-white"
                  : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white"
                }`}
            >
              <span className="text-lg shrink-0">{item.flag}</span>
              <span className="truncate font-medium">{item.name}</span>
              {selected && <Check size={14} className="text-[#FF415B] ml-auto shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Profile() {
  const { prefs, save, clear, hasPrefs } = usePreferences();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Profile</h1>
          <p className="text-gray-500 text-sm mt-1">Set your country and favourite team to personalise FanPass</p>
        </div>
        {hasPrefs && (
          <div className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-2xl px-4 py-3">
            <span className="text-2xl">{prefs.countryFlag}</span>
            <div>
              <p className="text-sm font-bold text-white">{prefs.country}</p>
              <p className="text-xs text-gray-500">Supporting {prefs.team}</p>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {/* Country */}
        <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-[#FF415B]/10 flex items-center justify-center">
              <Globe size={18} className="text-[#FF415B]" />
            </div>
            <div>
              <h2 className="font-bold text-white">Your Country</h2>
              <p className="text-xs text-gray-500">Where are you from?</p>
            </div>
            {prefs.country && (
              <span className="ml-auto text-sm font-semibold text-[#FF415B]">
                {prefs.countryFlag} {prefs.country}
              </span>
            )}
          </div>
          <SelectGrid
            items={COUNTRIES}
            value={prefs.country}
            searchable
            onSelect={c => save({ country: c.name, countryFlag: c.flag })}
          />
        </section>

        {/* Favourite Team */}
        <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-[#FF415B]/10 flex items-center justify-center">
              <Trophy size={18} className="text-[#FF415B]" />
            </div>
            <div>
              <h2 className="font-bold text-white">Favourite Team</h2>
              <p className="text-xs text-gray-500">Which team are you supporting?</p>
            </div>
            {prefs.team && (
              <span className="ml-auto text-sm font-semibold text-[#FF415B]">
                {TEAMS.find(t => t.name === prefs.team)?.flag} {prefs.team}
              </span>
            )}
          </div>
          <SelectGrid
            items={TEAMS}
            value={prefs.team}
            searchable
            onSelect={t => save({ team: t.name })}
          />
        </section>

        {/* Language */}
        <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-[#FF415B]/10 flex items-center justify-center">
              <Languages size={18} className="text-[#FF415B]" />
            </div>
            <div>
              <h2 className="font-bold text-white">Language</h2>
              <p className="text-xs text-gray-500">Preferred display language</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => save({ language: lang.code })}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border
                  ${prefs.language === lang.code
                    ? "bg-[#FF415B] border-[#FF415B] text-white"
                    : "bg-gray-800 border-gray-700 text-gray-300 hover:text-white"
                  }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </section>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex-1 bg-[#FF415B] hover:bg-[#e03550] text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {saved ? "✓ Saved!" : "Save Preferences"}
          </button>
          {hasPrefs && (
            <button
              onClick={clear}
              className="px-5 py-3 bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white font-medium rounded-xl text-sm transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
