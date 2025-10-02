import axios from 'axios';

const API_URL = 'http://localhost:8080/api/orders';

/**
 * Order Service - Handles all order-related API operations
 * Follows Single Responsibility Principle
 */
class OrderService {
  constructor() {
    this.baseURL = API_URL;
  }

  /**
   * Create a new order
   * @param {Object} orderData - Order details
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Order response with Razorpay details
   */
  async createOrder(orderData, token) {
    try {
      const response = await axios.post(`${this.baseURL}/create`, orderData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      return this.handleError(error, 'Failed to create order');
    }
  }

  /**
   * Verify payment for an order
   * @param {Object} paymentData - Payment verification data
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Payment verification response
   */
  async verifyPayment(paymentData, token) {
    try {
      const response = await axios.post(`${this.baseURL}/verify`, paymentData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      return this.handleError(error, 'Payment verification failed');
    }
  }

  /**
   * Get all orders for the authenticated user
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} User's orders
   */
  async getUserOrders(token) {
    try {
      const response = await axios.get(this.baseURL, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      return this.handleError(error, 'Failed to fetch orders');
    }
  }

  /**
   * Delete an order
   * @param {string} orderId - Order ID to delete
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Deletion response
   */
  async deleteOrder(orderId, token) {
    try {
      const response = await axios.delete(`${this.baseURL}/${orderId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      return this.handleError(error, 'Failed to delete order');
    }
  }

  /**
   * Clear user's cart after successful order
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Cart clearing response
   */
  async clearCart(token) {
    try {
      const response = await axios.delete('http://localhost:8080/api/cart', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      return this.handleError(error, 'Failed to clear cart');
    }
  }

  /**
   * Handle API errors consistently
   * @param {Error} error - The error object
   * @param {string} defaultMessage - Default error message
   * @returns {Object} Standardized error response
   */
  handleError(error, defaultMessage) {
    const message = error.response?.data?.message || error.message || defaultMessage;
    const status = error.response?.status || 500;
    
    return {
      success: false,
      error: {
        message,
        status,
        details: error.response?.data || null
      }
    };
  }
}

// Export singleton instance
export const orderService = new OrderService();
export default orderService;
