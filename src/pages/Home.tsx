import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { ProductGrid } from '../components/Products/ProductGrid';
import { getProducts, Product } from '../utils/supabase';
import { categories } from '../utils/categories';
export const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const allProducts = await getProducts();
      setProducts(allProducts);
      // Select some random products as featured
      if (allProducts.length > 0) {
        const randomProducts = [...allProducts].sort(() => 0.5 - Math.random()).slice(0, Math.min(4, allProducts.length));
        setFeaturedProducts(randomProducts);
      }
      setLoading(false);
    };
    loadProducts();
  }, []);
  return <Layout>
      {/* Hero Section */}
      <section className="bg-pink-100 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-pink-700 mb-4">
                Estilo e conforto para o seu pet
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Acessórios exclusivos e de qualidade para deixar seu pet ainda
                mais especial.
              </p>
              <a href="#produtos" className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300">
                Ver produtos
              </a>
            </div>
            <div className="md:w-1/2">
            <img
                src="/imagens/logo/logo.png"
                alt="Cachorro fofo com laço"
                className="rounded-full shadow-lg w-80 h-80 object-cover mx-auto"
            />

            </div>
          </div>
        </div>
      </section>
      {/* Featured Products Section */}
      <section className="py-12" id="produtos">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Produtos em Destaque
          </h2>
          <ProductGrid products={featuredProducts} loading={loading} />
          <div className="text-center mt-8">
            <a href="#todas-categorias" className="inline-block border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300">
              Ver todos os produtos
            </a>
          </div>
        </div>
      </section>
      {/* Categories Section */}
      <section className="py-12 bg-gray-50" id="todas-categorias">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Todas as Categorias
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.values(categories).map(category => <Link key={category.slug} to={`/categoria/${category.slug}`} className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-square overflow-hidden">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                </div>
                <div className="p-4 bg-white text-center">
                  <h3 className="text-lg font-medium text-gray-800">
                    {category.name}
                  </h3>
                </div>
              </Link>)}
          </div>
        </div>
      </section>
      {/* All Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Todos os Produtos
          </h2>
          <ProductGrid products={products} loading={loading} />
        </div>
      </section>
    </Layout>;
};