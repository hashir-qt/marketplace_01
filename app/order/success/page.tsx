"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";


export default function OrderSuccess() {


  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-4xl font-bold text-green-600">Order Successful! <CheckCheck className="text-green-600 w-16 h-16 mx-auto my-6" /></h1>
      <p className="mt-4 text-lg text-gray-600">
        Thank you for your purchase. Your order has been placed successfully.
      </p>
      <Link href="/">
        <Button className="mt-6 bg-blue-950 text-white hover:bg-blue-600">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
}
