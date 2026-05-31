import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Search } from "lucide-react-native";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { InstrumentSans_400Regular } from "@expo-google-fonts/instrument-sans";
import { useTheme } from "@/hooks/useTheme";

const COUNTRIES = [
  { name: "Germany", flag: "🇩🇪" },
  { name: "Brazil", flag: "🇧🇷" },
  { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { name: "Spain", flag: "🇪🇸" },
  { name: "France", flag: "🇫🇷" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Argentina", flag: "🇦🇷" },
  { name: "Portugal", flag: "🇵🇹" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "Belgium", flag: "🇧🇪" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "South Korea", flag: "🇰🇷" },
  { name: "United States", flag: "🇺🇸" },
  { name: "Mexico", flag: "🇲🇽" },
  { name: "Croatia", flag: "🇭🇷" },
  { name: "Uruguay", flag: "🇺🇾" },
];

export default function CountrySelectionScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { colors, colorScheme } = useTheme();
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_500Medium,
    InstrumentSans_400Regular,
  });

  const filteredCountries = COUNTRIES.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const handleContinue = () => {
    if (selectedCountry) {
      router.push({
        pathname: "/onboarding/team-selection",
        params: {
          country: selectedCountry.name,
          countryFlag: selectedCountry.flag,
          returnTo: params.returnTo || "",
        },
      });
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 40,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ marginBottom: 32 }}>
          <Text
            style={{
              fontSize: 32,
              fontFamily: "Poppins_600SemiBold",
              color: colors.accent,
              marginBottom: 8,
            }}
          >
            FanPass
          </Text>
          <Text
            style={{
              fontSize: 28,
              fontFamily: "Poppins_600SemiBold",
              color: colors.text,
              marginBottom: 12,
            }}
          >
            Where's your fan heart from?
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "InstrumentSans_400Regular",
              color: colors.textSecondary,
            }}
          >
            Select your country of origin to personalize your tournament
            experience
          </Text>
        </View>

        {/* Search */}
        <View style={{ marginBottom: 24 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: colors.borderInput,
              borderRadius: 16,
              paddingHorizontal: 16,
              paddingVertical: 12,
              backgroundColor: colors.background,
            }}
          >
            <Search size={20} color={colors.textMuted} />
            <TextInput
              style={{
                flex: 1,
                marginLeft: 12,
                fontSize: 16,
                fontFamily: "InstrumentSans_400Regular",
                color: colors.text,
              }}
              placeholder="Search countries..."
              placeholderTextColor={colors.placeholder}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        {/* Country Grid */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginHorizontal: -6,
          }}
        >
          {filteredCountries.map((country) => (
            <TouchableOpacity
              key={country.name}
              style={{
                width: "48%",
                marginHorizontal: "1%",
                marginBottom: 12,
                padding: 20,
                borderRadius: 16,
                borderWidth: 2,
                borderColor:
                  selectedCountry?.name === country.name
                    ? colors.accent
                    : colors.borderLight,
                backgroundColor:
                  selectedCountry?.name === country.name
                    ? colors.accent + "10"
                    : colors.cardBackground,
                alignItems: "center",
              }}
              activeOpacity={0.7}
              onPress={() => handleCountrySelect(country)}
            >
              <Text style={{ fontSize: 48, marginBottom: 8 }}>
                {country.flag}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins_500Medium",
                  color:
                    selectedCountry?.name === country.name
                      ? colors.accent
                      : colors.text,
                  textAlign: "center",
                }}
              >
                {country.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 20,
          paddingTop: 20,
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderTopColor: colors.borderLight,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: selectedCountry
              ? colors.accent
              : colors.borderLight,
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: "center",
          }}
          activeOpacity={0.8}
          onPress={handleContinue}
          disabled={!selectedCountry}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins_600SemiBold",
              color: selectedCountry ? "white" : colors.textMuted,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
