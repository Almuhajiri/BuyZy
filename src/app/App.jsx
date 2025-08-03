import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Homepage from '../modules/homepage/Homepage';
import CategoryPage from '../modules/category/CategoryPage';
import CategoriesPage from '../modules/category/CategoriesPage';
import ProductDetailPage from '../modules/product/ProductDetailPage';
import ProductPage from '../modules/product/ProductPage';
import CartPage from '../modules/cart/CartPage';
import CheckoutPage from '../modules/checkout/CheckoutPage';
import { OrderConfirmationPage } from '../modules/orderConfirmation';
import { AccountDashboard, OrdersPage, ProfilePage } from '../modules/account';
import AboutPage from '../modules/about';
import { CartProvider } from '../contexts/CartContext';
import { Suspense } from 'react';

const LoginPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Login</h1>
      <p className="text-gray-600">Login to your Buyzy account</p>
    </div>
  </div>
);

const TermsPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service</h1>
      <p className="text-gray-600">Our terms and conditions</p>
    </div>
  </div>
);

const PrivacyPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
      <p className="text-gray-600">How we protect your privacy</p>
    </div>
  </div>
);

// Additional placeholder pages for Footer links
const DealsPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Special Deals</h1>
      <p className="text-gray-600">Our best deals and offers</p>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
      <p className="text-gray-600">Get in touch with our team</p>
    </div>
  </div>
);

const SupportPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Help Center</h1>
      <p className="text-gray-600">Find answers to your questions</p>
    </div>
  </div>
);

const ShippingPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Shipping Information</h1>
      <p className="text-gray-600">Learn about our shipping policies</p>
    </div>
  </div>
);

const ReturnsPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Returns & Exchanges</h1>
      <p className="text-gray-600">Our return and exchange policy</p>
    </div>
  </div>
);

const CookiesPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
      <p className="text-gray-600">How we use cookies</p>
    </div>
  </div>
);

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/product" element={<ProductPage />} />
              <Route path="/product/:productId" element={<ProductDetailPage />} />
              <Route path="/category" element={<CategoriesPage />} />
              <Route path="/category/:categorySlug" element={<CategoryPage />} />
              <Route path="/category/:categorySlug/:subcategorySlug" element={<CategoryPage />} />
              <Route path="/about" element={
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
                </div>}>
                  <AboutPage />
                </Suspense>
              } />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
              <Route path="/account" element={<AccountDashboard />} />
              <Route path="/account/orders" element={<OrdersPage />} />
              <Route path="/account/profile" element={<ProfilePage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/deals" element={<DealsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/returns" element={<ReturnsPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              {/* Add more routes as needed */}
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
