import { foodService } from '../service/foodService';
import { toast } from 'react-toastify';

/**
 * Food Controller - Handles food-related business logic
 * Follows Single Responsibility Principle and coordinates between UI and Service
 */
class FoodController {
  /**
   * Fetch all food items
   * @param {Function} onSuccess - Success callback
   * @param {Function} onError - Error callback
   * @returns {Promise<void>}
   */
  async fetchFoodList(onSuccess, onError) {
    try {
      const result = await foodService.fetchFoodList();
      
      if (result.success) {
        onSuccess && onSuccess(result.data);
      } else {
        const errorMessage = result.error?.message || 'Failed to fetch food list';
        toast.error(errorMessage);
        onError && onError(result.error);
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred while fetching food list';
      toast.error(errorMessage);
      onError && onError({ message: errorMessage, status: 500 });
    }
  }

  /**
   * Fetch food details by ID
   * @param {string} id - Food item ID
   * @param {Function} onSuccess - Success callback
   * @param {Function} onError - Error callback
   * @returns {Promise<void>}
   */
  async fetchFoodDetails(id, onSuccess, onError) {
    try {
      const result = await foodService.fetchFoodDetails(id);
      
      if (result.success) {
        onSuccess && onSuccess(result.data);
      } else {
        const errorMessage = result.error?.message || 'Failed to fetch food details';
        toast.error(errorMessage);
        onError && onError(result.error);
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred while fetching food details';
      toast.error(errorMessage);
      onError && onError({ message: errorMessage, status: 500 });
    }
  }

  /**
   * Search food items
   * @param {string} query - Search query
   * @param {Function} onSuccess - Success callback
   * @param {Function} onError - Error callback
   * @returns {Promise<void>}
   */
  async searchFood(query, onSuccess, onError) {
    try {
      if (!query || query.trim().length === 0) {
        // If empty query, fetch all food items
        return this.fetchFoodList(onSuccess, onError);
      }

      const result = await foodService.searchFood(query);
      
      if (result.success) {
        onSuccess && onSuccess(result.data);
      } else {
        const errorMessage = result.error?.message || 'Search failed';
        toast.error(errorMessage);
        onError && onError(result.error);
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred during search';
      toast.error(errorMessage);
      onError && onError({ message: errorMessage, status: 500 });
    }
  }

  /**
   * Get food items by category
   * @param {string} category - Food category
   * @param {Function} onSuccess - Success callback
   * @param {Function} onError - Error callback
   * @returns {Promise<void>}
   */
  async getFoodByCategory(category, onSuccess, onError) {
    try {
      const result = await foodService.getFoodByCategory(category);
      
      if (result.success) {
        onSuccess && onSuccess(result.data);
      } else {
        const errorMessage = result.error?.message || 'Failed to fetch food by category';
        toast.error(errorMessage);
        onError && onError(result.error);
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred while fetching food by category';
      toast.error(errorMessage);
      onError && onError({ message: errorMessage, status: 500 });
    }
  }

  /**
   * Get all available categories
   * @param {Function} onSuccess - Success callback
   * @param {Function} onError - Error callback
   * @returns {Promise<void>}
   */
  async getCategories(onSuccess, onError) {
    try {
      const result = await foodService.getCategories();
      
      if (result.success) {
        onSuccess && onSuccess(result.data);
      } else {
        const errorMessage = result.error?.message || 'Failed to fetch categories';
        toast.error(errorMessage);
        onError && onError(result.error);
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred while fetching categories';
      toast.error(errorMessage);
      onError && onError({ message: errorMessage, status: 500 });
    }
  }

  /**
   * Filter food items by price range
   * @param {Array} foodList - List of food items
   * @param {number} minPrice - Minimum price
   * @param {number} maxPrice - Maximum price
   * @returns {Array} Filtered food items
   */
  filterByPriceRange(foodList, minPrice, maxPrice) {
    if (!foodList || !Array.isArray(foodList)) return [];
    
    return foodList.filter(food => {
      const price = parseFloat(food.price) || 0;
      return price >= minPrice && price <= maxPrice;
    });
  }

  /**
   * Sort food items
   * @param {Array} foodList - List of food items
   * @param {string} sortBy - Sort criteria (name, price, category)
   * @param {string} order - Sort order (asc, desc)
   * @returns {Array} Sorted food items
   */
  sortFoodItems(foodList, sortBy = 'name', order = 'asc') {
    if (!foodList || !Array.isArray(foodList)) return [];
    
    return [...foodList].sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'price':
          aValue = parseFloat(a.price) || 0;
          bValue = parseFloat(b.price) || 0;
          break;
        case 'category':
          aValue = a.category?.toLowerCase() || '';
          bValue = b.category?.toLowerCase() || '';
          break;
        case 'name':
        default:
          aValue = a.name?.toLowerCase() || '';
          bValue = b.name?.toLowerCase() || '';
          break;
      }
      
      if (order === 'desc') {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      } else {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      }
    });
  }
}

// Export singleton instance
export const foodController = new FoodController();
export default foodController;
