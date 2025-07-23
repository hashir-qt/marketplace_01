"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode
} from "react";
import { useUser } from "@clerk/clerk-react"; // Clerk authentication
import { CartItem } from "@/app/interface";

// Constant for localStorage key
const LOCAL_STORAGE_KEY = "cart";

// Cart context type definition
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

// Create the CartContext
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component to wrap your app
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedCartJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedCartJSON) {
          setCart(JSON.parse(storedCartJSON));
        }
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
      }
    }
  }, []);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
      }
    }
  }, [cart]);

  // Add an item to the cart (only if user is logged in)
  const addToCart = useCallback((item: CartItem) => {
    if (!user) {
      // TODO: Replace with UI notification/toast
      console.log("You need to be logged in to add items to the cart.");
      return;
    }
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Update quantity if item already exists
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      // Add new item
      return [...prevCart, item];
    });
  }, [user]);

  // Remove an item from the cart by ID
  const removeFromCart = useCallback((id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }, []);

  // Update the quantity of a specific item
  const updateQuantity = useCallback((id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  }, []);

  // Clear the entire cart
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Provide cart state and actions to children
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
