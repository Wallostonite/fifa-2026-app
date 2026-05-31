import { useColorScheme } from "react-native";

export function useTheme() {
  const colorScheme = useColorScheme();

  return {
    colorScheme,
    colors: {
      background: colorScheme === "dark" ? "#121212" : "white",
      surface: colorScheme === "dark" ? "#1E1E1E" : "white",
      backgroundSecondary: colorScheme === "dark" ? "#0D0D0D" : "#D9D6CD",
      text: colorScheme === "dark" ? "rgba(255, 255, 255, 0.87)" : "#050505",
      textSecondary:
        colorScheme === "dark" ? "rgba(255, 255, 255, 0.6)" : "#7D7D7D",
      textMuted:
        colorScheme === "dark" ? "rgba(255, 255, 255, 0.4)" : "#B0B0B0",
      textLight:
        colorScheme === "dark" ? "rgba(255, 255, 255, 0.5)" : "#B7B7B7",
      textComment:
        colorScheme === "dark" ? "rgba(255, 255, 255, 0.7)" : "#6E6E6E",
      border: colorScheme === "dark" ? "#333333" : "#E5E7EB",
      borderLight: colorScheme === "dark" ? "#404040" : "#F0F0F0",
      borderInput: colorScheme === "dark" ? "#555555" : "#C0C0C0",
      borderComment: colorScheme === "dark" ? "#404040" : "#D1D1D1",
      borderDashed: colorScheme === "dark" ? "#404040" : "#E9ECEF",
      emptyBackground: colorScheme === "dark" ? "#1A1A1A" : "#F8F9FA",
      emptyText:
        colorScheme === "dark" ? "rgba(255, 255, 255, 0.4)" : "#6C757D",
      emptyIcon: colorScheme === "dark" ? "#666666" : "#ADB5BD",
      commentBackground: colorScheme === "dark" ? "#262626" : "#FAFAFA",
      cardBackground: colorScheme === "dark" ? "#1E1E1E" : "white",
      cardBorder: colorScheme === "dark" ? "#2A2A2A" : "#F1F1F1",
      shadowColor: colorScheme === "dark" ? "#000" : "#000",
      accent: "#FF415B",
      accentSecondary: "#FF4F6D",
      placeholder:
        colorScheme === "dark" ? "rgba(255, 255, 255, 0.4)" : "#B5B5B5",
    },
  };
}
