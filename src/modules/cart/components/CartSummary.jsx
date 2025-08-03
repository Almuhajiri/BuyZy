import { Link } from 'react-router-dom';
import { FiLock, FiTruck, FiCreditCard, FiGift } from 'react-icons/fi';

const CartSummary = ({
  totalItems,
  subtotal,
  tax,
  total,
  totalSavings,
  onCheckout
}) => {
  const freeShippingThreshold = 100;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const hasPromoCode = false; // Mock promo code state

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

      {/* Items Count */}
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
        <span className="text-gray-600">
          {totalItems} {totalItems === 1 ? 'item' : 'items'} in cart
        </span>
      </div>

      {/* Free Shipping Progress */}
      {remainingForFreeShipping > 0 && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <FiTruck className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              Add ${remainingForFreeShipping.toFixed(2)} for FREE shipping!
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`
              }}
            ></div>
          </div>
        </div>
      )}

      {subtotal >= freeShippingThreshold && (
        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2">
            <FiTruck className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              🎉 You qualify for FREE shipping!
            </span>
          </div>
        </div>
      )}

      {/* Promo Code Section */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter promo code"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          />
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors duration-200">
            Apply
          </button>
        </div>
        {hasPromoCode && (
          <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
            <FiGift className="w-4 h-4" />
            <span>Promo code "SAVE10" applied!</span>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
        </div>

        {totalSavings > 0 && (
          <div className="flex justify-between items-center text-green-600">
            <span>Total Savings</span>
            <span className="font-medium">-${totalSavings.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-gray-900">
            {subtotal >= freeShippingThreshold ? 'FREE' : '$9.99'}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Tax (estimated)</span>
          <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-lg font-semibold text-gray-900">
              ${(total + (subtotal >= freeShippingThreshold ? 0 : 9.99)).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onCheckout}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <FiLock className="w-4 h-4" />
          Secure Checkout
        </button>

        <Link
          to="/"
          className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          Continue Shopping
        </Link>
      </div>

      {/* Security Badges */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FiLock className="w-3 h-3" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FiCreditCard className="w-3 h-3" />
              <span>Safe Payment</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FiTruck className="w-3 h-3" />
              <span>Fast Delivery</span>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            Your payment information is processed securely
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
