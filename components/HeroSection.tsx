import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { client, urlFor } from '@/lib/client'
import NewArrivals from './NewArrivals'
import Link from 'next/link'

async function getData() {
  const query = "*[_type == 'heroImage'][0]"
  const data = await client.fetch(query)
  return data
}

export default async function Hero() {
  const data = await getData()
  
  return (
    <div>
    <section className="relative bg-gradient-to-br from-blue-950 to-indigo-800 text-white overflow-hidden">
      <div className="absolute inset-0 mix-blend-overlay opacity-20">
        <Image
          src={urlFor(data.image1).url() || "/placeholder.svg"}
          alt="Background texture"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Discover Unique
              <span className="block mt-2 text-green-300">Home Decor & Furniture</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-lg">
              Elevate your space with our curated collection of premium products from independent artisans worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/allproducts">
              <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 ">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              </Link>
              <Link href="/allproducts">
              <Button size="lg" className="text-white bg-green-300  border-white hover:bg-white/10">
                Explore Collections
              </Button>
              </Link>
            </div>
          </div>
          <div className="mt-8 md:mt-0">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <Image
                src={urlFor(data.image1).url() || "/placeholder.svg"}
                alt="Featured collection"
                fill
                className="object-cover rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
         
        </div>
        
      </div>
      
    </section>
    <NewArrivals/>
    </div>
  )
}