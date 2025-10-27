// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CartProvider, useCart } from "./context/CartContext";

// Screens
import LoginScreen from "./Screens/LoginScreen.tsx";
import SignupScreen from "./Screens/SignupScreen.tsx";
import ForgotPassword from "./Screens/ForgotPassword.tsx";
import HomeScreen from "./Screens/HomeScreen.tsx";
import CartScreen from "./Screens/CartScreen.tsx";
import ProfileScreen from "./Screens/ProfileScreen.tsx";
import ProductDetail from "./Screens/ProductDetail.tsx";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// BottomTabs component reads cart to show badge count
function BottomTabs() {
  const { cart } = useCart(); // get cart from context
  const cartCount = cart?.reduce((sum, it) => sum + (it.quantity || 0), 0) || 0;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 60,
          borderTopWidth: 0.5,
          borderTopColor: "#ccc",
        },
        // tabBarIcon receives focused, color, size
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size ?? 24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          // show small badge when cartCount > 0
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Auth Screens */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

          {/* Main Tabs */}
          <Stack.Screen name="Main" component={BottomTabs} />

          {/* Product Detail (opens above tabs) */}
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
