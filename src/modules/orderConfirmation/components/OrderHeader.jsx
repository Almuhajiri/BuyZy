import { FiCheckCircle, FiCalendar, FiClock, FiTruck } from 'react-icons/fi';
import { orderStatuses } from '../data/mockOrder.js';

const OrderHeader = ({ order }) => {
  if (!order) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusConfig = (status) => {
    return orderStatuses[status?.toLowerCase()] || orderStatuses.confirmed;
  };

  const statusConfig = getStatusConfig(order.status);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
      {/* Success Icon and Message */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiCheckCircle className="w-10 h-10 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Thank You for Your Order!
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          Your order has been successfully placed and confirmed.
        </p>

        {/* Order Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200">
          <div className={`w-2 h-2 rounded-full bg-${statusConfig.color}-500`}></div>
          <span className={`text-sm font-medium text-${statusConfig.color}-800`}>
            {statusConfig.label}
          </span>
        </div>
      </div>

      {/* Order Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Order Number */}
        <div className="text-center">
          <div className="bg-gray-50 rounded-lg p-4 mb-3">
            <div className="text-2xl font-bold text-gray-900">{order.orderId}</div>
          </div>
          <div className="text-sm text-gray-500">Order Number</div>
        </div>

        {/* Order Date & Time */}
        <div className="text-center">
          <div className="bg-gray-50 rounded-lg p-4 mb-3">
            <div className="flex items-center justify-center gap-2 mb-1">
              <FiCalendar className="w-4 h-4 text-gray-600" />
              <span className="font-semibold text-gray-900">
                {formatDate(order.placedAt)}
              </span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FiClock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {formatTime(order.placedAt)}
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-500">Order Placed</div>
        </div>

        {/* Total Amount */}
        <div className="text-center">
          <div className="bg-gray-50 rounded-lg p-4 mb-3">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(order.summary.total)}
            </div>
          </div>
          <div className="text-sm text-gray-500">Total Paid</div>
        </div>

        {/* Estimated Delivery */}
        <div className="text-center">
          <div className="bg-gray-50 rounded-lg p-4 mb-3">
            <div className="flex items-center justify-center gap-2 mb-1">
              <FiTruck className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-gray-900">
                {formatDate(order.estimatedDelivery)}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              {order.tracking.estimatedDays} business days
            </div>
          </div>
          <div className="text-sm text-gray-500">Est. Delivery</div>
        </div>
      </div>

      {/* Order Progress Timeline */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Progress</h3>

        <div className="flex items-center justify-between relative">
          {/* Progress Bar Background */}
          <div className="absolute top-4 left-8 right-8 h-0.5 bg-gray-200"></div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between w-full relative">
            {/* Order Confirmed */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mb-2">
                <FiCheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs text-gray-600 text-center">Order<br />Confirmed</span>
            </div>

            {/* Processing */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${['processing', 'shipped', 'delivered'].includes(order.status?.toLowerCase())
                  ? 'bg-blue-500' : 'bg-gray-300'
                }`}>
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-xs text-gray-600 text-center">Processing</span>
            </div>

            {/* Shipped */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${['shipped', 'delivered'].includes(order.status?.toLowerCase())
                  ? 'bg-blue-500' : 'bg-gray-300'
                }`}>
                <FiTruck className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs text-gray-600 text-center">Shipped</span>
            </div>

            {/* Delivered */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${order.status?.toLowerCase() === 'delivered'
                  ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                <FiCheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs text-gray-600 text-center">Delivered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;
