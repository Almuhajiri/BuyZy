import { whyChooseUs } from '../data/whyChooseUs.js';
import { FiArrowRight } from 'react-icons/fi';

const WhyChooseUs = () => {
  const getColorClasses = (color) => {
    const colorMap = {
      green: 'bg-green-50 border-green-200 text-green-700',
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      purple: 'bg-purple-50 border-purple-200 text-purple-700',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      orange: 'bg-orange-50 border-orange-200 text-orange-700',
      pink: 'bg-pink-50 border-pink-200 text-pink-700',
    };
    return colorMap[color] || 'bg-gray-50 border-gray-200 text-gray-700';
  };

  const getIconColorClasses = (color) => {
    const iconColorMap = {
      green: 'bg-green-100 text-green-600',
      blue: 'bg-blue-100 text-blue-600',
      purple: 'bg-purple-100 text-purple-600',
      indigo: 'bg-indigo-100 text-indigo-600',
      orange: 'bg-orange-100 text-orange-600',
      pink: 'bg-pink-100 text-pink-600',
    };
    return iconColorMap[color] || 'bg-gray-100 text-gray-600';
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Buyzy?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've built our platform with features and services that make your shopping experience
            exceptional. Here's what sets us apart from the competition.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {whyChooseUs.map((feature) => {
            const IconComponent = feature.icon;
            const cardColorClasses = getColorClasses(feature.color);
            const iconColorClasses = getIconColorClasses(feature.color);

            return (
              <div
                key={feature.id}
                className={`group relative rounded-xl border-2 p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${cardColorClasses}`}
              >
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl ${iconColorClasses} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Learn More Link */}
                <div className="flex items-center text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors duration-200">
                  Learn more
                  <FiArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom Statistics */}
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Numbers That Speak for Themselves
            </h3>
            <p className="text-gray-600">
              Our commitment to excellence is reflected in our performance metrics
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">98.5%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">&lt; 24h</div>
              <div className="text-gray-600">Average Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
