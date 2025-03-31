"use client";

import React, { useState } from 'react';
import Image from "next/image";
import { FC } from 'react';

const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo et titre */}
            <div className="flex items-center gap-2">
              <div 
                onClick={() => window.location.reload()} 
                className="cursor-pointer transition-transform hover:scale-105"
              >
                <Image
                  src="/speacht.png"
                  alt="spEAchT Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </div>
              <div className="text-lg font-semibold">
                spEAchT <span className="text-gray-500">to your AI waiter</span>
              </div>
            </div>

            {/* Menu burger pour mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Menu desktop */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Menu
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Réservation
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Menu mobile */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4`}>
            <div className="flex flex-col gap-4 pb-3">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors px-2 py-1 rounded-md hover:bg-gray-100">
                Menu
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors px-2 py-1 rounded-md hover:bg-gray-100">
                Réservation
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors px-2 py-1 rounded-md hover:bg-gray-100">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 