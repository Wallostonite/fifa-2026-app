import { apiFetch } from '@/utils/api';
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Building2, Search, MapPin, ChevronRight } from "lucide-react-native";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { InstrumentSans_400Regular } from "@expo-google-fonts/instrument-sans";
import { useTheme } from "@/hooks/useTheme";
import { useQuery } from "@tanstack/react-query";
import EmptyState from "@/components/EmptyState";

const COUNTRY_FILTERS = ["All", "USA", "Canada", "Mexico"];

export default function CitiesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors, colorScheme } = useTheme();
  const [search, setSearch] = useState("");
  const [activeCountry, setActiveCountry] = useState("All");
  const [refreshing, setRefreshing] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_500Medium,
    InstrumentSans_400Regular,
  });

  const { data: cities = [], refetch } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const res = await apiFetch("/api/cities");
      if (!res.ok) throw new Error("Failed to fetch cities");
      return res.json();
    },
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const filtered = cities.filter((c) => {
    const matchesCountry = activeCountry === "All" || c.country === activeCountry;
    const matchesSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.stadium.toLowerCase().includes(search.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  const grouped = filtered.reduce((acc, city) => {
    const key = city.country;
    if (!acc[key]) acc[key] = [];
    acc[key].push(city);
    return acc;
  }, {});

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 90,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent} />}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text style={{ fontSize: 28, fontFamily: "Poppins_600SemiBold", color: colors.text, marginBottom: 4 }}>
            Host Cities
          </Text>
          <Text style={{ fontSize: 14, fontFamily: "InstrumentSans_400Regular", color: colors.textSecondary }}>
            16 cities across USA, Canada & Mexico
          </Text>
        </View>

        {/* Search */}
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: colors.cardBackground,
              borderRadius: 12,
              paddingHorizontal: 14,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: colors.cardBorder,
            }}
          >
            <Search size={18} color={colors.textMuted} />
            <TextInput
              placeholder="Search cities or stadiums..."
              placeholderTextColor={colors.placeholder}
              value={search}
              onChangeText={setSearch}
              style={{
                flex: 1,
                marginLeft: 10,
                fontSize: 15,
                color: colors.text,
                fontFamily: "InstrumentSans_400Regular",
              }}
            />
          </View>
        </View>

        {/* Country Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8, marginBottom: 24 }}
        >
          {COUNTRY_FILTERS.map((country) => (
            <TouchableOpacity
              key={country}
              onPress={() => setActiveCountry(country)}
              style={{
                paddingVertical: 6,
                paddingHorizontal: 16,
                borderRadius: 20,
                backgroundColor: activeCountry === country ? colors.accent : colors.cardBackground,
                borderWidth: 1,
                borderColor: activeCountry === country ? colors.accent : colors.cardBorder,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: "Poppins_500Medium",
                  color: activeCountry === country ? "white" : colors.textSecondary,
                }}
              >
                {country}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* City Groups */}
        {Object.keys(grouped).length === 0 ? (
          <View style={{ paddingHorizontal: 20 }}>
            <EmptyState icon={Building2} title="No cities found" subtitle="Try adjusting your search or filter" />
          </View>
        ) : (
          Object.entries(grouped).map(([country, countryCities]) => (
            <View key={country} style={{ marginBottom: 24 }}>
              <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginBottom: 12 }}>
                <Text style={{ fontSize: 13, fontFamily: "Poppins_600SemiBold", color: colors.textMuted, textTransform: "uppercase", letterSpacing: 1 }}>
                  {countryCities[0]?.flag} {country}
                </Text>
              </View>
              {countryCities.map((city) => (
                <TouchableOpacity
                  key={city.id}
                  onPress={() => router.push(`/city/${city.id}`)}
                  style={{
                    marginHorizontal: 20,
                    marginBottom: 12,
                    backgroundColor: colors.cardBackground,
                    borderRadius: 16,
                    padding: 16,
                    borderWidth: 1,
                    borderColor: colors.cardBorder,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  activeOpacity={0.75}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 17, fontFamily: "Poppins_600SemiBold", color: colors.text, marginBottom: 4 }}>
                      {city.name}
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <MapPin size={13} color={colors.textMuted} />
                      <Text style={{ fontSize: 13, fontFamily: "InstrumentSans_400Regular", color: colors.textSecondary, marginLeft: 4 }}>
                        {city.stadium}
                      </Text>
                    </View>
                    <View
                      style={{
                        alignSelf: "flex-start",
                        marginTop: 8,
                        paddingHorizontal: 10,
                        paddingVertical: 3,
                        backgroundColor: colors.accent + "15",
                        borderRadius: 8,
                      }}
                    >
                      <Text style={{ fontSize: 11, fontFamily: "Poppins_500Medium", color: colors.accent }}>
                        {city.stadium_capacity?.toLocaleString()} cap
                      </Text>
                    </View>
                  </View>
                  <ChevronRight size={20} color={colors.textMuted} />
                </TouchableOpacity>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
