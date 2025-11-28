import React, { useContext } from 'react'
import './FoodItem.css';
import { assets } from '../../assets/assets'; 
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const navigate = useNavigate();

  // 🧠 Function to handle add/remove with login check
  const handleAddToCart = (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first to add items to your cart!");
      navigate("/login"); // redirect to login page
      return;
    }

    addToCart(id);
  };

  const handleRemoveFromCart = (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    removeFromCart(id);
  };

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={url + "/images/" + image} alt={name} />
        
        {!cartItems[id] ? (
          <img
            className='add'
            onClick={() => handleAddToCart(id)}
            src={assets.add_icon_white}
            alt="add"
          />
        ) : (
          <div className='food-item-counter'>
            <img
              onClick={() => handleRemoveFromCart(id)}
              src={assets.remove_icon_red}
              alt="remove"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => handleAddToCart(id)}
              src={assets.add_icon_green}
              alt="add"
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating stars" />
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
