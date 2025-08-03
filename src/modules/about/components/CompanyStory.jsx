import { FiTarget, FiEye } from 'react-icons/fi';

const CompanyStory = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Story Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              Our Story
            </h2>

            <div className="prose prose-lg text-gray-600 space-y-6">
              <p className="text-lg leading-relaxed">
                Buyzy was born from a simple observation: online shopping should be delightful, not frustrating.
                Founded in 2020 by a team of passionate technologists and retail experts, we set out to create
                an e-commerce platform that truly puts customers first.
              </p>

              <p className="text-lg leading-relaxed">
                What started as a small marketplace has grown into a thriving community of over 50,000 satisfied
                customers and hundreds of trusted vendors. We've built our platform on the foundation of trust,
                innovation, and exceptional customer service, ensuring that every interaction with Buyzy is
                seamless, secure, and satisfying.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {/* Mission */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary-100 rounded-lg mr-4">
                    <FiTarget className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-gray-600">
                  To make online shopping accessible, enjoyable, and trustworthy for everyone,
                  while supporting local businesses and sustainable practices.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-green-100 rounded-lg mr-4">
                    <FiEye className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-gray-600">
                  To become the world's most trusted and customer-centric marketplace,
                  setting new standards for e-commerce excellence and community impact.
                </p>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Buyzy team collaboration"
                className="rounded-lg shadow-lg w-full"
              />

              {/* Overlay Stats */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary-600">2020</div>
                      <div className="text-sm text-gray-600">Founded</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary-600">50K+</div>
                      <div className="text-sm text-gray-600">Customers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary-600">500+</div>
                      <div className="text-sm text-gray-600">Partners</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-yellow-100 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory;
