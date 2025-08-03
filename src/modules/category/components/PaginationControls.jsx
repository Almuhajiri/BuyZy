import { FiChevronLeft, FiChevronRight, FiMoreHorizontal } from 'react-icons/fi';

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  showingFrom,
  showingTo
}) => {
  // Don't render if there's only one page or no items
  if (totalPages <= 1) {
    return null;
  }

  const generatePageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    // Calculate start and end based on current page and delta
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Always show first page
    if (start > 2) {
      rangeWithDots.push(1, '...');
    } else if (start === 2) {
      rangeWithDots.push(1);
    } else {
      rangeWithDots.push(1);
    }

    // Add the calculated range
    rangeWithDots.push(...range);

    // Always show last page
    if (end < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (end === totalPages - 1) {
      rangeWithDots.push(totalPages);
    } else if (totalPages > 1 && !rangeWithDots.includes(totalPages)) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pageNumbers = generatePageNumbers();

  const handlePageClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageClick(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 bg-white px-4 py-3 border-t border-gray-200">
      {/* Results info */}
      <div className="text-sm text-gray-700">
        Showing <span className="font-medium">{showingFrom}</span> to{' '}
        <span className="font-medium">{showingTo}</span> of{' '}
        <span className="font-medium">{totalItems}</span> results
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-2">
        {/* Previous button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`
            relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg
            ${currentPage === 1
              ? 'text-gray-400 cursor-not-allowed bg-gray-100'
              : 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-300'
            }
            transition-colors duration-200
          `}
        >
          <FiChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        {/* Page numbers */}
        <div className="hidden sm:flex items-center space-x-1">
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`dots-${index}`}
                  className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500"
                >
                  <FiMoreHorizontal className="w-4 h-4" />
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`
                  relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg
                  ${page === currentPage
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-300'
                  }
                  transition-colors duration-200
                `}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Mobile page indicator */}
        <div className="sm:hidden flex items-center space-x-2">
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`
            relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg
            ${currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed bg-gray-100'
              : 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-300'
            }
            transition-colors duration-200
          `}
        >
          Next
          <FiChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* Items per page selector */}
      <div className="flex items-center space-x-2 text-sm text-gray-700">
        <span>Show:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onPageChange(1, parseInt(e.target.value))}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={48}>48</option>
          <option value={96}>96</option>
        </select>
        <span>per page</span>
      </div>
    </div>
  );
};

export default PaginationControls;
