"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false); // State to check if it's on the client

  // Check if the component is mounted (client-side)
  useEffect(() => {
    setIsClient(true); // This ensures we only run the logic on the client
  }, []);

  // Load cart from localStorage on client-side only
  useEffect(() => {
    if (isClient) {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, [isClient]);

  // Save cart to localStorage when it changes (client-side only)
  useEffect(() => {
    if (isClient) {
      if (cart.length > 0) {
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        localStorage.removeItem("cart"); // Remove cart from localStorage if it's empty
      }
    }
  }, [cart, isClient]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += item.quantity;
        return updatedCart;
      }
      return [...prevCart, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  if (!isClient) {
    return <div>Loading...</div>; // Prevent rendering until client-side is ready
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
