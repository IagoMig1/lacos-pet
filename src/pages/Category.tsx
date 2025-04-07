import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { ProductGrid } from '../components/Products/ProductGrid';
import { getProductsByCategory, Product } from '../utils/supabase';
import { ArrowLeftIcon } from 'lucide-react';
import { categories, getCategoryName } from '../utils/categories';
export const Category: React.FC = () => {
  const {
    category
  } = useParams<{
    category: string;
  }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadProducts = async () => {
      if (!category) return;
      setLoading(true);
      const data = await getProductsByCategory(category);
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, [category]);
  if (!category || !categories[category as keyof typeof categories]) {
    return <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Categoria não encontrada
          </h2>
          <button onClick={() => navigate('/')} className="mt-4 inline-flex items-center text-pink-600 hover:text-pink-700">
            <ArrowLeftIcon className="mr-2 h-5 w-5" />
            Voltar para a página inicial
          </button>
        </div>
      </Layout>;
  }
  return <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <button onClick={() => navigate('/')} className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {getCategoryName(category)}
          </h1>
        </div>
        <ProductGrid products={products} loading={loading} />
        {!loading && products.length === 0 && <div className="text-center py-12">
            <p className="text-gray-500">
              Nenhum produto encontrado nesta categoria.
            </p>
            <button onClick={() => navigate('/')} className="mt-4 inline-flex items-center text-pink-600 hover:text-pink-700">
              <ArrowLeftIcon className="mr-2 h-5 w-5" />
              Voltar para a página inicial
            </button>
          </div>}
      </div>
    </Layout>;
};