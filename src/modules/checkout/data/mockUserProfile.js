// Mock user profile data for prefilling checkout forms
export const mockUserProfile = {
  name: 'Yunus Mu\'tashimbillah',
  email: 'yunus@example.com',
  phone: '+62 812 3456 7890',
  address: {
    street: 'Jl. Merdeka No.10',
    city: 'Jakarta',
    state: 'DKI Jakarta',
    postalCode: '10110',
    country: 'Indonesia'
  },
  // Additional profile data
  dateOfBirth: '1990-01-15',
  preferences: {
    newsletter: true,
    smsUpdates: false,
    savePaymentInfo: true
  }
};

// Available countries for shipping
export const countries = [
  { code: 'ID', name: 'Indonesia' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'CA', name: 'Canada' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'SG', name: 'Singapore' },
  { code: 'MY', name: 'Malaysia' }
];

// Payment methods configuration
export const paymentMethods = [
  {
    id: 'credit_card',
    name: 'Credit/Debit Card',
    description: 'Pay securely with your credit or debit card',
    icon: 'card',
    supported: ['Visa', 'Mastercard', 'American Express'],
    processingTime: 'Instant'
  },
  {
    id: 'bank_transfer',
    name: 'Bank Transfer',
    description: 'Transfer directly from your bank account',
    icon: 'bank',
    processingTime: '1-3 business days'
  },
  {
    id: 'cash_on_delivery',
    name: 'Cash on Delivery',
    description: 'Pay when your order is delivered',
    icon: 'cash',
    processingTime: 'Pay on delivery',
    additionalFee: 5.00
  }
];

export default mockUserProfile;
