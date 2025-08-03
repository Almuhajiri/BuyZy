import { useState, useEffect } from 'react';
import { initialCart } from '../data/initialCart.js';

// Custom hook for cart management
export function useCart() {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage or use initial cart
    const savedCart = localStorage.getItem('buyzy_cart');
    return savedCart ? JSON.parse(savedCart) : initialCart;
  });

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('buyzy_cart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addItem = (product, quantity = 1, options = {}) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item =>
        item.id === product.id &&
        item.color === (options.color || product.color) &&
        item.size === (options.size || product.size)
      );

      if (existingItem) {
        // Update quantity if item already exists
        return prevCart.map(item =>
          item.id === product.id &&
            item.color === (options.color || product.color) &&
            item.size === (options.size || product.size)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        const newItem = {
          id: product.id,
          sku: product.sku || `SKU-${product.id}`,
          name: product.name,
          image: Array.isArray(product.images) ? product.images[0] : product.image,
          price: product.price,
          originalPrice: product.originalPrice || product.price,
          quantity,
          category: product.category,
          brand: product.brand,
          size: options.size || product.size || null,
          color: options.color || product.color || null
        };
        return [...prevCart, newItem];
      }
    });
  };

  // Remove item from cart
  const removeItem = (productId, options = {}) => {
    setCart(prevCart =>
      prevCart.filter(item =>
        !(item.id === productId &&
          item.color === (options.color || item.color) &&
          item.size === (options.size || item.size))
      )
    );
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity, options = {}) => {
    if (newQuantity <= 0) {
      removeItem(productId, options);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId &&
          item.color === (options.color || item.color) &&
          item.size === (options.size || item.size)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Get item from cart
  const getItem = (productId, options = {}) => {
    return cart.find(item =>
      item.id === productId &&
      item.color === (options.color || item.color) &&
      item.size === (options.size || item.size)
    );
  };

  // Calculate totals
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalSavings = cart.reduce((sum, item) =>
    sum + ((item.originalPrice - item.price) * item.quantity), 0
  );

  // Tax calculation (8% for demo)
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItem,
    totalItems,
    subtotal,
    tax,
    total,
    totalSavings,
    isEmpty: cart.length === 0
  };
}

export default useCart;
