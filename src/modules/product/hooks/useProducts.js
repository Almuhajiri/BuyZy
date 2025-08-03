import { useState, useEffect } from 'react';
import { products as mockProducts } from '../../homepage/data/products';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // In a real app, this would be an API call
        // const response = await fetch('/api/products');
        // const data = await response.json();

        // For now, use mock data
        setProducts(mockProducts);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: () => {
      setProducts([]);
      setLoading(true);
      setError(null);
      // Re-run the effect
    }
  };
};
