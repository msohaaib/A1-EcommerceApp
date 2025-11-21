import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import ProductCard from "../components/productCard";
import API from "../API/api"; // Axios instance with baseURL

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeBrand, setActiveBrand] = useState("All");
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await API.get("/products");
      if (response.data.success) {
        const productsData = response.data.data;
        setProducts(productsData);
        setFeatured(productsData);
        setFilteredProducts(productsData);

        // Extract unique brands from products
        const uniqueBrands = [
          "All",
          ...new Set(productsData.map((p) => p.brand)),
        ];
        setBrands(uniqueBrands);
      }
    } catch (error) {
      console.log("Error fetching products:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      setFilteredProducts(
        products.filter(
          (p) =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.brand.toLowerCase().includes(lowerQuery),
        ),
      );
    } else {
      // If no search, apply active brand filter
      handleBrandPress(activeBrand, true);
    }
  }, [searchQuery]);

  // Brand filter
  const handleBrandPress = (brand, skipStateUpdate = false) => {
    if (!skipStateUpdate) setActiveBrand(brand);

    if (brand === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.brand === brand));
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome 👋</Text>
      <Text style={styles.subHeader}>Find your next favorite product</Text>

      <TextInput
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
        placeholderTextColor="#999"
      />

      {/* Brand Chips */}
      <View style={styles.categoryWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {brands.map((brand) => (
            <TouchableOpacity
              key={brand}
              style={[
                styles.categoryChip,
                activeBrand === brand && styles.activeCategoryChip,
              ]}
              onPress={() => handleBrandPress(brand)}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeBrand === brand && styles.activeCategoryText,
                ]}
              >
                {brand}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.sectionTitle}>Products</Text>
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate("ProductDetail", { product: item })
            }
          />
        )}
        keyExtractor={(item, index) => (item._id ? item._id : index.toString())}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8fafc",
  },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 26, fontWeight: "bold", color: "#1f2937" },
  subHeader: { fontSize: 15, color: "#6b7280", marginBottom: 16 },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    marginBottom: 16,
  },
  categoryWrapper: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 6,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryScroll: { alignItems: "center", paddingHorizontal: 4 },
  categoryChip: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  activeCategoryChip: { backgroundColor: "#2563eb" },
  categoryText: { fontSize: 14, color: "#374151" },
  activeCategoryText: { color: "#fff", fontWeight: "600" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
});
