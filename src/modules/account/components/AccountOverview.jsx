import { Link } from 'react-router-dom';
import { FiShoppingBag, FiTruck, FiDollarSign, FiStar, FiArrowRight, FiPackage } from 'react-icons/fi';
import { formatCurrency, formatDate, formatRelativeTime, calculateOrderStats } from '../utils/formatOrderStatus.js';

const AccountOverview = ({ user, orders }) => {
  if (!user || !orders) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const stats = calculateOrderStats(orders);
  const recentOrders = orders
    .sort((a, b) => new Date(b.placedAt) - new Date(a.placedAt))
    .slice(0, 3);

  const memberSinceDate = formatDate(user.memberSince, { year: 'numeric', month: 'short' });

  const quickStats = [
    {
      icon: FiShoppingBag,
      label: 'Total Orders',
      value: stats.total,
      color: 'blue',
      link: '/account/orders'
    },
    {
      icon: FiTruck,
      label: 'Delivered',
      value: stats.delivered,
      color: 'green',
      link: '/account/orders?status=delivered'
    },
    {
      icon: FiDollarSign,
      label: 'Total Spent',
      value: formatCurrency(stats.totalSpent),
      color: 'purple',
      link: '/account/orders'
    },
    {
      icon: FiStar,
      label: 'Loyalty Points',
      value: user.stats?.loyaltyPoints || 0,
      color: 'yellow',
      link: '/account/rewards'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user.firstName}!
            </h1>
            <p className="text-gray-600 mt-1">
              Member since {memberSinceDate} • Manage your account and orders
            </p>
          </div>
          <div className="hidden sm:block">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <FiShoppingBag className="w-8 h-8 text-blue-600" />
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Link
                key={index}
                to={stat.link}
                className="group p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center group-hover:bg-${stat.color}-200 transition-colors`}>
                    <IconComponent className={`w-5 h-5 text-${stat.color}-600`} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          <Link
            to="/account/orders"
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <span>View All</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FiPackage className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Order #{order.orderNumber}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatRelativeTime(order.placedAt)} • {order.itemCount} item{order.itemCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {formatCurrency(order.total)}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${order.status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <Link
                      to={`/account/orders/${order.id}`}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FiShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">No orders yet</p>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/account/profile"
            className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiShoppingBag className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Update Profile</span>
          </Link>

          <Link
            to="/account/addresses"
            className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <FiTruck className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Manage Addresses</span>
          </Link>

          <Link
            to="/support"
            className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <FiDollarSign className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Get Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;
