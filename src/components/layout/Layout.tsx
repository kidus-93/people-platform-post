
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
      <footer className="py-4 bg-white border-t border-gray-200 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Voices - Connect and share your voice
      </footer>
    </div>
  );
};

export default Layout;
