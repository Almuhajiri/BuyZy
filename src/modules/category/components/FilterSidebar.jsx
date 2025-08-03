import { useState } from 'react';
import { FiFilter, FiX, FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi';
import { RATING_OPTIONS } from '../utils/filterUtils';

const FilterSidebar = ({
  isOpen,
  onClose,
  filters,
  filterOptions,
  onUpdateFilter,
  onUpdatePriceRange,
  onToggleBrand,
  onClearFilters,
  hasActiveFilters
}) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brands: true,
    rating: true,
    availability: true
  });

  const [priceInputs, setPriceInputs] = useState({
    min: filters.priceRange?.min || '',
    max: filters.priceRange?.max || ''
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePriceChange = (type, value) => {
    const numValue = value === '' ? '' : parseInt(value);
    setPriceInputs(prev => ({
      ...prev,
      [type]: numValue
    }));
  };

  const applyPriceFilter = () => {
    const min = priceInputs.min === '' ? filterOptions?.priceRange?.min || 0 : priceInputs.min;
    const max = priceInputs.max === '' ? filterOptions?.priceRange?.max || 999999 : priceInputs.max;

    if (min <= max) {
      onUpdatePriceRange(min, max);
    }
  };

  const clearPriceFilter = () => {
    setPriceInputs({ min: '', max: '' });
    onUpdateFilter('priceRange', null);
  };

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="font-medium text-gray-900">{title}</span>
        {expandedSections[sectionKey] ? (
          <FiChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <FiChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {expandedSections[sectionKey] && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <FiFilter className="w-5 h-5 mr-2 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear All
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200 lg:hidden"
          >
            <FiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Search Filter */}
      <FilterSection title="Search" sectionKey="search">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => onUpdateFilter('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
          />
        </div>
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection title="Price Range" sectionKey="price">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Min</label>
              <input
                type="number"
                placeholder={filterOptions?.priceRange?.min || '0'}
                value={priceInputs.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Max</label>
              <input
                type="number"
                placeholder={filterOptions?.priceRange?.max || '999'}
                value={priceInputs.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={applyPriceFilter}
              className="flex-1 px-3 py-2 bg-primary-600 text-white text-sm font-medium rounded hover:bg-primary-700 transition-colors duration-200"
            >
              Apply
            </button>
            {filters.priceRange && (
              <button
                onClick={clearPriceFilter}
                className="px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors duration-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </FilterSection>

      {/* Brands Filter */}
      {filterOptions?.brands && filterOptions.brands.length > 0 && (
        <FilterSection title="Brands" sectionKey="brands">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {filterOptions.brands.map((brand) => (
              <label key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => onToggleBrand(brand)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-3 text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Rating Filter */}
      <FilterSection title="Customer Rating" sectionKey="rating">
        <div className="space-y-2">
          {RATING_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === option.value}
                onChange={() => onUpdateFilter('minRating', option.value)}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="ml-3 text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
          <label className="flex items-center">
            <input
              type="radio"
              name="rating"
              checked={filters.minRating === null}
              onChange={() => onUpdateFilter('minRating', null)}
              className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
            />
            <span className="ml-3 text-sm text-gray-700">All Ratings</span>
          </label>
        </div>
      </FilterSection>

      {/* Availability Filter */}
      <FilterSection title="Availability" sectionKey="availability">
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="availability"
              checked={filters.availability === 'in-stock'}
              onChange={() => onUpdateFilter('availability', 'in-stock')}
              className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
            />
            <span className="ml-3 text-sm text-gray-700">In Stock</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="availability"
              checked={filters.availability === null}
              onChange={() => onUpdateFilter('availability', null)}
              className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
            />
            <span className="ml-3 text-sm text-gray-700">All Items</span>
          </label>
        </div>
      </FilterSection>
    </>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:w-64 xl:w-80 flex-shrink-0
      `}>
        <div className="h-full overflow-y-auto border-r border-gray-200 lg:border-r-0">
          {sidebarContent}
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
