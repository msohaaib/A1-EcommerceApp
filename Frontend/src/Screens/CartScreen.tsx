// Screens/CartScreen.js
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useCart } from "../context/CartContext";

export default function CartScreen({ navigation }) {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce((s, item) => {
    // if price is string like "$25" you should parse number properly
    const priceNum =
      typeof item.price === "string"
        ? parseFloat(item.price.replace(/[^0-9.-]+/g, ""))
        : item.price;
    return s + priceNum * item.quantity;
  }, 0);

  const renderItem = ({ item }) => {
    // Ensure price is a number
    const priceNum =
      typeof item.price === "string"
        ? parseFloat(item.price.replace(/[^0-9.-]+/g, ""))
        : item.price;

    return (
      <View style={styles.item}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.qty}>Qty: {item.quantity}</Text>
        <Text style={styles.price}>
          ${(priceNum * item.quantity).toFixed(2)}
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            style={styles.qtyBtn}
          >
            <Text>-</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
            style={styles.qtyBtn}
          >
            <Text>+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => removeFromCart(item.id)}
            style={styles.removeBtn}
          >
            <Text style={{ color: "#fff" }}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Cart</Text>

      {cart.length === 0 ? (
        <View style={styles.empty}>
          <Text>Your cart is empty.</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={styles.shopBtn}
          >
            <Text style={{ color: "#fff" }}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(i) => i.id.toString()}
            renderItem={renderItem}
          />

          <View style={styles.footer}>
            <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => Alert.alert("Checkout", "Implement checkout flow")}
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f8fafc" },
  heading: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  empty: { alignItems: "center", marginTop: 40 },
  shopBtn: {
    marginTop: 12,
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 8,
  },
  item: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: "600" },
  qty: { marginTop: 6 },
  price: { marginTop: 6, fontWeight: "700" },
  actions: { flexDirection: "row", marginTop: 10, alignItems: "center" },
  qtyBtn: { padding: 8, borderWidth: 1, marginRight: 8, borderRadius: 6 },
  removeBtn: { backgroundColor: "#ef4444", padding: 8, borderRadius: 6 },
  footer: {
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
    marginTop: 10,
  },
  total: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  checkoutBtn: {
    backgroundColor: "#10b981",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
});
