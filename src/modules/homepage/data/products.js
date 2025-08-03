export const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: "$49.99",
    originalPrice: "$79.99",
    discount: 38,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    rating: 4.5,
    category: "electronics",
    description: "Premium wireless headphones with noise cancellation and 30-hour battery life."
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: "$129.99",
    originalPrice: "$199.99",
    discount: 35,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    rating: 4.7,
    category: "electronics",
    description: "Advanced fitness tracking with heart rate monitor and GPS."
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    price: "$24.99",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
    rating: 4.3,
    category: "clothing",
    description: "Comfortable and sustainable organic cotton t-shirt in multiple colors."
  },
  {
    id: 4,
    name: "Professional Camera Lens",
    price: "$299.99",
    originalPrice: "$399.99",
    discount: 25,
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
    rating: 4.8,
    category: "electronics",
    description: "High-quality 50mm prime lens for professional photography."
  },
  {
    id: 5,
    name: "Leather Laptop Bag",
    price: "$89.99",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.4,
    category: "accessories",
    description: "Handcrafted leather laptop bag with multiple compartments."
  },
  {
    id: 6,
    name: "Smart Home Speaker",
    price: "$79.99",
    originalPrice: "$99.99",
    discount: 20,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    rating: 4.6,
    category: "electronics",
    description: "Voice-controlled smart speaker with premium sound quality."
  },
  {
    id: 7,
    name: "Running Shoes",
    price: "$119.99",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
    rating: 4.5,
    category: "shoes",
    description: "Lightweight running shoes with superior cushioning and support."
  },
  {
    id: 8,
    name: "Bestselling Novel",
    price: "$14.99",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
    rating: 4.2,
    category: "books",
    description: "Award-winning fiction novel that's taking the world by storm."
  },
  {
    id: 9,
    name: "Stainless Steel Water Bottle",
    price: "$29.99",
    originalPrice: "$39.99",
    discount: 25,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop",
    rating: 4.7,
    category: "accessories",
    description: "Insulated water bottle that keeps drinks cold for 24 hours."
  },
  {
    id: 10,
    name: "Wireless Charging Pad",
    price: "$34.99",
    image: "https://images.unsplash.com/photo-1609592806763-b0e17fe41b2a?w=400&h=300&fit=crop",
    rating: 4.3,
    category: "electronics",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices."
  },
  {
    id: 11,
    name: "Cozy Knit Sweater",
    price: "$59.99",
    originalPrice: "$89.99",
    discount: 33,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=300&fit=crop",
    rating: 4.6,
    category: "clothing",
    description: "Soft and warm knit sweater perfect for cold weather."
  },
  {
    id: 12,
    name: "Coffee Table Book",
    price: "$39.99",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    rating: 4.4,
    category: "books",
    description: "Beautiful photography book featuring stunning landscapes."
  }
];

// Featured products (subset of main products)
export const featuredProducts = products.slice(0, 8);

// Best sellers (products with high ratings)
export const bestSellers = products.filter(product => product.rating >= 4.5);

// On sale products (products with discounts)
export const saleProducts = products.filter(product => product.discount);

// Get products by category
export const getProductsByCategory = (categoryId) => {
  return products.filter(product => product.category === categoryId);
};

// Get product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

// Search products
export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};
