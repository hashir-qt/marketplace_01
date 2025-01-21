"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrderError() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-4xl font-bold text-red-600"> Something went wrong.</h1>
      <p className="mt-4 text-lg text-gray-600">
        Please try again.
      </p>
      <Link href="/">
        <Button className="mt-6 bg-blue-500 text-white hover:bg-blue-600">
          Try Again
        </Button>
      </Link>
    </div>
  );
}
