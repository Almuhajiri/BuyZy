import { coreValues } from '../data/coreValues.js';

const CoreValues = () => {
  const getColorClasses = (color) => {
    const colorMap = {
      red: 'bg-red-100 text-red-600 border-red-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200',
      yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200',
    };
    return colorMap[color] || 'bg-gray-100 text-gray-600 border-gray-200';
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These principles guide everything we do and shape the culture we've built at Buyzy.
            They're not just words on a wall—they're the foundation of our daily decisions.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreValues.map((value, index) => {
            const IconComponent = value.icon;
            const colorClasses = getColorClasses(value.color);

            return (
              <div
                key={value.id}
                className="group bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-lg ${colorClasses} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-200">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>

                {/* Value Number */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <span className="text-sm font-medium text-gray-400">
                    Value #{String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Values in Action
            </h3>
            <p className="text-gray-600 mb-6">
              See how our core values translate into real benefits for our customers and partners.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                Customer Satisfaction: 98%
              </span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                On-time Delivery: 99.2%
              </span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                Carbon Neutral Shipping
              </span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                24/7 Support Response
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
