'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { client } from '@/lib/client';
import { simplifiedProduct } from '@/app/interface';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import groq from 'groq';

// Fetch search results from Sanity
async function fetchSearchResults(searchTerm: string): Promise<simplifiedProduct[]> {
  const searchQuery = groq`*[_type == "product" && (name match $searchTerm || category->name match $searchTerm)]{
    _id,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name,
    "imageUrl": image.asset->url
  }`;

  try {
    return await client.fetch<simplifiedProduct[]>(searchQuery, { searchTerm: `*${searchTerm}*` });
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
}

function SearchResultsContent({ query }: { query: string }) {
  const [results, setResults] = useState<simplifiedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getResults() {
      if (query) {
        setIsLoading(true);
        setError(null);
        try {
          const data = await fetchSearchResults(query);
          setResults(data);
        } catch (err) {
          console.error('Error fetching search results:', err); // Log error details
          setError('An error occurred while fetching results. Please try again.');
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setIsLoading(false);
      }
    }
    getResults();
  }, [query]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for &ldquo;{query}&rdquo;
      </h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <div key={product._id} className="group">
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <Link href={`/product/${product.slug}`}>
                  <Image
                    src={product.imageUrl || '/placeholder.svg'}
                    alt={product.name}
                    priority
                    className="w-full h-full object-cover object-center"
                    width={300}
                    height={300}
                  />
                </Link>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    <Link href={`/product/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.categoryName}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">
          No results found for &ldquo;{query}&rdquo;.
        </p>
      )}
    </div>
  );
}

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || ''; // Default empty string if no query

  return (
    <Suspense fallback={<div className="text-center text-gray-500">Loading...</div>}>
      <SearchResultsContent query={query} />
    </Suspense>
  );
}
