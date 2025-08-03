import { useState, useEffect } from 'react';
import { featuredCategories } from '../data/categories';

export const useCategoryHighlight = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call with loading delay
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));

        setCategories(featuredCategories);
        setError(null);
      } catch (err) {
        setError('Failed to load categories');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
