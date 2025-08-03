import { FiStar, FiTruck, FiShield, FiCheck, FiX } from 'react-icons/fi';

const ProductInfo = ({ product }) => {
  if (!product) return null;

  const {
    name,
    brand,
    price,
    originalPrice,
    discount,
    currency = 'USD',
    rating,
    reviewCount,
    availability,
    stock,
    description,
    features,
    shipping,
    warranty,
    sku
  } = product;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <FiStar key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <FiStar className="w-4 h-4 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <FiStar className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <FiStar key={i} className="w-4 h-4 text-gray-300" />
        );
      }
    }

    return stars;
  };

  const isInStock = availability === 'in-stock' && stock > 0;
  const isLowStock = stock > 0 && stock <= 5;

  return (
    <div className="space-y-6">
      {/* Brand */}
      {brand && (
        <div className="text-sm text-primary-600 font-medium uppercase tracking-wide">
          {brand}
        </div>
      )}

      {/* Product Name */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
          {name}
        </h1>
        {sku && (
          <p className="text-sm text-gray-500 mt-1">
            SKU: {sku}
          </p>
        )}
      </div>

      {/* Rating and Reviews */}
      {rating && (
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {renderStars(rating)}
          </div>
          <span className="text-sm font-medium text-gray-900">
            {rating}
          </span>
          {reviewCount && (
            <span className="text-sm text-gray-500">
              ({reviewCount} reviews)
            </span>
          )}
        </div>
      )}

      {/* Price */}
      <div className="space-y-1">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-gray-900">
            {formatPrice(price)}
          </span>
          {originalPrice && originalPrice > price && (
            <>
              <span className="text-lg text-gray-500 line-through">
                {formatPrice(originalPrice)}
              </span>
              {discount && (
                <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-sm font-medium rounded">
                  {discount}% OFF
                </span>
              )}
            </>
          )}
        </div>
        {originalPrice && originalPrice > price && (
          <p className="text-sm text-green-600 font-medium">
            You save {formatPrice(originalPrice - price)}
          </p>
        )}
      </div>

      {/* Availability */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          {isInStock ? (
            <>
              <FiCheck className="w-5 h-5 text-green-500" />
              <span className="text-green-600 font-medium">In Stock</span>
            </>
          ) : (
            <>
              <FiX className="w-5 h-5 text-red-500" />
              <span className="text-red-600 font-medium">Out of Stock</span>
            </>
          )}
        </div>

        {isInStock && (
          <div className="text-sm text-gray-600">
            {isLowStock ? (
              <span className="text-orange-600 font-medium">
                Only {stock} left in stock
              </span>
            ) : (
              <span>{stock} available</span>
            )}
          </div>
        )}
      </div>

      {/* Description */}
      {description && (
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {description}
          </p>
        </div>
      )}

      {/* Key Features */}
      {features && features.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Key Features
          </h3>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <FiCheck className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Shipping & Warranty Info */}
      <div className="border-t pt-6 space-y-4">
        {/* Shipping */}
        {shipping && (
          <div className="flex items-start space-x-3">
            <FiTruck className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="text-sm">
              <div className="font-medium text-gray-900">
                {shipping.free ? 'Free Shipping' : `Shipping: $${shipping.cost}`}
              </div>
              <div className="text-gray-600">
                {shipping.estimatedDays}
              </div>
              {shipping.expedited && (
                <div className="text-primary-600">
                  {shipping.expedited}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Warranty */}
        {warranty && (
          <div className="flex items-start space-x-3">
            <FiShield className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="text-sm">
              <div className="font-medium text-gray-900">Warranty</div>
              <div className="text-gray-600">{warranty}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
