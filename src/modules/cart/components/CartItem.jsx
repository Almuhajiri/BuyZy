import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMinus, FiPlus, FiTrash2, FiHeart } from 'react-icons/fi';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(item.id, newQuantity, {
        color: item.color,
        size: item.size
      });
    }
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    // Add slight delay for better UX
    setTimeout(() => {
      onRemove(item.id, {
        color: item.color,
        size: item.size
      });
    }, 150);
  };

  const savings = (item.originalPrice - item.price) * item.quantity;

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 transition-all duration-300 ${isRemoving ? 'opacity-50 scale-95' : 'hover:shadow-md'
      }`}>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Link to={`/product/${item.id}`}>
            <img
              src={item.image}
              alt={item.name}
              className="w-full sm:w-24 md:w-32 h-24 md:h-32 object-cover rounded-lg hover:opacity-80 transition-opacity duration-200"
            />
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1 mr-4">
              <Link
                to={`/product/${item.id}`}
                className="text-lg font-medium text-gray-900 hover:text-primary-600 transition-colors duration-200 line-clamp-2"
              >
                {item.name}
              </Link>

              {/* Brand and Category */}
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                {item.brand && <span>{item.brand}</span>}
                {item.brand && item.category && <span>•</span>}
                {item.category && <span>{item.category}</span>}
              </div>

              {/* Variants */}
              {(item.color || item.size) && (
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  {item.color && (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <span className="font-medium">Color:</span>
                      <span>{item.color}</span>
                    </div>
                  )}
                  {item.size && (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <span className="font-medium">Size:</span>
                      <span>{item.size}</span>
                    </div>
                  )}
                </div>
              )}

              {/* SKU */}
              <div className="mt-1 text-xs text-gray-400">
                SKU: {item.sku}
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={handleRemove}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 flex-shrink-0"
              aria-label="Remove item from cart"
            >
              <FiTrash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Price and Quantity Row */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3">
            {/* Price Information */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-900">
                  ${item.price.toFixed(2)}
                </span>
                {item.originalPrice > item.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ${item.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {savings > 0 && (
                <span className="text-sm text-green-600 font-medium">
                  You save: ${savings.toFixed(2)}
                </span>
              )}

              {/* Subtotal for this item */}
              <div className="mt-1 text-sm text-gray-600">
                Subtotal: ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 rounded-l-lg transition-colors duration-200"
                  aria-label="Decrease quantity"
                >
                  <FiMinus className="w-4 h-4" />
                </button>

                <span className="px-4 py-2 min-w-[3rem] text-center text-gray-900 font-medium border-x border-gray-300">
                  {item.quantity}
                </span>

                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-r-lg transition-colors duration-200"
                  aria-label="Increase quantity"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>

              {/* Save for Later Button */}
              <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200">
                <FiHeart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
