import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";

export default function CartScreen() {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Casual T-Shirt",
      price: 25,
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
      quantity: 1,
    },
    {
      id: "2",
      name: "Wireless Headphones",
      price: 80,
      image:
        "https://images.unsplash.com/photo-1585386959984-a41552231693?w=500",
      quantity: 1,
    },
  ]);

  // Increase quantity
  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculate total
  const totalAmount = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = () => {
    Alert.alert("Checkout", "Proceeding to payment...");
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => decreaseQuantity(item.id)}
          >
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => increaseQuantity(item.id)}
          >
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <Text style={styles.remove}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒 My Cart</Text>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty!</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          <View style={styles.summary}>
            <Text style={styles.totalText}>Total: ${totalAmount}</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 15 },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 15,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    alignItems: "center",
    elevation: 2,
  },
  image: { width: 70, height: 70, borderRadius: 8, marginRight: 10 },
  details: { flex: 1 },
  name: { fontSize: 16, fontWeight: "600", color: "#2c3e50" },
  price: { fontSize: 14, color: "#27ae60", marginVertical: 5 },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: "#2c3e50",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
  },
  quantityText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  quantityValue: { marginHorizontal: 10, fontSize: 16 },
  remove: { fontSize: 18, color: "#e74c3c", paddingHorizontal: 8 },
  summary: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: "#2c3e50",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: { fontSize: 18, color: "#7f8c8d" },
});
