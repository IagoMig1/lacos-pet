import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon, UserIcon, MenuIcon, XIcon } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { categories } from '../../utils/categories';
export const Header: React.FC = () => {
  const {
    totalItems
  } = useCart();
  const {
    user,
    isAdmin
  } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const categoryList = Object.values(categories);
  return <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-pink-600">
              Laços Pet da Gabi
            </h1>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-pink-600 font-medium">
              Home
            </Link>
            {categoryList.map(category => <Link key={category.slug} to={`/categoria/${category.slug}`} className="text-gray-700 hover:text-pink-600 font-medium">
                {category.name}
              </Link>)}
          </nav>
          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            {isAdmin && <Link to="/admin" className="text-gray-700 hover:text-pink-600">
                <UserIcon size={24} />
              </Link>}
            {!user && <Link to="/login" className="text-gray-700 hover:text-pink-600">
                <UserIcon size={24} />
              </Link>}
            <Link to="/carrinho" className="text-gray-700 hover:text-pink-600 relative">
              <ShoppingBagIcon size={24} />
              {totalItems > 0 && <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>}
            </Link>
            {/* Mobile menu button */}
            <button className="md:hidden text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {mobileMenuOpen && <nav className="md:hidden mt-4 py-2 border-t border-gray-200">
            <ul className="flex flex-col space-y-2">
              <li>
                <Link to="/" className="block py-2 text-gray-700 hover:text-pink-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
              </li>
              {categoryList.map(category => <li key={category.slug}>
                  <Link to={`/categoria/${category.slug}`} className="block py-2 text-gray-700 hover:text-pink-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                    {category.name}
                  </Link>
                </li>)}
            </ul>
          </nav>}
      </div>
    </header>;
};