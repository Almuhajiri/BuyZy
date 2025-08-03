import { useState, useEffect, useMemo } from 'react';
import { getCategoryData } from '../data/mockCategoryData.js';
import { filterProducts, sortProducts } from '../utils/productFilters.js';

export const useCategoryProducts = (categorySlug, subcategorySlug, initialFilters = {}, initialSortBy = 'relevance') => {
  // State
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    priceRange: { min: '', max: '' },
    brands: [],
    rating: '',
    availability: '',
    searchTerm: '',
    ...initialFilters
  });
  const [sortBy, setSortBy] = useState(initialSortBy);

  // Load category data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getCategoryData(categorySlug, subcategorySlug);

        if (!data) {
          setError('Category not found');
          return;
        }

        setCategoryData(data);
      } catch (err) {
        setError('Failed to load category data');
        console.error('Error loading category:', err);
      } finally {
        setLoading(false);
      }
    };

    if (categorySlug) {
      loadData();
    }
  }, [categorySlug, subcategorySlug]);

  // Memoized filtered and sorted products
  const processedProducts = useMemo(() => {
    if (!categoryData?.products) {
      return {
        filteredProducts: [],
        totalProducts: 0
      };
    }

    let products = [...categoryData.products];

    // Apply filters
    products = filterProducts(products, filters);

    // Apply sorting
    products = sortProducts(products, sortBy);

    return {
      filteredProducts: products,
      totalProducts: products.length
    };
  }, [categoryData?.products, filters, sortBy]);

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  // Update sort
  const updateSort = (newSortBy) => {
    setSortBy(newSortBy);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      priceRange: { min: '', max: '' },
      brands: [],
      rating: '',
      availability: '',
      searchTerm: ''
    });
  };

  // Pagination helper
  const getPaginatedProducts = (page = 1, itemsPerPage = 24) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = processedProducts.filteredProducts.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      totalPages: Math.ceil(processedProducts.totalProducts / itemsPerPage),
      showingFrom: startIndex + 1,
      showingTo: Math.min(endIndex, processedProducts.totalProducts),
      totalItems: processedProducts.totalProducts
    };
  };

  return {
    // Data
    categoryData,
    loading,
    error,

    // Products
    ...processedProducts,

    // Filters
    filters,
    sortBy,
    updateFilters,
    updateSort,
    clearFilters,

    // Pagination
    getPaginatedProducts,

    // Computed properties
    hasProducts: processedProducts.totalProducts > 0,
    hasActiveFilters: !!(
      filters.priceRange?.min ||
      filters.priceRange?.max ||
      (filters.brands && filters.brands.length > 0) ||
      filters.rating ||
      filters.availability ||
      filters.searchTerm
    ),
    activeFilterCount: [
      filters.priceRange?.min || filters.priceRange?.max,
      filters.brands && filters.brands.length > 0,
      filters.rating,
      filters.availability,
      filters.searchTerm
    ].filter(Boolean).length
  };
};
