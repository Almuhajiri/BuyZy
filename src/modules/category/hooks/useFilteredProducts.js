import { useState, useEffect, useMemo } from 'react';
import { getProductsByCategory, getBrandsByCategory, getPriceRangeByCategory } from '../data/mockProducts';
import { filterProducts, sortProducts, paginateProducts, debounce } from '../utils/filterUtils';

export const useFilteredProducts = (categorySlug) => {
  // Base data
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    priceRange: null,
    brands: [],
    minRating: null,
    availability: null,
    subcategory: null,
    search: ''
  });

  // Sorting and pagination states
  const [sortBy, setSortBy] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // Initialize products data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const products = getProductsByCategory(categorySlug);
        setAllProducts(products);
        setError(null);
      } catch (err) {
        setError('Failed to load products');
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (categorySlug) {
      fetchProducts();
      // Reset filters when category changes
      setFilters({
        priceRange: null,
        brands: [],
        minRating: null,
        availability: null,
        subcategory: null,
        search: ''
      });
      setCurrentPage(1);
    }
  }, [categorySlug]);

  // Get available filter options
  const filterOptions = useMemo(() => {
    if (!allProducts.length) return null;

    return {
      brands: getBrandsByCategory(categorySlug),
      priceRange: getPriceRangeByCategory(categorySlug),
      subcategories: [...new Set(allProducts.map(p => p.subcategory))].filter(Boolean)
    };
  }, [allProducts, categorySlug]);

  // Apply filters and sorting
  const { filteredProducts, paginatedResult } = useMemo(() => {
    // Apply filters
    let filtered = filterProducts(allProducts, filters);

    // Apply sorting
    filtered = sortProducts(filtered, sortBy);

    // Apply pagination
    const paginated = paginateProducts(filtered, currentPage, itemsPerPage);

    return {
      filteredProducts: filtered,
      paginatedResult: paginated
    };
  }, [allProducts, filters, sortBy, currentPage, itemsPerPage]);

  // Debounced search function
  const debouncedSetSearch = useMemo(
    () => debounce((searchTerm) => {
      setFilters(prev => ({ ...prev, search: searchTerm }));
      setCurrentPage(1); // Reset to first page when searching
    }, 300),
    []
  );

  // Filter update functions
  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const updatePriceRange = (min, max) => {
    updateFilter('priceRange', { min, max });
  };

  const toggleBrand = (brand) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      priceRange: null,
      brands: [],
      minRating: null,
      availability: null,
      subcategory: null,
      search: ''
    });
    setCurrentPage(1);
  };

  const updateSort = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.priceRange !== null ||
      filters.brands.length > 0 ||
      filters.minRating !== null ||
      filters.availability !== null ||
      filters.subcategory !== null ||
      filters.search !== ''
    );
  }, [filters]);

  return {
    // Data
    products: paginatedResult.products,
    allProducts: filteredProducts,
    loading,
    error,

    // Filter options
    filterOptions,

    // Current filter state
    filters,
    sortBy,
    currentPage,

    // Pagination info
    totalPages: paginatedResult.totalPages,
    totalProducts: paginatedResult.totalProducts,
    hasNextPage: paginatedResult.hasNextPage,
    hasPrevPage: paginatedResult.hasPrevPage,

    // Filter actions
    updateFilter,
    updatePriceRange,
    toggleBrand,
    clearFilters,
    hasActiveFilters,

    // Search actions
    setSearch: debouncedSetSearch,

    // Sort actions
    updateSort,

    // Pagination actions
    goToPage,
    nextPage: () => paginatedResult.hasNextPage && goToPage(currentPage + 1),
    prevPage: () => paginatedResult.hasPrevPage && goToPage(currentPage - 1)
  };
};
