// src/context/CartContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load persisted cart on mount
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem("@cart");
        if (raw) setCart(JSON.parse(raw));
      } catch (e) {
        console.warn("Failed to load cart", e);
      }
    })();
  }, []);

  // Persist cart on change
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem("@cart", JSON.stringify(cart));
      } catch (e) {
        console.warn("Failed to save cart", e);
      }
    })();
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, quantity } : p)),
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
