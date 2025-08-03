// Product filtering utilities

export const filterProducts = (products, filters) => {
  if (!products || !Array.isArray(products)) {
    return [];
  }

  let filteredProducts = [...products];

  // Filter by price range
  if (filters.priceRange?.min || filters.priceRange?.max) {
    filteredProducts = filteredProducts.filter(product => {
      const price = parseFloat(product.price);
      const minPrice = filters.priceRange.min ? parseFloat(filters.priceRange.min) : 0;
      const maxPrice = filters.priceRange.max ? parseFloat(filters.priceRange.max) : Infinity;

      return price >= minPrice && price <= maxPrice;
    });
  }

  // Filter by brands
  if (filters.brands && filters.brands.length > 0) {
    filteredProducts = filteredProducts.filter(product =>
      filters.brands.includes(product.brand)
    );
  }

  // Filter by rating
  if (filters.rating) {
    const minRating = parseFloat(filters.rating);
    filteredProducts = filteredProducts.filter(product =>
      parseFloat(product.rating) >= minRating
    );
  }

  // Filter by availability
  if (filters.availability) {
    filteredProducts = filteredProducts.filter(product =>
      product.availability === filters.availability
    );
  }

  // Filter by search term
  if (filters.searchTerm) {
    const searchTerm = filters.searchTerm.toLowerCase().trim();
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
  }

  return filteredProducts;
};

export const sortProducts = (products, sortBy) => {
  if (!products || !Array.isArray(products)) {
    return [];
  }

  const sortedProducts = [...products];

  switch (sortBy) {
    case 'price-low-high':
      return sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    case 'price-high-low':
      return sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));

    case 'rating':
      return sortedProducts.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

    case 'newest':
      return sortedProducts.sort((a, b) => {
        // Assuming newer products have higher IDs
        return parseInt(b.id) - parseInt(a.id);
      });

    case 'name-a-z':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));

    case 'name-z-a':
      return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));

    case 'popularity':
      return sortedProducts.sort((a, b) => {
        // Sort by rating and then by number of reviews (simulated)
        const aScore = parseFloat(a.rating) * (Math.random() * 100 + 50);
        const bScore = parseFloat(b.rating) * (Math.random() * 100 + 50);
        return bScore - aScore;
      });

    case 'relevance':
    default:
      // Return original order for relevance
      return sortedProducts;
  }
};

// Helper function to get filter counts
export const getFilterCounts = (products, filters) => {
  const counts = {
    brands: {},
    ratings: { '4': 0, '3': 0, '2': 0, '1': 0 },
    availability: { 'in-stock': 0, 'out-of-stock': 0 },
    priceRanges: {
      'under-25': 0,
      '25-50': 0,
      '50-100': 0,
      '100-200': 0,
      'over-200': 0
    }
  };

  products.forEach(product => {
    // Count brands
    if (product.brand) {
      counts.brands[product.brand] = (counts.brands[product.brand] || 0) + 1;
    }

    // Count ratings
    const rating = Math.floor(parseFloat(product.rating));
    if (rating >= 4) counts.ratings['4']++;
    else if (rating >= 3) counts.ratings['3']++;
    else if (rating >= 2) counts.ratings['2']++;
    else counts.ratings['1']++;

    // Count availability
    if (product.availability) {
      counts.availability[product.availability]++;
    }

    // Count price ranges
    const price = parseFloat(product.price);
    if (price < 25) counts.priceRanges['under-25']++;
    else if (price < 50) counts.priceRanges['25-50']++;
    else if (price < 100) counts.priceRanges['50-100']++;
    else if (price < 200) counts.priceRanges['100-200']++;
    else counts.priceRanges['over-200']++;
  });

  return counts;
};

// Helper function to check if filters are active
export const hasActiveFilters = (filters) => {
  return !!(
    filters.priceRange?.min ||
    filters.priceRange?.max ||
    (filters.brands && filters.brands.length > 0) ||
    filters.rating ||
    filters.availability ||
    filters.searchTerm
  );
};

// Helper function to clear all filters
export const clearAllFilters = () => {
  return {
    priceRange: { min: '', max: '' },
    brands: [],
    rating: '',
    availability: '',
    searchTerm: ''
  };
};

// Helper function to get active filter count
export const getActiveFilterCount = (filters) => {
  let count = 0;

  if (filters.priceRange?.min || filters.priceRange?.max) count++;
  if (filters.brands && filters.brands.length > 0) count++;
  if (filters.rating) count++;
  if (filters.availability) count++;
  if (filters.searchTerm) count++;

  return count;
};
