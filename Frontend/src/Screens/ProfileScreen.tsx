import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ProfileScreen() {
  return (
    <View>
      <Text style={styles.text}>User Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});
