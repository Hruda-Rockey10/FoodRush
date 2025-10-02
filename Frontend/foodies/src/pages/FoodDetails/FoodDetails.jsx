// src/pages/FoodDetails/FoodDetails.jsx

import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { foodController } from "../../controllers/foodController";
import { useLoading } from "../../hooks/useLoading";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "./FoodDetails.css";
import { StoreContext } from "../../components/context/StoreContext";

const FoodDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const { increaseQty, quantities } = useContext(StoreContext);
  const { loading, error, startLoading, stopLoading, setLoadingError } =
    useLoading();

  useEffect(() => {
    const loadFoodDetails = async () => {
      startLoading();

      const onSuccess = (foodData) => {
        setData(foodData);
        stopLoading();
      };

      const onError = (error) => {
        console.error("Failed to load food details:", error);
        setLoadingError(error.message || "Failed to load food details");
      };

      await foodController.fetchFoodDetails(id, onSuccess, onError);
    };
    loadFoodDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // Only depend on id, loading functions are stable from useCallback

  const handleAddToCart = async () => {
    await increaseQty(data.id);
  };

  if (loading) {
    return <LoadingSpinner text="Loading food details..." fullScreen />;
  }

  if (error) {
    return (
      <div className="food-details-container">
        <div className="error-message">
          <h2>Error Loading Food Details</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="food-details-container">
      <div className="food-details-card">
        <div className="image-section">
          <img src={data.imageUrl} alt={data.name} />
        </div>
        <div className="info-section">
          <div className="category">
            <span className="badge">
              Category: {data.category || "General"}
            </span>
          </div>
          <h1>{data.name}</h1>
          <p className="description">{data.description}</p>
          <p className="price">₹{data.price}</p>

          <div className="button-row">
            <button className="add-to-cart" onClick={handleAddToCart}>
              <i className="bi bi-cart-fill me-2"></i>
              {quantities[data.id] > 0 ? "Add More" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
