import React, { useRef } from 'react';
import './ExploreMenu.css';
import { motion } from 'framer-motion';

import Biryani from './../../assets/biryani.jpg';
import Pizza from './../../assets/pizza.jpg';
import Burger from './../../assets/burger.jpg';
import IceCream from './../../assets/icecream.jpg';
import Rolls from './../../assets/rolls.jpg';
import Salad from './../../assets/salad.webp';
import Sandwich from './../../assets/sandwich.jpg';
import ButterChicken from './../../assets/butterChicken.jpg';
import BubbleTea from './../../assets/bubbleTea.jpg';
import StreetFood from './../../assets/samosa.webp';
import Sweets from './../../assets/sweets.jpg';


const foodList = [

  { name: "Pizza", image: Pizza },
  { name: "Burger", image: Burger },
  { name: "Snacks", image: Sandwich },
  { name: "Street Food", image: StreetFood },
  { name: "Biryani", image: Biryani },
  { name: "Sweets", image: Sweets },
  { name: "Beverages", image: BubbleTea },
  { name: "Thali", image: ButterChicken },
  { name: "Chinese", image: Rolls },
  { name: "Desserts", image: IceCream },
  { name: "Healthy", image: Salad },
];

const ExploreMenu = ({ category, setCategory }) => {
  const menuRef = useRef(null);

  const scrollLeft = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (clickedCategory) => {
    if (clickedCategory === category) {
      setCategory(""); // unselect → show all food
    } else {
      setCategory(clickedCategory); // set selected category
    }
  };

  return (
    <motion.div
      className="explore-menu position-relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3 px-3">
        <h1 className="m-0 text-white">Explore Our Menu</h1>
        <div className="d-flex gap-2">
          <i className='bi bi-arrow-left-circle scroll-icon' onClick={scrollLeft}></i>
          <i className='bi bi-arrow-right-circle scroll-icon' onClick={scrollRight}></i>
        </div>
      </div>

      <p className='text-white px-3'>
        Explore curated lists of dishes from around the world.
      </p>

      <div className="d-flex justify-content-start gap-4 overflow-auto explore-menu-list px-3" ref={menuRef}>
        {foodList.map((item, index) => (
          <motion.div
            key={index}
            className={`food-card ${category === item.name ? 'active-card' : ''}`}
            onClick={() => handleCategoryClick(item.name)}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            style={{ cursor: 'pointer' }}
          >
            <img src={item.image} alt={item.name} className='img-fluid rounded shadow' />
            <p className='mt-2 text-center fw-semibold text-white'>{item.name}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExploreMenu;
