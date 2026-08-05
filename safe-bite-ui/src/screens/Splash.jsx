import { Text, View } from "react-native";

export default function Splash() {
  return (
    <View style={styles.container}>
      <Text style={styles.Header}>Safe Bite</Text>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center", // Vertical center
    alignItems: "center", // Horizontal center
  },
  Header: {
    fontSize: 100,
  },
};
