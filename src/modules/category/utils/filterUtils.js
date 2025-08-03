// Utility functions for filtering and sorting products

export const SORT_OPTIONS = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
  { value: 'name', label: 'Name A-Z' }
];

// Filter products based on multiple criteria
export const filterProducts = (products, filters) => {
  let filteredProducts = [...products];

  // Filter by price range
  if (filters.priceRange) {
    const { min, max } = filters.priceRange;
    filteredProducts = filteredProducts.filter(
      product => product.price >= min && product.price <= max
    );
  }

  // Filter by brands
  if (filters.brands && filters.brands.length > 0) {
    filteredProducts = filteredProducts.filter(
      product => filters.brands.includes(product.brand)
    );
  }

  // Filter by rating
  if (filters.minRating) {
    filteredProducts = filteredProducts.filter(
      product => product.rating >= filters.minRating
    );
  }

  // Filter by availability
  if (filters.availability) {
    filteredProducts = filteredProducts.filter(
      product => product.availability === filters.availability
    );
  }

  // Filter by subcategory
  if (filters.subcategory) {
    filteredProducts = filteredProducts.filter(
      product => product.subcategory === filters.subcategory
    );
  }

  // Search by name or description
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower)
    );
  }

  return filteredProducts;
};

// Sort products based on sort option
export const sortProducts = (products, sortBy) => {
  const sortedProducts = [...products];

  switch (sortBy) {
    case 'price-low-high':
      return sortedProducts.sort((a, b) => a.price - b.price);

    case 'price-high-low':
      return sortedProducts.sort((a, b) => b.price - a.price);

    case 'rating':
      return sortedProducts.sort((a, b) => b.rating - a.rating);

    case 'name':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));

    case 'newest':
      return sortedProducts.sort((a, b) => b.id - a.id); // Assuming higher ID = newer

    case 'popularity':
    default:
      // For popularity, we can use a combination of rating and a mock popularity score
      return sortedProducts.sort((a, b) => {
        const popularityA = a.rating * (a.originalPrice ? 1.2 : 1); // Boost if on sale
        const popularityB = b.rating * (b.originalPrice ? 1.2 : 1);
        return popularityB - popularityA;
      });
  }
};

// Paginate products
export const paginateProducts = (products, page, itemsPerPage) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    products: products.slice(startIndex, endIndex),
    totalPages: Math.ceil(products.length / itemsPerPage),
    totalProducts: products.length,
    currentPage: page,
    hasNextPage: endIndex < products.length,
    hasPrevPage: page > 1
  };
};

// Generate price range options
export const generatePriceRanges = (minPrice, maxPrice) => {
  const ranges = [];
  const step = Math.ceil((maxPrice - minPrice) / 5); // 5 price ranges

  for (let i = 0; i < 5; i++) {
    const min = minPrice + (step * i);
    const max = i === 4 ? maxPrice : minPrice + (step * (i + 1)) - 1;

    ranges.push({
      label: `$${min} - $${max}`,
      value: { min, max }
    });
  }

  return ranges;
};

// Generate rating options
export const RATING_OPTIONS = [
  { value: 4.5, label: '4.5+ Stars' },
  { value: 4.0, label: '4.0+ Stars' },
  { value: 3.5, label: '3.5+ Stars' },
  { value: 3.0, label: '3.0+ Stars' }
];

// Debounce function for search
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Format price range for display
export const formatPriceRange = (min, max) => {
  if (min === max) return `$${min}`;
  return `$${min} - $${max}`;
};

// Check if product matches search query
export const matchesSearch = (product, query) => {
  if (!query) return true;

  const searchLower = query.toLowerCase();
  return (
    product.name.toLowerCase().includes(searchLower) ||
    product.description.toLowerCase().includes(searchLower) ||
    product.brand.toLowerCase().includes(searchLower) ||
    product.features?.some(feature =>
      feature.toLowerCase().includes(searchLower)
    )
  );
};
