import { useState } from 'react';
import { FiChevronDown, FiGrid, FiList } from 'react-icons/fi';
import { SORT_OPTIONS } from '../utils/filterUtils';

const SortControl = ({
  sortBy,
  onSortChange,
  totalProducts,
  viewMode = 'grid',
  onViewModeChange
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentSort = SORT_OPTIONS.find(option => option.value === sortBy);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      {/* Results Count */}
      <div className="flex items-center text-gray-600">
        <span className="text-sm">
          Showing <span className="font-medium text-gray-900">{totalProducts}</span> results
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        {/* View Mode Toggle */}
        {onViewModeChange && (
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 transition-colors duration-200 ${viewMode === 'grid'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              title="Grid View"
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 transition-colors duration-200 ${viewMode === 'list'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              title="List View"
            >
              <FiList className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors duration-200 min-w-[180px] justify-between"
          >
            <span className="text-sm text-gray-700">
              Sort: {currentSort?.label || 'Select'}
            </span>
            <FiChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />

              {/* Dropdown Content */}
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                <div className="py-1">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSortSelect(option.value)}
                      className={`
                        w-full text-left px-4 py-2 text-sm transition-colors duration-200
                        ${sortBy === option.value
                          ? 'bg-primary-50 text-primary-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortControl;
