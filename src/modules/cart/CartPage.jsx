import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingBag, FiArrowLeft, FiHeart, FiTrash2 } from 'react-icons/fi';
import { useCartContext } from '../../contexts/CartContext';
import CartItem from './components/CartItem.jsx';
import CartSummary from './components/CartSummary.jsx';

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    subtotal,
    tax,
    total,
    totalSavings,
    isEmpty
  } = useCartContext();

  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleCheckout = () => {
    // For now, navigate to a placeholder checkout page
    navigate('/checkout');
  };

  const handleClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  // Recently viewed items (mock data)
  const recentlyViewed = [
    {
      id: 4,
      name: 'Smart Watch Series 8',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop',
      price: 399.99,
      originalPrice: 449.99
    },
    {
      id: 5,
      name: 'Wireless Earbuds Pro',
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=300&fit=crop',
      price: 199.99,
      originalPrice: 249.99
    }
  ];

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-primary-600 transition-colors duration-200">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900">Shopping Cart</span>
          </div>

          {/* Empty Cart State */}
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiShoppingBag className="w-12 h-12 text-gray-400" />
              </div>

              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h1>

              <p className="text-gray-600 mb-8">
                Looks like you haven't added anything to your cart yet.
                Start shopping to fill it up!
              </p>

              <div className="space-y-4">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  Start Shopping
                </Link>

                <div className="text-sm text-gray-500">
                  or{' '}
                  <Link
                    to="/category"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    browse categories
                  </Link>
                </div>
              </div>
            </div>

            {/* Recently Viewed Products */}
            {recentlyViewed.length > 0 && (
              <div className="mt-16 max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 text-left">
                  Recently Viewed
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentlyViewed.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-lg mb-4 hover:opacity-80 transition-opacity duration-200"
                        />
                        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-gray-900">
                            ${product.price}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-primary-600 transition-colors duration-200">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900">Shopping Cart</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-1">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowClearConfirm(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <FiTrash2 className="w-4 h-4" />
              Clear Cart
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
            >
              <FiArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Cart Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item, index) => (
                <CartItem
                  key={`${item.id}-${item.color}-${item.size}-${index}`}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>

            {/* Saved for Later Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <FiHeart className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Saved for Later (0)
                </h2>
              </div>
              <p className="text-gray-500 text-sm">
                Items you save for later will appear here
              </p>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              totalItems={totalItems}
              subtotal={subtotal}
              tax={tax}
              total={total}
              totalSavings={totalSavings}
              onCheckout={handleCheckout}
            />
          </div>
        </div>

        {/* Clear Cart Confirmation Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Clear Cart
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to remove all items from your cart? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleClearCart}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
