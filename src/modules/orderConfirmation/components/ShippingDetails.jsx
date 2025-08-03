import { FiMapPin, FiTruck, FiClock, FiMessageSquare, FiPackage } from 'react-icons/fi';

const ShippingDetails = ({ order }) => {
  if (!order?.shipping) return null;

  const { shipping, tracking } = order;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Shipping Information</h3>

      {/* Shipping Address */}
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mt-1">
            <FiMapPin className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-1">Shipping Address</div>
            <div className="font-medium text-gray-900">
              {shipping.address.street}
            </div>
            <div className="text-gray-700">
              {shipping.address.city}, {shipping.address.state} {shipping.address.zipCode}
            </div>
            <div className="text-gray-700">
              {shipping.address.country}
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Method */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
            <FiTruck className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-1">Shipping Method</div>
            <div className="font-medium text-gray-900">{shipping.method}</div>
            <div className="text-sm text-gray-600">
              {shipping.cost > 0 ? `$${shipping.cost.toFixed(2)}` : 'Free Shipping'}
            </div>
          </div>
        </div>
      </div>

      {/* Estimated Delivery */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
            <FiClock className="w-5 h-5 text-orange-600" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-1">Estimated Delivery</div>
            <div className="font-medium text-gray-900">
              {formatDate(order.estimatedDelivery)}
            </div>
            <div className="text-sm text-gray-600">
              {tracking.estimatedDays} business days from order confirmation
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Instructions */}
      {shipping.instructions && (
        <div className="mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mt-1">
              <FiMessageSquare className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">Delivery Instructions</div>
              <div className="text-gray-700 text-sm leading-relaxed">
                {shipping.instructions}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tracking Information */}
      {tracking && (
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <FiPackage className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">Tracking Information</div>
              <div className="font-medium text-gray-900 mb-1">
                {tracking.carrier}
              </div>
              {tracking.trackingNumber && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Tracking Number:</span>
                  <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                    {tracking.trackingNumber}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Tracking Status */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${tracking.status === 'In Transit' ? 'bg-blue-500' :
                  tracking.status === 'Delivered' ? 'bg-green-500' :
                    'bg-yellow-500'
                }`}></div>
              <span className="text-sm font-medium text-gray-900">
                {tracking.status}
              </span>
            </div>
            {tracking.lastUpdate && (
              <div className="text-xs text-gray-500 mt-1">
                Last updated: {new Date(tracking.lastUpdate).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingDetails;
