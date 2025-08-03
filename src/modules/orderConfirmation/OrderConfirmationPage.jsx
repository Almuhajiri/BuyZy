import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { mockOrder } from './data/mockOrder.js';
import OrderHeader from './components/OrderHeader.jsx';
import CustomerDetails from './components/CustomerDetails.jsx';
import ShippingDetails from './components/ShippingDetails.jsx';
import PaymentDetails from './components/PaymentDetails.jsx';
import OrderItems from './components/OrderItems.jsx';
import OrderSummary from './components/OrderSummary.jsx';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate loading delay
    const loadOrder = async () => {
      try {
        setLoading(true);

        // In a real app, you would fetch the order by ID from an API
        // For now, we'll use the mock data
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check if order data was passed via navigation state (from checkout)
        const orderFromState = location.state?.order;

        if (orderFromState) {
          setOrder(orderFromState);
        } else if (orderId) {
          // If we have an order ID but no state data, use mock data
          // In a real app, this would be an API call: fetchOrderById(orderId)

          // For development, use mock data with the provided order ID
          const orderWithProvidedId = {
            ...mockOrder,
            orderId: orderId
          };
          setOrder(orderWithProvidedId);
        } else {
          throw new Error('No order ID provided');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId, location.state]);

  // Auto-scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Homepage
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No order data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Order Header */}
        <OrderHeader order={order} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Items */}
            <OrderItems order={order} />

            {/* Customer & Shipping Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomerDetails order={order} />
              <ShippingDetails order={order} />
            </div>
          </div>

          {/* Right Column - Payment & Summary */}
          <div className="space-y-6">
            <PaymentDetails order={order} />
            <OrderSummary order={order} />
          </div>
        </div>

        {/* Continue Shopping Section */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Thank you for shopping with Buyzy!
            </h3>
            <p className="text-gray-600 mb-6">
              We appreciate your business. Keep an eye on your email for order updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate('/orders')}
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                View All Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
