import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { InstrumentSans_400Regular } from "@expo-google-fonts/instrument-sans";
import { useTheme } from "@/hooks/useTheme";

const TEAMS = [
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
];

export default function TeamSelectionScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { colors, colorScheme } = useTheme();
  const [selectedTeam, setSelectedTeam] = useState(null);

  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_500Medium,
    InstrumentSans_400Regular,
  });

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };

  const handleContinue = () => {
    if (selectedTeam) {
      router.push({
        pathname: "/onboarding/preferences",
        params: {
          country: params.country,
          countryFlag: params.countryFlag,
          team: selectedTeam.name,
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

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <TouchableOpacity
          style={{
            width: 36,
            height: 36,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.textMuted,
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <ChevronLeft size={18} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 32,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ marginBottom: 32 }}>
          <Text
            style={{
              fontSize: 28,
              fontFamily: "Poppins_600SemiBold",
              color: colors.text,
              marginBottom: 12,
            }}
          >
            Which team are you supporting?
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "InstrumentSans_400Regular",
              color: colors.textSecondary,
            }}
          >
            Get personalized updates and content for your favorite team
          </Text>
        </View>

        {/* Team Grid */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginHorizontal: -6,
          }}
        >
          {TEAMS.map((team) => (
            <TouchableOpacity
              key={team.name}
              style={{
                width: "48%",
                marginHorizontal: "1%",
                marginBottom: 12,
                padding: 20,
                borderRadius: 16,
                borderWidth: 2,
                borderColor:
                  selectedTeam?.name === team.name
                    ? colors.accent
                    : colors.borderLight,
                backgroundColor:
                  selectedTeam?.name === team.name
                    ? colors.accent + "10"
                    : colors.cardBackground,
                alignItems: "center",
              }}
              activeOpacity={0.7}
              onPress={() => handleTeamSelect(team)}
            >
              <Text style={{ fontSize: 48, marginBottom: 8 }}>{team.flag}</Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins_500Medium",
                  color:
                    selectedTeam?.name === team.name
                      ? colors.accent
                      : colors.text,
                  textAlign: "center",
                }}
              >
                {team.name}
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
            backgroundColor: selectedTeam ? colors.accent : colors.borderLight,
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: "center",
          }}
          activeOpacity={0.8}
          onPress={handleContinue}
          disabled={!selectedTeam}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins_600SemiBold",
              color: selectedTeam ? "white" : colors.textMuted,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
