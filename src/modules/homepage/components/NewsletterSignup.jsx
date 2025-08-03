import { useState } from 'react';
import { FiMail, FiCheck } from 'react-icons/fi';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gray-900 text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-500 rounded-full">
                <FiCheck className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">
              Thanks for subscribing!
            </h2>
            <p className="text-gray-300">
              You'll receive our latest deals and updates in your inbox.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Header */}
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-primary-600 rounded-full">
              <FiMail className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Stay in the Loop
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Subscribe to our newsletter and be the first to know about new products,
            exclusive deals, and special offers.
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !email}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>

          {/* Privacy Note */}
          <p className="text-sm text-gray-400 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-300">
            <div className="flex items-center">
              <FiCheck className="w-4 h-4 mr-2 text-green-400" />
              Exclusive Deals
            </div>
            <div className="flex items-center">
              <FiCheck className="w-4 h-4 mr-2 text-green-400" />
              New Product Alerts
            </div>
            <div className="flex items-center">
              <FiCheck className="w-4 h-4 mr-2 text-green-400" />
              No Spam
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
