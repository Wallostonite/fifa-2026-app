import { saveProfile } from '@/hooks/useProfile';
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "pt", name: "Portuguese", flag: "🇧🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
];

export default function PreferencesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { colors, colorScheme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_500Medium,
    InstrumentSans_400Regular,
  });

  const handleComplete = async () => {
    try {
      await saveProfile({
        country: params.country,
        countryFlag: params.countryFlag,
        team: params.team,
        language: selectedLanguage.code,
        notificationsEnabled,
      });

      if (params.returnTo === "profile") {
        router.back();
      } else {
        router.replace("/(tabs)/home");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert("Error", "Failed to save your preferences. Please try again.");
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
            Customize your experience
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "InstrumentSans_400Regular",
              color: colors.textSecondary,
            }}
          >
            Choose your language and notification preferences
          </Text>
        </View>

        {/* Language Selection */}
        <View style={{ marginBottom: 32 }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Poppins_600SemiBold",
              color: colors.text,
              marginBottom: 16,
            }}
          >
            Language
          </Text>
          {LANGUAGES.map((language) => (
            <TouchableOpacity
              key={language.code}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 16,
                borderRadius: 12,
                borderWidth: 2,
                borderColor:
                  selectedLanguage.code === language.code
                    ? colors.accent
                    : colors.borderLight,
                backgroundColor:
                  selectedLanguage.code === language.code
                    ? colors.accent + "10"
                    : colors.cardBackground,
                marginBottom: 12,
              }}
              activeOpacity={0.7}
              onPress={() => setSelectedLanguage(language)}
            >
              <Text style={{ fontSize: 32, marginRight: 16 }}>
                {language.flag}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins_500Medium",
                  color:
                    selectedLanguage.code === language.code
                      ? colors.accent
                      : colors.text,
                }}
              >
                {language.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Notifications */}
        <View style={{ marginBottom: 32 }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Poppins_600SemiBold",
              color: colors.text,
              marginBottom: 16,
            }}
          >
            Notifications
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: colors.borderLight,
              backgroundColor: colors.cardBackground,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins_500Medium",
                  color: colors.text,
                  marginBottom: 4,
                }}
              >
                Match Updates
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "InstrumentSans_400Regular",
                  color: colors.textSecondary,
                }}
              >
                Get notified about your team's matches and updates
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.borderLight, true: colors.accent }}
              thumbColor="white"
            />
          </View>
        </View>

        {/* Summary */}
        <View
          style={{
            padding: 20,
            borderRadius: 16,
            backgroundColor: colors.accent + "10",
            borderWidth: 1,
            borderColor: colors.accent + "30",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Poppins_600SemiBold",
              color: colors.text,
              marginBottom: 12,
            }}
          >
            Your FanPass
          </Text>
          <View style={{ gap: 8 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 24, marginRight: 12 }}>
                {params.countryFlag}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "InstrumentSans_400Regular",
                  color: colors.textSecondary,
                }}
              >
                From {params.country}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 24, marginRight: 12 }}>⚽</Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "InstrumentSans_400Regular",
                  color: colors.textSecondary,
                }}
              >
                Supporting {params.team}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 24, marginRight: 12 }}>
                {selectedLanguage.flag}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "InstrumentSans_400Regular",
                  color: colors.textSecondary,
                }}
              >
                {selectedLanguage.name}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Complete Button */}
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
            backgroundColor: colors.accent,
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: "center",
          }}
          activeOpacity={0.8}
          onPress={handleComplete}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins_600SemiBold",
              color: "white",
            }}
          >
            {params.returnTo === "profile" ? "Save Changes" : "Complete Setup"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
