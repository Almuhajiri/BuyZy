// Mock data for user orders and profile
export const mockUser = {
  id: 'USER_2025_001',
  firstName: 'Yunus',
  lastName: "Mu'tashimbillah",
  email: 'yunus@buyzy.com',
  phone: '+62 812 3456 7890',
  memberSince: '2024-03-15T00:00:00Z',
  avatar: null,
  preferences: {
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    orderUpdates: true
  },
  stats: {
    totalOrders: 12,
    totalSpent: 2847.50,
    averageOrderValue: 237.29,
    loyaltyPoints: 284
  }
};

export const mockAddresses = [
  {
    id: 'ADDR_001',
    type: 'home',
    label: 'Home',
    firstName: 'Yunus',
    lastName: "Mu'tashimbillah",
    street: '123 Jl. Sudirman',
    city: 'Jakarta',
    state: 'DKI Jakarta',
    zipCode: '12190',
    country: 'Indonesia',
    phone: '+62 812 3456 7890',
    isDefault: true,
    createdAt: '2024-03-15T10:00:00Z'
  },
  {
    id: 'ADDR_002',
    type: 'work',
    label: 'Office',
    firstName: 'Yunus',
    lastName: "Mu'tashimbillah",
    street: '456 Jl. Thamrin Tower',
    city: 'Jakarta',
    state: 'DKI Jakarta',
    zipCode: '10230',
    country: 'Indonesia',
    phone: '+62 812 3456 7890',
    isDefault: false,
    createdAt: '2024-04-10T09:30:00Z'
  }
];

