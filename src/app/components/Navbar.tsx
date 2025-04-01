"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { FC } from 'react';

const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-cream shadow-elegant' : 'bg-cream/90 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo et titre */}
            <div className="flex items-center gap-3">
              <Link href="/" className="cursor-pointer transition-transform hover:scale-105">
                <Image
                  src="/speacht.png"
                  alt="spEAchT Logo"
                  width={36}
                  height={36}
                  className="w-9 h-9"
                />
              </Link>
              <div>
                <div className="text-xl font-serif font-medium text-dark-wood tracking-wide">
                  spEAchT
                </div>
                <div className="text-xs text-gray-600 hidden sm:block -mt-1 font-light">
                  votre garçon de café IA
                </div>
              </div>
            </div>

            {/* Menu burger pour mobile */}
            <div className="md:hidden flex items-center gap-3">
              <Link 
                href="/?agentConfig=defaultAgentSet" 
                className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                aria-label="AI Waiter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
                </svg>
              </Link>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-sm hover:bg-primary/5 focus:outline-none focus:ring-1 focus:ring-primary/20"
                aria-expanded={isMenuOpen}
                aria-label="Menu principal"
              >
                <svg
                  className="w-6 h-6 text-dark-wood"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Menu desktop */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/menu" className="text-dark-wood hover:text-primary transition-colors text-sm uppercase tracking-wide font-medium">
                Menu
              </Link>
              <Link href="/reservation" className="text-dark-wood hover:text-primary transition-colors text-sm uppercase tracking-wide font-medium">
                Réservation
              </Link>
              <Link href="/contact" className="text-dark-wood hover:text-primary transition-colors text-sm uppercase tracking-wide font-medium">
                Contact
              </Link>
              <Link 
                href="/?agentConfig=defaultAgentSet" 
                className="flex items-center gap-1.5 px-5 py-2 rounded-sm bg-primary text-white hover:bg-primary-light transition-colors text-sm uppercase tracking-wide font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
                </svg>
                AI Garçon
              </Link>
            </div>
          </div>

          {/* Menu mobile */}
          <div 
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
            }`}
          >
            <div className="flex flex-col gap-2 pb-3">
              <Link 
                href="/menu" 
                className="text-dark-wood hover:text-primary transition-colors px-2 py-2.5 rounded-sm hover:bg-primary/5 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <span className="text-sm uppercase tracking-wide font-medium">Menu</span>
              </Link>
              <Link 
                href="/reservation" 
                className="text-dark-wood hover:text-primary transition-colors px-2 py-2.5 rounded-sm hover:bg-primary/5 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <span className="text-sm uppercase tracking-wide font-medium">Réservation</span>
              </Link>
              <Link 
                href="/contact" 
                className="text-dark-wood hover:text-primary transition-colors px-2 py-2.5 rounded-sm hover:bg-primary/5 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="text-sm uppercase tracking-wide font-medium">Contact</span>
              </Link>
              <Link 
                href="/?agentConfig=defaultAgentSet" 
                className="text-white bg-primary hover:bg-primary-light transition-colors px-2 py-2.5 rounded-sm flex items-center mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-3">
                  <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
                </svg>
                <span className="text-sm uppercase tracking-wide font-medium">AI Garçon</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 