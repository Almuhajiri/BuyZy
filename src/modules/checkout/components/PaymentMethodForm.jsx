import { useState } from 'react';
import { FiCreditCard, FiDollarSign, FiTruck, FiShield, FiInfo } from 'react-icons/fi';
import { paymentMethods } from '../data/mockUserProfile.js';

const PaymentMethodForm = ({
  formData,
  updateFormData,
  errors,
  disabled = false
}) => {
  const [selectedMethod, setSelectedMethod] = useState(formData.payment?.method || '');

  const handleMethodChange = (methodId) => {
    setSelectedMethod(methodId);
    updateFormData('payment', {
      ...formData.payment,
      method: methodId
    });
  };

  const handleCardChange = (field, value) => {
    updateFormData('payment', {
      ...formData.payment,
      card: {
        ...formData.payment?.card,
        [field]: value
      }
    });
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const getPaymentIcon = (iconType) => {
    switch (iconType) {
      case 'card':
        return <FiCreditCard className="w-5 h-5" />;
      case 'bank':
        return <FiDollarSign className="w-5 h-5" />;
      case 'cash':
        return <FiTruck className="w-5 h-5" />;
      default:
        return <FiCreditCard className="w-5 h-5" />;
    }
  };

  const inputClasses = `w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
    }`;

  const errorClasses = (field) =>
    errors.payment?.[field] ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
          <FiShield className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
          <p className="text-sm text-gray-600">Choose how you'd like to pay</p>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-4 mb-6">
        {paymentMethods.map((method) => (
          <div key={method.id} className="relative">
            <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors duration-200 ${selectedMethod === method.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}>
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={(e) => handleMethodChange(e.target.value)}
                disabled={disabled}
                className="sr-only"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedMethod === method.id ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                    {getPaymentIcon(method.icon)}
                  </div>

                  <div>
                    <div className="font-medium text-gray-900">{method.name}</div>
                    <div className="text-sm text-gray-600">{method.description}</div>
                    {method.supported && (
                      <div className="text-xs text-gray-500 mt-1">
                        Supports: {method.supported.join(', ')}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-600">{method.processingTime}</div>
                  {method.additionalFee && (
                    <div className="text-sm text-orange-600">
                      +${method.additionalFee.toFixed(2)} fee
                    </div>
                  )}
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>

      {/* Credit Card Details */}
      {selectedMethod === 'credit_card' && (
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <FiCreditCard className="w-4 h-4 text-gray-600" />
            <h3 className="font-medium text-gray-900">Card Details</h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number *
              </label>
              <input
                type="text"
                value={formData.payment?.card?.number || ''}
                onChange={(e) => handleCardChange('number', formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                disabled={disabled}
                className={`${inputClasses} ${errorClasses('cardNumber')}`}
              />
              {errors.payment?.cardNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.payment.cardNumber}</p>
              )}
            </div>

            {/* Card Holder Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name *
              </label>
              <input
                type="text"
                value={formData.payment?.card?.name || ''}
                onChange={(e) => handleCardChange('name', e.target.value)}
                placeholder="John Doe"
                disabled={disabled}
                className={`${inputClasses} ${errorClasses('cardName')}`}
              />
              {errors.payment?.cardName && (
                <p className="mt-1 text-sm text-red-600">{errors.payment.cardName}</p>
              )}
            </div>

            {/* Expiry and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date *
                </label>
                <input
                  type="text"
                  value={formData.payment?.card?.expiry || ''}
                  onChange={(e) => handleCardChange('expiry', formatExpiryDate(e.target.value))}
                  placeholder="MM/YY"
                  maxLength={5}
                  disabled={disabled}
                  className={`${inputClasses} ${errorClasses('cardExpiry')}`}
                />
                {errors.payment?.cardExpiry && (
                  <p className="mt-1 text-sm text-red-600">{errors.payment.cardExpiry}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV *
                </label>
                <input
                  type="text"
                  value={formData.payment?.card?.cvv || ''}
                  onChange={(e) => handleCardChange('cvv', e.target.value.replace(/\D/g, ''))}
                  placeholder="123"
                  maxLength={4}
                  disabled={disabled}
                  className={`${inputClasses} ${errorClasses('cardCvv')}`}
                />
                {errors.payment?.cardCvv && (
                  <p className="mt-1 text-sm text-red-600">{errors.payment.cardCvv}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bank Transfer Instructions */}
      {selectedMethod === 'bank_transfer' && (
        <div className="border-t border-gray-200 pt-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FiInfo className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Bank Transfer Instructions</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>• You will receive bank details after placing your order</p>
                  <p>• Transfer the exact amount within 24 hours</p>
                  <p>• Include your order number in the transfer description</p>
                  <p>• Processing time: 1-3 business days after payment confirmation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cash on Delivery Info */}
      {selectedMethod === 'cash_on_delivery' && (
        <div className="border-t border-gray-200 pt-6">
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FiTruck className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-orange-900 mb-2">Cash on Delivery</h4>
                <div className="text-sm text-orange-800 space-y-1">
                  <p>• Pay when your order is delivered to your doorstep</p>
                  <p>• Additional $5.00 handling fee applies</p>
                  <p>• Have exact change ready for faster service</p>
                  <p>• Available for orders under $500</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FiShield className="w-4 h-4" />
          <span>Your payment information is encrypted and secure</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodForm;
