import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import ProductCard from "../components/productCard";
import products from "../data/data.json";

export default function HomeScreen({ navigation }) {
  const [featured, setFeatured] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const categories = ["Electronics", "Clothing", "Books"];

  useEffect(() => {
    setFeatured(products);
    setFilteredProducts(products);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      setFilteredProducts(
        products.filter(
          (p) =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery),
        ),
      );
    } else {
      setFilteredProducts(featured);
    }
  }, [searchQuery, featured]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />
      <Text style={styles.title}>Featured Products</Text>
      <FlatList
        data={searchQuery ? filteredProducts : featured}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate("ProductDetail", { id: item.id })
            }
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal={!searchQuery}
        showsHorizontalScrollIndicator={false}
        numColumns={searchQuery ? 2 : 0}
        columnWrapperStyle={
          searchQuery ? { justifyContent: "space-between" } : null
        }
      />
      {!searchQuery && (
        <>
          <Text style={styles.subtitle}>Categories</Text>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() =>
                navigation.navigate("ProductList", {
                  category: category.toLowerCase(),
                })
              }
              style={styles.categoryButton}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 8,
  },
  categoryButton: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryText: { fontSize: 16, textAlign: "center" },
});
