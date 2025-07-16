"use client"

import Link from "next/link"
import Image from "next/image"
import type { simplifiedProduct } from "@/app/interface"
import { client } from "@/lib/client"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"

// Fetch products from Sanity (unchanged)
async function fetchProducts(): Promise<simplifiedProduct[]> {
  const query = `*[_type == "product"]| order(_createdAt desc) {
    _id,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name,
    "imageUrl": image.asset->url
  }`
  return await client.fetch(query)
}

function ProductCard({ product, index }: { product: simplifiedProduct; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover object-center"
            width={300}
            height={300}
          />
        </Link>
      </motion.div>

      <motion.div
        className="mt-4 flex justify-between"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      >
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.categoryName}</p>
        </div>
        <p className="text-sm font-semibold text-gray-900">${product.price}</p>
      </motion.div>
    </motion.div>
  )
}

export default function AllProducts() {
  const [products, setProducts] = useState<simplifiedProduct[]>([])
  const [filteredProducts, setFilteredProducts] = useState<simplifiedProduct[]>([])
  const [sortOption, setSortOption] = useState("name-asc")
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    async function fetchData() {
      const data = await fetchProducts()
      setProducts(data)
      setFilteredProducts(data)
    }
    fetchData()
  }, [])

  // Filter products by category (unchanged)
  useEffect(() => {
    if (!selectedCategory) {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter((product) => product.categoryName === selectedCategory))
    }
  }, [selectedCategory, products])

  // Sort products (unchanged)
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="p-4">
      <div>
        <div className="flex justify-between items-center">
          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            All Products
          </motion.h2>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="w-full sm:w-44">
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

            <div className="w-full sm:w-44 ">
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

        <motion.div layout className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <AnimatePresence>
            {sortedProducts.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}

