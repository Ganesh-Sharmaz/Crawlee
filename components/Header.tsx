import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-4 max-w-6xl flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            className="text-blue-500 mr-2"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
          <span className="text-xl font-bold text-white tracking-tight">Crawlee</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link 
                href="/features" 
                className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
              >
                Features
              </Link>
            </li>
            <li>
              <Link 
                href="/pricing" 
                className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>

        {/* Authentication & Mobile Menu */}
        <div className="flex items-center space-x-4 justify-center  ">
          {/* Sign In / Sign Up */}
          <div className="hidden md:flex space-x-3">
            <Link 
              href="/" 
              className="text-gray-300 py-2 hover:text-white transition-colors duration-300 font-medium"
            >
              Log In
            </Link>
            <Link 
              href="/signup" 
              className="bg-blue-600 text-white px-4 py-2 text-center flex items-center rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm font-semibold"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M18 6L6 18"/>
                <path d="M6 6l12 12"/>
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M3 12h18"/>
                <path d="M3 6h18"/>
                <path d="M3 18h18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900 z-40 pt-16">
          <nav className="px-4">
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/features" 
                  className="block text-2xl text-gray-300 hover:text-white py-2"
                  onClick={toggleMenu}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link 
                  href="/pricing" 
                  className="block text-2xl text-gray-300 hover:text-white py-2"
                  onClick={toggleMenu}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="block text-2xl text-gray-300 hover:text-white py-2"
                  onClick={toggleMenu}
                >
                  About
                </Link>
              </li>
              <li className="pt-6 space-y-4">
                <Link 
                  href="/login" 
                  className="block text-lg text-gray-400 hover:text-white py-2"
                  onClick={toggleMenu}
                >
                  Log In
                </Link>
                <Link 
                  href="/signup" 
                  className="block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}