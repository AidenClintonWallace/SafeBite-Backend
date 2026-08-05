import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/Dashboard";
import History from "../screens/History";
import Profile from "../screens/Profile";
import Scanner from "../screens/Scanner";

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
            iconName = focused ? "barcode-outline" : "barcode-outline";
          } else if (route.name === "History") {
            iconName = focused ? "time" : "time-outline";
          } else if (route.name === "My Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Scan food item" component={Scanner} />
      <Tab.Screen name="My Profile" component={Profile} />
      <Tab.Screen name="History" component={History} />
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
