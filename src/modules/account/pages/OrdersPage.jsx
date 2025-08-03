import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccountData } from '../hooks/useAccountData.js';
import AccountSidebar from '../components/AccountSidebar.jsx';
import OrderList from '../components/OrderList.jsx';

const OrdersPage = () => {
  const {
    user,
    orders,
    loading,
    error,
    cancelOrder,
    reorderItems,
    clearError
  } = useAccountData();
  const [actionLoading, setActionLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      console.log('Logging out...');
      window.location.href = '/';
    }
  };

  const handleCancelOrder = async (orderId) => {
    setActionLoading(true);
    try {
      const result = await cancelOrder(orderId);
      if (result.success) {
        setNotification({
          type: 'success',
          message: result.message
        });
      } else {
        setNotification({
          type: 'error',
          message: result.message
        });
      }
    } catch (err) {
      setNotification({
        type: 'error',
        message: 'Failed to cancel order'
      });
    } finally {
      setActionLoading(false);
      // Clear notification after 5 seconds
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const handleReorderItems = async (orderId) => {
    setActionLoading(true);
    try {
      const result = await reorderItems(orderId);
      if (result.success) {
        setNotification({
          type: 'success',
          message: result.message
        });
      } else {
        setNotification({
          type: 'error',
          message: result.message
        });
      }
    } catch (err) {
      setNotification({
        type: 'error',
        message: 'Failed to reorder items'
      });
    } finally {
      setActionLoading(false);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Orders</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <Link
              to="/account"
              className="block w-full border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              Back to Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notification */}
        {notification && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${notification.type === 'success'
              ? 'bg-green-100 border border-green-300 text-green-800'
              : 'bg-red-100 border border-red-300 text-red-800'
            }`}>
            <div className="flex items-center">
              <span className="mr-2">
                {notification.type === 'success' ? '✓' : '✕'}
              </span>
              {notification.message}
              <button
                onClick={() => setNotification(null)}
                className="ml-4 text-lg font-bold hover:opacity-70"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-gray-700">
                  Home
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <Link to="/account" className="text-gray-500 hover:text-gray-700">
                  Account
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <span className="text-gray-900 font-medium">My Orders</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">
            Track and manage your order history
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AccountSidebar user={user} onLogout={handleLogout} />
          </div>

          {/* Orders List */}
          <div className="lg:col-span-3">
            <OrderList
              orders={orders}
              loading={loading || actionLoading}
              onCancelOrder={handleCancelOrder}
              onReorderItems={handleReorderItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
