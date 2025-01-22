"use client";

import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { usePathname } from 'next/navigation'



const Footer = () => {
    const links = [
    { name: "Pots", href: "/Pots" },
    { name: "Chairs", href: "/Chairs" },
    { name: "Tables", href: "/Tables" },
    { name: "Ceramics", href: "/Ceramics" },
    { name: "Crockory", href: "/Crockory" },
    { name: "Cutlery", href: "/Cutlery" },
    { name: "Tableware", href: "/Tableware" },
  ];
  const pathname = usePathname();

  return (
    <footer className="bg-gray-900 text-gray-300" >
      <div className="container mx-auto max-w-2xl lg:max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Avion</span>
            </Link>
            <p className="text-sm mb-4">Your one-stop shop for all your needs. Quality products, great prices, and excellent customer service.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h2 className="mb-4 text-lg  font-semibold text-white">Categories</h2>
            <ul className="space-y-2 flex flex-col text-white">
            {links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`text-base ${
                          pathname === link.href
                            ? "font-semibold text-gray-400"
                            : "font-medium text-gray-100 hover:text-white"
                        }`}
                      >
                        {link.name}
                      </Link>
                      ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-white transition-colors duration-300">About Us</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors duration-300">All Products</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors duration-300">Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors duration-300">Contact Us</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors duration-300">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">Contact Us</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <p>123 USA St, Digital City, 12345</p>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <a href="mailto:hashirhussain322@fmail.com" className="hover:text-white transition-colors duration-300">infoavion.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <a href="tel:+11234567890" className="hover:text-white transition-colors duration-300">(123) 456-7890</a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Newsletter Signup */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold text-white mb-2">Stay Updated</h2>
            <p className="text-sm">Subscribe to our newsletter for the latest updates and offers.</p>
          </div>
          <form className="flex w-full md:w-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded-r-none bg-gray-800 border-gray-700 text-white"
            />
            <Button type="submit" className="rounded-l-none">
              Subscribe
            </Button>
          </form>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} YourStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer