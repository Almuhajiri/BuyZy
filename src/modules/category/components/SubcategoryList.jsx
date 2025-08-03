import { Link, useSearchParams } from 'react-router-dom';
import { FiTag, FiPackage } from 'react-icons/fi';

const SubcategoryList = ({ subcategories, currentSubcategory, categorySlug }) => {
  const [searchParams] = useSearchParams();

  if (!subcategories || subcategories.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FiTag className="w-5 h-5 text-primary-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Shop by Category</h3>
        </div>
        <span className="text-sm text-gray-500">
          {subcategories.length} {subcategories.length === 1 ? 'category' : 'categories'}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {/* All Products Option */}
        <Link
          to={`/category/${categorySlug}`}
          className={`
            group flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md
            ${!currentSubcategory
              ? 'border-primary-600 bg-primary-50 text-primary-700'
              : 'border-gray-200 hover:border-primary-300 text-gray-700 hover:text-primary-600'
            }
          `}
        >
          <FiPackage className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform duration-200" />
          <span className="text-sm font-medium text-center">All Products</span>
        </Link>

        {/* Subcategory Options */}
        {subcategories.map((subcategory) => (
          <Link
            key={subcategory.slug}
            to={`/category/${categorySlug}/${subcategory.slug}`}
            className={`
              group flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md
              ${currentSubcategory === subcategory.slug
                ? 'border-primary-600 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-primary-300 text-gray-700 hover:text-primary-600'
              }
            `}
          >
            {subcategory.icon ? (
              <subcategory.icon className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform duration-200" />
            ) : (
              <FiTag className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform duration-200" />
            )}
            <span className="text-sm font-medium text-center mb-1">{subcategory.name}</span>
            <span className="text-xs text-gray-500">
              {subcategory.productCount || 0} products
            </span>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span>• Browse {subcategories.length} subcategories</span>
          <span>• Find exactly what you're looking for</span>
          <span>• Quick filtering by product type</span>
        </div>
      </div>
    </div>
  );
};

export default SubcategoryList;
