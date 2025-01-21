// components/RelatedProducts.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

interface RelatedProduct {
  slug: string;
  imageUrl: string;
  name: string;
  price: number;
  categoryName: string;
}

interface RelatedProductsProps {
  categoryName: string;
  currentSlug: string;
}

export default function RelatedProducts({ categoryName, currentSlug }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);

  useEffect(() => {
    async function fetchRelatedProducts() {
      const query = `*[_type == "product" && category->name == "${categoryName}" && slug.current != "${currentSlug}"][0...4] {
        "slug": slug.current,
        "imageUrl": image.asset->url,
        name,
        price,
         "categoryName": category->name

      }`;

      const data = await client.fetch(query);
      setRelatedProducts(data);
    }

    fetchRelatedProducts();
  }, [categoryName, currentSlug]);

  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold mb-4">Related Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {relatedProducts.map((relatedProduct) => (
          <Link key={relatedProduct.slug} href={`/product/${relatedProduct.slug}`} className="group">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={relatedProduct.imageUrl || "/placeholder.svg"}
                alt={relatedProduct.name}
                width={200}
                height={200}
                className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity"
              />
            </div>
            <div className="flex justify-between"> <p className="mt-2 text-sm text-gray-700">{relatedProduct.name}</p>
            <p className="mt-2 text-sm font-medium text-gray-900">${relatedProduct.price.toFixed(2)}</p></div>
           
            <p className="mt-1 text-sm text-gray-500">
                    {relatedProduct.categoryName}
                  </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
