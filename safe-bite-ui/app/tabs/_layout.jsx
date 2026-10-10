import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const icons = {
  dashboard: ["home", "home-outline"],
  scanner: ["barcode", "barcode-outline"],
  pantry: ["fast-food", "fast-food-outline"],
  profile: ["person", "person-outline"],
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#036c43",
        tabBarIcon: ({ focused, color, size }) => {
          const [on, off] = icons[route.name] ?? ["ellipse", "ellipse-outline"];
          return <Ionicons name={focused ? on : off} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="scanner" options={{ title: "Scan food item" }} />
      <Tabs.Screen name="pantry" options={{ title: "Pantry" }} />
      <Tabs.Screen name="profile" options={{ title: "My Profile" }} />
    </Tabs>
  );
}