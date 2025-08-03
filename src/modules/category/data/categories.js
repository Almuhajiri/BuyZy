import {
  FiSmartphone,
  FiShoppingBag,
  FiBook,
  FiHeart,
  FiWatch,
  FiCamera,
  FiHeadphones,
  FiShoppingCart
} from 'react-icons/fi';

export const categories = [
  {
    id: 'electronics',
    slug: 'electronics',
    name: 'Electronics',
    title: 'Electronics & Tech',
    icon: FiSmartphone,
    bannerImage: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&h=400&fit=crop',
    description: 'Discover the latest gadgets, home appliances, and digital essentials. From smartphones to smart home devices, find cutting-edge technology at unbeatable prices.',
    productCount: 156,
    featured: true,
    subcategories: [
      { id: 'smartphones', name: 'Smartphones', slug: 'smartphones' },
      { id: 'laptops', name: 'Laptops', slug: 'laptops' },
      { id: 'wearables', name: 'Wearables', slug: 'wearables' },
      { id: 'smart-home', name: 'Smart Home', slug: 'smart-home' },
      { id: 'gaming', name: 'Gaming', slug: 'gaming' }
    ]
  },
  {
    id: 'clothing',
    slug: 'clothing',
    name: 'Clothing',
    title: 'Fashion & Apparel',
    icon: FiShoppingCart,
    bannerImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=400&fit=crop',
    description: 'Explore our vast collection of fashion and apparel for all seasons. From casual wear to formal attire, find your perfect style.',
    productCount: 243,
    featured: true,
    subcategories: [
      { id: 'mens', name: "Men's Clothing", slug: 'mens' },
      { id: 'womens', name: "Women's Clothing", slug: 'womens' },
      { id: 'kids', name: "Kids' Clothing", slug: 'kids' },
      { id: 'activewear', name: 'Activewear', slug: 'activewear' },
      { id: 'formal', name: 'Formal Wear', slug: 'formal' }
    ]
  },
  {
    id: 'books',
    slug: 'books',
    name: 'Books',
    title: 'Books & Literature',
    icon: FiBook,
    bannerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=400&fit=crop',
    description: 'Dive into our extensive library of books. Educational materials, entertainment reads, and everything in between.',
    productCount: 89,
    featured: true,
    subcategories: [
      { id: 'fiction', name: 'Fiction', slug: 'fiction' },
      { id: 'non-fiction', name: 'Non-Fiction', slug: 'non-fiction' },
      { id: 'educational', name: 'Educational', slug: 'educational' },
      { id: 'childrens', name: "Children's Books", slug: 'childrens' },
      { id: 'comics', name: 'Comics & Graphic Novels', slug: 'comics' }
    ]
  },
  {
    id: 'accessories',
    slug: 'accessories',
    name: 'Accessories',
    title: 'Accessories & Lifestyle',
    icon: FiShoppingBag,
    bannerImage: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1200&h=400&fit=crop',
    description: 'Complete your look with our curated selection of bags, jewelry, and lifestyle accessories.',
    productCount: 134,
    featured: true,
    subcategories: [
      { id: 'bags', name: 'Bags & Purses', slug: 'bags' },
      { id: 'jewelry', name: 'Jewelry', slug: 'jewelry' },
      { id: 'sunglasses', name: 'Sunglasses', slug: 'sunglasses' },
      { id: 'wallets', name: 'Wallets', slug: 'wallets' },
      { id: 'belts', name: 'Belts', slug: 'belts' }
    ]
  },
  {
    id: 'shoes',
    slug: 'shoes',
    name: 'Shoes',
    title: 'Footwear Collection',
    icon: FiHeart,
    bannerImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&h=400&fit=crop',
    description: 'Step into style with our comprehensive footwear collection. From casual to formal, athletic to fashion-forward.',
    productCount: 98,
    featured: true,
    subcategories: [
      { id: 'sneakers', name: 'Sneakers', slug: 'sneakers' },
      { id: 'boots', name: 'Boots', slug: 'boots' },
      { id: 'sandals', name: 'Sandals', slug: 'sandals' },
      { id: 'formal-shoes', name: 'Formal Shoes', slug: 'formal-shoes' },
      { id: 'athletic', name: 'Athletic Shoes', slug: 'athletic' }
    ]
  },
  {
    id: 'watches',
    slug: 'watches',
    name: 'Watches',
    title: 'Watches & Timepieces',
    icon: FiWatch,
    bannerImage: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1200&h=400&fit=crop',
    description: 'Discover timepieces that blend style and function. From luxury watches to everyday essentials.',
    productCount: 67,
    featured: false,
    subcategories: [
      { id: 'smart-watches', name: 'Smart Watches', slug: 'smart-watches' },
      { id: 'luxury', name: 'Luxury Watches', slug: 'luxury' },
      { id: 'sports', name: 'Sports Watches', slug: 'sports' },
      { id: 'casual', name: 'Casual Watches', slug: 'casual' }
    ]
  },
  {
    id: 'cameras',
    slug: 'cameras',
    name: 'Cameras',
    title: 'Cameras & Photography',
    icon: FiCamera,
    bannerImage: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&h=400&fit=crop',
    description: 'Capture life\'s moments with professional photography equipment and accessories.',
    productCount: 45,
    featured: false,
    subcategories: [
      { id: 'dslr', name: 'DSLR Cameras', slug: 'dslr' },
      { id: 'mirrorless', name: 'Mirrorless', slug: 'mirrorless' },
      { id: 'lenses', name: 'Lenses', slug: 'lenses' },
      { id: 'accessories', name: 'Camera Accessories', slug: 'accessories' }
    ]
  },
  {
    id: 'audio',
    slug: 'audio',
    name: 'Audio',
    title: 'Audio & Sound',
    icon: FiHeadphones,
    bannerImage: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&h=400&fit=crop',
    description: 'Immerse yourself in superior sound quality with our range of headphones, speakers, and audio gear.',
    productCount: 73,
    featured: false,
    subcategories: [
      { id: 'headphones', name: 'Headphones', slug: 'headphones' },
      { id: 'speakers', name: 'Speakers', slug: 'speakers' },
      { id: 'earbuds', name: 'Earbuds', slug: 'earbuds' },
      { id: 'audio-accessories', name: 'Audio Accessories', slug: 'audio-accessories' }
    ]
  }
];

// Get category by slug
export const getCategoryBySlug = (slug) => {
  return categories.find(category => category.slug === slug);
};

// Get featured categories
export const getFeaturedCategories = () => {
  return categories.filter(category => category.featured);
};

// Get all category slugs for routing
export const getCategorySlugs = () => {
  return categories.map(category => category.slug);
};
