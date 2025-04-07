import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
type LayoutProps = {
  children: React.ReactNode;
};
export const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">{children}</main>
      <Footer />
    </div>;
};