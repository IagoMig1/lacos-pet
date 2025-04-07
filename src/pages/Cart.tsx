import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { useCart } from '../context/CartContext';
import { MinusIcon, PlusIcon, TrashIcon, ShoppingBagIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
export const Cart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    checkoutViaWhatsApp
  } = useCart();
  if (cart.length === 0) {
    return <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-4 text-lg font-medium text-gray-900">
              Seu carrinho está vazio
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Adicione alguns produtos ao seu carrinho para continuar comprando.
            </p>
            <Link to="/" className="mt-6 inline-block bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors">
              Continuar Comprando
            </Link>
          </div>
        </div>
      </Layout>;
  }
  return <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Seu Carrinho</h1>
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cart.map(item => <li key={item.product.id} className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row">
                      {/* Product Image */}
                      <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0">
                        <img src={item.product.imagem_url} alt={item.product.nome} className="w-full h-full object-cover rounded-lg" />
                      </div>
                      {/* Product Details */}
                      <div className="flex-1 sm:ml-6">
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div>
                            <h3 className="text-base font-medium text-gray-900">
                              {item.product.nome}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 capitalize">
                              {item.product.categoria}
                            </p>
                          </div>
                          <div className="mt-4 sm:mt-0">
                            <p className="text-lg font-medium text-gray-900">
                              R${' '}
                              {(item.product.preco * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        {/* Quantity Controls */}
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 rounded-full hover:bg-gray-100">
                              <MinusIcon className="h-5 w-5 text-gray-500" />
                            </button>
                            <span className="text-gray-700 w-8 text-center">
                              {item.quantity}
                            </span>
                            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 rounded-full hover:bg-gray-100">
                              <PlusIcon className="h-5 w-5 text-gray-500" />
                            </button>
                          </div>
                          <button onClick={() => removeFromCart(item.product.id)} className="text-red-600 hover:text-red-800 flex items-center">
                            <TrashIcon className="h-5 w-5" />
                            <span className="ml-1 text-sm">Remover</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>)}
              </ul>
            </div>
          </div>
          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Resumo do Pedido
              </h2>
              <div className="flow-root">
                <dl className="-my-4 text-sm divide-y divide-gray-200">
                  {cart.map(item => <div key={item.product.id} className="py-4 flex justify-between">
                      <dt className="text-gray-600">
                        {item.quantity}x {item.product.nome}
                      </dt>
                      <dd className="text-gray-900 font-medium">
                        R$ {(item.product.preco * item.quantity).toFixed(2)}
                      </dd>
                    </div>)}
                  <div className="py-4 flex justify-between">
                    <dt className="text-base font-medium text-gray-900">
                      Total
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      R$ {totalPrice.toFixed(2)}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="mt-6 space-y-4">
                <button onClick={checkoutViaWhatsApp} className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg hover:bg-pink-700 transition-colors">
                  Finalizar Pedido via WhatsApp
                </button>
                <Link to="/" className="w-full block text-center border-2 border-pink-600 text-pink-600 py-3 px-4 rounded-lg hover:bg-pink-50 transition-colors">
                  Continuar Comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>;
};