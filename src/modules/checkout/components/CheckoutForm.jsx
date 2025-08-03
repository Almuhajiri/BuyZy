import { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiCheck } from 'react-icons/fi';

const CheckoutForm = ({
  formData,
  updateFormData,
  errors,
  disabled = false,
  prefillData = null
}) => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  // Prefill form when prefillData is provided
  useEffect(() => {
    if (prefillData) {
      updateFormData('personal', {
        name: prefillData.name || '',
        email: prefillData.email || '',
        phone: prefillData.phone || ''
      });
      setNewsletter(prefillData.preferences?.newsletter || false);
    }
  }, [prefillData, updateFormData]);

  const handleInputChange = (field, value) => {
    updateFormData('personal', {
      ...formData.personal,
      [field]: value
    });
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const cleaned = value.replace(/\D/g, '');

    // Format as +XX XXX XXX XXXX (international format)
    if (cleaned.length >= 10) {
      const match = cleaned.match(/^(\d{1,3})(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
      }
    }

    return value;
  };

  const inputClasses = `w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
    }`;

  const errorClasses = (field) =>
    errors.personal?.[field] ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
          <FiUser className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
          <p className="text-sm text-gray-600">We'll use this to contact you about your order</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.personal?.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              disabled={disabled}
              className={`${inputClasses} pl-11 ${errorClasses('name')}`}
            />
          </div>
          {errors.personal?.name && (
            <p className="mt-1 text-sm text-red-600">{errors.personal.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={formData.personal?.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email address"
              disabled={disabled}
              className={`${inputClasses} pl-11 ${errorClasses('email')}`}
            />
          </div>
          {errors.personal?.email && (
            <p className="mt-1 text-sm text-red-600">{errors.personal.email}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            We'll send order confirmation and updates to this email
          </p>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              value={formData.personal?.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+62 812 3456 7890"
              disabled={disabled}
              className={`${inputClasses} pl-11 ${errorClasses('phone')}`}
            />
          </div>
          {errors.personal?.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.personal.phone}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            For delivery updates and customer service
          </p>
        </div>

        {/* Preferences */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900">Preferences</h3>

          {/* Newsletter Subscription */}
          <div>
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                disabled={disabled}
                className="sr-only"
              />
              <div className={`w-5 h-5 border-2 rounded-md flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 transition-colors duration-200 ${newsletter
                  ? 'bg-primary-600 border-primary-600'
                  : 'border-gray-300 hover:border-primary-400'
                }`}>
                {newsletter && <FiCheck className="w-3 h-3 text-white" />}
              </div>
              <div>
                <span className="text-sm text-gray-700">
                  Subscribe to our newsletter for deals and updates
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  Get exclusive offers, new product announcements, and shopping tips
                </p>
              </div>
            </label>
          </div>

          {/* Terms and Conditions */}
          <div>
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                disabled={disabled}
                className="sr-only"
              />
              <div className={`w-5 h-5 border-2 rounded-md flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 transition-colors duration-200 ${acceptTerms
                  ? 'bg-primary-600 border-primary-600'
                  : 'border-gray-300 hover:border-primary-400'
                }`}>
                {acceptTerms && <FiCheck className="w-3 h-3 text-white" />}
              </div>
              <div>
                <span className="text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="/terms" className="text-primary-600 hover:text-primary-700 underline">
                    Terms of Service
                  </a>
                  {' '}and{' '}
                  <a href="/privacy" className="text-primary-600 hover:text-primary-700 underline">
                    Privacy Policy
                  </a>
                  {' '}*
                </span>
              </div>
            </label>
            {errors.terms && (
              <p className="mt-1 text-sm text-red-600">{errors.terms}</p>
            )}
          </div>
        </div>
      </div>

      {/* Update form data with preferences */}
      {useEffect(() => {
        updateFormData('preferences', {
          newsletter,
          acceptTerms
        });
      }, [newsletter, acceptTerms, updateFormData])}
    </div>
  );
};

export default CheckoutForm;
