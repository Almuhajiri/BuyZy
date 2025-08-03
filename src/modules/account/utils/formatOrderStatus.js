import { orderStatuses, paymentStatuses } from '../data/mockOrders.js';

/**
 * Format order status with appropriate styling
 * @param {string} status - The order status
 * @returns {Object} Status configuration object
 */
export const formatOrderStatus = (status) => {
  const normalizedStatus = status?.toLowerCase() || 'processing';
  return orderStatuses[normalizedStatus] || orderStatuses.processing;
};

/**
 * Format payment status with appropriate styling
 * @param {string} status - The payment status
 * @returns {Object} Status configuration object
 */
export const formatPaymentStatus = (status) => {
  const normalizedStatus = status?.toLowerCase() || 'pending';
  return paymentStatuses[normalizedStatus] || paymentStatuses.pending;
};

/**
 * Format currency amount
 * @param {number} amount - The amount to format
 * @param {string} currency - The currency code (default: USD)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

/**
 * Format date to readable string
 * @param {string|Date} date - The date to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };

  return new Date(date).toLocaleDateString('en-US', defaultOptions);
};

/**
 * Format date to relative time (e.g., "2 days ago")
 * @param {string|Date} date - The date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 }
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
};

/**
 * Truncate text to specified length
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Generate order progress percentage
 * @param {string} status - The order status
 * @returns {number} Progress percentage (0-100)
 */
export const getOrderProgress = (status) => {
  const progressMap = {
    processing: 25,
    confirmed: 40,
    shipped: 70,
    in_transit: 85,
    delivered: 100,
    cancelled: 0,
    refunded: 0
  };

  return progressMap[status?.toLowerCase()] || 0;
};

/**
 * Check if order can be cancelled
 * @param {string} status - The order status
 * @returns {boolean} Whether order can be cancelled
 */
export const canCancelOrder = (status) => {
  const cancellableStatuses = ['processing', 'confirmed'];
  return cancellableStatuses.includes(status?.toLowerCase());
};

/**
 * Check if order can be returned
 * @param {string} status - The order status
 * @param {string} deliveredAt - Delivery date
 * @returns {boolean} Whether order can be returned
 */
export const canReturnOrder = (status, deliveredAt) => {
  if (status?.toLowerCase() !== 'delivered' || !deliveredAt) {
    return false;
  }

  // Allow returns within 30 days of delivery
  const deliveryDate = new Date(deliveredAt);
  const now = new Date();
  const diffInDays = Math.floor((now - deliveryDate) / (1000 * 60 * 60 * 24));

  return diffInDays <= 30;
};

/**
 * Get order status color for UI elements
 * @param {string} status - The order status
 * @returns {string} Tailwind color class
 */
export const getStatusColor = (status) => {
  const statusConfig = formatOrderStatus(status);
  return statusConfig.color;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Whether phone is valid
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

/**
 * Format address for display
 * @param {Object} address - Address object
 * @returns {string} Formatted address string
 */
export const formatAddress = (address) => {
  if (!address) return '';

  const parts = [
    address.street,
    address.city,
    address.state,
    address.zipCode,
    address.country
  ].filter(Boolean);

  return parts.join(', ');
};

/**
 * Calculate order statistics
 * @param {Array} orders - Array of orders
 * @returns {Object} Order statistics
 */
export const calculateOrderStats = (orders) => {
  const stats = {
    total: orders.length,
    delivered: 0,
    processing: 0,
    cancelled: 0,
    totalSpent: 0,
    averageOrderValue: 0
  };

  orders.forEach(order => {
    stats.totalSpent += order.total;

    switch (order.status?.toLowerCase()) {
      case 'delivered':
        stats.delivered++;
        break;
      case 'processing':
      case 'confirmed':
      case 'shipped':
      case 'in_transit':
        stats.processing++;
        break;
      case 'cancelled':
      case 'refunded':
        stats.cancelled++;
        break;
    }
  });

  stats.averageOrderValue = stats.total > 0 ? stats.totalSpent / stats.total : 0;

  return stats;
};
