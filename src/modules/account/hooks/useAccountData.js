import { useState, useEffect, useCallback } from 'react';
import { mockUser, mockAddresses, mockOrders } from '../data/mockOrders.js';

/**
 * Custom hook for managing account data
 * In a real app, this would integrate with your API
 */
export const useAccountData = () => {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize data (simulate API call)
  useEffect(() => {
    const loadAccountData = async () => {
      try {
        setLoading(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // In a real app, these would be separate API calls
        setUser(mockUser);
        setAddresses(mockAddresses);
        setOrders(mockOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAccountData();
  }, []);

  // Update user profile
  const updateProfile = useCallback(async (profileData) => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setUser(prevUser => ({
        ...prevUser,
        ...profileData
      }));

      return { success: true, message: 'Profile updated successfully' };
    } catch (err) {
      setError(err.message);
      return { success: false, message: 'Failed to update profile' };
    } finally {
      setLoading(false);
    }
  }, []);

  // Change password
  const changePassword = useCallback(async (passwordData) => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, you would validate current password and update
      return { success: true, message: 'Password changed successfully' };
    } catch (err) {
      setError(err.message);
      return { success: false, message: 'Failed to change password' };
    } finally {
      setLoading(false);
    }
  }, []);

  // Add new address
  const addAddress = useCallback(async (addressData) => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newAddress = {
        id: `ADDR_${Date.now()}`,
        ...addressData,
        createdAt: new Date().toISOString()
      };

      setAddresses(prevAddresses => [...prevAddresses, newAddress]);

      return { success: true, message: 'Address added successfully' };
    } catch (err) {
      setError(err.message);
      return { success: false, message: 'Failed to add address' };
    } finally {
      setLoading(false);
    }
  }, []);

  // Update existing address
  const updateAddress = useCallback(async (addressId, addressData) => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setAddresses(prevAddresses =>
        prevAddresses.map(addr =>
          addr.id === addressId ? { ...addr, ...addressData } : addr
        )
      );

      return { success: true, message: 'Address updated successfully' };
    } catch (err) {
      setError(err.message);
      return { success: false, message: 'Failed to update address' };
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete address
  const deleteAddress = useCallback(async (addressId) => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setAddresses(prevAddresses =>
        prevAddresses.filter(addr => addr.id !== addressId)
      );

      return { success: true, message: 'Address deleted successfully' };
    } catch (err) {
      setError(err.message);
      return { success: false, message: 'Failed to delete address' };
    } finally {
      setLoading(false);
    }
  }, []);

  // Set default address
  const setDefaultAddress = useCallback(async (addressId) => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setAddresses(prevAddresses =>
        prevAddresses.map(addr => ({
          ...addr,
          isDefault: addr.id === addressId
        }))
      );

      return { success: true, message: 'Default address updated' };
    } catch (err) {
      setError(err.message);
      return { success: false, message: 'Failed to update default address' };
    } finally {
      setLoading(false);
    }
  }, []);

  // Get single order by ID
  const getOrder = useCallback((orderId) => {
    return orders.find(order => order.id === orderId || order.orderNumber === orderId);
  }, [orders]);

  // Cancel order
  const cancelOrder = useCallback(async (orderId) => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId
            ? { ...order, status: 'cancelled', tracking: { ...order.tracking, status: 'cancelled' } }
            : order
        )
      );

      return { success: true, message: 'Order cancelled successfully' };
    } catch (err) {
      setError(err.message);
      return { success: false, message: 'Failed to cancel order' };
    } finally {
      setLoading(false);
    }
  }, []);

  // Reorder items
  const reorderItems = useCallback(async (orderId) => {
    try {
      const order = getOrder(orderId);
      if (!order) {
        throw new Error('Order not found');
      }

      // In a real app, this would add items to cart
      console.log('Reordering items from order:', orderId, order.items);

      return { success: true, message: 'Items added to cart' };
    } catch (err) {
      setError(err.message);
      return { success: false, message: 'Failed to reorder items' };
    }
  }, [getOrder]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // Data
    user,
    addresses,
    orders,
    loading,
    error,

    // Profile methods
    updateProfile,
    changePassword,

    // Address methods
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,

    // Order methods
    getOrder,
    cancelOrder,
    reorderItems,

    // Utility methods
    clearError
  };
};
