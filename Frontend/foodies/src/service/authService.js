import axios from "axios";

const API_URL = "http://localhost:8080/api";

/**
 * Authentication Service - Handles all authentication-related API operations
 * Follows Single Responsibility Principle
 */
class AuthService {
  constructor() {
    this.baseURL = API_URL;
  }

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Registration response
   */
  async registerUser(userData) {
    try {
      const response = await axios.post(`${this.baseURL}/register`, userData);
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      return this.handleError(error, 'Registration failed');
    }
  }

  /**
   * Login user
   * @param {Object} credentials - User login credentials
   * @returns {Promise<Object>} Login response with token
   */
  async login(credentials) {
    try {
      const response = await axios.post(`${this.baseURL}/login`, credentials);
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      return this.handleError(error, 'Login failed');
    }
  }

  /**
   * Logout user (clear local storage)
   * @returns {Promise<Object>} Logout response
   */
  async logout() {
    try {
      localStorage.removeItem('token');
      return {
        success: true,
        message: 'Logged out successfully'
      };
    } catch (error) {
      return this.handleError(error, 'Logout failed');
    }
  }

  /**
   * Validate token
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Token validation response
   */
  async validateToken(token) {
    try {
      const response = await axios.get(`${this.baseURL}/validate`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      return this.handleError(error, 'Token validation failed');
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
export const authService = new AuthService();
export default authService;