"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-cyan-500  text-white shadow-md sticky top-0 border-amber-300">
      <div className="container border-amber-300 mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <Image 
            src="/images/logo-light-styled.png" 
            alt="Naga Apparel Logo" 
            width={40} 
            height={40} 
            className="rounded-full"
          />
          <div>
            <span className="text-2xl font-bold text-blue m-4">Study Guide</span>
            <span className="text-xl"></span>
          </div>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md hover:bg-blue-800 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/modules" className="hover:text-black transition-colors">
            Modules
          </Link>
          <Link href="/labs" className="hover:text-blacktransition-colors">
            Labs
          </Link>
          <Link href="/qa-board" className="hover:text-black transition-colors">
            Q&A Board
          </Link>
          <Link href="/resources" className="hover:text-black transition-colors">
            Resources
          </Link>
        </nav>

        {/* User actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/" className="px-4 py-2 rounded-md bg-yellow-500 hover:bg-blue-600 transition-colors">
            Login
          </Link>
          <Link href="/" className="px-4 py-2 rounded-md bg-yellow-500 hover:bg-cyan-400 transition-colors">
            Register
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800 px-4 py-2">
          <nav className="flex flex-col space-y-3 py-3">
            <Link href="/modules" className="hover:text-cyan-300 transition-colors">
              Modules
            </Link>
            <Link href="/labs" className="hover:text-cyan-300 transition-colors">
              Labs
            </Link>
            <Link href="/qa-board" className="hover:text-cyan-300 transition-colors">
              Q&A Board
            </Link>
            <Link href="/resources" className="hover:text-cyan-300 transition-colors">
              Resources
            </Link>
            <div className="flex flex-col space-y-2 pt-3 border-t border-blue-700">
              <Link href="/login" className="px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-600 transition-colors text-center">
                Login
              </Link>
              <Link href="/register" className="px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-400 transition-colors text-center">
                Register
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
