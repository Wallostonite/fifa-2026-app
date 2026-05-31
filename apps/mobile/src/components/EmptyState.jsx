import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";

export default function EmptyState({
  icon: Icon,
  title,
  subtitle,
  style,
  iconSize = 32,
}) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          minHeight: 120,
          borderRadius: 16,
          backgroundColor: colors.emptyBackground,
          borderWidth: 2,
          borderColor: colors.borderDashed,
          borderStyle: "dashed",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 20,
        },
        style,
      ]}
    >
      {Icon && <Icon size={iconSize} color={colors.emptyIcon} />}
      <Text
        style={{
          fontSize: 16,
          fontFamily: "InstrumentSans_400Regular",
          color: colors.emptyText,
          textAlign: "center",
          marginTop: Icon ? 8 : 0,
        }}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          style={{
            fontSize: 12,
            fontFamily: "InstrumentSans_400Regular",
            color: colors.emptyIcon,
            textAlign: "center",
            marginTop: 4,
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
}
