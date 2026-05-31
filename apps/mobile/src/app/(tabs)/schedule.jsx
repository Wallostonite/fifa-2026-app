import { apiFetch } from '@/utils/api';
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Radio, Search, Clock, CheckCircle2, Calendar, ArrowLeft } from "lucide-react-native";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { InstrumentSans_400Regular } from "@expo-google-fonts/instrument-sans";
import { RobotoCondensed_500Medium } from "@expo-google-fonts/roboto-condensed";
import { useTheme } from "@/hooks/useTheme";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EmptyState from "@/components/EmptyState";

const STATUS_FILTERS = [
  { key: "all",      label: "All" },
  { key: "live",     label: "Live" },
  { key: "upcoming", label: "Upcoming" },
  { key: "finished", label: "Results" },
];

const LIVE_STATUSES = new Set(["first-half", "second-half", "half-time"]);

export default function ScheduleScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors, colorScheme } = useTheme();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const pulse = useRef(new Animated.Value(1)).current;

  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_500Medium,
    InstrumentSans_400Regular,
    RobotoCondensed_500Medium,
  });

  // Pulse animation for live indicator
  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 0.2, duration: 800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, []);

  // Pre-fill team filter from user profile
  useEffect(() => {
    AsyncStorage.getItem("userId").then(async (userId) => {
      if (!userId) return;
      try {
        const res = await apiFetch(`/api/user-profile?userId=${userId}`);
        if (res.ok) {
          const profile = await res.json();
          if (profile?.team) setTeamFilter(profile.team);
        }
      } catch {}
    });
  }, []);

  const buildUrl = () => {
    const params = new URLSearchParams();
    if (filter === "live") params.set("status", "live");
    else if (filter === "upcoming") params.set("status", "upcoming");
    else if (filter === "finished") params.set("status", "finished");
    if (teamFilter) params.set("team", teamFilter);
    return `/api/live-scores?${params}`;
  };

  const { data: matches = [], refetch } = useQuery({
    queryKey: ["schedule", filter, teamFilter],
    queryFn: async () => {
      const res = await apiFetch(buildUrl());
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    refetchInterval: 30000,
  });

  const liveCount = matches.filter(m => LIVE_STATUSES.has(m.status)).length;

  const filtered = search
    ? matches.filter(m =>
        m.team1.toLowerCase().includes(search.toLowerCase()) ||
        m.team2.toLowerCase().includes(search.toLowerCase()) ||
        m.tournament?.toLowerCase().includes(search.toLowerCase())
      )
    : matches;

  // Group by date
  const grouped = filtered.reduce((acc, m) => {
    const d = m.match_date.slice(0, 10);
    if (!acc[d]) acc[d] = [];
    acc[d].push(m);
    return acc;
  }, {});

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const statusLabel = (m) => {
    if (m.status === "first-half")  return `${m.match_minute ?? 0}'`;
    if (m.status === "second-half") return `${m.match_minute ?? 45}'`;
    if (m.status === "half-time")   return "HT";
    if (m.status === "finished")    return "FT";
    if (m.status === "pre-match")   return "Soon";
    try { return format(new Date(m.match_date), "h:mm a"); } catch { return ""; }
  };

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 20,
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 36, height: 36, borderRadius: 18,
            backgroundColor: colors.cardBackground,
            borderWidth: 1, borderColor: colors.cardBorder,
            justifyContent: "center", alignItems: "center", marginRight: 12,
          }}
          activeOpacity={0.7}
        >
          <ArrowLeft size={18} color={colors.text} />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontFamily: "Poppins_600SemiBold", color: colors.text }}>
            Scores & Fixtures
          </Text>
          <Text style={{ fontSize: 11, fontFamily: "InstrumentSans_400Regular", color: colors.textMuted }}>
            All 104 matches · auto-refreshes every 30s
          </Text>
        </View>

        {liveCount > 0 && (
          <Animated.View
            style={{
              opacity: pulse,
              flexDirection: "row", alignItems: "center",
              backgroundColor: colors.accent + "20",
              borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4,
              borderWidth: 1, borderColor: colors.accent + "40",
            }}
          >
            <Radio size={11} color={colors.accent} />
            <Text style={{ fontSize: 11, fontFamily: "Poppins_600SemiBold", color: colors.accent, marginLeft: 4 }}>
              {liveCount} LIVE
            </Text>
          </Animated.View>
        )}
      </View>

      {/* Search + team filter */}
      <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 }}>
        <View style={{
          flexDirection: "row", alignItems: "center",
          backgroundColor: colors.cardBackground,
          borderRadius: 12, paddingHorizontal: 12, paddingVertical: 9,
          borderWidth: 1, borderColor: colors.cardBorder, marginBottom: 8,
        }}>
          <Search size={15} color={colors.textMuted} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search team or stage…"
            placeholderTextColor={colors.placeholder}
            style={{ flex: 1, marginLeft: 8, fontSize: 14, color: colors.text, fontFamily: "InstrumentSans_400Regular" }}
          />
        </View>

        {/* Team quick-filter */}
        <View style={{
          flexDirection: "row", alignItems: "center",
          backgroundColor: colors.cardBackground,
          borderRadius: 12, paddingHorizontal: 12, paddingVertical: 9,
          borderWidth: 1, borderColor: teamFilter ? colors.accent + "40" : colors.cardBorder,
        }}>
          <Text style={{ fontSize: 12, fontFamily: "Poppins_500Medium", color: colors.textMuted, marginRight: 6 }}>
            Team:
          </Text>
          <TextInput
            value={teamFilter}
            onChangeText={setTeamFilter}
            placeholder="Filter by team (e.g. Brazil)"
            placeholderTextColor={colors.placeholder}
            style={{ flex: 1, fontSize: 14, color: teamFilter ? colors.accent : colors.text, fontFamily: "Poppins_500Medium" }}
          />
          {teamFilter ? (
            <TouchableOpacity onPress={() => setTeamFilter("")} activeOpacity={0.7}>
              <Text style={{ fontSize: 12, color: colors.textMuted }}>✕</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Status filter tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 8, paddingVertical: 8 }}
      >
        {STATUS_FILTERS.map(f => (
          <TouchableOpacity
            key={f.key}
            onPress={() => setFilter(f.key)}
            style={{
              paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20,
              backgroundColor: filter === f.key ? colors.accent : colors.cardBackground,
              borderWidth: 1, borderColor: filter === f.key ? colors.accent : colors.cardBorder,
            }}
          >
            <Text style={{
              fontSize: 13, fontFamily: "Poppins_500Medium",
              color: filter === f.key ? "white" : colors.textSecondary,
            }}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Match list */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent} />}
      >
        {Object.keys(grouped).length === 0 ? (
          <View style={{ padding: 40 }}>
            <EmptyState icon={Calendar} title="No matches found" subtitle="Try adjusting your filters" />
          </View>
        ) : (
          Object.entries(grouped).map(([date, dayMatches]) => {
            const dateLabel = (() => {
              try { return format(new Date(date + "T12:00:00Z"), "EEE, MMM d, yyyy"); } catch { return date; }
            })();
            return (
              <View key={date} style={{ marginBottom: 8 }}>
                <Text style={{
                  fontSize: 11, fontFamily: "Poppins_600SemiBold",
                  color: colors.textMuted, textTransform: "uppercase", letterSpacing: 0.8,
                  paddingHorizontal: 20, paddingVertical: 8,
                }}>
                  {dateLabel}
                </Text>
                {dayMatches.map(m => {
                  const isLive     = LIVE_STATUSES.has(m.status);
                  const isFinished = m.status === "finished";
                  const isUpcoming = m.status === "upcoming" || m.status === "pre-match";
                  return (
                    <View
                      key={m.id}
                      style={{
                        marginHorizontal: 20, marginBottom: 8,
                        backgroundColor: colors.cardBackground,
                        borderRadius: 16, padding: 14,
                        borderWidth: isLive ? 1.5 : 1,
                        borderColor: isLive ? colors.accent + "60" : colors.cardBorder,
                      }}
                    >
                      {/* Tournament + status */}
                      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                        <Text style={{ flex: 1, fontSize: 10, fontFamily: "Poppins_600SemiBold", color: colors.textMuted, textTransform: "uppercase", letterSpacing: 0.5 }}>
                          {m.tournament}
                        </Text>
                        {isLive ? (
                          <Animated.View style={{ opacity: pulse, flexDirection: "row", alignItems: "center", backgroundColor: colors.accent + "20", borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 }}>
                            <Radio size={10} color={colors.accent} />
                            <Text style={{ fontSize: 10, fontFamily: "Poppins_600SemiBold", color: colors.accent, marginLeft: 3 }}>
                              {statusLabel(m)}
                            </Text>
                          </Animated.View>
                        ) : isFinished ? (
                          <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <CheckCircle2 size={11} color={colors.textMuted} />
                            <Text style={{ fontSize: 10, fontFamily: "Poppins_500Medium", color: colors.textMuted, marginLeft: 3 }}>FT</Text>
                          </View>
                        ) : (
                          <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Clock size={11} color={colors.textMuted} />
                            <Text style={{ fontSize: 10, fontFamily: "Poppins_500Medium", color: colors.textMuted, marginLeft: 3 }}>
                              {statusLabel(m)}
                            </Text>
                          </View>
                        )}
                      </View>

                      {/* Teams + score */}
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                          <Text style={{ fontSize: 20, marginRight: 8 }}>{m.team1_flag}</Text>
                          <Text style={{ fontSize: 14, fontFamily: "RobotoCondensed_500Medium", color: colors.text, flex: 1 }} numberOfLines={1}>
                            {m.team1}
                          </Text>
                        </View>
                        <View style={{
                          minWidth: 68, alignItems: "center",
                          paddingHorizontal: 8, paddingVertical: 4,
                          backgroundColor: isLive ? colors.accent + "15" : colors.borderLight,
                          borderRadius: 8, marginHorizontal: 6,
                        }}>
                          {isUpcoming ? (
                            <Text style={{ fontSize: 12, fontFamily: "Poppins_600SemiBold", color: colors.textMuted }}>vs</Text>
                          ) : (
                            <Text style={{ fontSize: 17, fontFamily: "Poppins_600SemiBold", color: isLive ? colors.accent : colors.text, letterSpacing: 1 }}>
                              {m.team1_score ?? 0}–{m.team2_score ?? 0}
                            </Text>
                          )}
                        </View>
                        <View style={{ flex: 1, flexDirection: "row-reverse", alignItems: "center" }}>
                          <Text style={{ fontSize: 20, marginLeft: 8 }}>{m.team2_flag}</Text>
                          <Text style={{ fontSize: 14, fontFamily: "RobotoCondensed_500Medium", color: colors.text, flex: 1, textAlign: "right" }} numberOfLines={1}>
                            {m.team2}
                          </Text>
                        </View>
                      </View>

                      {/* Venue */}
                      <Text style={{ fontSize: 10, fontFamily: "InstrumentSans_400Regular", color: colors.textMuted, textAlign: "center", marginTop: 8 }}>
                        {m.venue} · {m.location}
                      </Text>
                    </View>
                  );
                })}
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}
