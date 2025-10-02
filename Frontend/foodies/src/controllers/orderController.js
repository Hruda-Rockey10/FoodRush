import { orderService } from '../service/orderService';
import { cartController } from './cartController';
import { toast } from 'react-toastify';
import { RAZORPAY_KEY } from '../components/util/constants';

/**
 * Order Controller - Handles order-related business logic
 * Follows Single Responsibility Principle and coordinates between UI and Service
 */
class OrderController {
  /**
   * Create a new order
   * @param {Object} orderData - Order details
   * @param {string} token - Authentication token
   * @param {Function} onSuccess - Success callback
   * @param {Function} onError - Error callback
   * @returns {Promise<void>}
   */
  async createOrder(orderData, token, onSuccess, onError) {
    try {
      const result = await orderService.createOrder(orderData, token);
      
      if (result.success) {
        onSuccess && onSuccess(result.data);
      } else {
        const errorMessage = result.error?.message || 'Failed to create order';
        toast.error(errorMessage);
        onError && onError(result.error);
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred while creating order';
      toast.error(errorMessage);
      onError && onError({ message: errorMessage, status: 500 });
    }
  }

  /**
   * Verify payment for an order
   * @param {Object} paymentData - Payment verification data
   * @param {string} token - Authentication token
   * @param {Function} onSuccess - Success callback
   * @param {Function} onError - Error callback
   * @returns {Promise<void>}
   */
  async verifyPayment(paymentData, token, onSuccess, onError) {
    try {
      const result = await orderService.verifyPayment(paymentData, token);
      
      if (result.success) {
        toast.success('Payment verified successfully!');
        onSuccess && onSuccess(result.data);
      } else {
        const errorMessage = result.error?.message || 'Payment verification failed';
        toast.error(errorMessage);
        onError && onError(result.error);
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred during payment verification';
      toast.error(errorMessage);
      onError && onError({ message: errorMessage, status: 500 });
    }
  }

  /**
   * Get user's orders
   * @param {string} token - Authentication token
   * @param {Function} onSuccess - Success callback
   * @param {Function} onError - Error callback
   * @returns {Promise<void>}
   */
  async getUserOrders(token, onSuccess, onError) {
    try {
      const result = await orderService.getUserOrders(token);
      
      if (result.success) {
        onSuccess && onSuccess(result.data);
      } else {
        const errorMessage = result.error?.message || 'Failed to fetch orders';
        toast.error(errorMessage);
        onError && onError(result.error);
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred while fetching orders';
      toast.error(errorMessage);
      onError && onError({ message: errorMessage, status: 500 });
    }
  }

  /**
   * Delete an order
   * @param {string} orderId - Order ID to delete
   * @param {string} token - Authentication token
   * @param {Function} onSuccess - Success callback
   * @param {Function} onError - Error callback
   * @returns {Promise<void>}
   */
  async deleteOrder(orderId, token, onSuccess, onError) {
    try {
      const result = await orderService.deleteOrder(orderId, token);
      
      if (result.success) {
        toast.success('Order cancelled successfully!');
        onSuccess && onSuccess(result.data);
      } else {
        const errorMessage = result.error?.message || 'Failed to cancel order';
        toast.error(errorMessage);
        onError && onError(result.error);
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred while cancelling order';
      toast.error(errorMessage);
      onError && onError({ message: errorMessage, status: 500 });
    }
  }

  /**
   * Initiate Razorpay payment
   * @param {Object} order - Order details with Razorpay order ID
   * @param {Object} userData - User details for prefill
   * @param {Function} onSuccess - Success callback
   * @param {Function} onError - Error callback
   * @param {Function} onCancel - Cancel callback
   */
  initiateRazorpayPayment(order, userData, onSuccess, onError, onCancel) {
    const options = {
      key: RAZORPAY_KEY,
      amount: order.amount * 100, // Convert to paise
      currency: 'INR',
      name: 'Golden Zaika',
      description: 'Food order payment',
      order_id: order.razorpayOrderId,
      handler: async (razorpayResponse) => {
        onSuccess && onSuccess(razorpayResponse);
      },
      prefill: {
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        contact: userData.phoneNumber
      },
      theme: { color: '#3399cc' },
      modal: {
        ondismiss: () => {
          toast.error('Payment cancelled.');
          onCancel && onCancel();
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  /**
   * Process complete order flow
   * @param {Object} orderData - Order details
   * @param {string} token - Authentication token
   * @param {Object} userData - User details
   * @param {Function} onSuccess - Success callback
   * @param {Function} onError - Error callback
   * @param {Function} onCancel - Cancel callback
   * @returns {Promise<void>}
   */
  async processOrder(orderData, token, userData, onSuccess, onError, onCancel) {
    try {
      // Step 1: Create order
      const createResult = await orderService.createOrder(orderData, token);
      
      if (!createResult.success) {
        const errorMessage = createResult.error?.message || 'Failed to create order';
        toast.error(errorMessage);
        onError && onError(createResult.error);
        return;
      }

      // Step 2: Initiate payment
      this.initiateRazorpayPayment(
        createResult.data,
        userData,
        async (razorpayResponse) => {
          // Step 3: Verify payment
          const verifyResult = await orderService.verifyPayment(razorpayResponse, token);
          
          if (verifyResult.success) {
            // Step 4: Clear cart
            await cartController.clearCart(token);
            toast.success('Order placed successfully!');
            onSuccess && onSuccess(verifyResult.data);
          } else {
            const errorMessage = verifyResult.error?.message || 'Payment verification failed';
            toast.error(errorMessage);
            onError && onError(verifyResult.error);
          }
        },
        onError,
        async () => {
          // Step 5: Delete order if payment cancelled
          await orderService.deleteOrder(createResult.data.id, token);
          onCancel && onCancel();
        }
      );
    } catch (error) {
      const errorMessage = 'An unexpected error occurred during order processing';
      toast.error(errorMessage);
      onError && onError({ message: errorMessage, status: 500 });
    }
  }

  /**
   * Format order data for API
   * @param {Object} formData - Form data
   * @param {Array} cartItems - Cart items
   * @param {Object} quantities - Item quantities
   * @param {number} total - Order total
   * @returns {Object} Formatted order data
   */
  formatOrderData(formData, cartItems, quantities, total) {
    return {
      userAddress: `${formData.firstName} ${formData.lastName}, ${formData.city}, ${formData.state}, ${formData.zip}`,
      phoneNumber: formData.phoneNumber,
      orderedItems: cartItems.map(item => ({
        foodId: item.id,
        quantity: quantities[item.id],
        price: item.price * quantities[item.id],
        category: item.category,
        imageUrl: item.imageUrl,
        description: item.description,
        name: item.name
      })),
      amount: total.toFixed(2),
      orderStatus: 'Preparing'
    };
  }

  /**
   * Get order status color
   * @param {string} status - Order status
   * @returns {string} CSS class for status
   */
  getOrderStatusColor(status) {
    const statusColors = {
      'Preparing': 'status-preparing',
      'On the way': 'status-ontheway',
      'Delivered': 'status-delivered',
      'Cancelled': 'status-cancelled'
    };
    return statusColors[status] || 'status-default';
  }
}

// Export singleton instance
export const orderController = new OrderController();
export default orderController;
