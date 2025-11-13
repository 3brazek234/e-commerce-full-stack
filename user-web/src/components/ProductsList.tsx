'use client';

import { useProducts, useProductsByCategory } from '../hooks';
import { useCategories } from '../hooks';

export function ProductsList() {
  const { products, isLoading, isError } = useProducts();
  const { categories } = useCategories();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2">Loading products...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-8 text-red-600">
        Error loading products. Please try again.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products?.map((product: any) => (
        <div key={product._id} className="border rounded-lg p-4 shadow-sm">
          {product.image && (
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
          )}
          <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-lg font-bold text-green-600">${product.price}</p>
          {product.category && (
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">
              {product.category.name}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export function ProductsByCategory({ categorySlug }: { categorySlug: string }) {
  const { products, isLoading, isError } = useProductsByCategory(categorySlug);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2">Loading products...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-8 text-red-600">
        Error loading products. Please try again.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products?.map((product: any) => (
        <div key={product._id} className="border rounded-lg p-4 shadow-sm">
          {product.image && (
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
          )}
          <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-lg font-bold text-green-600">${product.price}</p>
        </div>
      ))}
    </div>
  );
} 