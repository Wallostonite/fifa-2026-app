import { useState, useEffect } from "react";

const KEY = "fanpass_prefs";

const DEFAULTS = { country: null, countryFlag: null, team: null, language: "en" };

export function usePreferences() {
  const [prefs, setPrefs] = useState(DEFAULTS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setPrefs({ ...DEFAULTS, ...JSON.parse(stored) });
    } catch {}
    setLoaded(true);
  }, []);

  const save = (updates) => {
    const next = { ...prefs, ...updates };
    setPrefs(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  };

  const clear = () => {
    setPrefs(DEFAULTS);
    try { localStorage.removeItem(KEY); } catch {}
  };

  return { prefs, save, clear, loaded, hasPrefs: !!(prefs.country && prefs.team) };
}
