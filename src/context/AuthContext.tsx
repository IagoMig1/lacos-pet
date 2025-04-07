import React, { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from '../utils/supabase';
type User = {
  email: string;
};
type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<{
    success: boolean;
    message: string;
  }>;
  logout: () => void;
  isAdmin: boolean;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    // Check for stored user on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAdmin(true);
    }
  }, []);
  const login = async (email: string, password: string) => {
    // For this specific implementation, we're using fixed credentials
    if (email === 'ju.emilly15@gmail.com' && password === 'J150706J') {
      const user = {
        email
      };
      setUser(user);
      setIsAdmin(true);
      localStorage.setItem('user', JSON.stringify(user));
      return {
        success: true,
        message: 'Login successful'
      };
    }
    return {
      success: false,
      message: 'Invalid credentials'
    };
  };
  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
  };
  return <AuthContext.Provider value={{
    user,
    login,
    logout,
    isAdmin
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};