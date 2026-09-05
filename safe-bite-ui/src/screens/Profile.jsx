import { Text, View } from "react-native";

export default function Profile() {
  return (
    <View style={styles.Heading}>

      <Text>This is the profile page</Text>
    </View>
  );
}

const styles = {
  Heading: {
    fontSize: 20,
    fontWeight: "bold",
    
  },
};
