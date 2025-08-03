import ProductCard from '../../../components/ProductCard';
import { FiGrid, FiPackage } from 'react-icons/fi';

const ProductGrid = ({ products, loading, viewMode = 'grid', emptyStateMessage }) => {
  // Loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-1/3 mb-3"></div>
              <div className="h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-gray-100 rounded-full p-8 mb-6">
          <FiPackage className="w-16 h-16 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Products Found
        </h3>
        <p className="text-gray-600 max-w-md">
          {emptyStateMessage || "We couldn't find any products matching your criteria. Try adjusting your filters or search terms."}
        </p>
        <div className="mt-6 space-y-2 text-sm text-gray-500">
          <p>• Try removing some filters</p>
          <p>• Check your spelling</p>
          <p>• Use more general search terms</p>
        </div>
      </div>
    );
  }

  // Grid view
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} viewMode="grid" />
        ))}
      </div>
    );
  }

  // List view - Use shared ProductCard with list view mode
  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} viewMode="list" />
        ))}
      </div>
    );
  }

  return null;
};

export default ProductGrid;
