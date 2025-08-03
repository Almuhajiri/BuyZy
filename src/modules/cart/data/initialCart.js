// Initial mock cart data for development and testing
export const initialCart = [
  {
    id: 1,
    sku: 'BT-HP-001',
    name: 'Wireless Bluetooth Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    price: 49.99,
    originalPrice: 79.99,
    quantity: 1,
    category: 'Electronics',
    brand: 'SoundMax',
    size: null,
    color: 'Black'
  },
  {
    id: 2,
    sku: 'SW-PH-002',
    name: 'Smartphone 128GB',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    price: 699.99,
    originalPrice: 799.99,
    quantity: 1,
    category: 'Electronics',
    brand: 'TechPro',
    size: null,
    color: 'Midnight Blue'
  },
  {
    id: 3,
    sku: 'RB-SH-003',
    name: 'Running Shoes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    price: 89.99,
    originalPrice: 120.00,
    quantity: 2,
    category: 'Fashion',
    brand: 'SportMax',
    size: 'US 10',
    color: 'Navy Blue'
  }
];

export default initialCart;
