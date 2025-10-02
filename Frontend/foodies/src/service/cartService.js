import axios from "axios";

const API_URL = "http://localhost:8080/api/cart";

/**
 * Cart Service - Handles all cart-related API operations
 * Follows Single Responsibility Principle
 */
class CartService {
  constructor() {
    this.baseURL = API_URL;
  }

  /**
   * Add item to cart
   * @param {string} foodId - Food item ID
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Add to cart response
   */
  async addToCart(foodId, token) {
    try {
      const response = await axios.post(this.baseURL, { foodId }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      return this.handleError(error, 'Failed to add item to cart');
    }
  }

  /**
   * Remove quantity from cart
   * @param {string} foodId - Food item ID
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Remove from cart response
   */
  async removeQtyFromCart(foodId, token) {
    try {
      const response = await axios.post(`${this.baseURL}/remove`, { foodId }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      return this.handleError(error, 'Failed to remove item from cart');
    }
  }

  /**
   * Get cart data for user
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Cart data response
   */
  async getCartData(token) {
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
      return this.handleError(error, 'Failed to fetch cart data');
    }
  }

  /**
   * Clear entire cart
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Clear cart response
   */
  async clearCart(token) {
    try {
      const response = await axios.delete(this.baseURL, {
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
   * Update item quantity in cart
   * @param {string} foodId - Food item ID
   * @param {number} quantity - New quantity
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Update cart response
   */
  async updateCartItem(foodId, quantity, token) {
    try {
      const response = await axios.put(this.baseURL, { foodId, quantity }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      return this.handleError(error, 'Failed to update cart item');
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
export const cartService = new CartService();
export default cartService;
