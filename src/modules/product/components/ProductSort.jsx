import { FiChevronDown } from 'react-icons/fi';

const ProductSort = ({ sortBy, onSortChange }) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'name-a-z', label: 'Name: A–Z' },
    { value: 'name-z-a', label: 'Name: Z–A' },
    { value: 'most-popular', label: 'Most Popular' },
    { value: 'best-rated', label: 'Best Rated' }
  ];

  const currentSort = sortOptions.find(option => option.value === sortBy) || sortOptions[0];

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Sort by:
      </label>
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 min-w-[180px]"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <FiChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default ProductSort;
