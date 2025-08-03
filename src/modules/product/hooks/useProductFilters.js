import { useState, useMemo } from 'react';

export const useProductFilters = (products) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: { min: null, max: null },
    minRating: null,
    inStockOnly: false,
    onSaleOnly: false
  });

  const updateFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: { min: null, max: null },
      minRating: null,
      inStockOnly: false,
      onSaleOnly: false
    });
    setSearchQuery('');
  };

  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    let filtered = [...products];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      );
    }

    // Apply brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product =>
        product.brand && filters.brands.includes(product.brand)
      );
    }

    // Apply price range filter
    if (filters.priceRange.min !== null || filters.priceRange.max !== null) {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price.replace('$', ''));
        const minCheck = filters.priceRange.min === null || price >= filters.priceRange.min;
        const maxCheck = filters.priceRange.max === null || price <= filters.priceRange.max;
        return minCheck && maxCheck;
      });
    }

    // Apply rating filter
    if (filters.minRating !== null) {
      filtered = filtered.filter(product =>
        product.rating && product.rating >= filters.minRating
      );
    }

    // Apply stock filter
    if (filters.inStockOnly) {
      filtered = filtered.filter(product =>
        product.inStock !== false // Assume products are in stock unless explicitly marked false
      );
    }

    // Apply sale filter
    if (filters.onSaleOnly) {
      filtered = filtered.filter(product =>
        product.originalPrice || product.discount
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low-high':
          return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
        case 'price-high-low':
          return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
        case 'name-a-z':
          return a.name.localeCompare(b.name);
        case 'name-z-a':
          return b.name.localeCompare(a.name);
        case 'best-rated':
          return (b.rating || 0) - (a.rating || 0);
        case 'most-popular':
          return (b.popularity || 0) - (a.popularity || 0);
        case 'newest':
        default:
          return (b.id || 0) - (a.id || 0); // Assuming higher ID = newer
      }
    });

    return filtered;
  }, [products, searchQuery, filters, sortBy]);

  return {
    filteredProducts,
    filters,
    updateFilter,
    clearFilters,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    totalResults: products?.length || 0
  };
};
