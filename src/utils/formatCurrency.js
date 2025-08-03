/**
 * Format a number as currency
 * @param {number} amount - The amount to format
 * @param {string} currency - The currency code (default: 'USD')
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '$0.00';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Parse a currency string to a number
 * @param {string} currencyString - The currency string to parse (e.g., "$19.99")
 * @returns {number} The parsed number
 */
export const parseCurrency = (currencyString) => {
  if (typeof currencyString !== 'string') {
    return 0;
  }

  // Remove currency symbols and spaces, then parse
  const numberString = currencyString.replace(/[$,\s]/g, '');
  const parsed = parseFloat(numberString);

  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Calculate discount percentage
 * @param {number} originalPrice - The original price
 * @param {number} salePrice - The sale price
 * @returns {number} The discount percentage (rounded)
 */
export const calculateDiscount = (originalPrice, salePrice) => {
  if (originalPrice <= 0 || salePrice <= 0 || salePrice >= originalPrice) {
    return 0;
  }

  const discount = ((originalPrice - salePrice) / originalPrice) * 100;
  return Math.round(discount);
};

/**
 * Format price with discount information
 * @param {number} price - Current price
 * @param {number} originalPrice - Original price (optional)
 * @returns {object} Formatted price object
 */
export const formatPriceWithDiscount = (price, originalPrice = null) => {
  const formattedPrice = formatCurrency(price);

  if (!originalPrice || originalPrice <= price) {
    return {
      price: formattedPrice,
      originalPrice: null,
      discount: null,
      hasDiscount: false
    };
  }

  const formattedOriginalPrice = formatCurrency(originalPrice);
  const discount = calculateDiscount(originalPrice, price);

  return {
    price: formattedPrice,
    originalPrice: formattedOriginalPrice,
    discount,
    hasDiscount: true
  };
};
