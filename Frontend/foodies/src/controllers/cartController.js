import { cartService } from '../service/cartService';
import { toast } from 'react-toastify';

/**
 * Cart Controller - Handles cart-related business logic
 * Follows Single Responsibility Principle and coordinates between UI and Service
 */
class CartController {
  /**
   * Add item to cart
   * @param {string} foodId - Food item ID
   * @param {string} token - Authentication token
   * @param {Function} onSuccess - Success callback
   * @param {Function} onError - Error callback
   * @returns {Promise<void>}
   */
  async addToCart(foodId, token, onSuccess, onError) {
    try {
      const result = await cartService.addToCart(foodId, token);
      
      if (result.success) {
        toast.success('Item added to cart successfully!');
        onSuccess && onSuccess(result.data);
      } else {
        const errorMessage = result.error?.message || 'Failed to add item to cart';
        toast.error(errorMessage);
        onError && onError(result.error);
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred while adding item to cart';
      toast.error(errorMessage);
      onError && onError({ message: errorMessage, status: 500 });
    }
  }

  /**
   * Remove quantity from cart
   * @param {string} foodId - Food item ID
   * @param {string} token - Authentication token
   * @param {Function} onSuccess - Success callback
   * @param {Function} onError - Error callback
   * @returns {Promise<void>}
   */
  async removeFromCart(foodId, token, onSuccess, onError) {
    try {
      const result = await cartService.removeQtyFromCart(foodId, token);
      
      if (result.success) {
        toast.success('Item quantity updated in cart!');
        onSuccess && onSuccess(result.data);
      } else {
        const errorMessage = result.error?.message || 'Failed to remove item from cart';
        toast.error(errorMessage);
        onError && onError(result.error);
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred while removing item from cart';
      toast.error(errorMessage);
      onError && onError({ message: errorMessage, status: 500 });
    }
  }

  /**
   * Get cart data
   * @param {string} token - Authentication token
   * @param {Function} onSuccess - Success callback
   * @param {Function} onError - Error callback
   * @returns {Promise<void>}
   */
  async getCartData(token, onSuccess, onError) {
    try {
      const result = await cartService.getCartData(token);
      
      if (result.success) {
        onSuccess && onSuccess(result.data);
      } else {
        const errorMessage = result.error?.message || 'Failed to fetch cart data';
        toast.error(errorMessage);
        onError && onError(result.error);
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred while fetching cart data';
      toast.error(errorMessage);
      onError && onError({ message: errorMessage, status: 500 });
    }
  }

  /**
   * Clear entire cart
   * @param {string} token - Authentication token
   * @param {Function} onSuccess - Success callback
   * @param {Function} onError - Error callback
   * @returns {Promise<void>}
   */
  async clearCart(token, onSuccess, onError) {
    try {
      const result = await cartService.clearCart(token);
      
      if (result.success) {
        toast.success('Cart cleared successfully!');
        onSuccess && onSuccess(result.data);
      } else {
        const errorMessage = result.error?.message || 'Failed to clear cart';
        toast.error(errorMessage);
        onError && onError(result.error);
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred while clearing cart';
      toast.error(errorMessage);
      onError && onError({ message: errorMessage, status: 500 });
    }
  }

  /**
   * Update cart item quantity
   * @param {string} foodId - Food item ID
   * @param {number} quantity - New quantity
   * @param {string} token - Authentication token
   * @param {Function} onSuccess - Success callback
   * @param {Function} onError - Error callback
   * @returns {Promise<void>}
   */
  async updateCartItem(foodId, quantity, token, onSuccess, onError) {
    try {
      const result = await cartService.updateCartItem(foodId, quantity, token);
      
      if (result.success) {
        toast.success('Cart item updated successfully!');
        onSuccess && onSuccess(result.data);
      } else {
        const errorMessage = result.error?.message || 'Failed to update cart item';
        toast.error(errorMessage);
        onError && onError(result.error);
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred while updating cart item';
      toast.error(errorMessage);
      onError && onError({ message: errorMessage, status: 500 });
    }
  }

  /**
   * Calculate cart totals
   * @param {Array} cartItems - Cart items with quantities
   * @returns {Object} Cart totals
   */
  calculateCartTotals(cartItems) {
    if (!cartItems || !Array.isArray(cartItems)) {
      return {
        subtotal: 0,
        tax: 0,
        shipping: 0,
        total: 0,
        itemCount: 0
      };
    }

    const subtotal = cartItems.reduce((acc, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return acc + (price * quantity);
    }, 0);

    const tax = subtotal * 0.1; // 10% tax
    const shipping = subtotal > 0 ? 10 : 0; // ₹10 shipping if cart has items
    const total = subtotal + tax + shipping;
    const itemCount = cartItems.reduce((acc, item) => acc + (parseInt(item.quantity) || 0), 0);

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      shipping: parseFloat(shipping.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      itemCount
    };
  }

  /**
   * Validate cart before checkout
   * @param {Array} cartItems - Cart items
   * @returns {Object} Validation result
   */
  validateCart(cartItems) {
    if (!cartItems || cartItems.length === 0) {
      return {
        isValid: false,
        message: 'Your cart is empty. Add some items before checkout.'
      };
    }

    const invalidItems = cartItems.filter(item => 
      !item.id || !item.name || !item.price || !item.quantity || item.quantity <= 0
    );

    if (invalidItems.length > 0) {
      return {
        isValid: false,
        message: 'Some items in your cart are invalid. Please refresh and try again.'
      };
    }

    return {
      isValid: true,
      message: 'Cart is valid for checkout.'
    };
  }
}

// Export singleton instance
export const cartController = new CartController();
export default cartController;
