import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";

export default function Index() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(null);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const completed = await AsyncStorage.getItem("hasCompletedOnboarding");
      setHasCompletedOnboarding(completed === "true");
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      setHasCompletedOnboarding(false);
    }
  };

  if (hasCompletedOnboarding === null) {
    return <View style={{ flex: 1, backgroundColor: "white" }} />;
  }

  return (
    <Redirect
      href={
        hasCompletedOnboarding
          ? "/(tabs)/home"
          : "/onboarding/country-selection"
      }
    />
  );
}
