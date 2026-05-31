import { apiFetch } from '@/utils/api';
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { MapPin, Users, X } from "lucide-react-native";
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

const { width, height } = Dimensions.get("window");

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const { colors, colorScheme } = useTheme();
  const [selectedZone, setSelectedZone] = useState(null);

  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_500Medium,
    InstrumentSans_400Regular,
    RobotoCondensed_500Medium,
  });

  const { data: userProfile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) throw new Error("No user ID");

      const response = await apiFetch(`/api/user-profile?userId=${userId}`);
      if (!response.ok) throw new Error("Failed to fetch profile");
      return response.json();
    },
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

  if (!fontsLoaded) {
    return null;
  }

  const getInitialRegion = () => {
    if (fanZones.length > 0) {
      return {
        latitude: parseFloat(fanZones[0].latitude),
        longitude: parseFloat(fanZones[0].longitude),
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      };
    }
    return {
      latitude: 52.520008,
      longitude: 13.404954,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      {/* Header */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: 20,
          backgroundColor: colors.background,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontFamily: "Poppins_600SemiBold",
            color: colors.text,
          }}
        >
          Fan Zones
        </Text>
        {userProfile && (
          <Text
            style={{
              fontSize: 14,
              fontFamily: "InstrumentSans_400Regular",
              color: colors.textSecondary,
              marginTop: 4,
            }}
          >
            Discover {userProfile.country} fan gathering spots
          </Text>
        )}
      </View>

      {/* Map */}
      {fanZones.length > 0 ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            width,
            height: height - insets.top - 120,
            marginTop: insets.top + 90,
          }}
          initialRegion={getInitialRegion()}
        >
          {fanZones.map((zone) => (
            <Marker
              key={zone.id}
              coordinate={{
                latitude: parseFloat(zone.latitude),
                longitude: parseFloat(zone.longitude),
              }}
              onPress={() => setSelectedZone(zone)}
            >
              <View
                style={{
                  backgroundColor: colors.accent,
                  borderRadius: 20,
                  padding: 8,
                  paddingHorizontal: 12,
                }}
              >
                <MapPin size={20} color="white" />
              </View>
            </Marker>
          ))}
        </MapView>
      ) : (
        <View
          style={{
            flex: 1,
            marginTop: insets.top + 90,
            paddingHorizontal: 20,
            justifyContent: "center",
          }}
        >
          <EmptyState
            icon={MapPin}
            title="No fan zones available"
            subtitle="Check back later for updates"
          />
        </View>
      )}

      {/* Bottom Sheet */}
      {selectedZone && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: colors.background,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: insets.bottom + 90,
            shadowColor: colors.shadowColor,
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: colorScheme === "dark" ? 0.5 : 0.1,
            shadowRadius: 8,
            elevation: 10,
            maxHeight: height * 0.5,
          }}
        >
          {/* Drag Handle */}
          <View
            style={{
              width: 40,
              height: 4,
              backgroundColor:
                colorScheme === "dark"
                  ? "rgba(255, 255, 255, 0.3)"
                  : "rgba(0, 0, 0, 0.15)",
              borderRadius: 2,
              alignSelf: "center",
              marginBottom: 20,
            }}
          />

          {/* Close Button */}
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: colors.borderLight,
              justifyContent: "center",
              alignItems: "center",
            }}
            activeOpacity={0.7}
            onPress={() => setSelectedZone(null)}
          >
            <X size={18} color={colors.text} />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: "Poppins_600SemiBold",
                color: colors.text,
                marginBottom: 8,
              }}
            >
              {selectedZone.name}
            </Text>

            {selectedZone.description && (
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "InstrumentSans_400Regular",
                  color: colors.textSecondary,
                  lineHeight: 20,
                  marginBottom: 16,
                }}
              >
                {selectedZone.description}
              </Text>
            )}

            <View
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: colors.cardBorder,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <MapPin size={16} color={colors.textMuted} />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "InstrumentSans_400Regular",
                    color: colors.textSecondary,
                    marginLeft: 8,
                  }}
                >
                  {selectedZone.address}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Users size={16} color={colors.accent} />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Poppins_500Medium",
                    color: colors.accent,
                    marginLeft: 8,
                  }}
                >
                  {selectedZone.attendee_count} fans going
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                paddingHorizontal: 16,
                backgroundColor:
                  selectedZone.type === "official"
                    ? colors.accent + "10"
                    : colors.cardBackground,
                borderRadius: 12,
                borderWidth: 1,
                borderColor:
                  selectedZone.type === "official"
                    ? colors.accent + "30"
                    : colors.borderLight,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                  color:
                    selectedZone.type === "official"
                      ? colors.accent
                      : colors.textSecondary,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                {selectedZone.type === "official"
                  ? "⭐ Official Fan Zone"
                  : `${selectedZone.type} Spot`}
              </Text>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}
