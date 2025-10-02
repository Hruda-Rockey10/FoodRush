// src/components/context/StoreContext.jsx

import { createContext, useEffect, useState } from "react";
import { foodController } from "../../controllers/foodController";
import { cartController } from "../../controllers/cartController";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [token, setToken] = useState("");

  const increaseQty = async (foodId) => {
    if (!token) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    setQuantities((prev) => ({
      ...prev,
      [foodId]: (prev[foodId] || 0) + 1,
    }));

    const onSuccess = () => {
      // Cart updated successfully
    };
    
    const onError = (error) => {
      // Revert quantity change on error
      setQuantities((prev) => ({
        ...prev,
        [foodId]: Math.max(0, (prev[foodId] || 0) - 1),
      }));
    };

    await cartController.addToCart(foodId, token, onSuccess, onError);
  };

  const decreaseQty = async (foodId) => {
    const currentQty = quantities[foodId] || 0;
    const newQty = currentQty > 1 ? currentQty - 1 : 0;
    
    setQuantities((prev) => ({
      ...prev,
      [foodId]: newQty,
    }));

    const onSuccess = () => {
      // Cart updated successfully
    };
    
    const onError = (error) => {
      // Revert quantity change on error
      setQuantities((prev) => ({
        ...prev,
        [foodId]: currentQty,
      }));
    };

    await cartController.removeFromCart(foodId, token, onSuccess, onError);
  };

  const removeItem = (foodId) => {
    setQuantities((prev) => {
      const newQty = { ...prev };
      delete newQty[foodId];
      return newQty;
    });
  };

  const getTotalItems = () =>
    Object.values(quantities).reduce((sum, q) => sum + q, 0);

  useEffect(() => {
    async function loadData() {
      const onSuccess = (data) => {
        setFoodList(data);
      };
      
      const onError = (error) => {
        console.error('Failed to load food list:', error);
      };
      
      await foodController.fetchFoodList(onSuccess, onError);

      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (token) {
      loadCartData(token);
    }
  }, [token]);

  const loadCartData = async (token) => {
    const onSuccess = (data) => {
      setQuantities(data.items || {});
    };
    
    const onError = (error) => {
      console.error('Failed to load cart data:', error);
    };
    
    await cartController.getCartData(token, onSuccess, onError);
  };

  const contextValue = {
    foodList,
    quantities,
    increaseQty,
    decreaseQty,
    removeItem,
    getTotalItems,
    token,
    setToken,
    setQuantities,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
