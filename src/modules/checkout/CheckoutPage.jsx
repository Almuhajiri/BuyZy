import { useState, useReducer, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiLock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useCartContext } from '../../contexts/CartContext';

// Components
import CheckoutForm from './components/CheckoutForm.jsx';
import ShippingAddressForm from './components/ShippingAddressForm.jsx';
import PaymentMethodForm from './components/PaymentMethodForm.jsx';
import OrderSummary from './components/OrderSummary.jsx';

// Data
import { mockUserProfile } from './data/mockUserProfile.js';

// Form reducer for managing complex form state
const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_SECTION':
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          ...action.data
        }
      };
    case 'RESET_FORM':
      return action.initialState;
    default:
      return state;
  }
};

const initialFormState = {
  personal: {
    name: '',
    email: '',
    phone: ''
  },
  shipping: {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    instructions: ''
  },
  payment: {
    method: '',
    card: {
      number: '',
      name: '',
      expiry: '',
      cvv: ''
    }
  },
  preferences: {
    newsletter: false,
    acceptTerms: false
  }
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    clearCart,
    totalItems,
    subtotal,
    tax,
    total,
    isEmpty
  } = useCartContext();

  const [formData, dispatch] = useReducer(formReducer, initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useMockData, setUseMockData] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (isEmpty) {
      navigate('/cart');
    }
  }, [isEmpty, navigate]);

  // Calculate shipping cost (free shipping over $100)
  const shippingCost = subtotal >= 100 ? 0 : 9.99;
  const cashOnDeliveryFee = formData.payment?.method === 'cash_on_delivery' ? 5.00 : 0;
  const finalTotal = total + shippingCost + cashOnDeliveryFee;

  const updateFormData = (section, data) => {
    dispatch({ type: 'UPDATE_SECTION', section, data });
    // Clear errors for the updated section
    if (errors[section]) {
      setErrors(prev => ({
        ...prev,
        [section]: {}
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Personal information validation
    if (!formData.personal.name?.trim()) {
      newErrors.personal = { ...newErrors.personal, name: 'Full name is required' };
    }

    if (!formData.personal.email?.trim()) {
      newErrors.personal = { ...newErrors.personal, email: 'Email is required' };
    } else if (!/\S+@\S+\.\S+/.test(formData.personal.email)) {
      newErrors.personal = { ...newErrors.personal, email: 'Please enter a valid email' };
    }

    if (!formData.personal.phone?.trim()) {
      newErrors.personal = { ...newErrors.personal, phone: 'Phone number is required' };
    }

    // Shipping address validation
    if (!formData.shipping.street?.trim()) {
      newErrors.shipping = { ...newErrors.shipping, street: 'Street address is required' };
    }

    if (!formData.shipping.city?.trim()) {
      newErrors.shipping = { ...newErrors.shipping, city: 'City is required' };
    }

    if (!formData.shipping.state?.trim()) {
      newErrors.shipping = { ...newErrors.shipping, state: 'State/Province is required' };
    }

    if (!formData.shipping.postalCode?.trim()) {
      newErrors.shipping = { ...newErrors.shipping, postalCode: 'Postal code is required' };
    }

    if (!formData.shipping.country?.trim()) {
      newErrors.shipping = { ...newErrors.shipping, country: 'Country is required' };
    }

    // Payment method validation
    if (!formData.payment.method) {
      newErrors.payment = { ...newErrors.payment, method: 'Please select a payment method' };
    }

    // Credit card validation
    if (formData.payment.method === 'credit_card') {
      if (!formData.payment.card?.number?.trim()) {
        newErrors.payment = { ...newErrors.payment, cardNumber: 'Card number is required' };
      }

      if (!formData.payment.card?.name?.trim()) {
        newErrors.payment = { ...newErrors.payment, cardName: 'Cardholder name is required' };
      }

      if (!formData.payment.card?.expiry?.trim()) {
        newErrors.payment = { ...newErrors.payment, cardExpiry: 'Expiry date is required' };
      }

      if (!formData.payment.card?.cvv?.trim()) {
        newErrors.payment = { ...newErrors.payment, cardCvv: 'CVV is required' };
      }
    }

    // Terms acceptance validation
    if (!formData.preferences.acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const errorSection = document.querySelector('.border-red-500');
      if (errorSection) {
        errorSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate order number
      const orderNumber = `BZ${Date.now()}`;

      // In a real app, this would send data to your backend
      console.log('Order submitted:', {
        orderNumber,
        formData,
        cart,
        totals: {
          subtotal,
          tax,
          shipping: shippingCost,
          total: finalTotal
        }
      });

      // Clear cart after successful order
      clearCart();

      // Create complete order object for confirmation page
      const orderData = {
        orderId: orderNumber,
        placedAt: new Date().toISOString(),
        status: 'confirmed',
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        customer: {
          id: `CUST_${Date.now()}`,
          firstName: formData.shipping.firstName || formData.billing.firstName,
          lastName: formData.shipping.lastName || formData.billing.lastName,
          email: formData.billing.email,
          phone: formData.billing.phone
        },
        shipping: {
          address: {
            street: formData.shipping.address,
            city: formData.shipping.city,
            state: formData.shipping.state,
            zipCode: formData.shipping.zipCode,
            country: formData.shipping.country || 'United States'
          },
          method: formData.shipping.method || 'Standard Shipping',
          cost: shippingCost,
          instructions: formData.shipping.instructions || null
        },
        payment: {
          method: formData.payment.method,
          status: 'completed',
          cardNumber: formData.payment.cardNumber,
          transactionId: `TXN_${Date.now()}`,
          processingFee: 0
        },
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity,
          image: item.image,
          size: item.size,
          color: item.color,
          sku: item.sku || `SKU_${item.id}`,
          rating: item.rating
        })),
        summary: {
          subtotal,
          shipping: shippingCost,
          tax,
          discount: 0,
          total: finalTotal
        },
        tracking: {
          carrier: 'FedEx',
          trackingNumber: null,
          status: 'Processing',
          estimatedDays: 7,
          lastUpdate: new Date().toISOString()
        }
      };

      // Show success message and redirect
      alert(`Order placed successfully! Order number: ${orderNumber}`);
      navigate('/order-confirmation', {
        state: { order: orderData }
      });

    } catch (error) {
      console.error('Order submission failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUseMockData = () => {
    setUseMockData(!useMockData);
    if (!useMockData) {
      // Prefill with mock data
      dispatch({
        type: 'UPDATE_SECTION', section: 'personal', data: {
          name: mockUserProfile.name,
          email: mockUserProfile.email,
          phone: mockUserProfile.phone
        }
      });
      dispatch({ type: 'UPDATE_SECTION', section: 'shipping', data: mockUserProfile.address });
    } else {
      // Clear form
      dispatch({ type: 'RESET_FORM', initialState: initialFormState });
    }
  };

  if (isEmpty) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-primary-600 transition-colors duration-200">
            Home
          </Link>
          <span>/</span>
          <Link to="/cart" className="hover:text-primary-600 transition-colors duration-200">
            Cart
          </Link>
          <span>/</span>
          <span className="text-gray-900">Checkout</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-600 mt-1">
              Complete your order for {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleUseMockData}
              className="px-4 py-2 text-sm text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors duration-200"
            >
              {useMockData ? 'Clear' : 'Use Sample Data'}
            </button>

            <Link
              to="/cart"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to Cart
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <CheckoutForm
                formData={formData}
                updateFormData={updateFormData}
                errors={errors}
                disabled={isSubmitting}
                prefillData={useMockData ? mockUserProfile : null}
              />

              {/* Shipping Address */}
              <ShippingAddressForm
                formData={formData}
                updateFormData={updateFormData}
                errors={errors}
                disabled={isSubmitting}
                prefillData={useMockData ? mockUserProfile : null}
              />

              {/* Payment Method */}
              <PaymentMethodForm
                formData={formData}
                updateFormData={updateFormData}
                errors={errors}
                disabled={isSubmitting}
              />
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                cart={cart}
                totalItems={totalItems}
                subtotal={subtotal}
                tax={tax}
                total={total}
                shippingCost={shippingCost}
                paymentMethod={formData.payment?.method}
                isSticky={true}
              />

              {/* Place Order Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg font-medium text-white transition-all duration-200 flex items-center justify-center gap-3 ${isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700 hover:shadow-lg'
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Order...
                    </>
                  ) : (
                    <>
                      <FiLock className="w-5 h-5" />
                      Place Order • ${finalTotal.toFixed(2)}
                    </>
                  )}
                </button>

                <div className="mt-4 text-center text-xs text-gray-500">
                  <p>
                    By placing this order, you agree to our{' '}
                    <Link to="/terms" className="text-primary-600 hover:underline">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-primary-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Security Notice */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
            <FiCheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-800">
              Your order is protected by SSL encryption and our secure payment processing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
