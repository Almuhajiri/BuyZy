import { FiShoppingCart, FiTrendingUp } from 'react-icons/fi';

const AboutHero = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black opacity-10">
        <svg className="absolute inset-0 h-full w-full" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="0,100 100,0 100,100" fillOpacity="0.1" />
        </svg>
      </div>

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)'
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-white bg-opacity-20 rounded-full">
                <FiShoppingCart className="w-12 h-12 text-white" />
              </div>
              <div className="p-4 bg-white bg-opacity-20 rounded-full">
                <FiTrendingUp className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            About
            <span className="text-yellow-300"> Buyzy</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-white text-opacity-90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Built for Shoppers, Designed for Trust
          </p>

          {/* Description */}
          <p className="text-lg text-white text-opacity-80 max-w-2xl mx-auto mb-12 leading-relaxed">
            Discover our journey of creating the ultimate online shopping experience that puts customers first,
            combines cutting-edge technology with human-centered design, and builds lasting relationships.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-white text-opacity-80">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-white text-opacity-80">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-white text-opacity-80">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20 fill-gray-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default AboutHero;
