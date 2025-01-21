"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, Truck } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/client";
import RelatedProducts from "@/components/RelatedProducts"; // Import the new component
import { fullProduct } from "@/app/interface";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/hooks/use-toast";

async function getProductData(slug: string) {
  const query = `{
    "product": *[_type == "product" && slug.current == "${slug}"][0] {
      _id,
      "imageUrl": image.asset->url,
      price,
      name,
      description,
      quantity,
      "slug": slug.current,
      "categoryName": category->name,
    }
  }`;

  const data = await client.fetch(query);
  return data;
}

export const dynamic = "force-dynamic";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [productData, setProductData] = useState<{ product: fullProduct } | null>(null);
  const [quantity, setQuantity] = useState(1); // Quantity for the current product
  const { cart, addToCart } = useCart();

  const { toast } = useToast();

  // Fetch product data on initial load and when slug changes
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProductData(params.slug);
        setProductData(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }
    fetchData();
  }, [params.slug]);

  if (!productData) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-800">Loading...</h2>
      </div>
    );
  }

  const { product } = productData;

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-800">Product Not Found</h2>
        <Link href="/" className="text-blue-600 underline">
          Back to Home
        </Link>
      </div>
    );
  }

  // Function to handle adding to cart (only once)
  const handleAddToCart = () => {
    // Check if item already exists in cart
    const existingItem = cart.find((item) => item.id === product._id);

    if (!existingItem) {
      // If item is not in the cart, add it
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1, // Always add 1 item to the cart
        imageUrl: product.imageUrl,
      });
      alert("Added to cart successfully")
    } else {
      alert("This item is already in the cart.");
    }
  };
 

  const increaseQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

   
  };



  return (
    <div className="mb-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-t-lg bg-gray-100">
            <Image
              src={product.imageUrl}
              alt={product.name}
              priority
              width={550}
              height={550}
              className="w-[550px] h-[550px] object-cover object-center"
            />
            <span className="absolute right-12 top-0 rounded-b-lg bg-red-500 px-3 font-semibold py-1.5 text-sm uppercase tracking-wider text-white">
              Up to 50% Off
            </span>
          </div>

          <div className="md:py-6">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {product.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {product.name}
              </h2>
            </div>

            <div className="mb-4 flex items-center gap-3 md:mb-8">
              <Button className="rounded-full gap-x-2">
                <span className="text-sm">4.2</span>
                <Star className="h-5 w-5" />
              </Button>
              <span className="text-sm text-gray-500">56 Ratings</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <Button
                onClick={decreaseQuantity}
                className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                disabled={quantity === 1}
              >
                -
              </Button>
              <span className="text-lg font-bold text-gray-800">{quantity}</span>
              <Button
                onClick={increaseQuantity}
                className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                disabled={quantity === product.quantity}
              >
                +
              </Button>
              <div className="text-sm text-gray-500">
                {product.quantity} item(s) in stock
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  ${(product.price * quantity).toFixed(2)}
                </span>
                <span className="mb-0.5 text-red-500 line-through">
                  ${(product.price * quantity * 2).toFixed(2)}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                Incl. VAT plus shipping
              </span>
            </div>

            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" />
              <span className="text-sm">2-4 Day Shipping</span>
            </div>
            <div className="flex gap-3">
              <Button
                size="lg"
                className="bg-green-400 text-white hover:bg-green-200"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>

              <Button size="lg" className="text-white border-white hover:bg-green/10">
                Buy Now
              </Button>
            </div>

            <p className="mt-8 text-base text-gray-500 tracking-wide">
              {product.description}
            </p>
          </div>
        </div>

        {/* Use the RelatedProducts component */}
        <RelatedProducts categoryName={product.categoryName} currentSlug={product.slug} />
      </div>
    </div>
  );
}
