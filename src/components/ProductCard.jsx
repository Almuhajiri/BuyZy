import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { id, name, price, image, originalPrice, discount, rating, description } = product;

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <div className="flex gap-4 p-4">
          {/* Product Image */}
          <div className="relative flex-shrink-0 w-32 h-32">
            <Link to={`/product/${id}`}>
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover rounded-lg hover:opacity-80 transition-opacity duration-200"
              />
            </Link>

            {/* Discount Badge */}
            {discount && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{discount}%
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <Link to={`/product/${id}`}>
                  <h3 className="text-lg font-medium text-gray-900 hover:text-primary-600 transition-colors duration-200 line-clamp-1">
                    {name}
                  </h3>
                </Link>

                {/* Description */}
                {description && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {description}
                  </p>
                )}

                {/* Rating */}
                {rating && (
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                        />
                      ))}
                    </div>
                    <span className="ml-1 text-sm text-gray-600">({rating})</span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xl font-bold text-gray-900">{price}</span>
                  {originalPrice && (
                    <span className="text-sm text-gray-500 line-through">{originalPrice}</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200">
                  <FiHeart className="w-5 h-5" />
                </button>

                <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  <FiShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>

                <Link
                  to={`/product/${id}`}
                  className="text-center text-sm text-primary-600 hover:text-primary-700 font-medium py-2 px-4 border border-primary-600 hover:border-primary-700 rounded-lg transition-colors duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}

        {/* Wishlist Button */}
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50">
          <FiHeart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </button>

        {/* Quick Add to Cart */}
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200">
            <FiShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="text-lg font-medium text-gray-900 mb-2 hover:text-primary-600 transition-colors duration-200 line-clamp-2">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        {rating && (
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                />
              ))}
            </div>
            <span className="ml-1 text-sm text-gray-600">({rating})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-gray-900">{price}</span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">{originalPrice}</span>
          )}
        </div>

        {/* View Product Button */}
        <Link
          to={`/product/${id}`}
          className="mt-3 w-full btn-secondary text-center inline-block"
        >
          View Product
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
