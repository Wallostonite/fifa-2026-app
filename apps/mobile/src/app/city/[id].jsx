import { apiFetch } from '@/utils/api';
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  MapPin,
  Users,
  Train,
  Star,
  UtensilsCrossed,
  Beer,
  Landmark,
} from "lucide-react-native";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { InstrumentSans_400Regular } from "@expo-google-fonts/instrument-sans";
import { useTheme } from "@/hooks/useTheme";
import { useQuery } from "@tanstack/react-query";

const VENUE_ICONS = {
  Bar: Beer,
  Restaurant: UtensilsCrossed,
  "Fan Zone": Users,
  Attraction: Landmark,
};

export default function CityDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { colors, colorScheme } = useTheme();

  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_500Medium,
    InstrumentSans_400Regular,
  });

  const { data: city, isLoading } = useQuery({
    queryKey: ["city", id],
    queryFn: async () => {
      const res = await apiFetch(`/api/cities/${id}`);
      if (!res.ok) throw new Error("City not found");
      return res.json();
    },
    enabled: !!id,
  });

  if (!fontsLoaded || isLoading) return null;
  if (!city) return null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      {/* Sticky Header */}
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
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: colors.cardBackground,
            borderWidth: 1,
            borderColor: colors.cardBorder,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
          }}
          activeOpacity={0.7}
        >
          <ArrowLeft size={18} color={colors.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontFamily: "Poppins_600SemiBold", color: colors.text }} numberOfLines={1}>
            {city.name}
          </Text>
          <Text style={{ fontSize: 13, fontFamily: "InstrumentSans_400Regular", color: colors.textSecondary }}>
            {city.flag} {city.country}
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Card */}
        <View
          style={{
            backgroundColor: colors.accent,
            borderRadius: 20,
            padding: 24,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 13, fontFamily: "Poppins_500Medium", color: "rgba(255,255,255,0.75)", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>
            Stadium
          </Text>
          <Text style={{ fontSize: 22, fontFamily: "Poppins_600SemiBold", color: "white", marginBottom: 8 }}>
            {city.stadium}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Users size={15} color="rgba(255,255,255,0.8)" />
            <Text style={{ fontSize: 14, fontFamily: "InstrumentSans_400Regular", color: "rgba(255,255,255,0.9)", marginLeft: 6 }}>
              {city.stadium_capacity?.toLocaleString()} capacity
            </Text>
          </View>
        </View>

        {/* About */}
        {city.description && (
          <View style={{ marginBottom: 20 }}>
            <SectionTitle title="About" colors={colors} />
            <Text style={{ fontSize: 15, fontFamily: "InstrumentSans_400Regular", color: colors.textSecondary, lineHeight: 22 }}>
              {city.description}
            </Text>
          </View>
        )}

        {/* Transport */}
        {city.transport_tips && (
          <View style={{ marginBottom: 20 }}>
            <SectionTitle title="Getting There" colors={colors} />
            <View
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 14,
                padding: 16,
                borderWidth: 1,
                borderColor: colors.cardBorder,
                flexDirection: "row",
              }}
            >
              <Train size={20} color={colors.accent} style={{ marginRight: 12, marginTop: 2 }} />
              <Text style={{ flex: 1, fontSize: 14, fontFamily: "InstrumentSans_400Regular", color: colors.textSecondary, lineHeight: 21 }}>
                {city.transport_tips}
              </Text>
            </View>
          </View>
        )}

        {/* Fan Zones */}
        {city.fan_zones?.length > 0 && (
          <View style={{ marginBottom: 20 }}>
            <SectionTitle title="Fan Zones" colors={colors} />
            {city.fan_zones.map((zone, i) => (
              <View
                key={i}
                style={{
                  backgroundColor: colors.cardBackground,
                  borderRadius: 12,
                  padding: 14,
                  marginBottom: 8,
                  borderWidth: 1,
                  borderColor: colors.cardBorder,
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: colors.accent + "20",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 12,
                  }}
                >
                  <Star size={16} color={colors.accent} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, fontFamily: "Poppins_500Medium", color: colors.text, marginBottom: 2 }}>
                    {zone.name}
                  </Text>
                  {zone.address && (
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <MapPin size={12} color={colors.textMuted} />
                      <Text style={{ fontSize: 13, fontFamily: "InstrumentSans_400Regular", color: colors.textSecondary, marginLeft: 4 }}>
                        {zone.address}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Recommended Venues */}
        {city.recommended_venues?.length > 0 && (
          <View style={{ marginBottom: 20 }}>
            <SectionTitle title="Where to Go" colors={colors} />
            {city.recommended_venues.map((venue, i) => {
              const Icon = VENUE_ICONS[venue.type] || MapPin;
              return (
                <View
                  key={i}
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderRadius: 12,
                    padding: 14,
                    marginBottom: 8,
                    borderWidth: 1,
                    borderColor: colors.cardBorder,
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}
                >
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: colors.borderLight,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 12,
                    }}
                  >
                    <Icon size={16} color={colors.textSecondary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 2 }}>
                      <Text style={{ fontSize: 15, fontFamily: "Poppins_500Medium", color: colors.text, flex: 1 }}>
                        {venue.name}
                      </Text>
                      <View style={{ paddingHorizontal: 8, paddingVertical: 2, backgroundColor: colors.borderLight, borderRadius: 6 }}>
                        <Text style={{ fontSize: 11, fontFamily: "Poppins_500Medium", color: colors.textSecondary }}>
                          {venue.type}
                        </Text>
                      </View>
                    </View>
                    {venue.address && (
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MapPin size={12} color={colors.textMuted} />
                        <Text style={{ fontSize: 13, fontFamily: "InstrumentSans_400Regular", color: colors.textSecondary, marginLeft: 4 }}>
                          {venue.address}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Quick Facts */}
        <View style={{ marginBottom: 20 }}>
          <SectionTitle title="Quick Facts" colors={colors} />
          <View style={{ flexDirection: "row", gap: 12 }}>
            <FactCard label="Best Time" value={city.best_time_to_visit || "June–July"} colors={colors} />
            <FactCard label="Country" value={`${city.flag} ${city.country}`} colors={colors} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function SectionTitle({ title, colors }) {
  return (
    <Text
      style={{
        fontSize: 18,
        fontFamily: "Poppins_600SemiBold",
        color: colors.text,
        marginBottom: 12,
      }}
    >
      {title}
    </Text>
  );
}

function FactCard({ label, value, colors }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.cardBackground,
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: colors.cardBorder,
      }}
    >
      <Text style={{ fontSize: 11, fontFamily: "Poppins_500Medium", color: colors.textMuted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
        {label}
      </Text>
      <Text style={{ fontSize: 14, fontFamily: "Poppins_600SemiBold", color: colors.text }}>
        {value}
      </Text>
    </View>
  );
}
