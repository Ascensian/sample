import React, { ReactNode } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <Sidebar />
      <main className="w-full flex-1">{children}</main>
    </div>
  );
};

export default MainLayout;
