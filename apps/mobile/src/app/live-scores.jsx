import { apiFetch } from '@/utils/api';
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Radio,
  Clock,
  Calendar,
  CheckCircle2,
} from "lucide-react-native";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { InstrumentSans_400Regular } from "@expo-google-fonts/instrument-sans";
import { RobotoCondensed_500Medium } from "@expo-google-fonts/roboto-condensed";
import { useTheme } from "@/hooks/useTheme";
import { useQuery } from "@tanstack/react-query";
import { format, isToday, isTomorrow, isYesterday } from "date-fns";

const FILTER_TABS = [
  { key: "all",      label: "All" },
  { key: "live",     label: "Live" },
  { key: "today",    label: "Today" },
  { key: "upcoming", label: "Upcoming" },
  { key: "finished", label: "Results" },
];

const STATUS_LIVE = new Set(["first-half", "second-half", "half-time"]);

export default function LiveScoresScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors, colorScheme } = useTheme();
  const [activeFilter, setActiveFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const pulse = useRef(new Animated.Value(1)).current;

  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_500Medium,
    InstrumentSans_400Regular,
    RobotoCondensed_500Medium,
  });

  // Pulsing animation for live indicator
  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 0.3, duration: 800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, []);

  const buildUrl = () => {
    if (activeFilter === "today") {
      const today = format(new Date(), "yyyy-MM-dd");
      return `/api/live-scores?date=${today}`;
    }
    if (activeFilter === "live") return "/api/live-scores?status=live";
    if (activeFilter === "upcoming") return "/api/live-scores?status=upcoming";
    if (activeFilter === "finished") return "/api/live-scores?status=finished";
    return "/api/live-scores";
  };

  const { data: matches = [], refetch } = useQuery({
    queryKey: ["liveScores", activeFilter],
    queryFn: async () => {
      const res = await apiFetch(buildUrl());
      if (!res.ok) throw new Error("Failed to fetch scores");
      return res.json();
    },
    // Auto-refresh every 30s
    refetchInterval: 30000,
    refetchIntervalInBackground: false,
  });

  const liveCount = matches.filter((m) => STATUS_LIVE.has(m.status)).length;

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Group matches by date
  const grouped = matches.reduce((acc, m) => {
    const d = m.match_date.slice(0, 10);
    if (!acc[d]) acc[d] = [];
    acc[d].push(m);
    return acc;
  }, {});

  const formatDayLabel = (dateStr) => {
    const d = new Date(dateStr + "T12:00:00Z");
    if (isToday(d))     return "Today";
    if (isTomorrow(d))  return "Tomorrow";
    if (isYesterday(d)) return "Yesterday";
    return format(d, "EEE, MMM d");
  };

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 12,
          paddingBottom: 12,
          paddingHorizontal: 20,
          backgroundColor: colors.background,
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
          <Text style={{ fontSize: 12, fontFamily: "InstrumentSans_400Regular", color: colors.textMuted }}>
            Auto-refreshes every 30s
          </Text>
        </View>

        {liveCount > 0 && (
          <Animated.View
            style={{
              opacity: pulse,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#FF415B20",
              borderRadius: 12,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderWidth: 1,
              borderColor: "#FF415B50",
            }}
          >
            <Radio size={12} color={colors.accent} />
            <Text style={{ fontSize: 12, fontFamily: "Poppins_600SemiBold", color: colors.accent, marginLeft: 4 }}>
              {liveCount} LIVE
            </Text>
          </Animated.View>
        )}
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10, gap: 8 }}
      >
        {FILTER_TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setActiveFilter(tab.key)}
            style={{
              paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20,
              backgroundColor: activeFilter === tab.key ? colors.accent : colors.cardBackground,
              borderWidth: 1,
              borderColor: activeFilter === tab.key ? colors.accent : colors.cardBorder,
            }}
          >
            <Text style={{
              fontSize: 13, fontFamily: "Poppins_500Medium",
              color: activeFilter === tab.key ? "white" : colors.textSecondary,
            }}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent} />
        }
      >
        {Object.keys(grouped).length === 0 ? (
          <View style={{ padding: 40, alignItems: "center" }}>
            <Text style={{ fontSize: 15, fontFamily: "InstrumentSans_400Regular", color: colors.textMuted, textAlign: "center" }}>
              No matches found for this filter.
            </Text>
          </View>
        ) : (
          Object.entries(grouped).map(([date, dayMatches]) => (
            <View key={date} style={{ marginBottom: 8 }}>
              {/* Day header */}
              <View style={{
                paddingHorizontal: 20, paddingVertical: 8,
                flexDirection: "row", alignItems: "center",
              }}>
                <Calendar size={13} color={colors.textMuted} />
                <Text style={{
                  fontSize: 12, fontFamily: "Poppins_600SemiBold",
                  color: colors.textMuted, textTransform: "uppercase",
                  letterSpacing: 0.8, marginLeft: 6,
                }}>
                  {formatDayLabel(date)}
                </Text>
              </View>

              {dayMatches.map((match) => (
                <MatchRow key={match.id} match={match} colors={colors} pulse={pulse} />
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

function MatchRow({ match, colors, pulse }) {
  const isLive    = STATUS_LIVE.has(match.status);
  const isPreMatch = match.status === "pre-match";
  const isFinished = match.status === "finished";
  const isUpcoming = match.status === "upcoming";

  const kickoffLocal = () => {
    try {
      return format(new Date(match.match_date), "h:mm a");
    } catch { return ""; }
  };

  const statusLabel = () => {
    if (match.status === "first-half")  return `${match.match_minute ?? 0}'`;
    if (match.status === "half-time")   return "HT";
    if (match.status === "second-half") return `${match.match_minute ?? 45}'`;
    if (isPreMatch)  return "Soon";
    if (isFinished)  return "FT";
    return kickoffLocal();
  };

  const accentColor = isLive ? colors.accent : isFinished ? colors.textMuted : colors.text;

  return (
    <View
      style={{
        marginHorizontal: 20,
        marginBottom: 8,
        backgroundColor: colors.cardBackground,
        borderRadius: 14,
        padding: 14,
        borderWidth: isLive ? 1.5 : 1,
        borderColor: isLive ? colors.accent + "60" : colors.cardBorder,
      }}
    >
      {/* Tournament + Status row */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <Text style={{
          flex: 1, fontSize: 11, fontFamily: "Poppins_500Medium",
          color: colors.textMuted, textTransform: "uppercase", letterSpacing: 0.5,
        }}>
          {match.tournament}
        </Text>

        {isLive ? (
          <Animated.View
            style={{
              opacity: pulse,
              flexDirection: "row", alignItems: "center",
              backgroundColor: colors.accent + "20",
              borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2,
            }}
          >
            <Radio size={10} color={colors.accent} />
            <Text style={{ fontSize: 11, fontFamily: "Poppins_600SemiBold", color: colors.accent, marginLeft: 3 }}>
              {statusLabel()}
            </Text>
          </Animated.View>
        ) : isFinished ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CheckCircle2 size={11} color={colors.textMuted} />
            <Text style={{ fontSize: 11, fontFamily: "Poppins_500Medium", color: colors.textMuted, marginLeft: 3 }}>
              FT
            </Text>
          </View>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Clock size={11} color={colors.textMuted} />
            <Text style={{ fontSize: 11, fontFamily: "Poppins_500Medium", color: colors.textMuted, marginLeft: 3 }}>
              {statusLabel()}
            </Text>
          </View>
        )}
      </View>

      {/* Teams + Score */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* Team 1 */}
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 22, marginRight: 8 }}>{match.team1_flag}</Text>
          <Text
            style={{
              fontSize: 15, fontFamily: "RobotoCondensed_500Medium",
              color: colors.text, flex: 1,
            }}
            numberOfLines={1}
          >
            {match.team1}
          </Text>
        </View>

        {/* Score or time */}
        <View style={{
          minWidth: 72, alignItems: "center",
          paddingHorizontal: 10, paddingVertical: 4,
          backgroundColor: isLive ? colors.accent + "15" : colors.borderLight,
          borderRadius: 10,
          marginHorizontal: 8,
        }}>
          {isUpcoming || isPreMatch ? (
            <Text style={{ fontSize: 13, fontFamily: "Poppins_600SemiBold", color: colors.textMuted }}>
              vs
            </Text>
          ) : (
            <Text style={{
              fontSize: 20, fontFamily: "Poppins_600SemiBold",
              color: isLive ? colors.accent : isFinished ? colors.text : colors.textMuted,
              letterSpacing: 2,
            }}>
              {match.team1_score ?? 0} – {match.team2_score ?? 0}
            </Text>
          )}
        </View>

        {/* Team 2 */}
        <View style={{ flex: 1, flexDirection: "row-reverse", alignItems: "center" }}>
          <Text style={{ fontSize: 22, marginLeft: 8 }}>{match.team2_flag}</Text>
          <Text
            style={{
              fontSize: 15, fontFamily: "RobotoCondensed_500Medium",
              color: colors.text, flex: 1, textAlign: "right",
            }}
            numberOfLines={1}
          >
            {match.team2}
          </Text>
        </View>
      </View>

      {/* Venue */}
      <Text style={{
        fontSize: 11, fontFamily: "InstrumentSans_400Regular",
        color: colors.textMuted, textAlign: "center", marginTop: 8,
      }}>
        {match.venue} · {match.location}
      </Text>
    </View>
  );
}
