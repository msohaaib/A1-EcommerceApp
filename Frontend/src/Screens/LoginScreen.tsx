/* eslint-disable react/prop-types */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/sort-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import API from "../API/api";

export default function LoginScreen({ navigation }) {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!emailOrUsername || !password) {
      return Alert.alert("Error", "Please enter all fields");
    }

    try {
      let payload = { password };

      if (emailOrUsername.includes("@")) {
        payload.email = emailOrUsername;
      } else {
        payload.username = emailOrUsername;
      }

      console.log("Login Payload:", payload);

      const response = await API.post("/auth/login", payload);

      Alert.alert("Success", response.data.message || "Login successful", [
        {
          text: "OK",
          onPress: () => navigation.replace("Main"),
        },
      ]);

      console.log("AccessToken:", response.data.data.accessToken);
      console.log("RefreshToken:", response.data.data.refreshToken);
    } catch (error) {
      console.log("Login Error:", error);
      let message = "Something went wrong";

      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }

      Alert.alert("Error", message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email or Username"
        value={emailOrUsername}
        onChangeText={setEmailOrUsername}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.signupText}>
          Don't have an account?{" "}
          <Text style={{ color: "#1f2937" }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#1f2937",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#1f2937",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  link: {
    color: "#007bff",
    marginTop: 15,
    fontSize: 16,
  },
  signupText: {
    marginTop: 25,
    fontSize: 16,
    color: "#555",
  },
});
