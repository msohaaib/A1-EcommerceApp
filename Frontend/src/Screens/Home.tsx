import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const categories = [
  {
    id: "1",
    name: "Clothing",
    image: "https://cdn-icons-png.flaticon.com/512/892/892458.png",
  },
  {
    id: "2",
    name: "Electronics",
    image: "https://cdn-icons-png.flaticon.com/512/1040/1040230.png",
  },
  {
    id: "3",
    name: "Beauty",
    image: "https://cdn-icons-png.flaticon.com/512/990/990968.png",
  },
  {
    id: "4",
    name: "Shoes",
    image: "https://cdn-icons-png.flaticon.com/512/679/679922.png",
  },
  {
    id: "5",
    name: "Furniture",
    image: "https://cdn-icons-png.flaticon.com/512/3081/3081967.png",
  },
];

const products = [
  {
    id: "1",
    name: "Casual T-Shirt",
    price: "$25",
    description: "Soft cotton T-shirt perfect for casual wear.",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
  },
  {
    id: "2",
    name: "Wireless Headphones",
    price: "$80",
    description: "Noise-cancelling over-ear wireless headphones.",
    image: "https://images.unsplash.com/photo-1585386959984-a41552231693?w=500",
  },
  {
    id: "3",
    name: "Running Shoes",
    price: "$65",
    description: "Lightweight and durable running shoes for comfort.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500",
  },
  {
    id: "4",
    name: "Smart Watch",
    price: "$120",
    description: "Track your fitness and get notifications instantly.",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=500",
  },
  {
    id: "5",
    name: "Sofa Chair",
    price: "$200",
    description: "Comfortable modern sofa chair for your living room.",
    image: "https://images.unsplash.com/photo-1616628188460-2d25b4b9b662?w=500",
  },
  {
    id: "6",
    name: "Perfume",
    price: "$40",
    description: "Elegant and long-lasting fragrance for all occasions.",
    image: "https://images.unsplash.com/photo-1600180758890-6ff62f24d3b7?w=500",
  },
];

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🛍️ ShopEase</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/1170/1170678.png",
            }}
            style={styles.cartIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryCard}>
            <Image source={{ uri: item.image }} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />

      {/* Products */}
      <Text style={styles.sectionTitle}>Popular Products</Text>
      <View style={styles.productGrid}>
        {products.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.productCard}
            onPress={() =>
              navigation.navigate("ProductDetail", { product: item })
            }
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addText}>Add to Cart</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", paddingHorizontal: 10 },
  header: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 26, fontWeight: "700", color: "#2c3e50" },
  cartIcon: { width: 28, height: 28 },
  searchContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    elevation: 2,
  },
  searchInput: { fontSize: 16 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    color: "#2c3e50",
  },
  categoryCard: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 90,
    elevation: 2,
  },
  categoryImage: { width: 40, height: 40, marginBottom: 5 },
  categoryText: { fontSize: 13, color: "#333" },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  productCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    padding: 10,
  },
  productImage: {
    width: "100%",
    height: 130,
    borderRadius: 10,
    marginBottom: 8,
  },
  productName: { fontSize: 15, fontWeight: "600", color: "#2c3e50" },
  productPrice: { fontSize: 14, color: "#27ae60", marginVertical: 5 },
  addButton: {
    backgroundColor: "#2c3e50",
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  addText: { color: "#fff", fontSize: 13 },
});
