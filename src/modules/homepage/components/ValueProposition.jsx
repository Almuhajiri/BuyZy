import { FiTruck, FiShield, FiHeadphones } from 'react-icons/fi';
import IconWithText from '../../../components/IconWithText';

const ValueProposition = () => {
  const features = [
    {
      icon: FiTruck,
      title: "Free Shipping",
      description: "Enjoy free shipping on all orders over $50. Fast and reliable delivery to your doorstep."
    },
    {
      icon: FiShield,
      title: "Secure Payments",
      description: "Your transactions are protected with bank-level security. Shop with complete confidence."
    },
    {
      icon: FiHeadphones,
      title: "24/7 Support",
      description: "Our customer service team is available around the clock to help with any questions."
    }
  ];

  return (
    <section className="py-16 bg-primary-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Buyzy?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing you with the best shopping experience possible
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <IconWithText
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">500K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">50K+</div>
              <div className="text-gray-600">Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
