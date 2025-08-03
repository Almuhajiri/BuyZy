import { useState } from 'react';
import { FiMinus, FiPlus, FiShoppingCart, FiHeart, FiShare2 } from 'react-icons/fi';

const ProductActions = ({ product, onAddToCart, onAddToWishlist, onShare }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  if (!product) return null;

  const {
    stock,
    availability,
    sizeOptions,
    colorOptions,
    price
  } = product;

  const isInStock = availability === 'in-stock' && stock > 0;
  const maxQuantity = Math.min(stock || 1, 10); // Limit to 10 items max

  const increaseQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= maxQuantity) {
      setQuantity(value);
    }
  };

  const handleAddToCart = async () => {
    if (!isInStock) return;

    // Validate required selections
    if (sizeOptions && sizeOptions.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }

    if (colorOptions && colorOptions.length > 0 && !selectedColor) {
      alert('Please select a color');
      return;
    }

    setIsAddingToCart(true);

    try {
      const cartItem = {
        productId: product.id,
        quantity,
        selectedSize: selectedSize || null,
        selectedColor: selectedColor || null,
        price: product.price
      };

      await onAddToCart?.(cartItem);

      // Show success feedback
      // In a real app, this would show a toast or notification
      alert(`Added ${quantity} item(s) to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAddToWishlist = () => {
    onAddToWishlist?.(product);
    // Show feedback
    alert('Added to wishlist!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Product URL copied to clipboard!');
    }
    onShare?.(product);
  };

  const totalPrice = price * quantity;

  return (
    <div className="space-y-6 border-t pt-6">
      {/* Size Selection */}
      {sizeOptions && sizeOptions.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Size</h4>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-2 border text-sm font-medium rounded-md transition-colors duration-200 ${selectedSize === size
                    ? 'border-primary-600 bg-primary-50 text-primary-600'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color Selection */}
      {colorOptions && colorOptions.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Color</h4>
          <div className="flex flex-wrap gap-3">
            {colorOptions.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`relative w-8 h-8 rounded-full border-2 transition-all duration-200 ${selectedColor === color.name
                    ? 'border-primary-600 ring-2 ring-primary-200'
                    : 'border-gray-300 hover:border-gray-400'
                  }`}
                style={{ backgroundColor: color.code }}
                title={color.name}
              >
                {selectedColor === color.name && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
          {selectedColor && (
            <p className="text-sm text-gray-600 mt-1">
              Selected: {selectedColor}
            </p>
          )}
        </div>
      )}

      {/* Quantity Selector */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2">Quantity</h4>
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <FiMinus className="w-4 h-4" />
            </button>

            <input
              type="number"
              min="1"
              max={maxQuantity}
              value={quantity}
              onChange={handleQuantityChange}
              className="w-16 px-2 py-2 text-center border-0 focus:ring-0 focus:outline-none"
            />

            <button
              onClick={increaseQuantity}
              disabled={quantity >= maxQuantity}
              className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <FiPlus className="w-4 h-4" />
            </button>
          </div>

          <span className="text-sm text-gray-600">
            {stock > 0 ? `${stock} available` : 'Out of stock'}
          </span>
        </div>
      </div>

      {/* Total Price */}
      {quantity > 1 && (
        <div className="text-lg font-semibold text-gray-900">
          Total: ${totalPrice.toFixed(2)}
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          disabled={!isInStock || isAddingToCart}
          className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${isInStock && !isAddingToCart
              ? 'bg-primary-600 hover:bg-primary-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          <FiShoppingCart className="w-5 h-5" />
          <span>
            {isAddingToCart
              ? 'Adding to Cart...'
              : !isInStock
                ? 'Out of Stock'
                : 'Add to Cart'
            }
          </span>
        </button>

        <div className="flex space-x-3">
          <button
            onClick={handleAddToWishlist}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <FiHeart className="w-4 h-4" />
            <span>Save</span>
          </button>

          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <FiShare2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Stock Warning */}
      {isInStock && stock <= 5 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <p className="text-sm text-orange-800">
            🔥 Only {stock} left in stock - order soon!
          </p>
        </div>
      )}

      {/* Trust Badges */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>✓ Secure checkout</p>
        <p>✓ Free returns within 30 days</p>
        <p>✓ Customer protection guarantee</p>
      </div>
    </div>
  );
};

export default ProductActions;
