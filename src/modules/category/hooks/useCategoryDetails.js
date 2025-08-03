import { useState, useEffect, useMemo } from 'react';
import { getCategoryData } from '../data/mockCategoryData.js';
import { filterProducts, sortProducts } from '../utils/productFilters.js';

export const useCategoryDetails = (categorySlug, subcategorySlug) => {
  // State
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Computed properties
  const categoryInfo = useMemo(() => {
    if (!categoryData) return null;

    return {
      category: categoryData.category,
      subcategory: categoryData.subcategory,
      isSubcategoryView: !!subcategorySlug,
      totalProducts: categoryData.products?.length || 0,
      subcategories: categoryData.subcategories || [],
      availableBrands: categoryData.availableBrands || [],
      priceRange: categoryData.priceRange || { min: 0, max: 1000 },
      products: categoryData.products || []
    };
  }, [categoryData, subcategorySlug]);

  // Featured/trending products
  const featuredProducts = useMemo(() => {
    if (!categoryData?.products) return [];

    // Return top-rated products as featured
    return [...categoryData.products]
      .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
      .slice(0, 6);
  }, [categoryData?.products]);

  return {
    ...categoryInfo,
    featuredProducts,
    loading,
    error,
    refresh: () => {
      if (categorySlug) {
        loadData();
      }
    }
  };
};

// Hook for filtering and managing products in category
export const useCategoryProducts = (
  categorySlug,
  subcategorySlug,
  initialFilters = {},
  initialSortBy = 'relevance'
) => {
  const { products: allProducts, loading, error, ...categoryInfo } = useCategoryDetails(categorySlug, subcategorySlug);

  const [filters, setFilters] = useState({
    priceRange: { min: '', max: '' },
    brands: [],
    rating: '',
    availability: '',
    searchTerm: '',
    ...initialFilters
  });
  const [sortBy, setSortBy] = useState(initialSortBy);

  // Memoized filtered and sorted products
  const processedProducts = useMemo(() => {
    if (!allProducts) {
      return { filteredProducts: [], totalProducts: 0 };
    }

    let products = [...allProducts];

    // Apply filters
    products = filterProducts(products, filters);

    // Apply sorting
    products = sortProducts(products, sortBy);

    return {
      filteredProducts: products,
      totalProducts: products.length
    };
  }, [allProducts, filters, sortBy]);

  // Filter management functions
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: { min: '', max: '' },
      brands: [],
      rating: '',
      availability: '',
      searchTerm: ''
    });
  };

  const updateSort = (newSortBy) => {
    setSortBy(newSortBy);
  };

  return {
    ...categoryInfo,
    ...processedProducts,
    filters,
    sortBy,
    updateFilters,
    clearFilters,
    updateSort,
    loading,
    error
  };
};
