import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    // You can call your backend login API here
    console.log("Email:", email);
    console.log("Password:", password);
    alert("Login successful!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/5087/5087579.png",
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to continue</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupLink}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.signupText}>
            Don’t have an account?{" "}
            <Text style={styles.signupHighlight}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fb",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 25,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 1,
  },
  loginBtn: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    elevation: 2,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
