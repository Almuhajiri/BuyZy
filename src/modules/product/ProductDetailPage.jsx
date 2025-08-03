import { useParams, Link } from 'react-router-dom';
import { FiChevronLeft, FiHeart } from 'react-icons/fi';
import { useCartContext } from '../../contexts/CartContext';

// Components
import ProductImages from './components/ProductImages.jsx';
import ProductInfo from './components/ProductInfo.jsx';
import ProductActions from './components/ProductActions.jsx';
import ProductSpecifications from './components/ProductSpecifications.jsx';
import ProductReviews from './components/ProductReviews.jsx';

// Hooks and Utils
import { useProductDetail } from './hooks/useProductDetail.js';

// Shared Components
import ProductCard from '../../components/ProductCard.jsx';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { product, loading, error } = useProductDetail(productId);
  const { addItem } = useCartContext();

  // Event handlers
  const handleAddToCart = async (cartItem) => {
    try {
      // Add item to cart using context
      addItem(product, cartItem.quantity, {
        size: cartItem.selectedSize,
        color: cartItem.selectedColor
      });

      // Success feedback (you could replace this with a toast notification)
      alert(`Added ${cartItem.quantity} item(s) to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  const handleAddToWishlist = (product) => {
    // In a real app, this would make an API call to add item to wishlist
    console.log('Adding to wishlist:', product);
  };

  const handleShare = (product) => {
    // Track sharing analytics
    console.log('Product shared:', product);
  };

  const handleSubmitReview = (reviewData) => {
    // In a real app, this would submit the review to the backend
    console.log('Submitting review:', reviewData);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            {/* Breadcrumb skeleton */}
            <div className="h-4 bg-gray-300 rounded w-64 mb-6"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Images skeleton */}
              <div>
                <div className="aspect-square bg-gray-300 rounded-lg mb-4"></div>
                <div className="flex space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-16 h-16 bg-gray-300 rounded"></div>
                  ))}
                </div>
              </div>

              {/* Product info skeleton */}
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="h-10 bg-gray-300 rounded w-1/3"></div>
                <div className="h-20 bg-gray-300 rounded"></div>
                <div className="h-12 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {error || 'The product you are looking for does not exist.'}
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            <FiChevronLeft className="w-4 h-4 mr-2" />
            Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Categories', href: '/category' },
    { name: product?.category?.name || 'Product', href: `/category/${product?.category?.slug}` },
    { name: product?.name || 'Loading...', href: '#', current: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          {breadcrumbs.map((item, index) => (
            <div key={item.name} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              {item.current ? (
                <span className="font-medium text-gray-900 truncate max-w-xs">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="hover:text-gray-700 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <FiChevronLeft className="w-4 h-4 mr-1" />
            Back
          </button>
        </div>

        {/* Main Product Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 lg:p-8">
            {/* Product Images */}
            <div className="group">
              <ProductImages
                images={product.images}
                productName={product.name}
              />
            </div>

            {/* Product Info and Actions */}
            <div className="space-y-8">
              <ProductInfo product={product} />
              <ProductActions
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                onShare={handleShare}
              />
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="space-y-8">
          {/* Specifications */}
          {product.specifications && (
            <ProductSpecifications specifications={product.specifications} />
          )}

          {/* Reviews */}
          {product.reviews && (
            <ProductReviews
              reviews={product.reviews}
              rating={product.rating}
              reviewCount={product.reviewCount}
              onSubmitReview={handleSubmitReview}
            />
          )}
        </div>

        {/* Related Products */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="mt-12">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Related Products
                </h3>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {product.relatedProducts.map((relatedProduct) => (
                    <div key={relatedProduct.id}>
                      <ProductCard
                        product={{
                          ...relatedProduct,
                          price: `$${relatedProduct.price}`,
                          originalPrice: relatedProduct.originalPrice ? `$${relatedProduct.originalPrice}` : null,
                          image: relatedProduct.images[0]
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sticky Add to Cart (Mobile) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
          <div className="flex items-center justify-between space-x-4">
            <div>
              <div className="text-lg font-bold text-gray-900">
                ${product.price}
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handleAddToWishlist(product)}
                className="p-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <FiHeart className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleAddToCart({ productId: product.id, quantity: 1 })}
                disabled={product.availability !== 'in-stock' || product.stock === 0}
                className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${product.availability === 'in-stock' && product.stock > 0
                  ? 'bg-primary-600 hover:bg-primary-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Bottom spacing for mobile sticky bar */}
        <div className="h-20 lg:hidden"></div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
