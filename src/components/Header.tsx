
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';

export default function Header() {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="dairy-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo and brand */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-dairy-accent font-bold text-2xl">Daily Dairy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-dairy-accent transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-dairy-accent transition-colors">
              Products
            </Link>
            <Link to="/subscription" className="text-gray-700 hover:text-dairy-accent transition-colors">
              Subscriptions
            </Link>
            <button 
              onClick={toggleSearch}
              className="text-gray-700 hover:text-dairy-accent transition-colors"
            >
              <Search size={20} />
            </button>
          </nav>

          {/* User/Auth & Cart Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-dairy-accent">
                  <User size={20} />
                  <span className="hidden lg:inline">{user?.name}</span>
                </Link>
                <Button variant="ghost" onClick={logout}>Logout</Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
            )}
            
            <Link to="/cart" className="relative">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-dairy-accent text-white">
                  {totalItems}
                </Badge>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-dairy-accent text-white">
                  {totalItems}
                </Badge>
              )}
            </Link>
            <button onClick={toggleMenu} className="text-gray-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar (toggled by search button) */}
        {isSearchOpen && (
          <div className="pt-4 pb-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for dairy products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dairy-accent"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <button 
                onClick={toggleSearch}
                className="absolute right-3 top-3 text-gray-400 hover:text-dairy-accent"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col pt-4 space-y-4">
              <Link to="/" className="text-gray-700 hover:text-dairy-accent transition-colors" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-dairy-accent transition-colors" onClick={toggleMenu}>
                Products
              </Link>
              <Link to="/subscription" className="text-gray-700 hover:text-dairy-accent transition-colors" onClick={toggleMenu}>
                Subscriptions
              </Link>
              <button 
                onClick={() => {
                  toggleSearch();
                  toggleMenu();
                }}
                className="text-left text-gray-700 hover:text-dairy-accent transition-colors flex items-center space-x-2"
              >
                <Search size={18} />
                <span>Search</span>
              </button>
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="text-gray-700 hover:text-dairy-accent transition-colors flex items-center space-x-2" onClick={toggleMenu}>
                    <User size={18} />
                    <span>Profile ({user?.name})</span>
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="text-left text-gray-700 hover:text-dairy-accent transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-gray-700 hover:text-dairy-accent transition-colors" onClick={toggleMenu}>
                  Login / Register
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
