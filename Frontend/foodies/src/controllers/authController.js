import { authService } from '../service/authService';
import { toast } from 'react-toastify';

/**
 * Authentication Controller - Handles authentication business logic
 * Follows Single Responsibility Principle and coordinates between UI and Service
 */
class AuthController {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {Function} onSuccess - Success callback
   * @param {Function} onError - Error callback
   * @returns {Promise<void>}
   */
  async registerUser(userData, onSuccess, onError) {
    try {
      const result = await authService.registerUser(userData);
      
      if (result.success) {
        toast.success('Registration completed successfully. Please login.');
        onSuccess && onSuccess(result.data);
      } else {
        const errorMessage = result.error?.message || 'Registration failed';
        toast.error(errorMessage);
        onError && onError(result.error);
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred during registration';
      toast.error(errorMessage);
      onError && onError({ message: errorMessage, status: 500 });
    }
  }

  /**
   * Login user
   * @param {Object} credentials - Login credentials
   * @param {Function} onSuccess - Success callback
   * @param {Function} onError - Error callback
   * @returns {Promise<void>}
   */
  async login(credentials, onSuccess, onError) {
    try {
      const result = await authService.login(credentials);
      
      if (result.success) {
        // Store token in localStorage
        localStorage.setItem('token', result.data.token);
        toast.success('Login successful!');
        onSuccess && onSuccess(result.data);
      } else {
        const errorMessage = result.error?.message || 'Login failed';
        toast.error(errorMessage);
        onError && onError(result.error);
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred during login';
      toast.error(errorMessage);
      onError && onError({ message: errorMessage, status: 500 });
    }
  }

  /**
   * Logout user
   * @param {Function} onSuccess - Success callback
   * @param {Function} onError - Error callback
   * @returns {Promise<void>}
   */
  async logout(onSuccess, onError) {
    try {
      const result = await authService.logout();
      
      if (result.success) {
        toast.success('Logged out successfully');
        onSuccess && onSuccess();
      } else {
        const errorMessage = result.error?.message || 'Logout failed';
        toast.error(errorMessage);
        onError && onError(result.error);
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred during logout';
      toast.error(errorMessage);
      onError && onError({ message: errorMessage, status: 500 });
    }
  }

  /**
   * Validate user token
   * @param {string} token - Authentication token
   * @param {Function} onSuccess - Success callback
   * @param {Function} onError - Error callback
   * @returns {Promise<void>}
   */
  async validateToken(token, onSuccess, onError) {
    try {
      const result = await authService.validateToken(token);
      
      if (result.success) {
        onSuccess && onSuccess(result.data);
      } else {
        // Clear invalid token
        localStorage.removeItem('token');
        onError && onError(result.error);
      }
    } catch (error) {
      localStorage.removeItem('token');
      onError && onError({ message: 'Token validation failed', status: 401 });
    }
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  /**
   * Get stored token
   * @returns {string|null} Stored token or null
   */
  getToken() {
    return localStorage.getItem('token');
  }
}

// Export singleton instance
export const authController = new AuthController();
export default authController;