export const mockOrders = [
  {
    id: 'ORD-2025-001-BZ',
    orderNumber: 'ORD-2025-001-BZ',
    placedAt: '2025-08-01T14:30:00Z',
    status: 'delivered',
    total: 389.97,
    itemCount: 3,
    deliveredAt: '2025-08-03T16:45:00Z',
    items: [
      {
        id: 'ITEM_001',
        name: 'Wireless Bluetooth Headphones',
        description: 'Premium noise-canceling headphones with 30-hour battery',
        price: 129.99,
        quantity: 1,
        total: 129.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
        size: null,
        color: 'Black',
        sku: 'AUDIO-WBH-001'
      },
      {
        id: 'ITEM_002',
        name: 'Smartphone Case Premium',
        description: 'Durable protection with wireless charging support',
        price: 29.99,
        quantity: 2,
        total: 59.98,
        image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=300&h=300&fit=crop',
        size: null,
        color: 'Clear',
        sku: 'ACC-SPC-002'
      },
      {
        id: 'ITEM_003',
        name: 'USB-C Fast Charger',
        description: '65W fast charging with multiple ports',
        price: 49.99,
        quantity: 4,
        total: 199.96,
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop',
        size: null,
        color: 'White',
        sku: 'ACC-UFC-003'
      }
    ],
    summary: {
      subtotal: 389.93,
      shipping: 0,
      tax: 0.04,
      discount: 0,
      total: 389.97
    },
    shipping: {
      address: mockAddresses[0],
      method: 'Standard Shipping',
      cost: 0,
      estimatedDays: 3
    },
    payment: {
      method: 'Credit Card',
      cardNumber: '****-****-****-1234',
      status: 'completed'
    },
    tracking: {
      carrier: 'JNE Express',
      trackingNumber: 'JNE123456789',
      status: 'delivered',
      estimatedDelivery: '2025-08-03T23:59:59Z',
      deliveredAt: '2025-08-03T16:45:00Z'
    }
  },
  {
    id: 'ORD-2025-002-BZ',
    orderNumber: 'ORD-2025-002-BZ',
    placedAt: '2025-07-28T09:15:00Z',
    status: 'shipped',
    total: 156.48,
    itemCount: 2,
    deliveredAt: null,
    items: [
      {
        id: 'ITEM_004',
        name: 'Ergonomic Office Chair',
        description: 'Comfortable mesh back chair with lumbar support',
        price: 149.99,
        quantity: 1,
        total: 149.99,
        image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300&h=300&fit=crop',
        size: null,
        color: 'Black',
        sku: 'FURN-EOC-004'
      }
    ],
    summary: {
      subtotal: 149.99,
      shipping: 4.99,
      tax: 1.50,
      discount: 0,
      total: 156.48
    },
    shipping: {
      address: mockAddresses[1],
      method: 'Express Shipping',
      cost: 4.99,
      estimatedDays: 2
    },
    payment: {
      method: 'PayPal',
      cardNumber: null,
      status: 'completed'
    },
    tracking: {
      carrier: 'FedEx',
      trackingNumber: 'FDX987654321',
      status: 'in_transit',
      estimatedDelivery: '2025-08-04T23:59:59Z',
      deliveredAt: null
    }
  },
  {
    id: 'ORD-2025-003-BZ',
    orderNumber: 'ORD-2025-003-BZ',
    placedAt: '2025-07-20T16:45:00Z',
    status: 'processing',
    total: 89.97,
    itemCount: 3,
    deliveredAt: null,
    items: [
      {
        id: 'ITEM_005',
        name: 'Cotton T-Shirt Pack',
        description: 'Comfortable cotton t-shirts in various colors',
        price: 19.99,
        quantity: 3,
        total: 59.97,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
        size: 'L',
        color: 'Mixed',
        sku: 'CLOTH-CTP-005'
      },
      {
        id: 'ITEM_006',
        name: 'Sports Water Bottle',
        description: 'BPA-free stainless steel water bottle',
        price: 24.99,
        quantity: 1,
        total: 24.99,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop',
        size: '750ml',
        color: 'Blue',
        sku: 'SPORT-SWB-006'
      }
    ],
    summary: {
      subtotal: 84.96,
      shipping: 4.99,
      tax: 0.02,
      discount: 0,
      total: 89.97
    },
    shipping: {
      address: mockAddresses[0],
      method: 'Standard Shipping',
      cost: 4.99,
      estimatedDays: 5
    },
    payment: {
      method: 'Credit Card',
      cardNumber: '****-****-****-5678',
      status: 'completed'
    },
    tracking: {
      carrier: 'Indonesia Post',
      trackingNumber: null,
      status: 'processing',
      estimatedDelivery: '2025-08-05T23:59:59Z',
      deliveredAt: null
    }
  },
  {
    id: 'ORD-2025-004-BZ',
    orderNumber: 'ORD-2025-004-BZ',
    placedAt: '2025-07-15T11:20:00Z',
    status: 'cancelled',
    total: 299.99,
    itemCount: 1,
    deliveredAt: null,
    items: [
      {
        id: 'ITEM_007',
        name: 'Gaming Mechanical Keyboard',
        description: 'RGB backlit mechanical keyboard with blue switches',
        price: 299.99,
        quantity: 1,
        total: 299.99,
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop',
        size: null,
        color: 'Black',
        sku: 'GAMING-GMK-007'
      }
    ],
    summary: {
      subtotal: 299.99,
      shipping: 0,
      tax: 0,
      discount: 0,
      total: 299.99
    },
    shipping: {
      address: mockAddresses[0],
      method: 'Free Shipping',
      cost: 0,
      estimatedDays: 7
    },
    payment: {
      method: 'Credit Card',
      cardNumber: '****-****-****-1234',
      status: 'refunded'
    },
    tracking: {
      carrier: null,
      trackingNumber: null,
      status: 'cancelled',
      estimatedDelivery: null,
      deliveredAt: null
    }
  }
];

// Order status configurations
export const orderStatuses = {
  processing: {
    label: 'Processing',
    color: 'yellow',
    description: 'Your order is being prepared'
  },
  confirmed: {
    label: 'Confirmed',
    color: 'blue',
    description: 'Order confirmed and ready for shipment'
  },
  shipped: {
    label: 'Shipped',
    color: 'indigo',
    description: 'Your order is on its way'
  },
  in_transit: {
    label: 'In Transit',
    color: 'purple',
    description: 'Package is being delivered'
  },
  delivered: {
    label: 'Delivered',
    color: 'green',
    description: 'Order successfully delivered'
  },
  cancelled: {
    label: 'Cancelled',
    color: 'red',
    description: 'Order has been cancelled'
  },
  refunded: {
    label: 'Refunded',
    color: 'gray',
    description: 'Payment has been refunded'
  }
};

// Payment status configurations
export const paymentStatuses = {
  pending: {
    label: 'Pending',
    color: 'yellow',
    description: 'Payment is being processed'
  },
  completed: {
    label: 'Completed',
    color: 'green',
    description: 'Payment successful'
  },
  failed: {
    label: 'Failed',
    color: 'red',
    description: 'Payment failed'
  },
  refunded: {
    label: 'Refunded',
    color: 'gray',
    description: 'Payment refunded'
  }
};
