
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="py-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
