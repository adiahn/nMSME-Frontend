import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Award, User, ChevronDown, Globe, Bell } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-700 hover:text-green-600';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-green-600 to-green-700 p-2.5 rounded-xl shadow-lg">
              <Award className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Katsina nMSME</h1>
              <p className="text-sm text-gray-600">Awards Portal</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            <Link to="/" className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive('/')}`}>
              Home
            </Link>
            <Link to="/categories" className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive('/categories')}`}>
              Categories
            </Link>
            <Link to="/results" className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive('/results')}`}>
              Winners
            </Link>
            <Link to="/about" className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive('/about')}`}>
              About
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-green-600 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">EN</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    English
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Hausa
                  </button>
                </div>
              )}
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-700 hover:text-green-600 rounded-lg hover:bg-gray-50 transition-all duration-200">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Sign In / Sign Up */}
            <div className="flex items-center space-x-3">
              <Link 
                to="/judge/login" 
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-green-600 transition-all duration-200"
              >
                Judge Portal
              </Link>
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-all duration-200"
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2.5 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Apply Now
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white">
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-all duration-200" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/categories" className="px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-all duration-200" onClick={toggleMenu}>
                Categories
              </Link>
              <Link to="/results" className="px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-all duration-200" onClick={toggleMenu}>
                Winners
              </Link>
              <Link to="/about" className="px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-all duration-200" onClick={toggleMenu}>
                About
              </Link>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <Link to="/login" className="block px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-all duration-200" onClick={toggleMenu}>
                  Sign In
                </Link>
                <Link to="/signup" className="block mx-4 mt-2 bg-green-600 text-white px-4 py-3 rounded-lg font-medium text-center hover:bg-green-700 transition-all duration-200" onClick={toggleMenu}>
                  Apply Now
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;