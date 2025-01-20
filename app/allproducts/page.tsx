"use client";

import Link from "next/link";
import Image from "next/image";
import { simplifiedProduct } from "@/app/interface";
import { client } from "@/sanity/lib/client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Adjust the path based on your project
import { useEffect, useState } from "react";

// Fetch products from Sanity
async function fetchProducts(): Promise<simplifiedProduct[]> {
  const query = `*[_type == "product"]| order(_createdAt desc) {
    _id,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name,
    "imageUrl": image.asset->url
  }`;
  return await client.fetch(query);
}

export default function AllProducts() {
  const [products, setProducts] = useState<simplifiedProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<simplifiedProduct[]>([]);
  const [sortOption, setSortOption] = useState("name-asc");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
    }
    fetchData();
  }, []);

  // Filter products by category
  useEffect(() => {
    if (!selectedCategory) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.categoryName === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <div className="p-4">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            All Products
          </h2>
          <div className="flex space-x-4">
            <div className="w-44">
              <Select onValueChange={(value) => setSelectedCategory(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pots">Pots</SelectItem>
                  <SelectItem value="Ceramics">Ceramics</SelectItem>
                  <SelectItem value="Cutlery">Cutlery</SelectItem>
                  <SelectItem value="Chairs">Chairs</SelectItem>
                  <SelectItem value="Tableware">Tableware</SelectItem>
                  <SelectItem value="Tables">Tables</SelectItem>
                  <SelectItem value="Crockory">Crockory</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-44">
              <Select onValueChange={(value) => setSortOption(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                  <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {sortedProducts.map((product) => (
            <div key={product._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Link href={`/product/${product.slug}`}>
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                    width={300}
                    height={300}
                  />
                </Link>
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/product/${product.slug}`}>{product.name}</Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.categoryName}
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
