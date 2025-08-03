import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX, FiUser } from 'react-icons/fi';
import { useCartContext } from '../contexts/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCartContext();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FiShoppingCart className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">Buyzy</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/"
                className="text-gray-900 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/product"
                className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Products
              </Link>
              <Link
                to="/category"
                className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Categories
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                About
              </Link>
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/account"
              className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
            >
              <FiUser className="w-4 h-4" />
              <span>Account</span>
            </Link>
            <Link
              to="/cart"
              className="relative text-gray-600 hover:text-primary-600 p-2 rounded-md transition-colors duration-200"
            >
              <FiShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link
              to="/product"
              className="btn-primary"
            >
              Shop Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link
              to="/cart"
              className="relative text-gray-600 hover:text-primary-600 p-2 rounded-md transition-colors duration-200"
            >
              <FiShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-primary-600 p-2 rounded-md transition-colors duration-200"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                to="/"
                className="text-gray-900 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/product"
                className="text-gray-600 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/category"
                className="text-gray-600 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/account"
                className="text-gray-600 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <FiUser className="w-4 h-4" />
                <span>Account</span>
              </Link>
              <Link
                to="/product"
                className="bg-primary-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-700 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Shop Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
