import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function startScreen() {
  return (
    <View>
      <Text style={styles.text}>startScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontWeight: "semibold",
  },
});
