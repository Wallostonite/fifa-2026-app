import { useProfile } from '@/hooks/useProfile';
import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useFocusEffect } from "expo-router";
import { Globe, Bell, Languages, LogOut, DollarSign, ChevronRight, Calendar } from "lucide-react-native";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { InstrumentSans_400Regular } from "@expo-google-fonts/instrument-sans";
import { useTheme } from "@/hooks/useTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors, colorScheme } = useTheme();

  // Load from local storage (instant) + sync from DB
  const { profile: userProfile, reload } = useProfile();

  // Reload when screen comes back into focus (after editing)
  useFocusEffect(React.useCallback(() => { reload(); }, [reload]));

  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_500Medium,
    InstrumentSans_400Regular,
  });

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("hasCompletedOnboarding");
          await AsyncStorage.removeItem("userId");
          router.replace("/onboarding/country-selection");
        },
      },
    ]);
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
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 90,
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
              marginBottom: 4,
            }}
          >
            Profile
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "InstrumentSans_400Regular",
              color: colors.textSecondary,
            }}
          >
            Manage your FanPass preferences
          </Text>
        </View>

        {/* Profile Card */}
        {userProfile && (
          <View
            style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 20,
              padding: 24,
              marginBottom: 24,
              borderWidth: 1,
              borderColor: colors.cardBorder,
            }}
          >
            <View
              style={{
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: colors.accent + "20",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <Text style={{ fontSize: 40 }}>{userProfile.country_flag}</Text>
              </View>
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: "Poppins_600SemiBold",
                  color: colors.text,
                  marginBottom: 4,
                }}
              >
                {userProfile.country}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "InstrumentSans_400Regular",
                  color: colors.textSecondary,
                }}
              >
                Supporting {userProfile.team}
              </Text>
            </View>

            <View
              style={{
                paddingTop: 20,
                borderTopWidth: 1,
                borderTopColor: colors.borderLight,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <Globe size={18} color={colors.textMuted} />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "InstrumentSans_400Regular",
                    color: colors.textSecondary,
                    marginLeft: 12,
                  }}
                >
                  Country: {userProfile.country}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <Languages size={18} color={colors.textMuted} />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "InstrumentSans_400Regular",
                    color: colors.textSecondary,
                    marginLeft: 12,
                  }}
                >
                  Language: {userProfile.language.toUpperCase()}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Bell size={18} color={colors.textMuted} />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "InstrumentSans_400Regular",
                    color: colors.textSecondary,
                    marginLeft: 12,
                  }}
                >
                  Notifications:{" "}
                  {userProfile.notifications_enabled ? "On" : "Off"}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Settings Section */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Poppins_600SemiBold",
              color: colors.text,
              marginBottom: 16,
            }}
          >
            Settings
          </Text>

          {[
            {
              icon: Globe,
              label: "Change Country",
              sub: userProfile?.country || "Not set",
              onPress: () => router.push({ pathname: "/onboarding/country-selection", params: { returnTo: "profile" } }),
            },
            {
              icon: Languages,
              label: "Change Language",
              sub: userProfile?.language?.toUpperCase() || "EN",
              onPress: () => router.push({ pathname: "/onboarding/preferences", params: { country: userProfile?.country, countryFlag: userProfile?.country_flag, team: userProfile?.team, returnTo: "profile" } }),
            },
            {
              icon: Calendar,
              label: "All Matches & Scores",
              sub: "104 fixtures · live scores",
              onPress: () => router.push("/(tabs)/schedule"),
            },
            {
              icon: Bell,
              label: "Notification Settings",
              sub: userProfile?.notifications_enabled ? "On" : "Off",
              onPress: () => Alert.alert("Notifications", "Notification settings coming soon."),
            },
          ].map(({ icon: Icon, label, sub, onPress }) => (
            <TouchableOpacity
              key={label}
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: colors.cardBorder,
                flexDirection: "row",
                alignItems: "center",
              }}
              activeOpacity={0.7}
              onPress={onPress}
            >
              <Icon size={20} color={colors.text} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ fontSize: 16, fontFamily: "Poppins_500Medium", color: colors.text }}>
                  {label}
                </Text>
                {sub && (
                  <Text style={{ fontSize: 12, fontFamily: "InstrumentSans_400Regular", color: colors.textMuted, marginTop: 1 }}>
                    {sub}
                  </Text>
                )}
              </View>
              <ChevronRight size={16} color={colors.textMuted} />
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.cardBorder,
              flexDirection: "row",
              alignItems: "center",
            }}
            activeOpacity={0.7}
            onPress={() => router.push("/logistics")}
          >
            <DollarSign size={20} color={colors.text} />
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Poppins_500Medium",
                color: colors.text,
                marginLeft: 12,
                flex: 1,
              }}
            >
              Currency & Logistics
            </Text>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={{ marginBottom: 32 }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Poppins_600SemiBold",
              color: colors.text,
              marginBottom: 16,
            }}
          >
            About
          </Text>

          <View
            style={{
              backgroundColor: colors.accent + "10",
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: colors.accent + "30",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Poppins_600SemiBold",
                color: colors.text,
                marginBottom: 8,
              }}
            >
              FanPass
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "InstrumentSans_400Regular",
                color: colors.textSecondary,
                lineHeight: 20,
              }}
            >
              Your global tournament companion. Feel at home in any stadium with
              personalized content based on your nationality and team
              allegiance.
            </Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={{
            backgroundColor: colors.accent,
            borderRadius: 16,
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <LogOut size={20} color="white" />
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins_600SemiBold",
              color: "white",
              marginLeft: 12,
            }}
          >
            Log Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
