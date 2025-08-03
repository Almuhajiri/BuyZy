// Mock products for category pages
export const mockProducts = [
  // Electronics
  {
    id: 1,
    name: 'iPhone 15 Pro',
    price: 999,
    originalPrice: 1099,
    brand: 'Apple',
    category: 'electronics',
    subcategory: 'smartphones',
    rating: 4.8,
    availability: 'in-stock',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
    description: 'Latest iPhone with titanium design and advanced camera system',
    features: ['128GB Storage', 'A17 Pro Chip', 'Pro Camera System', '5G Ready']
  },
  {
    id: 2,
    name: 'MacBook Pro 14"',
    price: 1999,
    originalPrice: 2199,
    brand: 'Apple',
    category: 'electronics',
    subcategory: 'laptops',
    rating: 4.9,
    availability: 'in-stock',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    description: 'Powerful laptop for professionals with M3 chip',
    features: ['M3 Chip', '16GB RAM', '512GB SSD', 'Retina Display']
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5',
    price: 399,
    brand: 'Sony',
    category: 'electronics',
    subcategory: 'audio',
    rating: 4.7,
    availability: 'in-stock',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    description: 'Premium noise-canceling wireless headphones',
    features: ['Active Noise Cancellation', '30-hour Battery', 'Premium Sound']
  },
  {
    id: 4,
    name: 'Samsung Galaxy Watch 6',
    price: 329,
    originalPrice: 399,
    brand: 'Samsung',
    category: 'electronics',
    subcategory: 'wearables',
    rating: 4.6,
    availability: 'in-stock',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    description: 'Advanced fitness and health tracking smartwatch',
    features: ['Health Monitoring', 'GPS', 'Water Resistant', '40mm Display']
  },

  // Clothing
  {
    id: 5,
    name: 'Premium Cotton T-Shirt',
    price: 29,
    originalPrice: 39,
    brand: 'ComfortWear',
    category: 'clothing',
    subcategory: 'mens',
    rating: 4.4,
    availability: 'in-stock',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    description: 'Soft, breathable cotton t-shirt in multiple colors',
    features: ['100% Cotton', 'Pre-shrunk', 'Available in 8 colors']
  },
  {
    id: 6,
    name: 'Designer Jeans',
    price: 89,
    originalPrice: 120,
    brand: 'DenimCo',
    category: 'clothing',
    subcategory: 'mens',
    rating: 4.5,
    availability: 'in-stock',
    image: 'https://images.unsplash.com/photo-1542272454315-7ad9f8ad6e6d?w=400&h=300&fit=crop',
    description: 'Classic fit jeans with modern style',
    features: ['Stretch Denim', 'Classic Fit', 'Multiple Sizes']
  },
  {
    id: 7,
    name: 'Summer Dress',
    price: 65,
    brand: 'StyleCo',
    category: 'clothing',
    subcategory: 'womens',
    rating: 4.6,
    availability: 'in-stock',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop',
    description: 'Elegant summer dress perfect for any occasion',
    features: ['Lightweight Fabric', 'Machine Washable', 'Available in S-XL']
  },
  {
    id: 8,
    name: 'Kids Superhero T-Shirt',
    price: 19,
    originalPrice: 25,
    brand: 'KidsWear',
    category: 'clothing',
    subcategory: 'kids',
    rating: 4.7,
    availability: 'in-stock',
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad1d3?w=400&h=300&fit=crop',
    description: 'Fun superhero-themed t-shirt for kids',
    features: ['Soft Cotton', 'Fun Designs', 'Ages 4-12']
  },

  // Books
  {
    id: 9,
    name: 'The Art of Programming',
    price: 45,
    originalPrice: 55,
    brand: 'TechBooks',
    category: 'books',
    subcategory: 'educational',
    rating: 4.8,
    availability: 'in-stock',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',
    description: 'Comprehensive guide to modern programming techniques',
    features: ['500+ Pages', 'Code Examples', 'Expert Authors']
  },
  {
    id: 10,
    name: 'Mystery Novel: Dark Secrets',
    price: 15,
    brand: 'Mystery Press',
    category: 'books',
    subcategory: 'fiction',
    rating: 4.3,
    availability: 'in-stock',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    description: 'Thrilling mystery novel that keeps you guessing',
    features: ['Bestselling Author', '350 Pages', 'Award Winner']
  },
  {
    id: 11,
    name: 'Children\'s Adventure Book',
    price: 12,
    originalPrice: 16,
    brand: 'Kids Publishing',
    category: 'books',
    subcategory: 'childrens',
    rating: 4.9,
    availability: 'in-stock',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    description: 'Exciting adventure story for young readers',
    features: ['Ages 8-12', 'Illustrated', 'Educational']
  },

  // Accessories
  {
    id: 12,
    name: 'Leather Laptop Bag',
    price: 89,
    originalPrice: 120,
    brand: 'LeatherCraft',
    category: 'accessories',
    subcategory: 'bags',
    rating: 4.6,
    availability: 'in-stock',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    description: 'Premium leather laptop bag with multiple compartments',
    features: ['Genuine Leather', 'Fits 15" Laptop', 'Multiple Pockets']
  },
  {
    id: 13,
    name: 'Silver Chain Necklace',
    price: 65,
    brand: 'JewelryPlus',
    category: 'accessories',
    subcategory: 'jewelry',
    rating: 4.4,
    availability: 'in-stock',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
    description: 'Elegant sterling silver chain necklace',
    features: ['Sterling Silver', 'Adjustable Length', 'Gift Box Included']
  },
  {
    id: 14,
    name: 'Designer Sunglasses',
    price: 149,
    originalPrice: 199,
    brand: 'SunStyle',
    category: 'accessories',
    subcategory: 'sunglasses',
    rating: 4.5,
    availability: 'in-stock',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop',
    description: 'Stylish designer sunglasses with UV protection',
    features: ['UV Protection', 'Polarized Lenses', 'Designer Frame']
  },

  // Shoes
  {
    id: 15,
    name: 'Running Shoes Pro',
    price: 129,
    originalPrice: 160,
    brand: 'SportMax',
    category: 'shoes',
    subcategory: 'athletic',
    rating: 4.7,
    availability: 'in-stock',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    description: 'High-performance running shoes with advanced cushioning',
    features: ['Advanced Cushioning', 'Breathable Material', 'All Sizes']
  },
  {
    id: 16,
    name: 'Casual Sneakers',
    price: 79,
    brand: 'StreetStyle',
    category: 'shoes',
    subcategory: 'sneakers',
    rating: 4.3,
    availability: 'in-stock',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
    description: 'Comfortable casual sneakers for everyday wear',
    features: ['Comfortable Fit', 'Durable Sole', 'Multiple Colors']
  },
  {
    id: 17,
    name: 'Leather Boots',
    price: 189,
    originalPrice: 230,
    brand: 'BootCraft',
    category: 'shoes',
    subcategory: 'boots',
    rating: 4.8,
    availability: 'in-stock',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=300&fit=crop',
    description: 'Premium leather boots for style and durability',
    features: ['Genuine Leather', 'Weather Resistant', 'Classic Design']
  },

  // Watches
  {
    id: 18,
    name: 'Luxury Watch Gold',
    price: 899,
    originalPrice: 1200,
    brand: 'LuxTime',
    category: 'watches',
    subcategory: 'luxury',
    rating: 4.9,
    availability: 'in-stock',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop',
    description: 'Elegant luxury watch with gold finish',
    features: ['Swiss Movement', 'Gold Plated', 'Sapphire Crystal']
  },
  {
    id: 19,
    name: 'Sport Watch Digital',
    price: 79,
    brand: 'SportTime',
    category: 'watches',
    subcategory: 'sports',
    rating: 4.4,
    availability: 'in-stock',
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop',
    description: 'Digital sports watch with multiple functions',
    features: ['Water Resistant', 'Multiple Functions', 'Backlight']
  },

  // Cameras
  {
    id: 20,
    name: 'Professional DSLR Camera',
    price: 1299,
    originalPrice: 1499,
    brand: 'PhotoPro',
    category: 'cameras',
    subcategory: 'dslr',
    rating: 4.8,
    availability: 'in-stock',
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop',
    description: 'High-end DSLR camera for professional photography',
    features: ['24MP Sensor', '4K Video', 'Weather Sealed']
  },
  {
    id: 21,
    name: 'Mirrorless Camera Compact',
    price: 799,
    brand: 'PhotoTech',
    category: 'cameras',
    subcategory: 'mirrorless',
    rating: 4.6,
    availability: 'in-stock',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
    description: 'Compact mirrorless camera with excellent image quality',
    features: ['20MP Sensor', 'Compact Design', 'WiFi Enabled']
  },

  // Audio
  {
    id: 22,
    name: 'Bluetooth Speaker Portable',
    price: 99,
    originalPrice: 129,
    brand: 'SoundMax',
    category: 'audio',
    subcategory: 'speakers',
    rating: 4.5,
    availability: 'in-stock',
    image: 'https://images.unsplash.com/photo-1507947858025-d81246a2c2fb?w=400&h=300&fit=crop',
    description: 'Portable Bluetooth speaker with rich sound',
    features: ['Bluetooth 5.0', '12-hour Battery', 'Water Resistant']
  },
  {
    id: 23,
    name: 'Wireless Earbuds Pro',
    price: 179,
    originalPrice: 229,
    brand: 'AudioTech',
    category: 'audio',
    subcategory: 'earbuds',
    rating: 4.7,
    availability: 'in-stock',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop',
    description: 'Premium wireless earbuds with noise cancellation',
    features: ['Active Noise Cancellation', 'Quick Charge', 'Premium Sound']
  }
];

// Get products by category
export const getProductsByCategory = (categorySlug) => {
  return mockProducts.filter(product => product.category === categorySlug);
};

// Get products by subcategory
export const getProductsBySubcategory = (categorySlug, subcategorySlug) => {
  return mockProducts.filter(product =>
    product.category === categorySlug && product.subcategory === subcategorySlug
  );
};

// Get all brands for a category
export const getBrandsByCategory = (categorySlug) => {
  const products = getProductsByCategory(categorySlug);
  const brands = [...new Set(products.map(product => product.brand))];
  return brands.sort();
};

// Get price range for a category
export const getPriceRangeByCategory = (categorySlug) => {
  const products = getProductsByCategory(categorySlug);
  if (products.length === 0) return { min: 0, max: 0 };

  const prices = products.map(product => product.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
};
