import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function StartScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdn.pixabay.com/photo/2022/04/02/08/21/motorbike-7106526_960_720.png",
        }}
        style={styles.image}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Card</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#2E8B57", // Green background
    justifyContent: "center",
    alignItems: "center", // Center content horizontally and vertically
    padding: 20, // Add some padding to prevent content from touching screen edges
    height: "100%",
  },
  image: {
    width: 300, // Set image width
    height: 200, // Set image height
    borderRadius: 20, // Add rounded corners
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FF6347", // Tomato red button color
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25, // Rounded corners for the button
    elevation: 8, // Add shadow to the button
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonText: {
    color: "#fff", // White text
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center", // Center the text inside the button
  },
});
