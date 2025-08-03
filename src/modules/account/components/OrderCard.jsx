import { Link } from 'react-router-dom';
import { FiPackage, FiTruck, FiClock, FiCheckCircle, FiX, FiRotateCcw, FiEye } from 'react-icons/fi';
import { formatCurrency, formatDate, formatOrderStatus, canCancelOrder, canReturnOrder } from '../utils/formatOrderStatus.js';

const OrderCard = ({ order, onCancelOrder, onReorderItems }) => {
  const statusConfig = formatOrderStatus(order.status);
  const canCancel = canCancelOrder(order.status);
  const canReturn = canReturnOrder(order.status, order.deliveredAt);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <FiCheckCircle className="w-5 h-5" />;
      case 'shipped':
      case 'in_transit':
        return <FiTruck className="w-5 h-5" />;
      case 'cancelled':
        return <FiX className="w-5 h-5" />;
      default:
        return <FiClock className="w-5 h-5" />;
    }
  };

  const handleCancelOrder = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      await onCancelOrder(order.id);
    }
  };

  const handleReorder = async () => {
    await onReorderItems(order.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Order Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <FiPackage className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              Order #{order.orderNumber}
            </h3>
            <p className="text-sm text-gray-500">
              Placed on {formatDate(order.placedAt)}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(order.total)}
          </p>
          <p className="text-sm text-gray-500">
            {order.itemCount} item{order.itemCount !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Order Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 bg-${statusConfig.color}-100 rounded-full flex items-center justify-center`}>
            <div className={`text-${statusConfig.color}-600`}>
              {getStatusIcon(order.status)}
            </div>
          </div>
          <div>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${statusConfig.color}-100 text-${statusConfig.color}-800`}>
              {statusConfig.label}
            </span>
            <p className="text-sm text-gray-500 mt-1">
              {statusConfig.description}
            </p>
          </div>
        </div>

        {/* Delivery Info */}
        {order.status === 'delivered' && order.deliveredAt && (
          <div className="text-right">
            <p className="text-sm text-green-600 font-medium">
              Delivered
            </p>
            <p className="text-xs text-gray-500">
              {formatDate(order.deliveredAt)}
            </p>
          </div>
        )}

        {order.status === 'shipped' && order.tracking?.estimatedDelivery && (
          <div className="text-right">
            <p className="text-sm text-blue-600 font-medium">
              Est. Delivery
            </p>
            <p className="text-xs text-gray-500">
              {formatDate(order.tracking.estimatedDelivery)}
            </p>
          </div>
        )}
      </div>

      {/* Order Items Preview */}
      <div className="mb-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {order.items.slice(0, 4).map((item, index) => (
            <div key={item.id} className="flex-shrink-0">
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FiPackage className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          ))}
          {order.items.length > 4 && (
            <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500 font-medium">
                +{order.items.length - 4}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Tracking Info */}
      {order.tracking?.trackingNumber && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900">
                Tracking: {order.tracking.trackingNumber}
              </p>
              <p className="text-xs text-blue-700">
                {order.tracking.carrier}
              </p>
            </div>
            <FiTruck className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <Link
            to={`/account/orders/${order.id}`}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FiEye className="w-4 h-4 mr-2" />
            View Details
          </Link>

          <button
            onClick={handleReorder}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FiRotateCcw className="w-4 h-4 mr-2" />
            Reorder
          </button>
        </div>

        <div className="flex space-x-2">
          {canReturn && (
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Return Items
            </button>
          )}

          {canCancel && (
            <button
              onClick={handleCancelOrder}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
