"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, Truck } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import RelatedProducts from "@/components/RelatedProducts"; // Import the new component

interface FullProduct {
  _id: string;
  imageUrl: string;
  price: number;
  name: string;
  description: string;
  slug: string;
  categoryName: string;
  price_id: string;
}

async function getProductData(slug: string) {
  const query = `{
    "product": *[_type == "product" && slug.current == "${slug}"][0] {
      _id,
      "imageUrl": image.asset->url,
      price,
      name,
      description,
      "slug": slug.current,
      "categoryName": category->name,
      price_id
    }
  }`;

  const data = await client.fetch(query);
  return data;
}

export const dynamic = "force-dynamic";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [productData, setProductData] = useState<{ product: FullProduct } | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getProductData(params.slug);
      setProductData(data);
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

  return (
    <div className="mb-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-t-lg bg-gray-100">
            <Image
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name || "Product Image"}
              width={400}
              height={400}
              className="w-[550px] h-[550px] object-cover object-center"
            />
            <span className="absolute right-12 top-0 rounded-b-lg bg-red-500 px-3 font-semibold py-1.5 text-sm uppercase tracking-wider text-white">
              Up to 50% Off
            </span>
          </div>

          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {product.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {product.name}
              </h2>
            </div>

            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <Button className="rounded-full gap-x-2">
                <span className="text-sm">4.2</span>
                <Star className="h-5 w-5" />
              </Button>
              <span className="text-sm text-gray-500">56 Ratings</span>
            </div>

            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  ${product.price.toFixed(2)}
                </span>
                <span className="mb-0.5 text-red-500 line-through">
                  ${(product.price * 2).toFixed(2)}
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
              <Button size="lg" className="bg-green-400  text-white hover:bg-gray-100">
                Add to Cart
              </Button>
              <Button size="lg" className="text-white  border-white hover:bg-green/10">
                Buy Now
              </Button>
            </div>

            <p className="mt-12 text-base text-gray-500 tracking-wide">
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
