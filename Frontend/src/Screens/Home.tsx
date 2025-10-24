import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
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
    name: "Shoes",
    image: "https://cdn-icons-png.flaticon.com/512/1183/1183672.png",
  },
  {
    id: "3",
    name: "Electronics",
    image: "https://cdn-icons-png.flaticon.com/512/685/685655.png",
  },
  {
    id: "4",
    name: "Beauty",
    image: "https://cdn-icons-png.flaticon.com/512/4149/4149658.png",
  },
];

const products = [
  {
    id: "1",
    name: "Running Shoes",
    price: "$59.99",
    image:
      "https://cdn.pixabay.com/photo/2016/11/29/09/08/adidas-1867060_1280.jpg",
  },
  {
    id: "2",
    name: "Casual T-Shirt",
    price: "$24.99",
    image:
      "https://cdn.pixabay.com/photo/2017/08/06/19/40/fashion-2609565_1280.jpg",
  },
  {
    id: "3",
    name: "Smart Watch",
    price: "$129.99",
    image:
      "https://cdn.pixabay.com/photo/2016/11/22/19/05/black-1845510_1280.jpg",
  },
  {
    id: "4",
    name: "Wireless Headphones",
    price: "$89.99",
    image:
      "https://cdn.pixabay.com/photo/2017/01/06/19/15/headphones-1954011_1280.jpg",
  },
];

export default function Home() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={styles.title}>Welcome to ShopEase 👋</Text>
        <TextInput style={styles.searchBar} placeholder="Search products..." />

        {/* Promo Banner */}
        <View style={styles.bannerContainer}>
          <Image
            source={{
              uri: "https://img.freepik.com/free-vector/flat-sale-banner-template_23-2148907685.jpg",
            }}
            style={styles.bannerImage}
          />
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={categories}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryCard}>
              <Image
                source={{ uri: item.image }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Featured Products */}
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <View style={styles.productGrid}>
          {products.map((product) => (
            <TouchableOpacity key={product.id} style={styles.productCard}>
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
              />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#f9fafb",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    color: "#111827",
  },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
    borderColor: "#e5e7eb",
    borderWidth: 1,
  },
  bannerContainer: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: 160,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#1f2937",
  },
  categoryCard: {
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 6,
  },
  categoryName: {
    fontSize: 14,
    color: "#374151",
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    backgroundColor: "#fff",
    width: "48%",
    borderRadius: 12,
    marginBottom: 16,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2563eb",
  },
});
