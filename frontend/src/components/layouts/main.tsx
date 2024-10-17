import React from 'react';
import Header from './header';
import Footer from './footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 mt-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
