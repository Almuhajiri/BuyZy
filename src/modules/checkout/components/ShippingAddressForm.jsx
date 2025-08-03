import { useState, useEffect } from 'react';
import { FiMapPin, FiCheck } from 'react-icons/fi';
import { countries } from '../data/mockUserProfile.js';

const ShippingAddressForm = ({
  formData,
  updateFormData,
  errors,
  disabled = false,
  prefillData = null
}) => {
  const [sameAsBilling, setSameAsBilling] = useState(false);

  // Prefill form when prefillData is provided
  useEffect(() => {
    if (prefillData && prefillData.address) {
      updateFormData('shipping', {
        street: prefillData.address.street || '',
        city: prefillData.address.city || '',
        state: prefillData.address.state || '',
        postalCode: prefillData.address.postalCode || '',
        country: prefillData.address.country || 'Indonesia'
      });
    }
  }, [prefillData, updateFormData]);

  const handleInputChange = (field, value) => {
    updateFormData('shipping', {
      ...formData.shipping,
      [field]: value
    });
  };

  const handleSameAsBilling = (checked) => {
    setSameAsBilling(checked);
    if (checked && formData.billing) {
      updateFormData('shipping', { ...formData.billing });
    }
  };

  const inputClasses = `w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
    }`;

  const errorClasses = (field) =>
    errors.shipping?.[field] ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
          <FiMapPin className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Shipping Address</h2>
          <p className="text-sm text-gray-600">Where should we deliver your order?</p>
        </div>
      </div>

      {/* Same as billing checkbox */}
      <div className="mb-6">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={sameAsBilling}
            onChange={(e) => handleSameAsBilling(e.target.checked)}
            disabled={disabled}
            className="sr-only"
          />
          <div className={`w-5 h-5 border-2 rounded-md flex items-center justify-center mr-3 transition-colors duration-200 ${sameAsBilling
              ? 'bg-primary-600 border-primary-600'
              : 'border-gray-300 hover:border-primary-400'
            }`}>
            {sameAsBilling && <FiCheck className="w-3 h-3 text-white" />}
          </div>
          <span className="text-sm text-gray-700">Same as billing address</span>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Street Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Street Address *
          </label>
          <input
            type="text"
            value={formData.shipping?.street || ''}
            onChange={(e) => handleInputChange('street', e.target.value)}
            placeholder="Enter your full address"
            disabled={disabled}
            className={`${inputClasses} ${errorClasses('street')}`}
          />
          {errors.shipping?.street && (
            <p className="mt-1 text-sm text-red-600">{errors.shipping.street}</p>
          )}
        </div>

        {/* City and State */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              value={formData.shipping?.city || ''}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="City"
              disabled={disabled}
              className={`${inputClasses} ${errorClasses('city')}`}
            />
            {errors.shipping?.city && (
              <p className="mt-1 text-sm text-red-600">{errors.shipping.city}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State/Province *
            </label>
            <input
              type="text"
              value={formData.shipping?.state || ''}
              onChange={(e) => handleInputChange('state', e.target.value)}
              placeholder="State or Province"
              disabled={disabled}
              className={`${inputClasses} ${errorClasses('state')}`}
            />
            {errors.shipping?.state && (
              <p className="mt-1 text-sm text-red-600">{errors.shipping.state}</p>
            )}
          </div>
        </div>

        {/* Postal Code and Country */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Postal Code *
            </label>
            <input
              type="text"
              value={formData.shipping?.postalCode || ''}
              onChange={(e) => handleInputChange('postalCode', e.target.value)}
              placeholder="Postal/ZIP Code"
              disabled={disabled}
              className={`${inputClasses} ${errorClasses('postalCode')}`}
            />
            {errors.shipping?.postalCode && (
              <p className="mt-1 text-sm text-red-600">{errors.shipping.postalCode}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country *
            </label>
            <select
              value={formData.shipping?.country || ''}
              onChange={(e) => handleInputChange('country', e.target.value)}
              disabled={disabled}
              className={`${inputClasses} ${errorClasses('country')}`}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.shipping?.country && (
              <p className="mt-1 text-sm text-red-600">{errors.shipping.country}</p>
            )}
          </div>
        </div>

        {/* Special Instructions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Delivery Instructions (Optional)
          </label>
          <textarea
            value={formData.shipping?.instructions || ''}
            onChange={(e) => handleInputChange('instructions', e.target.value)}
            placeholder="Any special delivery instructions..."
            rows={3}
            disabled={disabled}
            className={`${inputClasses} resize-none`}
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressForm;
