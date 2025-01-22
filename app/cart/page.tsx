"use client";

import { useCart } from "@/components/CartContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { CartItem } from "../interface";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const router = useRouter();

  const handleCheckoutClick = () => {
    if (cart.length > 0) {
      router.push("/checkout");
    } else {
      alert("Your cart is empty. Please add items to the cart.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-800">Your Cart is Empty</h2>
        <Link href="/" className="text-blue-600 underline mt-4 inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  const handleDecrement = (item: CartItem) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrement = (item: CartItem) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      <div className="grid gap-4 sm:gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center sm:justify-between border p-4 rounded-lg"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 sm:mb-0">
              <Image
                src={item.imageUrl || "/placeholder.svg"}
                alt={item.name}
                width={100}
                height={100}
                className="w-[100px] h-[100px] rounded-lg object-center object-cover"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <span className="font-bold">{item.quantity}</span>
              <div className="flex flex-row sm:flex-col">
                <Button
                  onClick={() => handleIncrement(item)}
                  className="bg-gray-200 h-8 w-8 sm:h-6 sm:w-6 text-gray-800 hover:bg-gray-300"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleDecrement(item)}
                  className="bg-gray-200 h-8 w-8 sm:h-6 sm:w-6 text-gray-800 hover:bg-gray-300"
                  disabled={item.quantity === 1}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="text-center sm:text-right">
              <p className="font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <Button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 bg-transparent hover:bg-transparent hover:underline mt-2"
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Total:</h2>
          <p className="text-xl font-bold">${total.toFixed(2)}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button
            onClick={() => {
              clearCart();
              localStorage.removeItem("cart");
            }}
            className="bg-red-500 text-white hover:bg-red-600 w-full sm:w-auto"
          >
            Clear Cart
          </Button>
          <Button
            className={`w-full sm:w-auto ${
              cart.length === 0
                ? "bg-gray-300 text-gray-600"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
            disabled={cart.length === 0}
            onClick={handleCheckoutClick}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}