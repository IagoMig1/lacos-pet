import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../../utils/supabase';
type ProductGridProps = {
  products: Product[];
  loading?: boolean;
};
export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false
}) => {
  if (loading) {
    return <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {[...Array(8)].map((_, i) => <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-square bg-gray-200 animate-pulse"></div>
            <div className="p-4">
              <div className="h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-3 w-2/3"></div>
              <div className="flex items-center justify-between">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3"></div>
                <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>)}
      </div>;
  }
  if (products.length === 0) {
    return <div className="text-center py-12">
        <h3 className="text-xl text-gray-600">Nenhum produto encontrado</h3>
      </div>;
  }
  return <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map(product => <ProductCard key={product.id} product={product} />)}
    </div>;
};