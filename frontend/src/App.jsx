import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Cart from './pages/Cart/Cart.jsx';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx';
import Footer from './components/Footer/Footer.jsx';
import LoginPopup from './components/LoginPopup/LoginPopup.jsx';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className='app'>
        <Navbar setShowLogin={setShowLogin} token={token} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
