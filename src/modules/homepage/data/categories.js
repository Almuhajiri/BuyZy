import {
  FiSmartphone,
  FiShoppingBag,
  FiShoppingCart,
  FiBook,
  FiHeart,
  FiWatch,
  FiCamera,
  FiHeadphones
} from 'react-icons/fi';

export const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    icon: FiSmartphone,
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=300&fit=crop',
    description: 'Latest gadgets and electronic devices',
    productCount: 156,
    featured: true
  },
  {
    id: 'clothing',
    name: 'Clothing',
    slug: 'clothing',
    icon: FiShoppingCart,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
    description: 'Fashion and apparel for all seasons',
    productCount: 243,
    featured: true
  },
  {
    id: 'books',
    name: 'Books',
    slug: 'books',
    icon: FiBook,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    description: 'Educational and entertaining reads',
    productCount: 89,
    featured: true
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    icon: FiShoppingBag,
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&h=300&fit=crop',
    description: 'Bags, jewelry, and lifestyle accessories',
    productCount: 134,
    featured: true
  },
  {
    id: 'shoes',
    name: 'Shoes',
    slug: 'shoes',
    icon: FiHeart,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
    description: 'Footwear for every occasion',
    productCount: 98,
    featured: true
  },
  {
    id: 'watches',
    name: 'Watches',
    slug: 'watches',
    icon: FiWatch,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop',
    description: 'Timepieces for style and function',
    productCount: 67,
    featured: false
  },
  {
    id: 'cameras',
    name: 'Cameras',
    slug: 'cameras',
    icon: FiCamera,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
    description: 'Photography equipment and accessories',
    productCount: 45,
    featured: false
  },
  {
    id: 'audio',
    name: 'Audio',
    slug: 'audio',
    icon: FiHeadphones,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
    description: 'Headphones, speakers, and audio gear',
    productCount: 73,
    featured: false
  }
];

// Featured categories (to be displayed on homepage)
export const featuredCategories = categories.filter(category => category.featured);

// Get category by ID
export const getCategoryById = (id) => {
  return categories.find(category => category.id === id);
};

// Get all category names
export const getCategoryNames = () => {
  return categories.map(category => ({
    id: category.id,
    name: category.name
  }));
};

// Category navigation items
export const categoryNavItems = [
  { id: 'all', name: 'All Products', href: '/product' },
  ...categories.map(category => ({
    id: category.id,
    name: category.name,
    href: `/product?category=${category.id}`
  }))
];

// Updated category navigation for navbar and other components
export const categoryNavigation = [
  { id: 'all', name: 'All Products', href: '/product' },
  ...featuredCategories.map(category => ({
    id: category.id,
    name: category.name,
    href: `/product?category=${category.id}`
  }))
];
