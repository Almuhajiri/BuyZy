// Enhanced product detail data with comprehensive information
import { products } from '../../homepage/data/products.js';

// Extended product details with additional information for product pages
const productDetails = {
  1: {
    id: 1,
    sku: 'BT-HP-001',
    name: "Wireless Bluetooth Headphones",
    price: 49.99,
    originalPrice: 79.99,
    discount: 38,
    currency: 'USD',
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"
    ],
    rating: 4.5,
    reviewCount: 324,
    category: "electronics",
    brand: "SoundMax",
    availability: "in-stock",
    stock: 45,
    description: "Experience premium sound quality with our Wireless Bluetooth Headphones. Featuring advanced noise cancellation technology, these headphones deliver crystal-clear audio while blocking out unwanted background noise. With an impressive 30-hour battery life, they're perfect for long commutes, work sessions, or travel.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Quick charge - 15 minutes for 3 hours",
      "Premium comfort fit",
      "Built-in microphone",
      "Foldable design"
    ],
    specifications: {
      "Audio": {
        "Driver Size": "40mm",
        "Frequency Response": "20Hz - 20kHz",
        "Impedance": "32Ω",
        "Sensitivity": "105dB"
      },
      "Connectivity": {
        "Bluetooth Version": "5.3",
        "Range": "30 feet (10m)",
        "Codecs": "SBC, AAC, aptX"
      },
      "Battery": {
        "Playtime": "30 hours (ANC off), 25 hours (ANC on)",
        "Charging Time": "2 hours",
        "Quick Charge": "15 min = 3 hours"
      },
      "Design": {
        "Weight": "250g",
        "Dimensions": "7.1 × 6.7 × 3.1 inches",
        "Materials": "Premium plastic, memory foam"
      }
    },
    shipping: {
      "free": true,
      "estimatedDays": "2-3 business days",
      "expedited": "Next day delivery available"
    },
    warranty: "2 years manufacturer warranty",
    tags: ["wireless", "bluetooth", "noise-cancelling", "premium", "travel"]
  },

  2: {
    id: 2,
    sku: 'FW-SM-002',
    name: "Smart Fitness Watch",
    price: 129.99,
    originalPrice: 199.99,
    discount: 35,
    currency: 'USD',
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop"
    ],
    rating: 4.7,
    reviewCount: 156,
    category: "electronics",
    brand: "FitTrack",
    availability: "in-stock",
    stock: 28,
    description: "Stay connected and motivated with our Smart Fitness Watch. Track your workouts, monitor your health metrics, and receive notifications right on your wrist. With GPS tracking, heart rate monitoring, and water resistance, it's the perfect companion for your active lifestyle.",
    features: [
      "GPS & GLONASS tracking",
      "Heart rate monitoring",
      "Sleep tracking",
      "Water resistant (50m)",
      "7-day battery life",
      "Smart notifications"
    ],
    specifications: {
      "Display": {
        "Size": "1.4 inches",
        "Resolution": "454 × 454 pixels",
        "Type": "AMOLED",
        "Brightness": "1000 nits"
      },
      "Health": {
        "Heart Rate": "24/7 monitoring",
        "SpO2": "Blood oxygen tracking",
        "Sleep": "Deep sleep analysis",
        "Stress": "Stress level monitoring"
      },
      "Fitness": {
        "Workout Modes": "100+ sports modes",
        "GPS": "Built-in GPS + GLONASS",
        "Water Resistance": "5ATM (50 meters)",
        "Sensors": "Accelerometer, Gyroscope, Compass"
      },
      "Battery & Connectivity": {
        "Battery Life": "7 days typical use",
        "Charging": "Magnetic charging",
        "Connectivity": "Bluetooth 5.0, WiFi",
        "Compatibility": "iOS 12+, Android 6+"
      }
    },
    shipping: {
      "free": true,
      "estimatedDays": "2-3 business days",
      "expedited": "Same day delivery available"
    },
    warranty: "1 year manufacturer warranty",
    tags: ["fitness", "smartwatch", "gps", "heart-rate", "waterproof"]
  },

  3: {
    id: 3,
    sku: 'CLT-JS-003',
    name: "Stylish Denim Jacket",
    price: 39.99,
    originalPrice: 59.99,
    discount: 33,
    currency: 'USD',
    images: [
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506629905057-bebe8d5e9832?w=800&h=600&fit=crop"
    ],
    rating: 4.3,
    reviewCount: 89,
    category: "clothing",
    brand: "UrbanStyle",
    availability: "in-stock",
    stock: 15,
    description: "Classic denim jacket with a modern twist. Made from premium cotton denim with a comfortable regular fit. Perfect for layering and adding a casual touch to any outfit. Features traditional button closure and multiple pockets for functionality.",
    features: [
      "100% Cotton Denim",
      "Regular fit",
      "Button closure",
      "Multiple pockets",
      "Classic collar",
      "Machine washable"
    ],
    specifications: {
      "Material": {
        "Fabric": "100% Cotton Denim",
        "Weight": "12 oz denim",
        "Care": "Machine wash cold",
        "Origin": "Made in USA"
      },
      "Fit": {
        "Style": "Regular fit",
        "Length": "Hip length",
        "Closure": "Button front",
        "Pockets": "2 chest, 2 side"
      },
      "Sizes": {
        "Available": "XS, S, M, L, XL, XXL",
        "Size Guide": "See size chart",
        "Fit": "True to size"
      }
    },
    sizeOptions: ["XS", "S", "M", "L", "XL", "XXL"],
    colorOptions: [
      { name: "Classic Blue", code: "#4F46E5", image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop" },
      { name: "Light Wash", code: "#93C5FD", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop" },
      { name: "Dark Indigo", code: "#1E1B4B", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop" }
    ],
    shipping: {
      "free": false,
      "cost": 5.99,
      "estimatedDays": "3-5 business days",
      "expedited": "2-day shipping available"
    },
    warranty: "30-day return policy",
    tags: ["denim", "jacket", "casual", "layering", "cotton"]
  }
};

// Generate mock reviews for products
const generateReviews = (productId, count) => {
  const reviewerNames = [
    "Alex Johnson", "Sarah Chen", "Michael Brown", "Emma Davis", "James Wilson",
    "Lisa Garcia", "David Miller", "Anna Rodriguez", "Tom Anderson", "Maria Lopez"
  ];

  const reviewTexts = {
    1: [ // Headphones
      "Amazing sound quality and the noise cancellation works perfectly on flights.",
      "Battery life is exactly as advertised. Very comfortable for long listening sessions.",
      "Great value for money. The build quality feels premium.",
      "Easy to pair and the sound is crisp. Highly recommend!",
      "Perfect for working from home. Blocks out all distractions."
    ],
    2: [ // Smart Watch
      "Tracks everything I need and the battery lasts a full week.",
      "GPS accuracy is spot on during my runs. Love the heart rate monitoring.",
      "Sleek design and the notifications are very convenient.",
      "Water resistance works great - wore it swimming without issues.",
      "Easy to use interface and pairs seamlessly with my phone."
    ],
    3: [ // Denim Jacket
      "Perfect fit and great quality denim. Goes with everything.",
      "Exactly as pictured. The color is beautiful and fits true to size.",
      "Good quality for the price. Nice weight to the fabric.",
      "Classic style that never goes out of fashion. Very satisfied.",
      "Comfortable and well-made. Fast shipping too!"
    ]
  };

  const ratings = [5, 5, 4, 5, 4, 3, 5, 4, 4, 5];
  const reviews = [];

  for (let i = 0; i < Math.min(count, 10); i++) {
    reviews.push({
      id: `${productId}-review-${i + 1}`,
      userId: `user-${i + 1}`,
      userName: reviewerNames[i],
      rating: ratings[i],
      title: `${ratings[i]} star review`,
      comment: reviewTexts[productId] ? reviewTexts[productId][i % reviewTexts[productId].length] : "Great product!",
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      verified: Math.random() > 0.3,
      helpful: Math.floor(Math.random() * 20)
    });
  }

  return reviews;
};

// Add reviews to product details
Object.keys(productDetails).forEach(id => {
  const numId = parseInt(id);
  productDetails[id].reviews = generateReviews(numId, productDetails[id].reviewCount || 5);
});

// Related products functionality
export const getRelatedProducts = (productId, limit = 4) => {
  const currentProduct = productDetails[productId];
  if (!currentProduct) return [];

  // Find products in the same category, excluding current product
  const related = Object.values(productDetails)
    .filter(product =>
      product.category === currentProduct.category &&
      product.id !== productId
    )
    .slice(0, limit);

  // If not enough in same category, add random products
  if (related.length < limit) {
    const others = Object.values(productDetails)
      .filter(product =>
        product.id !== productId &&
        !related.find(r => r.id === product.id)
      )
      .slice(0, limit - related.length);

    related.push(...others);
  }

  return related;
};

// Main function to get product details
export const getProductById = async (productId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  const numId = parseInt(productId);
  const product = productDetails[numId];

  if (!product) {
    throw new Error(`Product with ID ${productId} not found`);
  }

  return {
    ...product,
    relatedProducts: getRelatedProducts(numId)
  };
};

// Get all product details
export const getAllProductDetails = () => {
  return productDetails;
};

// Search products by name or description
export const searchProductDetails = (query) => {
  const searchTerm = query.toLowerCase();
  return Object.values(productDetails).filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

export default productDetails;
