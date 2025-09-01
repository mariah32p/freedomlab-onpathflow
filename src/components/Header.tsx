import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Target, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            {/* Mobile hamburger menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 mr-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            
            <Link to="/" className="flex items-center space-x-3 max-w-[120px] md:max-w-none">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-slate-800">OnPathFlow</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/signin" className="text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200">
              Login
            </Link>
            <Link 
              to="/signup" 
              className="bg-emerald-500 text-white px-6 py-3 rounded-md font-semibold text-base hover:bg-emerald-600 transition-colors duration-200 w-40 h-12 flex items-center justify-center"
            >
              Start Free Trial
            </Link>
          </nav>

          {/* Mobile CTA Button */}
          <div className="md:hidden">
            <Link 
              to="/signup" 
              className="bg-emerald-500 text-white px-4 py-2.5 rounded-md font-semibold text-sm hover:bg-emerald-600 transition-colors duration-200 min-h-[44px] flex items-center justify-center"
            >
              Try Free
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              <Link 
                to="/signin" 
                className="block text-slate-600 hover:text-slate-900 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="block bg-emerald-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-emerald-600 text-center transition-colors duration-200 mx-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;