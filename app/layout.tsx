import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";
import { CartProvider } from "@/components/CartContext";
import Footer from "@/components/Footer";
import {
  ClerkProvider,
} from '@clerk/nextjs'


const poppins = Poppins({ 
  weight:'500', subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <CartProvider>
          <Navbar />
          <main className="mx-auto max-w-2xl py-5 px-4 sm:px-6 lg:max-w-7xl">
           
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
