"use client"

import { useState, useEffect } from "react"
import type { simplifiedProduct } from "@/app/interface"
import Link from "next/link"
import Image from "next/image"
import { client } from "@/lib/client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"

async function getData(category: string) {
  const query = `*[_type == "product" && category->name == "${category}"] {
    _id,
    "imageUrl": image.asset->url,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name
  }`

  const data = await client.fetch(query)
  return data
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [products, setProducts] = useState<simplifiedProduct[]>([])
  const [sortOption, setSortOption] = useState("name-asc")

  useEffect(() => {
    async function fetchData() {
      const data = await getData(params.category)
      setProducts(data)
    }
    fetchData()
  }, [params.category])

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "name-asc":
        return a.name.localeCompare(b.name)
      case "name-desc":
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })

  return (
    <div className="mb-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:mb-0">{params.category}</h2>
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
        </motion.div>

        <motion.div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product._id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Link href={`/product/${product.slug}`}>
                  <Image
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={`Product image of ${product.name}`}
                    className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                    width={300}
                    height={300}
                  />
                </Link>
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/product/${product.slug}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.categoryName}</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">${product.price}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

