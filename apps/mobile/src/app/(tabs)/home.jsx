import { apiFetch } from '@/utils/api';
import { useProfile } from '@/hooks/useProfile';
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
  Calendar,
  MapPin,
  Shield,
  BookOpen,
  Users,
  Clock,
  Building2,
  CalendarCheck,
  MessageSquare,
  DollarSign,
  ChevronRight,
  Radio,
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import EmptyState from "@/components/EmptyState";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors, colorScheme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const pulse = useRef(new Animated.Value(1)).current;

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

  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_500Medium,
    InstrumentSans_400Regular,
    RobotoCondensed_500Medium,
  });

  // Load profile from local storage first (instant), sync from DB in background
  const { profile: userProfile, reload: refetchProfile } = useProfile();

  const { data: matches = [] } = useQuery({
    queryKey: ["matches", userProfile?.team],
    queryFn: async () => {
      const team = userProfile?.team;
      if (!team) return [];

      const response = await apiFetch(
        `/api/matches?team=${encodeURIComponent(team)}`,
      );
      if (!response.ok) throw new Error("Failed to fetch matches");
      return response.json();
    },
    enabled: !!userProfile?.team,
  });

  const { data: fanZones = [] } = useQuery({
    queryKey: ["fanZones", userProfile?.country],
    queryFn: async () => {
      const country = userProfile?.country;
      if (!country) return [];

      const response = await apiFetch(
        `/api/fan-zones?country=${encodeURIComponent(country)}`,
      );
      if (!response.ok) throw new Error("Failed to fetch fan zones");
      return response.json();
    },
    enabled: !!userProfile?.country,
  });

  const { data: safetyInfo } = useQuery({
    queryKey: ["safetyInfo", userProfile?.country],
    queryFn: async () => {
      const country = userProfile?.country;
      if (!country) return null;

      const response = await apiFetch(
        `/api/safety-info?country=${encodeURIComponent(country)}`,
      );
      if (!response.ok) return null;
      return response.json();
    },
    enabled: !!userProfile?.country,
  });

  const { data: culturalTips = [] } = useQuery({
    queryKey: ["culturalTips", userProfile?.country],
    queryFn: async () => {
      const country = userProfile?.country;
      if (!country) return [];

      const response = await apiFetch(
        `/api/cultural-tips?country=${encodeURIComponent(country)}`,
      );
      if (!response.ok) return [];
      return response.json();
    },
    enabled: !!userProfile?.country,
  });

  const { data: liveScores = [] } = useQuery({
    queryKey: ["liveScoresHome"],
    queryFn: async () => {
      const res = await apiFetch("/api/live-scores?status=live");
      if (!res.ok) return [];
      return res.json();
    },
    refetchInterval: 30000,
    refetchIntervalInBackground: false,
  });

  const { data: todayMatches = [] } = useQuery({
    queryKey: ["todayMatches"],
    queryFn: async () => {
      const today = new Date().toISOString().slice(0, 10);
      const res = await apiFetch(`/api/live-scores?date=${today}`);
      if (!res.ok) return [];
      return res.json();
    },
    refetchInterval: 60000,
  });

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetchProfile();
    setRefreshing(false);
  }, [refetchProfile]);

  const formatMatchDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return "Soon";
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  const nextMatch = matches[0];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 90,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 32,
              fontFamily: "Poppins_600SemiBold",
              color: colors.accent,
              marginBottom: 4,
            }}
          >
            FanPass
          </Text>
          {userProfile && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 24, marginRight: 8 }}>
                {userProfile.country_flag}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "InstrumentSans_400Regular",
                  color: colors.textSecondary,
                }}
              >
                {userProfile.country} · Supporting {userProfile.team}
              </Text>
            </View>
          )}
        </View>

        {/* Next Match Card */}
        {nextMatch ? (
          <TouchableOpacity
            style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 20,
              padding: 20,
              marginBottom: 24,
              borderWidth: 1,
              borderColor: colors.cardBorder,
            }}
            activeOpacity={0.8}
            onPress={() => router.push("/schedule")}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Clock size={16} color={colors.accent} />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins_500Medium",
                  color: colors.accent,
                  marginLeft: 8,
                }}
              >
                Next Match · {formatMatchDate(nextMatch.match_date)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontSize: 32, marginBottom: 4 }}>
                  {nextMatch.team1_flag}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "RobotoCondensed_500Medium",
                    color: colors.text,
                  }}
                >
                  {nextMatch.team1}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: "Poppins_600SemiBold",
                  color: colors.textMuted,
                  marginHorizontal: 16,
                }}
              >
                vs
              </Text>
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontSize: 32, marginBottom: 4 }}>
                  {nextMatch.team2_flag}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "RobotoCondensed_500Medium",
                    color: colors.text,
                  }}
                >
                  {nextMatch.team2}
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "InstrumentSans_400Regular",
                color: colors.textSecondary,
                textAlign: "center",
                marginTop: 12,
              }}
            >
              {nextMatch.venue} · {nextMatch.location}
            </Text>
          </TouchableOpacity>
        ) : (
          <EmptyState
            icon={Calendar}
            title="No upcoming matches"
            subtitle="Check back later for updates"
            style={{ marginBottom: 24 }}
          />
        )}

        {/* Live Scores Section */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 14 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 22, fontFamily: "Poppins_600SemiBold", color: colors.text }}>
                Scores & Fixtures
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/live-scores")}
              style={{ flexDirection: "row", alignItems: "center" }}
              activeOpacity={0.7}
            >
              <Text style={{ fontSize: 14, fontFamily: "Poppins_500Medium", color: colors.accent }}>
                All Matches
              </Text>
              <ChevronRight size={16} color={colors.accent} />
            </TouchableOpacity>
          </View>

          {/* Live now banner */}
          {liveScores.length > 0 && (
            <TouchableOpacity
              onPress={() => router.push("/live-scores")}
              activeOpacity={0.85}
              style={{
                backgroundColor: colors.accent,
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <Animated.View style={{ opacity: pulse }}>
                  <Radio size={14} color="white" />
                </Animated.View>
                <Text style={{ fontSize: 12, fontFamily: "Poppins_600SemiBold", color: "white", marginLeft: 6, letterSpacing: 1, textTransform: "uppercase" }}>
                  Live Now · {liveScores.length} {liveScores.length === 1 ? "Match" : "Matches"}
                </Text>
              </View>
              {liveScores.slice(0, 2).map((m) => (
                <View key={m.id} style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                  <Text style={{ fontSize: 16 }}>{m.team1_flag}</Text>
                  <Text style={{ fontSize: 14, fontFamily: "Poppins_600SemiBold", color: "white", marginHorizontal: 6 }}>
                    {m.team1_score ?? 0} – {m.team2_score ?? 0}
                  </Text>
                  <Text style={{ fontSize: 16 }}>{m.team2_flag}</Text>
                  <Text style={{ fontSize: 12, fontFamily: "InstrumentSans_400Regular", color: "rgba(255,255,255,0.8)", marginLeft: 8, flex: 1 }}>
                    {m.team1} vs {m.team2}
                  </Text>
                  <View style={{ backgroundColor: "rgba(255,255,255,0.25)", borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 }}>
                    <Text style={{ fontSize: 11, fontFamily: "Poppins_600SemiBold", color: "white" }}>
                      {m.match_minute ?? "45"}'
                    </Text>
                  </View>
                </View>
              ))}
            </TouchableOpacity>
          )}

          {/* Today's matches */}
          {todayMatches.length > 0 ? (
            todayMatches.slice(0, 3).map((m) => {
              const isLive = m.status === "first-half" || m.status === "second-half" || m.status === "half-time";
              const isFinished = m.status === "finished";
              const kickoff = (() => { try { return new Date(m.match_date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }); } catch { return ""; } })();
              return (
                <TouchableOpacity
                  key={m.id}
                  onPress={() => router.push("/live-scores")}
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderRadius: 14,
                    padding: 14,
                    marginBottom: 10,
                    borderWidth: isLive ? 1.5 : 1,
                    borderColor: isLive ? colors.accent + "60" : colors.cardBorder,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={{ fontSize: 20 }}>{m.team1_flag}</Text>
                  <Text style={{ fontSize: 14, fontFamily: "RobotoCondensed_500Medium", color: colors.text, marginLeft: 8, flex: 1 }} numberOfLines={1}>
                    {m.team1}
                  </Text>
                  <View style={{
                    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginHorizontal: 6,
                    backgroundColor: isLive ? colors.accent + "15" : colors.borderLight,
                    minWidth: 56, alignItems: "center",
                  }}>
                    {isLive || isFinished ? (
                      <Text style={{ fontSize: 15, fontFamily: "Poppins_600SemiBold", color: isLive ? colors.accent : colors.text }}>
                        {m.team1_score ?? 0}–{m.team2_score ?? 0}
                      </Text>
                    ) : (
                      <Text style={{ fontSize: 12, fontFamily: "Poppins_500Medium", color: colors.textMuted }}>
                        {kickoff}
                      </Text>
                    )}
                  </View>
                  <Text style={{ fontSize: 14, fontFamily: "RobotoCondensed_500Medium", color: colors.text, marginRight: 8, flex: 1, textAlign: "right" }} numberOfLines={1}>
                    {m.team2}
                  </Text>
                  <Text style={{ fontSize: 20 }}>{m.team2_flag}</Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <TouchableOpacity
              onPress={() => router.push("/live-scores")}
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 14,
                padding: 16,
                borderWidth: 1,
                borderColor: colors.cardBorder,
                flexDirection: "row",
                alignItems: "center",
              }}
              activeOpacity={0.8}
            >
              <Calendar size={20} color={colors.accent} />
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={{ fontSize: 15, fontFamily: "Poppins_600SemiBold", color: colors.text }}>
                  No matches today
                </Text>
                <Text style={{ fontSize: 13, fontFamily: "InstrumentSans_400Regular", color: colors.textSecondary }}>
                  Tap to see the full fixture list
                </Text>
              </View>
              <ChevronRight size={18} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Fan Zones */}
        <View style={{ marginBottom: 24 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontFamily: "Poppins_600SemiBold",
                color: colors.text,
              }}
            >
              {userProfile?.country} Fan Zones
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push("/(tabs)/map")}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins_500Medium",
                  color: colors.accent,
                }}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>
          {fanZones.length > 0 ? (
            fanZones.slice(0, 3).map((zone) => (
              <TouchableOpacity
                key={zone.id}
                style={{
                  backgroundColor: colors.cardBackground,
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: colors.cardBorder,
                }}
                activeOpacity={0.8}
                onPress={() => router.push("/(tabs)/map")}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "RobotoCondensed_500Medium",
                    color: colors.text,
                    marginBottom: 4,
                  }}
                >
                  {zone.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <MapPin size={14} color={colors.textMuted} />
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "InstrumentSans_400Regular",
                      color: colors.textSecondary,
                      marginLeft: 6,
                    }}
                  >
                    {zone.address}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Users size={14} color={colors.accent} />
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: "Poppins_500Medium",
                      color: colors.accent,
                      marginLeft: 6,
                    }}
                  >
                    {zone.attendee_count} fans going
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <EmptyState
              icon={MapPin}
              title="No fan zones yet"
              subtitle="Check back later for updates"
            />
          )}
        </View>

        {/* Quick Access Grid */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 22, fontFamily: "Poppins_600SemiBold", color: colors.text, marginBottom: 16 }}>
            Explore
          </Text>
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
            <QuickCard icon={Building2} label="City Guides" subtitle="16 host cities" onPress={() => router.push("/(tabs)/cities")} colors={colors} />
            <QuickCard icon={CalendarCheck} label="My Matches" subtitle="Book & manage" onPress={() => router.push("/my-matches")} colors={colors} />
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <QuickCard icon={DollarSign} label="Logistics" subtitle="Currency & visas" onPress={() => router.push("/logistics")} colors={colors} />
            <QuickCard icon={Radio} label="Live Scores" subtitle="All 104 fixtures" onPress={() => router.push("/live-scores")} colors={colors} accent />
          </View>
        </View>

        {/* Safety Info */}
        {safetyInfo && (
          <TouchableOpacity
            style={{
              backgroundColor: colors.accent + "10",
              borderRadius: 16,
              padding: 16,
              marginBottom: 24,
              borderWidth: 1,
              borderColor: colors.accent + "30",
            }}
            activeOpacity={0.8}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Shield size={20} color={colors.accent} />
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Poppins_600SemiBold",
                  color: colors.text,
                  marginLeft: 8,
                }}
              >
                Safety Information
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "InstrumentSans_400Regular",
                color: colors.textSecondary,
                marginBottom: 8,
              }}
            >
              {safetyInfo.embassy_name}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: "InstrumentSans_400Regular",
                color: colors.textMuted,
              }}
            >
              Emergency: {safetyInfo.emergency_phone}
            </Text>
          </TouchableOpacity>
        )}

        {/* Cultural Tips */}
        {culturalTips.length > 0 && (
          <View>
            <Text
              style={{
                fontSize: 22,
                fontFamily: "Poppins_600SemiBold",
                color: colors.text,
                marginBottom: 16,
              }}
            >
              Cultural Tips
            </Text>
            {culturalTips.slice(0, 2).map((tip) => (
              <View
                key={tip.id}
                style={{
                  backgroundColor: colors.cardBackground,
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: colors.cardBorder,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <BookOpen size={16} color={colors.accent} />
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Poppins_500Medium",
                      color: colors.text,
                      marginLeft: 8,
                    }}
                  >
                    {tip.title}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "InstrumentSans_400Regular",
                    color: colors.textSecondary,
                    lineHeight: 20,
                  }}
                >
                  {tip.description}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function QuickCard({ icon: Icon, label, subtitle, onPress, colors, accent = false }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        backgroundColor: accent ? colors.accent : colors.cardBackground,
        borderRadius: 14,
        padding: 14,
        borderWidth: 1,
        borderColor: accent ? colors.accent : colors.cardBorder,
      }}
      activeOpacity={0.75}
    >
      <View style={{
        width: 36, height: 36, borderRadius: 10,
        backgroundColor: accent ? "rgba(255,255,255,0.2)" : colors.accent + "15",
        justifyContent: "center", alignItems: "center", marginBottom: 10,
      }}>
        <Icon size={18} color={accent ? "white" : colors.accent} />
      </View>
      <Text style={{ fontSize: 14, fontFamily: "Poppins_600SemiBold", color: accent ? "white" : colors.text, marginBottom: 2 }}>
        {label}
      </Text>
      <Text style={{ fontSize: 12, fontFamily: "InstrumentSans_400Regular", color: accent ? "rgba(255,255,255,0.8)" : colors.textSecondary }}>
        {subtitle}
      </Text>
    </TouchableOpacity>
  );
}
