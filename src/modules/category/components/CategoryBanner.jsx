import { FiGrid, FiTrendingUp, FiPackage, FiTag, FiStar } from 'react-icons/fi';

const CategoryBanner = ({ category, subcategory, totalProducts = 0, featuredProducts = [] }) => {
  if (!category) {
    return null;
  }

  // Display data for current category/subcategory
  const displayData = subcategory || category;
  const { name, title, description, bannerImage, icon: Icon, color } = displayData;

  // Get featured/trending products
  const trendingProducts = featuredProducts.slice(0, 3);

  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg overflow-hidden mb-8">
      {/* Background Image */}
      {bannerImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${bannerImage})` }}
        />
      )}

      {/* Content Overlay */}
      <div className="relative z-10 p-8 lg:p-12 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Category Icon and Title */}
            <div className="flex items-center mb-4">
              {Icon && (
                <div className={`flex items-center justify-center w-16 h-16 rounded-lg mr-4 ${color ? `bg-${color}-600` : 'bg-primary-600'}`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              )}
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                  {title || name}
                </h1>
                <div className="flex items-center text-white/80">
                  <FiGrid className="w-4 h-4 mr-2" />
                  <span>{totalProducts} products available</span>
                  {subcategory && (
                    <>
                      <FiTag className="w-4 h-4 ml-4 mr-2" />
                      <span>in {category.name}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            {description && (
              <p className="text-lg text-white/90 leading-relaxed max-w-3xl mb-6">
                {description}
              </p>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <FiPackage className="w-5 h-5 mr-2 text-primary-300" />
                  <span className="text-sm text-white/80">Products</span>
                </div>
                <div className="text-2xl font-bold">{totalProducts}</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <FiTrendingUp className="w-5 h-5 mr-2 text-green-300" />
                  <span className="text-sm text-white/80">Trending</span>
                </div>
                <div className="text-2xl font-bold">Hot</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 col-span-2 md:col-span-1">
                <div className="flex items-center mb-2">
                  <FiStar className="w-5 h-5 mr-2 text-yellow-300" />
                  <span className="text-sm text-white/80">Top Rated</span>
                </div>
                <div className="text-2xl font-bold">4.5+</div>
              </div>
            </div>
          </div>

          {/* Featured Products Preview */}
          {trendingProducts.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FiTrendingUp className="w-5 h-5 mr-2 text-green-300" />
                  Trending Products
                </h3>
                <div className="space-y-3">
                  {trendingProducts.map((product, index) => (
                    <div key={product.id} className="flex items-center space-x-3 group cursor-pointer">
                      <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-white/70">
                          {product.price}
                        </p>
                      </div>
                      <div className="text-white/50 text-sm">
                        #{index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900/80 to-transparent" />
    </div>
  );
};

export default CategoryBanner;
