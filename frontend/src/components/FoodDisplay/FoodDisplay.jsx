import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(StoreContext);

  if (!Array.isArray(foodList) || foodList.length === 0) {
    return <p>Loading dishes...</p>;
  }

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {foodList
          .filter(item => category === "All" || item.category === category)
          .map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
