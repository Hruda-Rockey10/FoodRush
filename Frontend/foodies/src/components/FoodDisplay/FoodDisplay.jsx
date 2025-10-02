import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';
import FoodItem from '../FoodItem/FoodItem.jsx';

const FoodDisplay = ({ category = '', searchTerm = '' }) => {
  const { foodList } = useContext(StoreContext);

  const filteredFoods = foodList.filter((food) => {
    const matchesCategory = !category || food.category?.toLowerCase() === category.toLowerCase();
    const matchesSearch = !searchTerm || food.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className='container mt-5'>
      <div className='row'>
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food, index) => (
            <FoodItem
              key={index}
              name={food.name}
              description={food.description}
              id={food.id}
              imageUrl={food.imageUrl}
              price={food.price}
            />
          ))
        ) : (
          <div className="text-center mt-4">
            <h2 className='text-white'></h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
