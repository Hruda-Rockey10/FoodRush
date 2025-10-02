import React, { useState } from 'react';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import './ExploreFood.css';

const ExploreFood = () => {
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // searchTerm and category will already be set by onChange handlers
  };

  return (
    <>
      <div className="explore-search-wrapper">
        <form className="explore-search-form" onSubmit={handleSubmit}>
          <select
            className="custom-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-- Select Category --</option>
            <option value="Pizza">Pizza</option>
            <option value="Burger">Burger</option>
            <option value="Snacks">Snacks</option>
            <option value="Sweets">Sweets</option>
            <option value="Beverages">Beverages</option>
            <option value="Chinese">Chinese</option>
            <option value="Biryani">Biryani</option>
            <option value="Street Food">Street Food</option>
            <option value="Desserts">Desserts</option>
            <option value="Thali">Thali</option>
            <option value="Fusion Food">Fusion Food</option>
            <option value="Healthy">Healthy</option>
          </select>

          <input
            type="text"
            className="custom-input"
            placeholder="Search your favorite dish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button className="custom-search-btn" type="submit">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div>

      <FoodDisplay category={category} searchTerm={searchTerm} />
    </>
  );
};

export default ExploreFood;
