// Mock order data for testing and fallback
export const mockOrder = {
  orderId: 'ORD-2025-001-BZ',
  placedAt: '2025-08-02T14:36:00',
  estimatedDelivery: '2025-08-07',
  status: 'confirmed',
  customer: {
    name: 'Yunus Mu\'tashimbillah',
    email: 'yunus@example.com',
    phone: '+62 812 3456 7890'
  },
  shipping: {
    address: 'Jl. Merdeka No.10',
    city: 'Jakarta',
    state: 'DKI Jakarta',
    postalCode: '10110',
    country: 'Indonesia',
    method: 'Regular Delivery (JNE)',
    instructions: 'Please call before delivery'
  },
  payment: {
    method: 'Credit Card (Visa)',
    last4: '1234',
    status: 'Paid',
    transactionId: 'TXN-789456123'
  },
  items: [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      variant: 'Black',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      price: 49.99,
      quantity: 1,
      sku: 'BT-HP-001'
    },
    {
      id: 2,
      name: 'Smartphone 128GB',
      variant: 'Midnight Blue',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
      price: 699.99,
      quantity: 1,
      sku: 'SW-PH-002'
    },
    {
      id: 3,
      name: 'Running Shoes',
      variant: 'Navy Blue / US 10',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
      price: 89.99,
      quantity: 2,
      sku: 'RB-SH-003'
    }
  ],
  summary: {
    subtotal: 929.96,
    shippingFee: 9.99,
    tax: 75.20,
    discount: 0,
    total: 1015.15
  },
  tracking: {
    trackingNumber: 'JNE123456789',
    carrier: 'JNE Express',
    status: 'Processing',
    estimatedDays: 3
  }
};

// Order status configurations
export const orderStatuses = {
  pending: {
    label: 'Pending Payment',
    color: 'yellow',
    description: 'Waiting for payment confirmation'
  },
  confirmed: {
    label: 'Order Confirmed',
    color: 'blue',
    description: 'Payment received, preparing your order'
  },
  processing: {
    label: 'Processing',
    color: 'blue',
    description: 'Your order is being prepared'
  },
  shipped: {
    label: 'Shipped',
    color: 'green',
    description: 'Your order is on the way'
  },
  delivered: {
    label: 'Delivered',
    color: 'green',
    description: 'Order has been delivered'
  },
  cancelled: {
    label: 'Cancelled',
    color: 'red',
    description: 'Order has been cancelled'
  }
};

// Payment status configurations
export const paymentStatuses = {
  paid: {
    label: 'Paid',
    color: 'green',
    description: 'Payment successfully processed'
  },
  pending: {
    label: 'Pending',
    color: 'yellow',
    description: 'Waiting for payment confirmation'
  },
  failed: {
    label: 'Failed',
    color: 'red',
    description: 'Payment processing failed'
  },
  refunded: {
    label: 'Refunded',
    color: 'blue',
    description: 'Payment has been refunded'
  }
};

export default mockOrder;
