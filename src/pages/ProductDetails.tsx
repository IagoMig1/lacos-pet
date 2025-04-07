import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { getProductById, Product } from '../utils/supabase';
import { useCart } from '../context/CartContext';
import { ArrowLeftIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      setLoading(true);
      const data = await getProductById(id); // <-- Alterado aqui
      setProduct(data);
      setLoading(false);
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/carrinho');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-24 bg-gray-200 rounded mb-6"></div>
            <div className="h-12 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Produto não encontrado
          </h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center text-pink-600 hover:text-pink-700"
          >
            <ArrowLeftIcon className="mr-2 h-5 w-5" />
            Voltar para a página inicial
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="mr-2 h-5 w-5" />
          Voltar
        </button>
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Product Image */}
          <div className="mb-8 lg:mb-0">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.imagem_url}
                alt={product.nome}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {product.nome}
            </h1>
            <p className="mt-2 text-sm text-gray-500 capitalize">
              {product.categoria}
            </p>
            <div className="mt-6">
              <p className="text-3xl font-bold text-gray-900">
                R$ {product.preco.toFixed(2)}
              </p>
            </div>
            {product.descricao && (
              <div className="mt-6">
                <h2 className="text-sm font-medium text-gray-900">Descrição</h2>
                <div className="mt-2 space-y-6 text-base text-gray-700">
                  {product.descricao}
                </div>
              </div>
            )}
            <div className="mt-8">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <MinusIcon className="h-5 w-5 text-gray-600" />
                  </button>
                  <span className="px-4 py-2 text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <PlusIcon className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-pink-600 text-white py-3 px-6 rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center"
                >
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
