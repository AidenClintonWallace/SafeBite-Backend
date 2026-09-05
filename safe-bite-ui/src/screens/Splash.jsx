import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

export default function Splash() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Safe Bite</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Vertical center
    alignItems: "center",     // Horizontal center
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 36,             
    fontWeight: "bold",
    color: "#15803d",         
  },
});