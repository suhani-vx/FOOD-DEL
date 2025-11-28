import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [foodList, setFoodList] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const url = "http://localhost:4000";

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  // ✅ Add to cart (with backend call)
  const addToCart = async (itemId) => {
    try {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1,
      }));

      if (token) {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          {
            headers: {
              token: token, // ✅ only token header
            },
          }
        );
      }
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  // ✅ Remove from cart (with backend call)
  const removeFromCart = async (itemId) => {
    try {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] - 1,
      }));

      if (token) {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          {
            headers: {
              token: token, // ✅ only token header
            },
          }
        );
      }
    } catch (err) {
      console.error("Remove from cart error:", err);
    }
  };

  // ✅ Fetch total cart data from backend
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        {
          headers: {
            token: token, // ✅ only token header
          },
        }
      );
      setCartItems(response.data.cartData || {});
    } catch (err) {
      console.error("Load cart data error:", err);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = foodList.find((product) => product._id === item);
        if (itemInfo) totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    setFoodList(response.data.data);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
        await loadCartData(storedToken); // ✅ load cart after fetching token
      }
    }
    loadData();
  }, []);

  const contextValue = {
    foodList,
    setFoodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
