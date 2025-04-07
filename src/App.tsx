import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ProductForm } from './components/Admin/ProductForm';
import { Cart } from './pages/Cart';
import { Category } from './pages/Category';
import { ProductDetails } from './pages/ProductDetails';
export function App() {
  return <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/carrinho" element={<Cart />} />
            <Route path="/categoria/:category" element={<Category />} />
            <Route path="/produto/:id" element={<ProductDetails />} />
            <Route path="/admin" element={<ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>} />
            <Route path="/admin/produtos" element={<ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>} />
            <Route path="/admin/produtos/novo" element={<ProtectedRoute>
                  <ProductForm />
                </ProtectedRoute>} />
            <Route path="/admin/produtos/editar/:id" element={<ProtectedRoute>
                  <ProductForm />
                </ProtectedRoute>} />
          </Routes>
          <Toaster position="top-right" />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>;
}