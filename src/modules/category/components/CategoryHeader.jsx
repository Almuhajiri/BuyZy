import { FiGrid, FiTrendingUp, FiPackage, FiTag } from 'react-icons/fi';

const CategoryHeader = ({ category, subcategory, totalProducts = 0 }) => {
  if (!category) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 mb-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const { name, title, description, bannerImage, icon: Icon } = category;

  // Display the current category/subcategory being viewed
  const displayName = subcategory ? subcategory.name : (title || name);
  const displayDescription = subcategory ? subcategory.description : description;
  const displayImage = subcategory?.bannerImage || bannerImage;

  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg overflow-hidden mb-8">
      {/* Background Image */}
      {displayImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${displayImage})` }}
        />
      )}

      {/* Content Overlay */}
      <div className="relative z-10 p-8 lg:p-12 text-white">
        <div className="max-w-4xl">
          {/* Category Icon and Title */}
          <div className="flex items-center mb-4">
            {Icon && (
              <div className="flex items-center justify-center w-16 h-16 bg-primary-600 rounded-lg mr-4">
                <Icon className="w-8 h-8 text-white" />
              </div>
            )}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                {displayName}
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
          {displayDescription && (
            <p className="text-lg text-white/90 leading-relaxed max-w-3xl">
              {displayDescription}
            </p>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
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
                <span className="w-5 h-5 mr-2 text-yellow-300">★</span>
                <span className="text-sm text-white/80">Top Rated</span>
              </div>
              <div className="text-2xl font-bold">4.5+</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900/80 to-transparent" />
    </div>
  );
};

export default CategoryHeader;
