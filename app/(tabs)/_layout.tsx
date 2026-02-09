import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import useFont from "@/hooks/useFont";

const tabs = [
  { name: "home", icon: "home", title: "Home" },
  { name: "cookbook", icon: "restaurant", title: "Meals" },
  { name: "explore", icon: "search", title: "Explore" },
  { name: "profile", icon: "person", title: "You" },
] as const

const TabsLayout = () => {
  const fontsLoaded = useFont();

    if (!fontsLoaded) {
      return;
    }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#8B593E",
        tabBarInactiveTintColor: "#9A8478",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E5D3B7",
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          fontFamily: 'outfit-medium'
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={tab.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  )
}

export default TabsLayout
