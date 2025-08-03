import { useState } from 'react';
import { FiFilter, FiX, FiChevronDown, FiSearch } from 'react-icons/fi';

const CategoryFilterBar = ({
  category,
  subcategory,
  onFiltersChange,
  availableBrands = [],
  priceRange = { min: 0, max: 1000 },
  currentFilters = {},
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState(currentFilters.searchTerm || '');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFiltersChange({ ...currentFilters, searchTerm: value });
  };

  const handleQuickFilter = (filterType, value) => {
    const newFilters = { ...currentFilters };

    switch (filterType) {
      case 'price':
        newFilters.priceRange = value;
        break;
      case 'rating':
        newFilters.rating = value;
        break;
      case 'availability':
        newFilters.availability = value;
        break;
      case 'brand':
        if (newFilters.brands.includes(value)) {
          newFilters.brands = newFilters.brands.filter(b => b !== value);
        } else {
          newFilters.brands = [...newFilters.brands, value];
        }
        break;
      default:
        break;
    }

    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    setSearchTerm('');
    onFiltersChange({
      priceRange: { min: '', max: '' },
      brands: [],
      rating: '',
      availability: '',
      searchTerm: ''
    });
  };

  const hasActiveFilters = currentFilters.searchTerm ||
    currentFilters.brands?.length > 0 ||
    currentFilters.rating ||
    currentFilters.availability ||
    currentFilters.priceRange?.min ||
    currentFilters.priceRange?.max;

  return (
    <div className={`bg-white rounded-lg shadow-sm border mb-6 ${className}`}>
      {/* Main Filter Bar */}
      <div className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={`Search in ${subcategory?.name || category?.name || 'category'}...`}
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {/* Expand/Collapse Filters */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <FiFilter className="w-4 h-4 mr-2" />
              Filters
              <FiChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <FiX className="w-4 h-4 mr-1" />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t border-gray-100 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Price Range Quick Filters */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Price Range</h4>
              <div className="space-y-2">
                {[
                  { label: 'Under $25', value: { min: '', max: '25' } },
                  { label: '$25 - $50', value: { min: '25', max: '50' } },
                  { label: '$50 - $100', value: { min: '50', max: '100' } },
                  { label: 'Over $100', value: { min: '100', max: '' } },
                ].map((range) => (
                  <button
                    key={range.label}
                    onClick={() => handleQuickFilter('price', range.value)}
                    className={`block w-full text-left px-3 py-1 rounded text-sm transition-colors duration-200 ${currentFilters.priceRange?.min === range.value.min &&
                        currentFilters.priceRange?.max === range.value.max
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Rating</h4>
              <div className="space-y-2">
                {['4', '3', '2'].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleQuickFilter('rating', rating)}
                    className={`block w-full text-left px-3 py-1 rounded text-sm transition-colors duration-200 ${currentFilters.rating === rating
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    {rating}+ Stars & Up
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Availability</h4>
              <div className="space-y-2">
                {[
                  { label: 'In Stock', value: 'in-stock' },
                  { label: 'Out of Stock', value: 'out-of-stock' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleQuickFilter('availability', option.value)}
                    className={`block w-full text-left px-3 py-1 rounded text-sm transition-colors duration-200 ${currentFilters.availability === option.value
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Brands */}
            {availableBrands.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Popular Brands</h4>
                <div className="space-y-2">
                  {availableBrands.slice(0, 4).map((brand) => (
                    <button
                      key={brand}
                      onClick={() => handleQuickFilter('brand', brand)}
                      className={`block w-full text-left px-3 py-1 rounded text-sm transition-colors duration-200 ${currentFilters.brands?.includes(brand)
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilterBar;
