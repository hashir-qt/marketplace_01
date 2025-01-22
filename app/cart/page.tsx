"use client";

import { useCart } from "@/components/CartContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { CartItem } from "../interface";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown } from "lucide-react"; // Importing the arrow icons

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  // Calculate the total cost
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const router = useRouter();

  // Check if the cart has items
  const handleCheckoutClick = () => {
    if (cart.length > 0) {
      router.push("/checkout"); // Redirect to the checkout page
    } else {
      // Optionally, show a message if the cart is empty
      alert("Your cart is empty. Please add items to the cart.");
    }
  };

  // If the cart is empty, show a message
  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-800">Your Cart is Empty</h2>
        <Link href="/" className="text-blue-600 underline mt-4">
          Back to Home
        </Link>
      </div>
    );
  }

  // Handle decreasing quantity with proper boundary check
  const handleDecrement = (item: CartItem) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  // Handle increasing quantity
  const handleIncrement = (item: CartItem) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      <div className="grid gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border p-4 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={100}
                height={100}
                className="w-[100px] h-[100px] rounded-lg object-center object-cover"
              />
              <div>
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
             
              <span className="font-bold">{item.quantity}</span>
              <div className=" flex flex-col ">
                 <Button
                onClick={() => handleIncrement(item)}
                className="bg-gray-200 h-[15px] w-[12px] text-gray-800 hover:bg-gray-300"
              >
                <ChevronUp className="h-5 w-5" />
              </Button>
              <Button
                onClick={() => handleDecrement(item)}
                className="bg-gray-200 h-[15px] w-[12px] text-gray-800 hover:bg-gray-300"
                disabled={item.quantity === 1}
              >
                <ChevronDown className="h-5 w-5" />
              </Button>
              </div>
             
            </div>

            <div>
              <p className="font-bold ml-10">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <Button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 bg-transparent hover:bg-transparent hover:underline mt-2"
              >
                Remove from Cart
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
        <div className="flex gap-4 mt-6">
          <Button
            onClick={() => {
              clearCart();
              localStorage.removeItem("cart"); // Clear cart from localStorage as well
            }}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Clear Cart
          </Button>
          <Button
            className={`${
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
