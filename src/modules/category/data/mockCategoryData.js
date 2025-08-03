// Mock data for category pages
import { categories } from '../../homepage/data/categories.js';
import { products } from '../../homepage/data/products.js';

// Helper function to generate subcategories for a category
const generateSubcategories = (categorySlug) => {
  const subcategoriesMap = {
    electronics: [
      {
        id: 'smartphones',
        name: 'Smartphones',
        slug: 'smartphones',
        productCount: 45,
        description: 'Latest smartphones with cutting-edge technology and innovative features',
        bannerImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        id: 'laptops',
        name: 'Laptops',
        slug: 'laptops',
        productCount: 32,
        description: 'High-performance laptops for work, gaming, and creative professionals',
        bannerImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      {
        id: 'tablets',
        name: 'Tablets',
        slug: 'tablets',
        productCount: 28,
        description: 'Versatile tablets perfect for entertainment, productivity, and creativity',
        bannerImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      {
        id: 'headphones',
        name: 'Headphones',
        slug: 'headphones',
        productCount: 51,
        description: 'Premium audio experiences with noise-cancelling and wireless technology',
        bannerImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      }
    ],
    clothing: [
      {
        id: 'mens',
        name: "Men's Clothing",
        slug: 'mens',
        productCount: 89,
        description: 'Stylish and comfortable clothing for the modern man',
        bannerImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      {
        id: 'womens',
        name: "Women's Clothing",
        slug: 'womens',
        productCount: 124,
        description: 'Fashion-forward designs and timeless classics for every occasion',
        bannerImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      {
        id: 'kids',
        name: "Kids' Clothing",
        slug: 'kids',
        productCount: 30,
        description: 'Fun, durable, and comfortable clothing for children of all ages',
        bannerImage: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      }
    ],
    books: [
      {
        id: 'fiction',
        name: 'Fiction',
        slug: 'fiction',
        productCount: 34,
        description: 'Captivating stories and imaginative worlds from acclaimed authors',
        bannerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      {
        id: 'non-fiction',
        name: 'Non-Fiction',
        slug: 'non-fiction',
        productCount: 28,
        description: 'Educational and informative books on real-world topics',
        bannerImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      {
        id: 'educational',
        name: 'Educational',
        slug: 'educational',
        productCount: 27,
        description: 'Learning resources and textbooks for students and professionals',
        bannerImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      }
    ],
    accessories: [
      {
        id: 'bags',
        name: 'Bags',
        slug: 'bags',
        productCount: 45,
        description: 'Stylish and functional bags for every lifestyle and occasion',
        bannerImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      {
        id: 'jewelry',
        name: 'Jewelry',
        slug: 'jewelry',
        productCount: 56,
        description: 'Elegant jewelry pieces to complement your personal style',
        bannerImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      {
        id: 'wallets',
        name: 'Wallets',
        slug: 'wallets',
        productCount: 33,
        description: 'Premium wallets crafted from quality materials for everyday use',
        bannerImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      }
    ],
    shoes: [
      {
        id: 'sneakers',
        name: 'Sneakers',
        slug: 'sneakers',
        productCount: 42,
        description: 'Comfortable and trendy sneakers for sports and casual wear',
        bannerImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      {
        id: 'boots',
        name: 'Boots',
        slug: 'boots',
        productCount: 28,
        description: 'Durable and stylish boots for all weather conditions',
        bannerImage: 'https://images.unsplash.com/photo-1544966503-7cc5ac882e3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      {
        id: 'sandals',
        name: 'Sandals',
        slug: 'sandals',
        productCount: 28,
        description: 'Comfortable sandals perfect for warm weather and relaxation',
        bannerImage: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      }
    ]
  };

  return subcategoriesMap[categorySlug] || [];
};

// Enhanced product data with additional properties for filtering
const enhancedProducts = products.map((product, index) => ({
  ...product,
  brand: ['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'Dell', 'HP', 'Canon', 'Nikon', 'Zara'][index % 10],
  rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3.0 and 5.0
  availability: Math.random() > 0.2 ? 'in-stock' : 'out-of-stock', // 80% in stock
  originalPrice: Math.random() > 0.5 ? product.price * 1.2 : null, // Some products have original price (discount)
  description: `High-quality ${product.name.toLowerCase()} with excellent features and great value for money. Perfect for everyday use.`,
  sku: `SKU-${product.id.toString().padStart(6, '0')}`,
  weight: (Math.random() * 5 + 0.5).toFixed(1) + ' lbs',
  dimensions: '10" x 8" x 2"',
  inStock: Math.floor(Math.random() * 50) + 5,
  tags: ['popular', 'bestseller', 'new-arrival', 'limited-edition'].filter(() => Math.random() > 0.6)
}));

// Generate mock category data
export const getCategoryData = async (categorySlug, subcategorySlug = null) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Find the category
  const category = categories.find(cat => cat.slug === categorySlug);

  if (!category) {
    return null;
  }

  // Get subcategories for this category
  const subcategories = generateSubcategories(categorySlug);

  // Find specific subcategory if provided
  let subcategory = null;
  if (subcategorySlug) {
    subcategory = subcategories.find(sub => sub.slug === subcategorySlug);
    if (!subcategory) {
      return null;
    }
  }

  // Filter products by category (and subcategory if specified)
  let categoryProducts = enhancedProducts.filter(product =>
    product.category.toLowerCase() === categorySlug.toLowerCase()
  );

  // If subcategory is specified, further filter products
  if (subcategory) {
    // For demo purposes, distribute products among subcategories
    const subcategoryIndex = subcategories.findIndex(sub => sub.slug === subcategorySlug);
    categoryProducts = categoryProducts.filter((_, index) =>
      index % subcategories.length === subcategoryIndex
    );
  }

  // Get available brands from the products
  const availableBrands = [...new Set(categoryProducts.map(p => p.brand))].sort();

  // Calculate price range
  const prices = categoryProducts.map(p => p.price);
  const priceRange = {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };

  // Calculate total product count
  const totalProducts = categoryProducts.length;

  return {
    category,
    subcategory,
    subcategories: subcategories.length > 0 ? subcategories : null,
    products: categoryProducts,
    availableBrands,
    priceRange,
    totalProducts,
    filters: {
      brands: availableBrands,
      priceRange,
      ratings: ['4', '3', '2', '1'],
      availability: ['in-stock', 'out-of-stock']
    }
  };
};

// Get all categories for navigation
export const getAllCategories = () => {
  return categories;
};

// Get category by slug
export const getCategoryBySlug = (slug) => {
  return categories.find(cat => cat.slug === slug);
};

// Search products across all categories
export const searchProducts = async (query, filters = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  let results = enhancedProducts;

  // Filter by search query
  if (query) {
    results = results.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Apply additional filters
  if (filters.category) {
    results = results.filter(product =>
      product.category.toLowerCase() === filters.category.toLowerCase()
    );
  }

  if (filters.minPrice) {
    results = results.filter(product => product.price >= filters.minPrice);
  }

  if (filters.maxPrice) {
    results = results.filter(product => product.price <= filters.maxPrice);
  }

  if (filters.brands && filters.brands.length > 0) {
    results = results.filter(product => filters.brands.includes(product.brand));
  }

  if (filters.rating) {
    results = results.filter(product => parseFloat(product.rating) >= parseFloat(filters.rating));
  }

  if (filters.availability) {
    results = results.filter(product => product.availability === filters.availability);
  }

  return {
    products: results,
    totalResults: results.length,
    query,
    filters
  };
};
