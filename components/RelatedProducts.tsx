"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { client } from "@/lib/client"
import { motion } from "framer-motion"

interface RelatedProduct {
  slug: string
  imageUrl: string
  name: string
  price: number
  categoryName: string
}

interface RelatedProductsProps {
  categoryName: string
  currentSlug: string
}

export default function RelatedProducts({ categoryName, currentSlug }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([])

  useEffect(() => {
    async function fetchRelatedProducts() {
      const query = `*[_type == "product" && category->name == "${categoryName}" && slug.current != "${currentSlug}"][0...4] {
        "slug": slug.current,
        "imageUrl": image.asset->url,
        name,
        price,
        "categoryName": category->name
      }`

      const data = await client.fetch(query)
      setRelatedProducts(data)
    }

    fetchRelatedProducts()
  }, [categoryName, currentSlug])

  return (
    <motion.div
      className="mt-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3
        className="text-xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Related Products
      </motion.h3>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="show"
      >
        {relatedProducts.map((relatedProduct, index) => (
          <motion.div
            key={relatedProduct.slug}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Link href={`/product/${relatedProduct.slug}`} className="group block">
              <motion.div
                className="aspect-square overflow-hidden rounded-lg bg-gray-100"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={relatedProduct.imageUrl || "/placeholder.svg"}
                  alt={relatedProduct.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity"
                />
              </motion.div>
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-700">{relatedProduct.name}</p>
                <p className="text-sm font-medium text-gray-900">${relatedProduct.price.toFixed(2)}</p>
              </div>
              <p className="mt-1 text-sm text-gray-500">{relatedProduct.categoryName}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

