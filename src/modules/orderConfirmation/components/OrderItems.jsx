import { FiPackage, FiStar } from 'react-icons/fi';

const OrderItems = ({ order }) => {
  if (!order?.items) return null;

  const { items } = order;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        className={`w-3 h-3 ${index < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
          }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <FiPackage className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
        <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={item.id || index} className="flex gap-4 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0">
            {/* Product Image */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FiPackage className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-base font-medium text-gray-900 truncate pr-4">
                  {item.name}
                </h4>
                <div className="text-right flex-shrink-0">
                  <div className="text-base font-semibold text-gray-900">
                    {formatCurrency(item.total)}
                  </div>
                  {item.price !== item.total / item.quantity && (
                    <div className="text-sm text-gray-500 line-through">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  )}
                </div>
              </div>

              {/* Product Variants */}
              {(item.size || item.color) && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {item.size && (
                    <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs font-medium text-gray-700 rounded">
                      Size: {item.size}
                    </span>
                  )}
                  {item.color && (
                    <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs font-medium text-gray-700 rounded">
                      Color: {item.color}
                    </span>
                  )}
                </div>
              )}

              {/* Price and Quantity */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    {formatCurrency(item.price)} × {item.quantity}
                  </span>

                  {/* Product Rating */}
                  {item.rating && (
                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        {renderStars(item.rating)}
                      </div>
                      <span className="text-xs text-gray-500">
                        ({item.rating})
                      </span>
                    </div>
                  )}
                </div>

                {/* Savings Badge */}
                {item.price !== item.total / item.quantity && (
                  <div className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                    Save {formatCurrency((item.price * item.quantity) - item.total)}
                  </div>
                )}
              </div>

              {/* Product Description */}
              {item.description && (
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {item.description}
                </p>
              )}

              {/* SKU */}
              {item.sku && (
                <div className="mt-2">
                  <span className="text-xs text-gray-500">
                    SKU: <span className="font-mono">{item.sku}</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Order Items Summary */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-900">
            Total Items ({items.reduce((sum, item) => sum + item.quantity, 0)})
          </span>
          <span className="text-base font-semibold text-gray-900">
            {formatCurrency(items.reduce((sum, item) => sum + item.total, 0))}
          </span>
        </div>
      </div>

      {/* Continue Shopping CTA */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-center">
          <p className="text-sm text-blue-800 mb-2">
            Loved your purchase?
          </p>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 underline">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderItems;
