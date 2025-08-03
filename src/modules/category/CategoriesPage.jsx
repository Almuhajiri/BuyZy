import { Link } from 'react-router-dom';
import { FiArrowRight, FiGrid, FiTrendingUp } from 'react-icons/fi';
import { categories } from '../homepage/data/categories.js';

const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our wide range of products organized by category. Find exactly what you're looking for with our easy-to-browse categories.
          </p>
        </div>

        {/* Featured Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FiTrendingUp className="w-6 h-6 mr-2 text-primary-600" />
            Featured Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.filter(cat => cat.featured).map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Category Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />

                  {/* Category Icon */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
                    <category.icon className="w-6 h-6 text-primary-600" />
                  </div>

                  {/* Product Count Badge */}
                  <div className="absolute top-4 right-4 bg-primary-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                    {category.productCount} products
                  </div>
                </div>

                {/* Category Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700">
                    Shop Now
                    <FiArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Categories */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FiGrid className="w-6 h-6 mr-2 text-primary-600" />
            All Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 hover:border-primary-300"
              >
                {/* Category Icon */}
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-50 rounded-lg flex items-center justify-center group-hover:bg-primary-100 transition-colors duration-200">
                  <category.icon className="w-8 h-8 text-primary-600" />
                </div>

                {/* Category Name */}
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                  {category.name}
                </h3>

                {/* Product Count */}
                <p className="text-sm text-gray-500">
                  {category.productCount} products
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-white rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Can't find what you're looking for?
          </h3>
          <p className="text-gray-600 mb-6">
            Use our search feature to find specific products or browse all our products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/product"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              <FiGrid className="w-5 h-5 mr-2" />
              Browse All Products
            </Link>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
