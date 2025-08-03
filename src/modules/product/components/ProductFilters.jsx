import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { categories } from '../../homepage/data/categories';

const ProductFilters = ({ filters, onFilterChange, products }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true,
    availability: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Get unique brands from products
  const brands = [...new Set(products.map(p => p.brand).filter(Boolean))].sort();

  // Calculate price range from products
  const prices = products.map(p => parseFloat(p.price.replace('$', '')));
  const minPrice = Math.floor(Math.min(...prices));
  const maxPrice = Math.ceil(Math.max(...prices));

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-gray-200 pb-6 mb-6 last:border-b-0 last:mb-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        {expandedSections[sectionKey] ? (
          <FiChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <FiChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className="mt-4 space-y-3">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-0">
      {/* Category Filter */}
      <FilterSection title="Category" sectionKey="category">
        <div className="space-y-2">
          {categories.map((category) => {
            const productCount = products.filter(p => p.category === category.id).length;
            return (
              <label key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.id)}
                  onChange={(e) => {
                    const newCategories = e.target.checked
                      ? [...filters.categories, category.id]
                      : filters.categories.filter(id => id !== category.id);
                    onFilterChange('categories', newCategories);
                  }}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-3 text-sm text-gray-700 flex-1">
                  {category.name}
                </span>
                <span className="text-xs text-gray-500">({productCount})</span>
              </label>
            );
          })}
        </div>
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection title="Price Range" sectionKey="price">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceRange.min || ''}
              onChange={(e) => onFilterChange('priceRange', {
                ...filters.priceRange,
                min: e.target.value ? Number(e.target.value) : null
              })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              min={minPrice}
              max={maxPrice}
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceRange.max || ''}
              onChange={(e) => onFilterChange('priceRange', {
                ...filters.priceRange,
                max: e.target.value ? Number(e.target.value) : null
              })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              min={minPrice}
              max={maxPrice}
            />
          </div>

          <div className="space-y-2">
            {[
              { label: 'Under $25', min: 0, max: 25 },
              { label: '$25 - $50', min: 25, max: 50 },
              { label: '$50 - $100', min: 50, max: 100 },
              { label: '$100 - $200', min: 100, max: 200 },
              { label: 'Over $200', min: 200, max: null }
            ].map((range) => (
              <label key={range.label} className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  checked={
                    filters.priceRange.min === range.min &&
                    filters.priceRange.max === range.max
                  }
                  onChange={() => onFilterChange('priceRange', {
                    min: range.min,
                    max: range.max
                  })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        </div>
      </FilterSection>

      {/* Brand Filter (if brands exist) */}
      {brands.length > 0 && (
        <FilterSection title="Brand" sectionKey="brand">
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {brands.map((brand) => {
              const productCount = products.filter(p => p.brand === brand).length;
              return (
                <label key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={(e) => {
                      const newBrands = e.target.checked
                        ? [...filters.brands, brand]
                        : filters.brands.filter(b => b !== brand);
                      onFilterChange('brands', newBrands);
                    }}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-3 text-sm text-gray-700 flex-1">{brand}</span>
                  <span className="text-xs text-gray-500">({productCount})</span>
                </label>
              );
            })}
          </div>
        </FilterSection>
      )}

      {/* Rating Filter */}
      <FilterSection title="Customer Rating" sectionKey="rating">
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const productCount = products.filter(p => p.rating && p.rating >= rating).length;
            return (
              <label key={rating} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === rating}
                  onChange={() => onFilterChange('minRating', rating)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <div className="ml-3 flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-700">& up</span>
                  <span className="text-xs text-gray-500">({productCount})</span>
                </div>
              </label>
            );
          })}
        </div>
      </FilterSection>

      {/* Availability Filter */}
      <FilterSection title="Availability" sectionKey="availability">
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => onFilterChange('inStockOnly', e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="ml-3 text-sm text-gray-700">In Stock Only</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.onSaleOnly}
              onChange={(e) => onFilterChange('onSaleOnly', e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="ml-3 text-sm text-gray-700">On Sale</span>
          </label>
        </div>
      </FilterSection>
    </div>
  );
};

export default ProductFilters;
