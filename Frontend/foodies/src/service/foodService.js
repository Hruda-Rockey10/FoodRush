import axios from 'axios';

const API_URL = 'http://localhost:8080/api/foods';

/**
 * Food Service - Handles all food-related API operations
 * Follows Single Responsibility Principle
 */
class FoodService {
  constructor() {
    this.baseURL = API_URL;
  }

  /**
   * Fetch all food items
   * @returns {Promise<Object>} Food list response
   */
  async fetchFoodList() {
    try {
      const response = await axios.get(this.baseURL);
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      return this.handleError(error, 'Failed to fetch food list');
    }
  }

  /**
   * Fetch food details by ID
   * @param {string} id - Food item ID
   * @returns {Promise<Object>} Food details response
   */
  async fetchFoodDetails(id) {
    try {
      const response = await axios.get(`${this.baseURL}/${id}`);
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      return this.handleError(error, 'Failed to fetch food details');
    }
  }

  /**
   * Search food items by name or category
   * @param {string} query - Search query
   * @returns {Promise<Object>} Search results response
   */
  async searchFood(query) {
    try {
      const response = await axios.get(`${this.baseURL}/search`, {
        params: { q: query }
      });
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      return this.handleError(error, 'Failed to search food items');
    }
  }

  /**
   * Get food items by category
   * @param {string} category - Food category
   * @returns {Promise<Object>} Category food items response
   */
  async getFoodByCategory(category) {
    try {
      const response = await axios.get(`${this.baseURL}/category/${category}`);
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      return this.handleError(error, 'Failed to fetch food by category');
    }
  }

  /**
   * Get all available categories
   * @returns {Promise<Object>} Categories response
   */
  async getCategories() {
    try {
      const response = await axios.get(`${this.baseURL}/categories`);
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      return this.handleError(error, 'Failed to fetch categories');
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
export const foodService = new FoodService();
export default foodService;