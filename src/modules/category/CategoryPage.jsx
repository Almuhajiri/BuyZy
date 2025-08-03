import { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { FiGrid, FiList, FiFilter, FiX } from 'react-icons/fi';

// Components
import Breadcrumbs from './components/Breadcrumbs';
import CategoryHeader from './components/CategoryHeader';
import CategoryBanner from './components/CategoryBanner';
import SubcategoryList from './components/SubcategoryList';
import SortControl from './components/SortControl';
import FilterSidebar from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import PaginationControls from './components/PaginationControls';

// Shared components from product module
import ProductCard from '../../components/ProductCard';

// Data and utils
import { getCategoryData } from './data/mockCategoryData.js';
import { filterProducts, sortProducts } from './utils/productFilters.js';
import { useCategoryProducts } from './hooks/useCategoryProducts.js';
import { useCategoryDetails } from './hooks/useCategoryDetails.js';

const CategoryPage = () => {
  const { categorySlug, subcategorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get category details and featured products
  const {
    category,
    subcategory,
    subcategories,
    featuredProducts,
    loading: detailsLoading,
    error: detailsError
  } = useCategoryDetails(categorySlug, subcategorySlug);

  // State
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);

  // URL-based state
  const [filters, setFilters] = useState({
    priceRange: { min: '', max: '' },
    brands: [],
    rating: '',
    availability: '',
    searchTerm: ''
  });

  const [sortBy, setSortBy] = useState('relevance');

  // Load category data
  useEffect(() => {
    const loadCategoryData = async () => {
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

    loadCategoryData();
  }, [categorySlug, subcategorySlug]);

  // Sync URL params with state
  useEffect(() => {
    // Read filters from URL
    const urlFilters = {
      priceRange: {
        min: searchParams.get('minPrice') || '',
        max: searchParams.get('maxPrice') || ''
      },
      brands: searchParams.get('brands')?.split(',').filter(Boolean) || [],
      rating: searchParams.get('rating') || '',
      availability: searchParams.get('availability') || '',
      searchTerm: searchParams.get('search') || ''
    };

    setFilters(urlFilters);
    setSortBy(searchParams.get('sort') || 'relevance');
    setCurrentPage(parseInt(searchParams.get('page')) || 1);
    setItemsPerPage(parseInt(searchParams.get('limit')) || 24);
    setViewMode(searchParams.get('view') || 'grid');
  }, [searchParams]);

  // Update URL when state changes
  const updateSearchParams = (updates) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== '' && value !== 'relevance' && value !== 1 && value !== 24 && value !== 'grid') {
        if (key === 'brands' && Array.isArray(value)) {
          newParams.set(key, value.join(','));
        } else {
          newParams.set(key, value.toString());
        }
      } else {
        newParams.delete(key);
      }
    });

    setSearchParams(newParams);
  };

  // Filter and sort products
  const { filteredProducts, totalProducts } = useMemo(() => {
    if (!categoryData?.products) {
      return { filteredProducts: [], totalProducts: 0 };
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

  // Paginate products
  const { paginatedProducts, totalPages, showingFrom, showingTo } = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = filteredProducts.slice(startIndex, endIndex);

    return {
      paginatedProducts: paginated,
      totalPages: Math.ceil(filteredProducts.length / itemsPerPage),
      showingFrom: startIndex + 1,
      showingTo: Math.min(endIndex, filteredProducts.length)
    };
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Event handlers
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    updateSearchParams({
      ...newFilters,
      minPrice: newFilters.priceRange.min,
      maxPrice: newFilters.priceRange.max,
      brands: newFilters.brands,
      rating: newFilters.rating,
      availability: newFilters.availability,
      search: newFilters.searchTerm,
      page: 1
    });
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    updateSearchParams({ sort: newSortBy });
  };

  const handlePageChange = (page, newItemsPerPage = itemsPerPage) => {
    setCurrentPage(page);
    if (newItemsPerPage !== itemsPerPage) {
      setItemsPerPage(newItemsPerPage);
    }
    updateSearchParams({ page, limit: newItemsPerPage });
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    updateSearchParams({ view: mode });
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      priceRange: { min: '', max: '' },
      brands: [],
      rating: '',
      availability: '',
      searchTerm: ''
    };
    setFilters(clearedFilters);
    setCurrentPage(1);
    setSortBy('relevance');
    setSearchParams({});
  };

  // Loading state
  if (loading || detailsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-64 mb-6"></div>
            <div className="h-12 bg-gray-300 rounded w-96 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="bg-gray-300 rounded h-96"></div>
              <div className="lg:col-span-3">
                <div className="h-12 bg-gray-300 rounded mb-6"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="bg-gray-300 rounded h-64"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || detailsError || !categoryData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-6">{error || detailsError || 'The requested category could not be found.'}</p>
          <a href="/" className="text-primary-600 hover:text-primary-700 font-medium">
            Return to Homepage
          </a>
        </div>
      </div>
    );
  }

  const activeFiltersCount = [
    filters.priceRange.min || filters.priceRange.max,
    filters.brands.length > 0,
    filters.rating,
    filters.availability,
    filters.searchTerm
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          category={categoryData.category}
          subcategory={categoryData.subcategory}
        />

        {/* Category Header/Banner */}
        {/* Use enhanced CategoryBanner for better hero display */}
        <CategoryBanner
          category={categoryData.category}
          subcategory={categoryData.subcategory}
          totalProducts={totalProducts}
          featuredProducts={featuredProducts || []}
        />

        {/* Subcategories */}
        {categoryData.subcategories && categoryData.subcategories.length > 0 && (
          <SubcategoryList
            subcategories={categoryData.subcategories}
            currentSubcategory={subcategorySlug}
            categorySlug={categorySlug}
          />
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFilterChange}
              availableBrands={categoryData.availableBrands}
              priceRange={categoryData.priceRange}
            />
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Mobile Filter Button & Sort Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <FiFilter className="w-4 h-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 px-2 py-1 bg-primary-600 text-white text-xs rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {/* Clear Filters */}
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    Clear all filters
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort Control */}
                <SortControl
                  sortBy={sortBy}
                  onSortChange={handleSortChange}
                />

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleViewModeChange('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} transition-colors duration-200`}
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleViewModeChange('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} transition-colors duration-200`}
                  >
                    <FiList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="mb-6 p-4 bg-white rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900">Active Filters</h3>
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(filters.priceRange.min || filters.priceRange.max) && (
                    <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                      Price: ${filters.priceRange.min || '0'} - ${filters.priceRange.max || '∞'}
                    </span>
                  )}
                  {filters.brands.map(brand => (
                    <span key={brand} className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                      {brand}
                    </span>
                  ))}
                  {filters.rating && (
                    <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                      {filters.rating}+ Stars
                    </span>
                  )}
                  {filters.availability && (
                    <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                      {filters.availability === 'in-stock' ? 'In Stock' : 'Out of Stock'}
                    </span>
                  )}
                  {filters.searchTerm && (
                    <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                      "{filters.searchTerm}"
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Product Grid */}
            <ProductGrid
              products={paginatedProducts}
              loading={loading}
              viewMode={viewMode}
              emptyStateMessage={activeFiltersCount > 0 ? "No products match your current filters." : undefined}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalProducts}
                  itemsPerPage={itemsPerPage}
                  showingFrom={showingFrom}
                  showingTo={showingTo}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute inset-y-0 left-0 max-w-sm w-full bg-white shadow-xl overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <FilterSidebar
                filters={filters}
                onFiltersChange={(newFilters) => {
                  handleFilterChange(newFilters);
                  setShowMobileFilters(false);
                }}
                availableBrands={categoryData.availableBrands}
                priceRange={categoryData.priceRange}
                isMobile={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
