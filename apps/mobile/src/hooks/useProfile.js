/**
 * Unified profile hook — reads from AsyncStorage first (instant),
 * syncs with the DB in the background.
 *
 * Storing prefs locally means the app works immediately even if
 * the server is slow or the device is offline.
 */
import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiFetch } from "@/utils/api";

const PROFILE_KEY = "fanpass_profile";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      // 1. Read from local storage immediately (no network needed)
      const cached = await AsyncStorage.getItem(PROFILE_KEY);
      if (cached) {
        setProfile(JSON.parse(cached));
        setLoading(false);
      }

      // 2. Sync from DB in the background
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        const res = await apiFetch(`/api/user-profile?userId=${userId}`);
        if (res.ok) {
          const data = await res.json();
          if (data && !data.error) {
            await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(data));
            setProfile(data);
          }
        }
      }
    } catch {
      // local cache is sufficient — swallow network errors
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { profile, loading, reload: load };
}

/**
 * Save profile both locally and to the DB.
 * Called from the onboarding/preferences screen.
 */
export async function saveProfile({
  country, countryFlag, team, language, notificationsEnabled,
}) {
  // Generate or reuse userId
  let userId = await AsyncStorage.getItem("userId");
  const isNew = !userId;
  if (isNew) {
    userId = `user_${Date.now()}`;
    await AsyncStorage.setItem("userId", userId);
    await AsyncStorage.setItem("hasCompletedOnboarding", "true");
  }

  const profileData = {
    user_id: userId,
    country,
    country_flag: countryFlag,
    team,
    language: language || "en",
    notifications_enabled: notificationsEnabled ?? true,
  };

  // Save locally immediately — this is what the UI reads
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profileData));

  // Sync to DB (best-effort)
  try {
    const body = { userId, country, countryFlag, team, language, notificationsEnabled };
    const method = isNew ? "POST" : "PUT";
    const res = await apiFetch("/api/user-profile", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const saved = await res.json();
      // Update local copy with DB-assigned id
      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify({ ...profileData, ...saved }));
    }
  } catch {
    // DB sync failed — local save is enough for the app to work
  }

  return profileData;
}
