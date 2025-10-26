import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Platform,
  useColorScheme,
} from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome6";

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
  const [sortOption, setSortOption] = useState("default");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  // Animation scales for categories and products
  const scaleValues = useMemo(
    () =>
      [...categories, ...products].reduce((acc, item) => {
        acc[item.id] = new Animated.Value(1);
        return acc;
      }, {}),
    [],
  );

  const handleCategoryPress = (category) => {
    setSelectedCategory(category.id);
    Animated.sequence([
      Animated.timing(scaleValues[category.id], {
        toValue: 0.92,
        duration: 150, // Smoother animation
        useNativeDriver: true,
      }),
      Animated.timing(scaleValues[category.id], {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleProductPress = (product) => {
    Animated.sequence([
      Animated.timing(scaleValues[product.id], {
        toValue: 0.92,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValues[product.id], {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => navigation.navigate("ProductDetail", { product }));
  };

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      const priceA = parseFloat(a.price.replace("$", ""));
      const priceB = parseFloat(b.price.replace("$", ""));
      if (sortOption === "lowToHigh") return priceA - priceB;
      if (sortOption === "highToLow") return priceB - priceA;
      if (sortOption === "nameAZ") return a.name.localeCompare(b.name);
      if (sortOption === "nameZA") return b.name.localeCompare(a.name);
      return 0;
    });
  }, [sortOption]);

  const filteredProducts = useMemo(() => {
    return sortedProducts.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, sortedProducts]);

  const handleSortSelect = (option) => {
    setSortOption(option);
    setModalVisible(false);
  };

  const getSortLabel = () => {
    switch (sortOption) {
      case "lowToHigh":
        return "Price: Low → High";
      case "highToLow":
        return "Price: High → Low";
      case "nameAZ":
        return "Name: A → Z";
      case "nameZA":
        return "Name: Z → A";
      default:
        return "Sort";
    }
  };

  return (
    <ScrollView
      style={styles.container(isDarkMode)}
      showsVerticalScrollIndicator={false}
    >
      {/* Search + Sort Row */}
      <View style={styles.searchRow}>
        <View style={styles.searchContainer(isDarkMode)}>
          <Icon
            name="magnifying-glass"
            size={18}
            color={isDarkMode ? "#D1D5DB" : "#6B7280"}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput(isDarkMode)}
            placeholder="Search for products..."
            placeholderTextColor={isDarkMode ? "#9CA3AF" : "#6B7280"}
            value={search}
            onChangeText={setSearch}
            accessibilityLabel="Search products"
          />
        </View>
        <TouchableOpacity
          style={styles.sortButton(isDarkMode)}
          onPress={() => setModalVisible(true)}
          accessibilityLabel="Sort products"
        >
          <Icon
            name="sort"
            size={16}
            color="#4A90E2"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.sortText}>{getSortLabel()}</Text>
        </TouchableOpacity>
      </View>

      {/* Sorting Modal */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.modalBox(isDarkMode)}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle(isDarkMode)}>Sort By</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              accessibilityLabel="Close sort modal"
            >
              <Icon
                name="xmark"
                size={22}
                color={isDarkMode ? "#D1D5DB" : "#1A1A1A"}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => handleSortSelect("lowToHigh")}
            style={styles.optionItem}
            accessibilityLabel="Sort by price low to high"
          >
            <Text style={styles.optionText(isDarkMode)}>Price: Low → High</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSortSelect("highToLow")}
            style={styles.optionItem}
            accessibilityLabel="Sort by price high to low"
          >
            <Text style={styles.optionText(isDarkMode)}>Price: High → Low</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSortSelect("nameAZ")}
            style={styles.optionItem}
            accessibilityLabel="Sort by name A to Z"
          >
            <Text style={styles.optionText(isDarkMode)}>Name: A → Z</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSortSelect("nameZA")}
            style={styles.optionItem}
            accessibilityLabel="Sort by name Z to A"
          >
            <Text style={styles.optionText(isDarkMode)}>Name: Z → A</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Categories */}
      <Text style={styles.sectionTitle(isDarkMode)}>Categories</Text>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Animated.View
            style={{ transform: [{ scale: scaleValues[item.id] }] }}
          >
            <TouchableOpacity
              style={[
                styles.categoryCard(isDarkMode),
                selectedCategory === item.id && styles.categoryCardActive,
              ]}
              onPress={() => handleCategoryPress(item)}
              accessibilityLabel={`Select ${item.name} category`}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText(isDarkMode)}>{item.name}</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />

      {/* Products */}
      <Text style={styles.sectionTitle(isDarkMode)}>Popular Products</Text>
      {filteredProducts.length === 0 ? (
        <Text style={styles.noResults(isDarkMode)}>No products found</Text>
      ) : (
        <View style={[styles.productGrid, { paddingHorizontal: 4 }]}>
          {filteredProducts.map((item) => (
            <Animated.View
              key={item.id}
              style={{ transform: [{ scale: scaleValues[item.id] || 1 }] }}
            >
              <TouchableOpacity
                style={styles.productCard(isDarkMode)}
                onPress={() => handleProductPress(item)}
                accessibilityLabel={`View details for ${item.name}, priced at ${item.price}`}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                  resizeMode="cover"
                />
                <View style={styles.productInfo}>
                  <Text
                    style={styles.productName(isDarkMode)}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <Text style={styles.productPrice}>{item.price}</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => console.log(`Added ${item.name} to cart`)}
                    accessibilityLabel={`Add ${item.name} to cart`}
                  >
                    <Text style={styles.addText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = {
  container: (isDarkMode) => ({
    flex: 1,
    backgroundColor: isDarkMode ? "#121212" : "#F4F6F9",
    paddingHorizontal: 16,
  }),

  // 🔍 Search + Sort Row
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },
  searchContainer: (isDarkMode) => ({
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: isDarkMode ? "#1E1E1E" : "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === "ios" ? 12 : 10,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  }),
  searchIcon: {
    marginRight: 8,
  },
  searchInput: (isDarkMode) => ({
    flex: 1,
    fontSize: 16,
    color: isDarkMode ? "#E5E7EB" : "#1F2937",
  }),
  sortButton: (isDarkMode) => ({
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: isDarkMode ? "#1E1E1E" : "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  }),
  sortText: {
    fontSize: 14,
    color: "#4A90E2",
    fontWeight: "600",
  },

  // 🛍 Categories
  sectionTitle: (isDarkMode) => ({
    fontSize: 22,
    fontWeight: "700",
    marginTop: 24,
    marginBottom: 16,
    color: isDarkMode ? "#E5E7EB" : "#1A1A1A",
  }),
  categoryCard: (isDarkMode) => ({
    alignItems: "center",
    backgroundColor: isDarkMode ? "#1E1E1E" : "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginRight: 14,
    width: 90,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  }),
  categoryCardActive: {
    borderWidth: 2,
    borderColor: "#4A90E2",
  },
  categoryImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  categoryText: (isDarkMode) => ({
    fontSize: 13,
    color: isDarkMode ? "#E5E7EB" : "#1F2937",
    fontWeight: "500",
  }),

  // 🧾 Products
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    paddingBottom: 32,
  },

  productCard: (isDarkMode) => ({
    flexBasis: "48%", // keeps 2 cards per row
    backgroundColor: isDarkMode ? "#2D2D2D" : "#FFFFFF",
    borderRadius: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    overflow: "hidden",
  }),

  productImage: {
    width: "100%",
    height: 140, // reduced for better proportion
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },

  productInfo: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  productName: (isDarkMode) => ({
    fontSize: 15,
    fontWeight: "600",
    color: isDarkMode ? "#E5E7EB" : "#1A1A1A",
    marginBottom: 4,
  }),

  productPrice: {
    fontSize: 14,
    color: "#16A34A",
    fontWeight: "500",
    marginBottom: 6,
  },

  addButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 4,
  },

  addText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalBox: (isDarkMode) => ({
    backgroundColor: isDarkMode ? "#1E1E1E" : "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
    paddingBottom: 48,
  }),
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: (isDarkMode) => ({
    fontSize: 20,
    fontWeight: "700",
    color: isDarkMode ? "#E5E7EB" : "#1A1A1A",
  }),
  optionItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  optionText: (isDarkMode) => ({
    fontSize: 16,
    color: isDarkMode ? "#E5E7EB" : "#1A1A1A",
  }),
  noResults: (isDarkMode) => ({
    fontSize: 16,
    color: isDarkMode ? "#9CA3AF" : "#6B7280",
    textAlign: "center",
    marginTop: 24,
  }),
};
