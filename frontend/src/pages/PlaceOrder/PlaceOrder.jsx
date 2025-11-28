import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";

const PlaceOrder = () => {

  const { getTotalCartAmount, token, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    const address = data;

    const orderData = {
      items: cartItems,
      amount: getTotalCartAmount() + 2,
      address: address
    };

    const response = await axios.post(
      `${url}/order/place`,
      orderData,
      { headers: { token } }
    );

    alert(response.data.message);
  };

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" name="firstName" onChange={onChangeHandler} placeholder='First Name' />
          <input type="text" name="lastName" onChange={onChangeHandler} placeholder='Last Name' />
        </div>
        <input type="email" name="email" onChange={onChangeHandler} placeholder='Email address' />
        <input type="text" name="street" onChange={onChangeHandler} placeholder='Street' />
        <div className="multi-fields">
          <input type="text" name="city" onChange={onChangeHandler} placeholder='City' />
          <input type="text" name="state" onChange={onChangeHandler} placeholder='State' />
        </div>
        <div className="multi-fields">
          <input type="text" name="zipcode" onChange={onChangeHandler} placeholder='Zip Code' />
          <input type="text" name="country" onChange={onChangeHandler} placeholder='Country' />
        </div>
        <input type="text" name="phone" onChange={onChangeHandler} placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${2}</p>
            </div>
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder;
