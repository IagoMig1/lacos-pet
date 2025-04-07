import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
type ProtectedRouteProps = {
  children: React.ReactNode;
};
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children
}) => {
  const {
    isAdmin
  } = useAuth();
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};