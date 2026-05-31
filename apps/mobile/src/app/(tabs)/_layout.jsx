import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { Home, Building2, CalendarCheck, MessageSquare, User } from "lucide-react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const colors = {
    tabBarBackground: colorScheme === "dark" ? "#1E1E1E" : "white",
    border: colorScheme === "dark" ? "#333333" : "#E5E7EB",
    tabBarActiveTint: "#FF415B",
    tabBarInactiveTint: colorScheme === "dark" ? "rgba(255, 255, 255, 0.4)" : "#6B6B6B",
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBarBackground,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: colors.tabBarActiveTint,
        tabBarInactiveTintColor: colors.tabBarInactiveTint,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home color={color} size={26} />,
        }}
      />
      <Tabs.Screen
        name="cities"
        options={{
          title: "Cities",
          tabBarIcon: ({ color }) => <Building2 color={color} size={26} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ color }) => <CalendarCheck color={color} size={26} />,
        }}
      />
      <Tabs.Screen
        name="forums"
        options={{
          title: "Forums",
          tabBarIcon: ({ color }) => <MessageSquare color={color} size={26} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User color={color} size={26} />,
        }}
      />
      {/* Hidden from tab bar — accessible via router.push */}
      <Tabs.Screen name="map" options={{ href: null }} />
      <Tabs.Screen name="schedule" options={{ href: null }} />
    </Tabs>
  );
}
