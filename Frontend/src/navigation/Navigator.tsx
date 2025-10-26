// src/navigation/AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/FontAwesome6";

import HomeScreen from "../Screens/Home";
import CartScreen from "../Screens/Cart";
import ProfileScreen from "../Screens/Profile";
import ProductDetail from "../Screens/productDetail";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: "#2c3e50",
      tabBarInactiveTintColor: "#95a5a6",
      tabBarStyle: { backgroundColor: "#f8f8f8", height: 60 },
      tabBarLabelStyle: { fontSize: 12, marginBottom: 5 },
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = "house";
        } else if (route.name === "Cart") {
          iconName = "cart-shopping";
        } else if (route.name === "Profile") {
          iconName = "user";
        }

        return <Icon name={iconName} size={20} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Cart" component={CartScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ headerShown: true, title: "Product Detail" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
