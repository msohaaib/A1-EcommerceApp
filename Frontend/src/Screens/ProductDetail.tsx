// Screens/ProductDetail.js
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useCart } from "../context/CartContext";

export default function ProductDetail({ route }) {
  const { product } = route.params || {}; // fallback safe
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    Alert.alert("Added", `${product.name} has been added to cart.`);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {product?.image && (
          <Image source={{ uri: product.image }} style={styles.image} />
        )}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{product?.name}</Text>
          <Text style={styles.price}>{product?.price}</Text>
          <Text style={styles.description}>{product?.description}</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: "100%", height: 300, resizeMode: "contain", marginTop: 20 },
  detailsContainer: { padding: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2563eb",
    marginBottom: 12,
  },
  description: { fontSize: 15, color: "#4b5563", lineHeight: 22 },
  button: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
