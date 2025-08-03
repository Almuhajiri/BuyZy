import { NavLink, useLocation } from 'react-router-dom';
import { FiUser, FiShoppingBag, FiMapPin, FiSettings, FiLogOut, FiHome } from 'react-icons/fi';

const AccountSidebar = ({ user, onLogout }) => {
  const location = useLocation();

  const navigationItems = [
    {
      to: '/account',
      icon: FiHome,
      label: 'Dashboard',
      exact: true
    },
    {
      to: '/account/profile',
      icon: FiUser,
      label: 'Profile'
    },
    {
      to: '/account/orders',
      icon: FiShoppingBag,
      label: 'My Orders'
    },
    {
      to: '/account/addresses',
      icon: FiMapPin,
      label: 'Addresses'
    },
    {
      to: '/account/settings',
      icon: FiSettings,
      label: 'Settings'
    }
  ];

  const isActiveLink = (to, exact = false) => {
    if (exact) {
      return location.pathname === to;
    }
    return location.pathname.startsWith(to);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* User Profile Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <FiUser className="w-6 h-6 text-blue-600" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
            </h2>
            <p className="text-sm text-gray-500 truncate">
              {user?.email || 'Loading...'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = isActiveLink(item.to, item.exact);

            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  <IconComponent className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Logout Button */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 w-full"
          >
            <FiLogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Quick Stats */}
      {user?.stats && (
        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600">
                {user.stats.totalOrders}
              </div>
              <div className="text-xs text-gray-500">Total Orders</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-green-600">
                ${user.stats.totalSpent.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Total Spent</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSidebar;
