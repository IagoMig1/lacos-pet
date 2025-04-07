import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from 'lucide-react';
import { Product } from '../../utils/supabase';
import { useCart } from '../../context/CartContext';
type ProductCardProps = {
  product: Product;
};
export const ProductCard: React.FC<ProductCardProps> = ({
  product
}) => {
  const {
    addToCart
  } = useCart();
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };
  return <Link to={`/produto/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1">
        <div className="aspect-square overflow-hidden">
        <img src={product.imagem_url} alt={product.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-1 truncate">
            {product.nome}
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-pink-600">
              R$ {product.preco.toFixed(2)}
            </span>
            <button onClick={handleAddToCart} className="bg-pink-100 text-pink-600 p-2 rounded-full hover:bg-pink-600 hover:text-white transition-colors duration-300" aria-label="Adicionar ao carrinho">
              <ShoppingCartIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </Link>;
};