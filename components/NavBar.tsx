"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingCart, UserCircle, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/components/CartContext"; // Import the useCart hook

const links = [
  { name: "Pots", href: "/Pots" },
  { name: "Chairs", href: "/Chairs" },
  { name: "Tables", href: "/Tables" },
  { name: "Ceramics", href: "/Ceramics" },
  { name: "Crockory", href: "/Crockory" },
  { name: "Cutlery", href: "/Cutlery" },
  { name: "Tableware", href: "/Tableware" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useCart(); // Get cart from context
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  // Calculate the total number of unique products in the cart
  const cartItemCount = cart.length; // Count the number of unique products in the cart

  return (
    <nav className="border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Avion
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About Us</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
            </div>
          </div>
          <div className="hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="icon" className="absolute right-0 top-0">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Link href="/cart">
                <div className="relative">
                  <ShoppingCart  />
                  {cartItemCount > 0 && (
                    <span className="absolute bottom-3 left-3 text-[8px] font-bold rounded-full text-white bg-red-600 px-2">
                      {cartItemCount}
                    </span>
                  )}
                </div>
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <UserCircle className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Link href="/cart">
                <div className="relative">
                  <ShoppingCart  />
                  {cartItemCount > 0 && (
                    <span className="absolute bottom-3 left-3 text-[8px] font-bold rounded-full text-white bg-red-600 px-2">
                      {cartItemCount}
                    </span>
                  )}
                </div>
              </Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-20">
                  <div className="mt-6 flex flex-col space-y-4">
                    <h1 className="text-2xl">Categories</h1>
                    {links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`text-base ${pathname === link.href ? "font-semibold text-blue-950" : "font-medium text-gray-600 hover:text-gray-900"}`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                  <div className="flex flex-col space-y-4">
                    <UserCircle />
                    <Link href="/about" className="text-gray-600 border-b border-spacing-1 hover:text-gray-900">About Us</Link>
                    <Link href="/contact" className="text-gray-600 border-b border-spacing-1 hover:text-gray-900">Contact</Link>
                    <Link href="/blog" className="text-gray-600 border-b border-spacing-1 hover:text-gray-900">Blog</Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <div className="hidden md:flex justify-center py-3 border-t">
        <div className="flex space-x-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base ${pathname === link.href ? "font-semibold text-blue-950" : "font-medium text-gray-600 hover:text-gray-900"}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-4 w-full max-w-md">
            <form onSubmit={handleSearch} className="flex items-center">
              <Input
                type="text"
                placeholder="Search products..."
                className="flex-grow"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <Button type="submit" className="ml-2">
                Search
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="ml-2"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}
