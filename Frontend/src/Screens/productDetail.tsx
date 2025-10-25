import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function ProductDetail({ route, navigation }) {
  const { product } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addText}>Add to Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  productImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: { fontSize: 24, fontWeight: "700", color: "#2c3e50" },
  price: { fontSize: 20, color: "#27ae60", marginVertical: 10 },
  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#2c3e50",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  addText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  backButton: { alignItems: "center" },
  backText: { fontSize: 16, color: "#3498db" },
});
