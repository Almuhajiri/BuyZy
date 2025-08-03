import HeroBanner from './components/HeroBanner';
import FeaturedProducts from './components/FeaturedProducts';
import CategoryHighlights from './components/CategoryHighlights';
import ValueProposition from './components/ValueProposition';
import NewsletterSignup from './components/NewsletterSignup';

const Homepage = () => {
  return (
    <main>
      <HeroBanner />
      <FeaturedProducts />
      <CategoryHighlights />
      <ValueProposition />
      <NewsletterSignup />
    </main>
  );
};

export default Homepage;
