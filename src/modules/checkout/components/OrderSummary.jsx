import { Link } from 'react-router-dom';
import { FiShoppingBag, FiEdit3, FiTag, FiTruck, FiShield } from 'react-icons/fi';

const OrderSummary = ({
  cart,
  totalItems,
  subtotal,
  tax,
  total,
  shippingCost = 0,
  discountAmount = 0,
  paymentMethod = null,
  isSticky = true
}) => {
  const finalTotal = total + shippingCost - discountAmount;
  const cashOnDeliveryFee = paymentMethod === 'cash_on_delivery' ? 5.00 : 0;
  const grandTotal = finalTotal + cashOnDeliveryFee;

  const containerClasses = isSticky
    ? "bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24"
    : "bg-white rounded-lg shadow-sm border border-gray-200 p-6";

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <FiShoppingBag className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
            <p className="text-sm text-gray-600">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>

        <Link
          to="/cart"
          className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1 transition-colors duration-200"
        >
          <FiEdit3 className="w-4 h-4" />
          Edit Cart
        </Link>
      </div>

      {/* Cart Items */}
      <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
        {cart.map((item, index) => (
          <div key={`${item.id}-${item.color}-${item.size}-${index}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
            />

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                {item.name}
              </h4>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                {item.color && <span>Color: {item.color}</span>}
                {item.size && item.color && <span>•</span>}
                {item.size && <span>Size: {item.size}</span>}
              </div>

              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                <span className="text-sm font-medium text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code Section */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Enter promo code"
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors duration-200">
            Apply
          </button>
        </div>

        {discountAmount > 0 && (
          <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
            <FiTag className="w-4 h-4" />
            <span>Promo code applied: -${discountAmount.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Subtotal ({totalItems} items)</span>
          <span className="text-gray-900">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-900">
            {shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : 'FREE'}
          </span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between items-center text-sm text-green-600">
            <span>Discount</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        {cashOnDeliveryFee > 0 && (
          <div className="flex justify-between items-center text-sm text-orange-600">
            <span>Cash on Delivery Fee</span>
            <span>+${cashOnDeliveryFee.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Tax (estimated)</span>
          <span className="text-gray-900">${tax.toFixed(2)}</span>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-lg font-semibold text-gray-900">
              ${grandTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Shipping Info */}
      {shippingCost === 0 && (
        <div className="mb-6 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 text-sm text-green-800">
            <FiTruck className="w-4 h-4" />
            <span className="font-medium">FREE shipping included!</span>
          </div>
        </div>
      )}

      {/* Estimated Delivery */}
      <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 text-sm text-blue-800 mb-1">
          <FiTruck className="w-4 h-4" />
          <span className="font-medium">Estimated Delivery</span>
        </div>
        <p className="text-sm text-blue-700">
          {paymentMethod === 'cash_on_delivery'
            ? '3-5 business days (after order confirmation)'
            : '2-4 business days (after payment confirmation)'
          }
        </p>
      </div>

      {/* Security Badge */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <FiShield className="w-4 h-4" />
          <span>Secure checkout • 256-bit SSL encryption</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
