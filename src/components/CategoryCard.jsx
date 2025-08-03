import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const { id, name, icon: Icon, image, productCount, description, slug } = category;

  return (
    <Link
      to={`/category/${slug || id}`}
      className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Category Image/Icon */}
      <div className="relative h-40 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <Icon className="w-16 h-16 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
      </div>

      {/* Category Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors duration-200">
          {name}
        </h3>

        {description && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {description}
          </p>
        )}

        {productCount && (
          <p className="text-sm text-gray-500">
            {productCount} {productCount === 1 ? 'product' : 'products'}
          </p>
        )}

        <div className="mt-3 flex items-center text-primary-600 text-sm font-medium group-hover:text-primary-700 transition-colors duration-200">
          <span>Browse Category</span>
          <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
