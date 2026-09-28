import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../../app/dashboard";
import PantryScreen from "../../app/pantry"; 
import Profile from "../../app/profile";
import Scanner from "../../app/scanner";

const Tab = createBottomTabNavigator();
const Ionicons = require("@expo/vector-icons/Ionicons").default;

export default function Navbar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Dashboard") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Scan food item") {
            iconName = focused ? "barcode" : "barcode-outline";
          } else if (route.name === "Pantry") {
            iconName = focused ? "fast-food" : "fast-food-outline";
          } else if (route.name === "My Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Scan food item" component={Scanner} />
      <Tab.Screen name="Pantry" component={PantryScreen} />
      <Tab.Screen name="My Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const styles = {
  navbar: {
    height: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  navbarTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
};
